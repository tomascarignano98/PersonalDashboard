// ------------------------
// Get background image
fetch(
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    return response.json();
  })
  .then((data) => {
    // console.log(data);
    document.body.style.backgroundImage = `url(${data.urls.full})`;
    document.getElementById("img-author").textContent = `ph: ${data.user.name}`;
  })
  .catch((error) => {
    console.log("Using default bg image due to an error.");
    console.log(error.stack);

    document.body.style.backgroundImage = `url("https://images.unsplash.com/photo-1504198266287-1659872e6590?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjkyOTgwMjE&ixlib=rb-1.2.1&q=85")`;
    document.getElementById("img-author").textContent = `ph: Sarah Dorweiler`;
  });

// ------------------------
// Get Crypto data
fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    return response.json();
  })
  .then((data) => {
    const price = data.market_data.current_price.usd;
    const logo = data.image.thumb;
    // console.log(data);

    document.querySelector(".crypto").innerHTML = `
    <img class="crypto__logo" src="${logo}" alt="${data.name} logo" />
    <span>$${price}</span>
    `;
  })
  .catch((error) => console.log(error.stack));

// ------------------------
// Display weather info

function successfulPosition(position) {
  // Get user location and display weather information
  const { latitude, longitude } = position.coords;
  getWeather(latitude, longitude);
}

function errorPosition(error) {
  console.log(`ErrorCode ${error.code}: ${error.message}`);
}

navigator.geolocation.getCurrentPosition(successfulPosition, errorPosition, {
  enableHighAccuracy: true
});

async function getWeather(latitude, longitude) {
  try {
    const response = await fetch(
      `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`
    );
    if (!response.ok) throw Error(response.status);

    const data = await response.json();
    // console.log({ data });
    const temp = data.main.temp;
    const cityName = data.name;
    const icon = data.weather[0].icon;

    document.querySelector(".weather").innerHTML = `
    <div class="weather__temperature">
      <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="" />
      <span>${Math.round(temp)} °C</span>
    </div>
    <p>${cityName}</p>
    `;
  } catch (error) {
    console.log(error.stack);
  }
}

// ------------------------
// Get and display current time
function getCurrentTime() {
  const date = new Date();
  const time = date.toLocaleTimeString("en-us", { timeStyle: "short" });

  document.getElementById("time").textContent = time;
}

setInterval(getCurrentTime, 1000);

// ------------------------
// Get random quote
fetch("https://philosophy-quotes-api.glitch.me/quotes")
  .then((response) => {
    if (!response.ok) throw Error(response.status);
    return response.json();
  })
  .then((data) => {
    const randInt = Math.floor(Math.random() * data.length);
    const quote = data[randInt];
    console.log(quote);
    document.getElementById("quote").innerHTML = `
        <blockquote class="quote">
        "${quote.quote}"
        <span class="quote__author">${quote.source}</span>
        </blockquote>
        `;
  })
  .catch((error) => {
    console.log(error.stack);
    document.getElementById("quote").innerHTML = `
        <blockquote class="quote">
        "Be kind, for everyone you meet is fighting a harder battle."
        <span class="quote__author">Plato</span>
        </blockquote>
        
        `;
  });
