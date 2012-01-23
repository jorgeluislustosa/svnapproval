
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
		var nome = $("#nome").val();
		var urlsite = $("#urlsite").val();
		if($('#cache').attr('checked'))var cache = '1' ; 
		if($('#filtro').attr('checked'))var filtro = '1' ; 
		
		url = 'result/'; 
		$.post(url,{
			nome:nome , 
			url:urlsite, 
			cache:cache , 
			filtro: filtro
		},function(data){
			$("#resultadoConsulta").html(data);
		});
			 
		
	}); 	


	//$("#dialog").dialog("destroy");
	//$("#dialog-update-form").dialog("destroy");
	
	

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
	
	$("#dialog-insert-form").dialog({
		autoOpen: false,
		height: 380,
		width: 500,
		modal: true,
		buttons: {
			'Enviar': function() {
		
		
				if($('#FiltroSiteInsert').attr('checked'))var FiltroSiteInsert = '1' ; 
				if($('#CacheSiteInsert').attr('checked'))var CacheSiteInsert = '1' ; 
			
		
				var 
				NomeSiteInsert = $("#NomeSiteInsert"),
				UrlSiteInsert = $("#UrlSiteInsert"),
				ObsSiteInsert  = $("#ObsSiteInsert"), 
			
				allFields = $([]).add(NomeSiteInsert).add(UrlSiteInsert).add(ObsSiteInsert),
				tips = $(".validateTips");

				var bValid = true;
				
				allFields.removeClass('ui-state-error');

				bValid = bValid && checkLength(NomeSiteInsert,"NomeSiteInsert",5,200);
				bValid = bValid && checkLength(UrlSiteInsert,"UrlSiteInsert",8,255);
				

				// caso os dados do formulario estejam validos envia o formulario 
				if (bValid) {


						var url = 'add/'; 
						$.post(url,{
							nome: NomeSiteInsert.val(),
							url:UrlSiteInsert.val() , 
							obs:ObsSiteInsert.val() ,   
							username: username  , 
							cache: CacheSiteInsert , 
							filtro: FiltroSiteInsert
						},function(data){

							if(trim(data)=="ok")
							{ 
								alert('REGISTRO GRAVADO COM SUCESSO') ;
								$(this).dialog('close'); 	

								var nome = $("#nome").val();
								var urlsite = $("#urlsite").val();
								var filtro = $("#filtro").val();
								
								url = 'result/'; 
								$.post(url,{
									nome:nome, 
									url:urlsite, 
									filtro:filtro
								},function(data){
									$("#resultadoConsulta").html(data);
									NomeSiteInsert.val('') ; 
									UrlSiteInsert.val('') ; 
									ObsSiteInsert.val('') ;  
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
		}
	});
	
	$('#InsereCadastro')
		.button()
		.click(function() {
			$('#dialog-insert-form').dialog('open');
		});


	$("#dialog-update-form").dialog({
		autoOpen: false,
		height: 380,
		width: 500,
		modal: true,
		buttons: {
			'Alterar': function() {
				var bValid = true;
				//allFields.removeClass('ui-state-error');
				
				
				if($('#FiltroSiteUpdate').attr('checked'))var FiltroSiteUpdate = '1' ; 
				if($('#CacheSiteUpdate').attr('checked'))var CacheSiteUpdate= '1' ; 
				
				NomeSiteUpdate  = $('#NomeSiteUpdate') ; 
				UrlSiteUpdate  = $('#UrlSiteUpdate') ;
				ObsSiteUpdate  = $('#ObsSiteUpdate') ;
				
				allFields = $([]).add(NomeSiteUpdate).add(UrlSiteUpdate).add(ObsSiteUpdate),
				tips = $(".validateTips");
				
				item_edit  = $('#item_edit') ;

				bValid = bValid && checkLength(NomeSiteUpdate,"NomeSiteUpdate",3,100);
				bValid = bValid && checkLength(UrlSiteUpdate,"UrlSiteUpdate",8,100);
				
				
				if (bValid) {
					$('#users tbody').append('<tr>' +
							'<td>' + NomeSiteUpdate.val() + '</td>' + 
							'<td>' + UrlSiteUpdate.val() + '</td>' + 
							'<td>' + ObsSiteUpdate.val() + '</td>' + 
						'</tr>'); 


						var url = 'edit/'; 
						$.post(url,{
							nome: NomeSiteUpdate.val(),
							url:UrlSiteUpdate.val(),
							obs:ObsSiteUpdate.val(),
							id:item_edit.val(),
							username: username  , 
							cache: CacheSiteUpdate , 
							filtro: FiltroSiteUpdate
						},function(data){

							if(trim(data)=="ok")
							{ 
								alert('REGISTRO ALTERADO COM SUCESSO') ;
								$(this).dialog('close'); 	

								var nome = $("#nome").val();
								var urlsite = $("#urlsite").val();
								var filtro = $("#filtro").val();
								
								
								url = 'result/'; 
								$.post(url,{
									nome:nome, 
									url:urlsite , 
									filtro:filtro
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
	
					if(trim(data)=="ok")
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