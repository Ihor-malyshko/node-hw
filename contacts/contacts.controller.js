const {
  saveContact,
  findContacts,
  findContactById,
  modifyContactById,
  removeContactById,
} = require("./contacts.model");

exports.createContact = async (req, res, next) => {
  try {
    const newContact = saveContact(req.body);

    return res.status(201).send(newContact);
  } catch (err) {
    next(err);
  }
};

exports.getContacts = (req, res, next) => {
  try {
    const contacts = findContacts();
    return res.status(200).send(contacts);
  } catch (err) {
    next(err);
  }
};

exports.getContactById = (req, res, next) => {
  try {
    const contact = findContactById(req.params.id);
    if (!contact) {
      return res.status(404).send("Contact not found");
    }

    return res.status(200).send(contact);
  } catch (err) {
    next(err);
  }
};

exports.updateContact = (req, res, next) => {
  try {
    const { id } = req.params;

    const contact = findContactById(id);
    if (!contact) {
      return res.status(404).send("Contact not found");
    }

    const updatedContact = modifyContactById(contact.id, req.body);

    return res.status(200).send(updatedContact);
  } catch (err) {
    next(err);
  }
};

exports.deleteContact = (req, res, next) => {
  try {
    const { id } = req.params;

    const contact = findContactById(id);
    if (!contact) {
      return res.status(404).send("Contact not found");
    }

    removeContactById(contact.id);

    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};
