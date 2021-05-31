# file-download-app

![Agilit-e Logo](./src/core/resources/agilite-logo-full-web.png)

A ReactJS app that allows the downloading of files from external sources or from [Agilit-e](https://agilite.io) via the User Interface. 
### Usage

1. Clone or download the app
2. Run `npm install` to install the dependencies
3. Run `npm start` to start the app
### Configuration
The default port of the app can be changed in the `.env` file.

The following properties need to be specified in the Query Parametes of the App's URL.

- **webhookurl** *(required)*: The URL where the file needs to be downloaded from.
- **agilitetype**: If specified one of the following types can be used.
  - **getfile**: Downloads files directly from Agilit-e's file store.
  - **executeconnector**: Executes an Agilit-e Connector Profile to return a file.
- **agiliteprofilekey**: *(required if agilitetype is "executeconnector")* - The Profile key of the Agilit-e Connector profile.
- **agiliteroutekey**: *(required if agilitetype is "executeconnector")* - The Route key of the Agilit-e Connector profile.
- **agiliterecordid**: *(required if agilitetype is "getfile"* - The record Id of the Agilit-e File
- **agiliteapikey**: *(required if agilitetype is specified)* - Agilit-e API Key.
- **method**: The method that used when making the request to the specified webhookurl. Defaults to GET