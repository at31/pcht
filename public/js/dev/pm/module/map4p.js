'use strict';

module.exports = function() {
	console.log('map4p.js');

	var _mapjade=require('../view/map.jade');
	$('.c-place').html(_mapjade());

	var _podetail = require('../module/poDetail.js');
	var poDetail=new _podetail();

	var _pathList=require('../module/pathList.js');
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