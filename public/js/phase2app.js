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
		var nevnt=__webpack_require__(139);

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
						var _po={postalCode:op.postalCode, evnts:[]};
						if(op.evnts){
							op.evnts.forEach(function(evnt){
							_po.evnts.push(evnt._id);
							});
						}
						_evnts.push(_po);
					/*	if(op.evnts){
							op.evnts.forEach(function(evnt){
								_evnts.push(evnt._id);
							});	
						}*/
					});
					var list={userID:_uval, evntIDs:_evnts};
					console.log(list);
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
					var ulListJade=__webpack_require__(138);
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

/***/ },

/***/ 139:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, moment) {'use strict';

	module.exports = function() {

		this._modal = __webpack_require__(140);

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

/***/ 140:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGhhc2UyYXBwLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2Rldi9wbS9waGFzZTJhcHAuanMiLCJ3ZWJwYWNrOi8vLy4vfi9qYWRlL2xpYi9ydW50aW1lLmpzPzEyZDAqIiwid2VicGFjazovLy9mcyAoaWdub3JlZCk/NDRiNyoiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2Rldi9wbS9tb2R1bGUvbWFwNHAuanM/M2JlMiIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3BtL3ZpZXcvbWFwLmphZGU/ZmI0YSIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3BtL21vZHVsZS9wb0RldGFpbC5qcz8xMWZjIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9kZXYvcG0vdmlldy9wb0RldGFpbC5qYWRlP2IxODUiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2Rldi9wbS9tb2R1bGUvcGF0aExpc3QuanM/ODExZSIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3BtL3ZpZXcvcGF0aExpc3QuamFkZT9mZjc0Iiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9kZXYvcG0vdmlldy9saXN0RWwuamFkZT8zYmJhIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9kZXYvcG0vdmlldy9zdWJsaXN0LmphZGU/YTA2MCIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3BtL3ZpZXcvcGRmUGF0aExpc3QuamFkZT8wYjcxIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9kZXYvcG0vdmlldy9lZGl0ZGVsRXZlbnQuamFkZT9hODE5Iiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9kZXYvcG0vdmlldy9saXN0cy5qYWRlPzhmNjMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2Rldi9wbS92aWV3L3VsTGlzdHMuamFkZT8yOGNkIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9kZXYvcG0vbW9kdWxlL25ld0V2ZW50LmpzPzA5MWEiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2Rldi9wbS92aWV3L25ld0V2ZW50LmphZGU/NzBmYyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG4vL21vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcbmNvbnNvbGUubG9nKCdoaSBwaGFzZTIgY29kZW5hbWUnKTtcclxuXHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcdFxyXG5cclxuXHR2YXIgbXlNYXA9cmVxdWlyZSgnLi9tb2R1bGUvbWFwNHAuanMnKTtcdFxyXG5cdHltYXBzLnJlYWR5KGluaXQpO1xyXG5cdHZhciBfbXlNYXA7XHJcblx0dmFyIG5ldm50PXJlcXVpcmUoJy4vbW9kdWxlL25ld0V2ZW50LmpzJyk7XHJcblxyXG5cdGZ1bmN0aW9uIGluaXQoKSB7XHJcblx0XHRcclxuXHRcdF9teU1hcD1teU1hcCgpO1xyXG5cclxuXHRcdCQoJyNtYXAtbG9hZC1saW5rJykuY2xpY2soZnVuY3Rpb24oKXtcclxuXHRcdFx0X215TWFwLmRlc3Ryb3koKTtcclxuXHRcdFx0X215TWFwPW51bGw7XHJcblx0XHRcdF9teU1hcD1teU1hcCgpO1xyXG5cclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoJyNuZXctZXZudC1saW5rJykuY2xpY2soZnVuY3Rpb24oZSl7XHJcblx0XHRcdHZhciBfbmV2bnQ9IG5ldyBuZXZudCgpO1xyXG5cdFx0XHRfbmV2bnQuaW5pdCgpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHJcblxyXG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy9qcy9kZXYvcG0vcGhhc2UyYXBwLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBNZXJnZSB0d28gYXR0cmlidXRlIG9iamVjdHMgZ2l2aW5nIHByZWNlZGVuY2VcbiAqIHRvIHZhbHVlcyBpbiBvYmplY3QgYGJgLiBDbGFzc2VzIGFyZSBzcGVjaWFsLWNhc2VkXG4gKiBhbGxvd2luZyBmb3IgYXJyYXlzIGFuZCBtZXJnaW5nL2pvaW5pbmcgYXBwcm9wcmlhdGVseVxuICogcmVzdWx0aW5nIGluIGEgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhXG4gKiBAcGFyYW0ge09iamVjdH0gYlxuICogQHJldHVybiB7T2JqZWN0fSBhXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLm1lcmdlID0gZnVuY3Rpb24gbWVyZ2UoYSwgYikge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgIHZhciBhdHRycyA9IGFbMF07XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhdHRycyA9IG1lcmdlKGF0dHJzLCBhW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIGF0dHJzO1xuICB9XG4gIHZhciBhYyA9IGFbJ2NsYXNzJ107XG4gIHZhciBiYyA9IGJbJ2NsYXNzJ107XG5cbiAgaWYgKGFjIHx8IGJjKSB7XG4gICAgYWMgPSBhYyB8fCBbXTtcbiAgICBiYyA9IGJjIHx8IFtdO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShhYykpIGFjID0gW2FjXTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYmMpKSBiYyA9IFtiY107XG4gICAgYVsnY2xhc3MnXSA9IGFjLmNvbmNhdChiYykuZmlsdGVyKG51bGxzKTtcbiAgfVxuXG4gIGZvciAodmFyIGtleSBpbiBiKSB7XG4gICAgaWYgKGtleSAhPSAnY2xhc3MnKSB7XG4gICAgICBhW2tleV0gPSBiW2tleV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGE7XG59O1xuXG4vKipcbiAqIEZpbHRlciBudWxsIGB2YWxgcy5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbFxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIG51bGxzKHZhbCkge1xuICByZXR1cm4gdmFsICE9IG51bGwgJiYgdmFsICE9PSAnJztcbn1cblxuLyoqXG4gKiBqb2luIGFycmF5IGFzIGNsYXNzZXMuXG4gKlxuICogQHBhcmFtIHsqfSB2YWxcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5qb2luQ2xhc3NlcyA9IGpvaW5DbGFzc2VzO1xuZnVuY3Rpb24gam9pbkNsYXNzZXModmFsKSB7XG4gIHJldHVybiAoQXJyYXkuaXNBcnJheSh2YWwpID8gdmFsLm1hcChqb2luQ2xhc3NlcykgOlxuICAgICh2YWwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpID8gT2JqZWN0LmtleXModmFsKS5maWx0ZXIoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gdmFsW2tleV07IH0pIDpcbiAgICBbdmFsXSkuZmlsdGVyKG51bGxzKS5qb2luKCcgJyk7XG59XG5cbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBjbGFzc2VzLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGNsYXNzZXNcbiAqIEBwYXJhbSB7QXJyYXkuPEJvb2xlYW4+fSBlc2NhcGVkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuY2xzID0gZnVuY3Rpb24gY2xzKGNsYXNzZXMsIGVzY2FwZWQpIHtcbiAgdmFyIGJ1ZiA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNsYXNzZXMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoZXNjYXBlZCAmJiBlc2NhcGVkW2ldKSB7XG4gICAgICBidWYucHVzaChleHBvcnRzLmVzY2FwZShqb2luQ2xhc3NlcyhbY2xhc3Nlc1tpXV0pKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1Zi5wdXNoKGpvaW5DbGFzc2VzKGNsYXNzZXNbaV0pKTtcbiAgICB9XG4gIH1cbiAgdmFyIHRleHQgPSBqb2luQ2xhc3NlcyhidWYpO1xuICBpZiAodGV4dC5sZW5ndGgpIHtcbiAgICByZXR1cm4gJyBjbGFzcz1cIicgKyB0ZXh0ICsgJ1wiJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cbn07XG5cblxuZXhwb3J0cy5zdHlsZSA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyh2YWwpLm1hcChmdW5jdGlvbiAoc3R5bGUpIHtcbiAgICAgIHJldHVybiBzdHlsZSArICc6JyArIHZhbFtzdHlsZV07XG4gICAgfSkuam9pbignOycpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB2YWw7XG4gIH1cbn07XG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gYXR0cmlidXRlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWxcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gZXNjYXBlZFxuICogQHBhcmFtIHtCb29sZWFufSB0ZXJzZVxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmF0dHIgPSBmdW5jdGlvbiBhdHRyKGtleSwgdmFsLCBlc2NhcGVkLCB0ZXJzZSkge1xuICBpZiAoa2V5ID09PSAnc3R5bGUnKSB7XG4gICAgdmFsID0gZXhwb3J0cy5zdHlsZSh2YWwpO1xuICB9XG4gIGlmICgnYm9vbGVhbicgPT0gdHlwZW9mIHZhbCB8fCBudWxsID09IHZhbCkge1xuICAgIGlmICh2YWwpIHtcbiAgICAgIHJldHVybiAnICcgKyAodGVyc2UgPyBrZXkgOiBrZXkgKyAnPVwiJyArIGtleSArICdcIicpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICB9IGVsc2UgaWYgKDAgPT0ga2V5LmluZGV4T2YoJ2RhdGEnKSAmJiAnc3RyaW5nJyAhPSB0eXBlb2YgdmFsKSB7XG4gICAgaWYgKEpTT04uc3RyaW5naWZ5KHZhbCkuaW5kZXhPZignJicpICE9PSAtMSkge1xuICAgICAgY29uc29sZS53YXJuKCdTaW5jZSBKYWRlIDIuMC4wLCBhbXBlcnNhbmRzIChgJmApIGluIGRhdGEgYXR0cmlidXRlcyAnICtcbiAgICAgICAgICAgICAgICAgICAnd2lsbCBiZSBlc2NhcGVkIHRvIGAmYW1wO2AnKTtcbiAgICB9O1xuICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbC50b0lTT1N0cmluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS53YXJuKCdKYWRlIHdpbGwgZWxpbWluYXRlIHRoZSBkb3VibGUgcXVvdGVzIGFyb3VuZCBkYXRlcyBpbiAnICtcbiAgICAgICAgICAgICAgICAgICAnSVNPIGZvcm0gYWZ0ZXIgMi4wLjAnKTtcbiAgICB9XG4gICAgcmV0dXJuICcgJyArIGtleSArIFwiPSdcIiArIEpTT04uc3RyaW5naWZ5KHZhbCkucmVwbGFjZSgvJy9nLCAnJmFwb3M7JykgKyBcIidcIjtcbiAgfSBlbHNlIGlmIChlc2NhcGVkKSB7XG4gICAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsLnRvSVNPU3RyaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0phZGUgd2lsbCBzdHJpbmdpZnkgZGF0ZXMgaW4gSVNPIGZvcm0gYWZ0ZXIgMi4wLjAnKTtcbiAgICB9XG4gICAgcmV0dXJuICcgJyArIGtleSArICc9XCInICsgZXhwb3J0cy5lc2NhcGUodmFsKSArICdcIic7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsLnRvSVNPU3RyaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0phZGUgd2lsbCBzdHJpbmdpZnkgZGF0ZXMgaW4gSVNPIGZvcm0gYWZ0ZXIgMi4wLjAnKTtcbiAgICB9XG4gICAgcmV0dXJuICcgJyArIGtleSArICc9XCInICsgdmFsICsgJ1wiJztcbiAgfVxufTtcblxuLyoqXG4gKiBSZW5kZXIgdGhlIGdpdmVuIGF0dHJpYnV0ZXMgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7T2JqZWN0fSBlc2NhcGVkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuYXR0cnMgPSBmdW5jdGlvbiBhdHRycyhvYmosIHRlcnNlKXtcbiAgdmFyIGJ1ZiA9IFtdO1xuXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcblxuICBpZiAoa2V5cy5sZW5ndGgpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHZhciBrZXkgPSBrZXlzW2ldXG4gICAgICAgICwgdmFsID0gb2JqW2tleV07XG5cbiAgICAgIGlmICgnY2xhc3MnID09IGtleSkge1xuICAgICAgICBpZiAodmFsID0gam9pbkNsYXNzZXModmFsKSkge1xuICAgICAgICAgIGJ1Zi5wdXNoKCcgJyArIGtleSArICc9XCInICsgdmFsICsgJ1wiJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJ1Zi5wdXNoKGV4cG9ydHMuYXR0cihrZXksIHZhbCwgZmFsc2UsIHRlcnNlKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ1Zi5qb2luKCcnKTtcbn07XG5cbi8qKlxuICogRXNjYXBlIHRoZSBnaXZlbiBzdHJpbmcgb2YgYGh0bWxgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBodG1sXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG52YXIgamFkZV9lbmNvZGVfaHRtbF9ydWxlcyA9IHtcbiAgJyYnOiAnJmFtcDsnLFxuICAnPCc6ICcmbHQ7JyxcbiAgJz4nOiAnJmd0OycsXG4gICdcIic6ICcmcXVvdDsnXG59O1xudmFyIGphZGVfbWF0Y2hfaHRtbCA9IC9bJjw+XCJdL2c7XG5cbmZ1bmN0aW9uIGphZGVfZW5jb2RlX2NoYXIoYykge1xuICByZXR1cm4gamFkZV9lbmNvZGVfaHRtbF9ydWxlc1tjXSB8fCBjO1xufVxuXG5leHBvcnRzLmVzY2FwZSA9IGphZGVfZXNjYXBlO1xuZnVuY3Rpb24gamFkZV9lc2NhcGUoaHRtbCl7XG4gIHZhciByZXN1bHQgPSBTdHJpbmcoaHRtbCkucmVwbGFjZShqYWRlX21hdGNoX2h0bWwsIGphZGVfZW5jb2RlX2NoYXIpO1xuICBpZiAocmVzdWx0ID09PSAnJyArIGh0bWwpIHJldHVybiBodG1sO1xuICBlbHNlIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIFJlLXRocm93IHRoZSBnaXZlbiBgZXJyYCBpbiBjb250ZXh0IHRvIHRoZVxuICogdGhlIGphZGUgaW4gYGZpbGVuYW1lYCBhdCB0aGUgZ2l2ZW4gYGxpbmVub2AuXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyXG4gKiBAcGFyYW0ge1N0cmluZ30gZmlsZW5hbWVcbiAqIEBwYXJhbSB7U3RyaW5nfSBsaW5lbm9cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMucmV0aHJvdyA9IGZ1bmN0aW9uIHJldGhyb3coZXJyLCBmaWxlbmFtZSwgbGluZW5vLCBzdHIpe1xuICBpZiAoIShlcnIgaW5zdGFuY2VvZiBFcnJvcikpIHRocm93IGVycjtcbiAgaWYgKCh0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnIHx8ICFmaWxlbmFtZSkgJiYgIXN0cikge1xuICAgIGVyci5tZXNzYWdlICs9ICcgb24gbGluZSAnICsgbGluZW5vO1xuICAgIHRocm93IGVycjtcbiAgfVxuICB0cnkge1xuICAgIHN0ciA9IHN0ciB8fCByZXF1aXJlKCdmcycpLnJlYWRGaWxlU3luYyhmaWxlbmFtZSwgJ3V0ZjgnKVxuICB9IGNhdGNoIChleCkge1xuICAgIHJldGhyb3coZXJyLCBudWxsLCBsaW5lbm8pXG4gIH1cbiAgdmFyIGNvbnRleHQgPSAzXG4gICAgLCBsaW5lcyA9IHN0ci5zcGxpdCgnXFxuJylcbiAgICAsIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gY29udGV4dCwgMClcbiAgICAsIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgY29udGV4dCk7XG5cbiAgLy8gRXJyb3IgY29udGV4dFxuICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/ICcgID4gJyA6ICcgICAgJylcbiAgICAgICsgY3VyclxuICAgICAgKyAnfCAnXG4gICAgICArIGxpbmU7XG4gIH0pLmpvaW4oJ1xcbicpO1xuXG4gIC8vIEFsdGVyIGV4Y2VwdGlvbiBtZXNzYWdlXG4gIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8ICdKYWRlJykgKyAnOicgKyBsaW5lbm9cbiAgICArICdcXG4nICsgY29udGV4dCArICdcXG5cXG4nICsgZXJyLm1lc3NhZ2U7XG4gIHRocm93IGVycjtcbn07XG5cbmV4cG9ydHMuRGVidWdJdGVtID0gZnVuY3Rpb24gRGVidWdJdGVtKGxpbmVubywgZmlsZW5hbWUpIHtcbiAgdGhpcy5saW5lbm8gPSBsaW5lbm87XG4gIHRoaXMuZmlsZW5hbWUgPSBmaWxlbmFtZTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9qYWRlL2xpYi9ydW50aW1lLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAyIDMiLCIvKiAoaWdub3JlZCkgKi9cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBmcyAoaWdub3JlZClcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIgMyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcblx0Y29uc29sZS5sb2coJ21hcDRwLmpzJyk7XHJcblxyXG5cdHZhciBfbWFwamFkZSA9IHJlcXVpcmUoJy4uL3ZpZXcvbWFwLmphZGUnKTtcclxuXHQkKCcuYy1wbGFjZScpLmh0bWwoX21hcGphZGUoKSk7XHJcblxyXG5cdHZhciBfcG9kZXRhaWwgPSByZXF1aXJlKCcuLi9tb2R1bGUvcG9EZXRhaWwuanMnKTtcclxuXHR2YXIgcG9EZXRhaWwgPSBuZXcgX3BvZGV0YWlsKCk7XHJcblxyXG5cdHZhciBfcGF0aExpc3QgPSByZXF1aXJlKCcuLi9tb2R1bGUvcGF0aExpc3QuanMnKTtcclxuXHR2YXIgcGF0aExpc3QgPSBuZXcgX3BhdGhMaXN0KCk7XHJcblxyXG5cdHZhciBfc2F2ZSA9IHRydWU7XHJcblx0dmFyIF9ldmVudCwgX3Bvc3RPZmZpY2VBcnI7XHJcblx0dmFyIG15Q29sbGVjdGlvbiA9IG5ldyB5bWFwcy5HZW9PYmplY3RDb2xsZWN0aW9uKCk7XHJcblx0dmFyIF9yb3V0ZTtcclxuXHJcblx0dmFyIG15QmFsbG9vbkNvbnRlbnRCb2R5TGF5b3V0ID0geW1hcHMudGVtcGxhdGVMYXlvdXRGYWN0b3J5LmNyZWF0ZUNsYXNzKFxyXG5cdFx0JzxwPiRbcHJvcGVydGllcy5kYXRhLnBvc3RhbENvZGVdPC9wPjxwPiRbcHJvcGVydGllcy5kYXRhLmFkZHJlc3NTb3VyY2VdPC9wPjxwPiRbcHJvcGVydGllcy5kYXRhLnR5cGVDb2RlXTwvcD48cD7QutC+0Lst0LLQviDQt9Cw0Y/QstC+0LogJFtwcm9wZXJ0aWVzLmRhdGEuZXZudFRvdGFsXTwvcD48YnIgLz48YnV0dG9uIGlkPVwic2hvdy1wby1kZXRhaWwtYnRuXCI+0J/QvtC00YDQvtCx0L3QvjwvYnV0dG9uPjxiciAvPjxidXR0b24gaWQ9XCJhZGQtdG8tcGF0aC1idG5cIj7QkiDRgdC/0LjRgdC+0Lo8L2J1dHRvbj4nLCB7XHJcblx0XHRcdGJ1aWxkOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRteUJhbGxvb25Db250ZW50Qm9keUxheW91dC5zdXBlcmNsYXNzLmJ1aWxkLmNhbGwodGhpcyk7XHJcblx0XHRcdFx0JCgnI3Nob3ctcG8tZGV0YWlsLWJ0bicpLm9uKCdjbGljaycsIHtcclxuXHRcdFx0XHRcdFwicG9cIjogdGhpcy5fZGF0YS5wcm9wZXJ0aWVzLl9kYXRhXHJcblx0XHRcdFx0fSwgdGhpcy5vblNob3dQT0RldGFpbENsaWNrKTtcclxuXHRcdFx0XHQkKCcjYWRkLXRvLXBhdGgtYnRuJykub24oJ2NsaWNrJywge1xyXG5cdFx0XHRcdFx0XCJwb1wiOiB0aGlzLl9kYXRhLnByb3BlcnRpZXMuX2RhdGFcclxuXHRcdFx0XHR9LCB0aGlzLm9uQWRkVG9QYXRoQ2xpY2spO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRjbGVhcjogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0JCgnI3Nob3ctcG8tZGV0YWlsLWJ0bicpLm9mZignY2xpY2snLCB0aGlzLm9uU2hvd1BPRGV0YWlsQ2xpY2spO1xyXG5cdFx0XHRcdG15QmFsbG9vbkNvbnRlbnRCb2R5TGF5b3V0LnN1cGVyY2xhc3MuY2xlYXIuY2FsbCh0aGlzKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0b25TaG93UE9EZXRhaWxDbGljazogZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRcdHBvRGV0YWlsLmluaXQoZS5kYXRhLnBvLmRhdGEsIG15TWFwKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0b25BZGRUb1BhdGhDbGljazogZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRcdHBhdGhMaXN0LmFkZEVsZW1lbnQoZS5kYXRhLnBvLmRhdGEpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0dmFyIG15TWFwID0gbmV3IHltYXBzLk1hcChcIm1hcHlcIiwge1xyXG5cdFx0Y2VudGVyOiBbNTAuNTksIDM2LjU4XSxcclxuXHRcdHpvb206IDEwLFxyXG5cdFx0Y29udHJvbHM6IFsncm91dGVFZGl0b3InXVxyXG5cdH0sIHtcclxuXHRcdGJ1dHRvbk1heFdpZHRoOiAxNTBcclxuXHR9KTtcclxuXHJcblx0aW5pdE1hcCgpO1xyXG5cclxuXHRmdW5jdGlvbiBjcmVhdGVQYXRoKHNlbGVjdGVkRWwpIHtcclxuXHRcdCQoJyNwby1jZW50ci1idG4nKS5vZmYoKTtcclxuXHRcdF9wb3N0T2ZmaWNlQXJyID0gW107XHJcblx0XHRteUNvbGxlY3Rpb24ucmVtb3ZlQWxsKCk7XHJcblx0XHRpZiAoX3JvdXRlKVxyXG5cdFx0XHRteU1hcC5nZW9PYmplY3RzLnJlbW92ZShfcm91dGUpO1xyXG5cclxuXHRcdHZhciBwYXRoQXJyID0gc2VsZWN0ZWRFbC5tYXAoZnVuY3Rpb24ob3RkKSB7XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0dHlwZTogJ3dheVBvaW50JyxcclxuXHRcdFx0XHRwb2ludDogW290ZC5sYXRpdHVkZSwgb3RkLmxvbmdpdHVkZV1cclxuXHRcdFx0fTtcclxuXHRcdH0pO1xyXG5cdFx0eW1hcHMucm91dGUocGF0aEFycikudGhlbihcclxuXHRcdFx0ZnVuY3Rpb24ocm91dGUpIHtcclxuXHRcdFx0XHRfcm91dGUgPSByb3V0ZTtcclxuXHRcdFx0XHRteU1hcC5nZW9PYmplY3RzLmFkZChyb3V0ZSk7XHJcblxyXG5cdFx0XHRcdHZhciBwb2ludHMgPSByb3V0ZS5nZXRXYXlQb2ludHMoKTtcclxuXHRcdFx0XHRwb2ludHMub3B0aW9ucy5zZXQoJ3ByZXNldCcsICdpc2xhbmRzI2JsdWVTdHJldGNoeUljb24nKTtcclxuXHRcdFx0XHRwb2ludHMuZWFjaChmdW5jdGlvbihlbCwgaSkge1xyXG5cdFx0XHRcdFx0ZWwucHJvcGVydGllcy5zZXQoJ2ljb25Db250ZW50Jywgc2VsZWN0ZWRFbFtpXS5wb3N0YWxDb2RlICsgXCIg0YLQvtGH0LrQsCDihJZcIiArIChpICsgMSkpO1xyXG5cdFx0XHRcdFx0ZWwucHJvcGVydGllcy5zZXQoJ2JhbGxvb25Db250ZW50Jywgc2VsZWN0ZWRFbFtpXS5wb3N0YWxDb2RlICsgXCIg0YLQvtGH0LrQsCDihJZcIiArIChpICsgMSkpO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0fSxcclxuXHRcdFx0ZnVuY3Rpb24oZXJyb3IpIHtcclxuXHRcdFx0XHRhbGVydChcItCS0L7Qt9C90LjQutC70LAg0L7RiNC40LHQutCwOiBcIiArIGVycm9yLm1lc3NhZ2UpO1xyXG5cdFx0XHR9XHJcblx0XHQpO1xyXG5cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHNvcnRDb21wYXJhdG9yKGEsIGIpIHtcclxuXHRcdGlmIChwYXJzZUludChhLnBvc3RhbENvZGUpID4gcGFyc2VJbnQoYi5wb3N0YWxDb2RlKSkge1xyXG5cdFx0XHRyZXR1cm4gMTtcclxuXHRcdH1cclxuXHRcdGlmIChwYXJzZUludChhLnBvc3RhbENvZGUpIDwgcGFyc2VJbnQoYi5wb3N0YWxDb2RlKSkge1xyXG5cdFx0XHRyZXR1cm4gLTE7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBpbml0TWFwKCkge1xyXG5cdFx0JC5hamF4KHtcclxuXHRcdFx0dHlwZTogJ0dFVCcsXHJcblx0XHRcdHVybDogXCIuL3Bvc3RhbHMuanNvblwiLFxyXG5cdFx0XHRkYXRhVHlwZTogXCJqc29uXCIsXHJcblx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuXHJcblx0XHRcdFx0ZGF0YS5zb3J0KHNvcnRDb21wYXJhdG9yKTtcclxuXHJcblx0XHRcdFx0JC5hamF4KHtcclxuXHRcdFx0XHRcdHR5cGU6ICdHRVQnLFxyXG5cdFx0XHRcdFx0dXJsOiAnL2V2bnQvbXInLFxyXG5cdFx0XHRcdFx0ZGF0YVR5cGU6ICdqc29uJyxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKG1yZGF0YSkge1xyXG5cclxuXHRcdFx0XHRcdFx0bXJkYXRhLnNvcnQoc29ydENvbXBhcmF0b3IpO1xyXG5cclxuXHRcdFx0XHRcdFx0ZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKG90ZCkge1xyXG5cclxuXHRcdFx0XHRcdFx0XHRvdGQuZXZudFRvdGFsID0gJzAnO1xyXG5cdFx0XHRcdFx0XHRcdG1yZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKG1yKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAob3RkLnBvc3RhbENvZGUgPT0gbXIuX2lkKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdG90ZC5ldm50VG90YWwgPSBtci5jb3VudDtcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdFx0XHR2YXIgc3RsID0gJ2lzbGFuZHMjZGFya2dyZWVuU3RyZXRjaHlJY29uJztcclxuXHRcdFx0XHRcdFx0XHRpZiAob3RkLmV2bnRUb3RhbCA+PSAnMScpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHN0bCA9ICdpc2xhbmRzI2RhcmtibHVlU3RyZXRjaHlJY29uJztcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0aWYgKG90ZC5ldm50VG90YWwgPj0gJzMnKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRzdGwgPSAnaXNsYW5kcyN2aW9sZXRTdHJldGNoeUljb24nO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0dmFyIHBtYXJrID0gbmV3IHltYXBzLlBsYWNlbWFyayhbb3RkLmxhdGl0dWRlLCBvdGQubG9uZ2l0dWRlXSwge1xyXG5cdFx0XHRcdFx0XHRcdFx0ZGF0YTogb3RkLFxyXG5cdFx0XHRcdFx0XHRcdFx0aWNvbkNvbnRlbnQ6IG90ZC5wb3N0YWxDb2RlICsgXCIgLyBcIiArIG90ZC5ldm50VG90YWwsXHJcblx0XHRcdFx0XHRcdFx0XHRpY29uQ2FwdGlvbjogb3RkLnBvc3RhbENvZGVcclxuXHRcdFx0XHRcdFx0XHR9LCB7XHJcblx0XHRcdFx0XHRcdFx0XHRiYWxsb29uQ29udGVudExheW91dDogbXlCYWxsb29uQ29udGVudEJvZHlMYXlvdXQsXHJcblx0XHRcdFx0XHRcdFx0XHRwcmVzZXQ6IHN0bFxyXG5cdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRcdG15Q29sbGVjdGlvbi5hZGQocG1hcmspO1xyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHRcdF9wb3N0T2ZmaWNlQXJyID0gZGF0YTtcclxuXHRcdFx0XHRcdFx0bXlNYXAuZ2VvT2JqZWN0cy5hZGQobXlDb2xsZWN0aW9uKTtcclxuXHRcdFx0XHRcdFx0cGF0aExpc3QuaW5pdChjcmVhdGVQYXRoKTtcclxuXHJcblxyXG5cdFx0XHRcdFx0XHQkKCcjcG8tY2VudHItYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRcdFx0XHRcdHZhciBwb25vbSA9ICQoJyNwb251bScpLnZhbCgpO1xyXG5cdFx0XHRcdFx0XHRcdF9wb3N0T2ZmaWNlQXJyLmZvckVhY2goZnVuY3Rpb24ocG8pIHtcclxuXHRcdFx0XHRcdFx0XHRcdGlmIChwby5wb3N0YWxDb2RlID09IHBvbm9tKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdG15TWFwLnNldENlbnRlcihbcG8ubGF0aXR1ZGUsIHBvLmxvbmdpdHVkZV0sIDEzLCB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2hlY2tab29tUmFuZ2U6IHRydWVcclxuXHRcdFx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0XHQkKCcjZG8tZmlsdGVyLWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0XHRcdFx0XHR2YXIgX3JhbmdlID0gJCgnaW5wdXRbbmFtZT1cImZpbHRlcm1hcFwiXTpjaGVja2VkJykudmFsKCk7XHJcblx0XHRcdFx0XHRcdFx0bXlDb2xsZWN0aW9uLnJlbW92ZUFsbCgpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRkYXRhLmZvckVhY2goZnVuY3Rpb24ob3RkKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAob3RkLmV2bnRUb3RhbCA+PSBwYXJzZUludChfcmFuZ2UpKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHZhciBzdGwgPSAnaXNsYW5kcyNkYXJrZ3JlZW5TdHJldGNoeUljb24nO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAob3RkLmV2bnRUb3RhbCA+PSAnMScpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRzdGwgPSAnaXNsYW5kcyNkYXJrYmx1ZVN0cmV0Y2h5SWNvbic7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKG90ZC5ldm50VG90YWwgPj0gJzMnKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0c3RsID0gJ2lzbGFuZHMjdmlvbGV0U3RyZXRjaHlJY29uJztcclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0dmFyIHBtYXJrID0gbmV3IHltYXBzLlBsYWNlbWFyayhbb3RkLmxhdGl0dWRlLCBvdGQubG9uZ2l0dWRlXSwge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGRhdGE6IG90ZCxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpY29uQ29udGVudDogb3RkLnBvc3RhbENvZGUgKyBcIiAvIFwiICsgb3RkLmV2bnRUb3RhbCxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpY29uQ2FwdGlvbjogb3RkLnBvc3RhbENvZGVcclxuXHRcdFx0XHRcdFx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGJhbGxvb25Db250ZW50TGF5b3V0OiBteUJhbGxvb25Db250ZW50Qm9keUxheW91dCxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRwcmVzZXQ6IHN0bFxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0bXlDb2xsZWN0aW9uLmFkZChwbWFyayk7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdG15TWFwLmdlb09iamVjdHMuYWRkKG15Q29sbGVjdGlvbik7XHJcblxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHJcblxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGVycm9yOiBmdW5jdGlvbihlcnIpIHtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coZXJyKTtcclxuXHJcblxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0fSxcclxuXHRcdFx0Ly9lcnJvcjogbG9hZEVycm9yXHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBteU1hcDtcclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2pzL2Rldi9wbS9tb2R1bGUvbWFwNHAuanNcbi8vIG1vZHVsZSBpZCA9IDEyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDIgMyIsInZhciBqYWRlID0gcmVxdWlyZShcIkM6XFxcXF90ZW1wXFxcXHBjaHRcXFxcbm9kZV9tb2R1bGVzXFxcXGphZGVcXFxcbGliXFxcXHJ1bnRpbWUuanNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8ZGl2IGlkPVxcXCJtYXB5XFxcIiBzdHlsZT1cXFwid2lkdGg6IDEwMCU7IGhlaWdodDogODAwcHhcXFwiPjwvZGl2PlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2pzL2Rldi9wbS92aWV3L21hcC5qYWRlXG4vLyBtb2R1bGUgaWQgPSAxMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAyIDMiLCIndXNlIHNydGljdCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cz1mdW5jdGlvbigpe1xyXG5cclxuICB0aGlzLl9tb2RhbCA9IHJlcXVpcmUoJy4uL3ZpZXcvcG9EZXRhaWwuamFkZScpO1xyXG5cclxuICB0aGlzLmRlc3Ryb3lNb2RhbCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgXHJcbiAgICAkKCcjY2xvc2UtbW9kYWwtYnRuJykub2ZmKCdjbGljaycpO1xyXG4gICAgJCgnI2Nsb3NlLW1vZGFsLWNyb3NzLWJ0bicpLm9mZignY2xpY2snKTtcclxuICAgICQoJy5tb2RhbC1wbGFjZScpLmh0bWwoJycpO1xyXG4gIH07XHJcblxyXG4gIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgdGhpcy5pbml0ID0gZnVuY3Rpb24oZGF0YSwgbXlNYXApIHtcclxuXHJcbiAgICAkKCcubW9kYWwtcGxhY2UnKS5odG1sKHRoaXMuX21vZGFsKHtcImRhdGFcIjogZGF0YX0pKTtcclxuXHJcblxyXG4gICAgJCgnI2Nsb3NlLW1vZGFsLWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcjY2xvc2UtbW9kYWwtY3Jvc3MtYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgICQoJyNtb2RhbCcpLm1vZGFsKCdzaG93Jyk7XHJcblxyXG4gICAgJCgnI21vZGFsJykub24oJ2hpZGRlbi5icy5tb2RhbCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgY29uc29sZS5sb2coJ21vZGFsIGhpZGUnKTtcclxuICAgICAgc2VsZi5kZXN0cm95TW9kYWwoKTtcclxuICAgIH0pO1xyXG5cclxuICB9O1xyXG5cdFxyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvanMvZGV2L3BtL21vZHVsZS9wb0RldGFpbC5qc1xuLy8gbW9kdWxlIGlkID0gMTI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMiAzIiwidmFyIGphZGUgPSByZXF1aXJlKFwiQzpcXFxcX3RlbXBcXFxccGNodFxcXFxub2RlX21vZHVsZXNcXFxcamFkZVxcXFxsaWJcXFxccnVudGltZS5qc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKGRhdGEsIHVuZGVmaW5lZCkge1xuYnVmLnB1c2goXCI8ZGl2IGlkPVxcXCJtb2RhbFxcXCIgdGFiaW5kZXg9XFxcIi0xXFxcIiByb2xlPVxcXCJkaWFsb2dcXFwiIGFyaWEtbGFiZWxsZWRieT1cXFwibXlNb2RhbExhYmVsXFxcIiBhcmlhLWhpZGRlbj1cXFwidHJ1ZVxcXCIgY2xhc3M9XFxcIm1vZGFsIGZhZGVcXFwiPjxkaXYgcm9sZT1cXFwiZG9jdW1lbnRcXFwiIGNsYXNzPVxcXCJtb2RhbC1kaWFsb2dcXFwiPjxkaXYgY2xhc3M9XFxcIm1vZGFsLWNvbnRlbnRcXFwiPjxkaXYgY2xhc3M9XFxcIm1vZGFsLWhlYWRlclxcXCI+PGJ1dHRvbiBpZD1cXFwiY2xvc2UtbW9kYWwtY3Jvc3MtYnRuXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGRhdGEtZGlzbWlzcz1cXFwibW9kYWxcXFwiIGFyaWEtbGFiZWw9XFxcIkNsb3NlXFxcIiBjbGFzcz1cXFwiY2xvc2VcXFwiPjxzcGFuIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIj7Dlzwvc3Bhbj48L2J1dHRvbj48aDQgaWQ9XFxcIm15TW9kYWxMYWJlbFxcXCIgY2xhc3M9XFxcIm1vZGFsLXRpdGxlXFxcIj7QlNC10YLQsNC70YzQvdC+IC0gXCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gZGF0YS5wb3N0YWxDb2RlKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCI8L2g0PjwvZGl2PjxkaXYgY2xhc3M9XFxcIm1vZGFsLWJvZHlcXFwiPjxkaXYgY2xhc3M9XFxcImNhcmRcXFwiPjxoMyBjbGFzcz1cXFwiY2FyZC1oZWFkZXJcXFwiPlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IGRhdGEucG9zdGFsQ29kZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiPC9oMz48ZGl2IGNsYXNzPVxcXCJjYXJkLWJsb2NrXFxcIj48aDQgY2xhc3M9XFxcImNhcmQtdGl0bGVcXFwiPlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IGRhdGEucG9zdGFsQ29kZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiIFwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IGRhdGEuc2V0dGxlbWVudCkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiIFwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IGRhdGEuYWRkcmVzc1NvdXJjZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiPC9oND48ZGl2IGNsYXNzPVxcXCJjYXJkLXRleHRcXFwiPjxoND7Qn9GA0LXQtNC+0YHRgtCw0LLQu9GP0LXQvNGL0LUg0YPRgdC70YPQs9C4PC9oND48dWw+PC91bD5cIik7XG4vLyBpdGVyYXRlIGRhdGEuc2VydmljZUdyb3Vwc1xuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSBkYXRhLnNlcnZpY2VHcm91cHM7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBzZyA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGxpPlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IHNnLnNlcnZpY2VHcm91cE5hbWUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIjwvbGk+XCIpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIHNnID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8bGk+XCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gc2cuc2VydmljZUdyb3VwTmFtZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiPC9saT5cIik7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbmJ1Zi5wdXNoKFwiPGg0PtCi0LXQu9C10YTQvtC90Ys8L2g0Pjx1bD48L3VsPlwiKTtcbi8vIGl0ZXJhdGUgZGF0YS5waG9uZXNcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gZGF0YS5waG9uZXM7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBwaG9uZSA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGxpPiAoXCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gcGhvbmUucGhvbmVUb3duQ29kZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiKSBcIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBwaG9uZS5waG9uZU51bWJlcikgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiIChcIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBwaG9uZS5waG9uZVR5cGVOYW1lKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCIpPC9saT5cIik7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIgcGhvbmUgPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIjxsaT4gKFwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IHBob25lLnBob25lVG93bkNvZGUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIikgXCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gcGhvbmUucGhvbmVOdW1iZXIpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIiAoXCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gcGhvbmUucGhvbmVUeXBlTmFtZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiKTwvbGk+XCIpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG5idWYucHVzaChcIjxoND7QktGA0LXQvNGPINGA0LDQsdC+0YLRi1xcdFxcdDwvaDQ+PHVsPjwvdWw+XCIpO1xuLy8gaXRlcmF0ZSBkYXRhLndvcmtpbmdIb3Vyc1xuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSBkYXRhLndvcmtpbmdIb3VycztcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIHdoID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8bGk+XCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gd2gud2Vla0RheU5hbWUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIlxcdDwvbGk+XCIpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIHdoID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8bGk+XCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gd2gud2Vla0RheU5hbWUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIlxcdDwvbGk+XCIpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG5idWYucHVzaChcIjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XFxcIm1vZGFsLWZvb3RlclxcXCI+PGJ1dHRvbiBpZD1cXFwiY2xvc2UtbW9kYWwtYnRuXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGRhdGEtZGlzbWlzcz1cXFwibW9kYWxcXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+Q2xvc2U8L2J1dHRvbj48L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj5cIik7fS5jYWxsKHRoaXMsXCJkYXRhXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5kYXRhOnR5cGVvZiBkYXRhIT09XCJ1bmRlZmluZWRcIj9kYXRhOnVuZGVmaW5lZCxcInVuZGVmaW5lZFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgudW5kZWZpbmVkOnR5cGVvZiB1bmRlZmluZWQhPT1cInVuZGVmaW5lZFwiP3VuZGVmaW5lZDp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2pzL2Rldi9wbS92aWV3L3BvRGV0YWlsLmphZGVcbi8vIG1vZHVsZSBpZCA9IDEzMFxuLy8gbW9kdWxlIGNodW5rcyA9IDIgMyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcblxyXG5cdHRoaXMucGxKYWRlID0gcmVxdWlyZSgnLi4vdmlldy9wYXRoTGlzdC5qYWRlJyk7XHJcblx0dGhpcy5lbEphZGUgPSByZXF1aXJlKCcuLi92aWV3L2xpc3RFbC5qYWRlJyk7XHJcblx0dGhpcy5uZXN0ZWRMaXN0SmFkZSA9IHJlcXVpcmUoJy4uL3ZpZXcvc3VibGlzdC5qYWRlJyk7XHJcblx0dGhpcy5wZGZKYWRlID0gcmVxdWlyZSgnLi4vdmlldy9wZGZQYXRoTGlzdC5qYWRlJyk7XHJcblx0dGhpcy5ldm50RGV0YWlsSmFkZSA9IHJlcXVpcmUoJy4uL3ZpZXcvZWRpdGRlbEV2ZW50LmphZGUnKTtcclxuXHR0aGlzLmxpc3RzSmFkZSA9IHJlcXVpcmUoJy4uL3ZpZXcvbGlzdHMuamFkZScpO1xyXG5cdHRoaXMueW1hcENlYXRlUGF0aCA9IHt9O1xyXG5cdHRoaXMuc2VsZWN0ZWRFTCA9IFtdO1xyXG5cdHRoaXMudXNlcnM9W107XHJcblx0dGhpcy5saXN0cz17fTtcclxuXHJcblx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuXHR0aGlzLmluaXQgPSBmdW5jdGlvbih5TWFwQ3JlYXRlUGF0aCkge1x0XHRcclxuXHRcdC8vc2VsZi5teU1hcD1teU1hcDtcclxuXHRcdHNlbGYueW1hcENlYXRlUGF0aCA9IHlNYXBDcmVhdGVQYXRoO1xyXG5cdFx0XHJcblxyXG5cdFx0JC5nZXQoJy91c2Vycy9hbGwnLCBmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0c2VsZi51c2Vycz1kYXRhO1xyXG5cdFx0XHQkKCcubC1wbGFjZScpLmh0bWwoc2VsZi5wbEphZGUoeyd1c2Vycyc6ZGF0YX0pKTtcclxuXHRcdFx0JCgnLmxpc3QtcGxhY2UnKS5odG1sKHNlbGYubGlzdHNKYWRlKHsndXNlcnMnOmRhdGF9KSk7XHJcblx0XHRcdCQoJyNjbGVhci1wbGlzdC1idG4nKS5vbignY2xpY2snLCBzZWxmLnJlbW92ZUFsbCk7XHJcblx0XHRcdCQoJyNjcmVhdGUtcGF0aC1idG4nKS5vbignY2xpY2snLCBzZWxmLmNyZWF0ZVBhdGgpO1xyXG5cdFx0XHQkKCcjcHJpbnQtcGF0aC1idG4nKS5vbignY2xpY2snLCBzZWxmLnBkZlBhdGgpO1xyXG5cdFx0XHQkKCcjYXNzaW5nLXVzZXItYnRuJykub24oJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHJcblx0XHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0XHRcdHZhciBfdXZhbD0kKCcjdXNlcnMtbGlzdCcpLnZhbCgpO1xyXG5cdFx0XHRcdHZhciBfZXZudHM9W107XHJcblx0XHRcdFx0c2VsZi5zZWxlY3RlZEVMLmZvckVhY2goZnVuY3Rpb24ob3Ape1xyXG5cdFx0XHRcdFx0dmFyIF9wbz17cG9zdGFsQ29kZTpvcC5wb3N0YWxDb2RlLCBldm50czpbXX07XHJcblx0XHRcdFx0XHRpZihvcC5ldm50cyl7XHJcblx0XHRcdFx0XHRcdG9wLmV2bnRzLmZvckVhY2goZnVuY3Rpb24oZXZudCl7XHJcblx0XHRcdFx0XHRcdF9wby5ldm50cy5wdXNoKGV2bnQuX2lkKTtcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRfZXZudHMucHVzaChfcG8pO1xyXG5cdFx0XHRcdC8qXHRpZihvcC5ldm50cyl7XHJcblx0XHRcdFx0XHRcdG9wLmV2bnRzLmZvckVhY2goZnVuY3Rpb24oZXZudCl7XHJcblx0XHRcdFx0XHRcdFx0X2V2bnRzLnB1c2goZXZudC5faWQpO1xyXG5cdFx0XHRcdFx0XHR9KTtcdFxyXG5cdFx0XHRcdFx0fSovXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0dmFyIGxpc3Q9e3VzZXJJRDpfdXZhbCwgZXZudElEczpfZXZudHN9O1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGxpc3QpO1xyXG5cdFx0XHRcdCQuYWpheCh7XHJcblx0XHRcdFx0XHR0eXBlOiAnUE9TVCcsXHJcblx0XHRcdFx0XHR1cmw6ICcvbGlzdHMvbmV3JyxcclxuXHRcdFx0XHRcdGRhdGE6IEpTT04uc3RyaW5naWZ5KGxpc3QpLFxyXG5cdFx0XHRcdFx0ZGF0YVR5cGU6IFwianNvblwiLFxyXG5cdFx0XHRcdFx0Y29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG5cdFx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhcImRhdGEgc2F2ZVwiKTtcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHQvL2Vycm9yOiBhamF4RXJyb3JcclxuXHRcdFx0XHR9KTtcdFx0XHRcdFxyXG5cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQkLmdldCgnL2xpc3RzL2FsbCcsZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0c2VsZi5saXN0cz1kYXRhO1xyXG5cdFx0XHRcdHZhciBfYXJyPVtdO1xyXG5cdFx0XHRcdHZhciB1bExpc3RKYWRlPXJlcXVpcmUoJy4uL3ZpZXcvdWxMaXN0cy5qYWRlJyk7XHJcblx0XHRcdFx0Zm9yICh2YXIgcHJvcCBpbiBkYXRhKXtcclxuXHRcdFx0XHRcdGlmKGRhdGEuaGFzT3duUHJvcGVydHkocHJvcCkpe1xyXG5cdFx0XHRcdFx0XHRfYXJyLnB1c2goZGF0YVtwcm9wXSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdCQoJyNsaXN0cy1saXN0JykuaHRtbCh1bExpc3RKYWRlKHsnZGF0YSc6X2Fycn0pKTtcclxuXHRcdFx0XHQkKCcubGlzdHMtbGknKS5vbignY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG5cdFx0XHRcdFx0c2VsZi5yZW1vdmVBbGwoKTtcclxuXHRcdFx0XHRcdHZhciBzZWxlY3RlZExpc3Q9c2VsZi5saXN0c1skKGUuY3VycmVudFRhcmdldCkuYXR0cignZGF0YS1saXN0LWlkJyldO1xyXG5cdFx0XHRcdFx0Zm9yKHZhciBvdGROYW1lIGluIHNlbGVjdGVkTGlzdC5saXN0KXtcclxuXHRcdFx0XHRcdFx0dmFyIF9vdGQ9c2VsZWN0ZWRMaXN0Lmxpc3Rbb3RkTmFtZV0ucG9zdGFsT2ZmaWNlO1xyXG5cdFx0XHRcdFx0XHRfb3RkLmV2bnRzPXNlbGVjdGVkTGlzdC5saXN0W290ZE5hbWVdLmV2bnRzO1xyXG5cdFx0XHRcdFx0XHQvL3NlbGYuc2VsZWN0ZWRFTC5wdXNoKF9vdGQpO1xyXG5cdFx0XHRcdFx0XHRzZWxmLmFkZEVsZW1lbnQoX290ZCx0cnVlKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdC8vY29uc29sZS5sb2coJChlLmN1cnJlbnRUYXJnZXQpLmF0dHIoJ2RhdGEtbGlzdC1pZCcpKTtcclxuXHRcdFx0XHRcdHNlbGYuY3JlYXRlUGF0aCgpO1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1x0XHRcclxuXHJcblx0fTtcclxuXHJcblx0dGhpcy5hZGRFbGVtZW50ID0gZnVuY3Rpb24oZGF0YSxldm50TG9hZGVkKSB7XHJcblx0XHQkKCcjcGF0aC1saXN0JykuYXBwZW5kKHNlbGYuZWxKYWRlKHtcclxuXHRcdFx0XCJkYXRhXCI6IGRhdGFcclxuXHRcdH0pKTtcclxuXHRcdHNlbGYuc2VsZWN0ZWRFTC5wdXNoKGRhdGEpO1xyXG5cdFx0JCgnW2RhdGEtcG8taWQ9JyArIGRhdGEucG9zdGFsQ29kZSArICddJykuY2hpbGRyZW4oJy5yZW1vdmUtcG8tbGlzdCcpLm9uKCdjbGljaycsIHtcclxuXHRcdFx0ZWxlbWVudDogZGF0YVxyXG5cdFx0fSwgc2VsZi5yZW1vdmVFbGVtZW50KTtcclxuXHRcdFxyXG5cdFx0aWYoZXZudExvYWRlZCl7XHJcblx0XHRcdHNlbGYuc2hvd0V2bnRzKGRhdGEpO1xyXG5cdFx0fWVsc2V7XHJcblx0XHRcdHNlbGYubG9hZEV2bnREYXRhKGRhdGEpO1xyXG5cdFx0fVxyXG5cclxuXHR9O1xyXG5cclxuXHR0aGlzLnNob3dFdm50cz1mdW5jdGlvbihfZGF0YSl7XHJcblx0XHQkKCdbZGF0YS1wby1pZD0nICsgX2RhdGEucG9zdGFsQ29kZSArICddJykuZmluZCgnaS5mYS1zcGlubmVyJykucmVtb3ZlKCk7XHJcblx0XHQkKCdbZGF0YS1wby1pZD0nICsgX2RhdGEucG9zdGFsQ29kZSArICddJykuYXBwZW5kKHNlbGYubmVzdGVkTGlzdEphZGUoe1xyXG5cdFx0XHRcdFx0XHRcImRhdGFcIjogX2RhdGEuZXZudHNcclxuXHRcdFx0XHR9KSk7XHJcblx0XHQkKCdbZGF0YS1wby1pZD0nICsgX2RhdGEucG9zdGFsQ29kZSArICddJykub24oJ2NsaWNrJywgc2VsZi5saXN0ZW5Fdm50KTtcclxuXHR9O1xyXG5cclxuXHR0aGlzLmxvYWRFdm50RGF0YSA9IGZ1bmN0aW9uKF9kYXRhKSB7XHJcblx0XHR2YXIgcmFyciA9IFtdO1xyXG5cdFx0JC5hamF4KHtcclxuXHRcdFx0dHlwZTogJ0dFVCcsXHJcblx0XHRcdC8vdXJsOiBcIi4vdGVzdGV2ZW50Lmpzb25cIixcclxuXHRcdFx0dXJsOlwiL2V2bnQvZXZudC9cIitfZGF0YS5wb3N0YWxDb2RlLFxyXG5cdFx0XHRkYXRhVHlwZTogXCJqc29uXCIsXHJcblx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnc3VjY2VzcyBsb2FkIGRhdGEnKTtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0XHRfZGF0YS5ldm50cz1kYXRhO1xyXG5cdFx0XHRcdCQoJ1tkYXRhLXBvLWlkPScgKyBfZGF0YS5wb3N0YWxDb2RlICsgJ10nKS5maW5kKCdpLmZhLXNwaW5uZXInKS5yZW1vdmUoKTtcclxuXHRcdFx0XHQkKCdbZGF0YS1wby1pZD0nICsgX2RhdGEucG9zdGFsQ29kZSArICddJykuYXBwZW5kKHNlbGYubmVzdGVkTGlzdEphZGUoe1xyXG5cdFx0XHRcdFx0XHRcImRhdGFcIjogZGF0YVxyXG5cdFx0XHRcdH0pKTtcclxuXHRcdFx0XHQkKCdbZGF0YS1wby1pZD0nICsgX2RhdGEucG9zdGFsQ29kZSArICddJykub24oJ2NsaWNrJywgc2VsZi5saXN0ZW5Fdm50KTtcclxuXHRcdFx0XHQvKnJhcnIgPSBkYXRhLmZpbHRlcihmdW5jdGlvbihldm50KSB7XHJcblx0XHRcdFx0XHRpZiAoZXZudC5wb3N0YWxDb2RlID09IF9kYXRhLnBvc3RhbENvZGUpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0X2RhdGEuZXZudHMgPSByYXJyO1xyXG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhyYXJyKTtcclxuXHRcdFx0XHRcdCQoJ1tkYXRhLXBvLWlkPScgKyBfZGF0YS5wb3N0YWxDb2RlICsgJ10nKS5maW5kKCdpLmZhLXNwaW5uZXInKS5yZW1vdmUoKTtcclxuXHRcdFx0XHRcdCQoJ1tkYXRhLXBvLWlkPScgKyBfZGF0YS5wb3N0YWxDb2RlICsgJ10nKS5hcHBlbmQoc2VsZi5uZXN0ZWRMaXN0SmFkZSh7XHJcblx0XHRcdFx0XHRcdFwiZGF0YVwiOiByYXJyXHJcblx0XHRcdFx0XHR9KSk7XHJcblx0XHRcdFx0XHQvLyQoJy5ldm50LWxpJykuY2hpbGRyZW4oJy5zaG93LWV2bnQtZGV0YWlsJykub24oJ2NsaWNrJyxzZWxmLnNob3dFdm50RGV0YWlsKTtcclxuXHRcdFx0XHRcdC8vJCgnLmV2bnQtbGknKS5jaGlsZHJlbignLnJlbW92ZS1ldm50LWxpc3QnKS5vbignY2xpY2snLHNlbGYucmVtb3ZlRXZudCk7XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0Ly8kKCdbZGF0YS1wby1pZD0nKyBfZGF0YS5wb3N0YWxDb2RlKyddJykub24oJ2NsaWNrJyxzZWxmLnNob3dFdm50RGV0YWlsKTtcclxuXHRcdFx0XHRcdCQoJ1tkYXRhLXBvLWlkPScgKyBfZGF0YS5wb3N0YWxDb2RlICsgJ10nKS5vbignY2xpY2snLCBzZWxmLmxpc3RlbkV2bnQpO1xyXG5cdFx0XHRcdH0sIC8qTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMDApKi8gLyoxMCk7Ki9cclxuXHRcdFx0fSxcclxuXHRcdFx0ZXJyb3I6IGZ1bmN0aW9uKGVycikge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCfQvtGI0LjQsdC60LAgKCcpO1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGVycik7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHJcblx0fTtcclxuXHR0aGlzLmxpc3RlbkV2bnQgPSBmdW5jdGlvbihlKSB7XHJcblx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdHZhciB0eXBlID0gdHJ1ZTsgLy9kZWxldGVcclxuXHRcdGlmICgkKGUudGFyZ2V0KS5wYXJlbnQoKS5oYXNDbGFzcygnc2hvdy1ldm50LWRldGFpbCcpKVxyXG5cdFx0XHR0eXBlID0gZmFsc2U7IC8vJ3Nob3ctZGV0YWlsJztcclxuXHJcblx0XHR2YXIgb3AgPSAkKGUuY3VycmVudFRhcmdldCkuYXR0cignZGF0YS1wby1pZCcpO1xyXG5cdFx0dmFyIGV2bnRJZCA9ICQoZS50YXJnZXQpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2RhdGEtZXZudC1pZCcpO1xyXG5cdFx0Ly9jb25zb2xlLmxvZygkKGUudGFyZ2V0KS5wYXJlbnQoKS5oYXNDbGFzcygnc2hvdy1ldm50LWRldGFpbCcpKTtcclxuXHJcblxyXG5cdFx0Zm9yICh2YXIgaSA9IHNlbGYuc2VsZWN0ZWRFTC5sZW5ndGg7IGktLTspIHtcclxuXHRcdFx0aWYgKHNlbGYuc2VsZWN0ZWRFTFtpXS5wb3N0YWxDb2RlID09IG9wKSB7XHJcblx0XHRcdFx0Zm9yICh2YXIgaiA9IHNlbGYuc2VsZWN0ZWRFTFtpXS5ldm50cy5sZW5ndGg7IGotLTspIHtcclxuXHRcdFx0XHRcdGlmIChzZWxmLnNlbGVjdGVkRUxbaV0uZXZudHNbal0uX2lkID09IGV2bnRJZCkge1xyXG5cdFx0XHRcdFx0XHRpZiAodHlwZSkge1xyXG5cdFx0XHRcdFx0XHRcdHNlbGYuc2VsZWN0ZWRFTFtpXS5ldm50cy5zcGxpY2UoaiwgMSk7XHJcblx0XHRcdFx0XHRcdFx0JChlLnRhcmdldCkucGFyZW50KCkucGFyZW50KCkucmVtb3ZlKCk7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0dmFyIF9ldmVudCA9IHNlbGYuc2VsZWN0ZWRFTFtpXS5ldm50c1tqXTtcclxuXHRcdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdFx0XHQkKCcubW9kYWwtcGxhY2UnKS5odG1sKHNlbGYuZXZudERldGFpbEphZGUoKSk7XHJcblx0XHRcdFx0XHRcdFx0LyokKFwiLmZsYXRwaWNrclwiKS5mbGF0cGlja3Ioe1xyXG5cdFx0XHRcdFx0XHRcdFx0ZW5hYmxlVGltZTogdHJ1ZSxcclxuXHRcdFx0XHRcdFx0XHR9KTsqL1xyXG5cclxuXHRcdFx0XHRcdFx0XHQkKCcjbW9kYWwnKS5tb2RhbCgnc2hvdycpO1xyXG5cdFx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHRcdCQoXCIjZGF0ZWJlZ2luXCIpLmZsYXRwaWNrcih7XHJcblx0XHRcdFx0XHRcdFx0dXRjOiB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcdGRlZmF1bHREYXRlOiBtb21lbnQoX2V2ZW50LnN0YXJ0KS5mb3JtYXQoJ1lZWVktTU0tREQgaGg6bW0nKSxcclxuXHRcdFx0XHRcdFx0XHRlbmFibGVUaW1lOiB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRcdCQoXCIjZGF0ZWVuZFwiKS5mbGF0cGlja3Ioe1xyXG5cdFx0XHRcdFx0XHRcdHV0YzogdHJ1ZSxcclxuXHRcdFx0XHRcdFx0XHRkZWZhdWx0RGF0ZTogbW9tZW50KF9ldmVudC5lbmQpLmZvcm1hdCgnWVlZWS1NTS1ERCBoaDptbScpLFxyXG5cdFx0XHRcdFx0XHRcdGVuYWJsZVRpbWU6IHRydWUsXHJcblx0XHRcdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0XHQvL1x0JCgnI2RhdGViZWdpbicpLnZhbChtb21lbnQoX2V2ZW50LnN0YXJ0KS5mb3JtYXQoJ1lZWVktTU0tREQgaGg6bW0nKSk7XHJcblx0XHRcdFx0XHRcdC8vXHQkKCcjZGF0ZWVuZCcpLnZhbChtb21lbnQoX2V2ZW50LmVuZCkuZm9ybWF0KCdZWVlZLU1NLUREIGhoOm1tJykpO1xyXG5cdFx0XHRcdFx0XHRcdCQoJyNldmVudC10aXRsZScpLnZhbChfZXZlbnQudGl0bGUpO1xyXG5cdFx0XHRcdFx0XHRcdCQoJyNwb3N0Y29kZScpLnZhbChfZXZlbnQucG9zdGFsQ29kZSk7XHJcblx0XHRcdFx0XHRcdFx0JCgnI3N0YXR1cycpLnZhbChfZXZlbnQuc3RhdHVzKTtcclxuXHRcdFx0XHRcdFx0XHQkKFwiI2Rlc2NyaXB0aW9uXCIpLnZhbChfZXZlbnQuZGVzY3JpcHRpb24pO1xyXG5cdFx0XHRcdFx0XHRcdCQoJyNleGVjdXRvcicpLnZhbChfZXZlbnQuZXhlY3V0b3IpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHQkKCcjbW9kYWwnKS5vbignaGlkZGVuLmJzLm1vZGFsJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ21vZGFsIGhpZGUnKTtcclxuXHRcdFx0XHRcdFx0XHRcdHNlbGYuZGVzdHJveU1vZGFsKCk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdH07XHJcblx0dGhpcy5kZXN0cm95TW9kYWwgPSBmdW5jdGlvbigpIHtcclxuXHJcblx0XHQvLyQoXCIjc2F2ZS1ldmVudC1idG5cIikub2ZmKCdjbGljaycpO1xyXG5cdFx0JCgnI2Nsb3NlLW1vZGFsLWJ0bicpLm9mZignY2xpY2snKTtcclxuXHRcdCQoJyNjbG9zZS1tb2RhbC1jcm9zcy1idG4nKS5vZmYoJ2NsaWNrJyk7XHJcblx0XHQvLyQoJyNkZWxldGUtZXZlbnQtYnRuJykub2ZmKCk7XHJcblx0XHQkKCcubW9kYWwtcGxhY2UnKS5odG1sKCcnKTtcclxuXHR9O1xyXG5cclxuXHR0aGlzLnJlbW92ZUVsZW1lbnQgPSBmdW5jdGlvbihlKSB7XHJcblx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0Zm9yICh2YXIgaSA9IHNlbGYuc2VsZWN0ZWRFTC5sZW5ndGg7IGktLTspIHtcclxuXHRcdFx0aWYgKHNlbGYuc2VsZWN0ZWRFTFtpXS5wb3N0YWxDb2RlID09IGUuZGF0YS5lbGVtZW50LnBvc3RhbENvZGUpIHtcclxuXHRcdFx0XHQkKGUuY3VycmVudFRhcmdldCkub2ZmKCk7XHJcblx0XHRcdFx0JChlLmN1cnJlbnRUYXJnZXQpLnBhcmVudCgpLnJlbW92ZSgpO1xyXG5cdFx0XHRcdC8vJCgnW2RhdGEtZXZudC1pZD0nK2UuZGF0YS5lbGVtZW50LnBvc3RhbENvZGUrJ10nKS5vZmYoKTtcclxuXHRcdFx0XHQvLyQoJ1tkYXRhLWV2bnQtaWQ9JytlLmRhdGEuZWxlbWVudC5wb3N0YWxDb2RlKyddJykucmVtb3ZlKCk7XHJcblx0XHRcdFx0c2VsZi5zZWxlY3RlZEVMLnNwbGljZShpLCAxKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHR9O1xyXG5cdHRoaXMucmVtb3ZlQWxsID0gZnVuY3Rpb24oZSkge1xyXG5cdFx0Ly9lLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0JCgnI3BhdGgtbGlzdCcpLmh0bWwoJycpO1xyXG5cdFx0c2VsZi5zZWxlY3RlZEVMID0gW107XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fTtcclxuXHJcblx0dGhpcy5jcmVhdGVQYXRoID0gZnVuY3Rpb24oKSB7XHJcblx0XHRzZWxmLnltYXBDZWF0ZVBhdGgoc2VsZi5zZWxlY3RlZEVMKTtcclxuXHR9O1xyXG5cclxuXHR0aGlzLnBkZlBhdGggPSBmdW5jdGlvbigpIHtcclxuXHRcdHZhciBkb2NEZWZpbml0aW9uID0gc2VsZi5jcmVhdGVDb250ZW50KCk7XHJcblx0XHQvL3ZhciBkb2NEZWZpbml0aW9uID0gc2VsZi5wZGZKYWRlKHtcImRhdGFcIjpzZWxmLnNlbGVjdGVkRUx9KTtcclxuXHRcdHBkZk1ha2UuY3JlYXRlUGRmKGRvY0RlZmluaXRpb24pLm9wZW4oKTtcclxuXHR9O1xyXG5cclxuXHR0aGlzLmNyZWF0ZUNvbnRlbnQgPSBmdW5jdGlvbigpIHtcclxuXHRcdHZhciB1bGFyciA9IFtdO1xyXG5cdFx0c2VsZi5zZWxlY3RlZEVMLmZvckVhY2goZnVuY3Rpb24ocG8pIHtcclxuXHRcdFx0dWxhcnIucHVzaCh7XHJcblx0XHRcdFx0dGV4dDogcG8ucG9zdGFsQ29kZVxyXG5cdFx0XHR9KVxyXG5cdFx0XHRpZiAocG8uZXZudHMubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdHZhciBzdWxhcnIgPSBbXTtcclxuXHRcdFx0XHRwby5ldm50cy5mb3JFYWNoKGZ1bmN0aW9uKGV2bikge1xyXG5cdFx0XHRcdFx0c3VsYXJyLnB1c2goe1xyXG5cdFx0XHRcdFx0XHR0ZXh0OiBldm4udGl0bGVcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdHVsYXJyLnB1c2goe1xyXG5cdFx0XHRcdFx0dWw6IHN1bGFyclxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdHZhciBjb2JqID0ge1xyXG5cdFx0XHRjb250ZW50OiBbe1xyXG5cdFx0XHRcdHRleHQ6ICfQm9C40YHRgi3RgdC/0LjRgdC+0Log0LfQsNGP0LLQvtC6INC6INC40YHQv9C+0LvQvdC10L3QuNGOICjRhNC+0YDQvNCwIOKEljHQu9GBKScsXHJcblx0XHRcdFx0c3R5bGU6ICdoZWFkZXInXHJcblx0XHRcdH0sIHtcclxuXHRcdFx0XHR1bDogdWxhcnIsXHJcblx0XHRcdFx0c3R5bGU6ICdsaXN0cydcclxuXHRcdFx0fV0sXHJcblx0XHRcdHN0eWxlczoge1xyXG5cdFx0XHRcdGhlYWRlcjoge1xyXG5cdFx0XHRcdFx0Zm9udFNpemU6IDE2LFxyXG5cdFx0XHRcdFx0Ym9sZDogdHJ1ZVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0bGlzdHM6IHtcclxuXHRcdFx0XHRcdHBhZGRpbmc6IFwiMTVweFwiLFxyXG5cdFx0XHRcdFx0Zm9udFNpemU6IDE0XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdFx0cmV0dXJuIGNvYmo7XHJcblx0fTtcclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2pzL2Rldi9wbS9tb2R1bGUvcGF0aExpc3QuanNcbi8vIG1vZHVsZSBpZCA9IDEzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDIgMyIsInZhciBqYWRlID0gcmVxdWlyZShcIkM6XFxcXF90ZW1wXFxcXHBjaHRcXFxcbm9kZV9tb2R1bGVzXFxcXGphZGVcXFxcbGliXFxcXHJ1bnRpbWUuanNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uICh1bmRlZmluZWQsIHVzZXJzKSB7XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcImNhcmRcXFwiPjxkaXYgY2xhc3M9XFxcImNhcmQtaGVhZGVyXFxcIj48dWwgY2xhc3M9XFxcIm5hdiBuYXYtcGlsbHMgY2FyZC1oZWFkZXItcGlsbHMgZmxvYXQteHMtbGVmdFxcXCI+PGxpIGNsYXNzPVxcXCJuYXYtaXRlbVxcXCI+PGEgaWQ9XFxcImNsZWFyLXBsaXN0LWJ0blxcXCIgaHJlZj1cXFwiI1xcXCIgY2xhc3M9XFxcIm5hdi1saW5rXFxcIj7QntGH0LjRgdGC0LjRgtGMPC9hPjwvbGk+PC91bD48L2Rpdj48ZGl2IGNsYXNzPVxcXCJjYXJkLWJsb2NrXFxcIj48aDQgY2xhc3M9XFxcImNhcmQtdGl0bGVcXFwiPiA8L2g0PjxkaXYgY2xhc3M9XFxcImNhcmQtdGV4dFxcXCI+PGg0PtCh0L/QuNGB0L7QulxcdDx1bCBpZD1cXFwicGF0aC1saXN0XFxcIiBjbGFzcz1cXFwibGlzdC1ncm91cFxcXCI+PC91bD48L2g0PjwvZGl2PjwhLS1pbnB1dCNleGVjZW1haWwuZm9ybS1jb250cm9sKHR5cGU9J2VtYWlsJyktLT48YSBpZD1cXFwiY3JlYXRlLXBhdGgtYnRuXFxcIiBocmVmPVxcXCIjXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1wcmltYXJ5XFxcIj7RgdC+0LfQtNCw0YLRjCDQvNCw0YDRiNGA0YPRgjwvYT48L2Rpdj48ZGl2IGNsYXNzPVxcXCJjYXJkLWZvb3RlciB0ZXh0LW11dGVkXFxcIj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj48bGFiZWwgZm9yPVxcXCJ1c2Vycy1saXN0XFxcIj7QmNGB0L/QvtC70L3QuNGC0LXQu9GMPC9sYWJlbD48c2VsZWN0IGlkPVxcXCJ1c2Vycy1saXN0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIj5cIik7XG4vLyBpdGVyYXRlIHVzZXJzXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IHVzZXJzO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIgdXNlciA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPG9wdGlvblwiICsgKGphZGUuYXR0cihcInZhbHVlXCIsIFwiXCIgKyAodXNlci5faWQpICsgXCJcIiwgdHJ1ZSwgdHJ1ZSkpICsgXCI+XCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gdXNlci5maW8pID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIjwvb3B0aW9uPlwiKTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciB1c2VyID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8b3B0aW9uXCIgKyAoamFkZS5hdHRyKFwidmFsdWVcIiwgXCJcIiArICh1c2VyLl9pZCkgKyBcIlwiLCB0cnVlLCB0cnVlKSkgKyBcIj5cIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSB1c2VyLmZpbykgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiPC9vcHRpb24+XCIpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG5idWYucHVzaChcIjwvc2VsZWN0PjwvZGl2PjxhIGlkPVxcXCJwcmludC1wYXRoLWJ0blxcXCIgaHJlZj1cXFwiI1xcXCIgY2xhc3M9XFxcImJ0biBidG4tcHJpbWFyeVxcXCI+0L/QtdGH0LDRgtCw0YLRjDwvYT48YSBpZD1cXFwiYXNzaW5nLXVzZXItYnRuXFxcIiBocmVmPVxcXCIjXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1kZWZhdWx0XFxcIj7QvdCw0LfQvdCw0YfQuNGC0Ywg0LjRgdC/0L7Qu9C90LjRgtC10LvRjzwvYT48L2Rpdj48L2Rpdj5cIik7fS5jYWxsKHRoaXMsXCJ1bmRlZmluZWRcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnVuZGVmaW5lZDp0eXBlb2YgdW5kZWZpbmVkIT09XCJ1bmRlZmluZWRcIj91bmRlZmluZWQ6dW5kZWZpbmVkLFwidXNlcnNcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnVzZXJzOnR5cGVvZiB1c2VycyE9PVwidW5kZWZpbmVkXCI/dXNlcnM6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy9qcy9kZXYvcG0vdmlldy9wYXRoTGlzdC5qYWRlXG4vLyBtb2R1bGUgaWQgPSAxMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAyIDMiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJDOlxcXFxfdGVtcFxcXFxwY2h0XFxcXG5vZGVfbW9kdWxlc1xcXFxqYWRlXFxcXGxpYlxcXFxydW50aW1lLmpzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAoZGF0YSkge1xuYnVmLnB1c2goXCI8bGlcIiArIChqYWRlLmF0dHIoXCJkYXRhLXBvLWlkXCIsICcnICsgKGRhdGEucG9zdGFsQ29kZSkgKyAnJywgdHJ1ZSwgdHJ1ZSkpICsgXCIgY2xhc3M9XFxcImxpc3QtZ3JvdXAtaXRlbSBsaXN0LWdyb3VwLWl0ZW0tYWN0aW9uXFxcIj5cIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBkYXRhLnBvc3RhbENvZGUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIjxhIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJyZW1vdmUtcG8tbGlzdFxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLXRyYXNoLW8gZmEtZndcXFwiPjwvaT48L2E+PGkgc3R5bGU9XFxcImZsb2F0OmxlZnRcXFwiIGNsYXNzPVxcXCJmYSBmYS1zcGlubmVyIGZhLXB1bHNlIGZhLWZ3XFxcIj48L2k+PC9saT5cIik7fS5jYWxsKHRoaXMsXCJkYXRhXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5kYXRhOnR5cGVvZiBkYXRhIT09XCJ1bmRlZmluZWRcIj9kYXRhOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvanMvZGV2L3BtL3ZpZXcvbGlzdEVsLmphZGVcbi8vIG1vZHVsZSBpZCA9IDEzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDIgMyIsInZhciBqYWRlID0gcmVxdWlyZShcIkM6XFxcXF90ZW1wXFxcXHBjaHRcXFxcbm9kZV9tb2R1bGVzXFxcXGphZGVcXFxcbGliXFxcXHJ1bnRpbWUuanNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChkYXRhLCB1bmRlZmluZWQpIHtcbmJ1Zi5wdXNoKFwiPHVsPlwiKTtcbi8vIGl0ZXJhdGUgZGF0YVxuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSBkYXRhO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIgZXZudCA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGxpXCIgKyAoamFkZS5hdHRyKFwiZGF0YS1ldm50LWlkXCIsICcnICsgKGV2bnQuX2lkKSArICcnLCB0cnVlLCB0cnVlKSkgKyBcIiBjbGFzcz1cXFwiZXZudC1saVxcXCI+XCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gZXZudC50aXRsZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiPGEgaHJlZj1cXFwiI1xcXCIgY2xhc3M9XFxcInNob3ctZXZudC1kZXRhaWxcXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1zZWFyY2ggZmEtZndcXFwiPjwvaT48L2E+PGEgaHJlZj1cXFwiI1xcXCIgY2xhc3M9XFxcInJlbW92ZS1ldm50LWxpc3RcXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS10cmFzaC1vIGZhLWZ3XFxcIj48L2k+PC9hPjwvbGk+XCIpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIGV2bnQgPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIjxsaVwiICsgKGphZGUuYXR0cihcImRhdGEtZXZudC1pZFwiLCAnJyArIChldm50Ll9pZCkgKyAnJywgdHJ1ZSwgdHJ1ZSkpICsgXCIgY2xhc3M9XFxcImV2bnQtbGlcXFwiPlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IGV2bnQudGl0bGUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIjxhIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJzaG93LWV2bnQtZGV0YWlsXFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtc2VhcmNoIGZhLWZ3XFxcIj48L2k+PC9hPjxhIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJyZW1vdmUtZXZudC1saXN0XFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtdHJhc2gtbyBmYS1md1xcXCI+PC9pPjwvYT48L2xpPlwiKTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxuYnVmLnB1c2goXCI8L3VsPlwiKTt9LmNhbGwodGhpcyxcImRhdGFcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmRhdGE6dHlwZW9mIGRhdGEhPT1cInVuZGVmaW5lZFwiP2RhdGE6dW5kZWZpbmVkLFwidW5kZWZpbmVkXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC51bmRlZmluZWQ6dHlwZW9mIHVuZGVmaW5lZCE9PVwidW5kZWZpbmVkXCI/dW5kZWZpbmVkOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvanMvZGV2L3BtL3ZpZXcvc3VibGlzdC5qYWRlXG4vLyBtb2R1bGUgaWQgPSAxMzRcbi8vIG1vZHVsZSBjaHVua3MgPSAyIDMiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJDOlxcXFxfdGVtcFxcXFxwY2h0XFxcXG5vZGVfbW9kdWxlc1xcXFxqYWRlXFxcXGxpYlxcXFxydW50aW1lLmpzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAoZGF0YSwgdW5kZWZpbmVkKSB7XG4vLyBpdGVyYXRlIGRhdGFcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gZGF0YTtcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIHBvID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCJcIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBwby5wb3N0YWxDb2RlKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCIgXFxcXGJyXCIpO1xuaWYgKHBvLmV2bnRzLmxlbmd0aD4wKVxue1xuLy8gaXRlcmF0ZSBwby5ldm50c1xuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSBwby5ldm50cztcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGV2bnQgPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IGV2bnQudGl0bGUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIiBcXFxcYnJcIik7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIgZXZudCA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiXCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gZXZudC50aXRsZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiIFxcXFxiclwiKTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxufVxuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIHBvID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCJcIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBwby5wb3N0YWxDb2RlKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCIgXFxcXGJyXCIpO1xuaWYgKHBvLmV2bnRzLmxlbmd0aD4wKVxue1xuLy8gaXRlcmF0ZSBwby5ldm50c1xuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSBwby5ldm50cztcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGV2bnQgPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IGV2bnQudGl0bGUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIiBcXFxcYnJcIik7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIgZXZudCA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiXCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gZXZudC50aXRsZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiIFxcXFxiclwiKTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxufVxuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xufS5jYWxsKHRoaXMsXCJkYXRhXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5kYXRhOnR5cGVvZiBkYXRhIT09XCJ1bmRlZmluZWRcIj9kYXRhOnVuZGVmaW5lZCxcInVuZGVmaW5lZFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgudW5kZWZpbmVkOnR5cGVvZiB1bmRlZmluZWQhPT1cInVuZGVmaW5lZFwiP3VuZGVmaW5lZDp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2pzL2Rldi9wbS92aWV3L3BkZlBhdGhMaXN0LmphZGVcbi8vIG1vZHVsZSBpZCA9IDEzNVxuLy8gbW9kdWxlIGNodW5rcyA9IDIgMyIsInZhciBqYWRlID0gcmVxdWlyZShcIkM6XFxcXF90ZW1wXFxcXHBjaHRcXFxcbm9kZV9tb2R1bGVzXFxcXGphZGVcXFxcbGliXFxcXHJ1bnRpbWUuanNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8ZGl2IGlkPVxcXCJtb2RhbFxcXCIgdGFiaW5kZXg9XFxcIi0xXFxcIiByb2xlPVxcXCJkaWFsb2dcXFwiIGFyaWEtbGFiZWxsZWRieT1cXFwibXlNb2RhbExhYmVsXFxcIiBhcmlhLWhpZGRlbj1cXFwidHJ1ZVxcXCIgY2xhc3M9XFxcIm1vZGFsIGZhZGVcXFwiPjxkaXYgcm9sZT1cXFwiZG9jdW1lbnRcXFwiIGNsYXNzPVxcXCJtb2RhbC1kaWFsb2dcXFwiPjxkaXYgY2xhc3M9XFxcIm1vZGFsLWNvbnRlbnRcXFwiPjxkaXYgY2xhc3M9XFxcIm1vZGFsLWhlYWRlclxcXCI+PGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGRhdGEtZGlzbWlzcz1cXFwibW9kYWxcXFwiIGFyaWEtbGFiZWw9XFxcIkNsb3NlXFxcIiBjbGFzcz1cXFwiY2xvc2VcXFwiPjxzcGFuIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIj7Dlzwvc3Bhbj48L2J1dHRvbj48aDQgaWQ9XFxcIm15TW9kYWxMYWJlbFxcXCIgY2xhc3M9XFxcIm1vZGFsLXRpdGxlXFxcIj7QoNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNC1L9GD0LTQsNC70LXQvdC40LU8L2g0PjwvZGl2PjxkaXYgY2xhc3M9XFxcIm1vZGFsLWJvZHlcXFwiPjxmb3JtIGFjdGlvbj1cXFwiXFxcIj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj48bGFiZWwgZm9yPVxcXCJcXFwiPtC30LDQs9C+0LvQvtCy0L7QujwvbGFiZWw+PGlucHV0IGlkPVxcXCJldmVudC10aXRsZVxcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7QvdCw0YfQsNC70L48L2xhYmVsPjxpbnB1dCBpZD1cXFwiZGF0ZWJlZ2luXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sIGZsYXRwaWNrclxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7QvtC60L7QvdGH0LDQvdC40LU8L2xhYmVsPjxpbnB1dCBpZD1cXFwiZGF0ZWVuZFxcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbCBmbGF0cGlja3JcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0L7RgtC00LXQu9C10L3QuNC1INC/0L7Qu9GD0YfQsNGC0LXQu9GMPC9sYWJlbD48aW5wdXQgaWQ9XFxcInBvc3Rjb2RlXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj48bGFiZWwgZm9yPVxcXCJcXFwiPtC+0L/QuNGB0LDQvdC40LU8L2xhYmVsPjxpbnB1dCBpZD1cXFwiZGVzY3JpcHRpb25cXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0YHRgtCw0YLRg9GBPC9sYWJlbD48aW5wdXQgaWQ9XFxcInN0YXR1c1xcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7QuNGB0L/QvtC70L3QuNGC0LXQu9GMPC9sYWJlbD48aW5wdXQgaWQ9XFxcImV4ZWN1dG9yXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIj48L2Rpdj48L2Zvcm0+PC9kaXY+PGRpdiBjbGFzcz1cXFwibW9kYWwtZm9vdGVyXFxcIj48YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgZGF0YS1kaXNtaXNzPVxcXCJtb2RhbFxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj5DbG9zZTwvYnV0dG9uPjwhLS1idXR0b24jc2F2ZS1ldmVudC1idG4uYnRuLmJ0bi1wcmltYXJ5KHR5cGU9J2J1dHRvbicpIFNhdmUgY2hhbmdlcy0tPjwhLS1idXR0b24jZGVsZXRlLWV2ZW50LWJ0bi5idG4uYnRuLWRhbmdlcih0eXBlPSdidXR0b24nKSBEZWxldGUtLT48L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy9qcy9kZXYvcG0vdmlldy9lZGl0ZGVsRXZlbnQuamFkZVxuLy8gbW9kdWxlIGlkID0gMTM2XG4vLyBtb2R1bGUgY2h1bmtzID0gMiAzIiwidmFyIGphZGUgPSByZXF1aXJlKFwiQzpcXFxcX3RlbXBcXFxccGNodFxcXFxub2RlX21vZHVsZXNcXFxcamFkZVxcXFxsaWJcXFxccnVudGltZS5qc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKHVuZGVmaW5lZCwgdXNlcnMpIHtcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwiY2FyZFxcXCI+PGRpdiBjbGFzcz1cXFwiY2FyZC1oZWFkZXJcXFwiPjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcInVzZXJzLWxpc3RcXFwiPtCY0YHQv9C+0LvQvdC40YLQtdC70Yw8L2xhYmVsPjxzZWxlY3QgaWQ9XFxcInVzZXJzLWxpc3RcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiPlwiKTtcbi8vIGl0ZXJhdGUgdXNlcnNcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gdXNlcnM7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciB1c2VyID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8b3B0aW9uXCIgKyAoamFkZS5hdHRyKFwidmFsdWVcIiwgXCJcIiArICh1c2VyLl9pZCkgKyBcIlwiLCB0cnVlLCB0cnVlKSkgKyBcIj5cIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSB1c2VyLmZpbykgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiPC9vcHRpb24+XCIpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIHVzZXIgPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIjxvcHRpb25cIiArIChqYWRlLmF0dHIoXCJ2YWx1ZVwiLCBcIlwiICsgKHVzZXIuX2lkKSArIFwiXCIsIHRydWUsIHRydWUpKSArIFwiPlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IHVzZXIuZmlvKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCI8L29wdGlvbj5cIik7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbmJ1Zi5wdXNoKFwiPC9zZWxlY3Q+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cXFwiY2FyZC1ibG9ja1xcXCI+PGg0IGNsYXNzPVxcXCJjYXJkLXRpdGxlXFxcIj4gPC9oND48ZGl2IGNsYXNzPVxcXCJjYXJkLXRleHRcXFwiPjxoND7QodC/0LjRgdC60LggXFx0PGRpdiBpZD1cXFwibGlzdHMtbGlzdFxcXCI+PC9kaXY+PC9oND48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJjYXJkLWZvb3RlciB0ZXh0LW11dGVkXFxcIj48L2Rpdj48L2Rpdj5cIik7fS5jYWxsKHRoaXMsXCJ1bmRlZmluZWRcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnVuZGVmaW5lZDp0eXBlb2YgdW5kZWZpbmVkIT09XCJ1bmRlZmluZWRcIj91bmRlZmluZWQ6dW5kZWZpbmVkLFwidXNlcnNcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnVzZXJzOnR5cGVvZiB1c2VycyE9PVwidW5kZWZpbmVkXCI/dXNlcnM6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy9qcy9kZXYvcG0vdmlldy9saXN0cy5qYWRlXG4vLyBtb2R1bGUgaWQgPSAxMzdcbi8vIG1vZHVsZSBjaHVua3MgPSAyIDMiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJDOlxcXFxfdGVtcFxcXFxwY2h0XFxcXG5vZGVfbW9kdWxlc1xcXFxqYWRlXFxcXGxpYlxcXFxydW50aW1lLmpzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAoZGF0YSwgdW5kZWZpbmVkKSB7XG5idWYucHVzaChcIjx1bCBjbGFzcz1cXFwibGlzdC1ncm91cFxcXCI+XCIpO1xuLy8gaXRlcmF0ZSBkYXRhXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IGRhdGE7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBsID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8bGlcIiArIChqYWRlLmF0dHIoXCJkYXRhLWxpc3QtaWRcIiwgJycgKyAobC5faWQpICsgJycsIHRydWUsIHRydWUpKSArIFwiIGNsYXNzPVxcXCJsaXN0cy1saSBsaXN0LWdyb3VwLWl0ZW0gbGlzdC1ncm91cC1pdGVtLWFjdGlvblxcXCI+XCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gbC5faWQpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIlxcdFxcdDwvbGk+XCIpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIGwgPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIjxsaVwiICsgKGphZGUuYXR0cihcImRhdGEtbGlzdC1pZFwiLCAnJyArIChsLl9pZCkgKyAnJywgdHJ1ZSwgdHJ1ZSkpICsgXCIgY2xhc3M9XFxcImxpc3RzLWxpIGxpc3QtZ3JvdXAtaXRlbSBsaXN0LWdyb3VwLWl0ZW0tYWN0aW9uXFxcIj5cIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBsLl9pZCkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiXFx0XFx0PC9saT5cIik7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbmJ1Zi5wdXNoKFwiPC91bD5cIik7fS5jYWxsKHRoaXMsXCJkYXRhXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5kYXRhOnR5cGVvZiBkYXRhIT09XCJ1bmRlZmluZWRcIj9kYXRhOnVuZGVmaW5lZCxcInVuZGVmaW5lZFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgudW5kZWZpbmVkOnR5cGVvZiB1bmRlZmluZWQhPT1cInVuZGVmaW5lZFwiP3VuZGVmaW5lZDp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2pzL2Rldi9wbS92aWV3L3VsTGlzdHMuamFkZVxuLy8gbW9kdWxlIGlkID0gMTM4XG4vLyBtb2R1bGUgY2h1bmtzID0gMiAzIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHJcblx0dGhpcy5fbW9kYWwgPSByZXF1aXJlKCcuLi92aWV3L25ld0V2ZW50LmphZGUnKTtcclxuXHJcblx0dGhpcy5kZXN0cm95TW9kYWwgPSBmdW5jdGlvbigpIHtcclxuXHJcblx0XHQkKFwiI3NhdmUtZXZlbnQtYnRuXCIpLm9mZignY2xpY2snKTtcclxuXHRcdCQoJyNjbG9zZS1tb2RhbC1idG4nKS5vZmYoJ2NsaWNrJyk7XHJcblx0XHQkKCcjY2xvc2UtbW9kYWwtY3Jvc3MtYnRuJykub2ZmKCdjbGljaycpO1xyXG5cdFx0JCgnLm1vZGFsLXBsYWNlJykuaHRtbCgnJyk7XHJcblx0fTtcclxuXHJcblx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuXHR0aGlzLmluaXQgPSBmdW5jdGlvbigpIHtcclxuXHJcblx0XHQkKCcubW9kYWwtcGxhY2UnKS5odG1sKHRoaXMuX21vZGFsKCkpO1xyXG5cdFx0JChcIi5mbGF0cGlja3JcIikuZmxhdHBpY2tyKHtcclxuXHRcdFx0ZW5hYmxlVGltZTogdHJ1ZSxcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoXCIjc2F2ZS1ldmVudC1idG5cIikub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuXHRcdFx0dmFyIG11bHRpID0gJCgnI3Bvc3Rjb2RlJykudmFsKCkuc3BsaXQoXCI7XCIpO1xyXG5cdFx0XHRpZiAobXVsdGkubGVuZ3RoID4gMSkge1xyXG5cdFx0XHRcdHZhciBldm50cyA9IFtdO1xyXG5cdFx0XHRcdG11bHRpLmZvckVhY2goZnVuY3Rpb24ocG9Db2RlKSB7XHJcblx0XHRcdFx0XHR2YXIgZXZudCA9IHtcclxuXHRcdFx0XHRcdFx0dGl0bGU6ICQoJyNldmVudC10aXRsZScpLnZhbCgpLFxyXG5cdFx0XHRcdFx0XHRzdGFydDogbW9tZW50KCQoJyNkYXRlYmVnaW4nKS52YWwoKSksXHJcblx0XHRcdFx0XHRcdGVuZDogbW9tZW50KCQoJyNkYXRlZW5kJykudmFsKCkpLFxyXG5cdFx0XHRcdFx0XHRwb3N0YWxDb2RlOiBwb0NvZGUsXHJcblx0XHRcdFx0XHRcdHN0YXR1czogJCgnI3N0YXR1cycpLnZhbCgpLFxyXG5cdFx0XHRcdFx0XHRkZXNjcmlwdGlvbjogJChcIiNkZXNjcmlwdGlvblwiKS52YWwoKSxcclxuXHRcdFx0XHRcdFx0ZXhlY3V0b3I6ICQoJyNleGVjdXRvcicpLnZhbCgpXHJcblx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRldm50cy5wdXNoKGV2bnQpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdCQuYWpheCh7XHJcblx0XHRcdFx0XHR0eXBlOiAnUE9TVCcsXHJcblx0XHRcdFx0XHR1cmw6ICcvZXZudC9zYXZlL211bHRpJyxcclxuXHRcdFx0XHRcdGRhdGE6IEpTT04uc3RyaW5naWZ5KGV2bnRzKSxcclxuXHRcdFx0XHRcdGRhdGFUeXBlOiBcImpzb25cIixcclxuXHRcdFx0XHRcdGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coXCJkYXRhIHNhdmVcIik7XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0Ly9lcnJvcjogYWpheEVycm9yXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0dmFyIGV2bnQgPSB7XHJcblx0XHRcdFx0XHR0aXRsZTogJCgnI2V2ZW50LXRpdGxlJykudmFsKCksXHJcblx0XHRcdFx0XHRzdGFydDogbW9tZW50KCQoJyNkYXRlYmVnaW4nKS52YWwoKSksXHJcblx0XHRcdFx0XHRlbmQ6IG1vbWVudCgkKCcjZGF0ZWVuZCcpLnZhbCgpKSxcclxuXHRcdFx0XHRcdHBvc3RhbENvZGU6ICQoJyNwb3N0Y29kZScpLnZhbCgpLFxyXG5cdFx0XHRcdFx0c3RhdHVzOiAkKCcjc3RhdHVzJykudmFsKCksXHJcblx0XHRcdFx0XHRkZXNjcmlwdGlvbjogJChcIiNkZXNjcmlwdGlvblwiKS52YWwoKSxcclxuXHRcdFx0XHRcdGV4ZWN1dG9yOiAkKCcjZXhlY3V0b3InKS52YWwoKVxyXG5cdFx0XHRcdH07XHJcblx0XHRcdFx0Y29uc29sZS5sb2coXCJhZGQgZXZlbnRcIik7XHJcblx0XHRcdFx0Ly8kKCcjY2FsZW5kYXInKS5mdWxsQ2FsZW5kYXIoJ3JlbmRlckV2ZW50JywgZXZudCwgdHJ1ZSk7XHJcblxyXG5cdFx0XHRcdCQuYWpheCh7XHJcblx0XHRcdFx0XHR0eXBlOiAnUE9TVCcsXHJcblx0XHRcdFx0XHR1cmw6ICcvZXZudC9zYXZlJyxcclxuXHRcdFx0XHRcdGRhdGE6IEpTT04uc3RyaW5naWZ5KGV2bnQpLFxyXG5cdFx0XHRcdFx0ZGF0YVR5cGU6IFwianNvblwiLFxyXG5cdFx0XHRcdFx0Y29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG5cdFx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhcImRhdGEgc2F2ZVwiKTtcclxuXHRcdFx0XHRcdFx0Ly92YXIgZXZudEFycmF5ID0gJCgnI2NhbGVuZGFyJykuZnVsbENhbGVuZGFyKCdjbGllbnRFdmVudHMnKTtcclxuXHRcdFx0XHRcdFx0Ly92YXIgX2V2bnQgPSBldm50QXJyYXlbZXZudEFycmF5Lmxlbmd0aCAtIDFdO1xyXG5cdFx0XHRcdFx0XHQvL1x0X2V2bnQuX2lkID0gZGF0YS5pbnNlcnRlZGlkO1xyXG5cclxuXHRcdFx0XHRcdFx0Ly9cdCQoJyNjYWxlbmRhcicpLmZ1bGxDYWxlbmRhcigndXBkYXRlRXZlbnQnLCBfZXZudCk7XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0Ly9lcnJvcjogYWpheEVycm9yXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHJcblxyXG5cdFx0fSk7XHJcblxyXG5cdFx0JCgnI2Nsb3NlLW1vZGFsLWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcblx0XHR9KTtcclxuXHJcblx0XHQkKCcjY2xvc2UtbW9kYWwtY3Jvc3MtYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoJyNtb2RhbCcpLm1vZGFsKCdzaG93Jyk7XHJcblxyXG5cdFx0Ly8kKCcjZGF0ZWJlZ2luJykudmFsKHN0YXJ0LmZvcm1hdCgnWVlZWS1NTS1ERCBoaDptbScpKTtcclxuXHRcdC8vJCgnI2RhdGVlbmQnKS52YWwoZW5kLmZvcm1hdCgnWVlZWS1NTS1ERCBoaDptbScpKTtcclxuXHJcblx0XHQkKCcjbW9kYWwnKS5vbignaGlkZGVuLmJzLm1vZGFsJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRjb25zb2xlLmxvZygnbW9kYWwgaGlkZScpO1xyXG5cdFx0XHRzZWxmLmRlc3Ryb3lNb2RhbCgpO1xyXG5cdFx0fSk7XHJcblxyXG5cdH07XHJcbn1cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvanMvZGV2L3BtL21vZHVsZS9uZXdFdmVudC5qc1xuLy8gbW9kdWxlIGlkID0gMTM5XG4vLyBtb2R1bGUgY2h1bmtzID0gMiAzIiwidmFyIGphZGUgPSByZXF1aXJlKFwiQzpcXFxcX3RlbXBcXFxccGNodFxcXFxub2RlX21vZHVsZXNcXFxcamFkZVxcXFxsaWJcXFxccnVudGltZS5qc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIjxkaXYgaWQ9XFxcIm1vZGFsXFxcIiB0YWJpbmRleD1cXFwiLTFcXFwiIHJvbGU9XFxcImRpYWxvZ1xcXCIgYXJpYS1sYWJlbGxlZGJ5PVxcXCJteU1vZGFsTGFiZWxcXFwiIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIiBjbGFzcz1cXFwibW9kYWwgZmFkZVxcXCI+PGRpdiByb2xlPVxcXCJkb2N1bWVudFxcXCIgY2xhc3M9XFxcIm1vZGFsLWRpYWxvZ1xcXCI+PGRpdiBjbGFzcz1cXFwibW9kYWwtY29udGVudFxcXCI+PGRpdiBjbGFzcz1cXFwibW9kYWwtaGVhZGVyXFxcIj48YnV0dG9uIGlkPVxcXCJjbG9zZS1tb2RhbC1jcm9zcy1idG5cXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgZGF0YS1kaXNtaXNzPVxcXCJtb2RhbFxcXCIgYXJpYS1sYWJlbD1cXFwiQ2xvc2VcXFwiIGNsYXNzPVxcXCJjbG9zZVxcXCI+PHNwYW4gYXJpYS1oaWRkZW49XFxcInRydWVcXFwiPsOXPC9zcGFuPjwvYnV0dG9uPjxoNCBpZD1cXFwibXlNb2RhbExhYmVsXFxcIiBjbGFzcz1cXFwibW9kYWwtdGl0bGVcXFwiPtCh0L7Qt9C00LDQvdC40LU8L2g0PjwvZGl2PjxkaXYgY2xhc3M9XFxcIm1vZGFsLWJvZHlcXFwiPjxmb3JtIGFjdGlvbj1cXFwiXFxcIj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj48bGFiZWwgZm9yPVxcXCJcXFwiPtC30LDQs9C+0LvQvtCy0L7QujwvbGFiZWw+PGlucHV0IGlkPVxcXCJldmVudC10aXRsZVxcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7QvdCw0YfQsNC70L48L2xhYmVsPjxpbnB1dCBpZD1cXFwiZGF0ZWJlZ2luXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sIGZsYXRwaWNrclxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7QvtC60L7QvdGH0LDQvdC40LU8L2xhYmVsPjxpbnB1dCBpZD1cXFwiZGF0ZWVuZFxcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbCBmbGF0cGlja3JcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0L7RgtC00LXQu9C10L3QuNC1INC/0L7Qu9GD0YfQsNGC0LXQu9GMPC9sYWJlbD48aW5wdXQgaWQ9XFxcInBvc3Rjb2RlXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj48bGFiZWwgZm9yPVxcXCJcXFwiPtC+0L/QuNGB0LDQvdC40LU8L2xhYmVsPjxpbnB1dCBpZD1cXFwiZGVzY3JpcHRpb25cXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBmb3I9XFxcIlxcXCI+0YHRgtCw0YLRg9GBPC9sYWJlbD48aW5wdXQgaWQ9XFxcInN0YXR1c1xcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsIGZvcj1cXFwiXFxcIj7QuNGB0L/QvtC70L3QuNGC0LXQu9GMPC9sYWJlbD48aW5wdXQgaWQ9XFxcImV4ZWN1dG9yXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIj48L2Rpdj48L2Zvcm0+PC9kaXY+PGRpdiBjbGFzcz1cXFwibW9kYWwtZm9vdGVyXFxcIj48YnV0dG9uIGlkPVxcXCJjbG9zZS1tb2RhbC1idG5cXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgZGF0YS1kaXNtaXNzPVxcXCJtb2RhbFxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj5DbG9zZTwvYnV0dG9uPjxidXR0b24gaWQ9XFxcInNhdmUtZXZlbnQtYnRuXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXByaW1hcnlcXFwiPlNhdmUgY2hhbmdlczwvYnV0dG9uPjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2PlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL2pzL2Rldi9wbS92aWV3L25ld0V2ZW50LmphZGVcbi8vIG1vZHVsZSBpZCA9IDE0MFxuLy8gbW9kdWxlIGNodW5rcyA9IDIgMyJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDclBBOzs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDM01BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzdTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQy9FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzdHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Iiwic291cmNlUm9vdCI6IiJ9