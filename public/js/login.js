webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvZGV2L3BtL2xvZ2luLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLy9tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuY29uc29sZS5sb2coJ2hpIHBjaHQsIGRvIGxvZ2luJyk7XG5cblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHRcbiAgICBcbiAgICAkKCcjY3JlYXRlLXVzZXItYnRuJykub24oJ2NsaWNrJyxmdW5jdGlvbihlKXtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBcbiAgICAgICAgdmFyIHVzZXIgPSB7XG5cdFx0XHRcdFx0ZW1haWw6ICQoJyNlbWFpbElucHV0JykudmFsKCksXG5cdFx0XHRcdFx0cGFzczogJCgnI3Bhc3NJbnB1dCcpLnZhbCgpLFxuXHRcdFx0XHRcdHJvbGU6ICQoJyNyb2xlSW5wdXQnKS52YWwoKVxuXHRcdFx0XHR9O1xuXHRcdFx0XHRcblx0XHRcdFx0JC5hamF4KHtcblx0XHRcdFx0XHR0eXBlOiAnUE9TVCcsXG5cdFx0XHRcdFx0dXJsOiAnL2xvZ2luL25ldycsXG5cdFx0XHRcdFx0ZGF0YTogSlNPTi5zdHJpbmdpZnkodXNlciksXG5cdFx0XHRcdFx0ZGF0YVR5cGU6IFwianNvblwiLFxuXHRcdFx0XHRcdGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcblx0XHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhcImRhdGEgc2F2ZVwiKTtcblx0XHRcdFx0XHRcdCQoJy5tc2cnKS5odG1sKGRhdGEuc3RhdHVzKTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdC8vZXJyb3I6IGFqYXhFcnJvclxuXHRcdFx0XHR9KTtcbiAgICB9KTtcbiAgICBcbiAgICAkKCcjbG9naW4tYnRuJykub24oJ2NsaWNrJyxmdW5jdGlvbihlKXtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBcbiAgICAgICAgdmFyIHVzZXIgPSB7XG5cdFx0XHRcdFx0ZW1haWw6ICQoJyNlbWFpbElucHV0JykudmFsKCksXG5cdFx0XHRcdFx0cGFzczogJCgnI3Bhc3NJbnB1dCcpLnZhbCgpXG5cdFx0XHRcdH07XG5cdFx0XHRcdFxuXHRcdFx0XHQkLmFqYXgoe1xuXHRcdFx0XHRcdHR5cGU6ICdQT1NUJyxcblx0XHRcdFx0XHR1cmw6ICcvbG9naW4nLFxuXHRcdFx0XHRcdGRhdGE6IEpTT04uc3RyaW5naWZ5KHVzZXIpLFxuXHRcdFx0XHRcdGRhdGFUeXBlOiBcImpzb25cIixcblx0XHRcdFx0XHRjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG5cdFx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0aWYoZGF0YS5zdGF0dXM9PSdsb2dpbicpXG5cdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0ICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvY3Jvc3Nyb2FkXCI7XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdC8vZXJyb3I6IGFqYXhFcnJvclxuXHRcdFx0XHR9KTtcbiAgICB9KTtcblxufSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvanMvZGV2L3BtL2xvZ2luLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMSJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OzsiLCJzb3VyY2VSb290IjoiIn0=