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

		var myMap=__webpack_require__(126);	
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

/***/ 126:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	module.exports = function() {
		console.log('map4p.js');

		var _mapjade=__webpack_require__(127);
		$('.c-place').html(_mapjade());

		var _podetail = __webpack_require__(128);
		var poDetail=new _podetail();

		var _pathList=__webpack_require__(130);
		var pathList=new _pathList();

		var _save = true;
		var _event, _postOfficeArr;
		var myCollection = new ymaps.GeoObjectCollection();
		var _route;
		
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
						
						var points = route.getWayPoints();
						points.options.set('preset', 'islands#blueStretchyIcon');
	        			points.each(function(el, i){
	        				el.properties.set('iconContent',selectedEl[i].postalCode+" точка №"+(i+1));
	        				el.properties.set('balloonContent',selectedEl[i].postalCode+" точка №"+(i+1));
	        			});
						
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

/***/ 127:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(5);

	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;

	buf.push("<div id=\"mapy\" style=\"width: 100%; height: 800px\"></div>");;return buf.join("");
	}

/***/ },

/***/ 128:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use srtict';

	module.exports=function(){

	  this._modal = __webpack_require__(129);

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

/***/ 129:
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

/***/ 130:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	module.exports = function() {

		this.plJade = __webpack_require__(131);
		this.elJade = __webpack_require__(132);
		this.nestedListJade = __webpack_require__(133);
		this.pdfJade = __webpack_require__(134);
		this.evntDetailJade = __webpack_require__(135);
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
				//url: "./testevent.json",
				url:"/users/evnt/"+_data.postalCode,
				dataType: "json",
				success: function(data) {
					console.log('success load data');
					console.log(data);
					_data.evnts=data;
					$('[data-po-id=' + _data.postalCode + ']').find('i.fa-spinner').remove();
					$('[data-po-id=' + _data.postalCode + ']').append(self.nestedListJade({
							"data": data
					}));
					$('[data-po-id=' + _data.postalCode + ']').on('click', self.listenEvnt);
					/*rarr = data.filter(function(evnt) {
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
					}, /*Math.floor(Math.random() * 10000)*/ /*10);*/
				},
				error: function(err) {
					console.log('ошибка (');
					console.log(err);
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

/***/ 131:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(5);

	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;

	buf.push("<div class=\"card\"><div class=\"card-header\"><ul class=\"nav nav-pills card-header-pills float-xs-left\"><li class=\"nav-item\"><a id=\"clear-plist-btn\" href=\"#\" class=\"nav-link\">Очистить</a></li></ul></div><div class=\"card-block\"><h4 class=\"card-title\"> </h4><div class=\"card-text\"><h4>Список\t<ul id=\"path-list\" class=\"list-group\"></ul></h4></div><!--input#execemail.form-control(type='email')--><a id=\"create-path-btn\" href=\"#\" class=\"btn btn-primary\">создать маршрут</a></div><div class=\"card-footer text-muted\"><a id=\"print-path-btn\" href=\"#\" class=\"btn btn-primary\">печатать</a><a id=\"other-path-btn\" href=\"#\" class=\"btn btn-default\">еще чего-то</a></div></div>");;return buf.join("");
	}

/***/ },

/***/ 132:
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

/***/ 133:
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

/***/ 134:
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

/***/ 135:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(5);

	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;

	buf.push("<div id=\"modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\" class=\"modal fade\"><div role=\"document\" class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" data-dismiss=\"modal\" aria-label=\"Close\" class=\"close\"><span aria-hidden=\"true\">×</span></button><h4 id=\"myModalLabel\" class=\"modal-title\">Редактирование/удаление</h4></div><div class=\"modal-body\"><form action=\"\"><div class=\"form-group\"><label for=\"\">заголовок</label><input id=\"event-title\" type=\"text\" class=\"form-control\"></div><div class=\"form-group\"><label for=\"\">начало</label><input id=\"datebegin\" type=\"text\" class=\"form-control flatpickr\"></div><div class=\"form-group\"><label for=\"\">окончание</label><input id=\"dateend\" type=\"text\" class=\"form-control flatpickr\"></div><div class=\"form-group\"><label for=\"\">отделение получатель</label><input id=\"postcode\" type=\"text\" class=\"form-control\"></div><div class=\"form-group\"><label for=\"\">описание</label><input id=\"description\" type=\"text\" class=\"form-control\"></div><div class=\"form-group\"><label for=\"\">статус</label><input id=\"status\" type=\"text\" class=\"form-control\"></div><div class=\"form-group\"><label for=\"\">исполнитель</label><input id=\"executor\" type=\"text\" class=\"form-control\"></div></form></div><div class=\"modal-footer\"><button type=\"button\" data-dismiss=\"modal\" class=\"btn btn-secondary\">Close</button><!--button#save-event-btn.btn.btn-primary(type='button') Save changes--><!--button#delete-event-btn.btn.btn-danger(type='button') Delete--></div></div></div></div>");;return buf.join("");
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
						//var evntArray = $('#calendar').fullCalendar('clientEvents');
						//var _evnt = evntArray[evntArray.length - 1];
					//	_evnt._id = data.insertedid;

					//	$('#calendar').fullCalendar('updateEvent', _evnt);
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

/***/ }

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aGFwcC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3B1YmxpYy9qcy9kZXYvcG0vYXBwLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9kZXYvcG0vbW9kdWxlL21hcDRwLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9kZXYvcG0vdmlldy9tYXAuamFkZSIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3BtL21vZHVsZS9wb0RldGFpbC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3BtL3ZpZXcvcG9EZXRhaWwuamFkZSIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3BtL21vZHVsZS9wYXRoTGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3BtL3ZpZXcvcGF0aExpc3QuamFkZSIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3BtL3ZpZXcvbGlzdEVsLmphZGUiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2Rldi9wbS92aWV3L3N1Ymxpc3QuamFkZSIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3BtL3ZpZXcvcGRmUGF0aExpc3QuamFkZSIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3BtL3ZpZXcvZWRpdGRlbEV2ZW50LmphZGUiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2Rldi9wbS9tb2R1bGUvbmV3RXZlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2Rldi9wbS92aWV3L25ld0V2ZW50LmphZGUiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vL21vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG5jb25zb2xlLmxvZygnaGkgcGNodCcpO1xuXG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1x0XG5cblx0JChcIi5mbGF0cGlja3JcIikuZmxhdHBpY2tyKHtcblx0XHRlbmFibGVUaW1lOiB0cnVlLFxuXHR9KTtcblxuXHR2YXIgbXlNYXA9cmVxdWlyZSgnLi9tb2R1bGUvbWFwNHAuanMnKTtcdFxuXHR5bWFwcy5yZWFkeShpbml0KTtcblx0dmFyIF9teU1hcDtcblx0dmFyIG5ldm50PXJlcXVpcmUoJy4vbW9kdWxlL25ld0V2ZW50LmpzJyk7XG5cblx0ZnVuY3Rpb24gaW5pdCgpIHtcblx0XHRcblx0XHRfbXlNYXA9bXlNYXAoKTtcblxuXHRcdCQoJyNtYXAtbG9hZC1saW5rJykuY2xpY2soZnVuY3Rpb24oKXtcblx0XHRcdF9teU1hcC5kZXN0cm95KCk7XG5cdFx0XHRfbXlNYXA9bnVsbDtcblx0XHRcdF9teU1hcD1teU1hcCgpO1xuXG5cdFx0fSk7XG5cblx0XHQkKCcjbmV3LWV2bnQtbGluaycpLmNsaWNrKGZ1bmN0aW9uKGUpe1xuXHRcdFx0dmFyIF9uZXZudD0gbmV3IG5ldm50KCk7XG5cdFx0XHRfbmV2bnQuaW5pdCgpO1xuXHRcdH0pO1xuXHR9XG5cblxuXG59KTtcblxuLy99XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvanMvZGV2L3BtL2FwcC5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG5cdGNvbnNvbGUubG9nKCdtYXA0cC5qcycpO1xuXG5cdHZhciBfbWFwamFkZT1yZXF1aXJlKCcuLi92aWV3L21hcC5qYWRlJyk7XG5cdCQoJy5jLXBsYWNlJykuaHRtbChfbWFwamFkZSgpKTtcblxuXHR2YXIgX3BvZGV0YWlsID0gcmVxdWlyZSgnLi4vbW9kdWxlL3BvRGV0YWlsLmpzJyk7XG5cdHZhciBwb0RldGFpbD1uZXcgX3BvZGV0YWlsKCk7XG5cblx0dmFyIF9wYXRoTGlzdD1yZXF1aXJlKCcuLi9tb2R1bGUvcGF0aExpc3QuanMnKTtcblx0dmFyIHBhdGhMaXN0PW5ldyBfcGF0aExpc3QoKTtcblxuXHR2YXIgX3NhdmUgPSB0cnVlO1xuXHR2YXIgX2V2ZW50LCBfcG9zdE9mZmljZUFycjtcblx0dmFyIG15Q29sbGVjdGlvbiA9IG5ldyB5bWFwcy5HZW9PYmplY3RDb2xsZWN0aW9uKCk7XG5cdHZhciBfcm91dGU7XG5cdFxuXHR2YXIgbXlCYWxsb29uQ29udGVudEJvZHlMYXlvdXQgPSB5bWFwcy50ZW1wbGF0ZUxheW91dEZhY3RvcnkuY3JlYXRlQ2xhc3MoXG5cdFx0XHRcdCc8cD4kW3Byb3BlcnRpZXMuZGF0YS5wb3N0YWxDb2RlXTwvcD48cD4kW3Byb3BlcnRpZXMuZGF0YS5hZGRyZXNzU291cmNlXTwvcD48cD4kW3Byb3BlcnRpZXMuZGF0YS50eXBlQ29kZV08L3A+PGJyIC8+PGJ1dHRvbiBpZD1cInNob3ctcG8tZGV0YWlsLWJ0blwiPtCf0L7QtNGA0L7QsdC90L48L2J1dHRvbj48YnIgLz48YnV0dG9uIGlkPVwiYWRkLXRvLXBhdGgtYnRuXCI+0JIg0YHQv9C40YHQvtC6PC9idXR0b24+Jywge1xuXHRcdFx0XHRcdGJ1aWxkOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdG15QmFsbG9vbkNvbnRlbnRCb2R5TGF5b3V0LnN1cGVyY2xhc3MuYnVpbGQuY2FsbCh0aGlzKTtcblx0XHRcdFx0XHRcdCQoJyNzaG93LXBvLWRldGFpbC1idG4nKS5vbignY2xpY2snLCB7XG5cdFx0XHRcdFx0XHRcdFwicG9cIjogdGhpcy5fZGF0YS5wcm9wZXJ0aWVzLl9kYXRhXG5cdFx0XHRcdFx0XHR9LCB0aGlzLm9uU2hvd1BPRGV0YWlsQ2xpY2spO1xuXHRcdFx0XHRcdFx0JCgnI2FkZC10by1wYXRoLWJ0bicpLm9uKCdjbGljaycsIHtcblx0XHRcdFx0XHRcdFx0XCJwb1wiOiB0aGlzLl9kYXRhLnByb3BlcnRpZXMuX2RhdGFcblx0XHRcdFx0XHRcdH0sIHRoaXMub25BZGRUb1BhdGhDbGljayk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRjbGVhcjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHQkKCcjc2hvdy1wby1kZXRhaWwtYnRuJykub2ZmKCdjbGljaycsIHRoaXMub25TaG93UE9EZXRhaWxDbGljayk7XG5cdFx0XHRcdFx0XHRteUJhbGxvb25Db250ZW50Qm9keUxheW91dC5zdXBlcmNsYXNzLmNsZWFyLmNhbGwodGhpcyk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRvblNob3dQT0RldGFpbENsaWNrOiBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdFx0XHRwb0RldGFpbC5pbml0KGUuZGF0YS5wby5kYXRhLCBteU1hcCk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRvbkFkZFRvUGF0aENsaWNrOmZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdFx0cGF0aExpc3QuYWRkRWxlbWVudChlLmRhdGEucG8uZGF0YSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0dmFyIG15TWFwID0gbmV3IHltYXBzLk1hcChcIm1hcHlcIiwge1xuXHRcdGNlbnRlcjogWzUwLjU5LCAzNi41OF0sXG5cdFx0em9vbTogMTAsXG5cdFx0Y29udHJvbHM6IFsncm91dGVFZGl0b3InXVxuXHR9LCB7XG5cdFx0YnV0dG9uTWF4V2lkdGg6IDE1MFxuXHR9KTtcblxuXHRmdW5jdGlvbiBjcmVhdGVQYXRoKHNlbGVjdGVkRWwpe1xuXHRcdG15Q29sbGVjdGlvbi5yZW1vdmVBbGwoKTtcdFxuXHRcdGlmKF9yb3V0ZSlcblx0XHRcdG15TWFwLmdlb09iamVjdHMucmVtb3ZlKF9yb3V0ZSk7XHRcblxuXHRcdHZhciBwYXRoQXJyPXNlbGVjdGVkRWwubWFwKGZ1bmN0aW9uKG90ZCl7XG5cdFx0XHRcdHJldHVybiB7dHlwZTond2F5UG9pbnQnLHBvaW50OltvdGQubGF0aXR1ZGUsIG90ZC5sb25naXR1ZGVdfTtcblx0XHRcdH0pO1xuXHRcdFx0eW1hcHMucm91dGUocGF0aEFycikudGhlbihcblx0XHRcdFx0ZnVuY3Rpb24ocm91dGUpIHtcblx0XHRcdFx0XHRfcm91dGU9cm91dGU7XG5cdFx0XHRcdFx0bXlNYXAuZ2VvT2JqZWN0cy5hZGQocm91dGUpO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdHZhciBwb2ludHMgPSByb3V0ZS5nZXRXYXlQb2ludHMoKTtcblx0XHRcdFx0XHRwb2ludHMub3B0aW9ucy5zZXQoJ3ByZXNldCcsICdpc2xhbmRzI2JsdWVTdHJldGNoeUljb24nKTtcbiAgICAgICAgXHRcdFx0cG9pbnRzLmVhY2goZnVuY3Rpb24oZWwsIGkpe1xuICAgICAgICBcdFx0XHRcdGVsLnByb3BlcnRpZXMuc2V0KCdpY29uQ29udGVudCcsc2VsZWN0ZWRFbFtpXS5wb3N0YWxDb2RlK1wiINGC0L7Rh9C60LAg4oSWXCIrKGkrMSkpO1xuICAgICAgICBcdFx0XHRcdGVsLnByb3BlcnRpZXMuc2V0KCdiYWxsb29uQ29udGVudCcsc2VsZWN0ZWRFbFtpXS5wb3N0YWxDb2RlK1wiINGC0L7Rh9C60LAg4oSWXCIrKGkrMSkpO1xuICAgICAgICBcdFx0XHR9KTtcblx0XHRcdFx0XHRcblx0XHRcdFx0fSxcblx0XHRcdFx0ZnVuY3Rpb24oZXJyb3IpIHtcblx0XHRcdFx0XHRhbGVydChcItCS0L7Qt9C90LjQutC70LAg0L7RiNC40LHQutCwOiBcIiArIGVycm9yLm1lc3NhZ2UpO1xuXHRcdFx0XHR9XG5cdFx0XHQpO1xuXG5cdH1cblx0XG5cdCQuYWpheCh7XG5cdFx0dHlwZTogJ0dFVCcsXG5cdFx0dXJsOiBcIi4vcG9zdGFscy5qc29uXCIsXG5cdFx0ZGF0YVR5cGU6IFwianNvblwiLFxuXHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcblxuXHRcdFx0X3Bvc3RPZmZpY2VBcnIgPSBkYXRhO1xuXHRcdFx0XG5cdFx0XHRkYXRhLmZvckVhY2goZnVuY3Rpb24ob3RkKSB7XG5cblx0XHRcdFx0dmFyIHBtYXJrID0gbmV3IHltYXBzLlBsYWNlbWFyayhbb3RkLmxhdGl0dWRlLCBvdGQubG9uZ2l0dWRlXSxcdFx0XHRcdFx0XG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0ZGF0YTogb3RkLFxuXHRcdFx0XHRcdFx0aWNvbkNvbnRlbnQ6IG90ZC5wb3N0YWxDb2RlLFxuXHRcdFx0XHRcdFx0aWNvbkNhcHRpb246IG90ZC5wb3N0YWxDb2RlXG5cdFx0XHRcdFx0fSwge1xuXHRcdFx0XHRcdFx0YmFsbG9vbkNvbnRlbnRMYXlvdXQ6IG15QmFsbG9vbkNvbnRlbnRCb2R5TGF5b3V0LFxuXHRcdFx0XHRcdFx0cHJlc2V0OiAnaXNsYW5kcyNibGFja1N0cmV0Y2h5SWNvbidcblx0XHRcdFx0XHR9XG5cdFx0XHRcdCk7XHRcdFxuXHRcdFx0XHRteUNvbGxlY3Rpb24uYWRkKHBtYXJrKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRteU1hcC5nZW9PYmplY3RzLmFkZChteUNvbGxlY3Rpb24pO1xuXHRcdFx0cGF0aExpc3QuaW5pdChjcmVhdGVQYXRoKTtcblxuXHRcdH0sXG5cdFx0Ly9lcnJvcjogbG9hZEVycm9yXG5cdH0pO1xuXG5cdHJldHVybiBteU1hcDtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy9qcy9kZXYvcG0vbW9kdWxlL21hcDRwLmpzXG4vLyBtb2R1bGUgaWQgPSAxMjZcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIGphZGUgPSByZXF1aXJlKFwiL2hvbWUvdWJ1bnR1L3dvcmtzcGFjZS9ub2RlX21vZHVsZXMvamFkZS9saWIvcnVudGltZS5qc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIjxkaXYgaWQ9XFxcIm1hcHlcXFwiIHN0eWxlPVxcXCJ3aWR0aDogMTAwJTsgaGVpZ2h0OiA4MDBweFxcXCI+PC9kaXY+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvanMvZGV2L3BtL3ZpZXcvbWFwLmphZGVcbi8vIG1vZHVsZSBpZCA9IDEyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIndXNlIHNydGljdCc7XG5cbm1vZHVsZS5leHBvcnRzPWZ1bmN0aW9uKCl7XG5cbiAgdGhpcy5fbW9kYWwgPSByZXF1aXJlKCcuLi92aWV3L3BvRGV0YWlsLmphZGUnKTtcblxuICB0aGlzLmRlc3Ryb3lNb2RhbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgIFxuICAgICQoJyNjbG9zZS1tb2RhbC1idG4nKS5vZmYoJ2NsaWNrJyk7XG4gICAgJCgnI2Nsb3NlLW1vZGFsLWNyb3NzLWJ0bicpLm9mZignY2xpY2snKTtcbiAgICAkKCcubW9kYWwtcGxhY2UnKS5odG1sKCcnKTtcbiAgfTtcblxuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgdGhpcy5pbml0ID0gZnVuY3Rpb24oZGF0YSwgbXlNYXApIHtcblxuICAgICQoJy5tb2RhbC1wbGFjZScpLmh0bWwodGhpcy5fbW9kYWwoe1wiZGF0YVwiOiBkYXRhfSkpO1xuXG5cbiAgICAkKCcjY2xvc2UtbW9kYWwtYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuXG4gICAgfSk7XG5cbiAgICAkKCcjY2xvc2UtbW9kYWwtY3Jvc3MtYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuXG4gICAgfSk7XG5cbiAgICAkKCcjbW9kYWwnKS5tb2RhbCgnc2hvdycpO1xuXG4gICAgJCgnI21vZGFsJykub24oJ2hpZGRlbi5icy5tb2RhbCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdtb2RhbCBoaWRlJyk7XG4gICAgICBzZWxmLmRlc3Ryb3lNb2RhbCgpO1xuICAgIH0pO1xuXG4gIH07XG5cdFxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2pzL2Rldi9wbS9tb2R1bGUvcG9EZXRhaWwuanNcbi8vIG1vZHVsZSBpZCA9IDEyOFxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCIvaG9tZS91YnVudHUvd29ya3NwYWNlL25vZGVfbW9kdWxlcy9qYWRlL2xpYi9ydW50aW1lLmpzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAoZGF0YSwgdW5kZWZpbmVkKSB7XG5idWYucHVzaChcIjxkaXYgaWQ9XFxcIm1vZGFsXFxcIiB0YWJpbmRleD1cXFwiLTFcXFwiIHJvbGU9XFxcImRpYWxvZ1xcXCIgYXJpYS1sYWJlbGxlZGJ5PVxcXCJteU1vZGFsTGFiZWxcXFwiIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIiBjbGFzcz1cXFwibW9kYWwgZmFkZVxcXCI+PGRpdiByb2xlPVxcXCJkb2N1bWVudFxcXCIgY2xhc3M9XFxcIm1vZGFsLWRpYWxvZ1xcXCI+PGRpdiBjbGFzcz1cXFwibW9kYWwtY29udGVudFxcXCI+PGRpdiBjbGFzcz1cXFwibW9kYWwtaGVhZGVyXFxcIj48YnV0dG9uIGlkPVxcXCJjbG9zZS1tb2RhbC1jcm9zcy1idG5cXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgZGF0YS1kaXNtaXNzPVxcXCJtb2RhbFxcXCIgYXJpYS1sYWJlbD1cXFwiQ2xvc2VcXFwiIGNsYXNzPVxcXCJjbG9zZVxcXCI+PHNwYW4gYXJpYS1oaWRkZW49XFxcInRydWVcXFwiPsOXPC9zcGFuPjwvYnV0dG9uPjxoNCBpZD1cXFwibXlNb2RhbExhYmVsXFxcIiBjbGFzcz1cXFwibW9kYWwtdGl0bGVcXFwiPtCU0LXRgtCw0LvRjNC90L4gLSBcIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBkYXRhLnBvc3RhbENvZGUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIjwvaDQ+PC9kaXY+PGRpdiBjbGFzcz1cXFwibW9kYWwtYm9keVxcXCI+PGRpdiBjbGFzcz1cXFwiY2FyZFxcXCI+PGgzIGNsYXNzPVxcXCJjYXJkLWhlYWRlclxcXCI+XCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gZGF0YS5wb3N0YWxDb2RlKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCI8L2gzPjxkaXYgY2xhc3M9XFxcImNhcmQtYmxvY2tcXFwiPjxoNCBjbGFzcz1cXFwiY2FyZC10aXRsZVxcXCI+XCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gZGF0YS5wb3N0YWxDb2RlKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCIgXCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gZGF0YS5zZXR0bGVtZW50KSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCIgXCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gZGF0YS5hZGRyZXNzU291cmNlKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCI8L2g0PjxkaXYgY2xhc3M9XFxcImNhcmQtdGV4dFxcXCI+PGg0PtCf0YDQtdC00L7RgdGC0LDQstC70Y/QtdC80YvQtSDRg9GB0LvRg9Cz0Lg8L2g0Pjx1bD48L3VsPlwiKTtcbi8vIGl0ZXJhdGUgZGF0YS5zZXJ2aWNlR3JvdXBzXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IGRhdGEuc2VydmljZUdyb3VwcztcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIHNnID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8bGk+XCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gc2cuc2VydmljZUdyb3VwTmFtZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiPC9saT5cIik7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIgc2cgPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIjxsaT5cIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBzZy5zZXJ2aWNlR3JvdXBOYW1lKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCI8L2xpPlwiKTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxuYnVmLnB1c2goXCI8aDQ+0KLQtdC70LXRhNC+0L3RizwvaDQ+PHVsPlxcdFxcdFxcdDwvdWw+XCIpO1xuLy8gaXRlcmF0ZSBkYXRhLnBob25lc1xuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSBkYXRhLnBob25lcztcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIHBob25lID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8bGk+IChcIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBwaG9uZS5waG9uZVRvd25Db2RlKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCIpIFwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IHBob25lLnBob25lTnVtYmVyKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCIgKFwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IHBob25lLnBob25lVHlwZU5hbWUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIik8L2xpPlwiKTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBwaG9uZSA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGxpPiAoXCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gcGhvbmUucGhvbmVUb3duQ29kZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiKSBcIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBwaG9uZS5waG9uZU51bWJlcikgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiIChcIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBwaG9uZS5waG9uZVR5cGVOYW1lKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCIpPC9saT5cIik7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbmJ1Zi5wdXNoKFwiPGg0PtCS0YDQtdC80Y8g0YDQsNCx0L7RgtGLXFx0XFx0PC9oND48dWw+PC91bD5cIik7XG4vLyBpdGVyYXRlIGRhdGEud29ya2luZ0hvdXJzXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IGRhdGEud29ya2luZ0hvdXJzO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIgd2ggPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIjxsaT5cIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSB3aC53ZWVrRGF5TmFtZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiXFx0PC9saT5cIik7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIgd2ggPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIjxsaT5cIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSB3aC53ZWVrRGF5TmFtZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiXFx0PC9saT5cIik7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbmJ1Zi5wdXNoKFwiPC9kaXY+PC9kaXY+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cXFwibW9kYWwtZm9vdGVyXFxcIj48YnV0dG9uIGlkPVxcXCJjbG9zZS1tb2RhbC1idG5cXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgZGF0YS1kaXNtaXNzPVxcXCJtb2RhbFxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj5DbG9zZTwvYnV0dG9uPjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2PlwiKTt9LmNhbGwodGhpcyxcImRhdGFcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmRhdGE6dHlwZW9mIGRhdGEhPT1cInVuZGVmaW5lZFwiP2RhdGE6dW5kZWZpbmVkLFwidW5kZWZpbmVkXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC51bmRlZmluZWQ6dHlwZW9mIHVuZGVmaW5lZCE9PVwidW5kZWZpbmVkXCI/dW5kZWZpbmVkOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvanMvZGV2L3BtL3ZpZXcvcG9EZXRhaWwuamFkZVxuLy8gbW9kdWxlIGlkID0gMTI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblxuXHR0aGlzLnBsSmFkZSA9IHJlcXVpcmUoJy4uL3ZpZXcvcGF0aExpc3QuamFkZScpO1xuXHR0aGlzLmVsSmFkZSA9IHJlcXVpcmUoJy4uL3ZpZXcvbGlzdEVsLmphZGUnKTtcblx0dGhpcy5uZXN0ZWRMaXN0SmFkZSA9IHJlcXVpcmUoJy4uL3ZpZXcvc3VibGlzdC5qYWRlJyk7XG5cdHRoaXMucGRmSmFkZSA9IHJlcXVpcmUoJy4uL3ZpZXcvcGRmUGF0aExpc3QuamFkZScpO1xuXHR0aGlzLmV2bnREZXRhaWxKYWRlID0gcmVxdWlyZSgnLi4vdmlldy9lZGl0ZGVsRXZlbnQuamFkZScpO1xuXHR0aGlzLnltYXBDZWF0ZVBhdGggPSB7fTtcblx0dGhpcy5zZWxlY3RlZEVMID0gW107XG5cblx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdHRoaXMuaW5pdCA9IGZ1bmN0aW9uKHlNYXBDcmVhdGVQYXRoKSB7XG5cdFx0JCgnLmwtcGxhY2UnKS5odG1sKHNlbGYucGxKYWRlKCkpO1xuXHRcdC8vc2VsZi5teU1hcD1teU1hcDtcblx0XHRzZWxmLnltYXBDZWF0ZVBhdGggPSB5TWFwQ3JlYXRlUGF0aDtcblx0XHQkKCcjY2xlYXItcGxpc3QtYnRuJykub24oJ2NsaWNrJywgc2VsZi5yZW1vdmVBbGwpO1xuXHRcdCQoJyNjcmVhdGUtcGF0aC1idG4nKS5vbignY2xpY2snLCBzZWxmLmNyZWF0ZVBhdGgpO1xuXHRcdCQoJyNwcmludC1wYXRoLWJ0bicpLm9uKCdjbGljaycsIHNlbGYucGRmUGF0aCk7XG5cblx0fTtcblxuXHR0aGlzLmFkZEVsZW1lbnQgPSBmdW5jdGlvbihkYXRhKSB7XG5cdFx0JCgnI3BhdGgtbGlzdCcpLmFwcGVuZChzZWxmLmVsSmFkZSh7XG5cdFx0XHRcImRhdGFcIjogZGF0YVxuXHRcdH0pKTtcblx0XHRzZWxmLnNlbGVjdGVkRUwucHVzaChkYXRhKTtcblx0XHQkKCdbZGF0YS1wby1pZD0nICsgZGF0YS5wb3N0YWxDb2RlICsgJ10nKS5jaGlsZHJlbignLnJlbW92ZS1wby1saXN0Jykub24oJ2NsaWNrJywge1xuXHRcdFx0ZWxlbWVudDogZGF0YVxuXHRcdH0sIHNlbGYucmVtb3ZlRWxlbWVudCk7XG5cdFx0c2VsZi5sb2FkRXZudERhdGEoZGF0YSk7XG5cblx0fTtcblxuXHR0aGlzLmxvYWRFdm50RGF0YSA9IGZ1bmN0aW9uKF9kYXRhKSB7XG5cdFx0dmFyIHJhcnIgPSBbXTtcblx0XHQkLmFqYXgoe1xuXHRcdFx0dHlwZTogJ0dFVCcsXG5cdFx0XHQvL3VybDogXCIuL3Rlc3RldmVudC5qc29uXCIsXG5cdFx0XHR1cmw6XCIvdXNlcnMvZXZudC9cIitfZGF0YS5wb3N0YWxDb2RlLFxuXHRcdFx0ZGF0YVR5cGU6IFwianNvblwiLFxuXHRcdFx0c3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuXHRcdFx0XHRjb25zb2xlLmxvZygnc3VjY2VzcyBsb2FkIGRhdGEnKTtcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XG5cdFx0XHRcdF9kYXRhLmV2bnRzPWRhdGE7XG5cdFx0XHRcdCQoJ1tkYXRhLXBvLWlkPScgKyBfZGF0YS5wb3N0YWxDb2RlICsgJ10nKS5maW5kKCdpLmZhLXNwaW5uZXInKS5yZW1vdmUoKTtcblx0XHRcdFx0JCgnW2RhdGEtcG8taWQ9JyArIF9kYXRhLnBvc3RhbENvZGUgKyAnXScpLmFwcGVuZChzZWxmLm5lc3RlZExpc3RKYWRlKHtcblx0XHRcdFx0XHRcdFwiZGF0YVwiOiBkYXRhXG5cdFx0XHRcdH0pKTtcblx0XHRcdFx0JCgnW2RhdGEtcG8taWQ9JyArIF9kYXRhLnBvc3RhbENvZGUgKyAnXScpLm9uKCdjbGljaycsIHNlbGYubGlzdGVuRXZudCk7XG5cdFx0XHRcdC8qcmFyciA9IGRhdGEuZmlsdGVyKGZ1bmN0aW9uKGV2bnQpIHtcblx0XHRcdFx0XHRpZiAoZXZudC5wb3N0YWxDb2RlID09IF9kYXRhLnBvc3RhbENvZGUpIHtcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHRcdF9kYXRhLmV2bnRzID0gcmFycjtcblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhyYXJyKTtcblx0XHRcdFx0XHQkKCdbZGF0YS1wby1pZD0nICsgX2RhdGEucG9zdGFsQ29kZSArICddJykuZmluZCgnaS5mYS1zcGlubmVyJykucmVtb3ZlKCk7XG5cdFx0XHRcdFx0JCgnW2RhdGEtcG8taWQ9JyArIF9kYXRhLnBvc3RhbENvZGUgKyAnXScpLmFwcGVuZChzZWxmLm5lc3RlZExpc3RKYWRlKHtcblx0XHRcdFx0XHRcdFwiZGF0YVwiOiByYXJyXG5cdFx0XHRcdFx0fSkpO1xuXHRcdFx0XHRcdC8vJCgnLmV2bnQtbGknKS5jaGlsZHJlbignLnNob3ctZXZudC1kZXRhaWwnKS5vbignY2xpY2snLHNlbGYuc2hvd0V2bnREZXRhaWwpO1xuXHRcdFx0XHRcdC8vJCgnLmV2bnQtbGknKS5jaGlsZHJlbignLnJlbW92ZS1ldm50LWxpc3QnKS5vbignY2xpY2snLHNlbGYucmVtb3ZlRXZudCk7XHRcdFx0XHRcdFxuXHRcdFx0XHRcdC8vJCgnW2RhdGEtcG8taWQ9JysgX2RhdGEucG9zdGFsQ29kZSsnXScpLm9uKCdjbGljaycsc2VsZi5zaG93RXZudERldGFpbCk7XG5cdFx0XHRcdFx0JCgnW2RhdGEtcG8taWQ9JyArIF9kYXRhLnBvc3RhbENvZGUgKyAnXScpLm9uKCdjbGljaycsIHNlbGYubGlzdGVuRXZudCk7XG5cdFx0XHRcdH0sIC8qTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMDApKi8gLyoxMCk7Ki9cblx0XHRcdH0sXG5cdFx0XHRlcnJvcjogZnVuY3Rpb24oZXJyKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCfQvtGI0LjQsdC60LAgKCcpO1xuXHRcdFx0XHRjb25zb2xlLmxvZyhlcnIpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cblx0fTtcblx0dGhpcy5saXN0ZW5Fdm50ID0gZnVuY3Rpb24oZSkge1xuXHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0dmFyIHR5cGUgPSB0cnVlOyAvL2RlbGV0ZVxuXHRcdGlmICgkKGUudGFyZ2V0KS5wYXJlbnQoKS5oYXNDbGFzcygnc2hvdy1ldm50LWRldGFpbCcpKVxuXHRcdFx0dHlwZSA9IGZhbHNlOyAvLydzaG93LWRldGFpbCc7XG5cblx0XHR2YXIgb3AgPSAkKGUuY3VycmVudFRhcmdldCkuYXR0cignZGF0YS1wby1pZCcpO1xuXHRcdHZhciBldm50SWQgPSAkKGUudGFyZ2V0KS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdkYXRhLWV2bnQtaWQnKTtcblx0XHQvL2NvbnNvbGUubG9nKCQoZS50YXJnZXQpLnBhcmVudCgpLmhhc0NsYXNzKCdzaG93LWV2bnQtZGV0YWlsJykpO1xuXG5cblx0XHRmb3IgKHZhciBpID0gc2VsZi5zZWxlY3RlZEVMLmxlbmd0aDsgaS0tOykge1xuXHRcdFx0aWYgKHNlbGYuc2VsZWN0ZWRFTFtpXS5wb3N0YWxDb2RlID09IG9wKSB7XG5cdFx0XHRcdGZvciAodmFyIGogPSBzZWxmLnNlbGVjdGVkRUxbaV0uZXZudHMubGVuZ3RoOyBqLS07KSB7XG5cdFx0XHRcdFx0aWYgKHNlbGYuc2VsZWN0ZWRFTFtpXS5ldm50c1tqXS5faWQgPT0gZXZudElkKSB7XG5cdFx0XHRcdFx0XHRpZiAodHlwZSkge1xuXHRcdFx0XHRcdFx0XHRzZWxmLnNlbGVjdGVkRUxbaV0uZXZudHMuc3BsaWNlKGosIDEpO1xuXHRcdFx0XHRcdFx0XHQkKGUudGFyZ2V0KS5wYXJlbnQoKS5wYXJlbnQoKS5yZW1vdmUoKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHZhciBfZXZlbnQgPSBzZWxmLnNlbGVjdGVkRUxbaV0uZXZudHNbal07XG5cdFx0XHRcdFx0XHRcdCQoJy5tb2RhbC1wbGFjZScpLmh0bWwoc2VsZi5ldm50RGV0YWlsSmFkZSgpKTtcblx0XHRcdFx0XHRcdFx0JChcIi5mbGF0cGlja3JcIikuZmxhdHBpY2tyKHtcblx0XHRcdFx0XHRcdFx0XHRlbmFibGVUaW1lOiB0cnVlLFxuXHRcdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdFx0XHQkKCcjbW9kYWwnKS5tb2RhbCgnc2hvdycpO1xuXG5cdFx0XHRcdFx0XHRcdC8vJCgnI2RhdGViZWdpbicpLnZhbChfZXZlbnQuc3RhcnQuZm9ybWF0KCdZWVlZLU1NLUREIGhoOm1tJykpO1xuXHRcdFx0XHRcdFx0XHQvLyQoJyNkYXRlZW5kJykudmFsKF9ldmVudC5lbmQuZm9ybWF0KCdZWVlZLU1NLUREIGhoOm1tJykpO1xuXHRcdFx0XHRcdFx0XHQkKCcjZXZlbnQtdGl0bGUnKS52YWwoX2V2ZW50LnRpdGxlKTtcblx0XHRcdFx0XHRcdFx0JCgnI3Bvc3Rjb2RlJykudmFsKF9ldmVudC5wb3N0YWxDb2RlKTtcblx0XHRcdFx0XHRcdFx0JCgnI3N0YXR1cycpLnZhbChfZXZlbnQuc3RhdHVzKTtcblx0XHRcdFx0XHRcdFx0JChcIiNkZXNjcmlwdGlvblwiKS52YWwoX2V2ZW50LmRlc2NyaXB0aW9uKTtcblx0XHRcdFx0XHRcdFx0JCgnI2V4ZWN1dG9yJykudmFsKF9ldmVudC5leGVjdXRvcik7XG5cblx0XHRcdFx0XHRcdFx0JCgnI21vZGFsJykub24oJ2hpZGRlbi5icy5tb2RhbCcsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZygnbW9kYWwgaGlkZScpO1xuXHRcdFx0XHRcdFx0XHRcdHNlbGYuZGVzdHJveU1vZGFsKCk7XG5cblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdH07XG5cdHRoaXMuZGVzdHJveU1vZGFsID0gZnVuY3Rpb24oKSB7XG5cblx0XHQvLyQoXCIjc2F2ZS1ldmVudC1idG5cIikub2ZmKCdjbGljaycpO1xuXHRcdCQoJyNjbG9zZS1tb2RhbC1idG4nKS5vZmYoJ2NsaWNrJyk7XG5cdFx0JCgnI2Nsb3NlLW1vZGFsLWNyb3NzLWJ0bicpLm9mZignY2xpY2snKTtcblx0XHQvLyQoJyNkZWxldGUtZXZlbnQtYnRuJykub2ZmKCk7XG5cdFx0JCgnLm1vZGFsLXBsYWNlJykuaHRtbCgnJyk7XG5cdH07XG5cblx0dGhpcy5yZW1vdmVFbGVtZW50ID0gZnVuY3Rpb24oZSkge1xuXHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0Zm9yICh2YXIgaSA9IHNlbGYuc2VsZWN0ZWRFTC5sZW5ndGg7IGktLTspIHtcblx0XHRcdGlmIChzZWxmLnNlbGVjdGVkRUxbaV0ucG9zdGFsQ29kZSA9PSBlLmRhdGEuZWxlbWVudC5wb3N0YWxDb2RlKSB7XG5cdFx0XHRcdCQoZS5jdXJyZW50VGFyZ2V0KS5vZmYoKTtcblx0XHRcdFx0JChlLmN1cnJlbnRUYXJnZXQpLnBhcmVudCgpLnJlbW92ZSgpO1xuXHRcdFx0XHQvLyQoJ1tkYXRhLWV2bnQtaWQ9JytlLmRhdGEuZWxlbWVudC5wb3N0YWxDb2RlKyddJykub2ZmKCk7XG5cdFx0XHRcdC8vJCgnW2RhdGEtZXZudC1pZD0nK2UuZGF0YS5lbGVtZW50LnBvc3RhbENvZGUrJ10nKS5yZW1vdmUoKTtcblx0XHRcdFx0c2VsZi5zZWxlY3RlZEVMLnNwbGljZShpLCAxKTtcblx0XHRcdH1cblx0XHR9XG5cblx0fTtcblx0dGhpcy5yZW1vdmVBbGwgPSBmdW5jdGlvbihlKSB7XG5cdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHQkKCcjcGF0aC1saXN0JykuaHRtbCgnJyk7XG5cdFx0c2VsZi5zZWxlY3RlZEVMID0gW107XG5cdH07XG5cblx0dGhpcy5jcmVhdGVQYXRoID0gZnVuY3Rpb24oKSB7XG5cdFx0c2VsZi55bWFwQ2VhdGVQYXRoKHNlbGYuc2VsZWN0ZWRFTCk7XG5cdH07XG5cblx0dGhpcy5wZGZQYXRoID0gZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGRvY0RlZmluaXRpb24gPSBzZWxmLmNyZWF0ZUNvbnRlbnQoKTtcblx0XHQvL3ZhciBkb2NEZWZpbml0aW9uID0gc2VsZi5wZGZKYWRlKHtcImRhdGFcIjpzZWxmLnNlbGVjdGVkRUx9KTtcblx0XHRwZGZNYWtlLmNyZWF0ZVBkZihkb2NEZWZpbml0aW9uKS5vcGVuKCk7XG5cdH07XG5cblx0dGhpcy5jcmVhdGVDb250ZW50ID0gZnVuY3Rpb24oKSB7XG5cdFx0dmFyIHVsYXJyID0gW107XG5cdFx0c2VsZi5zZWxlY3RlZEVMLmZvckVhY2goZnVuY3Rpb24ocG8pIHtcblx0XHRcdHVsYXJyLnB1c2goe1xuXHRcdFx0XHR0ZXh0OiBwby5wb3N0YWxDb2RlXG5cdFx0XHR9KVxuXHRcdFx0aWYgKHBvLmV2bnRzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0dmFyIHN1bGFyciA9IFtdO1xuXHRcdFx0XHRwby5ldm50cy5mb3JFYWNoKGZ1bmN0aW9uKGV2bikge1xuXHRcdFx0XHRcdHN1bGFyci5wdXNoKHtcblx0XHRcdFx0XHRcdHRleHQ6IGV2bi50aXRsZVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0dWxhcnIucHVzaCh7XG5cdFx0XHRcdFx0dWw6IHN1bGFyclxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHR2YXIgY29iaiA9IHtcblx0XHRcdGNvbnRlbnQ6IFt7XG5cdFx0XHRcdHRleHQ6ICfQm9C40YHRgi3RgdC/0LjRgdC+0Log0LfQsNGP0LLQvtC6INC6INC40YHQv9C+0LvQvdC10L3QuNGOICjRhNC+0YDQvNCwIOKEljHQu9GBKScsXG5cdFx0XHRcdHN0eWxlOiAnaGVhZGVyJ1xuXHRcdFx0fSwge1xuXHRcdFx0XHR1bDogdWxhcnIsXG5cdFx0XHRcdHN0eWxlOiAnbGlzdHMnXG5cdFx0XHR9XSxcblx0XHRcdHN0eWxlczoge1xuXHRcdFx0XHRoZWFkZXI6IHtcblx0XHRcdFx0XHRmb250U2l6ZTogMTYsXG5cdFx0XHRcdFx0Ym9sZDogdHJ1ZVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRsaXN0czoge1xuXHRcdFx0XHRcdHBhZGRpbmc6IFwiMTVweFwiLFxuXHRcdFx0XHRcdGZvbnRTaXplOiAxNFxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblx0XHRyZXR1cm4gY29iajtcblx0fTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy9qcy9kZXYvcG0vbW9kdWxlL3BhdGhMaXN0LmpzXG4vLyBtb2R1bGUgaWQgPSAxMzBcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIGphZGUgPSByZXF1aXJlKFwiL2hvbWUvdWJ1bnR1L3dvcmtzcGFjZS9ub2RlX21vZHVsZXMvamFkZS9saWIvcnVudGltZS5qc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcImNhcmRcXFwiPjxkaXYgY2xhc3M9XFxcImNhcmQtaGVhZGVyXFxcIj48dWwgY2xhc3M9XFxcIm5hdiBuYXYtcGlsbHMgY2FyZC1oZWFkZXItcGlsbHMgZmxvYXQteHMtbGVmdFxcXCI+PGxpIGNsYXNzPVxcXCJuYXYtaXRlbVxcXCI+PGEgaWQ9XFxcImNsZWFyLXBsaXN0LWJ0blxcXCIgaHJlZj1cXFwiI1xcXCIgY2xhc3M9XFxcIm5hdi1saW5rXFxcIj7QntGH0LjRgdGC0LjRgtGMPC9hPjwvbGk+PC91bD48L2Rpdj48ZGl2IGNsYXNzPVxcXCJjYXJkLWJsb2NrXFxcIj48aDQgY2xhc3M9XFxcImNhcmQtdGl0bGVcXFwiPiA8L2g0PjxkaXYgY2xhc3M9XFxcImNhcmQtdGV4dFxcXCI+PGg0PtCh0L/QuNGB0L7QulxcdDx1bCBpZD1cXFwicGF0aC1saXN0XFxcIiBjbGFzcz1cXFwibGlzdC1ncm91cFxcXCI+PC91bD48L2g0PjwvZGl2PjwhLS1pbnB1dCNleGVjZW1haWwuZm9ybS1jb250cm9sKHR5cGU9J2VtYWlsJyktLT48YSBpZD1cXFwiY3JlYXRlLXBhdGgtYnRuXFxcIiBocmVmPVxcXCIjXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1wcmltYXJ5XFxcIj7RgdC+0LfQtNCw0YLRjCDQvNCw0YDRiNGA0YPRgjwvYT48L2Rpdj48ZGl2IGNsYXNzPVxcXCJjYXJkLWZvb3RlciB0ZXh0LW11dGVkXFxcIj48YSBpZD1cXFwicHJpbnQtcGF0aC1idG5cXFwiIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJidG4gYnRuLXByaW1hcnlcXFwiPtC/0LXRh9Cw0YLQsNGC0Yw8L2E+PGEgaWQ9XFxcIm90aGVyLXBhdGgtYnRuXFxcIiBocmVmPVxcXCIjXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1kZWZhdWx0XFxcIj7QtdGJ0LUg0YfQtdCz0L4t0YLQvjwvYT48L2Rpdj48L2Rpdj5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy9qcy9kZXYvcG0vdmlldy9wYXRoTGlzdC5qYWRlXG4vLyBtb2R1bGUgaWQgPSAxMzFcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIGphZGUgPSByZXF1aXJlKFwiL2hvbWUvdWJ1bnR1L3dvcmtzcGFjZS9ub2RlX21vZHVsZXMvamFkZS9saWIvcnVudGltZS5qc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKGRhdGEpIHtcbmJ1Zi5wdXNoKFwiPGxpXCIgKyAoamFkZS5hdHRyKFwiZGF0YS1wby1pZFwiLCAnJyArIChkYXRhLnBvc3RhbENvZGUpICsgJycsIHRydWUsIHRydWUpKSArIFwiIGNsYXNzPVxcXCJsaXN0LWdyb3VwLWl0ZW0gbGlzdC1ncm91cC1pdGVtLWFjdGlvblxcXCI+XCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gZGF0YS5wb3N0YWxDb2RlKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCI8YSBocmVmPVxcXCIjXFxcIiBjbGFzcz1cXFwicmVtb3ZlLXBvLWxpc3RcXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS10cmFzaC1vIGZhLWZ3XFxcIj48L2k+PC9hPjxpIHN0eWxlPVxcXCJmbG9hdDpsZWZ0XFxcIiBjbGFzcz1cXFwiZmEgZmEtc3Bpbm5lciBmYS1wdWxzZSBmYS1md1xcXCI+PC9pPjwvbGk+XCIpO30uY2FsbCh0aGlzLFwiZGF0YVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguZGF0YTp0eXBlb2YgZGF0YSE9PVwidW5kZWZpbmVkXCI/ZGF0YTp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2pzL2Rldi9wbS92aWV3L2xpc3RFbC5qYWRlXG4vLyBtb2R1bGUgaWQgPSAxMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIGphZGUgPSByZXF1aXJlKFwiL2hvbWUvdWJ1bnR1L3dvcmtzcGFjZS9ub2RlX21vZHVsZXMvamFkZS9saWIvcnVudGltZS5qc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKGRhdGEsIHVuZGVmaW5lZCkge1xuYnVmLnB1c2goXCI8dWw+XCIpO1xuLy8gaXRlcmF0ZSBkYXRhXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IGRhdGE7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBldm50ID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8bGlcIiArIChqYWRlLmF0dHIoXCJkYXRhLWV2bnQtaWRcIiwgJycgKyAoZXZudC5faWQpICsgJycsIHRydWUsIHRydWUpKSArIFwiIGNsYXNzPVxcXCJldm50LWxpXFxcIj5cIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBldm50LnRpdGxlKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCI8YSBocmVmPVxcXCIjXFxcIiBjbGFzcz1cXFwic2hvdy1ldm50LWRldGFpbFxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLXNlYXJjaCBmYS1md1xcXCI+PC9pPjwvYT48YSBocmVmPVxcXCIjXFxcIiBjbGFzcz1cXFwicmVtb3ZlLWV2bnQtbGlzdFxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLXRyYXNoLW8gZmEtZndcXFwiPjwvaT48L2E+PC9saT5cIik7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIgZXZudCA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGxpXCIgKyAoamFkZS5hdHRyKFwiZGF0YS1ldm50LWlkXCIsICcnICsgKGV2bnQuX2lkKSArICcnLCB0cnVlLCB0cnVlKSkgKyBcIiBjbGFzcz1cXFwiZXZudC1saVxcXCI+XCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gZXZudC50aXRsZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiPGEgaHJlZj1cXFwiI1xcXCIgY2xhc3M9XFxcInNob3ctZXZudC1kZXRhaWxcXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1zZWFyY2ggZmEtZndcXFwiPjwvaT48L2E+PGEgaHJlZj1cXFwiI1xcXCIgY2xhc3M9XFxcInJlbW92ZS1ldm50LWxpc3RcXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS10cmFzaC1vIGZhLWZ3XFxcIj48L2k+PC9hPjwvbGk+XCIpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG5idWYucHVzaChcIjwvdWw+XCIpO30uY2FsbCh0aGlzLFwiZGF0YVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguZGF0YTp0eXBlb2YgZGF0YSE9PVwidW5kZWZpbmVkXCI/ZGF0YTp1bmRlZmluZWQsXCJ1bmRlZmluZWRcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnVuZGVmaW5lZDp0eXBlb2YgdW5kZWZpbmVkIT09XCJ1bmRlZmluZWRcIj91bmRlZmluZWQ6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy9qcy9kZXYvcG0vdmlldy9zdWJsaXN0LmphZGVcbi8vIG1vZHVsZSBpZCA9IDEzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCIvaG9tZS91YnVudHUvd29ya3NwYWNlL25vZGVfbW9kdWxlcy9qYWRlL2xpYi9ydW50aW1lLmpzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAoZGF0YSwgdW5kZWZpbmVkKSB7XG4vLyBpdGVyYXRlIGRhdGFcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gZGF0YTtcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIHBvID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCJcIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBwby5wb3N0YWxDb2RlKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCIgXFxcXGJyXCIpO1xuaWYgKHBvLmV2bnRzLmxlbmd0aD4wKVxue1xuLy8gaXRlcmF0ZSBwby5ldm50c1xuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSBwby5ldm50cztcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGV2bnQgPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IGV2bnQudGl0bGUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIiBcXFxcYnJcIik7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIgZXZudCA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiXCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gZXZudC50aXRsZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiIFxcXFxiclwiKTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxufVxuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIHBvID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCJcIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBwby5wb3N0YWxDb2RlKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCIgXFxcXGJyXCIpO1xuaWYgKHBvLmV2bnRzLmxlbmd0aD4wKVxue1xuLy8gaXRlcmF0ZSBwby5ldm50c1xuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSBwby5ldm50cztcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGV2bnQgPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IGV2bnQudGl0bGUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIiBcXFxcYnJcIik7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIgZXZudCA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiXCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gZXZudC50aXRsZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiIFxcXFxiclwiKTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxufVxuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xufS5jYWxsKHRoaXMsXCJkYXRhXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5kYXRhOnR5cGVvZiBkYXRhIT09XCJ1bmRlZmluZWRcIj9kYXRhOnVuZGVmaW5lZCxcInVuZGVmaW5lZFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgudW5kZWZpbmVkOnR5cGVvZiB1bmRlZmluZWQhPT1cInVuZGVmaW5lZFwiP3VuZGVmaW5lZDp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2pzL2Rldi9wbS92aWV3L3BkZlBhdGhMaXN0LmphZGVcbi8vIG1vZHVsZSBpZCA9IDEzNFxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCIvaG9tZS91YnVudHUvd29ya3NwYWNlL25vZGVfbW9kdWxlcy9qYWRlL2xpYi9ydW50aW1lLmpzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPGRpdiBpZD1cXFwibW9kYWxcXFwiIHRhYmluZGV4PVxcXCItMVxcXCIgcm9sZT1cXFwiZGlhbG9nXFxcIiBhcmlhLWxhYmVsbGVkYnk9XFxcIm15TW9kYWxMYWJlbFxcXCIgYXJpYS1oaWRkZW49XFxcInRydWVcXFwiIGNsYXNzPVxcXCJtb2RhbCBmYWRlXFxcIj48ZGl2IHJvbGU9XFxcImRvY3VtZW50XFxcIiBjbGFzcz1cXFwibW9kYWwtZGlhbG9nXFxcIj48ZGl2IGNsYXNzPVxcXCJtb2RhbC1jb250ZW50XFxcIj48ZGl2IGNsYXNzPVxcXCJtb2RhbC1oZWFkZXJcXFwiPjxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBkYXRhLWRpc21pc3M9XFxcIm1vZGFsXFxcIiBhcmlhLWxhYmVsPVxcXCJDbG9zZVxcXCIgY2xhc3M9XFxcImNsb3NlXFxcIj48c3BhbiBhcmlhLWhpZGRlbj1cXFwidHJ1ZVxcXCI+w5c8L3NwYW4+PC9idXR0b24+PGg0IGlkPVxcXCJteU1vZGFsTGFiZWxcXFwiIGNsYXNzPVxcXCJtb2RhbC10aXRsZVxcXCI+0KDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjQtS/Rg9C00LDQu9C10L3QuNC1PC9oND48L2Rpdj48ZGl2IGNsYXNzPVxcXCJtb2RhbC1ib2R5XFxcIj48Zm9ybSBhY3Rpb249XFxcIlxcXCI+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7Qt9Cw0LPQvtC70L7QstC+0Lo8L2xhYmVsPjxpbnB1dCBpZD1cXFwiZXZlbnQtdGl0bGVcXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0L3QsNGH0LDQu9C+PC9sYWJlbD48aW5wdXQgaWQ9XFxcImRhdGViZWdpblxcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbCBmbGF0cGlja3JcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0L7QutC+0L3Rh9Cw0L3QuNC1PC9sYWJlbD48aW5wdXQgaWQ9XFxcImRhdGVlbmRcXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2wgZmxhdHBpY2tyXFxcIj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj48bGFiZWwgZm9yPVxcXCJcXFwiPtC+0YLQtNC10LvQtdC90LjQtSDQv9C+0LvRg9GH0LDRgtC10LvRjDwvbGFiZWw+PGlucHV0IGlkPVxcXCJwb3N0Y29kZVxcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7QvtC/0LjRgdCw0L3QuNC1PC9sYWJlbD48aW5wdXQgaWQ9XFxcImRlc2NyaXB0aW9uXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj48bGFiZWwgZm9yPVxcXCJcXFwiPtGB0YLQsNGC0YPRgTwvbGFiZWw+PGlucHV0IGlkPVxcXCJzdGF0dXNcXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0LjRgdC/0L7Qu9C90LjRgtC10LvRjDwvbGFiZWw+PGlucHV0IGlkPVxcXCJleGVjdXRvclxcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+PC9kaXY+PC9mb3JtPjwvZGl2PjxkaXYgY2xhc3M9XFxcIm1vZGFsLWZvb3RlclxcXCI+PGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGRhdGEtZGlzbWlzcz1cXFwibW9kYWxcXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+Q2xvc2U8L2J1dHRvbj48IS0tYnV0dG9uI3NhdmUtZXZlbnQtYnRuLmJ0bi5idG4tcHJpbWFyeSh0eXBlPSdidXR0b24nKSBTYXZlIGNoYW5nZXMtLT48IS0tYnV0dG9uI2RlbGV0ZS1ldmVudC1idG4uYnRuLmJ0bi1kYW5nZXIodHlwZT0nYnV0dG9uJykgRGVsZXRlLS0+PC9kaXY+PC9kaXY+PC9kaXY+PC9kaXY+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvanMvZGV2L3BtL3ZpZXcvZWRpdGRlbEV2ZW50LmphZGVcbi8vIG1vZHVsZSBpZCA9IDEzNVxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG5cblx0dGhpcy5fbW9kYWwgPSByZXF1aXJlKCcuLi92aWV3L25ld0V2ZW50LmphZGUnKTtcblxuXHR0aGlzLmRlc3Ryb3lNb2RhbCA9IGZ1bmN0aW9uKCkge1xuXHRcdFxuXHRcdCQoXCIjc2F2ZS1ldmVudC1idG5cIikub2ZmKCdjbGljaycpO1xuXHRcdCQoJyNjbG9zZS1tb2RhbC1idG4nKS5vZmYoJ2NsaWNrJyk7XG5cdFx0JCgnI2Nsb3NlLW1vZGFsLWNyb3NzLWJ0bicpLm9mZignY2xpY2snKTtcblx0XHQkKCcubW9kYWwtcGxhY2UnKS5odG1sKCcnKTtcblx0fTtcblxuXHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0dGhpcy5pbml0ID0gZnVuY3Rpb24oKSB7XG5cblx0XHQkKCcubW9kYWwtcGxhY2UnKS5odG1sKHRoaXMuX21vZGFsKCkpO1xuXHRcdCQoXCIuZmxhdHBpY2tyXCIpLmZsYXRwaWNrcih7XG5cdFx0XHRlbmFibGVUaW1lOiB0cnVlLFxuXHRcdH0pO1xuXG5cdFx0JChcIiNzYXZlLWV2ZW50LWJ0blwiKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cdFx0XHR2YXIgZXZudCA9IHtcblx0XHRcdFx0dGl0bGU6ICQoJyNldmVudC10aXRsZScpLnZhbCgpLFxuXHRcdFx0XHRzdGFydDogbW9tZW50KCQoJyNkYXRlYmVnaW4nKS52YWwoKSksXG5cdFx0XHRcdGVuZDogbW9tZW50KCQoJyNkYXRlZW5kJykudmFsKCkpLFxuXHRcdFx0XHRwb3N0YWxDb2RlOiAkKCcjcG9zdGNvZGUnKS52YWwoKSxcblx0XHRcdFx0c3RhdHVzOiAkKCcjc3RhdHVzJykudmFsKCksXG5cdFx0XHRcdGRlc2NyaXB0aW9uOiAkKFwiI2Rlc2NyaXB0aW9uXCIpLnZhbCgpLFxuXHRcdFx0XHRleGVjdXRvcjogJCgnI2V4ZWN1dG9yJykudmFsKClcblx0XHRcdH07XG5cdFx0XHRjb25zb2xlLmxvZyhcImFkZCBldmVudFwiKTtcblx0XHRcdC8vJCgnI2NhbGVuZGFyJykuZnVsbENhbGVuZGFyKCdyZW5kZXJFdmVudCcsIGV2bnQsIHRydWUpO1xuXG5cdFx0XHQkLmFqYXgoe1xuXHRcdFx0XHR0eXBlOiAnUE9TVCcsXG5cdFx0XHRcdHVybDogJy91c2Vycy9zYXZlJyxcblx0XHRcdFx0ZGF0YTogSlNPTi5zdHJpbmdpZnkoZXZudCksXG5cdFx0XHRcdGRhdGFUeXBlOiBcImpzb25cIixcblx0XHRcdFx0Y29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuXHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJkYXRhIHNhdmVcIik7XG5cdFx0XHRcdFx0Ly92YXIgZXZudEFycmF5ID0gJCgnI2NhbGVuZGFyJykuZnVsbENhbGVuZGFyKCdjbGllbnRFdmVudHMnKTtcblx0XHRcdFx0XHQvL3ZhciBfZXZudCA9IGV2bnRBcnJheVtldm50QXJyYXkubGVuZ3RoIC0gMV07XG5cdFx0XHRcdC8vXHRfZXZudC5faWQgPSBkYXRhLmluc2VydGVkaWQ7XG5cblx0XHRcdFx0Ly9cdCQoJyNjYWxlbmRhcicpLmZ1bGxDYWxlbmRhcigndXBkYXRlRXZlbnQnLCBfZXZudCk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdC8vZXJyb3I6IGFqYXhFcnJvclxuXHRcdFx0fSk7XG5cblxuXHRcdH0pO1xuXG5cdFx0JCgnI2Nsb3NlLW1vZGFsLWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcblxuXHRcdH0pO1xuXG5cdFx0JCgnI2Nsb3NlLW1vZGFsLWNyb3NzLWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcblxuXHRcdH0pO1xuXG5cdFx0JCgnI21vZGFsJykubW9kYWwoJ3Nob3cnKTtcblxuXHRcdC8vJCgnI2RhdGViZWdpbicpLnZhbChzdGFydC5mb3JtYXQoJ1lZWVktTU0tREQgaGg6bW0nKSk7XG5cdFx0Ly8kKCcjZGF0ZWVuZCcpLnZhbChlbmQuZm9ybWF0KCdZWVlZLU1NLUREIGhoOm1tJykpO1xuXG5cdFx0JCgnI21vZGFsJykub24oJ2hpZGRlbi5icy5tb2RhbCcsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdtb2RhbCBoaWRlJyk7XG5cdFx0XHRzZWxmLmRlc3Ryb3lNb2RhbCgpO1xuXHRcdH0pO1xuXG5cdH07XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvanMvZGV2L3BtL21vZHVsZS9uZXdFdmVudC5qc1xuLy8gbW9kdWxlIGlkID0gMTM2XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsInZhciBqYWRlID0gcmVxdWlyZShcIi9ob21lL3VidW50dS93b3Jrc3BhY2Uvbm9kZV9tb2R1bGVzL2phZGUvbGliL3J1bnRpbWUuanNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8ZGl2IGlkPVxcXCJtb2RhbFxcXCIgdGFiaW5kZXg9XFxcIi0xXFxcIiByb2xlPVxcXCJkaWFsb2dcXFwiIGFyaWEtbGFiZWxsZWRieT1cXFwibXlNb2RhbExhYmVsXFxcIiBhcmlhLWhpZGRlbj1cXFwidHJ1ZVxcXCIgY2xhc3M9XFxcIm1vZGFsIGZhZGVcXFwiPjxkaXYgcm9sZT1cXFwiZG9jdW1lbnRcXFwiIGNsYXNzPVxcXCJtb2RhbC1kaWFsb2dcXFwiPjxkaXYgY2xhc3M9XFxcIm1vZGFsLWNvbnRlbnRcXFwiPjxkaXYgY2xhc3M9XFxcIm1vZGFsLWhlYWRlclxcXCI+PGJ1dHRvbiBpZD1cXFwiY2xvc2UtbW9kYWwtY3Jvc3MtYnRuXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGRhdGEtZGlzbWlzcz1cXFwibW9kYWxcXFwiIGFyaWEtbGFiZWw9XFxcIkNsb3NlXFxcIiBjbGFzcz1cXFwiY2xvc2VcXFwiPjxzcGFuIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIj7Dlzwvc3Bhbj48L2J1dHRvbj48aDQgaWQ9XFxcIm15TW9kYWxMYWJlbFxcXCIgY2xhc3M9XFxcIm1vZGFsLXRpdGxlXFxcIj7QodC+0LfQtNCw0L3QuNC1PC9oND48L2Rpdj48ZGl2IGNsYXNzPVxcXCJtb2RhbC1ib2R5XFxcIj48Zm9ybSBhY3Rpb249XFxcIlxcXCI+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7Qt9Cw0LPQvtC70L7QstC+0Lo8L2xhYmVsPjxpbnB1dCBpZD1cXFwiZXZlbnQtdGl0bGVcXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0L3QsNGH0LDQu9C+PC9sYWJlbD48aW5wdXQgaWQ9XFxcImRhdGViZWdpblxcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbCBmbGF0cGlja3JcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0L7QutC+0L3Rh9Cw0L3QuNC1PC9sYWJlbD48aW5wdXQgaWQ9XFxcImRhdGVlbmRcXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2wgZmxhdHBpY2tyXFxcIj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj48bGFiZWwgZm9yPVxcXCJcXFwiPtC+0YLQtNC10LvQtdC90LjQtSDQv9C+0LvRg9GH0LDRgtC10LvRjDwvbGFiZWw+PGlucHV0IGlkPVxcXCJwb3N0Y29kZVxcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7QvtC/0LjRgdCw0L3QuNC1PC9sYWJlbD48aW5wdXQgaWQ9XFxcImRlc2NyaXB0aW9uXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj48bGFiZWwgZm9yPVxcXCJcXFwiPtGB0YLQsNGC0YPRgTwvbGFiZWw+PGlucHV0IGlkPVxcXCJzdGF0dXNcXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0LjRgdC/0L7Qu9C90LjRgtC10LvRjDwvbGFiZWw+PGlucHV0IGlkPVxcXCJleGVjdXRvclxcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+PC9kaXY+PC9mb3JtPjwvZGl2PjxkaXYgY2xhc3M9XFxcIm1vZGFsLWZvb3RlclxcXCI+PGJ1dHRvbiBpZD1cXFwiY2xvc2UtbW9kYWwtYnRuXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGRhdGEtZGlzbWlzcz1cXFwibW9kYWxcXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+Q2xvc2U8L2J1dHRvbj48YnV0dG9uIGlkPVxcXCJzYXZlLWV2ZW50LWJ0blxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1wcmltYXJ5XFxcIj5TYXZlIGNoYW5nZXM8L2J1dHRvbj48L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy9qcy9kZXYvcG0vdmlldy9uZXdFdmVudC5qYWRlXG4vLyBtb2R1bGUgaWQgPSAxMzdcbi8vIG1vZHVsZSBjaHVua3MgPSAxIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzlHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM3TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDL0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM1RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OyIsInNvdXJjZVJvb3QiOiIifQ==