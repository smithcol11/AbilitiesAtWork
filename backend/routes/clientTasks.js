const express = require('express');
const Client = require('../schema/client');
const router = express.Router();

router.put('/:userID', async (req, res) => {
  try {
    const userID = req.params.userID;
    const client = await Client.findByIdAndUpdate(userID, req.body, { new: true });
    if (!client) return res.status(404).send('The client with the given ID was not found.');

    res.send(client);
  } catch (error) {
    res.status(500).send('An error occurred while updating the client.');
  }
});

router.delete('/:userID', async (req, res) => {
  try {
    const userID = req.params.userID;
    const client = await Client.findByIdAndDelete(userID);
    if (!client) return res.status(404).send('The client with the given ID was not found.');

    res.send(client);
  } catch (error) {
    res.status(500).send('An error occurred while deleting the client.');
  }
});

module.exports = router;
