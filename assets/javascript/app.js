function App () {
    var SubmitBtn = $("#submit-btn");

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBUbnxdhw8Ejxa-qdAFtUH2YYYkOLz8GGE",
        authDomain: "train-62262.firebaseapp.com",
        databaseURL: "https://train-62262.firebaseio.com",
        projectId: "train-62262",
        storageBucket: "",
        messagingSenderId: "928188151480"
    };
    firebase.initializeApp(config);

    // grab firebase database
    var database = firebase.database();
    

    SubmitBtn.on("click", (event) => {
        event.preventDefault();
        var name = $("#trainName").val().trim();
        var destination = $("#destination").val().trim();
        var time = $("#time").val().trim();
        var frequency = $("#frequency").val().trim();

        // Change time using momentjs
        var firstTimeConverted = moment(time, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);

        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
        
        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        var tRemainder = diffTime % frequency;
        console.log(tRemainder);
        // Minute Until Train

        var tMinutesTillTrain = frequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mma"));

        // push user input into firebase database

        database.ref().push({
            name: name,
            destination: destination,
            frequency: frequency,
            nextArrival: moment(nextTrain).format("HH:mma"),
            minutesAway: tMinutesTillTrain
        })

    })
    // display onto html

    database.ref().on("child_added", function(snapshot) {
        var display = 
        "<tr><td>" + snapshot.val().name + "</td>" +
        "<td>" + snapshot.val().destination + "</td>" +
        "<td>" + snapshot.val().frequency + "</td>" + 
        "<td>" +  snapshot.val().nextArrival + "</td>" +
        "<td>" + snapshot.val().minutesAway + "</td></tr>"

        $("#table-body").append(display);
    })
    
}

App();