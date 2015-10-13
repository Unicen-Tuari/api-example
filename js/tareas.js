// function createTarea(tarea){
//   var element = '<li id="tarea' + tarea.id + '"class="list-group-item">'
//   if(tarea.realizada == 1)
//     element += '<s>' + tarea.tarea + '</s>';
//   else
//     element += tarea.tarea;
//  element += '<a class="glyphicon glyphicon-trash borrar" idtarea=' + tarea.id +'></a>'
//  element += '<a class="glyphicon glyphicon-ok" idtarea=' + tarea.id +'></a>'
//  element += '</li>';
//  return element;
// }

function fixRealizada(tarea){
  if(tarea.realizada === '0')
    tarea.realizada = false;
  else
    tarea.realizada = true;
  return tarea;
}


function crearTarea(tarea) {
  $.ajax({ url: 'js/templates/tareas.mst',
     success: function(template) {
       var rendered = Mustache.render(template, fixRealizada(tarea));
       $('#listaTareas').append(rendered);
      }
    });
}

function borrarTarea(idTarea){
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
}

function cargarTareas(){
  $.ajax( "api/tarea" )
  .done(function(tareas) {
    $('li').remove();
    for(var key in tareas) {
      crearTarea(tareas[key]);
    }
  })
  .fail(function() {
      $('#listaTareas').append('<li>Imposible cargar la lista de tareas</li>');
  });
}

function agregarTarea(){
  $.ajax(
    {
      method: "POST",
      url: "api/tarea",
      data: { tarea: $('#task').val() }
    })
  .done(function(idTarea) {
    tarea = {tarea:$('#task').val(), realizada:'0', id:idTarea  };
     $('#listaTareas').append(crearTarea(tarea));
     $('#task').val('');
  })
  .fail(function() {
      $('#listaTareas').append('<li>Imposible agregar la tarea</li>');
  });
}

function realizarTarea(idTarea){
  $.ajax(
    {
      method: "PUT",
      url: "api/tarea/" + idTarea
    })
  .done(function() {
    $('#listaTareas').html="";
    cargarTareas();
  })
  .fail(function() {
      alert('Imposible realizar la tarea');
  });
}

$('body').on('click', 'a.borrar', function() {
  idTarea = this.getAttribute('idtarea');
  borrarTarea(idTarea);
});

$('body').on('click', 'a.realizar', function() {
  idTarea = this.getAttribute('idtarea');
  realizarTarea(idTarea);
});

$(document).ready(function() {
  $('#refresh').click(function(event){
    event.preventDefault();
    cargarTareas();
  });

  $('#addTarea').submit(function(event){
    event.preventDefault();
    agregarTarea();
  });

  cargarTareas();
});
