const nodemailer = require("nodemailer");
require("./config/config");

module.exports = function (report) {
	const transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 465,
		secure: true,
		auth: {
			user: process.env["EMAIL"],
			pass: process.env["EMAIL_PASSWORD"],
			// GMAIL TIP: create device password @ https://myaccount.google.com/security --> App Passwords
		},
	});

	const mailOptions = {
		from: process.env["EMAIL"],
		to: process.env["EMAIL"],
		subject: "PING Report",
		text: report,
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log("Email sent: " + info.response);
		}
	});
};
