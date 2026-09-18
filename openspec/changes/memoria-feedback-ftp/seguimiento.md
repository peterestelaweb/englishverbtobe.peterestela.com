# Seguimiento · 18-09-2026

## Estado

Implementado localmente y verificado en navegador; publicación FTP pendiente de contraseña.

## Hecho

- Memoria informa «Correcto»/«Incorrecto».
- Las parejas acertadas se eliminan del tablero.
- Las parejas fallidas se ocultan automáticamente tras 1,8 segundos; se mantiene el bloqueo de una tercera ficha.
- La portada y README reflejan nueve juegos, incluidos los dos juegos ilustrados ya presentes.
- Marcador preparado: `ftp-visual-memory-2026-09-18`.
- QA específico: `qa/memory.cjs` pasa; `qa/visual-audio.cjs` pasa tras actualizar el flujo de Memoria.

## Siguiente paso

Con la contraseña FTP disponible, publicar `web/` por FTPS con `server-dir=/`, verificando `deploy-marker.txt` y el HTML público.
