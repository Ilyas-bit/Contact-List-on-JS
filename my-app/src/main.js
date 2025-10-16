import "./style.css";

import { addingToList } from "./adding-to-list.js";
import { contactList, makeContactList } from "./contact-list.js";
import { renderHtmlList, updateHtmlList } from "./render-list.js";
import { validateForm } from "./validate-form.js";

// setupCounter(document.querySelector("#counter"));

export const form = document.getElementById("registration-form");

renderHtmlList(contactList);

form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (validateForm()) {
    const { elements } = form;
    const data = Array.from(elements);
    const firstLetterName = data[0].value.substr(0, 1).toLowerCase();
    console.log(firstLetterName);

    addingToList();
    console.log(contactList);

    updateHtmlList(contactList, firstLetterName);
    form.reset();
  }
});

const clearBtn = document.getElementById("clear-list");
const searchBtn = document.getElementById("search");
const inputSearch = document.querySelector("#input-search-contacts");
console.log(inputSearch);

clearBtn.addEventListener("click", () => {
  makeContactList();
  renderHtmlList(contactList);
});

const modalWindow = document.querySelector(".modal-window");
const modalOverlay = document.querySelector(".modal-overlay");

searchBtn.addEventListener("click", () => {
  if (!modalWindow.classList.contains("active-modal-window")) {
    modalWindow.classList.add("active-modal-window");
    modalOverlay.classList.add("active-modal-window");
  }
});

modalOverlay.addEventListener("click", () => {
  if (modalWindow.classList.contains("active-modal-window")) {
    modalWindow.classList.remove("active-modal-window");
    modalOverlay.classList.remove("active-modal-window");
  }
});

inputSearch.addEventListener("input", () => {
  const value = inputSearch.value.toLowerCase();
  console.log(value);
  console.log(value.charAt(0));
  console.log(contactList[value.charAt(0)]);
});
