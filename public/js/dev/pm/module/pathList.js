'use strict';

module.exports = function() {

	this.plJade = require('../view/pathList.jade');
	this.elJade = require('../view/listEl.jade');
	this.nestedListJade = require('../view/sublist.jade');
	this.pdfJade = require('../view/pdfPathList.jade');
	this.evntDetailJade = require('../view/editdelEvent.jade');
	this.ymapCeatePath = {};
	this.selectedEL = [];

	var self = this;

	this.init = function(yMapCreatePath) {
		$('.l-place').html(self.plJade());
		//self.myMap=myMap;
		self.ymapCeatePath = yMapCreatePath;
		$('#clear-plist-btn').on('click', self.removeAll);
		$('#create-path-btn').on('click', self.createPath);
		$('#print-path-btn').on('click', self.pdfPath);

	};

	this.addElement = function(data) {
		$('#path-list').append(self.elJade({
			"data": data
		}));
		self.selectedEL.push(data);
		$('[data-po-id=' + data.postalCode + ']').children('.remove-po-list').on('click', {
			element: data
		}, self.removeElement);
		self.loadEvntData(data);

	};

	this.loadEvntData = function(_data) {
		var rarr = [];
		$.ajax({
			type: 'GET',
			url: "./testevent.json",
			dataType: "json",
			success: function(data) {
				console.log('success load data');
				rarr = data.filter(function(evnt) {
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
				}, /*Math.floor(Math.random() * 10000)*/ 10);
			},
			error: function(err) {
				//console.log(err);
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
							$(".flatpickr").flatpickr({
								enableTime: true,
							});

							$('#modal').modal('show');

							//$('#datebegin').val(_event.start.format('YYYY-MM-DD hh:mm'));
							//$('#dateend').val(_event.end.format('YYYY-MM-DD hh:mm'));
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
		e.stopPropagation();
		$('#path-list').html('');
		self.selectedEL = [];
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