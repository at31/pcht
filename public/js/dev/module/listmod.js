module.exports = function() {

	var _list;
	var self = this;
	var lcard = require('../view/listscard.jade');
	var listhtml = require('../view/listsview.jade');

	this.destroyModal = function() {

		//$("#save-event-btn").off('click');
		$('.modal-place').html('');
	};

	this.init = function() {

		$('.list-place').html(lcard());
		$('#clear-list-btn').on('click', function(e) {
			e.stopPropagation();
			e.preventDefault();
			console.log('list clear');
			_list = null;
		});
		$('#add-to-list-btn').on('click', function(e) {
			e.stopPropagation();
			e.preventDefault();
			var _modal = require('../view/listfiltermodal.jade');
			$('.modal-place').html(_modal());
			$('#load-filter-list-btn').on('click', loadFilteredList);
			$('#modal').modal('show');
			$(".flatpickr").flatpickr({
				enableTime: true,
			});
		});


		$('#modal').on('hidden.bs.modal', function(e) {
			console.log('modal hide');
			self.destroyModal();
		});

		$('#send-list-mail').on('click', function(e) {
			if (_list.length > 0) {
				if ($('#execemail').val()) {

					var emailtxt={"txt":listhtml({"data": _list})};
					console.log(emailtxt);

					$.ajax({
						type: 'POST',
						url: '/users/emaillist',
						data: JSON.stringify(emailtxt),
						dataType: "json",
						contentType: "application/json",
						success: function(data) {
							console.log("search ok");
						},
						//error: ajaxError
					});
				}
			}
		});

	};

	this.destroy = function() {

	};

	function loadFilteredList() {
		var lquery = {};
		$('.l-query').each(function(i, el) {
			if ($(el).val()) {
				lquery[$(el).attr('data-lquery-name')] = $(el).val();
			}
		});
		console.log(lquery);

		$.ajax({
			type: 'POST',
			url: '/users/lquery',
			data: JSON.stringify(lquery),
			dataType: "json",
			contentType: "application/json",
			success: function(data) {
				console.log("search ok");
				console.log(data);
				_list = data;
				renderList(_list);
			},
			//error: ajaxError
		});
	}

	function renderList(__list) {
		$('#listplace').html(listhtml({
			"data": __list
		}));

		$('.edit-evnt-list').on('click', function(e) {
			e.stopPropagation();
			e.preventDefault();
			console.log('edit click clack )');
		});
		$('.remove-evnt-list').on('click', function(e) {
			e.stopPropagation();
			e.preventDefault();
			var __id = $(e.currentTarget).parent().attr('data-evnt-id');
			var indx;
			_list.forEach(function(evnt, i) {
				if (evnt._id == __id) {
					indx = i;
				}
			});
			_list.splice(indx, 1);
			renderList(_list);
		});

	}


};