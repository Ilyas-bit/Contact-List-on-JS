export const contactList = {};

export const makeContactList = () => {
  const startCharCode = "a".charCodeAt(0);

  for (let i = 0; i < 26; i++) {
    const char = String.fromCharCode(startCharCode + i);
    contactList[char] = [];
  }
};

makeContactList();

export const delContact = (id, name) => {
  console.log(id, name);
  const contacts = contactList[id];
  if (!contacts) return;

  for (let i = contacts.length - 1; i >= 0; i--) {
    if (contacts[i].name === name) {
      contacts.splice(i, 1);
    }
  }

  console.log(contactList);
};
