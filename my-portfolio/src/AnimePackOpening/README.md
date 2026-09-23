# 🌸 Anime Pack Opening - Guía de Configuración, Variables y Despliegue

Este módulo proporciona la experiencia completa de **Anime Pack Opening** e integración con **Supabase**, junto con las páginas de cumplimiento legal requeridas para la publicación en **Google Play Console** y normativa europea (RGPD / LOPDGDD).

---

## 1. Variables de Entorno Requeridas

Añade las siguientes variables de entorno a tu archivo `.env` en el servidor o proyecto de producción. **Nunca incluyas la clave `service_role` en el frontend.**

```env
# Supabase Backend Configuration (Acceso Público Anon Key)
VITE_SUPABASE_URL=https://[TU-PROYECTO-SUPABASE].supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Formato alternativo si utilizas Expo / React Native:
# EXPO_PUBLIC_SUPABASE_URL=https://[TU-PROYECTO-SUPABASE].supabase.co
# EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 2. Lista Final de Placeholders Legales Pendientes de Confirmación

Los archivos legales contienen marcadores estandarizados claramente identificados para revisión humana antes del lanzamiento final:

| Placeholder | Descripción | Ubicación en Código |
| :--- | :--- | :--- |
| `[AÑADIR NOMBRE LEGAL DEL DESARROLLADOR]` | Nombre de la empresa o nombre del desarrollador responsable | `AnimeFooter.jsx`, `AnimePackOpeningPrivacy.jsx`, `AnimePackOpeningTerms.jsx` |
| `[AÑADIR CORREO DE SOPORTE]` | Correo oficial para soporte técnico y solicitudes ARCO+ (ej: `soporte@sakuraeclipse.com`) | `AnimeFooter.jsx`, `AnimePackOpeningPrivacy.jsx`, `AnimePackOpeningContact.jsx` |
| `[AÑADIR URL DE SUPABASE]` | URL oficial del proyecto Supabase en producción | `AnimePackOpeningPrivacy.jsx` |
| `[AÑADIR DOMINIO OFICIAL]` | Dominio principal de la web (ej: `mikelrivera.com`) | `AnimePackOpeningPrivacy.jsx` |
| `[AÑADIR CIUDAD / PAÍS DE JURISDICCIÓN]` | Ciudad y juzgados competentes | `AnimePackOpeningTerms.jsx` |
| `[AÑADIR PERÍODO DE CONSERVACIÓN ADICIONAL - P. EJ. 30 DÍAS]` | Días de retención legal de logs antes de borrado definitivo | `AnimePackOpeningAccountDeletion.jsx` |

---

## 3. URLs Finales para la Ficha de Google Play Console

Introduce estas URLs en la sección **Política de Privacidad y Contenido de la Aplicación** en Google Play Console. Todas las URLs son públicas, estables y funcionan directamente en ventanas de navegación privada sin requerir inicio de sesión:

- **URL de Política de Privacidad:**  
  `https://[TU-DOMINIO]/animepackopening/privacidad`
- **URL de Eliminación de Cuentas y Datos:**  
  `https://[TU-DOMINIO]/animepackopening/eliminar-cuenta`
- **URL de Términos y Condiciones:**  
  `https://[TU-DOMINIO]/animepackopening/terminos-y-condiciones`
- **URL de Contacto y Soporte Legal:**  
  `https://[TU-DOMINIO]/animepackopening/contacto`
- **URL de Política de Cookies:**  
  `https://[TU-DOMINIO]/animepackopening/cookies`

---

## 4. Instrucciones de Migración de Base de Datos (Supabase)

Para desplegar las tablas, políticas de seguridad RLS y funciones RPC en tu proyecto de Supabase:

1. Accede al panel de tu proyecto en Supabase -> **SQL Editor**.
2. Copia y ejecuta el script ubicado en:  
   `supabase/migrations/20260923_sakura_eclipse_setup.sql`
3. El script creará:
   - Tabla `user_collections` con políticas RLS de usuario.
   - Tabla `user_packs` para gestionar sobres y balance de Esencia.
   - Tabla de auditoría `account_deletion_requests`.
   - Función RPC `request_account_deletion` para tramitar la eliminación de cuenta con confirmación explicita.

---

## 5. Instrucciones de Compilación y Validación

Ejecuta los siguientes comandos desde la raíz del proyecto `my-portfolio`:

```bash
# Validar linter y estilo
npm run lint

# Probar la compilación para producción
npm run build

# Previsualizar el bundle generado
npm run preview
```
