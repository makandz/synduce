const { DynamoDBClient, BatchExecuteStatementCommand } = require("@aws-sdk/client-dynamodb");

exports.handler = async (event) => {
	// Extract userID from http request body.
  const userID = body["userID"];

	// Query job in DB.
	const dbClient = new DynamoDBClient({ region: 'us-east-1' });
  const params = {
    Statements: [
      {
        Statement: "SELECT code FROM JobInfo WHERE userID=?",
        Parameters: [
          {'S': userID}
        ]
      }
    ]
  };
  // Return 500 if error.
  let response;
	try {
		response = await dbClient.send(new BatchExecuteStatementCommand(params));
		console.log('dbClient Response Item', response.Responses[0].Item);
	} catch (err) {
		console.error("Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify("Unable to fetch user's past jobs.")
    };
	}

  // Return user's past job code files to frontend.
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Headers" : "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST"
    },
    body: JSON.stringify({
      row: response.Responses[0].Item
    })
  };
};