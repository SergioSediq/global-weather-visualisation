# 🌍 Global Weather Visualization

A web-based project for visualizing global weather conditions using animated wind data and map projections. The application runs entirely in the browser and is supported by a lightweight Node.js development server.

This project was created as a learning exercise in JavaScript and browser-based visualization and is inspired by the earlier **Tokyo Wind Map** project.

---

## 🧠 Project Overview

* Visualizes global wind patterns on an interactive world map
* Uses weather forecast data from the **Global Forecast System (GFS)**
* Combines SVG and HTML5 Canvas for rendering
* Designed to be deployed as a static site (e.g. S3-style hosting)
* Includes a minimal Node.js server for local development

> **Note**: The file `dev-server.js` is located in the **repository root** (not `/server`).

---

## ⚙️ Requirements

* Node.js
* npm

---

## 🚀 Building & Launching

1. Clone the repository
2. Install dependencies
3. Start the development server

The development server serves files from the `public/` directory and contains almost no server-side logic. It exists to simulate static hosting behavior.

Once running, open your browser and navigate to:

```
http://localhost:8080
```

> **Linux note**: On Ubuntu, Mint, and elementary OS, use `nodejs` instead of `node` due to a naming conflict.

---

## 📂 Project Structure (Key Paths)

* `dev-server.js` — Local development server
* `public/index.html` — Main entry point
* `public/libs/earth/` — Core visualization logic
* `public/data/` — Map and weather data
* `public/data/weather/current/` — Sample weather layer

---

## 🗺️ Getting Map Data

Map data is sourced from **Natural Earth** and converted into **TopoJSON** format. Multiple map resolutions are used:

* Larger scale (simplified) for animation
* Smaller scale (detailed) for static display

The conversion process requires:

* GDAL
* TopoJSON

After processing, generated TopoJSON files are placed in:

```
public/data/
```

---

## 🌬️ Getting Weather Data

Weather data comes from the **Global Forecast System (GFS)** operated by the US National Weather Service.

* Forecasts are produced four times daily
* Data is downloaded from **NOMADS**
* Original files are in **GRIB2** format
* Only selected wind vector records are extracted

The extracted data is converted to JSON and stored in:

```
public/data/weather/current/
```

---

## 🔤 Font Subsetting

To reduce download size:

* **M+ Fonts** are subset to include only required characters
* Font analysis logic lives in `server/font/findChars.js`
* Subsetting is performed using the **M+Web FONTS Subsetter**
* Resulting fonts are stored in `public/styles/`

The **Mono Social Icons Font** is used for scalable social icons and can be subset using Font Squirrel’s WebFont Generator.

---

## 🧩 Implementation Notes

Key technical challenges addressed in this project:

* **Interpolation**: GFS data is provided on a 1° grid and interpolated in the browser using bilinear interpolation
* **Projection distortion**: Different map projections distort motion differently; distortion is calculated per point
* **Layered rendering**:

  * SVG for the world map
  * One Canvas for animated particles
  * One Canvas for the color overlay
* **Globe masking**: A detached Canvas is used to determine globe boundaries
* **State management**:

  * Configuration is stored in the URL hash
  * Backbone.js models and events propagate state changes across components

This event-driven flow can occasionally produce transient visual artifacts.

---

## 💡 Inspiration

* **hint.fm Wind Map**
* **D3.js** visualization library

---

## 🤝 Contributing

Feedback and contributions are welcome, especially those that improve clarity, structure, and best practices.
