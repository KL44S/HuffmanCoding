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

		function assignCodeSymbols(symbols, codeAlphabet) {
			symbols.forEach(function(symbol, index) {
				symbol.codeWord += codeAlphabet[index];
			});
		}

		function cleanCodeWords(symbols) {
			symbols.forEach(function(symbol) {
				symbol.codeWord = "";
			})
		}

		function encodeSymbolsByHuffman(code) {

			cleanCodeWords(code.source.symbols);

			if (code.r >= code.source.symbols.length) {
				assignCodeSymbols(code.source.symbols, code.codeAlphabet);
			}
			else {
				var symbols = code.source.symbols.slice();
				var promotedSymbols = [];
				var iterations = [];

				addFakeSymbols(symbols, code);
				iterations.push(symbols);

				var symbolsLeft = symbols.length;

				//Itero promoviendo simbolos
				while (symbolsLeft > code.r) {
					var currentSymbols = iterations[iterations.length - 1];
					var newSymbols = [];
					var probability = 0;

					//Ordeno los simbolos
					currentSymbols.sort(function(aSymbol, anotherSymbol) {
						return (aSymbol.probability - anotherSymbol.probability);
					});

					//Lleno los nuevos simbolos
					currentSymbols.forEach(function(symbol, index) {

						if (index < code.r) probability += symbol.probability;

						if (index == (code.r -1) ) {
							newSymbols.push({ "symbol": symbol.symbol, "probability": probability, "codeWord": "" });
							promotedSymbols.push(symbol.symbol);
						}

						else if (index >= code.r) newSymbols.push(symbol);
					});

					iterations.push(newSymbols);

					symbolsLeft = newSymbols.length;
				}

				//Itero asignando palabras código
				for (i = iterations.length - 1; i >= 0; i--) {
					var currentSymbols;

					if (i < (iterations.length - 1)) {
						currentSymbols = iterations[i].slice(0, code.r);
							
						currentSymbols.forEach(function(symbol) {
							var promotedSymbol = getSymbol(iterations[i + 1], promotedSymbols[i]);
							symbol.codeWord = promotedSymbol.codeWord;
						});
					}
					else currentSymbols = iterations[i];

					assignCodeSymbols(currentSymbols, code.codeAlphabet);
				}			
			}

		}

		function getSymbol(symbols, symbol) {
			symbols.forEach(function(currentSymbol) {
				if (currentSymbol.symbol == symbol) return currentSymbol;
			});
		}

		function encodeText(code) {
			var text = code.source.text;
			code.codedText = "";

			for (i = 0; i < text.length; i++) {
				var codedSymbol = getSymbol(code.source.symbols, text.charAt(i));

				if (i != 0) code.codedText += constantsModel.separator;
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

			if (preformance > constantsModel.maxPerformanceAllowed)
				preformance = constantsModel.maxPerformanceAllowed;

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

		compactCodeGeneratorService.getErrorMessages = function(code) {
			var errorMessages = [];
			
			if (isNaN(code.r) )
				errorMessages.push(constantsModel.NaNerrorMessage);

			else {
				if (code.r == undefined || code.r == null)
					errorMessages.push(constantsModel.notEmptyFieldErrorMessage);

				else {
					if (code.r < constantsModel.minR)
						errorMessages.push(constantsModel.lessThanFieldErrorMessage + constantsModel.minR);
						
					else {
						if (code.r > constantsModel.codePosibleSymbols.length)
							errorMessages.push(constantsModel.greaterThanFieldErrorMessage + constantsModel.codePosibleSymbols.length);

						else {
							//Número entero
							if ( (code.r % 1) != 0)
								errorMessages.push(constantsModel.notIntNumberErrorMessage);
						}
					}	
				}			
			}


			return errorMessages;
		};

		compactCodeGeneratorService.resetCode = function(code) {
			code.codedText = "";

			code.source.symbols.forEach(function(symbol) {
				symbol.codeWord = "";
			});

			code.codeAlphabet = [];
		}

		return compactCodeGeneratorService;

	}]);
})();
	