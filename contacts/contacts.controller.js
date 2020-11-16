const { ContactModel } = require("./contacts.model");

exports.createContact = async (req, res, next) => {
  try {
    const newContact = await ContactModel.create(req.body);

    return res.status(201).send(newContact);
  } catch (err) {
    next(err);
  }
};

exports.getContacts = async (req, res, next) => {
  try {
    const contacts = await ContactModel.find();
    return res.status(200).send(contacts);
  } catch (err) {
    next(err);
  }
};

exports.getContactById = async (req, res, next) => {
  try {
    const contact = await ContactModel.findById(req.params.id);
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
    const updatedContact = await ContactModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedContact) {
      return res.status(404).send("Contact not found");
    }
    // const updatedContact = modifyContactById(contact.id, req.body);
    return res.status(200).send(updatedContact);
  } catch (err) {
    next(err);
  }
};

exports.deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleteContact = await ContactModel.findByIdAndDelete(id);
    if (!deleteContact) {
      return res.status(404).send("Contact not found");
    }
    // removeContactById(contact.id);
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};
