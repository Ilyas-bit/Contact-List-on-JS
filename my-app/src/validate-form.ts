import { contactList } from "./contact-list";

const isEnglish = (word: string) => /^[A-Za-z]+$/.test(word);

export function validateForm() {
  const form = document.getElementById(
    "registration-form"
  ) as HTMLFormElement | null;
  if (!form) throw new Error('Form "registration-form" not found');

  const nameInput = form.elements.namedItem("name") as HTMLInputElement | null;
  const vacancyInput = form.elements.namedItem(
    "vacancy"
  ) as HTMLInputElement | null;
  const phoneInput = form.elements.namedItem("tel") as HTMLInputElement | null;

  if (!nameInput || !vacancyInput || !phoneInput) {
    throw new Error("One of the inputs not found");
  }

  const nameValue = nameInput.value.trim();
  const vacancyValue = vacancyInput.value.trim();
  const phoneValue = phoneInput.value.trim();

  const errors = [];

  if (nameValue === "") {
    errors.push("Name must be filled out");
    nameInput.value = "";
  } else if (!isEnglish(nameValue)) {
    errors.push("Name must contain only English letters");
    nameInput.value = "";
  } else {
    const nameExists = Object.values(contactList)
      .flat()
      .some((item) => item.name.toLowerCase() === nameValue.toLowerCase());
    if (nameExists) {
      errors.push("This name already exists in data");
      nameInput.value = "";
    }
  }

  if (vacancyValue === "") {
    errors.push("Vacancy must be filled out");
    vacancyInput.value = "";
  } else if (!isEnglish(vacancyValue)) {
    errors.push("Vacancy must contain only English letters");
    vacancyInput.value = "";
  }

  const isPhoneValid = /^\+7\d*$/.test(phoneValue);
  if (phoneValue === "") {
    errors.push("Phone must be filled out");
    phoneInput.value = "";
  } else if (!isPhoneValid) {
    errors.push("Phone number must start with +7 and contain only digits");
    phoneInput.value = "";
  }

  if (errors.length > 0) {
    alert(errors.join("\n"));
    return false;
  }

  return true;
}
