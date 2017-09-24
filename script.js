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
	skyconIcon = document.querySelectorAll("#skycon_small"),
	currentDate = document.querySelector("#current-date");
	wrapper = document.querySelector("#wrapper");

// SKYCONS 

var skycons = new Skycons({"color": "white"});

skycons.play();

//lock screen orientation to portrait

// screen.lockOrientation("landscape");

// Functions to get geolocation and check if supported

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

// function to load data from DARK SKY API

function getData(request) {

	request.onload = function() {
		var newWeather = request.response;

		// check if data load is successful

		if (request.status >= 200 && request.status <= 400) {
			displayCurrentWeather(newWeather);
			setWeatherData(newWeather);
			
			dailyWeather(newWeather);
			setDailyIcons(newWeather);
		} else {
			console.log("error");
		}		
	}
}

// function to display data to HTML

function displayCurrentWeather(weather) {

	temperature.innerHTML = Math.floor(weather.currently.temperature);
	wind.innerHTML = "<span>Wind: </span><strong>" + weather.currently.windSpeed + "</strong> mph";
	pressure.innerHTML = "<span>Pressure: </span><strong>" + Math.floor(weather.currently.pressure) + " </strong>mbar";
	var d = new Date();
	var day = new Array(7);
	day[0] = "Sun";
	day[1] = "Mon";
	day[2] = "Tues";
	day[3] = "Wed";
	day[4] = "Thur";
	day[5] = "Fri";
	day[6] = "Sat";
	var newDay = day[d.getDay()];
	currentDate.innerHTML = newDay;
						
}

// SET DAILY WEATHER DATA 

function dailyWeather(dailyWeather) {

	for (var i = 0; i < weeklyForecast.length; i++) {
			var time = dailyWeather.daily.data[i+1].time * 1000;
			var d = new Date(time);
			var day = new Array(7);
			day[0] = "Sun";
			day[1] = "Mon";
			day[2] = "Tues";
			day[3] = "Wed";
			day[4] = "Thur";
			day[5] = "Fri";
			day[6] = "Sat";
			var newDay = day[d.getDay()];
			weeklyForecastTemp[i].innerHTML = Math.round(dailyWeather.daily.data[i+1].temperatureHigh) + "º" + " / " + Math.round(dailyWeather.daily.data[i+1].temperatureLow) + "º";
			weeklyForecastDay[i].innerHTML = newDay;	
	}
}

//function to set different backgrounds, summary and icons depending on weather 
	// have set default icons

function setWeatherData (data) {

	switch (data.currently.icon) {
		case "clear-day" :
			wrapper.style.backgroundImage = "url('img/background/clear-day.jpg')";
			skycons.set("skycon", Skycons.CLEAR_DAY);	
			skycons.color = "black";
			summary.innerHTML = "Clear Day";
			wrapper.classList.add("black");
			for (var i = 0; i < skyconIcon.length; i++) {
					for (var x = 0; x < data.daily.data.length; x++ ) {
						skycons.color = "black";
					}
				}						
			break;
		case "clear-night" :
			wrapper.style.backgroundImage = "url('img/background/clear-night.jpg')";
			skycons.set("skycon", Skycons.CLEAR_NIGHT);	
			summary.innerHTML = "Clear Night";
			wrapper.classList.add("white");
			for (var i = 0; i < skyconIcon.length; i++) {
				for (var x = 0; x < data.daily.data.length; x++ ) {
					skycons.color = "white";
				}
			}	
			break;
		case "rain" :
			wrapper.style.backgroundImage = "url('img/background/rain.jpg')";
			skycons.set("skycon", Skycons.RAIN);	
			summary.innerHTML = "Rainy";
			wrapper.classList.add("black");
			for (var i = 0; i < skyconIcon.length; i++) {
				for (var x = 0; x < data.daily.data.length; x++ ) {
					skycons.color = "black";
				}
			}	
			break;
		case "snow" :
			wrapper.style.backgroundImage = "url('img/background/snow.jpg')";
			skycons.set("skycon", Skycons.SNOW);	
			summary.innerHTML = "Snowing";
			wrapper.classList.add("black");
			for (var i = 0; i < skyconIcon.length; i++) {
				for (var x = 0; x < data.daily.data.length; x++ ) {
					skycons.color = "black";
				}
			}	
			break;
		case "sleet" :
			wrapper.style.backgroundImage = "url('img/background/sleet.jpg')";
			skycons.set("skycon", Skycons.SLEET);	
			summary.innerHTML = "Clear Day";
			wrapper.classList.add("white");
			for (var i = 0; i < skyconIcon.length; i++) {
				for (var x = 0; x < data.daily.data.length; x++ ) {
					skycons.color = "white";
				}
			}	
			break;
		case "wind" :
			wrapper.style.backgroundImage = "url('img/background/wind.jpg')";
			skycons.set("skycon", Skycons.WIND);	
			summary.innerHTML = "Windy";
			wrapper.classList.add("white");
			break;
		case "fog" :
			wrapper.style.backgroundImage = "url('img/background/fog.jpg')";
			skycons.set("skycon", Skycons.FOG);	
			summary.innerHTML = "Foggy";
			wrapper.classList.add("black");
			for (var i = 0; i < skyconIcon.length; i++) {
				for (var x = 0; x < data.daily.data.length; x++ ) {
					skycons.color = "black";
				}
			}	
			break;
		case "cloudy" :
			wrapper.style.backgroundImage = "url('img/background/cloudy.jpg')";
			skycons.set("skycon", Skycons.CLOUDY);	
			summary.innerHTML = "cloudy";
			wrapper.classList.add("black");
			for (var i = 0; i < skyconIcon.length; i++) {
				for (var x = 0; x < data.daily.data.length; x++ ) {
					skycons.color = "black";
				}
			}	
			break;
		case "partly-cloudy-day" :
			wrapper.style.backgroundImage = "url('img/background/partly-cloudy-day.jpg')";
			skycons.set("skycon", Skycons.PARTLY_CLOUDY_DAY);	
			summary.innerHTML = "Partly Cloudy";
			wrapper.classList.add("white");
			for (var i = 0; i < skyconIcon.length; i++) {
				for (var x = 0; x < data.daily.data.length; x++ ) {
					skycons.color = "white";
				}
			}	
			break;
		case "partly-cloudy-night" :
			wrapper.style.backgroundImage = "url('img/background/partly-cloudy-night.jpg')";
			skycons.set("skycon", Skycons.PARTLY_CLOUDY_NIGHT);			
			summary.innerHTML = "Partly Cloudy";
			wrapper.classList.add("white");
			for (var i = 0; i < skyconIcon.length; i++) {
				for (var x = 0; x < data.daily.data.length; x++ ) {
					skycons.color = "white";
				}
			}	
			break;
	}
}

//function to set icons in DAILY forecast //

function setDailyIcons (dayWeather) {
		// console.log(dayWeather.daily.data)
		for (var i = 0; i < skyconIcon.length; i++) {
			switch (dayWeather.daily.data[i+1].icon) {
				case "clear-day" :
					skycons.set(skyconIcon[i], Skycons.PARTLY_CLEAR_NIGHT);
					break;				
				case "clear-night" :
					skycons.set(skyconIcon[i], Skycons.PARTLY_CLEAR_NIGHT);
					break;
				case "rain" :
					skycons.set(skyconIcon[i], Skycons.RAIN);
					break;					
				case "snow" :
					skycons.set(skyconIcon[i], Skycons.SNOW);
					break;
				case "sleet" :
					skycons.set(skyconIcon[i], Skycons.SLEET);
					break;
				case "wind" :
					skycons.set(skyconIcon[i], Skycons.WIND);
					break;
				case "fog" :
					skycons.set(skyconIcon[i], Skycons.FOG);
					break;
				case "cloudy" :
					skycons.set(skyconIcon[i], Skycons.CLOUDY);
					break;
				case "partly-cloudy-day" :
					skycons.set(skyconIcon[i], Skycons.PARTLY_CLOUDY_DAY);
					break;					
				case "partly-cloudy-night" :
					skycons.set(skyconIcon[i], Skycons.PARTLY_CLOUDY_NIGHT);
					break;
			}
		}
		
	}

// function showTemperature (data) {
	
// }
