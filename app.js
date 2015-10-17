var Chance = require("chance"),
	chance = new Chance();

var moduleName = process.argv[2];
if (!moduleName) {
	console.log("Usage: ", process.argv[0], process.argv[1], "<sqlite/file>");
	process.exit(0);
}

var db = require("./" + moduleName);

console.log("Initializing data...");

var data = {},
	ids = [],
	keys = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

for (var i = 0; i < 1000; i++) {
	var item = {
		id: chance.guid()
	};
	for (var j = 0; j < keys.length; j++) {
		item[keys[j]] = chance.string();
	}
	data[item.id] = item;
	ids.push(item.id);
}

console.log("Initializing database...");

db.init(function () {
	console.log("Starting main loop...");

	var count = 0;
	
	var mainLoop = setInterval(function () {
		// Update data item
		var id = chance.pick(ids);
		var key = chance.pick(keys);
		data[id][key] = chance.string();

		db.set("00001", id, data[id]);
		//console.log(id + "[" + key + "] = " + data[id][key]);

		count++;
		if (count % 100 === 0) {
			console.log("Update count: " + count);
		}
	}, 10);

	process.on("SIGINT", function() {
		db.dispose();
		clearInterval(mainLoop)
		console.log("Done");
	});
});
