# 🔐 SPEC — Pantalla de Login Interactiva

> Especificación funcional y de diseño para la pantalla de autenticación de la app.
> **Léela completa antes de generar código.** Prioriza UX, animaciones y estados visuales.

---

## 🎯 Objetivo

Construir una pantalla de **Login / Onboarding** que sea:

- **Interactiva** (microinteracciones, animaciones, feedback táctil).
- Con **OAuth social**: Google + GitHub (y opcionalmente email/contraseña).
- Con un **Splash / Skeleton inicial de ~5 segundos** mostrando el logotipo de la app.
- Consistente con el diseño tipo **desktop app (Electron-like)** + **Stitch-inspired**.
- Soporte **modo claro/oscuro** desde el día uno.

---

## 🧩 Estructura de pantallas

```
[SplashScreen] → [LoginScreen] → [HomeScreen]
      5s             OAuth             App
```

### 1. `SplashScreen` (5 segundos)

- Duración total: **5000 ms** (configurable).
- Muestra:
  - **Logotipo de la app** centrado (SVG o PNG transparente).
  - Nombre de la app debajo.
  - Un **skeleton loader** animado (shimmer) alrededor del logo.
  - Barra de progreso circular o lineal animada (opcional).
- Animaciones:
  - **Fade-in + scale** del logo en los primeros 800 ms.
  - **Pulse suave** continuo mientras carga.
  - **Shimmer** en el skeleton.
  - **Fade-out + slide-up** al pasar al login (300 ms).
- Preload en background:
  - Sesión guardada (AsyncStorage / SecureStore).
  - Configuración de tema.
  - Refresh token si existe.
- Si hay sesión válida → saltar directo a `HomeScreen`.
- Si no → ir a `LoginScreen`.

### 2. `LoginScreen`

**Elementos obligatorios:**

| Elemento | Descripción |
|----------|-------------|
| Logo | Versión reducida del logo arriba |
| Título | "Bienvenido de nuevo" / "Welcome back" |
| Subtítulo | Texto corto descriptivo |
| Botón **Google** | Con icono oficial, colores oficiales |
| Botón **GitHub** | Con icono oficial, fondo oscuro |
| Separador | "o continúa con" |
| Input email | Con focus ring animado |
| Input password | Con toggle mostrar/ocultar |
| Botón "Iniciar sesión" | Variante primary, loading state |
| Link "¿Olvidaste tu contraseña?" | Navega a recuperación |
| Link "Crear cuenta" | Navega a registro |
| Footer | Términos, privacidad, versión |

**Interacciones:**

- Cada botón tiene:
  - **Scale 0.96** al presionar + **haptic ligero**.
  - **Ripple** en Android, **opacity** en iOS.
  - **Loading spinner** inline cuando se autentica.
  - **Success check** animado si entra bien.
  - **Shake** + vibración si falla.
- Inputs:
  - **Focus ring** animado (borde + glow).
  - **Validación en vivo** (email válido, password ≥ 8).
  - **Iconos** a la izquierda, toggle de visibilidad a la derecha.
- Transición a `HomeScreen`: **shared element** del avatar o del logo.

---

## 🔑 Autenticación

### Proveedores requeridos

1. **Google OAuth** (obligatorio)
   - Librería: `expo-auth-session` + `expo-web-browser`.
   - Scopes: `openid`, `profile`, `email`.
   - Guardar: `idToken`, `accessToken`, `refreshToken`, `email`, `name`, `picture`.

2. **GitHub OAuth** (obligatorio)
   - Librería: `expo-auth-session`.
   - Scopes: `read:user`, `user:email`.
   - Guardar: `accessToken`, `login`, `avatar_url`, `email`.

3. **Email + Password** (opcional, pero recomendado)
   - Validación con Zod o Yup.
   - Backend: endpoint `/auth/login` en la API (PostgreSQL en Docker).

### Flujo

```
Usuario → Botón Google/GitHub
       → OAuth provider
       → Callback con token
       → Backend verifica y crea/actualiza usuario en PostgreSQL
       → Guarda sesión en SecureStore
       → Redirige a Home
```

### Persistencia de sesión

- Usar `expo-secure-store` (no AsyncStorage para tokens).
- Guardar: `accessToken`, `refreshToken`, `expiresAt`, `userId`.
- Auto-refresh al abrir la app.

---

## 🎨 Diseño visual

### Estilo general
- Basado en **Stitch** (limpio, moderno, con mucho aire).
- Estética **desktop app** (Electron-like): cards grandes, sombras suaves, bordes redondeados.
- **Glassmorphism** sutil en el fondo del login (blur + gradiente).

### Paleta (modo claro)
```
background:   #F8FAFC
surface:      #FFFFFF
primary:      #6366F1   (indigo)
primaryHover: #4F46E5
text:         #0F172A
textMuted:    #64748B
border:       #E2E8F0
success:      #10B981
error:        #EF4444
```

### Paleta (modo oscuro)
```
background:   #0B0F19
surface:      #111827
primary:      #818CF8
text:         #F1F5F9
textMuted:    #94A3B8
border:       #1F2937
success:      #34D399
error:        #F87171
```

### Tipografía
- **Inter** o **Geist**.
- Títulos: 28–32px, bold.
- Subtítulos: 15–16px, regular, textMuted.
- Botones: 16px, semibold.

### Espaciado
- Base 4px. Padding pantalla: 24px. Gap entre elementos: 16px.

---

## 🧱 Componentes a reutilizar/crear

- `<SplashScreen />` con logo + skeleton shimmer.
- `<SocialButton provider="google" | "github" />`
- `<Input />` con focus ring + validación.
- `<Button />` variantes: primary, ghost, outline, social.
- `<Skeleton />` con shimmer animado.
- `<Logo />` SVG escalable.
- `<Divider label="o continúa con" />`
- `<Toast />` para errores/éxito.

Todos con **NativeWind (Tailwind)** + **Reanimated** + **Haptics**.

---

## 📦 Librerías a usar

```bash
npx expo install expo-auth-session expo-web-browser expo-secure-store
npx expo install expo-haptics expo-blur expo-linear-gradient
npx expo install react-native-reanimated react-native-svg
npm i nativewind tailwindcss zustand zod
npm i @gorhom/bottom-sheet sonner-native
```

---

## ⚙️ Estados del login

| Estado | UI |
|--------|-----|
| Idle | Formulario normal |
| Loading | Botón con spinner, inputs disabled |
| Success | Check verde animado + transición |
| Error | Shake + borde rojo + toast |
| OAuth redirect | Modal nativo del proveedor |
| Offline | Banner "Sin conexión" |

---

## ✅ Criterios de aceptación

- [ ] Splash dura exactamente ~5s (configurable).
- [ ] Logo aparece con fade+scale y pulse.
- [ ] Skeleton shimmer visible durante la carga.
- [ ] Google y GitHub funcionan end-to-end.
- [ ] Sesión persiste tras cerrar la app.
- [ ] Auto-refresh de token.
- [ ] Modo claro/oscuro respetado.
- [ ] Haptics en cada acción clave.
- [ ] Animaciones a 60fps.
- [ ] Accesibilidad: labels, roles, contraste AA.

---

## 🚫 Lo que NO quiero

- Pantallas genéricas sin animaciones.
- Colores planos sin gradientes ni sombras.
- Botones sin feedback táctil.
- Formularios sin validación en vivo.
- Splash de 1s o instantáneo — quiero los 5s con logo.

---

## 📝 Entregables que espero de ti

1. Código completo de `SplashScreen.tsx`.
2. Código completo de `LoginScreen.tsx`.
3. Componentes `SocialButton`, `Input`, `Button`, `Skeleton`.
4. Hook `useAuth()` con Google + GitHub + persistencia.
5. Config de `app.json` / `app.config.ts` con los client IDs.
6. Instrucciones para registrar las apps en Google Cloud Console y GitHub OAuth Apps.
7. Ejemplo de endpoint backend `/auth/oauth` (Node + PostgreSQL).
8. Notas de seguridad (PKCE, state, nonce).

Empieza por el `SplashScreen` y luego el `LoginScreen`. Usa TypeScript, hooks y buenas prácticas.