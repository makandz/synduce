const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");
const { DynamoDBClient, BatchExecuteStatementCommand } = require("@aws-sdk/client-dynamodb");
const { v4: uuidv4 } = require('uuid');

exports.handler = async (event) => {   
  // Config
  const dbConfig = {
    region: 'us-east-1'
  }; 

  // Message payload to send to runJob.
  // Extract code body from http request body.
  const body = JSON.parse(event["body"]);
  const code = body["code"];
  const messagePayload = {
    "jobID": jobID,
    "code": code
  };

  // Clients
  const client = new SNSClient();
  const dbClient = new DynamoDBClient(dbConfig);

  // Publish message to SNS
  const client = new SNSClient();
  const command = new PublishCommand({
    Message: JSON.stringify(messagePayload),
    TopicArn: process.env.QueuedJobsARN
  });
  await client.send(command);

  // Adding job to DynamoDB
  const userID = body["userID"] ? "guest" : body["userID"];
  const job = {
    userID: userID, // Change this field when you encounter a token
    jobID: uuidv4(16),
    status: 'RUNNING',
    logs: ''
  }
  // Statement Params
  const params = {
    Statements: [
      {
        Statement: "INSERT INTO JobStatuses VALUE {'userID':?, 'jobID':?, 'status':?, 'logs':?  }",
        Parameters: [
          {'S': job.userID},
          {'S': job.jobID},
          {'S': job.status},
          {'S': job.logs}
        ]
      }
    ]
  }

  const command = new BatchExecuteStatementCommand(params);
  try {
    const response = await dbClient.send(command);
    console.log('dbClient Response', response);
  } catch (err) {
    console.error("Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify('Unable to insert job!')
    }
  }
  
  // Return jobID to frontend.
  return {
    statusCode: 200,
    body: JSON.stringify({
      jobID: jobID
    })
  };
};

