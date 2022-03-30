

两种创建项目的方式：

1.使用cli脚手架，也就是  vue-cli

2.使用vite脚手架



这里推荐使用cli脚手架

首先安装 cli脚手架

1.npm install -g @vue/cli

安装成功验证： vue -V  或者 vue -v


然后使用create命令创建项目

2.vue create 项目名称

vue create vue3_demo01

这时候会提示创建vue的版本
使用键盘上下键选择vue3版本



3.创建成功，直接使用命令跑起来项目就行（热加载的）


-------------


vite创建项目

npm init vite-app 项目名称
npm install
npm run dev (默认不是serve)


---
yarn create vite-app 项目名称
yarn
yarn dev





===========


vite 的编译速度比 vue-cli 快很多





但是vue-cli更稳定一些，模块也更多一些
所以目前还是推荐用cli
当然，如果你对编译速度有要求，也可以使用vite












