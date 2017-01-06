'use srtict';

module.exports=function(data,myMap){



	var tpl = require('../view/postOfficeDetail.jade');
	$('.pod-place').html(tpl({"data": data}));

	$('.show-net').on('click',function(e){

		myMap.destroy();

		$('.c-place').html('<div id="cy">cy!</div>');

		var cy = cytoscape({
  container: $('#cy'),
   
});

var elements = {
        nodes: [
          { data: { id: 'n1', name: 'n1', size: 50},
            position: {x: 0, y: 0} },
          { data: { id: 'n2', name: 'n2', size: 50},
           position: {x: 100, y: 100} },
          { data: { id: 'n3', name: 'n3', size: 50},
           position: {x: 0, y: 100} },
        ],
        edges: [
          { data: { source: 'n1', target: 'n2' } }
        ]
      };
      cy.add(elements);
      cy.layout({
      	name: 'grid'   
      });

     cy.on('tap', function(evt){
  console.log( 'tap ' + evt.cyTarget.id() );
}); 		
	//console.log(cy);
		/*$('#cy').cytoscape({
  ready: function(){
      var cy = this;
      var elements = {
        nodes: [
          { data: { id: 'n1', name: 'n1', size: 50},
            position: {x: 0, y: 0} },
          { data: { id: 'n2', name: 'n2', size: 50},
           position: {x: 100, y: 100} },
          { data: { id: 'n3', name: 'n3', size: 50},
           position: {x: 0, y: 100} },
        ],
        edges: [
          { data: { source: 'n1', target: 'n2' } }
        ]
      };
      
      // Add all nodes and edges
      cy.add(elements);

      // Lock node 1 to its initial position, (0,0)
      cy.nodes('#n1').lock();

      // Disable web workers to be able to use jsFiddle
      window.Worker = undefined;

      // The generated layout won't lock node 1 to its position
      cy.layout({
        fit: false,
      	name: 'arbor'   
      });
      
      console.log(cy.$('#n1').position(),
                  cy.$('#n2').position(),
                  cy.$('#n3').position());
  }
});*/
	});
}