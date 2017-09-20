// error codes
const CODE_MISSING_PARAMETER = 1;

Parse.Cloud.define('saveVibration', function(req, res) {
	if (!req.params["vibration"]){
		failResponse(res, CODE_MISSING_PARAMETER, "no vibration value found");
		return;
	}

	if (!req.params["ip_address"]){
		failResponse(res, CODE_MISSING_PARAMETER, "no ip_address value found");
		return;
	}

	vibration = req.params["vibration"];
	ip_address = req.params["ip_address"];

	var measurement = new Parse.Object("Measurement");
	measurement.set("vibration", vibration);
	measurement.set("ip_address", ip_address);
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
