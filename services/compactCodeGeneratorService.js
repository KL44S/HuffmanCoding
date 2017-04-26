(function() {
var app = angular.module("myApp");

	app.factory("compactCodeGeneratorService", ["constantsModel", function(constantsModel) {

		var compactCodeGeneratorService = {};

		function getFakeSymbolsNumber(symbolsNumber, r) {
			if (symbolsNumber <= r) return 0;

			var symbolsLeft = symbolsNumber;

			do {
				symbolsLeft = symbolsLeft - r + 1;
			}
			while (symbolsLeft > r);

			return ((symbolsLeft - r) * -1);
		}

		function addFakeSymbols(symbols, code) {
			var symbolsNumber = code.source.symbols.length;
			var fakeSymbolsNumber = getFakeSymbolsNumber(symbolsNumber, code.r);

			for (i = 0; i < fakeSymbolsNumber; i++) {
				symbols.push({ "symbol": "", "probability": 0, "codeWord": "" });
			}
		}

		function encodeSymbolsByHuffman(code) {
			var symbols = code.source.symbols.slice();
			addFakeSymbols(symbols, code);

			//TODO: símbolos listos, solo queda el algoritmo
			
			code.source.symbols.forEach(function(element) {
				//TODO: eliminar esto!
				var codeWord = "000110";

				element.codeWord = codeWord;
			});
		}

		function encodeText(code) {
			var text = code.source.text;
			code.codedText = "";

			for (i = 0; i < text.length; i++) {
				var codedSymbol = getSymbol(code.source.symbols, text.charAt(i));

				if (i != 0) code.codedText += " ";
				code.codedText += codedSymbol.codeWord;
			}
		}

		function calculateL(code) {
			var L = 0;

			code.source.symbols.forEach(function(symbol) {
				L += symbol.probability * symbol.codeWord.length;
			});

			code.L = L;
		}

		function calculatePerformance(code) {
			var preformance = (code.source.entropy / code.L);

			code.preformance = preformance;
		}

		function getSymbol(symbols, symbol) {
			var i = 0;
			var found = false;
			var sourceSymbol;

			while (i < symbols.length && !found) {
				sourceSymbol = symbols[i];

				if (sourceSymbol.symbol == symbol) found = true;

				i++;
			}
			
			if (found) return sourceSymbol;
			else throw "Symbol not found";
		}

		compactCodeGeneratorService.encode = function(code) {
			encodeSymbolsByHuffman(code);
			calculateL(code);
			calculatePerformance(code);
			encodeText(code);
		};

		return compactCodeGeneratorService;

	}]);
})();
	