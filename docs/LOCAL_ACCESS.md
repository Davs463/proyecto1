# Acceso local

Abre http://mis-tareas.test en este equipo.

Windows tiene la entrada `127.0.0.1 mis-tareas.test` en su archivo `C:\Windows\System32\drivers\etc\hosts`. Laravel se sirve exclusivamente en la interfaz local, en el puerto 80.

## Iniciar después de reiniciar el equipo

Desde la carpeta `mis-tareas`, ejecuta:

```powershell
php artisan serve --host=127.0.0.1 --port=80 --tries=1 --no-reload
```

Mantén abierta esa terminal. El servidor iniciado por Codex está ejecutándose en segundo plano; no necesitas ejecutar otro mientras siga activo. Sus registros están en `storage/logs/local-domain-server.log` y `storage/logs/local-domain-server-error.log`.

## Archivos de la interfaz

La página utiliza `public/build`, generado mediante `npm.cmd run build`. Después de editar Vue o CSS, vuelve a compilar.

Se movió el marcador `public/hot` a una copia en `storage/app/vite-hot-before-local-domain-*.txt` para utilizar la compilación. No reinicies `npm.cmd run dev` con la configuración actual: volvería a generar el marcador y el origen `http://mis-tareas.test` no está incluido en los orígenes CORS permitidos de Vite. Para volver al flujo anterior, detén y reinicia Vite y abre la dirección anterior del servidor en el puerto 8000.

Este nombre funciona únicamente en este equipo. El servidor debe estar activo y la base de datos disponible.
