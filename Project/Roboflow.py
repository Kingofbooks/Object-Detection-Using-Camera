from roboflow import Roboflow
from ultralytics import YOLO
import cv2
# from ultralytics.utils.plotting import Annotator 
rf = Roboflow(api_key="l0epzIQtlaATeqHn3ZK0")
project = rf.workspace().project("silah-h8axi")
model = project.version(3).model

cap = cv2.VideoCapture(0)

c = 0
def plot(input_image_cv2, detections):
    predictions = detections['predictions']
    for prediction in predictions:
        x_center = prediction['x']
        y_center = prediction['y']
        width = prediction['width']
        height = prediction['height']
        confidence = prediction['confidence']
        class_name = prediction['class']
        if class_name == "silah":
            class_name = "Gun"
            print(f"Object : Gun")
        print(f"Position: ({x_center}, {y_center})")
        print(f"Dimensions: {width} x {height}")
        print(f"Confidence: {confidence}")

        x1 = int(x_center - width / 2)
        y1 = int(y_center - height / 2)
        x2 = int(x_center + width / 2)
        y2 = int(y_center + height / 2)

        center_x = int((x1 + x2) / 2)
        center_y = int((y1 + y2) / 2)
        cv2.putText(input_image_cv2, class_name, (center_x, center_y), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 225, 0), 2)
        cv2.rectangle(input_image_cv2, (x1, y1), (x2, y2), (0, 225, 0), 2)

    return input_image_cv2

while True:
    ret, frame = cap.read() 

    detections = model.predict(frame, confidence=40, overlap=30).json()
    input_image_cv2 = plot(frame, detections)
    cv2.imshow("Detected Objects", input_image_cv2)

    # if c==0 and detections:
    #     alert_mail("fire")
    #     call()
    #     c=1

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()