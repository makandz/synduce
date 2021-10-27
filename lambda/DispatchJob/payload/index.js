const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");
const { DynamoDBClient, BatchExecuteStatementCommand } = require("@aws-sdk/client-dynamodb");
const { v4: uuidv4 } = require('uuid');

exports.handler = async (event) => {
  // Create jobID
  const jobID = uuidv4();
  
  // Extract code body from http request body.
  const body = JSON.parse(event["body"]);
  const code = body["code"];

  // Add job to DB.
  const dbClient = new DynamoDBClient({ region: 'us-east-1' });
  const params = {
    Statements: [
      {
        Statement: "INSERT INTO JobStatuses VALUE {'userID':?, 'jobID':?, 'status':?, 'logs':?  }",
        Parameters: [
          {'S': "guest"}, // TODO: Change this based on how Cognito auth works.
          {'S': jobID},
          {'S': "RUNNING"},
          {'S': ""}
        ]
      }
    ]
  };
  try {
    const response = await dbClient.send(new BatchExecuteStatementCommand(params));
    console.log('dbClient Response: ', response.Responses[0].Error);
  } catch (err) {
    console.error("Error: ", err);
    return {
      statusCode: 500,
      body: JSON.stringify('Unable to create job.')
    };
  }

  // Publish message to SNS.
  const messagePayload = {
    "jobID": jobID,
    "code": code
  };
  const client = new SNSClient();
  await client.send(new PublishCommand({
    Message: JSON.stringify(messagePayload),
    TopicArn: process.env.QueuedJobsARN
  }));
  
  // Return jobID to frontend.
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Headers" : "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST"
    },
    body: JSON.stringify({
      jobID: jobID
    })
  };
};

