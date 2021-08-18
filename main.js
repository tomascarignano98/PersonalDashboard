fetch(
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    document.body.style.backgroundImage = `url(${data.urls.full})`;
    document.getElementById("img-author").textContent = `By: ${data.user.name}`;
  })
  .catch((error) => {
    console.log("Using default bg image due to an error.");
    console.log(error.stack);

    document.body.style.backgroundImage = `url("https://images.unsplash.com/photo-1504198266287-1659872e6590?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjkyOTgwMjE&ixlib=rb-1.2.1&q=85")`;
    document.getElementById("img-author").textContent = `By: Sarah Dorweiler`;
  });
