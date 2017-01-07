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
		var nevnt=__webpack_require__(136);

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
		this.pdfJade = __webpack_require__(135);
		this.evntDetailJade = __webpack_require__(254);
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
			$('[data-po-id=' + data.postalCode + ']').children('.remove-po-list').on('click', {
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
						console.log(rarr);
						$('[data-po-id=' + _data.postalCode + ']').find('i.fa-spinner').remove();
						$('[data-po-id=' + _data.postalCode + ']').append(self.nestedListJade({
							"data": rarr
						}));
						//$('.evnt-li').children('.show-evnt-detail').on('click',self.showEvntDetail);
						//$('.evnt-li').children('.remove-evnt-list').on('click',self.removeEvnt);					
						//$('[data-po-id='+ _data.postalCode+']').on('click',self.showEvntDetail);
						$('[data-po-id=' + _data.postalCode + ']').on('click', self.listenEvnt);
					}, /*Math.floor(Math.random() * 10000)*/ 10);
				},
				error: function(err) {
					//console.log(err);
				}
			});


		};
		this.listenEvnt = function(e) {
			e.stopPropagation();
			e.preventDefault();

			var type = true; //delete
			if ($(e.target).parent().hasClass('show-evnt-detail'))
				type = false; //'show-detail';

			var op = $(e.currentTarget).attr('data-po-id');
			var evntId = $(e.target).parent().parent().attr('data-evnt-id');
			//console.log($(e.target).parent().hasClass('show-evnt-detail'));


			for (var i = self.selectedEL.length; i--;) {
				if (self.selectedEL[i].postalCode == op) {
					for (var j = self.selectedEL[i].evnts.length; j--;) {
						if (self.selectedEL[i].evnts[j]._id == evntId) {
							if (type) {
								self.selectedEL[i].evnts.splice(j, 1);
								$(e.target).parent().parent().remove();
							} else {
								var _event = self.selectedEL[i].evnts[j];
								$('.modal-place').html(self.evntDetailJade());
								$(".flatpickr").flatpickr({
									enableTime: true,
								});

								$('#modal').modal('show');

								//$('#datebegin').val(_event.start.format('YYYY-MM-DD hh:mm'));
								//$('#dateend').val(_event.end.format('YYYY-MM-DD hh:mm'));
								$('#event-title').val(_event.title);
								$('#postcode').val(_event.postalCode);
								$('#status').val(_event.status);
								$("#description").val(_event.description);
								$('#executor').val(_event.executor);

								$('#modal').on('hidden.bs.modal', function(e) {
									console.log('modal hide');
									self.destroyModal();

								});
							}
						}
					}
				}
			}

		};
		this.destroyModal = function() {

			//$("#save-event-btn").off('click');
			$('#close-modal-btn').off('click');
			$('#close-modal-cross-btn').off('click');
			//$('#delete-event-btn').off();
			$('.modal-place').html('');
		};

		this.removeElement = function(e) {
			e.stopPropagation();
			for (var i = self.selectedEL.length; i--;) {
				if (self.selectedEL[i].postalCode == e.data.element.postalCode) {
					$(e.currentTarget).off();
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
					ul: ularr,
					style: 'lists'
				}],
				styles: {
					header: {
						fontSize: 16,
						bold: true
					},
					lists: {
						padding: "15px",
						fontSize: 14
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
	buf.push("<li" + (jade.attr("data-po-id", '' + (data.postalCode) + '', true, true)) + " class=\"list-group-item list-group-item-action\">" + (jade.escape((jade_interp = data.postalCode) == null ? '' : jade_interp)) + "<a href=\"#\" class=\"remove-po-list\"><i class=\"fa fa-trash-o fa-fw\"></i></a><i style=\"float:left\" class=\"fa fa-spinner fa-pulse fa-fw\"></i></li>");}.call(this,"data" in locals_for_with?locals_for_with.data:typeof data!=="undefined"?data:undefined));;return buf.join("");
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

	buf.push("<li" + (jade.attr("data-evnt-id", '' + (evnt._id) + '', true, true)) + " class=\"evnt-li\">" + (jade.escape((jade_interp = evnt.title) == null ? '' : jade_interp)) + "<a href=\"#\" class=\"show-evnt-detail\"><i class=\"fa fa-search fa-fw\"></i></a><a href=\"#\" class=\"remove-evnt-list\"><i class=\"fa fa-trash-o fa-fw\"></i></a></li>");
	    }

	  } else {
	    var $$l = 0;
	    for (var $index in $$obj) {
	      $$l++;      var evnt = $$obj[$index];

	buf.push("<li" + (jade.attr("data-evnt-id", '' + (evnt._id) + '', true, true)) + " class=\"evnt-li\">" + (jade.escape((jade_interp = evnt.title) == null ? '' : jade_interp)) + "<a href=\"#\" class=\"show-evnt-detail\"><i class=\"fa fa-search fa-fw\"></i></a><a href=\"#\" class=\"remove-evnt-list\"><i class=\"fa fa-trash-o fa-fw\"></i></a></li>");
	    }

	  }
	}).call(this);

	buf.push("</ul>");}.call(this,"data" in locals_for_with?locals_for_with.data:typeof data!=="undefined"?data:undefined,"undefined" in locals_for_with?locals_for_with.undefined: false?undefined:undefined));;return buf.join("");
	}

/***/ },

/***/ 135:
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

/***/ },

/***/ 136:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, moment) {'use strict';

	module.exports = function() {

		this._modal = __webpack_require__(137);

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

/***/ 137:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(5);

	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;

	buf.push("<div id=\"modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\" class=\"modal fade\"><div role=\"document\" class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button id=\"close-modal-cross-btn\" type=\"button\" data-dismiss=\"modal\" aria-label=\"Close\" class=\"close\"><span aria-hidden=\"true\">×</span></button><h4 id=\"myModalLabel\" class=\"modal-title\">Создание</h4></div><div class=\"modal-body\"><form action=\"\"><div class=\"form-group\"><label for=\"\">заголовок</label><input id=\"event-title\" type=\"text\" class=\"form-control\"></div><div class=\"form-group\"><label for=\"\">начало</label><input id=\"datebegin\" type=\"text\" class=\"form-control flatpickr\"></div><div class=\"form-group\"><label for=\"\">окончание</label><input id=\"dateend\" type=\"text\" class=\"form-control flatpickr\"></div><div class=\"form-group\"><label for=\"\">отделение получатель</label><input id=\"postcode\" type=\"text\" class=\"form-control\"></div><div class=\"form-group\"><label for=\"\">описание</label><input id=\"description\" type=\"text\" class=\"form-control\"></div><div class=\"form-group\"><label for=\"\">статус</label><input id=\"status\" type=\"text\" class=\"form-control\"></div><div class=\"form-group\"><label for=\"\">исполнитель</label><input id=\"executor\" type=\"text\" class=\"form-control\"></div></form></div><div class=\"modal-footer\"><button id=\"close-modal-btn\" type=\"button\" data-dismiss=\"modal\" class=\"btn btn-secondary\">Close</button><button id=\"save-event-btn\" type=\"button\" class=\"btn btn-primary\">Save changes</button></div></div></div></div>");;return buf.join("");
	}

/***/ },

/***/ 254:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(5);

	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;

	buf.push("<div id=\"modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\" class=\"modal fade\"><div role=\"document\" class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" data-dismiss=\"modal\" aria-label=\"Close\" class=\"close\"><span aria-hidden=\"true\">×</span></button><h4 id=\"myModalLabel\" class=\"modal-title\">Редактирование/удаление</h4></div><div class=\"modal-body\"><form action=\"\"><div class=\"form-group\"><label for=\"\">заголовок</label><input id=\"event-title\" type=\"text\" class=\"form-control\"></div><div class=\"form-group\"><label for=\"\">начало</label><input id=\"datebegin\" type=\"text\" class=\"form-control flatpickr\"></div><div class=\"form-group\"><label for=\"\">окончание</label><input id=\"dateend\" type=\"text\" class=\"form-control flatpickr\"></div><div class=\"form-group\"><label for=\"\">отделение получатель</label><input id=\"postcode\" type=\"text\" class=\"form-control\"></div><div class=\"form-group\"><label for=\"\">описание</label><input id=\"description\" type=\"text\" class=\"form-control\"></div><div class=\"form-group\"><label for=\"\">статус</label><input id=\"status\" type=\"text\" class=\"form-control\"></div><div class=\"form-group\"><label for=\"\">исполнитель</label><input id=\"executor\" type=\"text\" class=\"form-control\"></div></form></div><div class=\"modal-footer\"><button type=\"button\" data-dismiss=\"modal\" class=\"btn btn-secondary\">Close</button><!--button#save-event-btn.btn.btn-primary(type='button') Save changes--><!--button#delete-event-btn.btn.btn-danger(type='button') Delete--></div></div></div></div>");;return buf.join("");
	}

/***/ }

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aGFwcC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3B1YmxpYy9qcy9kZXYvcG0vYXBwLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9kZXYvcG0vbW9kdWxlL21hcDRwLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9kZXYvcG0vdmlldy9tYXAuamFkZSIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3BtL21vZHVsZS9wb0RldGFpbC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3BtL3ZpZXcvcG9EZXRhaWwuamFkZSIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3BtL21vZHVsZS9wYXRoTGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3BtL3ZpZXcvcGF0aExpc3QuamFkZSIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3BtL3ZpZXcvbGlzdEVsLmphZGUiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2Rldi9wbS92aWV3L3N1Ymxpc3QuamFkZSIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3BtL3ZpZXcvcGRmUGF0aExpc3QuamFkZSIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3BtL21vZHVsZS9uZXdFdmVudC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3BtL3ZpZXcvbmV3RXZlbnQuamFkZSIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3BtL3ZpZXcvZWRpdGRlbEV2ZW50LmphZGUiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy9tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG5jb25zb2xlLmxvZygnaGkgcGNodCcpO1xyXG5cclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1x0XHJcblxyXG5cdCQoXCIuZmxhdHBpY2tyXCIpLmZsYXRwaWNrcih7XHJcblx0XHRlbmFibGVUaW1lOiB0cnVlLFxyXG5cdH0pO1xyXG5cclxuXHR2YXIgbXlNYXA9cmVxdWlyZSgnLi9tb2R1bGUvbWFwNHAuanMnKTtcdFxyXG5cdHltYXBzLnJlYWR5KGluaXQpO1xyXG5cdHZhciBfbXlNYXA7XHJcblx0dmFyIG5ldm50PXJlcXVpcmUoJy4vbW9kdWxlL25ld0V2ZW50LmpzJyk7XHJcblxyXG5cdGZ1bmN0aW9uIGluaXQoKSB7XHJcblx0XHRcclxuXHRcdF9teU1hcD1teU1hcCgpO1xyXG5cclxuXHRcdCQoJyNtYXAtbG9hZC1saW5rJykuY2xpY2soZnVuY3Rpb24oKXtcclxuXHRcdFx0X215TWFwLmRlc3Ryb3koKTtcclxuXHRcdFx0X215TWFwPW51bGw7XHJcblx0XHRcdF9teU1hcD1teU1hcCgpO1xyXG5cclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoJyNuZXctZXZudC1saW5rJykuY2xpY2soZnVuY3Rpb24oZSl7XHJcblx0XHRcdHZhciBfbmV2bnQ9IG5ldyBuZXZudCgpO1xyXG5cdFx0XHRfbmV2bnQuaW5pdCgpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHJcblxyXG59KTtcclxuXHJcbi8vfVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2pzL2Rldi9wbS9hcHAuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHRjb25zb2xlLmxvZygnbWFwNHAuanMnKTtcclxuXHJcblx0dmFyIF9tYXBqYWRlPXJlcXVpcmUoJy4uL3ZpZXcvbWFwLmphZGUnKTtcclxuXHQkKCcuYy1wbGFjZScpLmh0bWwoX21hcGphZGUoKSk7XHJcblxyXG5cdHZhciBfcG9kZXRhaWwgPSByZXF1aXJlKCcuLi9tb2R1bGUvcG9EZXRhaWwuanMnKTtcclxuXHR2YXIgcG9EZXRhaWw9bmV3IF9wb2RldGFpbCgpO1xyXG5cclxuXHR2YXIgX3BhdGhMaXN0PXJlcXVpcmUoJy4uL21vZHVsZS9wYXRoTGlzdC5qcycpO1xyXG5cdHZhciBwYXRoTGlzdD1uZXcgX3BhdGhMaXN0KCk7XHJcblxyXG5cdHZhciBfc2F2ZSA9IHRydWU7XHJcblx0dmFyIF9ldmVudCwgX3Bvc3RPZmZpY2VBcnI7XHJcblx0dmFyIG15Q29sbGVjdGlvbiA9IG5ldyB5bWFwcy5HZW9PYmplY3RDb2xsZWN0aW9uKCk7XHJcblx0dmFyIF9yb3V0ZTtcclxuXHJcblx0dmFyIG15TWFwID0gbmV3IHltYXBzLk1hcChcIm1hcHlcIiwge1xyXG5cdFx0Y2VudGVyOiBbNTAuNTksIDM2LjU4XSxcclxuXHRcdHpvb206IDEwLFxyXG5cdFx0Y29udHJvbHM6IFsncm91dGVFZGl0b3InXVxyXG5cdH0sIHtcclxuXHRcdGJ1dHRvbk1heFdpZHRoOiAxNTBcclxuXHR9KTtcclxuXHJcblx0ZnVuY3Rpb24gY3JlYXRlUGF0aChzZWxlY3RlZEVsKXtcclxuXHRcdG15Q29sbGVjdGlvbi5yZW1vdmVBbGwoKTtcdFxyXG5cdFx0aWYoX3JvdXRlKVxyXG5cdFx0XHRteU1hcC5nZW9PYmplY3RzLnJlbW92ZShfcm91dGUpO1x0XHJcblxyXG5cdFx0dmFyIHBhdGhBcnI9c2VsZWN0ZWRFbC5tYXAoZnVuY3Rpb24ob3RkKXtcclxuXHRcdFx0XHRyZXR1cm4ge3R5cGU6J3dheVBvaW50Jyxwb2ludDpbb3RkLmxhdGl0dWRlLCBvdGQubG9uZ2l0dWRlXX07XHJcblx0XHRcdH0pO1xyXG5cdFx0XHR5bWFwcy5yb3V0ZShwYXRoQXJyKS50aGVuKFxyXG5cdFx0XHRcdGZ1bmN0aW9uKHJvdXRlKSB7XHJcblx0XHRcdFx0XHRfcm91dGU9cm91dGU7XHJcblx0XHRcdFx0XHRteU1hcC5nZW9PYmplY3RzLmFkZChyb3V0ZSk7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRmdW5jdGlvbihlcnJvcikge1xyXG5cdFx0XHRcdFx0YWxlcnQoXCLQktC+0LfQvdC40LrQu9CwINC+0YjQuNCx0LrQsDogXCIgKyBlcnJvci5tZXNzYWdlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdCk7XHJcblxyXG5cdH1cclxuXHRcclxuXHQkLmFqYXgoe1xyXG5cdFx0dHlwZTogJ0dFVCcsXHJcblx0XHR1cmw6IFwiLi9wb3N0YWxzLmpzb25cIixcclxuXHRcdGRhdGFUeXBlOiBcImpzb25cIixcclxuXHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuXHJcblx0XHRcdF9wb3N0T2ZmaWNlQXJyID0gZGF0YTtcclxuXHRcdFx0XHJcblxyXG5cdFx0XHR2YXIgbXlCYWxsb29uQ29udGVudEJvZHlMYXlvdXQgPSB5bWFwcy50ZW1wbGF0ZUxheW91dEZhY3RvcnkuY3JlYXRlQ2xhc3MoXHJcblx0XHRcdFx0JzxwPiRbcHJvcGVydGllcy5kYXRhLnBvc3RhbENvZGVdPC9wPjxwPiRbcHJvcGVydGllcy5kYXRhLmFkZHJlc3NTb3VyY2VdPC9wPjxwPiRbcHJvcGVydGllcy5kYXRhLnR5cGVDb2RlXTwvcD48YnIgLz48YnV0dG9uIGlkPVwic2hvdy1wby1kZXRhaWwtYnRuXCI+0J/QvtC00YDQvtCx0L3QvjwvYnV0dG9uPjxiciAvPjxidXR0b24gaWQ9XCJhZGQtdG8tcGF0aC1idG5cIj7QkiDRgdC/0LjRgdC+0Lo8L2J1dHRvbj4nLCB7XHJcblx0XHRcdFx0XHRidWlsZDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdG15QmFsbG9vbkNvbnRlbnRCb2R5TGF5b3V0LnN1cGVyY2xhc3MuYnVpbGQuY2FsbCh0aGlzKTtcclxuXHRcdFx0XHRcdFx0JCgnI3Nob3ctcG8tZGV0YWlsLWJ0bicpLm9uKCdjbGljaycsIHtcclxuXHRcdFx0XHRcdFx0XHRcInBvXCI6IHRoaXMuX2RhdGEucHJvcGVydGllcy5fZGF0YVxyXG5cdFx0XHRcdFx0XHR9LCB0aGlzLm9uU2hvd1BPRGV0YWlsQ2xpY2spO1xyXG5cdFx0XHRcdFx0XHQkKCcjYWRkLXRvLXBhdGgtYnRuJykub24oJ2NsaWNrJywge1xyXG5cdFx0XHRcdFx0XHRcdFwicG9cIjogdGhpcy5fZGF0YS5wcm9wZXJ0aWVzLl9kYXRhXHJcblx0XHRcdFx0XHRcdH0sIHRoaXMub25BZGRUb1BhdGhDbGljayk7XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0Y2xlYXI6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHQkKCcjc2hvdy1wby1kZXRhaWwtYnRuJykub2ZmKCdjbGljaycsIHRoaXMub25TaG93UE9EZXRhaWxDbGljayk7XHJcblx0XHRcdFx0XHRcdG15QmFsbG9vbkNvbnRlbnRCb2R5TGF5b3V0LnN1cGVyY2xhc3MuY2xlYXIuY2FsbCh0aGlzKTtcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRvblNob3dQT0RldGFpbENsaWNrOiBmdW5jdGlvbihlKSB7XHJcblx0XHRcdFx0XHRcdHBvRGV0YWlsLmluaXQoZS5kYXRhLnBvLmRhdGEsIG15TWFwKTtcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRvbkFkZFRvUGF0aENsaWNrOmZ1bmN0aW9uKGUpe1xyXG5cdFx0XHRcdFx0XHRwYXRoTGlzdC5hZGRFbGVtZW50KGUuZGF0YS5wby5kYXRhKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdGRhdGEuZm9yRWFjaChmdW5jdGlvbihvdGQpIHtcclxuXHJcblx0XHRcdFx0dmFyIHBtYXJrID0gbmV3IHltYXBzLlBsYWNlbWFyayhbb3RkLmxhdGl0dWRlLCBvdGQubG9uZ2l0dWRlXSxcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdGRhdGE6IG90ZCxcclxuXHRcdFx0XHRcdFx0aWNvbkNvbnRlbnQ6IG90ZC5wb3N0YWxDb2RlLFxyXG5cdFx0XHRcdFx0XHRpY29uQ2FwdGlvbjogb3RkLnBvc3RhbENvZGVcclxuXHRcdFx0XHRcdH0sIHtcclxuXHRcdFx0XHRcdFx0YmFsbG9vbkNvbnRlbnRMYXlvdXQ6IG15QmFsbG9vbkNvbnRlbnRCb2R5TGF5b3V0LFxyXG5cdFx0XHRcdFx0XHRwcmVzZXQ6ICdpc2xhbmRzI2JsYWNrU3RyZXRjaHlJY29uJ1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdCk7XHRcdFxyXG5cdFx0XHRcdG15Q29sbGVjdGlvbi5hZGQocG1hcmspO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdG15TWFwLmdlb09iamVjdHMuYWRkKG15Q29sbGVjdGlvbik7XHJcblx0XHRcdHBhdGhMaXN0LmluaXQoY3JlYXRlUGF0aCk7XHJcblxyXG5cdFx0fSxcclxuXHRcdC8vZXJyb3I6IGxvYWRFcnJvclxyXG5cdH0pO1xyXG5cclxuXHRyZXR1cm4gbXlNYXA7XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy9qcy9kZXYvcG0vbW9kdWxlL21hcDRwLmpzXG4vLyBtb2R1bGUgaWQgPSAxMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIGphZGUgPSByZXF1aXJlKFwiQzpcXFxcX3RlbXBcXFxccGNodFxcXFxub2RlX21vZHVsZXNcXFxcamFkZVxcXFxsaWJcXFxccnVudGltZS5qc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIjxkaXYgaWQ9XFxcIm1hcHlcXFwiIHN0eWxlPVxcXCJ3aWR0aDogMTAwJTsgaGVpZ2h0OiA4MDBweFxcXCI+PC9kaXY+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvanMvZGV2L3BtL3ZpZXcvbWFwLmphZGVcbi8vIG1vZHVsZSBpZCA9IDEyOFxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIndXNlIHNydGljdCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cz1mdW5jdGlvbigpe1xyXG5cclxuICB0aGlzLl9tb2RhbCA9IHJlcXVpcmUoJy4uL3ZpZXcvcG9EZXRhaWwuamFkZScpO1xyXG5cclxuICB0aGlzLmRlc3Ryb3lNb2RhbCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgXHJcbiAgICAkKCcjY2xvc2UtbW9kYWwtYnRuJykub2ZmKCdjbGljaycpO1xyXG4gICAgJCgnI2Nsb3NlLW1vZGFsLWNyb3NzLWJ0bicpLm9mZignY2xpY2snKTtcclxuICAgICQoJy5tb2RhbC1wbGFjZScpLmh0bWwoJycpO1xyXG4gIH07XHJcblxyXG4gIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgdGhpcy5pbml0ID0gZnVuY3Rpb24oZGF0YSwgbXlNYXApIHtcclxuXHJcbiAgICAkKCcubW9kYWwtcGxhY2UnKS5odG1sKHRoaXMuX21vZGFsKHtcImRhdGFcIjogZGF0YX0pKTtcclxuXHJcblxyXG4gICAgJCgnI2Nsb3NlLW1vZGFsLWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcjY2xvc2UtbW9kYWwtY3Jvc3MtYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgICQoJyNtb2RhbCcpLm1vZGFsKCdzaG93Jyk7XHJcblxyXG4gICAgJCgnI21vZGFsJykub24oJ2hpZGRlbi5icy5tb2RhbCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgY29uc29sZS5sb2coJ21vZGFsIGhpZGUnKTtcclxuICAgICAgc2VsZi5kZXN0cm95TW9kYWwoKTtcclxuICAgIH0pO1xyXG5cclxuICB9O1xyXG5cdFxyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvanMvZGV2L3BtL21vZHVsZS9wb0RldGFpbC5qc1xuLy8gbW9kdWxlIGlkID0gMTI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsInZhciBqYWRlID0gcmVxdWlyZShcIkM6XFxcXF90ZW1wXFxcXHBjaHRcXFxcbm9kZV9tb2R1bGVzXFxcXGphZGVcXFxcbGliXFxcXHJ1bnRpbWUuanNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChkYXRhLCB1bmRlZmluZWQpIHtcbmJ1Zi5wdXNoKFwiPGRpdiBpZD1cXFwibW9kYWxcXFwiIHRhYmluZGV4PVxcXCItMVxcXCIgcm9sZT1cXFwiZGlhbG9nXFxcIiBhcmlhLWxhYmVsbGVkYnk9XFxcIm15TW9kYWxMYWJlbFxcXCIgYXJpYS1oaWRkZW49XFxcInRydWVcXFwiIGNsYXNzPVxcXCJtb2RhbCBmYWRlXFxcIj48ZGl2IHJvbGU9XFxcImRvY3VtZW50XFxcIiBjbGFzcz1cXFwibW9kYWwtZGlhbG9nXFxcIj48ZGl2IGNsYXNzPVxcXCJtb2RhbC1jb250ZW50XFxcIj48ZGl2IGNsYXNzPVxcXCJtb2RhbC1oZWFkZXJcXFwiPjxidXR0b24gaWQ9XFxcImNsb3NlLW1vZGFsLWNyb3NzLWJ0blxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBkYXRhLWRpc21pc3M9XFxcIm1vZGFsXFxcIiBhcmlhLWxhYmVsPVxcXCJDbG9zZVxcXCIgY2xhc3M9XFxcImNsb3NlXFxcIj48c3BhbiBhcmlhLWhpZGRlbj1cXFwidHJ1ZVxcXCI+w5c8L3NwYW4+PC9idXR0b24+PGg0IGlkPVxcXCJteU1vZGFsTGFiZWxcXFwiIGNsYXNzPVxcXCJtb2RhbC10aXRsZVxcXCI+0JTQtdGC0LDQu9GM0L3QviAtIFwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IGRhdGEucG9zdGFsQ29kZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiPC9oND48L2Rpdj48ZGl2IGNsYXNzPVxcXCJtb2RhbC1ib2R5XFxcIj48ZGl2IGNsYXNzPVxcXCJjYXJkXFxcIj48aDMgY2xhc3M9XFxcImNhcmQtaGVhZGVyXFxcIj5cIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBkYXRhLnBvc3RhbENvZGUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIjwvaDM+PGRpdiBjbGFzcz1cXFwiY2FyZC1ibG9ja1xcXCI+PGg0IGNsYXNzPVxcXCJjYXJkLXRpdGxlXFxcIj5cIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBkYXRhLnBvc3RhbENvZGUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIiBcIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBkYXRhLnNldHRsZW1lbnQpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIiBcIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBkYXRhLmFkZHJlc3NTb3VyY2UpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIjwvaDQ+PGRpdiBjbGFzcz1cXFwiY2FyZC10ZXh0XFxcIj48aDQ+0J/RgNC10LTQvtGB0YLQsNCy0LvRj9C10LzRi9C1INGD0YHQu9GD0LPQuDwvaDQ+PHVsPjwvdWw+XCIpO1xuLy8gaXRlcmF0ZSBkYXRhLnNlcnZpY2VHcm91cHNcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gZGF0YS5zZXJ2aWNlR3JvdXBzO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIgc2cgPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIjxsaT5cIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBzZy5zZXJ2aWNlR3JvdXBOYW1lKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCI8L2xpPlwiKTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBzZyA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGxpPlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IHNnLnNlcnZpY2VHcm91cE5hbWUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIjwvbGk+XCIpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG5idWYucHVzaChcIjxoND7QotC10LvQtdGE0L7QvdGLPC9oND48dWw+XFx0XFx0XFx0PC91bD5cIik7XG4vLyBpdGVyYXRlIGRhdGEucGhvbmVzXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IGRhdGEucGhvbmVzO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIgcGhvbmUgPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIjxsaT4gKFwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IHBob25lLnBob25lVG93bkNvZGUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIikgXCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gcGhvbmUucGhvbmVOdW1iZXIpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIiAoXCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gcGhvbmUucGhvbmVUeXBlTmFtZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiKTwvbGk+XCIpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIHBob25lID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8bGk+IChcIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBwaG9uZS5waG9uZVRvd25Db2RlKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCIpIFwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IHBob25lLnBob25lTnVtYmVyKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCIgKFwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IHBob25lLnBob25lVHlwZU5hbWUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIik8L2xpPlwiKTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxuYnVmLnB1c2goXCI8aDQ+0JLRgNC10LzRjyDRgNCw0LHQvtGC0YtcXHRcXHQ8L2g0Pjx1bD48L3VsPlwiKTtcbi8vIGl0ZXJhdGUgZGF0YS53b3JraW5nSG91cnNcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gZGF0YS53b3JraW5nSG91cnM7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciB3aCA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGxpPlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IHdoLndlZWtEYXlOYW1lKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCJcXHQ8L2xpPlwiKTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciB3aCA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGxpPlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IHdoLndlZWtEYXlOYW1lKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCJcXHQ8L2xpPlwiKTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxuYnVmLnB1c2goXCI8L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJtb2RhbC1mb290ZXJcXFwiPjxidXR0b24gaWQ9XFxcImNsb3NlLW1vZGFsLWJ0blxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBkYXRhLWRpc21pc3M9XFxcIm1vZGFsXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPkNsb3NlPC9idXR0b24+PC9kaXY+PC9kaXY+PC9kaXY+PC9kaXY+XCIpO30uY2FsbCh0aGlzLFwiZGF0YVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguZGF0YTp0eXBlb2YgZGF0YSE9PVwidW5kZWZpbmVkXCI/ZGF0YTp1bmRlZmluZWQsXCJ1bmRlZmluZWRcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnVuZGVmaW5lZDp0eXBlb2YgdW5kZWZpbmVkIT09XCJ1bmRlZmluZWRcIj91bmRlZmluZWQ6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy9qcy9kZXYvcG0vdmlldy9wb0RldGFpbC5qYWRlXG4vLyBtb2R1bGUgaWQgPSAxMzBcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHJcblx0dGhpcy5wbEphZGUgPSByZXF1aXJlKCcuLi92aWV3L3BhdGhMaXN0LmphZGUnKTtcclxuXHR0aGlzLmVsSmFkZSA9IHJlcXVpcmUoJy4uL3ZpZXcvbGlzdEVsLmphZGUnKTtcclxuXHR0aGlzLm5lc3RlZExpc3RKYWRlID0gcmVxdWlyZSgnLi4vdmlldy9zdWJsaXN0LmphZGUnKTtcclxuXHR0aGlzLnBkZkphZGUgPSByZXF1aXJlKCcuLi92aWV3L3BkZlBhdGhMaXN0LmphZGUnKTtcclxuXHR0aGlzLmV2bnREZXRhaWxKYWRlID0gcmVxdWlyZSgnLi4vdmlldy9lZGl0ZGVsRXZlbnQuamFkZScpO1xyXG5cdHRoaXMueW1hcENlYXRlUGF0aCA9IHt9O1xyXG5cdHRoaXMuc2VsZWN0ZWRFTCA9IFtdO1xyXG5cclxuXHR2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG5cdHRoaXMuaW5pdCA9IGZ1bmN0aW9uKHlNYXBDcmVhdGVQYXRoKSB7XHJcblx0XHQkKCcubC1wbGFjZScpLmh0bWwoc2VsZi5wbEphZGUoKSk7XHJcblx0XHQvL3NlbGYubXlNYXA9bXlNYXA7XHJcblx0XHRzZWxmLnltYXBDZWF0ZVBhdGggPSB5TWFwQ3JlYXRlUGF0aDtcclxuXHRcdCQoJyNjbGVhci1wbGlzdC1idG4nKS5vbignY2xpY2snLCBzZWxmLnJlbW92ZUFsbCk7XHJcblx0XHQkKCcjY3JlYXRlLXBhdGgtYnRuJykub24oJ2NsaWNrJywgc2VsZi5jcmVhdGVQYXRoKTtcclxuXHRcdCQoJyNwcmludC1wYXRoLWJ0bicpLm9uKCdjbGljaycsIHNlbGYucGRmUGF0aCk7XHJcblxyXG5cdH07XHJcblxyXG5cdHRoaXMuYWRkRWxlbWVudCA9IGZ1bmN0aW9uKGRhdGEpIHtcclxuXHRcdCQoJyNwYXRoLWxpc3QnKS5hcHBlbmQoc2VsZi5lbEphZGUoe1xyXG5cdFx0XHRcImRhdGFcIjogZGF0YVxyXG5cdFx0fSkpO1xyXG5cdFx0c2VsZi5zZWxlY3RlZEVMLnB1c2goZGF0YSk7XHJcblx0XHQkKCdbZGF0YS1wby1pZD0nICsgZGF0YS5wb3N0YWxDb2RlICsgJ10nKS5jaGlsZHJlbignLnJlbW92ZS1wby1saXN0Jykub24oJ2NsaWNrJywge1xyXG5cdFx0XHRlbGVtZW50OiBkYXRhXHJcblx0XHR9LCBzZWxmLnJlbW92ZUVsZW1lbnQpO1xyXG5cdFx0c2VsZi5sb2FkRXZudERhdGEoZGF0YSk7XHJcblxyXG5cdH07XHJcblxyXG5cdHRoaXMubG9hZEV2bnREYXRhID0gZnVuY3Rpb24oX2RhdGEpIHtcclxuXHRcdHZhciByYXJyID0gW107XHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR0eXBlOiAnR0VUJyxcclxuXHRcdFx0dXJsOiBcIi4vdGVzdGV2ZW50Lmpzb25cIixcclxuXHRcdFx0ZGF0YVR5cGU6IFwianNvblwiLFxyXG5cdFx0XHRzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coJ3N1Y2Nlc3MgbG9hZCBkYXRhJyk7XHJcblx0XHRcdFx0cmFyciA9IGRhdGEuZmlsdGVyKGZ1bmN0aW9uKGV2bnQpIHtcclxuXHRcdFx0XHRcdGlmIChldm50LnBvc3RhbENvZGUgPT0gX2RhdGEucG9zdGFsQ29kZSkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRfZGF0YS5ldm50cyA9IHJhcnI7XHJcblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKHJhcnIpO1xyXG5cdFx0XHRcdFx0JCgnW2RhdGEtcG8taWQ9JyArIF9kYXRhLnBvc3RhbENvZGUgKyAnXScpLmZpbmQoJ2kuZmEtc3Bpbm5lcicpLnJlbW92ZSgpO1xyXG5cdFx0XHRcdFx0JCgnW2RhdGEtcG8taWQ9JyArIF9kYXRhLnBvc3RhbENvZGUgKyAnXScpLmFwcGVuZChzZWxmLm5lc3RlZExpc3RKYWRlKHtcclxuXHRcdFx0XHRcdFx0XCJkYXRhXCI6IHJhcnJcclxuXHRcdFx0XHRcdH0pKTtcclxuXHRcdFx0XHRcdC8vJCgnLmV2bnQtbGknKS5jaGlsZHJlbignLnNob3ctZXZudC1kZXRhaWwnKS5vbignY2xpY2snLHNlbGYuc2hvd0V2bnREZXRhaWwpO1xyXG5cdFx0XHRcdFx0Ly8kKCcuZXZudC1saScpLmNoaWxkcmVuKCcucmVtb3ZlLWV2bnQtbGlzdCcpLm9uKCdjbGljaycsc2VsZi5yZW1vdmVFdm50KTtcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHQvLyQoJ1tkYXRhLXBvLWlkPScrIF9kYXRhLnBvc3RhbENvZGUrJ10nKS5vbignY2xpY2snLHNlbGYuc2hvd0V2bnREZXRhaWwpO1xyXG5cdFx0XHRcdFx0JCgnW2RhdGEtcG8taWQ9JyArIF9kYXRhLnBvc3RhbENvZGUgKyAnXScpLm9uKCdjbGljaycsIHNlbGYubGlzdGVuRXZudCk7XHJcblx0XHRcdFx0fSwgLypNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwMCkqLyAxMCk7XHJcblx0XHRcdH0sXHJcblx0XHRcdGVycm9yOiBmdW5jdGlvbihlcnIpIHtcclxuXHRcdFx0XHQvL2NvbnNvbGUubG9nKGVycik7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHJcblx0fTtcclxuXHR0aGlzLmxpc3RlbkV2bnQgPSBmdW5jdGlvbihlKSB7XHJcblx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdHZhciB0eXBlID0gdHJ1ZTsgLy9kZWxldGVcclxuXHRcdGlmICgkKGUudGFyZ2V0KS5wYXJlbnQoKS5oYXNDbGFzcygnc2hvdy1ldm50LWRldGFpbCcpKVxyXG5cdFx0XHR0eXBlID0gZmFsc2U7IC8vJ3Nob3ctZGV0YWlsJztcclxuXHJcblx0XHR2YXIgb3AgPSAkKGUuY3VycmVudFRhcmdldCkuYXR0cignZGF0YS1wby1pZCcpO1xyXG5cdFx0dmFyIGV2bnRJZCA9ICQoZS50YXJnZXQpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2RhdGEtZXZudC1pZCcpO1xyXG5cdFx0Ly9jb25zb2xlLmxvZygkKGUudGFyZ2V0KS5wYXJlbnQoKS5oYXNDbGFzcygnc2hvdy1ldm50LWRldGFpbCcpKTtcclxuXHJcblxyXG5cdFx0Zm9yICh2YXIgaSA9IHNlbGYuc2VsZWN0ZWRFTC5sZW5ndGg7IGktLTspIHtcclxuXHRcdFx0aWYgKHNlbGYuc2VsZWN0ZWRFTFtpXS5wb3N0YWxDb2RlID09IG9wKSB7XHJcblx0XHRcdFx0Zm9yICh2YXIgaiA9IHNlbGYuc2VsZWN0ZWRFTFtpXS5ldm50cy5sZW5ndGg7IGotLTspIHtcclxuXHRcdFx0XHRcdGlmIChzZWxmLnNlbGVjdGVkRUxbaV0uZXZudHNbal0uX2lkID09IGV2bnRJZCkge1xyXG5cdFx0XHRcdFx0XHRpZiAodHlwZSkge1xyXG5cdFx0XHRcdFx0XHRcdHNlbGYuc2VsZWN0ZWRFTFtpXS5ldm50cy5zcGxpY2UoaiwgMSk7XHJcblx0XHRcdFx0XHRcdFx0JChlLnRhcmdldCkucGFyZW50KCkucGFyZW50KCkucmVtb3ZlKCk7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0dmFyIF9ldmVudCA9IHNlbGYuc2VsZWN0ZWRFTFtpXS5ldm50c1tqXTtcclxuXHRcdFx0XHRcdFx0XHQkKCcubW9kYWwtcGxhY2UnKS5odG1sKHNlbGYuZXZudERldGFpbEphZGUoKSk7XHJcblx0XHRcdFx0XHRcdFx0JChcIi5mbGF0cGlja3JcIikuZmxhdHBpY2tyKHtcclxuXHRcdFx0XHRcdFx0XHRcdGVuYWJsZVRpbWU6IHRydWUsXHJcblx0XHRcdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdCQoJyNtb2RhbCcpLm1vZGFsKCdzaG93Jyk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdC8vJCgnI2RhdGViZWdpbicpLnZhbChfZXZlbnQuc3RhcnQuZm9ybWF0KCdZWVlZLU1NLUREIGhoOm1tJykpO1xyXG5cdFx0XHRcdFx0XHRcdC8vJCgnI2RhdGVlbmQnKS52YWwoX2V2ZW50LmVuZC5mb3JtYXQoJ1lZWVktTU0tREQgaGg6bW0nKSk7XHJcblx0XHRcdFx0XHRcdFx0JCgnI2V2ZW50LXRpdGxlJykudmFsKF9ldmVudC50aXRsZSk7XHJcblx0XHRcdFx0XHRcdFx0JCgnI3Bvc3Rjb2RlJykudmFsKF9ldmVudC5wb3N0YWxDb2RlKTtcclxuXHRcdFx0XHRcdFx0XHQkKCcjc3RhdHVzJykudmFsKF9ldmVudC5zdGF0dXMpO1xyXG5cdFx0XHRcdFx0XHRcdCQoXCIjZGVzY3JpcHRpb25cIikudmFsKF9ldmVudC5kZXNjcmlwdGlvbik7XHJcblx0XHRcdFx0XHRcdFx0JCgnI2V4ZWN1dG9yJykudmFsKF9ldmVudC5leGVjdXRvcik7XHJcblxyXG5cdFx0XHRcdFx0XHRcdCQoJyNtb2RhbCcpLm9uKCdoaWRkZW4uYnMubW9kYWwnLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZygnbW9kYWwgaGlkZScpO1xyXG5cdFx0XHRcdFx0XHRcdFx0c2VsZi5kZXN0cm95TW9kYWwoKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0fTtcclxuXHR0aGlzLmRlc3Ryb3lNb2RhbCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdC8vJChcIiNzYXZlLWV2ZW50LWJ0blwiKS5vZmYoJ2NsaWNrJyk7XHJcblx0XHQkKCcjY2xvc2UtbW9kYWwtYnRuJykub2ZmKCdjbGljaycpO1xyXG5cdFx0JCgnI2Nsb3NlLW1vZGFsLWNyb3NzLWJ0bicpLm9mZignY2xpY2snKTtcclxuXHRcdC8vJCgnI2RlbGV0ZS1ldmVudC1idG4nKS5vZmYoKTtcclxuXHRcdCQoJy5tb2RhbC1wbGFjZScpLmh0bWwoJycpO1xyXG5cdH07XHJcblxyXG5cdHRoaXMucmVtb3ZlRWxlbWVudCA9IGZ1bmN0aW9uKGUpIHtcclxuXHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRmb3IgKHZhciBpID0gc2VsZi5zZWxlY3RlZEVMLmxlbmd0aDsgaS0tOykge1xyXG5cdFx0XHRpZiAoc2VsZi5zZWxlY3RlZEVMW2ldLnBvc3RhbENvZGUgPT0gZS5kYXRhLmVsZW1lbnQucG9zdGFsQ29kZSkge1xyXG5cdFx0XHRcdCQoZS5jdXJyZW50VGFyZ2V0KS5vZmYoKTtcclxuXHRcdFx0XHQkKGUuY3VycmVudFRhcmdldCkucGFyZW50KCkucmVtb3ZlKCk7XHJcblx0XHRcdFx0Ly8kKCdbZGF0YS1ldm50LWlkPScrZS5kYXRhLmVsZW1lbnQucG9zdGFsQ29kZSsnXScpLm9mZigpO1xyXG5cdFx0XHRcdC8vJCgnW2RhdGEtZXZudC1pZD0nK2UuZGF0YS5lbGVtZW50LnBvc3RhbENvZGUrJ10nKS5yZW1vdmUoKTtcclxuXHRcdFx0XHRzZWxmLnNlbGVjdGVkRUwuc3BsaWNlKGksIDEpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdH07XHJcblx0dGhpcy5yZW1vdmVBbGwgPSBmdW5jdGlvbihlKSB7XHJcblx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0JCgnI3BhdGgtbGlzdCcpLmh0bWwoJycpO1xyXG5cdFx0c2VsZi5zZWxlY3RlZEVMID0gW107XHJcblx0fTtcclxuXHJcblx0dGhpcy5jcmVhdGVQYXRoID0gZnVuY3Rpb24oKSB7XHJcblx0XHRzZWxmLnltYXBDZWF0ZVBhdGgoc2VsZi5zZWxlY3RlZEVMKTtcclxuXHR9O1xyXG5cclxuXHR0aGlzLnBkZlBhdGggPSBmdW5jdGlvbigpIHtcclxuXHRcdHZhciBkb2NEZWZpbml0aW9uID0gc2VsZi5jcmVhdGVDb250ZW50KCk7XHJcblx0XHQvL3ZhciBkb2NEZWZpbml0aW9uID0gc2VsZi5wZGZKYWRlKHtcImRhdGFcIjpzZWxmLnNlbGVjdGVkRUx9KTtcclxuXHRcdHBkZk1ha2UuY3JlYXRlUGRmKGRvY0RlZmluaXRpb24pLm9wZW4oKTtcclxuXHR9O1xyXG5cclxuXHR0aGlzLmNyZWF0ZUNvbnRlbnQgPSBmdW5jdGlvbigpIHtcclxuXHRcdHZhciB1bGFyciA9IFtdO1xyXG5cdFx0c2VsZi5zZWxlY3RlZEVMLmZvckVhY2goZnVuY3Rpb24ocG8pIHtcclxuXHRcdFx0dWxhcnIucHVzaCh7XHJcblx0XHRcdFx0dGV4dDogcG8ucG9zdGFsQ29kZVxyXG5cdFx0XHR9KVxyXG5cdFx0XHRpZiAocG8uZXZudHMubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdHZhciBzdWxhcnIgPSBbXTtcclxuXHRcdFx0XHRwby5ldm50cy5mb3JFYWNoKGZ1bmN0aW9uKGV2bikge1xyXG5cdFx0XHRcdFx0c3VsYXJyLnB1c2goe1xyXG5cdFx0XHRcdFx0XHR0ZXh0OiBldm4udGl0bGVcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdHVsYXJyLnB1c2goe1xyXG5cdFx0XHRcdFx0dWw6IHN1bGFyclxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdHZhciBjb2JqID0ge1xyXG5cdFx0XHRjb250ZW50OiBbe1xyXG5cdFx0XHRcdHRleHQ6ICfQm9C40YHRgi3RgdC/0LjRgdC+0Log0LfQsNGP0LLQvtC6INC6INC40YHQv9C+0LvQvdC10L3QuNGOICjRhNC+0YDQvNCwIOKEljHQu9GBKScsXHJcblx0XHRcdFx0c3R5bGU6ICdoZWFkZXInXHJcblx0XHRcdH0sIHtcclxuXHRcdFx0XHR1bDogdWxhcnIsXHJcblx0XHRcdFx0c3R5bGU6ICdsaXN0cydcclxuXHRcdFx0fV0sXHJcblx0XHRcdHN0eWxlczoge1xyXG5cdFx0XHRcdGhlYWRlcjoge1xyXG5cdFx0XHRcdFx0Zm9udFNpemU6IDE2LFxyXG5cdFx0XHRcdFx0Ym9sZDogdHJ1ZVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0bGlzdHM6IHtcclxuXHRcdFx0XHRcdHBhZGRpbmc6IFwiMTVweFwiLFxyXG5cdFx0XHRcdFx0Zm9udFNpemU6IDE0XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdFx0cmV0dXJuIGNvYmo7XHJcblx0fTtcclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2pzL2Rldi9wbS9tb2R1bGUvcGF0aExpc3QuanNcbi8vIG1vZHVsZSBpZCA9IDEzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJDOlxcXFxfdGVtcFxcXFxwY2h0XFxcXG5vZGVfbW9kdWxlc1xcXFxqYWRlXFxcXGxpYlxcXFxydW50aW1lLmpzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwiY2FyZFxcXCI+PGRpdiBjbGFzcz1cXFwiY2FyZC1oZWFkZXJcXFwiPjx1bCBjbGFzcz1cXFwibmF2IG5hdi1waWxscyBjYXJkLWhlYWRlci1waWxscyBmbG9hdC14cy1sZWZ0XFxcIj48bGkgY2xhc3M9XFxcIm5hdi1pdGVtXFxcIj48YSBpZD1cXFwiY2xlYXItcGxpc3QtYnRuXFxcIiBocmVmPVxcXCIjXFxcIiBjbGFzcz1cXFwibmF2LWxpbmtcXFwiPtCe0YfQuNGB0YLQuNGC0Yw8L2E+PC9saT48L3VsPjwvZGl2PjxkaXYgY2xhc3M9XFxcImNhcmQtYmxvY2tcXFwiPjxoNCBjbGFzcz1cXFwiY2FyZC10aXRsZVxcXCI+IDwvaDQ+PGRpdiBjbGFzcz1cXFwiY2FyZC10ZXh0XFxcIj48aDQ+0KHQv9C40YHQvtC6XFx0PHVsIGlkPVxcXCJwYXRoLWxpc3RcXFwiIGNsYXNzPVxcXCJsaXN0LWdyb3VwXFxcIj48L3VsPjwvaDQ+PC9kaXY+PCEtLWlucHV0I2V4ZWNlbWFpbC5mb3JtLWNvbnRyb2wodHlwZT0nZW1haWwnKS0tPjxhIGlkPVxcXCJjcmVhdGUtcGF0aC1idG5cXFwiIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJidG4gYnRuLXByaW1hcnlcXFwiPtGB0L7Qt9C00LDRgtGMINC80LDRgNGI0YDRg9GCPC9hPjwvZGl2PjxkaXYgY2xhc3M9XFxcImNhcmQtZm9vdGVyIHRleHQtbXV0ZWRcXFwiPjxhIGlkPVxcXCJwcmludC1wYXRoLWJ0blxcXCIgaHJlZj1cXFwiI1xcXCIgY2xhc3M9XFxcImJ0biBidG4tcHJpbWFyeVxcXCI+0L/QtdGH0LDRgtCw0YLRjDwvYT48YSBpZD1cXFwib3RoZXItcGF0aC1idG5cXFwiIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJidG4gYnRuLWRlZmF1bHRcXFwiPtC10YnQtSDRh9C10LPQvi3RgtC+PC9hPjwvZGl2PjwvZGl2PlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2pzL2Rldi9wbS92aWV3L3BhdGhMaXN0LmphZGVcbi8vIG1vZHVsZSBpZCA9IDEzMlxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJDOlxcXFxfdGVtcFxcXFxwY2h0XFxcXG5vZGVfbW9kdWxlc1xcXFxqYWRlXFxcXGxpYlxcXFxydW50aW1lLmpzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAoZGF0YSkge1xuYnVmLnB1c2goXCI8bGlcIiArIChqYWRlLmF0dHIoXCJkYXRhLXBvLWlkXCIsICcnICsgKGRhdGEucG9zdGFsQ29kZSkgKyAnJywgdHJ1ZSwgdHJ1ZSkpICsgXCIgY2xhc3M9XFxcImxpc3QtZ3JvdXAtaXRlbSBsaXN0LWdyb3VwLWl0ZW0tYWN0aW9uXFxcIj5cIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBkYXRhLnBvc3RhbENvZGUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIjxhIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJyZW1vdmUtcG8tbGlzdFxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLXRyYXNoLW8gZmEtZndcXFwiPjwvaT48L2E+PGkgc3R5bGU9XFxcImZsb2F0OmxlZnRcXFwiIGNsYXNzPVxcXCJmYSBmYS1zcGlubmVyIGZhLXB1bHNlIGZhLWZ3XFxcIj48L2k+PC9saT5cIik7fS5jYWxsKHRoaXMsXCJkYXRhXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5kYXRhOnR5cGVvZiBkYXRhIT09XCJ1bmRlZmluZWRcIj9kYXRhOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvanMvZGV2L3BtL3ZpZXcvbGlzdEVsLmphZGVcbi8vIG1vZHVsZSBpZCA9IDEzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJDOlxcXFxfdGVtcFxcXFxwY2h0XFxcXG5vZGVfbW9kdWxlc1xcXFxqYWRlXFxcXGxpYlxcXFxydW50aW1lLmpzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAoZGF0YSwgdW5kZWZpbmVkKSB7XG5idWYucHVzaChcIjx1bD5cIik7XG4vLyBpdGVyYXRlIGRhdGFcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gZGF0YTtcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGV2bnQgPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIjxsaVwiICsgKGphZGUuYXR0cihcImRhdGEtZXZudC1pZFwiLCAnJyArIChldm50Ll9pZCkgKyAnJywgdHJ1ZSwgdHJ1ZSkpICsgXCIgY2xhc3M9XFxcImV2bnQtbGlcXFwiPlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IGV2bnQudGl0bGUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIjxhIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJzaG93LWV2bnQtZGV0YWlsXFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtc2VhcmNoIGZhLWZ3XFxcIj48L2k+PC9hPjxhIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJyZW1vdmUtZXZudC1saXN0XFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtdHJhc2gtbyBmYS1md1xcXCI+PC9pPjwvYT48L2xpPlwiKTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBldm50ID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8bGlcIiArIChqYWRlLmF0dHIoXCJkYXRhLWV2bnQtaWRcIiwgJycgKyAoZXZudC5faWQpICsgJycsIHRydWUsIHRydWUpKSArIFwiIGNsYXNzPVxcXCJldm50LWxpXFxcIj5cIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBldm50LnRpdGxlKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCI8YSBocmVmPVxcXCIjXFxcIiBjbGFzcz1cXFwic2hvdy1ldm50LWRldGFpbFxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLXNlYXJjaCBmYS1md1xcXCI+PC9pPjwvYT48YSBocmVmPVxcXCIjXFxcIiBjbGFzcz1cXFwicmVtb3ZlLWV2bnQtbGlzdFxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLXRyYXNoLW8gZmEtZndcXFwiPjwvaT48L2E+PC9saT5cIik7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbmJ1Zi5wdXNoKFwiPC91bD5cIik7fS5jYWxsKHRoaXMsXCJkYXRhXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5kYXRhOnR5cGVvZiBkYXRhIT09XCJ1bmRlZmluZWRcIj9kYXRhOnVuZGVmaW5lZCxcInVuZGVmaW5lZFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgudW5kZWZpbmVkOnR5cGVvZiB1bmRlZmluZWQhPT1cInVuZGVmaW5lZFwiP3VuZGVmaW5lZDp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2pzL2Rldi9wbS92aWV3L3N1Ymxpc3QuamFkZVxuLy8gbW9kdWxlIGlkID0gMTM0XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsInZhciBqYWRlID0gcmVxdWlyZShcIkM6XFxcXF90ZW1wXFxcXHBjaHRcXFxcbm9kZV9tb2R1bGVzXFxcXGphZGVcXFxcbGliXFxcXHJ1bnRpbWUuanNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChkYXRhLCB1bmRlZmluZWQpIHtcbi8vIGl0ZXJhdGUgZGF0YVxuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSBkYXRhO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIgcG8gPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IHBvLnBvc3RhbENvZGUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIiBcXFxcYnJcIik7XG5pZiAocG8uZXZudHMubGVuZ3RoPjApXG57XG4vLyBpdGVyYXRlIHBvLmV2bnRzXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IHBvLmV2bnRzO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIgZXZudCA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiXCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gZXZudC50aXRsZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiIFxcXFxiclwiKTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBldm50ID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCJcIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBldm50LnRpdGxlKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCIgXFxcXGJyXCIpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG59XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIgcG8gPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IHBvLnBvc3RhbENvZGUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIiBcXFxcYnJcIik7XG5pZiAocG8uZXZudHMubGVuZ3RoPjApXG57XG4vLyBpdGVyYXRlIHBvLmV2bnRzXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IHBvLmV2bnRzO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIgZXZudCA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiXCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gZXZudC50aXRsZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiIFxcXFxiclwiKTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBldm50ID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCJcIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBldm50LnRpdGxlKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCIgXFxcXGJyXCIpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG59XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG59LmNhbGwodGhpcyxcImRhdGFcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmRhdGE6dHlwZW9mIGRhdGEhPT1cInVuZGVmaW5lZFwiP2RhdGE6dW5kZWZpbmVkLFwidW5kZWZpbmVkXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC51bmRlZmluZWQ6dHlwZW9mIHVuZGVmaW5lZCE9PVwidW5kZWZpbmVkXCI/dW5kZWZpbmVkOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvanMvZGV2L3BtL3ZpZXcvcGRmUGF0aExpc3QuamFkZVxuLy8gbW9kdWxlIGlkID0gMTM1XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcblxyXG5cdHRoaXMuX21vZGFsID0gcmVxdWlyZSgnLi4vdmlldy9uZXdFdmVudC5qYWRlJyk7XHJcblxyXG5cdHRoaXMuZGVzdHJveU1vZGFsID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcclxuXHRcdCQoXCIjc2F2ZS1ldmVudC1idG5cIikub2ZmKCdjbGljaycpO1xyXG5cdFx0JCgnI2Nsb3NlLW1vZGFsLWJ0bicpLm9mZignY2xpY2snKTtcclxuXHRcdCQoJyNjbG9zZS1tb2RhbC1jcm9zcy1idG4nKS5vZmYoJ2NsaWNrJyk7XHJcblx0XHQkKCcubW9kYWwtcGxhY2UnKS5odG1sKCcnKTtcclxuXHR9O1xyXG5cclxuXHR2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG5cdHRoaXMuaW5pdCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdCQoJy5tb2RhbC1wbGFjZScpLmh0bWwodGhpcy5fbW9kYWwoKSk7XHJcblx0XHQkKFwiLmZsYXRwaWNrclwiKS5mbGF0cGlja3Ioe1xyXG5cdFx0XHRlbmFibGVUaW1lOiB0cnVlLFxyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChcIiNzYXZlLWV2ZW50LWJ0blwiKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdHZhciBldm50ID0ge1xyXG5cdFx0XHRcdHRpdGxlOiAkKCcjZXZlbnQtdGl0bGUnKS52YWwoKSxcclxuXHRcdFx0XHRzdGFydDogbW9tZW50KCQoJyNkYXRlYmVnaW4nKS52YWwoKSksXHJcblx0XHRcdFx0ZW5kOiBtb21lbnQoJCgnI2RhdGVlbmQnKS52YWwoKSksXHJcblx0XHRcdFx0cG9zdGFsQ29kZTogJCgnI3Bvc3Rjb2RlJykudmFsKCksXHJcblx0XHRcdFx0c3RhdHVzOiAkKCcjc3RhdHVzJykudmFsKCksXHJcblx0XHRcdFx0ZGVzY3JpcHRpb246ICQoXCIjZGVzY3JpcHRpb25cIikudmFsKCksXHJcblx0XHRcdFx0ZXhlY3V0b3I6ICQoJyNleGVjdXRvcicpLnZhbCgpXHJcblx0XHRcdH07XHJcblx0XHRcdGNvbnNvbGUubG9nKFwiYWRkIGV2ZW50XCIpO1xyXG5cdFx0XHQvLyQoJyNjYWxlbmRhcicpLmZ1bGxDYWxlbmRhcigncmVuZGVyRXZlbnQnLCBldm50LCB0cnVlKTtcclxuXHJcblx0XHRcdCQuYWpheCh7XHJcblx0XHRcdFx0dHlwZTogJ1BPU1QnLFxyXG5cdFx0XHRcdHVybDogJy91c2Vycy9zYXZlJyxcclxuXHRcdFx0XHRkYXRhOiBKU09OLnN0cmluZ2lmeShldm50KSxcclxuXHRcdFx0XHRkYXRhVHlwZTogXCJqc29uXCIsXHJcblx0XHRcdFx0Y29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG5cdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiZGF0YSBzYXZlXCIpO1xyXG5cdFx0XHRcdFx0dmFyIGV2bnRBcnJheSA9ICQoJyNjYWxlbmRhcicpLmZ1bGxDYWxlbmRhcignY2xpZW50RXZlbnRzJyk7XHJcblx0XHRcdFx0XHR2YXIgX2V2bnQgPSBldm50QXJyYXlbZXZudEFycmF5Lmxlbmd0aCAtIDFdO1xyXG5cdFx0XHRcdFx0X2V2bnQuX2lkID0gZGF0YS5pbnNlcnRlZGlkO1xyXG5cclxuXHRcdFx0XHRcdCQoJyNjYWxlbmRhcicpLmZ1bGxDYWxlbmRhcigndXBkYXRlRXZlbnQnLCBfZXZudCk7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHQvL2Vycm9yOiBhamF4RXJyb3JcclxuXHRcdFx0fSk7XHJcblxyXG5cclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoJyNjbG9zZS1tb2RhbC1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblxyXG5cdFx0fSk7XHJcblxyXG5cdFx0JCgnI2Nsb3NlLW1vZGFsLWNyb3NzLWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcblx0XHR9KTtcclxuXHJcblx0XHQkKCcjbW9kYWwnKS5tb2RhbCgnc2hvdycpO1xyXG5cclxuXHRcdC8vJCgnI2RhdGViZWdpbicpLnZhbChzdGFydC5mb3JtYXQoJ1lZWVktTU0tREQgaGg6bW0nKSk7XHJcblx0XHQvLyQoJyNkYXRlZW5kJykudmFsKGVuZC5mb3JtYXQoJ1lZWVktTU0tREQgaGg6bW0nKSk7XHJcblxyXG5cdFx0JCgnI21vZGFsJykub24oJ2hpZGRlbi5icy5tb2RhbCcsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0Y29uc29sZS5sb2coJ21vZGFsIGhpZGUnKTtcclxuXHRcdFx0c2VsZi5kZXN0cm95TW9kYWwoKTtcclxuXHRcdH0pO1xyXG5cclxuXHR9O1xyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvanMvZGV2L3BtL21vZHVsZS9uZXdFdmVudC5qc1xuLy8gbW9kdWxlIGlkID0gMTM2XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsInZhciBqYWRlID0gcmVxdWlyZShcIkM6XFxcXF90ZW1wXFxcXHBjaHRcXFxcbm9kZV9tb2R1bGVzXFxcXGphZGVcXFxcbGliXFxcXHJ1bnRpbWUuanNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8ZGl2IGlkPVxcXCJtb2RhbFxcXCIgdGFiaW5kZXg9XFxcIi0xXFxcIiByb2xlPVxcXCJkaWFsb2dcXFwiIGFyaWEtbGFiZWxsZWRieT1cXFwibXlNb2RhbExhYmVsXFxcIiBhcmlhLWhpZGRlbj1cXFwidHJ1ZVxcXCIgY2xhc3M9XFxcIm1vZGFsIGZhZGVcXFwiPjxkaXYgcm9sZT1cXFwiZG9jdW1lbnRcXFwiIGNsYXNzPVxcXCJtb2RhbC1kaWFsb2dcXFwiPjxkaXYgY2xhc3M9XFxcIm1vZGFsLWNvbnRlbnRcXFwiPjxkaXYgY2xhc3M9XFxcIm1vZGFsLWhlYWRlclxcXCI+PGJ1dHRvbiBpZD1cXFwiY2xvc2UtbW9kYWwtY3Jvc3MtYnRuXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGRhdGEtZGlzbWlzcz1cXFwibW9kYWxcXFwiIGFyaWEtbGFiZWw9XFxcIkNsb3NlXFxcIiBjbGFzcz1cXFwiY2xvc2VcXFwiPjxzcGFuIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIj7Dlzwvc3Bhbj48L2J1dHRvbj48aDQgaWQ9XFxcIm15TW9kYWxMYWJlbFxcXCIgY2xhc3M9XFxcIm1vZGFsLXRpdGxlXFxcIj7QodC+0LfQtNCw0L3QuNC1PC9oND48L2Rpdj48ZGl2IGNsYXNzPVxcXCJtb2RhbC1ib2R5XFxcIj48Zm9ybSBhY3Rpb249XFxcIlxcXCI+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7Qt9Cw0LPQvtC70L7QstC+0Lo8L2xhYmVsPjxpbnB1dCBpZD1cXFwiZXZlbnQtdGl0bGVcXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0L3QsNGH0LDQu9C+PC9sYWJlbD48aW5wdXQgaWQ9XFxcImRhdGViZWdpblxcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbCBmbGF0cGlja3JcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0L7QutC+0L3Rh9Cw0L3QuNC1PC9sYWJlbD48aW5wdXQgaWQ9XFxcImRhdGVlbmRcXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2wgZmxhdHBpY2tyXFxcIj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj48bGFiZWwgZm9yPVxcXCJcXFwiPtC+0YLQtNC10LvQtdC90LjQtSDQv9C+0LvRg9GH0LDRgtC10LvRjDwvbGFiZWw+PGlucHV0IGlkPVxcXCJwb3N0Y29kZVxcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7QvtC/0LjRgdCw0L3QuNC1PC9sYWJlbD48aW5wdXQgaWQ9XFxcImRlc2NyaXB0aW9uXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj48bGFiZWwgZm9yPVxcXCJcXFwiPtGB0YLQsNGC0YPRgTwvbGFiZWw+PGlucHV0IGlkPVxcXCJzdGF0dXNcXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0LjRgdC/0L7Qu9C90LjRgtC10LvRjDwvbGFiZWw+PGlucHV0IGlkPVxcXCJleGVjdXRvclxcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+PC9kaXY+PC9mb3JtPjwvZGl2PjxkaXYgY2xhc3M9XFxcIm1vZGFsLWZvb3RlclxcXCI+PGJ1dHRvbiBpZD1cXFwiY2xvc2UtbW9kYWwtYnRuXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGRhdGEtZGlzbWlzcz1cXFwibW9kYWxcXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+Q2xvc2U8L2J1dHRvbj48YnV0dG9uIGlkPVxcXCJzYXZlLWV2ZW50LWJ0blxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1wcmltYXJ5XFxcIj5TYXZlIGNoYW5nZXM8L2J1dHRvbj48L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy9qcy9kZXYvcG0vdmlldy9uZXdFdmVudC5qYWRlXG4vLyBtb2R1bGUgaWQgPSAxMzdcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIGphZGUgPSByZXF1aXJlKFwiQzpcXFxcX3RlbXBcXFxccGNodFxcXFxub2RlX21vZHVsZXNcXFxcamFkZVxcXFxsaWJcXFxccnVudGltZS5qc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIjxkaXYgaWQ9XFxcIm1vZGFsXFxcIiB0YWJpbmRleD1cXFwiLTFcXFwiIHJvbGU9XFxcImRpYWxvZ1xcXCIgYXJpYS1sYWJlbGxlZGJ5PVxcXCJteU1vZGFsTGFiZWxcXFwiIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIiBjbGFzcz1cXFwibW9kYWwgZmFkZVxcXCI+PGRpdiByb2xlPVxcXCJkb2N1bWVudFxcXCIgY2xhc3M9XFxcIm1vZGFsLWRpYWxvZ1xcXCI+PGRpdiBjbGFzcz1cXFwibW9kYWwtY29udGVudFxcXCI+PGRpdiBjbGFzcz1cXFwibW9kYWwtaGVhZGVyXFxcIj48YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgZGF0YS1kaXNtaXNzPVxcXCJtb2RhbFxcXCIgYXJpYS1sYWJlbD1cXFwiQ2xvc2VcXFwiIGNsYXNzPVxcXCJjbG9zZVxcXCI+PHNwYW4gYXJpYS1oaWRkZW49XFxcInRydWVcXFwiPsOXPC9zcGFuPjwvYnV0dG9uPjxoNCBpZD1cXFwibXlNb2RhbExhYmVsXFxcIiBjbGFzcz1cXFwibW9kYWwtdGl0bGVcXFwiPtCg0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40LUv0YPQtNCw0LvQtdC90LjQtTwvaDQ+PC9kaXY+PGRpdiBjbGFzcz1cXFwibW9kYWwtYm9keVxcXCI+PGZvcm0gYWN0aW9uPVxcXCJcXFwiPjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0LfQsNCz0L7Qu9C+0LLQvtC6PC9sYWJlbD48aW5wdXQgaWQ9XFxcImV2ZW50LXRpdGxlXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj48bGFiZWwgZm9yPVxcXCJcXFwiPtC90LDRh9Cw0LvQvjwvbGFiZWw+PGlucHV0IGlkPVxcXCJkYXRlYmVnaW5cXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2wgZmxhdHBpY2tyXFxcIj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj48bGFiZWwgZm9yPVxcXCJcXFwiPtC+0LrQvtC90YfQsNC90LjQtTwvbGFiZWw+PGlucHV0IGlkPVxcXCJkYXRlZW5kXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sIGZsYXRwaWNrclxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7QvtGC0LTQtdC70LXQvdC40LUg0L/QvtC70YPRh9Cw0YLQtdC70Yw8L2xhYmVsPjxpbnB1dCBpZD1cXFwicG9zdGNvZGVcXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0L7Qv9C40YHQsNC90LjQtTwvbGFiZWw+PGlucHV0IGlkPVxcXCJkZXNjcmlwdGlvblxcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7RgdGC0LDRgtGD0YE8L2xhYmVsPjxpbnB1dCBpZD1cXFwic3RhdHVzXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj48bGFiZWwgZm9yPVxcXCJcXFwiPtC40YHQv9C+0LvQvdC40YLQtdC70Yw8L2xhYmVsPjxpbnB1dCBpZD1cXFwiZXhlY3V0b3JcXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiPjwvZGl2PjwvZm9ybT48L2Rpdj48ZGl2IGNsYXNzPVxcXCJtb2RhbC1mb290ZXJcXFwiPjxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBkYXRhLWRpc21pc3M9XFxcIm1vZGFsXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPkNsb3NlPC9idXR0b24+PCEtLWJ1dHRvbiNzYXZlLWV2ZW50LWJ0bi5idG4uYnRuLXByaW1hcnkodHlwZT0nYnV0dG9uJykgU2F2ZSBjaGFuZ2VzLS0+PCEtLWJ1dHRvbiNkZWxldGUtZXZlbnQtYnRuLmJ0bi5idG4tZGFuZ2VyKHR5cGU9J2J1dHRvbicpIERlbGV0ZS0tPjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2PlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2pzL2Rldi9wbS92aWV3L2VkaXRkZWxFdmVudC5qYWRlXG4vLyBtb2R1bGUgaWQgPSAyNTRcbi8vIG1vZHVsZSBjaHVua3MgPSAxIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN2R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDcE1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQy9FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDNUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OzsiLCJzb3VyY2VSb290IjoiIn0=