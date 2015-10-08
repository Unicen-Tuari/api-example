<?php
require_once 'tarea_api.php';

$tareaAPI = new TareaAPI($_REQUEST['parametros']);
echo $tareaAPI->processAPI();
?>
