"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initUpdater = initUpdater;
const electron_updater_1 = require("electron-updater");
function initUpdater() {
    electron_updater_1.autoUpdater.checkForUpdatesAndNotify();
}
