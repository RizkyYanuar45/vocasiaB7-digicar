const Contact = require("./../models/Contact");

const updateContact = async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedDate: Date.now() },
      { new: true }
    );
    if (!updatedContact) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update blog", error: error.message });
  }
};

module.exports = { updateContact };
