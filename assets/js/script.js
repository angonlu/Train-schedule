// Initialize Firebase
var config = {
    apiKey: "AIzaSyCItMniQTm8B8VStSzEkS5-tuTyl4O3gGk",
    authDomain: "train-schedule-b645b.firebaseapp.com",
    databaseURL: "https://train-schedule-b645b.firebaseio.com",
    projectId: "train-schedule-b645b",
    storageBucket: "train-schedule-b645b.appspot.com",
    messagingSenderId: "178469985467"
  };
firebase.initializeApp(config);

var database = firebase.database();

$("#add-train").on("click", function(event){
	event.preventDefault();

	var trainName =	$("#train-name").val().trim();
	var destination = $("#destination").val().trim();
	var firstTrain = moment($("#first-train").val().trim(), "hh:mm A").format("X");
	var frequency = $("#frequency").val().trim();


	// var empStart = moment($("#start-input").val().trim(), "DD/MM/YY").format("X");

	var newTrain = {
		name: trainName,
		destination: destination,
		first: firstTrain,
		frequency: frequency
	};
	database.ref().push(newTrain);
// Clear input fields
	$("#train-name").val("");
	$("#destination").val("");
	$("#first-train").val("");
	$("#frequency").val("");

	// console.log(newTrain.name);
	alert("new train added");

	return false;
});

database.ref().on("child_added", function(childSnap, prevChildKey){
	console.log(childSnap.val());

	var trainName = childSnap.val().name;
	var destination = childSnap.val().destination;
	var firstTrain = childSnap.val().first;
	var frequency = childSnap.val().frequency;

	var difference = moment().diff(moment.unix(firstTrain), "minutes");
	var remainder = moment().diff(moment.unix(firstTrain), "minutes") % frequency;
	var trainMinutes = frequency - remainder;

	var arrival = moment().add(trainMinutes, 'm').format("hh:mm A");

$("#train-time-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + arrival + "</td><td>" + trainMinutes)

});
