"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSecondaryWindow = createSecondaryWindow;
const electron_1 = require("electron");
function createSecondaryWindow() {
    const win = new electron_1.BrowserWindow({
        width: 600,
        height: 400
    });
    win.loadURL('http://localhost:4200/secondary');
}
