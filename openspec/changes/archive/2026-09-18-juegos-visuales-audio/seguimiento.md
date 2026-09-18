# Seguimiento · 18-09-2026

Implementado, verificado y publicado en https://ingles-pronombres-to-be.netlify.app/#juegos.

- Memoria: errores se ocultan tras 1,8 segundos, tercera tarjeta bloqueada y temporizador cancelado al cambiar/reiniciar.
- Dos juegos nuevos: Mira y completa; Escucha y encuentra. Ocho escenas SVG propias, selección aleatoria, voz inglesa voluntaria, alternativa textual y silencio global. Puntuación y récords separados.
- Código: games.js, illustrated-games.js, competition.js, index.html y styles.css en ingles-to-be/web.
- Pruebas: ingles-to-be/qa/visual-audio.cjs y visual-audio-results.json. Partidas completas, fallo/puntos, silencio, invocación de voz, cancelación al cambiar de juego y cuatro anchos. Regresión de siete juegos superada con expanded.cjs (incluye duelo y cinco anchos). Captura móvil revisada.
- Publicación: qa/publication-visual-audio.json; todos los archivos públicos coinciden por SHA-256 en qa/publication-visual-audio-hashes.json. Solo se ha publicado web/.
- Límites: voz comprobada mediante stub de síntesis, no escucha humana ni dispositivo iPhone físico. No son grabaciones de locutor. No se han añadido servicios de audio externos.
- Siguiente paso de uso: probar Escuchar en el dispositivo habitual y comprobar si el ritmo de 1,8 segundos resulta cómodo. La revisión editorial general del material sigue en su cambio previo.
