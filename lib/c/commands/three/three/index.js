(function() {
	/**
		相当复杂  至少比table和list   bug更多因为嵌套的更多

		是否用迭代的list来处理这个数据
	*/
	var View = require("../../../../v/view.js");
	var createUl = function(dom, index) {
		var ul = document.createElement("ul");
		dom.appendChild(ul);
		ul.className="ul"+index;
		return View.create(ul);
	};
	this.create = function(data, dom, controller) {
		var Controller = require("../../../controller.js");
		var tableData = dom.attr("latte-three-data");
		if(tableData) {
			var copy1 = dom.children[0];
			dom.removeChild(copy1);
					var setFunc = function(i, now, old) {
						Controller.remove(dom.children[i], old);
						//Controller.create(dom.children[i], now);
						//添加树结构
					}
					var spliceFunc = function(startIndex, removes, adds) {
						var num = removes.length;
						for(var i = 0; i < num; i++) {
							var o = dom.children[startIndex];
							dom.removeChild(o);
							Controller.remove(o);
							//删除树结构  是否修改
						}
						var afterDom = dom.children[startIndex];
						var list  = this;
						adds.forEach(function(add) {
							addChild(add, dom, index, function(li) {
								if(afterDom) {
									dom.insertBefore(li, afterDom);
								}else{
									dom.appendChild(li);
								}
							});
						});

					}

					var addChild = function(data, dom, index, domFunc) {
						var li =document.createElement("li");
						var node = copy1.cloneNode(true);
						li.appendChild(node);
						domFunc? domFunc(li): dom.appendChild(li);
						var c = Controller.create(li, data);
						c.view.on("click", function() {
							c.view.classed('open', !c.view.classed("open"));c.view
						});
						var addUl = function(now, old) {
							if(old) {
								//removeAll 
								//逻辑需要通顺
							}
							var ul = createUl(li, index + 1);
							addChilds(now, ul, index+ 1);
							node.className += "submenu";
						};
						if(data.get("childs")) {
							addUl(data.get("childs"));
						}
						
						data.on("childs", addUl);
					}
					var addChilds = function(data, dom, index) {
						console.log(data);
						data.forEach(function(o) {
							addChild(o, dom, index);
						});
						data.on("splice", spliceFunc);
						data.on("set", setFunc);
					}
				var changeData = function(now, old) {
					for(var i = 0, len = dom.children.length; i < len; i++) {
						var c = dom.children[0];
						Controller.remove(c);
						dom.removeChild(c);
					}
					
						
					addChilds(now, createUl(dom,0),0);

					if(old) {
						old.off("set", setFunc);
						old.off("splice", spliceFunc);
						//childs clean
					}

					now.on("set", setFunc);
					now.on("splice", spliceFunc);
				};
			changeData(data.get(tableData));
			controller.on("data", tableData, changeData);
		}
	};

	require("latte_dom/utils/css.js").importCssString(require("./index.css"), "latte_three_three_css");

}).call(module.exports);