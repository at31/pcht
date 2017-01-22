webpackJsonp([2],{

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
		var nevnt=__webpack_require__(137);

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

/***/ 127:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	module.exports = function() {
		console.log('map4p.js');

		var _mapjade = __webpack_require__(128);
		$('.c-place').html(_mapjade());

		var _podetail = __webpack_require__(129);
		var poDetail = new _podetail();

		var _pathList = __webpack_require__(131);
		var pathList = new _pathList();

		var _save = true;
		var _event, _postOfficeArr;
		var myCollection = new ymaps.GeoObjectCollection();
		var _route;

		var myBalloonContentBodyLayout = ymaps.templateLayoutFactory.createClass(
			'<p>$[properties.data.postalCode]</p><p>$[properties.data.addressSource]</p><p>$[properties.data.typeCode]</p><p>кол-во заявок $[properties.data.evntTotal]</p><br /><button id="show-po-detail-btn">Подробно</button><br /><button id="add-to-path-btn">В список</button>', {
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
				onAddToPathClick: function(e) {
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

		function createPath(selectedEl) {
			$('#po-centr-btn').off();
			_postOfficeArr = [];
			myCollection.removeAll();
			if (_route)
				myMap.geoObjects.remove(_route);

			var pathArr = selectedEl.map(function(otd) {
				return {
					type: 'wayPoint',
					point: [otd.latitude, otd.longitude]
				};
			});
			ymaps.route(pathArr).then(
				function(route) {
					_route = route;
					myMap.geoObjects.add(route);

					var points = route.getWayPoints();
					points.options.set('preset', 'islands#blueStretchyIcon');
					points.each(function(el, i) {
						el.properties.set('iconContent', selectedEl[i].postalCode + " точка №" + (i + 1));
						el.properties.set('balloonContent', selectedEl[i].postalCode + " точка №" + (i + 1));
					});

				},
				function(error) {
					alert("Возникла ошибка: " + error.message);
				}
			);

		}

		function sortComparator(a, b) {
			if (parseInt(a.postalCode) > parseInt(b.postalCode)) {
				return 1;
			}
			if (parseInt(a.postalCode) < parseInt(b.postalCode)) {
				return -1;
			}
		}

		$.ajax({
			type: 'GET',
			url: "./postals.json",
			dataType: "json",
			success: function(data) {

				data.sort(sortComparator);

				$.ajax({
					type: 'GET',
					url: '/evnt/mr',
					dataType: 'json',
					success: function(mrdata) {

						mrdata.sort(sortComparator);

						data.forEach(function(otd) {

							otd.evntTotal = '0';
							mrdata.forEach(function(mr) {
								if (otd.postalCode == mr._id) {
									otd.evntTotal = mr.count;
									return;
								}
							});

							var stl = 'islands#darkgreenStretchyIcon';
							if (otd.evntTotal >= '1') {
								stl = 'islands#darkblueStretchyIcon';
							}
							if (otd.evntTotal >= '3') {
								stl = 'islands#violetStretchyIcon';
							}

							var pmark = new ymaps.Placemark([otd.latitude, otd.longitude], {
								data: otd,
								iconContent: otd.postalCode + " / " + otd.evntTotal,
								iconCaption: otd.postalCode
							}, {
								balloonContentLayout: myBalloonContentBodyLayout,
								preset: stl
							});
							myCollection.add(pmark);
						});

						_postOfficeArr = data;
						myMap.geoObjects.add(myCollection);
						pathList.init(createPath);


						$('#po-centr-btn').on('click', function(e) {
							var ponom = $('#ponum').val();
							_postOfficeArr.forEach(function(po) {
								if (po.postalCode == ponom) {
									myMap.setCenter([po.latitude, po.longitude], 13, {
										checkZoomRange: true
									});
									return;
								}
							});
						});

						$('#do-filter-btn').on('click', function(e) {
							var _range = $('input[name="filtermap"]:checked').val();
							myCollection.removeAll();

							data.forEach(function(otd) {
								if (otd.evntTotal >= parseInt(_range)) {
									var stl = 'islands#darkgreenStretchyIcon';
									if (otd.evntTotal >= '1') {
										stl = 'islands#darkblueStretchyIcon';
									}
									if (otd.evntTotal >= '3') {
										stl = 'islands#violetStretchyIcon';
									}

									var pmark = new ymaps.Placemark([otd.latitude, otd.longitude], {
										data: otd,
										iconContent: otd.postalCode + " / " + otd.evntTotal,
										iconCaption: otd.postalCode
									}, {
										balloonContentLayout: myBalloonContentBodyLayout,
										preset: stl
									});
									myCollection.add(pmark);
								}
							});
							
							myMap.geoObjects.add(myCollection);
							
						});


					},
					error: function(err) {
						console.log(err);


					}
				});

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

	/* WEBPACK VAR INJECTION */(function($, moment) {'use strict';

	module.exports = function() {

		this.plJade = __webpack_require__(132);
		this.elJade = __webpack_require__(133);
		this.nestedListJade = __webpack_require__(134);
		this.pdfJade = __webpack_require__(135);
		this.evntDetailJade = __webpack_require__(136);
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
				url:"/evnt/evnt/"+_data.postalCode,
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
								/*$(".flatpickr").flatpickr({
									enableTime: true,
								});*/

								$('#modal').modal('show');
								
								$("#datebegin").flatpickr({
								utc: true,
								defaultDate: moment(_event.start).format('YYYY-MM-DD hh:mm'),
								enableTime: true,
								});
								$("#dateend").flatpickr({
								utc: true,
								defaultDate: moment(_event.end).format('YYYY-MM-DD hh:mm'),
								enableTime: true,
								});

							//	$('#datebegin').val(moment(_event.start).format('YYYY-MM-DD hh:mm'));
							//	$('#dateend').val(moment(_event.end).format('YYYY-MM-DD hh:mm'));
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(8)))

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

	var jade = __webpack_require__(5);

	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;

	buf.push("<div id=\"modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\" class=\"modal fade\"><div role=\"document\" class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" data-dismiss=\"modal\" aria-label=\"Close\" class=\"close\"><span aria-hidden=\"true\">×</span></button><h4 id=\"myModalLabel\" class=\"modal-title\">Редактирование/удаление</h4></div><div class=\"modal-body\"><form action=\"\"><div class=\"form-group\"><label for=\"\">заголовок</label><input id=\"event-title\" type=\"text\" class=\"form-control\"></div><div class=\"form-group\"><label for=\"\">начало</label><input id=\"datebegin\" type=\"text\" class=\"form-control flatpickr\"></div><div class=\"form-group\"><label for=\"\">окончание</label><input id=\"dateend\" type=\"text\" class=\"form-control flatpickr\"></div><div class=\"form-group\"><label for=\"\">отделение получатель</label><input id=\"postcode\" type=\"text\" class=\"form-control\"></div><div class=\"form-group\"><label for=\"\">описание</label><input id=\"description\" type=\"text\" class=\"form-control\"></div><div class=\"form-group\"><label for=\"\">статус</label><input id=\"status\" type=\"text\" class=\"form-control\"></div><div class=\"form-group\"><label for=\"\">исполнитель</label><input id=\"executor\" type=\"text\" class=\"form-control\"></div></form></div><div class=\"modal-footer\"><button type=\"button\" data-dismiss=\"modal\" class=\"btn btn-secondary\">Close</button><!--button#save-event-btn.btn.btn-primary(type='button') Save changes--><!--button#delete-event-btn.btn.btn-danger(type='button') Delete--></div></div></div></div>");;return buf.join("");
	}

/***/ },

/***/ 137:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, moment) {'use strict';

	module.exports = function() {

		this._modal = __webpack_require__(138);

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

				var multi = $('#postcode').val().split(";");
				if (multi.length > 1) {
					var evnts = [];
					multi.forEach(function(poCode) {
						var evnt = {
							title: $('#event-title').val(),
							start: moment($('#datebegin').val()),
							end: moment($('#dateend').val()),
							postalCode: poCode,
							status: $('#status').val(),
							description: $("#description").val(),
							executor: $('#executor').val()
						};
						
						evnts.push(evnt);
					});
					
					$.ajax({
						type: 'POST',
						url: '/evnt/save/multi',
						data: JSON.stringify(evnts),
						dataType: "json",
						contentType: "application/json",
						success: function(data) {
							console.log("data save");
						},
						//error: ajaxError
					});
				}
				else {
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
						url: '/evnt/save',
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
				}


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

/***/ 138:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aGFwcC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3B1YmxpYy9qcy9kZXYvcG0vYXBwLmpzIiwid2VicGFjazovLy8uL34vamFkZS9saWIvcnVudGltZS5qcyIsIndlYnBhY2s6Ly8vZnMgKGlnbm9yZWQpIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9kZXYvcG0vbW9kdWxlL21hcDRwLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9kZXYvcG0vdmlldy9tYXAuamFkZSIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3BtL21vZHVsZS9wb0RldGFpbC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3BtL3ZpZXcvcG9EZXRhaWwuamFkZSIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3BtL21vZHVsZS9wYXRoTGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3BtL3ZpZXcvcGF0aExpc3QuamFkZSIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3BtL3ZpZXcvbGlzdEVsLmphZGUiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2Rldi9wbS92aWV3L3N1Ymxpc3QuamFkZSIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3BtL3ZpZXcvcGRmUGF0aExpc3QuamFkZSIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3BtL3ZpZXcvZWRpdGRlbEV2ZW50LmphZGUiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2Rldi9wbS9tb2R1bGUvbmV3RXZlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2Rldi9wbS92aWV3L25ld0V2ZW50LmphZGUiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy9tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG5jb25zb2xlLmxvZygnaGkgcGNodCcpO1xyXG5cclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1x0XHJcblxyXG5cdCQoXCIuZmxhdHBpY2tyXCIpLmZsYXRwaWNrcih7XHJcblx0XHRlbmFibGVUaW1lOiB0cnVlLFxyXG5cdH0pO1xyXG5cclxuXHR2YXIgbXlNYXA9cmVxdWlyZSgnLi9tb2R1bGUvbWFwNHAuanMnKTtcdFxyXG5cdHltYXBzLnJlYWR5KGluaXQpO1xyXG5cdHZhciBfbXlNYXA7XHJcblx0dmFyIG5ldm50PXJlcXVpcmUoJy4vbW9kdWxlL25ld0V2ZW50LmpzJyk7XHJcblxyXG5cdGZ1bmN0aW9uIGluaXQoKSB7XHJcblx0XHRcclxuXHRcdF9teU1hcD1teU1hcCgpO1xyXG5cclxuXHRcdCQoJyNtYXAtbG9hZC1saW5rJykuY2xpY2soZnVuY3Rpb24oKXtcclxuXHRcdFx0X215TWFwLmRlc3Ryb3koKTtcclxuXHRcdFx0X215TWFwPW51bGw7XHJcblx0XHRcdF9teU1hcD1teU1hcCgpO1xyXG5cclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoJyNuZXctZXZudC1saW5rJykuY2xpY2soZnVuY3Rpb24oZSl7XHJcblx0XHRcdHZhciBfbmV2bnQ9IG5ldyBuZXZudCgpO1xyXG5cdFx0XHRfbmV2bnQuaW5pdCgpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHJcblxyXG59KTtcclxuXHJcbi8vfVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2pzL2Rldi9wbS9hcHAuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIE1lcmdlIHR3byBhdHRyaWJ1dGUgb2JqZWN0cyBnaXZpbmcgcHJlY2VkZW5jZVxuICogdG8gdmFsdWVzIGluIG9iamVjdCBgYmAuIENsYXNzZXMgYXJlIHNwZWNpYWwtY2FzZWRcbiAqIGFsbG93aW5nIGZvciBhcnJheXMgYW5kIG1lcmdpbmcvam9pbmluZyBhcHByb3ByaWF0ZWx5XG4gKiByZXN1bHRpbmcgaW4gYSBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGFcbiAqIEBwYXJhbSB7T2JqZWN0fSBiXG4gKiBAcmV0dXJuIHtPYmplY3R9IGFcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMubWVyZ2UgPSBmdW5jdGlvbiBtZXJnZShhLCBiKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgdmFyIGF0dHJzID0gYVswXTtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGF0dHJzID0gbWVyZ2UoYXR0cnMsIGFbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gYXR0cnM7XG4gIH1cbiAgdmFyIGFjID0gYVsnY2xhc3MnXTtcbiAgdmFyIGJjID0gYlsnY2xhc3MnXTtcblxuICBpZiAoYWMgfHwgYmMpIHtcbiAgICBhYyA9IGFjIHx8IFtdO1xuICAgIGJjID0gYmMgfHwgW107XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGFjKSkgYWMgPSBbYWNdO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShiYykpIGJjID0gW2JjXTtcbiAgICBhWydjbGFzcyddID0gYWMuY29uY2F0KGJjKS5maWx0ZXIobnVsbHMpO1xuICB9XG5cbiAgZm9yICh2YXIga2V5IGluIGIpIHtcbiAgICBpZiAoa2V5ICE9ICdjbGFzcycpIHtcbiAgICAgIGFba2V5XSA9IGJba2V5XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYTtcbn07XG5cbi8qKlxuICogRmlsdGVyIG51bGwgYHZhbGBzLlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbnVsbHModmFsKSB7XG4gIHJldHVybiB2YWwgIT0gbnVsbCAmJiB2YWwgIT09ICcnO1xufVxuXG4vKipcbiAqIGpvaW4gYXJyYXkgYXMgY2xhc3Nlcy5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmpvaW5DbGFzc2VzID0gam9pbkNsYXNzZXM7XG5mdW5jdGlvbiBqb2luQ2xhc3Nlcyh2YWwpIHtcbiAgcmV0dXJuIChBcnJheS5pc0FycmF5KHZhbCkgPyB2YWwubWFwKGpvaW5DbGFzc2VzKSA6XG4gICAgKHZhbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0JykgPyBPYmplY3Qua2V5cyh2YWwpLmZpbHRlcihmdW5jdGlvbiAoa2V5KSB7IHJldHVybiB2YWxba2V5XTsgfSkgOlxuICAgIFt2YWxdKS5maWx0ZXIobnVsbHMpLmpvaW4oJyAnKTtcbn1cblxuLyoqXG4gKiBSZW5kZXIgdGhlIGdpdmVuIGNsYXNzZXMuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gY2xhc3Nlc1xuICogQHBhcmFtIHtBcnJheS48Qm9vbGVhbj59IGVzY2FwZWRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5jbHMgPSBmdW5jdGlvbiBjbHMoY2xhc3NlcywgZXNjYXBlZCkge1xuICB2YXIgYnVmID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY2xhc3Nlcy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChlc2NhcGVkICYmIGVzY2FwZWRbaV0pIHtcbiAgICAgIGJ1Zi5wdXNoKGV4cG9ydHMuZXNjYXBlKGpvaW5DbGFzc2VzKFtjbGFzc2VzW2ldXSkpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYnVmLnB1c2goam9pbkNsYXNzZXMoY2xhc3Nlc1tpXSkpO1xuICAgIH1cbiAgfVxuICB2YXIgdGV4dCA9IGpvaW5DbGFzc2VzKGJ1Zik7XG4gIGlmICh0ZXh0Lmxlbmd0aCkge1xuICAgIHJldHVybiAnIGNsYXNzPVwiJyArIHRleHQgKyAnXCInO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAnJztcbiAgfVxufTtcblxuXG5leHBvcnRzLnN0eWxlID0gZnVuY3Rpb24gKHZhbCkge1xuICBpZiAodmFsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHZhbCkubWFwKGZ1bmN0aW9uIChzdHlsZSkge1xuICAgICAgcmV0dXJuIHN0eWxlICsgJzonICsgdmFsW3N0eWxlXTtcbiAgICB9KS5qb2luKCc7Jyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHZhbDtcbiAgfVxufTtcbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBhdHRyaWJ1dGUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICogQHBhcmFtIHtTdHJpbmd9IHZhbFxuICogQHBhcmFtIHtCb29sZWFufSBlc2NhcGVkXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHRlcnNlXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuYXR0ciA9IGZ1bmN0aW9uIGF0dHIoa2V5LCB2YWwsIGVzY2FwZWQsIHRlcnNlKSB7XG4gIGlmIChrZXkgPT09ICdzdHlsZScpIHtcbiAgICB2YWwgPSBleHBvcnRzLnN0eWxlKHZhbCk7XG4gIH1cbiAgaWYgKCdib29sZWFuJyA9PSB0eXBlb2YgdmFsIHx8IG51bGwgPT0gdmFsKSB7XG4gICAgaWYgKHZhbCkge1xuICAgICAgcmV0dXJuICcgJyArICh0ZXJzZSA/IGtleSA6IGtleSArICc9XCInICsga2V5ICsgJ1wiJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH0gZWxzZSBpZiAoMCA9PSBrZXkuaW5kZXhPZignZGF0YScpICYmICdzdHJpbmcnICE9IHR5cGVvZiB2YWwpIHtcbiAgICBpZiAoSlNPTi5zdHJpbmdpZnkodmFsKS5pbmRleE9mKCcmJykgIT09IC0xKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1NpbmNlIEphZGUgMi4wLjAsIGFtcGVyc2FuZHMgKGAmYCkgaW4gZGF0YSBhdHRyaWJ1dGVzICcgK1xuICAgICAgICAgICAgICAgICAgICd3aWxsIGJlIGVzY2FwZWQgdG8gYCZhbXA7YCcpO1xuICAgIH07XG4gICAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsLnRvSVNPU3RyaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0phZGUgd2lsbCBlbGltaW5hdGUgdGhlIGRvdWJsZSBxdW90ZXMgYXJvdW5kIGRhdGVzIGluICcgK1xuICAgICAgICAgICAgICAgICAgICdJU08gZm9ybSBhZnRlciAyLjAuMCcpO1xuICAgIH1cbiAgICByZXR1cm4gJyAnICsga2V5ICsgXCI9J1wiICsgSlNPTi5zdHJpbmdpZnkodmFsKS5yZXBsYWNlKC8nL2csICcmYXBvczsnKSArIFwiJ1wiO1xuICB9IGVsc2UgaWYgKGVzY2FwZWQpIHtcbiAgICBpZiAodmFsICYmIHR5cGVvZiB2YWwudG9JU09TdHJpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnNvbGUud2FybignSmFkZSB3aWxsIHN0cmluZ2lmeSBkYXRlcyBpbiBJU08gZm9ybSBhZnRlciAyLjAuMCcpO1xuICAgIH1cbiAgICByZXR1cm4gJyAnICsga2V5ICsgJz1cIicgKyBleHBvcnRzLmVzY2FwZSh2YWwpICsgJ1wiJztcbiAgfSBlbHNlIHtcbiAgICBpZiAodmFsICYmIHR5cGVvZiB2YWwudG9JU09TdHJpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnNvbGUud2FybignSmFkZSB3aWxsIHN0cmluZ2lmeSBkYXRlcyBpbiBJU08gZm9ybSBhZnRlciAyLjAuMCcpO1xuICAgIH1cbiAgICByZXR1cm4gJyAnICsga2V5ICsgJz1cIicgKyB2YWwgKyAnXCInO1xuICB9XG59O1xuXG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gYXR0cmlidXRlcyBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHBhcmFtIHtPYmplY3R9IGVzY2FwZWRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5hdHRycyA9IGZ1bmN0aW9uIGF0dHJzKG9iaiwgdGVyc2Upe1xuICB2YXIgYnVmID0gW107XG5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuXG4gIGlmIChrZXlzLmxlbmd0aCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgdmFyIGtleSA9IGtleXNbaV1cbiAgICAgICAgLCB2YWwgPSBvYmpba2V5XTtcblxuICAgICAgaWYgKCdjbGFzcycgPT0ga2V5KSB7XG4gICAgICAgIGlmICh2YWwgPSBqb2luQ2xhc3Nlcyh2YWwpKSB7XG4gICAgICAgICAgYnVmLnB1c2goJyAnICsga2V5ICsgJz1cIicgKyB2YWwgKyAnXCInKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnVmLnB1c2goZXhwb3J0cy5hdHRyKGtleSwgdmFsLCBmYWxzZSwgdGVyc2UpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnVmLmpvaW4oJycpO1xufTtcblxuLyoqXG4gKiBFc2NhcGUgdGhlIGdpdmVuIHN0cmluZyBvZiBgaHRtbGAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGh0bWxcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbnZhciBqYWRlX2VuY29kZV9odG1sX3J1bGVzID0ge1xuICAnJic6ICcmYW1wOycsXG4gICc8JzogJyZsdDsnLFxuICAnPic6ICcmZ3Q7JyxcbiAgJ1wiJzogJyZxdW90Oydcbn07XG52YXIgamFkZV9tYXRjaF9odG1sID0gL1smPD5cIl0vZztcblxuZnVuY3Rpb24gamFkZV9lbmNvZGVfY2hhcihjKSB7XG4gIHJldHVybiBqYWRlX2VuY29kZV9odG1sX3J1bGVzW2NdIHx8IGM7XG59XG5cbmV4cG9ydHMuZXNjYXBlID0gamFkZV9lc2NhcGU7XG5mdW5jdGlvbiBqYWRlX2VzY2FwZShodG1sKXtcbiAgdmFyIHJlc3VsdCA9IFN0cmluZyhodG1sKS5yZXBsYWNlKGphZGVfbWF0Y2hfaHRtbCwgamFkZV9lbmNvZGVfY2hhcik7XG4gIGlmIChyZXN1bHQgPT09ICcnICsgaHRtbCkgcmV0dXJuIGh0bWw7XG4gIGVsc2UgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKlxuICogUmUtdGhyb3cgdGhlIGdpdmVuIGBlcnJgIGluIGNvbnRleHQgdG8gdGhlXG4gKiB0aGUgamFkZSBpbiBgZmlsZW5hbWVgIGF0IHRoZSBnaXZlbiBgbGluZW5vYC5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWxlbmFtZVxuICogQHBhcmFtIHtTdHJpbmd9IGxpbmVub1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5yZXRocm93ID0gZnVuY3Rpb24gcmV0aHJvdyhlcnIsIGZpbGVuYW1lLCBsaW5lbm8sIHN0cil7XG4gIGlmICghKGVyciBpbnN0YW5jZW9mIEVycm9yKSkgdGhyb3cgZXJyO1xuICBpZiAoKHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgfHwgIWZpbGVuYW1lKSAmJiAhc3RyKSB7XG4gICAgZXJyLm1lc3NhZ2UgKz0gJyBvbiBsaW5lICcgKyBsaW5lbm87XG4gICAgdGhyb3cgZXJyO1xuICB9XG4gIHRyeSB7XG4gICAgc3RyID0gc3RyIHx8IHJlcXVpcmUoJ2ZzJykucmVhZEZpbGVTeW5jKGZpbGVuYW1lLCAndXRmOCcpXG4gIH0gY2F0Y2ggKGV4KSB7XG4gICAgcmV0aHJvdyhlcnIsIG51bGwsIGxpbmVubylcbiAgfVxuICB2YXIgY29udGV4dCA9IDNcbiAgICAsIGxpbmVzID0gc3RyLnNwbGl0KCdcXG4nKVxuICAgICwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSBjb250ZXh0LCAwKVxuICAgICwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyBjb250ZXh0KTtcblxuICAvLyBFcnJvciBjb250ZXh0XG4gIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gJyAgPiAnIDogJyAgICAnKVxuICAgICAgKyBjdXJyXG4gICAgICArICd8ICdcbiAgICAgICsgbGluZTtcbiAgfSkuam9pbignXFxuJyk7XG5cbiAgLy8gQWx0ZXIgZXhjZXB0aW9uIG1lc3NhZ2VcbiAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgJ0phZGUnKSArICc6JyArIGxpbmVub1xuICAgICsgJ1xcbicgKyBjb250ZXh0ICsgJ1xcblxcbicgKyBlcnIubWVzc2FnZTtcbiAgdGhyb3cgZXJyO1xufTtcblxuZXhwb3J0cy5EZWJ1Z0l0ZW0gPSBmdW5jdGlvbiBEZWJ1Z0l0ZW0obGluZW5vLCBmaWxlbmFtZSkge1xuICB0aGlzLmxpbmVubyA9IGxpbmVubztcbiAgdGhpcy5maWxlbmFtZSA9IGZpbGVuYW1lO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2phZGUvbGliL3J1bnRpbWUuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIgMyIsIi8qIChpZ25vcmVkKSAqL1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGZzIChpZ25vcmVkKVxuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMiAzIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHRjb25zb2xlLmxvZygnbWFwNHAuanMnKTtcclxuXHJcblx0dmFyIF9tYXBqYWRlID0gcmVxdWlyZSgnLi4vdmlldy9tYXAuamFkZScpO1xyXG5cdCQoJy5jLXBsYWNlJykuaHRtbChfbWFwamFkZSgpKTtcclxuXHJcblx0dmFyIF9wb2RldGFpbCA9IHJlcXVpcmUoJy4uL21vZHVsZS9wb0RldGFpbC5qcycpO1xyXG5cdHZhciBwb0RldGFpbCA9IG5ldyBfcG9kZXRhaWwoKTtcclxuXHJcblx0dmFyIF9wYXRoTGlzdCA9IHJlcXVpcmUoJy4uL21vZHVsZS9wYXRoTGlzdC5qcycpO1xyXG5cdHZhciBwYXRoTGlzdCA9IG5ldyBfcGF0aExpc3QoKTtcclxuXHJcblx0dmFyIF9zYXZlID0gdHJ1ZTtcclxuXHR2YXIgX2V2ZW50LCBfcG9zdE9mZmljZUFycjtcclxuXHR2YXIgbXlDb2xsZWN0aW9uID0gbmV3IHltYXBzLkdlb09iamVjdENvbGxlY3Rpb24oKTtcclxuXHR2YXIgX3JvdXRlO1xyXG5cclxuXHR2YXIgbXlCYWxsb29uQ29udGVudEJvZHlMYXlvdXQgPSB5bWFwcy50ZW1wbGF0ZUxheW91dEZhY3RvcnkuY3JlYXRlQ2xhc3MoXHJcblx0XHQnPHA+JFtwcm9wZXJ0aWVzLmRhdGEucG9zdGFsQ29kZV08L3A+PHA+JFtwcm9wZXJ0aWVzLmRhdGEuYWRkcmVzc1NvdXJjZV08L3A+PHA+JFtwcm9wZXJ0aWVzLmRhdGEudHlwZUNvZGVdPC9wPjxwPtC60L7Quy3QstC+INC30LDRj9Cy0L7QuiAkW3Byb3BlcnRpZXMuZGF0YS5ldm50VG90YWxdPC9wPjxiciAvPjxidXR0b24gaWQ9XCJzaG93LXBvLWRldGFpbC1idG5cIj7Qn9C+0LTRgNC+0LHQvdC+PC9idXR0b24+PGJyIC8+PGJ1dHRvbiBpZD1cImFkZC10by1wYXRoLWJ0blwiPtCSINGB0L/QuNGB0L7QujwvYnV0dG9uPicsIHtcclxuXHRcdFx0YnVpbGQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdG15QmFsbG9vbkNvbnRlbnRCb2R5TGF5b3V0LnN1cGVyY2xhc3MuYnVpbGQuY2FsbCh0aGlzKTtcclxuXHRcdFx0XHQkKCcjc2hvdy1wby1kZXRhaWwtYnRuJykub24oJ2NsaWNrJywge1xyXG5cdFx0XHRcdFx0XCJwb1wiOiB0aGlzLl9kYXRhLnByb3BlcnRpZXMuX2RhdGFcclxuXHRcdFx0XHR9LCB0aGlzLm9uU2hvd1BPRGV0YWlsQ2xpY2spO1xyXG5cdFx0XHRcdCQoJyNhZGQtdG8tcGF0aC1idG4nKS5vbignY2xpY2snLCB7XHJcblx0XHRcdFx0XHRcInBvXCI6IHRoaXMuX2RhdGEucHJvcGVydGllcy5fZGF0YVxyXG5cdFx0XHRcdH0sIHRoaXMub25BZGRUb1BhdGhDbGljayk7XHJcblx0XHRcdH0sXHJcblx0XHRcdGNsZWFyOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHQkKCcjc2hvdy1wby1kZXRhaWwtYnRuJykub2ZmKCdjbGljaycsIHRoaXMub25TaG93UE9EZXRhaWxDbGljayk7XHJcblx0XHRcdFx0bXlCYWxsb29uQ29udGVudEJvZHlMYXlvdXQuc3VwZXJjbGFzcy5jbGVhci5jYWxsKHRoaXMpO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRvblNob3dQT0RldGFpbENsaWNrOiBmdW5jdGlvbihlKSB7XHJcblx0XHRcdFx0cG9EZXRhaWwuaW5pdChlLmRhdGEucG8uZGF0YSwgbXlNYXApO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRvbkFkZFRvUGF0aENsaWNrOiBmdW5jdGlvbihlKSB7XHJcblx0XHRcdFx0cGF0aExpc3QuYWRkRWxlbWVudChlLmRhdGEucG8uZGF0YSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHR2YXIgbXlNYXAgPSBuZXcgeW1hcHMuTWFwKFwibWFweVwiLCB7XHJcblx0XHRjZW50ZXI6IFs1MC41OSwgMzYuNThdLFxyXG5cdFx0em9vbTogMTAsXHJcblx0XHRjb250cm9sczogWydyb3V0ZUVkaXRvciddXHJcblx0fSwge1xyXG5cdFx0YnV0dG9uTWF4V2lkdGg6IDE1MFxyXG5cdH0pO1xyXG5cclxuXHRmdW5jdGlvbiBjcmVhdGVQYXRoKHNlbGVjdGVkRWwpIHtcclxuXHRcdCQoJyNwby1jZW50ci1idG4nKS5vZmYoKTtcclxuXHRcdF9wb3N0T2ZmaWNlQXJyID0gW107XHJcblx0XHRteUNvbGxlY3Rpb24ucmVtb3ZlQWxsKCk7XHJcblx0XHRpZiAoX3JvdXRlKVxyXG5cdFx0XHRteU1hcC5nZW9PYmplY3RzLnJlbW92ZShfcm91dGUpO1xyXG5cclxuXHRcdHZhciBwYXRoQXJyID0gc2VsZWN0ZWRFbC5tYXAoZnVuY3Rpb24ob3RkKSB7XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0dHlwZTogJ3dheVBvaW50JyxcclxuXHRcdFx0XHRwb2ludDogW290ZC5sYXRpdHVkZSwgb3RkLmxvbmdpdHVkZV1cclxuXHRcdFx0fTtcclxuXHRcdH0pO1xyXG5cdFx0eW1hcHMucm91dGUocGF0aEFycikudGhlbihcclxuXHRcdFx0ZnVuY3Rpb24ocm91dGUpIHtcclxuXHRcdFx0XHRfcm91dGUgPSByb3V0ZTtcclxuXHRcdFx0XHRteU1hcC5nZW9PYmplY3RzLmFkZChyb3V0ZSk7XHJcblxyXG5cdFx0XHRcdHZhciBwb2ludHMgPSByb3V0ZS5nZXRXYXlQb2ludHMoKTtcclxuXHRcdFx0XHRwb2ludHMub3B0aW9ucy5zZXQoJ3ByZXNldCcsICdpc2xhbmRzI2JsdWVTdHJldGNoeUljb24nKTtcclxuXHRcdFx0XHRwb2ludHMuZWFjaChmdW5jdGlvbihlbCwgaSkge1xyXG5cdFx0XHRcdFx0ZWwucHJvcGVydGllcy5zZXQoJ2ljb25Db250ZW50Jywgc2VsZWN0ZWRFbFtpXS5wb3N0YWxDb2RlICsgXCIg0YLQvtGH0LrQsCDihJZcIiArIChpICsgMSkpO1xyXG5cdFx0XHRcdFx0ZWwucHJvcGVydGllcy5zZXQoJ2JhbGxvb25Db250ZW50Jywgc2VsZWN0ZWRFbFtpXS5wb3N0YWxDb2RlICsgXCIg0YLQvtGH0LrQsCDihJZcIiArIChpICsgMSkpO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0fSxcclxuXHRcdFx0ZnVuY3Rpb24oZXJyb3IpIHtcclxuXHRcdFx0XHRhbGVydChcItCS0L7Qt9C90LjQutC70LAg0L7RiNC40LHQutCwOiBcIiArIGVycm9yLm1lc3NhZ2UpO1xyXG5cdFx0XHR9XHJcblx0XHQpO1xyXG5cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHNvcnRDb21wYXJhdG9yKGEsIGIpIHtcclxuXHRcdGlmIChwYXJzZUludChhLnBvc3RhbENvZGUpID4gcGFyc2VJbnQoYi5wb3N0YWxDb2RlKSkge1xyXG5cdFx0XHRyZXR1cm4gMTtcclxuXHRcdH1cclxuXHRcdGlmIChwYXJzZUludChhLnBvc3RhbENvZGUpIDwgcGFyc2VJbnQoYi5wb3N0YWxDb2RlKSkge1xyXG5cdFx0XHRyZXR1cm4gLTE7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQkLmFqYXgoe1xyXG5cdFx0dHlwZTogJ0dFVCcsXHJcblx0XHR1cmw6IFwiLi9wb3N0YWxzLmpzb25cIixcclxuXHRcdGRhdGFUeXBlOiBcImpzb25cIixcclxuXHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuXHJcblx0XHRcdGRhdGEuc29ydChzb3J0Q29tcGFyYXRvcik7XHJcblxyXG5cdFx0XHQkLmFqYXgoe1xyXG5cdFx0XHRcdHR5cGU6ICdHRVQnLFxyXG5cdFx0XHRcdHVybDogJy9ldm50L21yJyxcclxuXHRcdFx0XHRkYXRhVHlwZTogJ2pzb24nLFxyXG5cdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKG1yZGF0YSkge1xyXG5cclxuXHRcdFx0XHRcdG1yZGF0YS5zb3J0KHNvcnRDb21wYXJhdG9yKTtcclxuXHJcblx0XHRcdFx0XHRkYXRhLmZvckVhY2goZnVuY3Rpb24ob3RkKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRvdGQuZXZudFRvdGFsID0gJzAnO1xyXG5cdFx0XHRcdFx0XHRtcmRhdGEuZm9yRWFjaChmdW5jdGlvbihtcikge1xyXG5cdFx0XHRcdFx0XHRcdGlmIChvdGQucG9zdGFsQ29kZSA9PSBtci5faWQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdG90ZC5ldm50VG90YWwgPSBtci5jb3VudDtcclxuXHRcdFx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdFx0dmFyIHN0bCA9ICdpc2xhbmRzI2RhcmtncmVlblN0cmV0Y2h5SWNvbic7XHJcblx0XHRcdFx0XHRcdGlmIChvdGQuZXZudFRvdGFsID49ICcxJykge1xyXG5cdFx0XHRcdFx0XHRcdHN0bCA9ICdpc2xhbmRzI2RhcmtibHVlU3RyZXRjaHlJY29uJztcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRpZiAob3RkLmV2bnRUb3RhbCA+PSAnMycpIHtcclxuXHRcdFx0XHRcdFx0XHRzdGwgPSAnaXNsYW5kcyN2aW9sZXRTdHJldGNoeUljb24nO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHR2YXIgcG1hcmsgPSBuZXcgeW1hcHMuUGxhY2VtYXJrKFtvdGQubGF0aXR1ZGUsIG90ZC5sb25naXR1ZGVdLCB7XHJcblx0XHRcdFx0XHRcdFx0ZGF0YTogb3RkLFxyXG5cdFx0XHRcdFx0XHRcdGljb25Db250ZW50OiBvdGQucG9zdGFsQ29kZSArIFwiIC8gXCIgKyBvdGQuZXZudFRvdGFsLFxyXG5cdFx0XHRcdFx0XHRcdGljb25DYXB0aW9uOiBvdGQucG9zdGFsQ29kZVxyXG5cdFx0XHRcdFx0XHR9LCB7XHJcblx0XHRcdFx0XHRcdFx0YmFsbG9vbkNvbnRlbnRMYXlvdXQ6IG15QmFsbG9vbkNvbnRlbnRCb2R5TGF5b3V0LFxyXG5cdFx0XHRcdFx0XHRcdHByZXNldDogc3RsXHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRteUNvbGxlY3Rpb24uYWRkKHBtYXJrKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdF9wb3N0T2ZmaWNlQXJyID0gZGF0YTtcclxuXHRcdFx0XHRcdG15TWFwLmdlb09iamVjdHMuYWRkKG15Q29sbGVjdGlvbik7XHJcblx0XHRcdFx0XHRwYXRoTGlzdC5pbml0KGNyZWF0ZVBhdGgpO1xyXG5cclxuXHJcblx0XHRcdFx0XHQkKCcjcG8tY2VudHItYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRcdFx0XHR2YXIgcG9ub20gPSAkKCcjcG9udW0nKS52YWwoKTtcclxuXHRcdFx0XHRcdFx0X3Bvc3RPZmZpY2VBcnIuZm9yRWFjaChmdW5jdGlvbihwbykge1xyXG5cdFx0XHRcdFx0XHRcdGlmIChwby5wb3N0YWxDb2RlID09IHBvbm9tKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRteU1hcC5zZXRDZW50ZXIoW3BvLmxhdGl0dWRlLCBwby5sb25naXR1ZGVdLCAxMywge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRjaGVja1pvb21SYW5nZTogdHJ1ZVxyXG5cdFx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdCQoJyNkby1maWx0ZXItYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRcdFx0XHR2YXIgX3JhbmdlID0gJCgnaW5wdXRbbmFtZT1cImZpbHRlcm1hcFwiXTpjaGVja2VkJykudmFsKCk7XHJcblx0XHRcdFx0XHRcdG15Q29sbGVjdGlvbi5yZW1vdmVBbGwoKTtcclxuXHJcblx0XHRcdFx0XHRcdGRhdGEuZm9yRWFjaChmdW5jdGlvbihvdGQpIHtcclxuXHRcdFx0XHRcdFx0XHRpZiAob3RkLmV2bnRUb3RhbCA+PSBwYXJzZUludChfcmFuZ2UpKSB7XHJcblx0XHRcdFx0XHRcdFx0XHR2YXIgc3RsID0gJ2lzbGFuZHMjZGFya2dyZWVuU3RyZXRjaHlJY29uJztcclxuXHRcdFx0XHRcdFx0XHRcdGlmIChvdGQuZXZudFRvdGFsID49ICcxJykge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRzdGwgPSAnaXNsYW5kcyNkYXJrYmx1ZVN0cmV0Y2h5SWNvbic7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAob3RkLmV2bnRUb3RhbCA+PSAnMycpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0c3RsID0gJ2lzbGFuZHMjdmlvbGV0U3RyZXRjaHlJY29uJztcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0XHR2YXIgcG1hcmsgPSBuZXcgeW1hcHMuUGxhY2VtYXJrKFtvdGQubGF0aXR1ZGUsIG90ZC5sb25naXR1ZGVdLCB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGRhdGE6IG90ZCxcclxuXHRcdFx0XHRcdFx0XHRcdFx0aWNvbkNvbnRlbnQ6IG90ZC5wb3N0YWxDb2RlICsgXCIgLyBcIiArIG90ZC5ldm50VG90YWwsXHJcblx0XHRcdFx0XHRcdFx0XHRcdGljb25DYXB0aW9uOiBvdGQucG9zdGFsQ29kZVxyXG5cdFx0XHRcdFx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRiYWxsb29uQ29udGVudExheW91dDogbXlCYWxsb29uQ29udGVudEJvZHlMYXlvdXQsXHJcblx0XHRcdFx0XHRcdFx0XHRcdHByZXNldDogc3RsXHJcblx0XHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0XHRcdG15Q29sbGVjdGlvbi5hZGQocG1hcmspO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHRteU1hcC5nZW9PYmplY3RzLmFkZChteUNvbGxlY3Rpb24pO1xyXG5cdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdH0pO1xyXG5cclxuXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRlcnJvcjogZnVuY3Rpb24oZXJyKSB7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhlcnIpO1xyXG5cclxuXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHR9LFxyXG5cdFx0Ly9lcnJvcjogbG9hZEVycm9yXHJcblx0fSk7XHJcblxyXG5cdHJldHVybiBteU1hcDtcclxufVxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy9qcy9kZXYvcG0vbW9kdWxlL21hcDRwLmpzXG4vLyBtb2R1bGUgaWQgPSAxMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAyIDMiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJDOlxcXFxfdGVtcFxcXFxwY2h0XFxcXG5vZGVfbW9kdWxlc1xcXFxqYWRlXFxcXGxpYlxcXFxydW50aW1lLmpzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPGRpdiBpZD1cXFwibWFweVxcXCIgc3R5bGU9XFxcIndpZHRoOiAxMDAlOyBoZWlnaHQ6IDgwMHB4XFxcIj48L2Rpdj5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy9qcy9kZXYvcG0vdmlldy9tYXAuamFkZVxuLy8gbW9kdWxlIGlkID0gMTI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMiAzIiwiJ3VzZSBzcnRpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHM9ZnVuY3Rpb24oKXtcclxuXHJcbiAgdGhpcy5fbW9kYWwgPSByZXF1aXJlKCcuLi92aWV3L3BvRGV0YWlsLmphZGUnKTtcclxuXHJcbiAgdGhpcy5kZXN0cm95TW9kYWwgPSBmdW5jdGlvbigpIHtcclxuICAgICAgIFxyXG4gICAgJCgnI2Nsb3NlLW1vZGFsLWJ0bicpLm9mZignY2xpY2snKTtcclxuICAgICQoJyNjbG9zZS1tb2RhbC1jcm9zcy1idG4nKS5vZmYoJ2NsaWNrJyk7XHJcbiAgICAkKCcubW9kYWwtcGxhY2UnKS5odG1sKCcnKTtcclxuICB9O1xyXG5cclxuICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gIHRoaXMuaW5pdCA9IGZ1bmN0aW9uKGRhdGEsIG15TWFwKSB7XHJcblxyXG4gICAgJCgnLm1vZGFsLXBsYWNlJykuaHRtbCh0aGlzLl9tb2RhbCh7XCJkYXRhXCI6IGRhdGF9KSk7XHJcblxyXG5cclxuICAgICQoJyNjbG9zZS1tb2RhbC1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnI2Nsb3NlLW1vZGFsLWNyb3NzLWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcjbW9kYWwnKS5tb2RhbCgnc2hvdycpO1xyXG5cclxuICAgICQoJyNtb2RhbCcpLm9uKCdoaWRkZW4uYnMubW9kYWwnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdtb2RhbCBoaWRlJyk7XHJcbiAgICAgIHNlbGYuZGVzdHJveU1vZGFsKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgfTtcclxuXHRcclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2pzL2Rldi9wbS9tb2R1bGUvcG9EZXRhaWwuanNcbi8vIG1vZHVsZSBpZCA9IDEyOVxuLy8gbW9kdWxlIGNodW5rcyA9IDIgMyIsInZhciBqYWRlID0gcmVxdWlyZShcIkM6XFxcXF90ZW1wXFxcXHBjaHRcXFxcbm9kZV9tb2R1bGVzXFxcXGphZGVcXFxcbGliXFxcXHJ1bnRpbWUuanNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChkYXRhLCB1bmRlZmluZWQpIHtcbmJ1Zi5wdXNoKFwiPGRpdiBpZD1cXFwibW9kYWxcXFwiIHRhYmluZGV4PVxcXCItMVxcXCIgcm9sZT1cXFwiZGlhbG9nXFxcIiBhcmlhLWxhYmVsbGVkYnk9XFxcIm15TW9kYWxMYWJlbFxcXCIgYXJpYS1oaWRkZW49XFxcInRydWVcXFwiIGNsYXNzPVxcXCJtb2RhbCBmYWRlXFxcIj48ZGl2IHJvbGU9XFxcImRvY3VtZW50XFxcIiBjbGFzcz1cXFwibW9kYWwtZGlhbG9nXFxcIj48ZGl2IGNsYXNzPVxcXCJtb2RhbC1jb250ZW50XFxcIj48ZGl2IGNsYXNzPVxcXCJtb2RhbC1oZWFkZXJcXFwiPjxidXR0b24gaWQ9XFxcImNsb3NlLW1vZGFsLWNyb3NzLWJ0blxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBkYXRhLWRpc21pc3M9XFxcIm1vZGFsXFxcIiBhcmlhLWxhYmVsPVxcXCJDbG9zZVxcXCIgY2xhc3M9XFxcImNsb3NlXFxcIj48c3BhbiBhcmlhLWhpZGRlbj1cXFwidHJ1ZVxcXCI+w5c8L3NwYW4+PC9idXR0b24+PGg0IGlkPVxcXCJteU1vZGFsTGFiZWxcXFwiIGNsYXNzPVxcXCJtb2RhbC10aXRsZVxcXCI+0JTQtdGC0LDQu9GM0L3QviAtIFwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IGRhdGEucG9zdGFsQ29kZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiPC9oND48L2Rpdj48ZGl2IGNsYXNzPVxcXCJtb2RhbC1ib2R5XFxcIj48ZGl2IGNsYXNzPVxcXCJjYXJkXFxcIj48aDMgY2xhc3M9XFxcImNhcmQtaGVhZGVyXFxcIj5cIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBkYXRhLnBvc3RhbENvZGUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIjwvaDM+PGRpdiBjbGFzcz1cXFwiY2FyZC1ibG9ja1xcXCI+PGg0IGNsYXNzPVxcXCJjYXJkLXRpdGxlXFxcIj5cIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBkYXRhLnBvc3RhbENvZGUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIiBcIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBkYXRhLnNldHRsZW1lbnQpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIiBcIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBkYXRhLmFkZHJlc3NTb3VyY2UpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIjwvaDQ+PGRpdiBjbGFzcz1cXFwiY2FyZC10ZXh0XFxcIj48aDQ+0J/RgNC10LTQvtGB0YLQsNCy0LvRj9C10LzRi9C1INGD0YHQu9GD0LPQuDwvaDQ+PHVsPjwvdWw+XCIpO1xuLy8gaXRlcmF0ZSBkYXRhLnNlcnZpY2VHcm91cHNcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gZGF0YS5zZXJ2aWNlR3JvdXBzO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIgc2cgPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIjxsaT5cIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBzZy5zZXJ2aWNlR3JvdXBOYW1lKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCI8L2xpPlwiKTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBzZyA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGxpPlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IHNnLnNlcnZpY2VHcm91cE5hbWUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIjwvbGk+XCIpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG5idWYucHVzaChcIjxoND7QotC10LvQtdGE0L7QvdGLPC9oND48dWw+PC91bD5cIik7XG4vLyBpdGVyYXRlIGRhdGEucGhvbmVzXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IGRhdGEucGhvbmVzO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIgcGhvbmUgPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIjxsaT4gKFwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IHBob25lLnBob25lVG93bkNvZGUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIikgXCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gcGhvbmUucGhvbmVOdW1iZXIpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIiAoXCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gcGhvbmUucGhvbmVUeXBlTmFtZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiKTwvbGk+XCIpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIHBob25lID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8bGk+IChcIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBwaG9uZS5waG9uZVRvd25Db2RlKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCIpIFwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IHBob25lLnBob25lTnVtYmVyKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCIgKFwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IHBob25lLnBob25lVHlwZU5hbWUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIik8L2xpPlwiKTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxuYnVmLnB1c2goXCI8aDQ+0JLRgNC10LzRjyDRgNCw0LHQvtGC0YtcXHRcXHQ8L2g0Pjx1bD48L3VsPlwiKTtcbi8vIGl0ZXJhdGUgZGF0YS53b3JraW5nSG91cnNcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gZGF0YS53b3JraW5nSG91cnM7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciB3aCA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGxpPlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IHdoLndlZWtEYXlOYW1lKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCJcXHQ8L2xpPlwiKTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciB3aCA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGxpPlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IHdoLndlZWtEYXlOYW1lKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCJcXHQ8L2xpPlwiKTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxuYnVmLnB1c2goXCI8L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJtb2RhbC1mb290ZXJcXFwiPjxidXR0b24gaWQ9XFxcImNsb3NlLW1vZGFsLWJ0blxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBkYXRhLWRpc21pc3M9XFxcIm1vZGFsXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPkNsb3NlPC9idXR0b24+PC9kaXY+PC9kaXY+PC9kaXY+PC9kaXY+XCIpO30uY2FsbCh0aGlzLFwiZGF0YVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguZGF0YTp0eXBlb2YgZGF0YSE9PVwidW5kZWZpbmVkXCI/ZGF0YTp1bmRlZmluZWQsXCJ1bmRlZmluZWRcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnVuZGVmaW5lZDp0eXBlb2YgdW5kZWZpbmVkIT09XCJ1bmRlZmluZWRcIj91bmRlZmluZWQ6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy9qcy9kZXYvcG0vdmlldy9wb0RldGFpbC5qYWRlXG4vLyBtb2R1bGUgaWQgPSAxMzBcbi8vIG1vZHVsZSBjaHVua3MgPSAyIDMiLCIndXNlIHN0cmljdCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG5cclxuXHR0aGlzLnBsSmFkZSA9IHJlcXVpcmUoJy4uL3ZpZXcvcGF0aExpc3QuamFkZScpO1xyXG5cdHRoaXMuZWxKYWRlID0gcmVxdWlyZSgnLi4vdmlldy9saXN0RWwuamFkZScpO1xyXG5cdHRoaXMubmVzdGVkTGlzdEphZGUgPSByZXF1aXJlKCcuLi92aWV3L3N1Ymxpc3QuamFkZScpO1xyXG5cdHRoaXMucGRmSmFkZSA9IHJlcXVpcmUoJy4uL3ZpZXcvcGRmUGF0aExpc3QuamFkZScpO1xyXG5cdHRoaXMuZXZudERldGFpbEphZGUgPSByZXF1aXJlKCcuLi92aWV3L2VkaXRkZWxFdmVudC5qYWRlJyk7XHJcblx0dGhpcy55bWFwQ2VhdGVQYXRoID0ge307XHJcblx0dGhpcy5zZWxlY3RlZEVMID0gW107XHJcblxyXG5cdHZhciBzZWxmID0gdGhpcztcclxuXHJcblx0dGhpcy5pbml0ID0gZnVuY3Rpb24oeU1hcENyZWF0ZVBhdGgpIHtcclxuXHRcdCQoJy5sLXBsYWNlJykuaHRtbChzZWxmLnBsSmFkZSgpKTtcclxuXHRcdC8vc2VsZi5teU1hcD1teU1hcDtcclxuXHRcdHNlbGYueW1hcENlYXRlUGF0aCA9IHlNYXBDcmVhdGVQYXRoO1xyXG5cdFx0JCgnI2NsZWFyLXBsaXN0LWJ0bicpLm9uKCdjbGljaycsIHNlbGYucmVtb3ZlQWxsKTtcclxuXHRcdCQoJyNjcmVhdGUtcGF0aC1idG4nKS5vbignY2xpY2snLCBzZWxmLmNyZWF0ZVBhdGgpO1xyXG5cdFx0JCgnI3ByaW50LXBhdGgtYnRuJykub24oJ2NsaWNrJywgc2VsZi5wZGZQYXRoKTtcclxuXHJcblx0fTtcclxuXHJcblx0dGhpcy5hZGRFbGVtZW50ID0gZnVuY3Rpb24oZGF0YSkge1xyXG5cdFx0JCgnI3BhdGgtbGlzdCcpLmFwcGVuZChzZWxmLmVsSmFkZSh7XHJcblx0XHRcdFwiZGF0YVwiOiBkYXRhXHJcblx0XHR9KSk7XHJcblx0XHRzZWxmLnNlbGVjdGVkRUwucHVzaChkYXRhKTtcclxuXHRcdCQoJ1tkYXRhLXBvLWlkPScgKyBkYXRhLnBvc3RhbENvZGUgKyAnXScpLmNoaWxkcmVuKCcucmVtb3ZlLXBvLWxpc3QnKS5vbignY2xpY2snLCB7XHJcblx0XHRcdGVsZW1lbnQ6IGRhdGFcclxuXHRcdH0sIHNlbGYucmVtb3ZlRWxlbWVudCk7XHJcblx0XHRzZWxmLmxvYWRFdm50RGF0YShkYXRhKTtcclxuXHJcblx0fTtcclxuXHJcblx0dGhpcy5sb2FkRXZudERhdGEgPSBmdW5jdGlvbihfZGF0YSkge1xyXG5cdFx0dmFyIHJhcnIgPSBbXTtcclxuXHRcdCQuYWpheCh7XHJcblx0XHRcdHR5cGU6ICdHRVQnLFxyXG5cdFx0XHQvL3VybDogXCIuL3Rlc3RldmVudC5qc29uXCIsXHJcblx0XHRcdHVybDpcIi9ldm50L2V2bnQvXCIrX2RhdGEucG9zdGFsQ29kZSxcclxuXHRcdFx0ZGF0YVR5cGU6IFwianNvblwiLFxyXG5cdFx0XHRzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coJ3N1Y2Nlc3MgbG9hZCBkYXRhJyk7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdFx0X2RhdGEuZXZudHM9ZGF0YTtcclxuXHRcdFx0XHQkKCdbZGF0YS1wby1pZD0nICsgX2RhdGEucG9zdGFsQ29kZSArICddJykuZmluZCgnaS5mYS1zcGlubmVyJykucmVtb3ZlKCk7XHJcblx0XHRcdFx0JCgnW2RhdGEtcG8taWQ9JyArIF9kYXRhLnBvc3RhbENvZGUgKyAnXScpLmFwcGVuZChzZWxmLm5lc3RlZExpc3RKYWRlKHtcclxuXHRcdFx0XHRcdFx0XCJkYXRhXCI6IGRhdGFcclxuXHRcdFx0XHR9KSk7XHJcblx0XHRcdFx0JCgnW2RhdGEtcG8taWQ9JyArIF9kYXRhLnBvc3RhbENvZGUgKyAnXScpLm9uKCdjbGljaycsIHNlbGYubGlzdGVuRXZudCk7XHJcblx0XHRcdFx0LypyYXJyID0gZGF0YS5maWx0ZXIoZnVuY3Rpb24oZXZudCkge1xyXG5cdFx0XHRcdFx0aWYgKGV2bnQucG9zdGFsQ29kZSA9PSBfZGF0YS5wb3N0YWxDb2RlKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdF9kYXRhLmV2bnRzID0gcmFycjtcclxuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2cocmFycik7XHJcblx0XHRcdFx0XHQkKCdbZGF0YS1wby1pZD0nICsgX2RhdGEucG9zdGFsQ29kZSArICddJykuZmluZCgnaS5mYS1zcGlubmVyJykucmVtb3ZlKCk7XHJcblx0XHRcdFx0XHQkKCdbZGF0YS1wby1pZD0nICsgX2RhdGEucG9zdGFsQ29kZSArICddJykuYXBwZW5kKHNlbGYubmVzdGVkTGlzdEphZGUoe1xyXG5cdFx0XHRcdFx0XHRcImRhdGFcIjogcmFyclxyXG5cdFx0XHRcdFx0fSkpO1xyXG5cdFx0XHRcdFx0Ly8kKCcuZXZudC1saScpLmNoaWxkcmVuKCcuc2hvdy1ldm50LWRldGFpbCcpLm9uKCdjbGljaycsc2VsZi5zaG93RXZudERldGFpbCk7XHJcblx0XHRcdFx0XHQvLyQoJy5ldm50LWxpJykuY2hpbGRyZW4oJy5yZW1vdmUtZXZudC1saXN0Jykub24oJ2NsaWNrJyxzZWxmLnJlbW92ZUV2bnQpO1x0XHRcdFx0XHRcclxuXHRcdFx0XHRcdC8vJCgnW2RhdGEtcG8taWQ9JysgX2RhdGEucG9zdGFsQ29kZSsnXScpLm9uKCdjbGljaycsc2VsZi5zaG93RXZudERldGFpbCk7XHJcblx0XHRcdFx0XHQkKCdbZGF0YS1wby1pZD0nICsgX2RhdGEucG9zdGFsQ29kZSArICddJykub24oJ2NsaWNrJywgc2VsZi5saXN0ZW5Fdm50KTtcclxuXHRcdFx0XHR9LCAvKk1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDAwKSovIC8qMTApOyovXHJcblx0XHRcdH0sXHJcblx0XHRcdGVycm9yOiBmdW5jdGlvbihlcnIpIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZygn0L7RiNC40LHQutCwICgnKTtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhlcnIpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblxyXG5cdH07XHJcblx0dGhpcy5saXN0ZW5Fdm50ID0gZnVuY3Rpb24oZSkge1xyXG5cdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHR2YXIgdHlwZSA9IHRydWU7IC8vZGVsZXRlXHJcblx0XHRpZiAoJChlLnRhcmdldCkucGFyZW50KCkuaGFzQ2xhc3MoJ3Nob3ctZXZudC1kZXRhaWwnKSlcclxuXHRcdFx0dHlwZSA9IGZhbHNlOyAvLydzaG93LWRldGFpbCc7XHJcblxyXG5cdFx0dmFyIG9wID0gJChlLmN1cnJlbnRUYXJnZXQpLmF0dHIoJ2RhdGEtcG8taWQnKTtcclxuXHRcdHZhciBldm50SWQgPSAkKGUudGFyZ2V0KS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdkYXRhLWV2bnQtaWQnKTtcclxuXHRcdC8vY29uc29sZS5sb2coJChlLnRhcmdldCkucGFyZW50KCkuaGFzQ2xhc3MoJ3Nob3ctZXZudC1kZXRhaWwnKSk7XHJcblxyXG5cclxuXHRcdGZvciAodmFyIGkgPSBzZWxmLnNlbGVjdGVkRUwubGVuZ3RoOyBpLS07KSB7XHJcblx0XHRcdGlmIChzZWxmLnNlbGVjdGVkRUxbaV0ucG9zdGFsQ29kZSA9PSBvcCkge1xyXG5cdFx0XHRcdGZvciAodmFyIGogPSBzZWxmLnNlbGVjdGVkRUxbaV0uZXZudHMubGVuZ3RoOyBqLS07KSB7XHJcblx0XHRcdFx0XHRpZiAoc2VsZi5zZWxlY3RlZEVMW2ldLmV2bnRzW2pdLl9pZCA9PSBldm50SWQpIHtcclxuXHRcdFx0XHRcdFx0aWYgKHR5cGUpIHtcclxuXHRcdFx0XHRcdFx0XHRzZWxmLnNlbGVjdGVkRUxbaV0uZXZudHMuc3BsaWNlKGosIDEpO1xyXG5cdFx0XHRcdFx0XHRcdCQoZS50YXJnZXQpLnBhcmVudCgpLnBhcmVudCgpLnJlbW92ZSgpO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdHZhciBfZXZlbnQgPSBzZWxmLnNlbGVjdGVkRUxbaV0uZXZudHNbal07XHJcblx0XHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdFx0JCgnLm1vZGFsLXBsYWNlJykuaHRtbChzZWxmLmV2bnREZXRhaWxKYWRlKCkpO1xyXG5cdFx0XHRcdFx0XHRcdC8qJChcIi5mbGF0cGlja3JcIikuZmxhdHBpY2tyKHtcclxuXHRcdFx0XHRcdFx0XHRcdGVuYWJsZVRpbWU6IHRydWUsXHJcblx0XHRcdFx0XHRcdFx0fSk7Ki9cclxuXHJcblx0XHRcdFx0XHRcdFx0JCgnI21vZGFsJykubW9kYWwoJ3Nob3cnKTtcclxuXHRcdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdFx0XHQkKFwiI2RhdGViZWdpblwiKS5mbGF0cGlja3Ioe1xyXG5cdFx0XHRcdFx0XHRcdHV0YzogdHJ1ZSxcclxuXHRcdFx0XHRcdFx0XHRkZWZhdWx0RGF0ZTogbW9tZW50KF9ldmVudC5zdGFydCkuZm9ybWF0KCdZWVlZLU1NLUREIGhoOm1tJyksXHJcblx0XHRcdFx0XHRcdFx0ZW5hYmxlVGltZTogdHJ1ZSxcclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0XHQkKFwiI2RhdGVlbmRcIikuZmxhdHBpY2tyKHtcclxuXHRcdFx0XHRcdFx0XHR1dGM6IHRydWUsXHJcblx0XHRcdFx0XHRcdFx0ZGVmYXVsdERhdGU6IG1vbWVudChfZXZlbnQuZW5kKS5mb3JtYXQoJ1lZWVktTU0tREQgaGg6bW0nKSxcclxuXHRcdFx0XHRcdFx0XHRlbmFibGVUaW1lOiB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdFx0Ly9cdCQoJyNkYXRlYmVnaW4nKS52YWwobW9tZW50KF9ldmVudC5zdGFydCkuZm9ybWF0KCdZWVlZLU1NLUREIGhoOm1tJykpO1xyXG5cdFx0XHRcdFx0XHQvL1x0JCgnI2RhdGVlbmQnKS52YWwobW9tZW50KF9ldmVudC5lbmQpLmZvcm1hdCgnWVlZWS1NTS1ERCBoaDptbScpKTtcclxuXHRcdFx0XHRcdFx0XHQkKCcjZXZlbnQtdGl0bGUnKS52YWwoX2V2ZW50LnRpdGxlKTtcclxuXHRcdFx0XHRcdFx0XHQkKCcjcG9zdGNvZGUnKS52YWwoX2V2ZW50LnBvc3RhbENvZGUpO1xyXG5cdFx0XHRcdFx0XHRcdCQoJyNzdGF0dXMnKS52YWwoX2V2ZW50LnN0YXR1cyk7XHJcblx0XHRcdFx0XHRcdFx0JChcIiNkZXNjcmlwdGlvblwiKS52YWwoX2V2ZW50LmRlc2NyaXB0aW9uKTtcclxuXHRcdFx0XHRcdFx0XHQkKCcjZXhlY3V0b3InKS52YWwoX2V2ZW50LmV4ZWN1dG9yKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0JCgnI21vZGFsJykub24oJ2hpZGRlbi5icy5tb2RhbCcsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdtb2RhbCBoaWRlJyk7XHJcblx0XHRcdFx0XHRcdFx0XHRzZWxmLmRlc3Ryb3lNb2RhbCgpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHR9O1xyXG5cdHRoaXMuZGVzdHJveU1vZGFsID0gZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0Ly8kKFwiI3NhdmUtZXZlbnQtYnRuXCIpLm9mZignY2xpY2snKTtcclxuXHRcdCQoJyNjbG9zZS1tb2RhbC1idG4nKS5vZmYoJ2NsaWNrJyk7XHJcblx0XHQkKCcjY2xvc2UtbW9kYWwtY3Jvc3MtYnRuJykub2ZmKCdjbGljaycpO1xyXG5cdFx0Ly8kKCcjZGVsZXRlLWV2ZW50LWJ0bicpLm9mZigpO1xyXG5cdFx0JCgnLm1vZGFsLXBsYWNlJykuaHRtbCgnJyk7XHJcblx0fTtcclxuXHJcblx0dGhpcy5yZW1vdmVFbGVtZW50ID0gZnVuY3Rpb24oZSkge1xyXG5cdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdGZvciAodmFyIGkgPSBzZWxmLnNlbGVjdGVkRUwubGVuZ3RoOyBpLS07KSB7XHJcblx0XHRcdGlmIChzZWxmLnNlbGVjdGVkRUxbaV0ucG9zdGFsQ29kZSA9PSBlLmRhdGEuZWxlbWVudC5wb3N0YWxDb2RlKSB7XHJcblx0XHRcdFx0JChlLmN1cnJlbnRUYXJnZXQpLm9mZigpO1xyXG5cdFx0XHRcdCQoZS5jdXJyZW50VGFyZ2V0KS5wYXJlbnQoKS5yZW1vdmUoKTtcclxuXHRcdFx0XHQvLyQoJ1tkYXRhLWV2bnQtaWQ9JytlLmRhdGEuZWxlbWVudC5wb3N0YWxDb2RlKyddJykub2ZmKCk7XHJcblx0XHRcdFx0Ly8kKCdbZGF0YS1ldm50LWlkPScrZS5kYXRhLmVsZW1lbnQucG9zdGFsQ29kZSsnXScpLnJlbW92ZSgpO1xyXG5cdFx0XHRcdHNlbGYuc2VsZWN0ZWRFTC5zcGxpY2UoaSwgMSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0fTtcclxuXHR0aGlzLnJlbW92ZUFsbCA9IGZ1bmN0aW9uKGUpIHtcclxuXHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHQkKCcjcGF0aC1saXN0JykuaHRtbCgnJyk7XHJcblx0XHRzZWxmLnNlbGVjdGVkRUwgPSBbXTtcclxuXHR9O1xyXG5cclxuXHR0aGlzLmNyZWF0ZVBhdGggPSBmdW5jdGlvbigpIHtcclxuXHRcdHNlbGYueW1hcENlYXRlUGF0aChzZWxmLnNlbGVjdGVkRUwpO1xyXG5cdH07XHJcblxyXG5cdHRoaXMucGRmUGF0aCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIGRvY0RlZmluaXRpb24gPSBzZWxmLmNyZWF0ZUNvbnRlbnQoKTtcclxuXHRcdC8vdmFyIGRvY0RlZmluaXRpb24gPSBzZWxmLnBkZkphZGUoe1wiZGF0YVwiOnNlbGYuc2VsZWN0ZWRFTH0pO1xyXG5cdFx0cGRmTWFrZS5jcmVhdGVQZGYoZG9jRGVmaW5pdGlvbikub3BlbigpO1xyXG5cdH07XHJcblxyXG5cdHRoaXMuY3JlYXRlQ29udGVudCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIHVsYXJyID0gW107XHJcblx0XHRzZWxmLnNlbGVjdGVkRUwuZm9yRWFjaChmdW5jdGlvbihwbykge1xyXG5cdFx0XHR1bGFyci5wdXNoKHtcclxuXHRcdFx0XHR0ZXh0OiBwby5wb3N0YWxDb2RlXHJcblx0XHRcdH0pXHJcblx0XHRcdGlmIChwby5ldm50cy5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0dmFyIHN1bGFyciA9IFtdO1xyXG5cdFx0XHRcdHBvLmV2bnRzLmZvckVhY2goZnVuY3Rpb24oZXZuKSB7XHJcblx0XHRcdFx0XHRzdWxhcnIucHVzaCh7XHJcblx0XHRcdFx0XHRcdHRleHQ6IGV2bi50aXRsZVxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0dWxhcnIucHVzaCh7XHJcblx0XHRcdFx0XHR1bDogc3VsYXJyXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0dmFyIGNvYmogPSB7XHJcblx0XHRcdGNvbnRlbnQ6IFt7XHJcblx0XHRcdFx0dGV4dDogJ9Cb0LjRgdGCLdGB0L/QuNGB0L7QuiDQt9Cw0Y/QstC+0Log0Log0LjRgdC/0L7Qu9C90LXQvdC40Y4gKNGE0L7RgNC80LAg4oSWMdC70YEpJyxcclxuXHRcdFx0XHRzdHlsZTogJ2hlYWRlcidcclxuXHRcdFx0fSwge1xyXG5cdFx0XHRcdHVsOiB1bGFycixcclxuXHRcdFx0XHRzdHlsZTogJ2xpc3RzJ1xyXG5cdFx0XHR9XSxcclxuXHRcdFx0c3R5bGVzOiB7XHJcblx0XHRcdFx0aGVhZGVyOiB7XHJcblx0XHRcdFx0XHRmb250U2l6ZTogMTYsXHJcblx0XHRcdFx0XHRib2xkOiB0cnVlXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRsaXN0czoge1xyXG5cdFx0XHRcdFx0cGFkZGluZzogXCIxNXB4XCIsXHJcblx0XHRcdFx0XHRmb250U2l6ZTogMTRcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0XHRyZXR1cm4gY29iajtcclxuXHR9O1xyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvanMvZGV2L3BtL21vZHVsZS9wYXRoTGlzdC5qc1xuLy8gbW9kdWxlIGlkID0gMTMxXG4vLyBtb2R1bGUgY2h1bmtzID0gMiAzIiwidmFyIGphZGUgPSByZXF1aXJlKFwiQzpcXFxcX3RlbXBcXFxccGNodFxcXFxub2RlX21vZHVsZXNcXFxcamFkZVxcXFxsaWJcXFxccnVudGltZS5qc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcImNhcmRcXFwiPjxkaXYgY2xhc3M9XFxcImNhcmQtaGVhZGVyXFxcIj48dWwgY2xhc3M9XFxcIm5hdiBuYXYtcGlsbHMgY2FyZC1oZWFkZXItcGlsbHMgZmxvYXQteHMtbGVmdFxcXCI+PGxpIGNsYXNzPVxcXCJuYXYtaXRlbVxcXCI+PGEgaWQ9XFxcImNsZWFyLXBsaXN0LWJ0blxcXCIgaHJlZj1cXFwiI1xcXCIgY2xhc3M9XFxcIm5hdi1saW5rXFxcIj7QntGH0LjRgdGC0LjRgtGMPC9hPjwvbGk+PC91bD48L2Rpdj48ZGl2IGNsYXNzPVxcXCJjYXJkLWJsb2NrXFxcIj48aDQgY2xhc3M9XFxcImNhcmQtdGl0bGVcXFwiPiA8L2g0PjxkaXYgY2xhc3M9XFxcImNhcmQtdGV4dFxcXCI+PGg0PtCh0L/QuNGB0L7QulxcdDx1bCBpZD1cXFwicGF0aC1saXN0XFxcIiBjbGFzcz1cXFwibGlzdC1ncm91cFxcXCI+PC91bD48L2g0PjwvZGl2PjwhLS1pbnB1dCNleGVjZW1haWwuZm9ybS1jb250cm9sKHR5cGU9J2VtYWlsJyktLT48YSBpZD1cXFwiY3JlYXRlLXBhdGgtYnRuXFxcIiBocmVmPVxcXCIjXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1wcmltYXJ5XFxcIj7RgdC+0LfQtNCw0YLRjCDQvNCw0YDRiNGA0YPRgjwvYT48L2Rpdj48ZGl2IGNsYXNzPVxcXCJjYXJkLWZvb3RlciB0ZXh0LW11dGVkXFxcIj48YSBpZD1cXFwicHJpbnQtcGF0aC1idG5cXFwiIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJidG4gYnRuLXByaW1hcnlcXFwiPtC/0LXRh9Cw0YLQsNGC0Yw8L2E+PGEgaWQ9XFxcIm90aGVyLXBhdGgtYnRuXFxcIiBocmVmPVxcXCIjXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1kZWZhdWx0XFxcIj7QtdGJ0LUg0YfQtdCz0L4t0YLQvjwvYT48L2Rpdj48L2Rpdj5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy9qcy9kZXYvcG0vdmlldy9wYXRoTGlzdC5qYWRlXG4vLyBtb2R1bGUgaWQgPSAxMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAyIDMiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJDOlxcXFxfdGVtcFxcXFxwY2h0XFxcXG5vZGVfbW9kdWxlc1xcXFxqYWRlXFxcXGxpYlxcXFxydW50aW1lLmpzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAoZGF0YSkge1xuYnVmLnB1c2goXCI8bGlcIiArIChqYWRlLmF0dHIoXCJkYXRhLXBvLWlkXCIsICcnICsgKGRhdGEucG9zdGFsQ29kZSkgKyAnJywgdHJ1ZSwgdHJ1ZSkpICsgXCIgY2xhc3M9XFxcImxpc3QtZ3JvdXAtaXRlbSBsaXN0LWdyb3VwLWl0ZW0tYWN0aW9uXFxcIj5cIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBkYXRhLnBvc3RhbENvZGUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIjxhIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJyZW1vdmUtcG8tbGlzdFxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLXRyYXNoLW8gZmEtZndcXFwiPjwvaT48L2E+PGkgc3R5bGU9XFxcImZsb2F0OmxlZnRcXFwiIGNsYXNzPVxcXCJmYSBmYS1zcGlubmVyIGZhLXB1bHNlIGZhLWZ3XFxcIj48L2k+PC9saT5cIik7fS5jYWxsKHRoaXMsXCJkYXRhXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5kYXRhOnR5cGVvZiBkYXRhIT09XCJ1bmRlZmluZWRcIj9kYXRhOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvanMvZGV2L3BtL3ZpZXcvbGlzdEVsLmphZGVcbi8vIG1vZHVsZSBpZCA9IDEzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDIgMyIsInZhciBqYWRlID0gcmVxdWlyZShcIkM6XFxcXF90ZW1wXFxcXHBjaHRcXFxcbm9kZV9tb2R1bGVzXFxcXGphZGVcXFxcbGliXFxcXHJ1bnRpbWUuanNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChkYXRhLCB1bmRlZmluZWQpIHtcbmJ1Zi5wdXNoKFwiPHVsPlwiKTtcbi8vIGl0ZXJhdGUgZGF0YVxuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSBkYXRhO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIgZXZudCA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGxpXCIgKyAoamFkZS5hdHRyKFwiZGF0YS1ldm50LWlkXCIsICcnICsgKGV2bnQuX2lkKSArICcnLCB0cnVlLCB0cnVlKSkgKyBcIiBjbGFzcz1cXFwiZXZudC1saVxcXCI+XCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gZXZudC50aXRsZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiPGEgaHJlZj1cXFwiI1xcXCIgY2xhc3M9XFxcInNob3ctZXZudC1kZXRhaWxcXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1zZWFyY2ggZmEtZndcXFwiPjwvaT48L2E+PGEgaHJlZj1cXFwiI1xcXCIgY2xhc3M9XFxcInJlbW92ZS1ldm50LWxpc3RcXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS10cmFzaC1vIGZhLWZ3XFxcIj48L2k+PC9hPjwvbGk+XCIpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIGV2bnQgPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIjxsaVwiICsgKGphZGUuYXR0cihcImRhdGEtZXZudC1pZFwiLCAnJyArIChldm50Ll9pZCkgKyAnJywgdHJ1ZSwgdHJ1ZSkpICsgXCIgY2xhc3M9XFxcImV2bnQtbGlcXFwiPlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IGV2bnQudGl0bGUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIjxhIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJzaG93LWV2bnQtZGV0YWlsXFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtc2VhcmNoIGZhLWZ3XFxcIj48L2k+PC9hPjxhIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJyZW1vdmUtZXZudC1saXN0XFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtdHJhc2gtbyBmYS1md1xcXCI+PC9pPjwvYT48L2xpPlwiKTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxuYnVmLnB1c2goXCI8L3VsPlwiKTt9LmNhbGwodGhpcyxcImRhdGFcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmRhdGE6dHlwZW9mIGRhdGEhPT1cInVuZGVmaW5lZFwiP2RhdGE6dW5kZWZpbmVkLFwidW5kZWZpbmVkXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC51bmRlZmluZWQ6dHlwZW9mIHVuZGVmaW5lZCE9PVwidW5kZWZpbmVkXCI/dW5kZWZpbmVkOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvanMvZGV2L3BtL3ZpZXcvc3VibGlzdC5qYWRlXG4vLyBtb2R1bGUgaWQgPSAxMzRcbi8vIG1vZHVsZSBjaHVua3MgPSAyIDMiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJDOlxcXFxfdGVtcFxcXFxwY2h0XFxcXG5vZGVfbW9kdWxlc1xcXFxqYWRlXFxcXGxpYlxcXFxydW50aW1lLmpzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAoZGF0YSwgdW5kZWZpbmVkKSB7XG4vLyBpdGVyYXRlIGRhdGFcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gZGF0YTtcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIHBvID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCJcIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBwby5wb3N0YWxDb2RlKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCIgXFxcXGJyXCIpO1xuaWYgKHBvLmV2bnRzLmxlbmd0aD4wKVxue1xuLy8gaXRlcmF0ZSBwby5ldm50c1xuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSBwby5ldm50cztcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGV2bnQgPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IGV2bnQudGl0bGUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIiBcXFxcYnJcIik7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIgZXZudCA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiXCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gZXZudC50aXRsZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiIFxcXFxiclwiKTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxufVxuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIHBvID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCJcIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBwby5wb3N0YWxDb2RlKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCIgXFxcXGJyXCIpO1xuaWYgKHBvLmV2bnRzLmxlbmd0aD4wKVxue1xuLy8gaXRlcmF0ZSBwby5ldm50c1xuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSBwby5ldm50cztcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGV2bnQgPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IGV2bnQudGl0bGUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIiBcXFxcYnJcIik7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIgZXZudCA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiXCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gZXZudC50aXRsZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiIFxcXFxiclwiKTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxufVxuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xufS5jYWxsKHRoaXMsXCJkYXRhXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5kYXRhOnR5cGVvZiBkYXRhIT09XCJ1bmRlZmluZWRcIj9kYXRhOnVuZGVmaW5lZCxcInVuZGVmaW5lZFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgudW5kZWZpbmVkOnR5cGVvZiB1bmRlZmluZWQhPT1cInVuZGVmaW5lZFwiP3VuZGVmaW5lZDp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2pzL2Rldi9wbS92aWV3L3BkZlBhdGhMaXN0LmphZGVcbi8vIG1vZHVsZSBpZCA9IDEzNVxuLy8gbW9kdWxlIGNodW5rcyA9IDIgMyIsInZhciBqYWRlID0gcmVxdWlyZShcIkM6XFxcXF90ZW1wXFxcXHBjaHRcXFxcbm9kZV9tb2R1bGVzXFxcXGphZGVcXFxcbGliXFxcXHJ1bnRpbWUuanNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8ZGl2IGlkPVxcXCJtb2RhbFxcXCIgdGFiaW5kZXg9XFxcIi0xXFxcIiByb2xlPVxcXCJkaWFsb2dcXFwiIGFyaWEtbGFiZWxsZWRieT1cXFwibXlNb2RhbExhYmVsXFxcIiBhcmlhLWhpZGRlbj1cXFwidHJ1ZVxcXCIgY2xhc3M9XFxcIm1vZGFsIGZhZGVcXFwiPjxkaXYgcm9sZT1cXFwiZG9jdW1lbnRcXFwiIGNsYXNzPVxcXCJtb2RhbC1kaWFsb2dcXFwiPjxkaXYgY2xhc3M9XFxcIm1vZGFsLWNvbnRlbnRcXFwiPjxkaXYgY2xhc3M9XFxcIm1vZGFsLWhlYWRlclxcXCI+PGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGRhdGEtZGlzbWlzcz1cXFwibW9kYWxcXFwiIGFyaWEtbGFiZWw9XFxcIkNsb3NlXFxcIiBjbGFzcz1cXFwiY2xvc2VcXFwiPjxzcGFuIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIj7Dlzwvc3Bhbj48L2J1dHRvbj48aDQgaWQ9XFxcIm15TW9kYWxMYWJlbFxcXCIgY2xhc3M9XFxcIm1vZGFsLXRpdGxlXFxcIj7QoNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNC1L9GD0LTQsNC70LXQvdC40LU8L2g0PjwvZGl2PjxkaXYgY2xhc3M9XFxcIm1vZGFsLWJvZHlcXFwiPjxmb3JtIGFjdGlvbj1cXFwiXFxcIj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj48bGFiZWwgZm9yPVxcXCJcXFwiPtC30LDQs9C+0LvQvtCy0L7QujwvbGFiZWw+PGlucHV0IGlkPVxcXCJldmVudC10aXRsZVxcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7QvdCw0YfQsNC70L48L2xhYmVsPjxpbnB1dCBpZD1cXFwiZGF0ZWJlZ2luXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sIGZsYXRwaWNrclxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7QvtC60L7QvdGH0LDQvdC40LU8L2xhYmVsPjxpbnB1dCBpZD1cXFwiZGF0ZWVuZFxcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbCBmbGF0cGlja3JcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0L7RgtC00LXQu9C10L3QuNC1INC/0L7Qu9GD0YfQsNGC0LXQu9GMPC9sYWJlbD48aW5wdXQgaWQ9XFxcInBvc3Rjb2RlXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj48bGFiZWwgZm9yPVxcXCJcXFwiPtC+0L/QuNGB0LDQvdC40LU8L2xhYmVsPjxpbnB1dCBpZD1cXFwiZGVzY3JpcHRpb25cXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0YHRgtCw0YLRg9GBPC9sYWJlbD48aW5wdXQgaWQ9XFxcInN0YXR1c1xcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7QuNGB0L/QvtC70L3QuNGC0LXQu9GMPC9sYWJlbD48aW5wdXQgaWQ9XFxcImV4ZWN1dG9yXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIj48L2Rpdj48L2Zvcm0+PC9kaXY+PGRpdiBjbGFzcz1cXFwibW9kYWwtZm9vdGVyXFxcIj48YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgZGF0YS1kaXNtaXNzPVxcXCJtb2RhbFxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj5DbG9zZTwvYnV0dG9uPjwhLS1idXR0b24jc2F2ZS1ldmVudC1idG4uYnRuLmJ0bi1wcmltYXJ5KHR5cGU9J2J1dHRvbicpIFNhdmUgY2hhbmdlcy0tPjwhLS1idXR0b24jZGVsZXRlLWV2ZW50LWJ0bi5idG4uYnRuLWRhbmdlcih0eXBlPSdidXR0b24nKSBEZWxldGUtLT48L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy9qcy9kZXYvcG0vdmlldy9lZGl0ZGVsRXZlbnQuamFkZVxuLy8gbW9kdWxlIGlkID0gMTM2XG4vLyBtb2R1bGUgY2h1bmtzID0gMiAzIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHJcblx0dGhpcy5fbW9kYWwgPSByZXF1aXJlKCcuLi92aWV3L25ld0V2ZW50LmphZGUnKTtcclxuXHJcblx0dGhpcy5kZXN0cm95TW9kYWwgPSBmdW5jdGlvbigpIHtcclxuXHJcblx0XHQkKFwiI3NhdmUtZXZlbnQtYnRuXCIpLm9mZignY2xpY2snKTtcclxuXHRcdCQoJyNjbG9zZS1tb2RhbC1idG4nKS5vZmYoJ2NsaWNrJyk7XHJcblx0XHQkKCcjY2xvc2UtbW9kYWwtY3Jvc3MtYnRuJykub2ZmKCdjbGljaycpO1xyXG5cdFx0JCgnLm1vZGFsLXBsYWNlJykuaHRtbCgnJyk7XHJcblx0fTtcclxuXHJcblx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuXHR0aGlzLmluaXQgPSBmdW5jdGlvbigpIHtcclxuXHJcblx0XHQkKCcubW9kYWwtcGxhY2UnKS5odG1sKHRoaXMuX21vZGFsKCkpO1xyXG5cdFx0JChcIi5mbGF0cGlja3JcIikuZmxhdHBpY2tyKHtcclxuXHRcdFx0ZW5hYmxlVGltZTogdHJ1ZSxcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoXCIjc2F2ZS1ldmVudC1idG5cIikub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuXHRcdFx0dmFyIG11bHRpID0gJCgnI3Bvc3Rjb2RlJykudmFsKCkuc3BsaXQoXCI7XCIpO1xyXG5cdFx0XHRpZiAobXVsdGkubGVuZ3RoID4gMSkge1xyXG5cdFx0XHRcdHZhciBldm50cyA9IFtdO1xyXG5cdFx0XHRcdG11bHRpLmZvckVhY2goZnVuY3Rpb24ocG9Db2RlKSB7XHJcblx0XHRcdFx0XHR2YXIgZXZudCA9IHtcclxuXHRcdFx0XHRcdFx0dGl0bGU6ICQoJyNldmVudC10aXRsZScpLnZhbCgpLFxyXG5cdFx0XHRcdFx0XHRzdGFydDogbW9tZW50KCQoJyNkYXRlYmVnaW4nKS52YWwoKSksXHJcblx0XHRcdFx0XHRcdGVuZDogbW9tZW50KCQoJyNkYXRlZW5kJykudmFsKCkpLFxyXG5cdFx0XHRcdFx0XHRwb3N0YWxDb2RlOiBwb0NvZGUsXHJcblx0XHRcdFx0XHRcdHN0YXR1czogJCgnI3N0YXR1cycpLnZhbCgpLFxyXG5cdFx0XHRcdFx0XHRkZXNjcmlwdGlvbjogJChcIiNkZXNjcmlwdGlvblwiKS52YWwoKSxcclxuXHRcdFx0XHRcdFx0ZXhlY3V0b3I6ICQoJyNleGVjdXRvcicpLnZhbCgpXHJcblx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRldm50cy5wdXNoKGV2bnQpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdCQuYWpheCh7XHJcblx0XHRcdFx0XHR0eXBlOiAnUE9TVCcsXHJcblx0XHRcdFx0XHR1cmw6ICcvZXZudC9zYXZlL211bHRpJyxcclxuXHRcdFx0XHRcdGRhdGE6IEpTT04uc3RyaW5naWZ5KGV2bnRzKSxcclxuXHRcdFx0XHRcdGRhdGFUeXBlOiBcImpzb25cIixcclxuXHRcdFx0XHRcdGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coXCJkYXRhIHNhdmVcIik7XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0Ly9lcnJvcjogYWpheEVycm9yXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0dmFyIGV2bnQgPSB7XHJcblx0XHRcdFx0XHR0aXRsZTogJCgnI2V2ZW50LXRpdGxlJykudmFsKCksXHJcblx0XHRcdFx0XHRzdGFydDogbW9tZW50KCQoJyNkYXRlYmVnaW4nKS52YWwoKSksXHJcblx0XHRcdFx0XHRlbmQ6IG1vbWVudCgkKCcjZGF0ZWVuZCcpLnZhbCgpKSxcclxuXHRcdFx0XHRcdHBvc3RhbENvZGU6ICQoJyNwb3N0Y29kZScpLnZhbCgpLFxyXG5cdFx0XHRcdFx0c3RhdHVzOiAkKCcjc3RhdHVzJykudmFsKCksXHJcblx0XHRcdFx0XHRkZXNjcmlwdGlvbjogJChcIiNkZXNjcmlwdGlvblwiKS52YWwoKSxcclxuXHRcdFx0XHRcdGV4ZWN1dG9yOiAkKCcjZXhlY3V0b3InKS52YWwoKVxyXG5cdFx0XHRcdH07XHJcblx0XHRcdFx0Y29uc29sZS5sb2coXCJhZGQgZXZlbnRcIik7XHJcblx0XHRcdFx0Ly8kKCcjY2FsZW5kYXInKS5mdWxsQ2FsZW5kYXIoJ3JlbmRlckV2ZW50JywgZXZudCwgdHJ1ZSk7XHJcblxyXG5cdFx0XHRcdCQuYWpheCh7XHJcblx0XHRcdFx0XHR0eXBlOiAnUE9TVCcsXHJcblx0XHRcdFx0XHR1cmw6ICcvZXZudC9zYXZlJyxcclxuXHRcdFx0XHRcdGRhdGE6IEpTT04uc3RyaW5naWZ5KGV2bnQpLFxyXG5cdFx0XHRcdFx0ZGF0YVR5cGU6IFwianNvblwiLFxyXG5cdFx0XHRcdFx0Y29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG5cdFx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhcImRhdGEgc2F2ZVwiKTtcclxuXHRcdFx0XHRcdFx0Ly92YXIgZXZudEFycmF5ID0gJCgnI2NhbGVuZGFyJykuZnVsbENhbGVuZGFyKCdjbGllbnRFdmVudHMnKTtcclxuXHRcdFx0XHRcdFx0Ly92YXIgX2V2bnQgPSBldm50QXJyYXlbZXZudEFycmF5Lmxlbmd0aCAtIDFdO1xyXG5cdFx0XHRcdFx0XHQvL1x0X2V2bnQuX2lkID0gZGF0YS5pbnNlcnRlZGlkO1xyXG5cclxuXHRcdFx0XHRcdFx0Ly9cdCQoJyNjYWxlbmRhcicpLmZ1bGxDYWxlbmRhcigndXBkYXRlRXZlbnQnLCBfZXZudCk7XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0Ly9lcnJvcjogYWpheEVycm9yXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHJcblxyXG5cdFx0fSk7XHJcblxyXG5cdFx0JCgnI2Nsb3NlLW1vZGFsLWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcblx0XHR9KTtcclxuXHJcblx0XHQkKCcjY2xvc2UtbW9kYWwtY3Jvc3MtYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoJyNtb2RhbCcpLm1vZGFsKCdzaG93Jyk7XHJcblxyXG5cdFx0Ly8kKCcjZGF0ZWJlZ2luJykudmFsKHN0YXJ0LmZvcm1hdCgnWVlZWS1NTS1ERCBoaDptbScpKTtcclxuXHRcdC8vJCgnI2RhdGVlbmQnKS52YWwoZW5kLmZvcm1hdCgnWVlZWS1NTS1ERCBoaDptbScpKTtcclxuXHJcblx0XHQkKCcjbW9kYWwnKS5vbignaGlkZGVuLmJzLm1vZGFsJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRjb25zb2xlLmxvZygnbW9kYWwgaGlkZScpO1xyXG5cdFx0XHRzZWxmLmRlc3Ryb3lNb2RhbCgpO1xyXG5cdFx0fSk7XHJcblxyXG5cdH07XHJcbn1cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvanMvZGV2L3BtL21vZHVsZS9uZXdFdmVudC5qc1xuLy8gbW9kdWxlIGlkID0gMTM3XG4vLyBtb2R1bGUgY2h1bmtzID0gMiAzIiwidmFyIGphZGUgPSByZXF1aXJlKFwiQzpcXFxcX3RlbXBcXFxccGNodFxcXFxub2RlX21vZHVsZXNcXFxcamFkZVxcXFxsaWJcXFxccnVudGltZS5qc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIjxkaXYgaWQ9XFxcIm1vZGFsXFxcIiB0YWJpbmRleD1cXFwiLTFcXFwiIHJvbGU9XFxcImRpYWxvZ1xcXCIgYXJpYS1sYWJlbGxlZGJ5PVxcXCJteU1vZGFsTGFiZWxcXFwiIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIiBjbGFzcz1cXFwibW9kYWwgZmFkZVxcXCI+PGRpdiByb2xlPVxcXCJkb2N1bWVudFxcXCIgY2xhc3M9XFxcIm1vZGFsLWRpYWxvZ1xcXCI+PGRpdiBjbGFzcz1cXFwibW9kYWwtY29udGVudFxcXCI+PGRpdiBjbGFzcz1cXFwibW9kYWwtaGVhZGVyXFxcIj48YnV0dG9uIGlkPVxcXCJjbG9zZS1tb2RhbC1jcm9zcy1idG5cXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgZGF0YS1kaXNtaXNzPVxcXCJtb2RhbFxcXCIgYXJpYS1sYWJlbD1cXFwiQ2xvc2VcXFwiIGNsYXNzPVxcXCJjbG9zZVxcXCI+PHNwYW4gYXJpYS1oaWRkZW49XFxcInRydWVcXFwiPsOXPC9zcGFuPjwvYnV0dG9uPjxoNCBpZD1cXFwibXlNb2RhbExhYmVsXFxcIiBjbGFzcz1cXFwibW9kYWwtdGl0bGVcXFwiPtCh0L7Qt9C00LDQvdC40LU8L2g0PjwvZGl2PjxkaXYgY2xhc3M9XFxcIm1vZGFsLWJvZHlcXFwiPjxmb3JtIGFjdGlvbj1cXFwiXFxcIj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj48bGFiZWwgZm9yPVxcXCJcXFwiPtC30LDQs9C+0LvQvtCy0L7QujwvbGFiZWw+PGlucHV0IGlkPVxcXCJldmVudC10aXRsZVxcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7QvdCw0YfQsNC70L48L2xhYmVsPjxpbnB1dCBpZD1cXFwiZGF0ZWJlZ2luXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sIGZsYXRwaWNrclxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7QvtC60L7QvdGH0LDQvdC40LU8L2xhYmVsPjxpbnB1dCBpZD1cXFwiZGF0ZWVuZFxcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbCBmbGF0cGlja3JcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0L7RgtC00LXQu9C10L3QuNC1INC/0L7Qu9GD0YfQsNGC0LXQu9GMPC9sYWJlbD48aW5wdXQgaWQ9XFxcInBvc3Rjb2RlXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj48bGFiZWwgZm9yPVxcXCJcXFwiPtC+0L/QuNGB0LDQvdC40LU8L2xhYmVsPjxpbnB1dCBpZD1cXFwiZGVzY3JpcHRpb25cXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0YHRgtCw0YLRg9GBPC9sYWJlbD48aW5wdXQgaWQ9XFxcInN0YXR1c1xcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7QuNGB0L/QvtC70L3QuNGC0LXQu9GMPC9sYWJlbD48aW5wdXQgaWQ9XFxcImV4ZWN1dG9yXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIj48L2Rpdj48L2Zvcm0+PC9kaXY+PGRpdiBjbGFzcz1cXFwibW9kYWwtZm9vdGVyXFxcIj48YnV0dG9uIGlkPVxcXCJjbG9zZS1tb2RhbC1idG5cXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgZGF0YS1kaXNtaXNzPVxcXCJtb2RhbFxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj5DbG9zZTwvYnV0dG9uPjxidXR0b24gaWQ9XFxcInNhdmUtZXZlbnQtYnRuXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXByaW1hcnlcXFwiPlNhdmUgY2hhbmdlczwvYnV0dG9uPjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2PlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2pzL2Rldi9wbS92aWV3L25ld0V2ZW50LmphZGVcbi8vIG1vZHVsZSBpZCA9IDEzOFxuLy8gbW9kdWxlIGNodW5rcyA9IDIgMyJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDclBBOzs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDeE1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3pOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMvRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzdHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Iiwic291cmNlUm9vdCI6IiJ9