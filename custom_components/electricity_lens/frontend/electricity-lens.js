var _1=globalThis,k1=_1.ShadowRoot&&(_1.ShadyCSS===void 0||_1.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,G1=Symbol(),p2=new WeakMap,m1=class{constructor(L,C,H){if(this._$cssResult$=!0,H!==G1)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=L,this.t=C}get styleSheet(){let L=this.o,C=this.t;if(k1&&L===void 0){let H=C!==void 0&&C.length===1;H&&(L=p2.get(C)),L===void 0&&((this.o=L=new CSSStyleSheet).replaceSync(this.cssText),H&&p2.set(C,L))}return L}toString(){return this.cssText}},b1=r=>new m1(typeof r=="string"?r:r+"",void 0,G1),O=(r,...L)=>{let C=r.length===1?r[0]:L.reduce((H,V,M)=>H+(e=>{if(e._$cssResult$===!0)return e.cssText;if(typeof e=="number")return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(V)+r[M+1],r[0]);return new m1(C,r,G1)},m2=(r,L)=>{if(k1)r.adoptedStyleSheets=L.map(C=>C instanceof CSSStyleSheet?C:C.styleSheet);else for(let C of L){let H=document.createElement("style"),V=_1.litNonce;V!==void 0&&H.setAttribute("nonce",V),H.textContent=C.cssText,r.appendChild(H)}},Q1=k1?r=>r:r=>r instanceof CSSStyleSheet?(L=>{let C="";for(let H of L.cssRules)C+=H.cssText;return b1(C)})(r):r;var{is:a5,defineProperty:o5,getOwnPropertyDescriptor:A5,getOwnPropertyNames:n5,getOwnPropertySymbols:d5,getPrototypeOf:p5}=Object,w1=globalThis,l2=w1.trustedTypes,m5=l2?l2.emptyScript:"",l5=w1.reactiveElementPolyfillSupport,l1=(r,L)=>r,K1={toAttribute(r,L){switch(L){case Boolean:r=r?m5:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,L){let C=r;switch(L){case Boolean:C=r!==null;break;case Number:C=r===null?null:Number(r);break;case Object:case Array:try{C=JSON.parse(r)}catch{C=null}}return C}},s2=(r,L)=>!a5(r,L),v2={attribute:!0,type:String,converter:K1,reflect:!1,useDefault:!1,hasChanged:s2};Symbol.metadata??=Symbol("metadata"),w1.litPropertyMetadata??=new WeakMap;var B=class extends HTMLElement{static addInitializer(L){this._$Ei(),(this.l??=[]).push(L)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(L,C=v2){if(C.state&&(C.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(L)&&((C=Object.create(C)).wrapped=!0),this.elementProperties.set(L,C),!C.noAccessor){let H=Symbol(),V=this.getPropertyDescriptor(L,H,C);V!==void 0&&o5(this.prototype,L,V)}}static getPropertyDescriptor(L,C,H){let{get:V,set:M}=A5(this.prototype,L)??{get(){return this[C]},set(e){this[C]=e}};return{get:V,set(e){let i=V?.call(this);M?.call(this,e),this.requestUpdate(L,i,H)},configurable:!0,enumerable:!0}}static getPropertyOptions(L){return this.elementProperties.get(L)??v2}static _$Ei(){if(this.hasOwnProperty(l1("elementProperties")))return;let L=p5(this);L.finalize(),L.l!==void 0&&(this.l=[...L.l]),this.elementProperties=new Map(L.elementProperties)}static finalize(){if(this.hasOwnProperty(l1("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(l1("properties"))){let C=this.properties,H=[...n5(C),...d5(C)];for(let V of H)this.createProperty(V,C[V])}let L=this[Symbol.metadata];if(L!==null){let C=litPropertyMetadata.get(L);if(C!==void 0)for(let[H,V]of C)this.elementProperties.set(H,V)}this._$Eh=new Map;for(let[C,H]of this.elementProperties){let V=this._$Eu(C,H);V!==void 0&&this._$Eh.set(V,C)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(L){let C=[];if(Array.isArray(L)){let H=new Set(L.flat(1/0).reverse());for(let V of H)C.unshift(Q1(V))}else L!==void 0&&C.push(Q1(L));return C}static _$Eu(L,C){let H=C.attribute;return H===!1?void 0:typeof H=="string"?H:typeof L=="string"?L.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(L=>this.enableUpdating=L),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(L=>L(this))}addController(L){(this._$EO??=new Set).add(L),this.renderRoot!==void 0&&this.isConnected&&L.hostConnected?.()}removeController(L){this._$EO?.delete(L)}_$E_(){let L=new Map,C=this.constructor.elementProperties;for(let H of C.keys())this.hasOwnProperty(H)&&(L.set(H,this[H]),delete this[H]);L.size>0&&(this._$Ep=L)}createRenderRoot(){let L=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return m2(L,this.constructor.elementStyles),L}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(L=>L.hostConnected?.())}enableUpdating(L){}disconnectedCallback(){this._$EO?.forEach(L=>L.hostDisconnected?.())}attributeChangedCallback(L,C,H){this._$AK(L,H)}_$ET(L,C){let H=this.constructor.elementProperties.get(L),V=this.constructor._$Eu(L,H);if(V!==void 0&&H.reflect===!0){let M=(H.converter?.toAttribute!==void 0?H.converter:K1).toAttribute(C,H.type);this._$Em=L,M==null?this.removeAttribute(V):this.setAttribute(V,M),this._$Em=null}}_$AK(L,C){let H=this.constructor,V=H._$Eh.get(L);if(V!==void 0&&this._$Em!==V){let M=H.getPropertyOptions(V),e=typeof M.converter=="function"?{fromAttribute:M.converter}:M.converter?.fromAttribute!==void 0?M.converter:K1;this._$Em=V;let i=e.fromAttribute(C,M.type);this[V]=i??this._$Ej?.get(V)??i,this._$Em=null}}requestUpdate(L,C,H,V=!1,M){if(L!==void 0){let e=this.constructor;if(V===!1&&(M=this[L]),H??=e.getPropertyOptions(L),!((H.hasChanged??s2)(M,C)||H.useDefault&&H.reflect&&M===this._$Ej?.get(L)&&!this.hasAttribute(e._$Eu(L,H))))return;this.C(L,C,H)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(L,C,{useDefault:H,reflect:V,wrapped:M},e){H&&!(this._$Ej??=new Map).has(L)&&(this._$Ej.set(L,e??C??this[L]),M!==!0||e!==void 0)||(this._$AL.has(L)||(this.hasUpdated||H||(C=void 0),this._$AL.set(L,C)),V===!0&&this._$Em!==L&&(this._$Eq??=new Set).add(L))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(C){Promise.reject(C)}let L=this.scheduleUpdate();return L!=null&&await L,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[V,M]of this._$Ep)this[V]=M;this._$Ep=void 0}let H=this.constructor.elementProperties;if(H.size>0)for(let[V,M]of H){let{wrapped:e}=M,i=this[V];e!==!0||this._$AL.has(V)||i===void 0||this.C(V,void 0,M,i)}}let L=!1,C=this._$AL;try{L=this.shouldUpdate(C),L?(this.willUpdate(C),this._$EO?.forEach(H=>H.hostUpdate?.()),this.update(C)):this._$EM()}catch(H){throw L=!1,this._$EM(),H}L&&this._$AE(C)}willUpdate(L){}_$AE(L){this._$EO?.forEach(C=>C.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(L)),this.updated(L)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(L){return!0}update(L){this._$Eq&&=this._$Eq.forEach(C=>this._$ET(C,this[C])),this._$EM()}updated(L){}firstUpdated(L){}};B.elementStyles=[],B.shadowRootOptions={mode:"open"},B[l1("elementProperties")]=new Map,B[l1("finalized")]=new Map,l5?.({ReactiveElement:B}),(w1.reactiveElementVersions??=[]).push("2.1.2");var q1=globalThis,x2=r=>r,B1=q1.trustedTypes,u2=B1?B1.createPolicy("lit-html",{createHTML:r=>r}):void 0,Y1="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,J1="?"+P,v5=`<${J1}>`,Q=document,s1=()=>Q.createComment(""),x1=r=>r===null||typeof r!="object"&&typeof r!="function",X1=Array.isArray,f2=r=>X1(r)||typeof r?.[Symbol.iterator]=="function",j1=`[ 	
\f\r]`,v1=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Z2=/-->/g,c2=/>/g,U=RegExp(`>|${j1}(?:([^\\s"'>=/]+)(${j1}*=${j1}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),S2=/'/g,h2=/"/g,O2=/^(?:script|style|textarea|title)$/i,C2=r=>(L,...C)=>({_$litType$:r,strings:L,values:C}),d=C2(1),H3=C2(2),V3=C2(3),K=Symbol.for("lit-noChange"),v=Symbol.for("lit-nothing"),g2=new WeakMap,G=Q.createTreeWalker(Q,129);function y2(r,L){if(!X1(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return u2!==void 0?u2.createHTML(L):L}var _2=(r,L)=>{let C=r.length-1,H=[],V,M=L===2?"<svg>":L===3?"<math>":"",e=v1;for(let i=0;i<C;i++){let a=r[i],t,o,A=-1,n=0;for(;n<a.length&&(e.lastIndex=n,o=e.exec(a),o!==null);)n=e.lastIndex,e===v1?o[1]==="!--"?e=Z2:o[1]!==void 0?e=c2:o[2]!==void 0?(O2.test(o[2])&&(V=RegExp("</"+o[2],"g")),e=U):o[3]!==void 0&&(e=U):e===U?o[0]===">"?(e=V??v1,A=-1):o[1]===void 0?A=-2:(A=e.lastIndex-o[2].length,t=o[1],e=o[3]===void 0?U:o[3]==='"'?h2:S2):e===h2||e===S2?e=U:e===Z2||e===c2?e=v1:(e=U,V=void 0);let m=e===U&&r[i+1].startsWith("/>")?" ":"";M+=e===v1?a+v5:A>=0?(H.push(t),a.slice(0,A)+Y1+a.slice(A)+P+m):a+P+(A===-2?i:m)}return[y2(r,M+(r[C]||"<?>")+(L===2?"</svg>":L===3?"</math>":"")),H]},u1=class r{constructor({strings:L,_$litType$:C},H){let V;this.parts=[];let M=0,e=0,i=L.length-1,a=this.parts,[t,o]=_2(L,C);if(this.el=r.createElement(t,H),G.currentNode=this.el.content,C===2||C===3){let A=this.el.content.firstChild;A.replaceWith(...A.childNodes)}for(;(V=G.nextNode())!==null&&a.length<i;){if(V.nodeType===1){if(V.hasAttributes())for(let A of V.getAttributeNames())if(A.endsWith(Y1)){let n=o[e++],m=V.getAttribute(A).split(P),p=/([.?@])?(.*)/.exec(n);a.push({type:1,index:M,name:p[2],strings:m,ctor:p[1]==="."?T1:p[1]==="?"?F1:p[1]==="@"?R1:q}),V.removeAttribute(A)}else A.startsWith(P)&&(a.push({type:6,index:M}),V.removeAttribute(A));if(O2.test(V.tagName)){let A=V.textContent.split(P),n=A.length-1;if(n>0){V.textContent=B1?B1.emptyScript:"";for(let m=0;m<n;m++)V.append(A[m],s1()),G.nextNode(),a.push({type:2,index:++M});V.append(A[n],s1())}}}else if(V.nodeType===8)if(V.data===J1)a.push({type:2,index:M});else{let A=-1;for(;(A=V.data.indexOf(P,A+1))!==-1;)a.push({type:7,index:M}),A+=P.length-1}M++}}static createElement(L,C){let H=Q.createElement("template");return H.innerHTML=L,H}};function j(r,L,C=r,H){if(L===K)return L;let V=H!==void 0?C._$Co?.[H]:C._$Cl,M=x1(L)?void 0:L._$litDirective$;return V?.constructor!==M&&(V?._$AO?.(!1),M===void 0?V=void 0:(V=new M(r),V._$AT(r,C,H)),H!==void 0?(C._$Co??=[])[H]=V:C._$Cl=V),V!==void 0&&(L=j(r,V._$AS(r,L.values),V,H)),L}var P1=class{constructor(L,C){this._$AV=[],this._$AN=void 0,this._$AD=L,this._$AM=C}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(L){let{el:{content:C},parts:H}=this._$AD,V=(L?.creationScope??Q).importNode(C,!0);G.currentNode=V;let M=G.nextNode(),e=0,i=0,a=H[0];for(;a!==void 0;){if(e===a.index){let t;a.type===2?t=new H1(M,M.nextSibling,this,L):a.type===1?t=new a.ctor(M,a.name,a.strings,this,L):a.type===6&&(t=new D1(M,this,L)),this._$AV.push(t),a=H[++i]}e!==a?.index&&(M=G.nextNode(),e++)}return G.currentNode=Q,V}p(L){let C=0;for(let H of this._$AV)H!==void 0&&(H.strings!==void 0?(H._$AI(L,H,C),C+=H.strings.length-2):H._$AI(L[C])),C++}},H1=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(L,C,H,V){this.type=2,this._$AH=v,this._$AN=void 0,this._$AA=L,this._$AB=C,this._$AM=H,this.options=V,this._$Cv=V?.isConnected??!0}get parentNode(){let L=this._$AA.parentNode,C=this._$AM;return C!==void 0&&L?.nodeType===11&&(L=C.parentNode),L}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(L,C=this){L=j(this,L,C),x1(L)?L===v||L==null||L===""?(this._$AH!==v&&this._$AR(),this._$AH=v):L!==this._$AH&&L!==K&&this._(L):L._$litType$!==void 0?this.$(L):L.nodeType!==void 0?this.T(L):f2(L)?this.k(L):this._(L)}O(L){return this._$AA.parentNode.insertBefore(L,this._$AB)}T(L){this._$AH!==L&&(this._$AR(),this._$AH=this.O(L))}_(L){this._$AH!==v&&x1(this._$AH)?this._$AA.nextSibling.data=L:this.T(Q.createTextNode(L)),this._$AH=L}$(L){let{values:C,_$litType$:H}=L,V=typeof H=="number"?this._$AC(L):(H.el===void 0&&(H.el=u1.createElement(y2(H.h,H.h[0]),this.options)),H);if(this._$AH?._$AD===V)this._$AH.p(C);else{let M=new P1(V,this),e=M.u(this.options);M.p(C),this.T(e),this._$AH=M}}_$AC(L){let C=g2.get(L.strings);return C===void 0&&g2.set(L.strings,C=new u1(L)),C}k(L){X1(this._$AH)||(this._$AH=[],this._$AR());let C=this._$AH,H,V=0;for(let M of L)V===C.length?C.push(H=new r(this.O(s1()),this.O(s1()),this,this.options)):H=C[V],H._$AI(M),V++;V<C.length&&(this._$AR(H&&H._$AB.nextSibling,V),C.length=V)}_$AR(L=this._$AA.nextSibling,C){for(this._$AP?.(!1,!0,C);L!==this._$AB;){let H=x2(L).nextSibling;x2(L).remove(),L=H}}setConnected(L){this._$AM===void 0&&(this._$Cv=L,this._$AP?.(L))}},q=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(L,C,H,V,M){this.type=1,this._$AH=v,this._$AN=void 0,this.element=L,this.name=C,this._$AM=V,this.options=M,H.length>2||H[0]!==""||H[1]!==""?(this._$AH=Array(H.length-1).fill(new String),this.strings=H):this._$AH=v}_$AI(L,C=this,H,V){let M=this.strings,e=!1;if(M===void 0)L=j(this,L,C,0),e=!x1(L)||L!==this._$AH&&L!==K,e&&(this._$AH=L);else{let i=L,a,t;for(L=M[0],a=0;a<M.length-1;a++)t=j(this,i[H+a],C,a),t===K&&(t=this._$AH[a]),e||=!x1(t)||t!==this._$AH[a],t===v?L=v:L!==v&&(L+=(t??"")+M[a+1]),this._$AH[a]=t}e&&!V&&this.j(L)}j(L){L===v?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,L??"")}},T1=class extends q{constructor(){super(...arguments),this.type=3}j(L){this.element[this.name]=L===v?void 0:L}},F1=class extends q{constructor(){super(...arguments),this.type=4}j(L){this.element.toggleAttribute(this.name,!!L&&L!==v)}},R1=class extends q{constructor(L,C,H,V,M){super(L,C,H,V,M),this.type=5}_$AI(L,C=this){if((L=j(this,L,C,0)??v)===K)return;let H=this._$AH,V=L===v&&H!==v||L.capture!==H.capture||L.once!==H.once||L.passive!==H.passive,M=L!==v&&(H===v||V);V&&this.element.removeEventListener(this.name,this,H),M&&this.element.addEventListener(this.name,this,L),this._$AH=L}handleEvent(L){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,L):this._$AH.handleEvent(L)}},D1=class{constructor(L,C,H){this.element=L,this.type=6,this._$AN=void 0,this._$AM=C,this.options=H}get _$AU(){return this._$AM._$AU}_$AI(L){j(this,L)}},k2={M:Y1,P,A:J1,C:1,L:_2,R:P1,D:f2,V:j,I:H1,H:q,N:F1,U:R1,B:T1,F:D1},s5=q1.litHtmlPolyfillSupport;s5?.(u1,H1),(q1.litHtmlVersions??=[]).push("3.3.3");var b2=(r,L,C)=>{let H=C?.renderBefore??L,V=H._$litPart$;if(V===void 0){let M=C?.renderBefore??null;H._$litPart$=V=new H1(L.insertBefore(s1(),M),M,void 0,C??{})}return V._$AI(r),V};var H2=globalThis,Z=class extends B{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let L=super.createRenderRoot();return this.renderOptions.renderBefore??=L.firstChild,L}update(L){let C=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(L),this._$Do=b2(C,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return K}};Z._$litElement$=!0,Z.finalized=!0,H2.litElementHydrateSupport?.({LitElement:Z});var x5=H2.litElementPolyfillSupport;x5?.({LitElement:Z});(H2.litElementVersions??=[]).push("4.2.2");var w2=r=>(...L)=>({_$litDirective$:r,values:L}),E1=class{constructor(L){}get _$AU(){return this._$AM._$AU}_$AT(L,C,H){this._$Ct=L,this._$AM=C,this._$Ci=H}_$AS(L,C){return this.update(L,C)}update(L,C){return this.render(...C)}};var{I:v3}=k2;var u5={},B2=(r,L=u5)=>r._$AH=L;var P2=w2(class extends E1{constructor(){super(...arguments),this.key=v}render(r,L){return this.key=r,L}update(r,[L,C]){return L!==this.key&&(B2(r),this.key=L),C}});var T2;function $1(){if(customElements.get("ha-chart-base"))return Promise.resolve(!0);let r=window.loadCardHelpers;return r?(T2??=(async()=>{try{(await r()).createCardElement({type:"statistics-graph",entities:[]})}catch{}let L=new Promise(C=>setTimeout(()=>C(!1),1e4));return Promise.race([customElements.whenDefined("ha-chart-base").then(()=>!0),L])})(),T2):Promise.resolve(!1)}var F2=r=>Math.round(r*255).toString(16).padStart(2,"0");function V2(r,L){let C=r.trim();if(/^#[0-9a-f]{6}$/i.test(C))return C+F2(L);if(/^#[0-9a-f]{3}$/i.test(C))return`#${[...C.slice(1)].map(V=>V+V).join("")}${F2(L)}`;let H=C.match(/^rgba?\(([^)]+)\)/i);if(H){let[V,M,e]=H[1].split(/[ ,/]+/).filter(Boolean);return`rgba(${V}, ${M}, ${e}, ${L})`}return C}var Z1=r=>r.replace(/[&<>"']/g,L=>`&#${L.charCodeAt(0)};`),L2=r=>`<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${r}"></span>`;function R2(r){let L=r.lines??[],C=r.series.map((o,A)=>({id:o.id,type:"bar",name:o.name,stack:"savings",cursor:"default",barMaxWidth:50,color:V2(o.color,.5),itemStyle:{borderColor:o.color},data:o.values.map((n,m)=>{let p=r.series.slice(A+1).every(s=>Math.sign(s.values[m]??0)!==Math.sign(n??0));return{value:n,itemStyle:n?p?{borderRadius:n>0?[4,4,0,0]:[0,0,4,4]}:void 0:{borderWidth:0}}})})),H=L.map(o=>({id:o.id,type:"line",name:o.name,yAxisIndex:1,color:o.color,symbol:"none",showSymbol:!1,step:o.step?"middle":!1,lineStyle:{width:1.5,type:o.dash??"dashed",color:o.color},z:1,connectNulls:!0,data:o.values})),V=[...C,...H],M=new Map(L.map(o=>[o.name,o.format])),e=o=>{let A=Array.isArray(o)?o:[o],n=document.createElement("div");if(!A.length)return n;let m=l=>M.has(l.seriesName??""),p=A.filter(l=>l.value&&!m(l)),s=A.filter(l=>m(l)&&l.value!==null&&l.value!==void 0),x=p.map(l=>`${L2(String(l.color??""))}${Z1(l.seriesName??"")}: ${r.format(l.value??0)}`),u=s.map(l=>`${L2(String(l.color??""))}${Z1(l.seriesName??"")}: ${M.get(l.seriesName??"")?.(l.value??0)??""}`),f=new Set(r.series.filter(l=>l.inTotal===!1).map(l=>l.name)),b=p.filter(l=>!f.has(l.seriesName??"")).reduce((l,S)=>l+(S.value??0),0);return n.innerHTML=`<b>${Z1(r.labels[A[0].dataIndex]?.tooltip??"")}</b>`+(x.length?`<br>${x.join("<br>")}`:"")+(p.length>1?`<br><b>${Z1(r.total)}: ${r.format(b)}</b>`:"")+(u.length?`<br>${u.join("<br>")}`:""),n},i={type:"value",name:r.unit,nameGap:2,nameTextStyle:{align:"left"},axisLabel:{formatter:r.tick},splitLine:{show:!0}},a={type:"value",name:r.lineUnit??"",nameGap:2,nameTextStyle:{align:"right"},axisLabel:{formatter:r.lineTick??r.tick},splitLine:{show:!1}},t={xAxis:{type:"category",data:r.labels.map(o=>o.axis),axisTick:{show:!1}},yAxis:L.length?[i,a]:i,grid:{top:15,bottom:0,left:1,right:1,containLabel:!0},legend:{show:!0,type:"custom",data:[...r.series,...L].map(o=>({id:o.id,name:o.name}))},tooltip:{trigger:"axis",axisPointer:{type:"shadow"},formatter:e}};return{data:V,options:t}}function M2(r){let L=r.reduce((C,H)=>C+Math.max(0,H),0);return r.map(C=>L>0?Math.max(0,C)/L*100:0)}function D2(r){let L=r.items.map(t=>r.hidden.has(t.id)?0:t.value),C=M2(L),H=L.reduce((t,o)=>t+Math.max(0,o),0),V=[],M=-Math.PI/2;for(let t of C){let o=M+t/100*2*Math.PI;V.push([M,o]),M=o}let e=t=>{let o=Math.min(90,t.getWidth()/2-8,t.getHeight()/2-8);return{cx:t.getWidth()/2,cy:t.getHeight()/2,r:o,r0:o*40/70}},i=r.items.map((t,o)=>({id:t.id,type:"custom",name:t.name,coordinateSystem:"none",cursor:"default",color:V2(t.color,.5),data:[[L[o],V[o][0],V[o][1],C[o]]],renderItem:(A,n)=>{let m=n.value(1),p=n.value(2);if(!(p-m>0))return null;let s=e(n),x=[{type:"sector",shape:{...s,startAngle:m,endAngle:p,cornerRadius:4},style:{fill:V2(t.color,.5),stroke:t.color,lineWidth:1}}];if(p-m>=15*Math.PI/180){let u=(m+p)/2,f=Math.cos(u)>=0,b=[s.cx+Math.cos(u)*s.r,s.cy+Math.sin(u)*s.r],l=[s.cx+Math.cos(u)*(s.r+10),s.cy+Math.sin(u)*(s.r+10)],S=[l[0]+(f?10:-10),l[1]];x.push({type:"polyline",silent:!0,shape:{points:[b,l,S]},style:{stroke:t.color,fill:"none"}},{type:"text",silent:!0,x:S[0]+(f?4:-4),y:S[1],style:{text:`${t.name}
${r.percent(n.value(3))}`,fill:r.labelColor,fontSize:12,lineHeight:16,align:f?"left":"right",verticalAlign:"middle"}})}return{type:"group",children:x}}}));return i.push({id:"total",type:"custom",coordinateSystem:"none",silent:!0,tooltip:{show:!1},data:[[H]],renderItem:(t,o)=>{let A=e(o);return{type:"text",x:A.cx,y:A.cy,style:{text:`${r.total}
${r.format(o.value(0))}`,fill:r.centerColor,fontSize:14,lineHeight:24,fontWeight:"bold",align:"center",verticalAlign:"middle"}}}}),{data:i,options:{xAxis:{show:!1},yAxis:{show:!1},legend:{show:!1},tooltip:{show:!0,trigger:"item",formatter:t=>{let o=r.items.findIndex(m=>m.id===t.seriesId);if(o<0)return"";let A=r.items[o],n=document.createElement("div");return n.innerHTML=`<b>${Z1(A.name)}</b><br>${L2(A.color)}${r.format(t.value?.[0]??L[o])} (${r.percent(t.value?.[3]??C[o])})`,n}}}}}var Y={solar:"var(--energy-solar-color, #ff9800)",grid:"var(--energy-grid-consumption-color, #488fc2)",cheap:"color-mix(in srgb, var(--energy-grid-consumption-color, #488fc2) 55%, #fff)",expensive:"color-mix(in srgb, var(--energy-grid-consumption-color, #488fc2) 70%, #000)",export:"var(--energy-grid-return-color, #8353d1)",heat:"var(--graph-color-30, var(--color-30, #bf3947))",car:"var(--energy-non-fossil-color, #0f9d58)"},E2=["#4269d0","#f4bd4a","#ff725c","#6cc5b0","#a463f2","#ff8ab7","#9c6b4e","#97bbf5","#01ab63","#094bad","#c99000","#d84f3e"];function Z5(r){let L=r.trim(),C=/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(L)?.[1];if(C){let V=C.length===3?[...C].map(M=>M+M).join(""):C;return[0,2,4].map(M=>parseInt(V.slice(M,M+2),16))}let H=/^rgba?\(([^)]+)\)/i.exec(L)?.[1];if(H){let[V,M,e]=H.split(/[ ,/]+/).filter(Boolean).map(Number);if([V,M,e].every(Number.isFinite))return[V,M,e]}}var c5=([r,L,C])=>`#${[r,L,C].map(H=>Math.round(Math.min(Math.max(H,0),255)).toString(16).padStart(2,"0")).join("")}`;function $2(r,L,C){let H=Z5(r);if(!H)return r;let V=L==="white"?255:0;return c5(H.map(M=>M*C+V*(1-C)))}function _(r){let L=getComputedStyle(r),C=(M,e)=>L.getPropertyValue(M).trim()||e,H=C("--energy-grid-consumption-color","#488fc2"),V=Array.from({length:54},(M,e)=>{let i=e+1;return L.getPropertyValue(`--graph-color-${i}`).trim()||L.getPropertyValue(`--color-${i}`).trim()||E2[e%E2.length]});return{solar:C("--energy-solar-color","#ff9800"),grid:H,cheap:$2(H,"white",.55),expensive:$2(H,"black",.7),export:C("--energy-grid-return-color","#8353d1"),heat:L.getPropertyValue("--graph-color-30").trim()||C("--color-30","#bf3947"),car:C("--energy-non-fossil-color","#0f9d58"),other:L.getPropertyValue("--history-unknown-color").trim()||C("--disabled-color","#bdbdbd"),line:C("--secondary-text-color","#727272"),consumers:V}}function D(r,L){let C=new Map,H=new Map,V=0;for(let M of r.areas)if(M.kind==="other")C.set(M.id,L.other);else if(M.kind==="device"){let e=L.consumers[V++%L.consumers.length];C.set(M.id,e);let i=M.statistics.energy?.[0];i&&H.set(i,e)}for(let M of r.areas)if(M.kind==="category")if(M.id==="heat_pump")C.set(M.id,L.heat);else{let i=(M.statistics.energy??[]).map(t=>H.get(t)).filter(Boolean),a=M.id==="wallbox"?L.car:L.grid;C.set(M.id,i[i.length-1]??a)}return C}var S5=r=>!!r&&typeof r.subscribe=="function";function h5(r){let L=location.pathname.split("/")[1]??"",C=r;for(let H of[`_energy_${L}`,"_energy"])if(S5(C[H]))return C[H]}var g5=()=>new Date().setHours(24,0,0,0)-1;function V1(r,L){let C,H,V=0,M=()=>{let e=h5(r);if(e){C=e.subscribe(i=>L({start:new Date(i.start).getTime(),end:i.end?new Date(i.end).getTime():g5()}));return}V+=1,V===2&&L(null),V<20&&(H=window.setTimeout(M,500))};return M(),()=>{window.clearTimeout(H),C?.()}}function N2(r){let L=/^([-−+]?[\d.,\u00a0\u202f ]*\d)[\u00a0\u202f ](.+)$/.exec(r);return L?[L[1],L[2]]:[r,""]}function L1(r,L){let C=(M,e)=>{let i=Math.abs(M),a=e??(i<10?2:i<100?1:0);return new Intl.NumberFormat(r,{maximumFractionDigits:a,minimumFractionDigits:e??0}).format(M)};return{number:C,value:(M,e)=>{switch(e){case"energy":return`${C(M,Math.abs(M)<100?1:0)} kWh`;case"money":{let i=Math.abs(M)<100;return new Intl.NumberFormat(r,{style:"currency",currency:L,maximumFractionDigits:i?2:0,minimumFractionDigits:i?2:0}).format(M)}case"price":return L==="EUR"?`${C(M*100,1)} ct/kWh`:`${new Intl.NumberFormat(r,{style:"currency",currency:L,maximumFractionDigits:3}).format(M)}/kWh`;case"percent":return new Intl.NumberFormat(r,{style:"percent",maximumFractionDigits:0}).format(M/100);case"number":return C(M,Math.abs(M)<10?2:Math.abs(M)<100?1:0);case"distance":return`${C(M,Math.abs(M)<100?1:0)} km`;case"per_100km":return`${new Intl.NumberFormat(r,{style:"currency",currency:L,maximumFractionDigits:2,minimumFractionDigits:2}).format(M)}/100 km`}},currencySymbol:()=>new Intl.NumberFormat(r,{style:"currency",currency:L}).formatToParts(0).find(M=>M.type==="currency")?.value??""}}var e2={energy:["energy"],cost:["cost"],grid_price:["import_cost","energy"],price:["cost","energy","solar"],solar_share:["solar","energy"],cheap_share:["cheap","solar","energy"],expensive_share:["expensive","solar","energy"],cheap_saving:["cheap_saving"],self_consumption:["self_used","energy"],export:["export"],saving:["saving"],heat:["heat"],alternative_cost:["alternative_cost"],scop:["heat","energy"],heat_price:["cost","heat"],distance:["distance"],cost_per_100km:["cost","distance"],forecast_today:[],forecast_tomorrow:[]},f5={energy:["solar","export"],cost:["energy","solar","import_cost","feed_in"],saving:["alternative_cost","cost"],heat:["energy"],distance:["energy"]},O5=Object.keys(e2),I1=r=>r==="forecast_today"||r==="forecast_tomorrow";function E(r){return O5.filter(L=>I1(L)?r.forecast===!0:e2[L].every(C=>r.statistics[C]?.length))}function I2(r,L){return[...e2[L],...f5[L]??[]].flatMap(C=>r.statistics[C]??[])}var N1=(r,L)=>L>0?r/L*100:null;function M1(r,L,C,H){let V=C("energy"),M=C("solar"),e=t=>({value:t,unit:"energy"}),i=t=>({value:t,unit:"money"}),a=t=>({value:t,unit:"number"});switch(r){case"energy":{if(V!==null&&M!==null&&V>0){let o=N1(M,V)??0;return{value:V,unit:"energy",line:{key:"line_solar_part",values:{percent:{value:o,unit:"percent"}}}}}let t=C("export");return L.kind==="grid"&&t!==null?{value:V,unit:"energy",line:{key:"line_exported",values:{energy:e(t)}}}:{value:V,unit:"energy"}}case"cost":{let t=C("cost");if(t!==null&&V&&M!==null)return{value:t,unit:"money",line:{key:"line_average_price",values:{price:{value:t/V,unit:"price"}}}};let o=C("import_cost"),A=C("feed_in");if(t!==null&&o!==null&&A!==null){let n=t-o+A;return{value:t,unit:"money",line:{key:Math.abs(n)<.005?"line_bill_no_charge":"line_bill",values:{imported:i(o),feed_in:i(A),charge:i(n)}}}}return t!==null&&V!==null&&L.kind==="grid"?{value:t,unit:"money",line:{key:"line_for_import",values:{energy:e(V)}}}:{value:t,unit:"money"}}case"grid_price":{let t=C("import_cost");return t===null||!V?{value:null,unit:"price"}:{value:t/V,unit:"price",line:{key:"line_cost_for",values:{cost:i(t),energy:e(V)}}}}case"cheap_saving":return{value:C("cheap_saving"),unit:"money",line:{key:"line_against_normal",values:{}}};case"price":{let t=C("cost");return t===null||!V?{value:null,unit:"price"}:{value:t/V,unit:"price",line:{key:"line_cost_for",values:{cost:{value:t,unit:"money"},energy:e(V)}}}}case"solar_share":{if(V===null||M===null)return{value:null,unit:"percent"};let t=N1(M,V);return{value:t,unit:"percent",bar:t??0,line:{key:"line_from_solar",values:{part:a(M),whole:e(V)}}}}case"cheap_share":case"expensive_share":{let t=C(r==="cheap_share"?"cheap":"expensive");if(V===null||M===null||t===null)return{value:null,unit:"percent"};let o=Math.max(V-M,0),A=N1(t,o);return{value:A,unit:"percent",bar:A??0,line:{key:"line_of_grid",values:{part:a(t),whole:e(o)}}}}case"self_consumption":{let t=C("self_used");if(V===null||t===null)return{value:null,unit:"percent"};let o=N1(t,V);return{value:o,unit:"percent",bar:o??0,line:{key:"line_self_used",values:{part:a(t),whole:e(V)}}}}case"export":return{value:C("export"),unit:"energy"};case"saving":{let t=C("saving"),o=C("alternative_cost"),A=C("cost");if(t===null||o===null||A===null)return{value:t,unit:"money"};let n=o-A;return{value:n,unit:"money",line:{key:"line_saving_split",values:{solar:i(n-t),saving:i(t)}}}}case"heat":{let t=C("heat");return t===null||V===null?{value:t,unit:"energy"}:{value:t,unit:"energy",line:{key:"line_from_electricity",values:{energy:e(V)}}}}case"alternative_cost":return{value:C("alternative_cost"),unit:"money"};case"scop":{let t=C("heat");return t===null||!V?{value:null,unit:"number"}:{value:t/V,unit:"number",line:{key:"line_heat_from",values:{heat:a(t),energy:e(V)}}}}case"heat_price":{let t=C("heat"),o=C("cost");return t===null||o===null||!t?{value:null,unit:"price"}:{value:o/t,unit:"price",line:{key:"line_cost_for_heat",values:{cost:{value:o,unit:"money"},heat:e(t)}}}}case"distance":{let t=C("distance");return t===null||V===null?{value:t,unit:"distance"}:{value:t,unit:"distance",line:{key:"line_charged",values:{energy:e(V)}}}}case"cost_per_100km":{let t=C("distance"),o=C("cost");return t===null||o===null||!t?{value:null,unit:"per_100km"}:{value:o/t*100,unit:"per_100km",line:{key:"line_cost_for",values:{cost:{value:o,unit:"money"},energy:{value:t,unit:"distance"}}}}}case"forecast_today":case"forecast_tomorrow":return{value:H,unit:"energy"}}}var W2=["change","mean","min","max"],y=r=>r.statistic!==void 0?"statistic":r.entity!==void 0?"entity":"energy";function $({start:r,end:L}){let C=L-r;return C<=2*864e5+36e5?"hour":C<=95*864e5?"day":C<=3*366*864e5?"month":"year"}var e1=r=>r==="year"?"month":r,y5=(r,L)=>{let C=new Date(r);return L==="hour"?C.setMinutes(0,0,0):(C.setHours(0,0,0,0),L==="day"||(C.setDate(1),L==="month")?C.getTime():C.setMonth(0))},_5=(r,L)=>{let C=new Date(r);return L==="hour"?C.setHours(C.getHours()+1):L==="day"?C.setDate(C.getDate()+1):L==="month"?C.setMonth(C.getMonth()+1):C.setFullYear(C.getFullYear()+1),C.getTime()};function z2({start:r,end:L},C){let H=[];for(let V=y5(r,C);V<=L&&H.length<400;V=_5(V,C))H.push(V);return H}function U2(r,L=new Date){let C=r.filter(V=>V!==null).map(V=>V.getFullYear()),H=Math.min(L.getFullYear(),...C);return{start:new Date(H,0,1).getTime(),end:new Date(L.getFullYear()+1,0,1).getTime()-1}}function r2(r,L,C){let H=L.map(()=>null),V=C==="hour"?0:12*36e5;for(let M of r??[]){if(M.change===null||M.change===void 0)continue;let e=(typeof M.start=="number"?M.start:Date.parse(M.start))+V,i=-1;for(let a=0;a<L.length&&L[a]<=e;a+=1)i=a;i<0||(H[i]=(H[i]??0)+M.change)}return H}function T(r,L=new Date){let C=(e,i)=>({start:e.getTime(),end:i.getTime()-1}),H=L.getFullYear(),V=L.getMonth(),M=L.getDate();switch(r){case"today":return C(new Date(H,V,M),new Date(H,V,M+1));case"yesterday":return C(new Date(H,V,M-1),new Date(H,V,M));case"this_month":return C(new Date(H,V,1),new Date(H,V+1,1));case"last_month":return C(new Date(H,V-1,1),new Date(H,V,1));case"this_year":return C(new Date(H,0,1),new Date(H+1,0,1));case"last_year":return C(new Date(H-1,0,1),new Date(H,0,1))}}function r1({start:r,end:L},C){let H=new Date(r),V=new Date(L),M=(a,t)=>new Intl.DateTimeFormat(C,a).format(t);if(H.toDateString()===V.toDateString())return M({day:"numeric",month:"short"},H);let i=H.getDate()===1&&new Date(L+1).getDate()===1;return i&&H.getMonth()===0&&V.getMonth()===11&&H.getFullYear()===V.getFullYear()?M({year:"numeric"},H):i&&H.getMonth()===V.getMonth()&&H.getFullYear()===V.getFullYear()?M({month:"short",year:"numeric"},H):new Intl.DateTimeFormat(C,{day:"numeric",month:"short"}).formatRange(H,V)}function G2(r,L,C){let H=L.map(()=>0),V=L.map(()=>0),M=C==="hour"?0:12*36e5;for(let e of r??[]){if(e.mean===null||e.mean===void 0)continue;let i=(typeof e.start=="number"?e.start:Date.parse(e.start))+M,a=-1;for(let t=0;t<L.length&&L[t]<=i;t+=1)a=t;a<0||(H[a]+=e.mean,V[a]+=1)}return H.map((e,i)=>V[i]?e/V[i]:null)}var g="electricity_lens",t2=["pv","heat_pump","wallbox"];var W1=r=>{if(r==null||r==="")return null;let L=Number(r);return Number.isFinite(L)?L:null},Q2=r=>typeof r=="string"&&r?new Date(r):null;function J(r){let L=Object.values(r.entities??{}).filter(M=>M.platform===g),C=(M,e)=>L.find(i=>i.device_id===M&&i.translation_key===e),H=M=>M?W1(r.states[M]?.state):null,V=[];for(let M of L){if(M.translation_key!=="saving")continue;let e=r.states[M.entity_id];if(!e||e.state==="unavailable")continue;let i=e.attributes,a=i.category;t2.includes(a)&&V.push({category:a,savingStatistic:typeof i.statistic_id=="string"?i.statistic_id:`${g}:${a}_saving`,calculating:i.calculating===!0,saving:W1(e.state),investment:W1(i.investment),payback:H(C(M.device_id,"payback")?.entity_id),perYear:H(C(M.device_id,"saving_per_year")?.entity_id),countingSince:Q2(i.counting_since),yearlyFrom:Q2(i.yearly_from),price:W1(i.price),heating:i.heating==="gas"||i.heating==="oil"?i.heating:null,heatEstimated:i.heat_estimated===!0})}return V.sort((M,e)=>t2.indexOf(M.category)-t2.indexOf(e.category))}function K2(r,L=new Date){let C=r.some(o=>o.calculating),H=r.reduce((o,A)=>o+(A.saving??0),0),V=r.reduce((o,A)=>o+(A.investment??0),0),M=!C&&r.length>0,e=M?H-V:null,i=r.every(o=>o.perYear!==null),a=M&&i?r.reduce((o,A)=>o+(A.perYear??0),0):null,t=null;return e!==null&&a!==null&&(e>=0?t=L:a>0&&(t=new Date(L.getTime()+-e/a*12*26298e5))),{saved:H,invested:V,balance:e,perYear:a,inThePlusFrom:t,calculating:C}}function j2(r){let{investment:L,saving:C,perYear:H}=r;return L===null||L<=0||C===null||H===null||H<=0?null:Math.max(0,(L-C)/H)}function q2(r){let{investment:L,saving:C,perYear:H}=r;return L===null||L<=0||C===null||H===null||C<L?null:H/L*100}var k5=300*1e3,w=5*1e3,X,i2,N=()=>X?.value;function F(){if(!X)return!0;let r=X.value&&!X.value.calculating?k5:w;return Date.now()-X.at>r}function I(r){return F()?(i2??=r.callWS({type:`${g}/figures`}).then(L=>L).catch(()=>null).then(L=>(X={at:Date.now(),value:L},i2=void 0,L)),i2):Promise.resolve(X?.value??null)}var a2={title:"Balance","category.pv":"PV plant","category.heat_pump":"Heat pump","category.wallbox":"Electric car",show_yearly:"Show yearly figures",show_total:"Show totals",not_set_up:"Set up the Electricity Lens integration to see what your PV plant, heat pump, and electric car have saved.",calculating_all:"The past is being computed \u2026",calculating:"Being computed \u2026",saved_invested:"{saved} saved, {invested} invested",saved_only:"{saved} saved",of_investment:"{percent} of {investment}",paid_off:"paid off",since:"since {date}",heat_estimated:"heat partly estimated",instead_heat_pump:"no extra cost entered",instead_wallbox:"no extra cost entered",instead_pv:"no purchase cost entered",in_the_plus_from:"In the plus from about {date}",in_the_plus:"In the plus",yearly_after_twelve:"Yearly figures after twelve months of data.",yearly_from:"Yearly figure from {date}",pays_off_in:"pays off in about {years}",years_one:"1 year",years_other:"{count} years",under_one_year:"less than a year",return_per_year:"paid off, {percent} return per year",instead_of_gas:"instead of gas",instead_of_oil:"instead of oil",instead_of_fuel:"instead of fuel",per_year:"{amount}/year",gas:"Gas {price}/kWh",oil:"Oil {price}/l",fuel:"Fuel {price}/l",prices_link:"Change the prices",progress:"{name}: {percent} of the investment saved",history_title:"Savings over time",history_savings_note:"Compared with {list}",history_cost_note:"Solar power counts at {rate}, without the standing charge",history_cost_note_no_solar:"Without the standing charge",history_saving_note:"Including its solar power, which the balance counts for the PV plant",compare_pv:"grid power",compare_gas:"gas heating",compare_oil:"oil heating",compare_fuel:"a combustion car",history_total:"Total",history_no_chart:"The chart is only shown in Home Assistant.",history_failed:"The statistics could not be loaded.",history_empty:"No savings in this period.",figures_title:"Key figures",figures_failed:"The figures could not be loaded.",figures_unavailable:"not available","figure.energy":"Consumption","figure.energy.grid":"Grid import","figure.energy.solar":"Solar production","figure.cost":"Costs","figure.cost.grid":"Grid costs","figure.grid_price":"Average grid price","figure.price":"Average price","figure.solar_share":"Solar share","figure.solar_share.household":"Self-sufficiency","figure.cheap_share":"Cheap grid power","figure.expensive_share":"Expensive grid power","figure.cheap_saving":"Saving from cheap hours","figure.self_consumption":"Self-consumption","figure.export":"Feed-in","figure.saving":"Saving","figure.forecast_today":"Forecast today","figure.forecast_tomorrow":"Forecast tomorrow","figure.heat":"Heat","figure.alternative_cost":"Comparison costs","figure.scop":"Seasonal COP","figure.heat_price":"Heat price","figure.distance":"Distance","figure.cost_per_100km":"Costs per 100 km",line_saving_split:"of which {solar} by solar \xB7 {saving} in the balance",line_bill:"Grid {imported} \u2212 feed-in {feed_in} + standing charge {charge}",line_bill_no_charge:"Grid {imported} \u2212 feed-in {feed_in}",line_against_normal:"compared with the normal price",line_from_electricity:"from {energy} electricity",line_heat_from:"{heat} heat from {energy}",line_cost_for_heat:"{cost} for {heat} heat",line_charged:"with {energy} charged",line_solar_part:"{percent} of it solar power",line_exported:"{energy} fed in",line_average_price:"average {price}",line_for_import:"for {energy} imported",line_cost_for:"{cost} for {energy}",line_from_solar:"{part} of {whole} from solar",line_of_grid:"{part} of {whole} grid power",line_self_used:"{part} of {whole} used in the house","value.change":"total in the period","value.mean":"average","value.min":"minimum","value.max":"maximum",value_range:"from {min} to {max}",value_current:"current value","period.energy_date":"Follow the date selection","period.today":"Today","period.yesterday":"Yesterday","period.this_month":"This month","period.last_month":"Last month","period.this_year":"This year","period.last_year":"Last year","period.all":"All years",editor_title:"Title (optional)",editor_period:"Period",editor_period_hint:"Without a date selection on the dashboard: this month.",editor_columns:"Columns",editor_columns_auto:"Auto",editor_tiles:"Tiles",editor_add_tile:"Add tile",editor_edit_tile:"Edit tile {number}",editor_back:"Back",editor_edit:"Edit",editor_remove:"Remove",editor_source:"Source","source.energy":"Energy data","source.statistic":"Statistic","source.entity":"Entity",editor_area:"Area",editor_figure:"Figure",editor_statistic:"Statistic",editor_value:"Value",editor_secondary:"Line below","secondary.none":"Default","secondary.range":"Range of the period",editor_entity:"Entity",editor_name:"Name (optional)",editor_not_loaded:"Energy data need the Electricity Lens integration.","source.solar":"Solar power","source.grid":"Grid power","source.normal":"Normal grid power","source.cheap":"Cheap grid power","source.expensive":"Expensive grid power","source.export":"Feed-in","stack.source":"By source","stack.consumer":"By consumer","stack.none":"Not stacked",editor_savings:"Savings of all categories",editor_stack:"Stacking",editor_line:"Line",editor_lines:"Further lines from statistics",editor_line_none:"None",history_empty_figure:"No data in this period.",breakdown_mix:"Electricity mix",breakdown_cost_by_consumer:"Costs by consumer",breakdown_energy_by_consumer:"Consumption by consumer",breakdown_total:"Total","mix.solar":"Solar","mix.grid":"Grid","mix.normal":"Grid normal","mix.cheap":"Grid cheap","mix.expensive":"Grid expensive",editor_by:"Split","by.source":"By source","by.consumer":"By consumer",editor_display:"Display","display.ring":"Ring","display.bars":"Bars",editor_color_by_source:"Color the bars by source",editor_breakdown_source:"Source","breakdown_source.energy":"Energy data","breakdown_source.statistics":"Statistics",editor_statistics:"Statistics","figure_choice.energy":"Consumption","figure_choice.cost":"Costs","strategy.title":"Electricity","strategy.overview":"Now","strategy.electricity":"Household","strategy.cost_today":"Costs today","strategy.self_sufficiency_today":"Self-sufficiency today","strategy.solar_today":"Solar today","strategy.consumption_today":"Consumption today","strategy.bill":"Electricity bill","strategy.cost_history":"Costs over time","strategy.cost_distribution":"Cost distribution","strategy.price_with_solar":"Average price incl. solar","strategy.costs":"Costs","strategy.heating":"Heating","strategy.charging":"Charging","strategy.balance":"Balance","strategy.usage_graph":"Electricity balance","strategy.solar_graph":"Solar","strategy.devices_graph":"Individual devices","strategy.distribution":"Electricity distribution","strategy.not_loaded":"Set up the Electricity Lens integration to see this dashboard."},b5={title:"Bilanz","category.pv":"PV-Anlage","category.heat_pump":"W\xE4rmepumpe","category.wallbox":"E-Auto",show_yearly:"Jahreswerte zeigen",show_total:"Gesamtwerte zeigen",not_set_up:"Richte die Integration Electricity Lens ein, um zu sehen, was PV-Anlage, W\xE4rmepumpe und E-Auto gespart haben.",calculating_all:"Die Vergangenheit wird nachgerechnet \u2026",calculating:"Wird berechnet \u2026",saved_invested:"{saved} gespart, {invested} investiert",saved_only:"{saved} gespart",of_investment:"{percent} von {investment}",paid_off:"amortisiert",since:"seit {date}",heat_estimated:"W\xE4rme teilweise gesch\xE4tzt",instead_heat_pump:"ohne Mehrkosten",instead_wallbox:"ohne Mehrkosten",instead_pv:"ohne Anschaffungskosten",in_the_plus_from:"Im Plus ab etwa {date}",in_the_plus:"Im Plus",yearly_after_twelve:"Jahreswerte gibt es nach zw\xF6lf Monaten Daten.",yearly_from:"Jahreswert ab {date}",pays_off_in:"amortisiert in etwa {years}",years_one:"1 Jahr",years_other:"{count} Jahren",under_one_year:"weniger als einem Jahr",return_per_year:"amortisiert, {percent} Rendite pro Jahr",instead_of_gas:"statt Gas",instead_of_oil:"statt \xD6l",instead_of_fuel:"statt Sprit",per_year:"{amount}/Jahr",gas:"Gas {price}/kWh",oil:"\xD6l {price}/l",fuel:"Sprit {price}/l",prices_link:"Preise \xE4ndern",progress:"{name}: {percent} der Investition gespart",history_title:"Ersparnisverlauf",history_savings_note:"Gegen\xFCber {list}",history_cost_note:"Solarstrom z\xE4hlt mit {rate}, ohne Grundpreis",history_cost_note_no_solar:"Ohne Grundpreis",history_saving_note:"Mit dem eigenen Solarstrom, den die Bilanz der PV-Anlage zurechnet",compare_pv:"Netzstrom",compare_gas:"Gasheizung",compare_oil:"\xD6lheizung",compare_fuel:"Verbrenner",history_total:"Summe",history_no_chart:"Das Diagramm erscheint nur in Home Assistant.",history_failed:"Die Statistik konnte nicht geladen werden.",history_empty:"Keine Ersparnis in diesem Zeitraum.",figures_title:"Kennzahlen",figures_failed:"Die Kennzahlen konnten nicht geladen werden.",figures_unavailable:"nicht verf\xFCgbar","figure.energy":"Verbrauch","figure.energy.grid":"Netzbezug","figure.energy.solar":"Solarertrag","figure.cost":"Kosten","figure.cost.grid":"Netzkosten","figure.grid_price":"\xF8 Netzpreis","figure.price":"\xF8 Strompreis","figure.solar_share":"Solaranteil","figure.solar_share.household":"Autarkie","figure.cheap_share":"G\xFCnstiger Netzstrom","figure.expensive_share":"Teurer Netzstrom","figure.cheap_saving":"Ersparnis durch g\xFCnstige Zeiten","figure.self_consumption":"Eigenverbrauch","figure.export":"Einspeisung","figure.saving":"Ersparnis","figure.forecast_today":"Prognose heute","figure.forecast_tomorrow":"Prognose morgen","figure.heat":"W\xE4rme","figure.alternative_cost":"Vergleichskosten","figure.scop":"JAZ","figure.heat_price":"W\xE4rmepreis","figure.distance":"Strecke","figure.cost_per_100km":"Kosten pro 100 km",line_saving_split:"davon {solar} durch PV \xB7 in der Bilanz {saving}",line_bill:"Netz {imported} \u2212 Einspeisung {feed_in} + Grundpreis {charge}",line_bill_no_charge:"Netz {imported} \u2212 Einspeisung {feed_in}",line_against_normal:"gegen\xFCber dem Normalpreis",line_from_electricity:"aus {energy} Strom",line_heat_from:"{heat} W\xE4rme aus {energy}",line_cost_for_heat:"{cost} f\xFCr {heat} W\xE4rme",line_charged:"mit {energy} geladen",line_solar_part:"davon {percent} Solarstrom",line_exported:"{energy} eingespeist",line_average_price:"\xF8 {price}",line_for_import:"f\xFCr {energy} Netzbezug",line_cost_for:"{cost} f\xFCr {energy}",line_from_solar:"{part} von {whole} aus Solar",line_of_grid:"{part} von {whole} Netzstrom",line_self_used:"{part} von {whole} im Haus genutzt","value.change":"Summe im Zeitraum","value.mean":"Mittelwert","value.min":"Minimum","value.max":"Maximum",value_range:"von {min} bis {max}",value_current:"aktueller Wert","period.energy_date":"Der Datumsauswahl folgen","period.today":"Heute","period.yesterday":"Gestern","period.this_month":"Dieser Monat","period.last_month":"Letzter Monat","period.this_year":"Dieses Jahr","period.last_year":"Letztes Jahr","period.all":"Alle Jahre",editor_title:"Titel (optional)",editor_period:"Zeitraum",editor_period_hint:"Ohne Datumsauswahl auf dem Dashboard: dieser Monat.",editor_columns:"Spalten",editor_columns_auto:"Auto",editor_tiles:"Kacheln",editor_add_tile:"Kachel hinzuf\xFCgen",editor_edit_tile:"Kachel {number} bearbeiten",editor_back:"Zur\xFCck",editor_edit:"Bearbeiten",editor_remove:"Entfernen",editor_source:"Quelle","source.energy":"Energiedaten","source.statistic":"Statistik","source.entity":"Entit\xE4t",editor_area:"Bereich",editor_figure:"Gr\xF6\xDFe",editor_statistic:"Statistik",editor_value:"Wert",editor_secondary:"Unterzeile","secondary.none":"Standard","secondary.range":"Spanne im Zeitraum",editor_entity:"Entit\xE4t",editor_name:"Name (optional)",editor_not_loaded:"Energiedaten brauchen die Integration Electricity Lens.","source.solar":"Solarstrom","source.grid":"Netzstrom","source.normal":"Normaler Netzstrom","source.cheap":"G\xFCnstiger Netzstrom","source.expensive":"Teurer Netzstrom","source.export":"Einspeisung","stack.source":"Nach Quelle","stack.consumer":"Nach Verbraucher","stack.none":"Nicht gestapelt",editor_savings:"Ersparnisse aller Kategorien",editor_stack:"Stapelung",editor_line:"Linie",editor_lines:"Weitere Linien aus Statistiken",editor_line_none:"Keine",history_empty_figure:"Keine Daten in diesem Zeitraum.",breakdown_mix:"Strommix",breakdown_cost_by_consumer:"Kosten nach Verbraucher",breakdown_energy_by_consumer:"Verbrauch nach Verbraucher",breakdown_total:"Gesamt","mix.solar":"PV","mix.grid":"Netz","mix.normal":"Netz normal","mix.cheap":"Netz g\xFCnstig","mix.expensive":"Netz teuer",editor_by:"Aufteilen","by.source":"Nach Quelle","by.consumer":"Nach Verbraucher",editor_display:"Darstellung","display.ring":"Ring","display.bars":"Balken",editor_color_by_source:"Balken nach Quelle f\xE4rben",editor_breakdown_source:"Quelle","breakdown_source.energy":"Energiedaten","breakdown_source.statistics":"Statistiken",editor_statistics:"Statistiken","figure_choice.energy":"Verbrauch","figure_choice.cost":"Kosten","strategy.title":"Strom","strategy.overview":"Jetzt","strategy.electricity":"Haushalt","strategy.cost_today":"Kosten heute","strategy.self_sufficiency_today":"Autarkie heute","strategy.solar_today":"Solar heute","strategy.consumption_today":"Verbrauch heute","strategy.bill":"Stromrechnung","strategy.cost_history":"Kostenverlauf","strategy.cost_distribution":"Kostenverteilung","strategy.price_with_solar":"\xF8 Preis inkl. Solar","strategy.costs":"Kosten","strategy.heating":"Heizen","strategy.charging":"Laden","strategy.balance":"Bilanz","strategy.usage_graph":"Strombilanz","strategy.solar_graph":"Solar","strategy.devices_graph":"Einzelger\xE4te","strategy.distribution":"Stromverteilung","strategy.not_loaded":"Richte die Integration Electricity Lens ein, um dieses Dashboard zu sehen."},w5={en:a2,de:b5},R=r=>r in a2;function h(r){let L=w5[r.split("-")[0]]??a2;return(C,H={})=>L[C].replace(/\{(\w+)\}/g,(V,M)=>H[M]??"")}var W=O`
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
`;var z=["energy_date","today","yesterday","this_month","last_month","this_year","last_year"];function k(r,L,C){let H=`figure.${L}.${C.kind}`,V=r(R(H)?H:`figure.${L}`);return["device","other","category"].includes(C.kind)?`${C.name} ${V}`:V}var B5=300*1e3,P5={solar_share:Y.solar,self_consumption:Y.solar,cheap_share:Y.cheap,expensive_share:Y.expensive},o2=r=>r.toDateString();function T5(r){let L=new Date,C=o2(L),H=o2(new Date(L.getFullYear(),L.getMonth(),L.getDate()+1)),V={today:null,tomorrow:null};for(let M of Object.values(r??{}))for(let[e,i]of Object.entries(M.wh_hours??{})){let a=o2(new Date(e));a===C&&(V.today=(V.today??0)+i/1e3),a===H&&(V.tomorrow=(V.tomorrow??0)+i/1e3)}return V}var t1=class extends Z{constructor(){super(...arguments);this._infoLoading=!1}static getStubConfig(){return{period:"energy_date",tiles:[{area:"household",figure:"cost"},{area:"household",figure:"solar_share"}]}}static getConfigElement(){return document.createElement("electricity-lens-figures-card-editor")}setConfig(C){if(!C||C.tiles!==void 0&&!Array.isArray(C.tiles))throw new Error("tiles must be a list");this._config=C}getCardSize(){return 1+2*Math.ceil((this._config?.tiles?.length??1)/2)}getGridOptions(){return{columns:12,min_columns:3}}connectedCallback(){super.connectedCallback(),this._follow()}disconnectedCallback(){super.disconnectedCallback(),this._unfollow?.(),this._unfollow=void 0,clearTimeout(this._retryTimer),this._retryTimer=void 0}get _localize(){return h(this.hass?.locale?.language??this.hass?.language??"en")}get _language(){return this.hass?.locale?.language??"en"}get _period(){return this._config?.period??"energy_date"}get _tiles(){return this._config?.tiles??[]}_follow(){this._period==="energy_date"&&(this._unfollow||!this.isConnected||!this.hass?.connection||(this._unfollow=V1(this.hass.connection,C=>{this._selected=C})))}_range(){let C=this._period;if(C!=="energy_date")return T(C);if(this._selected!==void 0)return this._selected??T("this_month")}_area(C){return this._info?.areas.find(H=>H.id===C)}_figure(C){let H=this._area(C.area);if(!(!H||!C.figure||!E(H).includes(C.figure)))return{area:H,figure:C.figure}}async _loadInfo(){!this.hass||this._infoLoading||(this._infoLoading=!0,this._info=await I(this.hass),this._infoLoading=!1,clearTimeout(this._retryTimer),this._retryTimer=void 0,this.isConnected&&(!this._info||this._info.calculating)&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),w)))}_request(){let C=this._range();if(!C)return;let H=this._tiles;if(H.some(t=>y(t)==="energy")&&!this._info)return;let M=new Set,e=new Set,i=!1;for(let t of H){let o=y(t);if(o==="statistic"&&t.statistic)M.add(t.statistic),e.add(t.statistic);else if(o==="energy"){let A=this._figure(t);if(!A)continue;I1(A.figure)&&(i=!0),this._info?.calculating||I2(A.area,A.figure).forEach(n=>M.add(n))}}let a=[...M].sort();return{key:JSON.stringify([a,C.start,C.end,i]),range:C,ids:a,statistics:[...e].sort(),forecast:i}}async _load(C){if(!this.hass)return;this._loading=C.key;let H=e1($(C.range)),V={key:C.key,at:Date.now(),range:C.range,period:H,rows:{},metadata:{},forecast:{today:null,tomorrow:null},failed:!1};try{let[M,e,i]=await Promise.all([C.ids.length?this.hass.callWS({type:"recorder/statistics_during_period",start_time:new Date(C.range.start).toISOString(),end_time:new Date(C.range.end+1).toISOString(),statistic_ids:C.ids,period:H,types:["change","mean","min","max"],units:{energy:"kWh"}}):Promise.resolve({}),C.statistics.length?this.hass.callWS({type:"recorder/get_statistics_metadata",statistic_ids:C.statistics}):Promise.resolve([]),C.forecast?this.hass.callWS({type:"energy/solar_forecast"}):Promise.resolve({})]);V.rows=M,V.metadata=Object.fromEntries(e.map(a=>[a.statistic_id,a])),V.forecast=T5(i)}catch{V.failed=!0}this._loading===C.key&&(this._loading=void 0,this._loaded=V)}willUpdate(C){if(!this.hass)return;(C.has("hass")||C.has("_config"))&&this._follow(),this._info===void 0&&(this._info=N()),F()&&!this._infoLoading?this._loadInfo():this.isConnected&&this._info?.calculating&&!this._retryTimer&&!this._infoLoading&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),w));let H=this._request(),V=!this._loaded||Date.now()-this._loaded.at>B5;H&&H.key!==this._loading&&(H.key!==this._loaded?.key||V&&!this._loading)&&this._load(H)}get _fmt(){return L1(this._language,this.hass?.config.currency??"EUR")}_number(C,H){return this._fmt.number(C,H)}_format(C,H){return this._fmt.value(C,H)}_rows(C){let H=this._loaded;if(!H)return[];let V=H.period==="hour"?0:12*36e5;return(H.rows[C]??[]).filter(M=>{let e=(typeof M.start=="number"?M.start:Date.parse(M.start))+V;return e>=H.range.start&&e<=H.range.end})}_sum(C){let H=0;for(let V of C??[])for(let M of this._rows(V))H+=M.change??0;return H}_energyTile(C){let H=this._localize,V=this._figure(C);if(!V){let A=`figure.${C.figure??""}`,n=C.name??(R(A)?H(A):C.figure??"");return this._info===void 0?this._tile(n,"\u2026"):this._tile(n,"\u2013",H("figures_unavailable"))}let{area:M,figure:e}=V,i=C.name??k(this._localize,e,M);if(this._info?.calculating&&!I1(e))return this._tile(i,"\u2026",H("calculating"));if(!this._loaded)return this._tile(i,"\u2026");if(this._loaded.failed)return this._tile(i,"\u2013");let a=e==="forecast_today"?this._loaded.forecast.today:e==="forecast_tomorrow"?this._loaded.forecast.tomorrow:null,t=M1(e,M,A=>M.statistics[A]?this._sum(M.statistics[A]):null,a),o=t.line?H(t.line.key,Object.fromEntries(Object.entries(t.line.values).map(([A,n])=>[A,this._format(n.value,n.unit)]))):void 0;return this._tile(i,t.value===null?"\u2013":this._format(t.value,t.unit),o,t.bar,P5[e])}_statisticTile(C){let H=this._localize,V=C.statistic??"",M=this._loaded?.metadata[V],e=C.name??M?.name??this.hass?.states[V]?.attributes.friendly_name??V,i=this._rows(V),a=M?.unit_class==="energy"?"kWh":M?.statistics_unit_of_measurement??"",t=p=>p===null?"\u2013":`${this._number(p)}${a?` ${a}`:""}`,o=p=>i.map(s=>s[p]).filter(s=>typeof s=="number"),A=C.value??"change",n=null;if(A==="change")n=i.length?i.reduce((p,s)=>p+(s.change??0),0):null;else if(A==="mean"){let p=o("mean");n=p.length?p.reduce((s,x)=>s+x,0)/p.length:null}else{let p=o(A);n=p.length?A==="min"?Math.min(...p):Math.max(...p):null}let m=H(`value.${A}`);if(C.secondary==="range"){let p=o("min"),s=o("max");p.length&&s.length&&(m=H("value_range",{min:t(Math.min(...p)),max:t(Math.max(...s))}))}return this._tile(e,this._loaded?.failed?"\u2013":t(n),C.secondary==="none"?void 0:m)}_entityTile(C){let H=this._localize,V=this.hass?.states[C.entity??""],M=C.name??V?.attributes.friendly_name??C.entity??"";if(!V)return this._tile(M,"\u2013",H("figures_unavailable"));let e=Number(V.state),i=this.hass?.config.currency??"",a=V.attributes.unit_of_measurement?.replace(i,i?this._fmt.currencySymbol():""),t=V.state!==""&&Number.isFinite(e),o=this._fmt.currencySymbol(),A=t?a&&a===o?this._format(e,"money"):`${this._number(e)}${a?` ${a}`:""}`:["unknown","unavailable",""].includes(V.state)?"\u2013":V.state;return this._tile(M,A,C.secondary==="none"?void 0:H("value_current"))}get _single(){return this._tiles.length===1&&!this._config?.title}_tile(C,H,V,M,e){let[i,a]=N2(H),t=d`<div class="value">
      <span class="number">${i}</span>${a?d`<span class="unit">${a}</span>`:v}
    </div>`;return this._single?d`<div class="header stat-header"><h2 class="title">${C}</h2></div>
        <div class="stat">${t}<div class="line">${V??""}</div></div>`:d`<div class="tile">
      <div class="label">${C}</div>
      ${t}
      ${M!==void 0?d`<div class="track" role="presentation">
            <div
              class="fill"
              style="width: ${Math.min(Math.max(M,0),100)}%; --c: ${e??"var(--primary-color)"}"
            ></div>
          </div>`:v}
      ${V?d`<div class="line">${V}</div>`:v}
    </div>`}render(){if(!this.hass||!this._config)return d``;let C=this._localize,H=this._range(),V=this._config.columns,M=!!V&&V>=1&&V<=4;return this._single?d`<ha-card lang=${this._language}>${this._renderTiles()}</ha-card>`:d`<ha-card lang=${this._language}>
      <div class="header">
        <h2 class="title">${this._config.title??""}</h2>
        ${H&&this._tiles.some(e=>y(e)!=="entity")?d`<span class="chip">${r1(H,this._language)}</span>`:v}
      </div>
      ${this._loaded?.failed?d`<p class="summary">${C("figures_failed")}</p>`:v}
      <div class="content">
      <div
        class="tiles ${M?"fixed":""}"
        style=${M?`--columns: ${V}`:""}
      >
        ${this._renderTiles()}
      </div>
      </div>
    </ha-card>`}_renderTiles(){return this._tiles.map(C=>{let H=y(C);return H==="statistic"?this._statisticTile(C):H==="entity"?this._entityTile(C):this._energyTile(C)})}};t1.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0},_selected:{state:!0},_loaded:{state:!0}},t1.styles=[W,O`
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
        /* HA's energy look: the color at half strength, framed by the full color. */
        background: color-mix(in srgb, var(--c) 50%, transparent);
        box-shadow: inset 0 0 0 1px var(--c);
      }
    `];var F5=["energy","cost","saving","export","heat","distance","alternative_cost"],R5=["price","solar_share","cheap_share","expensive_share","self_consumption","scop","heat_price","cost_per_100km"],c1=r=>F5.filter(L=>E(r).includes(L)),A2=r=>R5.filter(L=>E(r).includes(L));function i1(r,L){let C=[];return L==="energy"&&r.statistics.solar?.length&&C.push("source"),r.kind==="household"&&(L==="energy"||L==="cost")&&C.push("consumer"),r.kind==="category"&&(r.statistics.energy?.length??0)>1&&(L==="energy"||L==="cost"||(L==="heat"||L==="saving")&&(r.statistics.heat_meters?.length??0)>1)&&C.push("consumer"),C.push("none"),C}function Y2(r,L){let{alternative_cost:C,cost:H}=r.statistics;return L==="saving"&&C?.length&&H?.length?{plus:C,minus:H}:{plus:r.statistics[L]??[],minus:[]}}function z1(r,L,C,H,V){let M=a=>L.statistics[a]??[],e=D(r,V);if(H==="source"&&C==="energy"){let a=[{id:"solar",name:{key:"source.solar"},color:V.solar,plus:M("solar"),minus:[]}],t=["cheap","expensive"].filter(A=>M(A).length);M("cheap").length&&a.push({id:"cheap",name:{key:"source.cheap"},color:V.cheap,plus:M("cheap"),minus:[]}),a.push({id:"grid",name:{key:t.length?"source.normal":"source.grid"},color:V.grid,plus:M("energy"),minus:[...M("solar"),...t.flatMap(M)],floor:!0}),M("expensive").length&&a.push({id:"expensive",name:{key:"source.expensive"},color:V.expensive,plus:M("expensive"),minus:[]});let o=r.areas.find(A=>A.kind==="grid")?.statistics.export??[];return L.kind==="household"&&o.length&&a.push({id:"export",name:{key:"source.export"},color:V.export,plus:o,minus:[],negative:!0}),a}if(H==="consumer"){if(L.kind==="category"){let t=new Set(L.statistics.energy??[]);return r.areas.filter(o=>o.kind==="device"&&o.statistics.energy?.some(A=>t.has(A))).map(o=>({id:o.id,name:{text:o.name},color:e.get(o.id)??V.other,...Y2(o,C)}))}let a=new Set(r.areas.filter(t=>t.kind==="category").flatMap(t=>t.statistics.energy??[]));return r.areas.filter(t=>t.kind==="category"&&(t.statistics.energy?.length??0)>0||t.kind==="device"&&t.top_level!==!1&&!t.statistics.energy?.some(o=>a.has(o))||t.kind==="other").map(t=>({id:t.id,name:{text:t.name},color:e.get(t.id)??V.other,plus:t.statistics[C]??[],minus:[]}))}let i=C==="export"?V.export:L.kind==="solar"?V.solar:e.get(L.id)??(C==="heat"?V.heat:C==="distance"?V.car:V.grid);return[{id:C,name:{text:L.name},color:i,...Y2(L,C)}]}var D5=36e5;async function J2(r,L,C){if(!L.length)return{};let H=e1($(C)),V=await r.callWS({type:"recorder/statistics_during_period",start_time:new Date(C.start).toISOString(),end_time:new Date(C.end+1).toISOString(),statistic_ids:L,period:H,types:["change"],units:{energy:"kWh"}}),M=H==="hour"?0:12*D5,e={};for(let i of L){e[i]=0;for(let a of V[i]??[]){let t=(typeof a.start=="number"?a.start:Date.parse(a.start))+M;t>=C.start&&t<=C.end&&(e[i]+=a.change??0)}}return e}var E5=300*1e3,$5="240px",N5="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z",I5="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z",a1=class extends Z{constructor(){super(...arguments);this._config={type:""};this._infoLoading=!1;this._hidden=new Set}static getStubConfig(){return{area:"household",by:"source",figure:"energy",display:"ring"}}static getConfigElement(){return document.createElement("electricity-lens-breakdown-card-editor")}setConfig(C){if(C?.statistics!==void 0&&!Array.isArray(C.statistics))throw new Error("statistics must be a list");this._config=C??{type:""}}getCardSize(){return 4}getGridOptions(){return{columns:6,min_columns:4}}connectedCallback(){super.connectedCallback(),this._follow()}disconnectedCallback(){super.disconnectedCallback(),this._unfollow?.(),this._unfollow=void 0,clearTimeout(this._retryTimer),this._retryTimer=void 0}get _localize(){return h(this.hass?.locale?.language??this.hass?.language??"en")}get _language(){return this.hass?.locale?.language??"en"}get _fmt(){return L1(this._language,this.hass?.config.currency??"EUR")}get _byStatistics(){return!!this._config.statistics?.length}_follow(){(this._config.period??"energy_date")==="energy_date"&&(this._unfollow||!this.isConnected||!this.hass?.connection||(this._unfollow=V1(this.hass.connection,C=>{this._selected=C})))}_range(){let C=this._config.period??"energy_date";if(C!=="energy_date")return T(C);if(this._selected!==void 0)return this._selected??T("this_month")}_area(){return this._info?.areas.find(C=>C.id===(this._config.area??"household"))}get _by(){let C=this._area();return this._config.by==="consumer"&&(C?.kind==="household"||C?.kind==="category"&&(C.statistics.energy?.length??0)>1)?"consumer":C?.statistics.solar?.length?"source":"consumer"}get _figure(){return this._by==="consumer"&&this._config.figure==="cost"?"cost":"energy"}_series(){let C=this._info,H=this._area();return!C||!H?[]:z1(C,H,this._figure,this._by==="source"?"source":"consumer",_(this)).filter(V=>!V.negative)}_ids(){let C=new Set;if(this._byStatistics)this._config.statistics?.forEach(H=>C.add(H.statistic));else{for(let H of this._series())[...H.plus,...H.minus].forEach(V=>C.add(V));if(this._by==="consumer"&&this._info)for(let H of this._series()){let V=this._info.areas.find(M=>M.id===H.id);for(let M of["energy","solar","cheap","expensive","cost","solar_cost","cheap_cost","expensive_cost"])(V?.statistics[M]??[]).forEach(e=>C.add(e))}}return[...C].sort()}async _loadInfo(){!this.hass||this._infoLoading||(this._infoLoading=!0,this._info=await I(this.hass),this._infoLoading=!1,clearTimeout(this._retryTimer),this._retryTimer=void 0,this.isConnected&&(!this._info||this._info.calculating)&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),w)))}async _load(C,H,V){if(!this.hass)return;this._loading=C;let M={key:C,at:Date.now(),values:{},names:{},failed:!1};try{let e=this._byStatistics?H:[],[i,a]=await Promise.all([J2(this.hass,H,V),e.length?this.hass.callWS({type:"recorder/get_statistics_metadata",statistic_ids:e}):Promise.resolve([])]);M.values=i,M.names=Object.fromEntries(a.map(t=>[t.statistic_id,t.name||this.hass?.states[t.statistic_id]?.attributes.friendly_name||t.statistic_id]))}catch{M.failed=!0}this._loading===C&&(this._loading=void 0,this._sums=M)}willUpdate(C){if(!this.hass||((C.has("hass")||C.has("_config"))&&this._follow(),this._hasChart===void 0&&(this._hasChart=!1,$1().then(i=>{this._hasChart=i})),this._info===void 0&&(this._info=N()),F()&&!this._infoLoading&&this._loadInfo(),!this._byStatistics&&(this.isConnected&&this._info?.calculating&&!this._retryTimer&&!this._infoLoading&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),w)),!this._info||this._info.calculating)))return;let H=this._range();if(!H)return;let V=this._ids();if(!V.length)return;let M=JSON.stringify([V,H.start,H.end]),e=!this._sums||Date.now()-this._sums.at>E5;M!==this._loading&&(M!==this._sums?.key||e&&!this._loading)&&this._load(M,V,H)}_sum(C){return C.reduce((H,V)=>H+(this._sums?.values[V]??0),0)}_parts(){let C=this._localize;if(this._byStatistics){let V=_(this),M=this._info?D(this._info,V):new Map;return(this._config.statistics??[]).map((e,i)=>{let a=this._info?.areas.find(t=>t.kind==="device"&&(t.statistics.energy?.[0]===e.statistic||t.statistics.heat?.[0]===e.statistic));return{id:e.statistic,name:e.name??a?.name??this._sums?.names[e.statistic]??e.statistic,color:(a&&M.get(a.id))??V.consumers[i%V.consumers.length],value:this._sum([e.statistic])}})}let H=this._series().map(V=>{let M=this._sum(V.plus)-this._sum(V.minus),e=V.name.key?.replace(/^source\./,"mix."),i=V.name.text??(e&&R(e)?C(e):V.name.key&&R(V.name.key)?C(V.name.key):V.id),a={id:V.id,name:i,color:V.color,value:V.floor?Math.max(M,0):M};if(this._by==="consumer"&&this._info){let t=_(this),o=this._info.areas.find(A=>A.id===V.id);if(o){let A=f=>this._sum(o.statistics[f]??[]),n=A("energy"),m=A("solar"),p=A("cheap"),s=A("expensive");a.energy=n;let x=this._figure==="cost",u={solar:x?A("solar_cost"):m,cheap:x?A("cheap_cost"):p,expensive:x?A("expensive_cost"):s};a.mix=[{color:t.solar,value:u.solar},{color:t.cheap,value:u.cheap},{color:t.grid,value:Math.max((x?A("cost"):n)-u.solar-u.cheap-u.expensive,0)},{color:t.expensive,value:u.expensive}]}}return a});return this._by==="consumer"?H.sort((V,M)=>M.value-V.value):H}_value(C){return this._figure==="cost"&&!this._byStatistics?this._fmt.value(C,"money"):this._fmt.value(C,"energy")}_title(){let C=this._localize;return this._config.title?this._config.title:this._byStatistics?"":(this._area()?this._by:this._config.by??"source")==="source"?C("breakdown_mix"):C(this._figure==="cost"?"breakdown_cost_by_consumer":"breakdown_energy_by_consumer")}_ring(C){let H=this._localize;if(!this._hasChart)return d`<p class="summary">${H("history_no_chart")}</p>`;let V=getComputedStyle(this),M=this._figure==="cost"&&!this._byStatistics,e=D2({items:C,total:H("breakdown_total"),format:t=>this._value(t),percent:t=>this._fmt.value(t,"percent"),centerColor:_(this).line,labelColor:V.getPropertyValue("--primary-text-color").trim()||"#212121",hidden:this._hidden}),i=M2(C.map(t=>this._hidden.has(t.id)?0:t.value)),a=t=>{let o=new Set(this._hidden);o.has(t)?o.delete(t):o.add(t),this._hidden=o};return d`<div class="ring">
      ${P2(M,d`<ha-chart-base
          .hass=${this.hass}
          .data=${e.data}
          .options=${e.options}
          .height=${$5}
        ></ha-chart-base>`)}
      <div class="chart-legend">
        <ul>
          ${C.map((t,o)=>{let A=this._hidden.has(t.id),n=this._fmt.value(i[o],"percent");return d`<li class=${A?"hidden":""}>
              <button
                type="button"
                class="leg"
                aria-pressed=${String(!A)}
                aria-label="${t.name}: ${n}"
                @click=${()=>a(t.id)}
              >
                <svg class="icon" viewBox="0 0 24 24" style="color: ${A?"var(--secondary-text-color)":t.color}">
                  <path fill="currentColor" d=${A?I5:N5}></path>
                </svg>
                <span class="label">${t.name}</span>
                <span class="value">${n}</span>
              </button>
            </li>`})}
        </ul>
      </div>
    </div>`}_bars(C){let H=C.filter(i=>this._value(i.value)!==this._value(0)),V=Math.max(...H.map(i=>i.value),0),M=this._config.color_by_source===!0&&this._by==="consumer",e=this._localize;return d`<div class="bars">
      ${H.map(i=>{let a=V>0?Math.max(i.value/V*100,0):0,t=i.mix?.reduce((A,n)=>A+n.value,0)??0,o="";return this._figure==="cost"&&i.energy!==void 0&&(o=this._fmt.value(i.energy,"energy"),i.energy>0&&(o+=` \xB7 ${e("line_average_price",{price:this._fmt.value(i.value/i.energy,"price")})}`)),d`<div class="bar-row">
          <div class="bar-text">
            <span class="name">${i.name}</span>
            <span class="amount">${this._value(i.value)}</span>
          </div>
          ${o?d`<div class="bar-line">${o}</div>`:v}
          <div class="track">
            <div class="fill" style="width: ${a}%; ${M?"":`--c: ${i.color}`}">
              ${M&&i.mix&&t>0?i.mix.map(A=>d`<span style="width: ${A.value/t*100}%; --c: ${A.color}"></span>`):v}
            </div>
          </div>
        </div>`})}
      ${M?d`<div class="key">
            ${["solar","cheap","grid","expensive"].filter(i=>(i!=="cheap"||this._info?.levels.cheap_until!=null)&&(i!=="expensive"||this._info?.levels.expensive_from!=null)).map(i=>d`<span><span class="dot" style="--c: ${Y[i]}"></span>${e(i==="grid"?this._info?.levels.cheap_until!=null||this._info?.levels.expensive_from!=null?"source.normal":"source.grid":`source.${i}`)}</span>`)}
          </div>`:v}
    </div>`}render(){if(!this.hass)return d``;let C=this._localize,H=this._range(),V=this._sums?this._parts():[],M=V.reduce((n,m)=>n+Math.max(m.value,0),0),e=!this._byStatistics&&this._info?.calculating===!0,i=!this._byStatistics&&this._info!==void 0&&!this._area(),a=this._config.display??(!this._byStatistics&&this._by==="consumer"?"bars":"ring"),t=(this._config.period??"energy_date")==="energy_date",o=H&&!(a==="bars"&&t)?r1(H,this._language):"",A;return e?A=d`<p class="summary">${C("calculating_all")}</p>`:i?A=d`<p class="summary">${C(this._info===null?"editor_not_loaded":"figures_unavailable")}</p>`:this._sums?.failed?A=d`<p class="summary">${C("figures_failed")}</p>`:this._sums?M<=0?A=d`<p class="summary">${C("history_empty_figure")}</p>`:A=a==="bars"?this._bars(V):this._ring(V):A=d`<p class="summary">${C("calculating")}</p>`,d`<ha-card>
      <div class="header">
        <h2 class="title">${this._title()}</h2>
        ${o?d`<span class="chip">${o}</span>`:v}
      </div>
      ${A}
    </ha-card>`}};a1.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0},_selected:{state:!0},_sums:{state:!0},_hasChart:{state:!0},_hidden:{state:!0}},a1.styles=[W,O`
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
    `];var o1=r=>({select:{mode:"dropdown",options:r}}),W5=r=>r.kind==="household"||!!r.statistics.solar?.length,S1=class extends Z{constructor(){super(...arguments);this._label=C=>this._localize(`editor_${C.name}`)}setConfig(C){this._config=C}get _localize(){return h(this.hass?.locale?.language??this.hass?.language??"en")}willUpdate(){this.hass&&this._info===void 0&&(this._info=null,this.hass.callWS({type:`${g}/figures`}).then(C=>{this._info=C}).catch(()=>{}))}_data(){let C=this._config??{type:""},H=!!C.statistics?.length||C.statistics!==void 0&&!C.area;return{title:C.title??"",period:C.period??"energy_date",source:H?"statistics":"energy",area:C.area??"household",by:C.by??"source",figure:C.figure??"energy",display:C.display??(!H&&C.by==="consumer"?"bars":"ring"),color_by_source:C.color_by_source??!1,statistics:(C.statistics??[]).map(V=>V.statistic)}}_schema(C){let H=this._localize,V=[{name:"title",selector:{text:{}}},{name:"period",selector:o1(z.map(M=>({value:M,label:H(`period.${M}`)})))},{name:"breakdown_source",selector:o1(["energy","statistics"].map(M=>({value:M,label:H(`breakdown_source.${M}`)})))}];if(C.source==="statistics")V.push({name:"statistics",selector:{statistic:{multiple:!0}}});else{let M=(this._info?.areas??[]).filter(W5),e=M.find(a=>a.id===C.area),i=[...e?.statistics.solar?.length?["source"]:[],...e?.kind==="household"?["consumer"]:[]];V.push({name:"area",selector:o1(M.map(a=>({value:a.id,label:a.name})))},{name:"by",selector:o1(i.map(a=>({value:a,label:H(`by.${a}`)})))}),C.by==="consumer"&&V.push({name:"figure",selector:o1(["energy","cost"].map(a=>({value:a,label:H(`figure_choice.${a}`)})))})}return V.push({name:"display",selector:o1(["ring","bars"].map(M=>({value:M,label:H(`display.${M}`)})))}),C.source!=="statistics"&&C.by==="consumer"&&C.display==="bars"&&V.push({name:"color_by_source",selector:{boolean:{}}}),V}_changed(C){if(!this._config)return;let H={...this._data(),...C.detail.value};"breakdown_source"in C.detail.value&&(H.source=C.detail.value.breakdown_source);let V={type:this._config.type};if(typeof H.title=="string"&&H.title&&(V.title=H.title),V.period=H.period??"energy_date",H.source==="statistics"){let M=new Map((this._config.statistics??[]).map(i=>[i.statistic,i])),e=Array.isArray(H.statistics)?H.statistics.filter(Boolean):[];V.statistics=e.map(i=>M.get(i)??{statistic:i})}else{V.area=H.area??"household";let M=this._info?.areas.find(a=>a.id===V.area),e=M?.kind==="household",i=!!M?.statistics.solar?.length;V.by=H.by==="consumer"&&e?"consumer":i?"source":"consumer",V.by==="consumer"&&H.figure==="cost"?V.figure="cost":V.figure="energy"}V.display=H.display==="bars"?"bars":"ring",V.by==="consumer"&&V.display==="bars"&&H.color_by_source===!0&&(V.color_by_source=!0),this._config=V,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:V},bubbles:!0,composed:!0}))}render(){if(!this.hass||!this._config)return d``;let C=this._data();return d`<ha-form
      .hass=${this.hass}
      .data=${{...C,breakdown_source:C.source}}
      .schema=${this._schema(C)}
      .computeLabel=${this._label}
      @value-changed=${this._changed}
    ></ha-form>`}};S1.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0}};var X2="M7 11H9V13H7V11M21 5V19C21 20.11 20.11 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H6V1H8V3H16V1H18V3H19C20.11 3 21 3.9 21 5M5 7H19V5H5V7M19 19V9H5V19H19M15 13V11H17V13H15M11 13V11H13V13H11M7 15H9V17H7V15M15 17V15H17V17H15M11 17V15H13V17H11Z";var C5="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z";var H5="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z";var V5="M18,6H8.83L14.83,12L8.83,18H18V20H6V18L12,12L6,6V4H18V6Z";var L5="electricity-lens-balance-card-view",z5=()=>{try{return localStorage.getItem(L5)==="yearly"?"yearly":"total"}catch{return"total"}},A1=class extends Z{constructor(){super(...arguments);this._view=z5();this._infoLoading=!1}static getStubConfig(){return{}}static getConfigForm(){return{schema:[]}}setConfig(C){}getCardSize(){return 4}getGridOptions(){return{columns:12,min_columns:6}}get _localize(){return h(this.hass?.locale?.language??this.hass?.language??"en")}get _language(){return this.hass?.locale?.language??"en"}_money(C,H=!1){return new Intl.NumberFormat(this._language,{style:"currency",currency:this.hass?.config.currency??"EUR",maximumFractionDigits:0,minimumFractionDigits:0,signDisplay:H?"exceptZero":"auto"}).format(C)}_price(C){return new Intl.NumberFormat(this._language,{style:"currency",currency:this.hass?.config.currency??"EUR",maximumFractionDigits:4,minimumFractionDigits:2}).format(C)}_percent(C){return new Intl.NumberFormat(this._language,{style:"percent",maximumFractionDigits:0}).format(C/100)}_month(C){return new Intl.DateTimeFormat(this._language,{month:"long",year:"numeric"}).format(C)}_years(C){let H=this._localize;if(C<1)return H("under_one_year");let V=Math.round(C);return V===1?H("years_one"):H("years_other",{count:String(V)})}_toggleView(){this._view=this._view==="total"?"yearly":"total";try{localStorage.setItem(L5,this._view)}catch{}}_openIntegration(){history.pushState(null,"",`/config/integrations/integration/${g}`),window.dispatchEvent(new CustomEvent("location-changed"))}willUpdate(){this.hass&&(this._info===void 0&&(this._info=N()),F()&&!this._infoLoading&&(this._infoLoading=!0,I(this.hass).then(C=>{this._info=C,this._infoLoading=!1})))}render(){let C=this._localize;if(!this.hass)return d``;let H=J(this.hass);if(!H.length)return d`<ha-card>
        <div class="header"><h2 class="title">${C("title")}</h2></div>
        <p class="summary">${C("not_set_up")}</p>
      </ha-card>`;let V=K2(H),M=this._view==="yearly",e=this._info?D(this._info,_(this)):void 0;return d`<ha-card>
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
            <path d=${M?V5:X2}></path>
          </svg>
        </button>
      </div>
      <p class="summary">${this._summary(V,H,M)}</p>
      <ul class="rows">
        ${H.map(i=>this._row(i,M,e?.get(i.category)))}
      </ul>
      ${this._footer(H)}
    </ha-card>`}_chip(C,H){let V=this._localize,M=null;return H?C.perYear!==null&&(M=V("per_year",{amount:this._money(C.perYear,!0)})):C.balance!==null?M=this._money(C.balance,!0):C.calculating||(M=this._money(C.saved)),M===null?v:d`<span class="chip">${M}</span>`}_summary(C,H,V){let M=this._localize;return C.calculating?M("calculating_all"):V?C.inThePlusFrom===null?H.some(e=>e.perYear===null)?M("yearly_after_twelve"):"":C.balance!==null&&C.balance>=0?M("in_the_plus"):M("in_the_plus_from",{date:this._month(C.inThePlusFrom)}):C.invested>0?M("saved_invested",{saved:this._money(C.saved),invested:this._money(C.invested)}):M("saved_only",{saved:this._money(C.saved)})}_row(C,H,V){let M=this._localize,e=M(`category.${C.category}`),i="\u2013";return C.calculating||(H&&C.perYear!==null?i=M("per_year",{amount:this._money(C.perYear)}):!H&&C.saving!==null&&(i=this._money(C.saving))),d`<li class="row ${C.category}" style=${V?`--color: ${V}`:""}>
      <span class="swatch" aria-hidden="true"></span>
      <div class="row-body">
        <div class="line">
          <span>${e}</span>
          <span class="amount ${i==="\u2013"?"waiting":""}">${i}</span>
        </div>
        <div class="sub">
          ${C.calculating?M("calculating"):H?this._yearlyDetail(C):this._totalDetail(C,e)}
        </div>
        ${C.calculating?v:this._since(C,H)}
      </div>
    </li>`}_since(C,H){let V=this._localize,M=[];return C.countingSince&&M.push(V("since",{date:this._month(C.countingSince)})),!H&&C.perYear!==null&&M.push(V("per_year",{amount:this._money(C.perYear)})),C.heatEstimated&&M.push(V("heat_estimated")),M.length?d`<div class="sub since">${M.join(" \xB7 ")}</div>`:v}_totalDetail(C,H){let V=this._localize;if(C.investment&&C.payback!==null){let M=Math.max(0,C.payback),e=this._percent(C.payback);return d`<div class="meter">
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
      </div>`}return V(`instead_${C.category}`)}_yearlyDetail(C){let H=this._localize;if(C.perYear===null)return C.yearlyFrom?H("yearly_from",{date:this._month(C.yearlyFrom)}):"";let V=q2(C);if(V!==null)return H("return_per_year",{percent:this._percent(V)});let M=j2(C);return M!==null?H("pays_off_in",{years:this._years(M)}):C.category==="heat_pump"?H(C.heating==="oil"?"instead_of_oil":"instead_of_gas"):C.category==="wallbox"?H("instead_of_fuel"):""}_footer(C){let H=this._localize,V=[];for(let M of C){if(M.price===null)continue;let e=this._price(M.price);M.category==="heat_pump"&&V.push(H(M.heating==="oil"?"oil":"gas",{price:e})),M.category==="wallbox"&&V.push(H("fuel",{price:e}))}return V.length?d`<div class="footer">
      <button
        class="prices"
        type="button"
        title=${H("prices_link")}
        aria-label=${`${H("prices_link")}: ${V.join(", ")}`}
        @click=${this._openIntegration}
      >
        ${V.join(" \xB7 ")}
      </button>
    </div>`:v}};A1.properties={hass:{attribute:!1},_view:{state:!0},_info:{state:!0}},A1.styles=[W,O`
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
    `];var U5=300*1e3,G5="200px",Q5={energy:"energy",cost:"money",saving:"money",export:"energy",heat:"energy",distance:"distance",alternative_cost:"money"},n1=class extends Z{constructor(){super(...arguments);this._config={type:""};this._infoLoading=!1}static getStubConfig(){return{}}static getConfigElement(){return document.createElement("electricity-lens-history-card-editor")}setConfig(C){this._config=C??{type:""}}getCardSize(){return 5}getGridOptions(){return{columns:12,min_columns:6}}connectedCallback(){super.connectedCallback(),this._follow()}disconnectedCallback(){super.disconnectedCallback(),this._unfollow?.(),this._unfollow=void 0,clearTimeout(this._retryTimer),this._retryTimer=void 0}get _localize(){return h(this.hass?.locale?.language??this.hass?.language??"en")}get _language(){return this.hass?.locale?.language??"en"}get _fmt(){return L1(this._language,this.hass?.config.currency??"EUR")}get _savings(){return!this._config.area}_follow(){(this._config.period??"energy_date")==="energy_date"&&(this._unfollow||!this.isConnected||!this.hass?.connection||(this._unfollow=V1(this.hass.connection,C=>{this._selected=C})))}async _loadInfo(){!this.hass||this._infoLoading||(this._infoLoading=!0,this._info=await I(this.hass),this._infoLoading=!1,clearTimeout(this._retryTimer),this._retryTimer=void 0,this.isConnected&&(!this._info||this._info.calculating)&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),w)))}_range(C){let H=this._config.period??"energy_date";if(H==="all")return{range:C(),period:"year"};if(H!=="energy_date"){let M=T(H);return{range:M,period:$(M)}}if(this._selected===void 0)return;if(this._selected)return{range:this._selected,period:$(this._selected)};let V=C();return{range:V,period:this._savings?"year":$(V)}}_savingsPlan(){if(!this.hass)return;let C=this._localize,H=J(this.hass);if(!H.length||H.some(t=>t.calculating))return;let V=this._range(()=>U2(H.map(t=>t.countingSince)));if(!V)return;let M=_(this),e=this._info?D(this._info,M):void 0,i={pv:M.solar,heat_pump:e?.get("heat_pump")??M.heat,wallbox:e?.get("wallbox")??M.car},a=H.map(t=>({series:{id:t.category,name:{},color:i[t.category],plus:[t.savingStatistic],minus:[]},name:C(`category.${t.category}`)}));return this._plan(V,a,"money",void 0,[])}_figurePlan(){let C=this._info,H=this._config;if(!C||C.calculating)return;let V=C.areas.find(m=>m.id===H.area),M=H.figure??"energy";if(!V||!V.statistics[M]?.length)return;let e=this._range(()=>T("this_month"));if(!e)return;let i=this._localize,a=i1(V,M),t=H.stack&&a.includes(H.stack)?H.stack:a[0],o=z1(C,V,M,t,_(this)).map(m=>({series:m,name:m.name.text??(m.name.key&&R(m.name.key)?i(m.name.key):m.id)}));o.length===1&&(o[0].name=k(i,M,V));let A=H.line&&V.statistics?{figure:H.line,area:V,name:H.line_name??k(i,H.line,V)}:void 0,n=M==="cost"?[...V.statistics.solar??[],...V.statistics.solar_cost??[]]:[];return this._plan(e,o,Q5[M],A,H.lines??[],n)}_plan(C,H,V,M,e,i=[]){let a=new Set(i);for(let{series:o}of H)[...o.plus,...o.minus].forEach(A=>a.add(A));if(M)for(let o of Object.values(M.area.statistics))(o??[]).forEach(A=>a.add(A));e.forEach(o=>a.add(o.statistic));let t=[...a].sort();return{key:JSON.stringify([t,H.map(o=>[o.series.id,o.series.color]),M?.figure,e,C.range.start,C.range.end,C.period]),range:C.range,period:C.period,bars:H,unit:V,lineFigure:M,lines:e,ids:t}}async _load(C){if(!this.hass)return;this._loading=C.key;let H={key:C.key,at:Date.now(),plan:C,slots:z2(C.range,C.period),rows:{},metadata:{},failed:!1};try{let V=C.lines.map(i=>i.statistic),[M,e]=await Promise.all([this.hass.callWS({type:"recorder/statistics_during_period",start_time:new Date(C.range.start).toISOString(),end_time:new Date(C.range.end+1).toISOString(),statistic_ids:C.ids,period:e1(C.period),types:["change","mean"],units:{energy:"kWh"}}),V.length?this.hass.callWS({type:"recorder/get_statistics_metadata",statistic_ids:V}):Promise.resolve([])]);H.rows=M,H.metadata=Object.fromEntries(e.map(i=>[i.statistic_id,i]))}catch{H.failed=!0}this._loading===C.key&&(this._loading=void 0,this._loaded=H)}willUpdate(C){if(!this.hass)return;(C.has("hass")||C.has("_config"))&&this._follow(),this._hasChart===void 0&&(this._hasChart=!1,$1().then(M=>{this._hasChart=M})),this._info===void 0&&(this._info=N()),F()&&!this._infoLoading?this._loadInfo():!this._savings&&this.isConnected&&this._info?.calculating&&!this._retryTimer&&!this._infoLoading&&(this._retryTimer=setTimeout(()=>void this._loadInfo(),w));let H=this._savings?this._savingsPlan():this._figurePlan(),V=!this._loaded||Date.now()-this._loaded.at>U5;H&&H.key!==this._loading&&(H.key!==this._loaded?.key||V&&!this._loading)&&this._load(H),C.has("_loaded")&&(this._chart=this._buildChart())}_perSlot(C){let H=this._loaded;if(!H)return[];let V=H.slots.map(()=>null);for(let M of C)r2(H.rows[M],H.slots,H.plan.period).forEach((e,i)=>{e!==null&&(V[i]=(V[i]??0)+e)});return V}_barValues(C){let H=this._perSlot(C.plus),V=this._perSlot(C.minus);return H.map((M,e)=>{if(M===null&&V[e]===null)return null;let i=(M??0)-(V[e]??0),a=C.floor?Math.max(i,0):i;return C.negative?-a:a})}_lines(){let C=this._loaded;if(!C)return[];let{plan:H,slots:V}=C,M=this._fmt,e=_(this),i=this.hass?.config.currency==="EUR"?100:1,a=[];if(H.lineFigure){let{figure:t,area:o,name:A}=H.lineFigure,n=Object.fromEntries(Object.entries(o.statistics).map(([s,x])=>[s,this._perSlot(x??[])])),m=V.map((s,x)=>M1(t,o,f=>n[f]?.[x]??null,null).value),p=M1(t,o,()=>0,null).unit;a.push({id:`line_${t}`,name:A,color:e.line,dash:"dashed",step:p==="price"&&H.period==="hour",values:p==="price"?m.map(s=>s===null?null:s*i):m,format:s=>M.value(p==="price"?s/i:s,p)})}return H.lines.forEach((t,o)=>{let A=C.metadata[t.statistic],n=t.value??(A?.has_sum?"change":"mean"),m=A?.unit_class==="energy"?"kWh":A?.statistics_unit_of_measurement??"",p=n==="mean"?G2(C.rows[t.statistic],V,H.period):r2(C.rows[t.statistic],V,H.period);a.push({id:`statistic_${o}`,name:t.name??A?.name??this.hass?.states[t.statistic]?.attributes.friendly_name??t.statistic,color:o===0&&!H.lineFigure?e.line:e.consumers[o%e.consumers.length],dash:"dotted",values:p,format:s=>`${M.number(s)}${m?` ${m}`:""}`})}),a}_buildChart(){let C=this._loaded;if(!C||C.failed)return;let H=this._localize,V=this._fmt,{plan:M}=C,e=M.bars.map(({series:o,name:A})=>({id:o.id,name:A,color:o.color,values:this._barValues(o),inTotal:!o.negative})),i=this._lines(),a={price:this.hass?.config.currency==="EUR"?"ct/kWh":`${V.currencySymbol()}/kWh`,percent:"%",per_100km:`${V.currencySymbol()}/100 km`},t=M.lineFigure&&!M.lines.length?a[M1(M.lineFigure.figure,M.lineFigure.area,()=>0,null).unit]??"":"";return R2({labels:this._labels(C.slots,M.period),series:e,unit:M.unit==="money"?V.currencySymbol():M.unit==="distance"?"km":"kWh",total:H("history_total"),format:o=>M.unit==="money"?V.value(o,"money"):`${V.number(o,Math.abs(o)<10?2:1)} ${M.unit==="distance"?"km":"kWh"}`,tick:o=>V.number(o,Math.abs(o)<10?2:0),lineTick:o=>V.number(o,Number.isInteger(o)?0:1),lines:i,lineUnit:t})}_labels(C,H){let V=t=>new Intl.DateTimeFormat(this._language,t),M=V({hour:"2-digit",minute:"2-digit"}),e=C.length>0&&new Date(C[0]).getFullYear()!==new Date(C[C.length-1]).getFullYear(),i={hour:M,day:V({day:"numeric"}),month:V(e?{month:"short",year:"2-digit"}:{month:"short"}),year:V({year:"numeric"})}[H],a={hour:M,day:V({weekday:"short",day:"numeric",month:"short"}),month:V({month:"long",year:"numeric"}),year:V({year:"numeric"})}[H];return C.map(t=>({axis:i.format(t),tooltip:H==="hour"?`${M.format(t)} \u2013 ${M.format(t+36e5)}`:a.format(t)}))}_title(){let C=this._localize;if(this._config.title)return this._config.title;if(this._savings)return C("history_title");let H=this._config.figure??"energy",V=this._info?.areas.find(e=>e.id===this._config.area);if(V)return k(C,H,V);let M=`figure.${H}`;return R(M)?C(M):C("history_title")}_note(C){let H=this._localize;if(!this.hass)return"";if(this._savings){let i=J(this.hass).map(a=>H(a.category==="pv"?"compare_pv":a.category==="wallbox"?"compare_fuel":a.heating==="oil"?"compare_oil":"compare_gas"));return i.length?H("history_savings_note",{list:new Intl.ListFormat(this._language,{type:"conjunction"}).format(i)}):""}let V=this._info?.areas.find(i=>i.id===this._config.area);if(this._config.figure==="saving"&&V?.statistics.alternative_cost?.length)return H("history_saving_note");if(!C||C.failed||this._config.figure!=="cost")return"";let M=i=>this._perSlot(i??[]).reduce((a,t)=>a+(t??0),0),e=M(V?.statistics.solar);return e>0?H("history_cost_note",{rate:this._fmt.value(M(V?.statistics.solar_cost)/e,"price")}):H("history_cost_note_no_solar")}render(){let C=this._localize;if(!this.hass)return d``;let H=this._title();if(this._savings&&!J(this.hass).length)return d`<ha-card>
        <div class="header"><h2 class="title">${H}</h2></div>
        <p class="summary">${C("not_set_up")}</p>
      </ha-card>`;let V=this._savings?J(this.hass).some(n=>n.calculating):this._info?.calculating===!0,M=V?void 0:this._loaded,e=this._chart?.data.filter(n=>n.type==="bar"&&n.id!=="export").flatMap(n=>n.data.map(m=>m.value??null))??[],i=e.reduce((n,m)=>n+(m??0),0),a=e.some(n=>n),t=M?.plan.unit??"money",o=!this._savings&&this._info!==void 0&&!this._info?.areas.some(n=>n.id===this._config.area&&n.statistics[this._config.figure??"energy"]?.length),A=this._note(M);return d`<ha-card>
      <div class="header">
        <h2 class="title">${H}</h2>
        ${M&&!M.failed&&a?d`<span class="chip">${this._fmt.value(i,t)}</span>`:M?d`<span class="chip">${r1(M.plan.range,this._language)}</span>`:v}
      </div>
      ${A?d`<p class="note">${A}</p>`:v}
      ${V?d`<p class="summary">${C("calculating_all")}</p>`:o?d`<p class="summary">${C(this._info===null?"editor_not_loaded":"figures_unavailable")}</p>`:this._body(M,a)}
    </ha-card>`}_body(C,H){let V=this._localize;return this._hasChart?C?.failed?d`<p class="summary">${V("history_failed")}</p>`:d`<div class="chart">
      ${this._chart?d`<ha-chart-base
            .hass=${this.hass}
            .data=${this._chart.data}
            .options=${this._chart.options}
          ></ha-chart-base>`:v}
      ${C&&!H?d`<div class="empty">
            ${V(this._savings?"history_empty":"history_empty_figure")}
          </div>`:v}
    </div>`:d`<p class="summary">${V("history_no_chart")}</p>`}};n1.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0},_selected:{state:!0},_loaded:{state:!0},_hasChart:{state:!0}},n1.styles=[W,O`
      .note {
        margin: 0;
        padding: var(--ha-space-1, 4px) var(--ha-space-4, 16px) 0;
        font-size: var(--ha-font-size-s, 12px);
        line-height: 16px;
        color: var(--secondary-text-color);
      }
      .chart {
        position: relative;
        min-height: ${b1(G5)};
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
    `];var K5=["energy","statistic","entity"],C1=r=>({select:{mode:"dropdown",options:r}}),d1=class extends Z{constructor(){super(...arguments);this._label=C=>{let H=this._localize,V=`editor_${C.name}`;return H(V)};this._helper=C=>C.name==="period"?this._localize("editor_period_hint"):void 0}setConfig(C){this._config=C}get _localize(){return h(this.hass?.locale?.language??this.hass?.language??"en")}get _tiles(){return this._config?.tiles??[]}willUpdate(){this.hass&&this._info===void 0&&(this._info=null,this.hass.callWS({type:`${g}/figures`}).then(C=>{this._info=C}).catch(()=>{}))}_changed(C){this._config=C,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:C},bubbles:!0,composed:!0}))}_setTiles(C){this._config&&this._changed({...this._config,tiles:C})}_cardSchema(){let C=this._localize;return[{name:"title",selector:{text:{}}},{name:"period",selector:C1(z.map(H=>({value:H,label:C(`period.${H}`)})))},{name:"columns",selector:C1([{value:"auto",label:C("editor_columns_auto")},...["1","2","3","4"].map(H=>({value:H,label:H}))])}]}_cardChanged(C){if(!this._config)return;let{title:H,period:V,columns:M}=C.detail.value,e={...this._config};typeof H=="string"&&H?e.title=H:delete e.title,e.period=V??"energy_date",M&&M!=="auto"?e.columns=Number(M):delete e.columns,this._changed(e)}_describe(C){let H=this._localize,V=y(C);if(V==="statistic")return{title:C.name??C.statistic??"",detail:`${C.statistic??""} \xB7 ${H(`value.${C.value??"change"}`)}`};if(V==="entity")return{title:C.name??C.entity??"",detail:`${C.entity??""} \xB7 ${H("value_current")}`};let M=this._info?.areas.find(i=>i.id===C.area),e=M&&C.figure?k(H,C.figure,M):C.figure??"";return{title:C.name??e,detail:`${M?.name??C.area??""} \xB7 ${H("source.energy")}`}}_tileSchema(C){let H=this._localize,V=y(C),M=[{name:"source",selector:C1(K5.map(e=>({value:e,label:H(`source.${e}`)})))}];if(V==="energy"){let e=this._info?.areas??[],i=e.find(a=>a.id===C.area);M.push({name:"area",selector:C1(e.map(a=>({value:a.id,label:a.name})))},{name:"figure",selector:C1(i?E(i).map(a=>({value:a,label:k(H,a,i)})):[])})}else V==="statistic"?(M.push({name:"statistic",selector:{statistic:{}}},{name:"value",selector:C1(W2.map(e=>({value:e,label:H(`value.${e}`)})))}),(C.value??"change")==="mean"&&M.push({name:"secondary",selector:C1(["none","range"].map(e=>({value:e,label:H(`secondary.${e}`)})))})):M.push({name:"entity",selector:{entity:{}}});return M.push({name:"name",selector:{text:{}}}),M}_tileData(C){return{source:y(C),...C,value:C.value??"change",secondary:C.secondary??"none"}}_tileChanged(C,H){let V=H.detail.value,M=this._tiles[C],e=V.source??y(M),i=typeof V.name=="string"&&V.name?V.name:void 0,a;if(e!==y(M))a=e==="energy"?{area:"household",figure:"cost"}:e==="statistic"?{statistic:"",value:"change"}:{entity:""};else if(e==="energy"){let t=V.area??M.area,o=this._info?.areas.find(m=>m.id===t),A=o?E(o):[],n=A.includes(V.figure)?V.figure:A[0];a={area:t,figure:n}}else e==="statistic"?(a={statistic:V.statistic??"",value:V.value??"change"},a.value==="mean"&&V.secondary==="range"&&(a.secondary="range")):a={entity:V.entity??""};i&&(a.name=i),this._setTiles(this._tiles.map((t,o)=>o===C?a:t))}_add(){let C=[...this._tiles,{area:"household",figure:"cost"}];this._setTiles(C),this._editing=C.length-1}_remove(C){this._setTiles(this._tiles.filter((H,V)=>V!==C))}render(){if(!this.hass||!this._config)return d``;let C=this._localize;if(this._editing!==void 0&&this._tiles[this._editing]){let H=this._editing,V=this._tiles[H];return d`<div class="editor">
        <div class="heading">
          <ha-icon-button-arrow-prev
            .label=${C("editor_back")}
            @click=${()=>this._editing=void 0}
          ></ha-icon-button-arrow-prev>
          <span>${C("editor_edit_tile",{number:String(H+1)})}</span>
        </div>
        ${y(V)==="energy"&&this._info===null?d`<p class="hint">${C("editor_not_loaded")}</p>`:v}
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
              .path=${H5}
              .label=${C("editor_edit")}
              @click=${()=>this._editing=V}
            ></ha-icon-button>
            <ha-icon-button
              .path=${C5}
              .label=${C("editor_remove")}
              @click=${()=>this._remove(V)}
            ></ha-icon-button>
          </div>`})}
      </div>
      <ha-button @click=${this._add}>${C("editor_add_tile")}</ha-button>
    </div>`}};d1.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0},_editing:{state:!0}},d1.styles=O`
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
  `;var n2="savings",h1=r=>({select:{mode:"dropdown",options:r}}),g1=class extends Z{constructor(){super(...arguments);this._label=C=>this._localize(`editor_${C.name}`)}setConfig(C){this._config=C}get _localize(){return h(this.hass?.locale?.language??this.hass?.language??"en")}willUpdate(){this.hass&&this._info===void 0&&(this._info=null,this.hass.callWS({type:`${g}/figures`}).then(C=>{this._info=C}).catch(()=>{}))}_schema(){let C=this._localize,H=this._config??{type:""},V=this._info?.areas??[],M=[{name:"title",selector:{text:{}}},{name:"period",selector:h1([...z,"all"].map(i=>({value:i,label:C(`period.${i}`)})))},{name:"area",selector:h1([{value:n2,label:C("editor_savings")},...V.filter(i=>c1(i).length).map(i=>({value:i.id,label:i.name}))])}],e=V.find(i=>i.id===H.area);if(e){let i=c1(e),a=H.figure&&i.includes(H.figure)?H.figure:i[0];M.push({name:"figure",selector:h1(i.map(t=>({value:t,label:k(C,t,e)})))},{name:"stack",selector:h1(i1(e,a).map(t=>({value:t,label:C(`stack.${t}`)})))},{name:"line",selector:h1([{value:"none",label:C("editor_line_none")},...A2(e).map(t=>({value:t,label:k(C,t,e)}))])},{name:"lines",selector:{statistic:{multiple:!0}}})}return M}_data(){let C=this._config??{type:""},H=this._info?.areas.find(e=>e.id===C.area),V=H?c1(H):[],M=C.figure&&V.includes(C.figure)?C.figure:V[0];return{title:C.title??"",period:C.period??"energy_date",area:C.area??n2,figure:M,stack:C.stack??(H&&M?i1(H,M)[0]:void 0),line:C.line??"none",lines:(C.lines??[]).map(e=>e.statistic)}}_changed(C){if(!this._config)return;let H=C.detail.value,V={type:this._config.type};typeof H.title=="string"&&H.title&&(V.title=H.title),V.period=H.period??"energy_date";let M=H.area;if(M&&M!==n2){V.area=M;let e=this._info?.areas.find(p=>p.id===M),i=e?c1(e):[],a=i.includes(H.figure)?H.figure:i[0];a&&(V.figure=a),(e&&a?i1(e,a):[]).includes(H.stack)&&(V.stack=H.stack),(e?A2(e):[]).includes(H.line)&&(V.line=H.line);let A=new Map((this._config.lines??[]).map(p=>[p.statistic,p])),m=(Array.isArray(H.lines)?H.lines:[]).filter(Boolean).map(p=>A.get(p)??{statistic:p});m.length&&(V.lines=m)}this._config=V,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:V},bubbles:!0,composed:!0}))}render(){return!this.hass||!this._config?d``:d`<ha-form
      .hass=${this.hass}
      .data=${this._data()}
      .schema=${this._schema()}
      .computeLabel=${this._label}
      @value-changed=${this._changed}
    ></ha-form>`}};g1.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0}};var M5="https://github.com/ignazhabibi/ha-electricity-lens",d2=(r,L)=>{if(!customElements.get(r))try{customElements.define(r,L)}catch{customElements.define(r,class extends L{})}};function e5(r,L=[]){let C=()=>{r.forEach(({tag:i,card:a,editor:t})=>{d2(i,a),t&&d2(t.tag,t.element)}),L.forEach(({type:i,element:a})=>d2(`ll-strategy-dashboard-${i}`,a))};C();let H=window.customElements,V=Date.now(),M=window.setInterval(()=>{let i=window.customElements!==H;i&&C(),(i||Date.now()-V>6e4)&&window.clearInterval(M)},100),e=window;e.customStrategies=e.customStrategies??[];for(let{type:i,name:a,description:t}of L)e.customStrategies.some(o=>o.type===i)||e.customStrategies.push({type:i,strategyType:"dashboard",name:a,description:t,documentationURL:M5});e.customCards=e.customCards??[];for(let{tag:i,name:a,description:t}of r)e.customCards.some(o=>o.type===i)||e.customCards.push({type:i,name:a,description:t,preview:!0,documentationURL:M5})}var c=(r,L={})=>({type:r.startsWith("electricity-lens")?`custom:${r}`:r,...L}),r5={grid_options:{columns:"full"}},U1={grid_options:{columns:6}},f1={grid_options:{columns:12}},t5=(r,L,C={},H)=>c("electricity-lens-figures-card",{tiles:[{area:r,figure:L,...H?{name:H}:{}}],...U1,...C}),O1=(r,L,C,H,V=!0)=>({title:r,path:L,type:"sections",max_columns:3,sections:[{type:"grid",column_span:2,cards:[...V?[c("energy-date-selection",r5)]:[],...C.map(M=>({...r5,...M}))]}],sidebar:{sections:[{type:"grid",cards:H}]}});function j5(r){let L=Object.values(r.entities??{}).filter(V=>V.platform===g),C=["pv","heat_pump","wallbox"],H=L.filter(V=>V.translation_key==="saving").map(V=>r.states[V.entity_id]?.attributes.category).filter(V=>C.includes(V));return{balance:L.find(V=>V.translation_key==="balance")?.entity_id,categories:H}}function q5(r,L,C={categories:[]}){let H=(l,S,p1={})=>t5(l,S,p1,L(`figure.${S}`)),V=(l,S,p1,i5={})=>t5(l,S,i5,L(p1)),M=(l,S,p1={})=>c(l,{title:L(S),...p1}),e=l=>r.areas.find(S=>S.id===l),i=r.levels.cheap_until!==null,a=e("solar"),t=e("heat_pump"),o=e("wallbox"),A=r.areas.some(l=>l.kind==="device"),n=!!(a?.statistics.saving?.length||t||o||C.categories.length),m=C.balance&&C.categories.length?C.balance:void 0,p={period:"today"},s={line:"price",...a?{line_name:L("strategy.price_with_solar")}:{}},x=l=>a?V(l,"price","strategy.price_with_solar"):H(l,"price"),u=(l,S={})=>c("electricity-lens-history-card",{area:l,figure:"energy",stack:"source",...s,...S}),f=l=>c("electricity-lens-breakdown-card",{area:l,by:"source",...f1}),b=[];return b.push(O1(L("strategy.overview"),"now",[c("energy-distribution"),u("household",p)],[V("household","cost","strategy.cost_today",p),V("household","solar_share","strategy.self_sufficiency_today",p),a?V("solar","energy","strategy.solar_today",p):V("household","energy","strategy.consumption_today",p),...m?[c("electricity-lens-figures-card",{tiles:[{entity:m,name:L("strategy.balance"),secondary:"none"}],...U1})]:[],...a?.forecast?[H("solar","forecast_today"),H("solar","forecast_tomorrow")]:[]],!1)),b.push(O1(L("strategy.electricity"),"household",[M("energy-usage-graph","strategy.usage_graph"),...a?[M("energy-solar-graph","strategy.solar_graph")]:[],...A?[c("electricity-lens-history-card",{title:L("strategy.devices_graph"),area:"household",figure:"energy",stack:"consumer"})]:[]],[M("energy-distribution","strategy.distribution",f1),f("household"),...a?[c("energy-self-sufficiency-gauge",U1),c("energy-solar-consumed-gauge",U1)]:[]])),b.push(O1(L("strategy.costs"),"costs",[M("electricity-lens-history-card","strategy.cost_history",{area:"household",figure:"cost",stack:"consumer",...s}),M("electricity-lens-breakdown-card","strategy.cost_distribution",{area:"household",by:"consumer",figure:"cost",display:"bars",color_by_source:!0}),...n?[c("electricity-lens-history-card"),c("electricity-lens-balance-card")]:[]],[V("grid","cost","strategy.bill",f1),H("grid","grid_price"),x("household"),H("household",i?"cheap_share":"solar_share"),...i?[H("grid","cheap_saving")]:[]])),t&&b.push(O1(L("strategy.heating"),"heating",[c("electricity-lens-history-card",{area:"heat_pump",figure:"heat",stack:"consumer",line:"scop"}),u("heat_pump"),c("electricity-lens-history-card",{area:"heat_pump",figure:"cost",stack:"consumer",...s}),c("electricity-lens-history-card",{area:"heat_pump",figure:"saving",stack:"consumer"})],[H("heat_pump","scop"),H("heat_pump","heat_price"),x("heat_pump"),H("heat_pump","saving"),f("heat_pump"),...(t.statistics.energy?.length??0)>1?[c("electricity-lens-breakdown-card",{area:"heat_pump",by:"consumer",figure:"energy",display:"bars",color_by_source:!0,...f1})]:[],...(t.statistics.heat_meters?.length??0)>1?[c("electricity-lens-breakdown-card",{title:L("figure.heat"),statistics:(t.statistics.heat_meters??[]).map(l=>({statistic:l})),display:"bars",...f1})]:[]])),o&&b.push(O1(L("strategy.charging"),"charging",[u("wallbox"),c("electricity-lens-history-card",{area:"wallbox",figure:"distance",line:"cost_per_100km"}),c("electricity-lens-history-card",{area:"wallbox",figure:"cost",...s}),c("electricity-lens-history-card",{area:"wallbox",figure:"saving"})],[H("wallbox","cost_per_100km"),H("wallbox","distance"),x("wallbox"),H("wallbox","saving"),f("wallbox")])),b}var y1=class extends HTMLElement{static async generate(L,C){let H=h(C.locale?.language??C.language??"en"),V;try{V=await C.callWS({type:`${g}/figures`})}catch{return{title:H("strategy.title"),views:[{title:H("strategy.title"),cards:[{type:"markdown",content:H("strategy.not_loaded")}]}]}}return{title:H("strategy.title"),views:q5(V,H,j5(C))}}};y1.noEditor=!0;e5([{tag:"electricity-lens-balance-card",card:A1,name:"Electricity Lens balance",description:"What your PV plant, heat pump, and electric car have saved, and when they pay off."},{tag:"electricity-lens-history-card",card:n1,name:"Electricity Lens history",description:"Savings, consumption, or costs per period as bars, stacked by source or consumer, with lines. Follows the energy date selection.",editor:{tag:"electricity-lens-history-card-editor",element:g1}},{tag:"electricity-lens-figures-card",card:t1,name:"Electricity Lens key figures",description:"Tiles with key figures for a period: costs, solar share, cheap grid power, savings, or any statistic or entity.",editor:{tag:"electricity-lens-figures-card-editor",element:d1}},{tag:"electricity-lens-breakdown-card",card:a1,name:"Electricity Lens breakdown",description:"Shares for a period as a ring or bars: the electricity mix, consumption or costs by consumer, or any statistics.",editor:{tag:"electricity-lens-breakdown-card-editor",element:S1}}],[{type:"electricity-lens",element:y1,name:"Electricity Lens",description:"A finished electricity dashboard with costs, electricity mix, solar, heat pump, car, and the balance."}]);
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
