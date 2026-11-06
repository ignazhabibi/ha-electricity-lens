var Q1=globalThis,K1=Q1.ShadowRoot&&(Q1.ShadyCSS===void 0||Q1.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,n2=Symbol(),T2=new WeakMap,P1=class{constructor(V,C,H){if(this._$cssResult$=!0,H!==n2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=V,this.t=C}get styleSheet(){let V=this.o,C=this.t;if(K1&&V===void 0){let H=C!==void 0&&C.length===1;H&&(V=T2.get(C)),V===void 0&&((this.o=V=new CSSStyleSheet).replaceSync(this.cssText),H&&T2.set(C,V))}return V}toString(){return this.cssText}},q1=M=>new P1(typeof M=="string"?M:M+"",void 0,n2),f=(M,...V)=>{let C=M.length===1?M[0]:V.reduce((H,L,e)=>H+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(L)+M[e+1],M[0]);return new P1(C,M,n2)},F2=(M,V)=>{if(K1)M.adoptedStyleSheets=V.map(C=>C instanceof CSSStyleSheet?C:C.styleSheet);else for(let C of V){let H=document.createElement("style"),L=Q1.litNonce;L!==void 0&&H.setAttribute("nonce",L),H.textContent=C.cssText,M.appendChild(H)}},d2=K1?M=>M:M=>M instanceof CSSStyleSheet?(V=>{let C="";for(let H of V.cssRules)C+=H.cssText;return q1(C)})(M):M;var{is:b5,defineProperty:k5,getOwnPropertyDescriptor:w5,getOwnPropertyNames:P5,getOwnPropertySymbols:B5,getPrototypeOf:T5}=Object,j1=globalThis,R2=j1.trustedTypes,F5=R2?R2.emptyScript:"",R5=j1.reactiveElementPolyfillSupport,B1=(M,V)=>M,p2={toAttribute(M,V){switch(V){case Boolean:M=M?F5:null;break;case Object:case Array:M=M==null?M:JSON.stringify(M)}return M},fromAttribute(M,V){let C=M;switch(V){case Boolean:C=M!==null;break;case Number:C=M===null?null:Number(M);break;case Object:case Array:try{C=JSON.parse(M)}catch{C=null}}return C}},E2=(M,V)=>!b5(M,V),D2={attribute:!0,type:String,converter:p2,reflect:!1,useDefault:!1,hasChanged:E2};Symbol.metadata??=Symbol("metadata"),j1.litPropertyMetadata??=new WeakMap;var U=class extends HTMLElement{static addInitializer(V){this._$Ei(),(this.l??=[]).push(V)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(V,C=D2){if(C.state&&(C.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(V)&&((C=Object.create(C)).wrapped=!0),this.elementProperties.set(V,C),!C.noAccessor){let H=Symbol(),L=this.getPropertyDescriptor(V,H,C);L!==void 0&&k5(this.prototype,V,L)}}static getPropertyDescriptor(V,C,H){let{get:L,set:e}=w5(this.prototype,V)??{get(){return this[C]},set(r){this[C]=r}};return{get:L,set(r){let i=L?.call(this);e?.call(this,r),this.requestUpdate(V,i,H)},configurable:!0,enumerable:!0}}static getPropertyOptions(V){return this.elementProperties.get(V)??D2}static _$Ei(){if(this.hasOwnProperty(B1("elementProperties")))return;let V=T5(this);V.finalize(),V.l!==void 0&&(this.l=[...V.l]),this.elementProperties=new Map(V.elementProperties)}static finalize(){if(this.hasOwnProperty(B1("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(B1("properties"))){let C=this.properties,H=[...P5(C),...B5(C)];for(let L of H)this.createProperty(L,C[L])}let V=this[Symbol.metadata];if(V!==null){let C=litPropertyMetadata.get(V);if(C!==void 0)for(let[H,L]of C)this.elementProperties.set(H,L)}this._$Eh=new Map;for(let[C,H]of this.elementProperties){let L=this._$Eu(C,H);L!==void 0&&this._$Eh.set(L,C)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(V){let C=[];if(Array.isArray(V)){let H=new Set(V.flat(1/0).reverse());for(let L of H)C.unshift(d2(L))}else V!==void 0&&C.push(d2(V));return C}static _$Eu(V,C){let H=C.attribute;return H===!1?void 0:typeof H=="string"?H:typeof V=="string"?V.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(V=>this.enableUpdating=V),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(V=>V(this))}addController(V){(this._$EO??=new Set).add(V),this.renderRoot!==void 0&&this.isConnected&&V.hostConnected?.()}removeController(V){this._$EO?.delete(V)}_$E_(){let V=new Map,C=this.constructor.elementProperties;for(let H of C.keys())this.hasOwnProperty(H)&&(V.set(H,this[H]),delete this[H]);V.size>0&&(this._$Ep=V)}createRenderRoot(){let V=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return F2(V,this.constructor.elementStyles),V}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(V=>V.hostConnected?.())}enableUpdating(V){}disconnectedCallback(){this._$EO?.forEach(V=>V.hostDisconnected?.())}attributeChangedCallback(V,C,H){this._$AK(V,H)}_$ET(V,C){let H=this.constructor.elementProperties.get(V),L=this.constructor._$Eu(V,H);if(L!==void 0&&H.reflect===!0){let e=(H.converter?.toAttribute!==void 0?H.converter:p2).toAttribute(C,H.type);this._$Em=V,e==null?this.removeAttribute(L):this.setAttribute(L,e),this._$Em=null}}_$AK(V,C){let H=this.constructor,L=H._$Eh.get(V);if(L!==void 0&&this._$Em!==L){let e=H.getPropertyOptions(L),r=typeof e.converter=="function"?{fromAttribute:e.converter}:e.converter?.fromAttribute!==void 0?e.converter:p2;this._$Em=L;let i=r.fromAttribute(C,e.type);this[L]=i??this._$Ej?.get(L)??i,this._$Em=null}}requestUpdate(V,C,H,L=!1,e){if(V!==void 0){let r=this.constructor;if(L===!1&&(e=this[V]),H??=r.getPropertyOptions(V),!((H.hasChanged??E2)(e,C)||H.useDefault&&H.reflect&&e===this._$Ej?.get(V)&&!this.hasAttribute(r._$Eu(V,H))))return;this.C(V,C,H)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(V,C,{useDefault:H,reflect:L,wrapped:e},r){H&&!(this._$Ej??=new Map).has(V)&&(this._$Ej.set(V,r??C??this[V]),e!==!0||r!==void 0)||(this._$AL.has(V)||(this.hasUpdated||H||(C=void 0),this._$AL.set(V,C)),L===!0&&this._$Em!==V&&(this._$Eq??=new Set).add(V))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(C){Promise.reject(C)}let V=this.scheduleUpdate();return V!=null&&await V,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[L,e]of this._$Ep)this[L]=e;this._$Ep=void 0}let H=this.constructor.elementProperties;if(H.size>0)for(let[L,e]of H){let{wrapped:r}=e,i=this[L];r!==!0||this._$AL.has(L)||i===void 0||this.C(L,void 0,e,i)}}let V=!1,C=this._$AL;try{V=this.shouldUpdate(C),V?(this.willUpdate(C),this._$EO?.forEach(H=>H.hostUpdate?.()),this.update(C)):this._$EM()}catch(H){throw V=!1,this._$EM(),H}V&&this._$AE(C)}willUpdate(V){}_$AE(V){this._$EO?.forEach(C=>C.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(V)),this.updated(V)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(V){return!0}update(V){this._$Eq&&=this._$Eq.forEach(C=>this._$ET(C,this[C])),this._$EM()}updated(V){}firstUpdated(V){}};U.elementStyles=[],U.shadowRootOptions={mode:"open"},U[B1("elementProperties")]=new Map,U[B1("finalized")]=new Map,R5?.({ReactiveElement:U}),(j1.reactiveElementVersions??=[]).push("2.1.2");var l2=globalThis,$2=M=>M,Y1=l2.trustedTypes,I2=Y1?Y1.createPolicy("lit-html",{createHTML:M=>M}):void 0,s2="$lit$",G=`lit$${Math.random().toFixed(9).slice(2)}$`,v2="?"+G,D5=`<${v2}>`,e1=document,F1=()=>e1.createComment(""),R1=M=>M===null||typeof M!="object"&&typeof M!="function",x2=Array.isArray,Q2=M=>x2(M)||typeof M?.[Symbol.iterator]=="function",m2=`[ 	
\f\r]`,T1=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N2=/-->/g,W2=/>/g,V1=RegExp(`>|${m2}(?:([^\\s"'>=/]+)(${m2}*=${m2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),z2=/'/g,U2=/"/g,K2=/^(?:script|style|textarea|title)$/i,u2=M=>(V,...C)=>({_$litType$:M,strings:V,values:C}),p=u2(1),F3=u2(2),R3=u2(3),M1=Symbol.for("lit-noChange"),x=Symbol.for("lit-nothing"),G2=new WeakMap,L1=e1.createTreeWalker(e1,129);function q2(M,V){if(!x2(M)||!M.hasOwnProperty("raw"))throw Error("invalid template strings array");return I2!==void 0?I2.createHTML(V):V}var j2=(M,V)=>{let C=M.length-1,H=[],L,e=V===2?"<svg>":V===3?"<math>":"",r=T1;for(let i=0;i<C;i++){let t=M[i],a,n,o=-1,d=0;for(;d<t.length&&(r.lastIndex=d,n=r.exec(t),n!==null);)d=r.lastIndex,r===T1?n[1]==="!--"?r=N2:n[1]!==void 0?r=W2:n[2]!==void 0?(K2.test(n[2])&&(L=RegExp("</"+n[2],"g")),r=V1):n[3]!==void 0&&(r=V1):r===V1?n[0]===">"?(r=L??T1,o=-1):n[1]===void 0?o=-2:(o=r.lastIndex-n[2].length,a=n[1],r=n[3]===void 0?V1:n[3]==='"'?U2:z2):r===U2||r===z2?r=V1:r===N2||r===W2?r=T1:(r=V1,L=void 0);let A=r===V1&&M[i+1].startsWith("/>")?" ":"";e+=r===T1?t+D5:o>=0?(H.push(a),t.slice(0,o)+s2+t.slice(o)+G+A):t+G+(o===-2?i:A)}return[q2(M,e+(M[C]||"<?>")+(V===2?"</svg>":V===3?"</math>":"")),H]},D1=class M{constructor({strings:V,_$litType$:C},H){let L;this.parts=[];let e=0,r=0,i=V.length-1,t=this.parts,[a,n]=j2(V,C);if(this.el=M.createElement(a,H),L1.currentNode=this.el.content,C===2||C===3){let o=this.el.content.firstChild;o.replaceWith(...o.childNodes)}for(;(L=L1.nextNode())!==null&&t.length<i;){if(L.nodeType===1){if(L.hasAttributes())for(let o of L.getAttributeNames())if(o.endsWith(s2)){let d=n[r++],A=L.getAttribute(o).split(G),m=/([.?@])?(.*)/.exec(d);t.push({type:1,index:e,name:m[2],strings:A,ctor:m[1]==="."?J1:m[1]==="?"?C2:m[1]==="@"?H2:t1}),L.removeAttribute(o)}else o.startsWith(G)&&(t.push({type:6,index:e}),L.removeAttribute(o));if(K2.test(L.tagName)){let o=L.textContent.split(G),d=o.length-1;if(d>0){L.textContent=Y1?Y1.emptyScript:"";for(let A=0;A<d;A++)L.append(o[A],F1()),L1.nextNode(),t.push({type:2,index:++e});L.append(o[d],F1())}}}else if(L.nodeType===8)if(L.data===v2)t.push({type:2,index:e});else{let o=-1;for(;(o=L.data.indexOf(G,o+1))!==-1;)t.push({type:7,index:e}),o+=G.length-1}e++}}static createElement(V,C){let H=e1.createElement("template");return H.innerHTML=V,H}};function r1(M,V,C=M,H){if(V===M1)return V;let L=H!==void 0?C._$Co?.[H]:C._$Cl,e=R1(V)?void 0:V._$litDirective$;return L?.constructor!==e&&(L?._$AO?.(!1),e===void 0?L=void 0:(L=new e(M),L._$AT(M,C,H)),H!==void 0?(C._$Co??=[])[H]=L:C._$Cl=L),L!==void 0&&(V=r1(M,L._$AS(M,V.values),L,H)),V}var X1=class{constructor(V,C){this._$AV=[],this._$AN=void 0,this._$AD=V,this._$AM=C}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(V){let{el:{content:C},parts:H}=this._$AD,L=(V?.creationScope??e1).importNode(C,!0);L1.currentNode=L;let e=L1.nextNode(),r=0,i=0,t=H[0];for(;t!==void 0;){if(r===t.index){let a;t.type===2?a=new d1(e,e.nextSibling,this,V):t.type===1?a=new t.ctor(e,t.name,t.strings,this,V):t.type===6&&(a=new V2(e,this,V)),this._$AV.push(a),t=H[++i]}r!==t?.index&&(e=L1.nextNode(),r++)}return L1.currentNode=e1,L}p(V){let C=0;for(let H of this._$AV)H!==void 0&&(H.strings!==void 0?(H._$AI(V,H,C),C+=H.strings.length-2):H._$AI(V[C])),C++}},d1=class M{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(V,C,H,L){this.type=2,this._$AH=x,this._$AN=void 0,this._$AA=V,this._$AB=C,this._$AM=H,this.options=L,this._$Cv=L?.isConnected??!0}get parentNode(){let V=this._$AA.parentNode,C=this._$AM;return C!==void 0&&V?.nodeType===11&&(V=C.parentNode),V}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(V,C=this){V=r1(this,V,C),R1(V)?V===x||V==null||V===""?(this._$AH!==x&&this._$AR(),this._$AH=x):V!==this._$AH&&V!==M1&&this._(V):V._$litType$!==void 0?this.$(V):V.nodeType!==void 0?this.T(V):Q2(V)?this.k(V):this._(V)}O(V){return this._$AA.parentNode.insertBefore(V,this._$AB)}T(V){this._$AH!==V&&(this._$AR(),this._$AH=this.O(V))}_(V){this._$AH!==x&&R1(this._$AH)?this._$AA.nextSibling.data=V:this.T(e1.createTextNode(V)),this._$AH=V}$(V){let{values:C,_$litType$:H}=V,L=typeof H=="number"?this._$AC(V):(H.el===void 0&&(H.el=D1.createElement(q2(H.h,H.h[0]),this.options)),H);if(this._$AH?._$AD===L)this._$AH.p(C);else{let e=new X1(L,this),r=e.u(this.options);e.p(C),this.T(r),this._$AH=e}}_$AC(V){let C=G2.get(V.strings);return C===void 0&&G2.set(V.strings,C=new D1(V)),C}k(V){x2(this._$AH)||(this._$AH=[],this._$AR());let C=this._$AH,H,L=0;for(let e of V)L===C.length?C.push(H=new M(this.O(F1()),this.O(F1()),this,this.options)):H=C[L],H._$AI(e),L++;L<C.length&&(this._$AR(H&&H._$AB.nextSibling,L),C.length=L)}_$AR(V=this._$AA.nextSibling,C){for(this._$AP?.(!1,!0,C);V!==this._$AB;){let H=$2(V).nextSibling;$2(V).remove(),V=H}}setConnected(V){this._$AM===void 0&&(this._$Cv=V,this._$AP?.(V))}},t1=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(V,C,H,L,e){this.type=1,this._$AH=x,this._$AN=void 0,this.element=V,this.name=C,this._$AM=L,this.options=e,H.length>2||H[0]!==""||H[1]!==""?(this._$AH=Array(H.length-1).fill(new String),this.strings=H):this._$AH=x}_$AI(V,C=this,H,L){let e=this.strings,r=!1;if(e===void 0)V=r1(this,V,C,0),r=!R1(V)||V!==this._$AH&&V!==M1,r&&(this._$AH=V);else{let i=V,t,a;for(V=e[0],t=0;t<e.length-1;t++)a=r1(this,i[H+t],C,t),a===M1&&(a=this._$AH[t]),r||=!R1(a)||a!==this._$AH[t],a===x?V=x:V!==x&&(V+=(a??"")+e[t+1]),this._$AH[t]=a}r&&!L&&this.j(V)}j(V){V===x?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,V??"")}},J1=class extends t1{constructor(){super(...arguments),this.type=3}j(V){this.element[this.name]=V===x?void 0:V}},C2=class extends t1{constructor(){super(...arguments),this.type=4}j(V){this.element.toggleAttribute(this.name,!!V&&V!==x)}},H2=class extends t1{constructor(V,C,H,L,e){super(V,C,H,L,e),this.type=5}_$AI(V,C=this){if((V=r1(this,V,C,0)??x)===M1)return;let H=this._$AH,L=V===x&&H!==x||V.capture!==H.capture||V.once!==H.once||V.passive!==H.passive,e=V!==x&&(H===x||L);L&&this.element.removeEventListener(this.name,this,H),e&&this.element.addEventListener(this.name,this,V),this._$AH=V}handleEvent(V){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,V):this._$AH.handleEvent(V)}},V2=class{constructor(V,C,H){this.element=V,this.type=6,this._$AN=void 0,this._$AM=C,this.options=H}get _$AU(){return this._$AM._$AU}_$AI(V){r1(this,V)}},Y2={M:s2,P:G,A:v2,C:1,L:j2,R:X1,D:Q2,V:r1,I:d1,H:t1,N:C2,U:H2,B:J1,F:V2},E5=l2.litHtmlPolyfillSupport;E5?.(D1,d1),(l2.litHtmlVersions??=[]).push("3.3.3");var X2=(M,V,C)=>{let H=C?.renderBefore??V,L=H._$litPart$;if(L===void 0){let e=C?.renderBefore??null;H._$litPart$=L=new d1(V.insertBefore(F1(),e),e,void 0,C??{})}return L._$AI(M),L};var c2=globalThis,b=class extends U{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let V=super.createRenderRoot();return this.renderOptions.renderBefore??=V.firstChild,V}update(V){let C=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(V),this._$Do=X2(C,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return M1}};b._$litElement$=!0,b.finalized=!0,c2.litElementHydrateSupport?.({LitElement:b});var $5=c2.litElementPolyfillSupport;$5?.({LitElement:b});(c2.litElementVersions??=[]).push("4.2.2");var J2="M22,21H2V3H4V19H6V10H10V19H12V6H16V19H18V14H22V21Z";var C5="M13,2.05V5.08C16.39,5.57 19,8.47 19,12C19,12.9 18.82,13.75 18.5,14.54L21.12,16.07C21.68,14.83 22,13.45 22,12C22,6.82 18.05,2.55 13,2.05M12,19A7,7 0 0,1 5,12C5,8.47 7.61,5.57 11,5.08V2.05C5.94,2.55 2,6.81 2,12A10,10 0 0,0 12,22C15.3,22 18.23,20.39 20.05,17.91L17.45,16.38C16.17,18 14.21,19 12,19Z";var H5=M=>(...V)=>({_$litDirective$:M,values:V}),L2=class{constructor(V){}get _$AU(){return this._$AM._$AU}_$AT(V,C,H){this._$Ct=V,this._$AM=C,this._$Ci=H}_$AS(V,C){return this.update(V,C)}update(V,C){return this.render(...C)}};var{I:J3}=Y2;var I5={},V5=(M,V=I5)=>M._$AH=V;var L5=H5(class extends L2{constructor(){super(...arguments),this.key=x}render(M,V){return this.key=M,V}update(M,[V,C]){return V!==this.key&&(V5(M),this.key=V),C}});var e5;function N5(){if(customElements.get("ha-chart-base"))return Promise.resolve(!0);let M=window.loadCardHelpers;return M?(e5??=(async()=>{try{(await M()).createCardElement({type:"statistics-graph",entities:[]})}catch{}let V=new Promise(C=>setTimeout(()=>C(!1),1e4));return Promise.race([customElements.whenDefined("ha-chart-base").then(()=>!0),V])})(),e5):Promise.resolve(!1)}function r2(M){N5().then(M),customElements.whenDefined("ha-chart-base").then(()=>M(!0))}var e2="compare-",M5=M=>Math.round(M*255).toString(16).padStart(2,"0");function m1(M,V){let C=M.trim();if(/^#[0-9a-f]{6}$/i.test(C))return C+M5(V);if(/^#[0-9a-f]{3}$/i.test(C))return`#${[...C.slice(1)].map(L=>L+L).join("")}${M5(V)}`;let H=C.match(/^rgba?\(([^)]+)\)/i);if(H){let[L,e,r]=H[1].split(/[ ,/]+/).filter(Boolean);return`rgba(${L}, ${e}, ${r}, ${V})`}return C}var i1=M=>M.replace(/[&<>"']/g,V=>`&#${V.charCodeAt(0)};`),Z2=M=>`<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${M}"></span>`;function r5(M){if(M<=0)return 1;let V=10**Math.floor(Math.log10(M)),C=M/V;return([1,2,2.5,5,10].find(L=>C<=L*(1+1e-9))??10)*V}var p1=M=>Number(M.toFixed(10));function W5(M,V){if(M.min>=0&&V.min>=0)return;let C=r5((M.max-M.min)/6),H=Math.max(Math.ceil(p1(M.max/C)),V.max>0?1:0),L=Math.max(Math.ceil(p1(-M.min/C)),V.min<0?1:0),e=r5(Math.max(H?V.max/H:0,L?-V.min/L:0));return{bar:{min:p1(-L*C),max:p1(H*C),interval:C},line:{min:p1(-L*e),max:p1(H*e),interval:e}}}function t5(M,V,C){return M.map((H,L)=>({id:C?e2+H.id:H.id,type:"bar",name:H.name,stack:V,cursor:"default",barMaxWidth:50,color:m1(H.color,C?50/255:127/255),itemStyle:{borderColor:C?m1(H.color,127/255):H.color},data:H.values.map((e,r)=>{let i=M.slice(L+1).every(t=>Math.sign(t.values[r]??0)!==Math.sign(e??0));return{value:e,itemStyle:e?i?{borderRadius:e>0?[4,4,0,0]:[0,0,4,4]}:void 0:{borderWidth:0}}})}))}function i5(M,V){let C=0,H=0;for(let L=0;L<V;L+=1){let e=M.map(r=>r.values[L]??0);H=Math.max(H,e.filter(r=>r>0).reduce((r,i)=>r+i,0)),C=Math.min(C,e.filter(r=>r<0).reduce((r,i)=>r+i,0))}return{min:C,max:H}}function o5(M){let V=M.lines??[],C=M.compare,H=[...C?t5(C.series,"compare",!0):[],...t5(M.series,"main",!1)],L=V.map(A=>({id:A.id,type:"line",name:A.name,yAxisIndex:1,color:A.color,symbol:"none",showSymbol:!1,step:A.step?"middle":!1,lineStyle:{width:1.5,type:A.dash??"dashed",color:A.color},z:1,connectNulls:!0,data:A.values})),e=[...H,...L],r=new Map(V.map(A=>[A.id,A.format])),i=new Set(M.series.filter(A=>A.inTotal===!1).flatMap(A=>[A.id,e2+A.id])),t=(A,m)=>{let l=m.filter(s=>s.value);if(!l.length)return"";let v=l.map(s=>`${Z2(String(s.color??""))}${i1(s.seriesName??"")}: ${M.format(s.value??0)}`),u=l.filter(s=>!i.has(s.seriesId??"")).reduce((s,c)=>s+(c.value??0),0);return`<b>${i1(A)}</b><br>${v.join("<br>")}`+(l.length>1?`<br><b>${i1(M.total)}: ${M.format(u)}</b>`:"")},a=A=>{let m=Array.isArray(A)?A:[A],l=document.createElement("div");if(!m.length)return l;let v=m[0].dataIndex,u=g=>r.has(g.seriesId??""),s=g=>(g.seriesId??"").startsWith(e2),c=m.filter(g=>u(g)&&g.value!==null&&g.value!==void 0).map(g=>`${Z2(String(g.color??""))}${i1(g.seriesName??"")}: ${r.get(g.seriesId??"")?.(g.value??0)??""}`),h=M.labels[v]?.tooltip??"",Z=t(h,m.filter(g=>!u(g)&&!s(g))),S=C?t(C.labels[v]??"",m.filter(g=>s(g))):"",k=[Z||`<b>${i1(h)}</b>`];return c.length&&(k[0]+=`<br>${c.join("<br>")}`),S&&k.push(S),l.innerHTML=k.join("<br><br>"),l},n={type:"value",name:M.unit,nameGap:2,nameTextStyle:{align:"left"},axisLabel:{formatter:M.tick},splitLine:{show:!0}},o={type:"value",name:M.lineUnit??"",nameGap:2,nameTextStyle:{align:"right"},axisLabel:{formatter:M.lineTick??M.tick},splitLine:{show:!1}};if(V.length){let A=M.labels.length,m=i5(M.series,A),l=C?i5(C.series,A):m,v=V.flatMap(c=>c.values.filter(h=>h!==null)),u=Math.min(0,...v),s=W5({min:Math.min(m.min,l.min),max:Math.max(m.max,l.max)},{min:u,max:Math.max(0,...v)});if(s){Object.assign(n,s.bar),Object.assign(o,s.line);let c=M.lineTick??M.tick;u>=0&&(o.axisLabel={formatter:h=>h<0?"":c(h)})}}let d={xAxis:{type:"category",data:M.labels.map(A=>A.axis),axisTick:{show:!1}},yAxis:V.length?[n,o]:n,grid:{top:15,bottom:0,left:1,right:1,containLabel:!0},legend:{show:!0,type:"custom",data:[...M.series,...V].map(A=>({id:A.id,secondaryIds:C?.series.some(m=>m.id===A.id)?[e2+A.id]:[],name:A.name}))},tooltip:{trigger:"axis",formatter:a}};return{data:e,options:d}}function M2(M){let V=M.reduce((C,H)=>C+Math.max(0,H),0);return M.map(C=>V>0?Math.max(0,C)/V*100:0)}function a5(M){let V=[],C=-Math.PI/2;for(let H of M){let L=C+H/100*2*Math.PI;V.push([C,L]),C=L}return V}function A5(M){let V=M.items.map(o=>M.hidden.has(o.id)?0:o.value),C=M2(V),H=V.reduce((o,d)=>o+Math.max(0,d),0),L=a5(C),e=M.compare?.map((o,d)=>M.hidden.has(M.items[d].id)?0:o),r=e?M2(e):[],i=a5(r),t=o=>{let d=Math.min(90,o.getWidth()/2-8,o.getHeight()/2-8);return{cx:o.getWidth()/2,cy:o.getHeight()/2,r:d,r0:d*(e?50:40)/70}},a=M.items.map((o,d)=>({id:o.id,type:"custom",name:o.name,coordinateSystem:"none",cursor:"default",color:m1(o.color,.5),data:[[V[d],L[d][0],L[d][1],C[d]]],renderItem:(A,m)=>{let l=m.value(1),v=m.value(2);if(!(v-l>0))return null;let u=t(m),s=[{type:"sector",shape:{...u,startAngle:l,endAngle:v,cornerRadius:4},style:{fill:m1(o.color,.5),stroke:o.color,lineWidth:1}}];if(v-l>=15*Math.PI/180){let c=(l+v)/2,h=Math.cos(c)>=0,Z=[u.cx+Math.cos(c)*u.r,u.cy+Math.sin(c)*u.r],S=[u.cx+Math.cos(c)*(u.r+10),u.cy+Math.sin(c)*(u.r+10)],k=[S[0]+(h?10:-10),S[1]];s.push({type:"polyline",silent:!0,shape:{points:[Z,S,k]},style:{stroke:o.color,fill:"none"}},{type:"text",silent:!0,x:k[0]+(h?4:-4),y:k[1],style:{text:`${o.name}
${M.percent(m.value(3))}`,fill:M.labelColor,fontSize:12,lineHeight:16,align:h?"left":"right",verticalAlign:"middle"}})}return{type:"group",children:s}}}));return e&&M.items.forEach((o,d)=>{a.push({id:`compare-${o.id}`,type:"custom",name:o.name,coordinateSystem:"none",cursor:"default",data:[[e[d],i[d][0],i[d][1],r[d]]],renderItem:(A,m)=>{let l=m.value(1),v=m.value(2);if(!(v-l>0))return null;let u=t(m);return{type:"sector",shape:{cx:u.cx,cy:u.cy,r:u.r0,r0:u.r*30/70,startAngle:l,endAngle:v,cornerRadius:4},style:{fill:m1(o.color,50/255),stroke:m1(o.color,127/255),lineWidth:1}}}})}),a.push({id:"total",type:"custom",coordinateSystem:"none",silent:!0,tooltip:{show:!1},data:[[H]],renderItem:(o,d)=>{let A=t(d);return{type:"text",x:A.cx,y:A.cy,style:{text:e?M.format(d.value(0)):`${M.total}
${M.format(d.value(0))}`,fill:M.centerColor,fontSize:e?12:14,lineHeight:24,fontWeight:"bold",align:"center",verticalAlign:"middle"}}}}),{data:a,options:{xAxis:{show:!1},yAxis:{show:!1},legend:{show:!1},tooltip:{show:!0,trigger:"item",formatter:o=>{let d=(o.seriesId??"").startsWith("compare-"),A=d?(o.seriesId??"").slice(8):o.seriesId,m=M.items.findIndex(c=>c.id===A);if(m<0)return"";let l=M.items[m],v=document.createElement("div"),u=o.value?.[0]??(d?e?.[m]??0:V[m]),s=o.value?.[3]??(d?r[m]:C[m]);return v.innerHTML=`<b>${i1(l.name)}${d&&M.compared?` \xB7 ${i1(M.compared)}`:""}</b><br>${Z2(l.color)}${M.format(u)} (${M.percent(s)})`,v}}}}}var a1={solar:"var(--energy-solar-color, #ff9800)",grid:"var(--energy-grid-consumption-color, #488fc2)",cheap:"color-mix(in srgb, var(--energy-grid-consumption-color, #488fc2) 55%, #fff)",expensive:"color-mix(in srgb, var(--energy-grid-consumption-color, #488fc2) 70%, #000)",export:"var(--energy-grid-return-color, #8353d1)",heat:"var(--graph-color-30, var(--color-30, #bf3947))",car:"var(--energy-non-fossil-color, #0f9d58)"},n5=["#4269d0","#f4bd4a","#ff725c","#6cc5b0","#a463f2","#ff8ab7","#9c6b4e","#97bbf5","#01ab63","#094bad","#c99000","#d84f3e"];function z5(M){let V=M.trim(),C=/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(V)?.[1];if(C){let L=C.length===3?[...C].map(e=>e+e).join(""):C;return[0,2,4].map(e=>parseInt(L.slice(e,e+2),16))}let H=/^rgba?\(([^)]+)\)/i.exec(V)?.[1];if(H){let[L,e,r]=H.split(/[ ,/]+/).filter(Boolean).map(Number);if([L,e,r].every(Number.isFinite))return[L,e,r]}}var U5=([M,V,C])=>`#${[M,V,C].map(H=>Math.round(Math.min(Math.max(H,0),255)).toString(16).padStart(2,"0")).join("")}`;function d5(M,V,C){let H=z5(M);if(!H)return M;let L=V==="white"?255:0;return U5(H.map(e=>e*C+L*(1-C)))}function w(M){let V=getComputedStyle(M),C=(e,r)=>V.getPropertyValue(e).trim()||r,H=C("--energy-grid-consumption-color","#488fc2"),L=Array.from({length:54},(e,r)=>{let i=r+1;return V.getPropertyValue(`--graph-color-${i}`).trim()||V.getPropertyValue(`--color-${i}`).trim()||n5[r%n5.length]});return{solar:C("--energy-solar-color","#ff9800"),grid:H,cheap:d5(H,"white",.55),expensive:d5(H,"black",.7),export:C("--energy-grid-return-color","#8353d1"),standing:C("--electricity-lens-standing-charge-color","#a1887f"),heat:V.getPropertyValue("--graph-color-30").trim()||C("--color-30","#bf3947"),car:C("--energy-non-fossil-color","#0f9d58"),other:V.getPropertyValue("--history-unknown-color").trim()||C("--disabled-color","#bdbdbd"),line:C("--secondary-text-color","#727272"),consumers:L}}function P(M,V){let C=new Map,H=new Map,L=0;for(let e of M.areas)if(e.kind==="other")C.set(e.id,V.other);else if(e.kind==="device"){let r=V.consumers[L++%V.consumers.length];C.set(e.id,r);let i=e.statistics.energy?.[0];i&&H.set(i,r)}for(let e of M.areas)if(e.kind==="category")if(e.id==="heat_pump")C.set(e.id,V.heat);else{let i=(e.statistics.energy??[]).map(a=>H.get(a)).filter(Boolean),t=e.id==="wallbox"?V.car:V.grid;C.set(e.id,i[i.length-1]??t)}return C}var G5=M=>!!M&&typeof M.subscribe=="function";function D(M){if(M!==void 0&&!M.startsWith("energy_"))throw new Error("Collection keys must start with energy_.")}function Q5(M,V){let C=location.pathname.split("/")[1]??"",H=M;for(let L of V?[`_${V}`]:[`_energy_${C}`,"_energy"])if(G5(H[L]))return H[L]}var K5=()=>new Date().setHours(24,0,0,0)-1;function l1(M,V,C){let H,L,e=0,r=()=>{let i=Q5(M,V);if(i){H=i.subscribe(t=>C({start:new Date(t.start).getTime(),end:t.end?new Date(t.end).getTime():K5()},t.startCompare&&t.endCompare?{start:new Date(t.startCompare).getTime(),end:new Date(t.endCompare).getTime()}:void 0));return}e+=1,e===2&&C(null),e<20&&(L=window.setTimeout(r,500))};return r(),()=>{window.clearTimeout(L),H?.()}}var q5={comma_decimal:"en-US",decimal_comma:"de",space_comma:"fr",quote_decimal:"de-CH"};function T(M,V){let C=M?.number_format,H=C==="system"?void 0:q5[C??""]??M?.language??"en";return new Intl.NumberFormat(H,{...V,...C==="none"?{useGrouping:!1}:{}})}function p5(M){switch(M?.time_format){case"am_pm":return!0;case"24":return!1;case"system":return new Intl.DateTimeFormat(void 0,{hour:"numeric"}).resolvedOptions().hour12;default:return}}function m5(M){let V=/^([-−+]?[\d.,'’\u00a0\u202f ]*\d)[\u00a0\u202f ](.+)$/.exec(M);return V?[V[1],V[2]]:[M,""]}function s1(M,V){let C=(e,r)=>{let i=Math.abs(e),t=r??(i<10?2:i<100?1:0);return T(M,{maximumFractionDigits:t,minimumFractionDigits:r??0}).format(e)};return{number:C,value:(e,r)=>{switch(r){case"energy":return`${C(e,Math.abs(e)<100?1:0)} kWh`;case"money":{let i=Math.abs(e)<100;return T(M,{style:"currency",currency:V,maximumFractionDigits:i?2:0,minimumFractionDigits:i?2:0}).format(e)}case"price":return V==="EUR"?`${C(e*100,1)} ct/kWh`:`${T(M,{style:"currency",currency:V,maximumFractionDigits:3}).format(e)}/kWh`;case"percent":return T(M,{style:"percent",maximumFractionDigits:0}).format(e/100);case"number":return C(e,Math.abs(e)<10?2:Math.abs(e)<100?1:0);case"distance":return`${C(e,Math.abs(e)<100?1:0)} km`;case"per_100km":return`${T(M,{style:"currency",currency:V,maximumFractionDigits:2,minimumFractionDigits:2}).format(e)}/100 km`}},currencySymbol:()=>T(M,{style:"currency",currency:V}).formatToParts(0).find(e=>e.type==="currency")?.value??""}}var S2={energy:["energy"],cost:["cost"],bill:["import_cost","standing_charge"],grid_price:["import_cost","energy"],device_grid_price:["cost","solar_cost","energy","solar"],price:["cost","energy","solar"],solar_share:["solar","energy"],cheap_share:["cheap","solar","energy"],expensive_share:["expensive","solar","energy"],cheap_saving:["cheap_saving"],self_consumption:["self_used","energy"],export:["export"],saving:["saving"],heat:["heat"],alternative_cost:["alternative_cost"],scop:["heat","energy"],heat_price:["cost","heat"],distance:["distance"],cost_per_100km:["cost","distance"],forecast_today:[],forecast_tomorrow:[],payback:[],annual_return:[]},j5={energy:["solar","export"],cost:["energy","solar","feed_in","standing_charge"],saving:["solar_saving"],heat:["energy"],distance:["energy"]},Y5=Object.keys(S2),o1=M=>M==="forecast_today"||M==="forecast_tomorrow",A1=M=>M==="payback"||M==="annual_return";function j(M){return Y5.filter(V=>o1(V)?M.forecast===!0:A1(V)?M.investment===!0:S2[V].every(C=>M.statistics[C]?.length))}function l5(M,V){return[...S2[V],...j5[V]??[]].flatMap(C=>M.statistics[C]??[])}var t2=(M,V)=>V>0?M/V*100:null;function v1(M,V,C,H){let L=C("energy"),e=C("solar"),r=t=>({value:t,unit:"energy"}),i=t=>({value:t,unit:"money"});switch(M){case"energy":{if(L!==null&&e!==null&&L>0){if(V.kind==="household")return{value:L,unit:"energy",line:{key:"line_energy_parts",values:{grid:r(Math.max(L-e,0)),solar:r(e)}}};let a=t2(e,L)??0;return{value:L,unit:"energy",line:{key:"line_solar_part",values:{percent:{value:a,unit:"percent"}}}}}let t=C("export");return V.kind==="grid"&&t!==null?{value:L,unit:"energy",line:{key:"line_exported",values:{energy:r(t)}}}:{value:L,unit:"energy"}}case"cost":{let t=C("cost");if(t!==null&&L&&e!==null)return{value:t,unit:"money",line:{key:"line_average_price",values:{price:{value:t/L,unit:"price"}}}};let a=C("feed_in"),n=C("standing_charge");return t!==null&&a!==null&&n!==null?{value:t,unit:"money",line:{key:Math.abs(n)<.005?"line_bill_no_charge":"line_bill",values:{feed_in:i(a),charge:i(n)}}}:t!==null&&L!==null&&V.kind==="grid"?{value:t,unit:"money",line:{key:"line_for_import",values:{energy:r(L)}}}:{value:t,unit:"money"}}case"bill":{let t=C("import_cost"),a=C("standing_charge");return t===null||a===null?{value:null,unit:"money"}:{value:t+a,unit:"money",line:Math.abs(a)<.005?void 0:{key:"line_bill",values:{charge:i(a)}}}}case"grid_price":{let t=C("import_cost");return t===null||!L?{value:null,unit:"price"}:{value:t/L,unit:"price",line:{key:"line_cost_for",values:{cost:i(t),energy:r(L)}}}}case"device_grid_price":{let t=C("cost"),a=C("solar_cost");if(t===null||a===null||L===null||e===null)return{value:null,unit:"price"};let n=L-e;if(n<=0)return{value:null,unit:"price"};let o=t-a;return{value:o/n,unit:"price",line:{key:"line_cost_for",values:{cost:i(o),energy:r(n)}}}}case"cheap_saving":return{value:C("cheap_saving"),unit:"money",line:{key:"line_against_normal",values:{}}};case"price":{let t=C("cost");return t===null||!L?{value:null,unit:"price"}:{value:t/L,unit:"price",line:{key:"line_cost_for",values:{cost:{value:t,unit:"money"},energy:r(L)}}}}case"solar_share":return L===null||e===null?{value:null,unit:"percent"}:{value:t2(e,L),unit:"percent",line:{key:"line_part_of",values:{part:r(e),whole:r(L)}}};case"cheap_share":case"expensive_share":{let t=C(M==="cheap_share"?"cheap":"expensive");if(L===null||e===null||t===null)return{value:null,unit:"percent"};let a=Math.max(L-e,0);return{value:t2(t,a),unit:"percent",line:{key:"line_part_of",values:{part:r(t),whole:r(a)}}}}case"self_consumption":{let t=C("self_used");return L===null||t===null?{value:null,unit:"percent"}:{value:t2(t,L),unit:"percent",line:{key:"line_part_of",values:{part:r(t),whole:r(L)}}}}case"export":return{value:C("export"),unit:"energy"};case"saving":{let t=C("saving"),a=C("solar_saving");return t===null||a===null?{value:t,unit:"money"}:{value:t+a,unit:"money",line:Math.abs(a)<.005?void 0:{key:"line_saving_split",values:{solar:i(a)}}}}case"heat":{let t=C("heat");return t===null||L===null?{value:t,unit:"energy"}:{value:t,unit:"energy",line:{key:"line_from_electricity",values:{energy:r(L)}}}}case"alternative_cost":return{value:C("alternative_cost"),unit:"money"};case"scop":{let t=C("heat");return t===null||!L?{value:null,unit:"number"}:{value:t/L,unit:"number",line:{key:"line_heat_from",values:{heat:r(t),energy:r(L)}}}}case"heat_price":{let t=C("heat"),a=C("cost");return t===null||a===null||!t?{value:null,unit:"price"}:{value:a/t,unit:"price",line:{key:"line_cost_for",values:{cost:{value:a,unit:"money"},energy:r(t)}}}}case"distance":{let t=C("distance");return t===null||L===null?{value:t,unit:"distance"}:{value:t,unit:"distance",line:{key:"line_charged",values:{energy:r(L)}}}}case"cost_per_100km":{let t=C("distance"),a=C("cost");return t===null||a===null||!t?{value:null,unit:"per_100km"}:{value:a/t*100,unit:"per_100km",line:{key:"line_cost_for",values:{cost:{value:a,unit:"money"},energy:{value:t,unit:"distance"}}}}}case"forecast_today":case"forecast_tomorrow":return{value:H,unit:"energy"};case"payback":case"annual_return":return{value:null,unit:"percent"}}}var s5=["change","mean","min","max"],E=M=>M.statistic!==void 0?"statistic":M.entity!==void 0?"entity":"energy";function X5(M,V){let C=new Date(M),H=new Date(V),L=i=>Date.UTC(i.getFullYear(),i.getMonth(),i.getDate()),e=Math.round((L(H)-L(C))/864e5),r=i=>i.getTime()-new Date(i).setHours(0,0,0,0);return r(H)<r(C)?e-1:e}function Y({start:M,end:V}){let C=X5(M,V),H=new Date(V);return new Date(M).getDate()===1&&new Date(H.getFullYear(),H.getMonth(),H.getDate()+1).getDate()===1&&C>35?"month":C>2?"day":"hour"}var x1=M=>M==="year"?"month":M,J5=(M,V)=>{let C=new Date(M);return V==="hour"?C.setMinutes(0,0,0):(C.setHours(0,0,0,0),V==="day"||(C.setDate(1),V==="month")?C.getTime():C.setMonth(0))},C3=(M,V)=>{let C=new Date(M);return V==="hour"?C.setHours(C.getHours()+1):V==="day"?C.setDate(C.getDate()+1):V==="month"?C.setMonth(C.getMonth()+1):C.setFullYear(C.getFullYear()+1),C.getTime()};function h2({start:M,end:V},C){let H=[];for(let L=J5(M,C);L<=V&&H.length<400;L=C3(L,C))H.push(L);return H}function v5(M,V=new Date){let C=M.filter(L=>L!==null).map(L=>L.getFullYear()),H=Math.min(V.getFullYear(),...C);return{start:new Date(H,0,1).getTime(),end:new Date(V.getFullYear()+1,0,1).getTime()-1}}var x5=2e3;function u5(M,V){for(let C=0;C<V;C+=1)if(M.some(H=>H[C]!==null&&H[C]!==void 0))return C;return 0}function g2(M,V,C){let H=V.map(()=>null),L=C==="hour"?0:12*36e5;for(let e of M??[]){if(e.change===null||e.change===void 0)continue;let r=(typeof e.start=="number"?e.start:Date.parse(e.start))+L,i=-1;for(let t=0;t<V.length&&V[t]<=r;t+=1)i=t;i<0||(H[i]=(H[i]??0)+e.change)}return H}function $(M,V=new Date){let C=(r,i)=>({start:r.getTime(),end:i.getTime()-1}),H=V.getFullYear(),L=V.getMonth(),e=V.getDate();switch(M){case"today":return C(new Date(H,L,e),new Date(H,L,e+1));case"yesterday":return C(new Date(H,L,e-1),new Date(H,L,e));case"this_month":return C(new Date(H,L,1),new Date(H,L+1,1));case"last_month":return C(new Date(H,L-1,1),new Date(H,L,1));case"this_year":return C(new Date(H,0,1),new Date(H+1,0,1));case"last_year":return C(new Date(H-1,0,1),new Date(H,0,1))}}function c5(M,V,C){let H=V.map(()=>0),L=V.map(()=>0),e=C==="hour"?0:12*36e5;for(let r of M??[]){if(r.mean===null||r.mean===void 0)continue;let i=(typeof r.start=="number"?r.start:Date.parse(r.start))+e,t=-1;for(let a=0;a<V.length&&V[a]<=i;a+=1)t=a;t<0||(H[t]+=r.mean,L[t]+=1)}return H.map((r,i)=>L[i]?r/L[i]:null)}var y="electricity_lens",u1=["pv","heat_pump","wallbox"],X=M=>{if(M==null||M==="")return null;let V=Number(M);return Number.isFinite(V)?V:null},H3=M=>typeof M=="string"&&M?new Date(M):null;function F(M){let V=Object.values(M.entities??{}).filter(e=>e.platform===y),C=(e,r)=>V.find(i=>i.device_id===e&&i.translation_key===r),H=e=>e?X(M.states[e]?.state):null,L=[];for(let e of V){if(e.translation_key!=="saving")continue;let r=M.states[e.entity_id];if(!r||r.state==="unavailable")continue;let i=r.attributes,t=i.category;u1.includes(t)&&L.push({category:t,savingStatistic:typeof i.statistic_id=="string"?i.statistic_id:`${y}:${t}_saving`,calculating:i.calculating===!0,saving:X(r.state),investment:X(i.investment),balance:X(i.balance),perYear:H(C(e.device_id,"saving_per_year")?.entity_id),countingSince:H3(i.counting_since),entityId:e.entity_id,heating:i.heating==="gas"||i.heating==="oil"?i.heating:null})}return L.sort((e,r)=>u1.indexOf(e.category)-u1.indexOf(r.category))}function i2(M){let V=Object.values(M.entities??{}).filter(C=>C.platform===y);return V.filter(C=>C.translation_key==="saving").flatMap(C=>{let H=M.states[C.entity_id]?.attributes,L=t=>V.find(a=>a.device_id===C.device_id&&a.translation_key===t)?.entity_id,e=L("payback"),r=L("annual_return"),i=H?.category;return u1.includes(i)&&Number(H?.investment)>0&&e&&r?[{category:i,payback:e,annualReturn:r}]:[]}).sort((C,H)=>u1.indexOf(C.category)-u1.indexOf(H.category))}var E1=M=>M==="pv"?"solar":M;function Z5(M){let V=Object.values(M.entities??{}).find(H=>H.platform===y&&H.translation_key==="balance"),C=V?M.states[V.entity_id]:void 0;return!C||C.state==="unavailable"?null:{balance:X(C.state),saved:X(C.attributes.saved)??0,invested:X(C.attributes.invested)??0,perYear:X(C.attributes.per_year),entityId:V.entity_id}}function c1(M){return Object.values(M.entities??{}).some(C=>C.platform===y&&C.translation_key==="saving")?"integration_unavailable":"not_set_up"}var V3=300*1e3,I=5*1e3,n1,f2,J=()=>n1?.value;function Q(){if(!n1)return!0;let M=n1.value&&!n1.value.calculating?V3:I;return Date.now()-n1.at>M}function C1(M){return Q()?(f2??=M.callWS({type:`${y}/figures`}).then(V=>V).catch(()=>null).then(V=>(n1={at:Date.now(),value:V},f2=void 0,V)),f2):Promise.resolve(n1?.value??null)}var L3=6e4,S5=new WeakMap;function e3(M){let V=M.entities??{},C=S5.get(V);return C||(C=Object.values(V).filter(H=>H.platform===y).map(H=>H.entity_id),S5.set(V,C)),C}var N=class extends b{constructor(){super(...arguments);this._lookedAt=0}_watched(){return[]}_changedFor(C,H){return C.locale!==H.locale||C.language!==H.language||C.config!==H.config||C.themes!==H.themes||C.selectedTheme!==H.selectedTheme||C.entities!==H.entities||[...e3(H),...this._watched()].some(L=>C.states[L]!==H.states[L])}shouldUpdate(C){let H=C.get("hass"),L=C.size===1&&H!==void 0&&this.hass!==void 0,e=Date.now()-this._lookedAt>=L3;return L&&!e&&!this._changedFor(H,this.hass)?!1:(this._lookedAt=Date.now(),!0)}};var O2={title:"Economics","category.pv":"PV plant","category.heat_pump":"Heat pump","category.wallbox":"Electric car",not_set_up:"Set up the Electricity Lens integration to see what your PV plant, heat pump, and electric car have saved.",integration_unavailable:"The figures aren't available right now. Check Electricity Lens under Settings > Devices & services.",calculating:"Being computed \u2026",loading:"Loading \u2026",column_area:"Area",column_per_year:"Per year",column_saving:"Saving",column_investment:"Investment",column_balance:"Net",total:"Total",average:"\xD8 {amount}",line_payback:"of {investment}",line_payback_left:"about {time} left",line_return:"Total {amount}",return_value:"{rate} % a year",months_one:"1 month",months_other:"{count} months",years_one:"1 year",years_other:"{count} years",savings_title:"Savings",savings_source:"Source",savings_energy:"Energy",savings_amount:"Amount",savings_total:"Total",savings_pv:"Solar power instead of grid power",savings_feed_in:"Feed-in",savings_gas:"Electricity instead of gas",savings_oil:"Electricity instead of oil",savings_fuel:"Electricity instead of fuel",savings_instead_gas:"A gas heating would have cost",savings_instead_oil:"An oil heating would have cost",savings_instead_fuel:"A combustion car would have cost",savings_electricity:"{name} electricity costs",savings_solar_part:"of which by solar power",meters_consumer:"Consumer",meters_electricity:"Electricity",history_title:"Savings over time",history_total:"Total",history_no_chart:"The chart is only shown in Home Assistant.",history_failed:"The statistics could not be loaded.",history_empty:"No savings in this period.",figures_failed:"The figures could not be loaded.",figures_not_loaded:"not loaded",figures_unavailable:"not available","figure.energy":"Consumption","figure.energy.grid":"Grid import","figure.energy.solar":"Solar production","figure.cost":"Costs","figure.cost.grid":"Grid costs","figure.bill":"Electricity bill","figure.grid_price":"Average grid price","figure.device_grid_price":"Average grid price","figure.price":"Average price","figure.solar_share":"Solar share","figure.solar_share.household":"Self-sufficiency","figure.cheap_share":"Grid cheap","figure.expensive_share":"Grid expensive","figure.cheap_saving":"Tariff saving","figure.self_consumption":"Self-consumption","figure.export":"Feed-in","figure.saving":"Saving","figure.payback":"Payback","figure.annual_return":"Return","figure.forecast_today":"Forecast today","figure.forecast_tomorrow":"Forecast tomorrow","figure.heat":"Heat","figure.alternative_cost":"Comparison costs","figure.scop":"Seasonal COP","figure.heat_price":"Heat price","figure.distance":"Distance","figure.cost_per_100km":"Costs per 100 km",line_saving_split:"of which {solar} by solar",line_bill:"{charge} standing charge",line_bill_no_charge:"feed-in \u2212{feed_in}",line_against_normal:"vs. normal price",line_from_electricity:"from {energy} electricity",line_heat_from:"{heat} from {energy}",line_charged:"with {energy} charged",line_solar_part:"{percent} of it solar power",line_energy_parts:"Grid {grid} + solar {solar}",line_exported:"{energy} fed in",line_average_price:"average {price}",line_for_import:"for {energy} imported",line_cost_for:"{cost} for {energy}",line_part_of:"{part} of {whole}","value.change":"total in the period","value.mean":"average","value.min":"minimum","value.max":"maximum",value_range:"from {min} to {max}","period.energy_date":"Follow the date selection","period.today":"Today","period.yesterday":"Yesterday","period.this_month":"This month","period.last_month":"Last month","period.this_year":"This year","period.last_year":"Last year","period.all":"All years",editor_title:"Title (optional)",editor_period:"Period",editor_period_hint:"Without a date selection on the dashboard: this month.",editor_period_hint_years:"Without a date selection on the dashboard: all years.",editor_source:"Source","source.energy":"Energy data","source.statistic":"Statistic","source.entity":"Entity",editor_area:"Area",editor_figure:"Figure",editor_statistic:"Statistic",editor_value:"Value",editor_secondary:"Line below","secondary.none":"Default","secondary.range":"Range of the period",editor_entity:"Entity",editor_name:"Name (optional)",editor_not_loaded:"Energy data need the Electricity Lens integration.","source.solar":"Solar power","source.grid":"Grid power","source.normal":"Grid normal","source.cheap":"Grid cheap","source.expensive":"Grid expensive","source.export":"Feed-in","source.standing_charge":"Standing charge","stack.source":"By source","stack.bill":"By bill item","stack.consumer":"By device","stack.none":"None",editor_savings:"Savings of all categories",editor_stack:"Split",editor_line:"Line",editor_lines:"Further lines",editor_line_none:"None",history_empty_figure:"No data in this period.",breakdown_mix:"Electricity mix",breakdown_cost_by_device:"Costs by device",breakdown_energy_by_device:"Consumption by device",breakdown_compared:"Compared {amount}",breakdown_compare_period:"compared period",breakdown_total:"Total",breakdown_switch_display:"Change chart type","mix.solar":"Solar","mix.grid":"Grid","mix.normal":"Grid normal","mix.cheap":"Grid cheap","mix.expensive":"Grid expensive",editor_by:"Split","by.source":"By source","by.consumer":"By device",editor_display:"Display","display.ring":"Ring","display.bars":"Bars",editor_color_by_source:"Color the bars by source",editor_breakdown_source:"Data","breakdown_source.energy":"Energy data","breakdown_source.statistics":"Statistics",editor_statistics:"Statistics","figure_choice.energy":"Consumption","figure_choice.cost":"Costs","strategy.title":"Electricity","strategy.overview":"Now","strategy.electricity":"Consumption","strategy.forecast_today":"Solar remaining today","strategy.forecast_tomorrow":"Solar forecast tomorrow","strategy.cost_today":"Costs today","strategy.consumption_today":"Consumption today","strategy.payback_pv":"PV payback","strategy.payback_heat_pump":"HP payback","strategy.payback_wallbox":"Car payback","strategy.return_pv":"PV return","strategy.return_heat_pump":"HP return","strategy.return_wallbox":"Car return","strategy.charged_energy":"Charged energy","strategy.charging_cost":"Charging costs","strategy.bill":"Electricity bill","strategy.cost_with_solar":"Electricity costs incl. solar","strategy.cost_history":"Costs over time","strategy.price_with_solar":"Average price incl. solar","strategy.costs":"Costs","strategy.heating":"Heating","strategy.charging":"Charging","strategy.usage_graph":"Consumption by source","strategy.solar_graph":"Solar production","strategy.devices_graph":"Consumption over time","strategy.distribution":"Power flow","strategy.not_loaded":"Set up the Electricity Lens integration to see this dashboard."},M3={title:"Wirtschaftlichkeit","category.pv":"PV-Anlage","category.heat_pump":"W\xE4rmepumpe","category.wallbox":"E-Auto",not_set_up:"Richte die Integration Electricity Lens ein, um zu sehen, was PV-Anlage, W\xE4rmepumpe und E-Auto gespart haben.",integration_unavailable:"Die Zahlen sind gerade nicht verf\xFCgbar. Pr\xFCfe Electricity Lens unter Einstellungen > Ger\xE4te & Dienste.",calculating:"Wird berechnet \u2026",loading:"Wird geladen \u2026",column_area:"Bereich",column_per_year:"Pro Jahr",column_saving:"Ersparnis",column_investment:"Investition",column_balance:"Saldo",total:"Summe",average:"\xD8 {amount}",line_payback:"von {investment}",line_payback_left:"noch etwa {time}",line_return:"Gesamt {amount}",return_value:"{rate} % p. a.",months_one:"1 Monat",months_other:"{count} Monate",years_one:"1 Jahr",years_other:"{count} Jahre",savings_title:"Ersparnis",savings_source:"Quelle",savings_energy:"Energie",savings_amount:"Betrag",savings_total:"Gesamt",savings_pv:"PV-Strom statt Netzstrom",savings_feed_in:"Einspeisung",savings_gas:"Strom statt Gas",savings_oil:"Strom statt \xD6l",savings_fuel:"Strom statt Sprit",savings_instead_gas:"Gasheizung h\xE4tte gekostet",savings_instead_oil:"\xD6lheizung h\xE4tte gekostet",savings_instead_fuel:"Verbrenner h\xE4tte gekostet",savings_electricity:"Stromkosten {name}",savings_solar_part:"davon durch PV",meters_consumer:"Verbraucher",meters_electricity:"Strom",history_title:"Ersparnisverlauf",history_total:"Summe",history_no_chart:"Das Diagramm erscheint nur in Home Assistant.",history_failed:"Die Statistik konnte nicht geladen werden.",history_empty:"Keine Ersparnis in diesem Zeitraum.",figures_failed:"Die Kennzahlen konnten nicht geladen werden.",figures_not_loaded:"nicht geladen",figures_unavailable:"nicht verf\xFCgbar","figure.energy":"Verbrauch","figure.energy.grid":"Netzbezug","figure.energy.solar":"PV-Erzeugung","figure.cost":"Kosten","figure.cost.grid":"Netzkosten","figure.bill":"Stromrechnung","figure.grid_price":"\xD8 Netzpreis","figure.device_grid_price":"\xD8 Netzpreis","figure.price":"\xD8 Strompreis","figure.solar_share":"PV-Anteil","figure.solar_share.household":"Autarkie","figure.cheap_share":"Netz g\xFCnstig","figure.expensive_share":"Netz teuer","figure.cheap_saving":"Tarifersparnis","figure.self_consumption":"Eigenverbrauch","figure.export":"Einspeisung","figure.saving":"Ersparnis","figure.payback":"Amortisation","figure.annual_return":"Rendite","figure.forecast_today":"Prognose heute","figure.forecast_tomorrow":"Prognose morgen","figure.heat":"W\xE4rme","figure.alternative_cost":"Vergleichskosten","figure.scop":"JAZ","figure.heat_price":"W\xE4rmepreis","figure.distance":"Strecke","figure.cost_per_100km":"Kosten pro 100 km",line_saving_split:"davon {solar} durch PV",line_bill:"inkl. {charge} Grundpreis",line_bill_no_charge:"Einspeisung \u2212{feed_in}",line_against_normal:"zum Normalpreis",line_from_electricity:"aus {energy} Strom",line_heat_from:"{heat} aus {energy}",line_charged:"mit {energy} geladen",line_solar_part:"davon {percent} PV-Strom",line_energy_parts:"Netz {grid} + PV {solar}",line_exported:"{energy} eingespeist",line_average_price:"\xD8 {price}",line_for_import:"f\xFCr {energy} Netzbezug",line_cost_for:"{cost} f\xFCr {energy}",line_part_of:"{part} von {whole}","value.change":"Summe im Zeitraum","value.mean":"Mittelwert","value.min":"Minimum","value.max":"Maximum",value_range:"von {min} bis {max}","period.energy_date":"Der Datumsauswahl folgen","period.today":"Heute","period.yesterday":"Gestern","period.this_month":"Dieser Monat","period.last_month":"Letzter Monat","period.this_year":"Dieses Jahr","period.last_year":"Letztes Jahr","period.all":"Alle Jahre",editor_title:"Titel (optional)",editor_period:"Zeitraum",editor_period_hint:"Ohne Datumsauswahl auf dem Dashboard: dieser Monat.",editor_period_hint_years:"Ohne Datumsauswahl auf dem Dashboard: alle Jahre.",editor_source:"Quelle","source.energy":"Energiedaten","source.statistic":"Statistik","source.entity":"Entit\xE4t",editor_area:"Bereich",editor_figure:"Gr\xF6\xDFe",editor_statistic:"Statistik",editor_value:"Wert",editor_secondary:"Unterzeile","secondary.none":"Standard","secondary.range":"Spanne im Zeitraum",editor_entity:"Entit\xE4t",editor_name:"Name (optional)",editor_not_loaded:"Energiedaten brauchen die Integration Electricity Lens.","source.solar":"PV-Strom","source.grid":"Netzstrom","source.normal":"Netz normal","source.cheap":"Netz g\xFCnstig","source.expensive":"Netz teuer","source.export":"Einspeisung","source.standing_charge":"Grundpreis","stack.source":"Nach Quelle","stack.bill":"Nach Rechnungsposten","stack.consumer":"Nach Ger\xE4t","stack.none":"Keine",editor_savings:"Ersparnisse aller Kategorien",editor_stack:"Aufteilen",editor_line:"Linie",editor_lines:"Weitere Linien",editor_line_none:"Keine",history_empty_figure:"Keine Daten in diesem Zeitraum.",breakdown_mix:"Strommix",breakdown_cost_by_device:"Kosten nach Ger\xE4t",breakdown_energy_by_device:"Verbrauch nach Ger\xE4t",breakdown_compared:"Vergleich {amount}",breakdown_compare_period:"Vergleichszeitraum",breakdown_total:"Gesamt",breakdown_switch_display:"Diagrammtyp \xE4ndern","mix.solar":"PV","mix.grid":"Netz","mix.normal":"Netz normal","mix.cheap":"Netz g\xFCnstig","mix.expensive":"Netz teuer",editor_by:"Aufteilen","by.source":"Nach Quelle","by.consumer":"Nach Ger\xE4t",editor_display:"Darstellung","display.ring":"Ring","display.bars":"Balken",editor_color_by_source:"Balken nach Quelle f\xE4rben",editor_breakdown_source:"Daten","breakdown_source.energy":"Energiedaten","breakdown_source.statistics":"Statistiken",editor_statistics:"Statistiken","figure_choice.energy":"Verbrauch","figure_choice.cost":"Kosten","strategy.title":"Strom","strategy.overview":"Jetzt","strategy.electricity":"Verbrauch","strategy.forecast_today":"PV-Rest heute","strategy.forecast_tomorrow":"PV-Prognose morgen","strategy.cost_today":"Kosten heute","strategy.consumption_today":"Verbrauch heute","strategy.payback_pv":"PV-Amortisation","strategy.payback_heat_pump":"WP-Amortisation","strategy.payback_wallbox":"Auto-Amortisation","strategy.return_pv":"PV-Rendite","strategy.return_heat_pump":"WP-Rendite","strategy.return_wallbox":"Auto-Rendite","strategy.charged_energy":"Geladene Energie","strategy.charging_cost":"Ladekosten","strategy.bill":"Stromrechnung","strategy.cost_with_solar":"Stromkosten inkl. PV","strategy.cost_history":"Kostenverlauf","strategy.price_with_solar":"\xD8 Preis inkl. PV","strategy.costs":"Kosten","strategy.heating":"Heizen","strategy.charging":"Laden","strategy.usage_graph":"Verbrauch nach Quelle","strategy.solar_graph":"PV-Erzeugung","strategy.devices_graph":"Verbrauchsverlauf","strategy.distribution":"Stromfluss","strategy.not_loaded":"Richte die Integration Electricity Lens ein, um dieses Dashboard zu sehen."},r3={en:O2,de:M3},K=M=>M in O2;function _(M){let V=r3[M.split("-")[0]]??O2;return(C,H={})=>V[C].replace(/\{(\w+)\}/g,(L,e)=>H[e]??"")}var B=f`
  :host {
    --electricity-lens-pv-color: var(--energy-solar-color, #ff9800);
    --electricity-lens-heat-pump-color: var(--graph-color-30, var(--color-30, #bf3947));
    --electricity-lens-wallbox-color: var(--energy-non-fossil-color, #0f9d58);
  }
  ha-card {
    height: 100%;
    overflow: hidden;
  }
  /* The header of Home Assistant's energy cards. */
  .header {
    display: flex;
    align-items: flex-start;
    gap: var(--ha-space-2, 8px);
    padding: var(--ha-space-3, 12px) var(--ha-space-4, 16px) 0;
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
  /* The total, as hui-energy-graph-chip. */
  .chip {
    font-size: var(--ha-font-size-m, 14px);
    font-weight: var(--ha-font-weight-medium, 500);
    line-height: var(--ha-line-height-normal, 20px);
    padding: var(--ha-space-1, 4px) var(--ha-space-2, 8px);
    border-radius: var(--ha-border-radius-md, 8px);
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
`;var H1=["energy_date","today","yesterday","this_month","last_month","this_year","last_year"];function W(M,V,C){let H=`figure.${V}.${C.kind}`,L=M(K(H)?H:`figure.${V}`);return["device","other","category"].includes(C.kind)?`${C.name} ${L}`:L}var t3=300*1e3,y2=M=>M.toDateString();function i3(M){let V=new Date,C=y2(V),H=y2(new Date(V.getFullYear(),V.getMonth(),V.getDate()+1)),L={today:null,tomorrow:null};for(let e of Object.values(M??{}))for(let[r,i]of Object.entries(e.wh_hours??{})){let t=y2(new Date(r));t===C&&(L.today=(L.today??0)+i/1e3),t===H&&(L.tomorrow=(L.tomorrow??0)+i/1e3)}return L}var Z1=class extends N{constructor(){super(...arguments);this._infoLoading=!1}static getStubConfig(){return{period:"energy_date",area:"household",figure:"cost"}}static getConfigElement(){return document.createElement("electricity-lens-figures-card-editor")}setConfig(C){D(C?.collection_key),this._config=C}getCardSize(){return 2}getGridOptions(){return{columns:6,min_columns:6}}connectedCallback(){super.connectedCallback(),this._follow()}disconnectedCallback(){super.disconnectedCallback(),this._unfollow?.(),this._unfollow=void 0,clearTimeout(this._retryTimer),this._retryTimer=void 0}_watched(){return[this._config?.entity,this._config?.statistic].filter(C=>C!==void 0)}get _localize(){return _(this.hass?.locale?.language??this.hass?.language??"en")}get _language(){return this.hass?.locale?.language??"en"}get _period(){return this._config?.period??"energy_date"}get _hasPeriod(){let{figure:C}=this._config??{};return!!this._config&&E(this._config)!=="entity"&&!(C&&(o1(C)||A1(C)))}_follow(){this._period!=="energy_date"||!this._hasPeriod||this._unfollow||!this.isConnected||!this.hass?.connection||(this._unfollow=l1(this.hass.connection,this._config?.collection_key,C=>{this._selected=C}))}_range(){let C=this._period;if(!this._hasPeriod)return $("today");if(C!=="energy_date")return $(C);if(this._selected!==void 0)return this._selected??$("this_month")}_area(C){return this._info?.areas.find(H=>H.id===C)}_figure(C){let H=this._area(C.area);if(!(!H||!C.figure||!j(H).includes(C.figure)))return{area:H,figure:C.figure}}async _loadInfo(){!this.hass||this._infoLoading||(this._infoLoading=!0,this._info=await C1(this.hass),this._infoLoading=!1,clearTimeout(this._retryTimer),this._retryTimer=void 0,this.isConnected&&(!this._info||this._info.calculating)&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),I)))}_request(){let C=this._range(),H=this._config;if(!C||!H)return;let L=E(H);if(L==="entity"||H.figure&&A1(H.figure)||L==="energy"&&!this._info)return;let e=new Set,r=new Set,i=!1;if(L==="statistic"&&H.statistic)e.add(H.statistic),r.add(H.statistic);else if(L==="energy"){let a=this._figure(H);a&&(i=o1(a.figure),this._info?.calculating||l5(a.area,a.figure).forEach(n=>e.add(n)))}let t=[...e].sort();return{key:JSON.stringify([t,C.start,C.end,i]),range:C,ids:t,statistics:[...r].sort(),forecast:i}}async _load(C){if(!this.hass)return;this._loading=C.key;let H=x1(Y(C.range)),L={key:C.key,at:Date.now(),range:C.range,period:H,rows:{},metadata:{},forecast:{today:null,tomorrow:null},failed:!1};try{let[e,r,i]=await Promise.all([C.ids.length?this.hass.callWS({type:"recorder/statistics_during_period",start_time:new Date(C.range.start).toISOString(),end_time:new Date(C.range.end+1).toISOString(),statistic_ids:C.ids,period:H,types:C.statistics.length?["change","mean","min","max"]:["change"],units:{energy:"kWh"}}):Promise.resolve({}),C.statistics.length?this.hass.callWS({type:"recorder/get_statistics_metadata",statistic_ids:C.statistics}):Promise.resolve([]),C.forecast?this.hass.callWS({type:"energy/solar_forecast"}):Promise.resolve({})]);L.rows=e,L.metadata=Object.fromEntries(r.map(t=>[t.statistic_id,t])),L.forecast=i3(i)}catch{L.failed=!0}this._loading===C.key&&(this._loading=void 0,this._loaded=L)}willUpdate(C){if(!this.hass)return;(C.has("hass")||C.has("_config"))&&this._follow(),this._info===void 0&&(this._info=J()),Q()&&!this._infoLoading?this._loadInfo():this.isConnected&&this._info?.calculating&&!this._retryTimer&&!this._infoLoading&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),I));let H=this._request(),L=!this._loaded||Date.now()-this._loaded.at>t3;H&&H.key!==this._loading&&(H.key!==this._loaded?.key||L&&!this._loading)&&this._load(H)}get _fmt(){return s1(this.hass?.locale,this.hass?.config.currency??"EUR")}_number(C,H){return this._fmt.number(C,H)}_format(C,H){return this._fmt.value(C,H)}_rows(C){let H=this._loaded;if(!H)return[];let L=H.period==="hour"?0:12*36e5;return(H.rows[C]??[]).filter(e=>{let r=(typeof e.start=="number"?e.start:Date.parse(e.start))+L;return r>=H.range.start&&r<=H.range.end})}_sum(C){let H=0;for(let L of C??[])for(let e of this._rows(L))H+=e.change??0;return H}_energyCard(C){let H=this._localize,L=this._figure(C);if(!L){let o=`figure.${C.figure??""}`,d=C.name??(K(o)?H(o):C.figure??"");return this._info===void 0?this._card(d,"\u2026"):this._card(d,"\u2013",H("figures_unavailable"))}let{area:e,figure:r}=L,i=C.name??W(this._localize,r,e);if(A1(r))return this._investmentCard(i,r,e);if(this._info?.calculating&&!o1(r))return this._card(i,"\u2026",H("calculating"));if(!this._loaded)return this._card(i,"\u2026");if(this._loaded.failed)return this._card(i,"\u2013",H("figures_not_loaded"));let t=r==="forecast_today"?this._loaded.forecast.today:r==="forecast_tomorrow"?this._loaded.forecast.tomorrow:null,a=v1(r,e,o=>e.statistics[o]?this._sum(e.statistics[o]):null,t),n=a.line?H(a.line.key,Object.fromEntries(Object.entries(a.line.values).map(([o,d])=>[o,this._format(d.value,d.unit)]))):void 0;return this._card(i,a.value===null?"\u2013":this._format(a.value,a.unit),C.secondary==="none"?void 0:n)}_statisticCard(C){let H=this._localize,L=C.statistic??"",e=this._loaded?.metadata[L],r=C.name??e?.name??this.hass?.states[L]?.attributes.friendly_name;if(!this._loaded)return this._card(r??"\xA0","\u2026");let i=r??L,t=this._rows(L),a=e?.unit_class==="energy"?"kWh":e?.statistics_unit_of_measurement??"",n=l=>l===null?"\u2013":`${this._number(l)}${a?` ${a}`:""}`,o=l=>t.map(v=>v[l]).filter(v=>typeof v=="number"),d=C.value??"change",A=null;if(d==="change")A=t.length?t.reduce((l,v)=>l+(v.change??0),0):null;else if(d==="mean"){let l=o("mean");A=l.length?l.reduce((v,u)=>v+u,0)/l.length:null}else{let l=o(d);A=l.length?d==="min"?Math.min(...l):Math.max(...l):null}let m=d==="change"?void 0:H(`value.${d}`);if(C.secondary==="range"){let l=o("min"),v=o("max");l.length&&v.length&&(m=H("value_range",{min:n(Math.min(...l)),max:n(Math.max(...v))}))}return this._loaded.failed?this._card(i,"\u2013",H("figures_not_loaded")):this._card(i,n(A),C.secondary==="none"?void 0:m)}_entityCard(C){let H=this._localize,L=this.hass?.states[C.entity??""],e=C.name??L?.attributes.friendly_name??C.entity??"";if(!L)return this._card(e,"\u2013",H("figures_unavailable"));let r=Number(L.state),i=this.hass?.config.currency??"",t=L.attributes.unit_of_measurement?.replace(i,i?this._fmt.currencySymbol():""),a=L.state!==""&&Number.isFinite(r),n=this._fmt.currencySymbol(),o=a?t&&t===n?this._format(r,"money"):`${this._number(r)}${t?` ${t}`:""}`:["unknown","unavailable",""].includes(L.state)?"\u2013":L.state;return this._card(e,o,void 0,C.entity)}_investmentCard(C,H,L){let e=this._localize,r=i2(this.hass).find(o=>E1(o.category)===L.id),i=H==="payback"?r?.payback:r?.annualReturn,t=i?this.hass?.states[i]:void 0,a=Number(t?.state);if(!t||!Number.isFinite(a))return this._card(C,"\u2013",void 0,i);if(H==="payback"){let o=a<100?Math.floor(a):a;return this._card(C,this._format(o,"percent"),this._paybackLine(t.attributes),i)}let n=T(this.hass?.locale,{minimumFractionDigits:1,maximumFractionDigits:1}).format(a);return this._card(C,e("return_value",{rate:n}),this._returnLine(t.attributes),i)}_paybackLine(C){let H=this._localize;if(typeof C.investment!="number")return;let L=this._format(C.investment,"money");if(typeof C.years_left!="number")return H("line_payback",{investment:L});let e=C.years_left,r=Math.max(1,Math.round(e<1?e*12:e)),i=e<1?H(r===1?"months_one":"months_other",{count:String(r)}):H(r===1?"years_one":"years_other",{count:String(r)});return H("line_payback_left",{time:i})}_returnLine(C){let{surplus:H}=C;if(typeof H=="number")return this._localize("line_return",{amount:T(this.hass?.locale,{style:"currency",currency:this.hass?.config.currency??"EUR",maximumFractionDigits:0,signDisplay:"exceptZero"}).format(H)})}_card(C,H,L,e){let[r,i]=m5(H),t=()=>{this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:e},bubbles:!0,composed:!0}))},a=n=>{n.key!=="Enter"&&n.key!==" "||(n.preventDefault(),t())};return p`<ha-card
      lang=${this._language}
      class=${e?"clickable":""}
      role=${e?"button":x}
      tabindex=${e?"0":x}
      @click=${e?t:x}
      @keydown=${e?a:x}
    >
      <div class="header"><h2 class="title" title=${C}>${C}</h2></div>
      <div class="stat">
        <div class="value">
          <span class="number" title=${H}>${r}</span>${i?p`<span class="unit">${i}</span>`:x}
        </div>
        ${L?p`<div class="line" title=${L}>${L}</div>`:x}
      </div>
    </ha-card>`}render(){if(!this.hass||!this._config)return p``;let C=E(this._config);return C==="statistic"?this._statisticCard(this._config):C==="entity"?this._entityCard(this._config):this._energyCard(this._config)}};Z1.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0},_selected:{state:!0},_loaded:{state:!0}},Z1.styles=[B,f`
      /* As the stat cards of the energy dashboards. */
      :host {
        display: block;
      }
      ha-card {
        box-sizing: border-box;
      }
      .clickable {
        cursor: pointer;
      }
      .clickable:focus-visible {
        outline: 2px solid var(--primary-color);
        outline-offset: -2px;
      }
      .title {
        font-size: var(--ha-font-size-l, 16px);
        font-weight: var(--ha-font-weight-medium, 500);
        line-height: var(--ha-line-height-normal, 24px);
        color: var(--secondary-text-color);
      }
      .title,
      .number,
      .line {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .stat {
        display: flex;
        flex-direction: column;
        gap: var(--ha-space-1, 4px);
        /* The line's space stays reserved, so cards with and without one are
           equally tall across rows. */
        min-height: 56px;
        padding: var(--ha-space-2, 8px) var(--ha-space-4, 16px) var(--ha-space-4, 16px);
      }
      .value {
        display: flex;
        align-items: baseline;
        gap: var(--ha-space-1, 4px);
        white-space: nowrap;
        color: var(--primary-text-color);
      }
      .number {
        min-width: 0;
        font-size: var(--ha-font-size-3xl, 28px);
        font-weight: var(--ha-font-weight-medium, 500);
        line-height: 36px;
        letter-spacing: -0.02em;
      }
      .unit {
        flex: none;
        font-size: var(--ha-font-size-l, 16px);
        color: var(--secondary-text-color);
      }
      .line {
        font-size: var(--ha-font-size-s, 12px);
        line-height: 16px;
        color: var(--secondary-text-color);
      }
    `];var a3=["energy","cost","saving","export","heat","distance","alternative_cost"],o3=["price","grid_price","solar_share","cheap_share","expensive_share","self_consumption","scop","heat_price","cost_per_100km"],$1=M=>a3.filter(V=>j(M).includes(V)),_2=M=>o3.filter(V=>j(M).includes(V)||V==="grid_price"&&M.kind==="household");function S1(M,V){let C=[];return V==="energy"&&M.statistics.solar?.length&&C.push("source"),M.kind==="household"&&(V==="energy"||V==="cost")&&C.push("consumer"),M.kind==="household"&&V==="cost"&&C.push("source","bill"),M.kind==="category"&&(M.statistics.energy?.length??0)>1&&(V==="energy"||V==="cost"||(V==="heat"||V==="saving")&&(M.statistics.heat_meters?.length??0)>1)&&C.push("consumer"),C.push("none"),M.kind==="category"&&V==="cost"&&M.statistics.solar_cost?.length&&C.push("source"),C}function h5(M,V){let C=M.statistics[V]??[];return{plus:V==="saving"?[...C,...M.statistics.solar_saving??[]]:C,minus:[]}}function a2(M){let V=new Set(M.areas.find(H=>H.id==="heat_pump")?.statistics.energy??[]),C=M.areas.filter(H=>H.kind==="device"&&H.statistics.heat?.length&&H.statistics.energy?.some(L=>V.has(L)));return C.length>1?C:[]}function A3(M,V,C){let H=M.areas.find(t=>t.kind==="grid")?.statistics??{},L=H.import_cost??[],e=V.statistics.cheap_cost??[],r=V.statistics.expensive_cost??[],i=[{id:"standing_charge",name:{key:"source.standing_charge"},color:C.standing,plus:H.standing_charge??[],minus:[]}];return e.length&&i.push({id:"cheap",name:{key:"source.cheap"},color:C.cheap,plus:e,minus:[]}),i.push({id:"grid",name:{key:e.length||r.length?"source.normal":"source.grid"},color:C.grid,plus:L,minus:[...e,...r],floor:!0}),r.length&&i.push({id:"expensive",name:{key:"source.expensive"},color:C.expensive,plus:r,minus:[]}),i}function n3(M,V,C){let H=t=>V.statistics[t]??[],L=H("cheap_cost"),e=H("expensive_cost"),r=[{id:"solar",name:{key:"source.solar"},color:C.solar,plus:H("solar_cost"),minus:[]}];L.length&&r.push({id:"cheap",name:{key:"source.cheap"},color:C.cheap,plus:L,minus:[]}),r.push({id:"grid",name:{key:L.length||e.length?"source.normal":"source.grid"},color:C.grid,plus:H("cost"),minus:[...H("solar_cost"),...L,...e],floor:!0}),e.length&&r.push({id:"expensive",name:{key:"source.expensive"},color:C.expensive,plus:e,minus:[]});let i=M.areas.find(t=>t.kind==="grid")?.statistics.feed_in??[];return V.kind==="household"&&i.length&&r.push({id:"export",name:{key:"source.export"},color:C.export,plus:i,minus:[],negative:!0}),r}function o2(M,V,C,H,L){let e=t=>V.statistics[t]??[],r=P(M,L);if(H==="bill"&&C==="cost")return A3(M,V,L);if(H==="source"&&C==="cost")return n3(M,V,L);if(H==="source"&&C==="energy"){let t=[{id:"solar",name:{key:"source.solar"},color:L.solar,plus:e("solar"),minus:[]}],a=["cheap","expensive"].filter(o=>e(o).length);e("cheap").length&&t.push({id:"cheap",name:{key:"source.cheap"},color:L.cheap,plus:e("cheap"),minus:[]}),t.push({id:"grid",name:{key:a.length?"source.normal":"source.grid"},color:L.grid,plus:e("energy"),minus:[...e("solar"),...a.flatMap(e)],floor:!0}),e("expensive").length&&t.push({id:"expensive",name:{key:"source.expensive"},color:L.expensive,plus:e("expensive"),minus:[]});let n=M.areas.find(o=>o.kind==="grid")?.statistics.export??[];return V.kind==="household"&&n.length&&t.push({id:"export",name:{key:"source.export"},color:L.export,plus:n,minus:[],negative:!0}),t}if(H==="consumer"){if(V.kind==="category"){let a=new Set(V.statistics.energy??[]);return M.areas.filter(n=>n.kind==="device"&&n.statistics.energy?.some(o=>a.has(o))).map(n=>({id:n.id,name:{text:n.name},color:r.get(n.id)??L.other,...h5(n,C)}))}let t=new Set(M.areas.filter(a=>a.kind==="category").flatMap(a=>a.statistics.energy??[]));return M.areas.filter(a=>a.kind==="category"&&(a.statistics.energy?.length??0)>0||a.kind==="device"&&a.top_level!==!1&&!a.statistics.energy?.some(n=>t.has(n))||a.kind==="other").map(a=>({id:a.id,name:{text:a.name},color:r.get(a.id)??L.other,plus:a.statistics[C]??[],minus:[]}))}let i=C==="export"?L.export:V.kind==="solar"?L.solar:r.get(V.id)??(C==="heat"?L.heat:C==="distance"?L.car:L.grid);return[{id:C,name:{text:V.name},color:i,...h5(V,C)}]}var d3=36e5;async function b2(M,V,C){if(!V.length)return{};let H=x1(Y(C)),L=await M.callWS({type:"recorder/statistics_during_period",start_time:new Date(C.start).toISOString(),end_time:new Date(C.end+1).toISOString(),statistic_ids:V,period:H,types:["change"],units:{energy:"kWh"}}),e=H==="hour"?0:12*d3,r={};for(let i of V){r[i]=0;for(let t of L[i]??[]){let a=(typeof t.start=="number"?t.start:Date.parse(t.start))+e;a>=C.start&&a<=C.end&&(r[i]+=t.change??0)}}return r}var p3=300*1e3,R=(M,V)=>(V??[]).reduce((C,H)=>C+(M[H]??0),0),z=class extends N{constructor(){super(...arguments);this._infoLoading=!1}_period(){return"energy_date"}_showsCompare(){return!1}_needsInfo(){return!0}_described(){return[]}getCardSize(){return 4}getGridOptions(){return{columns:12,min_columns:6}}connectedCallback(){super.connectedCallback(),this._follow()}disconnectedCallback(){super.disconnectedCallback(),this._unfollow?.(),this._unfollow=void 0,clearTimeout(this._retryTimer),this._retryTimer=void 0}get _localize(){return _(this.hass?.locale?.language??this.hass?.language??"en")}get _fmt(){return s1(this.hass?.locale,this.hass?.config.currency??"EUR")}_follow(){this._period()==="energy_date"&&(this._unfollow||!this.isConnected||!this.hass?.connection||(this._unfollow=l1(this.hass.connection,this._collectionKey,(C,H)=>{this._selected=C,this._compare=H})))}_range(){let C=this._period();if(C!=="energy_date")return $(C);if(this._selected!==void 0)return this._selected??$("this_month")}async _loadInfo(){!this.hass||this._infoLoading||(this._infoLoading=!0,this._info=await C1(this.hass),this._infoLoading=!1,clearTimeout(this._retryTimer),this._retryTimer=void 0,this.isConnected&&(!this._info||this._info.calculating)&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),I)))}async _load(C,H,L,e,r){if(!this.hass)return;let i=this.hass;this._loading=C;let t={key:C,at:0,values:null,metadata:{}};try{let[a,n,o]=await Promise.all([b2(i,H,L),e?b2(i,H,e):Promise.resolve(void 0),r.length?i.callWS({type:"recorder/get_statistics_metadata",statistic_ids:r}):Promise.resolve([])]);t.values=a,t.compare=n,t.metadata=Object.fromEntries(o.map(d=>[d.statistic_id,d]))}catch{}this._loading===C&&(this._loading=void 0,this._sums={...t,at:Date.now()})}willUpdate(C){if(!this.hass||(this._follow(),this._info===void 0&&(this._info=J()),Q()&&!this._infoLoading&&this._loadInfo(),this._needsInfo()&&(this.isConnected&&this._info?.calculating&&!this._retryTimer&&!this._infoLoading&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),I)),!this._info||this._info.calculating)))return;let H=this._range();if(!H)return;let L=this._showsCompare()&&this._period()==="energy_date"?this._compare:void 0,e=[...new Set(this._ids())].sort();if(!e.length)return;let r=[...new Set(this._described())].sort(),i=JSON.stringify([e,H.start,H.end,L?.start,L?.end,r]),t=!this._sums||Date.now()-this._sums.at>p3;i!==this._loading&&(i!==this._sums?.key||t&&!this._loading)&&this._load(i,e,H,L,r)}_waiting(){if(!this.hass)return;let C=F(this.hass);return C.length?C.some(H=>H.calculating)||this._info?.calculating?"calculating":this._info===null?"editor_not_loaded":this._info===void 0?"loading":this._ids().length?this._sums?this._sums.values?void 0:"history_failed":"loading":"figures_unavailable":c1(this.hass)}};z.properties={hass:{attribute:!1},_info:{state:!0},_selected:{state:!0},_compare:{state:!0},_sums:{state:!0}};var A2=f`
  .note {
    margin: 0;
    padding: var(--ha-space-1, 4px) var(--ha-space-4, 16px) 0;
    font-size: var(--ha-font-size-s, 12px);
    line-height: 16px;
    color: var(--secondary-text-color);
  }
  table {
    width: 100%;
    margin-top: 8px;
    border-collapse: collapse;
    font-variant-numeric: tabular-nums;
    color: var(--primary-text-color);
  }
  th,
  td {
    padding: 12px 8px;
    text-align: end;
    white-space: nowrap;
    border-bottom: 1px solid var(--divider-color);
  }
  th:first-child,
  td:first-child {
    padding-inline-start: 16px;
  }
  th:last-child,
  td:last-child {
    padding-inline-end: 16px;
  }
  thead th {
    padding-block: 8px;
    font-size: var(--ha-font-size-s, 12px);
    font-weight: var(--ha-font-weight-medium, 500);
    color: var(--secondary-text-color);
  }
  .name {
    width: 100%;
    text-align: start;
    white-space: normal;
  }
  .swatch-cell {
    width: 32px;
    line-height: 0;
  }
  .swatch {
    display: inline-block;
    width: 32px;
    height: 16px;
    border-radius: 4px;
    border: 1px solid var(--color);
    background: color-mix(in srgb, var(--color) 50%, transparent);
    box-sizing: border-box;
  }
  tfoot th,
  tfoot td {
    border-bottom: none;
    font-weight: var(--ha-font-weight-medium, 500);
  }
  tbody tr:last-child th,
  tbody tr:last-child td {
    border-bottom: none;
  }
  tfoot tr:first-child th,
  tfoot tr:first-child td {
    border-top: 1px solid var(--divider-color);
  }
  .quiet th,
  .quiet td {
    padding-block-start: 0;
    font-size: var(--ha-font-size-s, 12px);
    font-weight: var(--ha-font-weight-normal, 400);
    color: var(--secondary-text-color);
  }
`;var m3="240px",l3="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z",s3="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z",g5="electricity-lens-breakdown-display",h1=class extends z{constructor(){super(...arguments);this._config={type:""};this._watchingChart=!1;this._hidden=new Set;this._chosen=v3()}static getStubConfig(){return{area:"household",by:"source",figure:"energy",display:"ring"}}static getConfigElement(){return document.createElement("electricity-lens-breakdown-card-editor")}setConfig(C){if(C?.statistics!==void 0&&!Array.isArray(C.statistics))throw new Error("statistics must be a list");D(C?.collection_key),this._config=C??{type:""},this._collectionKey=this._config.collection_key}getGridOptions(){return{columns:6,min_columns:4}}get _byStatistics(){return!!this._config.statistics?.length}_period(){return this._config.period??"energy_date"}_showsCompare(){return!0}_needsInfo(){return!this._byStatistics}_described(){return this._byStatistics?(this._config.statistics??[]).map(C=>C.statistic):[]}_area(){return this._info?.areas.find(C=>C.id===(this._config.area??"household"))}get _by(){let C=this._area();return this._config.by==="consumer"&&(C?.kind==="household"||C?.kind==="category"&&(C.statistics.energy?.length??0)>1)?"consumer":C?.statistics.solar?.length?"source":"consumer"}get _figure(){return this._by==="consumer"&&this._config.figure==="cost"?"cost":"energy"}_series(){let C=this._info,H=this._area();return!C||!H?[]:o2(C,H,this._figure,this._by==="source"?"source":"consumer",w(this)).filter(L=>!L.negative)}_ids(){let C=new Set;if(this._byStatistics)this._config.statistics?.forEach(H=>C.add(H.statistic));else{for(let H of this._series())[...H.plus,...H.minus].forEach(L=>C.add(L));if(this._by==="consumer"&&this._info)for(let H of this._series()){let L=this._info.areas.find(e=>e.id===H.id);for(let e of["energy","solar","cheap","expensive","cost","solar_cost","cheap_cost","expensive_cost"])(L?.statistics[e]??[]).forEach(r=>C.add(r))}}return[...C].sort()}willUpdate(){super.willUpdate(),this.hass&&!this._watchingChart&&(this._watchingChart=!0,r2(C=>{this._hasChart=C}))}_sum(C,H=!1){let L=(H?this._sums?.compare:this._sums?.values)??{};return C.reduce((e,r)=>e+(L[r]??0),0)}get _compared(){return this._sums?.compare!==void 0}_entityOf(C){return C?.length===1&&this.hass?.states[C[0]]?C[0]:void 0}get _unit(){return this._byStatistics?(this._config.statistics??[]).map(H=>{let L=this._sums?.metadata[H.statistic];return L?.unit_class==="energy"?"kWh":L?.statistics_unit_of_measurement??""})[0]:void 0}_parts(){let C=this._localize;if(this._byStatistics){let L=w(this),e=this._info?P(this._info,L):new Map;return(this._config.statistics??[]).map((r,i)=>{let t=this._info?.areas.find(a=>a.kind==="device"&&(a.statistics.energy?.[0]===r.statistic||a.statistics.heat?.[0]===r.statistic));return{id:r.statistic,name:r.name??t?.name??(this._sums?.metadata[r.statistic]?.name||this.hass?.states[r.statistic]?.attributes.friendly_name||r.statistic),color:(t&&e.get(t.id))??L.consumers[i%L.consumers.length],value:this._sum([r.statistic]),compare:this._compared?this._sum([r.statistic],!0):void 0,entity:this._entityOf([r.statistic])}})}let H=this._series().map(L=>{let e=this._sum(L.plus)-this._sum(L.minus),r=this._sum(L.plus,!0)-this._sum(L.minus,!0),i=L.name.key?.replace(/^source\./,"mix."),t=L.name.text??(i&&K(i)?C(i):L.name.key&&K(L.name.key)?C(L.name.key):L.id),a=o=>L.floor?Math.max(o,0):o,n={id:L.id,name:t,color:L.color,value:a(e),compare:this._compared?a(r):void 0};if(this._by==="consumer"&&this._info){let o=this._info.areas.find(d=>d.id===L.id);o&&(n.entity=this._entityOf(o.statistics.energy),n.energy=this._sum(o.statistics.energy??[]),n.mix=this._mix(o),this._compared&&(n.compareMix=this._mix(o,!0))),n.other=o?.kind==="other"}return n});return this._by==="consumer"?H.sort((L,e)=>Number(L.other??!1)-Number(e.other??!1)||e.value-L.value):H}_mix(C,H=!1){let L=w(this),e=n=>this._sum(C.statistics[n]??[],H),r=this._figure==="cost",i=e(r?"solar_cost":"solar"),t=e(r?"cheap_cost":"cheap"),a=e(r?"expensive_cost":"expensive");return[{source:"solar",color:L.solar,value:i},{source:"cheap",color:L.cheap,value:t},{source:"grid",color:L.grid,value:Math.max(e(r?"cost":"energy")-i-t-a,0)},{source:"expensive",color:L.expensive,value:a}]}_sourceName(C){let H=this._localize;if(C!=="grid")return H(`source.${C}`);let L=this._info?.levels;return H(L?.cheap_until!=null||L?.expensive_from!=null?"source.normal":"source.grid")}_value(C){let H=this._unit;return H!==void 0&&H!=="kWh"?H?`${this._fmt.number(C)} ${H}`:this._fmt.number(C):this._figure==="cost"&&!this._byStatistics?this._fmt.value(C,"money"):this._fmt.value(C,"energy")}_open(C){C&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:C},bubbles:!0,composed:!0}))}_title(){let C=this._localize;return this._config.title?this._config.title:this._byStatistics?"":(this._area()?this._by:this._config.by??"source")==="source"?C("breakdown_mix"):C(this._figure==="cost"?"breakdown_cost_by_device":"breakdown_energy_by_device")}_ring(C){let H=this._localize;if(this._hasChart===void 0)return p`<p class="summary">${H("loading")}</p>`;if(!this._hasChart)return p`<p class="summary">${H("history_no_chart")}</p>`;let L=this._figure==="cost"&&!this._byStatistics,e=w(this).line,r=getComputedStyle(this).getPropertyValue("--primary-text-color").trim()||"#212121",i=JSON.stringify([C,[...this._hidden],L,e,r,this.hass?.locale]);this._ringChart?.key!==i&&(this._ringChart={key:i,chart:A5({items:C,total:H("breakdown_total"),format:o=>this._value(o),percent:o=>this._fmt.value(o,"percent"),compare:this._compared?C.map(o=>o.compare??0):void 0,compared:H("breakdown_compare_period"),centerColor:e,labelColor:r,hidden:this._hidden})});let{chart:t}=this._ringChart,a=M2(C.map(o=>this._hidden.has(o.id)?0:o.value)),n=o=>{let d=new Set(this._hidden);d.has(o)?d.delete(o):d.add(o),this._hidden=d};return p`<div class="ring">
      ${L5(`${L}-${this._compared}`,p`<ha-chart-base
          .hass=${this.hass}
          .data=${t.data}
          .options=${t.options}
          .height=${m3}
        ></ha-chart-base>`)}
      <div class="chart-legend">
        <ul>
          ${C.map((o,d)=>{let A=this._hidden.has(o.id),m=this._fmt.value(a[d],"percent");return p`<li class=${A?"hidden":""}>
              <button
                type="button"
                class="leg"
                aria-pressed=${String(!A)}
                aria-label="${o.name}: ${m}"
                @click=${()=>n(o.id)}
              >
                <svg class="icon" viewBox="0 0 24 24" style="color: ${A?"var(--secondary-text-color)":o.color}">
                  <path fill="currentColor" d=${A?s3:l3}></path>
                </svg>
                <span class="label">${o.name}</span>
                <span class="value">${m}</span>
              </button>
            </li>`})}
        </ul>
      </div>
    </div>`}_bars(C,H){let L=this._value(0),e=C.filter(A=>this._value(A.value)!==L||A.compare!==void 0&&this._value(A.compare)!==L),r=Math.max(...e.map(A=>Math.max(A.value,A.compare??0)),0),i=A=>r>0?Math.max(A/r*100,0):0,t=this._config.color_by_source===!0&&this._by==="consumer",a=this._localize,n=this._compared,o=(A,m,l,v)=>{let u=l?.reduce((c,h)=>c+h.value,0)??0,s=t&&l&&u>0?l.filter(c=>c.value>0):[];return p`<div class="track ${v?"compare":""}">
        <div class="fill" style="width: ${i(A)}%; ${s.length?"":`--c: ${m}`}">
          ${s.map(c=>p`<span
              title="${this._sourceName(c.source)}: ${this._value(c.value)}"
              style="width: ${c.value/u*100}%; --c: ${c.color}"
            ></span>`)}
        </div>
      </div>`},d=C.reduce((A,m)=>A+Math.max(m.compare??0,0),0);return p`<div class="bars ${n?"compared":""}">
      ${e.map(A=>{let m="";if(this._figure==="cost"&&A.energy!==void 0&&(m=this._fmt.value(A.energy,"energy"),A.energy>0&&(m+=` \xB7 ${a("line_average_price",{price:this._fmt.value(A.value/A.energy,"price")})}`)),A.compare!==void 0){let v=a("breakdown_compared",{amount:this._value(A.compare)});m=m?`${m} \xB7 ${v}`:v}let l=A.entity?{role:"button",tabindex:"0",click:()=>this._open(A.entity),key:v=>{v.key!=="Enter"&&v.key!==" "||(v.preventDefault(),this._open(A.entity))}}:void 0;return p`<div
          class="bar-row ${l?"clickable":""}"
          role=${l?.role??x}
          tabindex=${l?.tabindex??x}
          @click=${l?.click}
          @keydown=${l?.key}
        >
          <div class="bar-text">
            <span class="name">${A.name}</span>
            <span class="amount">${this._value(A.value)}</span>
          </div>
          ${m?p`<div class="bar-line">${m}</div>`:x}
          ${o(A.value,A.color,A.mix,!1)}
          ${A.compare!==void 0?o(A.compare,A.color,A.compareMix,!0):x}
        </div>`})}
      <div class="total">
        <div class="bar-text">
          <span class="name">${a("breakdown_total")}</span>
          <span class="amount">${this._value(H)}</span>
        </div>
        ${n?p`<div class="bar-line">${a("breakdown_compared",{amount:this._value(d)})}</div>`:x}
      </div>
      ${t?p`<div class="key">
            ${["solar","cheap","grid","expensive"].filter(A=>(A!=="cheap"||this._info?.levels.cheap_until!=null)&&(A!=="expensive"||this._info?.levels.expensive_from!=null)).map(A=>p`<span><span class="dot" style="--c: ${a1[A]}"></span>${this._sourceName(A)}</span>`)}
          </div>`:x}
    </div>`}get _switchable(){return this._byStatistics||this._area()!==void 0&&this._by==="consumer"}get _display(){return this._switchable&&this._chosen?this._chosen:this._config.display??(!this._byStatistics&&this._by==="consumer"?"bars":"ring")}_switch(){this._chosen=this._display==="ring"?"bars":"ring";try{localStorage.setItem(g5,JSON.stringify(this._chosen))}catch{}}render(){if(!this.hass)return p``;let C=this._localize,H=this._sums?.values?this._parts():[],L=H.reduce((a,n)=>a+Math.max(n.value,0),0),e=!this._byStatistics&&this._info?.calculating===!0,r=!this._byStatistics&&this._info!==void 0&&!this._area(),i=this._display,t;return e?t=p`<p class="summary">${C("calculating")}</p>`:r?t=p`<p class="summary">${C(this._info===null?"editor_not_loaded":"figures_unavailable")}</p>`:this._sums&&!this._sums.values?t=p`<p class="summary">${C("figures_failed")}</p>`:this._sums?L<=0?t=p`<p class="summary">${C("history_empty_figure")}</p>`:t=i==="bars"?this._bars(H,L):this._ring(H):t=p`<p class="summary">${C("loading")}</p>`,p`<ha-card>
      <div class="header">
        <h2 class="title">${this._title()}</h2>
        ${this._switchable?p`<ha-icon-button
              .path=${i==="ring"?J2:C5}
              .label=${C("breakdown_switch_display")}
              @click=${()=>this._switch()}
            ></ha-icon-button>`:x}
      </div>
      ${t}
    </ha-card>`}};h1.properties={...z.properties,_config:{state:!0},_hasChart:{state:!0},_hidden:{state:!0},_chosen:{state:!0}},h1.styles=[B,f`
      .header {
        min-height: 32px;
        align-items: center;
      }
      /* HA's devices graph turns the icon so its bars lie as the card's. */
      .header ha-icon-button {
        margin: -8px -12px -8px 0;
        transform: rotate(90deg);
        color: var(--secondary-text-color);
      }
      /* The ring with HA's chart legend centered below it, as in the
         share cards of the energy cards. */
      .ring {
        padding: 0 var(--ha-space-4, 16px) var(--ha-space-4, 16px);
      }
      .chart-legend {
        font-size: var(--ha-font-size-s, 12px);
        color: var(--primary-text-color);
        padding: 8px 0 0;
      }
      .chart-legend ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: var(--ha-space-2, 8px) var(--ha-space-3, 12px);
        margin: 0;
        padding: 0;
        list-style: none;
      }
      .chart-legend li {
        display: inline-flex;
        align-items: center;
        box-sizing: border-box;
      }
      .chart-legend li.hidden {
        color: var(--secondary-text-color);
      }
      .chart-legend button.leg {
        display: inline-flex;
        align-items: center;
        padding: 0 2px;
        border: none;
        background: none;
        cursor: pointer;
        font: inherit;
        color: inherit;
        border-radius: var(--ha-border-radius-sm, 4px);
      }
      .chart-legend button.leg:focus-visible {
        outline: 2px solid var(--ha-color-focus, var(--primary-color));
        outline-offset: 2px;
      }
      .chart-legend .icon {
        width: 18px;
        height: 18px;
        flex: none;
        margin-inline-end: var(--ha-space-1, 4px);
        transition: opacity 0.15s ease;
      }
      @media (hover: hover) {
        .chart-legend button.leg:hover .icon {
          opacity: 0.7;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .chart-legend .icon {
          transition: none;
        }
      }
      .chart-legend .label {
        white-space: nowrap;
        line-height: var(--ha-line-height-condensed, 20px);
      }
      .chart-legend .value {
        color: var(--secondary-text-color);
        white-space: nowrap;
        margin-inline-start: var(--ha-space-1, 4px);
        line-height: 1;
      }
      .dot {
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: var(--ha-border-radius-circle, 50%);
        margin-right: 6px;
        vertical-align: -1px;
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
      /* The bars of HA's devices graph: 20 px, or 10 px each next to the
         compared period, rounded at their end only. */
      .track {
        height: 20px;
        margin-top: 6px;
      }
      .compared .track {
        height: 10px;
      }
      .track.compare {
        margin-top: 2px;
      }
      .fill {
        display: flex;
        height: 100%;
        border-start-end-radius: 4px;
        border-end-end-radius: 4px;
        overflow: hidden;
      }
      .fill span {
        height: 100%;
      }
      .total {
        padding-top: 12px;
        border-top: 1px solid var(--divider-color);
      }
      .total .bar-text {
        font-weight: var(--ha-font-weight-medium, 500);
      }
      .bar-row.clickable {
        cursor: pointer;
        border-radius: var(--ha-border-radius-sm, 4px);
      }
      .bar-row.clickable:focus-visible {
        outline: 2px solid var(--ha-color-focus, var(--primary-color));
        outline-offset: 4px;
      }
      /* HA's energy look: the color at half strength, framed by the full color. */
      .fill,
      .fill span,
      .dot {
        background: color-mix(in srgb, var(--c, transparent) 50%, transparent);
        box-shadow: inset 0 0 0 1px var(--c, transparent);
      }
      /* The compared period: paler, as in HA's energy graphs. */
      .compare .fill,
      .compare .fill span {
        background: color-mix(in srgb, var(--c, transparent) 20%, transparent);
        box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--c, transparent) 50%, transparent);
      }
      .key {
        display: flex;
        flex-wrap: wrap;
        gap: 4px 16px;
        font-size: 12px;
        color: var(--secondary-text-color);
      }
    `];function v3(){try{let M=JSON.parse(localStorage.getItem(g5)??"null");return M==="ring"||M==="bars"?M:void 0}catch{return}}var g1=M=>({select:{mode:"dropdown",options:M}}),k2=M=>M?.kind==="household"||M?.kind==="category"&&(M.statistics.energy?.length??0)>1,x3=M=>k2(M)||!!M.statistics.solar?.length,f1=class extends b{constructor(){super(...arguments);this._requested=!1;this._label=C=>this._localize(`editor_${C.name}`);this._helper=C=>C.name==="period"?this._localize("editor_period_hint"):void 0}setConfig(C){this._config=C}get _localize(){return _(this.hass?.locale?.language??this.hass?.language??"en")}willUpdate(){this.hass&&!this._requested&&(this._requested=!0,this.hass.callWS({type:`${y}/figures`}).then(C=>{this._info=C}).catch(()=>{this._info=null}))}_data(){let C=this._config??{type:""},H=!!C.statistics?.length||C.statistics!==void 0&&!C.area;return{title:C.title??"",period:C.period??"energy_date",source:H?"statistics":"energy",area:C.area??"household",by:C.by??"source",figure:C.figure??"energy",display:C.display??(!H&&C.by==="consumer"?"bars":"ring"),color_by_source:C.color_by_source??!1,statistics:(C.statistics??[]).map(L=>L.statistic)}}_schema(C){let H=this._localize,L=[{name:"title",selector:{text:{}}},{name:"period",selector:g1(H1.map(e=>({value:e,label:H(`period.${e}`)})))},{name:"breakdown_source",selector:g1(["energy","statistics"].map(e=>({value:e,label:H(`breakdown_source.${e}`)})))}];if(C.source==="statistics")L.push({name:"statistics",selector:{statistic:{multiple:!0}}});else{let e=(this._info?.areas??[]).filter(x3),r=e.find(t=>t.id===C.area),i=[...r?.statistics.solar?.length?["source"]:[],...k2(r)?["consumer"]:[]];L.push({name:"area",selector:g1(e.map(t=>({value:t.id,label:t.name})))},{name:"by",selector:g1(i.map(t=>({value:t,label:H(`by.${t}`)})))}),C.by==="consumer"&&L.push({name:"figure",selector:g1(["energy","cost"].map(t=>({value:t,label:H(`figure_choice.${t}`)})))})}return L.push({name:"display",selector:g1(["ring","bars"].map(e=>({value:e,label:H(`display.${e}`)})))}),C.source!=="statistics"&&C.by==="consumer"&&C.display==="bars"&&L.push({name:"color_by_source",selector:{boolean:{}}}),L}_changed(C){if(!this._config)return;let H={...this._data(),...C.detail.value};"breakdown_source"in C.detail.value&&(H.source=C.detail.value.breakdown_source);let{title:L,period:e,area:r,by:i,figure:t,display:a,color_by_source:n,statistics:o,...d}=this._config,A=d;if(typeof H.title=="string"&&H.title&&(A.title=H.title),A.period=H.period??"energy_date",H.source==="statistics"){let m=new Map((this._config.statistics??[]).map(v=>[v.statistic,v])),l=Array.isArray(H.statistics)?H.statistics.filter(Boolean):[];A.statistics=l.map(v=>m.get(v)??{statistic:v})}else{A.area=H.area??"household";let m=this._info?.areas.find(u=>u.id===A.area),l=k2(m),v=!!m?.statistics.solar?.length;A.by=H.by==="consumer"&&l?"consumer":v?"source":"consumer",A.by==="consumer"&&H.figure==="cost"?A.figure="cost":A.figure="energy"}A.display=H.display==="bars"?"bars":"ring",A.by==="consumer"&&A.display==="bars"&&H.color_by_source===!0&&(A.color_by_source=!0),this._config=A,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:A},bubbles:!0,composed:!0}))}render(){if(!this.hass||!this._config)return p``;let C=this._data();return p`<div class="editor">
      ${C.source!=="statistics"&&this._info===null?p`<p class="hint">${this._localize("editor_not_loaded")}</p>`:x}
      <ha-form
        .hass=${this.hass}
        .data=${{...C,breakdown_source:C.source}}
        .schema=${this._schema(C)}
        .computeLabel=${this._label}
        .computeHelper=${this._helper}
        @value-changed=${this._changed}
      ></ha-form>
    </div>`}};f1.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0}},f1.styles=f`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .hint {
      margin: 0;
      color: var(--secondary-text-color);
    }
  `;var O1=class extends N{constructor(){super(...arguments);this._infoLoading=!1}static getStubConfig(){return{}}static getConfigForm(){return{schema:[{name:"title",selector:{text:{}}}]}}setConfig(C){this._config=C}getCardSize(){return 4}getGridOptions(){return{columns:12,min_columns:6}}get _localize(){return _(this.hass?.locale?.language??this.hass?.language??"en")}_money(C,H=!1){return C===void 0?"":C===null?"\u2013":T(this.hass?.locale,{style:"currency",currency:this.hass?.config.currency??"EUR",maximumFractionDigits:0,minimumFractionDigits:0,signDisplay:H?"exceptZero":"auto"}).format(C)}willUpdate(){this.hass&&(this._info===void 0&&(this._info=J()),Q()&&!this._infoLoading&&(this._infoLoading=!0,C1(this.hass).then(C=>{this._info=C,this._infoLoading=!1})))}render(){let C=this._localize;if(!this.hass)return p``;let H=F(this.hass),L=Z5(this.hass),e=p`<div class="header">
      <h2 class="title">${this._config?.title||C("title")}</h2>
    </div>`;if(!H.length||!L)return p`<ha-card>
        ${e}
        <p class="summary">${C(c1(this.hass))}</p>
      </ha-card>`;let r=this._info?P(this._info,w(this)):void 0,i=H.some(a=>a.calculating),t={perYear:H.some(a=>a.perYear!==null),invested:L.invested>0};return p`<ha-card>
      ${e}
      <div class="table">
        <table>
          <thead>
            <tr>
              <th class="bullet-cell"></th>
              <th class="name" scope="col">${C("column_area")}</th>
              ${t.perYear?p`<th class="number per-year" scope="col">${C("column_per_year")}</th>`:x}
              <th class="number" scope="col">${C("column_saving")}</th>
              ${t.invested?p`<th class="number" scope="col">${C("column_investment")}</th>
                    <th class="number" scope="col">${C("column_balance")}</th>`:x}
            </tr>
          </thead>
          <tbody>
            ${H.map(a=>this._row({name:C(`category.${a.category}`),entityId:a.entityId,perYear:a.perYear,saving:a.calculating?null:a.saving,investment:a.investment??void 0,balance:a.balance,category:a.category},t,r))}
            ${this._row({name:C("total"),entityId:L.entityId,perYear:L.perYear,saving:i?null:L.saved,investment:L.invested,balance:L.balance},t)}
          </tbody>
        </table>
      </div>
      ${i?p`<p class="note">${C("calculating")}</p>`:x}
    </ha-card>`}_row(C,H,L){let{name:e,entityId:r,perYear:i,saving:t,investment:a,balance:n,category:o}=C,d=o?L?.get(o):void 0;return p`<tr
      class=${o??"total"}
      style=${d?`--color: ${d}`:""}
      @click=${()=>this._moreInfo(r)}
    >
      <td class="bullet-cell">
        ${o?p`<span class="bullet" aria-hidden="true"></span>`:x}
      </td>
      <th class="name" scope="row" title=${e}>
        <button type="button">${e}</button>
      </th>
      ${H.perYear?p`<td class="number per-year">
            ${i===null?"\u2013":this._localize("average",{amount:this._money(i)})}
          </td>`:x}
      <td class="number">${this._money(t)}</td>
      ${H.invested?p`<td class="number">${this._money(a)}</td>
            <td class="number">${this._money(n,!0)}</td>`:x}
    </tr>`}_moreInfo(C){this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:C},bubbles:!0,composed:!0}))}};O1.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0}},O1.styles=[B,f`
      ha-card {
        container-type: inline-size;
      }
      .pv {
        --color: var(--electricity-lens-pv-color);
      }
      .heat_pump {
        --color: var(--electricity-lens-heat-pump-color);
      }
      .wallbox {
        --color: var(--electricity-lens-wallbox-color);
      }
      /* The table of Home Assistant's totals card. */
      .table {
        overflow-x: auto;
      }
      table {
        width: 100%;
        border-spacing: 0;
        white-space: nowrap;
        font-size: var(--ha-font-size-m, 14px);
        line-height: var(--ha-line-height-normal, 20px);
        color: var(--primary-text-color);
      }
      thead tr {
        height: 56px;
      }
      tbody tr {
        height: 52px;
        cursor: pointer;
      }
      tbody tr:hover {
        background-color: rgba(var(--rgb-primary-text-color), 0.04);
      }
      th,
      td {
        box-sizing: border-box;
        padding: 0 16px;
        border-bottom: 1px solid var(--divider-color);
        font-weight: var(--ha-font-weight-normal, 400);
        text-align: start;
      }
      thead th {
        font-weight: var(--ha-font-weight-medium, 500);
      }
      tbody tr:last-child > * {
        border-bottom: none;
      }
      .total > * {
        font-weight: var(--ha-font-weight-medium, 500);
      }
      .bullet-cell {
        width: 48px;
        padding-inline-end: 0;
      }
      .bullet {
        display: block;
        box-sizing: border-box;
        width: 32px;
        height: 16px;
        border-radius: var(--ha-border-radius-sm, 4px);
        border: 1px solid var(--color);
        background: color-mix(in srgb, var(--color) 50%, transparent);
      }
      .name {
        max-width: 0;
        min-width: 80px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      /* Reaches the row by keyboard and for screen readers; the row takes the click. */
      button {
        all: unset;
        cursor: pointer;
      }
      button:focus-visible {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
      }
      .number {
        width: 1%;
        text-align: end;
        font-variant-numeric: tabular-nums;
      }
      .note {
        margin: 0;
        padding: 0 16px 12px;
        font-size: var(--ha-font-size-s, 12px);
        line-height: 16px;
        color: var(--secondary-text-color);
      }
      /* A phone, or half a column: the names need the room of the yearly figure and the bullets. */
      @container (max-width: 480px) {
        .per-year,
        .bullet-cell {
          display: none;
        }
        th.number,
        td.number {
          padding: 0 8px;
        }
        th.number:last-child,
        td.number:last-child {
          padding-inline-end: 16px;
        }
        .name {
          padding-inline-end: 8px;
        }
      }
    `];var I1=class extends z{static getStubConfig(){return{}}static getConfigForm(){return{schema:[]}}setConfig(V){D(V?.collection_key),this._collectionKey=V?.collection_key}get _devices(){return this._info?a2(this._info).sort((V,C)=>V.name.localeCompare(C.name,this.hass?.locale?.language)):[]}_ids(){return this._devices.flatMap(V=>[...V.statistics.heat??[],...V.statistics.energy??[]])}render(){let V=this._localize;if(!this.hass)return p``;let C=this._waiting(),H=this._devices,L=H.length?H.map(e=>e.name).join(" & "):V("figure.heat");return p`<ha-card>
      <div class="header"><h2 class="title">${L}</h2></div>
      ${C?p`<p class="summary">${V(C)}</p>`:this._table()}
    </ha-card>`}_table(){let V=this._localize,C=this._fmt,H=this._sums?.values??{},L=P(this._info,w(this));return p`<table>
      <thead>
        <tr>
          <th scope="col" colspan="2" class="name">${V("meters_consumer")}</th>
          <th scope="col">${V("figure.heat")}</th>
          <th scope="col">${V("meters_electricity")}</th>
          <th scope="col">${V("figure.scop")}</th>
        </tr>
      </thead>
      <tbody>
        ${this._devices.map(e=>{let r=R(H,e.statistics.heat),i=R(H,e.statistics.energy);return p`<tr>
            <td class="swatch-cell">
              <span class="swatch" style="--color: ${L.get(e.id)??""}" aria-hidden="true"></span>
            </td>
            <td class="name">${e.name}</td>
            <td>${C.value(r,"energy")}</td>
            <td>${C.value(i,"energy")}</td>
            <td>${i>0?C.number(r/i,2):"\u2013"}</td>
          </tr>`})}
      </tbody>
    </table>`}};I1.styles=[B,A2];var u3=300*1e3,c3="200px",Z3={energy:"energy",cost:"money",saving:"money",export:"energy",heat:"energy",distance:"distance",alternative_cost:"money"},y1=class extends N{constructor(){super(...arguments);this._config={type:""};this._infoLoading=!1;this._watchingChart=!1}static getStubConfig(){return{}}static getConfigElement(){return document.createElement("electricity-lens-history-card-editor")}setConfig(C){D(C?.collection_key),this._config=C??{type:""}}getCardSize(){return 5}getGridOptions(){return{columns:12,min_columns:6}}connectedCallback(){super.connectedCallback(),this._follow()}disconnectedCallback(){super.disconnectedCallback(),this._unfollow?.(),this._unfollow=void 0,clearTimeout(this._retryTimer),this._retryTimer=void 0}get _localize(){return _(this.hass?.locale?.language??this.hass?.language??"en")}get _language(){return this.hass?.locale?.language??"en"}get _fmt(){return s1(this.hass?.locale,this.hass?.config.currency??"EUR")}get _savings(){return!this._config.area}_follow(){(this._config.period??"energy_date")==="energy_date"&&(this._unfollow||!this.isConnected||!this.hass?.connection||(this._unfollow=l1(this.hass.connection,this._config.collection_key,(C,H)=>{this._selected=C,this._compare=H})))}async _loadInfo(){!this.hass||this._infoLoading||(this._infoLoading=!0,this._info=await C1(this.hass),this._infoLoading=!1,clearTimeout(this._retryTimer),this._retryTimer=void 0,this.isConnected&&(!this._info||this._info.calculating)&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),I)))}_range(C){let H=this._config.period??"energy_date";if(H==="all"){let e=new Date(new Date().getFullYear()+1,0,1).getTime()-1;return{range:{start:new Date(x5,0,1).getTime(),end:e},period:"year",fromFirstValue:!0}}if(H!=="energy_date"){let e=$(H);return{range:e,period:Y(e),fromFirstValue:!1}}if(this._selected===void 0)return;if(this._selected)return{range:this._selected,period:Y(this._selected),compare:this._compare,fromFirstValue:!1};let L=C();return{range:L,period:this._savings?"year":Y(L),fromFirstValue:!1}}_savingsPlan(){if(!this.hass)return;let C=this._localize,H=F(this.hass);if(!H.length||H.some(a=>a.calculating))return;let L=this._range(()=>v5(H.map(a=>a.countingSince)));if(!L)return;let e=w(this),r=this._info?P(this._info,e):void 0,i={pv:e.solar,heat_pump:r?.get("heat_pump")??e.heat,wallbox:r?.get("wallbox")??e.car},t=H.map(a=>({series:{id:a.category,name:{},color:i[a.category],plus:[a.savingStatistic],minus:[]},name:C(`category.${a.category}`)}));return this._plan(L,t,"money",void 0,[])}_figurePlan(){let C=this._info,H=this._config;if(!C||C.calculating)return;let L=C.areas.find(A=>A.id===H.area),e=H.figure??"energy";if(!L||!L.statistics[e]?.length)return;let r=this._range(()=>$("this_month"));if(!r)return;let i=this._localize,t=S1(L,e),a=H.stack&&t.includes(H.stack)?H.stack:t[0],n=o2(C,L,e,a,w(this)).map(A=>({series:A,name:A.name.text??(A.name.key&&K(A.name.key)?i(A.name.key):A.id)}));n.length===1&&(n[0].name=W(i,e,L));let o=H.line==="grid_price"?C.areas.find(A=>A.kind==="grid")??L:L,d=H.line&&L.statistics?{figure:H.line,area:o,name:H.line_name??W(i,H.line,o)}:void 0;return this._plan(r,n,Z3[e],d,H.lines??[])}_plan(C,H,L,e,r){let i=new Set;for(let{series:a}of H)[...a.plus,...a.minus].forEach(n=>i.add(n));if(e)for(let a of Object.values(e.area.statistics))(a??[]).forEach(n=>i.add(n));r.forEach(a=>i.add(a.statistic));let t=[...i].sort();return{key:JSON.stringify([t,H.map(a=>[a.series.id,a.series.color]),e?.figure,r,C.range.start,C.range.end,C.period,C.compare?.start,C.compare?.end]),range:C.range,period:C.period,compare:C.compare,fromFirstValue:C.fromFirstValue,bars:H,unit:L,lineFigure:e,lines:r,ids:t}}async _load(C){if(!this.hass)return;this._loading=C.key;let H={key:C.key,at:Date.now(),plan:C,slots:h2(C.range,C.period),rows:{},compareSlots:C.compare?h2(C.compare,C.period):[],compareRows:{},metadata:{},failed:!1},L=this.hass,e=(r,i)=>L.callWS({type:"recorder/statistics_during_period",start_time:new Date(r.start).toISOString(),end_time:new Date(r.end+1).toISOString(),statistic_ids:i,period:x1(C.period),types:["change","mean"],units:{energy:"kWh"}});try{let r=C.lines.map(o=>o.statistic),i=[...new Set(C.bars.flatMap(({series:o})=>[...o.plus,...o.minus]))],[t,a,n]=await Promise.all([e(C.range,C.ids),C.compare?e(C.compare,i):Promise.resolve({}),r.length?this.hass.callWS({type:"recorder/get_statistics_metadata",statistic_ids:r}):Promise.resolve([])]);H.rows=t,H.compareRows=a,H.metadata=Object.fromEntries(n.map(o=>[o.statistic_id,o]))}catch{H.failed=!0}this._loading===C.key&&(this._loading=void 0,this._loaded=H)}willUpdate(C){if(!this.hass)return;(C.has("hass")||C.has("_config"))&&this._follow(),this._watchingChart||(this._watchingChart=!0,r2(e=>{this._hasChart=e})),this._info===void 0&&(this._info=J()),Q()&&!this._infoLoading?this._loadInfo():!this._savings&&this.isConnected&&this._info?.calculating&&!this._retryTimer&&!this._infoLoading&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),I));let H=this._savings?this._savingsPlan():this._figurePlan(),L=!this._loaded||Date.now()-this._loaded.at>u3;H&&H.key!==this._loading&&(H.key!==this._loaded?.key||L&&!this._loading)&&this._load(H),C.has("_loaded")&&(this._chart=this._buildChart())}_perSlot(C,H=!1){let L=this._loaded;if(!L)return[];let e=H?L.compareSlots:L.slots,r=H?L.compareRows:L.rows,i=e.map(()=>null);for(let t of C)g2(r[t],e,L.plan.period).forEach((a,n)=>{a!==null&&(i[n]=(i[n]??0)+a)});return i}_barValues(C,H=!1){let L=this._perSlot(C.plus,H),e=this._perSlot(C.minus,H);return L.map((r,i)=>{if(r===null&&e[i]===null)return null;let t=(r??0)-(e[i]??0),a=C.floor?Math.max(t,0):t;return C.negative?-a:a})}_lines(){let C=this._loaded;if(!C)return[];let{plan:H,slots:L}=C,e=this._fmt,r=w(this),i=this.hass?.config.currency==="EUR"?100:1,t=[];if(H.lineFigure){let{figure:a,area:n,name:o}=H.lineFigure,d=Object.fromEntries(Object.entries(n.statistics).map(([l,v])=>[l,this._perSlot(v??[])])),A=L.map((l,v)=>v1(a,n,s=>d[s]?.[v]??null,null).value),m=v1(a,n,()=>0,null).unit;t.push({id:`line_${a}`,name:o,color:r.line,dash:"dashed",step:m==="price"&&H.period==="hour",values:m==="price"?A.map(l=>l===null?null:l*i):A,format:l=>e.value(m==="price"?l/i:l,m)})}return H.lines.forEach((a,n)=>{let o=C.metadata[a.statistic],d=a.value??(o?.has_sum?"change":"mean"),A=o?.unit_class==="energy"?"kWh":o?.statistics_unit_of_measurement??"",m=d==="mean"?c5(C.rows[a.statistic],L,H.period):g2(C.rows[a.statistic],L,H.period);t.push({id:`statistic_${n}`,name:a.name??o?.name??this.hass?.states[a.statistic]?.attributes.friendly_name??a.statistic,color:n===0&&!H.lineFigure?r.line:r.consumers[n%r.consumers.length],dash:"dotted",values:m,format:l=>`${e.number(l)}${A?` ${A}`:""}`})}),t}_buildChart(){let C=this._loaded;if(!C||C.failed)return;let H=this._localize,L=this._fmt,{plan:e}=C,r=e.bars.map(({series:s,name:c})=>({id:s.id,name:c,color:s.color,values:this._barValues(s),inTotal:!s.negative})),i=this._lines(),t=this._labels(C.slots,e.period),a=e.fromFirstValue?u5([...r,...i].map(s=>s.values),t.length):0,n=s=>s.slice(a);r.forEach(s=>s.values=n(s.values)),i=i.map(s=>({...s,values:n(s.values)})),t=n(t);let o=e.compare?{series:e.bars.map(({series:s,name:c})=>({id:s.id,name:c,color:s.color,values:this._barValues(s,!0),inTotal:!s.negative})),labels:this._labels(C.compareSlots,e.period).map(s=>s.tooltip)}:void 0,d={price:this.hass?.config.currency==="EUR"?"ct/kWh":`${L.currencySymbol()}/kWh`,percent:"%",per_100km:`${L.currencySymbol()}/100 km`},A=e.lineFigure&&!e.lines.length?d[v1(e.lineFigure.figure,e.lineFigure.area,()=>0,null).unit]??"":"",m=o5({labels:t,series:r,compare:o,unit:e.unit==="money"?L.currencySymbol():e.unit==="distance"?"km":"kWh",total:H("history_total"),format:s=>e.unit==="money"?L.value(s,"money"):`${L.number(s,Math.abs(s)<10?2:1)} ${e.unit==="distance"?"km":"kWh"}`,tick:s=>L.number(s),lineTick:s=>L.number(s,Number.isInteger(s)?0:1),lines:i,lineUnit:A}),v=r.filter(s=>s.inTotal!==!1).flatMap(s=>s.values).reduce((s,c)=>s+(c??0),0),u=[...r,...i].some(s=>s.values.some(c=>c));return{...m,total:v,hasData:u}}_labels(C,H){let L=a=>new Intl.DateTimeFormat(this._language,a),e=L({hour:"2-digit",minute:"2-digit",hour12:p5(this.hass?.locale)}),r=C.length>0&&new Date(C[0]).getFullYear()!==new Date(C[C.length-1]).getFullYear(),i={hour:e,day:L({day:"numeric"}),month:L(r?{month:"short",year:"2-digit"}:{month:"short"}),year:L({year:"numeric"})}[H],t={hour:e,day:L({weekday:"short",day:"numeric",month:"short"}),month:L({month:"long",year:"numeric"}),year:L({year:"numeric"})}[H];return C.map(a=>({axis:i.format(a),tooltip:H==="hour"?`${e.format(a)} \u2013 ${e.format(a+36e5)}`:t.format(a)}))}_title(){let C=this._localize;if(this._config.title)return this._config.title;if(this._savings)return C("history_title");let H=this._config.figure??"energy",L=this._info?.areas.find(r=>r.id===this._config.area);if(L)return W(C,H,L);let e=`figure.${H}`;return K(e)?C(e):C("history_title")}render(){let C=this._localize;if(!this.hass)return p``;let H=this._title();if(this._savings&&!F(this.hass).length)return p`<ha-card>
        <div class="header"><h2 class="title">${H}</h2></div>
        <p class="summary">${C(c1(this.hass))}</p>
      </ha-card>`;let L=this._savings?F(this.hass).some(a=>a.calculating):this._info?.calculating===!0,e=L?void 0:this._loaded,r=this._chart?.hasData??!1,i=e?.plan.unit??"money",t=!this._savings&&this._info!==void 0&&!this._info?.areas.some(a=>a.id===this._config.area&&a.statistics[this._config.figure??"energy"]?.length);return p`<ha-card>
      <div class="header">
        <h2 class="title">${H}</h2>
        ${e&&!e.failed&&r&&this._chart?p`<span class="chip">${this._fmt.value(this._chart.total,i)}</span>`:x}
      </div>
      ${L?p`<p class="summary">${C("calculating")}</p>`:t?p`<p class="summary">${C(this._info===null?"editor_not_loaded":"figures_unavailable")}</p>`:this._body(e,r)}
    </ha-card>`}_body(C,H){let L=this._localize;return this._hasChart===!1?p`<p class="summary">${L("history_no_chart")}</p>`:C?.failed?p`<p class="summary">${L("history_failed")}</p>`:p`<div class="chart">
      ${this._chart&&this._hasChart?p`<ha-chart-base
            .hass=${this.hass}
            .data=${this._chart.data}
            .options=${this._chart.options}
          ></ha-chart-base>`:x}
      ${C&&!H?p`<div class="empty">
            ${L(this._savings?"history_empty":"history_empty_figure")}
          </div>`:x}
    </div>`}};y1.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0},_selected:{state:!0},_loaded:{state:!0},_hasChart:{state:!0}},y1.styles=[B,f`
      .chart {
        position: relative;
        min-height: ${q1(c3)};
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
    `];function S3(M,V,C={}){let H=r=>V.areas.find(i=>i.id===r)?.statistics??{},L=V.areas.find(r=>r.kind==="grid")?.statistics??{},e=[];for(let r of M){let i=[r.savingStatistic];if(r.category==="pv"){let t=L.export?.length?L.export:[],a=t.length?L.feed_in??[]:[];e.push({name:"savings_pv",color:a1.solar,plus:i,minus:a,energy:H("solar").self_used??[]}),a.length&&e.push({name:"savings_feed_in",color:a1.export,plus:a,minus:[],energy:t})}else r.category==="heat_pump"?e.push({name:r.heating==="oil"?"savings_oil":"savings_gas",color:C.heat??a1.heat,plus:i,minus:[],energy:H("heat_pump").energy??[]}):e.push({name:"savings_fuel",color:C.car??a1.car,plus:i,minus:[],energy:H("wallbox").energy??[]})}return e}var N1=class extends z{constructor(){super(...arguments);this._config={}}static getStubConfig(){return{}}static getConfigElement(){return document.createElement("electricity-lens-savings-card-editor")}setConfig(C){D(C?.collection_key),this._config=C??{},this._collectionKey=this._config.collection_key,this.requestUpdate()}get _area(){return this._info?.areas.find(C=>C.id===this._config.area)}_rows(){if(!this.hass||!this._info)return[];let C=P(this._info,w(this));return S3(F(this.hass),this._info,{heat:C.get("heat_pump"),car:C.get("wallbox")})}_ids(){if(this._config.area){let C=this._area?.statistics;return C?.alternative_cost?.length&&C.cost?.length&&C.saving?.length?[...C.alternative_cost,...C.cost,...C.saving,...C.solar_saving??[]]:[]}return this._rows().flatMap(C=>[...C.plus,...C.minus,...C.energy])}render(){let C=this._localize;if(!this.hass)return p``;let H=this._waiting();return p`<ha-card>
      <div class="header"><h2 class="title">${C("savings_title")}</h2></div>
      ${H?p`<p class="summary">${C(H)}</p>`:this._config.area?this._reckoning():this._table()}
    </ha-card>`}_reckoning(){let C=this._localize,H=this._fmt,L=this._area,e=this._sums?.values??{},r=R(e,L?.statistics.alternative_cost),i=R(e,L?.statistics.cost),t=R(e,L?.statistics.solar_saving),a=R(e,L?.statistics.saving)+t,n=F(this.hass).find(A=>A.category===L?.id)?.heating,o=L?.id==="wallbox"?"savings_instead_fuel":n==="oil"?"savings_instead_oil":"savings_instead_gas",d=Math.abs(t)>=.005;return p`<table>
        <tbody>
          <tr>
            <td class="name">${C(o)}</td>
            <td>${H.value(r,"money")}</td>
          </tr>
          <tr>
            <td class="name">
              ${L?.id==="wallbox"?C("strategy.charging_cost"):C("savings_electricity",{name:L?.name??""})}
            </td>
            <td>${H.value(-i,"money")}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th scope="row" class="name">${C("savings_title")}</th>
            <td>${H.value(a,"money")}</td>
          </tr>
          ${d?p`<tr class="quiet">
                <th scope="row" class="name">${C("savings_solar_part")}</th>
                <td>${H.value(t,"money")}</td>
              </tr>`:x}
        </tfoot>
      </table>`}_table(){let C=this._localize,H=this._fmt,L=this._rows(),e=this._sums?.values??{},r=t=>R(e,t.plus)-R(e,t.minus),i=L.reduce((t,a)=>t+r(a),0);return p`<table>
        <thead>
          <tr>
            <th scope="col" colspan="2" class="name">${C("savings_source")}</th>
            <th scope="col">${C("savings_energy")}</th>
            <th scope="col">${C("savings_amount")}</th>
          </tr>
        </thead>
        <tbody>
          ${L.map(t=>{let a=R(e,t.energy);return p`<tr>
              <td class="swatch-cell">
                <span class="swatch" style="--color: ${t.color}" aria-hidden="true"></span>
              </td>
              <td class="name">${C(t.name)}</td>
              <!-- Older periods may hold savings, but no energy to go with them. -->
              <td>${a||!r(t)?H.value(a,"energy"):"\u2013"}</td>
              <td>${H.value(r(t),"money")}</td>
            </tr>`})}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row" colspan="2" class="name">${C("savings_total")}</th>
            <td></td>
            <td>${H.value(i,"money")}</td>
          </tr>
        </tfoot>
      </table>`}};N1.styles=[B,A2];var h3=["energy","statistic","entity"],_1=M=>({select:{mode:"dropdown",options:M}}),b1=class extends b{constructor(){super(...arguments);this._requested=!1;this._label=C=>this._localize(`editor_${C.name}`);this._helper=C=>C.name==="period"?this._localize("editor_period_hint"):void 0}setConfig(C){this._config=C}get _localize(){return _(this.hass?.locale?.language??this.hass?.language??"en")}willUpdate(){this.hass&&!this._requested&&(this._requested=!0,this.hass.callWS({type:`${y}/figures`}).then(C=>{this._info=C}).catch(()=>{this._info=null}))}_schema(C){let H=this._localize,L=E(C),e=[{name:"source",selector:_1(h3.map(r=>({value:r,label:H(`source.${r}`)})))}];if(L==="energy"){let r=this._info?.areas??[],i=r.find(t=>t.id===C.area);e.push({name:"area",selector:_1(r.map(t=>({value:t.id,label:t.name})))},{name:"figure",selector:_1(i?j(i).map(t=>({value:t,label:W(H,t,i)})):[])})}else L==="statistic"?(e.push({name:"statistic",selector:{statistic:{}}},{name:"value",selector:_1(s5.map(r=>({value:r,label:H(`value.${r}`)})))}),(C.value??"change")==="mean"&&e.push({name:"secondary",selector:_1(["none","range"].map(r=>({value:r,label:H(`secondary.${r}`)})))})):e.push({name:"entity",selector:{entity:{}}});return e.push({name:"name",selector:{text:{}}}),L!=="entity"&&!(C.figure&&(o1(C.figure)||A1(C.figure)))&&e.push({name:"period",selector:_1(H1.map(r=>({value:r,label:H(`period.${r}`)})))}),e}_figureFrom(C,H){let L=C.source??E(H);if(L!==E(H))return L==="energy"?{area:"household",figure:"cost"}:L==="statistic"?{statistic:"",value:"change"}:{entity:""};if(L==="energy"){let e=C.area??H.area,r=this._info?.areas.find(a=>a.id===e),i=r?j(r):[],t=i.includes(C.figure)?C.figure:i[0];return{area:e,figure:t,...H.secondary==="none"?{secondary:"none"}:{}}}if(L==="statistic"){let e={statistic:C.statistic??"",value:C.value??"change"};return e.value==="mean"&&C.secondary==="range"&&(e.secondary="range"),e}return{entity:C.entity??""}}_changed(C){if(!this._config)return;let H=C.detail.value,{area:L,figure:e,statistic:r,value:i,secondary:t,entity:a,name:n,...o}=this._config,d={...o,period:H.period??"energy_date",...this._figureFrom(H,this._config)};typeof H.name=="string"&&H.name&&(d.name=H.name),this._config=d,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:d},bubbles:!0,composed:!0}))}render(){if(!this.hass||!this._config)return p``;let C=this._config;return p`<div class="editor">
      ${E(C)==="energy"&&this._info===null?p`<p class="hint">${this._localize("editor_not_loaded")}</p>`:x}
      <ha-form
        .hass=${this.hass}
        .data=${{source:E(C),...C,value:C.value??"change",secondary:C.secondary??"none",period:C.period??"energy_date"}}
        .schema=${this._schema(C)}
        .computeLabel=${this._label}
        .computeHelper=${this._helper}
        @value-changed=${this._changed}
      ></ha-form>
    </div>`}};b1.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0}},b1.styles=f`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .hint {
      margin: 0;
      color: var(--secondary-text-color);
    }
  `;var w2="savings",W1=M=>({select:{mode:"dropdown",options:M}}),k1=class extends b{constructor(){super(...arguments);this._requested=!1;this._label=C=>this._localize(`editor_${C.name}`);this._helper=C=>C.name==="period"?this._localize(this._config?.area?"editor_period_hint":"editor_period_hint_years"):void 0}setConfig(C){this._config=C}get _localize(){return _(this.hass?.locale?.language??this.hass?.language??"en")}willUpdate(){this.hass&&!this._requested&&(this._requested=!0,this.hass.callWS({type:`${y}/figures`}).then(C=>{this._info=C}).catch(()=>{this._info=null}))}_schema(){let C=this._localize,H=this._config??{type:""},L=this._info?.areas??[],e=[{name:"title",selector:{text:{}}},{name:"period",selector:W1([...H1,"all"].map(i=>({value:i,label:C(`period.${i}`)})))},{name:"area",selector:W1([{value:w2,label:C("editor_savings")},...L.filter(i=>$1(i).length).map(i=>({value:i.id,label:i.name}))])}],r=L.find(i=>i.id===H.area);if(r){let i=$1(r),t=H.figure&&i.includes(H.figure)?H.figure:i[0];e.push({name:"figure",selector:W1(i.map(a=>({value:a,label:W(C,a,r)})))},{name:"stack",selector:W1(S1(r,t).map(a=>({value:a,label:C(`stack.${a}`)})))},{name:"line",selector:W1([{value:"none",label:C("editor_line_none")},..._2(r).map(a=>({value:a,label:W(C,a,r)}))])},{name:"lines",selector:{statistic:{multiple:!0}}})}return e}_data(){let C=this._config??{type:""},H=this._info?.areas.find(r=>r.id===C.area),L=H?$1(H):[],e=C.figure&&L.includes(C.figure)?C.figure:L[0];return{title:C.title??"",period:C.period??"energy_date",area:C.area??w2,figure:e,stack:C.stack??(H&&e?S1(H,e)[0]:void 0),line:C.line??"none",lines:(C.lines??[]).map(r=>r.statistic)}}_changed(C){if(!this._config)return;let H=C.detail.value,{title:L,period:e,area:r,figure:i,stack:t,line:a,lines:n,...o}=this._config,d=o;typeof H.title=="string"&&H.title&&(d.title=H.title),d.period=H.period??"energy_date";let A=H.area;if(A&&A!==w2){d.area=A;let m=this._info?.areas.find(S=>S.id===A),l=m?$1(m):[],v=l.includes(H.figure)?H.figure:l[0];v&&(d.figure=v),(m&&v?S1(m,v):[]).includes(H.stack)&&(d.stack=H.stack),(m?_2(m):[]).includes(H.line)&&(d.line=H.line);let c=new Map((this._config.lines??[]).map(S=>[S.statistic,S])),Z=(Array.isArray(H.lines)?H.lines:[]).filter(Boolean).map(S=>c.get(S)??{statistic:S});Z.length&&(d.lines=Z)}this._config=d,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:d},bubbles:!0,composed:!0}))}render(){return!this.hass||!this._config?p``:p`<div class="editor">
      ${this._info===null?p`<p class="hint">${this._localize("editor_not_loaded")}</p>`:x}
      <ha-form
        .hass=${this.hass}
        .data=${this._data()}
        .schema=${this._schema()}
        .computeLabel=${this._label}
        .computeHelper=${this._helper}
        @value-changed=${this._changed}
      ></ha-form>
    </div>`}};k1.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0}},k1.styles=f`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .hint {
      margin: 0;
      color: var(--secondary-text-color);
    }
  `;var f5="https://github.com/ignazhabibi/ha-electricity-lens",P2=(M,V)=>{if(!customElements.get(M))try{customElements.define(M,V)}catch{customElements.define(M,class extends V{})}};function O5(M,V=[]){let C=()=>{M.forEach(({tag:i,card:t,editor:a})=>{P2(i,t),a&&P2(a.tag,a.element)}),V.forEach(({type:i,element:t})=>P2(`ll-strategy-dashboard-${i}`,t))};C();let H=window.customElements,L=Date.now(),e=window.setInterval(()=>{let i=window.customElements!==H;i&&C(),(i||Date.now()-L>6e4)&&window.clearInterval(e)},100),r=window;r.customStrategies=r.customStrategies??[];for(let{type:i,name:t,description:a}of V)r.customStrategies.some(n=>n.type===i)||r.customStrategies.push({type:i,strategyType:"dashboard",name:t,description:a,documentationURL:f5});r.customCards=r.customCards??[];for(let{tag:i,name:t,description:a}of M)r.customCards.some(n=>n.type===i)||r.customCards.push({type:i,name:t,description:a,preview:!0,documentationURL:f5})}var B2="all",z1=class extends b{constructor(){super(...arguments);this._label=()=>this._localize("editor_area")}setConfig(C){this._config=C}get _localize(){return _(this.hass?.locale?.language??this.hass?.language??"en")}_changed(C){let{area:H,...L}=this._config??{},e=C.detail.value.area,r=e&&e!==B2?{...L,area:e}:L;this._config=r,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:r},bubbles:!0,composed:!0}))}render(){if(!this.hass||!this._config)return p``;let C=this._localize,H=[{name:"area",selector:{select:{mode:"dropdown",options:[{value:B2,label:C("editor_savings")},{value:"heat_pump",label:C("category.heat_pump")},{value:"wallbox",label:C("category.wallbox")}]}}}];return p`<ha-form
      .hass=${this.hass}
      .data=${{area:this._config.area??B2}}
      .schema=${H}
      .computeLabel=${this._label}
      @value-changed=${this._changed}
    ></ha-form>`}};z1.properties={hass:{attribute:!1},_config:{state:!0}};var O=(M,V={})=>({type:M.startsWith("electricity-lens")?`custom:${M}`:M,...V}),y5={grid_options:{columns:"full"}},w1={grid_options:{columns:6}},q={grid_options:{columns:12}},_5=(M,V,C={},H)=>O("electricity-lens-figures-card",{area:M,figure:V,...H?{name:H}:{},...w1,...C}),U1=(M,V,C,H,L=!0)=>({title:M,path:V,type:"sections",max_columns:3,sections:[{type:"grid",column_span:2,cards:[...L?[O("energy-date-selection",y5)]:[],...C.map(e=>({...y5,...e}))]}],sidebar:{sections:[{type:"grid",cards:H}]}}),g3=70,f3={red:0,yellow:25,green:45};function O3(M){let V=Object.values(M.entities??{}).filter(r=>r.platform===y),C=["pv","heat_pump","wallbox"],L=V.filter(r=>r.translation_key==="saving").map(r=>M.states[r.entity_id]?.attributes.category).filter(r=>C.includes(r)),e=["today","tomorrow"].flatMap(r=>{let i=r==="today"?"forecast_rest_today":"forecast_tomorrow",t=V.find(a=>a.translation_key===i)?.entity_id;return t?[{day:r,entity:t}]:[]});return{categories:L,investments:i2(M),forecasts:e}}function y3(M,V,C={categories:[],investments:[],forecasts:[]}){let H=(Z,S,k={})=>_5(Z,S,k,V(`figure.${S}`)),L=(Z,S,k,g={})=>_5(Z,S,g,V(k)),e=(Z,S,k={})=>O(Z,{title:V(S),...k}),r=Z=>M.areas.find(S=>S.id===Z),i=r("solar"),t=r("heat_pump"),a=r("wallbox"),n=M.areas.some(Z=>Z.kind==="device"),o=!!(i?.statistics.saving?.length||t||a||C.categories.length),d={period:"today"},A={line:"price",...i?{line_name:V("strategy.price_with_solar")}:{}},m=(Z,S={})=>i?L(Z,"price","strategy.price_with_solar",S):H(Z,"price",S),l={secondary:"none"},v=(Z,S={})=>O("electricity-lens-history-card",{area:Z,figure:"energy",stack:"source",...A,...S}),u=Z=>O("electricity-lens-breakdown-card",{area:Z,by:"source",...q}),s=C.investments.flatMap(({category:Z,payback:S,annualReturn:k})=>[O("electricity-lens-figures-card",{area:E1(Z),figure:"payback",name:V(`strategy.payback_${Z}`),visibility:[{condition:"numeric_state",entity:S,below:100}],...w1}),O("electricity-lens-figures-card",{area:E1(Z),figure:"annual_return",name:V(`strategy.return_${Z}`),visibility:[{condition:"numeric_state",entity:k,above:-1}],...w1})]),c=i?.forecast?C.forecasts.map(({entity:Z,day:S})=>O("gauge",{entity:Z,name:V(`strategy.forecast_${S}`),min:0,max:g3,needle:!1,severity:f3,...w1})):[],h=[];return h.push(U1(V("strategy.overview"),"now",[o?O("electricity-lens-balance-card"):v("household",d)],[...c,L("household","cost","strategy.cost_today",d),L("household","energy","strategy.consumption_today",d),...s],!1)),h.push(U1(V("strategy.electricity"),"household",[e("energy-usage-graph","strategy.usage_graph"),...i?[e("energy-solar-graph","strategy.solar_graph")]:[],...n?[O("electricity-lens-history-card",{title:V("strategy.devices_graph"),area:"household",figure:"energy",stack:"consumer"})]:[]],[e("energy-distribution","strategy.distribution",q),u("household"),...i?[O("energy-self-sufficiency-gauge",w1),O("energy-solar-consumed-gauge",w1)]:[]])),h.push(U1(V("strategy.costs"),"costs",[e("electricity-lens-history-card","strategy.bill",{area:"household",figure:"cost",stack:"bill",line:"grid_price"}),...i?[e("electricity-lens-history-card","strategy.cost_with_solar",{area:"household",figure:"cost",stack:"source",...A})]:[],e("electricity-lens-history-card","strategy.cost_history",{area:"household",figure:"cost",stack:"consumer",...i?{}:A})],[H("grid","grid_price",l),m("household",l),O("electricity-lens-breakdown-card",{area:"household",by:"consumer",figure:"cost",display:"bars",color_by_source:!0,...q}),...o?[O("electricity-lens-savings-card",q)]:[]])),t&&h.push(U1(V("strategy.heating"),"heating",[e("electricity-lens-history-card","figure.heat",{area:"heat_pump",figure:"heat",stack:"consumer",line:"scop",line_name:V("figure.scop")}),e("electricity-lens-history-card","strategy.usage_graph",{area:"heat_pump",figure:"energy",stack:"source"}),e("electricity-lens-history-card",i?"strategy.cost_with_solar":"figure.cost",{area:"heat_pump",figure:"cost",stack:"source",...A})],[H("heat_pump","scop",l),H("heat_pump","heat_price",l),u("heat_pump"),...a2(M).length?[O("electricity-lens-heat-meters-card",q)]:[...(t.statistics.energy?.length??0)>1?[O("electricity-lens-breakdown-card",{area:"heat_pump",by:"consumer",figure:"energy",display:"bars",color_by_source:!0,...q})]:[],...(t.statistics.heat_meters?.length??0)>1?[O("electricity-lens-breakdown-card",{title:V("figure.heat"),statistics:(t.statistics.heat_meters??[]).map(Z=>({statistic:Z})),display:"bars",...q})]:[]],O("electricity-lens-savings-card",{area:"heat_pump",...q})])),a&&h.push(U1(V("strategy.charging"),"charging",[e("electricity-lens-history-card","strategy.charged_energy",{area:"wallbox",figure:"energy",stack:"source"}),e("electricity-lens-history-card","strategy.charging_cost",{area:"wallbox",figure:"cost",stack:"source",...A})],[H("wallbox","device_grid_price",l),m("wallbox",l),u("wallbox"),O("electricity-lens-savings-card",{area:"wallbox",...q})])),h}var _3=3e4,b3=1e3;async function k3(M){let V=M.config.state!==void 0&&M.config.state!=="RUNNING",C=Date.now()+_3;for(;;)try{return await M.callWS({type:`${y}/figures`})}catch(H){if(!V||Date.now()>=C)throw H;await new Promise(L=>setTimeout(L,b3))}}var G1=class extends HTMLElement{static async generate(V,C){let H=_(C.locale?.language??C.language??"en"),L;try{L=await k3(C)}catch{return{title:H("strategy.title"),views:[{title:H("strategy.title"),cards:[{type:"markdown",content:H("strategy.not_loaded")}]}]}}return{title:H("strategy.title"),views:y3(L,H,O3(C))}}};G1.noEditor=!0;O5([{tag:"electricity-lens-balance-card",card:O1,name:"Electricity Lens economics",description:"What your PV plant, heat pump, and electric car have saved, against what they cost."},{tag:"electricity-lens-savings-card",card:N1,name:"Electricity Lens savings",description:"What solar power, the heat pump, and the electric car saved in the selected period, as a table, or one area's saving reckoned up. Follows the energy date selection.",editor:{tag:"electricity-lens-savings-card-editor",element:z1}},{tag:"electricity-lens-heat-meters-card",card:I1,name:"Electricity Lens heat meters",description:"Heat, electricity, and seasonal COP of each of the heat pump's meters in the selected period. Follows the energy date selection."},{tag:"electricity-lens-history-card",card:y1,name:"Electricity Lens history",description:"Savings, consumption, or costs per period as bars, stacked by source or consumer, with lines. Follows the energy date selection.",editor:{tag:"electricity-lens-history-card-editor",element:k1}},{tag:"electricity-lens-figures-card",card:Z1,name:"Electricity Lens key figures",description:"One key figure for a period: costs, solar share, cheap grid power, savings, or any statistic or entity.",editor:{tag:"electricity-lens-figures-card-editor",element:b1}},{tag:"electricity-lens-breakdown-card",card:h1,name:"Electricity Lens breakdown",description:"Shares for a period as a ring or bars: the electricity mix, consumption or costs by consumer, or any statistics.",editor:{tag:"electricity-lens-breakdown-card-editor",element:f1}}],[{type:"electricity-lens",element:G1,name:"Electricity Lens",description:"A finished electricity dashboard with costs, electricity mix, solar, heat pump, car, and the balance."}]);
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
lit-html/directive.js:
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

lit-html/directive-helpers.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/keyed.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
