var Ke=globalThis,Ge=Ke.ShadowRoot&&(Ke.ShadyCSS===void 0||Ke.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ht=Symbol(),Mt=new WeakMap,Fe=class{constructor(s,e,t){if(this._$cssResult$=!0,t!==ht)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=s,this.t=e}get styleSheet(){let s=this.o,e=this.t;if(Ge&&s===void 0){let t=e!==void 0&&e.length===1;t&&(s=Mt.get(e)),s===void 0&&((this.o=s=new CSSStyleSheet).replaceSync(this.cssText),t&&Mt.set(e,s))}return s}toString(){return this.cssText}},Ye=n=>new Fe(typeof n=="string"?n:n+"",void 0,ht),E=(n,...s)=>{let e=n.length===1?n[0]:s.reduce((t,i,r)=>t+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+n[r+1],n[0]);return new Fe(e,n,ht)},It=(n,s)=>{if(Ge)n.adoptedStyleSheets=s.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of s){let t=document.createElement("style"),i=Ke.litNonce;i!==void 0&&t.setAttribute("nonce",i),t.textContent=e.cssText,n.appendChild(t)}},gt=Ge?n=>n:n=>n instanceof CSSStyleSheet?(s=>{let e="";for(let t of s.cssRules)e+=t.cssText;return Ye(e)})(n):n;var{is:Cs,defineProperty:As,getOwnPropertyDescriptor:Rs,getOwnPropertyNames:Es,getOwnPropertySymbols:Ts,getPrototypeOf:Fs}=Object,Je=globalThis,Lt=Je.trustedTypes,Ps=Lt?Lt.emptyScript:"",Ds=Je.reactiveElementPolyfillSupport,Pe=(n,s)=>n,pt={toAttribute(n,s){switch(s){case Boolean:n=n?Ps:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,s){let e=n;switch(s){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},Ot=(n,s)=>!Cs(n,s),zt={attribute:!0,type:String,converter:pt,reflect:!1,useDefault:!1,hasChanged:Ot};Symbol.metadata??=Symbol("metadata"),Je.litPropertyMetadata??=new WeakMap;var G=class extends HTMLElement{static addInitializer(s){this._$Ei(),(this.l??=[]).push(s)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(s,e=zt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(s)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(s,e),!e.noAccessor){let t=Symbol(),i=this.getPropertyDescriptor(s,t,e);i!==void 0&&As(this.prototype,s,i)}}static getPropertyDescriptor(s,e,t){let{get:i,set:r}=Rs(this.prototype,s)??{get(){return this[e]},set(a){this[e]=a}};return{get:i,set(a){let c=i?.call(this);r?.call(this,a),this.requestUpdate(s,c,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(s){return this.elementProperties.get(s)??zt}static _$Ei(){if(this.hasOwnProperty(Pe("elementProperties")))return;let s=Fs(this);s.finalize(),s.l!==void 0&&(this.l=[...s.l]),this.elementProperties=new Map(s.elementProperties)}static finalize(){if(this.hasOwnProperty(Pe("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Pe("properties"))){let e=this.properties,t=[...Es(e),...Ts(e)];for(let i of t)this.createProperty(i,e[i])}let s=this[Symbol.metadata];if(s!==null){let e=litPropertyMetadata.get(s);if(e!==void 0)for(let[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let i=this._$Eu(e,t);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(s){let e=[];if(Array.isArray(s)){let t=new Set(s.flat(1/0).reverse());for(let i of t)e.unshift(gt(i))}else s!==void 0&&e.push(gt(s));return e}static _$Eu(s,e){let t=e.attribute;return t===!1?void 0:typeof t=="string"?t:typeof s=="string"?s.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(s=>this.enableUpdating=s),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(s=>s(this))}addController(s){(this._$EO??=new Set).add(s),this.renderRoot!==void 0&&this.isConnected&&s.hostConnected?.()}removeController(s){this._$EO?.delete(s)}_$E_(){let s=new Map,e=this.constructor.elementProperties;for(let t of e.keys())this.hasOwnProperty(t)&&(s.set(t,this[t]),delete this[t]);s.size>0&&(this._$Ep=s)}createRenderRoot(){let s=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return It(s,this.constructor.elementStyles),s}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(s=>s.hostConnected?.())}enableUpdating(s){}disconnectedCallback(){this._$EO?.forEach(s=>s.hostDisconnected?.())}attributeChangedCallback(s,e,t){this._$AK(s,t)}_$ET(s,e){let t=this.constructor.elementProperties.get(s),i=this.constructor._$Eu(s,t);if(i!==void 0&&t.reflect===!0){let r=(t.converter?.toAttribute!==void 0?t.converter:pt).toAttribute(e,t.type);this._$Em=s,r==null?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(s,e){let t=this.constructor,i=t._$Eh.get(s);if(i!==void 0&&this._$Em!==i){let r=t.getPropertyOptions(i),a=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:pt;this._$Em=i;let c=a.fromAttribute(e,r.type);this[i]=c??this._$Ej?.get(i)??c,this._$Em=null}}requestUpdate(s,e,t,i=!1,r){if(s!==void 0){let a=this.constructor;if(i===!1&&(r=this[s]),t??=a.getPropertyOptions(s),!((t.hasChanged??Ot)(r,e)||t.useDefault&&t.reflect&&r===this._$Ej?.get(s)&&!this.hasAttribute(a._$Eu(s,t))))return;this.C(s,e,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(s,e,{useDefault:t,reflect:i,wrapped:r},a){t&&!(this._$Ej??=new Map).has(s)&&(this._$Ej.set(s,a??e??this[s]),r!==!0||a!==void 0)||(this._$AL.has(s)||(this.hasUpdated||t||(e=void 0),this._$AL.set(s,e)),i===!0&&this._$Em!==s&&(this._$Eq??=new Set).add(s))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let s=this.scheduleUpdate();return s!=null&&await s,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,r]of this._$Ep)this[i]=r;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[i,r]of t){let{wrapped:a}=r,c=this[i];a!==!0||this._$AL.has(i)||c===void 0||this.C(i,void 0,r,c)}}let s=!1,e=this._$AL;try{s=this.shouldUpdate(e),s?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(t){throw s=!1,this._$EM(),t}s&&this._$AE(e)}willUpdate(s){}_$AE(s){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(s)),this.updated(s)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(s){return!0}update(s){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(s){}firstUpdated(s){}};G.elementStyles=[],G.shadowRootOptions={mode:"open"},G[Pe("elementProperties")]=new Map,G[Pe("finalized")]=new Map,Ds?.({ReactiveElement:G}),(Je.reactiveElementVersions??=[]).push("2.1.2");var ft=globalThis,Ht=n=>n,qe=ft.trustedTypes,Nt=qe?qe.createPolicy("lit-html",{createHTML:n=>n}):void 0,_t="$lit$",Y=`lit$${Math.random().toFixed(9).slice(2)}$`,yt="?"+Y,Ms=`<${yt}>`,ne=document,Me=()=>ne.createComment(""),Ie=n=>n===null||typeof n!="object"&&typeof n!="function",vt=Array.isArray,Kt=n=>vt(n)||typeof n?.[Symbol.iterator]=="function",mt=`[ 	
\f\r]`,De=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ut=/-->/g,Vt=/>/g,ie=RegExp(`>|${mt}(?:([^\\s"'>=/]+)(${mt}*=${mt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Bt=/'/g,Wt=/"/g,Gt=/^(?:script|style|textarea|title)$/i,bt=n=>(s,...e)=>({_$litType$:n,strings:s,values:e}),p=bt(1),Fi=bt(2),Pi=bt(3),ae=Symbol.for("lit-noChange"),y=Symbol.for("lit-nothing"),jt=new WeakMap,re=ne.createTreeWalker(ne,129);function Yt(n,s){if(!vt(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return Nt!==void 0?Nt.createHTML(s):s}var Jt=(n,s)=>{let e=n.length-1,t=[],i,r=s===2?"<svg>":s===3?"<math>":"",a=De;for(let c=0;c<e;c++){let o=n[c],l,d,u=-1,g=0;for(;g<o.length&&(a.lastIndex=g,d=a.exec(o),d!==null);)g=a.lastIndex,a===De?d[1]==="!--"?a=Ut:d[1]!==void 0?a=Vt:d[2]!==void 0?(Gt.test(d[2])&&(i=RegExp("</"+d[2],"g")),a=ie):d[3]!==void 0&&(a=ie):a===ie?d[0]===">"?(a=i??De,u=-1):d[1]===void 0?u=-2:(u=a.lastIndex-d[2].length,l=d[1],a=d[3]===void 0?ie:d[3]==='"'?Wt:Bt):a===Wt||a===Bt?a=ie:a===Ut||a===Vt?a=De:(a=ie,i=void 0);let h=a===ie&&n[c+1].startsWith("/>")?" ":"";r+=a===De?o+Ms:u>=0?(t.push(l),o.slice(0,u)+_t+o.slice(u)+Y+h):o+Y+(u===-2?c:h)}return[Yt(n,r+(n[e]||"<?>")+(s===2?"</svg>":s===3?"</math>":"")),t]},Le=class n{constructor({strings:s,_$litType$:e},t){let i;this.parts=[];let r=0,a=0,c=s.length-1,o=this.parts,[l,d]=Jt(s,e);if(this.el=n.createElement(l,t),re.currentNode=this.el.content,e===2||e===3){let u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(i=re.nextNode())!==null&&o.length<c;){if(i.nodeType===1){if(i.hasAttributes())for(let u of i.getAttributeNames())if(u.endsWith(_t)){let g=d[a++],h=i.getAttribute(u).split(Y),_=/([.?@])?(.*)/.exec(g);o.push({type:1,index:r,name:_[2],strings:h,ctor:_[1]==="."?Qe:_[1]==="?"?Xe:_[1]==="@"?et:ce}),i.removeAttribute(u)}else u.startsWith(Y)&&(o.push({type:6,index:r}),i.removeAttribute(u));if(Gt.test(i.tagName)){let u=i.textContent.split(Y),g=u.length-1;if(g>0){i.textContent=qe?qe.emptyScript:"";for(let h=0;h<g;h++)i.append(u[h],Me()),re.nextNode(),o.push({type:2,index:++r});i.append(u[g],Me())}}}else if(i.nodeType===8)if(i.data===yt)o.push({type:2,index:r});else{let u=-1;for(;(u=i.data.indexOf(Y,u+1))!==-1;)o.push({type:7,index:r}),u+=Y.length-1}r++}}static createElement(s,e){let t=ne.createElement("template");return t.innerHTML=s,t}};function oe(n,s,e=n,t){if(s===ae)return s;let i=t!==void 0?e._$Co?.[t]:e._$Cl,r=Ie(s)?void 0:s._$litDirective$;return i?.constructor!==r&&(i?._$AO?.(!1),r===void 0?i=void 0:(i=new r(n),i._$AT(n,e,t)),t!==void 0?(e._$Co??=[])[t]=i:e._$Cl=i),i!==void 0&&(s=oe(n,i._$AS(n,s.values),i,t)),s}var Ze=class{constructor(s,e){this._$AV=[],this._$AN=void 0,this._$AD=s,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(s){let{el:{content:e},parts:t}=this._$AD,i=(s?.creationScope??ne).importNode(e,!0);re.currentNode=i;let r=re.nextNode(),a=0,c=0,o=t[0];for(;o!==void 0;){if(a===o.index){let l;o.type===2?l=new pe(r,r.nextSibling,this,s):o.type===1?l=new o.ctor(r,o.name,o.strings,this,s):o.type===6&&(l=new tt(r,this,s)),this._$AV.push(l),o=t[++c]}a!==o?.index&&(r=re.nextNode(),a++)}return re.currentNode=ne,i}p(s){let e=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(s,t,e),e+=t.strings.length-2):t._$AI(s[e])),e++}},pe=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(s,e,t,i){this.type=2,this._$AH=y,this._$AN=void 0,this._$AA=s,this._$AB=e,this._$AM=t,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let s=this._$AA.parentNode,e=this._$AM;return e!==void 0&&s?.nodeType===11&&(s=e.parentNode),s}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(s,e=this){s=oe(this,s,e),Ie(s)?s===y||s==null||s===""?(this._$AH!==y&&this._$AR(),this._$AH=y):s!==this._$AH&&s!==ae&&this._(s):s._$litType$!==void 0?this.$(s):s.nodeType!==void 0?this.T(s):Kt(s)?this.k(s):this._(s)}O(s){return this._$AA.parentNode.insertBefore(s,this._$AB)}T(s){this._$AH!==s&&(this._$AR(),this._$AH=this.O(s))}_(s){this._$AH!==y&&Ie(this._$AH)?this._$AA.nextSibling.data=s:this.T(ne.createTextNode(s)),this._$AH=s}$(s){let{values:e,_$litType$:t}=s,i=typeof t=="number"?this._$AC(s):(t.el===void 0&&(t.el=Le.createElement(Yt(t.h,t.h[0]),this.options)),t);if(this._$AH?._$AD===i)this._$AH.p(e);else{let r=new Ze(i,this),a=r.u(this.options);r.p(e),this.T(a),this._$AH=r}}_$AC(s){let e=jt.get(s.strings);return e===void 0&&jt.set(s.strings,e=new Le(s)),e}k(s){vt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,t,i=0;for(let r of s)i===e.length?e.push(t=new n(this.O(Me()),this.O(Me()),this,this.options)):t=e[i],t._$AI(r),i++;i<e.length&&(this._$AR(t&&t._$AB.nextSibling,i),e.length=i)}_$AR(s=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);s!==this._$AB;){let t=Ht(s).nextSibling;Ht(s).remove(),s=t}}setConnected(s){this._$AM===void 0&&(this._$Cv=s,this._$AP?.(s))}},ce=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(s,e,t,i,r){this.type=1,this._$AH=y,this._$AN=void 0,this.element=s,this.name=e,this._$AM=i,this.options=r,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=y}_$AI(s,e=this,t,i){let r=this.strings,a=!1;if(r===void 0)s=oe(this,s,e,0),a=!Ie(s)||s!==this._$AH&&s!==ae,a&&(this._$AH=s);else{let c=s,o,l;for(s=r[0],o=0;o<r.length-1;o++)l=oe(this,c[t+o],e,o),l===ae&&(l=this._$AH[o]),a||=!Ie(l)||l!==this._$AH[o],l===y?s=y:s!==y&&(s+=(l??"")+r[o+1]),this._$AH[o]=l}a&&!i&&this.j(s)}j(s){s===y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,s??"")}},Qe=class extends ce{constructor(){super(...arguments),this.type=3}j(s){this.element[this.name]=s===y?void 0:s}},Xe=class extends ce{constructor(){super(...arguments),this.type=4}j(s){this.element.toggleAttribute(this.name,!!s&&s!==y)}},et=class extends ce{constructor(s,e,t,i,r){super(s,e,t,i,r),this.type=5}_$AI(s,e=this){if((s=oe(this,s,e,0)??y)===ae)return;let t=this._$AH,i=s===y&&t!==y||s.capture!==t.capture||s.once!==t.once||s.passive!==t.passive,r=s!==y&&(t===y||i);i&&this.element.removeEventListener(this.name,this,t),r&&this.element.addEventListener(this.name,this,s),this._$AH=s}handleEvent(s){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,s):this._$AH.handleEvent(s)}},tt=class{constructor(s,e,t){this.element=s,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(s){oe(this,s)}},qt={M:_t,P:Y,A:yt,C:1,L:Jt,R:Ze,D:Kt,V:oe,I:pe,H:ce,N:Xe,U:et,B:Qe,F:tt},Is=ft.litHtmlPolyfillSupport;Is?.(Le,pe),(ft.litHtmlVersions??=[]).push("3.3.3");var Zt=(n,s,e)=>{let t=e?.renderBefore??s,i=t._$litPart$;if(i===void 0){let r=e?.renderBefore??null;t._$litPart$=i=new pe(s.insertBefore(Me(),r),r,void 0,e??{})}return i._$AI(n),i};var xt=globalThis,T=class extends G{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let s=super.createRenderRoot();return this.renderOptions.renderBefore??=s.firstChild,s}update(s){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(s),this._$Do=Zt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return ae}};T._$litElement$=!0,T.finalized=!0,xt.litElementHydrateSupport?.({LitElement:T});var Ls=xt.litElementPolyfillSupport;Ls?.({LitElement:T});(xt.litElementVersions??=[]).push("4.2.2");var Qt=n=>(...s)=>({_$litDirective$:n,values:s}),st=class{constructor(s){}get _$AU(){return this._$AM._$AU}_$AT(s,e,t){this._$Ct=s,this._$AM=e,this._$Ci=t}_$AS(s,e){return this.update(s,e)}update(s,e){return this.render(...e)}};var{I:Gi}=qt;var zs={},Xt=(n,s=zs)=>n._$AH=s;var es=Qt(class extends st{constructor(){super(...arguments),this.key=y}render(n,s){return this.key=n,s}update(n,[s,e]){return s!==this.key&&(Xt(n),this.key=s),e}});var ts;function Os(){if(customElements.get("ha-chart-base"))return Promise.resolve(!0);let n=window.loadCardHelpers;return n?(ts??=(async()=>{try{(await n()).createCardElement({type:"statistics-graph",entities:[]})}catch{}let s=new Promise(e=>setTimeout(()=>e(!1),1e4));return Promise.race([customElements.whenDefined("ha-chart-base").then(()=>!0),s])})(),ts):Promise.resolve(!1)}function nt(n){Os().then(n),customElements.whenDefined("ha-chart-base").then(()=>n(!0))}var it="compare-",ss=n=>Math.round(n*255).toString(16).padStart(2,"0");function rt(n,s){let e=n.trim();if(/^#[0-9a-f]{6}$/i.test(e))return e+ss(s);if(/^#[0-9a-f]{3}$/i.test(e))return`#${[...e.slice(1)].map(i=>i+i).join("")}${ss(s)}`;let t=e.match(/^rgba?\(([^)]+)\)/i);if(t){let[i,r,a]=t[1].split(/[ ,/]+/).filter(Boolean);return`rgba(${i}, ${r}, ${a}, ${s})`}return e}var fe=n=>n.replace(/[&<>"']/g,s=>`&#${s.charCodeAt(0)};`),wt=n=>`<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${n}"></span>`;function is(n){if(n<=0)return 1;let s=10**Math.floor(Math.log10(n)),e=n/s;return([1,2,2.5,5,10].find(i=>e<=i*(1+1e-9))??10)*s}var me=n=>Number(n.toFixed(10));function Hs(n,s){if(n.min>=0&&s.min>=0)return;let e=is((n.max-n.min)/6),t=Math.max(Math.ceil(me(n.max/e)),s.max>0?1:0),i=Math.max(Math.ceil(me(-n.min/e)),s.min<0?1:0),r=is(Math.max(t?s.max/t:0,i?-s.min/i:0));return{bar:{min:me(-i*e),max:me(t*e),interval:e},line:{min:me(-i*r),max:me(t*r),interval:r}}}function rs(n,s,e){return n.map((t,i)=>({id:e?it+t.id:t.id,type:"bar",name:t.name,stack:s,cursor:"default",barMaxWidth:50,color:rt(t.color,e?50/255:127/255),itemStyle:{borderColor:e?rt(t.color,127/255):t.color},data:t.values.map((r,a)=>{let c=n.slice(i+1).every(o=>Math.sign(o.values[a]??0)!==Math.sign(r??0));return{value:r,itemStyle:r?c?{borderRadius:r>0?[4,4,0,0]:[0,0,4,4]}:void 0:{borderWidth:0}}})}))}function ns(n,s){let e=0,t=0;for(let i=0;i<s;i+=1){let r=n.map(a=>a.values[i]??0);t=Math.max(t,r.filter(a=>a>0).reduce((a,c)=>a+c,0)),e=Math.min(e,r.filter(a=>a<0).reduce((a,c)=>a+c,0))}return{min:e,max:t}}function as(n){let s=n.lines??[],e=n.compare,t=[...e?rs(e.series,"compare",!0):[],...rs(n.series,"main",!1)],i=s.map(h=>({id:h.id,type:"line",name:h.name,yAxisIndex:1,color:h.color,symbol:"none",showSymbol:!1,step:h.step?"middle":!1,lineStyle:{width:1.5,type:h.dash??"dashed",color:h.color},z:1,connectNulls:!0,data:h.values})),r=[...t,...i],a=new Map(s.map(h=>[h.id,h.format])),c=new Set(n.series.filter(h=>h.inTotal===!1).flatMap(h=>[h.id,it+h.id])),o=(h,_)=>{let m=_.filter(f=>f.value);if(!m.length)return"";let v=m.map(f=>`${wt(String(f.color??""))}${fe(f.seriesName??"")}: ${n.format(f.value??0)}`),x=m.filter(f=>!c.has(f.seriesId??"")).reduce((f,$)=>f+($.value??0),0);return`<b>${fe(h)}</b><br>${v.join("<br>")}`+(m.length>1?`<br><b>${fe(n.total)}: ${n.format(x)}</b>`:"")},l=h=>{let _=Array.isArray(h)?h:[h],m=document.createElement("div");if(!_.length)return m;let v=_[0].dataIndex,x=C=>a.has(C.seriesId??""),f=C=>(C.seriesId??"").startsWith(it),$=_.filter(C=>x(C)&&C.value!==null&&C.value!==void 0).map(C=>`${wt(String(C.color??""))}${fe(C.seriesName??"")}: ${a.get(C.seriesId??"")?.(C.value??0)??""}`),k=n.labels[v]?.tooltip??"",b=o(k,_.filter(C=>!x(C)&&!f(C))),w=e?o(e.labels[v]??"",_.filter(C=>f(C))):"",z=[b||`<b>${fe(k)}</b>`];return $.length&&(z[0]+=`<br>${$.join("<br>")}`),w&&z.push(w),m.innerHTML=z.join("<br><br>"),m},d={type:"value",name:n.unit,nameGap:2,nameTextStyle:{align:"left"},axisLabel:{formatter:n.tick},splitLine:{show:!0}},u={type:"value",name:n.lineUnit??"",nameGap:2,nameTextStyle:{align:"right"},axisLabel:{formatter:n.lineTick??n.tick},splitLine:{show:!1}};if(s.length){let h=n.labels.length,_=ns(n.series,h),m=e?ns(e.series,h):_,v=s.flatMap($=>$.values.filter(k=>k!==null)),x=Math.min(0,...v),f=Hs({min:Math.min(_.min,m.min),max:Math.max(_.max,m.max)},{min:x,max:Math.max(0,...v)});if(f){Object.assign(d,f.bar),Object.assign(u,f.line);let $=n.lineTick??n.tick;x>=0&&(u.axisLabel={formatter:k=>k<0?"":$(k)})}}let g={xAxis:{type:"category",data:n.labels.map(h=>h.axis),axisTick:{show:!1}},yAxis:s.length?[d,u]:d,grid:{top:15,bottom:0,left:1,right:1,containLabel:!0},legend:{show:!0,type:"custom",data:[...n.series,...s].map(h=>({id:h.id,secondaryIds:e?.series.some(_=>_.id===h.id)?[it+h.id]:[],name:h.name}))},tooltip:{trigger:"axis",formatter:l}};return{data:r,options:g}}function $t(n){let s=n.reduce((e,t)=>e+Math.max(0,t),0);return n.map(e=>s>0?Math.max(0,e)/s*100:0)}function os(n){let s=n.items.map(l=>n.hidden.has(l.id)?0:l.value),e=$t(s),t=s.reduce((l,d)=>l+Math.max(0,d),0),i=[],r=-Math.PI/2;for(let l of e){let d=r+l/100*2*Math.PI;i.push([r,d]),r=d}let a=l=>{let d=Math.min(90,l.getWidth()/2-8,l.getHeight()/2-8);return{cx:l.getWidth()/2,cy:l.getHeight()/2,r:d,r0:d*40/70}},c=n.items.map((l,d)=>({id:l.id,type:"custom",name:l.name,coordinateSystem:"none",cursor:"default",color:rt(l.color,.5),data:[[s[d],i[d][0],i[d][1],e[d]]],renderItem:(u,g)=>{let h=g.value(1),_=g.value(2);if(!(_-h>0))return null;let m=a(g),v=[{type:"sector",shape:{...m,startAngle:h,endAngle:_,cornerRadius:4},style:{fill:rt(l.color,.5),stroke:l.color,lineWidth:1}}];if(_-h>=15*Math.PI/180){let x=(h+_)/2,f=Math.cos(x)>=0,$=[m.cx+Math.cos(x)*m.r,m.cy+Math.sin(x)*m.r],k=[m.cx+Math.cos(x)*(m.r+10),m.cy+Math.sin(x)*(m.r+10)],b=[k[0]+(f?10:-10),k[1]];v.push({type:"polyline",silent:!0,shape:{points:[$,k,b]},style:{stroke:l.color,fill:"none"}},{type:"text",silent:!0,x:b[0]+(f?4:-4),y:b[1],style:{text:`${l.name}
${n.percent(g.value(3))}`,fill:n.labelColor,fontSize:12,lineHeight:16,align:f?"left":"right",verticalAlign:"middle"}})}return{type:"group",children:v}}}));return c.push({id:"total",type:"custom",coordinateSystem:"none",silent:!0,tooltip:{show:!1},data:[[t]],renderItem:(l,d)=>{let u=a(d);return{type:"text",x:u.cx,y:u.cy,style:{text:`${n.total}
${n.format(d.value(0))}`,fill:n.centerColor,fontSize:14,lineHeight:24,fontWeight:"bold",align:"center",verticalAlign:"middle"}}}}),{data:c,options:{xAxis:{show:!1},yAxis:{show:!1},legend:{show:!1},tooltip:{show:!0,trigger:"item",formatter:l=>{let d=n.items.findIndex(h=>h.id===l.seriesId);if(d<0)return"";let u=n.items[d],g=document.createElement("div");return g.innerHTML=`<b>${fe(u.name)}</b><br>${wt(u.color)}${n.format(l.value?.[0]??s[d])} (${n.percent(l.value?.[3]??e[d])})`,g}}}}}var le={solar:"var(--energy-solar-color, #ff9800)",grid:"var(--energy-grid-consumption-color, #488fc2)",cheap:"color-mix(in srgb, var(--energy-grid-consumption-color, #488fc2) 55%, #fff)",expensive:"color-mix(in srgb, var(--energy-grid-consumption-color, #488fc2) 70%, #000)",export:"var(--energy-grid-return-color, #8353d1)",heat:"var(--graph-color-30, var(--color-30, #bf3947))",car:"var(--energy-non-fossil-color, #0f9d58)"},cs=["#4269d0","#f4bd4a","#ff725c","#6cc5b0","#a463f2","#ff8ab7","#9c6b4e","#97bbf5","#01ab63","#094bad","#c99000","#d84f3e"];function Ns(n){let s=n.trim(),e=/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(s)?.[1];if(e){let i=e.length===3?[...e].map(r=>r+r).join(""):e;return[0,2,4].map(r=>parseInt(i.slice(r,r+2),16))}let t=/^rgba?\(([^)]+)\)/i.exec(s)?.[1];if(t){let[i,r,a]=t.split(/[ ,/]+/).filter(Boolean).map(Number);if([i,r,a].every(Number.isFinite))return[i,r,a]}}var Us=([n,s,e])=>`#${[n,s,e].map(t=>Math.round(Math.min(Math.max(t,0),255)).toString(16).padStart(2,"0")).join("")}`;function ls(n,s,e){let t=Ns(n);if(!t)return n;let i=s==="white"?255:0;return Us(t.map(r=>r*e+i*(1-e)))}function F(n){let s=getComputedStyle(n),e=(r,a)=>s.getPropertyValue(r).trim()||a,t=e("--energy-grid-consumption-color","#488fc2"),i=Array.from({length:54},(r,a)=>{let c=a+1;return s.getPropertyValue(`--graph-color-${c}`).trim()||s.getPropertyValue(`--color-${c}`).trim()||cs[a%cs.length]});return{solar:e("--energy-solar-color","#ff9800"),grid:t,cheap:ls(t,"white",.55),expensive:ls(t,"black",.7),export:e("--energy-grid-return-color","#8353d1"),standing:e("--electricity-lens-standing-charge-color","#a1887f"),heat:s.getPropertyValue("--graph-color-30").trim()||e("--color-30","#bf3947"),car:e("--energy-non-fossil-color","#0f9d58"),other:s.getPropertyValue("--history-unknown-color").trim()||e("--disabled-color","#bdbdbd"),line:e("--secondary-text-color","#727272"),consumers:i}}function P(n,s){let e=new Map,t=new Map,i=0;for(let r of n.areas)if(r.kind==="other")e.set(r.id,s.other);else if(r.kind==="device"){let a=s.consumers[i++%s.consumers.length];e.set(r.id,a);let c=r.statistics.energy?.[0];c&&t.set(c,a)}for(let r of n.areas)if(r.kind==="category")if(r.id==="heat_pump")e.set(r.id,s.heat);else{let c=(r.statistics.energy??[]).map(l=>t.get(l)).filter(Boolean),o=r.id==="wallbox"?s.car:s.grid;e.set(r.id,c[c.length-1]??o)}return e}var Vs=n=>!!n&&typeof n.subscribe=="function";function V(n){if(n!==void 0&&!n.startsWith("energy_"))throw new Error("Collection keys must start with energy_.")}function Bs(n,s){let e=location.pathname.split("/")[1]??"",t=n;for(let i of s?[`_${s}`]:[`_energy_${e}`,"_energy"])if(Vs(t[i]))return t[i]}var Ws=()=>new Date().setHours(24,0,0,0)-1;function Z(n,s,e){let t,i,r=0,a=()=>{let c=Bs(n,s);if(c){t=c.subscribe(o=>e({start:new Date(o.start).getTime(),end:o.end?new Date(o.end).getTime():Ws()},o.startCompare&&o.endCompare?{start:new Date(o.startCompare).getTime(),end:new Date(o.endCompare).getTime()}:void 0));return}r+=1,r===2&&e(null),r<20&&(i=window.setTimeout(a,500))};return a(),()=>{window.clearTimeout(i),t?.()}}var js={comma_decimal:"en-US",decimal_comma:"de",space_comma:"fr",quote_decimal:"de-CH"};function O(n,s){let e=n?.number_format,t=e==="system"?void 0:js[e??""]??n?.language??"en";return new Intl.NumberFormat(t,{...s,...e==="none"?{useGrouping:!1}:{}})}function us(n){switch(n?.time_format){case"am_pm":return!0;case"24":return!1;case"system":return new Intl.DateTimeFormat(void 0,{hour:"numeric"}).resolvedOptions().hour12;default:return}}function ds(n){let s=/^([-−+]?[\d.,'’\u00a0\u202f ]*\d)[\u00a0\u202f ](.+)$/.exec(n);return s?[s[1],s[2]]:[n,""]}function Q(n,s){let e=(r,a)=>{let c=Math.abs(r),o=a??(c<10?2:c<100?1:0);return O(n,{maximumFractionDigits:o,minimumFractionDigits:a??0}).format(r)};return{number:e,value:(r,a)=>{switch(a){case"energy":return`${e(r,Math.abs(r)<100?1:0)} kWh`;case"money":{let c=Math.abs(r)<100;return O(n,{style:"currency",currency:s,maximumFractionDigits:c?2:0,minimumFractionDigits:c?2:0}).format(r)}case"price":return s==="EUR"?`${e(r*100,1)} ct/kWh`:`${O(n,{style:"currency",currency:s,maximumFractionDigits:3}).format(r)}/kWh`;case"percent":return O(n,{style:"percent",maximumFractionDigits:0}).format(r/100);case"number":return e(r,Math.abs(r)<10?2:Math.abs(r)<100?1:0);case"distance":return`${e(r,Math.abs(r)<100?1:0)} km`;case"per_100km":return`${O(n,{style:"currency",currency:s,maximumFractionDigits:2,minimumFractionDigits:2}).format(r)}/100 km`}},currencySymbol:()=>O(n,{style:"currency",currency:s}).formatToParts(0).find(r=>r.type==="currency")?.value??""}}var St={energy:["energy"],cost:["cost"],bill:["import_cost","standing_charge"],grid_price:["import_cost","energy"],device_grid_price:["cost","solar_cost","energy","solar"],price:["cost","energy","solar"],solar_share:["solar","energy"],cheap_share:["cheap","solar","energy"],expensive_share:["expensive","solar","energy"],cheap_saving:["cheap_saving"],self_consumption:["self_used","energy"],export:["export"],saving:["saving"],heat:["heat"],alternative_cost:["alternative_cost"],scop:["heat","energy"],heat_price:["cost","heat"],distance:["distance"],cost_per_100km:["cost","distance"],forecast_today:[],forecast_tomorrow:[],payback:[],annual_return:[]},Ks={energy:["solar","export"],cost:["energy","solar","feed_in","standing_charge"],saving:["solar_saving"],heat:["energy"],distance:["energy"]},Gs=Object.keys(St),ue=n=>n==="forecast_today"||n==="forecast_tomorrow",de=n=>n==="payback"||n==="annual_return";function X(n){return Gs.filter(s=>ue(s)?n.forecast===!0:de(s)?n.investment===!0:St[s].every(e=>n.statistics[e]?.length))}function hs(n,s){return[...St[s],...Ks[s]??[]].flatMap(e=>n.statistics[e]??[])}var at=(n,s)=>s>0?n/s*100:null;function _e(n,s,e,t){let i=e("energy"),r=e("solar"),a=o=>({value:o,unit:"energy"}),c=o=>({value:o,unit:"money"});switch(n){case"energy":{if(i!==null&&r!==null&&i>0){if(s.kind==="household")return{value:i,unit:"energy",line:{key:"line_energy_parts",values:{grid:a(Math.max(i-r,0)),solar:a(r)}}};let l=at(r,i)??0;return{value:i,unit:"energy",line:{key:"line_solar_part",values:{percent:{value:l,unit:"percent"}}}}}let o=e("export");return s.kind==="grid"&&o!==null?{value:i,unit:"energy",line:{key:"line_exported",values:{energy:a(o)}}}:{value:i,unit:"energy"}}case"cost":{let o=e("cost");if(o!==null&&i&&r!==null)return{value:o,unit:"money",line:{key:"line_average_price",values:{price:{value:o/i,unit:"price"}}}};let l=e("feed_in"),d=e("standing_charge");return o!==null&&l!==null&&d!==null?{value:o,unit:"money",line:{key:Math.abs(d)<.005?"line_bill_no_charge":"line_bill",values:{feed_in:c(l),charge:c(d)}}}:o!==null&&i!==null&&s.kind==="grid"?{value:o,unit:"money",line:{key:"line_for_import",values:{energy:a(i)}}}:{value:o,unit:"money"}}case"bill":{let o=e("import_cost"),l=e("standing_charge");return o===null||l===null?{value:null,unit:"money"}:{value:o+l,unit:"money",line:Math.abs(l)<.005?void 0:{key:"line_bill",values:{charge:c(l)}}}}case"grid_price":{let o=e("import_cost");return o===null||!i?{value:null,unit:"price"}:{value:o/i,unit:"price",line:{key:"line_cost_for",values:{cost:c(o),energy:a(i)}}}}case"device_grid_price":{let o=e("cost"),l=e("solar_cost");if(o===null||l===null||i===null||r===null)return{value:null,unit:"price"};let d=i-r;if(d<=0)return{value:null,unit:"price"};let u=o-l;return{value:u/d,unit:"price",line:{key:"line_cost_for",values:{cost:c(u),energy:a(d)}}}}case"cheap_saving":return{value:e("cheap_saving"),unit:"money",line:{key:"line_against_normal",values:{}}};case"price":{let o=e("cost");return o===null||!i?{value:null,unit:"price"}:{value:o/i,unit:"price",line:{key:"line_cost_for",values:{cost:{value:o,unit:"money"},energy:a(i)}}}}case"solar_share":return i===null||r===null?{value:null,unit:"percent"}:{value:at(r,i),unit:"percent",line:{key:"line_part_of",values:{part:a(r),whole:a(i)}}};case"cheap_share":case"expensive_share":{let o=e(n==="cheap_share"?"cheap":"expensive");if(i===null||r===null||o===null)return{value:null,unit:"percent"};let l=Math.max(i-r,0);return{value:at(o,l),unit:"percent",line:{key:"line_part_of",values:{part:a(o),whole:a(l)}}}}case"self_consumption":{let o=e("self_used");return i===null||o===null?{value:null,unit:"percent"}:{value:at(o,i),unit:"percent",line:{key:"line_part_of",values:{part:a(o),whole:a(i)}}}}case"export":return{value:e("export"),unit:"energy"};case"saving":{let o=e("saving"),l=e("solar_saving");return o===null||l===null?{value:o,unit:"money"}:{value:o+l,unit:"money",line:Math.abs(l)<.005?void 0:{key:"line_saving_split",values:{solar:c(l)}}}}case"heat":{let o=e("heat");return o===null||i===null?{value:o,unit:"energy"}:{value:o,unit:"energy",line:{key:"line_from_electricity",values:{energy:a(i)}}}}case"alternative_cost":return{value:e("alternative_cost"),unit:"money"};case"scop":{let o=e("heat");return o===null||!i?{value:null,unit:"number"}:{value:o/i,unit:"number",line:{key:"line_heat_from",values:{heat:a(o),energy:a(i)}}}}case"heat_price":{let o=e("heat"),l=e("cost");return o===null||l===null||!o?{value:null,unit:"price"}:{value:l/o,unit:"price",line:{key:"line_cost_for",values:{cost:{value:l,unit:"money"},energy:a(o)}}}}case"distance":{let o=e("distance");return o===null||i===null?{value:o,unit:"distance"}:{value:o,unit:"distance",line:{key:"line_charged",values:{energy:a(i)}}}}case"cost_per_100km":{let o=e("distance"),l=e("cost");return o===null||l===null||!o?{value:null,unit:"per_100km"}:{value:l/o*100,unit:"per_100km",line:{key:"line_cost_for",values:{cost:{value:l,unit:"money"},energy:{value:o,unit:"distance"}}}}}case"forecast_today":case"forecast_tomorrow":return{value:t,unit:"energy"};case"payback":case"annual_return":return{value:null,unit:"percent"}}}var gs=["change","mean","min","max"],B=n=>n.statistic!==void 0?"statistic":n.entity!==void 0?"entity":"energy";function Ys(n,s){let e=new Date(n),t=new Date(s),i=c=>Date.UTC(c.getFullYear(),c.getMonth(),c.getDate()),r=Math.round((i(t)-i(e))/864e5),a=c=>c.getTime()-new Date(c).setHours(0,0,0,0);return a(t)<a(e)?r-1:r}function ee({start:n,end:s}){let e=Ys(n,s),t=new Date(s);return new Date(n).getDate()===1&&new Date(t.getFullYear(),t.getMonth(),t.getDate()+1).getDate()===1&&e>35?"month":e>2?"day":"hour"}var ye=n=>n==="year"?"month":n,Js=(n,s)=>{let e=new Date(n);return s==="hour"?e.setMinutes(0,0,0):(e.setHours(0,0,0,0),s==="day"||(e.setDate(1),s==="month")?e.getTime():e.setMonth(0))},qs=(n,s)=>{let e=new Date(n);return s==="hour"?e.setHours(e.getHours()+1):s==="day"?e.setDate(e.getDate()+1):s==="month"?e.setMonth(e.getMonth()+1):e.setFullYear(e.getFullYear()+1),e.getTime()};function kt({start:n,end:s},e){let t=[];for(let i=Js(n,e);i<=s&&t.length<400;i=qs(i,e))t.push(i);return t}function ps(n,s=new Date){let e=n.filter(i=>i!==null).map(i=>i.getFullYear()),t=Math.min(s.getFullYear(),...e);return{start:new Date(t,0,1).getTime(),end:new Date(s.getFullYear()+1,0,1).getTime()-1}}var ms=2e3;function fs(n,s){for(let e=0;e<s;e+=1)if(n.some(t=>t[e]!==null&&t[e]!==void 0))return e;return 0}function Ct(n,s,e){let t=s.map(()=>null),i=e==="hour"?0:12*36e5;for(let r of n??[]){if(r.change===null||r.change===void 0)continue;let a=(typeof r.start=="number"?r.start:Date.parse(r.start))+i,c=-1;for(let o=0;o<s.length&&s[o]<=a;o+=1)c=o;c<0||(t[c]=(t[c]??0)+r.change)}return t}function D(n,s=new Date){let e=(a,c)=>({start:a.getTime(),end:c.getTime()-1}),t=s.getFullYear(),i=s.getMonth(),r=s.getDate();switch(n){case"today":return e(new Date(t,i,r),new Date(t,i,r+1));case"yesterday":return e(new Date(t,i,r-1),new Date(t,i,r));case"this_month":return e(new Date(t,i,1),new Date(t,i+1,1));case"last_month":return e(new Date(t,i-1,1),new Date(t,i,1));case"this_year":return e(new Date(t,0,1),new Date(t+1,0,1));case"last_year":return e(new Date(t-1,0,1),new Date(t,0,1))}}function _s({start:n,end:s},e){let t=new Date(n),i=new Date(s),r=(o,l)=>new Intl.DateTimeFormat(e,o).format(l);if(t.toDateString()===i.toDateString())return r({day:"numeric",month:"short"},t);let c=t.getDate()===1&&new Date(s+1).getDate()===1;return c&&t.getMonth()===0&&i.getMonth()===11&&t.getFullYear()===i.getFullYear()?r({year:"numeric"},t):c&&t.getMonth()===i.getMonth()&&t.getFullYear()===i.getFullYear()?r({month:"short",year:"numeric"},t):new Intl.DateTimeFormat(e,{day:"numeric",month:"short"}).formatRange(t,i)}function ys(n,s,e){let t=s.map(()=>0),i=s.map(()=>0),r=e==="hour"?0:12*36e5;for(let a of n??[]){if(a.mean===null||a.mean===void 0)continue;let c=(typeof a.start=="number"?a.start:Date.parse(a.start))+r,o=-1;for(let l=0;l<s.length&&s[l]<=c;l+=1)o=l;o<0||(t[o]+=a.mean,i[o]+=1)}return t.map((a,c)=>i[c]?a/i[c]:null)}var A="electricity_lens",ve=["pv","heat_pump","wallbox"],te=n=>{if(n==null||n==="")return null;let s=Number(n);return Number.isFinite(s)?s:null},Zs=n=>typeof n=="string"&&n?new Date(n):null;function H(n){let s=Object.values(n.entities??{}).filter(r=>r.platform===A),e=(r,a)=>s.find(c=>c.device_id===r&&c.translation_key===a),t=r=>r?te(n.states[r]?.state):null,i=[];for(let r of s){if(r.translation_key!=="saving")continue;let a=n.states[r.entity_id];if(!a||a.state==="unavailable")continue;let c=a.attributes,o=c.category;ve.includes(o)&&i.push({category:o,savingStatistic:typeof c.statistic_id=="string"?c.statistic_id:`${A}:${o}_saving`,calculating:c.calculating===!0,saving:te(a.state),investment:te(c.investment),balance:te(c.balance),perYear:t(e(r.device_id,"saving_per_year")?.entity_id),countingSince:Zs(c.counting_since),entityId:r.entity_id,heating:c.heating==="gas"||c.heating==="oil"?c.heating:null})}return i.sort((r,a)=>ve.indexOf(r.category)-ve.indexOf(a.category))}function ot(n){let s=Object.values(n.entities??{}).filter(e=>e.platform===A);return s.filter(e=>e.translation_key==="saving").flatMap(e=>{let t=n.states[e.entity_id]?.attributes,i=o=>s.find(l=>l.device_id===e.device_id&&l.translation_key===o)?.entity_id,r=i("payback"),a=i("annual_return"),c=t?.category;return ve.includes(c)&&Number(t?.investment)>0&&r&&a?[{category:c,payback:r,annualReturn:a}]:[]}).sort((e,t)=>ve.indexOf(e.category)-ve.indexOf(t.category))}var ze=n=>n==="pv"?"solar":n;function vs(n){let s=Object.values(n.entities??{}).find(t=>t.platform===A&&t.translation_key==="balance"),e=s?n.states[s.entity_id]:void 0;return!e||e.state==="unavailable"?null:{balance:te(e.state),saved:te(e.attributes.saved)??0,invested:te(e.attributes.invested)??0,perYear:te(e.attributes.per_year),entityId:s.entity_id}}function be(n){return Object.values(n.entities??{}).some(e=>e.platform===A&&e.translation_key==="saving")?"integration_unavailable":"not_set_up"}var Qs=300*1e3,M=5*1e3,he,At,W=()=>he?.value;function N(){if(!he)return!0;let n=he.value&&!he.value.calculating?Qs:M;return Date.now()-he.at>n}function j(n){return N()?(At??=n.callWS({type:`${A}/figures`}).then(s=>s).catch(()=>null).then(s=>(he={at:Date.now(),value:s},At=void 0,s)),At):Promise.resolve(he?.value??null)}var Xs=6e4,bs=new WeakMap;function ei(n){let s=n.entities??{},e=bs.get(s);return e||(e=Object.values(s).filter(t=>t.platform===A).map(t=>t.entity_id),bs.set(s,e)),e}var I=class extends T{constructor(){super(...arguments);this._lookedAt=0}_watched(){return[]}_changedFor(e,t){return e.locale!==t.locale||e.language!==t.language||e.config!==t.config||e.themes!==t.themes||e.selectedTheme!==t.selectedTheme||e.entities!==t.entities||[...ei(t),...this._watched()].some(i=>e.states[i]!==t.states[i])}shouldUpdate(e){let t=e.get("hass"),i=e.size===1&&t!==void 0&&this.hass!==void 0,r=Date.now()-this._lookedAt>=Xs;return i&&!r&&!this._changedFor(t,this.hass)?!1:(this._lookedAt=Date.now(),!0)}};var Rt={title:"Economics","category.pv":"PV plant","category.heat_pump":"Heat pump","category.wallbox":"Electric car",not_set_up:"Set up the Electricity Lens integration to see what your PV plant, heat pump, and electric car have saved.",integration_unavailable:"The figures aren't available right now. Check Electricity Lens under Settings > Devices & services.",calculating:"Being computed \u2026",loading:"Loading \u2026",column_area:"Area",column_per_year:"Per year",column_saving:"Saving",column_investment:"Investment",column_balance:"Net",total:"Total",average:"\xD8 {amount}",line_payback:"of {investment}",line_payback_left:"about {time} left",line_return:"Total {amount}",return_value:"{rate} % a year",months_one:"1 month",months_other:"{count} months",years_one:"1 year",years_other:"{count} years",savings_title:"Savings",savings_source:"Source",savings_energy:"Energy",savings_amount:"Amount",savings_total:"Total",savings_pv:"Solar power instead of grid power",savings_feed_in:"Feed-in",savings_gas:"Electricity instead of gas",savings_oil:"Electricity instead of oil",savings_fuel:"Electricity instead of fuel",savings_instead_gas:"A gas heating would have cost",savings_instead_oil:"An oil heating would have cost",savings_instead_fuel:"A combustion car would have cost",savings_electricity:"{name} electricity costs",savings_solar_part:"of which by solar power",meters_consumer:"Consumer",meters_electricity:"Electricity",history_title:"Savings over time",history_total:"Total",history_no_chart:"The chart is only shown in Home Assistant.",history_failed:"The statistics could not be loaded.",history_empty:"No savings in this period.",figures_failed:"The figures could not be loaded.",figures_not_loaded:"not loaded",figures_unavailable:"not available","figure.energy":"Consumption","figure.energy.grid":"Grid import","figure.energy.solar":"Solar production","figure.cost":"Costs","figure.cost.grid":"Grid costs","figure.bill":"Electricity bill","figure.grid_price":"Average grid price","figure.device_grid_price":"Average grid price","figure.price":"Average price","figure.solar_share":"Solar share","figure.solar_share.household":"Self-sufficiency","figure.cheap_share":"Grid cheap","figure.expensive_share":"Grid expensive","figure.cheap_saving":"Tariff saving","figure.self_consumption":"Self-consumption","figure.export":"Feed-in","figure.saving":"Saving","figure.payback":"Payback","figure.annual_return":"Return","figure.forecast_today":"Forecast today","figure.forecast_tomorrow":"Forecast tomorrow","figure.heat":"Heat","figure.alternative_cost":"Comparison costs","figure.scop":"Seasonal COP","figure.heat_price":"Heat price","figure.distance":"Distance","figure.cost_per_100km":"Costs per 100 km",line_saving_split:"of which {solar} by solar",line_bill:"{charge} standing charge",line_bill_no_charge:"feed-in \u2212{feed_in}",line_against_normal:"vs. normal price",line_from_electricity:"from {energy} electricity",line_heat_from:"{heat} from {energy}",line_charged:"with {energy} charged",line_solar_part:"{percent} of it solar power",line_energy_parts:"Grid {grid} + solar {solar}",line_exported:"{energy} fed in",line_average_price:"average {price}",line_for_import:"for {energy} imported",line_cost_for:"{cost} for {energy}",line_part_of:"{part} of {whole}","value.change":"total in the period","value.mean":"average","value.min":"minimum","value.max":"maximum",value_range:"from {min} to {max}","period.energy_date":"Follow the date selection","period.today":"Today","period.yesterday":"Yesterday","period.this_month":"This month","period.last_month":"Last month","period.this_year":"This year","period.last_year":"Last year","period.all":"All years",editor_title:"Title (optional)",editor_period:"Period",editor_period_hint:"Without a date selection on the dashboard: this month.",editor_period_hint_years:"Without a date selection on the dashboard: all years.",editor_source:"Source","source.energy":"Energy data","source.statistic":"Statistic","source.entity":"Entity",editor_area:"Area",editor_figure:"Figure",editor_statistic:"Statistic",editor_value:"Value",editor_secondary:"Line below","secondary.none":"Default","secondary.range":"Range of the period",editor_entity:"Entity",editor_name:"Name (optional)",editor_not_loaded:"Energy data need the Electricity Lens integration.","source.solar":"Solar power","source.grid":"Grid power","source.normal":"Grid normal","source.cheap":"Grid cheap","source.expensive":"Grid expensive","source.export":"Feed-in","source.standing_charge":"Standing charge","stack.source":"By source","stack.bill":"By bill item","stack.consumer":"By consumer","stack.none":"None",editor_savings:"Savings of all categories",editor_stack:"Split",editor_line:"Line",editor_lines:"Further lines",editor_line_none:"None",history_empty_figure:"No data in this period.",breakdown_mix:"Electricity mix",breakdown_cost_by_consumer:"Costs by consumer",breakdown_energy_by_consumer:"Consumption by consumer",breakdown_total:"Total","mix.solar":"Solar","mix.grid":"Grid","mix.normal":"Grid normal","mix.cheap":"Grid cheap","mix.expensive":"Grid expensive",editor_by:"Split","by.source":"By source","by.consumer":"By consumer",editor_display:"Display","display.ring":"Ring","display.bars":"Bars",editor_color_by_source:"Color the bars by source",editor_breakdown_source:"Source","breakdown_source.energy":"Energy data","breakdown_source.statistics":"Statistics",editor_statistics:"Statistics","figure_choice.energy":"Consumption","figure_choice.cost":"Costs","strategy.title":"Electricity","strategy.overview":"Now","strategy.electricity":"Consumption","strategy.forecast_today":"Solar forecast today","strategy.forecast_tomorrow":"Solar forecast tomorrow","strategy.cost_today":"Costs today","strategy.consumption_today":"Consumption today","strategy.payback_pv":"PV payback","strategy.payback_heat_pump":"HP payback","strategy.payback_wallbox":"Car payback","strategy.return_pv":"PV return","strategy.return_heat_pump":"HP return","strategy.return_wallbox":"Car return","strategy.charged_energy":"Charged energy","strategy.charging_cost":"Charging costs","strategy.bill":"Electricity bill","strategy.cost_with_solar":"Electricity costs incl. solar","strategy.cost_history":"Costs over time","strategy.cost_distribution":"Cost distribution","strategy.price_with_solar":"Average price incl. solar","strategy.costs":"Costs","strategy.heating":"Heating","strategy.charging":"Charging","strategy.usage_graph":"Consumption by source","strategy.solar_graph":"Solar production","strategy.devices_graph":"Consumption over time","strategy.distribution":"Power flow","strategy.not_loaded":"Set up the Electricity Lens integration to see this dashboard."},ti={title:"Wirtschaftlichkeit","category.pv":"PV-Anlage","category.heat_pump":"W\xE4rmepumpe","category.wallbox":"E-Auto",not_set_up:"Richte die Integration Electricity Lens ein, um zu sehen, was PV-Anlage, W\xE4rmepumpe und E-Auto gespart haben.",integration_unavailable:"Die Zahlen sind gerade nicht verf\xFCgbar. Pr\xFCfe Electricity Lens unter Einstellungen > Ger\xE4te & Dienste.",calculating:"Wird berechnet \u2026",loading:"Wird geladen \u2026",column_area:"Bereich",column_per_year:"Pro Jahr",column_saving:"Ersparnis",column_investment:"Investition",column_balance:"Saldo",total:"Summe",average:"\xD8 {amount}",line_payback:"von {investment}",line_payback_left:"noch etwa {time}",line_return:"Gesamt {amount}",return_value:"{rate} % p. a.",months_one:"1 Monat",months_other:"{count} Monate",years_one:"1 Jahr",years_other:"{count} Jahre",savings_title:"Ersparnis",savings_source:"Quelle",savings_energy:"Energie",savings_amount:"Betrag",savings_total:"Gesamt",savings_pv:"PV-Strom statt Netzstrom",savings_feed_in:"Einspeisung",savings_gas:"Strom statt Gas",savings_oil:"Strom statt \xD6l",savings_fuel:"Strom statt Sprit",savings_instead_gas:"Gasheizung h\xE4tte gekostet",savings_instead_oil:"\xD6lheizung h\xE4tte gekostet",savings_instead_fuel:"Verbrenner h\xE4tte gekostet",savings_electricity:"Stromkosten {name}",savings_solar_part:"davon durch PV",meters_consumer:"Verbraucher",meters_electricity:"Strom",history_title:"Ersparnisverlauf",history_total:"Summe",history_no_chart:"Das Diagramm erscheint nur in Home Assistant.",history_failed:"Die Statistik konnte nicht geladen werden.",history_empty:"Keine Ersparnis in diesem Zeitraum.",figures_failed:"Die Kennzahlen konnten nicht geladen werden.",figures_not_loaded:"nicht geladen",figures_unavailable:"nicht verf\xFCgbar","figure.energy":"Verbrauch","figure.energy.grid":"Netzbezug","figure.energy.solar":"PV-Erzeugung","figure.cost":"Kosten","figure.cost.grid":"Netzkosten","figure.bill":"Stromrechnung","figure.grid_price":"\xD8 Netzpreis","figure.device_grid_price":"\xD8 Netzpreis","figure.price":"\xD8 Strompreis","figure.solar_share":"PV-Anteil","figure.solar_share.household":"Autarkie","figure.cheap_share":"Netz g\xFCnstig","figure.expensive_share":"Netz teuer","figure.cheap_saving":"Tarifersparnis","figure.self_consumption":"Eigenverbrauch","figure.export":"Einspeisung","figure.saving":"Ersparnis","figure.payback":"Amortisation","figure.annual_return":"Rendite","figure.forecast_today":"Prognose heute","figure.forecast_tomorrow":"Prognose morgen","figure.heat":"W\xE4rme","figure.alternative_cost":"Vergleichskosten","figure.scop":"JAZ","figure.heat_price":"W\xE4rmepreis","figure.distance":"Strecke","figure.cost_per_100km":"Kosten pro 100 km",line_saving_split:"davon {solar} durch PV",line_bill:"inkl. {charge} Grundpreis",line_bill_no_charge:"Einspeisung \u2212{feed_in}",line_against_normal:"zum Normalpreis",line_from_electricity:"aus {energy} Strom",line_heat_from:"{heat} aus {energy}",line_charged:"mit {energy} geladen",line_solar_part:"davon {percent} PV-Strom",line_energy_parts:"Netz {grid} + PV {solar}",line_exported:"{energy} eingespeist",line_average_price:"\xD8 {price}",line_for_import:"f\xFCr {energy} Netzbezug",line_cost_for:"{cost} f\xFCr {energy}",line_part_of:"{part} von {whole}","value.change":"Summe im Zeitraum","value.mean":"Mittelwert","value.min":"Minimum","value.max":"Maximum",value_range:"von {min} bis {max}","period.energy_date":"Der Datumsauswahl folgen","period.today":"Heute","period.yesterday":"Gestern","period.this_month":"Dieser Monat","period.last_month":"Letzter Monat","period.this_year":"Dieses Jahr","period.last_year":"Letztes Jahr","period.all":"Alle Jahre",editor_title:"Titel (optional)",editor_period:"Zeitraum",editor_period_hint:"Ohne Datumsauswahl auf dem Dashboard: dieser Monat.",editor_period_hint_years:"Ohne Datumsauswahl auf dem Dashboard: alle Jahre.",editor_source:"Quelle","source.energy":"Energiedaten","source.statistic":"Statistik","source.entity":"Entit\xE4t",editor_area:"Bereich",editor_figure:"Gr\xF6\xDFe",editor_statistic:"Statistik",editor_value:"Wert",editor_secondary:"Unterzeile","secondary.none":"Standard","secondary.range":"Spanne im Zeitraum",editor_entity:"Entit\xE4t",editor_name:"Name (optional)",editor_not_loaded:"Energiedaten brauchen die Integration Electricity Lens.","source.solar":"PV-Strom","source.grid":"Netzstrom","source.normal":"Netz normal","source.cheap":"Netz g\xFCnstig","source.expensive":"Netz teuer","source.export":"Einspeisung","source.standing_charge":"Grundpreis","stack.source":"Nach Quelle","stack.bill":"Nach Rechnungsposten","stack.consumer":"Nach Verbraucher","stack.none":"Keine",editor_savings:"Ersparnisse aller Kategorien",editor_stack:"Aufteilen",editor_line:"Linie",editor_lines:"Weitere Linien",editor_line_none:"Keine",history_empty_figure:"Keine Daten in diesem Zeitraum.",breakdown_mix:"Strommix",breakdown_cost_by_consumer:"Kosten nach Verbraucher",breakdown_energy_by_consumer:"Verbrauch nach Verbraucher",breakdown_total:"Gesamt","mix.solar":"PV","mix.grid":"Netz","mix.normal":"Netz normal","mix.cheap":"Netz g\xFCnstig","mix.expensive":"Netz teuer",editor_by:"Aufteilen","by.source":"Nach Quelle","by.consumer":"Nach Verbraucher",editor_display:"Darstellung","display.ring":"Ring","display.bars":"Balken",editor_color_by_source:"Balken nach Quelle f\xE4rben",editor_breakdown_source:"Quelle","breakdown_source.energy":"Energiedaten","breakdown_source.statistics":"Statistiken",editor_statistics:"Statistiken","figure_choice.energy":"Verbrauch","figure_choice.cost":"Kosten","strategy.title":"Strom","strategy.overview":"Jetzt","strategy.electricity":"Verbrauch","strategy.forecast_today":"PV-Prognose heute","strategy.forecast_tomorrow":"PV-Prognose morgen","strategy.cost_today":"Kosten heute","strategy.consumption_today":"Verbrauch heute","strategy.payback_pv":"PV-Amortisation","strategy.payback_heat_pump":"WP-Amortisation","strategy.payback_wallbox":"Auto-Amortisation","strategy.return_pv":"PV-Rendite","strategy.return_heat_pump":"WP-Rendite","strategy.return_wallbox":"Auto-Rendite","strategy.charged_energy":"Geladene Energie","strategy.charging_cost":"Ladekosten","strategy.bill":"Stromrechnung","strategy.cost_with_solar":"Stromkosten inkl. PV","strategy.cost_history":"Kostenverlauf","strategy.cost_distribution":"Kostenverteilung","strategy.price_with_solar":"\xD8 Preis inkl. PV","strategy.costs":"Kosten","strategy.heating":"Heizen","strategy.charging":"Laden","strategy.usage_graph":"Verbrauch nach Quelle","strategy.solar_graph":"PV-Erzeugung","strategy.devices_graph":"Verbrauchsverlauf","strategy.distribution":"Stromfluss","strategy.not_loaded":"Richte die Integration Electricity Lens ein, um dieses Dashboard zu sehen."},si={en:Rt,de:ti},J=n=>n in Rt;function S(n){let s=si[n.split("-")[0]]??Rt;return(e,t={})=>s[e].replace(/\{(\w+)\}/g,(i,r)=>t[r]??"")}var L=E`
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
`;var se=["energy_date","today","yesterday","this_month","last_month","this_year","last_year"];function K(n,s,e){let t=`figure.${s}.${e.kind}`,i=n(J(t)?t:`figure.${s}`);return["device","other","category"].includes(e.kind)?`${e.name} ${i}`:i}var ii=300*1e3,Et=n=>n.toDateString();function ri(n){let s=new Date,e=Et(s),t=Et(new Date(s.getFullYear(),s.getMonth(),s.getDate()+1)),i={today:null,tomorrow:null};for(let r of Object.values(n??{}))for(let[a,c]of Object.entries(r.wh_hours??{})){let o=Et(new Date(a));o===e&&(i.today=(i.today??0)+c/1e3),o===t&&(i.tomorrow=(i.tomorrow??0)+c/1e3)}return i}var xe=class extends I{constructor(){super(...arguments);this._infoLoading=!1}static getStubConfig(){return{period:"energy_date",area:"household",figure:"cost"}}static getConfigElement(){return document.createElement("electricity-lens-figures-card-editor")}setConfig(e){V(e?.collection_key),this._config=e}getCardSize(){return 2}getGridOptions(){return{columns:6,min_columns:6}}connectedCallback(){super.connectedCallback(),this._follow()}disconnectedCallback(){super.disconnectedCallback(),this._unfollow?.(),this._unfollow=void 0,clearTimeout(this._retryTimer),this._retryTimer=void 0}_watched(){return[this._config?.entity,this._config?.statistic].filter(e=>e!==void 0)}get _localize(){return S(this.hass?.locale?.language??this.hass?.language??"en")}get _language(){return this.hass?.locale?.language??"en"}get _period(){return this._config?.period??"energy_date"}get _hasPeriod(){let{figure:e}=this._config??{};return!!this._config&&B(this._config)!=="entity"&&!(e&&(ue(e)||de(e)))}_follow(){this._period!=="energy_date"||!this._hasPeriod||this._unfollow||!this.isConnected||!this.hass?.connection||(this._unfollow=Z(this.hass.connection,this._config?.collection_key,e=>{this._selected=e}))}_range(){let e=this._period;if(!this._hasPeriod)return D("today");if(e!=="energy_date")return D(e);if(this._selected!==void 0)return this._selected??D("this_month")}_area(e){return this._info?.areas.find(t=>t.id===e)}_figure(e){let t=this._area(e.area);if(!(!t||!e.figure||!X(t).includes(e.figure)))return{area:t,figure:e.figure}}async _loadInfo(){!this.hass||this._infoLoading||(this._infoLoading=!0,this._info=await j(this.hass),this._infoLoading=!1,clearTimeout(this._retryTimer),this._retryTimer=void 0,this.isConnected&&(!this._info||this._info.calculating)&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),M)))}_request(){let e=this._range(),t=this._config;if(!e||!t)return;let i=B(t);if(i==="entity"||t.figure&&de(t.figure)||i==="energy"&&!this._info)return;let r=new Set,a=new Set,c=!1;if(i==="statistic"&&t.statistic)r.add(t.statistic),a.add(t.statistic);else if(i==="energy"){let l=this._figure(t);l&&(c=ue(l.figure),this._info?.calculating||hs(l.area,l.figure).forEach(d=>r.add(d)))}let o=[...r].sort();return{key:JSON.stringify([o,e.start,e.end,c]),range:e,ids:o,statistics:[...a].sort(),forecast:c}}async _load(e){if(!this.hass)return;this._loading=e.key;let t=ye(ee(e.range)),i={key:e.key,at:Date.now(),range:e.range,period:t,rows:{},metadata:{},forecast:{today:null,tomorrow:null},failed:!1};try{let[r,a,c]=await Promise.all([e.ids.length?this.hass.callWS({type:"recorder/statistics_during_period",start_time:new Date(e.range.start).toISOString(),end_time:new Date(e.range.end+1).toISOString(),statistic_ids:e.ids,period:t,types:e.statistics.length?["change","mean","min","max"]:["change"],units:{energy:"kWh"}}):Promise.resolve({}),e.statistics.length?this.hass.callWS({type:"recorder/get_statistics_metadata",statistic_ids:e.statistics}):Promise.resolve([]),e.forecast?this.hass.callWS({type:"energy/solar_forecast"}):Promise.resolve({})]);i.rows=r,i.metadata=Object.fromEntries(a.map(o=>[o.statistic_id,o])),i.forecast=ri(c)}catch{i.failed=!0}this._loading===e.key&&(this._loading=void 0,this._loaded=i)}willUpdate(e){if(!this.hass)return;(e.has("hass")||e.has("_config"))&&this._follow(),this._info===void 0&&(this._info=W()),N()&&!this._infoLoading?this._loadInfo():this.isConnected&&this._info?.calculating&&!this._retryTimer&&!this._infoLoading&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),M));let t=this._request(),i=!this._loaded||Date.now()-this._loaded.at>ii;t&&t.key!==this._loading&&(t.key!==this._loaded?.key||i&&!this._loading)&&this._load(t)}get _fmt(){return Q(this.hass?.locale,this.hass?.config.currency??"EUR")}_number(e,t){return this._fmt.number(e,t)}_format(e,t){return this._fmt.value(e,t)}_rows(e){let t=this._loaded;if(!t)return[];let i=t.period==="hour"?0:12*36e5;return(t.rows[e]??[]).filter(r=>{let a=(typeof r.start=="number"?r.start:Date.parse(r.start))+i;return a>=t.range.start&&a<=t.range.end})}_sum(e){let t=0;for(let i of e??[])for(let r of this._rows(i))t+=r.change??0;return t}_energyCard(e){let t=this._localize,i=this._figure(e);if(!i){let u=`figure.${e.figure??""}`,g=e.name??(J(u)?t(u):e.figure??"");return this._info===void 0?this._card(g,"\u2026"):this._card(g,"\u2013",t("figures_unavailable"))}let{area:r,figure:a}=i,c=e.name??K(this._localize,a,r);if(de(a))return this._investmentCard(c,a,r);if(this._info?.calculating&&!ue(a))return this._card(c,"\u2026",t("calculating"));if(!this._loaded)return this._card(c,"\u2026");if(this._loaded.failed)return this._card(c,"\u2013",t("figures_not_loaded"));let o=a==="forecast_today"?this._loaded.forecast.today:a==="forecast_tomorrow"?this._loaded.forecast.tomorrow:null,l=_e(a,r,u=>r.statistics[u]?this._sum(r.statistics[u]):null,o),d=l.line?t(l.line.key,Object.fromEntries(Object.entries(l.line.values).map(([u,g])=>[u,this._format(g.value,g.unit)]))):void 0;return this._card(c,l.value===null?"\u2013":this._format(l.value,l.unit),e.secondary==="none"?void 0:d)}_statisticCard(e){let t=this._localize,i=e.statistic??"",r=this._loaded?.metadata[i],a=e.name??r?.name??this.hass?.states[i]?.attributes.friendly_name;if(!this._loaded)return this._card(a??"\xA0","\u2026");let c=a??i,o=this._rows(i),l=r?.unit_class==="energy"?"kWh":r?.statistics_unit_of_measurement??"",d=m=>m===null?"\u2013":`${this._number(m)}${l?` ${l}`:""}`,u=m=>o.map(v=>v[m]).filter(v=>typeof v=="number"),g=e.value??"change",h=null;if(g==="change")h=o.length?o.reduce((m,v)=>m+(v.change??0),0):null;else if(g==="mean"){let m=u("mean");h=m.length?m.reduce((v,x)=>v+x,0)/m.length:null}else{let m=u(g);h=m.length?g==="min"?Math.min(...m):Math.max(...m):null}let _=g==="change"?void 0:t(`value.${g}`);if(e.secondary==="range"){let m=u("min"),v=u("max");m.length&&v.length&&(_=t("value_range",{min:d(Math.min(...m)),max:d(Math.max(...v))}))}return this._loaded.failed?this._card(c,"\u2013",t("figures_not_loaded")):this._card(c,d(h),e.secondary==="none"?void 0:_)}_entityCard(e){let t=this._localize,i=this.hass?.states[e.entity??""],r=e.name??i?.attributes.friendly_name??e.entity??"";if(!i)return this._card(r,"\u2013",t("figures_unavailable"));let a=Number(i.state),c=this.hass?.config.currency??"",o=i.attributes.unit_of_measurement?.replace(c,c?this._fmt.currencySymbol():""),l=i.state!==""&&Number.isFinite(a),d=this._fmt.currencySymbol(),u=l?o&&o===d?this._format(a,"money"):`${this._number(a)}${o?` ${o}`:""}`:["unknown","unavailable",""].includes(i.state)?"\u2013":i.state;return this._card(r,u,void 0,e.entity)}_investmentCard(e,t,i){let r=this._localize,a=ot(this.hass).find(u=>ze(u.category)===i.id),c=t==="payback"?a?.payback:a?.annualReturn,o=c?this.hass?.states[c]:void 0,l=Number(o?.state);if(!o||!Number.isFinite(l))return this._card(e,"\u2013",void 0,c);if(t==="payback"){let u=l<100?Math.floor(l):l;return this._card(e,this._format(u,"percent"),this._paybackLine(o.attributes),c)}let d=O(this.hass?.locale,{minimumFractionDigits:1,maximumFractionDigits:1}).format(l);return this._card(e,r("return_value",{rate:d}),this._returnLine(o.attributes),c)}_paybackLine(e){let t=this._localize;if(typeof e.investment!="number")return;let i=this._format(e.investment,"money");if(typeof e.years_left!="number")return t("line_payback",{investment:i});let r=e.years_left,a=Math.max(1,Math.round(r<1?r*12:r)),c=r<1?t(a===1?"months_one":"months_other",{count:String(a)}):t(a===1?"years_one":"years_other",{count:String(a)});return t("line_payback_left",{time:c})}_returnLine(e){let{surplus:t}=e;if(typeof t=="number")return this._localize("line_return",{amount:O(this.hass?.locale,{style:"currency",currency:this.hass?.config.currency??"EUR",maximumFractionDigits:0,signDisplay:"exceptZero"}).format(t)})}_card(e,t,i,r){let[a,c]=ds(t),o=()=>{this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:r},bubbles:!0,composed:!0}))},l=d=>{d.key!=="Enter"&&d.key!==" "||(d.preventDefault(),o())};return p`<ha-card
      lang=${this._language}
      class=${r?"clickable":""}
      role=${r?"button":y}
      tabindex=${r?"0":y}
      @click=${r?o:y}
      @keydown=${r?l:y}
    >
      <div class="header"><h2 class="title" title=${e}>${e}</h2></div>
      <div class="stat">
        <div class="value">
          <span class="number" title=${t}>${a}</span>${c?p`<span class="unit">${c}</span>`:y}
        </div>
        ${i?p`<div class="line" title=${i}>${i}</div>`:y}
      </div>
    </ha-card>`}render(){if(!this.hass||!this._config)return p``;let e=B(this._config);return e==="statistic"?this._statisticCard(this._config):e==="entity"?this._entityCard(this._config):this._energyCard(this._config)}};xe.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0},_selected:{state:!0},_loaded:{state:!0}},xe.styles=[L,E`
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
    `];var ni=["energy","cost","saving","export","heat","distance","alternative_cost"],ai=["price","grid_price","solar_share","cheap_share","expensive_share","self_consumption","scop","heat_price","cost_per_100km"],Oe=n=>ni.filter(s=>X(n).includes(s)),Tt=n=>ai.filter(s=>X(n).includes(s)||s==="grid_price"&&n.kind==="household");function we(n,s){let e=[];return s==="energy"&&n.statistics.solar?.length&&e.push("source"),n.kind==="household"&&(s==="energy"||s==="cost")&&e.push("consumer"),n.kind==="household"&&s==="cost"&&e.push("source","bill"),n.kind==="category"&&(n.statistics.energy?.length??0)>1&&(s==="energy"||s==="cost"||(s==="heat"||s==="saving")&&(n.statistics.heat_meters?.length??0)>1)&&e.push("consumer"),e.push("none"),n.kind==="category"&&s==="cost"&&n.statistics.solar_cost?.length&&e.push("source"),e}function xs(n,s){let e=n.statistics[s]??[];return{plus:s==="saving"?[...e,...n.statistics.solar_saving??[]]:e,minus:[]}}function ct(n){let s=new Set(n.areas.find(t=>t.id==="heat_pump")?.statistics.energy??[]),e=n.areas.filter(t=>t.kind==="device"&&t.statistics.heat?.length&&t.statistics.energy?.some(i=>s.has(i)));return e.length>1?e:[]}function oi(n,s,e){let t=n.areas.find(o=>o.kind==="grid")?.statistics??{},i=t.import_cost??[],r=s.statistics.cheap_cost??[],a=s.statistics.expensive_cost??[],c=[{id:"standing_charge",name:{key:"source.standing_charge"},color:e.standing,plus:t.standing_charge??[],minus:[]}];return r.length&&c.push({id:"cheap",name:{key:"source.cheap"},color:e.cheap,plus:r,minus:[]}),c.push({id:"grid",name:{key:r.length||a.length?"source.normal":"source.grid"},color:e.grid,plus:i,minus:[...r,...a],floor:!0}),a.length&&c.push({id:"expensive",name:{key:"source.expensive"},color:e.expensive,plus:a,minus:[]}),c}function ci(n,s,e){let t=o=>s.statistics[o]??[],i=t("cheap_cost"),r=t("expensive_cost"),a=[{id:"solar",name:{key:"source.solar"},color:e.solar,plus:t("solar_cost"),minus:[]}];i.length&&a.push({id:"cheap",name:{key:"source.cheap"},color:e.cheap,plus:i,minus:[]}),a.push({id:"grid",name:{key:i.length||r.length?"source.normal":"source.grid"},color:e.grid,plus:t("cost"),minus:[...t("solar_cost"),...i,...r],floor:!0}),r.length&&a.push({id:"expensive",name:{key:"source.expensive"},color:e.expensive,plus:r,minus:[]});let c=n.areas.find(o=>o.kind==="grid")?.statistics.feed_in??[];return s.kind==="household"&&c.length&&a.push({id:"export",name:{key:"source.export"},color:e.export,plus:c,minus:[],negative:!0}),a}function lt(n,s,e,t,i){let r=o=>s.statistics[o]??[],a=P(n,i);if(t==="bill"&&e==="cost")return oi(n,s,i);if(t==="source"&&e==="cost")return ci(n,s,i);if(t==="source"&&e==="energy"){let o=[{id:"solar",name:{key:"source.solar"},color:i.solar,plus:r("solar"),minus:[]}],l=["cheap","expensive"].filter(u=>r(u).length);r("cheap").length&&o.push({id:"cheap",name:{key:"source.cheap"},color:i.cheap,plus:r("cheap"),minus:[]}),o.push({id:"grid",name:{key:l.length?"source.normal":"source.grid"},color:i.grid,plus:r("energy"),minus:[...r("solar"),...l.flatMap(r)],floor:!0}),r("expensive").length&&o.push({id:"expensive",name:{key:"source.expensive"},color:i.expensive,plus:r("expensive"),minus:[]});let d=n.areas.find(u=>u.kind==="grid")?.statistics.export??[];return s.kind==="household"&&d.length&&o.push({id:"export",name:{key:"source.export"},color:i.export,plus:d,minus:[],negative:!0}),o}if(t==="consumer"){if(s.kind==="category"){let l=new Set(s.statistics.energy??[]);return n.areas.filter(d=>d.kind==="device"&&d.statistics.energy?.some(u=>l.has(u))).map(d=>({id:d.id,name:{text:d.name},color:a.get(d.id)??i.other,...xs(d,e)}))}let o=new Set(n.areas.filter(l=>l.kind==="category").flatMap(l=>l.statistics.energy??[]));return n.areas.filter(l=>l.kind==="category"&&(l.statistics.energy?.length??0)>0||l.kind==="device"&&l.top_level!==!1&&!l.statistics.energy?.some(d=>o.has(d))||l.kind==="other").map(l=>({id:l.id,name:{text:l.name},color:a.get(l.id)??i.other,plus:l.statistics[e]??[],minus:[]}))}let c=e==="export"?i.export:s.kind==="solar"?i.solar:a.get(s.id)??(e==="heat"?i.heat:e==="distance"?i.car:i.grid);return[{id:e,name:{text:s.name},color:c,...xs(s,e)}]}var li=36e5;async function ut(n,s,e){if(!s.length)return{};let t=ye(ee(e)),i=await n.callWS({type:"recorder/statistics_during_period",start_time:new Date(e.start).toISOString(),end_time:new Date(e.end+1).toISOString(),statistic_ids:s,period:t,types:["change"],units:{energy:"kWh"}}),r=t==="hour"?0:12*li,a={};for(let c of s){a[c]=0;for(let o of i[c]??[]){let l=(typeof o.start=="number"?o.start:Date.parse(o.start))+r;l>=e.start&&l<=e.end&&(a[c]+=o.change??0)}}return a}var ui=300*1e3,di="240px",hi="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z",gi="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z",$e=class extends I{constructor(){super(...arguments);this._config={type:""};this._infoLoading=!1;this._watchingChart=!1;this._hidden=new Set}static getStubConfig(){return{area:"household",by:"source",figure:"energy",display:"ring"}}static getConfigElement(){return document.createElement("electricity-lens-breakdown-card-editor")}setConfig(e){if(e?.statistics!==void 0&&!Array.isArray(e.statistics))throw new Error("statistics must be a list");V(e?.collection_key),this._config=e??{type:""}}getCardSize(){return 4}getGridOptions(){return{columns:6,min_columns:4}}connectedCallback(){super.connectedCallback(),this._follow()}disconnectedCallback(){super.disconnectedCallback(),this._unfollow?.(),this._unfollow=void 0,clearTimeout(this._retryTimer),this._retryTimer=void 0}get _localize(){return S(this.hass?.locale?.language??this.hass?.language??"en")}get _language(){return this.hass?.locale?.language??"en"}get _fmt(){return Q(this.hass?.locale,this.hass?.config.currency??"EUR")}get _byStatistics(){return!!this._config.statistics?.length}_follow(){(this._config.period??"energy_date")==="energy_date"&&(this._unfollow||!this.isConnected||!this.hass?.connection||(this._unfollow=Z(this.hass.connection,this._config.collection_key,e=>{this._selected=e})))}_range(){let e=this._config.period??"energy_date";if(e!=="energy_date")return D(e);if(this._selected!==void 0)return this._selected??D("this_month")}_area(){return this._info?.areas.find(e=>e.id===(this._config.area??"household"))}get _by(){let e=this._area();return this._config.by==="consumer"&&(e?.kind==="household"||e?.kind==="category"&&(e.statistics.energy?.length??0)>1)?"consumer":e?.statistics.solar?.length?"source":"consumer"}get _figure(){return this._by==="consumer"&&this._config.figure==="cost"?"cost":"energy"}_series(){let e=this._info,t=this._area();return!e||!t?[]:lt(e,t,this._figure,this._by==="source"?"source":"consumer",F(this)).filter(i=>!i.negative)}_ids(){let e=new Set;if(this._byStatistics)this._config.statistics?.forEach(t=>e.add(t.statistic));else{for(let t of this._series())[...t.plus,...t.minus].forEach(i=>e.add(i));if(this._by==="consumer"&&this._info)for(let t of this._series()){let i=this._info.areas.find(r=>r.id===t.id);for(let r of["energy","solar","cheap","expensive","cost","solar_cost","cheap_cost","expensive_cost"])(i?.statistics[r]??[]).forEach(a=>e.add(a))}}return[...e].sort()}async _loadInfo(){!this.hass||this._infoLoading||(this._infoLoading=!0,this._info=await j(this.hass),this._infoLoading=!1,clearTimeout(this._retryTimer),this._retryTimer=void 0,this.isConnected&&(!this._info||this._info.calculating)&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),M)))}async _load(e,t,i){if(!this.hass)return;this._loading=e;let r={key:e,at:Date.now(),values:{},names:{},failed:!1};try{let a=this._byStatistics?t:[],[c,o]=await Promise.all([ut(this.hass,t,i),a.length?this.hass.callWS({type:"recorder/get_statistics_metadata",statistic_ids:a}):Promise.resolve([])]);r.values=c,r.names=Object.fromEntries(o.map(l=>[l.statistic_id,l.name||this.hass?.states[l.statistic_id]?.attributes.friendly_name||l.statistic_id]))}catch{r.failed=!0}this._loading===e&&(this._loading=void 0,this._sums=r)}willUpdate(e){if(!this.hass||((e.has("hass")||e.has("_config"))&&this._follow(),this._watchingChart||(this._watchingChart=!0,nt(c=>{this._hasChart=c})),this._info===void 0&&(this._info=W()),N()&&!this._infoLoading&&this._loadInfo(),!this._byStatistics&&(this.isConnected&&this._info?.calculating&&!this._retryTimer&&!this._infoLoading&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),M)),!this._info||this._info.calculating)))return;let t=this._range();if(!t)return;let i=this._ids();if(!i.length)return;let r=JSON.stringify([i,t.start,t.end]),a=!this._sums||Date.now()-this._sums.at>ui;r!==this._loading&&(r!==this._sums?.key||a&&!this._loading)&&this._load(r,i,t)}_sum(e){return e.reduce((t,i)=>t+(this._sums?.values[i]??0),0)}_parts(){let e=this._localize;if(this._byStatistics){let i=F(this),r=this._info?P(this._info,i):new Map;return(this._config.statistics??[]).map((a,c)=>{let o=this._info?.areas.find(l=>l.kind==="device"&&(l.statistics.energy?.[0]===a.statistic||l.statistics.heat?.[0]===a.statistic));return{id:a.statistic,name:a.name??o?.name??this._sums?.names[a.statistic]??a.statistic,color:(o&&r.get(o.id))??i.consumers[c%i.consumers.length],value:this._sum([a.statistic])}})}let t=this._series().map(i=>{let r=this._sum(i.plus)-this._sum(i.minus),a=i.name.key?.replace(/^source\./,"mix."),c=i.name.text??(a&&J(a)?e(a):i.name.key&&J(i.name.key)?e(i.name.key):i.id),o={id:i.id,name:c,color:i.color,value:i.floor?Math.max(r,0):r};if(this._by==="consumer"&&this._info){let l=F(this),d=this._info.areas.find(u=>u.id===i.id);if(d){let u=f=>this._sum(d.statistics[f]??[]),g=u("energy"),h=u("solar"),_=u("cheap"),m=u("expensive");o.energy=g;let v=this._figure==="cost",x={solar:v?u("solar_cost"):h,cheap:v?u("cheap_cost"):_,expensive:v?u("expensive_cost"):m};o.mix=[{color:l.solar,value:x.solar},{color:l.cheap,value:x.cheap},{color:l.grid,value:Math.max((v?u("cost"):g)-x.solar-x.cheap-x.expensive,0)},{color:l.expensive,value:x.expensive}]}}return o});return this._by==="consumer"?t.sort((i,r)=>r.value-i.value):t}_value(e){return this._figure==="cost"&&!this._byStatistics?this._fmt.value(e,"money"):this._fmt.value(e,"energy")}_title(){let e=this._localize;return this._config.title?this._config.title:this._byStatistics?"":(this._area()?this._by:this._config.by??"source")==="source"?e("breakdown_mix"):e(this._figure==="cost"?"breakdown_cost_by_consumer":"breakdown_energy_by_consumer")}_ring(e){let t=this._localize;if(this._hasChart===void 0)return p`<p class="summary">${t("loading")}</p>`;if(!this._hasChart)return p`<p class="summary">${t("history_no_chart")}</p>`;let i=this._figure==="cost"&&!this._byStatistics,r=F(this).line,a=getComputedStyle(this).getPropertyValue("--primary-text-color").trim()||"#212121",c=JSON.stringify([e,[...this._hidden],i,r,a,this.hass?.locale]);this._ringChart?.key!==c&&(this._ringChart={key:c,chart:os({items:e,total:t("breakdown_total"),format:u=>this._value(u),percent:u=>this._fmt.value(u,"percent"),centerColor:r,labelColor:a,hidden:this._hidden})});let{chart:o}=this._ringChart,l=$t(e.map(u=>this._hidden.has(u.id)?0:u.value)),d=u=>{let g=new Set(this._hidden);g.has(u)?g.delete(u):g.add(u),this._hidden=g};return p`<div class="ring">
      ${es(i,p`<ha-chart-base
          .hass=${this.hass}
          .data=${o.data}
          .options=${o.options}
          .height=${di}
        ></ha-chart-base>`)}
      <div class="chart-legend">
        <ul>
          ${e.map((u,g)=>{let h=this._hidden.has(u.id),_=this._fmt.value(l[g],"percent");return p`<li class=${h?"hidden":""}>
              <button
                type="button"
                class="leg"
                aria-pressed=${String(!h)}
                aria-label="${u.name}: ${_}"
                @click=${()=>d(u.id)}
              >
                <svg class="icon" viewBox="0 0 24 24" style="color: ${h?"var(--secondary-text-color)":u.color}">
                  <path fill="currentColor" d=${h?gi:hi}></path>
                </svg>
                <span class="label">${u.name}</span>
                <span class="value">${_}</span>
              </button>
            </li>`})}
        </ul>
      </div>
    </div>`}_bars(e){let t=e.filter(c=>this._value(c.value)!==this._value(0)),i=Math.max(...t.map(c=>c.value),0),r=this._config.color_by_source===!0&&this._by==="consumer",a=this._localize;return p`<div class="bars">
      ${t.map(c=>{let o=i>0?Math.max(c.value/i*100,0):0,l=c.mix?.reduce((u,g)=>u+g.value,0)??0,d="";return this._figure==="cost"&&c.energy!==void 0&&(d=this._fmt.value(c.energy,"energy"),c.energy>0&&(d+=` \xB7 ${a("line_average_price",{price:this._fmt.value(c.value/c.energy,"price")})}`)),p`<div class="bar-row">
          <div class="bar-text">
            <span class="name">${c.name}</span>
            <span class="amount">${this._value(c.value)}</span>
          </div>
          ${d?p`<div class="bar-line">${d}</div>`:y}
          <div class="track">
            <div class="fill" style="width: ${o}%; ${r?"":`--c: ${c.color}`}">
              ${r&&c.mix&&l>0?c.mix.map(u=>p`<span style="width: ${u.value/l*100}%; --c: ${u.color}"></span>`):y}
            </div>
          </div>
        </div>`})}
      ${r?p`<div class="key">
            ${["solar","cheap","grid","expensive"].filter(c=>(c!=="cheap"||this._info?.levels.cheap_until!=null)&&(c!=="expensive"||this._info?.levels.expensive_from!=null)).map(c=>p`<span><span class="dot" style="--c: ${le[c]}"></span>${a(c==="grid"?this._info?.levels.cheap_until!=null||this._info?.levels.expensive_from!=null?"source.normal":"source.grid":`source.${c}`)}</span>`)}
          </div>`:y}
    </div>`}render(){if(!this.hass)return p``;let e=this._localize,t=this._range(),i=this._sums?this._parts():[],r=i.reduce((g,h)=>g+Math.max(h.value,0),0),a=!this._byStatistics&&this._info?.calculating===!0,c=!this._byStatistics&&this._info!==void 0&&!this._area(),o=this._config.display??(!this._byStatistics&&this._by==="consumer"?"bars":"ring"),l=(this._config.period??"energy_date")==="energy_date",d=t&&!(o==="bars"&&l)?_s(t,this._language):"",u;return a?u=p`<p class="summary">${e("calculating")}</p>`:c?u=p`<p class="summary">${e(this._info===null?"editor_not_loaded":"figures_unavailable")}</p>`:this._sums?.failed?u=p`<p class="summary">${e("figures_failed")}</p>`:this._sums?r<=0?u=p`<p class="summary">${e("history_empty_figure")}</p>`:u=o==="bars"?this._bars(i):this._ring(i):u=p`<p class="summary">${e("loading")}</p>`,p`<ha-card>
      <div class="header">
        <h2 class="title">${this._title()}</h2>
        ${d?p`<span class="chip">${d}</span>`:y}
      </div>
      ${u}
    </ha-card>`}};$e.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0},_selected:{state:!0},_sums:{state:!0},_hasChart:{state:!0},_hidden:{state:!0}},$e.styles=[L,E`
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
    `];var Se=n=>({select:{mode:"dropdown",options:n}}),pi=n=>n.kind==="household"||!!n.statistics.solar?.length,He=class extends T{constructor(){super(...arguments);this._label=e=>this._localize(`editor_${e.name}`)}setConfig(e){this._config=e}get _localize(){return S(this.hass?.locale?.language??this.hass?.language??"en")}willUpdate(){this.hass&&this._info===void 0&&(this._info=null,this.hass.callWS({type:`${A}/figures`}).then(e=>{this._info=e}).catch(()=>{}))}_data(){let e=this._config??{type:""},t=!!e.statistics?.length||e.statistics!==void 0&&!e.area;return{title:e.title??"",period:e.period??"energy_date",source:t?"statistics":"energy",area:e.area??"household",by:e.by??"source",figure:e.figure??"energy",display:e.display??(!t&&e.by==="consumer"?"bars":"ring"),color_by_source:e.color_by_source??!1,statistics:(e.statistics??[]).map(i=>i.statistic)}}_schema(e){let t=this._localize,i=[{name:"title",selector:{text:{}}},{name:"period",selector:Se(se.map(r=>({value:r,label:t(`period.${r}`)})))},{name:"breakdown_source",selector:Se(["energy","statistics"].map(r=>({value:r,label:t(`breakdown_source.${r}`)})))}];if(e.source==="statistics")i.push({name:"statistics",selector:{statistic:{multiple:!0}}});else{let r=(this._info?.areas??[]).filter(pi),a=r.find(o=>o.id===e.area),c=[...a?.statistics.solar?.length?["source"]:[],...a?.kind==="household"?["consumer"]:[]];i.push({name:"area",selector:Se(r.map(o=>({value:o.id,label:o.name})))},{name:"by",selector:Se(c.map(o=>({value:o,label:t(`by.${o}`)})))}),e.by==="consumer"&&i.push({name:"figure",selector:Se(["energy","cost"].map(o=>({value:o,label:t(`figure_choice.${o}`)})))})}return i.push({name:"display",selector:Se(["ring","bars"].map(r=>({value:r,label:t(`display.${r}`)})))}),e.source!=="statistics"&&e.by==="consumer"&&e.display==="bars"&&i.push({name:"color_by_source",selector:{boolean:{}}}),i}_changed(e){if(!this._config)return;let t={...this._data(),...e.detail.value};"breakdown_source"in e.detail.value&&(t.source=e.detail.value.breakdown_source);let{title:i,period:r,area:a,by:c,figure:o,display:l,color_by_source:d,statistics:u,...g}=this._config,h=g;if(typeof t.title=="string"&&t.title&&(h.title=t.title),h.period=t.period??"energy_date",t.source==="statistics"){let _=new Map((this._config.statistics??[]).map(v=>[v.statistic,v])),m=Array.isArray(t.statistics)?t.statistics.filter(Boolean):[];h.statistics=m.map(v=>_.get(v)??{statistic:v})}else{h.area=t.area??"household";let _=this._info?.areas.find(x=>x.id===h.area),m=_?.kind==="household",v=!!_?.statistics.solar?.length;h.by=t.by==="consumer"&&m?"consumer":v?"source":"consumer",h.by==="consumer"&&t.figure==="cost"?h.figure="cost":h.figure="energy"}h.display=t.display==="bars"?"bars":"ring",h.by==="consumer"&&h.display==="bars"&&t.color_by_source===!0&&(h.color_by_source=!0),this._config=h,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:h},bubbles:!0,composed:!0}))}render(){if(!this.hass||!this._config)return p``;let e=this._data();return p`<ha-form
      .hass=${this.hass}
      .data=${{...e,breakdown_source:e.source}}
      .schema=${this._schema(e)}
      .computeLabel=${this._label}
      @value-changed=${this._changed}
    ></ha-form>`}};He.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0}};var ke=class extends I{constructor(){super(...arguments);this._infoLoading=!1}static getStubConfig(){return{}}static getConfigForm(){return{schema:[{name:"title",selector:{text:{}}}]}}setConfig(e){this._config=e}getCardSize(){return 4}getGridOptions(){return{columns:12,min_columns:6}}get _localize(){return S(this.hass?.locale?.language??this.hass?.language??"en")}_money(e,t=!1){return e===void 0?"":e===null?"\u2013":O(this.hass?.locale,{style:"currency",currency:this.hass?.config.currency??"EUR",maximumFractionDigits:0,minimumFractionDigits:0,signDisplay:t?"exceptZero":"auto"}).format(e)}willUpdate(){this.hass&&(this._info===void 0&&(this._info=W()),N()&&!this._infoLoading&&(this._infoLoading=!0,j(this.hass).then(e=>{this._info=e,this._infoLoading=!1})))}render(){let e=this._localize;if(!this.hass)return p``;let t=H(this.hass),i=vs(this.hass),r=p`<div class="header">
      <h2 class="title">${this._config?.title||e("title")}</h2>
    </div>`;if(!t.length||!i)return p`<ha-card>
        ${r}
        <p class="summary">${e(be(this.hass))}</p>
      </ha-card>`;let a=this._info?P(this._info,F(this)):void 0,c=t.some(l=>l.calculating),o={perYear:t.some(l=>l.perYear!==null),invested:i.invested>0};return p`<ha-card>
      ${r}
      <div class="table">
        <table>
          <thead>
            <tr>
              <th class="bullet-cell"></th>
              <th class="name" scope="col">${e("column_area")}</th>
              ${o.perYear?p`<th class="number per-year" scope="col">${e("column_per_year")}</th>`:y}
              <th class="number" scope="col">${e("column_saving")}</th>
              ${o.invested?p`<th class="number" scope="col">${e("column_investment")}</th>
                    <th class="number" scope="col">${e("column_balance")}</th>`:y}
            </tr>
          </thead>
          <tbody>
            ${t.map(l=>this._row({name:e(`category.${l.category}`),entityId:l.entityId,perYear:l.perYear,saving:l.calculating?null:l.saving,investment:l.investment??void 0,balance:l.balance,category:l.category},o,a))}
            ${this._row({name:e("total"),entityId:i.entityId,perYear:i.perYear,saving:c?null:i.saved,investment:i.invested,balance:i.balance},o)}
          </tbody>
        </table>
      </div>
      ${c?p`<p class="note">${e("calculating")}</p>`:y}
    </ha-card>`}_row(e,t,i){let{name:r,entityId:a,perYear:c,saving:o,investment:l,balance:d,category:u}=e,g=u?i?.get(u):void 0;return p`<tr
      class=${u??"total"}
      style=${g?`--color: ${g}`:""}
      @click=${()=>this._moreInfo(a)}
    >
      <td class="bullet-cell">
        ${u?p`<span class="bullet" aria-hidden="true"></span>`:y}
      </td>
      <th class="name" scope="row" title=${r}>
        <button type="button">${r}</button>
      </th>
      ${t.perYear?p`<td class="number per-year">
            ${c===null?"\u2013":this._localize("average",{amount:this._money(c)})}
          </td>`:y}
      <td class="number">${this._money(o)}</td>
      ${t.invested?p`<td class="number">${this._money(l)}</td>
            <td class="number">${this._money(d,!0)}</td>`:y}
    </tr>`}_moreInfo(e){this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:e},bubbles:!0,composed:!0}))}};ke.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0}},ke.styles=[L,E`
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
    `];var mi=300*1e3,U=(n,s)=>(s??[]).reduce((e,t)=>e+(n[t]??0),0),ge=class extends I{constructor(){super(...arguments);this._infoLoading=!1}getCardSize(){return 4}getGridOptions(){return{columns:12,min_columns:6}}connectedCallback(){super.connectedCallback(),this._follow()}disconnectedCallback(){super.disconnectedCallback(),this._unfollow?.(),this._unfollow=void 0,clearTimeout(this._retryTimer),this._retryTimer=void 0}get _localize(){return S(this.hass?.locale?.language??this.hass?.language??"en")}get _fmt(){return Q(this.hass?.locale,this.hass?.config.currency??"EUR")}_follow(){this._unfollow||!this.isConnected||!this.hass?.connection||(this._unfollow=Z(this.hass.connection,this._collectionKey,e=>{this._selected=e}))}async _loadInfo(){!this.hass||this._infoLoading||(this._infoLoading=!0,this._info=await j(this.hass),this._infoLoading=!1,clearTimeout(this._retryTimer),this._retryTimer=void 0,this.isConnected&&(!this._info||this._info.calculating)&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),M)))}async _load(e,t,i){if(!this.hass)return;this._loading=e;let r=null;try{r=await ut(this.hass,t,i)}catch{}this._loading===e&&(this._loading=void 0,this._sums={key:e,at:Date.now(),values:r})}willUpdate(){if(!this.hass||(this._follow(),this._info===void 0&&(this._info=W()),N()&&!this._infoLoading&&this._loadInfo(),this._selected===void 0||!this._info||this._info.calculating))return;let e=this._selected??D("this_month"),t=[...new Set(this._ids())].sort();if(!t.length)return;let i=JSON.stringify([t,e.start,e.end]),r=!this._sums||Date.now()-this._sums.at>mi;i!==this._loading&&(i!==this._sums?.key||r&&!this._loading)&&this._load(i,t,e)}_waiting(){if(!this.hass)return;let e=H(this.hass);return e.length?e.some(t=>t.calculating)||this._info?.calculating?"calculating":this._info===null?"editor_not_loaded":this._info===void 0?"loading":this._ids().length?this._sums?this._sums.values?void 0:"history_failed":"loading":"figures_unavailable":be(this.hass)}};ge.properties={hass:{attribute:!1},_info:{state:!0},_selected:{state:!0},_sums:{state:!0}};var dt=E`
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
`;var Ne=class extends ge{static getStubConfig(){return{}}static getConfigForm(){return{schema:[]}}setConfig(s){V(s?.collection_key),this._collectionKey=s?.collection_key}get _devices(){return this._info?ct(this._info).sort((s,e)=>s.name.localeCompare(e.name,this.hass?.locale?.language)):[]}_ids(){return this._devices.flatMap(s=>[...s.statistics.heat??[],...s.statistics.energy??[]])}render(){let s=this._localize;if(!this.hass)return p``;let e=this._waiting(),t=this._devices,i=t.length?t.map(r=>r.name).join(" & "):s("figure.heat");return p`<ha-card>
      <div class="header"><h2 class="title">${i}</h2></div>
      ${e?p`<p class="summary">${s(e)}</p>`:this._table()}
    </ha-card>`}_table(){let s=this._localize,e=this._fmt,t=this._sums?.values??{},i=P(this._info,F(this));return p`<table>
      <thead>
        <tr>
          <th scope="col" colspan="2" class="name">${s("meters_consumer")}</th>
          <th scope="col">${s("figure.heat")}</th>
          <th scope="col">${s("meters_electricity")}</th>
          <th scope="col">${s("figure.scop")}</th>
        </tr>
      </thead>
      <tbody>
        ${this._devices.map(r=>{let a=U(t,r.statistics.heat),c=U(t,r.statistics.energy);return p`<tr>
            <td class="swatch-cell">
              <span class="swatch" style="--color: ${i.get(r.id)??""}" aria-hidden="true"></span>
            </td>
            <td class="name">${r.name}</td>
            <td>${e.value(a,"energy")}</td>
            <td>${e.value(c,"energy")}</td>
            <td>${c>0?e.number(a/c,2):"\u2013"}</td>
          </tr>`})}
      </tbody>
    </table>`}};Ne.styles=[L,dt];var fi=300*1e3,_i="200px",yi={energy:"energy",cost:"money",saving:"money",export:"energy",heat:"energy",distance:"distance",alternative_cost:"money"},Ce=class extends I{constructor(){super(...arguments);this._config={type:""};this._infoLoading=!1;this._watchingChart=!1}static getStubConfig(){return{}}static getConfigElement(){return document.createElement("electricity-lens-history-card-editor")}setConfig(e){V(e?.collection_key),this._config=e??{type:""}}getCardSize(){return 5}getGridOptions(){return{columns:12,min_columns:6}}connectedCallback(){super.connectedCallback(),this._follow()}disconnectedCallback(){super.disconnectedCallback(),this._unfollow?.(),this._unfollow=void 0,clearTimeout(this._retryTimer),this._retryTimer=void 0}get _localize(){return S(this.hass?.locale?.language??this.hass?.language??"en")}get _language(){return this.hass?.locale?.language??"en"}get _fmt(){return Q(this.hass?.locale,this.hass?.config.currency??"EUR")}get _savings(){return!this._config.area}_follow(){(this._config.period??"energy_date")==="energy_date"&&(this._unfollow||!this.isConnected||!this.hass?.connection||(this._unfollow=Z(this.hass.connection,this._config.collection_key,(e,t)=>{this._selected=e,this._compare=t})))}async _loadInfo(){!this.hass||this._infoLoading||(this._infoLoading=!0,this._info=await j(this.hass),this._infoLoading=!1,clearTimeout(this._retryTimer),this._retryTimer=void 0,this.isConnected&&(!this._info||this._info.calculating)&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),M)))}_range(e){let t=this._config.period??"energy_date";if(t==="all"){let r=new Date(new Date().getFullYear()+1,0,1).getTime()-1;return{range:{start:new Date(ms,0,1).getTime(),end:r},period:"year",fromFirstValue:!0}}if(t!=="energy_date"){let r=D(t);return{range:r,period:ee(r),fromFirstValue:!1}}if(this._selected===void 0)return;if(this._selected)return{range:this._selected,period:ee(this._selected),compare:this._compare,fromFirstValue:!1};let i=e();return{range:i,period:this._savings?"year":ee(i),fromFirstValue:!1}}_savingsPlan(){if(!this.hass)return;let e=this._localize,t=H(this.hass);if(!t.length||t.some(l=>l.calculating))return;let i=this._range(()=>ps(t.map(l=>l.countingSince)));if(!i)return;let r=F(this),a=this._info?P(this._info,r):void 0,c={pv:r.solar,heat_pump:a?.get("heat_pump")??r.heat,wallbox:a?.get("wallbox")??r.car},o=t.map(l=>({series:{id:l.category,name:{},color:c[l.category],plus:[l.savingStatistic],minus:[]},name:e(`category.${l.category}`)}));return this._plan(i,o,"money",void 0,[])}_figurePlan(){let e=this._info,t=this._config;if(!e||e.calculating)return;let i=e.areas.find(h=>h.id===t.area),r=t.figure??"energy";if(!i||!i.statistics[r]?.length)return;let a=this._range(()=>D("this_month"));if(!a)return;let c=this._localize,o=we(i,r),l=t.stack&&o.includes(t.stack)?t.stack:o[0],d=lt(e,i,r,l,F(this)).map(h=>({series:h,name:h.name.text??(h.name.key&&J(h.name.key)?c(h.name.key):h.id)}));d.length===1&&(d[0].name=K(c,r,i));let u=t.line==="grid_price"?e.areas.find(h=>h.kind==="grid")??i:i,g=t.line&&i.statistics?{figure:t.line,area:u,name:t.line_name??K(c,t.line,u)}:void 0;return this._plan(a,d,yi[r],g,t.lines??[])}_plan(e,t,i,r,a){let c=new Set;for(let{series:l}of t)[...l.plus,...l.minus].forEach(d=>c.add(d));if(r)for(let l of Object.values(r.area.statistics))(l??[]).forEach(d=>c.add(d));a.forEach(l=>c.add(l.statistic));let o=[...c].sort();return{key:JSON.stringify([o,t.map(l=>[l.series.id,l.series.color]),r?.figure,a,e.range.start,e.range.end,e.period,e.compare?.start,e.compare?.end]),range:e.range,period:e.period,compare:e.compare,fromFirstValue:e.fromFirstValue,bars:t,unit:i,lineFigure:r,lines:a,ids:o}}async _load(e){if(!this.hass)return;this._loading=e.key;let t={key:e.key,at:Date.now(),plan:e,slots:kt(e.range,e.period),rows:{},compareSlots:e.compare?kt(e.compare,e.period):[],compareRows:{},metadata:{},failed:!1},i=this.hass,r=(a,c)=>i.callWS({type:"recorder/statistics_during_period",start_time:new Date(a.start).toISOString(),end_time:new Date(a.end+1).toISOString(),statistic_ids:c,period:ye(e.period),types:["change","mean"],units:{energy:"kWh"}});try{let a=e.lines.map(u=>u.statistic),c=[...new Set(e.bars.flatMap(({series:u})=>[...u.plus,...u.minus]))],[o,l,d]=await Promise.all([r(e.range,e.ids),e.compare?r(e.compare,c):Promise.resolve({}),a.length?this.hass.callWS({type:"recorder/get_statistics_metadata",statistic_ids:a}):Promise.resolve([])]);t.rows=o,t.compareRows=l,t.metadata=Object.fromEntries(d.map(u=>[u.statistic_id,u]))}catch{t.failed=!0}this._loading===e.key&&(this._loading=void 0,this._loaded=t)}willUpdate(e){if(!this.hass)return;(e.has("hass")||e.has("_config"))&&this._follow(),this._watchingChart||(this._watchingChart=!0,nt(r=>{this._hasChart=r})),this._info===void 0&&(this._info=W()),N()&&!this._infoLoading?this._loadInfo():!this._savings&&this.isConnected&&this._info?.calculating&&!this._retryTimer&&!this._infoLoading&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),M));let t=this._savings?this._savingsPlan():this._figurePlan(),i=!this._loaded||Date.now()-this._loaded.at>fi;t&&t.key!==this._loading&&(t.key!==this._loaded?.key||i&&!this._loading)&&this._load(t),e.has("_loaded")&&(this._chart=this._buildChart())}_perSlot(e,t=!1){let i=this._loaded;if(!i)return[];let r=t?i.compareSlots:i.slots,a=t?i.compareRows:i.rows,c=r.map(()=>null);for(let o of e)Ct(a[o],r,i.plan.period).forEach((l,d)=>{l!==null&&(c[d]=(c[d]??0)+l)});return c}_barValues(e,t=!1){let i=this._perSlot(e.plus,t),r=this._perSlot(e.minus,t);return i.map((a,c)=>{if(a===null&&r[c]===null)return null;let o=(a??0)-(r[c]??0),l=e.floor?Math.max(o,0):o;return e.negative?-l:l})}_lines(){let e=this._loaded;if(!e)return[];let{plan:t,slots:i}=e,r=this._fmt,a=F(this),c=this.hass?.config.currency==="EUR"?100:1,o=[];if(t.lineFigure){let{figure:l,area:d,name:u}=t.lineFigure,g=Object.fromEntries(Object.entries(d.statistics).map(([m,v])=>[m,this._perSlot(v??[])])),h=i.map((m,v)=>_e(l,d,f=>g[f]?.[v]??null,null).value),_=_e(l,d,()=>0,null).unit;o.push({id:`line_${l}`,name:u,color:a.line,dash:"dashed",step:_==="price"&&t.period==="hour",values:_==="price"?h.map(m=>m===null?null:m*c):h,format:m=>r.value(_==="price"?m/c:m,_)})}return t.lines.forEach((l,d)=>{let u=e.metadata[l.statistic],g=l.value??(u?.has_sum?"change":"mean"),h=u?.unit_class==="energy"?"kWh":u?.statistics_unit_of_measurement??"",_=g==="mean"?ys(e.rows[l.statistic],i,t.period):Ct(e.rows[l.statistic],i,t.period);o.push({id:`statistic_${d}`,name:l.name??u?.name??this.hass?.states[l.statistic]?.attributes.friendly_name??l.statistic,color:d===0&&!t.lineFigure?a.line:a.consumers[d%a.consumers.length],dash:"dotted",values:_,format:m=>`${r.number(m)}${h?` ${h}`:""}`})}),o}_buildChart(){let e=this._loaded;if(!e||e.failed)return;let t=this._localize,i=this._fmt,{plan:r}=e,a=r.bars.map(({series:f,name:$})=>({id:f.id,name:$,color:f.color,values:this._barValues(f),inTotal:!f.negative})),c=this._lines(),o=this._labels(e.slots,r.period),l=r.fromFirstValue?fs([...a,...c].map(f=>f.values),o.length):0,d=f=>f.slice(l);a.forEach(f=>f.values=d(f.values)),c=c.map(f=>({...f,values:d(f.values)})),o=d(o);let u=r.compare?{series:r.bars.map(({series:f,name:$})=>({id:f.id,name:$,color:f.color,values:this._barValues(f,!0),inTotal:!f.negative})),labels:this._labels(e.compareSlots,r.period).map(f=>f.tooltip)}:void 0,g={price:this.hass?.config.currency==="EUR"?"ct/kWh":`${i.currencySymbol()}/kWh`,percent:"%",per_100km:`${i.currencySymbol()}/100 km`},h=r.lineFigure&&!r.lines.length?g[_e(r.lineFigure.figure,r.lineFigure.area,()=>0,null).unit]??"":"",_=as({labels:o,series:a,compare:u,unit:r.unit==="money"?i.currencySymbol():r.unit==="distance"?"km":"kWh",total:t("history_total"),format:f=>r.unit==="money"?i.value(f,"money"):`${i.number(f,Math.abs(f)<10?2:1)} ${r.unit==="distance"?"km":"kWh"}`,tick:f=>i.number(f),lineTick:f=>i.number(f,Number.isInteger(f)?0:1),lines:c,lineUnit:h}),v=a.filter(f=>f.inTotal!==!1).flatMap(f=>f.values).reduce((f,$)=>f+($??0),0),x=[...a,...c].some(f=>f.values.some($=>$));return{..._,total:v,hasData:x}}_labels(e,t){let i=l=>new Intl.DateTimeFormat(this._language,l),r=i({hour:"2-digit",minute:"2-digit",hour12:us(this.hass?.locale)}),a=e.length>0&&new Date(e[0]).getFullYear()!==new Date(e[e.length-1]).getFullYear(),c={hour:r,day:i({day:"numeric"}),month:i(a?{month:"short",year:"2-digit"}:{month:"short"}),year:i({year:"numeric"})}[t],o={hour:r,day:i({weekday:"short",day:"numeric",month:"short"}),month:i({month:"long",year:"numeric"}),year:i({year:"numeric"})}[t];return e.map(l=>({axis:c.format(l),tooltip:t==="hour"?`${r.format(l)} \u2013 ${r.format(l+36e5)}`:o.format(l)}))}_title(){let e=this._localize;if(this._config.title)return this._config.title;if(this._savings)return e("history_title");let t=this._config.figure??"energy",i=this._info?.areas.find(a=>a.id===this._config.area);if(i)return K(e,t,i);let r=`figure.${t}`;return J(r)?e(r):e("history_title")}render(){let e=this._localize;if(!this.hass)return p``;let t=this._title();if(this._savings&&!H(this.hass).length)return p`<ha-card>
        <div class="header"><h2 class="title">${t}</h2></div>
        <p class="summary">${e(be(this.hass))}</p>
      </ha-card>`;let i=this._savings?H(this.hass).some(l=>l.calculating):this._info?.calculating===!0,r=i?void 0:this._loaded,a=this._chart?.hasData??!1,c=r?.plan.unit??"money",o=!this._savings&&this._info!==void 0&&!this._info?.areas.some(l=>l.id===this._config.area&&l.statistics[this._config.figure??"energy"]?.length);return p`<ha-card>
      <div class="header">
        <h2 class="title">${t}</h2>
        ${r&&!r.failed&&a&&this._chart?p`<span class="chip">${this._fmt.value(this._chart.total,c)}</span>`:y}
      </div>
      ${i?p`<p class="summary">${e("calculating")}</p>`:o?p`<p class="summary">${e(this._info===null?"editor_not_loaded":"figures_unavailable")}</p>`:this._body(r,a)}
    </ha-card>`}_body(e,t){let i=this._localize;return this._hasChart===!1?p`<p class="summary">${i("history_no_chart")}</p>`:e?.failed?p`<p class="summary">${i("history_failed")}</p>`:p`<div class="chart">
      ${this._chart&&this._hasChart?p`<ha-chart-base
            .hass=${this.hass}
            .data=${this._chart.data}
            .options=${this._chart.options}
          ></ha-chart-base>`:y}
      ${e&&!t?p`<div class="empty">
            ${i(this._savings?"history_empty":"history_empty_figure")}
          </div>`:y}
    </div>`}};Ce.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0},_selected:{state:!0},_loaded:{state:!0},_hasChart:{state:!0}},Ce.styles=[L,E`
      .chart {
        position: relative;
        min-height: ${Ye(_i)};
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
    `];function vi(n,s,e={}){let t=a=>s.areas.find(c=>c.id===a)?.statistics??{},i=s.areas.find(a=>a.kind==="grid")?.statistics??{},r=[];for(let a of n){let c=[a.savingStatistic];if(a.category==="pv"){let o=i.export?.length?i.export:[],l=o.length?i.feed_in??[]:[];r.push({name:"savings_pv",color:le.solar,plus:c,minus:l,energy:t("solar").self_used??[]}),l.length&&r.push({name:"savings_feed_in",color:le.export,plus:l,minus:[],energy:o})}else a.category==="heat_pump"?r.push({name:a.heating==="oil"?"savings_oil":"savings_gas",color:e.heat??le.heat,plus:c,minus:[],energy:t("heat_pump").energy??[]}):r.push({name:"savings_fuel",color:e.car??le.car,plus:c,minus:[],energy:t("wallbox").energy??[]})}return r}var Ue=class extends ge{constructor(){super(...arguments);this._config={}}static getStubConfig(){return{}}static getConfigElement(){return document.createElement("electricity-lens-savings-card-editor")}setConfig(e){V(e?.collection_key),this._config=e??{},this._collectionKey=this._config.collection_key,this.requestUpdate()}get _area(){return this._info?.areas.find(e=>e.id===this._config.area)}_rows(){if(!this.hass||!this._info)return[];let e=P(this._info,F(this));return vi(H(this.hass),this._info,{heat:e.get("heat_pump"),car:e.get("wallbox")})}_ids(){if(this._config.area){let e=this._area?.statistics;return e?.alternative_cost?.length&&e.cost?.length&&e.saving?.length?[...e.alternative_cost,...e.cost,...e.saving,...e.solar_saving??[]]:[]}return this._rows().flatMap(e=>[...e.plus,...e.minus,...e.energy])}render(){let e=this._localize;if(!this.hass)return p``;let t=this._waiting();return p`<ha-card>
      <div class="header"><h2 class="title">${e("savings_title")}</h2></div>
      ${t?p`<p class="summary">${e(t)}</p>`:this._config.area?this._reckoning():this._table()}
    </ha-card>`}_reckoning(){let e=this._localize,t=this._fmt,i=this._area,r=this._sums?.values??{},a=U(r,i?.statistics.alternative_cost),c=U(r,i?.statistics.cost),o=U(r,i?.statistics.solar_saving),l=U(r,i?.statistics.saving)+o,d=H(this.hass).find(h=>h.category===i?.id)?.heating,u=i?.id==="wallbox"?"savings_instead_fuel":d==="oil"?"savings_instead_oil":"savings_instead_gas",g=Math.abs(o)>=.005;return p`<table>
        <tbody>
          <tr>
            <td class="name">${e(u)}</td>
            <td>${t.value(a,"money")}</td>
          </tr>
          <tr>
            <td class="name">
              ${i?.id==="wallbox"?e("strategy.charging_cost"):e("savings_electricity",{name:i?.name??""})}
            </td>
            <td>${t.value(-c,"money")}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th scope="row" class="name">${e("savings_title")}</th>
            <td>${t.value(l,"money")}</td>
          </tr>
          ${g?p`<tr class="quiet">
                <th scope="row" class="name">${e("savings_solar_part")}</th>
                <td>${t.value(o,"money")}</td>
              </tr>`:y}
        </tfoot>
      </table>`}_table(){let e=this._localize,t=this._fmt,i=this._rows(),r=this._sums?.values??{},a=o=>U(r,o.plus)-U(r,o.minus),c=i.reduce((o,l)=>o+a(l),0);return p`<table>
        <thead>
          <tr>
            <th scope="col" colspan="2" class="name">${e("savings_source")}</th>
            <th scope="col">${e("savings_energy")}</th>
            <th scope="col">${e("savings_amount")}</th>
          </tr>
        </thead>
        <tbody>
          ${i.map(o=>{let l=U(r,o.energy);return p`<tr>
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
            <th scope="row" colspan="2" class="name">${e("savings_total")}</th>
            <td></td>
            <td>${t.value(c,"money")}</td>
          </tr>
        </tfoot>
      </table>`}};Ue.styles=[L,dt];var bi=["energy","statistic","entity"],Ae=n=>({select:{mode:"dropdown",options:n}}),Re=class extends T{constructor(){super(...arguments);this._requested=!1;this._label=e=>this._localize(`editor_${e.name}`);this._helper=e=>e.name==="period"?this._localize("editor_period_hint"):void 0}setConfig(e){this._config=e}get _localize(){return S(this.hass?.locale?.language??this.hass?.language??"en")}willUpdate(){this.hass&&!this._requested&&(this._requested=!0,this.hass.callWS({type:`${A}/figures`}).then(e=>{this._info=e}).catch(()=>{this._info=null}))}_schema(e){let t=this._localize,i=B(e),r=[{name:"source",selector:Ae(bi.map(a=>({value:a,label:t(`source.${a}`)})))}];if(i==="energy"){let a=this._info?.areas??[],c=a.find(o=>o.id===e.area);r.push({name:"area",selector:Ae(a.map(o=>({value:o.id,label:o.name})))},{name:"figure",selector:Ae(c?X(c).map(o=>({value:o,label:K(t,o,c)})):[])})}else i==="statistic"?(r.push({name:"statistic",selector:{statistic:{}}},{name:"value",selector:Ae(gs.map(a=>({value:a,label:t(`value.${a}`)})))}),(e.value??"change")==="mean"&&r.push({name:"secondary",selector:Ae(["none","range"].map(a=>({value:a,label:t(`secondary.${a}`)})))})):r.push({name:"entity",selector:{entity:{}}});return r.push({name:"name",selector:{text:{}}}),i!=="entity"&&!(e.figure&&(ue(e.figure)||de(e.figure)))&&r.push({name:"period",selector:Ae(se.map(a=>({value:a,label:t(`period.${a}`)})))}),r}_figureFrom(e,t){let i=e.source??B(t);if(i!==B(t))return i==="energy"?{area:"household",figure:"cost"}:i==="statistic"?{statistic:"",value:"change"}:{entity:""};if(i==="energy"){let r=e.area??t.area,a=this._info?.areas.find(l=>l.id===r),c=a?X(a):[],o=c.includes(e.figure)?e.figure:c[0];return{area:r,figure:o,...t.secondary==="none"?{secondary:"none"}:{}}}if(i==="statistic"){let r={statistic:e.statistic??"",value:e.value??"change"};return r.value==="mean"&&e.secondary==="range"&&(r.secondary="range"),r}return{entity:e.entity??""}}_changed(e){if(!this._config)return;let t=e.detail.value,{area:i,figure:r,statistic:a,value:c,secondary:o,entity:l,name:d,...u}=this._config,g={...u,period:t.period??"energy_date",...this._figureFrom(t,this._config)};typeof t.name=="string"&&t.name&&(g.name=t.name),this._config=g,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:g},bubbles:!0,composed:!0}))}render(){if(!this.hass||!this._config)return p``;let e=this._config;return p`<div class="editor">
      ${B(e)==="energy"&&this._info===null?p`<p class="hint">${this._localize("editor_not_loaded")}</p>`:y}
      <ha-form
        .hass=${this.hass}
        .data=${{source:B(e),...e,value:e.value??"change",secondary:e.secondary??"none",period:e.period??"energy_date"}}
        .schema=${this._schema(e)}
        .computeLabel=${this._label}
        .computeHelper=${this._helper}
        @value-changed=${this._changed}
      ></ha-form>
    </div>`}};Re.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0}},Re.styles=E`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .hint {
      margin: 0;
      color: var(--secondary-text-color);
    }
  `;var Ft="savings",Ve=n=>({select:{mode:"dropdown",options:n}}),Ee=class extends T{constructor(){super(...arguments);this._requested=!1;this._label=e=>this._localize(`editor_${e.name}`);this._helper=e=>e.name==="period"?this._localize(this._config?.area?"editor_period_hint":"editor_period_hint_years"):void 0}setConfig(e){this._config=e}get _localize(){return S(this.hass?.locale?.language??this.hass?.language??"en")}willUpdate(){this.hass&&!this._requested&&(this._requested=!0,this.hass.callWS({type:`${A}/figures`}).then(e=>{this._info=e}).catch(()=>{this._info=null}))}_schema(){let e=this._localize,t=this._config??{type:""},i=this._info?.areas??[],r=[{name:"title",selector:{text:{}}},{name:"period",selector:Ve([...se,"all"].map(c=>({value:c,label:e(`period.${c}`)})))},{name:"area",selector:Ve([{value:Ft,label:e("editor_savings")},...i.filter(c=>Oe(c).length).map(c=>({value:c.id,label:c.name}))])}],a=i.find(c=>c.id===t.area);if(a){let c=Oe(a),o=t.figure&&c.includes(t.figure)?t.figure:c[0];r.push({name:"figure",selector:Ve(c.map(l=>({value:l,label:K(e,l,a)})))},{name:"stack",selector:Ve(we(a,o).map(l=>({value:l,label:e(`stack.${l}`)})))},{name:"line",selector:Ve([{value:"none",label:e("editor_line_none")},...Tt(a).map(l=>({value:l,label:K(e,l,a)}))])},{name:"lines",selector:{statistic:{multiple:!0}}})}return r}_data(){let e=this._config??{type:""},t=this._info?.areas.find(a=>a.id===e.area),i=t?Oe(t):[],r=e.figure&&i.includes(e.figure)?e.figure:i[0];return{title:e.title??"",period:e.period??"energy_date",area:e.area??Ft,figure:r,stack:e.stack??(t&&r?we(t,r)[0]:void 0),line:e.line??"none",lines:(e.lines??[]).map(a=>a.statistic)}}_changed(e){if(!this._config)return;let t=e.detail.value,{title:i,period:r,area:a,figure:c,stack:o,line:l,lines:d,...u}=this._config,g=u;typeof t.title=="string"&&t.title&&(g.title=t.title),g.period=t.period??"energy_date";let h=t.area;if(h&&h!==Ft){g.area=h;let _=this._info?.areas.find(w=>w.id===h),m=_?Oe(_):[],v=m.includes(t.figure)?t.figure:m[0];v&&(g.figure=v),(_&&v?we(_,v):[]).includes(t.stack)&&(g.stack=t.stack),(_?Tt(_):[]).includes(t.line)&&(g.line=t.line);let $=new Map((this._config.lines??[]).map(w=>[w.statistic,w])),b=(Array.isArray(t.lines)?t.lines:[]).filter(Boolean).map(w=>$.get(w)??{statistic:w});b.length&&(g.lines=b)}this._config=g,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:g},bubbles:!0,composed:!0}))}render(){return!this.hass||!this._config?p``:p`<div class="editor">
      ${this._info===null?p`<p class="hint">${this._localize("editor_not_loaded")}</p>`:y}
      <ha-form
        .hass=${this.hass}
        .data=${this._data()}
        .schema=${this._schema()}
        .computeLabel=${this._label}
        .computeHelper=${this._helper}
        @value-changed=${this._changed}
      ></ha-form>
    </div>`}};Ee.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0}},Ee.styles=E`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .hint {
      margin: 0;
      color: var(--secondary-text-color);
    }
  `;var ws="https://github.com/ignazhabibi/ha-electricity-lens",Pt=(n,s)=>{if(!customElements.get(n))try{customElements.define(n,s)}catch{customElements.define(n,class extends s{})}};function $s(n,s=[]){let e=()=>{n.forEach(({tag:c,card:o,editor:l})=>{Pt(c,o),l&&Pt(l.tag,l.element)}),s.forEach(({type:c,element:o})=>Pt(`ll-strategy-dashboard-${c}`,o))};e();let t=window.customElements,i=Date.now(),r=window.setInterval(()=>{let c=window.customElements!==t;c&&e(),(c||Date.now()-i>6e4)&&window.clearInterval(r)},100),a=window;a.customStrategies=a.customStrategies??[];for(let{type:c,name:o,description:l}of s)a.customStrategies.some(d=>d.type===c)||a.customStrategies.push({type:c,strategyType:"dashboard",name:o,description:l,documentationURL:ws});a.customCards=a.customCards??[];for(let{tag:c,name:o,description:l}of n)a.customCards.some(d=>d.type===c)||a.customCards.push({type:c,name:o,description:l,preview:!0,documentationURL:ws})}var Dt="all",Be=class extends T{constructor(){super(...arguments);this._label=()=>this._localize("editor_area")}setConfig(e){this._config=e}get _localize(){return S(this.hass?.locale?.language??this.hass?.language??"en")}_changed(e){let{area:t,...i}=this._config??{},r=e.detail.value.area,a=r&&r!==Dt?{...i,area:r}:i;this._config=a,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:a},bubbles:!0,composed:!0}))}render(){if(!this.hass||!this._config)return p``;let e=this._localize,t=[{name:"area",selector:{select:{mode:"dropdown",options:[{value:Dt,label:e("editor_savings")},{value:"heat_pump",label:e("category.heat_pump")},{value:"wallbox",label:e("category.wallbox")}]}}}];return p`<ha-form
      .hass=${this.hass}
      .data=${{area:this._config.area??Dt}}
      .schema=${t}
      .computeLabel=${this._label}
      @value-changed=${this._changed}
    ></ha-form>`}};Be.properties={hass:{attribute:!1},_config:{state:!0}};var R=(n,s={})=>({type:n.startsWith("electricity-lens")?`custom:${n}`:n,...s}),Ss={grid_options:{columns:"full"}},Te={grid_options:{columns:6}},q={grid_options:{columns:12}},ks=(n,s,e={},t)=>R("electricity-lens-figures-card",{area:n,figure:s,...t?{name:t}:{},...Te,...e}),We=(n,s,e,t,i=!0)=>({title:n,path:s,type:"sections",max_columns:3,sections:[{type:"grid",column_span:2,cards:[...i?[R("energy-date-selection",Ss)]:[],...e.map(r=>({...Ss,...r}))]}],sidebar:{sections:[{type:"grid",cards:t}]}}),xi=70;function wi(n){let s=Object.values(n.entities??{}).filter(a=>a.platform===A),e=["pv","heat_pump","wallbox"],i=s.filter(a=>a.translation_key==="saving").map(a=>n.states[a.entity_id]?.attributes.category).filter(a=>e.includes(a)),r=["today","tomorrow"].flatMap(a=>{let c=s.find(o=>o.translation_key===`forecast_${a}`)?.entity_id;return c?[{day:a,entity:c}]:[]});return{categories:i,investments:ot(n),forecasts:r}}function $i(n,s,e={categories:[],investments:[],forecasts:[]}){let t=(b,w,z={})=>ks(b,w,z,s(`figure.${w}`)),i=(b,w,z,C={})=>ks(b,w,C,s(z)),r=(b,w,z={})=>R(b,{title:s(w),...z}),a=b=>n.areas.find(w=>w.id===b),c=a("solar"),o=a("heat_pump"),l=a("wallbox"),d=n.areas.some(b=>b.kind==="device"),u=!!(c?.statistics.saving?.length||o||l||e.categories.length),g={period:"today"},h={line:"price",...c?{line_name:s("strategy.price_with_solar")}:{}},_=(b,w={})=>c?i(b,"price","strategy.price_with_solar",w):t(b,"price",w),m={secondary:"none"},v=(b,w={})=>R("electricity-lens-history-card",{area:b,figure:"energy",stack:"source",...h,...w}),x=b=>R("electricity-lens-breakdown-card",{area:b,by:"source",...q}),f=e.investments.flatMap(({category:b,payback:w,annualReturn:z})=>[R("electricity-lens-figures-card",{area:ze(b),figure:"payback",name:s(`strategy.payback_${b}`),visibility:[{condition:"numeric_state",entity:w,below:100}],...Te}),R("electricity-lens-figures-card",{area:ze(b),figure:"annual_return",name:s(`strategy.return_${b}`),visibility:[{condition:"numeric_state",entity:z,above:-1}],...Te})]),$=c?.forecast?e.forecasts.map(({entity:b,day:w})=>R("gauge",{entity:b,name:s(`strategy.forecast_${w}`),min:0,max:xi,...Te})):[],k=[];return k.push(We(s("strategy.overview"),"now",[u?R("electricity-lens-balance-card"):v("household",g)],[...$,i("household","cost","strategy.cost_today",g),i("household","energy","strategy.consumption_today",g),...f],!1)),k.push(We(s("strategy.electricity"),"household",[r("energy-usage-graph","strategy.usage_graph"),...c?[r("energy-solar-graph","strategy.solar_graph")]:[],...d?[R("electricity-lens-history-card",{title:s("strategy.devices_graph"),area:"household",figure:"energy",stack:"consumer"})]:[]],[r("energy-distribution","strategy.distribution",q),x("household"),...c?[R("energy-self-sufficiency-gauge",Te),R("energy-solar-consumed-gauge",Te)]:[]])),k.push(We(s("strategy.costs"),"costs",[r("electricity-lens-history-card","strategy.bill",{area:"household",figure:"cost",stack:"bill",line:"grid_price"}),...c?[r("electricity-lens-history-card","strategy.cost_with_solar",{area:"household",figure:"cost",stack:"source",...h})]:[],r("electricity-lens-history-card","strategy.cost_history",{area:"household",figure:"cost",stack:"consumer",...c?{}:h})],[t("grid","grid_price",m),_("household",m),r("electricity-lens-breakdown-card","strategy.cost_distribution",{area:"household",by:"consumer",figure:"cost",display:"bars",color_by_source:!0,...q}),...u?[R("electricity-lens-savings-card",q)]:[]])),o&&k.push(We(s("strategy.heating"),"heating",[r("electricity-lens-history-card","figure.heat",{area:"heat_pump",figure:"heat",stack:"consumer",line:"scop",line_name:s("figure.scop")}),r("electricity-lens-history-card","strategy.usage_graph",{area:"heat_pump",figure:"energy",stack:"source"}),r("electricity-lens-history-card",c?"strategy.cost_with_solar":"figure.cost",{area:"heat_pump",figure:"cost",stack:"source",...h})],[t("heat_pump","scop",m),t("heat_pump","heat_price",m),x("heat_pump"),...ct(n).length?[R("electricity-lens-heat-meters-card",q)]:[...(o.statistics.energy?.length??0)>1?[R("electricity-lens-breakdown-card",{area:"heat_pump",by:"consumer",figure:"energy",display:"bars",color_by_source:!0,...q})]:[],...(o.statistics.heat_meters?.length??0)>1?[R("electricity-lens-breakdown-card",{title:s("figure.heat"),statistics:(o.statistics.heat_meters??[]).map(b=>({statistic:b})),display:"bars",...q})]:[]],R("electricity-lens-savings-card",{area:"heat_pump",...q})])),l&&k.push(We(s("strategy.charging"),"charging",[r("electricity-lens-history-card","strategy.charged_energy",{area:"wallbox",figure:"energy",stack:"source"}),r("electricity-lens-history-card","strategy.charging_cost",{area:"wallbox",figure:"cost",stack:"source",...h})],[t("wallbox","device_grid_price",m),_("wallbox",m),x("wallbox"),R("electricity-lens-savings-card",{area:"wallbox",...q})])),k}var Si=3e4,ki=1e3;async function Ci(n){let s=n.config.state!==void 0&&n.config.state!=="RUNNING",e=Date.now()+Si;for(;;)try{return await n.callWS({type:`${A}/figures`})}catch(t){if(!s||Date.now()>=e)throw t;await new Promise(i=>setTimeout(i,ki))}}var je=class extends HTMLElement{static async generate(s,e){let t=S(e.locale?.language??e.language??"en"),i;try{i=await Ci(e)}catch{return{title:t("strategy.title"),views:[{title:t("strategy.title"),cards:[{type:"markdown",content:t("strategy.not_loaded")}]}]}}return{title:t("strategy.title"),views:$i(i,t,wi(e))}}};je.noEditor=!0;$s([{tag:"electricity-lens-balance-card",card:ke,name:"Electricity Lens economics",description:"What your PV plant, heat pump, and electric car have saved, against what they cost."},{tag:"electricity-lens-savings-card",card:Ue,name:"Electricity Lens savings",description:"What solar power, the heat pump, and the electric car saved in the selected period, as a table, or one area's saving reckoned up. Follows the energy date selection.",editor:{tag:"electricity-lens-savings-card-editor",element:Be}},{tag:"electricity-lens-heat-meters-card",card:Ne,name:"Electricity Lens heat meters",description:"Heat, electricity, and seasonal COP of each of the heat pump's meters in the selected period. Follows the energy date selection."},{tag:"electricity-lens-history-card",card:Ce,name:"Electricity Lens history",description:"Savings, consumption, or costs per period as bars, stacked by source or consumer, with lines. Follows the energy date selection.",editor:{tag:"electricity-lens-history-card-editor",element:Ee}},{tag:"electricity-lens-figures-card",card:xe,name:"Electricity Lens key figures",description:"One key figure for a period: costs, solar share, cheap grid power, savings, or any statistic or entity.",editor:{tag:"electricity-lens-figures-card-editor",element:Re}},{tag:"electricity-lens-breakdown-card",card:$e,name:"Electricity Lens breakdown",description:"Shares for a period as a ring or bars: the electricity mix, consumption or costs by consumer, or any statistics.",editor:{tag:"electricity-lens-breakdown-card-editor",element:He}}],[{type:"electricity-lens",element:je,name:"Electricity Lens",description:"A finished electricity dashboard with costs, electricity mix, solar, heat pump, car, and the balance."}]);
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
