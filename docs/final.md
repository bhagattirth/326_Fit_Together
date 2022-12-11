# Team PSI
## UFit
### Fall 2022
### Heroku: Link to the Application : https://ufit12.herokuapp.com/public/

To access the full site please sign in or create an account.

## Overview:
---
Team Member and Github Username: **Kenneth Moore - kjmoore12, Tirth Bhagat - bhagattirth, Mark McEnnis - Mark5013**

Our idea relates to the application “Tinder” (hence the name), however, instead of matching with individuals looking for a relationship, you match with individuals who are looking for workout partners. This relates to “Tinder” as you will be suggested partners with similar workout splits and times and you can either choose to match or not to match. In this, all matches will be similar to “Super-Liking” from Tinder in that it will notify the person you match with of your interest. From there, they can also accept or not. If you accept, you will be able to get their contact information provided when creating their account. After a workout with a partner, you can log it as well as rate the partner, etc.

The application would be specific to the UMass rec center. As students, we found it very difficult to get a consistent workout. Sometimes you don't have anybody to spot you while doing weight training or simply a person to motivate you. The idea of "UFit" is to fix the issues of working out alone. The application is a source for students and people of like to discover someone new that can enhance their workout experience.

From what we saw online, there is no “gym buddy” alternative that is using the same functionality as this idea. The “gym buddy” app online we found is for trainers and gym facilities to book on. Our application would be more like Tinder, where it matches you with others based on interests and such, and you can match if you’d think it would be a good match.

## User Interface
---

### Home Page

This is the first page people see when they get to the site. The page offers information about the service and allows people to head to the login/signup page to access the entire site. If the user is already logged in, they can hit the profile button, allowing them to modify their profile or get match to a “gym buddy.”

<img src="https://github.com/bhagattirth/326_Fit_Together/blob/main/docs/raw_images/index_web_final.png" >


### Login Page

Allows users to login and access the full site. However, if the user doesn't have an account, they can make one on this page.

<img src="https://github.com/bhagattirth/326_Fit_Together/blob/main/docs/raw_images/login_web_final.png">


### Profile Page

Allows the user to input his workout schedule and preference, so other members can see it.

<img src="https://github.com/bhagattirth/326_Fit_Together/blob/main/docs/raw_images/profile_web_final.png" >


### Matching Page

This page allows members to find “gym buddies” that they want to work out with. The page tries to find a match for the user, you are able to see the other participant’s profile. Then, you have the choice of working out with them (by clicking the check mark) or finding a different one (by using the “x” button).

<img src="https://github.com/bhagattirth/326_Fit_Together/blob/main/docs/raw_images/matchingPage_web_final.png"  >


### Match History

Allows the user to view whom they workout out with in the past. For each member, the user is able to rate, catalog past workouts, and view preferences. And they are able to request to work out with the same member by calling or emailing them.

<img src="https://github.com/bhagattirth/326_Fit_Together/blob/main/docs/raw_images/matchHistory_web_final.png" >

## APIs & URL Routes/Mappings
---
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

- /matchHistory/:id/getPast
   -  Returns :id's past workout
   -  Parameters:
       - None
   -  Response
       -  200 if succesful retrieval
          - Returns past workout array
       - 400 or 404 if failed retrival or can't find target
          -  Returns error message

**GET**

- /matchHistory/:id/getProfileInfo
   -  Returns spefic information from the id's profile
   -  Parameters:
       - None
   -  Response
       -  200 if succesful retrieval
          - Returns select user data such as name, profile picture, preferences, contact info
       - 400 or if failed retrival or can't find target
          -  Returns error message

**DELETE**

- /matchHistory/deleteEntry
   -  Deletes a target entry in the User's pastworkout array and removes from two way array and adds to the block list
   -  Body Parameters:
      - User - the user that we are modifying pastworkout array for
      - member - the id of the member who we are removing from the array
   -  Response
      -  200 if successful delete
          - Returns a success message
      -  400 or 404 if failed delete or can't find the target
          - Return a error message  

**UPDATE**

- /matchHistory/updateRating
   - Update rating of a another member
   - Body Parameters:
      - User: the user who wants to change a rating for another member
      - ratings : the new rating we are giving the user
      - Member: The member who rating will be changed
   - Response
      - 200 if successful update
        - Returns a success message
      - 400 or 404 if failed update or can't find user
        - Return a error message     

**PUT**

- /matchHistory/addWorkout
   - Updates a users workout list
   - Body Parameters:
      - User: the user that we are modifying (pastworkout array)
      - Workout : the list of workouts we are adding 
      - dates : the date of the workout
      - Type : what type of workout
      - member: the member who the user workout with
    - Response
       - 200 if success update
          - Returns a success message
       - 400 or 404 if failed update or can't find target
          - Returns a error message  

## Database 
---
**User Schema**
-   id: &emsp; **String, ID of the user, seperate from mongodbs auto generated id**
-   email: &emsp; **String, Email of the user**
-   password: &emsp; **String, Hash password of the user**
-   fName: &emsp; **String, First name of the user**
-   lName: &emsp; **String, Last name of the user**
-   profilePic: { <br>
    type: String,  <br>
    default:    <br>
    "https://www.nicepng.com/png/detail/73-730154_open-default-profile-picture-png.png",<br>
    }, &emsp; **Profile picture of the user, stored as the link to the image**
-   phoneNumber: { type: String, default: "000-000-0000" }, &emsp; **Phone number of the user**
-   workoutStyle: { type: String, default: "None" }, &emsp; **Workout style of the user, such as Push-Pull-Legs or an Upper-Lower split**
-   workoutsPerWeek: { type: Number, default: 0 }, &emsp; **How many times the user works out per on average**
-   avgWorkoutLength: { type: Number, default: 0 }, &emsp; **The users average workout length**
-   startTime: { type: String, default: "00:00" }, &emsp; **Preferred start time of the workout for the user**
-   endTime: { type: String, default: "00:00" }, &emsp; **Preferred end time of the workout for the user**
-   prefDays: { type: [String], default: [] }, &emsp; **List of users preferred days to workout**
-   pastWorkouts: [
    {
    id: String,  &emsp; **used to find the other person you exercised with** <br>
    date: [String], &emsp; **List of dates the user worked out with the other member** <br>
    workoutTitle: [String], &emsp;  **A list of types of exercises you did with the other member** <br>
    workout: [[String]], &emsp; **List of past workouts with the other member**<br>
    rating: String, <br>
    }], &emsp;  **List of people the user worked out with and the information of the session**
    ,
-   oneWayMatches: [String], &emsp; **List of one way matches (user ids)**
-   twoWayMatches: [String], &emsp; **List of two way matches (user ids)**
-   rating: { type: Number, default: 0 }, &emsp; **Average Rating of user, 1-5 including decimals**
-   numberOfRatings: { type: Number, default: 0 }, &emsp; **Number of ratings the user has received**
-   blocked: [String], &emsp; **List of blocked users ids**

## Authentication/Authorization
---
The way that the user is authenticated on the website, is that when a user logs in or creates an account we store a json webtoken in the cookies. Whenever the user tries to access a protected page of the website, the backend first makes sure that the webtoken stored in the browser is valid and not expired, if so the user is given access to the page, and if not, they are denied access. All pages of the website, except for the homepage and login/signup page are protected by this authentication, so the user must be logged in to access and use the website. 

## Division of Labor
---

**Milestone 1:** Mark handled making two of the web pages and most of the CSS (Index.html, matchingPage.html, and stlyesheet.css). Kenneth was responsible for making Profile.html, half of matchingHistory.html, and is one major contributor to the wireframe. Tirth was responsible for doing the other half of matchingHistory.html, login.html, wireframe, and doing milestone1.md (with the help of Kenneth).

**Milestone 2:**  Mark was in charge of maintaining the GitHub directory structure (and checking if everything worked properly) as well as writing app.js, and authority.js for the login and index page, and his respective controller and helper files. Similarly, Kenneth Moore was responsible for doing the same thing for the match and profile pages. And Tirth was accountable for doing the same for matchHistory (one since it was the longest) and writing the md file.

**Milestone 3:**  Mark was responsible for updating the index and login page and creating the authentication system. Kenneth was accountable for maintaining the profile and matching page front-end and back-end and initially creating the MongoDB database. Tirth was responsible for maintaining the front-end and back-end of the Match History page and making the documentation with the help of Mark. Everybody was responsible for hooking up their webpage to the database.

**Before Final Submission:** Mark created a new consistent UI design for us to use on our respective web pages. Tirth and Kenneth added additional features to the matchHistory page and matchingPage and validated all the page's HTML. And everybody contributed to create the final submission video.

## Conclusion
---
   In our project, our team wanted to create a Tinder-esque website for finding a gym partner. Ultimately, we found success in doing so, although some features differed slightly from the initial plan. We were able to successfully create a homepage that informs people about the site and a profile page where users could put in information about themselves that would be available to others. Additionally, we have a “Find a Fit” page, which allows users to search for potential matches. This lists only candidates that have no current relation to the user, allowing them to find new people. There is also a “Match History” page, which tells users about those who they’ve matched with, and allows them to track information, such as workout history, for their records. These features allowed us to reach our goal of a usable site for finding gym partners. 
   
   During the process, we did have some difficulties. While we found it simple to come up with an idea we were eager about when it came time for Milestone 1 the issues began to creep in. We believe abstracting Milestone 1 into different milestones, in which half of the front end was due in one part, and the other half was due in another would have been beneficial. Then, Milestone 2 took a lot longer than originally anticipated and resulted in us staying up very late working on the project. We were able to implement the connection between the backend and front end as expected, but understanding and developing an intuitive backend took more planning than anticipated (it would have been nice to know express before hand). Milestone 3 was probably the most reasonable of the milestones in our minds, in terms of the work to be done in the time-period. Overall, the start of the project showed us that the web development process requires a lot of planning and that while it is easy to get discouraged if something doesn’t work, perseverance is important. 
   
If we were to start from the beginning again, we would put a larger emphasis on figuring out exactly how we wanted the website to work, and how we would organize the backend, from the start. This would also allow us to work on our own time as we wouldn’t have to wait around until we were all available to plan features during each Milestone. In all, we were able to reach our goals, but the process of doing so was neither easy nor necessarily enjoyable.
 



