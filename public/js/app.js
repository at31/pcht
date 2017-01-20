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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2Rldi9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2Rldi9tb2R1bGUvbWFwLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9kZXYvbW9kdWxlL3BvRGV0YWlsLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9kZXYvdmlldy9wb3N0T2ZmaWNlRGV0YWlsLmphZGUiLCJ3ZWJwYWNrOi8vLy4vfi9qYWRlL2xpYi9ydW50aW1lLmpzIiwid2VicGFjazovLy9mcyAoaWdub3JlZCkiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2Rldi9tb2R1bGUvbmV3RXZlbnRNb2RhbC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3ZpZXcvbmV3RXZlbnQuamFkZSIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L21vZHVsZS9lZGl0RXZlbnRNb2RhbC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3ZpZXcvZWRpdGRlbEV2ZW50LmphZGUiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2Rldi9tb2R1bGUvbGlzdG1vZC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3ZpZXcvbGlzdHNjYXJkLmphZGUiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2Rldi92aWV3L2xpc3Rzdmlldy5qYWRlIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9kZXYvdmlldy9saXN0ZmlsdGVybW9kYWwuamFkZSJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8vbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbmNvbnNvbGUubG9nKCdoaSBwY2h0Jyk7XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1x0XG5cblx0JChcIi5mbGF0cGlja3JcIikuZmxhdHBpY2tyKHtcblx0XHRlbmFibGVUaW1lOiB0cnVlLFxuXHR9KTtcblxuXHR2YXIgbXlNYXA9cmVxdWlyZSgnLi9tb2R1bGUvbWFwLmpzJyk7XG5cblx0eW1hcHMucmVhZHkoaW5pdCk7XG5cblxuXHRmdW5jdGlvbiBpbml0KCkge1xuXHRcdFxuXHRcdG15TWFwKCk7XG5cdFx0JCgnI21hcC1sb2FkLWxpbmsnKS5vbignY2xpY2snLGZ1bmN0aW9uKGUpe1xuXHRcdFx0JCgnLmMtcGxhY2UnKS5odG1sKCc8ZGl2IGlkPVwibWFweVwiIHN0eWxlPVwid2lkdGg6IDEwMCU7IGhlaWdodDogODAwcHhcIj48L2Rpdj4nKTtcblx0XHRcdG15TWFwKCk7XG5cdFx0fSk7XG5cblx0fVxuXG5cblx0JC5hamF4KHtcblx0XHR0eXBlOiAnR0VUJyxcblx0XHR1cmw6IFwiL3VzZXJzXCIsXG5cdFx0ZGF0YVR5cGU6IFwianNvblwiLFxuXHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRcdGNhbGVuZGFySW5pdChkYXRhKTtcblx0XHR9LFxuXHRcdC8vZXJyb3I6IGxvYWRFcnJvclxuXHR9KTtcblxuXG5cdGZ1bmN0aW9uIGNhbGVuZGFySW5pdChfZXZlbnRzKSB7XG5cblx0XHR2YXIgX25ld0V2ZW50TW9kYWwgPSByZXF1aXJlKCcuL21vZHVsZS9uZXdFdmVudE1vZGFsLmpzJyk7XG5cdFx0dmFyIF9uZXdNb2RhbCA9IG5ldyBfbmV3RXZlbnRNb2RhbCgpO1xuXHRcdHZhciBfZWRpdEV2ZW50TW9kYWwgPSByZXF1aXJlKCcuL21vZHVsZS9lZGl0RXZlbnRNb2RhbC5qcycpO1xuXHRcdHZhciBfZWRpdE1vZGFsID0gbmV3IF9lZGl0RXZlbnRNb2RhbCgpO1xuXG5cdFx0JCgnI2NhbGVuZGFyJykuZnVsbENhbGVuZGFyKHtcblx0XHRcdGhlYWRlcjoge1xuXHRcdFx0XHRsZWZ0OiAncHJldixuZXh0IHRvZGF5Jyxcblx0XHRcdFx0Y2VudGVyOiAndGl0bGUnLFxuXHRcdFx0XHRyaWdodDogJ21vbnRoLGFnZW5kYVdlZWssYWdlbmRhRGF5J1xuXHRcdFx0fSxcblx0XHRcdHNlbGVjdGFibGU6IHRydWUsXG5cdFx0XHRzZWxlY3RIZWxwZXI6IHRydWUsXG5cdFx0XHRlZGl0YWJsZTogdHJ1ZSxcblxuXHRcdFx0c2VsZWN0OiBmdW5jdGlvbihzdGFydCwgZW5kLCBqc0V2ZW50LCB2aWV3KSB7XG5cblx0XHRcdFx0X25ld01vZGFsLmluaXQoc3RhcnQsIGVuZCk7XG5cblx0XHRcdH0sXG5cdFx0XHRldmVudENsaWNrOiBmdW5jdGlvbihldmVudCwganNFdmVudCwgdmlldykge1xuXG5cdFx0XHRcdF9lZGl0TW9kYWwuaW5pdChldmVudCk7XG5cblx0XHRcdH0sXG5cdFx0XHRldmVudEFmdGVyUmVuZGVyOiBmdW5jdGlvbihldmVudCwgZWxlbWVudCwgdmlldykge1xuXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdlIGEgcicpO1xuXG5cdFx0XHR9LFxuXHRcdFx0ZXZlbnRBZnRlckFsbFJlbmRlcjogZnVuY3Rpb24odmlldykge1xuXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdlIGEgYSByJyk7XG5cdFx0XHR9LFxuXHRcdFx0ZGVmYXVsdFZpZXc6ICdtb250aCcsXG5cdFx0XHRlZGl0YWJsZTogdHJ1ZSxcblx0XHRcdGV2ZW50czogX2V2ZW50c1xuXHRcdH0pO1xuXG5cdFx0dmFyIGxpc3Rtb2QgPSByZXF1aXJlKCcuL21vZHVsZS9saXN0bW9kLmpzJyk7XG5cdFx0dmFyIF9saXN0bW9kPW5ldyBsaXN0bW9kKCk7XG5cdFx0X2xpc3Rtb2QuaW5pdCgpO1xuXHRcdFxuXHR9XG5cblxuXG59KTtcblxuLy99XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvanMvZGV2L2FwcC5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG5cblx0dmFyIF9zYXZlID0gdHJ1ZTtcblx0dmFyIF9ldmVudCwgX3Bvc3RPZmZpY2VBcnI7XG5cblx0dmFyIG15TWFwID0gbmV3IHltYXBzLk1hcChcIm1hcHlcIiwge1xuXHRcdGNlbnRlcjogWzUwLjU5LCAzNi41OF0sXG5cdFx0em9vbTogMTBcblx0fSwge1xuXHRcdGJ1dHRvbk1heFdpZHRoOiAxNTBcblx0fSk7XG5cblx0XG5cdCQuYWpheCh7XG5cdFx0dHlwZTogJ0dFVCcsXG5cdFx0dXJsOiBcIi4vcG9zdGFscy5qc29uXCIsXG5cdFx0ZGF0YVR5cGU6IFwianNvblwiLFxuXHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcblxuXHRcdFx0X3Bvc3RPZmZpY2VBcnIgPSBkYXRhO1xuXHRcdFx0dmFyIG15Q29sbGVjdGlvbiA9IG5ldyB5bWFwcy5HZW9PYmplY3RDb2xsZWN0aW9uKCk7XG5cblx0XHRcdHZhciBwb0R0bCA9IHJlcXVpcmUoJy4vcG9EZXRhaWwuanMnKTtcblx0XHRcdHZhciBteUJhbGxvb25Db250ZW50Qm9keUxheW91dCA9IHltYXBzLnRlbXBsYXRlTGF5b3V0RmFjdG9yeS5jcmVhdGVDbGFzcyhcblx0XHRcdFx0JzxwPiRbcHJvcGVydGllcy5kYXRhLnBvc3RhbENvZGVdPC9wPjxwPiRbcHJvcGVydGllcy5kYXRhLmFkZHJlc3NTb3VyY2VdPC9wPjxwPiRbcHJvcGVydGllcy5kYXRhLnR5cGVDb2RlXTwvcD48YnIgLz48YnV0dG9uIGlkPVwic2hvdy1wby1kZXRhaWwtYnRuXCI+0J/QvtC00YDQvtCx0L3QvjwvYnV0dG9uPicsIHtcblx0XHRcdFx0XHRidWlsZDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRteUJhbGxvb25Db250ZW50Qm9keUxheW91dC5zdXBlcmNsYXNzLmJ1aWxkLmNhbGwodGhpcyk7XG5cdFx0XHRcdFx0XHQkKCcjc2hvdy1wby1kZXRhaWwtYnRuJykub24oJ2NsaWNrJywge1xuXHRcdFx0XHRcdFx0XHRcInBvXCI6IHRoaXMuX2RhdGEucHJvcGVydGllcy5fZGF0YVxuXHRcdFx0XHRcdFx0fSwgdGhpcy5vblNob3dQT0RldGFpbENsaWNrKTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGNsZWFyOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdCQoJyNzaG93LXBvLWRldGFpbC1idG4nKS5vZmYoJ2NsaWNrJywgdGhpcy5vblNob3dQT0RldGFpbENsaWNrKTtcblx0XHRcdFx0XHRcdG15QmFsbG9vbkNvbnRlbnRCb2R5TGF5b3V0LnN1cGVyY2xhc3MuY2xlYXIuY2FsbCh0aGlzKTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdG9uU2hvd1BPRGV0YWlsQ2xpY2s6IGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0XHRcdHBvRHRsKGUuZGF0YS5wby5kYXRhLCBteU1hcCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0ZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKG90ZCkge1xuXHRcdFx0XHQvL2NvbnNvbGUubG9nKG90ZC5sYXRpdHVkZSk7XG5cblx0XHRcdFx0dmFyIHBtYXJrID0gbmV3IHltYXBzLlBsYWNlbWFyayhbb3RkLmxhdGl0dWRlLCBvdGQubG9uZ2l0dWRlXSxcblx0XHRcdFx0XHQvKntcblx0XHRcdFx0XHRcdGhpbnRDb250ZW50OiBvdGQucG9zdGFsQ29kZSxcblx0XHRcdFx0XHRcdGJhbGxvb25Db250ZW50OiBcIjxwPlwiK290ZC5wb3N0YWxDb2RlK1wiPC9wPjxwPlwiXG5cdFx0XHRcdFx0XHQrb3RkLmFkZHJlc3NTb3VyY2UrXCI8L3A+PHA+XCJcblx0XHRcdFx0XHRcdCtvdGQudHlwZUNvZGUrXG5cdFx0XHRcdFx0XHRcIjwvcD48YSBocmVmPScjJyBjbGFzcz0nYnRuIGJ0bi1wcmltYXJ5JyBpZD0ncG9zdC1kZXRhaWwnIGRhdGEtcG9zdGFsY29kZT0nXCIrb3RkLnBvc3RhbENvZGUrXCInPtCf0L7QtNGA0L7QsdC90LXQtTwvYT5cIlxuXHRcdFx0XHRcdH0qL1xuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGRhdGE6IG90ZCxcblx0XHRcdFx0XHRcdGljb25Db250ZW50OiBvdGQucG9zdGFsQ29kZSxcblx0XHRcdFx0XHRcdGljb25DYXB0aW9uOiBvdGQucG9zdGFsQ29kZVxuXHRcdFx0XHRcdH0sIHtcblx0XHRcdFx0XHRcdGJhbGxvb25Db250ZW50TGF5b3V0OiBteUJhbGxvb25Db250ZW50Qm9keUxheW91dCxcblx0XHRcdFx0XHRcdHByZXNldDogJ2lzbGFuZHMjYmxhY2tTdHJldGNoeUljb24nXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQpO1xuXHRcdFx0XHQvL215TWFwLmdlb09iamVjdHMuYWRkKHBtYXJrKTtcblx0XHRcdFx0bXlDb2xsZWN0aW9uLmFkZChwbWFyayk7XG5cdFx0XHR9KTtcblxuXHRcdFx0LyokKCcucG9zdC1kZXRhaWwnKS5jbGljayhmdW5jdGlvbihlKXtcblx0XHRcdFx0Y29uc29sZS5sb2coJ2NsaWNrIGNsYWNrJyk7XG5cdFx0XHRcdHZhciBwY29kZT0kKGUuY3VycmVudFRhcmdldCkuYXR0cignZGF0YS1wb3N0YWxjb2RlJyk7XG5cdFx0XHRcdF9wb3N0T2ZmaWNlQXJyLmZvckVhY2goZnVuY3Rpb24ob3RkKXtcblx0XHRcdFx0XHRpZihvdGQucG9zdGFsQ29kZT09PXBjb2RlKXtcblx0XHRcdFx0XHRcdHZhciB0cGw9cmVxdWlyZSgnLi92aWV3L3Bvc3RPZmZpY2VEZXRhaWwuamFkZScpO1xuXHRcdFx0XHRcdFx0JCgnLnBvZC1wbGFjZScpLmh0bWwodHBsKHtcImRhdGFcIjpvdGR9KSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH0pOyovXG5cblx0XHRcdG15TWFwLmdlb09iamVjdHMuYWRkKG15Q29sbGVjdGlvbik7XG5cblxuXG5cdFx0XHQkKCcjbWFwLWNyZWF0ZS1wYXRoJykuY2xpY2soZnVuY3Rpb24oZSl7XG5cdFx0XHRcdG15Q29sbGVjdGlvbi5yZW1vdmVBbGwoKTtcblx0XHRcdFxuXG5cdFx0XHR2YXIgcm9iaj1kYXRhLm1hcChmdW5jdGlvbihvdGQpe1xuXHRcdFx0XHRyZXR1cm4ge3R5cGU6J3dheVBvaW50Jyxwb2ludDpbb3RkLmxhdGl0dWRlLCBvdGQubG9uZ2l0dWRlXX07XG5cdFx0XHR9KTtcblx0XHRcdGNvbnNvbGUubG9nKFwiKysrKysrKysrKysrKysrKysrKysrKysrKysrKz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09KysrKysrKysrKysrKysrKytcIik7XG5cdFx0XHRjb25zb2xlLmxvZyhyb2JqKTtcblx0XHRcdHZhciBybz1bcm9ialswXSxyb2JqWzEwXSxyb2JqWzIyXV07XG5cdFx0XHRjb25zb2xlLmxvZyhcIisrKysrKysrKysrKysrKysrKysrKysrKysrKys9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSsrKysrKysrKysrKysrKysrXCIpO1xuXHRcdFx0Y29uc29sZS5sb2cocm8pO1xuXHRcdFx0eW1hcHMucm91dGUocm8pLnRoZW4oXG5cdFx0XHRcdGZ1bmN0aW9uKHJvdXRlKSB7XG5cdFx0XHRcdFx0bXlNYXAuZ2VvT2JqZWN0cy5hZGQocm91dGUpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRmdW5jdGlvbihlcnJvcikge1xuXHRcdFx0XHRcdGFsZXJ0KFwi0JLQvtC30L3QuNC60LvQsCDQvtGI0LjQsdC60LA6IFwiICsgZXJyb3IubWVzc2FnZSk7XG5cdFx0XHRcdH1cblx0XHRcdCk7XG5cdFx0fSk7XHRcblxuXHRcdH0sXG5cdFx0Ly9lcnJvcjogbG9hZEVycm9yXG5cdH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2pzL2Rldi9tb2R1bGUvbWFwLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3J0aWN0JztcblxubW9kdWxlLmV4cG9ydHM9ZnVuY3Rpb24oZGF0YSxteU1hcCl7XG5cblxuXG5cdHZhciB0cGwgPSByZXF1aXJlKCcuLi92aWV3L3Bvc3RPZmZpY2VEZXRhaWwuamFkZScpO1xuXHQkKCcucG9kLXBsYWNlJykuaHRtbCh0cGwoe1wiZGF0YVwiOiBkYXRhfSkpO1xuXG5cdCQoJy5zaG93LW5ldCcpLm9uKCdjbGljaycsZnVuY3Rpb24oZSl7XG5cblx0XHRteU1hcC5kZXN0cm95KCk7XG5cblx0XHQkKCcuYy1wbGFjZScpLmh0bWwoJzxkaXYgaWQ9XCJjeVwiPmN5ITwvZGl2PicpO1xuXG5cdFx0dmFyIGN5ID0gY3l0b3NjYXBlKHtcbiAgY29udGFpbmVyOiAkKCcjY3knKSxcbiAgIFxufSk7XG5cbnZhciBlbGVtZW50cyA9IHtcbiAgICAgICAgbm9kZXM6IFtcbiAgICAgICAgICB7IGRhdGE6IHsgaWQ6ICduMScsIG5hbWU6ICduMScsIHNpemU6IDUwfSxcbiAgICAgICAgICAgIHBvc2l0aW9uOiB7eDogMCwgeTogMH0gfSxcbiAgICAgICAgICB7IGRhdGE6IHsgaWQ6ICduMicsIG5hbWU6ICduMicsIHNpemU6IDUwfSxcbiAgICAgICAgICAgcG9zaXRpb246IHt4OiAxMDAsIHk6IDEwMH0gfSxcbiAgICAgICAgICB7IGRhdGE6IHsgaWQ6ICduMycsIG5hbWU6ICduMycsIHNpemU6IDUwfSxcbiAgICAgICAgICAgcG9zaXRpb246IHt4OiAwLCB5OiAxMDB9IH0sXG4gICAgICAgIF0sXG4gICAgICAgIGVkZ2VzOiBbXG4gICAgICAgICAgeyBkYXRhOiB7IHNvdXJjZTogJ24xJywgdGFyZ2V0OiAnbjInIH0gfVxuICAgICAgICBdXG4gICAgICB9O1xuICAgICAgY3kuYWRkKGVsZW1lbnRzKTtcbiAgICAgIGN5LmxheW91dCh7XG4gICAgICBcdG5hbWU6ICdncmlkJyAgIFxuICAgICAgfSk7XG5cbiAgICAgY3kub24oJ3RhcCcsIGZ1bmN0aW9uKGV2dCl7XG4gIGNvbnNvbGUubG9nKCAndGFwICcgKyBldnQuY3lUYXJnZXQuaWQoKSApO1xufSk7IFx0XHRcblx0Ly9jb25zb2xlLmxvZyhjeSk7XG5cdFx0LyokKCcjY3knKS5jeXRvc2NhcGUoe1xuICByZWFkeTogZnVuY3Rpb24oKXtcbiAgICAgIHZhciBjeSA9IHRoaXM7XG4gICAgICB2YXIgZWxlbWVudHMgPSB7XG4gICAgICAgIG5vZGVzOiBbXG4gICAgICAgICAgeyBkYXRhOiB7IGlkOiAnbjEnLCBuYW1lOiAnbjEnLCBzaXplOiA1MH0sXG4gICAgICAgICAgICBwb3NpdGlvbjoge3g6IDAsIHk6IDB9IH0sXG4gICAgICAgICAgeyBkYXRhOiB7IGlkOiAnbjInLCBuYW1lOiAnbjInLCBzaXplOiA1MH0sXG4gICAgICAgICAgIHBvc2l0aW9uOiB7eDogMTAwLCB5OiAxMDB9IH0sXG4gICAgICAgICAgeyBkYXRhOiB7IGlkOiAnbjMnLCBuYW1lOiAnbjMnLCBzaXplOiA1MH0sXG4gICAgICAgICAgIHBvc2l0aW9uOiB7eDogMCwgeTogMTAwfSB9LFxuICAgICAgICBdLFxuICAgICAgICBlZGdlczogW1xuICAgICAgICAgIHsgZGF0YTogeyBzb3VyY2U6ICduMScsIHRhcmdldDogJ24yJyB9IH1cbiAgICAgICAgXVxuICAgICAgfTtcbiAgICAgIFxuICAgICAgLy8gQWRkIGFsbCBub2RlcyBhbmQgZWRnZXNcbiAgICAgIGN5LmFkZChlbGVtZW50cyk7XG5cbiAgICAgIC8vIExvY2sgbm9kZSAxIHRvIGl0cyBpbml0aWFsIHBvc2l0aW9uLCAoMCwwKVxuICAgICAgY3kubm9kZXMoJyNuMScpLmxvY2soKTtcblxuICAgICAgLy8gRGlzYWJsZSB3ZWIgd29ya2VycyB0byBiZSBhYmxlIHRvIHVzZSBqc0ZpZGRsZVxuICAgICAgd2luZG93LldvcmtlciA9IHVuZGVmaW5lZDtcblxuICAgICAgLy8gVGhlIGdlbmVyYXRlZCBsYXlvdXQgd29uJ3QgbG9jayBub2RlIDEgdG8gaXRzIHBvc2l0aW9uXG4gICAgICBjeS5sYXlvdXQoe1xuICAgICAgICBmaXQ6IGZhbHNlLFxuICAgICAgXHRuYW1lOiAnYXJib3InICAgXG4gICAgICB9KTtcbiAgICAgIFxuICAgICAgY29uc29sZS5sb2coY3kuJCgnI24xJykucG9zaXRpb24oKSxcbiAgICAgICAgICAgICAgICAgIGN5LiQoJyNuMicpLnBvc2l0aW9uKCksXG4gICAgICAgICAgICAgICAgICBjeS4kKCcjbjMnKS5wb3NpdGlvbigpKTtcbiAgfVxufSk7Ki9cblx0fSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvanMvZGV2L21vZHVsZS9wb0RldGFpbC5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCIvaG9tZS91YnVudHUvd29ya3NwYWNlL25vZGVfbW9kdWxlcy9qYWRlL2xpYi9ydW50aW1lLmpzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAoZGF0YSwgdW5kZWZpbmVkKSB7XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcImNhcmRcXFwiPjxoMyBjbGFzcz1cXFwiY2FyZC1oZWFkZXJcXFwiPlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IGRhdGEucG9zdGFsQ29kZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiPC9oMz48ZGl2IGNsYXNzPVxcXCJjYXJkLWJsb2NrXFxcIj48aDQgY2xhc3M9XFxcImNhcmQtdGl0bGVcXFwiPlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IGRhdGEucG9zdGFsQ29kZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiIFwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IGRhdGEuc2V0dGxlbWVudCkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiIFwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IGRhdGEuYWRkcmVzc1NvdXJjZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiPC9oND48ZGl2IGNsYXNzPVxcXCJjYXJkLXRleHRcXFwiPjxoND7Qn9GA0LXQtNC+0YHRgtCw0LLQu9GP0LXQvNGL0LUg0YPRgdC70YPQs9C4PC9oND48dWw+PC91bD5cIik7XG4vLyBpdGVyYXRlIGRhdGEuc2VydmljZUdyb3Vwc1xuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSBkYXRhLnNlcnZpY2VHcm91cHM7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBzZyA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGxpPlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IHNnLnNlcnZpY2VHcm91cE5hbWUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIjwvbGk+XCIpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIHNnID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8bGk+XCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gc2cuc2VydmljZUdyb3VwTmFtZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiPC9saT5cIik7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbmJ1Zi5wdXNoKFwiPGg0PtCi0LXQu9C10YTQvtC90Ys8L2g0Pjx1bD5cXHRcXHRcXHQ8L3VsPlwiKTtcbi8vIGl0ZXJhdGUgZGF0YS5waG9uZXNcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gZGF0YS5waG9uZXM7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBwaG9uZSA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGxpPiAoXCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gcGhvbmUucGhvbmVUb3duQ29kZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiKSBcIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBwaG9uZS5waG9uZU51bWJlcikgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiIChcIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBwaG9uZS5waG9uZVR5cGVOYW1lKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCIpPC9saT5cIik7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIgcGhvbmUgPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIjxsaT4gKFwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IHBob25lLnBob25lVG93bkNvZGUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIikgXCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gcGhvbmUucGhvbmVOdW1iZXIpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIiAoXCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gcGhvbmUucGhvbmVUeXBlTmFtZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiKTwvbGk+XCIpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG5idWYucHVzaChcIjxoND7QktGA0LXQvNGPINGA0LDQsdC+0YLRi1xcdFxcdDwvaDQ+PHVsPjwvdWw+XCIpO1xuLy8gaXRlcmF0ZSBkYXRhLndvcmtpbmdIb3Vyc1xuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSBkYXRhLndvcmtpbmdIb3VycztcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIHdoID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8bGk+XCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gd2gud2Vla0RheU5hbWUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIlxcdDwvbGk+XCIpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIHdoID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8bGk+XCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gd2gud2Vla0RheU5hbWUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIlxcdDwvbGk+XCIpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG5idWYucHVzaChcIjwvZGl2PjxhIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJidG4gYnRuLXByaW1hcnkgc2hvdy1uZXRcXFwiPnNob3cgbWUgdGhlIE5ldCBpbiB0aGEgcGxhY2U8L2E+PC9kaXY+PC9kaXY+XCIpO30uY2FsbCh0aGlzLFwiZGF0YVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguZGF0YTp0eXBlb2YgZGF0YSE9PVwidW5kZWZpbmVkXCI/ZGF0YTp1bmRlZmluZWQsXCJ1bmRlZmluZWRcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnVuZGVmaW5lZDp0eXBlb2YgdW5kZWZpbmVkIT09XCJ1bmRlZmluZWRcIj91bmRlZmluZWQ6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy9qcy9kZXYvdmlldy9wb3N0T2ZmaWNlRGV0YWlsLmphZGVcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIE1lcmdlIHR3byBhdHRyaWJ1dGUgb2JqZWN0cyBnaXZpbmcgcHJlY2VkZW5jZVxuICogdG8gdmFsdWVzIGluIG9iamVjdCBgYmAuIENsYXNzZXMgYXJlIHNwZWNpYWwtY2FzZWRcbiAqIGFsbG93aW5nIGZvciBhcnJheXMgYW5kIG1lcmdpbmcvam9pbmluZyBhcHByb3ByaWF0ZWx5XG4gKiByZXN1bHRpbmcgaW4gYSBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGFcbiAqIEBwYXJhbSB7T2JqZWN0fSBiXG4gKiBAcmV0dXJuIHtPYmplY3R9IGFcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMubWVyZ2UgPSBmdW5jdGlvbiBtZXJnZShhLCBiKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgdmFyIGF0dHJzID0gYVswXTtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGF0dHJzID0gbWVyZ2UoYXR0cnMsIGFbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gYXR0cnM7XG4gIH1cbiAgdmFyIGFjID0gYVsnY2xhc3MnXTtcbiAgdmFyIGJjID0gYlsnY2xhc3MnXTtcblxuICBpZiAoYWMgfHwgYmMpIHtcbiAgICBhYyA9IGFjIHx8IFtdO1xuICAgIGJjID0gYmMgfHwgW107XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGFjKSkgYWMgPSBbYWNdO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShiYykpIGJjID0gW2JjXTtcbiAgICBhWydjbGFzcyddID0gYWMuY29uY2F0KGJjKS5maWx0ZXIobnVsbHMpO1xuICB9XG5cbiAgZm9yICh2YXIga2V5IGluIGIpIHtcbiAgICBpZiAoa2V5ICE9ICdjbGFzcycpIHtcbiAgICAgIGFba2V5XSA9IGJba2V5XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYTtcbn07XG5cbi8qKlxuICogRmlsdGVyIG51bGwgYHZhbGBzLlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbnVsbHModmFsKSB7XG4gIHJldHVybiB2YWwgIT0gbnVsbCAmJiB2YWwgIT09ICcnO1xufVxuXG4vKipcbiAqIGpvaW4gYXJyYXkgYXMgY2xhc3Nlcy5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmpvaW5DbGFzc2VzID0gam9pbkNsYXNzZXM7XG5mdW5jdGlvbiBqb2luQ2xhc3Nlcyh2YWwpIHtcbiAgcmV0dXJuIChBcnJheS5pc0FycmF5KHZhbCkgPyB2YWwubWFwKGpvaW5DbGFzc2VzKSA6XG4gICAgKHZhbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0JykgPyBPYmplY3Qua2V5cyh2YWwpLmZpbHRlcihmdW5jdGlvbiAoa2V5KSB7IHJldHVybiB2YWxba2V5XTsgfSkgOlxuICAgIFt2YWxdKS5maWx0ZXIobnVsbHMpLmpvaW4oJyAnKTtcbn1cblxuLyoqXG4gKiBSZW5kZXIgdGhlIGdpdmVuIGNsYXNzZXMuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gY2xhc3Nlc1xuICogQHBhcmFtIHtBcnJheS48Qm9vbGVhbj59IGVzY2FwZWRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5jbHMgPSBmdW5jdGlvbiBjbHMoY2xhc3NlcywgZXNjYXBlZCkge1xuICB2YXIgYnVmID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY2xhc3Nlcy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChlc2NhcGVkICYmIGVzY2FwZWRbaV0pIHtcbiAgICAgIGJ1Zi5wdXNoKGV4cG9ydHMuZXNjYXBlKGpvaW5DbGFzc2VzKFtjbGFzc2VzW2ldXSkpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYnVmLnB1c2goam9pbkNsYXNzZXMoY2xhc3Nlc1tpXSkpO1xuICAgIH1cbiAgfVxuICB2YXIgdGV4dCA9IGpvaW5DbGFzc2VzKGJ1Zik7XG4gIGlmICh0ZXh0Lmxlbmd0aCkge1xuICAgIHJldHVybiAnIGNsYXNzPVwiJyArIHRleHQgKyAnXCInO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAnJztcbiAgfVxufTtcblxuXG5leHBvcnRzLnN0eWxlID0gZnVuY3Rpb24gKHZhbCkge1xuICBpZiAodmFsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHZhbCkubWFwKGZ1bmN0aW9uIChzdHlsZSkge1xuICAgICAgcmV0dXJuIHN0eWxlICsgJzonICsgdmFsW3N0eWxlXTtcbiAgICB9KS5qb2luKCc7Jyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHZhbDtcbiAgfVxufTtcbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBhdHRyaWJ1dGUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICogQHBhcmFtIHtTdHJpbmd9IHZhbFxuICogQHBhcmFtIHtCb29sZWFufSBlc2NhcGVkXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHRlcnNlXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuYXR0ciA9IGZ1bmN0aW9uIGF0dHIoa2V5LCB2YWwsIGVzY2FwZWQsIHRlcnNlKSB7XG4gIGlmIChrZXkgPT09ICdzdHlsZScpIHtcbiAgICB2YWwgPSBleHBvcnRzLnN0eWxlKHZhbCk7XG4gIH1cbiAgaWYgKCdib29sZWFuJyA9PSB0eXBlb2YgdmFsIHx8IG51bGwgPT0gdmFsKSB7XG4gICAgaWYgKHZhbCkge1xuICAgICAgcmV0dXJuICcgJyArICh0ZXJzZSA/IGtleSA6IGtleSArICc9XCInICsga2V5ICsgJ1wiJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH0gZWxzZSBpZiAoMCA9PSBrZXkuaW5kZXhPZignZGF0YScpICYmICdzdHJpbmcnICE9IHR5cGVvZiB2YWwpIHtcbiAgICBpZiAoSlNPTi5zdHJpbmdpZnkodmFsKS5pbmRleE9mKCcmJykgIT09IC0xKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1NpbmNlIEphZGUgMi4wLjAsIGFtcGVyc2FuZHMgKGAmYCkgaW4gZGF0YSBhdHRyaWJ1dGVzICcgK1xuICAgICAgICAgICAgICAgICAgICd3aWxsIGJlIGVzY2FwZWQgdG8gYCZhbXA7YCcpO1xuICAgIH07XG4gICAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsLnRvSVNPU3RyaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0phZGUgd2lsbCBlbGltaW5hdGUgdGhlIGRvdWJsZSBxdW90ZXMgYXJvdW5kIGRhdGVzIGluICcgK1xuICAgICAgICAgICAgICAgICAgICdJU08gZm9ybSBhZnRlciAyLjAuMCcpO1xuICAgIH1cbiAgICByZXR1cm4gJyAnICsga2V5ICsgXCI9J1wiICsgSlNPTi5zdHJpbmdpZnkodmFsKS5yZXBsYWNlKC8nL2csICcmYXBvczsnKSArIFwiJ1wiO1xuICB9IGVsc2UgaWYgKGVzY2FwZWQpIHtcbiAgICBpZiAodmFsICYmIHR5cGVvZiB2YWwudG9JU09TdHJpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnNvbGUud2FybignSmFkZSB3aWxsIHN0cmluZ2lmeSBkYXRlcyBpbiBJU08gZm9ybSBhZnRlciAyLjAuMCcpO1xuICAgIH1cbiAgICByZXR1cm4gJyAnICsga2V5ICsgJz1cIicgKyBleHBvcnRzLmVzY2FwZSh2YWwpICsgJ1wiJztcbiAgfSBlbHNlIHtcbiAgICBpZiAodmFsICYmIHR5cGVvZiB2YWwudG9JU09TdHJpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnNvbGUud2FybignSmFkZSB3aWxsIHN0cmluZ2lmeSBkYXRlcyBpbiBJU08gZm9ybSBhZnRlciAyLjAuMCcpO1xuICAgIH1cbiAgICByZXR1cm4gJyAnICsga2V5ICsgJz1cIicgKyB2YWwgKyAnXCInO1xuICB9XG59O1xuXG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gYXR0cmlidXRlcyBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHBhcmFtIHtPYmplY3R9IGVzY2FwZWRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5hdHRycyA9IGZ1bmN0aW9uIGF0dHJzKG9iaiwgdGVyc2Upe1xuICB2YXIgYnVmID0gW107XG5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuXG4gIGlmIChrZXlzLmxlbmd0aCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgdmFyIGtleSA9IGtleXNbaV1cbiAgICAgICAgLCB2YWwgPSBvYmpba2V5XTtcblxuICAgICAgaWYgKCdjbGFzcycgPT0ga2V5KSB7XG4gICAgICAgIGlmICh2YWwgPSBqb2luQ2xhc3Nlcyh2YWwpKSB7XG4gICAgICAgICAgYnVmLnB1c2goJyAnICsga2V5ICsgJz1cIicgKyB2YWwgKyAnXCInKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnVmLnB1c2goZXhwb3J0cy5hdHRyKGtleSwgdmFsLCBmYWxzZSwgdGVyc2UpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnVmLmpvaW4oJycpO1xufTtcblxuLyoqXG4gKiBFc2NhcGUgdGhlIGdpdmVuIHN0cmluZyBvZiBgaHRtbGAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGh0bWxcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbnZhciBqYWRlX2VuY29kZV9odG1sX3J1bGVzID0ge1xuICAnJic6ICcmYW1wOycsXG4gICc8JzogJyZsdDsnLFxuICAnPic6ICcmZ3Q7JyxcbiAgJ1wiJzogJyZxdW90Oydcbn07XG52YXIgamFkZV9tYXRjaF9odG1sID0gL1smPD5cIl0vZztcblxuZnVuY3Rpb24gamFkZV9lbmNvZGVfY2hhcihjKSB7XG4gIHJldHVybiBqYWRlX2VuY29kZV9odG1sX3J1bGVzW2NdIHx8IGM7XG59XG5cbmV4cG9ydHMuZXNjYXBlID0gamFkZV9lc2NhcGU7XG5mdW5jdGlvbiBqYWRlX2VzY2FwZShodG1sKXtcbiAgdmFyIHJlc3VsdCA9IFN0cmluZyhodG1sKS5yZXBsYWNlKGphZGVfbWF0Y2hfaHRtbCwgamFkZV9lbmNvZGVfY2hhcik7XG4gIGlmIChyZXN1bHQgPT09ICcnICsgaHRtbCkgcmV0dXJuIGh0bWw7XG4gIGVsc2UgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKlxuICogUmUtdGhyb3cgdGhlIGdpdmVuIGBlcnJgIGluIGNvbnRleHQgdG8gdGhlXG4gKiB0aGUgamFkZSBpbiBgZmlsZW5hbWVgIGF0IHRoZSBnaXZlbiBgbGluZW5vYC5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWxlbmFtZVxuICogQHBhcmFtIHtTdHJpbmd9IGxpbmVub1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5yZXRocm93ID0gZnVuY3Rpb24gcmV0aHJvdyhlcnIsIGZpbGVuYW1lLCBsaW5lbm8sIHN0cil7XG4gIGlmICghKGVyciBpbnN0YW5jZW9mIEVycm9yKSkgdGhyb3cgZXJyO1xuICBpZiAoKHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgfHwgIWZpbGVuYW1lKSAmJiAhc3RyKSB7XG4gICAgZXJyLm1lc3NhZ2UgKz0gJyBvbiBsaW5lICcgKyBsaW5lbm87XG4gICAgdGhyb3cgZXJyO1xuICB9XG4gIHRyeSB7XG4gICAgc3RyID0gc3RyIHx8IHJlcXVpcmUoJ2ZzJykucmVhZEZpbGVTeW5jKGZpbGVuYW1lLCAndXRmOCcpXG4gIH0gY2F0Y2ggKGV4KSB7XG4gICAgcmV0aHJvdyhlcnIsIG51bGwsIGxpbmVubylcbiAgfVxuICB2YXIgY29udGV4dCA9IDNcbiAgICAsIGxpbmVzID0gc3RyLnNwbGl0KCdcXG4nKVxuICAgICwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSBjb250ZXh0LCAwKVxuICAgICwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyBjb250ZXh0KTtcblxuICAvLyBFcnJvciBjb250ZXh0XG4gIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gJyAgPiAnIDogJyAgICAnKVxuICAgICAgKyBjdXJyXG4gICAgICArICd8ICdcbiAgICAgICsgbGluZTtcbiAgfSkuam9pbignXFxuJyk7XG5cbiAgLy8gQWx0ZXIgZXhjZXB0aW9uIG1lc3NhZ2VcbiAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgJ0phZGUnKSArICc6JyArIGxpbmVub1xuICAgICsgJ1xcbicgKyBjb250ZXh0ICsgJ1xcblxcbicgKyBlcnIubWVzc2FnZTtcbiAgdGhyb3cgZXJyO1xufTtcblxuZXhwb3J0cy5EZWJ1Z0l0ZW0gPSBmdW5jdGlvbiBEZWJ1Z0l0ZW0obGluZW5vLCBmaWxlbmFtZSkge1xuICB0aGlzLmxpbmVubyA9IGxpbmVubztcbiAgdGhpcy5maWxlbmFtZSA9IGZpbGVuYW1lO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2phZGUvbGliL3J1bnRpbWUuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIiLCIvKiAoaWdub3JlZCkgKi9cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBmcyAoaWdub3JlZClcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG5cblx0dGhpcy5fbW9kYWwgPSByZXF1aXJlKCcuLi92aWV3L25ld0V2ZW50LmphZGUnKTtcblxuXHR0aGlzLmRlc3Ryb3lNb2RhbCA9IGZ1bmN0aW9uKCkge1xuXHRcdFxuXHRcdCQoXCIjc2F2ZS1ldmVudC1idG5cIikub2ZmKCdjbGljaycpO1xuXHRcdCQoJyNjbG9zZS1tb2RhbC1idG4nKS5vZmYoJ2NsaWNrJyk7XG5cdFx0JCgnI2Nsb3NlLW1vZGFsLWNyb3NzLWJ0bicpLm9mZignY2xpY2snKTtcblx0XHQkKCcubW9kYWwtcGxhY2UnKS5odG1sKCcnKTtcblx0fTtcblxuXHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0dGhpcy5pbml0ID0gZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuXG5cdFx0JCgnLm1vZGFsLXBsYWNlJykuaHRtbCh0aGlzLl9tb2RhbCgpKTtcblx0XHQkKFwiLmZsYXRwaWNrclwiKS5mbGF0cGlja3Ioe1xuXHRcdFx0ZW5hYmxlVGltZTogdHJ1ZSxcblx0XHR9KTtcblxuXHRcdCQoXCIjc2F2ZS1ldmVudC1idG5cIikub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuXHRcdFx0dmFyIGV2bnQgPSB7XG5cdFx0XHRcdHRpdGxlOiAkKCcjZXZlbnQtdGl0bGUnKS52YWwoKSxcblx0XHRcdFx0c3RhcnQ6IG1vbWVudCgkKCcjZGF0ZWJlZ2luJykudmFsKCkpLFxuXHRcdFx0XHRlbmQ6IG1vbWVudCgkKCcjZGF0ZWVuZCcpLnZhbCgpKSxcblx0XHRcdFx0cG9zdGFsQ29kZTogJCgnI3Bvc3Rjb2RlJykudmFsKCksXG5cdFx0XHRcdHN0YXR1czogJCgnI3N0YXR1cycpLnZhbCgpLFxuXHRcdFx0XHRkZXNjcmlwdGlvbjogJChcIiNkZXNjcmlwdGlvblwiKS52YWwoKSxcblx0XHRcdFx0ZXhlY3V0b3I6ICQoJyNleGVjdXRvcicpLnZhbCgpXG5cdFx0XHR9O1xuXHRcdFx0Y29uc29sZS5sb2coXCJhZGQgZXZlbnRcIik7XG5cdFx0XHQkKCcjY2FsZW5kYXInKS5mdWxsQ2FsZW5kYXIoJ3JlbmRlckV2ZW50JywgZXZudCwgdHJ1ZSk7XG5cblx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdHR5cGU6ICdQT1NUJyxcblx0XHRcdFx0dXJsOiAnL3VzZXJzL3NhdmUnLFxuXHRcdFx0XHRkYXRhOiBKU09OLnN0cmluZ2lmeShldm50KSxcblx0XHRcdFx0ZGF0YVR5cGU6IFwianNvblwiLFxuXHRcdFx0XHRjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG5cdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcImRhdGEgc2F2ZVwiKTtcblx0XHRcdFx0XHR2YXIgZXZudEFycmF5ID0gJCgnI2NhbGVuZGFyJykuZnVsbENhbGVuZGFyKCdjbGllbnRFdmVudHMnKTtcblx0XHRcdFx0XHR2YXIgX2V2bnQgPSBldm50QXJyYXlbZXZudEFycmF5Lmxlbmd0aCAtIDFdO1xuXHRcdFx0XHRcdF9ldm50Ll9pZCA9IGRhdGEuaW5zZXJ0ZWRpZDtcblxuXHRcdFx0XHRcdCQoJyNjYWxlbmRhcicpLmZ1bGxDYWxlbmRhcigndXBkYXRlRXZlbnQnLCBfZXZudCk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdC8vZXJyb3I6IGFqYXhFcnJvclxuXHRcdFx0fSk7XG5cblxuXHRcdH0pO1xuXG5cdFx0JCgnI2Nsb3NlLW1vZGFsLWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcblxuXHRcdH0pO1xuXG5cdFx0JCgnI2Nsb3NlLW1vZGFsLWNyb3NzLWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcblxuXHRcdH0pO1xuXG5cdFx0JCgnI21vZGFsJykubW9kYWwoJ3Nob3cnKTtcblxuXHRcdCQoJyNkYXRlYmVnaW4nKS52YWwoc3RhcnQuZm9ybWF0KCdZWVlZLU1NLUREIGhoOm1tJykpO1xuXHRcdCQoJyNkYXRlZW5kJykudmFsKGVuZC5mb3JtYXQoJ1lZWVktTU0tREQgaGg6bW0nKSk7XG5cblx0XHQkKCcjbW9kYWwnKS5vbignaGlkZGVuLmJzLm1vZGFsJywgZnVuY3Rpb24oZSkge1xuXHRcdFx0Y29uc29sZS5sb2coJ21vZGFsIGhpZGUnKTtcblx0XHRcdHNlbGYuZGVzdHJveU1vZGFsKCk7XG5cdFx0fSk7XG5cblx0fTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy9qcy9kZXYvbW9kdWxlL25ld0V2ZW50TW9kYWwuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGphZGUgPSByZXF1aXJlKFwiL2hvbWUvdWJ1bnR1L3dvcmtzcGFjZS9ub2RlX21vZHVsZXMvamFkZS9saWIvcnVudGltZS5qc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIjxkaXYgaWQ9XFxcIm1vZGFsXFxcIiB0YWJpbmRleD1cXFwiLTFcXFwiIHJvbGU9XFxcImRpYWxvZ1xcXCIgYXJpYS1sYWJlbGxlZGJ5PVxcXCJteU1vZGFsTGFiZWxcXFwiIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIiBjbGFzcz1cXFwibW9kYWwgZmFkZVxcXCI+PGRpdiByb2xlPVxcXCJkb2N1bWVudFxcXCIgY2xhc3M9XFxcIm1vZGFsLWRpYWxvZ1xcXCI+PGRpdiBjbGFzcz1cXFwibW9kYWwtY29udGVudFxcXCI+PGRpdiBjbGFzcz1cXFwibW9kYWwtaGVhZGVyXFxcIj48YnV0dG9uIGlkPVxcXCJjbG9zZS1tb2RhbC1jcm9zcy1idG5cXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgZGF0YS1kaXNtaXNzPVxcXCJtb2RhbFxcXCIgYXJpYS1sYWJlbD1cXFwiQ2xvc2VcXFwiIGNsYXNzPVxcXCJjbG9zZVxcXCI+PHNwYW4gYXJpYS1oaWRkZW49XFxcInRydWVcXFwiPsOXPC9zcGFuPjwvYnV0dG9uPjxoNCBpZD1cXFwibXlNb2RhbExhYmVsXFxcIiBjbGFzcz1cXFwibW9kYWwtdGl0bGVcXFwiPtCh0L7Qt9C00LDQvdC40LU8L2g0PjwvZGl2PjxkaXYgY2xhc3M9XFxcIm1vZGFsLWJvZHlcXFwiPjxmb3JtIGFjdGlvbj1cXFwiXFxcIj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj48bGFiZWwgZm9yPVxcXCJcXFwiPtC30LDQs9C+0LvQvtCy0L7QujwvbGFiZWw+PGlucHV0IGlkPVxcXCJldmVudC10aXRsZVxcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7QvdCw0YfQsNC70L48L2xhYmVsPjxpbnB1dCBpZD1cXFwiZGF0ZWJlZ2luXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sIGZsYXRwaWNrclxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7QvtC60L7QvdGH0LDQvdC40LU8L2xhYmVsPjxpbnB1dCBpZD1cXFwiZGF0ZWVuZFxcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbCBmbGF0cGlja3JcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0L7RgtC00LXQu9C10L3QuNC1INC/0L7Qu9GD0YfQsNGC0LXQu9GMPC9sYWJlbD48aW5wdXQgaWQ9XFxcInBvc3Rjb2RlXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj48bGFiZWwgZm9yPVxcXCJcXFwiPtC+0L/QuNGB0LDQvdC40LU8L2xhYmVsPjxpbnB1dCBpZD1cXFwiZGVzY3JpcHRpb25cXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0YHRgtCw0YLRg9GBPC9sYWJlbD48aW5wdXQgaWQ9XFxcInN0YXR1c1xcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7QuNGB0L/QvtC70L3QuNGC0LXQu9GMPC9sYWJlbD48aW5wdXQgaWQ9XFxcImV4ZWN1dG9yXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIj48L2Rpdj48L2Zvcm0+PC9kaXY+PGRpdiBjbGFzcz1cXFwibW9kYWwtZm9vdGVyXFxcIj48YnV0dG9uIGlkPVxcXCJjbG9zZS1tb2RhbC1idG5cXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgZGF0YS1kaXNtaXNzPVxcXCJtb2RhbFxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj5DbG9zZTwvYnV0dG9uPjxidXR0b24gaWQ9XFxcInNhdmUtZXZlbnQtYnRuXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXByaW1hcnlcXFwiPlNhdmUgY2hhbmdlczwvYnV0dG9uPjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2PlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2pzL2Rldi92aWV3L25ld0V2ZW50LmphZGVcbi8vIG1vZHVsZSBpZCA9IDExOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG5cblx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdHRoaXMuZGVzdHJveU1vZGFsID0gZnVuY3Rpb24oKSB7XG5cdFx0XG5cdFx0JChcIiNzYXZlLWV2ZW50LWJ0blwiKS5vZmYoJ2NsaWNrJyk7XG5cdFx0JCgnI2Nsb3NlLW1vZGFsLWJ0bicpLm9mZignY2xpY2snKTtcblx0XHQkKCcjY2xvc2UtbW9kYWwtY3Jvc3MtYnRuJykub2ZmKCdjbGljaycpO1xuXHRcdCQoJyNkZWxldGUtZXZlbnQtYnRuJykub2ZmKCk7XG5cdFx0JCgnLm1vZGFsLXBsYWNlJykuaHRtbCgnJyk7XG5cdFx0c2VsZi5ldmVudCA9IG51bGw7XG5cdH07XG5cblx0dGhpcy5pbml0ID0gZnVuY3Rpb24oZXZudCkge1xuXG5cdFx0Y29uc29sZS5sb2coZXZudCk7XG5cdFx0c2VsZi5ldmVudCA9IGV2bnQ7XG5cblx0XHR2YXIgX21vZGFsaHRtbCA9IHJlcXVpcmUoJy4uL3ZpZXcvZWRpdGRlbEV2ZW50LmphZGUnKTtcblx0XHQkKCcubW9kYWwtcGxhY2UnKS5odG1sKF9tb2RhbGh0bWwoKSk7XG5cdFx0JChcIi5mbGF0cGlja3JcIikuZmxhdHBpY2tyKHtcblx0XHRcdGVuYWJsZVRpbWU6IHRydWUsXG5cdFx0fSk7XG5cblx0XHQkKCcjbW9kYWwnKS5tb2RhbCgnc2hvdycpO1xuXG5cdFx0JCgnI2RhdGViZWdpbicpLnZhbChldm50LnN0YXJ0LmZvcm1hdCgnWVlZWS1NTS1ERCBoaDptbScpKTtcblx0XHQkKCcjZGF0ZWVuZCcpLnZhbChldm50LmVuZC5mb3JtYXQoJ1lZWVktTU0tREQgaGg6bW0nKSk7XG5cdFx0JCgnI2V2ZW50LXRpdGxlJykudmFsKGV2bnQudGl0bGUpO1xuXHRcdCQoJyNwb3N0Y29kZScpLnZhbChldm50LnBvc3RhbENvZGUpO1xuXHRcdCQoJyNzdGF0dXMnKS52YWwoZXZudC5zdGF0dXMpO1xuXHRcdCQoXCIjZGVzY3JpcHRpb25cIikudmFsKGV2bnQuZGVzY3JpcHRpb24pO1xuXHRcdCQoJyNleGVjdXRvcicpLnZhbChldm50LmV4ZWN1dG9yKTtcblxuXG5cdFx0JChcIiNzYXZlLWV2ZW50LWJ0blwiKS5vbignY2xpY2snLGZ1bmN0aW9uKGUpIHtcblxuXHRcdFx0Y29uc29sZS5sb2coJ3NhdmUgZnJvbSBtb2RhbCcpO1xuXHRcdFx0dmFyICBfZXZlbnQ9e307XG5cblx0XHRcdF9ldmVudC50aXRsZT1zZWxmLmV2ZW50LnRpdGxlID0gJCgnI2V2ZW50LXRpdGxlJykudmFsKCk7XG5cdFx0XHRfZXZlbnQuc3RhcnQ9c2VsZi5ldmVudC5zdGFydCA9IG1vbWVudCgkKCcjZGF0ZWJlZ2luJykudmFsKCkpO1xuXHRcdFx0X2V2ZW50LmVuZD1zZWxmLmV2ZW50LmVuZCA9IG1vbWVudCgkKCcjZGF0ZWVuZCcpLnZhbCgpKTtcblx0XHRcdF9ldmVudC5wb3N0YWxDb2RlPXNlbGYuZXZlbnQucG9zdGFsQ29kZSA9ICQoJyNwb3N0Y29kZScpLnZhbCgpO1xuXHRcdFx0X2V2ZW50LnN0YXR1cz1zZWxmLmV2ZW50LnN0YXR1cyA9ICQoJyNzdGF0dXMnKS52YWwoKTtcblx0XHRcdF9ldmVudC5kZXNjcmlwdGlvbj1zZWxmLmV2ZW50LmRlc2NyaXB0aW9uID0gJChcIiNkZXNjcmlwdGlvblwiKS52YWwoKTtcblx0XHRcdF9ldmVudC5leGVjdXRvcj1zZWxmLmV2ZW50LmV4ZWN1dG9yID0gJCgnI2V4ZWN1dG9yJykudmFsKCk7XG5cblx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdHR5cGU6ICdQT1NUJyxcblx0XHRcdFx0dXJsOiAnL3VzZXJzL3VwZGF0ZS8nK3NlbGYuZXZlbnQuX2lkLFxuXHRcdFx0XHRkYXRhOiBKU09OLnN0cmluZ2lmeShfZXZlbnQpLFxuXHRcdFx0XHRkYXRhVHlwZTogXCJqc29uXCIsXG5cdFx0XHRcdGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcblx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiZGF0YSB1cGRhdGVcIik7XG5cdFx0XHRcdFx0JCgnI2NhbGVuZGFyJykuZnVsbENhbGVuZGFyKCd1cGRhdGVFdmVudCcsIHNlbGYuZXZlbnQpO1xuXHRcdFx0XHRcdCQoJyNjYWxlbmRhcicpLmZ1bGxDYWxlbmRhcigncmVyZW5kZXJFdmVudHMnKTtcdFx0XHRcdFx0XG5cdFx0XHRcdFx0JCgnI21vZGFsJykubW9kYWwoJ2hpZGUnKTtcblx0XHRcdFx0XHQvKnZhciBfbW9kYWwgPSByZXF1aXJlKCcuLi92aWV3L2FsbG9rLmphZGUnKTtcblx0XHRcdFx0XHQkKCcubW9kYWwtcGxhY2UnKS5odG1sKF9tb2RhbCgpKTtcblx0XHRcdFx0XHQkKCcjbW9kYWwnKS5tb2RhbCgnc2hvdycpOyovXG5cblx0XHRcdFx0fSxcblx0XHRcdFx0Ly9lcnJvcjogYWpheEVycm9yXG5cdFx0XHR9KTtcdFx0XHRcblx0XHR9KTtcblx0XHQkKCcjZGVsZXRlLWV2ZW50LWJ0bicpLm9uKCdjbGljaycsZnVuY3Rpb24oZSl7XG5cdFx0XHQkLmFqYXgoe1xuXHRcdFx0dHlwZTogJ0RFTEVURScsXG5cdFx0XHR1cmw6ICcvdXNlcnMvZGVsLycgKyBzZWxmLmV2ZW50Ll9pZCxcblx0XHRcdGRhdGFUeXBlOiBcImpzb25cIixcblx0XHRcdGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcblx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJkYXRhIGRlbFwiKTtcblx0XHRcdFx0JCgnI2NhbGVuZGFyJykuZnVsbENhbGVuZGFyKCdyZW1vdmVFdmVudHMnLCBzZWxmLmV2ZW50Ll9pZCk7XG5cdFx0XHR9LFxuXHRcdFx0Ly9lcnJvcjogYWpheEVycm9yXG5cdFx0fSk7XG5cdFx0fSk7XG5cblx0XHQkKCcjbW9kYWwnKS5vbignaGlkZGVuLmJzLm1vZGFsJywgZnVuY3Rpb24oZSkge1xuXHRcdFx0Y29uc29sZS5sb2coJ21vZGFsIGhpZGUnKTtcblx0XHRcdHNlbGYuZGVzdHJveU1vZGFsKCk7XG5cblx0XHR9KTtcblx0fTtcblxuXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvanMvZGV2L21vZHVsZS9lZGl0RXZlbnRNb2RhbC5qc1xuLy8gbW9kdWxlIGlkID0gMTIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBqYWRlID0gcmVxdWlyZShcIi9ob21lL3VidW50dS93b3Jrc3BhY2Uvbm9kZV9tb2R1bGVzL2phZGUvbGliL3J1bnRpbWUuanNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8ZGl2IGlkPVxcXCJtb2RhbFxcXCIgdGFiaW5kZXg9XFxcIi0xXFxcIiByb2xlPVxcXCJkaWFsb2dcXFwiIGFyaWEtbGFiZWxsZWRieT1cXFwibXlNb2RhbExhYmVsXFxcIiBhcmlhLWhpZGRlbj1cXFwidHJ1ZVxcXCIgY2xhc3M9XFxcIm1vZGFsIGZhZGVcXFwiPjxkaXYgcm9sZT1cXFwiZG9jdW1lbnRcXFwiIGNsYXNzPVxcXCJtb2RhbC1kaWFsb2dcXFwiPjxkaXYgY2xhc3M9XFxcIm1vZGFsLWNvbnRlbnRcXFwiPjxkaXYgY2xhc3M9XFxcIm1vZGFsLWhlYWRlclxcXCI+PGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGRhdGEtZGlzbWlzcz1cXFwibW9kYWxcXFwiIGFyaWEtbGFiZWw9XFxcIkNsb3NlXFxcIiBjbGFzcz1cXFwiY2xvc2VcXFwiPjxzcGFuIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIj7Dlzwvc3Bhbj48L2J1dHRvbj48aDQgaWQ9XFxcIm15TW9kYWxMYWJlbFxcXCIgY2xhc3M9XFxcIm1vZGFsLXRpdGxlXFxcIj7QoNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNC1L9GD0LTQsNC70LXQvdC40LU8L2g0PjwvZGl2PjxkaXYgY2xhc3M9XFxcIm1vZGFsLWJvZHlcXFwiPjxmb3JtIGFjdGlvbj1cXFwiXFxcIj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj48bGFiZWwgZm9yPVxcXCJcXFwiPtC30LDQs9C+0LvQvtCy0L7QujwvbGFiZWw+PGlucHV0IGlkPVxcXCJldmVudC10aXRsZVxcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7QvdCw0YfQsNC70L48L2xhYmVsPjxpbnB1dCBpZD1cXFwiZGF0ZWJlZ2luXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sIGZsYXRwaWNrclxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7QvtC60L7QvdGH0LDQvdC40LU8L2xhYmVsPjxpbnB1dCBpZD1cXFwiZGF0ZWVuZFxcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbCBmbGF0cGlja3JcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0L7RgtC00LXQu9C10L3QuNC1INC/0L7Qu9GD0YfQsNGC0LXQu9GMPC9sYWJlbD48aW5wdXQgaWQ9XFxcInBvc3Rjb2RlXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj48bGFiZWwgZm9yPVxcXCJcXFwiPtC+0L/QuNGB0LDQvdC40LU8L2xhYmVsPjxpbnB1dCBpZD1cXFwiZGVzY3JpcHRpb25cXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0YHRgtCw0YLRg9GBPC9sYWJlbD48aW5wdXQgaWQ9XFxcInN0YXR1c1xcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7QuNGB0L/QvtC70L3QuNGC0LXQu9GMPC9sYWJlbD48aW5wdXQgaWQ9XFxcImV4ZWN1dG9yXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIj48L2Rpdj48L2Zvcm0+PC9kaXY+PGRpdiBjbGFzcz1cXFwibW9kYWwtZm9vdGVyXFxcIj48YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgZGF0YS1kaXNtaXNzPVxcXCJtb2RhbFxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj5DbG9zZTwvYnV0dG9uPjxidXR0b24gaWQ9XFxcInNhdmUtZXZlbnQtYnRuXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXByaW1hcnlcXFwiPlNhdmUgY2hhbmdlczwvYnV0dG9uPjxidXR0b24gaWQ9XFxcImRlbGV0ZS1ldmVudC1idG5cXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tZGFuZ2VyXFxcIj5EZWxldGU8L2J1dHRvbj48L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy9qcy9kZXYvdmlldy9lZGl0ZGVsRXZlbnQuamFkZVxuLy8gbW9kdWxlIGlkID0gMTIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG5cblx0dmFyIF9saXN0O1xuXHR2YXIgc2VsZiA9IHRoaXM7XG5cdHZhciBsY2FyZCA9IHJlcXVpcmUoJy4uL3ZpZXcvbGlzdHNjYXJkLmphZGUnKTtcblx0dmFyIGxpc3RodG1sID0gcmVxdWlyZSgnLi4vdmlldy9saXN0c3ZpZXcuamFkZScpO1xuXG5cdHRoaXMuZGVzdHJveU1vZGFsID0gZnVuY3Rpb24oKSB7XG5cblx0XHQvLyQoXCIjc2F2ZS1ldmVudC1idG5cIikub2ZmKCdjbGljaycpO1xuXHRcdCQoJy5tb2RhbC1wbGFjZScpLmh0bWwoJycpO1xuXHR9O1xuXG5cdHRoaXMuaW5pdCA9IGZ1bmN0aW9uKCkge1xuXG5cdFx0JCgnLmxpc3QtcGxhY2UnKS5odG1sKGxjYXJkKCkpO1xuXHRcdCQoJyNjbGVhci1saXN0LWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRjb25zb2xlLmxvZygnbGlzdCBjbGVhcicpO1xuXHRcdFx0X2xpc3QgPSBudWxsO1xuXHRcdH0pO1xuXHRcdCQoJyNhZGQtdG8tbGlzdC1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0dmFyIF9tb2RhbCA9IHJlcXVpcmUoJy4uL3ZpZXcvbGlzdGZpbHRlcm1vZGFsLmphZGUnKTtcblx0XHRcdCQoJy5tb2RhbC1wbGFjZScpLmh0bWwoX21vZGFsKCkpO1xuXHRcdFx0JCgnI2xvYWQtZmlsdGVyLWxpc3QtYnRuJykub24oJ2NsaWNrJywgbG9hZEZpbHRlcmVkTGlzdCk7XG5cdFx0XHQkKCcjbW9kYWwnKS5tb2RhbCgnc2hvdycpO1xuXHRcdFx0JChcIi5mbGF0cGlja3JcIikuZmxhdHBpY2tyKHtcblx0XHRcdFx0ZW5hYmxlVGltZTogdHJ1ZSxcblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cblx0XHQkKCcjbW9kYWwnKS5vbignaGlkZGVuLmJzLm1vZGFsJywgZnVuY3Rpb24oZSkge1xuXHRcdFx0Y29uc29sZS5sb2coJ21vZGFsIGhpZGUnKTtcblx0XHRcdHNlbGYuZGVzdHJveU1vZGFsKCk7XG5cdFx0fSk7XG5cblx0XHQkKCcjc2VuZC1saXN0LW1haWwnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cdFx0XHRpZiAoX2xpc3QubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRpZiAoJCgnI2V4ZWNlbWFpbCcpLnZhbCgpKSB7XG5cblx0XHRcdFx0XHR2YXIgZW1haWx0eHQ9e1widHh0XCI6bGlzdGh0bWwoe1wiZGF0YVwiOiBfbGlzdH0pfTtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhlbWFpbHR4dCk7XG5cblx0XHRcdFx0XHQkLmFqYXgoe1xuXHRcdFx0XHRcdFx0dHlwZTogJ1BPU1QnLFxuXHRcdFx0XHRcdFx0dXJsOiAnL3VzZXJzL2VtYWlsbGlzdCcsXG5cdFx0XHRcdFx0XHRkYXRhOiBKU09OLnN0cmluZ2lmeShlbWFpbHR4dCksXG5cdFx0XHRcdFx0XHRkYXRhVHlwZTogXCJqc29uXCIsXG5cdFx0XHRcdFx0XHRjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG5cdFx0XHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKFwic2VhcmNoIG9rXCIpO1xuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdC8vZXJyb3I6IGFqYXhFcnJvclxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0fTtcblxuXHR0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcblxuXHR9O1xuXG5cdGZ1bmN0aW9uIGxvYWRGaWx0ZXJlZExpc3QoKSB7XG5cdFx0dmFyIGxxdWVyeSA9IHt9O1xuXHRcdCQoJy5sLXF1ZXJ5JykuZWFjaChmdW5jdGlvbihpLCBlbCkge1xuXHRcdFx0aWYgKCQoZWwpLnZhbCgpKSB7XG5cdFx0XHRcdGxxdWVyeVskKGVsKS5hdHRyKCdkYXRhLWxxdWVyeS1uYW1lJyldID0gJChlbCkudmFsKCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0Y29uc29sZS5sb2cobHF1ZXJ5KTtcblxuXHRcdCQuYWpheCh7XG5cdFx0XHR0eXBlOiAnUE9TVCcsXG5cdFx0XHR1cmw6ICcvdXNlcnMvbHF1ZXJ5Jyxcblx0XHRcdGRhdGE6IEpTT04uc3RyaW5naWZ5KGxxdWVyeSksXG5cdFx0XHRkYXRhVHlwZTogXCJqc29uXCIsXG5cdFx0XHRjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG5cdFx0XHRzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwic2VhcmNoIG9rXCIpO1xuXHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcblx0XHRcdFx0X2xpc3QgPSBkYXRhO1xuXHRcdFx0XHRyZW5kZXJMaXN0KF9saXN0KTtcblx0XHRcdH0sXG5cdFx0XHQvL2Vycm9yOiBhamF4RXJyb3Jcblx0XHR9KTtcblx0fVxuXG5cdGZ1bmN0aW9uIHJlbmRlckxpc3QoX19saXN0KSB7XG5cdFx0JCgnI2xpc3RwbGFjZScpLmh0bWwobGlzdGh0bWwoe1xuXHRcdFx0XCJkYXRhXCI6IF9fbGlzdFxuXHRcdH0pKTtcblxuXHRcdCQoJy5lZGl0LWV2bnQtbGlzdCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRjb25zb2xlLmxvZygnZWRpdCBjbGljayBjbGFjayApJyk7XG5cdFx0fSk7XG5cdFx0JCgnLnJlbW92ZS1ldm50LWxpc3QnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0dmFyIF9faWQgPSAkKGUuY3VycmVudFRhcmdldCkucGFyZW50KCkuYXR0cignZGF0YS1ldm50LWlkJyk7XG5cdFx0XHR2YXIgaW5keDtcblx0XHRcdF9saXN0LmZvckVhY2goZnVuY3Rpb24oZXZudCwgaSkge1xuXHRcdFx0XHRpZiAoZXZudC5faWQgPT0gX19pZCkge1xuXHRcdFx0XHRcdGluZHggPSBpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdF9saXN0LnNwbGljZShpbmR4LCAxKTtcblx0XHRcdHJlbmRlckxpc3QoX2xpc3QpO1xuXHRcdH0pO1xuXG5cdH1cblxuXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2pzL2Rldi9tb2R1bGUvbGlzdG1vZC5qc1xuLy8gbW9kdWxlIGlkID0gMTIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBqYWRlID0gcmVxdWlyZShcIi9ob21lL3VidW50dS93b3Jrc3BhY2Uvbm9kZV9tb2R1bGVzL2phZGUvbGliL3J1bnRpbWUuanNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJjYXJkXFxcIj48ZGl2IGNsYXNzPVxcXCJjYXJkLWhlYWRlclxcXCI+PHVsIGNsYXNzPVxcXCJuYXYgbmF2LXBpbGxzIGNhcmQtaGVhZGVyLXBpbGxzIGZsb2F0LXhzLWxlZnRcXFwiPjxsaSBjbGFzcz1cXFwibmF2LWl0ZW1cXFwiPjxhIGlkPVxcXCJhZGQtdG8tbGlzdC1idG5cXFwiIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJuYXYtbGlua1xcXCI+0KHQv9C40YHQvtC6L9CU0L7QsdCw0LLQuNGC0Yw8L2E+PC9saT48bGkgY2xhc3M9XFxcIm5hdi1pdGVtXFxcIj48YSBpZD1cXFwiY2xlYXItbGlzdC1idG5cXFwiIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJuYXYtbGlua1xcXCI+0J7Rh9C40YHRgtC40YLRjDwvYT48L2xpPjwvdWw+PC9kaXY+PGRpdiBjbGFzcz1cXFwiY2FyZC1ibG9ja1xcXCI+PGg0IGNsYXNzPVxcXCJjYXJkLXRpdGxlXFxcIj4gPC9oND48ZGl2IGlkPVxcXCJsaXN0cGxhY2VcXFwiIGNsYXNzPVxcXCJjYXJkLXRleHRcXFwiPlxcdFxcdFxcdFxcdFxcdFxcdDwvZGl2PjxpbnB1dCBpZD1cXFwiZXhlY2VtYWlsXFxcIiB0eXBlPVxcXCJlbWFpbFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+PGEgaWQ9XFxcInNlbmQtbGlzdC1tYWlsXFxcIiBocmVmPVxcXCIjXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1wcmltYXJ5XFxcIj7QvdCwINC/0L7Rh9GC0YMg0LjRgdC/0L7Qu9C90LjRgtC10LvRjjwvYT48L2Rpdj48L2Rpdj5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy9qcy9kZXYvdmlldy9saXN0c2NhcmQuamFkZVxuLy8gbW9kdWxlIGlkID0gMTIzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBqYWRlID0gcmVxdWlyZShcIi9ob21lL3VidW50dS93b3Jrc3BhY2Uvbm9kZV9tb2R1bGVzL2phZGUvbGliL3J1bnRpbWUuanNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChkYXRhLCB1bmRlZmluZWQpIHtcbmJ1Zi5wdXNoKFwiPGg0PtCh0L/QuNGB0L7QulxcdDx1bCBjbGFzcz1cXFwibGlzdC1ncm91cFxcXCI+PC91bD5cIik7XG4vLyBpdGVyYXRlIGRhdGFcdFxuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSBkYXRhXHQ7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBldm50ID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8bGlcIiArIChqYWRlLmF0dHIoXCJkYXRhLWV2bnQtaWRcIiwgJycgKyAoZXZudC5faWQpICsgJycsIHRydWUsIHRydWUpKSArIFwiIGNsYXNzPVxcXCJsaXN0LWdyb3VwLWl0ZW0gbGlzdC1ncm91cC1pdGVtLWFjdGlvblxcXCI+XCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gZXZudC50aXRsZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiPGEgaHJlZj1cXFwiI1xcXCIgY2xhc3M9XFxcInJlbW92ZS1ldm50LWxpc3RcXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS10cmFzaC1vIGZhLWZ3XFxcIj48L2k+PC9hPjxhIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJlZGl0LWV2bnQtbGlzdFxcXCI+XFx0XFx0PGkgY2xhc3M9XFxcImZhIGZhLXBlbmNpbCBmYS1md1xcXCI+XFx0XFx0XFx0XFx0PC9pPjwvYT48L2xpPlwiKTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBldm50ID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8bGlcIiArIChqYWRlLmF0dHIoXCJkYXRhLWV2bnQtaWRcIiwgJycgKyAoZXZudC5faWQpICsgJycsIHRydWUsIHRydWUpKSArIFwiIGNsYXNzPVxcXCJsaXN0LWdyb3VwLWl0ZW0gbGlzdC1ncm91cC1pdGVtLWFjdGlvblxcXCI+XCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gZXZudC50aXRsZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiPGEgaHJlZj1cXFwiI1xcXCIgY2xhc3M9XFxcInJlbW92ZS1ldm50LWxpc3RcXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS10cmFzaC1vIGZhLWZ3XFxcIj48L2k+PC9hPjxhIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJlZGl0LWV2bnQtbGlzdFxcXCI+XFx0XFx0PGkgY2xhc3M9XFxcImZhIGZhLXBlbmNpbCBmYS1md1xcXCI+XFx0XFx0XFx0XFx0PC9pPjwvYT48L2xpPlwiKTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxuYnVmLnB1c2goXCI8L2g0PlwiKTt9LmNhbGwodGhpcyxcImRhdGFcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmRhdGE6dHlwZW9mIGRhdGEhPT1cInVuZGVmaW5lZFwiP2RhdGE6dW5kZWZpbmVkLFwidW5kZWZpbmVkXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC51bmRlZmluZWQ6dHlwZW9mIHVuZGVmaW5lZCE9PVwidW5kZWZpbmVkXCI/dW5kZWZpbmVkOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvanMvZGV2L3ZpZXcvbGlzdHN2aWV3LmphZGVcbi8vIG1vZHVsZSBpZCA9IDEyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCIvaG9tZS91YnVudHUvd29ya3NwYWNlL25vZGVfbW9kdWxlcy9qYWRlL2xpYi9ydW50aW1lLmpzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPGRpdiBpZD1cXFwibW9kYWxcXFwiIHRhYmluZGV4PVxcXCItMVxcXCIgcm9sZT1cXFwiZGlhbG9nXFxcIiBhcmlhLWxhYmVsbGVkYnk9XFxcIm15TW9kYWxMYWJlbFxcXCIgYXJpYS1oaWRkZW49XFxcInRydWVcXFwiIGNsYXNzPVxcXCJtb2RhbCBmYWRlXFxcIj48ZGl2IHJvbGU9XFxcImRvY3VtZW50XFxcIiBjbGFzcz1cXFwibW9kYWwtZGlhbG9nXFxcIj48ZGl2IGNsYXNzPVxcXCJtb2RhbC1jb250ZW50XFxcIj48ZGl2IGNsYXNzPVxcXCJtb2RhbC1oZWFkZXJcXFwiPjxidXR0b24gaWQ9XFxcImNsb3NlLW1vZGFsLWNyb3NzLWJ0blxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBkYXRhLWRpc21pc3M9XFxcIm1vZGFsXFxcIiBhcmlhLWxhYmVsPVxcXCJDbG9zZVxcXCIgY2xhc3M9XFxcImNsb3NlXFxcIj48c3BhbiBhcmlhLWhpZGRlbj1cXFwidHJ1ZVxcXCI+w5c8L3NwYW4+PC9idXR0b24+PGg0IGlkPVxcXCJteU1vZGFsTGFiZWxcXFwiIGNsYXNzPVxcXCJtb2RhbC10aXRsZVxcXCI+0KTQuNC70YzRgtGAPC9oND48L2Rpdj48ZGl2IGNsYXNzPVxcXCJtb2RhbC1ib2R5XFxcIj48Zm9ybSBhY3Rpb249XFxcIlxcXCI+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7Qt9Cw0LPQvtC70L7QstC+0Lo8L2xhYmVsPjxpbnB1dCBpZD1cXFwiZXZlbnQtdGl0bGVcXFwiIHR5cGU9XFxcInRleHRcXFwiIGRhdGEtbHF1ZXJ5LW5hbWU9XFxcInRpdGxlXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sIGwtcXVlcnlcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0L3QsNGH0LDQu9C+PC9sYWJlbD48aW5wdXQgaWQ9XFxcImRhdGViZWdpblxcXCIgdHlwZT1cXFwidGV4dFxcXCIgZGF0YS1scXVlcnktbmFtZT1cXFwic3RhcnRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2wgbC1xdWVyeSBmbGF0cGlja3JcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0L7QutC+0L3Rh9Cw0L3QuNC1PC9sYWJlbD48aW5wdXQgaWQ9XFxcImRhdGVlbmRcXFwiIHR5cGU9XFxcInRleHRcXFwiIGRhdGEtbHF1ZXJ5LW5hbWU9XFxcImVuZFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbCBsLXF1ZXJ5IGZsYXRwaWNrclxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7QvtGC0LTQtdC70LXQvdC40LUg0L/QvtC70YPRh9Cw0YLQtdC70Yw8L2xhYmVsPjxpbnB1dCBpZD1cXFwicG9zdGNvZGVcXFwiIHR5cGU9XFxcInRleHRcXFwiIGRhdGEtbHF1ZXJ5LW5hbWU9XFxcInBvc3RhbENvZGVcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2wgbC1xdWVyeVxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7QvtC/0LjRgdCw0L3QuNC1PC9sYWJlbD48aW5wdXQgaWQ9XFxcImRlc2NyaXB0aW9uXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBkYXRhLWxxdWVyeS1uYW1lPVxcXCJkZXNjcmlwdGlvblxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbCBsLXF1ZXJ5XFxcIj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj48bGFiZWwgZm9yPVxcXCJcXFwiPtGB0YLQsNGC0YPRgTwvbGFiZWw+PGlucHV0IGlkPVxcXCJzdGF0dXNcXFwiIHR5cGU9XFxcInRleHRcXFwiIGRhdGEtbHF1ZXJ5LW5hbWU9XFxcInN0YXR1c1xcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbCBsLXF1ZXJ5XFxcIj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj48bGFiZWwgZm9yPVxcXCJcXFwiPtC40YHQv9C+0LvQvdC40YLQtdC70Yw8L2xhYmVsPjxpbnB1dCBpZD1cXFwiZXhlY3V0b3JcXFwiIHR5cGU9XFxcInRleHRcXFwiIGRhdGEtbHF1ZXJ5LW5hbWU9XFxcImV4ZWN1dG9yXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sIGwtcXVlcnlcXFwiPjwvZGl2PjwvZm9ybT48L2Rpdj48ZGl2IGNsYXNzPVxcXCJtb2RhbC1mb290ZXJcXFwiPjxidXR0b24gaWQ9XFxcImNsb3NlLW1vZGFsLWJ0blxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBkYXRhLWRpc21pc3M9XFxcIm1vZGFsXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPkNsb3NlPC9idXR0b24+PGJ1dHRvbiBpZD1cXFwibG9hZC1maWx0ZXItbGlzdC1idG5cXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tcHJpbWFyeVxcXCI+0KHRhNC+0YDQvNC40YDQvtCy0LDRgtGMPC9idXR0b24+PC9kaXY+PC9kaXY+PC9kaXY+PC9kaXY+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvanMvZGV2L3ZpZXcvbGlzdGZpbHRlcm1vZGFsLmphZGVcbi8vIG1vZHVsZSBpZCA9IDEyNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMxRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDM0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDakZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDclBBOzs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzVFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzdGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDekhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OyIsInNvdXJjZVJvb3QiOiIifQ==