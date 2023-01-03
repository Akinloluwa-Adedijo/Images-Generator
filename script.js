import * as dotenv from "dotenv";
dotenv.config();

const page_max = 14;

//API Access key
const client_id = process.env.CLIENT_ID;
let requestURL = `https://api.unsplash.com/photos/random/?client_id=${client_id}&count=${page_max}`;

//selecting image container and 
const getImagesButton = document.querySelector(".getImagesButton");
const imagesContainer = document.querySelector(".image-container");

getImagesButton.addEventListener("click", async () => {
  await getImagesdata();
});

async function getImagesdata() {
  fetch(requestURL)
    .then((response) => response.json())
    .then(function (jsonData) {
      let newImages = jsonData;
      newImages.forEach((image) => {
        let imageLink = image.urls.regular;
        let imageAlt = image.alt_description;
        let imageToAdd = document.createElement("img");
        imageToAdd.src = imageLink;
        imageToAdd.alt = imageAlt;
        imagesContainer.appendChild(imageToAdd);
      });
    })
    .catch(function (error) {
      //Appending an error image for when an error occurs 
      let imageToAdd = document.createElement("img");
      let textError = document.createElement("h2");
      imageToAdd.src =
        "https://images.unsplash.com/photo-1594322436404-5a0526db4d13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8ZXJyb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60";
      imageToAdd.alt = "Error, Could not get any more images";
      imagesContainer.appendChild(imageToAdd);
      textError.innerText = `Sorry we could not get any random images at this time.`;
      imagesContainer.appendChild(textError);
      console.log("Error: " + error);
    });
}
