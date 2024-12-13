const Contact = require("./../models/Contact");

const getContact = async (req, res) => {
  try {
    const contact = await Contact.findOne();
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch contact", error: error.message });
  }
};

const updateContact = async (req, res) => {
  try {
    const updatedContact = await Contact.findOneAndUpdate(
      {},
      { ...req.body, updatedDate: Date.now() },
      { new: true }
    );
    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update contact", error: error.message });
  }
};

module.exports = {
  getContact,
  updateContact,
};
