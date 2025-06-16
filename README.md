# Hierarchy Navigation Experiment

A Svelte-based prototype for experimenting with different navigation techniques for hierarchical menus.

## Prerequisites

- Node.js (v16 or higher)
- npm (comes with Node.js)

## Installation

1. Enter the repository:
```bash
cd ISY-hierarchy-prototype
```

2. Install dependencies:
```bash
npm install
```

## Development

To start the development server:

```bash
npm run dev
```

This will start the server at `http://localhost:5173` by default.

## CSV Generation

The experiment generates a CSV file with the following columns:

- `participantId`: Unique identifier for each participant
- `block`: Block number (1-3)
- `trial`: Round number within the block (0-19)
- `technique`: 0 for mouse-based navigation, 1 for keyboard-based navigation
- `time`: Time taken to find the target item in milliseconds
- `error`: 0 for correct selection, 1 for incorrect selection

The CSV file can be manually downloaded after each experiment session.
