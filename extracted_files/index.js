const aws = require("aws-sdk");
const ses = new aws.SES({ region: "ap-southeast-2" });
exports.handler = async function (event) {
  console.log('EVENT: ', event)
	// Extract the properties from the event body
  const { senderEmail, senderName, message } = JSON.parse(event.body)
  const params = {
    Destination: {
      ToAddresses: ["corpsxero@gmail.com"],
    },
		// Interpolate the data in the strings to send
    Message: {
      Body: {
        Text: { 
            Data: `You just got a message from ${senderName} - ${senderEmail}:
            ${message}` 
        },
      },
      Subject: { Data: `Message from ${senderName}` },
    },
    Source: "admin@xerocorps.com",
  };

  return ses.sendEmail(params).promise();
};