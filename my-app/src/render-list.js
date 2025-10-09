import { contactList } from "./contact-list";

const listHtml = document.getElementById("list");

export const renderHtmlList = (list) => {
  listHtml.innerHTML = "";

  for (const key in list) {
    const newItem = document.createElement("li");
    newItem.className = "itemInfo";
    const newLetter = document.createElement("div");
    console.log(key);
    newLetter.textContent = key;
    const newNumberOfItem = document.createElement("div");
    newNumberOfItem.textContent = list[key].length;
    newItem.id = key;
    newItem.append(newLetter);
    newItem.append(newNumberOfItem);
    listHtml.append(newItem);
    renderContactsItems(list[key], newItem);
  }
};

export const renderContactsItems = (items, newItem) => {
  items.forEach((value, index, array) => {
    console.log(value);
    const newConact = document.createElement("div");
    const newName = document.createElement("div");
    newName.textContent = value[0].value;
    const newVacancy = document.createElement("div");
    newVacancy.textContent = value[1].value;
    const newPhone = document.createElement("div");
    newPhone.textContent = value[2].value;
    newConact.append(newName);
    newConact.append(newVacancy);
    newConact.append(newPhone);
    listHtml.insertBefore(newConact, newItem);
    console.log("wqd");
  });
};

let selectedItem;

listHtml.onclick = function OpenOrCloseLi(event) {
  let target = event.target;
  let li = event.target.closest("li");
  const elemId = li.id; // П
  if (!li) return;
  if (!listHtml.contains(li)) return;

  if (selectedItem == li || target.style.backgroundColor == "blue") {
    li.style.backgroundColor = "#888";
    console.log("message");
    selectedItem = "";
    return;
  }
  li.style.backgroundColor = "blue";
  selectedItem = li;
};
