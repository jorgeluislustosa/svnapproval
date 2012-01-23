<?php


class FileController extends Zend_Controller_Action
{
	
	
	
	public function init()
	{
		/* Initialize action controller here */
	}
	
	public function indexAction() 
	{
		
		
		$this->home() ; 
		
	}
	
	
	public function home() 
	{
		
		global $folder, $tbcolor1, $tbcolor2, $tbcolor3, $filefolder, $HTTP_HOST;
		
		$op = $_REQUEST['op'];
		$folder = $_REQUEST['folder'];
		
		if($folder=="") $folder = "/d01/svnapproval/" ; 
		
	
		$count = "0";
		$style = opendir($folder);
		$a=1;
		$b=1;
	
		
		if ($folder) {
			if (ereg("/home/",$folder)) {
				$folderx = ereg_replace("$filefolder", "", $folder);
				$folderx = "http://".$HTTP_HOST."/".$folderx;
			} else {
				$folderx = $folder;
			}
		}
	
		while($stylesheet = readdir($style)) {
			if (strlen($stylesheet)>40) {
				$sstylesheet = substr($stylesheet,0,40)."...";
			} else {
				$sstylesheet = $stylesheet;
			}
			if ($stylesheet[0] != "." && $stylesheet[0] != ".." ) {
				if (is_dir($folder.$stylesheet) && is_readable($folder.$stylesheet)) {
					
					$content[$a]["NAME"] = $folder.$stylesheet ;
					$content[$a]["TYPE"] = "D";
					$a++;
				} elseif (!is_dir($folder.$stylesheet) && is_readable($folder.$stylesheet)) {
					
					$content[$a]["NAME"] = $folderx.$stylesheet ;
					$content[$a]["TYPE"] = "F";
					$a++;
					
				} else {
				//	echo "Directory is unreadable\n";
				}
				$count++;
			} 
		}
		closedir($style);

		
		$svn_st = shell_exec("/usr/bin/svn status /d01/svnapproval/. ") ;

		if($svn_st != "")
		{ 
			//echo "erro" ; 
			
			$status = explode("\n",$svn_st) ;
				
			
			//$status = explode("       ",$svn_st) ;

			for($i = 0 ; sizeof($status) > $i ; $i ++)
			{ 
				$parts = explode("       ",$status[$i]) ;
				//print_r($parts) ; 
				//echo $status[$i]."<br>" ; 
				$array_status["".$parts[1].""]=$parts[0] ; 
			}
			
			
		}
		
		//print_r($array_status) ; 
		
		$this->view->content  = $content ;
		$this->view->status = $content ;
		
		
		
	}
	
	
	
	
} 
?>