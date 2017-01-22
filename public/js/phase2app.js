webpackJsonp([3],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	//module.exports = function() {
	console.log('hi phase2 codename');


	$(document).ready(function() {	

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGhhc2UyYXBwLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2Rldi9wbS9waGFzZTJhcHAuanMiLCJ3ZWJwYWNrOi8vLy4vfi9qYWRlL2xpYi9ydW50aW1lLmpzPzEyZDAiLCJ3ZWJwYWNrOi8vL2ZzIChpZ25vcmVkKT80NGI3Iiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9kZXYvcG0vbW9kdWxlL21hcDRwLmpzPzNiZTIiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2Rldi9wbS92aWV3L21hcC5qYWRlP2ZiNGEiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2Rldi9wbS9tb2R1bGUvcG9EZXRhaWwuanM/MTFmYyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3BtL3ZpZXcvcG9EZXRhaWwuamFkZT9iMTg1Iiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9kZXYvcG0vbW9kdWxlL3BhdGhMaXN0LmpzPzgxMWUiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2Rldi9wbS92aWV3L3BhdGhMaXN0LmphZGU/ZmY3NCIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3BtL3ZpZXcvbGlzdEVsLmphZGU/M2JiYSIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3BtL3ZpZXcvc3VibGlzdC5qYWRlP2EwNjAiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2Rldi9wbS92aWV3L3BkZlBhdGhMaXN0LmphZGU/MGI3MSIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3BtL3ZpZXcvZWRpdGRlbEV2ZW50LmphZGU/YTgxOSIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3BtL21vZHVsZS9uZXdFdmVudC5qcz8wOTFhIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9kZXYvcG0vdmlldy9uZXdFdmVudC5qYWRlPzcwZmMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy9tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG5jb25zb2xlLmxvZygnaGkgcGhhc2UyIGNvZGVuYW1lJyk7XHJcblxyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHRcclxuXHJcblx0dmFyIG15TWFwPXJlcXVpcmUoJy4vbW9kdWxlL21hcDRwLmpzJyk7XHRcclxuXHR5bWFwcy5yZWFkeShpbml0KTtcclxuXHR2YXIgX215TWFwO1xyXG5cdHZhciBuZXZudD1yZXF1aXJlKCcuL21vZHVsZS9uZXdFdmVudC5qcycpO1xyXG5cclxuXHRmdW5jdGlvbiBpbml0KCkge1xyXG5cdFx0XHJcblx0XHRfbXlNYXA9bXlNYXAoKTtcclxuXHJcblx0XHQkKCcjbWFwLWxvYWQtbGluaycpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcblx0XHRcdF9teU1hcC5kZXN0cm95KCk7XHJcblx0XHRcdF9teU1hcD1udWxsO1xyXG5cdFx0XHRfbXlNYXA9bXlNYXAoKTtcclxuXHJcblx0XHR9KTtcclxuXHJcblx0XHQkKCcjbmV3LWV2bnQtbGluaycpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG5cdFx0XHR2YXIgX25ldm50PSBuZXcgbmV2bnQoKTtcclxuXHRcdFx0X25ldm50LmluaXQoKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblxyXG5cclxufSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvanMvZGV2L3BtL3BoYXNlMmFwcC5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDMiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogTWVyZ2UgdHdvIGF0dHJpYnV0ZSBvYmplY3RzIGdpdmluZyBwcmVjZWRlbmNlXG4gKiB0byB2YWx1ZXMgaW4gb2JqZWN0IGBiYC4gQ2xhc3NlcyBhcmUgc3BlY2lhbC1jYXNlZFxuICogYWxsb3dpbmcgZm9yIGFycmF5cyBhbmQgbWVyZ2luZy9qb2luaW5nIGFwcHJvcHJpYXRlbHlcbiAqIHJlc3VsdGluZyBpbiBhIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYVxuICogQHBhcmFtIHtPYmplY3R9IGJcbiAqIEByZXR1cm4ge09iamVjdH0gYVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5tZXJnZSA9IGZ1bmN0aW9uIG1lcmdlKGEsIGIpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICB2YXIgYXR0cnMgPSBhWzBdO1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYS5sZW5ndGg7IGkrKykge1xuICAgICAgYXR0cnMgPSBtZXJnZShhdHRycywgYVtpXSk7XG4gICAgfVxuICAgIHJldHVybiBhdHRycztcbiAgfVxuICB2YXIgYWMgPSBhWydjbGFzcyddO1xuICB2YXIgYmMgPSBiWydjbGFzcyddO1xuXG4gIGlmIChhYyB8fCBiYykge1xuICAgIGFjID0gYWMgfHwgW107XG4gICAgYmMgPSBiYyB8fCBbXTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYWMpKSBhYyA9IFthY107XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGJjKSkgYmMgPSBbYmNdO1xuICAgIGFbJ2NsYXNzJ10gPSBhYy5jb25jYXQoYmMpLmZpbHRlcihudWxscyk7XG4gIH1cblxuICBmb3IgKHZhciBrZXkgaW4gYikge1xuICAgIGlmIChrZXkgIT0gJ2NsYXNzJykge1xuICAgICAgYVtrZXldID0gYltrZXldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBhO1xufTtcblxuLyoqXG4gKiBGaWx0ZXIgbnVsbCBgdmFsYHMuXG4gKlxuICogQHBhcmFtIHsqfSB2YWxcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBudWxscyh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPSBudWxsICYmIHZhbCAhPT0gJyc7XG59XG5cbi8qKlxuICogam9pbiBhcnJheSBhcyBjbGFzc2VzLlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuam9pbkNsYXNzZXMgPSBqb2luQ2xhc3NlcztcbmZ1bmN0aW9uIGpvaW5DbGFzc2VzKHZhbCkge1xuICByZXR1cm4gKEFycmF5LmlzQXJyYXkodmFsKSA/IHZhbC5tYXAoam9pbkNsYXNzZXMpIDpcbiAgICAodmFsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSA/IE9iamVjdC5rZXlzKHZhbCkuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIHZhbFtrZXldOyB9KSA6XG4gICAgW3ZhbF0pLmZpbHRlcihudWxscykuam9pbignICcpO1xufVxuXG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gY2xhc3Nlcy5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBjbGFzc2VzXG4gKiBAcGFyYW0ge0FycmF5LjxCb29sZWFuPn0gZXNjYXBlZFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmNscyA9IGZ1bmN0aW9uIGNscyhjbGFzc2VzLCBlc2NhcGVkKSB7XG4gIHZhciBidWYgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbGFzc2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGVzY2FwZWQgJiYgZXNjYXBlZFtpXSkge1xuICAgICAgYnVmLnB1c2goZXhwb3J0cy5lc2NhcGUoam9pbkNsYXNzZXMoW2NsYXNzZXNbaV1dKSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBidWYucHVzaChqb2luQ2xhc3NlcyhjbGFzc2VzW2ldKSk7XG4gICAgfVxuICB9XG4gIHZhciB0ZXh0ID0gam9pbkNsYXNzZXMoYnVmKTtcbiAgaWYgKHRleHQubGVuZ3RoKSB7XG4gICAgcmV0dXJuICcgY2xhc3M9XCInICsgdGV4dCArICdcIic7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG59O1xuXG5cbmV4cG9ydHMuc3R5bGUgPSBmdW5jdGlvbiAodmFsKSB7XG4gIGlmICh2YWwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModmFsKS5tYXAoZnVuY3Rpb24gKHN0eWxlKSB7XG4gICAgICByZXR1cm4gc3R5bGUgKyAnOicgKyB2YWxbc3R5bGVdO1xuICAgIH0pLmpvaW4oJzsnKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdmFsO1xuICB9XG59O1xuLyoqXG4gKiBSZW5kZXIgdGhlIGdpdmVuIGF0dHJpYnV0ZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGVzY2FwZWRcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gdGVyc2VcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5hdHRyID0gZnVuY3Rpb24gYXR0cihrZXksIHZhbCwgZXNjYXBlZCwgdGVyc2UpIHtcbiAgaWYgKGtleSA9PT0gJ3N0eWxlJykge1xuICAgIHZhbCA9IGV4cG9ydHMuc3R5bGUodmFsKTtcbiAgfVxuICBpZiAoJ2Jvb2xlYW4nID09IHR5cGVvZiB2YWwgfHwgbnVsbCA9PSB2YWwpIHtcbiAgICBpZiAodmFsKSB7XG4gICAgICByZXR1cm4gJyAnICsgKHRlcnNlID8ga2V5IDoga2V5ICsgJz1cIicgKyBrZXkgKyAnXCInKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgfSBlbHNlIGlmICgwID09IGtleS5pbmRleE9mKCdkYXRhJykgJiYgJ3N0cmluZycgIT0gdHlwZW9mIHZhbCkge1xuICAgIGlmIChKU09OLnN0cmluZ2lmeSh2YWwpLmluZGV4T2YoJyYnKSAhPT0gLTEpIHtcbiAgICAgIGNvbnNvbGUud2FybignU2luY2UgSmFkZSAyLjAuMCwgYW1wZXJzYW5kcyAoYCZgKSBpbiBkYXRhIGF0dHJpYnV0ZXMgJyArXG4gICAgICAgICAgICAgICAgICAgJ3dpbGwgYmUgZXNjYXBlZCB0byBgJmFtcDtgJyk7XG4gICAgfTtcbiAgICBpZiAodmFsICYmIHR5cGVvZiB2YWwudG9JU09TdHJpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnNvbGUud2FybignSmFkZSB3aWxsIGVsaW1pbmF0ZSB0aGUgZG91YmxlIHF1b3RlcyBhcm91bmQgZGF0ZXMgaW4gJyArXG4gICAgICAgICAgICAgICAgICAgJ0lTTyBmb3JtIGFmdGVyIDIuMC4wJyk7XG4gICAgfVxuICAgIHJldHVybiAnICcgKyBrZXkgKyBcIj0nXCIgKyBKU09OLnN0cmluZ2lmeSh2YWwpLnJlcGxhY2UoLycvZywgJyZhcG9zOycpICsgXCInXCI7XG4gIH0gZWxzZSBpZiAoZXNjYXBlZCkge1xuICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbC50b0lTT1N0cmluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS53YXJuKCdKYWRlIHdpbGwgc3RyaW5naWZ5IGRhdGVzIGluIElTTyBmb3JtIGFmdGVyIDIuMC4wJyk7XG4gICAgfVxuICAgIHJldHVybiAnICcgKyBrZXkgKyAnPVwiJyArIGV4cG9ydHMuZXNjYXBlKHZhbCkgKyAnXCInO1xuICB9IGVsc2Uge1xuICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbC50b0lTT1N0cmluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS53YXJuKCdKYWRlIHdpbGwgc3RyaW5naWZ5IGRhdGVzIGluIElTTyBmb3JtIGFmdGVyIDIuMC4wJyk7XG4gICAgfVxuICAgIHJldHVybiAnICcgKyBrZXkgKyAnPVwiJyArIHZhbCArICdcIic7XG4gIH1cbn07XG5cbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBhdHRyaWJ1dGVzIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge09iamVjdH0gZXNjYXBlZFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmF0dHJzID0gZnVuY3Rpb24gYXR0cnMob2JqLCB0ZXJzZSl7XG4gIHZhciBidWYgPSBbXTtcblxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG5cbiAgaWYgKGtleXMubGVuZ3RoKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tpXVxuICAgICAgICAsIHZhbCA9IG9ialtrZXldO1xuXG4gICAgICBpZiAoJ2NsYXNzJyA9PSBrZXkpIHtcbiAgICAgICAgaWYgKHZhbCA9IGpvaW5DbGFzc2VzKHZhbCkpIHtcbiAgICAgICAgICBidWYucHVzaCgnICcgKyBrZXkgKyAnPVwiJyArIHZhbCArICdcIicpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBidWYucHVzaChleHBvcnRzLmF0dHIoa2V5LCB2YWwsIGZhbHNlLCB0ZXJzZSkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBidWYuam9pbignJyk7XG59O1xuXG4vKipcbiAqIEVzY2FwZSB0aGUgZ2l2ZW4gc3RyaW5nIG9mIGBodG1sYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaHRtbFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxudmFyIGphZGVfZW5jb2RlX2h0bWxfcnVsZXMgPSB7XG4gICcmJzogJyZhbXA7JyxcbiAgJzwnOiAnJmx0OycsXG4gICc+JzogJyZndDsnLFxuICAnXCInOiAnJnF1b3Q7J1xufTtcbnZhciBqYWRlX21hdGNoX2h0bWwgPSAvWyY8PlwiXS9nO1xuXG5mdW5jdGlvbiBqYWRlX2VuY29kZV9jaGFyKGMpIHtcbiAgcmV0dXJuIGphZGVfZW5jb2RlX2h0bWxfcnVsZXNbY10gfHwgYztcbn1cblxuZXhwb3J0cy5lc2NhcGUgPSBqYWRlX2VzY2FwZTtcbmZ1bmN0aW9uIGphZGVfZXNjYXBlKGh0bWwpe1xuICB2YXIgcmVzdWx0ID0gU3RyaW5nKGh0bWwpLnJlcGxhY2UoamFkZV9tYXRjaF9odG1sLCBqYWRlX2VuY29kZV9jaGFyKTtcbiAgaWYgKHJlc3VsdCA9PT0gJycgKyBodG1sKSByZXR1cm4gaHRtbDtcbiAgZWxzZSByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXG4gKiBSZS10aHJvdyB0aGUgZ2l2ZW4gYGVycmAgaW4gY29udGV4dCB0byB0aGVcbiAqIHRoZSBqYWRlIGluIGBmaWxlbmFtZWAgYXQgdGhlIGdpdmVuIGBsaW5lbm9gLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVyclxuICogQHBhcmFtIHtTdHJpbmd9IGZpbGVuYW1lXG4gKiBAcGFyYW0ge1N0cmluZ30gbGluZW5vXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLnJldGhyb3cgPSBmdW5jdGlvbiByZXRocm93KGVyciwgZmlsZW5hbWUsIGxpbmVubywgc3RyKXtcbiAgaWYgKCEoZXJyIGluc3RhbmNlb2YgRXJyb3IpKSB0aHJvdyBlcnI7XG4gIGlmICgodHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyB8fCAhZmlsZW5hbWUpICYmICFzdHIpIHtcbiAgICBlcnIubWVzc2FnZSArPSAnIG9uIGxpbmUgJyArIGxpbmVubztcbiAgICB0aHJvdyBlcnI7XG4gIH1cbiAgdHJ5IHtcbiAgICBzdHIgPSBzdHIgfHwgcmVxdWlyZSgnZnMnKS5yZWFkRmlsZVN5bmMoZmlsZW5hbWUsICd1dGY4JylcbiAgfSBjYXRjaCAoZXgpIHtcbiAgICByZXRocm93KGVyciwgbnVsbCwgbGluZW5vKVxuICB9XG4gIHZhciBjb250ZXh0ID0gM1xuICAgICwgbGluZXMgPSBzdHIuc3BsaXQoJ1xcbicpXG4gICAgLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIGNvbnRleHQsIDApXG4gICAgLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIGNvbnRleHQpO1xuXG4gIC8vIEVycm9yIGNvbnRleHRcbiAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSl7XG4gICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyAnICA+ICcgOiAnICAgICcpXG4gICAgICArIGN1cnJcbiAgICAgICsgJ3wgJ1xuICAgICAgKyBsaW5lO1xuICB9KS5qb2luKCdcXG4nKTtcblxuICAvLyBBbHRlciBleGNlcHRpb24gbWVzc2FnZVxuICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCAnSmFkZScpICsgJzonICsgbGluZW5vXG4gICAgKyAnXFxuJyArIGNvbnRleHQgKyAnXFxuXFxuJyArIGVyci5tZXNzYWdlO1xuICB0aHJvdyBlcnI7XG59O1xuXG5leHBvcnRzLkRlYnVnSXRlbSA9IGZ1bmN0aW9uIERlYnVnSXRlbShsaW5lbm8sIGZpbGVuYW1lKSB7XG4gIHRoaXMubGluZW5vID0gbGluZW5vO1xuICB0aGlzLmZpbGVuYW1lID0gZmlsZW5hbWU7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vamFkZS9saWIvcnVudGltZS5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMiAzIiwiLyogKGlnbm9yZWQpICovXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZnMgKGlnbm9yZWQpXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAyIDMiLCIndXNlIHN0cmljdCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG5cdGNvbnNvbGUubG9nKCdtYXA0cC5qcycpO1xyXG5cclxuXHR2YXIgX21hcGphZGUgPSByZXF1aXJlKCcuLi92aWV3L21hcC5qYWRlJyk7XHJcblx0JCgnLmMtcGxhY2UnKS5odG1sKF9tYXBqYWRlKCkpO1xyXG5cclxuXHR2YXIgX3BvZGV0YWlsID0gcmVxdWlyZSgnLi4vbW9kdWxlL3BvRGV0YWlsLmpzJyk7XHJcblx0dmFyIHBvRGV0YWlsID0gbmV3IF9wb2RldGFpbCgpO1xyXG5cclxuXHR2YXIgX3BhdGhMaXN0ID0gcmVxdWlyZSgnLi4vbW9kdWxlL3BhdGhMaXN0LmpzJyk7XHJcblx0dmFyIHBhdGhMaXN0ID0gbmV3IF9wYXRoTGlzdCgpO1xyXG5cclxuXHR2YXIgX3NhdmUgPSB0cnVlO1xyXG5cdHZhciBfZXZlbnQsIF9wb3N0T2ZmaWNlQXJyO1xyXG5cdHZhciBteUNvbGxlY3Rpb24gPSBuZXcgeW1hcHMuR2VvT2JqZWN0Q29sbGVjdGlvbigpO1xyXG5cdHZhciBfcm91dGU7XHJcblxyXG5cdHZhciBteUJhbGxvb25Db250ZW50Qm9keUxheW91dCA9IHltYXBzLnRlbXBsYXRlTGF5b3V0RmFjdG9yeS5jcmVhdGVDbGFzcyhcclxuXHRcdCc8cD4kW3Byb3BlcnRpZXMuZGF0YS5wb3N0YWxDb2RlXTwvcD48cD4kW3Byb3BlcnRpZXMuZGF0YS5hZGRyZXNzU291cmNlXTwvcD48cD4kW3Byb3BlcnRpZXMuZGF0YS50eXBlQ29kZV08L3A+PHA+0LrQvtC7LdCy0L4g0LfQsNGP0LLQvtC6ICRbcHJvcGVydGllcy5kYXRhLmV2bnRUb3RhbF08L3A+PGJyIC8+PGJ1dHRvbiBpZD1cInNob3ctcG8tZGV0YWlsLWJ0blwiPtCf0L7QtNGA0L7QsdC90L48L2J1dHRvbj48YnIgLz48YnV0dG9uIGlkPVwiYWRkLXRvLXBhdGgtYnRuXCI+0JIg0YHQv9C40YHQvtC6PC9idXR0b24+Jywge1xyXG5cdFx0XHRidWlsZDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0bXlCYWxsb29uQ29udGVudEJvZHlMYXlvdXQuc3VwZXJjbGFzcy5idWlsZC5jYWxsKHRoaXMpO1xyXG5cdFx0XHRcdCQoJyNzaG93LXBvLWRldGFpbC1idG4nKS5vbignY2xpY2snLCB7XHJcblx0XHRcdFx0XHRcInBvXCI6IHRoaXMuX2RhdGEucHJvcGVydGllcy5fZGF0YVxyXG5cdFx0XHRcdH0sIHRoaXMub25TaG93UE9EZXRhaWxDbGljayk7XHJcblx0XHRcdFx0JCgnI2FkZC10by1wYXRoLWJ0bicpLm9uKCdjbGljaycsIHtcclxuXHRcdFx0XHRcdFwicG9cIjogdGhpcy5fZGF0YS5wcm9wZXJ0aWVzLl9kYXRhXHJcblx0XHRcdFx0fSwgdGhpcy5vbkFkZFRvUGF0aENsaWNrKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0Y2xlYXI6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdCQoJyNzaG93LXBvLWRldGFpbC1idG4nKS5vZmYoJ2NsaWNrJywgdGhpcy5vblNob3dQT0RldGFpbENsaWNrKTtcclxuXHRcdFx0XHRteUJhbGxvb25Db250ZW50Qm9keUxheW91dC5zdXBlcmNsYXNzLmNsZWFyLmNhbGwodGhpcyk7XHJcblx0XHRcdH0sXHJcblx0XHRcdG9uU2hvd1BPRGV0YWlsQ2xpY2s6IGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0XHRwb0RldGFpbC5pbml0KGUuZGF0YS5wby5kYXRhLCBteU1hcCk7XHJcblx0XHRcdH0sXHJcblx0XHRcdG9uQWRkVG9QYXRoQ2xpY2s6IGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0XHRwYXRoTGlzdC5hZGRFbGVtZW50KGUuZGF0YS5wby5kYXRhKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdHZhciBteU1hcCA9IG5ldyB5bWFwcy5NYXAoXCJtYXB5XCIsIHtcclxuXHRcdGNlbnRlcjogWzUwLjU5LCAzNi41OF0sXHJcblx0XHR6b29tOiAxMCxcclxuXHRcdGNvbnRyb2xzOiBbJ3JvdXRlRWRpdG9yJ11cclxuXHR9LCB7XHJcblx0XHRidXR0b25NYXhXaWR0aDogMTUwXHJcblx0fSk7XHJcblxyXG5cdGZ1bmN0aW9uIGNyZWF0ZVBhdGgoc2VsZWN0ZWRFbCkge1xyXG5cdFx0JCgnI3BvLWNlbnRyLWJ0bicpLm9mZigpO1xyXG5cdFx0X3Bvc3RPZmZpY2VBcnIgPSBbXTtcclxuXHRcdG15Q29sbGVjdGlvbi5yZW1vdmVBbGwoKTtcclxuXHRcdGlmIChfcm91dGUpXHJcblx0XHRcdG15TWFwLmdlb09iamVjdHMucmVtb3ZlKF9yb3V0ZSk7XHJcblxyXG5cdFx0dmFyIHBhdGhBcnIgPSBzZWxlY3RlZEVsLm1hcChmdW5jdGlvbihvdGQpIHtcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHR0eXBlOiAnd2F5UG9pbnQnLFxyXG5cdFx0XHRcdHBvaW50OiBbb3RkLmxhdGl0dWRlLCBvdGQubG9uZ2l0dWRlXVxyXG5cdFx0XHR9O1xyXG5cdFx0fSk7XHJcblx0XHR5bWFwcy5yb3V0ZShwYXRoQXJyKS50aGVuKFxyXG5cdFx0XHRmdW5jdGlvbihyb3V0ZSkge1xyXG5cdFx0XHRcdF9yb3V0ZSA9IHJvdXRlO1xyXG5cdFx0XHRcdG15TWFwLmdlb09iamVjdHMuYWRkKHJvdXRlKTtcclxuXHJcblx0XHRcdFx0dmFyIHBvaW50cyA9IHJvdXRlLmdldFdheVBvaW50cygpO1xyXG5cdFx0XHRcdHBvaW50cy5vcHRpb25zLnNldCgncHJlc2V0JywgJ2lzbGFuZHMjYmx1ZVN0cmV0Y2h5SWNvbicpO1xyXG5cdFx0XHRcdHBvaW50cy5lYWNoKGZ1bmN0aW9uKGVsLCBpKSB7XHJcblx0XHRcdFx0XHRlbC5wcm9wZXJ0aWVzLnNldCgnaWNvbkNvbnRlbnQnLCBzZWxlY3RlZEVsW2ldLnBvc3RhbENvZGUgKyBcIiDRgtC+0YfQutCwIOKEllwiICsgKGkgKyAxKSk7XHJcblx0XHRcdFx0XHRlbC5wcm9wZXJ0aWVzLnNldCgnYmFsbG9vbkNvbnRlbnQnLCBzZWxlY3RlZEVsW2ldLnBvc3RhbENvZGUgKyBcIiDRgtC+0YfQutCwIOKEllwiICsgKGkgKyAxKSk7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHR9LFxyXG5cdFx0XHRmdW5jdGlvbihlcnJvcikge1xyXG5cdFx0XHRcdGFsZXJ0KFwi0JLQvtC30L3QuNC60LvQsCDQvtGI0LjQsdC60LA6IFwiICsgZXJyb3IubWVzc2FnZSk7XHJcblx0XHRcdH1cclxuXHRcdCk7XHJcblxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gc29ydENvbXBhcmF0b3IoYSwgYikge1xyXG5cdFx0aWYgKHBhcnNlSW50KGEucG9zdGFsQ29kZSkgPiBwYXJzZUludChiLnBvc3RhbENvZGUpKSB7XHJcblx0XHRcdHJldHVybiAxO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHBhcnNlSW50KGEucG9zdGFsQ29kZSkgPCBwYXJzZUludChiLnBvc3RhbENvZGUpKSB7XHJcblx0XHRcdHJldHVybiAtMTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdCQuYWpheCh7XHJcblx0XHR0eXBlOiAnR0VUJyxcclxuXHRcdHVybDogXCIuL3Bvc3RhbHMuanNvblwiLFxyXG5cdFx0ZGF0YVR5cGU6IFwianNvblwiLFxyXG5cdFx0c3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG5cclxuXHRcdFx0ZGF0YS5zb3J0KHNvcnRDb21wYXJhdG9yKTtcclxuXHJcblx0XHRcdCQuYWpheCh7XHJcblx0XHRcdFx0dHlwZTogJ0dFVCcsXHJcblx0XHRcdFx0dXJsOiAnL2V2bnQvbXInLFxyXG5cdFx0XHRcdGRhdGFUeXBlOiAnanNvbicsXHJcblx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24obXJkYXRhKSB7XHJcblxyXG5cdFx0XHRcdFx0bXJkYXRhLnNvcnQoc29ydENvbXBhcmF0b3IpO1xyXG5cclxuXHRcdFx0XHRcdGRhdGEuZm9yRWFjaChmdW5jdGlvbihvdGQpIHtcclxuXHJcblx0XHRcdFx0XHRcdG90ZC5ldm50VG90YWwgPSAnMCc7XHJcblx0XHRcdFx0XHRcdG1yZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKG1yKSB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKG90ZC5wb3N0YWxDb2RlID09IG1yLl9pZCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0b3RkLmV2bnRUb3RhbCA9IG1yLmNvdW50O1xyXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0XHR2YXIgc3RsID0gJ2lzbGFuZHMjZGFya2dyZWVuU3RyZXRjaHlJY29uJztcclxuXHRcdFx0XHRcdFx0aWYgKG90ZC5ldm50VG90YWwgPj0gJzEnKSB7XHJcblx0XHRcdFx0XHRcdFx0c3RsID0gJ2lzbGFuZHMjZGFya2JsdWVTdHJldGNoeUljb24nO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGlmIChvdGQuZXZudFRvdGFsID49ICczJykge1xyXG5cdFx0XHRcdFx0XHRcdHN0bCA9ICdpc2xhbmRzI3Zpb2xldFN0cmV0Y2h5SWNvbic7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdHZhciBwbWFyayA9IG5ldyB5bWFwcy5QbGFjZW1hcmsoW290ZC5sYXRpdHVkZSwgb3RkLmxvbmdpdHVkZV0sIHtcclxuXHRcdFx0XHRcdFx0XHRkYXRhOiBvdGQsXHJcblx0XHRcdFx0XHRcdFx0aWNvbkNvbnRlbnQ6IG90ZC5wb3N0YWxDb2RlICsgXCIgLyBcIiArIG90ZC5ldm50VG90YWwsXHJcblx0XHRcdFx0XHRcdFx0aWNvbkNhcHRpb246IG90ZC5wb3N0YWxDb2RlXHJcblx0XHRcdFx0XHRcdH0sIHtcclxuXHRcdFx0XHRcdFx0XHRiYWxsb29uQ29udGVudExheW91dDogbXlCYWxsb29uQ29udGVudEJvZHlMYXlvdXQsXHJcblx0XHRcdFx0XHRcdFx0cHJlc2V0OiBzdGxcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdG15Q29sbGVjdGlvbi5hZGQocG1hcmspO1xyXG5cdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0X3Bvc3RPZmZpY2VBcnIgPSBkYXRhO1xyXG5cdFx0XHRcdFx0bXlNYXAuZ2VvT2JqZWN0cy5hZGQobXlDb2xsZWN0aW9uKTtcclxuXHRcdFx0XHRcdHBhdGhMaXN0LmluaXQoY3JlYXRlUGF0aCk7XHJcblxyXG5cclxuXHRcdFx0XHRcdCQoJyNwby1jZW50ci1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdFx0XHRcdHZhciBwb25vbSA9ICQoJyNwb251bScpLnZhbCgpO1xyXG5cdFx0XHRcdFx0XHRfcG9zdE9mZmljZUFyci5mb3JFYWNoKGZ1bmN0aW9uKHBvKSB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKHBvLnBvc3RhbENvZGUgPT0gcG9ub20pIHtcclxuXHRcdFx0XHRcdFx0XHRcdG15TWFwLnNldENlbnRlcihbcG8ubGF0aXR1ZGUsIHBvLmxvbmdpdHVkZV0sIDEzLCB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGNoZWNrWm9vbVJhbmdlOiB0cnVlXHJcblx0XHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0JCgnI2RvLWZpbHRlci1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdFx0XHRcdHZhciBfcmFuZ2UgPSAkKCdpbnB1dFtuYW1lPVwiZmlsdGVybWFwXCJdOmNoZWNrZWQnKS52YWwoKTtcclxuXHRcdFx0XHRcdFx0bXlDb2xsZWN0aW9uLnJlbW92ZUFsbCgpO1xyXG5cclxuXHRcdFx0XHRcdFx0ZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKG90ZCkge1xyXG5cdFx0XHRcdFx0XHRcdGlmIChvdGQuZXZudFRvdGFsID49IHBhcnNlSW50KF9yYW5nZSkpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHZhciBzdGwgPSAnaXNsYW5kcyNkYXJrZ3JlZW5TdHJldGNoeUljb24nO1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKG90ZC5ldm50VG90YWwgPj0gJzEnKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHN0bCA9ICdpc2xhbmRzI2RhcmtibHVlU3RyZXRjaHlJY29uJztcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdGlmIChvdGQuZXZudFRvdGFsID49ICczJykge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRzdGwgPSAnaXNsYW5kcyN2aW9sZXRTdHJldGNoeUljb24nO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdHZhciBwbWFyayA9IG5ldyB5bWFwcy5QbGFjZW1hcmsoW290ZC5sYXRpdHVkZSwgb3RkLmxvbmdpdHVkZV0sIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0ZGF0YTogb3RkLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRpY29uQ29udGVudDogb3RkLnBvc3RhbENvZGUgKyBcIiAvIFwiICsgb3RkLmV2bnRUb3RhbCxcclxuXHRcdFx0XHRcdFx0XHRcdFx0aWNvbkNhcHRpb246IG90ZC5wb3N0YWxDb2RlXHJcblx0XHRcdFx0XHRcdFx0XHR9LCB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGJhbGxvb25Db250ZW50TGF5b3V0OiBteUJhbGxvb25Db250ZW50Qm9keUxheW91dCxcclxuXHRcdFx0XHRcdFx0XHRcdFx0cHJlc2V0OiBzdGxcclxuXHRcdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRcdFx0bXlDb2xsZWN0aW9uLmFkZChwbWFyayk7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdG15TWFwLmdlb09iamVjdHMuYWRkKG15Q29sbGVjdGlvbik7XHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0fSk7XHJcblxyXG5cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGVycm9yOiBmdW5jdGlvbihlcnIpIHtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKGVycik7XHJcblxyXG5cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdH0sXHJcblx0XHQvL2Vycm9yOiBsb2FkRXJyb3JcclxuXHR9KTtcclxuXHJcblx0cmV0dXJuIG15TWFwO1xyXG59XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2pzL2Rldi9wbS9tb2R1bGUvbWFwNHAuanNcbi8vIG1vZHVsZSBpZCA9IDEyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDIgMyIsInZhciBqYWRlID0gcmVxdWlyZShcIkM6XFxcXF90ZW1wXFxcXHBjaHRcXFxcbm9kZV9tb2R1bGVzXFxcXGphZGVcXFxcbGliXFxcXHJ1bnRpbWUuanNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8ZGl2IGlkPVxcXCJtYXB5XFxcIiBzdHlsZT1cXFwid2lkdGg6IDEwMCU7IGhlaWdodDogODAwcHhcXFwiPjwvZGl2PlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2pzL2Rldi9wbS92aWV3L21hcC5qYWRlXG4vLyBtb2R1bGUgaWQgPSAxMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAyIDMiLCIndXNlIHNydGljdCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cz1mdW5jdGlvbigpe1xyXG5cclxuICB0aGlzLl9tb2RhbCA9IHJlcXVpcmUoJy4uL3ZpZXcvcG9EZXRhaWwuamFkZScpO1xyXG5cclxuICB0aGlzLmRlc3Ryb3lNb2RhbCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgXHJcbiAgICAkKCcjY2xvc2UtbW9kYWwtYnRuJykub2ZmKCdjbGljaycpO1xyXG4gICAgJCgnI2Nsb3NlLW1vZGFsLWNyb3NzLWJ0bicpLm9mZignY2xpY2snKTtcclxuICAgICQoJy5tb2RhbC1wbGFjZScpLmh0bWwoJycpO1xyXG4gIH07XHJcblxyXG4gIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgdGhpcy5pbml0ID0gZnVuY3Rpb24oZGF0YSwgbXlNYXApIHtcclxuXHJcbiAgICAkKCcubW9kYWwtcGxhY2UnKS5odG1sKHRoaXMuX21vZGFsKHtcImRhdGFcIjogZGF0YX0pKTtcclxuXHJcblxyXG4gICAgJCgnI2Nsb3NlLW1vZGFsLWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcjY2xvc2UtbW9kYWwtY3Jvc3MtYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgICQoJyNtb2RhbCcpLm1vZGFsKCdzaG93Jyk7XHJcblxyXG4gICAgJCgnI21vZGFsJykub24oJ2hpZGRlbi5icy5tb2RhbCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgY29uc29sZS5sb2coJ21vZGFsIGhpZGUnKTtcclxuICAgICAgc2VsZi5kZXN0cm95TW9kYWwoKTtcclxuICAgIH0pO1xyXG5cclxuICB9O1xyXG5cdFxyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvanMvZGV2L3BtL21vZHVsZS9wb0RldGFpbC5qc1xuLy8gbW9kdWxlIGlkID0gMTI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMiAzIiwidmFyIGphZGUgPSByZXF1aXJlKFwiQzpcXFxcX3RlbXBcXFxccGNodFxcXFxub2RlX21vZHVsZXNcXFxcamFkZVxcXFxsaWJcXFxccnVudGltZS5qc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKGRhdGEsIHVuZGVmaW5lZCkge1xuYnVmLnB1c2goXCI8ZGl2IGlkPVxcXCJtb2RhbFxcXCIgdGFiaW5kZXg9XFxcIi0xXFxcIiByb2xlPVxcXCJkaWFsb2dcXFwiIGFyaWEtbGFiZWxsZWRieT1cXFwibXlNb2RhbExhYmVsXFxcIiBhcmlhLWhpZGRlbj1cXFwidHJ1ZVxcXCIgY2xhc3M9XFxcIm1vZGFsIGZhZGVcXFwiPjxkaXYgcm9sZT1cXFwiZG9jdW1lbnRcXFwiIGNsYXNzPVxcXCJtb2RhbC1kaWFsb2dcXFwiPjxkaXYgY2xhc3M9XFxcIm1vZGFsLWNvbnRlbnRcXFwiPjxkaXYgY2xhc3M9XFxcIm1vZGFsLWhlYWRlclxcXCI+PGJ1dHRvbiBpZD1cXFwiY2xvc2UtbW9kYWwtY3Jvc3MtYnRuXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGRhdGEtZGlzbWlzcz1cXFwibW9kYWxcXFwiIGFyaWEtbGFiZWw9XFxcIkNsb3NlXFxcIiBjbGFzcz1cXFwiY2xvc2VcXFwiPjxzcGFuIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIj7Dlzwvc3Bhbj48L2J1dHRvbj48aDQgaWQ9XFxcIm15TW9kYWxMYWJlbFxcXCIgY2xhc3M9XFxcIm1vZGFsLXRpdGxlXFxcIj7QlNC10YLQsNC70YzQvdC+IC0gXCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gZGF0YS5wb3N0YWxDb2RlKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCI8L2g0PjwvZGl2PjxkaXYgY2xhc3M9XFxcIm1vZGFsLWJvZHlcXFwiPjxkaXYgY2xhc3M9XFxcImNhcmRcXFwiPjxoMyBjbGFzcz1cXFwiY2FyZC1oZWFkZXJcXFwiPlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IGRhdGEucG9zdGFsQ29kZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiPC9oMz48ZGl2IGNsYXNzPVxcXCJjYXJkLWJsb2NrXFxcIj48aDQgY2xhc3M9XFxcImNhcmQtdGl0bGVcXFwiPlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IGRhdGEucG9zdGFsQ29kZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiIFwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IGRhdGEuc2V0dGxlbWVudCkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiIFwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IGRhdGEuYWRkcmVzc1NvdXJjZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiPC9oND48ZGl2IGNsYXNzPVxcXCJjYXJkLXRleHRcXFwiPjxoND7Qn9GA0LXQtNC+0YHRgtCw0LLQu9GP0LXQvNGL0LUg0YPRgdC70YPQs9C4PC9oND48dWw+PC91bD5cIik7XG4vLyBpdGVyYXRlIGRhdGEuc2VydmljZUdyb3Vwc1xuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSBkYXRhLnNlcnZpY2VHcm91cHM7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBzZyA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGxpPlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IHNnLnNlcnZpY2VHcm91cE5hbWUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIjwvbGk+XCIpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIHNnID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8bGk+XCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gc2cuc2VydmljZUdyb3VwTmFtZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiPC9saT5cIik7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbmJ1Zi5wdXNoKFwiPGg0PtCi0LXQu9C10YTQvtC90Ys8L2g0Pjx1bD48L3VsPlwiKTtcbi8vIGl0ZXJhdGUgZGF0YS5waG9uZXNcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gZGF0YS5waG9uZXM7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBwaG9uZSA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGxpPiAoXCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gcGhvbmUucGhvbmVUb3duQ29kZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiKSBcIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBwaG9uZS5waG9uZU51bWJlcikgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiIChcIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBwaG9uZS5waG9uZVR5cGVOYW1lKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCIpPC9saT5cIik7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIgcGhvbmUgPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIjxsaT4gKFwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IHBob25lLnBob25lVG93bkNvZGUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIikgXCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gcGhvbmUucGhvbmVOdW1iZXIpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIiAoXCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gcGhvbmUucGhvbmVUeXBlTmFtZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiKTwvbGk+XCIpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG5idWYucHVzaChcIjxoND7QktGA0LXQvNGPINGA0LDQsdC+0YLRi1xcdFxcdDwvaDQ+PHVsPjwvdWw+XCIpO1xuLy8gaXRlcmF0ZSBkYXRhLndvcmtpbmdIb3Vyc1xuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSBkYXRhLndvcmtpbmdIb3VycztcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIHdoID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8bGk+XCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gd2gud2Vla0RheU5hbWUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIlxcdDwvbGk+XCIpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIHdoID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8bGk+XCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gd2gud2Vla0RheU5hbWUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIlxcdDwvbGk+XCIpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG5idWYucHVzaChcIjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XFxcIm1vZGFsLWZvb3RlclxcXCI+PGJ1dHRvbiBpZD1cXFwiY2xvc2UtbW9kYWwtYnRuXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGRhdGEtZGlzbWlzcz1cXFwibW9kYWxcXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+Q2xvc2U8L2J1dHRvbj48L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj5cIik7fS5jYWxsKHRoaXMsXCJkYXRhXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5kYXRhOnR5cGVvZiBkYXRhIT09XCJ1bmRlZmluZWRcIj9kYXRhOnVuZGVmaW5lZCxcInVuZGVmaW5lZFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgudW5kZWZpbmVkOnR5cGVvZiB1bmRlZmluZWQhPT1cInVuZGVmaW5lZFwiP3VuZGVmaW5lZDp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2pzL2Rldi9wbS92aWV3L3BvRGV0YWlsLmphZGVcbi8vIG1vZHVsZSBpZCA9IDEzMFxuLy8gbW9kdWxlIGNodW5rcyA9IDIgMyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcblxyXG5cdHRoaXMucGxKYWRlID0gcmVxdWlyZSgnLi4vdmlldy9wYXRoTGlzdC5qYWRlJyk7XHJcblx0dGhpcy5lbEphZGUgPSByZXF1aXJlKCcuLi92aWV3L2xpc3RFbC5qYWRlJyk7XHJcblx0dGhpcy5uZXN0ZWRMaXN0SmFkZSA9IHJlcXVpcmUoJy4uL3ZpZXcvc3VibGlzdC5qYWRlJyk7XHJcblx0dGhpcy5wZGZKYWRlID0gcmVxdWlyZSgnLi4vdmlldy9wZGZQYXRoTGlzdC5qYWRlJyk7XHJcblx0dGhpcy5ldm50RGV0YWlsSmFkZSA9IHJlcXVpcmUoJy4uL3ZpZXcvZWRpdGRlbEV2ZW50LmphZGUnKTtcclxuXHR0aGlzLnltYXBDZWF0ZVBhdGggPSB7fTtcclxuXHR0aGlzLnNlbGVjdGVkRUwgPSBbXTtcclxuXHJcblx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuXHR0aGlzLmluaXQgPSBmdW5jdGlvbih5TWFwQ3JlYXRlUGF0aCkge1xyXG5cdFx0JCgnLmwtcGxhY2UnKS5odG1sKHNlbGYucGxKYWRlKCkpO1xyXG5cdFx0Ly9zZWxmLm15TWFwPW15TWFwO1xyXG5cdFx0c2VsZi55bWFwQ2VhdGVQYXRoID0geU1hcENyZWF0ZVBhdGg7XHJcblx0XHQkKCcjY2xlYXItcGxpc3QtYnRuJykub24oJ2NsaWNrJywgc2VsZi5yZW1vdmVBbGwpO1xyXG5cdFx0JCgnI2NyZWF0ZS1wYXRoLWJ0bicpLm9uKCdjbGljaycsIHNlbGYuY3JlYXRlUGF0aCk7XHJcblx0XHQkKCcjcHJpbnQtcGF0aC1idG4nKS5vbignY2xpY2snLCBzZWxmLnBkZlBhdGgpO1xyXG5cclxuXHR9O1xyXG5cclxuXHR0aGlzLmFkZEVsZW1lbnQgPSBmdW5jdGlvbihkYXRhKSB7XHJcblx0XHQkKCcjcGF0aC1saXN0JykuYXBwZW5kKHNlbGYuZWxKYWRlKHtcclxuXHRcdFx0XCJkYXRhXCI6IGRhdGFcclxuXHRcdH0pKTtcclxuXHRcdHNlbGYuc2VsZWN0ZWRFTC5wdXNoKGRhdGEpO1xyXG5cdFx0JCgnW2RhdGEtcG8taWQ9JyArIGRhdGEucG9zdGFsQ29kZSArICddJykuY2hpbGRyZW4oJy5yZW1vdmUtcG8tbGlzdCcpLm9uKCdjbGljaycsIHtcclxuXHRcdFx0ZWxlbWVudDogZGF0YVxyXG5cdFx0fSwgc2VsZi5yZW1vdmVFbGVtZW50KTtcclxuXHRcdHNlbGYubG9hZEV2bnREYXRhKGRhdGEpO1xyXG5cclxuXHR9O1xyXG5cclxuXHR0aGlzLmxvYWRFdm50RGF0YSA9IGZ1bmN0aW9uKF9kYXRhKSB7XHJcblx0XHR2YXIgcmFyciA9IFtdO1xyXG5cdFx0JC5hamF4KHtcclxuXHRcdFx0dHlwZTogJ0dFVCcsXHJcblx0XHRcdC8vdXJsOiBcIi4vdGVzdGV2ZW50Lmpzb25cIixcclxuXHRcdFx0dXJsOlwiL2V2bnQvZXZudC9cIitfZGF0YS5wb3N0YWxDb2RlLFxyXG5cdFx0XHRkYXRhVHlwZTogXCJqc29uXCIsXHJcblx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnc3VjY2VzcyBsb2FkIGRhdGEnKTtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0XHRfZGF0YS5ldm50cz1kYXRhO1xyXG5cdFx0XHRcdCQoJ1tkYXRhLXBvLWlkPScgKyBfZGF0YS5wb3N0YWxDb2RlICsgJ10nKS5maW5kKCdpLmZhLXNwaW5uZXInKS5yZW1vdmUoKTtcclxuXHRcdFx0XHQkKCdbZGF0YS1wby1pZD0nICsgX2RhdGEucG9zdGFsQ29kZSArICddJykuYXBwZW5kKHNlbGYubmVzdGVkTGlzdEphZGUoe1xyXG5cdFx0XHRcdFx0XHRcImRhdGFcIjogZGF0YVxyXG5cdFx0XHRcdH0pKTtcclxuXHRcdFx0XHQkKCdbZGF0YS1wby1pZD0nICsgX2RhdGEucG9zdGFsQ29kZSArICddJykub24oJ2NsaWNrJywgc2VsZi5saXN0ZW5Fdm50KTtcclxuXHRcdFx0XHQvKnJhcnIgPSBkYXRhLmZpbHRlcihmdW5jdGlvbihldm50KSB7XHJcblx0XHRcdFx0XHRpZiAoZXZudC5wb3N0YWxDb2RlID09IF9kYXRhLnBvc3RhbENvZGUpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0X2RhdGEuZXZudHMgPSByYXJyO1xyXG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhyYXJyKTtcclxuXHRcdFx0XHRcdCQoJ1tkYXRhLXBvLWlkPScgKyBfZGF0YS5wb3N0YWxDb2RlICsgJ10nKS5maW5kKCdpLmZhLXNwaW5uZXInKS5yZW1vdmUoKTtcclxuXHRcdFx0XHRcdCQoJ1tkYXRhLXBvLWlkPScgKyBfZGF0YS5wb3N0YWxDb2RlICsgJ10nKS5hcHBlbmQoc2VsZi5uZXN0ZWRMaXN0SmFkZSh7XHJcblx0XHRcdFx0XHRcdFwiZGF0YVwiOiByYXJyXHJcblx0XHRcdFx0XHR9KSk7XHJcblx0XHRcdFx0XHQvLyQoJy5ldm50LWxpJykuY2hpbGRyZW4oJy5zaG93LWV2bnQtZGV0YWlsJykub24oJ2NsaWNrJyxzZWxmLnNob3dFdm50RGV0YWlsKTtcclxuXHRcdFx0XHRcdC8vJCgnLmV2bnQtbGknKS5jaGlsZHJlbignLnJlbW92ZS1ldm50LWxpc3QnKS5vbignY2xpY2snLHNlbGYucmVtb3ZlRXZudCk7XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0Ly8kKCdbZGF0YS1wby1pZD0nKyBfZGF0YS5wb3N0YWxDb2RlKyddJykub24oJ2NsaWNrJyxzZWxmLnNob3dFdm50RGV0YWlsKTtcclxuXHRcdFx0XHRcdCQoJ1tkYXRhLXBvLWlkPScgKyBfZGF0YS5wb3N0YWxDb2RlICsgJ10nKS5vbignY2xpY2snLCBzZWxmLmxpc3RlbkV2bnQpO1xyXG5cdFx0XHRcdH0sIC8qTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMDApKi8gLyoxMCk7Ki9cclxuXHRcdFx0fSxcclxuXHRcdFx0ZXJyb3I6IGZ1bmN0aW9uKGVycikge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCfQvtGI0LjQsdC60LAgKCcpO1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGVycik7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHJcblx0fTtcclxuXHR0aGlzLmxpc3RlbkV2bnQgPSBmdW5jdGlvbihlKSB7XHJcblx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdHZhciB0eXBlID0gdHJ1ZTsgLy9kZWxldGVcclxuXHRcdGlmICgkKGUudGFyZ2V0KS5wYXJlbnQoKS5oYXNDbGFzcygnc2hvdy1ldm50LWRldGFpbCcpKVxyXG5cdFx0XHR0eXBlID0gZmFsc2U7IC8vJ3Nob3ctZGV0YWlsJztcclxuXHJcblx0XHR2YXIgb3AgPSAkKGUuY3VycmVudFRhcmdldCkuYXR0cignZGF0YS1wby1pZCcpO1xyXG5cdFx0dmFyIGV2bnRJZCA9ICQoZS50YXJnZXQpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2RhdGEtZXZudC1pZCcpO1xyXG5cdFx0Ly9jb25zb2xlLmxvZygkKGUudGFyZ2V0KS5wYXJlbnQoKS5oYXNDbGFzcygnc2hvdy1ldm50LWRldGFpbCcpKTtcclxuXHJcblxyXG5cdFx0Zm9yICh2YXIgaSA9IHNlbGYuc2VsZWN0ZWRFTC5sZW5ndGg7IGktLTspIHtcclxuXHRcdFx0aWYgKHNlbGYuc2VsZWN0ZWRFTFtpXS5wb3N0YWxDb2RlID09IG9wKSB7XHJcblx0XHRcdFx0Zm9yICh2YXIgaiA9IHNlbGYuc2VsZWN0ZWRFTFtpXS5ldm50cy5sZW5ndGg7IGotLTspIHtcclxuXHRcdFx0XHRcdGlmIChzZWxmLnNlbGVjdGVkRUxbaV0uZXZudHNbal0uX2lkID09IGV2bnRJZCkge1xyXG5cdFx0XHRcdFx0XHRpZiAodHlwZSkge1xyXG5cdFx0XHRcdFx0XHRcdHNlbGYuc2VsZWN0ZWRFTFtpXS5ldm50cy5zcGxpY2UoaiwgMSk7XHJcblx0XHRcdFx0XHRcdFx0JChlLnRhcmdldCkucGFyZW50KCkucGFyZW50KCkucmVtb3ZlKCk7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0dmFyIF9ldmVudCA9IHNlbGYuc2VsZWN0ZWRFTFtpXS5ldm50c1tqXTtcclxuXHRcdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdFx0XHQkKCcubW9kYWwtcGxhY2UnKS5odG1sKHNlbGYuZXZudERldGFpbEphZGUoKSk7XHJcblx0XHRcdFx0XHRcdFx0LyokKFwiLmZsYXRwaWNrclwiKS5mbGF0cGlja3Ioe1xyXG5cdFx0XHRcdFx0XHRcdFx0ZW5hYmxlVGltZTogdHJ1ZSxcclxuXHRcdFx0XHRcdFx0XHR9KTsqL1xyXG5cclxuXHRcdFx0XHRcdFx0XHQkKCcjbW9kYWwnKS5tb2RhbCgnc2hvdycpO1xyXG5cdFx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHRcdCQoXCIjZGF0ZWJlZ2luXCIpLmZsYXRwaWNrcih7XHJcblx0XHRcdFx0XHRcdFx0dXRjOiB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcdGRlZmF1bHREYXRlOiBtb21lbnQoX2V2ZW50LnN0YXJ0KS5mb3JtYXQoJ1lZWVktTU0tREQgaGg6bW0nKSxcclxuXHRcdFx0XHRcdFx0XHRlbmFibGVUaW1lOiB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRcdCQoXCIjZGF0ZWVuZFwiKS5mbGF0cGlja3Ioe1xyXG5cdFx0XHRcdFx0XHRcdHV0YzogdHJ1ZSxcclxuXHRcdFx0XHRcdFx0XHRkZWZhdWx0RGF0ZTogbW9tZW50KF9ldmVudC5lbmQpLmZvcm1hdCgnWVlZWS1NTS1ERCBoaDptbScpLFxyXG5cdFx0XHRcdFx0XHRcdGVuYWJsZVRpbWU6IHRydWUsXHJcblx0XHRcdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0XHQvL1x0JCgnI2RhdGViZWdpbicpLnZhbChtb21lbnQoX2V2ZW50LnN0YXJ0KS5mb3JtYXQoJ1lZWVktTU0tREQgaGg6bW0nKSk7XHJcblx0XHRcdFx0XHRcdC8vXHQkKCcjZGF0ZWVuZCcpLnZhbChtb21lbnQoX2V2ZW50LmVuZCkuZm9ybWF0KCdZWVlZLU1NLUREIGhoOm1tJykpO1xyXG5cdFx0XHRcdFx0XHRcdCQoJyNldmVudC10aXRsZScpLnZhbChfZXZlbnQudGl0bGUpO1xyXG5cdFx0XHRcdFx0XHRcdCQoJyNwb3N0Y29kZScpLnZhbChfZXZlbnQucG9zdGFsQ29kZSk7XHJcblx0XHRcdFx0XHRcdFx0JCgnI3N0YXR1cycpLnZhbChfZXZlbnQuc3RhdHVzKTtcclxuXHRcdFx0XHRcdFx0XHQkKFwiI2Rlc2NyaXB0aW9uXCIpLnZhbChfZXZlbnQuZGVzY3JpcHRpb24pO1xyXG5cdFx0XHRcdFx0XHRcdCQoJyNleGVjdXRvcicpLnZhbChfZXZlbnQuZXhlY3V0b3IpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHQkKCcjbW9kYWwnKS5vbignaGlkZGVuLmJzLm1vZGFsJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ21vZGFsIGhpZGUnKTtcclxuXHRcdFx0XHRcdFx0XHRcdHNlbGYuZGVzdHJveU1vZGFsKCk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdH07XHJcblx0dGhpcy5kZXN0cm95TW9kYWwgPSBmdW5jdGlvbigpIHtcclxuXHJcblx0XHQvLyQoXCIjc2F2ZS1ldmVudC1idG5cIikub2ZmKCdjbGljaycpO1xyXG5cdFx0JCgnI2Nsb3NlLW1vZGFsLWJ0bicpLm9mZignY2xpY2snKTtcclxuXHRcdCQoJyNjbG9zZS1tb2RhbC1jcm9zcy1idG4nKS5vZmYoJ2NsaWNrJyk7XHJcblx0XHQvLyQoJyNkZWxldGUtZXZlbnQtYnRuJykub2ZmKCk7XHJcblx0XHQkKCcubW9kYWwtcGxhY2UnKS5odG1sKCcnKTtcclxuXHR9O1xyXG5cclxuXHR0aGlzLnJlbW92ZUVsZW1lbnQgPSBmdW5jdGlvbihlKSB7XHJcblx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0Zm9yICh2YXIgaSA9IHNlbGYuc2VsZWN0ZWRFTC5sZW5ndGg7IGktLTspIHtcclxuXHRcdFx0aWYgKHNlbGYuc2VsZWN0ZWRFTFtpXS5wb3N0YWxDb2RlID09IGUuZGF0YS5lbGVtZW50LnBvc3RhbENvZGUpIHtcclxuXHRcdFx0XHQkKGUuY3VycmVudFRhcmdldCkub2ZmKCk7XHJcblx0XHRcdFx0JChlLmN1cnJlbnRUYXJnZXQpLnBhcmVudCgpLnJlbW92ZSgpO1xyXG5cdFx0XHRcdC8vJCgnW2RhdGEtZXZudC1pZD0nK2UuZGF0YS5lbGVtZW50LnBvc3RhbENvZGUrJ10nKS5vZmYoKTtcclxuXHRcdFx0XHQvLyQoJ1tkYXRhLWV2bnQtaWQ9JytlLmRhdGEuZWxlbWVudC5wb3N0YWxDb2RlKyddJykucmVtb3ZlKCk7XHJcblx0XHRcdFx0c2VsZi5zZWxlY3RlZEVMLnNwbGljZShpLCAxKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHR9O1xyXG5cdHRoaXMucmVtb3ZlQWxsID0gZnVuY3Rpb24oZSkge1xyXG5cdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdCQoJyNwYXRoLWxpc3QnKS5odG1sKCcnKTtcclxuXHRcdHNlbGYuc2VsZWN0ZWRFTCA9IFtdO1xyXG5cdH07XHJcblxyXG5cdHRoaXMuY3JlYXRlUGF0aCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0c2VsZi55bWFwQ2VhdGVQYXRoKHNlbGYuc2VsZWN0ZWRFTCk7XHJcblx0fTtcclxuXHJcblx0dGhpcy5wZGZQYXRoID0gZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgZG9jRGVmaW5pdGlvbiA9IHNlbGYuY3JlYXRlQ29udGVudCgpO1xyXG5cdFx0Ly92YXIgZG9jRGVmaW5pdGlvbiA9IHNlbGYucGRmSmFkZSh7XCJkYXRhXCI6c2VsZi5zZWxlY3RlZEVMfSk7XHJcblx0XHRwZGZNYWtlLmNyZWF0ZVBkZihkb2NEZWZpbml0aW9uKS5vcGVuKCk7XHJcblx0fTtcclxuXHJcblx0dGhpcy5jcmVhdGVDb250ZW50ID0gZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgdWxhcnIgPSBbXTtcclxuXHRcdHNlbGYuc2VsZWN0ZWRFTC5mb3JFYWNoKGZ1bmN0aW9uKHBvKSB7XHJcblx0XHRcdHVsYXJyLnB1c2goe1xyXG5cdFx0XHRcdHRleHQ6IHBvLnBvc3RhbENvZGVcclxuXHRcdFx0fSlcclxuXHRcdFx0aWYgKHBvLmV2bnRzLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHR2YXIgc3VsYXJyID0gW107XHJcblx0XHRcdFx0cG8uZXZudHMuZm9yRWFjaChmdW5jdGlvbihldm4pIHtcclxuXHRcdFx0XHRcdHN1bGFyci5wdXNoKHtcclxuXHRcdFx0XHRcdFx0dGV4dDogZXZuLnRpdGxlXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHR1bGFyci5wdXNoKHtcclxuXHRcdFx0XHRcdHVsOiBzdWxhcnJcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHR2YXIgY29iaiA9IHtcclxuXHRcdFx0Y29udGVudDogW3tcclxuXHRcdFx0XHR0ZXh0OiAn0JvQuNGB0YIt0YHQv9C40YHQvtC6INC30LDRj9Cy0L7QuiDQuiDQuNGB0L/QvtC70L3QtdC90LjRjiAo0YTQvtGA0LzQsCDihJYx0LvRgSknLFxyXG5cdFx0XHRcdHN0eWxlOiAnaGVhZGVyJ1xyXG5cdFx0XHR9LCB7XHJcblx0XHRcdFx0dWw6IHVsYXJyLFxyXG5cdFx0XHRcdHN0eWxlOiAnbGlzdHMnXHJcblx0XHRcdH1dLFxyXG5cdFx0XHRzdHlsZXM6IHtcclxuXHRcdFx0XHRoZWFkZXI6IHtcclxuXHRcdFx0XHRcdGZvbnRTaXplOiAxNixcclxuXHRcdFx0XHRcdGJvbGQ6IHRydWVcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGxpc3RzOiB7XHJcblx0XHRcdFx0XHRwYWRkaW5nOiBcIjE1cHhcIixcclxuXHRcdFx0XHRcdGZvbnRTaXplOiAxNFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHRcdHJldHVybiBjb2JqO1xyXG5cdH07XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy9qcy9kZXYvcG0vbW9kdWxlL3BhdGhMaXN0LmpzXG4vLyBtb2R1bGUgaWQgPSAxMzFcbi8vIG1vZHVsZSBjaHVua3MgPSAyIDMiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJDOlxcXFxfdGVtcFxcXFxwY2h0XFxcXG5vZGVfbW9kdWxlc1xcXFxqYWRlXFxcXGxpYlxcXFxydW50aW1lLmpzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwiY2FyZFxcXCI+PGRpdiBjbGFzcz1cXFwiY2FyZC1oZWFkZXJcXFwiPjx1bCBjbGFzcz1cXFwibmF2IG5hdi1waWxscyBjYXJkLWhlYWRlci1waWxscyBmbG9hdC14cy1sZWZ0XFxcIj48bGkgY2xhc3M9XFxcIm5hdi1pdGVtXFxcIj48YSBpZD1cXFwiY2xlYXItcGxpc3QtYnRuXFxcIiBocmVmPVxcXCIjXFxcIiBjbGFzcz1cXFwibmF2LWxpbmtcXFwiPtCe0YfQuNGB0YLQuNGC0Yw8L2E+PC9saT48L3VsPjwvZGl2PjxkaXYgY2xhc3M9XFxcImNhcmQtYmxvY2tcXFwiPjxoNCBjbGFzcz1cXFwiY2FyZC10aXRsZVxcXCI+IDwvaDQ+PGRpdiBjbGFzcz1cXFwiY2FyZC10ZXh0XFxcIj48aDQ+0KHQv9C40YHQvtC6XFx0PHVsIGlkPVxcXCJwYXRoLWxpc3RcXFwiIGNsYXNzPVxcXCJsaXN0LWdyb3VwXFxcIj48L3VsPjwvaDQ+PC9kaXY+PCEtLWlucHV0I2V4ZWNlbWFpbC5mb3JtLWNvbnRyb2wodHlwZT0nZW1haWwnKS0tPjxhIGlkPVxcXCJjcmVhdGUtcGF0aC1idG5cXFwiIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJidG4gYnRuLXByaW1hcnlcXFwiPtGB0L7Qt9C00LDRgtGMINC80LDRgNGI0YDRg9GCPC9hPjwvZGl2PjxkaXYgY2xhc3M9XFxcImNhcmQtZm9vdGVyIHRleHQtbXV0ZWRcXFwiPjxhIGlkPVxcXCJwcmludC1wYXRoLWJ0blxcXCIgaHJlZj1cXFwiI1xcXCIgY2xhc3M9XFxcImJ0biBidG4tcHJpbWFyeVxcXCI+0L/QtdGH0LDRgtCw0YLRjDwvYT48YSBpZD1cXFwib3RoZXItcGF0aC1idG5cXFwiIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJidG4gYnRuLWRlZmF1bHRcXFwiPtC10YnQtSDRh9C10LPQvi3RgtC+PC9hPjwvZGl2PjwvZGl2PlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2pzL2Rldi9wbS92aWV3L3BhdGhMaXN0LmphZGVcbi8vIG1vZHVsZSBpZCA9IDEzMlxuLy8gbW9kdWxlIGNodW5rcyA9IDIgMyIsInZhciBqYWRlID0gcmVxdWlyZShcIkM6XFxcXF90ZW1wXFxcXHBjaHRcXFxcbm9kZV9tb2R1bGVzXFxcXGphZGVcXFxcbGliXFxcXHJ1bnRpbWUuanNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChkYXRhKSB7XG5idWYucHVzaChcIjxsaVwiICsgKGphZGUuYXR0cihcImRhdGEtcG8taWRcIiwgJycgKyAoZGF0YS5wb3N0YWxDb2RlKSArICcnLCB0cnVlLCB0cnVlKSkgKyBcIiBjbGFzcz1cXFwibGlzdC1ncm91cC1pdGVtIGxpc3QtZ3JvdXAtaXRlbS1hY3Rpb25cXFwiPlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IGRhdGEucG9zdGFsQ29kZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiPGEgaHJlZj1cXFwiI1xcXCIgY2xhc3M9XFxcInJlbW92ZS1wby1saXN0XFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtdHJhc2gtbyBmYS1md1xcXCI+PC9pPjwvYT48aSBzdHlsZT1cXFwiZmxvYXQ6bGVmdFxcXCIgY2xhc3M9XFxcImZhIGZhLXNwaW5uZXIgZmEtcHVsc2UgZmEtZndcXFwiPjwvaT48L2xpPlwiKTt9LmNhbGwodGhpcyxcImRhdGFcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmRhdGE6dHlwZW9mIGRhdGEhPT1cInVuZGVmaW5lZFwiP2RhdGE6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy9qcy9kZXYvcG0vdmlldy9saXN0RWwuamFkZVxuLy8gbW9kdWxlIGlkID0gMTMzXG4vLyBtb2R1bGUgY2h1bmtzID0gMiAzIiwidmFyIGphZGUgPSByZXF1aXJlKFwiQzpcXFxcX3RlbXBcXFxccGNodFxcXFxub2RlX21vZHVsZXNcXFxcamFkZVxcXFxsaWJcXFxccnVudGltZS5qc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKGRhdGEsIHVuZGVmaW5lZCkge1xuYnVmLnB1c2goXCI8dWw+XCIpO1xuLy8gaXRlcmF0ZSBkYXRhXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IGRhdGE7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBldm50ID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8bGlcIiArIChqYWRlLmF0dHIoXCJkYXRhLWV2bnQtaWRcIiwgJycgKyAoZXZudC5faWQpICsgJycsIHRydWUsIHRydWUpKSArIFwiIGNsYXNzPVxcXCJldm50LWxpXFxcIj5cIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBldm50LnRpdGxlKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCI8YSBocmVmPVxcXCIjXFxcIiBjbGFzcz1cXFwic2hvdy1ldm50LWRldGFpbFxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLXNlYXJjaCBmYS1md1xcXCI+PC9pPjwvYT48YSBocmVmPVxcXCIjXFxcIiBjbGFzcz1cXFwicmVtb3ZlLWV2bnQtbGlzdFxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLXRyYXNoLW8gZmEtZndcXFwiPjwvaT48L2E+PC9saT5cIik7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIgZXZudCA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGxpXCIgKyAoamFkZS5hdHRyKFwiZGF0YS1ldm50LWlkXCIsICcnICsgKGV2bnQuX2lkKSArICcnLCB0cnVlLCB0cnVlKSkgKyBcIiBjbGFzcz1cXFwiZXZudC1saVxcXCI+XCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gZXZudC50aXRsZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiPGEgaHJlZj1cXFwiI1xcXCIgY2xhc3M9XFxcInNob3ctZXZudC1kZXRhaWxcXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1zZWFyY2ggZmEtZndcXFwiPjwvaT48L2E+PGEgaHJlZj1cXFwiI1xcXCIgY2xhc3M9XFxcInJlbW92ZS1ldm50LWxpc3RcXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS10cmFzaC1vIGZhLWZ3XFxcIj48L2k+PC9hPjwvbGk+XCIpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG5idWYucHVzaChcIjwvdWw+XCIpO30uY2FsbCh0aGlzLFwiZGF0YVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguZGF0YTp0eXBlb2YgZGF0YSE9PVwidW5kZWZpbmVkXCI/ZGF0YTp1bmRlZmluZWQsXCJ1bmRlZmluZWRcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnVuZGVmaW5lZDp0eXBlb2YgdW5kZWZpbmVkIT09XCJ1bmRlZmluZWRcIj91bmRlZmluZWQ6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy9qcy9kZXYvcG0vdmlldy9zdWJsaXN0LmphZGVcbi8vIG1vZHVsZSBpZCA9IDEzNFxuLy8gbW9kdWxlIGNodW5rcyA9IDIgMyIsInZhciBqYWRlID0gcmVxdWlyZShcIkM6XFxcXF90ZW1wXFxcXHBjaHRcXFxcbm9kZV9tb2R1bGVzXFxcXGphZGVcXFxcbGliXFxcXHJ1bnRpbWUuanNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChkYXRhLCB1bmRlZmluZWQpIHtcbi8vIGl0ZXJhdGUgZGF0YVxuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSBkYXRhO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIgcG8gPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IHBvLnBvc3RhbENvZGUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIiBcXFxcYnJcIik7XG5pZiAocG8uZXZudHMubGVuZ3RoPjApXG57XG4vLyBpdGVyYXRlIHBvLmV2bnRzXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IHBvLmV2bnRzO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIgZXZudCA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiXCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gZXZudC50aXRsZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiIFxcXFxiclwiKTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBldm50ID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCJcIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBldm50LnRpdGxlKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCIgXFxcXGJyXCIpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG59XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIgcG8gPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IHBvLnBvc3RhbENvZGUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIiBcXFxcYnJcIik7XG5pZiAocG8uZXZudHMubGVuZ3RoPjApXG57XG4vLyBpdGVyYXRlIHBvLmV2bnRzXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IHBvLmV2bnRzO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIgZXZudCA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiXCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gZXZudC50aXRsZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiIFxcXFxiclwiKTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBldm50ID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCJcIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBldm50LnRpdGxlKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCIgXFxcXGJyXCIpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG59XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG59LmNhbGwodGhpcyxcImRhdGFcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmRhdGE6dHlwZW9mIGRhdGEhPT1cInVuZGVmaW5lZFwiP2RhdGE6dW5kZWZpbmVkLFwidW5kZWZpbmVkXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC51bmRlZmluZWQ6dHlwZW9mIHVuZGVmaW5lZCE9PVwidW5kZWZpbmVkXCI/dW5kZWZpbmVkOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvanMvZGV2L3BtL3ZpZXcvcGRmUGF0aExpc3QuamFkZVxuLy8gbW9kdWxlIGlkID0gMTM1XG4vLyBtb2R1bGUgY2h1bmtzID0gMiAzIiwidmFyIGphZGUgPSByZXF1aXJlKFwiQzpcXFxcX3RlbXBcXFxccGNodFxcXFxub2RlX21vZHVsZXNcXFxcamFkZVxcXFxsaWJcXFxccnVudGltZS5qc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIjxkaXYgaWQ9XFxcIm1vZGFsXFxcIiB0YWJpbmRleD1cXFwiLTFcXFwiIHJvbGU9XFxcImRpYWxvZ1xcXCIgYXJpYS1sYWJlbGxlZGJ5PVxcXCJteU1vZGFsTGFiZWxcXFwiIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIiBjbGFzcz1cXFwibW9kYWwgZmFkZVxcXCI+PGRpdiByb2xlPVxcXCJkb2N1bWVudFxcXCIgY2xhc3M9XFxcIm1vZGFsLWRpYWxvZ1xcXCI+PGRpdiBjbGFzcz1cXFwibW9kYWwtY29udGVudFxcXCI+PGRpdiBjbGFzcz1cXFwibW9kYWwtaGVhZGVyXFxcIj48YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgZGF0YS1kaXNtaXNzPVxcXCJtb2RhbFxcXCIgYXJpYS1sYWJlbD1cXFwiQ2xvc2VcXFwiIGNsYXNzPVxcXCJjbG9zZVxcXCI+PHNwYW4gYXJpYS1oaWRkZW49XFxcInRydWVcXFwiPsOXPC9zcGFuPjwvYnV0dG9uPjxoNCBpZD1cXFwibXlNb2RhbExhYmVsXFxcIiBjbGFzcz1cXFwibW9kYWwtdGl0bGVcXFwiPtCg0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40LUv0YPQtNCw0LvQtdC90LjQtTwvaDQ+PC9kaXY+PGRpdiBjbGFzcz1cXFwibW9kYWwtYm9keVxcXCI+PGZvcm0gYWN0aW9uPVxcXCJcXFwiPjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0LfQsNCz0L7Qu9C+0LLQvtC6PC9sYWJlbD48aW5wdXQgaWQ9XFxcImV2ZW50LXRpdGxlXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj48bGFiZWwgZm9yPVxcXCJcXFwiPtC90LDRh9Cw0LvQvjwvbGFiZWw+PGlucHV0IGlkPVxcXCJkYXRlYmVnaW5cXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2wgZmxhdHBpY2tyXFxcIj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj48bGFiZWwgZm9yPVxcXCJcXFwiPtC+0LrQvtC90YfQsNC90LjQtTwvbGFiZWw+PGlucHV0IGlkPVxcXCJkYXRlZW5kXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sIGZsYXRwaWNrclxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7QvtGC0LTQtdC70LXQvdC40LUg0L/QvtC70YPRh9Cw0YLQtdC70Yw8L2xhYmVsPjxpbnB1dCBpZD1cXFwicG9zdGNvZGVcXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0L7Qv9C40YHQsNC90LjQtTwvbGFiZWw+PGlucHV0IGlkPVxcXCJkZXNjcmlwdGlvblxcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7RgdGC0LDRgtGD0YE8L2xhYmVsPjxpbnB1dCBpZD1cXFwic3RhdHVzXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj48bGFiZWwgZm9yPVxcXCJcXFwiPtC40YHQv9C+0LvQvdC40YLQtdC70Yw8L2xhYmVsPjxpbnB1dCBpZD1cXFwiZXhlY3V0b3JcXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiPjwvZGl2PjwvZm9ybT48L2Rpdj48ZGl2IGNsYXNzPVxcXCJtb2RhbC1mb290ZXJcXFwiPjxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBkYXRhLWRpc21pc3M9XFxcIm1vZGFsXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPkNsb3NlPC9idXR0b24+PCEtLWJ1dHRvbiNzYXZlLWV2ZW50LWJ0bi5idG4uYnRuLXByaW1hcnkodHlwZT0nYnV0dG9uJykgU2F2ZSBjaGFuZ2VzLS0+PCEtLWJ1dHRvbiNkZWxldGUtZXZlbnQtYnRuLmJ0bi5idG4tZGFuZ2VyKHR5cGU9J2J1dHRvbicpIERlbGV0ZS0tPjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2PlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2pzL2Rldi9wbS92aWV3L2VkaXRkZWxFdmVudC5qYWRlXG4vLyBtb2R1bGUgaWQgPSAxMzZcbi8vIG1vZHVsZSBjaHVua3MgPSAyIDMiLCIndXNlIHN0cmljdCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG5cclxuXHR0aGlzLl9tb2RhbCA9IHJlcXVpcmUoJy4uL3ZpZXcvbmV3RXZlbnQuamFkZScpO1xyXG5cclxuXHR0aGlzLmRlc3Ryb3lNb2RhbCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdCQoXCIjc2F2ZS1ldmVudC1idG5cIikub2ZmKCdjbGljaycpO1xyXG5cdFx0JCgnI2Nsb3NlLW1vZGFsLWJ0bicpLm9mZignY2xpY2snKTtcclxuXHRcdCQoJyNjbG9zZS1tb2RhbC1jcm9zcy1idG4nKS5vZmYoJ2NsaWNrJyk7XHJcblx0XHQkKCcubW9kYWwtcGxhY2UnKS5odG1sKCcnKTtcclxuXHR9O1xyXG5cclxuXHR2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG5cdHRoaXMuaW5pdCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdCQoJy5tb2RhbC1wbGFjZScpLmh0bWwodGhpcy5fbW9kYWwoKSk7XHJcblx0XHQkKFwiLmZsYXRwaWNrclwiKS5mbGF0cGlja3Ioe1xyXG5cdFx0XHRlbmFibGVUaW1lOiB0cnVlLFxyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChcIiNzYXZlLWV2ZW50LWJ0blwiKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblxyXG5cdFx0XHR2YXIgbXVsdGkgPSAkKCcjcG9zdGNvZGUnKS52YWwoKS5zcGxpdChcIjtcIik7XHJcblx0XHRcdGlmIChtdWx0aS5sZW5ndGggPiAxKSB7XHJcblx0XHRcdFx0dmFyIGV2bnRzID0gW107XHJcblx0XHRcdFx0bXVsdGkuZm9yRWFjaChmdW5jdGlvbihwb0NvZGUpIHtcclxuXHRcdFx0XHRcdHZhciBldm50ID0ge1xyXG5cdFx0XHRcdFx0XHR0aXRsZTogJCgnI2V2ZW50LXRpdGxlJykudmFsKCksXHJcblx0XHRcdFx0XHRcdHN0YXJ0OiBtb21lbnQoJCgnI2RhdGViZWdpbicpLnZhbCgpKSxcclxuXHRcdFx0XHRcdFx0ZW5kOiBtb21lbnQoJCgnI2RhdGVlbmQnKS52YWwoKSksXHJcblx0XHRcdFx0XHRcdHBvc3RhbENvZGU6IHBvQ29kZSxcclxuXHRcdFx0XHRcdFx0c3RhdHVzOiAkKCcjc3RhdHVzJykudmFsKCksXHJcblx0XHRcdFx0XHRcdGRlc2NyaXB0aW9uOiAkKFwiI2Rlc2NyaXB0aW9uXCIpLnZhbCgpLFxyXG5cdFx0XHRcdFx0XHRleGVjdXRvcjogJCgnI2V4ZWN1dG9yJykudmFsKClcclxuXHRcdFx0XHRcdH07XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdGV2bnRzLnB1c2goZXZudCk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0JC5hamF4KHtcclxuXHRcdFx0XHRcdHR5cGU6ICdQT1NUJyxcclxuXHRcdFx0XHRcdHVybDogJy9ldm50L3NhdmUvbXVsdGknLFxyXG5cdFx0XHRcdFx0ZGF0YTogSlNPTi5zdHJpbmdpZnkoZXZudHMpLFxyXG5cdFx0XHRcdFx0ZGF0YVR5cGU6IFwianNvblwiLFxyXG5cdFx0XHRcdFx0Y29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG5cdFx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhcImRhdGEgc2F2ZVwiKTtcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHQvL2Vycm9yOiBhamF4RXJyb3JcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHR2YXIgZXZudCA9IHtcclxuXHRcdFx0XHRcdHRpdGxlOiAkKCcjZXZlbnQtdGl0bGUnKS52YWwoKSxcclxuXHRcdFx0XHRcdHN0YXJ0OiBtb21lbnQoJCgnI2RhdGViZWdpbicpLnZhbCgpKSxcclxuXHRcdFx0XHRcdGVuZDogbW9tZW50KCQoJyNkYXRlZW5kJykudmFsKCkpLFxyXG5cdFx0XHRcdFx0cG9zdGFsQ29kZTogJCgnI3Bvc3Rjb2RlJykudmFsKCksXHJcblx0XHRcdFx0XHRzdGF0dXM6ICQoJyNzdGF0dXMnKS52YWwoKSxcclxuXHRcdFx0XHRcdGRlc2NyaXB0aW9uOiAkKFwiI2Rlc2NyaXB0aW9uXCIpLnZhbCgpLFxyXG5cdFx0XHRcdFx0ZXhlY3V0b3I6ICQoJyNleGVjdXRvcicpLnZhbCgpXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhcImFkZCBldmVudFwiKTtcclxuXHRcdFx0XHQvLyQoJyNjYWxlbmRhcicpLmZ1bGxDYWxlbmRhcigncmVuZGVyRXZlbnQnLCBldm50LCB0cnVlKTtcclxuXHJcblx0XHRcdFx0JC5hamF4KHtcclxuXHRcdFx0XHRcdHR5cGU6ICdQT1NUJyxcclxuXHRcdFx0XHRcdHVybDogJy9ldm50L3NhdmUnLFxyXG5cdFx0XHRcdFx0ZGF0YTogSlNPTi5zdHJpbmdpZnkoZXZudCksXHJcblx0XHRcdFx0XHRkYXRhVHlwZTogXCJqc29uXCIsXHJcblx0XHRcdFx0XHRjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcblx0XHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiZGF0YSBzYXZlXCIpO1xyXG5cdFx0XHRcdFx0XHQvL3ZhciBldm50QXJyYXkgPSAkKCcjY2FsZW5kYXInKS5mdWxsQ2FsZW5kYXIoJ2NsaWVudEV2ZW50cycpO1xyXG5cdFx0XHRcdFx0XHQvL3ZhciBfZXZudCA9IGV2bnRBcnJheVtldm50QXJyYXkubGVuZ3RoIC0gMV07XHJcblx0XHRcdFx0XHRcdC8vXHRfZXZudC5faWQgPSBkYXRhLmluc2VydGVkaWQ7XHJcblxyXG5cdFx0XHRcdFx0XHQvL1x0JCgnI2NhbGVuZGFyJykuZnVsbENhbGVuZGFyKCd1cGRhdGVFdmVudCcsIF9ldm50KTtcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHQvL2Vycm9yOiBhamF4RXJyb3JcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cclxuXHJcblx0XHR9KTtcclxuXHJcblx0XHQkKCcjY2xvc2UtbW9kYWwtYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoJyNjbG9zZS1tb2RhbC1jcm9zcy1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblxyXG5cdFx0fSk7XHJcblxyXG5cdFx0JCgnI21vZGFsJykubW9kYWwoJ3Nob3cnKTtcclxuXHJcblx0XHQvLyQoJyNkYXRlYmVnaW4nKS52YWwoc3RhcnQuZm9ybWF0KCdZWVlZLU1NLUREIGhoOm1tJykpO1xyXG5cdFx0Ly8kKCcjZGF0ZWVuZCcpLnZhbChlbmQuZm9ybWF0KCdZWVlZLU1NLUREIGhoOm1tJykpO1xyXG5cclxuXHRcdCQoJyNtb2RhbCcpLm9uKCdoaWRkZW4uYnMubW9kYWwnLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKCdtb2RhbCBoaWRlJyk7XHJcblx0XHRcdHNlbGYuZGVzdHJveU1vZGFsKCk7XHJcblx0XHR9KTtcclxuXHJcblx0fTtcclxufVxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy9qcy9kZXYvcG0vbW9kdWxlL25ld0V2ZW50LmpzXG4vLyBtb2R1bGUgaWQgPSAxMzdcbi8vIG1vZHVsZSBjaHVua3MgPSAyIDMiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJDOlxcXFxfdGVtcFxcXFxwY2h0XFxcXG5vZGVfbW9kdWxlc1xcXFxqYWRlXFxcXGxpYlxcXFxydW50aW1lLmpzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPGRpdiBpZD1cXFwibW9kYWxcXFwiIHRhYmluZGV4PVxcXCItMVxcXCIgcm9sZT1cXFwiZGlhbG9nXFxcIiBhcmlhLWxhYmVsbGVkYnk9XFxcIm15TW9kYWxMYWJlbFxcXCIgYXJpYS1oaWRkZW49XFxcInRydWVcXFwiIGNsYXNzPVxcXCJtb2RhbCBmYWRlXFxcIj48ZGl2IHJvbGU9XFxcImRvY3VtZW50XFxcIiBjbGFzcz1cXFwibW9kYWwtZGlhbG9nXFxcIj48ZGl2IGNsYXNzPVxcXCJtb2RhbC1jb250ZW50XFxcIj48ZGl2IGNsYXNzPVxcXCJtb2RhbC1oZWFkZXJcXFwiPjxidXR0b24gaWQ9XFxcImNsb3NlLW1vZGFsLWNyb3NzLWJ0blxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBkYXRhLWRpc21pc3M9XFxcIm1vZGFsXFxcIiBhcmlhLWxhYmVsPVxcXCJDbG9zZVxcXCIgY2xhc3M9XFxcImNsb3NlXFxcIj48c3BhbiBhcmlhLWhpZGRlbj1cXFwidHJ1ZVxcXCI+w5c8L3NwYW4+PC9idXR0b24+PGg0IGlkPVxcXCJteU1vZGFsTGFiZWxcXFwiIGNsYXNzPVxcXCJtb2RhbC10aXRsZVxcXCI+0KHQvtC30LTQsNC90LjQtTwvaDQ+PC9kaXY+PGRpdiBjbGFzcz1cXFwibW9kYWwtYm9keVxcXCI+PGZvcm0gYWN0aW9uPVxcXCJcXFwiPjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0LfQsNCz0L7Qu9C+0LLQvtC6PC9sYWJlbD48aW5wdXQgaWQ9XFxcImV2ZW50LXRpdGxlXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj48bGFiZWwgZm9yPVxcXCJcXFwiPtC90LDRh9Cw0LvQvjwvbGFiZWw+PGlucHV0IGlkPVxcXCJkYXRlYmVnaW5cXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2wgZmxhdHBpY2tyXFxcIj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj48bGFiZWwgZm9yPVxcXCJcXFwiPtC+0LrQvtC90YfQsNC90LjQtTwvbGFiZWw+PGlucHV0IGlkPVxcXCJkYXRlZW5kXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sIGZsYXRwaWNrclxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7QvtGC0LTQtdC70LXQvdC40LUg0L/QvtC70YPRh9Cw0YLQtdC70Yw8L2xhYmVsPjxpbnB1dCBpZD1cXFwicG9zdGNvZGVcXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0L7Qv9C40YHQsNC90LjQtTwvbGFiZWw+PGlucHV0IGlkPVxcXCJkZXNjcmlwdGlvblxcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7RgdGC0LDRgtGD0YE8L2xhYmVsPjxpbnB1dCBpZD1cXFwic3RhdHVzXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj48bGFiZWwgZm9yPVxcXCJcXFwiPtC40YHQv9C+0LvQvdC40YLQtdC70Yw8L2xhYmVsPjxpbnB1dCBpZD1cXFwiZXhlY3V0b3JcXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiPjwvZGl2PjwvZm9ybT48L2Rpdj48ZGl2IGNsYXNzPVxcXCJtb2RhbC1mb290ZXJcXFwiPjxidXR0b24gaWQ9XFxcImNsb3NlLW1vZGFsLWJ0blxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBkYXRhLWRpc21pc3M9XFxcIm1vZGFsXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPkNsb3NlPC9idXR0b24+PGJ1dHRvbiBpZD1cXFwic2F2ZS1ldmVudC1idG5cXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tcHJpbWFyeVxcXCI+U2F2ZSBjaGFuZ2VzPC9idXR0b24+PC9kaXY+PC9kaXY+PC9kaXY+PC9kaXY+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvanMvZGV2L3BtL3ZpZXcvbmV3RXZlbnQuamFkZVxuLy8gbW9kdWxlIGlkID0gMTM4XG4vLyBtb2R1bGUgY2h1bmtzID0gMiAzIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNyUEE7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN4TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDek5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQy9FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDN0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OzsiLCJzb3VyY2VSb290IjoiIn0=