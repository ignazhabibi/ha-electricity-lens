var f1=globalThis,O1=f1.ShadowRoot&&(f1.ShadyCSS===void 0||f1.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,W1=Symbol(),n2=new WeakMap,n1=class{constructor(L,C,H){if(this._$cssResult$=!0,H!==W1)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=L,this.t=C}get styleSheet(){let L=this.o,C=this.t;if(O1&&L===void 0){let H=C!==void 0&&C.length===1;H&&(L=n2.get(C)),L===void 0&&((this.o=L=new CSSStyleSheet).replaceSync(this.cssText),H&&n2.set(C,L))}return L}toString(){return this.cssText}},y1=r=>new n1(typeof r=="string"?r:r+"",void 0,W1),O=(r,...L)=>{let C=r.length===1?r[0]:L.reduce((H,V,M)=>H+(e=>{if(e._$cssResult$===!0)return e.cssText;if(typeof e=="number")return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(V)+r[M+1],r[0]);return new n1(C,r,W1)},d2=(r,L)=>{if(O1)r.adoptedStyleSheets=L.map(C=>C instanceof CSSStyleSheet?C:C.styleSheet);else for(let C of L){let H=document.createElement("style"),V=f1.litNonce;V!==void 0&&H.setAttribute("nonce",V),H.textContent=C.cssText,r.appendChild(H)}},z1=O1?r=>r:r=>r instanceof CSSStyleSheet?(L=>{let C="";for(let H of L.cssRules)C+=H.cssText;return y1(C)})(r):r;var{is:t5,defineProperty:i5,getOwnPropertyDescriptor:a5,getOwnPropertyNames:o5,getOwnPropertySymbols:A5,getPrototypeOf:n5}=Object,k1=globalThis,p2=k1.trustedTypes,d5=p2?p2.emptyScript:"",p5=k1.reactiveElementPolyfillSupport,d1=(r,L)=>r,U1={toAttribute(r,L){switch(L){case Boolean:r=r?d5:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,L){let C=r;switch(L){case Boolean:C=r!==null;break;case Number:C=r===null?null:Number(r);break;case Object:case Array:try{C=JSON.parse(r)}catch{C=null}}return C}},l2=(r,L)=>!t5(r,L),m2={attribute:!0,type:String,converter:U1,reflect:!1,useDefault:!1,hasChanged:l2};Symbol.metadata??=Symbol("metadata"),k1.litPropertyMetadata??=new WeakMap;var b=class extends HTMLElement{static addInitializer(L){this._$Ei(),(this.l??=[]).push(L)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(L,C=m2){if(C.state&&(C.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(L)&&((C=Object.create(C)).wrapped=!0),this.elementProperties.set(L,C),!C.noAccessor){let H=Symbol(),V=this.getPropertyDescriptor(L,H,C);V!==void 0&&i5(this.prototype,L,V)}}static getPropertyDescriptor(L,C,H){let{get:V,set:M}=a5(this.prototype,L)??{get(){return this[C]},set(e){this[C]=e}};return{get:V,set(e){let a=V?.call(this);M?.call(this,e),this.requestUpdate(L,a,H)},configurable:!0,enumerable:!0}}static getPropertyOptions(L){return this.elementProperties.get(L)??m2}static _$Ei(){if(this.hasOwnProperty(d1("elementProperties")))return;let L=n5(this);L.finalize(),L.l!==void 0&&(this.l=[...L.l]),this.elementProperties=new Map(L.elementProperties)}static finalize(){if(this.hasOwnProperty(d1("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(d1("properties"))){let C=this.properties,H=[...o5(C),...A5(C)];for(let V of H)this.createProperty(V,C[V])}let L=this[Symbol.metadata];if(L!==null){let C=litPropertyMetadata.get(L);if(C!==void 0)for(let[H,V]of C)this.elementProperties.set(H,V)}this._$Eh=new Map;for(let[C,H]of this.elementProperties){let V=this._$Eu(C,H);V!==void 0&&this._$Eh.set(V,C)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(L){let C=[];if(Array.isArray(L)){let H=new Set(L.flat(1/0).reverse());for(let V of H)C.unshift(z1(V))}else L!==void 0&&C.push(z1(L));return C}static _$Eu(L,C){let H=C.attribute;return H===!1?void 0:typeof H=="string"?H:typeof L=="string"?L.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(L=>this.enableUpdating=L),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(L=>L(this))}addController(L){(this._$EO??=new Set).add(L),this.renderRoot!==void 0&&this.isConnected&&L.hostConnected?.()}removeController(L){this._$EO?.delete(L)}_$E_(){let L=new Map,C=this.constructor.elementProperties;for(let H of C.keys())this.hasOwnProperty(H)&&(L.set(H,this[H]),delete this[H]);L.size>0&&(this._$Ep=L)}createRenderRoot(){let L=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return d2(L,this.constructor.elementStyles),L}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(L=>L.hostConnected?.())}enableUpdating(L){}disconnectedCallback(){this._$EO?.forEach(L=>L.hostDisconnected?.())}attributeChangedCallback(L,C,H){this._$AK(L,H)}_$ET(L,C){let H=this.constructor.elementProperties.get(L),V=this.constructor._$Eu(L,H);if(V!==void 0&&H.reflect===!0){let M=(H.converter?.toAttribute!==void 0?H.converter:U1).toAttribute(C,H.type);this._$Em=L,M==null?this.removeAttribute(V):this.setAttribute(V,M),this._$Em=null}}_$AK(L,C){let H=this.constructor,V=H._$Eh.get(L);if(V!==void 0&&this._$Em!==V){let M=H.getPropertyOptions(V),e=typeof M.converter=="function"?{fromAttribute:M.converter}:M.converter?.fromAttribute!==void 0?M.converter:U1;this._$Em=V;let a=e.fromAttribute(C,M.type);this[V]=a??this._$Ej?.get(V)??a,this._$Em=null}}requestUpdate(L,C,H,V=!1,M){if(L!==void 0){let e=this.constructor;if(V===!1&&(M=this[L]),H??=e.getPropertyOptions(L),!((H.hasChanged??l2)(M,C)||H.useDefault&&H.reflect&&M===this._$Ej?.get(L)&&!this.hasAttribute(e._$Eu(L,H))))return;this.C(L,C,H)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(L,C,{useDefault:H,reflect:V,wrapped:M},e){H&&!(this._$Ej??=new Map).has(L)&&(this._$Ej.set(L,e??C??this[L]),M!==!0||e!==void 0)||(this._$AL.has(L)||(this.hasUpdated||H||(C=void 0),this._$AL.set(L,C)),V===!0&&this._$Em!==L&&(this._$Eq??=new Set).add(L))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(C){Promise.reject(C)}let L=this.scheduleUpdate();return L!=null&&await L,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[V,M]of this._$Ep)this[V]=M;this._$Ep=void 0}let H=this.constructor.elementProperties;if(H.size>0)for(let[V,M]of H){let{wrapped:e}=M,a=this[V];e!==!0||this._$AL.has(V)||a===void 0||this.C(V,void 0,M,a)}}let L=!1,C=this._$AL;try{L=this.shouldUpdate(C),L?(this.willUpdate(C),this._$EO?.forEach(H=>H.hostUpdate?.()),this.update(C)):this._$EM()}catch(H){throw L=!1,this._$EM(),H}L&&this._$AE(C)}willUpdate(L){}_$AE(L){this._$EO?.forEach(C=>C.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(L)),this.updated(L)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(L){return!0}update(L){this._$Eq&&=this._$Eq.forEach(C=>this._$ET(C,this[C])),this._$EM()}updated(L){}firstUpdated(L){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[d1("elementProperties")]=new Map,b[d1("finalized")]=new Map,p5?.({ReactiveElement:b}),(k1.reactiveElementVersions??=[]).push("2.1.2");var Q1=globalThis,v2=r=>r,b1=Q1.trustedTypes,x2=b1?b1.createPolicy("lit-html",{createHTML:r=>r}):void 0,K1="$lit$",_=`lit$${Math.random().toFixed(9).slice(2)}$`,j1="?"+_,m5=`<${j1}>`,I=document,m1=()=>I.createComment(""),l1=r=>r===null||typeof r!="object"&&typeof r!="function",q1=Array.isArray,h2=r=>q1(r)||typeof r?.[Symbol.iterator]=="function",G1=`[ 	
\f\r]`,p1=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,s2=/-->/g,u2=/>/g,$=RegExp(`>|${G1}(?:([^\\s"'>=/]+)(${G1}*=${G1}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Z2=/'/g,c2=/"/g,g2=/^(?:script|style|textarea|title)$/i,Y1=r=>(L,...C)=>({_$litType$:r,strings:L,values:C}),d=Y1(1),C3=Y1(2),H3=Y1(3),W=Symbol.for("lit-noChange"),l=Symbol.for("lit-nothing"),S2=new WeakMap,N=I.createTreeWalker(I,129);function f2(r,L){if(!q1(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return x2!==void 0?x2.createHTML(L):L}var O2=(r,L)=>{let C=r.length-1,H=[],V,M=L===2?"<svg>":L===3?"<math>":"",e=p1;for(let a=0;a<C;a++){let t=r[a],i,o,A=-1,n=0;for(;n<t.length&&(e.lastIndex=n,o=e.exec(t),o!==null);)n=e.lastIndex,e===p1?o[1]==="!--"?e=s2:o[1]!==void 0?e=u2:o[2]!==void 0?(g2.test(o[2])&&(V=RegExp("</"+o[2],"g")),e=$):o[3]!==void 0&&(e=$):e===$?o[0]===">"?(e=V??p1,A=-1):o[1]===void 0?A=-2:(A=e.lastIndex-o[2].length,i=o[1],e=o[3]===void 0?$:o[3]==='"'?c2:Z2):e===c2||e===Z2?e=$:e===s2||e===u2?e=p1:(e=$,V=void 0);let v=e===$&&r[a+1].startsWith("/>")?" ":"";M+=e===p1?t+m5:A>=0?(H.push(i),t.slice(0,A)+K1+t.slice(A)+_+v):t+_+(A===-2?a:v)}return[f2(r,M+(r[C]||"<?>")+(L===2?"</svg>":L===3?"</math>":"")),H]},v1=class r{constructor({strings:L,_$litType$:C},H){let V;this.parts=[];let M=0,e=0,a=L.length-1,t=this.parts,[i,o]=O2(L,C);if(this.el=r.createElement(i,H),N.currentNode=this.el.content,C===2||C===3){let A=this.el.content.firstChild;A.replaceWith(...A.childNodes)}for(;(V=N.nextNode())!==null&&t.length<a;){if(V.nodeType===1){if(V.hasAttributes())for(let A of V.getAttributeNames())if(A.endsWith(K1)){let n=o[e++],v=V.getAttribute(A).split(_),p=/([.?@])?(.*)/.exec(n);t.push({type:1,index:M,name:p[2],strings:v,ctor:p[1]==="."?w1:p[1]==="?"?B1:p[1]==="@"?P1:U}),V.removeAttribute(A)}else A.startsWith(_)&&(t.push({type:6,index:M}),V.removeAttribute(A));if(g2.test(V.tagName)){let A=V.textContent.split(_),n=A.length-1;if(n>0){V.textContent=b1?b1.emptyScript:"";for(let v=0;v<n;v++)V.append(A[v],m1()),N.nextNode(),t.push({type:2,index:++M});V.append(A[n],m1())}}}else if(V.nodeType===8)if(V.data===j1)t.push({type:2,index:M});else{let A=-1;for(;(A=V.data.indexOf(_,A+1))!==-1;)t.push({type:7,index:M}),A+=_.length-1}M++}}static createElement(L,C){let H=I.createElement("template");return H.innerHTML=L,H}};function z(r,L,C=r,H){if(L===W)return L;let V=H!==void 0?C._$Co?.[H]:C._$Cl,M=l1(L)?void 0:L._$litDirective$;return V?.constructor!==M&&(V?._$AO?.(!1),M===void 0?V=void 0:(V=new M(r),V._$AT(r,C,H)),H!==void 0?(C._$Co??=[])[H]=V:C._$Cl=V),V!==void 0&&(L=z(r,V._$AS(r,L.values),V,H)),L}var _1=class{constructor(L,C){this._$AV=[],this._$AN=void 0,this._$AD=L,this._$AM=C}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(L){let{el:{content:C},parts:H}=this._$AD,V=(L?.creationScope??I).importNode(C,!0);N.currentNode=V;let M=N.nextNode(),e=0,a=0,t=H[0];for(;t!==void 0;){if(e===t.index){let i;t.type===2?i=new q(M,M.nextSibling,this,L):t.type===1?i=new t.ctor(M,t.name,t.strings,this,L):t.type===6&&(i=new T1(M,this,L)),this._$AV.push(i),t=H[++a]}e!==t?.index&&(M=N.nextNode(),e++)}return N.currentNode=I,V}p(L){let C=0;for(let H of this._$AV)H!==void 0&&(H.strings!==void 0?(H._$AI(L,H,C),C+=H.strings.length-2):H._$AI(L[C])),C++}},q=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(L,C,H,V){this.type=2,this._$AH=l,this._$AN=void 0,this._$AA=L,this._$AB=C,this._$AM=H,this.options=V,this._$Cv=V?.isConnected??!0}get parentNode(){let L=this._$AA.parentNode,C=this._$AM;return C!==void 0&&L?.nodeType===11&&(L=C.parentNode),L}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(L,C=this){L=z(this,L,C),l1(L)?L===l||L==null||L===""?(this._$AH!==l&&this._$AR(),this._$AH=l):L!==this._$AH&&L!==W&&this._(L):L._$litType$!==void 0?this.$(L):L.nodeType!==void 0?this.T(L):h2(L)?this.k(L):this._(L)}O(L){return this._$AA.parentNode.insertBefore(L,this._$AB)}T(L){this._$AH!==L&&(this._$AR(),this._$AH=this.O(L))}_(L){this._$AH!==l&&l1(this._$AH)?this._$AA.nextSibling.data=L:this.T(I.createTextNode(L)),this._$AH=L}$(L){let{values:C,_$litType$:H}=L,V=typeof H=="number"?this._$AC(L):(H.el===void 0&&(H.el=v1.createElement(f2(H.h,H.h[0]),this.options)),H);if(this._$AH?._$AD===V)this._$AH.p(C);else{let M=new _1(V,this),e=M.u(this.options);M.p(C),this.T(e),this._$AH=M}}_$AC(L){let C=S2.get(L.strings);return C===void 0&&S2.set(L.strings,C=new v1(L)),C}k(L){q1(this._$AH)||(this._$AH=[],this._$AR());let C=this._$AH,H,V=0;for(let M of L)V===C.length?C.push(H=new r(this.O(m1()),this.O(m1()),this,this.options)):H=C[V],H._$AI(M),V++;V<C.length&&(this._$AR(H&&H._$AB.nextSibling,V),C.length=V)}_$AR(L=this._$AA.nextSibling,C){for(this._$AP?.(!1,!0,C);L!==this._$AB;){let H=v2(L).nextSibling;v2(L).remove(),L=H}}setConnected(L){this._$AM===void 0&&(this._$Cv=L,this._$AP?.(L))}},U=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(L,C,H,V,M){this.type=1,this._$AH=l,this._$AN=void 0,this.element=L,this.name=C,this._$AM=V,this.options=M,H.length>2||H[0]!==""||H[1]!==""?(this._$AH=Array(H.length-1).fill(new String),this.strings=H):this._$AH=l}_$AI(L,C=this,H,V){let M=this.strings,e=!1;if(M===void 0)L=z(this,L,C,0),e=!l1(L)||L!==this._$AH&&L!==W,e&&(this._$AH=L);else{let a=L,t,i;for(L=M[0],t=0;t<M.length-1;t++)i=z(this,a[H+t],C,t),i===W&&(i=this._$AH[t]),e||=!l1(i)||i!==this._$AH[t],i===l?L=l:L!==l&&(L+=(i??"")+M[t+1]),this._$AH[t]=i}e&&!V&&this.j(L)}j(L){L===l?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,L??"")}},w1=class extends U{constructor(){super(...arguments),this.type=3}j(L){this.element[this.name]=L===l?void 0:L}},B1=class extends U{constructor(){super(...arguments),this.type=4}j(L){this.element.toggleAttribute(this.name,!!L&&L!==l)}},P1=class extends U{constructor(L,C,H,V,M){super(L,C,H,V,M),this.type=5}_$AI(L,C=this){if((L=z(this,L,C,0)??l)===W)return;let H=this._$AH,V=L===l&&H!==l||L.capture!==H.capture||L.once!==H.once||L.passive!==H.passive,M=L!==l&&(H===l||V);V&&this.element.removeEventListener(this.name,this,H),M&&this.element.addEventListener(this.name,this,L),this._$AH=L}handleEvent(L){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,L):this._$AH.handleEvent(L)}},T1=class{constructor(L,C,H){this.element=L,this.type=6,this._$AN=void 0,this._$AM=C,this.options=H}get _$AU(){return this._$AM._$AU}_$AI(L){z(this,L)}},y2={M:K1,P:_,A:j1,C:1,L:O2,R:_1,D:h2,V:z,I:q,H:U,N:B1,U:P1,B:w1,F:T1},l5=Q1.litHtmlPolyfillSupport;l5?.(v1,q),(Q1.litHtmlVersions??=[]).push("3.3.3");var k2=(r,L,C)=>{let H=C?.renderBefore??L,V=H._$litPart$;if(V===void 0){let M=C?.renderBefore??null;H._$litPart$=V=new q(L.insertBefore(m1(),M),M,void 0,C??{})}return V._$AI(r),V};var J1=globalThis,Z=class extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let L=super.createRenderRoot();return this.renderOptions.renderBefore??=L.firstChild,L}update(L){let C=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(L),this._$Do=k2(C,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}};Z._$litElement$=!0,Z.finalized=!0,J1.litElementHydrateSupport?.({LitElement:Z});var v5=J1.litElementPolyfillSupport;v5?.({LitElement:Z});(J1.litElementVersions??=[]).push("4.2.2");var b2=r=>(...L)=>({_$litDirective$:r,values:L}),F1=class{constructor(L){}get _$AU(){return this._$AM._$AU}_$AT(L,C,H){this._$Ct=L,this._$AM=C,this._$Ci=H}_$AS(L,C){return this.update(L,C)}update(L,C){return this.render(...C)}};var{I:l3}=y2;var x5={},_2=(r,L=x5)=>r._$AH=L;var w2=b2(class extends F1{constructor(){super(...arguments),this.key=l}render(r,L){return this.key=r,L}update(r,[L,C]){return L!==this.key&&(_2(r),this.key=L),C}});var B2;function R1(){if(customElements.get("ha-chart-base"))return Promise.resolve(!0);let r=window.loadCardHelpers;return r?(B2??=(async()=>{try{(await r()).createCardElement({type:"statistics-graph",entities:[]})}catch{}let L=new Promise(C=>setTimeout(()=>C(!1),1e4));return Promise.race([customElements.whenDefined("ha-chart-base").then(()=>!0),L])})(),B2):Promise.resolve(!1)}var P2=r=>Math.round(r*255).toString(16).padStart(2,"0");function X1(r,L){let C=r.trim();if(/^#[0-9a-f]{6}$/i.test(C))return C+P2(L);if(/^#[0-9a-f]{3}$/i.test(C))return`#${[...C.slice(1)].map(V=>V+V).join("")}${P2(L)}`;let H=C.match(/^rgba?\(([^)]+)\)/i);if(H){let[V,M,e]=H[1].split(/[ ,/]+/).filter(Boolean);return`rgba(${V}, ${M}, ${e}, ${L})`}return C}var x1=r=>r.replace(/[&<>"']/g,L=>`&#${L.charCodeAt(0)};`),C2=r=>`<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${r}"></span>`;function T2(r){let L=r.lines??[],C=r.series.map((o,A)=>({id:o.id,type:"bar",name:o.name,stack:"savings",cursor:"default",barMaxWidth:50,color:X1(o.color,.5),itemStyle:{borderColor:o.color},data:o.values.map((n,v)=>{let p=r.series.slice(A+1).every(m=>Math.sign(m.values[v]??0)!==Math.sign(n??0));return{value:n,itemStyle:n?p?{borderRadius:n>0?[4,4,0,0]:[0,0,4,4]}:void 0:{borderWidth:0}}})})),H=L.map(o=>({id:o.id,type:"line",name:o.name,yAxisIndex:1,color:o.color,symbol:"none",showSymbol:!1,step:o.step?"middle":!1,lineStyle:{width:1.5,type:o.dash??"dashed",color:o.color},z:1,connectNulls:!0,data:o.values})),V=[...C,...H],M=new Map(L.map(o=>[o.name,o.format])),e=o=>{let A=Array.isArray(o)?o:[o],n=document.createElement("div");if(!A.length)return n;let v=x=>M.has(x.seriesName??""),p=A.filter(x=>x.value&&!v(x)),m=A.filter(x=>v(x)&&x.value!==null&&x.value!==void 0),c=p.map(x=>`${C2(String(x.color??""))}${x1(x.seriesName??"")}: ${r.format(x.value??0)}`),S=m.map(x=>`${C2(String(x.color??""))}${x1(x.seriesName??"")}: ${M.get(x.seriesName??"")?.(x.value??0)??""}`),s=new Set(r.series.filter(x=>x.inTotal===!1).map(x=>x.name)),h=p.filter(x=>!s.has(x.seriesName??"")).reduce((x,E)=>x+(E.value??0),0);return n.innerHTML=`<b>${x1(r.labels[A[0].dataIndex]?.tooltip??"")}</b>`+(c.length?`<br>${c.join("<br>")}`:"")+(p.length>1?`<br><b>${x1(r.total)}: ${r.format(h)}</b>`:"")+(S.length?`<br>${S.join("<br>")}`:""),n},a={type:"value",name:r.unit,nameGap:2,nameTextStyle:{align:"left"},axisLabel:{formatter:r.tick},splitLine:{show:!0}},t={type:"value",name:r.lineUnit??"",nameGap:2,nameTextStyle:{align:"right"},axisLabel:{formatter:r.tick},splitLine:{show:!1},scale:!0},i={xAxis:{type:"category",data:r.labels.map(o=>o.axis),axisTick:{show:!1}},yAxis:L.length?[a,t]:a,grid:{top:15,bottom:0,left:1,right:1,containLabel:!0},legend:{show:!0,type:"custom",data:[...r.series,...L].map(o=>({id:o.id,name:o.name}))},tooltip:{trigger:"axis",axisPointer:{type:"shadow"},formatter:e}};return{data:V,options:i}}function H2(r){let L=r.reduce((C,H)=>C+Math.max(0,H),0);return r.map(C=>L>0?Math.max(0,C)/L*100:0)}function F2(r){let L=r.items.map(i=>r.hidden.has(i.id)?0:i.value),C=H2(L),H=L.reduce((i,o)=>i+Math.max(0,o),0),V=[],M=-Math.PI/2;for(let i of C){let o=M+i/100*2*Math.PI;V.push([M,o]),M=o}let e=i=>{let o=Math.min(90,i.getWidth()/2-8,i.getHeight()/2-8);return{cx:i.getWidth()/2,cy:i.getHeight()/2,r:o,r0:o*40/70}},a=r.items.map((i,o)=>({id:i.id,type:"custom",name:i.name,coordinateSystem:"none",cursor:"default",color:X1(i.color,.5),data:[[L[o],V[o][0],V[o][1],C[o]]],renderItem:(A,n)=>{let v=n.value(1),p=n.value(2);if(!(p-v>0))return null;let m=e(n),c=[{type:"sector",shape:{...m,startAngle:v,endAngle:p,cornerRadius:4},style:{fill:X1(i.color,.5),stroke:i.color,lineWidth:1}}];if(p-v>=15*Math.PI/180){let S=(v+p)/2,s=Math.cos(S)>=0,h=[m.cx+Math.cos(S)*m.r,m.cy+Math.sin(S)*m.r],x=[m.cx+Math.cos(S)*(m.r+10),m.cy+Math.sin(S)*(m.r+10)],E=[x[0]+(s?10:-10),x[1]];c.push({type:"polyline",silent:!0,shape:{points:[h,x,E]},style:{stroke:i.color,fill:"none"}},{type:"text",silent:!0,x:E[0]+(s?4:-4),y:E[1],style:{text:`${i.name}
${r.percent(n.value(3))}`,fill:r.labelColor,fontSize:12,lineHeight:16,align:s?"left":"right",verticalAlign:"middle"}})}return{type:"group",children:c}}}));return a.push({id:"total",type:"custom",coordinateSystem:"none",silent:!0,tooltip:{show:!1},data:[[H]],renderItem:(i,o)=>{let A=e(o);return{type:"text",x:A.cx,y:A.cy,style:{text:`${r.total}
${r.format(o.value(0))}`,fill:r.centerColor,fontSize:14,lineHeight:24,fontWeight:"bold",align:"center",verticalAlign:"middle"}}}}),{data:a,options:{xAxis:{show:!1},yAxis:{show:!1},legend:{show:!1},tooltip:{show:!0,trigger:"item",formatter:i=>{let o=r.items.findIndex(v=>v.id===i.seriesId);if(o<0)return"";let A=r.items[o],n=document.createElement("div");return n.innerHTML=`<b>${x1(A.name)}</b><br>${C2(A.color)}${r.format(i.value?.[0]??L[o])} (${r.percent(i.value?.[3]??C[o])})`,n}}}}}var G={solar:"var(--energy-solar-color, #ff9800)",grid:"var(--energy-grid-consumption-color, #488fc2)",cheap:"color-mix(in srgb, var(--energy-grid-consumption-color, #488fc2) 55%, #fff)",expensive:"color-mix(in srgb, var(--energy-grid-consumption-color, #488fc2) 70%, #000)",export:"var(--energy-grid-return-color, #8353d1)",heat:"var(--energy-gas-color, #8e021b)",car:"var(--energy-non-fossil-color, #0f9d58)"},R2=/warm\s*wasser|hot\s*water|dhw|eau chaude/i,s5=["#76b7b2","#b07aa1","#9c755f","#ff9da7","#bab0ac","#a3a948"];function u5(r){let L=r.trim(),C=/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(L)?.[1];if(C){let V=C.length===3?[...C].map(M=>M+M).join(""):C;return[0,2,4].map(M=>parseInt(V.slice(M,M+2),16))}let H=/^rgba?\(([^)]+)\)/i.exec(L)?.[1];if(H){let[V,M,e]=H.split(/[ ,/]+/).filter(Boolean).map(Number);if([V,M,e].every(Number.isFinite))return[V,M,e]}}var Z5=([r,L,C])=>`#${[r,L,C].map(H=>Math.round(Math.min(Math.max(H,0),255)).toString(16).padStart(2,"0")).join("")}`;function V2(r,L,C){let H=u5(r);if(!H)return r;let V=L==="white"?255:0;return Z5(H.map(M=>M*C+V*(1-C)))}function w(r){let L=getComputedStyle(r),C=(M,e)=>L.getPropertyValue(M).trim()||e,H=C("--energy-grid-consumption-color","#488fc2"),V=C("--energy-gas-color","#8e021b");return{solar:C("--energy-solar-color","#ff9800"),grid:H,cheap:V2(H,"white",.55),expensive:V2(H,"black",.7),export:C("--energy-grid-return-color","#8353d1"),heat:V,heatLight:V2(V,"white",.6),car:C("--energy-non-fossil-color","#0f9d58"),other:C("--disabled-color","#bdbdbd"),line:C("--secondary-text-color","#727272"),consumers:s5}}function D2(r,L){let C=L.statistics.energy?.[0];for(let H of r.areas){let V=C&&H.kind==="category"?(H.statistics.energy??[]).indexOf(C):-1;if(V>=0)return{id:H.id,index:V}}}function E2(r,L){let C=new Map,H=r.areas.some(M=>M.kind==="device"&&D2(r,M)?.id==="heat_pump"&&R2.test(M.name)),V=0;for(let M of r.areas)if(M.kind==="other")C.set(M.id,L.other);else if(M.kind==="device"){let e=D2(r,M);if(e?.id==="heat_pump"){let a=R2.test(M.name)||!H&&e.index>0;C.set(M.id,a?L.heatLight:L.heat)}else e?.id==="wallbox"?C.set(M.id,L.car):C.set(M.id,L.consumers[V++%L.consumers.length])}else M.id==="heat_pump"?C.set(M.id,L.heat):M.id==="wallbox"&&C.set(M.id,L.car);return C}var c5=r=>!!r&&typeof r.subscribe=="function";function S5(r){let L=location.pathname.split("/")[1]??"",C=r;for(let H of[`_energy_${L}`,"_energy"])if(c5(C[H]))return C[H]}var h5=()=>new Date().setHours(24,0,0,0)-1;function Y(r,L){let C,H,V=0,M=()=>{let e=S5(r);if(e){C=e.subscribe(a=>L({start:new Date(a.start).getTime(),end:a.end?new Date(a.end).getTime():h5()}));return}V+=1,V===2&&L(null),V<20&&(H=window.setTimeout(M,500))};return M(),()=>{window.clearTimeout(H),C?.()}}function $2(r){let L=/^([-−+]?[\d.,\u00a0\u202f ]*\d)[\u00a0\u202f ](.+)$/.exec(r);return L?[L[1],L[2]]:[r,""]}function J(r,L){let C=(M,e)=>{let a=Math.abs(M),t=e??(a<10?2:a<100?1:0);return new Intl.NumberFormat(r,{maximumFractionDigits:t,minimumFractionDigits:e??0}).format(M)};return{number:C,value:(M,e)=>{switch(e){case"energy":return`${C(M,Math.abs(M)<100?1:0)} kWh`;case"money":{let a=Math.abs(M)<100;return new Intl.NumberFormat(r,{style:"currency",currency:L,maximumFractionDigits:a?2:0,minimumFractionDigits:a?2:0}).format(M)}case"price":return L==="EUR"?`${C(M*100,1)} ct/kWh`:`${new Intl.NumberFormat(r,{style:"currency",currency:L,maximumFractionDigits:3}).format(M)}/kWh`;case"percent":return new Intl.NumberFormat(r,{style:"percent",maximumFractionDigits:0}).format(M/100);case"number":return C(M,Math.abs(M)<10?2:Math.abs(M)<100?1:0);case"distance":return`${C(M,Math.abs(M)<100?1:0)} km`;case"per_100km":return`${new Intl.NumberFormat(r,{style:"currency",currency:L,maximumFractionDigits:2,minimumFractionDigits:2}).format(M)}/100 km`}},currencySymbol:()=>new Intl.NumberFormat(r,{style:"currency",currency:L}).formatToParts(0).find(M=>M.type==="currency")?.value??""}}var L2={energy:["energy"],cost:["cost"],price:["cost","energy","solar"],solar_share:["solar","energy"],cheap_share:["cheap","solar","energy"],expensive_share:["expensive","solar","energy"],self_consumption:["self_used","energy"],export:["export"],saving:["saving"],heat:["heat"],alternative_cost:["alternative_cost"],scop:["heat","energy"],heat_price:["cost","heat"],distance:["distance"],cost_per_100km:["cost","distance"],forecast_today:[],forecast_tomorrow:[]},g5={energy:["solar","export"],cost:["energy","solar"],saving:["alternative_cost","cost"],heat:["energy"],distance:["energy"]},f5=Object.keys(L2),E1=r=>r==="forecast_today"||r==="forecast_tomorrow";function T(r){return f5.filter(L=>E1(L)?r.forecast===!0:L2[L].every(C=>r.statistics[C]?.length))}function N2(r,L){return[...L2[L],...g5[L]??[]].flatMap(C=>r.statistics[C]??[])}var D1=(r,L)=>L>0?r/L*100:null;function X(r,L,C,H){let V=C("energy"),M=C("solar"),e=t=>({value:t,unit:"energy"}),a=t=>({value:t,unit:"number"});switch(r){case"energy":{if(V!==null&&M!==null&&V>0){let i=D1(M,V)??0;return{value:V,unit:"energy",line:{key:"line_solar_part",values:{percent:{value:i,unit:"percent"}}}}}let t=C("export");return L.kind==="grid"&&t!==null?{value:V,unit:"energy",line:{key:"line_exported",values:{energy:e(t)}}}:{value:V,unit:"energy"}}case"cost":{let t=C("cost");return t!==null&&V&&M!==null?{value:t,unit:"money",line:{key:"line_average_price",values:{price:{value:t/V,unit:"price"}}}}:t!==null&&V!==null&&L.kind==="grid"?{value:t,unit:"money",line:{key:"line_for_import",values:{energy:e(V)}}}:{value:t,unit:"money"}}case"price":{let t=C("cost");return t===null||!V?{value:null,unit:"price"}:{value:t/V,unit:"price",line:{key:"line_cost_for",values:{cost:{value:t,unit:"money"},energy:e(V)}}}}case"solar_share":{if(V===null||M===null)return{value:null,unit:"percent"};let t=D1(M,V);return{value:t,unit:"percent",bar:t??0,line:{key:"line_from_solar",values:{part:a(M),whole:e(V)}}}}case"cheap_share":case"expensive_share":{let t=C(r==="cheap_share"?"cheap":"expensive");if(V===null||M===null||t===null)return{value:null,unit:"percent"};let i=Math.max(V-M,0),o=D1(t,i);return{value:o,unit:"percent",bar:o??0,line:{key:"line_of_grid",values:{part:a(t),whole:e(i)}}}}case"self_consumption":{let t=C("self_used");if(V===null||t===null)return{value:null,unit:"percent"};let i=D1(t,V);return{value:i,unit:"percent",bar:i??0,line:{key:"line_self_used",values:{part:a(t),whole:e(V)}}}}case"export":return{value:C("export"),unit:"energy"};case"saving":{let t=C("saving"),i=C("alternative_cost"),o=C("cost");if(t===null||i===null||o===null)return{value:t,unit:"money"};let A=i-o;return{value:t,unit:"money",line:{key:"line_saving_split",values:{total:{value:A,unit:"money"},solar:{value:A-t,unit:"money"}}}}}case"heat":{let t=C("heat");return t===null||V===null?{value:t,unit:"energy"}:{value:t,unit:"energy",line:{key:"line_from_electricity",values:{energy:e(V)}}}}case"alternative_cost":return{value:C("alternative_cost"),unit:"money"};case"scop":{let t=C("heat");return t===null||!V?{value:null,unit:"number"}:{value:t/V,unit:"number",line:{key:"line_heat_from",values:{heat:a(t),energy:e(V)}}}}case"heat_price":{let t=C("heat"),i=C("cost");return t===null||i===null||!t?{value:null,unit:"price"}:{value:i/t,unit:"price",line:{key:"line_cost_for_heat",values:{cost:{value:i,unit:"money"},heat:e(t)}}}}case"distance":{let t=C("distance");return t===null||V===null?{value:t,unit:"distance"}:{value:t,unit:"distance",line:{key:"line_charged",values:{energy:e(V)}}}}case"cost_per_100km":{let t=C("distance"),i=C("cost");return t===null||i===null||!t?{value:null,unit:"per_100km"}:{value:i/t*100,unit:"per_100km",line:{key:"line_cost_for",values:{cost:{value:i,unit:"money"},energy:{value:t,unit:"distance"}}}}}case"forecast_today":case"forecast_tomorrow":return{value:H,unit:"energy"}}}var I2=["change","mean","min","max"],y=r=>r.statistic!==void 0?"statistic":r.entity!==void 0?"entity":"energy";function F({start:r,end:L}){let C=L-r;return C<=2*864e5+36e5?"hour":C<=95*864e5?"day":C<=3*366*864e5?"month":"year"}var C1=r=>r==="year"?"month":r,O5=(r,L)=>{let C=new Date(r);return L==="hour"?C.setMinutes(0,0,0):(C.setHours(0,0,0,0),L==="day"||(C.setDate(1),L==="month")?C.getTime():C.setMonth(0))},y5=(r,L)=>{let C=new Date(r);return L==="hour"?C.setHours(C.getHours()+1):L==="day"?C.setDate(C.getDate()+1):L==="month"?C.setMonth(C.getMonth()+1):C.setFullYear(C.getFullYear()+1),C.getTime()};function W2({start:r,end:L},C){let H=[];for(let V=O5(r,C);V<=L&&H.length<400;V=y5(V,C))H.push(V);return H}function z2(r,L=new Date){let C=r.filter(V=>V!==null).map(V=>V.getFullYear()),H=Math.min(L.getFullYear(),...C);return{start:new Date(H,0,1).getTime(),end:new Date(L.getFullYear()+1,0,1).getTime()-1}}function M2(r,L,C){let H=L.map(()=>null),V=C==="hour"?0:12*36e5;for(let M of r??[]){if(M.change===null||M.change===void 0)continue;let e=(typeof M.start=="number"?M.start:Date.parse(M.start))+V,a=-1;for(let t=0;t<L.length&&L[t]<=e;t+=1)a=t;a<0||(H[a]=(H[a]??0)+M.change)}return H}function B(r,L=new Date){let C=(e,a)=>({start:e.getTime(),end:a.getTime()-1}),H=L.getFullYear(),V=L.getMonth(),M=L.getDate();switch(r){case"today":return C(new Date(H,V,M),new Date(H,V,M+1));case"yesterday":return C(new Date(H,V,M-1),new Date(H,V,M));case"this_month":return C(new Date(H,V,1),new Date(H,V+1,1));case"last_month":return C(new Date(H,V-1,1),new Date(H,V,1));case"this_year":return C(new Date(H,0,1),new Date(H+1,0,1));case"last_year":return C(new Date(H-1,0,1),new Date(H,0,1))}}function H1({start:r,end:L},C){let H=new Date(r),V=new Date(L),M=(t,i)=>new Intl.DateTimeFormat(C,t).format(i);if(H.toDateString()===V.toDateString())return M({day:"numeric",month:"short"},H);let a=H.getDate()===1&&new Date(L+1).getDate()===1;return a&&H.getMonth()===0&&V.getMonth()===11&&H.getFullYear()===V.getFullYear()?M({year:"numeric"},H):a&&H.getMonth()===V.getMonth()&&H.getFullYear()===V.getFullYear()?M({month:"short",year:"numeric"},H):new Intl.DateTimeFormat(C,{day:"numeric",month:"short"}).formatRange(H,V)}function U2(r,L,C){let H=L.map(()=>0),V=L.map(()=>0),M=C==="hour"?0:12*36e5;for(let e of r??[]){if(e.mean===null||e.mean===void 0)continue;let a=(typeof e.start=="number"?e.start:Date.parse(e.start))+M,t=-1;for(let i=0;i<L.length&&L[i]<=a;i+=1)t=i;t<0||(H[t]+=e.mean,V[t]+=1)}return H.map((e,a)=>V[a]?e/V[a]:null)}var f="electricity_lens",e2=["pv","heat_pump","wallbox"];var $1=r=>{if(r==null||r==="")return null;let L=Number(r);return Number.isFinite(L)?L:null},G2=r=>typeof r=="string"&&r?new Date(r):null;function V1(r){let L=Object.values(r.entities??{}).filter(M=>M.platform===f),C=(M,e)=>L.find(a=>a.device_id===M&&a.translation_key===e),H=M=>M?$1(r.states[M]?.state):null,V=[];for(let M of L){if(M.translation_key!=="saving")continue;let e=r.states[M.entity_id];if(!e||e.state==="unavailable")continue;let a=e.attributes,t=a.category;e2.includes(t)&&V.push({category:t,savingStatistic:typeof a.statistic_id=="string"?a.statistic_id:`${f}:${t}_saving`,calculating:a.calculating===!0,saving:$1(e.state),investment:$1(a.investment),payback:H(C(M.device_id,"payback")?.entity_id),perYear:H(C(M.device_id,"saving_per_year")?.entity_id),countingSince:G2(a.counting_since),yearlyFrom:G2(a.yearly_from),price:$1(a.price),heating:a.heating==="gas"||a.heating==="oil"?a.heating:null,heatEstimated:a.heat_estimated===!0})}return V.sort((M,e)=>e2.indexOf(M.category)-e2.indexOf(e.category))}function Q2(r,L=new Date){let C=r.some(o=>o.calculating),H=r.reduce((o,A)=>o+(A.saving??0),0),V=r.reduce((o,A)=>o+(A.investment??0),0),M=!C&&r.length>0,e=M?H-V:null,a=r.every(o=>o.perYear!==null),t=M&&a?r.reduce((o,A)=>o+(A.perYear??0),0):null,i=null;return e!==null&&t!==null&&(e>=0?i=L:t>0&&(i=new Date(L.getTime()+-e/t*12*26298e5))),{saved:H,invested:V,balance:e,perYear:t,inThePlusFrom:i,calculating:C}}function K2(r){let{investment:L,saving:C,perYear:H}=r;return L===null||L<=0||C===null||H===null||H<=0?null:Math.max(0,(L-C)/H)}function j2(r){let{investment:L,saving:C,perYear:H}=r;return L===null||L<=0||C===null||H===null||C<L?null:H/L*100}var k5=300*1e3,b5=5*1e3,Q,r2,L1=()=>Q?.value;function K(){if(!Q)return!0;let r=Q.value&&!Q.value.calculating?k5:b5;return Date.now()-Q.at>r}function M1(r){return K()?(r2??=r.callWS({type:`${f}/figures`}).then(L=>L).catch(()=>null).then(L=>(Q={at:Date.now(),value:L},r2=void 0,L)),r2):Promise.resolve(Q?.value??null)}var t2={title:"Balance","category.pv":"PV plant","category.heat_pump":"Heat pump","category.wallbox":"Electric car",show_yearly:"Show yearly figures",show_total:"Show totals",not_set_up:"Set up the Electricity Lens integration to see what your PV plant, heat pump, and electric car have saved.",calculating_all:"The past is being computed \u2026",calculating:"Being computed \u2026",saved_invested:"{saved} saved, {invested} invested",saved_only:"{saved} saved",of_investment:"{percent} of {investment}",paid_off:"paid off",since:"since {date}",heat_estimated:"heat partly estimated",instead_heat_pump:"no extra cost entered",instead_wallbox:"no extra cost entered",instead_pv:"no purchase cost entered",in_the_plus_from:"In the plus from about {date}",in_the_plus:"In the plus",yearly_after_twelve:"Yearly figures after twelve months of data.",yearly_from:"Yearly figure from {date}",pays_off_in:"pays off in about {years}",years_one:"1 year",years_other:"{count} years",under_one_year:"less than a year",return_per_year:"paid off, {percent} return per year",instead_of_gas:"instead of gas",instead_of_oil:"instead of oil",instead_of_fuel:"instead of fuel",per_year:"{amount}/year",gas:"Gas {price}/kWh",oil:"Oil {price}/l",fuel:"Fuel {price}/l",prices_link:"Change the prices",progress:"{name}: {percent} of the investment saved",history_title:"Savings",history_total:"Total",history_no_chart:"The chart is only shown in Home Assistant.",history_failed:"The statistics could not be loaded.",history_empty:"No savings in this period.",figures_title:"Key figures",figures_failed:"The figures could not be loaded.",figures_unavailable:"not available","figure.energy":"Consumption","figure.energy.grid":"Grid import","figure.energy.solar":"Solar production","figure.cost":"Costs","figure.cost.grid":"Grid costs","figure.price":"Average price","figure.solar_share":"Solar share","figure.solar_share.household":"Self-sufficiency","figure.cheap_share":"Cheap grid power","figure.expensive_share":"Expensive grid power","figure.self_consumption":"Self-consumption","figure.export":"Feed-in","figure.saving":"Saving","figure.forecast_today":"Forecast today","figure.forecast_tomorrow":"Forecast tomorrow","figure.heat":"Heat","figure.alternative_cost":"Comparison costs","figure.scop":"Seasonal COP","figure.heat_price":"Heat price","figure.distance":"Distance","figure.cost_per_100km":"Costs per 100 km",line_saving_split:"with solar {total}, of which {solar} by solar",line_from_electricity:"from {energy} electricity",line_heat_from:"{heat} heat from {energy}",line_cost_for_heat:"{cost} for {heat} heat",line_charged:"with {energy} charged",line_solar_part:"{percent} of it solar power",line_exported:"{energy} fed in",line_average_price:"average {price}",line_for_import:"for {energy} imported",line_cost_for:"{cost} for {energy}",line_from_solar:"{part} of {whole} from solar",line_of_grid:"{part} of {whole} grid power",line_self_used:"{part} of {whole} used in the house","value.change":"total in the period","value.mean":"average","value.min":"minimum","value.max":"maximum",value_range:"from {min} to {max}",value_current:"current value","period.energy_date":"Follow the date selection","period.today":"Today","period.yesterday":"Yesterday","period.this_month":"This month","period.last_month":"Last month","period.this_year":"This year","period.last_year":"Last year","period.all":"All years",editor_title:"Title (optional)",editor_period:"Period",editor_period_hint:"Without a date selection on the dashboard: this month.",editor_columns:"Columns",editor_columns_auto:"Auto",editor_tiles:"Tiles",editor_add_tile:"Add tile",editor_edit_tile:"Edit tile {number}",editor_back:"Back",editor_edit:"Edit",editor_remove:"Remove",editor_source:"Source","source.energy":"Energy data","source.statistic":"Statistic","source.entity":"Entity",editor_area:"Area",editor_figure:"Figure",editor_statistic:"Statistic",editor_value:"Value",editor_secondary:"Line below","secondary.none":"Default","secondary.range":"Range of the period",editor_entity:"Entity",editor_name:"Name (optional)",editor_not_loaded:"Energy data need the Electricity Lens integration.","source.solar":"Solar power","source.grid":"Grid power","source.normal":"Normal grid power","source.cheap":"Cheap grid power","source.expensive":"Expensive grid power","source.export":"Feed-in","stack.source":"By source","stack.consumer":"By consumer","stack.none":"Not stacked",editor_savings:"Savings of all categories",editor_stack:"Stacking",editor_line:"Line",editor_lines:"Further lines from statistics",editor_line_none:"None",history_empty_figure:"No data in this period.",breakdown_mix:"Electricity mix",breakdown_cost_by_consumer:"Costs by consumer",breakdown_energy_by_consumer:"Consumption by consumer",breakdown_total:"Total","mix.solar":"Solar","mix.grid":"Grid","mix.normal":"Grid normal","mix.cheap":"Grid cheap","mix.expensive":"Grid expensive",editor_by:"Split","by.source":"By source","by.consumer":"By consumer",editor_display:"Display","display.ring":"Ring","display.bars":"Bars",editor_color_by_source:"Color the bars by source",editor_breakdown_source:"Source","breakdown_source.energy":"Energy data","breakdown_source.statistics":"Statistics",editor_statistics:"Statistics","figure_choice.energy":"Consumption","figure_choice.cost":"Costs","strategy.title":"Electricity","strategy.overview":"Now","strategy.electricity":"Household","strategy.cost_today":"Costs today","strategy.self_sufficiency_today":"Self-sufficiency today","strategy.solar_today":"Solar today","strategy.consumption_today":"Consumption today","strategy.bill":"Electricity bill","strategy.paid_back":"Paid back","strategy.per_year":"Per year","strategy.costs":"Costs","strategy.heating":"Heating","strategy.charging":"Charging","strategy.balance":"Balance","strategy.usage_graph":"Electricity balance","strategy.solar_graph":"Solar","strategy.devices_graph":"Individual devices","strategy.distribution":"Electricity distribution","strategy.not_loaded":"Set up the Electricity Lens integration to see this dashboard."},_5={title:"Bilanz","category.pv":"PV-Anlage","category.heat_pump":"W\xE4rmepumpe","category.wallbox":"E-Auto",show_yearly:"Jahreswerte zeigen",show_total:"Gesamtwerte zeigen",not_set_up:"Richte die Integration Electricity Lens ein, um zu sehen, was PV-Anlage, W\xE4rmepumpe und E-Auto gespart haben.",calculating_all:"Die Vergangenheit wird nachgerechnet \u2026",calculating:"Wird berechnet \u2026",saved_invested:"{saved} gespart, {invested} investiert",saved_only:"{saved} gespart",of_investment:"{percent} von {investment}",paid_off:"amortisiert",since:"seit {date}",heat_estimated:"W\xE4rme teilweise gesch\xE4tzt",instead_heat_pump:"ohne Mehrkosten",instead_wallbox:"ohne Mehrkosten",instead_pv:"ohne Anschaffungskosten",in_the_plus_from:"Im Plus ab etwa {date}",in_the_plus:"Im Plus",yearly_after_twelve:"Jahreswerte gibt es nach zw\xF6lf Monaten Daten.",yearly_from:"Jahreswert ab {date}",pays_off_in:"amortisiert in etwa {years}",years_one:"1 Jahr",years_other:"{count} Jahren",under_one_year:"weniger als einem Jahr",return_per_year:"amortisiert, {percent} Rendite pro Jahr",instead_of_gas:"statt Gas",instead_of_oil:"statt \xD6l",instead_of_fuel:"statt Sprit",per_year:"{amount}/Jahr",gas:"Gas {price}/kWh",oil:"\xD6l {price}/l",fuel:"Sprit {price}/l",prices_link:"Preise \xE4ndern",progress:"{name}: {percent} der Investition gespart",history_title:"Ersparnis",history_total:"Summe",history_no_chart:"Das Diagramm erscheint nur in Home Assistant.",history_failed:"Die Statistik konnte nicht geladen werden.",history_empty:"Keine Ersparnis in diesem Zeitraum.",figures_title:"Kennzahlen",figures_failed:"Die Kennzahlen konnten nicht geladen werden.",figures_unavailable:"nicht verf\xFCgbar","figure.energy":"Verbrauch","figure.energy.grid":"Netzbezug","figure.energy.solar":"Solarertrag","figure.cost":"Kosten","figure.cost.grid":"Netzkosten","figure.price":"\xF8 Strompreis","figure.solar_share":"Solaranteil","figure.solar_share.household":"Autarkie","figure.cheap_share":"G\xFCnstiger Netzstrom","figure.expensive_share":"Teurer Netzstrom","figure.self_consumption":"Eigenverbrauch","figure.export":"Einspeisung","figure.saving":"Ersparnis","figure.forecast_today":"Prognose heute","figure.forecast_tomorrow":"Prognose morgen","figure.heat":"W\xE4rme","figure.alternative_cost":"Vergleichskosten","figure.scop":"JAZ","figure.heat_price":"W\xE4rmepreis","figure.distance":"Strecke","figure.cost_per_100km":"Kosten pro 100 km",line_saving_split:"mit Solar {total}, davon {solar} durch PV",line_from_electricity:"aus {energy} Strom",line_heat_from:"{heat} W\xE4rme aus {energy}",line_cost_for_heat:"{cost} f\xFCr {heat} W\xE4rme",line_charged:"mit {energy} geladen",line_solar_part:"davon {percent} Solarstrom",line_exported:"{energy} eingespeist",line_average_price:"\xF8 {price}",line_for_import:"f\xFCr {energy} Netzbezug",line_cost_for:"{cost} f\xFCr {energy}",line_from_solar:"{part} von {whole} aus Solar",line_of_grid:"{part} von {whole} Netzstrom",line_self_used:"{part} von {whole} im Haus genutzt","value.change":"Summe im Zeitraum","value.mean":"Mittelwert","value.min":"Minimum","value.max":"Maximum",value_range:"von {min} bis {max}",value_current:"aktueller Wert","period.energy_date":"Der Datumsauswahl folgen","period.today":"Heute","period.yesterday":"Gestern","period.this_month":"Dieser Monat","period.last_month":"Letzter Monat","period.this_year":"Dieses Jahr","period.last_year":"Letztes Jahr","period.all":"Alle Jahre",editor_title:"Titel (optional)",editor_period:"Zeitraum",editor_period_hint:"Ohne Datumsauswahl auf dem Dashboard: dieser Monat.",editor_columns:"Spalten",editor_columns_auto:"Auto",editor_tiles:"Kacheln",editor_add_tile:"Kachel hinzuf\xFCgen",editor_edit_tile:"Kachel {number} bearbeiten",editor_back:"Zur\xFCck",editor_edit:"Bearbeiten",editor_remove:"Entfernen",editor_source:"Quelle","source.energy":"Energiedaten","source.statistic":"Statistik","source.entity":"Entit\xE4t",editor_area:"Bereich",editor_figure:"Gr\xF6\xDFe",editor_statistic:"Statistik",editor_value:"Wert",editor_secondary:"Unterzeile","secondary.none":"Standard","secondary.range":"Spanne im Zeitraum",editor_entity:"Entit\xE4t",editor_name:"Name (optional)",editor_not_loaded:"Energiedaten brauchen die Integration Electricity Lens.","source.solar":"Solarstrom","source.grid":"Netzstrom","source.normal":"Normaler Netzstrom","source.cheap":"G\xFCnstiger Netzstrom","source.expensive":"Teurer Netzstrom","source.export":"Einspeisung","stack.source":"Nach Quelle","stack.consumer":"Nach Verbraucher","stack.none":"Nicht gestapelt",editor_savings:"Ersparnisse aller Kategorien",editor_stack:"Stapelung",editor_line:"Linie",editor_lines:"Weitere Linien aus Statistiken",editor_line_none:"Keine",history_empty_figure:"Keine Daten in diesem Zeitraum.",breakdown_mix:"Strommix",breakdown_cost_by_consumer:"Kosten nach Verbraucher",breakdown_energy_by_consumer:"Verbrauch nach Verbraucher",breakdown_total:"Gesamt","mix.solar":"PV","mix.grid":"Netz","mix.normal":"Netz normal","mix.cheap":"Netz g\xFCnstig","mix.expensive":"Netz teuer",editor_by:"Aufteilen","by.source":"Nach Quelle","by.consumer":"Nach Verbraucher",editor_display:"Darstellung","display.ring":"Ring","display.bars":"Balken",editor_color_by_source:"Balken nach Quelle f\xE4rben",editor_breakdown_source:"Quelle","breakdown_source.energy":"Energiedaten","breakdown_source.statistics":"Statistiken",editor_statistics:"Statistiken","figure_choice.energy":"Verbrauch","figure_choice.cost":"Kosten","strategy.title":"Strom","strategy.overview":"Jetzt","strategy.electricity":"Haushalt","strategy.cost_today":"Kosten heute","strategy.self_sufficiency_today":"Autarkie heute","strategy.solar_today":"Solar heute","strategy.consumption_today":"Verbrauch heute","strategy.bill":"Stromrechnung","strategy.paid_back":"Amortisiert","strategy.per_year":"Pro Jahr","strategy.costs":"Kosten","strategy.heating":"Heizen","strategy.charging":"Laden","strategy.balance":"Bilanz","strategy.usage_graph":"Strombilanz","strategy.solar_graph":"Solar","strategy.devices_graph":"Einzelger\xE4te","strategy.distribution":"Stromverteilung","strategy.not_loaded":"Richte die Integration Electricity Lens ein, um dieses Dashboard zu sehen."},w5={en:t2,de:_5},P=r=>r in t2;function g(r){let L=w5[r.split("-")[0]]??t2;return(C,H={})=>L[C].replace(/\{(\w+)\}/g,(V,M)=>H[M]??"")}var R=O`
  :host {
    --electricity-lens-pv-color: var(--energy-solar-color, #ff9800);
    --electricity-lens-heat-pump-color: var(--energy-gas-color, #8e021b);
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
`;var D=["energy_date","today","yesterday","this_month","last_month","this_year","last_year"];function k(r,L,C){let H=`figure.${L}.${C.kind}`,V=r(P(H)?H:`figure.${L}`);return["device","other","category"].includes(C.kind)?`${C.name} ${V}`:V}var B5=300*1e3,P5={solar_share:G.solar,self_consumption:G.solar,cheap_share:G.cheap,expensive_share:G.expensive},i2=r=>r.toDateString();function T5(r){let L=new Date,C=i2(L),H=i2(new Date(L.getFullYear(),L.getMonth(),L.getDate()+1)),V={today:null,tomorrow:null};for(let M of Object.values(r??{}))for(let[e,a]of Object.entries(M.wh_hours??{})){let t=i2(new Date(e));t===C&&(V.today=(V.today??0)+a/1e3),t===H&&(V.tomorrow=(V.tomorrow??0)+a/1e3)}return V}var e1=class extends Z{constructor(){super(...arguments);this._infoLoading=!1}static getStubConfig(){return{period:"energy_date",tiles:[{area:"household",figure:"cost"},{area:"household",figure:"solar_share"}]}}static getConfigElement(){return document.createElement("electricity-lens-figures-card-editor")}setConfig(C){if(!C||C.tiles!==void 0&&!Array.isArray(C.tiles))throw new Error("tiles must be a list");this._config=C}getCardSize(){return 1+2*Math.ceil((this._config?.tiles?.length??1)/2)}getGridOptions(){return{columns:12,min_columns:3}}connectedCallback(){super.connectedCallback(),this._follow()}disconnectedCallback(){super.disconnectedCallback(),this._unfollow?.(),this._unfollow=void 0}get _localize(){return g(this.hass?.locale?.language??this.hass?.language??"en")}get _language(){return this.hass?.locale?.language??"en"}get _period(){return this._config?.period??"energy_date"}get _tiles(){return this._config?.tiles??[]}_follow(){this._period==="energy_date"&&(this._unfollow||!this.isConnected||!this.hass?.connection||(this._unfollow=Y(this.hass.connection,C=>{this._selected=C})))}_range(){let C=this._period;if(C!=="energy_date")return B(C);if(this._selected!==void 0)return this._selected??B("this_month")}_area(C){return this._info?.areas.find(H=>H.id===C)}_figure(C){let H=this._area(C.area);if(!(!H||!C.figure||!T(H).includes(C.figure)))return{area:H,figure:C.figure}}async _loadInfo(){!this.hass||this._infoLoading||(this._infoLoading=!0,this._info=await M1(this.hass),this._infoLoading=!1)}_request(){let C=this._range();if(!C)return;let H=this._tiles;if(H.some(i=>y(i)==="energy")&&this._info===void 0)return;let M=new Set,e=new Set,a=!1;for(let i of H){let o=y(i);if(o==="statistic"&&i.statistic)M.add(i.statistic),e.add(i.statistic);else if(o==="energy"){let A=this._figure(i);if(!A)continue;E1(A.figure)&&(a=!0),N2(A.area,A.figure).forEach(n=>M.add(n))}}let t=[...M].sort();return{key:JSON.stringify([t,C.start,C.end,a]),range:C,ids:t,statistics:[...e].sort(),forecast:a}}async _load(C){if(!this.hass)return;this._loading=C.key;let H=C1(F(C.range)),V={key:C.key,at:Date.now(),range:C.range,period:H,rows:{},metadata:{},forecast:{today:null,tomorrow:null},failed:!1};try{let[M,e,a]=await Promise.all([C.ids.length?this.hass.callWS({type:"recorder/statistics_during_period",start_time:new Date(C.range.start).toISOString(),end_time:new Date(C.range.end+1).toISOString(),statistic_ids:C.ids,period:H,types:["change","mean","min","max"],units:{energy:"kWh"}}):Promise.resolve({}),C.statistics.length?this.hass.callWS({type:"recorder/get_statistics_metadata",statistic_ids:C.statistics}):Promise.resolve([]),C.forecast?this.hass.callWS({type:"energy/solar_forecast"}):Promise.resolve({})]);V.rows=M,V.metadata=Object.fromEntries(e.map(t=>[t.statistic_id,t])),V.forecast=T5(a)}catch{V.failed=!0}this._loading===C.key&&(this._loading=void 0,this._loaded=V)}willUpdate(C){if(!this.hass)return;(C.has("hass")||C.has("_config"))&&this._follow(),this._info===void 0&&(this._info=L1()),K()&&!this._infoLoading&&this._loadInfo();let H=this._request(),V=!this._loaded||Date.now()-this._loaded.at>B5;H&&H.key!==this._loading&&(H.key!==this._loaded?.key||V&&!this._loading)&&this._load(H)}get _fmt(){return J(this._language,this.hass?.config.currency??"EUR")}_number(C,H){return this._fmt.number(C,H)}_format(C,H){return this._fmt.value(C,H)}_rows(C){let H=this._loaded;if(!H)return[];let V=H.period==="hour"?0:12*36e5;return(H.rows[C]??[]).filter(M=>{let e=(typeof M.start=="number"?M.start:Date.parse(M.start))+V;return e>=H.range.start&&e<=H.range.end})}_sum(C){let H=0;for(let V of C??[])for(let M of this._rows(V))H+=M.change??0;return H}_energyTile(C){let H=this._localize,V=this._figure(C);if(!V){let A=`figure.${C.figure??""}`,n=C.name??(P(A)?H(A):C.figure??"");return this._info===void 0?this._tile(n,"\u2026"):this._tile(n,"\u2013",H("figures_unavailable"))}let{area:M,figure:e}=V,a=C.name??k(this._localize,e,M);if(this._info?.calculating&&!E1(e))return this._tile(a,"\u2026",H("calculating"));if(!this._loaded)return this._tile(a,"\u2026");if(this._loaded.failed)return this._tile(a,"\u2013");let t=e==="forecast_today"?this._loaded.forecast.today:e==="forecast_tomorrow"?this._loaded.forecast.tomorrow:null,i=X(e,M,A=>M.statistics[A]?this._sum(M.statistics[A]):null,t),o=i.line?H(i.line.key,Object.fromEntries(Object.entries(i.line.values).map(([A,n])=>[A,this._format(n.value,n.unit)]))):void 0;return this._tile(a,i.value===null?"\u2013":this._format(i.value,i.unit),o,i.bar,P5[e])}_statisticTile(C){let H=this._localize,V=C.statistic??"",M=this._loaded?.metadata[V],e=C.name??M?.name??this.hass?.states[V]?.attributes.friendly_name??V,a=this._rows(V),t=M?.unit_class==="energy"?"kWh":M?.statistics_unit_of_measurement??"",i=p=>p===null?"\u2013":`${this._number(p)}${t?` ${t}`:""}`,o=p=>a.map(m=>m[p]).filter(m=>typeof m=="number"),A=C.value??"change",n=null;if(A==="change")n=a.length?a.reduce((p,m)=>p+(m.change??0),0):null;else if(A==="mean"){let p=o("mean");n=p.length?p.reduce((m,c)=>m+c,0)/p.length:null}else{let p=o(A);n=p.length?A==="min"?Math.min(...p):Math.max(...p):null}let v=H(`value.${A}`);if(C.secondary==="range"){let p=o("min"),m=o("max");p.length&&m.length&&(v=H("value_range",{min:i(Math.min(...p)),max:i(Math.max(...m))}))}return this._tile(e,this._loaded?.failed?"\u2013":i(n),C.secondary==="none"?void 0:v)}_entityTile(C){let H=this._localize,V=this.hass?.states[C.entity??""],M=C.name??V?.attributes.friendly_name??C.entity??"";if(!V)return this._tile(M,"\u2013",H("figures_unavailable"));let e=Number(V.state),a=this.hass?.config.currency??"",t=V.attributes.unit_of_measurement?.replace(a,a?this._fmt.currencySymbol():""),i=V.state!==""&&Number.isFinite(e),o=this._fmt.currencySymbol(),A=i?t&&t===o?this._format(e,"money"):`${this._number(e)}${t?` ${t}`:""}`:["unknown","unavailable",""].includes(V.state)?"\u2013":V.state;return this._tile(M,A,C.secondary==="none"?void 0:H("value_current"))}get _single(){return this._tiles.length===1&&!this._config?.title}_tile(C,H,V,M,e){let[a,t]=$2(H),i=d`<div class="value">
      <span class="number">${a}</span>${t?d`<span class="unit">${t}</span>`:l}
    </div>`;return this._single?d`<div class="header stat-header"><h2 class="title">${C}</h2></div>
        <div class="stat">${i}<div class="line">${V??""}</div></div>`:d`<div class="tile">
      <div class="label">${C}</div>
      ${i}
      ${M!==void 0?d`<div class="track" role="presentation">
            <div
              class="fill"
              style="width: ${Math.min(Math.max(M,0),100)}%; background: ${e??"var(--primary-color)"}"
            ></div>
          </div>`:l}
      ${V?d`<div class="line">${V}</div>`:l}
    </div>`}render(){if(!this.hass||!this._config)return d``;let C=this._localize,H=this._range(),V=this._config.columns,M=!!V&&V>=1&&V<=4;return this._single?d`<ha-card lang=${this._language}>${this._renderTiles()}</ha-card>`:d`<ha-card lang=${this._language}>
      <div class="header">
        <h2 class="title">${this._config.title??""}</h2>
        ${H&&this._tiles.some(e=>y(e)!=="entity")?d`<span class="chip">${H1(H,this._language)}</span>`:l}
      </div>
      ${this._loaded?.failed?d`<p class="summary">${C("figures_failed")}</p>`:l}
      <div class="content">
      <div
        class="tiles ${M?"fixed":""}"
        style=${M?`--columns: ${V}`:""}
      >
        ${this._renderTiles()}
      </div>
      </div>
    </ha-card>`}_renderTiles(){return this._tiles.map(C=>{let H=y(C);return H==="statistic"?this._statisticTile(C):H==="entity"?this._entityTile(C):this._energyTile(C)})}};e1.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0},_selected:{state:!0},_loaded:{state:!0}},e1.styles=[R,O`
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
        display: flex;
        flex-wrap: wrap;
        align-items: baseline;
        column-gap: var(--ha-space-1, 4px);
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
      @container (max-width: 150px) {
        .number {
          font-size: 22px;
          line-height: 28px;
        }
      }
      /* A single figure: the stat card of the energy dashboards. */
      .stat-header .title {
        font-size: var(--ha-font-size-l, 16px);
        line-height: var(--ha-line-height-normal, 24px);
        color: var(--secondary-text-color);
      }
      .stat {
        display: flex;
        flex-direction: column;
        gap: var(--ha-space-1, 4px);
        min-height: 56px;
        padding: var(--ha-space-2, 8px) var(--ha-space-4, 16px) var(--ha-space-4, 16px);
      }
      .stat .number {
        white-space: nowrap;
      }
      .stat .line {
        font-size: var(--ha-font-size-s, 12px);
        line-height: 16px;
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
    `];var F5=["energy","cost","saving","export","heat","distance","alternative_cost"],R5=["price","solar_share","cheap_share","expensive_share","self_consumption","scop","heat_price","cost_per_100km"],s1=r=>F5.filter(L=>T(r).includes(L)),a2=r=>R5.filter(L=>T(r).includes(L));function r1(r,L){let C=[];return L==="energy"&&r.statistics.solar?.length&&C.push("source"),r.kind==="household"&&(L==="energy"||L==="cost")&&C.push("consumer"),C.push("none"),C}function N1(r,L,C,H,V){let M=t=>L.statistics[t]??[],e=E2(r,V);if(H==="source"&&C==="energy"){let t=[{id:"solar",name:{key:"source.solar"},color:V.solar,plus:M("solar"),minus:[]}],i=["cheap","expensive"].filter(A=>M(A).length);M("cheap").length&&t.push({id:"cheap",name:{key:"source.cheap"},color:V.cheap,plus:M("cheap"),minus:[]}),t.push({id:"grid",name:{key:i.length?"source.normal":"source.grid"},color:V.grid,plus:M("energy"),minus:[...M("solar"),...i.flatMap(M)],floor:!0}),M("expensive").length&&t.push({id:"expensive",name:{key:"source.expensive"},color:V.expensive,plus:M("expensive"),minus:[]});let o=r.areas.find(A=>A.kind==="grid")?.statistics.export??[];return L.kind==="household"&&o.length&&t.push({id:"export",name:{key:"source.export"},color:V.export,plus:o,minus:[],negative:!0}),t}if(H==="consumer")return r.areas.filter(t=>t.kind==="device"&&t.top_level!==!1||t.kind==="other").map(t=>({id:t.id,name:{text:t.name},color:e.get(t.id)??V.other,plus:t.statistics[C]??[],minus:[]}));let a=C==="heat"?V.heat:C==="distance"?V.car:C==="export"?V.export:L.kind==="solar"?V.solar:e.get(L.id)??V.grid;return[{id:C,name:{text:L.name},color:a,plus:M(C),minus:[]}]}var D5=36e5;async function q2(r,L,C){if(!L.length)return{};let H=C1(F(C)),V=await r.callWS({type:"recorder/statistics_during_period",start_time:new Date(C.start).toISOString(),end_time:new Date(C.end+1).toISOString(),statistic_ids:L,period:H,types:["change"],units:{energy:"kWh"}}),M=H==="hour"?0:12*D5,e={};for(let a of L){e[a]=0;for(let t of V[a]??[]){let i=(typeof t.start=="number"?t.start:Date.parse(t.start))+M;i>=C.start&&i<=C.end&&(e[a]+=t.change??0)}}return e}var E5=300*1e3,$5="240px",N5="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z",I5="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z",t1=class extends Z{constructor(){super(...arguments);this._config={type:""};this._infoLoading=!1;this._hidden=new Set}static getStubConfig(){return{area:"household",by:"source",figure:"energy",display:"ring"}}static getConfigElement(){return document.createElement("electricity-lens-breakdown-card-editor")}setConfig(C){if(C?.statistics!==void 0&&!Array.isArray(C.statistics))throw new Error("statistics must be a list");this._config=C??{type:""}}getCardSize(){return 4}getGridOptions(){return{columns:6,min_columns:4}}connectedCallback(){super.connectedCallback(),this._follow()}disconnectedCallback(){super.disconnectedCallback(),this._unfollow?.(),this._unfollow=void 0}get _localize(){return g(this.hass?.locale?.language??this.hass?.language??"en")}get _language(){return this.hass?.locale?.language??"en"}get _fmt(){return J(this._language,this.hass?.config.currency??"EUR")}get _byStatistics(){return!!this._config.statistics?.length}_follow(){(this._config.period??"energy_date")==="energy_date"&&(this._unfollow||!this.isConnected||!this.hass?.connection||(this._unfollow=Y(this.hass.connection,C=>{this._selected=C})))}_range(){let C=this._config.period??"energy_date";if(C!=="energy_date")return B(C);if(this._selected!==void 0)return this._selected??B("this_month")}_area(){return this._info?.areas.find(C=>C.id===(this._config.area??"household"))}get _by(){let C=this._area();return this._config.by==="consumer"&&C?.kind==="household"?"consumer":C?.statistics.solar?.length?"source":"consumer"}get _figure(){return this._by==="consumer"&&this._config.figure==="cost"?"cost":"energy"}_series(){let C=this._info,H=this._area();return!C||!H?[]:N1(C,H,this._figure,this._by==="source"?"source":"consumer",w(this)).filter(V=>!V.negative)}_ids(){let C=new Set;if(this._byStatistics)this._config.statistics?.forEach(H=>C.add(H.statistic));else{for(let H of this._series())[...H.plus,...H.minus].forEach(V=>C.add(V));if(this._by==="consumer"&&this._info)for(let H of this._series()){let V=this._info.areas.find(M=>M.id===H.id);for(let M of["energy","solar","cheap","expensive"])(V?.statistics[M]??[]).forEach(e=>C.add(e))}}return[...C].sort()}async _loadInfo(){!this.hass||this._infoLoading||(this._infoLoading=!0,this._info=await M1(this.hass),this._infoLoading=!1)}async _load(C,H,V){if(!this.hass)return;this._loading=C;let M={key:C,at:Date.now(),values:{},names:{},failed:!1};try{let e=this._byStatistics?H:[],[a,t]=await Promise.all([q2(this.hass,H,V),e.length?this.hass.callWS({type:"recorder/get_statistics_metadata",statistic_ids:e}):Promise.resolve([])]);M.values=a,M.names=Object.fromEntries(t.map(i=>[i.statistic_id,i.name??i.statistic_id]))}catch{M.failed=!0}this._loading===C&&(this._loading=void 0,this._sums=M)}willUpdate(C){if(!this.hass||((C.has("hass")||C.has("_config"))&&this._follow(),this._hasChart===void 0&&(this._hasChart=!1,R1().then(a=>{this._hasChart=a})),!this._byStatistics&&(this._info===void 0&&(this._info=L1()),K()&&!this._infoLoading&&this._loadInfo(),!this._info)))return;let H=this._range();if(!H)return;let V=this._ids();if(!V.length)return;let M=JSON.stringify([V,H.start,H.end]),e=!this._sums||Date.now()-this._sums.at>E5;M!==this._loading&&(M!==this._sums?.key||e&&!this._loading)&&this._load(M,V,H)}_sum(C){return C.reduce((H,V)=>H+(this._sums?.values[V]??0),0)}_parts(){let C=this._localize;if(this._byStatistics){let{consumers:V}=w(this);return(this._config.statistics??[]).map((M,e)=>({id:M.statistic,name:M.name??this._sums?.names[M.statistic]??M.statistic,color:V[e%V.length],value:this._sum([M.statistic])}))}let H=this._series().map(V=>{let M=this._sum(V.plus)-this._sum(V.minus),e=V.name.key?.replace(/^source\./,"mix."),a=V.name.text??(e&&P(e)?C(e):V.name.key&&P(V.name.key)?C(V.name.key):V.id),t={id:V.id,name:a,color:V.color,value:V.floor?Math.max(M,0):M};if(this._by==="consumer"&&this._info){let i=w(this),o=this._info.areas.find(A=>A.id===V.id);if(o){let A=c=>this._sum(o.statistics[c]??[]),n=A("energy"),v=A("solar"),p=A("cheap"),m=A("expensive");t.energy=n,t.mix=[{color:i.solar,value:v},{color:i.cheap,value:p},{color:i.grid,value:Math.max(n-v-p-m,0)},{color:i.expensive,value:m}]}}return t});return this._by==="consumer"?H.sort((V,M)=>M.value-V.value):H}_value(C){return this._figure==="cost"&&!this._byStatistics?this._fmt.value(C,"money"):this._fmt.value(C,"energy")}_title(){let C=this._localize;return this._config.title?this._config.title:this._byStatistics?"":(this._area()?this._by:this._config.by??"source")==="source"?C("breakdown_mix"):C(this._figure==="cost"?"breakdown_cost_by_consumer":"breakdown_energy_by_consumer")}_ring(C){let H=this._localize;if(!this._hasChart)return d`<p class="summary">${H("history_no_chart")}</p>`;let V=getComputedStyle(this),M=this._figure==="cost"&&!this._byStatistics,e=F2({items:C,total:H("breakdown_total"),format:i=>this._value(i),percent:i=>this._fmt.value(i,"percent"),centerColor:w(this).line,labelColor:V.getPropertyValue("--primary-text-color").trim()||"#212121",hidden:this._hidden}),a=H2(C.map(i=>this._hidden.has(i.id)?0:i.value)),t=i=>{let o=new Set(this._hidden);o.has(i)?o.delete(i):o.add(i),this._hidden=o};return d`<div class="ring">
      ${w2(M,d`<ha-chart-base
          .hass=${this.hass}
          .data=${e.data}
          .options=${e.options}
          .height=${$5}
        ></ha-chart-base>`)}
      <div class="chart-legend">
        <ul>
          ${C.map((i,o)=>{let A=this._hidden.has(i.id),n=this._fmt.value(a[o],"percent");return d`<li class=${A?"hidden":""}>
              <button
                type="button"
                class="leg"
                aria-pressed=${String(!A)}
                aria-label="${i.name}: ${n}"
                @click=${()=>t(i.id)}
              >
                <svg class="icon" viewBox="0 0 24 24" style="color: ${A?"var(--secondary-text-color)":i.color}">
                  <path fill="currentColor" d=${A?I5:N5}></path>
                </svg>
                <span class="label">${i.name}</span>
                <span class="value">${n}</span>
              </button>
            </li>`})}
        </ul>
      </div>
    </div>`}_bars(C){let H=Math.max(...C.map(e=>e.value),0),V=this._config.color_by_source===!0&&this._by==="consumer",M=this._localize;return d`<div class="bars">
      ${C.map(e=>{let a=H>0?Math.max(e.value/H*100,0):0,t=e.mix?.reduce((o,A)=>o+A.value,0)??0,i="";return e.energy!==void 0&&(i=this._fmt.value(e.energy,"energy"),this._figure==="cost"&&e.energy>0&&(i+=` \xB7 ${M("line_average_price",{price:this._fmt.value(e.value/e.energy,"price")})}`)),d`<div class="bar-row">
          <div class="bar-text">
            <span class="name">${e.name}</span>
            <span class="amount">${this._value(e.value)}</span>
          </div>
          ${i?d`<div class="bar-line">${i}</div>`:l}
          <div class="track">
            <div class="fill" style="width: ${a}%; ${V?"":`background: ${e.color}`}">
              ${V&&e.mix&&t>0?e.mix.map(o=>d`<span style="width: ${o.value/t*100}%; background: ${o.color}"></span>`):l}
            </div>
          </div>
        </div>`})}
      ${V?d`<div class="key">
            ${["solar","cheap","grid","expensive"].filter(e=>(e!=="cheap"||this._info?.levels.cheap_until!=null)&&(e!=="expensive"||this._info?.levels.expensive_from!=null)).map(e=>d`<span><span class="dot" style="background: ${G[e]}"></span>${M(e==="grid"?this._info?.levels.cheap_until!=null||this._info?.levels.expensive_from!=null?"source.normal":"source.grid":`source.${e}`)}</span>`)}
          </div>`:l}
    </div>`}render(){if(!this.hass)return d``;let C=this._localize,H=this._range(),V=this._sums?this._parts():[],M=V.reduce((A,n)=>A+Math.max(n.value,0),0),e=!this._byStatistics&&this._info?.calculating===!0,a=!this._byStatistics&&this._info!==void 0&&!this._area(),t=this._config.display??(!this._byStatistics&&this._by==="consumer"?"bars":"ring"),i=H?H1(H,this._language):"";t==="bars"&&this._sums&&!this._sums.failed&&M>0&&(i=this._value(M));let o;return e?o=d`<p class="summary">${C("calculating_all")}</p>`:a?o=d`<p class="summary">${C(this._info===null?"editor_not_loaded":"figures_unavailable")}</p>`:this._sums?.failed?o=d`<p class="summary">${C("figures_failed")}</p>`:this._sums?M<=0?o=d`<p class="summary">${C("history_empty_figure")}</p>`:o=t==="bars"?this._bars(V):this._ring(V):o=d`<p class="summary">${C("calculating")}</p>`,d`<ha-card>
      <div class="header">
        <h2 class="title">${this._title()}</h2>
        ${i?d`<span class="chip">${i}</span>`:l}
      </div>
      ${o}
    </ha-card>`}};t1.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0},_selected:{state:!0},_sums:{state:!0},_hasChart:{state:!0},_hidden:{state:!0}},t1.styles=[R,O`
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
        width: 10px;
        height: 10px;
        border-radius: 5px;
        margin-right: 4px;
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
    `];var i1=r=>({select:{mode:"dropdown",options:r}}),W5=r=>r.kind==="household"||!!r.statistics.solar?.length,u1=class extends Z{constructor(){super(...arguments);this._label=C=>this._localize(`editor_${C.name}`)}setConfig(C){this._config=C}get _localize(){return g(this.hass?.locale?.language??this.hass?.language??"en")}willUpdate(){this.hass&&this._info===void 0&&(this._info=null,this.hass.callWS({type:`${f}/figures`}).then(C=>{this._info=C}).catch(()=>{}))}_data(){let C=this._config??{type:""},H=!!C.statistics?.length||C.statistics!==void 0&&!C.area;return{title:C.title??"",period:C.period??"energy_date",source:H?"statistics":"energy",area:C.area??"household",by:C.by??"source",figure:C.figure??"energy",display:C.display??(!H&&C.by==="consumer"?"bars":"ring"),color_by_source:C.color_by_source??!1,statistics:(C.statistics??[]).map(V=>V.statistic)}}_schema(C){let H=this._localize,V=[{name:"title",selector:{text:{}}},{name:"period",selector:i1(D.map(M=>({value:M,label:H(`period.${M}`)})))},{name:"breakdown_source",selector:i1(["energy","statistics"].map(M=>({value:M,label:H(`breakdown_source.${M}`)})))}];if(C.source==="statistics")V.push({name:"statistics",selector:{statistic:{multiple:!0}}});else{let M=(this._info?.areas??[]).filter(W5),e=M.find(t=>t.id===C.area),a=[...e?.statistics.solar?.length?["source"]:[],...e?.kind==="household"?["consumer"]:[]];V.push({name:"area",selector:i1(M.map(t=>({value:t.id,label:t.name})))},{name:"by",selector:i1(a.map(t=>({value:t,label:H(`by.${t}`)})))}),C.by==="consumer"&&V.push({name:"figure",selector:i1(["energy","cost"].map(t=>({value:t,label:H(`figure_choice.${t}`)})))})}return V.push({name:"display",selector:i1(["ring","bars"].map(M=>({value:M,label:H(`display.${M}`)})))}),C.source!=="statistics"&&C.by==="consumer"&&C.display==="bars"&&V.push({name:"color_by_source",selector:{boolean:{}}}),V}_changed(C){if(!this._config)return;let H={...this._data(),...C.detail.value};"breakdown_source"in C.detail.value&&(H.source=C.detail.value.breakdown_source);let V={type:this._config.type};if(typeof H.title=="string"&&H.title&&(V.title=H.title),V.period=H.period??"energy_date",H.source==="statistics"){let M=new Map((this._config.statistics??[]).map(a=>[a.statistic,a])),e=Array.isArray(H.statistics)?H.statistics.filter(Boolean):[];V.statistics=e.map(a=>M.get(a)??{statistic:a})}else{V.area=H.area??"household";let M=this._info?.areas.find(t=>t.id===V.area),e=M?.kind==="household",a=!!M?.statistics.solar?.length;V.by=H.by==="consumer"&&e?"consumer":a?"source":"consumer",V.by==="consumer"&&H.figure==="cost"?V.figure="cost":V.figure="energy"}V.display=H.display==="bars"?"bars":"ring",V.by==="consumer"&&V.display==="bars"&&H.color_by_source===!0&&(V.color_by_source=!0),this._config=V,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:V},bubbles:!0,composed:!0}))}render(){if(!this.hass||!this._config)return d``;let C=this._data();return d`<ha-form
      .hass=${this.hass}
      .data=${{...C,breakdown_source:C.source}}
      .schema=${this._schema(C)}
      .computeLabel=${this._label}
      @value-changed=${this._changed}
    ></ha-form>`}};u1.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0}};var Y2="M7 11H9V13H7V11M21 5V19C21 20.11 20.11 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H6V1H8V3H16V1H18V3H19C20.11 3 21 3.9 21 5M5 7H19V5H5V7M19 19V9H5V19H19M15 13V11H17V13H15M11 13V11H13V13H11M7 15H9V17H7V15M15 17V15H17V17H15M11 17V15H13V17H11Z";var J2="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z";var X2="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z";var C5="M18,6H8.83L14.83,12L8.83,18H18V20H6V18L12,12L6,6V4H18V6Z";var H5="electricity-lens-balance-card-view",z5=()=>{try{return localStorage.getItem(H5)==="yearly"?"yearly":"total"}catch{return"total"}},a1=class extends Z{constructor(){super(...arguments);this._view=z5()}static getStubConfig(){return{}}static getConfigForm(){return{schema:[]}}setConfig(C){}getCardSize(){return 4}getGridOptions(){return{columns:12,min_columns:6}}get _localize(){return g(this.hass?.locale?.language??this.hass?.language??"en")}get _language(){return this.hass?.locale?.language??"en"}_money(C,H=!1){return new Intl.NumberFormat(this._language,{style:"currency",currency:this.hass?.config.currency??"EUR",maximumFractionDigits:0,minimumFractionDigits:0,signDisplay:H?"exceptZero":"auto"}).format(C)}_price(C){return new Intl.NumberFormat(this._language,{style:"currency",currency:this.hass?.config.currency??"EUR",maximumFractionDigits:4,minimumFractionDigits:2}).format(C)}_percent(C){return new Intl.NumberFormat(this._language,{style:"percent",maximumFractionDigits:0}).format(C/100)}_month(C){return new Intl.DateTimeFormat(this._language,{month:"long",year:"numeric"}).format(C)}_years(C){let H=this._localize;if(C<1)return H("under_one_year");let V=Math.round(C);return V===1?H("years_one"):H("years_other",{count:String(V)})}_toggleView(){this._view=this._view==="total"?"yearly":"total";try{localStorage.setItem(H5,this._view)}catch{}}_openIntegration(){history.pushState(null,"",`/config/integrations/integration/${f}`),window.dispatchEvent(new CustomEvent("location-changed"))}render(){let C=this._localize;if(!this.hass)return d``;let H=V1(this.hass);if(!H.length)return d`<ha-card>
        <div class="header"><h2 class="title">${C("title")}</h2></div>
        <p class="summary">${C("not_set_up")}</p>
      </ha-card>`;let V=Q2(H),M=this._view==="yearly";return d`<ha-card>
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
            <path d=${M?C5:Y2}></path>
          </svg>
        </button>
      </div>
      <p class="summary">${this._summary(V,H,M)}</p>
      <ul class="rows">
        ${H.map(e=>this._row(e,M))}
      </ul>
      ${this._footer(H)}
    </ha-card>`}_chip(C,H){let V=this._localize,M=null;return H?C.perYear!==null&&(M=V("per_year",{amount:this._money(C.perYear,!0)})):C.balance!==null?M=this._money(C.balance,!0):C.calculating||(M=this._money(C.saved)),M===null?l:d`<span class="chip">${M}</span>`}_summary(C,H,V){let M=this._localize;return C.calculating?M("calculating_all"):V?C.inThePlusFrom===null?H.some(e=>e.perYear===null)?M("yearly_after_twelve"):"":C.balance!==null&&C.balance>=0?M("in_the_plus"):M("in_the_plus_from",{date:this._month(C.inThePlusFrom)}):C.invested>0?M("saved_invested",{saved:this._money(C.saved),invested:this._money(C.invested)}):M("saved_only",{saved:this._money(C.saved)})}_row(C,H){let V=this._localize,M=V(`category.${C.category}`),e="\u2013";return C.calculating||(H&&C.perYear!==null?e=V("per_year",{amount:this._money(C.perYear)}):!H&&C.saving!==null&&(e=this._money(C.saving))),d`<li class="row ${C.category}">
      <span class="swatch" aria-hidden="true"></span>
      <div class="row-body">
        <div class="line">
          <span>${M}</span>
          <span class="amount ${e==="\u2013"?"waiting":""}">${e}</span>
        </div>
        <div class="sub">
          ${C.calculating?V("calculating"):H?this._yearlyDetail(C):this._totalDetail(C,M)}
        </div>
        ${C.calculating?l:this._since(C)}
      </div>
    </li>`}_since(C){let H=this._localize,V=[];return C.countingSince&&V.push(H("since",{date:this._month(C.countingSince)})),C.heatEstimated&&V.push(H("heat_estimated")),V.length?d`<div class="sub since">${V.join(" \xB7 ")}</div>`:l}_totalDetail(C,H){let V=this._localize;if(C.investment&&C.payback!==null){let M=Math.max(0,C.payback),e=this._percent(C.payback);return d`<div class="meter">
        <div
          class="bar"
          role="progressbar"
          aria-label=${V("progress",{name:H,percent:e})}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow=${Math.min(100,Math.round(M))}
        >
          <i style="width:${Math.min(100,M)}%"></i>
        </div>
        <span
          >${M>=100?V("paid_off"):V("of_investment",{percent:e,investment:this._money(C.investment)})}</span
        >
      </div>`}return V(`instead_${C.category}`)}_yearlyDetail(C){let H=this._localize;if(C.perYear===null)return C.yearlyFrom?H("yearly_from",{date:this._month(C.yearlyFrom)}):"";let V=j2(C);if(V!==null)return H("return_per_year",{percent:this._percent(V)});let M=K2(C);return M!==null?H("pays_off_in",{years:this._years(M)}):C.category==="heat_pump"?H(C.heating==="oil"?"instead_of_oil":"instead_of_gas"):C.category==="wallbox"?H("instead_of_fuel"):""}_footer(C){let H=this._localize,V=[];for(let M of C){if(M.price===null)continue;let e=this._price(M.price);M.category==="heat_pump"&&V.push(H(M.heating==="oil"?"oil":"gas",{price:e})),M.category==="wallbox"&&V.push(H("fuel",{price:e}))}return V.length?d`<div class="footer">
      <button
        class="prices"
        type="button"
        title=${H("prices_link")}
        aria-label=${`${H("prices_link")}: ${V.join(", ")}`}
        @click=${this._openIntegration}
      >
        ${V.join(" \xB7 ")}
      </button>
    </div>`:l}};a1.properties={hass:{attribute:!1},_view:{state:!0}},a1.styles=[R,O`
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
    `];var U5=300*1e3,V5="250px",G5={energy:"energy",cost:"money",saving:"money",export:"energy",heat:"energy",distance:"distance",alternative_cost:"money"},o1=class extends Z{constructor(){super(...arguments);this._config={type:""};this._infoLoading=!1}static getStubConfig(){return{}}static getConfigElement(){return document.createElement("electricity-lens-history-card-editor")}setConfig(C){this._config=C??{type:""}}getCardSize(){return 5}getGridOptions(){return{columns:12,min_columns:6}}connectedCallback(){super.connectedCallback(),this._follow()}disconnectedCallback(){super.disconnectedCallback(),this._unfollow?.(),this._unfollow=void 0}get _localize(){return g(this.hass?.locale?.language??this.hass?.language??"en")}get _language(){return this.hass?.locale?.language??"en"}get _fmt(){return J(this._language,this.hass?.config.currency??"EUR")}get _savings(){return!this._config.area}_follow(){(this._config.period??"energy_date")==="energy_date"&&(this._unfollow||!this.isConnected||!this.hass?.connection||(this._unfollow=Y(this.hass.connection,C=>{this._selected=C})))}async _loadInfo(){!this.hass||this._infoLoading||(this._infoLoading=!0,this._info=await M1(this.hass),this._infoLoading=!1)}_range(C){let H=this._config.period??"energy_date";if(H==="all")return{range:C(),period:"year"};if(H!=="energy_date"){let M=B(H);return{range:M,period:F(M)}}if(this._selected===void 0)return;if(this._selected)return{range:this._selected,period:F(this._selected)};let V=C();return{range:V,period:this._savings?"year":F(V)}}_savingsPlan(){if(!this.hass)return;let C=this._localize,H=V1(this.hass);if(!H.length||H.some(t=>t.calculating))return;let V=this._range(()=>z2(H.map(t=>t.countingSince)));if(!V)return;let M=w(this),e={pv:M.solar,heat_pump:M.heat,wallbox:M.car},a=H.map(t=>({series:{id:t.category,name:{},color:e[t.category],plus:[t.savingStatistic],minus:[]},name:C(`category.${t.category}`)}));return this._plan(V,a,"money",void 0,[])}_figurePlan(){let C=this._info,H=this._config;if(!C||C.calculating)return;let V=C.areas.find(n=>n.id===H.area),M=H.figure??"energy";if(!V||!V.statistics[M]?.length)return;let e=this._range(()=>B("this_month"));if(!e)return;let a=this._localize,t=r1(V,M),i=H.stack&&t.includes(H.stack)?H.stack:t[0],o=N1(C,V,M,i,w(this)).map(n=>({series:n,name:n.name.text??(n.name.key&&P(n.name.key)?a(n.name.key):n.id)}));o.length===1&&(o[0].name=k(a,M,V));let A=H.line&&V.statistics?{figure:H.line,area:V,name:k(a,H.line,V)}:void 0;return this._plan(e,o,G5[M],A,H.lines??[])}_plan(C,H,V,M,e){let a=new Set;for(let{series:i}of H)[...i.plus,...i.minus].forEach(o=>a.add(o));if(M)for(let i of Object.values(M.area.statistics))(i??[]).forEach(o=>a.add(o));e.forEach(i=>a.add(i.statistic));let t=[...a].sort();return{key:JSON.stringify([t,H.map(i=>i.series.id),M?.figure,e,C.range.start,C.range.end,C.period]),range:C.range,period:C.period,bars:H,unit:V,lineFigure:M,lines:e,ids:t}}async _load(C){if(!this.hass)return;this._loading=C.key;let H={key:C.key,at:Date.now(),plan:C,slots:W2(C.range,C.period),rows:{},metadata:{},failed:!1};try{let V=C.lines.map(a=>a.statistic),[M,e]=await Promise.all([this.hass.callWS({type:"recorder/statistics_during_period",start_time:new Date(C.range.start).toISOString(),end_time:new Date(C.range.end+1).toISOString(),statistic_ids:C.ids,period:C1(C.period),types:["change","mean"],units:{energy:"kWh"}}),V.length?this.hass.callWS({type:"recorder/get_statistics_metadata",statistic_ids:V}):Promise.resolve([])]);H.rows=M,H.metadata=Object.fromEntries(e.map(a=>[a.statistic_id,a]))}catch{H.failed=!0}this._loading===C.key&&(this._loading=void 0,this._loaded=H)}willUpdate(C){if(!this.hass)return;(C.has("hass")||C.has("_config"))&&this._follow(),this._hasChart===void 0&&(this._hasChart=!1,R1().then(M=>{this._hasChart=M})),this._savings||(this._info===void 0&&(this._info=L1()),K()&&!this._infoLoading&&this._loadInfo());let H=this._savings?this._savingsPlan():this._figurePlan(),V=!this._loaded||Date.now()-this._loaded.at>U5;H&&H.key!==this._loading&&(H.key!==this._loaded?.key||V&&!this._loading)&&this._load(H),C.has("_loaded")&&(this._chart=this._buildChart())}_perSlot(C){let H=this._loaded;if(!H)return[];let V=H.slots.map(()=>null);for(let M of C)M2(H.rows[M],H.slots,H.plan.period).forEach((e,a)=>{e!==null&&(V[a]=(V[a]??0)+e)});return V}_barValues(C){let H=this._perSlot(C.plus),V=this._perSlot(C.minus);return H.map((M,e)=>{if(M===null)return null;let a=M-(V[e]??0),t=C.floor?Math.max(a,0):a;return C.negative?-t:t})}_lines(){let C=this._loaded;if(!C)return[];let{plan:H,slots:V}=C,M=this._fmt,e=w(this),a=this.hass?.config.currency==="EUR"?100:1,t=[];if(H.lineFigure){let{figure:i,area:o,name:A}=H.lineFigure,n=Object.fromEntries(Object.entries(o.statistics).map(([m,c])=>[m,this._perSlot(c??[])])),v=V.map((m,c)=>X(i,o,s=>n[s]?.[c]??null,null).value),p=X(i,o,()=>0,null).unit;t.push({id:`line_${i}`,name:A,color:e.line,dash:"dashed",step:p==="price"&&H.period==="hour",values:p==="price"?v.map(m=>m===null?null:m*a):v,format:m=>M.value(p==="price"?m/a:m,p)})}return H.lines.forEach((i,o)=>{let A=C.metadata[i.statistic],n=i.value??(A?.has_sum?"change":"mean"),v=A?.unit_class==="energy"?"kWh":A?.statistics_unit_of_measurement??"",p=n==="mean"?U2(C.rows[i.statistic],V,H.period):M2(C.rows[i.statistic],V,H.period);t.push({id:`statistic_${o}`,name:i.name??A?.name??this.hass?.states[i.statistic]?.attributes.friendly_name??i.statistic,color:o===0&&!H.lineFigure?e.line:e.consumers[o%e.consumers.length],dash:"dotted",values:p,format:m=>`${M.number(m)}${v?` ${v}`:""}`})}),t}_buildChart(){let C=this._loaded;if(!C||C.failed)return;let H=this._localize,V=this._fmt,{plan:M}=C,e=M.bars.map(({series:o,name:A})=>({id:o.id,name:A,color:o.color,values:this._barValues(o),inTotal:!o.negative})),a=this._lines(),t={price:this.hass?.config.currency==="EUR"?"ct/kWh":`${V.currencySymbol()}/kWh`,percent:"%",per_100km:`${V.currencySymbol()}/100 km`},i=M.lineFigure&&!M.lines.length?t[X(M.lineFigure.figure,M.lineFigure.area,()=>0,null).unit]??"":"";return T2({labels:this._labels(C.slots,M.period),series:e,unit:M.unit==="money"?V.currencySymbol():M.unit==="distance"?"km":"kWh",total:H("history_total"),format:o=>M.unit==="money"?V.value(o,"money"):`${V.number(o,Math.abs(o)<10?2:1)} ${M.unit==="distance"?"km":"kWh"}`,tick:o=>V.number(o,Math.abs(o)<10?2:0),lines:a,lineUnit:i})}_labels(C,H){let V=i=>new Intl.DateTimeFormat(this._language,i),M=V({hour:"2-digit",minute:"2-digit"}),e=C.length>0&&new Date(C[0]).getFullYear()!==new Date(C[C.length-1]).getFullYear(),a={hour:M,day:V({day:"numeric"}),month:V(e?{month:"short",year:"2-digit"}:{month:"short"}),year:V({year:"numeric"})}[H],t={hour:M,day:V({weekday:"short",day:"numeric",month:"short"}),month:V({month:"long",year:"numeric"}),year:V({year:"numeric"})}[H];return C.map(i=>({axis:a.format(i),tooltip:H==="hour"?`${M.format(i)} \u2013 ${M.format(i+36e5)}`:t.format(i)}))}_title(){let C=this._localize;if(this._config.title)return this._config.title;if(this._savings)return C("history_title");let H=this._config.figure??"energy",V=this._info?.areas.find(e=>e.id===this._config.area);if(V)return k(C,H,V);let M=`figure.${H}`;return P(M)?C(M):C("history_title")}render(){let C=this._localize;if(!this.hass)return d``;let H=this._title();if(this._savings&&!V1(this.hass).length)return d`<ha-card>
        <div class="header"><h2 class="title">${H}</h2></div>
        <p class="summary">${C("not_set_up")}</p>
      </ha-card>`;let V=this._savings?V1(this.hass).some(A=>A.calculating):this._info?.calculating===!0,M=V?void 0:this._loaded,e=this._chart?.data.filter(A=>A.type==="bar"&&A.id!=="export").flatMap(A=>A.data.map(n=>n.value??null))??[],a=e.reduce((A,n)=>A+(n??0),0),t=e.some(A=>A),i=M?.plan.unit??"money",o=!this._savings&&this._info!==void 0&&!this._info?.areas.some(A=>A.id===this._config.area&&A.statistics[this._config.figure??"energy"]?.length);return d`<ha-card>
      <div class="header">
        <h2 class="title">${H}</h2>
        ${M&&!M.failed&&t?d`<span class="chip">${this._fmt.value(a,i)}</span>`:M?d`<span class="chip">${H1(M.plan.range,this._language)}</span>`:l}
      </div>
      ${V?d`<p class="summary">${C("calculating_all")}</p>`:o?d`<p class="summary">${C(this._info===null?"editor_not_loaded":"figures_unavailable")}</p>`:this._body(M,t)}
    </ha-card>`}_body(C,H){let V=this._localize;return this._hasChart?C?.failed?d`<p class="summary">${V("history_failed")}</p>`:d`<div class="chart">
      ${this._chart?d`<ha-chart-base
            .hass=${this.hass}
            .data=${this._chart.data}
            .options=${this._chart.options}
            .height=${V5}
          ></ha-chart-base>`:l}
      ${C&&!H?d`<div class="empty">
            ${V(this._savings?"history_empty":"history_empty_figure")}
          </div>`:l}
    </div>`:d`<p class="summary">${V("history_no_chart")}</p>`}};o1.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0},_selected:{state:!0},_loaded:{state:!0},_hasChart:{state:!0}},o1.styles=[R,O`
      .chart {
        position: relative;
        min-height: ${y1(V5)};
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
    `];var Q5=["energy","statistic","entity"],j=r=>({select:{mode:"dropdown",options:r}}),A1=class extends Z{constructor(){super(...arguments);this._label=C=>{let H=this._localize,V=`editor_${C.name}`;return H(V)};this._helper=C=>C.name==="period"?this._localize("editor_period_hint"):void 0}setConfig(C){this._config=C}get _localize(){return g(this.hass?.locale?.language??this.hass?.language??"en")}get _tiles(){return this._config?.tiles??[]}willUpdate(){this.hass&&this._info===void 0&&(this._info=null,this.hass.callWS({type:`${f}/figures`}).then(C=>{this._info=C}).catch(()=>{}))}_changed(C){this._config=C,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:C},bubbles:!0,composed:!0}))}_setTiles(C){this._config&&this._changed({...this._config,tiles:C})}_cardSchema(){let C=this._localize;return[{name:"title",selector:{text:{}}},{name:"period",selector:j(D.map(H=>({value:H,label:C(`period.${H}`)})))},{name:"columns",selector:j([{value:"auto",label:C("editor_columns_auto")},...["1","2","3","4"].map(H=>({value:H,label:H}))])}]}_cardChanged(C){if(!this._config)return;let{title:H,period:V,columns:M}=C.detail.value,e={...this._config};typeof H=="string"&&H?e.title=H:delete e.title,e.period=V??"energy_date",M&&M!=="auto"?e.columns=Number(M):delete e.columns,this._changed(e)}_describe(C){let H=this._localize,V=y(C);if(V==="statistic")return{title:C.name??C.statistic??"",detail:`${C.statistic??""} \xB7 ${H(`value.${C.value??"change"}`)}`};if(V==="entity")return{title:C.name??C.entity??"",detail:`${C.entity??""} \xB7 ${H("value_current")}`};let M=this._info?.areas.find(a=>a.id===C.area),e=M&&C.figure?k(H,C.figure,M):C.figure??"";return{title:C.name??e,detail:`${M?.name??C.area??""} \xB7 ${H("source.energy")}`}}_tileSchema(C){let H=this._localize,V=y(C),M=[{name:"source",selector:j(Q5.map(e=>({value:e,label:H(`source.${e}`)})))}];if(V==="energy"){let e=this._info?.areas??[],a=e.find(t=>t.id===C.area);M.push({name:"area",selector:j(e.map(t=>({value:t.id,label:t.name})))},{name:"figure",selector:j(a?T(a).map(t=>({value:t,label:k(H,t,a)})):[])})}else V==="statistic"?(M.push({name:"statistic",selector:{statistic:{}}},{name:"value",selector:j(I2.map(e=>({value:e,label:H(`value.${e}`)})))}),(C.value??"change")==="mean"&&M.push({name:"secondary",selector:j(["none","range"].map(e=>({value:e,label:H(`secondary.${e}`)})))})):M.push({name:"entity",selector:{entity:{}}});return M.push({name:"name",selector:{text:{}}}),M}_tileData(C){return{source:y(C),...C,value:C.value??"change",secondary:C.secondary??"none"}}_tileChanged(C,H){let V=H.detail.value,M=this._tiles[C],e=V.source??y(M),a=typeof V.name=="string"&&V.name?V.name:void 0,t;if(e!==y(M))t=e==="energy"?{area:"household",figure:"cost"}:e==="statistic"?{statistic:"",value:"change"}:{entity:""};else if(e==="energy"){let i=V.area??M.area,o=this._info?.areas.find(v=>v.id===i),A=o?T(o):[],n=A.includes(V.figure)?V.figure:A[0];t={area:i,figure:n}}else e==="statistic"?(t={statistic:V.statistic??"",value:V.value??"change"},t.value==="mean"&&V.secondary==="range"&&(t.secondary="range")):t={entity:V.entity??""};a&&(t.name=a),this._setTiles(this._tiles.map((i,o)=>o===C?t:i))}_add(){let C=[...this._tiles,{area:"household",figure:"cost"}];this._setTiles(C),this._editing=C.length-1}_remove(C){this._setTiles(this._tiles.filter((H,V)=>V!==C))}render(){if(!this.hass||!this._config)return d``;let C=this._localize;if(this._editing!==void 0&&this._tiles[this._editing]){let H=this._editing,V=this._tiles[H];return d`<div class="editor">
        <div class="heading">
          <ha-icon-button-arrow-prev
            .label=${C("editor_back")}
            @click=${()=>this._editing=void 0}
          ></ha-icon-button-arrow-prev>
          <span>${C("editor_edit_tile",{number:String(H+1)})}</span>
        </div>
        ${y(V)==="energy"&&this._info===null?d`<p class="hint">${C("editor_not_loaded")}</p>`:l}
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
        ${this._tiles.map((H,V)=>{let{title:M,detail:e}=this._describe(H);return d`<div class="tile">
            <div class="text">
              <div class="name">${M||"\u2013"}</div>
              <div class="detail">${e}</div>
            </div>
            <ha-icon-button
              .path=${X2}
              .label=${C("editor_edit")}
              @click=${()=>this._editing=V}
            ></ha-icon-button>
            <ha-icon-button
              .path=${J2}
              .label=${C("editor_remove")}
              @click=${()=>this._remove(V)}
            ></ha-icon-button>
          </div>`})}
      </div>
      <ha-button @click=${this._add}>${C("editor_add_tile")}</ha-button>
    </div>`}};A1.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0},_editing:{state:!0}},A1.styles=O`
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
  `;var o2="savings",Z1=r=>({select:{mode:"dropdown",options:r}}),c1=class extends Z{constructor(){super(...arguments);this._label=C=>this._localize(`editor_${C.name}`)}setConfig(C){this._config=C}get _localize(){return g(this.hass?.locale?.language??this.hass?.language??"en")}willUpdate(){this.hass&&this._info===void 0&&(this._info=null,this.hass.callWS({type:`${f}/figures`}).then(C=>{this._info=C}).catch(()=>{}))}_schema(){let C=this._localize,H=this._config??{type:""},V=this._info?.areas??[],M=[{name:"title",selector:{text:{}}},{name:"period",selector:Z1([...D,"all"].map(a=>({value:a,label:C(`period.${a}`)})))},{name:"area",selector:Z1([{value:o2,label:C("editor_savings")},...V.filter(a=>s1(a).length).map(a=>({value:a.id,label:a.name}))])}],e=V.find(a=>a.id===H.area);if(e){let a=s1(e),t=H.figure&&a.includes(H.figure)?H.figure:a[0];M.push({name:"figure",selector:Z1(a.map(i=>({value:i,label:k(C,i,e)})))},{name:"stack",selector:Z1(r1(e,t).map(i=>({value:i,label:C(`stack.${i}`)})))},{name:"line",selector:Z1([{value:"none",label:C("editor_line_none")},...a2(e).map(i=>({value:i,label:k(C,i,e)}))])},{name:"lines",selector:{statistic:{multiple:!0}}})}return M}_data(){let C=this._config??{type:""},H=this._info?.areas.find(e=>e.id===C.area),V=H?s1(H):[],M=C.figure&&V.includes(C.figure)?C.figure:V[0];return{title:C.title??"",period:C.period??"energy_date",area:C.area??o2,figure:M,stack:C.stack??(H&&M?r1(H,M)[0]:void 0),line:C.line??"none",lines:(C.lines??[]).map(e=>e.statistic)}}_changed(C){if(!this._config)return;let H=C.detail.value,V={type:this._config.type};typeof H.title=="string"&&H.title&&(V.title=H.title),V.period=H.period??"energy_date";let M=H.area;if(M&&M!==o2){V.area=M;let e=this._info?.areas.find(p=>p.id===M),a=e?s1(e):[],t=a.includes(H.figure)?H.figure:a[0];t&&(V.figure=t),(e&&t?r1(e,t):[]).includes(H.stack)&&(V.stack=H.stack),(e?a2(e):[]).includes(H.line)&&(V.line=H.line);let A=new Map((this._config.lines??[]).map(p=>[p.statistic,p])),v=(Array.isArray(H.lines)?H.lines:[]).filter(Boolean).map(p=>A.get(p)??{statistic:p});v.length&&(V.lines=v)}this._config=V,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:V},bubbles:!0,composed:!0}))}render(){return!this.hass||!this._config?d``:d`<ha-form
      .hass=${this.hass}
      .data=${this._data()}
      .schema=${this._schema()}
      .computeLabel=${this._label}
      @value-changed=${this._changed}
    ></ha-form>`}};c1.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0}};var L5="https://github.com/ignazhabibi/ha-electricity-lens",A2=(r,L)=>{if(!customElements.get(r))try{customElements.define(r,L)}catch{customElements.define(r,class extends L{})}};function M5(r,L=[]){let C=()=>{r.forEach(({tag:a,card:t,editor:i})=>{A2(a,t),i&&A2(i.tag,i.element)}),L.forEach(({type:a,element:t})=>A2(`ll-strategy-dashboard-${a}`,t))};C();let H=window.customElements,V=Date.now(),M=window.setInterval(()=>{let a=window.customElements!==H;a&&C(),(a||Date.now()-V>6e4)&&window.clearInterval(M)},100),e=window;e.customStrategies=e.customStrategies??[];for(let{type:a,name:t,description:i}of L)e.customStrategies.some(o=>o.type===a)||e.customStrategies.push({type:a,strategyType:"dashboard",name:t,description:i,documentationURL:L5});e.customCards=e.customCards??[];for(let{tag:a,name:t,description:i}of r)e.customCards.some(o=>o.type===a)||e.customCards.push({type:a,name:t,description:i,preview:!0,documentationURL:L5})}var u=(r,L={})=>({type:r.startsWith("electricity-lens")?`custom:${r}`:r,...L}),e5={grid_options:{columns:"full"}},I1={grid_options:{columns:6}},S1={grid_options:{columns:12}},r5=(r,L,C={},H)=>u("electricity-lens-figures-card",{tiles:[{area:r,figure:L,...H?{name:H}:{}}],...I1,...C}),h1=(r,L,C,H,V=!0)=>({title:r,path:L,type:"sections",max_columns:3,sections:[{type:"grid",column_span:2,cards:[...V?[u("energy-date-selection",e5)]:[],...C.map(M=>({...e5,...M}))]}],sidebar:{sections:[{type:"grid",cards:H}]}});function K5(r){let L=Object.values(r.entities??{}).filter(M=>M.platform===f),C=(M,e)=>L.find(a=>a.device_id===M&&a.translation_key===e)?.entity_id,H=["pv","heat_pump","wallbox"],V=L.filter(M=>M.translation_key==="saving").map(M=>({category:r.states[M.entity_id]?.attributes.category,saving:M.entity_id,payback:C(M.device_id,"payback"),perYear:C(M.device_id,"saving_per_year")})).filter(M=>H.includes(M.category)).sort((M,e)=>H.indexOf(M.category)-H.indexOf(e.category));return{balance:L.find(M=>M.translation_key==="balance")?.entity_id,categories:V}}function j5(r,L,C={categories:[]}){let H=(s,h,x={})=>r5(s,h,x,L(`figure.${h}`)),V=(s,h,x,E={})=>r5(s,h,E,L(x)),M=(s,h,x={})=>u(s,{title:L(h),...x}),e=s=>r.areas.find(h=>h.id===s),a=r.levels.cheap_until!==null,t=e("solar"),i=e("heat_pump"),o=e("wallbox"),A=r.areas.some(s=>s.kind==="device"),n=!!(t?.statistics.saving?.length||i||o||C.categories.length),v=C.balance&&C.categories.length?C.balance:void 0,p={period:"today"},m=(s,h={})=>u("electricity-lens-history-card",{area:s,figure:"energy",stack:"source",line:"price",...h}),c=s=>u("electricity-lens-breakdown-card",{area:s,by:"source",...S1}),S=[];return S.push(h1(L("strategy.overview"),"now",[u("energy-distribution"),m("household",p)],[V("household","cost","strategy.cost_today",p),V("household","solar_share","strategy.self_sufficiency_today",p),t?V("solar","energy","strategy.solar_today",p):V("household","energy","strategy.consumption_today",p),...v?[u("electricity-lens-figures-card",{tiles:[{entity:v,name:L("strategy.balance"),secondary:"none"}],...I1})]:[],...t?.forecast?[H("solar","forecast_today"),H("solar","forecast_tomorrow")]:[]],!1)),S.push(h1(L("strategy.electricity"),"household",[M("energy-usage-graph","strategy.usage_graph"),...t?[M("energy-solar-graph","strategy.solar_graph")]:[],...A?[M("energy-devices-detail-graph","strategy.devices_graph")]:[]],[M("energy-distribution","strategy.distribution",S1),c("household"),...t?[u("energy-self-sufficiency-gauge",I1),u("energy-solar-consumed-gauge",I1)]:[]])),S.push(h1(L("strategy.costs"),"costs",[u("electricity-lens-history-card",{area:"household",figure:"cost",stack:"consumer",line:"price"}),u("electricity-lens-breakdown-card",{area:"household",by:"consumer",figure:"cost",display:"bars",color_by_source:!0}),...n?[u("electricity-lens-history-card"),u("electricity-lens-balance-card")]:[]],[V("grid","cost","strategy.bill",S1),H("household","price"),H("household",a?"cheap_share":"solar_share"),...C.categories.map(s=>u("electricity-lens-figures-card",{title:L(`category.${s.category}`),columns:3,tiles:[{entity:s.saving,name:L("figure.saving"),secondary:"none"},{entity:s.payback,name:L("strategy.paid_back"),secondary:"none"},{entity:s.perYear,name:L("strategy.per_year"),secondary:"none"}].filter(h=>h.entity),...S1}))])),i&&S.push(h1(L("strategy.heating"),"heating",[u("electricity-lens-history-card",{area:"heat_pump",figure:"heat",line:"scop"}),m("heat_pump"),u("electricity-lens-history-card",{area:"heat_pump",figure:"cost",line:"price"}),u("electricity-lens-history-card",{area:"heat_pump",figure:"saving"})],[H("heat_pump","scop"),H("heat_pump","heat_price"),H("heat_pump","price"),H("heat_pump","saving"),c("heat_pump"),...(i.statistics.energy?.length??0)>1?[u("electricity-lens-breakdown-card",{title:L("breakdown_energy_by_consumer"),statistics:(i.statistics.energy??[]).map(s=>({statistic:s})),display:"bars",...S1})]:[]])),o&&S.push(h1(L("strategy.charging"),"charging",[m("wallbox"),u("electricity-lens-history-card",{area:"wallbox",figure:"distance",line:"cost_per_100km"}),u("electricity-lens-history-card",{area:"wallbox",figure:"cost",line:"price"}),u("electricity-lens-history-card",{area:"wallbox",figure:"saving"})],[H("wallbox","cost_per_100km"),H("wallbox","distance"),H("wallbox","price"),H("wallbox","saving"),c("wallbox")])),S}var g1=class extends HTMLElement{static async generate(L,C){let H=g(C.locale?.language??C.language??"en"),V;try{V=await C.callWS({type:`${f}/figures`})}catch{return{title:H("strategy.title"),views:[{title:H("strategy.title"),cards:[{type:"markdown",content:H("strategy.not_loaded")}]}]}}return{title:H("strategy.title"),views:j5(V,H,K5(C))}}};g1.noEditor=!0;M5([{tag:"electricity-lens-balance-card",card:a1,name:"Electricity Lens balance",description:"What your PV plant, heat pump, and electric car have saved, and when they pay off."},{tag:"electricity-lens-history-card",card:o1,name:"Electricity Lens history",description:"Savings, consumption, or costs per period as bars, stacked by source or consumer, with lines. Follows the energy date selection.",editor:{tag:"electricity-lens-history-card-editor",element:c1}},{tag:"electricity-lens-figures-card",card:e1,name:"Electricity Lens key figures",description:"Tiles with key figures for a period: costs, solar share, cheap grid power, savings, or any statistic or entity.",editor:{tag:"electricity-lens-figures-card-editor",element:A1}},{tag:"electricity-lens-breakdown-card",card:t1,name:"Electricity Lens breakdown",description:"Shares for a period as a ring or bars: the electricity mix, consumption or costs by consumer, or any statistics.",editor:{tag:"electricity-lens-breakdown-card-editor",element:u1}}],[{type:"electricity-lens",element:g1,name:"Electricity Lens",description:"A finished electricity dashboard with costs, electricity mix, solar, heat pump, car, and the balance."}]);
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
