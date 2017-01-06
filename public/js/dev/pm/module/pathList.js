'use strict';

module.exports = function() {

	this.plJade = require('../view/pathList.jade');
	this.elJade = require('../view/listEl.jade');
	this.nestedListJade = require('../view/sublist.jade');
	this.pdfJade = require('../view/pdfPathList.jade');
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
		$('#' + data.postalCode).on('click', {
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
					$('#' + _data.postalCode).parent().append(self.nestedListJade({
						"data": rarr
					}));
					$('#' + _data.postalCode).parent().find('i.fa-spinner').remove();
				}, Math.floor(Math.random() * 10000));
			},
			error: function(err) {
				//console.log(err);
			}
		});


	};

	this.removeElement = function(e) {
		e.stopPropagation();
		for (var i = self.selectedEL.length; i--;) {
			if (self.selectedEL[i].postalCode == e.data.element.postalCode) {
				$(e.currentTarget).parent().off();
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
				ul: ularr, style:'lists'
			}],
			styles: {
				header: {
					fontSize: 16,
					bold: true
				},
				lists:{
					padding:"15px",
					fontSize:14
				}
			}
		};
		return cobj;
	};
}