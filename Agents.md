# Reglas de desarrollo - Mis Tareas

## Antes de modificar código
1. Leer docs/SPEC.md y docs/PLAN.md.
2. Respetar sus criterios de aceptación.
3. Actualizar ambos documentos si cambian los requisitos.

## Convenciones
- Backend: Laravel y PHP.
- Frontend: Vue 3.
- Comunicación mediante API JSON.
- Base de datos: MySQL, pendiente de confirmar formalmente.
- Utilizar nombres claros y código sencillo.
- Centralizar los textos visibles en resources/js/locales/es.json.
- Validar los títulos en Laravel.

## Seguridad
- Nunca subir .env, contraseñas, tokens ni claves.
- Revisar git status antes de cada commit.
- No subir vendor ni node_modules.

## Verificación
- Ejecutar php artisan test.
- Ejecutar npm.cmd run build.
- Probar creación, listado, actualización y eliminación.
- Registrar resultados en docs/TESTS.md.

## Git
- Trabajar en feature/mis-tareas.
- Crear commits descriptivos.
- Subir los cambios al repositorio remoto.

## Inteligencia artificial
- Revisar y comprender el código asistido por IA.
- Registrar su utilización en docs/AI_USAGE.md.