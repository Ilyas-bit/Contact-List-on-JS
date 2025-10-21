export const contactList = {};

export const makeContactList = () => {
  const saved = localStorage.getItem("contactList");

  if (saved) {
    Object.assign(contactList, JSON.parse(saved));
    return;
  }

  const startCharCode = "a".charCodeAt(0);
  for (let i = 0; i < 26; i++) {
    const char = String.fromCharCode(startCharCode + i);
    contactList[char] = [];
  }

  saveContacts();
};

export const saveContacts = () => {
  localStorage.setItem("contactList", JSON.stringify(contactList));
};

export const delContact = (id, name) => {
  const contacts = contactList[id];
  if (!contacts) return;

  for (let i = contacts.length - 1; i >= 0; i--) {
    if (contacts[i].name === name) {
      contacts.splice(i, 1);
    }
  }

  saveContacts();
};

window.addEventListener("beforeunload", saveContacts);

makeContactList();
