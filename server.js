//------------------------------------------Requiring Express-------------------------
const express = require('express');
const app = express();
//------------------------------------------DOT-ENV-----------------------------------
require('dotenv').config();
//------------------------------------------Mongo-Connectivity------------------------
const mongoose = require('mongoose');
let mongoConnection = require('./config/mongo')
mongoConnection.then(() => { console.log(`Database Connected Successfully.....`); }).catch((error => { console.log(`Problem in connecting the DataBase......`); }))
//-------------------------------------------Contact Schema----------------------------
const Contact = require("./models/Contact")
//------------------------------------------Validator----------------------------------
const { contactValidationSchema } = require("./validators/contactValidator")

//------------------------------------------Middlewares--------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
//------------------------------------------API Routes---------------------------------
app.post("/api/contacts", async (req, res) => {
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
})

app.get("/api/contacts", async (req, res) => {
    try {
        const allContacts = await Contact.find();
        if (allContacts.length === 0) {
            return res.status(200).json({ message: "No contacts found" });
        }
        res.status(200).json(allContacts)
    } catch (error) {
        res.status(500).json({ error: "Server Error..!!!" })
    }
})

app.get("/api/contacts/:id", async (req, res) => {
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
})

app.put("/api/contacts/:id", async(req,res)=>{
    try {
        const id = req.params.id;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({error: "Invalid Contact ID..!!!"})
        }

        let contact = await Contact.findById(id);
        if(!contact){
            return res.status(404).json({error: "Contact does not exist..!!!"})
        }

        let {error} = contactValidationSchema.validate(req.body);
        if(error){
            return res.status(400).json({error: error.details[0].message})
        }

        const updatedContact = await Contact.findByIdAndUpdate(id,req.body,{new : true})

        res.status(201).json({message: "Contact Updated Successfull....",updatedContact})
        
    } catch (error) {
        res.status(500).json({error: "Server Error..!!!"})
    }
})

app.delete("/api/contacts/:id",async(req,res)=>{
    try {
        const id = req.params.id;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message: "Invalid Contact ID..!!!"})
        }

        let contact = await Contact.findById(id);
        if(!contact){
            return res.status(404).json({message: "Contact Does not found..!!!"})
        }
        
        let deletedContact = await Contact.findByIdAndDelete(id)

        res.status(200).json({message: "Contact Deleted Successfull...", deletedContact})

    } catch (error) {
        res.status(500).json({error:"Server Error..!!!"})
    }
})





app.listen(process.env.PORT, () => {
    console.log(`Server is listenning on port${process.env.PORT}.......`);
})