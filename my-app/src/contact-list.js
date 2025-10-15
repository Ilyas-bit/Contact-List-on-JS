export const contactList = {};

export const makeContactList = () => {
  const startCharCode = "a".charCodeAt(0);

  for (let i = 0; i < 26; i++) {
    const char = String.fromCharCode(startCharCode + i);
    contactList[char] = [];
  }
};

makeContactList();
