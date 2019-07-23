const winston = require("winston");
const mongoose = require("mongoose");
const config = require("config");
const {State} = require("../models/states");
const states = require("../data/states");
const db = config.get("db");


module.exports = () => mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true
}).then(checkStates);


function checkStates() {
  State.getAll().then(result => {
      if (!result.length) {
        uploadStates();
      } else {
        winston.info(`Connect to ${db}...`)
      }
    }
  );
}

function uploadStates() {
  State.collection.insertMany(states, function (err) {
    if (err) winston.error(`Cannot create states: ${err}`);
  })
}