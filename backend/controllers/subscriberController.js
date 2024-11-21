const Subscriber = require('../models/Subscriber');

const addSubscriber = async (req, res) => {
  const { email } = req.body;

  try {
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ message: 'Email sudah tersubscribe!' });
    }

    const newSubscriber = await Subscriber.create({ email });
    res.status(201).json({ message: 'Subscribe berhasil!', data: newSubscriber });
  } catch (error) {
    res.status(500).json({ message: 'Gagal untuk subscribe!', error: error.message });
  }
};

const getSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find({});
    res.status(200).json(subscribers);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan!', error: error.message });
  }
};


const removeSubscriber = async (req, res) => {
  const { email } = req.params;

  try {
    const deletedSubscriber = await Subscriber.findOneAndDelete({ email });
    if (!deletedSubscriber) {
      return res.status(404).json({ message: 'Email tidak ditemukan!' });
    }

    res.status(200).json({ message: 'Unsubscribed berhasil!' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal untuk unsubscribe', error: error.message });
  }
};

module.exports = { addSubscriber, getSubscribers, removeSubscriber };
