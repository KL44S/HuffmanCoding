(function() {
	var app = angular.module("myApp");

	app.factory("constantsModel", function() {
		var constantsModel = {
				"defaultR": 2
			};

		return constantsModel;
	});

}());