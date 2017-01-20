webpackJsonp([3],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	//module.exports = function() {
	console.log('hi phase2 codename');


	$(document).ready(function() {	

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

/***/ 126:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	module.exports = function() {
		console.log('map4p.js');

		var _mapjade = __webpack_require__(127);
		$('.c-place').html(_mapjade());

		var _podetail = __webpack_require__(128);
		var poDetail = new _podetail();

		var _pathList = __webpack_require__(130);
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
					url: '/users/mr',
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

/***/ 130:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, moment) {'use strict';

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
						url: '/users/save/multi',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGhhc2UyYXBwLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2Rldi9wbS9waGFzZTJhcHAuanMiLCJ3ZWJwYWNrOi8vLy4vfi9qYWRlL2xpYi9ydW50aW1lLmpzIiwid2VicGFjazovLy9mcyAoaWdub3JlZCkiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2Rldi9wbS9tb2R1bGUvbWFwNHAuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2Rldi9wbS92aWV3L21hcC5qYWRlIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9kZXYvcG0vbW9kdWxlL3BvRGV0YWlsLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9kZXYvcG0vdmlldy9wb0RldGFpbC5qYWRlIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9kZXYvcG0vbW9kdWxlL3BhdGhMaXN0LmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9kZXYvcG0vdmlldy9wYXRoTGlzdC5qYWRlIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9kZXYvcG0vdmlldy9saXN0RWwuamFkZSIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3BtL3ZpZXcvc3VibGlzdC5qYWRlIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9kZXYvcG0vdmlldy9wZGZQYXRoTGlzdC5qYWRlIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9kZXYvcG0vdmlldy9lZGl0ZGVsRXZlbnQuamFkZSIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3BtL21vZHVsZS9uZXdFdmVudC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3BtL3ZpZXcvbmV3RXZlbnQuamFkZSJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8vbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbmNvbnNvbGUubG9nKCdoaSBwaGFzZTIgY29kZW5hbWUnKTtcblxuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcdFxuXG5cdHZhciBteU1hcD1yZXF1aXJlKCcuL21vZHVsZS9tYXA0cC5qcycpO1x0XG5cdHltYXBzLnJlYWR5KGluaXQpO1xuXHR2YXIgX215TWFwO1xuXHR2YXIgbmV2bnQ9cmVxdWlyZSgnLi9tb2R1bGUvbmV3RXZlbnQuanMnKTtcblxuXHRmdW5jdGlvbiBpbml0KCkge1xuXHRcdFxuXHRcdF9teU1hcD1teU1hcCgpO1xuXG5cdFx0JCgnI21hcC1sb2FkLWxpbmsnKS5jbGljayhmdW5jdGlvbigpe1xuXHRcdFx0X215TWFwLmRlc3Ryb3koKTtcblx0XHRcdF9teU1hcD1udWxsO1xuXHRcdFx0X215TWFwPW15TWFwKCk7XG5cblx0XHR9KTtcblxuXHRcdCQoJyNuZXctZXZudC1saW5rJykuY2xpY2soZnVuY3Rpb24oZSl7XG5cdFx0XHR2YXIgX25ldm50PSBuZXcgbmV2bnQoKTtcblx0XHRcdF9uZXZudC5pbml0KCk7XG5cdFx0fSk7XG5cdH1cblxuXG5cbn0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2pzL2Rldi9wbS9waGFzZTJhcHAuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAzIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIE1lcmdlIHR3byBhdHRyaWJ1dGUgb2JqZWN0cyBnaXZpbmcgcHJlY2VkZW5jZVxuICogdG8gdmFsdWVzIGluIG9iamVjdCBgYmAuIENsYXNzZXMgYXJlIHNwZWNpYWwtY2FzZWRcbiAqIGFsbG93aW5nIGZvciBhcnJheXMgYW5kIG1lcmdpbmcvam9pbmluZyBhcHByb3ByaWF0ZWx5XG4gKiByZXN1bHRpbmcgaW4gYSBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGFcbiAqIEBwYXJhbSB7T2JqZWN0fSBiXG4gKiBAcmV0dXJuIHtPYmplY3R9IGFcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMubWVyZ2UgPSBmdW5jdGlvbiBtZXJnZShhLCBiKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgdmFyIGF0dHJzID0gYVswXTtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGF0dHJzID0gbWVyZ2UoYXR0cnMsIGFbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gYXR0cnM7XG4gIH1cbiAgdmFyIGFjID0gYVsnY2xhc3MnXTtcbiAgdmFyIGJjID0gYlsnY2xhc3MnXTtcblxuICBpZiAoYWMgfHwgYmMpIHtcbiAgICBhYyA9IGFjIHx8IFtdO1xuICAgIGJjID0gYmMgfHwgW107XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGFjKSkgYWMgPSBbYWNdO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShiYykpIGJjID0gW2JjXTtcbiAgICBhWydjbGFzcyddID0gYWMuY29uY2F0KGJjKS5maWx0ZXIobnVsbHMpO1xuICB9XG5cbiAgZm9yICh2YXIga2V5IGluIGIpIHtcbiAgICBpZiAoa2V5ICE9ICdjbGFzcycpIHtcbiAgICAgIGFba2V5XSA9IGJba2V5XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYTtcbn07XG5cbi8qKlxuICogRmlsdGVyIG51bGwgYHZhbGBzLlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbnVsbHModmFsKSB7XG4gIHJldHVybiB2YWwgIT0gbnVsbCAmJiB2YWwgIT09ICcnO1xufVxuXG4vKipcbiAqIGpvaW4gYXJyYXkgYXMgY2xhc3Nlcy5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmpvaW5DbGFzc2VzID0gam9pbkNsYXNzZXM7XG5mdW5jdGlvbiBqb2luQ2xhc3Nlcyh2YWwpIHtcbiAgcmV0dXJuIChBcnJheS5pc0FycmF5KHZhbCkgPyB2YWwubWFwKGpvaW5DbGFzc2VzKSA6XG4gICAgKHZhbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0JykgPyBPYmplY3Qua2V5cyh2YWwpLmZpbHRlcihmdW5jdGlvbiAoa2V5KSB7IHJldHVybiB2YWxba2V5XTsgfSkgOlxuICAgIFt2YWxdKS5maWx0ZXIobnVsbHMpLmpvaW4oJyAnKTtcbn1cblxuLyoqXG4gKiBSZW5kZXIgdGhlIGdpdmVuIGNsYXNzZXMuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gY2xhc3Nlc1xuICogQHBhcmFtIHtBcnJheS48Qm9vbGVhbj59IGVzY2FwZWRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5jbHMgPSBmdW5jdGlvbiBjbHMoY2xhc3NlcywgZXNjYXBlZCkge1xuICB2YXIgYnVmID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY2xhc3Nlcy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChlc2NhcGVkICYmIGVzY2FwZWRbaV0pIHtcbiAgICAgIGJ1Zi5wdXNoKGV4cG9ydHMuZXNjYXBlKGpvaW5DbGFzc2VzKFtjbGFzc2VzW2ldXSkpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYnVmLnB1c2goam9pbkNsYXNzZXMoY2xhc3Nlc1tpXSkpO1xuICAgIH1cbiAgfVxuICB2YXIgdGV4dCA9IGpvaW5DbGFzc2VzKGJ1Zik7XG4gIGlmICh0ZXh0Lmxlbmd0aCkge1xuICAgIHJldHVybiAnIGNsYXNzPVwiJyArIHRleHQgKyAnXCInO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAnJztcbiAgfVxufTtcblxuXG5leHBvcnRzLnN0eWxlID0gZnVuY3Rpb24gKHZhbCkge1xuICBpZiAodmFsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHZhbCkubWFwKGZ1bmN0aW9uIChzdHlsZSkge1xuICAgICAgcmV0dXJuIHN0eWxlICsgJzonICsgdmFsW3N0eWxlXTtcbiAgICB9KS5qb2luKCc7Jyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHZhbDtcbiAgfVxufTtcbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBhdHRyaWJ1dGUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICogQHBhcmFtIHtTdHJpbmd9IHZhbFxuICogQHBhcmFtIHtCb29sZWFufSBlc2NhcGVkXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHRlcnNlXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuYXR0ciA9IGZ1bmN0aW9uIGF0dHIoa2V5LCB2YWwsIGVzY2FwZWQsIHRlcnNlKSB7XG4gIGlmIChrZXkgPT09ICdzdHlsZScpIHtcbiAgICB2YWwgPSBleHBvcnRzLnN0eWxlKHZhbCk7XG4gIH1cbiAgaWYgKCdib29sZWFuJyA9PSB0eXBlb2YgdmFsIHx8IG51bGwgPT0gdmFsKSB7XG4gICAgaWYgKHZhbCkge1xuICAgICAgcmV0dXJuICcgJyArICh0ZXJzZSA/IGtleSA6IGtleSArICc9XCInICsga2V5ICsgJ1wiJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH0gZWxzZSBpZiAoMCA9PSBrZXkuaW5kZXhPZignZGF0YScpICYmICdzdHJpbmcnICE9IHR5cGVvZiB2YWwpIHtcbiAgICBpZiAoSlNPTi5zdHJpbmdpZnkodmFsKS5pbmRleE9mKCcmJykgIT09IC0xKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1NpbmNlIEphZGUgMi4wLjAsIGFtcGVyc2FuZHMgKGAmYCkgaW4gZGF0YSBhdHRyaWJ1dGVzICcgK1xuICAgICAgICAgICAgICAgICAgICd3aWxsIGJlIGVzY2FwZWQgdG8gYCZhbXA7YCcpO1xuICAgIH07XG4gICAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsLnRvSVNPU3RyaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0phZGUgd2lsbCBlbGltaW5hdGUgdGhlIGRvdWJsZSBxdW90ZXMgYXJvdW5kIGRhdGVzIGluICcgK1xuICAgICAgICAgICAgICAgICAgICdJU08gZm9ybSBhZnRlciAyLjAuMCcpO1xuICAgIH1cbiAgICByZXR1cm4gJyAnICsga2V5ICsgXCI9J1wiICsgSlNPTi5zdHJpbmdpZnkodmFsKS5yZXBsYWNlKC8nL2csICcmYXBvczsnKSArIFwiJ1wiO1xuICB9IGVsc2UgaWYgKGVzY2FwZWQpIHtcbiAgICBpZiAodmFsICYmIHR5cGVvZiB2YWwudG9JU09TdHJpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnNvbGUud2FybignSmFkZSB3aWxsIHN0cmluZ2lmeSBkYXRlcyBpbiBJU08gZm9ybSBhZnRlciAyLjAuMCcpO1xuICAgIH1cbiAgICByZXR1cm4gJyAnICsga2V5ICsgJz1cIicgKyBleHBvcnRzLmVzY2FwZSh2YWwpICsgJ1wiJztcbiAgfSBlbHNlIHtcbiAgICBpZiAodmFsICYmIHR5cGVvZiB2YWwudG9JU09TdHJpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnNvbGUud2FybignSmFkZSB3aWxsIHN0cmluZ2lmeSBkYXRlcyBpbiBJU08gZm9ybSBhZnRlciAyLjAuMCcpO1xuICAgIH1cbiAgICByZXR1cm4gJyAnICsga2V5ICsgJz1cIicgKyB2YWwgKyAnXCInO1xuICB9XG59O1xuXG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gYXR0cmlidXRlcyBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHBhcmFtIHtPYmplY3R9IGVzY2FwZWRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5hdHRycyA9IGZ1bmN0aW9uIGF0dHJzKG9iaiwgdGVyc2Upe1xuICB2YXIgYnVmID0gW107XG5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuXG4gIGlmIChrZXlzLmxlbmd0aCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgdmFyIGtleSA9IGtleXNbaV1cbiAgICAgICAgLCB2YWwgPSBvYmpba2V5XTtcblxuICAgICAgaWYgKCdjbGFzcycgPT0ga2V5KSB7XG4gICAgICAgIGlmICh2YWwgPSBqb2luQ2xhc3Nlcyh2YWwpKSB7XG4gICAgICAgICAgYnVmLnB1c2goJyAnICsga2V5ICsgJz1cIicgKyB2YWwgKyAnXCInKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnVmLnB1c2goZXhwb3J0cy5hdHRyKGtleSwgdmFsLCBmYWxzZSwgdGVyc2UpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnVmLmpvaW4oJycpO1xufTtcblxuLyoqXG4gKiBFc2NhcGUgdGhlIGdpdmVuIHN0cmluZyBvZiBgaHRtbGAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGh0bWxcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbnZhciBqYWRlX2VuY29kZV9odG1sX3J1bGVzID0ge1xuICAnJic6ICcmYW1wOycsXG4gICc8JzogJyZsdDsnLFxuICAnPic6ICcmZ3Q7JyxcbiAgJ1wiJzogJyZxdW90Oydcbn07XG52YXIgamFkZV9tYXRjaF9odG1sID0gL1smPD5cIl0vZztcblxuZnVuY3Rpb24gamFkZV9lbmNvZGVfY2hhcihjKSB7XG4gIHJldHVybiBqYWRlX2VuY29kZV9odG1sX3J1bGVzW2NdIHx8IGM7XG59XG5cbmV4cG9ydHMuZXNjYXBlID0gamFkZV9lc2NhcGU7XG5mdW5jdGlvbiBqYWRlX2VzY2FwZShodG1sKXtcbiAgdmFyIHJlc3VsdCA9IFN0cmluZyhodG1sKS5yZXBsYWNlKGphZGVfbWF0Y2hfaHRtbCwgamFkZV9lbmNvZGVfY2hhcik7XG4gIGlmIChyZXN1bHQgPT09ICcnICsgaHRtbCkgcmV0dXJuIGh0bWw7XG4gIGVsc2UgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKlxuICogUmUtdGhyb3cgdGhlIGdpdmVuIGBlcnJgIGluIGNvbnRleHQgdG8gdGhlXG4gKiB0aGUgamFkZSBpbiBgZmlsZW5hbWVgIGF0IHRoZSBnaXZlbiBgbGluZW5vYC5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWxlbmFtZVxuICogQHBhcmFtIHtTdHJpbmd9IGxpbmVub1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5yZXRocm93ID0gZnVuY3Rpb24gcmV0aHJvdyhlcnIsIGZpbGVuYW1lLCBsaW5lbm8sIHN0cil7XG4gIGlmICghKGVyciBpbnN0YW5jZW9mIEVycm9yKSkgdGhyb3cgZXJyO1xuICBpZiAoKHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgfHwgIWZpbGVuYW1lKSAmJiAhc3RyKSB7XG4gICAgZXJyLm1lc3NhZ2UgKz0gJyBvbiBsaW5lICcgKyBsaW5lbm87XG4gICAgdGhyb3cgZXJyO1xuICB9XG4gIHRyeSB7XG4gICAgc3RyID0gc3RyIHx8IHJlcXVpcmUoJ2ZzJykucmVhZEZpbGVTeW5jKGZpbGVuYW1lLCAndXRmOCcpXG4gIH0gY2F0Y2ggKGV4KSB7XG4gICAgcmV0aHJvdyhlcnIsIG51bGwsIGxpbmVubylcbiAgfVxuICB2YXIgY29udGV4dCA9IDNcbiAgICAsIGxpbmVzID0gc3RyLnNwbGl0KCdcXG4nKVxuICAgICwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSBjb250ZXh0LCAwKVxuICAgICwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyBjb250ZXh0KTtcblxuICAvLyBFcnJvciBjb250ZXh0XG4gIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gJyAgPiAnIDogJyAgICAnKVxuICAgICAgKyBjdXJyXG4gICAgICArICd8ICdcbiAgICAgICsgbGluZTtcbiAgfSkuam9pbignXFxuJyk7XG5cbiAgLy8gQWx0ZXIgZXhjZXB0aW9uIG1lc3NhZ2VcbiAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgJ0phZGUnKSArICc6JyArIGxpbmVub1xuICAgICsgJ1xcbicgKyBjb250ZXh0ICsgJ1xcblxcbicgKyBlcnIubWVzc2FnZTtcbiAgdGhyb3cgZXJyO1xufTtcblxuZXhwb3J0cy5EZWJ1Z0l0ZW0gPSBmdW5jdGlvbiBEZWJ1Z0l0ZW0obGluZW5vLCBmaWxlbmFtZSkge1xuICB0aGlzLmxpbmVubyA9IGxpbmVubztcbiAgdGhpcy5maWxlbmFtZSA9IGZpbGVuYW1lO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2phZGUvbGliL3J1bnRpbWUuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIgMyIsIi8qIChpZ25vcmVkKSAqL1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGZzIChpZ25vcmVkKVxuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMiAzIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXHRjb25zb2xlLmxvZygnbWFwNHAuanMnKTtcblxuXHR2YXIgX21hcGphZGUgPSByZXF1aXJlKCcuLi92aWV3L21hcC5qYWRlJyk7XG5cdCQoJy5jLXBsYWNlJykuaHRtbChfbWFwamFkZSgpKTtcblxuXHR2YXIgX3BvZGV0YWlsID0gcmVxdWlyZSgnLi4vbW9kdWxlL3BvRGV0YWlsLmpzJyk7XG5cdHZhciBwb0RldGFpbCA9IG5ldyBfcG9kZXRhaWwoKTtcblxuXHR2YXIgX3BhdGhMaXN0ID0gcmVxdWlyZSgnLi4vbW9kdWxlL3BhdGhMaXN0LmpzJyk7XG5cdHZhciBwYXRoTGlzdCA9IG5ldyBfcGF0aExpc3QoKTtcblxuXHR2YXIgX3NhdmUgPSB0cnVlO1xuXHR2YXIgX2V2ZW50LCBfcG9zdE9mZmljZUFycjtcblx0dmFyIG15Q29sbGVjdGlvbiA9IG5ldyB5bWFwcy5HZW9PYmplY3RDb2xsZWN0aW9uKCk7XG5cdHZhciBfcm91dGU7XG5cblx0dmFyIG15QmFsbG9vbkNvbnRlbnRCb2R5TGF5b3V0ID0geW1hcHMudGVtcGxhdGVMYXlvdXRGYWN0b3J5LmNyZWF0ZUNsYXNzKFxuXHRcdCc8cD4kW3Byb3BlcnRpZXMuZGF0YS5wb3N0YWxDb2RlXTwvcD48cD4kW3Byb3BlcnRpZXMuZGF0YS5hZGRyZXNzU291cmNlXTwvcD48cD4kW3Byb3BlcnRpZXMuZGF0YS50eXBlQ29kZV08L3A+PHA+0LrQvtC7LdCy0L4g0LfQsNGP0LLQvtC6ICRbcHJvcGVydGllcy5kYXRhLmV2bnRUb3RhbF08L3A+PGJyIC8+PGJ1dHRvbiBpZD1cInNob3ctcG8tZGV0YWlsLWJ0blwiPtCf0L7QtNGA0L7QsdC90L48L2J1dHRvbj48YnIgLz48YnV0dG9uIGlkPVwiYWRkLXRvLXBhdGgtYnRuXCI+0JIg0YHQv9C40YHQvtC6PC9idXR0b24+Jywge1xuXHRcdFx0YnVpbGQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRteUJhbGxvb25Db250ZW50Qm9keUxheW91dC5zdXBlcmNsYXNzLmJ1aWxkLmNhbGwodGhpcyk7XG5cdFx0XHRcdCQoJyNzaG93LXBvLWRldGFpbC1idG4nKS5vbignY2xpY2snLCB7XG5cdFx0XHRcdFx0XCJwb1wiOiB0aGlzLl9kYXRhLnByb3BlcnRpZXMuX2RhdGFcblx0XHRcdFx0fSwgdGhpcy5vblNob3dQT0RldGFpbENsaWNrKTtcblx0XHRcdFx0JCgnI2FkZC10by1wYXRoLWJ0bicpLm9uKCdjbGljaycsIHtcblx0XHRcdFx0XHRcInBvXCI6IHRoaXMuX2RhdGEucHJvcGVydGllcy5fZGF0YVxuXHRcdFx0XHR9LCB0aGlzLm9uQWRkVG9QYXRoQ2xpY2spO1xuXHRcdFx0fSxcblx0XHRcdGNsZWFyOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0JCgnI3Nob3ctcG8tZGV0YWlsLWJ0bicpLm9mZignY2xpY2snLCB0aGlzLm9uU2hvd1BPRGV0YWlsQ2xpY2spO1xuXHRcdFx0XHRteUJhbGxvb25Db250ZW50Qm9keUxheW91dC5zdXBlcmNsYXNzLmNsZWFyLmNhbGwodGhpcyk7XG5cdFx0XHR9LFxuXHRcdFx0b25TaG93UE9EZXRhaWxDbGljazogZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRwb0RldGFpbC5pbml0KGUuZGF0YS5wby5kYXRhLCBteU1hcCk7XG5cdFx0XHR9LFxuXHRcdFx0b25BZGRUb1BhdGhDbGljazogZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRwYXRoTGlzdC5hZGRFbGVtZW50KGUuZGF0YS5wby5kYXRhKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHR2YXIgbXlNYXAgPSBuZXcgeW1hcHMuTWFwKFwibWFweVwiLCB7XG5cdFx0Y2VudGVyOiBbNTAuNTksIDM2LjU4XSxcblx0XHR6b29tOiAxMCxcblx0XHRjb250cm9sczogWydyb3V0ZUVkaXRvciddXG5cdH0sIHtcblx0XHRidXR0b25NYXhXaWR0aDogMTUwXG5cdH0pO1xuXG5cdGZ1bmN0aW9uIGNyZWF0ZVBhdGgoc2VsZWN0ZWRFbCkge1xuXHRcdCQoJyNwby1jZW50ci1idG4nKS5vZmYoKTtcblx0XHRfcG9zdE9mZmljZUFyciA9IFtdO1xuXHRcdG15Q29sbGVjdGlvbi5yZW1vdmVBbGwoKTtcblx0XHRpZiAoX3JvdXRlKVxuXHRcdFx0bXlNYXAuZ2VvT2JqZWN0cy5yZW1vdmUoX3JvdXRlKTtcblxuXHRcdHZhciBwYXRoQXJyID0gc2VsZWN0ZWRFbC5tYXAoZnVuY3Rpb24ob3RkKSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHR0eXBlOiAnd2F5UG9pbnQnLFxuXHRcdFx0XHRwb2ludDogW290ZC5sYXRpdHVkZSwgb3RkLmxvbmdpdHVkZV1cblx0XHRcdH07XG5cdFx0fSk7XG5cdFx0eW1hcHMucm91dGUocGF0aEFycikudGhlbihcblx0XHRcdGZ1bmN0aW9uKHJvdXRlKSB7XG5cdFx0XHRcdF9yb3V0ZSA9IHJvdXRlO1xuXHRcdFx0XHRteU1hcC5nZW9PYmplY3RzLmFkZChyb3V0ZSk7XG5cblx0XHRcdFx0dmFyIHBvaW50cyA9IHJvdXRlLmdldFdheVBvaW50cygpO1xuXHRcdFx0XHRwb2ludHMub3B0aW9ucy5zZXQoJ3ByZXNldCcsICdpc2xhbmRzI2JsdWVTdHJldGNoeUljb24nKTtcblx0XHRcdFx0cG9pbnRzLmVhY2goZnVuY3Rpb24oZWwsIGkpIHtcblx0XHRcdFx0XHRlbC5wcm9wZXJ0aWVzLnNldCgnaWNvbkNvbnRlbnQnLCBzZWxlY3RlZEVsW2ldLnBvc3RhbENvZGUgKyBcIiDRgtC+0YfQutCwIOKEllwiICsgKGkgKyAxKSk7XG5cdFx0XHRcdFx0ZWwucHJvcGVydGllcy5zZXQoJ2JhbGxvb25Db250ZW50Jywgc2VsZWN0ZWRFbFtpXS5wb3N0YWxDb2RlICsgXCIg0YLQvtGH0LrQsCDihJZcIiArIChpICsgMSkpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0fSxcblx0XHRcdGZ1bmN0aW9uKGVycm9yKSB7XG5cdFx0XHRcdGFsZXJ0KFwi0JLQvtC30L3QuNC60LvQsCDQvtGI0LjQsdC60LA6IFwiICsgZXJyb3IubWVzc2FnZSk7XG5cdFx0XHR9XG5cdFx0KTtcblxuXHR9XG5cblx0ZnVuY3Rpb24gc29ydENvbXBhcmF0b3IoYSwgYikge1xuXHRcdGlmIChwYXJzZUludChhLnBvc3RhbENvZGUpID4gcGFyc2VJbnQoYi5wb3N0YWxDb2RlKSkge1xuXHRcdFx0cmV0dXJuIDE7XG5cdFx0fVxuXHRcdGlmIChwYXJzZUludChhLnBvc3RhbENvZGUpIDwgcGFyc2VJbnQoYi5wb3N0YWxDb2RlKSkge1xuXHRcdFx0cmV0dXJuIC0xO1xuXHRcdH1cblx0fVxuXG5cdCQuYWpheCh7XG5cdFx0dHlwZTogJ0dFVCcsXG5cdFx0dXJsOiBcIi4vcG9zdGFscy5qc29uXCIsXG5cdFx0ZGF0YVR5cGU6IFwianNvblwiLFxuXHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcblxuXHRcdFx0ZGF0YS5zb3J0KHNvcnRDb21wYXJhdG9yKTtcblxuXHRcdFx0JC5hamF4KHtcblx0XHRcdFx0dHlwZTogJ0dFVCcsXG5cdFx0XHRcdHVybDogJy91c2Vycy9tcicsXG5cdFx0XHRcdGRhdGFUeXBlOiAnanNvbicsXG5cdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKG1yZGF0YSkge1xuXG5cdFx0XHRcdFx0bXJkYXRhLnNvcnQoc29ydENvbXBhcmF0b3IpO1xuXG5cdFx0XHRcdFx0ZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKG90ZCkge1xuXG5cdFx0XHRcdFx0XHRvdGQuZXZudFRvdGFsID0gJzAnO1xuXHRcdFx0XHRcdFx0bXJkYXRhLmZvckVhY2goZnVuY3Rpb24obXIpIHtcblx0XHRcdFx0XHRcdFx0aWYgKG90ZC5wb3N0YWxDb2RlID09IG1yLl9pZCkge1xuXHRcdFx0XHRcdFx0XHRcdG90ZC5ldm50VG90YWwgPSBtci5jb3VudDtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHR2YXIgc3RsID0gJ2lzbGFuZHMjZGFya2dyZWVuU3RyZXRjaHlJY29uJztcblx0XHRcdFx0XHRcdGlmIChvdGQuZXZudFRvdGFsID49ICcxJykge1xuXHRcdFx0XHRcdFx0XHRzdGwgPSAnaXNsYW5kcyNkYXJrYmx1ZVN0cmV0Y2h5SWNvbic7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZiAob3RkLmV2bnRUb3RhbCA+PSAnMycpIHtcblx0XHRcdFx0XHRcdFx0c3RsID0gJ2lzbGFuZHMjdmlvbGV0U3RyZXRjaHlJY29uJztcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0dmFyIHBtYXJrID0gbmV3IHltYXBzLlBsYWNlbWFyayhbb3RkLmxhdGl0dWRlLCBvdGQubG9uZ2l0dWRlXSwge1xuXHRcdFx0XHRcdFx0XHRkYXRhOiBvdGQsXG5cdFx0XHRcdFx0XHRcdGljb25Db250ZW50OiBvdGQucG9zdGFsQ29kZSArIFwiIC8gXCIgKyBvdGQuZXZudFRvdGFsLFxuXHRcdFx0XHRcdFx0XHRpY29uQ2FwdGlvbjogb3RkLnBvc3RhbENvZGVcblx0XHRcdFx0XHRcdH0sIHtcblx0XHRcdFx0XHRcdFx0YmFsbG9vbkNvbnRlbnRMYXlvdXQ6IG15QmFsbG9vbkNvbnRlbnRCb2R5TGF5b3V0LFxuXHRcdFx0XHRcdFx0XHRwcmVzZXQ6IHN0bFxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRteUNvbGxlY3Rpb24uYWRkKHBtYXJrKTtcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdF9wb3N0T2ZmaWNlQXJyID0gZGF0YTtcblx0XHRcdFx0XHRteU1hcC5nZW9PYmplY3RzLmFkZChteUNvbGxlY3Rpb24pO1xuXHRcdFx0XHRcdHBhdGhMaXN0LmluaXQoY3JlYXRlUGF0aCk7XG5cblxuXHRcdFx0XHRcdCQoJyNwby1jZW50ci1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdFx0XHR2YXIgcG9ub20gPSAkKCcjcG9udW0nKS52YWwoKTtcblx0XHRcdFx0XHRcdF9wb3N0T2ZmaWNlQXJyLmZvckVhY2goZnVuY3Rpb24ocG8pIHtcblx0XHRcdFx0XHRcdFx0aWYgKHBvLnBvc3RhbENvZGUgPT0gcG9ub20pIHtcblx0XHRcdFx0XHRcdFx0XHRteU1hcC5zZXRDZW50ZXIoW3BvLmxhdGl0dWRlLCBwby5sb25naXR1ZGVdLCAxMywge1xuXHRcdFx0XHRcdFx0XHRcdFx0Y2hlY2tab29tUmFuZ2U6IHRydWVcblx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0JCgnI2RvLWZpbHRlci1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdFx0XHR2YXIgX3JhbmdlID0gJCgnaW5wdXRbbmFtZT1cImZpbHRlcm1hcFwiXTpjaGVja2VkJykudmFsKCk7XG5cdFx0XHRcdFx0XHRteUNvbGxlY3Rpb24ucmVtb3ZlQWxsKCk7XG5cblx0XHRcdFx0XHRcdGRhdGEuZm9yRWFjaChmdW5jdGlvbihvdGQpIHtcblx0XHRcdFx0XHRcdFx0aWYgKG90ZC5ldm50VG90YWwgPj0gcGFyc2VJbnQoX3JhbmdlKSkge1xuXHRcdFx0XHRcdFx0XHRcdHZhciBzdGwgPSAnaXNsYW5kcyNkYXJrZ3JlZW5TdHJldGNoeUljb24nO1xuXHRcdFx0XHRcdFx0XHRcdGlmIChvdGQuZXZudFRvdGFsID49ICcxJykge1xuXHRcdFx0XHRcdFx0XHRcdFx0c3RsID0gJ2lzbGFuZHMjZGFya2JsdWVTdHJldGNoeUljb24nO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRpZiAob3RkLmV2bnRUb3RhbCA+PSAnMycpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHN0bCA9ICdpc2xhbmRzI3Zpb2xldFN0cmV0Y2h5SWNvbic7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0dmFyIHBtYXJrID0gbmV3IHltYXBzLlBsYWNlbWFyayhbb3RkLmxhdGl0dWRlLCBvdGQubG9uZ2l0dWRlXSwge1xuXHRcdFx0XHRcdFx0XHRcdFx0ZGF0YTogb3RkLFxuXHRcdFx0XHRcdFx0XHRcdFx0aWNvbkNvbnRlbnQ6IG90ZC5wb3N0YWxDb2RlICsgXCIgLyBcIiArIG90ZC5ldm50VG90YWwsXG5cdFx0XHRcdFx0XHRcdFx0XHRpY29uQ2FwdGlvbjogb3RkLnBvc3RhbENvZGVcblx0XHRcdFx0XHRcdFx0XHR9LCB7XG5cdFx0XHRcdFx0XHRcdFx0XHRiYWxsb29uQ29udGVudExheW91dDogbXlCYWxsb29uQ29udGVudEJvZHlMYXlvdXQsXG5cdFx0XHRcdFx0XHRcdFx0XHRwcmVzZXQ6IHN0bFxuXHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdG15Q29sbGVjdGlvbi5hZGQocG1hcmspO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0bXlNYXAuZ2VvT2JqZWN0cy5hZGQobXlDb2xsZWN0aW9uKTtcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdH0pO1xuXG5cblx0XHRcdFx0fSxcblx0XHRcdFx0ZXJyb3I6IGZ1bmN0aW9uKGVycikge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKGVycik7XG5cblxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdH0sXG5cdFx0Ly9lcnJvcjogbG9hZEVycm9yXG5cdH0pO1xuXG5cdHJldHVybiBteU1hcDtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2pzL2Rldi9wbS9tb2R1bGUvbWFwNHAuanNcbi8vIG1vZHVsZSBpZCA9IDEyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDIgMyIsInZhciBqYWRlID0gcmVxdWlyZShcIi9ob21lL3VidW50dS93b3Jrc3BhY2Uvbm9kZV9tb2R1bGVzL2phZGUvbGliL3J1bnRpbWUuanNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8ZGl2IGlkPVxcXCJtYXB5XFxcIiBzdHlsZT1cXFwid2lkdGg6IDEwMCU7IGhlaWdodDogODAwcHhcXFwiPjwvZGl2PlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2pzL2Rldi9wbS92aWV3L21hcC5qYWRlXG4vLyBtb2R1bGUgaWQgPSAxMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAyIDMiLCIndXNlIHNydGljdCc7XG5cbm1vZHVsZS5leHBvcnRzPWZ1bmN0aW9uKCl7XG5cbiAgdGhpcy5fbW9kYWwgPSByZXF1aXJlKCcuLi92aWV3L3BvRGV0YWlsLmphZGUnKTtcblxuICB0aGlzLmRlc3Ryb3lNb2RhbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgIFxuICAgICQoJyNjbG9zZS1tb2RhbC1idG4nKS5vZmYoJ2NsaWNrJyk7XG4gICAgJCgnI2Nsb3NlLW1vZGFsLWNyb3NzLWJ0bicpLm9mZignY2xpY2snKTtcbiAgICAkKCcubW9kYWwtcGxhY2UnKS5odG1sKCcnKTtcbiAgfTtcblxuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgdGhpcy5pbml0ID0gZnVuY3Rpb24oZGF0YSwgbXlNYXApIHtcblxuICAgICQoJy5tb2RhbC1wbGFjZScpLmh0bWwodGhpcy5fbW9kYWwoe1wiZGF0YVwiOiBkYXRhfSkpO1xuXG5cbiAgICAkKCcjY2xvc2UtbW9kYWwtYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuXG4gICAgfSk7XG5cbiAgICAkKCcjY2xvc2UtbW9kYWwtY3Jvc3MtYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuXG4gICAgfSk7XG5cbiAgICAkKCcjbW9kYWwnKS5tb2RhbCgnc2hvdycpO1xuXG4gICAgJCgnI21vZGFsJykub24oJ2hpZGRlbi5icy5tb2RhbCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdtb2RhbCBoaWRlJyk7XG4gICAgICBzZWxmLmRlc3Ryb3lNb2RhbCgpO1xuICAgIH0pO1xuXG4gIH07XG5cdFxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2pzL2Rldi9wbS9tb2R1bGUvcG9EZXRhaWwuanNcbi8vIG1vZHVsZSBpZCA9IDEyOFxuLy8gbW9kdWxlIGNodW5rcyA9IDIgMyIsInZhciBqYWRlID0gcmVxdWlyZShcIi9ob21lL3VidW50dS93b3Jrc3BhY2Uvbm9kZV9tb2R1bGVzL2phZGUvbGliL3J1bnRpbWUuanNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChkYXRhLCB1bmRlZmluZWQpIHtcbmJ1Zi5wdXNoKFwiPGRpdiBpZD1cXFwibW9kYWxcXFwiIHRhYmluZGV4PVxcXCItMVxcXCIgcm9sZT1cXFwiZGlhbG9nXFxcIiBhcmlhLWxhYmVsbGVkYnk9XFxcIm15TW9kYWxMYWJlbFxcXCIgYXJpYS1oaWRkZW49XFxcInRydWVcXFwiIGNsYXNzPVxcXCJtb2RhbCBmYWRlXFxcIj48ZGl2IHJvbGU9XFxcImRvY3VtZW50XFxcIiBjbGFzcz1cXFwibW9kYWwtZGlhbG9nXFxcIj48ZGl2IGNsYXNzPVxcXCJtb2RhbC1jb250ZW50XFxcIj48ZGl2IGNsYXNzPVxcXCJtb2RhbC1oZWFkZXJcXFwiPjxidXR0b24gaWQ9XFxcImNsb3NlLW1vZGFsLWNyb3NzLWJ0blxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBkYXRhLWRpc21pc3M9XFxcIm1vZGFsXFxcIiBhcmlhLWxhYmVsPVxcXCJDbG9zZVxcXCIgY2xhc3M9XFxcImNsb3NlXFxcIj48c3BhbiBhcmlhLWhpZGRlbj1cXFwidHJ1ZVxcXCI+w5c8L3NwYW4+PC9idXR0b24+PGg0IGlkPVxcXCJteU1vZGFsTGFiZWxcXFwiIGNsYXNzPVxcXCJtb2RhbC10aXRsZVxcXCI+0JTQtdGC0LDQu9GM0L3QviAtIFwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IGRhdGEucG9zdGFsQ29kZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiPC9oND48L2Rpdj48ZGl2IGNsYXNzPVxcXCJtb2RhbC1ib2R5XFxcIj48ZGl2IGNsYXNzPVxcXCJjYXJkXFxcIj48aDMgY2xhc3M9XFxcImNhcmQtaGVhZGVyXFxcIj5cIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBkYXRhLnBvc3RhbENvZGUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIjwvaDM+PGRpdiBjbGFzcz1cXFwiY2FyZC1ibG9ja1xcXCI+PGg0IGNsYXNzPVxcXCJjYXJkLXRpdGxlXFxcIj5cIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBkYXRhLnBvc3RhbENvZGUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIiBcIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBkYXRhLnNldHRsZW1lbnQpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIiBcIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBkYXRhLmFkZHJlc3NTb3VyY2UpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIjwvaDQ+PGRpdiBjbGFzcz1cXFwiY2FyZC10ZXh0XFxcIj48aDQ+0J/RgNC10LTQvtGB0YLQsNCy0LvRj9C10LzRi9C1INGD0YHQu9GD0LPQuDwvaDQ+PHVsPjwvdWw+XCIpO1xuLy8gaXRlcmF0ZSBkYXRhLnNlcnZpY2VHcm91cHNcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gZGF0YS5zZXJ2aWNlR3JvdXBzO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIgc2cgPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIjxsaT5cIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBzZy5zZXJ2aWNlR3JvdXBOYW1lKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCI8L2xpPlwiKTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBzZyA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGxpPlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IHNnLnNlcnZpY2VHcm91cE5hbWUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIjwvbGk+XCIpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG5idWYucHVzaChcIjxoND7QotC10LvQtdGE0L7QvdGLPC9oND48dWw+PC91bD5cIik7XG4vLyBpdGVyYXRlIGRhdGEucGhvbmVzXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IGRhdGEucGhvbmVzO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIgcGhvbmUgPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIjxsaT4gKFwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IHBob25lLnBob25lVG93bkNvZGUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIikgXCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gcGhvbmUucGhvbmVOdW1iZXIpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIiAoXCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gcGhvbmUucGhvbmVUeXBlTmFtZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiKTwvbGk+XCIpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIHBob25lID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8bGk+IChcIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBwaG9uZS5waG9uZVRvd25Db2RlKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCIpIFwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IHBob25lLnBob25lTnVtYmVyKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCIgKFwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IHBob25lLnBob25lVHlwZU5hbWUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIik8L2xpPlwiKTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxuYnVmLnB1c2goXCI8aDQ+0JLRgNC10LzRjyDRgNCw0LHQvtGC0YtcXHRcXHQ8L2g0Pjx1bD48L3VsPlwiKTtcbi8vIGl0ZXJhdGUgZGF0YS53b3JraW5nSG91cnNcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gZGF0YS53b3JraW5nSG91cnM7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciB3aCA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGxpPlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IHdoLndlZWtEYXlOYW1lKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCJcXHQ8L2xpPlwiKTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciB3aCA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGxpPlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IHdoLndlZWtEYXlOYW1lKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCJcXHQ8L2xpPlwiKTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxuYnVmLnB1c2goXCI8L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJtb2RhbC1mb290ZXJcXFwiPjxidXR0b24gaWQ9XFxcImNsb3NlLW1vZGFsLWJ0blxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBkYXRhLWRpc21pc3M9XFxcIm1vZGFsXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPkNsb3NlPC9idXR0b24+PC9kaXY+PC9kaXY+PC9kaXY+PC9kaXY+XCIpO30uY2FsbCh0aGlzLFwiZGF0YVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguZGF0YTp0eXBlb2YgZGF0YSE9PVwidW5kZWZpbmVkXCI/ZGF0YTp1bmRlZmluZWQsXCJ1bmRlZmluZWRcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnVuZGVmaW5lZDp0eXBlb2YgdW5kZWZpbmVkIT09XCJ1bmRlZmluZWRcIj91bmRlZmluZWQ6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy9qcy9kZXYvcG0vdmlldy9wb0RldGFpbC5qYWRlXG4vLyBtb2R1bGUgaWQgPSAxMjlcbi8vIG1vZHVsZSBjaHVua3MgPSAyIDMiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG5cblx0dGhpcy5wbEphZGUgPSByZXF1aXJlKCcuLi92aWV3L3BhdGhMaXN0LmphZGUnKTtcblx0dGhpcy5lbEphZGUgPSByZXF1aXJlKCcuLi92aWV3L2xpc3RFbC5qYWRlJyk7XG5cdHRoaXMubmVzdGVkTGlzdEphZGUgPSByZXF1aXJlKCcuLi92aWV3L3N1Ymxpc3QuamFkZScpO1xuXHR0aGlzLnBkZkphZGUgPSByZXF1aXJlKCcuLi92aWV3L3BkZlBhdGhMaXN0LmphZGUnKTtcblx0dGhpcy5ldm50RGV0YWlsSmFkZSA9IHJlcXVpcmUoJy4uL3ZpZXcvZWRpdGRlbEV2ZW50LmphZGUnKTtcblx0dGhpcy55bWFwQ2VhdGVQYXRoID0ge307XG5cdHRoaXMuc2VsZWN0ZWRFTCA9IFtdO1xuXG5cdHZhciBzZWxmID0gdGhpcztcblxuXHR0aGlzLmluaXQgPSBmdW5jdGlvbih5TWFwQ3JlYXRlUGF0aCkge1xuXHRcdCQoJy5sLXBsYWNlJykuaHRtbChzZWxmLnBsSmFkZSgpKTtcblx0XHQvL3NlbGYubXlNYXA9bXlNYXA7XG5cdFx0c2VsZi55bWFwQ2VhdGVQYXRoID0geU1hcENyZWF0ZVBhdGg7XG5cdFx0JCgnI2NsZWFyLXBsaXN0LWJ0bicpLm9uKCdjbGljaycsIHNlbGYucmVtb3ZlQWxsKTtcblx0XHQkKCcjY3JlYXRlLXBhdGgtYnRuJykub24oJ2NsaWNrJywgc2VsZi5jcmVhdGVQYXRoKTtcblx0XHQkKCcjcHJpbnQtcGF0aC1idG4nKS5vbignY2xpY2snLCBzZWxmLnBkZlBhdGgpO1xuXG5cdH07XG5cblx0dGhpcy5hZGRFbGVtZW50ID0gZnVuY3Rpb24oZGF0YSkge1xuXHRcdCQoJyNwYXRoLWxpc3QnKS5hcHBlbmQoc2VsZi5lbEphZGUoe1xuXHRcdFx0XCJkYXRhXCI6IGRhdGFcblx0XHR9KSk7XG5cdFx0c2VsZi5zZWxlY3RlZEVMLnB1c2goZGF0YSk7XG5cdFx0JCgnW2RhdGEtcG8taWQ9JyArIGRhdGEucG9zdGFsQ29kZSArICddJykuY2hpbGRyZW4oJy5yZW1vdmUtcG8tbGlzdCcpLm9uKCdjbGljaycsIHtcblx0XHRcdGVsZW1lbnQ6IGRhdGFcblx0XHR9LCBzZWxmLnJlbW92ZUVsZW1lbnQpO1xuXHRcdHNlbGYubG9hZEV2bnREYXRhKGRhdGEpO1xuXG5cdH07XG5cblx0dGhpcy5sb2FkRXZudERhdGEgPSBmdW5jdGlvbihfZGF0YSkge1xuXHRcdHZhciByYXJyID0gW107XG5cdFx0JC5hamF4KHtcblx0XHRcdHR5cGU6ICdHRVQnLFxuXHRcdFx0Ly91cmw6IFwiLi90ZXN0ZXZlbnQuanNvblwiLFxuXHRcdFx0dXJsOlwiL3VzZXJzL2V2bnQvXCIrX2RhdGEucG9zdGFsQ29kZSxcblx0XHRcdGRhdGFUeXBlOiBcImpzb25cIixcblx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRcdFx0Y29uc29sZS5sb2coJ3N1Y2Nlc3MgbG9hZCBkYXRhJyk7XG5cdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xuXHRcdFx0XHRfZGF0YS5ldm50cz1kYXRhO1xuXHRcdFx0XHQkKCdbZGF0YS1wby1pZD0nICsgX2RhdGEucG9zdGFsQ29kZSArICddJykuZmluZCgnaS5mYS1zcGlubmVyJykucmVtb3ZlKCk7XG5cdFx0XHRcdCQoJ1tkYXRhLXBvLWlkPScgKyBfZGF0YS5wb3N0YWxDb2RlICsgJ10nKS5hcHBlbmQoc2VsZi5uZXN0ZWRMaXN0SmFkZSh7XG5cdFx0XHRcdFx0XHRcImRhdGFcIjogZGF0YVxuXHRcdFx0XHR9KSk7XG5cdFx0XHRcdCQoJ1tkYXRhLXBvLWlkPScgKyBfZGF0YS5wb3N0YWxDb2RlICsgJ10nKS5vbignY2xpY2snLCBzZWxmLmxpc3RlbkV2bnQpO1xuXHRcdFx0XHQvKnJhcnIgPSBkYXRhLmZpbHRlcihmdW5jdGlvbihldm50KSB7XG5cdFx0XHRcdFx0aWYgKGV2bnQucG9zdGFsQ29kZSA9PSBfZGF0YS5wb3N0YWxDb2RlKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRfZGF0YS5ldm50cyA9IHJhcnI7XG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2cocmFycik7XG5cdFx0XHRcdFx0JCgnW2RhdGEtcG8taWQ9JyArIF9kYXRhLnBvc3RhbENvZGUgKyAnXScpLmZpbmQoJ2kuZmEtc3Bpbm5lcicpLnJlbW92ZSgpO1xuXHRcdFx0XHRcdCQoJ1tkYXRhLXBvLWlkPScgKyBfZGF0YS5wb3N0YWxDb2RlICsgJ10nKS5hcHBlbmQoc2VsZi5uZXN0ZWRMaXN0SmFkZSh7XG5cdFx0XHRcdFx0XHRcImRhdGFcIjogcmFyclxuXHRcdFx0XHRcdH0pKTtcblx0XHRcdFx0XHQvLyQoJy5ldm50LWxpJykuY2hpbGRyZW4oJy5zaG93LWV2bnQtZGV0YWlsJykub24oJ2NsaWNrJyxzZWxmLnNob3dFdm50RGV0YWlsKTtcblx0XHRcdFx0XHQvLyQoJy5ldm50LWxpJykuY2hpbGRyZW4oJy5yZW1vdmUtZXZudC1saXN0Jykub24oJ2NsaWNrJyxzZWxmLnJlbW92ZUV2bnQpO1x0XHRcdFx0XHRcblx0XHRcdFx0XHQvLyQoJ1tkYXRhLXBvLWlkPScrIF9kYXRhLnBvc3RhbENvZGUrJ10nKS5vbignY2xpY2snLHNlbGYuc2hvd0V2bnREZXRhaWwpO1xuXHRcdFx0XHRcdCQoJ1tkYXRhLXBvLWlkPScgKyBfZGF0YS5wb3N0YWxDb2RlICsgJ10nKS5vbignY2xpY2snLCBzZWxmLmxpc3RlbkV2bnQpO1xuXHRcdFx0XHR9LCAvKk1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDAwKSovIC8qMTApOyovXG5cdFx0XHR9LFxuXHRcdFx0ZXJyb3I6IGZ1bmN0aW9uKGVycikge1xuXHRcdFx0XHRjb25zb2xlLmxvZygn0L7RiNC40LHQutCwICgnKTtcblx0XHRcdFx0Y29uc29sZS5sb2coZXJyKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXG5cdH07XG5cdHRoaXMubGlzdGVuRXZudCA9IGZ1bmN0aW9uKGUpIHtcblx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdHZhciB0eXBlID0gdHJ1ZTsgLy9kZWxldGVcblx0XHRpZiAoJChlLnRhcmdldCkucGFyZW50KCkuaGFzQ2xhc3MoJ3Nob3ctZXZudC1kZXRhaWwnKSlcblx0XHRcdHR5cGUgPSBmYWxzZTsgLy8nc2hvdy1kZXRhaWwnO1xuXG5cdFx0dmFyIG9wID0gJChlLmN1cnJlbnRUYXJnZXQpLmF0dHIoJ2RhdGEtcG8taWQnKTtcblx0XHR2YXIgZXZudElkID0gJChlLnRhcmdldCkucGFyZW50KCkucGFyZW50KCkuYXR0cignZGF0YS1ldm50LWlkJyk7XG5cdFx0Ly9jb25zb2xlLmxvZygkKGUudGFyZ2V0KS5wYXJlbnQoKS5oYXNDbGFzcygnc2hvdy1ldm50LWRldGFpbCcpKTtcblxuXG5cdFx0Zm9yICh2YXIgaSA9IHNlbGYuc2VsZWN0ZWRFTC5sZW5ndGg7IGktLTspIHtcblx0XHRcdGlmIChzZWxmLnNlbGVjdGVkRUxbaV0ucG9zdGFsQ29kZSA9PSBvcCkge1xuXHRcdFx0XHRmb3IgKHZhciBqID0gc2VsZi5zZWxlY3RlZEVMW2ldLmV2bnRzLmxlbmd0aDsgai0tOykge1xuXHRcdFx0XHRcdGlmIChzZWxmLnNlbGVjdGVkRUxbaV0uZXZudHNbal0uX2lkID09IGV2bnRJZCkge1xuXHRcdFx0XHRcdFx0aWYgKHR5cGUpIHtcblx0XHRcdFx0XHRcdFx0c2VsZi5zZWxlY3RlZEVMW2ldLmV2bnRzLnNwbGljZShqLCAxKTtcblx0XHRcdFx0XHRcdFx0JChlLnRhcmdldCkucGFyZW50KCkucGFyZW50KCkucmVtb3ZlKCk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHR2YXIgX2V2ZW50ID0gc2VsZi5zZWxlY3RlZEVMW2ldLmV2bnRzW2pdO1xuXHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0JCgnLm1vZGFsLXBsYWNlJykuaHRtbChzZWxmLmV2bnREZXRhaWxKYWRlKCkpO1xuXHRcdFx0XHRcdFx0XHQvKiQoXCIuZmxhdHBpY2tyXCIpLmZsYXRwaWNrcih7XG5cdFx0XHRcdFx0XHRcdFx0ZW5hYmxlVGltZTogdHJ1ZSxcblx0XHRcdFx0XHRcdFx0fSk7Ki9cblxuXHRcdFx0XHRcdFx0XHQkKCcjbW9kYWwnKS5tb2RhbCgnc2hvdycpO1xuXHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0JChcIiNkYXRlYmVnaW5cIikuZmxhdHBpY2tyKHtcblx0XHRcdFx0XHRcdFx0dXRjOiB0cnVlLFxuXHRcdFx0XHRcdFx0XHRkZWZhdWx0RGF0ZTogbW9tZW50KF9ldmVudC5zdGFydCkuZm9ybWF0KCdZWVlZLU1NLUREIGhoOm1tJyksXG5cdFx0XHRcdFx0XHRcdGVuYWJsZVRpbWU6IHRydWUsXG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHQkKFwiI2RhdGVlbmRcIikuZmxhdHBpY2tyKHtcblx0XHRcdFx0XHRcdFx0dXRjOiB0cnVlLFxuXHRcdFx0XHRcdFx0XHRkZWZhdWx0RGF0ZTogbW9tZW50KF9ldmVudC5lbmQpLmZvcm1hdCgnWVlZWS1NTS1ERCBoaDptbScpLFxuXHRcdFx0XHRcdFx0XHRlbmFibGVUaW1lOiB0cnVlLFxuXHRcdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdFx0Ly9cdCQoJyNkYXRlYmVnaW4nKS52YWwobW9tZW50KF9ldmVudC5zdGFydCkuZm9ybWF0KCdZWVlZLU1NLUREIGhoOm1tJykpO1xuXHRcdFx0XHRcdFx0Ly9cdCQoJyNkYXRlZW5kJykudmFsKG1vbWVudChfZXZlbnQuZW5kKS5mb3JtYXQoJ1lZWVktTU0tREQgaGg6bW0nKSk7XG5cdFx0XHRcdFx0XHRcdCQoJyNldmVudC10aXRsZScpLnZhbChfZXZlbnQudGl0bGUpO1xuXHRcdFx0XHRcdFx0XHQkKCcjcG9zdGNvZGUnKS52YWwoX2V2ZW50LnBvc3RhbENvZGUpO1xuXHRcdFx0XHRcdFx0XHQkKCcjc3RhdHVzJykudmFsKF9ldmVudC5zdGF0dXMpO1xuXHRcdFx0XHRcdFx0XHQkKFwiI2Rlc2NyaXB0aW9uXCIpLnZhbChfZXZlbnQuZGVzY3JpcHRpb24pO1xuXHRcdFx0XHRcdFx0XHQkKCcjZXhlY3V0b3InKS52YWwoX2V2ZW50LmV4ZWN1dG9yKTtcblxuXHRcdFx0XHRcdFx0XHQkKCcjbW9kYWwnKS5vbignaGlkZGVuLmJzLm1vZGFsJywgZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdtb2RhbCBoaWRlJyk7XG5cdFx0XHRcdFx0XHRcdFx0c2VsZi5kZXN0cm95TW9kYWwoKTtcblxuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0fTtcblx0dGhpcy5kZXN0cm95TW9kYWwgPSBmdW5jdGlvbigpIHtcblxuXHRcdC8vJChcIiNzYXZlLWV2ZW50LWJ0blwiKS5vZmYoJ2NsaWNrJyk7XG5cdFx0JCgnI2Nsb3NlLW1vZGFsLWJ0bicpLm9mZignY2xpY2snKTtcblx0XHQkKCcjY2xvc2UtbW9kYWwtY3Jvc3MtYnRuJykub2ZmKCdjbGljaycpO1xuXHRcdC8vJCgnI2RlbGV0ZS1ldmVudC1idG4nKS5vZmYoKTtcblx0XHQkKCcubW9kYWwtcGxhY2UnKS5odG1sKCcnKTtcblx0fTtcblxuXHR0aGlzLnJlbW92ZUVsZW1lbnQgPSBmdW5jdGlvbihlKSB7XG5cdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRmb3IgKHZhciBpID0gc2VsZi5zZWxlY3RlZEVMLmxlbmd0aDsgaS0tOykge1xuXHRcdFx0aWYgKHNlbGYuc2VsZWN0ZWRFTFtpXS5wb3N0YWxDb2RlID09IGUuZGF0YS5lbGVtZW50LnBvc3RhbENvZGUpIHtcblx0XHRcdFx0JChlLmN1cnJlbnRUYXJnZXQpLm9mZigpO1xuXHRcdFx0XHQkKGUuY3VycmVudFRhcmdldCkucGFyZW50KCkucmVtb3ZlKCk7XG5cdFx0XHRcdC8vJCgnW2RhdGEtZXZudC1pZD0nK2UuZGF0YS5lbGVtZW50LnBvc3RhbENvZGUrJ10nKS5vZmYoKTtcblx0XHRcdFx0Ly8kKCdbZGF0YS1ldm50LWlkPScrZS5kYXRhLmVsZW1lbnQucG9zdGFsQ29kZSsnXScpLnJlbW92ZSgpO1xuXHRcdFx0XHRzZWxmLnNlbGVjdGVkRUwuc3BsaWNlKGksIDEpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHR9O1xuXHR0aGlzLnJlbW92ZUFsbCA9IGZ1bmN0aW9uKGUpIHtcblx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdCQoJyNwYXRoLWxpc3QnKS5odG1sKCcnKTtcblx0XHRzZWxmLnNlbGVjdGVkRUwgPSBbXTtcblx0fTtcblxuXHR0aGlzLmNyZWF0ZVBhdGggPSBmdW5jdGlvbigpIHtcblx0XHRzZWxmLnltYXBDZWF0ZVBhdGgoc2VsZi5zZWxlY3RlZEVMKTtcblx0fTtcblxuXHR0aGlzLnBkZlBhdGggPSBmdW5jdGlvbigpIHtcblx0XHR2YXIgZG9jRGVmaW5pdGlvbiA9IHNlbGYuY3JlYXRlQ29udGVudCgpO1xuXHRcdC8vdmFyIGRvY0RlZmluaXRpb24gPSBzZWxmLnBkZkphZGUoe1wiZGF0YVwiOnNlbGYuc2VsZWN0ZWRFTH0pO1xuXHRcdHBkZk1ha2UuY3JlYXRlUGRmKGRvY0RlZmluaXRpb24pLm9wZW4oKTtcblx0fTtcblxuXHR0aGlzLmNyZWF0ZUNvbnRlbnQgPSBmdW5jdGlvbigpIHtcblx0XHR2YXIgdWxhcnIgPSBbXTtcblx0XHRzZWxmLnNlbGVjdGVkRUwuZm9yRWFjaChmdW5jdGlvbihwbykge1xuXHRcdFx0dWxhcnIucHVzaCh7XG5cdFx0XHRcdHRleHQ6IHBvLnBvc3RhbENvZGVcblx0XHRcdH0pXG5cdFx0XHRpZiAocG8uZXZudHMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHR2YXIgc3VsYXJyID0gW107XG5cdFx0XHRcdHBvLmV2bnRzLmZvckVhY2goZnVuY3Rpb24oZXZuKSB7XG5cdFx0XHRcdFx0c3VsYXJyLnB1c2goe1xuXHRcdFx0XHRcdFx0dGV4dDogZXZuLnRpdGxlXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHR1bGFyci5wdXNoKHtcblx0XHRcdFx0XHR1bDogc3VsYXJyXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHZhciBjb2JqID0ge1xuXHRcdFx0Y29udGVudDogW3tcblx0XHRcdFx0dGV4dDogJ9Cb0LjRgdGCLdGB0L/QuNGB0L7QuiDQt9Cw0Y/QstC+0Log0Log0LjRgdC/0L7Qu9C90LXQvdC40Y4gKNGE0L7RgNC80LAg4oSWMdC70YEpJyxcblx0XHRcdFx0c3R5bGU6ICdoZWFkZXInXG5cdFx0XHR9LCB7XG5cdFx0XHRcdHVsOiB1bGFycixcblx0XHRcdFx0c3R5bGU6ICdsaXN0cydcblx0XHRcdH1dLFxuXHRcdFx0c3R5bGVzOiB7XG5cdFx0XHRcdGhlYWRlcjoge1xuXHRcdFx0XHRcdGZvbnRTaXplOiAxNixcblx0XHRcdFx0XHRib2xkOiB0cnVlXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGxpc3RzOiB7XG5cdFx0XHRcdFx0cGFkZGluZzogXCIxNXB4XCIsXG5cdFx0XHRcdFx0Zm9udFNpemU6IDE0XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXHRcdHJldHVybiBjb2JqO1xuXHR9O1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2pzL2Rldi9wbS9tb2R1bGUvcGF0aExpc3QuanNcbi8vIG1vZHVsZSBpZCA9IDEzMFxuLy8gbW9kdWxlIGNodW5rcyA9IDIgMyIsInZhciBqYWRlID0gcmVxdWlyZShcIi9ob21lL3VidW50dS93b3Jrc3BhY2Uvbm9kZV9tb2R1bGVzL2phZGUvbGliL3J1bnRpbWUuanNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJjYXJkXFxcIj48ZGl2IGNsYXNzPVxcXCJjYXJkLWhlYWRlclxcXCI+PHVsIGNsYXNzPVxcXCJuYXYgbmF2LXBpbGxzIGNhcmQtaGVhZGVyLXBpbGxzIGZsb2F0LXhzLWxlZnRcXFwiPjxsaSBjbGFzcz1cXFwibmF2LWl0ZW1cXFwiPjxhIGlkPVxcXCJjbGVhci1wbGlzdC1idG5cXFwiIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJuYXYtbGlua1xcXCI+0J7Rh9C40YHRgtC40YLRjDwvYT48L2xpPjwvdWw+PC9kaXY+PGRpdiBjbGFzcz1cXFwiY2FyZC1ibG9ja1xcXCI+PGg0IGNsYXNzPVxcXCJjYXJkLXRpdGxlXFxcIj4gPC9oND48ZGl2IGNsYXNzPVxcXCJjYXJkLXRleHRcXFwiPjxoND7QodC/0LjRgdC+0LpcXHQ8dWwgaWQ9XFxcInBhdGgtbGlzdFxcXCIgY2xhc3M9XFxcImxpc3QtZ3JvdXBcXFwiPjwvdWw+PC9oND48L2Rpdj48IS0taW5wdXQjZXhlY2VtYWlsLmZvcm0tY29udHJvbCh0eXBlPSdlbWFpbCcpLS0+PGEgaWQ9XFxcImNyZWF0ZS1wYXRoLWJ0blxcXCIgaHJlZj1cXFwiI1xcXCIgY2xhc3M9XFxcImJ0biBidG4tcHJpbWFyeVxcXCI+0YHQvtC30LTQsNGC0Ywg0LzQsNGA0YjRgNGD0YI8L2E+PC9kaXY+PGRpdiBjbGFzcz1cXFwiY2FyZC1mb290ZXIgdGV4dC1tdXRlZFxcXCI+PGEgaWQ9XFxcInByaW50LXBhdGgtYnRuXFxcIiBocmVmPVxcXCIjXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1wcmltYXJ5XFxcIj7Qv9C10YfQsNGC0LDRgtGMPC9hPjxhIGlkPVxcXCJvdGhlci1wYXRoLWJ0blxcXCIgaHJlZj1cXFwiI1xcXCIgY2xhc3M9XFxcImJ0biBidG4tZGVmYXVsdFxcXCI+0LXRidC1INGH0LXQs9C+LdGC0L48L2E+PC9kaXY+PC9kaXY+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvanMvZGV2L3BtL3ZpZXcvcGF0aExpc3QuamFkZVxuLy8gbW9kdWxlIGlkID0gMTMxXG4vLyBtb2R1bGUgY2h1bmtzID0gMiAzIiwidmFyIGphZGUgPSByZXF1aXJlKFwiL2hvbWUvdWJ1bnR1L3dvcmtzcGFjZS9ub2RlX21vZHVsZXMvamFkZS9saWIvcnVudGltZS5qc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKGRhdGEpIHtcbmJ1Zi5wdXNoKFwiPGxpXCIgKyAoamFkZS5hdHRyKFwiZGF0YS1wby1pZFwiLCAnJyArIChkYXRhLnBvc3RhbENvZGUpICsgJycsIHRydWUsIHRydWUpKSArIFwiIGNsYXNzPVxcXCJsaXN0LWdyb3VwLWl0ZW0gbGlzdC1ncm91cC1pdGVtLWFjdGlvblxcXCI+XCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gZGF0YS5wb3N0YWxDb2RlKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCI8YSBocmVmPVxcXCIjXFxcIiBjbGFzcz1cXFwicmVtb3ZlLXBvLWxpc3RcXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS10cmFzaC1vIGZhLWZ3XFxcIj48L2k+PC9hPjxpIHN0eWxlPVxcXCJmbG9hdDpsZWZ0XFxcIiBjbGFzcz1cXFwiZmEgZmEtc3Bpbm5lciBmYS1wdWxzZSBmYS1md1xcXCI+PC9pPjwvbGk+XCIpO30uY2FsbCh0aGlzLFwiZGF0YVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguZGF0YTp0eXBlb2YgZGF0YSE9PVwidW5kZWZpbmVkXCI/ZGF0YTp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2pzL2Rldi9wbS92aWV3L2xpc3RFbC5qYWRlXG4vLyBtb2R1bGUgaWQgPSAxMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAyIDMiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCIvaG9tZS91YnVudHUvd29ya3NwYWNlL25vZGVfbW9kdWxlcy9qYWRlL2xpYi9ydW50aW1lLmpzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAoZGF0YSwgdW5kZWZpbmVkKSB7XG5idWYucHVzaChcIjx1bD5cIik7XG4vLyBpdGVyYXRlIGRhdGFcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gZGF0YTtcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGV2bnQgPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIjxsaVwiICsgKGphZGUuYXR0cihcImRhdGEtZXZudC1pZFwiLCAnJyArIChldm50Ll9pZCkgKyAnJywgdHJ1ZSwgdHJ1ZSkpICsgXCIgY2xhc3M9XFxcImV2bnQtbGlcXFwiPlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IGV2bnQudGl0bGUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIjxhIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJzaG93LWV2bnQtZGV0YWlsXFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtc2VhcmNoIGZhLWZ3XFxcIj48L2k+PC9hPjxhIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJyZW1vdmUtZXZudC1saXN0XFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtdHJhc2gtbyBmYS1md1xcXCI+PC9pPjwvYT48L2xpPlwiKTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBldm50ID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8bGlcIiArIChqYWRlLmF0dHIoXCJkYXRhLWV2bnQtaWRcIiwgJycgKyAoZXZudC5faWQpICsgJycsIHRydWUsIHRydWUpKSArIFwiIGNsYXNzPVxcXCJldm50LWxpXFxcIj5cIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBldm50LnRpdGxlKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCI8YSBocmVmPVxcXCIjXFxcIiBjbGFzcz1cXFwic2hvdy1ldm50LWRldGFpbFxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLXNlYXJjaCBmYS1md1xcXCI+PC9pPjwvYT48YSBocmVmPVxcXCIjXFxcIiBjbGFzcz1cXFwicmVtb3ZlLWV2bnQtbGlzdFxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLXRyYXNoLW8gZmEtZndcXFwiPjwvaT48L2E+PC9saT5cIik7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbmJ1Zi5wdXNoKFwiPC91bD5cIik7fS5jYWxsKHRoaXMsXCJkYXRhXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5kYXRhOnR5cGVvZiBkYXRhIT09XCJ1bmRlZmluZWRcIj9kYXRhOnVuZGVmaW5lZCxcInVuZGVmaW5lZFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgudW5kZWZpbmVkOnR5cGVvZiB1bmRlZmluZWQhPT1cInVuZGVmaW5lZFwiP3VuZGVmaW5lZDp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2pzL2Rldi9wbS92aWV3L3N1Ymxpc3QuamFkZVxuLy8gbW9kdWxlIGlkID0gMTMzXG4vLyBtb2R1bGUgY2h1bmtzID0gMiAzIiwidmFyIGphZGUgPSByZXF1aXJlKFwiL2hvbWUvdWJ1bnR1L3dvcmtzcGFjZS9ub2RlX21vZHVsZXMvamFkZS9saWIvcnVudGltZS5qc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKGRhdGEsIHVuZGVmaW5lZCkge1xuLy8gaXRlcmF0ZSBkYXRhXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IGRhdGE7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBwbyA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiXCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gcG8ucG9zdGFsQ29kZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiIFxcXFxiclwiKTtcbmlmIChwby5ldm50cy5sZW5ndGg+MClcbntcbi8vIGl0ZXJhdGUgcG8uZXZudHNcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gcG8uZXZudHM7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBldm50ID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCJcIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBldm50LnRpdGxlKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCIgXFxcXGJyXCIpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIGV2bnQgPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IGV2bnQudGl0bGUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIiBcXFxcYnJcIik7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbn1cbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBwbyA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiXCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gcG8ucG9zdGFsQ29kZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiIFxcXFxiclwiKTtcbmlmIChwby5ldm50cy5sZW5ndGg+MClcbntcbi8vIGl0ZXJhdGUgcG8uZXZudHNcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gcG8uZXZudHM7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBldm50ID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCJcIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBldm50LnRpdGxlKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCIgXFxcXGJyXCIpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIGV2bnQgPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IGV2bnQudGl0bGUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIiBcXFxcYnJcIik7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbn1cbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcbn0uY2FsbCh0aGlzLFwiZGF0YVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguZGF0YTp0eXBlb2YgZGF0YSE9PVwidW5kZWZpbmVkXCI/ZGF0YTp1bmRlZmluZWQsXCJ1bmRlZmluZWRcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnVuZGVmaW5lZDp0eXBlb2YgdW5kZWZpbmVkIT09XCJ1bmRlZmluZWRcIj91bmRlZmluZWQ6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy9qcy9kZXYvcG0vdmlldy9wZGZQYXRoTGlzdC5qYWRlXG4vLyBtb2R1bGUgaWQgPSAxMzRcbi8vIG1vZHVsZSBjaHVua3MgPSAyIDMiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCIvaG9tZS91YnVudHUvd29ya3NwYWNlL25vZGVfbW9kdWxlcy9qYWRlL2xpYi9ydW50aW1lLmpzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPGRpdiBpZD1cXFwibW9kYWxcXFwiIHRhYmluZGV4PVxcXCItMVxcXCIgcm9sZT1cXFwiZGlhbG9nXFxcIiBhcmlhLWxhYmVsbGVkYnk9XFxcIm15TW9kYWxMYWJlbFxcXCIgYXJpYS1oaWRkZW49XFxcInRydWVcXFwiIGNsYXNzPVxcXCJtb2RhbCBmYWRlXFxcIj48ZGl2IHJvbGU9XFxcImRvY3VtZW50XFxcIiBjbGFzcz1cXFwibW9kYWwtZGlhbG9nXFxcIj48ZGl2IGNsYXNzPVxcXCJtb2RhbC1jb250ZW50XFxcIj48ZGl2IGNsYXNzPVxcXCJtb2RhbC1oZWFkZXJcXFwiPjxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBkYXRhLWRpc21pc3M9XFxcIm1vZGFsXFxcIiBhcmlhLWxhYmVsPVxcXCJDbG9zZVxcXCIgY2xhc3M9XFxcImNsb3NlXFxcIj48c3BhbiBhcmlhLWhpZGRlbj1cXFwidHJ1ZVxcXCI+w5c8L3NwYW4+PC9idXR0b24+PGg0IGlkPVxcXCJteU1vZGFsTGFiZWxcXFwiIGNsYXNzPVxcXCJtb2RhbC10aXRsZVxcXCI+0KDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjQtS/Rg9C00LDQu9C10L3QuNC1PC9oND48L2Rpdj48ZGl2IGNsYXNzPVxcXCJtb2RhbC1ib2R5XFxcIj48Zm9ybSBhY3Rpb249XFxcIlxcXCI+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7Qt9Cw0LPQvtC70L7QstC+0Lo8L2xhYmVsPjxpbnB1dCBpZD1cXFwiZXZlbnQtdGl0bGVcXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0L3QsNGH0LDQu9C+PC9sYWJlbD48aW5wdXQgaWQ9XFxcImRhdGViZWdpblxcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbCBmbGF0cGlja3JcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0L7QutC+0L3Rh9Cw0L3QuNC1PC9sYWJlbD48aW5wdXQgaWQ9XFxcImRhdGVlbmRcXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2wgZmxhdHBpY2tyXFxcIj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj48bGFiZWwgZm9yPVxcXCJcXFwiPtC+0YLQtNC10LvQtdC90LjQtSDQv9C+0LvRg9GH0LDRgtC10LvRjDwvbGFiZWw+PGlucHV0IGlkPVxcXCJwb3N0Y29kZVxcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7QvtC/0LjRgdCw0L3QuNC1PC9sYWJlbD48aW5wdXQgaWQ9XFxcImRlc2NyaXB0aW9uXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj48bGFiZWwgZm9yPVxcXCJcXFwiPtGB0YLQsNGC0YPRgTwvbGFiZWw+PGlucHV0IGlkPVxcXCJzdGF0dXNcXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0LjRgdC/0L7Qu9C90LjRgtC10LvRjDwvbGFiZWw+PGlucHV0IGlkPVxcXCJleGVjdXRvclxcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+PC9kaXY+PC9mb3JtPjwvZGl2PjxkaXYgY2xhc3M9XFxcIm1vZGFsLWZvb3RlclxcXCI+PGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGRhdGEtZGlzbWlzcz1cXFwibW9kYWxcXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+Q2xvc2U8L2J1dHRvbj48IS0tYnV0dG9uI3NhdmUtZXZlbnQtYnRuLmJ0bi5idG4tcHJpbWFyeSh0eXBlPSdidXR0b24nKSBTYXZlIGNoYW5nZXMtLT48IS0tYnV0dG9uI2RlbGV0ZS1ldmVudC1idG4uYnRuLmJ0bi1kYW5nZXIodHlwZT0nYnV0dG9uJykgRGVsZXRlLS0+PC9kaXY+PC9kaXY+PC9kaXY+PC9kaXY+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvanMvZGV2L3BtL3ZpZXcvZWRpdGRlbEV2ZW50LmphZGVcbi8vIG1vZHVsZSBpZCA9IDEzNVxuLy8gbW9kdWxlIGNodW5rcyA9IDIgMyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblxuXHR0aGlzLl9tb2RhbCA9IHJlcXVpcmUoJy4uL3ZpZXcvbmV3RXZlbnQuamFkZScpO1xuXG5cdHRoaXMuZGVzdHJveU1vZGFsID0gZnVuY3Rpb24oKSB7XG5cblx0XHQkKFwiI3NhdmUtZXZlbnQtYnRuXCIpLm9mZignY2xpY2snKTtcblx0XHQkKCcjY2xvc2UtbW9kYWwtYnRuJykub2ZmKCdjbGljaycpO1xuXHRcdCQoJyNjbG9zZS1tb2RhbC1jcm9zcy1idG4nKS5vZmYoJ2NsaWNrJyk7XG5cdFx0JCgnLm1vZGFsLXBsYWNlJykuaHRtbCgnJyk7XG5cdH07XG5cblx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdHRoaXMuaW5pdCA9IGZ1bmN0aW9uKCkge1xuXG5cdFx0JCgnLm1vZGFsLXBsYWNlJykuaHRtbCh0aGlzLl9tb2RhbCgpKTtcblx0XHQkKFwiLmZsYXRwaWNrclwiKS5mbGF0cGlja3Ioe1xuXHRcdFx0ZW5hYmxlVGltZTogdHJ1ZSxcblx0XHR9KTtcblxuXHRcdCQoXCIjc2F2ZS1ldmVudC1idG5cIikub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuXG5cdFx0XHR2YXIgbXVsdGkgPSAkKCcjcG9zdGNvZGUnKS52YWwoKS5zcGxpdChcIjtcIik7XG5cdFx0XHRpZiAobXVsdGkubGVuZ3RoID4gMSkge1xuXHRcdFx0XHR2YXIgZXZudHMgPSBbXTtcblx0XHRcdFx0bXVsdGkuZm9yRWFjaChmdW5jdGlvbihwb0NvZGUpIHtcblx0XHRcdFx0XHR2YXIgZXZudCA9IHtcblx0XHRcdFx0XHRcdHRpdGxlOiAkKCcjZXZlbnQtdGl0bGUnKS52YWwoKSxcblx0XHRcdFx0XHRcdHN0YXJ0OiBtb21lbnQoJCgnI2RhdGViZWdpbicpLnZhbCgpKSxcblx0XHRcdFx0XHRcdGVuZDogbW9tZW50KCQoJyNkYXRlZW5kJykudmFsKCkpLFxuXHRcdFx0XHRcdFx0cG9zdGFsQ29kZTogcG9Db2RlLFxuXHRcdFx0XHRcdFx0c3RhdHVzOiAkKCcjc3RhdHVzJykudmFsKCksXG5cdFx0XHRcdFx0XHRkZXNjcmlwdGlvbjogJChcIiNkZXNjcmlwdGlvblwiKS52YWwoKSxcblx0XHRcdFx0XHRcdGV4ZWN1dG9yOiAkKCcjZXhlY3V0b3InKS52YWwoKVxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0ZXZudHMucHVzaChldm50KTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdFxuXHRcdFx0XHQkLmFqYXgoe1xuXHRcdFx0XHRcdHR5cGU6ICdQT1NUJyxcblx0XHRcdFx0XHR1cmw6ICcvdXNlcnMvc2F2ZS9tdWx0aScsXG5cdFx0XHRcdFx0ZGF0YTogSlNPTi5zdHJpbmdpZnkoZXZudHMpLFxuXHRcdFx0XHRcdGRhdGFUeXBlOiBcImpzb25cIixcblx0XHRcdFx0XHRjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG5cdFx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coXCJkYXRhIHNhdmVcIik7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHQvL2Vycm9yOiBhamF4RXJyb3Jcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0dmFyIGV2bnQgPSB7XG5cdFx0XHRcdFx0dGl0bGU6ICQoJyNldmVudC10aXRsZScpLnZhbCgpLFxuXHRcdFx0XHRcdHN0YXJ0OiBtb21lbnQoJCgnI2RhdGViZWdpbicpLnZhbCgpKSxcblx0XHRcdFx0XHRlbmQ6IG1vbWVudCgkKCcjZGF0ZWVuZCcpLnZhbCgpKSxcblx0XHRcdFx0XHRwb3N0YWxDb2RlOiAkKCcjcG9zdGNvZGUnKS52YWwoKSxcblx0XHRcdFx0XHRzdGF0dXM6ICQoJyNzdGF0dXMnKS52YWwoKSxcblx0XHRcdFx0XHRkZXNjcmlwdGlvbjogJChcIiNkZXNjcmlwdGlvblwiKS52YWwoKSxcblx0XHRcdFx0XHRleGVjdXRvcjogJCgnI2V4ZWN1dG9yJykudmFsKClcblx0XHRcdFx0fTtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJhZGQgZXZlbnRcIik7XG5cdFx0XHRcdC8vJCgnI2NhbGVuZGFyJykuZnVsbENhbGVuZGFyKCdyZW5kZXJFdmVudCcsIGV2bnQsIHRydWUpO1xuXG5cdFx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdFx0dHlwZTogJ1BPU1QnLFxuXHRcdFx0XHRcdHVybDogJy91c2Vycy9zYXZlJyxcblx0XHRcdFx0XHRkYXRhOiBKU09OLnN0cmluZ2lmeShldm50KSxcblx0XHRcdFx0XHRkYXRhVHlwZTogXCJqc29uXCIsXG5cdFx0XHRcdFx0Y29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuXHRcdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiZGF0YSBzYXZlXCIpO1xuXHRcdFx0XHRcdFx0Ly92YXIgZXZudEFycmF5ID0gJCgnI2NhbGVuZGFyJykuZnVsbENhbGVuZGFyKCdjbGllbnRFdmVudHMnKTtcblx0XHRcdFx0XHRcdC8vdmFyIF9ldm50ID0gZXZudEFycmF5W2V2bnRBcnJheS5sZW5ndGggLSAxXTtcblx0XHRcdFx0XHRcdC8vXHRfZXZudC5faWQgPSBkYXRhLmluc2VydGVkaWQ7XG5cblx0XHRcdFx0XHRcdC8vXHQkKCcjY2FsZW5kYXInKS5mdWxsQ2FsZW5kYXIoJ3VwZGF0ZUV2ZW50JywgX2V2bnQpO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0Ly9lcnJvcjogYWpheEVycm9yXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cblx0XHR9KTtcblxuXHRcdCQoJyNjbG9zZS1tb2RhbC1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cblx0XHR9KTtcblxuXHRcdCQoJyNjbG9zZS1tb2RhbC1jcm9zcy1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cblx0XHR9KTtcblxuXHRcdCQoJyNtb2RhbCcpLm1vZGFsKCdzaG93Jyk7XG5cblx0XHQvLyQoJyNkYXRlYmVnaW4nKS52YWwoc3RhcnQuZm9ybWF0KCdZWVlZLU1NLUREIGhoOm1tJykpO1xuXHRcdC8vJCgnI2RhdGVlbmQnKS52YWwoZW5kLmZvcm1hdCgnWVlZWS1NTS1ERCBoaDptbScpKTtcblxuXHRcdCQoJyNtb2RhbCcpLm9uKCdoaWRkZW4uYnMubW9kYWwnLCBmdW5jdGlvbihlKSB7XG5cdFx0XHRjb25zb2xlLmxvZygnbW9kYWwgaGlkZScpO1xuXHRcdFx0c2VsZi5kZXN0cm95TW9kYWwoKTtcblx0XHR9KTtcblxuXHR9O1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvanMvZGV2L3BtL21vZHVsZS9uZXdFdmVudC5qc1xuLy8gbW9kdWxlIGlkID0gMTM2XG4vLyBtb2R1bGUgY2h1bmtzID0gMiAzIiwidmFyIGphZGUgPSByZXF1aXJlKFwiL2hvbWUvdWJ1bnR1L3dvcmtzcGFjZS9ub2RlX21vZHVsZXMvamFkZS9saWIvcnVudGltZS5qc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIjxkaXYgaWQ9XFxcIm1vZGFsXFxcIiB0YWJpbmRleD1cXFwiLTFcXFwiIHJvbGU9XFxcImRpYWxvZ1xcXCIgYXJpYS1sYWJlbGxlZGJ5PVxcXCJteU1vZGFsTGFiZWxcXFwiIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIiBjbGFzcz1cXFwibW9kYWwgZmFkZVxcXCI+PGRpdiByb2xlPVxcXCJkb2N1bWVudFxcXCIgY2xhc3M9XFxcIm1vZGFsLWRpYWxvZ1xcXCI+PGRpdiBjbGFzcz1cXFwibW9kYWwtY29udGVudFxcXCI+PGRpdiBjbGFzcz1cXFwibW9kYWwtaGVhZGVyXFxcIj48YnV0dG9uIGlkPVxcXCJjbG9zZS1tb2RhbC1jcm9zcy1idG5cXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgZGF0YS1kaXNtaXNzPVxcXCJtb2RhbFxcXCIgYXJpYS1sYWJlbD1cXFwiQ2xvc2VcXFwiIGNsYXNzPVxcXCJjbG9zZVxcXCI+PHNwYW4gYXJpYS1oaWRkZW49XFxcInRydWVcXFwiPsOXPC9zcGFuPjwvYnV0dG9uPjxoNCBpZD1cXFwibXlNb2RhbExhYmVsXFxcIiBjbGFzcz1cXFwibW9kYWwtdGl0bGVcXFwiPtCh0L7Qt9C00LDQvdC40LU8L2g0PjwvZGl2PjxkaXYgY2xhc3M9XFxcIm1vZGFsLWJvZHlcXFwiPjxmb3JtIGFjdGlvbj1cXFwiXFxcIj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj48bGFiZWwgZm9yPVxcXCJcXFwiPtC30LDQs9C+0LvQvtCy0L7QujwvbGFiZWw+PGlucHV0IGlkPVxcXCJldmVudC10aXRsZVxcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7QvdCw0YfQsNC70L48L2xhYmVsPjxpbnB1dCBpZD1cXFwiZGF0ZWJlZ2luXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sIGZsYXRwaWNrclxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7QvtC60L7QvdGH0LDQvdC40LU8L2xhYmVsPjxpbnB1dCBpZD1cXFwiZGF0ZWVuZFxcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbCBmbGF0cGlja3JcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0L7RgtC00LXQu9C10L3QuNC1INC/0L7Qu9GD0YfQsNGC0LXQu9GMPC9sYWJlbD48aW5wdXQgaWQ9XFxcInBvc3Rjb2RlXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj48bGFiZWwgZm9yPVxcXCJcXFwiPtC+0L/QuNGB0LDQvdC40LU8L2xhYmVsPjxpbnB1dCBpZD1cXFwiZGVzY3JpcHRpb25cXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0YHRgtCw0YLRg9GBPC9sYWJlbD48aW5wdXQgaWQ9XFxcInN0YXR1c1xcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7QuNGB0L/QvtC70L3QuNGC0LXQu9GMPC9sYWJlbD48aW5wdXQgaWQ9XFxcImV4ZWN1dG9yXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIj48L2Rpdj48L2Zvcm0+PC9kaXY+PGRpdiBjbGFzcz1cXFwibW9kYWwtZm9vdGVyXFxcIj48YnV0dG9uIGlkPVxcXCJjbG9zZS1tb2RhbC1idG5cXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgZGF0YS1kaXNtaXNzPVxcXCJtb2RhbFxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj5DbG9zZTwvYnV0dG9uPjxidXR0b24gaWQ9XFxcInNhdmUtZXZlbnQtYnRuXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXByaW1hcnlcXFwiPlNhdmUgY2hhbmdlczwvYnV0dG9uPjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2PlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2pzL2Rldi9wbS92aWV3L25ld0V2ZW50LmphZGVcbi8vIG1vZHVsZSBpZCA9IDEzN1xuLy8gbW9kdWxlIGNodW5rcyA9IDIgMyJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDclBBOzs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDeE1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3pOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMvRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzdHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Iiwic291cmNlUm9vdCI6IiJ9