define(["exports"],(function(t){"use strict";try{self["workbox:core:7.0.0"]&&_()}catch(t){}const e=(t,...e)=>{let s=t;return e.length>0&&(s+=` :: ${JSON.stringify(e)}`),s};class s extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}try{self["workbox:routing:7.0.0"]&&_()}catch(t){}const n=t=>t&&"object"==typeof t?t:{handle:t};class i{constructor(t,e,s="GET"){this.handler=n(e),this.match=t,this.method=s}setCatchHandler(t){this.catchHandler=n(t)}}class r extends i{constructor(t,e,s){super((({url:e})=>{const s=t.exec(e.href);if(s&&(e.origin===location.origin||0===s.index))return s.slice(1)}),e,s)}}class a{constructor(){this.t=new Map,this.i=new Map}get routes(){return this.t}addFetchListener(){self.addEventListener("fetch",(t=>{const{request:e}=t,s=this.handleRequest({request:e,event:t});s&&t.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(t=>{if(t.data&&"CACHE_URLS"===t.data.type){const{payload:e}=t.data,s=Promise.all(e.urlsToCache.map((e=>{"string"==typeof e&&(e=[e]);const s=new Request(...e);return this.handleRequest({request:s,event:t})})));t.waitUntil(s),t.ports&&t.ports[0]&&s.then((()=>t.ports[0].postMessage(!0)))}}))}handleRequest({request:t,event:e}){const s=new URL(t.url,location.href);if(!s.protocol.startsWith("http"))return;const n=s.origin===location.origin,{params:i,route:r}=this.findMatchingRoute({event:e,request:t,sameOrigin:n,url:s});let a=r&&r.handler;const o=t.method;if(!a&&this.i.has(o)&&(a=this.i.get(o)),!a)return;let c;try{c=a.handle({url:s,request:t,event:e,params:i})}catch(t){c=Promise.reject(t)}const h=r&&r.catchHandler;return c instanceof Promise&&(this.o||h)&&(c=c.catch((async n=>{if(h)try{return await h.handle({url:s,request:t,event:e,params:i})}catch(t){t instanceof Error&&(n=t)}if(this.o)return this.o.handle({url:s,request:t,event:e});throw n}))),c}findMatchingRoute({url:t,sameOrigin:e,request:s,event:n}){const i=this.t.get(s.method)||[];for(const r of i){let i;const a=r.match({url:t,sameOrigin:e,request:s,event:n});if(a)return i=a,(Array.isArray(i)&&0===i.length||a.constructor===Object&&0===Object.keys(a).length||"boolean"==typeof a)&&(i=void 0),{route:r,params:i}}return{}}setDefaultHandler(t,e="GET"){this.i.set(e,n(t))}setCatchHandler(t){this.o=n(t)}registerRoute(t){this.t.has(t.method)||this.t.set(t.method,[]),this.t.get(t.method).push(t)}unregisterRoute(t){if(!this.t.has(t.method))throw new s("unregister-route-but-not-found-with-method",{method:t.method});const e=this.t.get(t.method).indexOf(t);if(!(e>-1))throw new s("unregister-route-route-not-registered");this.t.get(t.method).splice(e,1)}}let o;const c=()=>(o||(o=new a,o.addFetchListener(),o.addCacheListener()),o);function h(t,e,n){let a;if("string"==typeof t){const s=new URL(t,location.href);a=new i((({url:t})=>t.href===s.href),e,n)}else if(t instanceof RegExp)a=new r(t,e,n);else if("function"==typeof t)a=new i(t,e,n);else{if(!(t instanceof i))throw new s("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});a=t}return c().registerRoute(a),a}const u={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},l=t=>[u.prefix,t,u.suffix].filter((t=>t&&t.length>0)).join("-"),f=t=>t||l(u.googleAnalytics),w=t=>t||l(u.precache),d=t=>t||l(u.runtime);function y(t){t.then((()=>{}))}const p=new Set;function m(){return m=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var s=arguments[e];for(var n in s)({}).hasOwnProperty.call(s,n)&&(t[n]=s[n])}return t},m.apply(null,arguments)}const g=(t,e)=>e.some((e=>t instanceof e));let R,q;const b=new WeakMap,v=new WeakMap,D=new WeakMap,E=new WeakMap,x=new WeakMap;let U={get(t,e,s){if(t instanceof IDBTransaction){if("done"===e)return v.get(t);if("objectStoreNames"===e)return t.objectStoreNames||D.get(t);if("store"===e)return s.objectStoreNames[1]?void 0:s.objectStore(s.objectStoreNames[0])}return k(t[e])},set:(t,e,s)=>(t[e]=s,!0),has:(t,e)=>t instanceof IDBTransaction&&("done"===e||"store"===e)||e in t};function I(t){return t!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(q||(q=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(t)?function(...e){return t.apply(L(this),e),k(b.get(this))}:function(...e){return k(t.apply(L(this),e))}:function(e,...s){const n=t.call(L(this),e,...s);return D.set(n,e.sort?e.sort():[e]),k(n)}}function N(t){return"function"==typeof t?I(t):(t instanceof IDBTransaction&&function(t){if(v.has(t))return;const e=new Promise(((e,s)=>{const n=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",r),t.removeEventListener("abort",r)},i=()=>{e(),n()},r=()=>{s(t.error||new DOMException("AbortError","AbortError")),n()};t.addEventListener("complete",i),t.addEventListener("error",r),t.addEventListener("abort",r)}));v.set(t,e)}(t),g(t,R||(R=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction]))?new Proxy(t,U):t)}function k(t){if(t instanceof IDBRequest)return function(t){const e=new Promise(((e,s)=>{const n=()=>{t.removeEventListener("success",i),t.removeEventListener("error",r)},i=()=>{e(k(t.result)),n()},r=()=>{s(t.error),n()};t.addEventListener("success",i),t.addEventListener("error",r)}));return e.then((e=>{e instanceof IDBCursor&&b.set(e,t)})).catch((()=>{})),x.set(e,t),e}(t);if(E.has(t))return E.get(t);const e=N(t);return e!==t&&(E.set(t,e),x.set(e,t)),e}const L=t=>x.get(t);function T(t,e,{blocked:s,upgrade:n,blocking:i,terminated:r}={}){const a=indexedDB.open(t,e),o=k(a);return n&&a.addEventListener("upgradeneeded",(t=>{n(k(a.result),t.oldVersion,t.newVersion,k(a.transaction),t)})),s&&a.addEventListener("blocked",(t=>s(t.oldVersion,t.newVersion,t))),o.then((t=>{r&&t.addEventListener("close",(()=>r())),i&&t.addEventListener("versionchange",(t=>i(t.oldVersion,t.newVersion,t)))})).catch((()=>{})),o}const B=["get","getKey","getAll","getAllKeys","count"],O=["put","add","delete","clear"],C=new Map;function P(t,e){if(!(t instanceof IDBDatabase)||e in t||"string"!=typeof e)return;if(C.get(e))return C.get(e);const s=e.replace(/FromIndex$/,""),n=e!==s,i=O.includes(s);if(!(s in(n?IDBIndex:IDBObjectStore).prototype)||!i&&!B.includes(s))return;const r=async function(t,...e){const r=this.transaction(t,i?"readwrite":"readonly");let a=r.store;return n&&(a=a.index(e.shift())),(await Promise.all([a[s](...e),i&&r.done]))[0]};return C.set(e,r),r}U=(t=>m({},t,{get:(e,s,n)=>P(e,s)||t.get(e,s,n),has:(e,s)=>!!P(e,s)||t.has(e,s)}))(U);try{self["workbox:expiration:7.0.0"]&&_()}catch(t){}const S="cache-entries",j=t=>{const e=new URL(t,location.href);return e.hash="",e.href};class M{constructor(t){this.h=null,this.u=t}l(t){const e=t.createObjectStore(S,{keyPath:"id"});e.createIndex("cacheName","cacheName",{unique:!1}),e.createIndex("timestamp","timestamp",{unique:!1})}p(t){this.l(t),this.u&&function(t,{blocked:e}={}){const s=indexedDB.deleteDatabase(t);e&&s.addEventListener("blocked",(t=>e(t.oldVersion,t))),k(s).then((()=>{}))}(this.u)}async setTimestamp(t,e){const s={url:t=j(t),timestamp:e,cacheName:this.u,id:this.m(t)},n=(await this.getDb()).transaction(S,"readwrite",{durability:"relaxed"});await n.store.put(s),await n.done}async getTimestamp(t){const e=await this.getDb(),s=await e.get(S,this.m(t));return null==s?void 0:s.timestamp}async expireEntries(t,e){const s=await this.getDb();let n=await s.transaction(S).store.index("timestamp").openCursor(null,"prev");const i=[];let r=0;for(;n;){const s=n.value;s.cacheName===this.u&&(t&&s.timestamp<t||e&&r>=e?i.push(n.value):r++),n=await n.continue()}const a=[];for(const t of i)await s.delete(S,t.id),a.push(t.url);return a}m(t){return this.u+"|"+j(t)}async getDb(){return this.h||(this.h=await T("workbox-expiration",1,{upgrade:this.p.bind(this)})),this.h}}class W{constructor(t,e={}){this.R=!1,this.q=!1,this.v=e.maxEntries,this.D=e.maxAgeSeconds,this._=e.matchOptions,this.u=t,this.U=new M(t)}async expireEntries(){if(this.R)return void(this.q=!0);this.R=!0;const t=this.D?Date.now()-1e3*this.D:0,e=await this.U.expireEntries(t,this.v),s=await self.caches.open(this.u);for(const t of e)await s.delete(t,this._);this.R=!1,this.q&&(this.q=!1,y(this.expireEntries()))}async updateTimestamp(t){await this.U.setTimestamp(t,Date.now())}async isURLExpired(t){if(this.D){const e=await this.U.getTimestamp(t),s=Date.now()-1e3*this.D;return void 0===e||e<s}return!1}async delete(){this.q=!1,await this.U.expireEntries(1/0)}}try{self["workbox:strategies:7.0.0"]&&_()}catch(t){}const K={cacheWillUpdate:async({response:t})=>200===t.status||0===t.status?t:null};function A(t,e){const s=new URL(t);for(const t of e)s.searchParams.delete(t);return s.href}class F{constructor(){this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}}function $(t){return new Promise((e=>setTimeout(e,t)))}function G(t){return"string"==typeof t?new Request(t):t}class H{constructor(t,e){this.I={},Object.assign(this,e),this.event=e.event,this.N=t,this.k=new F,this.L=[],this.T=[...t.plugins],this.B=new Map;for(const t of this.T)this.B.set(t,{});this.event.waitUntil(this.k.promise)}async fetch(t){const{event:e}=this;let n=G(t);if("navigate"===n.mode&&e instanceof FetchEvent&&e.preloadResponse){const t=await e.preloadResponse;if(t)return t}const i=this.hasCallback("fetchDidFail")?n.clone():null;try{for(const t of this.iterateCallbacks("requestWillFetch"))n=await t({request:n.clone(),event:e})}catch(t){if(t instanceof Error)throw new s("plugin-error-request-will-fetch",{thrownErrorMessage:t.message})}const r=n.clone();try{let t;t=await fetch(n,"navigate"===n.mode?void 0:this.N.fetchOptions);for(const s of this.iterateCallbacks("fetchDidSucceed"))t=await s({event:e,request:r,response:t});return t}catch(t){throw i&&await this.runCallbacks("fetchDidFail",{error:t,event:e,originalRequest:i.clone(),request:r.clone()}),t}}async fetchAndCachePut(t){const e=await this.fetch(t),s=e.clone();return this.waitUntil(this.cachePut(t,s)),e}async cacheMatch(t){const e=G(t);let s;const{cacheName:n,matchOptions:i}=this.N,r=await this.getCacheKey(e,"read"),a=Object.assign(Object.assign({},i),{cacheName:n});s=await caches.match(r,a);for(const t of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await t({cacheName:n,matchOptions:i,cachedResponse:s,request:r,event:this.event})||void 0;return s}async cachePut(t,e){const n=G(t);await $(0);const i=await this.getCacheKey(n,"write");if(!e)throw new s("cache-put-with-no-response",{url:(r=i.url,new URL(String(r),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var r;const a=await this.O(e);if(!a)return!1;const{cacheName:o,matchOptions:c}=this.N,h=await self.caches.open(o),u=this.hasCallback("cacheDidUpdate"),l=u?await async function(t,e,s,n){const i=A(e.url,s);if(e.url===i)return t.match(e,n);const r=Object.assign(Object.assign({},n),{ignoreSearch:!0}),a=await t.keys(e,r);for(const e of a)if(i===A(e.url,s))return t.match(e,n)}(h,i.clone(),["__WB_REVISION__"],c):null;try{await h.put(i,u?a.clone():a)}catch(t){if(t instanceof Error)throw"QuotaExceededError"===t.name&&await async function(){for(const t of p)await t()}(),t}for(const t of this.iterateCallbacks("cacheDidUpdate"))await t({cacheName:o,oldResponse:l,newResponse:a.clone(),request:i,event:this.event});return!0}async getCacheKey(t,e){const s=`${t.url} | ${e}`;if(!this.I[s]){let n=t;for(const t of this.iterateCallbacks("cacheKeyWillBeUsed"))n=G(await t({mode:e,request:n,event:this.event,params:this.params}));this.I[s]=n}return this.I[s]}hasCallback(t){for(const e of this.N.plugins)if(t in e)return!0;return!1}async runCallbacks(t,e){for(const s of this.iterateCallbacks(t))await s(e)}*iterateCallbacks(t){for(const e of this.N.plugins)if("function"==typeof e[t]){const s=this.B.get(e),n=n=>{const i=Object.assign(Object.assign({},n),{state:s});return e[t](i)};yield n}}waitUntil(t){return this.L.push(t),t}async doneWaiting(){let t;for(;t=this.L.shift();)await t}destroy(){this.k.resolve(null)}async O(t){let e=t,s=!1;for(const t of this.iterateCallbacks("cacheWillUpdate"))if(e=await t({request:this.request,response:e,event:this.event})||void 0,s=!0,!e)break;return s||e&&200!==e.status&&(e=void 0),e}}class Q{constructor(t={}){this.cacheName=d(t.cacheName),this.plugins=t.plugins||[],this.fetchOptions=t.fetchOptions,this.matchOptions=t.matchOptions}handle(t){const[e]=this.handleAll(t);return e}handleAll(t){t instanceof FetchEvent&&(t={event:t,request:t.request});const e=t.event,s="string"==typeof t.request?new Request(t.request):t.request,n="params"in t?t.params:void 0,i=new H(this,{event:e,request:s,params:n}),r=this.C(i,s,e);return[r,this.P(r,i,s,e)]}async C(t,e,n){let i;await t.runCallbacks("handlerWillStart",{event:n,request:e});try{if(i=await this.S(e,t),!i||"error"===i.type)throw new s("no-response",{url:e.url})}catch(s){if(s instanceof Error)for(const r of t.iterateCallbacks("handlerDidError"))if(i=await r({error:s,event:n,request:e}),i)break;if(!i)throw s}for(const s of t.iterateCallbacks("handlerWillRespond"))i=await s({event:n,request:e,response:i});return i}async P(t,e,s,n){let i,r;try{i=await t}catch(r){}try{await e.runCallbacks("handlerDidRespond",{event:n,request:s,response:i}),await e.doneWaiting()}catch(t){t instanceof Error&&(r=t)}if(await e.runCallbacks("handlerDidComplete",{event:n,request:s,response:i,error:r}),e.destroy(),r)throw r}}function z(t,e){const s=e();return t.waitUntil(s),s}try{self["workbox:precaching:7.0.0"]&&_()}catch(t){}function V(t){if(!t)throw new s("add-to-cache-list-unexpected-type",{entry:t});if("string"==typeof t){const e=new URL(t,location.href);return{cacheKey:e.href,url:e.href}}const{revision:e,url:n}=t;if(!n)throw new s("add-to-cache-list-unexpected-type",{entry:t});if(!e){const t=new URL(n,location.href);return{cacheKey:t.href,url:t.href}}const i=new URL(n,location.href),r=new URL(n,location.href);return i.searchParams.set("__WB_REVISION__",e),{cacheKey:i.href,url:r.href}}class J{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:t,state:e})=>{e&&(e.originalRequest=t)},this.cachedResponseWillBeUsed=async({event:t,state:e,cachedResponse:s})=>{if("install"===t.type&&e&&e.originalRequest&&e.originalRequest instanceof Request){const t=e.originalRequest.url;s?this.notUpdatedURLs.push(t):this.updatedURLs.push(t)}return s}}}class X{constructor({precacheController:t}){this.cacheKeyWillBeUsed=async({request:t,params:e})=>{const s=(null==e?void 0:e.cacheKey)||this.j.getCacheKeyForURL(t.url);return s?new Request(s,{headers:t.headers}):t},this.j=t}}let Y,Z;async function tt(t,e){let n=null;if(t.url){n=new URL(t.url).origin}if(n!==self.location.origin)throw new s("cross-origin-copy-response",{origin:n});const i=t.clone(),r={headers:new Headers(i.headers),status:i.status,statusText:i.statusText},a=e?e(r):r,o=function(){if(void 0===Y){const t=new Response("");if("body"in t)try{new Response(t.body),Y=!0}catch(t){Y=!1}Y=!1}return Y}()?i.body:await i.blob();return new Response(o,a)}class et extends Q{constructor(t={}){t.cacheName=w(t.cacheName),super(t),this.M=!1!==t.fallbackToNetwork,this.plugins.push(et.copyRedirectedCacheableResponsesPlugin)}async S(t,e){const s=await e.cacheMatch(t);return s||(e.event&&"install"===e.event.type?await this.W(t,e):await this.K(t,e))}async K(t,e){let n;const i=e.params||{};if(!this.M)throw new s("missing-precache-entry",{cacheName:this.cacheName,url:t.url});{const s=i.integrity,r=t.integrity,a=!r||r===s;n=await e.fetch(new Request(t,{integrity:"no-cors"!==t.mode?r||s:void 0})),s&&a&&"no-cors"!==t.mode&&(this.A(),await e.cachePut(t,n.clone()))}return n}async W(t,e){this.A();const n=await e.fetch(t);if(!await e.cachePut(t,n.clone()))throw new s("bad-precaching-response",{url:t.url,status:n.status});return n}A(){let t=null,e=0;for(const[s,n]of this.plugins.entries())n!==et.copyRedirectedCacheableResponsesPlugin&&(n===et.defaultPrecacheCacheabilityPlugin&&(t=s),n.cacheWillUpdate&&e++);0===e?this.plugins.push(et.defaultPrecacheCacheabilityPlugin):e>1&&null!==t&&this.plugins.splice(t,1)}}et.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:t})=>!t||t.status>=400?null:t},et.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:t})=>t.redirected?await tt(t):t};class st{constructor({cacheName:t,plugins:e=[],fallbackToNetwork:s=!0}={}){this.F=new Map,this.$=new Map,this.G=new Map,this.N=new et({cacheName:w(t),plugins:[...e,new X({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this.N}precache(t){this.addToCacheList(t),this.H||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this.H=!0)}addToCacheList(t){const e=[];for(const n of t){"string"==typeof n?e.push(n):n&&void 0===n.revision&&e.push(n.url);const{cacheKey:t,url:i}=V(n),r="string"!=typeof n&&n.revision?"reload":"default";if(this.F.has(i)&&this.F.get(i)!==t)throw new s("add-to-cache-list-conflicting-entries",{firstEntry:this.F.get(i),secondEntry:t});if("string"!=typeof n&&n.integrity){if(this.G.has(t)&&this.G.get(t)!==n.integrity)throw new s("add-to-cache-list-conflicting-integrities",{url:i});this.G.set(t,n.integrity)}if(this.F.set(i,t),this.$.set(i,r),e.length>0){const t=`Workbox is precaching URLs without revision info: ${e.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(t)}}}install(t){return z(t,(async()=>{const e=new J;this.strategy.plugins.push(e);for(const[e,s]of this.F){const n=this.G.get(s),i=this.$.get(e),r=new Request(e,{integrity:n,cache:i,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:s},request:r,event:t}))}const{updatedURLs:s,notUpdatedURLs:n}=e;return{updatedURLs:s,notUpdatedURLs:n}}))}activate(t){return z(t,(async()=>{const t=await self.caches.open(this.strategy.cacheName),e=await t.keys(),s=new Set(this.F.values()),n=[];for(const i of e)s.has(i.url)||(await t.delete(i),n.push(i.url));return{deletedURLs:n}}))}getURLsToCacheKeys(){return this.F}getCachedURLs(){return[...this.F.keys()]}getCacheKeyForURL(t){const e=new URL(t,location.href);return this.F.get(e.href)}getIntegrityForCacheKey(t){return this.G.get(t)}async matchPrecache(t){const e=t instanceof Request?t.url:t,s=this.getCacheKeyForURL(e);if(s){return(await self.caches.open(this.strategy.cacheName)).match(s)}}createHandlerBoundToURL(t){const e=this.getCacheKeyForURL(t);if(!e)throw new s("non-precached-url",{url:t});return s=>(s.request=new Request(t),s.params=Object.assign({cacheKey:e},s.params),this.strategy.handle(s))}}const nt=()=>(Z||(Z=new st),Z);class it extends i{constructor(t,e){super((({request:s})=>{const n=t.getURLsToCacheKeys();for(const i of function*(t,{ignoreURLParametersMatching:e=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:n=!0,urlManipulation:i}={}){const r=new URL(t,location.href);r.hash="",yield r.href;const a=function(t,e=[]){for(const s of[...t.searchParams.keys()])e.some((t=>t.test(s)))&&t.searchParams.delete(s);return t}(r,e);if(yield a.href,s&&a.pathname.endsWith("/")){const t=new URL(a.href);t.pathname+=s,yield t.href}if(n){const t=new URL(a.href);t.pathname+=".html",yield t.href}if(i){const t=i({url:r});for(const e of t)yield e.href}}(s.url,e)){const e=n.get(i);if(e){return{cacheKey:e,integrity:t.getIntegrityForCacheKey(e)}}}}),t.strategy)}}try{self["workbox:background-sync:7.0.0"]&&_()}catch(t){}const rt="requests",at="queueName";class ot{constructor(){this.h=null}async addEntry(t){const e=(await this.getDb()).transaction(rt,"readwrite",{durability:"relaxed"});await e.store.add(t),await e.done}async getFirstEntryId(){const t=await this.getDb(),e=await t.transaction(rt).store.openCursor();return null==e?void 0:e.value.id}async getAllEntriesByQueueName(t){const e=await this.getDb(),s=await e.getAllFromIndex(rt,at,IDBKeyRange.only(t));return s||new Array}async getEntryCountByQueueName(t){return(await this.getDb()).countFromIndex(rt,at,IDBKeyRange.only(t))}async deleteEntry(t){const e=await this.getDb();await e.delete(rt,t)}async getFirstEntryByQueueName(t){return await this.getEndEntryFromIndex(IDBKeyRange.only(t),"next")}async getLastEntryByQueueName(t){return await this.getEndEntryFromIndex(IDBKeyRange.only(t),"prev")}async getEndEntryFromIndex(t,e){const s=await this.getDb(),n=await s.transaction(rt).store.index(at).openCursor(t,e);return null==n?void 0:n.value}async getDb(){return this.h||(this.h=await T("workbox-background-sync",3,{upgrade:this.l})),this.h}l(t,e){e>0&&e<3&&t.objectStoreNames.contains(rt)&&t.deleteObjectStore(rt);t.createObjectStore(rt,{autoIncrement:!0,keyPath:"id"}).createIndex(at,at,{unique:!1})}}class ct{constructor(t){this.V=t,this.J=new ot}async pushEntry(t){delete t.id,t.queueName=this.V,await this.J.addEntry(t)}async unshiftEntry(t){const e=await this.J.getFirstEntryId();e?t.id=e-1:delete t.id,t.queueName=this.V,await this.J.addEntry(t)}async popEntry(){return this.X(await this.J.getLastEntryByQueueName(this.V))}async shiftEntry(){return this.X(await this.J.getFirstEntryByQueueName(this.V))}async getAll(){return await this.J.getAllEntriesByQueueName(this.V)}async size(){return await this.J.getEntryCountByQueueName(this.V)}async deleteEntry(t){await this.J.deleteEntry(t)}async X(t){return t&&await this.deleteEntry(t.id),t}}const ht=["method","referrer","referrerPolicy","mode","credentials","cache","redirect","integrity","keepalive"];class ut{static async fromRequest(t){const e={url:t.url,headers:{}};"GET"!==t.method&&(e.body=await t.clone().arrayBuffer());for(const[s,n]of t.headers.entries())e.headers[s]=n;for(const s of ht)void 0!==t[s]&&(e[s]=t[s]);return new ut(e)}constructor(t){"navigate"===t.mode&&(t.mode="same-origin"),this.Y=t}toObject(){const t=Object.assign({},this.Y);return t.headers=Object.assign({},this.Y.headers),t.body&&(t.body=t.body.slice(0)),t}toRequest(){return new Request(this.Y.url,this.Y)}clone(){return new ut(this.toObject())}}const lt="workbox-background-sync",ft=new Set,wt=t=>{const e={request:new ut(t.requestData).toRequest(),timestamp:t.timestamp};return t.metadata&&(e.metadata=t.metadata),e};class dt{constructor(t,{forceSyncFallback:e,onSync:n,maxRetentionTime:i}={}){if(this.Z=!1,this.tt=!1,ft.has(t))throw new s("duplicate-queue-name",{name:t});ft.add(t),this.et=t,this.st=n||this.replayRequests,this.nt=i||10080,this.it=Boolean(e),this.rt=new ct(this.et),this.ot()}get name(){return this.et}async pushRequest(t){await this.ct(t,"push")}async unshiftRequest(t){await this.ct(t,"unshift")}async popRequest(){return this.ht("pop")}async shiftRequest(){return this.ht("shift")}async getAll(){const t=await this.rt.getAll(),e=Date.now(),s=[];for(const n of t){const t=60*this.nt*1e3;e-n.timestamp>t?await this.rt.deleteEntry(n.id):s.push(wt(n))}return s}async size(){return await this.rt.size()}async ct({request:t,metadata:e,timestamp:s=Date.now()},n){const i={requestData:(await ut.fromRequest(t.clone())).toObject(),timestamp:s};switch(e&&(i.metadata=e),n){case"push":await this.rt.pushEntry(i);break;case"unshift":await this.rt.unshiftEntry(i)}this.Z?this.tt=!0:await this.registerSync()}async ht(t){const e=Date.now();let s;switch(t){case"pop":s=await this.rt.popEntry();break;case"shift":s=await this.rt.shiftEntry()}if(s){const n=60*this.nt*1e3;return e-s.timestamp>n?this.ht(t):wt(s)}}async replayRequests(){let t;for(;t=await this.shiftRequest();)try{await fetch(t.request.clone())}catch(e){throw await this.unshiftRequest(t),new s("queue-replay-failed",{name:this.et})}}async registerSync(){if("sync"in self.registration&&!this.it)try{await self.registration.sync.register(`${lt}:${this.et}`)}catch(t){}}ot(){"sync"in self.registration&&!this.it?self.addEventListener("sync",(t=>{if(t.tag===`${lt}:${this.et}`){const e=async()=>{let e;this.Z=!0;try{await this.st({queue:this})}catch(t){if(t instanceof Error)throw e=t,e}finally{!this.tt||e&&!t.lastChance||await this.registerSync(),this.Z=!1,this.tt=!1}};t.waitUntil(e())}})):this.st({queue:this})}static get ut(){return ft}}class yt{constructor(t,e){this.fetchDidFail=async({request:t})=>{await this.lt.pushRequest({request:t})},this.lt=new dt(t,e)}}class pt extends Q{constructor(t={}){super(t),this.plugins.some((t=>"cacheWillUpdate"in t))||this.plugins.unshift(K),this.ft=t.networkTimeoutSeconds||0}async S(t,e){const n=[],i=[];let r;if(this.ft){const{id:s,promise:a}=this.wt({request:t,logs:n,handler:e});r=s,i.push(a)}const a=this.dt({timeoutId:r,request:t,logs:n,handler:e});i.push(a);const o=await e.waitUntil((async()=>await e.waitUntil(Promise.race(i))||await a)());if(!o)throw new s("no-response",{url:t.url});return o}wt({request:t,logs:e,handler:s}){let n;return{promise:new Promise((e=>{n=setTimeout((async()=>{e(await s.cacheMatch(t))}),1e3*this.ft)})),id:n}}async dt({timeoutId:t,request:e,logs:s,handler:n}){let i,r;try{r=await n.fetchAndCachePut(e)}catch(t){t instanceof Error&&(i=t)}return t&&clearTimeout(t),!i&&r||(r=await n.cacheMatch(e)),r}}class mt extends Q{constructor(t={}){super(t),this.ft=t.networkTimeoutSeconds||0}async S(t,e){let n,i;try{const s=[e.fetch(t)];if(this.ft){const t=$(1e3*this.ft);s.push(t)}if(i=await Promise.race(s),!i)throw new Error(`Timed out the network response after ${this.ft} seconds.`)}catch(t){t instanceof Error&&(n=t)}if(!i)throw new s("no-response",{url:t.url,error:n});return i}}try{self["workbox:google-analytics:7.0.0"]&&_()}catch(t){}const gt="www.google-analytics.com",Rt="www.googletagmanager.com",qt=/^\/(\w+\/)?collect/,bt=t=>{const e=({url:t})=>t.hostname===gt&&qt.test(t.pathname),s=new mt({plugins:[t]});return[new i(e,s,"GET"),new i(e,s,"POST")]},vt=t=>{const e=new pt({cacheName:t});return new i((({url:t})=>t.hostname===gt&&"/analytics.js"===t.pathname),e,"GET")},Dt=t=>{const e=new pt({cacheName:t});return new i((({url:t})=>t.hostname===Rt&&"/gtag/js"===t.pathname),e,"GET")},Et=t=>{const e=new pt({cacheName:t});return new i((({url:t})=>t.hostname===Rt&&"/gtm.js"===t.pathname),e,"GET")};t.ExpirationPlugin=class{constructor(t={}){this.cachedResponseWillBeUsed=async({event:t,request:e,cacheName:s,cachedResponse:n})=>{if(!n)return null;const i=this.yt(n),r=this.gt(s);y(r.expireEntries());const a=r.updateTimestamp(e.url);if(t)try{t.waitUntil(a)}catch(t){}return i?n:null},this.cacheDidUpdate=async({cacheName:t,request:e})=>{const s=this.gt(t);await s.updateTimestamp(e.url),await s.expireEntries()},this.Rt=t,this.D=t.maxAgeSeconds,this.qt=new Map,t.purgeOnQuotaError&&function(t){p.add(t)}((()=>this.deleteCacheAndMetadata()))}gt(t){if(t===d())throw new s("expire-custom-caches-only");let e=this.qt.get(t);return e||(e=new W(t,this.Rt),this.qt.set(t,e)),e}yt(t){if(!this.D)return!0;const e=this.bt(t);if(null===e)return!0;return e>=Date.now()-1e3*this.D}bt(t){if(!t.headers.has("date"))return null;const e=t.headers.get("date"),s=new Date(e).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(const[t,e]of this.qt)await self.caches.delete(t),await e.delete();this.qt=new Map}},t.NavigationRoute=class extends i{constructor(t,{allowlist:e=[/./],denylist:s=[]}={}){super((t=>this.vt(t)),t),this.Dt=e,this.Et=s}vt({url:t,request:e}){if(e&&"navigate"!==e.mode)return!1;const s=t.pathname+t.search;for(const t of this.Et)if(t.test(s))return!1;return!!this.Dt.some((t=>t.test(s)))}},t.StaleWhileRevalidate=class extends Q{constructor(t={}){super(t),this.plugins.some((t=>"cacheWillUpdate"in t))||this.plugins.unshift(K)}async S(t,e){const n=e.fetchAndCachePut(t).catch((()=>{}));e.waitUntil(n);let i,r=await e.cacheMatch(t);if(r);else try{r=await n}catch(t){t instanceof Error&&(i=t)}if(!r)throw new s("no-response",{url:t.url,error:i});return r}},t.cleanupOutdatedCaches=function(){self.addEventListener("activate",(t=>{const e=w();t.waitUntil((async(t,e="-precache-")=>{const s=(await self.caches.keys()).filter((s=>s.includes(e)&&s.includes(self.registration.scope)&&s!==t));return await Promise.all(s.map((t=>self.caches.delete(t)))),s})(e).then((t=>{})))}))},t.clientsClaim=function(){self.addEventListener("activate",(()=>self.clients.claim()))},t.createHandlerBoundToURL=function(t){return nt().createHandlerBoundToURL(t)},t.initialize=(t={})=>{const e=f(t.cacheName),s=new yt("workbox-google-analytics",{maxRetentionTime:2880,onSync:(n=t,async({queue:t})=>{let e;for(;e=await t.shiftRequest();){const{request:s,timestamp:i}=e,r=new URL(s.url);try{const t="POST"===s.method?new URLSearchParams(await s.clone().text()):r.searchParams,e=i-(Number(t.get("qt"))||0),a=Date.now()-e;if(t.set("qt",String(a)),n.parameterOverrides)for(const e of Object.keys(n.parameterOverrides)){const s=n.parameterOverrides[e];t.set(e,s)}"function"==typeof n.hitFilter&&n.hitFilter.call(null,t),await fetch(new Request(r.origin+r.pathname,{body:t.toString(),method:"POST",mode:"cors",credentials:"omit",headers:{"Content-Type":"text/plain"}}))}catch(s){throw await t.unshiftRequest(e),s}}})});var n;const i=[Et(e),vt(e),Dt(e),...bt(s)],r=new a;for(const t of i)r.registerRoute(t);r.addFetchListener()},t.precacheAndRoute=function(t,e){!function(t){nt().precache(t)}(t),function(t){const e=nt();h(new it(e,t))}(e)},t.registerRoute=h}));
