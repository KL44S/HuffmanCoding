(function() {
	var app = angular.module("myApp");

	app.factory("messagesModel", ["constantsModel", function(constantsModel) {
		var messagesModel = {
				"sourceMaxLengthError": "La fuente tiene que tener menos de " + constantsModel.sourceMaxLength + " caracteres",
				"internalError": "Error interno"
			};

		return messagesModel;
	}]);

}());