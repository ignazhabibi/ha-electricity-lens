var c1="M7 11H9V13H7V11M21 5V19C21 20.11 20.11 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H6V1H8V3H16V1H18V3H19C20.11 3 21 3.9 21 5M5 7H19V5H5V7M19 19V9H5V19H19M15 13V11H17V13H15M11 13V11H13V13H11M7 15H9V17H7V15M15 17V15H17V17H15M11 17V15H13V17H11Z";var h1="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z";var O1="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z";var g1="M18,6H8.83L14.83,12L8.83,18H18V20H6V18L12,12L6,6V4H18V6Z";var Q=globalThis,z=Q.ShadowRoot&&(Q.ShadyCSS===void 0||Q.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,M1=Symbol(),f1=new WeakMap,_=class{constructor(H,C,V){if(this._$cssResult$=!0,V!==M1)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=H,this.t=C}get styleSheet(){let H=this.o,C=this.t;if(z&&H===void 0){let V=C!==void 0&&C.length===1;V&&(H=f1.get(C)),H===void 0&&((this.o=H=new CSSStyleSheet).replaceSync(this.cssText),V&&f1.set(C,H))}return H}toString(){return this.cssText}},K=r=>new _(typeof r=="string"?r:r+"",void 0,M1),x=(r,...H)=>{let C=r.length===1?r[0]:H.reduce((V,L,M)=>V+(e=>{if(e._$cssResult$===!0)return e.cssText;if(typeof e=="number")return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(L)+r[M+1],r[0]);return new _(C,r,M1)},y1=(r,H)=>{if(z)r.adoptedStyleSheets=H.map(C=>C instanceof CSSStyleSheet?C:C.styleSheet);else for(let C of H){let V=document.createElement("style"),L=Q.litNonce;L!==void 0&&V.setAttribute("nonce",L),V.textContent=C.cssText,r.appendChild(V)}},r1=z?r=>r:r=>r instanceof CSSStyleSheet?(H=>{let C="";for(let V of H.cssRules)C+=V.cssText;return K(C)})(r):r;var{is:p2,defineProperty:m2,getOwnPropertyDescriptor:n2,getOwnPropertyNames:l2,getOwnPropertySymbols:v2,getPrototypeOf:x2}=Object,q=globalThis,k1=q.trustedTypes,Z2=k1?k1.emptyScript:"",u2=q.reactiveElementPolyfillSupport,D=(r,H)=>r,e1={toAttribute(r,H){switch(H){case Boolean:r=r?Z2:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,H){let C=r;switch(H){case Boolean:C=r!==null;break;case Number:C=r===null?null:Number(r);break;case Object:case Array:try{C=JSON.parse(r)}catch{C=null}}return C}},b1=(r,H)=>!p2(r,H),w1={attribute:!0,type:String,converter:e1,reflect:!1,useDefault:!1,hasChanged:b1};Symbol.metadata??=Symbol("metadata"),q.litPropertyMetadata??=new WeakMap;var s=class extends HTMLElement{static addInitializer(H){this._$Ei(),(this.l??=[]).push(H)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(H,C=w1){if(C.state&&(C.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(H)&&((C=Object.create(C)).wrapped=!0),this.elementProperties.set(H,C),!C.noAccessor){let V=Symbol(),L=this.getPropertyDescriptor(H,V,C);L!==void 0&&m2(this.prototype,H,L)}}static getPropertyDescriptor(H,C,V){let{get:L,set:M}=n2(this.prototype,H)??{get(){return this[C]},set(e){this[C]=e}};return{get:L,set(e){let i=L?.call(this);M?.call(this,e),this.requestUpdate(H,i,V)},configurable:!0,enumerable:!0}}static getPropertyOptions(H){return this.elementProperties.get(H)??w1}static _$Ei(){if(this.hasOwnProperty(D("elementProperties")))return;let H=x2(this);H.finalize(),H.l!==void 0&&(this.l=[...H.l]),this.elementProperties=new Map(H.elementProperties)}static finalize(){if(this.hasOwnProperty(D("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(D("properties"))){let C=this.properties,V=[...l2(C),...v2(C)];for(let L of V)this.createProperty(L,C[L])}let H=this[Symbol.metadata];if(H!==null){let C=litPropertyMetadata.get(H);if(C!==void 0)for(let[V,L]of C)this.elementProperties.set(V,L)}this._$Eh=new Map;for(let[C,V]of this.elementProperties){let L=this._$Eu(C,V);L!==void 0&&this._$Eh.set(L,C)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(H){let C=[];if(Array.isArray(H)){let V=new Set(H.flat(1/0).reverse());for(let L of V)C.unshift(r1(L))}else H!==void 0&&C.push(r1(H));return C}static _$Eu(H,C){let V=C.attribute;return V===!1?void 0:typeof V=="string"?V:typeof H=="string"?H.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(H=>this.enableUpdating=H),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(H=>H(this))}addController(H){(this._$EO??=new Set).add(H),this.renderRoot!==void 0&&this.isConnected&&H.hostConnected?.()}removeController(H){this._$EO?.delete(H)}_$E_(){let H=new Map,C=this.constructor.elementProperties;for(let V of C.keys())this.hasOwnProperty(V)&&(H.set(V,this[V]),delete this[V]);H.size>0&&(this._$Ep=H)}createRenderRoot(){let H=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return y1(H,this.constructor.elementStyles),H}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(H=>H.hostConnected?.())}enableUpdating(H){}disconnectedCallback(){this._$EO?.forEach(H=>H.hostDisconnected?.())}attributeChangedCallback(H,C,V){this._$AK(H,V)}_$ET(H,C){let V=this.constructor.elementProperties.get(H),L=this.constructor._$Eu(H,V);if(L!==void 0&&V.reflect===!0){let M=(V.converter?.toAttribute!==void 0?V.converter:e1).toAttribute(C,V.type);this._$Em=H,M==null?this.removeAttribute(L):this.setAttribute(L,M),this._$Em=null}}_$AK(H,C){let V=this.constructor,L=V._$Eh.get(H);if(L!==void 0&&this._$Em!==L){let M=V.getPropertyOptions(L),e=typeof M.converter=="function"?{fromAttribute:M.converter}:M.converter?.fromAttribute!==void 0?M.converter:e1;this._$Em=L;let i=e.fromAttribute(C,M.type);this[L]=i??this._$Ej?.get(L)??i,this._$Em=null}}requestUpdate(H,C,V,L=!1,M){if(H!==void 0){let e=this.constructor;if(L===!1&&(M=this[H]),V??=e.getPropertyOptions(H),!((V.hasChanged??b1)(M,C)||V.useDefault&&V.reflect&&M===this._$Ej?.get(H)&&!this.hasAttribute(e._$Eu(H,V))))return;this.C(H,C,V)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(H,C,{useDefault:V,reflect:L,wrapped:M},e){V&&!(this._$Ej??=new Map).has(H)&&(this._$Ej.set(H,e??C??this[H]),M!==!0||e!==void 0)||(this._$AL.has(H)||(this.hasUpdated||V||(C=void 0),this._$AL.set(H,C)),L===!0&&this._$Em!==H&&(this._$Eq??=new Set).add(H))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(C){Promise.reject(C)}let H=this.scheduleUpdate();return H!=null&&await H,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[L,M]of this._$Ep)this[L]=M;this._$Ep=void 0}let V=this.constructor.elementProperties;if(V.size>0)for(let[L,M]of V){let{wrapped:e}=M,i=this[L];e!==!0||this._$AL.has(L)||i===void 0||this.C(L,void 0,M,i)}}let H=!1,C=this._$AL;try{H=this.shouldUpdate(C),H?(this.willUpdate(C),this._$EO?.forEach(V=>V.hostUpdate?.()),this.update(C)):this._$EM()}catch(V){throw H=!1,this._$EM(),V}H&&this._$AE(C)}willUpdate(H){}_$AE(H){this._$EO?.forEach(C=>C.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(H)),this.updated(H)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(H){return!0}update(H){this._$Eq&&=this._$Eq.forEach(C=>this._$ET(C,this[C])),this._$EM()}updated(H){}firstUpdated(H){}};s.elementStyles=[],s.shadowRootOptions={mode:"open"},s[D("elementProperties")]=new Map,s[D("finalized")]=new Map,u2?.({ReactiveElement:s}),(q.reactiveElementVersions??=[]).push("2.1.2");var p1=globalThis,B1=r=>r,j=p1.trustedTypes,P1=j?j.createPolicy("lit-html",{createHTML:r=>r}):void 0,E1="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,W1="?"+S,s2=`<${W1}>`,f=document,W=()=>f.createComment(""),N=r=>r===null||typeof r!="object"&&typeof r!="function",m1=Array.isArray,S2=r=>m1(r)||typeof r?.[Symbol.iterator]=="function",t1=`[ 	
\f\r]`,E=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,T1=/-->/g,F1=/>/g,O=RegExp(`>|${t1}(?:([^\\s"'>=/]+)(${t1}*=${t1}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),R1=/'/g,_1=/"/g,N1=/^(?:script|style|textarea|title)$/i,n1=r=>(H,...C)=>({_$litType$:r,strings:H,values:C}),p=n1(1),q2=n1(2),j2=n1(3),y=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),D1=new WeakMap,g=f.createTreeWalker(f,129);function I1(r,H){if(!m1(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return P1!==void 0?P1.createHTML(H):H}var c2=(r,H)=>{let C=r.length-1,V=[],L,M=H===2?"<svg>":H===3?"<math>":"",e=E;for(let i=0;i<C;i++){let t=r[i],o,A,a=-1,n=0;for(;n<t.length&&(e.lastIndex=n,A=e.exec(t),A!==null);)n=e.lastIndex,e===E?A[1]==="!--"?e=T1:A[1]!==void 0?e=F1:A[2]!==void 0?(N1.test(A[2])&&(L=RegExp("</"+A[2],"g")),e=O):A[3]!==void 0&&(e=O):e===O?A[0]===">"?(e=L??E,a=-1):A[1]===void 0?a=-2:(a=e.lastIndex-A[2].length,o=A[1],e=A[3]===void 0?O:A[3]==='"'?_1:R1):e===_1||e===R1?e=O:e===T1||e===F1?e=E:(e=O,L=void 0);let v=e===O&&r[i+1].startsWith("/>")?" ":"";M+=e===E?t+s2:a>=0?(V.push(o),t.slice(0,a)+E1+t.slice(a)+S+v):t+S+(a===-2?i:v)}return[I1(r,M+(r[C]||"<?>")+(H===2?"</svg>":H===3?"</math>":"")),V]},I=class r{constructor({strings:H,_$litType$:C},V){let L;this.parts=[];let M=0,e=0,i=H.length-1,t=this.parts,[o,A]=c2(H,C);if(this.el=r.createElement(o,V),g.currentNode=this.el.content,C===2||C===3){let a=this.el.content.firstChild;a.replaceWith(...a.childNodes)}for(;(L=g.nextNode())!==null&&t.length<i;){if(L.nodeType===1){if(L.hasAttributes())for(let a of L.getAttributeNames())if(a.endsWith(E1)){let n=A[e++],v=L.getAttribute(a).split(S),m=/([.?@])?(.*)/.exec(n);t.push({type:1,index:M,name:m[2],strings:v,ctor:m[1]==="."?o1:m[1]==="?"?A1:m[1]==="@"?a1:b}),L.removeAttribute(a)}else a.startsWith(S)&&(t.push({type:6,index:M}),L.removeAttribute(a));if(N1.test(L.tagName)){let a=L.textContent.split(S),n=a.length-1;if(n>0){L.textContent=j?j.emptyScript:"";for(let v=0;v<n;v++)L.append(a[v],W()),g.nextNode(),t.push({type:2,index:++M});L.append(a[n],W())}}}else if(L.nodeType===8)if(L.data===W1)t.push({type:2,index:M});else{let a=-1;for(;(a=L.data.indexOf(S,a+1))!==-1;)t.push({type:7,index:M}),a+=S.length-1}M++}}static createElement(H,C){let V=f.createElement("template");return V.innerHTML=H,V}};function w(r,H,C=r,V){if(H===y)return H;let L=V!==void 0?C._$Co?.[V]:C._$Cl,M=N(H)?void 0:H._$litDirective$;return L?.constructor!==M&&(L?._$AO?.(!1),M===void 0?L=void 0:(L=new M(r),L._$AT(r,C,V)),V!==void 0?(C._$Co??=[])[V]=L:C._$Cl=L),L!==void 0&&(H=w(r,L._$AS(r,H.values),L,V)),H}var i1=class{constructor(H,C){this._$AV=[],this._$AN=void 0,this._$AD=H,this._$AM=C}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(H){let{el:{content:C},parts:V}=this._$AD,L=(H?.creationScope??f).importNode(C,!0);g.currentNode=L;let M=g.nextNode(),e=0,i=0,t=V[0];for(;t!==void 0;){if(e===t.index){let o;t.type===2?o=new $(M,M.nextSibling,this,H):t.type===1?o=new t.ctor(M,t.name,t.strings,this,H):t.type===6&&(o=new d1(M,this,H)),this._$AV.push(o),t=V[++i]}e!==t?.index&&(M=g.nextNode(),e++)}return g.currentNode=f,L}p(H){let C=0;for(let V of this._$AV)V!==void 0&&(V.strings!==void 0?(V._$AI(H,V,C),C+=V.strings.length-2):V._$AI(H[C])),C++}},$=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(H,C,V,L){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=H,this._$AB=C,this._$AM=V,this.options=L,this._$Cv=L?.isConnected??!0}get parentNode(){let H=this._$AA.parentNode,C=this._$AM;return C!==void 0&&H?.nodeType===11&&(H=C.parentNode),H}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(H,C=this){H=w(this,H,C),N(H)?H===d||H==null||H===""?(this._$AH!==d&&this._$AR(),this._$AH=d):H!==this._$AH&&H!==y&&this._(H):H._$litType$!==void 0?this.$(H):H.nodeType!==void 0?this.T(H):S2(H)?this.k(H):this._(H)}O(H){return this._$AA.parentNode.insertBefore(H,this._$AB)}T(H){this._$AH!==H&&(this._$AR(),this._$AH=this.O(H))}_(H){this._$AH!==d&&N(this._$AH)?this._$AA.nextSibling.data=H:this.T(f.createTextNode(H)),this._$AH=H}$(H){let{values:C,_$litType$:V}=H,L=typeof V=="number"?this._$AC(H):(V.el===void 0&&(V.el=I.createElement(I1(V.h,V.h[0]),this.options)),V);if(this._$AH?._$AD===L)this._$AH.p(C);else{let M=new i1(L,this),e=M.u(this.options);M.p(C),this.T(e),this._$AH=M}}_$AC(H){let C=D1.get(H.strings);return C===void 0&&D1.set(H.strings,C=new I(H)),C}k(H){m1(this._$AH)||(this._$AH=[],this._$AR());let C=this._$AH,V,L=0;for(let M of H)L===C.length?C.push(V=new r(this.O(W()),this.O(W()),this,this.options)):V=C[L],V._$AI(M),L++;L<C.length&&(this._$AR(V&&V._$AB.nextSibling,L),C.length=L)}_$AR(H=this._$AA.nextSibling,C){for(this._$AP?.(!1,!0,C);H!==this._$AB;){let V=B1(H).nextSibling;B1(H).remove(),H=V}}setConnected(H){this._$AM===void 0&&(this._$Cv=H,this._$AP?.(H))}},b=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(H,C,V,L,M){this.type=1,this._$AH=d,this._$AN=void 0,this.element=H,this.name=C,this._$AM=L,this.options=M,V.length>2||V[0]!==""||V[1]!==""?(this._$AH=Array(V.length-1).fill(new String),this.strings=V):this._$AH=d}_$AI(H,C=this,V,L){let M=this.strings,e=!1;if(M===void 0)H=w(this,H,C,0),e=!N(H)||H!==this._$AH&&H!==y,e&&(this._$AH=H);else{let i=H,t,o;for(H=M[0],t=0;t<M.length-1;t++)o=w(this,i[V+t],C,t),o===y&&(o=this._$AH[t]),e||=!N(o)||o!==this._$AH[t],o===d?H=d:H!==d&&(H+=(o??"")+M[t+1]),this._$AH[t]=o}e&&!L&&this.j(H)}j(H){H===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,H??"")}},o1=class extends b{constructor(){super(...arguments),this.type=3}j(H){this.element[this.name]=H===d?void 0:H}},A1=class extends b{constructor(){super(...arguments),this.type=4}j(H){this.element.toggleAttribute(this.name,!!H&&H!==d)}},a1=class extends b{constructor(H,C,V,L,M){super(H,C,V,L,M),this.type=5}_$AI(H,C=this){if((H=w(this,H,C,0)??d)===y)return;let V=this._$AH,L=H===d&&V!==d||H.capture!==V.capture||H.once!==V.once||H.passive!==V.passive,M=H!==d&&(V===d||L);L&&this.element.removeEventListener(this.name,this,V),M&&this.element.addEventListener(this.name,this,H),this._$AH=H}handleEvent(H){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,H):this._$AH.handleEvent(H)}},d1=class{constructor(H,C,V){this.element=H,this.type=6,this._$AN=void 0,this._$AM=C,this.options=V}get _$AU(){return this._$AM._$AU}_$AI(H){w(this,H)}};var h2=p1.litHtmlPolyfillSupport;h2?.(I,$),(p1.litHtmlVersions??=[]).push("3.3.3");var $1=(r,H,C)=>{let V=C?.renderBefore??H,L=V._$litPart$;if(L===void 0){let M=C?.renderBefore??null;V._$litPart$=L=new $(H.insertBefore(W(),M),M,void 0,C??{})}return L._$AI(r),L};var l1=globalThis,l=class extends s{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let H=super.createRenderRoot();return this.renderOptions.renderBefore??=H.firstChild,H}update(H){let C=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(H),this._$Do=$1(C,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return y}};l._$litElement$=!0,l.finalized=!0,l1.litElementHydrateSupport?.({LitElement:l});var O2=l1.litElementPolyfillSupport;O2?.({LitElement:l});(l1.litElementVersions??=[]).push("4.2.2");var v1={title:"Balance","category.pv":"PV plant","category.heat_pump":"Heat pump","category.wallbox":"Electric car",show_yearly:"Show yearly figures",show_total:"Show totals",not_set_up:"Set up the Energy Payback integration to see what your PV plant, heat pump, and electric car have saved.",calculating_all:"The past is being computed \u2026",calculating:"Being computed \u2026",saved_invested:"{saved} saved, {invested} invested",saved_only:"{saved} saved",of_investment:"{percent} of {investment}",paid_off:"paid off",since:"since {date}",heat_estimated:"heat partly estimated",instead_heat_pump:"no extra cost entered",instead_wallbox:"no extra cost entered",instead_pv:"no purchase cost entered",in_the_plus_from:"In the plus from about {date}",in_the_plus:"In the plus",yearly_after_twelve:"Yearly figures after twelve months of data.",yearly_from:"Yearly figure from {date}",pays_off_in:"pays off in about {years}",years_one:"1 year",years_other:"{count} years",under_one_year:"less than a year",return_per_year:"paid off, {percent} return per year",instead_of_gas:"instead of gas",instead_of_oil:"instead of oil",instead_of_fuel:"instead of fuel",per_year:"{amount}/year",gas:"Gas {price}/kWh",oil:"Oil {price}/l",fuel:"Fuel {price}/l",prices_link:"Change the prices",progress:"{name}: {percent} of the investment saved",history_title:"Savings",history_total:"Total",history_no_chart:"The chart is only shown in Home Assistant.",history_failed:"The statistics could not be loaded.",history_empty:"No savings in this period.",figures_title:"Key figures",figures_failed:"The figures could not be loaded.",figures_unavailable:"not available","figure.energy":"Consumption","figure.energy.grid":"Grid import","figure.energy.solar":"Solar production","figure.cost":"Costs","figure.cost.grid":"Grid costs","figure.price":"Average price","figure.solar_share":"Solar share","figure.solar_share.household":"Self-sufficiency","figure.cheap_share":"Cheap grid power","figure.expensive_share":"Expensive grid power","figure.self_consumption":"Self-consumption","figure.export":"Feed-in","figure.saving":"Saving","figure.forecast_today":"Forecast today","figure.forecast_tomorrow":"Forecast tomorrow",line_solar_part:"{percent} of it solar power",line_exported:"{energy} fed in",line_average_price:"average {price}",line_for_import:"for {energy} imported",line_cost_for:"{cost} for {energy}",line_from_solar:"{part} of {whole} from solar",line_of_grid:"{part} of {whole} grid power",line_self_used:"{part} of {whole} used in the house","value.change":"total in the period","value.mean":"average","value.min":"minimum","value.max":"maximum",value_range:"from {min} to {max}",value_current:"current value","period.energy_date":"Follow the date selection","period.today":"Today","period.yesterday":"Yesterday","period.this_month":"This month","period.last_month":"Last month","period.this_year":"This year","period.last_year":"Last year",editor_title:"Title (optional)",editor_period:"Period",editor_period_hint:"Without a date selection on the dashboard: this month.",editor_columns:"Columns",editor_columns_auto:"Auto",editor_tiles:"Tiles",editor_add_tile:"Add tile",editor_edit_tile:"Edit tile {number}",editor_back:"Back",editor_edit:"Edit",editor_remove:"Remove",editor_source:"Source","source.energy":"Energy data","source.statistic":"Statistic","source.entity":"Entity",editor_area:"Area",editor_figure:"Figure",editor_statistic:"Statistic",editor_value:"Value",editor_secondary:"Line below","secondary.none":"Default","secondary.range":"Range of the period",editor_entity:"Entity",editor_name:"Name (optional)",editor_not_loaded:"Energy data need the Energy Payback integration."},g2={title:"Bilanz","category.pv":"PV-Anlage","category.heat_pump":"W\xE4rmepumpe","category.wallbox":"E-Auto",show_yearly:"Jahreswerte zeigen",show_total:"Gesamtwerte zeigen",not_set_up:"Richte die Integration Energy Payback ein, um zu sehen, was PV-Anlage, W\xE4rmepumpe und E-Auto gespart haben.",calculating_all:"Die Vergangenheit wird nachgerechnet \u2026",calculating:"Wird berechnet \u2026",saved_invested:"{saved} gespart, {invested} investiert",saved_only:"{saved} gespart",of_investment:"{percent} von {investment}",paid_off:"amortisiert",since:"seit {date}",heat_estimated:"W\xE4rme teilweise gesch\xE4tzt",instead_heat_pump:"ohne Mehrkosten",instead_wallbox:"ohne Mehrkosten",instead_pv:"ohne Anschaffungskosten",in_the_plus_from:"Im Plus ab etwa {date}",in_the_plus:"Im Plus",yearly_after_twelve:"Jahreswerte gibt es nach zw\xF6lf Monaten Daten.",yearly_from:"Jahreswert ab {date}",pays_off_in:"amortisiert in etwa {years}",years_one:"1 Jahr",years_other:"{count} Jahren",under_one_year:"weniger als einem Jahr",return_per_year:"amortisiert, {percent} Rendite pro Jahr",instead_of_gas:"statt Gas",instead_of_oil:"statt \xD6l",instead_of_fuel:"statt Sprit",per_year:"{amount}/Jahr",gas:"Gas {price}/kWh",oil:"\xD6l {price}/l",fuel:"Sprit {price}/l",prices_link:"Preise \xE4ndern",progress:"{name}: {percent} der Investition gespart",history_title:"Ersparnis",history_total:"Summe",history_no_chart:"Das Diagramm erscheint nur in Home Assistant.",history_failed:"Die Statistik konnte nicht geladen werden.",history_empty:"Keine Ersparnis in diesem Zeitraum.",figures_title:"Kennzahlen",figures_failed:"Die Kennzahlen konnten nicht geladen werden.",figures_unavailable:"nicht verf\xFCgbar","figure.energy":"Verbrauch","figure.energy.grid":"Netzbezug","figure.energy.solar":"Solarertrag","figure.cost":"Kosten","figure.cost.grid":"Netzkosten","figure.price":"\xF8 Strompreis","figure.solar_share":"Solaranteil","figure.solar_share.household":"Autarkie","figure.cheap_share":"G\xFCnstiger Netzstrom","figure.expensive_share":"Teurer Netzstrom","figure.self_consumption":"Eigenverbrauch","figure.export":"Einspeisung","figure.saving":"Ersparnis","figure.forecast_today":"Prognose heute","figure.forecast_tomorrow":"Prognose morgen",line_solar_part:"davon {percent} Solarstrom",line_exported:"{energy} eingespeist",line_average_price:"\xF8 {price}",line_for_import:"f\xFCr {energy} Netzbezug",line_cost_for:"{cost} f\xFCr {energy}",line_from_solar:"{part} von {whole} aus Solar",line_of_grid:"{part} von {whole} Netzstrom",line_self_used:"{part} von {whole} im Haus genutzt","value.change":"Summe im Zeitraum","value.mean":"Mittelwert","value.min":"Minimum","value.max":"Maximum",value_range:"von {min} bis {max}",value_current:"aktueller Wert","period.energy_date":"Der Datumsauswahl folgen","period.today":"Heute","period.yesterday":"Gestern","period.this_month":"Dieser Monat","period.last_month":"Letzter Monat","period.this_year":"Dieses Jahr","period.last_year":"Letztes Jahr",editor_title:"Titel (optional)",editor_period:"Zeitraum",editor_period_hint:"Ohne Datumsauswahl auf dem Dashboard: dieser Monat.",editor_columns:"Spalten",editor_columns_auto:"Auto",editor_tiles:"Kacheln",editor_add_tile:"Kachel hinzuf\xFCgen",editor_edit_tile:"Kachel {number} bearbeiten",editor_back:"Zur\xFCck",editor_edit:"Bearbeiten",editor_remove:"Entfernen",editor_source:"Quelle","source.energy":"Energiedaten","source.statistic":"Statistik","source.entity":"Entit\xE4t",editor_area:"Bereich",editor_figure:"Gr\xF6\xDFe",editor_statistic:"Statistik",editor_value:"Wert",editor_secondary:"Unterzeile","secondary.none":"Standard","secondary.range":"Spanne im Zeitraum",editor_entity:"Entit\xE4t",editor_name:"Name (optional)",editor_not_loaded:"Energiedaten brauchen die Integration Energy Payback."},f2={en:v1,de:g2},U1=r=>r in v1;function c(r){let H=f2[r.split("-")[0]]??v1;return(C,V={})=>H[C].replace(/\{(\w+)\}/g,(L,M)=>V[M]??"")}var h="energy_payback",x1=["pv","heat_pump","wallbox"];var Y=r=>{if(r==null||r==="")return null;let H=Number(r);return Number.isFinite(H)?H:null},G1=r=>typeof r=="string"&&r?new Date(r):null;function U(r){let H=Object.values(r.entities??{}).filter(M=>M.platform===h),C=(M,e)=>H.find(i=>i.device_id===M&&i.translation_key===e),V=M=>M?Y(r.states[M]?.state):null,L=[];for(let M of H){if(M.translation_key!=="saving")continue;let e=r.states[M.entity_id];if(!e||e.state==="unavailable")continue;let i=e.attributes,t=i.category;x1.includes(t)&&L.push({category:t,savingStatistic:typeof i.statistic_id=="string"?i.statistic_id:`${h}:${t}_saving`,calculating:i.calculating===!0,saving:Y(e.state),investment:Y(i.investment),payback:V(C(M.device_id,"payback")?.entity_id),perYear:V(C(M.device_id,"saving_per_year")?.entity_id),countingSince:G1(i.counting_since),yearlyFrom:G1(i.yearly_from),price:Y(i.price),heating:i.heating==="gas"||i.heating==="oil"?i.heating:null,heatEstimated:i.heat_estimated===!0})}return L.sort((M,e)=>x1.indexOf(M.category)-x1.indexOf(e.category))}function Q1(r,H=new Date){let C=r.some(A=>A.calculating),V=r.reduce((A,a)=>A+(a.saving??0),0),L=r.reduce((A,a)=>A+(a.investment??0),0),M=!C&&r.length>0,e=M?V-L:null,i=r.every(A=>A.perYear!==null),t=M&&i?r.reduce((A,a)=>A+(a.perYear??0),0):null,o=null;return e!==null&&t!==null&&(e>=0?o=H:t>0&&(o=new Date(H.getTime()+-e/t*12*26298e5))),{saved:V,invested:L,balance:e,perYear:t,inThePlusFrom:o,calculating:C}}function z1(r){let{investment:H,saving:C,perYear:V}=r;return H===null||H<=0||C===null||V===null||V<=0?null:Math.max(0,(H-C)/V)}function K1(r){let{investment:H,saving:C,perYear:V}=r;return H===null||H<=0||C===null||V===null||C<H?null:V/H*100}var B=x`
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
`;var q1="energy-payback-card-view",y2=()=>{try{return localStorage.getItem(q1)==="yearly"?"yearly":"total"}catch{return"total"}},P=class extends l{constructor(){super(...arguments);this._view=y2()}static getStubConfig(){return{}}static getConfigForm(){return{schema:[]}}setConfig(C){}getCardSize(){return 4}getGridOptions(){return{columns:12,min_columns:6}}get _localize(){return c(this.hass?.locale?.language??this.hass?.language??"en")}get _language(){return this.hass?.locale?.language??"en"}_money(C,V=!1){return new Intl.NumberFormat(this._language,{style:"currency",currency:this.hass?.config.currency??"EUR",maximumFractionDigits:0,minimumFractionDigits:0,signDisplay:V?"exceptZero":"auto"}).format(C)}_price(C){return new Intl.NumberFormat(this._language,{style:"currency",currency:this.hass?.config.currency??"EUR",maximumFractionDigits:4,minimumFractionDigits:2}).format(C)}_percent(C){return new Intl.NumberFormat(this._language,{style:"percent",maximumFractionDigits:0}).format(C/100)}_month(C){return new Intl.DateTimeFormat(this._language,{month:"long",year:"numeric"}).format(C)}_years(C){let V=this._localize;if(C<1)return V("under_one_year");let L=Math.round(C);return L===1?V("years_one"):V("years_other",{count:String(L)})}_toggleView(){this._view=this._view==="total"?"yearly":"total";try{localStorage.setItem(q1,this._view)}catch{}}_openIntegration(){history.pushState(null,"",`/config/integrations/integration/${h}`),window.dispatchEvent(new CustomEvent("location-changed"))}render(){let C=this._localize;if(!this.hass)return p``;let V=U(this.hass);if(!V.length)return p`<ha-card>
        <div class="header"><h2 class="title">${C("title")}</h2></div>
        <p class="summary">${C("not_set_up")}</p>
      </ha-card>`;let L=Q1(V),M=this._view==="yearly";return p`<ha-card>
      <div class="header">
        <h2 class="title">${C("title")}</h2>
        ${this._chip(L,M)}
        <button
          class="toggle"
          type="button"
          aria-label=${C(M?"show_total":"show_yearly")}
          title=${C(M?"show_total":"show_yearly")}
          @click=${this._toggleView}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d=${M?g1:c1}></path>
          </svg>
        </button>
      </div>
      <p class="summary">${this._summary(L,V,M)}</p>
      <ul class="rows">
        ${V.map(e=>this._row(e,M))}
      </ul>
      ${this._footer(V)}
    </ha-card>`}_chip(C,V){let L=this._localize,M=null;return V?C.perYear!==null&&(M=L("per_year",{amount:this._money(C.perYear,!0)})):C.balance!==null?M=this._money(C.balance,!0):C.calculating||(M=this._money(C.saved)),M===null?d:p`<span class="chip">${M}</span>`}_summary(C,V,L){let M=this._localize;return C.calculating?M("calculating_all"):L?C.inThePlusFrom===null?V.some(e=>e.perYear===null)?M("yearly_after_twelve"):"":C.balance!==null&&C.balance>=0?M("in_the_plus"):M("in_the_plus_from",{date:this._month(C.inThePlusFrom)}):C.invested>0?M("saved_invested",{saved:this._money(C.saved),invested:this._money(C.invested)}):M("saved_only",{saved:this._money(C.saved)})}_row(C,V){let L=this._localize,M=L(`category.${C.category}`),e="\u2013";return C.calculating||(V&&C.perYear!==null?e=L("per_year",{amount:this._money(C.perYear)}):!V&&C.saving!==null&&(e=this._money(C.saving))),p`<li class="row ${C.category}">
      <span class="swatch" aria-hidden="true"></span>
      <div class="row-body">
        <div class="line">
          <span>${M}</span>
          <span class="amount ${e==="\u2013"?"waiting":""}">${e}</span>
        </div>
        <div class="sub">
          ${C.calculating?L("calculating"):V?this._yearlyDetail(C):this._totalDetail(C,M)}
        </div>
        ${C.calculating?d:this._since(C)}
      </div>
    </li>`}_since(C){let V=this._localize,L=[];return C.countingSince&&L.push(V("since",{date:this._month(C.countingSince)})),C.heatEstimated&&L.push(V("heat_estimated")),L.length?p`<div class="sub since">${L.join(" \xB7 ")}</div>`:d}_totalDetail(C,V){let L=this._localize;if(C.investment&&C.payback!==null){let M=Math.max(0,C.payback),e=this._percent(C.payback);return p`<div class="meter">
        <div
          class="bar"
          role="progressbar"
          aria-label=${L("progress",{name:V,percent:e})}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow=${Math.min(100,Math.round(M))}
        >
          <i style="width:${Math.min(100,M)}%"></i>
        </div>
        <span
          >${M>=100?L("paid_off"):L("of_investment",{percent:e,investment:this._money(C.investment)})}</span
        >
      </div>`}return L(`instead_${C.category}`)}_yearlyDetail(C){let V=this._localize;if(C.perYear===null)return C.yearlyFrom?V("yearly_from",{date:this._month(C.yearlyFrom)}):"";let L=K1(C);if(L!==null)return V("return_per_year",{percent:this._percent(L)});let M=z1(C);return M!==null?V("pays_off_in",{years:this._years(M)}):C.category==="heat_pump"?V(C.heating==="oil"?"instead_of_oil":"instead_of_gas"):C.category==="wallbox"?V("instead_of_fuel"):""}_footer(C){let V=this._localize,L=[];for(let M of C){if(M.price===null)continue;let e=this._price(M.price);M.category==="heat_pump"&&L.push(V(M.heating==="oil"?"oil":"gas",{price:e})),M.category==="wallbox"&&L.push(V("fuel",{price:e}))}return L.length?p`<div class="footer">
      <button
        class="prices"
        type="button"
        title=${V("prices_link")}
        aria-label=${`${V("prices_link")}: ${L.join(", ")}`}
        @click=${this._openIntegration}
      >
        ${L.join(" \xB7 ")}
      </button>
    </div>`:d}};P.properties={hass:{attribute:!1},_view:{state:!0}},P.styles=[B,x`
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
    `];var k2=r=>!!r&&typeof r.subscribe=="function";function w2(r){let H=location.pathname.split("/")[1]??"",C=r;for(let V of[`_energy_${H}`,"_energy"])if(k2(C[V]))return C[V]}var b2=()=>new Date().setHours(24,0,0,0)-1;function X(r,H){let C,V,L=0,M=()=>{let e=w2(r);if(e){C=e.subscribe(i=>H({start:new Date(i.start).getTime(),end:i.end?new Date(i.end).getTime():b2()}));return}L+=1,L===2&&H(null),L<20&&(V=window.setTimeout(M,500))};return M(),()=>{window.clearTimeout(V),C?.()}}var Z1={energy:["energy"],cost:["cost"],price:["cost","energy","solar"],solar_share:["solar","energy"],cheap_share:["cheap","solar","energy"],expensive_share:["expensive","solar","energy"],self_consumption:["self_used","energy"],export:["export"],saving:["saving"],forecast_today:[],forecast_tomorrow:[]},B2={energy:["solar","export"],cost:["energy","solar"]},P2=Object.keys(Z1),C1=r=>r==="forecast_today"||r==="forecast_tomorrow";function G(r){return P2.filter(H=>C1(H)?r.forecast===!0:Z1[H].every(C=>r.statistics[C]?.length))}function j1(r,H){return[...Z1[H],...B2[H]??[]].flatMap(C=>r.statistics[C]??[])}var J=(r,H)=>H>0?r/H*100:null;function Y1(r,H,C,V){let L=C("energy"),M=C("solar"),e=t=>({value:t,unit:"energy"}),i=t=>({value:t,unit:"number"});switch(r){case"energy":{if(L!==null&&M!==null&&L>0){let o=J(M,L)??0;return{value:L,unit:"energy",line:{key:"line_solar_part",values:{percent:{value:o,unit:"percent"}}}}}let t=C("export");return H.kind==="grid"&&t!==null?{value:L,unit:"energy",line:{key:"line_exported",values:{energy:e(t)}}}:{value:L,unit:"energy"}}case"cost":{let t=C("cost");return t!==null&&L&&M!==null?{value:t,unit:"money",line:{key:"line_average_price",values:{price:{value:t/L,unit:"price"}}}}:t!==null&&L!==null&&H.kind==="grid"?{value:t,unit:"money",line:{key:"line_for_import",values:{energy:e(L)}}}:{value:t,unit:"money"}}case"price":{let t=C("cost");return t===null||!L?{value:null,unit:"price"}:{value:t/L,unit:"price",line:{key:"line_cost_for",values:{cost:{value:t,unit:"money"},energy:e(L)}}}}case"solar_share":{if(L===null||M===null)return{value:null,unit:"percent"};let t=J(M,L);return{value:t,unit:"percent",bar:t??0,line:{key:"line_from_solar",values:{part:i(M),whole:e(L)}}}}case"cheap_share":case"expensive_share":{let t=C(r==="cheap_share"?"cheap":"expensive");if(L===null||M===null||t===null)return{value:null,unit:"percent"};let o=Math.max(L-M,0),A=J(t,o);return{value:A,unit:"percent",bar:A??0,line:{key:"line_of_grid",values:{part:i(t),whole:e(o)}}}}case"self_consumption":{let t=C("self_used");if(L===null||t===null)return{value:null,unit:"percent"};let o=J(t,L);return{value:o,unit:"percent",bar:o??0,line:{key:"line_self_used",values:{part:i(t),whole:e(L)}}}}case"export":return{value:C("export"),unit:"energy"};case"saving":return{value:C("saving"),unit:"money"};case"forecast_today":case"forecast_tomorrow":return{value:V,unit:"energy"}}}var X1=["change","mean","min","max"],u=r=>r.statistic!==void 0?"statistic":r.entity!==void 0?"entity":"energy";function H1({start:r,end:H}){let C=H-r;return C<=2*864e5+36e5?"hour":C<=95*864e5?"day":C<=3*366*864e5?"month":"year"}var V1=r=>r==="year"?"month":r,T2=(r,H)=>{let C=new Date(r);return H==="hour"?C.setMinutes(0,0,0):(C.setHours(0,0,0,0),H==="day"||(C.setDate(1),H==="month")?C.getTime():C.setMonth(0))},F2=(r,H)=>{let C=new Date(r);return H==="hour"?C.setHours(C.getHours()+1):H==="day"?C.setDate(C.getDate()+1):H==="month"?C.setMonth(C.getMonth()+1):C.setFullYear(C.getFullYear()+1),C.getTime()};function J1({start:r,end:H},C){let V=[];for(let L=T2(r,C);L<=H&&V.length<400;L=F2(L,C))V.push(L);return V}function C2(r,H=new Date){let C=r.filter(L=>L!==null).map(L=>L.getFullYear()),V=Math.min(H.getFullYear(),...C);return{start:new Date(V,0,1).getTime(),end:new Date(H.getFullYear()+1,0,1).getTime()-1}}function H2(r,H,C){let V=H.map(()=>null),L=C==="hour"?0:12*36e5;for(let M of r??[]){if(M.change===null||M.change===void 0)continue;let e=(typeof M.start=="number"?M.start:Date.parse(M.start))+L,i=-1;for(let t=0;t<H.length&&H[t]<=e;t+=1)i=t;i<0||(V[i]=(V[i]??0)+M.change)}return V}function u1(r,H=new Date){let C=(e,i)=>({start:e.getTime(),end:i.getTime()-1}),V=H.getFullYear(),L=H.getMonth(),M=H.getDate();switch(r){case"today":return C(new Date(V,L,M),new Date(V,L,M+1));case"yesterday":return C(new Date(V,L,M-1),new Date(V,L,M));case"this_month":return C(new Date(V,L,1),new Date(V,L+1,1));case"last_month":return C(new Date(V,L-1,1),new Date(V,L,1));case"this_year":return C(new Date(V,0,1),new Date(V+1,0,1));case"last_year":return C(new Date(V-1,0,1),new Date(V,0,1))}}function V2({start:r,end:H},C){let V=new Date(r),L=new Date(H),M=(t,o)=>new Intl.DateTimeFormat(C,t).format(o);if(V.toDateString()===L.toDateString())return M({day:"numeric",month:"short"},V);let i=V.getDate()===1&&new Date(H+1).getDate()===1;return i&&V.getMonth()===0&&L.getMonth()===11&&V.getFullYear()===L.getFullYear()?M({year:"numeric"},V):i&&V.getMonth()===L.getMonth()&&V.getFullYear()===L.getFullYear()?M({month:"short",year:"numeric"},V):new Intl.DateTimeFormat(C,{day:"numeric",month:"short"}).formatRange(V,L)}var M2=["energy_date","today","yesterday","this_month","last_month","this_year","last_year"];function L1(r,H,C){let V=`figure.${H}.${C.kind}`,L=r(U1(V)?V:`figure.${H}`);return["device","other","category"].includes(C.kind)?`${C.name} ${L}`:L}var L2=300*1e3,R2={solar_share:"var(--energy-solar-color, #ff9800)",self_consumption:"var(--energy-solar-color, #ff9800)",cheap_share:"var(--success-color, #43a047)",expensive_share:"var(--error-color, #db4437)"},s1=r=>r.toDateString();function _2(r){let H=new Date,C=s1(H),V=s1(new Date(H.getFullYear(),H.getMonth(),H.getDate()+1)),L={today:null,tomorrow:null};for(let M of Object.values(r??{}))for(let[e,i]of Object.entries(M.wh_hours??{})){let t=s1(new Date(e));t===C&&(L.today=(L.today??0)+i/1e3),t===V&&(L.tomorrow=(L.tomorrow??0)+i/1e3)}return L}var T=class extends l{constructor(){super(...arguments);this._infoAt=0;this._infoLoading=!1}static getStubConfig(){return{period:"energy_date",tiles:[{area:"household",figure:"cost"},{area:"household",figure:"solar_share"}]}}static getConfigElement(){return document.createElement("energy-payback-figures-card-editor")}setConfig(C){if(!C||C.tiles!==void 0&&!Array.isArray(C.tiles))throw new Error("tiles must be a list");this._config=C}getCardSize(){return 1+2*Math.ceil((this._config?.tiles?.length??1)/2)}getGridOptions(){return{columns:12,min_columns:3}}connectedCallback(){super.connectedCallback(),this._follow()}disconnectedCallback(){super.disconnectedCallback(),this._unfollow?.(),this._unfollow=void 0}get _localize(){return c(this.hass?.locale?.language??this.hass?.language??"en")}get _language(){return this.hass?.locale?.language??"en"}get _period(){return this._config?.period??"energy_date"}get _tiles(){return this._config?.tiles??[]}_follow(){this._period==="energy_date"&&(this._unfollow||!this.isConnected||!this.hass?.connection||(this._unfollow=X(this.hass.connection,C=>{this._selected=C})))}_range(){let C=this._period;if(C!=="energy_date")return u1(C);if(this._selected!==void 0)return this._selected??u1("this_month")}_area(C){return this._info?.areas.find(V=>V.id===C)}_figure(C){let V=this._area(C.area);if(!(!V||!C.figure||!G(V).includes(C.figure)))return{area:V,figure:C.figure}}async _loadInfo(){if(!(!this.hass||this._infoLoading)){this._infoLoading=!0;try{this._info=await this.hass.callWS({type:`${h}/figures`})}catch{this._info=null}this._infoAt=Date.now(),this._infoLoading=!1}}_request(){let C=this._range();if(!C)return;let V=this._tiles;if(V.some(o=>u(o)==="energy")&&this._info===void 0)return;let M=new Set,e=new Set,i=!1;for(let o of V){let A=u(o);if(A==="statistic"&&o.statistic)M.add(o.statistic),e.add(o.statistic);else if(A==="energy"){let a=this._figure(o);if(!a)continue;C1(a.figure)&&(i=!0),j1(a.area,a.figure).forEach(n=>M.add(n))}}let t=[...M].sort();return{key:JSON.stringify([t,C.start,C.end,i]),range:C,ids:t,statistics:[...e].sort(),forecast:i}}async _load(C){if(!this.hass)return;this._loading=C.key;let V={key:C.key,at:Date.now(),rows:{},metadata:{},forecast:{today:null,tomorrow:null},failed:!1};try{let[L,M,e]=await Promise.all([C.ids.length?this.hass.callWS({type:"recorder/statistics_during_period",start_time:new Date(C.range.start).toISOString(),end_time:new Date(C.range.end+1).toISOString(),statistic_ids:C.ids,period:V1(H1(C.range)),types:["change","mean","min","max"],units:{energy:"kWh"}}):Promise.resolve({}),C.statistics.length?this.hass.callWS({type:"recorder/get_statistics_metadata",statistic_ids:C.statistics}):Promise.resolve([]),C.forecast?this.hass.callWS({type:"energy/solar_forecast"}):Promise.resolve({})]);V.rows=L,V.metadata=Object.fromEntries(M.map(i=>[i.statistic_id,i])),V.forecast=_2(e)}catch{V.failed=!0}this._loading===C.key&&(this._loading=void 0,this._loaded=V)}willUpdate(C){if(!this.hass)return;(C.has("hass")||C.has("_config"))&&this._follow();let V=Date.now()-this._infoAt>L2;(this._info===void 0||V)&&!this._infoLoading&&this._loadInfo();let L=this._request(),M=!this._loaded||Date.now()-this._loaded.at>L2;L&&L.key!==this._loading&&(L.key!==this._loaded?.key||M&&!this._loading)&&this._load(L)}_number(C,V){let L=Math.abs(C),M=V??(L<10?2:L<100?1:0);return new Intl.NumberFormat(this._language,{maximumFractionDigits:M,minimumFractionDigits:V??0}).format(C)}_format(C,V){let L=this._language,M=this.hass?.config.currency??"EUR";switch(V){case"energy":return`${this._number(C,Math.abs(C)<100?1:0)} kWh`;case"money":{let e=Math.abs(C)<100;return new Intl.NumberFormat(L,{style:"currency",currency:M,maximumFractionDigits:e?2:0,minimumFractionDigits:e?2:0}).format(C)}case"price":return M==="EUR"?`${this._number(C*100,1)} ct/kWh`:`${new Intl.NumberFormat(L,{style:"currency",currency:M,maximumFractionDigits:3}).format(C)}/kWh`;case"percent":return new Intl.NumberFormat(L,{style:"percent",maximumFractionDigits:0}).format(C/100);case"number":return this._number(C,Math.abs(C)<100?1:0)}}_sum(C){let V=0;for(let L of C??[])for(let M of this._loaded?.rows[L]??[])V+=M.change??0;return V}_energyTile(C){let V=this._localize,L=this._figure(C);if(!L)return this._tile(C.name??C.figure??"","\u2013",V("figures_unavailable"));let{area:M,figure:e}=L,i=C.name??L1(this._localize,e,M);if(this._info?.calculating&&!C1(e))return this._tile(i,"\u2026",V("calculating"));if(!this._loaded||this._loaded.failed)return this._tile(i,"\u2013");let t=e==="forecast_today"?this._loaded.forecast.today:e==="forecast_tomorrow"?this._loaded.forecast.tomorrow:null,o=Y1(e,M,a=>M.statistics[a]?this._sum(M.statistics[a]):null,t),A=o.line?V(o.line.key,Object.fromEntries(Object.entries(o.line.values).map(([a,n])=>[a,this._format(n.value,n.unit)]))):void 0;return this._tile(i,o.value===null?"\u2013":this._format(o.value,o.unit),A,o.bar,R2[e])}_statisticTile(C){let V=this._localize,L=C.statistic??"",M=this._loaded?.metadata[L],e=C.name??M?.name??this.hass?.states[L]?.attributes.friendly_name??L,i=this._loaded?.rows[L]??[],t=M?.unit_class==="energy"?"kWh":M?.statistics_unit_of_measurement??"",o=m=>m===null?"\u2013":`${this._number(m)}${t?` ${t}`:""}`,A=m=>i.map(Z=>Z[m]).filter(Z=>typeof Z=="number"),a=C.value??"change",n=null;if(a==="change")n=i.length?i.reduce((m,Z)=>m+(Z.change??0),0):null;else if(a==="mean"){let m=A("mean");n=m.length?m.reduce((Z,d2)=>Z+d2,0)/m.length:null}else{let m=A(a);n=m.length?a==="min"?Math.min(...m):Math.max(...m):null}let v=V(`value.${a}`);if(C.secondary==="range"){let m=A("min"),Z=A("max");m.length&&Z.length&&(v=V("value_range",{min:o(Math.min(...m)),max:o(Math.max(...Z))}))}return this._tile(e,this._loaded?.failed?"\u2013":o(n),v)}_entityTile(C){let V=this._localize,L=this.hass?.states[C.entity??""],M=C.name??L?.attributes.friendly_name??C.entity??"";if(!L)return this._tile(M,"\u2013",V("figures_unavailable"));let e=Number(L.state),i=L.attributes.unit_of_measurement,t=L.state!==""&&Number.isFinite(e)?`${this._number(e)}${i?` ${i}`:""}`:L.state;return this._tile(M,t,V("value_current"))}_tile(C,V,L,M,e){return p`<div class="tile">
      <div class="label">${C}</div>
      <div class="value">${V}</div>
      ${M!==void 0?p`<div class="track" role="presentation">
            <div
              class="fill"
              style="width: ${Math.min(Math.max(M,0),100)}%; background: ${e??"var(--primary-color)"}"
            ></div>
          </div>`:d}
      ${L?p`<div class="line">${L}</div>`:d}
    </div>`}render(){if(!this.hass||!this._config)return p``;let C=this._localize,V=this._range(),L=this._config.columns,M=!!L&&L>=1&&L<=4;return p`<ha-card lang=${this._language}>
      <div class="header">
        <h2 class="title">${this._config.title??""}</h2>
        ${V?p`<span class="chip">${V2(V,this._language)}</span>`:d}
      </div>
      ${this._loaded?.failed?p`<p class="summary">${C("figures_failed")}</p>`:d}
      <div class="content">
      <div
        class="tiles ${M?"fixed":""}"
        style=${M?`--columns: ${L}`:""}
      >
        ${this._tiles.map(e=>{let i=u(e);return i==="statistic"?this._statisticTile(e):i==="entity"?this._entityTile(e):this._energyTile(e)})}
      </div>
      </div>
    </ha-card>`}};T.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0},_selected:{state:!0},_loaded:{state:!0}},T.styles=[B,x`
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
    `];var r2;function t2(){if(customElements.get("ha-chart-base"))return Promise.resolve(!0);let r=window.loadCardHelpers;return r?(r2??=(async()=>{try{(await r()).createCardElement({type:"statistics-graph",entities:[]})}catch{}let H=new Promise(C=>setTimeout(()=>C(!1),1e4));return Promise.race([customElements.whenDefined("ha-chart-base").then(()=>!0),H])})(),r2):Promise.resolve(!1)}var e2=r=>Math.round(r*255).toString(16).padStart(2,"0");function D2(r,H){let C=r.trim();if(/^#[0-9a-f]{6}$/i.test(C))return C+e2(H);if(/^#[0-9a-f]{3}$/i.test(C))return`#${[...C.slice(1)].map(L=>L+L).join("")}${e2(H)}`;let V=C.match(/^rgba?\(([^)]+)\)/i);if(V){let[L,M,e]=V[1].split(/[ ,/]+/).filter(Boolean);return`rgba(${L}, ${M}, ${e}, ${H})`}return C}var S1=r=>r.replace(/[&<>"']/g,H=>`&#${H.charCodeAt(0)};`),E2=r=>`<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${r}"></span>`;function i2(r){let H=r.series.map((L,M)=>({id:L.id,type:"bar",name:L.name,stack:"savings",cursor:"default",barMaxWidth:50,color:D2(L.color,.5),itemStyle:{borderColor:L.color},data:L.values.map((e,i)=>{let t=r.series.slice(M+1).every(o=>Math.sign(o.values[i]??0)!==Math.sign(e??0));return{value:e,itemStyle:e?t?{borderRadius:e>0?[4,4,0,0]:[0,0,4,4]}:void 0:{borderWidth:0}}})})),C=L=>{let M=Array.isArray(L)?L:[L],e=M.filter(A=>A.value),i=document.createElement("div");if(!M.length)return i;let t=e.map(A=>`${E2(String(A.color??""))}${S1(A.seriesName??"")}: ${r.money(A.value??0)}`),o=e.reduce((A,a)=>A+(a.value??0),0);return i.innerHTML=`<b>${S1(r.labels[M[0].dataIndex]?.tooltip??"")}</b>`+(t.length?`<br>${t.join("<br>")}`:"")+(e.length>1?`<br><b>${S1(r.total)}: ${r.money(o)}</b>`:""),i},V={xAxis:{type:"category",data:r.labels.map(L=>L.axis),axisTick:{show:!1}},yAxis:{type:"value",name:r.unit,nameGap:2,nameTextStyle:{align:"left"},axisLabel:{formatter:r.tick},splitLine:{show:!0}},grid:{top:15,bottom:0,left:1,right:1,containLabel:!0},legend:{show:!0,type:"custom",data:r.series.map(L=>({id:L.id,name:L.name}))},tooltip:{trigger:"axis",axisPointer:{type:"shadow"},formatter:C}};return{data:H,options:V}}var W2=300*1e3,o2="250px",N2={pv:["--energy-payback-pv-color","#ff9800"],heat_pump:["--energy-payback-heat-pump-color","#8e021b"],wallbox:["--energy-payback-wallbox-color","#0f9d58"]},F=class extends l{static getStubConfig(){return{}}static getConfigForm(){return{schema:[]}}setConfig(H){}getCardSize(){return 5}getGridOptions(){return{columns:12,min_columns:6}}connectedCallback(){super.connectedCallback(),this._follow()}disconnectedCallback(){super.disconnectedCallback(),this._unfollow?.(),this._unfollow=void 0}get _localize(){return c(this.hass?.locale?.language??this.hass?.language??"en")}get _language(){return this.hass?.locale?.language??"en"}_money(H,C=Math.abs(H)<100){return new Intl.NumberFormat(this._language,{style:"currency",currency:this.hass?.config.currency??"EUR",maximumFractionDigits:C?2:0,minimumFractionDigits:C?2:0}).format(H)}_currencySymbol(){return new Intl.NumberFormat(this._language,{style:"currency",currency:this.hass?.config.currency??"EUR"}).formatToParts(0).find(H=>H.type==="currency")?.value??""}_follow(){this._unfollow||!this.isConnected||!this.hass?.connection||(this._unfollow=X(this.hass.connection,H=>{this._selected=H}))}_request(H){if(this._selected===void 0||!H.length||H.some(M=>M.calculating))return;let C=this._selected??C2(H.map(M=>M.countingSince)),V=this._selected?H1(C):"year",L=H.map(M=>M.savingStatistic);return{key:JSON.stringify([L,C.start,C.end,V]),range:C,period:V,categories:H}}async _load(H){if(!this.hass)return;this._loading=H.key;let C=J1(H.range,H.period),V={},L=!1;try{V=await this.hass.callWS({type:"recorder/statistics_during_period",start_time:new Date(H.range.start).toISOString(),end_time:new Date(H.range.end+1).toISOString(),statistic_ids:H.categories.map(M=>M.savingStatistic),period:V1(H.period),types:["change"]})}catch{L=!0}this._loading===H.key&&(this._loading=void 0,this._loaded={key:H.key,at:Date.now(),period:H.period,slots:C,values:H.categories.map(M=>({category:M.category,values:H2(V[M.savingStatistic],C,H.period)})),failed:L})}willUpdate(H){if(!this.hass)return;H.has("hass")&&this._follow(),this._hasChart===void 0&&(this._hasChart=!1,t2().then(L=>{this._hasChart=L}));let C=this._request(U(this.hass)),V=!this._loaded||Date.now()-this._loaded.at>W2;C&&C.key!==this._loading&&(C.key!==this._loaded?.key||V&&!this._loading)&&this._load(C),H.has("_loaded")&&(this._chart=this._buildChart())}_color(H){let[C,V]=N2[H];return getComputedStyle(this).getPropertyValue(C).trim()||V}_buildChart(){let H=this._loaded;if(!H||H.failed)return;let C=this._localize;return i2({labels:this._labels(H.slots,H.period),series:H.values.map(({category:V,values:L})=>({id:V,name:C(`category.${V}`),color:this._color(V),values:L})),unit:this._currencySymbol(),total:C("history_total"),money:V=>this._money(V,!0),tick:V=>new Intl.NumberFormat(this._language,{maximumFractionDigits:2}).format(V)})}_labels(H,C){let V=t=>new Intl.DateTimeFormat(this._language,t),L=V({hour:"2-digit",minute:"2-digit"}),M=new Date(H[0]).getFullYear()!==new Date(H[H.length-1]).getFullYear(),e={hour:L,day:V({day:"numeric"}),month:V(M?{month:"short",year:"2-digit"}:{month:"short"}),year:V({year:"numeric"})}[C],i={hour:L,day:V({weekday:"short",day:"numeric",month:"short"}),month:V({month:"long",year:"numeric"}),year:V({year:"numeric"})}[C];return H.map(t=>({axis:e.format(t),tooltip:C==="hour"?`${L.format(t)} \u2013 ${L.format(t+36e5)}`:i.format(t)}))}render(){let H=this._localize;if(!this.hass)return p``;let C=U(this.hass),V=H("history_title");if(!C.length)return p`<ha-card>
        <div class="header"><h2 class="title">${V}</h2></div>
        <p class="summary">${H("not_set_up")}</p>
      </ha-card>`;let L=C.some(o=>o.calculating),M=L?void 0:this._loaded,e=M?.values.flatMap(o=>o.values)??[],i=e.reduce((o,A)=>o+(A??0),0),t=e.some(o=>o);return p`<ha-card>
      <div class="header">
        <h2 class="title">${V}</h2>
        ${M&&!M.failed&&t?p`<span class="chip">${this._money(i)}</span>`:d}
      </div>
      ${L?p`<p class="summary">${H("calculating_all")}</p>`:this._body(M,t)}
    </ha-card>`}_body(H,C){let V=this._localize;return this._hasChart?H?.failed?p`<p class="summary">${V("history_failed")}</p>`:p`<div class="chart">
      ${this._chart?p`<ha-chart-base
            .hass=${this.hass}
            .data=${this._chart.data}
            .options=${this._chart.options}
            .height=${o2}
          ></ha-chart-base>`:d}
      ${H&&!C?p`<div class="empty">${V("history_empty")}</div>`:d}
    </div>`:p`<p class="summary">${V("history_no_chart")}</p>`}};F.properties={hass:{attribute:!1},_selected:{state:!0},_loaded:{state:!0},_hasChart:{state:!0}},F.styles=[B,x`
      .chart {
        position: relative;
        min-height: ${K(o2)};
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
        background: color-mix(
          in srgb,
          var(--card-background-color, #fff) 70%,
          transparent
        );
      }
    `];var I2=["energy","statistic","entity"],k=r=>({select:{mode:"dropdown",options:r}}),R=class extends l{constructor(){super(...arguments);this._label=C=>{let V=this._localize,L=`editor_${C.name}`;return V(L)};this._helper=C=>C.name==="period"?this._localize("editor_period_hint"):void 0}setConfig(C){this._config=C}get _localize(){return c(this.hass?.locale?.language??this.hass?.language??"en")}get _tiles(){return this._config?.tiles??[]}willUpdate(){this.hass&&this._info===void 0&&(this._info=null,this.hass.callWS({type:`${h}/figures`}).then(C=>{this._info=C}).catch(()=>{}))}_changed(C){this._config=C,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:C},bubbles:!0,composed:!0}))}_setTiles(C){this._config&&this._changed({...this._config,tiles:C})}_cardSchema(){let C=this._localize;return[{name:"title",selector:{text:{}}},{name:"period",selector:k(M2.map(V=>({value:V,label:C(`period.${V}`)})))},{name:"columns",selector:k([{value:"auto",label:C("editor_columns_auto")},...["1","2","3","4"].map(V=>({value:V,label:V}))])}]}_cardChanged(C){if(!this._config)return;let{title:V,period:L,columns:M}=C.detail.value,e={...this._config};typeof V=="string"&&V?e.title=V:delete e.title,e.period=L??"energy_date",M&&M!=="auto"?e.columns=Number(M):delete e.columns,this._changed(e)}_describe(C){let V=this._localize,L=u(C);if(L==="statistic")return{title:C.name??C.statistic??"",detail:`${C.statistic??""} \xB7 ${V(`value.${C.value??"change"}`)}`};if(L==="entity")return{title:C.name??C.entity??"",detail:`${C.entity??""} \xB7 ${V("value_current")}`};let M=this._info?.areas.find(i=>i.id===C.area),e=M&&C.figure?L1(V,C.figure,M):C.figure??"";return{title:C.name??e,detail:`${M?.name??C.area??""} \xB7 ${V("source.energy")}`}}_tileSchema(C){let V=this._localize,L=u(C),M=[{name:"source",selector:k(I2.map(e=>({value:e,label:V(`source.${e}`)})))}];if(L==="energy"){let e=this._info?.areas??[],i=e.find(t=>t.id===C.area);M.push({name:"area",selector:k(e.map(t=>({value:t.id,label:t.name})))},{name:"figure",selector:k(i?G(i).map(t=>({value:t,label:L1(V,t,i)})):[])})}else L==="statistic"?(M.push({name:"statistic",selector:{statistic:{}}},{name:"value",selector:k(X1.map(e=>({value:e,label:V(`value.${e}`)})))}),(C.value??"change")==="mean"&&M.push({name:"secondary",selector:k(["none","range"].map(e=>({value:e,label:V(`secondary.${e}`)})))})):M.push({name:"entity",selector:{entity:{}}});return M.push({name:"name",selector:{text:{}}}),M}_tileData(C){return{source:u(C),...C,value:C.value??"change",secondary:C.secondary??"none"}}_tileChanged(C,V){let L=V.detail.value,M=this._tiles[C],e=L.source,i=typeof L.name=="string"&&L.name?L.name:void 0,t;if(e!==u(M))t=e==="energy"?{area:"household",figure:"cost"}:e==="statistic"?{statistic:"",value:"change"}:{entity:""};else if(e==="energy"){let o=this._info?.areas.find(n=>n.id===L.area),A=o?G(o):[],a=A.includes(L.figure)?L.figure:A[0];t={area:L.area,figure:a}}else e==="statistic"?(t={statistic:L.statistic??"",value:L.value??"change"},t.value==="mean"&&L.secondary==="range"&&(t.secondary="range")):t={entity:L.entity??""};i&&(t.name=i),this._setTiles(this._tiles.map((o,A)=>A===C?t:o))}_add(){let C=[...this._tiles,{area:"household",figure:"cost"}];this._setTiles(C),this._editing=C.length-1}_remove(C){this._setTiles(this._tiles.filter((V,L)=>L!==C))}render(){if(!this.hass||!this._config)return p``;let C=this._localize;if(this._editing!==void 0&&this._tiles[this._editing]){let V=this._editing,L=this._tiles[V];return p`<div class="editor">
        <div class="heading">
          <ha-icon-button-arrow-prev
            .label=${C("editor_back")}
            @click=${()=>this._editing=void 0}
          ></ha-icon-button-arrow-prev>
          <span>${C("editor_edit_tile",{number:String(V+1)})}</span>
        </div>
        ${u(L)==="energy"&&this._info===null?p`<p class="hint">${C("editor_not_loaded")}</p>`:d}
        <ha-form
          .hass=${this.hass}
          .data=${this._tileData(L)}
          .schema=${this._tileSchema(L)}
          .computeLabel=${this._label}
          @value-changed=${M=>this._tileChanged(V,M)}
        ></ha-form>
      </div>`}return p`<div class="editor">
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
        ${this._tiles.map((V,L)=>{let{title:M,detail:e}=this._describe(V);return p`<div class="tile">
            <div class="text">
              <div class="name">${M||"\u2013"}</div>
              <div class="detail">${e}</div>
            </div>
            <ha-icon-button
              .path=${O1}
              .label=${C("editor_edit")}
              @click=${()=>this._editing=L}
            ></ha-icon-button>
            <ha-icon-button
              .path=${h1}
              .label=${C("editor_remove")}
              @click=${()=>this._remove(L)}
            ></ha-icon-button>
          </div>`})}
      </div>
      <ha-button @click=${this._add}>${C("editor_add_tile")}</ha-button>
    </div>`}};R.properties={hass:{attribute:!1},_config:{state:!0},_info:{state:!0},_editing:{state:!0}},R.styles=x`
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
  `;var $2="https://github.com/ignazhabibi/ha-energy-payback",A2=(r,H)=>{if(!customElements.get(r))try{customElements.define(r,H)}catch{customElements.define(r,class extends H{})}};function a2(r){let H=()=>r.forEach(({tag:e,card:i,editor:t})=>{A2(e,i),t&&A2(t.tag,t.element)});H();let C=window.customElements,V=Date.now(),L=window.setInterval(()=>{let e=window.customElements!==C;e&&H(),(e||Date.now()-V>6e4)&&window.clearInterval(L)},100),M=window;M.customCards=M.customCards??[];for(let{tag:e,name:i,description:t}of r)M.customCards.some(o=>o.type===e)||M.customCards.push({type:e,name:i,description:t,preview:!0,documentationURL:$2})}a2([{tag:"energy-payback-card",card:P,name:"Energy Payback",description:"What your PV plant, heat pump, and electric car have saved, and when they pay off."},{tag:"energy-payback-history-card",card:F,name:"Energy Payback history",description:"The savings of your PV plant, heat pump, and electric car per period. Follows the energy date selection."},{tag:"energy-payback-figures-card",card:T,name:"Energy Payback key figures",description:"Tiles with key figures for a period: costs, solar share, cheap grid power, savings, or any statistic or entity.",editor:{tag:"energy-payback-figures-card-editor",element:R}}]);
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
