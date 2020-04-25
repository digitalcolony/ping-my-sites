const ping = require("ping");
const email = require("./email");

require("./config/config");
const hosts = process.env["SITES"].split(","); // use 192.168.1.1 to test a down site
const slow_seconds = 2;
const attempts = 2;
const seconds_between_attempts = 20;

let pingSitesCount = 0;
let pingReport = "";

async function pingSites() {
	pingSitesCount++;
	// if Google is "down", then you probably aren't connected.
	// Only test hosts array if Google is up.
	let connection = await ping.promise.probe("google.com");
	if (connection.alive) {
		for (let host of hosts) {
			let res = await ping.promise.probe(host);
			if (res.alive === false) {
				pingReport += `${host} is down. \n`;
			} else if (res.time / 1000 > slow_seconds) {
				pingReport += `${host} is slow: ${res.time / 1000} seconds.\n`;
			}
		}
		if (pingReport !== "") {
			if (pingSitesCount >= attempts) {
				email(pingReport);
			} else {
				pingReport += `--- waiting ${seconds_between_attempts} seconds ---\n`;
				setTimeout(() => {
					pingSites();
				}, 1000 * seconds_between_attempts);
			}
		}
	} else {
		console.log("Are you connected or is Google.com really down?");
	}
}

pingSites();
