## User Schema

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
-   rating: { type: Number, default: 0 }, &emsp; **Rating of user, 1-5**
-   numberOfRatings: { type: Number, default: 0 }, &emsp; **Number of ratings the user has received**
-   blocked: [String], &emsp; **List of blocked users ids**

## Testing the Site
Use the link https://ufit12.herokuapp.com/public/ to use website.The very first page the user will see is the homepage. The homepage gives some information about our site. If the user wants to access the full site, they must log in. From the homepage, the user can hit the "login" button on the top right, and it will redirect the user to the login page. On this page, the user can use their own credentials to log in, or they can create a new account by clicking "Don't Have an Account? Make One!" and entering their information. For testing purposes, you can use the account "bhagat@gmail.com" (and password "Test12345$) as a demo account. Once that is complete, the page will redirect them to the profile page.

On the profile, the user can update their information, such as contact info, preference, etc. The profile info set by the user will be viewable by other users, and other users use this information to determine if they want to workout with you. Once set, users should head to the "Find A Fit!" page. Also, the delete profile button will delete account. Also, you can only edit if you hit the edit button. Once you have edited you hit the update button which will save the changes.

The "Find A Fit!" page allows the user to discover new "workout buddies" in a Tinder-like format. The left and right buttons near the sides of the screen allows user to view the pool of people they can workout with. Then on each member profile, the user has three options: view additional info, accept, and reject. Viewing additional info allows the user to see more information about the other member's profile and the average rating given by other users. Reject, or the "X" button means that the user doesn't want to workout with the member. Clicking the button will remove that member from the user's pool, and they will never be able to workout together. Also, note that on the rejected member side, the user will still be visible in their pool; this is the case to keep the user's decision anonymous, but they won't be matched even if the member wants to workout with them. And finally, the accept (or the "check") button means that the user wants to workout with the other member. If both members do accept, then they will be matched, which can be seen on the match history page. To test the page, it is a good idea to make some additional dummy accounts to see the matching behavior on both sides when clicking the accept or reject buttons.

Once you have a match, it will be added to the match history page. The match history page is like a tracking page where you can see all the people you have worked out with. For each of the entries, you can the other member's information such as contact information (email and phone only if they added one) and preferences to schedule a workout. And you can also rate them, which will affect the other member's average rating as seen on the last page, and view previous workouts and log new ones. Also, the remove button behaves the same as to the reject button in the "Find A Fit!" page but also removes the entry on your match history page while keeping it on the other member's side to remain anonymous with their decision.

## Division of Labor

Mark was responsible for updating the index and login page and creating the authentication system. Kenneth was accountable for maintaining the profile and matching page front-end and back-end and initially creating the MongoDB database. Tirth was responsible for maintaining the front-end and back-end of the Match History page and making the documentation with the help of Mark. Everybody was responsible for hooking up their webpage to the database.
