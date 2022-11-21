## User Schema

-   id: String, ID of the user, seperate from mongodbs auto generated id
-   email: String, Email of the suer
-   password: String, Hash password of the user
-   fName: String, First name of the user
-   lName: String, Last name of the user
-   profilePic: {
    type: String,
    default:
    "https://www.nicepng.com/png/detail/73-730154_open-default-profile-picture-png.png",
    }, Profile picture of the user, stored as the link to the image
-   phoneNumber: { type: String, default: "000-000-0000" }, Phone number of the user
-   workoutStyle: { type: String, default: "None" }, Workout style of the user, such as Push-Pull-Legs or an Upper-Lower split
-   workoutsPerWeek: { type: Number, default: 0 }, How many times the user works out per on average
-   avgWorkoutLength: { type: Number, default: 0 }, The users average workout length
-   startTime: { type: String, default: "00:00" }, Preferred start time of the workout for the user
-   endTime: { type: String, default: "00:00" }, Preferred end time of the workout for the user
-   prefDays: { type: [String], default: [] }, List of users preferred days to workout
-   pastWorkouts: [
    {
    id: String,
    date: [String],
    workoutTitle: [String],
    workout: [[String]],
    rating: String,
    }, List of people the user worked out with and the information of the session
    ],
-   oneWayMatches: [String], List of one way matches (user ids)
-   twoWayMatches: [String], List of two way matches (user ids)
-   rating: { type: Number, default: 0 }, Rating of user, 1-5
-   numberOfRatings: { type: Number, default: 0 }, Number of ratings the user has received
-   blocked: [String], List of blocked users ids
