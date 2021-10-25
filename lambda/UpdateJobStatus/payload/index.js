const { DynamoDBClient, BatchExecuteStatementCommand } = require("@aws-sdk/client-dynamodb");

exports.handler = async (event) => {    
	console.log(`Whoa, a job's done! This is what it says: ${event}`);

	// Config
	const dbConfig = {
		region: 'us-east-1'
	}; 

	// Client
	const dbClient = new DynamoDBClient(dbConfig);

	// Updating job to DynamoDB
  const job = {
    jobID: event.jobID,
    status: event.status,
    logs: event.logs
  }

	// Statement Params
  const params = {
    Statements: [
      {
        Statement: "UPDATE JobStatuses SET status=?,logs=? WHERE jobID=?",
        Parameters: [
          {'S': job.status},
          {'S': job.logs},
          {'S': job.jobID},
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
