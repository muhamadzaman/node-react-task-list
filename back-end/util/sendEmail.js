require("dotenv").config();
const nodemailer = require("nodemailer");

const { HOST, EMAIL_PORT, EMAIL_SENDER, USER_PASSWORD, USER_NAME } =
  process.env;
//By USING ETHREAL SERVICE
module.exports = async (emailReciever, subject, text) => {
  try {
    let transporter = nodemailer.createTransport({
      host: HOST,
      port: EMAIL_PORT,
      auth: {
        user: USER_NAME,
        pass: USER_PASSWORD,
      },
    });

    let info = await transporter.sendMail({
      from: EMAIL_SENDER,
      to: emailReciever,
      subject: subject,
      text: text,
    });
    console.log("Message sent: %s", info.messageId);
    console.log("Email sent successfully");
    return info;
  } catch (error) {
    console.log("Email not sent!");
    console.log(error);
    return error;
  }
};

// By using Aws SES

/*
const AWS = require("aws-sdk");
const { EMAIL_SENDER, AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY, AWS_REGION } =
  process.env;

const awsConfig = {
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION,
};

module.exports = async (emailReciever, subject, text) => {
  try {
    const params = {
      Source: EMAIL_SENDER,
      Destination: {
        ToAddresses: [emailReciever],
      },
      Message: {
        Body: {
          Text: {
            Charset: "UTF-8",
            Data: text,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: subject,
        },
      },
      ReplyToAddresses: [EMAIL_SENDER],
    };

    const SES = new AWS.SES(awsConfig);
    const emailSent = await SES.sendEmail(params).promise();
    console.log("MESSAGE ID : ", emailSent.MessageId);
    console.log("EMAIL SENT SUCCESSFULLY", emailSent);
    return emailSent;
  } catch (error) {
    console.log(error);
  }
};
*/
