if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,n)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const r=e=>a(e,i),o={module:{uri:i},exports:t,require:r};s[i]=Promise.all(c.map((e=>o[e]||r(e)))).then((e=>(n(...e),t)))}}define(["./workbox-5f5b08d6"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/WvaiiBMh-jFJI29e_rUDA/_buildManifest.js",revision:"fda94cc9b441eab89eb26a6f3443988a"},{url:"/_next/static/WvaiiBMh-jFJI29e_rUDA/_middlewareManifest.js",revision:"fb2823d66b3e778e04a3f681d0d2fb19"},{url:"/_next/static/WvaiiBMh-jFJI29e_rUDA/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/204-a77cf7a3a558e276.js",revision:"a77cf7a3a558e276"},{url:"/_next/static/chunks/294-a9d10a5db2e5fbb0.js",revision:"a9d10a5db2e5fbb0"},{url:"/_next/static/chunks/422-59e9c67c771b864c.js",revision:"59e9c67c771b864c"},{url:"/_next/static/chunks/432-f88441bc15e930c6.js",revision:"f88441bc15e930c6"},{url:"/_next/static/chunks/455-26bbc7afff843d82.js",revision:"26bbc7afff843d82"},{url:"/_next/static/chunks/632-968321747f4fe8df.js",revision:"968321747f4fe8df"},{url:"/_next/static/chunks/669-bd96c14e64ec8e1a.js",revision:"bd96c14e64ec8e1a"},{url:"/_next/static/chunks/670-afb2e92da63a244b.js",revision:"afb2e92da63a244b"},{url:"/_next/static/chunks/75fc9c18-289ba7b5fb63f228.js",revision:"289ba7b5fb63f228"},{url:"/_next/static/chunks/990-7ca47c825a1cd89e.js",revision:"7ca47c825a1cd89e"},{url:"/_next/static/chunks/framework-a87821de553db91d.js",revision:"a87821de553db91d"},{url:"/_next/static/chunks/main-e380ed469c5a0a07.js",revision:"e380ed469c5a0a07"},{url:"/_next/static/chunks/pages/404-e62237b8be2b4636.js",revision:"e62237b8be2b4636"},{url:"/_next/static/chunks/pages/_app-ddcb7c8869cea62f.js",revision:"ddcb7c8869cea62f"},{url:"/_next/static/chunks/pages/_error-0a004b8b8498208d.js",revision:"0a004b8b8498208d"},{url:"/_next/static/chunks/pages/gift-cards-6549167e10c37bc0.js",revision:"6549167e10c37bc0"},{url:"/_next/static/chunks/pages/gift-cards/%5Bid%5D-cb0f127fdd18e0ab.js",revision:"cb0f127fdd18e0ab"},{url:"/_next/static/chunks/pages/index-cdbfd4f672e5622b.js",revision:"cdbfd4f672e5622b"},{url:"/_next/static/chunks/pages/login-ab35d732f03bc75b.js",revision:"ab35d732f03bc75b"},{url:"/_next/static/chunks/pages/users-187ef26e16639055.js",revision:"187ef26e16639055"},{url:"/_next/static/chunks/pages/users/gift-received-f6c29bd8270dc471.js",revision:"f6c29bd8270dc471"},{url:"/_next/static/chunks/pages/users/gift-sent-d6a319fd6927772c.js",revision:"d6a319fd6927772c"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"99442aec5788bccac9b2f0ead2afdd6b"},{url:"/_next/static/chunks/webpack-42cdea76c8170223.js",revision:"42cdea76c8170223"},{url:"/_next/static/css/acdc86450f5b20f3.css",revision:"acdc86450f5b20f3"},{url:"/_next/static/css/ef7b3e99d3e60a3a.css",revision:"ef7b3e99d3e60a3a"},{url:"/apple-touch-icon.png",revision:"191f3130a347cc878e080db525b98855"},{url:"/favicon copy.ico",revision:"53c5a6a160244d577feaeed179bbb7b8"},{url:"/favicon-16x16.png",revision:"fa2539ff65d49301f1b05c66dd643f6b"},{url:"/favicon-32x32.png",revision:"111ec82fe59eaeb8bc716c20f4b8572f"},{url:"/favicon.ico",revision:"c30c7d42707a47a3f4591831641e50dc"},{url:"/logo192.png",revision:"8ddf093658ddd61873286fd2690d9cc8"},{url:"/logo256.png",revision:"61a06455a32a39b1823c7e0b05af4768"},{url:"/logo384.png",revision:"c6ab37e45546188f248a5eb88b77874f"},{url:"/logo512.png",revision:"d60acec9df49bbfff7365815383ffb9e"},{url:"/manifest.json",revision:"349068212223a3f582c1a49a09ad3270"},{url:"/maskable_icon_x192.png",revision:"6f35fe2dc02df353a5d82ea9eb35484c"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
