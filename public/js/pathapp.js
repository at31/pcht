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
		var nevnt=__webpack_require__(138);

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

		initMap();

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

		function initMap() {
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
		}

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
		this.listsJade = __webpack_require__(137);
		this.ymapCeatePath = {};
		this.selectedEL = [];
		this.users=[];
		this.lists={};

		var self = this;

		this.init = function(yMapCreatePath) {		
			//self.myMap=myMap;
			self.ymapCeatePath = yMapCreatePath;
			

			$.get('/users/all', function(data){
				self.users=data;
				$('.l-place').html(self.plJade({'users':data}));
				$('.list-place').html(self.listsJade({'users':data}));
				$('#clear-plist-btn').on('click', self.removeAll);
				$('#create-path-btn').on('click', self.createPath);
				$('#print-path-btn').on('click', self.pdfPath);
				$('#assing-user-btn').on('click',function(e){

					e.stopPropagation();
					e.preventDefault();

					var _uval=$('#users-list').val();
					var _evnts=[];
					self.selectedEL.forEach(function(op){
						/*var _po={postalCode:op.postalCode, events:[]};
						if(op.evnts){
							op.evnts.forEach(function(evnt){
							_op.evetns.push(evnt._id);
							});
						}
						_events.push(_op);*/
						if(op.evnts){
							op.evnts.forEach(function(evnt){
								_evnts.push(evnt._id);
							});	
						}
					});
					var list={userID:_uval, evntIDs:_evnts};
					$.ajax({
						type: 'POST',
						url: '/lists/new',
						data: JSON.stringify(list),
						dataType: "json",
						contentType: "application/json",
						success: function(data) {
							console.log("data save");
						},
						//error: ajaxError
					});				

				});

				$.get('/lists/all',function(data){
					self.lists=data;
					var _arr=[];
					var ulListJade=__webpack_require__(256);
					for (var prop in data){
						if(data.hasOwnProperty(prop)){
							_arr.push(data[prop]);
						}
					}
					$('#lists-list').html(ulListJade({'data':_arr}));
					$('.lists-li').on('click',function(e){
						self.removeAll();
						var selectedList=self.lists[$(e.currentTarget).attr('data-list-id')];
						for(var otdName in selectedList.list){
							var _otd=selectedList.list[otdName].postalOffice;
							_otd.evnts=selectedList.list[otdName].evnts;
							//self.selectedEL.push(_otd);
							self.addElement(_otd,true);
						}
						//console.log($(e.currentTarget).attr('data-list-id'));
						self.createPath();
						return false;
					});
				});
			});		

		};

		this.addElement = function(data,evntLoaded) {
			$('#path-list').append(self.elJade({
				"data": data
			}));
			self.selectedEL.push(data);
			$('[data-po-id=' + data.postalCode + ']').children('.remove-po-list').on('click', {
				element: data
			}, self.removeElement);
			
			if(evntLoaded){
				self.showEvnts(data);
			}else{
				self.loadEvntData(data);
			}

		};

		this.showEvnts=function(_data){
			$('[data-po-id=' + _data.postalCode + ']').find('i.fa-spinner').remove();
			$('[data-po-id=' + _data.postalCode + ']').append(self.nestedListJade({
							"data": _data.evnts
					}));
			$('[data-po-id=' + _data.postalCode + ']').on('click', self.listenEvnt);
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
			//e.stopPropagation();
			$('#path-list').html('');
			self.selectedEL = [];
			return false;
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
	;var locals_for_with = (locals || {});(function (undefined, users) {
	buf.push("<div class=\"card\"><div class=\"card-header\"><ul class=\"nav nav-pills card-header-pills float-xs-left\"><li class=\"nav-item\"><a id=\"clear-plist-btn\" href=\"#\" class=\"nav-link\">Очистить</a></li></ul></div><div class=\"card-block\"><h4 class=\"card-title\"> </h4><div class=\"card-text\"><h4>Список\t<ul id=\"path-list\" class=\"list-group\"></ul></h4></div><!--input#execemail.form-control(type='email')--><a id=\"create-path-btn\" href=\"#\" class=\"btn btn-primary\">создать маршрут</a></div><div class=\"card-footer text-muted\"><div class=\"form-group\"><label for=\"users-list\">Исполнитель</label><select id=\"users-list\" class=\"form-control\">");
	// iterate users
	;(function(){
	  var $$obj = users;
	  if ('number' == typeof $$obj.length) {

	    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
	      var user = $$obj[$index];

	buf.push("<option" + (jade.attr("value", "" + (user._id) + "", true, true)) + ">" + (jade.escape((jade_interp = user.fio) == null ? '' : jade_interp)) + "</option>");
	    }

	  } else {
	    var $$l = 0;
	    for (var $index in $$obj) {
	      $$l++;      var user = $$obj[$index];

	buf.push("<option" + (jade.attr("value", "" + (user._id) + "", true, true)) + ">" + (jade.escape((jade_interp = user.fio) == null ? '' : jade_interp)) + "</option>");
	    }

	  }
	}).call(this);

	buf.push("</select></div><a id=\"print-path-btn\" href=\"#\" class=\"btn btn-primary\">печатать</a><a id=\"assing-user-btn\" href=\"#\" class=\"btn btn-default\">назначить исполнителя</a></div></div>");}.call(this,"undefined" in locals_for_with?locals_for_with.undefined: false?undefined:undefined,"users" in locals_for_with?locals_for_with.users:typeof users!=="undefined"?users:undefined));;return buf.join("");
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

	var jade = __webpack_require__(5);

	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	;var locals_for_with = (locals || {});(function (undefined, users) {
	buf.push("<div class=\"card\"><div class=\"card-header\"><div class=\"form-group\"><label for=\"users-list\">Исполнитель</label><select id=\"users-list\" class=\"form-control\">");
	// iterate users
	;(function(){
	  var $$obj = users;
	  if ('number' == typeof $$obj.length) {

	    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
	      var user = $$obj[$index];

	buf.push("<option" + (jade.attr("value", "" + (user._id) + "", true, true)) + ">" + (jade.escape((jade_interp = user.fio) == null ? '' : jade_interp)) + "</option>");
	    }

	  } else {
	    var $$l = 0;
	    for (var $index in $$obj) {
	      $$l++;      var user = $$obj[$index];

	buf.push("<option" + (jade.attr("value", "" + (user._id) + "", true, true)) + ">" + (jade.escape((jade_interp = user.fio) == null ? '' : jade_interp)) + "</option>");
	    }

	  }
	}).call(this);

	buf.push("</select></div></div><div class=\"card-block\"><h4 class=\"card-title\"> </h4><div class=\"card-text\"><h4>Списки \t<div id=\"lists-list\"></div></h4></div></div><div class=\"card-footer text-muted\"></div></div>");}.call(this,"undefined" in locals_for_with?locals_for_with.undefined: false?undefined:undefined,"users" in locals_for_with?locals_for_with.users:typeof users!=="undefined"?users:undefined));;return buf.join("");
	}

/***/ },

/***/ 138:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, moment) {'use strict';

	module.exports = function() {

		this._modal = __webpack_require__(139);

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

/***/ 139:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(5);

	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;

	buf.push("<div id=\"modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\" class=\"modal fade\"><div role=\"document\" class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button id=\"close-modal-cross-btn\" type=\"button\" data-dismiss=\"modal\" aria-label=\"Close\" class=\"close\"><span aria-hidden=\"true\">×</span></button><h4 id=\"myModalLabel\" class=\"modal-title\">Создание</h4></div><div class=\"modal-body\"><form action=\"\"><div class=\"form-group\"><label for=\"\">заголовок</label><input id=\"event-title\" type=\"text\" class=\"form-control\"></div><div class=\"form-group\"><label for=\"\">начало</label><input id=\"datebegin\" type=\"text\" class=\"form-control flatpickr\"></div><div class=\"form-group\"><label for=\"\">окончание</label><input id=\"dateend\" type=\"text\" class=\"form-control flatpickr\"></div><div class=\"form-group\"><label for=\"\">отделение получатель</label><input id=\"postcode\" type=\"text\" class=\"form-control\"></div><div class=\"form-group\"><label for=\"\">описание</label><input id=\"description\" type=\"text\" class=\"form-control\"></div><div class=\"form-group\"><label for=\"\">статус</label><input id=\"status\" type=\"text\" class=\"form-control\"></div><div class=\"form-group\"><label for=\"\">исполнитель</label><input id=\"executor\" type=\"text\" class=\"form-control\"></div></form></div><div class=\"modal-footer\"><button id=\"close-modal-btn\" type=\"button\" data-dismiss=\"modal\" class=\"btn btn-secondary\">Close</button><button id=\"save-event-btn\" type=\"button\" class=\"btn btn-primary\">Save changes</button></div></div></div></div>");;return buf.join("");
	}

/***/ },

/***/ 256:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(5);

	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	;var locals_for_with = (locals || {});(function (data, undefined) {
	buf.push("<ul class=\"list-group\">");
	// iterate data
	;(function(){
	  var $$obj = data;
	  if ('number' == typeof $$obj.length) {

	    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
	      var l = $$obj[$index];

	buf.push("<li" + (jade.attr("data-list-id", '' + (l._id) + '', true, true)) + " class=\"lists-li list-group-item list-group-item-action\">" + (jade.escape((jade_interp = l._id) == null ? '' : jade_interp)) + "\t\t</li>");
	    }

	  } else {
	    var $$l = 0;
	    for (var $index in $$obj) {
	      $$l++;      var l = $$obj[$index];

	buf.push("<li" + (jade.attr("data-list-id", '' + (l._id) + '', true, true)) + " class=\"lists-li list-group-item list-group-item-action\">" + (jade.escape((jade_interp = l._id) == null ? '' : jade_interp)) + "\t\t</li>");
	    }

	  }
	}).call(this);

	buf.push("</ul>");}.call(this,"data" in locals_for_with?locals_for_with.data:typeof data!=="undefined"?data:undefined,"undefined" in locals_for_with?locals_for_with.undefined: false?undefined:undefined));;return buf.join("");
	}

/***/ }

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aGFwcC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3B1YmxpYy9qcy9kZXYvcG0vYXBwLmpzIiwid2VicGFjazovLy8uL34vamFkZS9saWIvcnVudGltZS5qcyIsIndlYnBhY2s6Ly8vZnMgKGlnbm9yZWQpIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9kZXYvcG0vbW9kdWxlL21hcDRwLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9kZXYvcG0vdmlldy9tYXAuamFkZSIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3BtL21vZHVsZS9wb0RldGFpbC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3BtL3ZpZXcvcG9EZXRhaWwuamFkZSIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3BtL21vZHVsZS9wYXRoTGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3BtL3ZpZXcvcGF0aExpc3QuamFkZSIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3BtL3ZpZXcvbGlzdEVsLmphZGUiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2Rldi9wbS92aWV3L3N1Ymxpc3QuamFkZSIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3BtL3ZpZXcvcGRmUGF0aExpc3QuamFkZSIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3BtL3ZpZXcvZWRpdGRlbEV2ZW50LmphZGUiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2Rldi9wbS92aWV3L2xpc3RzLmphZGUiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2Rldi9wbS9tb2R1bGUvbmV3RXZlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2Rldi9wbS92aWV3L25ld0V2ZW50LmphZGUiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2Rldi9wbS92aWV3L3VsTGlzdHMuamFkZSJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG4vL21vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcbmNvbnNvbGUubG9nKCdoaSBwY2h0Jyk7XHJcblxyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHRcclxuXHJcblx0JChcIi5mbGF0cGlja3JcIikuZmxhdHBpY2tyKHtcclxuXHRcdGVuYWJsZVRpbWU6IHRydWUsXHJcblx0fSk7XHJcblxyXG5cdHZhciBteU1hcD1yZXF1aXJlKCcuL21vZHVsZS9tYXA0cC5qcycpO1x0XHJcblx0eW1hcHMucmVhZHkoaW5pdCk7XHJcblx0dmFyIF9teU1hcDtcclxuXHR2YXIgbmV2bnQ9cmVxdWlyZSgnLi9tb2R1bGUvbmV3RXZlbnQuanMnKTtcclxuXHJcblx0ZnVuY3Rpb24gaW5pdCgpIHtcclxuXHRcdFxyXG5cdFx0X215TWFwPW15TWFwKCk7XHJcblxyXG5cdFx0JCgnI21hcC1sb2FkLWxpbmsnKS5jbGljayhmdW5jdGlvbigpe1xyXG5cdFx0XHRfbXlNYXAuZGVzdHJveSgpO1xyXG5cdFx0XHRfbXlNYXA9bnVsbDtcclxuXHRcdFx0X215TWFwPW15TWFwKCk7XHJcblxyXG5cdFx0fSk7XHJcblxyXG5cdFx0JCgnI25ldy1ldm50LWxpbmsnKS5jbGljayhmdW5jdGlvbihlKXtcclxuXHRcdFx0dmFyIF9uZXZudD0gbmV3IG5ldm50KCk7XHJcblx0XHRcdF9uZXZudC5pbml0KCk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cclxuXHJcbn0pO1xyXG5cclxuLy99XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvanMvZGV2L3BtL2FwcC5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogTWVyZ2UgdHdvIGF0dHJpYnV0ZSBvYmplY3RzIGdpdmluZyBwcmVjZWRlbmNlXG4gKiB0byB2YWx1ZXMgaW4gb2JqZWN0IGBiYC4gQ2xhc3NlcyBhcmUgc3BlY2lhbC1jYXNlZFxuICogYWxsb3dpbmcgZm9yIGFycmF5cyBhbmQgbWVyZ2luZy9qb2luaW5nIGFwcHJvcHJpYXRlbHlcbiAqIHJlc3VsdGluZyBpbiBhIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYVxuICogQHBhcmFtIHtPYmplY3R9IGJcbiAqIEByZXR1cm4ge09iamVjdH0gYVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5tZXJnZSA9IGZ1bmN0aW9uIG1lcmdlKGEsIGIpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICB2YXIgYXR0cnMgPSBhWzBdO1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYS5sZW5ndGg7IGkrKykge1xuICAgICAgYXR0cnMgPSBtZXJnZShhdHRycywgYVtpXSk7XG4gICAgfVxuICAgIHJldHVybiBhdHRycztcbiAgfVxuICB2YXIgYWMgPSBhWydjbGFzcyddO1xuICB2YXIgYmMgPSBiWydjbGFzcyddO1xuXG4gIGlmIChhYyB8fCBiYykge1xuICAgIGFjID0gYWMgfHwgW107XG4gICAgYmMgPSBiYyB8fCBbXTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYWMpKSBhYyA9IFthY107XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGJjKSkgYmMgPSBbYmNdO1xuICAgIGFbJ2NsYXNzJ10gPSBhYy5jb25jYXQoYmMpLmZpbHRlcihudWxscyk7XG4gIH1cblxuICBmb3IgKHZhciBrZXkgaW4gYikge1xuICAgIGlmIChrZXkgIT0gJ2NsYXNzJykge1xuICAgICAgYVtrZXldID0gYltrZXldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBhO1xufTtcblxuLyoqXG4gKiBGaWx0ZXIgbnVsbCBgdmFsYHMuXG4gKlxuICogQHBhcmFtIHsqfSB2YWxcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBudWxscyh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPSBudWxsICYmIHZhbCAhPT0gJyc7XG59XG5cbi8qKlxuICogam9pbiBhcnJheSBhcyBjbGFzc2VzLlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuam9pbkNsYXNzZXMgPSBqb2luQ2xhc3NlcztcbmZ1bmN0aW9uIGpvaW5DbGFzc2VzKHZhbCkge1xuICByZXR1cm4gKEFycmF5LmlzQXJyYXkodmFsKSA/IHZhbC5tYXAoam9pbkNsYXNzZXMpIDpcbiAgICAodmFsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSA/IE9iamVjdC5rZXlzKHZhbCkuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIHZhbFtrZXldOyB9KSA6XG4gICAgW3ZhbF0pLmZpbHRlcihudWxscykuam9pbignICcpO1xufVxuXG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gY2xhc3Nlcy5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBjbGFzc2VzXG4gKiBAcGFyYW0ge0FycmF5LjxCb29sZWFuPn0gZXNjYXBlZFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmNscyA9IGZ1bmN0aW9uIGNscyhjbGFzc2VzLCBlc2NhcGVkKSB7XG4gIHZhciBidWYgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbGFzc2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGVzY2FwZWQgJiYgZXNjYXBlZFtpXSkge1xuICAgICAgYnVmLnB1c2goZXhwb3J0cy5lc2NhcGUoam9pbkNsYXNzZXMoW2NsYXNzZXNbaV1dKSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBidWYucHVzaChqb2luQ2xhc3NlcyhjbGFzc2VzW2ldKSk7XG4gICAgfVxuICB9XG4gIHZhciB0ZXh0ID0gam9pbkNsYXNzZXMoYnVmKTtcbiAgaWYgKHRleHQubGVuZ3RoKSB7XG4gICAgcmV0dXJuICcgY2xhc3M9XCInICsgdGV4dCArICdcIic7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG59O1xuXG5cbmV4cG9ydHMuc3R5bGUgPSBmdW5jdGlvbiAodmFsKSB7XG4gIGlmICh2YWwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModmFsKS5tYXAoZnVuY3Rpb24gKHN0eWxlKSB7XG4gICAgICByZXR1cm4gc3R5bGUgKyAnOicgKyB2YWxbc3R5bGVdO1xuICAgIH0pLmpvaW4oJzsnKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdmFsO1xuICB9XG59O1xuLyoqXG4gKiBSZW5kZXIgdGhlIGdpdmVuIGF0dHJpYnV0ZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGVzY2FwZWRcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gdGVyc2VcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5hdHRyID0gZnVuY3Rpb24gYXR0cihrZXksIHZhbCwgZXNjYXBlZCwgdGVyc2UpIHtcbiAgaWYgKGtleSA9PT0gJ3N0eWxlJykge1xuICAgIHZhbCA9IGV4cG9ydHMuc3R5bGUodmFsKTtcbiAgfVxuICBpZiAoJ2Jvb2xlYW4nID09IHR5cGVvZiB2YWwgfHwgbnVsbCA9PSB2YWwpIHtcbiAgICBpZiAodmFsKSB7XG4gICAgICByZXR1cm4gJyAnICsgKHRlcnNlID8ga2V5IDoga2V5ICsgJz1cIicgKyBrZXkgKyAnXCInKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgfSBlbHNlIGlmICgwID09IGtleS5pbmRleE9mKCdkYXRhJykgJiYgJ3N0cmluZycgIT0gdHlwZW9mIHZhbCkge1xuICAgIGlmIChKU09OLnN0cmluZ2lmeSh2YWwpLmluZGV4T2YoJyYnKSAhPT0gLTEpIHtcbiAgICAgIGNvbnNvbGUud2FybignU2luY2UgSmFkZSAyLjAuMCwgYW1wZXJzYW5kcyAoYCZgKSBpbiBkYXRhIGF0dHJpYnV0ZXMgJyArXG4gICAgICAgICAgICAgICAgICAgJ3dpbGwgYmUgZXNjYXBlZCB0byBgJmFtcDtgJyk7XG4gICAgfTtcbiAgICBpZiAodmFsICYmIHR5cGVvZiB2YWwudG9JU09TdHJpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnNvbGUud2FybignSmFkZSB3aWxsIGVsaW1pbmF0ZSB0aGUgZG91YmxlIHF1b3RlcyBhcm91bmQgZGF0ZXMgaW4gJyArXG4gICAgICAgICAgICAgICAgICAgJ0lTTyBmb3JtIGFmdGVyIDIuMC4wJyk7XG4gICAgfVxuICAgIHJldHVybiAnICcgKyBrZXkgKyBcIj0nXCIgKyBKU09OLnN0cmluZ2lmeSh2YWwpLnJlcGxhY2UoLycvZywgJyZhcG9zOycpICsgXCInXCI7XG4gIH0gZWxzZSBpZiAoZXNjYXBlZCkge1xuICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbC50b0lTT1N0cmluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS53YXJuKCdKYWRlIHdpbGwgc3RyaW5naWZ5IGRhdGVzIGluIElTTyBmb3JtIGFmdGVyIDIuMC4wJyk7XG4gICAgfVxuICAgIHJldHVybiAnICcgKyBrZXkgKyAnPVwiJyArIGV4cG9ydHMuZXNjYXBlKHZhbCkgKyAnXCInO1xuICB9IGVsc2Uge1xuICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbC50b0lTT1N0cmluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS53YXJuKCdKYWRlIHdpbGwgc3RyaW5naWZ5IGRhdGVzIGluIElTTyBmb3JtIGFmdGVyIDIuMC4wJyk7XG4gICAgfVxuICAgIHJldHVybiAnICcgKyBrZXkgKyAnPVwiJyArIHZhbCArICdcIic7XG4gIH1cbn07XG5cbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBhdHRyaWJ1dGVzIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge09iamVjdH0gZXNjYXBlZFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmF0dHJzID0gZnVuY3Rpb24gYXR0cnMob2JqLCB0ZXJzZSl7XG4gIHZhciBidWYgPSBbXTtcblxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG5cbiAgaWYgKGtleXMubGVuZ3RoKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tpXVxuICAgICAgICAsIHZhbCA9IG9ialtrZXldO1xuXG4gICAgICBpZiAoJ2NsYXNzJyA9PSBrZXkpIHtcbiAgICAgICAgaWYgKHZhbCA9IGpvaW5DbGFzc2VzKHZhbCkpIHtcbiAgICAgICAgICBidWYucHVzaCgnICcgKyBrZXkgKyAnPVwiJyArIHZhbCArICdcIicpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBidWYucHVzaChleHBvcnRzLmF0dHIoa2V5LCB2YWwsIGZhbHNlLCB0ZXJzZSkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBidWYuam9pbignJyk7XG59O1xuXG4vKipcbiAqIEVzY2FwZSB0aGUgZ2l2ZW4gc3RyaW5nIG9mIGBodG1sYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaHRtbFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxudmFyIGphZGVfZW5jb2RlX2h0bWxfcnVsZXMgPSB7XG4gICcmJzogJyZhbXA7JyxcbiAgJzwnOiAnJmx0OycsXG4gICc+JzogJyZndDsnLFxuICAnXCInOiAnJnF1b3Q7J1xufTtcbnZhciBqYWRlX21hdGNoX2h0bWwgPSAvWyY8PlwiXS9nO1xuXG5mdW5jdGlvbiBqYWRlX2VuY29kZV9jaGFyKGMpIHtcbiAgcmV0dXJuIGphZGVfZW5jb2RlX2h0bWxfcnVsZXNbY10gfHwgYztcbn1cblxuZXhwb3J0cy5lc2NhcGUgPSBqYWRlX2VzY2FwZTtcbmZ1bmN0aW9uIGphZGVfZXNjYXBlKGh0bWwpe1xuICB2YXIgcmVzdWx0ID0gU3RyaW5nKGh0bWwpLnJlcGxhY2UoamFkZV9tYXRjaF9odG1sLCBqYWRlX2VuY29kZV9jaGFyKTtcbiAgaWYgKHJlc3VsdCA9PT0gJycgKyBodG1sKSByZXR1cm4gaHRtbDtcbiAgZWxzZSByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXG4gKiBSZS10aHJvdyB0aGUgZ2l2ZW4gYGVycmAgaW4gY29udGV4dCB0byB0aGVcbiAqIHRoZSBqYWRlIGluIGBmaWxlbmFtZWAgYXQgdGhlIGdpdmVuIGBsaW5lbm9gLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVyclxuICogQHBhcmFtIHtTdHJpbmd9IGZpbGVuYW1lXG4gKiBAcGFyYW0ge1N0cmluZ30gbGluZW5vXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLnJldGhyb3cgPSBmdW5jdGlvbiByZXRocm93KGVyciwgZmlsZW5hbWUsIGxpbmVubywgc3RyKXtcbiAgaWYgKCEoZXJyIGluc3RhbmNlb2YgRXJyb3IpKSB0aHJvdyBlcnI7XG4gIGlmICgodHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyB8fCAhZmlsZW5hbWUpICYmICFzdHIpIHtcbiAgICBlcnIubWVzc2FnZSArPSAnIG9uIGxpbmUgJyArIGxpbmVubztcbiAgICB0aHJvdyBlcnI7XG4gIH1cbiAgdHJ5IHtcbiAgICBzdHIgPSBzdHIgfHwgcmVxdWlyZSgnZnMnKS5yZWFkRmlsZVN5bmMoZmlsZW5hbWUsICd1dGY4JylcbiAgfSBjYXRjaCAoZXgpIHtcbiAgICByZXRocm93KGVyciwgbnVsbCwgbGluZW5vKVxuICB9XG4gIHZhciBjb250ZXh0ID0gM1xuICAgICwgbGluZXMgPSBzdHIuc3BsaXQoJ1xcbicpXG4gICAgLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIGNvbnRleHQsIDApXG4gICAgLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIGNvbnRleHQpO1xuXG4gIC8vIEVycm9yIGNvbnRleHRcbiAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSl7XG4gICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyAnICA+ICcgOiAnICAgICcpXG4gICAgICArIGN1cnJcbiAgICAgICsgJ3wgJ1xuICAgICAgKyBsaW5lO1xuICB9KS5qb2luKCdcXG4nKTtcblxuICAvLyBBbHRlciBleGNlcHRpb24gbWVzc2FnZVxuICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCAnSmFkZScpICsgJzonICsgbGluZW5vXG4gICAgKyAnXFxuJyArIGNvbnRleHQgKyAnXFxuXFxuJyArIGVyci5tZXNzYWdlO1xuICB0aHJvdyBlcnI7XG59O1xuXG5leHBvcnRzLkRlYnVnSXRlbSA9IGZ1bmN0aW9uIERlYnVnSXRlbShsaW5lbm8sIGZpbGVuYW1lKSB7XG4gIHRoaXMubGluZW5vID0gbGluZW5vO1xuICB0aGlzLmZpbGVuYW1lID0gZmlsZW5hbWU7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vamFkZS9saWIvcnVudGltZS5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMiAzIiwiLyogKGlnbm9yZWQpICovXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZnMgKGlnbm9yZWQpXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAyIDMiLCIndXNlIHN0cmljdCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG5cdGNvbnNvbGUubG9nKCdtYXA0cC5qcycpO1xyXG5cclxuXHR2YXIgX21hcGphZGUgPSByZXF1aXJlKCcuLi92aWV3L21hcC5qYWRlJyk7XHJcblx0JCgnLmMtcGxhY2UnKS5odG1sKF9tYXBqYWRlKCkpO1xyXG5cclxuXHR2YXIgX3BvZGV0YWlsID0gcmVxdWlyZSgnLi4vbW9kdWxlL3BvRGV0YWlsLmpzJyk7XHJcblx0dmFyIHBvRGV0YWlsID0gbmV3IF9wb2RldGFpbCgpO1xyXG5cclxuXHR2YXIgX3BhdGhMaXN0ID0gcmVxdWlyZSgnLi4vbW9kdWxlL3BhdGhMaXN0LmpzJyk7XHJcblx0dmFyIHBhdGhMaXN0ID0gbmV3IF9wYXRoTGlzdCgpO1xyXG5cclxuXHR2YXIgX3NhdmUgPSB0cnVlO1xyXG5cdHZhciBfZXZlbnQsIF9wb3N0T2ZmaWNlQXJyO1xyXG5cdHZhciBteUNvbGxlY3Rpb24gPSBuZXcgeW1hcHMuR2VvT2JqZWN0Q29sbGVjdGlvbigpO1xyXG5cdHZhciBfcm91dGU7XHJcblxyXG5cdHZhciBteUJhbGxvb25Db250ZW50Qm9keUxheW91dCA9IHltYXBzLnRlbXBsYXRlTGF5b3V0RmFjdG9yeS5jcmVhdGVDbGFzcyhcclxuXHRcdCc8cD4kW3Byb3BlcnRpZXMuZGF0YS5wb3N0YWxDb2RlXTwvcD48cD4kW3Byb3BlcnRpZXMuZGF0YS5hZGRyZXNzU291cmNlXTwvcD48cD4kW3Byb3BlcnRpZXMuZGF0YS50eXBlQ29kZV08L3A+PHA+0LrQvtC7LdCy0L4g0LfQsNGP0LLQvtC6ICRbcHJvcGVydGllcy5kYXRhLmV2bnRUb3RhbF08L3A+PGJyIC8+PGJ1dHRvbiBpZD1cInNob3ctcG8tZGV0YWlsLWJ0blwiPtCf0L7QtNGA0L7QsdC90L48L2J1dHRvbj48YnIgLz48YnV0dG9uIGlkPVwiYWRkLXRvLXBhdGgtYnRuXCI+0JIg0YHQv9C40YHQvtC6PC9idXR0b24+Jywge1xyXG5cdFx0XHRidWlsZDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0bXlCYWxsb29uQ29udGVudEJvZHlMYXlvdXQuc3VwZXJjbGFzcy5idWlsZC5jYWxsKHRoaXMpO1xyXG5cdFx0XHRcdCQoJyNzaG93LXBvLWRldGFpbC1idG4nKS5vbignY2xpY2snLCB7XHJcblx0XHRcdFx0XHRcInBvXCI6IHRoaXMuX2RhdGEucHJvcGVydGllcy5fZGF0YVxyXG5cdFx0XHRcdH0sIHRoaXMub25TaG93UE9EZXRhaWxDbGljayk7XHJcblx0XHRcdFx0JCgnI2FkZC10by1wYXRoLWJ0bicpLm9uKCdjbGljaycsIHtcclxuXHRcdFx0XHRcdFwicG9cIjogdGhpcy5fZGF0YS5wcm9wZXJ0aWVzLl9kYXRhXHJcblx0XHRcdFx0fSwgdGhpcy5vbkFkZFRvUGF0aENsaWNrKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0Y2xlYXI6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdCQoJyNzaG93LXBvLWRldGFpbC1idG4nKS5vZmYoJ2NsaWNrJywgdGhpcy5vblNob3dQT0RldGFpbENsaWNrKTtcclxuXHRcdFx0XHRteUJhbGxvb25Db250ZW50Qm9keUxheW91dC5zdXBlcmNsYXNzLmNsZWFyLmNhbGwodGhpcyk7XHJcblx0XHRcdH0sXHJcblx0XHRcdG9uU2hvd1BPRGV0YWlsQ2xpY2s6IGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0XHRwb0RldGFpbC5pbml0KGUuZGF0YS5wby5kYXRhLCBteU1hcCk7XHJcblx0XHRcdH0sXHJcblx0XHRcdG9uQWRkVG9QYXRoQ2xpY2s6IGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0XHRwYXRoTGlzdC5hZGRFbGVtZW50KGUuZGF0YS5wby5kYXRhKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdHZhciBteU1hcCA9IG5ldyB5bWFwcy5NYXAoXCJtYXB5XCIsIHtcclxuXHRcdGNlbnRlcjogWzUwLjU5LCAzNi41OF0sXHJcblx0XHR6b29tOiAxMCxcclxuXHRcdGNvbnRyb2xzOiBbJ3JvdXRlRWRpdG9yJ11cclxuXHR9LCB7XHJcblx0XHRidXR0b25NYXhXaWR0aDogMTUwXHJcblx0fSk7XHJcblxyXG5cdGluaXRNYXAoKTtcclxuXHJcblx0ZnVuY3Rpb24gY3JlYXRlUGF0aChzZWxlY3RlZEVsKSB7XHJcblx0XHQkKCcjcG8tY2VudHItYnRuJykub2ZmKCk7XHJcblx0XHRfcG9zdE9mZmljZUFyciA9IFtdO1xyXG5cdFx0bXlDb2xsZWN0aW9uLnJlbW92ZUFsbCgpO1xyXG5cdFx0aWYgKF9yb3V0ZSlcclxuXHRcdFx0bXlNYXAuZ2VvT2JqZWN0cy5yZW1vdmUoX3JvdXRlKTtcclxuXHJcblx0XHR2YXIgcGF0aEFyciA9IHNlbGVjdGVkRWwubWFwKGZ1bmN0aW9uKG90ZCkge1xyXG5cdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdHR5cGU6ICd3YXlQb2ludCcsXHJcblx0XHRcdFx0cG9pbnQ6IFtvdGQubGF0aXR1ZGUsIG90ZC5sb25naXR1ZGVdXHJcblx0XHRcdH07XHJcblx0XHR9KTtcclxuXHRcdHltYXBzLnJvdXRlKHBhdGhBcnIpLnRoZW4oXHJcblx0XHRcdGZ1bmN0aW9uKHJvdXRlKSB7XHJcblx0XHRcdFx0X3JvdXRlID0gcm91dGU7XHJcblx0XHRcdFx0bXlNYXAuZ2VvT2JqZWN0cy5hZGQocm91dGUpO1xyXG5cclxuXHRcdFx0XHR2YXIgcG9pbnRzID0gcm91dGUuZ2V0V2F5UG9pbnRzKCk7XHJcblx0XHRcdFx0cG9pbnRzLm9wdGlvbnMuc2V0KCdwcmVzZXQnLCAnaXNsYW5kcyNibHVlU3RyZXRjaHlJY29uJyk7XHJcblx0XHRcdFx0cG9pbnRzLmVhY2goZnVuY3Rpb24oZWwsIGkpIHtcclxuXHRcdFx0XHRcdGVsLnByb3BlcnRpZXMuc2V0KCdpY29uQ29udGVudCcsIHNlbGVjdGVkRWxbaV0ucG9zdGFsQ29kZSArIFwiINGC0L7Rh9C60LAg4oSWXCIgKyAoaSArIDEpKTtcclxuXHRcdFx0XHRcdGVsLnByb3BlcnRpZXMuc2V0KCdiYWxsb29uQ29udGVudCcsIHNlbGVjdGVkRWxbaV0ucG9zdGFsQ29kZSArIFwiINGC0L7Rh9C60LAg4oSWXCIgKyAoaSArIDEpKTtcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdH0sXHJcblx0XHRcdGZ1bmN0aW9uKGVycm9yKSB7XHJcblx0XHRcdFx0YWxlcnQoXCLQktC+0LfQvdC40LrQu9CwINC+0YjQuNCx0LrQsDogXCIgKyBlcnJvci5tZXNzYWdlKTtcclxuXHRcdFx0fVxyXG5cdFx0KTtcclxuXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBzb3J0Q29tcGFyYXRvcihhLCBiKSB7XHJcblx0XHRpZiAocGFyc2VJbnQoYS5wb3N0YWxDb2RlKSA+IHBhcnNlSW50KGIucG9zdGFsQ29kZSkpIHtcclxuXHRcdFx0cmV0dXJuIDE7XHJcblx0XHR9XHJcblx0XHRpZiAocGFyc2VJbnQoYS5wb3N0YWxDb2RlKSA8IHBhcnNlSW50KGIucG9zdGFsQ29kZSkpIHtcclxuXHRcdFx0cmV0dXJuIC0xO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gaW5pdE1hcCgpIHtcclxuXHRcdCQuYWpheCh7XHJcblx0XHRcdHR5cGU6ICdHRVQnLFxyXG5cdFx0XHR1cmw6IFwiLi9wb3N0YWxzLmpzb25cIixcclxuXHRcdFx0ZGF0YVR5cGU6IFwianNvblwiLFxyXG5cdFx0XHRzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcblxyXG5cdFx0XHRcdGRhdGEuc29ydChzb3J0Q29tcGFyYXRvcik7XHJcblxyXG5cdFx0XHRcdCQuYWpheCh7XHJcblx0XHRcdFx0XHR0eXBlOiAnR0VUJyxcclxuXHRcdFx0XHRcdHVybDogJy9ldm50L21yJyxcclxuXHRcdFx0XHRcdGRhdGFUeXBlOiAnanNvbicsXHJcblx0XHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbihtcmRhdGEpIHtcclxuXHJcblx0XHRcdFx0XHRcdG1yZGF0YS5zb3J0KHNvcnRDb21wYXJhdG9yKTtcclxuXHJcblx0XHRcdFx0XHRcdGRhdGEuZm9yRWFjaChmdW5jdGlvbihvdGQpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0b3RkLmV2bnRUb3RhbCA9ICcwJztcclxuXHRcdFx0XHRcdFx0XHRtcmRhdGEuZm9yRWFjaChmdW5jdGlvbihtcikge1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKG90ZC5wb3N0YWxDb2RlID09IG1yLl9pZCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRvdGQuZXZudFRvdGFsID0gbXIuY291bnQ7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHRcdFx0dmFyIHN0bCA9ICdpc2xhbmRzI2RhcmtncmVlblN0cmV0Y2h5SWNvbic7XHJcblx0XHRcdFx0XHRcdFx0aWYgKG90ZC5ldm50VG90YWwgPj0gJzEnKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRzdGwgPSAnaXNsYW5kcyNkYXJrYmx1ZVN0cmV0Y2h5SWNvbic7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdGlmIChvdGQuZXZudFRvdGFsID49ICczJykge1xyXG5cdFx0XHRcdFx0XHRcdFx0c3RsID0gJ2lzbGFuZHMjdmlvbGV0U3RyZXRjaHlJY29uJztcclxuXHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdHZhciBwbWFyayA9IG5ldyB5bWFwcy5QbGFjZW1hcmsoW290ZC5sYXRpdHVkZSwgb3RkLmxvbmdpdHVkZV0sIHtcclxuXHRcdFx0XHRcdFx0XHRcdGRhdGE6IG90ZCxcclxuXHRcdFx0XHRcdFx0XHRcdGljb25Db250ZW50OiBvdGQucG9zdGFsQ29kZSArIFwiIC8gXCIgKyBvdGQuZXZudFRvdGFsLFxyXG5cdFx0XHRcdFx0XHRcdFx0aWNvbkNhcHRpb246IG90ZC5wb3N0YWxDb2RlXHJcblx0XHRcdFx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0XHRcdFx0YmFsbG9vbkNvbnRlbnRMYXlvdXQ6IG15QmFsbG9vbkNvbnRlbnRCb2R5TGF5b3V0LFxyXG5cdFx0XHRcdFx0XHRcdFx0cHJlc2V0OiBzdGxcclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0XHRteUNvbGxlY3Rpb24uYWRkKHBtYXJrKTtcclxuXHRcdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0XHRfcG9zdE9mZmljZUFyciA9IGRhdGE7XHJcblx0XHRcdFx0XHRcdG15TWFwLmdlb09iamVjdHMuYWRkKG15Q29sbGVjdGlvbik7XHJcblx0XHRcdFx0XHRcdHBhdGhMaXN0LmluaXQoY3JlYXRlUGF0aCk7XHJcblxyXG5cclxuXHRcdFx0XHRcdFx0JCgnI3BvLWNlbnRyLWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0XHRcdFx0XHR2YXIgcG9ub20gPSAkKCcjcG9udW0nKS52YWwoKTtcclxuXHRcdFx0XHRcdFx0XHRfcG9zdE9mZmljZUFyci5mb3JFYWNoKGZ1bmN0aW9uKHBvKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAocG8ucG9zdGFsQ29kZSA9PSBwb25vbSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRteU1hcC5zZXRDZW50ZXIoW3BvLmxhdGl0dWRlLCBwby5sb25naXR1ZGVdLCAxMywge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNoZWNrWm9vbVJhbmdlOiB0cnVlXHJcblx0XHRcdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdFx0JCgnI2RvLWZpbHRlci1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdFx0XHRcdFx0dmFyIF9yYW5nZSA9ICQoJ2lucHV0W25hbWU9XCJmaWx0ZXJtYXBcIl06Y2hlY2tlZCcpLnZhbCgpO1xyXG5cdFx0XHRcdFx0XHRcdG15Q29sbGVjdGlvbi5yZW1vdmVBbGwoKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0ZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKG90ZCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKG90ZC5ldm50VG90YWwgPj0gcGFyc2VJbnQoX3JhbmdlKSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR2YXIgc3RsID0gJ2lzbGFuZHMjZGFya2dyZWVuU3RyZXRjaHlJY29uJztcclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKG90ZC5ldm50VG90YWwgPj0gJzEnKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0c3RsID0gJ2lzbGFuZHMjZGFya2JsdWVTdHJldGNoeUljb24nO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChvdGQuZXZudFRvdGFsID49ICczJykge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHN0bCA9ICdpc2xhbmRzI3Zpb2xldFN0cmV0Y2h5SWNvbic7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdHZhciBwbWFyayA9IG5ldyB5bWFwcy5QbGFjZW1hcmsoW290ZC5sYXRpdHVkZSwgb3RkLmxvbmdpdHVkZV0sIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRkYXRhOiBvdGQsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWNvbkNvbnRlbnQ6IG90ZC5wb3N0YWxDb2RlICsgXCIgLyBcIiArIG90ZC5ldm50VG90YWwsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWNvbkNhcHRpb246IG90ZC5wb3N0YWxDb2RlXHJcblx0XHRcdFx0XHRcdFx0XHRcdH0sIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRiYWxsb29uQ29udGVudExheW91dDogbXlCYWxsb29uQ29udGVudEJvZHlMYXlvdXQsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0cHJlc2V0OiBzdGxcclxuXHRcdFx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdG15Q29sbGVjdGlvbi5hZGQocG1hcmspO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRteU1hcC5nZW9PYmplY3RzLmFkZChteUNvbGxlY3Rpb24pO1xyXG5cclxuXHRcdFx0XHRcdFx0fSk7XHJcblxyXG5cclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRlcnJvcjogZnVuY3Rpb24oZXJyKSB7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKGVycik7XHJcblxyXG5cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdH0sXHJcblx0XHRcdC8vZXJyb3I6IGxvYWRFcnJvclxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gbXlNYXA7XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy9qcy9kZXYvcG0vbW9kdWxlL21hcDRwLmpzXG4vLyBtb2R1bGUgaWQgPSAxMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAyIDMiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJDOlxcXFxfdGVtcFxcXFxwY2h0XFxcXG5vZGVfbW9kdWxlc1xcXFxqYWRlXFxcXGxpYlxcXFxydW50aW1lLmpzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPGRpdiBpZD1cXFwibWFweVxcXCIgc3R5bGU9XFxcIndpZHRoOiAxMDAlOyBoZWlnaHQ6IDgwMHB4XFxcIj48L2Rpdj5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy9qcy9kZXYvcG0vdmlldy9tYXAuamFkZVxuLy8gbW9kdWxlIGlkID0gMTI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMiAzIiwiJ3VzZSBzcnRpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHM9ZnVuY3Rpb24oKXtcclxuXHJcbiAgdGhpcy5fbW9kYWwgPSByZXF1aXJlKCcuLi92aWV3L3BvRGV0YWlsLmphZGUnKTtcclxuXHJcbiAgdGhpcy5kZXN0cm95TW9kYWwgPSBmdW5jdGlvbigpIHtcclxuICAgICAgIFxyXG4gICAgJCgnI2Nsb3NlLW1vZGFsLWJ0bicpLm9mZignY2xpY2snKTtcclxuICAgICQoJyNjbG9zZS1tb2RhbC1jcm9zcy1idG4nKS5vZmYoJ2NsaWNrJyk7XHJcbiAgICAkKCcubW9kYWwtcGxhY2UnKS5odG1sKCcnKTtcclxuICB9O1xyXG5cclxuICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gIHRoaXMuaW5pdCA9IGZ1bmN0aW9uKGRhdGEsIG15TWFwKSB7XHJcblxyXG4gICAgJCgnLm1vZGFsLXBsYWNlJykuaHRtbCh0aGlzLl9tb2RhbCh7XCJkYXRhXCI6IGRhdGF9KSk7XHJcblxyXG5cclxuICAgICQoJyNjbG9zZS1tb2RhbC1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnI2Nsb3NlLW1vZGFsLWNyb3NzLWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcjbW9kYWwnKS5tb2RhbCgnc2hvdycpO1xyXG5cclxuICAgICQoJyNtb2RhbCcpLm9uKCdoaWRkZW4uYnMubW9kYWwnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdtb2RhbCBoaWRlJyk7XHJcbiAgICAgIHNlbGYuZGVzdHJveU1vZGFsKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgfTtcclxuXHRcclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2pzL2Rldi9wbS9tb2R1bGUvcG9EZXRhaWwuanNcbi8vIG1vZHVsZSBpZCA9IDEyOVxuLy8gbW9kdWxlIGNodW5rcyA9IDIgMyIsInZhciBqYWRlID0gcmVxdWlyZShcIkM6XFxcXF90ZW1wXFxcXHBjaHRcXFxcbm9kZV9tb2R1bGVzXFxcXGphZGVcXFxcbGliXFxcXHJ1bnRpbWUuanNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChkYXRhLCB1bmRlZmluZWQpIHtcbmJ1Zi5wdXNoKFwiPGRpdiBpZD1cXFwibW9kYWxcXFwiIHRhYmluZGV4PVxcXCItMVxcXCIgcm9sZT1cXFwiZGlhbG9nXFxcIiBhcmlhLWxhYmVsbGVkYnk9XFxcIm15TW9kYWxMYWJlbFxcXCIgYXJpYS1oaWRkZW49XFxcInRydWVcXFwiIGNsYXNzPVxcXCJtb2RhbCBmYWRlXFxcIj48ZGl2IHJvbGU9XFxcImRvY3VtZW50XFxcIiBjbGFzcz1cXFwibW9kYWwtZGlhbG9nXFxcIj48ZGl2IGNsYXNzPVxcXCJtb2RhbC1jb250ZW50XFxcIj48ZGl2IGNsYXNzPVxcXCJtb2RhbC1oZWFkZXJcXFwiPjxidXR0b24gaWQ9XFxcImNsb3NlLW1vZGFsLWNyb3NzLWJ0blxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBkYXRhLWRpc21pc3M9XFxcIm1vZGFsXFxcIiBhcmlhLWxhYmVsPVxcXCJDbG9zZVxcXCIgY2xhc3M9XFxcImNsb3NlXFxcIj48c3BhbiBhcmlhLWhpZGRlbj1cXFwidHJ1ZVxcXCI+w5c8L3NwYW4+PC9idXR0b24+PGg0IGlkPVxcXCJteU1vZGFsTGFiZWxcXFwiIGNsYXNzPVxcXCJtb2RhbC10aXRsZVxcXCI+0JTQtdGC0LDQu9GM0L3QviAtIFwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IGRhdGEucG9zdGFsQ29kZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiPC9oND48L2Rpdj48ZGl2IGNsYXNzPVxcXCJtb2RhbC1ib2R5XFxcIj48ZGl2IGNsYXNzPVxcXCJjYXJkXFxcIj48aDMgY2xhc3M9XFxcImNhcmQtaGVhZGVyXFxcIj5cIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBkYXRhLnBvc3RhbENvZGUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIjwvaDM+PGRpdiBjbGFzcz1cXFwiY2FyZC1ibG9ja1xcXCI+PGg0IGNsYXNzPVxcXCJjYXJkLXRpdGxlXFxcIj5cIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBkYXRhLnBvc3RhbENvZGUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIiBcIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBkYXRhLnNldHRsZW1lbnQpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIiBcIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBkYXRhLmFkZHJlc3NTb3VyY2UpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIjwvaDQ+PGRpdiBjbGFzcz1cXFwiY2FyZC10ZXh0XFxcIj48aDQ+0J/RgNC10LTQvtGB0YLQsNCy0LvRj9C10LzRi9C1INGD0YHQu9GD0LPQuDwvaDQ+PHVsPjwvdWw+XCIpO1xuLy8gaXRlcmF0ZSBkYXRhLnNlcnZpY2VHcm91cHNcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gZGF0YS5zZXJ2aWNlR3JvdXBzO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIgc2cgPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIjxsaT5cIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBzZy5zZXJ2aWNlR3JvdXBOYW1lKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCI8L2xpPlwiKTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBzZyA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGxpPlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IHNnLnNlcnZpY2VHcm91cE5hbWUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIjwvbGk+XCIpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG5idWYucHVzaChcIjxoND7QotC10LvQtdGE0L7QvdGLPC9oND48dWw+PC91bD5cIik7XG4vLyBpdGVyYXRlIGRhdGEucGhvbmVzXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IGRhdGEucGhvbmVzO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIgcGhvbmUgPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIjxsaT4gKFwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IHBob25lLnBob25lVG93bkNvZGUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIikgXCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gcGhvbmUucGhvbmVOdW1iZXIpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIiAoXCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gcGhvbmUucGhvbmVUeXBlTmFtZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiKTwvbGk+XCIpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIHBob25lID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8bGk+IChcIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBwaG9uZS5waG9uZVRvd25Db2RlKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCIpIFwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IHBob25lLnBob25lTnVtYmVyKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCIgKFwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IHBob25lLnBob25lVHlwZU5hbWUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIik8L2xpPlwiKTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxuYnVmLnB1c2goXCI8aDQ+0JLRgNC10LzRjyDRgNCw0LHQvtGC0YtcXHRcXHQ8L2g0Pjx1bD48L3VsPlwiKTtcbi8vIGl0ZXJhdGUgZGF0YS53b3JraW5nSG91cnNcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gZGF0YS53b3JraW5nSG91cnM7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciB3aCA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGxpPlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IHdoLndlZWtEYXlOYW1lKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCJcXHQ8L2xpPlwiKTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciB3aCA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGxpPlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IHdoLndlZWtEYXlOYW1lKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCJcXHQ8L2xpPlwiKTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxuYnVmLnB1c2goXCI8L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJtb2RhbC1mb290ZXJcXFwiPjxidXR0b24gaWQ9XFxcImNsb3NlLW1vZGFsLWJ0blxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBkYXRhLWRpc21pc3M9XFxcIm1vZGFsXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPkNsb3NlPC9idXR0b24+PC9kaXY+PC9kaXY+PC9kaXY+PC9kaXY+XCIpO30uY2FsbCh0aGlzLFwiZGF0YVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguZGF0YTp0eXBlb2YgZGF0YSE9PVwidW5kZWZpbmVkXCI/ZGF0YTp1bmRlZmluZWQsXCJ1bmRlZmluZWRcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnVuZGVmaW5lZDp0eXBlb2YgdW5kZWZpbmVkIT09XCJ1bmRlZmluZWRcIj91bmRlZmluZWQ6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy9qcy9kZXYvcG0vdmlldy9wb0RldGFpbC5qYWRlXG4vLyBtb2R1bGUgaWQgPSAxMzBcbi8vIG1vZHVsZSBjaHVua3MgPSAyIDMiLCIndXNlIHN0cmljdCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG5cclxuXHR0aGlzLnBsSmFkZSA9IHJlcXVpcmUoJy4uL3ZpZXcvcGF0aExpc3QuamFkZScpO1xyXG5cdHRoaXMuZWxKYWRlID0gcmVxdWlyZSgnLi4vdmlldy9saXN0RWwuamFkZScpO1xyXG5cdHRoaXMubmVzdGVkTGlzdEphZGUgPSByZXF1aXJlKCcuLi92aWV3L3N1Ymxpc3QuamFkZScpO1xyXG5cdHRoaXMucGRmSmFkZSA9IHJlcXVpcmUoJy4uL3ZpZXcvcGRmUGF0aExpc3QuamFkZScpO1xyXG5cdHRoaXMuZXZudERldGFpbEphZGUgPSByZXF1aXJlKCcuLi92aWV3L2VkaXRkZWxFdmVudC5qYWRlJyk7XHJcblx0dGhpcy5saXN0c0phZGUgPSByZXF1aXJlKCcuLi92aWV3L2xpc3RzLmphZGUnKTtcclxuXHR0aGlzLnltYXBDZWF0ZVBhdGggPSB7fTtcclxuXHR0aGlzLnNlbGVjdGVkRUwgPSBbXTtcclxuXHR0aGlzLnVzZXJzPVtdO1xyXG5cdHRoaXMubGlzdHM9e307XHJcblxyXG5cdHZhciBzZWxmID0gdGhpcztcclxuXHJcblx0dGhpcy5pbml0ID0gZnVuY3Rpb24oeU1hcENyZWF0ZVBhdGgpIHtcdFx0XHJcblx0XHQvL3NlbGYubXlNYXA9bXlNYXA7XHJcblx0XHRzZWxmLnltYXBDZWF0ZVBhdGggPSB5TWFwQ3JlYXRlUGF0aDtcclxuXHRcdFxyXG5cclxuXHRcdCQuZ2V0KCcvdXNlcnMvYWxsJywgZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdHNlbGYudXNlcnM9ZGF0YTtcclxuXHRcdFx0JCgnLmwtcGxhY2UnKS5odG1sKHNlbGYucGxKYWRlKHsndXNlcnMnOmRhdGF9KSk7XHJcblx0XHRcdCQoJy5saXN0LXBsYWNlJykuaHRtbChzZWxmLmxpc3RzSmFkZSh7J3VzZXJzJzpkYXRhfSkpO1xyXG5cdFx0XHQkKCcjY2xlYXItcGxpc3QtYnRuJykub24oJ2NsaWNrJywgc2VsZi5yZW1vdmVBbGwpO1xyXG5cdFx0XHQkKCcjY3JlYXRlLXBhdGgtYnRuJykub24oJ2NsaWNrJywgc2VsZi5jcmVhdGVQYXRoKTtcclxuXHRcdFx0JCgnI3ByaW50LXBhdGgtYnRuJykub24oJ2NsaWNrJywgc2VsZi5wZGZQYXRoKTtcclxuXHRcdFx0JCgnI2Fzc2luZy11c2VyLWJ0bicpLm9uKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblxyXG5cdFx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdFx0XHR2YXIgX3V2YWw9JCgnI3VzZXJzLWxpc3QnKS52YWwoKTtcclxuXHRcdFx0XHR2YXIgX2V2bnRzPVtdO1xyXG5cdFx0XHRcdHNlbGYuc2VsZWN0ZWRFTC5mb3JFYWNoKGZ1bmN0aW9uKG9wKXtcclxuXHRcdFx0XHRcdC8qdmFyIF9wbz17cG9zdGFsQ29kZTpvcC5wb3N0YWxDb2RlLCBldmVudHM6W119O1xyXG5cdFx0XHRcdFx0aWYob3AuZXZudHMpe1xyXG5cdFx0XHRcdFx0XHRvcC5ldm50cy5mb3JFYWNoKGZ1bmN0aW9uKGV2bnQpe1xyXG5cdFx0XHRcdFx0XHRfb3AuZXZldG5zLnB1c2goZXZudC5faWQpO1xyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdF9ldmVudHMucHVzaChfb3ApOyovXHJcblx0XHRcdFx0XHRpZihvcC5ldm50cyl7XHJcblx0XHRcdFx0XHRcdG9wLmV2bnRzLmZvckVhY2goZnVuY3Rpb24oZXZudCl7XHJcblx0XHRcdFx0XHRcdFx0X2V2bnRzLnB1c2goZXZudC5faWQpO1xyXG5cdFx0XHRcdFx0XHR9KTtcdFxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdHZhciBsaXN0PXt1c2VySUQ6X3V2YWwsIGV2bnRJRHM6X2V2bnRzfTtcclxuXHRcdFx0XHQkLmFqYXgoe1xyXG5cdFx0XHRcdFx0dHlwZTogJ1BPU1QnLFxyXG5cdFx0XHRcdFx0dXJsOiAnL2xpc3RzL25ldycsXHJcblx0XHRcdFx0XHRkYXRhOiBKU09OLnN0cmluZ2lmeShsaXN0KSxcclxuXHRcdFx0XHRcdGRhdGFUeXBlOiBcImpzb25cIixcclxuXHRcdFx0XHRcdGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coXCJkYXRhIHNhdmVcIik7XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0Ly9lcnJvcjogYWpheEVycm9yXHJcblx0XHRcdFx0fSk7XHRcdFx0XHRcclxuXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0JC5nZXQoJy9saXN0cy9hbGwnLGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdHNlbGYubGlzdHM9ZGF0YTtcclxuXHRcdFx0XHR2YXIgX2Fycj1bXTtcclxuXHRcdFx0XHR2YXIgdWxMaXN0SmFkZT1yZXF1aXJlKCcuLi92aWV3L3VsTGlzdHMuamFkZScpO1xyXG5cdFx0XHRcdGZvciAodmFyIHByb3AgaW4gZGF0YSl7XHJcblx0XHRcdFx0XHRpZihkYXRhLmhhc093blByb3BlcnR5KHByb3ApKXtcclxuXHRcdFx0XHRcdFx0X2Fyci5wdXNoKGRhdGFbcHJvcF0pO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQkKCcjbGlzdHMtbGlzdCcpLmh0bWwodWxMaXN0SmFkZSh7J2RhdGEnOl9hcnJ9KSk7XHJcblx0XHRcdFx0JCgnLmxpc3RzLWxpJykub24oJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHRcdFx0XHRcdHNlbGYucmVtb3ZlQWxsKCk7XHJcblx0XHRcdFx0XHR2YXIgc2VsZWN0ZWRMaXN0PXNlbGYubGlzdHNbJChlLmN1cnJlbnRUYXJnZXQpLmF0dHIoJ2RhdGEtbGlzdC1pZCcpXTtcclxuXHRcdFx0XHRcdGZvcih2YXIgb3RkTmFtZSBpbiBzZWxlY3RlZExpc3QubGlzdCl7XHJcblx0XHRcdFx0XHRcdHZhciBfb3RkPXNlbGVjdGVkTGlzdC5saXN0W290ZE5hbWVdLnBvc3RhbE9mZmljZTtcclxuXHRcdFx0XHRcdFx0X290ZC5ldm50cz1zZWxlY3RlZExpc3QubGlzdFtvdGROYW1lXS5ldm50cztcclxuXHRcdFx0XHRcdFx0Ly9zZWxmLnNlbGVjdGVkRUwucHVzaChfb3RkKTtcclxuXHRcdFx0XHRcdFx0c2VsZi5hZGRFbGVtZW50KF9vdGQsdHJ1ZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHQvL2NvbnNvbGUubG9nKCQoZS5jdXJyZW50VGFyZ2V0KS5hdHRyKCdkYXRhLWxpc3QtaWQnKSk7XHJcblx0XHRcdFx0XHRzZWxmLmNyZWF0ZVBhdGgoKTtcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcdFx0XHJcblxyXG5cdH07XHJcblxyXG5cdHRoaXMuYWRkRWxlbWVudCA9IGZ1bmN0aW9uKGRhdGEsZXZudExvYWRlZCkge1xyXG5cdFx0JCgnI3BhdGgtbGlzdCcpLmFwcGVuZChzZWxmLmVsSmFkZSh7XHJcblx0XHRcdFwiZGF0YVwiOiBkYXRhXHJcblx0XHR9KSk7XHJcblx0XHRzZWxmLnNlbGVjdGVkRUwucHVzaChkYXRhKTtcclxuXHRcdCQoJ1tkYXRhLXBvLWlkPScgKyBkYXRhLnBvc3RhbENvZGUgKyAnXScpLmNoaWxkcmVuKCcucmVtb3ZlLXBvLWxpc3QnKS5vbignY2xpY2snLCB7XHJcblx0XHRcdGVsZW1lbnQ6IGRhdGFcclxuXHRcdH0sIHNlbGYucmVtb3ZlRWxlbWVudCk7XHJcblx0XHRcclxuXHRcdGlmKGV2bnRMb2FkZWQpe1xyXG5cdFx0XHRzZWxmLnNob3dFdm50cyhkYXRhKTtcclxuXHRcdH1lbHNle1xyXG5cdFx0XHRzZWxmLmxvYWRFdm50RGF0YShkYXRhKTtcclxuXHRcdH1cclxuXHJcblx0fTtcclxuXHJcblx0dGhpcy5zaG93RXZudHM9ZnVuY3Rpb24oX2RhdGEpe1xyXG5cdFx0JCgnW2RhdGEtcG8taWQ9JyArIF9kYXRhLnBvc3RhbENvZGUgKyAnXScpLmZpbmQoJ2kuZmEtc3Bpbm5lcicpLnJlbW92ZSgpO1xyXG5cdFx0JCgnW2RhdGEtcG8taWQ9JyArIF9kYXRhLnBvc3RhbENvZGUgKyAnXScpLmFwcGVuZChzZWxmLm5lc3RlZExpc3RKYWRlKHtcclxuXHRcdFx0XHRcdFx0XCJkYXRhXCI6IF9kYXRhLmV2bnRzXHJcblx0XHRcdFx0fSkpO1xyXG5cdFx0JCgnW2RhdGEtcG8taWQ9JyArIF9kYXRhLnBvc3RhbENvZGUgKyAnXScpLm9uKCdjbGljaycsIHNlbGYubGlzdGVuRXZudCk7XHJcblx0fTtcclxuXHJcblx0dGhpcy5sb2FkRXZudERhdGEgPSBmdW5jdGlvbihfZGF0YSkge1xyXG5cdFx0dmFyIHJhcnIgPSBbXTtcclxuXHRcdCQuYWpheCh7XHJcblx0XHRcdHR5cGU6ICdHRVQnLFxyXG5cdFx0XHQvL3VybDogXCIuL3Rlc3RldmVudC5qc29uXCIsXHJcblx0XHRcdHVybDpcIi9ldm50L2V2bnQvXCIrX2RhdGEucG9zdGFsQ29kZSxcclxuXHRcdFx0ZGF0YVR5cGU6IFwianNvblwiLFxyXG5cdFx0XHRzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coJ3N1Y2Nlc3MgbG9hZCBkYXRhJyk7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdFx0X2RhdGEuZXZudHM9ZGF0YTtcclxuXHRcdFx0XHQkKCdbZGF0YS1wby1pZD0nICsgX2RhdGEucG9zdGFsQ29kZSArICddJykuZmluZCgnaS5mYS1zcGlubmVyJykucmVtb3ZlKCk7XHJcblx0XHRcdFx0JCgnW2RhdGEtcG8taWQ9JyArIF9kYXRhLnBvc3RhbENvZGUgKyAnXScpLmFwcGVuZChzZWxmLm5lc3RlZExpc3RKYWRlKHtcclxuXHRcdFx0XHRcdFx0XCJkYXRhXCI6IGRhdGFcclxuXHRcdFx0XHR9KSk7XHJcblx0XHRcdFx0JCgnW2RhdGEtcG8taWQ9JyArIF9kYXRhLnBvc3RhbENvZGUgKyAnXScpLm9uKCdjbGljaycsIHNlbGYubGlzdGVuRXZudCk7XHJcblx0XHRcdFx0LypyYXJyID0gZGF0YS5maWx0ZXIoZnVuY3Rpb24oZXZudCkge1xyXG5cdFx0XHRcdFx0aWYgKGV2bnQucG9zdGFsQ29kZSA9PSBfZGF0YS5wb3N0YWxDb2RlKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdF9kYXRhLmV2bnRzID0gcmFycjtcclxuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2cocmFycik7XHJcblx0XHRcdFx0XHQkKCdbZGF0YS1wby1pZD0nICsgX2RhdGEucG9zdGFsQ29kZSArICddJykuZmluZCgnaS5mYS1zcGlubmVyJykucmVtb3ZlKCk7XHJcblx0XHRcdFx0XHQkKCdbZGF0YS1wby1pZD0nICsgX2RhdGEucG9zdGFsQ29kZSArICddJykuYXBwZW5kKHNlbGYubmVzdGVkTGlzdEphZGUoe1xyXG5cdFx0XHRcdFx0XHRcImRhdGFcIjogcmFyclxyXG5cdFx0XHRcdFx0fSkpO1xyXG5cdFx0XHRcdFx0Ly8kKCcuZXZudC1saScpLmNoaWxkcmVuKCcuc2hvdy1ldm50LWRldGFpbCcpLm9uKCdjbGljaycsc2VsZi5zaG93RXZudERldGFpbCk7XHJcblx0XHRcdFx0XHQvLyQoJy5ldm50LWxpJykuY2hpbGRyZW4oJy5yZW1vdmUtZXZudC1saXN0Jykub24oJ2NsaWNrJyxzZWxmLnJlbW92ZUV2bnQpO1x0XHRcdFx0XHRcclxuXHRcdFx0XHRcdC8vJCgnW2RhdGEtcG8taWQ9JysgX2RhdGEucG9zdGFsQ29kZSsnXScpLm9uKCdjbGljaycsc2VsZi5zaG93RXZudERldGFpbCk7XHJcblx0XHRcdFx0XHQkKCdbZGF0YS1wby1pZD0nICsgX2RhdGEucG9zdGFsQ29kZSArICddJykub24oJ2NsaWNrJywgc2VsZi5saXN0ZW5Fdm50KTtcclxuXHRcdFx0XHR9LCAvKk1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDAwKSovIC8qMTApOyovXHJcblx0XHRcdH0sXHJcblx0XHRcdGVycm9yOiBmdW5jdGlvbihlcnIpIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZygn0L7RiNC40LHQutCwICgnKTtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhlcnIpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblxyXG5cdH07XHJcblx0dGhpcy5saXN0ZW5Fdm50ID0gZnVuY3Rpb24oZSkge1xyXG5cdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHR2YXIgdHlwZSA9IHRydWU7IC8vZGVsZXRlXHJcblx0XHRpZiAoJChlLnRhcmdldCkucGFyZW50KCkuaGFzQ2xhc3MoJ3Nob3ctZXZudC1kZXRhaWwnKSlcclxuXHRcdFx0dHlwZSA9IGZhbHNlOyAvLydzaG93LWRldGFpbCc7XHJcblxyXG5cdFx0dmFyIG9wID0gJChlLmN1cnJlbnRUYXJnZXQpLmF0dHIoJ2RhdGEtcG8taWQnKTtcclxuXHRcdHZhciBldm50SWQgPSAkKGUudGFyZ2V0KS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdkYXRhLWV2bnQtaWQnKTtcclxuXHRcdC8vY29uc29sZS5sb2coJChlLnRhcmdldCkucGFyZW50KCkuaGFzQ2xhc3MoJ3Nob3ctZXZudC1kZXRhaWwnKSk7XHJcblxyXG5cclxuXHRcdGZvciAodmFyIGkgPSBzZWxmLnNlbGVjdGVkRUwubGVuZ3RoOyBpLS07KSB7XHJcblx0XHRcdGlmIChzZWxmLnNlbGVjdGVkRUxbaV0ucG9zdGFsQ29kZSA9PSBvcCkge1xyXG5cdFx0XHRcdGZvciAodmFyIGogPSBzZWxmLnNlbGVjdGVkRUxbaV0uZXZudHMubGVuZ3RoOyBqLS07KSB7XHJcblx0XHRcdFx0XHRpZiAoc2VsZi5zZWxlY3RlZEVMW2ldLmV2bnRzW2pdLl9pZCA9PSBldm50SWQpIHtcclxuXHRcdFx0XHRcdFx0aWYgKHR5cGUpIHtcclxuXHRcdFx0XHRcdFx0XHRzZWxmLnNlbGVjdGVkRUxbaV0uZXZudHMuc3BsaWNlKGosIDEpO1xyXG5cdFx0XHRcdFx0XHRcdCQoZS50YXJnZXQpLnBhcmVudCgpLnBhcmVudCgpLnJlbW92ZSgpO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdHZhciBfZXZlbnQgPSBzZWxmLnNlbGVjdGVkRUxbaV0uZXZudHNbal07XHJcblx0XHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdFx0JCgnLm1vZGFsLXBsYWNlJykuaHRtbChzZWxmLmV2bnREZXRhaWxKYWRlKCkpO1xyXG5cdFx0XHRcdFx0XHRcdC8qJChcIi5mbGF0cGlja3JcIikuZmxhdHBpY2tyKHtcclxuXHRcdFx0XHRcdFx0XHRcdGVuYWJsZVRpbWU6IHRydWUsXHJcblx0XHRcdFx0XHRcdFx0fSk7Ki9cclxuXHJcblx0XHRcdFx0XHRcdFx0JCgnI21vZGFsJykubW9kYWwoJ3Nob3cnKTtcclxuXHRcdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdFx0XHQkKFwiI2RhdGViZWdpblwiKS5mbGF0cGlja3Ioe1xyXG5cdFx0XHRcdFx0XHRcdHV0YzogdHJ1ZSxcclxuXHRcdFx0XHRcdFx0XHRkZWZhdWx0RGF0ZTogbW9tZW50KF9ldmVudC5zdGFydCkuZm9ybWF0KCdZWVlZLU1NLUREIGhoOm1tJyksXHJcblx0XHRcdFx0XHRcdFx0ZW5hYmxlVGltZTogdHJ1ZSxcclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0XHQkKFwiI2RhdGVlbmRcIikuZmxhdHBpY2tyKHtcclxuXHRcdFx0XHRcdFx0XHR1dGM6IHRydWUsXHJcblx0XHRcdFx0XHRcdFx0ZGVmYXVsdERhdGU6IG1vbWVudChfZXZlbnQuZW5kKS5mb3JtYXQoJ1lZWVktTU0tREQgaGg6bW0nKSxcclxuXHRcdFx0XHRcdFx0XHRlbmFibGVUaW1lOiB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdFx0Ly9cdCQoJyNkYXRlYmVnaW4nKS52YWwobW9tZW50KF9ldmVudC5zdGFydCkuZm9ybWF0KCdZWVlZLU1NLUREIGhoOm1tJykpO1xyXG5cdFx0XHRcdFx0XHQvL1x0JCgnI2RhdGVlbmQnKS52YWwobW9tZW50KF9ldmVudC5lbmQpLmZvcm1hdCgnWVlZWS1NTS1ERCBoaDptbScpKTtcclxuXHRcdFx0XHRcdFx0XHQkKCcjZXZlbnQtdGl0bGUnKS52YWwoX2V2ZW50LnRpdGxlKTtcclxuXHRcdFx0XHRcdFx0XHQkKCcjcG9zdGNvZGUnKS52YWwoX2V2ZW50LnBvc3RhbENvZGUpO1xyXG5cdFx0XHRcdFx0XHRcdCQoJyNzdGF0dXMnKS52YWwoX2V2ZW50LnN0YXR1cyk7XHJcblx0XHRcdFx0XHRcdFx0JChcIiNkZXNjcmlwdGlvblwiKS52YWwoX2V2ZW50LmRlc2NyaXB0aW9uKTtcclxuXHRcdFx0XHRcdFx0XHQkKCcjZXhlY3V0b3InKS52YWwoX2V2ZW50LmV4ZWN1dG9yKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0JCgnI21vZGFsJykub24oJ2hpZGRlbi5icy5tb2RhbCcsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdtb2RhbCBoaWRlJyk7XHJcblx0XHRcdFx0XHRcdFx0XHRzZWxmLmRlc3Ryb3lNb2RhbCgpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHR9O1xyXG5cdHRoaXMuZGVzdHJveU1vZGFsID0gZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0Ly8kKFwiI3NhdmUtZXZlbnQtYnRuXCIpLm9mZignY2xpY2snKTtcclxuXHRcdCQoJyNjbG9zZS1tb2RhbC1idG4nKS5vZmYoJ2NsaWNrJyk7XHJcblx0XHQkKCcjY2xvc2UtbW9kYWwtY3Jvc3MtYnRuJykub2ZmKCdjbGljaycpO1xyXG5cdFx0Ly8kKCcjZGVsZXRlLWV2ZW50LWJ0bicpLm9mZigpO1xyXG5cdFx0JCgnLm1vZGFsLXBsYWNlJykuaHRtbCgnJyk7XHJcblx0fTtcclxuXHJcblx0dGhpcy5yZW1vdmVFbGVtZW50ID0gZnVuY3Rpb24oZSkge1xyXG5cdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdGZvciAodmFyIGkgPSBzZWxmLnNlbGVjdGVkRUwubGVuZ3RoOyBpLS07KSB7XHJcblx0XHRcdGlmIChzZWxmLnNlbGVjdGVkRUxbaV0ucG9zdGFsQ29kZSA9PSBlLmRhdGEuZWxlbWVudC5wb3N0YWxDb2RlKSB7XHJcblx0XHRcdFx0JChlLmN1cnJlbnRUYXJnZXQpLm9mZigpO1xyXG5cdFx0XHRcdCQoZS5jdXJyZW50VGFyZ2V0KS5wYXJlbnQoKS5yZW1vdmUoKTtcclxuXHRcdFx0XHQvLyQoJ1tkYXRhLWV2bnQtaWQ9JytlLmRhdGEuZWxlbWVudC5wb3N0YWxDb2RlKyddJykub2ZmKCk7XHJcblx0XHRcdFx0Ly8kKCdbZGF0YS1ldm50LWlkPScrZS5kYXRhLmVsZW1lbnQucG9zdGFsQ29kZSsnXScpLnJlbW92ZSgpO1xyXG5cdFx0XHRcdHNlbGYuc2VsZWN0ZWRFTC5zcGxpY2UoaSwgMSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0fTtcclxuXHR0aGlzLnJlbW92ZUFsbCA9IGZ1bmN0aW9uKGUpIHtcclxuXHRcdC8vZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdCQoJyNwYXRoLWxpc3QnKS5odG1sKCcnKTtcclxuXHRcdHNlbGYuc2VsZWN0ZWRFTCA9IFtdO1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH07XHJcblxyXG5cdHRoaXMuY3JlYXRlUGF0aCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0c2VsZi55bWFwQ2VhdGVQYXRoKHNlbGYuc2VsZWN0ZWRFTCk7XHJcblx0fTtcclxuXHJcblx0dGhpcy5wZGZQYXRoID0gZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgZG9jRGVmaW5pdGlvbiA9IHNlbGYuY3JlYXRlQ29udGVudCgpO1xyXG5cdFx0Ly92YXIgZG9jRGVmaW5pdGlvbiA9IHNlbGYucGRmSmFkZSh7XCJkYXRhXCI6c2VsZi5zZWxlY3RlZEVMfSk7XHJcblx0XHRwZGZNYWtlLmNyZWF0ZVBkZihkb2NEZWZpbml0aW9uKS5vcGVuKCk7XHJcblx0fTtcclxuXHJcblx0dGhpcy5jcmVhdGVDb250ZW50ID0gZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgdWxhcnIgPSBbXTtcclxuXHRcdHNlbGYuc2VsZWN0ZWRFTC5mb3JFYWNoKGZ1bmN0aW9uKHBvKSB7XHJcblx0XHRcdHVsYXJyLnB1c2goe1xyXG5cdFx0XHRcdHRleHQ6IHBvLnBvc3RhbENvZGVcclxuXHRcdFx0fSlcclxuXHRcdFx0aWYgKHBvLmV2bnRzLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHR2YXIgc3VsYXJyID0gW107XHJcblx0XHRcdFx0cG8uZXZudHMuZm9yRWFjaChmdW5jdGlvbihldm4pIHtcclxuXHRcdFx0XHRcdHN1bGFyci5wdXNoKHtcclxuXHRcdFx0XHRcdFx0dGV4dDogZXZuLnRpdGxlXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHR1bGFyci5wdXNoKHtcclxuXHRcdFx0XHRcdHVsOiBzdWxhcnJcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHR2YXIgY29iaiA9IHtcclxuXHRcdFx0Y29udGVudDogW3tcclxuXHRcdFx0XHR0ZXh0OiAn0JvQuNGB0YIt0YHQv9C40YHQvtC6INC30LDRj9Cy0L7QuiDQuiDQuNGB0L/QvtC70L3QtdC90LjRjiAo0YTQvtGA0LzQsCDihJYx0LvRgSknLFxyXG5cdFx0XHRcdHN0eWxlOiAnaGVhZGVyJ1xyXG5cdFx0XHR9LCB7XHJcblx0XHRcdFx0dWw6IHVsYXJyLFxyXG5cdFx0XHRcdHN0eWxlOiAnbGlzdHMnXHJcblx0XHRcdH1dLFxyXG5cdFx0XHRzdHlsZXM6IHtcclxuXHRcdFx0XHRoZWFkZXI6IHtcclxuXHRcdFx0XHRcdGZvbnRTaXplOiAxNixcclxuXHRcdFx0XHRcdGJvbGQ6IHRydWVcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGxpc3RzOiB7XHJcblx0XHRcdFx0XHRwYWRkaW5nOiBcIjE1cHhcIixcclxuXHRcdFx0XHRcdGZvbnRTaXplOiAxNFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHRcdHJldHVybiBjb2JqO1xyXG5cdH07XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy9qcy9kZXYvcG0vbW9kdWxlL3BhdGhMaXN0LmpzXG4vLyBtb2R1bGUgaWQgPSAxMzFcbi8vIG1vZHVsZSBjaHVua3MgPSAyIDMiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJDOlxcXFxfdGVtcFxcXFxwY2h0XFxcXG5vZGVfbW9kdWxlc1xcXFxqYWRlXFxcXGxpYlxcXFxydW50aW1lLmpzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAodW5kZWZpbmVkLCB1c2Vycykge1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJjYXJkXFxcIj48ZGl2IGNsYXNzPVxcXCJjYXJkLWhlYWRlclxcXCI+PHVsIGNsYXNzPVxcXCJuYXYgbmF2LXBpbGxzIGNhcmQtaGVhZGVyLXBpbGxzIGZsb2F0LXhzLWxlZnRcXFwiPjxsaSBjbGFzcz1cXFwibmF2LWl0ZW1cXFwiPjxhIGlkPVxcXCJjbGVhci1wbGlzdC1idG5cXFwiIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJuYXYtbGlua1xcXCI+0J7Rh9C40YHRgtC40YLRjDwvYT48L2xpPjwvdWw+PC9kaXY+PGRpdiBjbGFzcz1cXFwiY2FyZC1ibG9ja1xcXCI+PGg0IGNsYXNzPVxcXCJjYXJkLXRpdGxlXFxcIj4gPC9oND48ZGl2IGNsYXNzPVxcXCJjYXJkLXRleHRcXFwiPjxoND7QodC/0LjRgdC+0LpcXHQ8dWwgaWQ9XFxcInBhdGgtbGlzdFxcXCIgY2xhc3M9XFxcImxpc3QtZ3JvdXBcXFwiPjwvdWw+PC9oND48L2Rpdj48IS0taW5wdXQjZXhlY2VtYWlsLmZvcm0tY29udHJvbCh0eXBlPSdlbWFpbCcpLS0+PGEgaWQ9XFxcImNyZWF0ZS1wYXRoLWJ0blxcXCIgaHJlZj1cXFwiI1xcXCIgY2xhc3M9XFxcImJ0biBidG4tcHJpbWFyeVxcXCI+0YHQvtC30LTQsNGC0Ywg0LzQsNGA0YjRgNGD0YI8L2E+PC9kaXY+PGRpdiBjbGFzcz1cXFwiY2FyZC1mb290ZXIgdGV4dC1tdXRlZFxcXCI+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwidXNlcnMtbGlzdFxcXCI+0JjRgdC/0L7Qu9C90LjRgtC10LvRjDwvbGFiZWw+PHNlbGVjdCBpZD1cXFwidXNlcnMtbGlzdFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+XCIpO1xuLy8gaXRlcmF0ZSB1c2Vyc1xuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSB1c2VycztcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIHVzZXIgPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIjxvcHRpb25cIiArIChqYWRlLmF0dHIoXCJ2YWx1ZVwiLCBcIlwiICsgKHVzZXIuX2lkKSArIFwiXCIsIHRydWUsIHRydWUpKSArIFwiPlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IHVzZXIuZmlvKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCI8L29wdGlvbj5cIik7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIgdXNlciA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPG9wdGlvblwiICsgKGphZGUuYXR0cihcInZhbHVlXCIsIFwiXCIgKyAodXNlci5faWQpICsgXCJcIiwgdHJ1ZSwgdHJ1ZSkpICsgXCI+XCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gdXNlci5maW8pID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIjwvb3B0aW9uPlwiKTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxuYnVmLnB1c2goXCI8L3NlbGVjdD48L2Rpdj48YSBpZD1cXFwicHJpbnQtcGF0aC1idG5cXFwiIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJidG4gYnRuLXByaW1hcnlcXFwiPtC/0LXRh9Cw0YLQsNGC0Yw8L2E+PGEgaWQ9XFxcImFzc2luZy11c2VyLWJ0blxcXCIgaHJlZj1cXFwiI1xcXCIgY2xhc3M9XFxcImJ0biBidG4tZGVmYXVsdFxcXCI+0L3QsNC30L3QsNGH0LjRgtGMINC40YHQv9C+0LvQvdC40YLQtdC70Y88L2E+PC9kaXY+PC9kaXY+XCIpO30uY2FsbCh0aGlzLFwidW5kZWZpbmVkXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC51bmRlZmluZWQ6dHlwZW9mIHVuZGVmaW5lZCE9PVwidW5kZWZpbmVkXCI/dW5kZWZpbmVkOnVuZGVmaW5lZCxcInVzZXJzXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC51c2Vyczp0eXBlb2YgdXNlcnMhPT1cInVuZGVmaW5lZFwiP3VzZXJzOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvanMvZGV2L3BtL3ZpZXcvcGF0aExpc3QuamFkZVxuLy8gbW9kdWxlIGlkID0gMTMyXG4vLyBtb2R1bGUgY2h1bmtzID0gMiAzIiwidmFyIGphZGUgPSByZXF1aXJlKFwiQzpcXFxcX3RlbXBcXFxccGNodFxcXFxub2RlX21vZHVsZXNcXFxcamFkZVxcXFxsaWJcXFxccnVudGltZS5qc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKGRhdGEpIHtcbmJ1Zi5wdXNoKFwiPGxpXCIgKyAoamFkZS5hdHRyKFwiZGF0YS1wby1pZFwiLCAnJyArIChkYXRhLnBvc3RhbENvZGUpICsgJycsIHRydWUsIHRydWUpKSArIFwiIGNsYXNzPVxcXCJsaXN0LWdyb3VwLWl0ZW0gbGlzdC1ncm91cC1pdGVtLWFjdGlvblxcXCI+XCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gZGF0YS5wb3N0YWxDb2RlKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCI8YSBocmVmPVxcXCIjXFxcIiBjbGFzcz1cXFwicmVtb3ZlLXBvLWxpc3RcXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS10cmFzaC1vIGZhLWZ3XFxcIj48L2k+PC9hPjxpIHN0eWxlPVxcXCJmbG9hdDpsZWZ0XFxcIiBjbGFzcz1cXFwiZmEgZmEtc3Bpbm5lciBmYS1wdWxzZSBmYS1md1xcXCI+PC9pPjwvbGk+XCIpO30uY2FsbCh0aGlzLFwiZGF0YVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguZGF0YTp0eXBlb2YgZGF0YSE9PVwidW5kZWZpbmVkXCI/ZGF0YTp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2pzL2Rldi9wbS92aWV3L2xpc3RFbC5qYWRlXG4vLyBtb2R1bGUgaWQgPSAxMzNcbi8vIG1vZHVsZSBjaHVua3MgPSAyIDMiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJDOlxcXFxfdGVtcFxcXFxwY2h0XFxcXG5vZGVfbW9kdWxlc1xcXFxqYWRlXFxcXGxpYlxcXFxydW50aW1lLmpzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAoZGF0YSwgdW5kZWZpbmVkKSB7XG5idWYucHVzaChcIjx1bD5cIik7XG4vLyBpdGVyYXRlIGRhdGFcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gZGF0YTtcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGV2bnQgPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIjxsaVwiICsgKGphZGUuYXR0cihcImRhdGEtZXZudC1pZFwiLCAnJyArIChldm50Ll9pZCkgKyAnJywgdHJ1ZSwgdHJ1ZSkpICsgXCIgY2xhc3M9XFxcImV2bnQtbGlcXFwiPlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IGV2bnQudGl0bGUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIjxhIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJzaG93LWV2bnQtZGV0YWlsXFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtc2VhcmNoIGZhLWZ3XFxcIj48L2k+PC9hPjxhIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJyZW1vdmUtZXZudC1saXN0XFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtdHJhc2gtbyBmYS1md1xcXCI+PC9pPjwvYT48L2xpPlwiKTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBldm50ID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8bGlcIiArIChqYWRlLmF0dHIoXCJkYXRhLWV2bnQtaWRcIiwgJycgKyAoZXZudC5faWQpICsgJycsIHRydWUsIHRydWUpKSArIFwiIGNsYXNzPVxcXCJldm50LWxpXFxcIj5cIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBldm50LnRpdGxlKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCI8YSBocmVmPVxcXCIjXFxcIiBjbGFzcz1cXFwic2hvdy1ldm50LWRldGFpbFxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLXNlYXJjaCBmYS1md1xcXCI+PC9pPjwvYT48YSBocmVmPVxcXCIjXFxcIiBjbGFzcz1cXFwicmVtb3ZlLWV2bnQtbGlzdFxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLXRyYXNoLW8gZmEtZndcXFwiPjwvaT48L2E+PC9saT5cIik7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbmJ1Zi5wdXNoKFwiPC91bD5cIik7fS5jYWxsKHRoaXMsXCJkYXRhXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5kYXRhOnR5cGVvZiBkYXRhIT09XCJ1bmRlZmluZWRcIj9kYXRhOnVuZGVmaW5lZCxcInVuZGVmaW5lZFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgudW5kZWZpbmVkOnR5cGVvZiB1bmRlZmluZWQhPT1cInVuZGVmaW5lZFwiP3VuZGVmaW5lZDp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2pzL2Rldi9wbS92aWV3L3N1Ymxpc3QuamFkZVxuLy8gbW9kdWxlIGlkID0gMTM0XG4vLyBtb2R1bGUgY2h1bmtzID0gMiAzIiwidmFyIGphZGUgPSByZXF1aXJlKFwiQzpcXFxcX3RlbXBcXFxccGNodFxcXFxub2RlX21vZHVsZXNcXFxcamFkZVxcXFxsaWJcXFxccnVudGltZS5qc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKGRhdGEsIHVuZGVmaW5lZCkge1xuLy8gaXRlcmF0ZSBkYXRhXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IGRhdGE7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBwbyA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiXCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gcG8ucG9zdGFsQ29kZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiIFxcXFxiclwiKTtcbmlmIChwby5ldm50cy5sZW5ndGg+MClcbntcbi8vIGl0ZXJhdGUgcG8uZXZudHNcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gcG8uZXZudHM7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBldm50ID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCJcIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBldm50LnRpdGxlKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCIgXFxcXGJyXCIpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIGV2bnQgPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IGV2bnQudGl0bGUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIiBcXFxcYnJcIik7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbn1cbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBwbyA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiXCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gcG8ucG9zdGFsQ29kZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiIFxcXFxiclwiKTtcbmlmIChwby5ldm50cy5sZW5ndGg+MClcbntcbi8vIGl0ZXJhdGUgcG8uZXZudHNcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gcG8uZXZudHM7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBldm50ID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCJcIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBldm50LnRpdGxlKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCIgXFxcXGJyXCIpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIGV2bnQgPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IGV2bnQudGl0bGUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIiBcXFxcYnJcIik7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbn1cbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcbn0uY2FsbCh0aGlzLFwiZGF0YVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguZGF0YTp0eXBlb2YgZGF0YSE9PVwidW5kZWZpbmVkXCI/ZGF0YTp1bmRlZmluZWQsXCJ1bmRlZmluZWRcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnVuZGVmaW5lZDp0eXBlb2YgdW5kZWZpbmVkIT09XCJ1bmRlZmluZWRcIj91bmRlZmluZWQ6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy9qcy9kZXYvcG0vdmlldy9wZGZQYXRoTGlzdC5qYWRlXG4vLyBtb2R1bGUgaWQgPSAxMzVcbi8vIG1vZHVsZSBjaHVua3MgPSAyIDMiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJDOlxcXFxfdGVtcFxcXFxwY2h0XFxcXG5vZGVfbW9kdWxlc1xcXFxqYWRlXFxcXGxpYlxcXFxydW50aW1lLmpzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPGRpdiBpZD1cXFwibW9kYWxcXFwiIHRhYmluZGV4PVxcXCItMVxcXCIgcm9sZT1cXFwiZGlhbG9nXFxcIiBhcmlhLWxhYmVsbGVkYnk9XFxcIm15TW9kYWxMYWJlbFxcXCIgYXJpYS1oaWRkZW49XFxcInRydWVcXFwiIGNsYXNzPVxcXCJtb2RhbCBmYWRlXFxcIj48ZGl2IHJvbGU9XFxcImRvY3VtZW50XFxcIiBjbGFzcz1cXFwibW9kYWwtZGlhbG9nXFxcIj48ZGl2IGNsYXNzPVxcXCJtb2RhbC1jb250ZW50XFxcIj48ZGl2IGNsYXNzPVxcXCJtb2RhbC1oZWFkZXJcXFwiPjxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBkYXRhLWRpc21pc3M9XFxcIm1vZGFsXFxcIiBhcmlhLWxhYmVsPVxcXCJDbG9zZVxcXCIgY2xhc3M9XFxcImNsb3NlXFxcIj48c3BhbiBhcmlhLWhpZGRlbj1cXFwidHJ1ZVxcXCI+w5c8L3NwYW4+PC9idXR0b24+PGg0IGlkPVxcXCJteU1vZGFsTGFiZWxcXFwiIGNsYXNzPVxcXCJtb2RhbC10aXRsZVxcXCI+0KDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjQtS/Rg9C00LDQu9C10L3QuNC1PC9oND48L2Rpdj48ZGl2IGNsYXNzPVxcXCJtb2RhbC1ib2R5XFxcIj48Zm9ybSBhY3Rpb249XFxcIlxcXCI+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7Qt9Cw0LPQvtC70L7QstC+0Lo8L2xhYmVsPjxpbnB1dCBpZD1cXFwiZXZlbnQtdGl0bGVcXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0L3QsNGH0LDQu9C+PC9sYWJlbD48aW5wdXQgaWQ9XFxcImRhdGViZWdpblxcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbCBmbGF0cGlja3JcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0L7QutC+0L3Rh9Cw0L3QuNC1PC9sYWJlbD48aW5wdXQgaWQ9XFxcImRhdGVlbmRcXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2wgZmxhdHBpY2tyXFxcIj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj48bGFiZWwgZm9yPVxcXCJcXFwiPtC+0YLQtNC10LvQtdC90LjQtSDQv9C+0LvRg9GH0LDRgtC10LvRjDwvbGFiZWw+PGlucHV0IGlkPVxcXCJwb3N0Y29kZVxcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7QvtC/0LjRgdCw0L3QuNC1PC9sYWJlbD48aW5wdXQgaWQ9XFxcImRlc2NyaXB0aW9uXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj48bGFiZWwgZm9yPVxcXCJcXFwiPtGB0YLQsNGC0YPRgTwvbGFiZWw+PGlucHV0IGlkPVxcXCJzdGF0dXNcXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0LjRgdC/0L7Qu9C90LjRgtC10LvRjDwvbGFiZWw+PGlucHV0IGlkPVxcXCJleGVjdXRvclxcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+PC9kaXY+PC9mb3JtPjwvZGl2PjxkaXYgY2xhc3M9XFxcIm1vZGFsLWZvb3RlclxcXCI+PGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGRhdGEtZGlzbWlzcz1cXFwibW9kYWxcXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+Q2xvc2U8L2J1dHRvbj48IS0tYnV0dG9uI3NhdmUtZXZlbnQtYnRuLmJ0bi5idG4tcHJpbWFyeSh0eXBlPSdidXR0b24nKSBTYXZlIGNoYW5nZXMtLT48IS0tYnV0dG9uI2RlbGV0ZS1ldmVudC1idG4uYnRuLmJ0bi1kYW5nZXIodHlwZT0nYnV0dG9uJykgRGVsZXRlLS0+PC9kaXY+PC9kaXY+PC9kaXY+PC9kaXY+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvanMvZGV2L3BtL3ZpZXcvZWRpdGRlbEV2ZW50LmphZGVcbi8vIG1vZHVsZSBpZCA9IDEzNlxuLy8gbW9kdWxlIGNodW5rcyA9IDIgMyIsInZhciBqYWRlID0gcmVxdWlyZShcIkM6XFxcXF90ZW1wXFxcXHBjaHRcXFxcbm9kZV9tb2R1bGVzXFxcXGphZGVcXFxcbGliXFxcXHJ1bnRpbWUuanNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uICh1bmRlZmluZWQsIHVzZXJzKSB7XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcImNhcmRcXFwiPjxkaXYgY2xhc3M9XFxcImNhcmQtaGVhZGVyXFxcIj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj48bGFiZWwgZm9yPVxcXCJ1c2Vycy1saXN0XFxcIj7QmNGB0L/QvtC70L3QuNGC0LXQu9GMPC9sYWJlbD48c2VsZWN0IGlkPVxcXCJ1c2Vycy1saXN0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIj5cIik7XG4vLyBpdGVyYXRlIHVzZXJzXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IHVzZXJzO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIgdXNlciA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPG9wdGlvblwiICsgKGphZGUuYXR0cihcInZhbHVlXCIsIFwiXCIgKyAodXNlci5faWQpICsgXCJcIiwgdHJ1ZSwgdHJ1ZSkpICsgXCI+XCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gdXNlci5maW8pID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIjwvb3B0aW9uPlwiKTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciB1c2VyID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8b3B0aW9uXCIgKyAoamFkZS5hdHRyKFwidmFsdWVcIiwgXCJcIiArICh1c2VyLl9pZCkgKyBcIlwiLCB0cnVlLCB0cnVlKSkgKyBcIj5cIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSB1c2VyLmZpbykgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiPC9vcHRpb24+XCIpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG5idWYucHVzaChcIjwvc2VsZWN0PjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XFxcImNhcmQtYmxvY2tcXFwiPjxoNCBjbGFzcz1cXFwiY2FyZC10aXRsZVxcXCI+IDwvaDQ+PGRpdiBjbGFzcz1cXFwiY2FyZC10ZXh0XFxcIj48aDQ+0KHQv9C40YHQutC4IFxcdDxkaXYgaWQ9XFxcImxpc3RzLWxpc3RcXFwiPjwvZGl2PjwvaDQ+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cXFwiY2FyZC1mb290ZXIgdGV4dC1tdXRlZFxcXCI+PC9kaXY+PC9kaXY+XCIpO30uY2FsbCh0aGlzLFwidW5kZWZpbmVkXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC51bmRlZmluZWQ6dHlwZW9mIHVuZGVmaW5lZCE9PVwidW5kZWZpbmVkXCI/dW5kZWZpbmVkOnVuZGVmaW5lZCxcInVzZXJzXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC51c2Vyczp0eXBlb2YgdXNlcnMhPT1cInVuZGVmaW5lZFwiP3VzZXJzOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvanMvZGV2L3BtL3ZpZXcvbGlzdHMuamFkZVxuLy8gbW9kdWxlIGlkID0gMTM3XG4vLyBtb2R1bGUgY2h1bmtzID0gMiAzIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHJcblx0dGhpcy5fbW9kYWwgPSByZXF1aXJlKCcuLi92aWV3L25ld0V2ZW50LmphZGUnKTtcclxuXHJcblx0dGhpcy5kZXN0cm95TW9kYWwgPSBmdW5jdGlvbigpIHtcclxuXHJcblx0XHQkKFwiI3NhdmUtZXZlbnQtYnRuXCIpLm9mZignY2xpY2snKTtcclxuXHRcdCQoJyNjbG9zZS1tb2RhbC1idG4nKS5vZmYoJ2NsaWNrJyk7XHJcblx0XHQkKCcjY2xvc2UtbW9kYWwtY3Jvc3MtYnRuJykub2ZmKCdjbGljaycpO1xyXG5cdFx0JCgnLm1vZGFsLXBsYWNlJykuaHRtbCgnJyk7XHJcblx0fTtcclxuXHJcblx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuXHR0aGlzLmluaXQgPSBmdW5jdGlvbigpIHtcclxuXHJcblx0XHQkKCcubW9kYWwtcGxhY2UnKS5odG1sKHRoaXMuX21vZGFsKCkpO1xyXG5cdFx0JChcIi5mbGF0cGlja3JcIikuZmxhdHBpY2tyKHtcclxuXHRcdFx0ZW5hYmxlVGltZTogdHJ1ZSxcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoXCIjc2F2ZS1ldmVudC1idG5cIikub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuXHRcdFx0dmFyIG11bHRpID0gJCgnI3Bvc3Rjb2RlJykudmFsKCkuc3BsaXQoXCI7XCIpO1xyXG5cdFx0XHRpZiAobXVsdGkubGVuZ3RoID4gMSkge1xyXG5cdFx0XHRcdHZhciBldm50cyA9IFtdO1xyXG5cdFx0XHRcdG11bHRpLmZvckVhY2goZnVuY3Rpb24ocG9Db2RlKSB7XHJcblx0XHRcdFx0XHR2YXIgZXZudCA9IHtcclxuXHRcdFx0XHRcdFx0dGl0bGU6ICQoJyNldmVudC10aXRsZScpLnZhbCgpLFxyXG5cdFx0XHRcdFx0XHRzdGFydDogbW9tZW50KCQoJyNkYXRlYmVnaW4nKS52YWwoKSksXHJcblx0XHRcdFx0XHRcdGVuZDogbW9tZW50KCQoJyNkYXRlZW5kJykudmFsKCkpLFxyXG5cdFx0XHRcdFx0XHRwb3N0YWxDb2RlOiBwb0NvZGUsXHJcblx0XHRcdFx0XHRcdHN0YXR1czogJCgnI3N0YXR1cycpLnZhbCgpLFxyXG5cdFx0XHRcdFx0XHRkZXNjcmlwdGlvbjogJChcIiNkZXNjcmlwdGlvblwiKS52YWwoKSxcclxuXHRcdFx0XHRcdFx0ZXhlY3V0b3I6ICQoJyNleGVjdXRvcicpLnZhbCgpXHJcblx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRldm50cy5wdXNoKGV2bnQpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdCQuYWpheCh7XHJcblx0XHRcdFx0XHR0eXBlOiAnUE9TVCcsXHJcblx0XHRcdFx0XHR1cmw6ICcvZXZudC9zYXZlL211bHRpJyxcclxuXHRcdFx0XHRcdGRhdGE6IEpTT04uc3RyaW5naWZ5KGV2bnRzKSxcclxuXHRcdFx0XHRcdGRhdGFUeXBlOiBcImpzb25cIixcclxuXHRcdFx0XHRcdGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coXCJkYXRhIHNhdmVcIik7XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0Ly9lcnJvcjogYWpheEVycm9yXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0dmFyIGV2bnQgPSB7XHJcblx0XHRcdFx0XHR0aXRsZTogJCgnI2V2ZW50LXRpdGxlJykudmFsKCksXHJcblx0XHRcdFx0XHRzdGFydDogbW9tZW50KCQoJyNkYXRlYmVnaW4nKS52YWwoKSksXHJcblx0XHRcdFx0XHRlbmQ6IG1vbWVudCgkKCcjZGF0ZWVuZCcpLnZhbCgpKSxcclxuXHRcdFx0XHRcdHBvc3RhbENvZGU6ICQoJyNwb3N0Y29kZScpLnZhbCgpLFxyXG5cdFx0XHRcdFx0c3RhdHVzOiAkKCcjc3RhdHVzJykudmFsKCksXHJcblx0XHRcdFx0XHRkZXNjcmlwdGlvbjogJChcIiNkZXNjcmlwdGlvblwiKS52YWwoKSxcclxuXHRcdFx0XHRcdGV4ZWN1dG9yOiAkKCcjZXhlY3V0b3InKS52YWwoKVxyXG5cdFx0XHRcdH07XHJcblx0XHRcdFx0Y29uc29sZS5sb2coXCJhZGQgZXZlbnRcIik7XHJcblx0XHRcdFx0Ly8kKCcjY2FsZW5kYXInKS5mdWxsQ2FsZW5kYXIoJ3JlbmRlckV2ZW50JywgZXZudCwgdHJ1ZSk7XHJcblxyXG5cdFx0XHRcdCQuYWpheCh7XHJcblx0XHRcdFx0XHR0eXBlOiAnUE9TVCcsXHJcblx0XHRcdFx0XHR1cmw6ICcvZXZudC9zYXZlJyxcclxuXHRcdFx0XHRcdGRhdGE6IEpTT04uc3RyaW5naWZ5KGV2bnQpLFxyXG5cdFx0XHRcdFx0ZGF0YVR5cGU6IFwianNvblwiLFxyXG5cdFx0XHRcdFx0Y29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG5cdFx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhcImRhdGEgc2F2ZVwiKTtcclxuXHRcdFx0XHRcdFx0Ly92YXIgZXZudEFycmF5ID0gJCgnI2NhbGVuZGFyJykuZnVsbENhbGVuZGFyKCdjbGllbnRFdmVudHMnKTtcclxuXHRcdFx0XHRcdFx0Ly92YXIgX2V2bnQgPSBldm50QXJyYXlbZXZudEFycmF5Lmxlbmd0aCAtIDFdO1xyXG5cdFx0XHRcdFx0XHQvL1x0X2V2bnQuX2lkID0gZGF0YS5pbnNlcnRlZGlkO1xyXG5cclxuXHRcdFx0XHRcdFx0Ly9cdCQoJyNjYWxlbmRhcicpLmZ1bGxDYWxlbmRhcigndXBkYXRlRXZlbnQnLCBfZXZudCk7XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0Ly9lcnJvcjogYWpheEVycm9yXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHJcblxyXG5cdFx0fSk7XHJcblxyXG5cdFx0JCgnI2Nsb3NlLW1vZGFsLWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcblx0XHR9KTtcclxuXHJcblx0XHQkKCcjY2xvc2UtbW9kYWwtY3Jvc3MtYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoJyNtb2RhbCcpLm1vZGFsKCdzaG93Jyk7XHJcblxyXG5cdFx0Ly8kKCcjZGF0ZWJlZ2luJykudmFsKHN0YXJ0LmZvcm1hdCgnWVlZWS1NTS1ERCBoaDptbScpKTtcclxuXHRcdC8vJCgnI2RhdGVlbmQnKS52YWwoZW5kLmZvcm1hdCgnWVlZWS1NTS1ERCBoaDptbScpKTtcclxuXHJcblx0XHQkKCcjbW9kYWwnKS5vbignaGlkZGVuLmJzLm1vZGFsJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRjb25zb2xlLmxvZygnbW9kYWwgaGlkZScpO1xyXG5cdFx0XHRzZWxmLmRlc3Ryb3lNb2RhbCgpO1xyXG5cdFx0fSk7XHJcblxyXG5cdH07XHJcbn1cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvanMvZGV2L3BtL21vZHVsZS9uZXdFdmVudC5qc1xuLy8gbW9kdWxlIGlkID0gMTM4XG4vLyBtb2R1bGUgY2h1bmtzID0gMiAzIiwidmFyIGphZGUgPSByZXF1aXJlKFwiQzpcXFxcX3RlbXBcXFxccGNodFxcXFxub2RlX21vZHVsZXNcXFxcamFkZVxcXFxsaWJcXFxccnVudGltZS5qc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIjxkaXYgaWQ9XFxcIm1vZGFsXFxcIiB0YWJpbmRleD1cXFwiLTFcXFwiIHJvbGU9XFxcImRpYWxvZ1xcXCIgYXJpYS1sYWJlbGxlZGJ5PVxcXCJteU1vZGFsTGFiZWxcXFwiIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIiBjbGFzcz1cXFwibW9kYWwgZmFkZVxcXCI+PGRpdiByb2xlPVxcXCJkb2N1bWVudFxcXCIgY2xhc3M9XFxcIm1vZGFsLWRpYWxvZ1xcXCI+PGRpdiBjbGFzcz1cXFwibW9kYWwtY29udGVudFxcXCI+PGRpdiBjbGFzcz1cXFwibW9kYWwtaGVhZGVyXFxcIj48YnV0dG9uIGlkPVxcXCJjbG9zZS1tb2RhbC1jcm9zcy1idG5cXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgZGF0YS1kaXNtaXNzPVxcXCJtb2RhbFxcXCIgYXJpYS1sYWJlbD1cXFwiQ2xvc2VcXFwiIGNsYXNzPVxcXCJjbG9zZVxcXCI+PHNwYW4gYXJpYS1oaWRkZW49XFxcInRydWVcXFwiPsOXPC9zcGFuPjwvYnV0dG9uPjxoNCBpZD1cXFwibXlNb2RhbExhYmVsXFxcIiBjbGFzcz1cXFwibW9kYWwtdGl0bGVcXFwiPtCh0L7Qt9C00LDQvdC40LU8L2g0PjwvZGl2PjxkaXYgY2xhc3M9XFxcIm1vZGFsLWJvZHlcXFwiPjxmb3JtIGFjdGlvbj1cXFwiXFxcIj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj48bGFiZWwgZm9yPVxcXCJcXFwiPtC30LDQs9C+0LvQvtCy0L7QujwvbGFiZWw+PGlucHV0IGlkPVxcXCJldmVudC10aXRsZVxcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7QvdCw0YfQsNC70L48L2xhYmVsPjxpbnB1dCBpZD1cXFwiZGF0ZWJlZ2luXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sIGZsYXRwaWNrclxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7QvtC60L7QvdGH0LDQvdC40LU8L2xhYmVsPjxpbnB1dCBpZD1cXFwiZGF0ZWVuZFxcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbCBmbGF0cGlja3JcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0L7RgtC00LXQu9C10L3QuNC1INC/0L7Qu9GD0YfQsNGC0LXQu9GMPC9sYWJlbD48aW5wdXQgaWQ9XFxcInBvc3Rjb2RlXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj48bGFiZWwgZm9yPVxcXCJcXFwiPtC+0L/QuNGB0LDQvdC40LU8L2xhYmVsPjxpbnB1dCBpZD1cXFwiZGVzY3JpcHRpb25cXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0YHRgtCw0YLRg9GBPC9sYWJlbD48aW5wdXQgaWQ9XFxcInN0YXR1c1xcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7QuNGB0L/QvtC70L3QuNGC0LXQu9GMPC9sYWJlbD48aW5wdXQgaWQ9XFxcImV4ZWN1dG9yXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIj48L2Rpdj48L2Zvcm0+PC9kaXY+PGRpdiBjbGFzcz1cXFwibW9kYWwtZm9vdGVyXFxcIj48YnV0dG9uIGlkPVxcXCJjbG9zZS1tb2RhbC1idG5cXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgZGF0YS1kaXNtaXNzPVxcXCJtb2RhbFxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj5DbG9zZTwvYnV0dG9uPjxidXR0b24gaWQ9XFxcInNhdmUtZXZlbnQtYnRuXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXByaW1hcnlcXFwiPlNhdmUgY2hhbmdlczwvYnV0dG9uPjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2PlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2pzL2Rldi9wbS92aWV3L25ld0V2ZW50LmphZGVcbi8vIG1vZHVsZSBpZCA9IDEzOVxuLy8gbW9kdWxlIGNodW5rcyA9IDIgMyIsInZhciBqYWRlID0gcmVxdWlyZShcIkM6XFxcXF90ZW1wXFxcXHBjaHRcXFxcbm9kZV9tb2R1bGVzXFxcXGphZGVcXFxcbGliXFxcXHJ1bnRpbWUuanNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChkYXRhLCB1bmRlZmluZWQpIHtcbmJ1Zi5wdXNoKFwiPHVsIGNsYXNzPVxcXCJsaXN0LWdyb3VwXFxcIj5cIik7XG4vLyBpdGVyYXRlIGRhdGFcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gZGF0YTtcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGwgPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIjxsaVwiICsgKGphZGUuYXR0cihcImRhdGEtbGlzdC1pZFwiLCAnJyArIChsLl9pZCkgKyAnJywgdHJ1ZSwgdHJ1ZSkpICsgXCIgY2xhc3M9XFxcImxpc3RzLWxpIGxpc3QtZ3JvdXAtaXRlbSBsaXN0LWdyb3VwLWl0ZW0tYWN0aW9uXFxcIj5cIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBsLl9pZCkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiXFx0XFx0PC9saT5cIik7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIgbCA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGxpXCIgKyAoamFkZS5hdHRyKFwiZGF0YS1saXN0LWlkXCIsICcnICsgKGwuX2lkKSArICcnLCB0cnVlLCB0cnVlKSkgKyBcIiBjbGFzcz1cXFwibGlzdHMtbGkgbGlzdC1ncm91cC1pdGVtIGxpc3QtZ3JvdXAtaXRlbS1hY3Rpb25cXFwiPlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IGwuX2lkKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCJcXHRcXHQ8L2xpPlwiKTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxuYnVmLnB1c2goXCI8L3VsPlwiKTt9LmNhbGwodGhpcyxcImRhdGFcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmRhdGE6dHlwZW9mIGRhdGEhPT1cInVuZGVmaW5lZFwiP2RhdGE6dW5kZWZpbmVkLFwidW5kZWZpbmVkXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC51bmRlZmluZWQ6dHlwZW9mIHVuZGVmaW5lZCE9PVwidW5kZWZpbmVkXCI/dW5kZWZpbmVkOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvanMvZGV2L3BtL3ZpZXcvdWxMaXN0cy5qYWRlXG4vLyBtb2R1bGUgaWQgPSAyNTZcbi8vIG1vZHVsZSBjaHVua3MgPSAyIDMiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3JQQTs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzNNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDNVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDL0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzdHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OyIsInNvdXJjZVJvb3QiOiIifQ==