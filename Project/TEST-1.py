# pip install roboflow

from roboflow import Roboflow
# rf = Roboflow(api_key="KQSYBMVR3uU9mYfiP6ER")
# project = rf.workspace().project("rock-paper-scissors-sxsw")
# model = project.version(11).model

from inference import get_roboflow_model
import supervision as sv
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.image import MIMEImage
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
from datetime import datetime
from twilio.rest import Client
import cv2
from inference.models.utils import get_roboflow_model

model = get_roboflow_model(model_id="silah-h8axi/3", api_key="KQSYBMVR3uU9mYfiP6ER")

cap = cv2.VideoCapture(0)

def loc_time():
  address = " WXQ5+58F, BK Pudur, Sugunapuram East, Kuniyamuthur, Tamil Nadu 641008"
  now = datetime.now()
  date = now.date()
  time = now.time()
  return ([address,date,time])

def alert_mail(Incident):
  msg = MIMEMultipart()
  msg['From'] = '727723eucs008@skcet.ac.in'
  msg['To'] = '727723eucs037@skcet.ac.in'
  msg['Subject'] = '⚠Crime Alert'

  msg.attach(MIMEText(f"Details of the detected crime :\n\nCamera_Id : 1\nIncident  : {Incident}\nAddress   : {loc_time()[0]}\nDate      : {loc_time()[1]}\nTime      : {loc_time()[2]}\nLevel     : High"))

  smtp_server = 'smtp.gmail.com'
  smtp_port = 587

  smtp_username = '727723eucs008@skcet.ac.in'
  smtp_password = 'skcet123'

  smtp_conn = smtplib.SMTP(smtp_server, smtp_port)
  smtp_conn.starttls()
  smtp_conn.login(smtp_username, smtp_password)
  smtp_conn.sendmail(msg['From'], msg['To'], msg.as_string())
  smtp_conn.quit()
  print("Alert sent")

c=0
while True:
    ret, image = cap.read() 

    #Run inference
    results = model.infer(image)

    #Load results into Supervision Detection API
    detections = sv.Detections.from_roboflow(
        results[0].dict(by_alias=True, exclude_none=True)
    )
    print(detections)
    #Create Supervision annotators
    bounding_box_annotator = sv.BoundingBoxAnnotator()
    label_annotator = sv.LabelAnnotator()

    #Extract labels array from inference results
    labels = [p.class_name for p in results[0].predictions]



    #Apply results to image using Supervision annotators
    annotated_image = bounding_box_annotator.annotate(scene=image, detections=detections)
    annotated_image = label_annotator.annotate(
        scene=annotated_image, detections=detections, labels=labels
    )
    # detections = model.predict(frame, confidence=40, overlap=30).json()
    # input_image_cv2 = plot(frame, detections)
    cv2.imshow("Detected Objects", annotated_image)

    if c==0 and detections:
        alert_mail("GUN")
        c=1

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()