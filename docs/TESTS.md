# Verificación

## 2026-10-21: acceso mediante nombre local

- `php artisan test`: correcto, 2 pruebas y 2 aserciones. Estas pruebas existentes no cubren el CRUD.
- `npm.cmd run build`: correcto. Se observaron avisos de Lightning CSS sobre directivas de Tailwind (`@theme`, `@tailwind`, `@source`), sin impedir la compilación.
- `php artisan route:list --except-vendor`: ruta principal y cuatro operaciones de API registradas.
- `http://mis-tareas.test/`: HTTP 200 usando la resolución de nombres del equipo.
- JavaScript y CSS compilados referenciados por la página: HTTP 200, sin referencias al puerto 5173.
- API mediante el nuevo nombre: creación, listado, actualización a completada y eliminación correctos. Se utilizó una tarea temporal y se comprobó su eliminación; no se modificaron tareas existentes.
- La comprobación HTTP no sustituye una revisión visual en el navegador.
