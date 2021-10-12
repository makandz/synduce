import subprocess
import json

def handler(event, context):
    print("Running Synduce...")

    text = json.loads(event["body"])["code"]
    print(text)
    
    with open("/tmp/tmp.ml", "w") as f:
        f.writelines(text)

    a = subprocess.run(["/home/opam/synduce/_build/default/bin/Synduce.exe", "/tmp/tmp.ml"], capture_output=True)
    print(a)

    return {
        "statusCode": '200',
        "headers": {
            "Access-Control-Allow-Origin": "*",
        },
        "body": a.stdout
    }