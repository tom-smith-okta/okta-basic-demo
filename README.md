# Okta basics

Simple way to generate basic customized demos.

## Overview

Two sample configuration files are provided:

`atko.json`

and

`finance.json`

copy one of these files to a file called

`{{your_demo_name}}.json`

and update the settings for your demo and Okta tenant.

Then, copy the `.env_example` file to a file called

`.env`

Update the settings for your environment. Whatever value you assign to CONFIG is the \*.json file that the app will load its configuration from.

This is a node app, so you can start it with

`node app.js`

Don't forget to restart the app after you update the `.env` or config file.
