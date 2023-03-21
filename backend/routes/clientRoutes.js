//update client data and delete a client

const express = require("express");
const router = express.Router();
const Client = require("../schema/client");

router.post("/addClient", async (req, res) => {
  try {
    await Client.insertMany({
      firstName: req.body.firstName.toLowerCase(),
      middleInitial: req.body.middleInitial.toLowerCase(),
      lastInitial: req.body.lastInitial.toLowerCase(),
      hours: req.body.hours,
      industry: req.body.industry.map((industry) => industry.toLowerCase()),
      enteredBy: "FIX ME",
      updatedBy: "FIX ME",
    });
    res.status(201).send();
  } catch (error) {
    res.status(500).send({ error: "Error adding client" });
  }
});

router.put("/editClient", async (req, res) => {
  try {
    req.body.data.firstName = req.body.data.firstName.toLowerCase();
    req.body.data.middleInitial = req.body.data.middleInitial.toLowerCase();
    req.body.data.lastInitial = req.body.data.lastInitial.toLowerCase();
    req.body.data.industry = req.body.data.industry.map((industry) =>
      industry.toLowerCase()
    );
    console.log(req.body);
    const client = await Client.updateOne(
      {
        firstName: req.body.initialData.firstName.toLowerCase(),
        middleInitial: req.body.initialData.middleInitial.toLowerCase(),
        lastInitial: req.body.initialData.lastInitial.toLowerCase(),
      },
      req.body.data,
      { new: true }
    );

    if (!client) {
      return res.status(404).send({ error: "Client not found when updating" });
    }

    res.send(client);
  } catch (error) {
    res.status(500).send({ error: "Error updating client" });
  }
});

router.delete("/deleteClient", async (req, res) => {
  try {
    const client = await Client.deleteOne({
      firstName: req.body.firstName.toLowerCase(),
      middleInitial: req.body.middleInitial.toLowerCase(),
      lastInitial: req.body.lastInitial.toLowerCase(),
    });

    if (!client) {
      return res.status(404).send({ error: "Client not found when deleting" });
    }

    res.send(client);
  } catch (error) {
    res.status(500).send({ error: "Error deleting client" });
  }
});

router.get("/GetAllClients", (req, res) => {
  try {
    Client.find({}).then((data) => {
      // Capitalize the first character of each string property
      const capitalizedData = data.map((client) => {
        return {
          ...client._doc,
          firstName:
            client.firstName.charAt(0).toUpperCase() +
            client.firstName.slice(1),
          middleInitial: client.middleInitial.toUpperCase(),
          lastInitial: client.lastInitial.toUpperCase(),
          industry: client.industry.map(
            (industry) => industry.charAt(0).toUpperCase() + industry.slice(1)
          ),
        };
      });

      res.json(capitalizedData);
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
