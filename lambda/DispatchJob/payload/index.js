const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");
const { DynamoDBClient, BatchExecuteStatementCommand } = require("@aws-sdk/client-dynamodb");
const { v4: uuidv4 } = require("uuid")

exports.handler = async (event) => {
  // Create jobID
  const jobID = uuidv4();

  // Message payload to send to runJob.
  // TODO: Extract code body from http request.
  const messagePayload = {
    "jobID": jobID,
    "code": ""
  };
  // Publish message to SNS
  const client = new SNSClient();
  const command = new PublishCommand({
    Message: JSON.stringify(messagePayload),
    TopicArn: process.env.QueuedJobsARN
  });
  await client.send(command);

  // TODO: Insert status=RUNNING into DB here.
  
  // Return jobID to frontend.
  return {
      statusCode: 200,
      body: JSON.stringify({
        jobID: jobID
      })
  };
};
