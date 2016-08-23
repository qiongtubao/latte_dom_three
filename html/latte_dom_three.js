
(function(define) {'use strict'
	define("latte_dom/c/commands/three/three/index.css", ["require", "exports", "module", "window"],
 	function(require, exports, module, window) {
 		module.exports='.three {	background-color: #f9f9f9;}.three ul {	margin-bottom:0;	-webkit-margin-before:0;	-webkit-margin-after:0;	padding-start: 40px;	padding-left: 20px;	list-style:none;}.three ul li {	position: relative;	display: block;}.three ul li a  {		border-color: transparent;	border-left: 3px solid transparent;	padding-top: 12px;	padding-bottom: 12px;	padding-right: 24px;	padding-left: 52.99999px;	color: inherit;	font-weight: 500;	position: relative;	display: block;	outline: 0;}.three ul li .submenu:after {	position: absolute;	top: 50%;	right: 24px;	font-size: 17px;	content:"+";	transform: translate(50%, -50%);}.three .open >ul {    display: block;}.three  ul {    display: none;}.three > ul{	padding-left: 0px;	display: block;}.three .open > .submenu:after {	content: "-";}.three ul li a i{	position: absolute;	left: 21px;	font-size: 1.25em;	line-height: 1.25;}'
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
	var getType = function(last) {
		if(last == "childs") {
			return "changeChilds";
		}
		
		if(!isNaN(+last)) {
			return "changeChild";
		}
	}
	var findDom = function(dom, paths) {
		
		var index = 0;
		var indexDom = dom;
		for(var i = 0, len = paths.length; i  < len; i++) {
			var p = paths[i];
			if(!isNaN(+p)) {
				indexDom = indexDom.children[p];
				index++;
			}else if(p == "childs") {
				indexDom = indexDom.children[indexDom.children.length - 1];
			}
		}
		console.log(indexDom);
		return {
			dom: View.create(indexDom),
			index: index,
			paths: paths 
		};
	}
	var equal = function(a, b) {
		
		if(latte_lib.getClassName(a) != latte_lib.getClassName(b)) {
			return false;
		}
		if(latte_lib.isArray(a)) {
			if(a.length != b.length) {
				return false;
			}
			for(var i =0 ,len = a.length; i < len; i++) {
				if(!equal(a[i], b[i])) {
					return false;
				}
			}
			return true;
		}
		
		return a == b;
	}
	this.create = function(data, dom, controller) {
		var Controller = require("../../../controller.js");
		var dataName = dom.attr("latte-three-data");
		if(!dataName) {
			console.log(dom.node());
			return;
		}
		var copy1 = dom.children[0];
		/**
			copy1
		*/
		dom.removeChild(copy1);
		var d = data.get(dataName);

	
		var addOne = function(data, dom, index, add) {
			var li = document.createElement("li");
			var node = copy1.cloneNode(true);
			li.appendChild(node);
			add ? add(li): dom.appendChild(li);
			var c = Controller.create(li, data);
			c.view.on('click', function() {
				c.view.classed('open', !c.view.classed("open"));c.view
			});
			var addChilds = function(data) {
				var ul = doDom(li, index+1);
				doAllChild(data, ul, index+1);
				node.className += "submenu"; 
			}
			data.on("childs", function(now, old) {
				if(old) {
					dom.innerHTML = "";
				}
				var ul = doDom(li, index+1);
				doAllChild(now, ul, index+1);
				node.className += "submenu"; 
			});
			
			var childs = data.get("childs");
			if(childs) {
				addChilds(childs);			
			}
		}
		var doAllChild = function(data, dom, index) {
			data.forEach(function(o) {
				addOne(o, dom, index);
			});
			/**
				var setFunc = function(i,value, old) {
					Controller.remove(view.children[i], old);
					Controller.create(view.children[i], value);
				}
				var spliceFunc= function(startIndex, removes, adds) {
					var num = removes.length;
					for(var i = 0;i < num; i++) {
						var o = view.children[startIndex];
						view.removeChild(o);
						Controller.remove(o);
					}
					var afterDom = view.children[startIndex];
					var list = this;
					adds.forEach(function(add) {
						var cloneChild = child.cloneNode(true);
						if(afterDom) {
							view.insertBefore(cloneChild, afterDom);
						}else{
							view.appendChild(cloneChild);
						}			
						
						Controller.create(cloneChild, add);
					});
				}		
			*/
			//controller.on("data", "splice", setFunc);
			data.on("splice", function(startIndex, removes, adds) {
				var num = removes.length;
				for(var i = 0;i < num; i++) {
					var o = dom.children[startIndex];
					dom.removeChild(o);
					Controller.remove(o);
				}
				var afterDom = dom.children[startIndex];
				var list = this;
				adds.forEach(function(add) {
					addOne(add, dom, index, function(li) {
						if(afterDom) {
							dom.insertBefore(li, afterDom);
						}else{
							dom.appendChild(li);
						}	
						//Controller.create(li, add);
					})
						
					
					
				});
			});
			data.on("set", function(i, value, old) {
				Controller.remove(view.children[i], old);
				Controller.create(view.children[i], value);
			});

		};
		doAllChild(d, doDom(dom, 0), 0);

		controller.bind("data", dataName, function(now, old) {
			var o ;
			while(o = dom.children[0]) {
				dom.removeChild(o);
				Controller.remove(o);
			}
			doAllChild(now, doDom(dom, 0), 0);
		});

		//为什么暂时不想用change 因为删除的话  dom 操作有点多 
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