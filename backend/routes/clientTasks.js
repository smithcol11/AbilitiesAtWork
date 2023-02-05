const express = require('express');
const Client = require('../schema/client');
const router = express.Router();

router.put('/:clientID', async (req, res) => {
  try {
    const clientId = req.params.clientID;
    const client = await Client.findByIdAndUpdate(clientId, req.body, { new: true });
    if (!client) return res.status(404).send('The client with the given ID was not found.');

    res.send(client);
  } catch (error) {
    res.status(500).send('An error occurred while updating the client.');
  }
});

router.delete('/:clientID', async (req, res) => {
  try {
    const clientId = req.params.clientID;
    const client = await Client.findByIdAndDelete(clientId);
    if (!client) return res.status(404).send('The client with the given ID was not found.');

    res.send(client);
  } catch (error) {
    res.status(500).send('An error occurred while deleting the client.');
  }
});

module.exports = router;
