const { DynamoDBClient, QueryCommand } = require("@aws-sdk/client-dynamodb");

exports.handler = async (event) => {
	// Extract userID from http request body.
  const body = JSON.parse(event.body);
  const userID = body.userID;

	// Query job in DB.
  let response;
	const dbClient = new DynamoDBClient({ region: 'us-east-1' });
	try {
		response = await dbClient.send(new QueryCommand({
		  TableName: "JobInfo",
		  ProjectionExpression: "code,timeSent,logs",
		  KeyConditionExpression: "userID = :val",
      ExpressionAttributeValues: {
        ":val": {'S': userID}
      }
		}));
		console.log('dbClient Response Item', response.Items);
	} catch (err) {
		console.error("Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify("Unable to fetch user's past jobs.")
    };
	}

  // Do this late to prevent timing attacks on the placeholder value
  if (userID === "guest") {
    return {
      statusCode: 500,
      body: JSON.stringify("Unable to fetch user's past jobs.")
    };
  }

  // Extract past jobs' code from Items 
  const pastJobsCode = response.Items.map(item => {
      return {
        code: item.code.S, 
        timeSent: item.timeSent.S,
        logs: item.logs.S
      }
  });
  console.log(pastJobsCode)
  
  // Return to frontend.
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Headers" : "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST"
    },
    body: JSON.stringify(pastJobsCode)
  };
};