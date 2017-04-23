'use strict';

module.exports = function() {
	console.log('map phase2.js');

	var _mapjade = require('../view/map.jade');
	$('.c-place').html(_mapjade());

	var _podetail = require('../module/poDetail.js');
	var poDetail = new _podetail();

	var _pathList = require('../module/pathList.js');
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