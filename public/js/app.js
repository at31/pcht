webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	//module.exports = function() {
	console.log('hi pcht');

	$(document).ready(function() {	

		$(".flatpickr").flatpickr({
			enableTime: true,
		});

		var myMap=__webpack_require__(2);

		ymaps.ready(init);


		function init() {
			
			myMap();
			$('#map-load-link').on('click',function(e){
				$('.c-place').html('<div id="mapy" style="width: 100%; height: 800px"></div>');
				myMap();
			});

		}


		$.ajax({
			type: 'GET',
			url: "/users",
			dataType: "json",
			success: function(data) {
				calendarInit(data);
			},
			//error: loadError
		});


		function calendarInit(_events) {

			var _newEventModal = __webpack_require__(7);
			var _newModal = new _newEventModal();
			var _editEventModal = __webpack_require__(120);
			var _editModal = new _editEventModal();

			$('#calendar').fullCalendar({
				header: {
					left: 'prev,next today',
					center: 'title',
					right: 'month,agendaWeek,agendaDay'
				},
				selectable: true,
				selectHelper: true,
				editable: true,

				select: function(start, end, jsEvent, view) {

					_newModal.init(start, end);

				},
				eventClick: function(event, jsEvent, view) {

					_editModal.init(event);

				},
				eventAfterRender: function(event, element, view) {

					console.log('e a r');

				},
				eventAfterAllRender: function(view) {

					console.log('e a a r');
				},
				defaultView: 'month',
				editable: true,
				events: _events
			});

			var listmod = __webpack_require__(122);
			var _listmod=new listmod();
			_listmod.init();
			
		}



	});

	//}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 2:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	module.exports = function() {

		var _save = true;
		var _event, _postOfficeArr;

		var myMap = new ymaps.Map("mapy", {
			center: [50.59, 36.58],
			zoom: 10
		}, {
			buttonMaxWidth: 150
		});

		
		$.ajax({
			type: 'GET',
			url: "./postals.json",
			dataType: "json",
			success: function(data) {

				_postOfficeArr = data;
				var myCollection = new ymaps.GeoObjectCollection();

				var poDtl = __webpack_require__(3);
				var myBalloonContentBodyLayout = ymaps.templateLayoutFactory.createClass(
					'<p>$[properties.data.postalCode]</p><p>$[properties.data.addressSource]</p><p>$[properties.data.typeCode]</p><br /><button id="show-po-detail-btn">Подробно</button>', {
						build: function() {
							myBalloonContentBodyLayout.superclass.build.call(this);
							$('#show-po-detail-btn').on('click', {
								"po": this._data.properties._data
							}, this.onShowPODetailClick);
						},
						clear: function() {
							$('#show-po-detail-btn').off('click', this.onShowPODetailClick);
							myBalloonContentBodyLayout.superclass.clear.call(this);
						},
						onShowPODetailClick: function(e) {
							poDtl(e.data.po.data, myMap);
						}
					});

				data.forEach(function(otd) {
					//console.log(otd.latitude);

					var pmark = new ymaps.Placemark([otd.latitude, otd.longitude],
						/*{
							hintContent: otd.postalCode,
							balloonContent: "<p>"+otd.postalCode+"</p><p>"
							+otd.addressSource+"</p><p>"
							+otd.typeCode+
							"</p><a href='#' class='btn btn-primary' id='post-detail' data-postalcode='"+otd.postalCode+"'>Подробнее</a>"
						}*/
						{
							data: otd,
							iconContent: otd.postalCode,
							iconCaption: otd.postalCode
						}, {
							balloonContentLayout: myBalloonContentBodyLayout,
							preset: 'islands#blackStretchyIcon'
						}
					);
					//myMap.geoObjects.add(pmark);
					myCollection.add(pmark);
				});

				/*$('.post-detail').click(function(e){
					console.log('click clack');
					var pcode=$(e.currentTarget).attr('data-postalcode');
					_postOfficeArr.forEach(function(otd){
						if(otd.postalCode===pcode){
							var tpl=require('./view/postOfficeDetail.jade');
							$('.pod-place').html(tpl({"data":otd}));
						}
					});
				});*/

				myMap.geoObjects.add(myCollection);



				$('#map-create-path').click(function(e){
					myCollection.removeAll();
				

				var robj=data.map(function(otd){
					return {type:'wayPoint',point:[otd.latitude, otd.longitude]};
				});
				console.log("++++++++++++++++++++++++++++================================+++++++++++++++++");
				console.log(robj);
				var ro=[robj[0],robj[10],robj[22]];
				console.log("++++++++++++++++++++++++++++================================+++++++++++++++++");
				console.log(ro);
				ymaps.route(ro).then(
					function(route) {
						myMap.geoObjects.add(route);
					},
					function(error) {
						alert("Возникла ошибка: " + error.message);
					}
				);
			});	

			},
			//error: loadError
		});
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 3:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use srtict';

	module.exports=function(data,myMap){



		var tpl = __webpack_require__(4);
		$('.pod-place').html(tpl({"data": data}));

		$('.show-net').on('click',function(e){

			myMap.destroy();

			$('.c-place').html('<div id="cy">cy!</div>');

			var cy = cytoscape({
	  container: $('#cy'),
	   
	});

	var elements = {
	        nodes: [
	          { data: { id: 'n1', name: 'n1', size: 50},
	            position: {x: 0, y: 0} },
	          { data: { id: 'n2', name: 'n2', size: 50},
	           position: {x: 100, y: 100} },
	          { data: { id: 'n3', name: 'n3', size: 50},
	           position: {x: 0, y: 100} },
	        ],
	        edges: [
	          { data: { source: 'n1', target: 'n2' } }
	        ]
	      };
	      cy.add(elements);
	      cy.layout({
	      	name: 'grid'   
	      });

	     cy.on('tap', function(evt){
	  console.log( 'tap ' + evt.cyTarget.id() );
	}); 		
		//console.log(cy);
			/*$('#cy').cytoscape({
	  ready: function(){
	      var cy = this;
	      var elements = {
	        nodes: [
	          { data: { id: 'n1', name: 'n1', size: 50},
	            position: {x: 0, y: 0} },
	          { data: { id: 'n2', name: 'n2', size: 50},
	           position: {x: 100, y: 100} },
	          { data: { id: 'n3', name: 'n3', size: 50},
	           position: {x: 0, y: 100} },
	        ],
	        edges: [
	          { data: { source: 'n1', target: 'n2' } }
	        ]
	      };
	      
	      // Add all nodes and edges
	      cy.add(elements);

	      // Lock node 1 to its initial position, (0,0)
	      cy.nodes('#n1').lock();

	      // Disable web workers to be able to use jsFiddle
	      window.Worker = undefined;

	      // The generated layout won't lock node 1 to its position
	      cy.layout({
	        fit: false,
	      	name: 'arbor'   
	      });
	      
	      console.log(cy.$('#n1').position(),
	                  cy.$('#n2').position(),
	                  cy.$('#n3').position());
	  }
	});*/
		});
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 4:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(5);

	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	;var locals_for_with = (locals || {});(function (data, undefined) {
	buf.push("<div class=\"card\"><h3 class=\"card-header\">" + (jade.escape((jade_interp = data.postalCode) == null ? '' : jade_interp)) + "</h3><div class=\"card-block\"><h4 class=\"card-title\">" + (jade.escape((jade_interp = data.postalCode) == null ? '' : jade_interp)) + " " + (jade.escape((jade_interp = data.settlement) == null ? '' : jade_interp)) + " " + (jade.escape((jade_interp = data.addressSource) == null ? '' : jade_interp)) + "</h4><div class=\"card-text\"><h4>Предоставляемые услуги</h4><ul></ul>");
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

	buf.push("</div><a href=\"#\" class=\"btn btn-primary show-net\">show me the Net in tha place</a></div></div>");}.call(this,"data" in locals_for_with?locals_for_with.data:typeof data!=="undefined"?data:undefined,"undefined" in locals_for_with?locals_for_with.undefined: false?undefined:undefined));;return buf.join("");
	}

/***/ },

/***/ 7:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, moment) {'use strict';

	module.exports = function() {

		this._modal = __webpack_require__(119);

		this.destroyModal = function() {
			
			$("#save-event-btn").off('click');
			$('#close-modal-btn').off('click');
			$('#close-modal-cross-btn').off('click');
			$('.modal-place').html('');
		};

		var self = this;

		this.init = function(start, end) {

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
				$('#calendar').fullCalendar('renderEvent', evnt, true);

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

			$('#datebegin').val(start.format('YYYY-MM-DD hh:mm'));
			$('#dateend').val(end.format('YYYY-MM-DD hh:mm'));

			$('#modal').on('hidden.bs.modal', function(e) {
				console.log('modal hide');
				self.destroyModal();
			});

		};
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(8)))

/***/ },

/***/ 119:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(5);

	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;

	buf.push("<div id=\"modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\" class=\"modal fade\"><div role=\"document\" class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button id=\"close-modal-cross-btn\" type=\"button\" data-dismiss=\"modal\" aria-label=\"Close\" class=\"close\"><span aria-hidden=\"true\">×</span></button><h4 id=\"myModalLabel\" class=\"modal-title\">Создание</h4></div><div class=\"modal-body\"><form action=\"\"><div class=\"form-group\"><label for=\"\">заголовок</label><input id=\"event-title\" type=\"text\" class=\"form-control\"></div><div class=\"form-group\"><label for=\"\">начало</label><input id=\"datebegin\" type=\"text\" class=\"form-control flatpickr\"></div><div class=\"form-group\"><label for=\"\">окончание</label><input id=\"dateend\" type=\"text\" class=\"form-control flatpickr\"></div><div class=\"form-group\"><label for=\"\">отделение получатель</label><input id=\"postcode\" type=\"text\" class=\"form-control\"></div><div class=\"form-group\"><label for=\"\">описание</label><input id=\"description\" type=\"text\" class=\"form-control\"></div><div class=\"form-group\"><label for=\"\">статус</label><input id=\"status\" type=\"text\" class=\"form-control\"></div><div class=\"form-group\"><label for=\"\">исполнитель</label><input id=\"executor\" type=\"text\" class=\"form-control\"></div></form></div><div class=\"modal-footer\"><button id=\"close-modal-btn\" type=\"button\" data-dismiss=\"modal\" class=\"btn btn-secondary\">Close</button><button id=\"save-event-btn\" type=\"button\" class=\"btn btn-primary\">Save changes</button></div></div></div></div>");;return buf.join("");
	}

/***/ },

/***/ 120:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, moment) {'use strict';

	module.exports = function() {

		var self = this;

		this.destroyModal = function() {
			
			$("#save-event-btn").off('click');
			$('#close-modal-btn').off('click');
			$('#close-modal-cross-btn').off('click');
			$('#delete-event-btn').off();
			$('.modal-place').html('');
			self.event = null;
		};

		this.init = function(evnt) {

			console.log(evnt);
			self.event = evnt;

			var _modalhtml = __webpack_require__(121);
			$('.modal-place').html(_modalhtml());
			$(".flatpickr").flatpickr({
				enableTime: true,
			});

			$('#modal').modal('show');

			$('#datebegin').val(evnt.start.format('YYYY-MM-DD hh:mm'));
			$('#dateend').val(evnt.end.format('YYYY-MM-DD hh:mm'));
			$('#event-title').val(evnt.title);
			$('#postcode').val(evnt.postalCode);
			$('#status').val(evnt.status);
			$("#description").val(evnt.description);
			$('#executor').val(evnt.executor);


			$("#save-event-btn").on('click',function(e) {

				console.log('save from modal');
				var  _event={};

				_event.title=self.event.title = $('#event-title').val();
				_event.start=self.event.start = moment($('#datebegin').val());
				_event.end=self.event.end = moment($('#dateend').val());
				_event.postalCode=self.event.postalCode = $('#postcode').val();
				_event.status=self.event.status = $('#status').val();
				_event.description=self.event.description = $("#description").val();
				_event.executor=self.event.executor = $('#executor').val();

				$.ajax({
					type: 'POST',
					url: '/users/update/'+self.event._id,
					data: JSON.stringify(_event),
					dataType: "json",
					contentType: "application/json",
					success: function(e) {
						console.log("data update");
						$('#calendar').fullCalendar('updateEvent', self.event);
						$('#calendar').fullCalendar('rerenderEvents');					
						$('#modal').modal('hide');
						/*var _modal = require('../view/allok.jade');
						$('.modal-place').html(_modal());
						$('#modal').modal('show');*/

					},
					//error: ajaxError
				});			
			});
			$('#delete-event-btn').on('click',function(e){
				$.ajax({
				type: 'DELETE',
				url: '/users/del/' + self.event._id,
				dataType: "json",
				contentType: "application/json",
				success: function(data) {
					console.log("data del");
					$('#calendar').fullCalendar('removeEvents', self.event._id);
				},
				//error: ajaxError
			});
			});

			$('#modal').on('hidden.bs.modal', function(e) {
				console.log('modal hide');
				self.destroyModal();

			});
		};


	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(8)))

/***/ },

/***/ 121:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(5);

	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;

	buf.push("<div id=\"modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\" class=\"modal fade\"><div role=\"document\" class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" data-dismiss=\"modal\" aria-label=\"Close\" class=\"close\"><span aria-hidden=\"true\">×</span></button><h4 id=\"myModalLabel\" class=\"modal-title\">Редактирование/удаление</h4></div><div class=\"modal-body\"><form action=\"\"><div class=\"form-group\"><label for=\"\">заголовок</label><input id=\"event-title\" type=\"text\" class=\"form-control\"></div><div class=\"form-group\"><label for=\"\">начало</label><input id=\"datebegin\" type=\"text\" class=\"form-control flatpickr\"></div><div class=\"form-group\"><label for=\"\">окончание</label><input id=\"dateend\" type=\"text\" class=\"form-control flatpickr\"></div><div class=\"form-group\"><label for=\"\">отделение получатель</label><input id=\"postcode\" type=\"text\" class=\"form-control\"></div><div class=\"form-group\"><label for=\"\">описание</label><input id=\"description\" type=\"text\" class=\"form-control\"></div><div class=\"form-group\"><label for=\"\">статус</label><input id=\"status\" type=\"text\" class=\"form-control\"></div><div class=\"form-group\"><label for=\"\">исполнитель</label><input id=\"executor\" type=\"text\" class=\"form-control\"></div></form></div><div class=\"modal-footer\"><button type=\"button\" data-dismiss=\"modal\" class=\"btn btn-secondary\">Close</button><button id=\"save-event-btn\" type=\"button\" class=\"btn btn-primary\">Save changes</button><button id=\"delete-event-btn\" type=\"button\" class=\"btn btn-danger\">Delete</button></div></div></div></div>");;return buf.join("");
	}

/***/ },

/***/ 122:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {module.exports = function() {

		var _list;
		var self = this;
		var lcard = __webpack_require__(123);
		var listhtml = __webpack_require__(124);

		this.destroyModal = function() {

			//$("#save-event-btn").off('click');
			$('.modal-place').html('');
		};

		this.init = function() {

			$('.list-place').html(lcard());
			$('#clear-list-btn').on('click', function(e) {
				e.stopPropagation();
				e.preventDefault();
				console.log('list clear');
				_list = null;
			});
			$('#add-to-list-btn').on('click', function(e) {
				e.stopPropagation();
				e.preventDefault();
				var _modal = __webpack_require__(125);
				$('.modal-place').html(_modal());
				$('#load-filter-list-btn').on('click', loadFilteredList);
				$('#modal').modal('show');
				$(".flatpickr").flatpickr({
					enableTime: true,
				});
			});


			$('#modal').on('hidden.bs.modal', function(e) {
				console.log('modal hide');
				self.destroyModal();
			});

			$('#send-list-mail').on('click', function(e) {
				if (_list.length > 0) {
					if ($('#execemail').val()) {

						var emailtxt={"txt":listhtml({"data": _list})};
						console.log(emailtxt);

						$.ajax({
							type: 'POST',
							url: '/users/emaillist',
							data: JSON.stringify(emailtxt),
							dataType: "json",
							contentType: "application/json",
							success: function(data) {
								console.log("search ok");
							},
							//error: ajaxError
						});
					}
				}
			});

		};

		this.destroy = function() {

		};

		function loadFilteredList() {
			var lquery = {};
			$('.l-query').each(function(i, el) {
				if ($(el).val()) {
					lquery[$(el).attr('data-lquery-name')] = $(el).val();
				}
			});
			console.log(lquery);

			$.ajax({
				type: 'POST',
				url: '/users/lquery',
				data: JSON.stringify(lquery),
				dataType: "json",
				contentType: "application/json",
				success: function(data) {
					console.log("search ok");
					console.log(data);
					_list = data;
					renderList(_list);
				},
				//error: ajaxError
			});
		}

		function renderList(__list) {
			$('#listplace').html(listhtml({
				"data": __list
			}));

			$('.edit-evnt-list').on('click', function(e) {
				e.stopPropagation();
				e.preventDefault();
				console.log('edit click clack )');
			});
			$('.remove-evnt-list').on('click', function(e) {
				e.stopPropagation();
				e.preventDefault();
				var __id = $(e.currentTarget).parent().attr('data-evnt-id');
				var indx;
				_list.forEach(function(evnt, i) {
					if (evnt._id == __id) {
						indx = i;
					}
				});
				_list.splice(indx, 1);
				renderList(_list);
			});

		}


	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 123:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(5);

	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;

	buf.push("<div class=\"card\"><div class=\"card-header\"><ul class=\"nav nav-pills card-header-pills float-xs-left\"><li class=\"nav-item\"><a id=\"add-to-list-btn\" href=\"#\" class=\"nav-link\">Список/Добавить</a></li><li class=\"nav-item\"><a id=\"clear-list-btn\" href=\"#\" class=\"nav-link\">Очистить</a></li></ul></div><div class=\"card-block\"><h4 class=\"card-title\"> </h4><div id=\"listplace\" class=\"card-text\">\t\t\t\t\t\t</div><input id=\"execemail\" type=\"email\" class=\"form-control\"><a id=\"send-list-mail\" href=\"#\" class=\"btn btn-primary\">на почту исполнителю</a></div></div>");;return buf.join("");
	}

/***/ },

/***/ 124:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(5);

	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	;var locals_for_with = (locals || {});(function (data, undefined) {
	buf.push("<h4>Список\t<ul class=\"list-group\"></ul>");
	// iterate data	
	;(function(){
	  var $$obj = data	;
	  if ('number' == typeof $$obj.length) {

	    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
	      var evnt = $$obj[$index];

	buf.push("<li" + (jade.attr("data-evnt-id", '' + (evnt._id) + '', true, true)) + " class=\"list-group-item list-group-item-action\">" + (jade.escape((jade_interp = evnt.title) == null ? '' : jade_interp)) + "<a href=\"#\" class=\"remove-evnt-list\"><i class=\"fa fa-trash-o fa-fw\"></i></a><a href=\"#\" class=\"edit-evnt-list\">\t\t<i class=\"fa fa-pencil fa-fw\">\t\t\t\t</i></a></li>");
	    }

	  } else {
	    var $$l = 0;
	    for (var $index in $$obj) {
	      $$l++;      var evnt = $$obj[$index];

	buf.push("<li" + (jade.attr("data-evnt-id", '' + (evnt._id) + '', true, true)) + " class=\"list-group-item list-group-item-action\">" + (jade.escape((jade_interp = evnt.title) == null ? '' : jade_interp)) + "<a href=\"#\" class=\"remove-evnt-list\"><i class=\"fa fa-trash-o fa-fw\"></i></a><a href=\"#\" class=\"edit-evnt-list\">\t\t<i class=\"fa fa-pencil fa-fw\">\t\t\t\t</i></a></li>");
	    }

	  }
	}).call(this);

	buf.push("</h4>");}.call(this,"data" in locals_for_with?locals_for_with.data:typeof data!=="undefined"?data:undefined,"undefined" in locals_for_with?locals_for_with.undefined: false?undefined:undefined));;return buf.join("");
	}

/***/ },

/***/ 125:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(5);

	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;

	buf.push("<div id=\"modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\" class=\"modal fade\"><div role=\"document\" class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button id=\"close-modal-cross-btn\" type=\"button\" data-dismiss=\"modal\" aria-label=\"Close\" class=\"close\"><span aria-hidden=\"true\">×</span></button><h4 id=\"myModalLabel\" class=\"modal-title\">Фильтр</h4></div><div class=\"modal-body\"><form action=\"\"><div class=\"form-group\"><label for=\"\">заголовок</label><input id=\"event-title\" type=\"text\" data-lquery-name=\"title\" class=\"form-control l-query\"></div><div class=\"form-group\"><label for=\"\">начало</label><input id=\"datebegin\" type=\"text\" data-lquery-name=\"start\" class=\"form-control l-query flatpickr\"></div><div class=\"form-group\"><label for=\"\">окончание</label><input id=\"dateend\" type=\"text\" data-lquery-name=\"end\" class=\"form-control l-query flatpickr\"></div><div class=\"form-group\"><label for=\"\">отделение получатель</label><input id=\"postcode\" type=\"text\" data-lquery-name=\"postalCode\" class=\"form-control l-query\"></div><div class=\"form-group\"><label for=\"\">описание</label><input id=\"description\" type=\"text\" data-lquery-name=\"description\" class=\"form-control l-query\"></div><div class=\"form-group\"><label for=\"\">статус</label><input id=\"status\" type=\"text\" data-lquery-name=\"status\" class=\"form-control l-query\"></div><div class=\"form-group\"><label for=\"\">исполнитель</label><input id=\"executor\" type=\"text\" data-lquery-name=\"executor\" class=\"form-control l-query\"></div></form></div><div class=\"modal-footer\"><button id=\"close-modal-btn\" type=\"button\" data-dismiss=\"modal\" class=\"btn btn-secondary\">Close</button><button id=\"load-filter-list-btn\" type=\"button\" class=\"btn btn-primary\">Сформировать</button></div></div></div></div>");;return buf.join("");
	}

/***/ }

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2Rldi9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2Rldi9tb2R1bGUvbWFwLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9kZXYvbW9kdWxlL3BvRGV0YWlsLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9kZXYvdmlldy9wb3N0T2ZmaWNlRGV0YWlsLmphZGUiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2Rldi9tb2R1bGUvbmV3RXZlbnRNb2RhbC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3ZpZXcvbmV3RXZlbnQuamFkZSIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L21vZHVsZS9lZGl0RXZlbnRNb2RhbC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3ZpZXcvZWRpdGRlbEV2ZW50LmphZGUiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2Rldi9tb2R1bGUvbGlzdG1vZC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3ZpZXcvbGlzdHNjYXJkLmphZGUiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2Rldi92aWV3L2xpc3Rzdmlldy5qYWRlIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9kZXYvdmlldy9saXN0ZmlsdGVybW9kYWwuamFkZSJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8vbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbmNvbnNvbGUubG9nKCdoaSBwY2h0Jyk7XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1x0XG5cblx0JChcIi5mbGF0cGlja3JcIikuZmxhdHBpY2tyKHtcblx0XHRlbmFibGVUaW1lOiB0cnVlLFxuXHR9KTtcblxuXHR2YXIgbXlNYXA9cmVxdWlyZSgnLi9tb2R1bGUvbWFwLmpzJyk7XG5cblx0eW1hcHMucmVhZHkoaW5pdCk7XG5cblxuXHRmdW5jdGlvbiBpbml0KCkge1xuXHRcdFxuXHRcdG15TWFwKCk7XG5cdFx0JCgnI21hcC1sb2FkLWxpbmsnKS5vbignY2xpY2snLGZ1bmN0aW9uKGUpe1xuXHRcdFx0JCgnLmMtcGxhY2UnKS5odG1sKCc8ZGl2IGlkPVwibWFweVwiIHN0eWxlPVwid2lkdGg6IDEwMCU7IGhlaWdodDogODAwcHhcIj48L2Rpdj4nKTtcblx0XHRcdG15TWFwKCk7XG5cdFx0fSk7XG5cblx0fVxuXG5cblx0JC5hamF4KHtcblx0XHR0eXBlOiAnR0VUJyxcblx0XHR1cmw6IFwiL3VzZXJzXCIsXG5cdFx0ZGF0YVR5cGU6IFwianNvblwiLFxuXHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRcdGNhbGVuZGFySW5pdChkYXRhKTtcblx0XHR9LFxuXHRcdC8vZXJyb3I6IGxvYWRFcnJvclxuXHR9KTtcblxuXG5cdGZ1bmN0aW9uIGNhbGVuZGFySW5pdChfZXZlbnRzKSB7XG5cblx0XHR2YXIgX25ld0V2ZW50TW9kYWwgPSByZXF1aXJlKCcuL21vZHVsZS9uZXdFdmVudE1vZGFsLmpzJyk7XG5cdFx0dmFyIF9uZXdNb2RhbCA9IG5ldyBfbmV3RXZlbnRNb2RhbCgpO1xuXHRcdHZhciBfZWRpdEV2ZW50TW9kYWwgPSByZXF1aXJlKCcuL21vZHVsZS9lZGl0RXZlbnRNb2RhbC5qcycpO1xuXHRcdHZhciBfZWRpdE1vZGFsID0gbmV3IF9lZGl0RXZlbnRNb2RhbCgpO1xuXG5cdFx0JCgnI2NhbGVuZGFyJykuZnVsbENhbGVuZGFyKHtcblx0XHRcdGhlYWRlcjoge1xuXHRcdFx0XHRsZWZ0OiAncHJldixuZXh0IHRvZGF5Jyxcblx0XHRcdFx0Y2VudGVyOiAndGl0bGUnLFxuXHRcdFx0XHRyaWdodDogJ21vbnRoLGFnZW5kYVdlZWssYWdlbmRhRGF5J1xuXHRcdFx0fSxcblx0XHRcdHNlbGVjdGFibGU6IHRydWUsXG5cdFx0XHRzZWxlY3RIZWxwZXI6IHRydWUsXG5cdFx0XHRlZGl0YWJsZTogdHJ1ZSxcblxuXHRcdFx0c2VsZWN0OiBmdW5jdGlvbihzdGFydCwgZW5kLCBqc0V2ZW50LCB2aWV3KSB7XG5cblx0XHRcdFx0X25ld01vZGFsLmluaXQoc3RhcnQsIGVuZCk7XG5cblx0XHRcdH0sXG5cdFx0XHRldmVudENsaWNrOiBmdW5jdGlvbihldmVudCwganNFdmVudCwgdmlldykge1xuXG5cdFx0XHRcdF9lZGl0TW9kYWwuaW5pdChldmVudCk7XG5cblx0XHRcdH0sXG5cdFx0XHRldmVudEFmdGVyUmVuZGVyOiBmdW5jdGlvbihldmVudCwgZWxlbWVudCwgdmlldykge1xuXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdlIGEgcicpO1xuXG5cdFx0XHR9LFxuXHRcdFx0ZXZlbnRBZnRlckFsbFJlbmRlcjogZnVuY3Rpb24odmlldykge1xuXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdlIGEgYSByJyk7XG5cdFx0XHR9LFxuXHRcdFx0ZGVmYXVsdFZpZXc6ICdtb250aCcsXG5cdFx0XHRlZGl0YWJsZTogdHJ1ZSxcblx0XHRcdGV2ZW50czogX2V2ZW50c1xuXHRcdH0pO1xuXG5cdFx0dmFyIGxpc3Rtb2QgPSByZXF1aXJlKCcuL21vZHVsZS9saXN0bW9kLmpzJyk7XG5cdFx0dmFyIF9saXN0bW9kPW5ldyBsaXN0bW9kKCk7XG5cdFx0X2xpc3Rtb2QuaW5pdCgpO1xuXHRcdFxuXHR9XG5cblxuXG59KTtcblxuLy99XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvanMvZGV2L2FwcC5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG5cblx0dmFyIF9zYXZlID0gdHJ1ZTtcblx0dmFyIF9ldmVudCwgX3Bvc3RPZmZpY2VBcnI7XG5cblx0dmFyIG15TWFwID0gbmV3IHltYXBzLk1hcChcIm1hcHlcIiwge1xuXHRcdGNlbnRlcjogWzUwLjU5LCAzNi41OF0sXG5cdFx0em9vbTogMTBcblx0fSwge1xuXHRcdGJ1dHRvbk1heFdpZHRoOiAxNTBcblx0fSk7XG5cblx0XG5cdCQuYWpheCh7XG5cdFx0dHlwZTogJ0dFVCcsXG5cdFx0dXJsOiBcIi4vcG9zdGFscy5qc29uXCIsXG5cdFx0ZGF0YVR5cGU6IFwianNvblwiLFxuXHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcblxuXHRcdFx0X3Bvc3RPZmZpY2VBcnIgPSBkYXRhO1xuXHRcdFx0dmFyIG15Q29sbGVjdGlvbiA9IG5ldyB5bWFwcy5HZW9PYmplY3RDb2xsZWN0aW9uKCk7XG5cblx0XHRcdHZhciBwb0R0bCA9IHJlcXVpcmUoJy4vcG9EZXRhaWwuanMnKTtcblx0XHRcdHZhciBteUJhbGxvb25Db250ZW50Qm9keUxheW91dCA9IHltYXBzLnRlbXBsYXRlTGF5b3V0RmFjdG9yeS5jcmVhdGVDbGFzcyhcblx0XHRcdFx0JzxwPiRbcHJvcGVydGllcy5kYXRhLnBvc3RhbENvZGVdPC9wPjxwPiRbcHJvcGVydGllcy5kYXRhLmFkZHJlc3NTb3VyY2VdPC9wPjxwPiRbcHJvcGVydGllcy5kYXRhLnR5cGVDb2RlXTwvcD48YnIgLz48YnV0dG9uIGlkPVwic2hvdy1wby1kZXRhaWwtYnRuXCI+0J/QvtC00YDQvtCx0L3QvjwvYnV0dG9uPicsIHtcblx0XHRcdFx0XHRidWlsZDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRteUJhbGxvb25Db250ZW50Qm9keUxheW91dC5zdXBlcmNsYXNzLmJ1aWxkLmNhbGwodGhpcyk7XG5cdFx0XHRcdFx0XHQkKCcjc2hvdy1wby1kZXRhaWwtYnRuJykub24oJ2NsaWNrJywge1xuXHRcdFx0XHRcdFx0XHRcInBvXCI6IHRoaXMuX2RhdGEucHJvcGVydGllcy5fZGF0YVxuXHRcdFx0XHRcdFx0fSwgdGhpcy5vblNob3dQT0RldGFpbENsaWNrKTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGNsZWFyOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdCQoJyNzaG93LXBvLWRldGFpbC1idG4nKS5vZmYoJ2NsaWNrJywgdGhpcy5vblNob3dQT0RldGFpbENsaWNrKTtcblx0XHRcdFx0XHRcdG15QmFsbG9vbkNvbnRlbnRCb2R5TGF5b3V0LnN1cGVyY2xhc3MuY2xlYXIuY2FsbCh0aGlzKTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdG9uU2hvd1BPRGV0YWlsQ2xpY2s6IGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0XHRcdHBvRHRsKGUuZGF0YS5wby5kYXRhLCBteU1hcCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0ZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKG90ZCkge1xuXHRcdFx0XHQvL2NvbnNvbGUubG9nKG90ZC5sYXRpdHVkZSk7XG5cblx0XHRcdFx0dmFyIHBtYXJrID0gbmV3IHltYXBzLlBsYWNlbWFyayhbb3RkLmxhdGl0dWRlLCBvdGQubG9uZ2l0dWRlXSxcblx0XHRcdFx0XHQvKntcblx0XHRcdFx0XHRcdGhpbnRDb250ZW50OiBvdGQucG9zdGFsQ29kZSxcblx0XHRcdFx0XHRcdGJhbGxvb25Db250ZW50OiBcIjxwPlwiK290ZC5wb3N0YWxDb2RlK1wiPC9wPjxwPlwiXG5cdFx0XHRcdFx0XHQrb3RkLmFkZHJlc3NTb3VyY2UrXCI8L3A+PHA+XCJcblx0XHRcdFx0XHRcdCtvdGQudHlwZUNvZGUrXG5cdFx0XHRcdFx0XHRcIjwvcD48YSBocmVmPScjJyBjbGFzcz0nYnRuIGJ0bi1wcmltYXJ5JyBpZD0ncG9zdC1kZXRhaWwnIGRhdGEtcG9zdGFsY29kZT0nXCIrb3RkLnBvc3RhbENvZGUrXCInPtCf0L7QtNGA0L7QsdC90LXQtTwvYT5cIlxuXHRcdFx0XHRcdH0qL1xuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGRhdGE6IG90ZCxcblx0XHRcdFx0XHRcdGljb25Db250ZW50OiBvdGQucG9zdGFsQ29kZSxcblx0XHRcdFx0XHRcdGljb25DYXB0aW9uOiBvdGQucG9zdGFsQ29kZVxuXHRcdFx0XHRcdH0sIHtcblx0XHRcdFx0XHRcdGJhbGxvb25Db250ZW50TGF5b3V0OiBteUJhbGxvb25Db250ZW50Qm9keUxheW91dCxcblx0XHRcdFx0XHRcdHByZXNldDogJ2lzbGFuZHMjYmxhY2tTdHJldGNoeUljb24nXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQpO1xuXHRcdFx0XHQvL215TWFwLmdlb09iamVjdHMuYWRkKHBtYXJrKTtcblx0XHRcdFx0bXlDb2xsZWN0aW9uLmFkZChwbWFyayk7XG5cdFx0XHR9KTtcblxuXHRcdFx0LyokKCcucG9zdC1kZXRhaWwnKS5jbGljayhmdW5jdGlvbihlKXtcblx0XHRcdFx0Y29uc29sZS5sb2coJ2NsaWNrIGNsYWNrJyk7XG5cdFx0XHRcdHZhciBwY29kZT0kKGUuY3VycmVudFRhcmdldCkuYXR0cignZGF0YS1wb3N0YWxjb2RlJyk7XG5cdFx0XHRcdF9wb3N0T2ZmaWNlQXJyLmZvckVhY2goZnVuY3Rpb24ob3RkKXtcblx0XHRcdFx0XHRpZihvdGQucG9zdGFsQ29kZT09PXBjb2RlKXtcblx0XHRcdFx0XHRcdHZhciB0cGw9cmVxdWlyZSgnLi92aWV3L3Bvc3RPZmZpY2VEZXRhaWwuamFkZScpO1xuXHRcdFx0XHRcdFx0JCgnLnBvZC1wbGFjZScpLmh0bWwodHBsKHtcImRhdGFcIjpvdGR9KSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH0pOyovXG5cblx0XHRcdG15TWFwLmdlb09iamVjdHMuYWRkKG15Q29sbGVjdGlvbik7XG5cblxuXG5cdFx0XHQkKCcjbWFwLWNyZWF0ZS1wYXRoJykuY2xpY2soZnVuY3Rpb24oZSl7XG5cdFx0XHRcdG15Q29sbGVjdGlvbi5yZW1vdmVBbGwoKTtcblx0XHRcdFxuXG5cdFx0XHR2YXIgcm9iaj1kYXRhLm1hcChmdW5jdGlvbihvdGQpe1xuXHRcdFx0XHRyZXR1cm4ge3R5cGU6J3dheVBvaW50Jyxwb2ludDpbb3RkLmxhdGl0dWRlLCBvdGQubG9uZ2l0dWRlXX07XG5cdFx0XHR9KTtcblx0XHRcdGNvbnNvbGUubG9nKFwiKysrKysrKysrKysrKysrKysrKysrKysrKysrKz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09KysrKysrKysrKysrKysrKytcIik7XG5cdFx0XHRjb25zb2xlLmxvZyhyb2JqKTtcblx0XHRcdHZhciBybz1bcm9ialswXSxyb2JqWzEwXSxyb2JqWzIyXV07XG5cdFx0XHRjb25zb2xlLmxvZyhcIisrKysrKysrKysrKysrKysrKysrKysrKysrKys9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSsrKysrKysrKysrKysrKysrXCIpO1xuXHRcdFx0Y29uc29sZS5sb2cocm8pO1xuXHRcdFx0eW1hcHMucm91dGUocm8pLnRoZW4oXG5cdFx0XHRcdGZ1bmN0aW9uKHJvdXRlKSB7XG5cdFx0XHRcdFx0bXlNYXAuZ2VvT2JqZWN0cy5hZGQocm91dGUpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRmdW5jdGlvbihlcnJvcikge1xuXHRcdFx0XHRcdGFsZXJ0KFwi0JLQvtC30L3QuNC60LvQsCDQvtGI0LjQsdC60LA6IFwiICsgZXJyb3IubWVzc2FnZSk7XG5cdFx0XHRcdH1cblx0XHRcdCk7XG5cdFx0fSk7XHRcblxuXHRcdH0sXG5cdFx0Ly9lcnJvcjogbG9hZEVycm9yXG5cdH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2pzL2Rldi9tb2R1bGUvbWFwLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3J0aWN0JztcblxubW9kdWxlLmV4cG9ydHM9ZnVuY3Rpb24oZGF0YSxteU1hcCl7XG5cblxuXG5cdHZhciB0cGwgPSByZXF1aXJlKCcuLi92aWV3L3Bvc3RPZmZpY2VEZXRhaWwuamFkZScpO1xuXHQkKCcucG9kLXBsYWNlJykuaHRtbCh0cGwoe1wiZGF0YVwiOiBkYXRhfSkpO1xuXG5cdCQoJy5zaG93LW5ldCcpLm9uKCdjbGljaycsZnVuY3Rpb24oZSl7XG5cblx0XHRteU1hcC5kZXN0cm95KCk7XG5cblx0XHQkKCcuYy1wbGFjZScpLmh0bWwoJzxkaXYgaWQ9XCJjeVwiPmN5ITwvZGl2PicpO1xuXG5cdFx0dmFyIGN5ID0gY3l0b3NjYXBlKHtcbiAgY29udGFpbmVyOiAkKCcjY3knKSxcbiAgIFxufSk7XG5cbnZhciBlbGVtZW50cyA9IHtcbiAgICAgICAgbm9kZXM6IFtcbiAgICAgICAgICB7IGRhdGE6IHsgaWQ6ICduMScsIG5hbWU6ICduMScsIHNpemU6IDUwfSxcbiAgICAgICAgICAgIHBvc2l0aW9uOiB7eDogMCwgeTogMH0gfSxcbiAgICAgICAgICB7IGRhdGE6IHsgaWQ6ICduMicsIG5hbWU6ICduMicsIHNpemU6IDUwfSxcbiAgICAgICAgICAgcG9zaXRpb246IHt4OiAxMDAsIHk6IDEwMH0gfSxcbiAgICAgICAgICB7IGRhdGE6IHsgaWQ6ICduMycsIG5hbWU6ICduMycsIHNpemU6IDUwfSxcbiAgICAgICAgICAgcG9zaXRpb246IHt4OiAwLCB5OiAxMDB9IH0sXG4gICAgICAgIF0sXG4gICAgICAgIGVkZ2VzOiBbXG4gICAgICAgICAgeyBkYXRhOiB7IHNvdXJjZTogJ24xJywgdGFyZ2V0OiAnbjInIH0gfVxuICAgICAgICBdXG4gICAgICB9O1xuICAgICAgY3kuYWRkKGVsZW1lbnRzKTtcbiAgICAgIGN5LmxheW91dCh7XG4gICAgICBcdG5hbWU6ICdncmlkJyAgIFxuICAgICAgfSk7XG5cbiAgICAgY3kub24oJ3RhcCcsIGZ1bmN0aW9uKGV2dCl7XG4gIGNvbnNvbGUubG9nKCAndGFwICcgKyBldnQuY3lUYXJnZXQuaWQoKSApO1xufSk7IFx0XHRcblx0Ly9jb25zb2xlLmxvZyhjeSk7XG5cdFx0LyokKCcjY3knKS5jeXRvc2NhcGUoe1xuICByZWFkeTogZnVuY3Rpb24oKXtcbiAgICAgIHZhciBjeSA9IHRoaXM7XG4gICAgICB2YXIgZWxlbWVudHMgPSB7XG4gICAgICAgIG5vZGVzOiBbXG4gICAgICAgICAgeyBkYXRhOiB7IGlkOiAnbjEnLCBuYW1lOiAnbjEnLCBzaXplOiA1MH0sXG4gICAgICAgICAgICBwb3NpdGlvbjoge3g6IDAsIHk6IDB9IH0sXG4gICAgICAgICAgeyBkYXRhOiB7IGlkOiAnbjInLCBuYW1lOiAnbjInLCBzaXplOiA1MH0sXG4gICAgICAgICAgIHBvc2l0aW9uOiB7eDogMTAwLCB5OiAxMDB9IH0sXG4gICAgICAgICAgeyBkYXRhOiB7IGlkOiAnbjMnLCBuYW1lOiAnbjMnLCBzaXplOiA1MH0sXG4gICAgICAgICAgIHBvc2l0aW9uOiB7eDogMCwgeTogMTAwfSB9LFxuICAgICAgICBdLFxuICAgICAgICBlZGdlczogW1xuICAgICAgICAgIHsgZGF0YTogeyBzb3VyY2U6ICduMScsIHRhcmdldDogJ24yJyB9IH1cbiAgICAgICAgXVxuICAgICAgfTtcbiAgICAgIFxuICAgICAgLy8gQWRkIGFsbCBub2RlcyBhbmQgZWRnZXNcbiAgICAgIGN5LmFkZChlbGVtZW50cyk7XG5cbiAgICAgIC8vIExvY2sgbm9kZSAxIHRvIGl0cyBpbml0aWFsIHBvc2l0aW9uLCAoMCwwKVxuICAgICAgY3kubm9kZXMoJyNuMScpLmxvY2soKTtcblxuICAgICAgLy8gRGlzYWJsZSB3ZWIgd29ya2VycyB0byBiZSBhYmxlIHRvIHVzZSBqc0ZpZGRsZVxuICAgICAgd2luZG93LldvcmtlciA9IHVuZGVmaW5lZDtcblxuICAgICAgLy8gVGhlIGdlbmVyYXRlZCBsYXlvdXQgd29uJ3QgbG9jayBub2RlIDEgdG8gaXRzIHBvc2l0aW9uXG4gICAgICBjeS5sYXlvdXQoe1xuICAgICAgICBmaXQ6IGZhbHNlLFxuICAgICAgXHRuYW1lOiAnYXJib3InICAgXG4gICAgICB9KTtcbiAgICAgIFxuICAgICAgY29uc29sZS5sb2coY3kuJCgnI24xJykucG9zaXRpb24oKSxcbiAgICAgICAgICAgICAgICAgIGN5LiQoJyNuMicpLnBvc2l0aW9uKCksXG4gICAgICAgICAgICAgICAgICBjeS4kKCcjbjMnKS5wb3NpdGlvbigpKTtcbiAgfVxufSk7Ki9cblx0fSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvanMvZGV2L21vZHVsZS9wb0RldGFpbC5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCIvaG9tZS91YnVudHUvd29ya3NwYWNlL25vZGVfbW9kdWxlcy9qYWRlL2xpYi9ydW50aW1lLmpzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAoZGF0YSwgdW5kZWZpbmVkKSB7XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcImNhcmRcXFwiPjxoMyBjbGFzcz1cXFwiY2FyZC1oZWFkZXJcXFwiPlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IGRhdGEucG9zdGFsQ29kZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiPC9oMz48ZGl2IGNsYXNzPVxcXCJjYXJkLWJsb2NrXFxcIj48aDQgY2xhc3M9XFxcImNhcmQtdGl0bGVcXFwiPlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IGRhdGEucG9zdGFsQ29kZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiIFwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IGRhdGEuc2V0dGxlbWVudCkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiIFwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IGRhdGEuYWRkcmVzc1NvdXJjZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiPC9oND48ZGl2IGNsYXNzPVxcXCJjYXJkLXRleHRcXFwiPjxoND7Qn9GA0LXQtNC+0YHRgtCw0LLQu9GP0LXQvNGL0LUg0YPRgdC70YPQs9C4PC9oND48dWw+PC91bD5cIik7XG4vLyBpdGVyYXRlIGRhdGEuc2VydmljZUdyb3Vwc1xuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSBkYXRhLnNlcnZpY2VHcm91cHM7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBzZyA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGxpPlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IHNnLnNlcnZpY2VHcm91cE5hbWUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIjwvbGk+XCIpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIHNnID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8bGk+XCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gc2cuc2VydmljZUdyb3VwTmFtZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiPC9saT5cIik7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbmJ1Zi5wdXNoKFwiPGg0PtCi0LXQu9C10YTQvtC90Ys8L2g0Pjx1bD5cXHRcXHRcXHQ8L3VsPlwiKTtcbi8vIGl0ZXJhdGUgZGF0YS5waG9uZXNcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gZGF0YS5waG9uZXM7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBwaG9uZSA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGxpPiAoXCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gcGhvbmUucGhvbmVUb3duQ29kZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiKSBcIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBwaG9uZS5waG9uZU51bWJlcikgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiIChcIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBwaG9uZS5waG9uZVR5cGVOYW1lKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCIpPC9saT5cIik7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIgcGhvbmUgPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIjxsaT4gKFwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IHBob25lLnBob25lVG93bkNvZGUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIikgXCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gcGhvbmUucGhvbmVOdW1iZXIpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIiAoXCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gcGhvbmUucGhvbmVUeXBlTmFtZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiKTwvbGk+XCIpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG5idWYucHVzaChcIjxoND7QktGA0LXQvNGPINGA0LDQsdC+0YLRi1xcdFxcdDwvaDQ+PHVsPjwvdWw+XCIpO1xuLy8gaXRlcmF0ZSBkYXRhLndvcmtpbmdIb3Vyc1xuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSBkYXRhLndvcmtpbmdIb3VycztcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIHdoID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8bGk+XCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gd2gud2Vla0RheU5hbWUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIlxcdDwvbGk+XCIpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIHdoID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8bGk+XCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gd2gud2Vla0RheU5hbWUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIlxcdDwvbGk+XCIpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG5idWYucHVzaChcIjwvZGl2PjxhIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJidG4gYnRuLXByaW1hcnkgc2hvdy1uZXRcXFwiPnNob3cgbWUgdGhlIE5ldCBpbiB0aGEgcGxhY2U8L2E+PC9kaXY+PC9kaXY+XCIpO30uY2FsbCh0aGlzLFwiZGF0YVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguZGF0YTp0eXBlb2YgZGF0YSE9PVwidW5kZWZpbmVkXCI/ZGF0YTp1bmRlZmluZWQsXCJ1bmRlZmluZWRcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnVuZGVmaW5lZDp0eXBlb2YgdW5kZWZpbmVkIT09XCJ1bmRlZmluZWRcIj91bmRlZmluZWQ6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy9qcy9kZXYvdmlldy9wb3N0T2ZmaWNlRGV0YWlsLmphZGVcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXG5cdHRoaXMuX21vZGFsID0gcmVxdWlyZSgnLi4vdmlldy9uZXdFdmVudC5qYWRlJyk7XG5cblx0dGhpcy5kZXN0cm95TW9kYWwgPSBmdW5jdGlvbigpIHtcblx0XHRcblx0XHQkKFwiI3NhdmUtZXZlbnQtYnRuXCIpLm9mZignY2xpY2snKTtcblx0XHQkKCcjY2xvc2UtbW9kYWwtYnRuJykub2ZmKCdjbGljaycpO1xuXHRcdCQoJyNjbG9zZS1tb2RhbC1jcm9zcy1idG4nKS5vZmYoJ2NsaWNrJyk7XG5cdFx0JCgnLm1vZGFsLXBsYWNlJykuaHRtbCgnJyk7XG5cdH07XG5cblx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdHRoaXMuaW5pdCA9IGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcblxuXHRcdCQoJy5tb2RhbC1wbGFjZScpLmh0bWwodGhpcy5fbW9kYWwoKSk7XG5cdFx0JChcIi5mbGF0cGlja3JcIikuZmxhdHBpY2tyKHtcblx0XHRcdGVuYWJsZVRpbWU6IHRydWUsXG5cdFx0fSk7XG5cblx0XHQkKFwiI3NhdmUtZXZlbnQtYnRuXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdHZhciBldm50ID0ge1xuXHRcdFx0XHR0aXRsZTogJCgnI2V2ZW50LXRpdGxlJykudmFsKCksXG5cdFx0XHRcdHN0YXJ0OiBtb21lbnQoJCgnI2RhdGViZWdpbicpLnZhbCgpKSxcblx0XHRcdFx0ZW5kOiBtb21lbnQoJCgnI2RhdGVlbmQnKS52YWwoKSksXG5cdFx0XHRcdHBvc3RhbENvZGU6ICQoJyNwb3N0Y29kZScpLnZhbCgpLFxuXHRcdFx0XHRzdGF0dXM6ICQoJyNzdGF0dXMnKS52YWwoKSxcblx0XHRcdFx0ZGVzY3JpcHRpb246ICQoXCIjZGVzY3JpcHRpb25cIikudmFsKCksXG5cdFx0XHRcdGV4ZWN1dG9yOiAkKCcjZXhlY3V0b3InKS52YWwoKVxuXHRcdFx0fTtcblx0XHRcdGNvbnNvbGUubG9nKFwiYWRkIGV2ZW50XCIpO1xuXHRcdFx0JCgnI2NhbGVuZGFyJykuZnVsbENhbGVuZGFyKCdyZW5kZXJFdmVudCcsIGV2bnQsIHRydWUpO1xuXG5cdFx0XHQkLmFqYXgoe1xuXHRcdFx0XHR0eXBlOiAnUE9TVCcsXG5cdFx0XHRcdHVybDogJy91c2Vycy9zYXZlJyxcblx0XHRcdFx0ZGF0YTogSlNPTi5zdHJpbmdpZnkoZXZudCksXG5cdFx0XHRcdGRhdGFUeXBlOiBcImpzb25cIixcblx0XHRcdFx0Y29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuXHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJkYXRhIHNhdmVcIik7XG5cdFx0XHRcdFx0dmFyIGV2bnRBcnJheSA9ICQoJyNjYWxlbmRhcicpLmZ1bGxDYWxlbmRhcignY2xpZW50RXZlbnRzJyk7XG5cdFx0XHRcdFx0dmFyIF9ldm50ID0gZXZudEFycmF5W2V2bnRBcnJheS5sZW5ndGggLSAxXTtcblx0XHRcdFx0XHRfZXZudC5faWQgPSBkYXRhLmluc2VydGVkaWQ7XG5cblx0XHRcdFx0XHQkKCcjY2FsZW5kYXInKS5mdWxsQ2FsZW5kYXIoJ3VwZGF0ZUV2ZW50JywgX2V2bnQpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHQvL2Vycm9yOiBhamF4RXJyb3Jcblx0XHRcdH0pO1xuXG5cblx0XHR9KTtcblxuXHRcdCQoJyNjbG9zZS1tb2RhbC1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cblx0XHR9KTtcblxuXHRcdCQoJyNjbG9zZS1tb2RhbC1jcm9zcy1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cblx0XHR9KTtcblxuXHRcdCQoJyNtb2RhbCcpLm1vZGFsKCdzaG93Jyk7XG5cblx0XHQkKCcjZGF0ZWJlZ2luJykudmFsKHN0YXJ0LmZvcm1hdCgnWVlZWS1NTS1ERCBoaDptbScpKTtcblx0XHQkKCcjZGF0ZWVuZCcpLnZhbChlbmQuZm9ybWF0KCdZWVlZLU1NLUREIGhoOm1tJykpO1xuXG5cdFx0JCgnI21vZGFsJykub24oJ2hpZGRlbi5icy5tb2RhbCcsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdtb2RhbCBoaWRlJyk7XG5cdFx0XHRzZWxmLmRlc3Ryb3lNb2RhbCgpO1xuXHRcdH0pO1xuXG5cdH07XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvanMvZGV2L21vZHVsZS9uZXdFdmVudE1vZGFsLmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBqYWRlID0gcmVxdWlyZShcIi9ob21lL3VidW50dS93b3Jrc3BhY2Uvbm9kZV9tb2R1bGVzL2phZGUvbGliL3J1bnRpbWUuanNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8ZGl2IGlkPVxcXCJtb2RhbFxcXCIgdGFiaW5kZXg9XFxcIi0xXFxcIiByb2xlPVxcXCJkaWFsb2dcXFwiIGFyaWEtbGFiZWxsZWRieT1cXFwibXlNb2RhbExhYmVsXFxcIiBhcmlhLWhpZGRlbj1cXFwidHJ1ZVxcXCIgY2xhc3M9XFxcIm1vZGFsIGZhZGVcXFwiPjxkaXYgcm9sZT1cXFwiZG9jdW1lbnRcXFwiIGNsYXNzPVxcXCJtb2RhbC1kaWFsb2dcXFwiPjxkaXYgY2xhc3M9XFxcIm1vZGFsLWNvbnRlbnRcXFwiPjxkaXYgY2xhc3M9XFxcIm1vZGFsLWhlYWRlclxcXCI+PGJ1dHRvbiBpZD1cXFwiY2xvc2UtbW9kYWwtY3Jvc3MtYnRuXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGRhdGEtZGlzbWlzcz1cXFwibW9kYWxcXFwiIGFyaWEtbGFiZWw9XFxcIkNsb3NlXFxcIiBjbGFzcz1cXFwiY2xvc2VcXFwiPjxzcGFuIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIj7Dlzwvc3Bhbj48L2J1dHRvbj48aDQgaWQ9XFxcIm15TW9kYWxMYWJlbFxcXCIgY2xhc3M9XFxcIm1vZGFsLXRpdGxlXFxcIj7QodC+0LfQtNCw0L3QuNC1PC9oND48L2Rpdj48ZGl2IGNsYXNzPVxcXCJtb2RhbC1ib2R5XFxcIj48Zm9ybSBhY3Rpb249XFxcIlxcXCI+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7Qt9Cw0LPQvtC70L7QstC+0Lo8L2xhYmVsPjxpbnB1dCBpZD1cXFwiZXZlbnQtdGl0bGVcXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0L3QsNGH0LDQu9C+PC9sYWJlbD48aW5wdXQgaWQ9XFxcImRhdGViZWdpblxcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbCBmbGF0cGlja3JcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0L7QutC+0L3Rh9Cw0L3QuNC1PC9sYWJlbD48aW5wdXQgaWQ9XFxcImRhdGVlbmRcXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2wgZmxhdHBpY2tyXFxcIj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj48bGFiZWwgZm9yPVxcXCJcXFwiPtC+0YLQtNC10LvQtdC90LjQtSDQv9C+0LvRg9GH0LDRgtC10LvRjDwvbGFiZWw+PGlucHV0IGlkPVxcXCJwb3N0Y29kZVxcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7QvtC/0LjRgdCw0L3QuNC1PC9sYWJlbD48aW5wdXQgaWQ9XFxcImRlc2NyaXB0aW9uXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj48bGFiZWwgZm9yPVxcXCJcXFwiPtGB0YLQsNGC0YPRgTwvbGFiZWw+PGlucHV0IGlkPVxcXCJzdGF0dXNcXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0LjRgdC/0L7Qu9C90LjRgtC10LvRjDwvbGFiZWw+PGlucHV0IGlkPVxcXCJleGVjdXRvclxcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+PC9kaXY+PC9mb3JtPjwvZGl2PjxkaXYgY2xhc3M9XFxcIm1vZGFsLWZvb3RlclxcXCI+PGJ1dHRvbiBpZD1cXFwiY2xvc2UtbW9kYWwtYnRuXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGRhdGEtZGlzbWlzcz1cXFwibW9kYWxcXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+Q2xvc2U8L2J1dHRvbj48YnV0dG9uIGlkPVxcXCJzYXZlLWV2ZW50LWJ0blxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1wcmltYXJ5XFxcIj5TYXZlIGNoYW5nZXM8L2J1dHRvbj48L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy9qcy9kZXYvdmlldy9uZXdFdmVudC5qYWRlXG4vLyBtb2R1bGUgaWQgPSAxMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXG5cdHZhciBzZWxmID0gdGhpcztcblxuXHR0aGlzLmRlc3Ryb3lNb2RhbCA9IGZ1bmN0aW9uKCkge1xuXHRcdFxuXHRcdCQoXCIjc2F2ZS1ldmVudC1idG5cIikub2ZmKCdjbGljaycpO1xuXHRcdCQoJyNjbG9zZS1tb2RhbC1idG4nKS5vZmYoJ2NsaWNrJyk7XG5cdFx0JCgnI2Nsb3NlLW1vZGFsLWNyb3NzLWJ0bicpLm9mZignY2xpY2snKTtcblx0XHQkKCcjZGVsZXRlLWV2ZW50LWJ0bicpLm9mZigpO1xuXHRcdCQoJy5tb2RhbC1wbGFjZScpLmh0bWwoJycpO1xuXHRcdHNlbGYuZXZlbnQgPSBudWxsO1xuXHR9O1xuXG5cdHRoaXMuaW5pdCA9IGZ1bmN0aW9uKGV2bnQpIHtcblxuXHRcdGNvbnNvbGUubG9nKGV2bnQpO1xuXHRcdHNlbGYuZXZlbnQgPSBldm50O1xuXG5cdFx0dmFyIF9tb2RhbGh0bWwgPSByZXF1aXJlKCcuLi92aWV3L2VkaXRkZWxFdmVudC5qYWRlJyk7XG5cdFx0JCgnLm1vZGFsLXBsYWNlJykuaHRtbChfbW9kYWxodG1sKCkpO1xuXHRcdCQoXCIuZmxhdHBpY2tyXCIpLmZsYXRwaWNrcih7XG5cdFx0XHRlbmFibGVUaW1lOiB0cnVlLFxuXHRcdH0pO1xuXG5cdFx0JCgnI21vZGFsJykubW9kYWwoJ3Nob3cnKTtcblxuXHRcdCQoJyNkYXRlYmVnaW4nKS52YWwoZXZudC5zdGFydC5mb3JtYXQoJ1lZWVktTU0tREQgaGg6bW0nKSk7XG5cdFx0JCgnI2RhdGVlbmQnKS52YWwoZXZudC5lbmQuZm9ybWF0KCdZWVlZLU1NLUREIGhoOm1tJykpO1xuXHRcdCQoJyNldmVudC10aXRsZScpLnZhbChldm50LnRpdGxlKTtcblx0XHQkKCcjcG9zdGNvZGUnKS52YWwoZXZudC5wb3N0YWxDb2RlKTtcblx0XHQkKCcjc3RhdHVzJykudmFsKGV2bnQuc3RhdHVzKTtcblx0XHQkKFwiI2Rlc2NyaXB0aW9uXCIpLnZhbChldm50LmRlc2NyaXB0aW9uKTtcblx0XHQkKCcjZXhlY3V0b3InKS52YWwoZXZudC5leGVjdXRvcik7XG5cblxuXHRcdCQoXCIjc2F2ZS1ldmVudC1idG5cIikub24oJ2NsaWNrJyxmdW5jdGlvbihlKSB7XG5cblx0XHRcdGNvbnNvbGUubG9nKCdzYXZlIGZyb20gbW9kYWwnKTtcblx0XHRcdHZhciAgX2V2ZW50PXt9O1xuXG5cdFx0XHRfZXZlbnQudGl0bGU9c2VsZi5ldmVudC50aXRsZSA9ICQoJyNldmVudC10aXRsZScpLnZhbCgpO1xuXHRcdFx0X2V2ZW50LnN0YXJ0PXNlbGYuZXZlbnQuc3RhcnQgPSBtb21lbnQoJCgnI2RhdGViZWdpbicpLnZhbCgpKTtcblx0XHRcdF9ldmVudC5lbmQ9c2VsZi5ldmVudC5lbmQgPSBtb21lbnQoJCgnI2RhdGVlbmQnKS52YWwoKSk7XG5cdFx0XHRfZXZlbnQucG9zdGFsQ29kZT1zZWxmLmV2ZW50LnBvc3RhbENvZGUgPSAkKCcjcG9zdGNvZGUnKS52YWwoKTtcblx0XHRcdF9ldmVudC5zdGF0dXM9c2VsZi5ldmVudC5zdGF0dXMgPSAkKCcjc3RhdHVzJykudmFsKCk7XG5cdFx0XHRfZXZlbnQuZGVzY3JpcHRpb249c2VsZi5ldmVudC5kZXNjcmlwdGlvbiA9ICQoXCIjZGVzY3JpcHRpb25cIikudmFsKCk7XG5cdFx0XHRfZXZlbnQuZXhlY3V0b3I9c2VsZi5ldmVudC5leGVjdXRvciA9ICQoJyNleGVjdXRvcicpLnZhbCgpO1xuXG5cdFx0XHQkLmFqYXgoe1xuXHRcdFx0XHR0eXBlOiAnUE9TVCcsXG5cdFx0XHRcdHVybDogJy91c2Vycy91cGRhdGUvJytzZWxmLmV2ZW50Ll9pZCxcblx0XHRcdFx0ZGF0YTogSlNPTi5zdHJpbmdpZnkoX2V2ZW50KSxcblx0XHRcdFx0ZGF0YVR5cGU6IFwianNvblwiLFxuXHRcdFx0XHRjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG5cdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcImRhdGEgdXBkYXRlXCIpO1xuXHRcdFx0XHRcdCQoJyNjYWxlbmRhcicpLmZ1bGxDYWxlbmRhcigndXBkYXRlRXZlbnQnLCBzZWxmLmV2ZW50KTtcblx0XHRcdFx0XHQkKCcjY2FsZW5kYXInKS5mdWxsQ2FsZW5kYXIoJ3JlcmVuZGVyRXZlbnRzJyk7XHRcdFx0XHRcdFxuXHRcdFx0XHRcdCQoJyNtb2RhbCcpLm1vZGFsKCdoaWRlJyk7XG5cdFx0XHRcdFx0Lyp2YXIgX21vZGFsID0gcmVxdWlyZSgnLi4vdmlldy9hbGxvay5qYWRlJyk7XG5cdFx0XHRcdFx0JCgnLm1vZGFsLXBsYWNlJykuaHRtbChfbW9kYWwoKSk7XG5cdFx0XHRcdFx0JCgnI21vZGFsJykubW9kYWwoJ3Nob3cnKTsqL1xuXG5cdFx0XHRcdH0sXG5cdFx0XHRcdC8vZXJyb3I6IGFqYXhFcnJvclxuXHRcdFx0fSk7XHRcdFx0XG5cdFx0fSk7XG5cdFx0JCgnI2RlbGV0ZS1ldmVudC1idG4nKS5vbignY2xpY2snLGZ1bmN0aW9uKGUpe1xuXHRcdFx0JC5hamF4KHtcblx0XHRcdHR5cGU6ICdERUxFVEUnLFxuXHRcdFx0dXJsOiAnL3VzZXJzL2RlbC8nICsgc2VsZi5ldmVudC5faWQsXG5cdFx0XHRkYXRhVHlwZTogXCJqc29uXCIsXG5cdFx0XHRjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG5cdFx0XHRzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiZGF0YSBkZWxcIik7XG5cdFx0XHRcdCQoJyNjYWxlbmRhcicpLmZ1bGxDYWxlbmRhcigncmVtb3ZlRXZlbnRzJywgc2VsZi5ldmVudC5faWQpO1xuXHRcdFx0fSxcblx0XHRcdC8vZXJyb3I6IGFqYXhFcnJvclxuXHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0JCgnI21vZGFsJykub24oJ2hpZGRlbi5icy5tb2RhbCcsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdtb2RhbCBoaWRlJyk7XG5cdFx0XHRzZWxmLmRlc3Ryb3lNb2RhbCgpO1xuXG5cdFx0fSk7XG5cdH07XG5cblxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2pzL2Rldi9tb2R1bGUvZWRpdEV2ZW50TW9kYWwuanNcbi8vIG1vZHVsZSBpZCA9IDEyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCIvaG9tZS91YnVudHUvd29ya3NwYWNlL25vZGVfbW9kdWxlcy9qYWRlL2xpYi9ydW50aW1lLmpzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPGRpdiBpZD1cXFwibW9kYWxcXFwiIHRhYmluZGV4PVxcXCItMVxcXCIgcm9sZT1cXFwiZGlhbG9nXFxcIiBhcmlhLWxhYmVsbGVkYnk9XFxcIm15TW9kYWxMYWJlbFxcXCIgYXJpYS1oaWRkZW49XFxcInRydWVcXFwiIGNsYXNzPVxcXCJtb2RhbCBmYWRlXFxcIj48ZGl2IHJvbGU9XFxcImRvY3VtZW50XFxcIiBjbGFzcz1cXFwibW9kYWwtZGlhbG9nXFxcIj48ZGl2IGNsYXNzPVxcXCJtb2RhbC1jb250ZW50XFxcIj48ZGl2IGNsYXNzPVxcXCJtb2RhbC1oZWFkZXJcXFwiPjxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBkYXRhLWRpc21pc3M9XFxcIm1vZGFsXFxcIiBhcmlhLWxhYmVsPVxcXCJDbG9zZVxcXCIgY2xhc3M9XFxcImNsb3NlXFxcIj48c3BhbiBhcmlhLWhpZGRlbj1cXFwidHJ1ZVxcXCI+w5c8L3NwYW4+PC9idXR0b24+PGg0IGlkPVxcXCJteU1vZGFsTGFiZWxcXFwiIGNsYXNzPVxcXCJtb2RhbC10aXRsZVxcXCI+0KDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjQtS/Rg9C00LDQu9C10L3QuNC1PC9oND48L2Rpdj48ZGl2IGNsYXNzPVxcXCJtb2RhbC1ib2R5XFxcIj48Zm9ybSBhY3Rpb249XFxcIlxcXCI+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7Qt9Cw0LPQvtC70L7QstC+0Lo8L2xhYmVsPjxpbnB1dCBpZD1cXFwiZXZlbnQtdGl0bGVcXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0L3QsNGH0LDQu9C+PC9sYWJlbD48aW5wdXQgaWQ9XFxcImRhdGViZWdpblxcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbCBmbGF0cGlja3JcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0L7QutC+0L3Rh9Cw0L3QuNC1PC9sYWJlbD48aW5wdXQgaWQ9XFxcImRhdGVlbmRcXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2wgZmxhdHBpY2tyXFxcIj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj48bGFiZWwgZm9yPVxcXCJcXFwiPtC+0YLQtNC10LvQtdC90LjQtSDQv9C+0LvRg9GH0LDRgtC10LvRjDwvbGFiZWw+PGlucHV0IGlkPVxcXCJwb3N0Y29kZVxcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7QvtC/0LjRgdCw0L3QuNC1PC9sYWJlbD48aW5wdXQgaWQ9XFxcImRlc2NyaXB0aW9uXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj48bGFiZWwgZm9yPVxcXCJcXFwiPtGB0YLQsNGC0YPRgTwvbGFiZWw+PGlucHV0IGlkPVxcXCJzdGF0dXNcXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0LjRgdC/0L7Qu9C90LjRgtC10LvRjDwvbGFiZWw+PGlucHV0IGlkPVxcXCJleGVjdXRvclxcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+PC9kaXY+PC9mb3JtPjwvZGl2PjxkaXYgY2xhc3M9XFxcIm1vZGFsLWZvb3RlclxcXCI+PGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGRhdGEtZGlzbWlzcz1cXFwibW9kYWxcXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+Q2xvc2U8L2J1dHRvbj48YnV0dG9uIGlkPVxcXCJzYXZlLWV2ZW50LWJ0blxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1wcmltYXJ5XFxcIj5TYXZlIGNoYW5nZXM8L2J1dHRvbj48YnV0dG9uIGlkPVxcXCJkZWxldGUtZXZlbnQtYnRuXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLWRhbmdlclxcXCI+RGVsZXRlPC9idXR0b24+PC9kaXY+PC9kaXY+PC9kaXY+PC9kaXY+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvanMvZGV2L3ZpZXcvZWRpdGRlbEV2ZW50LmphZGVcbi8vIG1vZHVsZSBpZCA9IDEyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXG5cdHZhciBfbGlzdDtcblx0dmFyIHNlbGYgPSB0aGlzO1xuXHR2YXIgbGNhcmQgPSByZXF1aXJlKCcuLi92aWV3L2xpc3RzY2FyZC5qYWRlJyk7XG5cdHZhciBsaXN0aHRtbCA9IHJlcXVpcmUoJy4uL3ZpZXcvbGlzdHN2aWV3LmphZGUnKTtcblxuXHR0aGlzLmRlc3Ryb3lNb2RhbCA9IGZ1bmN0aW9uKCkge1xuXG5cdFx0Ly8kKFwiI3NhdmUtZXZlbnQtYnRuXCIpLm9mZignY2xpY2snKTtcblx0XHQkKCcubW9kYWwtcGxhY2UnKS5odG1sKCcnKTtcblx0fTtcblxuXHR0aGlzLmluaXQgPSBmdW5jdGlvbigpIHtcblxuXHRcdCQoJy5saXN0LXBsYWNlJykuaHRtbChsY2FyZCgpKTtcblx0XHQkKCcjY2xlYXItbGlzdC1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0Y29uc29sZS5sb2coJ2xpc3QgY2xlYXInKTtcblx0XHRcdF9saXN0ID0gbnVsbDtcblx0XHR9KTtcblx0XHQkKCcjYWRkLXRvLWxpc3QtYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuXHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdHZhciBfbW9kYWwgPSByZXF1aXJlKCcuLi92aWV3L2xpc3RmaWx0ZXJtb2RhbC5qYWRlJyk7XG5cdFx0XHQkKCcubW9kYWwtcGxhY2UnKS5odG1sKF9tb2RhbCgpKTtcblx0XHRcdCQoJyNsb2FkLWZpbHRlci1saXN0LWJ0bicpLm9uKCdjbGljaycsIGxvYWRGaWx0ZXJlZExpc3QpO1xuXHRcdFx0JCgnI21vZGFsJykubW9kYWwoJ3Nob3cnKTtcblx0XHRcdCQoXCIuZmxhdHBpY2tyXCIpLmZsYXRwaWNrcih7XG5cdFx0XHRcdGVuYWJsZVRpbWU6IHRydWUsXG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXG5cdFx0JCgnI21vZGFsJykub24oJ2hpZGRlbi5icy5tb2RhbCcsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdtb2RhbCBoaWRlJyk7XG5cdFx0XHRzZWxmLmRlc3Ryb3lNb2RhbCgpO1xuXHRcdH0pO1xuXG5cdFx0JCgnI3NlbmQtbGlzdC1tYWlsJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuXHRcdFx0aWYgKF9saXN0Lmxlbmd0aCA+IDApIHtcblx0XHRcdFx0aWYgKCQoJyNleGVjZW1haWwnKS52YWwoKSkge1xuXG5cdFx0XHRcdFx0dmFyIGVtYWlsdHh0PXtcInR4dFwiOmxpc3RodG1sKHtcImRhdGFcIjogX2xpc3R9KX07XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coZW1haWx0eHQpO1xuXG5cdFx0XHRcdFx0JC5hamF4KHtcblx0XHRcdFx0XHRcdHR5cGU6ICdQT1NUJyxcblx0XHRcdFx0XHRcdHVybDogJy91c2Vycy9lbWFpbGxpc3QnLFxuXHRcdFx0XHRcdFx0ZGF0YTogSlNPTi5zdHJpbmdpZnkoZW1haWx0eHQpLFxuXHRcdFx0XHRcdFx0ZGF0YVR5cGU6IFwianNvblwiLFxuXHRcdFx0XHRcdFx0Y29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuXHRcdFx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuXHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhcInNlYXJjaCBva1wiKTtcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHQvL2Vycm9yOiBhamF4RXJyb3Jcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdH07XG5cblx0dGhpcy5kZXN0cm95ID0gZnVuY3Rpb24oKSB7XG5cblx0fTtcblxuXHRmdW5jdGlvbiBsb2FkRmlsdGVyZWRMaXN0KCkge1xuXHRcdHZhciBscXVlcnkgPSB7fTtcblx0XHQkKCcubC1xdWVyeScpLmVhY2goZnVuY3Rpb24oaSwgZWwpIHtcblx0XHRcdGlmICgkKGVsKS52YWwoKSkge1xuXHRcdFx0XHRscXVlcnlbJChlbCkuYXR0cignZGF0YS1scXVlcnktbmFtZScpXSA9ICQoZWwpLnZhbCgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdGNvbnNvbGUubG9nKGxxdWVyeSk7XG5cblx0XHQkLmFqYXgoe1xuXHRcdFx0dHlwZTogJ1BPU1QnLFxuXHRcdFx0dXJsOiAnL3VzZXJzL2xxdWVyeScsXG5cdFx0XHRkYXRhOiBKU09OLnN0cmluZ2lmeShscXVlcnkpLFxuXHRcdFx0ZGF0YVR5cGU6IFwianNvblwiLFxuXHRcdFx0Y29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuXHRcdFx0c3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcInNlYXJjaCBva1wiKTtcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XG5cdFx0XHRcdF9saXN0ID0gZGF0YTtcblx0XHRcdFx0cmVuZGVyTGlzdChfbGlzdCk7XG5cdFx0XHR9LFxuXHRcdFx0Ly9lcnJvcjogYWpheEVycm9yXG5cdFx0fSk7XG5cdH1cblxuXHRmdW5jdGlvbiByZW5kZXJMaXN0KF9fbGlzdCkge1xuXHRcdCQoJyNsaXN0cGxhY2UnKS5odG1sKGxpc3RodG1sKHtcblx0XHRcdFwiZGF0YVwiOiBfX2xpc3Rcblx0XHR9KSk7XG5cblx0XHQkKCcuZWRpdC1ldm50LWxpc3QnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0Y29uc29sZS5sb2coJ2VkaXQgY2xpY2sgY2xhY2sgKScpO1xuXHRcdH0pO1xuXHRcdCQoJy5yZW1vdmUtZXZudC1saXN0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuXHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdHZhciBfX2lkID0gJChlLmN1cnJlbnRUYXJnZXQpLnBhcmVudCgpLmF0dHIoJ2RhdGEtZXZudC1pZCcpO1xuXHRcdFx0dmFyIGluZHg7XG5cdFx0XHRfbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGV2bnQsIGkpIHtcblx0XHRcdFx0aWYgKGV2bnQuX2lkID09IF9faWQpIHtcblx0XHRcdFx0XHRpbmR4ID0gaTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRfbGlzdC5zcGxpY2UoaW5keCwgMSk7XG5cdFx0XHRyZW5kZXJMaXN0KF9saXN0KTtcblx0XHR9KTtcblxuXHR9XG5cblxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy9qcy9kZXYvbW9kdWxlL2xpc3Rtb2QuanNcbi8vIG1vZHVsZSBpZCA9IDEyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCIvaG9tZS91YnVudHUvd29ya3NwYWNlL25vZGVfbW9kdWxlcy9qYWRlL2xpYi9ydW50aW1lLmpzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwiY2FyZFxcXCI+PGRpdiBjbGFzcz1cXFwiY2FyZC1oZWFkZXJcXFwiPjx1bCBjbGFzcz1cXFwibmF2IG5hdi1waWxscyBjYXJkLWhlYWRlci1waWxscyBmbG9hdC14cy1sZWZ0XFxcIj48bGkgY2xhc3M9XFxcIm5hdi1pdGVtXFxcIj48YSBpZD1cXFwiYWRkLXRvLWxpc3QtYnRuXFxcIiBocmVmPVxcXCIjXFxcIiBjbGFzcz1cXFwibmF2LWxpbmtcXFwiPtCh0L/QuNGB0L7Qui/QlNC+0LHQsNCy0LjRgtGMPC9hPjwvbGk+PGxpIGNsYXNzPVxcXCJuYXYtaXRlbVxcXCI+PGEgaWQ9XFxcImNsZWFyLWxpc3QtYnRuXFxcIiBocmVmPVxcXCIjXFxcIiBjbGFzcz1cXFwibmF2LWxpbmtcXFwiPtCe0YfQuNGB0YLQuNGC0Yw8L2E+PC9saT48L3VsPjwvZGl2PjxkaXYgY2xhc3M9XFxcImNhcmQtYmxvY2tcXFwiPjxoNCBjbGFzcz1cXFwiY2FyZC10aXRsZVxcXCI+IDwvaDQ+PGRpdiBpZD1cXFwibGlzdHBsYWNlXFxcIiBjbGFzcz1cXFwiY2FyZC10ZXh0XFxcIj5cXHRcXHRcXHRcXHRcXHRcXHQ8L2Rpdj48aW5wdXQgaWQ9XFxcImV4ZWNlbWFpbFxcXCIgdHlwZT1cXFwiZW1haWxcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiPjxhIGlkPVxcXCJzZW5kLWxpc3QtbWFpbFxcXCIgaHJlZj1cXFwiI1xcXCIgY2xhc3M9XFxcImJ0biBidG4tcHJpbWFyeVxcXCI+0L3QsCDQv9C+0YfRgtGDINC40YHQv9C+0LvQvdC40YLQtdC70Y48L2E+PC9kaXY+PC9kaXY+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvanMvZGV2L3ZpZXcvbGlzdHNjYXJkLmphZGVcbi8vIG1vZHVsZSBpZCA9IDEyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCIvaG9tZS91YnVudHUvd29ya3NwYWNlL25vZGVfbW9kdWxlcy9qYWRlL2xpYi9ydW50aW1lLmpzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAoZGF0YSwgdW5kZWZpbmVkKSB7XG5idWYucHVzaChcIjxoND7QodC/0LjRgdC+0LpcXHQ8dWwgY2xhc3M9XFxcImxpc3QtZ3JvdXBcXFwiPjwvdWw+XCIpO1xuLy8gaXRlcmF0ZSBkYXRhXHRcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gZGF0YVx0O1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIgZXZudCA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGxpXCIgKyAoamFkZS5hdHRyKFwiZGF0YS1ldm50LWlkXCIsICcnICsgKGV2bnQuX2lkKSArICcnLCB0cnVlLCB0cnVlKSkgKyBcIiBjbGFzcz1cXFwibGlzdC1ncm91cC1pdGVtIGxpc3QtZ3JvdXAtaXRlbS1hY3Rpb25cXFwiPlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IGV2bnQudGl0bGUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIjxhIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJyZW1vdmUtZXZudC1saXN0XFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtdHJhc2gtbyBmYS1md1xcXCI+PC9pPjwvYT48YSBocmVmPVxcXCIjXFxcIiBjbGFzcz1cXFwiZWRpdC1ldm50LWxpc3RcXFwiPlxcdFxcdDxpIGNsYXNzPVxcXCJmYSBmYS1wZW5jaWwgZmEtZndcXFwiPlxcdFxcdFxcdFxcdDwvaT48L2E+PC9saT5cIik7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIgZXZudCA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGxpXCIgKyAoamFkZS5hdHRyKFwiZGF0YS1ldm50LWlkXCIsICcnICsgKGV2bnQuX2lkKSArICcnLCB0cnVlLCB0cnVlKSkgKyBcIiBjbGFzcz1cXFwibGlzdC1ncm91cC1pdGVtIGxpc3QtZ3JvdXAtaXRlbS1hY3Rpb25cXFwiPlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IGV2bnQudGl0bGUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIjxhIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJyZW1vdmUtZXZudC1saXN0XFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtdHJhc2gtbyBmYS1md1xcXCI+PC9pPjwvYT48YSBocmVmPVxcXCIjXFxcIiBjbGFzcz1cXFwiZWRpdC1ldm50LWxpc3RcXFwiPlxcdFxcdDxpIGNsYXNzPVxcXCJmYSBmYS1wZW5jaWwgZmEtZndcXFwiPlxcdFxcdFxcdFxcdDwvaT48L2E+PC9saT5cIik7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbmJ1Zi5wdXNoKFwiPC9oND5cIik7fS5jYWxsKHRoaXMsXCJkYXRhXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5kYXRhOnR5cGVvZiBkYXRhIT09XCJ1bmRlZmluZWRcIj9kYXRhOnVuZGVmaW5lZCxcInVuZGVmaW5lZFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgudW5kZWZpbmVkOnR5cGVvZiB1bmRlZmluZWQhPT1cInVuZGVmaW5lZFwiP3VuZGVmaW5lZDp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2pzL2Rldi92aWV3L2xpc3Rzdmlldy5qYWRlXG4vLyBtb2R1bGUgaWQgPSAxMjRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGphZGUgPSByZXF1aXJlKFwiL2hvbWUvdWJ1bnR1L3dvcmtzcGFjZS9ub2RlX21vZHVsZXMvamFkZS9saWIvcnVudGltZS5qc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIjxkaXYgaWQ9XFxcIm1vZGFsXFxcIiB0YWJpbmRleD1cXFwiLTFcXFwiIHJvbGU9XFxcImRpYWxvZ1xcXCIgYXJpYS1sYWJlbGxlZGJ5PVxcXCJteU1vZGFsTGFiZWxcXFwiIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIiBjbGFzcz1cXFwibW9kYWwgZmFkZVxcXCI+PGRpdiByb2xlPVxcXCJkb2N1bWVudFxcXCIgY2xhc3M9XFxcIm1vZGFsLWRpYWxvZ1xcXCI+PGRpdiBjbGFzcz1cXFwibW9kYWwtY29udGVudFxcXCI+PGRpdiBjbGFzcz1cXFwibW9kYWwtaGVhZGVyXFxcIj48YnV0dG9uIGlkPVxcXCJjbG9zZS1tb2RhbC1jcm9zcy1idG5cXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgZGF0YS1kaXNtaXNzPVxcXCJtb2RhbFxcXCIgYXJpYS1sYWJlbD1cXFwiQ2xvc2VcXFwiIGNsYXNzPVxcXCJjbG9zZVxcXCI+PHNwYW4gYXJpYS1oaWRkZW49XFxcInRydWVcXFwiPsOXPC9zcGFuPjwvYnV0dG9uPjxoNCBpZD1cXFwibXlNb2RhbExhYmVsXFxcIiBjbGFzcz1cXFwibW9kYWwtdGl0bGVcXFwiPtCk0LjQu9GM0YLRgDwvaDQ+PC9kaXY+PGRpdiBjbGFzcz1cXFwibW9kYWwtYm9keVxcXCI+PGZvcm0gYWN0aW9uPVxcXCJcXFwiPjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0LfQsNCz0L7Qu9C+0LLQvtC6PC9sYWJlbD48aW5wdXQgaWQ9XFxcImV2ZW50LXRpdGxlXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBkYXRhLWxxdWVyeS1uYW1lPVxcXCJ0aXRsZVxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbCBsLXF1ZXJ5XFxcIj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj48bGFiZWwgZm9yPVxcXCJcXFwiPtC90LDRh9Cw0LvQvjwvbGFiZWw+PGlucHV0IGlkPVxcXCJkYXRlYmVnaW5cXFwiIHR5cGU9XFxcInRleHRcXFwiIGRhdGEtbHF1ZXJ5LW5hbWU9XFxcInN0YXJ0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sIGwtcXVlcnkgZmxhdHBpY2tyXFxcIj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj48bGFiZWwgZm9yPVxcXCJcXFwiPtC+0LrQvtC90YfQsNC90LjQtTwvbGFiZWw+PGlucHV0IGlkPVxcXCJkYXRlZW5kXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBkYXRhLWxxdWVyeS1uYW1lPVxcXCJlbmRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2wgbC1xdWVyeSBmbGF0cGlja3JcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0L7RgtC00LXQu9C10L3QuNC1INC/0L7Qu9GD0YfQsNGC0LXQu9GMPC9sYWJlbD48aW5wdXQgaWQ9XFxcInBvc3Rjb2RlXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBkYXRhLWxxdWVyeS1uYW1lPVxcXCJwb3N0YWxDb2RlXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sIGwtcXVlcnlcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0L7Qv9C40YHQsNC90LjQtTwvbGFiZWw+PGlucHV0IGlkPVxcXCJkZXNjcmlwdGlvblxcXCIgdHlwZT1cXFwidGV4dFxcXCIgZGF0YS1scXVlcnktbmFtZT1cXFwiZGVzY3JpcHRpb25cXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2wgbC1xdWVyeVxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7RgdGC0LDRgtGD0YE8L2xhYmVsPjxpbnB1dCBpZD1cXFwic3RhdHVzXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBkYXRhLWxxdWVyeS1uYW1lPVxcXCJzdGF0dXNcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2wgbC1xdWVyeVxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7QuNGB0L/QvtC70L3QuNGC0LXQu9GMPC9sYWJlbD48aW5wdXQgaWQ9XFxcImV4ZWN1dG9yXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBkYXRhLWxxdWVyeS1uYW1lPVxcXCJleGVjdXRvclxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbCBsLXF1ZXJ5XFxcIj48L2Rpdj48L2Zvcm0+PC9kaXY+PGRpdiBjbGFzcz1cXFwibW9kYWwtZm9vdGVyXFxcIj48YnV0dG9uIGlkPVxcXCJjbG9zZS1tb2RhbC1idG5cXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgZGF0YS1kaXNtaXNzPVxcXCJtb2RhbFxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj5DbG9zZTwvYnV0dG9uPjxidXR0b24gaWQ9XFxcImxvYWQtZmlsdGVyLWxpc3QtYnRuXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXByaW1hcnlcXFwiPtCh0YTQvtGA0LzQuNGA0L7QstCw0YLRjDwvYnV0dG9uPjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2PlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2pzL2Rldi92aWV3L2xpc3RmaWx0ZXJtb2RhbC5qYWRlXG4vLyBtb2R1bGUgaWQgPSAxMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDMUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzNHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzVFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzdGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDekhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OyIsInNvdXJjZVJvb3QiOiIifQ==