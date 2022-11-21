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
Use the link https://ufit12.herokuapp.com/public/ to use website. You may create your own login or use our sample login (username: bhagat@gmail.com, password: Test12345$).

## Division of Labor

The work was divided equally among us. Mark's responsibility was to update the index and login page as well as creating creating the basic authentication system. KJ's was responsible for maintaining the profile and matching page front-end and back-end and initially creating the mongoDB database. Tirth was responsible of maintaining the front-end and back-end of Match History page as well as creating the documentation with the support of Mark.
