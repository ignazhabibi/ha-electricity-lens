var je=globalThis,Ye=je.ShadowRoot&&(je.ShadyCSS===void 0||je.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ht=Symbol(),It=new WeakMap,De=class{constructor(r,e,t){if(this._$cssResult$=!0,t!==ht)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=r,this.t=e}get styleSheet(){let r=this.o,e=this.t;if(Ye&&r===void 0){let t=e!==void 0&&e.length===1;t&&(r=It.get(e)),r===void 0&&((this.o=r=new CSSStyleSheet).replaceSync(this.cssText),t&&It.set(e,r))}return r}toString(){return this.cssText}},qe=n=>new De(typeof n=="string"?n:n+"",void 0,ht),C=(n,...r)=>{let e=n.length===1?n[0]:r.reduce((t,s,i)=>t+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+n[i+1],n[0]);return new De(e,n,ht)},Lt=(n,r)=>{if(Ye)n.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of r){let t=document.createElement("style"),s=je.litNonce;s!==void 0&&t.setAttribute("nonce",s),t.textContent=e.cssText,n.appendChild(t)}},gt=Ye?n=>n:n=>n instanceof CSSStyleSheet?(r=>{let e="";for(let t of r.cssRules)e+=t.cssText;return qe(e)})(n):n;var{is:Ar,defineProperty:Rr,getOwnPropertyDescriptor:Er,getOwnPropertyNames:Tr,getOwnPropertySymbols:Fr,getPrototypeOf:Pr}=Object,Je=globalThis,zt=Je.trustedTypes,Dr=zt?zt.emptyScript:"",Mr=Je.reactiveElementPolyfillSupport,Me=(n,r)=>n,pt={toAttribute(n,r){switch(r){case Boolean:n=n?Dr:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,r){let e=n;switch(r){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},Ht=(n,r)=>!Ar(n,r),Ot={attribute:!0,type:String,converter:pt,reflect:!1,useDefault:!1,hasChanged:Ht};Symbol.metadata??=Symbol("metadata"),Je.litPropertyMetadata??=new WeakMap;var K=class extends HTMLElement{static addInitializer(r){this._$Ei(),(this.l??=[]).push(r)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(r,e=Ot){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(r)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(r,e),!e.noAccessor){let t=Symbol(),s=this.getPropertyDescriptor(r,t,e);s!==void 0&&Rr(this.prototype,r,s)}}static getPropertyDescriptor(r,e,t){let{get:s,set:i}=Er(this.prototype,r)??{get(){return this[e]},set(a){this[e]=a}};return{get:s,set(a){let l=s?.call(this);i?.call(this,a),this.requestUpdate(r,l,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(r){return this.elementProperties.get(r)??Ot}static _$Ei(){if(this.hasOwnProperty(Me("elementProperties")))return;let r=Pr(this);r.finalize(),r.l!==void 0&&(this.l=[...r.l]),this.elementProperties=new Map(r.elementProperties)}static finalize(){if(this.hasOwnProperty(Me("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Me("properties"))){let e=this.properties,t=[...Tr(e),...Fr(e)];for(let s of t)this.createProperty(s,e[s])}let r=this[Symbol.metadata];if(r!==null){let e=litPropertyMetadata.get(r);if(e!==void 0)for(let[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let s=this._$Eu(e,t);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(r){let e=[];if(Array.isArray(r)){let t=new Set(r.flat(1/0).reverse());for(let s of t)e.unshift(gt(s))}else r!==void 0&&e.push(gt(r));return e}static _$Eu(r,e){let t=e.attribute;return t===!1?void 0:typeof t=="string"?t:typeof r=="string"?r.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(r=>this.enableUpdating=r),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(r=>r(this))}addController(r){(this._$EO??=new Set).add(r),this.renderRoot!==void 0&&this.isConnected&&r.hostConnected?.()}removeController(r){this._$EO?.delete(r)}_$E_(){let r=new Map,e=this.constructor.elementProperties;for(let t of e.keys())this.hasOwnProperty(t)&&(r.set(t,this[t]),delete this[t]);r.size>0&&(this._$Ep=r)}createRenderRoot(){let r=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Lt(r,this.constructor.elementStyles),r}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(r=>r.hostConnected?.())}enableUpdating(r){}disconnectedCallback(){this._$EO?.forEach(r=>r.hostDisconnected?.())}attributeChangedCallback(r,e,t){this._$AK(r,t)}_$ET(r,e){let t=this.constructor.elementProperties.get(r),s=this.constructor._$Eu(r,t);if(s!==void 0&&t.reflect===!0){let i=(t.converter?.toAttribute!==void 0?t.converter:pt).toAttribute(e,t.type);this._$Em=r,i==null?this.removeAttribute(s):this.setAttribute(s,i),this._$Em=null}}_$AK(r,e){let t=this.constructor,s=t._$Eh.get(r);if(s!==void 0&&this._$Em!==s){let i=t.getPropertyOptions(s),a=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:pt;this._$Em=s;let l=a.fromAttribute(e,i.type);this[s]=l??this._$Ej?.get(s)??l,this._$Em=null}}requestUpdate(r,e,t,s=!1,i){if(r!==void 0){let a=this.constructor;if(s===!1&&(i=this[r]),t??=a.getPropertyOptions(r),!((t.hasChanged??Ht)(i,e)||t.useDefault&&t.reflect&&i===this._$Ej?.get(r)&&!this.hasAttribute(a._$Eu(r,t))))return;this.C(r,e,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(r,e,{useDefault:t,reflect:s,wrapped:i},a){t&&!(this._$Ej??=new Map).has(r)&&(this._$Ej.set(r,a??e??this[r]),i!==!0||a!==void 0)||(this._$AL.has(r)||(this.hasUpdated||t||(e=void 0),this._$AL.set(r,e)),s===!0&&this._$Em!==r&&(this._$Eq??=new Set).add(r))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let r=this.scheduleUpdate();return r!=null&&await r,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,i]of this._$Ep)this[s]=i;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[s,i]of t){let{wrapped:a}=i,l=this[s];a!==!0||this._$AL.has(s)||l===void 0||this.C(s,void 0,i,l)}}let r=!1,e=this._$AL;try{r=this.shouldUpdate(e),r?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(t){throw r=!1,this._$EM(),t}r&&this._$AE(e)}willUpdate(r){}_$AE(r){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(r)),this.updated(r)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(r){return!0}update(r){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(r){}firstUpdated(r){}};K.elementStyles=[],K.shadowRootOptions={mode:"open"},K[Me("elementProperties")]=new Map,K[Me("finalized")]=new Map,Mr?.({ReactiveElement:K}),(Je.reactiveElementVersions??=[]).push("2.1.2");var ft=globalThis,Nt=n=>n,Ze=ft.trustedTypes,Ut=Ze?Ze.createPolicy("lit-html",{createHTML:n=>n}):void 0,_t="$lit$",G=`lit$${Math.random().toFixed(9).slice(2)}$`,yt="?"+G,Ir=`<${yt}>`,ie=document,Le=()=>ie.createComment(""),ze=n=>n===null||typeof n!="object"&&typeof n!="function",vt=Array.isArray,jt=n=>vt(n)||typeof n?.[Symbol.iterator]=="function",mt=`[ 	
\f\r]`,Ie=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Vt=/-->/g,Bt=/>/g,re=RegExp(`>|${mt}(?:([^\\s"'>=/]+)(${mt}*=${mt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Wt=/'/g,Kt=/"/g,Yt=/^(?:script|style|textarea|title)$/i,bt=n=>(r,...e)=>({_$litType$:n,strings:r,values:e}),m=bt(1),Fs=bt(2),Ps=bt(3),ne=Symbol.for("lit-noChange"),y=Symbol.for("lit-nothing"),Gt=new WeakMap,se=ie.createTreeWalker(ie,129);function qt(n,r){if(!vt(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ut!==void 0?Ut.createHTML(r):r}var Jt=(n,r)=>{let e=n.length-1,t=[],s,i=r===2?"<svg>":r===3?"<math>":"",a=Ie;for(let l=0;l<e;l++){let o=n[l],c,h,u=-1,g=0;for(;g<o.length&&(a.lastIndex=g,h=a.exec(o),h!==null);)g=a.lastIndex,a===Ie?h[1]==="!--"?a=Vt:h[1]!==void 0?a=Bt:h[2]!==void 0?(Yt.test(h[2])&&(s=RegExp("</"+h[2],"g")),a=re):h[3]!==void 0&&(a=re):a===re?h[0]===">"?(a=s??Ie,u=-1):h[1]===void 0?u=-2:(u=a.lastIndex-h[2].length,c=h[1],a=h[3]===void 0?re:h[3]==='"'?Kt:Wt):a===Kt||a===Wt?a=re:a===Vt||a===Bt?a=Ie:(a=re,s=void 0);let d=a===re&&n[l+1].startsWith("/>")?" ":"";i+=a===Ie?o+Ir:u>=0?(t.push(c),o.slice(0,u)+_t+o.slice(u)+G+d):o+G+(u===-2?l:d)}return[qt(n,i+(n[e]||"<?>")+(r===2?"</svg>":r===3?"</math>":"")),t]},Oe=class n{constructor({strings:r,_$litType$:e},t){let s;this.parts=[];let i=0,a=0,l=r.length-1,o=this.parts,[c,h]=Jt(r,e);if(this.el=n.createElement(c,t),se.currentNode=this.el.content,e===2||e===3){let u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(s=se.nextNode())!==null&&o.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let u of s.getAttributeNames())if(u.endsWith(_t)){let g=h[a++],d=s.getAttribute(u).split(G),p=/([.?@])?(.*)/.exec(g);o.push({type:1,index:i,name:p[2],strings:d,ctor:p[1]==="."?Xe:p[1]==="?"?et:p[1]==="@"?tt:oe}),s.removeAttribute(u)}else u.startsWith(G)&&(o.push({type:6,index:i}),s.removeAttribute(u));if(Yt.test(s.tagName)){let u=s.textContent.split(G),g=u.length-1;if(g>0){s.textContent=Ze?Ze.emptyScript:"";for(let d=0;d<g;d++)s.append(u[d],Le()),se.nextNode(),o.push({type:2,index:++i});s.append(u[g],Le())}}}else if(s.nodeType===8)if(s.data===yt)o.push({type:2,index:i});else{let u=-1;for(;(u=s.data.indexOf(G,u+1))!==-1;)o.push({type:7,index:i}),u+=G.length-1}i++}}static createElement(r,e){let t=ie.createElement("template");return t.innerHTML=r,t}};function ae(n,r,e=n,t){if(r===ne)return r;let s=t!==void 0?e._$Co?.[t]:e._$Cl,i=ze(r)?void 0:r._$litDirective$;return s?.constructor!==i&&(s?._$AO?.(!1),i===void 0?s=void 0:(s=new i(n),s._$AT(n,e,t)),t!==void 0?(e._$Co??=[])[t]=s:e._$Cl=s),s!==void 0&&(r=ae(n,s._$AS(n,r.values),s,t)),r}var Qe=class{constructor(r,e){this._$AV=[],this._$AN=void 0,this._$AD=r,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(r){let{el:{content:e},parts:t}=this._$AD,s=(r?.creationScope??ie).importNode(e,!0);se.currentNode=s;let i=se.nextNode(),a=0,l=0,o=t[0];for(;o!==void 0;){if(a===o.index){let c;o.type===2?c=new ge(i,i.nextSibling,this,r):o.type===1?c=new o.ctor(i,o.name,o.strings,this,r):o.type===6&&(c=new rt(i,this,r)),this._$AV.push(c),o=t[++l]}a!==o?.index&&(i=se.nextNode(),a++)}return se.currentNode=ie,s}p(r){let e=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(r,t,e),e+=t.strings.length-2):t._$AI(r[e])),e++}},ge=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(r,e,t,s){this.type=2,this._$AH=y,this._$AN=void 0,this._$AA=r,this._$AB=e,this._$AM=t,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let r=this._$AA.parentNode,e=this._$AM;return e!==void 0&&r?.nodeType===11&&(r=e.parentNode),r}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(r,e=this){r=ae(this,r,e),ze(r)?r===y||r==null||r===""?(this._$AH!==y&&this._$AR(),this._$AH=y):r!==this._$AH&&r!==ne&&this._(r):r._$litType$!==void 0?this.$(r):r.nodeType!==void 0?this.T(r):jt(r)?this.k(r):this._(r)}O(r){return this._$AA.parentNode.insertBefore(r,this._$AB)}T(r){this._$AH!==r&&(this._$AR(),this._$AH=this.O(r))}_(r){this._$AH!==y&&ze(this._$AH)?this._$AA.nextSibling.data=r:this.T(ie.createTextNode(r)),this._$AH=r}$(r){let{values:e,_$litType$:t}=r,s=typeof t=="number"?this._$AC(r):(t.el===void 0&&(t.el=Oe.createElement(qt(t.h,t.h[0]),this.options)),t);if(this._$AH?._$AD===s)this._$AH.p(e);else{let i=new Qe(s,this),a=i.u(this.options);i.p(e),this.T(a),this._$AH=i}}_$AC(r){let e=Gt.get(r.strings);return e===void 0&&Gt.set(r.strings,e=new Oe(r)),e}k(r){vt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,t,s=0;for(let i of r)s===e.length?e.push(t=new n(this.O(Le()),this.O(Le()),this,this.options)):t=e[s],t._$AI(i),s++;s<e.length&&(this._$AR(t&&t._$AB.nextSibling,s),e.length=s)}_$AR(r=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);r!==this._$AB;){let t=Nt(r).nextSibling;Nt(r).remove(),r=t}}setConnected(r){this._$AM===void 0&&(this._$Cv=r,this._$AP?.(r))}},oe=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(r,e,t,s,i){this.type=1,this._$AH=y,this._$AN=void 0,this.element=r,this.name=e,this._$AM=s,this.options=i,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=y}_$AI(r,e=this,t,s){let i=this.strings,a=!1;if(i===void 0)r=ae(this,r,e,0),a=!ze(r)||r!==this._$AH&&r!==ne,a&&(this._$AH=r);else{let l=r,o,c;for(r=i[0],o=0;o<i.length-1;o++)c=ae(this,l[t+o],e,o),c===ne&&(c=this._$AH[o]),a||=!ze(c)||c!==this._$AH[o],c===y?r=y:r!==y&&(r+=(c??"")+i[o+1]),this._$AH[o]=c}a&&!s&&this.j(r)}j(r){r===y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,r??"")}},Xe=class extends oe{constructor(){super(...arguments),this.type=3}j(r){this.element[this.name]=r===y?void 0:r}},et=class extends oe{constructor(){super(...arguments),this.type=4}j(r){this.element.toggleAttribute(this.name,!!r&&r!==y)}},tt=class extends oe{constructor(r,e,t,s,i){super(r,e,t,s,i),this.type=5}_$AI(r,e=this){if((r=ae(this,r,e,0)??y)===ne)return;let t=this._$AH,s=r===y&&t!==y||r.capture!==t.capture||r.once!==t.once||r.passive!==t.passive,i=r!==y&&(t===y||s);s&&this.element.removeEventListener(this.name,this,t),i&&this.element.addEventListener(this.name,this,r),this._$AH=r}handleEvent(r){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,r):this._$AH.handleEvent(r)}},rt=class{constructor(r,e,t){this.element=r,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(r){ae(this,r)}},Zt={M:_t,P:G,A:yt,C:1,L:Jt,R:Qe,D:jt,V:ae,I:ge,H:oe,N:et,U:tt,B:Xe,F:rt},Lr=ft.litHtmlPolyfillSupport;Lr?.(Oe,ge),(ft.litHtmlVersions??=[]).push("3.3.3");var Qt=(n,r,e)=>{let t=e?.renderBefore??r,s=t._$litPart$;if(s===void 0){let i=e?.renderBefore??null;t._$litPart$=s=new ge(r.insertBefore(Le(),i),i,void 0,e??{})}return s._$AI(n),s};var xt=globalThis,T=class extends K{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let r=super.createRenderRoot();return this.renderOptions.renderBefore??=r.firstChild,r}update(r){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(r),this._$Do=Qt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return ne}};T._$litElement$=!0,T.finalized=!0,xt.litElementHydrateSupport?.({LitElement:T});var zr=xt.litElementPolyfillSupport;zr?.({LitElement:T});(xt.litElementVersions??=[]).push("4.2.2");var Xt=n=>(...r)=>({_$litDirective$:n,values:r}),st=class{constructor(r){}get _$AU(){return this._$AM._$AU}_$AT(r,e,t){this._$Ct=r,this._$AM=e,this._$Ci=t}_$AS(r,e){return this.update(r,e)}update(r,e){return this.render(...e)}};var{I:js}=Zt;var Or={},er=(n,r=Or)=>n._$AH=r;var tr=Xt(class extends st{constructor(){super(...arguments),this.key=y}render(n,r){return this.key=n,r}update(n,[r,e]){return r!==this.key&&(er(n),this.key=r),e}});var rr;function Hr(){if(customElements.get("ha-chart-base"))return Promise.resolve(!0);let n=window.loadCardHelpers;return n?(rr??=(async()=>{try{(await n()).createCardElement({type:"statistics-graph",entities:[]})}catch{}let r=new Promise(e=>setTimeout(()=>e(!1),1e4));return Promise.race([customElements.whenDefined("ha-chart-base").then(()=>!0),r])})(),rr):Promise.resolve(!1)}function at(n){Hr().then(n),customElements.whenDefined("ha-chart-base").then(()=>n(!0))}var it="compare-",sr=n=>Math.round(n*255).toString(16).padStart(2,"0");function me(n,r){let e=n.trim();if(/^#[0-9a-f]{6}$/i.test(e))return e+sr(r);if(/^#[0-9a-f]{3}$/i.test(e))return`#${[...e.slice(1)].map(s=>s+s).join("")}${sr(r)}`;let t=e.match(/^rgba?\(([^)]+)\)/i);if(t){let[s,i,a]=t[1].split(/[ ,/]+/).filter(Boolean);return`rgba(${s}, ${i}, ${a}, ${r})`}return e}var ce=n=>n.replace(/[&<>"']/g,r=>`&#${r.charCodeAt(0)};`),wt=n=>`<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${n}"></span>`;function ir(n){if(n<=0)return 1;let r=10**Math.floor(Math.log10(n)),e=n/r;return([1,2,2.5,5,10].find(s=>e<=s*(1+1e-9))??10)*r}var pe=n=>Number(n.toFixed(10));function Nr(n,r){if(n.min>=0&&r.min>=0)return;let e=ir((n.max-n.min)/6),t=Math.max(Math.ceil(pe(n.max/e)),r.max>0?1:0),s=Math.max(Math.ceil(pe(-n.min/e)),r.min<0?1:0),i=ir(Math.max(t?r.max/t:0,s?-r.min/s:0));return{bar:{min:pe(-s*e),max:pe(t*e),interval:e},line:{min:pe(-s*i),max:pe(t*i),interval:i}}}function nr(n,r,e){return n.map((t,s)=>({id:e?it+t.id:t.id,type:"bar",name:t.name,stack:r,cursor:"default",barMaxWidth:50,color:me(t.color,e?50/255:127/255),itemStyle:{borderColor:e?me(t.color,127/255):t.color},data:t.values.map((i,a)=>{let l=n.slice(s+1).every(o=>Math.sign(o.values[a]??0)!==Math.sign(i??0));return{value:i,itemStyle:i?l?{borderRadius:i>0?[4,4,0,0]:[0,0,4,4]}:void 0:{borderWidth:0}}})}))}function ar(n,r){let e=0,t=0;for(let s=0;s<r;s+=1){let i=n.map(a=>a.values[s]??0);t=Math.max(t,i.filter(a=>a>0).reduce((a,l)=>a+l,0)),e=Math.min(e,i.filter(a=>a<0).reduce((a,l)=>a+l,0))}return{min:e,max:t}}function cr(n){let r=n.lines??[],e=n.compare,t=[...e?nr(e.series,"compare",!0):[],...nr(n.series,"main",!1)],s=r.map(d=>({id:d.id,type:"line",name:d.name,yAxisIndex:1,color:d.color,symbol:"none",showSymbol:!1,step:d.step?"middle":!1,lineStyle:{width:1.5,type:d.dash??"dashed",color:d.color},z:1,connectNulls:!0,data:d.values})),i=[...t,...s],a=new Map(r.map(d=>[d.id,d.format])),l=new Set(n.series.filter(d=>d.inTotal===!1).flatMap(d=>[d.id,it+d.id])),o=(d,p)=>{let f=p.filter(_=>_.value);if(!f.length)return"";let v=f.map(_=>`${wt(String(_.color??""))}${ce(_.seriesName??"")}: ${n.format(_.value??0)}`),b=f.filter(_=>!l.has(_.seriesId??"")).reduce((_,x)=>_+(x.value??0),0);return`<b>${ce(d)}</b><br>${v.join("<br>")}`+(f.length>1?`<br><b>${ce(n.total)}: ${n.format(b)}</b>`:"")},c=d=>{let p=Array.isArray(d)?d:[d],f=document.createElement("div");if(!p.length)return f;let v=p[0].dataIndex,b=k=>a.has(k.seriesId??""),_=k=>(k.seriesId??"").startsWith(it),x=p.filter(k=>b(k)&&k.value!==null&&k.value!==void 0).map(k=>`${wt(String(k.color??""))}${ce(k.seriesName??"")}: ${a.get(k.seriesId??"")?.(k.value??0)??""}`),S=n.labels[v]?.tooltip??"",w=o(S,p.filter(k=>!b(k)&&!_(k))),$=e?o(e.labels[v]??"",p.filter(k=>_(k))):"",F=[w||`<b>${ce(S)}</b>`];return x.length&&(F[0]+=`<br>${x.join("<br>")}`),$&&F.push($),f.innerHTML=F.join("<br><br>"),f},h={type:"value",name:n.unit,nameGap:2,nameTextStyle:{align:"left"},axisLabel:{formatter:n.tick},splitLine:{show:!0}},u={type:"value",name:n.lineUnit??"",nameGap:2,nameTextStyle:{align:"right"},axisLabel:{formatter:n.lineTick??n.tick},splitLine:{show:!1}};if(r.length){let d=n.labels.length,p=ar(n.series,d),f=e?ar(e.series,d):p,v=r.flatMap(x=>x.values.filter(S=>S!==null)),b=Math.min(0,...v),_=Nr({min:Math.min(p.min,f.min),max:Math.max(p.max,f.max)},{min:b,max:Math.max(0,...v)});if(_){Object.assign(h,_.bar),Object.assign(u,_.line);let x=n.lineTick??n.tick;b>=0&&(u.axisLabel={formatter:S=>S<0?"":x(S)})}}let g={xAxis:{type:"category",data:n.labels.map(d=>d.axis),axisTick:{show:!1}},yAxis:r.length?[h,u]:h,grid:{top:15,bottom:0,left:1,right:1,containLabel:!0},legend:{show:!0,type:"custom",data:[...n.series,...r].map(d=>({id:d.id,secondaryIds:e?.series.some(p=>p.id===d.id)?[it+d.id]:[],name:d.name}))},tooltip:{trigger:"axis",formatter:c}};return{data:i,options:g}}function nt(n){let r=n.reduce((e,t)=>e+Math.max(0,t),0);return n.map(e=>r>0?Math.max(0,e)/r*100:0)}function or(n){let r=[],e=-Math.PI/2;for(let t of n){let s=e+t/100*2*Math.PI;r.push([e,s]),e=s}return r}function lr(n){let r=n.items.map(u=>n.hidden.has(u.id)?0:u.value),e=nt(r),t=r.reduce((u,g)=>u+Math.max(0,g),0),s=or(e),i=n.compare?.map((u,g)=>n.hidden.has(n.items[g].id)?0:u),a=i?nt(i):[],l=or(a),o=u=>{let g=Math.min(90,u.getWidth()/2-8,u.getHeight()/2-8);return{cx:u.getWidth()/2,cy:u.getHeight()/2,r:g,r0:g*(i?50:40)/70}},c=n.items.map((u,g)=>({id:u.id,type:"custom",name:u.name,coordinateSystem:"none",cursor:"default",color:me(u.color,.5),data:[[r[g],s[g][0],s[g][1],e[g]]],renderItem:(d,p)=>{let f=p.value(1),v=p.value(2);if(!(v-f>0))return null;let b=o(p),_=[{type:"sector",shape:{...b,startAngle:f,endAngle:v,cornerRadius:4},style:{fill:me(u.color,.5),stroke:u.color,lineWidth:1}}];if(v-f>=15*Math.PI/180){let x=(f+v)/2,S=Math.cos(x)>=0,w=[b.cx+Math.cos(x)*b.r,b.cy+Math.sin(x)*b.r],$=[b.cx+Math.cos(x)*(b.r+10),b.cy+Math.sin(x)*(b.r+10)],F=[$[0]+(S?10:-10),$[1]];_.push({type:"polyline",silent:!0,shape:{points:[w,$,F]},style:{stroke:u.color,fill:"none"}},{type:"text",silent:!0,x:F[0]+(S?4:-4),y:F[1],style:{text:`${u.name}
${n.percent(p.value(3))}`,fill:n.labelColor,fontSize:12,lineHeight:16,align:S?"left":"right",verticalAlign:"middle"}})}return{type:"group",children:_}}}));return i&&n.items.forEach((u,g)=>{c.push({id:`compare-${u.id}`,type:"custom",name:u.name,coordinateSystem:"none",cursor:"default",data:[[i[g],l[g][0],l[g][1],a[g]]],renderItem:(d,p)=>{let f=p.value(1),v=p.value(2);if(!(v-f>0))return null;let b=o(p);return{type:"sector",shape:{cx:b.cx,cy:b.cy,r:b.r0,r0:b.r*30/70,startAngle:f,endAngle:v,cornerRadius:4},style:{fill:me(u.color,50/255),stroke:me(u.color,127/255),lineWidth:1}}}})}),c.push({id:"total",type:"custom",coordinateSystem:"none",silent:!0,tooltip:{show:!1},data:[[t]],renderItem:(u,g)=>{let d=o(g);return{type:"text",x:d.cx,y:d.cy,style:{text:i?n.format(g.value(0)):`${n.total}
${n.format(g.value(0))}`,fill:n.centerColor,fontSize:i?12:14,lineHeight:24,fontWeight:"bold",align:"center",verticalAlign:"middle"}}}}),{data:c,options:{xAxis:{show:!1},yAxis:{show:!1},legend:{show:!1},tooltip:{show:!0,trigger:"item",formatter:u=>{let g=(u.seriesId??"").startsWith("compare-"),d=g?(u.seriesId??"").slice(8):u.seriesId,p=n.items.findIndex(x=>x.id===d);if(p<0)return"";let f=n.items[p],v=document.createElement("div"),b=u.value?.[0]??(g?i?.[p]??0:r[p]),_=u.value?.[3]??(g?a[p]:e[p]);return v.innerHTML=`<b>${ce(f.name)}${g&&n.compared?` \xB7 ${ce(n.compared)}`:""}</b><br>${wt(f.color)}${n.format(b)} (${n.percent(_)})`,v}}}}}var le={solar:"var(--energy-solar-color, #ff9800)",grid:"var(--energy-grid-consumption-color, #488fc2)",cheap:"color-mix(in srgb, var(--energy-grid-consumption-color, #488fc2) 55%, #fff)",expensive:"color-mix(in srgb, var(--energy-grid-consumption-color, #488fc2) 70%, #000)",export:"var(--energy-grid-return-color, #8353d1)",heat:"var(--graph-color-30, var(--color-30, #bf3947))",car:"var(--energy-non-fossil-color, #0f9d58)"},ur=["#4269d0","#f4bd4a","#ff725c","#6cc5b0","#a463f2","#ff8ab7","#9c6b4e","#97bbf5","#01ab63","#094bad","#c99000","#d84f3e"];function Ur(n){let r=n.trim(),e=/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(r)?.[1];if(e){let s=e.length===3?[...e].map(i=>i+i).join(""):e;return[0,2,4].map(i=>parseInt(s.slice(i,i+2),16))}let t=/^rgba?\(([^)]+)\)/i.exec(r)?.[1];if(t){let[s,i,a]=t.split(/[ ,/]+/).filter(Boolean).map(Number);if([s,i,a].every(Number.isFinite))return[s,i,a]}}var Vr=([n,r,e])=>`#${[n,r,e].map(t=>Math.round(Math.min(Math.max(t,0),255)).toString(16).padStart(2,"0")).join("")}`;function dr(n,r,e){let t=Ur(n);if(!t)return n;let s=r==="white"?255:0;return Vr(t.map(i=>i*e+s*(1-e)))}function P(n){let r=getComputedStyle(n),e=(i,a)=>r.getPropertyValue(i).trim()||a,t=e("--energy-grid-consumption-color","#488fc2"),s=Array.from({length:54},(i,a)=>{let l=a+1;return r.getPropertyValue(`--graph-color-${l}`).trim()||r.getPropertyValue(`--color-${l}`).trim()||ur[a%ur.length]});return{solar:e("--energy-solar-color","#ff9800"),grid:t,cheap:dr(t,"white",.55),expensive:dr(t,"black",.7),export:e("--energy-grid-return-color","#8353d1"),standing:e("--electricity-lens-standing-charge-color","#a1887f"),heat:r.getPropertyValue("--graph-color-30").trim()||e("--color-30","#bf3947"),car:e("--energy-non-fossil-color","#0f9d58"),other:r.getPropertyValue("--history-unknown-color").trim()||e("--disabled-color","#bdbdbd"),line:e("--secondary-text-color","#727272"),consumers:s}}function D(n,r){let e=new Map,t=new Map,s=0;for(let i of n.areas)if(i.kind==="other")e.set(i.id,r.other);else if(i.kind==="device"){let a=r.consumers[s++%r.consumers.length];e.set(i.id,a);let l=i.statistics.energy?.[0];l&&t.set(l,a)}for(let i of n.areas)if(i.kind==="category")if(i.id==="heat_pump")e.set(i.id,r.heat);else{let l=(i.statistics.energy??[]).map(c=>t.get(c)).filter(Boolean),o=i.id==="wallbox"?r.car:r.grid;e.set(i.id,l[l.length-1]??o)}return e}var Br=n=>!!n&&typeof n.subscribe=="function";function O(n){if(n!==void 0&&!n.startsWith("energy_"))throw new Error("Collection keys must start with energy_.")}function Wr(n,r){let e=location.pathname.split("/")[1]??"",t=n;for(let s of r?[`_${r}`]:[`_energy_${e}`,"_energy"])if(Br(t[s]))return t[s]}var Kr=()=>new Date().setHours(24,0,0,0)-1;function fe(n,r,e){let t,s,i=0,a=()=>{let l=Wr(n,r);if(l){t=l.subscribe(o=>e({start:new Date(o.start).getTime(),end:o.end?new Date(o.end).getTime():Kr()},o.startCompare&&o.endCompare?{start:new Date(o.startCompare).getTime(),end:new Date(o.endCompare).getTime()}:void 0));return}i+=1,i===2&&e(null),i<20&&(s=window.setTimeout(a,500))};return a(),()=>{window.clearTimeout(s),t?.()}}var Gr={comma_decimal:"en-US",decimal_comma:"de",space_comma:"fr",quote_decimal:"de-CH"};function I(n,r){let e=n?.number_format,t=e==="system"?void 0:Gr[e??""]??n?.language??"en";return new Intl.NumberFormat(t,{...r,...e==="none"?{useGrouping:!1}:{}})}function hr(n){switch(n?.time_format){case"am_pm":return!0;case"24":return!1;case"system":return new Intl.DateTimeFormat(void 0,{hour:"numeric"}).resolvedOptions().hour12;default:return}}function gr(n){let r=/^([-−+]?[\d.,'’\u00a0\u202f ]*\d)[\u00a0\u202f ](.+)$/.exec(n);return r?[r[1],r[2]]:[n,""]}function _e(n,r){let e=(i,a)=>{let l=Math.abs(i),o=a??(l<10?2:l<100?1:0);return I(n,{maximumFractionDigits:o,minimumFractionDigits:a??0}).format(i)};return{number:e,value:(i,a)=>{switch(a){case"energy":return`${e(i,Math.abs(i)<100?1:0)} kWh`;case"money":{let l=Math.abs(i)<100;return I(n,{style:"currency",currency:r,maximumFractionDigits:l?2:0,minimumFractionDigits:l?2:0}).format(i)}case"price":return r==="EUR"?`${e(i*100,1)} ct/kWh`:`${I(n,{style:"currency",currency:r,maximumFractionDigits:3}).format(i)}/kWh`;case"percent":return I(n,{style:"percent",maximumFractionDigits:0}).format(i/100);case"number":return e(i,Math.abs(i)<10?2:Math.abs(i)<100?1:0);case"distance":return`${e(i,Math.abs(i)<100?1:0)} km`;case"per_100km":return`${I(n,{style:"currency",currency:r,maximumFractionDigits:2,minimumFractionDigits:2}).format(i)}/100 km`}},currencySymbol:()=>I(n,{style:"currency",currency:r}).formatToParts(0).find(i=>i.type==="currency")?.value??""}}var $t={energy:["energy"],cost:["cost"],bill:["import_cost","standing_charge"],grid_price:["import_cost","energy"],device_grid_price:["cost","solar_cost","energy","solar"],price:["cost","energy","solar"],solar_share:["solar","energy"],cheap_share:["cheap","solar","energy"],expensive_share:["expensive","solar","energy"],cheap_saving:["cheap_saving"],self_consumption:["self_used","energy"],export:["export"],saving:["saving"],heat:["heat"],alternative_cost:["alternative_cost"],scop:["heat","energy"],heat_price:["cost","heat"],distance:["distance"],cost_per_100km:["cost","distance"],forecast_today:[],forecast_tomorrow:[],payback:[],annual_return:[]},jr={energy:["solar","export"],cost:["energy","solar","feed_in","standing_charge"],saving:["solar_saving"],heat:["energy"],distance:["energy"]},Yr=Object.keys($t),ue=n=>n==="forecast_today"||n==="forecast_tomorrow",de=n=>n==="payback"||n==="annual_return";function J(n){return Yr.filter(r=>ue(r)?n.forecast===!0:de(r)?n.investment===!0:$t[r].every(e=>n.statistics[e]?.length))}function pr(n,r){return[...$t[r],...jr[r]??[]].flatMap(e=>n.statistics[e]??[])}var ot=(n,r)=>r>0?n/r*100:null;function ye(n,r,e,t){let s=e("energy"),i=e("solar"),a=o=>({value:o,unit:"energy"}),l=o=>({value:o,unit:"money"});switch(n){case"energy":{if(s!==null&&i!==null&&s>0){if(r.kind==="household")return{value:s,unit:"energy",line:{key:"line_energy_parts",values:{grid:a(Math.max(s-i,0)),solar:a(i)}}};let c=ot(i,s)??0;return{value:s,unit:"energy",line:{key:"line_solar_part",values:{percent:{value:c,unit:"percent"}}}}}let o=e("export");return r.kind==="grid"&&o!==null?{value:s,unit:"energy",line:{key:"line_exported",values:{energy:a(o)}}}:{value:s,unit:"energy"}}case"cost":{let o=e("cost");if(o!==null&&s&&i!==null)return{value:o,unit:"money",line:{key:"line_average_price",values:{price:{value:o/s,unit:"price"}}}};let c=e("feed_in"),h=e("standing_charge");return o!==null&&c!==null&&h!==null?{value:o,unit:"money",line:{key:Math.abs(h)<.005?"line_bill_no_charge":"line_bill",values:{feed_in:l(c),charge:l(h)}}}:o!==null&&s!==null&&r.kind==="grid"?{value:o,unit:"money",line:{key:"line_for_import",values:{energy:a(s)}}}:{value:o,unit:"money"}}case"bill":{let o=e("import_cost"),c=e("standing_charge");return o===null||c===null?{value:null,unit:"money"}:{value:o+c,unit:"money",line:Math.abs(c)<.005?void 0:{key:"line_bill",values:{charge:l(c)}}}}case"grid_price":{let o=e("import_cost");return o===null||!s?{value:null,unit:"price"}:{value:o/s,unit:"price",line:{key:"line_cost_for",values:{cost:l(o),energy:a(s)}}}}case"device_grid_price":{let o=e("cost"),c=e("solar_cost");if(o===null||c===null||s===null||i===null)return{value:null,unit:"price"};let h=s-i;if(h<=0)return{value:null,unit:"price"};let u=o-c;return{value:u/h,unit:"price",line:{key:"line_cost_for",values:{cost:l(u),energy:a(h)}}}}case"cheap_saving":return{value:e("cheap_saving"),unit:"money",line:{key:"line_against_normal",values:{}}};case"price":{let o=e("cost");return o===null||!s?{value:null,unit:"price"}:{value:o/s,unit:"price",line:{key:"line_cost_for",values:{cost:{value:o,unit:"money"},energy:a(s)}}}}case"solar_share":return s===null||i===null?{value:null,unit:"percent"}:{value:ot(i,s),unit:"percent",line:{key:"line_part_of",values:{part:a(i),whole:a(s)}}};case"cheap_share":case"expensive_share":{let o=e(n==="cheap_share"?"cheap":"expensive");if(s===null||i===null||o===null)return{value:null,unit:"percent"};let c=Math.max(s-i,0);return{value:ot(o,c),unit:"percent",line:{key:"line_part_of",values:{part:a(o),whole:a(c)}}}}case"self_consumption":{let o=e("self_used");return s===null||o===null?{value:null,unit:"percent"}:{value:ot(o,s),unit:"percent",line:{key:"line_part_of",values:{part:a(o),whole:a(s)}}}}case"export":return{value:e("export"),unit:"energy"};case"saving":{let o=e("saving"),c=e("solar_saving");return o===null||c===null?{value:o,unit:"money"}:{value:o+c,unit:"money",line:Math.abs(c)<.005?void 0:{key:"line_saving_split",values:{solar:l(c)}}}}case"heat":{let o=e("heat");return o===null||s===null?{value:o,unit:"energy"}:{value:o,unit:"energy",line:{key:"line_from_electricity",values:{energy:a(s)}}}}case"alternative_cost":return{value:e("alternative_cost"),unit:"money"};case"scop":{let o=e("heat");return o===null||!s?{value:null,unit:"number"}:{value:o/s,unit:"number",line:{key:"line_heat_from",values:{heat:a(o),energy:a(s)}}}}case"heat_price":{let o=e("heat"),c=e("cost");return o===null||c===null||!o?{value:null,unit:"price"}:{value:c/o,unit:"price",line:{key:"line_cost_for",values:{cost:{value:c,unit:"money"},energy:a(o)}}}}case"distance":{let o=e("distance");return o===null||s===null?{value:o,unit:"distance"}:{value:o,unit:"distance",line:{key:"line_charged",values:{energy:a(s)}}}}case"cost_per_100km":{let o=e("distance"),c=e("cost");return o===null||c===null||!o?{value:null,unit:"per_100km"}:{value:c/o*100,unit:"per_100km",line:{key:"line_cost_for",values:{cost:{value:c,unit:"money"},energy:{value:o,unit:"distance"}}}}}case"forecast_today":case"forecast_tomorrow":return{value:t,unit:"energy"};case"payback":case"annual_return":return{value:null,unit:"percent"}}}var mr=["change","mean","min","max"],H=n=>n.statistic!==void 0?"statistic":n.entity!==void 0?"entity":"energy";function qr(n,r){let e=new Date(n),t=new Date(r),s=l=>Date.UTC(l.getFullYear(),l.getMonth(),l.getDate()),i=Math.round((s(t)-s(e))/864e5),a=l=>l.getTime()-new Date(l).setHours(0,0,0,0);return a(t)<a(e)?i-1:i}function Z({start:n,end:r}){let e=qr(n,r),t=new Date(r);return new Date(n).getDate()===1&&new Date(t.getFullYear(),t.getMonth(),t.getDate()+1).getDate()===1&&e>35?"month":e>2?"day":"hour"}var ve=n=>n==="year"?"month":n,Jr=(n,r)=>{let e=new Date(n);return r==="hour"?e.setMinutes(0,0,0):(e.setHours(0,0,0,0),r==="day"||(e.setDate(1),r==="month")?e.getTime():e.setMonth(0))},Zr=(n,r)=>{let e=new Date(n);return r==="hour"?e.setHours(e.getHours()+1):r==="day"?e.setDate(e.getDate()+1):r==="month"?e.setMonth(e.getMonth()+1):e.setFullYear(e.getFullYear()+1),e.getTime()};function St({start:n,end:r},e){let t=[];for(let s=Jr(n,e);s<=r&&t.length<400;s=Zr(s,e))t.push(s);return t}function fr(n,r=new Date){let e=n.filter(s=>s!==null).map(s=>s.getFullYear()),t=Math.min(r.getFullYear(),...e);return{start:new Date(t,0,1).getTime(),end:new Date(r.getFullYear()+1,0,1).getTime()-1}}var _r=2e3;function yr(n,r){for(let e=0;e<r;e+=1)if(n.some(t=>t[e]!==null&&t[e]!==void 0))return e;return 0}function kt(n,r,e){let t=r.map(()=>null),s=e==="hour"?0:12*36e5;for(let i of n??[]){if(i.change===null||i.change===void 0)continue;let a=(typeof i.start=="number"?i.start:Date.parse(i.start))+s,l=-1;for(let o=0;o<r.length&&r[o]<=a;o+=1)l=o;l<0||(t[l]=(t[l]??0)+i.change)}return t}function N(n,r=new Date){let e=(a,l)=>({start:a.getTime(),end:l.getTime()-1}),t=r.getFullYear(),s=r.getMonth(),i=r.getDate();switch(n){case"today":return e(new Date(t,s,i),new Date(t,s,i+1));case"yesterday":return e(new Date(t,s,i-1),new Date(t,s,i));case"this_month":return e(new Date(t,s,1),new Date(t,s+1,1));case"last_month":return e(new Date(t,s-1,1),new Date(t,s,1));case"this_year":return e(new Date(t,0,1),new Date(t+1,0,1));case"last_year":return e(new Date(t-1,0,1),new Date(t,0,1))}}function vr(n,r,e){let t=r.map(()=>0),s=r.map(()=>0),i=e==="hour"?0:12*36e5;for(let a of n??[]){if(a.mean===null||a.mean===void 0)continue;let l=(typeof a.start=="number"?a.start:Date.parse(a.start))+i,o=-1;for(let c=0;c<r.length&&r[c]<=l;c+=1)o=c;o<0||(t[o]+=a.mean,s[o]+=1)}return t.map((a,l)=>s[l]?a/s[l]:null)}var A="electricity_lens",be=["pv","heat_pump","wallbox"],Q=n=>{if(n==null||n==="")return null;let r=Number(n);return Number.isFinite(r)?r:null},Qr=n=>typeof n=="string"&&n?new Date(n):null;function L(n){let r=Object.values(n.entities??{}).filter(i=>i.platform===A),e=(i,a)=>r.find(l=>l.device_id===i&&l.translation_key===a),t=i=>i?Q(n.states[i]?.state):null,s=[];for(let i of r){if(i.translation_key!=="saving")continue;let a=n.states[i.entity_id];if(!a||a.state==="unavailable")continue;let l=a.attributes,o=l.category;be.includes(o)&&s.push({category:o,savingStatistic:typeof l.statistic_id=="string"?l.statistic_id:`${A}:${o}_saving`,calculating:l.calculating===!0,saving:Q(a.state),investment:Q(l.investment),balance:Q(l.balance),perYear:t(e(i.device_id,"saving_per_year")?.entity_id),countingSince:Qr(l.counting_since),entityId:i.entity_id,heating:l.heating==="gas"||l.heating==="oil"?l.heating:null})}return s.sort((i,a)=>be.indexOf(i.category)-be.indexOf(a.category))}function ct(n){let r=Object.values(n.entities??{}).filter(e=>e.platform===A);return r.filter(e=>e.translation_key==="saving").flatMap(e=>{let t=n.states[e.entity_id]?.attributes,s=o=>r.find(c=>c.device_id===e.device_id&&c.translation_key===o)?.entity_id,i=s("payback"),a=s("annual_return"),l=t?.category;return be.includes(l)&&Number(t?.investment)>0&&i&&a?[{category:l,payback:i,annualReturn:a}]:[]}).sort((e,t)=>be.indexOf(e.category)-be.indexOf(t.category))}var He=n=>n==="pv"?"solar":n;function br(n){let r=Object.values(n.entities??{}).find(t=>t.platform===A&&t.translation_key==="balance"),e=r?n.states[r.entity_id]:void 0;return!e||e.state==="unavailable"?null:{balance:Q(e.state),saved:Q(e.attributes.saved)??0,invested:Q(e.attributes.invested)??0,perYear:Q(e.attributes.per_year),entityId:r.entity_id}}function xe(n){return Object.values(n.entities??{}).some(e=>e.platform===A&&e.translation_key==="saving")?"integration_unavailable":"not_set_up"}var Xr=300*1e3,U=5*1e3,he,Ct,X=()=>he?.value;function j(){if(!he)return!0;let n=he.value&&!he.value.calculating?Xr:U;return Date.now()-he.at>n}function ee(n){return j()?(Ct??=n.callWS({type:`${A}/figures`}).then(r=>r).catch(()=>null).then(r=>(he={at:Date.now(),value:r},Ct=void 0,r)),Ct):Promise.resolve(he?.value??null)}var es=6e4,xr=new WeakMap;function ts(n){let r=n.entities??{},e=xr.get(r);return e||(e=Object.values(r).filter(t=>t.platform===A).map(t=>t.entity_id),xr.set(r,e)),e}var V=class extends T{constructor(){super(...arguments);this._lookedAt=0}_watched(){return[]}_changedFor(e,t){return e.locale!==t.locale||e.language!==t.language||e.config!==t.config||e.themes!==t.themes||e.selectedTheme!==t.selectedTheme||e.entities!==t.entities||[...ts(t),...this._watched()].some(s=>e.states[s]!==t.states[s])}shouldUpdate(e){let t=e.get("hass"),s=e.size===1&&t!==void 0&&this.hass!==void 0,i=Date.now()-this._lookedAt>=es;return s&&!i&&!this._changedFor(t,this.hass)?!1:(this._lookedAt=Date.now(),!0)}};var At={title:"Economics","category.pv":"PV plant","category.heat_pump":"Heat pump","category.wallbox":"Electric car",not_set_up:"Set up the Electricity Lens integration to see what your PV plant, heat pump, and electric car have saved.",integration_unavailable:"The figures aren't available right now. Check Electricity Lens under Settings > Devices & services.",calculating:"Being computed \u2026",loading:"Loading \u2026",column_area:"Area",column_per_year:"Per year",column_saving:"Saving",column_investment:"Investment",column_balance:"Net",total:"Total",average:"\xD8 {amount}",line_payback:"of {investment}",line_payback_left:"about {time} left",line_return:"Total {amount}",return_value:"{rate} % a year",months_one:"1 month",months_other:"{count} months",years_one:"1 year",years_other:"{count} years",savings_title:"Savings",savings_source:"Source",savings_energy:"Energy",savings_amount:"Amount",savings_total:"Total",savings_pv:"Solar power instead of grid power",savings_feed_in:"Feed-in",savings_gas:"Electricity instead of gas",savings_oil:"Electricity instead of oil",savings_fuel:"Electricity instead of fuel",savings_instead_gas:"A gas heating would have cost",savings_instead_oil:"An oil heating would have cost",savings_instead_fuel:"A combustion car would have cost",savings_electricity:"{name} electricity costs",savings_solar_part:"of which by solar power",meters_consumer:"Consumer",meters_electricity:"Electricity",history_title:"Savings over time",history_total:"Total",history_no_chart:"The chart is only shown in Home Assistant.",history_failed:"The statistics could not be loaded.",history_empty:"No savings in this period.",figures_failed:"The figures could not be loaded.",figures_not_loaded:"not loaded",figures_unavailable:"not available","figure.energy":"Consumption","figure.energy.grid":"Grid import","figure.energy.solar":"Solar production","figure.cost":"Costs","figure.cost.grid":"Grid costs","figure.bill":"Electricity bill","figure.grid_price":"Average grid price","figure.device_grid_price":"Average grid price","figure.price":"Average price","figure.solar_share":"Solar share","figure.solar_share.household":"Self-sufficiency","figure.cheap_share":"Grid cheap","figure.expensive_share":"Grid expensive","figure.cheap_saving":"Tariff saving","figure.self_consumption":"Self-consumption","figure.export":"Feed-in","figure.saving":"Saving","figure.payback":"Payback","figure.annual_return":"Return","figure.forecast_today":"Forecast today","figure.forecast_tomorrow":"Forecast tomorrow","figure.heat":"Heat","figure.alternative_cost":"Comparison costs","figure.scop":"Seasonal COP","figure.heat_price":"Heat price","figure.distance":"Distance","figure.cost_per_100km":"Costs per 100 km",line_saving_split:"of which {solar} by solar",line_bill:"{charge} standing charge",line_bill_no_charge:"feed-in \u2212{feed_in}",line_against_normal:"vs. normal price",line_from_electricity:"from {energy} electricity",line_heat_from:"{heat} from {energy}",line_charged:"with {energy} charged",line_solar_part:"{percent} of it solar power",line_energy_parts:"Grid {grid} + solar {solar}",line_exported:"{energy} fed in",line_average_price:"average {price}",line_for_import:"for {energy} imported",line_cost_for:"{cost} for {energy}",line_part_of:"{part} of {whole}","value.change":"total in the period","value.mean":"average","value.min":"minimum","value.max":"maximum",value_range:"from {min} to {max}","period.energy_date":"Follow the date selection","period.today":"Today","period.yesterday":"Yesterday","period.this_month":"This month","period.last_month":"Last month","period.this_year":"This year","period.last_year":"Last year","period.all":"All years",editor_title:"Title (optional)",editor_period:"Period",editor_period_hint:"Without a date selection on the dashboard: this month.",editor_period_hint_years:"Without a date selection on the dashboard: all years.",editor_source:"Source","source.energy":"Energy data","source.statistic":"Statistic","source.entity":"Entity",editor_area:"Area",editor_figure:"Figure",editor_statistic:"Statistic",editor_value:"Value",editor_secondary:"Line below","secondary.none":"Default","secondary.range":"Range of the period",editor_entity:"Entity",editor_name:"Name (optional)",editor_not_loaded:"Energy data need the Electricity Lens integration.","source.solar":"Solar power","source.grid":"Grid power","source.normal":"Grid normal","source.cheap":"Grid cheap","source.expensive":"Grid expensive","source.export":"Feed-in","source.standing_charge":"Standing charge","stack.source":"By source","stack.bill":"By bill item","stack.consumer":"By device","stack.none":"None",editor_savings:"Savings of all categories",editor_stack:"Split",editor_line:"Line",editor_lines:"Further lines",editor_line_none:"None",history_empty_figure:"No data in this period.",breakdown_mix:"Electricity mix",breakdown_cost_by_device:"Costs by device",breakdown_energy_by_device:"Consumption by device",breakdown_compared:"Compared {amount}",breakdown_compare_period:"compared period",breakdown_total:"Total","mix.solar":"Solar","mix.grid":"Grid","mix.normal":"Grid normal","mix.cheap":"Grid cheap","mix.expensive":"Grid expensive",editor_by:"Split","by.source":"By source","by.consumer":"By device",editor_display:"Display","display.ring":"Ring","display.bars":"Bars",editor_color_by_source:"Color the bars by source",editor_breakdown_source:"Data","breakdown_source.energy":"Energy data","breakdown_source.statistics":"Statistics",editor_statistics:"Statistics","figure_choice.energy":"Consumption","figure_choice.cost":"Costs","strategy.title":"Electricity","strategy.overview":"Now","strategy.electricity":"Consumption","strategy.forecast_today":"Solar forecast today","strategy.forecast_tomorrow":"Solar forecast tomorrow","strategy.cost_today":"Costs today","strategy.consumption_today":"Consumption today","strategy.payback_pv":"PV payback","strategy.payback_heat_pump":"HP payback","strategy.payback_wallbox":"Car payback","strategy.return_pv":"PV return","strategy.return_heat_pump":"HP return","strategy.return_wallbox":"Car return","strategy.charged_energy":"Charged energy","strategy.charging_cost":"Charging costs","strategy.bill":"Electricity bill","strategy.cost_with_solar":"Electricity costs incl. solar","strategy.cost_history":"Costs over time","strategy.cost_distribution":"Cost distribution","strategy.price_with_solar":"Average price incl. solar","strategy.costs":"Costs","strategy.heating":"Heating","strategy.charging":"Charging","strategy.usage_graph":"Consumption by source","strategy.solar_graph":"Solar production","strategy.devices_graph":"Consumption over time","strategy.distribution":"Power flow","strategy.not_loaded":"Set up the Electricity Lens integration to see this dashboard."},rs={title:"Wirtschaftlichkeit","category.pv":"PV-Anlage","category.heat_pump":"W\xE4rmepumpe","category.wallbox":"E-Auto",not_set_up:"Richte die Integration Electricity Lens ein, um zu sehen, was PV-Anlage, W\xE4rmepumpe und E-Auto gespart haben.",integration_unavailable:"Die Zahlen sind gerade nicht verf\xFCgbar. Pr\xFCfe Electricity Lens unter Einstellungen > Ger\xE4te & Dienste.",calculating:"Wird berechnet \u2026",loading:"Wird geladen \u2026",column_area:"Bereich",column_per_year:"Pro Jahr",column_saving:"Ersparnis",column_investment:"Investition",column_balance:"Saldo",total:"Summe",average:"\xD8 {amount}",line_payback:"von {investment}",line_payback_left:"noch etwa {time}",line_return:"Gesamt {amount}",return_value:"{rate} % p. a.",months_one:"1 Monat",months_other:"{count} Monate",years_one:"1 Jahr",years_other:"{count} Jahre",savings_title:"Ersparnis",savings_source:"Quelle",savings_energy:"Energie",savings_amount:"Betrag",savings_total:"Gesamt",savings_pv:"PV-Strom statt Netzstrom",savings_feed_in:"Einspeisung",savings_gas:"Strom statt Gas",savings_oil:"Strom statt \xD6l",savings_fuel:"Strom statt Sprit",savings_instead_gas:"Gasheizung h\xE4tte gekostet",savings_instead_oil:"\xD6lheizung h\xE4tte gekostet",savings_instead_fuel:"Verbrenner h\xE4tte gekostet",savings_electricity:"Stromkosten {name}",savings_solar_part:"davon durch PV",meters_consumer:"Verbraucher",meters_electricity:"Strom",history_title:"Ersparnisverlauf",history_total:"Summe",history_no_chart:"Das Diagramm erscheint nur in Home Assistant.",history_failed:"Die Statistik konnte nicht geladen werden.",history_empty:"Keine Ersparnis in diesem Zeitraum.",figures_failed:"Die Kennzahlen konnten nicht geladen werden.",figures_not_loaded:"nicht geladen",figures_unavailable:"nicht verf\xFCgbar","figure.energy":"Verbrauch","figure.energy.grid":"Netzbezug","figure.energy.solar":"PV-Erzeugung","figure.cost":"Kosten","figure.cost.grid":"Netzkosten","figure.bill":"Stromrechnung","figure.grid_price":"\xD8 Netzpreis","figure.device_grid_price":"\xD8 Netzpreis","figure.price":"\xD8 Strompreis","figure.solar_share":"PV-Anteil","figure.solar_share.household":"Autarkie","figure.cheap_share":"Netz g\xFCnstig","figure.expensive_share":"Netz teuer","figure.cheap_saving":"Tarifersparnis","figure.self_consumption":"Eigenverbrauch","figure.export":"Einspeisung","figure.saving":"Ersparnis","figure.payback":"Amortisation","figure.annual_return":"Rendite","figure.forecast_today":"Prognose heute","figure.forecast_tomorrow":"Prognose morgen","figure.heat":"W\xE4rme","figure.alternative_cost":"Vergleichskosten","figure.scop":"JAZ","figure.heat_price":"W\xE4rmepreis","figure.distance":"Strecke","figure.cost_per_100km":"Kosten pro 100 km",line_saving_split:"davon {solar} durch PV",line_bill:"inkl. {charge} Grundpreis",line_bill_no_charge:"Einspeisung \u2212{feed_in}",line_against_normal:"zum Normalpreis",line_from_electricity:"aus {energy} Strom",line_heat_from:"{heat} aus {energy}",line_charged:"mit {energy} geladen",line_solar_part:"davon {percent} PV-Strom",line_energy_parts:"Netz {grid} + PV {solar}",line_exported:"{energy} eingespeist",line_average_price:"\xD8 {price}",line_for_import:"f\xFCr {energy} Netzbezug",line_cost_for:"{cost} f\xFCr {energy}",line_part_of:"{part} von {whole}","value.change":"Summe im Zeitraum","value.mean":"Mittelwert","value.min":"Minimum","value.max":"Maximum",value_range:"von {min} bis {max}","period.energy_date":"Der Datumsauswahl folgen","period.today":"Heute","period.yesterday":"Gestern","period.this_month":"Dieser Monat","period.last_month":"Letzter Monat","period.this_year":"Dieses Jahr","period.last_year":"Letztes Jahr","period.all":"Alle Jahre",editor_title:"Titel (optional)",editor_period:"Zeitraum",editor_period_hint:"Ohne Datumsauswahl auf dem Dashboard: dieser Monat.",editor_period_hint_years:"Ohne Datumsauswahl auf dem Dashboard: alle Jahre.",editor_source:"Quelle","source.energy":"Energiedaten","source.statistic":"Statistik","source.entity":"Entit\xE4t",editor_area:"Bereich",editor_figure:"Gr\xF6\xDFe",editor_statistic:"Statistik",editor_value:"Wert",editor_secondary:"Unterzeile","secondary.none":"Standard","secondary.range":"Spanne im Zeitraum",editor_entity:"Entit\xE4t",editor_name:"Name (optional)",editor_not_loaded:"Energiedaten brauchen die Integration Electricity Lens.","source.solar":"PV-Strom","source.grid":"Netzstrom","source.normal":"Netz normal","source.cheap":"Netz g\xFCnstig","source.expensive":"Netz teuer","source.export":"Einspeisung","source.standing_charge":"Grundpreis","stack.source":"Nach Quelle","stack.bill":"Nach Rechnungsposten","stack.consumer":"Nach Ger\xE4t","stack.none":"Keine",editor_savings:"Ersparnisse aller Kategorien",editor_stack:"Aufteilen",editor_line:"Linie",editor_lines:"Weitere Linien",editor_line_none:"Keine",history_empty_figure:"Keine Daten in diesem Zeitraum.",breakdown_mix:"Strommix",breakdown_cost_by_device:"Kosten nach Ger\xE4t",breakdown_energy_by_device:"Verbrauch nach Ger\xE4t",breakdown_compared:"Vergleich {amount}",breakdown_compare_period:"Vergleichszeitraum",breakdown_total:"Gesamt","mix.solar":"PV","mix.grid":"Netz","mix.normal":"Netz normal","mix.cheap":"Netz g\xFCnstig","mix.expensive":"Netz teuer",editor_by:"Aufteilen","by.source":"Nach Quelle","by.consumer":"Nach Ger\xE4t",editor_display:"Darstellung","display.ring":"Ring","display.bars":"Balken",editor_color_by_source:"Balken nach Quelle f\xE4rben",editor_breakdown_source:"Daten","breakdown_source.energy":"Energiedaten","breakdown_source.statistics":"Statistiken",editor_statistics:"Statistiken","figure_choice.energy":"Verbrauch","figure_choice.cost":"Kosten","strategy.title":"Strom","strategy.overview":"Jetzt","strategy.electricity":"Verbrauch","strategy.forecast_today":"PV-Prognose heute","strategy.forecast_tomorrow":"PV-Prognose morgen","strategy.cost_today":"Kosten heute","strategy.consumption_today":"Verbrauch heute","strategy.payback_pv":"PV-Amortisation","strategy.payback_heat_pump":"WP-Amortisation","strategy.payback_wallbox":"Auto-Amortisation","strategy.return_pv":"PV-Rendite","strategy.return_heat_pump":"WP-Rendite","strategy.return_wallbox":"Auto-Rendite","strategy.charged_energy":"Geladene Energie","strategy.charging_cost":"Ladekosten","strategy.bill":"Stromrechnung","strategy.cost_with_solar":"Stromkosten inkl. PV","strategy.cost_history":"Kostenverlauf","strategy.cost_distribution":"Kostenverteilung","strategy.price_with_solar":"\xD8 Preis inkl. PV","strategy.costs":"Kosten","strategy.heating":"Heizen","strategy.charging":"Laden","strategy.usage_graph":"Verbrauch nach Quelle","strategy.solar_graph":"PV-Erzeugung","strategy.devices_graph":"Verbrauchsverlauf","strategy.distribution":"Stromfluss","strategy.not_loaded":"Richte die Integration Electricity Lens ein, um dieses Dashboard zu sehen."},ss={en:At,de:rs},Y=n=>n in At;function R(n){let r=ss[n.split("-")[0]]??At;return(e,t={})=>r[e].replace(/\{(\w+)\}/g,(s,i)=>t[i]??"")}var M=C`
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
`;var te=["energy_date","today","yesterday","this_month","last_month","this_year","last_year"];function B(n,r,e){let t=`figure.${r}.${e.kind}`,s=n(Y(t)?t:`figure.${r}`);return["device","other","category"].includes(e.kind)?`${e.name} ${s}`:s}var is=300*1e3,Rt=n=>n.toDateString();function ns(n){let r=new Date,e=Rt(r),t=Rt(new Date(r.getFullYear(),r.getMonth(),r.getDate()+1)),s={today:null,tomorrow:null};for(let i of Object.values(n??{}))for(let[a,l]of Object.entries(i.wh_hours??{})){let o=Rt(new Date(a));o===e&&(s.today=(s.today??0)+l/1e3),o===t&&(s.tomorrow=(s.tomorrow??0)+l/1e3)}return s}var we=class extends V{constructor(){super(...arguments);this._infoLoading=!1}static getStubConfig(){return{period:"energy_date",area:"household",figure:"cost"}}static getConfigElement(){return document.createElement("electricity-lens-figures-card-editor")}setConfig(e){O(e?.collection_key),this._config=e}getCardSize(){return 2}getGridOptions(){return{columns:6,min_columns:6}}connectedCallback(){super.connectedCallback(),this._follow()}disconnectedCallback(){super.disconnectedCallback(),this._unfollow?.(),this._unfollow=void 0,clearTimeout(this._retryTimer),this._retryTimer=void 0}_watched(){return[this._config?.entity,this._config?.statistic].filter(e=>e!==void 0)}get _localize(){return R(this.hass?.locale?.language??this.hass?.language??"en")}get _language(){return this.hass?.locale?.language??"en"}get _period(){return this._config?.period??"energy_date"}get _hasPeriod(){let{figure:e}=this._config??{};return!!this._config&&H(this._config)!=="entity"&&!(e&&(ue(e)||de(e)))}_follow(){this._period!=="energy_date"||!this._hasPeriod||this._unfollow||!this.isConnected||!this.hass?.connection||(this._unfollow=fe(this.hass.connection,this._config?.collection_key,e=>{this._selected=e}))}_range(){let e=this._period;if(!this._hasPeriod)return N("today");if(e!=="energy_date")return N(e);if(this._selected!==void 0)return this._selected??N("this_month")}_area(e){return this._info?.areas.find(t=>t.id===e)}_figure(e){let t=this._area(e.area);if(!(!t||!e.figure||!J(t).includes(e.figure)))return{area:t,figure:e.figure}}async _loadInfo(){!this.hass||this._infoLoading||(this._infoLoading=!0,this._info=await ee(this.hass),this._infoLoading=!1,clearTimeout(this._retryTimer),this._retryTimer=void 0,this.isConnected&&(!this._info||this._info.calculating)&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),U)))}_request(){let e=this._range(),t=this._config;if(!e||!t)return;let s=H(t);if(s==="entity"||t.figure&&de(t.figure)||s==="energy"&&!this._info)return;let i=new Set,a=new Set,l=!1;if(s==="statistic"&&t.statistic)i.add(t.statistic),a.add(t.statistic);else if(s==="energy"){let c=this._figure(t);c&&(l=ue(c.figure),this._info?.calculating||pr(c.area,c.figure).forEach(h=>i.add(h)))}let o=[...i].sort();return{key:JSON.stringify([o,e.start,e.end,l]),range:e,ids:o,statistics:[...a].sort(),forecast:l}}async _load(e){if(!this.hass)return;this._loading=e.key;let t=ve(Z(e.range)),s={key:e.key,at:Date.now(),range:e.range,period:t,rows:{},metadata:{},forecast:{today:null,tomorrow:null},failed:!1};try{let[i,a,l]=await Promise.all([e.ids.length?this.hass.callWS({type:"recorder/statistics_during_period",start_time:new Date(e.range.start).toISOString(),end_time:new Date(e.range.end+1).toISOString(),statistic_ids:e.ids,period:t,types:e.statistics.length?["change","mean","min","max"]:["change"],units:{energy:"kWh"}}):Promise.resolve({}),e.statistics.length?this.hass.callWS({type:"recorder/get_statistics_metadata",statistic_ids:e.statistics}):Promise.resolve([]),e.forecast?this.hass.callWS({type:"energy/solar_forecast"}):Promise.resolve({})]);s.rows=i,s.metadata=Object.fromEntries(a.map(o=>[o.statistic_id,o])),s.forecast=ns(l)}catch{s.failed=!0}this._loading===e.key&&(this._loading=void 0,this._loaded=s)}willUpdate(e){if(!this.hass)return;(e.has("hass")||e.has("_config"))&&this._follow(),this._info===void 0&&(this._info=X()),j()&&!this._infoLoading?this._loadInfo():this.isConnected&&this._info?.calculating&&!this._retryTimer&&!this._infoLoading&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),U));let t=this._request(),s=!this._loaded||Date.now()-this._loaded.at>is;t&&t.key!==this._loading&&(t.key!==this._loaded?.key||s&&!this._loading)&&this._load(t)}get _fmt(){return _e(this.hass?.locale,this.hass?.config.currency??"EUR")}_number(e,t){return this._fmt.number(e,t)}_format(e,t){return this._fmt.value(e,t)}_rows(e){let t=this._loaded;if(!t)return[];let s=t.period==="hour"?0:12*36e5;return(t.rows[e]??[]).filter(i=>{let a=(typeof i.start=="number"?i.start:Date.parse(i.start))+s;return a>=t.range.start&&a<=t.range.end})}_sum(e){let t=0;for(let s of e??[])for(let i of this._rows(s))t+=i.change??0;return t}_energyCard(e){let t=this._localize,s=this._figure(e);if(!s){let u=`figure.${e.figure??""}`,g=e.name??(Y(u)?t(u):e.figure??"");return this._info===void 0?this._card(g,"\u2026"):this._card(g,"\u2013",t("figures_unavailable"))}let{area:i,figure:a}=s,l=e.name??B(this._localize,a,i);if(de(a))return this._investmentCard(l,a,i);if(this._info?.calculating&&!ue(a))return this._card(l,"\u2026",t("calculating"));if(!this._loaded)return this._card(l,"\u2026");if(this._loaded.failed)return this._card(l,"\u2013",t("figures_not_loaded"));let o=a==="forecast_today"?this._loaded.forecast.today:a==="forecast_tomorrow"?this._loaded.forecast.tomorrow:null,c=ye(a,i,u=>i.statistics[u]?this._sum(i.statistics[u]):null,o),h=c.line?t(c.line.key,Object.fromEntries(Object.entries(c.line.values).map(([u,g])=>[u,this._format(g.value,g.unit)]))):void 0;return this._card(l,c.value===null?"\u2013":this._format(c.value,c.unit),e.secondary==="none"?void 0:h)}_statisticCard(e){let t=this._localize,s=e.statistic??"",i=this._loaded?.metadata[s],a=e.name??i?.name??this.hass?.states[s]?.attributes.friendly_name;if(!this._loaded)return this._card(a??"\xA0","\u2026");let l=a??s,o=this._rows(s),c=i?.unit_class==="energy"?"kWh":i?.statistics_unit_of_measurement??"",h=f=>f===null?"\u2013":`${this._number(f)}${c?` ${c}`:""}`,u=f=>o.map(v=>v[f]).filter(v=>typeof v=="number"),g=e.value??"change",d=null;if(g==="change")d=o.length?o.reduce((f,v)=>f+(v.change??0),0):null;else if(g==="mean"){let f=u("mean");d=f.length?f.reduce((v,b)=>v+b,0)/f.length:null}else{let f=u(g);d=f.length?g==="min"?Math.min(...f):Math.max(...f):null}let p=g==="change"?void 0:t(`value.${g}`);if(e.secondary==="range"){let f=u("min"),v=u("max");f.length&&v.length&&(p=t("value_range",{min:h(Math.min(...f)),max:h(Math.max(...v))}))}return this._loaded.failed?this._card(l,"\u2013",t("figures_not_loaded")):this._card(l,h(d),e.secondary==="none"?void 0:p)}_entityCard(e){let t=this._localize,s=this.hass?.states[e.entity??""],i=e.name??s?.attributes.friendly_name??e.entity??"";if(!s)return this._card(i,"\u2013",t("figures_unavailable"));let a=Number(s.state),l=this.hass?.config.currency??"",o=s.attributes.unit_of_measurement?.replace(l,l?this._fmt.currencySymbol():""),c=s.state!==""&&Number.isFinite(a),h=this._fmt.currencySymbol(),u=c?o&&o===h?this._format(a,"money"):`${this._number(a)}${o?` ${o}`:""}`:["unknown","unavailable",""].includes(s.state)?"\u2013":s.state;return this._card(i,u,void 0,e.entity)}_investmentCard(e,t,s){let i=this._localize,a=ct(this.hass).find(u=>He(u.category)===s.id),l=t==="payback"?a?.payback:a?.annualReturn,o=l?this.hass?.states[l]:void 0,c=Number(o?.state);if(!o||!Number.isFinite(c))return this._card(e,"\u2013",void 0,l);if(t==="payback"){let u=c<100?Math.floor(c):c;return this._card(e,this._format(u,"percent"),this._paybackLine(o.attributes),l)}let h=I(this.hass?.locale,{minimumFractionDigits:1,maximumFractionDigits:1}).format(c);return this._card(e,i("return_value",{rate:h}),this._returnLine(o.attributes),l)}_paybackLine(e){let t=this._localize;if(typeof e.investment!="number")return;let s=this._format(e.investment,"money");if(typeof e.years_left!="number")return t("line_payback",{investment:s});let i=e.years_left,a=Math.max(1,Math.round(i<1?i*12:i)),l=i<1?t(a===1?"months_one":"months_other",{count:String(a)}):t(a===1?"years_one":"years_other",{count:String(a)});return t("line_payback_left",{time:l})}_returnLine(e){let{surplus:t}=e;if(typeof t=="number")return this._localize("line_return",{amount:I(this.hass?.locale,{style:"currency",currency:this.hass?.config.currency??"EUR",maximumFractionDigits:0,signDisplay:"exceptZero"}).format(t)})}_card(e,t,s,i){let[a,l]=gr(t),o=()=>{this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:i},bubbles:!0,composed:!0}))},c=h=>{h.key!=="Enter"&&h.key!==" "||(h.preventDefault(),o())};return m`<ha-card
      lang=${this._language}
      class=${i?"clickable":""}
      role=${i?"button":y}
      tabindex=${i?"0":y}
      @click=${i?o:y}
      @keydown=${i?c:y}
    >
      <div class="header"><h2 class="title" title=${e}>${e}</h2></div>
      <div class="stat">
        <div class="value">
          <span class="number" title=${t}>${a}</span>${l?m`<span class="unit">${l}</span>`:y}
        </div>
        ${s?m`<div class="line" title=${s}>${s}</div>`:y}
      </div>
    </ha-card>`}render(){if(!this.hass||!this._config)return m``;let e=H(this._config);return e==="statistic"?this._statisticCard(this._config):e==="entity"?this._entityCard(this._config):this._energyCard(this._config)}};we.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0},_selected:{state:!0},_loaded:{state:!0}},we.styles=[M,C`
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
    `];var as=["energy","cost","saving","export","heat","distance","alternative_cost"],os=["price","grid_price","solar_share","cheap_share","expensive_share","self_consumption","scop","heat_price","cost_per_100km"],Ne=n=>as.filter(r=>J(n).includes(r)),Et=n=>os.filter(r=>J(n).includes(r)||r==="grid_price"&&n.kind==="household");function $e(n,r){let e=[];return r==="energy"&&n.statistics.solar?.length&&e.push("source"),n.kind==="household"&&(r==="energy"||r==="cost")&&e.push("consumer"),n.kind==="household"&&r==="cost"&&e.push("source","bill"),n.kind==="category"&&(n.statistics.energy?.length??0)>1&&(r==="energy"||r==="cost"||(r==="heat"||r==="saving")&&(n.statistics.heat_meters?.length??0)>1)&&e.push("consumer"),e.push("none"),n.kind==="category"&&r==="cost"&&n.statistics.solar_cost?.length&&e.push("source"),e}function wr(n,r){let e=n.statistics[r]??[];return{plus:r==="saving"?[...e,...n.statistics.solar_saving??[]]:e,minus:[]}}function lt(n){let r=new Set(n.areas.find(t=>t.id==="heat_pump")?.statistics.energy??[]),e=n.areas.filter(t=>t.kind==="device"&&t.statistics.heat?.length&&t.statistics.energy?.some(s=>r.has(s)));return e.length>1?e:[]}function cs(n,r,e){let t=n.areas.find(o=>o.kind==="grid")?.statistics??{},s=t.import_cost??[],i=r.statistics.cheap_cost??[],a=r.statistics.expensive_cost??[],l=[{id:"standing_charge",name:{key:"source.standing_charge"},color:e.standing,plus:t.standing_charge??[],minus:[]}];return i.length&&l.push({id:"cheap",name:{key:"source.cheap"},color:e.cheap,plus:i,minus:[]}),l.push({id:"grid",name:{key:i.length||a.length?"source.normal":"source.grid"},color:e.grid,plus:s,minus:[...i,...a],floor:!0}),a.length&&l.push({id:"expensive",name:{key:"source.expensive"},color:e.expensive,plus:a,minus:[]}),l}function ls(n,r,e){let t=o=>r.statistics[o]??[],s=t("cheap_cost"),i=t("expensive_cost"),a=[{id:"solar",name:{key:"source.solar"},color:e.solar,plus:t("solar_cost"),minus:[]}];s.length&&a.push({id:"cheap",name:{key:"source.cheap"},color:e.cheap,plus:s,minus:[]}),a.push({id:"grid",name:{key:s.length||i.length?"source.normal":"source.grid"},color:e.grid,plus:t("cost"),minus:[...t("solar_cost"),...s,...i],floor:!0}),i.length&&a.push({id:"expensive",name:{key:"source.expensive"},color:e.expensive,plus:i,minus:[]});let l=n.areas.find(o=>o.kind==="grid")?.statistics.feed_in??[];return r.kind==="household"&&l.length&&a.push({id:"export",name:{key:"source.export"},color:e.export,plus:l,minus:[],negative:!0}),a}function ut(n,r,e,t,s){let i=o=>r.statistics[o]??[],a=D(n,s);if(t==="bill"&&e==="cost")return cs(n,r,s);if(t==="source"&&e==="cost")return ls(n,r,s);if(t==="source"&&e==="energy"){let o=[{id:"solar",name:{key:"source.solar"},color:s.solar,plus:i("solar"),minus:[]}],c=["cheap","expensive"].filter(u=>i(u).length);i("cheap").length&&o.push({id:"cheap",name:{key:"source.cheap"},color:s.cheap,plus:i("cheap"),minus:[]}),o.push({id:"grid",name:{key:c.length?"source.normal":"source.grid"},color:s.grid,plus:i("energy"),minus:[...i("solar"),...c.flatMap(i)],floor:!0}),i("expensive").length&&o.push({id:"expensive",name:{key:"source.expensive"},color:s.expensive,plus:i("expensive"),minus:[]});let h=n.areas.find(u=>u.kind==="grid")?.statistics.export??[];return r.kind==="household"&&h.length&&o.push({id:"export",name:{key:"source.export"},color:s.export,plus:h,minus:[],negative:!0}),o}if(t==="consumer"){if(r.kind==="category"){let c=new Set(r.statistics.energy??[]);return n.areas.filter(h=>h.kind==="device"&&h.statistics.energy?.some(u=>c.has(u))).map(h=>({id:h.id,name:{text:h.name},color:a.get(h.id)??s.other,...wr(h,e)}))}let o=new Set(n.areas.filter(c=>c.kind==="category").flatMap(c=>c.statistics.energy??[]));return n.areas.filter(c=>c.kind==="category"&&(c.statistics.energy?.length??0)>0||c.kind==="device"&&c.top_level!==!1&&!c.statistics.energy?.some(h=>o.has(h))||c.kind==="other").map(c=>({id:c.id,name:{text:c.name},color:a.get(c.id)??s.other,plus:c.statistics[e]??[],minus:[]}))}let l=e==="export"?s.export:r.kind==="solar"?s.solar:a.get(r.id)??(e==="heat"?s.heat:e==="distance"?s.car:s.grid);return[{id:e,name:{text:r.name},color:l,...wr(r,e)}]}var us=36e5;async function Tt(n,r,e){if(!r.length)return{};let t=ve(Z(e)),s=await n.callWS({type:"recorder/statistics_during_period",start_time:new Date(e.start).toISOString(),end_time:new Date(e.end+1).toISOString(),statistic_ids:r,period:t,types:["change"],units:{energy:"kWh"}}),i=t==="hour"?0:12*us,a={};for(let l of r){a[l]=0;for(let o of s[l]??[]){let c=(typeof o.start=="number"?o.start:Date.parse(o.start))+i;c>=e.start&&c<=e.end&&(a[l]+=o.change??0)}}return a}var ds=300*1e3,z=(n,r)=>(r??[]).reduce((e,t)=>e+(n[t]??0),0),W=class extends V{constructor(){super(...arguments);this._infoLoading=!1}_period(){return"energy_date"}_showsCompare(){return!1}_needsInfo(){return!0}_described(){return[]}getCardSize(){return 4}getGridOptions(){return{columns:12,min_columns:6}}connectedCallback(){super.connectedCallback(),this._follow()}disconnectedCallback(){super.disconnectedCallback(),this._unfollow?.(),this._unfollow=void 0,clearTimeout(this._retryTimer),this._retryTimer=void 0}get _localize(){return R(this.hass?.locale?.language??this.hass?.language??"en")}get _fmt(){return _e(this.hass?.locale,this.hass?.config.currency??"EUR")}_follow(){this._period()==="energy_date"&&(this._unfollow||!this.isConnected||!this.hass?.connection||(this._unfollow=fe(this.hass.connection,this._collectionKey,(e,t)=>{this._selected=e,this._compare=t})))}_range(){let e=this._period();if(e!=="energy_date")return N(e);if(this._selected!==void 0)return this._selected??N("this_month")}async _loadInfo(){!this.hass||this._infoLoading||(this._infoLoading=!0,this._info=await ee(this.hass),this._infoLoading=!1,clearTimeout(this._retryTimer),this._retryTimer=void 0,this.isConnected&&(!this._info||this._info.calculating)&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),U)))}async _load(e,t,s,i,a){if(!this.hass)return;let l=this.hass;this._loading=e;let o={key:e,at:0,values:null,metadata:{}};try{let[c,h,u]=await Promise.all([Tt(l,t,s),i?Tt(l,t,i):Promise.resolve(void 0),a.length?l.callWS({type:"recorder/get_statistics_metadata",statistic_ids:a}):Promise.resolve([])]);o.values=c,o.compare=h,o.metadata=Object.fromEntries(u.map(g=>[g.statistic_id,g]))}catch{}this._loading===e&&(this._loading=void 0,this._sums={...o,at:Date.now()})}willUpdate(e){if(!this.hass||(this._follow(),this._info===void 0&&(this._info=X()),j()&&!this._infoLoading&&this._loadInfo(),this._needsInfo()&&(this.isConnected&&this._info?.calculating&&!this._retryTimer&&!this._infoLoading&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),U)),!this._info||this._info.calculating)))return;let t=this._range();if(!t)return;let s=this._showsCompare()&&this._period()==="energy_date"?this._compare:void 0,i=[...new Set(this._ids())].sort();if(!i.length)return;let a=[...new Set(this._described())].sort(),l=JSON.stringify([i,t.start,t.end,s?.start,s?.end,a]),o=!this._sums||Date.now()-this._sums.at>ds;l!==this._loading&&(l!==this._sums?.key||o&&!this._loading)&&this._load(l,i,t,s,a)}_waiting(){if(!this.hass)return;let e=L(this.hass);return e.length?e.some(t=>t.calculating)||this._info?.calculating?"calculating":this._info===null?"editor_not_loaded":this._info===void 0?"loading":this._ids().length?this._sums?this._sums.values?void 0:"history_failed":"loading":"figures_unavailable":xe(this.hass)}};W.properties={hass:{attribute:!1},_info:{state:!0},_selected:{state:!0},_compare:{state:!0},_sums:{state:!0}};var dt=C`
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
`;var hs="240px",gs="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z",ps="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z",Se=class extends W{constructor(){super(...arguments);this._config={type:""};this._watchingChart=!1;this._hidden=new Set}static getStubConfig(){return{area:"household",by:"source",figure:"energy",display:"ring"}}static getConfigElement(){return document.createElement("electricity-lens-breakdown-card-editor")}setConfig(e){if(e?.statistics!==void 0&&!Array.isArray(e.statistics))throw new Error("statistics must be a list");O(e?.collection_key),this._config=e??{type:""},this._collectionKey=this._config.collection_key}getGridOptions(){return{columns:6,min_columns:4}}get _byStatistics(){return!!this._config.statistics?.length}_period(){return this._config.period??"energy_date"}_showsCompare(){return!0}_needsInfo(){return!this._byStatistics}_described(){return this._byStatistics?(this._config.statistics??[]).map(e=>e.statistic):[]}_area(){return this._info?.areas.find(e=>e.id===(this._config.area??"household"))}get _by(){let e=this._area();return this._config.by==="consumer"&&(e?.kind==="household"||e?.kind==="category"&&(e.statistics.energy?.length??0)>1)?"consumer":e?.statistics.solar?.length?"source":"consumer"}get _figure(){return this._by==="consumer"&&this._config.figure==="cost"?"cost":"energy"}_series(){let e=this._info,t=this._area();return!e||!t?[]:ut(e,t,this._figure,this._by==="source"?"source":"consumer",P(this)).filter(s=>!s.negative)}_ids(){let e=new Set;if(this._byStatistics)this._config.statistics?.forEach(t=>e.add(t.statistic));else{for(let t of this._series())[...t.plus,...t.minus].forEach(s=>e.add(s));if(this._by==="consumer"&&this._info)for(let t of this._series()){let s=this._info.areas.find(i=>i.id===t.id);for(let i of["energy","solar","cheap","expensive","cost","solar_cost","cheap_cost","expensive_cost"])(s?.statistics[i]??[]).forEach(a=>e.add(a))}}return[...e].sort()}willUpdate(){super.willUpdate(),this.hass&&!this._watchingChart&&(this._watchingChart=!0,at(e=>{this._hasChart=e}))}_sum(e,t=!1){let s=(t?this._sums?.compare:this._sums?.values)??{};return e.reduce((i,a)=>i+(s[a]??0),0)}get _compared(){return this._sums?.compare!==void 0}_entityOf(e){return e?.length===1&&this.hass?.states[e[0]]?e[0]:void 0}get _unit(){return this._byStatistics?(this._config.statistics??[]).map(t=>{let s=this._sums?.metadata[t.statistic];return s?.unit_class==="energy"?"kWh":s?.statistics_unit_of_measurement??""})[0]:void 0}_parts(){let e=this._localize;if(this._byStatistics){let s=P(this),i=this._info?D(this._info,s):new Map;return(this._config.statistics??[]).map((a,l)=>{let o=this._info?.areas.find(c=>c.kind==="device"&&(c.statistics.energy?.[0]===a.statistic||c.statistics.heat?.[0]===a.statistic));return{id:a.statistic,name:a.name??o?.name??(this._sums?.metadata[a.statistic]?.name||this.hass?.states[a.statistic]?.attributes.friendly_name||a.statistic),color:(o&&i.get(o.id))??s.consumers[l%s.consumers.length],value:this._sum([a.statistic]),compare:this._compared?this._sum([a.statistic],!0):void 0,entity:this._entityOf([a.statistic])}})}let t=this._series().map(s=>{let i=this._sum(s.plus)-this._sum(s.minus),a=this._sum(s.plus,!0)-this._sum(s.minus,!0),l=s.name.key?.replace(/^source\./,"mix."),o=s.name.text??(l&&Y(l)?e(l):s.name.key&&Y(s.name.key)?e(s.name.key):s.id),c=u=>s.floor?Math.max(u,0):u,h={id:s.id,name:o,color:s.color,value:c(i),compare:this._compared?c(a):void 0};if(this._by==="consumer"&&this._info){let u=P(this),g=this._info.areas.find(d=>d.id===s.id);if(g){h.entity=this._entityOf(g.statistics.energy);let d=S=>this._sum(g.statistics[S]??[]),p=d("energy"),f=d("solar"),v=d("cheap"),b=d("expensive");h.energy=p;let _=this._figure==="cost",x={solar:_?d("solar_cost"):f,cheap:_?d("cheap_cost"):v,expensive:_?d("expensive_cost"):b};h.mix=[{color:u.solar,value:x.solar},{color:u.cheap,value:x.cheap},{color:u.grid,value:Math.max((_?d("cost"):p)-x.solar-x.cheap-x.expensive,0)},{color:u.expensive,value:x.expensive}]}}return h});return this._by==="consumer"?t.sort((s,i)=>i.value-s.value):t}_value(e){let t=this._unit;return t!==void 0&&t!=="kWh"?t?`${this._fmt.number(e)} ${t}`:this._fmt.number(e):this._figure==="cost"&&!this._byStatistics?this._fmt.value(e,"money"):this._fmt.value(e,"energy")}_open(e){e&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:e},bubbles:!0,composed:!0}))}_title(){let e=this._localize;return this._config.title?this._config.title:this._byStatistics?"":(this._area()?this._by:this._config.by??"source")==="source"?e("breakdown_mix"):e(this._figure==="cost"?"breakdown_cost_by_device":"breakdown_energy_by_device")}_ring(e){let t=this._localize;if(this._hasChart===void 0)return m`<p class="summary">${t("loading")}</p>`;if(!this._hasChart)return m`<p class="summary">${t("history_no_chart")}</p>`;let s=this._figure==="cost"&&!this._byStatistics,i=P(this).line,a=getComputedStyle(this).getPropertyValue("--primary-text-color").trim()||"#212121",l=JSON.stringify([e,[...this._hidden],s,i,a,this.hass?.locale]);this._ringChart?.key!==l&&(this._ringChart={key:l,chart:lr({items:e,total:t("breakdown_total"),format:u=>this._value(u),percent:u=>this._fmt.value(u,"percent"),compare:this._compared?e.map(u=>u.compare??0):void 0,compared:t("breakdown_compare_period"),centerColor:i,labelColor:a,hidden:this._hidden})});let{chart:o}=this._ringChart,c=nt(e.map(u=>this._hidden.has(u.id)?0:u.value)),h=u=>{let g=new Set(this._hidden);g.has(u)?g.delete(u):g.add(u),this._hidden=g};return m`<div class="ring">
      ${tr(`${s}-${this._compared}`,m`<ha-chart-base
          .hass=${this.hass}
          .data=${o.data}
          .options=${o.options}
          .height=${hs}
        ></ha-chart-base>`)}
      <div class="chart-legend">
        <ul>
          ${e.map((u,g)=>{let d=this._hidden.has(u.id),p=this._fmt.value(c[g],"percent");return m`<li class=${d?"hidden":""}>
              <button
                type="button"
                class="leg"
                aria-pressed=${String(!d)}
                aria-label="${u.name}: ${p}"
                @click=${()=>h(u.id)}
              >
                <svg class="icon" viewBox="0 0 24 24" style="color: ${d?"var(--secondary-text-color)":u.color}">
                  <path fill="currentColor" d=${d?ps:gs}></path>
                </svg>
                <span class="label">${u.name}</span>
                <span class="value">${p}</span>
              </button>
            </li>`})}
        </ul>
      </div>
    </div>`}_bars(e){let t=this._value(0),s=e.filter(c=>this._value(c.value)!==t||c.compare!==void 0&&this._value(c.compare)!==t),i=Math.max(...s.map(c=>Math.max(c.value,c.compare??0)),0),a=c=>i>0?Math.max(c/i*100,0):0,l=this._config.color_by_source===!0&&this._by==="consumer",o=this._localize;return m`<div class="bars">
      ${s.map(c=>{let h=a(c.value),u=c.mix?.reduce((p,f)=>p+f.value,0)??0,g="";if(this._figure==="cost"&&c.energy!==void 0&&(g=this._fmt.value(c.energy,"energy"),c.energy>0&&(g+=` \xB7 ${o("line_average_price",{price:this._fmt.value(c.value/c.energy,"price")})}`)),c.compare!==void 0){let p=o("breakdown_compared",{amount:this._value(c.compare)});g=g?`${g} \xB7 ${p}`:p}let d=c.entity?{role:"button",tabindex:"0",click:()=>this._open(c.entity),key:p=>{p.key!=="Enter"&&p.key!==" "||(p.preventDefault(),this._open(c.entity))}}:void 0;return m`<div
          class="bar-row ${d?"clickable":""}"
          role=${d?.role??y}
          tabindex=${d?.tabindex??y}
          @click=${d?.click}
          @keydown=${d?.key}
        >
          <div class="bar-text">
            <span class="name">${c.name}</span>
            <span class="amount">${this._value(c.value)}</span>
          </div>
          ${g?m`<div class="bar-line">${g}</div>`:y}
          <div class="track">
            <div class="fill" style="width: ${h}%; ${l?"":`--c: ${c.color}`}">
              ${l&&c.mix&&u>0?c.mix.map(p=>m`<span style="width: ${p.value/u*100}%; --c: ${p.color}"></span>`):y}
            </div>
          </div>
          ${c.compare!==void 0?m`<div class="track compare">
                <div class="fill" style="width: ${a(c.compare)}%; --c: ${c.color}"></div>
              </div>`:y}
        </div>`})}
      ${l?m`<div class="key">
            ${["solar","cheap","grid","expensive"].filter(c=>(c!=="cheap"||this._info?.levels.cheap_until!=null)&&(c!=="expensive"||this._info?.levels.expensive_from!=null)).map(c=>m`<span><span class="dot" style="--c: ${le[c]}"></span>${o(c==="grid"?this._info?.levels.cheap_until!=null||this._info?.levels.expensive_from!=null?"source.normal":"source.grid":`source.${c}`)}</span>`)}
          </div>`:y}
    </div>`}render(){if(!this.hass)return m``;let e=this._localize,t=this._sums?.values?this._parts():[],s=t.reduce((c,h)=>c+Math.max(h.value,0),0),i=!this._byStatistics&&this._info?.calculating===!0,a=!this._byStatistics&&this._info!==void 0&&!this._area(),l=this._config.display??(!this._byStatistics&&this._by==="consumer"?"bars":"ring"),o;return i?o=m`<p class="summary">${e("calculating")}</p>`:a?o=m`<p class="summary">${e(this._info===null?"editor_not_loaded":"figures_unavailable")}</p>`:this._sums&&!this._sums.values?o=m`<p class="summary">${e("figures_failed")}</p>`:this._sums?s<=0?o=m`<p class="summary">${e("history_empty_figure")}</p>`:o=l==="bars"?this._bars(t):this._ring(t):o=m`<p class="summary">${e("loading")}</p>`,m`<ha-card>
      <div class="header">
        <h2 class="title">${this._title()}</h2>
      </div>
      ${o}
    </ha-card>`}};Se.properties={...W.properties,_config:{state:!0},_hasChart:{state:!0},_hidden:{state:!0}},Se.styles=[M,C`
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
        font-size: 12px;
        color: var(--secondary-text-color);
      }
    `];var ke=n=>({select:{mode:"dropdown",options:n}}),Ft=n=>n?.kind==="household"||n?.kind==="category"&&(n.statistics.energy?.length??0)>1,ms=n=>Ft(n)||!!n.statistics.solar?.length,Ce=class extends T{constructor(){super(...arguments);this._requested=!1;this._label=e=>this._localize(`editor_${e.name}`);this._helper=e=>e.name==="period"?this._localize("editor_period_hint"):void 0}setConfig(e){this._config=e}get _localize(){return R(this.hass?.locale?.language??this.hass?.language??"en")}willUpdate(){this.hass&&!this._requested&&(this._requested=!0,this.hass.callWS({type:`${A}/figures`}).then(e=>{this._info=e}).catch(()=>{this._info=null}))}_data(){let e=this._config??{type:""},t=!!e.statistics?.length||e.statistics!==void 0&&!e.area;return{title:e.title??"",period:e.period??"energy_date",source:t?"statistics":"energy",area:e.area??"household",by:e.by??"source",figure:e.figure??"energy",display:e.display??(!t&&e.by==="consumer"?"bars":"ring"),color_by_source:e.color_by_source??!1,statistics:(e.statistics??[]).map(s=>s.statistic)}}_schema(e){let t=this._localize,s=[{name:"title",selector:{text:{}}},{name:"period",selector:ke(te.map(i=>({value:i,label:t(`period.${i}`)})))},{name:"breakdown_source",selector:ke(["energy","statistics"].map(i=>({value:i,label:t(`breakdown_source.${i}`)})))}];if(e.source==="statistics")s.push({name:"statistics",selector:{statistic:{multiple:!0}}});else{let i=(this._info?.areas??[]).filter(ms),a=i.find(o=>o.id===e.area),l=[...a?.statistics.solar?.length?["source"]:[],...Ft(a)?["consumer"]:[]];s.push({name:"area",selector:ke(i.map(o=>({value:o.id,label:o.name})))},{name:"by",selector:ke(l.map(o=>({value:o,label:t(`by.${o}`)})))}),e.by==="consumer"&&s.push({name:"figure",selector:ke(["energy","cost"].map(o=>({value:o,label:t(`figure_choice.${o}`)})))})}return s.push({name:"display",selector:ke(["ring","bars"].map(i=>({value:i,label:t(`display.${i}`)})))}),e.source!=="statistics"&&e.by==="consumer"&&e.display==="bars"&&s.push({name:"color_by_source",selector:{boolean:{}}}),s}_changed(e){if(!this._config)return;let t={...this._data(),...e.detail.value};"breakdown_source"in e.detail.value&&(t.source=e.detail.value.breakdown_source);let{title:s,period:i,area:a,by:l,figure:o,display:c,color_by_source:h,statistics:u,...g}=this._config,d=g;if(typeof t.title=="string"&&t.title&&(d.title=t.title),d.period=t.period??"energy_date",t.source==="statistics"){let p=new Map((this._config.statistics??[]).map(v=>[v.statistic,v])),f=Array.isArray(t.statistics)?t.statistics.filter(Boolean):[];d.statistics=f.map(v=>p.get(v)??{statistic:v})}else{d.area=t.area??"household";let p=this._info?.areas.find(b=>b.id===d.area),f=Ft(p),v=!!p?.statistics.solar?.length;d.by=t.by==="consumer"&&f?"consumer":v?"source":"consumer",d.by==="consumer"&&t.figure==="cost"?d.figure="cost":d.figure="energy"}d.display=t.display==="bars"?"bars":"ring",d.by==="consumer"&&d.display==="bars"&&t.color_by_source===!0&&(d.color_by_source=!0),this._config=d,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:d},bubbles:!0,composed:!0}))}render(){if(!this.hass||!this._config)return m``;let e=this._data();return m`<div class="editor">
      ${e.source!=="statistics"&&this._info===null?m`<p class="hint">${this._localize("editor_not_loaded")}</p>`:y}
      <ha-form
        .hass=${this.hass}
        .data=${{...e,breakdown_source:e.source}}
        .schema=${this._schema(e)}
        .computeLabel=${this._label}
        .computeHelper=${this._helper}
        @value-changed=${this._changed}
      ></ha-form>
    </div>`}};Ce.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0}},Ce.styles=C`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .hint {
      margin: 0;
      color: var(--secondary-text-color);
    }
  `;var Ae=class extends V{constructor(){super(...arguments);this._infoLoading=!1}static getStubConfig(){return{}}static getConfigForm(){return{schema:[{name:"title",selector:{text:{}}}]}}setConfig(e){this._config=e}getCardSize(){return 4}getGridOptions(){return{columns:12,min_columns:6}}get _localize(){return R(this.hass?.locale?.language??this.hass?.language??"en")}_money(e,t=!1){return e===void 0?"":e===null?"\u2013":I(this.hass?.locale,{style:"currency",currency:this.hass?.config.currency??"EUR",maximumFractionDigits:0,minimumFractionDigits:0,signDisplay:t?"exceptZero":"auto"}).format(e)}willUpdate(){this.hass&&(this._info===void 0&&(this._info=X()),j()&&!this._infoLoading&&(this._infoLoading=!0,ee(this.hass).then(e=>{this._info=e,this._infoLoading=!1})))}render(){let e=this._localize;if(!this.hass)return m``;let t=L(this.hass),s=br(this.hass),i=m`<div class="header">
      <h2 class="title">${this._config?.title||e("title")}</h2>
    </div>`;if(!t.length||!s)return m`<ha-card>
        ${i}
        <p class="summary">${e(xe(this.hass))}</p>
      </ha-card>`;let a=this._info?D(this._info,P(this)):void 0,l=t.some(c=>c.calculating),o={perYear:t.some(c=>c.perYear!==null),invested:s.invested>0};return m`<ha-card>
      ${i}
      <div class="table">
        <table>
          <thead>
            <tr>
              <th class="bullet-cell"></th>
              <th class="name" scope="col">${e("column_area")}</th>
              ${o.perYear?m`<th class="number per-year" scope="col">${e("column_per_year")}</th>`:y}
              <th class="number" scope="col">${e("column_saving")}</th>
              ${o.invested?m`<th class="number" scope="col">${e("column_investment")}</th>
                    <th class="number" scope="col">${e("column_balance")}</th>`:y}
            </tr>
          </thead>
          <tbody>
            ${t.map(c=>this._row({name:e(`category.${c.category}`),entityId:c.entityId,perYear:c.perYear,saving:c.calculating?null:c.saving,investment:c.investment??void 0,balance:c.balance,category:c.category},o,a))}
            ${this._row({name:e("total"),entityId:s.entityId,perYear:s.perYear,saving:l?null:s.saved,investment:s.invested,balance:s.balance},o)}
          </tbody>
        </table>
      </div>
      ${l?m`<p class="note">${e("calculating")}</p>`:y}
    </ha-card>`}_row(e,t,s){let{name:i,entityId:a,perYear:l,saving:o,investment:c,balance:h,category:u}=e,g=u?s?.get(u):void 0;return m`<tr
      class=${u??"total"}
      style=${g?`--color: ${g}`:""}
      @click=${()=>this._moreInfo(a)}
    >
      <td class="bullet-cell">
        ${u?m`<span class="bullet" aria-hidden="true"></span>`:y}
      </td>
      <th class="name" scope="row" title=${i}>
        <button type="button">${i}</button>
      </th>
      ${t.perYear?m`<td class="number per-year">
            ${l===null?"\u2013":this._localize("average",{amount:this._money(l)})}
          </td>`:y}
      <td class="number">${this._money(o)}</td>
      ${t.invested?m`<td class="number">${this._money(c)}</td>
            <td class="number">${this._money(h,!0)}</td>`:y}
    </tr>`}_moreInfo(e){this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:e},bubbles:!0,composed:!0}))}};Ae.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0}},Ae.styles=[M,C`
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
    `];var Ue=class extends W{static getStubConfig(){return{}}static getConfigForm(){return{schema:[]}}setConfig(r){O(r?.collection_key),this._collectionKey=r?.collection_key}get _devices(){return this._info?lt(this._info).sort((r,e)=>r.name.localeCompare(e.name,this.hass?.locale?.language)):[]}_ids(){return this._devices.flatMap(r=>[...r.statistics.heat??[],...r.statistics.energy??[]])}render(){let r=this._localize;if(!this.hass)return m``;let e=this._waiting(),t=this._devices,s=t.length?t.map(i=>i.name).join(" & "):r("figure.heat");return m`<ha-card>
      <div class="header"><h2 class="title">${s}</h2></div>
      ${e?m`<p class="summary">${r(e)}</p>`:this._table()}
    </ha-card>`}_table(){let r=this._localize,e=this._fmt,t=this._sums?.values??{},s=D(this._info,P(this));return m`<table>
      <thead>
        <tr>
          <th scope="col" colspan="2" class="name">${r("meters_consumer")}</th>
          <th scope="col">${r("figure.heat")}</th>
          <th scope="col">${r("meters_electricity")}</th>
          <th scope="col">${r("figure.scop")}</th>
        </tr>
      </thead>
      <tbody>
        ${this._devices.map(i=>{let a=z(t,i.statistics.heat),l=z(t,i.statistics.energy);return m`<tr>
            <td class="swatch-cell">
              <span class="swatch" style="--color: ${s.get(i.id)??""}" aria-hidden="true"></span>
            </td>
            <td class="name">${i.name}</td>
            <td>${e.value(a,"energy")}</td>
            <td>${e.value(l,"energy")}</td>
            <td>${l>0?e.number(a/l,2):"\u2013"}</td>
          </tr>`})}
      </tbody>
    </table>`}};Ue.styles=[M,dt];var fs=300*1e3,_s="200px",ys={energy:"energy",cost:"money",saving:"money",export:"energy",heat:"energy",distance:"distance",alternative_cost:"money"},Re=class extends V{constructor(){super(...arguments);this._config={type:""};this._infoLoading=!1;this._watchingChart=!1}static getStubConfig(){return{}}static getConfigElement(){return document.createElement("electricity-lens-history-card-editor")}setConfig(e){O(e?.collection_key),this._config=e??{type:""}}getCardSize(){return 5}getGridOptions(){return{columns:12,min_columns:6}}connectedCallback(){super.connectedCallback(),this._follow()}disconnectedCallback(){super.disconnectedCallback(),this._unfollow?.(),this._unfollow=void 0,clearTimeout(this._retryTimer),this._retryTimer=void 0}get _localize(){return R(this.hass?.locale?.language??this.hass?.language??"en")}get _language(){return this.hass?.locale?.language??"en"}get _fmt(){return _e(this.hass?.locale,this.hass?.config.currency??"EUR")}get _savings(){return!this._config.area}_follow(){(this._config.period??"energy_date")==="energy_date"&&(this._unfollow||!this.isConnected||!this.hass?.connection||(this._unfollow=fe(this.hass.connection,this._config.collection_key,(e,t)=>{this._selected=e,this._compare=t})))}async _loadInfo(){!this.hass||this._infoLoading||(this._infoLoading=!0,this._info=await ee(this.hass),this._infoLoading=!1,clearTimeout(this._retryTimer),this._retryTimer=void 0,this.isConnected&&(!this._info||this._info.calculating)&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),U)))}_range(e){let t=this._config.period??"energy_date";if(t==="all"){let i=new Date(new Date().getFullYear()+1,0,1).getTime()-1;return{range:{start:new Date(_r,0,1).getTime(),end:i},period:"year",fromFirstValue:!0}}if(t!=="energy_date"){let i=N(t);return{range:i,period:Z(i),fromFirstValue:!1}}if(this._selected===void 0)return;if(this._selected)return{range:this._selected,period:Z(this._selected),compare:this._compare,fromFirstValue:!1};let s=e();return{range:s,period:this._savings?"year":Z(s),fromFirstValue:!1}}_savingsPlan(){if(!this.hass)return;let e=this._localize,t=L(this.hass);if(!t.length||t.some(c=>c.calculating))return;let s=this._range(()=>fr(t.map(c=>c.countingSince)));if(!s)return;let i=P(this),a=this._info?D(this._info,i):void 0,l={pv:i.solar,heat_pump:a?.get("heat_pump")??i.heat,wallbox:a?.get("wallbox")??i.car},o=t.map(c=>({series:{id:c.category,name:{},color:l[c.category],plus:[c.savingStatistic],minus:[]},name:e(`category.${c.category}`)}));return this._plan(s,o,"money",void 0,[])}_figurePlan(){let e=this._info,t=this._config;if(!e||e.calculating)return;let s=e.areas.find(d=>d.id===t.area),i=t.figure??"energy";if(!s||!s.statistics[i]?.length)return;let a=this._range(()=>N("this_month"));if(!a)return;let l=this._localize,o=$e(s,i),c=t.stack&&o.includes(t.stack)?t.stack:o[0],h=ut(e,s,i,c,P(this)).map(d=>({series:d,name:d.name.text??(d.name.key&&Y(d.name.key)?l(d.name.key):d.id)}));h.length===1&&(h[0].name=B(l,i,s));let u=t.line==="grid_price"?e.areas.find(d=>d.kind==="grid")??s:s,g=t.line&&s.statistics?{figure:t.line,area:u,name:t.line_name??B(l,t.line,u)}:void 0;return this._plan(a,h,ys[i],g,t.lines??[])}_plan(e,t,s,i,a){let l=new Set;for(let{series:c}of t)[...c.plus,...c.minus].forEach(h=>l.add(h));if(i)for(let c of Object.values(i.area.statistics))(c??[]).forEach(h=>l.add(h));a.forEach(c=>l.add(c.statistic));let o=[...l].sort();return{key:JSON.stringify([o,t.map(c=>[c.series.id,c.series.color]),i?.figure,a,e.range.start,e.range.end,e.period,e.compare?.start,e.compare?.end]),range:e.range,period:e.period,compare:e.compare,fromFirstValue:e.fromFirstValue,bars:t,unit:s,lineFigure:i,lines:a,ids:o}}async _load(e){if(!this.hass)return;this._loading=e.key;let t={key:e.key,at:Date.now(),plan:e,slots:St(e.range,e.period),rows:{},compareSlots:e.compare?St(e.compare,e.period):[],compareRows:{},metadata:{},failed:!1},s=this.hass,i=(a,l)=>s.callWS({type:"recorder/statistics_during_period",start_time:new Date(a.start).toISOString(),end_time:new Date(a.end+1).toISOString(),statistic_ids:l,period:ve(e.period),types:["change","mean"],units:{energy:"kWh"}});try{let a=e.lines.map(u=>u.statistic),l=[...new Set(e.bars.flatMap(({series:u})=>[...u.plus,...u.minus]))],[o,c,h]=await Promise.all([i(e.range,e.ids),e.compare?i(e.compare,l):Promise.resolve({}),a.length?this.hass.callWS({type:"recorder/get_statistics_metadata",statistic_ids:a}):Promise.resolve([])]);t.rows=o,t.compareRows=c,t.metadata=Object.fromEntries(h.map(u=>[u.statistic_id,u]))}catch{t.failed=!0}this._loading===e.key&&(this._loading=void 0,this._loaded=t)}willUpdate(e){if(!this.hass)return;(e.has("hass")||e.has("_config"))&&this._follow(),this._watchingChart||(this._watchingChart=!0,at(i=>{this._hasChart=i})),this._info===void 0&&(this._info=X()),j()&&!this._infoLoading?this._loadInfo():!this._savings&&this.isConnected&&this._info?.calculating&&!this._retryTimer&&!this._infoLoading&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),U));let t=this._savings?this._savingsPlan():this._figurePlan(),s=!this._loaded||Date.now()-this._loaded.at>fs;t&&t.key!==this._loading&&(t.key!==this._loaded?.key||s&&!this._loading)&&this._load(t),e.has("_loaded")&&(this._chart=this._buildChart())}_perSlot(e,t=!1){let s=this._loaded;if(!s)return[];let i=t?s.compareSlots:s.slots,a=t?s.compareRows:s.rows,l=i.map(()=>null);for(let o of e)kt(a[o],i,s.plan.period).forEach((c,h)=>{c!==null&&(l[h]=(l[h]??0)+c)});return l}_barValues(e,t=!1){let s=this._perSlot(e.plus,t),i=this._perSlot(e.minus,t);return s.map((a,l)=>{if(a===null&&i[l]===null)return null;let o=(a??0)-(i[l]??0),c=e.floor?Math.max(o,0):o;return e.negative?-c:c})}_lines(){let e=this._loaded;if(!e)return[];let{plan:t,slots:s}=e,i=this._fmt,a=P(this),l=this.hass?.config.currency==="EUR"?100:1,o=[];if(t.lineFigure){let{figure:c,area:h,name:u}=t.lineFigure,g=Object.fromEntries(Object.entries(h.statistics).map(([f,v])=>[f,this._perSlot(v??[])])),d=s.map((f,v)=>ye(c,h,_=>g[_]?.[v]??null,null).value),p=ye(c,h,()=>0,null).unit;o.push({id:`line_${c}`,name:u,color:a.line,dash:"dashed",step:p==="price"&&t.period==="hour",values:p==="price"?d.map(f=>f===null?null:f*l):d,format:f=>i.value(p==="price"?f/l:f,p)})}return t.lines.forEach((c,h)=>{let u=e.metadata[c.statistic],g=c.value??(u?.has_sum?"change":"mean"),d=u?.unit_class==="energy"?"kWh":u?.statistics_unit_of_measurement??"",p=g==="mean"?vr(e.rows[c.statistic],s,t.period):kt(e.rows[c.statistic],s,t.period);o.push({id:`statistic_${h}`,name:c.name??u?.name??this.hass?.states[c.statistic]?.attributes.friendly_name??c.statistic,color:h===0&&!t.lineFigure?a.line:a.consumers[h%a.consumers.length],dash:"dotted",values:p,format:f=>`${i.number(f)}${d?` ${d}`:""}`})}),o}_buildChart(){let e=this._loaded;if(!e||e.failed)return;let t=this._localize,s=this._fmt,{plan:i}=e,a=i.bars.map(({series:_,name:x})=>({id:_.id,name:x,color:_.color,values:this._barValues(_),inTotal:!_.negative})),l=this._lines(),o=this._labels(e.slots,i.period),c=i.fromFirstValue?yr([...a,...l].map(_=>_.values),o.length):0,h=_=>_.slice(c);a.forEach(_=>_.values=h(_.values)),l=l.map(_=>({..._,values:h(_.values)})),o=h(o);let u=i.compare?{series:i.bars.map(({series:_,name:x})=>({id:_.id,name:x,color:_.color,values:this._barValues(_,!0),inTotal:!_.negative})),labels:this._labels(e.compareSlots,i.period).map(_=>_.tooltip)}:void 0,g={price:this.hass?.config.currency==="EUR"?"ct/kWh":`${s.currencySymbol()}/kWh`,percent:"%",per_100km:`${s.currencySymbol()}/100 km`},d=i.lineFigure&&!i.lines.length?g[ye(i.lineFigure.figure,i.lineFigure.area,()=>0,null).unit]??"":"",p=cr({labels:o,series:a,compare:u,unit:i.unit==="money"?s.currencySymbol():i.unit==="distance"?"km":"kWh",total:t("history_total"),format:_=>i.unit==="money"?s.value(_,"money"):`${s.number(_,Math.abs(_)<10?2:1)} ${i.unit==="distance"?"km":"kWh"}`,tick:_=>s.number(_),lineTick:_=>s.number(_,Number.isInteger(_)?0:1),lines:l,lineUnit:d}),v=a.filter(_=>_.inTotal!==!1).flatMap(_=>_.values).reduce((_,x)=>_+(x??0),0),b=[...a,...l].some(_=>_.values.some(x=>x));return{...p,total:v,hasData:b}}_labels(e,t){let s=c=>new Intl.DateTimeFormat(this._language,c),i=s({hour:"2-digit",minute:"2-digit",hour12:hr(this.hass?.locale)}),a=e.length>0&&new Date(e[0]).getFullYear()!==new Date(e[e.length-1]).getFullYear(),l={hour:i,day:s({day:"numeric"}),month:s(a?{month:"short",year:"2-digit"}:{month:"short"}),year:s({year:"numeric"})}[t],o={hour:i,day:s({weekday:"short",day:"numeric",month:"short"}),month:s({month:"long",year:"numeric"}),year:s({year:"numeric"})}[t];return e.map(c=>({axis:l.format(c),tooltip:t==="hour"?`${i.format(c)} \u2013 ${i.format(c+36e5)}`:o.format(c)}))}_title(){let e=this._localize;if(this._config.title)return this._config.title;if(this._savings)return e("history_title");let t=this._config.figure??"energy",s=this._info?.areas.find(a=>a.id===this._config.area);if(s)return B(e,t,s);let i=`figure.${t}`;return Y(i)?e(i):e("history_title")}render(){let e=this._localize;if(!this.hass)return m``;let t=this._title();if(this._savings&&!L(this.hass).length)return m`<ha-card>
        <div class="header"><h2 class="title">${t}</h2></div>
        <p class="summary">${e(xe(this.hass))}</p>
      </ha-card>`;let s=this._savings?L(this.hass).some(c=>c.calculating):this._info?.calculating===!0,i=s?void 0:this._loaded,a=this._chart?.hasData??!1,l=i?.plan.unit??"money",o=!this._savings&&this._info!==void 0&&!this._info?.areas.some(c=>c.id===this._config.area&&c.statistics[this._config.figure??"energy"]?.length);return m`<ha-card>
      <div class="header">
        <h2 class="title">${t}</h2>
        ${i&&!i.failed&&a&&this._chart?m`<span class="chip">${this._fmt.value(this._chart.total,l)}</span>`:y}
      </div>
      ${s?m`<p class="summary">${e("calculating")}</p>`:o?m`<p class="summary">${e(this._info===null?"editor_not_loaded":"figures_unavailable")}</p>`:this._body(i,a)}
    </ha-card>`}_body(e,t){let s=this._localize;return this._hasChart===!1?m`<p class="summary">${s("history_no_chart")}</p>`:e?.failed?m`<p class="summary">${s("history_failed")}</p>`:m`<div class="chart">
      ${this._chart&&this._hasChart?m`<ha-chart-base
            .hass=${this.hass}
            .data=${this._chart.data}
            .options=${this._chart.options}
          ></ha-chart-base>`:y}
      ${e&&!t?m`<div class="empty">
            ${s(this._savings?"history_empty":"history_empty_figure")}
          </div>`:y}
    </div>`}};Re.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0},_selected:{state:!0},_loaded:{state:!0},_hasChart:{state:!0}},Re.styles=[M,C`
      .chart {
        position: relative;
        min-height: ${qe(_s)};
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
    `];function vs(n,r,e={}){let t=a=>r.areas.find(l=>l.id===a)?.statistics??{},s=r.areas.find(a=>a.kind==="grid")?.statistics??{},i=[];for(let a of n){let l=[a.savingStatistic];if(a.category==="pv"){let o=s.export?.length?s.export:[],c=o.length?s.feed_in??[]:[];i.push({name:"savings_pv",color:le.solar,plus:l,minus:c,energy:t("solar").self_used??[]}),c.length&&i.push({name:"savings_feed_in",color:le.export,plus:c,minus:[],energy:o})}else a.category==="heat_pump"?i.push({name:a.heating==="oil"?"savings_oil":"savings_gas",color:e.heat??le.heat,plus:l,minus:[],energy:t("heat_pump").energy??[]}):i.push({name:"savings_fuel",color:e.car??le.car,plus:l,minus:[],energy:t("wallbox").energy??[]})}return i}var Ve=class extends W{constructor(){super(...arguments);this._config={}}static getStubConfig(){return{}}static getConfigElement(){return document.createElement("electricity-lens-savings-card-editor")}setConfig(e){O(e?.collection_key),this._config=e??{},this._collectionKey=this._config.collection_key,this.requestUpdate()}get _area(){return this._info?.areas.find(e=>e.id===this._config.area)}_rows(){if(!this.hass||!this._info)return[];let e=D(this._info,P(this));return vs(L(this.hass),this._info,{heat:e.get("heat_pump"),car:e.get("wallbox")})}_ids(){if(this._config.area){let e=this._area?.statistics;return e?.alternative_cost?.length&&e.cost?.length&&e.saving?.length?[...e.alternative_cost,...e.cost,...e.saving,...e.solar_saving??[]]:[]}return this._rows().flatMap(e=>[...e.plus,...e.minus,...e.energy])}render(){let e=this._localize;if(!this.hass)return m``;let t=this._waiting();return m`<ha-card>
      <div class="header"><h2 class="title">${e("savings_title")}</h2></div>
      ${t?m`<p class="summary">${e(t)}</p>`:this._config.area?this._reckoning():this._table()}
    </ha-card>`}_reckoning(){let e=this._localize,t=this._fmt,s=this._area,i=this._sums?.values??{},a=z(i,s?.statistics.alternative_cost),l=z(i,s?.statistics.cost),o=z(i,s?.statistics.solar_saving),c=z(i,s?.statistics.saving)+o,h=L(this.hass).find(d=>d.category===s?.id)?.heating,u=s?.id==="wallbox"?"savings_instead_fuel":h==="oil"?"savings_instead_oil":"savings_instead_gas",g=Math.abs(o)>=.005;return m`<table>
        <tbody>
          <tr>
            <td class="name">${e(u)}</td>
            <td>${t.value(a,"money")}</td>
          </tr>
          <tr>
            <td class="name">
              ${s?.id==="wallbox"?e("strategy.charging_cost"):e("savings_electricity",{name:s?.name??""})}
            </td>
            <td>${t.value(-l,"money")}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th scope="row" class="name">${e("savings_title")}</th>
            <td>${t.value(c,"money")}</td>
          </tr>
          ${g?m`<tr class="quiet">
                <th scope="row" class="name">${e("savings_solar_part")}</th>
                <td>${t.value(o,"money")}</td>
              </tr>`:y}
        </tfoot>
      </table>`}_table(){let e=this._localize,t=this._fmt,s=this._rows(),i=this._sums?.values??{},a=o=>z(i,o.plus)-z(i,o.minus),l=s.reduce((o,c)=>o+a(c),0);return m`<table>
        <thead>
          <tr>
            <th scope="col" colspan="2" class="name">${e("savings_source")}</th>
            <th scope="col">${e("savings_energy")}</th>
            <th scope="col">${e("savings_amount")}</th>
          </tr>
        </thead>
        <tbody>
          ${s.map(o=>{let c=z(i,o.energy);return m`<tr>
              <td class="swatch-cell">
                <span class="swatch" style="--color: ${o.color}" aria-hidden="true"></span>
              </td>
              <td class="name">${e(o.name)}</td>
              <!-- Older periods may hold savings, but no energy to go with them. -->
              <td>${c||!a(o)?t.value(c,"energy"):"\u2013"}</td>
              <td>${t.value(a(o),"money")}</td>
            </tr>`})}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row" colspan="2" class="name">${e("savings_total")}</th>
            <td></td>
            <td>${t.value(l,"money")}</td>
          </tr>
        </tfoot>
      </table>`}};Ve.styles=[M,dt];var bs=["energy","statistic","entity"],Ee=n=>({select:{mode:"dropdown",options:n}}),Te=class extends T{constructor(){super(...arguments);this._requested=!1;this._label=e=>this._localize(`editor_${e.name}`);this._helper=e=>e.name==="period"?this._localize("editor_period_hint"):void 0}setConfig(e){this._config=e}get _localize(){return R(this.hass?.locale?.language??this.hass?.language??"en")}willUpdate(){this.hass&&!this._requested&&(this._requested=!0,this.hass.callWS({type:`${A}/figures`}).then(e=>{this._info=e}).catch(()=>{this._info=null}))}_schema(e){let t=this._localize,s=H(e),i=[{name:"source",selector:Ee(bs.map(a=>({value:a,label:t(`source.${a}`)})))}];if(s==="energy"){let a=this._info?.areas??[],l=a.find(o=>o.id===e.area);i.push({name:"area",selector:Ee(a.map(o=>({value:o.id,label:o.name})))},{name:"figure",selector:Ee(l?J(l).map(o=>({value:o,label:B(t,o,l)})):[])})}else s==="statistic"?(i.push({name:"statistic",selector:{statistic:{}}},{name:"value",selector:Ee(mr.map(a=>({value:a,label:t(`value.${a}`)})))}),(e.value??"change")==="mean"&&i.push({name:"secondary",selector:Ee(["none","range"].map(a=>({value:a,label:t(`secondary.${a}`)})))})):i.push({name:"entity",selector:{entity:{}}});return i.push({name:"name",selector:{text:{}}}),s!=="entity"&&!(e.figure&&(ue(e.figure)||de(e.figure)))&&i.push({name:"period",selector:Ee(te.map(a=>({value:a,label:t(`period.${a}`)})))}),i}_figureFrom(e,t){let s=e.source??H(t);if(s!==H(t))return s==="energy"?{area:"household",figure:"cost"}:s==="statistic"?{statistic:"",value:"change"}:{entity:""};if(s==="energy"){let i=e.area??t.area,a=this._info?.areas.find(c=>c.id===i),l=a?J(a):[],o=l.includes(e.figure)?e.figure:l[0];return{area:i,figure:o,...t.secondary==="none"?{secondary:"none"}:{}}}if(s==="statistic"){let i={statistic:e.statistic??"",value:e.value??"change"};return i.value==="mean"&&e.secondary==="range"&&(i.secondary="range"),i}return{entity:e.entity??""}}_changed(e){if(!this._config)return;let t=e.detail.value,{area:s,figure:i,statistic:a,value:l,secondary:o,entity:c,name:h,...u}=this._config,g={...u,period:t.period??"energy_date",...this._figureFrom(t,this._config)};typeof t.name=="string"&&t.name&&(g.name=t.name),this._config=g,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:g},bubbles:!0,composed:!0}))}render(){if(!this.hass||!this._config)return m``;let e=this._config;return m`<div class="editor">
      ${H(e)==="energy"&&this._info===null?m`<p class="hint">${this._localize("editor_not_loaded")}</p>`:y}
      <ha-form
        .hass=${this.hass}
        .data=${{source:H(e),...e,value:e.value??"change",secondary:e.secondary??"none",period:e.period??"energy_date"}}
        .schema=${this._schema(e)}
        .computeLabel=${this._label}
        .computeHelper=${this._helper}
        @value-changed=${this._changed}
      ></ha-form>
    </div>`}};Te.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0}},Te.styles=C`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .hint {
      margin: 0;
      color: var(--secondary-text-color);
    }
  `;var Pt="savings",Be=n=>({select:{mode:"dropdown",options:n}}),Fe=class extends T{constructor(){super(...arguments);this._requested=!1;this._label=e=>this._localize(`editor_${e.name}`);this._helper=e=>e.name==="period"?this._localize(this._config?.area?"editor_period_hint":"editor_period_hint_years"):void 0}setConfig(e){this._config=e}get _localize(){return R(this.hass?.locale?.language??this.hass?.language??"en")}willUpdate(){this.hass&&!this._requested&&(this._requested=!0,this.hass.callWS({type:`${A}/figures`}).then(e=>{this._info=e}).catch(()=>{this._info=null}))}_schema(){let e=this._localize,t=this._config??{type:""},s=this._info?.areas??[],i=[{name:"title",selector:{text:{}}},{name:"period",selector:Be([...te,"all"].map(l=>({value:l,label:e(`period.${l}`)})))},{name:"area",selector:Be([{value:Pt,label:e("editor_savings")},...s.filter(l=>Ne(l).length).map(l=>({value:l.id,label:l.name}))])}],a=s.find(l=>l.id===t.area);if(a){let l=Ne(a),o=t.figure&&l.includes(t.figure)?t.figure:l[0];i.push({name:"figure",selector:Be(l.map(c=>({value:c,label:B(e,c,a)})))},{name:"stack",selector:Be($e(a,o).map(c=>({value:c,label:e(`stack.${c}`)})))},{name:"line",selector:Be([{value:"none",label:e("editor_line_none")},...Et(a).map(c=>({value:c,label:B(e,c,a)}))])},{name:"lines",selector:{statistic:{multiple:!0}}})}return i}_data(){let e=this._config??{type:""},t=this._info?.areas.find(a=>a.id===e.area),s=t?Ne(t):[],i=e.figure&&s.includes(e.figure)?e.figure:s[0];return{title:e.title??"",period:e.period??"energy_date",area:e.area??Pt,figure:i,stack:e.stack??(t&&i?$e(t,i)[0]:void 0),line:e.line??"none",lines:(e.lines??[]).map(a=>a.statistic)}}_changed(e){if(!this._config)return;let t=e.detail.value,{title:s,period:i,area:a,figure:l,stack:o,line:c,lines:h,...u}=this._config,g=u;typeof t.title=="string"&&t.title&&(g.title=t.title),g.period=t.period??"energy_date";let d=t.area;if(d&&d!==Pt){g.area=d;let p=this._info?.areas.find($=>$.id===d),f=p?Ne(p):[],v=f.includes(t.figure)?t.figure:f[0];v&&(g.figure=v),(p&&v?$e(p,v):[]).includes(t.stack)&&(g.stack=t.stack),(p?Et(p):[]).includes(t.line)&&(g.line=t.line);let x=new Map((this._config.lines??[]).map($=>[$.statistic,$])),w=(Array.isArray(t.lines)?t.lines:[]).filter(Boolean).map($=>x.get($)??{statistic:$});w.length&&(g.lines=w)}this._config=g,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:g},bubbles:!0,composed:!0}))}render(){return!this.hass||!this._config?m``:m`<div class="editor">
      ${this._info===null?m`<p class="hint">${this._localize("editor_not_loaded")}</p>`:y}
      <ha-form
        .hass=${this.hass}
        .data=${this._data()}
        .schema=${this._schema()}
        .computeLabel=${this._label}
        .computeHelper=${this._helper}
        @value-changed=${this._changed}
      ></ha-form>
    </div>`}};Fe.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0}},Fe.styles=C`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .hint {
      margin: 0;
      color: var(--secondary-text-color);
    }
  `;var $r="https://github.com/ignazhabibi/ha-electricity-lens",Dt=(n,r)=>{if(!customElements.get(n))try{customElements.define(n,r)}catch{customElements.define(n,class extends r{})}};function Sr(n,r=[]){let e=()=>{n.forEach(({tag:l,card:o,editor:c})=>{Dt(l,o),c&&Dt(c.tag,c.element)}),r.forEach(({type:l,element:o})=>Dt(`ll-strategy-dashboard-${l}`,o))};e();let t=window.customElements,s=Date.now(),i=window.setInterval(()=>{let l=window.customElements!==t;l&&e(),(l||Date.now()-s>6e4)&&window.clearInterval(i)},100),a=window;a.customStrategies=a.customStrategies??[];for(let{type:l,name:o,description:c}of r)a.customStrategies.some(h=>h.type===l)||a.customStrategies.push({type:l,strategyType:"dashboard",name:o,description:c,documentationURL:$r});a.customCards=a.customCards??[];for(let{tag:l,name:o,description:c}of n)a.customCards.some(h=>h.type===l)||a.customCards.push({type:l,name:o,description:c,preview:!0,documentationURL:$r})}var Mt="all",We=class extends T{constructor(){super(...arguments);this._label=()=>this._localize("editor_area")}setConfig(e){this._config=e}get _localize(){return R(this.hass?.locale?.language??this.hass?.language??"en")}_changed(e){let{area:t,...s}=this._config??{},i=e.detail.value.area,a=i&&i!==Mt?{...s,area:i}:s;this._config=a,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:a},bubbles:!0,composed:!0}))}render(){if(!this.hass||!this._config)return m``;let e=this._localize,t=[{name:"area",selector:{select:{mode:"dropdown",options:[{value:Mt,label:e("editor_savings")},{value:"heat_pump",label:e("category.heat_pump")},{value:"wallbox",label:e("category.wallbox")}]}}}];return m`<ha-form
      .hass=${this.hass}
      .data=${{area:this._config.area??Mt}}
      .schema=${t}
      .computeLabel=${this._label}
      @value-changed=${this._changed}
    ></ha-form>`}};We.properties={hass:{attribute:!1},_config:{state:!0}};var E=(n,r={})=>({type:n.startsWith("electricity-lens")?`custom:${n}`:n,...r}),kr={grid_options:{columns:"full"}},Pe={grid_options:{columns:6}},q={grid_options:{columns:12}},Cr=(n,r,e={},t)=>E("electricity-lens-figures-card",{area:n,figure:r,...t?{name:t}:{},...Pe,...e}),Ke=(n,r,e,t,s=!0)=>({title:n,path:r,type:"sections",max_columns:3,sections:[{type:"grid",column_span:2,cards:[...s?[E("energy-date-selection",kr)]:[],...e.map(i=>({...kr,...i}))]}],sidebar:{sections:[{type:"grid",cards:t}]}}),xs=70;function ws(n){let r=Object.values(n.entities??{}).filter(a=>a.platform===A),e=["pv","heat_pump","wallbox"],s=r.filter(a=>a.translation_key==="saving").map(a=>n.states[a.entity_id]?.attributes.category).filter(a=>e.includes(a)),i=["today","tomorrow"].flatMap(a=>{let l=r.find(o=>o.translation_key===`forecast_${a}`)?.entity_id;return l?[{day:a,entity:l}]:[]});return{categories:s,investments:ct(n),forecasts:i}}function $s(n,r,e={categories:[],investments:[],forecasts:[]}){let t=(w,$,F={})=>Cr(w,$,F,r(`figure.${$}`)),s=(w,$,F,k={})=>Cr(w,$,k,r(F)),i=(w,$,F={})=>E(w,{title:r($),...F}),a=w=>n.areas.find($=>$.id===w),l=a("solar"),o=a("heat_pump"),c=a("wallbox"),h=n.areas.some(w=>w.kind==="device"),u=!!(l?.statistics.saving?.length||o||c||e.categories.length),g={period:"today"},d={line:"price",...l?{line_name:r("strategy.price_with_solar")}:{}},p=(w,$={})=>l?s(w,"price","strategy.price_with_solar",$):t(w,"price",$),f={secondary:"none"},v=(w,$={})=>E("electricity-lens-history-card",{area:w,figure:"energy",stack:"source",...d,...$}),b=w=>E("electricity-lens-breakdown-card",{area:w,by:"source",...q}),_=e.investments.flatMap(({category:w,payback:$,annualReturn:F})=>[E("electricity-lens-figures-card",{area:He(w),figure:"payback",name:r(`strategy.payback_${w}`),visibility:[{condition:"numeric_state",entity:$,below:100}],...Pe}),E("electricity-lens-figures-card",{area:He(w),figure:"annual_return",name:r(`strategy.return_${w}`),visibility:[{condition:"numeric_state",entity:F,above:-1}],...Pe})]),x=l?.forecast?e.forecasts.map(({entity:w,day:$})=>E("gauge",{entity:w,name:r(`strategy.forecast_${$}`),min:0,max:xs,...Pe})):[],S=[];return S.push(Ke(r("strategy.overview"),"now",[u?E("electricity-lens-balance-card"):v("household",g)],[...x,s("household","cost","strategy.cost_today",g),s("household","energy","strategy.consumption_today",g),..._],!1)),S.push(Ke(r("strategy.electricity"),"household",[i("energy-usage-graph","strategy.usage_graph"),...l?[i("energy-solar-graph","strategy.solar_graph")]:[],...h?[E("electricity-lens-history-card",{title:r("strategy.devices_graph"),area:"household",figure:"energy",stack:"consumer"})]:[]],[i("energy-distribution","strategy.distribution",q),b("household"),...l?[E("energy-self-sufficiency-gauge",Pe),E("energy-solar-consumed-gauge",Pe)]:[]])),S.push(Ke(r("strategy.costs"),"costs",[i("electricity-lens-history-card","strategy.bill",{area:"household",figure:"cost",stack:"bill",line:"grid_price"}),...l?[i("electricity-lens-history-card","strategy.cost_with_solar",{area:"household",figure:"cost",stack:"source",...d})]:[],i("electricity-lens-history-card","strategy.cost_history",{area:"household",figure:"cost",stack:"consumer",...l?{}:d})],[t("grid","grid_price",f),p("household",f),i("electricity-lens-breakdown-card","strategy.cost_distribution",{area:"household",by:"consumer",figure:"cost",display:"bars",color_by_source:!0,...q}),...u?[E("electricity-lens-savings-card",q)]:[]])),o&&S.push(Ke(r("strategy.heating"),"heating",[i("electricity-lens-history-card","figure.heat",{area:"heat_pump",figure:"heat",stack:"consumer",line:"scop",line_name:r("figure.scop")}),i("electricity-lens-history-card","strategy.usage_graph",{area:"heat_pump",figure:"energy",stack:"source"}),i("electricity-lens-history-card",l?"strategy.cost_with_solar":"figure.cost",{area:"heat_pump",figure:"cost",stack:"source",...d})],[t("heat_pump","scop",f),t("heat_pump","heat_price",f),b("heat_pump"),...lt(n).length?[E("electricity-lens-heat-meters-card",q)]:[...(o.statistics.energy?.length??0)>1?[E("electricity-lens-breakdown-card",{area:"heat_pump",by:"consumer",figure:"energy",display:"bars",color_by_source:!0,...q})]:[],...(o.statistics.heat_meters?.length??0)>1?[E("electricity-lens-breakdown-card",{title:r("figure.heat"),statistics:(o.statistics.heat_meters??[]).map(w=>({statistic:w})),display:"bars",...q})]:[]],E("electricity-lens-savings-card",{area:"heat_pump",...q})])),c&&S.push(Ke(r("strategy.charging"),"charging",[i("electricity-lens-history-card","strategy.charged_energy",{area:"wallbox",figure:"energy",stack:"source"}),i("electricity-lens-history-card","strategy.charging_cost",{area:"wallbox",figure:"cost",stack:"source",...d})],[t("wallbox","device_grid_price",f),p("wallbox",f),b("wallbox"),E("electricity-lens-savings-card",{area:"wallbox",...q})])),S}var Ss=3e4,ks=1e3;async function Cs(n){let r=n.config.state!==void 0&&n.config.state!=="RUNNING",e=Date.now()+Ss;for(;;)try{return await n.callWS({type:`${A}/figures`})}catch(t){if(!r||Date.now()>=e)throw t;await new Promise(s=>setTimeout(s,ks))}}var Ge=class extends HTMLElement{static async generate(r,e){let t=R(e.locale?.language??e.language??"en"),s;try{s=await Cs(e)}catch{return{title:t("strategy.title"),views:[{title:t("strategy.title"),cards:[{type:"markdown",content:t("strategy.not_loaded")}]}]}}return{title:t("strategy.title"),views:$s(s,t,ws(e))}}};Ge.noEditor=!0;Sr([{tag:"electricity-lens-balance-card",card:Ae,name:"Electricity Lens economics",description:"What your PV plant, heat pump, and electric car have saved, against what they cost."},{tag:"electricity-lens-savings-card",card:Ve,name:"Electricity Lens savings",description:"What solar power, the heat pump, and the electric car saved in the selected period, as a table, or one area's saving reckoned up. Follows the energy date selection.",editor:{tag:"electricity-lens-savings-card-editor",element:We}},{tag:"electricity-lens-heat-meters-card",card:Ue,name:"Electricity Lens heat meters",description:"Heat, electricity, and seasonal COP of each of the heat pump's meters in the selected period. Follows the energy date selection."},{tag:"electricity-lens-history-card",card:Re,name:"Electricity Lens history",description:"Savings, consumption, or costs per period as bars, stacked by source or consumer, with lines. Follows the energy date selection.",editor:{tag:"electricity-lens-history-card-editor",element:Fe}},{tag:"electricity-lens-figures-card",card:we,name:"Electricity Lens key figures",description:"One key figure for a period: costs, solar share, cheap grid power, savings, or any statistic or entity.",editor:{tag:"electricity-lens-figures-card-editor",element:Te}},{tag:"electricity-lens-breakdown-card",card:Se,name:"Electricity Lens breakdown",description:"Shares for a period as a ring or bars: the electricity mix, consumption or costs by consumer, or any statistics.",editor:{tag:"electricity-lens-breakdown-card-editor",element:Ce}}],[{type:"electricity-lens",element:Ge,name:"Electricity Lens",description:"A finished electricity dashboard with costs, electricity mix, solar, heat pump, car, and the balance."}]);
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
