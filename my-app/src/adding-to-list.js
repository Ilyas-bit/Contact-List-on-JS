import { contactList } from "./contact-list";

const form = document.getElementById("registration-form");

export function addingToList() {
  const { elements } = form;
  const data = {};

  Array.from(elements)
    .filter((item) => !!item.name)
    .forEach((element) => {
      data[element.name] = element.value;
    });

  const firstLetterName = data.name[0].toLowerCase();

  contactList[firstLetterName].push(data);
}
