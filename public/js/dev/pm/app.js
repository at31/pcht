'use strict';

//module.exports = function() {
console.log('hi pcht');


$(document).ready(function() {	

	$(".flatpickr").flatpickr({
		enableTime: true,
	});

	var myMap=require('./module/map4p.js');	
	ymaps.ready(init);
	var _myMap;
	var nevnt=require('./module/newEvent.js');

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