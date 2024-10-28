#  什么是 Electron?

- 一款应用广泛的跨平台的桌面应用开发框架。
- Electron 的本质是结合了Chromium 与 Node.js
- 使用HTML，CSS，JS等Web技术构建桌面应用程序。



## Electron 流程模型

![](.\img\1.png)

```js
// 主进程 main.js
const { app, BrowserWindow ,ipcMain} = require('electron')
const path = require('path')
const fs = require('fs')

function WriteFile(event,data){
    console.log(data)
    fs.writeFileSync('./hello.txt',data)
}

function ReadFile(){
    return fs.readFileSync('./hello.txt','utf-8').toString()
}
//  主进程
function createWindow() {
    let win = new BrowserWindow({
        width: 1000,
        height: 600,
        autoHideMenuBar: true,// 隐藏菜单栏
        // alwaysOnTop: true, // 窗口置顶
        // x: 0,
        // y: 0, // 窗口位置
        webPreferences:{
            preload: path.resolve(__dirname, './preload.js')
        }
    })
    ipcMain.on('saveFile',WriteFile)
    ipcMain.handle('readFile',ReadFile)
    // win.loadURL('http://47.97.85.85:81')  运行线上
    win.loadFile('./pages/index.HTML') // 运行本地文件
}
app.on('ready', ()=>{
    createWindow()
    console.log('app ready')
    // macOS 上，当点击 dock 图标并且没有其他窗口打开时，创建一个新窗口
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// 当所有窗口关闭时退出应用，除非在 macOS 上，否则应用会继续运行
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

```

```js
// 预加载脚本文件 preload.js
// 预加载脚本 相当于node和浏览器中间层，可以把node相关信息传递到浏览器上

const {contextBridge,ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('electronApi',{
    saveFile:(data)=>{
        // send 传递方法
        ipcRenderer.send('saveFile',data)
    },
    readFile:()=>{
        // invoke调用方法
        //  返回一个promise对象
        return ipcRenderer.invoke('readFile')
    }
})
```

```js
// 渲染进程  render.js
// 渲染进程
const btn2 = document.querySelector("#btn2");
const input = document.querySelector("#input");
const btn = document.querySelector("#btn");
btn.addEventListener("click", ()=>{
    electronApi.saveFile(input.value)
    alert("保存成功")
    input.value = ""
})

btn2.addEventListener("click", async ()=>{
//   返回一个promise对象
    let data = await electronApi.readFile()
    alert(data)
})
```
## 打包electron项目

1. 安装依赖： 确保你的项目已经安装了所有必要的依赖。通常情况下，你需要安装 npm 和 yarn 中的一个来管理依赖。
2. 配置打包参数： 在项目根目录下创建或编辑 package.json 文件，确保其中包含了正确的打包配置信息。例如，你可以添加 build 配置来指定打包选项。

**package.json**
```json
{
  "name": "electron_app",
  "version": "1.0.0",
  "description": "this is my first web software",
  "main": "main.js",
  "scripts": {
    "start": "electron-forge start",
    "build": "electron-builder",
    "package": "electron-forge package",
    "make": "electron-forge make"
  },
  "build": {
    "appId": "com.zheguo.video",
    "win": {
      "target": [
        {
          "target": "nsis",
          "arch": [
            "x64"
          ]
        }
      ]
    },
    "nsis": {
      "oneClick": false,
      "perMachine": true,
      "allowToChangeInstallationDirectory": true
    }
  },
  "author": "zheguo",
  "license": "ISC",
  "devDependencies": {
    "@electron-forge/cli": "^7.4.0",
    "@electron-forge/maker-deb": "^7.4.0",
    "@electron-forge/maker-rpm": "^7.4.0",
    "@electron-forge/maker-squirrel": "^7.4.0",
    "@electron-forge/maker-zip": "^7.4.0",
    "@electron-forge/plugin-auto-unpack-natives": "^7.4.0",
    "@electron-forge/plugin-fuses": "^7.4.0",
    "@electron/fuses": "^1.8.0",
    "electron": "^32.1.1",
    "nodemon": "^3.1.5"
  },
  "dependencies": {
    "electron-squirrel-startup": "^1.0.1"
  }
}

```

3. 安装打包工具： 使用 npm 或 yarn 安装 Electron 打包工具，如 electron-builder。

`npm install  electron-builder`