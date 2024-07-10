## 打包步骤

npm run publish打包金融大屏
npm run publish:control打包触控屏

1. 打包大屏时需要将node_modules里的ws复制粘贴到程序 resources -> app 文件夹下
3. 打包控制屏时手动注释掉 require('./websocketServer'); 这一行