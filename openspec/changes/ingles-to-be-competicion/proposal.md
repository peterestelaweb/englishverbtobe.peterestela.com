# Colores, sonidos y competición · 2026-09-15
Mayka solicita colores, sonidos y marcadores para estimular competición en los juegos publicados.

Implementar colores vivos accesibles; sonidos sintetizados por Web Audio tras interacción y control silenciar; marcador en vivo, rachas y bonus; modo individual o dos participantes/equipos por turnos en el mismo dispositivo; nombres opcionales; clasificación local por juego y modo. Primer intento: 100 puntos + bonus de racha (10 por acierto anterior, máximo 50); con error/pista: 30; detective incorrecto: 0. No restar puntos. Una ronda por turno, mismos números de turnos. Récords solo de partidas completadas. Explicar almacenamiento en este navegador; fallo de almacenamiento no bloquea juego. Mantener controles táctiles/teclado y movimiento reducido.

Tareas: construir, probar puntuaciones/modos/sonidos/almacenamiento/móvil, publicar y verificar archivos remotos.

## Resultado
- [x] Colores, tonos Web Audio silenciables y respuestas visuales.
- [x] Individual y duelo, marcador, rachas, bonus y clasificación local.
- [x] Tres juegos completos sin regresiones; competición, almacenamiento, silencio y cinco anchos comprobados.
- [x] Publicado y archivos públicos verificados. Deploy 6aa91dfe70dd7a6aef8129d6.
Evidencias: piezas/ingles-to-be/qa/competition-results.json y publication-competition.json. Verificación de audio por generación de osciladores y silencio; no escucha física. Revisión editorial de Mayka pendiente.
