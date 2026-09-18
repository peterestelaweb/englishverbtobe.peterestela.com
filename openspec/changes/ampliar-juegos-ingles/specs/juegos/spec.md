## ADDED Requirements

### Requirement: Partidas variadas
La web SHALL ofrecer siete juegos con selección aleatoria de contenido.

#### Scenario: Repetir una actividad
- **WHEN** el alumno empieza otra partida
- **THEN** el juego se reinicia con orden y contenido seleccionados de nuevo.

### Requirement: Puntuación coherente
Los nuevos juegos SHALL conservar el sistema de puntos y turnos de los existentes.

#### Scenario: Error antes del acierto
- **WHEN** el alumno falla y luego completa una ronda
- **THEN** obtiene 30 puntos y el turno pasa al otro equipo en modo duelo.
