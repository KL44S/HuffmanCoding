(function() {
	var app = angular.module("myApp");

	app.factory("constantsModel", function() {
		var constantsModel = {
				"defaultR": 2,
				"probabilityDecimals": 8,
				"sourceMaxLength": 9999,
				"minR": 2,
				"notEmptyFieldErrorMessage": "este campo no puede estar vacío",
				"lessThanFieldErrorMessage": "este campo no puede ser menor a ",
				"greaterThanFieldErrorMessage": "este campo no puede ser mayor a ",
				"separator": "-",
				"maxPerformanceAllowed": 1,
				"codePosibleSymbols": [
								String.fromCharCode(48), String.fromCharCode(49), String.fromCharCode(50), String.fromCharCode(51), String.fromCharCode(52), String.fromCharCode(53), String.fromCharCode(54), 
								String.fromCharCode(55), String.fromCharCode(56), String.fromCharCode(57), String.fromCharCode(65), String.fromCharCode(66), String.fromCharCode(67), String.fromCharCode(68), 
								String.fromCharCode(69), String.fromCharCode(70), String.fromCharCode(71), String.fromCharCode(72), String.fromCharCode(73), String.fromCharCode(74), String.fromCharCode(75), 
								String.fromCharCode(76), String.fromCharCode(77), String.fromCharCode(78), String.fromCharCode(79), String.fromCharCode(80), String.fromCharCode(81), String.fromCharCode(82), 
								String.fromCharCode(83), String.fromCharCode(84), String.fromCharCode(85), String.fromCharCode(86), String.fromCharCode(87), String.fromCharCode(88), String.fromCharCode(89), 
								String.fromCharCode(90), String.fromCharCode(97), String.fromCharCode(98), String.fromCharCode(99), String.fromCharCode(100), String.fromCharCode(101), 
								String.fromCharCode(102), String.fromCharCode(103), String.fromCharCode(104), String.fromCharCode(105), String.fromCharCode(106), String.fromCharCode(107), 
								String.fromCharCode(108), String.fromCharCode(109), String.fromCharCode(110), String.fromCharCode(111), String.fromCharCode(112), String.fromCharCode(113), 
								String.fromCharCode(114), String.fromCharCode(115), String.fromCharCode(116), String.fromCharCode(117), String.fromCharCode(118), String.fromCharCode(119), 
								String.fromCharCode(120), String.fromCharCode(121), String.fromCharCode(122)
								]
			};

		return constantsModel;
	});

}());