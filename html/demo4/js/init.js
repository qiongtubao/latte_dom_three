var latte_dom = latte.require("latte_dom");
var latte_lib = latte.require("latte_lib");
              var data = latte_lib.object.create({
              	add: function() {
                  /**
              		data.set("three.0.childs", [{
              			title: "d",
              			click: function() {
              				alert.log("click d");
              			}
              		}]);
                  */
                  var childs = data.get("three.1.childs");
                  childs.push({
                    title: "d",
                    click: function() {
                      alert.log("click d");
                    },
                    childs: [{
                      title: "e",
                      click: function() {
                        
                      }
                    }]
                  })
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