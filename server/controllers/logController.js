const LogModel = require("../models/log");
const DeviceModel = require("../models/device");


exports.addLogEntry = async (req, res) => {
	const { device_id } = req.body;
	let device;

	try {
		device = await DeviceModel.findOne({ device_id: device_id });
		if (!device) {
			device = await DeviceModel.create({ device_id: device_id });
		}
	} catch (error) {
		res.status(400).json({ msg: "Request to add a new log record failed while finding an existing device or creating a new device record", error: error });
		return;
	}

	try {
		let log = await LogModel.create(req.body);
		res.status(200).json({ msg: "Log Record Added", log: log });
	} catch (error) {
		res.status(400).json({ msg: "Request to add a new log record failed", error: error });
	}
}


exports.findLogEntryById = async (req, res) => {
	const id = req.params.id;
	try {
		let logEntry = await LogModel.findById(id);
		res.status(200).json({ msg: "Log Entry Found", logEntry: logEntry });
	} catch (error) {
		res.status(400).json({ msg: "Request to find a log entry by id failed", error: error });
	}
}

exports.findLogEntriesByFilter = async (req, res) => {
	const { device_ids, countries, companies } = JSON.parse(req.params.filters)

	try {
		let devices = [];
		if (device_ids.length > 0) {
			devices = device_ids
		} else {
			devices = await DeviceModel.distinct("device_id",
				companies.length > 0 ?
					{ company: { $in: companies } }
					: countries.length > 0 ?
						{ country: { $in: countries } } : {});
		}

		let logEntries = await LogModel.find({ device_id: { $in: devices } });
		res.status(200).json({ msg: "Log Entries Found", logEntries: logEntries });
	} catch (error) {
		res.status(400).json({ msg: "Request to find a log entry using filters failed", error: error });
	}
}



exports.findLogEntryByDeviceId = async (req, res) => {
	const { device_id } = req.query;
	try {
		let logEntries = await LogModel.find({ device_id: device_id });
		res.status(200).json({ msg: "Device Record Found", logEntries: logEntries });
	} catch (error) {
		res.status(400).json({ msg: "Request to find log entries corresponding to a device Id failed", error: error });
	}
}

exports.getAllLogEntries = async (req, res) => {
	try {
		let logEntries = await LogModel.find();
		res.status(200).json({ msg: "All Device Records Found", logEntries: logEntries });
	} catch (error) {
		res.status(400).json({ msg: "Request to fetch all log entries failed", error: error });
	}
}

exports.deleteLogEntriesByFilter = async (req, res) => {
	const { device_ids, companies, countries } = JSON.parse(req.params.filters);
	try {
		let devices = [];
		if (device_ids.length > 0) {
			devices = device_ids
		} else {
			devices = await DeviceModel.distinct("device_id",
				companies.length > 0 ?
					{ company: { $in: companies } }
					: countries.length > 0 ?
						{ country: { $in: countries } } : {});
		}

		let logEntries = await LogModel.deleteMany({ device_id: { $in: devices } });
		res.status(200).json({ msg: "Log Entries Deleted Successfully" });
	} catch (error) {
		res.status(400).json({ msg: "Request to delete log entry failed", error: error });
	}
}

exports.deleteLogEntryByDeviceId = async (req, res) => {
	const id = req.params.id;
	try {
		await LogModel.deleteMany({ device_id: device_id });
		res.status(200).json({ msg: "Log Entries Deleted Successfully" });
	} catch (error) {
		res.status(400).json({ msg: "Request to delete log entry failed", error: error });
	}
}

exports.deleteLogEntriesByCompany = async (req, res) => {
	const company = req.params.company;

	try {
		let devices = await DeviceModel.distinct("device_id", { "company": { "$eq": company } });
		await LogModel.deleteMany({ device_id: { $in: devices } });
		res.status(200).json({ msg: "Log Entries Deleted Successfully" });
	} catch (error) {
		res.status(400).json({ msg: "Request to delete log entry failed", error: error });
	}
}

exports.deleteLogEntriesByCountry = async (req, res) => {
	const country = req.params.country

	try {
		let devices = await DeviceModel.distinct("device_id", { "country": { "$eq": country } });
		await LogModel.deleteMany({ device_id: { $in: devices } });
		res.status(200).json({ msg: "Log Entries Deleted Successfully" });
	} catch (error) {
		res.status(400).json({ msg: "Request to delete log entry failed", error: error });
	}
}



exports.deleteAllLogEntries = async (req, res) => {
	try {
		await LogModel.deleteMany();
		res.status(200).json({ msg: "All Log Entries Deleted Successfully" });
	} catch (error) {
		res.status(400).json({ msg: "Request to delete log entry failed", error: error });
	}
}
