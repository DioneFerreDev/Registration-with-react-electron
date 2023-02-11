const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

const {apiRouter} = require("./Routes/apiRoute");




// const db = new loki(path.join(__dirname, '../data/db.json'));
// var content = db.addCollection('contents');
// content.insert({name:"pneu",type:"car",description:"Black tyres",quantity:"5" });
// db.save(err => {if (err) console.log(err);

// });

// db.saveDatabase()



function createWindow() {
  const win = new BrowserWindow({
    width: 1300,
    minWidth: 800,
    height: 600,
    icon: path.join(__dirname,"/images/register.png"),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
  });
  win.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
}

// API
apiRouter.Router();
app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});