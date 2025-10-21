import "./style.css";

import { addingToList } from "./adding-to-list.js";
import { contactList, makeContactList } from "./contact-list.js";
import {
  delContactSearchItem,
  renderHtmlList,
  updateHtmlList,
} from "./render-list.js";
import { validateForm } from "./validate-form.js";
import { searchContacts } from "./contact-search.js";

export const form = document.getElementById("registration-form");

renderHtmlList(contactList);

form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (validateForm()) {
    const { elements } = form;
    const data = Array.from(elements);
    const firstLetterName = data[0].value.substr(0, 1).toLowerCase();

    addingToList();

    updateHtmlList(contactList, firstLetterName);
    form.reset();
  }
});

const clearBtn = document.getElementById("clear-list");
const searchBtn = document.getElementById("search");
const inputSearch = document.querySelector("#input-search-contacts");

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
    inputSearch.value = "";
  }
});

inputSearch.addEventListener("input", () => {
  const inputValue = inputSearch.value.toLowerCase();
  const firstLetterName = inputValue.charAt(0);
  delContactSearchItem();
  searchContacts(inputValue, firstLetterName, true);
});
