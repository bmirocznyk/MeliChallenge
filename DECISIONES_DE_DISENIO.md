Elegí trabajar con una arquitectura hexagonal porque me permite estructurar la aplicación de forma clara, separando responsabilidades y facilitando tanto el mantenimiento como la escalabilidad del sistema. Me resulta natural pensar en capas —dominio, aplicación, infraestructura e interfaces—, ya que esta organización ayuda a que los cambios en la lógica de negocio o en la persistencia no impacten en otras áreas, y además simplifica la escritura y mantenimiento de los tests.

También decidí aislar el servicio de compras en un servidor independiente. Aunque se trata de un prototipo, me esto perite simular una aproximación la implementación de microservicios.

Desafíos principales
Uno de los mayores retos fue lograr una persistencia real de los datos. Al principio, las actualizaciones en las cantidades disponibles de productos solo se almacenaban en memoria, por lo que se perdían al reiniciar el servidor o recargar la página. Tuve que revisar detalladamente el flujo de actualización para asegurarme de que cada modificación se guardara correctamente en los archivos JSON, y que el backend leyera siempre el estado actualizado desde disco.

Otro desafío fue evitar caer en la sobreingeniería. Al inicio, surgía la tentación de incorporar funcionalidades, atributos o endpoints. Sin embargo, opté por mantener solo lo esencial para el prototipo, lo cual resultó clave para simplificar el código y facilitar tanto la revisión como el testing.

Además, enfrenté dificultades con la sincronización entre frontend y backend, especialmente relacionadas con la caché y la consistencia de datos. Aprendí a diagnosticar con mayor precisión si el origen del problema estaba en el cliente, en el servidor o en la capa de persistencia.

- **Sincronización entre frontend y backend:** Se me presentaron dificultades relacionadas con la consistencia de datos y la gestión de caché. Abordé este desafío revisando los flujos de actualización y asegurando que el backend siempre proporcionara el estado más reciente de los objetos, como `Product` y `Seller`.

Implementé tests unitarios que validaran los casos de uso y el comportamiento de los repositorios ante distintos escenarios.

En resumen, el mayor aprendizaje fue encontrar el equilibrio entre una arquitectura sólida y la simplicidad necesaria para construir un prototipo funcional, priorizando la claridad, la mantenibilidad y el valor concreto de cada componente.

