const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");
const { DynamoDBClient, BatchExecuteStatementCommand } = require("@aws-sdk/client-dynamodb");
const { v4: uuidv4 } = require('uuid');

exports.handler = async (event) => {
  // Create jobID
  const jobID = uuidv4();

  // Extract code body and user ID from http request body.
  const body = JSON.parse(event.body);
  const userID = body.userID;
  const code = body.code;
  const options = body.options;

  // Add job to DB.
  const dbClient = new DynamoDBClient({ region: 'us-east-1' });
  const params = {
    Statements: [
      {
        Statement: "INSERT INTO JobInfo VALUE {'userID':?, 'jobID':?, 'status':?, 'logs':?, 'code':?, 'timeSent':? }",
        Parameters: [
          {'S': userID},
          {'S': jobID},
          {'S': "RUNNING"},
          {'S': ""},
          {'S': code},
          {'S': Date().toLocaleString()}
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

  // Parse options into string
  const flags = Object.entries(options.flags).map(([flag, enabled]) => enabled ? flag : "").join(" ").trim();
  const numerics = Object.entries(options.numerics).map(([opt, amount]) => `${opt} ${amount}`).join(" ").trim();
  const optStr = `${flags} ${numerics}`;

  // Publish message to SNS.
  const messagePayload = {
    userID: userID,
    jobID: jobID,
    code: code,
    options: optStr
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