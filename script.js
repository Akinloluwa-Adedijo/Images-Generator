import * as dotenv from "dotenv";
// import { response } from "express";
dotenv.config();

const page_max = 14;
const client_id = process.env.CLIENT_ID;
let generateURL = `https://api.unsplash.com/photos/random/?client_id=${client_id}&count=${page_max}`;
let searchURL;

const getImagesButton = document.querySelector(".getImagesButton");
const imagesContainer = document.querySelector(".image-container");
const clearImagesButton = document.querySelector(".clearImagesButton");

const onEnter = document.querySelector("input");
const textInputValue = document.querySelector("#search");

onEnter.addEventListener("keypress", async (e) => {
  if (e.key === "Enter" && textInputValue !== "") {
    searchURL = `https://api.unsplash.com/search/photos/?client_id=${client_id}&query=${textInputValue.value}`;
    await getSearchImages();
    textInputValue.value = "";
  }
});

getImagesButton.addEventListener("click", async () => {
  await getRandomImagesData();
});

async function getRandomImagesData() {
  fetch(generateURL)
    .then((response) => response.json())
    .then((jsonData) => {
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
    .catch((error) => {
      let imageToAdd = document.createElement("img");
      let textError = document.createElement("h2");
      imageToAdd.src =
        "https://images.unsplash.com/photo-1594322436404-5a0526db4d13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8ZXJyb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60";
      imageToAdd.alt = "Error, Could not get any more images";
      imagesContainer.appendChild(imageToAdd);
      textError.innerText = `Sorry we could not get any random images at this time.`;
      imagesContainer.appendChild(textError);
      // console.log("Error: " + error);
    });
}

async function getSearchImages() {
  fetch(searchURL)
    .then((response) => response.json())
    .then((jsonData) => {
      jsonData.results.forEach((image) => {
        let imageLink = image.urls.regular;
        let imageAlt = image.alt_description;
        let imageToAdd = document.createElement("img");
        imageToAdd.src = imageLink;
        imageToAdd.alt = imageAlt;
        imagesContainer.appendChild(imageToAdd);
      });
      // console.log(jsonData);
    })
    .catch((error) => {
      let imageToAdd = document.createElement("img");
      let textError = document.createElement("h2");
      imageToAdd.src =
        "https://images.unsplash.com/photo-1594322436404-5a0526db4d13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8ZXJyb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60";
      imageToAdd.alt = "Error, Could not get any more images";
      imagesContainer.appendChild(imageToAdd);
      textError.innerText = `Sorry we could not get any random images at this time.`;
      imagesContainer.appendChild(textError);
      // console.log("Error + " + error);
    });
}

//function to clear all images in the field
clearImagesButton.addEventListener("click", () => {
  while (imagesContainer.firstChild && imagesContainer.children.length !== 0) {
    imagesContainer.removeChild(imagesContainer.firstChild);
  }
});
