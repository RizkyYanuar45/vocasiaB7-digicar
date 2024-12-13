const Testimoni = require("../models/Testimoni");

exports.addTestimoni = async (req, res) => {
  try {
    const { file, body } = req;
    if (file) {
      body.image = file.path; 
    }
    const testimoni = await Testimoni.create(req.body); 
    res.status(201).json(testimoni);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getTestimoni = async (req, res) => {
  try {
    const testimonis = await Testimoni.find(); 
    res.json(testimonis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTestimoni = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (req.file) {
      updates.image = req.file.path; 
    }

    const testimoni = await Testimoni.findByIdAndUpdate(id, updates, {
      new: true, 
    });

    if (testimoni) {
      res.json(testimoni); 
    } else {
      res.status(404).json({ message: "Testimoni not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTestimoni = async (req, res) => {
  try {
    const { id } = req.params;

    const testimoni = await Testimoni.findByIdAndDelete(id);

    if (testimoni) {
      res.json({ message: "Testimoni deleted" });
    } else {
      res.status(404).json({ message: "Testimoni not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
