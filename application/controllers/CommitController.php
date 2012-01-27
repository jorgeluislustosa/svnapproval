<?php


class CommitController extends Zend_Controller_Action
{
	
	
	public function init()
	{
		/* Initialize action controller here */
		
	}
	
	public function indexAction() 
	{
		
		$project = $this->loadprojectdata() ; 
		
		$project->name  ;
		$this->view->folder = $project->directory  ; 
		$this->view->project_name = $project->name  ; 
		
		include("../library/phpSVNclient.php") ;
		$project = $this->loadprojectdata() ;
		$svn  = new phpsvnclient;
		
		$svn->setRespository($project->svn_url);
		$svn->setAuth($project->svn_username,$project->svn_password) ;
		$logs = $svn->getRepositoryLogs($svn->getVersion() - 30 );
		
		$this->view->logs  = $logs ;
		
		
		
	}
	
	
	
	private function loadprojectdata()
	{ 
		
		$data = new Application_Model_DbTable_Projects() ;
		$project = $data->find('1') ;
		$row = $project->current();
		return $row  ;
		
	}
	

	
	
	
	
} 
?>