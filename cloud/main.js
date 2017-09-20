// error codes
const CODE_MISSING_PARAMETER = 1;

Parse.Cloud.define('saveVibration', function(req, res) {
	if (!req.params["vibration"]){
		failResponse(res, CODE_MISSING_PARAMETER, "no vibration value found");
		return;
	}

	address = req.ip;
	console.log("Client ip = %s", address);
	vibration = req.params["vibration"];

	var measurement = new Parse.Object("Measurement");
	measurement.set("address", address);
	measurement.set("vibration", vibration);
	measurement.save(null, {
		useMasterKey: true,
		success: function(object){
			res.success(object);
		},
		error: function(object, error){
			failResponse(res, error.code, error.message);
		}
	});
});

function failResponse(response, code, info){
	response.error({
		"code" : code,
		"info" : info
	});
}
