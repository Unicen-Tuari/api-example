<?php
include_once 'view/tareas_view.php';
include_once 'model/tareas_model.php';

class TareasController {

  private $model;
  private $view;

  function __construct() {
    $this->model = new TareasModel();
    $this->view = new TareasView();
  }

  function mostrarHome(){
    $this->view->mostrar($this->model->getTareas());
  }

  function agregarTarea(){
    if(isset($_REQUEST['task'])){
        $this->model->agregarTarea($_REQUEST['task']);
      }
    else{
      $this->view->mostrarError('La tarea que intenta crear esta vacia');
    }
    $this->mostrarHome();
  }

  function borrarTarea(){
    if(isset($_REQUEST['id_task'])){
      $this->model->borrarTarea($_REQUEST['id_task']);
    }
    else{
      $this->view->mostrarError('La tarea que intenta borrar no existe');
    }
    $this->mostrarHome();
  }

  function realizarTarea(){
    if(isset($_REQUEST['id_task'])){
      $this->model->realizarTarea($_REQUEST['id_task']);
    }
    else{
      $this->view->mostrarError('La tarea que intenta realizar no existe');
    }
    $this->mostrarHome();
  }

}

?>
