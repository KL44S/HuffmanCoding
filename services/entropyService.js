(function() {
var app = angular.module("myApp");

	app.factory("entropyService", ["constantsModel", function(constantsModel) {

		var entropyService = {};

		function log(n, base) {
		  var log = Math.log;
		  var result = log(n)/(base ? log(base) : 1);

		  return result;
		}

		function getSymbolEntropy(symbolProbability, base) {
			var result = (symbolProbability * log(symbolProbability, base));

			return result;
		}

		entropyService.getEntropy = function(symbols, base) {
			var symbolsNumber = symbols.length;
			var entropy = 0;

			symbols.forEach(function(element) {
				entropy += getSymbolEntropy(element.probability, base);
			});

			entropy = entropy * -1;

			return entropy;
		}

		return entropyService;

	}]);
})();
	