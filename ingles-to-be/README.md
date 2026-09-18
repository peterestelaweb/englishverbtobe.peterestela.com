# Pronombres + to be

Lección interactiva publicada: https://ingles-pronombres-to-be.netlify.app

## Uso
1. Elige un pronombre y lee su significado.
2. Pulsa **Unir al verbo** para ver su correspondencia con am, is o are.
3. Avanza por afirmativo, interrogativo y negativo; puedes cambiar de pronombre en cualquier paso.
4. **Repetir** reproduce la unión o el cambio de orden. **Reproducir** recorre los ocho pronombres de cada paso, cada 4,5 segundos; se puede pausar.
5. Completa las ocho preguntas de práctica. La puntuación cuenta respuestas correctas al primer intento.

## Archivos
- `web/`: los únicos archivos publicados; HTML, CSS y JavaScript editables. Abrir index.html también funciona sin servidor ni conexión.
- `FICHA.md`: encargo y alcance.
- `qa/`: comprobaciones, contraste y capturas a 320, 375, 414, 768 y 1280 px.
- `netlify.toml`: configuración de publicación.

## Validación · 2026-09-15
30 combinaciones de tamaño/paso sin desbordamiento, 40 estados de contenido, práctica completa incluyendo error y reinicio, avance automático y pausa, movimiento reducido. Revisión visual escritorio y móvil; menú móvil corregido en segunda pasada. Cinco pares de contraste medidos, mínimo 5,57:1. Sin errores de JavaScript.

Limitaciones: HTML sin locución ni exportación MP4; las fuentes usan las disponibles en cada dispositivo. No se ha probado en un iPhone físico. Aprobación editorial final de Mayka pendiente.

## Publicación
Sitio independiente creado en PETER WEB. ID: `9e8f75b0-bda4-411b-a19a-4d2b259dcd6d`.
Despliegue: `6aa90f882a57ad0a77d64124`.
Se verifica la URL pública comparando SHA-256 de los cinco archivos con los locales: `qa/publication.json`.
Solo se publica `web/`; documentación y QA permanecen locales.

## Juegos · actualización 2026-09-15
Acceso directo: https://ingles-pronombres-to-be.netlify.app/#juegos

- Encuentra su verbo: ocho parejas pronombre/verbo; selecciona primero el pronombre y luego am/is/are.
- Construye la frase: seis frases desordenadas; toca palabras, deshaz, vacía o consulta una pista. Las pistas y errores dejan de contar esa ronda como acierto al primer intento.
- Detective de frases: ocho frases para decidir si son correctas; tras responder se muestra la explicación y, cuando procede, la corrección.

Orden aleatorio en cada nueva partida. Sin reloj, cuentas ni datos remotos. El progreso de la partida dura mientras se mantiene el juego activo; Nueva partida o cambiar de juego lo reinicia. Los récords se conservan en este navegador. Cada juego muestra resultado y permite repetir.

Editable añadido: `web/games.js`. Pruebas: `qa/games-results.json`, capturas `qa/games-*.png`. Tres juegos completos, errores, puntuación, deshacer, reinicio, selección sin pronombre y navegación a lección/práctica; comprobados en cinco anchos. Cambio: `openspec/changes/ingles-to-be-juegos/`.

## Competición, colores y sonidos · 2026-09-15
- Colores azul, naranja y violeta para los juegos y piezas; verde/rojo con explicación escrita tras respuestas.
- Sonidos breves sintetizados localmente (selección, acierto, error y final). Sonido activado por defecto después de la primera interacción; botón para silenciar. La reproducción depende del dispositivo/navegador.
- Ajustes: individual o dos jugadores/equipos en el mismo dispositivo; escribe nombres y pulsa **Empezar partida**. Cambiar ajustes sin pulsar el botón no altera la partida.
- 100 puntos por primer intento, bonus de 10 por acierto previo en racha hasta 50; con error/pista 30; error de Detective 0. No se restan puntos. Cada pareja/frase completada pasa el turno; Detective pasa turno tras cada respuesta.
- Marcador en vivo, racha individual, empate/ganador y marcador compacto visible durante el juego.
- Top 5 de partidas completadas por juego y modo. Se guarda en localStorage de este navegador; no es clasificación online ni compartida entre dispositivos. Los nombres se guardan como texto local. Sin almacenamiento permitido, funciona durante la sesión.
- Nueva partida o cambio de juego reinicia puntos y rachas; conserva clasificación. Los modos no se mezclan porque tienen diferente número de rondas por participante.

Editable nuevo: `web/competition.js`. Pruebas en `qa/competition-results.json`: empate 460–460 con cuatro turnos por equipo, puntos con ayuda y reinicio de racha, generación de tonos y silencio, persistencia, almacenamiento bloqueado, movimiento reducido y cinco anchos. No se ha hecho escucha humana en altavoces físicos.

## Nueve juegos y dibujos · 2026-09-18
Añadidos La palabra perdida (56 retos), Respuestas cortas (64), Cambia la frase (112), Memoria de parejas (12 parejas posibles, 6 por partida), Mira y completa (ilustraciones SVG) y Escucha y encuentra (ilustraciones SVG con locución voluntaria). Construye la frase selecciona 6 de 168 frases y Detective selecciona 8 de 224 casos. Las partidas se sortean de nuevo, sin reloj.

En Memoria, al descubrir dos fichas se informa inmediatamente si es **Correcto** o **Incorrecto**. Las parejas acertadas desaparecen del tablero; las parejas fallidas se ocultan automáticamente y permiten continuar sin botón adicional.

Se mantienen puntos, sonidos, modo individual/duelo y récords por juego y modo. Memoria conserva el turno durante la búsqueda de una pareja; los intentos fallidos rompen la racha y reducen esa pareja a 30 puntos.

Banco editable: web/game-bank.js. Validación vigente: qa/expanded.cjs y qa/expanded-results.json (los antiguos scripts de juegos con bancos fijos documentan la versión previa). Pruebas de siete partidas, errores, puntos, duelo, persistencia, reinicio, teclado, movimiento reducido, almacenamiento bloqueado y cinco anchos. Revisión visual de capturas móvil/escritorio. No probado en un teléfono físico.

## Juegos visuales y audio · 18-09-2026
Memoria oculta automáticamente las parejas incorrectas tras 1,8 segundos. Nuevos juegos **Mira y completa** y **Escucha y encuentra**, con ocho ilustraciones SVG propias, frase hablada en inglés al pulsar Escuchar y opción Mostrar frase. Silencio, puntuación y clasificación integrados. La voz depende del navegador/dispositivo. Ver qa/visual-audio-results.json y qa/publication-visual-audio-hashes.json. Publicado en el mismo sitio.
