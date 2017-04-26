(function() {
var app = angular.module("myApp");

	app.factory("symbolsGeneratorService", ["constantsModel", function(constantsModel) {

		var symbolsGeneratorService = {};

		symbolsGeneratorService.generateSymbols = function(r) {
			var character = constantsModel.initialChar;
			var ASCIIcode = character.charCodeAt();
			var symbols = [];

			for (i = 1; i <= r; i++) {
				symbols.push(character);		
				ASCIIcode ++;
				character = String.fromCharCode(ASCIIcode);
			}

			return symbols;
		}

		return symbolsGeneratorService;

	}]);
})();
	