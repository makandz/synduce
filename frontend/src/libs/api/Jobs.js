const axios = require('axios');
var AWS = require("aws-sdk");
AWS.config.update({region: 'us-east-1'});

var ddbDocumentClient = new AWS.DynamoDB.DocumentClient();

function getJobStatus(jobID){
    var params = {
        Tablename: tableName,
        Key: {
            "jobID": jobID
        }
    };
    ddbDocumentClient.get(params, function(err, result){
        if (err)  console.log(err, err.stack);
        else      return (JSON.parse(result).status);
    });
}