(function() {
	var app = angular.module("myApp");

	app.factory("constantsModel", function() {
		var constantsModel = {
				"defaultR": 2,
				"probabilityDecimals": 8,
				"sourceMaxLength": 9999,
				"initialChar": '0'
			};

		return constantsModel;
	});

}());