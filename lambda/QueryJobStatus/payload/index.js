const { DynamoDBClient, BatchExecuteStatementCommand } = require("@aws-sdk/client-dynamodb");

exports.handler = async (event) => {
	// Extract jobID from http request body.
  const body = JSON.parse(event["body"]);
  const jobID = body["jobID"];

	// Update job in DB.
	const dbClient = new DynamoDBClient({ region: 'us-east-1' });
    const params = {
      Statements: [
        {
          Statement: "SELECT status FROM JobStatuses WHERE jobID=?",
          Parameters: [
            {'S': jobID}
          ]
        }
      ]
    };
	try {
		const response = await dbClient.send(new BatchExecuteStatementCommand(params));
		console.log('dbClient Response', response.Responses[0].Error);
	} catch (err) {
		console.error("Error:", err);
	}
};