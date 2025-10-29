import { contactList, makeContactList } from "./contact-list";
import {
  delContactSearchItem,
  renderHtmlList,
  updateHtmlList,
} from "./render-list.js";

import { searchContacts } from "./contact-search";
import { addingToList } from "./adding-to-list";
import { validateForm } from "./validate-form";

export const form = document.getElementById(
  "registration-form"
) as HTMLFormElement;

renderHtmlList(contactList);

if (form)
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

if (clearBtn)
  clearBtn.addEventListener("click", () => {
    makeContactList();
    renderHtmlList(contactList);
  });

const modalWindow = document.querySelector(".modal-window");
const modalOverlay = document.querySelector(".modal-overlay");

if (searchBtn && modalWindow && modalOverlay)
  searchBtn.addEventListener("click", () => {
    if (!modalWindow.classList.contains("active-modal-window")) {
      modalWindow.classList.add("active-modal-window");
      modalOverlay.classList.add("active-modal-window");
    }
  });

if (modalOverlay && modalWindow && modalOverlay && inputSearch)
  modalOverlay.addEventListener("click", () => {
    if (modalWindow.classList.contains("active-modal-window")) {
      modalWindow.classList.remove("active-modal-window");
      modalOverlay.classList.remove("active-modal-window");
      inputSearch.value = "";
    }
  });

if (inputSearch)
  inputSearch.addEventListener("input", () => {
    const inputValue = inputSearch.value.toLowerCase();
    const firstLetterName = inputValue.charAt(0);
    delContactSearchItem();
    searchContacts(inputValue, firstLetterName, true);
  });
