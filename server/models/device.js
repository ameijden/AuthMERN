const { Schema, model } =  require("mongoose");

const deviceSchema = new Schema(
  {
		device_id: {
			type: String,
			required: [true, "Device Id is required."],
			validate: {
        validator: (device_id) => Device.idIsUnique({ device_id }),
        message: () => `Deivce Id is already assigned to a device.`,
      },
		},
    company: {
			type: String
		},
		country: {
			type: String
		},
  },
  {
    timestamps: true,
  },
);

deviceSchema.statics.idIsUnique = async function (options) {
  return (await this.where(options).countDocuments()) === 0;
};

const Device = model("Device", deviceSchema);
module.exports =  Device;