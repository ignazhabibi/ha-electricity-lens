var p2=globalThis,m2=p2.ShadowRoot&&(p2.ShadyCSS===void 0||p2.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,D2=Symbol(),p5=new WeakMap,Y1=class{constructor(V,C,H){if(this._$cssResult$=!0,H!==D2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=V,this.t=C}get styleSheet(){let V=this.o,C=this.t;if(m2&&V===void 0){let H=C!==void 0&&C.length===1;H&&(V=p5.get(C)),V===void 0&&((this.o=V=new CSSStyleSheet).replaceSync(this.cssText),H&&p5.set(C,V))}return V}toString(){return this.cssText}},l2=e=>new Y1(typeof e=="string"?e:e+"",void 0,D2),O=(e,...V)=>{let C=e.length===1?e[0]:V.reduce((H,L,r)=>H+(M=>{if(M._$cssResult$===!0)return M.cssText;if(typeof M=="number")return M;throw Error("Value passed to 'css' function must be a 'css' function result: "+M+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(L)+e[r+1],e[0]);return new Y1(C,e,D2)},m5=(e,V)=>{if(m2)e.adoptedStyleSheets=V.map(C=>C instanceof CSSStyleSheet?C:C.styleSheet);else for(let C of V){let H=document.createElement("style"),L=p2.litNonce;L!==void 0&&H.setAttribute("nonce",L),H.textContent=C.cssText,e.appendChild(H)}},$2=m2?e=>e:e=>e instanceof CSSStyleSheet?(V=>{let C="";for(let H of V.cssRules)C+=H.cssText;return l2(C)})(e):e;var{is:c3,defineProperty:Z3,getOwnPropertyDescriptor:S3,getOwnPropertyNames:h3,getOwnPropertySymbols:g3,getPrototypeOf:f3}=Object,s2=globalThis,l5=s2.trustedTypes,O3=l5?l5.emptyScript:"",y3=s2.reactiveElementPolyfillSupport,J1=(e,V)=>e,I2={toAttribute(e,V){switch(V){case Boolean:e=e?O3:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,V){let C=e;switch(V){case Boolean:C=e!==null;break;case Number:C=e===null?null:Number(e);break;case Object:case Array:try{C=JSON.parse(e)}catch{C=null}}return C}},v5=(e,V)=>!c3(e,V),s5={attribute:!0,type:String,converter:I2,reflect:!1,useDefault:!1,hasChanged:v5};Symbol.metadata??=Symbol("metadata"),s2.litPropertyMetadata??=new WeakMap;var H1=class extends HTMLElement{static addInitializer(V){this._$Ei(),(this.l??=[]).push(V)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(V,C=s5){if(C.state&&(C.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(V)&&((C=Object.create(C)).wrapped=!0),this.elementProperties.set(V,C),!C.noAccessor){let H=Symbol(),L=this.getPropertyDescriptor(V,H,C);L!==void 0&&Z3(this.prototype,V,L)}}static getPropertyDescriptor(V,C,H){let{get:L,set:r}=S3(this.prototype,V)??{get(){return this[C]},set(M){this[C]=M}};return{get:L,set(M){let i=L?.call(this);r?.call(this,M),this.requestUpdate(V,i,H)},configurable:!0,enumerable:!0}}static getPropertyOptions(V){return this.elementProperties.get(V)??s5}static _$Ei(){if(this.hasOwnProperty(J1("elementProperties")))return;let V=f3(this);V.finalize(),V.l!==void 0&&(this.l=[...V.l]),this.elementProperties=new Map(V.elementProperties)}static finalize(){if(this.hasOwnProperty(J1("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(J1("properties"))){let C=this.properties,H=[...h3(C),...g3(C)];for(let L of H)this.createProperty(L,C[L])}let V=this[Symbol.metadata];if(V!==null){let C=litPropertyMetadata.get(V);if(C!==void 0)for(let[H,L]of C)this.elementProperties.set(H,L)}this._$Eh=new Map;for(let[C,H]of this.elementProperties){let L=this._$Eu(C,H);L!==void 0&&this._$Eh.set(L,C)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(V){let C=[];if(Array.isArray(V)){let H=new Set(V.flat(1/0).reverse());for(let L of H)C.unshift($2(L))}else V!==void 0&&C.push($2(V));return C}static _$Eu(V,C){let H=C.attribute;return H===!1?void 0:typeof H=="string"?H:typeof V=="string"?V.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(V=>this.enableUpdating=V),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(V=>V(this))}addController(V){(this._$EO??=new Set).add(V),this.renderRoot!==void 0&&this.isConnected&&V.hostConnected?.()}removeController(V){this._$EO?.delete(V)}_$E_(){let V=new Map,C=this.constructor.elementProperties;for(let H of C.keys())this.hasOwnProperty(H)&&(V.set(H,this[H]),delete this[H]);V.size>0&&(this._$Ep=V)}createRenderRoot(){let V=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return m5(V,this.constructor.elementStyles),V}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(V=>V.hostConnected?.())}enableUpdating(V){}disconnectedCallback(){this._$EO?.forEach(V=>V.hostDisconnected?.())}attributeChangedCallback(V,C,H){this._$AK(V,H)}_$ET(V,C){let H=this.constructor.elementProperties.get(V),L=this.constructor._$Eu(V,H);if(L!==void 0&&H.reflect===!0){let r=(H.converter?.toAttribute!==void 0?H.converter:I2).toAttribute(C,H.type);this._$Em=V,r==null?this.removeAttribute(L):this.setAttribute(L,r),this._$Em=null}}_$AK(V,C){let H=this.constructor,L=H._$Eh.get(V);if(L!==void 0&&this._$Em!==L){let r=H.getPropertyOptions(L),M=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:I2;this._$Em=L;let i=M.fromAttribute(C,r.type);this[L]=i??this._$Ej?.get(L)??i,this._$Em=null}}requestUpdate(V,C,H,L=!1,r){if(V!==void 0){let M=this.constructor;if(L===!1&&(r=this[V]),H??=M.getPropertyOptions(V),!((H.hasChanged??v5)(r,C)||H.useDefault&&H.reflect&&r===this._$Ej?.get(V)&&!this.hasAttribute(M._$Eu(V,H))))return;this.C(V,C,H)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(V,C,{useDefault:H,reflect:L,wrapped:r},M){H&&!(this._$Ej??=new Map).has(V)&&(this._$Ej.set(V,M??C??this[V]),r!==!0||M!==void 0)||(this._$AL.has(V)||(this.hasUpdated||H||(C=void 0),this._$AL.set(V,C)),L===!0&&this._$Em!==V&&(this._$Eq??=new Set).add(V))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(C){Promise.reject(C)}let V=this.scheduleUpdate();return V!=null&&await V,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[L,r]of this._$Ep)this[L]=r;this._$Ep=void 0}let H=this.constructor.elementProperties;if(H.size>0)for(let[L,r]of H){let{wrapped:M}=r,i=this[L];M!==!0||this._$AL.has(L)||i===void 0||this.C(L,void 0,r,i)}}let V=!1,C=this._$AL;try{V=this.shouldUpdate(C),V?(this.willUpdate(C),this._$EO?.forEach(H=>H.hostUpdate?.()),this.update(C)):this._$EM()}catch(H){throw V=!1,this._$EM(),H}V&&this._$AE(C)}willUpdate(V){}_$AE(V){this._$EO?.forEach(C=>C.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(V)),this.updated(V)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(V){return!0}update(V){this._$Eq&&=this._$Eq.forEach(C=>this._$ET(C,this[C])),this._$EM()}updated(V){}firstUpdated(V){}};H1.elementStyles=[],H1.shadowRootOptions={mode:"open"},H1[J1("elementProperties")]=new Map,H1[J1("finalized")]=new Map,y3?.({ReactiveElement:H1}),(s2.reactiveElementVersions??=[]).push("2.1.2");var W2=globalThis,x5=e=>e,v2=W2.trustedTypes,u5=v2?v2.createPolicy("lit-html",{createHTML:e=>e}):void 0,z2="$lit$",V1=`lit$${Math.random().toFixed(9).slice(2)}$`,U2="?"+V1,_3=`<${U2}>`,m1=document,C2=()=>m1.createComment(""),H2=e=>e===null||typeof e!="object"&&typeof e!="function",G2=Array.isArray,f5=e=>G2(e)||typeof e?.[Symbol.iterator]=="function",N2=`[ 	
\f\r]`,X1=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,c5=/-->/g,Z5=/>/g,d1=RegExp(`>|${N2}(?:([^\\s"'>=/]+)(${N2}*=${N2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),S5=/'/g,h5=/"/g,O5=/^(?:script|style|textarea|title)$/i,Q2=e=>(V,...C)=>({_$litType$:e,strings:V,values:C}),m=Q2(1),U0=Q2(2),G0=Q2(3),L1=Symbol.for("lit-noChange"),v=Symbol.for("lit-nothing"),g5=new WeakMap,p1=m1.createTreeWalker(m1,129);function y5(e,V){if(!G2(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return u5!==void 0?u5.createHTML(V):V}var _5=(e,V)=>{let C=e.length-1,H=[],L,r=V===2?"<svg>":V===3?"<math>":"",M=X1;for(let i=0;i<C;i++){let t=e[i],o,n,a=-1,d=0;for(;d<t.length&&(M.lastIndex=d,n=M.exec(t),n!==null);)d=M.lastIndex,M===X1?n[1]==="!--"?M=c5:n[1]!==void 0?M=Z5:n[2]!==void 0?(O5.test(n[2])&&(L=RegExp("</"+n[2],"g")),M=d1):n[3]!==void 0&&(M=d1):M===d1?n[0]===">"?(M=L??X1,a=-1):n[1]===void 0?a=-2:(a=M.lastIndex-n[2].length,o=n[1],M=n[3]===void 0?d1:n[3]==='"'?h5:S5):M===h5||M===S5?M=d1:M===c5||M===Z5?M=X1:(M=d1,L=void 0);let A=M===d1&&e[i+1].startsWith("/>")?" ":"";r+=M===X1?t+_3:a>=0?(H.push(o),t.slice(0,a)+z2+t.slice(a)+V1+A):t+V1+(a===-2?i:A)}return[y5(e,r+(e[C]||"<?>")+(V===2?"</svg>":V===3?"</math>":"")),H]},V2=class e{constructor({strings:V,_$litType$:C},H){let L;this.parts=[];let r=0,M=0,i=V.length-1,t=this.parts,[o,n]=_5(V,C);if(this.el=e.createElement(o,H),p1.currentNode=this.el.content,C===2||C===3){let a=this.el.content.firstChild;a.replaceWith(...a.childNodes)}for(;(L=p1.nextNode())!==null&&t.length<i;){if(L.nodeType===1){if(L.hasAttributes())for(let a of L.getAttributeNames())if(a.endsWith(z2)){let d=n[M++],A=L.getAttribute(a).split(V1),l=/([.?@])?(.*)/.exec(d);t.push({type:1,index:r,name:l[2],strings:A,ctor:l[1]==="."?u2:l[1]==="?"?c2:l[1]==="@"?Z2:s1}),L.removeAttribute(a)}else a.startsWith(V1)&&(t.push({type:6,index:r}),L.removeAttribute(a));if(O5.test(L.tagName)){let a=L.textContent.split(V1),d=a.length-1;if(d>0){L.textContent=v2?v2.emptyScript:"";for(let A=0;A<d;A++)L.append(a[A],C2()),p1.nextNode(),t.push({type:2,index:++r});L.append(a[d],C2())}}}else if(L.nodeType===8)if(L.data===U2)t.push({type:2,index:r});else{let a=-1;for(;(a=L.data.indexOf(V1,a+1))!==-1;)t.push({type:7,index:r}),a+=V1.length-1}r++}}static createElement(V,C){let H=m1.createElement("template");return H.innerHTML=V,H}};function l1(e,V,C=e,H){if(V===L1)return V;let L=H!==void 0?C._$Co?.[H]:C._$Cl,r=H2(V)?void 0:V._$litDirective$;return L?.constructor!==r&&(L?._$AO?.(!1),r===void 0?L=void 0:(L=new r(e),L._$AT(e,C,H)),H!==void 0?(C._$Co??=[])[H]=L:C._$Cl=L),L!==void 0&&(V=l1(e,L._$AS(e,V.values),L,H)),V}var x2=class{constructor(V,C){this._$AV=[],this._$AN=void 0,this._$AD=V,this._$AM=C}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(V){let{el:{content:C},parts:H}=this._$AD,L=(V?.creationScope??m1).importNode(C,!0);p1.currentNode=L;let r=p1.nextNode(),M=0,i=0,t=H[0];for(;t!==void 0;){if(M===t.index){let o;t.type===2?o=new f1(r,r.nextSibling,this,V):t.type===1?o=new t.ctor(r,t.name,t.strings,this,V):t.type===6&&(o=new S2(r,this,V)),this._$AV.push(o),t=H[++i]}M!==t?.index&&(r=p1.nextNode(),M++)}return p1.currentNode=m1,L}p(V){let C=0;for(let H of this._$AV)H!==void 0&&(H.strings!==void 0?(H._$AI(V,H,C),C+=H.strings.length-2):H._$AI(V[C])),C++}},f1=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(V,C,H,L){this.type=2,this._$AH=v,this._$AN=void 0,this._$AA=V,this._$AB=C,this._$AM=H,this.options=L,this._$Cv=L?.isConnected??!0}get parentNode(){let V=this._$AA.parentNode,C=this._$AM;return C!==void 0&&V?.nodeType===11&&(V=C.parentNode),V}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(V,C=this){V=l1(this,V,C),H2(V)?V===v||V==null||V===""?(this._$AH!==v&&this._$AR(),this._$AH=v):V!==this._$AH&&V!==L1&&this._(V):V._$litType$!==void 0?this.$(V):V.nodeType!==void 0?this.T(V):f5(V)?this.k(V):this._(V)}O(V){return this._$AA.parentNode.insertBefore(V,this._$AB)}T(V){this._$AH!==V&&(this._$AR(),this._$AH=this.O(V))}_(V){this._$AH!==v&&H2(this._$AH)?this._$AA.nextSibling.data=V:this.T(m1.createTextNode(V)),this._$AH=V}$(V){let{values:C,_$litType$:H}=V,L=typeof H=="number"?this._$AC(V):(H.el===void 0&&(H.el=V2.createElement(y5(H.h,H.h[0]),this.options)),H);if(this._$AH?._$AD===L)this._$AH.p(C);else{let r=new x2(L,this),M=r.u(this.options);r.p(C),this.T(M),this._$AH=r}}_$AC(V){let C=g5.get(V.strings);return C===void 0&&g5.set(V.strings,C=new V2(V)),C}k(V){G2(this._$AH)||(this._$AH=[],this._$AR());let C=this._$AH,H,L=0;for(let r of V)L===C.length?C.push(H=new e(this.O(C2()),this.O(C2()),this,this.options)):H=C[L],H._$AI(r),L++;L<C.length&&(this._$AR(H&&H._$AB.nextSibling,L),C.length=L)}_$AR(V=this._$AA.nextSibling,C){for(this._$AP?.(!1,!0,C);V!==this._$AB;){let H=x5(V).nextSibling;x5(V).remove(),V=H}}setConnected(V){this._$AM===void 0&&(this._$Cv=V,this._$AP?.(V))}},s1=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(V,C,H,L,r){this.type=1,this._$AH=v,this._$AN=void 0,this.element=V,this.name=C,this._$AM=L,this.options=r,H.length>2||H[0]!==""||H[1]!==""?(this._$AH=Array(H.length-1).fill(new String),this.strings=H):this._$AH=v}_$AI(V,C=this,H,L){let r=this.strings,M=!1;if(r===void 0)V=l1(this,V,C,0),M=!H2(V)||V!==this._$AH&&V!==L1,M&&(this._$AH=V);else{let i=V,t,o;for(V=r[0],t=0;t<r.length-1;t++)o=l1(this,i[H+t],C,t),o===L1&&(o=this._$AH[t]),M||=!H2(o)||o!==this._$AH[t],o===v?V=v:V!==v&&(V+=(o??"")+r[t+1]),this._$AH[t]=o}M&&!L&&this.j(V)}j(V){V===v?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,V??"")}},u2=class extends s1{constructor(){super(...arguments),this.type=3}j(V){this.element[this.name]=V===v?void 0:V}},c2=class extends s1{constructor(){super(...arguments),this.type=4}j(V){this.element.toggleAttribute(this.name,!!V&&V!==v)}},Z2=class extends s1{constructor(V,C,H,L,r){super(V,C,H,L,r),this.type=5}_$AI(V,C=this){if((V=l1(this,V,C,0)??v)===L1)return;let H=this._$AH,L=V===v&&H!==v||V.capture!==H.capture||V.once!==H.once||V.passive!==H.passive,r=V!==v&&(H===v||L);L&&this.element.removeEventListener(this.name,this,H),r&&this.element.addEventListener(this.name,this,V),this._$AH=V}handleEvent(V){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,V):this._$AH.handleEvent(V)}},S2=class{constructor(V,C,H){this.element=V,this.type=6,this._$AN=void 0,this._$AM=C,this.options=H}get _$AU(){return this._$AM._$AU}_$AI(V){l1(this,V)}},b5={M:z2,P:V1,A:U2,C:1,L:_5,R:x2,D:f5,V:l1,I:f1,H:s1,N:c2,U:Z2,B:u2,F:S2},b3=W2.litHtmlPolyfillSupport;b3?.(V2,f1),(W2.litHtmlVersions??=[]).push("3.3.3");var k5=(e,V,C)=>{let H=C?.renderBefore??V,L=H._$litPart$;if(L===void 0){let r=C?.renderBefore??null;H._$litPart$=L=new f1(V.insertBefore(C2(),r),r,void 0,C??{})}return L._$AI(e),L};var K2=globalThis,P=class extends H1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let V=super.createRenderRoot();return this.renderOptions.renderBefore??=V.firstChild,V}update(V){let C=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(V),this._$Do=k5(C,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return L1}};P._$litElement$=!0,P.finalized=!0,K2.litElementHydrateSupport?.({LitElement:P});var k3=K2.litElementPolyfillSupport;k3?.({LitElement:P});(K2.litElementVersions??=[]).push("4.2.2");var w5={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},h2=e=>(...V)=>({_$litDirective$:e,values:V}),O1=class{constructor(V){}get _$AU(){return this._$AM._$AU}_$AT(V,C,H){this._$Ct=V,this._$AM=C,this._$Ci=H}_$AS(V,C){return this.update(V,C)}update(V,C){return this.render(...C)}};var{I:w3}=b5,P5=e=>e;var B5=()=>document.createComment(""),y1=(e,V,C)=>{let H=e._$AA.parentNode,L=V===void 0?e._$AB:V._$AA;if(C===void 0){let r=H.insertBefore(B5(),L),M=H.insertBefore(B5(),L);C=new w3(r,M,e,e.options)}else{let r=C._$AB.nextSibling,M=C._$AM,i=M!==e;if(i){let t;C._$AQ?.(e),C._$AM=e,C._$AP!==void 0&&(t=e._$AU)!==M._$AU&&C._$AP(t)}if(r!==L||i){let t=C._$AA;for(;t!==r;){let o=P5(t).nextSibling;P5(H).insertBefore(t,L),t=o}}}return C},M1=(e,V,C=e)=>(e._$AI(V,C),e),P3={},g2=(e,V=P3)=>e._$AH=V,T5=e=>e._$AH,f2=e=>{e._$AR(),e._$AA.remove()};var F5=h2(class extends O1{constructor(){super(...arguments),this.key=v}render(e,V){return this.key=e,V}update(e,[V,C]){return V!==this.key&&(g2(e),this.key=V),C}});var R5;function B3(){if(customElements.get("ha-chart-base"))return Promise.resolve(!0);let e=window.loadCardHelpers;return e?(R5??=(async()=>{try{(await e()).createCardElement({type:"statistics-graph",entities:[]})}catch{}let V=new Promise(C=>setTimeout(()=>C(!1),1e4));return Promise.race([customElements.whenDefined("ha-chart-base").then(()=>!0),V])})(),R5):Promise.resolve(!1)}function k2(e){B3().then(e),customElements.whenDefined("ha-chart-base").then(()=>e(!0))}var y2="compare-",E5=e=>Math.round(e*255).toString(16).padStart(2,"0");function b1(e,V){let C=e.trim();if(/^#[0-9a-f]{6}$/i.test(C))return C+E5(V);if(/^#[0-9a-f]{3}$/i.test(C))return`#${[...C.slice(1)].map(L=>L+L).join("")}${E5(V)}`;let H=C.match(/^rgba?\(([^)]+)\)/i);if(H){let[L,r,M]=H[1].split(/[ ,/]+/).filter(Boolean);return`rgba(${L}, ${r}, ${M}, ${V})`}return C}var v1=e=>e.replace(/[&<>"']/g,V=>`&#${V.charCodeAt(0)};`),j2=e=>`<span style="display:inline-block;margin-inline-end:4px;border-radius:10px;width:10px;height:10px;background-color:${e}"></span>`,L2=e=>e.value?.[1]??null;function D5(e){if(e<=0)return 1;let V=10**Math.floor(Math.log10(e)),C=e/V;return([1,2,2.5,5,10].find(L=>C<=L*(1+1e-9))??10)*V}var _1=e=>Number(e.toFixed(10));function T3(e,V){if(e.min>=0&&V.min>=0)return;let C=D5((e.max-e.min)/6),H=Math.max(Math.ceil(_1(e.max/C)),V.max>0?1:0),L=Math.max(Math.ceil(_1(-e.min/C)),V.min<0?1:0),r=D5(Math.max(H?V.max/H:0,L?-V.min/L:0));return{bar:{min:_1(-L*C),max:_1(H*C),interval:C},line:{min:_1(-L*r),max:_1(H*r),interval:r}}}function $5(e,V,C,H){return e.map((L,r)=>({id:H?y2+L.id:L.id,type:"bar",name:L.name,stack:C,cursor:"default",barMaxWidth:50,color:b1(L.color,H?50/255:127/255),itemStyle:{borderColor:H?b1(L.color,127/255):L.color},data:L.values.map((M,i)=>{let t=e.slice(r+1).every(o=>Math.sign(o.values[i]??0)!==Math.sign(M??0));return{value:[V[i],M],itemStyle:M?t?{borderRadius:M>0?[4,4,0,0]:[0,0,4,4]}:void 0:{borderWidth:0}}})}))}function I5(e,V){let C=0,H=0;for(let L=0;L<V;L+=1){let r=e.map(M=>M.values[L]??0);H=Math.max(H,r.filter(M=>M>0).reduce((M,i)=>M+i,0)),C=Math.min(C,r.filter(M=>M<0).reduce((M,i)=>M+i,0))}return{min:C,max:H}}var O2=120*36e5;function F3(e){let V=C=>new Intl.DateTimeFormat(e.language,C);if(e.period==="month"){let C=V({month:"long"}),H=V({month:"long",year:"numeric"}),L=new Date(e.min),r=new Date(e.max),M=(r.getFullYear()-L.getFullYear())*12+r.getMonth()-L.getMonth();return{type:"time",min:new Date(e.min-O2),max:new Date(e.max+O2),axisLabel:{formatter:i=>{let t=new Date(i);return t.getMonth()===0?`{bold|${H.format(t)}}`:C.format(t)}},splitNumber:Math.min(M,5)}}if(e.period==="year"){let C=V({year:"numeric"}),H=new Date(e.max).getFullYear()-new Date(e.min).getFullYear();return{type:"time",min:new Date(e.min-6*O2),max:new Date(e.max+6*O2),axisLabel:{formatter:L=>C.format(new Date(L))},minInterval:365*24*36e5,splitNumber:Math.max(H,1)}}return{type:"time",min:new Date(e.min),max:new Date(e.max)}}var R3=5e-4,_2=e=>e.some(V=>V!==null&&Math.abs(V)>=R3);function W5(e){let V=new Set([...e.series,...e.compare?.series??[]].filter(p=>_2(p.values)).map(p=>p.id)),C={...e,series:e.series.filter(p=>V.has(p.id)),compare:e.compare&&{...e.compare,series:e.compare.series.filter(p=>V.has(p.id))},lines:(e.lines??[]).filter(p=>_2(p.values))},H=C.lines??[],L=C.compare,r=[...L?$5(L.series,C.slots,"compare",!0):[],...$5(C.series,C.slots,"main",!1)],M=H.map(p=>({id:p.id,type:"line",name:p.name,yAxisIndex:1,color:p.color,symbol:"none",showSymbol:!1,step:p.step?"middle":!1,lineStyle:{width:1.5,type:p.dash??"dashed",color:p.color},z:1,connectNulls:!0,data:p.values.map((s,u)=>[C.slots[u],s])})),i=[...r,...M],t=new Map(H.map(p=>[p.id,p.format])),o=new Set(C.series.filter(p=>p.inTotal===!1).flatMap(p=>[p.id,y2+p.id])),n=(p,s)=>{let u=s.filter(Z=>L2(Z));if(!u.length)return"";let f=u.map(Z=>`${j2(String(Z.color??""))}${v1(Z.seriesName??"")}: ${C.format(L2(Z)??0)}`),g=u.filter(Z=>!o.has(Z.seriesId??"")).reduce((Z,x)=>Z+(L2(x)??0),0);return`<b>${v1(p)}</b><br>${f.join("<br>")}`+(u.length>1?`<br><b>${v1(C.total)}: ${C.format(g)}</b>`:"")},a=p=>{let s=Array.isArray(p)?p:[p],u=document.createElement("div");if(!s.length)return u;let f=s[0].dataIndex,g=c=>t.has(c.seriesId??""),Z=c=>(c.seriesId??"").startsWith(y2),x=s.filter(c=>g(c)&&L2(c)!==null).map(c=>`${j2(String(c.color??""))}${v1(c.seriesName??"")}: ${t.get(c.seriesId??"")?.(L2(c)??0)??""}`),h=C.labels[f]??"",S=n(h,s.filter(c=>!g(c)&&!Z(c))),F=L?n(L.labels[f]??"",s.filter(c=>Z(c))):"",N=[S||`<b>${v1(h)}</b>`];return x.length&&(N[0]+=`<br>${x.join("<br>")}`),F&&N.push(F),u.innerHTML=N.join("<br><br>"),u},d={type:"value",name:C.unit,nameGap:2,nameTextStyle:{align:"left"},axisLabel:{formatter:C.tick},splitLine:{show:!0}},A={type:"value",name:C.lineUnit??"",nameGap:2,nameTextStyle:{align:"right"},axisLabel:{formatter:C.lineTick??C.tick},splitLine:{show:!1}};if(H.length){let p=C.slots.length,s=I5(C.series,p),u=L?I5(L.series,p):s,f=H.flatMap(x=>x.values.filter(h=>h!==null)),g=Math.min(0,...f),Z=T3({min:Math.min(s.min,u.min),max:Math.max(s.max,u.max)},{min:g,max:Math.max(0,...f)});if(Z){Object.assign(d,Z.bar),Object.assign(A,Z.line);let x=C.lineTick??C.tick;g>=0&&(A.axisLabel={formatter:h=>h<0?"":x(h)})}}let l={xAxis:F3(C.axis),yAxis:H.length?[d,A]:d,grid:{top:15,bottom:0,left:1,right:1,containLabel:!0},legend:{show:!0,type:"custom",data:[...C.series,...H].map(p=>({id:p.id,secondaryIds:L?.series.some(s=>s.id===p.id)?[y2+p.id]:[],name:p.name}))},tooltip:{trigger:"axis",formatter:a}};return{data:i,options:l}}function b2(e){let V=e.reduce((C,H)=>C+Math.max(0,H),0);return e.map(C=>V>0?Math.max(0,C)/V*100:0)}function N5(e){let V=[],C=-Math.PI/2;for(let H of e){let L=C+H/100*2*Math.PI;V.push([C,L]),C=L}return V}function z5(e){let V=e.items.map(a=>e.hidden.has(a.id)?0:a.value),C=b2(V),H=V.reduce((a,d)=>a+Math.max(0,d),0),L=N5(C),r=e.compare?.map((a,d)=>e.hidden.has(e.items[d].id)?0:a),M=r?b2(r):[],i=N5(M),t=a=>{let d=Math.min(90,a.getWidth()/2-8,a.getHeight()/2-8);return{cx:a.getWidth()/2,cy:a.getHeight()/2,r:d,r0:d*(r?50:40)/70}},o=e.items.map((a,d)=>({id:a.id,type:"custom",name:a.name,coordinateSystem:"none",cursor:"default",color:b1(a.color,.5),data:[[V[d],L[d][0],L[d][1],C[d]]],renderItem:(A,l)=>{let p=l.value(1),s=l.value(2);if(!(s-p>0))return null;let u=t(l),f=[{type:"sector",shape:{...u,startAngle:p,endAngle:s,cornerRadius:4},style:{fill:b1(a.color,.5),stroke:a.color,lineWidth:1}}];if(s-p>=15*Math.PI/180){let g=(p+s)/2,Z=Math.cos(g)>=0,x=[u.cx+Math.cos(g)*u.r,u.cy+Math.sin(g)*u.r],h=[u.cx+Math.cos(g)*(u.r+10),u.cy+Math.sin(g)*(u.r+10)],S=[h[0]+(Z?10:-10),h[1]];f.push({type:"polyline",silent:!0,shape:{points:[x,h,S]},style:{stroke:a.color,fill:"none"}},{type:"text",silent:!0,x:S[0]+(Z?4:-4),y:S[1],style:{text:`${a.name}
${e.percent(l.value(3))}`,fill:e.labelColor,fontSize:12,lineHeight:16,align:Z?"left":"right",verticalAlign:"middle"}})}return{type:"group",children:f}}}));return r&&e.items.forEach((a,d)=>{o.push({id:`compare-${a.id}`,type:"custom",name:a.name,coordinateSystem:"none",cursor:"default",data:[[r[d],i[d][0],i[d][1],M[d]]],renderItem:(A,l)=>{let p=l.value(1),s=l.value(2);if(!(s-p>0))return null;let u=t(l);return{type:"sector",shape:{cx:u.cx,cy:u.cy,r:u.r0,r0:u.r*30/70,startAngle:p,endAngle:s,cornerRadius:4},style:{fill:b1(a.color,50/255),stroke:b1(a.color,127/255),lineWidth:1}}}})}),o.push({id:"total",type:"custom",coordinateSystem:"none",silent:!0,tooltip:{show:!1},data:[[H]],renderItem:(a,d)=>{let A=t(d);return{type:"text",x:A.cx,y:A.cy,style:{text:r?e.format(d.value(0)):`${e.total}
${e.format(d.value(0))}`,fill:e.centerColor,fontSize:r?12:14,lineHeight:24,fontWeight:"bold",align:"center",verticalAlign:"middle"}}}}),{data:o,options:{xAxis:{show:!1},yAxis:{show:!1},legend:{show:!1},tooltip:{show:!0,trigger:"item",formatter:a=>{let d=(a.seriesId??"").startsWith("compare-"),A=d?(a.seriesId??"").slice(8):a.seriesId,l=e.items.findIndex(g=>g.id===A);if(l<0)return"";let p=e.items[l],s=document.createElement("div"),u=a.value?.[0]??(d?r?.[l]??0:V[l]),f=a.value?.[3]??(d?M[l]:C[l]);return s.innerHTML=`<b>${v1(p.name)}${d&&e.compared?` \xB7 ${v1(e.compared)}`:""}</b><br>${j2(p.color)}${e.format(u)} (${e.percent(f)})`,s}}}}}var x1={solar:"var(--energy-solar-color, #ff9800)",grid:"var(--energy-grid-consumption-color, #488fc2)",cheap:"color-mix(in srgb, var(--energy-grid-consumption-color, #488fc2) 55%, #fff)",expensive:"color-mix(in srgb, var(--energy-grid-consumption-color, #488fc2) 70%, #000)",export:"var(--energy-grid-return-color, #8353d1)",heat:"var(--graph-color-30, var(--color-30, #bf3947))",car:"var(--energy-non-fossil-color, #0f9d58)"},U5=["#4269d0","#f4bd4a","#ff725c","#6cc5b0","#a463f2","#ff8ab7","#9c6b4e","#97bbf5","#01ab63","#094bad","#c99000","#d84f3e"];function E3(e){let V=e.trim(),C=/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(V)?.[1];if(C){let L=C.length===3?[...C].map(r=>r+r).join(""):C;return[0,2,4].map(r=>parseInt(L.slice(r,r+2),16))}let H=/^rgba?\(([^)]+)\)/i.exec(V)?.[1];if(H){let[L,r,M]=H.split(/[ ,/]+/).filter(Boolean).map(Number);if([L,r,M].every(Number.isFinite))return[L,r,M]}}var D3=([e,V,C])=>`#${[e,V,C].map(H=>Math.round(Math.min(Math.max(H,0),255)).toString(16).padStart(2,"0")).join("")}`;function G5(e,V,C){let H=E3(e);if(!H)return e;let L=V==="white"?255:0;return D3(H.map(r=>r*C+L*(1-C)))}function w(e){let V=getComputedStyle(e),C=(r,M)=>V.getPropertyValue(r).trim()||M,H=C("--energy-grid-consumption-color","#488fc2"),L=Array.from({length:54},(r,M)=>{let i=M+1;return V.getPropertyValue(`--graph-color-${i}`).trim()||V.getPropertyValue(`--color-${i}`).trim()||U5[M%U5.length]});return{solar:C("--energy-solar-color","#ff9800"),grid:H,cheap:G5(H,"white",.55),expensive:G5(H,"black",.7),export:C("--energy-grid-return-color","#8353d1"),batteryOut:C("--energy-battery-out-color","#4db6ac"),batteryIn:C("--energy-battery-in-color","#f06292"),standing:C("--electricity-lens-standing-charge-color","#a1887f"),heat:V.getPropertyValue("--graph-color-30").trim()||C("--color-30","#bf3947"),car:C("--energy-non-fossil-color","#0f9d58"),other:V.getPropertyValue("--history-unknown-color").trim()||C("--disabled-color","#bdbdbd"),line:C("--secondary-text-color","#727272"),consumers:L}}function E(e,V){let C=new Map,H=new Map,L=0;for(let r of e.areas)if(r.kind==="other")C.set(r.id,V.other);else if(r.kind==="device"){let M=V.consumers[L++%V.consumers.length];C.set(r.id,M);let i=r.statistics.energy?.[0];i&&H.set(i,M)}for(let r of e.areas)if(r.kind==="category")if(r.id==="heat_pump")C.set(r.id,V.heat);else{let i=(r.statistics.energy??[]).map(o=>H.get(o)).filter(Boolean),t=r.id==="wallbox"?V.car:V.grid;C.set(r.id,i[i.length-1]??t)}return C}var $3=e=>!!e&&typeof e.subscribe=="function";function G(e){if(e!==void 0&&!e.startsWith("energy_"))throw new Error("Collection keys must start with energy_.")}function I3(e,V){let C=location.pathname.split("/")[1]??"",H=e;for(let L of V?[`_${V}`]:[`_energy_${C}`,"_energy"])if($3(H[L]))return H[L]}var N3=()=>new Date().setHours(24,0,0,0)-1;function k1(e,V,C){let H,L,r=0,M=()=>{let i=I3(e,V);if(i){H=i.subscribe(t=>C({start:new Date(t.start).getTime(),end:t.end?new Date(t.end).getTime():N3()},t.startCompare&&t.endCompare?{start:new Date(t.startCompare).getTime(),end:new Date(t.endCompare).getTime()}:void 0));return}r+=1,r===2&&C(null),r<20&&(L=window.setTimeout(M,500))};return M(),()=>{window.clearTimeout(L),H?.()}}var W3={comma_decimal:"en-US",decimal_comma:"de",space_comma:"fr",quote_decimal:"de-CH"};function D(e,V){let C=e?.number_format,H=C==="system"?void 0:W3[C??""]??e?.language??"en";return new Intl.NumberFormat(H,{...V,...C==="none"?{useGrouping:!1}:{}})}function Q5(e,V){if(Math.abs(V)<1)return`${D(e,{maximumFractionDigits:0}).format(V*1e3)} W`;let C=Math.abs(V)<100?1:0;return`${D(e,{maximumFractionDigits:C,minimumFractionDigits:C}).format(V)} kW`}function K5(e){switch(e?.time_format){case"am_pm":return!0;case"24":return!1;case"system":return new Intl.DateTimeFormat(void 0,{hour:"numeric"}).resolvedOptions().hour12;default:return}}function j5(e){let V=/^([-−+]?[\d.,'’\u00a0\u202f ]*\d)[\u00a0\u202f ](.+)$/.exec(e);return V?[V[1],V[2]]:[e,""]}function t1(e,V){let C=(r,M)=>{let i=Math.abs(r),t=M??(i<10?2:i<100?1:0);return D(e,{maximumFractionDigits:t,minimumFractionDigits:M??0}).format(r)};return{number:C,value:(r,M)=>{switch(M){case"energy":return`${C(r,Math.abs(r)<100?1:0)} kWh`;case"money":{let i=Math.abs(r)<100;return D(e,{style:"currency",currency:V,maximumFractionDigits:i?2:0,minimumFractionDigits:i?2:0}).format(r)}case"price":return V==="EUR"?`${C(r*100,1)} ct/kWh`:`${D(e,{style:"currency",currency:V,maximumFractionDigits:3}).format(r)}/kWh`;case"percent":return D(e,{style:"percent",maximumFractionDigits:0}).format(r/100);case"number":return C(r,Math.abs(r)<10?2:Math.abs(r)<100?1:0);case"distance":return`${C(r,Math.abs(r)<100?1:0)} km`;case"per_100km":return`${D(e,{style:"currency",currency:V,maximumFractionDigits:2,minimumFractionDigits:2}).format(r)}/100 km`}},currencySymbol:()=>D(e,{style:"currency",currency:V}).formatToParts(0).find(r=>r.type==="currency")?.value??""}}function u1(e,V){let C=e?.states[V];if(C)return e?.formatEntityName?.(C)||C.attributes.friendly_name||void 0}function q5(e,V){let C=e?.states[V],H=C&&e?.formatEntityStateToParts?.(C);if(!H?.length)return;let L=r=>H.filter(M=>M.type==="unit"===r).map(M=>M.value).join("").trim();return[L(!1),L(!0)]}var q2={energy:["energy"],cost:["cost"],bill:["import_cost","standing_charge"],grid_price:["import_cost","energy"],device_grid_price:["cost","solar_cost","energy","solar"],price:["cost","energy","solar"],solar_share:["solar","energy"],cheap_share:["cheap","solar","energy"],expensive_share:["expensive","solar","energy"],cheap_saving:["cheap_saving"],self_consumption:["self_used","energy"],export:["export"],saving:["saving"],battery_saving:["battery_saving"],heat:["heat"],alternative_cost:["alternative_cost"],scop:["heat","energy"],heat_price:["cost","heat"],distance:["distance"],cost_per_100km:["cost","distance"],forecast_today:[],forecast_tomorrow:[],payback:[],annual_return:[]},z3={energy:["solar","export"],cost:["energy","solar","feed_in","standing_charge"],saving:["solar_saving"],heat:["energy"],distance:["energy"],cheap_share:["hours","cheap_hours"],expensive_share:["hours","expensive_hours"]},U3=Object.keys(q2),c1=e=>e==="forecast_today"||e==="forecast_tomorrow",i1=e=>e==="payback"||e==="annual_return";function o1(e){return U3.filter(V=>c1(V)?e.forecast===!0:i1(V)?e.investment===!0:q2[V].every(C=>e.statistics[C]?.length))}function J5(e,V){return[...q2[V],...z3[V]??[]].flatMap(C=>e.statistics[C]??[])}var e2=(e,V)=>V>0?e/V*100:null;function w1(e,V,C,H){let L=C("energy"),r=C("solar"),M=t=>({value:t,unit:"energy"}),i=t=>({value:t,unit:"money"});switch(e){case"energy":{if(L!==null&&r!==null&&L>0){if(V.kind==="household")return{value:L,unit:"energy",line:{key:"line_energy_parts",values:{grid:M(Math.max(L-r,0)),solar:M(r)}}};let o=e2(r,L)??0;return{value:L,unit:"energy",line:{key:"line_solar_part",values:{percent:{value:o,unit:"percent"}}}}}let t=C("export");return V.kind==="grid"&&t!==null?{value:L,unit:"energy",line:{key:"line_exported",values:{energy:M(t)}}}:{value:L,unit:"energy"}}case"cost":{let t=C("cost");if(t!==null&&L&&r!==null)return{value:t,unit:"money",line:{key:"line_average_price",values:{price:{value:t/L,unit:"price"}}}};let o=C("feed_in"),n=C("standing_charge");return t!==null&&o!==null&&n!==null?{value:t,unit:"money",line:{key:Math.abs(n)<.005?"line_bill_no_charge":"line_bill",values:{feed_in:i(o),charge:i(n)}}}:t!==null&&L!==null&&V.kind==="grid"?{value:t,unit:"money",line:{key:"line_for_import",values:{energy:M(L)}}}:{value:t,unit:"money"}}case"bill":{let t=C("import_cost"),o=C("standing_charge");return t===null||o===null?{value:null,unit:"money"}:{value:t+o,unit:"money",line:Math.abs(o)<.005?void 0:{key:"line_bill",values:{charge:i(o)}}}}case"grid_price":{let t=C("import_cost");return t===null||!L?{value:null,unit:"price"}:{value:t/L,unit:"price",line:{key:"line_cost_for",values:{cost:i(t),energy:M(L)}}}}case"device_grid_price":{let t=C("cost"),o=C("solar_cost");if(t===null||o===null||L===null||r===null)return{value:null,unit:"price"};let n=L-r;if(n<=0)return{value:null,unit:"price"};let a=t-o;return{value:a/n,unit:"price",line:{key:"line_cost_for",values:{cost:i(a),energy:M(n)}}}}case"cheap_saving":return{value:C("cheap_saving"),unit:"money",line:{key:"line_against_normal",values:{}}};case"price":{let t=C("cost");return t===null||!L?{value:null,unit:"price"}:{value:t/L,unit:"price",line:{key:"line_cost_for",values:{cost:{value:t,unit:"money"},energy:M(L)}}}}case"solar_share":return L===null||r===null?{value:null,unit:"percent"}:{value:e2(r,L),unit:"percent",line:{key:"line_part_of",values:{part:M(r),whole:M(L)}}};case"cheap_share":case"expensive_share":{let t=C(e==="cheap_share"?"cheap":"expensive");if(L===null||r===null||t===null)return{value:null,unit:"percent"};let o=Math.max(L-r,0),n=e2(t,o),a=e==="cheap_share"?"cheap":"expensive",d=C("hours");return d&&V.statistics[`${a}_hours`]?.length?{value:n,unit:"percent",line:{key:`line_${a}_hours`,values:{percent:{value:e2(C(`${a}_hours`)??0,d)??0,unit:"percent"}}}}:{value:n,unit:"percent",line:{key:"line_part_of",values:{part:M(t),whole:M(o)}}}}case"self_consumption":{let t=C("self_used");return L===null||t===null?{value:null,unit:"percent"}:{value:e2(t,L),unit:"percent",line:{key:"line_part_of",values:{part:M(t),whole:M(L)}}}}case"export":return{value:C("export"),unit:"energy"};case"saving":{let t=C("saving"),o=C("solar_saving");return t===null||o===null?{value:t,unit:"money"}:{value:t+o,unit:"money",line:Math.abs(o)<.005?void 0:{key:"line_saving_split",values:{solar:i(o)}}}}case"heat":{let t=C("heat");return t===null||L===null?{value:t,unit:"energy"}:{value:t,unit:"energy",line:{key:"line_from_electricity",values:{energy:M(L)}}}}case"alternative_cost":return{value:C("alternative_cost"),unit:"money"};case"battery_saving":return{value:C("battery_saving"),unit:"money"};case"scop":{let t=C("heat");return t===null||!L?{value:null,unit:"number"}:{value:t/L,unit:"number",line:{key:"line_heat_from",values:{heat:M(t),energy:M(L)}}}}case"heat_price":{let t=C("heat"),o=C("cost");return t===null||o===null||!t?{value:null,unit:"price"}:{value:o/t,unit:"price",line:{key:"line_cost_for",values:{cost:{value:o,unit:"money"},energy:M(t)}}}}case"distance":{let t=C("distance");return t===null||L===null?{value:t,unit:"distance"}:{value:t,unit:"distance",line:{key:"line_charged",values:{energy:M(L)}}}}case"cost_per_100km":{let t=C("distance"),o=C("cost");return t===null||o===null||!t?{value:null,unit:"per_100km"}:{value:o/t*100,unit:"per_100km",line:{key:"line_cost_for",values:{cost:{value:o,unit:"money"},energy:{value:t,unit:"distance"}}}}}case"forecast_today":case"forecast_tomorrow":return{value:H,unit:"energy"};case"payback":case"annual_return":return{value:null,unit:"percent"}}}var Y5=["change","mean","min","max"];function w2(e){if(!e)return Y5;let V=e.mean_type!==void 0?e.mean_type>0:!!e.has_mean;return Y5.filter(C=>C==="change"?!!e.has_sum:V)}var Y2=e=>e?.unit_class==="energy"?"kWh":e?.statistics_unit_of_measurement??"";function X5(e,V){let C=e.filter(r=>V[r]),H=C.filter(r=>!V[r].has_sum);if(H.length)return{problem:"no_sum",ids:H};let L=[...new Set(C.map(r=>Y2(V[r])))];return L.length>1?{problem:"units",units:L}:void 0}var Q=e=>e.statistic!==void 0?"statistic":e.entity!==void 0?"entity":"energy";function G3(e,V){let C=new Date(e),H=new Date(V),L=i=>Date.UTC(i.getFullYear(),i.getMonth(),i.getDate()),r=Math.round((L(H)-L(C))/864e5),M=i=>i.getTime()-new Date(i).setHours(0,0,0,0);return M(H)<M(C)?r-1:r}function a1({start:e,end:V}){let C=G3(e,V),H=new Date(V);return new Date(e).getDate()===1&&new Date(H.getFullYear(),H.getMonth(),H.getDate()+1).getDate()===1&&C>35?"month":C>2?"day":"hour"}var P1=e=>e==="year"?"month":e,Q3=(e,V)=>{let C=new Date(e);return V==="hour"?C.setMinutes(0,0,0):(C.setHours(0,0,0,0),V==="day"||(C.setDate(1),V==="month")?C.getTime():C.setMonth(0))},K3=(e,V)=>{let C=new Date(e);return V==="hour"?C.setHours(C.getHours()+1):V==="day"?C.setDate(C.getDate()+1):V==="month"?C.setMonth(C.getMonth()+1):C.setFullYear(C.getFullYear()+1),C.getTime()};function J2({start:e,end:V},C){let H=[];for(let L=Q3(e,C);L<=V&&H.length<400;L=K3(L,C))H.push(L);return H}function C3(e,V=new Date){let C=e.filter(L=>L!==null).map(L=>L.getFullYear()),H=Math.min(V.getFullYear(),...C);return{start:new Date(H,0,1).getTime(),end:new Date(V.getFullYear()+1,0,1).getTime()-1}}var H3=2e3;function V3(e,V){for(let C=0;C<V;C+=1)if(e.some(H=>H[C]!==null&&H[C]!==void 0))return C;return 0}function X2(e,V,C){let H=V.map(()=>null),L=C==="hour"?0:12*36e5;for(let r of e??[]){if(r.change===null||r.change===void 0)continue;let M=(typeof r.start=="number"?r.start:Date.parse(r.start))+L,i=-1;for(let t=0;t<V.length&&V[t]<=M;t+=1)i=t;i<0||(H[i]=(H[i]??0)+r.change)}return H}function K(e,V=new Date){let C=(M,i)=>({start:M.getTime(),end:i.getTime()-1}),H=V.getFullYear(),L=V.getMonth(),r=V.getDate();switch(e){case"today":return C(new Date(H,L,r),new Date(H,L,r+1));case"yesterday":return C(new Date(H,L,r-1),new Date(H,L,r));case"this_month":return C(new Date(H,L,1),new Date(H,L+1,1));case"last_month":return C(new Date(H,L-1,1),new Date(H,L,1));case"this_year":return C(new Date(H,0,1),new Date(H+1,0,1));case"last_year":return C(new Date(H-1,0,1),new Date(H,0,1))}}function L3(e,V,C){let H=V.map(()=>0),L=V.map(()=>0),r=C==="hour"?0:12*36e5;for(let M of e??[]){if(M.mean===null||M.mean===void 0)continue;let i=(typeof M.start=="number"?M.start:Date.parse(M.start))+r,t=-1;for(let o=0;o<V.length&&V[o]<=i;o+=1)t=o;t<0||(H[t]+=M.mean,L[t]+=1)}return H.map((M,i)=>L[i]?M/L[i]:null)}var b="electricity_lens",B1=["pv","heat_pump","wallbox"],j3=["gas","oil","lpg","pellets","district_heating","electric"],B=e=>{if(e==null||e==="")return null;let V=Number(e);return Number.isFinite(V)?V:null},q3=e=>typeof e=="string"&&e?new Date(e):null;function R(e){let V=Object.values(e.entities??{}).filter(r=>r.platform===b),C=(r,M)=>V.find(i=>i.device_id===r&&i.translation_key===M),H=r=>r?B(e.states[r]?.state):null,L=[];for(let r of V){if(r.translation_key!=="saving")continue;let M=e.states[r.entity_id];if(!M||M.state==="unavailable")continue;let i=M.attributes,t=i.category;B1.includes(t)&&L.push({category:t,savingStatistic:typeof i.statistic_id=="string"?i.statistic_id:`${b}:${t}_saving`,calculating:i.calculating===!0,saving:B(M.state),investment:B(i.investment),balance:B(i.balance),perYear:H(C(r.device_id,"saving_per_year")?.entity_id),countingSince:q3(i.counting_since),entityId:r.entity_id,heating:j3.includes(i.heating)?i.heating:null,battery:Y3(i.battery)})}return L.sort((r,M)=>B1.indexOf(r.category)-B1.indexOf(M.category))}function Y3(e){if(typeof e!="object"||e===null)return null;let V=e,C=B(V.saving);return C===null?null:{saving:C,investment:B(V.investment),perYear:B(V.per_year),payback:B(V.payback),yearsLeft:B(V.years_left)}}function P2(e){let V=Object.values(e.entities??{}).filter(C=>C.platform===b);return V.filter(C=>C.translation_key==="saving").flatMap(C=>{let H=e.states[C.entity_id]?.attributes,L=t=>V.find(o=>o.device_id===C.device_id&&o.translation_key===t)?.entity_id,r=L("payback"),M=L("annual_return"),i=H?.category;return B1.includes(i)&&Number(H?.investment)>0&&r&&M?[{category:i,payback:r,annualReturn:M}]:[]}).sort((C,H)=>B1.indexOf(C.category)-B1.indexOf(H.category))}var r2=e=>e==="pv"?"solar":e;function C5(e){let V=Object.values(e.entities??{}).find(H=>H.platform===b&&H.translation_key==="balance"),C=V?e.states[V.entity_id]:void 0;return!C||C.state==="unavailable"?null:{balance:B(C.state),saved:B(C.attributes.saved)??0,invested:B(C.attributes.invested)??0,perYear:B(C.attributes.per_year),payback:B(C.attributes.payback),yearsLeft:B(C.attributes.years_left),progress:B(C.attributes.progress),entityId:V.entity_id}}var T1=(e,V)=>(e?C5(e)?.progress:null)??V?.progress??null;function F1(e){return Object.values(e.entities??{}).some(C=>C.platform===b&&C.translation_key==="saving")?"integration_unavailable":"not_set_up"}var J3=300*1e3,j=5*1e3,Z1,H5,q=()=>Z1?.value;function z(){if(!Z1)return!0;let e=Z1.value&&!Z1.value.calculating?J3:j;return Date.now()-Z1.at>e}function Y(e){return z()?(H5??=e.callWS({type:`${b}/figures`}).then(V=>V).catch(()=>null).then(V=>(Z1={at:Date.now(),value:V},H5=void 0,V)),H5):Promise.resolve(Z1?.value??null)}var X3=6e4,e3=new WeakMap;function C0(e){let V=e.entities??{},C=e3.get(V);return C||(C=Object.values(V).filter(H=>H.platform===b).map(H=>H.entity_id),e3.set(V,C)),C}var W=class extends P{constructor(){super(...arguments);this._lookedAt=0}_watched(){return[]}_changedFor(C,H){return C.locale!==H.locale||C.language!==H.language||C.config!==H.config||C.themes!==H.themes||C.selectedTheme!==H.selectedTheme||C.entities!==H.entities||[...C0(H),...this._watched()].some(L=>C.states[L]!==H.states[L])}shouldUpdate(C){let H=C.get("hass"),L=C.size===1&&H!==void 0&&this.hass!==void 0,r=Date.now()-this._lookedAt>=X3;return L&&!r&&!this._changedFor(H,this.hass)?!1:(this._lookedAt=Date.now(),!0)}};var V5={title:"Economics","category.pv":"Solar","category.heat_pump":"Heat pump","category.wallbox":"Electric car",not_set_up:"Set up the Electricity Lens integration to see what your solar panels, heat pump, and electric car have saved.",integration_unavailable:"The figures aren't available right now. Check Electricity Lens under Settings > Devices & services.",calculating:"Being computed \u2026",calculating_progress:"Being computed \u2026 {percent} %",loading:"Loading \u2026",column_area:"Area",column_per_year:"Per year",column_saving:"Saving",column_investment:"Investment",column_balance:"Balance",total:"Total",battery_part:"of which battery",average:"\xD8 {amount}",line_payback:"of {investment}",line_payback_left:"about {time} left",summary_paid_back:"Paid back: the savings cover all investments.",summary_payback:"{percent} paid back.",summary_payback_left:"{percent} paid back, about {time} to go.",line_return:"Total {amount}",return_value:"{rate} % a year",payback_unit:"% paid back",months_one:"1 month",months_other:"{count} months",years_one:"1 year",years_other:"{count} years",savings_title:"Savings",savings_source:"Saved by",savings_energy:"Energy",savings_amount:"Amount",savings_total:"Total",savings_pv:"Self-consumption",savings_feed_in:"Feed-in",savings_instead_gas:"Gas heating costs",savings_instead_oil:"Oil heating costs",savings_instead_lpg:"LPG heating costs",savings_instead_pellets:"Pellet heating costs",savings_instead_district_heating:"District heating costs",savings_instead_electric:"Electric heating costs",savings_instead_fuel:"Combustion car costs",savings_saved:"Saved",savings_part_heat_pump:"of which heat pump",savings_part_wallbox:"of which electric car",savings_part_pv:"of which solar",meters_consumer:"Device",meters_electricity:"Electricity",heat_meters_title:"COP by device",history_title:"Savings",history_total:"Total",history_no_chart:"The chart is only shown in Home Assistant.",history_failed:"The statistics could not be loaded.",history_empty:"No savings in this period.",figures_failed:"The figures could not be loaded.",figures_not_loaded:"not loaded",figures_unavailable:"not available",statistic_no_sum:"no total for this statistic",statistic_no_mean:"no average for this statistic","figure.energy":"Consumption","figure.energy.grid":"Grid import","figure.energy.solar":"Solar production","figure.energy.heat_pump":"Electricity","figure.energy.wallbox":"Charged energy","figure.cost":"Costs","figure.cost.grid":"Grid costs","figure.cost.heat_pump":"Electricity costs","figure.cost.wallbox":"Charging costs","figure.bill":"Electricity bill","figure.grid_price":"Avg. grid price","figure.device_grid_price":"Avg. grid price","figure.price":"Avg. price","figure.solar_share":"Solar share","figure.solar_share.household":"Self-sufficiency","figure.cheap_share":"Grid cheap","figure.expensive_share":"Grid expensive","figure.cheap_saving":"Tariff saving","figure.self_consumption":"Self-consumption","figure.export":"Feed-in","figure.saving":"Saving","figure.payback":"Payback","figure.annual_return":"Return","figure.forecast_today":"Solar today","figure.forecast_tomorrow":"Solar tomorrow","figure.heat":"Heat","figure.alternative_cost":"Comparison costs","figure.battery_saving":"Battery saving","figure.scop":"COP","figure.heat_price":"Heat price","figure.distance":"Distance","figure.cost_per_100km":"Costs per 100 km",figure_of:"{area}: {figure}",line_saving_split:"of which {solar} by solar",line_bill:"{charge} standing charge",line_bill_no_charge:"feed-in \u2212{feed_in}",line_against_normal:"vs. normal price",line_cheap_hours:"{percent} of hours cheap",line_expensive_hours:"{percent} of hours expensive",line_from_electricity:"from {energy} electricity",line_heat_from:"{heat} from {energy}",line_charged:"with {energy} charged",line_solar_part:"{percent} of it solar power",line_energy_parts:"Grid {grid}, solar {solar}",line_exported:"{energy} fed in",line_average_price:"average {price}",line_for_import:"for {energy} imported",line_cost_for:"{cost} for {energy}",line_part_of:"{part} of {whole}","value.change":"total in the period","value.mean":"average","value.min":"minimum","value.max":"maximum",value_range:"from {min} to {max}","period.energy_date":"Follow the date selection","period.today":"Today","period.yesterday":"Yesterday","period.this_month":"This month","period.last_month":"Last month","period.this_year":"This year","period.last_year":"Last year","period.all":"All years",editor_title:"Title (optional)",editor_period:"Period",editor_period_hint:"Without a date selection on the dashboard: this month.",editor_period_hint_years:"Without a date selection on the dashboard: all years.",editor_source:"Source","source.energy":"Energy data","source.statistic":"Statistic","source.entity":"Entity",editor_area:"Area",editor_figure:"Figure",editor_statistic:"Statistic",editor_value:"Value",editor_secondary:"Line below","secondary.none":"Default","secondary.range":"Range of the period",editor_entity:"Entity",editor_name:"Name (optional)",editor_not_loaded:"Energy data need the Electricity Lens integration.","source.solar":"Solar power","source.grid":"Grid power","source.normal":"Grid normal","source.cheap":"Grid cheap","source.expensive":"Grid expensive","source.export":"Feed-in","source.standing_charge":"Standing charge","stack.source":"By source","stack.bill":"By bill item","stack.consumer":"By device","stack.none":"None",editor_savings:"Savings of all areas",editor_stack:"Split",editor_line:"Line",editor_lines:"Further lines",editor_line_none:"None",history_empty_figure:"No data in this period.",breakdown_mix:"Electricity mix",breakdown_cost_by_device:"Cost distribution",breakdown_energy_by_device:"Consumption distribution",breakdown_heat_pump_by_device:"Electricity by device",breakdown_statistics:"Distribution",breakdown_compared:"Compared {amount}",breakdown_compare_period:"compared period",breakdown_total:"Total",breakdown_no_sum:"Only statistics with a total have shares. Without a total: {names}.",breakdown_units:"The statistics have different units ({units}), so they don't add up.","mix.solar":"Solar","mix.grid":"Grid","mix.normal":"Grid normal","mix.cheap":"Grid cheap","mix.expensive":"Grid expensive",editor_by:"Split","by.source":"By source","by.consumer":"By device",editor_display:"Display","display.ring":"Ring","display.bars":"Bars",editor_color_by_source:"Color the bars by source",editor_breakdown_source:"Data","breakdown_source.energy":"Energy data","breakdown_source.statistics":"Statistics",editor_statistics:"Statistics","figure_choice.energy":"Consumption","figure_choice.cost":"Costs","strategy.title":"Electricity","strategy.overview":"Now","strategy.electricity":"Consumption","strategy.forecast_today":"Solar left today","strategy.forecast_tomorrow":"Solar tomorrow","strategy.cost_today":"Costs today","strategy.consumption_today":"Used today","strategy.bill":"Electricity bill","strategy.cost_by_source":"Costs by source","strategy.cost_history":"Costs by device","strategy.cost_distribution":"Cost distribution","strategy.price_with_solar":"Price incl. solar","strategy.costs":"Costs","strategy.heating":"Heating","strategy.charging":"Charging","strategy.usage_graph":"Consumption by source","strategy.solar_graph":"Solar production","strategy.devices_graph":"Consumption by device","strategy.distribution":"Energy flow","strategy.heat_distribution":"Heat distribution","strategy.not_loaded":"Set up the Electricity Lens integration to see this dashboard.","flow.title":"Power flow","flow.from":"From","flow.to":"To","flow.battery":"Battery","flow.other":"Other","flow.idle":"No power is flowing right now.","flow.grid":"All power comes from the grid.","flow.share_solar":"The solar panels cover {share}, {grid} come from the grid.","flow.share_battery":"The battery covers {share}, {grid} come from the grid.","flow.share_both":"Solar panels and battery cover {share}, {grid} come from the grid.","flow.covered_solar":"The solar panels cover all consumption","flow.covered_battery":"The battery covers all consumption","flow.covered_both":"Solar panels and battery cover all consumption","flow.surplus_grid":"{power} go to the grid","flow.surplus_battery":"{power} go to the battery","flow.surplus_both":"{grid} go to the grid, {battery} to the battery","flow.no_sensor":"Add a power sensor for the grid in the energy dashboard to see where the power flows right now.","flow.unavailable":"The power can't be read right now.",info_label:"What counts here","info.economics.saving":"what each area has saved since counting began; Per year scales it to a year.","info.economics.investment":"the purchase cost, for the heat pump and the electric car the extra cost over the comparison.","info.economics.balance":"savings minus investment. In the plus, an area has paid for itself.","info.economics.battery":"what the battery adds to the solar saving, and its own payback.","info.economics.note":"The benefit of solar power counts for solar alone, so nothing counts twice. A row opens its sensor.","info.savings.pv":"solar power used in the house, valued at the grid price of the hour it replaced.","info.savings.feed_in":"the compensation for solar power sent to the grid.","info.savings.heat_pump":"what {heating} would have cost for the same heat, less the heat pump's electricity at the grid price of each hour.","info.savings.wallbox":"what a combustion car would have cost in fuel for the same distance, less the charged energy at the grid price of each hour.","info.savings.note":"The benefit of solar power counts for self-consumption alone, so nothing counts twice. The Heating and Charging views show the saving with solar power.","heating.gas":"the gas heating","heating.oil":"the oil heating","heating.lpg":"the LPG heating","heating.pellets":"the pellet heating","heating.district_heating":"district heating","heating.electric":"the electric heating","info.reckoning.heating":"what {heating} would have cost for the same heat, with its usual efficiency and your price.","info.reckoning.fuel":"fuel for the same distance: the charged energy divided by the electric car's consumption, times the combustion car's consumption and your fuel price.","info.reckoning.electricity":"grid power at the price of its hour, solar power at the feed-in compensation you forgo.","info.reckoning.split_term":"Split","info.reckoning.split":"Economics counts the benefit of solar power for solar, so nothing counts twice. Here that is the part \u201Cof which solar\u201D.","info.heat_meters":"The COP is the heat divided by the electricity of the period, for each device from its heat and electricity meters. Over a whole year it is the seasonal COP; shorter periods vary with the weather and hot water.","info.cost_by_source":"Grid power costs the price of its hour, solar power the feed-in compensation you forgo by using it yourself. So the costs show what the electricity was worth.","info.cost_by_source.feed_in":"The feed-in stands below the line and is not part of the total.","info.bill":"What the supplier bills: grid power by price level and the standing charge, shared evenly over the hours of its month. The feed-in compensation is not deducted.","info.price":"Costs per kWh of consumption: grid power at the price of its hour, solar power at the feed-in compensation you forgo.","info.heat_price":"The heat pump's electricity costs per kWh of heat.","info.payback":"The share of the investment the savings have covered. The time left follows from the saving per year.","info.annual_return":"The yearly interest the investment has earned: a savings account would have needed this rate to keep up.","info.cheap_share":"The share of your grid power drawn in cheap hours. An hour is cheap at a price at least 10 % below the normal price, the price of most hours of the last 7 days. Below: the share of hours that were cheap. What you reach beyond it comes from choosing the time.","info.expensive_share":"The share of your grid power drawn in expensive hours. An hour is expensive at a price at least 10 % above the normal price, the price of most hours of the last 7 days. Below: the share of hours that were expensive.","info.cheap_saving":"What cheap grid power cost less, and expensive grid power more, than at the normal price, the price of most hours of the last 7 days. With a flat price it is 0. After a change of tariff the normal price takes a few days to follow.","picker.flow":"Electricity Lens power flow","picker.flow.description":"Where the power comes from right now and where it goes, as two bars, from the energy dashboard's power sensors.","picker.economics":"Electricity Lens economics","picker.economics.description":"What your solar panels, heat pump, and electric car have saved, against what they cost.","picker.savings":"Electricity Lens savings","picker.savings.description":"What solar power, the heat pump, and the electric car saved in the selected period, as a table, or one area's saving reckoned up. Follows the energy date selection.","picker.heat_meters":"Electricity Lens heat meters","picker.heat_meters.description":"Heat, electricity, and COP of each of the heat pump's meters in the selected period. Follows the energy date selection.","picker.history":"Electricity Lens history","picker.history.description":"Savings, consumption, or costs per period as bars, stacked by source or device, with lines. Follows the energy date selection.","picker.figures":"Electricity Lens key figures","picker.figures.description":"One key figure for a period: costs, solar share, cheap grid power, savings, or any statistic or entity.","picker.breakdown":"Electricity Lens breakdown","picker.breakdown.description":"Shares for a period as a ring or bars: the electricity mix, consumption or costs by device, or any statistics.","picker.dashboard":"Electricity Lens","picker.dashboard.description":"A finished electricity dashboard with costs, electricity mix, solar, heat pump, car, and the balance."},H0={title:"Wirtschaftlichkeit","category.pv":"PV-Anlage","category.heat_pump":"W\xE4rmepumpe","category.wallbox":"E-Auto",not_set_up:"Richte die Integration Electricity Lens ein, um zu sehen, was PV-Anlage, W\xE4rmepumpe und E-Auto gespart haben.",integration_unavailable:"Die Zahlen sind gerade nicht verf\xFCgbar. Pr\xFCfe Electricity Lens unter Einstellungen > Ger\xE4te & Dienste.",calculating:"Wird berechnet \u2026",calculating_progress:"Wird berechnet \u2026 {percent} %",loading:"Wird geladen \u2026",column_area:"Bereich",column_per_year:"Pro Jahr",column_saving:"Ersparnis",column_investment:"Investition",column_balance:"Bilanz",total:"Gesamt",battery_part:"davon Batterie",average:"\xD8 {amount}",line_payback:"von {investment}",line_payback_left:"noch etwa {time}",summary_paid_back:"Amortisiert: Die Ersparnis deckt alle Investitionen.",summary_payback:"Zu {percent} amortisiert.",summary_payback_left:"Zu {percent} amortisiert, noch etwa {time} bis ins Plus.",line_return:"Gesamt {amount}",return_value:"{rate} % p. a.",payback_unit:"% amortisiert",months_one:"1 Monat",months_other:"{count} Monate",years_one:"1 Jahr",years_other:"{count} Jahre",savings_title:"Ersparnis",savings_source:"Ersparnis durch",savings_energy:"Energie",savings_amount:"Betrag",savings_total:"Gesamt",savings_pv:"Eigenverbrauch",savings_feed_in:"Einspeisung",savings_instead_gas:"Kosten Gasheizung",savings_instead_oil:"Kosten \xD6lheizung",savings_instead_lpg:"Kosten Fl\xFCssiggasheizung",savings_instead_pellets:"Kosten Pelletheizung",savings_instead_district_heating:"Kosten Fernw\xE4rme",savings_instead_electric:"Kosten Stromheizung",savings_instead_fuel:"Kosten Verbrenner",savings_saved:"Gespart",savings_part_heat_pump:"davon W\xE4rmepumpe",savings_part_wallbox:"davon E-Auto",savings_part_pv:"davon PV-Anlage",meters_consumer:"Ger\xE4t",meters_electricity:"Strom",heat_meters_title:"COP nach Ger\xE4t",history_title:"Ersparnis",history_total:"Gesamt",history_no_chart:"Das Diagramm erscheint nur in Home Assistant.",history_failed:"Die Statistik konnte nicht geladen werden.",history_empty:"Keine Ersparnis in diesem Zeitraum.",figures_failed:"Die Kennzahlen konnten nicht geladen werden.",figures_not_loaded:"nicht geladen",figures_unavailable:"nicht verf\xFCgbar",statistic_no_sum:"keine Summe f\xFCr diese Statistik",statistic_no_mean:"kein Mittelwert f\xFCr diese Statistik","figure.energy":"Verbrauch","figure.energy.grid":"Netzbezug","figure.energy.solar":"PV-Erzeugung","figure.energy.heat_pump":"Stromverbrauch","figure.energy.wallbox":"Geladene Energie","figure.cost":"Kosten","figure.cost.grid":"Netzkosten","figure.cost.heat_pump":"Stromkosten","figure.cost.wallbox":"Ladekosten","figure.bill":"Stromrechnung","figure.grid_price":"\xD8 Netzpreis","figure.device_grid_price":"\xD8 Netzpreis","figure.price":"\xD8 Strompreis","figure.solar_share":"PV-Anteil","figure.solar_share.household":"Autarkie","figure.cheap_share":"Netz g\xFCnstig","figure.expensive_share":"Netz teuer","figure.cheap_saving":"Tarifersparnis","figure.self_consumption":"Eigenverbrauch","figure.export":"Einspeisung","figure.saving":"Ersparnis","figure.payback":"Amortisation","figure.annual_return":"Rendite","figure.forecast_today":"PV heute","figure.forecast_tomorrow":"PV morgen","figure.heat":"W\xE4rme","figure.alternative_cost":"Vergleichskosten","figure.battery_saving":"Batterie-Ersparnis","figure.scop":"COP","figure.heat_price":"W\xE4rmepreis","figure.distance":"Strecke","figure.cost_per_100km":"Kosten pro 100 km",figure_of:"{figure} {area}",line_saving_split:"davon {solar} durch PV",line_bill:"inkl. {charge} Grundpreis",line_bill_no_charge:"Einspeisung \u2212{feed_in}",line_against_normal:"zum Normalpreis",line_cheap_hours:"{percent} der Stunden g\xFCnstig",line_expensive_hours:"{percent} der Stunden teuer",line_from_electricity:"aus {energy} Strom",line_heat_from:"{heat} aus {energy}",line_charged:"mit {energy} geladen",line_solar_part:"davon {percent} PV-Strom",line_energy_parts:"Netz {grid}, PV {solar}",line_exported:"{energy} eingespeist",line_average_price:"\xD8 {price}",line_for_import:"f\xFCr {energy} Netzbezug",line_cost_for:"{cost} f\xFCr {energy}",line_part_of:"{part} von {whole}","value.change":"Summe im Zeitraum","value.mean":"Mittelwert","value.min":"Minimum","value.max":"Maximum",value_range:"von {min} bis {max}","period.energy_date":"Der Datumsauswahl folgen","period.today":"Heute","period.yesterday":"Gestern","period.this_month":"Dieser Monat","period.last_month":"Letzter Monat","period.this_year":"Dieses Jahr","period.last_year":"Letztes Jahr","period.all":"Alle Jahre",editor_title:"Titel (optional)",editor_period:"Zeitraum",editor_period_hint:"Ohne Datumsauswahl auf dem Dashboard: dieser Monat.",editor_period_hint_years:"Ohne Datumsauswahl auf dem Dashboard: alle Jahre.",editor_source:"Quelle","source.energy":"Energiedaten","source.statistic":"Statistik","source.entity":"Entit\xE4t",editor_area:"Bereich",editor_figure:"Gr\xF6\xDFe",editor_statistic:"Statistik",editor_value:"Wert",editor_secondary:"Unterzeile","secondary.none":"Standard","secondary.range":"Spanne im Zeitraum",editor_entity:"Entit\xE4t",editor_name:"Name (optional)",editor_not_loaded:"Energiedaten brauchen die Integration Electricity Lens.","source.solar":"PV-Strom","source.grid":"Netzstrom","source.normal":"Netz normal","source.cheap":"Netz g\xFCnstig","source.expensive":"Netz teuer","source.export":"Einspeisung","source.standing_charge":"Grundpreis","stack.source":"Nach Quelle","stack.bill":"Nach Rechnungsposten","stack.consumer":"Nach Ger\xE4t","stack.none":"Keine",editor_savings:"Ersparnis aller Bereiche",editor_stack:"Aufteilen",editor_line:"Linie",editor_lines:"Weitere Linien",editor_line_none:"Keine",history_empty_figure:"Keine Daten in diesem Zeitraum.",breakdown_mix:"Strommix",breakdown_cost_by_device:"Kostenverteilung",breakdown_energy_by_device:"Verbrauchsverteilung",breakdown_heat_pump_by_device:"Strom nach Ger\xE4t",breakdown_statistics:"Verteilung",breakdown_compared:"Vergleich {amount}",breakdown_compare_period:"Vergleichszeitraum",breakdown_total:"Gesamt",breakdown_no_sum:"Nur Statistiken mit Summe haben Anteile. Ohne Summe: {names}.",breakdown_units:"Die Statistiken haben verschiedene Einheiten ({units}) und lassen sich nicht zusammenz\xE4hlen.","mix.solar":"PV","mix.grid":"Netz","mix.normal":"Netz normal","mix.cheap":"Netz g\xFCnstig","mix.expensive":"Netz teuer",editor_by:"Aufteilen","by.source":"Nach Quelle","by.consumer":"Nach Ger\xE4t",editor_display:"Darstellung","display.ring":"Ring","display.bars":"Balken",editor_color_by_source:"Balken nach Quelle f\xE4rben",editor_breakdown_source:"Daten","breakdown_source.energy":"Energiedaten","breakdown_source.statistics":"Statistiken",editor_statistics:"Statistiken","figure_choice.energy":"Verbrauch","figure_choice.cost":"Kosten","strategy.title":"Strom","strategy.overview":"Jetzt","strategy.electricity":"Verbrauch","strategy.forecast_today":"PV heute noch","strategy.forecast_tomorrow":"PV morgen","strategy.cost_today":"Kosten heute","strategy.consumption_today":"Verbrauch heute","strategy.bill":"Stromrechnung","strategy.cost_by_source":"Kosten nach Quelle","strategy.cost_history":"Kosten nach Ger\xE4t","strategy.cost_distribution":"Kostenverteilung","strategy.price_with_solar":"\xD8 Preis inkl. PV","strategy.costs":"Kosten","strategy.heating":"Heizen","strategy.charging":"Laden","strategy.usage_graph":"Verbrauch nach Quelle","strategy.solar_graph":"PV-Erzeugung","strategy.devices_graph":"Verbrauch nach Ger\xE4t","strategy.distribution":"Energiefluss","strategy.heat_distribution":"W\xE4rmeverteilung","strategy.not_loaded":"Richte die Integration Electricity Lens ein, um dieses Dashboard zu sehen.","flow.title":"Leistungsfluss","flow.from":"Woher","flow.to":"Wohin","flow.battery":"Batterie","flow.other":"Sonstiges","flow.idle":"Gerade flie\xDFt kein Strom.","flow.grid":"Der ganze Strom kommt aus dem Netz.","flow.share_solar":"Die PV-Anlage deckt {share}, {grid} kommen aus dem Netz.","flow.share_battery":"Die Batterie deckt {share}, {grid} kommen aus dem Netz.","flow.share_both":"PV-Anlage und Batterie decken {share}, {grid} kommen aus dem Netz.","flow.covered_solar":"Die PV-Anlage deckt den ganzen Verbrauch","flow.covered_battery":"Die Batterie deckt den ganzen Verbrauch","flow.covered_both":"PV-Anlage und Batterie decken den ganzen Verbrauch","flow.surplus_grid":"{power} gehen ins Netz","flow.surplus_battery":"{power} gehen in die Batterie","flow.surplus_both":"{grid} gehen ins Netz, {battery} in die Batterie","flow.no_sensor":"Gib im Energie-Dashboard einen Leistungssensor f\xFCr das Netz an, um zu sehen, wohin die Leistung gerade flie\xDFt.","flow.unavailable":"Die Leistung l\xE4sst sich gerade nicht lesen.",info_label:"Was hier z\xE4hlt","info.economics.saving":"was jeder Bereich seit Beginn der Z\xE4hlung gespart hat; \u201EPro Jahr\u201C rechnet das auf ein Jahr hoch.","info.economics.investment":"die Anschaffungskosten, bei W\xE4rmepumpe und E-Auto die Mehrkosten gegen\xFCber dem Vergleich.","info.economics.balance":"Ersparnis minus Investition. Im Plus hat sich ein Bereich bezahlt gemacht.","info.economics.battery":"was die Batterie zur Ersparnis der PV-Anlage beitr\xE4gt, mit eigener Amortisation.","info.economics.note":"Den Vorteil des PV-Stroms z\xE4hlt nur die PV-Anlage, damit nichts doppelt z\xE4hlt. Eine Zeile \xF6ffnet ihren Sensor.","info.savings.pv":"PV-Strom im Haus, bewertet mit dem Netzpreis der Stunde, den er ersetzt.","info.savings.feed_in":"die Verg\xFCtung f\xFCr PV-Strom, der ins Netz geht.","info.savings.heat_pump":"was {heating} f\xFCr dieselbe W\xE4rme gekostet h\xE4tte, abz\xFCglich des Stroms der W\xE4rmepumpe zum Netzpreis der Stunde.","info.savings.wallbox":"was ein Verbrenner f\xFCr dieselbe Strecke an Sprit gekostet h\xE4tte, abz\xFCglich der geladenen Energie zum Netzpreis der Stunde.","info.savings.note":"Den Vorteil des PV-Stroms z\xE4hlt nur der Eigenverbrauch, damit nichts doppelt z\xE4hlt. Unter Heizen und Laden steht die Ersparnis mit PV-Strom.","heating.gas":"die Gasheizung","heating.oil":"die \xD6lheizung","heating.lpg":"die Fl\xFCssiggasheizung","heating.pellets":"die Pelletheizung","heating.district_heating":"die Fernw\xE4rme","heating.electric":"die Stromheizung","info.reckoning.heating":"was {heating} f\xFCr dieselbe W\xE4rme gekostet h\xE4tte, mit ihrem \xFCblichen Wirkungsgrad und deinem Preis.","info.reckoning.fuel":"Sprit f\xFCr dieselbe Strecke: geladene Energie geteilt durch den Verbrauch des E-Autos, mal dem Verbrauch des Verbrenners und deinem Spritpreis.","info.reckoning.electricity":"Netzstrom zum Preis seiner Stunde, PV-Strom zur Einspeiseverg\xFCtung, die dir entgeht.","info.reckoning.split_term":"Aufteilung","info.reckoning.split":"Die Wirtschaftlichkeit z\xE4hlt den Vorteil des PV-Stroms bei der PV-Anlage, damit nichts doppelt z\xE4hlt. Hier ist das der Teil \u201Edavon PV-Anlage\u201C.","info.heat_meters":"Der COP ist die W\xE4rme geteilt durch den Strom des Zeitraums, je Ger\xE4t aus seinen W\xE4rmemengen- und Stromz\xE4hlern. \xDCber ein ganzes Jahr ist das die Jahresarbeitszahl; k\xFCrzere Zeitr\xE4ume schwanken mit Wetter und Warmwasser.","info.cost_by_source":"Netzstrom kostet den Preis seiner Stunde, PV-Strom die Einspeiseverg\xFCtung, die dir entgeht, wenn du ihn selbst nutzt. So zeigen die Kosten, was der Strom wert war.","info.cost_by_source.feed_in":"Die Einspeisung steht unter der Linie und z\xE4hlt nicht zum Gesamt.","info.bill":"Was der Versorger berechnet: Netzstrom nach Preisstufe und der Grundpreis, gleichm\xE4\xDFig auf die Stunden des Monats verteilt. Die Einspeiseverg\xFCtung ist nicht abgezogen.","info.price":"Kosten je kWh Verbrauch: Netzstrom zum Preis seiner Stunde, PV-Strom zur Einspeiseverg\xFCtung, die dir entgeht.","info.heat_price":"Die Stromkosten der W\xE4rmepumpe je kWh W\xE4rme.","info.payback":"Der Anteil der Investition, den die Ersparnis schon gedeckt hat. Die Restzeit folgt aus der Ersparnis pro Jahr.","info.annual_return":"Die j\xE4hrliche Verzinsung der Investition: Ein Sparkonto h\xE4tte diesen Zins gebraucht, um mitzuhalten.","info.cheap_share":"Der Anteil deines Netzstroms aus g\xFCnstigen Stunden. G\xFCnstig ist eine Stunde mindestens 10 % unter dem Normalpreis, dem Preis der meisten Stunden der letzten 7 Tage. Darunter: der Anteil der Stunden, die g\xFCnstig waren. Was du dar\xFCber erreichst, kommt von der Wahl der Zeit.","info.expensive_share":"Der Anteil deines Netzstroms aus teuren Stunden. Teuer ist eine Stunde mindestens 10 % \xFCber dem Normalpreis, dem Preis der meisten Stunden der letzten 7 Tage. Darunter: der Anteil der Stunden, die teuer waren.","info.cheap_saving":"Was g\xFCnstiger Netzstrom weniger und teurer Netzstrom mehr gekostet hat als zum Normalpreis, dem Preis der meisten Stunden der letzten 7 Tage. Bei einem Festpreis ist sie 0. Nach einem Tarifwechsel braucht der Normalpreis ein paar Tage, bis er folgt.","picker.flow":"Electricity Lens Leistungsfluss","picker.flow.description":"Woher der Strom gerade kommt und wohin er geht, als zwei Balken, aus den Leistungssensoren des Energie-Dashboards.","picker.economics":"Electricity Lens Wirtschaftlichkeit","picker.economics.description":"Was PV-Anlage, W\xE4rmepumpe und E-Auto gespart haben, gegen das, was sie gekostet haben.","picker.savings":"Electricity Lens Ersparnis","picker.savings.description":"Was PV-Strom, W\xE4rmepumpe und E-Auto im gew\xE4hlten Zeitraum gespart haben, als Tabelle, oder die Ersparnis eines Bereichs nachgerechnet. Folgt der Datumsauswahl.","picker.heat_meters":"Electricity Lens W\xE4rmez\xE4hler","picker.heat_meters.description":"W\xE4rme, Strom und COP jedes Z\xE4hlers der W\xE4rmepumpe im gew\xE4hlten Zeitraum. Folgt der Datumsauswahl.","picker.history":"Electricity Lens Verlauf","picker.history.description":"Ersparnis, Verbrauch oder Kosten je Zeitraum als Balken, nach Quelle oder Ger\xE4t gestapelt, mit Linien. Folgt der Datumsauswahl.","picker.figures":"Electricity Lens Kennzahl","picker.figures.description":"Eine Kennzahl f\xFCr einen Zeitraum: Kosten, PV-Anteil, g\xFCnstiger Netzstrom, Ersparnis oder eine beliebige Statistik oder Entit\xE4t.","picker.breakdown":"Electricity Lens Aufteilung","picker.breakdown.description":"Anteile eines Zeitraums als Ring oder Balken: der Strommix, Verbrauch oder Kosten nach Ger\xE4t, oder beliebige Statistiken.","picker.dashboard":"Electricity Lens","picker.dashboard.description":"Ein fertiges Strom-Dashboard mit Kosten, Strommix, PV, W\xE4rmepumpe, Auto und der Bilanz."},V0={en:V5,de:H0},e1=e=>e in V5;function y(e){let V=V0[e.split("-")[0]]??V5;return(C,H={})=>V[C].replace(/\{(\w+)\}/g,(L,r)=>H[r]??"")}function B2(e,V){let C=Math.max(1,Math.round(V<1?V*12:V));return V<1?e(C===1?"months_one":"months_other",{count:String(C)}):e(C===1?"years_one":"years_other",{count:String(C)})}var A1=(e,V)=>V===null?e("calculating"):e("calculating_progress",{percent:String(V)});var r3="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z";var R1=8,L5=typeof HTMLElement<"u"&&"showPopover"in HTMLElement.prototype,e5=e=>e.getRootNode().querySelector(".explanation"),M3=e=>L5?e.matches(":popover-open"):e.classList.contains("open");function L0(e,V){let C=e.getBoundingClientRect(),H=V.offsetWidth,L=V.offsetHeight,r=Math.min(Math.max(C.right-H,R1),window.innerWidth-H-R1),M=C.bottom+R1,i=M+L>window.innerHeight-R1?Math.max(C.top-R1-L,R1):M;V.style.left=`${r}px`,V.style.top=`${i}px`}function t3(e,V){if(M3(V))return;L5?V.showPopover():V.classList.add("open"),L0(e,V),e.setAttribute("aria-expanded","true");let C=()=>r5(e,V);window.addEventListener("scroll",C,{capture:!0,once:!0,passive:!0})}function r5(e,V){delete e.dataset.pinned,M3(V)&&(L5?V.hidePopover():V.classList.remove("open"),e.setAttribute("aria-expanded","false"))}function e0(e){if(e.pointerType!=="mouse")return;let V=e.currentTarget,C=e5(V);C&&t3(V,C)}function r0(e){if(e.pointerType!=="mouse")return;let V=e.currentTarget,C=e5(V);C&&!V.dataset.pinned&&r5(V,C)}function M0(e){e.stopPropagation();let V=e.currentTarget,C=e5(V);if(C){if(V.dataset.pinned){r5(V,C);return}V.dataset.pinned="true",t3(V,C)}}function t0(e){let V=e.currentTarget;if(e.newState!=="closed")return;let C=V.getRootNode().querySelector("button.info");C&&(delete C.dataset.pinned,C.setAttribute("aria-expanded","false"))}function J(e,V){return V.length?m`<button
      type="button"
      class="info"
      aria-label=${e}
      aria-expanded="false"
      @pointerenter=${e0}
      @pointerleave=${r0}
      @click=${M0}
      @keydown=${C=>C.stopPropagation()}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d=${r3}></path></svg>
    </button>
    <div class="explanation" popover="auto" role="note" @toggle=${t0}>
      ${V.map(C=>typeof C=="string"?m`<p>${C}</p>`:m`<p><strong>${C[0]}:</strong> ${C[1]}</p>`)}
    </div>`:v}var i3=O`
  button.info {
    flex: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    margin: 0 calc(-1 * var(--ha-space-1, 4px));
    padding: 0;
    border: none;
    border-radius: var(--ha-border-radius-circle, 50%);
    background: none;
    color: var(--secondary-text-color);
    cursor: pointer;
  }
  button.info:hover {
    background-color: rgba(var(--rgb-primary-text-color), 0.04);
  }
  button.info:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }
  button.info svg {
    width: 18px;
    height: 18px;
    fill: currentColor;
  }
  .explanation {
    position: fixed;
    inset: auto;
    margin: 0;
    box-sizing: border-box;
    width: max-content;
    max-width: min(320px, calc(100vw - 16px));
    padding: var(--ha-space-3, 12px) var(--ha-space-4, 16px);
    border: 1px solid var(--divider-color);
    border-radius: var(--ha-border-radius-lg, 12px);
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color);
    box-shadow: var(--ha-box-shadow-l, 0 4px 16px rgba(0, 0, 0, 0.2));
    font-size: var(--ha-font-size-m, 14px);
    font-weight: var(--ha-font-weight-normal, 400);
    line-height: var(--ha-line-height-normal, 20px);
    text-align: start;
    white-space: normal;
    z-index: 10;
  }
  /* Browsers without popovers show it the same way, by a class. */
  @supports not selector(:popover-open) {
    .explanation:not(.open) {
      display: none;
    }
  }
  .explanation p {
    margin: 0;
  }
  .explanation p + p {
    margin-top: var(--ha-space-2, 8px);
  }
  .explanation strong {
    font-weight: var(--ha-font-weight-medium, 500);
  }
`;var i0=O`
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
`,$=[i0,i3],E1=O`
  ha-card {
    container-type: inline-size;
  }
  table {
    width: 100%;
    margin-top: 8px;
    border-collapse: collapse;
    font-size: var(--ha-font-size-m, 14px);
    line-height: var(--ha-line-height-normal, 20px);
    font-variant-numeric: tabular-nums;
    color: var(--primary-text-color);
  }
  th,
  td {
    padding: 12px 8px;
    font-weight: var(--ha-font-weight-normal, 400);
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
    border-radius: var(--ha-border-radius-sm, 4px);
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
  /* A part of the row above: indented and quieter, as its share. */
  .part .name,
  .part td {
    color: var(--secondary-text-color);
  }
  .part .name {
    padding-inline-start: 16px;
  }
  /* A row that opens its entity's dialog. */
  tr.clickable {
    cursor: pointer;
  }
  tr.clickable:hover {
    background-color: rgba(var(--rgb-primary-text-color), 0.04);
  }
  /* Reaches the row by keyboard and for screen readers; the row takes the click. */
  tr.clickable button {
    all: unset;
    cursor: pointer;
  }
  tr.clickable button:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }
  @container (max-width: 360px) {
    .swatch-cell {
      display: none;
    }
    .swatch-cell + .name {
      padding-inline-start: 16px;
    }
  }
`;var n1=["energy_date","today","yesterday","this_month","last_month","this_year","last_year"];function S1(e,V,C){let H=[`figure.${V}.${C.id}`,`figure.${V}.${C.kind}`].find(e1);return e(H??`figure.${V}`)}function M2(e,V,C){return["device","other","category"].includes(C.kind)?C.kind==="category"&&i1(V)?C.name:e("figure_of",{figure:S1(e,V,C),area:C.name}):S1(e,V,C)}var o0=300*1e3,M5=e=>e.toDateString();function a0(e){let V=new Date,C=M5(V),H=M5(new Date(V.getFullYear(),V.getMonth(),V.getDate()+1)),L={today:null,tomorrow:null};for(let r of Object.values(e??{}))for(let[M,i]of Object.entries(r.wh_hours??{})){let t=M5(new Date(M));t===C&&(L.today=(L.today??0)+i/1e3),t===H&&(L.tomorrow=(L.tomorrow??0)+i/1e3)}return L}var D1=class extends W{constructor(){super(...arguments);this._infoLoading=!1}static getStubConfig(){return{period:"energy_date",area:"household",figure:"cost"}}static getConfigElement(){return document.createElement("electricity-lens-figures-card-editor")}setConfig(C){G(C?.collection_key),this._config=C}getCardSize(){return 2}getGridOptions(){return{columns:6,min_columns:6}}connectedCallback(){super.connectedCallback(),this._follow()}disconnectedCallback(){super.disconnectedCallback(),this._unfollow?.(),this._unfollow=void 0,clearTimeout(this._retryTimer),this._retryTimer=void 0}_watched(){return[this._config?.entity,this._config?.statistic].filter(C=>C!==void 0)}get _localize(){return y(this.hass?.locale?.language??this.hass?.language??"en")}get _language(){return this.hass?.locale?.language??"en"}get _period(){return this._config?.period??"energy_date"}get _hasPeriod(){let{figure:C}=this._config??{};return!!this._config&&Q(this._config)!=="entity"&&!(C&&(c1(C)||i1(C)))}_follow(){this._period!=="energy_date"||!this._hasPeriod||this._unfollow||!this.isConnected||!this.hass?.connection||(this._unfollow=k1(this.hass.connection,this._config?.collection_key,C=>{this._selected=C}))}_range(){let C=this._period;if(!this._hasPeriod)return K("today");if(C!=="energy_date")return K(C);if(this._selected!==void 0)return this._selected??K("this_month")}_area(C){return this._info?.areas.find(H=>H.id===C)}_figure(C){let H=this._area(C.area);if(!(!H||!C.figure||!o1(H).includes(C.figure)))return{area:H,figure:C.figure}}async _loadInfo(){!this.hass||this._infoLoading||(this._infoLoading=!0,this._info=await Y(this.hass),this._infoLoading=!1,clearTimeout(this._retryTimer),this._retryTimer=void 0,this.isConnected&&(!this._info||this._info.calculating)&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),j)))}_request(){let C=this._range(),H=this._config;if(!C||!H)return;let L=Q(H);if(L==="entity"||H.figure&&i1(H.figure)||L==="energy"&&!this._info)return;let r=new Set,M=new Set,i=!1;if(L==="statistic"&&H.statistic)r.add(H.statistic),M.add(H.statistic);else if(L==="energy"){let o=this._figure(H);o&&(i=c1(o.figure),this._info?.calculating||J5(o.area,o.figure).forEach(n=>r.add(n)))}let t=[...r].sort();return{key:JSON.stringify([t,C.start,C.end,i]),range:C,ids:t,statistics:[...M].sort(),forecast:i}}async _load(C){if(!this.hass)return;this._loading=C.key;let H=P1(a1(C.range)),L={key:C.key,at:Date.now(),range:C.range,period:H,rows:{},metadata:{},forecast:{today:null,tomorrow:null},failed:!1};try{let[r,M,i]=await Promise.all([C.ids.length?this.hass.callWS({type:"recorder/statistics_during_period",start_time:new Date(C.range.start).toISOString(),end_time:new Date(C.range.end+1).toISOString(),statistic_ids:C.ids,period:H,types:C.statistics.length?["change","mean","min","max"]:["change"],units:{energy:"kWh"}}):Promise.resolve({}),C.statistics.length?this.hass.callWS({type:"recorder/get_statistics_metadata",statistic_ids:C.statistics}):Promise.resolve([]),C.forecast?this.hass.callWS({type:"energy/solar_forecast"}):Promise.resolve({})]);L.rows=r,L.metadata=Object.fromEntries(M.map(t=>[t.statistic_id,t])),L.forecast=a0(i)}catch{L.failed=!0}this._loading===C.key&&(this._loading=void 0,this._loaded=L)}willUpdate(C){if(!this.hass)return;(C.has("hass")||C.has("_config"))&&this._follow(),this._info===void 0&&(this._info=q()),z()&&!this._infoLoading?this._loadInfo():this.isConnected&&this._info?.calculating&&!this._retryTimer&&!this._infoLoading&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),j));let H=this._request(),L=!this._loaded||Date.now()-this._loaded.at>o0;H&&H.key!==this._loading&&(H.key!==this._loaded?.key||L&&!this._loading)&&this._load(H)}get _fmt(){return t1(this.hass?.locale,this.hass?.config.currency??"EUR")}_number(C,H){return this._fmt.number(C,H)}_format(C,H){return this._fmt.value(C,H)}_rows(C){let H=this._loaded;if(!H)return[];let L=H.period==="hour"?0:12*36e5;return(H.rows[C]??[]).filter(r=>{let M=(typeof r.start=="number"?r.start:Date.parse(r.start))+L;return M>=H.range.start&&M<=H.range.end})}_sum(C){let H=0;for(let L of C??[])for(let r of this._rows(L))H+=r.change??0;return H}_energyCard(C){let H=this._localize,L=this._figure(C);if(!L){let a=`figure.${C.figure??""}`,d=C.name??(e1(a)?H(a):C.figure??"");return this._info===void 0?this._card(d,"\u2026"):this._card(d,"\u2013",H("figures_unavailable"))}let{area:r,figure:M}=L,i=C.name??M2(this._localize,M,r);if(i1(M))return this._investmentCard(i,M,r);if(this._info?.calculating&&!c1(M))return this._card(i,"\u2026",A1(H,T1(this.hass,this._info)));if(!this._loaded)return this._card(i,"\u2026");if(this._loaded.failed)return this._card(i,"\u2013",H("figures_not_loaded"));let t=M==="forecast_today"?this._loaded.forecast.today:M==="forecast_tomorrow"?this._loaded.forecast.tomorrow:null,o=w1(M,r,a=>r.statistics[a]?this._sum(r.statistics[a]):null,t),n=o.line?H(o.line.key,Object.fromEntries(Object.entries(o.line.values).map(([a,d])=>[a,this._format(d.value,d.unit)]))):void 0;return this._card(i,o.value===null?"\u2013":this._format(o.value,o.unit),C.secondary==="none"?void 0:n,void 0,this._explanation(M,r))}_explanation(C,H){let L=this._localize;return C==="price"&&H.statistics.solar?.length?[L("info.price")]:C==="heat_price"?[L("info.heat_price")]:C==="payback"?[L("info.payback")]:C==="annual_return"?[L("info.annual_return")]:C==="cheap_share"||C==="expensive_share"||C==="cheap_saving"?[L(`info.${C}`)]:[]}_statisticCard(C){let H=this._localize,L=C.statistic??"",r=this._loaded?.metadata[L],M=C.name??r?.name??u1(this.hass,L);if(!this._loaded)return this._card(M??"\xA0","\u2026");let i=M??L,t=this._rows(L),o=r?.unit_class==="energy"?"kWh":r?.statistics_unit_of_measurement??"",n=p=>p===null?"\u2013":`${this._number(p)}${o?` ${o}`:""}`,a=p=>t.map(s=>s[p]).filter(s=>typeof s=="number"),d=C.value??"change";if(this._loaded.failed)return this._card(i,"\u2013",H("figures_not_loaded"));if(r&&!w2(r).includes(d))return this._card(i,"\u2013",H(d==="change"?"statistic_no_sum":"statistic_no_mean"));let A=null;if(d==="change")A=t.length?t.reduce((p,s)=>p+(s.change??0),0):null;else if(d==="mean"){let p=a("mean");A=p.length?p.reduce((s,u)=>s+u,0)/p.length:null}else{let p=a(d);A=p.length?d==="min"?Math.min(...p):Math.max(...p):null}let l=d==="change"?void 0:H(`value.${d}`);if(C.secondary==="range"){let p=a("min"),s=a("max");p.length&&s.length&&(l=H("value_range",{min:n(Math.min(...p)),max:n(Math.max(...s))}))}return this._card(i,n(A),C.secondary==="none"?void 0:l)}_entityCard(C){let H=this._localize,L=this.hass?.states[C.entity??""],r=C.name??u1(this.hass,C.entity??"")??C.entity??"";if(!L)return this._card(r,"\u2013",H("figures_unavailable"));if(["unknown","unavailable"].includes(L.state))return this._card(r,"\u2013",H("figures_unavailable"),C.entity);let M=q5(this.hass,L.entity_id);if(M)return this._card(r,M,void 0,C.entity);let i=Number(L.state),t=this.hass?.config.currency??"",o=L.attributes.unit_of_measurement?.replace(t,t?this._fmt.currencySymbol():""),n=L.state!==""&&Number.isFinite(i),a=this._fmt.currencySymbol(),d=n?o&&o===a?this._format(i,"money"):`${this._number(i)}${o?` ${o}`:""}`:["unknown","unavailable",""].includes(L.state)?"\u2013":L.state;return this._card(r,d,void 0,C.entity)}_investmentCard(C,H,L){let r=this._localize,M=P2(this.hass).find(d=>r2(d.category)===L.id),i=H==="payback"?M?.payback:M?.annualReturn,t=i?this.hass?.states[i]:void 0,o=Number(t?.state),n=this._explanation(H,L);if(!t||!Number.isFinite(o))return this._card(C,"\u2013",void 0,i,n);if(H==="payback"){let d=o<100?Math.floor(o):o;return this._card(C,[this._number(d,0),r("payback_unit")],this._paybackLine(t.attributes),i,n)}let a=D(this.hass?.locale,{minimumFractionDigits:1,maximumFractionDigits:1}).format(o);return this._card(C,r("return_value",{rate:a}),this._returnLine(t.attributes),i,n)}_paybackLine(C){let H=this._localize;if(typeof C.investment!="number")return;let L=this._format(C.investment,"money");return typeof C.years_left!="number"?H("line_payback",{investment:L}):H("line_payback_left",{time:B2(H,C.years_left)})}_returnLine(C){let{surplus:H}=C;if(typeof H=="number")return this._localize("line_return",{amount:D(this.hass?.locale,{style:"currency",currency:this.hass?.config.currency??"EUR",maximumFractionDigits:0,signDisplay:"exceptZero"}).format(H)})}_card(C,H,L,r,M=[]){let[i,t]=typeof H=="string"?j5(H):H,o=typeof H=="string"?H:H.filter(Boolean).join(" "),n=()=>{this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:r},bubbles:!0,composed:!0}))},a=d=>{d.key!=="Enter"&&d.key!==" "||(d.preventDefault(),n())};return m`<ha-card
      lang=${this._language}
      class=${r?"clickable":""}
      role=${r?"button":v}
      tabindex=${r?"0":v}
      @click=${r?n:v}
      @keydown=${r?a:v}
    >
      <div class="header">
        <h2 class="title" title=${C}>${C}</h2>
        ${J(this._localize("info_label"),M)}
      </div>
      <div class="stat">
        <div class="value">
          <span class="number" title=${o}>${i}</span>${t?m`<span class="unit">${t}</span>`:v}
        </div>
        ${L?m`<div class="line" title=${L}>${L}</div>`:v}
      </div>
    </ha-card>`}render(){if(!this.hass||!this._config)return m``;let C=Q(this._config);return C==="statistic"?this._statisticCard(this._config):C==="entity"?this._entityCard(this._config):this._energyCard(this._config)}};D1.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0},_selected:{state:!0},_loaded:{state:!0}},D1.styles=[$,O`
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
      /* The info icon keeps the title's height. */
      .header button.info {
        width: 24px;
        height: 24px;
        margin: 0 calc(-1 * var(--ha-space-1, 4px)) 0 0;
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
    `];var A0=["energy","cost","saving","export","heat","distance","alternative_cost"],n0=["price","grid_price","solar_share","cheap_share","expensive_share","self_consumption","scop","heat_price","cost_per_100km"],t2=e=>A0.filter(V=>o1(e).includes(V)),t5=e=>n0.filter(V=>o1(e).includes(V)||V==="grid_price"&&e.kind==="household");function h1(e,V){let C=[];return V==="energy"&&e.statistics.solar?.length&&C.push("source"),e.kind==="household"&&(V==="energy"||V==="cost")&&C.push("consumer"),e.kind==="household"&&V==="cost"&&C.push("source","bill"),e.kind==="category"&&(e.statistics.energy?.length??0)>1&&(V==="energy"||V==="cost"||(V==="heat"||V==="saving")&&(e.statistics.heat_meters?.length??0)>1)&&C.push("consumer"),C.push("none"),e.kind==="category"&&V==="cost"&&e.statistics.solar_cost?.length&&C.push("source"),C}function o3(e,V){let C=e.statistics[V]??[];return{plus:V==="saving"?[...C,...e.statistics.solar_saving??[]]:C,minus:[]}}function T2(e){let V=new Set(e.areas.find(H=>H.id==="heat_pump")?.statistics.energy??[]),C=e.areas.filter(H=>H.kind==="device"&&H.statistics.heat?.length&&H.statistics.energy?.some(L=>V.has(L)));return C.length>1?C:[]}function d0(e,V,C){let H=e.areas.find(t=>t.kind==="grid")?.statistics??{},L=H.import_cost??[],r=V.statistics.cheap_cost??[],M=V.statistics.expensive_cost??[],i=[{id:"standing_charge",name:{key:"source.standing_charge"},color:C.standing,plus:H.standing_charge??[],minus:[]}];return r.length&&i.push({id:"cheap",name:{key:"source.cheap"},color:C.cheap,plus:r,minus:[]}),i.push({id:"grid",name:{key:r.length||M.length?"source.normal":"source.grid"},color:C.grid,plus:L,minus:[...r,...M],floor:!0}),M.length&&i.push({id:"expensive",name:{key:"source.expensive"},color:C.expensive,plus:M,minus:[]}),i}function p0(e,V,C){let H=t=>V.statistics[t]??[],L=H("cheap_cost"),r=H("expensive_cost"),M=[{id:"solar",name:{key:"source.solar"},color:C.solar,plus:H("solar_cost"),minus:[]}];L.length&&M.push({id:"cheap",name:{key:"source.cheap"},color:C.cheap,plus:L,minus:[]}),M.push({id:"grid",name:{key:L.length||r.length?"source.normal":"source.grid"},color:C.grid,plus:H("cost"),minus:[...H("solar_cost"),...L,...r],floor:!0}),r.length&&M.push({id:"expensive",name:{key:"source.expensive"},color:C.expensive,plus:r,minus:[]});let i=e.areas.find(t=>t.kind==="grid")?.statistics.feed_in??[];return V.kind==="household"&&i.length&&M.push({id:"export",name:{key:"source.export"},color:C.export,plus:i,minus:[],negative:!0}),M}function F2(e,V,C,H,L){let r=t=>V.statistics[t]??[],M=E(e,L);if(H==="bill"&&C==="cost")return d0(e,V,L);if(H==="source"&&C==="cost")return p0(e,V,L);if(H==="source"&&C==="energy"){let t=[{id:"solar",name:{key:"source.solar"},color:L.solar,plus:r("solar"),minus:[]}],o=["cheap","expensive"].filter(a=>r(a).length);r("cheap").length&&t.push({id:"cheap",name:{key:"source.cheap"},color:L.cheap,plus:r("cheap"),minus:[]}),t.push({id:"grid",name:{key:o.length?"source.normal":"source.grid"},color:L.grid,plus:r("energy"),minus:[...r("solar"),...o.flatMap(r)],floor:!0}),r("expensive").length&&t.push({id:"expensive",name:{key:"source.expensive"},color:L.expensive,plus:r("expensive"),minus:[]});let n=e.areas.find(a=>a.kind==="grid")?.statistics.export??[];return V.kind==="household"&&n.length&&t.push({id:"export",name:{key:"source.export"},color:L.export,plus:n,minus:[],negative:!0}),t}if(H==="consumer"){if(V.kind==="category"){let o=new Set(V.statistics.energy??[]);return e.areas.filter(n=>n.kind==="device"&&n.statistics.energy?.some(a=>o.has(a))).map(n=>({id:n.id,name:{text:n.name},color:M.get(n.id)??L.other,...o3(n,C)}))}let t=new Set(e.areas.filter(o=>o.kind==="category").flatMap(o=>o.statistics.energy??[]));return e.areas.filter(o=>o.kind==="category"&&(o.statistics.energy?.length??0)>0||o.kind==="device"&&o.top_level!==!1&&!o.statistics.energy?.some(n=>t.has(n))||o.kind==="other").map(o=>({id:o.id,name:{text:o.name},color:M.get(o.id)??L.other,plus:o.statistics[C]??[],minus:[]}))}let i=C==="export"?L.export:V.kind==="solar"?L.solar:M.get(V.id)??(C==="heat"?L.heat:C==="distance"?L.car:L.grid);return[{id:C,name:{text:V.name},color:i,...o3(V,C)}]}var m0=36e5;async function i5(e,V,C){if(!V.length)return{};let H=P1(a1(C)),L=await e.callWS({type:"recorder/statistics_during_period",start_time:new Date(C.start).toISOString(),end_time:new Date(C.end+1).toISOString(),statistic_ids:V,period:H,types:["change"],units:{energy:"kWh"}}),r=H==="hour"?0:12*m0,M={};for(let i of V){M[i]=0;for(let t of L[i]??[]){let o=(typeof t.start=="number"?t.start:Date.parse(t.start))+r;o>=C.start&&o<=C.end&&(M[i]+=t.change??0)}}return M}var l0=300*1e3,I=(e,V)=>(V??[]).reduce((C,H)=>C+(e[H]??0),0),X=class extends W{constructor(){super(...arguments);this._infoLoading=!1}_period(){return"energy_date"}_showsCompare(){return!1}_needsInfo(){return!0}_described(){return[]}getCardSize(){return 4}getGridOptions(){return{columns:12,min_columns:6}}connectedCallback(){super.connectedCallback(),this._follow()}disconnectedCallback(){super.disconnectedCallback(),this._unfollow?.(),this._unfollow=void 0,clearTimeout(this._retryTimer),this._retryTimer=void 0}get _localize(){return y(this.hass?.locale?.language??this.hass?.language??"en")}get _fmt(){return t1(this.hass?.locale,this.hass?.config.currency??"EUR")}_follow(){this._period()==="energy_date"&&(this._unfollow||!this.isConnected||!this.hass?.connection||(this._unfollow=k1(this.hass.connection,this._collectionKey,(C,H)=>{this._selected=C,this._compare=H})))}_range(){let C=this._period();if(C!=="energy_date")return K(C);if(this._selected!==void 0)return this._selected??K("this_month")}async _loadInfo(){!this.hass||this._infoLoading||(this._infoLoading=!0,this._info=await Y(this.hass),this._infoLoading=!1,clearTimeout(this._retryTimer),this._retryTimer=void 0,this.isConnected&&(!this._info||this._info.calculating)&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),j)))}async _load(C,H,L,r,M){if(!this.hass)return;let i=this.hass;this._loading=C;let t={key:C,at:0,values:null,metadata:{}};try{let[o,n,a]=await Promise.all([i5(i,H,L),r?i5(i,H,r):Promise.resolve(void 0),M.length?i.callWS({type:"recorder/get_statistics_metadata",statistic_ids:M}):Promise.resolve([])]);t.values=o,t.compare=n,t.metadata=Object.fromEntries(a.map(d=>[d.statistic_id,d]))}catch{}this._loading===C&&(this._loading=void 0,this._sums={...t,at:Date.now()})}willUpdate(C){if(!this.hass||(this._follow(),this._info===void 0&&(this._info=q()),z()&&!this._infoLoading&&this._loadInfo(),this._needsInfo()&&(this.isConnected&&this._info?.calculating&&!this._retryTimer&&!this._infoLoading&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),j)),!this._info||this._info.calculating)))return;let H=this._range();if(!H)return;let L=this._showsCompare()&&this._period()==="energy_date"?this._compare:void 0,r=[...new Set(this._ids())].sort();if(!r.length)return;let M=[...new Set(this._described())].sort(),i=JSON.stringify([r,H.start,H.end,L?.start,L?.end,M]),t=!this._sums||Date.now()-this._sums.at>l0;i!==this._loading&&(i!==this._sums?.key||t&&!this._loading)&&this._load(i,r,H,L,M)}_waiting(){if(!this.hass)return;let C=R(this.hass);return C.length?C.some(H=>H.calculating)||this._info?.calculating?"calculating":this._info===null?"editor_not_loaded":this._info===void 0?"loading":this._ids().length?this._sums?this._sums.values?void 0:"history_failed":"loading":"figures_unavailable":F1(this.hass)}_waitingText(C){return C!=="calculating"?this._localize(C):A1(this._localize,T1(this.hass,this._info))}};X.properties={hass:{attribute:!1},_info:{state:!0},_selected:{state:!0},_compare:{state:!0},_sums:{state:!0}};function a3(e,V){return e.by==="consumer"&&(V?.kind==="household"||V?.kind==="category"&&(V.statistics.energy?.length??0)>1)?"consumer":V?.statistics.solar?.length?"source":"consumer"}function s0(e,V,C){return V.title?V.title:V.statistics?.length?e("breakdown_statistics"):(C?a3(V,C):V.by??"source")==="source"?e("breakdown_mix"):V.figure==="cost"?e("breakdown_cost_by_device"):e(C?.id==="heat_pump"?"breakdown_heat_pump_by_device":"breakdown_energy_by_device")}var v0="240px",x0=["solar","cheap","grid","expensive"],u0="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z",c0="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z",$1=class extends X{constructor(){super(...arguments);this._config={type:""};this._watchingChart=!1;this._hidden=new Set}static getStubConfig(){return{area:"household",by:"source",figure:"energy",display:"ring"}}static getConfigElement(){return document.createElement("electricity-lens-breakdown-card-editor")}setConfig(C){if(C?.statistics!==void 0&&!Array.isArray(C.statistics))throw new Error("statistics must be a list");G(C?.collection_key),this._config=C??{type:""},this._collectionKey=this._config.collection_key}getGridOptions(){return{columns:6,min_columns:4}}get _byStatistics(){return!!this._config.statistics?.length}_period(){return this._config.period??"energy_date"}_showsCompare(){return!0}_needsInfo(){return!this._byStatistics}_described(){return this._byStatistics?(this._config.statistics??[]).map(C=>C.statistic):[]}_area(){return this._info?.areas.find(C=>C.id===(this._config.area??"household"))}get _by(){return a3(this._config,this._area())}get _figure(){return this._by==="consumer"&&this._config.figure==="cost"?"cost":"energy"}_series(){let C=this._info,H=this._area();return!C||!H?[]:F2(C,H,this._figure,this._by==="source"?"source":"consumer",w(this)).filter(L=>!L.negative)}_ids(){let C=new Set;if(this._byStatistics)this._config.statistics?.forEach(H=>C.add(H.statistic));else{for(let H of this._series())[...H.plus,...H.minus].forEach(L=>C.add(L));if(this._by==="consumer"&&this._info)for(let H of this._series()){let L=this._info.areas.find(r=>r.id===H.id);for(let r of["energy","solar","cheap","expensive","cost","solar_cost","cheap_cost","expensive_cost"])(L?.statistics[r]??[]).forEach(M=>C.add(M))}}return[...C].sort()}willUpdate(){super.willUpdate(),this.hass&&!this._watchingChart&&(this._watchingChart=!0,k2(C=>{this._hasChart=C}))}_sum(C,H=!1){let L=(H?this._sums?.compare:this._sums?.values)??{};return C.reduce((r,M)=>r+(L[M]??0),0)}get _compared(){return this._sums?.compare!==void 0}_entityOf(C){return C?.length===1&&this.hass?.states[C[0]]?C[0]:void 0}get _unit(){if(!this._byStatistics)return;let C=this._config.statistics?.[0]?.statistic;return Y2(C?this._sums?.metadata[C]:void 0)}_sharesProblem(){if(!this._byStatistics||!this._sums)return;let C=(this._config.statistics??[]).map(M=>M.statistic),H=X5(C,this._sums.metadata);if(!H)return;let L=this._localize;if(H.problem==="units")return L("breakdown_units",{units:H.units.join(", ")});let r=H.ids.map(M=>this._config.statistics?.find(i=>i.statistic===M)?.name||this._sums?.metadata[M]?.name||M);return L("breakdown_no_sum",{names:r.join(", ")})}_parts(){let C=this._localize;if(this._byStatistics){let L=w(this),r=this._info?E(this._info,L):new Map;return(this._config.statistics??[]).map((M,i)=>{let t=this._info?.areas.find(o=>o.kind==="device"&&(o.statistics.energy?.[0]===M.statistic||o.statistics.heat?.[0]===M.statistic));return{id:M.statistic,name:M.name??t?.name??(this._sums?.metadata[M.statistic]?.name||u1(this.hass,M.statistic)||M.statistic),color:(t&&r.get(t.id))??L.consumers[i%L.consumers.length],value:this._sum([M.statistic]),compare:this._compared?this._sum([M.statistic],!0):void 0,entity:this._entityOf([M.statistic])}})}let H=this._series().map(L=>{let r=this._sum(L.plus)-this._sum(L.minus),M=this._sum(L.plus,!0)-this._sum(L.minus,!0),i=L.name.key?.replace(/^source\./,"mix."),t=L.name.text??(i&&e1(i)?C(i):L.name.key&&e1(L.name.key)?C(L.name.key):L.id),o=a=>L.floor?Math.max(a,0):a,n={id:L.id,name:t,color:L.color,value:o(r),compare:this._compared?o(M):void 0};if(this._by==="consumer"&&this._info){let a=w(this),d=this._info.areas.find(A=>A.id===L.id);if(d){n.entity=this._entityOf(d.statistics.energy);let A=Z=>this._sum(d.statistics[Z]??[]),l=A("energy"),p=A("solar"),s=A("cheap"),u=A("expensive");n.energy=l;let f=this._figure==="cost",g={solar:f?A("solar_cost"):p,cheap:f?A("cheap_cost"):s,expensive:f?A("expensive_cost"):u};n.mix=[{source:"solar",color:a.solar,value:g.solar},{source:"cheap",color:a.cheap,value:g.cheap},{source:"grid",color:a.grid,value:Math.max((f?A("cost"):l)-g.solar-g.cheap-g.expensive,0)},{source:"expensive",color:a.expensive,value:g.expensive}]}}return n});return this._by==="consumer"?H.sort((L,r)=>r.value-L.value):H}_value(C){let H=this._unit;return H!==void 0&&H!=="kWh"?H?`${this._fmt.number(C)} ${H}`:this._fmt.number(C):this._figure==="cost"&&!this._byStatistics?this._fmt.value(C,"money"):this._fmt.value(C,"energy")}_open(C){C&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:C},bubbles:!0,composed:!0}))}_title(){return s0(this._localize,this._config,this._area())}_occurring(C){let H=this._value(0),L=C.filter(M=>this._value(M.value)!==H||M.compare!==void 0&&this._value(M.compare)!==H);if(this._by!=="source"||L.some(M=>M.id==="cheap"||M.id==="expensive"))return L;let r=this._localize;return L.map(M=>M.id==="grid"&&M.name===r("mix.normal")?{...M,name:r("mix.grid")}:M)}_ring(C){let H=this._localize;if(this._hasChart===void 0)return m`<p class="summary">${H("loading")}</p>`;if(!this._hasChart)return m`<p class="summary">${H("history_no_chart")}</p>`;let L=this._figure==="cost"&&!this._byStatistics,r=w(this).line,M=getComputedStyle(this).getPropertyValue("--primary-text-color").trim()||"#212121",i=JSON.stringify([C,[...this._hidden],L,r,M,this.hass?.locale]);this._ringChart?.key!==i&&(this._ringChart={key:i,chart:z5({items:C,total:H("breakdown_total"),format:a=>this._value(a),percent:a=>this._fmt.value(a,"percent"),compare:this._compared?C.map(a=>a.compare??0):void 0,compared:H("breakdown_compare_period"),centerColor:r,labelColor:M,hidden:this._hidden})});let{chart:t}=this._ringChart,o=b2(C.map(a=>this._hidden.has(a.id)?0:a.value)),n=a=>{let d=new Set(this._hidden);d.has(a)?d.delete(a):d.add(a),this._hidden=d};return m`<div class="ring">
      ${F5(`${L}-${this._compared}`,m`<ha-chart-base
          .hass=${this.hass}
          .data=${t.data}
          .options=${t.options}
          .height=${v0}
        ></ha-chart-base>`)}
      <div class="chart-legend">
        <ul>
          ${C.map((a,d)=>{let A=this._hidden.has(a.id),l=this._fmt.value(o[d],"percent");return m`<li class=${A?"hidden":""}>
              <button
                type="button"
                class="leg"
                aria-pressed=${String(!A)}
                aria-label="${a.name}: ${l}"
                @click=${()=>n(a.id)}
              >
                <svg class="icon" viewBox="0 0 24 24" style="color: ${A?"var(--secondary-text-color)":a.color}">
                  <path fill="currentColor" d=${A?c0:u0}></path>
                </svg>
                <span class="label">${a.name}</span>
                <span class="value">${l}</span>
              </button>
            </li>`})}
        </ul>
      </div>
    </div>`}_bars(C){let H=this._value(0),L=C.filter(a=>this._value(a.value)!==H||a.compare!==void 0&&this._value(a.compare)!==H),r=Math.max(...L.map(a=>Math.max(a.value,a.compare??0)),0),M=a=>r>0?Math.max(a/r*100,0):0,i=this._config.color_by_source===!0&&this._by==="consumer",t=this._localize,o=x0.filter(a=>this._value(L.flatMap(d=>d.mix??[]).reduce((d,A)=>d+(A.source===a?A.value:0),0))!==H),n=o.includes("cheap")||o.includes("expensive");return m`<div class="bars">
      ${L.map(a=>{let d=M(a.value),A=a.mix?.reduce((s,u)=>s+u.value,0)??0,l="";if(this._figure==="cost"&&a.energy!==void 0&&(l=this._fmt.value(a.energy,"energy"),a.energy>0&&(l+=` \xB7 ${t("line_average_price",{price:this._fmt.value(a.value/a.energy,"price")})}`)),a.compare!==void 0){let s=t("breakdown_compared",{amount:this._value(a.compare)});l=l?`${l} \xB7 ${s}`:s}let p=a.entity?{role:"button",tabindex:"0",click:()=>this._open(a.entity),key:s=>{s.key!=="Enter"&&s.key!==" "||(s.preventDefault(),this._open(a.entity))}}:void 0;return m`<div
          class="bar-row ${p?"clickable":""}"
          role=${p?.role??v}
          tabindex=${p?.tabindex??v}
          @click=${p?.click}
          @keydown=${p?.key}
        >
          <div class="bar-text">
            <span class="name">${a.name}</span>
            <span class="amount">${this._value(a.value)}</span>
          </div>
          ${l?m`<div class="bar-line">${l}</div>`:v}
          <div class="track">
            <div class="fill" style="width: ${d}%; ${i?"":`--c: ${a.color}`}">
              ${i&&a.mix&&A>0?a.mix.map(s=>m`<span style="width: ${s.value/A*100}%; --c: ${s.color}"></span>`):v}
            </div>
          </div>
          ${a.compare!==void 0?m`<div class="track compare">
                <div class="fill" style="width: ${M(a.compare)}%; --c: ${a.color}"></div>
              </div>`:v}
        </div>`})}
      ${i?m`<div class="key">
            ${o.map(a=>m`<span><span class="dot" style="--c: ${x1[a]}"></span>${t(a==="grid"?n?"source.normal":"source.grid":`source.${a}`)}</span>`)}
          </div>`:v}
    </div>`}render(){if(!this.hass)return m``;let C=this._localize,H=this._sums?.values?this._parts():[],L=H.reduce((o,n)=>o+Math.max(n.value,0),0),r=!this._byStatistics&&this._info?.calculating===!0,M=!this._byStatistics&&this._info!==void 0&&!this._area(),i=this._config.display??(!this._byStatistics&&this._by==="consumer"?"bars":"ring"),t;return r?t=m`<p class="summary">${this._waitingText("calculating")}</p>`:M?t=m`<p class="summary">${C(this._info===null?"editor_not_loaded":"figures_unavailable")}</p>`:this._sums&&!this._sums.values?t=m`<p class="summary">${C("figures_failed")}</p>`:this._sums?this._sharesProblem()?t=m`<p class="summary">${this._sharesProblem()}</p>`:L<=0?t=m`<p class="summary">${C("history_empty_figure")}</p>`:t=i==="bars"?this._bars(H):this._ring(this._occurring(H)):t=m`<p class="summary">${C("loading")}</p>`,m`<ha-card>
      <div class="header">
        <h2 class="title">${this._title()}</h2>
      </div>
      ${t}
    </ha-card>`}};$1.properties={...X.properties,_config:{state:!0},_hasChart:{state:!0},_hidden:{state:!0}},$1.styles=[$,O`
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
        margin-inline-end: 6px;
        vertical-align: -1px;
      }
      .percent,
      .bar-line {
        color: var(--secondary-text-color);
      }
      .amount,
      .percent {
        text-align: end;
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
        font-size: var(--ha-font-size-m, 14px);
      }
      .bar-line {
        font-size: var(--ha-font-size-s, 12px);
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
      /* The compared period: thin and paler, as in HA's energy graphs. */
      .track.compare {
        height: 4px;
        margin-top: 2px;
        background: none;
      }
      .track.compare .fill {
        background: color-mix(in srgb, var(--c, transparent) 20%, transparent);
        box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--c, transparent) 50%, transparent);
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
      .key {
        display: flex;
        flex-wrap: wrap;
        gap: 4px 16px;
        font-size: var(--ha-font-size-s, 12px);
        color: var(--secondary-text-color);
      }
    `];var I1=e=>({select:{mode:"dropdown",options:e}}),o5=e=>e?.kind==="household"||e?.kind==="category"&&(e.statistics.energy?.length??0)>1,Z0=e=>o5(e)||!!e.statistics.solar?.length,N1=class extends P{constructor(){super(...arguments);this._requested=!1;this._label=C=>this._localize(`editor_${C.name}`);this._helper=C=>C.name==="period"?this._localize("editor_period_hint"):void 0}setConfig(C){this._config=C}get _localize(){return y(this.hass?.locale?.language??this.hass?.language??"en")}willUpdate(){this.hass&&!this._requested&&(this._requested=!0,this.hass.callWS({type:`${b}/figures`}).then(C=>{this._info=C}).catch(()=>{this._info=null}))}_data(){let C=this._config??{type:""},H=!!C.statistics?.length||C.statistics!==void 0&&!C.area;return{title:C.title??"",period:C.period??"energy_date",source:H?"statistics":"energy",area:C.area??"household",by:C.by??"source",figure:C.figure??"energy",display:C.display??(!H&&C.by==="consumer"?"bars":"ring"),color_by_source:C.color_by_source??!1,statistics:(C.statistics??[]).map(L=>L.statistic)}}_schema(C){let H=this._localize,L=[{name:"title",selector:{text:{}}},{name:"period",selector:I1(n1.map(r=>({value:r,label:H(`period.${r}`)})))},{name:"breakdown_source",selector:I1(["energy","statistics"].map(r=>({value:r,label:H(`breakdown_source.${r}`)})))}];if(C.source==="statistics")L.push({name:"statistics",selector:{statistic:{multiple:!0}}});else{let r=(this._info?.areas??[]).filter(Z0),M=r.find(t=>t.id===C.area),i=[...M?.statistics.solar?.length?["source"]:[],...o5(M)?["consumer"]:[]];L.push({name:"area",selector:I1(r.map(t=>({value:t.id,label:t.name})))},{name:"by",selector:I1(i.map(t=>({value:t,label:H(`by.${t}`)})))}),C.by==="consumer"&&L.push({name:"figure",selector:I1(["energy","cost"].map(t=>({value:t,label:H(`figure_choice.${t}`)})))})}return L.push({name:"display",selector:I1(["ring","bars"].map(r=>({value:r,label:H(`display.${r}`)})))}),C.source!=="statistics"&&C.by==="consumer"&&C.display==="bars"&&L.push({name:"color_by_source",selector:{boolean:{}}}),L}_changed(C){if(!this._config)return;let H={...this._data(),...C.detail.value};"breakdown_source"in C.detail.value&&(H.source=C.detail.value.breakdown_source);let{title:L,period:r,area:M,by:i,figure:t,display:o,color_by_source:n,statistics:a,...d}=this._config,A=d;if(typeof H.title=="string"&&H.title&&(A.title=H.title),A.period=H.period??"energy_date",H.source==="statistics"){let l=new Map((this._config.statistics??[]).map(s=>[s.statistic,s])),p=Array.isArray(H.statistics)?H.statistics.filter(Boolean):[];A.statistics=p.map(s=>l.get(s)??{statistic:s})}else{A.area=H.area??"household";let l=this._info?.areas.find(u=>u.id===A.area),p=o5(l),s=!!l?.statistics.solar?.length;A.by=H.by==="consumer"&&p?"consumer":s?"source":"consumer",A.by==="consumer"&&H.figure==="cost"?A.figure="cost":A.figure="energy"}A.display=H.display==="bars"?"bars":"ring",A.by==="consumer"&&A.display==="bars"&&H.color_by_source===!0&&(A.color_by_source=!0),this._config=A,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:A},bubbles:!0,composed:!0}))}render(){if(!this.hass||!this._config)return m``;let C=this._data();return m`<div class="editor">
      ${C.source!=="statistics"&&this._info===null?m`<p class="hint">${this._localize("editor_not_loaded")}</p>`:v}
      <ha-form
        .hass=${this.hass}
        .data=${{...C,breakdown_source:C.source}}
        .schema=${this._schema(C)}
        .computeLabel=${this._label}
        .computeHelper=${this._helper}
        @value-changed=${this._changed}
      ></ha-form>
    </div>`}};N1.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0}},N1.styles=O`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .hint {
      margin: 0;
      color: var(--secondary-text-color);
    }
  `;var a5=e=>typeof e=="string"?e:e.text,n3=e=>typeof e=="string"?v:e.class??v;function S0(e,V){e.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:V},bubbles:!0,composed:!0}))}function A3(e,V,C){let H=[V.kind,V.entity?"clickable":void 0].filter(Boolean).join(" "),L=V.entity;return m`<tr
    class=${H||v}
    style=${V.color?`--color: ${V.color}`:v}
    @click=${L?()=>S0(C,L):v}
  >
    ${e.swatches?m`<td class="swatch-cell">
          ${V.color?m`<span class="swatch" aria-hidden="true"></span>`:v}
        </td>`:v}
    <th class="name" scope="row">
      ${L?m`<button type="button">${V.name}</button>`:V.name}
    </th>
    ${V.cells.map(r=>m`<td class=${n3(r)}>${a5(r)}</td>`)}
  </tr>`}function g1(e,V){let[C,...H]=e.head??[];return m`<table>
    ${e.head?m`<thead>
          <tr>
            ${e.swatches?m`<th class="swatch-cell"></th>`:v}
            <th scope="col" class="name">${C?a5(C):v}</th>
            ${H.map(L=>m`<th scope="col" class=${n3(L)}>${a5(L)}</th>`)}
          </tr>
        </thead>`:v}
    <tbody>
      ${e.rows.map(L=>A3(e,L,V))}
    </tbody>
    ${e.foot?.length?m`<tfoot>${e.foot.map(L=>A3(e,L,V))}</tfoot>`:v}
  </table>`}var h0={pv:"var(--electricity-lens-pv-color)",heat_pump:"var(--electricity-lens-heat-pump-color)",wallbox:"var(--electricity-lens-wallbox-color)"},W1=class extends W{constructor(){super(...arguments);this._infoLoading=!1}static getStubConfig(){return{}}static getConfigForm(){return{schema:[{name:"title",selector:{text:{}}}]}}setConfig(C){this._config=C}getCardSize(){return 4}getGridOptions(){return{columns:12,min_columns:6}}get _localize(){return y(this.hass?.locale?.language??this.hass?.language??"en")}_money(C,H=!1){return C===void 0?"":C===null?"\u2013":D(this.hass?.locale,{style:"currency",currency:this.hass?.config.currency??"EUR",maximumFractionDigits:0,minimumFractionDigits:0,signDisplay:H?"exceptZero":"auto"}).format(C)}willUpdate(){this.hass&&(this._info===void 0&&(this._info=q()),z()&&!this._infoLoading&&(this._infoLoading=!0,Y(this.hass).then(C=>{this._info=C,this._infoLoading=!1})))}render(){let C=this._localize;if(!this.hass)return m``;let H=R(this.hass),L=C5(this.hass),r=(A=[])=>m`<div class="header">
      <h2 class="title">${this._config?.title||C("title")}</h2>
      ${J(C("info_label"),A)}
    </div>`;if(!H.length||!L)return m`<ha-card>
        ${r()}
        <p class="summary">${C(F1(this.hass))}</p>
      </ha-card>`;let M=this._info?E(this._info,w(this)):void 0,i=H.some(A=>A.calculating),t={perYear:H.some(A=>A.perYear!==null),invested:L.invested>0},o=H.flatMap(A=>{let l=this._row({name:C(`category.${A.category}`),entityId:A.entityId,perYear:A.perYear,saving:A.calculating?null:A.saving,investment:A.investment??void 0,balance:A.balance,category:A.category},t,M);if(!A.battery||A.calculating)return[l];let p=A.battery;return[l,this._row({name:C("battery_part"),entityId:A.entityId,perYear:p.perYear,saving:p.saving,investment:p.investment??void 0,balance:p.saving-(p.investment??0),part:!0},t)]}),n=this._row({name:C("total"),entityId:L.entityId,perYear:L.perYear,saving:i?null:L.saved,investment:L.invested,balance:L.balance},t),a=[C("column_area"),...t.perYear?[{text:C("column_per_year"),class:"per-year"}]:[],C("column_saving"),...t.invested?[C("column_investment"),C("column_balance")]:[]],d=[[C("column_saving"),C("info.economics.saving")],...t.invested?[[C("column_investment"),C("info.economics.investment")],[C("column_balance"),C("info.economics.balance")]]:[],...H.some(A=>A.battery)?[[C("battery_part"),C("info.economics.battery")]]:[],C("info.economics.note")];return m`<ha-card>
      ${r(d)}
      ${i?v:this._summary(L)}
      <div class="table">${g1({head:a,rows:o,foot:[n],swatches:!0},this)}</div>
      ${i?m`<p class="note">${A1(C,L.progress)}</p>`:v}
    </ha-card>`}_summary(C){let H=this._localize;if(C.payback===null)return v;if(C.payback>=100)return m`<p class="summary">${H("summary_paid_back")}</p>`;let L=D(this.hass?.locale,{style:"percent",maximumFractionDigits:0}).format(Math.floor(C.payback)/100),r=C.yearsLeft===null?H("summary_payback",{percent:L}):H("summary_payback_left",{percent:L,time:B2(H,C.yearsLeft)});return m`<p class="summary">${r}</p>`}_row(C,H,L){let{name:r,entityId:M,perYear:i,saving:t,investment:o,balance:n,category:a,part:d}=C,A=[];return H.perYear&&A.push({text:i===null?"\u2013":this._localize("average",{amount:this._money(i)}),class:"per-year"}),A.push(this._money(t)),H.invested&&A.push(this._money(o),this._money(n,!0)),{name:r,cells:A,color:a?L?.get(a)??h0[a]:void 0,entity:M,kind:d?"part":void 0}}};W1.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0}},W1.styles=[$,E1,O`
      .table {
        overflow-x: auto;
      }
      .note {
        margin: 0;
        padding: 0 16px 12px;
        font-size: var(--ha-font-size-s, 12px);
        line-height: 16px;
        color: var(--secondary-text-color);
      }
      /* A phone, or half a column: the names need the room of the yearly figure. */
      @container (max-width: 480px) {
        .per-year {
          display: none;
        }
      }
    `];var d3=(e,V,C)=>{let H=new Map;for(let L=V;L<=C;L++)H.set(e[L],L);return H},p3=h2(class extends O1{constructor(e){if(super(e),e.type!==w5.CHILD)throw Error("repeat() can only be used in text expressions")}dt(e,V,C){let H;C===void 0?C=V:V!==void 0&&(H=V);let L=[],r=[],M=0;for(let i of e)L[M]=H?H(i,M):M,r[M]=C(i,M),M++;return{values:r,keys:L}}render(e,V,C){return this.dt(e,V,C).values}update(e,[V,C,H]){let L=T5(e),{values:r,keys:M}=this.dt(V,C,H);if(!Array.isArray(L))return this.ut=M,r;let i=this.ut??=[],t=[],o,n,a=0,d=L.length-1,A=0,l=r.length-1;for(;a<=d&&A<=l;)if(L[a]===null)a++;else if(L[d]===null)d--;else if(i[a]===M[A])t[A]=M1(L[a],r[A]),a++,A++;else if(i[d]===M[l])t[l]=M1(L[d],r[l]),d--,l--;else if(i[a]===M[l])t[l]=M1(L[a],r[l]),y1(e,t[l+1],L[a]),a++,l--;else if(i[d]===M[A])t[A]=M1(L[d],r[A]),y1(e,L[a],L[d]),d--,A++;else if(o===void 0&&(o=d3(M,A,l),n=d3(i,a,d)),o.has(i[a]))if(o.has(i[d])){let p=n.get(M[A]),s=p!==void 0?L[p]:null;if(s===null){let u=y1(e,L[a]);M1(u,r[A]),t[A]=u}else t[A]=M1(s,r[A]),y1(e,L[a],s),L[p]=null;A++}else f2(L[d]),d--;else f2(L[a]),a++;for(;A<=l;){let p=y1(e,t[l+1]);M1(p,r[A]),t[A++]=p}for(;a<=d;){let p=L[a++];p!==null&&f2(p)}return this.ut=M,g2(e,t),L1}});var C1=.01,g0={mW:1e-6,W:.001,kW:1,MW:1e3,GW:1e6};function m3(e){if(!e)return null;let V=Number(e.state),C=g0[String(e.attributes.unit_of_measurement??"")];return e.state===""||!Number.isFinite(V)||C===void 0?null:V*C}function R2(e){let V=e?.power;if(!V?.grid.length)return;let C=e.areas.flatMap(H=>H.power??[]);return[...new Set([...V.grid,...V.solar,...V.battery,...C])]}function l3(e,V,C){let H=e.power;if(!H?.grid.length)return null;let L=S=>S.map(V).filter(F=>F!==null),r=S=>S.reduce((F,N)=>F+N,0),M=L(H.grid);if(!M.length)return null;let i=r(M),t=Math.max(r(L(H.solar)),0),o=r(L(H.battery)),n=Math.max(i,0),a=Math.max(-i,0),d=Math.max(o,0),A=Math.max(-o,0),l=Math.max(t+n+d-a-A,0),p=S=>S.length===1?S[0]:void 0,s=[{id:"solar",name:{key:"source.solar"},color:C.solar,kw:t,entity:p(H.solar)},{id:"battery",name:{key:"flow.battery"},color:C.batteryOut,kw:d,entity:p(H.battery)},{id:"grid",name:{key:"source.grid"},color:C.grid,kw:n,entity:p(H.grid)}],u=E(e,C),f=new Set(e.areas.filter(S=>S.kind==="category").flatMap(S=>S.statistics.energy??[])),g=e.areas.filter(S=>S.kind==="category"||S.kind==="device"&&S.top_level!==!1&&!S.statistics.energy?.some(F=>f.has(F))).flatMap(S=>{let F=L(S.power??[]);return F.length?[{id:S.id,name:{text:S.name},color:u.get(S.id)??C.other,kw:Math.max(r(F),0),entity:p(S.power??[])}]:[]}),Z=e.areas.find(S=>S.kind==="other"),x=[...g,{id:"other",name:Z?{text:Z.name}:{key:"flow.other"},color:C.other,kw:Math.max(l-r(g.map(S=>S.kw)),0)},{id:"battery",name:{key:"flow.battery"},color:C.batteryIn,kw:A,entity:p(H.battery)},{id:"export",name:{key:"source.export"},color:C.export,kw:a,entity:p(H.grid)}],h=S=>S.filter(F=>F.kw>=C1);return{sources:h(s),uses:h(x),home:l,summary:f0(l,t,d,n,a,A)}}function f0(e,V,C,H,L,r){let M=V+C;if(e<C1&&M<C1&&H<C1)return{kind:"idle"};let i=V>=C1&&C>=C1?"both":C>=C1?"battery":"solar";if(H<C1)return{kind:"covered",by:i,export:L>=C1?L:0,charge:r>=C1?r:0};let t=e>0?Math.min(Math.max(e-H,0)/e,.99):0;return t<.005?{kind:"grid"}:{kind:"share",by:i,share:t,grid:H}}var z1=class extends W{constructor(){super(...arguments);this._infoLoading=!1}static getStubConfig(){return{}}static getConfigForm(){return{schema:[{name:"title",selector:{text:{}}}]}}setConfig(C){this._config=C}getCardSize(){return 3}getGridOptions(){return{columns:12,min_columns:6}}_watched(){return R2(this._info)??[]}get _localize(){return y(this.hass?.locale?.language??this.hass?.language??"en")}willUpdate(){this.hass&&(this._info===void 0&&(this._info=q()),z()&&!this._infoLoading&&(this._infoLoading=!0,Y(this.hass).then(C=>{this._info=C,this._infoLoading=!1})))}_colors(){let C=this.hass?.themes,H=this.hass?.selectedTheme;return(!this._palette||this._palette.themes!==C||this._palette.selected!==H)&&(this._palette={themes:C,selected:H,colors:w(this)}),this._palette.colors}_power(C){return Q5(this.hass?.locale,C)}_summary(C){let H=this._localize;switch(C.kind){case"idle":return H("flow.idle");case"grid":return H("flow.grid");case"share":return H(`flow.share_${C.by}`,{share:t1(this.hass?.locale,this.hass?.config.currency??"EUR").value(C.share*100,"percent"),grid:this._power(C.grid)});case"covered":{let L=C.export&&C.charge?H("flow.surplus_both",{grid:this._power(C.export),battery:this._power(C.charge)}):C.export?H("flow.surplus_grid",{power:this._power(C.export)}):C.charge?H("flow.surplus_battery",{power:this._power(C.charge)}):"";return`${H(`flow.covered_${C.by}`)}${L?`, ${L}`:""}.`}}}_name(C){return"key"in C.name?this._localize(C.name.key):C.name.text}_open(C){this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:C},bubbles:!0,composed:!0}))}_bar(C,H,L,r){return m`<div class="label" aria-hidden="true">${C}</div>
      <div class="track" aria-hidden="true">
        <div class="fill" style="width: ${r>0?L/r*100:0}%">
          ${p3(H,M=>M.id,M=>m`<span style="flex-grow: ${M.kw}; --c: ${M.color}"></span>`)}
        </div>
      </div>`}_list(C,H){return m`<ul aria-label=${C}>
      ${H.map(L=>{let r=this._name(L),M=m`<span class="dot" style="--c: ${L.color}" aria-hidden="true"></span>
          <span class="name">${r}</span>
          <span class="power">${this._power(L.kw)}</span>`,i=L.entity;return m`<li>
          ${i?m`<button type="button" @click=${()=>this._open(i)}>${M}</button>`:m`<div class="row">${M}</div>`}
        </li>`})}
    </ul>`}_flow(C){let H=this._localize,L=t=>t.reduce((o,n)=>o+n.kw,0),r=L(C.sources),M=L(C.uses),i=Math.max(r,M);return m`<p class="summary">${this._summary(C.summary)}</p>
      ${i>0?m`<div class="bars">
            ${this._bar(H("flow.from"),C.sources,r,i)}
            ${this._bar(H("flow.to"),C.uses,M,i)}
          </div>`:v}
      <div class="lists">
        ${C.sources.length?this._list(H("flow.from"),C.sources):v}
        ${C.uses.length?this._list(H("flow.to"),C.uses):v}
      </div>`}render(){if(!this.hass)return m``;let C=this._localize,H=this.hass,L=this._info,r=L&&R2(L)?l3(L,i=>m3(H.states[i]),this._colors()):null,M;return L===void 0?M=m`<p class="summary">${C("loading")}</p>`:L===null?M=m`<p class="summary">${C("integration_unavailable")}</p>`:R2(L)?r?M=this._flow(r):M=m`<p class="summary">${C("flow.unavailable")}</p>`:M=m`<p class="summary">${C("flow.no_sensor")}</p>`,m`<ha-card>
      <div class="header">
        <h2 class="title">${this._config?.title||C("flow.title")}</h2>
        ${r?m`<span class="chip">${this._power(r.home)}</span>`:v}
      </div>
      ${M}
    </ha-card>`}};z1.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0}},z1.styles=[$,O`
      .bars {
        display: grid;
        grid-template-columns: auto minmax(0, 1fr);
        align-items: center;
        gap: 8px 12px;
        padding: 4px 16px 0;
      }
      .label {
        font-size: var(--ha-font-size-s, 12px);
        color: var(--secondary-text-color);
      }
      .track {
        height: 20px;
        border-radius: var(--ha-bar-border-radius, var(--ha-border-radius-sm, 4px));
        background-color: var(--ha-bar-background-color, var(--secondary-background-color));
        overflow: hidden;
      }
      .fill {
        display: flex;
        height: 100%;
        border-radius: var(--ha-bar-border-radius, var(--ha-border-radius-sm, 4px));
        overflow: hidden;
        transition: width 0.6s ease;
      }
      /* HA's energy look: the color at half strength, framed by the full color. */
      .fill span,
      .dot {
        background: color-mix(in srgb, var(--c, transparent) 50%, transparent);
        box-shadow: inset 0 0 0 1px var(--c, transparent);
      }
      .fill span {
        flex-basis: 0;
        min-width: 2px;
        transition: flex-grow 0.6s ease;
      }
      @media (prefers-reduced-motion: reduce) {
        .fill,
        .fill span {
          transition: none;
        }
      }
      .lists {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        /* Stacked on a phone, the two lists stay apart. */
        gap: 12px 24px;
        padding: 12px 16px 16px;
      }
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
      }
      button,
      .row {
        display: flex;
        align-items: center;
        gap: 8px;
        width: 100%;
        padding: 8px 0;
        font: inherit;
        font-size: var(--ha-font-size-m, 14px);
        line-height: var(--ha-line-height-normal, 20px);
        color: var(--primary-text-color);
        text-align: start;
      }
      button {
        background: none;
        border: none;
        cursor: pointer;
        border-radius: var(--ha-border-radius-sm, 4px);
      }
      button:focus-visible {
        outline: 2px solid var(--ha-color-focus, var(--primary-color));
        outline-offset: 2px;
      }
      .dot {
        flex: none;
        width: 12px;
        height: 12px;
        border-radius: var(--ha-border-radius-circle, 50%);
      }
      .name {
        flex: 1;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .power {
        white-space: nowrap;
        color: var(--secondary-text-color);
      }
    `];var i2=class extends X{static getStubConfig(){return{}}static getConfigForm(){return{schema:[]}}setConfig(V){G(V?.collection_key),this._collectionKey=V?.collection_key}get _devices(){return this._info?T2(this._info).sort((V,C)=>V.name.localeCompare(C.name,this.hass?.locale?.language)):[]}_ids(){return this._devices.flatMap(V=>[...V.statistics.heat??[],...V.statistics.energy??[]])}render(){let V=this._localize;if(!this.hass)return m``;let C=this._waiting();return m`<ha-card>
      <div class="header">
        <h2 class="title">${V("heat_meters_title")}</h2>
        ${J(V("info_label"),[V("info.heat_meters")])}
      </div>
      ${C?m`<p class="summary">${this._waitingText(C)}</p>`:this._table()}
    </ha-card>`}_table(){let V=this._localize,C=this._fmt,H=this._sums?.values??{},L=E(this._info,w(this)),r=this._devices,M=r.reduce((n,a)=>n+I(H,a.statistics.heat),0),i=r.reduce((n,a)=>n+I(H,a.statistics.energy),0),t=(n,a)=>a>0?C.number(n/a,2):"\u2013",o=(n,a,d,A)=>({name:n,color:A,cells:[C.value(a,"energy"),C.value(d,"energy"),t(a,d)]});return g1({head:[V("meters_consumer"),V("figure.heat"),V("meters_electricity"),V("figure.scop")],rows:r.map(n=>o(n.name,I(H,n.statistics.heat),I(H,n.statistics.energy),L.get(n.id)??"")),foot:[o(V("savings_total"),M,i)],swatches:!0},this)}};i2.styles=[$,E1];function O0(e,V,C){if(V.title)return V.title;if(!V.area)return e("history_title");let H=V.figure??"energy",L=C?.areas.find(M=>M.id===V.area);if(L)return M2(e,H,L);let r=`figure.${H}`;return e1(r)?e(r):e("history_title")}var y0=300*1e3,_0="200px",b0={energy:"energy",cost:"money",saving:"money",export:"energy",heat:"energy",distance:"distance",alternative_cost:"money"},U1=class extends W{constructor(){super(...arguments);this._config={type:""};this._infoLoading=!1;this._watchingChart=!1}static getStubConfig(){return{}}static getConfigElement(){return document.createElement("electricity-lens-history-card-editor")}setConfig(C){G(C?.collection_key),this._config=C??{type:""}}getCardSize(){return 5}getGridOptions(){return{columns:12,min_columns:6}}connectedCallback(){super.connectedCallback(),this._follow()}disconnectedCallback(){super.disconnectedCallback(),this._unfollow?.(),this._unfollow=void 0,clearTimeout(this._retryTimer),this._retryTimer=void 0}get _localize(){return y(this.hass?.locale?.language??this.hass?.language??"en")}get _language(){return this.hass?.locale?.language??"en"}get _fmt(){return t1(this.hass?.locale,this.hass?.config.currency??"EUR")}get _savings(){return!this._config.area}_follow(){(this._config.period??"energy_date")==="energy_date"&&(this._unfollow||!this.isConnected||!this.hass?.connection||(this._unfollow=k1(this.hass.connection,this._config.collection_key,(C,H)=>{this._selected=C,this._compare=H})))}async _loadInfo(){!this.hass||this._infoLoading||(this._infoLoading=!0,this._info=await Y(this.hass),this._infoLoading=!1,clearTimeout(this._retryTimer),this._retryTimer=void 0,this.isConnected&&(!this._info||this._info.calculating)&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),j)))}_range(C){let H=this._config.period??"energy_date";if(H==="all"){let r=new Date(new Date().getFullYear()+1,0,1).getTime()-1;return{range:{start:new Date(H3,0,1).getTime(),end:r},period:"year",fromFirstValue:!0}}if(H!=="energy_date"){let r=K(H);return{range:r,period:a1(r),fromFirstValue:!1}}if(this._selected===void 0)return;if(this._selected)return{range:this._selected,period:a1(this._selected),compare:this._compare,fromFirstValue:!1};let L=C();return{range:L,period:this._savings?"year":a1(L),fromFirstValue:!1}}_savingsPlan(){if(!this.hass)return;let C=this._localize,H=R(this.hass);if(!H.length||H.some(o=>o.calculating))return;let L=this._range(()=>C3(H.map(o=>o.countingSince)));if(!L)return;let r=w(this),M=this._info?E(this._info,r):void 0,i={pv:r.solar,heat_pump:M?.get("heat_pump")??r.heat,wallbox:M?.get("wallbox")??r.car},t=H.map(o=>({series:{id:o.category,name:{},color:i[o.category],plus:[o.savingStatistic],minus:[]},name:C(`category.${o.category}`)}));return this._plan(L,t,"money",void 0,[])}_figurePlan(){let C=this._info,H=this._config;if(!C||C.calculating)return;let L=C.areas.find(A=>A.id===H.area),r=H.figure??"energy";if(!L||!L.statistics[r]?.length)return;let M=this._range(()=>K("this_month"));if(!M)return;let i=this._localize,t=h1(L,r),o=H.stack&&t.includes(H.stack)?H.stack:t[0],n=F2(C,L,r,o,w(this)).map(A=>({series:A,name:A.name.text??(A.name.key&&e1(A.name.key)?i(A.name.key):A.id)}));n.length===1&&(n[0].name=M2(i,r,L));let a=H.line==="grid_price"?C.areas.find(A=>A.kind==="grid")??L:L,d=H.line&&L.statistics?{figure:H.line,area:a,name:H.line_name??M2(i,H.line,a)}:void 0;return this._plan(M,n,b0[r],d,H.lines??[])}_plan(C,H,L,r,M){let i=new Set;for(let{series:o}of H)[...o.plus,...o.minus].forEach(n=>i.add(n));if(r)for(let o of Object.values(r.area.statistics))(o??[]).forEach(n=>i.add(n));M.forEach(o=>i.add(o.statistic));let t=[...i].sort();return{key:JSON.stringify([t,H.map(o=>[o.series.id,o.series.color]),r?.figure,M,C.range.start,C.range.end,C.period,C.compare?.start,C.compare?.end]),range:C.range,period:C.period,compare:C.compare,fromFirstValue:C.fromFirstValue,bars:H,unit:L,lineFigure:r,lines:M,ids:t}}async _load(C){if(!this.hass)return;this._loading=C.key;let H={key:C.key,at:Date.now(),plan:C,slots:J2(C.range,C.period),rows:{},compareSlots:C.compare?J2(C.compare,C.period):[],compareRows:{},metadata:{},failed:!1},L=this.hass,r=(M,i)=>L.callWS({type:"recorder/statistics_during_period",start_time:new Date(M.start).toISOString(),end_time:new Date(M.end+1).toISOString(),statistic_ids:i,period:P1(C.period),types:["change","mean"],units:{energy:"kWh"}});try{let M=C.lines.map(a=>a.statistic),i=[...new Set(C.bars.flatMap(({series:a})=>[...a.plus,...a.minus]))],[t,o,n]=await Promise.all([r(C.range,C.ids),C.compare?r(C.compare,i):Promise.resolve({}),M.length?this.hass.callWS({type:"recorder/get_statistics_metadata",statistic_ids:M}):Promise.resolve([])]);H.rows=t,H.compareRows=o,H.metadata=Object.fromEntries(n.map(a=>[a.statistic_id,a]))}catch{H.failed=!0}this._loading===C.key&&(this._loading=void 0,this._loaded=H)}willUpdate(C){if(!this.hass)return;(C.has("hass")||C.has("_config"))&&this._follow(),this._watchingChart||(this._watchingChart=!0,k2(r=>{this._hasChart=r})),this._info===void 0&&(this._info=q()),z()&&!this._infoLoading?this._loadInfo():!this._savings&&this.isConnected&&this._info?.calculating&&!this._retryTimer&&!this._infoLoading&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),j));let H=this._savings?this._savingsPlan():this._figurePlan(),L=!this._loaded||Date.now()-this._loaded.at>y0;H&&H.key!==this._loading&&(H.key!==this._loaded?.key||L&&!this._loading)&&this._load(H),C.has("_loaded")&&(this._chart=this._buildChart())}_perSlot(C,H=!1){let L=this._loaded;if(!L)return[];let r=H?L.compareSlots:L.slots,M=H?L.compareRows:L.rows,i=r.map(()=>null);for(let t of C)X2(M[t],r,L.plan.period).forEach((o,n)=>{o!==null&&(i[n]=(i[n]??0)+o)});return i}_barValues(C,H=!1){let L=this._perSlot(C.plus,H),r=this._perSlot(C.minus,H);return L.map((M,i)=>{if(M===null&&r[i]===null)return null;let t=(M??0)-(r[i]??0),o=C.floor?Math.max(t,0):t;return C.negative?-o:o})}_lines(){let C=this._loaded;if(!C)return[];let{plan:H,slots:L}=C,r=this._fmt,M=w(this),i=this.hass?.config.currency==="EUR"?100:1,t=[];if(H.lineFigure){let{figure:o,area:n,name:a}=H.lineFigure,d=Object.fromEntries(Object.entries(n.statistics).map(([p,s])=>[p,this._perSlot(s??[])])),A=L.map((p,s)=>w1(o,n,f=>d[f]?.[s]??null,null).value),l=w1(o,n,()=>0,null).unit;t.push({id:`line_${o}`,name:a,color:M.line,dash:"dashed",step:l==="price"&&H.period==="hour",values:l==="price"?A.map(p=>p===null?null:p*i):A,format:p=>r.value(l==="price"?p/i:p,l)})}return H.lines.forEach((o,n)=>{let a=C.metadata[o.statistic],d=o.value??(a?.has_sum?"change":"mean"),A=a?.unit_class==="energy"?"kWh":a?.statistics_unit_of_measurement??"",l=d==="mean"?L3(C.rows[o.statistic],L,H.period):X2(C.rows[o.statistic],L,H.period);t.push({id:`statistic_${n}`,name:o.name??a?.name??u1(this.hass,o.statistic)??o.statistic,color:n===0&&!H.lineFigure?M.line:M.consumers[n%M.consumers.length],dash:"dotted",values:l,format:p=>`${r.number(p)}${A?` ${A}`:""}`})}),t}_buildChart(){let C=this._loaded;if(!C||C.failed)return;let H=this._localize,L=this._fmt,{plan:r}=C,M=r.bars.map(({series:x,name:h})=>({id:x.id,name:h,color:x.color,values:this._barValues(x),inTotal:!x.negative})),i=this._lines(),t=r.fromFirstValue?V3([...M,...i].map(x=>x.values),C.slots.length):0,o=x=>x.slice(t);M.forEach(x=>x.values=o(x.values)),i=i.map(x=>({...x,values:o(x.values)}));let n=o(C.slots),a=this._labels(n,r.period),d=r.compare?{series:r.bars.map(({series:x,name:h})=>({id:x.id,name:h,color:x.color,values:this._barValues(x,!0),inTotal:!x.negative})),labels:this._labels(C.compareSlots,r.period)}:void 0,A=[...M,...d?.series??[]];if(!A.some(x=>(x.id==="cheap"||x.id==="expensive")&&_2(x.values)))for(let x of A)x.id==="grid"&&x.name===H("source.normal")&&(x.name=H("source.grid"));let l={price:this.hass?.config.currency==="EUR"?"ct/kWh":`${L.currencySymbol()}/kWh`,percent:"%",per_100km:`${L.currencySymbol()}/100 km`},p=r.lineFigure&&!r.lines.length?l[w1(r.lineFigure.figure,r.lineFigure.area,()=>0,null).unit]??"":"",s=n[n.length-1]??r.range.start,u=W5({slots:n,axis:{min:n[0]??r.range.start,max:r.period==="hour"?s+18e5:s,period:r.period==="month"||r.period==="year"?r.period:void 0,language:this._language},labels:a,series:M,compare:d,unit:r.unit==="money"?L.currencySymbol():r.unit==="distance"?"km":"kWh",total:H("history_total"),format:x=>r.unit==="money"?L.value(x,"money"):`${L.number(x,Math.abs(x)<10?2:1)} ${r.unit==="distance"?"km":"kWh"}`,tick:x=>L.number(x),lineTick:x=>L.number(x,Number.isInteger(x)?0:1),lines:i,lineUnit:p}),g=M.filter(x=>x.inTotal!==!1).flatMap(x=>x.values).reduce((x,h)=>x+(h??0),0),Z=[...M,...i].some(x=>x.values.some(h=>h));return{...u,total:g,hasData:Z}}_labels(C,H){let L=i=>new Intl.DateTimeFormat(this._language,i),r=L({hour:"numeric",minute:"2-digit",hour12:K5(this.hass?.locale)}),M={hour:r,day:L({weekday:"short",day:"numeric",month:"short"}),month:L({month:"long",year:"numeric"}),year:L({year:"numeric"})}[H];return C.map(i=>H==="hour"?`${r.format(i)} \u2013 ${r.format(i+36e5)}`:M.format(i))}_explanation(){let C=this._localize,H=this._info?.areas.find(M=>M.id===this._config.area);if(this._savings||!H||this._config.figure!=="cost")return[];let L=h1(H,"cost"),r=this._config.stack&&L.includes(this._config.stack)?this._config.stack:L[0];return r==="bill"?[C("info.bill")]:r!=="source"||!H.statistics.solar_cost?.length?[]:[C("info.cost_by_source"),...H.kind==="household"?[C("info.cost_by_source.feed_in")]:[]]}_title(){return O0(this._localize,this._config,this._info)}render(){let C=this._localize;if(!this.hass)return m``;let H=this._title();if(this._savings&&!R(this.hass).length)return m`<ha-card>
        <div class="header"><h2 class="title">${H}</h2></div>
        <p class="summary">${C(F1(this.hass))}</p>
      </ha-card>`;let L=this._savings?R(this.hass).some(o=>o.calculating):this._info?.calculating===!0,r=L?void 0:this._loaded,M=this._chart?.hasData??!1,i=r?.plan.unit??"money",t=!this._savings&&this._info!==void 0&&!this._info?.areas.some(o=>o.id===this._config.area&&o.statistics[this._config.figure??"energy"]?.length);return m`<ha-card>
      <div class="header">
        <h2 class="title">${H}</h2>
        ${r&&!r.failed&&M&&this._chart?m`<span class="chip">${this._fmt.value(this._chart.total,i)}</span>`:v}
        ${L?v:J(C("info_label"),this._explanation())}
      </div>
      ${L?m`<p class="summary">${A1(C,T1(this.hass,this._info))}</p>`:t?m`<p class="summary">${C(this._info===null?"editor_not_loaded":"figures_unavailable")}</p>`:this._body(r,M)}
    </ha-card>`}_body(C,H){let L=this._localize;return this._hasChart===!1?m`<p class="summary">${L("history_no_chart")}</p>`:C?.failed?m`<p class="summary">${L("history_failed")}</p>`:m`<div class="chart">
      ${this._chart&&this._hasChart?m`<ha-chart-base
            .hass=${this.hass}
            .data=${this._chart.data}
            .options=${this._chart.options}
          ></ha-chart-base>`:v}
      ${C&&!H?m`<div class="empty">
            ${L(this._savings?"history_empty":"history_empty_figure")}
          </div>`:v}
    </div>`}};U1.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0},_selected:{state:!0},_loaded:{state:!0},_hasChart:{state:!0}},U1.styles=[$,O`
      .chart {
        position: relative;
        min-height: ${l2(_0)};
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
    `];function k0(e,V,C={}){let H=M=>V.areas.find(i=>i.id===M)?.statistics??{},L=V.areas.find(M=>M.kind==="grid")?.statistics??{},r=[];for(let M of e){let i=[M.savingStatistic];if(M.category==="pv"){let t=L.export?.length?L.export:[],o=t.length?L.feed_in??[]:[];r.push({name:"savings_pv",color:x1.solar,plus:i,minus:o,energy:H("solar").self_used??[]}),o.length&&r.push({name:"savings_feed_in",color:x1.export,plus:o,minus:[],energy:t})}else M.category==="heat_pump"?r.push({name:"category.heat_pump",color:C.heat??x1.heat,plus:i,minus:[],energy:H("heat_pump").energy??[]}):r.push({name:"category.wallbox",color:C.car??x1.car,plus:i,minus:[],energy:H("wallbox").energy??[]})}return r}var o2=class extends X{constructor(){super(...arguments);this._config={}}static getStubConfig(){return{}}static getConfigElement(){return document.createElement("electricity-lens-savings-card-editor")}setConfig(C){G(C?.collection_key),this._config=C??{},this._collectionKey=this._config.collection_key,this.requestUpdate()}get _area(){return this._info?.areas.find(C=>C.id===this._config.area)}_rows(){if(!this.hass||!this._info)return[];let C=E(this._info,w(this));return k0(R(this.hass),this._info,{heat:C.get("heat_pump"),car:C.get("wallbox")})}_ids(){if(this._config.area){let C=this._area?.statistics;return C?.alternative_cost?.length&&C.cost?.length&&C.saving?.length?[...C.alternative_cost,...C.cost,...C.saving,...C.solar_saving??[]]:[]}return this._rows().flatMap(C=>[...C.plus,...C.minus,...C.energy])}render(){let C=this._localize;if(!this.hass)return m``;let H=this._waiting();return m`<ha-card>
      <div class="header">
        <h2 class="title">${C("savings_title")}</h2>
        ${H?v:J(C("info_label"),this._config.area?this._reckoningInfo():this._tableInfo())}
      </div>
      ${H?m`<p class="summary">${this._waitingText(H)}</p>`:this._config.area?this._reckoning():this._table()}
    </ha-card>`}get _heating(){return R(this.hass).find(C=>C.category==="heat_pump")?.heating??"gas"}_tableInfo(){let C=this._localize,H=R(this.hass).map(r=>r.category),L=[];for(let r of this._rows())r.name==="savings_pv"?L.push([C("savings_pv"),C("info.savings.pv")]):r.name==="savings_feed_in"?L.push([C("savings_feed_in"),C("info.savings.feed_in")]):r.name==="category.heat_pump"?L.push([C(r.name),C("info.savings.heat_pump",{heating:C(`heating.${this._heating}`)})]):r.name==="category.wallbox"&&L.push([C(r.name),C("info.savings.wallbox")]);return H.includes("pv")&&H.length>1&&L.push(C("info.savings.note")),L}_reckoningInfo(){let C=this._localize,H=this._config.area==="wallbox",L=this._area;return[H?[C("savings_instead_fuel"),C("info.reckoning.fuel")]:[C(`savings_instead_${this._heating}`),C("info.reckoning.heating",{heating:C(`heating.${this._heating}`)})],[H?C("figure.cost.wallbox"):C("figure_of",{figure:C("figure.cost.heat_pump"),area:L?.name??""}),C("info.reckoning.electricity")],...L?.statistics.solar_saving?.length?[[C("info.reckoning.split_term"),C("info.reckoning.split")]]:[]]}_reckoning(){let C=this._localize,H=this._fmt,L=this._area,r=this._sums?.values??{},M=I(r,L?.statistics.alternative_cost),i=I(r,L?.statistics.cost),t=I(r,L?.statistics.solar_saving),o=I(r,L?.statistics.saving),n=o+t,a=R(this.hass).find(l=>l.category===L?.id)?.heating,d=L?.id==="wallbox"?"savings_instead_fuel":`savings_instead_${a??"gas"}`,A=Math.abs(t)>=.005;return g1({rows:[{name:C(d),cells:[H.value(M,"money")]},{name:L?.id==="wallbox"?C("figure.cost.wallbox"):C("figure_of",{figure:C("figure.cost.heat_pump"),area:L?.name??""}),cells:[H.value(-i,"money")]}],foot:[{name:C("savings_saved"),cells:[H.value(n,"money")]},...A?[{name:C(L?.id==="wallbox"?"savings_part_wallbox":"savings_part_heat_pump"),cells:[H.value(o,"money")],kind:"quiet"},{name:C("savings_part_pv"),cells:[H.value(t,"money")],kind:"quiet"}]:[]]},this)}_table(){let C=this._localize,H=this._fmt,L=this._rows(),r=this._sums?.values??{},M=t=>I(r,t.plus)-I(r,t.minus),i=L.reduce((t,o)=>t+M(o),0);return g1({head:[C("savings_source"),C("savings_energy"),C("savings_amount")],rows:L.map(t=>{let o=I(r,t.energy);return{name:C(t.name),color:t.color,cells:[o||!M(t)?H.value(o,"energy"):"\u2013",H.value(M(t),"money")]}}),foot:[{name:C("savings_total"),cells:["",H.value(i,"money")]}],swatches:!0},this)}};o2.styles=[$,E1];var w0=["energy","statistic","entity"],G1=e=>({select:{mode:"dropdown",options:e}}),Q1=class extends P{constructor(){super(...arguments);this._requested=!1;this._label=C=>this._localize(`editor_${C.name}`);this._helper=C=>C.name==="period"?this._localize("editor_period_hint"):void 0}setConfig(C){this._config=C}get _localize(){return y(this.hass?.locale?.language??this.hass?.language??"en")}willUpdate(){this.hass&&!this._requested&&(this._requested=!0,this.hass.callWS({type:`${b}/figures`}).then(H=>{this._info=H}).catch(()=>{this._info=null}));let C=this._config?.statistic;this.hass&&C&&this._metadataFor!==C&&(this._metadataFor=C,this.hass.callWS({type:"recorder/get_statistics_metadata",statistic_ids:[C]}).then(H=>this._metadataLoaded(C,H[0])).catch(()=>{}))}_values(C){let H=this._metadata&&this._metadata.id===C.statistic?this._metadata.value:void 0;return w2(H)}_metadataLoaded(C,H){this._metadata={id:C,value:H};let L=this._config;if(!L||L.statistic!==C)return;let r=this._values(L);if(!r.length||r.includes(L.value??"change"))return;let{secondary:M,...i}=L;this._fire({...i,value:r[0],...r[0]==="mean"&&M?{secondary:M}:{}})}_schema(C){let H=this._localize,L=Q(C),r=[{name:"source",selector:G1(w0.map(M=>({value:M,label:H(`source.${M}`)})))}];if(L==="energy"){let M=this._info?.areas??[],i=M.find(t=>t.id===C.area);r.push({name:"area",selector:G1(M.map(t=>({value:t.id,label:t.name})))},{name:"figure",selector:G1(i?o1(i).map(t=>({value:t,label:S1(H,t,i)})):[])})}else L==="statistic"?(r.push({name:"statistic",selector:{statistic:{}}},{name:"value",selector:G1(this._values(C).map(M=>({value:M,label:H(`value.${M}`)})))}),(C.value??"change")==="mean"&&r.push({name:"secondary",selector:G1(["none","range"].map(M=>({value:M,label:H(`secondary.${M}`)})))})):r.push({name:"entity",selector:{entity:{}}});return r.push({name:"name",selector:{text:{}}}),L!=="entity"&&!(C.figure&&(c1(C.figure)||i1(C.figure)))&&r.push({name:"period",selector:G1(n1.map(M=>({value:M,label:H(`period.${M}`)})))}),r}_figureFrom(C,H){let L=C.source??Q(H);if(L!==Q(H))return L==="energy"?{area:"household",figure:"cost"}:L==="statistic"?{statistic:"",value:"change"}:{entity:""};if(L==="energy"){let r=C.area??H.area,M=this._info?.areas.find(o=>o.id===r),i=M?o1(M):[],t=i.includes(C.figure)?C.figure:i[0];return{area:r,figure:t,...H.secondary==="none"?{secondary:"none"}:{}}}if(L==="statistic"){let r={statistic:C.statistic??"",value:C.value??"change"};return r.value==="mean"&&C.secondary==="range"&&(r.secondary="range"),r}return{entity:C.entity??""}}_changed(C){if(!this._config)return;let H=C.detail.value,{area:L,figure:r,statistic:M,value:i,secondary:t,entity:o,name:n,...a}=this._config,d={...a,period:H.period??"energy_date",...this._figureFrom(H,this._config)};typeof H.name=="string"&&H.name&&(d.name=H.name),this._fire(d)}_fire(C){this._config=C,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:C},bubbles:!0,composed:!0}))}render(){if(!this.hass||!this._config)return m``;let C=this._config;return m`<div class="editor">
      ${Q(C)==="energy"&&this._info===null?m`<p class="hint">${this._localize("editor_not_loaded")}</p>`:v}
      <ha-form
        .hass=${this.hass}
        .data=${{source:Q(C),...C,value:C.value??"change",secondary:C.secondary??"none",period:C.period??"energy_date"}}
        .schema=${this._schema(C)}
        .computeLabel=${this._label}
        .computeHelper=${this._helper}
        @value-changed=${this._changed}
      ></ha-form>
    </div>`}};Q1.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0},_metadata:{state:!0}},Q1.styles=O`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .hint {
      margin: 0;
      color: var(--secondary-text-color);
    }
  `;var A5="savings",a2=e=>({select:{mode:"dropdown",options:e}}),K1=class extends P{constructor(){super(...arguments);this._requested=!1;this._label=C=>this._localize(`editor_${C.name}`);this._helper=C=>C.name==="period"?this._localize(this._config?.area?"editor_period_hint":"editor_period_hint_years"):void 0}setConfig(C){this._config=C}get _localize(){return y(this.hass?.locale?.language??this.hass?.language??"en")}willUpdate(){this.hass&&!this._requested&&(this._requested=!0,this.hass.callWS({type:`${b}/figures`}).then(C=>{this._info=C}).catch(()=>{this._info=null}))}_schema(){let C=this._localize,H=this._config??{type:""},L=this._info?.areas??[],r=[{name:"title",selector:{text:{}}},{name:"period",selector:a2([...n1,"all"].map(i=>({value:i,label:C(`period.${i}`)})))},{name:"area",selector:a2([{value:A5,label:C("editor_savings")},...L.filter(i=>t2(i).length).map(i=>({value:i.id,label:i.name}))])}],M=L.find(i=>i.id===H.area);if(M){let i=t2(M),t=H.figure&&i.includes(H.figure)?H.figure:i[0];r.push({name:"figure",selector:a2(i.map(o=>({value:o,label:S1(C,o,M)})))},{name:"stack",selector:a2(h1(M,t).map(o=>({value:o,label:C(`stack.${o}`)})))},{name:"line",selector:a2([{value:"none",label:C("editor_line_none")},...t5(M).map(o=>({value:o,label:S1(C,o,M)}))])},{name:"lines",selector:{statistic:{multiple:!0}}})}return r}_data(){let C=this._config??{type:""},H=this._info?.areas.find(M=>M.id===C.area),L=H?t2(H):[],r=C.figure&&L.includes(C.figure)?C.figure:L[0];return{title:C.title??"",period:C.period??"energy_date",area:C.area??A5,figure:r,stack:C.stack??(H&&r?h1(H,r)[0]:void 0),line:C.line??"none",lines:(C.lines??[]).map(M=>M.statistic)}}_changed(C){if(!this._config)return;let H=C.detail.value,{title:L,period:r,area:M,figure:i,stack:t,line:o,lines:n,...a}=this._config,d=a;typeof H.title=="string"&&H.title&&(d.title=H.title),d.period=H.period??"energy_date";let A=H.area;if(A&&A!==A5){d.area=A;let l=this._info?.areas.find(h=>h.id===A),p=l?t2(l):[],s=p.includes(H.figure)?H.figure:p[0];s&&(d.figure=s),(l&&s?h1(l,s):[]).includes(H.stack)&&(d.stack=H.stack),(l?t5(l):[]).includes(H.line)&&(d.line=H.line);let g=new Map((this._config.lines??[]).map(h=>[h.statistic,h])),x=(Array.isArray(H.lines)?H.lines:[]).filter(Boolean).map(h=>g.get(h)??{statistic:h});x.length&&(d.lines=x)}this._config=d,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:d},bubbles:!0,composed:!0}))}render(){return!this.hass||!this._config?m``:m`<div class="editor">
      ${this._info===null?m`<p class="hint">${this._localize("editor_not_loaded")}</p>`:v}
      <ha-form
        .hass=${this.hass}
        .data=${this._data()}
        .schema=${this._schema()}
        .computeLabel=${this._label}
        .computeHelper=${this._helper}
        @value-changed=${this._changed}
      ></ha-form>
    </div>`}};K1.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0}},K1.styles=O`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .hint {
      margin: 0;
      color: var(--secondary-text-color);
    }
  `;var s3="https://github.com/ignazhabibi/ha-electricity-lens",n5=(e,V)=>{if(!customElements.get(e))try{customElements.define(e,V)}catch{customElements.define(e,class extends V{})}};function v3(e,V=[]){let C=()=>{e.forEach(({tag:i,card:t,editor:o})=>{n5(i,t),o&&n5(o.tag,o.element)}),V.forEach(({type:i,element:t})=>n5(`ll-strategy-dashboard-${i}`,t))};C();let H=window.customElements,L=Date.now(),r=window.setInterval(()=>{let i=window.customElements!==H;i&&C(),(i||Date.now()-L>6e4)&&window.clearInterval(r)},100),M=window;M.customStrategies=M.customStrategies??[];for(let{type:i,name:t,description:o}of V)M.customStrategies.some(n=>n.type===i)||M.customStrategies.push({type:i,strategyType:"dashboard",name:t,description:o,documentationURL:s3});M.customCards=M.customCards??[];for(let{tag:i,name:t,description:o}of e)M.customCards.some(n=>n.type===i)||M.customCards.push({type:i,name:t,description:o,preview:!0,documentationURL:s3})}var d5="all",A2=class extends P{constructor(){super(...arguments);this._label=()=>this._localize("editor_area")}setConfig(C){this._config=C}get _localize(){return y(this.hass?.locale?.language??this.hass?.language??"en")}_changed(C){let{area:H,...L}=this._config??{},r=C.detail.value.area,M=r&&r!==d5?{...L,area:r}:L;this._config=M,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:M},bubbles:!0,composed:!0}))}render(){if(!this.hass||!this._config)return m``;let C=this._localize,H=new Set(R(this.hass).map(r=>r.category)),L=[{name:"area",selector:{select:{mode:"dropdown",options:[{value:d5,label:C("editor_savings")},...["heat_pump","wallbox"].filter(r=>r===this._config?.area||H.has(r)).map(r=>({value:r,label:C(`category.${r}`)}))]}}}];return m`<ha-form
      .hass=${this.hass}
      .data=${{area:this._config.area??d5}}
      .schema=${L}
      .computeLabel=${this._label}
      @value-changed=${this._changed}
    ></ha-form>`}};A2.properties={hass:{attribute:!1},_config:{state:!0}};var _=(e,V={})=>({type:e.startsWith("electricity-lens")?`custom:${e}`:e,...V}),x3={grid_options:{columns:"full"}},j1={grid_options:{columns:6}},r1={grid_options:{columns:12}},u3=(e,V,C={},H)=>_("electricity-lens-figures-card",{area:e,figure:V,...H?{name:H}:{},...j1,...C}),n2=(e,V,C,H,L=!0)=>({title:e,path:V,type:"sections",max_columns:3,sections:[{type:"grid",column_span:2,cards:[...L?[_("energy-date-selection",x3)]:[],...C.map(r=>({...x3,...r}))]}],sidebar:{sections:[{type:"grid",cards:H}]}}),P0=.35,B0=.65,T0=720*3600*1e3;function F0(e){let V=Object.values(e.entities??{}).filter(M=>M.platform===b),C=["pv","heat_pump","wallbox"],L=V.filter(M=>M.translation_key==="saving").map(M=>e.states[M.entity_id]?.attributes.category).filter(M=>C.includes(M)),r=["today","tomorrow"].flatMap(M=>{let i=M==="today"?"forecast_rest_today":"forecast_tomorrow",t=V.find(a=>a.translation_key===i)?.entity_id;if(!t)return[];let o=e.states[t]?.attributes??{},n=typeof o.best_day=="number"?o.best_day:void 0;return[{day:M,entity:t,bestDay:n,fullYear:o.best_day_full_year===!0}]});return{categories:L,investments:P2(e),forecasts:r}}function R0(e,V,C={categories:[],investments:[],forecasts:[]}){let H=(c,k,U={})=>u3(c,k,U,V(`figure.${k}`)),L=(c,k,U,E2={})=>u3(c,k,E2,V(U)),r=(c,k,U={})=>_(c,{title:V(k),...U}),M=c=>e.areas.find(k=>k.id===c),i=M("solar"),t=M("heat_pump"),o=M("wallbox"),n=e.areas.some(c=>c.kind==="device"),a=c=>c!==null&&c*1e3>Date.now()-T0,d=a(e.levels.cheap),A=a(e.levels.expensive),l=!!i||d||A,p=c=>!!c?.statistics.saving?.length,s=p(i)||p(t)||p(o)||C.categories.length>0,u={period:"today"},f={line:"price",...i?{line_name:V("strategy.price_with_solar")}:{}},g=(c,k={})=>i?L(c,"price","strategy.price_with_solar",k):H(c,"price",k),Z={secondary:"none"},x=(c,k={})=>_("electricity-lens-history-card",{area:c,figure:"energy",stack:"source",...f,...k}),h=c=>l?[_("electricity-lens-breakdown-card",{area:c,by:"source",...r1})]:[],S=C.investments.flatMap(({category:c,payback:k,annualReturn:U})=>[_("electricity-lens-figures-card",{area:r2(c),figure:"payback",name:V(`category.${c}`),visibility:[{condition:"numeric_state",entity:k,below:100}],...j1}),_("electricity-lens-figures-card",{area:r2(c),figure:"annual_return",name:V(`category.${c}`),visibility:[{condition:"numeric_state",entity:U,above:-1}],...j1})]),F=i?.forecast?C.forecasts.map(({entity:c,day:k,bestDay:U,fullYear:E2})=>{let q1=U?Math.ceil(U):void 0;return _("gauge",{entity:c,name:V(`strategy.forecast_${k}`),min:0,...q1?{max:q1}:{},needle:!1,...q1&&E2?{severity:{red:0,yellow:Math.round(q1*P0*10)/10,green:Math.round(q1*B0*10)/10}}:{},...j1})}):[],N=[];return N.push(n2(V("strategy.overview"),"now",[...e.power?.grid.length?[_("electricity-lens-flow-card")]:[],s?_("electricity-lens-balance-card"):x("household",u)],[...F,L("household","cost","strategy.cost_today",u),L("household","energy","strategy.consumption_today",u),...S],!1)),N.push(n2(V("strategy.electricity"),"household",[r("energy-usage-graph",n?"strategy.usage_graph":"figure.energy"),...i?[r("energy-solar-graph","strategy.solar_graph")]:[],...n?[_("electricity-lens-history-card",{title:V("strategy.devices_graph"),area:"household",figure:"energy",stack:"consumer"})]:[]],[r("energy-distribution","strategy.distribution",r1),...h("household"),...i?[_("energy-self-sufficiency-gauge",j1),_("energy-solar-consumed-gauge",j1)]:[]])),N.push(n2(V("strategy.costs"),"costs",[r("electricity-lens-history-card","strategy.bill",{area:"household",figure:"cost",stack:"bill",line:"grid_price"}),...i?[r("electricity-lens-history-card",n?"strategy.cost_by_source":"figure.cost",{area:"household",figure:"cost",stack:"source",...f})]:[],...n?[r("electricity-lens-history-card","strategy.cost_history",{area:"household",figure:"cost",stack:"consumer",...i?{}:f})]:[]],[H("grid","grid_price",Z),g("household",Z),...d||A?[...d?[H("household","cheap_share")]:[],H("grid","cheap_saving"),...A?[H("household","expensive_share")]:[]]:[],...n?[r("electricity-lens-breakdown-card","strategy.cost_distribution",{area:"household",by:"consumer",figure:"cost",display:"bars",color_by_source:!0,...r1})]:[],...s?[_("electricity-lens-savings-card",r1)]:[]])),t&&N.push(n2(V("strategy.heating"),"heating",[r("electricity-lens-history-card","figure.heat",{area:"heat_pump",figure:"heat",stack:"consumer",line:"scop",line_name:V("figure.scop")}),r("electricity-lens-history-card","figure.energy.heat_pump",{area:"heat_pump",figure:"energy",stack:"source"}),r("electricity-lens-history-card","figure.cost.heat_pump",{area:"heat_pump",figure:"cost",stack:"source",...f})],[H("heat_pump","scop",Z),H("heat_pump","heat_price",Z),...h("heat_pump"),...T2(e).length?[_("electricity-lens-heat-meters-card",r1)]:[...(t.statistics.energy?.length??0)>1?[_("electricity-lens-breakdown-card",{area:"heat_pump",by:"consumer",figure:"energy",display:"bars",color_by_source:!0,...r1})]:[],...(t.statistics.heat_meters?.length??0)>1?[_("electricity-lens-breakdown-card",{title:V("strategy.heat_distribution"),statistics:(t.statistics.heat_meters??[]).map(c=>({statistic:c})),display:"bars",...r1})]:[]],...p(t)?[_("electricity-lens-savings-card",{area:"heat_pump",...r1})]:[]])),o&&N.push(n2(V("strategy.charging"),"charging",[r("electricity-lens-history-card","figure.energy.wallbox",{area:"wallbox",figure:"energy",stack:"source"}),r("electricity-lens-history-card","figure.cost.wallbox",{area:"wallbox",figure:"cost",stack:"source",...f})],[H("wallbox","device_grid_price",Z),g("wallbox",Z),...h("wallbox"),...p(o)?[_("electricity-lens-savings-card",{area:"wallbox",...r1})]:[]])),N}var E0=3e4,D0=1e3;async function $0(e){let V=e.config.state!==void 0&&e.config.state!=="RUNNING",C=Date.now()+E0;for(;;)try{return await e.callWS({type:`${b}/figures`})}catch(H){if(!V||Date.now()>=C)throw H;await new Promise(L=>setTimeout(L,D0))}}var d2=class extends HTMLElement{static async generate(V,C){let H=y(C.locale?.language??C.language??"en"),L;try{L=await $0(C)}catch{return{title:H("strategy.title"),views:[{title:H("strategy.title"),cards:[{type:"markdown",content:H("strategy.not_loaded")}]}]}}return{title:H("strategy.title"),views:R0(L,H,F0(C))}}};d2.noEditor=!0;var T=y(document.documentElement.lang||navigator.language||"en");v3([{tag:"electricity-lens-flow-card",card:z1,name:T("picker.flow"),description:T("picker.flow.description")},{tag:"electricity-lens-balance-card",card:W1,name:T("picker.economics"),description:T("picker.economics.description")},{tag:"electricity-lens-savings-card",card:o2,name:T("picker.savings"),description:T("picker.savings.description"),editor:{tag:"electricity-lens-savings-card-editor",element:A2}},{tag:"electricity-lens-heat-meters-card",card:i2,name:T("picker.heat_meters"),description:T("picker.heat_meters.description")},{tag:"electricity-lens-history-card",card:U1,name:T("picker.history"),description:T("picker.history.description"),editor:{tag:"electricity-lens-history-card-editor",element:K1}},{tag:"electricity-lens-figures-card",card:D1,name:T("picker.figures"),description:T("picker.figures.description"),editor:{tag:"electricity-lens-figures-card-editor",element:Q1}},{tag:"electricity-lens-breakdown-card",card:$1,name:T("picker.breakdown"),description:T("picker.breakdown.description"),editor:{tag:"electricity-lens-breakdown-card-editor",element:N1}}],[{type:"electricity-lens",element:d2,name:T("picker.dashboard"),description:T("picker.dashboard.description")}]);
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
lit-html/directives/repeat.js:
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
