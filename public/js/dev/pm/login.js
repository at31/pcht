'use strict';

//module.exports = function() {
console.log('hi pcht, do login');


$(document).ready(function() {	

	$('#create-user-switch').on('click',function(e){
		$('#login-user').hide();
		$('#new-user').show();
	});

	$('#login-switch').on('click',function(e){
		$('#new-user').hide();
		$('#login-user').show();
	});
    
    $('#create-user-btn').on('click',function(e){
        e.stopPropagation();
        e.preventDefault();
        
        var user = {
					email: $('#emailInputC').val(),
					pass: $('#passInputC').val(),
					role: $('#roleInputC').val(),
					fio: $('#fioInputC').val(),
					login: $('#loginInputC').val()
				};
			console.log(user);	
				
				$.ajax({
					type: 'POST',
					url: '/users/new',
					data: JSON.stringify(user),
					dataType: "json",
					contentType: "application/json",
					success: function(data) {
						//console.log("data save");
							if(data.status=='ok'){
								$('.msg').html(data.text);
								$('#login-user').show();
								$('#new-user').hide();
							}else if(data.status=='err'){
								$('.msg').html(data.text);
							}													
					},
					//error: ajaxError
				});
    });
    
    $('#login-btn').on('click',function(e){
        e.stopPropagation();
        e.preventDefault();
        
        var user = {
					pass: $('#passInput').val(),
					login: $('#loginInput').val()
				};
				
				$.ajax({
					type: 'POST',
					url: '/login',
					data: JSON.stringify(user),
					dataType: "json",
					contentType: "application/json",
					success: function(data) {
						
						console.log(data);
						
						if(data.status=='login'){
							window.location.href = "/login/in";
						}else if(data.status=='err'){
							$('.msg').html(data.text);
						}
					},
					error: function(err){
						$('.msg').html(err);
					}
				});
    });

});