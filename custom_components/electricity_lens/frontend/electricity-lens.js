var Ge=globalThis,je=Ge.ShadowRoot&&(Ge.ShadyCSS===void 0||Ge.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ut=Symbol(),Pt=new WeakMap,Re=class{constructor(i,e,t){if(this._$cssResult$=!0,t!==ut)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=i,this.t=e}get styleSheet(){let i=this.o,e=this.t;if(je&&i===void 0){let t=e!==void 0&&e.length===1;t&&(i=Pt.get(e)),i===void 0&&((this.o=i=new CSSStyleSheet).replaceSync(this.cssText),t&&Pt.set(e,i))}return i}toString(){return this.cssText}},Ke=n=>new Re(typeof n=="string"?n:n+"",void 0,ut),R=(n,...i)=>{let e=n.length===1?n[0]:i.reduce((t,s,r)=>t+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+n[r+1],n[0]);return new Re(e,n,ut)},Mt=(n,i)=>{if(je)n.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of i){let t=document.createElement("style"),s=Ge.litNonce;s!==void 0&&t.setAttribute("nonce",s),t.textContent=e.cssText,n.appendChild(t)}},dt=je?n=>n:n=>n instanceof CSSStyleSheet?(i=>{let e="";for(let t of i.cssRules)e+=t.cssText;return Ke(e)})(n):n;var{is:xi,defineProperty:wi,getOwnPropertyDescriptor:$i,getOwnPropertyNames:Si,getOwnPropertySymbols:ki,getPrototypeOf:Ci}=Object,Ye=globalThis,Lt=Ye.trustedTypes,Ai=Lt?Lt.emptyScript:"",Ri=Ye.reactiveElementPolyfillSupport,Ee=(n,i)=>n,ht={toAttribute(n,i){switch(i){case Boolean:n=n?Ai:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,i){let e=n;switch(i){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},Dt=(n,i)=>!xi(n,i),It={attribute:!0,type:String,converter:ht,reflect:!1,useDefault:!1,hasChanged:Dt};Symbol.metadata??=Symbol("metadata"),Ye.litPropertyMetadata??=new WeakMap;var W=class extends HTMLElement{static addInitializer(i){this._$Ei(),(this.l??=[]).push(i)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(i,e=It){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(i)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(i,e),!e.noAccessor){let t=Symbol(),s=this.getPropertyDescriptor(i,t,e);s!==void 0&&wi(this.prototype,i,s)}}static getPropertyDescriptor(i,e,t){let{get:s,set:r}=$i(this.prototype,i)??{get(){return this[e]},set(a){this[e]=a}};return{get:s,set(a){let c=s?.call(this);r?.call(this,a),this.requestUpdate(i,c,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(i){return this.elementProperties.get(i)??It}static _$Ei(){if(this.hasOwnProperty(Ee("elementProperties")))return;let i=Ci(this);i.finalize(),i.l!==void 0&&(this.l=[...i.l]),this.elementProperties=new Map(i.elementProperties)}static finalize(){if(this.hasOwnProperty(Ee("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Ee("properties"))){let e=this.properties,t=[...Si(e),...ki(e)];for(let s of t)this.createProperty(s,e[s])}let i=this[Symbol.metadata];if(i!==null){let e=litPropertyMetadata.get(i);if(e!==void 0)for(let[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let s=this._$Eu(e,t);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(i){let e=[];if(Array.isArray(i)){let t=new Set(i.flat(1/0).reverse());for(let s of t)e.unshift(dt(s))}else i!==void 0&&e.push(dt(i));return e}static _$Eu(i,e){let t=e.attribute;return t===!1?void 0:typeof t=="string"?t:typeof i=="string"?i.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(i=>this.enableUpdating=i),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(i=>i(this))}addController(i){(this._$EO??=new Set).add(i),this.renderRoot!==void 0&&this.isConnected&&i.hostConnected?.()}removeController(i){this._$EO?.delete(i)}_$E_(){let i=new Map,e=this.constructor.elementProperties;for(let t of e.keys())this.hasOwnProperty(t)&&(i.set(t,this[t]),delete this[t]);i.size>0&&(this._$Ep=i)}createRenderRoot(){let i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Mt(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(i=>i.hostConnected?.())}enableUpdating(i){}disconnectedCallback(){this._$EO?.forEach(i=>i.hostDisconnected?.())}attributeChangedCallback(i,e,t){this._$AK(i,t)}_$ET(i,e){let t=this.constructor.elementProperties.get(i),s=this.constructor._$Eu(i,t);if(s!==void 0&&t.reflect===!0){let r=(t.converter?.toAttribute!==void 0?t.converter:ht).toAttribute(e,t.type);this._$Em=i,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(i,e){let t=this.constructor,s=t._$Eh.get(i);if(s!==void 0&&this._$Em!==s){let r=t.getPropertyOptions(s),a=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:ht;this._$Em=s;let c=a.fromAttribute(e,r.type);this[s]=c??this._$Ej?.get(s)??c,this._$Em=null}}requestUpdate(i,e,t,s=!1,r){if(i!==void 0){let a=this.constructor;if(s===!1&&(r=this[i]),t??=a.getPropertyOptions(i),!((t.hasChanged??Dt)(r,e)||t.useDefault&&t.reflect&&r===this._$Ej?.get(i)&&!this.hasAttribute(a._$Eu(i,t))))return;this.C(i,e,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(i,e,{useDefault:t,reflect:s,wrapped:r},a){t&&!(this._$Ej??=new Map).has(i)&&(this._$Ej.set(i,a??e??this[i]),r!==!0||a!==void 0)||(this._$AL.has(i)||(this.hasUpdated||t||(e=void 0),this._$AL.set(i,e)),s===!0&&this._$Em!==i&&(this._$Eq??=new Set).add(i))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let i=this.scheduleUpdate();return i!=null&&await i,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,r]of this._$Ep)this[s]=r;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[s,r]of t){let{wrapped:a}=r,c=this[s];a!==!0||this._$AL.has(s)||c===void 0||this.C(s,void 0,r,c)}}let i=!1,e=this._$AL;try{i=this.shouldUpdate(e),i?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(t){throw i=!1,this._$EM(),t}i&&this._$AE(e)}willUpdate(i){}_$AE(i){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(i)),this.updated(i)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(i){return!0}update(i){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(i){}firstUpdated(i){}};W.elementStyles=[],W.shadowRootOptions={mode:"open"},W[Ee("elementProperties")]=new Map,W[Ee("finalized")]=new Map,Ri?.({ReactiveElement:W}),(Ye.reactiveElementVersions??=[]).push("2.1.2");var pt=globalThis,zt=n=>n,Je=pt.trustedTypes,Ot=Je?Je.createPolicy("lit-html",{createHTML:n=>n}):void 0,mt="$lit$",G=`lit$${Math.random().toFixed(9).slice(2)}$`,ft="?"+G,Ei=`<${ft}>`,re=document,Fe=()=>re.createComment(""),Pe=n=>n===null||typeof n!="object"&&typeof n!="function",_t=Array.isArray,Wt=n=>_t(n)||typeof n?.[Symbol.iterator]=="function",gt=`[ 	
\f\r]`,Te=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ht=/-->/g,Nt=/>/g,ie=RegExp(`>|${gt}(?:([^\\s"'>=/]+)(${gt}*=${gt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ut=/'/g,Vt=/"/g,Gt=/^(?:script|style|textarea|title)$/i,yt=n=>(i,...e)=>({_$litType$:n,strings:i,values:e}),p=yt(1),ks=yt(2),Cs=yt(3),ne=Symbol.for("lit-noChange"),_=Symbol.for("lit-nothing"),Bt=new WeakMap,se=re.createTreeWalker(re,129);function jt(n,i){if(!_t(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ot!==void 0?Ot.createHTML(i):i}var Kt=(n,i)=>{let e=n.length-1,t=[],s,r=i===2?"<svg>":i===3?"<math>":"",a=Te;for(let c=0;c<e;c++){let o=n[c],l,u,d=-1,h=0;for(;h<o.length&&(a.lastIndex=h,u=a.exec(o),u!==null);)h=a.lastIndex,a===Te?u[1]==="!--"?a=Ht:u[1]!==void 0?a=Nt:u[2]!==void 0?(Gt.test(u[2])&&(s=RegExp("</"+u[2],"g")),a=ie):u[3]!==void 0&&(a=ie):a===ie?u[0]===">"?(a=s??Te,d=-1):u[1]===void 0?d=-2:(d=a.lastIndex-u[2].length,l=u[1],a=u[3]===void 0?ie:u[3]==='"'?Vt:Ut):a===Vt||a===Ut?a=ie:a===Ht||a===Nt?a=Te:(a=ie,s=void 0);let g=a===ie&&n[c+1].startsWith("/>")?" ":"";r+=a===Te?o+Ei:d>=0?(t.push(l),o.slice(0,d)+mt+o.slice(d)+G+g):o+G+(d===-2?c:g)}return[jt(n,r+(n[e]||"<?>")+(i===2?"</svg>":i===3?"</math>":"")),t]},Me=class n{constructor({strings:i,_$litType$:e},t){let s;this.parts=[];let r=0,a=0,c=i.length-1,o=this.parts,[l,u]=Kt(i,e);if(this.el=n.createElement(l,t),se.currentNode=this.el.content,e===2||e===3){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(s=se.nextNode())!==null&&o.length<c;){if(s.nodeType===1){if(s.hasAttributes())for(let d of s.getAttributeNames())if(d.endsWith(mt)){let h=u[a++],g=s.getAttribute(d).split(G),m=/([.?@])?(.*)/.exec(h);o.push({type:1,index:r,name:m[2],strings:g,ctor:m[1]==="."?qe:m[1]==="?"?Qe:m[1]==="@"?Xe:oe}),s.removeAttribute(d)}else d.startsWith(G)&&(o.push({type:6,index:r}),s.removeAttribute(d));if(Gt.test(s.tagName)){let d=s.textContent.split(G),h=d.length-1;if(h>0){s.textContent=Je?Je.emptyScript:"";for(let g=0;g<h;g++)s.append(d[g],Fe()),se.nextNode(),o.push({type:2,index:++r});s.append(d[h],Fe())}}}else if(s.nodeType===8)if(s.data===ft)o.push({type:2,index:r});else{let d=-1;for(;(d=s.data.indexOf(G,d+1))!==-1;)o.push({type:7,index:r}),d+=G.length-1}r++}}static createElement(i,e){let t=re.createElement("template");return t.innerHTML=i,t}};function ae(n,i,e=n,t){if(i===ne)return i;let s=t!==void 0?e._$Co?.[t]:e._$Cl,r=Pe(i)?void 0:i._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),r===void 0?s=void 0:(s=new r(n),s._$AT(n,e,t)),t!==void 0?(e._$Co??=[])[t]=s:e._$Cl=s),s!==void 0&&(i=ae(n,s._$AS(n,i.values),s,t)),i}var Ze=class{constructor(i,e){this._$AV=[],this._$AN=void 0,this._$AD=i,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(i){let{el:{content:e},parts:t}=this._$AD,s=(i?.creationScope??re).importNode(e,!0);se.currentNode=s;let r=se.nextNode(),a=0,c=0,o=t[0];for(;o!==void 0;){if(a===o.index){let l;o.type===2?l=new ge(r,r.nextSibling,this,i):o.type===1?l=new o.ctor(r,o.name,o.strings,this,i):o.type===6&&(l=new et(r,this,i)),this._$AV.push(l),o=t[++c]}a!==o?.index&&(r=se.nextNode(),a++)}return se.currentNode=re,s}p(i){let e=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(i,t,e),e+=t.strings.length-2):t._$AI(i[e])),e++}},ge=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(i,e,t,s){this.type=2,this._$AH=_,this._$AN=void 0,this._$AA=i,this._$AB=e,this._$AM=t,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let i=this._$AA.parentNode,e=this._$AM;return e!==void 0&&i?.nodeType===11&&(i=e.parentNode),i}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(i,e=this){i=ae(this,i,e),Pe(i)?i===_||i==null||i===""?(this._$AH!==_&&this._$AR(),this._$AH=_):i!==this._$AH&&i!==ne&&this._(i):i._$litType$!==void 0?this.$(i):i.nodeType!==void 0?this.T(i):Wt(i)?this.k(i):this._(i)}O(i){return this._$AA.parentNode.insertBefore(i,this._$AB)}T(i){this._$AH!==i&&(this._$AR(),this._$AH=this.O(i))}_(i){this._$AH!==_&&Pe(this._$AH)?this._$AA.nextSibling.data=i:this.T(re.createTextNode(i)),this._$AH=i}$(i){let{values:e,_$litType$:t}=i,s=typeof t=="number"?this._$AC(i):(t.el===void 0&&(t.el=Me.createElement(jt(t.h,t.h[0]),this.options)),t);if(this._$AH?._$AD===s)this._$AH.p(e);else{let r=new Ze(s,this),a=r.u(this.options);r.p(e),this.T(a),this._$AH=r}}_$AC(i){let e=Bt.get(i.strings);return e===void 0&&Bt.set(i.strings,e=new Me(i)),e}k(i){_t(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,t,s=0;for(let r of i)s===e.length?e.push(t=new n(this.O(Fe()),this.O(Fe()),this,this.options)):t=e[s],t._$AI(r),s++;s<e.length&&(this._$AR(t&&t._$AB.nextSibling,s),e.length=s)}_$AR(i=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);i!==this._$AB;){let t=zt(i).nextSibling;zt(i).remove(),i=t}}setConnected(i){this._$AM===void 0&&(this._$Cv=i,this._$AP?.(i))}},oe=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(i,e,t,s,r){this.type=1,this._$AH=_,this._$AN=void 0,this.element=i,this.name=e,this._$AM=s,this.options=r,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=_}_$AI(i,e=this,t,s){let r=this.strings,a=!1;if(r===void 0)i=ae(this,i,e,0),a=!Pe(i)||i!==this._$AH&&i!==ne,a&&(this._$AH=i);else{let c=i,o,l;for(i=r[0],o=0;o<r.length-1;o++)l=ae(this,c[t+o],e,o),l===ne&&(l=this._$AH[o]),a||=!Pe(l)||l!==this._$AH[o],l===_?i=_:i!==_&&(i+=(l??"")+r[o+1]),this._$AH[o]=l}a&&!s&&this.j(i)}j(i){i===_?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,i??"")}},qe=class extends oe{constructor(){super(...arguments),this.type=3}j(i){this.element[this.name]=i===_?void 0:i}},Qe=class extends oe{constructor(){super(...arguments),this.type=4}j(i){this.element.toggleAttribute(this.name,!!i&&i!==_)}},Xe=class extends oe{constructor(i,e,t,s,r){super(i,e,t,s,r),this.type=5}_$AI(i,e=this){if((i=ae(this,i,e,0)??_)===ne)return;let t=this._$AH,s=i===_&&t!==_||i.capture!==t.capture||i.once!==t.once||i.passive!==t.passive,r=i!==_&&(t===_||s);s&&this.element.removeEventListener(this.name,this,t),r&&this.element.addEventListener(this.name,this,i),this._$AH=i}handleEvent(i){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,i):this._$AH.handleEvent(i)}},et=class{constructor(i,e,t){this.element=i,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(i){ae(this,i)}},Yt={M:mt,P:G,A:ft,C:1,L:Kt,R:Ze,D:Wt,V:ae,I:ge,H:oe,N:Qe,U:Xe,B:qe,F:et},Ti=pt.litHtmlPolyfillSupport;Ti?.(Me,ge),(pt.litHtmlVersions??=[]).push("3.3.3");var Jt=(n,i,e)=>{let t=e?.renderBefore??i,s=t._$litPart$;if(s===void 0){let r=e?.renderBefore??null;t._$litPart$=s=new ge(i.insertBefore(Fe(),r),r,void 0,e??{})}return s._$AI(n),s};var vt=globalThis,A=class extends W{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let i=super.createRenderRoot();return this.renderOptions.renderBefore??=i.firstChild,i}update(i){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(i),this._$Do=Jt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return ne}};A._$litElement$=!0,A.finalized=!0,vt.litElementHydrateSupport?.({LitElement:A});var Fi=vt.litElementPolyfillSupport;Fi?.({LitElement:A});(vt.litElementVersions??=[]).push("4.2.2");var Zt=n=>(...i)=>({_$litDirective$:n,values:i}),tt=class{constructor(i){}get _$AU(){return this._$AM._$AU}_$AT(i,e,t){this._$Ct=i,this._$AM=e,this._$Ci=t}_$AS(i,e){return this.update(i,e)}update(i,e){return this.render(...e)}};var{I:Us}=Yt;var Pi={},qt=(n,i=Pi)=>n._$AH=i;var Qt=Zt(class extends tt{constructor(){super(...arguments),this.key=_}render(n,i){return this.key=n,i}update(n,[i,e]){return i!==this.key&&(qt(n),this.key=i),e}});var Xt;function Mi(){if(customElements.get("ha-chart-base"))return Promise.resolve(!0);let n=window.loadCardHelpers;return n?(Xt??=(async()=>{try{(await n()).createCardElement({type:"statistics-graph",entities:[]})}catch{}let i=new Promise(e=>setTimeout(()=>e(!1),1e4));return Promise.race([customElements.whenDefined("ha-chart-base").then(()=>!0),i])})(),Xt):Promise.resolve(!1)}function it(n){Mi().then(n),customElements.whenDefined("ha-chart-base").then(()=>n(!0))}var ei=n=>Math.round(n*255).toString(16).padStart(2,"0");function bt(n,i){let e=n.trim();if(/^#[0-9a-f]{6}$/i.test(e))return e+ei(i);if(/^#[0-9a-f]{3}$/i.test(e))return`#${[...e.slice(1)].map(s=>s+s).join("")}${ei(i)}`;let t=e.match(/^rgba?\(([^)]+)\)/i);if(t){let[s,r,a]=t[1].split(/[ ,/]+/).filter(Boolean);return`rgba(${s}, ${r}, ${a}, ${i})`}return e}var Le=n=>n.replace(/[&<>"']/g,i=>`&#${i.charCodeAt(0)};`),xt=n=>`<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${n}"></span>`;function ti(n){if(n<=0)return 1;let i=10**Math.floor(Math.log10(n)),e=n/i;return([1,2,2.5,5,10].find(s=>e<=s*(1+1e-9))??10)*i}var pe=n=>Number(n.toFixed(10));function Li(n,i){if(n.min>=0&&i.min>=0)return;let e=ti((n.max-n.min)/6),t=Math.max(Math.ceil(pe(n.max/e)),i.max>0?1:0),s=Math.max(Math.ceil(pe(-n.min/e)),i.min<0?1:0),r=ti(Math.max(t?i.max/t:0,s?-i.min/s:0));return{bar:{min:pe(-s*e),max:pe(t*e),interval:e},line:{min:pe(-s*r),max:pe(t*r),interval:r}}}function ii(n){let i=n.lines??[],e=n.series.map((u,d)=>({id:u.id,type:"bar",name:u.name,stack:"savings",cursor:"default",barMaxWidth:50,color:bt(u.color,.5),itemStyle:{borderColor:u.color},data:u.values.map((h,g)=>{let m=n.series.slice(d+1).every(f=>Math.sign(f.values[g]??0)!==Math.sign(h??0));return{value:h,itemStyle:h?m?{borderRadius:h>0?[4,4,0,0]:[0,0,4,4]}:void 0:{borderWidth:0}}})})),t=i.map(u=>({id:u.id,type:"line",name:u.name,yAxisIndex:1,color:u.color,symbol:"none",showSymbol:!1,step:u.step?"middle":!1,lineStyle:{width:1.5,type:u.dash??"dashed",color:u.color},z:1,connectNulls:!0,data:u.values})),s=[...e,...t],r=new Map(i.map(u=>[u.name,u.format])),a=u=>{let d=Array.isArray(u)?u:[u],h=document.createElement("div");if(!d.length)return h;let g=v=>r.has(v.seriesName??""),m=d.filter(v=>v.value&&!g(v)),f=d.filter(v=>g(v)&&v.value!==null&&v.value!==void 0),y=m.map(v=>`${xt(String(v.color??""))}${Le(v.seriesName??"")}: ${n.format(v.value??0)}`),b=f.map(v=>`${xt(String(v.color??""))}${Le(v.seriesName??"")}: ${r.get(v.seriesName??"")?.(v.value??0)??""}`),C=new Set(n.series.filter(v=>v.inTotal===!1).map(v=>v.name)),ee=m.filter(v=>!C.has(v.seriesName??"")).reduce((v,x)=>v+(x.value??0),0);return h.innerHTML=`<b>${Le(n.labels[d[0].dataIndex]?.tooltip??"")}</b>`+(y.length?`<br>${y.join("<br>")}`:"")+(m.length>1?`<br><b>${Le(n.total)}: ${n.format(ee)}</b>`:"")+(b.length?`<br>${b.join("<br>")}`:""),h},c={type:"value",name:n.unit,nameGap:2,nameTextStyle:{align:"left"},axisLabel:{formatter:n.tick},splitLine:{show:!0}},o={type:"value",name:n.lineUnit??"",nameGap:2,nameTextStyle:{align:"right"},axisLabel:{formatter:n.lineTick??n.tick},splitLine:{show:!1}};if(i.length){let u=n.labels.map((m,f)=>{let y=n.series.map(b=>b.values[f]??0);return{up:y.filter(b=>b>0).reduce((b,C)=>b+C,0),down:y.filter(b=>b<0).reduce((b,C)=>b+C,0)}}),d=i.flatMap(m=>m.values.filter(f=>f!==null)),h=Math.min(0,...d),g=Li({min:Math.min(0,...u.map(m=>m.down)),max:Math.max(0,...u.map(m=>m.up))},{min:h,max:Math.max(0,...d)});if(g){Object.assign(c,g.bar),Object.assign(o,g.line);let m=n.lineTick??n.tick;h>=0&&(o.axisLabel={formatter:f=>f<0?"":m(f)})}}let l={xAxis:{type:"category",data:n.labels.map(u=>u.axis),axisTick:{show:!1}},yAxis:i.length?[c,o]:c,grid:{top:15,bottom:0,left:1,right:1,containLabel:!0},legend:{show:!0,type:"custom",data:[...n.series,...i].map(u=>({id:u.id,name:u.name}))},tooltip:{trigger:"axis",axisPointer:{type:"shadow"},formatter:a}};return{data:s,options:l}}function wt(n){let i=n.reduce((e,t)=>e+Math.max(0,t),0);return n.map(e=>i>0?Math.max(0,e)/i*100:0)}function si(n){let i=n.items.map(l=>n.hidden.has(l.id)?0:l.value),e=wt(i),t=i.reduce((l,u)=>l+Math.max(0,u),0),s=[],r=-Math.PI/2;for(let l of e){let u=r+l/100*2*Math.PI;s.push([r,u]),r=u}let a=l=>{let u=Math.min(90,l.getWidth()/2-8,l.getHeight()/2-8);return{cx:l.getWidth()/2,cy:l.getHeight()/2,r:u,r0:u*40/70}},c=n.items.map((l,u)=>({id:l.id,type:"custom",name:l.name,coordinateSystem:"none",cursor:"default",color:bt(l.color,.5),data:[[i[u],s[u][0],s[u][1],e[u]]],renderItem:(d,h)=>{let g=h.value(1),m=h.value(2);if(!(m-g>0))return null;let f=a(h),y=[{type:"sector",shape:{...f,startAngle:g,endAngle:m,cornerRadius:4},style:{fill:bt(l.color,.5),stroke:l.color,lineWidth:1}}];if(m-g>=15*Math.PI/180){let b=(g+m)/2,C=Math.cos(b)>=0,ee=[f.cx+Math.cos(b)*f.r,f.cy+Math.sin(b)*f.r],v=[f.cx+Math.cos(b)*(f.r+10),f.cy+Math.sin(b)*(f.r+10)],x=[v[0]+(C?10:-10),v[1]];y.push({type:"polyline",silent:!0,shape:{points:[ee,v,x]},style:{stroke:l.color,fill:"none"}},{type:"text",silent:!0,x:x[0]+(C?4:-4),y:x[1],style:{text:`${l.name}
${n.percent(h.value(3))}`,fill:n.labelColor,fontSize:12,lineHeight:16,align:C?"left":"right",verticalAlign:"middle"}})}return{type:"group",children:y}}}));return c.push({id:"total",type:"custom",coordinateSystem:"none",silent:!0,tooltip:{show:!1},data:[[t]],renderItem:(l,u)=>{let d=a(u);return{type:"text",x:d.cx,y:d.cy,style:{text:`${n.total}
${n.format(u.value(0))}`,fill:n.centerColor,fontSize:14,lineHeight:24,fontWeight:"bold",align:"center",verticalAlign:"middle"}}}}),{data:c,options:{xAxis:{show:!1},yAxis:{show:!1},legend:{show:!1},tooltip:{show:!0,trigger:"item",formatter:l=>{let u=n.items.findIndex(g=>g.id===l.seriesId);if(u<0)return"";let d=n.items[u],h=document.createElement("div");return h.innerHTML=`<b>${Le(d.name)}</b><br>${xt(d.color)}${n.format(l.value?.[0]??i[u])} (${n.percent(l.value?.[3]??e[u])})`,h}}}}}var ce={solar:"var(--energy-solar-color, #ff9800)",grid:"var(--energy-grid-consumption-color, #488fc2)",cheap:"color-mix(in srgb, var(--energy-grid-consumption-color, #488fc2) 55%, #fff)",expensive:"color-mix(in srgb, var(--energy-grid-consumption-color, #488fc2) 70%, #000)",export:"var(--energy-grid-return-color, #8353d1)",heat:"var(--graph-color-30, var(--color-30, #bf3947))",car:"var(--energy-non-fossil-color, #0f9d58)"},ri=["#4269d0","#f4bd4a","#ff725c","#6cc5b0","#a463f2","#ff8ab7","#9c6b4e","#97bbf5","#01ab63","#094bad","#c99000","#d84f3e"];function Ii(n){let i=n.trim(),e=/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(i)?.[1];if(e){let s=e.length===3?[...e].map(r=>r+r).join(""):e;return[0,2,4].map(r=>parseInt(s.slice(r,r+2),16))}let t=/^rgba?\(([^)]+)\)/i.exec(i)?.[1];if(t){let[s,r,a]=t.split(/[ ,/]+/).filter(Boolean).map(Number);if([s,r,a].every(Number.isFinite))return[s,r,a]}}var Di=([n,i,e])=>`#${[n,i,e].map(t=>Math.round(Math.min(Math.max(t,0),255)).toString(16).padStart(2,"0")).join("")}`;function ni(n,i,e){let t=Ii(n);if(!t)return n;let s=i==="white"?255:0;return Di(t.map(r=>r*e+s*(1-e)))}function E(n){let i=getComputedStyle(n),e=(r,a)=>i.getPropertyValue(r).trim()||a,t=e("--energy-grid-consumption-color","#488fc2"),s=Array.from({length:54},(r,a)=>{let c=a+1;return i.getPropertyValue(`--graph-color-${c}`).trim()||i.getPropertyValue(`--color-${c}`).trim()||ri[a%ri.length]});return{solar:e("--energy-solar-color","#ff9800"),grid:t,cheap:ni(t,"white",.55),expensive:ni(t,"black",.7),export:e("--energy-grid-return-color","#8353d1"),standing:e("--electricity-lens-standing-charge-color","#a1887f"),heat:i.getPropertyValue("--graph-color-30").trim()||e("--color-30","#bf3947"),car:e("--energy-non-fossil-color","#0f9d58"),other:i.getPropertyValue("--history-unknown-color").trim()||e("--disabled-color","#bdbdbd"),line:e("--secondary-text-color","#727272"),consumers:s}}function T(n,i){let e=new Map,t=new Map,s=0;for(let r of n.areas)if(r.kind==="other")e.set(r.id,i.other);else if(r.kind==="device"){let a=i.consumers[s++%i.consumers.length];e.set(r.id,a);let c=r.statistics.energy?.[0];c&&t.set(c,a)}for(let r of n.areas)if(r.kind==="category")if(r.id==="heat_pump")e.set(r.id,i.heat);else{let c=(r.statistics.energy??[]).map(l=>t.get(l)).filter(Boolean),o=r.id==="wallbox"?i.car:i.grid;e.set(r.id,c[c.length-1]??o)}return e}var zi=n=>!!n&&typeof n.subscribe=="function";function H(n){if(n!==void 0&&!n.startsWith("energy_"))throw new Error("Collection keys must start with energy_.")}function Oi(n,i){let e=location.pathname.split("/")[1]??"",t=n;for(let s of i?[`_${i}`]:[`_energy_${e}`,"_energy"])if(zi(t[s]))return t[s]}var Hi=()=>new Date().setHours(24,0,0,0)-1;function Y(n,i,e){let t,s,r=0,a=()=>{let c=Oi(n,i);if(c){t=c.subscribe(o=>e({start:new Date(o.start).getTime(),end:o.end?new Date(o.end).getTime():Hi()}));return}r+=1,r===2&&e(null),r<20&&(s=window.setTimeout(a,500))};return a(),()=>{window.clearTimeout(s),t?.()}}var Ni={comma_decimal:"en-US",decimal_comma:"de",space_comma:"fr",quote_decimal:"de-CH"};function D(n,i){let e=n?.number_format,t=e==="system"?void 0:Ni[e??""]??n?.language??"en";return new Intl.NumberFormat(t,{...i,...e==="none"?{useGrouping:!1}:{}})}function ai(n){switch(n?.time_format){case"am_pm":return!0;case"24":return!1;case"system":return new Intl.DateTimeFormat(void 0,{hour:"numeric"}).resolvedOptions().hour12;default:return}}function oi(n){let i=/^([-−+]?[\d.,'’\u00a0\u202f ]*\d)[\u00a0\u202f ](.+)$/.exec(n);return i?[i[1],i[2]]:[n,""]}function J(n,i){let e=(r,a)=>{let c=Math.abs(r),o=a??(c<10?2:c<100?1:0);return D(n,{maximumFractionDigits:o,minimumFractionDigits:a??0}).format(r)};return{number:e,value:(r,a)=>{switch(a){case"energy":return`${e(r,Math.abs(r)<100?1:0)} kWh`;case"money":{let c=Math.abs(r)<100;return D(n,{style:"currency",currency:i,maximumFractionDigits:c?2:0,minimumFractionDigits:c?2:0}).format(r)}case"price":return i==="EUR"?`${e(r*100,1)} ct/kWh`:`${D(n,{style:"currency",currency:i,maximumFractionDigits:3}).format(r)}/kWh`;case"percent":return D(n,{style:"percent",maximumFractionDigits:0}).format(r/100);case"number":return e(r,Math.abs(r)<10?2:Math.abs(r)<100?1:0);case"distance":return`${e(r,Math.abs(r)<100?1:0)} km`;case"per_100km":return`${D(n,{style:"currency",currency:i,maximumFractionDigits:2,minimumFractionDigits:2}).format(r)}/100 km`}},currencySymbol:()=>D(n,{style:"currency",currency:i}).formatToParts(0).find(r=>r.type==="currency")?.value??""}}var $t={energy:["energy"],cost:["cost"],bill:["import_cost","standing_charge"],grid_price:["import_cost","energy"],device_grid_price:["cost","solar_cost","energy","solar"],price:["cost","energy","solar"],solar_share:["solar","energy"],cheap_share:["cheap","solar","energy"],expensive_share:["expensive","solar","energy"],cheap_saving:["cheap_saving"],self_consumption:["self_used","energy"],export:["export"],saving:["saving"],heat:["heat"],alternative_cost:["alternative_cost"],scop:["heat","energy"],heat_price:["cost","heat"],distance:["distance"],cost_per_100km:["cost","distance"],forecast_today:[],forecast_tomorrow:[],payback:[],annual_return:[]},Ui={energy:["solar","export"],cost:["energy","solar","feed_in","standing_charge"],saving:["solar_saving"],heat:["energy"],distance:["energy"]},Vi=Object.keys($t),le=n=>n==="forecast_today"||n==="forecast_tomorrow",ue=n=>n==="payback"||n==="annual_return";function Z(n){return Vi.filter(i=>le(i)?n.forecast===!0:ue(i)?n.investment===!0:$t[i].every(e=>n.statistics[e]?.length))}function ci(n,i){return[...$t[i],...Ui[i]??[]].flatMap(e=>n.statistics[e]??[])}var st=(n,i)=>i>0?n/i*100:null;function me(n,i,e,t){let s=e("energy"),r=e("solar"),a=o=>({value:o,unit:"energy"}),c=o=>({value:o,unit:"money"});switch(n){case"energy":{if(s!==null&&r!==null&&s>0){if(i.kind==="household")return{value:s,unit:"energy",line:{key:"line_energy_parts",values:{grid:a(Math.max(s-r,0)),solar:a(r)}}};let l=st(r,s)??0;return{value:s,unit:"energy",line:{key:"line_solar_part",values:{percent:{value:l,unit:"percent"}}}}}let o=e("export");return i.kind==="grid"&&o!==null?{value:s,unit:"energy",line:{key:"line_exported",values:{energy:a(o)}}}:{value:s,unit:"energy"}}case"cost":{let o=e("cost");if(o!==null&&s&&r!==null)return{value:o,unit:"money",line:{key:"line_average_price",values:{price:{value:o/s,unit:"price"}}}};let l=e("feed_in"),u=e("standing_charge");return o!==null&&l!==null&&u!==null?{value:o,unit:"money",line:{key:Math.abs(u)<.005?"line_bill_no_charge":"line_bill",values:{feed_in:c(l),charge:c(u)}}}:o!==null&&s!==null&&i.kind==="grid"?{value:o,unit:"money",line:{key:"line_for_import",values:{energy:a(s)}}}:{value:o,unit:"money"}}case"bill":{let o=e("import_cost"),l=e("standing_charge");return o===null||l===null?{value:null,unit:"money"}:{value:o+l,unit:"money",line:Math.abs(l)<.005?void 0:{key:"line_bill",values:{charge:c(l)}}}}case"grid_price":{let o=e("import_cost");return o===null||!s?{value:null,unit:"price"}:{value:o/s,unit:"price",line:{key:"line_cost_for",values:{cost:c(o),energy:a(s)}}}}case"device_grid_price":{let o=e("cost"),l=e("solar_cost");if(o===null||l===null||s===null||r===null)return{value:null,unit:"price"};let u=s-r;if(u<=0)return{value:null,unit:"price"};let d=o-l;return{value:d/u,unit:"price",line:{key:"line_cost_for",values:{cost:c(d),energy:a(u)}}}}case"cheap_saving":return{value:e("cheap_saving"),unit:"money",line:{key:"line_against_normal",values:{}}};case"price":{let o=e("cost");return o===null||!s?{value:null,unit:"price"}:{value:o/s,unit:"price",line:{key:"line_cost_for",values:{cost:{value:o,unit:"money"},energy:a(s)}}}}case"solar_share":return s===null||r===null?{value:null,unit:"percent"}:{value:st(r,s),unit:"percent",line:{key:"line_part_of",values:{part:a(r),whole:a(s)}}};case"cheap_share":case"expensive_share":{let o=e(n==="cheap_share"?"cheap":"expensive");if(s===null||r===null||o===null)return{value:null,unit:"percent"};let l=Math.max(s-r,0);return{value:st(o,l),unit:"percent",line:{key:"line_part_of",values:{part:a(o),whole:a(l)}}}}case"self_consumption":{let o=e("self_used");return s===null||o===null?{value:null,unit:"percent"}:{value:st(o,s),unit:"percent",line:{key:"line_part_of",values:{part:a(o),whole:a(s)}}}}case"export":return{value:e("export"),unit:"energy"};case"saving":{let o=e("saving"),l=e("solar_saving");return o===null||l===null?{value:o,unit:"money"}:{value:o+l,unit:"money",line:Math.abs(l)<.005?void 0:{key:"line_saving_split",values:{solar:c(l)}}}}case"heat":{let o=e("heat");return o===null||s===null?{value:o,unit:"energy"}:{value:o,unit:"energy",line:{key:"line_from_electricity",values:{energy:a(s)}}}}case"alternative_cost":return{value:e("alternative_cost"),unit:"money"};case"scop":{let o=e("heat");return o===null||!s?{value:null,unit:"number"}:{value:o/s,unit:"number",line:{key:"line_heat_from",values:{heat:a(o),energy:a(s)}}}}case"heat_price":{let o=e("heat"),l=e("cost");return o===null||l===null||!o?{value:null,unit:"price"}:{value:l/o,unit:"price",line:{key:"line_cost_for",values:{cost:{value:l,unit:"money"},energy:a(o)}}}}case"distance":{let o=e("distance");return o===null||s===null?{value:o,unit:"distance"}:{value:o,unit:"distance",line:{key:"line_charged",values:{energy:a(s)}}}}case"cost_per_100km":{let o=e("distance"),l=e("cost");return o===null||l===null||!o?{value:null,unit:"per_100km"}:{value:l/o*100,unit:"per_100km",line:{key:"line_cost_for",values:{cost:{value:l,unit:"money"},energy:{value:o,unit:"distance"}}}}}case"forecast_today":case"forecast_tomorrow":return{value:t,unit:"energy"};case"payback":case"annual_return":return{value:null,unit:"percent"}}}var li=["change","mean","min","max"],N=n=>n.statistic!==void 0?"statistic":n.entity!==void 0?"entity":"energy";function q({start:n,end:i}){let e=i-n;return e<=2*864e5+36e5?"hour":e<=95*864e5?"day":e<=3*366*864e5?"month":"year"}var fe=n=>n==="year"?"month":n,Bi=(n,i)=>{let e=new Date(n);return i==="hour"?e.setMinutes(0,0,0):(e.setHours(0,0,0,0),i==="day"||(e.setDate(1),i==="month")?e.getTime():e.setMonth(0))},Wi=(n,i)=>{let e=new Date(n);return i==="hour"?e.setHours(e.getHours()+1):i==="day"?e.setDate(e.getDate()+1):i==="month"?e.setMonth(e.getMonth()+1):e.setFullYear(e.getFullYear()+1),e.getTime()};function ui({start:n,end:i},e){let t=[];for(let s=Bi(n,e);s<=i&&t.length<400;s=Wi(s,e))t.push(s);return t}function di(n,i=new Date){let e=n.filter(s=>s!==null).map(s=>s.getFullYear()),t=Math.min(i.getFullYear(),...e);return{start:new Date(t,0,1).getTime(),end:new Date(i.getFullYear()+1,0,1).getTime()-1}}function St(n,i,e){let t=i.map(()=>null),s=e==="hour"?0:12*36e5;for(let r of n??[]){if(r.change===null||r.change===void 0)continue;let a=(typeof r.start=="number"?r.start:Date.parse(r.start))+s,c=-1;for(let o=0;o<i.length&&i[o]<=a;o+=1)c=o;c<0||(t[c]=(t[c]??0)+r.change)}return t}function F(n,i=new Date){let e=(a,c)=>({start:a.getTime(),end:c.getTime()-1}),t=i.getFullYear(),s=i.getMonth(),r=i.getDate();switch(n){case"today":return e(new Date(t,s,r),new Date(t,s,r+1));case"yesterday":return e(new Date(t,s,r-1),new Date(t,s,r));case"this_month":return e(new Date(t,s,1),new Date(t,s+1,1));case"last_month":return e(new Date(t,s-1,1),new Date(t,s,1));case"this_year":return e(new Date(t,0,1),new Date(t+1,0,1));case"last_year":return e(new Date(t-1,0,1),new Date(t,0,1))}}function rt({start:n,end:i},e){let t=new Date(n),s=new Date(i),r=(o,l)=>new Intl.DateTimeFormat(e,o).format(l);if(t.toDateString()===s.toDateString())return r({day:"numeric",month:"short"},t);let c=t.getDate()===1&&new Date(i+1).getDate()===1;return c&&t.getMonth()===0&&s.getMonth()===11&&t.getFullYear()===s.getFullYear()?r({year:"numeric"},t):c&&t.getMonth()===s.getMonth()&&t.getFullYear()===s.getFullYear()?r({month:"short",year:"numeric"},t):new Intl.DateTimeFormat(e,{day:"numeric",month:"short"}).formatRange(t,s)}function hi(n,i,e){let t=i.map(()=>0),s=i.map(()=>0),r=e==="hour"?0:12*36e5;for(let a of n??[]){if(a.mean===null||a.mean===void 0)continue;let c=(typeof a.start=="number"?a.start:Date.parse(a.start))+r,o=-1;for(let l=0;l<i.length&&i[l]<=c;l+=1)o=l;o<0||(t[o]+=a.mean,s[o]+=1)}return t.map((a,c)=>s[c]?a/s[c]:null)}var S="electricity_lens",_e=["pv","heat_pump","wallbox"],Q=n=>{if(n==null||n==="")return null;let i=Number(n);return Number.isFinite(i)?i:null},Gi=n=>typeof n=="string"&&n?new Date(n):null;function P(n){let i=Object.values(n.entities??{}).filter(r=>r.platform===S),e=(r,a)=>i.find(c=>c.device_id===r&&c.translation_key===a),t=r=>r?Q(n.states[r]?.state):null,s=[];for(let r of i){if(r.translation_key!=="saving")continue;let a=n.states[r.entity_id];if(!a||a.state==="unavailable")continue;let c=a.attributes,o=c.category;_e.includes(o)&&s.push({category:o,savingStatistic:typeof c.statistic_id=="string"?c.statistic_id:`${S}:${o}_saving`,calculating:c.calculating===!0,saving:Q(a.state),investment:Q(c.investment),balance:Q(c.balance),perYear:t(e(r.device_id,"saving_per_year")?.entity_id),countingSince:Gi(c.counting_since),entityId:r.entity_id,heating:c.heating==="gas"||c.heating==="oil"?c.heating:null})}return s.sort((r,a)=>_e.indexOf(r.category)-_e.indexOf(a.category))}function nt(n){let i=Object.values(n.entities??{}).filter(e=>e.platform===S);return i.filter(e=>e.translation_key==="saving").flatMap(e=>{let t=n.states[e.entity_id]?.attributes,s=o=>i.find(l=>l.device_id===e.device_id&&l.translation_key===o)?.entity_id,r=s("payback"),a=s("annual_return"),c=t?.category;return _e.includes(c)&&Number(t?.investment)>0&&r&&a?[{category:c,payback:r,annualReturn:a}]:[]}).sort((e,t)=>_e.indexOf(e.category)-_e.indexOf(t.category))}var Ie=n=>n==="pv"?"solar":n;function gi(n){let i=Object.values(n.entities??{}).find(t=>t.platform===S&&t.translation_key==="balance"),e=i?n.states[i.entity_id]:void 0;return!e||e.state==="unavailable"?null:{balance:Q(e.state),saved:Q(e.attributes.saved)??0,invested:Q(e.attributes.invested)??0,perYear:Q(e.attributes.per_year),entityId:i.entity_id}}function ye(n){return Object.values(n.entities??{}).some(e=>e.platform===S&&e.translation_key==="saving")?"integration_unavailable":"not_set_up"}var ji=300*1e3,M=5*1e3,de,kt,U=()=>de?.value;function z(){if(!de)return!0;let n=de.value&&!de.value.calculating?ji:M;return Date.now()-de.at>n}function V(n){return z()?(kt??=n.callWS({type:`${S}/figures`}).then(i=>i).catch(()=>null).then(i=>(de={at:Date.now(),value:i},kt=void 0,i)),kt):Promise.resolve(de?.value??null)}var Ki=6e4,pi=new WeakMap;function Yi(n){let i=n.entities??{},e=pi.get(i);return e||(e=Object.values(i).filter(t=>t.platform===S).map(t=>t.entity_id),pi.set(i,e)),e}var L=class extends A{constructor(){super(...arguments);this._lookedAt=0}_watched(){return[]}_changedFor(e,t){return e.locale!==t.locale||e.language!==t.language||e.config!==t.config||e.themes!==t.themes||e.selectedTheme!==t.selectedTheme||e.entities!==t.entities||[...Yi(t),...this._watched()].some(s=>e.states[s]!==t.states[s])}shouldUpdate(e){let t=e.get("hass"),s=e.size===1&&t!==void 0&&this.hass!==void 0,r=Date.now()-this._lookedAt>=Ki;return s&&!r&&!this._changedFor(t,this.hass)?!1:(this._lookedAt=Date.now(),!0)}};var Ct={title:"Economics","category.pv":"PV plant","category.heat_pump":"Heat pump","category.wallbox":"Electric car",not_set_up:"Set up the Electricity Lens integration to see what your PV plant, heat pump, and electric car have saved.",integration_unavailable:"The figures aren't available right now. Check Electricity Lens under Settings > Devices & services.",calculating:"Being computed \u2026",loading:"Loading \u2026",column_area:"Area",column_per_year:"Per year",column_saving:"Saving",column_investment:"Investment",column_balance:"Net",total:"Total",average:"\xD8 {amount}",line_payback:"of {investment}",line_payback_left:"about {time} left",line_return:"Total {amount}",return_value:"{rate} % a year",months_one:"1 month",months_other:"{count} months",years_one:"1 year",years_other:"{count} years",savings_title:"Savings",savings_source:"Source",savings_energy:"Energy",savings_amount:"Amount",savings_total:"Total",savings_pv:"Solar power instead of grid power",savings_feed_in:"Feed-in",savings_gas:"Electricity instead of gas",savings_oil:"Electricity instead of oil",savings_fuel:"Electricity instead of fuel",savings_instead_gas:"A gas heating would have cost",savings_instead_oil:"An oil heating would have cost",savings_instead_fuel:"A combustion car would have cost",savings_electricity:"{name} electricity costs",savings_solar_part:"of which by solar power",meters_consumer:"Consumer",meters_electricity:"Electricity",history_title:"Savings over time",history_savings_note:"Compared with {list}",history_cost_note:"Solar power counts at {rate}, without the standing charge",history_cost_note_no_solar:"Without the standing charge",history_bill_note:"Grid power and standing charge, without the feed-in",compare_pv:"grid power",compare_gas:"gas heating",compare_oil:"oil heating",compare_fuel:"a combustion car",history_total:"Total",history_no_chart:"The chart is only shown in Home Assistant.",history_failed:"The statistics could not be loaded.",history_empty:"No savings in this period.",figures_failed:"The figures could not be loaded.",figures_not_loaded:"not loaded",figures_unavailable:"not available","figure.energy":"Consumption","figure.energy.grid":"Grid import","figure.energy.solar":"Solar production","figure.cost":"Costs","figure.cost.grid":"Grid costs","figure.bill":"Electricity bill","figure.grid_price":"Average grid price","figure.device_grid_price":"Average grid price","figure.price":"Average price","figure.solar_share":"Solar share","figure.solar_share.household":"Self-sufficiency","figure.cheap_share":"Grid cheap","figure.expensive_share":"Grid expensive","figure.cheap_saving":"Tariff saving","figure.self_consumption":"Self-consumption","figure.export":"Feed-in","figure.saving":"Saving","figure.payback":"Payback","figure.annual_return":"Return","figure.forecast_today":"Forecast today","figure.forecast_tomorrow":"Forecast tomorrow","figure.heat":"Heat","figure.alternative_cost":"Comparison costs","figure.scop":"Seasonal COP","figure.heat_price":"Heat price","figure.distance":"Distance","figure.cost_per_100km":"Costs per 100 km",line_saving_split:"of which {solar} by solar",line_bill:"{charge} standing charge",line_bill_no_charge:"feed-in \u2212{feed_in}",line_against_normal:"vs. normal price",line_from_electricity:"from {energy} electricity",line_heat_from:"{heat} from {energy}",line_charged:"with {energy} charged",line_solar_part:"{percent} of it solar power",line_energy_parts:"Grid {grid} + solar {solar}",line_exported:"{energy} fed in",line_average_price:"average {price}",line_for_import:"for {energy} imported",line_cost_for:"{cost} for {energy}",line_part_of:"{part} of {whole}","value.change":"total in the period","value.mean":"average","value.min":"minimum","value.max":"maximum",value_range:"from {min} to {max}","period.energy_date":"Follow the date selection","period.today":"Today","period.yesterday":"Yesterday","period.this_month":"This month","period.last_month":"Last month","period.this_year":"This year","period.last_year":"Last year","period.all":"All years",editor_title:"Title (optional)",editor_period:"Period",editor_period_hint:"Without a date selection on the dashboard: this month.",editor_source:"Source","source.energy":"Energy data","source.statistic":"Statistic","source.entity":"Entity",editor_area:"Area",editor_figure:"Figure",editor_statistic:"Statistic",editor_value:"Value",editor_secondary:"Line below","secondary.none":"Default","secondary.range":"Range of the period",editor_entity:"Entity",editor_name:"Name (optional)",editor_not_loaded:"Energy data need the Electricity Lens integration.","source.solar":"Solar power","source.grid":"Grid power","source.normal":"Grid normal","source.cheap":"Grid cheap","source.expensive":"Grid expensive","source.export":"Feed-in","source.standing_charge":"Standing charge","stack.source":"By source","stack.bill":"Electricity bill","stack.consumer":"By consumer","stack.none":"Not stacked",editor_savings:"Savings of all categories",editor_stack:"Stacking",editor_line:"Line",editor_lines:"Further lines from statistics",editor_line_none:"None",history_empty_figure:"No data in this period.",breakdown_mix:"Electricity mix",breakdown_cost_by_consumer:"Costs by consumer",breakdown_energy_by_consumer:"Consumption by consumer",breakdown_total:"Total","mix.solar":"Solar","mix.grid":"Grid","mix.normal":"Grid normal","mix.cheap":"Grid cheap","mix.expensive":"Grid expensive",editor_by:"Split","by.source":"By source","by.consumer":"By consumer",editor_display:"Display","display.ring":"Ring","display.bars":"Bars",editor_color_by_source:"Color the bars by source",editor_breakdown_source:"Source","breakdown_source.energy":"Energy data","breakdown_source.statistics":"Statistics",editor_statistics:"Statistics","figure_choice.energy":"Consumption","figure_choice.cost":"Costs","strategy.title":"Electricity","strategy.overview":"Now","strategy.electricity":"Consumption","strategy.forecast_today":"Solar forecast today","strategy.forecast_tomorrow":"Solar forecast tomorrow","strategy.cost_today":"Costs today","strategy.consumption_today":"Consumption today","strategy.payback_pv":"PV payback","strategy.payback_heat_pump":"HP payback","strategy.payback_wallbox":"Car payback","strategy.return_pv":"PV return","strategy.return_heat_pump":"HP return","strategy.return_wallbox":"Car return","strategy.charged_energy":"Charged energy","strategy.charging_cost":"Charging costs","strategy.bill":"Electricity bill","strategy.cost_with_solar":"Electricity costs incl. solar","strategy.cost_history":"Costs over time","strategy.cost_distribution":"Cost distribution","strategy.price_with_solar":"Average price incl. solar","strategy.costs":"Costs","strategy.heating":"Heating","strategy.charging":"Charging","strategy.usage_graph":"Consumption by source","strategy.solar_graph":"Solar production","strategy.devices_graph":"Consumption over time","strategy.distribution":"Power flow","strategy.not_loaded":"Set up the Electricity Lens integration to see this dashboard."},Ji={title:"Wirtschaftlichkeit","category.pv":"PV-Anlage","category.heat_pump":"W\xE4rmepumpe","category.wallbox":"E-Auto",not_set_up:"Richte die Integration Electricity Lens ein, um zu sehen, was PV-Anlage, W\xE4rmepumpe und E-Auto gespart haben.",integration_unavailable:"Die Zahlen sind gerade nicht verf\xFCgbar. Pr\xFCfe Electricity Lens unter Einstellungen > Ger\xE4te & Dienste.",calculating:"Wird berechnet \u2026",loading:"Wird geladen \u2026",column_area:"Bereich",column_per_year:"Pro Jahr",column_saving:"Ersparnis",column_investment:"Investition",column_balance:"Saldo",total:"Summe",average:"\xD8 {amount}",line_payback:"von {investment}",line_payback_left:"noch etwa {time}",line_return:"Gesamt {amount}",return_value:"{rate} % p. a.",months_one:"1 Monat",months_other:"{count} Monate",years_one:"1 Jahr",years_other:"{count} Jahre",savings_title:"Ersparnis",savings_source:"Quelle",savings_energy:"Energie",savings_amount:"Betrag",savings_total:"Gesamt",savings_pv:"PV-Strom statt Netzstrom",savings_feed_in:"Einspeisung",savings_gas:"Strom statt Gas",savings_oil:"Strom statt \xD6l",savings_fuel:"Strom statt Sprit",savings_instead_gas:"Gasheizung h\xE4tte gekostet",savings_instead_oil:"\xD6lheizung h\xE4tte gekostet",savings_instead_fuel:"Verbrenner h\xE4tte gekostet",savings_electricity:"Stromkosten {name}",savings_solar_part:"davon durch PV",meters_consumer:"Verbraucher",meters_electricity:"Strom",history_title:"Ersparnisverlauf",history_savings_note:"Gegen\xFCber {list}",history_cost_note:"PV-Strom z\xE4hlt mit {rate}, ohne Grundpreis",history_cost_note_no_solar:"Ohne Grundpreis",history_bill_note:"Netzstrom und Grundpreis, ohne Einspeisung",compare_pv:"Netzstrom",compare_gas:"Gasheizung",compare_oil:"\xD6lheizung",compare_fuel:"Verbrenner",history_total:"Summe",history_no_chart:"Das Diagramm erscheint nur in Home Assistant.",history_failed:"Die Statistik konnte nicht geladen werden.",history_empty:"Keine Ersparnis in diesem Zeitraum.",figures_failed:"Die Kennzahlen konnten nicht geladen werden.",figures_not_loaded:"nicht geladen",figures_unavailable:"nicht verf\xFCgbar","figure.energy":"Verbrauch","figure.energy.grid":"Netzbezug","figure.energy.solar":"PV-Erzeugung","figure.cost":"Kosten","figure.cost.grid":"Netzkosten","figure.bill":"Stromrechnung","figure.grid_price":"\xD8 Netzpreis","figure.device_grid_price":"\xD8 Netzpreis","figure.price":"\xD8 Strompreis","figure.solar_share":"PV-Anteil","figure.solar_share.household":"Autarkie","figure.cheap_share":"Netz g\xFCnstig","figure.expensive_share":"Netz teuer","figure.cheap_saving":"Tarifersparnis","figure.self_consumption":"Eigenverbrauch","figure.export":"Einspeisung","figure.saving":"Ersparnis","figure.payback":"Amortisation","figure.annual_return":"Rendite","figure.forecast_today":"Prognose heute","figure.forecast_tomorrow":"Prognose morgen","figure.heat":"W\xE4rme","figure.alternative_cost":"Vergleichskosten","figure.scop":"JAZ","figure.heat_price":"W\xE4rmepreis","figure.distance":"Strecke","figure.cost_per_100km":"Kosten pro 100 km",line_saving_split:"davon {solar} durch PV",line_bill:"inkl. {charge} Grundpreis",line_bill_no_charge:"Einspeisung \u2212{feed_in}",line_against_normal:"zum Normalpreis",line_from_electricity:"aus {energy} Strom",line_heat_from:"{heat} aus {energy}",line_charged:"mit {energy} geladen",line_solar_part:"davon {percent} PV-Strom",line_energy_parts:"Netz {grid} + PV {solar}",line_exported:"{energy} eingespeist",line_average_price:"\xD8 {price}",line_for_import:"f\xFCr {energy} Netzbezug",line_cost_for:"{cost} f\xFCr {energy}",line_part_of:"{part} von {whole}","value.change":"Summe im Zeitraum","value.mean":"Mittelwert","value.min":"Minimum","value.max":"Maximum",value_range:"von {min} bis {max}","period.energy_date":"Der Datumsauswahl folgen","period.today":"Heute","period.yesterday":"Gestern","period.this_month":"Dieser Monat","period.last_month":"Letzter Monat","period.this_year":"Dieses Jahr","period.last_year":"Letztes Jahr","period.all":"Alle Jahre",editor_title:"Titel (optional)",editor_period:"Zeitraum",editor_period_hint:"Ohne Datumsauswahl auf dem Dashboard: dieser Monat.",editor_source:"Quelle","source.energy":"Energiedaten","source.statistic":"Statistik","source.entity":"Entit\xE4t",editor_area:"Bereich",editor_figure:"Gr\xF6\xDFe",editor_statistic:"Statistik",editor_value:"Wert",editor_secondary:"Unterzeile","secondary.none":"Standard","secondary.range":"Spanne im Zeitraum",editor_entity:"Entit\xE4t",editor_name:"Name (optional)",editor_not_loaded:"Energiedaten brauchen die Integration Electricity Lens.","source.solar":"PV-Strom","source.grid":"Netzstrom","source.normal":"Netz normal","source.cheap":"Netz g\xFCnstig","source.expensive":"Netz teuer","source.export":"Einspeisung","source.standing_charge":"Grundpreis","stack.source":"Nach Quelle","stack.bill":"Stromrechnung","stack.consumer":"Nach Verbraucher","stack.none":"Nicht gestapelt",editor_savings:"Ersparnisse aller Kategorien",editor_stack:"Stapelung",editor_line:"Linie",editor_lines:"Weitere Linien aus Statistiken",editor_line_none:"Keine",history_empty_figure:"Keine Daten in diesem Zeitraum.",breakdown_mix:"Strommix",breakdown_cost_by_consumer:"Kosten nach Verbraucher",breakdown_energy_by_consumer:"Verbrauch nach Verbraucher",breakdown_total:"Gesamt","mix.solar":"PV","mix.grid":"Netz","mix.normal":"Netz normal","mix.cheap":"Netz g\xFCnstig","mix.expensive":"Netz teuer",editor_by:"Aufteilen","by.source":"Nach Quelle","by.consumer":"Nach Verbraucher",editor_display:"Darstellung","display.ring":"Ring","display.bars":"Balken",editor_color_by_source:"Balken nach Quelle f\xE4rben",editor_breakdown_source:"Quelle","breakdown_source.energy":"Energiedaten","breakdown_source.statistics":"Statistiken",editor_statistics:"Statistiken","figure_choice.energy":"Verbrauch","figure_choice.cost":"Kosten","strategy.title":"Strom","strategy.overview":"Jetzt","strategy.electricity":"Verbrauch","strategy.forecast_today":"PV-Prognose heute","strategy.forecast_tomorrow":"PV-Prognose morgen","strategy.cost_today":"Kosten heute","strategy.consumption_today":"Verbrauch heute","strategy.payback_pv":"PV-Amortisation","strategy.payback_heat_pump":"WP-Amortisation","strategy.payback_wallbox":"Auto-Amortisation","strategy.return_pv":"PV-Rendite","strategy.return_heat_pump":"WP-Rendite","strategy.return_wallbox":"Auto-Rendite","strategy.charged_energy":"Geladene Energie","strategy.charging_cost":"Ladekosten","strategy.bill":"Stromrechnung","strategy.cost_with_solar":"Stromkosten inkl. PV","strategy.cost_history":"Kostenverlauf","strategy.cost_distribution":"Kostenverteilung","strategy.price_with_solar":"\xD8 Preis inkl. PV","strategy.costs":"Kosten","strategy.heating":"Heizen","strategy.charging":"Laden","strategy.usage_graph":"Verbrauch nach Quelle","strategy.solar_graph":"PV-Erzeugung","strategy.devices_graph":"Verbrauchsverlauf","strategy.distribution":"Stromfluss","strategy.not_loaded":"Richte die Integration Electricity Lens ein, um dieses Dashboard zu sehen."},Zi={en:Ct,de:Ji},j=n=>n in Ct;function $(n){let i=Zi[n.split("-")[0]]??Ct;return(e,t={})=>i[e].replace(/\{(\w+)\}/g,(s,r)=>t[r]??"")}var I=R`
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
`;var X=["energy_date","today","yesterday","this_month","last_month","this_year","last_year"];function B(n,i,e){let t=`figure.${i}.${e.kind}`,s=n(j(t)?t:`figure.${i}`);return["device","other","category"].includes(e.kind)?`${e.name} ${s}`:s}var qi=300*1e3,At=n=>n.toDateString();function Qi(n){let i=new Date,e=At(i),t=At(new Date(i.getFullYear(),i.getMonth(),i.getDate()+1)),s={today:null,tomorrow:null};for(let r of Object.values(n??{}))for(let[a,c]of Object.entries(r.wh_hours??{})){let o=At(new Date(a));o===e&&(s.today=(s.today??0)+c/1e3),o===t&&(s.tomorrow=(s.tomorrow??0)+c/1e3)}return s}var ve=class extends L{constructor(){super(...arguments);this._infoLoading=!1}static getStubConfig(){return{period:"energy_date",area:"household",figure:"cost"}}static getConfigElement(){return document.createElement("electricity-lens-figures-card-editor")}setConfig(e){H(e?.collection_key),this._config=e}getCardSize(){return 2}getGridOptions(){return{columns:6,min_columns:6}}connectedCallback(){super.connectedCallback(),this._follow()}disconnectedCallback(){super.disconnectedCallback(),this._unfollow?.(),this._unfollow=void 0,clearTimeout(this._retryTimer),this._retryTimer=void 0}_watched(){return[this._config?.entity,this._config?.statistic].filter(e=>e!==void 0)}get _localize(){return $(this.hass?.locale?.language??this.hass?.language??"en")}get _language(){return this.hass?.locale?.language??"en"}get _period(){return this._config?.period??"energy_date"}get _hasPeriod(){let{figure:e}=this._config??{};return!!this._config&&N(this._config)!=="entity"&&!(e&&(le(e)||ue(e)))}_follow(){this._period!=="energy_date"||!this._hasPeriod||this._unfollow||!this.isConnected||!this.hass?.connection||(this._unfollow=Y(this.hass.connection,this._config?.collection_key,e=>{this._selected=e}))}_range(){let e=this._period;if(!this._hasPeriod)return F("today");if(e!=="energy_date")return F(e);if(this._selected!==void 0)return this._selected??F("this_month")}_area(e){return this._info?.areas.find(t=>t.id===e)}_figure(e){let t=this._area(e.area);if(!(!t||!e.figure||!Z(t).includes(e.figure)))return{area:t,figure:e.figure}}async _loadInfo(){!this.hass||this._infoLoading||(this._infoLoading=!0,this._info=await V(this.hass),this._infoLoading=!1,clearTimeout(this._retryTimer),this._retryTimer=void 0,this.isConnected&&(!this._info||this._info.calculating)&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),M)))}_request(){let e=this._range(),t=this._config;if(!e||!t)return;let s=N(t);if(s==="entity"||t.figure&&ue(t.figure)||s==="energy"&&!this._info)return;let r=new Set,a=new Set,c=!1;if(s==="statistic"&&t.statistic)r.add(t.statistic),a.add(t.statistic);else if(s==="energy"){let l=this._figure(t);l&&(c=le(l.figure),this._info?.calculating||ci(l.area,l.figure).forEach(u=>r.add(u)))}let o=[...r].sort();return{key:JSON.stringify([o,e.start,e.end,c]),range:e,ids:o,statistics:[...a].sort(),forecast:c}}async _load(e){if(!this.hass)return;this._loading=e.key;let t=fe(q(e.range)),s={key:e.key,at:Date.now(),range:e.range,period:t,rows:{},metadata:{},forecast:{today:null,tomorrow:null},failed:!1};try{let[r,a,c]=await Promise.all([e.ids.length?this.hass.callWS({type:"recorder/statistics_during_period",start_time:new Date(e.range.start).toISOString(),end_time:new Date(e.range.end+1).toISOString(),statistic_ids:e.ids,period:t,types:e.statistics.length?["change","mean","min","max"]:["change"],units:{energy:"kWh"}}):Promise.resolve({}),e.statistics.length?this.hass.callWS({type:"recorder/get_statistics_metadata",statistic_ids:e.statistics}):Promise.resolve([]),e.forecast?this.hass.callWS({type:"energy/solar_forecast"}):Promise.resolve({})]);s.rows=r,s.metadata=Object.fromEntries(a.map(o=>[o.statistic_id,o])),s.forecast=Qi(c)}catch{s.failed=!0}this._loading===e.key&&(this._loading=void 0,this._loaded=s)}willUpdate(e){if(!this.hass)return;(e.has("hass")||e.has("_config"))&&this._follow(),this._info===void 0&&(this._info=U()),z()&&!this._infoLoading?this._loadInfo():this.isConnected&&this._info?.calculating&&!this._retryTimer&&!this._infoLoading&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),M));let t=this._request(),s=!this._loaded||Date.now()-this._loaded.at>qi;t&&t.key!==this._loading&&(t.key!==this._loaded?.key||s&&!this._loading)&&this._load(t)}get _fmt(){return J(this.hass?.locale,this.hass?.config.currency??"EUR")}_number(e,t){return this._fmt.number(e,t)}_format(e,t){return this._fmt.value(e,t)}_rows(e){let t=this._loaded;if(!t)return[];let s=t.period==="hour"?0:12*36e5;return(t.rows[e]??[]).filter(r=>{let a=(typeof r.start=="number"?r.start:Date.parse(r.start))+s;return a>=t.range.start&&a<=t.range.end})}_sum(e){let t=0;for(let s of e??[])for(let r of this._rows(s))t+=r.change??0;return t}_energyCard(e){let t=this._localize,s=this._figure(e);if(!s){let d=`figure.${e.figure??""}`,h=e.name??(j(d)?t(d):e.figure??"");return this._info===void 0?this._card(h,"\u2026"):this._card(h,"\u2013",t("figures_unavailable"))}let{area:r,figure:a}=s,c=e.name??B(this._localize,a,r);if(ue(a))return this._investmentCard(c,a,r);if(this._info?.calculating&&!le(a))return this._card(c,"\u2026",t("calculating"));if(!this._loaded)return this._card(c,"\u2026");if(this._loaded.failed)return this._card(c,"\u2013",t("figures_not_loaded"));let o=a==="forecast_today"?this._loaded.forecast.today:a==="forecast_tomorrow"?this._loaded.forecast.tomorrow:null,l=me(a,r,d=>r.statistics[d]?this._sum(r.statistics[d]):null,o),u=l.line?t(l.line.key,Object.fromEntries(Object.entries(l.line.values).map(([d,h])=>[d,this._format(h.value,h.unit)]))):void 0;return this._card(c,l.value===null?"\u2013":this._format(l.value,l.unit),e.secondary==="none"?void 0:u)}_statisticCard(e){let t=this._localize,s=e.statistic??"",r=this._loaded?.metadata[s],a=e.name??r?.name??this.hass?.states[s]?.attributes.friendly_name;if(!this._loaded)return this._card(a??"\xA0","\u2026");let c=a??s,o=this._rows(s),l=r?.unit_class==="energy"?"kWh":r?.statistics_unit_of_measurement??"",u=f=>f===null?"\u2013":`${this._number(f)}${l?` ${l}`:""}`,d=f=>o.map(y=>y[f]).filter(y=>typeof y=="number"),h=e.value??"change",g=null;if(h==="change")g=o.length?o.reduce((f,y)=>f+(y.change??0),0):null;else if(h==="mean"){let f=d("mean");g=f.length?f.reduce((y,b)=>y+b,0)/f.length:null}else{let f=d(h);g=f.length?h==="min"?Math.min(...f):Math.max(...f):null}let m=h==="change"?void 0:t(`value.${h}`);if(e.secondary==="range"){let f=d("min"),y=d("max");f.length&&y.length&&(m=t("value_range",{min:u(Math.min(...f)),max:u(Math.max(...y))}))}return this._loaded.failed?this._card(c,"\u2013",t("figures_not_loaded")):this._card(c,u(g),e.secondary==="none"?void 0:m)}_entityCard(e){let t=this._localize,s=this.hass?.states[e.entity??""],r=e.name??s?.attributes.friendly_name??e.entity??"";if(!s)return this._card(r,"\u2013",t("figures_unavailable"));let a=Number(s.state),c=this.hass?.config.currency??"",o=s.attributes.unit_of_measurement?.replace(c,c?this._fmt.currencySymbol():""),l=s.state!==""&&Number.isFinite(a),u=this._fmt.currencySymbol(),d=l?o&&o===u?this._format(a,"money"):`${this._number(a)}${o?` ${o}`:""}`:["unknown","unavailable",""].includes(s.state)?"\u2013":s.state;return this._card(r,d,void 0,e.entity)}_investmentCard(e,t,s){let r=this._localize,a=nt(this.hass).find(d=>Ie(d.category)===s.id),c=t==="payback"?a?.payback:a?.annualReturn,o=c?this.hass?.states[c]:void 0,l=Number(o?.state);if(!o||!Number.isFinite(l))return this._card(e,"\u2013",void 0,c);if(t==="payback"){let d=l<100?Math.floor(l):l;return this._card(e,this._format(d,"percent"),this._paybackLine(o.attributes),c)}let u=D(this.hass?.locale,{minimumFractionDigits:1,maximumFractionDigits:1}).format(l);return this._card(e,r("return_value",{rate:u}),this._returnLine(o.attributes),c)}_paybackLine(e){let t=this._localize;if(typeof e.investment!="number")return;let s=this._format(e.investment,"money");if(typeof e.years_left!="number")return t("line_payback",{investment:s});let r=e.years_left,a=Math.max(1,Math.round(r<1?r*12:r)),c=r<1?t(a===1?"months_one":"months_other",{count:String(a)}):t(a===1?"years_one":"years_other",{count:String(a)});return t("line_payback_left",{time:c})}_returnLine(e){let{surplus:t}=e;if(typeof t=="number")return this._localize("line_return",{amount:D(this.hass?.locale,{style:"currency",currency:this.hass?.config.currency??"EUR",maximumFractionDigits:0,signDisplay:"exceptZero"}).format(t)})}_card(e,t,s,r){let[a,c]=oi(t),o=()=>{this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:r},bubbles:!0,composed:!0}))},l=u=>{u.key!=="Enter"&&u.key!==" "||(u.preventDefault(),o())};return p`<ha-card
      lang=${this._language}
      class=${r?"clickable":""}
      role=${r?"button":_}
      tabindex=${r?"0":_}
      @click=${r?o:_}
      @keydown=${r?l:_}
    >
      <div class="header"><h2 class="title" title=${e}>${e}</h2></div>
      <div class="stat">
        <div class="value">
          <span class="number" title=${t}>${a}</span>${c?p`<span class="unit">${c}</span>`:_}
        </div>
        ${s?p`<div class="line" title=${s}>${s}</div>`:_}
      </div>
    </ha-card>`}render(){if(!this.hass||!this._config)return p``;let e=N(this._config);return e==="statistic"?this._statisticCard(this._config):e==="entity"?this._entityCard(this._config):this._energyCard(this._config)}};ve.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0},_selected:{state:!0},_loaded:{state:!0}},ve.styles=[I,R`
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
    `];var Xi=["energy","cost","saving","export","heat","distance","alternative_cost"],es=["price","grid_price","solar_share","cheap_share","expensive_share","self_consumption","scop","heat_price","cost_per_100km"],De=n=>Xi.filter(i=>Z(n).includes(i)),Rt=n=>es.filter(i=>Z(n).includes(i)||i==="grid_price"&&n.kind==="household");function be(n,i){let e=[];return i==="energy"&&n.statistics.solar?.length&&e.push("source"),n.kind==="household"&&(i==="energy"||i==="cost")&&e.push("consumer"),n.kind==="household"&&i==="cost"&&e.push("source","bill"),n.kind==="category"&&(n.statistics.energy?.length??0)>1&&(i==="energy"||i==="cost"||(i==="heat"||i==="saving")&&(n.statistics.heat_meters?.length??0)>1)&&e.push("consumer"),e.push("none"),n.kind==="category"&&i==="cost"&&n.statistics.solar_cost?.length&&e.push("source"),e}function mi(n,i){let e=n.statistics[i]??[];return{plus:i==="saving"?[...e,...n.statistics.solar_saving??[]]:e,minus:[]}}function at(n){let i=new Set(n.areas.find(t=>t.id==="heat_pump")?.statistics.energy??[]),e=n.areas.filter(t=>t.kind==="device"&&t.statistics.heat?.length&&t.statistics.energy?.some(s=>i.has(s)));return e.length>1?e:[]}function ts(n,i,e){let t=n.areas.find(o=>o.kind==="grid")?.statistics??{},s=t.import_cost??[],r=i.statistics.cheap_cost??[],a=i.statistics.expensive_cost??[],c=[{id:"standing_charge",name:{key:"source.standing_charge"},color:e.standing,plus:t.standing_charge??[],minus:[]}];return r.length&&c.push({id:"cheap",name:{key:"source.cheap"},color:e.cheap,plus:r,minus:[]}),c.push({id:"grid",name:{key:r.length||a.length?"source.normal":"source.grid"},color:e.grid,plus:s,minus:[...r,...a],floor:!0}),a.length&&c.push({id:"expensive",name:{key:"source.expensive"},color:e.expensive,plus:a,minus:[]}),c}function is(n,i,e){let t=o=>i.statistics[o]??[],s=t("cheap_cost"),r=t("expensive_cost"),a=[{id:"solar",name:{key:"source.solar"},color:e.solar,plus:t("solar_cost"),minus:[]}];s.length&&a.push({id:"cheap",name:{key:"source.cheap"},color:e.cheap,plus:s,minus:[]}),a.push({id:"grid",name:{key:s.length||r.length?"source.normal":"source.grid"},color:e.grid,plus:t("cost"),minus:[...t("solar_cost"),...s,...r],floor:!0}),r.length&&a.push({id:"expensive",name:{key:"source.expensive"},color:e.expensive,plus:r,minus:[]});let c=n.areas.find(o=>o.kind==="grid")?.statistics.feed_in??[];return i.kind==="household"&&c.length&&a.push({id:"export",name:{key:"source.export"},color:e.export,plus:c,minus:[],negative:!0}),a}function ot(n,i,e,t,s){let r=o=>i.statistics[o]??[],a=T(n,s);if(t==="bill"&&e==="cost")return ts(n,i,s);if(t==="source"&&e==="cost")return is(n,i,s);if(t==="source"&&e==="energy"){let o=[{id:"solar",name:{key:"source.solar"},color:s.solar,plus:r("solar"),minus:[]}],l=["cheap","expensive"].filter(d=>r(d).length);r("cheap").length&&o.push({id:"cheap",name:{key:"source.cheap"},color:s.cheap,plus:r("cheap"),minus:[]}),o.push({id:"grid",name:{key:l.length?"source.normal":"source.grid"},color:s.grid,plus:r("energy"),minus:[...r("solar"),...l.flatMap(r)],floor:!0}),r("expensive").length&&o.push({id:"expensive",name:{key:"source.expensive"},color:s.expensive,plus:r("expensive"),minus:[]});let u=n.areas.find(d=>d.kind==="grid")?.statistics.export??[];return i.kind==="household"&&u.length&&o.push({id:"export",name:{key:"source.export"},color:s.export,plus:u,minus:[],negative:!0}),o}if(t==="consumer"){if(i.kind==="category"){let l=new Set(i.statistics.energy??[]);return n.areas.filter(u=>u.kind==="device"&&u.statistics.energy?.some(d=>l.has(d))).map(u=>({id:u.id,name:{text:u.name},color:a.get(u.id)??s.other,...mi(u,e)}))}let o=new Set(n.areas.filter(l=>l.kind==="category").flatMap(l=>l.statistics.energy??[]));return n.areas.filter(l=>l.kind==="category"&&(l.statistics.energy?.length??0)>0||l.kind==="device"&&l.top_level!==!1&&!l.statistics.energy?.some(u=>o.has(u))||l.kind==="other").map(l=>({id:l.id,name:{text:l.name},color:a.get(l.id)??s.other,plus:l.statistics[e]??[],minus:[]}))}let c=e==="export"?s.export:i.kind==="solar"?s.solar:a.get(i.id)??(e==="heat"?s.heat:e==="distance"?s.car:s.grid);return[{id:e,name:{text:i.name},color:c,...mi(i,e)}]}var ss=36e5;async function ct(n,i,e){if(!i.length)return{};let t=fe(q(e)),s=await n.callWS({type:"recorder/statistics_during_period",start_time:new Date(e.start).toISOString(),end_time:new Date(e.end+1).toISOString(),statistic_ids:i,period:t,types:["change"],units:{energy:"kWh"}}),r=t==="hour"?0:12*ss,a={};for(let c of i){a[c]=0;for(let o of s[c]??[]){let l=(typeof o.start=="number"?o.start:Date.parse(o.start))+r;l>=e.start&&l<=e.end&&(a[c]+=o.change??0)}}return a}var rs=300*1e3,ns="240px",as="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z",os="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z",xe=class extends L{constructor(){super(...arguments);this._config={type:""};this._infoLoading=!1;this._watchingChart=!1;this._hidden=new Set}static getStubConfig(){return{area:"household",by:"source",figure:"energy",display:"ring"}}static getConfigElement(){return document.createElement("electricity-lens-breakdown-card-editor")}setConfig(e){if(e?.statistics!==void 0&&!Array.isArray(e.statistics))throw new Error("statistics must be a list");H(e?.collection_key),this._config=e??{type:""}}getCardSize(){return 4}getGridOptions(){return{columns:6,min_columns:4}}connectedCallback(){super.connectedCallback(),this._follow()}disconnectedCallback(){super.disconnectedCallback(),this._unfollow?.(),this._unfollow=void 0,clearTimeout(this._retryTimer),this._retryTimer=void 0}get _localize(){return $(this.hass?.locale?.language??this.hass?.language??"en")}get _language(){return this.hass?.locale?.language??"en"}get _fmt(){return J(this.hass?.locale,this.hass?.config.currency??"EUR")}get _byStatistics(){return!!this._config.statistics?.length}_follow(){(this._config.period??"energy_date")==="energy_date"&&(this._unfollow||!this.isConnected||!this.hass?.connection||(this._unfollow=Y(this.hass.connection,this._config.collection_key,e=>{this._selected=e})))}_range(){let e=this._config.period??"energy_date";if(e!=="energy_date")return F(e);if(this._selected!==void 0)return this._selected??F("this_month")}_area(){return this._info?.areas.find(e=>e.id===(this._config.area??"household"))}get _by(){let e=this._area();return this._config.by==="consumer"&&(e?.kind==="household"||e?.kind==="category"&&(e.statistics.energy?.length??0)>1)?"consumer":e?.statistics.solar?.length?"source":"consumer"}get _figure(){return this._by==="consumer"&&this._config.figure==="cost"?"cost":"energy"}_series(){let e=this._info,t=this._area();return!e||!t?[]:ot(e,t,this._figure,this._by==="source"?"source":"consumer",E(this)).filter(s=>!s.negative)}_ids(){let e=new Set;if(this._byStatistics)this._config.statistics?.forEach(t=>e.add(t.statistic));else{for(let t of this._series())[...t.plus,...t.minus].forEach(s=>e.add(s));if(this._by==="consumer"&&this._info)for(let t of this._series()){let s=this._info.areas.find(r=>r.id===t.id);for(let r of["energy","solar","cheap","expensive","cost","solar_cost","cheap_cost","expensive_cost"])(s?.statistics[r]??[]).forEach(a=>e.add(a))}}return[...e].sort()}async _loadInfo(){!this.hass||this._infoLoading||(this._infoLoading=!0,this._info=await V(this.hass),this._infoLoading=!1,clearTimeout(this._retryTimer),this._retryTimer=void 0,this.isConnected&&(!this._info||this._info.calculating)&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),M)))}async _load(e,t,s){if(!this.hass)return;this._loading=e;let r={key:e,at:Date.now(),values:{},names:{},failed:!1};try{let a=this._byStatistics?t:[],[c,o]=await Promise.all([ct(this.hass,t,s),a.length?this.hass.callWS({type:"recorder/get_statistics_metadata",statistic_ids:a}):Promise.resolve([])]);r.values=c,r.names=Object.fromEntries(o.map(l=>[l.statistic_id,l.name||this.hass?.states[l.statistic_id]?.attributes.friendly_name||l.statistic_id]))}catch{r.failed=!0}this._loading===e&&(this._loading=void 0,this._sums=r)}willUpdate(e){if(!this.hass||((e.has("hass")||e.has("_config"))&&this._follow(),this._watchingChart||(this._watchingChart=!0,it(c=>{this._hasChart=c})),this._info===void 0&&(this._info=U()),z()&&!this._infoLoading&&this._loadInfo(),!this._byStatistics&&(this.isConnected&&this._info?.calculating&&!this._retryTimer&&!this._infoLoading&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),M)),!this._info||this._info.calculating)))return;let t=this._range();if(!t)return;let s=this._ids();if(!s.length)return;let r=JSON.stringify([s,t.start,t.end]),a=!this._sums||Date.now()-this._sums.at>rs;r!==this._loading&&(r!==this._sums?.key||a&&!this._loading)&&this._load(r,s,t)}_sum(e){return e.reduce((t,s)=>t+(this._sums?.values[s]??0),0)}_parts(){let e=this._localize;if(this._byStatistics){let s=E(this),r=this._info?T(this._info,s):new Map;return(this._config.statistics??[]).map((a,c)=>{let o=this._info?.areas.find(l=>l.kind==="device"&&(l.statistics.energy?.[0]===a.statistic||l.statistics.heat?.[0]===a.statistic));return{id:a.statistic,name:a.name??o?.name??this._sums?.names[a.statistic]??a.statistic,color:(o&&r.get(o.id))??s.consumers[c%s.consumers.length],value:this._sum([a.statistic])}})}let t=this._series().map(s=>{let r=this._sum(s.plus)-this._sum(s.minus),a=s.name.key?.replace(/^source\./,"mix."),c=s.name.text??(a&&j(a)?e(a):s.name.key&&j(s.name.key)?e(s.name.key):s.id),o={id:s.id,name:c,color:s.color,value:s.floor?Math.max(r,0):r};if(this._by==="consumer"&&this._info){let l=E(this),u=this._info.areas.find(d=>d.id===s.id);if(u){let d=C=>this._sum(u.statistics[C]??[]),h=d("energy"),g=d("solar"),m=d("cheap"),f=d("expensive");o.energy=h;let y=this._figure==="cost",b={solar:y?d("solar_cost"):g,cheap:y?d("cheap_cost"):m,expensive:y?d("expensive_cost"):f};o.mix=[{color:l.solar,value:b.solar},{color:l.cheap,value:b.cheap},{color:l.grid,value:Math.max((y?d("cost"):h)-b.solar-b.cheap-b.expensive,0)},{color:l.expensive,value:b.expensive}]}}return o});return this._by==="consumer"?t.sort((s,r)=>r.value-s.value):t}_value(e){return this._figure==="cost"&&!this._byStatistics?this._fmt.value(e,"money"):this._fmt.value(e,"energy")}_title(){let e=this._localize;return this._config.title?this._config.title:this._byStatistics?"":(this._area()?this._by:this._config.by??"source")==="source"?e("breakdown_mix"):e(this._figure==="cost"?"breakdown_cost_by_consumer":"breakdown_energy_by_consumer")}_ring(e){let t=this._localize;if(this._hasChart===void 0)return p`<p class="summary">${t("loading")}</p>`;if(!this._hasChart)return p`<p class="summary">${t("history_no_chart")}</p>`;let s=this._figure==="cost"&&!this._byStatistics,r=E(this).line,a=getComputedStyle(this).getPropertyValue("--primary-text-color").trim()||"#212121",c=JSON.stringify([e,[...this._hidden],s,r,a,this.hass?.locale]);this._ringChart?.key!==c&&(this._ringChart={key:c,chart:si({items:e,total:t("breakdown_total"),format:d=>this._value(d),percent:d=>this._fmt.value(d,"percent"),centerColor:r,labelColor:a,hidden:this._hidden})});let{chart:o}=this._ringChart,l=wt(e.map(d=>this._hidden.has(d.id)?0:d.value)),u=d=>{let h=new Set(this._hidden);h.has(d)?h.delete(d):h.add(d),this._hidden=h};return p`<div class="ring">
      ${Qt(s,p`<ha-chart-base
          .hass=${this.hass}
          .data=${o.data}
          .options=${o.options}
          .height=${ns}
        ></ha-chart-base>`)}
      <div class="chart-legend">
        <ul>
          ${e.map((d,h)=>{let g=this._hidden.has(d.id),m=this._fmt.value(l[h],"percent");return p`<li class=${g?"hidden":""}>
              <button
                type="button"
                class="leg"
                aria-pressed=${String(!g)}
                aria-label="${d.name}: ${m}"
                @click=${()=>u(d.id)}
              >
                <svg class="icon" viewBox="0 0 24 24" style="color: ${g?"var(--secondary-text-color)":d.color}">
                  <path fill="currentColor" d=${g?os:as}></path>
                </svg>
                <span class="label">${d.name}</span>
                <span class="value">${m}</span>
              </button>
            </li>`})}
        </ul>
      </div>
    </div>`}_bars(e){let t=e.filter(c=>this._value(c.value)!==this._value(0)),s=Math.max(...t.map(c=>c.value),0),r=this._config.color_by_source===!0&&this._by==="consumer",a=this._localize;return p`<div class="bars">
      ${t.map(c=>{let o=s>0?Math.max(c.value/s*100,0):0,l=c.mix?.reduce((d,h)=>d+h.value,0)??0,u="";return this._figure==="cost"&&c.energy!==void 0&&(u=this._fmt.value(c.energy,"energy"),c.energy>0&&(u+=` \xB7 ${a("line_average_price",{price:this._fmt.value(c.value/c.energy,"price")})}`)),p`<div class="bar-row">
          <div class="bar-text">
            <span class="name">${c.name}</span>
            <span class="amount">${this._value(c.value)}</span>
          </div>
          ${u?p`<div class="bar-line">${u}</div>`:_}
          <div class="track">
            <div class="fill" style="width: ${o}%; ${r?"":`--c: ${c.color}`}">
              ${r&&c.mix&&l>0?c.mix.map(d=>p`<span style="width: ${d.value/l*100}%; --c: ${d.color}"></span>`):_}
            </div>
          </div>
        </div>`})}
      ${r?p`<div class="key">
            ${["solar","cheap","grid","expensive"].filter(c=>(c!=="cheap"||this._info?.levels.cheap_until!=null)&&(c!=="expensive"||this._info?.levels.expensive_from!=null)).map(c=>p`<span><span class="dot" style="--c: ${ce[c]}"></span>${a(c==="grid"?this._info?.levels.cheap_until!=null||this._info?.levels.expensive_from!=null?"source.normal":"source.grid":`source.${c}`)}</span>`)}
          </div>`:_}
    </div>`}render(){if(!this.hass)return p``;let e=this._localize,t=this._range(),s=this._sums?this._parts():[],r=s.reduce((h,g)=>h+Math.max(g.value,0),0),a=!this._byStatistics&&this._info?.calculating===!0,c=!this._byStatistics&&this._info!==void 0&&!this._area(),o=this._config.display??(!this._byStatistics&&this._by==="consumer"?"bars":"ring"),l=(this._config.period??"energy_date")==="energy_date",u=t&&!(o==="bars"&&l)?rt(t,this._language):"",d;return a?d=p`<p class="summary">${e("calculating")}</p>`:c?d=p`<p class="summary">${e(this._info===null?"editor_not_loaded":"figures_unavailable")}</p>`:this._sums?.failed?d=p`<p class="summary">${e("figures_failed")}</p>`:this._sums?r<=0?d=p`<p class="summary">${e("history_empty_figure")}</p>`:d=o==="bars"?this._bars(s):this._ring(s):d=p`<p class="summary">${e("loading")}</p>`,p`<ha-card>
      <div class="header">
        <h2 class="title">${this._title()}</h2>
        ${u?p`<span class="chip">${u}</span>`:_}
      </div>
      ${d}
    </ha-card>`}};xe.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0},_selected:{state:!0},_sums:{state:!0},_hasChart:{state:!0},_hidden:{state:!0}},xe.styles=[I,R`
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
    `];var we=n=>({select:{mode:"dropdown",options:n}}),cs=n=>n.kind==="household"||!!n.statistics.solar?.length,ze=class extends A{constructor(){super(...arguments);this._label=e=>this._localize(`editor_${e.name}`)}setConfig(e){this._config=e}get _localize(){return $(this.hass?.locale?.language??this.hass?.language??"en")}willUpdate(){this.hass&&this._info===void 0&&(this._info=null,this.hass.callWS({type:`${S}/figures`}).then(e=>{this._info=e}).catch(()=>{}))}_data(){let e=this._config??{type:""},t=!!e.statistics?.length||e.statistics!==void 0&&!e.area;return{title:e.title??"",period:e.period??"energy_date",source:t?"statistics":"energy",area:e.area??"household",by:e.by??"source",figure:e.figure??"energy",display:e.display??(!t&&e.by==="consumer"?"bars":"ring"),color_by_source:e.color_by_source??!1,statistics:(e.statistics??[]).map(s=>s.statistic)}}_schema(e){let t=this._localize,s=[{name:"title",selector:{text:{}}},{name:"period",selector:we(X.map(r=>({value:r,label:t(`period.${r}`)})))},{name:"breakdown_source",selector:we(["energy","statistics"].map(r=>({value:r,label:t(`breakdown_source.${r}`)})))}];if(e.source==="statistics")s.push({name:"statistics",selector:{statistic:{multiple:!0}}});else{let r=(this._info?.areas??[]).filter(cs),a=r.find(o=>o.id===e.area),c=[...a?.statistics.solar?.length?["source"]:[],...a?.kind==="household"?["consumer"]:[]];s.push({name:"area",selector:we(r.map(o=>({value:o.id,label:o.name})))},{name:"by",selector:we(c.map(o=>({value:o,label:t(`by.${o}`)})))}),e.by==="consumer"&&s.push({name:"figure",selector:we(["energy","cost"].map(o=>({value:o,label:t(`figure_choice.${o}`)})))})}return s.push({name:"display",selector:we(["ring","bars"].map(r=>({value:r,label:t(`display.${r}`)})))}),e.source!=="statistics"&&e.by==="consumer"&&e.display==="bars"&&s.push({name:"color_by_source",selector:{boolean:{}}}),s}_changed(e){if(!this._config)return;let t={...this._data(),...e.detail.value};"breakdown_source"in e.detail.value&&(t.source=e.detail.value.breakdown_source);let{title:s,period:r,area:a,by:c,figure:o,display:l,color_by_source:u,statistics:d,...h}=this._config,g=h;if(typeof t.title=="string"&&t.title&&(g.title=t.title),g.period=t.period??"energy_date",t.source==="statistics"){let m=new Map((this._config.statistics??[]).map(y=>[y.statistic,y])),f=Array.isArray(t.statistics)?t.statistics.filter(Boolean):[];g.statistics=f.map(y=>m.get(y)??{statistic:y})}else{g.area=t.area??"household";let m=this._info?.areas.find(b=>b.id===g.area),f=m?.kind==="household",y=!!m?.statistics.solar?.length;g.by=t.by==="consumer"&&f?"consumer":y?"source":"consumer",g.by==="consumer"&&t.figure==="cost"?g.figure="cost":g.figure="energy"}g.display=t.display==="bars"?"bars":"ring",g.by==="consumer"&&g.display==="bars"&&t.color_by_source===!0&&(g.color_by_source=!0),this._config=g,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:g},bubbles:!0,composed:!0}))}render(){if(!this.hass||!this._config)return p``;let e=this._data();return p`<ha-form
      .hass=${this.hass}
      .data=${{...e,breakdown_source:e.source}}
      .schema=${this._schema(e)}
      .computeLabel=${this._label}
      @value-changed=${this._changed}
    ></ha-form>`}};ze.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0}};var $e=class extends L{constructor(){super(...arguments);this._infoLoading=!1}static getStubConfig(){return{}}static getConfigForm(){return{schema:[{name:"title",selector:{text:{}}}]}}setConfig(e){this._config=e}getCardSize(){return 4}getGridOptions(){return{columns:12,min_columns:6}}get _localize(){return $(this.hass?.locale?.language??this.hass?.language??"en")}_money(e,t=!1){return e===void 0?"":e===null?"\u2013":D(this.hass?.locale,{style:"currency",currency:this.hass?.config.currency??"EUR",maximumFractionDigits:0,minimumFractionDigits:0,signDisplay:t?"exceptZero":"auto"}).format(e)}willUpdate(){this.hass&&(this._info===void 0&&(this._info=U()),z()&&!this._infoLoading&&(this._infoLoading=!0,V(this.hass).then(e=>{this._info=e,this._infoLoading=!1})))}render(){let e=this._localize;if(!this.hass)return p``;let t=P(this.hass),s=gi(this.hass),r=p`<div class="header">
      <h2 class="title">${this._config?.title||e("title")}</h2>
    </div>`;if(!t.length||!s)return p`<ha-card>
        ${r}
        <p class="summary">${e(ye(this.hass))}</p>
      </ha-card>`;let a=this._info?T(this._info,E(this)):void 0,c=t.some(l=>l.calculating),o={perYear:t.some(l=>l.perYear!==null),invested:s.invested>0};return p`<ha-card>
      ${r}
      <div class="table">
        <table>
          <thead>
            <tr>
              <th class="bullet-cell"></th>
              <th class="name" scope="col">${e("column_area")}</th>
              ${o.perYear?p`<th class="number per-year" scope="col">${e("column_per_year")}</th>`:_}
              <th class="number" scope="col">${e("column_saving")}</th>
              ${o.invested?p`<th class="number" scope="col">${e("column_investment")}</th>
                    <th class="number" scope="col">${e("column_balance")}</th>`:_}
            </tr>
          </thead>
          <tbody>
            ${t.map(l=>this._row({name:e(`category.${l.category}`),entityId:l.entityId,perYear:l.perYear,saving:l.calculating?null:l.saving,investment:l.investment??void 0,balance:l.balance,category:l.category},o,a))}
            ${this._row({name:e("total"),entityId:s.entityId,perYear:s.perYear,saving:c?null:s.saved,investment:s.invested,balance:s.balance},o)}
          </tbody>
        </table>
      </div>
      ${c?p`<p class="note">${e("calculating")}</p>`:_}
    </ha-card>`}_row(e,t,s){let{name:r,entityId:a,perYear:c,saving:o,investment:l,balance:u,category:d}=e,h=d?s?.get(d):void 0;return p`<tr
      class=${d??"total"}
      style=${h?`--color: ${h}`:""}
      @click=${()=>this._moreInfo(a)}
    >
      <td class="bullet-cell">
        ${d?p`<span class="bullet" aria-hidden="true"></span>`:_}
      </td>
      <th class="name" scope="row" title=${r}>
        <button type="button">${r}</button>
      </th>
      ${t.perYear?p`<td class="number per-year">
            ${c===null?"\u2013":this._localize("average",{amount:this._money(c)})}
          </td>`:_}
      <td class="number">${this._money(o)}</td>
      ${t.invested?p`<td class="number">${this._money(l)}</td>
            <td class="number">${this._money(u,!0)}</td>`:_}
    </tr>`}_moreInfo(e){this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:e},bubbles:!0,composed:!0}))}};$e.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0}},$e.styles=[I,R`
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
    `];var ls=300*1e3,O=(n,i)=>(i??[]).reduce((e,t)=>e+(n[t]??0),0),he=class extends L{constructor(){super(...arguments);this._infoLoading=!1}getCardSize(){return 4}getGridOptions(){return{columns:12,min_columns:6}}connectedCallback(){super.connectedCallback(),this._follow()}disconnectedCallback(){super.disconnectedCallback(),this._unfollow?.(),this._unfollow=void 0,clearTimeout(this._retryTimer),this._retryTimer=void 0}get _localize(){return $(this.hass?.locale?.language??this.hass?.language??"en")}get _fmt(){return J(this.hass?.locale,this.hass?.config.currency??"EUR")}_follow(){this._unfollow||!this.isConnected||!this.hass?.connection||(this._unfollow=Y(this.hass.connection,this._collectionKey,e=>{this._selected=e}))}async _loadInfo(){!this.hass||this._infoLoading||(this._infoLoading=!0,this._info=await V(this.hass),this._infoLoading=!1,clearTimeout(this._retryTimer),this._retryTimer=void 0,this.isConnected&&(!this._info||this._info.calculating)&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),M)))}async _load(e,t,s){if(!this.hass)return;this._loading=e;let r=null;try{r=await ct(this.hass,t,s)}catch{}this._loading===e&&(this._loading=void 0,this._sums={key:e,at:Date.now(),values:r})}willUpdate(){if(!this.hass||(this._follow(),this._info===void 0&&(this._info=U()),z()&&!this._infoLoading&&this._loadInfo(),this._selected===void 0||!this._info||this._info.calculating))return;let e=this._selected??F("this_month"),t=[...new Set(this._ids())].sort();if(!t.length)return;let s=JSON.stringify([t,e.start,e.end]),r=!this._sums||Date.now()-this._sums.at>ls;s!==this._loading&&(s!==this._sums?.key||r&&!this._loading)&&this._load(s,t,e)}_waiting(){if(!this.hass)return;let e=P(this.hass);return e.length?e.some(t=>t.calculating)||this._info?.calculating?"calculating":this._info===null?"editor_not_loaded":this._info===void 0?"loading":this._ids().length?this._sums?this._sums.values?void 0:"history_failed":"loading":"figures_unavailable":ye(this.hass)}};he.properties={hass:{attribute:!1},_info:{state:!0},_selected:{state:!0},_sums:{state:!0}};var lt=R`
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
`;var Oe=class extends he{static getStubConfig(){return{}}static getConfigForm(){return{schema:[]}}setConfig(i){H(i?.collection_key),this._collectionKey=i?.collection_key}get _devices(){return this._info?at(this._info).sort((i,e)=>i.name.localeCompare(e.name,this.hass?.locale?.language)):[]}_ids(){return this._devices.flatMap(i=>[...i.statistics.heat??[],...i.statistics.energy??[]])}render(){let i=this._localize;if(!this.hass)return p``;let e=this._waiting(),t=this._devices,s=t.length?t.map(r=>r.name).join(" & "):i("figure.heat");return p`<ha-card>
      <div class="header"><h2 class="title">${s}</h2></div>
      ${e?p`<p class="summary">${i(e)}</p>`:this._table()}
    </ha-card>`}_table(){let i=this._localize,e=this._fmt,t=this._sums?.values??{},s=T(this._info,E(this));return p`<table>
      <thead>
        <tr>
          <th scope="col" colspan="2" class="name">${i("meters_consumer")}</th>
          <th scope="col">${i("figure.heat")}</th>
          <th scope="col">${i("meters_electricity")}</th>
          <th scope="col">${i("figure.scop")}</th>
        </tr>
      </thead>
      <tbody>
        ${this._devices.map(r=>{let a=O(t,r.statistics.heat),c=O(t,r.statistics.energy);return p`<tr>
            <td class="swatch-cell">
              <span class="swatch" style="--color: ${s.get(r.id)??""}" aria-hidden="true"></span>
            </td>
            <td class="name">${r.name}</td>
            <td>${e.value(a,"energy")}</td>
            <td>${e.value(c,"energy")}</td>
            <td>${c>0?e.number(a/c,2):"\u2013"}</td>
          </tr>`})}
      </tbody>
    </table>`}};Oe.styles=[I,lt];var us=300*1e3,ds="200px",hs={energy:"energy",cost:"money",saving:"money",export:"energy",heat:"energy",distance:"distance",alternative_cost:"money"},Se=class extends L{constructor(){super(...arguments);this._config={type:""};this._infoLoading=!1;this._watchingChart=!1}static getStubConfig(){return{}}static getConfigElement(){return document.createElement("electricity-lens-history-card-editor")}setConfig(e){H(e?.collection_key),this._config=e??{type:""}}getCardSize(){return 5}getGridOptions(){return{columns:12,min_columns:6}}connectedCallback(){super.connectedCallback(),this._follow()}disconnectedCallback(){super.disconnectedCallback(),this._unfollow?.(),this._unfollow=void 0,clearTimeout(this._retryTimer),this._retryTimer=void 0}get _localize(){return $(this.hass?.locale?.language??this.hass?.language??"en")}get _language(){return this.hass?.locale?.language??"en"}get _fmt(){return J(this.hass?.locale,this.hass?.config.currency??"EUR")}get _savings(){return!this._config.area}_follow(){(this._config.period??"energy_date")==="energy_date"&&(this._unfollow||!this.isConnected||!this.hass?.connection||(this._unfollow=Y(this.hass.connection,this._config.collection_key,e=>{this._selected=e})))}async _loadInfo(){!this.hass||this._infoLoading||(this._infoLoading=!0,this._info=await V(this.hass),this._infoLoading=!1,clearTimeout(this._retryTimer),this._retryTimer=void 0,this.isConnected&&(!this._info||this._info.calculating)&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),M)))}_range(e){let t=this._config.period??"energy_date";if(t==="all")return{range:e(),period:"year"};if(t!=="energy_date"){let r=F(t);return{range:r,period:q(r)}}if(this._selected===void 0)return;if(this._selected)return{range:this._selected,period:q(this._selected)};let s=e();return{range:s,period:this._savings?"year":q(s)}}_savingsPlan(){if(!this.hass)return;let e=this._localize,t=P(this.hass);if(!t.length||t.some(l=>l.calculating))return;let s=this._range(()=>di(t.map(l=>l.countingSince)));if(!s)return;let r=E(this),a=this._info?T(this._info,r):void 0,c={pv:r.solar,heat_pump:a?.get("heat_pump")??r.heat,wallbox:a?.get("wallbox")??r.car},o=t.map(l=>({series:{id:l.category,name:{},color:c[l.category],plus:[l.savingStatistic],minus:[]},name:e(`category.${l.category}`)}));return this._plan(s,o,"money",void 0,[])}_figurePlan(){let e=this._info,t=this._config;if(!e||e.calculating)return;let s=e.areas.find(m=>m.id===t.area),r=t.figure??"energy";if(!s||!s.statistics[r]?.length)return;let a=this._range(()=>F("this_month"));if(!a)return;let c=this._localize,o=be(s,r),l=t.stack&&o.includes(t.stack)?t.stack:o[0],u=ot(e,s,r,l,E(this)).map(m=>({series:m,name:m.name.text??(m.name.key&&j(m.name.key)?c(m.name.key):m.id)}));u.length===1&&(u[0].name=B(c,r,s));let d=t.line==="grid_price"?e.areas.find(m=>m.kind==="grid")??s:s,h=t.line&&s.statistics?{figure:t.line,area:d,name:t.line_name??B(c,t.line,d)}:void 0,g=r==="cost"?[...s.statistics.solar??[],...s.statistics.solar_cost??[]]:[];return this._plan(a,u,hs[r],h,t.lines??[],g)}_plan(e,t,s,r,a,c=[]){let o=new Set(c);for(let{series:u}of t)[...u.plus,...u.minus].forEach(d=>o.add(d));if(r)for(let u of Object.values(r.area.statistics))(u??[]).forEach(d=>o.add(d));a.forEach(u=>o.add(u.statistic));let l=[...o].sort();return{key:JSON.stringify([l,t.map(u=>[u.series.id,u.series.color]),r?.figure,a,e.range.start,e.range.end,e.period]),range:e.range,period:e.period,bars:t,unit:s,lineFigure:r,lines:a,ids:l}}async _load(e){if(!this.hass)return;this._loading=e.key;let t={key:e.key,at:Date.now(),plan:e,slots:ui(e.range,e.period),rows:{},metadata:{},failed:!1};try{let s=e.lines.map(c=>c.statistic),[r,a]=await Promise.all([this.hass.callWS({type:"recorder/statistics_during_period",start_time:new Date(e.range.start).toISOString(),end_time:new Date(e.range.end+1).toISOString(),statistic_ids:e.ids,period:fe(e.period),types:["change","mean"],units:{energy:"kWh"}}),s.length?this.hass.callWS({type:"recorder/get_statistics_metadata",statistic_ids:s}):Promise.resolve([])]);t.rows=r,t.metadata=Object.fromEntries(a.map(c=>[c.statistic_id,c]))}catch{t.failed=!0}this._loading===e.key&&(this._loading=void 0,this._loaded=t)}willUpdate(e){if(!this.hass)return;(e.has("hass")||e.has("_config"))&&this._follow(),this._watchingChart||(this._watchingChart=!0,it(r=>{this._hasChart=r})),this._info===void 0&&(this._info=U()),z()&&!this._infoLoading?this._loadInfo():!this._savings&&this.isConnected&&this._info?.calculating&&!this._retryTimer&&!this._infoLoading&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),M));let t=this._savings?this._savingsPlan():this._figurePlan(),s=!this._loaded||Date.now()-this._loaded.at>us;t&&t.key!==this._loading&&(t.key!==this._loaded?.key||s&&!this._loading)&&this._load(t),e.has("_loaded")&&(this._chart=this._buildChart())}_perSlot(e){let t=this._loaded;if(!t)return[];let s=t.slots.map(()=>null);for(let r of e)St(t.rows[r],t.slots,t.plan.period).forEach((a,c)=>{a!==null&&(s[c]=(s[c]??0)+a)});return s}_barValues(e){let t=this._perSlot(e.plus),s=this._perSlot(e.minus);return t.map((r,a)=>{if(r===null&&s[a]===null)return null;let c=(r??0)-(s[a]??0),o=e.floor?Math.max(c,0):c;return e.negative?-o:o})}_lines(){let e=this._loaded;if(!e)return[];let{plan:t,slots:s}=e,r=this._fmt,a=E(this),c=this.hass?.config.currency==="EUR"?100:1,o=[];if(t.lineFigure){let{figure:l,area:u,name:d}=t.lineFigure,h=Object.fromEntries(Object.entries(u.statistics).map(([f,y])=>[f,this._perSlot(y??[])])),g=s.map((f,y)=>me(l,u,C=>h[C]?.[y]??null,null).value),m=me(l,u,()=>0,null).unit;o.push({id:`line_${l}`,name:d,color:a.line,dash:"dashed",step:m==="price"&&t.period==="hour",values:m==="price"?g.map(f=>f===null?null:f*c):g,format:f=>r.value(m==="price"?f/c:f,m)})}return t.lines.forEach((l,u)=>{let d=e.metadata[l.statistic],h=l.value??(d?.has_sum?"change":"mean"),g=d?.unit_class==="energy"?"kWh":d?.statistics_unit_of_measurement??"",m=h==="mean"?hi(e.rows[l.statistic],s,t.period):St(e.rows[l.statistic],s,t.period);o.push({id:`statistic_${u}`,name:l.name??d?.name??this.hass?.states[l.statistic]?.attributes.friendly_name??l.statistic,color:u===0&&!t.lineFigure?a.line:a.consumers[u%a.consumers.length],dash:"dotted",values:m,format:f=>`${r.number(f)}${g?` ${g}`:""}`})}),o}_buildChart(){let e=this._loaded;if(!e||e.failed)return;let t=this._localize,s=this._fmt,{plan:r}=e,a=r.bars.map(({series:u,name:d})=>({id:u.id,name:d,color:u.color,values:this._barValues(u),inTotal:!u.negative})),c=this._lines(),o={price:this.hass?.config.currency==="EUR"?"ct/kWh":`${s.currencySymbol()}/kWh`,percent:"%",per_100km:`${s.currencySymbol()}/100 km`},l=r.lineFigure&&!r.lines.length?o[me(r.lineFigure.figure,r.lineFigure.area,()=>0,null).unit]??"":"";return ii({labels:this._labels(e.slots,r.period),series:a,unit:r.unit==="money"?s.currencySymbol():r.unit==="distance"?"km":"kWh",total:t("history_total"),format:u=>r.unit==="money"?s.value(u,"money"):`${s.number(u,Math.abs(u)<10?2:1)} ${r.unit==="distance"?"km":"kWh"}`,tick:u=>s.number(u),lineTick:u=>s.number(u,Number.isInteger(u)?0:1),lines:c,lineUnit:l})}_labels(e,t){let s=l=>new Intl.DateTimeFormat(this._language,l),r=s({hour:"2-digit",minute:"2-digit",hour12:ai(this.hass?.locale)}),a=e.length>0&&new Date(e[0]).getFullYear()!==new Date(e[e.length-1]).getFullYear(),c={hour:r,day:s({day:"numeric"}),month:s(a?{month:"short",year:"2-digit"}:{month:"short"}),year:s({year:"numeric"})}[t],o={hour:r,day:s({weekday:"short",day:"numeric",month:"short"}),month:s({month:"long",year:"numeric"}),year:s({year:"numeric"})}[t];return e.map(l=>({axis:c.format(l),tooltip:t==="hour"?`${r.format(l)} \u2013 ${r.format(l+36e5)}`:o.format(l)}))}_title(){let e=this._localize;if(this._config.title)return this._config.title;if(this._savings)return e("history_title");let t=this._config.figure??"energy",s=this._info?.areas.find(a=>a.id===this._config.area);if(s)return B(e,t,s);let r=`figure.${t}`;return j(r)?e(r):e("history_title")}_note(e){let t=this._localize;if(!this.hass)return"";if(this._savings){let c=P(this.hass).map(o=>t(o.category==="pv"?"compare_pv":o.category==="wallbox"?"compare_fuel":o.heating==="oil"?"compare_oil":"compare_gas"));return c.length?t("history_savings_note",{list:new Intl.ListFormat(this._language,{type:"conjunction"}).format(c)}):""}let s=this._info?.areas.find(c=>c.id===this._config.area);if(!e||e.failed||this._config.figure!=="cost")return"";if(this._config.stack==="bill")return t("history_bill_note");let r=c=>this._perSlot(c??[]).reduce((o,l)=>o+(l??0),0),a=r(s?.statistics.solar);return a>0?t("history_cost_note",{rate:this._fmt.value(r(s?.statistics.solar_cost)/a,"price")}):t("history_cost_note_no_solar")}render(){let e=this._localize;if(!this.hass)return p``;let t=this._title();if(this._savings&&!P(this.hass).length)return p`<ha-card>
        <div class="header"><h2 class="title">${t}</h2></div>
        <p class="summary">${e(ye(this.hass))}</p>
      </ha-card>`;let s=this._savings?P(this.hass).some(h=>h.calculating):this._info?.calculating===!0,r=s?void 0:this._loaded,a=this._chart?.data.filter(h=>h.type==="bar"&&h.id!=="export").flatMap(h=>h.data.map(g=>g.value??null))??[],c=a.reduce((h,g)=>h+(g??0),0),o=a.some(h=>h),l=r?.plan.unit??"money",u=!this._savings&&this._info!==void 0&&!this._info?.areas.some(h=>h.id===this._config.area&&h.statistics[this._config.figure??"energy"]?.length),d=this._note(r);return p`<ha-card>
      <div class="header">
        <h2 class="title">${t}</h2>
        ${r&&!r.failed&&o?p`<span class="chip">${this._fmt.value(c,l)}</span>`:r?p`<span class="chip">${rt(r.plan.range,this._language)}</span>`:_}
      </div>
      ${d?p`<p class="note">${d}</p>`:_}
      ${s?p`<p class="summary">${e("calculating")}</p>`:u?p`<p class="summary">${e(this._info===null?"editor_not_loaded":"figures_unavailable")}</p>`:this._body(r,o)}
    </ha-card>`}_body(e,t){let s=this._localize;return this._hasChart===!1?p`<p class="summary">${s("history_no_chart")}</p>`:e?.failed?p`<p class="summary">${s("history_failed")}</p>`:p`<div class="chart">
      ${this._chart&&this._hasChart?p`<ha-chart-base
            .hass=${this.hass}
            .data=${this._chart.data}
            .options=${this._chart.options}
          ></ha-chart-base>`:_}
      ${e&&!t?p`<div class="empty">
            ${s(this._savings?"history_empty":"history_empty_figure")}
          </div>`:_}
    </div>`}};Se.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0},_selected:{state:!0},_loaded:{state:!0},_hasChart:{state:!0}},Se.styles=[I,R`
      .note {
        margin: 0;
        padding: var(--ha-space-1, 4px) var(--ha-space-4, 16px) 0;
        font-size: var(--ha-font-size-s, 12px);
        line-height: 16px;
        color: var(--secondary-text-color);
      }
      .chart {
        position: relative;
        min-height: ${Ke(ds)};
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
    `];function gs(n,i,e={}){let t=a=>i.areas.find(c=>c.id===a)?.statistics??{},s=i.areas.find(a=>a.kind==="grid")?.statistics??{},r=[];for(let a of n){let c=[a.savingStatistic];if(a.category==="pv"){let o=s.export?.length?s.export:[],l=o.length?s.feed_in??[]:[];r.push({name:"savings_pv",color:ce.solar,plus:c,minus:l,energy:t("solar").self_used??[]}),l.length&&r.push({name:"savings_feed_in",color:ce.export,plus:l,minus:[],energy:o})}else a.category==="heat_pump"?r.push({name:a.heating==="oil"?"savings_oil":"savings_gas",color:e.heat??ce.heat,plus:c,minus:[],energy:t("heat_pump").energy??[]}):r.push({name:"savings_fuel",color:e.car??ce.car,plus:c,minus:[],energy:t("wallbox").energy??[]})}return r}var He=class extends he{constructor(){super(...arguments);this._config={}}static getStubConfig(){return{}}static getConfigElement(){return document.createElement("electricity-lens-savings-card-editor")}setConfig(e){H(e?.collection_key),this._config=e??{},this._collectionKey=this._config.collection_key,this.requestUpdate()}get _area(){return this._info?.areas.find(e=>e.id===this._config.area)}_rows(){if(!this.hass||!this._info)return[];let e=T(this._info,E(this));return gs(P(this.hass),this._info,{heat:e.get("heat_pump"),car:e.get("wallbox")})}_ids(){if(this._config.area){let e=this._area?.statistics;return e?.alternative_cost?.length&&e.cost?.length&&e.saving?.length?[...e.alternative_cost,...e.cost,...e.saving,...e.solar_saving??[]]:[]}return this._rows().flatMap(e=>[...e.plus,...e.minus,...e.energy])}render(){let e=this._localize;if(!this.hass)return p``;let t=this._waiting();return p`<ha-card>
      <div class="header"><h2 class="title">${e("savings_title")}</h2></div>
      ${t?p`<p class="summary">${e(t)}</p>`:this._config.area?this._reckoning():this._table()}
    </ha-card>`}_reckoning(){let e=this._localize,t=this._fmt,s=this._area,r=this._sums?.values??{},a=O(r,s?.statistics.alternative_cost),c=O(r,s?.statistics.cost),o=O(r,s?.statistics.solar_saving),l=O(r,s?.statistics.saving)+o,u=P(this.hass).find(g=>g.category===s?.id)?.heating,d=s?.id==="wallbox"?"savings_instead_fuel":u==="oil"?"savings_instead_oil":"savings_instead_gas",h=Math.abs(o)>=.005;return p`<table>
        <tbody>
          <tr>
            <td class="name">${e(d)}</td>
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
            <th scope="row" class="name">${e("savings_title")}</th>
            <td>${t.value(l,"money")}</td>
          </tr>
          ${h?p`<tr class="quiet">
                <th scope="row" class="name">${e("savings_solar_part")}</th>
                <td>${t.value(o,"money")}</td>
              </tr>`:_}
        </tfoot>
      </table>`}_table(){let e=this._localize,t=this._fmt,s=this._rows(),r=this._sums?.values??{},a=o=>O(r,o.plus)-O(r,o.minus),c=s.reduce((o,l)=>o+a(l),0);return p`<table>
        <thead>
          <tr>
            <th scope="col" colspan="2" class="name">${e("savings_source")}</th>
            <th scope="col">${e("savings_energy")}</th>
            <th scope="col">${e("savings_amount")}</th>
          </tr>
        </thead>
        <tbody>
          ${s.map(o=>{let l=O(r,o.energy);return p`<tr>
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
      </table>`}};He.styles=[I,lt];var ps=["energy","statistic","entity"],ke=n=>({select:{mode:"dropdown",options:n}}),Ce=class extends A{constructor(){super(...arguments);this._requested=!1;this._label=e=>this._localize(`editor_${e.name}`);this._helper=e=>e.name==="period"?this._localize("editor_period_hint"):void 0}setConfig(e){this._config=e}get _localize(){return $(this.hass?.locale?.language??this.hass?.language??"en")}willUpdate(){this.hass&&!this._requested&&(this._requested=!0,this.hass.callWS({type:`${S}/figures`}).then(e=>{this._info=e}).catch(()=>{this._info=null}))}_schema(e){let t=this._localize,s=N(e),r=[{name:"source",selector:ke(ps.map(a=>({value:a,label:t(`source.${a}`)})))}];if(s==="energy"){let a=this._info?.areas??[],c=a.find(o=>o.id===e.area);r.push({name:"area",selector:ke(a.map(o=>({value:o.id,label:o.name})))},{name:"figure",selector:ke(c?Z(c).map(o=>({value:o,label:B(t,o,c)})):[])})}else s==="statistic"?(r.push({name:"statistic",selector:{statistic:{}}},{name:"value",selector:ke(li.map(a=>({value:a,label:t(`value.${a}`)})))}),(e.value??"change")==="mean"&&r.push({name:"secondary",selector:ke(["none","range"].map(a=>({value:a,label:t(`secondary.${a}`)})))})):r.push({name:"entity",selector:{entity:{}}});return r.push({name:"name",selector:{text:{}}}),s!=="entity"&&!(e.figure&&(le(e.figure)||ue(e.figure)))&&r.push({name:"period",selector:ke(X.map(a=>({value:a,label:t(`period.${a}`)})))}),r}_figureFrom(e,t){let s=e.source??N(t);if(s!==N(t))return s==="energy"?{area:"household",figure:"cost"}:s==="statistic"?{statistic:"",value:"change"}:{entity:""};if(s==="energy"){let r=e.area??t.area,a=this._info?.areas.find(l=>l.id===r),c=a?Z(a):[],o=c.includes(e.figure)?e.figure:c[0];return{area:r,figure:o,...t.secondary==="none"?{secondary:"none"}:{}}}if(s==="statistic"){let r={statistic:e.statistic??"",value:e.value??"change"};return r.value==="mean"&&e.secondary==="range"&&(r.secondary="range"),r}return{entity:e.entity??""}}_changed(e){if(!this._config)return;let t=e.detail.value,{area:s,figure:r,statistic:a,value:c,secondary:o,entity:l,name:u,...d}=this._config,h={...d,period:t.period??"energy_date",...this._figureFrom(t,this._config)};typeof t.name=="string"&&t.name&&(h.name=t.name),this._config=h,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:h},bubbles:!0,composed:!0}))}render(){if(!this.hass||!this._config)return p``;let e=this._config;return p`<div class="editor">
      ${N(e)==="energy"&&this._info===null?p`<p class="hint">${this._localize("editor_not_loaded")}</p>`:_}
      <ha-form
        .hass=${this.hass}
        .data=${{source:N(e),...e,value:e.value??"change",secondary:e.secondary??"none",period:e.period??"energy_date"}}
        .schema=${this._schema(e)}
        .computeLabel=${this._label}
        .computeHelper=${this._helper}
        @value-changed=${this._changed}
      ></ha-form>
    </div>`}};Ce.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0}},Ce.styles=R`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .hint {
      margin: 0;
      color: var(--secondary-text-color);
    }
  `;var Et="savings",Ne=n=>({select:{mode:"dropdown",options:n}}),Ue=class extends A{constructor(){super(...arguments);this._label=e=>this._localize(`editor_${e.name}`)}setConfig(e){this._config=e}get _localize(){return $(this.hass?.locale?.language??this.hass?.language??"en")}willUpdate(){this.hass&&this._info===void 0&&(this._info=null,this.hass.callWS({type:`${S}/figures`}).then(e=>{this._info=e}).catch(()=>{}))}_schema(){let e=this._localize,t=this._config??{type:""},s=this._info?.areas??[],r=[{name:"title",selector:{text:{}}},{name:"period",selector:Ne([...X,"all"].map(c=>({value:c,label:e(`period.${c}`)})))},{name:"area",selector:Ne([{value:Et,label:e("editor_savings")},...s.filter(c=>De(c).length).map(c=>({value:c.id,label:c.name}))])}],a=s.find(c=>c.id===t.area);if(a){let c=De(a),o=t.figure&&c.includes(t.figure)?t.figure:c[0];r.push({name:"figure",selector:Ne(c.map(l=>({value:l,label:B(e,l,a)})))},{name:"stack",selector:Ne(be(a,o).map(l=>({value:l,label:e(`stack.${l}`)})))},{name:"line",selector:Ne([{value:"none",label:e("editor_line_none")},...Rt(a).map(l=>({value:l,label:B(e,l,a)}))])},{name:"lines",selector:{statistic:{multiple:!0}}})}return r}_data(){let e=this._config??{type:""},t=this._info?.areas.find(a=>a.id===e.area),s=t?De(t):[],r=e.figure&&s.includes(e.figure)?e.figure:s[0];return{title:e.title??"",period:e.period??"energy_date",area:e.area??Et,figure:r,stack:e.stack??(t&&r?be(t,r)[0]:void 0),line:e.line??"none",lines:(e.lines??[]).map(a=>a.statistic)}}_changed(e){if(!this._config)return;let t=e.detail.value,{title:s,period:r,area:a,figure:c,stack:o,line:l,lines:u,...d}=this._config,h=d;typeof t.title=="string"&&t.title&&(h.title=t.title),h.period=t.period??"energy_date";let g=t.area;if(g&&g!==Et){h.area=g;let m=this._info?.areas.find(w=>w.id===g),f=m?De(m):[],y=f.includes(t.figure)?t.figure:f[0];y&&(h.figure=y),(m&&y?be(m,y):[]).includes(t.stack)&&(h.stack=t.stack),(m?Rt(m):[]).includes(t.line)&&(h.line=t.line);let ee=new Map((this._config.lines??[]).map(w=>[w.statistic,w])),x=(Array.isArray(t.lines)?t.lines:[]).filter(Boolean).map(w=>ee.get(w)??{statistic:w});x.length&&(h.lines=x)}this._config=h,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:h},bubbles:!0,composed:!0}))}render(){return!this.hass||!this._config?p``:p`<ha-form
      .hass=${this.hass}
      .data=${this._data()}
      .schema=${this._schema()}
      .computeLabel=${this._label}
      @value-changed=${this._changed}
    ></ha-form>`}};Ue.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0}};var fi="https://github.com/ignazhabibi/ha-electricity-lens",Tt=(n,i)=>{if(!customElements.get(n))try{customElements.define(n,i)}catch{customElements.define(n,class extends i{})}};function _i(n,i=[]){let e=()=>{n.forEach(({tag:c,card:o,editor:l})=>{Tt(c,o),l&&Tt(l.tag,l.element)}),i.forEach(({type:c,element:o})=>Tt(`ll-strategy-dashboard-${c}`,o))};e();let t=window.customElements,s=Date.now(),r=window.setInterval(()=>{let c=window.customElements!==t;c&&e(),(c||Date.now()-s>6e4)&&window.clearInterval(r)},100),a=window;a.customStrategies=a.customStrategies??[];for(let{type:c,name:o,description:l}of i)a.customStrategies.some(u=>u.type===c)||a.customStrategies.push({type:c,strategyType:"dashboard",name:o,description:l,documentationURL:fi});a.customCards=a.customCards??[];for(let{tag:c,name:o,description:l}of n)a.customCards.some(u=>u.type===c)||a.customCards.push({type:c,name:o,description:l,preview:!0,documentationURL:fi})}var Ft="all",Ve=class extends A{constructor(){super(...arguments);this._label=()=>this._localize("editor_area")}setConfig(e){this._config=e}get _localize(){return $(this.hass?.locale?.language??this.hass?.language??"en")}_changed(e){let{area:t,...s}=this._config??{},r=e.detail.value.area,a=r&&r!==Ft?{...s,area:r}:s;this._config=a,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:a},bubbles:!0,composed:!0}))}render(){if(!this.hass||!this._config)return p``;let e=this._localize,t=[{name:"area",selector:{select:{mode:"dropdown",options:[{value:Ft,label:e("editor_savings")},{value:"heat_pump",label:e("category.heat_pump")},{value:"wallbox",label:e("category.wallbox")}]}}}];return p`<ha-form
      .hass=${this.hass}
      .data=${{area:this._config.area??Ft}}
      .schema=${t}
      .computeLabel=${this._label}
      @value-changed=${this._changed}
    ></ha-form>`}};Ve.properties={hass:{attribute:!1},_config:{state:!0}};var k=(n,i={})=>({type:n.startsWith("electricity-lens")?`custom:${n}`:n,...i}),yi={grid_options:{columns:"full"}},Ae={grid_options:{columns:6}},K={grid_options:{columns:12}},vi=(n,i,e={},t)=>k("electricity-lens-figures-card",{area:n,figure:i,...t?{name:t}:{},...Ae,...e}),Be=(n,i,e,t,s=!0)=>({title:n,path:i,type:"sections",max_columns:3,sections:[{type:"grid",column_span:2,cards:[...s?[k("energy-date-selection",yi)]:[],...e.map(r=>({...yi,...r}))]}],sidebar:{sections:[{type:"grid",cards:t}]}}),ms=70;function fs(n){let i=Object.values(n.entities??{}).filter(a=>a.platform===S),e=["pv","heat_pump","wallbox"],s=i.filter(a=>a.translation_key==="saving").map(a=>n.states[a.entity_id]?.attributes.category).filter(a=>e.includes(a)),r=["today","tomorrow"].flatMap(a=>{let c=i.find(o=>o.translation_key===`forecast_${a}`)?.entity_id;return c?[{day:a,entity:c}]:[]});return{categories:s,investments:nt(n),forecasts:r}}function _s(n,i,e={categories:[],investments:[],forecasts:[]}){let t=(x,w,te={})=>vi(x,w,te,i(`figure.${w}`)),s=(x,w,te,bi={})=>vi(x,w,bi,i(te)),r=(x,w,te={})=>k(x,{title:i(w),...te}),a=x=>n.areas.find(w=>w.id===x),c=a("solar"),o=a("heat_pump"),l=a("wallbox"),u=n.areas.some(x=>x.kind==="device"),d=!!(c?.statistics.saving?.length||o||l||e.categories.length),h={period:"today"},g={line:"price",...c?{line_name:i("strategy.price_with_solar")}:{}},m=(x,w={})=>c?s(x,"price","strategy.price_with_solar",w):t(x,"price",w),f={secondary:"none"},y=(x,w={})=>k("electricity-lens-history-card",{area:x,figure:"energy",stack:"source",...g,...w}),b=x=>k("electricity-lens-breakdown-card",{area:x,by:"source",...K}),C=e.investments.flatMap(({category:x,payback:w,annualReturn:te})=>[k("electricity-lens-figures-card",{area:Ie(x),figure:"payback",name:i(`strategy.payback_${x}`),visibility:[{condition:"numeric_state",entity:w,below:100}],...Ae}),k("electricity-lens-figures-card",{area:Ie(x),figure:"annual_return",name:i(`strategy.return_${x}`),visibility:[{condition:"numeric_state",entity:te,above:-1}],...Ae})]),ee=c?.forecast?e.forecasts.map(({entity:x,day:w})=>k("gauge",{entity:x,name:i(`strategy.forecast_${w}`),min:0,max:ms,...Ae})):[],v=[];return v.push(Be(i("strategy.overview"),"now",[d?k("electricity-lens-balance-card"):y("household",h)],[...ee,s("household","cost","strategy.cost_today",h),s("household","energy","strategy.consumption_today",h),...C],!1)),v.push(Be(i("strategy.electricity"),"household",[r("energy-usage-graph","strategy.usage_graph"),...c?[r("energy-solar-graph","strategy.solar_graph")]:[],...u?[k("electricity-lens-history-card",{title:i("strategy.devices_graph"),area:"household",figure:"energy",stack:"consumer"})]:[]],[r("energy-distribution","strategy.distribution",K),b("household"),...c?[k("energy-self-sufficiency-gauge",Ae),k("energy-solar-consumed-gauge",Ae)]:[]])),v.push(Be(i("strategy.costs"),"costs",[r("electricity-lens-history-card","strategy.bill",{area:"household",figure:"cost",stack:"bill",line:"grid_price"}),...c?[r("electricity-lens-history-card","strategy.cost_with_solar",{area:"household",figure:"cost",stack:"source",...g})]:[],r("electricity-lens-history-card","strategy.cost_history",{area:"household",figure:"cost",stack:"consumer",...c?{}:g})],[t("grid","grid_price",f),m("household",f),r("electricity-lens-breakdown-card","strategy.cost_distribution",{area:"household",by:"consumer",figure:"cost",display:"bars",color_by_source:!0,...K}),...d?[k("electricity-lens-savings-card",K)]:[]])),o&&v.push(Be(i("strategy.heating"),"heating",[r("electricity-lens-history-card","figure.heat",{area:"heat_pump",figure:"heat",stack:"consumer",line:"scop",line_name:i("figure.scop")}),r("electricity-lens-history-card","strategy.usage_graph",{area:"heat_pump",figure:"energy",stack:"source"}),r("electricity-lens-history-card",c?"strategy.cost_with_solar":"figure.cost",{area:"heat_pump",figure:"cost",stack:"source",...g})],[t("heat_pump","scop",f),t("heat_pump","heat_price",f),b("heat_pump"),...at(n).length?[k("electricity-lens-heat-meters-card",K)]:[...(o.statistics.energy?.length??0)>1?[k("electricity-lens-breakdown-card",{area:"heat_pump",by:"consumer",figure:"energy",display:"bars",color_by_source:!0,...K})]:[],...(o.statistics.heat_meters?.length??0)>1?[k("electricity-lens-breakdown-card",{title:i("figure.heat"),statistics:(o.statistics.heat_meters??[]).map(x=>({statistic:x})),display:"bars",...K})]:[]],k("electricity-lens-savings-card",{area:"heat_pump",...K})])),l&&v.push(Be(i("strategy.charging"),"charging",[r("electricity-lens-history-card","strategy.charged_energy",{area:"wallbox",figure:"energy",stack:"source"}),r("electricity-lens-history-card","strategy.charging_cost",{area:"wallbox",figure:"cost",stack:"source",...g})],[t("wallbox","device_grid_price",f),m("wallbox",f),b("wallbox"),k("electricity-lens-savings-card",{area:"wallbox",...K})])),v}var ys=3e4,vs=1e3;async function bs(n){let i=n.config.state!==void 0&&n.config.state!=="RUNNING",e=Date.now()+ys;for(;;)try{return await n.callWS({type:`${S}/figures`})}catch(t){if(!i||Date.now()>=e)throw t;await new Promise(s=>setTimeout(s,vs))}}var We=class extends HTMLElement{static async generate(i,e){let t=$(e.locale?.language??e.language??"en"),s;try{s=await bs(e)}catch{return{title:t("strategy.title"),views:[{title:t("strategy.title"),cards:[{type:"markdown",content:t("strategy.not_loaded")}]}]}}return{title:t("strategy.title"),views:_s(s,t,fs(e))}}};We.noEditor=!0;_i([{tag:"electricity-lens-balance-card",card:$e,name:"Electricity Lens economics",description:"What your PV plant, heat pump, and electric car have saved, against what they cost."},{tag:"electricity-lens-savings-card",card:He,name:"Electricity Lens savings",description:"What solar power, the heat pump, and the electric car saved in the selected period, as a table, or one area's saving reckoned up. Follows the energy date selection.",editor:{tag:"electricity-lens-savings-card-editor",element:Ve}},{tag:"electricity-lens-heat-meters-card",card:Oe,name:"Electricity Lens heat meters",description:"Heat, electricity, and seasonal COP of each of the heat pump's meters in the selected period. Follows the energy date selection."},{tag:"electricity-lens-history-card",card:Se,name:"Electricity Lens history",description:"Savings, consumption, or costs per period as bars, stacked by source or consumer, with lines. Follows the energy date selection.",editor:{tag:"electricity-lens-history-card-editor",element:Ue}},{tag:"electricity-lens-figures-card",card:ve,name:"Electricity Lens key figures",description:"One key figure for a period: costs, solar share, cheap grid power, savings, or any statistic or entity.",editor:{tag:"electricity-lens-figures-card-editor",element:Ce}},{tag:"electricity-lens-breakdown-card",card:xe,name:"Electricity Lens breakdown",description:"Shares for a period as a ring or bars: the electricity mix, consumption or costs by consumer, or any statistics.",editor:{tag:"electricity-lens-breakdown-card-editor",element:ze}}],[{type:"electricity-lens",element:We,name:"Electricity Lens",description:"A finished electricity dashboard with costs, electricity mix, solar, heat pump, car, and the balance."}]);
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
