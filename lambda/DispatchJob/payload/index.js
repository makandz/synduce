const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");
const { DynamoDBClient, BatchExecuteStatementCommand } = require("@aws-sdk/client-dynamodb");

exports.handler = async (event) => {    
    const client = new SNSClient();
    const command = new PublishCommand({
      Message: "Hello from DispatchJob! This is just a test, don't worry :)",
      TopicArn: process.env.QueuedJobsARN
    });
    const response = await client.send(command);
    console.log(response);
    
    return {
        statusCode: 200,
        body: JSON.stringify('Sent message!'),
    };
};
