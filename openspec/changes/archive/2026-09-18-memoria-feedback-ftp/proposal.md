# Memoria con feedback y publicación FTP

## Why
Mayka solicita que Memoria de parejas dé una respuesta inmediata y continúe sin un botón manual. También solicita publicar esta mejora junto con los juegos visuales en `englishverbtobe.peterestela.com`.

## What Changes
- Mostrar «Correcto» o «Incorrecto» al descubrir dos fichas.
- Retirar del tablero las parejas acertadas.
- Ocultar automáticamente las parejas fallidas y bloquear una tercera selección durante la espera.
- Publicar únicamente `ingles-to-be/web/` mediante FTPS y verificar el marcador y el HTML público.

## Impact
Web estática sin dependencias nuevas. La publicación requiere la contraseña FTP disponible en el entorno de despliegue; no se guarda en el proyecto.
