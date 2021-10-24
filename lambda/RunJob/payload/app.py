import boto3
import os
import subprocess
import json

def handler(event, context):
    print(f"Whoa, someone's dispatched a job! This is what it says: {event}")

    # Extract code from SNS message.
    message = json.loads(event['Records'][0]["Sns"]["Message"])
    jobID = message["jobID"]
    code = message["code"]
    print(jobID, code)
    
    # Write code to temporary file for Synduce to read.
    # TODO: Forcibly terminate this if it runs for more than 14:30.
    with open("/tmp/tmp.ml", "w") as f:
        f.writelines(code)
    proc = subprocess.run(["/home/opam/Synduce/_build/default/bin/Synduce.exe", "/tmp/tmp.ml"], capture_output=True)
    print(proc.stdout)
    
    # Publish Synduce's output and jobID to SNS once done.
    messagePayload = {
        "jobID": jobID,
        "logs": proc.stdout
    }
    client = boto3.client('sns')
    response = client.publish(
        TopicArn=os.environ['FinishedJobsARN'],
        Message=json.dumps(messagePayload),
    )
    print(response)