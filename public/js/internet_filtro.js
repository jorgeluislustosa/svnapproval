
$(document).ready(function()
{
	// pega a variavel do username  
	var  username = $("#username").val() ; 
	
	var loading = $(
			'<br><br><br><center><img id="loading" alt="Carregando" title="Carregando" src="/internet/img/loading.gif" /><br>'
			).appendTo('#resultadoConsulta').hide()
			loading.ajaxStart(function(){
				$(this).show();
			});
			loading.ajaxStop(function(){
				$(this).hide();
			});

	
	$('#enviaDados').click(function() 
	{  
		var usuario = $("#usuario").val();
		var filtro = $("#filtro").val();
		var dominio = $("#dominio").val();
		var nome = $("#nome").val();
			
		
		url = 'result/'; 
		$.post(url,{
			usuario:usuario , 
			filtro:filtro,
			dominio:dominio, 
			nome:nome 
		},function(data){
			$("#resultadoConsulta").html(data);
		});
			 
		
	}); 	


	//$("#dialog").dialog("destroy");
	//$("#dialog-update-form").dialog("destroy");
	
	
	var LoginUsuario = $("#LoginUsuario"),
	DominioUsuario = $("#DominioUsuario"),
	FiltroUsuario = $("#FiltroUsuario"),
	NomeUsuario = $("#NomeUsuario"),
	
		allFields = $([]).add(LoginUsuario).add(DominioUsuario).add(FiltroUsuario).add(NomeUsuario),
		tips = $(".validateTips");

	function updateTips(t) {
		tips
			.text(t)
			.addClass('ui-state-highlight');
		setTimeout(function() {
			tips.removeClass('ui-state-highlight', 1500);
		}, 500);
	}

	function checkLength(o,n,min,max) {

		if ( o.val().length > max || o.val().length < min ) {
			o.addClass('ui-state-error');
			updateTips("Length of " + n + " must be between "+min+" and "+max+".");
			return false;
		} else {
			return true;
		}

	}

	function checkRegexp(o,regexp,n) {

		if ( !( regexp.test( o.val() ) ) ) {
			o.addClass('ui-state-error');
			updateTips(n);
			return false;
		} else {
			return true;
		}

	}
	
	$("#dialog-form").dialog({
		autoOpen: false,
		height: 345,
		width: 350,
		modal: true,
		buttons: {
			'Enviar': function() {
				var bValid = true;
				allFields.removeClass('ui-state-error');

				bValid = bValid && checkLength(LoginUsuario,"LoginUsuario",3,16);
				bValid = bValid && checkLength(NomeUsuario,"NomeUsuario",3,100);

				
				//bValid = bValid && checkLength(email,"email",6,80);
				//bValid = bValid && checkLength(password,"password",5,16);

				bValid = bValid && checkRegexp(LoginUsuario,/^[a-z]([0-9a-z_])+$/i,"Username may consist of a-z, 0-9, underscores, begin with a letter.");
				//bValid = bValid && checkRegexp(NomeUsuario,/^W+$/i,"Username may consist of a-z, 0-9, underscores, begin with a letter.");
				
			//	bValid = bValid && checkRegexp(email,/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,"eg. ui@jquery.com");
			//	bValid = bValid && checkRegexp(password,/^([0-9a-zA-Z])+$/,"Password field only allow : a-z 0-9");
				
				if (bValid) {
					$('#users tbody').append('<tr>' +
						'<td>' + NomeUsuario.val() + '</td>' + 
						'<td>' + LoginUsuario.val() + '</td>' + 
						'<td>' + DominioUsuario.val() + '</td>' + 
						'<td>' + FiltroUsuario.val() + '</td>' +
						'</tr>'); 


						var url = 'add/'; 
						$.post(url,{
							nome: NomeUsuario.val(),
							usuario:LoginUsuario.val() , 
							filtro:FiltroUsuario.val(),
							dominio:DominioUsuario.val(), 
							username:username 
						},function(data){

							if(data=="ok")
							{ 
								alert('REGISTRO GRAVADO COM SUCESSO') ;
								$(this).dialog('close'); 	

								var usuario = $("#usuario").val();
								var filtro = $("#filtro").val();
								var dominio = $("#dominio").val();
								
								
								url = 'result/'; 
								$.post(url,{
									usuario:usuario , 
									filtro:filtro,
									dominio:dominio
								},function(data){
									$("#resultadoConsulta").html(data);
								});							

								
							} 
							else
							{ 
								alert(data+' - FAVOR CONTACTAR O SUPORTE ') ;		
							}  

							
							 
						});
						
									
					$(this).dialog('close');
				}
			},
			Cancel: function() {
				$(this).dialog('close');
			}
		},
		close: function() {
			allFields.val('').removeClass('ui-state-error');
		}
	});
	
	$('#InsereCadastro')
		.button()
		.click(function() {
			$('#dialog-form').dialog('open');
		});


	$("#dialog-update-form").dialog({
		autoOpen: false,
		height: 250,
		width: 350,
		modal: true,
		buttons: {
			'Alterar': function() {
				var bValid = true;
				allFields.removeClass('ui-state-error');
				
				UpdateNomeUsuario  = $('#UpdateNomeUsuario') ; 
				UpdateFiltroUsuario  = $('#UpdateFiltroUsuario') ;
				item_edit  = $('#item_edit') ;
				
				

				bValid = bValid && checkLength(UpdateNomeUsuario,"UpdateNomeUsuario",3,100);
				
				if (bValid) {
					$('#users tbody').append('<tr>' +
						'<td>' + UpdateNomeUsuario.val() + '</td>' + 
						'<td>' + UpdateFiltroUsuario.val() + '</td>' +
						'</tr>'); 


						var url = 'edit/'; 
						$.post(url,{
							nome: UpdateNomeUsuario.val(),
							filtro:UpdateFiltroUsuario.val(),
							id:item_edit.val(),
							username:username 
						},function(data){

							if(data=="ok")
							{ 
								alert('REGISTRO GRAVADO COM SUCESSO') ;
								$(this).dialog('close'); 	

								var usuario = $("#usuario").val();
								var filtro = $("#filtro").val();
								var dominio = $("#dominio").val();
								
								
								url = 'result/'; 
								$.post(url,{
									usuario:usuario , 
									filtro:filtro,
									dominio:dominio
								},function(data){
									$("#resultadoConsulta").html(data);
								});							

								
							} 
							else
							{ 
								alert(data+' - FAVOR CONTACTAR O SUPORTE ') ;		
							}  

							
							 
						});
						
									
					$(this).dialog('close');
				}
			},
			Cancel: function() {
				$(this).dialog('close');
			}
		},
		close: function() {
			allFields.val('').removeClass('ui-state-error');
		}
	});


	$("#dialog-confirm").dialog({
		resizable: false,
		autoOpen: false,
		height:180,
		modal: true,
		buttons: {
			'Confirmar': function() {

				$(this).dialog('close');	
				var item = $('#item_del').val() ; 
				
				var url = 'del/'; 
				$.post(url,{ 
					id: item  
				},function(data){
	
					if(data=="ok")
					{
						$(this).dialog('close'); 
						var usuario = $("#usuario").val();
						var filtro = $("#filtro").val();
						var dominio = $("#dominio").val();
						url = 'result/'; 
						$.post(url,{
							usuario:usuario , 
							filtro:filtro,
							dominio:dominio
						},function(data){
							$("#resultadoConsulta").html(data);
						});							

						
					}  
					else
					{ 
						alert(data+' - FAVOR CONTACTAR O SUPORTE ') ;		
					} 
					
				}); 
					
			},
			Cancel: function() {
				$(this).dialog('close');
			}
		}
	});

	
	
	
});  