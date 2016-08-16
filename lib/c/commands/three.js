
var Command = {};
var latte_lib = require("latte_lib");
var LatteObject = require("../../m/data");
(function() {
	
	this.before = function(data, dom, controller) {
		var threeClassName = dom.attr("latte-three");
		var latteObject = LatteObject.create(data);
		if(threeClassName) {
			var threeClass = require("./three/"+ threeClassName);
			threeClass.create(data, dom, controller);
		}
		
	}
}).call(Command);
module.exports = Command;