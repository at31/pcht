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
			var _editEventModal = __webpack_require__(121);
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

			var listmod = __webpack_require__(123);
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

	buf.push("<h4>Телефоны</h4><ul></ul>");
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

	buf.push("<h4>Время работы</h4><ul></ul>");
	// iterate data.workingHours
	;(function(){
	  var $$obj = data.workingHours;
	  if ('number' == typeof $$obj.length) {

	    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
	      var wh = $$obj[$index];

	buf.push("<li>" + (jade.escape((jade_interp = wh.weekDayName) == null ? '' : jade_interp)) + "</li>");
	    }

	  } else {
	    var $$l = 0;
	    for (var $index in $$obj) {
	      $$l++;      var wh = $$obj[$index];

	buf.push("<li>" + (jade.escape((jade_interp = wh.weekDayName) == null ? '' : jade_interp)) + "</li>");
	    }

	  }
	}).call(this);

	buf.push("</div><a href=\"#\" class=\"btn btn-primary show-net\">show me the Net in tha place</a></div></div>");}.call(this,"data" in locals_for_with?locals_for_with.data:typeof data!=="undefined"?data:undefined,"undefined" in locals_for_with?locals_for_with.undefined: false?undefined:undefined));;return buf.join("");
	}

/***/ },

/***/ 5:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Merge two attribute objects giving precedence
	 * to values in object `b`. Classes are special-cased
	 * allowing for arrays and merging/joining appropriately
	 * resulting in a string.
	 *
	 * @param {Object} a
	 * @param {Object} b
	 * @return {Object} a
	 * @api private
	 */

	exports.merge = function merge(a, b) {
	  if (arguments.length === 1) {
	    var attrs = a[0];
	    for (var i = 1; i < a.length; i++) {
	      attrs = merge(attrs, a[i]);
	    }
	    return attrs;
	  }
	  var ac = a['class'];
	  var bc = b['class'];

	  if (ac || bc) {
	    ac = ac || [];
	    bc = bc || [];
	    if (!Array.isArray(ac)) ac = [ac];
	    if (!Array.isArray(bc)) bc = [bc];
	    a['class'] = ac.concat(bc).filter(nulls);
	  }

	  for (var key in b) {
	    if (key != 'class') {
	      a[key] = b[key];
	    }
	  }

	  return a;
	};

	/**
	 * Filter null `val`s.
	 *
	 * @param {*} val
	 * @return {Boolean}
	 * @api private
	 */

	function nulls(val) {
	  return val != null && val !== '';
	}

	/**
	 * join array as classes.
	 *
	 * @param {*} val
	 * @return {String}
	 */
	exports.joinClasses = joinClasses;
	function joinClasses(val) {
	  return (Array.isArray(val) ? val.map(joinClasses) :
	    (val && typeof val === 'object') ? Object.keys(val).filter(function (key) { return val[key]; }) :
	    [val]).filter(nulls).join(' ');
	}

	/**
	 * Render the given classes.
	 *
	 * @param {Array} classes
	 * @param {Array.<Boolean>} escaped
	 * @return {String}
	 */
	exports.cls = function cls(classes, escaped) {
	  var buf = [];
	  for (var i = 0; i < classes.length; i++) {
	    if (escaped && escaped[i]) {
	      buf.push(exports.escape(joinClasses([classes[i]])));
	    } else {
	      buf.push(joinClasses(classes[i]));
	    }
	  }
	  var text = joinClasses(buf);
	  if (text.length) {
	    return ' class="' + text + '"';
	  } else {
	    return '';
	  }
	};


	exports.style = function (val) {
	  if (val && typeof val === 'object') {
	    return Object.keys(val).map(function (style) {
	      return style + ':' + val[style];
	    }).join(';');
	  } else {
	    return val;
	  }
	};
	/**
	 * Render the given attribute.
	 *
	 * @param {String} key
	 * @param {String} val
	 * @param {Boolean} escaped
	 * @param {Boolean} terse
	 * @return {String}
	 */
	exports.attr = function attr(key, val, escaped, terse) {
	  if (key === 'style') {
	    val = exports.style(val);
	  }
	  if ('boolean' == typeof val || null == val) {
	    if (val) {
	      return ' ' + (terse ? key : key + '="' + key + '"');
	    } else {
	      return '';
	    }
	  } else if (0 == key.indexOf('data') && 'string' != typeof val) {
	    if (JSON.stringify(val).indexOf('&') !== -1) {
	      console.warn('Since Jade 2.0.0, ampersands (`&`) in data attributes ' +
	                   'will be escaped to `&amp;`');
	    };
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will eliminate the double quotes around dates in ' +
	                   'ISO form after 2.0.0');
	    }
	    return ' ' + key + "='" + JSON.stringify(val).replace(/'/g, '&apos;') + "'";
	  } else if (escaped) {
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will stringify dates in ISO form after 2.0.0');
	    }
	    return ' ' + key + '="' + exports.escape(val) + '"';
	  } else {
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will stringify dates in ISO form after 2.0.0');
	    }
	    return ' ' + key + '="' + val + '"';
	  }
	};

	/**
	 * Render the given attributes object.
	 *
	 * @param {Object} obj
	 * @param {Object} escaped
	 * @return {String}
	 */
	exports.attrs = function attrs(obj, terse){
	  var buf = [];

	  var keys = Object.keys(obj);

	  if (keys.length) {
	    for (var i = 0; i < keys.length; ++i) {
	      var key = keys[i]
	        , val = obj[key];

	      if ('class' == key) {
	        if (val = joinClasses(val)) {
	          buf.push(' ' + key + '="' + val + '"');
	        }
	      } else {
	        buf.push(exports.attr(key, val, false, terse));
	      }
	    }
	  }

	  return buf.join('');
	};

	/**
	 * Escape the given string of `html`.
	 *
	 * @param {String} html
	 * @return {String}
	 * @api private
	 */

	var jade_encode_html_rules = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;'
	};
	var jade_match_html = /[&<>"]/g;

	function jade_encode_char(c) {
	  return jade_encode_html_rules[c] || c;
	}

	exports.escape = jade_escape;
	function jade_escape(html){
	  var result = String(html).replace(jade_match_html, jade_encode_char);
	  if (result === '' + html) return html;
	  else return result;
	};

	/**
	 * Re-throw the given `err` in context to the
	 * the jade in `filename` at the given `lineno`.
	 *
	 * @param {Error} err
	 * @param {String} filename
	 * @param {String} lineno
	 * @api private
	 */

	exports.rethrow = function rethrow(err, filename, lineno, str){
	  if (!(err instanceof Error)) throw err;
	  if ((typeof window != 'undefined' || !filename) && !str) {
	    err.message += ' on line ' + lineno;
	    throw err;
	  }
	  try {
	    str = str || __webpack_require__(6).readFileSync(filename, 'utf8')
	  } catch (ex) {
	    rethrow(err, null, lineno)
	  }
	  var context = 3
	    , lines = str.split('\n')
	    , start = Math.max(lineno - context, 0)
	    , end = Math.min(lines.length, lineno + context);

	  // Error context
	  var context = lines.slice(start, end).map(function(line, i){
	    var curr = i + start + 1;
	    return (curr == lineno ? '  > ' : '    ')
	      + curr
	      + '| '
	      + line;
	  }).join('\n');

	  // Alter exception message
	  err.path = filename;
	  err.message = (filename || 'Jade') + ':' + lineno
	    + '\n' + context + '\n\n' + err.message;
	  throw err;
	};

	exports.DebugItem = function DebugItem(lineno, filename) {
	  this.lineno = lineno;
	  this.filename = filename;
	}


/***/ },

/***/ 6:
/***/ function(module, exports) {

	/* (ignored) */

/***/ },

/***/ 7:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, moment) {'use strict';

	module.exports = function() {

		this._modal = __webpack_require__(120);

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
					url: '/evnt/save',
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

/***/ 120:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(5);

	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;

	buf.push("<div id=\"modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\" class=\"modal fade\"><div role=\"document\" class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button id=\"close-modal-cross-btn\" type=\"button\" data-dismiss=\"modal\" aria-label=\"Close\" class=\"close\"><span aria-hidden=\"true\">×</span></button><h4 id=\"myModalLabel\" class=\"modal-title\">Создание</h4></div><div class=\"modal-body\"><form action=\"\"><div class=\"form-group\"><label for=\"\">заголовок</label><input id=\"event-title\" type=\"text\" class=\"form-control\"></div><div class=\"form-group\"><label for=\"\">начало</label><input id=\"datebegin\" type=\"text\" class=\"form-control flatpickr\"></div><div class=\"form-group\"><label for=\"\">окончание</label><input id=\"dateend\" type=\"text\" class=\"form-control flatpickr\"></div><div class=\"form-group\"><label for=\"\">отделение получатель</label><input id=\"postcode\" type=\"text\" class=\"form-control\"></div><div class=\"form-group\"><label for=\"\">описание</label><input id=\"description\" type=\"text\" class=\"form-control\"></div><div class=\"form-group\"><label for=\"\">статус</label><input id=\"status\" type=\"text\" class=\"form-control\"></div><div class=\"form-group\"><label for=\"\">исполнитель</label><input id=\"executor\" type=\"text\" class=\"form-control\"></div></form></div><div class=\"modal-footer\"><button id=\"close-modal-btn\" type=\"button\" data-dismiss=\"modal\" class=\"btn btn-secondary\">Close</button><button id=\"save-event-btn\" type=\"button\" class=\"btn btn-primary\">Save changes</button></div></div></div></div>");;return buf.join("");
	}

/***/ },

/***/ 121:
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

			var _modalhtml = __webpack_require__(122);
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

/***/ 122:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(5);

	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;

	buf.push("<div id=\"modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\" class=\"modal fade\"><div role=\"document\" class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" data-dismiss=\"modal\" aria-label=\"Close\" class=\"close\"><span aria-hidden=\"true\">×</span></button><h4 id=\"myModalLabel\" class=\"modal-title\">Редактирование/удаление</h4></div><div class=\"modal-body\"><form action=\"\"><div class=\"form-group\"><label for=\"\">заголовок</label><input id=\"event-title\" type=\"text\" class=\"form-control\"></div><div class=\"form-group\"><label for=\"\">начало</label><input id=\"datebegin\" type=\"text\" class=\"form-control flatpickr\"></div><div class=\"form-group\"><label for=\"\">окончание</label><input id=\"dateend\" type=\"text\" class=\"form-control flatpickr\"></div><div class=\"form-group\"><label for=\"\">отделение получатель</label><input id=\"postcode\" type=\"text\" class=\"form-control\"></div><div class=\"form-group\"><label for=\"\">описание</label><input id=\"description\" type=\"text\" class=\"form-control\"></div><div class=\"form-group\"><label for=\"\">статус</label><input id=\"status\" type=\"text\" class=\"form-control\"></div><div class=\"form-group\"><label for=\"\">исполнитель</label><input id=\"executor\" type=\"text\" class=\"form-control\"></div></form></div><div class=\"modal-footer\"><button type=\"button\" data-dismiss=\"modal\" class=\"btn btn-secondary\">Close</button><button id=\"save-event-btn\" type=\"button\" class=\"btn btn-primary\">Save changes</button><button id=\"delete-event-btn\" type=\"button\" class=\"btn btn-danger\">Delete</button></div></div></div></div>");;return buf.join("");
	}

/***/ },

/***/ 123:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {module.exports = function() {

		var _list;
		var self = this;
		var lcard = __webpack_require__(124);
		var listhtml = __webpack_require__(125);

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
				var _modal = __webpack_require__(126);
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
							url: '/evnt/emaillist',
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
				url: '/evnt/lquery',
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

/***/ 124:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(5);

	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;

	buf.push("<div class=\"card\"><div class=\"card-header\"><ul class=\"nav nav-pills card-header-pills float-xs-left\"><li class=\"nav-item\"><a id=\"add-to-list-btn\" href=\"#\" class=\"nav-link\">Список/Добавить</a></li><li class=\"nav-item\"><a id=\"clear-list-btn\" href=\"#\" class=\"nav-link\">Очистить</a></li></ul></div><div class=\"card-block\"><h4 class=\"card-title\"> </h4><div id=\"listplace\" class=\"card-text\"></div><input id=\"execemail\" type=\"email\" class=\"form-control\"><a id=\"send-list-mail\" href=\"#\" class=\"btn btn-primary\">на почту исполнителю</a></div></div>");;return buf.join("");
	}

/***/ },

/***/ 125:
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

	buf.push("<li" + (jade.attr("data-evnt-id", '' + (evnt._id) + '', true, true)) + " class=\"list-group-item list-group-item-action\">" + (jade.escape((jade_interp = evnt.title) == null ? '' : jade_interp)) + "<a href=\"#\" class=\"remove-evnt-list\"><i class=\"fa fa-trash-o fa-fw\"></i></a><a href=\"#\" class=\"edit-evnt-list\"><i class=\"fa fa-pencil fa-fw\"></i></a></li>");
	    }

	  } else {
	    var $$l = 0;
	    for (var $index in $$obj) {
	      $$l++;      var evnt = $$obj[$index];

	buf.push("<li" + (jade.attr("data-evnt-id", '' + (evnt._id) + '', true, true)) + " class=\"list-group-item list-group-item-action\">" + (jade.escape((jade_interp = evnt.title) == null ? '' : jade_interp)) + "<a href=\"#\" class=\"remove-evnt-list\"><i class=\"fa fa-trash-o fa-fw\"></i></a><a href=\"#\" class=\"edit-evnt-list\"><i class=\"fa fa-pencil fa-fw\"></i></a></li>");
	    }

	  }
	}).call(this);

	buf.push("</h4>");}.call(this,"data" in locals_for_with?locals_for_with.data:typeof data!=="undefined"?data:undefined,"undefined" in locals_for_with?locals_for_with.undefined: false?undefined:undefined));;return buf.join("");
	}

/***/ },

/***/ 126:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2Rldi9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2Rldi9tb2R1bGUvbWFwLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9kZXYvbW9kdWxlL3BvRGV0YWlsLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9kZXYvdmlldy9wb3N0T2ZmaWNlRGV0YWlsLmphZGUiLCJ3ZWJwYWNrOi8vLy4vfi9qYWRlL2xpYi9ydW50aW1lLmpzIiwid2VicGFjazovLy9mcyAoaWdub3JlZCkiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2Rldi9tb2R1bGUvbmV3RXZlbnRNb2RhbC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3ZpZXcvbmV3RXZlbnQuamFkZSIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L21vZHVsZS9lZGl0RXZlbnRNb2RhbC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3ZpZXcvZWRpdGRlbEV2ZW50LmphZGUiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2Rldi9tb2R1bGUvbGlzdG1vZC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3ZpZXcvbGlzdHNjYXJkLmphZGUiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2Rldi92aWV3L2xpc3Rzdmlldy5qYWRlIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9kZXYvdmlldy9saXN0ZmlsdGVybW9kYWwuamFkZSJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG4vL21vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcbmNvbnNvbGUubG9nKCdoaSBwY2h0Jyk7XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcdFxyXG5cclxuXHQkKFwiLmZsYXRwaWNrclwiKS5mbGF0cGlja3Ioe1xyXG5cdFx0ZW5hYmxlVGltZTogdHJ1ZSxcclxuXHR9KTtcclxuXHJcblx0dmFyIG15TWFwPXJlcXVpcmUoJy4vbW9kdWxlL21hcC5qcycpO1xyXG5cclxuXHR5bWFwcy5yZWFkeShpbml0KTtcclxuXHJcblxyXG5cdGZ1bmN0aW9uIGluaXQoKSB7XHJcblx0XHRcclxuXHRcdG15TWFwKCk7XHJcblx0XHQkKCcjbWFwLWxvYWQtbGluaycpLm9uKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0XHRcdCQoJy5jLXBsYWNlJykuaHRtbCgnPGRpdiBpZD1cIm1hcHlcIiBzdHlsZT1cIndpZHRoOiAxMDAlOyBoZWlnaHQ6IDgwMHB4XCI+PC9kaXY+Jyk7XHJcblx0XHRcdG15TWFwKCk7XHJcblx0XHR9KTtcclxuXHJcblx0fVxyXG5cclxuXHJcblx0JC5hamF4KHtcclxuXHRcdHR5cGU6ICdHRVQnLFxyXG5cdFx0dXJsOiBcIi91c2Vyc1wiLFxyXG5cdFx0ZGF0YVR5cGU6IFwianNvblwiLFxyXG5cdFx0c3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG5cdFx0XHRjYWxlbmRhckluaXQoZGF0YSk7XHJcblx0XHR9LFxyXG5cdFx0Ly9lcnJvcjogbG9hZEVycm9yXHJcblx0fSk7XHJcblxyXG5cclxuXHRmdW5jdGlvbiBjYWxlbmRhckluaXQoX2V2ZW50cykge1xyXG5cclxuXHRcdHZhciBfbmV3RXZlbnRNb2RhbCA9IHJlcXVpcmUoJy4vbW9kdWxlL25ld0V2ZW50TW9kYWwuanMnKTtcclxuXHRcdHZhciBfbmV3TW9kYWwgPSBuZXcgX25ld0V2ZW50TW9kYWwoKTtcclxuXHRcdHZhciBfZWRpdEV2ZW50TW9kYWwgPSByZXF1aXJlKCcuL21vZHVsZS9lZGl0RXZlbnRNb2RhbC5qcycpO1xyXG5cdFx0dmFyIF9lZGl0TW9kYWwgPSBuZXcgX2VkaXRFdmVudE1vZGFsKCk7XHJcblxyXG5cdFx0JCgnI2NhbGVuZGFyJykuZnVsbENhbGVuZGFyKHtcclxuXHRcdFx0aGVhZGVyOiB7XHJcblx0XHRcdFx0bGVmdDogJ3ByZXYsbmV4dCB0b2RheScsXHJcblx0XHRcdFx0Y2VudGVyOiAndGl0bGUnLFxyXG5cdFx0XHRcdHJpZ2h0OiAnbW9udGgsYWdlbmRhV2VlayxhZ2VuZGFEYXknXHJcblx0XHRcdH0sXHJcblx0XHRcdHNlbGVjdGFibGU6IHRydWUsXHJcblx0XHRcdHNlbGVjdEhlbHBlcjogdHJ1ZSxcclxuXHRcdFx0ZWRpdGFibGU6IHRydWUsXHJcblxyXG5cdFx0XHRzZWxlY3Q6IGZ1bmN0aW9uKHN0YXJ0LCBlbmQsIGpzRXZlbnQsIHZpZXcpIHtcclxuXHJcblx0XHRcdFx0X25ld01vZGFsLmluaXQoc3RhcnQsIGVuZCk7XHJcblxyXG5cdFx0XHR9LFxyXG5cdFx0XHRldmVudENsaWNrOiBmdW5jdGlvbihldmVudCwganNFdmVudCwgdmlldykge1xyXG5cclxuXHRcdFx0XHRfZWRpdE1vZGFsLmluaXQoZXZlbnQpO1xyXG5cclxuXHRcdFx0fSxcclxuXHRcdFx0ZXZlbnRBZnRlclJlbmRlcjogZnVuY3Rpb24oZXZlbnQsIGVsZW1lbnQsIHZpZXcpIHtcclxuXHJcblx0XHRcdFx0Y29uc29sZS5sb2coJ2UgYSByJyk7XHJcblxyXG5cdFx0XHR9LFxyXG5cdFx0XHRldmVudEFmdGVyQWxsUmVuZGVyOiBmdW5jdGlvbih2aWV3KSB7XHJcblxyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdlIGEgYSByJyk7XHJcblx0XHRcdH0sXHJcblx0XHRcdGRlZmF1bHRWaWV3OiAnbW9udGgnLFxyXG5cdFx0XHRlZGl0YWJsZTogdHJ1ZSxcclxuXHRcdFx0ZXZlbnRzOiBfZXZlbnRzXHJcblx0XHR9KTtcclxuXHJcblx0XHR2YXIgbGlzdG1vZCA9IHJlcXVpcmUoJy4vbW9kdWxlL2xpc3Rtb2QuanMnKTtcclxuXHRcdHZhciBfbGlzdG1vZD1uZXcgbGlzdG1vZCgpO1xyXG5cdFx0X2xpc3Rtb2QuaW5pdCgpO1xyXG5cdFx0XHJcblx0fVxyXG5cclxuXHJcblxyXG59KTtcclxuXHJcbi8vfVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2pzL2Rldi9hcHAuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHJcblx0dmFyIF9zYXZlID0gdHJ1ZTtcclxuXHR2YXIgX2V2ZW50LCBfcG9zdE9mZmljZUFycjtcclxuXHJcblx0dmFyIG15TWFwID0gbmV3IHltYXBzLk1hcChcIm1hcHlcIiwge1xyXG5cdFx0Y2VudGVyOiBbNTAuNTksIDM2LjU4XSxcclxuXHRcdHpvb206IDEwXHJcblx0fSwge1xyXG5cdFx0YnV0dG9uTWF4V2lkdGg6IDE1MFxyXG5cdH0pO1xyXG5cclxuXHRcclxuXHQkLmFqYXgoe1xyXG5cdFx0dHlwZTogJ0dFVCcsXHJcblx0XHR1cmw6IFwiLi9wb3N0YWxzLmpzb25cIixcclxuXHRcdGRhdGFUeXBlOiBcImpzb25cIixcclxuXHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuXHJcblx0XHRcdF9wb3N0T2ZmaWNlQXJyID0gZGF0YTtcclxuXHRcdFx0dmFyIG15Q29sbGVjdGlvbiA9IG5ldyB5bWFwcy5HZW9PYmplY3RDb2xsZWN0aW9uKCk7XHJcblxyXG5cdFx0XHR2YXIgcG9EdGwgPSByZXF1aXJlKCcuL3BvRGV0YWlsLmpzJyk7XHJcblx0XHRcdHZhciBteUJhbGxvb25Db250ZW50Qm9keUxheW91dCA9IHltYXBzLnRlbXBsYXRlTGF5b3V0RmFjdG9yeS5jcmVhdGVDbGFzcyhcclxuXHRcdFx0XHQnPHA+JFtwcm9wZXJ0aWVzLmRhdGEucG9zdGFsQ29kZV08L3A+PHA+JFtwcm9wZXJ0aWVzLmRhdGEuYWRkcmVzc1NvdXJjZV08L3A+PHA+JFtwcm9wZXJ0aWVzLmRhdGEudHlwZUNvZGVdPC9wPjxiciAvPjxidXR0b24gaWQ9XCJzaG93LXBvLWRldGFpbC1idG5cIj7Qn9C+0LTRgNC+0LHQvdC+PC9idXR0b24+Jywge1xyXG5cdFx0XHRcdFx0YnVpbGQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRteUJhbGxvb25Db250ZW50Qm9keUxheW91dC5zdXBlcmNsYXNzLmJ1aWxkLmNhbGwodGhpcyk7XHJcblx0XHRcdFx0XHRcdCQoJyNzaG93LXBvLWRldGFpbC1idG4nKS5vbignY2xpY2snLCB7XHJcblx0XHRcdFx0XHRcdFx0XCJwb1wiOiB0aGlzLl9kYXRhLnByb3BlcnRpZXMuX2RhdGFcclxuXHRcdFx0XHRcdFx0fSwgdGhpcy5vblNob3dQT0RldGFpbENsaWNrKTtcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRjbGVhcjogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdCQoJyNzaG93LXBvLWRldGFpbC1idG4nKS5vZmYoJ2NsaWNrJywgdGhpcy5vblNob3dQT0RldGFpbENsaWNrKTtcclxuXHRcdFx0XHRcdFx0bXlCYWxsb29uQ29udGVudEJvZHlMYXlvdXQuc3VwZXJjbGFzcy5jbGVhci5jYWxsKHRoaXMpO1xyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdG9uU2hvd1BPRGV0YWlsQ2xpY2s6IGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0XHRcdFx0cG9EdGwoZS5kYXRhLnBvLmRhdGEsIG15TWFwKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdGRhdGEuZm9yRWFjaChmdW5jdGlvbihvdGQpIHtcclxuXHRcdFx0XHQvL2NvbnNvbGUubG9nKG90ZC5sYXRpdHVkZSk7XHJcblxyXG5cdFx0XHRcdHZhciBwbWFyayA9IG5ldyB5bWFwcy5QbGFjZW1hcmsoW290ZC5sYXRpdHVkZSwgb3RkLmxvbmdpdHVkZV0sXHJcblx0XHRcdFx0XHQvKntcclxuXHRcdFx0XHRcdFx0aGludENvbnRlbnQ6IG90ZC5wb3N0YWxDb2RlLFxyXG5cdFx0XHRcdFx0XHRiYWxsb29uQ29udGVudDogXCI8cD5cIitvdGQucG9zdGFsQ29kZStcIjwvcD48cD5cIlxyXG5cdFx0XHRcdFx0XHQrb3RkLmFkZHJlc3NTb3VyY2UrXCI8L3A+PHA+XCJcclxuXHRcdFx0XHRcdFx0K290ZC50eXBlQ29kZStcclxuXHRcdFx0XHRcdFx0XCI8L3A+PGEgaHJlZj0nIycgY2xhc3M9J2J0biBidG4tcHJpbWFyeScgaWQ9J3Bvc3QtZGV0YWlsJyBkYXRhLXBvc3RhbGNvZGU9J1wiK290ZC5wb3N0YWxDb2RlK1wiJz7Qn9C+0LTRgNC+0LHQvdC10LU8L2E+XCJcclxuXHRcdFx0XHRcdH0qL1xyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRkYXRhOiBvdGQsXHJcblx0XHRcdFx0XHRcdGljb25Db250ZW50OiBvdGQucG9zdGFsQ29kZSxcclxuXHRcdFx0XHRcdFx0aWNvbkNhcHRpb246IG90ZC5wb3N0YWxDb2RlXHJcblx0XHRcdFx0XHR9LCB7XHJcblx0XHRcdFx0XHRcdGJhbGxvb25Db250ZW50TGF5b3V0OiBteUJhbGxvb25Db250ZW50Qm9keUxheW91dCxcclxuXHRcdFx0XHRcdFx0cHJlc2V0OiAnaXNsYW5kcyNibGFja1N0cmV0Y2h5SWNvbidcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHQpO1xyXG5cdFx0XHRcdC8vbXlNYXAuZ2VvT2JqZWN0cy5hZGQocG1hcmspO1xyXG5cdFx0XHRcdG15Q29sbGVjdGlvbi5hZGQocG1hcmspO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdC8qJCgnLnBvc3QtZGV0YWlsJykuY2xpY2soZnVuY3Rpb24oZSl7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coJ2NsaWNrIGNsYWNrJyk7XHJcblx0XHRcdFx0dmFyIHBjb2RlPSQoZS5jdXJyZW50VGFyZ2V0KS5hdHRyKCdkYXRhLXBvc3RhbGNvZGUnKTtcclxuXHRcdFx0XHRfcG9zdE9mZmljZUFyci5mb3JFYWNoKGZ1bmN0aW9uKG90ZCl7XHJcblx0XHRcdFx0XHRpZihvdGQucG9zdGFsQ29kZT09PXBjb2RlKXtcclxuXHRcdFx0XHRcdFx0dmFyIHRwbD1yZXF1aXJlKCcuL3ZpZXcvcG9zdE9mZmljZURldGFpbC5qYWRlJyk7XHJcblx0XHRcdFx0XHRcdCQoJy5wb2QtcGxhY2UnKS5odG1sKHRwbCh7XCJkYXRhXCI6b3RkfSkpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTsqL1xyXG5cclxuXHRcdFx0bXlNYXAuZ2VvT2JqZWN0cy5hZGQobXlDb2xsZWN0aW9uKTtcclxuXHJcblxyXG5cclxuXHRcdFx0JCgnI21hcC1jcmVhdGUtcGF0aCcpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG5cdFx0XHRcdG15Q29sbGVjdGlvbi5yZW1vdmVBbGwoKTtcclxuXHRcdFx0XHJcblxyXG5cdFx0XHR2YXIgcm9iaj1kYXRhLm1hcChmdW5jdGlvbihvdGQpe1xyXG5cdFx0XHRcdHJldHVybiB7dHlwZTond2F5UG9pbnQnLHBvaW50OltvdGQubGF0aXR1ZGUsIG90ZC5sb25naXR1ZGVdfTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdGNvbnNvbGUubG9nKFwiKysrKysrKysrKysrKysrKysrKysrKysrKysrKz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09KysrKysrKysrKysrKysrKytcIik7XHJcblx0XHRcdGNvbnNvbGUubG9nKHJvYmopO1xyXG5cdFx0XHR2YXIgcm89W3JvYmpbMF0scm9ialsxMF0scm9ialsyMl1dO1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcIisrKysrKysrKysrKysrKysrKysrKysrKysrKys9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSsrKysrKysrKysrKysrKysrXCIpO1xyXG5cdFx0XHRjb25zb2xlLmxvZyhybyk7XHJcblx0XHRcdHltYXBzLnJvdXRlKHJvKS50aGVuKFxyXG5cdFx0XHRcdGZ1bmN0aW9uKHJvdXRlKSB7XHJcblx0XHRcdFx0XHRteU1hcC5nZW9PYmplY3RzLmFkZChyb3V0ZSk7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRmdW5jdGlvbihlcnJvcikge1xyXG5cdFx0XHRcdFx0YWxlcnQoXCLQktC+0LfQvdC40LrQu9CwINC+0YjQuNCx0LrQsDogXCIgKyBlcnJvci5tZXNzYWdlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdCk7XHJcblx0XHR9KTtcdFxyXG5cclxuXHRcdH0sXHJcblx0XHQvL2Vycm9yOiBsb2FkRXJyb3JcclxuXHR9KTtcclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2pzL2Rldi9tb2R1bGUvbWFwLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3J0aWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzPWZ1bmN0aW9uKGRhdGEsbXlNYXApe1xyXG5cclxuXHJcblxyXG5cdHZhciB0cGwgPSByZXF1aXJlKCcuLi92aWV3L3Bvc3RPZmZpY2VEZXRhaWwuamFkZScpO1xyXG5cdCQoJy5wb2QtcGxhY2UnKS5odG1sKHRwbCh7XCJkYXRhXCI6IGRhdGF9KSk7XHJcblxyXG5cdCQoJy5zaG93LW5ldCcpLm9uKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblxyXG5cdFx0bXlNYXAuZGVzdHJveSgpO1xyXG5cclxuXHRcdCQoJy5jLXBsYWNlJykuaHRtbCgnPGRpdiBpZD1cImN5XCI+Y3khPC9kaXY+Jyk7XHJcblxyXG5cdFx0dmFyIGN5ID0gY3l0b3NjYXBlKHtcclxuICBjb250YWluZXI6ICQoJyNjeScpLFxyXG4gICBcclxufSk7XHJcblxyXG52YXIgZWxlbWVudHMgPSB7XHJcbiAgICAgICAgbm9kZXM6IFtcclxuICAgICAgICAgIHsgZGF0YTogeyBpZDogJ24xJywgbmFtZTogJ24xJywgc2l6ZTogNTB9LFxyXG4gICAgICAgICAgICBwb3NpdGlvbjoge3g6IDAsIHk6IDB9IH0sXHJcbiAgICAgICAgICB7IGRhdGE6IHsgaWQ6ICduMicsIG5hbWU6ICduMicsIHNpemU6IDUwfSxcclxuICAgICAgICAgICBwb3NpdGlvbjoge3g6IDEwMCwgeTogMTAwfSB9LFxyXG4gICAgICAgICAgeyBkYXRhOiB7IGlkOiAnbjMnLCBuYW1lOiAnbjMnLCBzaXplOiA1MH0sXHJcbiAgICAgICAgICAgcG9zaXRpb246IHt4OiAwLCB5OiAxMDB9IH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgICBlZGdlczogW1xyXG4gICAgICAgICAgeyBkYXRhOiB7IHNvdXJjZTogJ24xJywgdGFyZ2V0OiAnbjInIH0gfVxyXG4gICAgICAgIF1cclxuICAgICAgfTtcclxuICAgICAgY3kuYWRkKGVsZW1lbnRzKTtcclxuICAgICAgY3kubGF5b3V0KHtcclxuICAgICAgXHRuYW1lOiAnZ3JpZCcgICBcclxuICAgICAgfSk7XHJcblxyXG4gICAgIGN5Lm9uKCd0YXAnLCBmdW5jdGlvbihldnQpe1xyXG4gIGNvbnNvbGUubG9nKCAndGFwICcgKyBldnQuY3lUYXJnZXQuaWQoKSApO1xyXG59KTsgXHRcdFxyXG5cdC8vY29uc29sZS5sb2coY3kpO1xyXG5cdFx0LyokKCcjY3knKS5jeXRvc2NhcGUoe1xyXG4gIHJlYWR5OiBmdW5jdGlvbigpe1xyXG4gICAgICB2YXIgY3kgPSB0aGlzO1xyXG4gICAgICB2YXIgZWxlbWVudHMgPSB7XHJcbiAgICAgICAgbm9kZXM6IFtcclxuICAgICAgICAgIHsgZGF0YTogeyBpZDogJ24xJywgbmFtZTogJ24xJywgc2l6ZTogNTB9LFxyXG4gICAgICAgICAgICBwb3NpdGlvbjoge3g6IDAsIHk6IDB9IH0sXHJcbiAgICAgICAgICB7IGRhdGE6IHsgaWQ6ICduMicsIG5hbWU6ICduMicsIHNpemU6IDUwfSxcclxuICAgICAgICAgICBwb3NpdGlvbjoge3g6IDEwMCwgeTogMTAwfSB9LFxyXG4gICAgICAgICAgeyBkYXRhOiB7IGlkOiAnbjMnLCBuYW1lOiAnbjMnLCBzaXplOiA1MH0sXHJcbiAgICAgICAgICAgcG9zaXRpb246IHt4OiAwLCB5OiAxMDB9IH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgICBlZGdlczogW1xyXG4gICAgICAgICAgeyBkYXRhOiB7IHNvdXJjZTogJ24xJywgdGFyZ2V0OiAnbjInIH0gfVxyXG4gICAgICAgIF1cclxuICAgICAgfTtcclxuICAgICAgXHJcbiAgICAgIC8vIEFkZCBhbGwgbm9kZXMgYW5kIGVkZ2VzXHJcbiAgICAgIGN5LmFkZChlbGVtZW50cyk7XHJcblxyXG4gICAgICAvLyBMb2NrIG5vZGUgMSB0byBpdHMgaW5pdGlhbCBwb3NpdGlvbiwgKDAsMClcclxuICAgICAgY3kubm9kZXMoJyNuMScpLmxvY2soKTtcclxuXHJcbiAgICAgIC8vIERpc2FibGUgd2ViIHdvcmtlcnMgdG8gYmUgYWJsZSB0byB1c2UganNGaWRkbGVcclxuICAgICAgd2luZG93LldvcmtlciA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgIC8vIFRoZSBnZW5lcmF0ZWQgbGF5b3V0IHdvbid0IGxvY2sgbm9kZSAxIHRvIGl0cyBwb3NpdGlvblxyXG4gICAgICBjeS5sYXlvdXQoe1xyXG4gICAgICAgIGZpdDogZmFsc2UsXHJcbiAgICAgIFx0bmFtZTogJ2FyYm9yJyAgIFxyXG4gICAgICB9KTtcclxuICAgICAgXHJcbiAgICAgIGNvbnNvbGUubG9nKGN5LiQoJyNuMScpLnBvc2l0aW9uKCksXHJcbiAgICAgICAgICAgICAgICAgIGN5LiQoJyNuMicpLnBvc2l0aW9uKCksXHJcbiAgICAgICAgICAgICAgICAgIGN5LiQoJyNuMycpLnBvc2l0aW9uKCkpO1xyXG4gIH1cclxufSk7Ki9cclxuXHR9KTtcclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2pzL2Rldi9tb2R1bGUvcG9EZXRhaWwuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGphZGUgPSByZXF1aXJlKFwiQzpcXFxcX3RlbXBcXFxccGNodFxcXFxub2RlX21vZHVsZXNcXFxcamFkZVxcXFxsaWJcXFxccnVudGltZS5qc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKGRhdGEsIHVuZGVmaW5lZCkge1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJjYXJkXFxcIj48aDMgY2xhc3M9XFxcImNhcmQtaGVhZGVyXFxcIj5cIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBkYXRhLnBvc3RhbENvZGUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIjwvaDM+PGRpdiBjbGFzcz1cXFwiY2FyZC1ibG9ja1xcXCI+PGg0IGNsYXNzPVxcXCJjYXJkLXRpdGxlXFxcIj5cIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBkYXRhLnBvc3RhbENvZGUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIiBcIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBkYXRhLnNldHRsZW1lbnQpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIiBcIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBkYXRhLmFkZHJlc3NTb3VyY2UpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIjwvaDQ+PGRpdiBjbGFzcz1cXFwiY2FyZC10ZXh0XFxcIj48aDQ+0J/RgNC10LTQvtGB0YLQsNCy0LvRj9C10LzRi9C1INGD0YHQu9GD0LPQuDwvaDQ+PHVsPjwvdWw+XCIpO1xuLy8gaXRlcmF0ZSBkYXRhLnNlcnZpY2VHcm91cHNcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gZGF0YS5zZXJ2aWNlR3JvdXBzO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIgc2cgPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIjxsaT5cIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBzZy5zZXJ2aWNlR3JvdXBOYW1lKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCI8L2xpPlwiKTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBzZyA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGxpPlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IHNnLnNlcnZpY2VHcm91cE5hbWUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIjwvbGk+XCIpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG5idWYucHVzaChcIjxoND7QotC10LvQtdGE0L7QvdGLPC9oND48dWw+PC91bD5cIik7XG4vLyBpdGVyYXRlIGRhdGEucGhvbmVzXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IGRhdGEucGhvbmVzO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIgcGhvbmUgPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIjxsaT4gKFwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IHBob25lLnBob25lVG93bkNvZGUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIikgXCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gcGhvbmUucGhvbmVOdW1iZXIpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIiAoXCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gcGhvbmUucGhvbmVUeXBlTmFtZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiKTwvbGk+XCIpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIHBob25lID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8bGk+IChcIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBwaG9uZS5waG9uZVRvd25Db2RlKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCIpIFwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IHBob25lLnBob25lTnVtYmVyKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCIgKFwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IHBob25lLnBob25lVHlwZU5hbWUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIik8L2xpPlwiKTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxuYnVmLnB1c2goXCI8aDQ+0JLRgNC10LzRjyDRgNCw0LHQvtGC0Ys8L2g0Pjx1bD48L3VsPlwiKTtcbi8vIGl0ZXJhdGUgZGF0YS53b3JraW5nSG91cnNcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gZGF0YS53b3JraW5nSG91cnM7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciB3aCA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGxpPlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IHdoLndlZWtEYXlOYW1lKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCI8L2xpPlwiKTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciB3aCA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGxpPlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IHdoLndlZWtEYXlOYW1lKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCI8L2xpPlwiKTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxuYnVmLnB1c2goXCI8L2Rpdj48YSBocmVmPVxcXCIjXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1wcmltYXJ5IHNob3ctbmV0XFxcIj5zaG93IG1lIHRoZSBOZXQgaW4gdGhhIHBsYWNlPC9hPjwvZGl2PjwvZGl2PlwiKTt9LmNhbGwodGhpcyxcImRhdGFcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmRhdGE6dHlwZW9mIGRhdGEhPT1cInVuZGVmaW5lZFwiP2RhdGE6dW5kZWZpbmVkLFwidW5kZWZpbmVkXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC51bmRlZmluZWQ6dHlwZW9mIHVuZGVmaW5lZCE9PVwidW5kZWZpbmVkXCI/dW5kZWZpbmVkOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvanMvZGV2L3ZpZXcvcG9zdE9mZmljZURldGFpbC5qYWRlXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBNZXJnZSB0d28gYXR0cmlidXRlIG9iamVjdHMgZ2l2aW5nIHByZWNlZGVuY2VcbiAqIHRvIHZhbHVlcyBpbiBvYmplY3QgYGJgLiBDbGFzc2VzIGFyZSBzcGVjaWFsLWNhc2VkXG4gKiBhbGxvd2luZyBmb3IgYXJyYXlzIGFuZCBtZXJnaW5nL2pvaW5pbmcgYXBwcm9wcmlhdGVseVxuICogcmVzdWx0aW5nIGluIGEgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhXG4gKiBAcGFyYW0ge09iamVjdH0gYlxuICogQHJldHVybiB7T2JqZWN0fSBhXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLm1lcmdlID0gZnVuY3Rpb24gbWVyZ2UoYSwgYikge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgIHZhciBhdHRycyA9IGFbMF07XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhdHRycyA9IG1lcmdlKGF0dHJzLCBhW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIGF0dHJzO1xuICB9XG4gIHZhciBhYyA9IGFbJ2NsYXNzJ107XG4gIHZhciBiYyA9IGJbJ2NsYXNzJ107XG5cbiAgaWYgKGFjIHx8IGJjKSB7XG4gICAgYWMgPSBhYyB8fCBbXTtcbiAgICBiYyA9IGJjIHx8IFtdO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShhYykpIGFjID0gW2FjXTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYmMpKSBiYyA9IFtiY107XG4gICAgYVsnY2xhc3MnXSA9IGFjLmNvbmNhdChiYykuZmlsdGVyKG51bGxzKTtcbiAgfVxuXG4gIGZvciAodmFyIGtleSBpbiBiKSB7XG4gICAgaWYgKGtleSAhPSAnY2xhc3MnKSB7XG4gICAgICBhW2tleV0gPSBiW2tleV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGE7XG59O1xuXG4vKipcbiAqIEZpbHRlciBudWxsIGB2YWxgcy5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbFxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIG51bGxzKHZhbCkge1xuICByZXR1cm4gdmFsICE9IG51bGwgJiYgdmFsICE9PSAnJztcbn1cblxuLyoqXG4gKiBqb2luIGFycmF5IGFzIGNsYXNzZXMuXG4gKlxuICogQHBhcmFtIHsqfSB2YWxcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5qb2luQ2xhc3NlcyA9IGpvaW5DbGFzc2VzO1xuZnVuY3Rpb24gam9pbkNsYXNzZXModmFsKSB7XG4gIHJldHVybiAoQXJyYXkuaXNBcnJheSh2YWwpID8gdmFsLm1hcChqb2luQ2xhc3NlcykgOlxuICAgICh2YWwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpID8gT2JqZWN0LmtleXModmFsKS5maWx0ZXIoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gdmFsW2tleV07IH0pIDpcbiAgICBbdmFsXSkuZmlsdGVyKG51bGxzKS5qb2luKCcgJyk7XG59XG5cbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBjbGFzc2VzLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGNsYXNzZXNcbiAqIEBwYXJhbSB7QXJyYXkuPEJvb2xlYW4+fSBlc2NhcGVkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuY2xzID0gZnVuY3Rpb24gY2xzKGNsYXNzZXMsIGVzY2FwZWQpIHtcbiAgdmFyIGJ1ZiA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNsYXNzZXMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoZXNjYXBlZCAmJiBlc2NhcGVkW2ldKSB7XG4gICAgICBidWYucHVzaChleHBvcnRzLmVzY2FwZShqb2luQ2xhc3NlcyhbY2xhc3Nlc1tpXV0pKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1Zi5wdXNoKGpvaW5DbGFzc2VzKGNsYXNzZXNbaV0pKTtcbiAgICB9XG4gIH1cbiAgdmFyIHRleHQgPSBqb2luQ2xhc3NlcyhidWYpO1xuICBpZiAodGV4dC5sZW5ndGgpIHtcbiAgICByZXR1cm4gJyBjbGFzcz1cIicgKyB0ZXh0ICsgJ1wiJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cbn07XG5cblxuZXhwb3J0cy5zdHlsZSA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyh2YWwpLm1hcChmdW5jdGlvbiAoc3R5bGUpIHtcbiAgICAgIHJldHVybiBzdHlsZSArICc6JyArIHZhbFtzdHlsZV07XG4gICAgfSkuam9pbignOycpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB2YWw7XG4gIH1cbn07XG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gYXR0cmlidXRlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWxcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gZXNjYXBlZFxuICogQHBhcmFtIHtCb29sZWFufSB0ZXJzZVxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmF0dHIgPSBmdW5jdGlvbiBhdHRyKGtleSwgdmFsLCBlc2NhcGVkLCB0ZXJzZSkge1xuICBpZiAoa2V5ID09PSAnc3R5bGUnKSB7XG4gICAgdmFsID0gZXhwb3J0cy5zdHlsZSh2YWwpO1xuICB9XG4gIGlmICgnYm9vbGVhbicgPT0gdHlwZW9mIHZhbCB8fCBudWxsID09IHZhbCkge1xuICAgIGlmICh2YWwpIHtcbiAgICAgIHJldHVybiAnICcgKyAodGVyc2UgPyBrZXkgOiBrZXkgKyAnPVwiJyArIGtleSArICdcIicpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICB9IGVsc2UgaWYgKDAgPT0ga2V5LmluZGV4T2YoJ2RhdGEnKSAmJiAnc3RyaW5nJyAhPSB0eXBlb2YgdmFsKSB7XG4gICAgaWYgKEpTT04uc3RyaW5naWZ5KHZhbCkuaW5kZXhPZignJicpICE9PSAtMSkge1xuICAgICAgY29uc29sZS53YXJuKCdTaW5jZSBKYWRlIDIuMC4wLCBhbXBlcnNhbmRzIChgJmApIGluIGRhdGEgYXR0cmlidXRlcyAnICtcbiAgICAgICAgICAgICAgICAgICAnd2lsbCBiZSBlc2NhcGVkIHRvIGAmYW1wO2AnKTtcbiAgICB9O1xuICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbC50b0lTT1N0cmluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS53YXJuKCdKYWRlIHdpbGwgZWxpbWluYXRlIHRoZSBkb3VibGUgcXVvdGVzIGFyb3VuZCBkYXRlcyBpbiAnICtcbiAgICAgICAgICAgICAgICAgICAnSVNPIGZvcm0gYWZ0ZXIgMi4wLjAnKTtcbiAgICB9XG4gICAgcmV0dXJuICcgJyArIGtleSArIFwiPSdcIiArIEpTT04uc3RyaW5naWZ5KHZhbCkucmVwbGFjZSgvJy9nLCAnJmFwb3M7JykgKyBcIidcIjtcbiAgfSBlbHNlIGlmIChlc2NhcGVkKSB7XG4gICAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsLnRvSVNPU3RyaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0phZGUgd2lsbCBzdHJpbmdpZnkgZGF0ZXMgaW4gSVNPIGZvcm0gYWZ0ZXIgMi4wLjAnKTtcbiAgICB9XG4gICAgcmV0dXJuICcgJyArIGtleSArICc9XCInICsgZXhwb3J0cy5lc2NhcGUodmFsKSArICdcIic7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsLnRvSVNPU3RyaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0phZGUgd2lsbCBzdHJpbmdpZnkgZGF0ZXMgaW4gSVNPIGZvcm0gYWZ0ZXIgMi4wLjAnKTtcbiAgICB9XG4gICAgcmV0dXJuICcgJyArIGtleSArICc9XCInICsgdmFsICsgJ1wiJztcbiAgfVxufTtcblxuLyoqXG4gKiBSZW5kZXIgdGhlIGdpdmVuIGF0dHJpYnV0ZXMgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7T2JqZWN0fSBlc2NhcGVkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuYXR0cnMgPSBmdW5jdGlvbiBhdHRycyhvYmosIHRlcnNlKXtcbiAgdmFyIGJ1ZiA9IFtdO1xuXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcblxuICBpZiAoa2V5cy5sZW5ndGgpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHZhciBrZXkgPSBrZXlzW2ldXG4gICAgICAgICwgdmFsID0gb2JqW2tleV07XG5cbiAgICAgIGlmICgnY2xhc3MnID09IGtleSkge1xuICAgICAgICBpZiAodmFsID0gam9pbkNsYXNzZXModmFsKSkge1xuICAgICAgICAgIGJ1Zi5wdXNoKCcgJyArIGtleSArICc9XCInICsgdmFsICsgJ1wiJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJ1Zi5wdXNoKGV4cG9ydHMuYXR0cihrZXksIHZhbCwgZmFsc2UsIHRlcnNlKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ1Zi5qb2luKCcnKTtcbn07XG5cbi8qKlxuICogRXNjYXBlIHRoZSBnaXZlbiBzdHJpbmcgb2YgYGh0bWxgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBodG1sXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG52YXIgamFkZV9lbmNvZGVfaHRtbF9ydWxlcyA9IHtcbiAgJyYnOiAnJmFtcDsnLFxuICAnPCc6ICcmbHQ7JyxcbiAgJz4nOiAnJmd0OycsXG4gICdcIic6ICcmcXVvdDsnXG59O1xudmFyIGphZGVfbWF0Y2hfaHRtbCA9IC9bJjw+XCJdL2c7XG5cbmZ1bmN0aW9uIGphZGVfZW5jb2RlX2NoYXIoYykge1xuICByZXR1cm4gamFkZV9lbmNvZGVfaHRtbF9ydWxlc1tjXSB8fCBjO1xufVxuXG5leHBvcnRzLmVzY2FwZSA9IGphZGVfZXNjYXBlO1xuZnVuY3Rpb24gamFkZV9lc2NhcGUoaHRtbCl7XG4gIHZhciByZXN1bHQgPSBTdHJpbmcoaHRtbCkucmVwbGFjZShqYWRlX21hdGNoX2h0bWwsIGphZGVfZW5jb2RlX2NoYXIpO1xuICBpZiAocmVzdWx0ID09PSAnJyArIGh0bWwpIHJldHVybiBodG1sO1xuICBlbHNlIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIFJlLXRocm93IHRoZSBnaXZlbiBgZXJyYCBpbiBjb250ZXh0IHRvIHRoZVxuICogdGhlIGphZGUgaW4gYGZpbGVuYW1lYCBhdCB0aGUgZ2l2ZW4gYGxpbmVub2AuXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyXG4gKiBAcGFyYW0ge1N0cmluZ30gZmlsZW5hbWVcbiAqIEBwYXJhbSB7U3RyaW5nfSBsaW5lbm9cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMucmV0aHJvdyA9IGZ1bmN0aW9uIHJldGhyb3coZXJyLCBmaWxlbmFtZSwgbGluZW5vLCBzdHIpe1xuICBpZiAoIShlcnIgaW5zdGFuY2VvZiBFcnJvcikpIHRocm93IGVycjtcbiAgaWYgKCh0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnIHx8ICFmaWxlbmFtZSkgJiYgIXN0cikge1xuICAgIGVyci5tZXNzYWdlICs9ICcgb24gbGluZSAnICsgbGluZW5vO1xuICAgIHRocm93IGVycjtcbiAgfVxuICB0cnkge1xuICAgIHN0ciA9IHN0ciB8fCByZXF1aXJlKCdmcycpLnJlYWRGaWxlU3luYyhmaWxlbmFtZSwgJ3V0ZjgnKVxuICB9IGNhdGNoIChleCkge1xuICAgIHJldGhyb3coZXJyLCBudWxsLCBsaW5lbm8pXG4gIH1cbiAgdmFyIGNvbnRleHQgPSAzXG4gICAgLCBsaW5lcyA9IHN0ci5zcGxpdCgnXFxuJylcbiAgICAsIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gY29udGV4dCwgMClcbiAgICAsIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgY29udGV4dCk7XG5cbiAgLy8gRXJyb3IgY29udGV4dFxuICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/ICcgID4gJyA6ICcgICAgJylcbiAgICAgICsgY3VyclxuICAgICAgKyAnfCAnXG4gICAgICArIGxpbmU7XG4gIH0pLmpvaW4oJ1xcbicpO1xuXG4gIC8vIEFsdGVyIGV4Y2VwdGlvbiBtZXNzYWdlXG4gIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8ICdKYWRlJykgKyAnOicgKyBsaW5lbm9cbiAgICArICdcXG4nICsgY29udGV4dCArICdcXG5cXG4nICsgZXJyLm1lc3NhZ2U7XG4gIHRocm93IGVycjtcbn07XG5cbmV4cG9ydHMuRGVidWdJdGVtID0gZnVuY3Rpb24gRGVidWdJdGVtKGxpbmVubywgZmlsZW5hbWUpIHtcbiAgdGhpcy5saW5lbm8gPSBsaW5lbm87XG4gIHRoaXMuZmlsZW5hbWUgPSBmaWxlbmFtZTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9qYWRlL2xpYi9ydW50aW1lLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAyIDMiLCIvKiAoaWdub3JlZCkgKi9cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBmcyAoaWdub3JlZClcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIgMyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcblxyXG5cdHRoaXMuX21vZGFsID0gcmVxdWlyZSgnLi4vdmlldy9uZXdFdmVudC5qYWRlJyk7XHJcblxyXG5cdHRoaXMuZGVzdHJveU1vZGFsID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcclxuXHRcdCQoXCIjc2F2ZS1ldmVudC1idG5cIikub2ZmKCdjbGljaycpO1xyXG5cdFx0JCgnI2Nsb3NlLW1vZGFsLWJ0bicpLm9mZignY2xpY2snKTtcclxuXHRcdCQoJyNjbG9zZS1tb2RhbC1jcm9zcy1idG4nKS5vZmYoJ2NsaWNrJyk7XHJcblx0XHQkKCcubW9kYWwtcGxhY2UnKS5odG1sKCcnKTtcclxuXHR9O1xyXG5cclxuXHR2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG5cdHRoaXMuaW5pdCA9IGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcclxuXHJcblx0XHQkKCcubW9kYWwtcGxhY2UnKS5odG1sKHRoaXMuX21vZGFsKCkpO1xyXG5cdFx0JChcIi5mbGF0cGlja3JcIikuZmxhdHBpY2tyKHtcclxuXHRcdFx0ZW5hYmxlVGltZTogdHJ1ZSxcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoXCIjc2F2ZS1ldmVudC1idG5cIikub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHR2YXIgZXZudCA9IHtcclxuXHRcdFx0XHR0aXRsZTogJCgnI2V2ZW50LXRpdGxlJykudmFsKCksXHJcblx0XHRcdFx0c3RhcnQ6IG1vbWVudCgkKCcjZGF0ZWJlZ2luJykudmFsKCkpLFxyXG5cdFx0XHRcdGVuZDogbW9tZW50KCQoJyNkYXRlZW5kJykudmFsKCkpLFxyXG5cdFx0XHRcdHBvc3RhbENvZGU6ICQoJyNwb3N0Y29kZScpLnZhbCgpLFxyXG5cdFx0XHRcdHN0YXR1czogJCgnI3N0YXR1cycpLnZhbCgpLFxyXG5cdFx0XHRcdGRlc2NyaXB0aW9uOiAkKFwiI2Rlc2NyaXB0aW9uXCIpLnZhbCgpLFxyXG5cdFx0XHRcdGV4ZWN1dG9yOiAkKCcjZXhlY3V0b3InKS52YWwoKVxyXG5cdFx0XHR9O1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcImFkZCBldmVudFwiKTtcclxuXHRcdFx0JCgnI2NhbGVuZGFyJykuZnVsbENhbGVuZGFyKCdyZW5kZXJFdmVudCcsIGV2bnQsIHRydWUpO1xyXG5cclxuXHRcdFx0JC5hamF4KHtcclxuXHRcdFx0XHR0eXBlOiAnUE9TVCcsXHJcblx0XHRcdFx0dXJsOiAnL2V2bnQvc2F2ZScsXHJcblx0XHRcdFx0ZGF0YTogSlNPTi5zdHJpbmdpZnkoZXZudCksXHJcblx0XHRcdFx0ZGF0YVR5cGU6IFwianNvblwiLFxyXG5cdFx0XHRcdGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuXHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcImRhdGEgc2F2ZVwiKTtcclxuXHRcdFx0XHRcdHZhciBldm50QXJyYXkgPSAkKCcjY2FsZW5kYXInKS5mdWxsQ2FsZW5kYXIoJ2NsaWVudEV2ZW50cycpO1xyXG5cdFx0XHRcdFx0dmFyIF9ldm50ID0gZXZudEFycmF5W2V2bnRBcnJheS5sZW5ndGggLSAxXTtcclxuXHRcdFx0XHRcdF9ldm50Ll9pZCA9IGRhdGEuaW5zZXJ0ZWRpZDtcclxuXHJcblx0XHRcdFx0XHQkKCcjY2FsZW5kYXInKS5mdWxsQ2FsZW5kYXIoJ3VwZGF0ZUV2ZW50JywgX2V2bnQpO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0Ly9lcnJvcjogYWpheEVycm9yXHJcblx0XHRcdH0pO1xyXG5cclxuXHJcblx0XHR9KTtcclxuXHJcblx0XHQkKCcjY2xvc2UtbW9kYWwtYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoJyNjbG9zZS1tb2RhbC1jcm9zcy1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblxyXG5cdFx0fSk7XHJcblxyXG5cdFx0JCgnI21vZGFsJykubW9kYWwoJ3Nob3cnKTtcclxuXHJcblx0XHQkKCcjZGF0ZWJlZ2luJykudmFsKHN0YXJ0LmZvcm1hdCgnWVlZWS1NTS1ERCBoaDptbScpKTtcclxuXHRcdCQoJyNkYXRlZW5kJykudmFsKGVuZC5mb3JtYXQoJ1lZWVktTU0tREQgaGg6bW0nKSk7XHJcblxyXG5cdFx0JCgnI21vZGFsJykub24oJ2hpZGRlbi5icy5tb2RhbCcsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0Y29uc29sZS5sb2coJ21vZGFsIGhpZGUnKTtcclxuXHRcdFx0c2VsZi5kZXN0cm95TW9kYWwoKTtcclxuXHRcdH0pO1xyXG5cclxuXHR9O1xyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvanMvZGV2L21vZHVsZS9uZXdFdmVudE1vZGFsLmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBqYWRlID0gcmVxdWlyZShcIkM6XFxcXF90ZW1wXFxcXHBjaHRcXFxcbm9kZV9tb2R1bGVzXFxcXGphZGVcXFxcbGliXFxcXHJ1bnRpbWUuanNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8ZGl2IGlkPVxcXCJtb2RhbFxcXCIgdGFiaW5kZXg9XFxcIi0xXFxcIiByb2xlPVxcXCJkaWFsb2dcXFwiIGFyaWEtbGFiZWxsZWRieT1cXFwibXlNb2RhbExhYmVsXFxcIiBhcmlhLWhpZGRlbj1cXFwidHJ1ZVxcXCIgY2xhc3M9XFxcIm1vZGFsIGZhZGVcXFwiPjxkaXYgcm9sZT1cXFwiZG9jdW1lbnRcXFwiIGNsYXNzPVxcXCJtb2RhbC1kaWFsb2dcXFwiPjxkaXYgY2xhc3M9XFxcIm1vZGFsLWNvbnRlbnRcXFwiPjxkaXYgY2xhc3M9XFxcIm1vZGFsLWhlYWRlclxcXCI+PGJ1dHRvbiBpZD1cXFwiY2xvc2UtbW9kYWwtY3Jvc3MtYnRuXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGRhdGEtZGlzbWlzcz1cXFwibW9kYWxcXFwiIGFyaWEtbGFiZWw9XFxcIkNsb3NlXFxcIiBjbGFzcz1cXFwiY2xvc2VcXFwiPjxzcGFuIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIj7Dlzwvc3Bhbj48L2J1dHRvbj48aDQgaWQ9XFxcIm15TW9kYWxMYWJlbFxcXCIgY2xhc3M9XFxcIm1vZGFsLXRpdGxlXFxcIj7QodC+0LfQtNCw0L3QuNC1PC9oND48L2Rpdj48ZGl2IGNsYXNzPVxcXCJtb2RhbC1ib2R5XFxcIj48Zm9ybSBhY3Rpb249XFxcIlxcXCI+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7Qt9Cw0LPQvtC70L7QstC+0Lo8L2xhYmVsPjxpbnB1dCBpZD1cXFwiZXZlbnQtdGl0bGVcXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0L3QsNGH0LDQu9C+PC9sYWJlbD48aW5wdXQgaWQ9XFxcImRhdGViZWdpblxcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbCBmbGF0cGlja3JcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0L7QutC+0L3Rh9Cw0L3QuNC1PC9sYWJlbD48aW5wdXQgaWQ9XFxcImRhdGVlbmRcXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2wgZmxhdHBpY2tyXFxcIj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj48bGFiZWwgZm9yPVxcXCJcXFwiPtC+0YLQtNC10LvQtdC90LjQtSDQv9C+0LvRg9GH0LDRgtC10LvRjDwvbGFiZWw+PGlucHV0IGlkPVxcXCJwb3N0Y29kZVxcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7QvtC/0LjRgdCw0L3QuNC1PC9sYWJlbD48aW5wdXQgaWQ9XFxcImRlc2NyaXB0aW9uXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj48bGFiZWwgZm9yPVxcXCJcXFwiPtGB0YLQsNGC0YPRgTwvbGFiZWw+PGlucHV0IGlkPVxcXCJzdGF0dXNcXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0LjRgdC/0L7Qu9C90LjRgtC10LvRjDwvbGFiZWw+PGlucHV0IGlkPVxcXCJleGVjdXRvclxcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+PC9kaXY+PC9mb3JtPjwvZGl2PjxkaXYgY2xhc3M9XFxcIm1vZGFsLWZvb3RlclxcXCI+PGJ1dHRvbiBpZD1cXFwiY2xvc2UtbW9kYWwtYnRuXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGRhdGEtZGlzbWlzcz1cXFwibW9kYWxcXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+Q2xvc2U8L2J1dHRvbj48YnV0dG9uIGlkPVxcXCJzYXZlLWV2ZW50LWJ0blxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1wcmltYXJ5XFxcIj5TYXZlIGNoYW5nZXM8L2J1dHRvbj48L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy9qcy9kZXYvdmlldy9uZXdFdmVudC5qYWRlXG4vLyBtb2R1bGUgaWQgPSAxMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHJcblx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuXHR0aGlzLmRlc3Ryb3lNb2RhbCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHJcblx0XHQkKFwiI3NhdmUtZXZlbnQtYnRuXCIpLm9mZignY2xpY2snKTtcclxuXHRcdCQoJyNjbG9zZS1tb2RhbC1idG4nKS5vZmYoJ2NsaWNrJyk7XHJcblx0XHQkKCcjY2xvc2UtbW9kYWwtY3Jvc3MtYnRuJykub2ZmKCdjbGljaycpO1xyXG5cdFx0JCgnI2RlbGV0ZS1ldmVudC1idG4nKS5vZmYoKTtcclxuXHRcdCQoJy5tb2RhbC1wbGFjZScpLmh0bWwoJycpO1xyXG5cdFx0c2VsZi5ldmVudCA9IG51bGw7XHJcblx0fTtcclxuXHJcblx0dGhpcy5pbml0ID0gZnVuY3Rpb24oZXZudCkge1xyXG5cclxuXHRcdGNvbnNvbGUubG9nKGV2bnQpO1xyXG5cdFx0c2VsZi5ldmVudCA9IGV2bnQ7XHJcblxyXG5cdFx0dmFyIF9tb2RhbGh0bWwgPSByZXF1aXJlKCcuLi92aWV3L2VkaXRkZWxFdmVudC5qYWRlJyk7XHJcblx0XHQkKCcubW9kYWwtcGxhY2UnKS5odG1sKF9tb2RhbGh0bWwoKSk7XHJcblx0XHQkKFwiLmZsYXRwaWNrclwiKS5mbGF0cGlja3Ioe1xyXG5cdFx0XHRlbmFibGVUaW1lOiB0cnVlLFxyXG5cdFx0fSk7XHJcblxyXG5cdFx0JCgnI21vZGFsJykubW9kYWwoJ3Nob3cnKTtcclxuXHJcblx0XHQkKCcjZGF0ZWJlZ2luJykudmFsKGV2bnQuc3RhcnQuZm9ybWF0KCdZWVlZLU1NLUREIGhoOm1tJykpO1xyXG5cdFx0JCgnI2RhdGVlbmQnKS52YWwoZXZudC5lbmQuZm9ybWF0KCdZWVlZLU1NLUREIGhoOm1tJykpO1xyXG5cdFx0JCgnI2V2ZW50LXRpdGxlJykudmFsKGV2bnQudGl0bGUpO1xyXG5cdFx0JCgnI3Bvc3Rjb2RlJykudmFsKGV2bnQucG9zdGFsQ29kZSk7XHJcblx0XHQkKCcjc3RhdHVzJykudmFsKGV2bnQuc3RhdHVzKTtcclxuXHRcdCQoXCIjZGVzY3JpcHRpb25cIikudmFsKGV2bnQuZGVzY3JpcHRpb24pO1xyXG5cdFx0JCgnI2V4ZWN1dG9yJykudmFsKGV2bnQuZXhlY3V0b3IpO1xyXG5cclxuXHJcblx0XHQkKFwiI3NhdmUtZXZlbnQtYnRuXCIpLm9uKCdjbGljaycsZnVuY3Rpb24oZSkge1xyXG5cclxuXHRcdFx0Y29uc29sZS5sb2coJ3NhdmUgZnJvbSBtb2RhbCcpO1xyXG5cdFx0XHR2YXIgIF9ldmVudD17fTtcclxuXHJcblx0XHRcdF9ldmVudC50aXRsZT1zZWxmLmV2ZW50LnRpdGxlID0gJCgnI2V2ZW50LXRpdGxlJykudmFsKCk7XHJcblx0XHRcdF9ldmVudC5zdGFydD1zZWxmLmV2ZW50LnN0YXJ0ID0gbW9tZW50KCQoJyNkYXRlYmVnaW4nKS52YWwoKSk7XHJcblx0XHRcdF9ldmVudC5lbmQ9c2VsZi5ldmVudC5lbmQgPSBtb21lbnQoJCgnI2RhdGVlbmQnKS52YWwoKSk7XHJcblx0XHRcdF9ldmVudC5wb3N0YWxDb2RlPXNlbGYuZXZlbnQucG9zdGFsQ29kZSA9ICQoJyNwb3N0Y29kZScpLnZhbCgpO1xyXG5cdFx0XHRfZXZlbnQuc3RhdHVzPXNlbGYuZXZlbnQuc3RhdHVzID0gJCgnI3N0YXR1cycpLnZhbCgpO1xyXG5cdFx0XHRfZXZlbnQuZGVzY3JpcHRpb249c2VsZi5ldmVudC5kZXNjcmlwdGlvbiA9ICQoXCIjZGVzY3JpcHRpb25cIikudmFsKCk7XHJcblx0XHRcdF9ldmVudC5leGVjdXRvcj1zZWxmLmV2ZW50LmV4ZWN1dG9yID0gJCgnI2V4ZWN1dG9yJykudmFsKCk7XHJcblxyXG5cdFx0XHQkLmFqYXgoe1xyXG5cdFx0XHRcdHR5cGU6ICdQT1NUJyxcclxuXHRcdFx0XHR1cmw6ICcvdXNlcnMvdXBkYXRlLycrc2VsZi5ldmVudC5faWQsXHJcblx0XHRcdFx0ZGF0YTogSlNPTi5zdHJpbmdpZnkoX2V2ZW50KSxcclxuXHRcdFx0XHRkYXRhVHlwZTogXCJqc29uXCIsXHJcblx0XHRcdFx0Y29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG5cdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiZGF0YSB1cGRhdGVcIik7XHJcblx0XHRcdFx0XHQkKCcjY2FsZW5kYXInKS5mdWxsQ2FsZW5kYXIoJ3VwZGF0ZUV2ZW50Jywgc2VsZi5ldmVudCk7XHJcblx0XHRcdFx0XHQkKCcjY2FsZW5kYXInKS5mdWxsQ2FsZW5kYXIoJ3JlcmVuZGVyRXZlbnRzJyk7XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0JCgnI21vZGFsJykubW9kYWwoJ2hpZGUnKTtcclxuXHRcdFx0XHRcdC8qdmFyIF9tb2RhbCA9IHJlcXVpcmUoJy4uL3ZpZXcvYWxsb2suamFkZScpO1xyXG5cdFx0XHRcdFx0JCgnLm1vZGFsLXBsYWNlJykuaHRtbChfbW9kYWwoKSk7XHJcblx0XHRcdFx0XHQkKCcjbW9kYWwnKS5tb2RhbCgnc2hvdycpOyovXHJcblxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0Ly9lcnJvcjogYWpheEVycm9yXHJcblx0XHRcdH0pO1x0XHRcdFxyXG5cdFx0fSk7XHJcblx0XHQkKCcjZGVsZXRlLWV2ZW50LWJ0bicpLm9uKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0XHRcdCQuYWpheCh7XHJcblx0XHRcdHR5cGU6ICdERUxFVEUnLFxyXG5cdFx0XHR1cmw6ICcvdXNlcnMvZGVsLycgKyBzZWxmLmV2ZW50Ll9pZCxcclxuXHRcdFx0ZGF0YVR5cGU6IFwianNvblwiLFxyXG5cdFx0XHRjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcblx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhcImRhdGEgZGVsXCIpO1xyXG5cdFx0XHRcdCQoJyNjYWxlbmRhcicpLmZ1bGxDYWxlbmRhcigncmVtb3ZlRXZlbnRzJywgc2VsZi5ldmVudC5faWQpO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHQvL2Vycm9yOiBhamF4RXJyb3JcclxuXHRcdH0pO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JCgnI21vZGFsJykub24oJ2hpZGRlbi5icy5tb2RhbCcsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0Y29uc29sZS5sb2coJ21vZGFsIGhpZGUnKTtcclxuXHRcdFx0c2VsZi5kZXN0cm95TW9kYWwoKTtcclxuXHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy9qcy9kZXYvbW9kdWxlL2VkaXRFdmVudE1vZGFsLmpzXG4vLyBtb2R1bGUgaWQgPSAxMjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGphZGUgPSByZXF1aXJlKFwiQzpcXFxcX3RlbXBcXFxccGNodFxcXFxub2RlX21vZHVsZXNcXFxcamFkZVxcXFxsaWJcXFxccnVudGltZS5qc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIjxkaXYgaWQ9XFxcIm1vZGFsXFxcIiB0YWJpbmRleD1cXFwiLTFcXFwiIHJvbGU9XFxcImRpYWxvZ1xcXCIgYXJpYS1sYWJlbGxlZGJ5PVxcXCJteU1vZGFsTGFiZWxcXFwiIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIiBjbGFzcz1cXFwibW9kYWwgZmFkZVxcXCI+PGRpdiByb2xlPVxcXCJkb2N1bWVudFxcXCIgY2xhc3M9XFxcIm1vZGFsLWRpYWxvZ1xcXCI+PGRpdiBjbGFzcz1cXFwibW9kYWwtY29udGVudFxcXCI+PGRpdiBjbGFzcz1cXFwibW9kYWwtaGVhZGVyXFxcIj48YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgZGF0YS1kaXNtaXNzPVxcXCJtb2RhbFxcXCIgYXJpYS1sYWJlbD1cXFwiQ2xvc2VcXFwiIGNsYXNzPVxcXCJjbG9zZVxcXCI+PHNwYW4gYXJpYS1oaWRkZW49XFxcInRydWVcXFwiPsOXPC9zcGFuPjwvYnV0dG9uPjxoNCBpZD1cXFwibXlNb2RhbExhYmVsXFxcIiBjbGFzcz1cXFwibW9kYWwtdGl0bGVcXFwiPtCg0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40LUv0YPQtNCw0LvQtdC90LjQtTwvaDQ+PC9kaXY+PGRpdiBjbGFzcz1cXFwibW9kYWwtYm9keVxcXCI+PGZvcm0gYWN0aW9uPVxcXCJcXFwiPjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0LfQsNCz0L7Qu9C+0LLQvtC6PC9sYWJlbD48aW5wdXQgaWQ9XFxcImV2ZW50LXRpdGxlXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj48bGFiZWwgZm9yPVxcXCJcXFwiPtC90LDRh9Cw0LvQvjwvbGFiZWw+PGlucHV0IGlkPVxcXCJkYXRlYmVnaW5cXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2wgZmxhdHBpY2tyXFxcIj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj48bGFiZWwgZm9yPVxcXCJcXFwiPtC+0LrQvtC90YfQsNC90LjQtTwvbGFiZWw+PGlucHV0IGlkPVxcXCJkYXRlZW5kXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sIGZsYXRwaWNrclxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7QvtGC0LTQtdC70LXQvdC40LUg0L/QvtC70YPRh9Cw0YLQtdC70Yw8L2xhYmVsPjxpbnB1dCBpZD1cXFwicG9zdGNvZGVcXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0L7Qv9C40YHQsNC90LjQtTwvbGFiZWw+PGlucHV0IGlkPVxcXCJkZXNjcmlwdGlvblxcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7RgdGC0LDRgtGD0YE8L2xhYmVsPjxpbnB1dCBpZD1cXFwic3RhdHVzXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj48bGFiZWwgZm9yPVxcXCJcXFwiPtC40YHQv9C+0LvQvdC40YLQtdC70Yw8L2xhYmVsPjxpbnB1dCBpZD1cXFwiZXhlY3V0b3JcXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiPjwvZGl2PjwvZm9ybT48L2Rpdj48ZGl2IGNsYXNzPVxcXCJtb2RhbC1mb290ZXJcXFwiPjxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBkYXRhLWRpc21pc3M9XFxcIm1vZGFsXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPkNsb3NlPC9idXR0b24+PGJ1dHRvbiBpZD1cXFwic2F2ZS1ldmVudC1idG5cXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tcHJpbWFyeVxcXCI+U2F2ZSBjaGFuZ2VzPC9idXR0b24+PGJ1dHRvbiBpZD1cXFwiZGVsZXRlLWV2ZW50LWJ0blxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1kYW5nZXJcXFwiPkRlbGV0ZTwvYnV0dG9uPjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2PlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2pzL2Rldi92aWV3L2VkaXRkZWxFdmVudC5qYWRlXG4vLyBtb2R1bGUgaWQgPSAxMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHJcblx0dmFyIF9saXN0O1xyXG5cdHZhciBzZWxmID0gdGhpcztcclxuXHR2YXIgbGNhcmQgPSByZXF1aXJlKCcuLi92aWV3L2xpc3RzY2FyZC5qYWRlJyk7XHJcblx0dmFyIGxpc3RodG1sID0gcmVxdWlyZSgnLi4vdmlldy9saXN0c3ZpZXcuamFkZScpO1xyXG5cclxuXHR0aGlzLmRlc3Ryb3lNb2RhbCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdC8vJChcIiNzYXZlLWV2ZW50LWJ0blwiKS5vZmYoJ2NsaWNrJyk7XHJcblx0XHQkKCcubW9kYWwtcGxhY2UnKS5odG1sKCcnKTtcclxuXHR9O1xyXG5cclxuXHR0aGlzLmluaXQgPSBmdW5jdGlvbigpIHtcclxuXHJcblx0XHQkKCcubGlzdC1wbGFjZScpLmh0bWwobGNhcmQoKSk7XHJcblx0XHQkKCcjY2xlYXItbGlzdC1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0Y29uc29sZS5sb2coJ2xpc3QgY2xlYXInKTtcclxuXHRcdFx0X2xpc3QgPSBudWxsO1xyXG5cdFx0fSk7XHJcblx0XHQkKCcjYWRkLXRvLWxpc3QtYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHZhciBfbW9kYWwgPSByZXF1aXJlKCcuLi92aWV3L2xpc3RmaWx0ZXJtb2RhbC5qYWRlJyk7XHJcblx0XHRcdCQoJy5tb2RhbC1wbGFjZScpLmh0bWwoX21vZGFsKCkpO1xyXG5cdFx0XHQkKCcjbG9hZC1maWx0ZXItbGlzdC1idG4nKS5vbignY2xpY2snLCBsb2FkRmlsdGVyZWRMaXN0KTtcclxuXHRcdFx0JCgnI21vZGFsJykubW9kYWwoJ3Nob3cnKTtcclxuXHRcdFx0JChcIi5mbGF0cGlja3JcIikuZmxhdHBpY2tyKHtcclxuXHRcdFx0XHRlbmFibGVUaW1lOiB0cnVlLFxyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cclxuXHJcblx0XHQkKCcjbW9kYWwnKS5vbignaGlkZGVuLmJzLm1vZGFsJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRjb25zb2xlLmxvZygnbW9kYWwgaGlkZScpO1xyXG5cdFx0XHRzZWxmLmRlc3Ryb3lNb2RhbCgpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JCgnI3NlbmQtbGlzdC1tYWlsJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRpZiAoX2xpc3QubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdGlmICgkKCcjZXhlY2VtYWlsJykudmFsKCkpIHtcclxuXHJcblx0XHRcdFx0XHR2YXIgZW1haWx0eHQ9e1widHh0XCI6bGlzdGh0bWwoe1wiZGF0YVwiOiBfbGlzdH0pfTtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKGVtYWlsdHh0KTtcclxuXHJcblx0XHRcdFx0XHQkLmFqYXgoe1xyXG5cdFx0XHRcdFx0XHR0eXBlOiAnUE9TVCcsXHJcblx0XHRcdFx0XHRcdHVybDogJy9ldm50L2VtYWlsbGlzdCcsXHJcblx0XHRcdFx0XHRcdGRhdGE6IEpTT04uc3RyaW5naWZ5KGVtYWlsdHh0KSxcclxuXHRcdFx0XHRcdFx0ZGF0YVR5cGU6IFwianNvblwiLFxyXG5cdFx0XHRcdFx0XHRjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcblx0XHRcdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuXHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhcInNlYXJjaCBva1wiKTtcclxuXHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0Ly9lcnJvcjogYWpheEVycm9yXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHR9O1xyXG5cclxuXHR0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcclxuXHJcblx0fTtcclxuXHJcblx0ZnVuY3Rpb24gbG9hZEZpbHRlcmVkTGlzdCgpIHtcclxuXHRcdHZhciBscXVlcnkgPSB7fTtcclxuXHRcdCQoJy5sLXF1ZXJ5JykuZWFjaChmdW5jdGlvbihpLCBlbCkge1xyXG5cdFx0XHRpZiAoJChlbCkudmFsKCkpIHtcclxuXHRcdFx0XHRscXVlcnlbJChlbCkuYXR0cignZGF0YS1scXVlcnktbmFtZScpXSA9ICQoZWwpLnZhbCgpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdGNvbnNvbGUubG9nKGxxdWVyeSk7XHJcblxyXG5cdFx0JC5hamF4KHtcclxuXHRcdFx0dHlwZTogJ1BPU1QnLFxyXG5cdFx0XHR1cmw6ICcvZXZudC9scXVlcnknLFxyXG5cdFx0XHRkYXRhOiBKU09OLnN0cmluZ2lmeShscXVlcnkpLFxyXG5cdFx0XHRkYXRhVHlwZTogXCJqc29uXCIsXHJcblx0XHRcdGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuXHRcdFx0c3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKFwic2VhcmNoIG9rXCIpO1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRcdF9saXN0ID0gZGF0YTtcclxuXHRcdFx0XHRyZW5kZXJMaXN0KF9saXN0KTtcclxuXHRcdFx0fSxcclxuXHRcdFx0Ly9lcnJvcjogYWpheEVycm9yXHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHJlbmRlckxpc3QoX19saXN0KSB7XHJcblx0XHQkKCcjbGlzdHBsYWNlJykuaHRtbChsaXN0aHRtbCh7XHJcblx0XHRcdFwiZGF0YVwiOiBfX2xpc3RcclxuXHRcdH0pKTtcclxuXHJcblx0XHQkKCcuZWRpdC1ldm50LWxpc3QnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0Y29uc29sZS5sb2coJ2VkaXQgY2xpY2sgY2xhY2sgKScpO1xyXG5cdFx0fSk7XHJcblx0XHQkKCcucmVtb3ZlLWV2bnQtbGlzdCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR2YXIgX19pZCA9ICQoZS5jdXJyZW50VGFyZ2V0KS5wYXJlbnQoKS5hdHRyKCdkYXRhLWV2bnQtaWQnKTtcclxuXHRcdFx0dmFyIGluZHg7XHJcblx0XHRcdF9saXN0LmZvckVhY2goZnVuY3Rpb24oZXZudCwgaSkge1xyXG5cdFx0XHRcdGlmIChldm50Ll9pZCA9PSBfX2lkKSB7XHJcblx0XHRcdFx0XHRpbmR4ID0gaTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRfbGlzdC5zcGxpY2UoaW5keCwgMSk7XHJcblx0XHRcdHJlbmRlckxpc3QoX2xpc3QpO1xyXG5cdFx0fSk7XHJcblxyXG5cdH1cclxuXHJcblxyXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2pzL2Rldi9tb2R1bGUvbGlzdG1vZC5qc1xuLy8gbW9kdWxlIGlkID0gMTIzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBqYWRlID0gcmVxdWlyZShcIkM6XFxcXF90ZW1wXFxcXHBjaHRcXFxcbm9kZV9tb2R1bGVzXFxcXGphZGVcXFxcbGliXFxcXHJ1bnRpbWUuanNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJjYXJkXFxcIj48ZGl2IGNsYXNzPVxcXCJjYXJkLWhlYWRlclxcXCI+PHVsIGNsYXNzPVxcXCJuYXYgbmF2LXBpbGxzIGNhcmQtaGVhZGVyLXBpbGxzIGZsb2F0LXhzLWxlZnRcXFwiPjxsaSBjbGFzcz1cXFwibmF2LWl0ZW1cXFwiPjxhIGlkPVxcXCJhZGQtdG8tbGlzdC1idG5cXFwiIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJuYXYtbGlua1xcXCI+0KHQv9C40YHQvtC6L9CU0L7QsdCw0LLQuNGC0Yw8L2E+PC9saT48bGkgY2xhc3M9XFxcIm5hdi1pdGVtXFxcIj48YSBpZD1cXFwiY2xlYXItbGlzdC1idG5cXFwiIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJuYXYtbGlua1xcXCI+0J7Rh9C40YHRgtC40YLRjDwvYT48L2xpPjwvdWw+PC9kaXY+PGRpdiBjbGFzcz1cXFwiY2FyZC1ibG9ja1xcXCI+PGg0IGNsYXNzPVxcXCJjYXJkLXRpdGxlXFxcIj4gPC9oND48ZGl2IGlkPVxcXCJsaXN0cGxhY2VcXFwiIGNsYXNzPVxcXCJjYXJkLXRleHRcXFwiPjwvZGl2PjxpbnB1dCBpZD1cXFwiZXhlY2VtYWlsXFxcIiB0eXBlPVxcXCJlbWFpbFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+PGEgaWQ9XFxcInNlbmQtbGlzdC1tYWlsXFxcIiBocmVmPVxcXCIjXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1wcmltYXJ5XFxcIj7QvdCwINC/0L7Rh9GC0YMg0LjRgdC/0L7Qu9C90LjRgtC10LvRjjwvYT48L2Rpdj48L2Rpdj5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy9qcy9kZXYvdmlldy9saXN0c2NhcmQuamFkZVxuLy8gbW9kdWxlIGlkID0gMTI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBqYWRlID0gcmVxdWlyZShcIkM6XFxcXF90ZW1wXFxcXHBjaHRcXFxcbm9kZV9tb2R1bGVzXFxcXGphZGVcXFxcbGliXFxcXHJ1bnRpbWUuanNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChkYXRhLCB1bmRlZmluZWQpIHtcbmJ1Zi5wdXNoKFwiPGg0PtCh0L/QuNGB0L7QulxcdDx1bCBjbGFzcz1cXFwibGlzdC1ncm91cFxcXCI+PC91bD5cIik7XG4vLyBpdGVyYXRlIGRhdGFcdFxuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSBkYXRhXHQ7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBldm50ID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8bGlcIiArIChqYWRlLmF0dHIoXCJkYXRhLWV2bnQtaWRcIiwgJycgKyAoZXZudC5faWQpICsgJycsIHRydWUsIHRydWUpKSArIFwiIGNsYXNzPVxcXCJsaXN0LWdyb3VwLWl0ZW0gbGlzdC1ncm91cC1pdGVtLWFjdGlvblxcXCI+XCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gZXZudC50aXRsZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiPGEgaHJlZj1cXFwiI1xcXCIgY2xhc3M9XFxcInJlbW92ZS1ldm50LWxpc3RcXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS10cmFzaC1vIGZhLWZ3XFxcIj48L2k+PC9hPjxhIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJlZGl0LWV2bnQtbGlzdFxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLXBlbmNpbCBmYS1md1xcXCI+PC9pPjwvYT48L2xpPlwiKTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBldm50ID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8bGlcIiArIChqYWRlLmF0dHIoXCJkYXRhLWV2bnQtaWRcIiwgJycgKyAoZXZudC5faWQpICsgJycsIHRydWUsIHRydWUpKSArIFwiIGNsYXNzPVxcXCJsaXN0LWdyb3VwLWl0ZW0gbGlzdC1ncm91cC1pdGVtLWFjdGlvblxcXCI+XCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gZXZudC50aXRsZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiPGEgaHJlZj1cXFwiI1xcXCIgY2xhc3M9XFxcInJlbW92ZS1ldm50LWxpc3RcXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS10cmFzaC1vIGZhLWZ3XFxcIj48L2k+PC9hPjxhIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJlZGl0LWV2bnQtbGlzdFxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLXBlbmNpbCBmYS1md1xcXCI+PC9pPjwvYT48L2xpPlwiKTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxuYnVmLnB1c2goXCI8L2g0PlwiKTt9LmNhbGwodGhpcyxcImRhdGFcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmRhdGE6dHlwZW9mIGRhdGEhPT1cInVuZGVmaW5lZFwiP2RhdGE6dW5kZWZpbmVkLFwidW5kZWZpbmVkXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC51bmRlZmluZWQ6dHlwZW9mIHVuZGVmaW5lZCE9PVwidW5kZWZpbmVkXCI/dW5kZWZpbmVkOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvanMvZGV2L3ZpZXcvbGlzdHN2aWV3LmphZGVcbi8vIG1vZHVsZSBpZCA9IDEyNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJDOlxcXFxfdGVtcFxcXFxwY2h0XFxcXG5vZGVfbW9kdWxlc1xcXFxqYWRlXFxcXGxpYlxcXFxydW50aW1lLmpzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPGRpdiBpZD1cXFwibW9kYWxcXFwiIHRhYmluZGV4PVxcXCItMVxcXCIgcm9sZT1cXFwiZGlhbG9nXFxcIiBhcmlhLWxhYmVsbGVkYnk9XFxcIm15TW9kYWxMYWJlbFxcXCIgYXJpYS1oaWRkZW49XFxcInRydWVcXFwiIGNsYXNzPVxcXCJtb2RhbCBmYWRlXFxcIj48ZGl2IHJvbGU9XFxcImRvY3VtZW50XFxcIiBjbGFzcz1cXFwibW9kYWwtZGlhbG9nXFxcIj48ZGl2IGNsYXNzPVxcXCJtb2RhbC1jb250ZW50XFxcIj48ZGl2IGNsYXNzPVxcXCJtb2RhbC1oZWFkZXJcXFwiPjxidXR0b24gaWQ9XFxcImNsb3NlLW1vZGFsLWNyb3NzLWJ0blxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBkYXRhLWRpc21pc3M9XFxcIm1vZGFsXFxcIiBhcmlhLWxhYmVsPVxcXCJDbG9zZVxcXCIgY2xhc3M9XFxcImNsb3NlXFxcIj48c3BhbiBhcmlhLWhpZGRlbj1cXFwidHJ1ZVxcXCI+w5c8L3NwYW4+PC9idXR0b24+PGg0IGlkPVxcXCJteU1vZGFsTGFiZWxcXFwiIGNsYXNzPVxcXCJtb2RhbC10aXRsZVxcXCI+0KTQuNC70YzRgtGAPC9oND48L2Rpdj48ZGl2IGNsYXNzPVxcXCJtb2RhbC1ib2R5XFxcIj48Zm9ybSBhY3Rpb249XFxcIlxcXCI+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7Qt9Cw0LPQvtC70L7QstC+0Lo8L2xhYmVsPjxpbnB1dCBpZD1cXFwiZXZlbnQtdGl0bGVcXFwiIHR5cGU9XFxcInRleHRcXFwiIGRhdGEtbHF1ZXJ5LW5hbWU9XFxcInRpdGxlXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sIGwtcXVlcnlcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0L3QsNGH0LDQu9C+PC9sYWJlbD48aW5wdXQgaWQ9XFxcImRhdGViZWdpblxcXCIgdHlwZT1cXFwidGV4dFxcXCIgZGF0YS1scXVlcnktbmFtZT1cXFwic3RhcnRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2wgbC1xdWVyeSBmbGF0cGlja3JcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0L7QutC+0L3Rh9Cw0L3QuNC1PC9sYWJlbD48aW5wdXQgaWQ9XFxcImRhdGVlbmRcXFwiIHR5cGU9XFxcInRleHRcXFwiIGRhdGEtbHF1ZXJ5LW5hbWU9XFxcImVuZFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbCBsLXF1ZXJ5IGZsYXRwaWNrclxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7QvtGC0LTQtdC70LXQvdC40LUg0L/QvtC70YPRh9Cw0YLQtdC70Yw8L2xhYmVsPjxpbnB1dCBpZD1cXFwicG9zdGNvZGVcXFwiIHR5cGU9XFxcInRleHRcXFwiIGRhdGEtbHF1ZXJ5LW5hbWU9XFxcInBvc3RhbENvZGVcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2wgbC1xdWVyeVxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7QvtC/0LjRgdCw0L3QuNC1PC9sYWJlbD48aW5wdXQgaWQ9XFxcImRlc2NyaXB0aW9uXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBkYXRhLWxxdWVyeS1uYW1lPVxcXCJkZXNjcmlwdGlvblxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbCBsLXF1ZXJ5XFxcIj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj48bGFiZWwgZm9yPVxcXCJcXFwiPtGB0YLQsNGC0YPRgTwvbGFiZWw+PGlucHV0IGlkPVxcXCJzdGF0dXNcXFwiIHR5cGU9XFxcInRleHRcXFwiIGRhdGEtbHF1ZXJ5LW5hbWU9XFxcInN0YXR1c1xcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbCBsLXF1ZXJ5XFxcIj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj48bGFiZWwgZm9yPVxcXCJcXFwiPtC40YHQv9C+0LvQvdC40YLQtdC70Yw8L2xhYmVsPjxpbnB1dCBpZD1cXFwiZXhlY3V0b3JcXFwiIHR5cGU9XFxcInRleHRcXFwiIGRhdGEtbHF1ZXJ5LW5hbWU9XFxcImV4ZWN1dG9yXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sIGwtcXVlcnlcXFwiPjwvZGl2PjwvZm9ybT48L2Rpdj48ZGl2IGNsYXNzPVxcXCJtb2RhbC1mb290ZXJcXFwiPjxidXR0b24gaWQ9XFxcImNsb3NlLW1vZGFsLWJ0blxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBkYXRhLWRpc21pc3M9XFxcIm1vZGFsXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPkNsb3NlPC9idXR0b24+PGJ1dHRvbiBpZD1cXFwibG9hZC1maWx0ZXItbGlzdC1idG5cXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tcHJpbWFyeVxcXCI+0KHRhNC+0YDQvNC40YDQvtCy0LDRgtGMPC9idXR0b24+PC9kaXY+PC9kaXY+PC9kaXY+PC9kaXY+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvanMvZGV2L3ZpZXcvbGlzdGZpbHRlcm1vZGFsLmphZGVcbi8vIG1vZHVsZSBpZCA9IDEyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMxRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDM0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDakZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDclBBOzs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzVFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzdGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDekhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OyIsInNvdXJjZVJvb3QiOiIifQ==