const { DynamoDBClient, BatchExecuteStatementCommand } = require("@aws-sdk/client-dynamodb");

exports.handler = async (event) => {
	// Extract jobID from http request body.
  const body = JSON.parse(event["body"]);
  const jobID = body["jobID"];

	// Query job in DB.
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
  // Return 500 if error.
	try {
		const response = await dbClient.send(new BatchExecuteStatementCommand(params));
		console.log('dbClient Response', response.Responses[0].Error);
	} catch (err) {
		console.error("Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify('Unable to fetch jobID status.')
    };
	}

  // Return jobID status to frontend.
  // TODO: Extract jobID from response.
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