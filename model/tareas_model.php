<?php
class TareasModel {

  private $tareas;
  private $db;

  function __construct() {
      $this->db = new PDO('mysql:host=localhost;dbname=tasks;charset=utf8', 'root', '');
      $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  }

  function getTareas(){
    $consulta = $this->db->prepare("SELECT * FROM tarea");
    $consulta->execute();
    return $consulta->fetchAll();
  }

  function agregarTarea($tarea){
    $consulta = $this->db->prepare('INSERT INTO tarea(tarea) VALUES(?)');
    $consulta->execute(array($tarea));
    return $this->db->lastInsertId();
  }

  function borrarTarea($id_tarea){
    $consulta = $this->db->prepare('DELETE FROM tarea WHERE id=?');
    $consulta->execute(array($id_tarea));

    if($consulta->rowCount() > 0)
      return 'Tarea Borrada';
    else
      return 'No se Borro';
  }

  function realizarTarea($id_tarea){
    $consulta = $this->db->prepare('UPDATE tarea SET realizada=1 WHERE id=?');
    $consulta->execute(array($id_tarea));
  }


}
?>
