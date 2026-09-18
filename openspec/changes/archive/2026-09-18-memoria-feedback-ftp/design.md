## Context

Memoria de parejas ya bloquea una tercera selección y oculta fallos con temporizador, pero conserva los aciertos visibles y no comunica explícitamente el resultado. La misma web incorpora dos juegos ilustrados con SVG local.

## Decisions

- Mantener el temporizador de 1,8 segundos solo para fallos.
- Retirar del DOM las dos fichas acertadas para que el tablero avance visualmente.
- Usar el feedback accesible existente (`#game-feedback`) con los textos «Correcto» e «Incorrecto».
- Publicar solo `ingles-to-be/web/` por FTPS en `/`; el workflow escribe y verifica un marcador público.

## Risks / Trade-offs

Las ilustraciones son SVG propias, no imágenes remotas. La locución depende del navegador y conserva alternativa textual. El despliegue depende de los secrets FTP de GitHub, que no se guardan en el repositorio.
