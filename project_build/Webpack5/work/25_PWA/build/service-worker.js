if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return i[e]||(r=new Promise((async r=>{if("document"in self){const i=document.createElement("script");i.src=e,document.head.appendChild(i),i.onload=r}else importScripts(e),r()}))),r.then((()=>{if(!i[e])throw new Error(`Module ${e} didn’t register its module`);return i[e]}))},r=(r,i)=>{Promise.all(r.map(e)).then((e=>i(1===e.length?e[0]:e)))},i={require:Promise.resolve(r)};self.define=(r,s,n)=>{i[r]||(i[r]=Promise.resolve().then((()=>{let i={};const l={uri:location.origin+r.slice(1)};return Promise.all(s.map((r=>{switch(r){case"exports":return i;case"module":return l;default:return e(r)}}))).then((e=>{const r=n(...e);return i.default||(i.default=r),i}))})))}}define("./service-worker.js",["./workbox-7ae9f451"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"css/built.8300f2c1eb.css",revision:null},{url:"imgs/830bf3c820.jpg",revision:null},{url:"imgs/c2f2c28284.png",revision:null},{url:"index.html",revision:"c6d0adb6b050b3fbea4f592eabc50b75"},{url:"js/built.19198419b8.js",revision:null},{url:"media/1c714375fa.svg",revision:null},{url:"media/1feff74faa.bin",revision:null},{url:"media/6189950e0e.ttf",revision:null},{url:"media/897f4479e5.eot",revision:null},{url:"media/955d9a2215.woff",revision:null}],{})}));
