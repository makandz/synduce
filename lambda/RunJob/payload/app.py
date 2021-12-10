import boto3
import os
import subprocess
import json

def handler(event, context):
    # Extract code from SNS message.
    message = json.loads(event["Records"][0]["Sns"]["Message"])
    print(message)
    
    # Write code to temporary file for Synduce to read.
    # Forcibly terminate this if it runs for more than 00:14:30 = 870 seconds.
    status = ""
    with open("/tmp/tmp.ml", "w") as f:
        f.writelines(message["code"])
    try:
        proc = subprocess.run(["/home/opam/Synduce/_build/default/bin/Synduce.exe", "/tmp/tmp.ml", message["options"] + "--json"], stdout=subprocess.PIPE, stderr=subprocess.STDOUT, timeout=870)
        status = "FINISHED"
    except subprocess.TimeoutExpired:
        status = "TIMEOUT"
    logs = proc.stdout.decode("utf-8")
    
    # Publish Synduce's output and jobID to SNS once done.
    messagePayload = {
        "userID": message["userID"],
        "jobID": message["jobID"],
        "logs": logs,
        "status": status
    }
    client = boto3.client('sns')
    client.publish(
        TopicArn=os.environ['FinishedJobsARN'],
        Message=json.dumps(messagePayload),
    )