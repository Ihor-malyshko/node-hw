const {
  saveContact,
  findContacts,
  findContactById,
  modifyContactById,
  removeContactById,
} = require("./contacts.model");

exports.createContact = async (req, res, next) => {
  try {
    const newContact = await saveContact(req.body);

    return res.status(201).send(newContact);
  } catch (err) {
    next(err);
  }
};

exports.getContacts = async (req, res, next) => {
  try {
    const contacts = await findContacts();
    return res.status(200).send(contacts);
  } catch (err) {
    next(err);
  }
};

exports.getContactById = async (req, res, next) => {
  try {
    const contact = await findContactById(req.params.id);
    if (!contact) {
      return res.status(404).send("Contact not found");
    }

    return res.status(200).send(contact);
  } catch (err) {
    next(err);
  }
};

exports.updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;

    const contact = await findContactById(id);
    if (!contact) {
      return res.status(404).send("Contact not found");
    }
    const updatedContact = await modifyContactById(contact, req.body);

    return res.status(200).send(updatedContact);
  } catch (err) {
    next(err);
  }
};

exports.deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;

    const contact = await findContactById(id);
    if (!contact) {
      return res.status(404).send("Contact not found");
    }

    await removeContactById(contact);

    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};
