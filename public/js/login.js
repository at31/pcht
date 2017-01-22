webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

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
							
							if(data.status=='login')
								
							    window.location.href = "/login/in";
							
						},
						//error: ajaxError
					});
	    });

	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3BtL2xvZ2luLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuY29uc29sZS5sb2coJ2hpIHBjaHQsIGRvIGxvZ2luJyk7XHJcblxyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHRcclxuXHJcblx0JCgnI2NyZWF0ZS11c2VyLXN3aXRjaCcpLm9uKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0XHQkKCcjbG9naW4tdXNlcicpLmhpZGUoKTtcclxuXHRcdCQoJyNuZXctdXNlcicpLnNob3coKTtcclxuXHR9KTtcclxuXHJcblx0JCgnI2xvZ2luLXN3aXRjaCcpLm9uKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0XHQkKCcjbmV3LXVzZXInKS5oaWRlKCk7XHJcblx0XHQkKCcjbG9naW4tdXNlcicpLnNob3coKTtcclxuXHR9KTtcclxuICAgIFxyXG4gICAgJCgnI2NyZWF0ZS11c2VyLWJ0bicpLm9uKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIHVzZXIgPSB7XHJcblx0XHRcdFx0XHRlbWFpbDogJCgnI2VtYWlsSW5wdXRDJykudmFsKCksXHJcblx0XHRcdFx0XHRwYXNzOiAkKCcjcGFzc0lucHV0QycpLnZhbCgpLFxyXG5cdFx0XHRcdFx0cm9sZTogJCgnI3JvbGVJbnB1dEMnKS52YWwoKSxcclxuXHRcdFx0XHRcdGZpbzogJCgnI2Zpb0lucHV0QycpLnZhbCgpLFxyXG5cdFx0XHRcdFx0bG9naW46ICQoJyNsb2dpbklucHV0QycpLnZhbCgpXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0Y29uc29sZS5sb2codXNlcik7XHRcclxuXHRcdFx0XHRcclxuXHRcdFx0XHQkLmFqYXgoe1xyXG5cdFx0XHRcdFx0dHlwZTogJ1BPU1QnLFxyXG5cdFx0XHRcdFx0dXJsOiAnL3VzZXJzL25ldycsXHJcblx0XHRcdFx0XHRkYXRhOiBKU09OLnN0cmluZ2lmeSh1c2VyKSxcclxuXHRcdFx0XHRcdGRhdGFUeXBlOiBcImpzb25cIixcclxuXHRcdFx0XHRcdGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuXHRcdFx0XHRcdFx0Ly9jb25zb2xlLmxvZyhcImRhdGEgc2F2ZVwiKTtcclxuXHRcdFx0XHRcdFx0XHRpZihkYXRhLnN0YXR1cz09J29rJyl7XHJcblx0XHRcdFx0XHRcdFx0XHQkKCcubXNnJykuaHRtbChkYXRhLnRleHQpO1xyXG5cdFx0XHRcdFx0XHRcdFx0JCgnI2xvZ2luLXVzZXInKS5zaG93KCk7XHJcblx0XHRcdFx0XHRcdFx0XHQkKCcjbmV3LXVzZXInKS5oaWRlKCk7XHJcblx0XHRcdFx0XHRcdFx0fWVsc2UgaWYoZGF0YS5zdGF0dXM9PSdlcnInKXtcclxuXHRcdFx0XHRcdFx0XHRcdCQoJy5tc2cnKS5odG1sKGRhdGEudGV4dCk7XHJcblx0XHRcdFx0XHRcdFx0fVx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0Ly9lcnJvcjogYWpheEVycm9yXHJcblx0XHRcdFx0fSk7XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgJCgnI2xvZ2luLWJ0bicpLm9uKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIHVzZXIgPSB7XHJcblx0XHRcdFx0XHRwYXNzOiAkKCcjcGFzc0lucHV0JykudmFsKCksXHJcblx0XHRcdFx0XHRsb2dpbjogJCgnI2xvZ2luSW5wdXQnKS52YWwoKVxyXG5cdFx0XHRcdH07XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0JC5hamF4KHtcclxuXHRcdFx0XHRcdHR5cGU6ICdQT1NUJyxcclxuXHRcdFx0XHRcdHVybDogJy9sb2dpbicsXHJcblx0XHRcdFx0XHRkYXRhOiBKU09OLnN0cmluZ2lmeSh1c2VyKSxcclxuXHRcdFx0XHRcdGRhdGFUeXBlOiBcImpzb25cIixcclxuXHRcdFx0XHRcdGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdFx0aWYoZGF0YS5zdGF0dXM9PSdsb2dpbicpXHJcblx0XHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdCAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL2xvZ2luL2luXCI7XHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdC8vZXJyb3I6IGFqYXhFcnJvclxyXG5cdFx0XHRcdH0pO1xyXG4gICAgfSk7XHJcblxyXG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy9qcy9kZXYvcG0vbG9naW4uanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAxIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Iiwic291cmNlUm9vdCI6IiJ9