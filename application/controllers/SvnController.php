<?php

class SvnController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        // action body
//echo  "jorge" ; 
    	
    	
    }
    
    
    public function logAction()
    {
    	// action body
    
    	include("../library/phpSVNclient.php") ;

    	$last = $_REQUEST['last'] ; 
    	
    	$svn  = new phpsvnclient;
    	 
    	$svn->setRespository("http://srvsvn-trf1.trf1.gov.br/svn/processual/");
    	 
    	$svn->setAuth("webadm","a1b2c3d4e5f6") ;
    	 
    	 
    	$logs = $svn->getRepositoryLogs($svn->getVersion()-$last);
    	 
    	
    	
    	$this->view->logs = $logs ;
    	
    	
    	
    	
    	//print_r($this->view->logs)  ; 
    	//$logs = $svn->getRepositoryLogs(2);
    	 
    	 
    	 
    }
    
    

}

