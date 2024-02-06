const AWS = require("aws-sdk");

const uploadtoS3=(data, filename)=> {
  const BUCKET_NAME = "expensetracking12";
  const IAM_USER_KEY = "AKIAX2755U4LFBBLMSH6";
  const IAM_USER_SECRET = "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";

  let s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
  });

  var params = {
    Bucket: BUCKET_NAME,
    Key: filename,
    Body: data,
    ACL: 'public-read',
  };
  return new Promise((resolve,reject)=>{
  s3bucket.upload(params, (err, s3response) => {
    
        if (err) {
            console.log("something went wrong", err);
            reject(err)
          } else {
            console.log("success", s3response);
            resolve(s3response.Location);
          }
    })
 
  });
}

module.exports = {
    uploadtoS3
}