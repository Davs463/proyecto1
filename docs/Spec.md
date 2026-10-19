# Especificación - Mis Tareas

## Objetivo
Desarrollar una aplicación web sencilla para administrar tareas personales, permitiendo registrar actividades, consultar su estado, completarlas y eliminarlas.

## Alcance
La aplicación permitirá crear, listar, actualizar y eliminar tareas. No incluirá autenticación, usuarios múltiples ni despliegue en producción.

## Tecnologías
- Backend: PHP con Laravel.
- Frontend: Vue 3.
- Base de datos: MySQL, sujeto a confirmación del cambio respecto a SQLite solicitado en el documento original.
- Comunicación: API JSON.
- Control de versiones: Git y GitHub.

## Modelo de datos
Task:
- id: identificador único.
- title: texto obligatorio, máximo 255 caracteres.
- completed: booleano, inicialmente falso.
- created_at: fecha de creación.
- updated_at: fecha de actualización.

## Historias de usuario
- Como usuario quiero crear una tarea para recordar mis actividades.
- Como usuario quiero ver mis tareas y conocer su estado.
- Como usuario quiero marcar o desmarcar tareas completadas para controlar mi avance.
- Como usuario quiero eliminar tareas que ya no necesito.

## Requisitos funcionales
1. Mostrar todas las tareas almacenadas.
2. Crear tareas con títulos no vacíos.
3. Cambiar el estado entre pendiente y completada.
4. Eliminar tareas después de solicitar confirmación.
5. Mostrar un mensaje cuando no existan tareas.
6. Mostrar errores comprensibles cuando una operación falle.
7. Conservar los cambios después de recargar la página.
8. Centralizar los textos visibles en un archivo de traducciones.

## Criterios de aceptación
- Dado un título válido, cuando agrego una tarea, entonces aparece en la lista y queda guardada.
- Dado un título vacío o solo con espacios, cuando intento guardar, entonces se rechaza y aparece un mensaje de validación.
- Dada una tarea pendiente, cuando cambio su estado, entonces aparece completada y viceversa.
- Dada una tarea, cuando solicito eliminarla, entonces se pide confirmación antes de borrarla.
- Dada una lista vacía, cuando abro la aplicación, entonces aparece un mensaje informativo.
- Dada una operación fallida, cuando el servidor responde con error, entonces aparece un mensaje comprensible.
- Dado un cambio guardado, cuando recargo la página, entonces el cambio permanece.
- Dado un cambio en es.json, cuando actualizo la aplicación, entonces la etiqueta correspondiente cambia sin editar el componente Vue.

## Casos límite
- Títulos vacíos o que contienen solamente espacios.
- Títulos que exceden 255 caracteres.
- Lista de tareas vacía.
- Errores del servidor o de conexión.
- Tareas inexistentes.
- Persistencia después de recargar.

## Arquitectura
Vue 3 presentará la interfaz y enviará solicitudes HTTP a la API JSON de Laravel. Laravel validará las solicitudes, procesará las operaciones mediante el modelo Task y almacenará los registros en la base de datos.