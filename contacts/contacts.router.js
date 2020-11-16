const { Router } = require("express");
const { validate } = require("../helpers/validate.middleware");
const {
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact,
} = require("./contacts.controller");
const {
  createContactSchema,
  updateContactSchema,
} = require("./contacts.schemes");

const router = Router();

// CRUD

// 1. C - Create
router.post("/", validate(createContactSchema), createContact);

// 2. R - Read
router.get("/", getContacts);
router.get("/:id", getContactById);

// // 3. U - Update
router.put("/:id", validate(updateContactSchema), updateContact);

// 4. D - Delete
router.delete("/:id", deleteContact);

exports.contactsRouter = router;
