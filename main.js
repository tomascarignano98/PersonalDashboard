fetch(
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    document.body.style.backgroundImage = `url(${data.urls.full})`;
    document.getElementById("img-author").textContent = `By: ${data.user.name}`;
  });
