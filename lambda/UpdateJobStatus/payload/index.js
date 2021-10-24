exports.handler = async (event) => {    
    const message = JSON.parse(event['Records'][0]["Sns"]["Message"]);
    const jobID = message["jobID"];
    const logs = message["logs"];
    const status = message["status"];

    // TODO: Update database with these values.
    console.log(`${jobID}: Status ${status}, logs ${logs}`);
};
