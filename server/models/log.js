const { Schema, model } =  require("mongoose");

const logSchema = new Schema(
  {
		device_id: {
			type: String,
			required: [true, "Device Id is required to enter a Log entry"],
		},
    hours: {
			type: Number
		},
		reading: {
			type: Number
		},
  },
  {
    timestamps: true,
  },
);

const Log = model("Log", logSchema);
module.exports =  Log;