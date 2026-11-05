var F1=globalThis,R1=F1.ShadowRoot&&(F1.ShadyCSS===void 0||F1.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,V2=Symbol(),O2=new WeakMap,u1=class{constructor(L,C,H){if(this._$cssResult$=!0,H!==V2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=L,this.t=C}get styleSheet(){let L=this.o,C=this.t;if(R1&&L===void 0){let H=C!==void 0&&C.length===1;H&&(L=O2.get(C)),L===void 0&&((this.o=L=new CSSStyleSheet).replaceSync(this.cssText),H&&O2.set(C,L))}return L}toString(){return this.cssText}},D1=e=>new u1(typeof e=="string"?e:e+"",void 0,V2),O=(e,...L)=>{let C=e.length===1?e[0]:L.reduce((H,V,M)=>H+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(V)+e[M+1],e[0]);return new u1(C,e,V2)},y2=(e,L)=>{if(R1)e.adoptedStyleSheets=L.map(C=>C instanceof CSSStyleSheet?C:C.styleSheet);else for(let C of L){let H=document.createElement("style"),V=F1.litNonce;V!==void 0&&H.setAttribute("nonce",V),H.textContent=C.cssText,e.appendChild(H)}},L2=R1?e=>e:e=>e instanceof CSSStyleSheet?(L=>{let C="";for(let H of L.cssRules)C+=H.cssText;return D1(C)})(e):e;var{is:Z5,defineProperty:S5,getOwnPropertyDescriptor:h5,getOwnPropertyNames:g5,getOwnPropertySymbols:f5,getPrototypeOf:O5}=Object,E1=globalThis,_2=E1.trustedTypes,y5=_2?_2.emptyScript:"",_5=E1.reactiveElementPolyfillSupport,c1=(e,L)=>e,M2={toAttribute(e,L){switch(L){case Boolean:e=e?y5:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,L){let C=e;switch(L){case Boolean:C=e!==null;break;case Number:C=e===null?null:Number(e);break;case Object:case Array:try{C=JSON.parse(e)}catch{C=null}}return C}},b2=(e,L)=>!Z5(e,L),k2={attribute:!0,type:String,converter:M2,reflect:!1,useDefault:!1,hasChanged:b2};Symbol.metadata??=Symbol("metadata"),E1.litPropertyMetadata??=new WeakMap;var N=class extends HTMLElement{static addInitializer(L){this._$Ei(),(this.l??=[]).push(L)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(L,C=k2){if(C.state&&(C.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(L)&&((C=Object.create(C)).wrapped=!0),this.elementProperties.set(L,C),!C.noAccessor){let H=Symbol(),V=this.getPropertyDescriptor(L,H,C);V!==void 0&&S5(this.prototype,L,V)}}static getPropertyDescriptor(L,C,H){let{get:V,set:M}=h5(this.prototype,L)??{get(){return this[C]},set(r){this[C]=r}};return{get:V,set(r){let t=V?.call(this);M?.call(this,r),this.requestUpdate(L,t,H)},configurable:!0,enumerable:!0}}static getPropertyOptions(L){return this.elementProperties.get(L)??k2}static _$Ei(){if(this.hasOwnProperty(c1("elementProperties")))return;let L=O5(this);L.finalize(),L.l!==void 0&&(this.l=[...L.l]),this.elementProperties=new Map(L.elementProperties)}static finalize(){if(this.hasOwnProperty(c1("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(c1("properties"))){let C=this.properties,H=[...g5(C),...f5(C)];for(let V of H)this.createProperty(V,C[V])}let L=this[Symbol.metadata];if(L!==null){let C=litPropertyMetadata.get(L);if(C!==void 0)for(let[H,V]of C)this.elementProperties.set(H,V)}this._$Eh=new Map;for(let[C,H]of this.elementProperties){let V=this._$Eu(C,H);V!==void 0&&this._$Eh.set(V,C)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(L){let C=[];if(Array.isArray(L)){let H=new Set(L.flat(1/0).reverse());for(let V of H)C.unshift(L2(V))}else L!==void 0&&C.push(L2(L));return C}static _$Eu(L,C){let H=C.attribute;return H===!1?void 0:typeof H=="string"?H:typeof L=="string"?L.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(L=>this.enableUpdating=L),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(L=>L(this))}addController(L){(this._$EO??=new Set).add(L),this.renderRoot!==void 0&&this.isConnected&&L.hostConnected?.()}removeController(L){this._$EO?.delete(L)}_$E_(){let L=new Map,C=this.constructor.elementProperties;for(let H of C.keys())this.hasOwnProperty(H)&&(L.set(H,this[H]),delete this[H]);L.size>0&&(this._$Ep=L)}createRenderRoot(){let L=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return y2(L,this.constructor.elementStyles),L}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(L=>L.hostConnected?.())}enableUpdating(L){}disconnectedCallback(){this._$EO?.forEach(L=>L.hostDisconnected?.())}attributeChangedCallback(L,C,H){this._$AK(L,H)}_$ET(L,C){let H=this.constructor.elementProperties.get(L),V=this.constructor._$Eu(L,H);if(V!==void 0&&H.reflect===!0){let M=(H.converter?.toAttribute!==void 0?H.converter:M2).toAttribute(C,H.type);this._$Em=L,M==null?this.removeAttribute(V):this.setAttribute(V,M),this._$Em=null}}_$AK(L,C){let H=this.constructor,V=H._$Eh.get(L);if(V!==void 0&&this._$Em!==V){let M=H.getPropertyOptions(V),r=typeof M.converter=="function"?{fromAttribute:M.converter}:M.converter?.fromAttribute!==void 0?M.converter:M2;this._$Em=V;let t=r.fromAttribute(C,M.type);this[V]=t??this._$Ej?.get(V)??t,this._$Em=null}}requestUpdate(L,C,H,V=!1,M){if(L!==void 0){let r=this.constructor;if(V===!1&&(M=this[L]),H??=r.getPropertyOptions(L),!((H.hasChanged??b2)(M,C)||H.useDefault&&H.reflect&&M===this._$Ej?.get(L)&&!this.hasAttribute(r._$Eu(L,H))))return;this.C(L,C,H)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(L,C,{useDefault:H,reflect:V,wrapped:M},r){H&&!(this._$Ej??=new Map).has(L)&&(this._$Ej.set(L,r??C??this[L]),M!==!0||r!==void 0)||(this._$AL.has(L)||(this.hasUpdated||H||(C=void 0),this._$AL.set(L,C)),V===!0&&this._$Em!==L&&(this._$Eq??=new Set).add(L))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(C){Promise.reject(C)}let L=this.scheduleUpdate();return L!=null&&await L,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[V,M]of this._$Ep)this[V]=M;this._$Ep=void 0}let H=this.constructor.elementProperties;if(H.size>0)for(let[V,M]of H){let{wrapped:r}=M,t=this[V];r!==!0||this._$AL.has(V)||t===void 0||this.C(V,void 0,M,t)}}let L=!1,C=this._$AL;try{L=this.shouldUpdate(C),L?(this.willUpdate(C),this._$EO?.forEach(H=>H.hostUpdate?.()),this.update(C)):this._$EM()}catch(H){throw L=!1,this._$EM(),H}L&&this._$AE(C)}willUpdate(L){}_$AE(L){this._$EO?.forEach(C=>C.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(L)),this.updated(L)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(L){return!0}update(L){this._$Eq&&=this._$Eq.forEach(C=>this._$ET(C,this[C])),this._$EM()}updated(L){}firstUpdated(L){}};N.elementStyles=[],N.shadowRootOptions={mode:"open"},N[c1("elementProperties")]=new Map,N[c1("finalized")]=new Map,_5?.({ReactiveElement:N}),(E1.reactiveElementVersions??=[]).push("2.1.2");var r2=globalThis,w2=e=>e,$1=r2.trustedTypes,P2=$1?$1.createPolicy("lit-html",{createHTML:e=>e}):void 0,t2="$lit$",W=`lit$${Math.random().toFixed(9).slice(2)}$`,i2="?"+W,k5=`<${i2}>`,C1=document,S1=()=>C1.createComment(""),h1=e=>e===null||typeof e!="object"&&typeof e!="function",a2=Array.isArray,E2=e=>a2(e)||typeof e?.[Symbol.iterator]=="function",e2=`[ 	
\f\r]`,Z1=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,B2=/-->/g,T2=/>/g,J=RegExp(`>|${e2}(?:([^\\s"'>=/]+)(${e2}*=${e2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),F2=/'/g,R2=/"/g,$2=/^(?:script|style|textarea|title)$/i,o2=e=>(L,...C)=>({_$litType$:e,strings:L,values:C}),d=o2(1),g3=o2(2),f3=o2(3),H1=Symbol.for("lit-noChange"),s=Symbol.for("lit-nothing"),D2=new WeakMap,X=C1.createTreeWalker(C1,129);function I2(e,L){if(!a2(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return P2!==void 0?P2.createHTML(L):L}var N2=(e,L)=>{let C=e.length-1,H=[],V,M=L===2?"<svg>":L===3?"<math>":"",r=Z1;for(let t=0;t<C;t++){let a=e[t],i,o,A=-1,n=0;for(;n<a.length&&(r.lastIndex=n,o=r.exec(a),o!==null);)n=r.lastIndex,r===Z1?o[1]==="!--"?r=B2:o[1]!==void 0?r=T2:o[2]!==void 0?($2.test(o[2])&&(V=RegExp("</"+o[2],"g")),r=J):o[3]!==void 0&&(r=J):r===J?o[0]===">"?(r=V??Z1,A=-1):o[1]===void 0?A=-2:(A=r.lastIndex-o[2].length,i=o[1],r=o[3]===void 0?J:o[3]==='"'?R2:F2):r===R2||r===F2?r=J:r===B2||r===T2?r=Z1:(r=J,V=void 0);let m=r===J&&e[t+1].startsWith("/>")?" ":"";M+=r===Z1?a+k5:A>=0?(H.push(i),a.slice(0,A)+t2+a.slice(A)+W+m):a+W+(A===-2?t:m)}return[I2(e,M+(e[C]||"<?>")+(L===2?"</svg>":L===3?"</math>":"")),H]},g1=class e{constructor({strings:L,_$litType$:C},H){let V;this.parts=[];let M=0,r=0,t=L.length-1,a=this.parts,[i,o]=N2(L,C);if(this.el=e.createElement(i,H),X.currentNode=this.el.content,C===2||C===3){let A=this.el.content.firstChild;A.replaceWith(...A.childNodes)}for(;(V=X.nextNode())!==null&&a.length<t;){if(V.nodeType===1){if(V.hasAttributes())for(let A of V.getAttributeNames())if(A.endsWith(t2)){let n=o[r++],m=V.getAttribute(A).split(W),p=/([.?@])?(.*)/.exec(n);a.push({type:1,index:M,name:p[2],strings:m,ctor:p[1]==="."?N1:p[1]==="?"?W1:p[1]==="@"?z1:L1}),V.removeAttribute(A)}else A.startsWith(W)&&(a.push({type:6,index:M}),V.removeAttribute(A));if($2.test(V.tagName)){let A=V.textContent.split(W),n=A.length-1;if(n>0){V.textContent=$1?$1.emptyScript:"";for(let m=0;m<n;m++)V.append(A[m],S1()),X.nextNode(),a.push({type:2,index:++M});V.append(A[n],S1())}}}else if(V.nodeType===8)if(V.data===i2)a.push({type:2,index:M});else{let A=-1;for(;(A=V.data.indexOf(W,A+1))!==-1;)a.push({type:7,index:M}),A+=W.length-1}M++}}static createElement(L,C){let H=C1.createElement("template");return H.innerHTML=L,H}};function V1(e,L,C=e,H){if(L===H1)return L;let V=H!==void 0?C._$Co?.[H]:C._$Cl,M=h1(L)?void 0:L._$litDirective$;return V?.constructor!==M&&(V?._$AO?.(!1),M===void 0?V=void 0:(V=new M(e),V._$AT(e,C,H)),H!==void 0?(C._$Co??=[])[H]=V:C._$Cl=V),V!==void 0&&(L=V1(e,V._$AS(e,L.values),V,H)),L}var I1=class{constructor(L,C){this._$AV=[],this._$AN=void 0,this._$AD=L,this._$AM=C}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(L){let{el:{content:C},parts:H}=this._$AD,V=(L?.creationScope??C1).importNode(C,!0);X.currentNode=V;let M=X.nextNode(),r=0,t=0,a=H[0];for(;a!==void 0;){if(r===a.index){let i;a.type===2?i=new t1(M,M.nextSibling,this,L):a.type===1?i=new a.ctor(M,a.name,a.strings,this,L):a.type===6&&(i=new U1(M,this,L)),this._$AV.push(i),a=H[++t]}r!==a?.index&&(M=X.nextNode(),r++)}return X.currentNode=C1,V}p(L){let C=0;for(let H of this._$AV)H!==void 0&&(H.strings!==void 0?(H._$AI(L,H,C),C+=H.strings.length-2):H._$AI(L[C])),C++}},t1=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(L,C,H,V){this.type=2,this._$AH=s,this._$AN=void 0,this._$AA=L,this._$AB=C,this._$AM=H,this.options=V,this._$Cv=V?.isConnected??!0}get parentNode(){let L=this._$AA.parentNode,C=this._$AM;return C!==void 0&&L?.nodeType===11&&(L=C.parentNode),L}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(L,C=this){L=V1(this,L,C),h1(L)?L===s||L==null||L===""?(this._$AH!==s&&this._$AR(),this._$AH=s):L!==this._$AH&&L!==H1&&this._(L):L._$litType$!==void 0?this.$(L):L.nodeType!==void 0?this.T(L):E2(L)?this.k(L):this._(L)}O(L){return this._$AA.parentNode.insertBefore(L,this._$AB)}T(L){this._$AH!==L&&(this._$AR(),this._$AH=this.O(L))}_(L){this._$AH!==s&&h1(this._$AH)?this._$AA.nextSibling.data=L:this.T(C1.createTextNode(L)),this._$AH=L}$(L){let{values:C,_$litType$:H}=L,V=typeof H=="number"?this._$AC(L):(H.el===void 0&&(H.el=g1.createElement(I2(H.h,H.h[0]),this.options)),H);if(this._$AH?._$AD===V)this._$AH.p(C);else{let M=new I1(V,this),r=M.u(this.options);M.p(C),this.T(r),this._$AH=M}}_$AC(L){let C=D2.get(L.strings);return C===void 0&&D2.set(L.strings,C=new g1(L)),C}k(L){a2(this._$AH)||(this._$AH=[],this._$AR());let C=this._$AH,H,V=0;for(let M of L)V===C.length?C.push(H=new e(this.O(S1()),this.O(S1()),this,this.options)):H=C[V],H._$AI(M),V++;V<C.length&&(this._$AR(H&&H._$AB.nextSibling,V),C.length=V)}_$AR(L=this._$AA.nextSibling,C){for(this._$AP?.(!1,!0,C);L!==this._$AB;){let H=w2(L).nextSibling;w2(L).remove(),L=H}}setConnected(L){this._$AM===void 0&&(this._$Cv=L,this._$AP?.(L))}},L1=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(L,C,H,V,M){this.type=1,this._$AH=s,this._$AN=void 0,this.element=L,this.name=C,this._$AM=V,this.options=M,H.length>2||H[0]!==""||H[1]!==""?(this._$AH=Array(H.length-1).fill(new String),this.strings=H):this._$AH=s}_$AI(L,C=this,H,V){let M=this.strings,r=!1;if(M===void 0)L=V1(this,L,C,0),r=!h1(L)||L!==this._$AH&&L!==H1,r&&(this._$AH=L);else{let t=L,a,i;for(L=M[0],a=0;a<M.length-1;a++)i=V1(this,t[H+a],C,a),i===H1&&(i=this._$AH[a]),r||=!h1(i)||i!==this._$AH[a],i===s?L=s:L!==s&&(L+=(i??"")+M[a+1]),this._$AH[a]=i}r&&!V&&this.j(L)}j(L){L===s?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,L??"")}},N1=class extends L1{constructor(){super(...arguments),this.type=3}j(L){this.element[this.name]=L===s?void 0:L}},W1=class extends L1{constructor(){super(...arguments),this.type=4}j(L){this.element.toggleAttribute(this.name,!!L&&L!==s)}},z1=class extends L1{constructor(L,C,H,V,M){super(L,C,H,V,M),this.type=5}_$AI(L,C=this){if((L=V1(this,L,C,0)??s)===H1)return;let H=this._$AH,V=L===s&&H!==s||L.capture!==H.capture||L.once!==H.once||L.passive!==H.passive,M=L!==s&&(H===s||V);V&&this.element.removeEventListener(this.name,this,H),M&&this.element.addEventListener(this.name,this,L),this._$AH=L}handleEvent(L){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,L):this._$AH.handleEvent(L)}},U1=class{constructor(L,C,H){this.element=L,this.type=6,this._$AN=void 0,this._$AM=C,this.options=H}get _$AU(){return this._$AM._$AU}_$AI(L){V1(this,L)}},W2={M:t2,P:W,A:i2,C:1,L:N2,R:I1,D:E2,V:V1,I:t1,H:L1,N:W1,U:z1,B:N1,F:U1},b5=r2.litHtmlPolyfillSupport;b5?.(g1,t1),(r2.litHtmlVersions??=[]).push("3.3.3");var z2=(e,L,C)=>{let H=C?.renderBefore??L,V=H._$litPart$;if(V===void 0){let M=C?.renderBefore??null;H._$litPart$=V=new t1(L.insertBefore(S1(),M),M,void 0,C??{})}return V._$AI(e),V};var A2=globalThis,g=class extends N{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let L=super.createRenderRoot();return this.renderOptions.renderBefore??=L.firstChild,L}update(L){let C=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(L),this._$Do=z2(C,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return H1}};g._$litElement$=!0,g.finalized=!0,A2.litElementHydrateSupport?.({LitElement:g});var w5=A2.litElementPolyfillSupport;w5?.({LitElement:g});(A2.litElementVersions??=[]).push("4.2.2");var U2=e=>(...L)=>({_$litDirective$:e,values:L}),G1=class{constructor(L){}get _$AU(){return this._$AM._$AU}_$AT(L,C,H){this._$Ct=L,this._$AM=C,this._$Ci=H}_$AS(L,C){return this.update(L,C)}update(L,C){return this.render(...C)}};var{I:I3}=W2;var P5={},G2=(e,L=P5)=>e._$AH=L;var Q2=U2(class extends G1{constructor(){super(...arguments),this.key=s}render(e,L){return this.key=e,L}update(e,[L,C]){return L!==this.key&&(G2(e),this.key=L),C}});var K2;function B5(){if(customElements.get("ha-chart-base"))return Promise.resolve(!0);let e=window.loadCardHelpers;return e?(K2??=(async()=>{try{(await e()).createCardElement({type:"statistics-graph",entities:[]})}catch{}let L=new Promise(C=>setTimeout(()=>C(!1),1e4));return Promise.race([customElements.whenDefined("ha-chart-base").then(()=>!0),L])})(),K2):Promise.resolve(!1)}function Q1(e){B5().then(e),customElements.whenDefined("ha-chart-base").then(()=>e(!0))}var j2=e=>Math.round(e*255).toString(16).padStart(2,"0");function n2(e,L){let C=e.trim();if(/^#[0-9a-f]{6}$/i.test(C))return C+j2(L);if(/^#[0-9a-f]{3}$/i.test(C))return`#${[...C.slice(1)].map(V=>V+V).join("")}${j2(L)}`;let H=C.match(/^rgba?\(([^)]+)\)/i);if(H){let[V,M,r]=H[1].split(/[ ,/]+/).filter(Boolean);return`rgba(${V}, ${M}, ${r}, ${L})`}return C}var f1=e=>e.replace(/[&<>"']/g,L=>`&#${L.charCodeAt(0)};`),d2=e=>`<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${e}"></span>`;function q2(e){if(e<=0)return 1;let L=10**Math.floor(Math.log10(e)),C=e/L;return([1,2,2.5,5,10].find(V=>C<=V*(1+1e-9))??10)*L}var i1=e=>Number(e.toFixed(10));function T5(e,L){if(e.min>=0&&L.min>=0)return;let C=q2((e.max-e.min)/6),H=Math.max(Math.ceil(i1(e.max/C)),L.max>0?1:0),V=Math.max(Math.ceil(i1(-e.min/C)),L.min<0?1:0),M=q2(Math.max(H?L.max/H:0,V?-L.min/V:0));return{bar:{min:i1(-V*C),max:i1(H*C),interval:C},line:{min:i1(-V*M),max:i1(H*M),interval:M}}}function Y2(e){let L=e.lines??[],C=e.series.map((o,A)=>({id:o.id,type:"bar",name:o.name,stack:"savings",cursor:"default",barMaxWidth:50,color:n2(o.color,.5),itemStyle:{borderColor:o.color},data:o.values.map((n,m)=>{let p=e.series.slice(A+1).every(l=>Math.sign(l.values[m]??0)!==Math.sign(n??0));return{value:n,itemStyle:n?p?{borderRadius:n>0?[4,4,0,0]:[0,0,4,4]}:void 0:{borderWidth:0}}})})),H=L.map(o=>({id:o.id,type:"line",name:o.name,yAxisIndex:1,color:o.color,symbol:"none",showSymbol:!1,step:o.step?"middle":!1,lineStyle:{width:1.5,type:o.dash??"dashed",color:o.color},z:1,connectNulls:!0,data:o.values})),V=[...C,...H],M=new Map(L.map(o=>[o.name,o.format])),r=o=>{let A=Array.isArray(o)?o:[o],n=document.createElement("div");if(!A.length)return n;let m=v=>M.has(v.seriesName??""),p=A.filter(v=>v.value&&!m(v)),l=A.filter(v=>m(v)&&v.value!==null&&v.value!==void 0),c=p.map(v=>`${d2(String(v.color??""))}${f1(v.seriesName??"")}: ${e.format(v.value??0)}`),x=l.map(v=>`${d2(String(v.color??""))}${f1(v.seriesName??"")}: ${M.get(v.seriesName??"")?.(v.value??0)??""}`),Z=new Set(e.series.filter(v=>v.inTotal===!1).map(v=>v.name)),u=p.filter(v=>!Z.has(v.seriesName??"")).reduce((v,B)=>v+(B.value??0),0);return n.innerHTML=`<b>${f1(e.labels[A[0].dataIndex]?.tooltip??"")}</b>`+(c.length?`<br>${c.join("<br>")}`:"")+(p.length>1?`<br><b>${f1(e.total)}: ${e.format(u)}</b>`:"")+(x.length?`<br>${x.join("<br>")}`:""),n},t={type:"value",name:e.unit,nameGap:2,nameTextStyle:{align:"left"},axisLabel:{formatter:e.tick},splitLine:{show:!0}},a={type:"value",name:e.lineUnit??"",nameGap:2,nameTextStyle:{align:"right"},axisLabel:{formatter:e.lineTick??e.tick},splitLine:{show:!1}};if(L.length){let o=e.labels.map((p,l)=>{let c=e.series.map(x=>x.values[l]??0);return{up:c.filter(x=>x>0).reduce((x,Z)=>x+Z,0),down:c.filter(x=>x<0).reduce((x,Z)=>x+Z,0)}}),A=L.flatMap(p=>p.values.filter(l=>l!==null)),n=Math.min(0,...A),m=T5({min:Math.min(0,...o.map(p=>p.down)),max:Math.max(0,...o.map(p=>p.up))},{min:n,max:Math.max(0,...A)});if(m){Object.assign(t,m.bar),Object.assign(a,m.line);let p=e.lineTick??e.tick;n>=0&&(a.axisLabel={formatter:l=>l<0?"":p(l)})}}let i={xAxis:{type:"category",data:e.labels.map(o=>o.axis),axisTick:{show:!1}},yAxis:L.length?[t,a]:t,grid:{top:15,bottom:0,left:1,right:1,containLabel:!0},legend:{show:!0,type:"custom",data:[...e.series,...L].map(o=>({id:o.id,name:o.name}))},tooltip:{trigger:"axis",axisPointer:{type:"shadow"},formatter:r}};return{data:V,options:i}}function p2(e){let L=e.reduce((C,H)=>C+Math.max(0,H),0);return e.map(C=>L>0?Math.max(0,C)/L*100:0)}function J2(e){let L=e.items.map(i=>e.hidden.has(i.id)?0:i.value),C=p2(L),H=L.reduce((i,o)=>i+Math.max(0,o),0),V=[],M=-Math.PI/2;for(let i of C){let o=M+i/100*2*Math.PI;V.push([M,o]),M=o}let r=i=>{let o=Math.min(90,i.getWidth()/2-8,i.getHeight()/2-8);return{cx:i.getWidth()/2,cy:i.getHeight()/2,r:o,r0:o*40/70}},t=e.items.map((i,o)=>({id:i.id,type:"custom",name:i.name,coordinateSystem:"none",cursor:"default",color:n2(i.color,.5),data:[[L[o],V[o][0],V[o][1],C[o]]],renderItem:(A,n)=>{let m=n.value(1),p=n.value(2);if(!(p-m>0))return null;let l=r(n),c=[{type:"sector",shape:{...l,startAngle:m,endAngle:p,cornerRadius:4},style:{fill:n2(i.color,.5),stroke:i.color,lineWidth:1}}];if(p-m>=15*Math.PI/180){let x=(m+p)/2,Z=Math.cos(x)>=0,u=[l.cx+Math.cos(x)*l.r,l.cy+Math.sin(x)*l.r],v=[l.cx+Math.cos(x)*(l.r+10),l.cy+Math.sin(x)*(l.r+10)],B=[v[0]+(Z?10:-10),v[1]];c.push({type:"polyline",silent:!0,shape:{points:[u,v,B]},style:{stroke:i.color,fill:"none"}},{type:"text",silent:!0,x:B[0]+(Z?4:-4),y:B[1],style:{text:`${i.name}
${e.percent(n.value(3))}`,fill:e.labelColor,fontSize:12,lineHeight:16,align:Z?"left":"right",verticalAlign:"middle"}})}return{type:"group",children:c}}}));return t.push({id:"total",type:"custom",coordinateSystem:"none",silent:!0,tooltip:{show:!1},data:[[H]],renderItem:(i,o)=>{let A=r(o);return{type:"text",x:A.cx,y:A.cy,style:{text:`${e.total}
${e.format(o.value(0))}`,fill:e.centerColor,fontSize:14,lineHeight:24,fontWeight:"bold",align:"center",verticalAlign:"middle"}}}}),{data:t,options:{xAxis:{show:!1},yAxis:{show:!1},legend:{show:!1},tooltip:{show:!0,trigger:"item",formatter:i=>{let o=e.items.findIndex(m=>m.id===i.seriesId);if(o<0)return"";let A=e.items[o],n=document.createElement("div");return n.innerHTML=`<b>${f1(A.name)}</b><br>${d2(A.color)}${e.format(i.value?.[0]??L[o])} (${e.percent(i.value?.[3]??C[o])})`,n}}}}}var M1={solar:"var(--energy-solar-color, #ff9800)",grid:"var(--energy-grid-consumption-color, #488fc2)",cheap:"color-mix(in srgb, var(--energy-grid-consumption-color, #488fc2) 55%, #fff)",expensive:"color-mix(in srgb, var(--energy-grid-consumption-color, #488fc2) 70%, #000)",export:"var(--energy-grid-return-color, #8353d1)",heat:"var(--graph-color-30, var(--color-30, #bf3947))",car:"var(--energy-non-fossil-color, #0f9d58)"},X2=["#4269d0","#f4bd4a","#ff725c","#6cc5b0","#a463f2","#ff8ab7","#9c6b4e","#97bbf5","#01ab63","#094bad","#c99000","#d84f3e"];function F5(e){let L=e.trim(),C=/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(L)?.[1];if(C){let V=C.length===3?[...C].map(M=>M+M).join(""):C;return[0,2,4].map(M=>parseInt(V.slice(M,M+2),16))}let H=/^rgba?\(([^)]+)\)/i.exec(L)?.[1];if(H){let[V,M,r]=H.split(/[ ,/]+/).filter(Boolean).map(Number);if([V,M,r].every(Number.isFinite))return[V,M,r]}}var R5=([e,L,C])=>`#${[e,L,C].map(H=>Math.round(Math.min(Math.max(H,0),255)).toString(16).padStart(2,"0")).join("")}`;function C5(e,L,C){let H=F5(e);if(!H)return e;let V=L==="white"?255:0;return R5(H.map(M=>M*C+V*(1-C)))}function y(e){let L=getComputedStyle(e),C=(M,r)=>L.getPropertyValue(M).trim()||r,H=C("--energy-grid-consumption-color","#488fc2"),V=Array.from({length:54},(M,r)=>{let t=r+1;return L.getPropertyValue(`--graph-color-${t}`).trim()||L.getPropertyValue(`--color-${t}`).trim()||X2[r%X2.length]});return{solar:C("--energy-solar-color","#ff9800"),grid:H,cheap:C5(H,"white",.55),expensive:C5(H,"black",.7),export:C("--energy-grid-return-color","#8353d1"),standing:C("--electricity-lens-standing-charge-color","#a1887f"),heat:L.getPropertyValue("--graph-color-30").trim()||C("--color-30","#bf3947"),car:C("--energy-non-fossil-color","#0f9d58"),other:L.getPropertyValue("--history-unknown-color").trim()||C("--disabled-color","#bdbdbd"),line:C("--secondary-text-color","#727272"),consumers:V}}function k(e,L){let C=new Map,H=new Map,V=0;for(let M of e.areas)if(M.kind==="other")C.set(M.id,L.other);else if(M.kind==="device"){let r=L.consumers[V++%L.consumers.length];C.set(M.id,r);let t=M.statistics.energy?.[0];t&&H.set(t,r)}for(let M of e.areas)if(M.kind==="category")if(M.id==="heat_pump")C.set(M.id,L.heat);else{let t=(M.statistics.energy??[]).map(i=>H.get(i)).filter(Boolean),a=M.id==="wallbox"?L.car:L.grid;C.set(M.id,t[t.length-1]??a)}return C}var D5=e=>!!e&&typeof e.subscribe=="function";function E5(e){let L=location.pathname.split("/")[1]??"",C=e;for(let H of[`_energy_${L}`,"_energy"])if(D5(C[H]))return C[H]}var $5=()=>new Date().setHours(24,0,0,0)-1;function Q(e,L){let C,H,V=0,M=()=>{let r=E5(e);if(r){C=r.subscribe(t=>L({start:new Date(t.start).getTime(),end:t.end?new Date(t.end).getTime():$5()}));return}V+=1,V===2&&L(null),V<20&&(H=window.setTimeout(M,500))};return M(),()=>{window.clearTimeout(H),C?.()}}var I5={comma_decimal:"en-US",decimal_comma:"de",space_comma:"fr",quote_decimal:"de-CH"};function R(e,L){let C=e?.number_format,H=C==="system"?void 0:I5[C??""]??e?.language??"en";return new Intl.NumberFormat(H,{...L,...C==="none"?{useGrouping:!1}:{}})}function H5(e){switch(e?.time_format){case"am_pm":return!0;case"24":return!1;case"system":return new Intl.DateTimeFormat(void 0,{hour:"numeric"}).resolvedOptions().hour12;default:return}}function V5(e){let L=/^([-−+]?[\d.,'’\u00a0\u202f ]*\d)[\u00a0\u202f ](.+)$/.exec(e);return L?[L[1],L[2]]:[e,""]}function K(e,L){let C=(M,r)=>{let t=Math.abs(M),a=r??(t<10?2:t<100?1:0);return R(e,{maximumFractionDigits:a,minimumFractionDigits:r??0}).format(M)};return{number:C,value:(M,r)=>{switch(r){case"energy":return`${C(M,Math.abs(M)<100?1:0)} kWh`;case"money":{let t=Math.abs(M)<100;return R(e,{style:"currency",currency:L,maximumFractionDigits:t?2:0,minimumFractionDigits:t?2:0}).format(M)}case"price":return L==="EUR"?`${C(M*100,1)} ct/kWh`:`${R(e,{style:"currency",currency:L,maximumFractionDigits:3}).format(M)}/kWh`;case"percent":return R(e,{style:"percent",maximumFractionDigits:0}).format(M/100);case"number":return C(M,Math.abs(M)<10?2:Math.abs(M)<100?1:0);case"distance":return`${C(M,Math.abs(M)<100?1:0)} km`;case"per_100km":return`${R(e,{style:"currency",currency:L,maximumFractionDigits:2,minimumFractionDigits:2}).format(M)}/100 km`}},currencySymbol:()=>R(e,{style:"currency",currency:L}).formatToParts(0).find(M=>M.type==="currency")?.value??""}}var m2={energy:["energy"],cost:["cost"],bill:["cost","import_cost","feed_in"],grid_price:["import_cost","energy"],device_grid_price:["cost","solar_cost","energy","solar"],price:["cost","energy","solar"],solar_share:["solar","energy"],cheap_share:["cheap","solar","energy"],expensive_share:["expensive","solar","energy"],cheap_saving:["cheap_saving"],self_consumption:["self_used","energy"],export:["export"],saving:["saving"],heat:["heat"],alternative_cost:["alternative_cost"],scop:["heat","energy"],heat_price:["cost","heat"],distance:["distance"],cost_per_100km:["cost","distance"],forecast_today:[],forecast_tomorrow:[]},N5={energy:["solar","export"],cost:["energy","solar","import_cost","feed_in"],saving:["alternative_cost","cost"],heat:["energy"],distance:["energy"]},W5=Object.keys(m2),j1=e=>e==="forecast_today"||e==="forecast_tomorrow";function j(e){return W5.filter(L=>j1(L)?e.forecast===!0:m2[L].every(C=>e.statistics[C]?.length))}function L5(e,L){return[...m2[L],...N5[L]??[]].flatMap(C=>e.statistics[C]??[])}var K1=(e,L)=>L>0?e/L*100:null;function a1(e,L,C,H){let V=C("energy"),M=C("solar"),r=i=>({value:i,unit:"energy"}),t=i=>({value:i,unit:"money"}),a=i=>({value:i,unit:"number"});switch(e){case"energy":{if(V!==null&&M!==null&&V>0){if(L.kind==="household")return{value:V,unit:"energy",line:{key:"line_energy_parts",values:{grid:r(Math.max(V-M,0)),solar:r(M)}}};let o=K1(M,V)??0;return{value:V,unit:"energy",line:{key:"line_solar_part",values:{percent:{value:o,unit:"percent"}}}}}let i=C("export");return L.kind==="grid"&&i!==null?{value:V,unit:"energy",line:{key:"line_exported",values:{energy:r(i)}}}:{value:V,unit:"energy"}}case"cost":{let i=C("cost");if(i!==null&&V&&M!==null)return{value:i,unit:"money",line:{key:"line_average_price",values:{price:{value:i/V,unit:"price"}}}};let o=C("import_cost"),A=C("feed_in");if(i!==null&&o!==null&&A!==null){let n=i-o+A;return{value:i,unit:"money",line:{key:Math.abs(n)<.005?"line_bill_no_charge":"line_bill",values:{imported:t(o),feed_in:t(A),charge:t(n)}}}}return i!==null&&V!==null&&L.kind==="grid"?{value:i,unit:"money",line:{key:"line_for_import",values:{energy:r(V)}}}:{value:i,unit:"money"}}case"bill":{let i=C("cost"),o=C("import_cost"),A=C("feed_in");if(i===null||o===null||A===null)return{value:null,unit:"money"};let n=i-o+A;return{value:o+n,unit:"money",line:Math.abs(n)<.005?void 0:{key:"line_bill_parts",values:{imported:t(o),charge:t(n)}}}}case"grid_price":{let i=C("import_cost");return i===null||!V?{value:null,unit:"price"}:{value:i/V,unit:"price",line:{key:"line_cost_for",values:{cost:t(i),energy:r(V)}}}}case"device_grid_price":{let i=C("cost"),o=C("solar_cost");if(i===null||o===null||V===null||M===null)return{value:null,unit:"price"};let A=V-M;if(A<=0)return{value:null,unit:"price"};let n=i-o;return{value:n/A,unit:"price",line:{key:"line_cost_for",values:{cost:t(n),energy:r(A)}}}}case"cheap_saving":return{value:C("cheap_saving"),unit:"money",line:{key:"line_against_normal",values:{}}};case"price":{let i=C("cost");return i===null||!V?{value:null,unit:"price"}:{value:i/V,unit:"price",line:{key:"line_cost_for",values:{cost:{value:i,unit:"money"},energy:r(V)}}}}case"solar_share":return V===null||M===null?{value:null,unit:"percent"}:{value:K1(M,V),unit:"percent",line:{key:"line_from_solar",values:{part:a(M),whole:r(V)}}};case"cheap_share":case"expensive_share":{let i=C(e==="cheap_share"?"cheap":"expensive");if(V===null||M===null||i===null)return{value:null,unit:"percent"};let o=Math.max(V-M,0);return{value:K1(i,o),unit:"percent",line:{key:"line_of_grid",values:{part:a(i),whole:r(o)}}}}case"self_consumption":{let i=C("self_used");return V===null||i===null?{value:null,unit:"percent"}:{value:K1(i,V),unit:"percent",line:{key:"line_self_used",values:{part:a(i),whole:r(V)}}}}case"export":return{value:C("export"),unit:"energy"};case"saving":{let i=C("saving"),o=C("alternative_cost"),A=C("cost");if(i===null||o===null||A===null)return{value:i,unit:"money"};let n=o-A;return Math.abs(n-i)<.005?{value:n,unit:"money"}:{value:n,unit:"money",line:{key:"line_saving_split",values:{solar:t(n-i),saving:t(i)}}}}case"heat":{let i=C("heat");return i===null||V===null?{value:i,unit:"energy"}:{value:i,unit:"energy",line:{key:"line_from_electricity",values:{energy:r(V)}}}}case"alternative_cost":return{value:C("alternative_cost"),unit:"money"};case"scop":{let i=C("heat");return i===null||!V?{value:null,unit:"number"}:{value:i/V,unit:"number",line:{key:"line_heat_from",values:{heat:r(i),energy:r(V)}}}}case"heat_price":{let i=C("heat"),o=C("cost");return i===null||o===null||!i?{value:null,unit:"price"}:{value:o/i,unit:"price",line:{key:"line_cost_for_heat",values:{cost:{value:o,unit:"money"},heat:r(i)}}}}case"distance":{let i=C("distance");return i===null||V===null?{value:i,unit:"distance"}:{value:i,unit:"distance",line:{key:"line_charged",values:{energy:r(V)}}}}case"cost_per_100km":{let i=C("distance"),o=C("cost");return i===null||o===null||!i?{value:null,unit:"per_100km"}:{value:o/i*100,unit:"per_100km",line:{key:"line_cost_for",values:{cost:{value:o,unit:"money"},energy:{value:i,unit:"distance"}}}}}case"forecast_today":case"forecast_tomorrow":return{value:H,unit:"energy"}}}var M5=["change","mean","min","max"],z=e=>e.statistic!==void 0?"statistic":e.entity!==void 0?"entity":"energy";function q({start:e,end:L}){let C=L-e;return C<=2*864e5+36e5?"hour":C<=95*864e5?"day":C<=3*366*864e5?"month":"year"}var o1=e=>e==="year"?"month":e,z5=(e,L)=>{let C=new Date(e);return L==="hour"?C.setMinutes(0,0,0):(C.setHours(0,0,0,0),L==="day"||(C.setDate(1),L==="month")?C.getTime():C.setMonth(0))},U5=(e,L)=>{let C=new Date(e);return L==="hour"?C.setHours(C.getHours()+1):L==="day"?C.setDate(C.getDate()+1):L==="month"?C.setMonth(C.getMonth()+1):C.setFullYear(C.getFullYear()+1),C.getTime()};function e5({start:e,end:L},C){let H=[];for(let V=z5(e,C);V<=L&&H.length<400;V=U5(V,C))H.push(V);return H}function r5(e,L=new Date){let C=e.filter(V=>V!==null).map(V=>V.getFullYear()),H=Math.min(L.getFullYear(),...C);return{start:new Date(H,0,1).getTime(),end:new Date(L.getFullYear()+1,0,1).getTime()-1}}function l2(e,L,C){let H=L.map(()=>null),V=C==="hour"?0:12*36e5;for(let M of e??[]){if(M.change===null||M.change===void 0)continue;let r=(typeof M.start=="number"?M.start:Date.parse(M.start))+V,t=-1;for(let a=0;a<L.length&&L[a]<=r;a+=1)t=a;t<0||(H[t]=(H[t]??0)+M.change)}return H}function T(e,L=new Date){let C=(r,t)=>({start:r.getTime(),end:t.getTime()-1}),H=L.getFullYear(),V=L.getMonth(),M=L.getDate();switch(e){case"today":return C(new Date(H,V,M),new Date(H,V,M+1));case"yesterday":return C(new Date(H,V,M-1),new Date(H,V,M));case"this_month":return C(new Date(H,V,1),new Date(H,V+1,1));case"last_month":return C(new Date(H,V-1,1),new Date(H,V,1));case"this_year":return C(new Date(H,0,1),new Date(H+1,0,1));case"last_year":return C(new Date(H-1,0,1),new Date(H,0,1))}}function q1({start:e,end:L},C){let H=new Date(e),V=new Date(L),M=(a,i)=>new Intl.DateTimeFormat(C,a).format(i);if(H.toDateString()===V.toDateString())return M({day:"numeric",month:"short"},H);let t=H.getDate()===1&&new Date(L+1).getDate()===1;return t&&H.getMonth()===0&&V.getMonth()===11&&H.getFullYear()===V.getFullYear()?M({year:"numeric"},H):t&&H.getMonth()===V.getMonth()&&H.getFullYear()===V.getFullYear()?M({month:"short",year:"numeric"},H):new Intl.DateTimeFormat(C,{day:"numeric",month:"short"}).formatRange(H,V)}function t5(e,L,C){let H=L.map(()=>0),V=L.map(()=>0),M=C==="hour"?0:12*36e5;for(let r of e??[]){if(r.mean===null||r.mean===void 0)continue;let t=(typeof r.start=="number"?r.start:Date.parse(r.start))+M,a=-1;for(let i=0;i<L.length&&L[i]<=t;i+=1)a=i;a<0||(H[a]+=r.mean,V[a]+=1)}return H.map((r,t)=>V[t]?r/V[t]:null)}var h="electricity_lens",s2=["pv","heat_pump","wallbox"];var Y1=e=>{if(e==null||e==="")return null;let L=Number(e);return Number.isFinite(L)?L:null},i5=e=>typeof e=="string"&&e?new Date(e):null;function _(e){let L=Object.values(e.entities??{}).filter(M=>M.platform===h),C=(M,r)=>L.find(t=>t.device_id===M&&t.translation_key===r),H=M=>M?Y1(e.states[M]?.state):null,V=[];for(let M of L){if(M.translation_key!=="saving")continue;let r=e.states[M.entity_id];if(!r||r.state==="unavailable")continue;let t=r.attributes,a=t.category;s2.includes(a)&&V.push({category:a,savingStatistic:typeof t.statistic_id=="string"?t.statistic_id:`${h}:${a}_saving`,calculating:t.calculating===!0,saving:Y1(r.state),investment:Y1(t.investment),payback:H(C(M.device_id,"payback")?.entity_id),perYear:H(C(M.device_id,"saving_per_year")?.entity_id),countingSince:i5(t.counting_since),yearlyFrom:i5(t.yearly_from),price:Y1(t.price),heating:t.heating==="gas"||t.heating==="oil"?t.heating:null,heatEstimated:t.heat_estimated===!0})}return V.sort((M,r)=>s2.indexOf(M.category)-s2.indexOf(r.category))}function A1(e){return Object.values(e.entities??{}).some(C=>C.platform===h&&C.translation_key==="saving")?"integration_unavailable":"not_set_up"}function a5(e,L=new Date){let C=e.some(o=>o.calculating),H=e.reduce((o,A)=>o+(A.saving??0),0),V=e.reduce((o,A)=>o+(A.investment??0),0),M=!C&&e.length>0&&e.every(o=>o.saving!==null),r=M?H-V:null,t=e.every(o=>o.perYear!==null),a=M&&t?e.reduce((o,A)=>o+(A.perYear??0),0):null,i=null;return r!==null&&a!==null&&(r>=0?i=L:a>0&&(i=new Date(L.getTime()+-r/a*12*26298e5))),{saved:H,invested:V,balance:r,perYear:a,inThePlusFrom:i,calculating:C}}function o5(e){let{investment:L,saving:C,perYear:H}=e;return L===null||L<=0||C===null||H===null||H<=0?null:Math.max(0,(L-C)/H)}function A5(e){let{investment:L,saving:C,perYear:H}=e;return L===null||L<=0||C===null||H===null||C<L?null:H/L*100}var G5=300*1e3,b=5*1e3,e1,v2,D=()=>e1?.value;function F(){if(!e1)return!0;let e=e1.value&&!e1.value.calculating?G5:b;return Date.now()-e1.at>e}function E(e){return F()?(v2??=e.callWS({type:`${h}/figures`}).then(L=>L).catch(()=>null).then(L=>(e1={at:Date.now(),value:L},v2=void 0,L)),v2):Promise.resolve(e1?.value??null)}var Q5=6e4,n5=new WeakMap;function K5(e){let L=e.entities??{},C=n5.get(L);return C||(C=Object.values(L).filter(H=>H.platform===h).map(H=>H.entity_id),n5.set(L,C)),C}var w=class extends g{constructor(){super(...arguments);this._lookedAt=0}_watched(){return[]}_changedFor(C,H){return C.locale!==H.locale||C.language!==H.language||C.config!==H.config||C.themes!==H.themes||C.selectedTheme!==H.selectedTheme||C.entities!==H.entities||[...K5(H),...this._watched()].some(V=>C.states[V]!==H.states[V])}shouldUpdate(C){let H=C.get("hass"),V=C.size===1&&H!==void 0&&this.hass!==void 0,M=Date.now()-this._lookedAt>=Q5;return V&&!M&&!this._changedFor(H,this.hass)?!1:(this._lookedAt=Date.now(),!0)}};var x2={title:"Balance","category.pv":"PV plant","category.heat_pump":"Heat pump","category.wallbox":"Electric car",show_yearly:"Show yearly figures",show_total:"Show totals",not_set_up:"Set up the Electricity Lens integration to see what your PV plant, heat pump, and electric car have saved.",integration_unavailable:"The figures aren't available right now. Check Electricity Lens under Settings > Devices & services.",calculating_all:"The past is being computed \u2026",calculating:"Being computed \u2026",loading:"Loading \u2026",saved_invested:"{saved} saved, {invested} invested",saved_only:"{saved} saved",of_investment:"{percent} of {investment}",paid_off:"paid off",since:"since {date}",heat_estimated:"heat partly estimated",instead_heat_pump:"no extra cost entered",instead_wallbox:"no extra cost entered",instead_pv:"no purchase cost entered",in_the_plus_from:"In the plus from about {date}",in_the_plus:"In the plus",yearly_after_twelve:"Yearly figures after twelve months of data.",yearly_from:"Yearly figure from {date}",pays_off_in:"pays off in about {years}",years_one:"1 year",years_other:"{count} years",under_one_year:"less than a year",return_per_year:"paid off, {percent} return per year",instead_of_gas:"instead of gas",instead_of_oil:"instead of oil",instead_of_fuel:"instead of fuel",per_year:"{amount}/year",gas:"Gas {price}/kWh",oil:"Oil {price}/l",fuel:"Fuel {price}/l",prices_link:"Change the prices",progress:"{name}: {percent} of the investment saved",savings_title:"Savings",savings_note:"As in the balance: the benefit of solar power counts for the PV plant only",savings_source:"Source",savings_energy:"Energy",savings_amount:"Amount",savings_total:"Total",savings_pv:"Solar power instead of grid power",savings_feed_in:"Feed-in",savings_gas:"Electricity instead of gas",savings_oil:"Electricity instead of oil",savings_fuel:"Electricity instead of fuel",savings_instead_gas:"A gas heating would have cost",savings_instead_oil:"An oil heating would have cost",savings_instead_fuel:"A combustion car would have cost",savings_electricity:"{name} electricity costs",savings_solar_part:"of which by solar power",savings_area_note:"In the balance, the solar part counts for the PV plant",meters_consumer:"Consumer",meters_electricity:"Electricity",history_title:"Savings over time",history_savings_note:"Compared with {list}",history_cost_note:"Solar power counts at {rate}, without the standing charge",history_cost_note_no_solar:"Without the standing charge",history_bill_note:"Grid power and standing charge, without the feed-in",history_saving_note:"Including its solar power, which the balance counts for the PV plant",compare_pv:"grid power",compare_gas:"gas heating",compare_oil:"oil heating",compare_fuel:"a combustion car",history_total:"Total",history_no_chart:"The chart is only shown in Home Assistant.",history_failed:"The statistics could not be loaded.",history_empty:"No savings in this period.",figures_failed:"The figures could not be loaded.",figures_unavailable:"not available","figure.energy":"Consumption","figure.energy.grid":"Grid import","figure.energy.solar":"Solar production","figure.cost":"Costs","figure.cost.grid":"Grid costs","figure.bill":"Electricity bill","figure.grid_price":"Average grid price","figure.device_grid_price":"Average grid price","figure.price":"Average price","figure.solar_share":"Solar share","figure.solar_share.household":"Self-sufficiency","figure.cheap_share":"Cheap grid power","figure.expensive_share":"Expensive grid power","figure.cheap_saving":"Tariff saving","figure.self_consumption":"Self-consumption","figure.export":"Feed-in","figure.saving":"Saving","figure.forecast_today":"Forecast today","figure.forecast_tomorrow":"Forecast tomorrow","figure.heat":"Heat","figure.alternative_cost":"Comparison costs","figure.scop":"Seasonal COP","figure.heat_price":"Heat price","figure.distance":"Distance","figure.cost_per_100km":"Costs per 100 km",line_saving_split:"of which {solar} by solar \xB7 {saving} in the balance",line_bill:"Grid {imported} \u2212 feed-in {feed_in} + standing charge {charge}",line_bill_parts:"Grid {imported} + standing charge {charge}",line_bill_no_charge:"Grid {imported} \u2212 feed-in {feed_in}",line_against_normal:"compared with the normal price",line_from_electricity:"from {energy} electricity",line_heat_from:"{heat} heat from {energy}",line_cost_for_heat:"{cost} for {heat} heat",line_charged:"with {energy} charged",line_solar_part:"{percent} of it solar power",line_energy_parts:"Grid {grid} + solar {solar}",line_exported:"{energy} fed in",line_average_price:"average {price}",line_for_import:"for {energy} imported",line_cost_for:"{cost} for {energy}",line_from_solar:"{part} of {whole} from solar",line_of_grid:"{part} of {whole} grid power",line_self_used:"{part} of {whole} used in the house","value.change":"total in the period","value.mean":"average","value.min":"minimum","value.max":"maximum",value_range:"from {min} to {max}","period.energy_date":"Follow the date selection","period.today":"Today","period.yesterday":"Yesterday","period.this_month":"This month","period.last_month":"Last month","period.this_year":"This year","period.last_year":"Last year","period.all":"All years",editor_title:"Title (optional)",editor_period:"Period",editor_period_hint:"Without a date selection on the dashboard: this month.",editor_source:"Source","source.energy":"Energy data","source.statistic":"Statistic","source.entity":"Entity",editor_area:"Area",editor_figure:"Figure",editor_statistic:"Statistic",editor_value:"Value",editor_secondary:"Line below","secondary.none":"Default","secondary.range":"Range of the period",editor_entity:"Entity",editor_name:"Name (optional)",editor_not_loaded:"Energy data need the Electricity Lens integration.","source.solar":"Solar power","source.grid":"Grid power","source.normal":"Normal grid power","source.cheap":"Cheap grid power","source.expensive":"Expensive grid power","source.export":"Feed-in","source.standing_charge":"Standing charge","stack.source":"By source","stack.bill":"Electricity bill","stack.consumer":"By consumer","stack.none":"Not stacked",editor_savings:"Savings of all categories",editor_stack:"Stacking",editor_line:"Line",editor_lines:"Further lines from statistics",editor_line_none:"None",history_empty_figure:"No data in this period.",breakdown_mix:"Electricity mix",breakdown_cost_by_consumer:"Costs by consumer",breakdown_energy_by_consumer:"Consumption by consumer",breakdown_total:"Total","mix.solar":"Solar","mix.grid":"Grid","mix.normal":"Grid normal","mix.cheap":"Grid cheap","mix.expensive":"Grid expensive",editor_by:"Split","by.source":"By source","by.consumer":"By consumer",editor_display:"Display","display.ring":"Ring","display.bars":"Bars",editor_color_by_source:"Color the bars by source",editor_breakdown_source:"Source","breakdown_source.energy":"Energy data","breakdown_source.statistics":"Statistics",editor_statistics:"Statistics","figure_choice.energy":"Consumption","figure_choice.cost":"Costs","strategy.title":"Electricity","strategy.overview":"Now","strategy.electricity":"Consumption","strategy.cost_today":"Costs today","strategy.self_sufficiency_today":"Self-sufficiency today","strategy.solar_today":"Solar today","strategy.consumption_today":"Consumption today","strategy.charged_energy":"Charged energy","strategy.charging_cost":"Charging costs","strategy.bill":"Electricity bill","strategy.cost_with_solar":"Electricity costs incl. solar","strategy.cost_history":"Costs over time","strategy.cost_distribution":"Cost distribution","strategy.price_with_solar":"Average price incl. solar","strategy.costs":"Costs","strategy.heating":"Heating","strategy.charging":"Charging","strategy.usage_graph":"Consumption by source","strategy.solar_graph":"Solar production","strategy.devices_graph":"Consumption over time","strategy.distribution":"Power flow","strategy.not_loaded":"Set up the Electricity Lens integration to see this dashboard."},j5={title:"Bilanz","category.pv":"PV-Anlage","category.heat_pump":"W\xE4rmepumpe","category.wallbox":"E-Auto",show_yearly:"Jahreswerte zeigen",show_total:"Gesamtwerte zeigen",not_set_up:"Richte die Integration Electricity Lens ein, um zu sehen, was PV-Anlage, W\xE4rmepumpe und E-Auto gespart haben.",integration_unavailable:"Die Zahlen sind gerade nicht verf\xFCgbar. Pr\xFCfe Electricity Lens unter Einstellungen > Ger\xE4te & Dienste.",calculating_all:"Die Vergangenheit wird nachgerechnet \u2026",calculating:"Wird berechnet \u2026",loading:"Wird geladen \u2026",saved_invested:"{saved} gespart, {invested} investiert",saved_only:"{saved} gespart",of_investment:"{percent} von {investment}",paid_off:"amortisiert",since:"seit {date}",heat_estimated:"W\xE4rme teilweise gesch\xE4tzt",instead_heat_pump:"ohne Mehrkosten",instead_wallbox:"ohne Mehrkosten",instead_pv:"ohne Anschaffungskosten",in_the_plus_from:"Im Plus ab etwa {date}",in_the_plus:"Im Plus",yearly_after_twelve:"Jahreswerte gibt es nach zw\xF6lf Monaten Daten.",yearly_from:"Jahreswert ab {date}",pays_off_in:"amortisiert in etwa {years}",years_one:"1 Jahr",years_other:"{count} Jahren",under_one_year:"weniger als einem Jahr",return_per_year:"amortisiert, {percent} Rendite pro Jahr",instead_of_gas:"statt Gas",instead_of_oil:"statt \xD6l",instead_of_fuel:"statt Sprit",per_year:"{amount}/Jahr",gas:"Gas {price}/kWh",oil:"\xD6l {price}/l",fuel:"Sprit {price}/l",prices_link:"Preise \xE4ndern",progress:"{name}: {percent} der Investition gespart",savings_title:"Ersparnis",savings_note:"Wie in der Bilanz: Der Vorteil des PV-Stroms z\xE4hlt nur bei der PV-Anlage",savings_source:"Quelle",savings_energy:"Energie",savings_amount:"Betrag",savings_total:"Gesamt",savings_pv:"PV-Strom statt Netzstrom",savings_feed_in:"Einspeisung",savings_gas:"Strom statt Gas",savings_oil:"Strom statt \xD6l",savings_fuel:"Strom statt Sprit",savings_instead_gas:"Gasheizung h\xE4tte gekostet",savings_instead_oil:"\xD6lheizung h\xE4tte gekostet",savings_instead_fuel:"Verbrenner h\xE4tte gekostet",savings_electricity:"Stromkosten {name}",savings_solar_part:"davon durch PV",savings_area_note:"In der Bilanz z\xE4hlt der PV-Anteil bei der PV-Anlage",meters_consumer:"Verbraucher",meters_electricity:"Strom",history_title:"Ersparnisverlauf",history_savings_note:"Gegen\xFCber {list}",history_cost_note:"PV-Strom z\xE4hlt mit {rate}, ohne Grundpreis",history_cost_note_no_solar:"Ohne Grundpreis",history_bill_note:"Netzstrom und Grundpreis, ohne Einspeisung",history_saving_note:"Mit dem eigenen PV-Strom, den die Bilanz der PV-Anlage zurechnet",compare_pv:"Netzstrom",compare_gas:"Gasheizung",compare_oil:"\xD6lheizung",compare_fuel:"Verbrenner",history_total:"Summe",history_no_chart:"Das Diagramm erscheint nur in Home Assistant.",history_failed:"Die Statistik konnte nicht geladen werden.",history_empty:"Keine Ersparnis in diesem Zeitraum.",figures_failed:"Die Kennzahlen konnten nicht geladen werden.",figures_unavailable:"nicht verf\xFCgbar","figure.energy":"Verbrauch","figure.energy.grid":"Netzbezug","figure.energy.solar":"PV-Erzeugung","figure.cost":"Kosten","figure.cost.grid":"Netzkosten","figure.bill":"Stromrechnung","figure.grid_price":"\xF8 Netzpreis","figure.device_grid_price":"\xF8 Netzpreis","figure.price":"\xF8 Strompreis","figure.solar_share":"PV-Anteil","figure.solar_share.household":"Autarkie","figure.cheap_share":"G\xFCnstiger Netzstrom","figure.expensive_share":"Teurer Netzstrom","figure.cheap_saving":"Tarifersparnis","figure.self_consumption":"Eigenverbrauch","figure.export":"Einspeisung","figure.saving":"Ersparnis","figure.forecast_today":"Prognose heute","figure.forecast_tomorrow":"Prognose morgen","figure.heat":"W\xE4rme","figure.alternative_cost":"Vergleichskosten","figure.scop":"JAZ","figure.heat_price":"W\xE4rmepreis","figure.distance":"Strecke","figure.cost_per_100km":"Kosten pro 100 km",line_saving_split:"davon {solar} durch PV \xB7 in der Bilanz {saving}",line_bill:"Netz {imported} \u2212 Einspeisung {feed_in} + Grundpreis {charge}",line_bill_parts:"Netz {imported} + Grundpreis {charge}",line_bill_no_charge:"Netz {imported} \u2212 Einspeisung {feed_in}",line_against_normal:"gegen\xFCber dem Normalpreis",line_from_electricity:"aus {energy} Strom",line_heat_from:"{heat} W\xE4rme aus {energy}",line_cost_for_heat:"{cost} f\xFCr {heat} W\xE4rme",line_charged:"mit {energy} geladen",line_solar_part:"davon {percent} PV-Strom",line_energy_parts:"Netz {grid} + PV {solar}",line_exported:"{energy} eingespeist",line_average_price:"\xF8 {price}",line_for_import:"f\xFCr {energy} Netzbezug",line_cost_for:"{cost} f\xFCr {energy}",line_from_solar:"{part} von {whole} aus PV",line_of_grid:"{part} von {whole} Netzstrom",line_self_used:"{part} von {whole} im Haus genutzt","value.change":"Summe im Zeitraum","value.mean":"Mittelwert","value.min":"Minimum","value.max":"Maximum",value_range:"von {min} bis {max}","period.energy_date":"Der Datumsauswahl folgen","period.today":"Heute","period.yesterday":"Gestern","period.this_month":"Dieser Monat","period.last_month":"Letzter Monat","period.this_year":"Dieses Jahr","period.last_year":"Letztes Jahr","period.all":"Alle Jahre",editor_title:"Titel (optional)",editor_period:"Zeitraum",editor_period_hint:"Ohne Datumsauswahl auf dem Dashboard: dieser Monat.",editor_source:"Quelle","source.energy":"Energiedaten","source.statistic":"Statistik","source.entity":"Entit\xE4t",editor_area:"Bereich",editor_figure:"Gr\xF6\xDFe",editor_statistic:"Statistik",editor_value:"Wert",editor_secondary:"Unterzeile","secondary.none":"Standard","secondary.range":"Spanne im Zeitraum",editor_entity:"Entit\xE4t",editor_name:"Name (optional)",editor_not_loaded:"Energiedaten brauchen die Integration Electricity Lens.","source.solar":"PV-Strom","source.grid":"Netzstrom","source.normal":"Normaler Netzstrom","source.cheap":"G\xFCnstiger Netzstrom","source.expensive":"Teurer Netzstrom","source.export":"Einspeisung","source.standing_charge":"Grundpreis","stack.source":"Nach Quelle","stack.bill":"Stromrechnung","stack.consumer":"Nach Verbraucher","stack.none":"Nicht gestapelt",editor_savings:"Ersparnisse aller Kategorien",editor_stack:"Stapelung",editor_line:"Linie",editor_lines:"Weitere Linien aus Statistiken",editor_line_none:"Keine",history_empty_figure:"Keine Daten in diesem Zeitraum.",breakdown_mix:"Strommix",breakdown_cost_by_consumer:"Kosten nach Verbraucher",breakdown_energy_by_consumer:"Verbrauch nach Verbraucher",breakdown_total:"Gesamt","mix.solar":"PV","mix.grid":"Netz","mix.normal":"Netz normal","mix.cheap":"Netz g\xFCnstig","mix.expensive":"Netz teuer",editor_by:"Aufteilen","by.source":"Nach Quelle","by.consumer":"Nach Verbraucher",editor_display:"Darstellung","display.ring":"Ring","display.bars":"Balken",editor_color_by_source:"Balken nach Quelle f\xE4rben",editor_breakdown_source:"Quelle","breakdown_source.energy":"Energiedaten","breakdown_source.statistics":"Statistiken",editor_statistics:"Statistiken","figure_choice.energy":"Verbrauch","figure_choice.cost":"Kosten","strategy.title":"Strom","strategy.overview":"Jetzt","strategy.electricity":"Verbrauch","strategy.cost_today":"Kosten heute","strategy.self_sufficiency_today":"Autarkie heute","strategy.solar_today":"PV heute","strategy.consumption_today":"Verbrauch heute","strategy.charged_energy":"Geladene Energie","strategy.charging_cost":"Ladekosten","strategy.bill":"Stromrechnung","strategy.cost_with_solar":"Stromkosten inkl. PV","strategy.cost_history":"Kostenverlauf","strategy.cost_distribution":"Kostenverteilung","strategy.price_with_solar":"\xF8 Preis inkl. PV","strategy.costs":"Kosten","strategy.heating":"Heizen","strategy.charging":"Laden","strategy.usage_graph":"Verbrauch nach Quelle","strategy.solar_graph":"PV-Erzeugung","strategy.devices_graph":"Verbrauchsverlauf","strategy.distribution":"Stromfluss","strategy.not_loaded":"Richte die Integration Electricity Lens ein, um dieses Dashboard zu sehen."},q5={en:x2,de:j5},U=e=>e in x2;function S(e){let L=q5[e.split("-")[0]]??x2;return(C,H={})=>L[C].replace(/\{(\w+)\}/g,(V,M)=>H[M]??"")}var P=O`
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
`;var Y=["energy_date","today","yesterday","this_month","last_month","this_year","last_year"];function c2(e){if(!e)throw new Error("Invalid configuration");let{tiles:L,title:C,columns:H,...V}=e;if(L===void 0)return V;if(!Array.isArray(L)||L.length>1)throw new Error("Each key figure is its own card now: use one card per entry in tiles");let M=L[0]??{};return{...V,...M,...C&&!M.name?{name:C}:{}}}function $(e,L,C){let H=`figure.${L}.${C.kind}`,V=e(U(H)?H:`figure.${L}`);return["device","other","category"].includes(C.kind)?`${C.name} ${V}`:V}var Y5=300*1e3,u2=e=>e.toDateString();function J5(e){let L=new Date,C=u2(L),H=u2(new Date(L.getFullYear(),L.getMonth(),L.getDate()+1)),V={today:null,tomorrow:null};for(let M of Object.values(e??{}))for(let[r,t]of Object.entries(M.wh_hours??{})){let a=u2(new Date(r));a===C&&(V.today=(V.today??0)+t/1e3),a===H&&(V.tomorrow=(V.tomorrow??0)+t/1e3)}return V}var n1=class extends w{constructor(){super(...arguments);this._infoLoading=!1}static getStubConfig(){return{period:"energy_date",area:"household",figure:"cost"}}static getConfigElement(){return document.createElement("electricity-lens-figures-card-editor")}setConfig(C){this._config=c2(C)}getCardSize(){return 2}getGridOptions(){return{columns:6,min_columns:6}}connectedCallback(){super.connectedCallback(),this._follow()}disconnectedCallback(){super.disconnectedCallback(),this._unfollow?.(),this._unfollow=void 0,clearTimeout(this._retryTimer),this._retryTimer=void 0}_watched(){return[this._config?.entity,this._config?.statistic].filter(C=>C!==void 0)}get _localize(){return S(this.hass?.locale?.language??this.hass?.language??"en")}get _language(){return this.hass?.locale?.language??"en"}get _period(){return this._config?.period??"energy_date"}_follow(){this._period==="energy_date"&&(this._unfollow||!this.isConnected||!this.hass?.connection||(this._unfollow=Q(this.hass.connection,C=>{this._selected=C})))}_range(){let C=this._period;if(C!=="energy_date")return T(C);if(this._selected!==void 0)return this._selected??T("this_month")}_area(C){return this._info?.areas.find(H=>H.id===C)}_figure(C){let H=this._area(C.area);if(!(!H||!C.figure||!j(H).includes(C.figure)))return{area:H,figure:C.figure}}async _loadInfo(){!this.hass||this._infoLoading||(this._infoLoading=!0,this._info=await E(this.hass),this._infoLoading=!1,clearTimeout(this._retryTimer),this._retryTimer=void 0,this.isConnected&&(!this._info||this._info.calculating)&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),b)))}_request(){let C=this._range(),H=this._config;if(!C||!H)return;let V=z(H);if(V==="energy"&&!this._info)return;let M=new Set,r=new Set,t=!1;if(V==="statistic"&&H.statistic)M.add(H.statistic),r.add(H.statistic);else if(V==="energy"){let i=this._figure(H);i&&(t=j1(i.figure),this._info?.calculating||L5(i.area,i.figure).forEach(o=>M.add(o)))}let a=[...M].sort();return{key:JSON.stringify([a,C.start,C.end,t]),range:C,ids:a,statistics:[...r].sort(),forecast:t}}async _load(C){if(!this.hass)return;this._loading=C.key;let H=o1(q(C.range)),V={key:C.key,at:Date.now(),range:C.range,period:H,rows:{},metadata:{},forecast:{today:null,tomorrow:null},failed:!1};try{let[M,r,t]=await Promise.all([C.ids.length?this.hass.callWS({type:"recorder/statistics_during_period",start_time:new Date(C.range.start).toISOString(),end_time:new Date(C.range.end+1).toISOString(),statistic_ids:C.ids,period:H,types:["change","mean","min","max"],units:{energy:"kWh"}}):Promise.resolve({}),C.statistics.length?this.hass.callWS({type:"recorder/get_statistics_metadata",statistic_ids:C.statistics}):Promise.resolve([]),C.forecast?this.hass.callWS({type:"energy/solar_forecast"}):Promise.resolve({})]);V.rows=M,V.metadata=Object.fromEntries(r.map(a=>[a.statistic_id,a])),V.forecast=J5(t)}catch{V.failed=!0}this._loading===C.key&&(this._loading=void 0,this._loaded=V)}willUpdate(C){if(!this.hass)return;(C.has("hass")||C.has("_config"))&&this._follow(),this._info===void 0&&(this._info=D()),F()&&!this._infoLoading?this._loadInfo():this.isConnected&&this._info?.calculating&&!this._retryTimer&&!this._infoLoading&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),b));let H=this._request(),V=!this._loaded||Date.now()-this._loaded.at>Y5;H&&H.key!==this._loading&&(H.key!==this._loaded?.key||V&&!this._loading)&&this._load(H)}get _fmt(){return K(this.hass?.locale,this.hass?.config.currency??"EUR")}_number(C,H){return this._fmt.number(C,H)}_format(C,H){return this._fmt.value(C,H)}_rows(C){let H=this._loaded;if(!H)return[];let V=H.period==="hour"?0:12*36e5;return(H.rows[C]??[]).filter(M=>{let r=(typeof M.start=="number"?M.start:Date.parse(M.start))+V;return r>=H.range.start&&r<=H.range.end})}_sum(C){let H=0;for(let V of C??[])for(let M of this._rows(V))H+=M.change??0;return H}_energyCard(C){let H=this._localize,V=this._figure(C);if(!V){let A=`figure.${C.figure??""}`,n=C.name??(U(A)?H(A):C.figure??"");return this._info===void 0?this._card(n,"\u2026"):this._card(n,"\u2013",H("figures_unavailable"))}let{area:M,figure:r}=V,t=C.name??$(this._localize,r,M);if(this._info?.calculating&&!j1(r))return this._card(t,"\u2026",H("calculating"));if(!this._loaded)return this._card(t,"\u2026");if(this._loaded.failed)return this._card(t,"\u2013",H("figures_failed"));let a=r==="forecast_today"?this._loaded.forecast.today:r==="forecast_tomorrow"?this._loaded.forecast.tomorrow:null,i=a1(r,M,A=>M.statistics[A]?this._sum(M.statistics[A]):null,a),o=i.line?H(i.line.key,Object.fromEntries(Object.entries(i.line.values).map(([A,n])=>[A,this._format(n.value,n.unit)]))):void 0;return this._card(t,i.value===null?"\u2013":this._format(i.value,i.unit),C.secondary==="none"?void 0:o)}_statisticCard(C){let H=this._localize,V=C.statistic??"",M=this._loaded?.metadata[V],r=C.name??M?.name??this.hass?.states[V]?.attributes.friendly_name??V,t=this._rows(V),a=M?.unit_class==="energy"?"kWh":M?.statistics_unit_of_measurement??"",i=p=>p===null?"\u2013":`${this._number(p)}${a?` ${a}`:""}`,o=p=>t.map(l=>l[p]).filter(l=>typeof l=="number"),A=C.value??"change",n=null;if(A==="change")n=t.length?t.reduce((p,l)=>p+(l.change??0),0):null;else if(A==="mean"){let p=o("mean");n=p.length?p.reduce((l,c)=>l+c,0)/p.length:null}else{let p=o(A);n=p.length?A==="min"?Math.min(...p):Math.max(...p):null}let m=A==="change"?void 0:H(`value.${A}`);if(C.secondary==="range"){let p=o("min"),l=o("max");p.length&&l.length&&(m=H("value_range",{min:i(Math.min(...p)),max:i(Math.max(...l))}))}return this._loaded?.failed?this._card(r,"\u2013",H("figures_failed")):this._card(r,i(n),C.secondary==="none"?void 0:m)}_entityCard(C){let H=this._localize,V=this.hass?.states[C.entity??""],M=C.name??V?.attributes.friendly_name??C.entity??"";if(!V)return this._card(M,"\u2013",H("figures_unavailable"));let r=Number(V.state),t=this.hass?.config.currency??"",a=V.attributes.unit_of_measurement?.replace(t,t?this._fmt.currencySymbol():""),i=V.state!==""&&Number.isFinite(r),o=this._fmt.currencySymbol(),A=i?a&&a===o?this._format(r,"money"):`${this._number(r)}${a?` ${a}`:""}`:["unknown","unavailable",""].includes(V.state)?"\u2013":V.state;return this._card(M,A)}_card(C,H,V){let[M,r]=V5(H);return d`<ha-card lang=${this._language}>
      <div class="header"><h2 class="title">${C}</h2></div>
      <div class="stat">
        <div class="value">
          <span class="number">${M}</span>${r?d`<span class="unit">${r}</span>`:s}
        </div>
        ${V?d`<div class="line">${V}</div>`:s}
      </div>
    </ha-card>`}render(){if(!this.hass||!this._config)return d``;let C=z(this._config);return C==="statistic"?this._statisticCard(this._config):C==="entity"?this._entityCard(this._config):this._energyCard(this._config)}};n1.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0},_selected:{state:!0},_loaded:{state:!0}},n1.styles=[P,O`
      /* As the stat cards of the energy dashboards. */
      :host {
        display: block;
      }
      ha-card {
        box-sizing: border-box;
      }
      .title {
        font-size: var(--ha-font-size-l, 16px);
        line-height: var(--ha-line-height-normal, 24px);
        color: var(--secondary-text-color);
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
        font-size: var(--ha-font-size-3xl, 28px);
        font-weight: var(--ha-font-weight-medium, 500);
        line-height: 36px;
        letter-spacing: -0.02em;
      }
      .unit {
        font-size: var(--ha-font-size-m, 14px);
        color: var(--secondary-text-color);
      }
      .line {
        font-size: var(--ha-font-size-s, 12px);
        line-height: 16px;
        color: var(--secondary-text-color);
      }
    `];var X5=["energy","cost","saving","export","heat","distance","alternative_cost"],C3=["price","grid_price","solar_share","cheap_share","expensive_share","self_consumption","scop","heat_price","cost_per_100km"],O1=e=>X5.filter(L=>j(e).includes(L)),Z2=e=>C3.filter(L=>j(e).includes(L)||L==="grid_price"&&e.kind==="household");function d1(e,L){let C=[];return L==="energy"&&e.statistics.solar?.length&&C.push("source"),e.kind==="household"&&(L==="energy"||L==="cost")&&C.push("consumer"),e.kind==="household"&&L==="cost"&&C.push("source","bill"),e.kind==="category"&&(e.statistics.energy?.length??0)>1&&(L==="energy"||L==="cost"||(L==="heat"||L==="saving")&&(e.statistics.heat_meters?.length??0)>1)&&C.push("consumer"),C.push("none"),e.kind==="category"&&L==="cost"&&e.statistics.solar_cost?.length&&C.push("source"),C}function d5(e,L){let{alternative_cost:C,cost:H}=e.statistics;return L==="saving"&&C?.length&&H?.length?{plus:C,minus:H}:{plus:e.statistics[L]??[],minus:[]}}function J1(e){let L=new Set(e.areas.find(H=>H.id==="heat_pump")?.statistics.energy??[]),C=e.areas.filter(H=>H.kind==="device"&&H.statistics.heat?.length&&H.statistics.energy?.some(V=>L.has(V)));return C.length>1?C:[]}function H3(e,L,C){let H=e.areas.find(i=>i.kind==="grid")?.statistics??{},V=H.import_cost??[],M=H.feed_in??[],r=L.statistics.cheap_cost??[],t=L.statistics.expensive_cost??[],a=[{id:"standing_charge",name:{key:"source.standing_charge"},color:C.standing,plus:[...H.cost??[],...M],minus:V,floor:!0}];return r.length&&a.push({id:"cheap",name:{key:"source.cheap"},color:C.cheap,plus:r,minus:[]}),a.push({id:"grid",name:{key:r.length||t.length?"source.normal":"source.grid"},color:C.grid,plus:V,minus:[...r,...t],floor:!0}),t.length&&a.push({id:"expensive",name:{key:"source.expensive"},color:C.expensive,plus:t,minus:[]}),a}function V3(e,L,C){let H=a=>L.statistics[a]??[],V=H("cheap_cost"),M=H("expensive_cost"),r=[{id:"solar",name:{key:"source.solar"},color:C.solar,plus:H("solar_cost"),minus:[]}];V.length&&r.push({id:"cheap",name:{key:"source.cheap"},color:C.cheap,plus:V,minus:[]}),r.push({id:"grid",name:{key:V.length||M.length?"source.normal":"source.grid"},color:C.grid,plus:H("cost"),minus:[...H("solar_cost"),...V,...M],floor:!0}),M.length&&r.push({id:"expensive",name:{key:"source.expensive"},color:C.expensive,plus:M,minus:[]});let t=e.areas.find(a=>a.kind==="grid")?.statistics.feed_in??[];return L.kind==="household"&&t.length&&r.push({id:"export",name:{key:"source.export"},color:C.export,plus:t,minus:[],negative:!0}),r}function X1(e,L,C,H,V){let M=a=>L.statistics[a]??[],r=k(e,V);if(H==="bill"&&C==="cost")return H3(e,L,V);if(H==="source"&&C==="cost")return V3(e,L,V);if(H==="source"&&C==="energy"){let a=[{id:"solar",name:{key:"source.solar"},color:V.solar,plus:M("solar"),minus:[]}],i=["cheap","expensive"].filter(A=>M(A).length);M("cheap").length&&a.push({id:"cheap",name:{key:"source.cheap"},color:V.cheap,plus:M("cheap"),minus:[]}),a.push({id:"grid",name:{key:i.length?"source.normal":"source.grid"},color:V.grid,plus:M("energy"),minus:[...M("solar"),...i.flatMap(M)],floor:!0}),M("expensive").length&&a.push({id:"expensive",name:{key:"source.expensive"},color:V.expensive,plus:M("expensive"),minus:[]});let o=e.areas.find(A=>A.kind==="grid")?.statistics.export??[];return L.kind==="household"&&o.length&&a.push({id:"export",name:{key:"source.export"},color:V.export,plus:o,minus:[],negative:!0}),a}if(H==="consumer"){if(L.kind==="category"){let i=new Set(L.statistics.energy??[]);return e.areas.filter(o=>o.kind==="device"&&o.statistics.energy?.some(A=>i.has(A))).map(o=>({id:o.id,name:{text:o.name},color:r.get(o.id)??V.other,...d5(o,C)}))}let a=new Set(e.areas.filter(i=>i.kind==="category").flatMap(i=>i.statistics.energy??[]));return e.areas.filter(i=>i.kind==="category"&&(i.statistics.energy?.length??0)>0||i.kind==="device"&&i.top_level!==!1&&!i.statistics.energy?.some(o=>a.has(o))||i.kind==="other").map(i=>({id:i.id,name:{text:i.name},color:r.get(i.id)??V.other,plus:i.statistics[C]??[],minus:[]}))}let t=C==="export"?V.export:L.kind==="solar"?V.solar:r.get(L.id)??(C==="heat"?V.heat:C==="distance"?V.car:V.grid);return[{id:C,name:{text:L.name},color:t,...d5(L,C)}]}var L3=36e5;async function C2(e,L,C){if(!L.length)return{};let H=o1(q(C)),V=await e.callWS({type:"recorder/statistics_during_period",start_time:new Date(C.start).toISOString(),end_time:new Date(C.end+1).toISOString(),statistic_ids:L,period:H,types:["change"],units:{energy:"kWh"}}),M=H==="hour"?0:12*L3,r={};for(let t of L){r[t]=0;for(let a of V[t]??[]){let i=(typeof a.start=="number"?a.start:Date.parse(a.start))+M;i>=C.start&&i<=C.end&&(r[t]+=a.change??0)}}return r}var M3=300*1e3,e3="240px",r3="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z",t3="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z",p1=class extends w{constructor(){super(...arguments);this._config={type:""};this._infoLoading=!1;this._watchingChart=!1;this._hidden=new Set}static getStubConfig(){return{area:"household",by:"source",figure:"energy",display:"ring"}}static getConfigElement(){return document.createElement("electricity-lens-breakdown-card-editor")}setConfig(C){if(C?.statistics!==void 0&&!Array.isArray(C.statistics))throw new Error("statistics must be a list");this._config=C??{type:""}}getCardSize(){return 4}getGridOptions(){return{columns:6,min_columns:4}}connectedCallback(){super.connectedCallback(),this._follow()}disconnectedCallback(){super.disconnectedCallback(),this._unfollow?.(),this._unfollow=void 0,clearTimeout(this._retryTimer),this._retryTimer=void 0}get _localize(){return S(this.hass?.locale?.language??this.hass?.language??"en")}get _language(){return this.hass?.locale?.language??"en"}get _fmt(){return K(this.hass?.locale,this.hass?.config.currency??"EUR")}get _byStatistics(){return!!this._config.statistics?.length}_follow(){(this._config.period??"energy_date")==="energy_date"&&(this._unfollow||!this.isConnected||!this.hass?.connection||(this._unfollow=Q(this.hass.connection,C=>{this._selected=C})))}_range(){let C=this._config.period??"energy_date";if(C!=="energy_date")return T(C);if(this._selected!==void 0)return this._selected??T("this_month")}_area(){return this._info?.areas.find(C=>C.id===(this._config.area??"household"))}get _by(){let C=this._area();return this._config.by==="consumer"&&(C?.kind==="household"||C?.kind==="category"&&(C.statistics.energy?.length??0)>1)?"consumer":C?.statistics.solar?.length?"source":"consumer"}get _figure(){return this._by==="consumer"&&this._config.figure==="cost"?"cost":"energy"}_series(){let C=this._info,H=this._area();return!C||!H?[]:X1(C,H,this._figure,this._by==="source"?"source":"consumer",y(this)).filter(V=>!V.negative)}_ids(){let C=new Set;if(this._byStatistics)this._config.statistics?.forEach(H=>C.add(H.statistic));else{for(let H of this._series())[...H.plus,...H.minus].forEach(V=>C.add(V));if(this._by==="consumer"&&this._info)for(let H of this._series()){let V=this._info.areas.find(M=>M.id===H.id);for(let M of["energy","solar","cheap","expensive","cost","solar_cost","cheap_cost","expensive_cost"])(V?.statistics[M]??[]).forEach(r=>C.add(r))}}return[...C].sort()}async _loadInfo(){!this.hass||this._infoLoading||(this._infoLoading=!0,this._info=await E(this.hass),this._infoLoading=!1,clearTimeout(this._retryTimer),this._retryTimer=void 0,this.isConnected&&(!this._info||this._info.calculating)&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),b)))}async _load(C,H,V){if(!this.hass)return;this._loading=C;let M={key:C,at:Date.now(),values:{},names:{},failed:!1};try{let r=this._byStatistics?H:[],[t,a]=await Promise.all([C2(this.hass,H,V),r.length?this.hass.callWS({type:"recorder/get_statistics_metadata",statistic_ids:r}):Promise.resolve([])]);M.values=t,M.names=Object.fromEntries(a.map(i=>[i.statistic_id,i.name||this.hass?.states[i.statistic_id]?.attributes.friendly_name||i.statistic_id]))}catch{M.failed=!0}this._loading===C&&(this._loading=void 0,this._sums=M)}willUpdate(C){if(!this.hass||((C.has("hass")||C.has("_config"))&&this._follow(),this._watchingChart||(this._watchingChart=!0,Q1(t=>{this._hasChart=t})),this._info===void 0&&(this._info=D()),F()&&!this._infoLoading&&this._loadInfo(),!this._byStatistics&&(this.isConnected&&this._info?.calculating&&!this._retryTimer&&!this._infoLoading&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),b)),!this._info||this._info.calculating)))return;let H=this._range();if(!H)return;let V=this._ids();if(!V.length)return;let M=JSON.stringify([V,H.start,H.end]),r=!this._sums||Date.now()-this._sums.at>M3;M!==this._loading&&(M!==this._sums?.key||r&&!this._loading)&&this._load(M,V,H)}_sum(C){return C.reduce((H,V)=>H+(this._sums?.values[V]??0),0)}_parts(){let C=this._localize;if(this._byStatistics){let V=y(this),M=this._info?k(this._info,V):new Map;return(this._config.statistics??[]).map((r,t)=>{let a=this._info?.areas.find(i=>i.kind==="device"&&(i.statistics.energy?.[0]===r.statistic||i.statistics.heat?.[0]===r.statistic));return{id:r.statistic,name:r.name??a?.name??this._sums?.names[r.statistic]??r.statistic,color:(a&&M.get(a.id))??V.consumers[t%V.consumers.length],value:this._sum([r.statistic])}})}let H=this._series().map(V=>{let M=this._sum(V.plus)-this._sum(V.minus),r=V.name.key?.replace(/^source\./,"mix."),t=V.name.text??(r&&U(r)?C(r):V.name.key&&U(V.name.key)?C(V.name.key):V.id),a={id:V.id,name:t,color:V.color,value:V.floor?Math.max(M,0):M};if(this._by==="consumer"&&this._info){let i=y(this),o=this._info.areas.find(A=>A.id===V.id);if(o){let A=Z=>this._sum(o.statistics[Z]??[]),n=A("energy"),m=A("solar"),p=A("cheap"),l=A("expensive");a.energy=n;let c=this._figure==="cost",x={solar:c?A("solar_cost"):m,cheap:c?A("cheap_cost"):p,expensive:c?A("expensive_cost"):l};a.mix=[{color:i.solar,value:x.solar},{color:i.cheap,value:x.cheap},{color:i.grid,value:Math.max((c?A("cost"):n)-x.solar-x.cheap-x.expensive,0)},{color:i.expensive,value:x.expensive}]}}return a});return this._by==="consumer"?H.sort((V,M)=>M.value-V.value):H}_value(C){return this._figure==="cost"&&!this._byStatistics?this._fmt.value(C,"money"):this._fmt.value(C,"energy")}_title(){let C=this._localize;return this._config.title?this._config.title:this._byStatistics?"":(this._area()?this._by:this._config.by??"source")==="source"?C("breakdown_mix"):C(this._figure==="cost"?"breakdown_cost_by_consumer":"breakdown_energy_by_consumer")}_ring(C){let H=this._localize;if(this._hasChart===void 0)return d`<p class="summary">${H("loading")}</p>`;if(!this._hasChart)return d`<p class="summary">${H("history_no_chart")}</p>`;let V=this._figure==="cost"&&!this._byStatistics,M=y(this).line,r=getComputedStyle(this).getPropertyValue("--primary-text-color").trim()||"#212121",t=JSON.stringify([C,[...this._hidden],V,M,r,this.hass?.locale]);this._ringChart?.key!==t&&(this._ringChart={key:t,chart:J2({items:C,total:H("breakdown_total"),format:A=>this._value(A),percent:A=>this._fmt.value(A,"percent"),centerColor:M,labelColor:r,hidden:this._hidden})});let{chart:a}=this._ringChart,i=p2(C.map(A=>this._hidden.has(A.id)?0:A.value)),o=A=>{let n=new Set(this._hidden);n.has(A)?n.delete(A):n.add(A),this._hidden=n};return d`<div class="ring">
      ${Q2(V,d`<ha-chart-base
          .hass=${this.hass}
          .data=${a.data}
          .options=${a.options}
          .height=${e3}
        ></ha-chart-base>`)}
      <div class="chart-legend">
        <ul>
          ${C.map((A,n)=>{let m=this._hidden.has(A.id),p=this._fmt.value(i[n],"percent");return d`<li class=${m?"hidden":""}>
              <button
                type="button"
                class="leg"
                aria-pressed=${String(!m)}
                aria-label="${A.name}: ${p}"
                @click=${()=>o(A.id)}
              >
                <svg class="icon" viewBox="0 0 24 24" style="color: ${m?"var(--secondary-text-color)":A.color}">
                  <path fill="currentColor" d=${m?t3:r3}></path>
                </svg>
                <span class="label">${A.name}</span>
                <span class="value">${p}</span>
              </button>
            </li>`})}
        </ul>
      </div>
    </div>`}_bars(C){let H=C.filter(t=>this._value(t.value)!==this._value(0)),V=Math.max(...H.map(t=>t.value),0),M=this._config.color_by_source===!0&&this._by==="consumer",r=this._localize;return d`<div class="bars">
      ${H.map(t=>{let a=V>0?Math.max(t.value/V*100,0):0,i=t.mix?.reduce((A,n)=>A+n.value,0)??0,o="";return this._figure==="cost"&&t.energy!==void 0&&(o=this._fmt.value(t.energy,"energy"),t.energy>0&&(o+=` \xB7 ${r("line_average_price",{price:this._fmt.value(t.value/t.energy,"price")})}`)),d`<div class="bar-row">
          <div class="bar-text">
            <span class="name">${t.name}</span>
            <span class="amount">${this._value(t.value)}</span>
          </div>
          ${o?d`<div class="bar-line">${o}</div>`:s}
          <div class="track">
            <div class="fill" style="width: ${a}%; ${M?"":`--c: ${t.color}`}">
              ${M&&t.mix&&i>0?t.mix.map(A=>d`<span style="width: ${A.value/i*100}%; --c: ${A.color}"></span>`):s}
            </div>
          </div>
        </div>`})}
      ${M?d`<div class="key">
            ${["solar","cheap","grid","expensive"].filter(t=>(t!=="cheap"||this._info?.levels.cheap_until!=null)&&(t!=="expensive"||this._info?.levels.expensive_from!=null)).map(t=>d`<span><span class="dot" style="--c: ${M1[t]}"></span>${r(t==="grid"?this._info?.levels.cheap_until!=null||this._info?.levels.expensive_from!=null?"source.normal":"source.grid":`source.${t}`)}</span>`)}
          </div>`:s}
    </div>`}render(){if(!this.hass)return d``;let C=this._localize,H=this._range(),V=this._sums?this._parts():[],M=V.reduce((n,m)=>n+Math.max(m.value,0),0),r=!this._byStatistics&&this._info?.calculating===!0,t=!this._byStatistics&&this._info!==void 0&&!this._area(),a=this._config.display??(!this._byStatistics&&this._by==="consumer"?"bars":"ring"),i=(this._config.period??"energy_date")==="energy_date",o=H&&!(a==="bars"&&i)?q1(H,this._language):"",A;return r?A=d`<p class="summary">${C("calculating_all")}</p>`:t?A=d`<p class="summary">${C(this._info===null?"editor_not_loaded":"figures_unavailable")}</p>`:this._sums?.failed?A=d`<p class="summary">${C("figures_failed")}</p>`:this._sums?M<=0?A=d`<p class="summary">${C("history_empty_figure")}</p>`:A=a==="bars"?this._bars(V):this._ring(V):A=d`<p class="summary">${C("loading")}</p>`,d`<ha-card>
      <div class="header">
        <h2 class="title">${this._title()}</h2>
        ${o?d`<span class="chip">${o}</span>`:s}
      </div>
      ${A}
    </ha-card>`}};p1.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0},_selected:{state:!0},_sums:{state:!0},_hasChart:{state:!0},_hidden:{state:!0}},p1.styles=[P,O`
      .header {
        min-height: 32px;
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
      .track {
        height: 12px;
        margin-top: 6px;
        border-radius: var(--ha-bar-border-radius, var(--ha-border-radius-sm, 4px));
        overflow: hidden;
        background-color: var(
          --ha-bar-background-color,
          var(--secondary-background-color)
        );
      }
      .fill {
        display: flex;
        height: 100%;
        border-radius: var(--ha-bar-border-radius, var(--ha-border-radius-sm, 4px));
        overflow: hidden;
      }
      .fill span {
        height: 100%;
      }
      /* HA's energy look: the color at half strength, framed by the full color. */
      .fill,
      .fill span,
      .dot {
        background: color-mix(in srgb, var(--c, transparent) 50%, transparent);
        box-shadow: inset 0 0 0 1px var(--c, transparent);
      }
      .key {
        display: flex;
        flex-wrap: wrap;
        gap: 4px 16px;
        font-size: 12px;
        color: var(--secondary-text-color);
      }
    `];var m1=e=>({select:{mode:"dropdown",options:e}}),i3=e=>e.kind==="household"||!!e.statistics.solar?.length,y1=class extends g{constructor(){super(...arguments);this._label=C=>this._localize(`editor_${C.name}`)}setConfig(C){this._config=C}get _localize(){return S(this.hass?.locale?.language??this.hass?.language??"en")}willUpdate(){this.hass&&this._info===void 0&&(this._info=null,this.hass.callWS({type:`${h}/figures`}).then(C=>{this._info=C}).catch(()=>{}))}_data(){let C=this._config??{type:""},H=!!C.statistics?.length||C.statistics!==void 0&&!C.area;return{title:C.title??"",period:C.period??"energy_date",source:H?"statistics":"energy",area:C.area??"household",by:C.by??"source",figure:C.figure??"energy",display:C.display??(!H&&C.by==="consumer"?"bars":"ring"),color_by_source:C.color_by_source??!1,statistics:(C.statistics??[]).map(V=>V.statistic)}}_schema(C){let H=this._localize,V=[{name:"title",selector:{text:{}}},{name:"period",selector:m1(Y.map(M=>({value:M,label:H(`period.${M}`)})))},{name:"breakdown_source",selector:m1(["energy","statistics"].map(M=>({value:M,label:H(`breakdown_source.${M}`)})))}];if(C.source==="statistics")V.push({name:"statistics",selector:{statistic:{multiple:!0}}});else{let M=(this._info?.areas??[]).filter(i3),r=M.find(a=>a.id===C.area),t=[...r?.statistics.solar?.length?["source"]:[],...r?.kind==="household"?["consumer"]:[]];V.push({name:"area",selector:m1(M.map(a=>({value:a.id,label:a.name})))},{name:"by",selector:m1(t.map(a=>({value:a,label:H(`by.${a}`)})))}),C.by==="consumer"&&V.push({name:"figure",selector:m1(["energy","cost"].map(a=>({value:a,label:H(`figure_choice.${a}`)})))})}return V.push({name:"display",selector:m1(["ring","bars"].map(M=>({value:M,label:H(`display.${M}`)})))}),C.source!=="statistics"&&C.by==="consumer"&&C.display==="bars"&&V.push({name:"color_by_source",selector:{boolean:{}}}),V}_changed(C){if(!this._config)return;let H={...this._data(),...C.detail.value};"breakdown_source"in C.detail.value&&(H.source=C.detail.value.breakdown_source);let V={type:this._config.type};if(typeof H.title=="string"&&H.title&&(V.title=H.title),V.period=H.period??"energy_date",H.source==="statistics"){let M=new Map((this._config.statistics??[]).map(t=>[t.statistic,t])),r=Array.isArray(H.statistics)?H.statistics.filter(Boolean):[];V.statistics=r.map(t=>M.get(t)??{statistic:t})}else{V.area=H.area??"household";let M=this._info?.areas.find(a=>a.id===V.area),r=M?.kind==="household",t=!!M?.statistics.solar?.length;V.by=H.by==="consumer"&&r?"consumer":t?"source":"consumer",V.by==="consumer"&&H.figure==="cost"?V.figure="cost":V.figure="energy"}V.display=H.display==="bars"?"bars":"ring",V.by==="consumer"&&V.display==="bars"&&H.color_by_source===!0&&(V.color_by_source=!0),this._config=V,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:V},bubbles:!0,composed:!0}))}render(){if(!this.hass||!this._config)return d``;let C=this._data();return d`<ha-form
      .hass=${this.hass}
      .data=${{...C,breakdown_source:C.source}}
      .schema=${this._schema(C)}
      .computeLabel=${this._label}
      @value-changed=${this._changed}
    ></ha-form>`}};y1.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0}};var p5="M7 11H9V13H7V11M21 5V19C21 20.11 20.11 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H6V1H8V3H16V1H18V3H19C20.11 3 21 3.9 21 5M5 7H19V5H5V7M19 19V9H5V19H19M15 13V11H17V13H15M11 13V11H13V13H11M7 15H9V17H7V15M15 17V15H17V17H15M11 17V15H13V17H11Z";var m5="M18,6H8.83L14.83,12L8.83,18H18V20H6V18L12,12L6,6V4H18V6Z";var l5="electricity-lens-balance-card-view",a3=()=>{try{return localStorage.getItem(l5)==="yearly"?"yearly":"total"}catch{return"total"}},l1=class extends w{constructor(){super(...arguments);this._view=a3();this._infoLoading=!1}static getStubConfig(){return{}}static getConfigForm(){return{schema:[]}}setConfig(C){}getCardSize(){return 4}getGridOptions(){return{columns:12,min_columns:6}}get _localize(){return S(this.hass?.locale?.language??this.hass?.language??"en")}get _language(){return this.hass?.locale?.language??"en"}_money(C,H=!1){return R(this.hass?.locale,{style:"currency",currency:this.hass?.config.currency??"EUR",maximumFractionDigits:0,minimumFractionDigits:0,signDisplay:H?"exceptZero":"auto"}).format(C)}_price(C){return R(this.hass?.locale,{style:"currency",currency:this.hass?.config.currency??"EUR",maximumFractionDigits:4,minimumFractionDigits:2}).format(C)}_percent(C){return R(this.hass?.locale,{style:"percent",maximumFractionDigits:0}).format(C/100)}_month(C){return new Intl.DateTimeFormat(this._language,{month:"long",year:"numeric"}).format(C)}_years(C){let H=this._localize;if(C<1)return H("under_one_year");let V=Math.round(C);return V===1?H("years_one"):H("years_other",{count:String(V)})}_toggleView(){this._view=this._view==="total"?"yearly":"total";try{localStorage.setItem(l5,this._view)}catch{}}_openIntegration(){history.pushState(null,"",`/config/integrations/integration/${h}`),window.dispatchEvent(new CustomEvent("location-changed"))}willUpdate(){this.hass&&(this._info===void 0&&(this._info=D()),F()&&!this._infoLoading&&(this._infoLoading=!0,E(this.hass).then(C=>{this._info=C,this._infoLoading=!1})))}render(){let C=this._localize;if(!this.hass)return d``;let H=_(this.hass);if(!H.length)return d`<ha-card>
        <div class="header"><h2 class="title">${C("title")}</h2></div>
        <p class="summary">${C(A1(this.hass))}</p>
      </ha-card>`;let V=a5(H),M=this._view==="yearly",r=this._info?k(this._info,y(this)):void 0;return d`<ha-card>
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
            <path d=${M?m5:p5}></path>
          </svg>
        </button>
      </div>
      <p class="summary">${this._summary(V,H,M)}</p>
      <ul class="rows">
        ${H.map(t=>this._row(t,M,r?.get(t.category)))}
      </ul>
      ${this._footer(H)}
    </ha-card>`}_chip(C,H){let V=this._localize,M=null;return H?C.perYear!==null&&(M=V("per_year",{amount:this._money(C.perYear,!0)})):C.balance!==null?M=this._money(C.balance,!0):C.calculating||(M=this._money(C.saved)),M===null?s:d`<span class="chip">${M}</span>`}_summary(C,H,V){let M=this._localize;return C.calculating?M("calculating_all"):V?C.inThePlusFrom===null?H.some(r=>r.perYear===null)?M("yearly_after_twelve"):"":C.balance!==null&&C.balance>=0?M("in_the_plus"):M("in_the_plus_from",{date:this._month(C.inThePlusFrom)}):C.invested>0?M("saved_invested",{saved:this._money(C.saved),invested:this._money(C.invested)}):M("saved_only",{saved:this._money(C.saved)})}_row(C,H,V){let M=this._localize,r=M(`category.${C.category}`),t="\u2013";return C.calculating||(H&&C.perYear!==null?t=M("per_year",{amount:this._money(C.perYear)}):!H&&C.saving!==null&&(t=this._money(C.saving))),d`<li class="row ${C.category}" style=${V?`--color: ${V}`:""}>
      <span class="swatch" aria-hidden="true"></span>
      <div class="row-body">
        <div class="line">
          <span>${r}</span>
          <span class="amount ${t==="\u2013"?"waiting":""}">${t}</span>
        </div>
        <div class="sub">
          ${C.calculating?M("calculating"):H?this._yearlyDetail(C):this._totalDetail(C,r)}
        </div>
        ${C.calculating?s:this._since(C,H)}
      </div>
    </li>`}_since(C,H){let V=this._localize,M=[];return C.countingSince&&M.push(V("since",{date:this._month(C.countingSince)})),!H&&C.perYear!==null&&M.push(V("per_year",{amount:this._money(C.perYear)})),C.heatEstimated&&M.push(V("heat_estimated")),M.length?d`<div class="sub since">${M.join(" \xB7 ")}</div>`:s}_totalDetail(C,H){let V=this._localize;if(C.investment&&C.payback!==null){let M=Math.max(0,C.payback),r=this._percent(C.payback);return d`<div class="meter">
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
      </div>`}return V(`instead_${C.category}`)}_yearlyDetail(C){let H=this._localize;if(C.perYear===null)return C.yearlyFrom?H("yearly_from",{date:this._month(C.yearlyFrom)}):"";let V=A5(C);if(V!==null)return H("return_per_year",{percent:this._percent(V)});let M=o5(C);return M!==null?H("pays_off_in",{years:this._years(M)}):C.category==="heat_pump"?H(C.heating==="oil"?"instead_of_oil":"instead_of_gas"):C.category==="wallbox"?H("instead_of_fuel"):""}_footer(C){let H=this._localize,V=[];for(let M of C){if(M.price===null)continue;let r=this._price(M.price);M.category==="heat_pump"&&V.push(H(M.heating==="oil"?"oil":"gas",{price:r})),M.category==="wallbox"&&V.push(H("fuel",{price:r}))}return V.length?d`<div class="footer">
      <button
        class="prices"
        type="button"
        title=${H("prices_link")}
        aria-label=${`${H("prices_link")}: ${V.join(", ")}`}
        @click=${this._openIntegration}
      >
        ${V.join(" \xB7 ")}
      </button>
    </div>`:s}};l1.properties={hass:{attribute:!1},_view:{state:!0},_info:{state:!0}},l1.styles=[P,O`
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
        --color: var(--electricity-lens-pv-color);
      }
      .heat_pump {
        --color: var(--electricity-lens-heat-pump-color);
      }
      .wallbox {
        --color: var(--electricity-lens-wallbox-color);
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
        margin-top: 6px;
      }
      .bar {
        flex: 1;
        height: 12px;
        border-radius: var(--ha-bar-border-radius, var(--ha-border-radius-sm, 4px));
        background-color: var(
          --ha-bar-background-color,
          var(--secondary-background-color)
        );
        overflow: hidden;
      }
      .bar i {
        display: block;
        height: 100%;
        border-radius: var(--ha-bar-border-radius, var(--ha-border-radius-sm, 4px));
        /* HA's energy look, as the swatch: half strength, framed by the full color. */
        background: color-mix(in srgb, var(--color) 50%, transparent);
        box-shadow: inset 0 0 0 1px var(--color);
      }
      .meter span {
        flex: none;
        white-space: nowrap;
        font-size: 12px;
        line-height: 16px;
        color: var(--secondary-text-color);
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
    `];var o3=300*1e3,I=(e,L)=>(L??[]).reduce((C,H)=>C+(e[H]??0),0),r1=class extends w{constructor(){super(...arguments);this._infoLoading=!1}getCardSize(){return 4}getGridOptions(){return{columns:12,min_columns:6}}connectedCallback(){super.connectedCallback(),this._follow()}disconnectedCallback(){super.disconnectedCallback(),this._unfollow?.(),this._unfollow=void 0,clearTimeout(this._retryTimer),this._retryTimer=void 0}get _localize(){return S(this.hass?.locale?.language??this.hass?.language??"en")}get _fmt(){return K(this.hass?.locale,this.hass?.config.currency??"EUR")}_follow(){this._unfollow||!this.isConnected||!this.hass?.connection||(this._unfollow=Q(this.hass.connection,C=>{this._selected=C}))}async _loadInfo(){!this.hass||this._infoLoading||(this._infoLoading=!0,this._info=await E(this.hass),this._infoLoading=!1,clearTimeout(this._retryTimer),this._retryTimer=void 0,this.isConnected&&(!this._info||this._info.calculating)&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),b)))}async _load(C,H,V){if(!this.hass)return;this._loading=C;let M=null;try{M=await C2(this.hass,H,V)}catch{}this._loading===C&&(this._loading=void 0,this._sums={key:C,at:Date.now(),values:M})}willUpdate(){if(!this.hass||(this._follow(),this._info===void 0&&(this._info=D()),F()&&!this._infoLoading&&this._loadInfo(),this._selected===void 0||!this._info||this._info.calculating))return;let C=this._selected??T("this_month"),H=[...new Set(this._ids())].sort();if(!H.length)return;let V=JSON.stringify([H,C.start,C.end]),M=!this._sums||Date.now()-this._sums.at>o3;V!==this._loading&&(V!==this._sums?.key||M&&!this._loading)&&this._load(V,H,C)}_waiting(){if(!this.hass)return;let C=_(this.hass);return C.length?C.some(H=>H.calculating)||this._info?.calculating?"calculating_all":this._info===null?"editor_not_loaded":this._info===void 0?"loading":this._ids().length?this._sums?this._sums.values?void 0:"history_failed":"loading":"figures_unavailable":A1(this.hass)}};r1.properties={hass:{attribute:!1},_info:{state:!0},_selected:{state:!0},_sums:{state:!0}};var H2=O`
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
`;var _1=class extends r1{static getStubConfig(){return{}}static getConfigForm(){return{schema:[]}}setConfig(L){}get _devices(){return this._info?J1(this._info).sort((L,C)=>L.name.localeCompare(C.name,this.hass?.locale?.language)):[]}_ids(){return this._devices.flatMap(L=>[...L.statistics.heat??[],...L.statistics.energy??[]])}render(){let L=this._localize;if(!this.hass)return d``;let C=this._waiting(),H=this._devices,V=H.length?H.map(M=>M.name).join(" & "):L("figure.heat");return d`<ha-card>
      <div class="header"><h2 class="title">${V}</h2></div>
      ${C?d`<p class="summary">${L(C)}</p>`:this._table()}
    </ha-card>`}_table(){let L=this._localize,C=this._fmt,H=this._sums?.values??{},V=k(this._info,y(this));return d`<table>
      <thead>
        <tr>
          <th scope="col" colspan="2" class="name">${L("meters_consumer")}</th>
          <th scope="col">${L("figure.heat")}</th>
          <th scope="col">${L("meters_electricity")}</th>
          <th scope="col">${L("figure.scop")}</th>
        </tr>
      </thead>
      <tbody>
        ${this._devices.map(M=>{let r=I(H,M.statistics.heat),t=I(H,M.statistics.energy);return d`<tr>
            <td class="swatch-cell">
              <span class="swatch" style="--color: ${V.get(M.id)??""}" aria-hidden="true"></span>
            </td>
            <td class="name">${M.name}</td>
            <td>${C.value(r,"energy")}</td>
            <td>${C.value(t,"energy")}</td>
            <td>${t>0?C.number(r/t,2):"\u2013"}</td>
          </tr>`})}
      </tbody>
    </table>`}};_1.styles=[P,H2];var A3=300*1e3,n3="200px",d3={energy:"energy",cost:"money",saving:"money",export:"energy",heat:"energy",distance:"distance",alternative_cost:"money"},s1=class extends w{constructor(){super(...arguments);this._config={type:""};this._infoLoading=!1;this._watchingChart=!1}static getStubConfig(){return{}}static getConfigElement(){return document.createElement("electricity-lens-history-card-editor")}setConfig(C){this._config=C??{type:""}}getCardSize(){return 5}getGridOptions(){return{columns:12,min_columns:6}}connectedCallback(){super.connectedCallback(),this._follow()}disconnectedCallback(){super.disconnectedCallback(),this._unfollow?.(),this._unfollow=void 0,clearTimeout(this._retryTimer),this._retryTimer=void 0}get _localize(){return S(this.hass?.locale?.language??this.hass?.language??"en")}get _language(){return this.hass?.locale?.language??"en"}get _fmt(){return K(this.hass?.locale,this.hass?.config.currency??"EUR")}get _savings(){return!this._config.area}_follow(){(this._config.period??"energy_date")==="energy_date"&&(this._unfollow||!this.isConnected||!this.hass?.connection||(this._unfollow=Q(this.hass.connection,C=>{this._selected=C})))}async _loadInfo(){!this.hass||this._infoLoading||(this._infoLoading=!0,this._info=await E(this.hass),this._infoLoading=!1,clearTimeout(this._retryTimer),this._retryTimer=void 0,this.isConnected&&(!this._info||this._info.calculating)&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),b)))}_range(C){let H=this._config.period??"energy_date";if(H==="all")return{range:C(),period:"year"};if(H!=="energy_date"){let M=T(H);return{range:M,period:q(M)}}if(this._selected===void 0)return;if(this._selected)return{range:this._selected,period:q(this._selected)};let V=C();return{range:V,period:this._savings?"year":q(V)}}_savingsPlan(){if(!this.hass)return;let C=this._localize,H=_(this.hass);if(!H.length||H.some(i=>i.calculating))return;let V=this._range(()=>r5(H.map(i=>i.countingSince)));if(!V)return;let M=y(this),r=this._info?k(this._info,M):void 0,t={pv:M.solar,heat_pump:r?.get("heat_pump")??M.heat,wallbox:r?.get("wallbox")??M.car},a=H.map(i=>({series:{id:i.category,name:{},color:t[i.category],plus:[i.savingStatistic],minus:[]},name:C(`category.${i.category}`)}));return this._plan(V,a,"money",void 0,[])}_figurePlan(){let C=this._info,H=this._config;if(!C||C.calculating)return;let V=C.areas.find(p=>p.id===H.area),M=H.figure??"energy";if(!V||!V.statistics[M]?.length)return;let r=this._range(()=>T("this_month"));if(!r)return;let t=this._localize,a=d1(V,M),i=H.stack&&a.includes(H.stack)?H.stack:a[0],o=X1(C,V,M,i,y(this)).map(p=>({series:p,name:p.name.text??(p.name.key&&U(p.name.key)?t(p.name.key):p.id)}));o.length===1&&(o[0].name=$(t,M,V));let A=H.line==="grid_price"?C.areas.find(p=>p.kind==="grid")??V:V,n=H.line&&V.statistics?{figure:H.line,area:A,name:H.line_name??$(t,H.line,A)}:void 0,m=M==="cost"?[...V.statistics.solar??[],...V.statistics.solar_cost??[]]:[];return this._plan(r,o,d3[M],n,H.lines??[],m)}_plan(C,H,V,M,r,t=[]){let a=new Set(t);for(let{series:o}of H)[...o.plus,...o.minus].forEach(A=>a.add(A));if(M)for(let o of Object.values(M.area.statistics))(o??[]).forEach(A=>a.add(A));r.forEach(o=>a.add(o.statistic));let i=[...a].sort();return{key:JSON.stringify([i,H.map(o=>[o.series.id,o.series.color]),M?.figure,r,C.range.start,C.range.end,C.period]),range:C.range,period:C.period,bars:H,unit:V,lineFigure:M,lines:r,ids:i}}async _load(C){if(!this.hass)return;this._loading=C.key;let H={key:C.key,at:Date.now(),plan:C,slots:e5(C.range,C.period),rows:{},metadata:{},failed:!1};try{let V=C.lines.map(t=>t.statistic),[M,r]=await Promise.all([this.hass.callWS({type:"recorder/statistics_during_period",start_time:new Date(C.range.start).toISOString(),end_time:new Date(C.range.end+1).toISOString(),statistic_ids:C.ids,period:o1(C.period),types:["change","mean"],units:{energy:"kWh"}}),V.length?this.hass.callWS({type:"recorder/get_statistics_metadata",statistic_ids:V}):Promise.resolve([])]);H.rows=M,H.metadata=Object.fromEntries(r.map(t=>[t.statistic_id,t]))}catch{H.failed=!0}this._loading===C.key&&(this._loading=void 0,this._loaded=H)}willUpdate(C){if(!this.hass)return;(C.has("hass")||C.has("_config"))&&this._follow(),this._watchingChart||(this._watchingChart=!0,Q1(M=>{this._hasChart=M})),this._info===void 0&&(this._info=D()),F()&&!this._infoLoading?this._loadInfo():!this._savings&&this.isConnected&&this._info?.calculating&&!this._retryTimer&&!this._infoLoading&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),b));let H=this._savings?this._savingsPlan():this._figurePlan(),V=!this._loaded||Date.now()-this._loaded.at>A3;H&&H.key!==this._loading&&(H.key!==this._loaded?.key||V&&!this._loading)&&this._load(H),C.has("_loaded")&&(this._chart=this._buildChart())}_perSlot(C){let H=this._loaded;if(!H)return[];let V=H.slots.map(()=>null);for(let M of C)l2(H.rows[M],H.slots,H.plan.period).forEach((r,t)=>{r!==null&&(V[t]=(V[t]??0)+r)});return V}_barValues(C){let H=this._perSlot(C.plus),V=this._perSlot(C.minus);return H.map((M,r)=>{if(M===null&&V[r]===null)return null;let t=(M??0)-(V[r]??0),a=C.floor?Math.max(t,0):t;return C.negative?-a:a})}_lines(){let C=this._loaded;if(!C)return[];let{plan:H,slots:V}=C,M=this._fmt,r=y(this),t=this.hass?.config.currency==="EUR"?100:1,a=[];if(H.lineFigure){let{figure:i,area:o,name:A}=H.lineFigure,n=Object.fromEntries(Object.entries(o.statistics).map(([l,c])=>[l,this._perSlot(c??[])])),m=V.map((l,c)=>a1(i,o,Z=>n[Z]?.[c]??null,null).value),p=a1(i,o,()=>0,null).unit;a.push({id:`line_${i}`,name:A,color:r.line,dash:"dashed",step:p==="price"&&H.period==="hour",values:p==="price"?m.map(l=>l===null?null:l*t):m,format:l=>M.value(p==="price"?l/t:l,p)})}return H.lines.forEach((i,o)=>{let A=C.metadata[i.statistic],n=i.value??(A?.has_sum?"change":"mean"),m=A?.unit_class==="energy"?"kWh":A?.statistics_unit_of_measurement??"",p=n==="mean"?t5(C.rows[i.statistic],V,H.period):l2(C.rows[i.statistic],V,H.period);a.push({id:`statistic_${o}`,name:i.name??A?.name??this.hass?.states[i.statistic]?.attributes.friendly_name??i.statistic,color:o===0&&!H.lineFigure?r.line:r.consumers[o%r.consumers.length],dash:"dotted",values:p,format:l=>`${M.number(l)}${m?` ${m}`:""}`})}),a}_buildChart(){let C=this._loaded;if(!C||C.failed)return;let H=this._localize,V=this._fmt,{plan:M}=C,r=M.bars.map(({series:o,name:A})=>({id:o.id,name:A,color:o.color,values:this._barValues(o),inTotal:!o.negative})),t=this._lines(),a={price:this.hass?.config.currency==="EUR"?"ct/kWh":`${V.currencySymbol()}/kWh`,percent:"%",per_100km:`${V.currencySymbol()}/100 km`},i=M.lineFigure&&!M.lines.length?a[a1(M.lineFigure.figure,M.lineFigure.area,()=>0,null).unit]??"":"";return Y2({labels:this._labels(C.slots,M.period),series:r,unit:M.unit==="money"?V.currencySymbol():M.unit==="distance"?"km":"kWh",total:H("history_total"),format:o=>M.unit==="money"?V.value(o,"money"):`${V.number(o,Math.abs(o)<10?2:1)} ${M.unit==="distance"?"km":"kWh"}`,tick:o=>V.number(o),lineTick:o=>V.number(o,Number.isInteger(o)?0:1),lines:t,lineUnit:i})}_labels(C,H){let V=i=>new Intl.DateTimeFormat(this._language,i),M=V({hour:"2-digit",minute:"2-digit",hour12:H5(this.hass?.locale)}),r=C.length>0&&new Date(C[0]).getFullYear()!==new Date(C[C.length-1]).getFullYear(),t={hour:M,day:V({day:"numeric"}),month:V(r?{month:"short",year:"2-digit"}:{month:"short"}),year:V({year:"numeric"})}[H],a={hour:M,day:V({weekday:"short",day:"numeric",month:"short"}),month:V({month:"long",year:"numeric"}),year:V({year:"numeric"})}[H];return C.map(i=>({axis:t.format(i),tooltip:H==="hour"?`${M.format(i)} \u2013 ${M.format(i+36e5)}`:a.format(i)}))}_title(){let C=this._localize;if(this._config.title)return this._config.title;if(this._savings)return C("history_title");let H=this._config.figure??"energy",V=this._info?.areas.find(r=>r.id===this._config.area);if(V)return $(C,H,V);let M=`figure.${H}`;return U(M)?C(M):C("history_title")}_note(C){let H=this._localize;if(!this.hass)return"";if(this._savings){let t=_(this.hass).map(a=>H(a.category==="pv"?"compare_pv":a.category==="wallbox"?"compare_fuel":a.heating==="oil"?"compare_oil":"compare_gas"));return t.length?H("history_savings_note",{list:new Intl.ListFormat(this._language,{type:"conjunction"}).format(t)}):""}let V=this._info?.areas.find(t=>t.id===this._config.area);if(this._config.figure==="saving"&&V?.statistics.alternative_cost?.length)return H("history_saving_note");if(!C||C.failed||this._config.figure!=="cost")return"";if(this._config.stack==="bill")return H("history_bill_note");let M=t=>this._perSlot(t??[]).reduce((a,i)=>a+(i??0),0),r=M(V?.statistics.solar);return r>0?H("history_cost_note",{rate:this._fmt.value(M(V?.statistics.solar_cost)/r,"price")}):H("history_cost_note_no_solar")}render(){let C=this._localize;if(!this.hass)return d``;let H=this._title();if(this._savings&&!_(this.hass).length)return d`<ha-card>
        <div class="header"><h2 class="title">${H}</h2></div>
        <p class="summary">${C(A1(this.hass))}</p>
      </ha-card>`;let V=this._savings?_(this.hass).some(n=>n.calculating):this._info?.calculating===!0,M=V?void 0:this._loaded,r=this._chart?.data.filter(n=>n.type==="bar"&&n.id!=="export").flatMap(n=>n.data.map(m=>m.value??null))??[],t=r.reduce((n,m)=>n+(m??0),0),a=r.some(n=>n),i=M?.plan.unit??"money",o=!this._savings&&this._info!==void 0&&!this._info?.areas.some(n=>n.id===this._config.area&&n.statistics[this._config.figure??"energy"]?.length),A=this._note(M);return d`<ha-card>
      <div class="header">
        <h2 class="title">${H}</h2>
        ${M&&!M.failed&&a?d`<span class="chip">${this._fmt.value(t,i)}</span>`:M?d`<span class="chip">${q1(M.plan.range,this._language)}</span>`:s}
      </div>
      ${A?d`<p class="note">${A}</p>`:s}
      ${V?d`<p class="summary">${C("calculating_all")}</p>`:o?d`<p class="summary">${C(this._info===null?"editor_not_loaded":"figures_unavailable")}</p>`:this._body(M,a)}
    </ha-card>`}_body(C,H){let V=this._localize;return this._hasChart===!1?d`<p class="summary">${V("history_no_chart")}</p>`:C?.failed?d`<p class="summary">${V("history_failed")}</p>`:d`<div class="chart">
      ${this._chart&&this._hasChart?d`<ha-chart-base
            .hass=${this.hass}
            .data=${this._chart.data}
            .options=${this._chart.options}
          ></ha-chart-base>`:s}
      ${C&&!H?d`<div class="empty">
            ${V(this._savings?"history_empty":"history_empty_figure")}
          </div>`:s}
    </div>`}};s1.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0},_selected:{state:!0},_loaded:{state:!0},_hasChart:{state:!0}},s1.styles=[P,O`
      .note {
        margin: 0;
        padding: var(--ha-space-1, 4px) var(--ha-space-4, 16px) 0;
        font-size: var(--ha-font-size-s, 12px);
        line-height: 16px;
        color: var(--secondary-text-color);
      }
      .chart {
        position: relative;
        min-height: ${D1(n3)};
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
    `];function p3(e,L,C={}){let H=r=>L.areas.find(t=>t.id===r)?.statistics??{},V=L.areas.find(r=>r.kind==="grid")?.statistics??{},M=[];for(let r of e){let t=[r.savingStatistic];if(r.category==="pv"){let a=V.export?.length?V.export:[],i=a.length?V.feed_in??[]:[];M.push({name:"savings_pv",color:M1.solar,plus:t,minus:i,energy:H("solar").self_used??[]}),i.length&&M.push({name:"savings_feed_in",color:M1.export,plus:i,minus:[],energy:a})}else r.category==="heat_pump"?M.push({name:r.heating==="oil"?"savings_oil":"savings_gas",color:C.heat??M1.heat,plus:t,minus:[],energy:H("heat_pump").energy??[]}):M.push({name:"savings_fuel",color:C.car??M1.car,plus:t,minus:[],energy:H("wallbox").energy??[]})}return M}var k1=class extends r1{constructor(){super(...arguments);this._config={}}static getStubConfig(){return{}}static getConfigElement(){return document.createElement("electricity-lens-savings-card-editor")}setConfig(C){this._config=C??{},this.requestUpdate()}get _area(){return this._info?.areas.find(C=>C.id===this._config.area)}_rows(){if(!this.hass||!this._info)return[];let C=k(this._info,y(this));return p3(_(this.hass),this._info,{heat:C.get("heat_pump"),car:C.get("wallbox")})}_ids(){if(this._config.area){let C=this._area?.statistics;return C?.alternative_cost?.length&&C.cost?.length&&C.saving?.length?[...C.alternative_cost,...C.cost,...C.saving]:[]}return this._rows().flatMap(C=>[...C.plus,...C.minus,...C.energy])}render(){let C=this._localize;if(!this.hass)return d``;let H=this._waiting();return d`<ha-card>
      <div class="header"><h2 class="title">${C("savings_title")}</h2></div>
      ${H?d`<p class="summary">${C(H)}</p>`:this._config.area?this._reckoning():this._table()}
    </ha-card>`}_reckoning(){let C=this._localize,H=this._fmt,V=this._area,M=this._sums?.values??{},r=I(M,V?.statistics.alternative_cost),t=I(M,V?.statistics.cost),a=r-t,i=a-I(M,V?.statistics.saving),o=_(this.hass).find(m=>m.category===V?.id)?.heating,A=V?.id==="wallbox"?"savings_instead_fuel":o==="oil"?"savings_instead_oil":"savings_instead_gas",n=Math.abs(i)>=.005;return d`${n?d`<p class="note">${C("savings_area_note")}</p>`:s}
      <table>
        <tbody>
          <tr>
            <td class="name">${C(A)}</td>
            <td>${H.value(r,"money")}</td>
          </tr>
          <tr>
            <td class="name">
              ${V?.id==="wallbox"?C("strategy.charging_cost"):C("savings_electricity",{name:V?.name??""})}
            </td>
            <td>${H.value(-t,"money")}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th scope="row" class="name">${C("savings_title")}</th>
            <td>${H.value(a,"money")}</td>
          </tr>
          ${n?d`<tr class="quiet">
                <th scope="row" class="name">${C("savings_solar_part")}</th>
                <td>${H.value(i,"money")}</td>
              </tr>`:s}
        </tfoot>
      </table>`}_table(){let C=this._localize,H=this._fmt,V=this._rows(),M=this._sums?.values??{},r=i=>I(M,i.plus)-I(M,i.minus),t=V.reduce((i,o)=>i+r(o),0),a=_(this.hass);return d`${V.length>1&&a.some(i=>i.category==="pv")?d`<p class="note">${C("savings_note")}</p>`:s}
      <table>
        <thead>
          <tr>
            <th scope="col" colspan="2" class="name">${C("savings_source")}</th>
            <th scope="col">${C("savings_energy")}</th>
            <th scope="col">${C("savings_amount")}</th>
          </tr>
        </thead>
        <tbody>
          ${V.map(i=>{let o=I(M,i.energy);return d`<tr>
              <td class="swatch-cell">
                <span class="swatch" style="--color: ${i.color}" aria-hidden="true"></span>
              </td>
              <td class="name">${C(i.name)}</td>
              <!-- Older periods may hold savings, but no energy to go with them. -->
              <td>${o||!r(i)?H.value(o,"energy"):"\u2013"}</td>
              <td>${H.value(r(i),"money")}</td>
            </tr>`})}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row" colspan="2" class="name">${C("savings_total")}</th>
            <td></td>
            <td>${H.value(t,"money")}</td>
          </tr>
        </tfoot>
      </table>`}};k1.styles=[P,H2];var m3=["energy","statistic","entity"],v1=e=>({select:{mode:"dropdown",options:e}}),x1=class extends g{constructor(){super(...arguments);this._label=C=>this._localize(`editor_${C.name}`);this._helper=C=>C.name==="period"?this._localize("editor_period_hint"):void 0}setConfig(C){this._config=c2(C)}get _localize(){return S(this.hass?.locale?.language??this.hass?.language??"en")}willUpdate(){this.hass&&this._info===void 0&&(this._info=null,this.hass.callWS({type:`${h}/figures`}).then(C=>{this._info=C}).catch(()=>{}))}_schema(C){let H=this._localize,V=z(C),M=[{name:"source",selector:v1(m3.map(r=>({value:r,label:H(`source.${r}`)})))}];if(V==="energy"){let r=this._info?.areas??[],t=r.find(a=>a.id===C.area);M.push({name:"area",selector:v1(r.map(a=>({value:a.id,label:a.name})))},{name:"figure",selector:v1(t?j(t).map(a=>({value:a,label:$(H,a,t)})):[])})}else V==="statistic"?(M.push({name:"statistic",selector:{statistic:{}}},{name:"value",selector:v1(M5.map(r=>({value:r,label:H(`value.${r}`)})))}),(C.value??"change")==="mean"&&M.push({name:"secondary",selector:v1(["none","range"].map(r=>({value:r,label:H(`secondary.${r}`)})))})):M.push({name:"entity",selector:{entity:{}}});return M.push({name:"name",selector:{text:{}}},{name:"period",selector:v1(Y.map(r=>({value:r,label:H(`period.${r}`)})))}),M}_figureFrom(C,H){let V=C.source??z(H);if(V!==z(H))return V==="energy"?{area:"household",figure:"cost"}:V==="statistic"?{statistic:"",value:"change"}:{entity:""};if(V==="energy"){let M=C.area??H.area,r=this._info?.areas.find(i=>i.id===M),t=r?j(r):[],a=t.includes(C.figure)?C.figure:t[0];return{area:M,figure:a,...H.secondary==="none"?{secondary:"none"}:{}}}if(V==="statistic"){let M={statistic:C.statistic??"",value:C.value??"change"};return M.value==="mean"&&C.secondary==="range"&&(M.secondary="range"),M}return{entity:C.entity??""}}_changed(C){if(!this._config)return;let H=C.detail.value,{area:V,figure:M,statistic:r,value:t,secondary:a,entity:i,name:o,...A}=this._config,n={...A,period:H.period??"energy_date",...this._figureFrom(H,this._config)};typeof H.name=="string"&&H.name&&(n.name=H.name),this._config=n,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:n},bubbles:!0,composed:!0}))}render(){if(!this.hass||!this._config)return d``;let C=this._config;return d`<div class="editor">
      ${z(C)==="energy"&&this._info===null?d`<p class="hint">${this._localize("editor_not_loaded")}</p>`:s}
      <ha-form
        .hass=${this.hass}
        .data=${{source:z(C),...C,value:C.value??"change",secondary:C.secondary??"none",period:C.period??"energy_date"}}
        .schema=${this._schema(C)}
        .computeLabel=${this._label}
        .computeHelper=${this._helper}
        @value-changed=${this._changed}
      ></ha-form>
    </div>`}};x1.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0}},x1.styles=O`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .hint {
      margin: 0;
      color: var(--secondary-text-color);
    }
  `;var S2="savings",b1=e=>({select:{mode:"dropdown",options:e}}),w1=class extends g{constructor(){super(...arguments);this._label=C=>this._localize(`editor_${C.name}`)}setConfig(C){this._config=C}get _localize(){return S(this.hass?.locale?.language??this.hass?.language??"en")}willUpdate(){this.hass&&this._info===void 0&&(this._info=null,this.hass.callWS({type:`${h}/figures`}).then(C=>{this._info=C}).catch(()=>{}))}_schema(){let C=this._localize,H=this._config??{type:""},V=this._info?.areas??[],M=[{name:"title",selector:{text:{}}},{name:"period",selector:b1([...Y,"all"].map(t=>({value:t,label:C(`period.${t}`)})))},{name:"area",selector:b1([{value:S2,label:C("editor_savings")},...V.filter(t=>O1(t).length).map(t=>({value:t.id,label:t.name}))])}],r=V.find(t=>t.id===H.area);if(r){let t=O1(r),a=H.figure&&t.includes(H.figure)?H.figure:t[0];M.push({name:"figure",selector:b1(t.map(i=>({value:i,label:$(C,i,r)})))},{name:"stack",selector:b1(d1(r,a).map(i=>({value:i,label:C(`stack.${i}`)})))},{name:"line",selector:b1([{value:"none",label:C("editor_line_none")},...Z2(r).map(i=>({value:i,label:$(C,i,r)}))])},{name:"lines",selector:{statistic:{multiple:!0}}})}return M}_data(){let C=this._config??{type:""},H=this._info?.areas.find(r=>r.id===C.area),V=H?O1(H):[],M=C.figure&&V.includes(C.figure)?C.figure:V[0];return{title:C.title??"",period:C.period??"energy_date",area:C.area??S2,figure:M,stack:C.stack??(H&&M?d1(H,M)[0]:void 0),line:C.line??"none",lines:(C.lines??[]).map(r=>r.statistic)}}_changed(C){if(!this._config)return;let H=C.detail.value,V={type:this._config.type};typeof H.title=="string"&&H.title&&(V.title=H.title),V.period=H.period??"energy_date";let M=H.area;if(M&&M!==S2){V.area=M;let r=this._info?.areas.find(p=>p.id===M),t=r?O1(r):[],a=t.includes(H.figure)?H.figure:t[0];a&&(V.figure=a),(r&&a?d1(r,a):[]).includes(H.stack)&&(V.stack=H.stack),(r?Z2(r):[]).includes(H.line)&&(V.line=H.line);let A=new Map((this._config.lines??[]).map(p=>[p.statistic,p])),m=(Array.isArray(H.lines)?H.lines:[]).filter(Boolean).map(p=>A.get(p)??{statistic:p});m.length&&(V.lines=m)}this._config=V,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:V},bubbles:!0,composed:!0}))}render(){return!this.hass||!this._config?d``:d`<ha-form
      .hass=${this.hass}
      .data=${this._data()}
      .schema=${this._schema()}
      .computeLabel=${this._label}
      @value-changed=${this._changed}
    ></ha-form>`}};w1.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0}};var s5="https://github.com/ignazhabibi/ha-electricity-lens",h2=(e,L)=>{if(!customElements.get(e))try{customElements.define(e,L)}catch{customElements.define(e,class extends L{})}};function v5(e,L=[]){let C=()=>{e.forEach(({tag:t,card:a,editor:i})=>{h2(t,a),i&&h2(i.tag,i.element)}),L.forEach(({type:t,element:a})=>h2(`ll-strategy-dashboard-${t}`,a))};C();let H=window.customElements,V=Date.now(),M=window.setInterval(()=>{let t=window.customElements!==H;t&&C(),(t||Date.now()-V>6e4)&&window.clearInterval(M)},100),r=window;r.customStrategies=r.customStrategies??[];for(let{type:t,name:a,description:i}of L)r.customStrategies.some(o=>o.type===t)||r.customStrategies.push({type:t,strategyType:"dashboard",name:a,description:i,documentationURL:s5});r.customCards=r.customCards??[];for(let{tag:t,name:a,description:i}of e)r.customCards.some(o=>o.type===t)||r.customCards.push({type:t,name:a,description:i,preview:!0,documentationURL:s5})}var g2="all",P1=class extends g{constructor(){super(...arguments);this._label=()=>this._localize("editor_area")}setConfig(C){this._config=C}get _localize(){return S(this.hass?.locale?.language??this.hass?.language??"en")}_changed(C){let{area:H,...V}=this._config??{},M=C.detail.value.area,r=M&&M!==g2?{...V,area:M}:V;this._config=r,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:r},bubbles:!0,composed:!0}))}render(){if(!this.hass||!this._config)return d``;let C=this._localize,H=[{name:"area",selector:{select:{mode:"dropdown",options:[{value:g2,label:C("editor_savings")},{value:"heat_pump",label:C("category.heat_pump")},{value:"wallbox",label:C("category.wallbox")}]}}}];return d`<ha-form
      .hass=${this.hass}
      .data=${{area:this._config.area??g2}}
      .schema=${H}
      .computeLabel=${this._label}
      @value-changed=${this._changed}
    ></ha-form>`}};P1.properties={hass:{attribute:!1},_config:{state:!0}};var f=(e,L={})=>({type:e.startsWith("electricity-lens")?`custom:${e}`:e,...L}),x5={grid_options:{columns:"full"}},f2={grid_options:{columns:6}},G={grid_options:{columns:12}},u5=(e,L,C={},H)=>f("electricity-lens-figures-card",{area:e,figure:L,...H?{name:H}:{},...f2,...C}),B1=(e,L,C,H,V=!0)=>({title:e,path:L,type:"sections",max_columns:3,sections:[{type:"grid",column_span:2,cards:[...V?[f("energy-date-selection",x5)]:[],...C.map(M=>({...x5,...M}))]}],sidebar:{sections:[{type:"grid",cards:H}]}});function l3(e){let L=Object.values(e.entities??{}).filter(V=>V.platform===h),C=["pv","heat_pump","wallbox"];return{categories:L.filter(V=>V.translation_key==="saving").map(V=>e.states[V.entity_id]?.attributes.category).filter(V=>C.includes(V))}}function s3(e,L,C={categories:[]}){let H=(u,v,B={})=>u5(u,v,B,L(`figure.${v}`)),V=(u,v,B,c5={})=>u5(u,v,c5,L(B)),M=(u,v,B={})=>f(u,{title:L(v),...B}),r=u=>e.areas.find(v=>v.id===u),t=r("solar"),a=r("heat_pump"),i=r("wallbox"),o=e.areas.some(u=>u.kind==="device"),A=!!(t?.statistics.saving?.length||a||i||C.categories.length),n={period:"today"},m={line:"price",...t?{line_name:L("strategy.price_with_solar")}:{}},p=(u,v={})=>t?V(u,"price","strategy.price_with_solar",v):H(u,"price",v),l={secondary:"none"},c=(u,v={})=>f("electricity-lens-history-card",{area:u,figure:"energy",stack:"source",...m,...v}),x=u=>f("electricity-lens-breakdown-card",{area:u,by:"source",...G}),Z=[];return Z.push(B1(L("strategy.overview"),"now",[f("energy-distribution"),c("household",n),...A?[f("electricity-lens-balance-card")]:[]],[V("household","cost","strategy.cost_today",n),V("household","solar_share","strategy.self_sufficiency_today",n),t?V("solar","energy","strategy.solar_today",n):V("household","energy","strategy.consumption_today",n),...t?.forecast?[H("solar","forecast_today"),H("solar","forecast_tomorrow")]:[]],!1)),Z.push(B1(L("strategy.electricity"),"household",[M("energy-usage-graph","strategy.usage_graph"),...t?[M("energy-solar-graph","strategy.solar_graph")]:[],...o?[f("electricity-lens-history-card",{title:L("strategy.devices_graph"),area:"household",figure:"energy",stack:"consumer"})]:[]],[M("energy-distribution","strategy.distribution",G),x("household"),...t?[f("energy-self-sufficiency-gauge",f2),f("energy-solar-consumed-gauge",f2)]:[]])),Z.push(B1(L("strategy.costs"),"costs",[M("electricity-lens-history-card","strategy.bill",{area:"household",figure:"cost",stack:"bill",line:"grid_price"}),...t?[M("electricity-lens-history-card","strategy.cost_with_solar",{area:"household",figure:"cost",stack:"source",...m})]:[],M("electricity-lens-history-card","strategy.cost_history",{area:"household",figure:"cost",stack:"consumer",...t?{}:m})],[H("grid","grid_price",l),p("household",l),M("electricity-lens-breakdown-card","strategy.cost_distribution",{area:"household",by:"consumer",figure:"cost",display:"bars",color_by_source:!0,...G}),...A?[f("electricity-lens-savings-card",G)]:[]])),a&&Z.push(B1(L("strategy.heating"),"heating",[M("electricity-lens-history-card","figure.heat",{area:"heat_pump",figure:"heat",stack:"consumer",line:"scop",line_name:L("figure.scop")}),M("electricity-lens-history-card","strategy.usage_graph",{area:"heat_pump",figure:"energy",stack:"source"}),M("electricity-lens-history-card",t?"strategy.cost_with_solar":"figure.cost",{area:"heat_pump",figure:"cost",stack:"source",...m})],[H("heat_pump","scop",l),H("heat_pump","heat_price",l),x("heat_pump"),...J1(e).length?[f("electricity-lens-heat-meters-card",G)]:[...(a.statistics.energy?.length??0)>1?[f("electricity-lens-breakdown-card",{area:"heat_pump",by:"consumer",figure:"energy",display:"bars",color_by_source:!0,...G})]:[],...(a.statistics.heat_meters?.length??0)>1?[f("electricity-lens-breakdown-card",{title:L("figure.heat"),statistics:(a.statistics.heat_meters??[]).map(u=>({statistic:u})),display:"bars",...G})]:[]],f("electricity-lens-savings-card",{area:"heat_pump",...G})])),i&&Z.push(B1(L("strategy.charging"),"charging",[M("electricity-lens-history-card","strategy.charged_energy",{area:"wallbox",figure:"energy",stack:"source"}),M("electricity-lens-history-card","strategy.charging_cost",{area:"wallbox",figure:"cost",stack:"source",...m})],[H("wallbox","device_grid_price",l),p("wallbox",l),x("wallbox"),f("electricity-lens-savings-card",{area:"wallbox",...G})])),Z}var v3=3e4,x3=1e3;async function u3(e){let L=e.config.state!==void 0&&e.config.state!=="RUNNING",C=Date.now()+v3;for(;;)try{return await e.callWS({type:`${h}/figures`})}catch(H){if(!L||Date.now()>=C)throw H;await new Promise(V=>setTimeout(V,x3))}}var T1=class extends HTMLElement{static async generate(L,C){let H=S(C.locale?.language??C.language??"en"),V;try{V=await u3(C)}catch{return{title:H("strategy.title"),views:[{title:H("strategy.title"),cards:[{type:"markdown",content:H("strategy.not_loaded")}]}]}}return{title:H("strategy.title"),views:s3(V,H,l3(C))}}};T1.noEditor=!0;v5([{tag:"electricity-lens-balance-card",card:l1,name:"Electricity Lens balance",description:"What your PV plant, heat pump, and electric car have saved, and when they pay off."},{tag:"electricity-lens-savings-card",card:k1,name:"Electricity Lens savings",description:"What solar power, the heat pump, and the electric car saved in the selected period, as a table, or one area's saving reckoned up. Follows the energy date selection.",editor:{tag:"electricity-lens-savings-card-editor",element:P1}},{tag:"electricity-lens-heat-meters-card",card:_1,name:"Electricity Lens heat meters",description:"Heat, electricity, and seasonal COP of each of the heat pump's meters in the selected period. Follows the energy date selection."},{tag:"electricity-lens-history-card",card:s1,name:"Electricity Lens history",description:"Savings, consumption, or costs per period as bars, stacked by source or consumer, with lines. Follows the energy date selection.",editor:{tag:"electricity-lens-history-card-editor",element:w1}},{tag:"electricity-lens-figures-card",card:n1,name:"Electricity Lens key figures",description:"One key figure for a period: costs, solar share, cheap grid power, savings, or any statistic or entity.",editor:{tag:"electricity-lens-figures-card-editor",element:x1}},{tag:"electricity-lens-breakdown-card",card:p1,name:"Electricity Lens breakdown",description:"Shares for a period as a ring or bars: the electricity mix, consumption or costs by consumer, or any statistics.",editor:{tag:"electricity-lens-breakdown-card-editor",element:y1}}],[{type:"electricity-lens",element:T1,name:"Electricity Lens",description:"A finished electricity dashboard with costs, electricity mix, solar, heat pump, car, and the balance."}]);
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
