//update client data and delete a client

const express = require("express");
const router = express.Router();
const Client = require("../schema/client");

router.post("/addClient", async (req, res) => {
  try {
    await Client.insertMany({
      firstName: req.body.firstName,
      middleInitial: req.body.middleInitial,
      lastInitial: req.body.lastInitial,
      hours: req.body.hours,
      industry: req.body.industry,
      enteredBy: "FIX ME",
      updatedBy: "FIX ME",
    });
    res.status(201).send();
  } catch (error){
    res.status(500).send({error: "Error adding client"})
  }
});

router.put("/editClient", async (req, res) => {
  try {
    console.log("Testc: ", req.body)
    //print("Test")
    const client = await Client.updateOne(
      {
        firstName: req.body.initialData.firstName,
        middleInitial: req.body.initialData.middleInitial,
        lastInitial: req.body.initialData.lastInitial,
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
      firstName: req.body.firstName,
      middleInitial: req.body.middleInitial,
      lastInitial: req.body.lastInitial,
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
    Client.find({})
      .then((data) => {
        res.json(data);
      })
  } catch(error){
    console.log(err)
  }
});

module.exports = router;
