const express = require("express");
const Idea = require("../models/Idea");

const ideasRouter = express.Router();

ideasRouter.get("/", async (req, res) => {
  try {
    const ideas = await Idea.find();
    res.send({ success: true, data: ideas });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Something went wrong" });
  }
});

ideasRouter.get("/:id", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    res.send({ success: true, data: idea });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Something went wrong" });
  }
});

ideasRouter.post("/", async (req, res) => {
  const idea = new Idea({
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
  });

  try {
    const savedIdea = await idea.save();
    res.send({ success: true, data: savedIdea });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Something went wrong" });
  }
});

ideasRouter.put("/:id", async (req, res) => {
  try {
    // Validation
    const idea = await Idea.findById(req.params.id);
    // Match the usernames
    if (idea.username === req.body.username) {
      const updatedIdea = await Idea.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            text: req.body.text,
            tag: req.body.tag,
            username: req.body.username,
          },
        },
        { new: true }
      );
      res.send({ success: true, data: updatedIdea });
    }
    // Usernames do not match
    res.status(403).send({
      success: false,
      message: "You're not authorized to update this resource",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Something went wrong" });
  }
});

ideasRouter.delete("/:id", async (req, res) => {
  try {
    // Validation
    const idea = await Idea.findById(req.params.id);
    // Match the usernames
    if (idea.username === req.body.username) {
      await Idea.findByIdAndDelete(req.params.id);
      return res.send({ success: true, data: {} });
    }

    // Usernames do not match
    res.status(403).send({
      success: false,
      message: "You're not authorized to delete this resource",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Something went wrong" });
  }
});

module.exports = ideasRouter;
