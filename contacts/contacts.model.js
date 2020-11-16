const uuid = require("uuid");

const path = require("path");
const contactsPath = path.join(__dirname, "../db/contacts.json");

const fs = require("fs/promises");

exports.saveContact = async (contactParams) => {
  await readFile();
  const newContact = {
    id: uuid.v4(),
    ...contactParams,
  };

  contacts.push(newContact);
  await writeFile(contacts);
  return newContact;
};

exports.findContacts = async () => {
  await readFile();
  return contacts;
};

exports.findContactById = async (id) => {
  await readFile();
  return contacts.find((contact) => contact.id === id);
};

exports.modifyContactById = async (contact, contactParams) => {
  const contactIndex = contacts.indexOf(contact);
  contacts[contactIndex] = {
    ...contacts[contactIndex],
    ...contactParams,
  };

  await writeFile(contacts);
  return contacts[contactIndex];
};

exports.removeContactById = async (contact) => {
  const contactIndex = contacts.indexOf(contact);
  contacts.splice(contactIndex, 1);
  await writeFile(contacts);
};

async function readFile() {
  const contactsStr = await fs.readFile(contactsPath, "utf-8");
  contacts = JSON.parse(contactsStr);
}

async function writeFile(arr) {
  const str = JSON.stringify(arr);
  await fs.writeFile(contactsPath, str, (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
}
