'use strict';

//module.exports = function() {
console.log('hi pcht, do login');


$(document).ready(function() {	
    
    $('#create-user-btn').on('click',function(e){
        e.stopPropagation();
        e.preventDefault();
        
        var user = {
					email: $('#emailInput').val(),
					pass: $('#passInput').val(),
					role: $('#roleInput').val()
				};
				
				$.ajax({
					type: 'POST',
					url: '/login/new',
					data: JSON.stringify(user),
					dataType: "json",
					contentType: "application/json",
					success: function(data) {
						console.log("data save");
						$('.msg').html(data.status);
					},
					//error: ajaxError
				});
    });
    
    $('#login-btn').on('click',function(e){
        e.stopPropagation();
        e.preventDefault();
        
        var user = {
					email: $('#emailInput').val(),
					pass: $('#passInput').val()
				};
				
				$.ajax({
					type: 'POST',
					url: '/login',
					data: JSON.stringify(user),
					dataType: "json",
					contentType: "application/json",
					success: function(data) {
						
						console.log(data);
						
						if(data.status=='login')
							
						    window.location.href = "/crossroad";
						
					},
					//error: ajaxError
				});
    });

});