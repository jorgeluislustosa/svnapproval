$(document).ready(function()
{

	//when start populate added files  
	
	$.post('/svnapproval/file/svnaddedFiles/', function(data) 
	{
				  $('#added_files').html(data);
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
			  
			  //update added files 
			  $.get('/svnapproval/file/svnaddedFiles/', function(data) 
			  {
				  $('#added_files').html(data);
			  });
			  
			  
		  });
		  
		  
	});
	
	
	 
	 
	 
	
	
	
	
	
}); 