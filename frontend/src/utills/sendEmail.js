import sgMail from "@sendgrid/mail";

sgMail.setApiKey("YOUR_SENDGRID_API_KEY");

const sendInvitationEmail = async (recipientEmail, workspaceId) => {
  const msg = {
    to: recipientEmail,
    from: "your-email@example.com", // Use the email address or domain you verified with SendGrid
    subject: "You are invited to join our workspace",
    text: `You have been invited to join the workspace?. Click the link to accept the invitation: https://your-app.com/accept-invite?workspaceId=${workspaceId}&email=${recipientEmail}`,
    html: `<strong>You have been invited to join the workspace?. Click the link to accept the invitation: <a href="https://your-app.com/accept-invite?workspaceId=${workspaceId}&email=${recipientEmail}">Accept Invitation</a></strong>`,
  };

  try {
    await sgMail.send(msg);
    console.log("Invitation email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendInvitationEmail;

// const sendInvitationEmail = (recipientEmail, workspaceId) => {

//   const sgMail = require("@sendgrid/mail");
//   sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//   //   const msg = {
//   //     to: recipientEmail,
//   //     from: "dailydealsind2019@gmail.com",
//   //     subject: "You are invited to join our workspace",
//   //     text: `You have been invited to join the workspace?. Click the link to accept the invitation: https://your-app.com/accept-invite?workspaceId=${workspaceId}&email=${recipientEmail}`,
//   //     html: `<strong>You have been invited to join the workspace?. Click the link to accept the invitation: <a href="https://your-app.com/accept-invite?workspaceId=${workspaceId}&email=${recipientEmail}">Accept Invitation</a></strong>`,
//   //   };
//   const msg = {
//     to: "siva.torres@gmail.com", // Change to your recipient
//     from: "dailydealsind2019@gmail.com", // Change to your verified sender
//     subject: "Sending with SendGrid is Fun",
//     text: "and easy to do anywhere, even with Node.js",
//     html: "<strong>and easy to do anywhere, even with Node.js</strong>",
//   };

//   sgMail
//     .send(msg)
//     .then(() => {
//       console.log("Email sent");
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };

// export default sendInvitationEmail;

// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
// javascript;
