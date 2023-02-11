const { ipcMain } = require("electron");
const {mainController} = require("../Controllers/mainController");
const loki = require("lokijs");
const read = require("read-file-utf8");
const path = require('path');


// API
exports.apiRouter = {
    Router: () => {
        ipcMain.handle("get-contents",mainController.getContents );
        ipcMain.handle("save-content", mainController.saveContent);
        ipcMain.handle("edit-content", mainController.editContent);
        ipcMain.handle("delete-item",mainController.deleteItem);
        ipcMain.handle("get-content-by-name",mainController.searchingByName);
        ipcMain.handle("search-contents-by-option",mainController.searchingByOption);
    }
}