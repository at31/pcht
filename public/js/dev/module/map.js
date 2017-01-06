'use strict';

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

			var poDtl = require('./poDetail.js');
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