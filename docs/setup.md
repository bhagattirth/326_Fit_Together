# Setup

## Local
To run the project, you must be in `\326_Fit_Together\server` and run `node app.js`. `app.js` is the file that will run the website on the server locally.
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

Once everything is done, running `node app.js` should run `app.js` as intended. Then head to localhost:5000/public to view the website.

## Via Heroku

Everything should be setup, use the link "https://ufit12.herokuapp.com/public/" to access the website. 

## Using the Website

The very first page the user will see is the homepage. The homepage gives some information about our site. If the user wants to access the full site, they must log in. From the homepage, the user can hit the "login" button on the top right, and it will redirect the user to the login page. On this page, the user can use their own credentials to log in, or they can create a new account by clicking "Don't Have an Account? Make One!" and entering their information. For testing purposes, you can use the account "bhagat@gmail.com" (and password "Test12345$) as a demo account. Once that is complete, the page will redirect them to the profile page.

On the profile, the user can update their information, such as contact info, preference, etc. The profile info set by the user will be viewable by other users, and other users use this information to determine if they want to workout with you. Once set, users should head to the "Find A Fit!" page. Also, you can delete the account if you click on "delete profile." And, you can only edit if you click on "edit profile" and update profile if you click on "update profile."

The "Find A Fit!" page allows the user to discover new "workout buddies" in a Tinder-like format. The left and right buttons near the sides of the screen allows user to view the pool of people they can workout with. Then on each member profile, the user has three options: view additional info, accept, and reject. Viewing additional info allows the user to see more information about the other member's profile and the average rating given by other users. Reject, or the "X" button means that the user doesn't want to workout with the member. Clicking the button will remove that member from the user's pool, and they will never be able to workout together. Also, note that on the rejected member side, the user will still be visible in their pool; this is the case to keep the user's decision anonymous, but they won't be matched even if the member wants to workout with them. And finally, the accept (or the "check") button means that the user wants to workout with the other member. If both members do accept, then they will be matched, which can be seen on the match history page. To test the page, it is a good idea to make some additional dummy accounts to see the matching behavior on both sides when clicking the accept or reject buttons.

Once you have a match, it will be added to the match history page. The match history page is like a tracking page where you can see all the people you have worked out with. For each of the entries, you can the other member's information such as contact information (email and phone only if they added one) and preferences to schedule a workout. And you can also rate them, which will affect the other member's average rating as seen on the last page, and view previous workouts and log new ones. Also, the remove button behaves the same as to the reject button in the "Find A Fit!" page but also removes the entry on your match history page while keeping it on the other member's side to remain anonymous with their decision. 
