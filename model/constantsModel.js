(function() {
	var app = angular.module("myApp");

	app.factory("constantsModel", function() {
		var constantsModel = {
				"defaultR": 2,
				"probabilityDecimals": 8,
				"sourceMaxLength": 9999,
				"initialChar": '0',
				"minR": 2,
				"maxR": 99,
				"notEmptyFieldErrorMessage": "este campo no puede estar vacío",
				"lessThanFieldErrorMessage": "este campo no puede ser menor a ",
				"greaterThanFieldErrorMessage": "este campo no puede ser mayor a "
			};

		return constantsModel;
	});

}());