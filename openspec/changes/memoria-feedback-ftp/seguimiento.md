# Seguimiento · 18-09-2026

## Estado

Implementado, verificado en navegador y publicado por FTPS.

## Hecho

- Memoria informa «Correcto»/«Incorrecto».
- Las parejas acertadas se eliminan del tablero.
- Las parejas fallidas se ocultan automáticamente tras 1,8 segundos; se mantiene el bloqueo de una tercera ficha.
- La portada y README reflejan nueve juegos, incluidos los dos juegos ilustrados ya presentes.
- Marcador preparado: `ftp-visual-memory-2026-09-18`.
- QA específico: `qa/memory.cjs` pasa; `qa/visual-audio.cjs` pasa tras actualizar el flujo de Memoria.

## Siguiente paso

Publicación completada mediante `web/` por FTPS con `server-dir=/`; queda como siguiente paso la revisión editorial y de uso en el dispositivo de Mayka.

## Publicación verificada

- Repositorio: `peterestelaweb/englishverbtobe.peterestela.com`.
- Workflow: `deploy-englishverbtobe.yml`.
- Run: `35313803686`.
- Commit desplegado: `d83ee32c92db9ac6f5227ace08dd60b7ec1e797c`.
- URL pública: https://englishverbtobe.peterestela.com/
- Marcador público confirmado con commit, run y hora UTC.
- HTML público confirmado con «Nueve juegos. Una nueva aventura.» y `illustrated-games.js`.
