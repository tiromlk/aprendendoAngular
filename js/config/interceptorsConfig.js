angular.module("listaTelefonica").config(function($httpProvider){
	console.log("Providerconfig");
	console.log($httpProvider);
	$httpProvider.interceptors.push("timestampInterceptor");
	//$httpProvider.interceptors.push("errorInterceptor");
});