## ADDED Requirements

### Requirement: Material escolar independiente
El proyecto SHALL conservar la web de inglés y sus especificaciones dentro de la carpeta escolar.

#### Scenario: Localizar la lección
- **WHEN** se consulta el README del proyecto escolar
- **THEN** se encuentran los editables locales y la URL pública para utilizarla desde el móvil.

### Requirement: Traslado íntegro
El traslado SHALL conservar el contenido de todos los archivos de ingles-to-be.

#### Scenario: Comprobar la migración
- **WHEN** se comparan los hashes SHA-256 antes y después del traslado
- **THEN** coinciden para todos los archivos.
