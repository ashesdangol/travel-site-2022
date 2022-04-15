exports.handler = function (event, context, callback) {
  callback(null, {
    statusCode: 200,
    body: "Welcome to AWS Lambda /  Cloud functions secret area"
  })
}
