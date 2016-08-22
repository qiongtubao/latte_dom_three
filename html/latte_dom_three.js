
(function(define) {'use strict'
	define("latte_dom/c/commands/three/three/index.css", ["require", "exports", "module", "window"],
 	function(require, exports, module, window) {
 		module.exports='.three {	background-color: #f9f9f9;}.three ul {	margin-bottom:0;	padding-left: 20px;	list-style:none;}.three > ul{	padding-left: 0px;}.three ul li {	position: relative;	display: block;}.three ul li a  {		border-color: transparent;	border-left: 3px solid transparent;	padding-top: 12px;	padding-bottom: 12px;	padding-right: 24px;	padding-left: 52.99999px;	color: inherit;	font-weight: 500;	position: relative;	display: block;	outline: 0;}.three ul li .submenu:after {	position: absolute;	top: 50%;	right: 24px;	font-size: 17px;	content:"+";	transform: translate(50%, -50%);}.three .ul0 .open ul {                display: block;            }            .three  .ul0  ul {                display: none;            }.three .open > .submenu:after {	content: "-";}.three ul li a i{	position: absolute;	left: 21px;	font-size: 1.25em;	line-height: 1.25;}'
 	});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
define("latte_dom/c/commands/three/three/index.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
(function() {
	/**
		需要修改成和list差不多
		添加与删除  修改等
	*/
	var View = require("../../../../v/view.js");
	var doDom = function(dom, index) {
			var ul = document.createElement("ul");
			dom.appendChild(ul);
			ul.className="ul"+index;
			return View.create(ul);
			//return ul;
		}
	this.create = function(data, dom, controller) {
		var Controller = require("../../../controller.js");
		//var dataName = dom.getAttribute("latte-data");

		var copy1 = dom.children[0];
		/**
			copy1
		*/
		dom.removeChild(copy1);
		var d = data;

	

		var doAllChild = function(data, dom, index) {
			data.forEach(function(o) {
				var li = document.createElement("li");
				var node = copy1.cloneNode(true);
				li.appendChild(node);
				dom.appendChild(li);
				var c = Controller.create(li, o);

				var childs = o.get("childs");
				if(childs) {
					node.className +=" submenu";
					var ul = doDom(li, index+1);
					doAllChild(childs, ul, index+1);
					var ck = o.get("click");
					var click = function() {
						ck && ck();
						c.view.classed('open', !c.view.classed("open"));
						//if(ul.style.display == "") {
						//	ul.style.display = "none";
						//}else{
						//	ul.style.display = "";
						//}
					}
					o.set("click", click);
				}
				
			});
			
		};
		doAllChild(d, doDom(dom, 0), 0);

	}
	require("latte_dom/utils/css.js").importCssString(require("./index.css"), "latte_three_three_css");

}).call(module.exports);
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
define("latte_dom/c/commands/three.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {

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
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });