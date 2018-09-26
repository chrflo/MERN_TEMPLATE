const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/*
 * Create a Schema for the Wods
 * Lists and formats from http://www.woddrive.com/list-of-crossfit-wods.html
 * TODO: finish
 */
const WodSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: [
      "AMRAP",
      "Chipper",
      "Couplet",
      "EMOM",
      "Endurance",
      "Hero",
      "Ladder",
      "Rowing",
      "Singlet",
      "Strength",
      "Tabata",
      "Time cap",
      "Triplet",
      "Weightlifting"
    ]
  },
  amrap: {
    maxRounds: {
      type: Number,
      require: true
    },
    timecap: {
      type: Number,
      require: true
    },
    movements: {
      type: Object,
      require: true
    }
  },
  chipper: {
    maxTime: {
      type: Number,
      require: true
    },
    movements: {
      type: Object,
      require: true
    }
  }
});

module.exports = Wod = mongoose.model("users", WodSchema);
