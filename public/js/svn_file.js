$(document).ready(function()
{

	$.post('/svnapproval/file/listfiles/', function(data) 
	{
		 $('#filemanager').html(data);
	});

	$.post('/svnapproval/file/svnst/', function(data) 
	{
		// when no have data to show !!! 
		if(data=="")
		{ 
			$('#changedfiles').hide(); 
		}
		
		$('#changedfiles').html(data);
		
	});
	
	
	// when files are add 
	$('#add_file').click(function() 
	{

	     
		 var tagsArray = new Array();
	     $('input:checked').each(function()
	     {
	    	 id = $(this).attr('id') ; 
	    	 tagsArray.push(id);
	     })  
		
		
		  $.post('/svnapproval/file/svnadd', { 'tags[]': tagsArray },function(data) 
		  {
			  
			  $("#missing-readme").show("slow");
			  $('#missing-readme').html(data);
			  
			  //update added files 
			  $.get('/svnapproval/file/svnst/', function(data) 
			  {
				  $('#changedfiles').html(data);
			  });
			  
			  
		  });
	});
	
	
	// when files are commited 
	$('#commit_file').click(function() 
	{

	     
		 var tagsArray = new Array();
	     $('input:checked').each(function()
	     {
	    	 id = $(this).attr('id') ; 
	    	 tagsArray.push(id);
	     })  
		   
		
		  $.post('/svnapproval/file/svncommit', { 'tags[]': tagsArray },function(data) 
		  {
			  
			  $("#missing-readme").show("slow");
			  $('#missing-readme').html(data);

			  
			  //update added files 
			  $.get('/svnapproval/file/svnst/', function(data) 
			  {
				  $('#changedfiles').html(data);
			  });
			  
			  
		  });
	});
	
	
/*	//when start populate added files  
	
	$.post('/svnapproval/file/svnaddedFiles/', function(data) 
	{
				//  $('#added_files').html(data);
	});
	
	$.post('/svnapproval/file/listfiles/', function(data) 
	{
					//	  $('#resultadoConsulta').html(data);
	});
	
	
	
	
//alert('') ; 
		
	$('#folder').change(function() 
	{
		  alert($('#folder').val());
		  
		  
		  
		  $.post('/svnapproval/file/?folder='+$('#folder').val(), function(data) 
		  {
			  $('#content').html(data);
		  });
		  
		  
	});
	
	
	
	 */ 
});



function opendir(dir) 
{
	
	$.post('/svnapproval/file/listfiles/',{ 'folder':dir+'/' } , function(data) 
			{
				 $('#filemanager').html(data);
			});



}
