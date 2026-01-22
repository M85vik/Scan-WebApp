

import cv2
import numpy as np
import sys
import json
from PIL import Image

# ---------- Helpers ----------

def resize(image, height=800):
    ratio = image.shape[0] / height
    resized = cv2.resize(image, (int(image.shape[1] / ratio), height))
    return resized, ratio


def order_points(pts):
    rect = np.zeros((4, 2), dtype="float32")
    s = pts.sum(axis=1)
    diff = np.diff(pts, axis=1)

    rect[0] = pts[np.argmin(s)]
    rect[2] = pts[np.argmax(s)]
    rect[1] = pts[np.argmin(diff)]
    rect[3] = pts[np.argmax(diff)]
    return rect


def warp(image, pts):
    rect = order_points(pts)
    (tl, tr, br, bl) = rect

    w = int(max(np.linalg.norm(br - bl), np.linalg.norm(tr - tl)))
    h = int(max(np.linalg.norm(tr - br), np.linalg.norm(tl - bl)))

    dst = np.array([[0,0],[w,0],[w,h],[0,h]], dtype="float32")
    M = cv2.getPerspectiveTransform(rect, dst)
    return cv2.warpPerspective(image, M, (w, h))


# ---------- Document Detection ----------

def detect_document(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    blur = cv2.GaussianBlur(gray, (5,5), 0)
    edged = cv2.Canny(blur, 75, 200)

    contours, _ = cv2.findContours(edged, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    contours = sorted(contours, key=cv2.contourArea, reverse=True)

    for c in contours:
        peri = cv2.arcLength(c, True)
        approx = cv2.approxPolyDP(c, 0.02 * peri, True)
        if len(approx) == 4:
            return approx

    h, w = image.shape[:2]
    return np.array([[0,0],[w,0],[w,h],[0,h]])


# ---------- Document Type Detection ----------

def classify_document(image):
    h, w = image.shape[:2]
    aspect_ratio = w / h

    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    color_var = np.var(hsv[:,:,1])  # saturation variance

    edges = cv2.Canny(cv2.cvtColor(image, cv2.COLOR_BGR2GRAY), 100, 200)
    edge_density = np.sum(edges > 0) / (w * h)

    if aspect_ratio > 1.3 and color_var > 200 and edge_density > 0.05:
        return "ID_CARD"
    return "DOCUMENT"


# ---------- Enhancement Pipelines ----------

def enhance_id_card(image):
    # Shadow removal
    planes = cv2.split(image)
    result = []
    for p in planes:
        bg = cv2.medianBlur(cv2.dilate(p, np.ones((7,7),np.uint8)), 21)
        diff = cv2.normalize(255 - cv2.absdiff(p, bg), None, 0, 255, cv2.NORM_MINMAX)
        result.append(diff)
    image = cv2.merge(result)

    # Light contrast enhancement
    lab = cv2.cvtColor(image, cv2.COLOR_BGR2LAB)
    l, a, b = cv2.split(lab)
    l = cv2.createCLAHE(2.0,(8,8)).apply(l)
    return cv2.cvtColor(cv2.merge((l,a,b)), cv2.COLOR_LAB2BGR)


def enhance_document(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    gray = cv2.adaptiveThreshold(
        gray, 255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY,
        21, 10
    )
    return gray





# def background_contrast_score(image, contour):
#     mask = np.zeros(image.shape[:2], dtype=np.uint8)
#     cv2.drawContours(mask, [contour.astype(int)], -1, 255, -1)

#     doc_pixels = image[mask == 255]
#     bg_pixels = image[mask == 0]

#     if len(bg_pixels) == 0:
#         return 1.0

#     doc_gray = cv2.cvtColor(doc_pixels.reshape(-1,1,3), cv2.COLOR_BGR2GRAY)
#     bg_gray = cv2.cvtColor(bg_pixels.reshape(-1,1,3), cv2.COLOR_BGR2GRAY)

#     return abs(np.mean(doc_gray) - np.mean(bg_gray)) / 255.0


def background_contrast_score(image, contour):
    # Validate contour
    if contour is None or len(contour) != 4:
        return 1.0

    h, w = image.shape[:2]

    # Create mask safely
    mask = np.zeros((h, w), dtype=np.uint8)
    cv2.drawContours(mask, [contour.astype(int)], -1, 255, -1)

    # Extract pixels
    doc_pixels = image[mask == 255]
    bg_pixels = image[mask == 0]

    # 🔒 HARD SAFETY CHECKS (VERY IMPORTANT)
    if (
        doc_pixels is None or
        bg_pixels is None or
        doc_pixels.size == 0 or
        bg_pixels.size == 0 or
        doc_pixels.shape[-1] != 3 or
        bg_pixels.shape[-1] != 3
    ):
        return 1.0  # safe fallback

    try:
        doc_gray = cv2.cvtColor(
            doc_pixels.reshape(-1, 1, 3),
            cv2.COLOR_BGR2GRAY
        )
        bg_gray = cv2.cvtColor(
            bg_pixels.reshape(-1, 1, 3),
            cv2.COLOR_BGR2GRAY
        )
    except cv2.error:
        # Absolute last line of defense
        return 1.0

    return abs(np.mean(doc_gray) - np.mean(bg_gray)) / 255.0

# ---------- Main ----------

def main():
    input_path, output_path = sys.argv[1], sys.argv[2]
    image = cv2.imread(input_path)

    resized, ratio = resize(image)
    contour = detect_document(resized)
    contour = contour.reshape(4,2) * ratio

    warped = warp(image, contour)
    doc_type = classify_document(warped)



    # contrast = background_contrast_score(resized, contour)

    try:
      contrast = background_contrast_score(resized, contour)
    except Exception:
        contrast = 1.0


    low_contrast = contrast < 0.15

    if doc_type == "ID_CARD":
        final = enhance_id_card(warped)
        Image.fromarray(cv2.cvtColor(final, cv2.COLOR_BGR2RGB)).save(output_path)
    else:
        final = enhance_document(warped)
        Image.fromarray(final).save(output_path)

#     print(json.dumps({
#     "status": "SUCCESS",
#     "type": doc_type,
#     "low_contrast": low_contrast
# }))

    print(json.dumps({
    "status": "SUCCESS",
    "type": doc_type,
    "low_contrast": bool(low_contrast)
}))
 



if __name__ == "__main__":
    main()


