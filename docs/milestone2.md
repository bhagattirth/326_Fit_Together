# UFit API

**HEROKU LINK:** https://ufit12.herokuapp.com/

Requests: The methods which can be used when interacting with the server backend

- POST:		Creates a new resource (ex: Creating a new connection)
- GET:		Retrieves a resource specified by a parameter (ex: The data of a gym member)
- PUT:		Updates a resource (ex: Updating your profile preferences)
- DELETE:	Removes a resource specified by a parameter (ex: Removing a match)

Endpoints: Parameters used to specify the effect of the request

## API

### Profile Page

**GET** 

- /profile/:id/information
  - Gets the profile information associated with :id 
  - Parameters:
     - None
  - Response <br>
     - 200 if successful retrieval
        - Returns ID's profile Information
     - 400 if failed retrieval 
        - Returns error message

**Get**
 
 - /profile/:id/picture
    - Gets the profile picture associate with :id
    - Parameters:
       - None
    - Response:
       - 200 if successful retrieval 
          - Returns ID's profile picture URL
       -  400 if failed retrieval
          - Return error message
 
 **PUT**
 
 - /profile/:id/information
    - Replaces the profile information associated with :id
    - Parameters:
       - JSON containing :id’s profile information
    - Response:
       - 200 if successful retrieval 
          - Returns  user ID
       -  400 if failed retrieval
          - Return error message
 
 **PUT**
 - /profile/id/picture
    - Replaces the profile picture associated with :id
    - Parameters:
       - JSON containing :id’s profile picture dataURL
    - Response:
       - 200 if successful retrieval 
          - Returns  user ID
       -  400 if failed retrieval
          - Return error message
 
 **Delete**
 
 - /profile/:id
    - Deletes the profile associated with :id
    - Parameters:
       - None
    - Response:
       - 200 if successful retrieval 
          - Returns  user ID
       -  400 if failed retrieval
          - Return error message

### Authority & Login Page

**POST**

 - /auth/login
    - Logs user into their account
    - Parameters:
       - Email
          - String
          - User email
       - Password
          - String
          - Users password 
    - Response:
       - 200 if user has been successful logged in 
          - Returns  user id
       -  400 if something went wrong when trying to log user in
          - Return error message

**POST**

 - /auth/signup
    - Creates account based off of user information and logs them in
    - Parameters:
       - Email
          - String
          - User email 
       - Password
          - String
          - User Password  
    - Response:
       - 200 if user account has been successfully created
          - Returns  user id
       -  400 if something went wrong when creating account
          - Return error message

**GET**

- /auth/validateUser
    - Checks if user has a valid access token
    - Parameters:
       - None
    - Response:
       - 200 if user has valid access token
          - Returns  user id
       -  400 if user doesn't have valid access token
          - Return error message

**POST**

- /auth/logout
    - Logs user out of their account
    - Parameters:
       - None
    - Response:
       - 200 if user logged out
       -  400 - Error occureed when logging user out

### Matches

**GET**

- /matches/:id/potential
  - Returns information about :id’s potential matches
  - Parameters:
     - None
  - Response
     - 200 if successful retrieval
        - Returns profile information of potential matches (see *Profile information layout; excludes phoneNumber)
     - 400 if failed retrieval 
        - Returns error message

**PUT**

- /matches/:id/potential/:otherID
  - Add’s :otherID to :id’s accepted matches
  - Parameters:
     - None
  - Response
     - 200 if successful update
        - Return userID
     - 400 if failed update
        - Returns error message

**DELETE**

- /matches/:id/potential/:otherID
  - Removes :otherID to :id’s potential matches
  - Parameters:
     - None
  - Response
     - 200 if successful remove
        - Return userID
     - 400 if failed removal
        - Returns error message

### Match History

**GET**

- /matchHistory/getPast
   -  Takes no parameters and returns json file of past users
   -  Returns the Json file if it responsed


**DELETE**

- /matchHistory/deleteEntry
   -  Deletes a target Entry from the json file
   -  Body Parameters:
      - User - the target we are removing
   - Doesn't return anything

**UPDATE**

- /matchHistory/updateRating
   - Update rating of a spefic user
   - Body Parameters:
      - User: the user that we are updating rating
      - ratings : the new rating we are giving the user

**PUT**

- /matchHistory/addWorkout
   - Updates a users workout list
   - Body Parameters:
      - User: the member that we are modifying
      - Workout : the list of workouts we are adding 
      - dates : the date when the workouts are down
      - Type : what type of workout
    - Returns nothing after the update

#### Sample Layout

Profile information layout
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
        "imgURL": "https://fitnessvolt.com/wp-content/uploads/2022/07/becoming-a-bodybuilder-750x422.jpg",
        "ratings":"4",
        "pastWorkout": [["7/24/2025","Legs", "quads", "squats", "wallsits", "leg-press", "10 mile run"],["11/24/2025","Arms","Triceps","Biceps","curls", "Pushups", "Crunches", "Wallsits"]],
        "preference": ["Mondays","Tuesday"],
        "lastWorkout": "7/24/2025"
   }

Example Images

![alt text](https://github.com/bhagattirth/326_Fit_Together/blob/main/docs/raw_images/CREATEOperation.png)
CREATE Operation (Sign Up)
![alt text](https://github.com/bhagattirth/326_Fit_Together/blob/main/docs/raw_images/READOperation.png)
READ Operation (populating text fields and getting profile picture)
![alt text](https://github.com/bhagattirth/326_Fit_Together/blob/main/docs/raw_images/UPDATEOperation.png)
UPDATE Operation (Updating user profile information)
![alt text](https://github.com/bhagattirth/326_Fit_Together/blob/main/docs/raw_images/DELETEOperation.png)
DELETE Operation (Deleting user profile)

**CRUD OPERATIONS**

- homepage.js
  - Check token
    - READ Operation	
    - Will read the users data in the database
- login.js
  - Login user
    - READ Operation
    - Will read the users data in the database
  - Singup user
    - CREATE Operation
    - Will create user account in the database
- profile.js
  - Get user info
    - READ Operation
    - Will read the users data in the database
  - Set user info
    - UPDATE Operation
    - Will update the users data in the database
  - Get user profile picture
    - READ Operation
    - Will read the users data in the database
  - Set user profile picture
    - UPDATE Operation
    - Will update the users data in the database
  - Delete user
    - DELETE Operation
    - Will remove the user from the database
- matchingPage.js
  - Get user’s potential matches
    - READ Operation
    - Will read the users data in the database
  - Remove from potential match list
    - DELETE Operation
    - Will remove an entry from a user’s potential matches
  - Add to potential match list
    - UPDATE Operation
    - Will add an entry to a user’s potential matches
- matchHistory.js
  - Get user’s data from a json file and displays it on web interface as mini profile (GET)
  - Removes user’s past workout history with a another member by hiting the remove -matches button and in the database (DELETE)
  - Allows user to update rating of another member that they workout with on the interface and in the database (UPDATE)
  - Allow users to add additional workouts to the carousel and to the workout history in the database (POST)

### Divison of  Labor

The work among everybody was split evenly. Mark was in charge of maintaining github directory structure (and checking if everything worked properly) as well as writing app.js, authority.js for the login page and index, and his respective controller and helper files. Similarly, Kenneth Moore was responsable of doing the samething for the match and profile pages. And Tirth was responsible for doing the same for matchHistory (only one since it was the longest) and writing the md file.




