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
    document.getElementById("img-author").textContent = `By: ${data.user.name}`;
  })
  .catch((error) => {
    console.log("Using default bg image due to an error.");
    console.log(error.stack);

    document.body.style.backgroundImage = `url("https://images.unsplash.com/photo-1504198266287-1659872e6590?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjkyOTgwMjE&ixlib=rb-1.2.1&q=85")`;
    document.getElementById("img-author").textContent = `By: Sarah Dorweiler`;
  });

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

    document.querySelector(".crypto-data").innerHTML = `
    <img src="${logo}" alt="" />
    <span>$${price}</span>
    `;
  })
  .catch((error) => console.log(error.stack));

// Get and display current time
function getCurrentTime() {
  const date = new Date();
  const time = date.toLocaleTimeString("en-us", { timeStyle: "short" });

  document.getElementById("time").textContent = time;
}

setInterval(getCurrentTime, 1000);
