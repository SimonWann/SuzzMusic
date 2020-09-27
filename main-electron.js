const { app, BrowserWindow, Tray, Menu } = require('electron')
const express = require('express')
const path = require('path')
const serve = express()
let tray = null
const icon = path.join(__dirname,'/img/dog.png')
serve.use('/',express.static(path.join(__dirname,'/')))
serve.listen(3002, () => {
    console.log('3002running')
})


function createWindow () {   
    // 创建浏览器窗口
    const win = new BrowserWindow({
      width: 600,
      height: 800,
      icon: icon,
      resizable: false,
      autoHideMenuBar: true,
      webPreferences: {
        nodeIntegration: true
      },
    })
    win.loadURL("http://127.0.0.1:3002")
    // 并且为你的应用加载index.html
    tray = new Tray(icon)
    const contextMenu = Menu.buildFromTemplate([
      { label: '显示主窗口', click() {
        win.show()
      } },
      { label: '退出', role: 'quit' }
    ])
    tray.setToolTip('SuzzMusic')
    tray.setContextMenu(contextMenu)
    
  }
  
  app.whenReady().then(() => {
    
    createWindow()
    
  })
  app.on('active', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
        
    }
  })