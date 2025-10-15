import "./style.css";

import { addingToList } from "./adding-to-list.js";
import { contactList, makeContactList } from "./contact-list.js";
import { renderHtmlList, updateHtmlList } from "./render-list.js";

// setupCounter(document.querySelector("#counter"));

export const form = document.getElementById("registration-form");

renderHtmlList(contactList);

form.addEventListener("submit", function (event) {
  const { elements } = form;
  const data = Array.from(elements);
  const firstLetterName = data[0].value.substr(0, 1).toLowerCase();
  console.log(firstLetterName);

  event.preventDefault();
  addingToList();
  console.log(contactList);

  updateHtmlList(contactList, firstLetterName);
});

const clearBtn = document.getElementById("clear-list");
const searchBtn = document.getElementById("search");

clearBtn.addEventListener("click", () => {
  makeContactList();
  renderHtmlList(contactList);
});

searchBtn.addEventListener("click", () => {
  console.log("Поиск выполнен");
});

console.log(contactList);
