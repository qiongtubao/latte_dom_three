var latte_dom = latte.require("latte_dom");
              var data = {
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
              };
              var box = latte_dom.define("demo", data);
              console.log(data);