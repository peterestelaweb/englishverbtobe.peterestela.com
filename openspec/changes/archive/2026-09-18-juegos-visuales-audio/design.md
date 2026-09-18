## Context
Juego estático de inglés, siete modos existentes, competición y síntesis de tonos locales. Se conserva el diseño vigente.
## Decisions
- Memoria: espera de 1,8 segundos, bloqueo de tercera tarjeta, cancelación al reiniciar/cambiar, foco devuelto solo si sigue en el juego.
- Ocho escenas SVG propias (gatos, pelotas, árboles y estrellas, singular/plural), sin descarga remota de imágenes.
- Dos juegos de ocho retos; misma puntuación y clasificación separada por modo. Voz en inglés a velocidad 0,8 mediante el navegador, solo al pulsar Escuchar. Silencio global, repetir y alternativa textual.
- No asumir disponibilidad ni calidad de voz en todos los dispositivos. No hay escucha humana certificada ni prueba física de iPhone.
## Risks / Trade-offs
La espera fija mejora el ritmo, aunque puede ser breve para lectores lentos. Las voces dependen del dispositivo; mostrar la frase mantiene jugable el reto.
