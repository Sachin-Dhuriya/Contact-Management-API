const express = require('express');
const router = express.Router();
const Contact = require("../models/Contact")
const { contactValidationSchema } = require("../validators/contactValidator")
const mongoose = require('mongoose');
const { createContact, getAllContact, getContactById, updateContact, deleteContact } = require("../controller/contactController")

router.post("/", createContact)

router.get("/", getAllContact)

router.get("/:id", getContactById)

router.put("/:id", updateContact)

router.delete("/:id", deleteContact)




module.exports = router;