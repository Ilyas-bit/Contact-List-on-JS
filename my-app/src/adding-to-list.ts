import { Contact, contactList } from "./contact-list";

const form = document.getElementById("registration-form") as HTMLFormElement;

export function addingToList() {
  const { elements } = form;
  const data: Contact = {
    name: "",
    vacancy: "",
    tel: "",
  };

  Array.from(elements)
    .filter((item) => !!item.name)
    .forEach((element) => {
      const input = element as HTMLInputElement;
      const key = input.name as keyof Contact;
      data[key] = input.value;
    });

  const firstLetterName = data.name[0].toLowerCase();

  contactList[firstLetterName].push(data);
}
