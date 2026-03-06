# testautoevaluacion

Aplicacion web estatica en React + Vite para el **Test de Autoevaluacion de Conductas Emprendedoras**.

## URL objetivo

[https://Elnuget.github.io/testautoevaluacion/](https://Elnuget.github.io/testautoevaluacion/)

## Requisitos

- Node.js 18 o superior
- npm

## Instalacion

```bash
npm install
```

## Desarrollo local

```bash
npm run dev
```

## Build de produccion

```bash
npm run build
```

## Vista previa del build

```bash
npm run preview
```

## Deploy en GitHub Pages

La configuracion ya esta preparada con:

- `base: '/testautoevaluacion/'` en `vite.config.js`
- script `deploy` con `gh-pages`

Comandos:

```bash
npm run deploy
```

Esto publica la carpeta `dist/` en la rama `gh-pages`.

## Flujo sugerido para subir al repositorio

```bash
git init
git branch -M main
git remote add origin https://github.com/Elnuget/testautoevaluacion.git
git add .
git commit -m "feat: app estatica de test de autoevaluacion"
git push -u origin main
npm run deploy
```

## Configuracion final en GitHub

1. Ir al repositorio `Elnuget/testautoevaluacion`.
2. Abrir `Settings` -> `Pages`.
3. En `Build and deployment`, seleccionar `Deploy from a branch`.
4. Elegir rama `gh-pages` y carpeta `/ (root)`.
5. Guardar.

## Caracteristicas implementadas

- Formulario inicial de estudiante
- Cuestionario completo de 55 afirmaciones
- Escala 1 a 5
- Validacion de respuestas obligatorias
- Barra de progreso
- Calculo de 10 dimensiones + factor de correccion
- Ajuste segun tabla del test
- Resumen automatico (3 fortalezas y 3 areas a mejorar)
- Persistencia de progreso en `localStorage`
- Pantalla de resultados con:
  - datos del estudiante
  - detalle por dimension
  - total general
  - factor de correccion
- Botones para:
  - reiniciar
  - imprimir / guardar en PDF desde navegador
  - descargar TXT
  - descargar JSON

## Estructura

```text
.
├─ index.html
├─ package.json
├─ vite.config.js
├─ src
│  ├─ App.jsx
│  ├─ App.css
│  ├─ main.jsx
│  ├─ components
│  │  ├─ ProgressBar.jsx
│  │  ├─ Questionnaire.jsx
│  │  ├─ ResultView.jsx
│  │  └─ StudentForm.jsx
│  ├─ data
│  │  └─ questions.js
│  └─ utils
│     ├─ scoring.js
│     └─ storage.js
└─ Test de Autoevaluacion.pdf
```
