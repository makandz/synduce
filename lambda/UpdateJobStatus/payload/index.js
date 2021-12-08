const { DynamoDBClient, BatchExecuteStatementCommand } = require("@aws-sdk/client-dynamodb");

exports.handler = async (event) => {
	// Extract code body from http request body.
	const message = JSON.parse(event['Records'][0]["Sns"]["Message"]);
	const jobID = message["jobID"];
	const logs = message["logs"];
	const status = message["status"];

	// Update job in DB.
	const dbClient = new DynamoDBClient({ region: 'us-east-1' });
  const params = {
    Statements: [
      {
        Statement: "UPDATE JobInfo SET status=?,logs=? WHERE jobID=?",
        Parameters: [
          {'S': status},
          {'S': logs},
          {'S': jobID},
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