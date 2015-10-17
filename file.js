var fs = require("fs"),
	fsTools = require("fs-tools");

exports.init = function (callback) {
	fsTools.remove("/tmp/data", function () {
		// Gulp err
		fsTools.mkdir("/tmp/data/tasks_0001", function () {
			// Gulp err
			callback(null);
		});
	});
}

exports.set = function (collection, id, data, callback) {
	data = JSON.stringify(data);
	fs.writeFile("/tmp/data/tasks_0001/" + id, data, function (err) {
		if (err) {
			if (callback) {
				callback(err);
			} else {
				console.error(err);
			}
			return;
		}

		callback && callback(null);
	});

};

exports.dispose = function () {
	// Nothing
};