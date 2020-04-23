const ping = require("ping");
const email = require("./email");

require("./config/config");
const hosts = process.env["SITES"].split(",");
let slow = process.env["SLOW"];
if (!isNaN(slow)) slow = 2; //if slow is not defined use 2 seconds
let pingReport = "";

async function pingSites() {
	// if Google is "down", then you probably aren't connected.
	// Only test hosts array if Google is up.
	let connection = await ping.promise.probe("google.com");
	if (connection.alive) {
		for (let host of hosts) {
			let res = await ping.promise.probe(host);
			if (res.alive === false) {
				pingReport += `${host} is down. \n`;
			} else if (res.time / 1000 > slow) {
				pingReport += `${host} is slow: ${res.time / 1000} seconds.\n`;
			}
		}
		if (pingReport !== "") email(pingReport);
	} else {
		console.log("Are you connected or is Google.com really down?");
	}
}

pingSites();
