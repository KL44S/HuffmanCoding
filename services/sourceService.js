(function() {
var app = angular.module("myApp");

	app.factory("sourceService", ["constantsModel", function(constantsModel) {

		var sourceService = {};

		function incrementSymbolFrequency(symbols, symbol) {
			var symbolFound = false;
			var i = 0;

			while(!symbolFound && i < symbols.length) {
				if (symbols[i].symbol == symbol) {
					symbols[i].probability = symbols[i].probability + 1;
					symbolFound = true;
				}

				i++;
			}

			if (!symbolFound) {
				var newSymbol = new SymbolModel();
				newSymbol.symbol = symbol;
				newSymbol.probability = 1;
				newSymbol.codeWord = "";

				symbols.push(newSymbol);
			}
		}

		function getTotalSymbolsNumber(symbols) {
			var sawSymbolsNumber = 0;

			symbols.forEach(function(element) {
				sawSymbolsNumber += element.probability;
			});	

			return sawSymbolsNumber;
		}

		function calculateProbability(symbols, totalSymbolsNumber) {
			var decimalNumber = 10;

			symbols.forEach(function(element) {
				var probability = element.probability / totalSymbolsNumber;
				probability = Math.round(probability * Math.pow(decimalNumber, constantsModel.probabilityDecimals)) 
								/ Math.pow(decimalNumber, constantsModel.probabilityDecimals);

				element.probability = probability;
			});			
		}

		sourceService.generateSymbols = function(source) {

			source.symbols = [];

			for (var i = 0; i < source.text.length; i++) {
				incrementSymbolFrequency(source.symbols, source.text[i]);
			}

			var totalSymbolsNumber = getTotalSymbolsNumber(source.symbols);

			calculateProbability(source.symbols, totalSymbolsNumber);

			return source;
		}

		return sourceService;

	}]);
})();
	