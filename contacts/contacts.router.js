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
  validateIdSchema,
} = require("./contacts.schemes");

const router = Router();

// CRUD

// 1. C - Create
router.post("/", validate(createContactSchema), createContact);

// 2. R - Read
router.get("/", getContacts);
router.get("/:id", validate(validateIdSchema, "params"), getContactById);

// // 3. U - Update
router.put(
  "/:id",
  validate(validateIdSchema, "params"),
  validate(updateContactSchema),
  updateContact
);

// 4. D - Delete
router.delete("/:id", validate(validateIdSchema, "params"), deleteContact);

exports.contactsRouter = router;
