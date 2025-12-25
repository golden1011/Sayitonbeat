# Rhythm Game Foundation

This project is a monorepo containing the `client` (React) and `server` (Node.js/Express) for the "Say the Word" rhythm game.

## Prerequisites

- Node.js (v16+)
- npm

## Setup

1.  **Install dependencies:**

    ```bash
    # Install server dependencies
    cd server
    npm install

    # Install client dependencies
    cd ../client
    npm install
    ```

## Running the Application

1.  **Start the Backend Server:**

    ```bash
    cd server
    npm run start
    # Runs on http://localhost:5000
    ```

    *Note: You may want to add `"start": "node index.js"` to `server/package.json` if it's missing, or use `node index.js` directly.*

2.  **Start the Frontend Client:**

    ```bash
    cd client
    npm run dev
    # Runs on http://localhost:5173
    ```

## Features Implemented

- **Conductor Class (`client/src/utils/Conductor.ts`):** Handles precise timing using the Web Audio API to preventing drift.
- **Visual Sync Demo:** The main App component flashes a visual indicator exactly on the beat.
- **BPM Control:** Slider to adjust the tempo in real-time.
- **Tech Stack:** React, Tailwind CSS v4, Express, Socket.io (ready for connection).

## Next Steps

- Implement the `MediaRecorder` API for video capture.
- Connect Frontend to Backend via Socket.io for game rooms.
- Add "Word" generation logic synchronized with the beat.
