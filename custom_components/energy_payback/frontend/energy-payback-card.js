var N1="M7 11H9V13H7V11M21 5V19C21 20.11 20.11 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H6V1H8V3H16V1H18V3H19C20.11 3 21 3.9 21 5M5 7H19V5H5V7M19 19V9H5V19H19M15 13V11H17V13H15M11 13V11H13V13H11M7 15H9V17H7V15M15 17V15H17V17H15M11 17V15H13V17H11Z";var W1="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z";var I1="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z";var $1="M18,6H8.83L14.83,12L8.83,18H18V20H6V18L12,12L6,6V4H18V6Z";var M1=globalThis,r1=M1.ShadowRoot&&(M1.ShadyCSS===void 0||M1.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Z1=Symbol(),U1=new WeakMap,z=class{constructor(L,C,H){if(this._$cssResult$=!0,H!==Z1)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=L,this.t=C}get styleSheet(){let L=this.o,C=this.t;if(r1&&L===void 0){let H=C!==void 0&&C.length===1;H&&(L=U1.get(C)),L===void 0&&((this.o=L=new CSSStyleSheet).replaceSync(this.cssText),H&&U1.set(C,L))}return L}toString(){return this.cssText}},e1=e=>new z(typeof e=="string"?e:e+"",void 0,Z1),u=(e,...L)=>{let C=e.length===1?e[0]:L.reduce((H,V,M)=>H+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(V)+e[M+1],e[0]);return new z(C,e,Z1)},G1=(e,L)=>{if(r1)e.adoptedStyleSheets=L.map(C=>C instanceof CSSStyleSheet?C:C.styleSheet);else for(let C of L){let H=document.createElement("style"),V=M1.litNonce;V!==void 0&&H.setAttribute("nonce",V),H.textContent=C.cssText,e.appendChild(H)}},s1=r1?e=>e:e=>e instanceof CSSStyleSheet?(L=>{let C="";for(let H of L.cssRules)C+=H.cssText;return e1(C)})(e):e;var{is:w2,defineProperty:B2,getOwnPropertyDescriptor:P2,getOwnPropertyNames:T2,getOwnPropertySymbols:F2,getPrototypeOf:_2}=Object,t1=globalThis,z1=t1.trustedTypes,R2=z1?z1.emptyScript:"",D2=t1.reactiveElementPolyfillSupport,Q=(e,L)=>e,u1={toAttribute(e,L){switch(L){case Boolean:e=e?R2:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,L){let C=e;switch(L){case Boolean:C=e!==null;break;case Number:C=e===null?null:Number(e);break;case Object:case Array:try{C=JSON.parse(e)}catch{C=null}}return C}},K1=(e,L)=>!w2(e,L),Q1={attribute:!0,type:String,converter:u1,reflect:!1,useDefault:!1,hasChanged:K1};Symbol.metadata??=Symbol("metadata"),t1.litPropertyMetadata??=new WeakMap;var g=class extends HTMLElement{static addInitializer(L){this._$Ei(),(this.l??=[]).push(L)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(L,C=Q1){if(C.state&&(C.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(L)&&((C=Object.create(C)).wrapped=!0),this.elementProperties.set(L,C),!C.noAccessor){let H=Symbol(),V=this.getPropertyDescriptor(L,H,C);V!==void 0&&B2(this.prototype,L,V)}}static getPropertyDescriptor(L,C,H){let{get:V,set:M}=P2(this.prototype,L)??{get(){return this[C]},set(r){this[C]=r}};return{get:V,set(r){let t=V?.call(this);M?.call(this,r),this.requestUpdate(L,t,H)},configurable:!0,enumerable:!0}}static getPropertyOptions(L){return this.elementProperties.get(L)??Q1}static _$Ei(){if(this.hasOwnProperty(Q("elementProperties")))return;let L=_2(this);L.finalize(),L.l!==void 0&&(this.l=[...L.l]),this.elementProperties=new Map(L.elementProperties)}static finalize(){if(this.hasOwnProperty(Q("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Q("properties"))){let C=this.properties,H=[...T2(C),...F2(C)];for(let V of H)this.createProperty(V,C[V])}let L=this[Symbol.metadata];if(L!==null){let C=litPropertyMetadata.get(L);if(C!==void 0)for(let[H,V]of C)this.elementProperties.set(H,V)}this._$Eh=new Map;for(let[C,H]of this.elementProperties){let V=this._$Eu(C,H);V!==void 0&&this._$Eh.set(V,C)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(L){let C=[];if(Array.isArray(L)){let H=new Set(L.flat(1/0).reverse());for(let V of H)C.unshift(s1(V))}else L!==void 0&&C.push(s1(L));return C}static _$Eu(L,C){let H=C.attribute;return H===!1?void 0:typeof H=="string"?H:typeof L=="string"?L.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(L=>this.enableUpdating=L),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(L=>L(this))}addController(L){(this._$EO??=new Set).add(L),this.renderRoot!==void 0&&this.isConnected&&L.hostConnected?.()}removeController(L){this._$EO?.delete(L)}_$E_(){let L=new Map,C=this.constructor.elementProperties;for(let H of C.keys())this.hasOwnProperty(H)&&(L.set(H,this[H]),delete this[H]);L.size>0&&(this._$Ep=L)}createRenderRoot(){let L=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return G1(L,this.constructor.elementStyles),L}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(L=>L.hostConnected?.())}enableUpdating(L){}disconnectedCallback(){this._$EO?.forEach(L=>L.hostDisconnected?.())}attributeChangedCallback(L,C,H){this._$AK(L,H)}_$ET(L,C){let H=this.constructor.elementProperties.get(L),V=this.constructor._$Eu(L,H);if(V!==void 0&&H.reflect===!0){let M=(H.converter?.toAttribute!==void 0?H.converter:u1).toAttribute(C,H.type);this._$Em=L,M==null?this.removeAttribute(V):this.setAttribute(V,M),this._$Em=null}}_$AK(L,C){let H=this.constructor,V=H._$Eh.get(L);if(V!==void 0&&this._$Em!==V){let M=H.getPropertyOptions(V),r=typeof M.converter=="function"?{fromAttribute:M.converter}:M.converter?.fromAttribute!==void 0?M.converter:u1;this._$Em=V;let t=r.fromAttribute(C,M.type);this[V]=t??this._$Ej?.get(V)??t,this._$Em=null}}requestUpdate(L,C,H,V=!1,M){if(L!==void 0){let r=this.constructor;if(V===!1&&(M=this[L]),H??=r.getPropertyOptions(L),!((H.hasChanged??K1)(M,C)||H.useDefault&&H.reflect&&M===this._$Ej?.get(L)&&!this.hasAttribute(r._$Eu(L,H))))return;this.C(L,C,H)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(L,C,{useDefault:H,reflect:V,wrapped:M},r){H&&!(this._$Ej??=new Map).has(L)&&(this._$Ej.set(L,r??C??this[L]),M!==!0||r!==void 0)||(this._$AL.has(L)||(this.hasUpdated||H||(C=void 0),this._$AL.set(L,C)),V===!0&&this._$Em!==L&&(this._$Eq??=new Set).add(L))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(C){Promise.reject(C)}let L=this.scheduleUpdate();return L!=null&&await L,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[V,M]of this._$Ep)this[V]=M;this._$Ep=void 0}let H=this.constructor.elementProperties;if(H.size>0)for(let[V,M]of H){let{wrapped:r}=M,t=this[V];r!==!0||this._$AL.has(V)||t===void 0||this.C(V,void 0,M,t)}}let L=!1,C=this._$AL;try{L=this.shouldUpdate(C),L?(this.willUpdate(C),this._$EO?.forEach(H=>H.hostUpdate?.()),this.update(C)):this._$EM()}catch(H){throw L=!1,this._$EM(),H}L&&this._$AE(C)}willUpdate(L){}_$AE(L){this._$EO?.forEach(C=>C.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(L)),this.updated(L)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(L){return!0}update(L){this._$Eq&&=this._$Eq.forEach(C=>this._$ET(C,this[C])),this._$EM()}updated(L){}firstUpdated(L){}};g.elementStyles=[],g.shadowRootOptions={mode:"open"},g[Q("elementProperties")]=new Map,g[Q("finalized")]=new Map,D2?.({ReactiveElement:g}),(t1.reactiveElementVersions??=[]).push("2.1.2");var y1=globalThis,q1=e=>e,i1=y1.trustedTypes,j1=i1?i1.createPolicy("lit-html",{createHTML:e=>e}):void 0,V2="$lit$",O=`lit$${Math.random().toFixed(9).slice(2)}$`,L2="?"+O,E2=`<${L2}>`,b=document,q=()=>b.createComment(""),j=e=>e===null||typeof e!="object"&&typeof e!="function",k1=Array.isArray,N2=e=>k1(e)||typeof e?.[Symbol.iterator]=="function",S1=`[ 	
\f\r]`,K=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Y1=/-->/g,X1=/>/g,y=RegExp(`>|${S1}(?:([^\\s"'>=/]+)(${S1}*=${S1}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),J1=/'/g,C2=/"/g,M2=/^(?:script|style|textarea|title)$/i,b1=e=>(L,...C)=>({_$litType$:e,strings:L,values:C}),m=b1(1),m5=b1(2),n5=b1(3),w=Symbol.for("lit-noChange"),l=Symbol.for("lit-nothing"),H2=new WeakMap,k=b.createTreeWalker(b,129);function r2(e,L){if(!k1(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return j1!==void 0?j1.createHTML(L):L}var W2=(e,L)=>{let C=e.length-1,H=[],V,M=L===2?"<svg>":L===3?"<math>":"",r=K;for(let t=0;t<C;t++){let i=e[t],o,a,A=-1,p=0;for(;p<i.length&&(r.lastIndex=p,a=r.exec(i),a!==null);)p=r.lastIndex,r===K?a[1]==="!--"?r=Y1:a[1]!==void 0?r=X1:a[2]!==void 0?(M2.test(a[2])&&(V=RegExp("</"+a[2],"g")),r=y):a[3]!==void 0&&(r=y):r===y?a[0]===">"?(r=V??K,A=-1):a[1]===void 0?A=-2:(A=r.lastIndex-a[2].length,o=a[1],r=a[3]===void 0?y:a[3]==='"'?C2:J1):r===C2||r===J1?r=y:r===Y1||r===X1?r=K:(r=y,V=void 0);let n=r===y&&e[t+1].startsWith("/>")?" ":"";M+=r===K?i+E2:A>=0?(H.push(o),i.slice(0,A)+V2+i.slice(A)+O+n):i+O+(A===-2?t:n)}return[r2(e,M+(e[C]||"<?>")+(L===2?"</svg>":L===3?"</math>":"")),H]},Y=class e{constructor({strings:L,_$litType$:C},H){let V;this.parts=[];let M=0,r=0,t=L.length-1,i=this.parts,[o,a]=W2(L,C);if(this.el=e.createElement(o,H),k.currentNode=this.el.content,C===2||C===3){let A=this.el.content.firstChild;A.replaceWith(...A.childNodes)}for(;(V=k.nextNode())!==null&&i.length<t;){if(V.nodeType===1){if(V.hasAttributes())for(let A of V.getAttributeNames())if(A.endsWith(V2)){let p=a[r++],n=V.getAttribute(A).split(O),d=/([.?@])?(.*)/.exec(p);i.push({type:1,index:M,name:d[2],strings:n,ctor:d[1]==="."?h1:d[1]==="?"?g1:d[1]==="@"?O1:T}),V.removeAttribute(A)}else A.startsWith(O)&&(i.push({type:6,index:M}),V.removeAttribute(A));if(M2.test(V.tagName)){let A=V.textContent.split(O),p=A.length-1;if(p>0){V.textContent=i1?i1.emptyScript:"";for(let n=0;n<p;n++)V.append(A[n],q()),k.nextNode(),i.push({type:2,index:++M});V.append(A[p],q())}}}else if(V.nodeType===8)if(V.data===L2)i.push({type:2,index:M});else{let A=-1;for(;(A=V.data.indexOf(O,A+1))!==-1;)i.push({type:7,index:M}),A+=O.length-1}M++}}static createElement(L,C){let H=b.createElement("template");return H.innerHTML=L,H}};function P(e,L,C=e,H){if(L===w)return L;let V=H!==void 0?C._$Co?.[H]:C._$Cl,M=j(L)?void 0:L._$litDirective$;return V?.constructor!==M&&(V?._$AO?.(!1),M===void 0?V=void 0:(V=new M(e),V._$AT(e,C,H)),H!==void 0?(C._$Co??=[])[H]=V:C._$Cl=V),V!==void 0&&(L=P(e,V._$AS(e,L.values),V,H)),L}var c1=class{constructor(L,C){this._$AV=[],this._$AN=void 0,this._$AD=L,this._$AM=C}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(L){let{el:{content:C},parts:H}=this._$AD,V=(L?.creationScope??b).importNode(C,!0);k.currentNode=V;let M=k.nextNode(),r=0,t=0,i=H[0];for(;i!==void 0;){if(r===i.index){let o;i.type===2?o=new X(M,M.nextSibling,this,L):i.type===1?o=new i.ctor(M,i.name,i.strings,this,L):i.type===6&&(o=new f1(M,this,L)),this._$AV.push(o),i=H[++t]}r!==i?.index&&(M=k.nextNode(),r++)}return k.currentNode=b,V}p(L){let C=0;for(let H of this._$AV)H!==void 0&&(H.strings!==void 0?(H._$AI(L,H,C),C+=H.strings.length-2):H._$AI(L[C])),C++}},X=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(L,C,H,V){this.type=2,this._$AH=l,this._$AN=void 0,this._$AA=L,this._$AB=C,this._$AM=H,this.options=V,this._$Cv=V?.isConnected??!0}get parentNode(){let L=this._$AA.parentNode,C=this._$AM;return C!==void 0&&L?.nodeType===11&&(L=C.parentNode),L}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(L,C=this){L=P(this,L,C),j(L)?L===l||L==null||L===""?(this._$AH!==l&&this._$AR(),this._$AH=l):L!==this._$AH&&L!==w&&this._(L):L._$litType$!==void 0?this.$(L):L.nodeType!==void 0?this.T(L):N2(L)?this.k(L):this._(L)}O(L){return this._$AA.parentNode.insertBefore(L,this._$AB)}T(L){this._$AH!==L&&(this._$AR(),this._$AH=this.O(L))}_(L){this._$AH!==l&&j(this._$AH)?this._$AA.nextSibling.data=L:this.T(b.createTextNode(L)),this._$AH=L}$(L){let{values:C,_$litType$:H}=L,V=typeof H=="number"?this._$AC(L):(H.el===void 0&&(H.el=Y.createElement(r2(H.h,H.h[0]),this.options)),H);if(this._$AH?._$AD===V)this._$AH.p(C);else{let M=new c1(V,this),r=M.u(this.options);M.p(C),this.T(r),this._$AH=M}}_$AC(L){let C=H2.get(L.strings);return C===void 0&&H2.set(L.strings,C=new Y(L)),C}k(L){k1(this._$AH)||(this._$AH=[],this._$AR());let C=this._$AH,H,V=0;for(let M of L)V===C.length?C.push(H=new e(this.O(q()),this.O(q()),this,this.options)):H=C[V],H._$AI(M),V++;V<C.length&&(this._$AR(H&&H._$AB.nextSibling,V),C.length=V)}_$AR(L=this._$AA.nextSibling,C){for(this._$AP?.(!1,!0,C);L!==this._$AB;){let H=q1(L).nextSibling;q1(L).remove(),L=H}}setConnected(L){this._$AM===void 0&&(this._$Cv=L,this._$AP?.(L))}},T=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(L,C,H,V,M){this.type=1,this._$AH=l,this._$AN=void 0,this.element=L,this.name=C,this._$AM=V,this.options=M,H.length>2||H[0]!==""||H[1]!==""?(this._$AH=Array(H.length-1).fill(new String),this.strings=H):this._$AH=l}_$AI(L,C=this,H,V){let M=this.strings,r=!1;if(M===void 0)L=P(this,L,C,0),r=!j(L)||L!==this._$AH&&L!==w,r&&(this._$AH=L);else{let t=L,i,o;for(L=M[0],i=0;i<M.length-1;i++)o=P(this,t[H+i],C,i),o===w&&(o=this._$AH[i]),r||=!j(o)||o!==this._$AH[i],o===l?L=l:L!==l&&(L+=(o??"")+M[i+1]),this._$AH[i]=o}r&&!V&&this.j(L)}j(L){L===l?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,L??"")}},h1=class extends T{constructor(){super(...arguments),this.type=3}j(L){this.element[this.name]=L===l?void 0:L}},g1=class extends T{constructor(){super(...arguments),this.type=4}j(L){this.element.toggleAttribute(this.name,!!L&&L!==l)}},O1=class extends T{constructor(L,C,H,V,M){super(L,C,H,V,M),this.type=5}_$AI(L,C=this){if((L=P(this,L,C,0)??l)===w)return;let H=this._$AH,V=L===l&&H!==l||L.capture!==H.capture||L.once!==H.once||L.passive!==H.passive,M=L!==l&&(H===l||V);V&&this.element.removeEventListener(this.name,this,H),M&&this.element.addEventListener(this.name,this,L),this._$AH=L}handleEvent(L){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,L):this._$AH.handleEvent(L)}},f1=class{constructor(L,C,H){this.element=L,this.type=6,this._$AN=void 0,this._$AM=C,this.options=H}get _$AU(){return this._$AM._$AU}_$AI(L){P(this,L)}};var I2=y1.litHtmlPolyfillSupport;I2?.(Y,X),(y1.litHtmlVersions??=[]).push("3.3.3");var e2=(e,L,C)=>{let H=C?.renderBefore??L,V=H._$litPart$;if(V===void 0){let M=C?.renderBefore??null;H._$litPart$=V=new X(L.insertBefore(q(),M),M,void 0,C??{})}return V._$AI(e),V};var w1=globalThis,Z=class extends g{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let L=super.createRenderRoot();return this.renderOptions.renderBefore??=L.firstChild,L}update(L){let C=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(L),this._$Do=e2(C,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return w}};Z._$litElement$=!0,Z.finalized=!0,w1.litElementHydrateSupport?.({LitElement:Z});var $2=w1.litElementPolyfillSupport;$2?.({LitElement:Z});(w1.litElementVersions??=[]).push("4.2.2");var B1={title:"Balance","category.pv":"PV plant","category.heat_pump":"Heat pump","category.wallbox":"Electric car",show_yearly:"Show yearly figures",show_total:"Show totals",not_set_up:"Set up the Energy Payback integration to see what your PV plant, heat pump, and electric car have saved.",calculating_all:"The past is being computed \u2026",calculating:"Being computed \u2026",saved_invested:"{saved} saved, {invested} invested",saved_only:"{saved} saved",of_investment:"{percent} of {investment}",paid_off:"paid off",since:"since {date}",heat_estimated:"heat partly estimated",instead_heat_pump:"no extra cost entered",instead_wallbox:"no extra cost entered",instead_pv:"no purchase cost entered",in_the_plus_from:"In the plus from about {date}",in_the_plus:"In the plus",yearly_after_twelve:"Yearly figures after twelve months of data.",yearly_from:"Yearly figure from {date}",pays_off_in:"pays off in about {years}",years_one:"1 year",years_other:"{count} years",under_one_year:"less than a year",return_per_year:"paid off, {percent} return per year",instead_of_gas:"instead of gas",instead_of_oil:"instead of oil",instead_of_fuel:"instead of fuel",per_year:"{amount}/year",gas:"Gas {price}/kWh",oil:"Oil {price}/l",fuel:"Fuel {price}/l",prices_link:"Change the prices",progress:"{name}: {percent} of the investment saved",history_title:"Savings",history_total:"Total",history_no_chart:"The chart is only shown in Home Assistant.",history_failed:"The statistics could not be loaded.",history_empty:"No savings in this period.",figures_title:"Key figures",figures_failed:"The figures could not be loaded.",figures_unavailable:"not available","figure.energy":"Consumption","figure.energy.grid":"Grid import","figure.energy.solar":"Solar production","figure.cost":"Costs","figure.cost.grid":"Grid costs","figure.price":"Average price","figure.solar_share":"Solar share","figure.solar_share.household":"Self-sufficiency","figure.cheap_share":"Cheap grid power","figure.expensive_share":"Expensive grid power","figure.self_consumption":"Self-consumption","figure.export":"Feed-in","figure.saving":"Saving","figure.forecast_today":"Forecast today","figure.forecast_tomorrow":"Forecast tomorrow",line_solar_part:"{percent} of it solar power",line_exported:"{energy} fed in",line_average_price:"average {price}",line_for_import:"for {energy} imported",line_cost_for:"{cost} for {energy}",line_from_solar:"{part} of {whole} from solar",line_of_grid:"{part} of {whole} grid power",line_self_used:"{part} of {whole} used in the house","value.change":"total in the period","value.mean":"average","value.min":"minimum","value.max":"maximum",value_range:"from {min} to {max}",value_current:"current value","period.energy_date":"Follow the date selection","period.today":"Today","period.yesterday":"Yesterday","period.this_month":"This month","period.last_month":"Last month","period.this_year":"This year","period.last_year":"Last year",editor_title:"Title (optional)",editor_period:"Period",editor_period_hint:"Without a date selection on the dashboard: this month.",editor_columns:"Columns",editor_columns_auto:"Auto",editor_tiles:"Tiles",editor_add_tile:"Add tile",editor_edit_tile:"Edit tile {number}",editor_back:"Back",editor_edit:"Edit",editor_remove:"Remove",editor_source:"Source","source.energy":"Energy data","source.statistic":"Statistic","source.entity":"Entity",editor_area:"Area",editor_figure:"Figure",editor_statistic:"Statistic",editor_value:"Value",editor_secondary:"Line below","secondary.none":"Default","secondary.range":"Range of the period",editor_entity:"Entity",editor_name:"Name (optional)",editor_not_loaded:"Energy data need the Energy Payback integration.","source.solar":"Solar power","source.grid":"Grid power","source.normal":"Normal grid power","source.cheap":"Cheap grid power","source.expensive":"Expensive grid power","stack.source":"By source","stack.consumer":"By consumer","stack.none":"Not stacked",editor_savings:"Savings of all categories",editor_stack:"Stacking",editor_line:"Line",editor_lines:"Further lines from statistics",editor_line_none:"None",history_empty_figure:"No data in this period."},U2={title:"Bilanz","category.pv":"PV-Anlage","category.heat_pump":"W\xE4rmepumpe","category.wallbox":"E-Auto",show_yearly:"Jahreswerte zeigen",show_total:"Gesamtwerte zeigen",not_set_up:"Richte die Integration Energy Payback ein, um zu sehen, was PV-Anlage, W\xE4rmepumpe und E-Auto gespart haben.",calculating_all:"Die Vergangenheit wird nachgerechnet \u2026",calculating:"Wird berechnet \u2026",saved_invested:"{saved} gespart, {invested} investiert",saved_only:"{saved} gespart",of_investment:"{percent} von {investment}",paid_off:"amortisiert",since:"seit {date}",heat_estimated:"W\xE4rme teilweise gesch\xE4tzt",instead_heat_pump:"ohne Mehrkosten",instead_wallbox:"ohne Mehrkosten",instead_pv:"ohne Anschaffungskosten",in_the_plus_from:"Im Plus ab etwa {date}",in_the_plus:"Im Plus",yearly_after_twelve:"Jahreswerte gibt es nach zw\xF6lf Monaten Daten.",yearly_from:"Jahreswert ab {date}",pays_off_in:"amortisiert in etwa {years}",years_one:"1 Jahr",years_other:"{count} Jahren",under_one_year:"weniger als einem Jahr",return_per_year:"amortisiert, {percent} Rendite pro Jahr",instead_of_gas:"statt Gas",instead_of_oil:"statt \xD6l",instead_of_fuel:"statt Sprit",per_year:"{amount}/Jahr",gas:"Gas {price}/kWh",oil:"\xD6l {price}/l",fuel:"Sprit {price}/l",prices_link:"Preise \xE4ndern",progress:"{name}: {percent} der Investition gespart",history_title:"Ersparnis",history_total:"Summe",history_no_chart:"Das Diagramm erscheint nur in Home Assistant.",history_failed:"Die Statistik konnte nicht geladen werden.",history_empty:"Keine Ersparnis in diesem Zeitraum.",figures_title:"Kennzahlen",figures_failed:"Die Kennzahlen konnten nicht geladen werden.",figures_unavailable:"nicht verf\xFCgbar","figure.energy":"Verbrauch","figure.energy.grid":"Netzbezug","figure.energy.solar":"Solarertrag","figure.cost":"Kosten","figure.cost.grid":"Netzkosten","figure.price":"\xF8 Strompreis","figure.solar_share":"Solaranteil","figure.solar_share.household":"Autarkie","figure.cheap_share":"G\xFCnstiger Netzstrom","figure.expensive_share":"Teurer Netzstrom","figure.self_consumption":"Eigenverbrauch","figure.export":"Einspeisung","figure.saving":"Ersparnis","figure.forecast_today":"Prognose heute","figure.forecast_tomorrow":"Prognose morgen",line_solar_part:"davon {percent} Solarstrom",line_exported:"{energy} eingespeist",line_average_price:"\xF8 {price}",line_for_import:"f\xFCr {energy} Netzbezug",line_cost_for:"{cost} f\xFCr {energy}",line_from_solar:"{part} von {whole} aus Solar",line_of_grid:"{part} von {whole} Netzstrom",line_self_used:"{part} von {whole} im Haus genutzt","value.change":"Summe im Zeitraum","value.mean":"Mittelwert","value.min":"Minimum","value.max":"Maximum",value_range:"von {min} bis {max}",value_current:"aktueller Wert","period.energy_date":"Der Datumsauswahl folgen","period.today":"Heute","period.yesterday":"Gestern","period.this_month":"Dieser Monat","period.last_month":"Letzter Monat","period.this_year":"Dieses Jahr","period.last_year":"Letztes Jahr",editor_title:"Titel (optional)",editor_period:"Zeitraum",editor_period_hint:"Ohne Datumsauswahl auf dem Dashboard: dieser Monat.",editor_columns:"Spalten",editor_columns_auto:"Auto",editor_tiles:"Kacheln",editor_add_tile:"Kachel hinzuf\xFCgen",editor_edit_tile:"Kachel {number} bearbeiten",editor_back:"Zur\xFCck",editor_edit:"Bearbeiten",editor_remove:"Entfernen",editor_source:"Quelle","source.energy":"Energiedaten","source.statistic":"Statistik","source.entity":"Entit\xE4t",editor_area:"Bereich",editor_figure:"Gr\xF6\xDFe",editor_statistic:"Statistik",editor_value:"Wert",editor_secondary:"Unterzeile","secondary.none":"Standard","secondary.range":"Spanne im Zeitraum",editor_entity:"Entit\xE4t",editor_name:"Name (optional)",editor_not_loaded:"Energiedaten brauchen die Integration Energy Payback.","source.solar":"Solarstrom","source.grid":"Netzstrom","source.normal":"Normaler Netzstrom","source.cheap":"G\xFCnstiger Netzstrom","source.expensive":"Teurer Netzstrom","stack.source":"Nach Quelle","stack.consumer":"Nach Verbraucher","stack.none":"Nicht gestapelt",editor_savings:"Ersparnisse aller Kategorien",editor_stack:"Stapelung",editor_line:"Linie",editor_lines:"Weitere Linien aus Statistiken",editor_line_none:"Keine",history_empty_figure:"Keine Daten in diesem Zeitraum."},G2={en:B1,de:U2},o1=e=>e in B1;function h(e){let L=G2[e.split("-")[0]]??B1;return(C,H={})=>L[C].replace(/\{(\w+)\}/g,(V,M)=>H[M]??"")}var s="energy_payback",P1=["pv","heat_pump","wallbox"];var a1=e=>{if(e==null||e==="")return null;let L=Number(e);return Number.isFinite(L)?L:null},t2=e=>typeof e=="string"&&e?new Date(e):null;function F(e){let L=Object.values(e.entities??{}).filter(M=>M.platform===s),C=(M,r)=>L.find(t=>t.device_id===M&&t.translation_key===r),H=M=>M?a1(e.states[M]?.state):null,V=[];for(let M of L){if(M.translation_key!=="saving")continue;let r=e.states[M.entity_id];if(!r||r.state==="unavailable")continue;let t=r.attributes,i=t.category;P1.includes(i)&&V.push({category:i,savingStatistic:typeof t.statistic_id=="string"?t.statistic_id:`${s}:${i}_saving`,calculating:t.calculating===!0,saving:a1(r.state),investment:a1(t.investment),payback:H(C(M.device_id,"payback")?.entity_id),perYear:H(C(M.device_id,"saving_per_year")?.entity_id),countingSince:t2(t.counting_since),yearlyFrom:t2(t.yearly_from),price:a1(t.price),heating:t.heating==="gas"||t.heating==="oil"?t.heating:null,heatEstimated:t.heat_estimated===!0})}return V.sort((M,r)=>P1.indexOf(M.category)-P1.indexOf(r.category))}function i2(e,L=new Date){let C=e.some(a=>a.calculating),H=e.reduce((a,A)=>a+(A.saving??0),0),V=e.reduce((a,A)=>a+(A.investment??0),0),M=!C&&e.length>0,r=M?H-V:null,t=e.every(a=>a.perYear!==null),i=M&&t?e.reduce((a,A)=>a+(A.perYear??0),0):null,o=null;return r!==null&&i!==null&&(r>=0?o=L:i>0&&(o=new Date(L.getTime()+-r/i*12*26298e5))),{saved:H,invested:V,balance:r,perYear:i,inThePlusFrom:o,calculating:C}}function o2(e){let{investment:L,saving:C,perYear:H}=e;return L===null||L<=0||C===null||H===null||H<=0?null:Math.max(0,(L-C)/H)}function a2(e){let{investment:L,saving:C,perYear:H}=e;return L===null||L<=0||C===null||H===null||C<L?null:H/L*100}var _=u`
  :host {
    --energy-payback-pv-color: var(--energy-solar-color, #ff9800);
    --energy-payback-heat-pump-color: var(--energy-gas-color, #8e021b);
    --energy-payback-wallbox-color: var(--energy-non-fossil-color, #0f9d58);
  }
  ha-card {
    height: 100%;
    overflow: hidden;
  }
  .header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 8px 0 16px;
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
  .chip {
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    padding: 4px 8px;
    border-radius: 8px;
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
`;var A2="energy-payback-card-view",z2=()=>{try{return localStorage.getItem(A2)==="yearly"?"yearly":"total"}catch{return"total"}},R=class extends Z{constructor(){super(...arguments);this._view=z2()}static getStubConfig(){return{}}static getConfigForm(){return{schema:[]}}setConfig(C){}getCardSize(){return 4}getGridOptions(){return{columns:12,min_columns:6}}get _localize(){return h(this.hass?.locale?.language??this.hass?.language??"en")}get _language(){return this.hass?.locale?.language??"en"}_money(C,H=!1){return new Intl.NumberFormat(this._language,{style:"currency",currency:this.hass?.config.currency??"EUR",maximumFractionDigits:0,minimumFractionDigits:0,signDisplay:H?"exceptZero":"auto"}).format(C)}_price(C){return new Intl.NumberFormat(this._language,{style:"currency",currency:this.hass?.config.currency??"EUR",maximumFractionDigits:4,minimumFractionDigits:2}).format(C)}_percent(C){return new Intl.NumberFormat(this._language,{style:"percent",maximumFractionDigits:0}).format(C/100)}_month(C){return new Intl.DateTimeFormat(this._language,{month:"long",year:"numeric"}).format(C)}_years(C){let H=this._localize;if(C<1)return H("under_one_year");let V=Math.round(C);return V===1?H("years_one"):H("years_other",{count:String(V)})}_toggleView(){this._view=this._view==="total"?"yearly":"total";try{localStorage.setItem(A2,this._view)}catch{}}_openIntegration(){history.pushState(null,"",`/config/integrations/integration/${s}`),window.dispatchEvent(new CustomEvent("location-changed"))}render(){let C=this._localize;if(!this.hass)return m``;let H=F(this.hass);if(!H.length)return m`<ha-card>
        <div class="header"><h2 class="title">${C("title")}</h2></div>
        <p class="summary">${C("not_set_up")}</p>
      </ha-card>`;let V=i2(H),M=this._view==="yearly";return m`<ha-card>
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
            <path d=${M?$1:N1}></path>
          </svg>
        </button>
      </div>
      <p class="summary">${this._summary(V,H,M)}</p>
      <ul class="rows">
        ${H.map(r=>this._row(r,M))}
      </ul>
      ${this._footer(H)}
    </ha-card>`}_chip(C,H){let V=this._localize,M=null;return H?C.perYear!==null&&(M=V("per_year",{amount:this._money(C.perYear,!0)})):C.balance!==null?M=this._money(C.balance,!0):C.calculating||(M=this._money(C.saved)),M===null?l:m`<span class="chip">${M}</span>`}_summary(C,H,V){let M=this._localize;return C.calculating?M("calculating_all"):V?C.inThePlusFrom===null?H.some(r=>r.perYear===null)?M("yearly_after_twelve"):"":C.balance!==null&&C.balance>=0?M("in_the_plus"):M("in_the_plus_from",{date:this._month(C.inThePlusFrom)}):C.invested>0?M("saved_invested",{saved:this._money(C.saved),invested:this._money(C.invested)}):M("saved_only",{saved:this._money(C.saved)})}_row(C,H){let V=this._localize,M=V(`category.${C.category}`),r="\u2013";return C.calculating||(H&&C.perYear!==null?r=V("per_year",{amount:this._money(C.perYear)}):!H&&C.saving!==null&&(r=this._money(C.saving))),m`<li class="row ${C.category}">
      <span class="swatch" aria-hidden="true"></span>
      <div class="row-body">
        <div class="line">
          <span>${M}</span>
          <span class="amount ${r==="\u2013"?"waiting":""}">${r}</span>
        </div>
        <div class="sub">
          ${C.calculating?V("calculating"):H?this._yearlyDetail(C):this._totalDetail(C,M)}
        </div>
        ${C.calculating?l:this._since(C)}
      </div>
    </li>`}_since(C){let H=this._localize,V=[];return C.countingSince&&V.push(H("since",{date:this._month(C.countingSince)})),C.heatEstimated&&V.push(H("heat_estimated")),V.length?m`<div class="sub since">${V.join(" \xB7 ")}</div>`:l}_totalDetail(C,H){let V=this._localize;if(C.investment&&C.payback!==null){let M=Math.max(0,C.payback),r=this._percent(C.payback);return m`<div class="meter">
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
      </div>`}return V(`instead_${C.category}`)}_yearlyDetail(C){let H=this._localize;if(C.perYear===null)return C.yearlyFrom?H("yearly_from",{date:this._month(C.yearlyFrom)}):"";let V=a2(C);if(V!==null)return H("return_per_year",{percent:this._percent(V)});let M=o2(C);return M!==null?H("pays_off_in",{years:this._years(M)}):C.category==="heat_pump"?H(C.heating==="oil"?"instead_of_oil":"instead_of_gas"):C.category==="wallbox"?H("instead_of_fuel"):""}_footer(C){let H=this._localize,V=[];for(let M of C){if(M.price===null)continue;let r=this._price(M.price);M.category==="heat_pump"&&V.push(H(M.heating==="oil"?"oil":"gas",{price:r})),M.category==="wallbox"&&V.push(H("fuel",{price:r}))}return V.length?m`<div class="footer">
      <button
        class="prices"
        type="button"
        title=${H("prices_link")}
        aria-label=${`${H("prices_link")}: ${V.join(", ")}`}
        @click=${this._openIntegration}
      >
        ${V.join(" \xB7 ")}
      </button>
    </div>`:l}};R.properties={hass:{attribute:!1},_view:{state:!0}},R.styles=[_,u`
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
        --color: var(--energy-payback-pv-color);
      }
      .heat_pump {
        --color: var(--energy-payback-heat-pump-color);
      }
      .wallbox {
        --color: var(--energy-payback-wallbox-color);
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
    `];var Q2=e=>!!e&&typeof e.subscribe=="function";function K2(e){let L=location.pathname.split("/")[1]??"",C=e;for(let H of[`_energy_${L}`,"_energy"])if(Q2(C[H]))return C[H]}var q2=()=>new Date().setHours(24,0,0,0)-1;function A1(e,L){let C,H,V=0,M=()=>{let r=K2(e);if(r){C=r.subscribe(t=>L({start:new Date(t.start).getTime(),end:t.end?new Date(t.end).getTime():q2()}));return}V+=1,V===2&&L(null),V<20&&(H=window.setTimeout(M,500))};return M(),()=>{window.clearTimeout(H),C?.()}}function d1(e,L){let C=(M,r)=>{let t=Math.abs(M),i=r??(t<10?2:t<100?1:0);return new Intl.NumberFormat(e,{maximumFractionDigits:i,minimumFractionDigits:r??0}).format(M)};return{number:C,value:(M,r)=>{switch(r){case"energy":return`${C(M,Math.abs(M)<100?1:0)} kWh`;case"money":{let t=Math.abs(M)<100;return new Intl.NumberFormat(e,{style:"currency",currency:L,maximumFractionDigits:t?2:0,minimumFractionDigits:t?2:0}).format(M)}case"price":return L==="EUR"?`${C(M*100,1)} ct/kWh`:`${new Intl.NumberFormat(e,{style:"currency",currency:L,maximumFractionDigits:3}).format(M)}/kWh`;case"percent":return new Intl.NumberFormat(e,{style:"percent",maximumFractionDigits:0}).format(M/100);case"number":return C(M,Math.abs(M)<100?1:0)}},currencySymbol:()=>new Intl.NumberFormat(e,{style:"currency",currency:L}).formatToParts(0).find(M=>M.type==="currency")?.value??""}}var T1={energy:["energy"],cost:["cost"],price:["cost","energy","solar"],solar_share:["solar","energy"],cheap_share:["cheap","solar","energy"],expensive_share:["expensive","solar","energy"],self_consumption:["self_used","energy"],export:["export"],saving:["saving"],forecast_today:[],forecast_tomorrow:[]},j2={energy:["solar","export"],cost:["energy","solar"]},Y2=Object.keys(T1),m1=e=>e==="forecast_today"||e==="forecast_tomorrow";function f(e){return Y2.filter(L=>m1(L)?e.forecast===!0:T1[L].every(C=>e.statistics[C]?.length))}function d2(e,L){return[...T1[L],...j2[L]??[]].flatMap(C=>e.statistics[C]??[])}var p1=(e,L)=>L>0?e/L*100:null;function D(e,L,C,H){let V=C("energy"),M=C("solar"),r=i=>({value:i,unit:"energy"}),t=i=>({value:i,unit:"number"});switch(e){case"energy":{if(V!==null&&M!==null&&V>0){let o=p1(M,V)??0;return{value:V,unit:"energy",line:{key:"line_solar_part",values:{percent:{value:o,unit:"percent"}}}}}let i=C("export");return L.kind==="grid"&&i!==null?{value:V,unit:"energy",line:{key:"line_exported",values:{energy:r(i)}}}:{value:V,unit:"energy"}}case"cost":{let i=C("cost");return i!==null&&V&&M!==null?{value:i,unit:"money",line:{key:"line_average_price",values:{price:{value:i/V,unit:"price"}}}}:i!==null&&V!==null&&L.kind==="grid"?{value:i,unit:"money",line:{key:"line_for_import",values:{energy:r(V)}}}:{value:i,unit:"money"}}case"price":{let i=C("cost");return i===null||!V?{value:null,unit:"price"}:{value:i/V,unit:"price",line:{key:"line_cost_for",values:{cost:{value:i,unit:"money"},energy:r(V)}}}}case"solar_share":{if(V===null||M===null)return{value:null,unit:"percent"};let i=p1(M,V);return{value:i,unit:"percent",bar:i??0,line:{key:"line_from_solar",values:{part:t(M),whole:r(V)}}}}case"cheap_share":case"expensive_share":{let i=C(e==="cheap_share"?"cheap":"expensive");if(V===null||M===null||i===null)return{value:null,unit:"percent"};let o=Math.max(V-M,0),a=p1(i,o);return{value:a,unit:"percent",bar:a??0,line:{key:"line_of_grid",values:{part:t(i),whole:r(o)}}}}case"self_consumption":{let i=C("self_used");if(V===null||i===null)return{value:null,unit:"percent"};let o=p1(i,V);return{value:o,unit:"percent",bar:o??0,line:{key:"line_self_used",values:{part:t(i),whole:r(V)}}}}case"export":return{value:C("export"),unit:"energy"};case"saving":return{value:C("saving"),unit:"money"};case"forecast_today":case"forecast_tomorrow":return{value:H,unit:"energy"}}}var p2=["change","mean","min","max"],S=e=>e.statistic!==void 0?"statistic":e.entity!==void 0?"entity":"energy";function E({start:e,end:L}){let C=L-e;return C<=2*864e5+36e5?"hour":C<=95*864e5?"day":C<=3*366*864e5?"month":"year"}var n1=e=>e==="year"?"month":e,X2=(e,L)=>{let C=new Date(e);return L==="hour"?C.setMinutes(0,0,0):(C.setHours(0,0,0,0),L==="day"||(C.setDate(1),L==="month")?C.getTime():C.setMonth(0))},J2=(e,L)=>{let C=new Date(e);return L==="hour"?C.setHours(C.getHours()+1):L==="day"?C.setDate(C.getDate()+1):L==="month"?C.setMonth(C.getMonth()+1):C.setFullYear(C.getFullYear()+1),C.getTime()};function m2({start:e,end:L},C){let H=[];for(let V=X2(e,C);V<=L&&H.length<400;V=J2(V,C))H.push(V);return H}function n2(e,L=new Date){let C=e.filter(V=>V!==null).map(V=>V.getFullYear()),H=Math.min(L.getFullYear(),...C);return{start:new Date(H,0,1).getTime(),end:new Date(L.getFullYear()+1,0,1).getTime()-1}}function F1(e,L,C){let H=L.map(()=>null),V=C==="hour"?0:12*36e5;for(let M of e??[]){if(M.change===null||M.change===void 0)continue;let r=(typeof M.start=="number"?M.start:Date.parse(M.start))+V,t=-1;for(let i=0;i<L.length&&L[i]<=r;i+=1)t=i;t<0||(H[t]=(H[t]??0)+M.change)}return H}function N(e,L=new Date){let C=(r,t)=>({start:r.getTime(),end:t.getTime()-1}),H=L.getFullYear(),V=L.getMonth(),M=L.getDate();switch(e){case"today":return C(new Date(H,V,M),new Date(H,V,M+1));case"yesterday":return C(new Date(H,V,M-1),new Date(H,V,M));case"this_month":return C(new Date(H,V,1),new Date(H,V+1,1));case"last_month":return C(new Date(H,V-1,1),new Date(H,V,1));case"this_year":return C(new Date(H,0,1),new Date(H+1,0,1));case"last_year":return C(new Date(H-1,0,1),new Date(H,0,1))}}function l1({start:e,end:L},C){let H=new Date(e),V=new Date(L),M=(i,o)=>new Intl.DateTimeFormat(C,i).format(o);if(H.toDateString()===V.toDateString())return M({day:"numeric",month:"short"},H);let t=H.getDate()===1&&new Date(L+1).getDate()===1;return t&&H.getMonth()===0&&V.getMonth()===11&&H.getFullYear()===V.getFullYear()?M({year:"numeric"},H):t&&H.getMonth()===V.getMonth()&&H.getFullYear()===V.getFullYear()?M({month:"short",year:"numeric"},H):new Intl.DateTimeFormat(C,{day:"numeric",month:"short"}).formatRange(H,V)}function l2(e,L,C){let H=L.map(()=>0),V=L.map(()=>0),M=C==="hour"?0:12*36e5;for(let r of e??[]){if(r.mean===null||r.mean===void 0)continue;let t=(typeof r.start=="number"?r.start:Date.parse(r.start))+M,i=-1;for(let o=0;o<L.length&&L[o]<=t;o+=1)i=o;i<0||(H[i]+=r.mean,V[i]+=1)}return H.map((r,t)=>V[t]?r/V[t]:null)}var J=["energy_date","today","yesterday","this_month","last_month","this_year","last_year"];function c(e,L,C){let H=`figure.${L}.${C.kind}`,V=e(o1(H)?H:`figure.${L}`);return["device","other","category"].includes(C.kind)?`${C.name} ${V}`:V}var v2=300*1e3,C5={solar_share:"var(--energy-solar-color, #ff9800)",self_consumption:"var(--energy-solar-color, #ff9800)",cheap_share:"var(--success-color, #43a047)",expensive_share:"var(--error-color, #db4437)"},_1=e=>e.toDateString();function H5(e){let L=new Date,C=_1(L),H=_1(new Date(L.getFullYear(),L.getMonth(),L.getDate()+1)),V={today:null,tomorrow:null};for(let M of Object.values(e??{}))for(let[r,t]of Object.entries(M.wh_hours??{})){let i=_1(new Date(r));i===C&&(V.today=(V.today??0)+t/1e3),i===H&&(V.tomorrow=(V.tomorrow??0)+t/1e3)}return V}var W=class extends Z{constructor(){super(...arguments);this._infoAt=0;this._infoLoading=!1}static getStubConfig(){return{period:"energy_date",tiles:[{area:"household",figure:"cost"},{area:"household",figure:"solar_share"}]}}static getConfigElement(){return document.createElement("energy-payback-figures-card-editor")}setConfig(C){if(!C||C.tiles!==void 0&&!Array.isArray(C.tiles))throw new Error("tiles must be a list");this._config=C}getCardSize(){return 1+2*Math.ceil((this._config?.tiles?.length??1)/2)}getGridOptions(){return{columns:12,min_columns:3}}connectedCallback(){super.connectedCallback(),this._follow()}disconnectedCallback(){super.disconnectedCallback(),this._unfollow?.(),this._unfollow=void 0}get _localize(){return h(this.hass?.locale?.language??this.hass?.language??"en")}get _language(){return this.hass?.locale?.language??"en"}get _period(){return this._config?.period??"energy_date"}get _tiles(){return this._config?.tiles??[]}_follow(){this._period==="energy_date"&&(this._unfollow||!this.isConnected||!this.hass?.connection||(this._unfollow=A1(this.hass.connection,C=>{this._selected=C})))}_range(){let C=this._period;if(C!=="energy_date")return N(C);if(this._selected!==void 0)return this._selected??N("this_month")}_area(C){return this._info?.areas.find(H=>H.id===C)}_figure(C){let H=this._area(C.area);if(!(!H||!C.figure||!f(H).includes(C.figure)))return{area:H,figure:C.figure}}async _loadInfo(){if(!(!this.hass||this._infoLoading)){this._infoLoading=!0;try{this._info=await this.hass.callWS({type:`${s}/figures`})}catch{this._info=null}this._infoAt=Date.now(),this._infoLoading=!1}}_request(){let C=this._range();if(!C)return;let H=this._tiles;if(H.some(o=>S(o)==="energy")&&this._info===void 0)return;let M=new Set,r=new Set,t=!1;for(let o of H){let a=S(o);if(a==="statistic"&&o.statistic)M.add(o.statistic),r.add(o.statistic);else if(a==="energy"){let A=this._figure(o);if(!A)continue;m1(A.figure)&&(t=!0),d2(A.area,A.figure).forEach(p=>M.add(p))}}let i=[...M].sort();return{key:JSON.stringify([i,C.start,C.end,t]),range:C,ids:i,statistics:[...r].sort(),forecast:t}}async _load(C){if(!this.hass)return;this._loading=C.key;let H=n1(E(C.range)),V={key:C.key,at:Date.now(),range:C.range,period:H,rows:{},metadata:{},forecast:{today:null,tomorrow:null},failed:!1};try{let[M,r,t]=await Promise.all([C.ids.length?this.hass.callWS({type:"recorder/statistics_during_period",start_time:new Date(C.range.start).toISOString(),end_time:new Date(C.range.end+1).toISOString(),statistic_ids:C.ids,period:H,types:["change","mean","min","max"],units:{energy:"kWh"}}):Promise.resolve({}),C.statistics.length?this.hass.callWS({type:"recorder/get_statistics_metadata",statistic_ids:C.statistics}):Promise.resolve([]),C.forecast?this.hass.callWS({type:"energy/solar_forecast"}):Promise.resolve({})]);V.rows=M,V.metadata=Object.fromEntries(r.map(i=>[i.statistic_id,i])),V.forecast=H5(t)}catch{V.failed=!0}this._loading===C.key&&(this._loading=void 0,this._loaded=V)}willUpdate(C){if(!this.hass)return;(C.has("hass")||C.has("_config"))&&this._follow();let H=Date.now()-this._infoAt>v2;(this._info===void 0||H)&&!this._infoLoading&&this._loadInfo();let V=this._request(),M=!this._loaded||Date.now()-this._loaded.at>v2;V&&V.key!==this._loading&&(V.key!==this._loaded?.key||M&&!this._loading)&&this._load(V)}get _fmt(){return d1(this._language,this.hass?.config.currency??"EUR")}_number(C,H){return this._fmt.number(C,H)}_format(C,H){return this._fmt.value(C,H)}_rows(C){let H=this._loaded;if(!H)return[];let V=H.period==="hour"?0:12*36e5;return(H.rows[C]??[]).filter(M=>{let r=(typeof M.start=="number"?M.start:Date.parse(M.start))+V;return r>=H.range.start&&r<=H.range.end})}_sum(C){let H=0;for(let V of C??[])for(let M of this._rows(V))H+=M.change??0;return H}_energyTile(C){let H=this._localize,V=this._figure(C);if(!V)return this._tile(C.name??C.figure??"","\u2013",H("figures_unavailable"));let{area:M,figure:r}=V,t=C.name??c(this._localize,r,M);if(this._info?.calculating&&!m1(r))return this._tile(t,"\u2026",H("calculating"));if(!this._loaded||this._loaded.failed)return this._tile(t,"\u2013");let i=r==="forecast_today"?this._loaded.forecast.today:r==="forecast_tomorrow"?this._loaded.forecast.tomorrow:null,o=D(r,M,A=>M.statistics[A]?this._sum(M.statistics[A]):null,i),a=o.line?H(o.line.key,Object.fromEntries(Object.entries(o.line.values).map(([A,p])=>[A,this._format(p.value,p.unit)]))):void 0;return this._tile(t,o.value===null?"\u2013":this._format(o.value,o.unit),a,o.bar,C5[r])}_statisticTile(C){let H=this._localize,V=C.statistic??"",M=this._loaded?.metadata[V],r=C.name??M?.name??this.hass?.states[V]?.attributes.friendly_name??V,t=this._rows(V),i=M?.unit_class==="energy"?"kWh":M?.statistics_unit_of_measurement??"",o=d=>d===null?"\u2013":`${this._number(d)}${i?` ${i}`:""}`,a=d=>t.map(x=>x[d]).filter(x=>typeof x=="number"),A=C.value??"change",p=null;if(A==="change")p=t.length?t.reduce((d,x)=>d+(x.change??0),0):null;else if(A==="mean"){let d=a("mean");p=d.length?d.reduce((x,G)=>x+G,0)/d.length:null}else{let d=a(A);p=d.length?A==="min"?Math.min(...d):Math.max(...d):null}let n=H(`value.${A}`);if(C.secondary==="range"){let d=a("min"),x=a("max");d.length&&x.length&&(n=H("value_range",{min:o(Math.min(...d)),max:o(Math.max(...x))}))}return this._tile(r,this._loaded?.failed?"\u2013":o(p),n)}_entityTile(C){let H=this._localize,V=this.hass?.states[C.entity??""],M=C.name??V?.attributes.friendly_name??C.entity??"";if(!V)return this._tile(M,"\u2013",H("figures_unavailable"));let r=Number(V.state),t=V.attributes.unit_of_measurement,i=V.state!==""&&Number.isFinite(r)?`${this._number(r)}${t?` ${t}`:""}`:V.state;return this._tile(M,i,H("value_current"))}_tile(C,H,V,M,r){return m`<div class="tile">
      <div class="label">${C}</div>
      <div class="value">${H}</div>
      ${M!==void 0?m`<div class="track" role="presentation">
            <div
              class="fill"
              style="width: ${Math.min(Math.max(M,0),100)}%; background: ${r??"var(--primary-color)"}"
            ></div>
          </div>`:l}
      ${V?m`<div class="line">${V}</div>`:l}
    </div>`}render(){if(!this.hass||!this._config)return m``;let C=this._localize,H=this._range(),V=this._config.columns,M=!!V&&V>=1&&V<=4;return m`<ha-card lang=${this._language}>
      <div class="header">
        <h2 class="title">${this._config.title??""}</h2>
        ${H?m`<span class="chip">${l1(H,this._language)}</span>`:l}
      </div>
      ${this._loaded?.failed?m`<p class="summary">${C("figures_failed")}</p>`:l}
      <div class="content">
      <div
        class="tiles ${M?"fixed":""}"
        style=${M?`--columns: ${V}`:""}
      >
        ${this._tiles.map(r=>{let t=S(r);return t==="statistic"?this._statisticTile(r):t==="entity"?this._entityTile(r):this._energyTile(r)})}
      </div>
      </div>
    </ha-card>`}};W.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0},_selected:{state:!0},_loaded:{state:!0}},W.styles=[_,u`
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
        font-size: 28px;
        line-height: 1.15;
        color: var(--primary-text-color);
      }
      @container (max-width: 150px) {
        .value {
          font-size: 22px;
        }
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
    `];var x2;function u2(){if(customElements.get("ha-chart-base"))return Promise.resolve(!0);let e=window.loadCardHelpers;return e?(x2??=(async()=>{try{(await e()).createCardElement({type:"statistics-graph",entities:[]})}catch{}let L=new Promise(C=>setTimeout(()=>C(!1),1e4));return Promise.race([customElements.whenDefined("ha-chart-base").then(()=>!0),L])})(),x2):Promise.resolve(!1)}var Z2=e=>Math.round(e*255).toString(16).padStart(2,"0");function V5(e,L){let C=e.trim();if(/^#[0-9a-f]{6}$/i.test(C))return C+Z2(L);if(/^#[0-9a-f]{3}$/i.test(C))return`#${[...C.slice(1)].map(V=>V+V).join("")}${Z2(L)}`;let H=C.match(/^rgba?\(([^)]+)\)/i);if(H){let[V,M,r]=H[1].split(/[ ,/]+/).filter(Boolean);return`rgba(${V}, ${M}, ${r}, ${L})`}return C}var v1=e=>e.replace(/[&<>"']/g,L=>`&#${L.charCodeAt(0)};`),s2=e=>`<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${e}"></span>`;function S2(e){let L=e.lines??[],C=e.series.map((a,A)=>({id:a.id,type:"bar",name:a.name,stack:"savings",cursor:"default",barMaxWidth:50,color:V5(a.color,.5),itemStyle:{borderColor:a.color},data:a.values.map((p,n)=>{let d=e.series.slice(A+1).every(x=>Math.sign(x.values[n]??0)!==Math.sign(p??0));return{value:p,itemStyle:p?d?{borderRadius:p>0?[4,4,0,0]:[0,0,4,4]}:void 0:{borderWidth:0}}})})),H=L.map(a=>({id:a.id,type:"line",name:a.name,yAxisIndex:1,color:a.color,symbol:"circle",symbolSize:5,connectNulls:!0,data:a.values})),V=[...C,...H],M=new Map(L.map(a=>[a.name,a.format])),r=a=>{let A=Array.isArray(a)?a:[a],p=document.createElement("div");if(!A.length)return p;let n=v=>M.has(v.seriesName??""),d=A.filter(v=>v.value&&!n(v)),x=A.filter(v=>n(v)&&v.value!==null&&v.value!==void 0),G=d.map(v=>`${s2(String(v.color??""))}${v1(v.seriesName??"")}: ${e.format(v.value??0)}`),L1=x.map(v=>`${s2(String(v.color??""))}${v1(v.seriesName??"")}: ${M.get(v.seriesName??"")?.(v.value??0)??""}`),k2=d.reduce((v,b2)=>v+(b2.value??0),0);return p.innerHTML=`<b>${v1(e.labels[A[0].dataIndex]?.tooltip??"")}</b>`+(G.length?`<br>${G.join("<br>")}`:"")+(d.length>1?`<br><b>${v1(e.total)}: ${e.format(k2)}</b>`:"")+(L1.length?`<br>${L1.join("<br>")}`:""),p},t={type:"value",name:e.unit,nameGap:2,nameTextStyle:{align:"left"},axisLabel:{formatter:e.tick},splitLine:{show:!0}},i={type:"value",name:e.lineUnit??"",nameGap:2,nameTextStyle:{align:"right"},axisLabel:{formatter:e.tick},splitLine:{show:!1},scale:!0},o={xAxis:{type:"category",data:e.labels.map(a=>a.axis),axisTick:{show:!1}},yAxis:L.length?[t,i]:t,grid:{top:15,bottom:0,left:1,right:1,containLabel:!0},legend:{show:!0,type:"custom",data:[...e.series,...L].map(a=>({id:a.id,name:a.name}))},tooltip:{trigger:"axis",axisPointer:{type:"shadow"},formatter:r}};return{data:V,options:o}}var L5=["energy","cost","saving","export"],M5=["price","solar_share","cheap_share","expensive_share","self_consumption"],C1=e=>L5.filter(L=>f(e).includes(L)),R1=e=>M5.filter(L=>f(e).includes(L));function I(e,L){let C=[];return L==="energy"&&e.statistics.solar?.length&&C.push("source"),e.kind==="household"&&(L==="energy"||L==="cost")&&C.push("consumer"),C.push("none"),C}var c2=["#44739e","#984ea3","#00a0a0","#ff7f00","#af8d00","#7f80cd","#86b300","#c42e60","#a65628","#f781bf"];function h2(e,L,C,H,V){let M=r=>L.statistics[r]??[];if(H==="source"&&C==="energy"){let r=[{id:"solar",name:{key:"source.solar"},color:V.solar,plus:M("solar"),minus:[]}],t=["cheap","expensive"].filter(i=>M(i).length);return M("cheap").length&&r.push({id:"cheap",name:{key:"source.cheap"},color:V.cheap,plus:M("cheap"),minus:[]}),r.push({id:"grid",name:{key:t.length?"source.normal":"source.grid"},color:V.grid,plus:M("energy"),minus:[...M("solar"),...t.flatMap(M)],floor:!0}),M("expensive").length&&r.push({id:"expensive",name:{key:"source.expensive"},color:V.expensive,plus:M("expensive"),minus:[]}),r}return H==="consumer"?e.areas.filter(t=>t.kind==="device"&&t.top_level!==!1||t.kind==="other").map((t,i)=>({id:t.id,name:{text:t.name},color:c2[i%c2.length],plus:t.statistics[C]??[],minus:[]})):[{id:C,name:{text:L.name},color:C==="saving"||C==="export"?V.solar:V.grid,plus:M(C),minus:[]}]}var g2=300*1e3,O2="250px",r5={pv:["--energy-payback-pv-color","#ff9800"],heat_pump:["--energy-payback-heat-pump-color","#8e021b"],wallbox:["--energy-payback-wallbox-color","#0f9d58"]},x1={solar:["--energy-solar-color","#ff9800"],grid:["--energy-grid-consumption-color","#488fc2"],cheap:["--success-color","#43a047"],expensive:["--error-color","#db4437"]},D1=["#9c27b0","#e91e63","#009688","#795548"],e5={energy:"energy",cost:"money",saving:"money",export:"energy"},$=class extends Z{constructor(){super(...arguments);this._config={type:""};this._infoAt=0;this._infoLoading=!1}static getStubConfig(){return{}}static getConfigElement(){return document.createElement("energy-payback-history-card-editor")}setConfig(C){this._config=C??{type:""}}getCardSize(){return 5}getGridOptions(){return{columns:12,min_columns:6}}connectedCallback(){super.connectedCallback(),this._follow()}disconnectedCallback(){super.disconnectedCallback(),this._unfollow?.(),this._unfollow=void 0}get _localize(){return h(this.hass?.locale?.language??this.hass?.language??"en")}get _language(){return this.hass?.locale?.language??"en"}get _fmt(){return d1(this._language,this.hass?.config.currency??"EUR")}get _savings(){return!this._config.area}_follow(){(this._config.period??"energy_date")==="energy_date"&&(this._unfollow||!this.isConnected||!this.hass?.connection||(this._unfollow=A1(this.hass.connection,C=>{this._selected=C})))}async _loadInfo(){if(!(!this.hass||this._infoLoading)){this._infoLoading=!0;try{this._info=await this.hass.callWS({type:`${s}/figures`})}catch{this._info=null}this._infoAt=Date.now(),this._infoLoading=!1}}_color([C,H]){return getComputedStyle(this).getPropertyValue(C).trim()||H}_range(C){let H=this._config.period??"energy_date";if(H!=="energy_date"){let M=N(H);return{range:M,period:E(M)}}if(this._selected===void 0)return;if(this._selected)return{range:this._selected,period:E(this._selected)};let V=C();return{range:V,period:this._savings?"year":E(V)}}_savingsPlan(){if(!this.hass)return;let C=this._localize,H=F(this.hass);if(!H.length||H.some(r=>r.calculating))return;let V=this._range(()=>n2(H.map(r=>r.countingSince)));if(!V)return;let M=H.map(r=>({series:{id:r.category,name:{},color:this._color(r5[r.category]),plus:[r.savingStatistic],minus:[]},name:C(`category.${r.category}`)}));return this._plan(V,M,"money",void 0,[])}_figurePlan(){let C=this._info,H=this._config;if(!C||C.calculating)return;let V=C.areas.find(n=>n.id===H.area),M=H.figure??"energy";if(!V||!V.statistics[M]?.length)return;let r=this._range(()=>N("this_month"));if(!r)return;let t=this._localize,i=I(V,M),o=H.stack&&i.includes(H.stack)?H.stack:i[0],a={solar:this._color(x1.solar),grid:this._color(x1.grid),cheap:this._color(x1.cheap),expensive:this._color(x1.expensive)},A=h2(C,V,M,o,a).map(n=>({series:n,name:n.name.text??(n.name.key&&o1(n.name.key)?t(n.name.key):n.id)}));A.length===1&&(A[0].name=c(t,M,V));let p=H.line&&V.statistics?{figure:H.line,area:V,name:c(t,H.line,V)}:void 0;return this._plan(r,A,e5[M],p,H.lines??[])}_plan(C,H,V,M,r){let t=new Set;for(let{series:o}of H)[...o.plus,...o.minus].forEach(a=>t.add(a));if(M)for(let o of Object.values(M.area.statistics))(o??[]).forEach(a=>t.add(a));r.forEach(o=>t.add(o.statistic));let i=[...t].sort();return{key:JSON.stringify([i,H.map(o=>o.series.id),M?.figure,r,C.range.start,C.range.end,C.period]),range:C.range,period:C.period,bars:H,unit:V,lineFigure:M,lines:r,ids:i}}async _load(C){if(!this.hass)return;this._loading=C.key;let H={key:C.key,at:Date.now(),plan:C,slots:m2(C.range,C.period),rows:{},metadata:{},failed:!1};try{let V=C.lines.map(t=>t.statistic),[M,r]=await Promise.all([this.hass.callWS({type:"recorder/statistics_during_period",start_time:new Date(C.range.start).toISOString(),end_time:new Date(C.range.end+1).toISOString(),statistic_ids:C.ids,period:n1(C.period),types:["change","mean"],units:{energy:"kWh"}}),V.length?this.hass.callWS({type:"recorder/get_statistics_metadata",statistic_ids:V}):Promise.resolve([])]);H.rows=M,H.metadata=Object.fromEntries(r.map(t=>[t.statistic_id,t]))}catch{H.failed=!0}this._loading===C.key&&(this._loading=void 0,this._loaded=H)}willUpdate(C){if(!this.hass)return;if((C.has("hass")||C.has("_config"))&&this._follow(),this._hasChart===void 0&&(this._hasChart=!1,u2().then(M=>{this._hasChart=M})),!this._savings){let M=Date.now()-this._infoAt>g2;(this._info===void 0||M)&&!this._infoLoading&&this._loadInfo()}let H=this._savings?this._savingsPlan():this._figurePlan(),V=!this._loaded||Date.now()-this._loaded.at>g2;H&&H.key!==this._loading&&(H.key!==this._loaded?.key||V&&!this._loading)&&this._load(H),C.has("_loaded")&&(this._chart=this._buildChart())}_perSlot(C){let H=this._loaded;if(!H)return[];let V=H.slots.map(()=>null);for(let M of C)F1(H.rows[M],H.slots,H.plan.period).forEach((r,t)=>{r!==null&&(V[t]=(V[t]??0)+r)});return V}_barValues(C){let H=this._perSlot(C.plus),V=this._perSlot(C.minus);return H.map((M,r)=>{if(M===null)return null;let t=M-(V[r]??0);return C.floor?Math.max(t,0):t})}_lines(){let C=this._loaded;if(!C)return[];let{plan:H,slots:V}=C,M=this._fmt,r=this.hass?.config.currency==="EUR"?100:1,t=[];if(H.lineFigure){let{figure:i,area:o,name:a}=H.lineFigure,A=Object.fromEntries(Object.entries(o.statistics).map(([d,x])=>[d,this._perSlot(x??[])])),p=V.map((d,x)=>D(i,o,L1=>A[L1]?.[x]??null,null).value),n=D(i,o,()=>0,null).unit;t.push({id:`line_${i}`,name:a,color:D1[0],values:n==="price"?p.map(d=>d===null?null:d*r):p,format:d=>M.value(n==="price"?d/r:d,n)})}return H.lines.forEach((i,o)=>{let a=C.metadata[i.statistic],A=i.value??(a?.has_sum?"change":"mean"),p=a?.unit_class==="energy"?"kWh":a?.statistics_unit_of_measurement??"",n=A==="mean"?l2(C.rows[i.statistic],V,H.period):F1(C.rows[i.statistic],V,H.period);t.push({id:`statistic_${o}`,name:i.name??a?.name??this.hass?.states[i.statistic]?.attributes.friendly_name??i.statistic,color:D1[(o+1)%D1.length],values:n,format:d=>`${M.number(d)}${p?` ${p}`:""}`})}),t}_buildChart(){let C=this._loaded;if(!C||C.failed)return;let H=this._localize,V=this._fmt,{plan:M}=C,r=M.bars.map(({series:o,name:a})=>({id:o.id,name:a,color:o.color,values:this._barValues(o)})),t=this._lines(),i=M.lineFigure&&!M.lines.length?D(M.lineFigure.figure,M.lineFigure.area,()=>0,null).unit==="price"?this.hass?.config.currency==="EUR"?"ct/kWh":`${V.currencySymbol()}/kWh`:"%":"";return S2({labels:this._labels(C.slots,M.period),series:r,unit:M.unit==="money"?V.currencySymbol():"kWh",total:H("history_total"),format:o=>M.unit==="money"?V.value(o,"money"):`${V.number(o,Math.abs(o)<10?2:1)} kWh`,tick:o=>V.number(o,Math.abs(o)<10?2:0),lines:t,lineUnit:i})}_labels(C,H){let V=o=>new Intl.DateTimeFormat(this._language,o),M=V({hour:"2-digit",minute:"2-digit"}),r=C.length>0&&new Date(C[0]).getFullYear()!==new Date(C[C.length-1]).getFullYear(),t={hour:M,day:V({day:"numeric"}),month:V(r?{month:"short",year:"2-digit"}:{month:"short"}),year:V({year:"numeric"})}[H],i={hour:M,day:V({weekday:"short",day:"numeric",month:"short"}),month:V({month:"long",year:"numeric"}),year:V({year:"numeric"})}[H];return C.map(o=>({axis:t.format(o),tooltip:H==="hour"?`${M.format(o)} \u2013 ${M.format(o+36e5)}`:i.format(o)}))}_title(){let C=this._localize;if(this._config.title)return this._config.title;if(this._savings)return C("history_title");let H=this._info?.areas.find(V=>V.id===this._config.area);return H?c(C,this._config.figure??"energy",H):C("history_title")}render(){let C=this._localize;if(!this.hass)return m``;let H=this._title();if(this._savings&&!F(this.hass).length)return m`<ha-card>
        <div class="header"><h2 class="title">${H}</h2></div>
        <p class="summary">${C("not_set_up")}</p>
      </ha-card>`;let V=this._savings?F(this.hass).some(A=>A.calculating):this._info?.calculating===!0,M=V?void 0:this._loaded,r=this._chart?.data.filter(A=>A.type==="bar").flatMap(A=>A.data.map(p=>p.value??null))??[],t=r.reduce((A,p)=>A+(p??0),0),i=r.some(A=>A),o=M?.plan.unit??"money",a=!this._savings&&this._info!==void 0&&!this._figurePlan()&&!V;return m`<ha-card>
      <div class="header">
        <h2 class="title">${H}</h2>
        ${M&&!M.failed&&i?m`<span class="chip">${this._fmt.value(t,o)}</span>`:M?m`<span class="chip">${l1(M.plan.range,this._language)}</span>`:l}
      </div>
      ${V?m`<p class="summary">${C("calculating_all")}</p>`:a?m`<p class="summary">${C(this._info===null?"editor_not_loaded":"figures_unavailable")}</p>`:this._body(M,i)}
    </ha-card>`}_body(C,H){let V=this._localize;return this._hasChart?C?.failed?m`<p class="summary">${V("history_failed")}</p>`:m`<div class="chart">
      ${this._chart?m`<ha-chart-base
            .hass=${this.hass}
            .data=${this._chart.data}
            .options=${this._chart.options}
            .height=${O2}
          ></ha-chart-base>`:l}
      ${C&&!H?m`<div class="empty">
            ${V(this._savings?"history_empty":"history_empty_figure")}
          </div>`:l}
    </div>`:m`<p class="summary">${V("history_no_chart")}</p>`}};$.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0},_selected:{state:!0},_loaded:{state:!0},_hasChart:{state:!0}},$.styles=[_,u`
      .chart {
        position: relative;
        min-height: ${e1(O2)};
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
    `];var t5=["energy","statistic","entity"],B=e=>({select:{mode:"dropdown",options:e}}),U=class extends Z{constructor(){super(...arguments);this._label=C=>{let H=this._localize,V=`editor_${C.name}`;return H(V)};this._helper=C=>C.name==="period"?this._localize("editor_period_hint"):void 0}setConfig(C){this._config=C}get _localize(){return h(this.hass?.locale?.language??this.hass?.language??"en")}get _tiles(){return this._config?.tiles??[]}willUpdate(){this.hass&&this._info===void 0&&(this._info=null,this.hass.callWS({type:`${s}/figures`}).then(C=>{this._info=C}).catch(()=>{}))}_changed(C){this._config=C,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:C},bubbles:!0,composed:!0}))}_setTiles(C){this._config&&this._changed({...this._config,tiles:C})}_cardSchema(){let C=this._localize;return[{name:"title",selector:{text:{}}},{name:"period",selector:B(J.map(H=>({value:H,label:C(`period.${H}`)})))},{name:"columns",selector:B([{value:"auto",label:C("editor_columns_auto")},...["1","2","3","4"].map(H=>({value:H,label:H}))])}]}_cardChanged(C){if(!this._config)return;let{title:H,period:V,columns:M}=C.detail.value,r={...this._config};typeof H=="string"&&H?r.title=H:delete r.title,r.period=V??"energy_date",M&&M!=="auto"?r.columns=Number(M):delete r.columns,this._changed(r)}_describe(C){let H=this._localize,V=S(C);if(V==="statistic")return{title:C.name??C.statistic??"",detail:`${C.statistic??""} \xB7 ${H(`value.${C.value??"change"}`)}`};if(V==="entity")return{title:C.name??C.entity??"",detail:`${C.entity??""} \xB7 ${H("value_current")}`};let M=this._info?.areas.find(t=>t.id===C.area),r=M&&C.figure?c(H,C.figure,M):C.figure??"";return{title:C.name??r,detail:`${M?.name??C.area??""} \xB7 ${H("source.energy")}`}}_tileSchema(C){let H=this._localize,V=S(C),M=[{name:"source",selector:B(t5.map(r=>({value:r,label:H(`source.${r}`)})))}];if(V==="energy"){let r=this._info?.areas??[],t=r.find(i=>i.id===C.area);M.push({name:"area",selector:B(r.map(i=>({value:i.id,label:i.name})))},{name:"figure",selector:B(t?f(t).map(i=>({value:i,label:c(H,i,t)})):[])})}else V==="statistic"?(M.push({name:"statistic",selector:{statistic:{}}},{name:"value",selector:B(p2.map(r=>({value:r,label:H(`value.${r}`)})))}),(C.value??"change")==="mean"&&M.push({name:"secondary",selector:B(["none","range"].map(r=>({value:r,label:H(`secondary.${r}`)})))})):M.push({name:"entity",selector:{entity:{}}});return M.push({name:"name",selector:{text:{}}}),M}_tileData(C){return{source:S(C),...C,value:C.value??"change",secondary:C.secondary??"none"}}_tileChanged(C,H){let V=H.detail.value,M=this._tiles[C],r=V.source??S(M),t=typeof V.name=="string"&&V.name?V.name:void 0,i;if(r!==S(M))i=r==="energy"?{area:"household",figure:"cost"}:r==="statistic"?{statistic:"",value:"change"}:{entity:""};else if(r==="energy"){let o=V.area??M.area,a=this._info?.areas.find(n=>n.id===o),A=a?f(a):[],p=A.includes(V.figure)?V.figure:A[0];i={area:o,figure:p}}else r==="statistic"?(i={statistic:V.statistic??"",value:V.value??"change"},i.value==="mean"&&V.secondary==="range"&&(i.secondary="range")):i={entity:V.entity??""};t&&(i.name=t),this._setTiles(this._tiles.map((o,a)=>a===C?i:o))}_add(){let C=[...this._tiles,{area:"household",figure:"cost"}];this._setTiles(C),this._editing=C.length-1}_remove(C){this._setTiles(this._tiles.filter((H,V)=>V!==C))}render(){if(!this.hass||!this._config)return m``;let C=this._localize;if(this._editing!==void 0&&this._tiles[this._editing]){let H=this._editing,V=this._tiles[H];return m`<div class="editor">
        <div class="heading">
          <ha-icon-button-arrow-prev
            .label=${C("editor_back")}
            @click=${()=>this._editing=void 0}
          ></ha-icon-button-arrow-prev>
          <span>${C("editor_edit_tile",{number:String(H+1)})}</span>
        </div>
        ${S(V)==="energy"&&this._info===null?m`<p class="hint">${C("editor_not_loaded")}</p>`:l}
        <ha-form
          .hass=${this.hass}
          .data=${this._tileData(V)}
          .schema=${this._tileSchema(V)}
          .computeLabel=${this._label}
          @value-changed=${M=>this._tileChanged(H,M)}
        ></ha-form>
      </div>`}return m`<div class="editor">
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
        ${this._tiles.map((H,V)=>{let{title:M,detail:r}=this._describe(H);return m`<div class="tile">
            <div class="text">
              <div class="name">${M||"\u2013"}</div>
              <div class="detail">${r}</div>
            </div>
            <ha-icon-button
              .path=${I1}
              .label=${C("editor_edit")}
              @click=${()=>this._editing=V}
            ></ha-icon-button>
            <ha-icon-button
              .path=${W1}
              .label=${C("editor_remove")}
              @click=${()=>this._remove(V)}
            ></ha-icon-button>
          </div>`})}
      </div>
      <ha-button @click=${this._add}>${C("editor_add_tile")}</ha-button>
    </div>`}};U.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0},_editing:{state:!0}},U.styles=u`
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
  `;var E1="savings",H1=e=>({select:{mode:"dropdown",options:e}}),V1=class extends Z{constructor(){super(...arguments);this._label=C=>this._localize(`editor_${C.name}`)}setConfig(C){this._config=C}get _localize(){return h(this.hass?.locale?.language??this.hass?.language??"en")}willUpdate(){this.hass&&this._info===void 0&&(this._info=null,this.hass.callWS({type:`${s}/figures`}).then(C=>{this._info=C}).catch(()=>{}))}_schema(){let C=this._localize,H=this._config??{type:""},V=this._info?.areas??[],M=[{name:"title",selector:{text:{}}},{name:"period",selector:H1(J.map(t=>({value:t,label:C(`period.${t}`)})))},{name:"area",selector:H1([{value:E1,label:C("editor_savings")},...V.filter(t=>C1(t).length).map(t=>({value:t.id,label:t.name}))])}],r=V.find(t=>t.id===H.area);if(r){let t=C1(r),i=H.figure&&t.includes(H.figure)?H.figure:t[0];M.push({name:"figure",selector:H1(t.map(o=>({value:o,label:c(C,o,r)})))},{name:"stack",selector:H1(I(r,i).map(o=>({value:o,label:C(`stack.${o}`)})))},{name:"line",selector:H1([{value:"none",label:C("editor_line_none")},...R1(r).map(o=>({value:o,label:c(C,o,r)}))])},{name:"lines",selector:{statistic:{multiple:!0}}})}return M}_data(){let C=this._config??{type:""},H=this._info?.areas.find(r=>r.id===C.area),V=H?C1(H):[],M=C.figure&&V.includes(C.figure)?C.figure:V[0];return{title:C.title??"",period:C.period??"energy_date",area:C.area??E1,figure:M,stack:C.stack??(H&&M?I(H,M)[0]:void 0),line:C.line??"none",lines:(C.lines??[]).map(r=>r.statistic)}}_changed(C){if(!this._config)return;let H=C.detail.value,V={type:this._config.type};typeof H.title=="string"&&H.title&&(V.title=H.title),V.period=H.period??"energy_date";let M=H.area;if(M&&M!==E1){V.area=M;let r=this._info?.areas.find(d=>d.id===M),t=r?C1(r):[],i=t.includes(H.figure)?H.figure:t[0];i&&(V.figure=i),(r&&i?I(r,i):[]).includes(H.stack)&&(V.stack=H.stack),(r?R1(r):[]).includes(H.line)&&(V.line=H.line);let A=new Map((this._config.lines??[]).map(d=>[d.statistic,d])),n=(Array.isArray(H.lines)?H.lines:[]).filter(Boolean).map(d=>A.get(d)??{statistic:d});n.length&&(V.lines=n)}this._config=V,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:V},bubbles:!0,composed:!0}))}render(){return!this.hass||!this._config?m``:m`<ha-form
      .hass=${this.hass}
      .data=${this._data()}
      .schema=${this._schema()}
      .computeLabel=${this._label}
      @value-changed=${this._changed}
    ></ha-form>`}};V1.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0}};var i5="https://github.com/ignazhabibi/ha-energy-payback",f2=(e,L)=>{if(!customElements.get(e))try{customElements.define(e,L)}catch{customElements.define(e,class extends L{})}};function y2(e){let L=()=>e.forEach(({tag:r,card:t,editor:i})=>{f2(r,t),i&&f2(i.tag,i.element)});L();let C=window.customElements,H=Date.now(),V=window.setInterval(()=>{let r=window.customElements!==C;r&&L(),(r||Date.now()-H>6e4)&&window.clearInterval(V)},100),M=window;M.customCards=M.customCards??[];for(let{tag:r,name:t,description:i}of e)M.customCards.some(o=>o.type===r)||M.customCards.push({type:r,name:t,description:i,preview:!0,documentationURL:i5})}y2([{tag:"energy-payback-card",card:R,name:"Energy Payback",description:"What your PV plant, heat pump, and electric car have saved, and when they pay off."},{tag:"energy-payback-history-card",card:$,name:"Energy Payback history",description:"Savings, consumption, or costs per period as bars, stacked by source or consumer, with lines. Follows the energy date selection.",editor:{tag:"energy-payback-history-card-editor",element:V1}},{tag:"energy-payback-figures-card",card:W,name:"Energy Payback key figures",description:"Tiles with key figures for a period: costs, solar share, cheap grid power, savings, or any statistic or entity.",editor:{tag:"energy-payback-figures-card-editor",element:U}}]);
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
*/
