const config = require("./config.json");

process.env["SITES"] = config["sites"];
process.env["EMAIL"] = config["email_settings"]["EMAIL"];
process.env["EMAIL_PASSWORD"] = config["email_settings"]["EMAIL_PASSWORD"];
