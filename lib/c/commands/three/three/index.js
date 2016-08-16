(function() {
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
}).call(module.exports);