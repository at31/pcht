'use strict';

module.exports = function() {

	var self = this;

	this.destroyModal = function() {
		
		$("#save-event-btn").off('click');
		$('#close-modal-btn').off('click');
		$('#close-modal-cross-btn').off('click');
		$('#delete-event-btn').off();
		$('.modal-place').html('');
		self.event = null;
	};

	this.init = function(evnt) {

		console.log(evnt);
		self.event = evnt;

		var _modalhtml = require('../view/editdelEvent.jade');
		$('.modal-place').html(_modalhtml());
		$(".flatpickr").flatpickr({
			enableTime: true,
		});

		$('#modal').modal('show');

		$('#datebegin').val(evnt.start.format('YYYY-MM-DD hh:mm'));
		$('#dateend').val(evnt.end.format('YYYY-MM-DD hh:mm'));
		$('#event-title').val(evnt.title);
		$('#postcode').val(evnt.postalCode);
		$('#status').val(evnt.status);
		$("#description").val(evnt.description);
		$('#executor').val(evnt.executor);


		$("#save-event-btn").on('click',function(e) {

			console.log('save from modal');
			var  _event={};

			_event.title=self.event.title = $('#event-title').val();
			_event.start=self.event.start = moment($('#datebegin').val());
			_event.end=self.event.end = moment($('#dateend').val());
			_event.postalCode=self.event.postalCode = $('#postcode').val();
			_event.status=self.event.status = $('#status').val();
			_event.description=self.event.description = $("#description").val();
			_event.executor=self.event.executor = $('#executor').val();

			$.ajax({
				type: 'POST',
				url: '/users/update/'+self.event._id,
				data: JSON.stringify(_event),
				dataType: "json",
				contentType: "application/json",
				success: function(e) {
					console.log("data update");
					$('#calendar').fullCalendar('updateEvent', self.event);
					$('#calendar').fullCalendar('rerenderEvents');					
					$('#modal').modal('hide');
					/*var _modal = require('../view/allok.jade');
					$('.modal-place').html(_modal());
					$('#modal').modal('show');*/

				},
				//error: ajaxError
			});			
		});
		$('#delete-event-btn').on('click',function(e){
			$.ajax({
			type: 'DELETE',
			url: '/users/del/' + self.event._id,
			dataType: "json",
			contentType: "application/json",
			success: function(data) {
				console.log("data del");
				$('#calendar').fullCalendar('removeEvents', self.event._id);
			},
			//error: ajaxError
		});
		});

		$('#modal').on('hidden.bs.modal', function(e) {
			console.log('modal hide');
			self.destroyModal();

		});
	};


}