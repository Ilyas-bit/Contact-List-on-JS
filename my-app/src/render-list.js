import { contactList, delContact } from "./contact-list";

const listHtml = document.getElementById("list");

const createContactItem = (contactData) => {
  const { name, vacancy, tel } = contactData;

  const newContact = document.createElement("div");
  newContact.className = "itemInfo__newConact";

  const newWrapper = document.createElement("div");

  const nameDiv = document.createElement("div");
  nameDiv.textContent = `Имя: ${name}`;

  const vacancyDiv = document.createElement("div");
  vacancyDiv.textContent = `Вакансия: ${vacancy}`;

  const phoneDiv = document.createElement("div");
  phoneDiv.textContent = `Телефон: ${tel}`;

  const img = document.createElement("img");
  img.src = "../public/cross.png";
  img.alt = "Удалить контакт";

  newWrapper.append(nameDiv, vacancyDiv, phoneDiv);
  newContact.append(newWrapper, img);

  return newContact;
};

const renderContactsItems = (items, wrapper) => {
  if (!items || !items.length) return;

  items.forEach((contactData) => {
    const contactEl = createContactItem(contactData);
    wrapper.after(contactEl);
  });
};

const createListItem = (key, items) => {
  const li = document.createElement("li");
  li.id = key;

  const wrapper = document.createElement("div");
  wrapper.className = "itemInfo";

  const letterDiv = document.createElement("div");
  letterDiv.textContent = key.toUpperCase();

  const countDiv = document.createElement("div");
  countDiv.textContent = items.length;

  wrapper.append(letterDiv, countDiv);
  li.append(wrapper);

  renderContactsItems(items, wrapper);
  return li;
};

export const renderHtmlList = (list) => {
  listHtml.innerHTML = "";

  for (const key in list) {
    const li = createListItem(key, list[key]);
    listHtml.append(li);
  }
};

export const updateHtmlList = (list, id) => {
  const oldItem = document.getElementById(id);
  if (!oldItem) return;

  const newItem = createListItem(id, list[id]);
  oldItem.replaceWith(newItem);
};

listHtml.onclick = function OpenOrCloseLi(event) {
  const li = event.target.closest("li");
  if (!li || !listHtml.contains(li)) return;

  const isContact = event.target.closest(".itemInfo__newConact");
  const closeButton = event.target.closest("img");
  const id = li.id;
  if (!id) return;

  if (closeButton && isContact) {
    deleteContactFromList(isContact, id, li);
    return;
  }

  if (isContact) return;

  toggleContacts(id, li);
};

function deleteContactFromList(contactEl, id, li) {
  const wrapper = contactEl.querySelector("div");
  if (!wrapper) return;

  const nameDiv = wrapper.querySelector("div");
  if (!nameDiv) return;

  const nameText = nameDiv.textContent || "";
  if (!nameText.startsWith("Имя:")) return;

  const name = nameText.replace("Имя: ", "").trim();

  delContact(id, name);

  contactEl.remove();

  const countDiv = li.querySelector(".itemInfo div:nth-child(2)");
  if (countDiv) countDiv.textContent = contactList[id].length;
}

function toggleContacts(id, li) {
  const contacts = document.querySelectorAll(`#${id} .itemInfo__newConact`);
  const isActive = Array.from(contacts).some((el) =>
    el.classList.contains("active")
  );

  contacts.forEach((el) => el.classList.toggle("active", !isActive));
  li.classList.toggle("active", !isActive);
}
