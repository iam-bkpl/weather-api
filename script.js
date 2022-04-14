const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const currentWeatherItemsEl = document.getElementById("current-weather-items");
const timezone = document.getElementById("time-zone");

const weatherForecastEl = document.getElementById("weather-forecast");
const currentTempEl = document.getElementById("current-temp");

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=barnsley&appid=b8f04bafbb7ae3fe2dc6f9b1a9f7d854&units=metric `
)
  .then(function (Response) {
    return Response.json();
  })
  .then(function (Response) {
    currentWeatherItemsEl.innerHTML = `
    <div class="weather-item">
        <div>Temperature</div>
        <div>${Response.main.temp} &degC</div>
    </div>
    <div class="weather-item">
        <div>Humidity</div>
        <div>${Response.main.humidity} %</div>
    </div>
    <div class="weather-item">
       <div>Pressure</div>
        <div>${Response.main.pressure} Pascal</div>
    </div>

    <div class="weather-item">
        <div>Wind Speed</div>
        <div>${Response.wind.speed} M/s</div>
    </div>
    `;
    setInterval(() => {
      var d = new Date();
      localTime = d.getTime();
      localOffset = d.getTimezoneOffset() * 60000;
      utc = localTime + localOffset;
      var DateNow = utc + 1000 * +Response.timezone;

      const time = new Date(DateNow);
      const month = time.getMonth();
      const date = time.getDate();
      const day = time.getDay();
      const hour = time.getHours();
      const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour;
      const minutes = time.getMinutes();
      const ampm = hour >= 12 ? "PM" : "AM";

      timeEl.innerHTML =
        (hoursIn12HrFormat < 10 ? "0" + hoursIn12HrFormat : hoursIn12HrFormat) +
        ":" +
        (minutes < 10 ? "0" + minutes : minutes) +
        " " +
        `<span id="am-pm">${ampm}</span>`;

      dateEl.innerHTML = days[day] + ", " + date + " " + months[month];
    }, 1000);
  });
