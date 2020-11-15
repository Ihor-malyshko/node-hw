const uuid = require("uuid");

const path = require("path");
const contactsPath = path.join(__dirname, "../db/contacts.json");

const fs = require("fs");

exports.saveContact = (contactParams) => {
  const contacts = readFile();
  const newContact = {
    id: uuid.v4(),
    ...contactParams,
  };

  contacts.push(newContact);
  writeFile(contacts);
  return newContact;
};

exports.findContacts = () => {
  const contacts = readFile();
  return contacts;
};

exports.findContactById = (id) => {
  const contacts = readFile();
  return contacts.find((contact) => contact.id === id);
};

exports.modifyContactById = (index, contactParams) => {
  const contacts = readFile();
  const contactIndex = index - 1;
  contacts[contactIndex] = {
    ...contacts[contactIndex],
    ...contactParams,
  };
  writeFile(contacts);

  return contacts[contactIndex];
};

exports.removeContactById = (index) => {
  const contacts = readFile();

  const contactIndex = index - 1;
  contacts.splice(contactIndex, 1);
  writeFile(contacts);
};

function readFile() {
  const contactsStr = fs.readFileSync(contactsPath, "utf-8");
  return JSON.parse(contactsStr);
}

function writeFile(contacts) {
  const str = JSON.stringify(contacts);
  fs.writeFileSync(contactsPath, str, (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
}
