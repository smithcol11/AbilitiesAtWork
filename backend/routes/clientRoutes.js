//update client data and delete a client

const express = require("express");
const router = express.Router();
const Client = require("../schema/client")

router.put('/editClient/:fullName', async (req, res) => {
  try {
    const client = await Client.findOneAndUpdate({ fullName: req.params.fullName }, req.body, { new: true });
    if (!client) {
      return res.status(404).send({ error: 'Client not found' });
    }

    res.send(client);
  } catch (error) {
    res.status(500).send({ error: 'Error updating client' });
  }
});

router.delete('/deleteClient/:fullName', async (req, res) => {
  try {
    const client = await Client.findOneAndRemove({ fullName: req.params.fullName });
    if (!client) {
      return res.status(404).send({ error: 'Client not found' });
    }

    res.send(client);
  } catch (error) {
    res.status(500).send({ error: 'Error deleting client' });
  }
});

module.exports = router;
