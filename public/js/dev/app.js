'use strict';

//module.exports = function() {
console.log('hi pcht');

$(document).ready(function() {	

	$(".flatpickr").flatpickr({
		enableTime: true,
	});

	var myMap=require('./module/map.js');

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

		var _newEventModal = require('./module/newEventModal.js');
		var _newModal = new _newEventModal();
		var _editEventModal = require('./module/editEventModal.js');
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

		var listmod = require('./module/listmod.js');
		var _listmod=new listmod();
		_listmod.init();
		
	}



});

//}