const listHtml = document.getElementById("list");

const createContactItem = (contactData) => {
  const [name, vacancy, tel] = contactData;

  const newContact = document.createElement("div");
  newContact.className = "itemInfo__newConact";

  const nameDiv = document.createElement("div");
  nameDiv.textContent = `Имя: ${name.value}`;

  const vacancyDiv = document.createElement("div");
  vacancyDiv.textContent = `Вакансия: ${vacancy.value}`;

  const phoneDiv = document.createElement("div");
  phoneDiv.textContent = `Телефон: ${tel.value}`;

  newContact.append(nameDiv, vacancyDiv, phoneDiv);

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
  letterDiv.textContent = key;

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

  const id = li.id;
  if (!id) return;

  const contacts = document.querySelectorAll(`#${id} .itemInfo__newConact`);

  const isActive = Array.from(contacts).some((el) =>
    el.classList.contains("active")
  );

  contacts.forEach((el) => {
    if (isActive) {
      el.classList.remove("active");
      li.classList.remove("active");
    } else {
      el.classList.add("active");
      li.classList.add("active");
    }
  });
};
