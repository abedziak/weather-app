// DOM Variables

var result = document.querySelector("#result"),
	btn = document.querySelector("button");

// Function to get geolocation and check if supported

function getLocation () {

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(getWeather);
	} else {
		result.innerHTML = "Geolocation not supported";
	}
}

window.addEventListener("load", getLocation );

// AJAX request function

function getWeather(position) {

	var lat = position.coords.latitude;
	var lon = position.coords.longitude;
	
	var newRequest = new XMLHttpRequest();
	var method = "GET";
	var URL = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/38da2cfbec44eba6860deb9eee6bd42e/" +lat + "," + lon + "?exclude=minutely,alerts,flags&units=auto";
	
	newRequest.open(method, URL);
	getData(newRequest);
	newRequest.responseType = "json";
	
	newRequest.onerror = function() {
		console.log("error");
	}

	newRequest.send();	
	console.log(URL);
}

// function to load data from DARK SKY API

function getData(request) {

	request.onload = function() {
		var newWeather = request.response;

		// check if data load is successful
		if (request.status >= 200 && request.status <= 400) {
			displayCurrentWeather(newWeather);
			
		} else {
			console.log("error");
		}		
	}
}

// function to display data to HTML

function displayCurrentWeather(weather) {
	console.log(weather.latitude, weather.timezone, weather.currently, weather.daily);
	result.innerHTML = weather.currently.icon + " " + weather.currently.temperature + " " + weather.currently.summary;
						
}
	