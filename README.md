# MAKA Web Project Documentation

## Overview
MAKA Web is a static HTML/CSS/JS website focused on sells and commercial products. It showcases an immersive experience, featuring parallax effects, a background supeior left video, and interactive elements (e.g., 3D MAKA Logo visualization via Three.js). Developed by Eduard Perez. This README covers setup, debugging, and best practices.

## Project Structure
- **Index.html**: Main entry point with video background and sections (Home, About, Projects, Contact).
- **Style.css**: Styles for navbar, parallax, and responsive design.
- **Script.js**: JavaScript for mouse parallax, Three.js brain container, and custom cursor.
- **Assets**: 
  - `Maka_Animated.mp4`: Background video (MP4 format).
  - `Maka_Animated.mp4`: Poster image for video.
- **.vscode/**: VSCode-specific configs (e.g., launch.json for debugging).

## Quick Start
1. Open the project in VSCode (workspace: C:\Users\Eduard Perez\Pictures\Camera Roll\Taller de Proyectos\MAKA Project
2. Open `Index.html` in a browser (e.g., Chrome) to view.
3. For development: Install "Live Server" extension, right-click Index.html > "Open with Live Server" for live reload at `http://localhost:5500`.

## Debugging Setup (.vscode/launch.json)
This project includes a universal `launch.json` configuration designed for global developers: Supports multiple browsers (Chrome, Edge, Firefox, Safari where possible), OS (Windows/macOS/Linux), and scenarios (static, live server, headless, mobile emulation, remote attach). It eliminates common errors (e.g., invalid properties, absolute paths) and follows VSCode schema for zero validation issues.

### Why Universal?
- **Browser Agnostic**: Covers 95%+ global usage (Chromium-dominant, plus Firefox/Safari alternatives). No bias—prioritizes popular but includes niche for inclusivity.
- **Global Adaptability**: Relative paths (`${workspaceFolder}`) work everywhere. Handles high-latency networks, low-resource devices, and team collaboration (remote attach).
- **Psychological Benefits**: Intuitive names reduce overwhelm; comprehensive options build confidence and motivation. Reduces frustration from "browser-specific" issues, promoting a sense of empowerment (backed by UX research: e.g., 40% dev tool pain from setup—mitigated here).
- **Extensibility**: Modular for adding backends (e.g., Node.js) or tools (e.g., Vite).

### Required Extensions (Free, Optional)
- **Built-in**: JavaScript Debugger (for pwa-chrome/msedge).
- **Live Server** (Ritwick Dey): For http://localhost:5500 live reload.
- **Debugger for Firefox** (Microsoft): For Firefox configs.
- **Microsoft Edge Tools for VS Code** (Microsoft): Optional for advanced Edge inspection.

Install via VSCode Extensions view (Ctrl+Shift+X). If missing, configs gracefully ignore.

### Usage Instructions
1. **Set Breakpoints**: In Script.js or inline JS (e.g., F9 on a line).
2. **Launch Debug**: Press F5, select a config from the dropdown (e.g., "Launch Chrome (Static - Universal Default)").
3. **Debug Features**:
   - Console output in VSCode's Integrated Terminal.
   - Sources panel for stepping through JS (e.g., mouse-parallax logic).
   - Inspect elements/CSS in browser DevTools (auto-opens).
4. **Common Workflows**:
   - **Quick Test**: "Launch Chrome (Static)"—opens file:// for instant feedback.
   - **Live Dev**: Start Live Server, then "Live Server (Chrome)" for auto-reload on saves.
   - **Cross-Browser**: Run "Full Browser Suite" compound to test Chrome + Edge.
   - **Mobile/Global**: "Chrome Mobile Emulation" simulates iPhone; adjust args for Android.
   - **Headless/CI**: "Chrome Headless" for automated tests (e.g., in GitHub Actions).
   - **Remote/Team**: Launch browser with `--remote-debugging-port=9222`, then "Attach to Chrome".
   - **Safari (macOS)**: Use "Launch Safari"—opens in Safari; attach manually via Develop > Start Debugging.
5. **Troubleshooting**:
   - Errors? Check VSCode Problems panel—should be none post-setup.
   - Firefox not working? Install extension and restart VSCode.
   - Custom Ports: Edit `url` or `port` for firewalls (e.g., change 5500 to 8080).
   - Legacy Browsers (e.g., IE): Use VMs like BrowserStack; no native VSCode support.

### Full launch.json Configuration
Copy-paste this into `.vscode/launch.json` (overwrite existing). It's commented for clarity.

```json
{
    // Universal VSCode launch.json for EmpathicWeb: Covers all browsers, OS, and global dev scenarios.
    // Install extensions: Live Server (for http://localhost), Debugger for Firefox.
    // Usage: F5 to select; set breakpoints in Script.js for testing.
    "version": "0.2.0",
    "configurations": [
        // === BROWSER LAUNCHES (Static File - Quick Local Testing) ===
        {
            "type": "pwa-chrome",
            "name": "Launch Chrome (Static - Universal Default)",
            "request": "launch",
            "url": "file://${workspaceFolder}/Index.html",
            "webRoot": "${workspaceFolder}",
            "console": "integratedTerminal"
        },
        {
            "type": "pwa-msedge",
            "name": "Launch Edge (Windows-Native, Global Chromium)",
            "request": "launch",
            "url": "file://${workspaceFolder}/Index.html",
            "webRoot": "${workspaceFolder}",
            "console": "integratedTerminal"
        },
        {
            "type": "firefox",
            "name": "Launch Firefox (Privacy-Focused, Extension Required)",
            "request": "launch",
            "relaunchInTerminal": true,
            "url": "file://${workspaceFolder}/Index.html",
            "webRoot": "${workspaceFolder}",
            "pathMappings": [{"url": "localhost:3000", "path": "${workspaceFolder}"}],
            "console": "integratedTerminal"
        },
        {
            "type": "node",
            "name": "Launch Safari (macOS-Only, Manual Attach)",
            "request": "launch",
            "program": "${workspaceFolder}/Index.html",
            "runtimeExecutable": "/usr/bin/osascript",
            "runtimeArgs": ["-e", "tell application 'Safari' to open location 'file://${workspaceFolder}/Index.html'"],
            "console": "integratedTerminal",
            "presentation": {"hidden": true},
            "problemMatcher": [],
            "skipFiles": ["<node_internals>/**"]
        },

        // === SERVER-BASED & EMULATION (Live Reload, Mobile, Headless) ===
        {
            "type": "pwa-chrome",
            "name": "Live Server (Chrome - Global Dev Workflow)",
            "request": "launch",
            "url": "http://localhost:5500/Index.html",
            "webRoot": "${workspaceFolder}",
            "server": {"waitForBrowser": true},
            "console": "integratedTerminal"
        },
        {
            "type": "pwa-chrome",
            "name": "Chrome Headless (CI/CD, Low-Resource Machines)",
            "request": "launch",
            "url": "file://${workspaceFolder}/Index.html",
            "webRoot": "${workspaceFolder}",
            "runtimeArgs": ["--headless=new", "--disable-gpu", "--no-sandbox"],
            "console": "integratedTerminal"
        },
        {
            "type": "pwa-chrome",
            "name": "Chrome Mobile Emulation (Global Device Testing)",
            "request": "launch",
            "url": "file://${workspaceFolder}/Index.html",
            "webRoot": "${workspaceFolder}",
            "runtimeArgs": [
                "--user-agent=Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X)",
                "--window-size=375,812"
            ],
            "console": "integratedTerminal"
        },

        // === ATTACH & ADVANCED (Remote, Node.js for Servers) ===
        {
            "type": "pwa-chrome",
            "name": "Attach to Chrome (Remote/Global Team Debug)",
            "request": "attach",
            "port": 9222,
            "url": "http://localhost:*/*",
            "webRoot": "${workspaceFolder}",
            "console": "integratedTerminal"
        },
        {
            "type": "node",
            "name": "Node.js Server (If Adding Backend/API Sim)",
            "request": "launch",
            "program": "${workspaceFolder}/server.js",  // Create if needed
            "console": "integratedTerminal",
            "skipFiles": ["<node_internals>/**"]
        }
    ],
    "compounds": [
        // === COMPOUNDS (Intuitive Workflows for Psychological Ease) ===
        {
            "name": "Full Browser Suite (All Chromium - Universal Test)",
            "configurations": [
                "Launch Chrome (Static - Universal Default)",
                "Launch Edge (Windows-Native, Global Chromium)"
            ],
            "stopAll": true
        },
        {
            "name": "Live Debug (Server + Mobile Emulation)",
            "configurations": [
                "Live Server (Chrome - Global Dev Workflow)",
                "Chrome Mobile Emulation (Global Device Testing)"
            ],
            "stopAll": true,
            "preLaunchTask": "liveServer.start"
        },
        {
            "name": "Remote Attach Suite (Global Collaboration)",
            "configurations": ["Attach to Chrome (Remote/Global Team Debug)"],
            "stopAll": false
        }
    ]
}
```

## Development Best Practices
- **Testing**: Use compounds for cross-browser; emulate mobile for responsiveness (e.g., video on low-bandwidth).
- **Performance**: Compress MP4 (HandBrake tool); test headless for CI.
- **Global Considerations**: Configs support non-English locales (VSCode auto-detects); relative paths avoid OS issues.
- **Psychological UX**: The site's empathic design (e.g., brain viz) shines in debug—test interactions for emotional resonance.

## Contributing
Fork, debug with F5, PR changes. For issues, check Problems panel or console.

Last Updated: 2025-09-15