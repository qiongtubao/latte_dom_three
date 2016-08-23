var latte_dom = latte.require("latte_dom");
var latte_lib = latte.require("latte_lib");
              var data = latte_lib.object.create({
              	add: function() {
              		data.set("three.0.childs", [{
              			title: "d",
              			click: function() {
              				alert.log("click d");
              			}
              		}]);
              	},
                three: [{
                	title: "a",
                	click: function() {
                		alert("click a");
                	}
                }, {
                	title: "b",
                	childs: [{
                		title: "c",
                		click: function() {
                			alert("click c");
                		}
                	}]
                }]
              });
              var box = latte_dom.define("demo", data);
              console.log(data);