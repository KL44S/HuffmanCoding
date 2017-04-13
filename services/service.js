(function() {
var app = angular.module("myApp");

	app.factory("compactCodeGeneratorService", function() {

		var compactCodeGeneratorService = {};

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

			if (!symbolFound) symbols.push({ "symbol": symbol, "probability": 1 });
		}

		function getTotalSymbolsNumber(symbols) {
			var sawSymbolsNumber = 0;

			symbols.forEach(function(element) {
				sawSymbolsNumber += element.probability;
			});	

			return sawSymbolsNumber;
		}

		function calculateProbability(symbols, totalSymbolsNumber) {
			var decimals = 4;

			symbols.forEach(function(element) {
				var probability = element.probability / totalSymbolsNumber;
				probability = Math.round(probability * Math.pow(10, decimals)) / Math.pow(10, decimals);

				element.probability = probability;
			});			
		}

		compactCodeGeneratorService.getSource = function(text) {
			var source = { "symbols": [] };

			for (var i = 0; i < text.length; i++) {
				incrementSymbolFrequency(source.symbols, text[i]);
			}

			var totalSymbolsNumber = getTotalSymbolsNumber(source.symbols);

			calculateProbability(source.symbols, totalSymbolsNumber);

			return source;
		}

		return compactCodeGeneratorService;

	});
})();
	