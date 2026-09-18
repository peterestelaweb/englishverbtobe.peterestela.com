## MODIFIED Requirements

### Requirement: Memoria automática
El juego SHALL mostrar un resultado inmediato al descubrir dos fichas. Si forman pareja, SHALL mostrar «Correcto» y retirar ambas del tablero; si no forman pareja, SHALL mostrar «Incorrecto», mantenerlas visibles durante 1,8 segundos y ocultarlas después. Durante ese intervalo SHALL bloquear una tercera selección. Al reiniciar o cambiar de juego SHALL cancelar el temporizador pendiente.

#### Scenario: Pareja correcta
- **WHEN** se descubren dos fichas del mismo par
- **THEN** se muestra «Correcto», las dos fichas desaparecen y el jugador puede continuar.

#### Scenario: Pareja incorrecta
- **WHEN** se descubren dos fichas de pares distintos
- **THEN** se muestra «Incorrecto», no se permite una tercera ficha y las dos se ocultan automáticamente tras 1,8 segundos.

#### Scenario: Reinicio durante la espera
- **WHEN** se reinicia o cambia de juego antes de ocultar
- **THEN** el temporizador anterior se cancela y no altera la nueva partida.
