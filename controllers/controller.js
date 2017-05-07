(function() {
	var app = angular.module("myApp");

	app.controller("controller", ["$scope", "constantsModel", "messagesModel", "sourceService", "entropyService", "compactCodeGeneratorService", "symbolsGeneratorService",
						function(model, constantsModel, messagesModel, sourceService, entropyService, compactCodeGeneratorService, symbolsGeneratorService) {

		function showError(errorMessages) {
			compactCodeGeneratorService.resetCode(model.code);

			errorMessages.forEach(function(errorMessage, index) {
				if (index != 0) model.errorMessage += "; ";
				model.errorMessage += errorMessage;
			});
		}

		model.textHasChanged = function() {
			try {
				sourceService.generateSymbols(model.source);

				model.errorMessage = "";
				var errorMessages = compactCodeGeneratorService.getErrorMessages(model.code);

				if (errorMessages.length == 0) {
					model.source.entropy = entropyService.getEntropy(model.source.symbols, model.code.r);
					compactCodeGeneratorService.encode(model.code);	
				}	
				else {
					showError(errorMessages);
				}			
			}
			catch(exception) {
				alert(messagesModel.internalError);
				console.log(exception.message);
			}
		};

		model.rHasChanged = function() {
			try {
				model.errorMessage = "";
				var errorMessages = compactCodeGeneratorService.getErrorMessages(model.code);

				if (errorMessages.length == 0) {
					model.code.codeAlphabet = symbolsGeneratorService.generateSymbols(model.code.r);
					model.source.entropy = entropyService.getEntropy(model.source.symbols, model.code.r);
					compactCodeGeneratorService.encode(model.code);	
				}
				else {
					showError(errorMessages);
				}
			}
			catch(exception) {
				alert(messagesModel.internalError);
				console.log(exception.message);
			}
		}

		model.source = new SourceModel();

		model.code = new CodeModel();
		model.code.r = constantsModel.defaultR;
		model.code.source = model.source;
		model.code.codeAlphabet = symbolsGeneratorService.generateSymbols(constantsModel.defaultR);
		model.code.codedText = "";
		model.code.L = 0;
		model.code.performance = 0;

		model.errorMessage = "";

	}]);
})();
