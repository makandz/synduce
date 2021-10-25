const { DynamoDBClient, BatchExecuteStatementCommand } = require("@aws-sdk/client-dynamodb");

exports.handler = async (event) => {    

	// Config
	const dbConfig = {
		region: 'us-east-1'
	}; 	

	// Extract code body from http request body.
	const message = JSON.parse(event['Records'][0]["Sns"]["Message"]);
	const jobID = message["jobID"];
	const logs = message["logs"];
	const status = message["status"];

	// Client
	const dbClient = new DynamoDBClient(dbConfig);

	// Updating job in DynamoDB
	// Statement Params
  const params = {
    Statements: [
      {
        Statement: "UPDATE JobStatuses SET status=?,logs=? WHERE jobID=?",
        Parameters: [
          {'S': status},
          {'S': logs},
          {'S': jobID},
        ]
      }
    ]
  }

	const command = new BatchExecuteStatementCommand(params);

	try {
		const response = await dbClient.send(command);
		console.log('dbClient Response', response.Responses[0].Error);
	} catch (err) {
		console.error("Error:", err);
		return {
			statusCode: 500,
			body: JSON.stringify('Unable to insert job!')
		}
	}

	return {
		statusCode: 200,
		body: JSON.stringify('Job updated successfully!')
	}
    
};
