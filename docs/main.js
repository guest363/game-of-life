!function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=1)}([function(t,e,r){},function(t,e,r){"use strict";r.r(e);r(0);var n=document.getElementById("game-land"),o=window.innerWidth-.1*window.innerWidth,i=window.innerHeight-.15*window.innerHeight,a=Math.floor(i/30),c=Math.floor(o/30),u=function(){var t=document.createElement("div");return t.classList.add("cell"),t.onclick=function(){this.classList.toggle("cell__active")},t};function l(t){return function(t){if(Array.isArray(t))return f(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return f(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return f(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function f(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function d(t){return function(t){if(Array.isArray(t))return s(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return s(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return s(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}var p=function(t){var e=[];return t.forEach((function(r,n){d(r.children).forEach((function(r,o){var i,u,l=function(t,e){for(var r=t[0],n=t[1],o=function(t){return(r+t+a)%a},i=function(t){return(n+t+c)%c},u=0,l=-1;l<=1;l++)for(var f=-1;f<=1;f++){if(0===l&&0===f);else e[o(l)].children[i(f)].classList.contains("cell__active")&&(u+=1)}return u}([n,o],t),f=r.classList.contains("cell__active"),d={rowIndex:n,cellIndex:o,action:""};i=f,u=l,d.action=!i&&3===u||i&&(2===u||3===u)?"add":"remove",e.push(d)}))})),e},y=function(t){p(t).forEach((function(e){var r=e.rowIndex,n=e.cellIndex,o=e.action;t[r].children[n].classList[o]("cell__active")}))},v=function(t,e,r){for(var n=new DocumentFragment,o=0;o<e;o++){var i=document.createElement("div");i.classList.add("row"),i.classList.add("row-".concat(o));for(var a=0;a<r;a++){var c=u();i.append(c)}n.append(i)}return t.append(n),l(t.children)}(n,a,c),m=setInterval(y,2500,v);window.setEvoSpeed=function(){var t=document.getElementById("speed").value;clearInterval(m),m=setInterval(y,100*t,v)}}]);