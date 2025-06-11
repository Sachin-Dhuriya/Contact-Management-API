const Contact = require("../models/Contact");
const { contactValidationSchema } = require("../validators/contactValidator")
const mongoose = require('mongoose');

//-----Create Contact-----
const createContact = async (req, res) => {
    try {
        let { error } = contactValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message })
        }

        const newContact = new Contact(req.body);
        await newContact.save();

        res.status(201).json({ message: "Contact saved successfully", newContact })

    } catch (error) {
        res.status(500).json({ error: "Server Error..!!!" })
    }
}

//-----Get All Contact-----

const getAllContact = async (req, res) => {
    try {
        const allContacts = await Contact.find();
        if (allContacts.length === 0) {
            return res.status(200).json({ message: "No contacts found" });
        }
        res.status(200).json(allContacts)
    } catch (error) {
        res.status(500).json({ error: "Server Error..!!!" })
    }
}

//-----Get  Contact By Id-----

const getContactById = async (req, res) => {
    try {
        let id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid contact ID" });
        }

        let contact = await Contact.findById(id)

        if (!contact) {
            return res.status(404).json({ error: "Contact does not exist" })
        }

        res.status(200).json(contact)

    } catch (error) {
        res.status(500).json({ error: "Server Error..!!!" })
    }
}

//------Update Contact-----

const updateContact = async (req, res) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid Contact ID..!!!" })
        }

        let contact = await Contact.findById(id);
        if (!contact) {
            return res.status(404).json({ error: "Contact does not exist..!!!" })
        }

        let { error } = contactValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message })
        }

        const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true })

        res.status(201).json({ message: "Contact Updated Successfull....", updatedContact })

    } catch (error) {
        res.status(500).json({ error: "Server Error..!!!" })
    }
}

//--------Delete Contact-------

const deleteContact = async (req, res) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Contact ID..!!!" })
        }

        let contact = await Contact.findById(id);
        if (!contact) {
            return res.status(404).json({ message: "Contact Does not found..!!!" })
        }

        let deletedContact = await Contact.findByIdAndDelete(id)

        res.status(200).json({ message: "Contact Deleted Successfull...", deletedContact })

    } catch (error) {
        res.status(500).json({ error: "Server Error..!!!" })
    }
}

module.exports = {
    createContact,
    getAllContact,
    getContactById,
    updateContact,
    deleteContact
};