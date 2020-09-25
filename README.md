# demo-electron-app

This is a small ToDo React-TypeScript application wrapped in Electron.

Clone this repo, open your project root dir and install the dependencies: `npm i`

To launch the Electron application, run the command: `npm run go` . This will run all "go" scripts - `go:react` to run React and `go:electron` to run Electron in real time.

To make app build for macOS: `npm run build` . This script will clean up the old ./build and ./dist directories and run the React and Electron build scripts. After that, you will get **DMG**-file for MacOS **arch=x64** file in **.dist/DemoApp-0.1.0.dmg**
