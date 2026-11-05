var He=globalThis,Ne=He.ShadowRoot&&(He.ShadyCSS===void 0||He.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,rt=Symbol(),Rt=new WeakMap,we=class{constructor(i,e,t){if(this._$cssResult$=!0,t!==rt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=i,this.t=e}get styleSheet(){let i=this.o,e=this.t;if(Ne&&i===void 0){let t=e!==void 0&&e.length===1;t&&(i=Rt.get(e)),i===void 0&&((this.o=i=new CSSStyleSheet).replaceSync(this.cssText),t&&Rt.set(e,i))}return i}toString(){return this.cssText}},Ue=n=>new we(typeof n=="string"?n:n+"",void 0,rt),A=(n,...i)=>{let e=n.length===1?n[0]:i.reduce((t,s,r)=>t+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+n[r+1],n[0]);return new we(e,n,rt)},Tt=(n,i)=>{if(Ne)n.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of i){let t=document.createElement("style"),s=He.litNonce;s!==void 0&&t.setAttribute("nonce",s),t.textContent=e.cssText,n.appendChild(t)}},nt=Ne?n=>n:n=>n instanceof CSSStyleSheet?(i=>{let e="";for(let t of i.cssRules)e+=t.cssText;return Ue(e)})(n):n;var{is:ys,defineProperty:vs,getOwnPropertyDescriptor:bs,getOwnPropertyNames:xs,getOwnPropertySymbols:ws,getPrototypeOf:$s}=Object,Ve=globalThis,Ft=Ve.trustedTypes,Ss=Ft?Ft.emptyScript:"",Cs=Ve.reactiveElementPolyfillSupport,$e=(n,i)=>n,at={toAttribute(n,i){switch(i){case Boolean:n=n?Ss:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,i){let e=n;switch(i){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},zt=(n,i)=>!ys(n,i),Pt={attribute:!0,type:String,converter:at,reflect:!1,useDefault:!1,hasChanged:zt};Symbol.metadata??=Symbol("metadata"),Ve.litPropertyMetadata??=new WeakMap;var V=class extends HTMLElement{static addInitializer(i){this._$Ei(),(this.l??=[]).push(i)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(i,e=Pt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(i)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(i,e),!e.noAccessor){let t=Symbol(),s=this.getPropertyDescriptor(i,t,e);s!==void 0&&vs(this.prototype,i,s)}}static getPropertyDescriptor(i,e,t){let{get:s,set:r}=bs(this.prototype,i)??{get(){return this[e]},set(a){this[e]=a}};return{get:s,set(a){let o=s?.call(this);r?.call(this,a),this.requestUpdate(i,o,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(i){return this.elementProperties.get(i)??Pt}static _$Ei(){if(this.hasOwnProperty($e("elementProperties")))return;let i=$s(this);i.finalize(),i.l!==void 0&&(this.l=[...i.l]),this.elementProperties=new Map(i.elementProperties)}static finalize(){if(this.hasOwnProperty($e("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty($e("properties"))){let e=this.properties,t=[...xs(e),...ws(e)];for(let s of t)this.createProperty(s,e[s])}let i=this[Symbol.metadata];if(i!==null){let e=litPropertyMetadata.get(i);if(e!==void 0)for(let[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let s=this._$Eu(e,t);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(i){let e=[];if(Array.isArray(i)){let t=new Set(i.flat(1/0).reverse());for(let s of t)e.unshift(nt(s))}else i!==void 0&&e.push(nt(i));return e}static _$Eu(i,e){let t=e.attribute;return t===!1?void 0:typeof t=="string"?t:typeof i=="string"?i.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(i=>this.enableUpdating=i),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(i=>i(this))}addController(i){(this._$EO??=new Set).add(i),this.renderRoot!==void 0&&this.isConnected&&i.hostConnected?.()}removeController(i){this._$EO?.delete(i)}_$E_(){let i=new Map,e=this.constructor.elementProperties;for(let t of e.keys())this.hasOwnProperty(t)&&(i.set(t,this[t]),delete this[t]);i.size>0&&(this._$Ep=i)}createRenderRoot(){let i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Tt(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(i=>i.hostConnected?.())}enableUpdating(i){}disconnectedCallback(){this._$EO?.forEach(i=>i.hostDisconnected?.())}attributeChangedCallback(i,e,t){this._$AK(i,t)}_$ET(i,e){let t=this.constructor.elementProperties.get(i),s=this.constructor._$Eu(i,t);if(s!==void 0&&t.reflect===!0){let r=(t.converter?.toAttribute!==void 0?t.converter:at).toAttribute(e,t.type);this._$Em=i,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(i,e){let t=this.constructor,s=t._$Eh.get(i);if(s!==void 0&&this._$Em!==s){let r=t.getPropertyOptions(s),a=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:at;this._$Em=s;let o=a.fromAttribute(e,r.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(i,e,t,s=!1,r){if(i!==void 0){let a=this.constructor;if(s===!1&&(r=this[i]),t??=a.getPropertyOptions(i),!((t.hasChanged??zt)(r,e)||t.useDefault&&t.reflect&&r===this._$Ej?.get(i)&&!this.hasAttribute(a._$Eu(i,t))))return;this.C(i,e,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(i,e,{useDefault:t,reflect:s,wrapped:r},a){t&&!(this._$Ej??=new Map).has(i)&&(this._$Ej.set(i,a??e??this[i]),r!==!0||a!==void 0)||(this._$AL.has(i)||(this.hasUpdated||t||(e=void 0),this._$AL.set(i,e)),s===!0&&this._$Em!==i&&(this._$Eq??=new Set).add(i))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let i=this.scheduleUpdate();return i!=null&&await i,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,r]of this._$Ep)this[s]=r;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[s,r]of t){let{wrapped:a}=r,o=this[s];a!==!0||this._$AL.has(s)||o===void 0||this.C(s,void 0,r,o)}}let i=!1,e=this._$AL;try{i=this.shouldUpdate(e),i?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(t){throw i=!1,this._$EM(),t}i&&this._$AE(e)}willUpdate(i){}_$AE(i){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(i)),this.updated(i)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(i){return!0}update(i){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(i){}firstUpdated(i){}};V.elementStyles=[],V.shadowRootOptions={mode:"open"},V[$e("elementProperties")]=new Map,V[$e("finalized")]=new Map,Cs?.({ReactiveElement:V}),(Ve.reactiveElementVersions??=[]).push("2.1.2");var ct=globalThis,Lt=n=>n,Be=ct.trustedTypes,Mt=Be?Be.createPolicy("lit-html",{createHTML:n=>n}):void 0,lt="$lit$",B=`lit$${Math.random().toFixed(9).slice(2)}$`,ut="?"+B,ks=`<${ut}>`,te=document,Ce=()=>te.createComment(""),ke=n=>n===null||typeof n!="object"&&typeof n!="function",dt=Array.isArray,Ut=n=>dt(n)||typeof n?.[Symbol.iterator]=="function",ot=`[ 	
\f\r]`,Se=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Dt=/-->/g,It=/>/g,X=RegExp(`>|${ot}(?:([^\\s"'>=/]+)(${ot}*=${ot}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ot=/'/g,Ht=/"/g,Vt=/^(?:script|style|textarea|title)$/i,ht=n=>(i,...e)=>({_$litType$:n,strings:i,values:e}),p=ht(1),bi=ht(2),xi=ht(3),se=Symbol.for("lit-noChange"),y=Symbol.for("lit-nothing"),Nt=new WeakMap,ee=te.createTreeWalker(te,129);function Bt(n,i){if(!dt(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return Mt!==void 0?Mt.createHTML(i):i}var Wt=(n,i)=>{let e=n.length-1,t=[],s,r=i===2?"<svg>":i===3?"<math>":"",a=Se;for(let o=0;o<e;o++){let l=n[o],c,u,d=-1,h=0;for(;h<l.length&&(a.lastIndex=h,u=a.exec(l),u!==null);)h=a.lastIndex,a===Se?u[1]==="!--"?a=Dt:u[1]!==void 0?a=It:u[2]!==void 0?(Vt.test(u[2])&&(s=RegExp("</"+u[2],"g")),a=X):u[3]!==void 0&&(a=X):a===X?u[0]===">"?(a=s??Se,d=-1):u[1]===void 0?d=-2:(d=a.lastIndex-u[2].length,c=u[1],a=u[3]===void 0?X:u[3]==='"'?Ht:Ot):a===Ht||a===Ot?a=X:a===Dt||a===It?a=Se:(a=X,s=void 0);let m=a===X&&n[o+1].startsWith("/>")?" ":"";r+=a===Se?l+ks:d>=0?(t.push(c),l.slice(0,d)+lt+l.slice(d)+B+m):l+B+(d===-2?o:m)}return[Bt(n,r+(n[e]||"<?>")+(i===2?"</svg>":i===3?"</math>":"")),t]},Ae=class n{constructor({strings:i,_$litType$:e},t){let s;this.parts=[];let r=0,a=0,o=i.length-1,l=this.parts,[c,u]=Wt(i,e);if(this.el=n.createElement(c,t),ee.currentNode=this.el.content,e===2||e===3){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(s=ee.nextNode())!==null&&l.length<o;){if(s.nodeType===1){if(s.hasAttributes())for(let d of s.getAttributeNames())if(d.endsWith(lt)){let h=u[a++],m=s.getAttribute(d).split(B),g=/([.?@])?(.*)/.exec(h);l.push({type:1,index:r,name:g[2],strings:m,ctor:g[1]==="."?Ge:g[1]==="?"?je:g[1]==="@"?Ke:re}),s.removeAttribute(d)}else d.startsWith(B)&&(l.push({type:6,index:r}),s.removeAttribute(d));if(Vt.test(s.tagName)){let d=s.textContent.split(B),h=d.length-1;if(h>0){s.textContent=Be?Be.emptyScript:"";for(let m=0;m<h;m++)s.append(d[m],Ce()),ee.nextNode(),l.push({type:2,index:++r});s.append(d[h],Ce())}}}else if(s.nodeType===8)if(s.data===ut)l.push({type:2,index:r});else{let d=-1;for(;(d=s.data.indexOf(B,d+1))!==-1;)l.push({type:7,index:r}),d+=B.length-1}r++}}static createElement(i,e){let t=te.createElement("template");return t.innerHTML=i,t}};function ie(n,i,e=n,t){if(i===se)return i;let s=t!==void 0?e._$Co?.[t]:e._$Cl,r=ke(i)?void 0:i._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),r===void 0?s=void 0:(s=new r(n),s._$AT(n,e,t)),t!==void 0?(e._$Co??=[])[t]=s:e._$Cl=s),s!==void 0&&(i=ie(n,s._$AS(n,i.values),s,t)),i}var We=class{constructor(i,e){this._$AV=[],this._$AN=void 0,this._$AD=i,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(i){let{el:{content:e},parts:t}=this._$AD,s=(i?.creationScope??te).importNode(e,!0);ee.currentNode=s;let r=ee.nextNode(),a=0,o=0,l=t[0];for(;l!==void 0;){if(a===l.index){let c;l.type===2?c=new ce(r,r.nextSibling,this,i):l.type===1?c=new l.ctor(r,l.name,l.strings,this,i):l.type===6&&(c=new Ye(r,this,i)),this._$AV.push(c),l=t[++o]}a!==l?.index&&(r=ee.nextNode(),a++)}return ee.currentNode=te,s}p(i){let e=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(i,t,e),e+=t.strings.length-2):t._$AI(i[e])),e++}},ce=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(i,e,t,s){this.type=2,this._$AH=y,this._$AN=void 0,this._$AA=i,this._$AB=e,this._$AM=t,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let i=this._$AA.parentNode,e=this._$AM;return e!==void 0&&i?.nodeType===11&&(i=e.parentNode),i}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(i,e=this){i=ie(this,i,e),ke(i)?i===y||i==null||i===""?(this._$AH!==y&&this._$AR(),this._$AH=y):i!==this._$AH&&i!==se&&this._(i):i._$litType$!==void 0?this.$(i):i.nodeType!==void 0?this.T(i):Ut(i)?this.k(i):this._(i)}O(i){return this._$AA.parentNode.insertBefore(i,this._$AB)}T(i){this._$AH!==i&&(this._$AR(),this._$AH=this.O(i))}_(i){this._$AH!==y&&ke(this._$AH)?this._$AA.nextSibling.data=i:this.T(te.createTextNode(i)),this._$AH=i}$(i){let{values:e,_$litType$:t}=i,s=typeof t=="number"?this._$AC(i):(t.el===void 0&&(t.el=Ae.createElement(Bt(t.h,t.h[0]),this.options)),t);if(this._$AH?._$AD===s)this._$AH.p(e);else{let r=new We(s,this),a=r.u(this.options);r.p(e),this.T(a),this._$AH=r}}_$AC(i){let e=Nt.get(i.strings);return e===void 0&&Nt.set(i.strings,e=new Ae(i)),e}k(i){dt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,t,s=0;for(let r of i)s===e.length?e.push(t=new n(this.O(Ce()),this.O(Ce()),this,this.options)):t=e[s],t._$AI(r),s++;s<e.length&&(this._$AR(t&&t._$AB.nextSibling,s),e.length=s)}_$AR(i=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);i!==this._$AB;){let t=Lt(i).nextSibling;Lt(i).remove(),i=t}}setConnected(i){this._$AM===void 0&&(this._$Cv=i,this._$AP?.(i))}},re=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(i,e,t,s,r){this.type=1,this._$AH=y,this._$AN=void 0,this.element=i,this.name=e,this._$AM=s,this.options=r,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=y}_$AI(i,e=this,t,s){let r=this.strings,a=!1;if(r===void 0)i=ie(this,i,e,0),a=!ke(i)||i!==this._$AH&&i!==se,a&&(this._$AH=i);else{let o=i,l,c;for(i=r[0],l=0;l<r.length-1;l++)c=ie(this,o[t+l],e,l),c===se&&(c=this._$AH[l]),a||=!ke(c)||c!==this._$AH[l],c===y?i=y:i!==y&&(i+=(c??"")+r[l+1]),this._$AH[l]=c}a&&!s&&this.j(i)}j(i){i===y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,i??"")}},Ge=class extends re{constructor(){super(...arguments),this.type=3}j(i){this.element[this.name]=i===y?void 0:i}},je=class extends re{constructor(){super(...arguments),this.type=4}j(i){this.element.toggleAttribute(this.name,!!i&&i!==y)}},Ke=class extends re{constructor(i,e,t,s,r){super(i,e,t,s,r),this.type=5}_$AI(i,e=this){if((i=ie(this,i,e,0)??y)===se)return;let t=this._$AH,s=i===y&&t!==y||i.capture!==t.capture||i.once!==t.once||i.passive!==t.passive,r=i!==y&&(t===y||s);s&&this.element.removeEventListener(this.name,this,t),r&&this.element.addEventListener(this.name,this,i),this._$AH=i}handleEvent(i){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,i):this._$AH.handleEvent(i)}},Ye=class{constructor(i,e,t){this.element=i,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(i){ie(this,i)}},Gt={M:lt,P:B,A:ut,C:1,L:Wt,R:We,D:Ut,V:ie,I:ce,H:re,N:je,U:Ke,B:Ge,F:Ye},As=ct.litHtmlPolyfillSupport;As?.(Ae,ce),(ct.litHtmlVersions??=[]).push("3.3.3");var jt=(n,i,e)=>{let t=e?.renderBefore??i,s=t._$litPart$;if(s===void 0){let r=e?.renderBefore??null;t._$litPart$=s=new ce(i.insertBefore(Ce(),r),r,void 0,e??{})}return s._$AI(n),s};var gt=globalThis,C=class extends V{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let i=super.createRenderRoot();return this.renderOptions.renderBefore??=i.firstChild,i}update(i){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(i),this._$Do=jt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return se}};C._$litElement$=!0,C.finalized=!0,gt.litElementHydrateSupport?.({LitElement:C});var Es=gt.litElementPolyfillSupport;Es?.({LitElement:C});(gt.litElementVersions??=[]).push("4.2.2");var Kt=n=>(...i)=>({_$litDirective$:n,values:i}),Je=class{constructor(i){}get _$AU(){return this._$AM._$AU}_$AT(i,e,t){this._$Ct=i,this._$AM=e,this._$Ci=t}_$AS(i,e){return this.update(i,e)}update(i,e){return this.render(...e)}};var{I:Di}=Gt;var Rs={},Yt=(n,i=Rs)=>n._$AH=i;var Jt=Kt(class extends Je{constructor(){super(...arguments),this.key=y}render(n,i){return this.key=n,i}update(n,[i,e]){return i!==this.key&&(Yt(n),this.key=i),e}});var Zt;function Ts(){if(customElements.get("ha-chart-base"))return Promise.resolve(!0);let n=window.loadCardHelpers;return n?(Zt??=(async()=>{try{(await n()).createCardElement({type:"statistics-graph",entities:[]})}catch{}let i=new Promise(e=>setTimeout(()=>e(!1),1e4));return Promise.race([customElements.whenDefined("ha-chart-base").then(()=>!0),i])})(),Zt):Promise.resolve(!1)}function Ze(n){Ts().then(n),customElements.whenDefined("ha-chart-base").then(()=>n(!0))}var qt=n=>Math.round(n*255).toString(16).padStart(2,"0");function pt(n,i){let e=n.trim();if(/^#[0-9a-f]{6}$/i.test(e))return e+qt(i);if(/^#[0-9a-f]{3}$/i.test(e))return`#${[...e.slice(1)].map(s=>s+s).join("")}${qt(i)}`;let t=e.match(/^rgba?\(([^)]+)\)/i);if(t){let[s,r,a]=t[1].split(/[ ,/]+/).filter(Boolean);return`rgba(${s}, ${r}, ${a}, ${i})`}return e}var Ee=n=>n.replace(/[&<>"']/g,i=>`&#${i.charCodeAt(0)};`),mt=n=>`<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${n}"></span>`;function Qt(n){if(n<=0)return 1;let i=10**Math.floor(Math.log10(n)),e=n/i;return([1,2,2.5,5,10].find(s=>e<=s*(1+1e-9))??10)*i}var le=n=>Number(n.toFixed(10));function Fs(n,i){if(n.min>=0&&i.min>=0)return;let e=Qt((n.max-n.min)/6),t=Math.max(Math.ceil(le(n.max/e)),i.max>0?1:0),s=Math.max(Math.ceil(le(-n.min/e)),i.min<0?1:0),r=Qt(Math.max(t?i.max/t:0,s?-i.min/s:0));return{bar:{min:le(-s*e),max:le(t*e),interval:e},line:{min:le(-s*r),max:le(t*r),interval:r}}}function Xt(n){let i=n.lines??[],e=n.series.map((u,d)=>({id:u.id,type:"bar",name:u.name,stack:"savings",cursor:"default",barMaxWidth:50,color:pt(u.color,.5),itemStyle:{borderColor:u.color},data:u.values.map((h,m)=>{let g=n.series.slice(d+1).every(f=>Math.sign(f.values[m]??0)!==Math.sign(h??0));return{value:h,itemStyle:h?g?{borderRadius:h>0?[4,4,0,0]:[0,0,4,4]}:void 0:{borderWidth:0}}})})),t=i.map(u=>({id:u.id,type:"line",name:u.name,yAxisIndex:1,color:u.color,symbol:"none",showSymbol:!1,step:u.step?"middle":!1,lineStyle:{width:1.5,type:u.dash??"dashed",color:u.color},z:1,connectNulls:!0,data:u.values})),s=[...e,...t],r=new Map(i.map(u=>[u.name,u.format])),a=u=>{let d=Array.isArray(u)?u:[u],h=document.createElement("div");if(!d.length)return h;let m=_=>r.has(_.seriesName??""),g=d.filter(_=>_.value&&!m(_)),f=d.filter(_=>m(_)&&_.value!==null&&_.value!==void 0),x=g.map(_=>`${mt(String(_.color??""))}${Ee(_.seriesName??"")}: ${n.format(_.value??0)}`),v=f.map(_=>`${mt(String(_.color??""))}${Ee(_.seriesName??"")}: ${r.get(_.seriesName??"")?.(_.value??0)??""}`),k=new Set(n.series.filter(_=>_.inTotal===!1).map(_=>_.name)),I=g.filter(_=>!k.has(_.seriesName??"")).reduce((_,b)=>_+(b.value??0),0);return h.innerHTML=`<b>${Ee(n.labels[d[0].dataIndex]?.tooltip??"")}</b>`+(x.length?`<br>${x.join("<br>")}`:"")+(g.length>1?`<br><b>${Ee(n.total)}: ${n.format(I)}</b>`:"")+(v.length?`<br>${v.join("<br>")}`:""),h},o={type:"value",name:n.unit,nameGap:2,nameTextStyle:{align:"left"},axisLabel:{formatter:n.tick},splitLine:{show:!0}},l={type:"value",name:n.lineUnit??"",nameGap:2,nameTextStyle:{align:"right"},axisLabel:{formatter:n.lineTick??n.tick},splitLine:{show:!1}};if(i.length){let u=n.labels.map((g,f)=>{let x=n.series.map(v=>v.values[f]??0);return{up:x.filter(v=>v>0).reduce((v,k)=>v+k,0),down:x.filter(v=>v<0).reduce((v,k)=>v+k,0)}}),d=i.flatMap(g=>g.values.filter(f=>f!==null)),h=Math.min(0,...d),m=Fs({min:Math.min(0,...u.map(g=>g.down)),max:Math.max(0,...u.map(g=>g.up))},{min:h,max:Math.max(0,...d)});if(m){Object.assign(o,m.bar),Object.assign(l,m.line);let g=n.lineTick??n.tick;h>=0&&(l.axisLabel={formatter:f=>f<0?"":g(f)})}}let c={xAxis:{type:"category",data:n.labels.map(u=>u.axis),axisTick:{show:!1}},yAxis:i.length?[o,l]:o,grid:{top:15,bottom:0,left:1,right:1,containLabel:!0},legend:{show:!0,type:"custom",data:[...n.series,...i].map(u=>({id:u.id,name:u.name}))},tooltip:{trigger:"axis",axisPointer:{type:"shadow"},formatter:a}};return{data:s,options:c}}function ft(n){let i=n.reduce((e,t)=>e+Math.max(0,t),0);return n.map(e=>i>0?Math.max(0,e)/i*100:0)}function es(n){let i=n.items.map(c=>n.hidden.has(c.id)?0:c.value),e=ft(i),t=i.reduce((c,u)=>c+Math.max(0,u),0),s=[],r=-Math.PI/2;for(let c of e){let u=r+c/100*2*Math.PI;s.push([r,u]),r=u}let a=c=>{let u=Math.min(90,c.getWidth()/2-8,c.getHeight()/2-8);return{cx:c.getWidth()/2,cy:c.getHeight()/2,r:u,r0:u*40/70}},o=n.items.map((c,u)=>({id:c.id,type:"custom",name:c.name,coordinateSystem:"none",cursor:"default",color:pt(c.color,.5),data:[[i[u],s[u][0],s[u][1],e[u]]],renderItem:(d,h)=>{let m=h.value(1),g=h.value(2);if(!(g-m>0))return null;let f=a(h),x=[{type:"sector",shape:{...f,startAngle:m,endAngle:g,cornerRadius:4},style:{fill:pt(c.color,.5),stroke:c.color,lineWidth:1}}];if(g-m>=15*Math.PI/180){let v=(m+g)/2,k=Math.cos(v)>=0,I=[f.cx+Math.cos(v)*f.r,f.cy+Math.sin(v)*f.r],_=[f.cx+Math.cos(v)*(f.r+10),f.cy+Math.sin(v)*(f.r+10)],b=[_[0]+(k?10:-10),_[1]];x.push({type:"polyline",silent:!0,shape:{points:[I,_,b]},style:{stroke:c.color,fill:"none"}},{type:"text",silent:!0,x:b[0]+(k?4:-4),y:b[1],style:{text:`${c.name}
${n.percent(h.value(3))}`,fill:n.labelColor,fontSize:12,lineHeight:16,align:k?"left":"right",verticalAlign:"middle"}})}return{type:"group",children:x}}}));return o.push({id:"total",type:"custom",coordinateSystem:"none",silent:!0,tooltip:{show:!1},data:[[t]],renderItem:(c,u)=>{let d=a(u);return{type:"text",x:d.cx,y:d.cy,style:{text:`${n.total}
${n.format(u.value(0))}`,fill:n.centerColor,fontSize:14,lineHeight:24,fontWeight:"bold",align:"center",verticalAlign:"middle"}}}}),{data:o,options:{xAxis:{show:!1},yAxis:{show:!1},legend:{show:!1},tooltip:{show:!0,trigger:"item",formatter:c=>{let u=n.items.findIndex(m=>m.id===c.seriesId);if(u<0)return"";let d=n.items[u],h=document.createElement("div");return h.innerHTML=`<b>${Ee(d.name)}</b><br>${mt(d.color)}${n.format(c.value?.[0]??i[u])} (${n.percent(c.value?.[3]??e[u])})`,h}}}}}var ne={solar:"var(--energy-solar-color, #ff9800)",grid:"var(--energy-grid-consumption-color, #488fc2)",cheap:"color-mix(in srgb, var(--energy-grid-consumption-color, #488fc2) 55%, #fff)",expensive:"color-mix(in srgb, var(--energy-grid-consumption-color, #488fc2) 70%, #000)",export:"var(--energy-grid-return-color, #8353d1)",heat:"var(--graph-color-30, var(--color-30, #bf3947))",car:"var(--energy-non-fossil-color, #0f9d58)"},ts=["#4269d0","#f4bd4a","#ff725c","#6cc5b0","#a463f2","#ff8ab7","#9c6b4e","#97bbf5","#01ab63","#094bad","#c99000","#d84f3e"];function Ps(n){let i=n.trim(),e=/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(i)?.[1];if(e){let s=e.length===3?[...e].map(r=>r+r).join(""):e;return[0,2,4].map(r=>parseInt(s.slice(r,r+2),16))}let t=/^rgba?\(([^)]+)\)/i.exec(i)?.[1];if(t){let[s,r,a]=t.split(/[ ,/]+/).filter(Boolean).map(Number);if([s,r,a].every(Number.isFinite))return[s,r,a]}}var zs=([n,i,e])=>`#${[n,i,e].map(t=>Math.round(Math.min(Math.max(t,0),255)).toString(16).padStart(2,"0")).join("")}`;function ss(n,i,e){let t=Ps(n);if(!t)return n;let s=i==="white"?255:0;return zs(t.map(r=>r*e+s*(1-e)))}function E(n){let i=getComputedStyle(n),e=(r,a)=>i.getPropertyValue(r).trim()||a,t=e("--energy-grid-consumption-color","#488fc2"),s=Array.from({length:54},(r,a)=>{let o=a+1;return i.getPropertyValue(`--graph-color-${o}`).trim()||i.getPropertyValue(`--color-${o}`).trim()||ts[a%ts.length]});return{solar:e("--energy-solar-color","#ff9800"),grid:t,cheap:ss(t,"white",.55),expensive:ss(t,"black",.7),export:e("--energy-grid-return-color","#8353d1"),standing:e("--electricity-lens-standing-charge-color","#a1887f"),heat:i.getPropertyValue("--graph-color-30").trim()||e("--color-30","#bf3947"),car:e("--energy-non-fossil-color","#0f9d58"),other:i.getPropertyValue("--history-unknown-color").trim()||e("--disabled-color","#bdbdbd"),line:e("--secondary-text-color","#727272"),consumers:s}}function T(n,i){let e=new Map,t=new Map,s=0;for(let r of n.areas)if(r.kind==="other")e.set(r.id,i.other);else if(r.kind==="device"){let a=i.consumers[s++%i.consumers.length];e.set(r.id,a);let o=r.statistics.energy?.[0];o&&t.set(o,a)}for(let r of n.areas)if(r.kind==="category")if(r.id==="heat_pump")e.set(r.id,i.heat);else{let o=(r.statistics.energy??[]).map(c=>t.get(c)).filter(Boolean),l=r.id==="wallbox"?i.car:i.grid;e.set(r.id,o[o.length-1]??l)}return e}var Ls=n=>!!n&&typeof n.subscribe=="function";function Ms(n){let i=location.pathname.split("/")[1]??"",e=n;for(let t of[`_energy_${i}`,"_energy"])if(Ls(e[t]))return e[t]}var Ds=()=>new Date().setHours(24,0,0,0)-1;function Y(n,i){let e,t,s=0,r=()=>{let a=Ms(n);if(a){e=a.subscribe(o=>i({start:new Date(o.start).getTime(),end:o.end?new Date(o.end).getTime():Ds()}));return}s+=1,s===2&&i(null),s<20&&(t=window.setTimeout(r,500))};return r(),()=>{window.clearTimeout(t),e?.()}}var Is={comma_decimal:"en-US",decimal_comma:"de",space_comma:"fr",quote_decimal:"de-CH"};function F(n,i){let e=n?.number_format,t=e==="system"?void 0:Is[e??""]??n?.language??"en";return new Intl.NumberFormat(t,{...i,...e==="none"?{useGrouping:!1}:{}})}function is(n){switch(n?.time_format){case"am_pm":return!0;case"24":return!1;case"system":return new Intl.DateTimeFormat(void 0,{hour:"numeric"}).resolvedOptions().hour12;default:return}}function rs(n){let i=/^([-−+]?[\d.,'’\u00a0\u202f ]*\d)[\u00a0\u202f ](.+)$/.exec(n);return i?[i[1],i[2]]:[n,""]}function J(n,i){let e=(r,a)=>{let o=Math.abs(r),l=a??(o<10?2:o<100?1:0);return F(n,{maximumFractionDigits:l,minimumFractionDigits:a??0}).format(r)};return{number:e,value:(r,a)=>{switch(a){case"energy":return`${e(r,Math.abs(r)<100?1:0)} kWh`;case"money":{let o=Math.abs(r)<100;return F(n,{style:"currency",currency:i,maximumFractionDigits:o?2:0,minimumFractionDigits:o?2:0}).format(r)}case"price":return i==="EUR"?`${e(r*100,1)} ct/kWh`:`${F(n,{style:"currency",currency:i,maximumFractionDigits:3}).format(r)}/kWh`;case"percent":return F(n,{style:"percent",maximumFractionDigits:0}).format(r/100);case"number":return e(r,Math.abs(r)<10?2:Math.abs(r)<100?1:0);case"distance":return`${e(r,Math.abs(r)<100?1:0)} km`;case"per_100km":return`${F(n,{style:"currency",currency:i,maximumFractionDigits:2,minimumFractionDigits:2}).format(r)}/100 km`}},currencySymbol:()=>F(n,{style:"currency",currency:i}).formatToParts(0).find(r=>r.type==="currency")?.value??""}}var _t={energy:["energy"],cost:["cost"],bill:["cost","import_cost","feed_in"],grid_price:["import_cost","energy"],device_grid_price:["cost","solar_cost","energy","solar"],price:["cost","energy","solar"],solar_share:["solar","energy"],cheap_share:["cheap","solar","energy"],expensive_share:["expensive","solar","energy"],cheap_saving:["cheap_saving"],self_consumption:["self_used","energy"],export:["export"],saving:["saving"],heat:["heat"],alternative_cost:["alternative_cost"],scop:["heat","energy"],heat_price:["cost","heat"],distance:["distance"],cost_per_100km:["cost","distance"],forecast_today:[],forecast_tomorrow:[]},Os={energy:["solar","export"],cost:["energy","solar","import_cost","feed_in"],saving:["alternative_cost","cost"],heat:["energy"],distance:["energy"]},Hs=Object.keys(_t),Qe=n=>n==="forecast_today"||n==="forecast_tomorrow";function Z(n){return Hs.filter(i=>Qe(i)?n.forecast===!0:_t[i].every(e=>n.statistics[e]?.length))}function ns(n,i){return[..._t[i],...Os[i]??[]].flatMap(e=>n.statistics[e]??[])}var qe=(n,i)=>i>0?n/i*100:null;function ue(n,i,e,t){let s=e("energy"),r=e("solar"),a=c=>({value:c,unit:"energy"}),o=c=>({value:c,unit:"money"}),l=c=>({value:c,unit:"number"});switch(n){case"energy":{if(s!==null&&r!==null&&s>0){if(i.kind==="household")return{value:s,unit:"energy",line:{key:"line_energy_parts",values:{grid:a(Math.max(s-r,0)),solar:a(r)}}};let u=qe(r,s)??0;return{value:s,unit:"energy",line:{key:"line_solar_part",values:{percent:{value:u,unit:"percent"}}}}}let c=e("export");return i.kind==="grid"&&c!==null?{value:s,unit:"energy",line:{key:"line_exported",values:{energy:a(c)}}}:{value:s,unit:"energy"}}case"cost":{let c=e("cost");if(c!==null&&s&&r!==null)return{value:c,unit:"money",line:{key:"line_average_price",values:{price:{value:c/s,unit:"price"}}}};let u=e("import_cost"),d=e("feed_in");if(c!==null&&u!==null&&d!==null){let h=c-u+d;return{value:c,unit:"money",line:{key:Math.abs(h)<.005?"line_bill_no_charge":"line_bill",values:{imported:o(u),feed_in:o(d),charge:o(h)}}}}return c!==null&&s!==null&&i.kind==="grid"?{value:c,unit:"money",line:{key:"line_for_import",values:{energy:a(s)}}}:{value:c,unit:"money"}}case"bill":{let c=e("cost"),u=e("import_cost"),d=e("feed_in");if(c===null||u===null||d===null)return{value:null,unit:"money"};let h=c-u+d;return{value:u+h,unit:"money",line:Math.abs(h)<.005?void 0:{key:"line_bill_parts",values:{imported:o(u),charge:o(h)}}}}case"grid_price":{let c=e("import_cost");return c===null||!s?{value:null,unit:"price"}:{value:c/s,unit:"price",line:{key:"line_cost_for",values:{cost:o(c),energy:a(s)}}}}case"device_grid_price":{let c=e("cost"),u=e("solar_cost");if(c===null||u===null||s===null||r===null)return{value:null,unit:"price"};let d=s-r;if(d<=0)return{value:null,unit:"price"};let h=c-u;return{value:h/d,unit:"price",line:{key:"line_cost_for",values:{cost:o(h),energy:a(d)}}}}case"cheap_saving":return{value:e("cheap_saving"),unit:"money",line:{key:"line_against_normal",values:{}}};case"price":{let c=e("cost");return c===null||!s?{value:null,unit:"price"}:{value:c/s,unit:"price",line:{key:"line_cost_for",values:{cost:{value:c,unit:"money"},energy:a(s)}}}}case"solar_share":return s===null||r===null?{value:null,unit:"percent"}:{value:qe(r,s),unit:"percent",line:{key:"line_from_solar",values:{part:l(r),whole:a(s)}}};case"cheap_share":case"expensive_share":{let c=e(n==="cheap_share"?"cheap":"expensive");if(s===null||r===null||c===null)return{value:null,unit:"percent"};let u=Math.max(s-r,0);return{value:qe(c,u),unit:"percent",line:{key:"line_of_grid",values:{part:l(c),whole:a(u)}}}}case"self_consumption":{let c=e("self_used");return s===null||c===null?{value:null,unit:"percent"}:{value:qe(c,s),unit:"percent",line:{key:"line_self_used",values:{part:l(c),whole:a(s)}}}}case"export":return{value:e("export"),unit:"energy"};case"saving":{let c=e("saving"),u=e("alternative_cost"),d=e("cost");if(c===null||u===null||d===null)return{value:c,unit:"money"};let h=u-d;return Math.abs(h-c)<.005?{value:h,unit:"money"}:{value:h,unit:"money",line:{key:"line_saving_split",values:{solar:o(h-c),saving:o(c)}}}}case"heat":{let c=e("heat");return c===null||s===null?{value:c,unit:"energy"}:{value:c,unit:"energy",line:{key:"line_from_electricity",values:{energy:a(s)}}}}case"alternative_cost":return{value:e("alternative_cost"),unit:"money"};case"scop":{let c=e("heat");return c===null||!s?{value:null,unit:"number"}:{value:c/s,unit:"number",line:{key:"line_heat_from",values:{heat:a(c),energy:a(s)}}}}case"heat_price":{let c=e("heat"),u=e("cost");return c===null||u===null||!c?{value:null,unit:"price"}:{value:u/c,unit:"price",line:{key:"line_cost_for_heat",values:{cost:{value:u,unit:"money"},heat:a(c)}}}}case"distance":{let c=e("distance");return c===null||s===null?{value:c,unit:"distance"}:{value:c,unit:"distance",line:{key:"line_charged",values:{energy:a(s)}}}}case"cost_per_100km":{let c=e("distance"),u=e("cost");return c===null||u===null||!c?{value:null,unit:"per_100km"}:{value:u/c*100,unit:"per_100km",line:{key:"line_cost_for",values:{cost:{value:u,unit:"money"},energy:{value:c,unit:"distance"}}}}}case"forecast_today":case"forecast_tomorrow":return{value:t,unit:"energy"}}}var as=["change","mean","min","max"],W=n=>n.statistic!==void 0?"statistic":n.entity!==void 0?"entity":"energy";function q({start:n,end:i}){let e=i-n;return e<=2*864e5+36e5?"hour":e<=95*864e5?"day":e<=3*366*864e5?"month":"year"}var de=n=>n==="year"?"month":n,Ns=(n,i)=>{let e=new Date(n);return i==="hour"?e.setMinutes(0,0,0):(e.setHours(0,0,0,0),i==="day"||(e.setDate(1),i==="month")?e.getTime():e.setMonth(0))},Us=(n,i)=>{let e=new Date(n);return i==="hour"?e.setHours(e.getHours()+1):i==="day"?e.setDate(e.getDate()+1):i==="month"?e.setMonth(e.getMonth()+1):e.setFullYear(e.getFullYear()+1),e.getTime()};function os({start:n,end:i},e){let t=[];for(let s=Ns(n,e);s<=i&&t.length<400;s=Us(s,e))t.push(s);return t}function cs(n,i=new Date){let e=n.filter(s=>s!==null).map(s=>s.getFullYear()),t=Math.min(i.getFullYear(),...e);return{start:new Date(t,0,1).getTime(),end:new Date(i.getFullYear()+1,0,1).getTime()-1}}function yt(n,i,e){let t=i.map(()=>null),s=e==="hour"?0:12*36e5;for(let r of n??[]){if(r.change===null||r.change===void 0)continue;let a=(typeof r.start=="number"?r.start:Date.parse(r.start))+s,o=-1;for(let l=0;l<i.length&&i[l]<=a;l+=1)o=l;o<0||(t[o]=(t[o]??0)+r.change)}return t}function M(n,i=new Date){let e=(a,o)=>({start:a.getTime(),end:o.getTime()-1}),t=i.getFullYear(),s=i.getMonth(),r=i.getDate();switch(n){case"today":return e(new Date(t,s,r),new Date(t,s,r+1));case"yesterday":return e(new Date(t,s,r-1),new Date(t,s,r));case"this_month":return e(new Date(t,s,1),new Date(t,s+1,1));case"last_month":return e(new Date(t,s-1,1),new Date(t,s,1));case"this_year":return e(new Date(t,0,1),new Date(t+1,0,1));case"last_year":return e(new Date(t-1,0,1),new Date(t,0,1))}}function Xe({start:n,end:i},e){let t=new Date(n),s=new Date(i),r=(l,c)=>new Intl.DateTimeFormat(e,l).format(c);if(t.toDateString()===s.toDateString())return r({day:"numeric",month:"short"},t);let o=t.getDate()===1&&new Date(i+1).getDate()===1;return o&&t.getMonth()===0&&s.getMonth()===11&&t.getFullYear()===s.getFullYear()?r({year:"numeric"},t):o&&t.getMonth()===s.getMonth()&&t.getFullYear()===s.getFullYear()?r({month:"short",year:"numeric"},t):new Intl.DateTimeFormat(e,{day:"numeric",month:"short"}).formatRange(t,s)}function ls(n,i,e){let t=i.map(()=>0),s=i.map(()=>0),r=e==="hour"?0:12*36e5;for(let a of n??[]){if(a.mean===null||a.mean===void 0)continue;let o=(typeof a.start=="number"?a.start:Date.parse(a.start))+r,l=-1;for(let c=0;c<i.length&&i[c]<=o;c+=1)l=c;l<0||(t[l]+=a.mean,s[l]+=1)}return t.map((a,o)=>s[o]?a/s[o]:null)}var $="electricity_lens",vt=["pv","heat_pump","wallbox"],he=n=>{if(n==null||n==="")return null;let i=Number(n);return Number.isFinite(i)?i:null},bt=n=>typeof n=="string"&&n?new Date(n):null;function R(n){let i=Object.values(n.entities??{}).filter(r=>r.platform===$),e=(r,a)=>i.find(o=>o.device_id===r&&o.translation_key===a),t=r=>r?he(n.states[r]?.state):null,s=[];for(let r of i){if(r.translation_key!=="saving")continue;let a=n.states[r.entity_id];if(!a||a.state==="unavailable")continue;let o=a.attributes,l=o.category;vt.includes(l)&&s.push({category:l,savingStatistic:typeof o.statistic_id=="string"?o.statistic_id:`${$}:${l}_saving`,calculating:o.calculating===!0,saving:he(a.state),investment:he(o.investment),perYear:t(e(r.device_id,"saving_per_year")?.entity_id),countingSince:bt(o.counting_since),yearlyFrom:bt(o.yearly_from),heating:o.heating==="gas"||o.heating==="oil"?o.heating:null,heatEstimated:o.heat_estimated===!0})}return s.sort((r,a)=>vt.indexOf(r.category)-vt.indexOf(a.category))}function us(n){let i=Object.values(n.entities??{}).find(t=>t.platform===$&&t.translation_key==="balance"),e=i?n.states[i.entity_id]:void 0;return!e||e.state==="unavailable"?null:{balance:he(e.state),saved:he(e.attributes.saved)??0,invested:he(e.attributes.invested)??0,inThePlusFrom:bt(e.attributes.in_the_plus_from)}}function ge(n){return Object.values(n.entities??{}).some(e=>e.platform===$&&e.translation_key==="saving")?"integration_unavailable":"not_set_up"}var Vs=300*1e3,P=5*1e3,ae,xt,O=()=>ae?.value;function D(){if(!ae)return!0;let n=ae.value&&!ae.value.calculating?Vs:P;return Date.now()-ae.at>n}function H(n){return D()?(xt??=n.callWS({type:`${$}/figures`}).then(i=>i).catch(()=>null).then(i=>(ae={at:Date.now(),value:i},xt=void 0,i)),xt):Promise.resolve(ae?.value??null)}var Bs=6e4,ds=new WeakMap;function Ws(n){let i=n.entities??{},e=ds.get(i);return e||(e=Object.values(i).filter(t=>t.platform===$).map(t=>t.entity_id),ds.set(i,e)),e}var z=class extends C{constructor(){super(...arguments);this._lookedAt=0}_watched(){return[]}_changedFor(e,t){return e.locale!==t.locale||e.language!==t.language||e.config!==t.config||e.themes!==t.themes||e.selectedTheme!==t.selectedTheme||e.entities!==t.entities||[...Ws(t),...this._watched()].some(s=>e.states[s]!==t.states[s])}shouldUpdate(e){let t=e.get("hass"),s=e.size===1&&t!==void 0&&this.hass!==void 0,r=Date.now()-this._lookedAt>=Bs;return s&&!r&&!this._changedFor(t,this.hass)?!1:(this._lookedAt=Date.now(),!0)}};var wt={title:"Balance","category.pv":"PV plant","category.heat_pump":"Heat pump","category.wallbox":"Electric car",not_set_up:"Set up the Electricity Lens integration to see what your PV plant, heat pump, and electric car have saved.",integration_unavailable:"The figures aren't available right now. Check Electricity Lens under Settings > Devices & services.",calculating:"Being computed \u2026",loading:"Loading \u2026",saved_invested:"{saved} saved, {invested} invested",saved_only:"{saved} saved",since:"since {date}",heat_estimated:"heat partly estimated",in_the_plus_from:"In the plus from about {date}",in_the_plus:"In the plus",yearly_from:"Yearly figure from {date}",no_investment:"no investment",line_payback:"of {investment}",line_payback_left:"of {investment} \xB7 about {time} left",line_return:"Total {percent} \xB7 {amount}",return_value:"{rate} % a year",months_one:"1 month",months_other:"{count} months",years_one:"1 year",years_other:"{count} years",per_year:"{amount}/year",savings_title:"Savings",savings_note:"As in the balance: the benefit of solar power counts for the PV plant only",savings_source:"Source",savings_energy:"Energy",savings_amount:"Amount",savings_total:"Total",savings_pv:"Solar power instead of grid power",savings_feed_in:"Feed-in",savings_gas:"Electricity instead of gas",savings_oil:"Electricity instead of oil",savings_fuel:"Electricity instead of fuel",savings_instead_gas:"A gas heating would have cost",savings_instead_oil:"An oil heating would have cost",savings_instead_fuel:"A combustion car would have cost",savings_electricity:"{name} electricity costs",savings_solar_part:"of which by solar power",savings_area_note:"In the balance, the solar part counts for the PV plant",meters_consumer:"Consumer",meters_electricity:"Electricity",history_title:"Savings over time",history_savings_note:"Compared with {list}",history_cost_note:"Solar power counts at {rate}, without the standing charge",history_cost_note_no_solar:"Without the standing charge",history_bill_note:"Grid power and standing charge, without the feed-in",history_saving_note:"Including its solar power, which the balance counts for the PV plant",compare_pv:"grid power",compare_gas:"gas heating",compare_oil:"oil heating",compare_fuel:"a combustion car",history_total:"Total",history_no_chart:"The chart is only shown in Home Assistant.",history_failed:"The statistics could not be loaded.",history_empty:"No savings in this period.",figures_failed:"The figures could not be loaded.",figures_unavailable:"not available","figure.energy":"Consumption","figure.energy.grid":"Grid import","figure.energy.solar":"Solar production","figure.cost":"Costs","figure.cost.grid":"Grid costs","figure.bill":"Electricity bill","figure.grid_price":"Average grid price","figure.device_grid_price":"Average grid price","figure.price":"Average price","figure.solar_share":"Solar share","figure.solar_share.household":"Self-sufficiency","figure.cheap_share":"Cheap grid power","figure.expensive_share":"Expensive grid power","figure.cheap_saving":"Tariff saving","figure.self_consumption":"Self-consumption","figure.export":"Feed-in","figure.saving":"Saving","figure.forecast_today":"Forecast today","figure.forecast_tomorrow":"Forecast tomorrow","figure.heat":"Heat","figure.alternative_cost":"Comparison costs","figure.scop":"Seasonal COP","figure.heat_price":"Heat price","figure.distance":"Distance","figure.cost_per_100km":"Costs per 100 km",line_saving_split:"of which {solar} by solar \xB7 {saving} in the balance",line_bill:"Grid {imported} \u2212 feed-in {feed_in} + standing charge {charge}",line_bill_parts:"Grid {imported} + standing charge {charge}",line_bill_no_charge:"Grid {imported} \u2212 feed-in {feed_in}",line_against_normal:"compared with the normal price",line_from_electricity:"from {energy} electricity",line_heat_from:"{heat} heat from {energy}",line_cost_for_heat:"{cost} for {heat} heat",line_charged:"with {energy} charged",line_solar_part:"{percent} of it solar power",line_energy_parts:"Grid {grid} + solar {solar}",line_exported:"{energy} fed in",line_average_price:"average {price}",line_for_import:"for {energy} imported",line_cost_for:"{cost} for {energy}",line_from_solar:"{part} of {whole} from solar",line_of_grid:"{part} of {whole} grid power",line_self_used:"{part} of {whole} used in the house","value.change":"total in the period","value.mean":"average","value.min":"minimum","value.max":"maximum",value_range:"from {min} to {max}","period.energy_date":"Follow the date selection","period.today":"Today","period.yesterday":"Yesterday","period.this_month":"This month","period.last_month":"Last month","period.this_year":"This year","period.last_year":"Last year","period.all":"All years",editor_title:"Title (optional)",editor_period:"Period",editor_period_hint:"Without a date selection on the dashboard: this month.",editor_source:"Source","source.energy":"Energy data","source.statistic":"Statistic","source.entity":"Entity",editor_area:"Area",editor_figure:"Figure",editor_statistic:"Statistic",editor_value:"Value",editor_secondary:"Line below","secondary.none":"Default","secondary.range":"Range of the period",editor_entity:"Entity",editor_name:"Name (optional)",editor_not_loaded:"Energy data need the Electricity Lens integration.","source.solar":"Solar power","source.grid":"Grid power","source.normal":"Normal grid power","source.cheap":"Cheap grid power","source.expensive":"Expensive grid power","source.export":"Feed-in","source.standing_charge":"Standing charge","stack.source":"By source","stack.bill":"Electricity bill","stack.consumer":"By consumer","stack.none":"Not stacked",editor_savings:"Savings of all categories",editor_stack:"Stacking",editor_line:"Line",editor_lines:"Further lines from statistics",editor_line_none:"None",history_empty_figure:"No data in this period.",breakdown_mix:"Electricity mix",breakdown_cost_by_consumer:"Costs by consumer",breakdown_energy_by_consumer:"Consumption by consumer",breakdown_total:"Total","mix.solar":"Solar","mix.grid":"Grid","mix.normal":"Grid normal","mix.cheap":"Grid cheap","mix.expensive":"Grid expensive",editor_by:"Split","by.source":"By source","by.consumer":"By consumer",editor_display:"Display","display.ring":"Ring","display.bars":"Bars",editor_color_by_source:"Color the bars by source",editor_breakdown_source:"Source","breakdown_source.energy":"Energy data","breakdown_source.statistics":"Statistics",editor_statistics:"Statistics","figure_choice.energy":"Consumption","figure_choice.cost":"Costs","strategy.title":"Electricity","strategy.overview":"Now","strategy.electricity":"Consumption","strategy.cost_today":"Costs today","strategy.self_sufficiency_today":"Self-sufficiency today","strategy.solar_today":"Solar today","strategy.consumption_today":"Consumption today","strategy.price_today":"Average price today","strategy.payback_pv":"PV payback","strategy.payback_heat_pump":"Heat payback","strategy.payback_wallbox":"Car payback","strategy.return_pv":"PV return","strategy.return_heat_pump":"Heat return","strategy.return_wallbox":"Car return","strategy.charged_energy":"Charged energy","strategy.charging_cost":"Charging costs","strategy.bill":"Electricity bill","strategy.cost_with_solar":"Electricity costs incl. solar","strategy.cost_history":"Costs over time","strategy.cost_distribution":"Cost distribution","strategy.price_with_solar":"Average price incl. solar","strategy.costs":"Costs","strategy.heating":"Heating","strategy.charging":"Charging","strategy.usage_graph":"Consumption by source","strategy.solar_graph":"Solar production","strategy.devices_graph":"Consumption over time","strategy.distribution":"Power flow","strategy.not_loaded":"Set up the Electricity Lens integration to see this dashboard."},Gs={title:"Bilanz","category.pv":"PV-Anlage","category.heat_pump":"W\xE4rmepumpe","category.wallbox":"E-Auto",not_set_up:"Richte die Integration Electricity Lens ein, um zu sehen, was PV-Anlage, W\xE4rmepumpe und E-Auto gespart haben.",integration_unavailable:"Die Zahlen sind gerade nicht verf\xFCgbar. Pr\xFCfe Electricity Lens unter Einstellungen > Ger\xE4te & Dienste.",calculating:"Wird berechnet \u2026",loading:"Wird geladen \u2026",saved_invested:"{saved} gespart, {invested} investiert",saved_only:"{saved} gespart",since:"seit {date}",heat_estimated:"W\xE4rme teilweise gesch\xE4tzt",in_the_plus_from:"Im Plus ab etwa {date}",in_the_plus:"Im Plus",yearly_from:"Jahreswert ab {date}",no_investment:"ohne Investition",line_payback:"von {investment}",line_payback_left:"von {investment} \xB7 noch etwa {time}",line_return:"Gesamt {percent} \xB7 {amount}",return_value:"{rate} % p. a.",months_one:"1 Monat",months_other:"{count} Monate",years_one:"1 Jahr",years_other:"{count} Jahre",per_year:"{amount}/Jahr",savings_title:"Ersparnis",savings_note:"Wie in der Bilanz: Der Vorteil des PV-Stroms z\xE4hlt nur bei der PV-Anlage",savings_source:"Quelle",savings_energy:"Energie",savings_amount:"Betrag",savings_total:"Gesamt",savings_pv:"PV-Strom statt Netzstrom",savings_feed_in:"Einspeisung",savings_gas:"Strom statt Gas",savings_oil:"Strom statt \xD6l",savings_fuel:"Strom statt Sprit",savings_instead_gas:"Gasheizung h\xE4tte gekostet",savings_instead_oil:"\xD6lheizung h\xE4tte gekostet",savings_instead_fuel:"Verbrenner h\xE4tte gekostet",savings_electricity:"Stromkosten {name}",savings_solar_part:"davon durch PV",savings_area_note:"In der Bilanz z\xE4hlt der PV-Anteil bei der PV-Anlage",meters_consumer:"Verbraucher",meters_electricity:"Strom",history_title:"Ersparnisverlauf",history_savings_note:"Gegen\xFCber {list}",history_cost_note:"PV-Strom z\xE4hlt mit {rate}, ohne Grundpreis",history_cost_note_no_solar:"Ohne Grundpreis",history_bill_note:"Netzstrom und Grundpreis, ohne Einspeisung",history_saving_note:"Mit dem eigenen PV-Strom, den die Bilanz der PV-Anlage zurechnet",compare_pv:"Netzstrom",compare_gas:"Gasheizung",compare_oil:"\xD6lheizung",compare_fuel:"Verbrenner",history_total:"Summe",history_no_chart:"Das Diagramm erscheint nur in Home Assistant.",history_failed:"Die Statistik konnte nicht geladen werden.",history_empty:"Keine Ersparnis in diesem Zeitraum.",figures_failed:"Die Kennzahlen konnten nicht geladen werden.",figures_unavailable:"nicht verf\xFCgbar","figure.energy":"Verbrauch","figure.energy.grid":"Netzbezug","figure.energy.solar":"PV-Erzeugung","figure.cost":"Kosten","figure.cost.grid":"Netzkosten","figure.bill":"Stromrechnung","figure.grid_price":"\xF8 Netzpreis","figure.device_grid_price":"\xF8 Netzpreis","figure.price":"\xF8 Strompreis","figure.solar_share":"PV-Anteil","figure.solar_share.household":"Autarkie","figure.cheap_share":"G\xFCnstiger Netzstrom","figure.expensive_share":"Teurer Netzstrom","figure.cheap_saving":"Tarifersparnis","figure.self_consumption":"Eigenverbrauch","figure.export":"Einspeisung","figure.saving":"Ersparnis","figure.forecast_today":"Prognose heute","figure.forecast_tomorrow":"Prognose morgen","figure.heat":"W\xE4rme","figure.alternative_cost":"Vergleichskosten","figure.scop":"JAZ","figure.heat_price":"W\xE4rmepreis","figure.distance":"Strecke","figure.cost_per_100km":"Kosten pro 100 km",line_saving_split:"davon {solar} durch PV \xB7 in der Bilanz {saving}",line_bill:"Netz {imported} \u2212 Einspeisung {feed_in} + Grundpreis {charge}",line_bill_parts:"Netz {imported} + Grundpreis {charge}",line_bill_no_charge:"Netz {imported} \u2212 Einspeisung {feed_in}",line_against_normal:"gegen\xFCber dem Normalpreis",line_from_electricity:"aus {energy} Strom",line_heat_from:"{heat} W\xE4rme aus {energy}",line_cost_for_heat:"{cost} f\xFCr {heat} W\xE4rme",line_charged:"mit {energy} geladen",line_solar_part:"davon {percent} PV-Strom",line_energy_parts:"Netz {grid} + PV {solar}",line_exported:"{energy} eingespeist",line_average_price:"\xF8 {price}",line_for_import:"f\xFCr {energy} Netzbezug",line_cost_for:"{cost} f\xFCr {energy}",line_from_solar:"{part} von {whole} aus PV",line_of_grid:"{part} von {whole} Netzstrom",line_self_used:"{part} von {whole} im Haus genutzt","value.change":"Summe im Zeitraum","value.mean":"Mittelwert","value.min":"Minimum","value.max":"Maximum",value_range:"von {min} bis {max}","period.energy_date":"Der Datumsauswahl folgen","period.today":"Heute","period.yesterday":"Gestern","period.this_month":"Dieser Monat","period.last_month":"Letzter Monat","period.this_year":"Dieses Jahr","period.last_year":"Letztes Jahr","period.all":"Alle Jahre",editor_title:"Titel (optional)",editor_period:"Zeitraum",editor_period_hint:"Ohne Datumsauswahl auf dem Dashboard: dieser Monat.",editor_source:"Quelle","source.energy":"Energiedaten","source.statistic":"Statistik","source.entity":"Entit\xE4t",editor_area:"Bereich",editor_figure:"Gr\xF6\xDFe",editor_statistic:"Statistik",editor_value:"Wert",editor_secondary:"Unterzeile","secondary.none":"Standard","secondary.range":"Spanne im Zeitraum",editor_entity:"Entit\xE4t",editor_name:"Name (optional)",editor_not_loaded:"Energiedaten brauchen die Integration Electricity Lens.","source.solar":"PV-Strom","source.grid":"Netzstrom","source.normal":"Normaler Netzstrom","source.cheap":"G\xFCnstiger Netzstrom","source.expensive":"Teurer Netzstrom","source.export":"Einspeisung","source.standing_charge":"Grundpreis","stack.source":"Nach Quelle","stack.bill":"Stromrechnung","stack.consumer":"Nach Verbraucher","stack.none":"Nicht gestapelt",editor_savings:"Ersparnisse aller Kategorien",editor_stack:"Stapelung",editor_line:"Linie",editor_lines:"Weitere Linien aus Statistiken",editor_line_none:"Keine",history_empty_figure:"Keine Daten in diesem Zeitraum.",breakdown_mix:"Strommix",breakdown_cost_by_consumer:"Kosten nach Verbraucher",breakdown_energy_by_consumer:"Verbrauch nach Verbraucher",breakdown_total:"Gesamt","mix.solar":"PV","mix.grid":"Netz","mix.normal":"Netz normal","mix.cheap":"Netz g\xFCnstig","mix.expensive":"Netz teuer",editor_by:"Aufteilen","by.source":"Nach Quelle","by.consumer":"Nach Verbraucher",editor_display:"Darstellung","display.ring":"Ring","display.bars":"Balken",editor_color_by_source:"Balken nach Quelle f\xE4rben",editor_breakdown_source:"Quelle","breakdown_source.energy":"Energiedaten","breakdown_source.statistics":"Statistiken",editor_statistics:"Statistiken","figure_choice.energy":"Verbrauch","figure_choice.cost":"Kosten","strategy.title":"Strom","strategy.overview":"Jetzt","strategy.electricity":"Verbrauch","strategy.cost_today":"Kosten heute","strategy.self_sufficiency_today":"Autarkie heute","strategy.solar_today":"PV heute","strategy.consumption_today":"Verbrauch heute","strategy.price_today":"\xF8 Strompreis heute","strategy.payback_pv":"PV-Amortisation","strategy.payback_heat_pump":"W\xE4rmeamortisation","strategy.payback_wallbox":"Auto-Amortisation","strategy.return_pv":"PV-Rendite","strategy.return_heat_pump":"W\xE4rmerendite","strategy.return_wallbox":"Auto-Rendite","strategy.charged_energy":"Geladene Energie","strategy.charging_cost":"Ladekosten","strategy.bill":"Stromrechnung","strategy.cost_with_solar":"Stromkosten inkl. PV","strategy.cost_history":"Kostenverlauf","strategy.cost_distribution":"Kostenverteilung","strategy.price_with_solar":"\xF8 Preis inkl. PV","strategy.costs":"Kosten","strategy.heating":"Heizen","strategy.charging":"Laden","strategy.usage_graph":"Verbrauch nach Quelle","strategy.solar_graph":"PV-Erzeugung","strategy.devices_graph":"Verbrauchsverlauf","strategy.distribution":"Stromfluss","strategy.not_loaded":"Richte die Integration Electricity Lens ein, um dieses Dashboard zu sehen."},js={en:wt,de:Gs},G=n=>n in wt;function w(n){let i=js[n.split("-")[0]]??wt;return(e,t={})=>i[e].replace(/\{(\w+)\}/g,(s,r)=>t[r]??"")}var L=A`
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
`;var Q=["energy_date","today","yesterday","this_month","last_month","this_year","last_year"];function St(n){if(!n)throw new Error("Invalid configuration");let{tiles:i,title:e,columns:t,...s}=n;if(i===void 0)return s;if(!Array.isArray(i)||i.length>1)throw new Error("Each key figure is its own card now: use one card per entry in tiles");let r=i[0]??{};return{...s,...r,...e&&!r.name?{name:e}:{}}}function N(n,i,e){let t=`figure.${i}.${e.kind}`,s=n(G(t)?t:`figure.${i}`);return["device","other","category"].includes(e.kind)?`${e.name} ${s}`:s}var Ks=300*1e3,$t=n=>n.toDateString();function Ys(n){let i=new Date,e=$t(i),t=$t(new Date(i.getFullYear(),i.getMonth(),i.getDate()+1)),s={today:null,tomorrow:null};for(let r of Object.values(n??{}))for(let[a,o]of Object.entries(r.wh_hours??{})){let l=$t(new Date(a));l===e&&(s.today=(s.today??0)+o/1e3),l===t&&(s.tomorrow=(s.tomorrow??0)+o/1e3)}return s}var pe=class extends z{constructor(){super(...arguments);this._infoLoading=!1}static getStubConfig(){return{period:"energy_date",area:"household",figure:"cost"}}static getConfigElement(){return document.createElement("electricity-lens-figures-card-editor")}setConfig(e){this._config=St(e)}getCardSize(){return 2}getGridOptions(){return{columns:6,min_columns:6}}connectedCallback(){super.connectedCallback(),this._follow()}disconnectedCallback(){super.disconnectedCallback(),this._unfollow?.(),this._unfollow=void 0,clearTimeout(this._retryTimer),this._retryTimer=void 0}_watched(){return[this._config?.entity,this._config?.statistic].filter(e=>e!==void 0)}get _localize(){return w(this.hass?.locale?.language??this.hass?.language??"en")}get _language(){return this.hass?.locale?.language??"en"}get _period(){return this._config?.period??"energy_date"}_follow(){this._period==="energy_date"&&(this._unfollow||!this.isConnected||!this.hass?.connection||(this._unfollow=Y(this.hass.connection,e=>{this._selected=e})))}_range(){let e=this._period;if(e!=="energy_date")return M(e);if(this._selected!==void 0)return this._selected??M("this_month")}_area(e){return this._info?.areas.find(t=>t.id===e)}_figure(e){let t=this._area(e.area);if(!(!t||!e.figure||!Z(t).includes(e.figure)))return{area:t,figure:e.figure}}async _loadInfo(){!this.hass||this._infoLoading||(this._infoLoading=!0,this._info=await H(this.hass),this._infoLoading=!1,clearTimeout(this._retryTimer),this._retryTimer=void 0,this.isConnected&&(!this._info||this._info.calculating)&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),P)))}_request(){let e=this._range(),t=this._config;if(!e||!t)return;let s=W(t);if(s==="energy"&&!this._info)return;let r=new Set,a=new Set,o=!1;if(s==="statistic"&&t.statistic)r.add(t.statistic),a.add(t.statistic);else if(s==="energy"){let c=this._figure(t);c&&(o=Qe(c.figure),this._info?.calculating||ns(c.area,c.figure).forEach(u=>r.add(u)))}let l=[...r].sort();return{key:JSON.stringify([l,e.start,e.end,o]),range:e,ids:l,statistics:[...a].sort(),forecast:o}}async _load(e){if(!this.hass)return;this._loading=e.key;let t=de(q(e.range)),s={key:e.key,at:Date.now(),range:e.range,period:t,rows:{},metadata:{},forecast:{today:null,tomorrow:null},failed:!1};try{let[r,a,o]=await Promise.all([e.ids.length?this.hass.callWS({type:"recorder/statistics_during_period",start_time:new Date(e.range.start).toISOString(),end_time:new Date(e.range.end+1).toISOString(),statistic_ids:e.ids,period:t,types:["change","mean","min","max"],units:{energy:"kWh"}}):Promise.resolve({}),e.statistics.length?this.hass.callWS({type:"recorder/get_statistics_metadata",statistic_ids:e.statistics}):Promise.resolve([]),e.forecast?this.hass.callWS({type:"energy/solar_forecast"}):Promise.resolve({})]);s.rows=r,s.metadata=Object.fromEntries(a.map(l=>[l.statistic_id,l])),s.forecast=Ys(o)}catch{s.failed=!0}this._loading===e.key&&(this._loading=void 0,this._loaded=s)}willUpdate(e){if(!this.hass)return;(e.has("hass")||e.has("_config"))&&this._follow(),this._info===void 0&&(this._info=O()),D()&&!this._infoLoading?this._loadInfo():this.isConnected&&this._info?.calculating&&!this._retryTimer&&!this._infoLoading&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),P));let t=this._request(),s=!this._loaded||Date.now()-this._loaded.at>Ks;t&&t.key!==this._loading&&(t.key!==this._loaded?.key||s&&!this._loading)&&this._load(t)}get _fmt(){return J(this.hass?.locale,this.hass?.config.currency??"EUR")}_number(e,t){return this._fmt.number(e,t)}_format(e,t){return this._fmt.value(e,t)}_rows(e){let t=this._loaded;if(!t)return[];let s=t.period==="hour"?0:12*36e5;return(t.rows[e]??[]).filter(r=>{let a=(typeof r.start=="number"?r.start:Date.parse(r.start))+s;return a>=t.range.start&&a<=t.range.end})}_sum(e){let t=0;for(let s of e??[])for(let r of this._rows(s))t+=r.change??0;return t}_energyCard(e){let t=this._localize,s=this._figure(e);if(!s){let d=`figure.${e.figure??""}`,h=e.name??(G(d)?t(d):e.figure??"");return this._info===void 0?this._card(h,"\u2026"):this._card(h,"\u2013",t("figures_unavailable"))}let{area:r,figure:a}=s,o=e.name??N(this._localize,a,r);if(this._info?.calculating&&!Qe(a))return this._card(o,"\u2026",t("calculating"));if(!this._loaded)return this._card(o,"\u2026");if(this._loaded.failed)return this._card(o,"\u2013",t("figures_failed"));let l=a==="forecast_today"?this._loaded.forecast.today:a==="forecast_tomorrow"?this._loaded.forecast.tomorrow:null,c=ue(a,r,d=>r.statistics[d]?this._sum(r.statistics[d]):null,l),u=c.line?t(c.line.key,Object.fromEntries(Object.entries(c.line.values).map(([d,h])=>[d,this._format(h.value,h.unit)]))):void 0;return this._card(o,c.value===null?"\u2013":this._format(c.value,c.unit),e.secondary==="none"?void 0:u)}_statisticCard(e){let t=this._localize,s=e.statistic??"",r=this._loaded?.metadata[s],a=e.name??r?.name??this.hass?.states[s]?.attributes.friendly_name??s,o=this._rows(s),l=r?.unit_class==="energy"?"kWh":r?.statistics_unit_of_measurement??"",c=g=>g===null?"\u2013":`${this._number(g)}${l?` ${l}`:""}`,u=g=>o.map(f=>f[g]).filter(f=>typeof f=="number"),d=e.value??"change",h=null;if(d==="change")h=o.length?o.reduce((g,f)=>g+(f.change??0),0):null;else if(d==="mean"){let g=u("mean");h=g.length?g.reduce((f,x)=>f+x,0)/g.length:null}else{let g=u(d);h=g.length?d==="min"?Math.min(...g):Math.max(...g):null}let m=d==="change"?void 0:t(`value.${d}`);if(e.secondary==="range"){let g=u("min"),f=u("max");g.length&&f.length&&(m=t("value_range",{min:c(Math.min(...g)),max:c(Math.max(...f))}))}return this._loaded?.failed?this._card(a,"\u2013",t("figures_failed")):this._card(a,c(h),e.secondary==="none"?void 0:m)}_entityCard(e){let t=this._localize,s=this.hass?.states[e.entity??""],r=e.name??s?.attributes.friendly_name??e.entity??"";if(!s)return this._card(r,"\u2013",t("figures_unavailable"));let a=Number(s.state);if(Number.isFinite(a)&&e.secondary==="payback")return this._card(r,this._format(a,"percent"),this._paybackLine(s.attributes));if(Number.isFinite(a)&&e.secondary==="return"){let h=F(this.hass?.locale,{minimumFractionDigits:1,maximumFractionDigits:1}).format(a);return this._card(r,t("return_value",{rate:h}),this._returnLine(s.attributes))}let o=this.hass?.config.currency??"",l=s.attributes.unit_of_measurement?.replace(o,o?this._fmt.currencySymbol():""),c=s.state!==""&&Number.isFinite(a),u=this._fmt.currencySymbol(),d=c?l&&l===u?this._format(a,"money"):`${this._number(a)}${l?` ${l}`:""}`:["unknown","unavailable",""].includes(s.state)?"\u2013":s.state;return this._card(r,d)}_paybackLine(e){let t=this._localize;if(typeof e.investment!="number")return;let s=this._format(e.investment,"money");if(typeof e.years_left!="number")return t("line_payback",{investment:s});let r=e.years_left,a=Math.max(1,Math.round(r<1?r*12:r)),o=r<1?t(a===1?"months_one":"months_other",{count:String(a)}):t(a===1?"years_one":"years_other",{count:String(a)});return t("line_payback_left",{investment:s,time:o})}_returnLine(e){let{surplus:t,surplus_percent:s}=e;if(typeof t!="number"||typeof s!="number")return;let r=this.hass?.locale;return this._localize("line_return",{percent:F(r,{style:"percent",maximumFractionDigits:0,signDisplay:"exceptZero"}).format(s/100),amount:F(r,{style:"currency",currency:this.hass?.config.currency??"EUR",maximumFractionDigits:0,signDisplay:"exceptZero"}).format(t)})}_card(e,t,s){let[r,a]=rs(t);return p`<ha-card lang=${this._language}>
      <div class="header"><h2 class="title">${e}</h2></div>
      <div class="stat">
        <div class="value">
          <span class="number">${r}</span>${a?p`<span class="unit">${a}</span>`:y}
        </div>
        ${s?p`<div class="line">${s}</div>`:y}
      </div>
    </ha-card>`}render(){if(!this.hass||!this._config)return p``;let e=W(this._config);return e==="statistic"?this._statisticCard(this._config):e==="entity"?this._entityCard(this._config):this._energyCard(this._config)}};pe.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0},_selected:{state:!0},_loaded:{state:!0}},pe.styles=[L,A`
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
    `];var Js=["energy","cost","saving","export","heat","distance","alternative_cost"],Zs=["price","grid_price","solar_share","cheap_share","expensive_share","self_consumption","scop","heat_price","cost_per_100km"],Re=n=>Js.filter(i=>Z(n).includes(i)),Ct=n=>Zs.filter(i=>Z(n).includes(i)||i==="grid_price"&&n.kind==="household");function me(n,i){let e=[];return i==="energy"&&n.statistics.solar?.length&&e.push("source"),n.kind==="household"&&(i==="energy"||i==="cost")&&e.push("consumer"),n.kind==="household"&&i==="cost"&&e.push("source","bill"),n.kind==="category"&&(n.statistics.energy?.length??0)>1&&(i==="energy"||i==="cost"||(i==="heat"||i==="saving")&&(n.statistics.heat_meters?.length??0)>1)&&e.push("consumer"),e.push("none"),n.kind==="category"&&i==="cost"&&n.statistics.solar_cost?.length&&e.push("source"),e}function hs(n,i){let{alternative_cost:e,cost:t}=n.statistics;return i==="saving"&&e?.length&&t?.length?{plus:e,minus:t}:{plus:n.statistics[i]??[],minus:[]}}function et(n){let i=new Set(n.areas.find(t=>t.id==="heat_pump")?.statistics.energy??[]),e=n.areas.filter(t=>t.kind==="device"&&t.statistics.heat?.length&&t.statistics.energy?.some(s=>i.has(s)));return e.length>1?e:[]}function qs(n,i,e){let t=n.areas.find(c=>c.kind==="grid")?.statistics??{},s=t.import_cost??[],r=t.feed_in??[],a=i.statistics.cheap_cost??[],o=i.statistics.expensive_cost??[],l=[{id:"standing_charge",name:{key:"source.standing_charge"},color:e.standing,plus:[...t.cost??[],...r],minus:s,floor:!0}];return a.length&&l.push({id:"cheap",name:{key:"source.cheap"},color:e.cheap,plus:a,minus:[]}),l.push({id:"grid",name:{key:a.length||o.length?"source.normal":"source.grid"},color:e.grid,plus:s,minus:[...a,...o],floor:!0}),o.length&&l.push({id:"expensive",name:{key:"source.expensive"},color:e.expensive,plus:o,minus:[]}),l}function Qs(n,i,e){let t=l=>i.statistics[l]??[],s=t("cheap_cost"),r=t("expensive_cost"),a=[{id:"solar",name:{key:"source.solar"},color:e.solar,plus:t("solar_cost"),minus:[]}];s.length&&a.push({id:"cheap",name:{key:"source.cheap"},color:e.cheap,plus:s,minus:[]}),a.push({id:"grid",name:{key:s.length||r.length?"source.normal":"source.grid"},color:e.grid,plus:t("cost"),minus:[...t("solar_cost"),...s,...r],floor:!0}),r.length&&a.push({id:"expensive",name:{key:"source.expensive"},color:e.expensive,plus:r,minus:[]});let o=n.areas.find(l=>l.kind==="grid")?.statistics.feed_in??[];return i.kind==="household"&&o.length&&a.push({id:"export",name:{key:"source.export"},color:e.export,plus:o,minus:[],negative:!0}),a}function tt(n,i,e,t,s){let r=l=>i.statistics[l]??[],a=T(n,s);if(t==="bill"&&e==="cost")return qs(n,i,s);if(t==="source"&&e==="cost")return Qs(n,i,s);if(t==="source"&&e==="energy"){let l=[{id:"solar",name:{key:"source.solar"},color:s.solar,plus:r("solar"),minus:[]}],c=["cheap","expensive"].filter(d=>r(d).length);r("cheap").length&&l.push({id:"cheap",name:{key:"source.cheap"},color:s.cheap,plus:r("cheap"),minus:[]}),l.push({id:"grid",name:{key:c.length?"source.normal":"source.grid"},color:s.grid,plus:r("energy"),minus:[...r("solar"),...c.flatMap(r)],floor:!0}),r("expensive").length&&l.push({id:"expensive",name:{key:"source.expensive"},color:s.expensive,plus:r("expensive"),minus:[]});let u=n.areas.find(d=>d.kind==="grid")?.statistics.export??[];return i.kind==="household"&&u.length&&l.push({id:"export",name:{key:"source.export"},color:s.export,plus:u,minus:[],negative:!0}),l}if(t==="consumer"){if(i.kind==="category"){let c=new Set(i.statistics.energy??[]);return n.areas.filter(u=>u.kind==="device"&&u.statistics.energy?.some(d=>c.has(d))).map(u=>({id:u.id,name:{text:u.name},color:a.get(u.id)??s.other,...hs(u,e)}))}let l=new Set(n.areas.filter(c=>c.kind==="category").flatMap(c=>c.statistics.energy??[]));return n.areas.filter(c=>c.kind==="category"&&(c.statistics.energy?.length??0)>0||c.kind==="device"&&c.top_level!==!1&&!c.statistics.energy?.some(u=>l.has(u))||c.kind==="other").map(c=>({id:c.id,name:{text:c.name},color:a.get(c.id)??s.other,plus:c.statistics[e]??[],minus:[]}))}let o=e==="export"?s.export:i.kind==="solar"?s.solar:a.get(i.id)??(e==="heat"?s.heat:e==="distance"?s.car:s.grid);return[{id:e,name:{text:i.name},color:o,...hs(i,e)}]}var Xs=36e5;async function st(n,i,e){if(!i.length)return{};let t=de(q(e)),s=await n.callWS({type:"recorder/statistics_during_period",start_time:new Date(e.start).toISOString(),end_time:new Date(e.end+1).toISOString(),statistic_ids:i,period:t,types:["change"],units:{energy:"kWh"}}),r=t==="hour"?0:12*Xs,a={};for(let o of i){a[o]=0;for(let l of s[o]??[]){let c=(typeof l.start=="number"?l.start:Date.parse(l.start))+r;c>=e.start&&c<=e.end&&(a[o]+=l.change??0)}}return a}var ei=300*1e3,ti="240px",si="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z",ii="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z",fe=class extends z{constructor(){super(...arguments);this._config={type:""};this._infoLoading=!1;this._watchingChart=!1;this._hidden=new Set}static getStubConfig(){return{area:"household",by:"source",figure:"energy",display:"ring"}}static getConfigElement(){return document.createElement("electricity-lens-breakdown-card-editor")}setConfig(e){if(e?.statistics!==void 0&&!Array.isArray(e.statistics))throw new Error("statistics must be a list");this._config=e??{type:""}}getCardSize(){return 4}getGridOptions(){return{columns:6,min_columns:4}}connectedCallback(){super.connectedCallback(),this._follow()}disconnectedCallback(){super.disconnectedCallback(),this._unfollow?.(),this._unfollow=void 0,clearTimeout(this._retryTimer),this._retryTimer=void 0}get _localize(){return w(this.hass?.locale?.language??this.hass?.language??"en")}get _language(){return this.hass?.locale?.language??"en"}get _fmt(){return J(this.hass?.locale,this.hass?.config.currency??"EUR")}get _byStatistics(){return!!this._config.statistics?.length}_follow(){(this._config.period??"energy_date")==="energy_date"&&(this._unfollow||!this.isConnected||!this.hass?.connection||(this._unfollow=Y(this.hass.connection,e=>{this._selected=e})))}_range(){let e=this._config.period??"energy_date";if(e!=="energy_date")return M(e);if(this._selected!==void 0)return this._selected??M("this_month")}_area(){return this._info?.areas.find(e=>e.id===(this._config.area??"household"))}get _by(){let e=this._area();return this._config.by==="consumer"&&(e?.kind==="household"||e?.kind==="category"&&(e.statistics.energy?.length??0)>1)?"consumer":e?.statistics.solar?.length?"source":"consumer"}get _figure(){return this._by==="consumer"&&this._config.figure==="cost"?"cost":"energy"}_series(){let e=this._info,t=this._area();return!e||!t?[]:tt(e,t,this._figure,this._by==="source"?"source":"consumer",E(this)).filter(s=>!s.negative)}_ids(){let e=new Set;if(this._byStatistics)this._config.statistics?.forEach(t=>e.add(t.statistic));else{for(let t of this._series())[...t.plus,...t.minus].forEach(s=>e.add(s));if(this._by==="consumer"&&this._info)for(let t of this._series()){let s=this._info.areas.find(r=>r.id===t.id);for(let r of["energy","solar","cheap","expensive","cost","solar_cost","cheap_cost","expensive_cost"])(s?.statistics[r]??[]).forEach(a=>e.add(a))}}return[...e].sort()}async _loadInfo(){!this.hass||this._infoLoading||(this._infoLoading=!0,this._info=await H(this.hass),this._infoLoading=!1,clearTimeout(this._retryTimer),this._retryTimer=void 0,this.isConnected&&(!this._info||this._info.calculating)&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),P)))}async _load(e,t,s){if(!this.hass)return;this._loading=e;let r={key:e,at:Date.now(),values:{},names:{},failed:!1};try{let a=this._byStatistics?t:[],[o,l]=await Promise.all([st(this.hass,t,s),a.length?this.hass.callWS({type:"recorder/get_statistics_metadata",statistic_ids:a}):Promise.resolve([])]);r.values=o,r.names=Object.fromEntries(l.map(c=>[c.statistic_id,c.name||this.hass?.states[c.statistic_id]?.attributes.friendly_name||c.statistic_id]))}catch{r.failed=!0}this._loading===e&&(this._loading=void 0,this._sums=r)}willUpdate(e){if(!this.hass||((e.has("hass")||e.has("_config"))&&this._follow(),this._watchingChart||(this._watchingChart=!0,Ze(o=>{this._hasChart=o})),this._info===void 0&&(this._info=O()),D()&&!this._infoLoading&&this._loadInfo(),!this._byStatistics&&(this.isConnected&&this._info?.calculating&&!this._retryTimer&&!this._infoLoading&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),P)),!this._info||this._info.calculating)))return;let t=this._range();if(!t)return;let s=this._ids();if(!s.length)return;let r=JSON.stringify([s,t.start,t.end]),a=!this._sums||Date.now()-this._sums.at>ei;r!==this._loading&&(r!==this._sums?.key||a&&!this._loading)&&this._load(r,s,t)}_sum(e){return e.reduce((t,s)=>t+(this._sums?.values[s]??0),0)}_parts(){let e=this._localize;if(this._byStatistics){let s=E(this),r=this._info?T(this._info,s):new Map;return(this._config.statistics??[]).map((a,o)=>{let l=this._info?.areas.find(c=>c.kind==="device"&&(c.statistics.energy?.[0]===a.statistic||c.statistics.heat?.[0]===a.statistic));return{id:a.statistic,name:a.name??l?.name??this._sums?.names[a.statistic]??a.statistic,color:(l&&r.get(l.id))??s.consumers[o%s.consumers.length],value:this._sum([a.statistic])}})}let t=this._series().map(s=>{let r=this._sum(s.plus)-this._sum(s.minus),a=s.name.key?.replace(/^source\./,"mix."),o=s.name.text??(a&&G(a)?e(a):s.name.key&&G(s.name.key)?e(s.name.key):s.id),l={id:s.id,name:o,color:s.color,value:s.floor?Math.max(r,0):r};if(this._by==="consumer"&&this._info){let c=E(this),u=this._info.areas.find(d=>d.id===s.id);if(u){let d=k=>this._sum(u.statistics[k]??[]),h=d("energy"),m=d("solar"),g=d("cheap"),f=d("expensive");l.energy=h;let x=this._figure==="cost",v={solar:x?d("solar_cost"):m,cheap:x?d("cheap_cost"):g,expensive:x?d("expensive_cost"):f};l.mix=[{color:c.solar,value:v.solar},{color:c.cheap,value:v.cheap},{color:c.grid,value:Math.max((x?d("cost"):h)-v.solar-v.cheap-v.expensive,0)},{color:c.expensive,value:v.expensive}]}}return l});return this._by==="consumer"?t.sort((s,r)=>r.value-s.value):t}_value(e){return this._figure==="cost"&&!this._byStatistics?this._fmt.value(e,"money"):this._fmt.value(e,"energy")}_title(){let e=this._localize;return this._config.title?this._config.title:this._byStatistics?"":(this._area()?this._by:this._config.by??"source")==="source"?e("breakdown_mix"):e(this._figure==="cost"?"breakdown_cost_by_consumer":"breakdown_energy_by_consumer")}_ring(e){let t=this._localize;if(this._hasChart===void 0)return p`<p class="summary">${t("loading")}</p>`;if(!this._hasChart)return p`<p class="summary">${t("history_no_chart")}</p>`;let s=this._figure==="cost"&&!this._byStatistics,r=E(this).line,a=getComputedStyle(this).getPropertyValue("--primary-text-color").trim()||"#212121",o=JSON.stringify([e,[...this._hidden],s,r,a,this.hass?.locale]);this._ringChart?.key!==o&&(this._ringChart={key:o,chart:es({items:e,total:t("breakdown_total"),format:d=>this._value(d),percent:d=>this._fmt.value(d,"percent"),centerColor:r,labelColor:a,hidden:this._hidden})});let{chart:l}=this._ringChart,c=ft(e.map(d=>this._hidden.has(d.id)?0:d.value)),u=d=>{let h=new Set(this._hidden);h.has(d)?h.delete(d):h.add(d),this._hidden=h};return p`<div class="ring">
      ${Jt(s,p`<ha-chart-base
          .hass=${this.hass}
          .data=${l.data}
          .options=${l.options}
          .height=${ti}
        ></ha-chart-base>`)}
      <div class="chart-legend">
        <ul>
          ${e.map((d,h)=>{let m=this._hidden.has(d.id),g=this._fmt.value(c[h],"percent");return p`<li class=${m?"hidden":""}>
              <button
                type="button"
                class="leg"
                aria-pressed=${String(!m)}
                aria-label="${d.name}: ${g}"
                @click=${()=>u(d.id)}
              >
                <svg class="icon" viewBox="0 0 24 24" style="color: ${m?"var(--secondary-text-color)":d.color}">
                  <path fill="currentColor" d=${m?ii:si}></path>
                </svg>
                <span class="label">${d.name}</span>
                <span class="value">${g}</span>
              </button>
            </li>`})}
        </ul>
      </div>
    </div>`}_bars(e){let t=e.filter(o=>this._value(o.value)!==this._value(0)),s=Math.max(...t.map(o=>o.value),0),r=this._config.color_by_source===!0&&this._by==="consumer",a=this._localize;return p`<div class="bars">
      ${t.map(o=>{let l=s>0?Math.max(o.value/s*100,0):0,c=o.mix?.reduce((d,h)=>d+h.value,0)??0,u="";return this._figure==="cost"&&o.energy!==void 0&&(u=this._fmt.value(o.energy,"energy"),o.energy>0&&(u+=` \xB7 ${a("line_average_price",{price:this._fmt.value(o.value/o.energy,"price")})}`)),p`<div class="bar-row">
          <div class="bar-text">
            <span class="name">${o.name}</span>
            <span class="amount">${this._value(o.value)}</span>
          </div>
          ${u?p`<div class="bar-line">${u}</div>`:y}
          <div class="track">
            <div class="fill" style="width: ${l}%; ${r?"":`--c: ${o.color}`}">
              ${r&&o.mix&&c>0?o.mix.map(d=>p`<span style="width: ${d.value/c*100}%; --c: ${d.color}"></span>`):y}
            </div>
          </div>
        </div>`})}
      ${r?p`<div class="key">
            ${["solar","cheap","grid","expensive"].filter(o=>(o!=="cheap"||this._info?.levels.cheap_until!=null)&&(o!=="expensive"||this._info?.levels.expensive_from!=null)).map(o=>p`<span><span class="dot" style="--c: ${ne[o]}"></span>${a(o==="grid"?this._info?.levels.cheap_until!=null||this._info?.levels.expensive_from!=null?"source.normal":"source.grid":`source.${o}`)}</span>`)}
          </div>`:y}
    </div>`}render(){if(!this.hass)return p``;let e=this._localize,t=this._range(),s=this._sums?this._parts():[],r=s.reduce((h,m)=>h+Math.max(m.value,0),0),a=!this._byStatistics&&this._info?.calculating===!0,o=!this._byStatistics&&this._info!==void 0&&!this._area(),l=this._config.display??(!this._byStatistics&&this._by==="consumer"?"bars":"ring"),c=(this._config.period??"energy_date")==="energy_date",u=t&&!(l==="bars"&&c)?Xe(t,this._language):"",d;return a?d=p`<p class="summary">${e("calculating")}</p>`:o?d=p`<p class="summary">${e(this._info===null?"editor_not_loaded":"figures_unavailable")}</p>`:this._sums?.failed?d=p`<p class="summary">${e("figures_failed")}</p>`:this._sums?r<=0?d=p`<p class="summary">${e("history_empty_figure")}</p>`:d=l==="bars"?this._bars(s):this._ring(s):d=p`<p class="summary">${e("loading")}</p>`,p`<ha-card>
      <div class="header">
        <h2 class="title">${this._title()}</h2>
        ${u?p`<span class="chip">${u}</span>`:y}
      </div>
      ${d}
    </ha-card>`}};fe.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0},_selected:{state:!0},_sums:{state:!0},_hasChart:{state:!0},_hidden:{state:!0}},fe.styles=[L,A`
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
    `];var _e=n=>({select:{mode:"dropdown",options:n}}),ri=n=>n.kind==="household"||!!n.statistics.solar?.length,Te=class extends C{constructor(){super(...arguments);this._label=e=>this._localize(`editor_${e.name}`)}setConfig(e){this._config=e}get _localize(){return w(this.hass?.locale?.language??this.hass?.language??"en")}willUpdate(){this.hass&&this._info===void 0&&(this._info=null,this.hass.callWS({type:`${$}/figures`}).then(e=>{this._info=e}).catch(()=>{}))}_data(){let e=this._config??{type:""},t=!!e.statistics?.length||e.statistics!==void 0&&!e.area;return{title:e.title??"",period:e.period??"energy_date",source:t?"statistics":"energy",area:e.area??"household",by:e.by??"source",figure:e.figure??"energy",display:e.display??(!t&&e.by==="consumer"?"bars":"ring"),color_by_source:e.color_by_source??!1,statistics:(e.statistics??[]).map(s=>s.statistic)}}_schema(e){let t=this._localize,s=[{name:"title",selector:{text:{}}},{name:"period",selector:_e(Q.map(r=>({value:r,label:t(`period.${r}`)})))},{name:"breakdown_source",selector:_e(["energy","statistics"].map(r=>({value:r,label:t(`breakdown_source.${r}`)})))}];if(e.source==="statistics")s.push({name:"statistics",selector:{statistic:{multiple:!0}}});else{let r=(this._info?.areas??[]).filter(ri),a=r.find(l=>l.id===e.area),o=[...a?.statistics.solar?.length?["source"]:[],...a?.kind==="household"?["consumer"]:[]];s.push({name:"area",selector:_e(r.map(l=>({value:l.id,label:l.name})))},{name:"by",selector:_e(o.map(l=>({value:l,label:t(`by.${l}`)})))}),e.by==="consumer"&&s.push({name:"figure",selector:_e(["energy","cost"].map(l=>({value:l,label:t(`figure_choice.${l}`)})))})}return s.push({name:"display",selector:_e(["ring","bars"].map(r=>({value:r,label:t(`display.${r}`)})))}),e.source!=="statistics"&&e.by==="consumer"&&e.display==="bars"&&s.push({name:"color_by_source",selector:{boolean:{}}}),s}_changed(e){if(!this._config)return;let t={...this._data(),...e.detail.value};"breakdown_source"in e.detail.value&&(t.source=e.detail.value.breakdown_source);let s={type:this._config.type};if(typeof t.title=="string"&&t.title&&(s.title=t.title),s.period=t.period??"energy_date",t.source==="statistics"){let r=new Map((this._config.statistics??[]).map(o=>[o.statistic,o])),a=Array.isArray(t.statistics)?t.statistics.filter(Boolean):[];s.statistics=a.map(o=>r.get(o)??{statistic:o})}else{s.area=t.area??"household";let r=this._info?.areas.find(l=>l.id===s.area),a=r?.kind==="household",o=!!r?.statistics.solar?.length;s.by=t.by==="consumer"&&a?"consumer":o?"source":"consumer",s.by==="consumer"&&t.figure==="cost"?s.figure="cost":s.figure="energy"}s.display=t.display==="bars"?"bars":"ring",s.by==="consumer"&&s.display==="bars"&&t.color_by_source===!0&&(s.color_by_source=!0),this._config=s,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:s},bubbles:!0,composed:!0}))}render(){if(!this.hass||!this._config)return p``;let e=this._data();return p`<ha-form
      .hass=${this.hass}
      .data=${{...e,breakdown_source:e.source}}
      .schema=${this._schema(e)}
      .computeLabel=${this._label}
      @value-changed=${this._changed}
    ></ha-form>`}};Te.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0}};var ye=class extends z{constructor(){super(...arguments);this._infoLoading=!1}static getStubConfig(){return{}}static getConfigForm(){return{schema:[{name:"title",selector:{text:{}}}]}}setConfig(e){this._config=e}getCardSize(){return 4}getGridOptions(){return{columns:12,min_columns:6}}get _localize(){return w(this.hass?.locale?.language??this.hass?.language??"en")}get _language(){return this.hass?.locale?.language??"en"}_money(e,t=!1){return F(this.hass?.locale,{style:"currency",currency:this.hass?.config.currency??"EUR",maximumFractionDigits:0,minimumFractionDigits:0,signDisplay:t?"exceptZero":"auto"}).format(e)}_month(e){return new Intl.DateTimeFormat(this._language,{month:"long",year:"numeric"}).format(e)}willUpdate(){this.hass&&(this._info===void 0&&(this._info=O()),D()&&!this._infoLoading&&(this._infoLoading=!0,H(this.hass).then(e=>{this._info=e,this._infoLoading=!1})))}render(){let e=this._localize;if(!this.hass)return p``;let t=R(this.hass),s=us(this.hass);if(!t.length||!s)return p`<ha-card>
        <div class="header"><h2 class="title">${this._config?.title||e("title")}</h2></div>
        <p class="summary">${e(ge(this.hass))}</p>
      </ha-card>`;let r=this._info?T(this._info,E(this)):void 0;return p`<ha-card>
      <div class="header">
        <h2 class="title">${this._config?.title||e("title")}</h2>
        ${s.balance===null?y:p`<span class="chip">${this._money(s.balance,!0)}</span>`}
      </div>
      <p class="summary">${this._summary(s,t)}</p>
      <ul class="rows">
        ${t.map(a=>this._row(a,s,r?.get(a.category)))}
      </ul>
    </ha-card>`}_summary(e,t){let s=this._localize;if(t.some(o=>o.calculating))return s("calculating");let r=this._money(e.saved);if(e.invested<=0)return s("saved_only",{saved:r});let a=[s("saved_invested",{saved:r,invested:this._money(e.invested)})];return e.balance!==null&&e.balance>=0?a.push(s("in_the_plus")):e.inThePlusFrom&&a.push(s("in_the_plus_from",{date:this._month(e.inThePlusFrom)})),a.join(" \xB7 ")}_row(e,t,s){let r=this._localize,a=e.calculating||e.saving===null;return p`<li class="row ${e.category}" style=${s?`--color: ${s}`:""}>
      <span class="swatch" aria-hidden="true"></span>
      <div class="row-body">
        <div class="line">
          <span>${r(`category.${e.category}`)}</span>
          <span class="amount ${a?"waiting":""}"
            >${a?"\u2013":this._money(e.saving??0)}</span
          >
        </div>
        <div class="sub">
          ${e.calculating?r("calculating"):this._details(e,t)}
        </div>
      </div>
    </li>`}_details(e,t){let s=this._localize,r=[];return e.countingSince&&r.push(s("since",{date:this._month(e.countingSince)})),e.perYear!==null?r.push(s("per_year",{amount:this._money(e.perYear)})):e.yearlyFrom&&r.push(s("yearly_from",{date:this._month(e.yearlyFrom)})),t.invested>0&&!e.investment&&r.push(s("no_investment")),e.heatEstimated&&r.push(s("heat_estimated")),r.join(" \xB7 ")}};ye.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0}},ye.styles=[L,A`
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
        font-size: var(--ha-font-size-s, 12px);
        line-height: 16px;
        color: var(--secondary-text-color);
      }
      .sub:empty {
        display: none;
      }
    `];var ni=300*1e3,U=(n,i)=>(i??[]).reduce((e,t)=>e+(n[t]??0),0),oe=class extends z{constructor(){super(...arguments);this._infoLoading=!1}getCardSize(){return 4}getGridOptions(){return{columns:12,min_columns:6}}connectedCallback(){super.connectedCallback(),this._follow()}disconnectedCallback(){super.disconnectedCallback(),this._unfollow?.(),this._unfollow=void 0,clearTimeout(this._retryTimer),this._retryTimer=void 0}get _localize(){return w(this.hass?.locale?.language??this.hass?.language??"en")}get _fmt(){return J(this.hass?.locale,this.hass?.config.currency??"EUR")}_follow(){this._unfollow||!this.isConnected||!this.hass?.connection||(this._unfollow=Y(this.hass.connection,e=>{this._selected=e}))}async _loadInfo(){!this.hass||this._infoLoading||(this._infoLoading=!0,this._info=await H(this.hass),this._infoLoading=!1,clearTimeout(this._retryTimer),this._retryTimer=void 0,this.isConnected&&(!this._info||this._info.calculating)&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),P)))}async _load(e,t,s){if(!this.hass)return;this._loading=e;let r=null;try{r=await st(this.hass,t,s)}catch{}this._loading===e&&(this._loading=void 0,this._sums={key:e,at:Date.now(),values:r})}willUpdate(){if(!this.hass||(this._follow(),this._info===void 0&&(this._info=O()),D()&&!this._infoLoading&&this._loadInfo(),this._selected===void 0||!this._info||this._info.calculating))return;let e=this._selected??M("this_month"),t=[...new Set(this._ids())].sort();if(!t.length)return;let s=JSON.stringify([t,e.start,e.end]),r=!this._sums||Date.now()-this._sums.at>ni;s!==this._loading&&(s!==this._sums?.key||r&&!this._loading)&&this._load(s,t,e)}_waiting(){if(!this.hass)return;let e=R(this.hass);return e.length?e.some(t=>t.calculating)||this._info?.calculating?"calculating":this._info===null?"editor_not_loaded":this._info===void 0?"loading":this._ids().length?this._sums?this._sums.values?void 0:"history_failed":"loading":"figures_unavailable":ge(this.hass)}};oe.properties={hass:{attribute:!1},_info:{state:!0},_selected:{state:!0},_sums:{state:!0}};var it=A`
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
`;var Fe=class extends oe{static getStubConfig(){return{}}static getConfigForm(){return{schema:[]}}setConfig(i){}get _devices(){return this._info?et(this._info).sort((i,e)=>i.name.localeCompare(e.name,this.hass?.locale?.language)):[]}_ids(){return this._devices.flatMap(i=>[...i.statistics.heat??[],...i.statistics.energy??[]])}render(){let i=this._localize;if(!this.hass)return p``;let e=this._waiting(),t=this._devices,s=t.length?t.map(r=>r.name).join(" & "):i("figure.heat");return p`<ha-card>
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
        ${this._devices.map(r=>{let a=U(t,r.statistics.heat),o=U(t,r.statistics.energy);return p`<tr>
            <td class="swatch-cell">
              <span class="swatch" style="--color: ${s.get(r.id)??""}" aria-hidden="true"></span>
            </td>
            <td class="name">${r.name}</td>
            <td>${e.value(a,"energy")}</td>
            <td>${e.value(o,"energy")}</td>
            <td>${o>0?e.number(a/o,2):"\u2013"}</td>
          </tr>`})}
      </tbody>
    </table>`}};Fe.styles=[L,it];var ai=300*1e3,oi="200px",ci={energy:"energy",cost:"money",saving:"money",export:"energy",heat:"energy",distance:"distance",alternative_cost:"money"},ve=class extends z{constructor(){super(...arguments);this._config={type:""};this._infoLoading=!1;this._watchingChart=!1}static getStubConfig(){return{}}static getConfigElement(){return document.createElement("electricity-lens-history-card-editor")}setConfig(e){this._config=e??{type:""}}getCardSize(){return 5}getGridOptions(){return{columns:12,min_columns:6}}connectedCallback(){super.connectedCallback(),this._follow()}disconnectedCallback(){super.disconnectedCallback(),this._unfollow?.(),this._unfollow=void 0,clearTimeout(this._retryTimer),this._retryTimer=void 0}get _localize(){return w(this.hass?.locale?.language??this.hass?.language??"en")}get _language(){return this.hass?.locale?.language??"en"}get _fmt(){return J(this.hass?.locale,this.hass?.config.currency??"EUR")}get _savings(){return!this._config.area}_follow(){(this._config.period??"energy_date")==="energy_date"&&(this._unfollow||!this.isConnected||!this.hass?.connection||(this._unfollow=Y(this.hass.connection,e=>{this._selected=e})))}async _loadInfo(){!this.hass||this._infoLoading||(this._infoLoading=!0,this._info=await H(this.hass),this._infoLoading=!1,clearTimeout(this._retryTimer),this._retryTimer=void 0,this.isConnected&&(!this._info||this._info.calculating)&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),P)))}_range(e){let t=this._config.period??"energy_date";if(t==="all")return{range:e(),period:"year"};if(t!=="energy_date"){let r=M(t);return{range:r,period:q(r)}}if(this._selected===void 0)return;if(this._selected)return{range:this._selected,period:q(this._selected)};let s=e();return{range:s,period:this._savings?"year":q(s)}}_savingsPlan(){if(!this.hass)return;let e=this._localize,t=R(this.hass);if(!t.length||t.some(c=>c.calculating))return;let s=this._range(()=>cs(t.map(c=>c.countingSince)));if(!s)return;let r=E(this),a=this._info?T(this._info,r):void 0,o={pv:r.solar,heat_pump:a?.get("heat_pump")??r.heat,wallbox:a?.get("wallbox")??r.car},l=t.map(c=>({series:{id:c.category,name:{},color:o[c.category],plus:[c.savingStatistic],minus:[]},name:e(`category.${c.category}`)}));return this._plan(s,l,"money",void 0,[])}_figurePlan(){let e=this._info,t=this._config;if(!e||e.calculating)return;let s=e.areas.find(g=>g.id===t.area),r=t.figure??"energy";if(!s||!s.statistics[r]?.length)return;let a=this._range(()=>M("this_month"));if(!a)return;let o=this._localize,l=me(s,r),c=t.stack&&l.includes(t.stack)?t.stack:l[0],u=tt(e,s,r,c,E(this)).map(g=>({series:g,name:g.name.text??(g.name.key&&G(g.name.key)?o(g.name.key):g.id)}));u.length===1&&(u[0].name=N(o,r,s));let d=t.line==="grid_price"?e.areas.find(g=>g.kind==="grid")??s:s,h=t.line&&s.statistics?{figure:t.line,area:d,name:t.line_name??N(o,t.line,d)}:void 0,m=r==="cost"?[...s.statistics.solar??[],...s.statistics.solar_cost??[]]:[];return this._plan(a,u,ci[r],h,t.lines??[],m)}_plan(e,t,s,r,a,o=[]){let l=new Set(o);for(let{series:u}of t)[...u.plus,...u.minus].forEach(d=>l.add(d));if(r)for(let u of Object.values(r.area.statistics))(u??[]).forEach(d=>l.add(d));a.forEach(u=>l.add(u.statistic));let c=[...l].sort();return{key:JSON.stringify([c,t.map(u=>[u.series.id,u.series.color]),r?.figure,a,e.range.start,e.range.end,e.period]),range:e.range,period:e.period,bars:t,unit:s,lineFigure:r,lines:a,ids:c}}async _load(e){if(!this.hass)return;this._loading=e.key;let t={key:e.key,at:Date.now(),plan:e,slots:os(e.range,e.period),rows:{},metadata:{},failed:!1};try{let s=e.lines.map(o=>o.statistic),[r,a]=await Promise.all([this.hass.callWS({type:"recorder/statistics_during_period",start_time:new Date(e.range.start).toISOString(),end_time:new Date(e.range.end+1).toISOString(),statistic_ids:e.ids,period:de(e.period),types:["change","mean"],units:{energy:"kWh"}}),s.length?this.hass.callWS({type:"recorder/get_statistics_metadata",statistic_ids:s}):Promise.resolve([])]);t.rows=r,t.metadata=Object.fromEntries(a.map(o=>[o.statistic_id,o]))}catch{t.failed=!0}this._loading===e.key&&(this._loading=void 0,this._loaded=t)}willUpdate(e){if(!this.hass)return;(e.has("hass")||e.has("_config"))&&this._follow(),this._watchingChart||(this._watchingChart=!0,Ze(r=>{this._hasChart=r})),this._info===void 0&&(this._info=O()),D()&&!this._infoLoading?this._loadInfo():!this._savings&&this.isConnected&&this._info?.calculating&&!this._retryTimer&&!this._infoLoading&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),P));let t=this._savings?this._savingsPlan():this._figurePlan(),s=!this._loaded||Date.now()-this._loaded.at>ai;t&&t.key!==this._loading&&(t.key!==this._loaded?.key||s&&!this._loading)&&this._load(t),e.has("_loaded")&&(this._chart=this._buildChart())}_perSlot(e){let t=this._loaded;if(!t)return[];let s=t.slots.map(()=>null);for(let r of e)yt(t.rows[r],t.slots,t.plan.period).forEach((a,o)=>{a!==null&&(s[o]=(s[o]??0)+a)});return s}_barValues(e){let t=this._perSlot(e.plus),s=this._perSlot(e.minus);return t.map((r,a)=>{if(r===null&&s[a]===null)return null;let o=(r??0)-(s[a]??0),l=e.floor?Math.max(o,0):o;return e.negative?-l:l})}_lines(){let e=this._loaded;if(!e)return[];let{plan:t,slots:s}=e,r=this._fmt,a=E(this),o=this.hass?.config.currency==="EUR"?100:1,l=[];if(t.lineFigure){let{figure:c,area:u,name:d}=t.lineFigure,h=Object.fromEntries(Object.entries(u.statistics).map(([f,x])=>[f,this._perSlot(x??[])])),m=s.map((f,x)=>ue(c,u,k=>h[k]?.[x]??null,null).value),g=ue(c,u,()=>0,null).unit;l.push({id:`line_${c}`,name:d,color:a.line,dash:"dashed",step:g==="price"&&t.period==="hour",values:g==="price"?m.map(f=>f===null?null:f*o):m,format:f=>r.value(g==="price"?f/o:f,g)})}return t.lines.forEach((c,u)=>{let d=e.metadata[c.statistic],h=c.value??(d?.has_sum?"change":"mean"),m=d?.unit_class==="energy"?"kWh":d?.statistics_unit_of_measurement??"",g=h==="mean"?ls(e.rows[c.statistic],s,t.period):yt(e.rows[c.statistic],s,t.period);l.push({id:`statistic_${u}`,name:c.name??d?.name??this.hass?.states[c.statistic]?.attributes.friendly_name??c.statistic,color:u===0&&!t.lineFigure?a.line:a.consumers[u%a.consumers.length],dash:"dotted",values:g,format:f=>`${r.number(f)}${m?` ${m}`:""}`})}),l}_buildChart(){let e=this._loaded;if(!e||e.failed)return;let t=this._localize,s=this._fmt,{plan:r}=e,a=r.bars.map(({series:u,name:d})=>({id:u.id,name:d,color:u.color,values:this._barValues(u),inTotal:!u.negative})),o=this._lines(),l={price:this.hass?.config.currency==="EUR"?"ct/kWh":`${s.currencySymbol()}/kWh`,percent:"%",per_100km:`${s.currencySymbol()}/100 km`},c=r.lineFigure&&!r.lines.length?l[ue(r.lineFigure.figure,r.lineFigure.area,()=>0,null).unit]??"":"";return Xt({labels:this._labels(e.slots,r.period),series:a,unit:r.unit==="money"?s.currencySymbol():r.unit==="distance"?"km":"kWh",total:t("history_total"),format:u=>r.unit==="money"?s.value(u,"money"):`${s.number(u,Math.abs(u)<10?2:1)} ${r.unit==="distance"?"km":"kWh"}`,tick:u=>s.number(u),lineTick:u=>s.number(u,Number.isInteger(u)?0:1),lines:o,lineUnit:c})}_labels(e,t){let s=c=>new Intl.DateTimeFormat(this._language,c),r=s({hour:"2-digit",minute:"2-digit",hour12:is(this.hass?.locale)}),a=e.length>0&&new Date(e[0]).getFullYear()!==new Date(e[e.length-1]).getFullYear(),o={hour:r,day:s({day:"numeric"}),month:s(a?{month:"short",year:"2-digit"}:{month:"short"}),year:s({year:"numeric"})}[t],l={hour:r,day:s({weekday:"short",day:"numeric",month:"short"}),month:s({month:"long",year:"numeric"}),year:s({year:"numeric"})}[t];return e.map(c=>({axis:o.format(c),tooltip:t==="hour"?`${r.format(c)} \u2013 ${r.format(c+36e5)}`:l.format(c)}))}_title(){let e=this._localize;if(this._config.title)return this._config.title;if(this._savings)return e("history_title");let t=this._config.figure??"energy",s=this._info?.areas.find(a=>a.id===this._config.area);if(s)return N(e,t,s);let r=`figure.${t}`;return G(r)?e(r):e("history_title")}_note(e){let t=this._localize;if(!this.hass)return"";if(this._savings){let o=R(this.hass).map(l=>t(l.category==="pv"?"compare_pv":l.category==="wallbox"?"compare_fuel":l.heating==="oil"?"compare_oil":"compare_gas"));return o.length?t("history_savings_note",{list:new Intl.ListFormat(this._language,{type:"conjunction"}).format(o)}):""}let s=this._info?.areas.find(o=>o.id===this._config.area);if(this._config.figure==="saving"&&s?.statistics.alternative_cost?.length)return t("history_saving_note");if(!e||e.failed||this._config.figure!=="cost")return"";if(this._config.stack==="bill")return t("history_bill_note");let r=o=>this._perSlot(o??[]).reduce((l,c)=>l+(c??0),0),a=r(s?.statistics.solar);return a>0?t("history_cost_note",{rate:this._fmt.value(r(s?.statistics.solar_cost)/a,"price")}):t("history_cost_note_no_solar")}render(){let e=this._localize;if(!this.hass)return p``;let t=this._title();if(this._savings&&!R(this.hass).length)return p`<ha-card>
        <div class="header"><h2 class="title">${t}</h2></div>
        <p class="summary">${e(ge(this.hass))}</p>
      </ha-card>`;let s=this._savings?R(this.hass).some(h=>h.calculating):this._info?.calculating===!0,r=s?void 0:this._loaded,a=this._chart?.data.filter(h=>h.type==="bar"&&h.id!=="export").flatMap(h=>h.data.map(m=>m.value??null))??[],o=a.reduce((h,m)=>h+(m??0),0),l=a.some(h=>h),c=r?.plan.unit??"money",u=!this._savings&&this._info!==void 0&&!this._info?.areas.some(h=>h.id===this._config.area&&h.statistics[this._config.figure??"energy"]?.length),d=this._note(r);return p`<ha-card>
      <div class="header">
        <h2 class="title">${t}</h2>
        ${r&&!r.failed&&l?p`<span class="chip">${this._fmt.value(o,c)}</span>`:r?p`<span class="chip">${Xe(r.plan.range,this._language)}</span>`:y}
      </div>
      ${d?p`<p class="note">${d}</p>`:y}
      ${s?p`<p class="summary">${e("calculating")}</p>`:u?p`<p class="summary">${e(this._info===null?"editor_not_loaded":"figures_unavailable")}</p>`:this._body(r,l)}
    </ha-card>`}_body(e,t){let s=this._localize;return this._hasChart===!1?p`<p class="summary">${s("history_no_chart")}</p>`:e?.failed?p`<p class="summary">${s("history_failed")}</p>`:p`<div class="chart">
      ${this._chart&&this._hasChart?p`<ha-chart-base
            .hass=${this.hass}
            .data=${this._chart.data}
            .options=${this._chart.options}
          ></ha-chart-base>`:y}
      ${e&&!t?p`<div class="empty">
            ${s(this._savings?"history_empty":"history_empty_figure")}
          </div>`:y}
    </div>`}};ve.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0},_selected:{state:!0},_loaded:{state:!0},_hasChart:{state:!0}},ve.styles=[L,A`
      .note {
        margin: 0;
        padding: var(--ha-space-1, 4px) var(--ha-space-4, 16px) 0;
        font-size: var(--ha-font-size-s, 12px);
        line-height: 16px;
        color: var(--secondary-text-color);
      }
      .chart {
        position: relative;
        min-height: ${Ue(oi)};
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
    `];function li(n,i,e={}){let t=a=>i.areas.find(o=>o.id===a)?.statistics??{},s=i.areas.find(a=>a.kind==="grid")?.statistics??{},r=[];for(let a of n){let o=[a.savingStatistic];if(a.category==="pv"){let l=s.export?.length?s.export:[],c=l.length?s.feed_in??[]:[];r.push({name:"savings_pv",color:ne.solar,plus:o,minus:c,energy:t("solar").self_used??[]}),c.length&&r.push({name:"savings_feed_in",color:ne.export,plus:c,minus:[],energy:l})}else a.category==="heat_pump"?r.push({name:a.heating==="oil"?"savings_oil":"savings_gas",color:e.heat??ne.heat,plus:o,minus:[],energy:t("heat_pump").energy??[]}):r.push({name:"savings_fuel",color:e.car??ne.car,plus:o,minus:[],energy:t("wallbox").energy??[]})}return r}var Pe=class extends oe{constructor(){super(...arguments);this._config={}}static getStubConfig(){return{}}static getConfigElement(){return document.createElement("electricity-lens-savings-card-editor")}setConfig(e){this._config=e??{},this.requestUpdate()}get _area(){return this._info?.areas.find(e=>e.id===this._config.area)}_rows(){if(!this.hass||!this._info)return[];let e=T(this._info,E(this));return li(R(this.hass),this._info,{heat:e.get("heat_pump"),car:e.get("wallbox")})}_ids(){if(this._config.area){let e=this._area?.statistics;return e?.alternative_cost?.length&&e.cost?.length&&e.saving?.length?[...e.alternative_cost,...e.cost,...e.saving]:[]}return this._rows().flatMap(e=>[...e.plus,...e.minus,...e.energy])}render(){let e=this._localize;if(!this.hass)return p``;let t=this._waiting();return p`<ha-card>
      <div class="header"><h2 class="title">${e("savings_title")}</h2></div>
      ${t?p`<p class="summary">${e(t)}</p>`:this._config.area?this._reckoning():this._table()}
    </ha-card>`}_reckoning(){let e=this._localize,t=this._fmt,s=this._area,r=this._sums?.values??{},a=U(r,s?.statistics.alternative_cost),o=U(r,s?.statistics.cost),l=a-o,c=l-U(r,s?.statistics.saving),u=R(this.hass).find(m=>m.category===s?.id)?.heating,d=s?.id==="wallbox"?"savings_instead_fuel":u==="oil"?"savings_instead_oil":"savings_instead_gas",h=Math.abs(c)>=.005;return p`${h?p`<p class="note">${e("savings_area_note")}</p>`:y}
      <table>
        <tbody>
          <tr>
            <td class="name">${e(d)}</td>
            <td>${t.value(a,"money")}</td>
          </tr>
          <tr>
            <td class="name">
              ${s?.id==="wallbox"?e("strategy.charging_cost"):e("savings_electricity",{name:s?.name??""})}
            </td>
            <td>${t.value(-o,"money")}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th scope="row" class="name">${e("savings_title")}</th>
            <td>${t.value(l,"money")}</td>
          </tr>
          ${h?p`<tr class="quiet">
                <th scope="row" class="name">${e("savings_solar_part")}</th>
                <td>${t.value(c,"money")}</td>
              </tr>`:y}
        </tfoot>
      </table>`}_table(){let e=this._localize,t=this._fmt,s=this._rows(),r=this._sums?.values??{},a=c=>U(r,c.plus)-U(r,c.minus),o=s.reduce((c,u)=>c+a(u),0),l=R(this.hass);return p`${s.length>1&&l.some(c=>c.category==="pv")?p`<p class="note">${e("savings_note")}</p>`:y}
      <table>
        <thead>
          <tr>
            <th scope="col" colspan="2" class="name">${e("savings_source")}</th>
            <th scope="col">${e("savings_energy")}</th>
            <th scope="col">${e("savings_amount")}</th>
          </tr>
        </thead>
        <tbody>
          ${s.map(c=>{let u=U(r,c.energy);return p`<tr>
              <td class="swatch-cell">
                <span class="swatch" style="--color: ${c.color}" aria-hidden="true"></span>
              </td>
              <td class="name">${e(c.name)}</td>
              <!-- Older periods may hold savings, but no energy to go with them. -->
              <td>${u||!a(c)?t.value(u,"energy"):"\u2013"}</td>
              <td>${t.value(a(c),"money")}</td>
            </tr>`})}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row" colspan="2" class="name">${e("savings_total")}</th>
            <td></td>
            <td>${t.value(o,"money")}</td>
          </tr>
        </tfoot>
      </table>`}};Pe.styles=[L,it];var ui=["energy","statistic","entity"],be=n=>({select:{mode:"dropdown",options:n}}),xe=class extends C{constructor(){super(...arguments);this._label=e=>this._localize(`editor_${e.name}`);this._helper=e=>e.name==="period"?this._localize("editor_period_hint"):void 0}setConfig(e){this._config=St(e)}get _localize(){return w(this.hass?.locale?.language??this.hass?.language??"en")}willUpdate(){this.hass&&this._info===void 0&&(this._info=null,this.hass.callWS({type:`${$}/figures`}).then(e=>{this._info=e}).catch(()=>{}))}_schema(e){let t=this._localize,s=W(e),r=[{name:"source",selector:be(ui.map(a=>({value:a,label:t(`source.${a}`)})))}];if(s==="energy"){let a=this._info?.areas??[],o=a.find(l=>l.id===e.area);r.push({name:"area",selector:be(a.map(l=>({value:l.id,label:l.name})))},{name:"figure",selector:be(o?Z(o).map(l=>({value:l,label:N(t,l,o)})):[])})}else s==="statistic"?(r.push({name:"statistic",selector:{statistic:{}}},{name:"value",selector:be(as.map(a=>({value:a,label:t(`value.${a}`)})))}),(e.value??"change")==="mean"&&r.push({name:"secondary",selector:be(["none","range"].map(a=>({value:a,label:t(`secondary.${a}`)})))})):r.push({name:"entity",selector:{entity:{}}});return r.push({name:"name",selector:{text:{}}},{name:"period",selector:be(Q.map(a=>({value:a,label:t(`period.${a}`)})))}),r}_figureFrom(e,t){let s=e.source??W(t);if(s!==W(t))return s==="energy"?{area:"household",figure:"cost"}:s==="statistic"?{statistic:"",value:"change"}:{entity:""};if(s==="energy"){let r=e.area??t.area,a=this._info?.areas.find(c=>c.id===r),o=a?Z(a):[],l=o.includes(e.figure)?e.figure:o[0];return{area:r,figure:l,...t.secondary==="none"?{secondary:"none"}:{}}}if(s==="statistic"){let r={statistic:e.statistic??"",value:e.value??"change"};return r.value==="mean"&&e.secondary==="range"&&(r.secondary="range"),r}return{entity:e.entity??""}}_changed(e){if(!this._config)return;let t=e.detail.value,{area:s,figure:r,statistic:a,value:o,secondary:l,entity:c,name:u,...d}=this._config,h={...d,period:t.period??"energy_date",...this._figureFrom(t,this._config)};typeof t.name=="string"&&t.name&&(h.name=t.name),this._config=h,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:h},bubbles:!0,composed:!0}))}render(){if(!this.hass||!this._config)return p``;let e=this._config;return p`<div class="editor">
      ${W(e)==="energy"&&this._info===null?p`<p class="hint">${this._localize("editor_not_loaded")}</p>`:y}
      <ha-form
        .hass=${this.hass}
        .data=${{source:W(e),...e,value:e.value??"change",secondary:e.secondary??"none",period:e.period??"energy_date"}}
        .schema=${this._schema(e)}
        .computeLabel=${this._label}
        .computeHelper=${this._helper}
        @value-changed=${this._changed}
      ></ha-form>
    </div>`}};xe.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0}},xe.styles=A`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .hint {
      margin: 0;
      color: var(--secondary-text-color);
    }
  `;var kt="savings",ze=n=>({select:{mode:"dropdown",options:n}}),Le=class extends C{constructor(){super(...arguments);this._label=e=>this._localize(`editor_${e.name}`)}setConfig(e){this._config=e}get _localize(){return w(this.hass?.locale?.language??this.hass?.language??"en")}willUpdate(){this.hass&&this._info===void 0&&(this._info=null,this.hass.callWS({type:`${$}/figures`}).then(e=>{this._info=e}).catch(()=>{}))}_schema(){let e=this._localize,t=this._config??{type:""},s=this._info?.areas??[],r=[{name:"title",selector:{text:{}}},{name:"period",selector:ze([...Q,"all"].map(o=>({value:o,label:e(`period.${o}`)})))},{name:"area",selector:ze([{value:kt,label:e("editor_savings")},...s.filter(o=>Re(o).length).map(o=>({value:o.id,label:o.name}))])}],a=s.find(o=>o.id===t.area);if(a){let o=Re(a),l=t.figure&&o.includes(t.figure)?t.figure:o[0];r.push({name:"figure",selector:ze(o.map(c=>({value:c,label:N(e,c,a)})))},{name:"stack",selector:ze(me(a,l).map(c=>({value:c,label:e(`stack.${c}`)})))},{name:"line",selector:ze([{value:"none",label:e("editor_line_none")},...Ct(a).map(c=>({value:c,label:N(e,c,a)}))])},{name:"lines",selector:{statistic:{multiple:!0}}})}return r}_data(){let e=this._config??{type:""},t=this._info?.areas.find(a=>a.id===e.area),s=t?Re(t):[],r=e.figure&&s.includes(e.figure)?e.figure:s[0];return{title:e.title??"",period:e.period??"energy_date",area:e.area??kt,figure:r,stack:e.stack??(t&&r?me(t,r)[0]:void 0),line:e.line??"none",lines:(e.lines??[]).map(a=>a.statistic)}}_changed(e){if(!this._config)return;let t=e.detail.value,s={type:this._config.type};typeof t.title=="string"&&t.title&&(s.title=t.title),s.period=t.period??"energy_date";let r=t.area;if(r&&r!==kt){s.area=r;let a=this._info?.areas.find(g=>g.id===r),o=a?Re(a):[],l=o.includes(t.figure)?t.figure:o[0];l&&(s.figure=l),(a&&l?me(a,l):[]).includes(t.stack)&&(s.stack=t.stack),(a?Ct(a):[]).includes(t.line)&&(s.line=t.line);let d=new Map((this._config.lines??[]).map(g=>[g.statistic,g])),m=(Array.isArray(t.lines)?t.lines:[]).filter(Boolean).map(g=>d.get(g)??{statistic:g});m.length&&(s.lines=m)}this._config=s,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:s},bubbles:!0,composed:!0}))}render(){return!this.hass||!this._config?p``:p`<ha-form
      .hass=${this.hass}
      .data=${this._data()}
      .schema=${this._schema()}
      .computeLabel=${this._label}
      @value-changed=${this._changed}
    ></ha-form>`}};Le.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0}};var gs="https://github.com/ignazhabibi/ha-electricity-lens",At=(n,i)=>{if(!customElements.get(n))try{customElements.define(n,i)}catch{customElements.define(n,class extends i{})}};function ps(n,i=[]){let e=()=>{n.forEach(({tag:o,card:l,editor:c})=>{At(o,l),c&&At(c.tag,c.element)}),i.forEach(({type:o,element:l})=>At(`ll-strategy-dashboard-${o}`,l))};e();let t=window.customElements,s=Date.now(),r=window.setInterval(()=>{let o=window.customElements!==t;o&&e(),(o||Date.now()-s>6e4)&&window.clearInterval(r)},100),a=window;a.customStrategies=a.customStrategies??[];for(let{type:o,name:l,description:c}of i)a.customStrategies.some(u=>u.type===o)||a.customStrategies.push({type:o,strategyType:"dashboard",name:l,description:c,documentationURL:gs});a.customCards=a.customCards??[];for(let{tag:o,name:l,description:c}of n)a.customCards.some(u=>u.type===o)||a.customCards.push({type:o,name:l,description:c,preview:!0,documentationURL:gs})}var Et="all",Me=class extends C{constructor(){super(...arguments);this._label=()=>this._localize("editor_area")}setConfig(e){this._config=e}get _localize(){return w(this.hass?.locale?.language??this.hass?.language??"en")}_changed(e){let{area:t,...s}=this._config??{},r=e.detail.value.area,a=r&&r!==Et?{...s,area:r}:s;this._config=a,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:a},bubbles:!0,composed:!0}))}render(){if(!this.hass||!this._config)return p``;let e=this._localize,t=[{name:"area",selector:{select:{mode:"dropdown",options:[{value:Et,label:e("editor_savings")},{value:"heat_pump",label:e("category.heat_pump")},{value:"wallbox",label:e("category.wallbox")}]}}}];return p`<ha-form
      .hass=${this.hass}
      .data=${{area:this._config.area??Et}}
      .schema=${t}
      .computeLabel=${this._label}
      @value-changed=${this._changed}
    ></ha-form>`}};Me.properties={hass:{attribute:!1},_config:{state:!0}};var S=(n,i={})=>({type:n.startsWith("electricity-lens")?`custom:${n}`:n,...i}),ms={grid_options:{columns:"full"}},Ie={grid_options:{columns:6}},j={grid_options:{columns:12}},fs=(n,i,e={},t)=>S("electricity-lens-figures-card",{area:n,figure:i,...t?{name:t}:{},...Ie,...e}),De=(n,i,e,t,s=!0)=>({title:n,path:i,type:"sections",max_columns:3,sections:[{type:"grid",column_span:2,cards:[...s?[S("energy-date-selection",ms)]:[],...e.map(r=>({...ms,...r}))]}],sidebar:{sections:[{type:"grid",cards:t}]}});function di(n){let i=Object.values(n.entities??{}).filter(a=>a.platform===$),e=["pv","heat_pump","wallbox"],t=i.filter(a=>a.translation_key==="saving"),s=t.map(a=>n.states[a.entity_id]?.attributes.category).filter(a=>e.includes(a)),r=t.flatMap(a=>{let o=n.states[a.entity_id]?.attributes,l=h=>i.find(m=>m.device_id===a.device_id&&m.translation_key===h)?.entity_id,c=l("payback"),u=l("annual_return"),d=o?.category;return e.includes(d)&&Number(o?.investment)>0&&c&&u?[{category:d,payback:c,annualReturn:u}]:[]});return r.sort((a,o)=>e.indexOf(a.category)-e.indexOf(o.category)),{categories:s,investments:r}}function hi(n,i,e={categories:[],investments:[]}){let t=(_,b,K={})=>fs(_,b,K,i(`figure.${b}`)),s=(_,b,K,_s={})=>fs(_,b,_s,i(K)),r=(_,b,K={})=>S(_,{title:i(b),...K}),a=_=>n.areas.find(b=>b.id===_),o=a("solar"),l=a("heat_pump"),c=a("wallbox"),u=n.areas.some(_=>_.kind==="device"),d=!!(o?.statistics.saving?.length||l||c||e.categories.length),h={period:"today"},m={line:"price",...o?{line_name:i("strategy.price_with_solar")}:{}},g=(_,b={})=>o?s(_,"price","strategy.price_with_solar",b):t(_,"price",b),f={secondary:"none"},x=(_,b={})=>S("electricity-lens-history-card",{area:_,figure:"energy",stack:"source",...m,...b}),v=_=>S("electricity-lens-breakdown-card",{area:_,by:"source",...j}),k=e.investments.flatMap(({category:_,payback:b,annualReturn:K})=>[S("electricity-lens-figures-card",{entity:b,name:i(`strategy.payback_${_}`),secondary:"payback",visibility:[{condition:"numeric_state",entity:b,below:100}],...Ie}),S("electricity-lens-figures-card",{entity:K,name:i(`strategy.return_${_}`),secondary:"return",visibility:[{condition:"numeric_state",entity:K,above:-1}],...Ie})]),I=[];return I.push(De(i("strategy.overview"),"now",[d?S("electricity-lens-balance-card"):x("household",h)],[s("household","cost","strategy.cost_today",h),o?s("household","solar_share","strategy.self_sufficiency_today",h):s("household","price","strategy.price_today",h),s("household","energy","strategy.consumption_today",h),...o?[s("solar","energy","strategy.solar_today",h)]:[],...o?.forecast?[t("solar","forecast_today"),t("solar","forecast_tomorrow")]:[],...k],!1)),I.push(De(i("strategy.electricity"),"household",[r("energy-usage-graph","strategy.usage_graph"),...o?[r("energy-solar-graph","strategy.solar_graph")]:[],...u?[S("electricity-lens-history-card",{title:i("strategy.devices_graph"),area:"household",figure:"energy",stack:"consumer"})]:[]],[r("energy-distribution","strategy.distribution",j),v("household"),...o?[S("energy-self-sufficiency-gauge",Ie),S("energy-solar-consumed-gauge",Ie)]:[]])),I.push(De(i("strategy.costs"),"costs",[r("electricity-lens-history-card","strategy.bill",{area:"household",figure:"cost",stack:"bill",line:"grid_price"}),...o?[r("electricity-lens-history-card","strategy.cost_with_solar",{area:"household",figure:"cost",stack:"source",...m})]:[],r("electricity-lens-history-card","strategy.cost_history",{area:"household",figure:"cost",stack:"consumer",...o?{}:m})],[t("grid","grid_price",f),g("household",f),r("electricity-lens-breakdown-card","strategy.cost_distribution",{area:"household",by:"consumer",figure:"cost",display:"bars",color_by_source:!0,...j}),...d?[S("electricity-lens-savings-card",j)]:[]])),l&&I.push(De(i("strategy.heating"),"heating",[r("electricity-lens-history-card","figure.heat",{area:"heat_pump",figure:"heat",stack:"consumer",line:"scop",line_name:i("figure.scop")}),r("electricity-lens-history-card","strategy.usage_graph",{area:"heat_pump",figure:"energy",stack:"source"}),r("electricity-lens-history-card",o?"strategy.cost_with_solar":"figure.cost",{area:"heat_pump",figure:"cost",stack:"source",...m})],[t("heat_pump","scop",f),t("heat_pump","heat_price",f),v("heat_pump"),...et(n).length?[S("electricity-lens-heat-meters-card",j)]:[...(l.statistics.energy?.length??0)>1?[S("electricity-lens-breakdown-card",{area:"heat_pump",by:"consumer",figure:"energy",display:"bars",color_by_source:!0,...j})]:[],...(l.statistics.heat_meters?.length??0)>1?[S("electricity-lens-breakdown-card",{title:i("figure.heat"),statistics:(l.statistics.heat_meters??[]).map(_=>({statistic:_})),display:"bars",...j})]:[]],S("electricity-lens-savings-card",{area:"heat_pump",...j})])),c&&I.push(De(i("strategy.charging"),"charging",[r("electricity-lens-history-card","strategy.charged_energy",{area:"wallbox",figure:"energy",stack:"source"}),r("electricity-lens-history-card","strategy.charging_cost",{area:"wallbox",figure:"cost",stack:"source",...m})],[t("wallbox","device_grid_price",f),g("wallbox",f),v("wallbox"),S("electricity-lens-savings-card",{area:"wallbox",...j})])),I}var gi=3e4,pi=1e3;async function mi(n){let i=n.config.state!==void 0&&n.config.state!=="RUNNING",e=Date.now()+gi;for(;;)try{return await n.callWS({type:`${$}/figures`})}catch(t){if(!i||Date.now()>=e)throw t;await new Promise(s=>setTimeout(s,pi))}}var Oe=class extends HTMLElement{static async generate(i,e){let t=w(e.locale?.language??e.language??"en"),s;try{s=await mi(e)}catch{return{title:t("strategy.title"),views:[{title:t("strategy.title"),cards:[{type:"markdown",content:t("strategy.not_loaded")}]}]}}return{title:t("strategy.title"),views:hi(s,t,di(e))}}};Oe.noEditor=!0;ps([{tag:"electricity-lens-balance-card",card:ye,name:"Electricity Lens balance",description:"What your PV plant, heat pump, and electric car have saved, and when they pay off."},{tag:"electricity-lens-savings-card",card:Pe,name:"Electricity Lens savings",description:"What solar power, the heat pump, and the electric car saved in the selected period, as a table, or one area's saving reckoned up. Follows the energy date selection.",editor:{tag:"electricity-lens-savings-card-editor",element:Me}},{tag:"electricity-lens-heat-meters-card",card:Fe,name:"Electricity Lens heat meters",description:"Heat, electricity, and seasonal COP of each of the heat pump's meters in the selected period. Follows the energy date selection."},{tag:"electricity-lens-history-card",card:ve,name:"Electricity Lens history",description:"Savings, consumption, or costs per period as bars, stacked by source or consumer, with lines. Follows the energy date selection.",editor:{tag:"electricity-lens-history-card-editor",element:Le}},{tag:"electricity-lens-figures-card",card:pe,name:"Electricity Lens key figures",description:"One key figure for a period: costs, solar share, cheap grid power, savings, or any statistic or entity.",editor:{tag:"electricity-lens-figures-card-editor",element:xe}},{tag:"electricity-lens-breakdown-card",card:fe,name:"Electricity Lens breakdown",description:"Shares for a period as a ring or bars: the electricity mix, consumption or costs by consumer, or any statistics.",editor:{tag:"electricity-lens-breakdown-card-editor",element:Te}}],[{type:"electricity-lens",element:Oe,name:"Electricity Lens",description:"A finished electricity dashboard with costs, electricity mix, solar, heat pump, car, and the balance."}]);
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
