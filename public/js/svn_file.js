$(document).ready(function()
{

	$.post('/svnapproval/file/listfiles/', function(data) 
	{
		 $('#filemanager').html(data);
	});

	$.post('/svnapproval/file/svnst/', function(data) 
	{
		
		// when no have data to show !!! 
		if(data.length == 3 )
		{ 
			 
			$('#fileschange').hide();
		}
		else
		{ 
			$('#changedfiles').html(data);
		}
		
		
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
				  
				  	if(data.length == 3 )
					{ 
						 
						$('#fileschange').hide();
					}
					else
					{ 
						$('#changedfiles').html(data);
					}
				  
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
	    	 $('#changedfiles').html('loading');
	     })  
		   
	     
	     
		  $.post('/svnapproval/file/svncommit', { 'tags[]': tagsArray },function(data) 
		  {
			  
			  
			  
			  $("#missing-readme").show("slow");
			  $('#missing-readme').html(data);

			  
			  //update added files 
			  $.get('/svnapproval/file/svnst/', function(data) 
			  {
				  
				  	if(data.length == 3 )
					{ 
						 
						$('#fileschange').hide();
					}
					else
					{ 
						$('#changedfiles').html(data);
					}
			
			  });
			  
			  
		  });
	});
	
	
});



function opendir(dir) 
{
	
	
	
	
	$.post('/svnapproval/file/listfiles/',{ 'folder':dir+'/' } , function(data) 
			{
				 $('#filemanager').html(data);
			});



}
