# 🌸 Anime Pack Opening - Guía de Configuración, Datos Legales y Despliegue

Este módulo proporciona la experiencia oficial y centro legal para **Anime Pack Opening** (Sakura Eclipse), incluyendo la integración con **Supabase**, revelación de **Google AdMob** y cumplimiento con **Google Play Console** y normativa europea (RGPD / LOPDGDD).

---

## 1. Datos Oficiales del Desarrollador y Dominio

- **Desarrolladores Oficiales:** Mikel Rivera Guerrero & Luis Estival Cantó
- **Correo Electrónico de Soporte:** `mikelrg2003@gmail.com`
- **Teléfono de Contacto:** `+34 688 85 15 80`
- **Dominio Oficial de la Web:** `https://mikelrivera.com/animepackopening`
- **Red Publicitaria Móvil:** Google AdMob (Google LLC)

---

## 2. Variables de Entorno Requeridas

Añade las siguientes variables de entorno a tu archivo `.env` en el servidor o proyecto de producción:

```env
# Supabase Backend Configuration (Acceso Público Anon Key)
VITE_SUPABASE_URL=https://demo-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Formato alternativo si utilizas Expo / React Native:
# EXPO_PUBLIC_SUPABASE_URL=https://demo-project.supabase.co
# EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 3. URLs Finales para la Ficha de Google Play Console

Introduce estas URLs en la sección **Política de Privacidad y Contenido de la Aplicación** en Google Play Console. Todas las URLs son públicas, estables y funcionan directamente sin requerir inicio de sesión:

- **URL de Política de Privacidad:**  
  `https://mikelrivera.com/animepackopening/privacidad`
- **URL de Eliminación de Cuentas y Datos:**  
  `https://mikelrivera.com/animepackopening/eliminar-cuenta`
- **URL de Términos y Condiciones:**  
  `https://mikelrivera.com/animepackopening/terminos-y-condiciones`
- **URL de Contacto y Soporte Legal:**  
  `https://mikelrivera.com/animepackopening/contacto`
- **URL de Política de Cookies:**  
  `https://mikelrivera.com/animepackopening/cookies`

---

## 4. Declaración de Google AdMob en la Política de Privacidad

La Política de Privacidad (`AnimePackOpeningPrivacy.jsx`) incluye la declaración explícita requerida por Google Play para aplicaciones que utilizan **Google AdMob**:
- Declaración de recopilación de Advertising IDs (GAID/IDFA).
- Finalidad: entrega de anuncios recompensados, banners e intersticiales, y prevención del fraude publicitario.
- Enlace directo a la [Política de Privacidad de Google](https://policies.google.com/privacy).

---

## 5. Instrucciones de Migración de Base de Datos (Supabase)

Para desplegar las tablas, políticas de seguridad RLS y funciones RPC en tu proyecto de Supabase:

1. Accede al panel de tu proyecto en Supabase -> **SQL Editor**.
2. Copia y ejecuta el script ubicado en:  
   `supabase/migrations/20260923_sakura_eclipse_setup.sql`
3. El script creará:
   - Tabla `user_collections` con políticas RLS de usuario.
   - Tabla `user_packs` para gestionar sobres y balance de Esencia.
   - Tabla de auditoría `account_deletion_requests`.
   - Función RPC `request_account_deletion` para tramitar la eliminación de cuenta con confirmación explícita.

---

## 6. Instrucciones de Compilación y Validación

Ejecuta los siguientes comandos desde la raíz del proyecto `my-portfolio`:

```bash
# Validar linter y estilo
npm run lint

# Probar la compilación para producción
npm run build

# Previsualizar el bundle generado
npm run preview
```

## 7. Idiomas

El portal admite español e inglés. La prioridad es el parámetro `?lang=es` o `?lang=en`, la selección manual guardada y el idioma del navegador; si no se reconoce, se utiliza español. El selector actualiza también un parámetro `lang` existente para mantener la elección al recargar. Los diccionarios se encuentran en `translations.es.apo` y `translations.en.apo` dentro de `src/Home/context/LanguageContext.jsx`.

Validación de traducciones, renderizado de las seis páginas en ambos idiomas y preferencias:

```bash
node scripts/check-anime-languages.mjs
```
