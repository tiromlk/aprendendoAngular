app.controller("listaTelefonicaCtrl", function($scope, uppercaseFilter, contatosAPI, operadorasAPI, serialGenerator){

	$scope.titulo = "Lista Telefônica"	
	$scope.contatos= [];	
	$scope.operadoras = [];
		
	
	var carregarContatos = function()
	{
		contatosAPI.getContatos().success(function(data){
			$scope.contatos = data;
			console.log($scope.contatos);
		}).error(function(data, status){
			$scope.message = "Aconteceu um problema:" + data;
			
		});				
	};
	
	var carregarOperadoras = function (){
		
		operadorasAPI.getOperadoras().success(function(data){
			$scope.operadoras = data;
		});
		
	};
	
	$scope.adicionarContato = function (contato)
	{
		
		contato.serial=serialGenerator.generate();
		contato.data = new	Date();
		contatosAPI.saveContato(contato).success(function (data){
			delete $scope.contato;
			$scope.contatoForm.$setPristine();		
			carregarContatos();	
		});
		
	};
	
	
	
	$scope.apagarContatos = function (contatos)
	{
		$scope.contatos = contatos.filter(function (contato)
		{
			if (!contato.selecionado) return contato;
			
		});
		
		
	};
	$scope.isContatoSelecionado = function(contatos)
	{
		return contatos.some(function(contato)
		{
			return contato.selecionado;
		});
		
	};
	
	$scope.ordenarPor = function(campo)
	{
		$scope.criterioDeOrdenacao = campo;
		$scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
	}
	
	$scope.classe1="selecionado";
	$scope.classe2="negrito";

	carregarContatos();
	carregarOperadoras();
	
});