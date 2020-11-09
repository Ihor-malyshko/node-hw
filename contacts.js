const fs = require("fs/promises");
// const { uuid } = require("uuidv4");
function getRandomId() {
  return Math.floor(Math.random() * 100);
}

const path = require("path");
const contactsPath = path.join(__dirname, "./db/contacts.json");

async function getContacts() {
  const contactsStr = await fs.readFile(contactsPath, "utf8");
  const contacts = JSON.parse(contactsStr);
  console.log(contacts);
}

// // TODO: задокументировать каждую функцию
async function listContacts() {
  // ...твой код
  const contactsStr = await fs.readFile(contactsPath, "utf8");
  const contacts = JSON.parse(contactsStr);
  console.table(contacts);
}

async function getContactById(contactId) {
  // ...твой код
  const contactsStr = await fs.readFile(contactsPath, "utf8");
  const contacts = JSON.parse(contactsStr);
  const answer = contacts.find((item) => item.id === contactId);

  console.log(answer === undefined ? "not find" : answer);
}

async function removeContact(contactId) {
  // ...твой код
  const contactsStr = await fs.readFile(contactsPath, "utf8");
  const contacts = JSON.parse(contactsStr);
  const data = contacts.filter((item) => item.id !== contactId);
  const str = JSON.stringify(data);
  fs.writeFile(contactsPath, str, (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });

  console.log(contacts.length !== data.length ? "done" : "no find");
}

async function addContact(name, email, phone) {
  // ...твой код
  const contactsStr = await fs.readFile(contactsPath, "utf8");
  const contacts = JSON.parse(contactsStr);
  const obj = { id: getRandomId(), name, email, phone };
  contacts.push(obj);
  const str = JSON.stringify(contacts);
  fs.writeFile(contactsPath, str, (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });

  console.log("done");
}

module.exports = { listContacts, getContactById, removeContact, addContact };
