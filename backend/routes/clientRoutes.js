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
      industry: req.body.industry.toLowerCase(),
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
    const result = await Client.updateOne(
      { _id: req.body.data._id },
      req.body.data,
      { new: true }
    );

    if (result.matchedCount == 0) {
      return res.status(404).send({ error: "Client not found when updating" });
    }

    res.send(result);
  } catch (error) {
    res.status(500).send({ error: "Error updating client" });
  }
});

router.delete("/deleteClient", async (req, res) => {
  try {
    const result = await Client.deleteOne({ _id: req.body._id });

    if (result.deletedCount == 0) {
      return res.status(404).send({ error: "Client not found when deleting" });
    }

    res.send(result);
  } catch (error) {
    console.log(error);
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
