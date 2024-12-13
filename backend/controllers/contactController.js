const Contact = require("./../models/Contact");

// Create Contact
const createContact = async (req, res) => {
  try {
    const newContact = new Contact({
      tiktok: req.body.tiktok,
      instagram: req.body.instagram,
      facebook: req.body.facebook,
      youtube: req.body.youtube,
      twitter: req.body.twitter,
      linkedln: req.body.linkedln,
      admin_one: req.body.admin_one,
      admin_two: req.body.admin_two,
      email: req.body.email
    });

    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    res.status(500).json({ message: "Gagal membuat kontak", error: error.message });
  }
};

// Update Contact
const updateContact = async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedDate: Date.now() },
      { new: true }
    );
    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: "Failed to update contact", error: error.message });
  }
};

// Get All Contacts
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Failed to get contacts", error: error.message });
  }
};

