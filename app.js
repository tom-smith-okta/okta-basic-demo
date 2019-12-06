////////////////////////////////////////////////////

require('dotenv').config()

const express = require('express')

const fs = require('fs')

// const okta = require('@okta/okta-sdk-nodejs')

// const OktaAuth = require('@okta/okta-auth-js')

// const request = require('request')

///////////////////////////////////////////////////

const config_file = './config/' + process.env.CONFIG + '.json'

const config = require(config_file)

///////////////////////////////////////////////////

const app = express()

var port = process.env.PORT

app.use(express.static('public'))

app.listen(port, function () {
	console.log('App listening on port ' + port + '...');
})

//////////////////////////////////////////////////

app.get('/', function (req, res) {

	fs.readFile('html/index.html', "utf8", (err, page) => {
		if (err) {
			console.log(err)
			res.send("sorry, could not load the page.")
			return
		}

		Object.keys(config).forEach(function(item) {
			var re = new RegExp('{{' + item + '}}', 'g')
			page = page.replace(re, config[item])
		})

		page = page.replace(/{{REDIRECT_URI}}/g, process.env.REDIRECT_URI)

		res.send(page)
	})
})

app.get('/settings', function (req, res) {

	var settings = {}

	// don't display secret stuff in the browser
	var env_whitelist = [
		"CONFIG",
		"PORT",
		"REDIRECT_URI"
	]

	env_whitelist.forEach(function(item, index, array) {

		if (process.env.hasOwnProperty(item)) {

			if (!(settings.hasOwnProperty("env"))) {
				settings.env = {}
			}

			settings.env[item] = process.env[item]
		}
	})

	settings.config = config

	res.json(settings)
})
