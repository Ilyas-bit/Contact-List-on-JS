import { contactList } from "./contact-list";

const form = document.getElementById("registration-form");

export function addingToList(element) {
  const { elements } = form;
  const data = Array.from(elements)
    .filter((item) => !!item.name)
    .map((element) => {
      const { name, value } = element;

      return { name, value };
    });
  const firstLetterName = data[0].value.substr(0, 1).toLowerCase();

  contactList[firstLetterName].push(data);
}
