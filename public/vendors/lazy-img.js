!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var i=e();for(var s in i)("object"==typeof exports?exports:t)[s]=i[s]}}(self,(()=>(()=>{"use strict";var t={557:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0});const s=i(928);class r extends HTMLElement{constructor(){super(),this.loaded=!1,this.setImgSrc=(0,s.throttle)((()=>{if(this.loaded)return;const{top:t}=this.getBoundingClientRect();t<window.innerHeight&&(this.img.setAttribute("src",this.getAttribute("src")),this.shadow.appendChild(this.img),this.loaded=!0,this.removeScrollListener())}),200),this.handleLoad=t=>{this.dispatchEvent(new CustomEvent("lazyload",{bubbles:!0,composed:!0,detail:{target:this,src:this.getAttribute("src")}}))},this.handleError=t=>{this.dispatchEvent(new CustomEvent("lazyerror",{bubbles:!0,composed:!0,detail:{target:this,src:this.getAttribute("src")}}))},this.removeScrollListener=()=>{window.removeEventListener("scroll",this.setImgSrc)},this.shadow=this.attachShadow({mode:"open"}),this.shadow.innerHTML="\n      <style>\n        :host{\n          display: inline-block;\n          background: #F5F7FA;\n        }\n        img{\n          width: 100%;\n          height: 100%;\n        }\n      </style>\n    ",this.img=document.createElement("img")}attributeChangedCallback(t,e,i){e!==i&&("src"===t?this.loaded&&this.img.setAttribute(t,i):"alt"===t?this.img.setAttribute(t,i):this.style.setProperty(t,(0,s.getValWithUnit)(i)))}connectedCallback(){this.hasAttribute("width")||this.hasAttribute("height")||(this.style.setProperty("width","300px"),this.style.setProperty("height","200px")),this.img.onload=this.handleLoad,this.img.onerror=this.handleError,window.addEventListener("scroll",this.setImgSrc),this.setImgSrc()}disconnectedCallback(){this.loaded||this.removeScrollListener(),this.img.onload=null,this.img.onerror=null}}r.observedAttributes=["src","alt","width","height"],e.default=r},607:function(t,e,i){var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),e.LazyImg=void 0;const r=s(i(557));e.LazyImg=r.default,customElements.define("lazy-img",r.default)},928:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.throttle=e.getValWithUnit=void 0,e.getValWithUnit=function(t){if(!t)return"0";const e=t.toString();return["px","%"].some((t=>e.endsWith(t)))?e:`${e}px`},e.throttle=function(t,e=300,i=!0){const s=this;let r=null,o=!1;return(...n)=>{!o&&i?(t.apply(s,n),o=!0):r||(r=setTimeout((()=>{t.apply(s,n),r=null}),e))}}}},e={};return function i(s){var r=e[s];if(void 0!==r)return r.exports;var o=e[s]={exports:{}};return t[s].call(o.exports,o,o.exports,i),o.exports}(607)})()));