//update client data and delete a client

const express = require("express");
const router = express.Router();
const Client = require("../schema/client")

router.put('/editClient/:initials', async (req, res) => {
  try {
    const client = await Client.findOneAndUpdate({ initials: req.params.initials }, req.body, { new: true });
    if (!client) {
      return res.status(404).send({ error: 'Client not found when updating' });
    }

    res.send(client);
  } catch (error) {
    res.status(500).send({ error: 'Error updating client' });
  }
});

router.delete('/deleteClient/:initials', async (req, res) => {
  try {
    const client = await Client.findOneAndRemove({ initials: req.params.initials });
    if (!client) {
      return res.status(404).send({ error: 'Client not found when deleting' });
    }

    res.send(client);
  } catch (error) {
    res.status(500).send({ error: 'Error deleting client' });
  }
});

module.exports = router;
