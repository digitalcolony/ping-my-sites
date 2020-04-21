// this version sends an email for every site that is down
// and doesn't test Google for a connection.

const ping = require("ping");
const nodemailer = require("nodemailer");
require("./config/config");

const hosts = process.env["SITES"].split(",");
let host_report = "";

hosts.forEach(function (host) {
	ping.sys.probe(host, function (isAlive) {
		var msg = isAlive
			? "host " + host + " is alive"
			: "host " + host + " is down!";
		if (!isAlive) {
			emailMichael(msg);
		}
	});
});

const emailMichael = async (report) => {
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
