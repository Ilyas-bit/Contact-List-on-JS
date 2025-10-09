import "./style.css";

import { addingToList } from "./adding-to-list.js";
import { contactList } from "./contact-list.js";
import { renderHtmlList } from "./render-list.js";

// setupCounter(document.querySelector("#counter"));

export const form = document.getElementById("registration-form");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  addingToList();
  console.log(contactList);
  renderHtmlList(contactList);
});

console.log(contactList);
