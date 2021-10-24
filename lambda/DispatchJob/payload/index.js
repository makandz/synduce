const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");
const { DynamoDBClient, BatchExecuteStatementCommand } = require("@aws-sdk/client-dynamodb");
const { v4: uuidv4 } = require('uuid');

exports.handler = async (event) => {   
  // Config
  const dbConfig = {
    region: 'us-east-1'
  }; 

  // Clients
  const client = new SNSClient();
  const dbClient = new DynamoDBClient(dbConfig);

  // SNS Message
  const command = new PublishCommand({
    Message: "Hello from DispatchJob! This is just a test, don't worry :)",
    TopicArn: process.env.QueuedJobsARN
  });
  const response = await client.send(command);
  console.log(response);

  // Adding job to DynamoDB
  const job = {
    userID: 'guest', // Change this field when you encounter a token
    jobID: uuidv4(16),
    status: 'RUNNING',
    logs: ''
  }
  // Statement Params
  const params = {
    Statements: [
      {
        Statement: `INSERT INTO JobStatuses VALUE {'userID':?, 'jobID':?, 'status':?, 'logs':?  }`,
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
  const response = await dbClient.send(command);
  console.log('dbClient Response', response);
  
  return {
      statusCode: 200,
      body: JSON.stringify('Sent message!'),
    };
};
