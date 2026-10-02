# 🌐 Portafolio Profesional de Victor (Vic0318)

> Sitio web personal y portafolio interactivo de desarrollo de software alojado en **GitHub Pages**: [vic0318.github.io](https://vic0318.github.io/)

---

## ✨ Características

- 🎨 **Diseño Moderno & Minimalista:** Paleta oscura y clara de alto contraste con efectos sutiles de *glassmorphism* y gradientes.
- 🌓 **Modo Oscuro / Claro Automático:**
  - Detección automática según las preferencias del sistema operativo (`prefers-color-scheme`).
  - Botón de alternancia manual con persistencia en `localStorage`.
  - Cero parpadeo al recargar (anti-FOUC).
- 📱 **100% Responsive & Accesible:** Optimizado para smartphones, tablets y pantallas de escritorio grandes.
- ⌨️ **Efecto Máquina de Escribir:** Hero dinámico mostrando roles y especialidades en tiempo real.
- 📂 **Filtrado Interactivo de Proyectos:** Filtra repositorios por categoría (*Web & Frontend*, *Backend & Cloud*, *Bases de Datos & Docker*).
- ⚡ **Rendimiento Ultrarrápido:** Creado con **HTML5 semántico, CSS moderno y JavaScript puro (Vanilla JS)**, sin dependencias pesadas ni frameworks requeridos.
- 📬 **Formulario y Enlace Rápido de Contacto:** Incluye botón de copiado de email con un clic y enlace directo a GitHub.

---

## 🗂️ Estructura del Proyecto

```text
vic0318.github.io/
├── index.html        # Estructura semántica, metadatos SEO y Open Graph
├── styles.css        # Sistema de diseño con variables CSS y soporte dark/light
├── script.js         # Lógica interactiva (tema, filtros, animaciones y menú)
└── README.md         # Documentación del proyecto
```

---

## 🚀 Cómo Probar Localmente

Puedes abrir directamente el archivo `index.html` en tu navegador, o levantar un servidor local ligero:

### Con Python:
```bash
python -m http.server 8000
```
Luego abre [http://localhost:8000](http://localhost:8000) en tu navegador.

### Con Node.js:
```bash
npx.cmd serve .
```

---

## 🛠️ Personalización Rápida

1. **Información Personal:** Modifica tu nombre, bio, correo y enlaces de redes en `index.html`.
2. **Proyectos:** Añade o edita tus repositorios en la sección `#proyectos` de `index.html`.
3. **Colores del Tema:** Ajusta los colores primarios o de acento dentro del bloque `:root` en `styles.css`.

---

## 📤 Cómo Subir los Cambios a GitHub

Si tienes Git instalado en tu terminal:

```bash
git add .
git commit -m "feat: rediseño completo del portafolio personal interactivo"
git push origin main
```

*(O puedes subir los archivos `index.html`, `styles.css` y `script.js` arrastrándolos directamente a tu repositorio en [github.com/Vic0318/vic0318.github.io](https://github.com/Vic0318/vic0318.github.io)).*

GitHub Pages publicará el nuevo sitio automáticamente en cuestión de segundos en:
👉 **[https://vic0318.github.io](https://vic0318.github.io)**