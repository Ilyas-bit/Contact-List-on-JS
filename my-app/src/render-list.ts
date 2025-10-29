import { Contact, contactList, delContact } from "./contact-list";

const listHtml = document.getElementById("list");
const listSearchContacts = document.getElementById("list");

export const createContactItem = (contactData: Contact, isVisible: boolean) => {
  const { name, vacancy, tel } = contactData;

  const newContact = document.createElement("div");
  if (!isVisible) newContact.className = "itemInfo__newConact";
  if (isVisible) newContact.className = "item-contact";

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

export const renderContactsItems = (
  items: Contact[],
  wrapper: HTMLElement | null,
  isVisible = false
) => {
  if (!wrapper || !items.length) return;

  items.forEach((contactData: Contact) => {
    const contactEl = createContactItem(contactData, isVisible);
    wrapper.after(contactEl);
    if (!isVisible) {
      wrapper.after(contactEl);
    } else {
      wrapper.append(contactEl);
    }
  });
};

const createListItem = (key: string, items: Contact[]) => {
  const li = document.createElement("li");
  li.id = key;

  const wrapper = document.createElement("div");
  wrapper.className = "itemInfo";

  const letterDiv = document.createElement("div");
  letterDiv.textContent = key.toUpperCase();

  const countDiv = document.createElement("div");
  countDiv.textContent = items.length.toString();

  wrapper.append(letterDiv, countDiv);
  li.append(wrapper);

  renderContactsItems(items, wrapper);
  return li;
};

export const renderHtmlList = (list: { [x: string]: Contact[] }) => {
  if (listHtml) {
    listHtml.innerHTML = "";

    for (const key in list) {
      const li = createListItem(key, list[key]);
      listHtml.append(li);
    }
  }
};

export const updateHtmlList = (
  list: { [x: string]: Contact[] },
  id: string
) => {
  const oldItem = document.getElementById(id);
  if (!oldItem) return;

  const newItem = createListItem(id, list[id]);
  oldItem.replaceWith(newItem);
};

if (listHtml) {
  listHtml.onclick = function OpenOrCloseLi(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const li = target.closest("li") as HTMLLIElement | null;
    if (!li || !listHtml.contains(li)) return;

    const isContact = target.closest(
      ".itemInfo__newConact"
    ) as HTMLElement | null;
    const closeButton = target.closest("img") as HTMLImageElement | null;
    const id = li.id;
    if (!id) return;

    if (closeButton && isContact) {
      deleteContactFromList(isContact, id, li);
      return;
    }

    if (isContact) return;

    toggleContacts(id, li);
  };
}

function deleteContactFromList(
  contactEl: { querySelector: (arg0: string) => any; remove: () => void },
  id: string,
  li: { querySelector: (arg0: string) => any }
) {
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

function toggleContacts(
  id: any,
  li: { classList: { toggle: (arg0: string, arg1: boolean) => void } }
) {
  const contacts = document.querySelectorAll(`#${id} .itemInfo__newConact`);
  const isActive = Array.from(contacts).some((el) =>
    el.classList.contains("active")
  );

  contacts.forEach((el) => el.classList.toggle("active", !isActive));
  li.classList.toggle("active", !isActive);
}

export function delContactSearchItem() {
  const contactSearchItem = document.querySelectorAll(".item-contact");

  if (contactSearchItem) contactSearchItem.forEach((el) => el.remove());
}
