const axios = require('axios');
var AWS = require("aws-sdk");
AWS.config.update({region: 'us-east-1'});

const tableName = "JobStatuses";
const dispatchURL = "https://sp7a90z6s7.execute-api.us-east-1.amazonaws.com/beta/dispatchjob";
var ddbDocumentClient = new AWS.DynamoDB.DocumentClient();

function getJobStatus(jobID){
    var params = {
        Tablename = tableName,
        Key: {
            "jobID": jobID
        }
    };
    ddbDocumentClient.get(params, function(err, result){
        if (err)  console.log(err, err.stack);
        else      return (JSON.parse(result).status);
    });
}

function sendJob(code){
    axios({
        method : "POST",
        url: dispatchURL,
        data:{
            code: code
        },
        responseType: 'json',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        return response.data;
    }, (error) => {
        console.log(error);
    });
}