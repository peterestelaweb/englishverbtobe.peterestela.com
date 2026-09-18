# juegos-visuales-audio Specification

## Purpose
Hacer más fluida la memoria bilingüe y practicar el verbo to be mediante ilustraciones y escucha accesible.

## Requirements

### Requirement: Memoria automática
El juego SHALL ocultar las parejas incorrectas tras 1,8 segundos y bloquear una tercera selección durante ese intervalo.
#### Scenario: Reinicio durante la espera
- **WHEN** se reinicia o cambia de juego antes de ocultar
- **THEN** el temporizador anterior se cancela y no altera la nueva partida.

### Requirement: Juegos ilustrados y escucha
Los juegos SHALL ofrecer ilustraciones locales, retos de verbo y escucha con reproducción voluntaria, alternativa textual y compatibilidad con puntuación individual/duelo.
#### Scenario: Audio no disponible
- **WHEN** no hay síntesis de voz o está silenciada
- **THEN** se puede resolver el reto mediante una pista textual sin bloquear la partida.
