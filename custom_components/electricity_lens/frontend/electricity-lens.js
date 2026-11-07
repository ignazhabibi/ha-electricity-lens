var it=globalThis,nt=it.ShadowRoot&&(it.ShadyCSS===void 0||it.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,St=Symbol(),qt=new WeakMap,We=class{constructor(r,e,t){if(this._$cssResult$=!0,t!==St)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=r,this.t=e}get styleSheet(){let r=this.o,e=this.t;if(nt&&r===void 0){let t=e!==void 0&&e.length===1;t&&(r=qt.get(e)),r===void 0&&((this.o=r=new CSSStyleSheet).replaceSync(this.cssText),t&&qt.set(e,r))}return r}toString(){return this.cssText}},at=n=>new We(typeof n=="string"?n:n+"",void 0,St),C=(n,...r)=>{let e=n.length===1?n[0]:r.reduce((t,s,i)=>t+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+n[i+1],n[0]);return new We(e,n,St)},Zt=(n,r)=>{if(nt)n.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of r){let t=document.createElement("style"),s=it.litNonce;s!==void 0&&t.setAttribute("nonce",s),t.textContent=e.cssText,n.appendChild(t)}},Ct=nt?n=>n:n=>n instanceof CSSStyleSheet?(r=>{let e="";for(let t of r.cssRules)e+=t.cssText;return at(e)})(n):n;var{is:jr,defineProperty:Yr,getOwnPropertyDescriptor:qr,getOwnPropertyNames:Zr,getOwnPropertySymbols:Jr,getPrototypeOf:Qr}=Object,ot=globalThis,Jt=ot.trustedTypes,Xr=Jt?Jt.emptyScript:"",es=ot.reactiveElementPolyfillSupport,Ke=(n,r)=>n,At={toAttribute(n,r){switch(r){case Boolean:n=n?Xr:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,r){let e=n;switch(r){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},Xt=(n,r)=>!jr(n,r),Qt={attribute:!0,type:String,converter:At,reflect:!1,useDefault:!1,hasChanged:Xt};Symbol.metadata??=Symbol("metadata"),ot.litPropertyMetadata??=new WeakMap;var Z=class extends HTMLElement{static addInitializer(r){this._$Ei(),(this.l??=[]).push(r)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(r,e=Qt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(r)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(r,e),!e.noAccessor){let t=Symbol(),s=this.getPropertyDescriptor(r,t,e);s!==void 0&&Yr(this.prototype,r,s)}}static getPropertyDescriptor(r,e,t){let{get:s,set:i}=qr(this.prototype,r)??{get(){return this[e]},set(a){this[e]=a}};return{get:s,set(a){let c=s?.call(this);i?.call(this,a),this.requestUpdate(r,c,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(r){return this.elementProperties.get(r)??Qt}static _$Ei(){if(this.hasOwnProperty(Ke("elementProperties")))return;let r=Qr(this);r.finalize(),r.l!==void 0&&(this.l=[...r.l]),this.elementProperties=new Map(r.elementProperties)}static finalize(){if(this.hasOwnProperty(Ke("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Ke("properties"))){let e=this.properties,t=[...Zr(e),...Jr(e)];for(let s of t)this.createProperty(s,e[s])}let r=this[Symbol.metadata];if(r!==null){let e=litPropertyMetadata.get(r);if(e!==void 0)for(let[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let s=this._$Eu(e,t);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(r){let e=[];if(Array.isArray(r)){let t=new Set(r.flat(1/0).reverse());for(let s of t)e.unshift(Ct(s))}else r!==void 0&&e.push(Ct(r));return e}static _$Eu(r,e){let t=e.attribute;return t===!1?void 0:typeof t=="string"?t:typeof r=="string"?r.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(r=>this.enableUpdating=r),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(r=>r(this))}addController(r){(this._$EO??=new Set).add(r),this.renderRoot!==void 0&&this.isConnected&&r.hostConnected?.()}removeController(r){this._$EO?.delete(r)}_$E_(){let r=new Map,e=this.constructor.elementProperties;for(let t of e.keys())this.hasOwnProperty(t)&&(r.set(t,this[t]),delete this[t]);r.size>0&&(this._$Ep=r)}createRenderRoot(){let r=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Zt(r,this.constructor.elementStyles),r}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(r=>r.hostConnected?.())}enableUpdating(r){}disconnectedCallback(){this._$EO?.forEach(r=>r.hostDisconnected?.())}attributeChangedCallback(r,e,t){this._$AK(r,t)}_$ET(r,e){let t=this.constructor.elementProperties.get(r),s=this.constructor._$Eu(r,t);if(s!==void 0&&t.reflect===!0){let i=(t.converter?.toAttribute!==void 0?t.converter:At).toAttribute(e,t.type);this._$Em=r,i==null?this.removeAttribute(s):this.setAttribute(s,i),this._$Em=null}}_$AK(r,e){let t=this.constructor,s=t._$Eh.get(r);if(s!==void 0&&this._$Em!==s){let i=t.getPropertyOptions(s),a=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:At;this._$Em=s;let c=a.fromAttribute(e,i.type);this[s]=c??this._$Ej?.get(s)??c,this._$Em=null}}requestUpdate(r,e,t,s=!1,i){if(r!==void 0){let a=this.constructor;if(s===!1&&(i=this[r]),t??=a.getPropertyOptions(r),!((t.hasChanged??Xt)(i,e)||t.useDefault&&t.reflect&&i===this._$Ej?.get(r)&&!this.hasAttribute(a._$Eu(r,t))))return;this.C(r,e,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(r,e,{useDefault:t,reflect:s,wrapped:i},a){t&&!(this._$Ej??=new Map).has(r)&&(this._$Ej.set(r,a??e??this[r]),i!==!0||a!==void 0)||(this._$AL.has(r)||(this.hasUpdated||t||(e=void 0),this._$AL.set(r,e)),s===!0&&this._$Em!==r&&(this._$Eq??=new Set).add(r))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let r=this.scheduleUpdate();return r!=null&&await r,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,i]of this._$Ep)this[s]=i;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[s,i]of t){let{wrapped:a}=i,c=this[s];a!==!0||this._$AL.has(s)||c===void 0||this.C(s,void 0,i,c)}}let r=!1,e=this._$AL;try{r=this.shouldUpdate(e),r?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(t){throw r=!1,this._$EM(),t}r&&this._$AE(e)}willUpdate(r){}_$AE(r){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(r)),this.updated(r)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(r){return!0}update(r){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(r){}firstUpdated(r){}};Z.elementStyles=[],Z.shadowRootOptions={mode:"open"},Z[Ke("elementProperties")]=new Map,Z[Ke("finalized")]=new Map,es?.({ReactiveElement:Z}),(ot.reactiveElementVersions??=[]).push("2.1.2");var Rt=globalThis,er=n=>n,ct=Rt.trustedTypes,tr=ct?ct.createPolicy("lit-html",{createHTML:n=>n}):void 0,Ft="$lit$",J=`lit$${Math.random().toFixed(9).slice(2)}$`,Tt="?"+J,ts=`<${Tt}>`,ue=document,je=()=>ue.createComment(""),Ye=n=>n===null||typeof n!="object"&&typeof n!="function",Pt=Array.isArray,or=n=>Pt(n)||typeof n?.[Symbol.iterator]=="function",Et=`[ 	
\f\r]`,Ge=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,rr=/-->/g,sr=/>/g,ce=RegExp(`>|${Et}(?:([^\\s"'>=/]+)(${Et}*=${Et}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ir=/'/g,nr=/"/g,cr=/^(?:script|style|textarea|title)$/i,Dt=n=>(r,...e)=>({_$litType$:n,strings:r,values:e}),m=Dt(1),ti=Dt(2),ri=Dt(3),Q=Symbol.for("lit-noChange"),v=Symbol.for("lit-nothing"),ar=new WeakMap,le=ue.createTreeWalker(ue,129);function lr(n,r){if(!Pt(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return tr!==void 0?tr.createHTML(r):r}var ur=(n,r)=>{let e=n.length-1,t=[],s,i=r===2?"<svg>":r===3?"<math>":"",a=Ge;for(let c=0;c<e;c++){let o=n[c],l,h,u=-1,g=0;for(;g<o.length&&(a.lastIndex=g,h=a.exec(o),h!==null);)g=a.lastIndex,a===Ge?h[1]==="!--"?a=rr:h[1]!==void 0?a=sr:h[2]!==void 0?(cr.test(h[2])&&(s=RegExp("</"+h[2],"g")),a=ce):h[3]!==void 0&&(a=ce):a===ce?h[0]===">"?(a=s??Ge,u=-1):h[1]===void 0?u=-2:(u=a.lastIndex-h[2].length,l=h[1],a=h[3]===void 0?ce:h[3]==='"'?nr:ir):a===nr||a===ir?a=ce:a===rr||a===sr?a=Ge:(a=ce,s=void 0);let d=a===ce&&n[c+1].startsWith("/>")?" ":"";i+=a===Ge?o+ts:u>=0?(t.push(l),o.slice(0,u)+Ft+o.slice(u)+J+d):o+J+(u===-2?c:d)}return[lr(n,i+(n[e]||"<?>")+(r===2?"</svg>":r===3?"</math>":"")),t]},qe=class n{constructor({strings:r,_$litType$:e},t){let s;this.parts=[];let i=0,a=0,c=r.length-1,o=this.parts,[l,h]=ur(r,e);if(this.el=n.createElement(l,t),le.currentNode=this.el.content,e===2||e===3){let u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(s=le.nextNode())!==null&&o.length<c;){if(s.nodeType===1){if(s.hasAttributes())for(let u of s.getAttributeNames())if(u.endsWith(Ft)){let g=h[a++],d=s.getAttribute(u).split(J),p=/([.?@])?(.*)/.exec(g);o.push({type:1,index:i,name:p[2],strings:d,ctor:p[1]==="."?ut:p[1]==="?"?dt:p[1]==="@"?ht:he}),s.removeAttribute(u)}else u.startsWith(J)&&(o.push({type:6,index:i}),s.removeAttribute(u));if(cr.test(s.tagName)){let u=s.textContent.split(J),g=u.length-1;if(g>0){s.textContent=ct?ct.emptyScript:"";for(let d=0;d<g;d++)s.append(u[d],je()),le.nextNode(),o.push({type:2,index:++i});s.append(u[g],je())}}}else if(s.nodeType===8)if(s.data===Tt)o.push({type:2,index:i});else{let u=-1;for(;(u=s.data.indexOf(J,u+1))!==-1;)o.push({type:7,index:i}),u+=J.length-1}i++}}static createElement(r,e){let t=ue.createElement("template");return t.innerHTML=r,t}};function de(n,r,e=n,t){if(r===Q)return r;let s=t!==void 0?e._$Co?.[t]:e._$Cl,i=Ye(r)?void 0:r._$litDirective$;return s?.constructor!==i&&(s?._$AO?.(!1),i===void 0?s=void 0:(s=new i(n),s._$AT(n,e,t)),t!==void 0?(e._$Co??=[])[t]=s:e._$Cl=s),s!==void 0&&(r=de(n,s._$AS(n,r.values),s,t)),r}var lt=class{constructor(r,e){this._$AV=[],this._$AN=void 0,this._$AD=r,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(r){let{el:{content:e},parts:t}=this._$AD,s=(r?.creationScope??ue).importNode(e,!0);le.currentNode=s;let i=le.nextNode(),a=0,c=0,o=t[0];for(;o!==void 0;){if(a===o.index){let l;o.type===2?l=new ye(i,i.nextSibling,this,r):o.type===1?l=new o.ctor(i,o.name,o.strings,this,r):o.type===6&&(l=new gt(i,this,r)),this._$AV.push(l),o=t[++c]}a!==o?.index&&(i=le.nextNode(),a++)}return le.currentNode=ue,s}p(r){let e=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(r,t,e),e+=t.strings.length-2):t._$AI(r[e])),e++}},ye=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(r,e,t,s){this.type=2,this._$AH=v,this._$AN=void 0,this._$AA=r,this._$AB=e,this._$AM=t,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let r=this._$AA.parentNode,e=this._$AM;return e!==void 0&&r?.nodeType===11&&(r=e.parentNode),r}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(r,e=this){r=de(this,r,e),Ye(r)?r===v||r==null||r===""?(this._$AH!==v&&this._$AR(),this._$AH=v):r!==this._$AH&&r!==Q&&this._(r):r._$litType$!==void 0?this.$(r):r.nodeType!==void 0?this.T(r):or(r)?this.k(r):this._(r)}O(r){return this._$AA.parentNode.insertBefore(r,this._$AB)}T(r){this._$AH!==r&&(this._$AR(),this._$AH=this.O(r))}_(r){this._$AH!==v&&Ye(this._$AH)?this._$AA.nextSibling.data=r:this.T(ue.createTextNode(r)),this._$AH=r}$(r){let{values:e,_$litType$:t}=r,s=typeof t=="number"?this._$AC(r):(t.el===void 0&&(t.el=qe.createElement(lr(t.h,t.h[0]),this.options)),t);if(this._$AH?._$AD===s)this._$AH.p(e);else{let i=new lt(s,this),a=i.u(this.options);i.p(e),this.T(a),this._$AH=i}}_$AC(r){let e=ar.get(r.strings);return e===void 0&&ar.set(r.strings,e=new qe(r)),e}k(r){Pt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,t,s=0;for(let i of r)s===e.length?e.push(t=new n(this.O(je()),this.O(je()),this,this.options)):t=e[s],t._$AI(i),s++;s<e.length&&(this._$AR(t&&t._$AB.nextSibling,s),e.length=s)}_$AR(r=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);r!==this._$AB;){let t=er(r).nextSibling;er(r).remove(),r=t}}setConnected(r){this._$AM===void 0&&(this._$Cv=r,this._$AP?.(r))}},he=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(r,e,t,s,i){this.type=1,this._$AH=v,this._$AN=void 0,this.element=r,this.name=e,this._$AM=s,this.options=i,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=v}_$AI(r,e=this,t,s){let i=this.strings,a=!1;if(i===void 0)r=de(this,r,e,0),a=!Ye(r)||r!==this._$AH&&r!==Q,a&&(this._$AH=r);else{let c=r,o,l;for(r=i[0],o=0;o<i.length-1;o++)l=de(this,c[t+o],e,o),l===Q&&(l=this._$AH[o]),a||=!Ye(l)||l!==this._$AH[o],l===v?r=v:r!==v&&(r+=(l??"")+i[o+1]),this._$AH[o]=l}a&&!s&&this.j(r)}j(r){r===v?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,r??"")}},ut=class extends he{constructor(){super(...arguments),this.type=3}j(r){this.element[this.name]=r===v?void 0:r}},dt=class extends he{constructor(){super(...arguments),this.type=4}j(r){this.element.toggleAttribute(this.name,!!r&&r!==v)}},ht=class extends he{constructor(r,e,t,s,i){super(r,e,t,s,i),this.type=5}_$AI(r,e=this){if((r=de(this,r,e,0)??v)===Q)return;let t=this._$AH,s=r===v&&t!==v||r.capture!==t.capture||r.once!==t.once||r.passive!==t.passive,i=r!==v&&(t===v||s);s&&this.element.removeEventListener(this.name,this,t),i&&this.element.addEventListener(this.name,this,r),this._$AH=r}handleEvent(r){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,r):this._$AH.handleEvent(r)}},gt=class{constructor(r,e,t){this.element=r,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(r){de(this,r)}},dr={M:Ft,P:J,A:Tt,C:1,L:ur,R:lt,D:or,V:de,I:ye,H:he,N:dt,U:ht,B:ut,F:gt},rs=Rt.litHtmlPolyfillSupport;rs?.(qe,ye),(Rt.litHtmlVersions??=[]).push("3.3.3");var hr=(n,r,e)=>{let t=e?.renderBefore??r,s=t._$litPart$;if(s===void 0){let i=e?.renderBefore??null;t._$litPart$=s=new ye(r.insertBefore(je(),i),i,void 0,e??{})}return s._$AI(n),s};var Mt=globalThis,T=class extends Z{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let r=super.createRenderRoot();return this.renderOptions.renderBefore??=r.firstChild,r}update(r){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(r),this._$Do=hr(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Q}};T._$litElement$=!0,T.finalized=!0,Mt.litElementHydrateSupport?.({LitElement:T});var ss=Mt.litElementPolyfillSupport;ss?.({LitElement:T});(Mt.litElementVersions??=[]).push("4.2.2");var gr={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},pt=n=>(...r)=>({_$litDirective$:n,values:r}),ve=class{constructor(r){}get _$AU(){return this._$AM._$AU}_$AT(r,e,t){this._$Ct=r,this._$AM=e,this._$Ci=t}_$AS(r,e){return this.update(r,e)}update(r,e){return this.render(...e)}};var{I:is}=dr,pr=n=>n;var mr=()=>document.createComment(""),be=(n,r,e)=>{let t=n._$AA.parentNode,s=r===void 0?n._$AB:r._$AA;if(e===void 0){let i=t.insertBefore(mr(),s),a=t.insertBefore(mr(),s);e=new is(i,a,n,n.options)}else{let i=e._$AB.nextSibling,a=e._$AM,c=a!==n;if(c){let o;e._$AQ?.(n),e._$AM=n,e._$AP!==void 0&&(o=n._$AU)!==a._$AU&&e._$AP(o)}if(i!==s||c){let o=e._$AA;for(;o!==i;){let l=pr(o).nextSibling;pr(t).insertBefore(o,s),o=l}}}return e},re=(n,r,e=n)=>(n._$AI(r,e),n),ns={},mt=(n,r=ns)=>n._$AH=r,fr=n=>n._$AH,ft=n=>{n._$AR(),n._$AA.remove()};var _r=pt(class extends ve{constructor(){super(...arguments),this.key=v}render(n,r){return this.key=n,r}update(n,[r,e]){return r!==this.key&&(mt(n),this.key=r),e}});var yr;function as(){if(customElements.get("ha-chart-base"))return Promise.resolve(!0);let n=window.loadCardHelpers;return n?(yr??=(async()=>{try{(await n()).createCardElement({type:"statistics-graph",entities:[]})}catch{}let r=new Promise(e=>setTimeout(()=>e(!1),1e4));return Promise.race([customElements.whenDefined("ha-chart-base").then(()=>!0),r])})(),yr):Promise.resolve(!1)}function vt(n){as().then(n),customElements.whenDefined("ha-chart-base").then(()=>n(!0))}var _t="compare-",vr=n=>Math.round(n*255).toString(16).padStart(2,"0");function xe(n,r){let e=n.trim();if(/^#[0-9a-f]{6}$/i.test(e))return e+vr(r);if(/^#[0-9a-f]{3}$/i.test(e))return`#${[...e.slice(1)].map(s=>s+s).join("")}${vr(r)}`;let t=e.match(/^rgba?\(([^)]+)\)/i);if(t){let[s,i,a]=t[1].split(/[ ,/]+/).filter(Boolean);return`rgba(${s}, ${i}, ${a}, ${r})`}return e}var ge=n=>n.replace(/[&<>"']/g,r=>`&#${r.charCodeAt(0)};`),zt=n=>`<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${n}"></span>`;function br(n){if(n<=0)return 1;let r=10**Math.floor(Math.log10(n)),e=n/r;return([1,2,2.5,5,10].find(s=>e<=s*(1+1e-9))??10)*r}var we=n=>Number(n.toFixed(10));function os(n,r){if(n.min>=0&&r.min>=0)return;let e=br((n.max-n.min)/6),t=Math.max(Math.ceil(we(n.max/e)),r.max>0?1:0),s=Math.max(Math.ceil(we(-n.min/e)),r.min<0?1:0),i=br(Math.max(t?r.max/t:0,s?-r.min/s:0));return{bar:{min:we(-s*e),max:we(t*e),interval:e},line:{min:we(-s*i),max:we(t*i),interval:i}}}function wr(n,r,e){return n.map((t,s)=>({id:e?_t+t.id:t.id,type:"bar",name:t.name,stack:r,cursor:"default",barMaxWidth:50,color:xe(t.color,e?50/255:127/255),itemStyle:{borderColor:e?xe(t.color,127/255):t.color},data:t.values.map((i,a)=>{let c=n.slice(s+1).every(o=>Math.sign(o.values[a]??0)!==Math.sign(i??0));return{value:i,itemStyle:i?c?{borderRadius:i>0?[4,4,0,0]:[0,0,4,4]}:void 0:{borderWidth:0}}})}))}function xr(n,r){let e=0,t=0;for(let s=0;s<r;s+=1){let i=n.map(a=>a.values[s]??0);t=Math.max(t,i.filter(a=>a>0).reduce((a,c)=>a+c,0)),e=Math.min(e,i.filter(a=>a<0).reduce((a,c)=>a+c,0))}return{min:e,max:t}}function $r(n){let r=n.lines??[],e=n.compare,t=[...e?wr(e.series,"compare",!0):[],...wr(n.series,"main",!1)],s=r.map(d=>({id:d.id,type:"line",name:d.name,yAxisIndex:1,color:d.color,symbol:"none",showSymbol:!1,step:d.step?"middle":!1,lineStyle:{width:1.5,type:d.dash??"dashed",color:d.color},z:1,connectNulls:!0,data:d.values})),i=[...t,...s],a=new Map(r.map(d=>[d.id,d.format])),c=new Set(n.series.filter(d=>d.inTotal===!1).flatMap(d=>[d.id,_t+d.id])),o=(d,p)=>{let f=p.filter(_=>_.value);if(!f.length)return"";let y=f.map(_=>`${zt(String(_.color??""))}${ge(_.seriesName??"")}: ${n.format(_.value??0)}`),x=f.filter(_=>!c.has(_.seriesId??"")).reduce((_,$)=>_+($.value??0),0);return`<b>${ge(d)}</b><br>${y.join("<br>")}`+(f.length>1?`<br><b>${ge(n.total)}: ${n.format(x)}</b>`:"")},l=d=>{let p=Array.isArray(d)?d:[d],f=document.createElement("div");if(!p.length)return f;let y=p[0].dataIndex,x=k=>a.has(k.seriesId??""),_=k=>(k.seriesId??"").startsWith(_t),$=p.filter(k=>x(k)&&k.value!==null&&k.value!==void 0).map(k=>`${zt(String(k.color??""))}${ge(k.seriesName??"")}: ${a.get(k.seriesId??"")?.(k.value??0)??""}`),A=n.labels[y]?.tooltip??"",D=o(A,p.filter(k=>!x(k)&&!_(k))),w=e?o(e.labels[y]??"",p.filter(k=>_(k))):"",b=[D||`<b>${ge(A)}</b>`];return $.length&&(b[0]+=`<br>${$.join("<br>")}`),w&&b.push(w),f.innerHTML=b.join("<br><br>"),f},h={type:"value",name:n.unit,nameGap:2,nameTextStyle:{align:"left"},axisLabel:{formatter:n.tick},splitLine:{show:!0}},u={type:"value",name:n.lineUnit??"",nameGap:2,nameTextStyle:{align:"right"},axisLabel:{formatter:n.lineTick??n.tick},splitLine:{show:!1}};if(r.length){let d=n.labels.length,p=xr(n.series,d),f=e?xr(e.series,d):p,y=r.flatMap($=>$.values.filter(A=>A!==null)),x=Math.min(0,...y),_=os({min:Math.min(p.min,f.min),max:Math.max(p.max,f.max)},{min:x,max:Math.max(0,...y)});if(_){Object.assign(h,_.bar),Object.assign(u,_.line);let $=n.lineTick??n.tick;x>=0&&(u.axisLabel={formatter:A=>A<0?"":$(A)})}}let g={xAxis:{type:"category",data:n.labels.map(d=>d.axis),axisTick:{show:!1},...n.labelEvery?{axisLabel:{interval:n.labelEvery-1}}:{}},yAxis:r.length?[h,u]:h,grid:{top:15,bottom:0,left:1,right:1,containLabel:!0},legend:{show:!0,type:"custom",data:[...n.series,...r].map(d=>({id:d.id,secondaryIds:e?.series.some(p=>p.id===d.id)?[_t+d.id]:[],name:d.name}))},tooltip:{trigger:"axis",formatter:l}};return{data:i,options:g}}function yt(n){let r=n.reduce((e,t)=>e+Math.max(0,t),0);return n.map(e=>r>0?Math.max(0,e)/r*100:0)}function kr(n){let r=[],e=-Math.PI/2;for(let t of n){let s=e+t/100*2*Math.PI;r.push([e,s]),e=s}return r}function Sr(n){let r=n.items.map(u=>n.hidden.has(u.id)?0:u.value),e=yt(r),t=r.reduce((u,g)=>u+Math.max(0,g),0),s=kr(e),i=n.compare?.map((u,g)=>n.hidden.has(n.items[g].id)?0:u),a=i?yt(i):[],c=kr(a),o=u=>{let g=Math.min(90,u.getWidth()/2-8,u.getHeight()/2-8);return{cx:u.getWidth()/2,cy:u.getHeight()/2,r:g,r0:g*(i?50:40)/70}},l=n.items.map((u,g)=>({id:u.id,type:"custom",name:u.name,coordinateSystem:"none",cursor:"default",color:xe(u.color,.5),data:[[r[g],s[g][0],s[g][1],e[g]]],renderItem:(d,p)=>{let f=p.value(1),y=p.value(2);if(!(y-f>0))return null;let x=o(p),_=[{type:"sector",shape:{...x,startAngle:f,endAngle:y,cornerRadius:4},style:{fill:xe(u.color,.5),stroke:u.color,lineWidth:1}}];if(y-f>=15*Math.PI/180){let $=(f+y)/2,A=Math.cos($)>=0,D=[x.cx+Math.cos($)*x.r,x.cy+Math.sin($)*x.r],w=[x.cx+Math.cos($)*(x.r+10),x.cy+Math.sin($)*(x.r+10)],b=[w[0]+(A?10:-10),w[1]];_.push({type:"polyline",silent:!0,shape:{points:[D,w,b]},style:{stroke:u.color,fill:"none"}},{type:"text",silent:!0,x:b[0]+(A?4:-4),y:b[1],style:{text:`${u.name}
${n.percent(p.value(3))}`,fill:n.labelColor,fontSize:12,lineHeight:16,align:A?"left":"right",verticalAlign:"middle"}})}return{type:"group",children:_}}}));return i&&n.items.forEach((u,g)=>{l.push({id:`compare-${u.id}`,type:"custom",name:u.name,coordinateSystem:"none",cursor:"default",data:[[i[g],c[g][0],c[g][1],a[g]]],renderItem:(d,p)=>{let f=p.value(1),y=p.value(2);if(!(y-f>0))return null;let x=o(p);return{type:"sector",shape:{cx:x.cx,cy:x.cy,r:x.r0,r0:x.r*30/70,startAngle:f,endAngle:y,cornerRadius:4},style:{fill:xe(u.color,50/255),stroke:xe(u.color,127/255),lineWidth:1}}}})}),l.push({id:"total",type:"custom",coordinateSystem:"none",silent:!0,tooltip:{show:!1},data:[[t]],renderItem:(u,g)=>{let d=o(g);return{type:"text",x:d.cx,y:d.cy,style:{text:i?n.format(g.value(0)):`${n.total}
${n.format(g.value(0))}`,fill:n.centerColor,fontSize:i?12:14,lineHeight:24,fontWeight:"bold",align:"center",verticalAlign:"middle"}}}}),{data:l,options:{xAxis:{show:!1},yAxis:{show:!1},legend:{show:!1},tooltip:{show:!0,trigger:"item",formatter:u=>{let g=(u.seriesId??"").startsWith("compare-"),d=g?(u.seriesId??"").slice(8):u.seriesId,p=n.items.findIndex($=>$.id===d);if(p<0)return"";let f=n.items[p],y=document.createElement("div"),x=u.value?.[0]??(g?i?.[p]??0:r[p]),_=u.value?.[3]??(g?a[p]:e[p]);return y.innerHTML=`<b>${ge(f.name)}${g&&n.compared?` \xB7 ${ge(n.compared)}`:""}</b><br>${zt(f.color)}${n.format(x)} (${n.percent(_)})`,y}}}}}var pe={solar:"var(--energy-solar-color, #ff9800)",grid:"var(--energy-grid-consumption-color, #488fc2)",cheap:"color-mix(in srgb, var(--energy-grid-consumption-color, #488fc2) 55%, #fff)",expensive:"color-mix(in srgb, var(--energy-grid-consumption-color, #488fc2) 70%, #000)",export:"var(--energy-grid-return-color, #8353d1)",heat:"var(--graph-color-30, var(--color-30, #bf3947))",car:"var(--energy-non-fossil-color, #0f9d58)"},Cr=["#4269d0","#f4bd4a","#ff725c","#6cc5b0","#a463f2","#ff8ab7","#9c6b4e","#97bbf5","#01ab63","#094bad","#c99000","#d84f3e"];function cs(n){let r=n.trim(),e=/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(r)?.[1];if(e){let s=e.length===3?[...e].map(i=>i+i).join(""):e;return[0,2,4].map(i=>parseInt(s.slice(i,i+2),16))}let t=/^rgba?\(([^)]+)\)/i.exec(r)?.[1];if(t){let[s,i,a]=t.split(/[ ,/]+/).filter(Boolean).map(Number);if([s,i,a].every(Number.isFinite))return[s,i,a]}}var ls=([n,r,e])=>`#${[n,r,e].map(t=>Math.round(Math.min(Math.max(t,0),255)).toString(16).padStart(2,"0")).join("")}`;function Ar(n,r,e){let t=cs(n);if(!t)return n;let s=r==="white"?255:0;return ls(t.map(i=>i*e+s*(1-e)))}function F(n){let r=getComputedStyle(n),e=(i,a)=>r.getPropertyValue(i).trim()||a,t=e("--energy-grid-consumption-color","#488fc2"),s=Array.from({length:54},(i,a)=>{let c=a+1;return r.getPropertyValue(`--graph-color-${c}`).trim()||r.getPropertyValue(`--color-${c}`).trim()||Cr[a%Cr.length]});return{solar:e("--energy-solar-color","#ff9800"),grid:t,cheap:Ar(t,"white",.55),expensive:Ar(t,"black",.7),export:e("--energy-grid-return-color","#8353d1"),batteryOut:e("--energy-battery-out-color","#4db6ac"),batteryIn:e("--energy-battery-in-color","#f06292"),standing:e("--electricity-lens-standing-charge-color","#a1887f"),heat:r.getPropertyValue("--graph-color-30").trim()||e("--color-30","#bf3947"),car:e("--energy-non-fossil-color","#0f9d58"),other:r.getPropertyValue("--history-unknown-color").trim()||e("--disabled-color","#bdbdbd"),line:e("--secondary-text-color","#727272"),consumers:s}}function M(n,r){let e=new Map,t=new Map,s=0;for(let i of n.areas)if(i.kind==="other")e.set(i.id,r.other);else if(i.kind==="device"){let a=r.consumers[s++%r.consumers.length];e.set(i.id,a);let c=i.statistics.energy?.[0];c&&t.set(c,a)}for(let i of n.areas)if(i.kind==="category")if(i.id==="heat_pump")e.set(i.id,r.heat);else{let c=(i.statistics.energy??[]).map(l=>t.get(l)).filter(Boolean),o=i.id==="wallbox"?r.car:r.grid;e.set(i.id,c[c.length-1]??o)}return e}var us=n=>!!n&&typeof n.subscribe=="function";function V(n){if(n!==void 0&&!n.startsWith("energy_"))throw new Error("Collection keys must start with energy_.")}function ds(n,r){let e=location.pathname.split("/")[1]??"",t=n;for(let s of r?[`_${r}`]:[`_energy_${e}`,"_energy"])if(us(t[s]))return t[s]}var hs=()=>new Date().setHours(24,0,0,0)-1;function ke(n,r,e){let t,s,i=0,a=()=>{let c=ds(n,r);if(c){t=c.subscribe(o=>e({start:new Date(o.start).getTime(),end:o.end?new Date(o.end).getTime():hs()},o.startCompare&&o.endCompare?{start:new Date(o.startCompare).getTime(),end:new Date(o.endCompare).getTime()}:void 0));return}i+=1,i===2&&e(null),i<20&&(s=window.setTimeout(a,500))};return a(),()=>{window.clearTimeout(s),t?.()}}var gs={comma_decimal:"en-US",decimal_comma:"de",space_comma:"fr",quote_decimal:"de-CH"};function I(n,r){let e=n?.number_format,t=e==="system"?void 0:gs[e??""]??n?.language??"en";return new Intl.NumberFormat(t,{...r,...e==="none"?{useGrouping:!1}:{}})}function Er(n,r){if(Math.abs(r)<1)return`${I(n,{maximumFractionDigits:0}).format(r*1e3)} W`;let e=Math.abs(r)<100?1:0;return`${I(n,{maximumFractionDigits:e,minimumFractionDigits:e}).format(r)} kW`}function Rr(n){switch(n?.time_format){case"am_pm":return!0;case"24":return!1;case"system":return new Intl.DateTimeFormat(void 0,{hour:"numeric"}).resolvedOptions().hour12;default:return}}function Fr(n){let r=/^([-−+]?[\d.,'’\u00a0\u202f ]*\d)[\u00a0\u202f ](.+)$/.exec(n);return r?[r[1],r[2]]:[n,""]}function se(n,r){let e=(i,a)=>{let c=Math.abs(i),o=a??(c<10?2:c<100?1:0);return I(n,{maximumFractionDigits:o,minimumFractionDigits:a??0}).format(i)};return{number:e,value:(i,a)=>{switch(a){case"energy":return`${e(i,Math.abs(i)<100?1:0)} kWh`;case"money":{let c=Math.abs(i)<100;return I(n,{style:"currency",currency:r,maximumFractionDigits:c?2:0,minimumFractionDigits:c?2:0}).format(i)}case"price":return r==="EUR"?`${e(i*100,1)} ct/kWh`:`${I(n,{style:"currency",currency:r,maximumFractionDigits:3}).format(i)}/kWh`;case"percent":return I(n,{style:"percent",maximumFractionDigits:0}).format(i/100);case"number":return e(i,Math.abs(i)<10?2:Math.abs(i)<100?1:0);case"distance":return`${e(i,Math.abs(i)<100?1:0)} km`;case"per_100km":return`${I(n,{style:"currency",currency:r,maximumFractionDigits:2,minimumFractionDigits:2}).format(i)}/100 km`}},currencySymbol:()=>I(n,{style:"currency",currency:r}).formatToParts(0).find(i=>i.type==="currency")?.value??""}}var It={energy:["energy"],cost:["cost"],bill:["import_cost","standing_charge"],grid_price:["import_cost","energy"],device_grid_price:["cost","solar_cost","energy","solar"],price:["cost","energy","solar"],solar_share:["solar","energy"],cheap_share:["cheap","solar","energy"],expensive_share:["expensive","solar","energy"],cheap_saving:["cheap_saving"],self_consumption:["self_used","energy"],export:["export"],saving:["saving"],heat:["heat"],alternative_cost:["alternative_cost"],scop:["heat","energy"],heat_price:["cost","heat"],distance:["distance"],cost_per_100km:["cost","distance"],forecast_today:[],forecast_tomorrow:[],payback:[],annual_return:[]},ps={energy:["solar","export"],cost:["energy","solar","feed_in","standing_charge"],saving:["solar_saving"],heat:["energy"],distance:["energy"]},ms=Object.keys(It),me=n=>n==="forecast_today"||n==="forecast_tomorrow",fe=n=>n==="payback"||n==="annual_return";function ie(n){return ms.filter(r=>me(r)?n.forecast===!0:fe(r)?n.investment===!0:It[r].every(e=>n.statistics[e]?.length))}function Tr(n,r){return[...It[r],...ps[r]??[]].flatMap(e=>n.statistics[e]??[])}var bt=(n,r)=>r>0?n/r*100:null;function $e(n,r,e,t){let s=e("energy"),i=e("solar"),a=o=>({value:o,unit:"energy"}),c=o=>({value:o,unit:"money"});switch(n){case"energy":{if(s!==null&&i!==null&&s>0){if(r.kind==="household")return{value:s,unit:"energy",line:{key:"line_energy_parts",values:{grid:a(Math.max(s-i,0)),solar:a(i)}}};let l=bt(i,s)??0;return{value:s,unit:"energy",line:{key:"line_solar_part",values:{percent:{value:l,unit:"percent"}}}}}let o=e("export");return r.kind==="grid"&&o!==null?{value:s,unit:"energy",line:{key:"line_exported",values:{energy:a(o)}}}:{value:s,unit:"energy"}}case"cost":{let o=e("cost");if(o!==null&&s&&i!==null)return{value:o,unit:"money",line:{key:"line_average_price",values:{price:{value:o/s,unit:"price"}}}};let l=e("feed_in"),h=e("standing_charge");return o!==null&&l!==null&&h!==null?{value:o,unit:"money",line:{key:Math.abs(h)<.005?"line_bill_no_charge":"line_bill",values:{feed_in:c(l),charge:c(h)}}}:o!==null&&s!==null&&r.kind==="grid"?{value:o,unit:"money",line:{key:"line_for_import",values:{energy:a(s)}}}:{value:o,unit:"money"}}case"bill":{let o=e("import_cost"),l=e("standing_charge");return o===null||l===null?{value:null,unit:"money"}:{value:o+l,unit:"money",line:Math.abs(l)<.005?void 0:{key:"line_bill",values:{charge:c(l)}}}}case"grid_price":{let o=e("import_cost");return o===null||!s?{value:null,unit:"price"}:{value:o/s,unit:"price",line:{key:"line_cost_for",values:{cost:c(o),energy:a(s)}}}}case"device_grid_price":{let o=e("cost"),l=e("solar_cost");if(o===null||l===null||s===null||i===null)return{value:null,unit:"price"};let h=s-i;if(h<=0)return{value:null,unit:"price"};let u=o-l;return{value:u/h,unit:"price",line:{key:"line_cost_for",values:{cost:c(u),energy:a(h)}}}}case"cheap_saving":return{value:e("cheap_saving"),unit:"money",line:{key:"line_against_normal",values:{}}};case"price":{let o=e("cost");return o===null||!s?{value:null,unit:"price"}:{value:o/s,unit:"price",line:{key:"line_cost_for",values:{cost:{value:o,unit:"money"},energy:a(s)}}}}case"solar_share":return s===null||i===null?{value:null,unit:"percent"}:{value:bt(i,s),unit:"percent",line:{key:"line_part_of",values:{part:a(i),whole:a(s)}}};case"cheap_share":case"expensive_share":{let o=e(n==="cheap_share"?"cheap":"expensive");if(s===null||i===null||o===null)return{value:null,unit:"percent"};let l=Math.max(s-i,0);return{value:bt(o,l),unit:"percent",line:{key:"line_part_of",values:{part:a(o),whole:a(l)}}}}case"self_consumption":{let o=e("self_used");return s===null||o===null?{value:null,unit:"percent"}:{value:bt(o,s),unit:"percent",line:{key:"line_part_of",values:{part:a(o),whole:a(s)}}}}case"export":return{value:e("export"),unit:"energy"};case"saving":{let o=e("saving"),l=e("solar_saving");return o===null||l===null?{value:o,unit:"money"}:{value:o+l,unit:"money",line:Math.abs(l)<.005?void 0:{key:"line_saving_split",values:{solar:c(l)}}}}case"heat":{let o=e("heat");return o===null||s===null?{value:o,unit:"energy"}:{value:o,unit:"energy",line:{key:"line_from_electricity",values:{energy:a(s)}}}}case"alternative_cost":return{value:e("alternative_cost"),unit:"money"};case"scop":{let o=e("heat");return o===null||!s?{value:null,unit:"number"}:{value:o/s,unit:"number",line:{key:"line_heat_from",values:{heat:a(o),energy:a(s)}}}}case"heat_price":{let o=e("heat"),l=e("cost");return o===null||l===null||!o?{value:null,unit:"price"}:{value:l/o,unit:"price",line:{key:"line_cost_for",values:{cost:{value:l,unit:"money"},energy:a(o)}}}}case"distance":{let o=e("distance");return o===null||s===null?{value:o,unit:"distance"}:{value:o,unit:"distance",line:{key:"line_charged",values:{energy:a(s)}}}}case"cost_per_100km":{let o=e("distance"),l=e("cost");return o===null||l===null||!o?{value:null,unit:"per_100km"}:{value:l/o*100,unit:"per_100km",line:{key:"line_cost_for",values:{cost:{value:l,unit:"money"},energy:{value:o,unit:"distance"}}}}}case"forecast_today":case"forecast_tomorrow":return{value:t,unit:"energy"};case"payback":case"annual_return":return{value:null,unit:"percent"}}}var Pr=["change","mean","min","max"],U=n=>n.statistic!==void 0?"statistic":n.entity!==void 0?"entity":"energy";function fs(n,r){let e=new Date(n),t=new Date(r),s=c=>Date.UTC(c.getFullYear(),c.getMonth(),c.getDate()),i=Math.round((s(t)-s(e))/864e5),a=c=>c.getTime()-new Date(c).setHours(0,0,0,0);return a(t)<a(e)?i-1:i}function ne({start:n,end:r}){let e=fs(n,r),t=new Date(r);return new Date(n).getDate()===1&&new Date(t.getFullYear(),t.getMonth(),t.getDate()+1).getDate()===1&&e>35?"month":e>2?"day":"hour"}var Se=n=>n==="year"?"month":n,_s=(n,r)=>{let e=new Date(n);return r==="hour"?e.setMinutes(0,0,0):(e.setHours(0,0,0,0),r==="day"||(e.setDate(1),r==="month")?e.getTime():e.setMonth(0))},ys=(n,r)=>{let e=new Date(n);return r==="hour"?e.setHours(e.getHours()+1):r==="day"?e.setDate(e.getDate()+1):r==="month"?e.setMonth(e.getMonth()+1):e.setFullYear(e.getFullYear()+1),e.getTime()};function Lt({start:n,end:r},e){let t=[];for(let s=_s(n,e);s<=r&&t.length<400;s=ys(s,e))t.push(s);return t}function Dr(n,r=new Date){let e=n.filter(s=>s!==null).map(s=>s.getFullYear()),t=Math.min(r.getFullYear(),...e);return{start:new Date(t,0,1).getTime(),end:new Date(r.getFullYear()+1,0,1).getTime()-1}}var Mr=2e3;function zr(n,r){for(let e=0;e<r;e+=1)if(n.some(t=>t[e]!==null&&t[e]!==void 0))return e;return 0}function Ot(n,r,e){let t=r.map(()=>null),s=e==="hour"?0:12*36e5;for(let i of n??[]){if(i.change===null||i.change===void 0)continue;let a=(typeof i.start=="number"?i.start:Date.parse(i.start))+s,c=-1;for(let o=0;o<r.length&&r[o]<=a;o+=1)c=o;c<0||(t[c]=(t[c]??0)+i.change)}return t}function B(n,r=new Date){let e=(a,c)=>({start:a.getTime(),end:c.getTime()-1}),t=r.getFullYear(),s=r.getMonth(),i=r.getDate();switch(n){case"today":return e(new Date(t,s,i),new Date(t,s,i+1));case"yesterday":return e(new Date(t,s,i-1),new Date(t,s,i));case"this_month":return e(new Date(t,s,1),new Date(t,s+1,1));case"last_month":return e(new Date(t,s-1,1),new Date(t,s,1));case"this_year":return e(new Date(t,0,1),new Date(t+1,0,1));case"last_year":return e(new Date(t-1,0,1),new Date(t,0,1))}}function Ir(n,r,e){let t=r.map(()=>0),s=r.map(()=>0),i=e==="hour"?0:12*36e5;for(let a of n??[]){if(a.mean===null||a.mean===void 0)continue;let c=(typeof a.start=="number"?a.start:Date.parse(a.start))+i,o=-1;for(let l=0;l<r.length&&r[l]<=c;l+=1)o=l;o<0||(t[o]+=a.mean,s[o]+=1)}return t.map((a,c)=>s[c]?a/s[c]:null)}var R="electricity_lens",Ce=["pv","heat_pump","wallbox"],X=n=>{if(n==null||n==="")return null;let r=Number(n);return Number.isFinite(r)?r:null},vs=n=>typeof n=="string"&&n?new Date(n):null;function L(n){let r=Object.values(n.entities??{}).filter(i=>i.platform===R),e=(i,a)=>r.find(c=>c.device_id===i&&c.translation_key===a),t=i=>i?X(n.states[i]?.state):null,s=[];for(let i of r){if(i.translation_key!=="saving")continue;let a=n.states[i.entity_id];if(!a||a.state==="unavailable")continue;let c=a.attributes,o=c.category;Ce.includes(o)&&s.push({category:o,savingStatistic:typeof c.statistic_id=="string"?c.statistic_id:`${R}:${o}_saving`,calculating:c.calculating===!0,saving:X(a.state),investment:X(c.investment),balance:X(c.balance),perYear:t(e(i.device_id,"saving_per_year")?.entity_id),countingSince:vs(c.counting_since),entityId:i.entity_id,heating:c.heating==="gas"||c.heating==="oil"?c.heating:null})}return s.sort((i,a)=>Ce.indexOf(i.category)-Ce.indexOf(a.category))}function wt(n){let r=Object.values(n.entities??{}).filter(e=>e.platform===R);return r.filter(e=>e.translation_key==="saving").flatMap(e=>{let t=n.states[e.entity_id]?.attributes,s=o=>r.find(l=>l.device_id===e.device_id&&l.translation_key===o)?.entity_id,i=s("payback"),a=s("annual_return"),c=t?.category;return Ce.includes(c)&&Number(t?.investment)>0&&i&&a?[{category:c,payback:i,annualReturn:a}]:[]}).sort((e,t)=>Ce.indexOf(e.category)-Ce.indexOf(t.category))}var Ze=n=>n==="pv"?"solar":n;function Ht(n){let r=Object.values(n.entities??{}).find(t=>t.platform===R&&t.translation_key==="balance"),e=r?n.states[r.entity_id]:void 0;return!e||e.state==="unavailable"?null:{balance:X(e.state),saved:X(e.attributes.saved)??0,invested:X(e.attributes.invested)??0,perYear:X(e.attributes.per_year),progress:X(e.attributes.progress),entityId:r.entity_id}}var Ae=(n,r)=>(n?Ht(n)?.progress:null)??r?.progress??null;function Ee(n){return Object.values(n.entities??{}).some(e=>e.platform===R&&e.translation_key==="saving")?"integration_unavailable":"not_set_up"}var bs=300*1e3,W=5*1e3,_e,Nt,K=()=>_e?.value;function N(){if(!_e)return!0;let n=_e.value&&!_e.value.calculating?bs:W;return Date.now()-_e.at>n}function G(n){return N()?(Nt??=n.callWS({type:`${R}/figures`}).then(r=>r).catch(()=>null).then(r=>(_e={at:Date.now(),value:r},Nt=void 0,r)),Nt):Promise.resolve(_e?.value??null)}var ws=6e4,Lr=new WeakMap;function xs(n){let r=n.entities??{},e=Lr.get(r);return e||(e=Object.values(r).filter(t=>t.platform===R).map(t=>t.entity_id),Lr.set(r,e)),e}var H=class extends T{constructor(){super(...arguments);this._lookedAt=0}_watched(){return[]}_changedFor(e,t){return e.locale!==t.locale||e.language!==t.language||e.config!==t.config||e.themes!==t.themes||e.selectedTheme!==t.selectedTheme||e.entities!==t.entities||[...xs(t),...this._watched()].some(s=>e.states[s]!==t.states[s])}shouldUpdate(e){let t=e.get("hass"),s=e.size===1&&t!==void 0&&this.hass!==void 0,i=Date.now()-this._lookedAt>=ws;return s&&!i&&!this._changedFor(t,this.hass)?!1:(this._lookedAt=Date.now(),!0)}};var Vt={title:"Economics","category.pv":"PV plant","category.heat_pump":"Heat pump","category.wallbox":"Electric car",not_set_up:"Set up the Electricity Lens integration to see what your PV plant, heat pump, and electric car have saved.",integration_unavailable:"The figures aren't available right now. Check Electricity Lens under Settings > Devices & services.",calculating:"Being computed \u2026",calculating_progress:"Being computed \u2026 {percent} %",loading:"Loading \u2026",column_area:"Area",column_per_year:"Per year",column_saving:"Saving",column_investment:"Investment",column_balance:"Balance",total:"Total",average:"\xD8 {amount}",line_payback:"of {investment}",line_payback_left:"about {time} left",line_return:"Total {amount}",return_value:"{rate} % a year",months_one:"1 month",months_other:"{count} months",years_one:"1 year",years_other:"{count} years",savings_title:"Savings",savings_source:"Saved by",savings_energy:"Energy",savings_amount:"Amount",savings_total:"Total",savings_pv:"Solar power instead of grid power",savings_feed_in:"Feed-in",savings_gas:"Electricity instead of gas",savings_oil:"Electricity instead of oil",savings_fuel:"Electricity instead of fuel",savings_instead_gas:"A gas heating would have cost",savings_instead_oil:"An oil heating would have cost",savings_instead_fuel:"A combustion car would have cost",savings_electricity:"{name} electricity costs",savings_solar_part:"of which by solar power",savings_saved:"Saved",savings_in_balance:"of which in the balance",meters_consumer:"Device",meters_electricity:"Electricity",history_title:"Savings over time",history_total:"Total",history_no_chart:"The chart is only shown in Home Assistant.",history_failed:"The statistics could not be loaded.",history_empty:"No savings in this period.",figures_failed:"The figures could not be loaded.",figures_not_loaded:"not loaded",figures_unavailable:"not available","figure.energy":"Consumption","figure.energy.grid":"Grid import","figure.energy.solar":"Solar production","figure.cost":"Costs","figure.cost.grid":"Grid costs","figure.bill":"Electricity bill","figure.grid_price":"Average grid price","figure.device_grid_price":"Average grid price","figure.price":"Average price","figure.solar_share":"Solar share","figure.solar_share.household":"Self-sufficiency","figure.cheap_share":"Grid cheap","figure.expensive_share":"Grid expensive","figure.cheap_saving":"Tariff saving","figure.self_consumption":"Self-consumption","figure.export":"Feed-in","figure.saving":"Saving","figure.payback":"Payback","figure.annual_return":"Return","figure.forecast_today":"Forecast today","figure.forecast_tomorrow":"Forecast tomorrow","figure.heat":"Heat","figure.alternative_cost":"Comparison costs","figure.scop":"Seasonal COP","figure.heat_price":"Heat price","figure.distance":"Distance","figure.cost_per_100km":"Costs per 100 km",line_saving_split:"of which {solar} by solar",line_bill:"{charge} standing charge",line_bill_no_charge:"feed-in \u2212{feed_in}",line_against_normal:"vs. normal price",line_from_electricity:"from {energy} electricity",line_heat_from:"{heat} from {energy}",line_charged:"with {energy} charged",line_solar_part:"{percent} of it solar power",line_energy_parts:"Grid {grid} + solar {solar}",line_exported:"{energy} fed in",line_average_price:"average {price}",line_for_import:"for {energy} imported",line_cost_for:"{cost} for {energy}",line_part_of:"{part} of {whole}","value.change":"total in the period","value.mean":"average","value.min":"minimum","value.max":"maximum",value_range:"from {min} to {max}","period.energy_date":"Follow the date selection","period.today":"Today","period.yesterday":"Yesterday","period.this_month":"This month","period.last_month":"Last month","period.this_year":"This year","period.last_year":"Last year","period.all":"All years",editor_title:"Title (optional)",editor_period:"Period",editor_period_hint:"Without a date selection on the dashboard: this month.",editor_period_hint_years:"Without a date selection on the dashboard: all years.",editor_source:"Source","source.energy":"Energy data","source.statistic":"Statistic","source.entity":"Entity",editor_area:"Area",editor_figure:"Figure",editor_statistic:"Statistic",editor_value:"Value",editor_secondary:"Line below","secondary.none":"Default","secondary.range":"Range of the period",editor_entity:"Entity",editor_name:"Name (optional)",editor_not_loaded:"Energy data need the Electricity Lens integration.","source.solar":"Solar power","source.grid":"Grid power","source.normal":"Grid normal","source.cheap":"Grid cheap","source.expensive":"Grid expensive","source.export":"Feed-in","source.standing_charge":"Standing charge","stack.source":"By source","stack.bill":"By bill item","stack.consumer":"By device","stack.none":"None",editor_savings:"Savings of all categories",editor_stack:"Split",editor_line:"Line",editor_lines:"Further lines",editor_line_none:"None",history_empty_figure:"No data in this period.",breakdown_mix:"Electricity mix",breakdown_cost_by_device:"Costs by device",breakdown_energy_by_device:"Consumption by device",breakdown_compared:"Compared {amount}",breakdown_compare_period:"compared period",breakdown_total:"Total","mix.solar":"Solar","mix.grid":"Grid","mix.normal":"Grid normal","mix.cheap":"Grid cheap","mix.expensive":"Grid expensive",editor_by:"Split","by.source":"By source","by.consumer":"By device",editor_display:"Display","display.ring":"Ring","display.bars":"Bars",editor_color_by_source:"Color the bars by source",editor_breakdown_source:"Data","breakdown_source.energy":"Energy data","breakdown_source.statistics":"Statistics",editor_statistics:"Statistics","figure_choice.energy":"Consumption","figure_choice.cost":"Costs","strategy.title":"Electricity","strategy.overview":"Now","strategy.electricity":"Consumption","strategy.forecast_today":"Solar remaining today","strategy.forecast_tomorrow":"Solar forecast tomorrow","strategy.cost_today":"Costs today","strategy.consumption_today":"Consumption today","strategy.payback_pv":"PV payback","strategy.payback_heat_pump":"HP payback","strategy.payback_wallbox":"Car payback","strategy.return_pv":"PV return","strategy.return_heat_pump":"HP return","strategy.return_wallbox":"Car return","strategy.charged_energy":"Charged energy","strategy.charging_cost":"Charging costs","strategy.bill":"Electricity bill","strategy.cost_with_solar":"Electricity costs incl. solar","strategy.cost_history":"Costs over time","strategy.cost_distribution":"Cost distribution","strategy.price_with_solar":"Average price incl. solar","strategy.costs":"Costs","strategy.heating":"Heating","strategy.charging":"Charging","strategy.usage_graph":"Consumption by source","strategy.solar_graph":"Solar production","strategy.devices_graph":"Consumption over time","strategy.distribution":"Power flow","strategy.not_loaded":"Set up the Electricity Lens integration to see this dashboard.","flow.title":"Power right now","flow.consumption":"Consumption {power}","flow.from":"From","flow.to":"To","flow.battery":"Battery","flow.other":"Other","flow.idle":"No power is flowing right now.","flow.grid":"All power comes from the grid.","flow.share_solar":"The PV plant covers {share}, {grid} come from the grid.","flow.share_battery":"The battery covers {share}, {grid} come from the grid.","flow.share_both":"PV plant and battery cover {share}, {grid} come from the grid.","flow.covered_solar":"The PV plant covers all consumption","flow.covered_battery":"The battery covers all consumption","flow.covered_both":"PV plant and battery cover all consumption","flow.surplus_grid":"{power} go to the grid","flow.surplus_battery":"{power} go to the battery","flow.surplus_both":"{grid} go to the grid, {battery} to the battery","flow.no_sensor":"Add a power sensor for the grid in the energy dashboard to see where electricity flows right now.","flow.unavailable":"The power can't be read right now.","picker.flow":"Electricity Lens power flow","picker.flow.description":"Where the power comes from right now and where it goes, as two bars, from the energy dashboard's power sensors.","picker.economics":"Electricity Lens economics","picker.economics.description":"What your PV plant, heat pump, and electric car have saved, against what they cost.","picker.savings":"Electricity Lens savings","picker.savings.description":"What solar power, the heat pump, and the electric car saved in the selected period, as a table, or one area's saving reckoned up. Follows the energy date selection.","picker.heat_meters":"Electricity Lens heat meters","picker.heat_meters.description":"Heat, electricity, and seasonal COP of each of the heat pump's meters in the selected period. Follows the energy date selection.","picker.history":"Electricity Lens history","picker.history.description":"Savings, consumption, or costs per period as bars, stacked by source or consumer, with lines. Follows the energy date selection.","picker.figures":"Electricity Lens key figures","picker.figures.description":"One key figure for a period: costs, solar share, cheap grid power, savings, or any statistic or entity.","picker.breakdown":"Electricity Lens breakdown","picker.breakdown.description":"Shares for a period as a ring or bars: the electricity mix, consumption or costs by consumer, or any statistics.","picker.dashboard":"Electricity Lens","picker.dashboard.description":"A finished electricity dashboard with costs, electricity mix, solar, heat pump, car, and the balance."},ks={title:"Wirtschaftlichkeit","category.pv":"PV-Anlage","category.heat_pump":"W\xE4rmepumpe","category.wallbox":"E-Auto",not_set_up:"Richte die Integration Electricity Lens ein, um zu sehen, was PV-Anlage, W\xE4rmepumpe und E-Auto gespart haben.",integration_unavailable:"Die Zahlen sind gerade nicht verf\xFCgbar. Pr\xFCfe Electricity Lens unter Einstellungen > Ger\xE4te & Dienste.",calculating:"Wird berechnet \u2026",calculating_progress:"Wird berechnet \u2026 {percent} %",loading:"Wird geladen \u2026",column_area:"Bereich",column_per_year:"Pro Jahr",column_saving:"Ersparnis",column_investment:"Investition",column_balance:"Bilanz",total:"Summe",average:"\xD8 {amount}",line_payback:"von {investment}",line_payback_left:"noch etwa {time}",line_return:"Gesamt {amount}",return_value:"{rate} % p. a.",months_one:"1 Monat",months_other:"{count} Monate",years_one:"1 Jahr",years_other:"{count} Jahre",savings_title:"Ersparnis",savings_source:"Ersparnis durch",savings_energy:"Energie",savings_amount:"Betrag",savings_total:"Gesamt",savings_pv:"PV-Strom statt Netzstrom",savings_feed_in:"Einspeisung",savings_gas:"Strom statt Gas",savings_oil:"Strom statt \xD6l",savings_fuel:"Strom statt Sprit",savings_instead_gas:"Gasheizung h\xE4tte gekostet",savings_instead_oil:"\xD6lheizung h\xE4tte gekostet",savings_instead_fuel:"Verbrenner h\xE4tte gekostet",savings_electricity:"Stromkosten {name}",savings_solar_part:"davon durch PV",savings_saved:"Gespart",savings_in_balance:"davon in der Bilanz",meters_consumer:"Ger\xE4t",meters_electricity:"Strom",history_title:"Ersparnisverlauf",history_total:"Summe",history_no_chart:"Das Diagramm erscheint nur in Home Assistant.",history_failed:"Die Statistik konnte nicht geladen werden.",history_empty:"Keine Ersparnis in diesem Zeitraum.",figures_failed:"Die Kennzahlen konnten nicht geladen werden.",figures_not_loaded:"nicht geladen",figures_unavailable:"nicht verf\xFCgbar","figure.energy":"Verbrauch","figure.energy.grid":"Netzbezug","figure.energy.solar":"PV-Erzeugung","figure.cost":"Kosten","figure.cost.grid":"Netzkosten","figure.bill":"Stromrechnung","figure.grid_price":"\xD8 Netzpreis","figure.device_grid_price":"\xD8 Netzpreis","figure.price":"\xD8 Strompreis","figure.solar_share":"PV-Anteil","figure.solar_share.household":"Autarkie","figure.cheap_share":"Netz g\xFCnstig","figure.expensive_share":"Netz teuer","figure.cheap_saving":"Tarifersparnis","figure.self_consumption":"Eigenverbrauch","figure.export":"Einspeisung","figure.saving":"Ersparnis","figure.payback":"Amortisation","figure.annual_return":"Rendite","figure.forecast_today":"Prognose heute","figure.forecast_tomorrow":"Prognose morgen","figure.heat":"W\xE4rme","figure.alternative_cost":"Vergleichskosten","figure.scop":"JAZ","figure.heat_price":"W\xE4rmepreis","figure.distance":"Strecke","figure.cost_per_100km":"Kosten pro 100 km",line_saving_split:"davon {solar} durch PV",line_bill:"inkl. {charge} Grundpreis",line_bill_no_charge:"Einspeisung \u2212{feed_in}",line_against_normal:"zum Normalpreis",line_from_electricity:"aus {energy} Strom",line_heat_from:"{heat} aus {energy}",line_charged:"mit {energy} geladen",line_solar_part:"davon {percent} PV-Strom",line_energy_parts:"Netz {grid} + PV {solar}",line_exported:"{energy} eingespeist",line_average_price:"\xD8 {price}",line_for_import:"f\xFCr {energy} Netzbezug",line_cost_for:"{cost} f\xFCr {energy}",line_part_of:"{part} von {whole}","value.change":"Summe im Zeitraum","value.mean":"Mittelwert","value.min":"Minimum","value.max":"Maximum",value_range:"von {min} bis {max}","period.energy_date":"Der Datumsauswahl folgen","period.today":"Heute","period.yesterday":"Gestern","period.this_month":"Dieser Monat","period.last_month":"Letzter Monat","period.this_year":"Dieses Jahr","period.last_year":"Letztes Jahr","period.all":"Alle Jahre",editor_title:"Titel (optional)",editor_period:"Zeitraum",editor_period_hint:"Ohne Datumsauswahl auf dem Dashboard: dieser Monat.",editor_period_hint_years:"Ohne Datumsauswahl auf dem Dashboard: alle Jahre.",editor_source:"Quelle","source.energy":"Energiedaten","source.statistic":"Statistik","source.entity":"Entit\xE4t",editor_area:"Bereich",editor_figure:"Gr\xF6\xDFe",editor_statistic:"Statistik",editor_value:"Wert",editor_secondary:"Unterzeile","secondary.none":"Standard","secondary.range":"Spanne im Zeitraum",editor_entity:"Entit\xE4t",editor_name:"Name (optional)",editor_not_loaded:"Energiedaten brauchen die Integration Electricity Lens.","source.solar":"PV-Strom","source.grid":"Netzstrom","source.normal":"Netz normal","source.cheap":"Netz g\xFCnstig","source.expensive":"Netz teuer","source.export":"Einspeisung","source.standing_charge":"Grundpreis","stack.source":"Nach Quelle","stack.bill":"Nach Rechnungsposten","stack.consumer":"Nach Ger\xE4t","stack.none":"Keine",editor_savings:"Ersparnisse aller Kategorien",editor_stack:"Aufteilen",editor_line:"Linie",editor_lines:"Weitere Linien",editor_line_none:"Keine",history_empty_figure:"Keine Daten in diesem Zeitraum.",breakdown_mix:"Strommix",breakdown_cost_by_device:"Kosten nach Ger\xE4t",breakdown_energy_by_device:"Verbrauch nach Ger\xE4t",breakdown_compared:"Vergleich {amount}",breakdown_compare_period:"Vergleichszeitraum",breakdown_total:"Gesamt","mix.solar":"PV","mix.grid":"Netz","mix.normal":"Netz normal","mix.cheap":"Netz g\xFCnstig","mix.expensive":"Netz teuer",editor_by:"Aufteilen","by.source":"Nach Quelle","by.consumer":"Nach Ger\xE4t",editor_display:"Darstellung","display.ring":"Ring","display.bars":"Balken",editor_color_by_source:"Balken nach Quelle f\xE4rben",editor_breakdown_source:"Daten","breakdown_source.energy":"Energiedaten","breakdown_source.statistics":"Statistiken",editor_statistics:"Statistiken","figure_choice.energy":"Verbrauch","figure_choice.cost":"Kosten","strategy.title":"Strom","strategy.overview":"Jetzt","strategy.electricity":"Verbrauch","strategy.forecast_today":"PV-Rest heute","strategy.forecast_tomorrow":"PV-Prognose morgen","strategy.cost_today":"Kosten heute","strategy.consumption_today":"Verbrauch heute","strategy.payback_pv":"PV-Amortisation","strategy.payback_heat_pump":"WP-Amortisation","strategy.payback_wallbox":"Auto-Amortisation","strategy.return_pv":"PV-Rendite","strategy.return_heat_pump":"WP-Rendite","strategy.return_wallbox":"Auto-Rendite","strategy.charged_energy":"Geladene Energie","strategy.charging_cost":"Ladekosten","strategy.bill":"Stromrechnung","strategy.cost_with_solar":"Stromkosten inkl. PV","strategy.cost_history":"Kostenverlauf","strategy.cost_distribution":"Kostenverteilung","strategy.price_with_solar":"\xD8 Preis inkl. PV","strategy.costs":"Kosten","strategy.heating":"Heizen","strategy.charging":"Laden","strategy.usage_graph":"Verbrauch nach Quelle","strategy.solar_graph":"PV-Erzeugung","strategy.devices_graph":"Verbrauchsverlauf","strategy.distribution":"Stromfluss","strategy.not_loaded":"Richte die Integration Electricity Lens ein, um dieses Dashboard zu sehen.","flow.title":"Strom gerade","flow.consumption":"Verbrauch {power}","flow.from":"Woher","flow.to":"Wohin","flow.battery":"Batterie","flow.other":"Sonstiges","flow.idle":"Gerade flie\xDFt kein Strom.","flow.grid":"Der ganze Strom kommt aus dem Netz.","flow.share_solar":"Die PV-Anlage deckt {share}, {grid} kommen aus dem Netz.","flow.share_battery":"Die Batterie deckt {share}, {grid} kommen aus dem Netz.","flow.share_both":"PV-Anlage und Batterie decken {share}, {grid} kommen aus dem Netz.","flow.covered_solar":"Die PV-Anlage deckt den ganzen Verbrauch","flow.covered_battery":"Die Batterie deckt den ganzen Verbrauch","flow.covered_both":"PV-Anlage und Batterie decken den ganzen Verbrauch","flow.surplus_grid":"{power} gehen ins Netz","flow.surplus_battery":"{power} gehen in die Batterie","flow.surplus_both":"{grid} gehen ins Netz, {battery} in die Batterie","flow.no_sensor":"Gib im Energie-Dashboard einen Leistungssensor f\xFCr das Netz an, um zu sehen, wohin der Strom gerade flie\xDFt.","flow.unavailable":"Die Leistung l\xE4sst sich gerade nicht lesen.","picker.flow":"Electricity Lens Leistungsfluss","picker.flow.description":"Woher der Strom gerade kommt und wohin er geht, als zwei Balken, aus den Leistungssensoren des Energie-Dashboards.","picker.economics":"Electricity Lens Wirtschaftlichkeit","picker.economics.description":"Was PV-Anlage, W\xE4rmepumpe und E-Auto gespart haben, gegen das, was sie gekostet haben.","picker.savings":"Electricity Lens Ersparnis","picker.savings.description":"Was Solarstrom, W\xE4rmepumpe und E-Auto im gew\xE4hlten Zeitraum gespart haben, als Tabelle, oder die Ersparnis eines Bereichs nachgerechnet. Folgt der Datumsauswahl.","picker.heat_meters":"Electricity Lens W\xE4rmez\xE4hler","picker.heat_meters.description":"W\xE4rme, Strom und Jahresarbeitszahl jedes Z\xE4hlers der W\xE4rmepumpe im gew\xE4hlten Zeitraum. Folgt der Datumsauswahl.","picker.history":"Electricity Lens Verlauf","picker.history.description":"Ersparnis, Verbrauch oder Kosten je Zeitraum als Balken, nach Quelle oder Verbraucher gestapelt, mit Linien. Folgt der Datumsauswahl.","picker.figures":"Electricity Lens Kennzahl","picker.figures.description":"Eine Kennzahl f\xFCr einen Zeitraum: Kosten, PV-Anteil, g\xFCnstiger Netzstrom, Ersparnis oder eine beliebige Statistik oder Entit\xE4t.","picker.breakdown":"Electricity Lens Aufteilung","picker.breakdown.description":"Anteile eines Zeitraums als Ring oder Balken: der Strommix, Verbrauch oder Kosten nach Verbraucher, oder beliebige Statistiken.","picker.dashboard":"Electricity Lens","picker.dashboard.description":"Ein fertiges Strom-Dashboard mit Kosten, Strommix, PV, W\xE4rmepumpe, Auto und der Bilanz."},$s={en:Vt,de:ks},ee=n=>n in Vt;function S(n){let r=$s[n.split("-")[0]]??Vt;return(e,t={})=>r[e].replace(/\{(\w+)\}/g,(s,i)=>t[i]??"")}var ae=(n,r)=>r===null?n("calculating"):n("calculating_progress",{percent:String(r)});var z=C`
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
`,Re=C`
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
  @container (max-width: 480px) {
    .swatch-cell {
      display: none;
    }
    .swatch-cell + .name {
      padding-inline-start: 16px;
    }
  }
`;var oe=["energy_date","today","yesterday","this_month","last_month","this_year","last_year"];function j(n,r,e){let t=`figure.${r}.${e.kind}`,s=n(ee(t)?t:`figure.${r}`);return["device","other","category"].includes(e.kind)?`${e.name} ${s}`:s}var Ss=300*1e3,Ut=n=>n.toDateString();function Cs(n){let r=new Date,e=Ut(r),t=Ut(new Date(r.getFullYear(),r.getMonth(),r.getDate()+1)),s={today:null,tomorrow:null};for(let i of Object.values(n??{}))for(let[a,c]of Object.entries(i.wh_hours??{})){let o=Ut(new Date(a));o===e&&(s.today=(s.today??0)+c/1e3),o===t&&(s.tomorrow=(s.tomorrow??0)+c/1e3)}return s}var Fe=class extends H{constructor(){super(...arguments);this._infoLoading=!1}static getStubConfig(){return{period:"energy_date",area:"household",figure:"cost"}}static getConfigElement(){return document.createElement("electricity-lens-figures-card-editor")}setConfig(e){V(e?.collection_key),this._config=e}getCardSize(){return 2}getGridOptions(){return{columns:6,min_columns:6}}connectedCallback(){super.connectedCallback(),this._follow()}disconnectedCallback(){super.disconnectedCallback(),this._unfollow?.(),this._unfollow=void 0,clearTimeout(this._retryTimer),this._retryTimer=void 0}_watched(){return[this._config?.entity,this._config?.statistic].filter(e=>e!==void 0)}get _localize(){return S(this.hass?.locale?.language??this.hass?.language??"en")}get _language(){return this.hass?.locale?.language??"en"}get _period(){return this._config?.period??"energy_date"}get _hasPeriod(){let{figure:e}=this._config??{};return!!this._config&&U(this._config)!=="entity"&&!(e&&(me(e)||fe(e)))}_follow(){this._period!=="energy_date"||!this._hasPeriod||this._unfollow||!this.isConnected||!this.hass?.connection||(this._unfollow=ke(this.hass.connection,this._config?.collection_key,e=>{this._selected=e}))}_range(){let e=this._period;if(!this._hasPeriod)return B("today");if(e!=="energy_date")return B(e);if(this._selected!==void 0)return this._selected??B("this_month")}_area(e){return this._info?.areas.find(t=>t.id===e)}_figure(e){let t=this._area(e.area);if(!(!t||!e.figure||!ie(t).includes(e.figure)))return{area:t,figure:e.figure}}async _loadInfo(){!this.hass||this._infoLoading||(this._infoLoading=!0,this._info=await G(this.hass),this._infoLoading=!1,clearTimeout(this._retryTimer),this._retryTimer=void 0,this.isConnected&&(!this._info||this._info.calculating)&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),W)))}_request(){let e=this._range(),t=this._config;if(!e||!t)return;let s=U(t);if(s==="entity"||t.figure&&fe(t.figure)||s==="energy"&&!this._info)return;let i=new Set,a=new Set,c=!1;if(s==="statistic"&&t.statistic)i.add(t.statistic),a.add(t.statistic);else if(s==="energy"){let l=this._figure(t);l&&(c=me(l.figure),this._info?.calculating||Tr(l.area,l.figure).forEach(h=>i.add(h)))}let o=[...i].sort();return{key:JSON.stringify([o,e.start,e.end,c]),range:e,ids:o,statistics:[...a].sort(),forecast:c}}async _load(e){if(!this.hass)return;this._loading=e.key;let t=Se(ne(e.range)),s={key:e.key,at:Date.now(),range:e.range,period:t,rows:{},metadata:{},forecast:{today:null,tomorrow:null},failed:!1};try{let[i,a,c]=await Promise.all([e.ids.length?this.hass.callWS({type:"recorder/statistics_during_period",start_time:new Date(e.range.start).toISOString(),end_time:new Date(e.range.end+1).toISOString(),statistic_ids:e.ids,period:t,types:e.statistics.length?["change","mean","min","max"]:["change"],units:{energy:"kWh"}}):Promise.resolve({}),e.statistics.length?this.hass.callWS({type:"recorder/get_statistics_metadata",statistic_ids:e.statistics}):Promise.resolve([]),e.forecast?this.hass.callWS({type:"energy/solar_forecast"}):Promise.resolve({})]);s.rows=i,s.metadata=Object.fromEntries(a.map(o=>[o.statistic_id,o])),s.forecast=Cs(c)}catch{s.failed=!0}this._loading===e.key&&(this._loading=void 0,this._loaded=s)}willUpdate(e){if(!this.hass)return;(e.has("hass")||e.has("_config"))&&this._follow(),this._info===void 0&&(this._info=K()),N()&&!this._infoLoading?this._loadInfo():this.isConnected&&this._info?.calculating&&!this._retryTimer&&!this._infoLoading&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),W));let t=this._request(),s=!this._loaded||Date.now()-this._loaded.at>Ss;t&&t.key!==this._loading&&(t.key!==this._loaded?.key||s&&!this._loading)&&this._load(t)}get _fmt(){return se(this.hass?.locale,this.hass?.config.currency??"EUR")}_number(e,t){return this._fmt.number(e,t)}_format(e,t){return this._fmt.value(e,t)}_rows(e){let t=this._loaded;if(!t)return[];let s=t.period==="hour"?0:12*36e5;return(t.rows[e]??[]).filter(i=>{let a=(typeof i.start=="number"?i.start:Date.parse(i.start))+s;return a>=t.range.start&&a<=t.range.end})}_sum(e){let t=0;for(let s of e??[])for(let i of this._rows(s))t+=i.change??0;return t}_energyCard(e){let t=this._localize,s=this._figure(e);if(!s){let u=`figure.${e.figure??""}`,g=e.name??(ee(u)?t(u):e.figure??"");return this._info===void 0?this._card(g,"\u2026"):this._card(g,"\u2013",t("figures_unavailable"))}let{area:i,figure:a}=s,c=e.name??j(this._localize,a,i);if(fe(a))return this._investmentCard(c,a,i);if(this._info?.calculating&&!me(a))return this._card(c,"\u2026",ae(t,Ae(this.hass,this._info)));if(!this._loaded)return this._card(c,"\u2026");if(this._loaded.failed)return this._card(c,"\u2013",t("figures_not_loaded"));let o=a==="forecast_today"?this._loaded.forecast.today:a==="forecast_tomorrow"?this._loaded.forecast.tomorrow:null,l=$e(a,i,u=>i.statistics[u]?this._sum(i.statistics[u]):null,o),h=l.line?t(l.line.key,Object.fromEntries(Object.entries(l.line.values).map(([u,g])=>[u,this._format(g.value,g.unit)]))):void 0;return this._card(c,l.value===null?"\u2013":this._format(l.value,l.unit),e.secondary==="none"?void 0:h)}_statisticCard(e){let t=this._localize,s=e.statistic??"",i=this._loaded?.metadata[s],a=e.name??i?.name??this.hass?.states[s]?.attributes.friendly_name;if(!this._loaded)return this._card(a??"\xA0","\u2026");let c=a??s,o=this._rows(s),l=i?.unit_class==="energy"?"kWh":i?.statistics_unit_of_measurement??"",h=f=>f===null?"\u2013":`${this._number(f)}${l?` ${l}`:""}`,u=f=>o.map(y=>y[f]).filter(y=>typeof y=="number"),g=e.value??"change",d=null;if(g==="change")d=o.length?o.reduce((f,y)=>f+(y.change??0),0):null;else if(g==="mean"){let f=u("mean");d=f.length?f.reduce((y,x)=>y+x,0)/f.length:null}else{let f=u(g);d=f.length?g==="min"?Math.min(...f):Math.max(...f):null}let p=g==="change"?void 0:t(`value.${g}`);if(e.secondary==="range"){let f=u("min"),y=u("max");f.length&&y.length&&(p=t("value_range",{min:h(Math.min(...f)),max:h(Math.max(...y))}))}return this._loaded.failed?this._card(c,"\u2013",t("figures_not_loaded")):this._card(c,h(d),e.secondary==="none"?void 0:p)}_entityCard(e){let t=this._localize,s=this.hass?.states[e.entity??""],i=e.name??s?.attributes.friendly_name??e.entity??"";if(!s)return this._card(i,"\u2013",t("figures_unavailable"));let a=Number(s.state),c=this.hass?.config.currency??"",o=s.attributes.unit_of_measurement?.replace(c,c?this._fmt.currencySymbol():""),l=s.state!==""&&Number.isFinite(a),h=this._fmt.currencySymbol(),u=l?o&&o===h?this._format(a,"money"):`${this._number(a)}${o?` ${o}`:""}`:["unknown","unavailable",""].includes(s.state)?"\u2013":s.state;return this._card(i,u,void 0,e.entity)}_investmentCard(e,t,s){let i=this._localize,a=wt(this.hass).find(u=>Ze(u.category)===s.id),c=t==="payback"?a?.payback:a?.annualReturn,o=c?this.hass?.states[c]:void 0,l=Number(o?.state);if(!o||!Number.isFinite(l))return this._card(e,"\u2013",void 0,c);if(t==="payback"){let u=l<100?Math.floor(l):l;return this._card(e,this._format(u,"percent"),this._paybackLine(o.attributes),c)}let h=I(this.hass?.locale,{minimumFractionDigits:1,maximumFractionDigits:1}).format(l);return this._card(e,i("return_value",{rate:h}),this._returnLine(o.attributes),c)}_paybackLine(e){let t=this._localize;if(typeof e.investment!="number")return;let s=this._format(e.investment,"money");if(typeof e.years_left!="number")return t("line_payback",{investment:s});let i=e.years_left,a=Math.max(1,Math.round(i<1?i*12:i)),c=i<1?t(a===1?"months_one":"months_other",{count:String(a)}):t(a===1?"years_one":"years_other",{count:String(a)});return t("line_payback_left",{time:c})}_returnLine(e){let{surplus:t}=e;if(typeof t=="number")return this._localize("line_return",{amount:I(this.hass?.locale,{style:"currency",currency:this.hass?.config.currency??"EUR",maximumFractionDigits:0,signDisplay:"exceptZero"}).format(t)})}_card(e,t,s,i){let[a,c]=Fr(t),o=()=>{this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:i},bubbles:!0,composed:!0}))},l=h=>{h.key!=="Enter"&&h.key!==" "||(h.preventDefault(),o())};return m`<ha-card
      lang=${this._language}
      class=${i?"clickable":""}
      role=${i?"button":v}
      tabindex=${i?"0":v}
      @click=${i?o:v}
      @keydown=${i?l:v}
    >
      <div class="header"><h2 class="title" title=${e}>${e}</h2></div>
      <div class="stat">
        <div class="value">
          <span class="number" title=${t}>${a}</span>${c?m`<span class="unit">${c}</span>`:v}
        </div>
        ${s?m`<div class="line" title=${s}>${s}</div>`:v}
      </div>
    </ha-card>`}render(){if(!this.hass||!this._config)return m``;let e=U(this._config);return e==="statistic"?this._statisticCard(this._config):e==="entity"?this._entityCard(this._config):this._energyCard(this._config)}};Fe.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0},_selected:{state:!0},_loaded:{state:!0}},Fe.styles=[z,C`
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
    `];var As=["energy","cost","saving","export","heat","distance","alternative_cost"],Es=["price","grid_price","solar_share","cheap_share","expensive_share","self_consumption","scop","heat_price","cost_per_100km"],Je=n=>As.filter(r=>ie(n).includes(r)),Bt=n=>Es.filter(r=>ie(n).includes(r)||r==="grid_price"&&n.kind==="household");function Te(n,r){let e=[];return r==="energy"&&n.statistics.solar?.length&&e.push("source"),n.kind==="household"&&(r==="energy"||r==="cost")&&e.push("consumer"),n.kind==="household"&&r==="cost"&&e.push("source","bill"),n.kind==="category"&&(n.statistics.energy?.length??0)>1&&(r==="energy"||r==="cost"||(r==="heat"||r==="saving")&&(n.statistics.heat_meters?.length??0)>1)&&e.push("consumer"),e.push("none"),n.kind==="category"&&r==="cost"&&n.statistics.solar_cost?.length&&e.push("source"),e}function Or(n,r){let e=n.statistics[r]??[];return{plus:r==="saving"?[...e,...n.statistics.solar_saving??[]]:e,minus:[]}}function xt(n){let r=new Set(n.areas.find(t=>t.id==="heat_pump")?.statistics.energy??[]),e=n.areas.filter(t=>t.kind==="device"&&t.statistics.heat?.length&&t.statistics.energy?.some(s=>r.has(s)));return e.length>1?e:[]}function Rs(n,r,e){let t=n.areas.find(o=>o.kind==="grid")?.statistics??{},s=t.import_cost??[],i=r.statistics.cheap_cost??[],a=r.statistics.expensive_cost??[],c=[{id:"standing_charge",name:{key:"source.standing_charge"},color:e.standing,plus:t.standing_charge??[],minus:[]}];return i.length&&c.push({id:"cheap",name:{key:"source.cheap"},color:e.cheap,plus:i,minus:[]}),c.push({id:"grid",name:{key:i.length||a.length?"source.normal":"source.grid"},color:e.grid,plus:s,minus:[...i,...a],floor:!0}),a.length&&c.push({id:"expensive",name:{key:"source.expensive"},color:e.expensive,plus:a,minus:[]}),c}function Fs(n,r,e){let t=o=>r.statistics[o]??[],s=t("cheap_cost"),i=t("expensive_cost"),a=[{id:"solar",name:{key:"source.solar"},color:e.solar,plus:t("solar_cost"),minus:[]}];s.length&&a.push({id:"cheap",name:{key:"source.cheap"},color:e.cheap,plus:s,minus:[]}),a.push({id:"grid",name:{key:s.length||i.length?"source.normal":"source.grid"},color:e.grid,plus:t("cost"),minus:[...t("solar_cost"),...s,...i],floor:!0}),i.length&&a.push({id:"expensive",name:{key:"source.expensive"},color:e.expensive,plus:i,minus:[]});let c=n.areas.find(o=>o.kind==="grid")?.statistics.feed_in??[];return r.kind==="household"&&c.length&&a.push({id:"export",name:{key:"source.export"},color:e.export,plus:c,minus:[],negative:!0}),a}function kt(n,r,e,t,s){let i=o=>r.statistics[o]??[],a=M(n,s);if(t==="bill"&&e==="cost")return Rs(n,r,s);if(t==="source"&&e==="cost")return Fs(n,r,s);if(t==="source"&&e==="energy"){let o=[{id:"solar",name:{key:"source.solar"},color:s.solar,plus:i("solar"),minus:[]}],l=["cheap","expensive"].filter(u=>i(u).length);i("cheap").length&&o.push({id:"cheap",name:{key:"source.cheap"},color:s.cheap,plus:i("cheap"),minus:[]}),o.push({id:"grid",name:{key:l.length?"source.normal":"source.grid"},color:s.grid,plus:i("energy"),minus:[...i("solar"),...l.flatMap(i)],floor:!0}),i("expensive").length&&o.push({id:"expensive",name:{key:"source.expensive"},color:s.expensive,plus:i("expensive"),minus:[]});let h=n.areas.find(u=>u.kind==="grid")?.statistics.export??[];return r.kind==="household"&&h.length&&o.push({id:"export",name:{key:"source.export"},color:s.export,plus:h,minus:[],negative:!0}),o}if(t==="consumer"){if(r.kind==="category"){let l=new Set(r.statistics.energy??[]);return n.areas.filter(h=>h.kind==="device"&&h.statistics.energy?.some(u=>l.has(u))).map(h=>({id:h.id,name:{text:h.name},color:a.get(h.id)??s.other,...Or(h,e)}))}let o=new Set(n.areas.filter(l=>l.kind==="category").flatMap(l=>l.statistics.energy??[]));return n.areas.filter(l=>l.kind==="category"&&(l.statistics.energy?.length??0)>0||l.kind==="device"&&l.top_level!==!1&&!l.statistics.energy?.some(h=>o.has(h))||l.kind==="other").map(l=>({id:l.id,name:{text:l.name},color:a.get(l.id)??s.other,plus:l.statistics[e]??[],minus:[]}))}let c=e==="export"?s.export:r.kind==="solar"?s.solar:a.get(r.id)??(e==="heat"?s.heat:e==="distance"?s.car:s.grid);return[{id:e,name:{text:r.name},color:c,...Or(r,e)}]}var Ts=36e5;async function Wt(n,r,e){if(!r.length)return{};let t=Se(ne(e)),s=await n.callWS({type:"recorder/statistics_during_period",start_time:new Date(e.start).toISOString(),end_time:new Date(e.end+1).toISOString(),statistic_ids:r,period:t,types:["change"],units:{energy:"kWh"}}),i=t==="hour"?0:12*Ts,a={};for(let c of r){a[c]=0;for(let o of s[c]??[]){let l=(typeof o.start=="number"?o.start:Date.parse(o.start))+i;l>=e.start&&l<=e.end&&(a[c]+=o.change??0)}}return a}var Ps=300*1e3,O=(n,r)=>(r??[]).reduce((e,t)=>e+(n[t]??0),0),Y=class extends H{constructor(){super(...arguments);this._infoLoading=!1}_period(){return"energy_date"}_showsCompare(){return!1}_needsInfo(){return!0}_described(){return[]}getCardSize(){return 4}getGridOptions(){return{columns:12,min_columns:6}}connectedCallback(){super.connectedCallback(),this._follow()}disconnectedCallback(){super.disconnectedCallback(),this._unfollow?.(),this._unfollow=void 0,clearTimeout(this._retryTimer),this._retryTimer=void 0}get _localize(){return S(this.hass?.locale?.language??this.hass?.language??"en")}get _fmt(){return se(this.hass?.locale,this.hass?.config.currency??"EUR")}_follow(){this._period()==="energy_date"&&(this._unfollow||!this.isConnected||!this.hass?.connection||(this._unfollow=ke(this.hass.connection,this._collectionKey,(e,t)=>{this._selected=e,this._compare=t})))}_range(){let e=this._period();if(e!=="energy_date")return B(e);if(this._selected!==void 0)return this._selected??B("this_month")}async _loadInfo(){!this.hass||this._infoLoading||(this._infoLoading=!0,this._info=await G(this.hass),this._infoLoading=!1,clearTimeout(this._retryTimer),this._retryTimer=void 0,this.isConnected&&(!this._info||this._info.calculating)&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),W)))}async _load(e,t,s,i,a){if(!this.hass)return;let c=this.hass;this._loading=e;let o={key:e,at:0,values:null,metadata:{}};try{let[l,h,u]=await Promise.all([Wt(c,t,s),i?Wt(c,t,i):Promise.resolve(void 0),a.length?c.callWS({type:"recorder/get_statistics_metadata",statistic_ids:a}):Promise.resolve([])]);o.values=l,o.compare=h,o.metadata=Object.fromEntries(u.map(g=>[g.statistic_id,g]))}catch{}this._loading===e&&(this._loading=void 0,this._sums={...o,at:Date.now()})}willUpdate(e){if(!this.hass||(this._follow(),this._info===void 0&&(this._info=K()),N()&&!this._infoLoading&&this._loadInfo(),this._needsInfo()&&(this.isConnected&&this._info?.calculating&&!this._retryTimer&&!this._infoLoading&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),W)),!this._info||this._info.calculating)))return;let t=this._range();if(!t)return;let s=this._showsCompare()&&this._period()==="energy_date"?this._compare:void 0,i=[...new Set(this._ids())].sort();if(!i.length)return;let a=[...new Set(this._described())].sort(),c=JSON.stringify([i,t.start,t.end,s?.start,s?.end,a]),o=!this._sums||Date.now()-this._sums.at>Ps;c!==this._loading&&(c!==this._sums?.key||o&&!this._loading)&&this._load(c,i,t,s,a)}_waiting(){if(!this.hass)return;let e=L(this.hass);return e.length?e.some(t=>t.calculating)||this._info?.calculating?"calculating":this._info===null?"editor_not_loaded":this._info===void 0?"loading":this._ids().length?this._sums?this._sums.values?void 0:"history_failed":"loading":"figures_unavailable":Ee(this.hass)}_waitingText(e){return e!=="calculating"?this._localize(e):ae(this._localize,Ae(this.hass,this._info))}};Y.properties={hass:{attribute:!1},_info:{state:!0},_selected:{state:!0},_compare:{state:!0},_sums:{state:!0}};var Ds="240px",Ms="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z",zs="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z",Pe=class extends Y{constructor(){super(...arguments);this._config={type:""};this._watchingChart=!1;this._hidden=new Set}static getStubConfig(){return{area:"household",by:"source",figure:"energy",display:"ring"}}static getConfigElement(){return document.createElement("electricity-lens-breakdown-card-editor")}setConfig(e){if(e?.statistics!==void 0&&!Array.isArray(e.statistics))throw new Error("statistics must be a list");V(e?.collection_key),this._config=e??{type:""},this._collectionKey=this._config.collection_key}getGridOptions(){return{columns:6,min_columns:4}}get _byStatistics(){return!!this._config.statistics?.length}_period(){return this._config.period??"energy_date"}_showsCompare(){return!0}_needsInfo(){return!this._byStatistics}_described(){return this._byStatistics?(this._config.statistics??[]).map(e=>e.statistic):[]}_area(){return this._info?.areas.find(e=>e.id===(this._config.area??"household"))}get _by(){let e=this._area();return this._config.by==="consumer"&&(e?.kind==="household"||e?.kind==="category"&&(e.statistics.energy?.length??0)>1)?"consumer":e?.statistics.solar?.length?"source":"consumer"}get _figure(){return this._by==="consumer"&&this._config.figure==="cost"?"cost":"energy"}_series(){let e=this._info,t=this._area();return!e||!t?[]:kt(e,t,this._figure,this._by==="source"?"source":"consumer",F(this)).filter(s=>!s.negative)}_ids(){let e=new Set;if(this._byStatistics)this._config.statistics?.forEach(t=>e.add(t.statistic));else{for(let t of this._series())[...t.plus,...t.minus].forEach(s=>e.add(s));if(this._by==="consumer"&&this._info)for(let t of this._series()){let s=this._info.areas.find(i=>i.id===t.id);for(let i of["energy","solar","cheap","expensive","cost","solar_cost","cheap_cost","expensive_cost"])(s?.statistics[i]??[]).forEach(a=>e.add(a))}}return[...e].sort()}willUpdate(){super.willUpdate(),this.hass&&!this._watchingChart&&(this._watchingChart=!0,vt(e=>{this._hasChart=e}))}_sum(e,t=!1){let s=(t?this._sums?.compare:this._sums?.values)??{};return e.reduce((i,a)=>i+(s[a]??0),0)}get _compared(){return this._sums?.compare!==void 0}_entityOf(e){return e?.length===1&&this.hass?.states[e[0]]?e[0]:void 0}get _unit(){return this._byStatistics?(this._config.statistics??[]).map(t=>{let s=this._sums?.metadata[t.statistic];return s?.unit_class==="energy"?"kWh":s?.statistics_unit_of_measurement??""})[0]:void 0}_parts(){let e=this._localize;if(this._byStatistics){let s=F(this),i=this._info?M(this._info,s):new Map;return(this._config.statistics??[]).map((a,c)=>{let o=this._info?.areas.find(l=>l.kind==="device"&&(l.statistics.energy?.[0]===a.statistic||l.statistics.heat?.[0]===a.statistic));return{id:a.statistic,name:a.name??o?.name??(this._sums?.metadata[a.statistic]?.name||this.hass?.states[a.statistic]?.attributes.friendly_name||a.statistic),color:(o&&i.get(o.id))??s.consumers[c%s.consumers.length],value:this._sum([a.statistic]),compare:this._compared?this._sum([a.statistic],!0):void 0,entity:this._entityOf([a.statistic])}})}let t=this._series().map(s=>{let i=this._sum(s.plus)-this._sum(s.minus),a=this._sum(s.plus,!0)-this._sum(s.minus,!0),c=s.name.key?.replace(/^source\./,"mix."),o=s.name.text??(c&&ee(c)?e(c):s.name.key&&ee(s.name.key)?e(s.name.key):s.id),l=u=>s.floor?Math.max(u,0):u,h={id:s.id,name:o,color:s.color,value:l(i),compare:this._compared?l(a):void 0};if(this._by==="consumer"&&this._info){let u=F(this),g=this._info.areas.find(d=>d.id===s.id);if(g){h.entity=this._entityOf(g.statistics.energy);let d=A=>this._sum(g.statistics[A]??[]),p=d("energy"),f=d("solar"),y=d("cheap"),x=d("expensive");h.energy=p;let _=this._figure==="cost",$={solar:_?d("solar_cost"):f,cheap:_?d("cheap_cost"):y,expensive:_?d("expensive_cost"):x};h.mix=[{color:u.solar,value:$.solar},{color:u.cheap,value:$.cheap},{color:u.grid,value:Math.max((_?d("cost"):p)-$.solar-$.cheap-$.expensive,0)},{color:u.expensive,value:$.expensive}]}}return h});return this._by==="consumer"?t.sort((s,i)=>i.value-s.value):t}_value(e){let t=this._unit;return t!==void 0&&t!=="kWh"?t?`${this._fmt.number(e)} ${t}`:this._fmt.number(e):this._figure==="cost"&&!this._byStatistics?this._fmt.value(e,"money"):this._fmt.value(e,"energy")}_open(e){e&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:e},bubbles:!0,composed:!0}))}_title(){let e=this._localize;return this._config.title?this._config.title:this._byStatistics?"":(this._area()?this._by:this._config.by??"source")==="source"?e("breakdown_mix"):e(this._figure==="cost"?"breakdown_cost_by_device":"breakdown_energy_by_device")}_ring(e){let t=this._localize;if(this._hasChart===void 0)return m`<p class="summary">${t("loading")}</p>`;if(!this._hasChart)return m`<p class="summary">${t("history_no_chart")}</p>`;let s=this._figure==="cost"&&!this._byStatistics,i=F(this).line,a=getComputedStyle(this).getPropertyValue("--primary-text-color").trim()||"#212121",c=JSON.stringify([e,[...this._hidden],s,i,a,this.hass?.locale]);this._ringChart?.key!==c&&(this._ringChart={key:c,chart:Sr({items:e,total:t("breakdown_total"),format:u=>this._value(u),percent:u=>this._fmt.value(u,"percent"),compare:this._compared?e.map(u=>u.compare??0):void 0,compared:t("breakdown_compare_period"),centerColor:i,labelColor:a,hidden:this._hidden})});let{chart:o}=this._ringChart,l=yt(e.map(u=>this._hidden.has(u.id)?0:u.value)),h=u=>{let g=new Set(this._hidden);g.has(u)?g.delete(u):g.add(u),this._hidden=g};return m`<div class="ring">
      ${_r(`${s}-${this._compared}`,m`<ha-chart-base
          .hass=${this.hass}
          .data=${o.data}
          .options=${o.options}
          .height=${Ds}
        ></ha-chart-base>`)}
      <div class="chart-legend">
        <ul>
          ${e.map((u,g)=>{let d=this._hidden.has(u.id),p=this._fmt.value(l[g],"percent");return m`<li class=${d?"hidden":""}>
              <button
                type="button"
                class="leg"
                aria-pressed=${String(!d)}
                aria-label="${u.name}: ${p}"
                @click=${()=>h(u.id)}
              >
                <svg class="icon" viewBox="0 0 24 24" style="color: ${d?"var(--secondary-text-color)":u.color}">
                  <path fill="currentColor" d=${d?zs:Ms}></path>
                </svg>
                <span class="label">${u.name}</span>
                <span class="value">${p}</span>
              </button>
            </li>`})}
        </ul>
      </div>
    </div>`}_bars(e){let t=this._value(0),s=e.filter(l=>this._value(l.value)!==t||l.compare!==void 0&&this._value(l.compare)!==t),i=Math.max(...s.map(l=>Math.max(l.value,l.compare??0)),0),a=l=>i>0?Math.max(l/i*100,0):0,c=this._config.color_by_source===!0&&this._by==="consumer",o=this._localize;return m`<div class="bars">
      ${s.map(l=>{let h=a(l.value),u=l.mix?.reduce((p,f)=>p+f.value,0)??0,g="";if(this._figure==="cost"&&l.energy!==void 0&&(g=this._fmt.value(l.energy,"energy"),l.energy>0&&(g+=` \xB7 ${o("line_average_price",{price:this._fmt.value(l.value/l.energy,"price")})}`)),l.compare!==void 0){let p=o("breakdown_compared",{amount:this._value(l.compare)});g=g?`${g} \xB7 ${p}`:p}let d=l.entity?{role:"button",tabindex:"0",click:()=>this._open(l.entity),key:p=>{p.key!=="Enter"&&p.key!==" "||(p.preventDefault(),this._open(l.entity))}}:void 0;return m`<div
          class="bar-row ${d?"clickable":""}"
          role=${d?.role??v}
          tabindex=${d?.tabindex??v}
          @click=${d?.click}
          @keydown=${d?.key}
        >
          <div class="bar-text">
            <span class="name">${l.name}</span>
            <span class="amount">${this._value(l.value)}</span>
          </div>
          ${g?m`<div class="bar-line">${g}</div>`:v}
          <div class="track">
            <div class="fill" style="width: ${h}%; ${c?"":`--c: ${l.color}`}">
              ${c&&l.mix&&u>0?l.mix.map(p=>m`<span style="width: ${p.value/u*100}%; --c: ${p.color}"></span>`):v}
            </div>
          </div>
          ${l.compare!==void 0?m`<div class="track compare">
                <div class="fill" style="width: ${a(l.compare)}%; --c: ${l.color}"></div>
              </div>`:v}
        </div>`})}
      ${c?m`<div class="key">
            ${["solar","cheap","grid","expensive"].filter(l=>(l!=="cheap"||this._info?.levels.cheap_until!=null)&&(l!=="expensive"||this._info?.levels.expensive_from!=null)).map(l=>m`<span><span class="dot" style="--c: ${pe[l]}"></span>${o(l==="grid"?this._info?.levels.cheap_until!=null||this._info?.levels.expensive_from!=null?"source.normal":"source.grid":`source.${l}`)}</span>`)}
          </div>`:v}
    </div>`}render(){if(!this.hass)return m``;let e=this._localize,t=this._sums?.values?this._parts():[],s=t.reduce((l,h)=>l+Math.max(h.value,0),0),i=!this._byStatistics&&this._info?.calculating===!0,a=!this._byStatistics&&this._info!==void 0&&!this._area(),c=this._config.display??(!this._byStatistics&&this._by==="consumer"?"bars":"ring"),o;return i?o=m`<p class="summary">${this._waitingText("calculating")}</p>`:a?o=m`<p class="summary">${e(this._info===null?"editor_not_loaded":"figures_unavailable")}</p>`:this._sums&&!this._sums.values?o=m`<p class="summary">${e("figures_failed")}</p>`:this._sums?s<=0?o=m`<p class="summary">${e("history_empty_figure")}</p>`:o=c==="bars"?this._bars(t):this._ring(t):o=m`<p class="summary">${e("loading")}</p>`,m`<ha-card>
      <div class="header">
        <h2 class="title">${this._title()}</h2>
      </div>
      ${o}
    </ha-card>`}};Pe.properties={...Y.properties,_config:{state:!0},_hasChart:{state:!0},_hidden:{state:!0}},Pe.styles=[z,C`
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
    `];var De=n=>({select:{mode:"dropdown",options:n}}),Kt=n=>n?.kind==="household"||n?.kind==="category"&&(n.statistics.energy?.length??0)>1,Is=n=>Kt(n)||!!n.statistics.solar?.length,Me=class extends T{constructor(){super(...arguments);this._requested=!1;this._label=e=>this._localize(`editor_${e.name}`);this._helper=e=>e.name==="period"?this._localize("editor_period_hint"):void 0}setConfig(e){this._config=e}get _localize(){return S(this.hass?.locale?.language??this.hass?.language??"en")}willUpdate(){this.hass&&!this._requested&&(this._requested=!0,this.hass.callWS({type:`${R}/figures`}).then(e=>{this._info=e}).catch(()=>{this._info=null}))}_data(){let e=this._config??{type:""},t=!!e.statistics?.length||e.statistics!==void 0&&!e.area;return{title:e.title??"",period:e.period??"energy_date",source:t?"statistics":"energy",area:e.area??"household",by:e.by??"source",figure:e.figure??"energy",display:e.display??(!t&&e.by==="consumer"?"bars":"ring"),color_by_source:e.color_by_source??!1,statistics:(e.statistics??[]).map(s=>s.statistic)}}_schema(e){let t=this._localize,s=[{name:"title",selector:{text:{}}},{name:"period",selector:De(oe.map(i=>({value:i,label:t(`period.${i}`)})))},{name:"breakdown_source",selector:De(["energy","statistics"].map(i=>({value:i,label:t(`breakdown_source.${i}`)})))}];if(e.source==="statistics")s.push({name:"statistics",selector:{statistic:{multiple:!0}}});else{let i=(this._info?.areas??[]).filter(Is),a=i.find(o=>o.id===e.area),c=[...a?.statistics.solar?.length?["source"]:[],...Kt(a)?["consumer"]:[]];s.push({name:"area",selector:De(i.map(o=>({value:o.id,label:o.name})))},{name:"by",selector:De(c.map(o=>({value:o,label:t(`by.${o}`)})))}),e.by==="consumer"&&s.push({name:"figure",selector:De(["energy","cost"].map(o=>({value:o,label:t(`figure_choice.${o}`)})))})}return s.push({name:"display",selector:De(["ring","bars"].map(i=>({value:i,label:t(`display.${i}`)})))}),e.source!=="statistics"&&e.by==="consumer"&&e.display==="bars"&&s.push({name:"color_by_source",selector:{boolean:{}}}),s}_changed(e){if(!this._config)return;let t={...this._data(),...e.detail.value};"breakdown_source"in e.detail.value&&(t.source=e.detail.value.breakdown_source);let{title:s,period:i,area:a,by:c,figure:o,display:l,color_by_source:h,statistics:u,...g}=this._config,d=g;if(typeof t.title=="string"&&t.title&&(d.title=t.title),d.period=t.period??"energy_date",t.source==="statistics"){let p=new Map((this._config.statistics??[]).map(y=>[y.statistic,y])),f=Array.isArray(t.statistics)?t.statistics.filter(Boolean):[];d.statistics=f.map(y=>p.get(y)??{statistic:y})}else{d.area=t.area??"household";let p=this._info?.areas.find(x=>x.id===d.area),f=Kt(p),y=!!p?.statistics.solar?.length;d.by=t.by==="consumer"&&f?"consumer":y?"source":"consumer",d.by==="consumer"&&t.figure==="cost"?d.figure="cost":d.figure="energy"}d.display=t.display==="bars"?"bars":"ring",d.by==="consumer"&&d.display==="bars"&&t.color_by_source===!0&&(d.color_by_source=!0),this._config=d,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:d},bubbles:!0,composed:!0}))}render(){if(!this.hass||!this._config)return m``;let e=this._data();return m`<div class="editor">
      ${e.source!=="statistics"&&this._info===null?m`<p class="hint">${this._localize("editor_not_loaded")}</p>`:v}
      <ha-form
        .hass=${this.hass}
        .data=${{...e,breakdown_source:e.source}}
        .schema=${this._schema(e)}
        .computeLabel=${this._label}
        .computeHelper=${this._helper}
        @value-changed=${this._changed}
      ></ha-form>
    </div>`}};Me.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0}},Me.styles=C`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .hint {
      margin: 0;
      color: var(--secondary-text-color);
    }
  `;var ze=class extends H{constructor(){super(...arguments);this._infoLoading=!1}static getStubConfig(){return{}}static getConfigForm(){return{schema:[{name:"title",selector:{text:{}}}]}}setConfig(e){this._config=e}getCardSize(){return 4}getGridOptions(){return{columns:12,min_columns:6}}get _localize(){return S(this.hass?.locale?.language??this.hass?.language??"en")}_money(e,t=!1){return e===void 0?"":e===null?"\u2013":I(this.hass?.locale,{style:"currency",currency:this.hass?.config.currency??"EUR",maximumFractionDigits:0,minimumFractionDigits:0,signDisplay:t?"exceptZero":"auto"}).format(e)}willUpdate(){this.hass&&(this._info===void 0&&(this._info=K()),N()&&!this._infoLoading&&(this._infoLoading=!0,G(this.hass).then(e=>{this._info=e,this._infoLoading=!1})))}render(){let e=this._localize;if(!this.hass)return m``;let t=L(this.hass),s=Ht(this.hass),i=m`<div class="header">
      <h2 class="title">${this._config?.title||e("title")}</h2>
    </div>`;if(!t.length||!s)return m`<ha-card>
        ${i}
        <p class="summary">${e(Ee(this.hass))}</p>
      </ha-card>`;let a=this._info?M(this._info,F(this)):void 0,c=t.some(l=>l.calculating),o={perYear:t.some(l=>l.perYear!==null),invested:s.invested>0};return m`<ha-card>
      ${i}
      <div class="table">
        <table>
          <thead>
            <tr>
              <th class="swatch-cell"></th>
              <th class="name" scope="col">${e("column_area")}</th>
              ${o.perYear?m`<th class="per-year" scope="col">${e("column_per_year")}</th>`:v}
              <th scope="col">${e("column_saving")}</th>
              ${o.invested?m`<th scope="col">${e("column_investment")}</th>
                    <th scope="col">${e("column_balance")}</th>`:v}
            </tr>
          </thead>
          <tbody>
            ${t.map(l=>this._row({name:e(`category.${l.category}`),entityId:l.entityId,perYear:l.perYear,saving:l.calculating?null:l.saving,investment:l.investment??void 0,balance:l.balance,category:l.category},o,a))}
          </tbody>
          <tfoot>
            ${this._row({name:e("total"),entityId:s.entityId,perYear:s.perYear,saving:c?null:s.saved,investment:s.invested,balance:s.balance},o)}
          </tfoot>
        </table>
      </div>
      ${c?m`<p class="note">${ae(e,s.progress)}</p>`:v}
    </ha-card>`}_row(e,t,s){let{name:i,entityId:a,perYear:c,saving:o,investment:l,balance:h,category:u}=e,g=u?s?.get(u):void 0;return m`<tr
      class=${u??"total"}
      style=${g?`--color: ${g}`:""}
      @click=${()=>this._moreInfo(a)}
    >
      <td class="swatch-cell">
        ${u?m`<span class="swatch" aria-hidden="true"></span>`:v}
      </td>
      <th class="name" scope="row">
        <button type="button">${i}</button>
      </th>
      ${t.perYear?m`<td class="per-year">
            ${c===null?"\u2013":this._localize("average",{amount:this._money(c)})}
          </td>`:v}
      <td>${this._money(o)}</td>
      ${t.invested?m`<td>${this._money(l)}</td>
            <td>${this._money(h,!0)}</td>`:v}
    </tr>`}_moreInfo(e){this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:e},bubbles:!0,composed:!0}))}};ze.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0}},ze.styles=[z,Re,C`
      .pv {
        --color: var(--electricity-lens-pv-color);
      }
      .heat_pump {
        --color: var(--electricity-lens-heat-pump-color);
      }
      .wallbox {
        --color: var(--electricity-lens-wallbox-color);
      }
      .table {
        overflow-x: auto;
      }
      /* Each row opens its sensor's dialog. */
      tr[class] {
        cursor: pointer;
      }
      tr[class]:hover {
        background-color: rgba(var(--rgb-primary-text-color), 0.04);
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
    `];var Hr=(n,r,e)=>{let t=new Map;for(let s=r;s<=e;s++)t.set(n[s],s);return t},Nr=pt(class extends ve{constructor(n){if(super(n),n.type!==gr.CHILD)throw Error("repeat() can only be used in text expressions")}dt(n,r,e){let t;e===void 0?e=r:r!==void 0&&(t=r);let s=[],i=[],a=0;for(let c of n)s[a]=t?t(c,a):a,i[a]=e(c,a),a++;return{values:i,keys:s}}render(n,r,e){return this.dt(n,r,e).values}update(n,[r,e,t]){let s=fr(n),{values:i,keys:a}=this.dt(r,e,t);if(!Array.isArray(s))return this.ut=a,i;let c=this.ut??=[],o=[],l,h,u=0,g=s.length-1,d=0,p=i.length-1;for(;u<=g&&d<=p;)if(s[u]===null)u++;else if(s[g]===null)g--;else if(c[u]===a[d])o[d]=re(s[u],i[d]),u++,d++;else if(c[g]===a[p])o[p]=re(s[g],i[p]),g--,p--;else if(c[u]===a[p])o[p]=re(s[u],i[p]),be(n,o[p+1],s[u]),u++,p--;else if(c[g]===a[d])o[d]=re(s[g],i[d]),be(n,s[u],s[g]),g--,d++;else if(l===void 0&&(l=Hr(a,d,p),h=Hr(c,u,g)),l.has(c[u]))if(l.has(c[g])){let f=h.get(a[d]),y=f!==void 0?s[f]:null;if(y===null){let x=be(n,s[u]);re(x,i[d]),o[d]=x}else o[d]=re(y,i[d]),be(n,s[u],y),s[f]=null;d++}else ft(s[g]),g--;else ft(s[u]),u++;for(;d<=p;){let f=be(n,o[p+1]);re(f,i[d]),o[d++]=f}for(;u<=g;){let f=s[u++];f!==null&&ft(f)}return this.ut=a,mt(n,o),Q}});var q=.01,Ls={mW:1e-6,W:.001,kW:1,MW:1e3,GW:1e6};function Vr(n){if(!n)return null;let r=Number(n.state),e=Ls[String(n.attributes.unit_of_measurement??"")];return n.state===""||!Number.isFinite(r)||e===void 0?null:r*e}function $t(n){let r=n?.power;if(!r?.grid.length)return;let e=n.areas.flatMap(t=>t.power??[]);return[...new Set([...r.grid,...r.solar,...r.battery,...e])]}function Ur(n,r,e){let t=n.power;if(!t?.grid.length)return null;let s=b=>b.map(r).filter(k=>k!==null),i=b=>b.reduce((k,Ue)=>k+Ue,0),a=s(t.grid);if(!a.length)return null;let c=i(a),o=Math.max(i(s(t.solar)),0),l=i(s(t.battery)),h=Math.max(c,0),u=Math.max(-c,0),g=Math.max(l,0),d=Math.max(-l,0),p=Math.max(o+h+g-u-d,0),f=b=>b.length===1?b[0]:void 0,y=[{id:"solar",name:{key:"source.solar"},color:e.solar,kw:o,entity:f(t.solar)},{id:"battery",name:{key:"flow.battery"},color:e.batteryOut,kw:g,entity:f(t.battery)},{id:"grid",name:{key:"source.grid"},color:e.grid,kw:h,entity:f(t.grid)}],x=M(n,e),_=new Set(n.areas.filter(b=>b.kind==="category").flatMap(b=>b.statistics.energy??[])),$=n.areas.filter(b=>b.kind==="category"||b.kind==="device"&&b.top_level!==!1&&!b.statistics.energy?.some(k=>_.has(k))).flatMap(b=>{let k=s(b.power??[]);return k.length?[{id:b.id,name:{text:b.name},color:x.get(b.id)??e.other,kw:Math.max(i(k),0),entity:f(b.power??[])}]:[]}),A=n.areas.find(b=>b.kind==="other"),D=[...$,{id:"other",name:A?{text:A.name}:{key:"flow.other"},color:e.other,kw:Math.max(p-i($.map(b=>b.kw)),0)},{id:"battery",name:{key:"flow.battery"},color:e.batteryIn,kw:d,entity:f(t.battery)},{id:"export",name:{key:"source.export"},color:e.export,kw:u,entity:f(t.grid)}],w=b=>b.filter(k=>k.kw>=q);return{sources:w(y),uses:w(D),home:p,summary:Os(p,o,g,h,u,d)}}function Os(n,r,e,t,s,i){let a=r+e;if(n<q&&a<q&&t<q)return{kind:"idle"};let c=r>=q&&e>=q?"both":e>=q?"battery":"solar";if(t<q)return{kind:"covered",by:c,export:s>=q?s:0,charge:i>=q?i:0};let o=n>0?Math.min(Math.max(n-t,0)/n,.99):0;return o<.005?{kind:"grid"}:{kind:"share",by:c,share:o,grid:t}}var Ie=class extends H{constructor(){super(...arguments);this._infoLoading=!1}static getStubConfig(){return{}}static getConfigForm(){return{schema:[{name:"title",selector:{text:{}}}]}}setConfig(e){this._config=e}getCardSize(){return 3}getGridOptions(){return{columns:12,min_columns:6}}_watched(){return $t(this._info)??[]}get _localize(){return S(this.hass?.locale?.language??this.hass?.language??"en")}willUpdate(){this.hass&&(this._info===void 0&&(this._info=K()),N()&&!this._infoLoading&&(this._infoLoading=!0,G(this.hass).then(e=>{this._info=e,this._infoLoading=!1})))}_colors(){let e=this.hass?.themes,t=this.hass?.selectedTheme;return(!this._palette||this._palette.themes!==e||this._palette.selected!==t)&&(this._palette={themes:e,selected:t,colors:F(this)}),this._palette.colors}_power(e){return Er(this.hass?.locale,e)}_summary(e){let t=this._localize;switch(e.kind){case"idle":return t("flow.idle");case"grid":return t("flow.grid");case"share":return t(`flow.share_${e.by}`,{share:se(this.hass?.locale,this.hass?.config.currency??"EUR").value(e.share*100,"percent"),grid:this._power(e.grid)});case"covered":{let s=e.export&&e.charge?t("flow.surplus_both",{grid:this._power(e.export),battery:this._power(e.charge)}):e.export?t("flow.surplus_grid",{power:this._power(e.export)}):e.charge?t("flow.surplus_battery",{power:this._power(e.charge)}):"";return`${t(`flow.covered_${e.by}`)}${s?`, ${s}`:""}.`}}}_name(e){return"key"in e.name?this._localize(e.name.key):e.name.text}_open(e){this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:e},bubbles:!0,composed:!0}))}_bar(e,t,s,i){return m`<div class="label" aria-hidden="true">${e}</div>
      <div class="track" aria-hidden="true">
        <div class="fill" style="width: ${i>0?s/i*100:0}%">
          ${Nr(t,a=>a.id,a=>m`<span style="flex-grow: ${a.kw}; --c: ${a.color}"></span>`)}
        </div>
      </div>`}_list(e,t){return m`<ul aria-label=${e}>
      ${t.map(s=>{let i=this._name(s),a=m`<span class="dot" style="--c: ${s.color}" aria-hidden="true"></span>
          <span class="name">${i}</span>
          <span class="power">${this._power(s.kw)}</span>`,c=s.entity;return m`<li>
          ${c?m`<button type="button" @click=${()=>this._open(c)}>${a}</button>`:m`<div class="row">${a}</div>`}
        </li>`})}
    </ul>`}_flow(e){let t=this._localize,s=o=>o.reduce((l,h)=>l+h.kw,0),i=s(e.sources),a=s(e.uses),c=Math.max(i,a);return m`<p class="summary">${this._summary(e.summary)}</p>
      ${c>0?m`<div class="bars">
            ${this._bar(t("flow.from"),e.sources,i,c)}
            ${this._bar(t("flow.to"),e.uses,a,c)}
          </div>`:v}
      <div class="lists">
        ${e.sources.length?this._list(t("flow.from"),e.sources):v}
        ${e.uses.length?this._list(t("flow.to"),e.uses):v}
      </div>`}render(){if(!this.hass)return m``;let e=this._localize,t=this.hass,s=this._info,i=s&&$t(s)?Ur(s,c=>Vr(t.states[c]),this._colors()):null,a;return s===void 0?a=m`<p class="summary">${e("loading")}</p>`:s===null?a=m`<p class="summary">${e("integration_unavailable")}</p>`:$t(s)?i?a=this._flow(i):a=m`<p class="summary">${e("flow.unavailable")}</p>`:a=m`<p class="summary">${e("flow.no_sensor")}</p>`,m`<ha-card>
      <div class="header">
        <h2 class="title">${this._config?.title||e("flow.title")}</h2>
        ${i?m`<span class="chip">${e("flow.consumption",{power:this._power(i.home)})}</span>`:v}
      </div>
      ${a}
    </ha-card>`}};Ie.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0}},Ie.styles=[z,C`
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
    `];var Qe=class extends Y{static getStubConfig(){return{}}static getConfigForm(){return{schema:[]}}setConfig(r){V(r?.collection_key),this._collectionKey=r?.collection_key}get _devices(){return this._info?xt(this._info).sort((r,e)=>r.name.localeCompare(e.name,this.hass?.locale?.language)):[]}_ids(){return this._devices.flatMap(r=>[...r.statistics.heat??[],...r.statistics.energy??[]])}render(){let r=this._localize;if(!this.hass)return m``;let e=this._waiting(),t=this._devices,s=t.length?t.map(i=>i.name).join(" & "):r("figure.heat");return m`<ha-card>
      <div class="header"><h2 class="title">${s}</h2></div>
      ${e?m`<p class="summary">${this._waitingText(e)}</p>`:this._table()}
    </ha-card>`}_table(){let r=this._localize,e=this._fmt,t=this._sums?.values??{},s=M(this._info,F(this)),i=this._devices,a=i.reduce((l,h)=>l+O(t,h.statistics.heat),0),c=i.reduce((l,h)=>l+O(t,h.statistics.energy),0),o=(l,h)=>h>0?e.number(l/h,2):"\u2013";return m`<table>
      <thead>
        <tr>
          <th class="swatch-cell"></th>
            <th scope="col" class="name">${r("meters_consumer")}</th>
          <th scope="col">${r("figure.heat")}</th>
          <th scope="col">${r("meters_electricity")}</th>
          <th scope="col">${r("figure.scop")}</th>
        </tr>
      </thead>
      <tbody>
        ${i.map(l=>{let h=O(t,l.statistics.heat),u=O(t,l.statistics.energy);return m`<tr>
            <td class="swatch-cell">
              <span class="swatch" style="--color: ${s.get(l.id)??""}" aria-hidden="true"></span>
            </td>
            <td class="name">${l.name}</td>
            <td>${e.value(h,"energy")}</td>
            <td>${e.value(u,"energy")}</td>
            <td>${o(h,u)}</td>
          </tr>`})}
      </tbody>
      <tfoot>
        <tr>
          <td class="swatch-cell"></td>
            <th scope="row" class="name">${r("savings_total")}</th>
          <td>${e.value(a,"energy")}</td>
          <td>${e.value(c,"energy")}</td>
          <td>${o(a,c)}</td>
        </tr>
      </tfoot>
    </table>`}};Qe.styles=[z,Re];var Hs=300*1e3,Ns="200px",Vs={energy:"energy",cost:"money",saving:"money",export:"energy",heat:"energy",distance:"distance",alternative_cost:"money"},Le=class extends H{constructor(){super(...arguments);this._config={type:""};this._infoLoading=!1;this._watchingChart=!1}static getStubConfig(){return{}}static getConfigElement(){return document.createElement("electricity-lens-history-card-editor")}setConfig(e){V(e?.collection_key),this._config=e??{type:""}}getCardSize(){return 5}getGridOptions(){return{columns:12,min_columns:6}}connectedCallback(){super.connectedCallback(),this._follow()}disconnectedCallback(){super.disconnectedCallback(),this._unfollow?.(),this._unfollow=void 0,clearTimeout(this._retryTimer),this._retryTimer=void 0}get _localize(){return S(this.hass?.locale?.language??this.hass?.language??"en")}get _language(){return this.hass?.locale?.language??"en"}get _fmt(){return se(this.hass?.locale,this.hass?.config.currency??"EUR")}get _savings(){return!this._config.area}_follow(){(this._config.period??"energy_date")==="energy_date"&&(this._unfollow||!this.isConnected||!this.hass?.connection||(this._unfollow=ke(this.hass.connection,this._config.collection_key,(e,t)=>{this._selected=e,this._compare=t})))}async _loadInfo(){!this.hass||this._infoLoading||(this._infoLoading=!0,this._info=await G(this.hass),this._infoLoading=!1,clearTimeout(this._retryTimer),this._retryTimer=void 0,this.isConnected&&(!this._info||this._info.calculating)&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),W)))}_range(e){let t=this._config.period??"energy_date";if(t==="all"){let i=new Date(new Date().getFullYear()+1,0,1).getTime()-1;return{range:{start:new Date(Mr,0,1).getTime(),end:i},period:"year",fromFirstValue:!0}}if(t!=="energy_date"){let i=B(t);return{range:i,period:ne(i),fromFirstValue:!1}}if(this._selected===void 0)return;if(this._selected)return{range:this._selected,period:ne(this._selected),compare:this._compare,fromFirstValue:!1};let s=e();return{range:s,period:this._savings?"year":ne(s),fromFirstValue:!1}}_savingsPlan(){if(!this.hass)return;let e=this._localize,t=L(this.hass);if(!t.length||t.some(l=>l.calculating))return;let s=this._range(()=>Dr(t.map(l=>l.countingSince)));if(!s)return;let i=F(this),a=this._info?M(this._info,i):void 0,c={pv:i.solar,heat_pump:a?.get("heat_pump")??i.heat,wallbox:a?.get("wallbox")??i.car},o=t.map(l=>({series:{id:l.category,name:{},color:c[l.category],plus:[l.savingStatistic],minus:[]},name:e(`category.${l.category}`)}));return this._plan(s,o,"money",void 0,[])}_figurePlan(){let e=this._info,t=this._config;if(!e||e.calculating)return;let s=e.areas.find(d=>d.id===t.area),i=t.figure??"energy";if(!s||!s.statistics[i]?.length)return;let a=this._range(()=>B("this_month"));if(!a)return;let c=this._localize,o=Te(s,i),l=t.stack&&o.includes(t.stack)?t.stack:o[0],h=kt(e,s,i,l,F(this)).map(d=>({series:d,name:d.name.text??(d.name.key&&ee(d.name.key)?c(d.name.key):d.id)}));h.length===1&&(h[0].name=j(c,i,s));let u=t.line==="grid_price"?e.areas.find(d=>d.kind==="grid")??s:s,g=t.line&&s.statistics?{figure:t.line,area:u,name:t.line_name??j(c,t.line,u)}:void 0;return this._plan(a,h,Vs[i],g,t.lines??[])}_plan(e,t,s,i,a){let c=new Set;for(let{series:l}of t)[...l.plus,...l.minus].forEach(h=>c.add(h));if(i)for(let l of Object.values(i.area.statistics))(l??[]).forEach(h=>c.add(h));a.forEach(l=>c.add(l.statistic));let o=[...c].sort();return{key:JSON.stringify([o,t.map(l=>[l.series.id,l.series.color]),i?.figure,a,e.range.start,e.range.end,e.period,e.compare?.start,e.compare?.end]),range:e.range,period:e.period,compare:e.compare,fromFirstValue:e.fromFirstValue,bars:t,unit:s,lineFigure:i,lines:a,ids:o}}async _load(e){if(!this.hass)return;this._loading=e.key;let t={key:e.key,at:Date.now(),plan:e,slots:Lt(e.range,e.period),rows:{},compareSlots:e.compare?Lt(e.compare,e.period):[],compareRows:{},metadata:{},failed:!1},s=this.hass,i=(a,c)=>s.callWS({type:"recorder/statistics_during_period",start_time:new Date(a.start).toISOString(),end_time:new Date(a.end+1).toISOString(),statistic_ids:c,period:Se(e.period),types:["change","mean"],units:{energy:"kWh"}});try{let a=e.lines.map(u=>u.statistic),c=[...new Set(e.bars.flatMap(({series:u})=>[...u.plus,...u.minus]))],[o,l,h]=await Promise.all([i(e.range,e.ids),e.compare?i(e.compare,c):Promise.resolve({}),a.length?this.hass.callWS({type:"recorder/get_statistics_metadata",statistic_ids:a}):Promise.resolve([])]);t.rows=o,t.compareRows=l,t.metadata=Object.fromEntries(h.map(u=>[u.statistic_id,u]))}catch{t.failed=!0}this._loading===e.key&&(this._loading=void 0,this._loaded=t)}willUpdate(e){if(!this.hass)return;(e.has("hass")||e.has("_config"))&&this._follow(),this._watchingChart||(this._watchingChart=!0,vt(i=>{this._hasChart=i})),this._info===void 0&&(this._info=K()),N()&&!this._infoLoading?this._loadInfo():!this._savings&&this.isConnected&&this._info?.calculating&&!this._retryTimer&&!this._infoLoading&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),W));let t=this._savings?this._savingsPlan():this._figurePlan(),s=!this._loaded||Date.now()-this._loaded.at>Hs;t&&t.key!==this._loading&&(t.key!==this._loaded?.key||s&&!this._loading)&&this._load(t),e.has("_loaded")&&(this._chart=this._buildChart())}_perSlot(e,t=!1){let s=this._loaded;if(!s)return[];let i=t?s.compareSlots:s.slots,a=t?s.compareRows:s.rows,c=i.map(()=>null);for(let o of e)Ot(a[o],i,s.plan.period).forEach((l,h)=>{l!==null&&(c[h]=(c[h]??0)+l)});return c}_barValues(e,t=!1){let s=this._perSlot(e.plus,t),i=this._perSlot(e.minus,t);return s.map((a,c)=>{if(a===null&&i[c]===null)return null;let o=(a??0)-(i[c]??0),l=e.floor?Math.max(o,0):o;return e.negative?-l:l})}_lines(){let e=this._loaded;if(!e)return[];let{plan:t,slots:s}=e,i=this._fmt,a=F(this),c=this.hass?.config.currency==="EUR"?100:1,o=[];if(t.lineFigure){let{figure:l,area:h,name:u}=t.lineFigure,g=Object.fromEntries(Object.entries(h.statistics).map(([f,y])=>[f,this._perSlot(y??[])])),d=s.map((f,y)=>$e(l,h,_=>g[_]?.[y]??null,null).value),p=$e(l,h,()=>0,null).unit;o.push({id:`line_${l}`,name:u,color:a.line,dash:"dashed",step:p==="price"&&t.period==="hour",values:p==="price"?d.map(f=>f===null?null:f*c):d,format:f=>i.value(p==="price"?f/c:f,p)})}return t.lines.forEach((l,h)=>{let u=e.metadata[l.statistic],g=l.value??(u?.has_sum?"change":"mean"),d=u?.unit_class==="energy"?"kWh":u?.statistics_unit_of_measurement??"",p=g==="mean"?Ir(e.rows[l.statistic],s,t.period):Ot(e.rows[l.statistic],s,t.period);o.push({id:`statistic_${h}`,name:l.name??u?.name??this.hass?.states[l.statistic]?.attributes.friendly_name??l.statistic,color:h===0&&!t.lineFigure?a.line:a.consumers[h%a.consumers.length],dash:"dotted",values:p,format:f=>`${i.number(f)}${d?` ${d}`:""}`})}),o}_buildChart(){let e=this._loaded;if(!e||e.failed)return;let t=this._localize,s=this._fmt,{plan:i}=e,a=i.bars.map(({series:_,name:$})=>({id:_.id,name:$,color:_.color,values:this._barValues(_),inTotal:!_.negative})),c=this._lines(),o=this._labels(e.slots,i.period),l=i.fromFirstValue?zr([...a,...c].map(_=>_.values),o.length):0,h=_=>_.slice(l);a.forEach(_=>_.values=h(_.values)),c=c.map(_=>({..._,values:h(_.values)})),o=h(o);let u=i.compare?{series:i.bars.map(({series:_,name:$})=>({id:_.id,name:$,color:_.color,values:this._barValues(_,!0),inTotal:!_.negative})),labels:this._labels(e.compareSlots,i.period).map(_=>_.tooltip)}:void 0,g={price:this.hass?.config.currency==="EUR"?"ct/kWh":`${s.currencySymbol()}/kWh`,percent:"%",per_100km:`${s.currencySymbol()}/100 km`},d=i.lineFigure&&!i.lines.length?g[$e(i.lineFigure.figure,i.lineFigure.area,()=>0,null).unit]??"":"",p=$r({labels:o,labelEvery:i.period==="hour"?o.length>25?8:4:void 0,series:a,compare:u,unit:i.unit==="money"?s.currencySymbol():i.unit==="distance"?"km":"kWh",total:t("history_total"),format:_=>i.unit==="money"?s.value(_,"money"):`${s.number(_,Math.abs(_)<10?2:1)} ${i.unit==="distance"?"km":"kWh"}`,tick:_=>s.number(_),lineTick:_=>s.number(_,Number.isInteger(_)?0:1),lines:c,lineUnit:d}),y=a.filter(_=>_.inTotal!==!1).flatMap(_=>_.values).reduce((_,$)=>_+($??0),0),x=[...a,...c].some(_=>_.values.some($=>$));return{...p,total:y,hasData:x}}_labels(e,t){let s=h=>new Intl.DateTimeFormat(this._language,h),i=s({hour:"numeric",minute:"2-digit",hour12:Rr(this.hass?.locale)}),a=s({day:"numeric",month:"short"}),c=e.length>0&&new Date(e[0]).getFullYear()!==new Date(e[e.length-1]).getFullYear(),o={hour:i,day:s({day:"numeric"}),month:s(c?{month:"short",year:"2-digit"}:{month:"short"}),year:s({year:"numeric"})}[t],l={hour:i,day:s({weekday:"short",day:"numeric",month:"short"}),month:s({month:"long",year:"numeric"}),year:s({year:"numeric"})}[t];return e.map(h=>({axis:t==="hour"&&new Date(h).getHours()===0?a.format(h):o.format(h),tooltip:t==="hour"?`${i.format(h)} \u2013 ${i.format(h+36e5)}`:l.format(h)}))}_title(){let e=this._localize;if(this._config.title)return this._config.title;if(this._savings)return e("history_title");let t=this._config.figure??"energy",s=this._info?.areas.find(a=>a.id===this._config.area);if(s)return j(e,t,s);let i=`figure.${t}`;return ee(i)?e(i):e("history_title")}render(){let e=this._localize;if(!this.hass)return m``;let t=this._title();if(this._savings&&!L(this.hass).length)return m`<ha-card>
        <div class="header"><h2 class="title">${t}</h2></div>
        <p class="summary">${e(Ee(this.hass))}</p>
      </ha-card>`;let s=this._savings?L(this.hass).some(l=>l.calculating):this._info?.calculating===!0,i=s?void 0:this._loaded,a=this._chart?.hasData??!1,c=i?.plan.unit??"money",o=!this._savings&&this._info!==void 0&&!this._info?.areas.some(l=>l.id===this._config.area&&l.statistics[this._config.figure??"energy"]?.length);return m`<ha-card>
      <div class="header">
        <h2 class="title">${t}</h2>
        ${i&&!i.failed&&a&&this._chart?m`<span class="chip">${this._fmt.value(this._chart.total,c)}</span>`:v}
      </div>
      ${s?m`<p class="summary">${ae(e,Ae(this.hass,this._info))}</p>`:o?m`<p class="summary">${e(this._info===null?"editor_not_loaded":"figures_unavailable")}</p>`:this._body(i,a)}
    </ha-card>`}_body(e,t){let s=this._localize;return this._hasChart===!1?m`<p class="summary">${s("history_no_chart")}</p>`:e?.failed?m`<p class="summary">${s("history_failed")}</p>`:m`<div class="chart">
      ${this._chart&&this._hasChart?m`<ha-chart-base
            .hass=${this.hass}
            .data=${this._chart.data}
            .options=${this._chart.options}
          ></ha-chart-base>`:v}
      ${e&&!t?m`<div class="empty">
            ${s(this._savings?"history_empty":"history_empty_figure")}
          </div>`:v}
    </div>`}};Le.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0},_selected:{state:!0},_loaded:{state:!0},_hasChart:{state:!0}},Le.styles=[z,C`
      .chart {
        position: relative;
        min-height: ${at(Ns)};
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
    `];function Us(n,r,e={}){let t=a=>r.areas.find(c=>c.id===a)?.statistics??{},s=r.areas.find(a=>a.kind==="grid")?.statistics??{},i=[];for(let a of n){let c=[a.savingStatistic];if(a.category==="pv"){let o=s.export?.length?s.export:[],l=o.length?s.feed_in??[]:[];i.push({name:"savings_pv",color:pe.solar,plus:c,minus:l,energy:t("solar").self_used??[]}),l.length&&i.push({name:"savings_feed_in",color:pe.export,plus:l,minus:[],energy:o})}else a.category==="heat_pump"?i.push({name:a.heating==="oil"?"savings_oil":"savings_gas",color:e.heat??pe.heat,plus:c,minus:[],energy:t("heat_pump").energy??[]}):i.push({name:"savings_fuel",color:e.car??pe.car,plus:c,minus:[],energy:t("wallbox").energy??[]})}return i}var Xe=class extends Y{constructor(){super(...arguments);this._config={}}static getStubConfig(){return{}}static getConfigElement(){return document.createElement("electricity-lens-savings-card-editor")}setConfig(e){V(e?.collection_key),this._config=e??{},this._collectionKey=this._config.collection_key,this.requestUpdate()}get _area(){return this._info?.areas.find(e=>e.id===this._config.area)}_rows(){if(!this.hass||!this._info)return[];let e=M(this._info,F(this));return Us(L(this.hass),this._info,{heat:e.get("heat_pump"),car:e.get("wallbox")})}_ids(){if(this._config.area){let e=this._area?.statistics;return e?.alternative_cost?.length&&e.cost?.length&&e.saving?.length?[...e.alternative_cost,...e.cost,...e.saving,...e.solar_saving??[]]:[]}return this._rows().flatMap(e=>[...e.plus,...e.minus,...e.energy])}render(){let e=this._localize;if(!this.hass)return m``;let t=this._waiting();return m`<ha-card>
      <div class="header"><h2 class="title">${e("savings_title")}</h2></div>
      ${t?m`<p class="summary">${this._waitingText(t)}</p>`:this._config.area?this._reckoning():this._table()}
    </ha-card>`}_reckoning(){let e=this._localize,t=this._fmt,s=this._area,i=this._sums?.values??{},a=O(i,s?.statistics.alternative_cost),c=O(i,s?.statistics.cost),o=O(i,s?.statistics.solar_saving),l=O(i,s?.statistics.saving),h=l+o,u=L(this.hass).find(p=>p.category===s?.id)?.heating,g=s?.id==="wallbox"?"savings_instead_fuel":u==="oil"?"savings_instead_oil":"savings_instead_gas",d=Math.abs(o)>=.005;return m`<table>
        <tbody>
          <tr>
            <td class="name">${e(g)}</td>
            <td>${t.value(a,"money")}</td>
          </tr>
          <tr>
            <td class="name">
              ${s?.id==="wallbox"?e("strategy.charging_cost"):e("savings_electricity",{name:s?.name??""})}
            </td>
            <td>${t.value(-c,"money")}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th scope="row" class="name">${e("savings_saved")}</th>
            <td>${t.value(h,"money")}</td>
          </tr>
          ${d?m`<tr class="quiet">
                <th scope="row" class="name">${e("savings_solar_part")}</th>
                <td>${t.value(o,"money")}</td>
              </tr>
              <tr class="quiet">
                <th scope="row" class="name">${e("savings_in_balance")}</th>
                <td>${t.value(l,"money")}</td>
              </tr>`:v}
        </tfoot>
      </table>`}_table(){let e=this._localize,t=this._fmt,s=this._rows(),i=this._sums?.values??{},a=o=>O(i,o.plus)-O(i,o.minus),c=s.reduce((o,l)=>o+a(l),0);return m`<table>
        <thead>
          <tr>
            <th class="swatch-cell"></th>
            <th scope="col" class="name">${e("savings_source")}</th>
            <th scope="col">${e("savings_energy")}</th>
            <th scope="col">${e("savings_amount")}</th>
          </tr>
        </thead>
        <tbody>
          ${s.map(o=>{let l=O(i,o.energy);return m`<tr>
              <td class="swatch-cell">
                <span class="swatch" style="--color: ${o.color}" aria-hidden="true"></span>
              </td>
              <td class="name">${e(o.name)}</td>
              <!-- Older periods may hold savings, but no energy to go with them. -->
              <td>${l||!a(o)?t.value(l,"energy"):"\u2013"}</td>
              <td>${t.value(a(o),"money")}</td>
            </tr>`})}
        </tbody>
        <tfoot>
          <tr>
            <td class="swatch-cell"></td>
            <th scope="row" class="name">${e("savings_total")}</th>
            <td></td>
            <td>${t.value(c,"money")}</td>
          </tr>
        </tfoot>
      </table>`}};Xe.styles=[z,Re];var Bs=["energy","statistic","entity"],Oe=n=>({select:{mode:"dropdown",options:n}}),He=class extends T{constructor(){super(...arguments);this._requested=!1;this._label=e=>this._localize(`editor_${e.name}`);this._helper=e=>e.name==="period"?this._localize("editor_period_hint"):void 0}setConfig(e){this._config=e}get _localize(){return S(this.hass?.locale?.language??this.hass?.language??"en")}willUpdate(){this.hass&&!this._requested&&(this._requested=!0,this.hass.callWS({type:`${R}/figures`}).then(e=>{this._info=e}).catch(()=>{this._info=null}))}_schema(e){let t=this._localize,s=U(e),i=[{name:"source",selector:Oe(Bs.map(a=>({value:a,label:t(`source.${a}`)})))}];if(s==="energy"){let a=this._info?.areas??[],c=a.find(o=>o.id===e.area);i.push({name:"area",selector:Oe(a.map(o=>({value:o.id,label:o.name})))},{name:"figure",selector:Oe(c?ie(c).map(o=>({value:o,label:j(t,o,c)})):[])})}else s==="statistic"?(i.push({name:"statistic",selector:{statistic:{}}},{name:"value",selector:Oe(Pr.map(a=>({value:a,label:t(`value.${a}`)})))}),(e.value??"change")==="mean"&&i.push({name:"secondary",selector:Oe(["none","range"].map(a=>({value:a,label:t(`secondary.${a}`)})))})):i.push({name:"entity",selector:{entity:{}}});return i.push({name:"name",selector:{text:{}}}),s!=="entity"&&!(e.figure&&(me(e.figure)||fe(e.figure)))&&i.push({name:"period",selector:Oe(oe.map(a=>({value:a,label:t(`period.${a}`)})))}),i}_figureFrom(e,t){let s=e.source??U(t);if(s!==U(t))return s==="energy"?{area:"household",figure:"cost"}:s==="statistic"?{statistic:"",value:"change"}:{entity:""};if(s==="energy"){let i=e.area??t.area,a=this._info?.areas.find(l=>l.id===i),c=a?ie(a):[],o=c.includes(e.figure)?e.figure:c[0];return{area:i,figure:o,...t.secondary==="none"?{secondary:"none"}:{}}}if(s==="statistic"){let i={statistic:e.statistic??"",value:e.value??"change"};return i.value==="mean"&&e.secondary==="range"&&(i.secondary="range"),i}return{entity:e.entity??""}}_changed(e){if(!this._config)return;let t=e.detail.value,{area:s,figure:i,statistic:a,value:c,secondary:o,entity:l,name:h,...u}=this._config,g={...u,period:t.period??"energy_date",...this._figureFrom(t,this._config)};typeof t.name=="string"&&t.name&&(g.name=t.name),this._config=g,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:g},bubbles:!0,composed:!0}))}render(){if(!this.hass||!this._config)return m``;let e=this._config;return m`<div class="editor">
      ${U(e)==="energy"&&this._info===null?m`<p class="hint">${this._localize("editor_not_loaded")}</p>`:v}
      <ha-form
        .hass=${this.hass}
        .data=${{source:U(e),...e,value:e.value??"change",secondary:e.secondary??"none",period:e.period??"energy_date"}}
        .schema=${this._schema(e)}
        .computeLabel=${this._label}
        .computeHelper=${this._helper}
        @value-changed=${this._changed}
      ></ha-form>
    </div>`}};He.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0}},He.styles=C`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .hint {
      margin: 0;
      color: var(--secondary-text-color);
    }
  `;var Gt="savings",et=n=>({select:{mode:"dropdown",options:n}}),Ne=class extends T{constructor(){super(...arguments);this._requested=!1;this._label=e=>this._localize(`editor_${e.name}`);this._helper=e=>e.name==="period"?this._localize(this._config?.area?"editor_period_hint":"editor_period_hint_years"):void 0}setConfig(e){this._config=e}get _localize(){return S(this.hass?.locale?.language??this.hass?.language??"en")}willUpdate(){this.hass&&!this._requested&&(this._requested=!0,this.hass.callWS({type:`${R}/figures`}).then(e=>{this._info=e}).catch(()=>{this._info=null}))}_schema(){let e=this._localize,t=this._config??{type:""},s=this._info?.areas??[],i=[{name:"title",selector:{text:{}}},{name:"period",selector:et([...oe,"all"].map(c=>({value:c,label:e(`period.${c}`)})))},{name:"area",selector:et([{value:Gt,label:e("editor_savings")},...s.filter(c=>Je(c).length).map(c=>({value:c.id,label:c.name}))])}],a=s.find(c=>c.id===t.area);if(a){let c=Je(a),o=t.figure&&c.includes(t.figure)?t.figure:c[0];i.push({name:"figure",selector:et(c.map(l=>({value:l,label:j(e,l,a)})))},{name:"stack",selector:et(Te(a,o).map(l=>({value:l,label:e(`stack.${l}`)})))},{name:"line",selector:et([{value:"none",label:e("editor_line_none")},...Bt(a).map(l=>({value:l,label:j(e,l,a)}))])},{name:"lines",selector:{statistic:{multiple:!0}}})}return i}_data(){let e=this._config??{type:""},t=this._info?.areas.find(a=>a.id===e.area),s=t?Je(t):[],i=e.figure&&s.includes(e.figure)?e.figure:s[0];return{title:e.title??"",period:e.period??"energy_date",area:e.area??Gt,figure:i,stack:e.stack??(t&&i?Te(t,i)[0]:void 0),line:e.line??"none",lines:(e.lines??[]).map(a=>a.statistic)}}_changed(e){if(!this._config)return;let t=e.detail.value,{title:s,period:i,area:a,figure:c,stack:o,line:l,lines:h,...u}=this._config,g=u;typeof t.title=="string"&&t.title&&(g.title=t.title),g.period=t.period??"energy_date";let d=t.area;if(d&&d!==Gt){g.area=d;let p=this._info?.areas.find(w=>w.id===d),f=p?Je(p):[],y=f.includes(t.figure)?t.figure:f[0];y&&(g.figure=y),(p&&y?Te(p,y):[]).includes(t.stack)&&(g.stack=t.stack),(p?Bt(p):[]).includes(t.line)&&(g.line=t.line);let $=new Map((this._config.lines??[]).map(w=>[w.statistic,w])),D=(Array.isArray(t.lines)?t.lines:[]).filter(Boolean).map(w=>$.get(w)??{statistic:w});D.length&&(g.lines=D)}this._config=g,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:g},bubbles:!0,composed:!0}))}render(){return!this.hass||!this._config?m``:m`<div class="editor">
      ${this._info===null?m`<p class="hint">${this._localize("editor_not_loaded")}</p>`:v}
      <ha-form
        .hass=${this.hass}
        .data=${this._data()}
        .schema=${this._schema()}
        .computeLabel=${this._label}
        .computeHelper=${this._helper}
        @value-changed=${this._changed}
      ></ha-form>
    </div>`}};Ne.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0}},Ne.styles=C`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .hint {
      margin: 0;
      color: var(--secondary-text-color);
    }
  `;var Br="https://github.com/ignazhabibi/ha-electricity-lens",jt=(n,r)=>{if(!customElements.get(n))try{customElements.define(n,r)}catch{customElements.define(n,class extends r{})}};function Wr(n,r=[]){let e=()=>{n.forEach(({tag:c,card:o,editor:l})=>{jt(c,o),l&&jt(l.tag,l.element)}),r.forEach(({type:c,element:o})=>jt(`ll-strategy-dashboard-${c}`,o))};e();let t=window.customElements,s=Date.now(),i=window.setInterval(()=>{let c=window.customElements!==t;c&&e(),(c||Date.now()-s>6e4)&&window.clearInterval(i)},100),a=window;a.customStrategies=a.customStrategies??[];for(let{type:c,name:o,description:l}of r)a.customStrategies.some(h=>h.type===c)||a.customStrategies.push({type:c,strategyType:"dashboard",name:o,description:l,documentationURL:Br});a.customCards=a.customCards??[];for(let{tag:c,name:o,description:l}of n)a.customCards.some(h=>h.type===c)||a.customCards.push({type:c,name:o,description:l,preview:!0,documentationURL:Br})}var Yt="all",tt=class extends T{constructor(){super(...arguments);this._label=()=>this._localize("editor_area")}setConfig(e){this._config=e}get _localize(){return S(this.hass?.locale?.language??this.hass?.language??"en")}_changed(e){let{area:t,...s}=this._config??{},i=e.detail.value.area,a=i&&i!==Yt?{...s,area:i}:s;this._config=a,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:a},bubbles:!0,composed:!0}))}render(){if(!this.hass||!this._config)return m``;let e=this._localize,t=new Set(L(this.hass).map(i=>i.category)),s=[{name:"area",selector:{select:{mode:"dropdown",options:[{value:Yt,label:e("editor_savings")},...["heat_pump","wallbox"].filter(i=>i===this._config?.area||t.has(i)).map(i=>({value:i,label:e(`category.${i}`)}))]}}}];return m`<ha-form
      .hass=${this.hass}
      .data=${{area:this._config.area??Yt}}
      .schema=${s}
      .computeLabel=${this._label}
      @value-changed=${this._changed}
    ></ha-form>`}};tt.properties={hass:{attribute:!1},_config:{state:!0}};var E=(n,r={})=>({type:n.startsWith("electricity-lens")?`custom:${n}`:n,...r}),Kr={grid_options:{columns:"full"}},Ve={grid_options:{columns:6}},te={grid_options:{columns:12}},Gr=(n,r,e={},t)=>E("electricity-lens-figures-card",{area:n,figure:r,...t?{name:t}:{},...Ve,...e}),rt=(n,r,e,t,s=!0)=>({title:n,path:r,type:"sections",max_columns:3,sections:[{type:"grid",column_span:2,cards:[...s?[E("energy-date-selection",Kr)]:[],...e.map(i=>({...Kr,...i}))]}],sidebar:{sections:[{type:"grid",cards:t}]}}),Ws=.35,Ks=.65;function Gs(n){let r=Object.values(n.entities??{}).filter(a=>a.platform===R),e=["pv","heat_pump","wallbox"],s=r.filter(a=>a.translation_key==="saving").map(a=>n.states[a.entity_id]?.attributes.category).filter(a=>e.includes(a)),i=["today","tomorrow"].flatMap(a=>{let c=a==="today"?"forecast_rest_today":"forecast_tomorrow",o=r.find(u=>u.translation_key===c)?.entity_id;if(!o)return[];let l=n.states[o]?.attributes??{},h=typeof l.best_day=="number"?l.best_day:void 0;return[{day:a,entity:o,bestDay:h,fullYear:l.best_day_full_year===!0}]});return{categories:s,investments:wt(n),forecasts:i}}function js(n,r,e={categories:[],investments:[],forecasts:[]}){let t=(w,b,k={})=>Gr(w,b,k,r(`figure.${b}`)),s=(w,b,k,Ue={})=>Gr(w,b,Ue,r(k)),i=(w,b,k={})=>E(w,{title:r(b),...k}),a=w=>n.areas.find(b=>b.id===w),c=a("solar"),o=a("heat_pump"),l=a("wallbox"),h=n.areas.some(w=>w.kind==="device"),u=!!c||n.levels.cheap_until!==null||n.levels.expensive_from!==null,g=!!(c?.statistics.saving?.length||o||l||e.categories.length),d={period:"today"},p={line:"price",...c?{line_name:r("strategy.price_with_solar")}:{}},f=(w,b={})=>c?s(w,"price","strategy.price_with_solar",b):t(w,"price",b),y={secondary:"none"},x=(w,b={})=>E("electricity-lens-history-card",{area:w,figure:"energy",stack:"source",...p,...b}),_=w=>u?[E("electricity-lens-breakdown-card",{area:w,by:"source",...te})]:[],$=e.investments.flatMap(({category:w,payback:b,annualReturn:k})=>[E("electricity-lens-figures-card",{area:Ze(w),figure:"payback",name:r(`strategy.payback_${w}`),visibility:[{condition:"numeric_state",entity:b,below:100}],...Ve}),E("electricity-lens-figures-card",{area:Ze(w),figure:"annual_return",name:r(`strategy.return_${w}`),visibility:[{condition:"numeric_state",entity:k,above:-1}],...Ve})]),A=c?.forecast?e.forecasts.map(({entity:w,day:b,bestDay:k,fullYear:Ue})=>{let Be=k?Math.ceil(k):void 0;return E("gauge",{entity:w,name:r(`strategy.forecast_${b}`),min:0,...Be?{max:Be}:{},needle:!1,...Be&&Ue?{severity:{red:0,yellow:Math.round(Be*Ws*10)/10,green:Math.round(Be*Ks*10)/10}}:{},...Ve})}):[],D=[];return D.push(rt(r("strategy.overview"),"now",[...n.power?.grid.length?[E("electricity-lens-flow-card")]:[],g?E("electricity-lens-balance-card"):x("household",d)],[...A,s("household","cost","strategy.cost_today",d),s("household","energy","strategy.consumption_today",d),...$],!1)),D.push(rt(r("strategy.electricity"),"household",[i("energy-usage-graph","strategy.usage_graph"),...c?[i("energy-solar-graph","strategy.solar_graph")]:[],...h?[E("electricity-lens-history-card",{title:r("strategy.devices_graph"),area:"household",figure:"energy",stack:"consumer"})]:[]],[i("energy-distribution","strategy.distribution",te),..._("household"),...c?[E("energy-self-sufficiency-gauge",Ve),E("energy-solar-consumed-gauge",Ve)]:[]])),D.push(rt(r("strategy.costs"),"costs",[i("electricity-lens-history-card","strategy.bill",{area:"household",figure:"cost",stack:"bill",line:"grid_price"}),...c?[i("electricity-lens-history-card","strategy.cost_with_solar",{area:"household",figure:"cost",stack:"source",...p})]:[],...h?[i("electricity-lens-history-card","strategy.cost_history",{area:"household",figure:"cost",stack:"consumer",...c?{}:p})]:[]],[t("grid","grid_price",y),f("household",y),...h?[i("electricity-lens-breakdown-card","strategy.cost_distribution",{area:"household",by:"consumer",figure:"cost",display:"bars",color_by_source:!0,...te})]:[],...g?[E("electricity-lens-savings-card",te)]:[]])),o&&D.push(rt(r("strategy.heating"),"heating",[i("electricity-lens-history-card","figure.heat",{area:"heat_pump",figure:"heat",stack:"consumer",line:"scop",line_name:r("figure.scop")}),i("electricity-lens-history-card","strategy.usage_graph",{area:"heat_pump",figure:"energy",stack:"source"}),i("electricity-lens-history-card",c?"strategy.cost_with_solar":"figure.cost",{area:"heat_pump",figure:"cost",stack:"source",...p})],[t("heat_pump","scop",y),t("heat_pump","heat_price",y),..._("heat_pump"),...xt(n).length?[E("electricity-lens-heat-meters-card",te)]:[...(o.statistics.energy?.length??0)>1?[E("electricity-lens-breakdown-card",{area:"heat_pump",by:"consumer",figure:"energy",display:"bars",color_by_source:!0,...te})]:[],...(o.statistics.heat_meters?.length??0)>1?[E("electricity-lens-breakdown-card",{title:r("figure.heat"),statistics:(o.statistics.heat_meters??[]).map(w=>({statistic:w})),display:"bars",...te})]:[]],E("electricity-lens-savings-card",{area:"heat_pump",...te})])),l&&D.push(rt(r("strategy.charging"),"charging",[i("electricity-lens-history-card","strategy.charged_energy",{area:"wallbox",figure:"energy",stack:"source"}),i("electricity-lens-history-card","strategy.charging_cost",{area:"wallbox",figure:"cost",stack:"source",...p})],[t("wallbox","device_grid_price",y),f("wallbox",y),..._("wallbox"),E("electricity-lens-savings-card",{area:"wallbox",...te})])),D}var Ys=3e4,qs=1e3;async function Zs(n){let r=n.config.state!==void 0&&n.config.state!=="RUNNING",e=Date.now()+Ys;for(;;)try{return await n.callWS({type:`${R}/figures`})}catch(t){if(!r||Date.now()>=e)throw t;await new Promise(s=>setTimeout(s,qs))}}var st=class extends HTMLElement{static async generate(r,e){let t=S(e.locale?.language??e.language??"en"),s;try{s=await Zs(e)}catch{return{title:t("strategy.title"),views:[{title:t("strategy.title"),cards:[{type:"markdown",content:t("strategy.not_loaded")}]}]}}return{title:t("strategy.title"),views:js(s,t,Gs(e))}}};st.noEditor=!0;var P=S(document.documentElement.lang||navigator.language||"en");Wr([{tag:"electricity-lens-flow-card",card:Ie,name:P("picker.flow"),description:P("picker.flow.description")},{tag:"electricity-lens-balance-card",card:ze,name:P("picker.economics"),description:P("picker.economics.description")},{tag:"electricity-lens-savings-card",card:Xe,name:P("picker.savings"),description:P("picker.savings.description"),editor:{tag:"electricity-lens-savings-card-editor",element:tt}},{tag:"electricity-lens-heat-meters-card",card:Qe,name:P("picker.heat_meters"),description:P("picker.heat_meters.description")},{tag:"electricity-lens-history-card",card:Le,name:P("picker.history"),description:P("picker.history.description"),editor:{tag:"electricity-lens-history-card-editor",element:Ne}},{tag:"electricity-lens-figures-card",card:Fe,name:P("picker.figures"),description:P("picker.figures.description"),editor:{tag:"electricity-lens-figures-card-editor",element:He}},{tag:"electricity-lens-breakdown-card",card:Pe,name:P("picker.breakdown"),description:P("picker.breakdown.description"),editor:{tag:"electricity-lens-breakdown-card-editor",element:Me}}],[{type:"electricity-lens",element:st,name:P("picker.dashboard"),description:P("picker.dashboard.description")}]);
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
