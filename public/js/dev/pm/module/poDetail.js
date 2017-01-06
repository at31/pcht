'use srtict';

module.exports=function(){

  this._modal = require('../view/poDetail.jade');

  this.destroyModal = function() {
       
    $('#close-modal-btn').off('click');
    $('#close-modal-cross-btn').off('click');
    $('.modal-place').html('');
  };

  var self = this;

  this.init = function(data, myMap) {

    $('.modal-place').html(this._modal({"data": data}));


    $('#close-modal-btn').on('click', function(e) {

    });

    $('#close-modal-cross-btn').on('click', function(e) {

    });

    $('#modal').modal('show');

    $('#modal').on('hidden.bs.modal', function(e) {
      console.log('modal hide');
      self.destroyModal();
    });

  };
	
}