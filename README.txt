Versión 3 - Primer Piso - Sede Principal

Incluye:
- Panel oculto corregido
- Reporte por formulario (abre correo con mailto)
- Visualización de 4 planos de sede principal + mapa general
- Teléfonos de emergencia
- Botón para documento completo (configurable en config.js)
- Otras emergencias en panel oculto
- Notificación de emergencia vía alerta.json con opción de cerrar

Antes de usar:
1. Editar config.js
2. Reemplazar correos de ejemplo por los reales
3. Si tienes enlace del documento completo, pegarlo en documentUrl

Archivo de alertas:
- alerta.json
Ejemplo:
{
  "active": true,
  "title": "Evacuación inmediata",
  "message": "Se solicita evacuar el primer piso y revisar indicaciones.",
  "emergencyKey": "incendio"
}

Versión 4:
- Correos reales incorporados en config.js
- Documento completo apunta al PDF incluido dentro del proyecto
- Opción para activar/desactivar alerta desde la misma app con usuario y clave
- Usuarios autorizados: prevencion, jefe_emergencia, encargado_emergencia

Importante:
- La activación desde la misma app en esta versión es LOCAL al dispositivo/navegador.
- Sirve como control básico de demostración.
- No es un sistema de seguridad robusto ni activa la alerta a todos los usuarios al mismo tiempo.


Versión 5:
- Se quitó 'Plan de emergencia' del bloque Teléfonos de emergencia.
- Se creó un bloque separado 'Plan de Emergencia' con acceso al PDF completo.
- Se eliminó el apartado 'Otras emergencias'.
- Al desactivar la alerta, esta desaparece de la pantalla.
