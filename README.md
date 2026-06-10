# FightInsight

FightInsight is an Angular frontend application that integrates with the [Octagon API](https://api.octagon-api.com) to retrieve and visualize MMA data. Browse fighters, explore divisional rankings, and compare any two fighters head-to-head with interactive radar charts.

## Features

- **Dashboard** — Landing page with a hero section and quick access to the main sections of the app.
- **Fighters** — Browse the full roster of fighters and drill into individual fighter profiles (record, physical stats, fighting style, place of birth, octagon debut, and more).
- **Rankings** — View current divisional rankings pulled live from the Octagon API.
- **Compare** — Select two fighters and compare their attributes side by side on a radar chart.

## Tech Stack

- [Angular 18](https://angular.dev/) (standalone components, signals)
- TypeScript
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Chart.js](https://www.chartjs.org/) for data visualization
- RxJS for reactive data flow
- [Octagon API](https://api.octagon-api.com) as the data source

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm (bundled with Node.js)
- [Angular CLI](https://angular.dev/tools/cli) (optional, for using `ng` commands directly)

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/svelkovski/fight-insight.git
cd fight-insight
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the app

```bash
npm start
```

The app will be available at `http://localhost:4200/`. It reloads automatically when you change a source file.

## Project Structure

```
src/
└── app/
    ├── dashboard/      # Home page (hero section, quick access)
    ├── fighters/       # Fighter list, details, service & model
    ├── rankings/       # Rankings list, service & model
    ├── analysis/       # Head-to-head fighter comparison
    ├── shared/         # Reusable components (e.g. radar chart)
    ├── header/         # App header / navigation
    ├── footer/         # App footer
    ├── app.routes.ts   # Route definitions
    └── app.config.ts   # App configuration
```

## Data Source

FightInsight consumes the public [Octagon API](https://api.octagon-api.com):

- `GET /fighters` — fighter roster and stats
- `GET /rankings` — divisional rankings

No API key or environment configuration is required.
