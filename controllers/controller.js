(function() {
	var app = angular.module("myApp");

	app.controller("controller", ["$scope", "constantsModel", "messagesModel", "compactCodeGeneratorService", 
						function(model, constantsModel, messagesModel, compactCodeGeneratorService) {

		model.textHasChanged = function() {
			if (model.text != null && model.text != undefined && model.text != "") {
				model.source = compactCodeGeneratorService.getSource(model.text);			
			}
		};

		model.code = {
			"r": constantsModel.defaultR
		};

	}]);
})();
