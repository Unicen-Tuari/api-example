function createTarea(tarea){
  var element = '<li id="tarea' + tarea.id + '"class="list-group-item">'
  if(tarea.realizada == 1)
    element += '<s>' + tarea.tarea + '</s>';
  else
    element += tarea.tarea;
 element += '<a class="glyphicon glyphicon-trash borrar" idtarea=' + tarea.id +'></a>'
 element += '<a class="glyphicon glyphicon-ok" idtarea=' + tarea.id +'></a>'
 element += '</li>';
 return element;
}

function cargarTareas(){
  $.ajax( "api/tarea" )
  .done(function(tareas) {
    $('li').remove();
    for(var key in tareas) {
     $('#listaTareas').append(createTarea(tareas[key]));
    }
  })
  .fail(function() {
      $('#listaTareas').append('<li>Imposible cargar la lista de tareas</li>');
  });
}

$('body').on('click', 'a.borrar', function() {
  idTarea = this.getAttribute('idtarea');
  $.ajax(
    {
      method: "DELETE",
      url: "api/tarea/" + idTarea
    })
  .done(function() {
     $('#tarea'+idTarea).remove();
  })
  .fail(function() {
      alert('Imposible borrar la tarea');
  });
});

$(document).ready(function() {
  $('#refresh').click(function(event){
    event.preventDefault();
    cargarTareas();
  });

  $('#addTarea').submit(function(event){
    event.preventDefault();
    $.ajax(
      {
        method: "POST",
        url: "api/tarea",
        data: { tarea: $('#task').val() }
      })
    .done(function(idTarea) {
      tarea = {tarea:$('#task').val(), realizada:0, id:idTarea  };
       $('#listaTareas').append(createTarea(tarea));
       $('#task').val('');
    })
    .fail(function() {
        $('#listaTareas').append('<li>Imposible agregar la tarea</li>');
    });
  });
});
