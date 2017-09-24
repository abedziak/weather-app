// DOM Variables

var cityName = document.querySelector("#header__city-name"),
	temperature = document.querySelector("#main__temp #temp"),
	icon = document.querySelector("#main__icon #icon"),
	summary = document.querySelector("#main__icon #summary"),
	wind = document.querySelector("#main__additional-info div:first-child"),
	pressure = document.querySelector("#main__additional-info div:last-child"),

	weeklyForecast = document.querySelectorAll(".week-forecast"),
	weeklyForecastIcon = document.querySelectorAll(".week-forecast__icon"),
	weeklyForecastTemp = document.querySelectorAll(".week-forecast__temp"),
	weeklyForecastDay = document.querySelectorAll(".week-forecast__day"),
	wrapper = document.querySelector("#wrapper");

// icons array

var icons = [
	"Cloud.svg",
	"cloud-Fog-Sun-Alt.svg",
	"Cloud-Moon.svg",
	"Cloud-Rain.svg",
	"Cloud-Snow.svg",
	"Cloud-Sun.svg",
	"Moon.svg",
	"Sun.svg",
	"Wind.svg"
]

// SKYCONS 

var iconsWhite = new Skycons({"color": "white"});
var iconsBlack = new Skycons({"color": "black"});

// var list = [
// 	"clear-day",
// 	"clear-night",
// 	"partly-cloudy-day",
// 	"partly-cloudy-night",
// 	"cloudy",
// 	"rain",
// 	"sleet",
// 	"snow",
// 	"wind",
// 	"fog"
//    ],

iconsWhite.play();

// Function to get geolocation and check if supported

function getLocation () {

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position);
	} else {
		result.innerHTML = "Geolocation not supported";
	}
}

function position(position) {
	var lat = position.coords.latitude;
	var lon = position.coords.longitude;
	getWeather(position);
	geocode(position);
}

//Event listeners for weather and geocode

window.onload = function() {
	getLocation();
}

// AJAX request function

function getWeather(position) {

	var lat = position.coords.latitude;
	var lon = position.coords.longitude;

	var newRequest = new XMLHttpRequest();
	var method = "GET";
	var URL = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/38da2cfbec44eba6860deb9eee6bd42e/" +lat + "," + lon + "?exclude=minutely,alerts,flags&units=auto";
	
	newRequest.open(method, URL);
	
	getLoc(newRequest);
	getData(newRequest);
	newRequest.responseType = "json";
	
	newRequest.onerror = function() {
		console.log("error");
	}

	newRequest.send();	
	// console.log(URL);
}

// function to load data from DARK SKY API

function getData(request) {

	request.onload = function() {
		var newWeather = request.response;

		// check if data load is successful
		if (request.status >= 200 && request.status <= 400) {
			displayCurrentWeather(newWeather);
			setWeatherData(newWeather);
			
			dailyWeather(newWeather);
			// setDailyWeather(newWeather);
			// setBackground(newWeather);
		} else {
			console.log("error");
		}		
	}
}

// function to display data to HTML

function displayCurrentWeather(weather) {
	// console.log(weather.daily, weather.currently);
	// cityName.innerHTML = weather.timezone;
	temperature.innerHTML = Math.floor(weather.currently.temperature);
	wind.innerHTML = "<span>Wind: </span><strong>" + weather.currently.windSpeed + "</strong> mph";
	pressure.innerHTML = "<span>Pressure: </span><strong>" + Math.floor(weather.currently.pressure) + " </strong>mbar";
						
}

// function showTemperature (data) {
	
// }

function dailyWeather(dailyWeather) {
	
	// var d = new Date(a);
	// console.log(d);
	console.log(dailyWeather.daily.data);

	for (var i = 0; i < weeklyForecast.length; i++) {
		// for (var x = 1; x < dailyWeather.daily.data.length; x++) {
			var a = dailyWeather.daily.data[i+1].time * 1000;
			var d = new Date(a).getDay();
			// weeklyForecast[i].innerHTML = dailyWeather.daily.data[i+1].time;
			
			weeklyForecastIcon[i].innerHTML = dailyWeather.daily.data[i+1].icon;
			weeklyForecastTemp[i].innerHTML = Math.round(dailyWeather.daily.data[i+1].temperatureHigh) + "º" + "/" + Math.round(dailyWeather.daily.data[i+1].temperatureLow) + "º";
			weeklyForecastDay[i].innerHTML = d;
		
	}
}



//function to set different backgrounds, summary and icons depending on weather 
	// have set default icons

function setWeatherData (data) {

	switch (data.currently.icon) {
		case "clear-day" :
			wrapper.style.backgroundImage = "url('img/background/clear-day.jpg')";
			iconsWhite.set("skycon", Skycons.CLEAR_DAY);	
			summary.innerHTML = "Clear Day";
			wrapper.classList.add("black");
			break;
		case "clear-night" :
			wrapper.style.backgroundImage = "url('img/background/clear-night.jpg')";
			iconsWhite.set("skycon", Skycons.CLEAR_NIGHT);	
			summary.innerHTML = "Clear Night";
			break;
		case "rain" :
			wrapper.style.backgroundImage = "url('img/background/rain.jpg')";
			iconsWhite.set("skycon", Skycons.RAIN);	
			summary.innerHTML = "Rainy";
			break;
		case "snow" :
			wrapper.style.backgroundImage = "url('img/background/snow.jpg')";
			iconsWhite.set("skycon", Skycons.SNOW);	
			summary.innerHTML = "Snowing";
			break;
		case "sleet" :
			wrapper.style.backgroundImage = "url('img/background/sleet.jpg')";
			iconsWhite.set("skycon", Skycons.SLEET);	
			summary.innerHTML = "Clear Day";
			break;
		case "wind" :
			wrapper.style.backgroundImage = "url('img/background/wind.jpg')";
			iconsWhite.set("skycon", Skycons.WIND);	
			summary.innerHTML = "Windy";
			break;
		case "fog" :
			wrapper.style.backgroundImage = "url('img/background/fog.jpg')";
			iconsWhite.set("skycon", Skycons.FOG);	
			summary.innerHTML = "Foggy";
			break;
		case "cloudy" :
			wrapper.style.backgroundImage = "url('img/background/cloudy.jpg')";
			iconsWhite.set("skycon", Skycons.CLOUDY);	
			summary.innerHTML = "cloudy";
			break;
		case "partly-cloudy-day" :
			wrapper.style.backgroundImage = "url('img/background/partly-cloudy-day.jpg')";
			iconsWhite.set("skycon", Skycons.PARTLY_CLOUDY_DAY);	
			summary.innerHTML = "Partly Cloudy";
			break;
		case "partly-cloudy-night" :
			wrapper.style.backgroundImage = "url('img/background/partly-cloudy-night.jpg')";
			iconsWhite.set("skycon", Skycons.PARTLY_CLOUDY_NIGHT);			
			summary.innerHTML = "Partly Cloudy";
			break;
	}
}
var skyconsList = [
	"Skycons.PARTLY_CLEAR_DAY",
	"Skycons.PARTLY_CLEAR_NIGHT",
	"Skycons.RAIN",
	"Skycons.SNOW",
	"Skycons.SLEET",
	"Skycons.WIND",
	"Skycons.FOG",
	"Skycons.CLOUDY",
	"Skycons.PARTLY_CLOUDY_DAY",
	"Skycons.PARTLY_CLOUDY_NIGHT"
]

//function to set icons in DAILY forecast //
var skyconId = "skycon_small";
var s = document.querySelectorAll("#skycon_small");

function setDailyWeather (dayWeather) {
		console.log(dayWeather.daily.data[1].icon)
		for (var i = 0; i < s.length; i++) {
			switch (dayWeather.daily.data[i+1].icon) {
				case "clear-day" :
					iconsBlack.set(s[i], Skycons.PARTLY_CLEAR_DAY);
					break;
				case "clear-night" :
					iconsWhite.set("skycon_small", Skycons.PARTLY_CLEAR_NIGHT);
					break;
				case "rain" :
					iconsWhite.set("skycon_small", Skycons.RAIN);
					break;
				case "snow" :
					iconsWhite.set("skycon_small", Skycons.SNOW);
					break;
				case "sleet" :
					iconsWhite.set("skycon_small", Skycons.SLEET);
					break;
				case "wind" :
					iconsWhite.set("skycon_small", Skycons.WIND);
					break;
				case "fog" :
					iconsWhite.set("skycon_small", Skycons.FOG);
					break;
				case "cloudy" :
					iconsWhite.set("skycon_small", Skycons.CLOUDY);
					break;
				case "partly-cloudy-day" :
					iconsWhite.set("skycon_small", Skycons.PARTLY_CLOUDY_DAY);
					break;
				case "partly-cloudy-night" :
					iconsWhite.set(skyconId[i], Skycons.PARTLY_CLOUDY_NIGHT);
					break;
			}
		}
		
	}



// second ajax call to get geocode location

function geocode(position) {

	var lat = position.coords.latitude;
	var lon = position.coords.longitude;

	var request = new XMLHttpRequest();
	var method = "GET";
	var URL = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+ lat + "," + lon + "&key=AIzaSyB4jBtDnM420ai_Bmg8lNnhoRZAn9B3sdc";

	request.open(method, URL);
	request.responseType = "json";
	
	getLoc(request)
	
	request.onerror = function() {
		console.log("error");
	}

	request.send();	
}

function getLoc(myRequest) {
	myRequest.onload = function() {
		var myLocation = myRequest.response;

		// check if data load is successful
		if (myRequest.status >= 200 && myRequest.status <= 400) {
			// console.log(myLocation.results[0].address_components[3].long_name);
			//display city name in HTML
			cityName.innerHTML = myLocation.results[0].address_components[3].long_name;
		} else {
			console.log("error");
		}		
	}
	
}

// var time = new Date().getTime();
// var date = new Date(time);
// console.log(time + "time");