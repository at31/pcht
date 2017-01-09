'use strict';

module.exports = function() {

	this._modal = require('../view/newEvent.jade');

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
