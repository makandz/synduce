import boto3
import os

def handler(event, context):
    print(f"Whoa, someone's dispatched a job! This is what it says: {event}")
    
    client = boto3.client('sns')
    response = client.publish(
        TopicArn=os.environ['FinishedJobsARN'],
        Message="Hello from RunJob! This is just a test, don't worry :)",
    )
    print(response)



# import subprocess
# import json

# def handler(event, context):
#     print("Running Synduce...")

#     text = json.loads(event["body"])["code"]
#     print(text)
    
#     with open("/tmp/tmp.ml", "w") as f:
#         f.writelines(text)

#     a = subprocess.run(["/home/opam/synduce/_build/default/bin/Synduce.exe", "/tmp/tmp.ml"], capture_output=True)
#     print(a)

#     return {
#         "statusCode": '200',
#         "headers": {
#             "Access-Control-Allow-Origin": "*",
#         },
#         "body": a.stdout
#     }