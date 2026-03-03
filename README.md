# TagStorm - Multiplayer Tag Game

A real-time multiplayer tag game built with **Phaser 3**, **React**, and **Socket.io**. Players can join game rooms and compete in fast-paced tag matches with real-time synchronization across all connected clients.

![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🎮 Features

- **Real-Time Multiplayer**: Socket.io-powered instant synchronization across all players
- **Phaser 3 Game Engine**: Smooth rendering and physics for 2D game mechanics
- **Room-Based Gameplay**: Create or join game rooms for isolated matches
- **Multiple Maps**: Dungeon and additional map support
- **React UI**: Modern React interface for lobby and game management
- **Responsive Design**: Tailwind CSS for adapting to different screen sizes
- **Hot Module Reloading**: Fast development workflow with Vite

## 🛠️ Tech Stack

### Frontend
- **Phaser 3** - 2D game framework
- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Socket.io Client** - Real-time communication
- **Tailwind CSS** - Utility-first styling
- **TypeScript Components** - Enhanced UI components with shadcn/radix-ui
- **React Router** - Client-side routing

### Backend
- **Node.js** - Runtime
- **Express** - Web server
- **Socket.io** - Real-time event handling
- **TypeScript** - Type-safe server code
- **CORS** - Cross-origin request handling

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [pnpm](https://pnpm.io/) (v10+) or npm

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Install client dependencies
cd client
pnpm install

# Install server dependencies
cd ../server
pnpm install
```

### 2. Run Development Servers

**Terminal 1 - Start the backend server:**
```bash
cd server
pnpm run dev
```
The server will run on `http://localhost:3000` (or your configured port)

**Terminal 2 - Start the frontend dev server:**
```bash
cd client
pnpm run dev
```
The frontend will run on `http://localhost:5173` by default

### 3. Play

Open `http://localhost:5173` in your browser and start playing!

## 📁 Project Structure

```
play/
├── client/                    # React + Phaser frontend
│   ├── src/
│   │   ├── App.jsx           # Main React component
│   │   ├── PhaserGame.jsx    # Game initialization & React-Phaser bridge
│   │   ├── game/
│   │   │   ├── EventBus.js   # Event communication between React and Phaser
│   │   │   ├── main.js       # Game configuration
│   │   │   └── scenes/
│   │   │       ├── player.js      # Player scene logic
│   │   │       └── maps/          # Game map scenes
│   │   │           ├── base-map.js
│   │   │           └── dungeon.js
│   │   ├── components/       # React UI components
│   │   │   ├── homeComponent/
│   │   │   ├── lobby/
│   │   │   ├── mapSelection/
│   │   │   └── ui/
│   │   ├── routes/           # Page components
│   │   ├── socket/
│   │   │   └── socketManager.js   # Socket.io client setup
│   │   └── hooks/            # Custom React hooks
│   ├── public/               # Static assets (maps, tiles, avatars)
│   └── package.json
│
├── server/                    # Node.js + Express backend
│   ├── src/
│   │   ├── index.ts          # Server entry point
│   │   ├── roomManager/      # Game room management logic
│   │   └── routes/           # API routes
│   │       ├── room.ts
│   │       └── user.ts
│   ├── tsconfig.json
│   └── package.json
│
└── README.md
```

## 🎮 Game Flow

1. **Home Screen**: Players land on the home page
2. **Lobby**: Choose or create a game room
3. **Map Selection**: Select which map to play on
4. **Gameplay**: 
   - Join other players in real-time
   - Tag mechanics synchronized across all clients
   - Player positions updated via Socket.io
5. **Game State**: Room-based isolation ensures separate matches

## 🔧 Available Commands

### Client

```bash
pnpm run dev           # Start dev server with logging
pnpm run dev-nolog    # Start dev server without logging
pnpm run build        # Build for production with logging
pnpm run build-nolog  # Build for production without logging
```

### Server

```bash
pnpm run dev    # Start dev server with TypeScript compilation
pnpm run build  # Build TypeScript to JavaScript
pnpm run start  # Run compiled server
```

## 🤝 Game Architecture

### Client-Server Communication

The game uses **Socket.io** events for real-time synchronization:

- **Room Management**: Create/join rooms, manage player lists
- **Player State**: Synchronize position, animation, and input across clients
- **Game Events**: Tag events, player elimination, game end
- **Chat/Status**: In-game messages and player status updates

### React-Phaser Bridge

The `EventBus.js` enables communication between React components and the Phaser game:

```javascript
// Emit from React to Phaser
EventBus.emit('event-name', data);

// Listen in Phaser scenes
EventBus.on('event-name', handleEvent);
```

## 📦 Building for Production

### Build Client
```bash
cd client
pnpm run build
```
Output will be in `client/dist/`

### Build Server
```bash
cd server
pnpm run build
```
Compiled files will be in `server/dist/`

### Deploy

1. Deploy the `client/dist` folder to a static hosting service (Vercel, Netlify, etc.)
2. Deploy the server to a Node.js hosting environment (Heroku, Railway, AWS, etc.)
3. Configure environment variables for server URL in the client

## 🎨 UI Components

The project uses custom UI components with:
- **shadcn/ui**: Accessible, customizable React components
- **Radix UI**: Headless component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful SVG icon library

## 🐛 Troubleshooting

### Port Already in Use
If the default ports (3000 for server, 5173 for client) are occupied, check your Vite and server configuration files.

### Socket.io Connection Issues
Ensure the backend server is running and the client is pointing to the correct server URL in `socket/socketManager.js`.

### Hot Module Reloading Not Working
Try clearing the browser cache or restarting the dev server.

## 📝 License

MIT

## 🤖 Credits

Built with:
- [Phaser 3](https://phaser.io/) - Game framework
- [React](https://react.dev/) - UI framework
- [Socket.io](https://socket.io/) - Real-time communication
- [Vite](https://vitejs.dev/) - Build tool
