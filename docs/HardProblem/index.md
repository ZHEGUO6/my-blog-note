# 所有开发遇到的·问题归档在这里



## electron安装依赖失败

![](//images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/ZHEGUO6/image/img/202411071454110.png)

出现这个错误的原因可能是没有开代理，导致国内的网络访问国外的镜像源失败。

也有些错误是你的node版本过低。建议更换最新版本的node

解决办法：

**直接修改Electron 和 Electron Builder 的二进制文件的镜像源**

1. 打开npm配置：npm config edit
2. 在弹出的文件空白处配置Electron 和 Electron Builder 的二进制文件的镜像源

```
electron_mirror=https://cdn.npmmirror.com/binaries/electron/
electron_builder_binaries_mirror=https://npmmirror.com/mirrors/electron-builder-binaries/
```

配置完成之后，现在可以尝试`npm i electron`