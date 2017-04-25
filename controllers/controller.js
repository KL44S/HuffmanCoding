(function() {
	var app = angular.module("myApp");

	app.controller("controller", ["$scope", "constantsModel", "messagesModel", "sourceService", "entropyService", "compactCodeGeneratorService", 
						function(model, constantsModel, messagesModel, sourceService, entropyService, compactCodeGeneratorService) {

		model.textHasChanged = function() {
			if (model.source.text != null && model.source.text != undefined) {
				try {
					sourceService.generateSymbols(model.source);
					model.source.entropy = entropyService.getEntropy(model.source.symbols, model.code.r);
					compactCodeGeneratorService.encode(model.code);						
				}
				catch(exception) {
					alert(exception.message);
					console.log(exception.message);
				}
			}
			else {
				//Mostrar error
				alert(messagesModel.internalError);
				console.log(messagesModel.internalError);
			}
		};

		model.source = {
			"text": "",
			"entropy": 0,
			"symbols": []
		};

		model.code = {
			"r": constantsModel.defaultR,
			"source": model.source,
			"codedText": "",
			"L": 0,
			"performance": 0
		};

	}]);
})();
