const fs = require("fs/promises");
const path = require("path");

async function main() {
  const contactsPath = path.join(__dirname, "./db/contacts.json");
  console.log(contactsPath);
  const data2 = await fs.readFile(contactsPath, "utf8");
  // console.log(data2);
  const contactsParse = JSON.parse(data2);
  const arr = contactsParse.map((item) => item.id);
  console.log(arr);
  const str = `[ ${arr.toString()} ]`;
  await fs.writeFile("test.txt", str);
  const data = await fs.readFile("test.txt", "utf8");
  console.log(JSON.parse(data));
}

module.exports = main;

/*
 * Раскомментируй и запиши значение
 * const contactsPath = ;
 */

// // TODO: задокументировать каждую функцию
// function listContacts() {
//   // ...твой код
// }

function getContactById(contactId) {
  // ...твой код
}

// function removeContact(contactId) {
//   // ...твой код
// }

// function addContact(name, email, phone) {
//   // ...твой код
// }
