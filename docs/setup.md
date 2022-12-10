# Needs to check by someone else - not 100% sure if correct
# Setup

To run the project, you must be in `\326_Fit_Together\server` and run `node app.js`. `app.js` is the file that will run the website on the server locally or remotely.
However, the project won't build on the get-go; the project needs additonal things before it can run.

First, make there is a `package.json` and `package-lock.json` in the project folder. If they are missing, use `npm init` to get `package.json` and `npm install` to get `package-lock.json`.

Second, check if the following dependencies are installed (can be seen in `package.json`):
- bcrypt
- body-parser
- cookie-parser
- cors
- dotenv
- express
- jsonwebtoken
- mongoose
- uniqid 

If any of the dependencies are missing use the `npm install dependency_name` to install the dependency.

Finally, you will need to add `.env` file in the server folder. The database used in this project is password protected and only entering the correct password in the `.env` will allow access to it and without it the project won't work as intended.

Once everything is done, running `node app.js` should run `app.js` as intended.
