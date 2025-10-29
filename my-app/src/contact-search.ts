import { contactList, delContact } from "./contact-list";
import { renderContactsItems, renderHtmlList } from "./render-list";

const listSearchContacts = document.getElementById(
  "modal-window-showing-contacts"
) as HTMLFormElement;

export const searchContacts = (
  str: string,
  firstLetter: string,
  isVisible: boolean
) => {
  if (!firstLetter) {
    return;
  }
  const wrapper = document.getElementById("modal-window-showing-contacts");
  const evenNumbers = contactList[firstLetter].filter((contact) =>
    contact.name.includes(str)
  );
  renderContactsItems(evenNumbers, wrapper, isVisible);
};

if (listSearchContacts)
  listSearchContacts.onclick = (event) => {
    const target = event.target as HTMLElement;
    if (target.tagName !== "IMG" || target.alt !== "Удалить контакт") return;

    const contactItem = target.closest(".item-contact");
    if (!contactItem) return;

    const nameText =
      contactItem.querySelector(":scope > div > div:first-child")
        ?.textContent || "";
    const name = nameText.replace(/^Имя:\s*/, "").trim();
    const firstLetter = name[0];

    if (!name) return;

    contactItem.remove();
    delContact(firstLetter, name);
    renderHtmlList(contactList);
  };
