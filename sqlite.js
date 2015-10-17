var sqlite3 = require("sqlite3").verbose();

var db = new sqlite3.Database("/tmp/sqlite.db");

exports.init = function (callback) {
	db.serialize(function() {
		db.run("DROP TABLE IF EXISTS Tasks_0001");
		db.run("CREATE TABLE Tasks_0001 (uuid VARCHAR PRIMARY KEY, data TEXT)", function (err) {
			return callback(err);
		});
	});
}

exports.set = function (collection, id, data, callback) {
	data = JSON.stringify(data);
	db.run("INSERT OR REPLACE INTO Tasks_0001 VALUES($1, $2)", [id, data], function (err) {
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
	db.close();
};