(function() {
var app = angular.module("myApp");

	app.factory("symbolsGeneratorService", ["constantsModel", function(constantsModel) {

		var symbolsGeneratorService = {};

		symbolsGeneratorService.generateSymbols = function(r) {
			var symbols = [];

			for (i = 0; i < r; i++) {
				symbols.push(constantsModel.codePosibleSymbols[i]);		
			}

			return symbols;
		}

		return symbolsGeneratorService;

	}]);
})();
	