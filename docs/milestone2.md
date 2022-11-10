UFit API
Requests: The methods which can be used when interacting with the server backend

POST:		Creates a new resource (ex: Creating a new connection)
GET:		Retrieves a resource specified by a parameter (ex: The data of a gym member)
PUT:		Updates a resource (ex: Updating your profile preferences)
DELETE:	Removes a resource specified by a parameter (ex: Removing a match)

Endpoints: Parameters used to specify the effect of the request

profile: 


Requests : The methods which can be used when interactingwith the server backend

POST: Creates a new resource (ex: Creating a new connection)
GET: Retrieves a resource specified by a parameter (ex: The data of a gym member)
PUT: Updates a resource (ex: Updating your profile preferences)
DELETE: Removes a resource specified by a parameter (ex: Removing a match)

Endpoints : Parameters used to specify the effect ofthe request


Request Type Specific Methods
GET /profile/:id/information
Gets the profile information associated with :id
Parameters:
None
Response
200 if successful retrieval
Returns ID’s profile information*
400 if failed retrieval
Returns error message
GET /profile/:id/picture
Gets the profile picture associate with :id
Parameters:
None
Response
200 if successful retrieval
Returns ID’s profile picture URL
400 if failed retrieval
Returns error message
PUT /profile/:id/information
Replaces the profile information associated with :id
Parameters:
JSON containing :id’s profile information*
Response
200 if successful update
Returns user ID
400 if failed update
Returns error message
PUT /profile/id/picture
Replaces the profile picture associated with :id
Parameters:
JSON containing :id’s profile picture
dataURL
Response
200 if successful update
Returns user ID
400 if failed update
Returns error message
DELETE /profile/:id

Deletes the profile associated with :id
Parameters:
None
Response
200 if successful delete
Returns user ID
400 if failed delete
Returns error message
POST /auth/login
Logs user into their account
Parameters:
Email
String
Users email
Password
String
Users password
Response
200 if user has been successfully logged in
Returns user id
400 if something went wrong when trying to
log user in
Returns error message
POST /auth/signup
Creates account based off of user information and
logs them in
Parameters:
Email
String
Users email
Password
String
Users password
Response
200 if user account has been successfully
created
Returns user id
400 if something went wrong when creating
account
Returns error message
GET /auth/validateUser
Checks if user has a valid access token
Parameters:
None
Response:
200 if user has valid access token
Returns user id
400 is user doesn’t have valid access token
Returns error messsage
POST /auth/logout

Logs user out of their account
Parameters:
None
Response:
200 - User successfully logged out
400 - Error occurred when logging user out
GET /matches/:id/potential
Returns information about :id’s potential matches
Parameters:
None
Response:
200 if successful retrieval
Returns profile information of
potential matches (see *Profile
information layout; excludes
phoneNumber)
400 if failed retrieval
Returns error message
PUT /matches/:id/potential/:otherID
Add’s :otherID to :id’s accepted matches
Parameters:
None
Response:
200 if successful update
Returns userID
400 if failed update
Returns error message
DELETE /matches/:id/potential/:otherID

Removes :otherID to :id’s potential matches
Parameters:
None
Response:
200 if successful removal
Returns userID
400 if failed removal
Returns error message
Get ● /matchHistory/getPast
○ Takes no parameters and returns json file of past
users
○ Returns the Json file if it responsed
Delete ● /matchHistory/deleteEntry
○ Deletes a target Entry from the json file
○ Body Parameters:
■ User - the target we are removing
○ Returns Nothing when it is the operations is
complete
○ Throws error if it fails
UPDATE ● /matchHistory/updateRating

Put ● matchHistory/addWorkout
○ Updates a users workout list
○ Body Parameters:
■ User: the member that we are modifying
■ Workout : the list of workouts we are
adding
■ dates : the date when the workouts are
down
■ Type : what type of workout
○ Returns Nothing when it is the operations is
complete
○ Throws error if it fails
*Profile information layout:
{

firstName: "firstName",
lastName: "lastName",
phoneNumber: "XXX-XXX-XXXX",
workoutStyle: "workoutStyle",
workoutsPerWeek: N,
averageWorkoutLength: "N Hours",
preferredTime: "X XM - X XM",
preferredDays: ["monday", "tuesday"],
};

Sample Entry of Match History JSON Format:
{
"name":"Chris Bumstead",
"contact" : "987-010-575",
"imgURL":
"https://fitnessvolt.com/wp-content/uploads/2022/07/becoming-a-bodybuilder-750x422.jpg",
"ratings":"4",
"pastWorkout": [["7/24/2025","Legs", "quads", "squats", "wallsits", "leg-press", "10 mile
run"],["11/24/2025","Arms","Triceps","Biceps","curls", "Pushups", "Crunches", "Wallsits"]],
"preference": ["Mondays","Tuesday"],
"lastWorkout": "7/24/2025"
}

Example Images:


![wireframe of the login](https://github.com/bhagattirth/326_Fit_Together/blob/main/docs/raw_images/CREATEOperation.png)
CREATE Operation (Sign Up)
![wireframe of the login](https://github.com/bhagattirth/326_Fit_Together/blob/main/docs/raw_images/READOperation.png)
READ Operation (populating text fields and getting profile picture)
![wireframe of the login](https://github.com/bhagattirth/326_Fit_Together/blob/main/docs/raw_images/UPDATEOperation.png)
UPDATE Operation (Updating user profile information)
![wireframe of the login](https://github.com/bhagattirth/326_Fit_Together/blob/main/docs/raw_images/DELETEOperation.png)
DELETE Operation (Deleting user profile)
![wireframe of the login](https://github.com/bhagattirth/326_Fit_Together/blob/main/docs/raw_images/login.jpg)
The giant plus sign allows you to add a workout to the carousel and in the json file
CRUD Operations

homepage.js
Check token
READ Operation
Will read the users data in the database
login.js
Login user
READ Operation
Will read the users data in the database
Singup user
CREATE Operation
Will create user account in the database
profile.js
Get user info
READ Operation
Will read the users data in the database
Set user info
UPDATE Operation
Will update the users data in the database
Get user profile picture
READ Operation
Will read the users data in the database
Set user profile picture
UPDATE Operation
Will update the users data in the database
Delete user
DELETE Operation
Will remove the user from the database
matchingPage.js
Get user’s potential matches
READ Operation
Will read the users data in the database
Remove from potential match list
DELETE Operation
Will remove an entry from a user’s potential matches
Add to potential match list
UPDATE Operation
Will add an entry to a user’s potential matches
matchHistory.js
Get user’s data from a json file and displays it on web interface as mini profile
(GET)
Removes user’s past workout history with a another member by hiting the
remove matches button and in the database (DELETE)
Allows user to update rating of another member that they workout with on the
interface and in the database (UPDATE)
Allow users to add additional workouts to the carousel and to the workout history
in the database (POST)
