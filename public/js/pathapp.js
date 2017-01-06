webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	//module.exports = function() {
	console.log('hi pcht');


	$(document).ready(function() {	

		$(".flatpickr").flatpickr({
			enableTime: true,
		});

		var myMap=__webpack_require__(127);	
		ymaps.ready(init);
		var _myMap;
		var nevnt=__webpack_require__(135);

		function init() {
			
			_myMap=myMap();

			$('#map-load-link').click(function(){
				_myMap.destroy();
				_myMap=null;
				_myMap=myMap();

			});

			$('#new-evnt-link').click(function(e){
				var _nevnt= new nevnt();
				_nevnt.init();
			});
		}



	});

	//}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 127:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	module.exports = function() {
		console.log('map4p.js');

		var _mapjade=__webpack_require__(128);
		$('.c-place').html(_mapjade());

		var _podetail = __webpack_require__(129);
		var poDetail=new _podetail();

		var _pathList=__webpack_require__(131);
		var pathList=new _pathList();

		var _save = true;
		var _event, _postOfficeArr;
		var myCollection = new ymaps.GeoObjectCollection();
		var _route;

		var myMap = new ymaps.Map("mapy", {
			center: [50.59, 36.58],
			zoom: 10,
			controls: ['routeEditor']
		}, {
			buttonMaxWidth: 150
		});

		function createPath(selectedEl){
			myCollection.removeAll();	
			if(_route)
				myMap.geoObjects.remove(_route);	

			var pathArr=selectedEl.map(function(otd){
					return {type:'wayPoint',point:[otd.latitude, otd.longitude]};
				});
				ymaps.route(pathArr).then(
					function(route) {
						_route=route;
						myMap.geoObjects.add(route);
					},
					function(error) {
						alert("Возникла ошибка: " + error.message);
					}
				);

		}
		
		$.ajax({
			type: 'GET',
			url: "./postals.json",
			dataType: "json",
			success: function(data) {

				_postOfficeArr = data;
				

				var myBalloonContentBodyLayout = ymaps.templateLayoutFactory.createClass(
					'<p>$[properties.data.postalCode]</p><p>$[properties.data.addressSource]</p><p>$[properties.data.typeCode]</p><br /><button id="show-po-detail-btn">Подробно</button><br /><button id="add-to-path-btn">В список</button>', {
						build: function() {
							myBalloonContentBodyLayout.superclass.build.call(this);
							$('#show-po-detail-btn').on('click', {
								"po": this._data.properties._data
							}, this.onShowPODetailClick);
							$('#add-to-path-btn').on('click', {
								"po": this._data.properties._data
							}, this.onAddToPathClick);
						},
						clear: function() {
							$('#show-po-detail-btn').off('click', this.onShowPODetailClick);
							myBalloonContentBodyLayout.superclass.clear.call(this);
						},
						onShowPODetailClick: function(e) {
							poDetail.init(e.data.po.data, myMap);
						},
						onAddToPathClick:function(e){
							pathList.addElement(e.data.po.data);
						}
					});

				data.forEach(function(otd) {

					var pmark = new ymaps.Placemark([otd.latitude, otd.longitude],					
						{
							data: otd,
							iconContent: otd.postalCode,
							iconCaption: otd.postalCode
						}, {
							balloonContentLayout: myBalloonContentBodyLayout,
							preset: 'islands#blackStretchyIcon'
						}
					);		
					myCollection.add(pmark);
				});

				myMap.geoObjects.add(myCollection);
				pathList.init(createPath);

			},
			//error: loadError
		});

		return myMap;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 128:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(5);

	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;

	buf.push("<div id=\"mapy\" style=\"width: 100%; height: 800px\"></div>");;return buf.join("");
	}

/***/ },

/***/ 129:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use srtict';

	module.exports=function(){

	  this._modal = __webpack_require__(130);

	  this.destroyModal = function() {
	       
	    $('#close-modal-btn').off('click');
	    $('#close-modal-cross-btn').off('click');
	    $('.modal-place').html('');
	  };

	  var self = this;

	  this.init = function(data, myMap) {

	    $('.modal-place').html(this._modal({"data": data}));


	    $('#close-modal-btn').on('click', function(e) {

	    });

	    $('#close-modal-cross-btn').on('click', function(e) {

	    });

	    $('#modal').modal('show');

	    $('#modal').on('hidden.bs.modal', function(e) {
	      console.log('modal hide');
	      self.destroyModal();
	    });

	  };
		
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 130:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(5);

	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	;var locals_for_with = (locals || {});(function (data, undefined) {
	buf.push("<div id=\"modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\" class=\"modal fade\"><div role=\"document\" class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button id=\"close-modal-cross-btn\" type=\"button\" data-dismiss=\"modal\" aria-label=\"Close\" class=\"close\"><span aria-hidden=\"true\">×</span></button><h4 id=\"myModalLabel\" class=\"modal-title\">Детально - " + (jade.escape((jade_interp = data.postalCode) == null ? '' : jade_interp)) + "</h4></div><div class=\"modal-body\"><div class=\"card\"><h3 class=\"card-header\">" + (jade.escape((jade_interp = data.postalCode) == null ? '' : jade_interp)) + "</h3><div class=\"card-block\"><h4 class=\"card-title\">" + (jade.escape((jade_interp = data.postalCode) == null ? '' : jade_interp)) + " " + (jade.escape((jade_interp = data.settlement) == null ? '' : jade_interp)) + " " + (jade.escape((jade_interp = data.addressSource) == null ? '' : jade_interp)) + "</h4><div class=\"card-text\"><h4>Предоставляемые услуги</h4><ul></ul>");
	// iterate data.serviceGroups
	;(function(){
	  var $$obj = data.serviceGroups;
	  if ('number' == typeof $$obj.length) {

	    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
	      var sg = $$obj[$index];

	buf.push("<li>" + (jade.escape((jade_interp = sg.serviceGroupName) == null ? '' : jade_interp)) + "</li>");
	    }

	  } else {
	    var $$l = 0;
	    for (var $index in $$obj) {
	      $$l++;      var sg = $$obj[$index];

	buf.push("<li>" + (jade.escape((jade_interp = sg.serviceGroupName) == null ? '' : jade_interp)) + "</li>");
	    }

	  }
	}).call(this);

	buf.push("<h4>Телефоны</h4><ul>\t\t\t</ul>");
	// iterate data.phones
	;(function(){
	  var $$obj = data.phones;
	  if ('number' == typeof $$obj.length) {

	    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
	      var phone = $$obj[$index];

	buf.push("<li> (" + (jade.escape((jade_interp = phone.phoneTownCode) == null ? '' : jade_interp)) + ") " + (jade.escape((jade_interp = phone.phoneNumber) == null ? '' : jade_interp)) + " (" + (jade.escape((jade_interp = phone.phoneTypeName) == null ? '' : jade_interp)) + ")</li>");
	    }

	  } else {
	    var $$l = 0;
	    for (var $index in $$obj) {
	      $$l++;      var phone = $$obj[$index];

	buf.push("<li> (" + (jade.escape((jade_interp = phone.phoneTownCode) == null ? '' : jade_interp)) + ") " + (jade.escape((jade_interp = phone.phoneNumber) == null ? '' : jade_interp)) + " (" + (jade.escape((jade_interp = phone.phoneTypeName) == null ? '' : jade_interp)) + ")</li>");
	    }

	  }
	}).call(this);

	buf.push("<h4>Время работы\t\t</h4><ul></ul>");
	// iterate data.workingHours
	;(function(){
	  var $$obj = data.workingHours;
	  if ('number' == typeof $$obj.length) {

	    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
	      var wh = $$obj[$index];

	buf.push("<li>" + (jade.escape((jade_interp = wh.weekDayName) == null ? '' : jade_interp)) + "\t</li>");
	    }

	  } else {
	    var $$l = 0;
	    for (var $index in $$obj) {
	      $$l++;      var wh = $$obj[$index];

	buf.push("<li>" + (jade.escape((jade_interp = wh.weekDayName) == null ? '' : jade_interp)) + "\t</li>");
	    }

	  }
	}).call(this);

	buf.push("</div></div></div></div><div class=\"modal-footer\"><button id=\"close-modal-btn\" type=\"button\" data-dismiss=\"modal\" class=\"btn btn-secondary\">Close</button></div></div></div></div>");}.call(this,"data" in locals_for_with?locals_for_with.data:typeof data!=="undefined"?data:undefined,"undefined" in locals_for_with?locals_for_with.undefined: false?undefined:undefined));;return buf.join("");
	}

/***/ },

/***/ 131:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	module.exports = function() {

		this.plJade = __webpack_require__(132);
		this.elJade = __webpack_require__(133);
		this.nestedListJade = __webpack_require__(134);
		this.pdfJade = __webpack_require__(253);
		this.ymapCeatePath = {};
		this.selectedEL = [];

		var self = this;

		this.init = function(yMapCreatePath) {
			$('.l-place').html(self.plJade());
			//self.myMap=myMap;
			self.ymapCeatePath = yMapCreatePath;
			$('#clear-plist-btn').on('click', self.removeAll);
			$('#create-path-btn').on('click', self.createPath);
			$('#print-path-btn').on('click', self.pdfPath);

		};

		this.addElement = function(data) {
			$('#path-list').append(self.elJade({
				"data": data
			}));
			self.selectedEL.push(data);
			$('#' + data.postalCode).on('click', {
				element: data
			}, self.removeElement);
			self.loadEvntData(data);

		};

		this.loadEvntData = function(_data) {
			var rarr = [];
			$.ajax({
				type: 'GET',
				url: "./testevent.json",
				dataType: "json",
				success: function(data) {
					console.log('success load data');
					rarr = data.filter(function(evnt) {
						if (evnt.postalCode == _data.postalCode) {
							return true;
						}
					});
					_data.evnts = rarr;
					setTimeout(function() {
						$('#' + _data.postalCode).parent().append(self.nestedListJade({
							"data": rarr
						}));
						$('#' + _data.postalCode).parent().find('i.fa-spinner').remove();
					}, Math.floor(Math.random() * 10000));
				},
				error: function(err) {
					//console.log(err);
				}
			});


		};

		this.removeElement = function(e) {
			e.stopPropagation();
			for (var i = self.selectedEL.length; i--;) {
				if (self.selectedEL[i].postalCode == e.data.element.postalCode) {
					$(e.currentTarget).parent().off();
					$(e.currentTarget).parent().remove();
					//$('[data-evnt-id='+e.data.element.postalCode+']').off();
					//$('[data-evnt-id='+e.data.element.postalCode+']').remove();
					self.selectedEL.splice(i, 1);
				}
			}

		};
		this.removeAll = function(e) {
			e.stopPropagation();
			$('#path-list').html('');
			self.selectedEL = [];
		};

		this.createPath = function() {
			self.ymapCeatePath(self.selectedEL);
		};

		this.pdfPath = function() {
			var docDefinition = self.createContent();
			//var docDefinition = self.pdfJade({"data":self.selectedEL});
			pdfMake.createPdf(docDefinition).open();
		};

		this.createContent = function() {
			var ularr = [];
			self.selectedEL.forEach(function(po) {
				ularr.push({
					text: po.postalCode
				})
				if (po.evnts.length > 0) {
					var sularr = [];
					po.evnts.forEach(function(evn) {
						sularr.push({
							text: evn.title
						});
					});
					ularr.push({
						ul: sularr
					});
				}
			});
			var cobj = {
				content: [{
					text: 'Лист-список заявок к исполнению (форма №1лс)',
					style: 'header'
				}, {
					ul: ularr, style:'lists'
				}],
				styles: {
					header: {
						fontSize: 16,
						bold: true
					},
					lists:{
						padding:"15px",
						fontSize:14
					}
				}
			};
			return cobj;
		};
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 132:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(5);

	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;

	buf.push("<div class=\"card\"><div class=\"card-header\"><ul class=\"nav nav-pills card-header-pills float-xs-left\"><li class=\"nav-item\"><a id=\"clear-plist-btn\" href=\"#\" class=\"nav-link\">Очистить</a></li></ul></div><div class=\"card-block\"><h4 class=\"card-title\"> </h4><div class=\"card-text\"><h4>Список\t<ul id=\"path-list\" class=\"list-group\"></ul></h4></div><!--input#execemail.form-control(type='email')--><a id=\"create-path-btn\" href=\"#\" class=\"btn btn-primary\">создать маршрут</a></div><div class=\"card-footer text-muted\"><a id=\"print-path-btn\" href=\"#\" class=\"btn btn-primary\">печатать</a><a id=\"other-path-btn\" href=\"#\" class=\"btn btn-default\">еще чего-то</a></div></div>");;return buf.join("");
	}

/***/ },

/***/ 133:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(5);

	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	;var locals_for_with = (locals || {});(function (data) {
	buf.push("<li" + (jade.attr("data-evnt-id", '' + (data.postalCode) + '', true, true)) + " class=\"list-group-item list-group-item-action\">" + (jade.escape((jade_interp = data.postalCode) == null ? '' : jade_interp)) + "<a href=\"#\"" + (jade.attr("id", '' + (data.postalCode) + '', true, true)) + " class=\"remove-po-list\"><i class=\"fa fa-trash-o fa-fw\"></i></a><i style=\"float:left\" class=\"fa fa-spinner fa-pulse fa-fw\"></i></li>");}.call(this,"data" in locals_for_with?locals_for_with.data:typeof data!=="undefined"?data:undefined));;return buf.join("");
	}

/***/ },

/***/ 134:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(5);

	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	;var locals_for_with = (locals || {});(function (data, undefined) {
	buf.push("<ul>");
	// iterate data
	;(function(){
	  var $$obj = data;
	  if ('number' == typeof $$obj.length) {

	    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
	      var evnt = $$obj[$index];

	buf.push("<li>" + (jade.escape((jade_interp = evnt.title) == null ? '' : jade_interp)) + "<a href=\"#\" class=\"remove-evnt-list\"><i class=\"fa fa-trash-o fa-fw\"></i></a></li>");
	    }

	  } else {
	    var $$l = 0;
	    for (var $index in $$obj) {
	      $$l++;      var evnt = $$obj[$index];

	buf.push("<li>" + (jade.escape((jade_interp = evnt.title) == null ? '' : jade_interp)) + "<a href=\"#\" class=\"remove-evnt-list\"><i class=\"fa fa-trash-o fa-fw\"></i></a></li>");
	    }

	  }
	}).call(this);

	buf.push("</ul>");}.call(this,"data" in locals_for_with?locals_for_with.data:typeof data!=="undefined"?data:undefined,"undefined" in locals_for_with?locals_for_with.undefined: false?undefined:undefined));;return buf.join("");
	}

/***/ },

/***/ 135:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, moment) {'use strict';

	module.exports = function() {

		this._modal = __webpack_require__(136);

		this.destroyModal = function() {
			
			$("#save-event-btn").off('click');
			$('#close-modal-btn').off('click');
			$('#close-modal-cross-btn').off('click');
			$('.modal-place').html('');
		};

		var self = this;

		this.init = function() {

			$('.modal-place').html(this._modal());
			$(".flatpickr").flatpickr({
				enableTime: true,
			});

			$("#save-event-btn").on('click', function(e) {
				var evnt = {
					title: $('#event-title').val(),
					start: moment($('#datebegin').val()),
					end: moment($('#dateend').val()),
					postalCode: $('#postcode').val(),
					status: $('#status').val(),
					description: $("#description").val(),
					executor: $('#executor').val()
				};
				console.log("add event");
				//$('#calendar').fullCalendar('renderEvent', evnt, true);

				$.ajax({
					type: 'POST',
					url: '/users/save',
					data: JSON.stringify(evnt),
					dataType: "json",
					contentType: "application/json",
					success: function(data) {
						console.log("data save");
						var evntArray = $('#calendar').fullCalendar('clientEvents');
						var _evnt = evntArray[evntArray.length - 1];
						_evnt._id = data.insertedid;

						$('#calendar').fullCalendar('updateEvent', _evnt);
					},
					//error: ajaxError
				});


			});

			$('#close-modal-btn').on('click', function(e) {

			});

			$('#close-modal-cross-btn').on('click', function(e) {

			});

			$('#modal').modal('show');

			//$('#datebegin').val(start.format('YYYY-MM-DD hh:mm'));
			//$('#dateend').val(end.format('YYYY-MM-DD hh:mm'));

			$('#modal').on('hidden.bs.modal', function(e) {
				console.log('modal hide');
				self.destroyModal();
			});

		};
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(8)))

/***/ },

/***/ 136:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(5);

	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;

	buf.push("<div id=\"modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\" class=\"modal fade\"><div role=\"document\" class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button id=\"close-modal-cross-btn\" type=\"button\" data-dismiss=\"modal\" aria-label=\"Close\" class=\"close\"><span aria-hidden=\"true\">×</span></button><h4 id=\"myModalLabel\" class=\"modal-title\">Создание</h4></div><div class=\"modal-body\"><form action=\"\"><div class=\"form-group\"><label for=\"\">заголовок</label><input id=\"event-title\" type=\"text\" class=\"form-control\"></div><div class=\"form-group\"><label for=\"\">начало</label><input id=\"datebegin\" type=\"text\" class=\"form-control flatpickr\"></div><div class=\"form-group\"><label for=\"\">окончание</label><input id=\"dateend\" type=\"text\" class=\"form-control flatpickr\"></div><div class=\"form-group\"><label for=\"\">отделение получатель</label><input id=\"postcode\" type=\"text\" class=\"form-control\"></div><div class=\"form-group\"><label for=\"\">описание</label><input id=\"description\" type=\"text\" class=\"form-control\"></div><div class=\"form-group\"><label for=\"\">статус</label><input id=\"status\" type=\"text\" class=\"form-control\"></div><div class=\"form-group\"><label for=\"\">исполнитель</label><input id=\"executor\" type=\"text\" class=\"form-control\"></div></form></div><div class=\"modal-footer\"><button id=\"close-modal-btn\" type=\"button\" data-dismiss=\"modal\" class=\"btn btn-secondary\">Close</button><button id=\"save-event-btn\" type=\"button\" class=\"btn btn-primary\">Save changes</button></div></div></div></div>");;return buf.join("");
	}

/***/ },

/***/ 253:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(5);

	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	;var locals_for_with = (locals || {});(function (data, undefined) {
	// iterate data
	;(function(){
	  var $$obj = data;
	  if ('number' == typeof $$obj.length) {

	    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
	      var po = $$obj[$index];

	buf.push("" + (jade.escape((jade_interp = po.postalCode) == null ? '' : jade_interp)) + " \\br");
	if (po.evnts.length>0)
	{
	// iterate po.evnts
	;(function(){
	  var $$obj = po.evnts;
	  if ('number' == typeof $$obj.length) {

	    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
	      var evnt = $$obj[$index];

	buf.push("" + (jade.escape((jade_interp = evnt.title) == null ? '' : jade_interp)) + " \\br");
	    }

	  } else {
	    var $$l = 0;
	    for (var $index in $$obj) {
	      $$l++;      var evnt = $$obj[$index];

	buf.push("" + (jade.escape((jade_interp = evnt.title) == null ? '' : jade_interp)) + " \\br");
	    }

	  }
	}).call(this);

	}
	    }

	  } else {
	    var $$l = 0;
	    for (var $index in $$obj) {
	      $$l++;      var po = $$obj[$index];

	buf.push("" + (jade.escape((jade_interp = po.postalCode) == null ? '' : jade_interp)) + " \\br");
	if (po.evnts.length>0)
	{
	// iterate po.evnts
	;(function(){
	  var $$obj = po.evnts;
	  if ('number' == typeof $$obj.length) {

	    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
	      var evnt = $$obj[$index];

	buf.push("" + (jade.escape((jade_interp = evnt.title) == null ? '' : jade_interp)) + " \\br");
	    }

	  } else {
	    var $$l = 0;
	    for (var $index in $$obj) {
	      $$l++;      var evnt = $$obj[$index];

	buf.push("" + (jade.escape((jade_interp = evnt.title) == null ? '' : jade_interp)) + " \\br");
	    }

	  }
	}).call(this);

	}
	    }

	  }
	}).call(this);
	}.call(this,"data" in locals_for_with?locals_for_with.data:typeof data!=="undefined"?data:undefined,"undefined" in locals_for_with?locals_for_with.undefined: false?undefined:undefined));;return buf.join("");
	}

/***/ }

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aGFwcC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3B1YmxpYy9qcy9kZXYvcG0vYXBwLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9kZXYvcG0vbW9kdWxlL21hcDRwLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9kZXYvcG0vdmlldy9tYXAuamFkZSIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3BtL21vZHVsZS9wb0RldGFpbC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3BtL3ZpZXcvcG9EZXRhaWwuamFkZSIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3BtL21vZHVsZS9wYXRoTGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3BtL3ZpZXcvcGF0aExpc3QuamFkZSIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3BtL3ZpZXcvbGlzdEVsLmphZGUiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2Rldi9wbS92aWV3L3N1Ymxpc3QuamFkZSIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3BtL21vZHVsZS9uZXdFdmVudC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3BtL3ZpZXcvbmV3RXZlbnQuamFkZSIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3BtL3ZpZXcvcGRmUGF0aExpc3QuamFkZSJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG4vL21vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcbmNvbnNvbGUubG9nKCdoaSBwY2h0Jyk7XHJcblxyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHRcclxuXHJcblx0JChcIi5mbGF0cGlja3JcIikuZmxhdHBpY2tyKHtcclxuXHRcdGVuYWJsZVRpbWU6IHRydWUsXHJcblx0fSk7XHJcblxyXG5cdHZhciBteU1hcD1yZXF1aXJlKCcuL21vZHVsZS9tYXA0cC5qcycpO1x0XHJcblx0eW1hcHMucmVhZHkoaW5pdCk7XHJcblx0dmFyIF9teU1hcDtcclxuXHR2YXIgbmV2bnQ9cmVxdWlyZSgnLi9tb2R1bGUvbmV3RXZlbnQuanMnKTtcclxuXHJcblx0ZnVuY3Rpb24gaW5pdCgpIHtcclxuXHRcdFxyXG5cdFx0X215TWFwPW15TWFwKCk7XHJcblxyXG5cdFx0JCgnI21hcC1sb2FkLWxpbmsnKS5jbGljayhmdW5jdGlvbigpe1xyXG5cdFx0XHRfbXlNYXAuZGVzdHJveSgpO1xyXG5cdFx0XHRfbXlNYXA9bnVsbDtcclxuXHRcdFx0X215TWFwPW15TWFwKCk7XHJcblxyXG5cdFx0fSk7XHJcblxyXG5cdFx0JCgnI25ldy1ldm50LWxpbmsnKS5jbGljayhmdW5jdGlvbihlKXtcclxuXHRcdFx0dmFyIF9uZXZudD0gbmV3IG5ldm50KCk7XHJcblx0XHRcdF9uZXZudC5pbml0KCk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cclxuXHJcbn0pO1xyXG5cclxuLy99XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvanMvZGV2L3BtL2FwcC5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIndXNlIHN0cmljdCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG5cdGNvbnNvbGUubG9nKCdtYXA0cC5qcycpO1xyXG5cclxuXHR2YXIgX21hcGphZGU9cmVxdWlyZSgnLi4vdmlldy9tYXAuamFkZScpO1xyXG5cdCQoJy5jLXBsYWNlJykuaHRtbChfbWFwamFkZSgpKTtcclxuXHJcblx0dmFyIF9wb2RldGFpbCA9IHJlcXVpcmUoJy4uL21vZHVsZS9wb0RldGFpbC5qcycpO1xyXG5cdHZhciBwb0RldGFpbD1uZXcgX3BvZGV0YWlsKCk7XHJcblxyXG5cdHZhciBfcGF0aExpc3Q9cmVxdWlyZSgnLi4vbW9kdWxlL3BhdGhMaXN0LmpzJyk7XHJcblx0dmFyIHBhdGhMaXN0PW5ldyBfcGF0aExpc3QoKTtcclxuXHJcblx0dmFyIF9zYXZlID0gdHJ1ZTtcclxuXHR2YXIgX2V2ZW50LCBfcG9zdE9mZmljZUFycjtcclxuXHR2YXIgbXlDb2xsZWN0aW9uID0gbmV3IHltYXBzLkdlb09iamVjdENvbGxlY3Rpb24oKTtcclxuXHR2YXIgX3JvdXRlO1xyXG5cclxuXHR2YXIgbXlNYXAgPSBuZXcgeW1hcHMuTWFwKFwibWFweVwiLCB7XHJcblx0XHRjZW50ZXI6IFs1MC41OSwgMzYuNThdLFxyXG5cdFx0em9vbTogMTAsXHJcblx0XHRjb250cm9sczogWydyb3V0ZUVkaXRvciddXHJcblx0fSwge1xyXG5cdFx0YnV0dG9uTWF4V2lkdGg6IDE1MFxyXG5cdH0pO1xyXG5cclxuXHRmdW5jdGlvbiBjcmVhdGVQYXRoKHNlbGVjdGVkRWwpe1xyXG5cdFx0bXlDb2xsZWN0aW9uLnJlbW92ZUFsbCgpO1x0XHJcblx0XHRpZihfcm91dGUpXHJcblx0XHRcdG15TWFwLmdlb09iamVjdHMucmVtb3ZlKF9yb3V0ZSk7XHRcclxuXHJcblx0XHR2YXIgcGF0aEFycj1zZWxlY3RlZEVsLm1hcChmdW5jdGlvbihvdGQpe1xyXG5cdFx0XHRcdHJldHVybiB7dHlwZTond2F5UG9pbnQnLHBvaW50OltvdGQubGF0aXR1ZGUsIG90ZC5sb25naXR1ZGVdfTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdHltYXBzLnJvdXRlKHBhdGhBcnIpLnRoZW4oXHJcblx0XHRcdFx0ZnVuY3Rpb24ocm91dGUpIHtcclxuXHRcdFx0XHRcdF9yb3V0ZT1yb3V0ZTtcclxuXHRcdFx0XHRcdG15TWFwLmdlb09iamVjdHMuYWRkKHJvdXRlKTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGZ1bmN0aW9uKGVycm9yKSB7XHJcblx0XHRcdFx0XHRhbGVydChcItCS0L7Qt9C90LjQutC70LAg0L7RiNC40LHQutCwOiBcIiArIGVycm9yLm1lc3NhZ2UpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0KTtcclxuXHJcblx0fVxyXG5cdFxyXG5cdCQuYWpheCh7XHJcblx0XHR0eXBlOiAnR0VUJyxcclxuXHRcdHVybDogXCIuL3Bvc3RhbHMuanNvblwiLFxyXG5cdFx0ZGF0YVR5cGU6IFwianNvblwiLFxyXG5cdFx0c3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG5cclxuXHRcdFx0X3Bvc3RPZmZpY2VBcnIgPSBkYXRhO1xyXG5cdFx0XHRcclxuXHJcblx0XHRcdHZhciBteUJhbGxvb25Db250ZW50Qm9keUxheW91dCA9IHltYXBzLnRlbXBsYXRlTGF5b3V0RmFjdG9yeS5jcmVhdGVDbGFzcyhcclxuXHRcdFx0XHQnPHA+JFtwcm9wZXJ0aWVzLmRhdGEucG9zdGFsQ29kZV08L3A+PHA+JFtwcm9wZXJ0aWVzLmRhdGEuYWRkcmVzc1NvdXJjZV08L3A+PHA+JFtwcm9wZXJ0aWVzLmRhdGEudHlwZUNvZGVdPC9wPjxiciAvPjxidXR0b24gaWQ9XCJzaG93LXBvLWRldGFpbC1idG5cIj7Qn9C+0LTRgNC+0LHQvdC+PC9idXR0b24+PGJyIC8+PGJ1dHRvbiBpZD1cImFkZC10by1wYXRoLWJ0blwiPtCSINGB0L/QuNGB0L7QujwvYnV0dG9uPicsIHtcclxuXHRcdFx0XHRcdGJ1aWxkOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0bXlCYWxsb29uQ29udGVudEJvZHlMYXlvdXQuc3VwZXJjbGFzcy5idWlsZC5jYWxsKHRoaXMpO1xyXG5cdFx0XHRcdFx0XHQkKCcjc2hvdy1wby1kZXRhaWwtYnRuJykub24oJ2NsaWNrJywge1xyXG5cdFx0XHRcdFx0XHRcdFwicG9cIjogdGhpcy5fZGF0YS5wcm9wZXJ0aWVzLl9kYXRhXHJcblx0XHRcdFx0XHRcdH0sIHRoaXMub25TaG93UE9EZXRhaWxDbGljayk7XHJcblx0XHRcdFx0XHRcdCQoJyNhZGQtdG8tcGF0aC1idG4nKS5vbignY2xpY2snLCB7XHJcblx0XHRcdFx0XHRcdFx0XCJwb1wiOiB0aGlzLl9kYXRhLnByb3BlcnRpZXMuX2RhdGFcclxuXHRcdFx0XHRcdFx0fSwgdGhpcy5vbkFkZFRvUGF0aENsaWNrKTtcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRjbGVhcjogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdCQoJyNzaG93LXBvLWRldGFpbC1idG4nKS5vZmYoJ2NsaWNrJywgdGhpcy5vblNob3dQT0RldGFpbENsaWNrKTtcclxuXHRcdFx0XHRcdFx0bXlCYWxsb29uQ29udGVudEJvZHlMYXlvdXQuc3VwZXJjbGFzcy5jbGVhci5jYWxsKHRoaXMpO1xyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdG9uU2hvd1BPRGV0YWlsQ2xpY2s6IGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0XHRcdFx0cG9EZXRhaWwuaW5pdChlLmRhdGEucG8uZGF0YSwgbXlNYXApO1xyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdG9uQWRkVG9QYXRoQ2xpY2s6ZnVuY3Rpb24oZSl7XHJcblx0XHRcdFx0XHRcdHBhdGhMaXN0LmFkZEVsZW1lbnQoZS5kYXRhLnBvLmRhdGEpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0ZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKG90ZCkge1xyXG5cclxuXHRcdFx0XHR2YXIgcG1hcmsgPSBuZXcgeW1hcHMuUGxhY2VtYXJrKFtvdGQubGF0aXR1ZGUsIG90ZC5sb25naXR1ZGVdLFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0ZGF0YTogb3RkLFxyXG5cdFx0XHRcdFx0XHRpY29uQ29udGVudDogb3RkLnBvc3RhbENvZGUsXHJcblx0XHRcdFx0XHRcdGljb25DYXB0aW9uOiBvdGQucG9zdGFsQ29kZVxyXG5cdFx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0XHRiYWxsb29uQ29udGVudExheW91dDogbXlCYWxsb29uQ29udGVudEJvZHlMYXlvdXQsXHJcblx0XHRcdFx0XHRcdHByZXNldDogJ2lzbGFuZHMjYmxhY2tTdHJldGNoeUljb24nXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0KTtcdFx0XHJcblx0XHRcdFx0bXlDb2xsZWN0aW9uLmFkZChwbWFyayk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0bXlNYXAuZ2VvT2JqZWN0cy5hZGQobXlDb2xsZWN0aW9uKTtcclxuXHRcdFx0cGF0aExpc3QuaW5pdChjcmVhdGVQYXRoKTtcclxuXHJcblx0XHR9LFxyXG5cdFx0Ly9lcnJvcjogbG9hZEVycm9yXHJcblx0fSk7XHJcblxyXG5cdHJldHVybiBteU1hcDtcclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2pzL2Rldi9wbS9tb2R1bGUvbWFwNHAuanNcbi8vIG1vZHVsZSBpZCA9IDEyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJDOlxcXFxfdGVtcFxcXFxwY2h0XFxcXG5vZGVfbW9kdWxlc1xcXFxqYWRlXFxcXGxpYlxcXFxydW50aW1lLmpzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPGRpdiBpZD1cXFwibWFweVxcXCIgc3R5bGU9XFxcIndpZHRoOiAxMDAlOyBoZWlnaHQ6IDgwMHB4XFxcIj48L2Rpdj5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy9qcy9kZXYvcG0vdmlldy9tYXAuamFkZVxuLy8gbW9kdWxlIGlkID0gMTI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIid1c2Ugc3J0aWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzPWZ1bmN0aW9uKCl7XHJcblxyXG4gIHRoaXMuX21vZGFsID0gcmVxdWlyZSgnLi4vdmlldy9wb0RldGFpbC5qYWRlJyk7XHJcblxyXG4gIHRoaXMuZGVzdHJveU1vZGFsID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICBcclxuICAgICQoJyNjbG9zZS1tb2RhbC1idG4nKS5vZmYoJ2NsaWNrJyk7XHJcbiAgICAkKCcjY2xvc2UtbW9kYWwtY3Jvc3MtYnRuJykub2ZmKCdjbGljaycpO1xyXG4gICAgJCgnLm1vZGFsLXBsYWNlJykuaHRtbCgnJyk7XHJcbiAgfTtcclxuXHJcbiAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICB0aGlzLmluaXQgPSBmdW5jdGlvbihkYXRhLCBteU1hcCkge1xyXG5cclxuICAgICQoJy5tb2RhbC1wbGFjZScpLmh0bWwodGhpcy5fbW9kYWwoe1wiZGF0YVwiOiBkYXRhfSkpO1xyXG5cclxuXHJcbiAgICAkKCcjY2xvc2UtbW9kYWwtYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgICQoJyNjbG9zZS1tb2RhbC1jcm9zcy1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnI21vZGFsJykubW9kYWwoJ3Nob3cnKTtcclxuXHJcbiAgICAkKCcjbW9kYWwnKS5vbignaGlkZGVuLmJzLm1vZGFsJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICBjb25zb2xlLmxvZygnbW9kYWwgaGlkZScpO1xyXG4gICAgICBzZWxmLmRlc3Ryb3lNb2RhbCgpO1xyXG4gICAgfSk7XHJcblxyXG4gIH07XHJcblx0XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy9qcy9kZXYvcG0vbW9kdWxlL3BvRGV0YWlsLmpzXG4vLyBtb2R1bGUgaWQgPSAxMjlcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIGphZGUgPSByZXF1aXJlKFwiQzpcXFxcX3RlbXBcXFxccGNodFxcXFxub2RlX21vZHVsZXNcXFxcamFkZVxcXFxsaWJcXFxccnVudGltZS5qc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKGRhdGEsIHVuZGVmaW5lZCkge1xuYnVmLnB1c2goXCI8ZGl2IGlkPVxcXCJtb2RhbFxcXCIgdGFiaW5kZXg9XFxcIi0xXFxcIiByb2xlPVxcXCJkaWFsb2dcXFwiIGFyaWEtbGFiZWxsZWRieT1cXFwibXlNb2RhbExhYmVsXFxcIiBhcmlhLWhpZGRlbj1cXFwidHJ1ZVxcXCIgY2xhc3M9XFxcIm1vZGFsIGZhZGVcXFwiPjxkaXYgcm9sZT1cXFwiZG9jdW1lbnRcXFwiIGNsYXNzPVxcXCJtb2RhbC1kaWFsb2dcXFwiPjxkaXYgY2xhc3M9XFxcIm1vZGFsLWNvbnRlbnRcXFwiPjxkaXYgY2xhc3M9XFxcIm1vZGFsLWhlYWRlclxcXCI+PGJ1dHRvbiBpZD1cXFwiY2xvc2UtbW9kYWwtY3Jvc3MtYnRuXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGRhdGEtZGlzbWlzcz1cXFwibW9kYWxcXFwiIGFyaWEtbGFiZWw9XFxcIkNsb3NlXFxcIiBjbGFzcz1cXFwiY2xvc2VcXFwiPjxzcGFuIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIj7Dlzwvc3Bhbj48L2J1dHRvbj48aDQgaWQ9XFxcIm15TW9kYWxMYWJlbFxcXCIgY2xhc3M9XFxcIm1vZGFsLXRpdGxlXFxcIj7QlNC10YLQsNC70YzQvdC+IC0gXCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gZGF0YS5wb3N0YWxDb2RlKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCI8L2g0PjwvZGl2PjxkaXYgY2xhc3M9XFxcIm1vZGFsLWJvZHlcXFwiPjxkaXYgY2xhc3M9XFxcImNhcmRcXFwiPjxoMyBjbGFzcz1cXFwiY2FyZC1oZWFkZXJcXFwiPlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IGRhdGEucG9zdGFsQ29kZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiPC9oMz48ZGl2IGNsYXNzPVxcXCJjYXJkLWJsb2NrXFxcIj48aDQgY2xhc3M9XFxcImNhcmQtdGl0bGVcXFwiPlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IGRhdGEucG9zdGFsQ29kZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiIFwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IGRhdGEuc2V0dGxlbWVudCkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiIFwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IGRhdGEuYWRkcmVzc1NvdXJjZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiPC9oND48ZGl2IGNsYXNzPVxcXCJjYXJkLXRleHRcXFwiPjxoND7Qn9GA0LXQtNC+0YHRgtCw0LLQu9GP0LXQvNGL0LUg0YPRgdC70YPQs9C4PC9oND48dWw+PC91bD5cIik7XG4vLyBpdGVyYXRlIGRhdGEuc2VydmljZUdyb3Vwc1xuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSBkYXRhLnNlcnZpY2VHcm91cHM7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBzZyA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGxpPlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IHNnLnNlcnZpY2VHcm91cE5hbWUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIjwvbGk+XCIpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIHNnID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8bGk+XCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gc2cuc2VydmljZUdyb3VwTmFtZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiPC9saT5cIik7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbmJ1Zi5wdXNoKFwiPGg0PtCi0LXQu9C10YTQvtC90Ys8L2g0Pjx1bD5cXHRcXHRcXHQ8L3VsPlwiKTtcbi8vIGl0ZXJhdGUgZGF0YS5waG9uZXNcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gZGF0YS5waG9uZXM7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBwaG9uZSA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGxpPiAoXCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gcGhvbmUucGhvbmVUb3duQ29kZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiKSBcIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBwaG9uZS5waG9uZU51bWJlcikgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiIChcIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBwaG9uZS5waG9uZVR5cGVOYW1lKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCIpPC9saT5cIik7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIgcGhvbmUgPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIjxsaT4gKFwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IHBob25lLnBob25lVG93bkNvZGUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIikgXCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gcGhvbmUucGhvbmVOdW1iZXIpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIiAoXCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gcGhvbmUucGhvbmVUeXBlTmFtZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiKTwvbGk+XCIpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG5idWYucHVzaChcIjxoND7QktGA0LXQvNGPINGA0LDQsdC+0YLRi1xcdFxcdDwvaDQ+PHVsPjwvdWw+XCIpO1xuLy8gaXRlcmF0ZSBkYXRhLndvcmtpbmdIb3Vyc1xuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSBkYXRhLndvcmtpbmdIb3VycztcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIHdoID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8bGk+XCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gd2gud2Vla0RheU5hbWUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIlxcdDwvbGk+XCIpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIHdoID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8bGk+XCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gd2gud2Vla0RheU5hbWUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIlxcdDwvbGk+XCIpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG5idWYucHVzaChcIjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XFxcIm1vZGFsLWZvb3RlclxcXCI+PGJ1dHRvbiBpZD1cXFwiY2xvc2UtbW9kYWwtYnRuXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGRhdGEtZGlzbWlzcz1cXFwibW9kYWxcXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+Q2xvc2U8L2J1dHRvbj48L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj5cIik7fS5jYWxsKHRoaXMsXCJkYXRhXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5kYXRhOnR5cGVvZiBkYXRhIT09XCJ1bmRlZmluZWRcIj9kYXRhOnVuZGVmaW5lZCxcInVuZGVmaW5lZFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgudW5kZWZpbmVkOnR5cGVvZiB1bmRlZmluZWQhPT1cInVuZGVmaW5lZFwiP3VuZGVmaW5lZDp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2pzL2Rldi9wbS92aWV3L3BvRGV0YWlsLmphZGVcbi8vIG1vZHVsZSBpZCA9IDEzMFxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIndXNlIHN0cmljdCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG5cclxuXHR0aGlzLnBsSmFkZSA9IHJlcXVpcmUoJy4uL3ZpZXcvcGF0aExpc3QuamFkZScpO1xyXG5cdHRoaXMuZWxKYWRlID0gcmVxdWlyZSgnLi4vdmlldy9saXN0RWwuamFkZScpO1xyXG5cdHRoaXMubmVzdGVkTGlzdEphZGUgPSByZXF1aXJlKCcuLi92aWV3L3N1Ymxpc3QuamFkZScpO1xyXG5cdHRoaXMucGRmSmFkZSA9IHJlcXVpcmUoJy4uL3ZpZXcvcGRmUGF0aExpc3QuamFkZScpO1xyXG5cdHRoaXMueW1hcENlYXRlUGF0aCA9IHt9O1xyXG5cdHRoaXMuc2VsZWN0ZWRFTCA9IFtdO1xyXG5cclxuXHR2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG5cdHRoaXMuaW5pdCA9IGZ1bmN0aW9uKHlNYXBDcmVhdGVQYXRoKSB7XHJcblx0XHQkKCcubC1wbGFjZScpLmh0bWwoc2VsZi5wbEphZGUoKSk7XHJcblx0XHQvL3NlbGYubXlNYXA9bXlNYXA7XHJcblx0XHRzZWxmLnltYXBDZWF0ZVBhdGggPSB5TWFwQ3JlYXRlUGF0aDtcclxuXHRcdCQoJyNjbGVhci1wbGlzdC1idG4nKS5vbignY2xpY2snLCBzZWxmLnJlbW92ZUFsbCk7XHJcblx0XHQkKCcjY3JlYXRlLXBhdGgtYnRuJykub24oJ2NsaWNrJywgc2VsZi5jcmVhdGVQYXRoKTtcclxuXHRcdCQoJyNwcmludC1wYXRoLWJ0bicpLm9uKCdjbGljaycsIHNlbGYucGRmUGF0aCk7XHJcblxyXG5cdH07XHJcblxyXG5cdHRoaXMuYWRkRWxlbWVudCA9IGZ1bmN0aW9uKGRhdGEpIHtcclxuXHRcdCQoJyNwYXRoLWxpc3QnKS5hcHBlbmQoc2VsZi5lbEphZGUoe1xyXG5cdFx0XHRcImRhdGFcIjogZGF0YVxyXG5cdFx0fSkpO1xyXG5cdFx0c2VsZi5zZWxlY3RlZEVMLnB1c2goZGF0YSk7XHJcblx0XHQkKCcjJyArIGRhdGEucG9zdGFsQ29kZSkub24oJ2NsaWNrJywge1xyXG5cdFx0XHRlbGVtZW50OiBkYXRhXHJcblx0XHR9LCBzZWxmLnJlbW92ZUVsZW1lbnQpO1xyXG5cdFx0c2VsZi5sb2FkRXZudERhdGEoZGF0YSk7XHJcblxyXG5cdH07XHJcblxyXG5cdHRoaXMubG9hZEV2bnREYXRhID0gZnVuY3Rpb24oX2RhdGEpIHtcclxuXHRcdHZhciByYXJyID0gW107XHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR0eXBlOiAnR0VUJyxcclxuXHRcdFx0dXJsOiBcIi4vdGVzdGV2ZW50Lmpzb25cIixcclxuXHRcdFx0ZGF0YVR5cGU6IFwianNvblwiLFxyXG5cdFx0XHRzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coJ3N1Y2Nlc3MgbG9hZCBkYXRhJyk7XHJcblx0XHRcdFx0cmFyciA9IGRhdGEuZmlsdGVyKGZ1bmN0aW9uKGV2bnQpIHtcclxuXHRcdFx0XHRcdGlmIChldm50LnBvc3RhbENvZGUgPT0gX2RhdGEucG9zdGFsQ29kZSkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRfZGF0YS5ldm50cyA9IHJhcnI7XHJcblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdCQoJyMnICsgX2RhdGEucG9zdGFsQ29kZSkucGFyZW50KCkuYXBwZW5kKHNlbGYubmVzdGVkTGlzdEphZGUoe1xyXG5cdFx0XHRcdFx0XHRcImRhdGFcIjogcmFyclxyXG5cdFx0XHRcdFx0fSkpO1xyXG5cdFx0XHRcdFx0JCgnIycgKyBfZGF0YS5wb3N0YWxDb2RlKS5wYXJlbnQoKS5maW5kKCdpLmZhLXNwaW5uZXInKS5yZW1vdmUoKTtcclxuXHRcdFx0XHR9LCBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwMCkpO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRlcnJvcjogZnVuY3Rpb24oZXJyKSB7XHJcblx0XHRcdFx0Ly9jb25zb2xlLmxvZyhlcnIpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblxyXG5cdH07XHJcblxyXG5cdHRoaXMucmVtb3ZlRWxlbWVudCA9IGZ1bmN0aW9uKGUpIHtcclxuXHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRmb3IgKHZhciBpID0gc2VsZi5zZWxlY3RlZEVMLmxlbmd0aDsgaS0tOykge1xyXG5cdFx0XHRpZiAoc2VsZi5zZWxlY3RlZEVMW2ldLnBvc3RhbENvZGUgPT0gZS5kYXRhLmVsZW1lbnQucG9zdGFsQ29kZSkge1xyXG5cdFx0XHRcdCQoZS5jdXJyZW50VGFyZ2V0KS5wYXJlbnQoKS5vZmYoKTtcclxuXHRcdFx0XHQkKGUuY3VycmVudFRhcmdldCkucGFyZW50KCkucmVtb3ZlKCk7XHJcblx0XHRcdFx0Ly8kKCdbZGF0YS1ldm50LWlkPScrZS5kYXRhLmVsZW1lbnQucG9zdGFsQ29kZSsnXScpLm9mZigpO1xyXG5cdFx0XHRcdC8vJCgnW2RhdGEtZXZudC1pZD0nK2UuZGF0YS5lbGVtZW50LnBvc3RhbENvZGUrJ10nKS5yZW1vdmUoKTtcclxuXHRcdFx0XHRzZWxmLnNlbGVjdGVkRUwuc3BsaWNlKGksIDEpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdH07XHJcblx0dGhpcy5yZW1vdmVBbGwgPSBmdW5jdGlvbihlKSB7XHJcblx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0JCgnI3BhdGgtbGlzdCcpLmh0bWwoJycpO1xyXG5cdFx0c2VsZi5zZWxlY3RlZEVMID0gW107XHJcblx0fTtcclxuXHJcblx0dGhpcy5jcmVhdGVQYXRoID0gZnVuY3Rpb24oKSB7XHJcblx0XHRzZWxmLnltYXBDZWF0ZVBhdGgoc2VsZi5zZWxlY3RlZEVMKTtcclxuXHR9O1xyXG5cclxuXHR0aGlzLnBkZlBhdGggPSBmdW5jdGlvbigpIHtcclxuXHRcdHZhciBkb2NEZWZpbml0aW9uID0gc2VsZi5jcmVhdGVDb250ZW50KCk7XHJcblx0XHQvL3ZhciBkb2NEZWZpbml0aW9uID0gc2VsZi5wZGZKYWRlKHtcImRhdGFcIjpzZWxmLnNlbGVjdGVkRUx9KTtcclxuXHRcdHBkZk1ha2UuY3JlYXRlUGRmKGRvY0RlZmluaXRpb24pLm9wZW4oKTtcclxuXHR9O1xyXG5cclxuXHR0aGlzLmNyZWF0ZUNvbnRlbnQgPSBmdW5jdGlvbigpIHtcclxuXHRcdHZhciB1bGFyciA9IFtdO1xyXG5cdFx0c2VsZi5zZWxlY3RlZEVMLmZvckVhY2goZnVuY3Rpb24ocG8pIHtcclxuXHRcdFx0dWxhcnIucHVzaCh7XHJcblx0XHRcdFx0dGV4dDogcG8ucG9zdGFsQ29kZVxyXG5cdFx0XHR9KVxyXG5cdFx0XHRpZiAocG8uZXZudHMubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdHZhciBzdWxhcnIgPSBbXTtcclxuXHRcdFx0XHRwby5ldm50cy5mb3JFYWNoKGZ1bmN0aW9uKGV2bikge1xyXG5cdFx0XHRcdFx0c3VsYXJyLnB1c2goe1xyXG5cdFx0XHRcdFx0XHR0ZXh0OiBldm4udGl0bGVcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdHVsYXJyLnB1c2goe1xyXG5cdFx0XHRcdFx0dWw6IHN1bGFyclxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdHZhciBjb2JqID0ge1xyXG5cdFx0XHRjb250ZW50OiBbe1xyXG5cdFx0XHRcdHRleHQ6ICfQm9C40YHRgi3RgdC/0LjRgdC+0Log0LfQsNGP0LLQvtC6INC6INC40YHQv9C+0LvQvdC10L3QuNGOICjRhNC+0YDQvNCwIOKEljHQu9GBKScsXHJcblx0XHRcdFx0c3R5bGU6ICdoZWFkZXInXHJcblx0XHRcdH0sIHtcclxuXHRcdFx0XHR1bDogdWxhcnIsIHN0eWxlOidsaXN0cydcclxuXHRcdFx0fV0sXHJcblx0XHRcdHN0eWxlczoge1xyXG5cdFx0XHRcdGhlYWRlcjoge1xyXG5cdFx0XHRcdFx0Zm9udFNpemU6IDE2LFxyXG5cdFx0XHRcdFx0Ym9sZDogdHJ1ZVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0bGlzdHM6e1xyXG5cdFx0XHRcdFx0cGFkZGluZzpcIjE1cHhcIixcclxuXHRcdFx0XHRcdGZvbnRTaXplOjE0XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdFx0cmV0dXJuIGNvYmo7XHJcblx0fTtcclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2pzL2Rldi9wbS9tb2R1bGUvcGF0aExpc3QuanNcbi8vIG1vZHVsZSBpZCA9IDEzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJDOlxcXFxfdGVtcFxcXFxwY2h0XFxcXG5vZGVfbW9kdWxlc1xcXFxqYWRlXFxcXGxpYlxcXFxydW50aW1lLmpzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwiY2FyZFxcXCI+PGRpdiBjbGFzcz1cXFwiY2FyZC1oZWFkZXJcXFwiPjx1bCBjbGFzcz1cXFwibmF2IG5hdi1waWxscyBjYXJkLWhlYWRlci1waWxscyBmbG9hdC14cy1sZWZ0XFxcIj48bGkgY2xhc3M9XFxcIm5hdi1pdGVtXFxcIj48YSBpZD1cXFwiY2xlYXItcGxpc3QtYnRuXFxcIiBocmVmPVxcXCIjXFxcIiBjbGFzcz1cXFwibmF2LWxpbmtcXFwiPtCe0YfQuNGB0YLQuNGC0Yw8L2E+PC9saT48L3VsPjwvZGl2PjxkaXYgY2xhc3M9XFxcImNhcmQtYmxvY2tcXFwiPjxoNCBjbGFzcz1cXFwiY2FyZC10aXRsZVxcXCI+IDwvaDQ+PGRpdiBjbGFzcz1cXFwiY2FyZC10ZXh0XFxcIj48aDQ+0KHQv9C40YHQvtC6XFx0PHVsIGlkPVxcXCJwYXRoLWxpc3RcXFwiIGNsYXNzPVxcXCJsaXN0LWdyb3VwXFxcIj48L3VsPjwvaDQ+PC9kaXY+PCEtLWlucHV0I2V4ZWNlbWFpbC5mb3JtLWNvbnRyb2wodHlwZT0nZW1haWwnKS0tPjxhIGlkPVxcXCJjcmVhdGUtcGF0aC1idG5cXFwiIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJidG4gYnRuLXByaW1hcnlcXFwiPtGB0L7Qt9C00LDRgtGMINC80LDRgNGI0YDRg9GCPC9hPjwvZGl2PjxkaXYgY2xhc3M9XFxcImNhcmQtZm9vdGVyIHRleHQtbXV0ZWRcXFwiPjxhIGlkPVxcXCJwcmludC1wYXRoLWJ0blxcXCIgaHJlZj1cXFwiI1xcXCIgY2xhc3M9XFxcImJ0biBidG4tcHJpbWFyeVxcXCI+0L/QtdGH0LDRgtCw0YLRjDwvYT48YSBpZD1cXFwib3RoZXItcGF0aC1idG5cXFwiIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJidG4gYnRuLWRlZmF1bHRcXFwiPtC10YnQtSDRh9C10LPQvi3RgtC+PC9hPjwvZGl2PjwvZGl2PlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2pzL2Rldi9wbS92aWV3L3BhdGhMaXN0LmphZGVcbi8vIG1vZHVsZSBpZCA9IDEzMlxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJDOlxcXFxfdGVtcFxcXFxwY2h0XFxcXG5vZGVfbW9kdWxlc1xcXFxqYWRlXFxcXGxpYlxcXFxydW50aW1lLmpzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAoZGF0YSkge1xuYnVmLnB1c2goXCI8bGlcIiArIChqYWRlLmF0dHIoXCJkYXRhLWV2bnQtaWRcIiwgJycgKyAoZGF0YS5wb3N0YWxDb2RlKSArICcnLCB0cnVlLCB0cnVlKSkgKyBcIiBjbGFzcz1cXFwibGlzdC1ncm91cC1pdGVtIGxpc3QtZ3JvdXAtaXRlbS1hY3Rpb25cXFwiPlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IGRhdGEucG9zdGFsQ29kZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiPGEgaHJlZj1cXFwiI1xcXCJcIiArIChqYWRlLmF0dHIoXCJpZFwiLCAnJyArIChkYXRhLnBvc3RhbENvZGUpICsgJycsIHRydWUsIHRydWUpKSArIFwiIGNsYXNzPVxcXCJyZW1vdmUtcG8tbGlzdFxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLXRyYXNoLW8gZmEtZndcXFwiPjwvaT48L2E+PGkgc3R5bGU9XFxcImZsb2F0OmxlZnRcXFwiIGNsYXNzPVxcXCJmYSBmYS1zcGlubmVyIGZhLXB1bHNlIGZhLWZ3XFxcIj48L2k+PC9saT5cIik7fS5jYWxsKHRoaXMsXCJkYXRhXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5kYXRhOnR5cGVvZiBkYXRhIT09XCJ1bmRlZmluZWRcIj9kYXRhOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvanMvZGV2L3BtL3ZpZXcvbGlzdEVsLmphZGVcbi8vIG1vZHVsZSBpZCA9IDEzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJDOlxcXFxfdGVtcFxcXFxwY2h0XFxcXG5vZGVfbW9kdWxlc1xcXFxqYWRlXFxcXGxpYlxcXFxydW50aW1lLmpzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAoZGF0YSwgdW5kZWZpbmVkKSB7XG5idWYucHVzaChcIjx1bD5cIik7XG4vLyBpdGVyYXRlIGRhdGFcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gZGF0YTtcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGV2bnQgPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIjxsaT5cIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBldm50LnRpdGxlKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCI8YSBocmVmPVxcXCIjXFxcIiBjbGFzcz1cXFwicmVtb3ZlLWV2bnQtbGlzdFxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLXRyYXNoLW8gZmEtZndcXFwiPjwvaT48L2E+PC9saT5cIik7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIgZXZudCA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGxpPlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IGV2bnQudGl0bGUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIjxhIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJyZW1vdmUtZXZudC1saXN0XFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtdHJhc2gtbyBmYS1md1xcXCI+PC9pPjwvYT48L2xpPlwiKTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxuYnVmLnB1c2goXCI8L3VsPlwiKTt9LmNhbGwodGhpcyxcImRhdGFcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmRhdGE6dHlwZW9mIGRhdGEhPT1cInVuZGVmaW5lZFwiP2RhdGE6dW5kZWZpbmVkLFwidW5kZWZpbmVkXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC51bmRlZmluZWQ6dHlwZW9mIHVuZGVmaW5lZCE9PVwidW5kZWZpbmVkXCI/dW5kZWZpbmVkOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvanMvZGV2L3BtL3ZpZXcvc3VibGlzdC5qYWRlXG4vLyBtb2R1bGUgaWQgPSAxMzRcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHJcblx0dGhpcy5fbW9kYWwgPSByZXF1aXJlKCcuLi92aWV3L25ld0V2ZW50LmphZGUnKTtcclxuXHJcblx0dGhpcy5kZXN0cm95TW9kYWwgPSBmdW5jdGlvbigpIHtcclxuXHRcdFxyXG5cdFx0JChcIiNzYXZlLWV2ZW50LWJ0blwiKS5vZmYoJ2NsaWNrJyk7XHJcblx0XHQkKCcjY2xvc2UtbW9kYWwtYnRuJykub2ZmKCdjbGljaycpO1xyXG5cdFx0JCgnI2Nsb3NlLW1vZGFsLWNyb3NzLWJ0bicpLm9mZignY2xpY2snKTtcclxuXHRcdCQoJy5tb2RhbC1wbGFjZScpLmh0bWwoJycpO1xyXG5cdH07XHJcblxyXG5cdHZhciBzZWxmID0gdGhpcztcclxuXHJcblx0dGhpcy5pbml0ID0gZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0JCgnLm1vZGFsLXBsYWNlJykuaHRtbCh0aGlzLl9tb2RhbCgpKTtcclxuXHRcdCQoXCIuZmxhdHBpY2tyXCIpLmZsYXRwaWNrcih7XHJcblx0XHRcdGVuYWJsZVRpbWU6IHRydWUsXHJcblx0XHR9KTtcclxuXHJcblx0XHQkKFwiI3NhdmUtZXZlbnQtYnRuXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0dmFyIGV2bnQgPSB7XHJcblx0XHRcdFx0dGl0bGU6ICQoJyNldmVudC10aXRsZScpLnZhbCgpLFxyXG5cdFx0XHRcdHN0YXJ0OiBtb21lbnQoJCgnI2RhdGViZWdpbicpLnZhbCgpKSxcclxuXHRcdFx0XHRlbmQ6IG1vbWVudCgkKCcjZGF0ZWVuZCcpLnZhbCgpKSxcclxuXHRcdFx0XHRwb3N0YWxDb2RlOiAkKCcjcG9zdGNvZGUnKS52YWwoKSxcclxuXHRcdFx0XHRzdGF0dXM6ICQoJyNzdGF0dXMnKS52YWwoKSxcclxuXHRcdFx0XHRkZXNjcmlwdGlvbjogJChcIiNkZXNjcmlwdGlvblwiKS52YWwoKSxcclxuXHRcdFx0XHRleGVjdXRvcjogJCgnI2V4ZWN1dG9yJykudmFsKClcclxuXHRcdFx0fTtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJhZGQgZXZlbnRcIik7XHJcblx0XHRcdC8vJCgnI2NhbGVuZGFyJykuZnVsbENhbGVuZGFyKCdyZW5kZXJFdmVudCcsIGV2bnQsIHRydWUpO1xyXG5cclxuXHRcdFx0JC5hamF4KHtcclxuXHRcdFx0XHR0eXBlOiAnUE9TVCcsXHJcblx0XHRcdFx0dXJsOiAnL3VzZXJzL3NhdmUnLFxyXG5cdFx0XHRcdGRhdGE6IEpTT04uc3RyaW5naWZ5KGV2bnQpLFxyXG5cdFx0XHRcdGRhdGFUeXBlOiBcImpzb25cIixcclxuXHRcdFx0XHRjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcblx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJkYXRhIHNhdmVcIik7XHJcblx0XHRcdFx0XHR2YXIgZXZudEFycmF5ID0gJCgnI2NhbGVuZGFyJykuZnVsbENhbGVuZGFyKCdjbGllbnRFdmVudHMnKTtcclxuXHRcdFx0XHRcdHZhciBfZXZudCA9IGV2bnRBcnJheVtldm50QXJyYXkubGVuZ3RoIC0gMV07XHJcblx0XHRcdFx0XHRfZXZudC5faWQgPSBkYXRhLmluc2VydGVkaWQ7XHJcblxyXG5cdFx0XHRcdFx0JCgnI2NhbGVuZGFyJykuZnVsbENhbGVuZGFyKCd1cGRhdGVFdmVudCcsIF9ldm50KTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdC8vZXJyb3I6IGFqYXhFcnJvclxyXG5cdFx0XHR9KTtcclxuXHJcblxyXG5cdFx0fSk7XHJcblxyXG5cdFx0JCgnI2Nsb3NlLW1vZGFsLWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcblx0XHR9KTtcclxuXHJcblx0XHQkKCcjY2xvc2UtbW9kYWwtY3Jvc3MtYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoJyNtb2RhbCcpLm1vZGFsKCdzaG93Jyk7XHJcblxyXG5cdFx0Ly8kKCcjZGF0ZWJlZ2luJykudmFsKHN0YXJ0LmZvcm1hdCgnWVlZWS1NTS1ERCBoaDptbScpKTtcclxuXHRcdC8vJCgnI2RhdGVlbmQnKS52YWwoZW5kLmZvcm1hdCgnWVlZWS1NTS1ERCBoaDptbScpKTtcclxuXHJcblx0XHQkKCcjbW9kYWwnKS5vbignaGlkZGVuLmJzLm1vZGFsJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRjb25zb2xlLmxvZygnbW9kYWwgaGlkZScpO1xyXG5cdFx0XHRzZWxmLmRlc3Ryb3lNb2RhbCgpO1xyXG5cdFx0fSk7XHJcblxyXG5cdH07XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy9qcy9kZXYvcG0vbW9kdWxlL25ld0V2ZW50LmpzXG4vLyBtb2R1bGUgaWQgPSAxMzVcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIGphZGUgPSByZXF1aXJlKFwiQzpcXFxcX3RlbXBcXFxccGNodFxcXFxub2RlX21vZHVsZXNcXFxcamFkZVxcXFxsaWJcXFxccnVudGltZS5qc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIjxkaXYgaWQ9XFxcIm1vZGFsXFxcIiB0YWJpbmRleD1cXFwiLTFcXFwiIHJvbGU9XFxcImRpYWxvZ1xcXCIgYXJpYS1sYWJlbGxlZGJ5PVxcXCJteU1vZGFsTGFiZWxcXFwiIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIiBjbGFzcz1cXFwibW9kYWwgZmFkZVxcXCI+PGRpdiByb2xlPVxcXCJkb2N1bWVudFxcXCIgY2xhc3M9XFxcIm1vZGFsLWRpYWxvZ1xcXCI+PGRpdiBjbGFzcz1cXFwibW9kYWwtY29udGVudFxcXCI+PGRpdiBjbGFzcz1cXFwibW9kYWwtaGVhZGVyXFxcIj48YnV0dG9uIGlkPVxcXCJjbG9zZS1tb2RhbC1jcm9zcy1idG5cXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgZGF0YS1kaXNtaXNzPVxcXCJtb2RhbFxcXCIgYXJpYS1sYWJlbD1cXFwiQ2xvc2VcXFwiIGNsYXNzPVxcXCJjbG9zZVxcXCI+PHNwYW4gYXJpYS1oaWRkZW49XFxcInRydWVcXFwiPsOXPC9zcGFuPjwvYnV0dG9uPjxoNCBpZD1cXFwibXlNb2RhbExhYmVsXFxcIiBjbGFzcz1cXFwibW9kYWwtdGl0bGVcXFwiPtCh0L7Qt9C00LDQvdC40LU8L2g0PjwvZGl2PjxkaXYgY2xhc3M9XFxcIm1vZGFsLWJvZHlcXFwiPjxmb3JtIGFjdGlvbj1cXFwiXFxcIj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj48bGFiZWwgZm9yPVxcXCJcXFwiPtC30LDQs9C+0LvQvtCy0L7QujwvbGFiZWw+PGlucHV0IGlkPVxcXCJldmVudC10aXRsZVxcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7QvdCw0YfQsNC70L48L2xhYmVsPjxpbnB1dCBpZD1cXFwiZGF0ZWJlZ2luXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sIGZsYXRwaWNrclxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7QvtC60L7QvdGH0LDQvdC40LU8L2xhYmVsPjxpbnB1dCBpZD1cXFwiZGF0ZWVuZFxcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbCBmbGF0cGlja3JcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0L7RgtC00LXQu9C10L3QuNC1INC/0L7Qu9GD0YfQsNGC0LXQu9GMPC9sYWJlbD48aW5wdXQgaWQ9XFxcInBvc3Rjb2RlXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj48bGFiZWwgZm9yPVxcXCJcXFwiPtC+0L/QuNGB0LDQvdC40LU8L2xhYmVsPjxpbnB1dCBpZD1cXFwiZGVzY3JpcHRpb25cXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0YHRgtCw0YLRg9GBPC9sYWJlbD48aW5wdXQgaWQ9XFxcInN0YXR1c1xcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7QuNGB0L/QvtC70L3QuNGC0LXQu9GMPC9sYWJlbD48aW5wdXQgaWQ9XFxcImV4ZWN1dG9yXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIj48L2Rpdj48L2Zvcm0+PC9kaXY+PGRpdiBjbGFzcz1cXFwibW9kYWwtZm9vdGVyXFxcIj48YnV0dG9uIGlkPVxcXCJjbG9zZS1tb2RhbC1idG5cXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgZGF0YS1kaXNtaXNzPVxcXCJtb2RhbFxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj5DbG9zZTwvYnV0dG9uPjxidXR0b24gaWQ9XFxcInNhdmUtZXZlbnQtYnRuXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXByaW1hcnlcXFwiPlNhdmUgY2hhbmdlczwvYnV0dG9uPjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2PlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2pzL2Rldi9wbS92aWV3L25ld0V2ZW50LmphZGVcbi8vIG1vZHVsZSBpZCA9IDEzNlxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJDOlxcXFxfdGVtcFxcXFxwY2h0XFxcXG5vZGVfbW9kdWxlc1xcXFxqYWRlXFxcXGxpYlxcXFxydW50aW1lLmpzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAoZGF0YSwgdW5kZWZpbmVkKSB7XG4vLyBpdGVyYXRlIGRhdGFcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gZGF0YTtcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIHBvID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCJcIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBwby5wb3N0YWxDb2RlKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCIgXFxcXGJyXCIpO1xuaWYgKHBvLmV2bnRzLmxlbmd0aD4wKVxue1xuLy8gaXRlcmF0ZSBwby5ldm50c1xuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSBwby5ldm50cztcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGV2bnQgPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IGV2bnQudGl0bGUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIiBcXFxcYnJcIik7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIgZXZudCA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiXCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gZXZudC50aXRsZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiIFxcXFxiclwiKTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxufVxuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIHBvID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCJcIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBwby5wb3N0YWxDb2RlKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCIgXFxcXGJyXCIpO1xuaWYgKHBvLmV2bnRzLmxlbmd0aD4wKVxue1xuLy8gaXRlcmF0ZSBwby5ldm50c1xuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSBwby5ldm50cztcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGV2bnQgPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IGV2bnQudGl0bGUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIiBcXFxcYnJcIik7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIgZXZudCA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiXCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gZXZudC50aXRsZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiIFxcXFxiclwiKTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxufVxuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xufS5jYWxsKHRoaXMsXCJkYXRhXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5kYXRhOnR5cGVvZiBkYXRhIT09XCJ1bmRlZmluZWRcIj9kYXRhOnVuZGVmaW5lZCxcInVuZGVmaW5lZFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgudW5kZWZpbmVkOnR5cGVvZiB1bmRlZmluZWQhPT1cInVuZGVmaW5lZFwiP3VuZGVmaW5lZDp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2pzL2Rldi9wbS92aWV3L3BkZlBhdGhMaXN0LmphZGVcbi8vIG1vZHVsZSBpZCA9IDI1M1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3ZHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDcElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzVFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OyIsInNvdXJjZVJvb3QiOiIifQ==