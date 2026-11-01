var n1=globalThis,p1=n1.ShadowRoot&&(n1.ShadyCSS===void 0||n1.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,h1=Symbol(),G1=new WeakMap,H1=class{constructor(L,C,H){if(this._$cssResult$=!0,H!==h1)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=L,this.t=C}get styleSheet(){let L=this.o,C=this.t;if(p1&&L===void 0){let H=C!==void 0&&C.length===1;H&&(L=G1.get(C)),L===void 0&&((this.o=L=new CSSStyleSheet).replaceSync(this.cssText),H&&G1.set(C,L))}return L}toString(){return this.cssText}},m1=e=>new H1(typeof e=="string"?e:e+"",void 0,h1),c=(e,...L)=>{let C=e.length===1?e[0]:L.reduce((H,V,M)=>H+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(V)+e[M+1],e[0]);return new H1(C,e,h1)},Q1=(e,L)=>{if(p1)e.adoptedStyleSheets=L.map(C=>C instanceof CSSStyleSheet?C:C.styleSheet);else for(let C of L){let H=document.createElement("style"),V=n1.litNonce;V!==void 0&&H.setAttribute("nonce",V),H.textContent=C.cssText,e.appendChild(H)}},g1=p1?e=>e:e=>e instanceof CSSStyleSheet?(L=>{let C="";for(let H of L.cssRules)C+=H.cssText;return m1(C)})(e):e;var{is:$2,defineProperty:W2,getOwnPropertyDescriptor:I2,getOwnPropertyNames:U2,getOwnPropertySymbols:z2,getPrototypeOf:G2}=Object,l1=globalThis,K1=l1.trustedTypes,Q2=K1?K1.emptyScript:"",K2=l1.reactiveElementPolyfillSupport,V1=(e,L)=>e,f1={toAttribute(e,L){switch(L){case Boolean:e=e?Q2:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,L){let C=e;switch(L){case Boolean:C=e!==null;break;case Number:C=e===null?null:Number(e);break;case Object:case Array:try{C=JSON.parse(e)}catch{C=null}}return C}},j1=(e,L)=>!$2(e,L),q1={attribute:!0,type:String,converter:f1,reflect:!1,useDefault:!1,hasChanged:j1};Symbol.metadata??=Symbol("metadata"),l1.litPropertyMetadata??=new WeakMap;var g=class extends HTMLElement{static addInitializer(L){this._$Ei(),(this.l??=[]).push(L)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(L,C=q1){if(C.state&&(C.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(L)&&((C=Object.create(C)).wrapped=!0),this.elementProperties.set(L,C),!C.noAccessor){let H=Symbol(),V=this.getPropertyDescriptor(L,H,C);V!==void 0&&W2(this.prototype,L,V)}}static getPropertyDescriptor(L,C,H){let{get:V,set:M}=I2(this.prototype,L)??{get(){return this[C]},set(r){this[C]=r}};return{get:V,set(r){let i=V?.call(this);M?.call(this,r),this.requestUpdate(L,i,H)},configurable:!0,enumerable:!0}}static getPropertyOptions(L){return this.elementProperties.get(L)??q1}static _$Ei(){if(this.hasOwnProperty(V1("elementProperties")))return;let L=G2(this);L.finalize(),L.l!==void 0&&(this.l=[...L.l]),this.elementProperties=new Map(L.elementProperties)}static finalize(){if(this.hasOwnProperty(V1("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(V1("properties"))){let C=this.properties,H=[...U2(C),...z2(C)];for(let V of H)this.createProperty(V,C[V])}let L=this[Symbol.metadata];if(L!==null){let C=litPropertyMetadata.get(L);if(C!==void 0)for(let[H,V]of C)this.elementProperties.set(H,V)}this._$Eh=new Map;for(let[C,H]of this.elementProperties){let V=this._$Eu(C,H);V!==void 0&&this._$Eh.set(V,C)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(L){let C=[];if(Array.isArray(L)){let H=new Set(L.flat(1/0).reverse());for(let V of H)C.unshift(g1(V))}else L!==void 0&&C.push(g1(L));return C}static _$Eu(L,C){let H=C.attribute;return H===!1?void 0:typeof H=="string"?H:typeof L=="string"?L.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(L=>this.enableUpdating=L),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(L=>L(this))}addController(L){(this._$EO??=new Set).add(L),this.renderRoot!==void 0&&this.isConnected&&L.hostConnected?.()}removeController(L){this._$EO?.delete(L)}_$E_(){let L=new Map,C=this.constructor.elementProperties;for(let H of C.keys())this.hasOwnProperty(H)&&(L.set(H,this[H]),delete this[H]);L.size>0&&(this._$Ep=L)}createRenderRoot(){let L=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Q1(L,this.constructor.elementStyles),L}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(L=>L.hostConnected?.())}enableUpdating(L){}disconnectedCallback(){this._$EO?.forEach(L=>L.hostDisconnected?.())}attributeChangedCallback(L,C,H){this._$AK(L,H)}_$ET(L,C){let H=this.constructor.elementProperties.get(L),V=this.constructor._$Eu(L,H);if(V!==void 0&&H.reflect===!0){let M=(H.converter?.toAttribute!==void 0?H.converter:f1).toAttribute(C,H.type);this._$Em=L,M==null?this.removeAttribute(V):this.setAttribute(V,M),this._$Em=null}}_$AK(L,C){let H=this.constructor,V=H._$Eh.get(L);if(V!==void 0&&this._$Em!==V){let M=H.getPropertyOptions(V),r=typeof M.converter=="function"?{fromAttribute:M.converter}:M.converter?.fromAttribute!==void 0?M.converter:f1;this._$Em=V;let i=r.fromAttribute(C,M.type);this[V]=i??this._$Ej?.get(V)??i,this._$Em=null}}requestUpdate(L,C,H,V=!1,M){if(L!==void 0){let r=this.constructor;if(V===!1&&(M=this[L]),H??=r.getPropertyOptions(L),!((H.hasChanged??j1)(M,C)||H.useDefault&&H.reflect&&M===this._$Ej?.get(L)&&!this.hasAttribute(r._$Eu(L,H))))return;this.C(L,C,H)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(L,C,{useDefault:H,reflect:V,wrapped:M},r){H&&!(this._$Ej??=new Map).has(L)&&(this._$Ej.set(L,r??C??this[L]),M!==!0||r!==void 0)||(this._$AL.has(L)||(this.hasUpdated||H||(C=void 0),this._$AL.set(L,C)),V===!0&&this._$Em!==L&&(this._$Eq??=new Set).add(L))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(C){Promise.reject(C)}let L=this.scheduleUpdate();return L!=null&&await L,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[V,M]of this._$Ep)this[V]=M;this._$Ep=void 0}let H=this.constructor.elementProperties;if(H.size>0)for(let[V,M]of H){let{wrapped:r}=M,i=this[V];r!==!0||this._$AL.has(V)||i===void 0||this.C(V,void 0,M,i)}}let L=!1,C=this._$AL;try{L=this.shouldUpdate(C),L?(this.willUpdate(C),this._$EO?.forEach(H=>H.hostUpdate?.()),this.update(C)):this._$EM()}catch(H){throw L=!1,this._$EM(),H}L&&this._$AE(C)}willUpdate(L){}_$AE(L){this._$EO?.forEach(C=>C.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(L)),this.updated(L)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(L){return!0}update(L){this._$Eq&&=this._$Eq.forEach(C=>this._$ET(C,this[C])),this._$EM()}updated(L){}firstUpdated(L){}};g.elementStyles=[],g.shadowRootOptions={mode:"open"},g[V1("elementProperties")]=new Map,g[V1("finalized")]=new Map,K2?.({ReactiveElement:g}),(l1.reactiveElementVersions??=[]).push("2.1.2");var B1=globalThis,Y1=e=>e,v1=B1.trustedTypes,X1=v1?v1.createPolicy("lit-html",{createHTML:e=>e}):void 0,M2="$lit$",O=`lit$${Math.random().toFixed(9).slice(2)}$`,r2="?"+O,q2=`<${r2}>`,P=document,M1=()=>P.createComment(""),r1=e=>e===null||typeof e!="object"&&typeof e!="function",P1=Array.isArray,j2=e=>P1(e)||typeof e?.[Symbol.iterator]=="function",O1=`[ 	
\f\r]`,L1=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,J1=/-->/g,C2=/>/g,_=RegExp(`>|${O1}(?:([^\\s"'>=/]+)(${O1}*=${O1}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),H2=/'/g,V2=/"/g,e2=/^(?:script|style|textarea|title)$/i,T1=e=>(L,...C)=>({_$litType$:e,strings:L,values:C}),d=T1(1),t2=T1(2),g5=T1(3),T=Symbol.for("lit-noChange"),l=Symbol.for("lit-nothing"),L2=new WeakMap,B=P.createTreeWalker(P,129);function i2(e,L){if(!P1(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return X1!==void 0?X1.createHTML(L):L}var Y2=(e,L)=>{let C=e.length-1,H=[],V,M=L===2?"<svg>":L===3?"<math>":"",r=L1;for(let i=0;i<C;i++){let t=e[i],o,a,A=-1,p=0;for(;p<t.length&&(r.lastIndex=p,a=r.exec(t),a!==null);)p=r.lastIndex,r===L1?a[1]==="!--"?r=J1:a[1]!==void 0?r=C2:a[2]!==void 0?(e2.test(a[2])&&(V=RegExp("</"+a[2],"g")),r=_):a[3]!==void 0&&(r=_):r===_?a[0]===">"?(r=V??L1,A=-1):a[1]===void 0?A=-2:(A=r.lastIndex-a[2].length,o=a[1],r=a[3]===void 0?_:a[3]==='"'?V2:H2):r===V2||r===H2?r=_:r===J1||r===C2?r=L1:(r=_,V=void 0);let m=r===_&&e[i+1].startsWith("/>")?" ":"";M+=r===L1?t+q2:A>=0?(H.push(o),t.slice(0,A)+M2+t.slice(A)+O+m):t+O+(A===-2?i:m)}return[i2(e,M+(e[C]||"<?>")+(L===2?"</svg>":L===3?"</math>":"")),H]},e1=class e{constructor({strings:L,_$litType$:C},H){let V;this.parts=[];let M=0,r=0,i=L.length-1,t=this.parts,[o,a]=Y2(L,C);if(this.el=e.createElement(o,H),B.currentNode=this.el.content,C===2||C===3){let A=this.el.content.firstChild;A.replaceWith(...A.childNodes)}for(;(V=B.nextNode())!==null&&t.length<i;){if(V.nodeType===1){if(V.hasAttributes())for(let A of V.getAttributeNames())if(A.endsWith(M2)){let p=a[r++],m=V.getAttribute(A).split(O),n=/([.?@])?(.*)/.exec(p);t.push({type:1,index:M,name:n[2],strings:m,ctor:n[1]==="."?k1:n[1]==="?"?b1:n[1]==="@"?w1:D}),V.removeAttribute(A)}else A.startsWith(O)&&(t.push({type:6,index:M}),V.removeAttribute(A));if(e2.test(V.tagName)){let A=V.textContent.split(O),p=A.length-1;if(p>0){V.textContent=v1?v1.emptyScript:"";for(let m=0;m<p;m++)V.append(A[m],M1()),B.nextNode(),t.push({type:2,index:++M});V.append(A[p],M1())}}}else if(V.nodeType===8)if(V.data===r2)t.push({type:2,index:M});else{let A=-1;for(;(A=V.data.indexOf(O,A+1))!==-1;)t.push({type:7,index:M}),A+=O.length-1}M++}}static createElement(L,C){let H=P.createElement("template");return H.innerHTML=L,H}};function R(e,L,C=e,H){if(L===T)return L;let V=H!==void 0?C._$Co?.[H]:C._$Cl,M=r1(L)?void 0:L._$litDirective$;return V?.constructor!==M&&(V?._$AO?.(!1),M===void 0?V=void 0:(V=new M(e),V._$AT(e,C,H)),H!==void 0?(C._$Co??=[])[H]=V:C._$Cl=V),V!==void 0&&(L=R(e,V._$AS(e,L.values),V,H)),L}var y1=class{constructor(L,C){this._$AV=[],this._$AN=void 0,this._$AD=L,this._$AM=C}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(L){let{el:{content:C},parts:H}=this._$AD,V=(L?.creationScope??P).importNode(C,!0);B.currentNode=V;let M=B.nextNode(),r=0,i=0,t=H[0];for(;t!==void 0;){if(r===t.index){let o;t.type===2?o=new t1(M,M.nextSibling,this,L):t.type===1?o=new t.ctor(M,t.name,t.strings,this,L):t.type===6&&(o=new _1(M,this,L)),this._$AV.push(o),t=H[++i]}r!==t?.index&&(M=B.nextNode(),r++)}return B.currentNode=P,V}p(L){let C=0;for(let H of this._$AV)H!==void 0&&(H.strings!==void 0?(H._$AI(L,H,C),C+=H.strings.length-2):H._$AI(L[C])),C++}},t1=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(L,C,H,V){this.type=2,this._$AH=l,this._$AN=void 0,this._$AA=L,this._$AB=C,this._$AM=H,this.options=V,this._$Cv=V?.isConnected??!0}get parentNode(){let L=this._$AA.parentNode,C=this._$AM;return C!==void 0&&L?.nodeType===11&&(L=C.parentNode),L}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(L,C=this){L=R(this,L,C),r1(L)?L===l||L==null||L===""?(this._$AH!==l&&this._$AR(),this._$AH=l):L!==this._$AH&&L!==T&&this._(L):L._$litType$!==void 0?this.$(L):L.nodeType!==void 0?this.T(L):j2(L)?this.k(L):this._(L)}O(L){return this._$AA.parentNode.insertBefore(L,this._$AB)}T(L){this._$AH!==L&&(this._$AR(),this._$AH=this.O(L))}_(L){this._$AH!==l&&r1(this._$AH)?this._$AA.nextSibling.data=L:this.T(P.createTextNode(L)),this._$AH=L}$(L){let{values:C,_$litType$:H}=L,V=typeof H=="number"?this._$AC(L):(H.el===void 0&&(H.el=e1.createElement(i2(H.h,H.h[0]),this.options)),H);if(this._$AH?._$AD===V)this._$AH.p(C);else{let M=new y1(V,this),r=M.u(this.options);M.p(C),this.T(r),this._$AH=M}}_$AC(L){let C=L2.get(L.strings);return C===void 0&&L2.set(L.strings,C=new e1(L)),C}k(L){P1(this._$AH)||(this._$AH=[],this._$AR());let C=this._$AH,H,V=0;for(let M of L)V===C.length?C.push(H=new e(this.O(M1()),this.O(M1()),this,this.options)):H=C[V],H._$AI(M),V++;V<C.length&&(this._$AR(H&&H._$AB.nextSibling,V),C.length=V)}_$AR(L=this._$AA.nextSibling,C){for(this._$AP?.(!1,!0,C);L!==this._$AB;){let H=Y1(L).nextSibling;Y1(L).remove(),L=H}}setConnected(L){this._$AM===void 0&&(this._$Cv=L,this._$AP?.(L))}},D=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(L,C,H,V,M){this.type=1,this._$AH=l,this._$AN=void 0,this.element=L,this.name=C,this._$AM=V,this.options=M,H.length>2||H[0]!==""||H[1]!==""?(this._$AH=Array(H.length-1).fill(new String),this.strings=H):this._$AH=l}_$AI(L,C=this,H,V){let M=this.strings,r=!1;if(M===void 0)L=R(this,L,C,0),r=!r1(L)||L!==this._$AH&&L!==T,r&&(this._$AH=L);else{let i=L,t,o;for(L=M[0],t=0;t<M.length-1;t++)o=R(this,i[H+t],C,t),o===T&&(o=this._$AH[t]),r||=!r1(o)||o!==this._$AH[t],o===l?L=l:L!==l&&(L+=(o??"")+M[t+1]),this._$AH[t]=o}r&&!V&&this.j(L)}j(L){L===l?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,L??"")}},k1=class extends D{constructor(){super(...arguments),this.type=3}j(L){this.element[this.name]=L===l?void 0:L}},b1=class extends D{constructor(){super(...arguments),this.type=4}j(L){this.element.toggleAttribute(this.name,!!L&&L!==l)}},w1=class extends D{constructor(L,C,H,V,M){super(L,C,H,V,M),this.type=5}_$AI(L,C=this){if((L=R(this,L,C,0)??l)===T)return;let H=this._$AH,V=L===l&&H!==l||L.capture!==H.capture||L.once!==H.once||L.passive!==H.passive,M=L!==l&&(H===l||V);V&&this.element.removeEventListener(this.name,this,H),M&&this.element.addEventListener(this.name,this,L),this._$AH=L}handleEvent(L){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,L):this._$AH.handleEvent(L)}},_1=class{constructor(L,C,H){this.element=L,this.type=6,this._$AN=void 0,this._$AM=C,this.options=H}get _$AU(){return this._$AM._$AU}_$AI(L){R(this,L)}};var X2=B1.litHtmlPolyfillSupport;X2?.(e1,t1),(B1.litHtmlVersions??=[]).push("3.3.3");var o2=(e,L,C)=>{let H=C?.renderBefore??L,V=H._$litPart$;if(V===void 0){let M=C?.renderBefore??null;H._$litPart$=V=new t1(L.insertBefore(M1(),M),M,void 0,C??{})}return V._$AI(e),V};var F1=globalThis,v=class extends g{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let L=super.createRenderRoot();return this.renderOptions.renderBefore??=L.firstChild,L}update(L){let C=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(L),this._$Do=o2(C,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return T}};v._$litElement$=!0,v.finalized=!0,F1.litElementHydrateSupport?.({LitElement:v});var J2=F1.litElementPolyfillSupport;J2?.({LitElement:v});(F1.litElementVersions??=[]).push("4.2.2");var C5=e=>!!e&&typeof e.subscribe=="function";function H5(e){let L=location.pathname.split("/")[1]??"",C=e;for(let H of[`_energy_${L}`,"_energy"])if(C5(C[H]))return C[H]}var V5=()=>new Date().setHours(24,0,0,0)-1;function E(e,L){let C,H,V=0,M=()=>{let r=H5(e);if(r){C=r.subscribe(i=>L({start:new Date(i.start).getTime(),end:i.end?new Date(i.end).getTime():V5()}));return}V+=1,V===2&&L(null),V<20&&(H=window.setTimeout(M,500))};return M(),()=>{window.clearTimeout(H),C?.()}}function N(e,L){let C=(M,r)=>{let i=Math.abs(M),t=r??(i<10?2:i<100?1:0);return new Intl.NumberFormat(e,{maximumFractionDigits:t,minimumFractionDigits:r??0}).format(M)};return{number:C,value:(M,r)=>{switch(r){case"energy":return`${C(M,Math.abs(M)<100?1:0)} kWh`;case"money":{let i=Math.abs(M)<100;return new Intl.NumberFormat(e,{style:"currency",currency:L,maximumFractionDigits:i?2:0,minimumFractionDigits:i?2:0}).format(M)}case"price":return L==="EUR"?`${C(M*100,1)} ct/kWh`:`${new Intl.NumberFormat(e,{style:"currency",currency:L,maximumFractionDigits:3}).format(M)}/kWh`;case"percent":return new Intl.NumberFormat(e,{style:"percent",maximumFractionDigits:0}).format(M/100);case"number":return C(M,Math.abs(M)<100?1:0)}},currencySymbol:()=>new Intl.NumberFormat(e,{style:"currency",currency:L}).formatToParts(0).find(M=>M.type==="currency")?.value??""}}var R1={energy:["energy"],cost:["cost"],price:["cost","energy","solar"],solar_share:["solar","energy"],cheap_share:["cheap","solar","energy"],expensive_share:["expensive","solar","energy"],self_consumption:["self_used","energy"],export:["export"],saving:["saving"],forecast_today:[],forecast_tomorrow:[]},L5={energy:["solar","export"],cost:["energy","solar"]},M5=Object.keys(R1),s1=e=>e==="forecast_today"||e==="forecast_tomorrow";function y(e){return M5.filter(L=>s1(L)?e.forecast===!0:R1[L].every(C=>e.statistics[C]?.length))}function a2(e,L){return[...R1[L],...L5[L]??[]].flatMap(C=>e.statistics[C]??[])}var x1=(e,L)=>L>0?e/L*100:null;function $(e,L,C,H){let V=C("energy"),M=C("solar"),r=t=>({value:t,unit:"energy"}),i=t=>({value:t,unit:"number"});switch(e){case"energy":{if(V!==null&&M!==null&&V>0){let o=x1(M,V)??0;return{value:V,unit:"energy",line:{key:"line_solar_part",values:{percent:{value:o,unit:"percent"}}}}}let t=C("export");return L.kind==="grid"&&t!==null?{value:V,unit:"energy",line:{key:"line_exported",values:{energy:r(t)}}}:{value:V,unit:"energy"}}case"cost":{let t=C("cost");return t!==null&&V&&M!==null?{value:t,unit:"money",line:{key:"line_average_price",values:{price:{value:t/V,unit:"price"}}}}:t!==null&&V!==null&&L.kind==="grid"?{value:t,unit:"money",line:{key:"line_for_import",values:{energy:r(V)}}}:{value:t,unit:"money"}}case"price":{let t=C("cost");return t===null||!V?{value:null,unit:"price"}:{value:t/V,unit:"price",line:{key:"line_cost_for",values:{cost:{value:t,unit:"money"},energy:r(V)}}}}case"solar_share":{if(V===null||M===null)return{value:null,unit:"percent"};let t=x1(M,V);return{value:t,unit:"percent",bar:t??0,line:{key:"line_from_solar",values:{part:i(M),whole:r(V)}}}}case"cheap_share":case"expensive_share":{let t=C(e==="cheap_share"?"cheap":"expensive");if(V===null||M===null||t===null)return{value:null,unit:"percent"};let o=Math.max(V-M,0),a=x1(t,o);return{value:a,unit:"percent",bar:a??0,line:{key:"line_of_grid",values:{part:i(t),whole:r(o)}}}}case"self_consumption":{let t=C("self_used");if(V===null||t===null)return{value:null,unit:"percent"};let o=x1(t,V);return{value:o,unit:"percent",bar:o??0,line:{key:"line_self_used",values:{part:i(t),whole:r(V)}}}}case"export":return{value:C("export"),unit:"energy"};case"saving":return{value:C("saving"),unit:"money"};case"forecast_today":case"forecast_tomorrow":return{value:H,unit:"energy"}}}var A2=["change","mean","min","max"],S=e=>e.statistic!==void 0?"statistic":e.entity!==void 0?"entity":"energy";function k({start:e,end:L}){let C=L-e;return C<=2*864e5+36e5?"hour":C<=95*864e5?"day":C<=3*366*864e5?"month":"year"}var W=e=>e==="year"?"month":e,r5=(e,L)=>{let C=new Date(e);return L==="hour"?C.setMinutes(0,0,0):(C.setHours(0,0,0,0),L==="day"||(C.setDate(1),L==="month")?C.getTime():C.setMonth(0))},e5=(e,L)=>{let C=new Date(e);return L==="hour"?C.setHours(C.getHours()+1):L==="day"?C.setDate(C.getDate()+1):L==="month"?C.setMonth(C.getMonth()+1):C.setFullYear(C.getFullYear()+1),C.getTime()};function d2({start:e,end:L},C){let H=[];for(let V=r5(e,C);V<=L&&H.length<400;V=e5(V,C))H.push(V);return H}function n2(e,L=new Date){let C=e.filter(V=>V!==null).map(V=>V.getFullYear()),H=Math.min(L.getFullYear(),...C);return{start:new Date(H,0,1).getTime(),end:new Date(L.getFullYear()+1,0,1).getTime()-1}}function D1(e,L,C){let H=L.map(()=>null),V=C==="hour"?0:12*36e5;for(let M of e??[]){if(M.change===null||M.change===void 0)continue;let r=(typeof M.start=="number"?M.start:Date.parse(M.start))+V,i=-1;for(let t=0;t<L.length&&L[t]<=r;t+=1)i=t;i<0||(H[i]=(H[i]??0)+M.change)}return H}function f(e,L=new Date){let C=(r,i)=>({start:r.getTime(),end:i.getTime()-1}),H=L.getFullYear(),V=L.getMonth(),M=L.getDate();switch(e){case"today":return C(new Date(H,V,M),new Date(H,V,M+1));case"yesterday":return C(new Date(H,V,M-1),new Date(H,V,M));case"this_month":return C(new Date(H,V,1),new Date(H,V+1,1));case"last_month":return C(new Date(H,V-1,1),new Date(H,V,1));case"this_year":return C(new Date(H,0,1),new Date(H+1,0,1));case"last_year":return C(new Date(H-1,0,1),new Date(H,0,1))}}function I({start:e,end:L},C){let H=new Date(e),V=new Date(L),M=(t,o)=>new Intl.DateTimeFormat(C,t).format(o);if(H.toDateString()===V.toDateString())return M({day:"numeric",month:"short"},H);let i=H.getDate()===1&&new Date(L+1).getDate()===1;return i&&H.getMonth()===0&&V.getMonth()===11&&H.getFullYear()===V.getFullYear()?M({year:"numeric"},H):i&&H.getMonth()===V.getMonth()&&H.getFullYear()===V.getFullYear()?M({month:"short",year:"numeric"},H):new Intl.DateTimeFormat(C,{day:"numeric",month:"short"}).formatRange(H,V)}function p2(e,L,C){let H=L.map(()=>0),V=L.map(()=>0),M=C==="hour"?0:12*36e5;for(let r of e??[]){if(r.mean===null||r.mean===void 0)continue;let i=(typeof r.start=="number"?r.start:Date.parse(r.start))+M,t=-1;for(let o=0;o<L.length&&L[o]<=i;o+=1)t=o;t<0||(H[t]+=r.mean,V[t]+=1)}return H.map((r,i)=>V[i]?r/V[i]:null)}var E1={title:"Balance","category.pv":"PV plant","category.heat_pump":"Heat pump","category.wallbox":"Electric car",show_yearly:"Show yearly figures",show_total:"Show totals",not_set_up:"Set up the Energy Payback integration to see what your PV plant, heat pump, and electric car have saved.",calculating_all:"The past is being computed \u2026",calculating:"Being computed \u2026",saved_invested:"{saved} saved, {invested} invested",saved_only:"{saved} saved",of_investment:"{percent} of {investment}",paid_off:"paid off",since:"since {date}",heat_estimated:"heat partly estimated",instead_heat_pump:"no extra cost entered",instead_wallbox:"no extra cost entered",instead_pv:"no purchase cost entered",in_the_plus_from:"In the plus from about {date}",in_the_plus:"In the plus",yearly_after_twelve:"Yearly figures after twelve months of data.",yearly_from:"Yearly figure from {date}",pays_off_in:"pays off in about {years}",years_one:"1 year",years_other:"{count} years",under_one_year:"less than a year",return_per_year:"paid off, {percent} return per year",instead_of_gas:"instead of gas",instead_of_oil:"instead of oil",instead_of_fuel:"instead of fuel",per_year:"{amount}/year",gas:"Gas {price}/kWh",oil:"Oil {price}/l",fuel:"Fuel {price}/l",prices_link:"Change the prices",progress:"{name}: {percent} of the investment saved",history_title:"Savings",history_total:"Total",history_no_chart:"The chart is only shown in Home Assistant.",history_failed:"The statistics could not be loaded.",history_empty:"No savings in this period.",figures_title:"Key figures",figures_failed:"The figures could not be loaded.",figures_unavailable:"not available","figure.energy":"Consumption","figure.energy.grid":"Grid import","figure.energy.solar":"Solar production","figure.cost":"Costs","figure.cost.grid":"Grid costs","figure.price":"Average price","figure.solar_share":"Solar share","figure.solar_share.household":"Self-sufficiency","figure.cheap_share":"Cheap grid power","figure.expensive_share":"Expensive grid power","figure.self_consumption":"Self-consumption","figure.export":"Feed-in","figure.saving":"Saving","figure.forecast_today":"Forecast today","figure.forecast_tomorrow":"Forecast tomorrow",line_solar_part:"{percent} of it solar power",line_exported:"{energy} fed in",line_average_price:"average {price}",line_for_import:"for {energy} imported",line_cost_for:"{cost} for {energy}",line_from_solar:"{part} of {whole} from solar",line_of_grid:"{part} of {whole} grid power",line_self_used:"{part} of {whole} used in the house","value.change":"total in the period","value.mean":"average","value.min":"minimum","value.max":"maximum",value_range:"from {min} to {max}",value_current:"current value","period.energy_date":"Follow the date selection","period.today":"Today","period.yesterday":"Yesterday","period.this_month":"This month","period.last_month":"Last month","period.this_year":"This year","period.last_year":"Last year",editor_title:"Title (optional)",editor_period:"Period",editor_period_hint:"Without a date selection on the dashboard: this month.",editor_columns:"Columns",editor_columns_auto:"Auto",editor_tiles:"Tiles",editor_add_tile:"Add tile",editor_edit_tile:"Edit tile {number}",editor_back:"Back",editor_edit:"Edit",editor_remove:"Remove",editor_source:"Source","source.energy":"Energy data","source.statistic":"Statistic","source.entity":"Entity",editor_area:"Area",editor_figure:"Figure",editor_statistic:"Statistic",editor_value:"Value",editor_secondary:"Line below","secondary.none":"Default","secondary.range":"Range of the period",editor_entity:"Entity",editor_name:"Name (optional)",editor_not_loaded:"Energy data need the Energy Payback integration.","source.solar":"Solar power","source.grid":"Grid power","source.normal":"Normal grid power","source.cheap":"Cheap grid power","source.expensive":"Expensive grid power","stack.source":"By source","stack.consumer":"By consumer","stack.none":"Not stacked",editor_savings:"Savings of all categories",editor_stack:"Stacking",editor_line:"Line",editor_lines:"Further lines from statistics",editor_line_none:"None",history_empty_figure:"No data in this period.",breakdown_mix:"Electricity mix",breakdown_cost_by_consumer:"Costs by consumer",breakdown_energy_by_consumer:"Consumption by consumer",breakdown_total_energy:"kWh consumed",breakdown_total_cost:"costs",breakdown_solar_chip:"{percent} solar",editor_by:"Split","by.source":"By source","by.consumer":"By consumer",editor_display:"Display","display.ring":"Ring","display.bars":"Bars",editor_color_by_source:"Color the bars by source",editor_breakdown_source:"Source","breakdown_source.energy":"Energy data","breakdown_source.statistics":"Statistics",editor_statistics:"Statistics","figure_choice.energy":"Consumption","figure_choice.cost":"Costs"},t5={title:"Bilanz","category.pv":"PV-Anlage","category.heat_pump":"W\xE4rmepumpe","category.wallbox":"E-Auto",show_yearly:"Jahreswerte zeigen",show_total:"Gesamtwerte zeigen",not_set_up:"Richte die Integration Energy Payback ein, um zu sehen, was PV-Anlage, W\xE4rmepumpe und E-Auto gespart haben.",calculating_all:"Die Vergangenheit wird nachgerechnet \u2026",calculating:"Wird berechnet \u2026",saved_invested:"{saved} gespart, {invested} investiert",saved_only:"{saved} gespart",of_investment:"{percent} von {investment}",paid_off:"amortisiert",since:"seit {date}",heat_estimated:"W\xE4rme teilweise gesch\xE4tzt",instead_heat_pump:"ohne Mehrkosten",instead_wallbox:"ohne Mehrkosten",instead_pv:"ohne Anschaffungskosten",in_the_plus_from:"Im Plus ab etwa {date}",in_the_plus:"Im Plus",yearly_after_twelve:"Jahreswerte gibt es nach zw\xF6lf Monaten Daten.",yearly_from:"Jahreswert ab {date}",pays_off_in:"amortisiert in etwa {years}",years_one:"1 Jahr",years_other:"{count} Jahren",under_one_year:"weniger als einem Jahr",return_per_year:"amortisiert, {percent} Rendite pro Jahr",instead_of_gas:"statt Gas",instead_of_oil:"statt \xD6l",instead_of_fuel:"statt Sprit",per_year:"{amount}/Jahr",gas:"Gas {price}/kWh",oil:"\xD6l {price}/l",fuel:"Sprit {price}/l",prices_link:"Preise \xE4ndern",progress:"{name}: {percent} der Investition gespart",history_title:"Ersparnis",history_total:"Summe",history_no_chart:"Das Diagramm erscheint nur in Home Assistant.",history_failed:"Die Statistik konnte nicht geladen werden.",history_empty:"Keine Ersparnis in diesem Zeitraum.",figures_title:"Kennzahlen",figures_failed:"Die Kennzahlen konnten nicht geladen werden.",figures_unavailable:"nicht verf\xFCgbar","figure.energy":"Verbrauch","figure.energy.grid":"Netzbezug","figure.energy.solar":"Solarertrag","figure.cost":"Kosten","figure.cost.grid":"Netzkosten","figure.price":"\xF8 Strompreis","figure.solar_share":"Solaranteil","figure.solar_share.household":"Autarkie","figure.cheap_share":"G\xFCnstiger Netzstrom","figure.expensive_share":"Teurer Netzstrom","figure.self_consumption":"Eigenverbrauch","figure.export":"Einspeisung","figure.saving":"Ersparnis","figure.forecast_today":"Prognose heute","figure.forecast_tomorrow":"Prognose morgen",line_solar_part:"davon {percent} Solarstrom",line_exported:"{energy} eingespeist",line_average_price:"\xF8 {price}",line_for_import:"f\xFCr {energy} Netzbezug",line_cost_for:"{cost} f\xFCr {energy}",line_from_solar:"{part} von {whole} aus Solar",line_of_grid:"{part} von {whole} Netzstrom",line_self_used:"{part} von {whole} im Haus genutzt","value.change":"Summe im Zeitraum","value.mean":"Mittelwert","value.min":"Minimum","value.max":"Maximum",value_range:"von {min} bis {max}",value_current:"aktueller Wert","period.energy_date":"Der Datumsauswahl folgen","period.today":"Heute","period.yesterday":"Gestern","period.this_month":"Dieser Monat","period.last_month":"Letzter Monat","period.this_year":"Dieses Jahr","period.last_year":"Letztes Jahr",editor_title:"Titel (optional)",editor_period:"Zeitraum",editor_period_hint:"Ohne Datumsauswahl auf dem Dashboard: dieser Monat.",editor_columns:"Spalten",editor_columns_auto:"Auto",editor_tiles:"Kacheln",editor_add_tile:"Kachel hinzuf\xFCgen",editor_edit_tile:"Kachel {number} bearbeiten",editor_back:"Zur\xFCck",editor_edit:"Bearbeiten",editor_remove:"Entfernen",editor_source:"Quelle","source.energy":"Energiedaten","source.statistic":"Statistik","source.entity":"Entit\xE4t",editor_area:"Bereich",editor_figure:"Gr\xF6\xDFe",editor_statistic:"Statistik",editor_value:"Wert",editor_secondary:"Unterzeile","secondary.none":"Standard","secondary.range":"Spanne im Zeitraum",editor_entity:"Entit\xE4t",editor_name:"Name (optional)",editor_not_loaded:"Energiedaten brauchen die Integration Energy Payback.","source.solar":"Solarstrom","source.grid":"Netzstrom","source.normal":"Normaler Netzstrom","source.cheap":"G\xFCnstiger Netzstrom","source.expensive":"Teurer Netzstrom","stack.source":"Nach Quelle","stack.consumer":"Nach Verbraucher","stack.none":"Nicht gestapelt",editor_savings:"Ersparnisse aller Kategorien",editor_stack:"Stapelung",editor_line:"Linie",editor_lines:"Weitere Linien aus Statistiken",editor_line_none:"Keine",history_empty_figure:"Keine Daten in diesem Zeitraum.",breakdown_mix:"Strommix",breakdown_cost_by_consumer:"Kosten nach Verbraucher",breakdown_energy_by_consumer:"Verbrauch nach Verbraucher",breakdown_total_energy:"kWh Verbrauch",breakdown_total_cost:"Kosten",breakdown_solar_chip:"{percent} Solar",editor_by:"Aufteilen","by.source":"Nach Quelle","by.consumer":"Nach Verbraucher",editor_display:"Darstellung","display.ring":"Ring","display.bars":"Balken",editor_color_by_source:"Balken nach Quelle f\xE4rben",editor_breakdown_source:"Quelle","breakdown_source.energy":"Energiedaten","breakdown_source.statistics":"Statistiken",editor_statistics:"Statistiken","figure_choice.energy":"Verbrauch","figure_choice.cost":"Kosten"},i5={en:E1,de:t5},U=e=>e in E1;function u(e){let L=i5[e.split("-")[0]]??E1;return(C,H={})=>L[C].replace(/\{(\w+)\}/g,(V,M)=>H[M]??"")}var Z="energy_payback",N1=["pv","heat_pump","wallbox"];var Z1=e=>{if(e==null||e==="")return null;let L=Number(e);return Number.isFinite(L)?L:null},m2=e=>typeof e=="string"&&e?new Date(e):null;function z(e){let L=Object.values(e.entities??{}).filter(M=>M.platform===Z),C=(M,r)=>L.find(i=>i.device_id===M&&i.translation_key===r),H=M=>M?Z1(e.states[M]?.state):null,V=[];for(let M of L){if(M.translation_key!=="saving")continue;let r=e.states[M.entity_id];if(!r||r.state==="unavailable")continue;let i=r.attributes,t=i.category;N1.includes(t)&&V.push({category:t,savingStatistic:typeof i.statistic_id=="string"?i.statistic_id:`${Z}:${t}_saving`,calculating:i.calculating===!0,saving:Z1(r.state),investment:Z1(i.investment),payback:H(C(M.device_id,"payback")?.entity_id),perYear:H(C(M.device_id,"saving_per_year")?.entity_id),countingSince:m2(i.counting_since),yearlyFrom:m2(i.yearly_from),price:Z1(i.price),heating:i.heating==="gas"||i.heating==="oil"?i.heating:null,heatEstimated:i.heat_estimated===!0})}return V.sort((M,r)=>N1.indexOf(M.category)-N1.indexOf(r.category))}function l2(e,L=new Date){let C=e.some(a=>a.calculating),H=e.reduce((a,A)=>a+(A.saving??0),0),V=e.reduce((a,A)=>a+(A.investment??0),0),M=!C&&e.length>0,r=M?H-V:null,i=e.every(a=>a.perYear!==null),t=M&&i?e.reduce((a,A)=>a+(A.perYear??0),0):null,o=null;return r!==null&&t!==null&&(r>=0?o=L:t>0&&(o=new Date(L.getTime()+-r/t*12*26298e5))),{saved:H,invested:V,balance:r,perYear:t,inThePlusFrom:o,calculating:C}}function v2(e){let{investment:L,saving:C,perYear:H}=e;return L===null||L<=0||C===null||H===null||H<=0?null:Math.max(0,(L-C)/H)}function x2(e){let{investment:L,saving:C,perYear:H}=e;return L===null||L<=0||C===null||H===null||C<L?null:H/L*100}var b=c`
  :host {
    --energy-payback-pv-color: var(--energy-solar-color, #ff9800);
    --energy-payback-heat-pump-color: var(--energy-gas-color, #8e021b);
    --energy-payback-wallbox-color: var(--energy-non-fossil-color, #0f9d58);
  }
  ha-card {
    height: 100%;
    overflow: hidden;
  }
  .header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 8px 0 16px;
  }
  .title {
    flex: 1;
    min-width: 0;
    margin: 0;
    font-size: var(--ha-card-header-font-size, 24px);
    font-weight: var(--ha-font-weight-normal, 400);
    line-height: 32px;
    letter-spacing: -0.012em;
    color: var(--ha-card-header-color, var(--primary-text-color));
  }
  .chip {
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    padding: 4px 8px;
    border-radius: 8px;
    border: 1px solid var(--divider-color);
    white-space: nowrap;
    color: var(--primary-text-color);
  }
  .summary {
    margin: 0;
    padding: 12px 16px 8px;
    color: var(--secondary-text-color);
  }
  .summary:empty {
    display: none;
  }
`;var w=["energy_date","today","yesterday","this_month","last_month","this_year","last_year"];function h(e,L,C){let H=`figure.${L}.${C.kind}`,V=e(U(H)?H:`figure.${L}`);return["device","other","category"].includes(C.kind)?`${C.name} ${V}`:V}var s2=300*1e3,o5={solar_share:"var(--energy-solar-color, #ff9800)",self_consumption:"var(--energy-solar-color, #ff9800)",cheap_share:"var(--success-color, #43a047)",expensive_share:"var(--error-color, #db4437)"},$1=e=>e.toDateString();function a5(e){let L=new Date,C=$1(L),H=$1(new Date(L.getFullYear(),L.getMonth(),L.getDate()+1)),V={today:null,tomorrow:null};for(let M of Object.values(e??{}))for(let[r,i]of Object.entries(M.wh_hours??{})){let t=$1(new Date(r));t===C&&(V.today=(V.today??0)+i/1e3),t===H&&(V.tomorrow=(V.tomorrow??0)+i/1e3)}return V}var G=class extends v{constructor(){super(...arguments);this._infoAt=0;this._infoLoading=!1}static getStubConfig(){return{period:"energy_date",tiles:[{area:"household",figure:"cost"},{area:"household",figure:"solar_share"}]}}static getConfigElement(){return document.createElement("energy-payback-figures-card-editor")}setConfig(C){if(!C||C.tiles!==void 0&&!Array.isArray(C.tiles))throw new Error("tiles must be a list");this._config=C}getCardSize(){return 1+2*Math.ceil((this._config?.tiles?.length??1)/2)}getGridOptions(){return{columns:12,min_columns:3}}connectedCallback(){super.connectedCallback(),this._follow()}disconnectedCallback(){super.disconnectedCallback(),this._unfollow?.(),this._unfollow=void 0}get _localize(){return u(this.hass?.locale?.language??this.hass?.language??"en")}get _language(){return this.hass?.locale?.language??"en"}get _period(){return this._config?.period??"energy_date"}get _tiles(){return this._config?.tiles??[]}_follow(){this._period==="energy_date"&&(this._unfollow||!this.isConnected||!this.hass?.connection||(this._unfollow=E(this.hass.connection,C=>{this._selected=C})))}_range(){let C=this._period;if(C!=="energy_date")return f(C);if(this._selected!==void 0)return this._selected??f("this_month")}_area(C){return this._info?.areas.find(H=>H.id===C)}_figure(C){let H=this._area(C.area);if(!(!H||!C.figure||!y(H).includes(C.figure)))return{area:H,figure:C.figure}}async _loadInfo(){if(!(!this.hass||this._infoLoading)){this._infoLoading=!0;try{this._info=await this.hass.callWS({type:`${Z}/figures`})}catch{this._info=null}this._infoAt=Date.now(),this._infoLoading=!1}}_request(){let C=this._range();if(!C)return;let H=this._tiles;if(H.some(o=>S(o)==="energy")&&this._info===void 0)return;let M=new Set,r=new Set,i=!1;for(let o of H){let a=S(o);if(a==="statistic"&&o.statistic)M.add(o.statistic),r.add(o.statistic);else if(a==="energy"){let A=this._figure(o);if(!A)continue;s1(A.figure)&&(i=!0),a2(A.area,A.figure).forEach(p=>M.add(p))}}let t=[...M].sort();return{key:JSON.stringify([t,C.start,C.end,i]),range:C,ids:t,statistics:[...r].sort(),forecast:i}}async _load(C){if(!this.hass)return;this._loading=C.key;let H=W(k(C.range)),V={key:C.key,at:Date.now(),range:C.range,period:H,rows:{},metadata:{},forecast:{today:null,tomorrow:null},failed:!1};try{let[M,r,i]=await Promise.all([C.ids.length?this.hass.callWS({type:"recorder/statistics_during_period",start_time:new Date(C.range.start).toISOString(),end_time:new Date(C.range.end+1).toISOString(),statistic_ids:C.ids,period:H,types:["change","mean","min","max"],units:{energy:"kWh"}}):Promise.resolve({}),C.statistics.length?this.hass.callWS({type:"recorder/get_statistics_metadata",statistic_ids:C.statistics}):Promise.resolve([]),C.forecast?this.hass.callWS({type:"energy/solar_forecast"}):Promise.resolve({})]);V.rows=M,V.metadata=Object.fromEntries(r.map(t=>[t.statistic_id,t])),V.forecast=a5(i)}catch{V.failed=!0}this._loading===C.key&&(this._loading=void 0,this._loaded=V)}willUpdate(C){if(!this.hass)return;(C.has("hass")||C.has("_config"))&&this._follow();let H=Date.now()-this._infoAt>s2;(this._info===void 0||H)&&!this._infoLoading&&this._loadInfo();let V=this._request(),M=!this._loaded||Date.now()-this._loaded.at>s2;V&&V.key!==this._loading&&(V.key!==this._loaded?.key||M&&!this._loading)&&this._load(V)}get _fmt(){return N(this._language,this.hass?.config.currency??"EUR")}_number(C,H){return this._fmt.number(C,H)}_format(C,H){return this._fmt.value(C,H)}_rows(C){let H=this._loaded;if(!H)return[];let V=H.period==="hour"?0:12*36e5;return(H.rows[C]??[]).filter(M=>{let r=(typeof M.start=="number"?M.start:Date.parse(M.start))+V;return r>=H.range.start&&r<=H.range.end})}_sum(C){let H=0;for(let V of C??[])for(let M of this._rows(V))H+=M.change??0;return H}_energyTile(C){let H=this._localize,V=this._figure(C);if(!V)return this._tile(C.name??C.figure??"","\u2013",H("figures_unavailable"));let{area:M,figure:r}=V,i=C.name??h(this._localize,r,M);if(this._info?.calculating&&!s1(r))return this._tile(i,"\u2026",H("calculating"));if(!this._loaded||this._loaded.failed)return this._tile(i,"\u2013");let t=r==="forecast_today"?this._loaded.forecast.today:r==="forecast_tomorrow"?this._loaded.forecast.tomorrow:null,o=$(r,M,A=>M.statistics[A]?this._sum(M.statistics[A]):null,t),a=o.line?H(o.line.key,Object.fromEntries(Object.entries(o.line.values).map(([A,p])=>[A,this._format(p.value,p.unit)]))):void 0;return this._tile(i,o.value===null?"\u2013":this._format(o.value,o.unit),a,o.bar,o5[r])}_statisticTile(C){let H=this._localize,V=C.statistic??"",M=this._loaded?.metadata[V],r=C.name??M?.name??this.hass?.states[V]?.attributes.friendly_name??V,i=this._rows(V),t=M?.unit_class==="energy"?"kWh":M?.statistics_unit_of_measurement??"",o=n=>n===null?"\u2013":`${this._number(n)}${t?` ${t}`:""}`,a=n=>i.map(s=>s[n]).filter(s=>typeof s=="number"),A=C.value??"change",p=null;if(A==="change")p=i.length?i.reduce((n,s)=>n+(s.change??0),0):null;else if(A==="mean"){let n=a("mean");p=n.length?n.reduce((s,C1)=>s+C1,0)/n.length:null}else{let n=a(A);p=n.length?A==="min"?Math.min(...n):Math.max(...n):null}let m=H(`value.${A}`);if(C.secondary==="range"){let n=a("min"),s=a("max");n.length&&s.length&&(m=H("value_range",{min:o(Math.min(...n)),max:o(Math.max(...s))}))}return this._tile(r,this._loaded?.failed?"\u2013":o(p),m)}_entityTile(C){let H=this._localize,V=this.hass?.states[C.entity??""],M=C.name??V?.attributes.friendly_name??C.entity??"";if(!V)return this._tile(M,"\u2013",H("figures_unavailable"));let r=Number(V.state),i=V.attributes.unit_of_measurement,t=V.state!==""&&Number.isFinite(r)?`${this._number(r)}${i?` ${i}`:""}`:V.state;return this._tile(M,t,H("value_current"))}_tile(C,H,V,M,r){return d`<div class="tile">
      <div class="label">${C}</div>
      <div class="value">${H}</div>
      ${M!==void 0?d`<div class="track" role="presentation">
            <div
              class="fill"
              style="width: ${Math.min(Math.max(M,0),100)}%; background: ${r??"var(--primary-color)"}"
            ></div>
          </div>`:l}
      ${V?d`<div class="line">${V}</div>`:l}
    </div>`}render(){if(!this.hass||!this._config)return d``;let C=this._localize,H=this._range(),V=this._config.columns,M=!!V&&V>=1&&V<=4;return d`<ha-card lang=${this._language}>
      <div class="header">
        <h2 class="title">${this._config.title??""}</h2>
        ${H?d`<span class="chip">${I(H,this._language)}</span>`:l}
      </div>
      ${this._loaded?.failed?d`<p class="summary">${C("figures_failed")}</p>`:l}
      <div class="content">
      <div
        class="tiles ${M?"fixed":""}"
        style=${M?`--columns: ${V}`:""}
      >
        ${this._tiles.map(r=>{let i=S(r);return i==="statistic"?this._statisticTile(r):i==="entity"?this._entityTile(r):this._energyTile(r)})}
      </div>
      </div>
    </ha-card>`}};G.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0},_selected:{state:!0},_loaded:{state:!0}},G.styles=[b,c`
      .header {
        min-height: 32px;
      }
      .content {
        container-type: inline-size;
      }
      .tiles {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
        gap: 12px;
        padding: 12px 16px 16px;
      }
      .tiles.fixed {
        grid-template-columns: repeat(var(--columns), minmax(0, 1fr));
      }
      /* On a narrow card a fixed column count would squeeze the tiles. */
      @container (max-width: 440px) {
        .tiles.fixed {
          grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
        }
      }
      .tile {
        container-type: inline-size;
        display: flex;
        flex-direction: column;
        gap: 4px;
        min-width: 0;
        padding: 12px 14px;
        border-radius: 12px;
        background: color-mix(in srgb, var(--primary-text-color) 5%, transparent);
      }
      .label {
        font-size: 11px;
        font-weight: 500;
        letter-spacing: 0.07em;
        text-transform: uppercase;
        color: var(--secondary-text-color);
        overflow-wrap: break-word;
        hyphens: auto;
      }
      .value {
        font-size: 28px;
        line-height: 1.15;
        color: var(--primary-text-color);
      }
      @container (max-width: 150px) {
        .value {
          font-size: 22px;
        }
      }
      .line {
        font-size: 13px;
        line-height: 18px;
        color: var(--secondary-text-color);
      }
      .track {
        height: 6px;
        border-radius: 3px;
        overflow: hidden;
        background: color-mix(in srgb, var(--primary-text-color) 10%, transparent);
      }
      .fill {
        height: 100%;
        border-radius: 3px;
      }
    `];var A5=["energy","cost","saving","export"],d5=["price","solar_share","cheap_share","expensive_share","self_consumption"],i1=e=>A5.filter(L=>y(e).includes(L)),W1=e=>d5.filter(L=>y(e).includes(L));function Q(e,L){let C=[];return L==="energy"&&e.statistics.solar?.length&&C.push("source"),e.kind==="household"&&(L==="energy"||L==="cost")&&C.push("consumer"),C.push("none"),C}var Z2=["#44739e","#984ea3","#00a0a0","#ff7f00","#af8d00","#7f80cd","#86b300","#c42e60","#a65628","#f781bf"];function u1(e,L,C,H,V){let M=r=>L.statistics[r]??[];if(H==="source"&&C==="energy"){let r=[{id:"solar",name:{key:"source.solar"},color:V.solar,plus:M("solar"),minus:[]}],i=["cheap","expensive"].filter(t=>M(t).length);return M("cheap").length&&r.push({id:"cheap",name:{key:"source.cheap"},color:V.cheap,plus:M("cheap"),minus:[]}),r.push({id:"grid",name:{key:i.length?"source.normal":"source.grid"},color:V.grid,plus:M("energy"),minus:[...M("solar"),...i.flatMap(M)],floor:!0}),M("expensive").length&&r.push({id:"expensive",name:{key:"source.expensive"},color:V.expensive,plus:M("expensive"),minus:[]}),r}return H==="consumer"?e.areas.filter(i=>i.kind==="device"&&i.top_level!==!1||i.kind==="other").map((i,t)=>({id:i.id,name:{text:i.name},color:Z2[t%Z2.length],plus:i.statistics[C]??[],minus:[]})):[{id:C,name:{text:L.name},color:C==="saving"||C==="export"?V.solar:V.grid,plus:M(C),minus:[]}]}var n5=36e5;async function u2(e,L,C){if(!L.length)return{};let H=W(k(C)),V=await e.callWS({type:"recorder/statistics_during_period",start_time:new Date(C.start).toISOString(),end_time:new Date(C.end+1).toISOString(),statistic_ids:L,period:H,types:["change"],units:{energy:"kWh"}}),M=H==="hour"?0:12*n5,r={};for(let i of L){r[i]=0;for(let t of V[i]??[]){let o=(typeof t.start=="number"?t.start:Date.parse(t.start))+M;o>=C.start&&o<=C.end&&(r[i]+=t.change??0)}}return r}var c2=300*1e3,I1=64,S2=2*Math.PI*I1,K={solar:"#ff9800",grid:"#488fc2",cheap:"#43a047",expensive:"#db4437"},h2=["#8e021b","#ef9a9a","#44739e","#984ea3","#00a0a0","#ff7f00","#af8d00"],q=class extends v{constructor(){super(...arguments);this._config={type:""};this._infoAt=0;this._infoLoading=!1}static getStubConfig(){return{area:"household",by:"source",figure:"energy",display:"ring"}}static getConfigElement(){return document.createElement("energy-payback-breakdown-card-editor")}setConfig(C){if(C?.statistics!==void 0&&!Array.isArray(C.statistics))throw new Error("statistics must be a list");this._config=C??{type:""}}getCardSize(){return 4}getGridOptions(){return{columns:6,min_columns:4}}connectedCallback(){super.connectedCallback(),this._follow()}disconnectedCallback(){super.disconnectedCallback(),this._unfollow?.(),this._unfollow=void 0}get _localize(){return u(this.hass?.locale?.language??this.hass?.language??"en")}get _language(){return this.hass?.locale?.language??"en"}get _fmt(){return N(this._language,this.hass?.config.currency??"EUR")}get _byStatistics(){return!!this._config.statistics?.length}_follow(){(this._config.period??"energy_date")==="energy_date"&&(this._unfollow||!this.isConnected||!this.hass?.connection||(this._unfollow=E(this.hass.connection,C=>{this._selected=C})))}_range(){let C=this._config.period??"energy_date";if(C!=="energy_date")return f(C);if(this._selected!==void 0)return this._selected??f("this_month")}_area(){return this._info?.areas.find(C=>C.id===(this._config.area??"household"))}get _by(){let C=this._area();return this._config.by==="consumer"&&C?.kind==="household"?"consumer":C?.statistics.solar?.length?"source":"consumer"}get _figure(){return this._by==="consumer"&&this._config.figure==="cost"?"cost":"energy"}_series(){let C=this._info,H=this._area();return!C||!H?[]:u1(C,H,this._figure,this._by==="source"?"source":"consumer",K)}_ids(){let C=new Set;if(this._byStatistics)this._config.statistics?.forEach(H=>C.add(H.statistic));else{for(let H of this._series())[...H.plus,...H.minus].forEach(V=>C.add(V));if(this._by==="consumer"&&this._info)for(let H of this._series()){let V=this._info.areas.find(M=>M.id===H.id);for(let M of["energy","solar","cheap","expensive"])(V?.statistics[M]??[]).forEach(r=>C.add(r))}}return[...C].sort()}async _loadInfo(){if(!(!this.hass||this._infoLoading)){this._infoLoading=!0;try{this._info=await this.hass.callWS({type:`${Z}/figures`})}catch{this._info=null}this._infoAt=Date.now(),this._infoLoading=!1}}async _load(C,H,V){if(!this.hass)return;this._loading=C;let M={key:C,at:Date.now(),values:{},names:{},failed:!1};try{let r=this._byStatistics?H:[],[i,t]=await Promise.all([u2(this.hass,H,V),r.length?this.hass.callWS({type:"recorder/get_statistics_metadata",statistic_ids:r}):Promise.resolve([])]);M.values=i,M.names=Object.fromEntries(t.map(o=>[o.statistic_id,o.name??o.statistic_id]))}catch{M.failed=!0}this._loading===C&&(this._loading=void 0,this._sums=M)}willUpdate(C){if(!this.hass)return;if((C.has("hass")||C.has("_config"))&&this._follow(),!this._byStatistics){let i=Date.now()-this._infoAt>c2;if((this._info===void 0||i)&&!this._infoLoading&&this._loadInfo(),!this._info)return}let H=this._range();if(!H)return;let V=this._ids();if(!V.length)return;let M=JSON.stringify([V,H.start,H.end]),r=!this._sums||Date.now()-this._sums.at>c2;M!==this._loading&&(M!==this._sums?.key||r&&!this._loading)&&this._load(M,V,H)}_sum(C){return C.reduce((H,V)=>H+(this._sums?.values[V]??0),0)}_parts(){let C=this._localize;if(this._byStatistics)return(this._config.statistics??[]).map((V,M)=>({id:V.statistic,name:V.name??this._sums?.names[V.statistic]??V.statistic,color:h2[M%h2.length],value:this._sum([V.statistic])}));let H=this._series().map(V=>{let M=this._sum(V.plus)-this._sum(V.minus),r=V.name.text??(V.name.key&&U(V.name.key)?C(V.name.key):V.id),i={id:V.id,name:r,color:V.color,value:V.floor?Math.max(M,0):M};if(this._by==="consumer"&&this._info){let t=this._info.areas.find(o=>o.id===V.id);if(t){let o=n=>this._sum(t.statistics[n]??[]),a=o("energy"),A=o("solar"),p=o("cheap"),m=o("expensive");i.energy=a,i.mix=[{color:K.solar,value:A},{color:K.cheap,value:p},{color:K.grid,value:Math.max(a-A-p-m,0)},{color:K.expensive,value:m}]}}return i});return this._by==="consumer"?H.sort((V,M)=>M.value-V.value):H}_value(C){return this._figure==="cost"&&!this._byStatistics?this._fmt.value(C,"money"):this._fmt.value(C,"energy")}_title(){let C=this._localize;return this._config.title?this._config.title:this._byStatistics?"":this._by==="source"?C("breakdown_mix"):C(this._figure==="cost"?"breakdown_cost_by_consumer":"breakdown_energy_by_consumer")}_ring(C,H){let V=this._localize,M=0,r=C.filter(o=>o.value>0).map(o=>{let a=o.value/H*S2,A=C.length>1?Math.min(2,a/2):0,p=t2`<circle cx="80" cy="80" r=${I1} fill="none" stroke=${o.color}
          stroke-width="22" stroke-dasharray="${a-A} ${S2-a+A}"
          stroke-dashoffset=${-M} transform="rotate(-90 80 80)"></circle>`;return M+=a,p}),i=this._byStatistics?"kWh":V(this._figure==="cost"?"breakdown_total_cost":"breakdown_total_energy"),t=this._figure==="cost"&&!this._byStatistics?this._fmt.value(H,"money"):this._fmt.number(H,H<100?1:0);return d`<div class="ring">
      <svg viewBox="0 0 160 160" role="img" aria-label=${C.map(o=>`${o.name} ${this._value(o.value)}`).join(", ")}>
        <circle cx="80" cy="80" r=${I1} fill="none" stroke="var(--divider-color)" stroke-width="22"></circle>
        ${r}
        <text x="80" y="78" text-anchor="middle" class="center">${t}</text>
        <text x="80" y="98" text-anchor="middle" class="center-label">${this._figure==="cost"&&!this._byStatistics?"":i}</text>
      </svg>
      <div class="legend">
        ${C.map(o=>d`<div class="legend-row">
            <span class="dot" style="background: ${o.color}"></span>
            <span class="name">${o.name}</span>
            <span class="amount">${this._value(o.value)}</span>
            <span class="percent">${this._fmt.value(H>0?o.value/H*100:0,"percent")}</span>
          </div>`)}
      </div>
    </div>`}_bars(C){let H=Math.max(...C.map(r=>r.value),0),V=this._config.color_by_source===!0&&this._by==="consumer",M=this._localize;return d`<div class="bars">
      ${C.map(r=>{let i=H>0?Math.max(r.value/H*100,0):0,t=r.mix?.reduce((a,A)=>a+A.value,0)??0,o="";return r.energy!==void 0&&(o=this._fmt.value(r.energy,"energy"),this._figure==="cost"&&r.energy>0&&(o+=` \xB7 ${M("line_average_price",{price:this._fmt.value(r.value/r.energy,"price")})}`)),d`<div class="bar-row">
          <div class="bar-text">
            <span class="name">${r.name}</span>
            <span class="amount">${this._value(r.value)}</span>
          </div>
          ${o?d`<div class="bar-line">${o}</div>`:l}
          <div class="track">
            <div class="fill" style="width: ${i}%; ${V?"":`background: ${r.color}`}">
              ${V&&r.mix&&t>0?r.mix.map(a=>d`<span style="width: ${a.value/t*100}%; background: ${a.color}"></span>`):l}
            </div>
          </div>
        </div>`})}
      ${V?d`<div class="key">
            ${["solar","cheap","grid","expensive"].filter(r=>(r!=="cheap"||this._info?.levels.cheap_until!=null)&&(r!=="expensive"||this._info?.levels.expensive_from!=null)).map(r=>d`<span><span class="dot" style="background: ${K[r]}"></span>${M(r==="grid"?this._info?.levels.cheap_until!=null||this._info?.levels.expensive_from!=null?"source.normal":"source.grid":`source.${r}`)}</span>`)}
          </div>`:l}
    </div>`}render(){if(!this.hass)return d``;let C=this._localize,H=this._range(),V=this._sums?this._parts():[],M=V.reduce((a,A)=>a+Math.max(A.value,0),0),r=!this._byStatistics&&this._info?.calculating===!0,i=!this._byStatistics&&this._info!==void 0&&!this._area(),t=H?I(H,this._language):"";if(this._sums&&!this._sums.failed&&M>0){let a=V.find(A=>A.id==="solar");t=a?C("breakdown_solar_chip",{percent:this._fmt.value(a.value/M*100,"percent")}):this._value(M)}let o;return r?o=d`<p class="summary">${C("calculating_all")}</p>`:i?o=d`<p class="summary">${C(this._info===null?"editor_not_loaded":"figures_unavailable")}</p>`:this._sums?.failed?o=d`<p class="summary">${C("figures_failed")}</p>`:this._sums?M<=0?o=d`<p class="summary">${C("history_empty_figure")}</p>`:o=(this._config.display??(!this._byStatistics&&this._by==="consumer"?"bars":"ring"))==="bars"?this._bars(V):this._ring(V,M):o=d`<p class="summary">${C("calculating")}</p>`,d`<ha-card>
      <div class="header">
        <h2 class="title">${this._title()}</h2>
        ${t?d`<span class="chip">${t}</span>`:l}
      </div>
      ${o}
    </ha-card>`}};q.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0},_selected:{state:!0},_sums:{state:!0}},q.styles=[b,c`
      .header {
        min-height: 32px;
      }
      .ring {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 16px 24px;
        padding: 12px 16px 16px;
      }
      .ring svg {
        width: 160px;
        height: 160px;
        flex: none;
      }
      .center {
        font-size: 24px;
        fill: var(--primary-text-color);
      }
      .center-label {
        font-size: 11px;
        fill: var(--secondary-text-color);
      }
      .legend {
        flex: 1;
        min-width: 180px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .legend-row {
        display: grid;
        grid-template-columns: auto 1fr auto auto;
        align-items: center;
        gap: 8px;
        font-size: 14px;
      }
      .dot {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 5px;
        margin-right: 4px;
      }
      .legend-row .dot {
        margin: 0;
      }
      .percent,
      .bar-line {
        color: var(--secondary-text-color);
      }
      .amount,
      .percent {
        text-align: right;
        white-space: nowrap;
      }
      .bars {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 12px 16px 16px;
      }
      .bar-text {
        display: flex;
        justify-content: space-between;
        gap: 8px;
        font-size: 14px;
      }
      .bar-line {
        font-size: 12px;
      }
      .track {
        height: 10px;
        margin-top: 4px;
        border-radius: 5px;
        overflow: hidden;
        background: color-mix(in srgb, var(--primary-text-color) 8%, transparent);
      }
      .fill {
        display: flex;
        height: 100%;
        border-radius: 5px;
        overflow: hidden;
      }
      .fill span {
        height: 100%;
      }
      .key {
        display: flex;
        flex-wrap: wrap;
        gap: 4px 16px;
        font-size: 12px;
        color: var(--secondary-text-color);
      }
    `];var j=e=>({select:{mode:"dropdown",options:e}}),p5=e=>e.kind==="household"||!!e.statistics.solar?.length,o1=class extends v{constructor(){super(...arguments);this._label=C=>this._localize(`editor_${C.name}`)}setConfig(C){this._config=C}get _localize(){return u(this.hass?.locale?.language??this.hass?.language??"en")}willUpdate(){this.hass&&this._info===void 0&&(this._info=null,this.hass.callWS({type:`${Z}/figures`}).then(C=>{this._info=C}).catch(()=>{}))}_data(){let C=this._config??{type:""},H=!!C.statistics?.length||C.statistics!==void 0&&!C.area;return{title:C.title??"",period:C.period??"energy_date",source:H?"statistics":"energy",area:C.area??"household",by:C.by??"source",figure:C.figure??"energy",display:C.display??(!H&&C.by==="consumer"?"bars":"ring"),color_by_source:C.color_by_source??!1,statistics:(C.statistics??[]).map(V=>V.statistic)}}_schema(C){let H=this._localize,V=[{name:"title",selector:{text:{}}},{name:"period",selector:j(w.map(M=>({value:M,label:H(`period.${M}`)})))},{name:"breakdown_source",selector:j(["energy","statistics"].map(M=>({value:M,label:H(`breakdown_source.${M}`)})))}];if(C.source==="statistics")V.push({name:"statistics",selector:{statistic:{multiple:!0}}});else{let M=(this._info?.areas??[]).filter(p5),r=M.find(t=>t.id===C.area),i=[...r?.statistics.solar?.length?["source"]:[],...r?.kind==="household"?["consumer"]:[]];V.push({name:"area",selector:j(M.map(t=>({value:t.id,label:t.name})))},{name:"by",selector:j(i.map(t=>({value:t,label:H(`by.${t}`)})))}),C.by==="consumer"&&V.push({name:"figure",selector:j(["energy","cost"].map(t=>({value:t,label:H(`figure_choice.${t}`)})))})}return V.push({name:"display",selector:j(["ring","bars"].map(M=>({value:M,label:H(`display.${M}`)})))}),C.source!=="statistics"&&C.by==="consumer"&&C.display==="bars"&&V.push({name:"color_by_source",selector:{boolean:{}}}),V}_changed(C){if(!this._config)return;let H={...this._data(),...C.detail.value};"breakdown_source"in C.detail.value&&(H.source=C.detail.value.breakdown_source);let V={type:this._config.type};if(typeof H.title=="string"&&H.title&&(V.title=H.title),V.period=H.period??"energy_date",H.source==="statistics"){let M=new Map((this._config.statistics??[]).map(i=>[i.statistic,i])),r=Array.isArray(H.statistics)?H.statistics.filter(Boolean):[];V.statistics=r.map(i=>M.get(i)??{statistic:i})}else{V.area=H.area??"household";let M=this._info?.areas.find(t=>t.id===V.area),r=M?.kind==="household",i=!!M?.statistics.solar?.length;V.by=H.by==="consumer"&&r?"consumer":i?"source":"consumer",V.by==="consumer"&&H.figure==="cost"?V.figure="cost":V.figure="energy"}V.display=H.display==="bars"?"bars":"ring",V.by==="consumer"&&V.display==="bars"&&H.color_by_source===!0&&(V.color_by_source=!0),this._config=V,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:V},bubbles:!0,composed:!0}))}render(){if(!this.hass||!this._config)return d``;let C=this._data();return d`<ha-form
      .hass=${this.hass}
      .data=${{...C,breakdown_source:C.source}}
      .schema=${this._schema(C)}
      .computeLabel=${this._label}
      @value-changed=${this._changed}
    ></ha-form>`}};o1.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0}};var g2="M7 11H9V13H7V11M21 5V19C21 20.11 20.11 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H6V1H8V3H16V1H18V3H19C20.11 3 21 3.9 21 5M5 7H19V5H5V7M19 19V9H5V19H19M15 13V11H17V13H15M11 13V11H13V13H11M7 15H9V17H7V15M15 17V15H17V17H15M11 17V15H13V17H11Z";var f2="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z";var O2="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z";var y2="M18,6H8.83L14.83,12L8.83,18H18V20H6V18L12,12L6,6V4H18V6Z";var k2="energy-payback-card-view",m5=()=>{try{return localStorage.getItem(k2)==="yearly"?"yearly":"total"}catch{return"total"}},Y=class extends v{constructor(){super(...arguments);this._view=m5()}static getStubConfig(){return{}}static getConfigForm(){return{schema:[]}}setConfig(C){}getCardSize(){return 4}getGridOptions(){return{columns:12,min_columns:6}}get _localize(){return u(this.hass?.locale?.language??this.hass?.language??"en")}get _language(){return this.hass?.locale?.language??"en"}_money(C,H=!1){return new Intl.NumberFormat(this._language,{style:"currency",currency:this.hass?.config.currency??"EUR",maximumFractionDigits:0,minimumFractionDigits:0,signDisplay:H?"exceptZero":"auto"}).format(C)}_price(C){return new Intl.NumberFormat(this._language,{style:"currency",currency:this.hass?.config.currency??"EUR",maximumFractionDigits:4,minimumFractionDigits:2}).format(C)}_percent(C){return new Intl.NumberFormat(this._language,{style:"percent",maximumFractionDigits:0}).format(C/100)}_month(C){return new Intl.DateTimeFormat(this._language,{month:"long",year:"numeric"}).format(C)}_years(C){let H=this._localize;if(C<1)return H("under_one_year");let V=Math.round(C);return V===1?H("years_one"):H("years_other",{count:String(V)})}_toggleView(){this._view=this._view==="total"?"yearly":"total";try{localStorage.setItem(k2,this._view)}catch{}}_openIntegration(){history.pushState(null,"",`/config/integrations/integration/${Z}`),window.dispatchEvent(new CustomEvent("location-changed"))}render(){let C=this._localize;if(!this.hass)return d``;let H=z(this.hass);if(!H.length)return d`<ha-card>
        <div class="header"><h2 class="title">${C("title")}</h2></div>
        <p class="summary">${C("not_set_up")}</p>
      </ha-card>`;let V=l2(H),M=this._view==="yearly";return d`<ha-card>
      <div class="header">
        <h2 class="title">${C("title")}</h2>
        ${this._chip(V,M)}
        <button
          class="toggle"
          type="button"
          aria-label=${C(M?"show_total":"show_yearly")}
          title=${C(M?"show_total":"show_yearly")}
          @click=${this._toggleView}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d=${M?y2:g2}></path>
          </svg>
        </button>
      </div>
      <p class="summary">${this._summary(V,H,M)}</p>
      <ul class="rows">
        ${H.map(r=>this._row(r,M))}
      </ul>
      ${this._footer(H)}
    </ha-card>`}_chip(C,H){let V=this._localize,M=null;return H?C.perYear!==null&&(M=V("per_year",{amount:this._money(C.perYear,!0)})):C.balance!==null?M=this._money(C.balance,!0):C.calculating||(M=this._money(C.saved)),M===null?l:d`<span class="chip">${M}</span>`}_summary(C,H,V){let M=this._localize;return C.calculating?M("calculating_all"):V?C.inThePlusFrom===null?H.some(r=>r.perYear===null)?M("yearly_after_twelve"):"":C.balance!==null&&C.balance>=0?M("in_the_plus"):M("in_the_plus_from",{date:this._month(C.inThePlusFrom)}):C.invested>0?M("saved_invested",{saved:this._money(C.saved),invested:this._money(C.invested)}):M("saved_only",{saved:this._money(C.saved)})}_row(C,H){let V=this._localize,M=V(`category.${C.category}`),r="\u2013";return C.calculating||(H&&C.perYear!==null?r=V("per_year",{amount:this._money(C.perYear)}):!H&&C.saving!==null&&(r=this._money(C.saving))),d`<li class="row ${C.category}">
      <span class="swatch" aria-hidden="true"></span>
      <div class="row-body">
        <div class="line">
          <span>${M}</span>
          <span class="amount ${r==="\u2013"?"waiting":""}">${r}</span>
        </div>
        <div class="sub">
          ${C.calculating?V("calculating"):H?this._yearlyDetail(C):this._totalDetail(C,M)}
        </div>
        ${C.calculating?l:this._since(C)}
      </div>
    </li>`}_since(C){let H=this._localize,V=[];return C.countingSince&&V.push(H("since",{date:this._month(C.countingSince)})),C.heatEstimated&&V.push(H("heat_estimated")),V.length?d`<div class="sub since">${V.join(" \xB7 ")}</div>`:l}_totalDetail(C,H){let V=this._localize;if(C.investment&&C.payback!==null){let M=Math.max(0,C.payback),r=this._percent(C.payback);return d`<div class="meter">
        <div
          class="bar"
          role="progressbar"
          aria-label=${V("progress",{name:H,percent:r})}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow=${Math.min(100,Math.round(M))}
        >
          <i style="width:${Math.min(100,M)}%"></i>
        </div>
        <span
          >${M>=100?V("paid_off"):V("of_investment",{percent:r,investment:this._money(C.investment)})}</span
        >
      </div>`}return V(`instead_${C.category}`)}_yearlyDetail(C){let H=this._localize;if(C.perYear===null)return C.yearlyFrom?H("yearly_from",{date:this._month(C.yearlyFrom)}):"";let V=x2(C);if(V!==null)return H("return_per_year",{percent:this._percent(V)});let M=v2(C);return M!==null?H("pays_off_in",{years:this._years(M)}):C.category==="heat_pump"?H(C.heating==="oil"?"instead_of_oil":"instead_of_gas"):C.category==="wallbox"?H("instead_of_fuel"):""}_footer(C){let H=this._localize,V=[];for(let M of C){if(M.price===null)continue;let r=this._price(M.price);M.category==="heat_pump"&&V.push(H(M.heating==="oil"?"oil":"gas",{price:r})),M.category==="wallbox"&&V.push(H("fuel",{price:r}))}return V.length?d`<div class="footer">
      <button
        class="prices"
        type="button"
        title=${H("prices_link")}
        aria-label=${`${H("prices_link")}: ${V.join(", ")}`}
        @click=${this._openIntegration}
      >
        ${V.join(" \xB7 ")}
      </button>
    </div>`:l}};Y.properties={hass:{attribute:!1},_view:{state:!0}},Y.styles=[b,c`
      .toggle {
        flex: none;
        width: 40px;
        height: 40px;
        border: none;
        border-radius: 50%;
        background: none;
        color: var(--secondary-text-color);
        display: grid;
        place-items: center;
        cursor: pointer;
        padding: 0;
      }
      .toggle:hover {
        background: color-mix(in srgb, var(--primary-text-color) 8%, transparent);
      }
      .toggle:focus-visible,
      .prices:focus-visible {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
      }
      .toggle svg {
        width: 24px;
        height: 24px;
        fill: currentColor;
      }
      .rows {
        list-style: none;
        margin: 0;
        padding: 0;
      }
      .row {
        display: flex;
        gap: 16px;
        padding: 12px 16px;
        border-bottom: 1px solid var(--divider-color);
      }
      .row:last-child {
        border-bottom: none;
      }
      .pv {
        --color: var(--energy-payback-pv-color);
      }
      .heat_pump {
        --color: var(--energy-payback-heat-pump-color);
      }
      .wallbox {
        --color: var(--energy-payback-wallbox-color);
      }
      .swatch {
        flex: none;
        width: 32px;
        height: 16px;
        margin-top: 2px;
        border-radius: 4px;
        border: 1px solid var(--color);
        background: color-mix(in srgb, var(--color) 50%, transparent);
      }
      .row-body {
        flex: 1;
        min-width: 0;
      }
      .line {
        display: flex;
        justify-content: space-between;
        gap: 8px;
        color: var(--primary-text-color);
      }
      .amount {
        flex: none;
        font-variant-numeric: tabular-nums;
      }
      .amount.waiting {
        color: var(--secondary-text-color);
      }
      .sub {
        margin-top: 6px;
        font-size: 12px;
        line-height: 16px;
        color: var(--secondary-text-color);
      }
      .sub:empty {
        display: none;
      }
      .sub.since {
        margin-top: 2px;
      }
      .meter {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .bar {
        flex: 1;
        height: 6px;
        border-radius: 4px;
        background: var(--divider-color);
        overflow: hidden;
      }
      .bar i {
        display: block;
        height: 100%;
        background: var(--color);
      }
      .meter span {
        flex: none;
        white-space: nowrap;
      }
      .footer {
        padding: 4px 8px 8px;
        border-top: 1px solid var(--divider-color);
      }
      .prices {
        font: inherit;
        font-size: 12px;
        line-height: 16px;
        color: var(--secondary-text-color);
        background: none;
        border: none;
        padding: 8px;
        border-radius: 4px;
        cursor: pointer;
        text-decoration: underline dotted;
        text-underline-offset: 3px;
        text-align: start;
      }
      .prices:hover {
        color: var(--primary-text-color);
      }
    `];var b2;function B2(){if(customElements.get("ha-chart-base"))return Promise.resolve(!0);let e=window.loadCardHelpers;return e?(b2??=(async()=>{try{(await e()).createCardElement({type:"statistics-graph",entities:[]})}catch{}let L=new Promise(C=>setTimeout(()=>C(!1),1e4));return Promise.race([customElements.whenDefined("ha-chart-base").then(()=>!0),L])})(),b2):Promise.resolve(!1)}var w2=e=>Math.round(e*255).toString(16).padStart(2,"0");function l5(e,L){let C=e.trim();if(/^#[0-9a-f]{6}$/i.test(C))return C+w2(L);if(/^#[0-9a-f]{3}$/i.test(C))return`#${[...C.slice(1)].map(V=>V+V).join("")}${w2(L)}`;let H=C.match(/^rgba?\(([^)]+)\)/i);if(H){let[V,M,r]=H[1].split(/[ ,/]+/).filter(Boolean);return`rgba(${V}, ${M}, ${r}, ${L})`}return C}var c1=e=>e.replace(/[&<>"']/g,L=>`&#${L.charCodeAt(0)};`),_2=e=>`<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${e}"></span>`;function P2(e){let L=e.lines??[],C=e.series.map((a,A)=>({id:a.id,type:"bar",name:a.name,stack:"savings",cursor:"default",barMaxWidth:50,color:l5(a.color,.5),itemStyle:{borderColor:a.color},data:a.values.map((p,m)=>{let n=e.series.slice(A+1).every(s=>Math.sign(s.values[m]??0)!==Math.sign(p??0));return{value:p,itemStyle:p?n?{borderRadius:p>0?[4,4,0,0]:[0,0,4,4]}:void 0:{borderWidth:0}}})})),H=L.map(a=>({id:a.id,type:"line",name:a.name,yAxisIndex:1,color:a.color,symbol:"circle",symbolSize:5,connectNulls:!0,data:a.values})),V=[...C,...H],M=new Map(L.map(a=>[a.name,a.format])),r=a=>{let A=Array.isArray(a)?a:[a],p=document.createElement("div");if(!A.length)return p;let m=x=>M.has(x.seriesName??""),n=A.filter(x=>x.value&&!m(x)),s=A.filter(x=>m(x)&&x.value!==null&&x.value!==void 0),C1=n.map(x=>`${_2(String(x.color??""))}${c1(x.seriesName??"")}: ${e.format(x.value??0)}`),d1=s.map(x=>`${_2(String(x.color??""))}${c1(x.seriesName??"")}: ${M.get(x.seriesName??"")?.(x.value??0)??""}`),E2=n.reduce((x,N2)=>x+(N2.value??0),0);return p.innerHTML=`<b>${c1(e.labels[A[0].dataIndex]?.tooltip??"")}</b>`+(C1.length?`<br>${C1.join("<br>")}`:"")+(n.length>1?`<br><b>${c1(e.total)}: ${e.format(E2)}</b>`:"")+(d1.length?`<br>${d1.join("<br>")}`:""),p},i={type:"value",name:e.unit,nameGap:2,nameTextStyle:{align:"left"},axisLabel:{formatter:e.tick},splitLine:{show:!0}},t={type:"value",name:e.lineUnit??"",nameGap:2,nameTextStyle:{align:"right"},axisLabel:{formatter:e.tick},splitLine:{show:!1},scale:!0},o={xAxis:{type:"category",data:e.labels.map(a=>a.axis),axisTick:{show:!1}},yAxis:L.length?[i,t]:i,grid:{top:15,bottom:0,left:1,right:1,containLabel:!0},legend:{show:!0,type:"custom",data:[...e.series,...L].map(a=>({id:a.id,name:a.name}))},tooltip:{trigger:"axis",axisPointer:{type:"shadow"},formatter:r}};return{data:V,options:o}}var T2=300*1e3,F2="250px",v5={pv:["--energy-payback-pv-color","#ff9800"],heat_pump:["--energy-payback-heat-pump-color","#8e021b"],wallbox:["--energy-payback-wallbox-color","#0f9d58"]},S1={solar:["--energy-solar-color","#ff9800"],grid:["--energy-grid-consumption-color","#488fc2"],cheap:["--success-color","#43a047"],expensive:["--error-color","#db4437"]},U1=["#9c27b0","#e91e63","#009688","#795548"],x5={energy:"energy",cost:"money",saving:"money",export:"energy"},X=class extends v{constructor(){super(...arguments);this._config={type:""};this._infoAt=0;this._infoLoading=!1}static getStubConfig(){return{}}static getConfigElement(){return document.createElement("energy-payback-history-card-editor")}setConfig(C){this._config=C??{type:""}}getCardSize(){return 5}getGridOptions(){return{columns:12,min_columns:6}}connectedCallback(){super.connectedCallback(),this._follow()}disconnectedCallback(){super.disconnectedCallback(),this._unfollow?.(),this._unfollow=void 0}get _localize(){return u(this.hass?.locale?.language??this.hass?.language??"en")}get _language(){return this.hass?.locale?.language??"en"}get _fmt(){return N(this._language,this.hass?.config.currency??"EUR")}get _savings(){return!this._config.area}_follow(){(this._config.period??"energy_date")==="energy_date"&&(this._unfollow||!this.isConnected||!this.hass?.connection||(this._unfollow=E(this.hass.connection,C=>{this._selected=C})))}async _loadInfo(){if(!(!this.hass||this._infoLoading)){this._infoLoading=!0;try{this._info=await this.hass.callWS({type:`${Z}/figures`})}catch{this._info=null}this._infoAt=Date.now(),this._infoLoading=!1}}_color([C,H]){return getComputedStyle(this).getPropertyValue(C).trim()||H}_range(C){let H=this._config.period??"energy_date";if(H!=="energy_date"){let M=f(H);return{range:M,period:k(M)}}if(this._selected===void 0)return;if(this._selected)return{range:this._selected,period:k(this._selected)};let V=C();return{range:V,period:this._savings?"year":k(V)}}_savingsPlan(){if(!this.hass)return;let C=this._localize,H=z(this.hass);if(!H.length||H.some(r=>r.calculating))return;let V=this._range(()=>n2(H.map(r=>r.countingSince)));if(!V)return;let M=H.map(r=>({series:{id:r.category,name:{},color:this._color(v5[r.category]),plus:[r.savingStatistic],minus:[]},name:C(`category.${r.category}`)}));return this._plan(V,M,"money",void 0,[])}_figurePlan(){let C=this._info,H=this._config;if(!C||C.calculating)return;let V=C.areas.find(m=>m.id===H.area),M=H.figure??"energy";if(!V||!V.statistics[M]?.length)return;let r=this._range(()=>f("this_month"));if(!r)return;let i=this._localize,t=Q(V,M),o=H.stack&&t.includes(H.stack)?H.stack:t[0],a={solar:this._color(S1.solar),grid:this._color(S1.grid),cheap:this._color(S1.cheap),expensive:this._color(S1.expensive)},A=u1(C,V,M,o,a).map(m=>({series:m,name:m.name.text??(m.name.key&&U(m.name.key)?i(m.name.key):m.id)}));A.length===1&&(A[0].name=h(i,M,V));let p=H.line&&V.statistics?{figure:H.line,area:V,name:h(i,H.line,V)}:void 0;return this._plan(r,A,x5[M],p,H.lines??[])}_plan(C,H,V,M,r){let i=new Set;for(let{series:o}of H)[...o.plus,...o.minus].forEach(a=>i.add(a));if(M)for(let o of Object.values(M.area.statistics))(o??[]).forEach(a=>i.add(a));r.forEach(o=>i.add(o.statistic));let t=[...i].sort();return{key:JSON.stringify([t,H.map(o=>o.series.id),M?.figure,r,C.range.start,C.range.end,C.period]),range:C.range,period:C.period,bars:H,unit:V,lineFigure:M,lines:r,ids:t}}async _load(C){if(!this.hass)return;this._loading=C.key;let H={key:C.key,at:Date.now(),plan:C,slots:d2(C.range,C.period),rows:{},metadata:{},failed:!1};try{let V=C.lines.map(i=>i.statistic),[M,r]=await Promise.all([this.hass.callWS({type:"recorder/statistics_during_period",start_time:new Date(C.range.start).toISOString(),end_time:new Date(C.range.end+1).toISOString(),statistic_ids:C.ids,period:W(C.period),types:["change","mean"],units:{energy:"kWh"}}),V.length?this.hass.callWS({type:"recorder/get_statistics_metadata",statistic_ids:V}):Promise.resolve([])]);H.rows=M,H.metadata=Object.fromEntries(r.map(i=>[i.statistic_id,i]))}catch{H.failed=!0}this._loading===C.key&&(this._loading=void 0,this._loaded=H)}willUpdate(C){if(!this.hass)return;if((C.has("hass")||C.has("_config"))&&this._follow(),this._hasChart===void 0&&(this._hasChart=!1,B2().then(M=>{this._hasChart=M})),!this._savings){let M=Date.now()-this._infoAt>T2;(this._info===void 0||M)&&!this._infoLoading&&this._loadInfo()}let H=this._savings?this._savingsPlan():this._figurePlan(),V=!this._loaded||Date.now()-this._loaded.at>T2;H&&H.key!==this._loading&&(H.key!==this._loaded?.key||V&&!this._loading)&&this._load(H),C.has("_loaded")&&(this._chart=this._buildChart())}_perSlot(C){let H=this._loaded;if(!H)return[];let V=H.slots.map(()=>null);for(let M of C)D1(H.rows[M],H.slots,H.plan.period).forEach((r,i)=>{r!==null&&(V[i]=(V[i]??0)+r)});return V}_barValues(C){let H=this._perSlot(C.plus),V=this._perSlot(C.minus);return H.map((M,r)=>{if(M===null)return null;let i=M-(V[r]??0);return C.floor?Math.max(i,0):i})}_lines(){let C=this._loaded;if(!C)return[];let{plan:H,slots:V}=C,M=this._fmt,r=this.hass?.config.currency==="EUR"?100:1,i=[];if(H.lineFigure){let{figure:t,area:o,name:a}=H.lineFigure,A=Object.fromEntries(Object.entries(o.statistics).map(([n,s])=>[n,this._perSlot(s??[])])),p=V.map((n,s)=>$(t,o,d1=>A[d1]?.[s]??null,null).value),m=$(t,o,()=>0,null).unit;i.push({id:`line_${t}`,name:a,color:U1[0],values:m==="price"?p.map(n=>n===null?null:n*r):p,format:n=>M.value(m==="price"?n/r:n,m)})}return H.lines.forEach((t,o)=>{let a=C.metadata[t.statistic],A=t.value??(a?.has_sum?"change":"mean"),p=a?.unit_class==="energy"?"kWh":a?.statistics_unit_of_measurement??"",m=A==="mean"?p2(C.rows[t.statistic],V,H.period):D1(C.rows[t.statistic],V,H.period);i.push({id:`statistic_${o}`,name:t.name??a?.name??this.hass?.states[t.statistic]?.attributes.friendly_name??t.statistic,color:U1[(o+1)%U1.length],values:m,format:n=>`${M.number(n)}${p?` ${p}`:""}`})}),i}_buildChart(){let C=this._loaded;if(!C||C.failed)return;let H=this._localize,V=this._fmt,{plan:M}=C,r=M.bars.map(({series:o,name:a})=>({id:o.id,name:a,color:o.color,values:this._barValues(o)})),i=this._lines(),t=M.lineFigure&&!M.lines.length?$(M.lineFigure.figure,M.lineFigure.area,()=>0,null).unit==="price"?this.hass?.config.currency==="EUR"?"ct/kWh":`${V.currencySymbol()}/kWh`:"%":"";return P2({labels:this._labels(C.slots,M.period),series:r,unit:M.unit==="money"?V.currencySymbol():"kWh",total:H("history_total"),format:o=>M.unit==="money"?V.value(o,"money"):`${V.number(o,Math.abs(o)<10?2:1)} kWh`,tick:o=>V.number(o,Math.abs(o)<10?2:0),lines:i,lineUnit:t})}_labels(C,H){let V=o=>new Intl.DateTimeFormat(this._language,o),M=V({hour:"2-digit",minute:"2-digit"}),r=C.length>0&&new Date(C[0]).getFullYear()!==new Date(C[C.length-1]).getFullYear(),i={hour:M,day:V({day:"numeric"}),month:V(r?{month:"short",year:"2-digit"}:{month:"short"}),year:V({year:"numeric"})}[H],t={hour:M,day:V({weekday:"short",day:"numeric",month:"short"}),month:V({month:"long",year:"numeric"}),year:V({year:"numeric"})}[H];return C.map(o=>({axis:i.format(o),tooltip:H==="hour"?`${M.format(o)} \u2013 ${M.format(o+36e5)}`:t.format(o)}))}_title(){let C=this._localize;if(this._config.title)return this._config.title;if(this._savings)return C("history_title");let H=this._info?.areas.find(V=>V.id===this._config.area);return H?h(C,this._config.figure??"energy",H):C("history_title")}render(){let C=this._localize;if(!this.hass)return d``;let H=this._title();if(this._savings&&!z(this.hass).length)return d`<ha-card>
        <div class="header"><h2 class="title">${H}</h2></div>
        <p class="summary">${C("not_set_up")}</p>
      </ha-card>`;let V=this._savings?z(this.hass).some(A=>A.calculating):this._info?.calculating===!0,M=V?void 0:this._loaded,r=this._chart?.data.filter(A=>A.type==="bar").flatMap(A=>A.data.map(p=>p.value??null))??[],i=r.reduce((A,p)=>A+(p??0),0),t=r.some(A=>A),o=M?.plan.unit??"money",a=!this._savings&&this._info!==void 0&&!this._figurePlan()&&!V;return d`<ha-card>
      <div class="header">
        <h2 class="title">${H}</h2>
        ${M&&!M.failed&&t?d`<span class="chip">${this._fmt.value(i,o)}</span>`:M?d`<span class="chip">${I(M.plan.range,this._language)}</span>`:l}
      </div>
      ${V?d`<p class="summary">${C("calculating_all")}</p>`:a?d`<p class="summary">${C(this._info===null?"editor_not_loaded":"figures_unavailable")}</p>`:this._body(M,t)}
    </ha-card>`}_body(C,H){let V=this._localize;return this._hasChart?C?.failed?d`<p class="summary">${V("history_failed")}</p>`:d`<div class="chart">
      ${this._chart?d`<ha-chart-base
            .hass=${this.hass}
            .data=${this._chart.data}
            .options=${this._chart.options}
            .height=${F2}
          ></ha-chart-base>`:l}
      ${C&&!H?d`<div class="empty">
            ${V(this._savings?"history_empty":"history_empty_figure")}
          </div>`:l}
    </div>`:d`<p class="summary">${V("history_no_chart")}</p>`}};X.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0},_selected:{state:!0},_loaded:{state:!0},_hasChart:{state:!0}},X.styles=[b,c`
      .chart {
        position: relative;
        min-height: ${m1(F2)};
        padding: 8px 16px 16px;
      }
      .empty {
        position: absolute;
        inset: 0;
        display: grid;
        place-items: center;
        padding: 16px;
        text-align: center;
        color: var(--secondary-text-color);
        background: color-mix(in srgb, var(--card-background-color, #fff) 70%, transparent);
      }
    `];var s5=["energy","statistic","entity"],F=e=>({select:{mode:"dropdown",options:e}}),J=class extends v{constructor(){super(...arguments);this._label=C=>{let H=this._localize,V=`editor_${C.name}`;return H(V)};this._helper=C=>C.name==="period"?this._localize("editor_period_hint"):void 0}setConfig(C){this._config=C}get _localize(){return u(this.hass?.locale?.language??this.hass?.language??"en")}get _tiles(){return this._config?.tiles??[]}willUpdate(){this.hass&&this._info===void 0&&(this._info=null,this.hass.callWS({type:`${Z}/figures`}).then(C=>{this._info=C}).catch(()=>{}))}_changed(C){this._config=C,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:C},bubbles:!0,composed:!0}))}_setTiles(C){this._config&&this._changed({...this._config,tiles:C})}_cardSchema(){let C=this._localize;return[{name:"title",selector:{text:{}}},{name:"period",selector:F(w.map(H=>({value:H,label:C(`period.${H}`)})))},{name:"columns",selector:F([{value:"auto",label:C("editor_columns_auto")},...["1","2","3","4"].map(H=>({value:H,label:H}))])}]}_cardChanged(C){if(!this._config)return;let{title:H,period:V,columns:M}=C.detail.value,r={...this._config};typeof H=="string"&&H?r.title=H:delete r.title,r.period=V??"energy_date",M&&M!=="auto"?r.columns=Number(M):delete r.columns,this._changed(r)}_describe(C){let H=this._localize,V=S(C);if(V==="statistic")return{title:C.name??C.statistic??"",detail:`${C.statistic??""} \xB7 ${H(`value.${C.value??"change"}`)}`};if(V==="entity")return{title:C.name??C.entity??"",detail:`${C.entity??""} \xB7 ${H("value_current")}`};let M=this._info?.areas.find(i=>i.id===C.area),r=M&&C.figure?h(H,C.figure,M):C.figure??"";return{title:C.name??r,detail:`${M?.name??C.area??""} \xB7 ${H("source.energy")}`}}_tileSchema(C){let H=this._localize,V=S(C),M=[{name:"source",selector:F(s5.map(r=>({value:r,label:H(`source.${r}`)})))}];if(V==="energy"){let r=this._info?.areas??[],i=r.find(t=>t.id===C.area);M.push({name:"area",selector:F(r.map(t=>({value:t.id,label:t.name})))},{name:"figure",selector:F(i?y(i).map(t=>({value:t,label:h(H,t,i)})):[])})}else V==="statistic"?(M.push({name:"statistic",selector:{statistic:{}}},{name:"value",selector:F(A2.map(r=>({value:r,label:H(`value.${r}`)})))}),(C.value??"change")==="mean"&&M.push({name:"secondary",selector:F(["none","range"].map(r=>({value:r,label:H(`secondary.${r}`)})))})):M.push({name:"entity",selector:{entity:{}}});return M.push({name:"name",selector:{text:{}}}),M}_tileData(C){return{source:S(C),...C,value:C.value??"change",secondary:C.secondary??"none"}}_tileChanged(C,H){let V=H.detail.value,M=this._tiles[C],r=V.source??S(M),i=typeof V.name=="string"&&V.name?V.name:void 0,t;if(r!==S(M))t=r==="energy"?{area:"household",figure:"cost"}:r==="statistic"?{statistic:"",value:"change"}:{entity:""};else if(r==="energy"){let o=V.area??M.area,a=this._info?.areas.find(m=>m.id===o),A=a?y(a):[],p=A.includes(V.figure)?V.figure:A[0];t={area:o,figure:p}}else r==="statistic"?(t={statistic:V.statistic??"",value:V.value??"change"},t.value==="mean"&&V.secondary==="range"&&(t.secondary="range")):t={entity:V.entity??""};i&&(t.name=i),this._setTiles(this._tiles.map((o,a)=>a===C?t:o))}_add(){let C=[...this._tiles,{area:"household",figure:"cost"}];this._setTiles(C),this._editing=C.length-1}_remove(C){this._setTiles(this._tiles.filter((H,V)=>V!==C))}render(){if(!this.hass||!this._config)return d``;let C=this._localize;if(this._editing!==void 0&&this._tiles[this._editing]){let H=this._editing,V=this._tiles[H];return d`<div class="editor">
        <div class="heading">
          <ha-icon-button-arrow-prev
            .label=${C("editor_back")}
            @click=${()=>this._editing=void 0}
          ></ha-icon-button-arrow-prev>
          <span>${C("editor_edit_tile",{number:String(H+1)})}</span>
        </div>
        ${S(V)==="energy"&&this._info===null?d`<p class="hint">${C("editor_not_loaded")}</p>`:l}
        <ha-form
          .hass=${this.hass}
          .data=${this._tileData(V)}
          .schema=${this._tileSchema(V)}
          .computeLabel=${this._label}
          @value-changed=${M=>this._tileChanged(H,M)}
        ></ha-form>
      </div>`}return d`<div class="editor">
      <ha-form
        .hass=${this.hass}
        .data=${{title:this._config.title??"",period:this._config.period??"energy_date",columns:this._config.columns?String(this._config.columns):"auto"}}
        .schema=${this._cardSchema()}
        .computeLabel=${this._label}
        .computeHelper=${this._helper}
        @value-changed=${this._cardChanged}
      ></ha-form>
      <div class="heading"><span>${C("editor_tiles")}</span></div>
      <div class="tiles">
        ${this._tiles.map((H,V)=>{let{title:M,detail:r}=this._describe(H);return d`<div class="tile">
            <div class="text">
              <div class="name">${M||"\u2013"}</div>
              <div class="detail">${r}</div>
            </div>
            <ha-icon-button
              .path=${O2}
              .label=${C("editor_edit")}
              @click=${()=>this._editing=V}
            ></ha-icon-button>
            <ha-icon-button
              .path=${f2}
              .label=${C("editor_remove")}
              @click=${()=>this._remove(V)}
            ></ha-icon-button>
          </div>`})}
      </div>
      <ha-button @click=${this._add}>${C("editor_add_tile")}</ha-button>
    </div>`}};J.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0},_editing:{state:!0}},J.styles=c`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .heading {
      display: flex;
      align-items: center;
      gap: 4px;
      font-weight: 500;
    }
    .tiles {
      display: flex;
      flex-direction: column;
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      overflow: hidden;
    }
    .tiles:empty {
      display: none;
    }
    .tile {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px 4px 4px 16px;
      border-bottom: 1px solid var(--divider-color);
    }
    .tile:last-child {
      border-bottom: none;
    }
    .text {
      flex: 1;
      min-width: 0;
    }
    .name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .detail {
      font-size: 12px;
      color: var(--secondary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .hint {
      margin: 0;
      color: var(--secondary-text-color);
    }
    ha-button {
      align-self: flex-start;
    }
  `;var z1="savings",a1=e=>({select:{mode:"dropdown",options:e}}),A1=class extends v{constructor(){super(...arguments);this._label=C=>this._localize(`editor_${C.name}`)}setConfig(C){this._config=C}get _localize(){return u(this.hass?.locale?.language??this.hass?.language??"en")}willUpdate(){this.hass&&this._info===void 0&&(this._info=null,this.hass.callWS({type:`${Z}/figures`}).then(C=>{this._info=C}).catch(()=>{}))}_schema(){let C=this._localize,H=this._config??{type:""},V=this._info?.areas??[],M=[{name:"title",selector:{text:{}}},{name:"period",selector:a1(w.map(i=>({value:i,label:C(`period.${i}`)})))},{name:"area",selector:a1([{value:z1,label:C("editor_savings")},...V.filter(i=>i1(i).length).map(i=>({value:i.id,label:i.name}))])}],r=V.find(i=>i.id===H.area);if(r){let i=i1(r),t=H.figure&&i.includes(H.figure)?H.figure:i[0];M.push({name:"figure",selector:a1(i.map(o=>({value:o,label:h(C,o,r)})))},{name:"stack",selector:a1(Q(r,t).map(o=>({value:o,label:C(`stack.${o}`)})))},{name:"line",selector:a1([{value:"none",label:C("editor_line_none")},...W1(r).map(o=>({value:o,label:h(C,o,r)}))])},{name:"lines",selector:{statistic:{multiple:!0}}})}return M}_data(){let C=this._config??{type:""},H=this._info?.areas.find(r=>r.id===C.area),V=H?i1(H):[],M=C.figure&&V.includes(C.figure)?C.figure:V[0];return{title:C.title??"",period:C.period??"energy_date",area:C.area??z1,figure:M,stack:C.stack??(H&&M?Q(H,M)[0]:void 0),line:C.line??"none",lines:(C.lines??[]).map(r=>r.statistic)}}_changed(C){if(!this._config)return;let H=C.detail.value,V={type:this._config.type};typeof H.title=="string"&&H.title&&(V.title=H.title),V.period=H.period??"energy_date";let M=H.area;if(M&&M!==z1){V.area=M;let r=this._info?.areas.find(n=>n.id===M),i=r?i1(r):[],t=i.includes(H.figure)?H.figure:i[0];t&&(V.figure=t),(r&&t?Q(r,t):[]).includes(H.stack)&&(V.stack=H.stack),(r?W1(r):[]).includes(H.line)&&(V.line=H.line);let A=new Map((this._config.lines??[]).map(n=>[n.statistic,n])),m=(Array.isArray(H.lines)?H.lines:[]).filter(Boolean).map(n=>A.get(n)??{statistic:n});m.length&&(V.lines=m)}this._config=V,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:V},bubbles:!0,composed:!0}))}render(){return!this.hass||!this._config?d``:d`<ha-form
      .hass=${this.hass}
      .data=${this._data()}
      .schema=${this._schema()}
      .computeLabel=${this._label}
      @value-changed=${this._changed}
    ></ha-form>`}};A1.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0}};var Z5="https://github.com/ignazhabibi/ha-energy-payback",R2=(e,L)=>{if(!customElements.get(e))try{customElements.define(e,L)}catch{customElements.define(e,class extends L{})}};function D2(e){let L=()=>e.forEach(({tag:r,card:i,editor:t})=>{R2(r,i),t&&R2(t.tag,t.element)});L();let C=window.customElements,H=Date.now(),V=window.setInterval(()=>{let r=window.customElements!==C;r&&L(),(r||Date.now()-H>6e4)&&window.clearInterval(V)},100),M=window;M.customCards=M.customCards??[];for(let{tag:r,name:i,description:t}of e)M.customCards.some(o=>o.type===r)||M.customCards.push({type:r,name:i,description:t,preview:!0,documentationURL:Z5})}D2([{tag:"energy-payback-card",card:Y,name:"Energy Payback",description:"What your PV plant, heat pump, and electric car have saved, and when they pay off."},{tag:"energy-payback-history-card",card:X,name:"Energy Payback history",description:"Savings, consumption, or costs per period as bars, stacked by source or consumer, with lines. Follows the energy date selection.",editor:{tag:"energy-payback-history-card-editor",element:A1}},{tag:"energy-payback-figures-card",card:G,name:"Energy Payback key figures",description:"Tiles with key figures for a period: costs, solar share, cheap grid power, savings, or any statistic or entity.",editor:{tag:"energy-payback-figures-card-editor",element:J}},{tag:"energy-payback-breakdown-card",card:q,name:"Energy Payback breakdown",description:"Shares for a period as a ring or bars: the electricity mix, consumption or costs by consumer, or any statistics.",editor:{tag:"energy-payback-breakdown-card-editor",element:o1}}]);
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
