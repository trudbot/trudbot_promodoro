import {app, shell, BrowserWindow, ipcMain} from 'electron'
import {join} from 'path'
import {electronApp, optimizer, is} from '@electron-toolkit/utils'
import icon from '../../resources/logo.ico?asset'
import {read, write} from './datastore'

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 830,
    height: 540,
    show: false,
    title: "trudbot\'s tomato",
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? {icon} : {icon}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    },
    saved: false
  })
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return {action: 'deny'}
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  //窗口关闭时回调， 进行一次保存后才能关闭
  mainWindow.on('close', (e) => {
    if (!mainWindow.saved) {
      e.preventDefault();
      mainWindow.webContents.send('save-data');
    }
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.trudbot')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  });

  createWindow()

  app.on('activate', function () {
    // On macOS, it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  //读取数据
  ipcMain.handle('read', async () => {
    return await read();
  });

  //覆写数据
  ipcMain.on('write', async (event, data) => {
    await write(data);
  });

  //窗口执行保存后的回调， 将对应窗口关闭
  ipcMain.on('quit', (event) => {
    event.sender.saved = true;
    event.sender.close();
  });

})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
