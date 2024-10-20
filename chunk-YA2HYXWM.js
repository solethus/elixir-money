import{Da as C,E as Ie,I as z,J as N,Ja as $e,K as Te,N as Y,Pa as Qe,S as H,X as Oe,Z as ee,_ as Ee,a as c,aa as f,b as Ae,ba as Ue,c as Q,ca as te,d as m,da as ve,e as de,ea as oe,f as ge,g as we,ha as Ne,j as Se,k as Pe,na as qe,o as Ze,oa as We,r as R,ra as Ge,sa as Xe,t as j,ta as Je,u as Re,ua as Ke,v as Fe,va as I,w as D,y as b,z as De}from"./chunk-NFTVRMM5.js";function Ye(e){var o,t,n="";if(typeof e=="string"||typeof e=="number")n+=e;else if(typeof e=="object")if(Array.isArray(e)){var i=e.length;for(o=0;o<i;o++)e[o]&&(t=Ye(e[o]))&&(n&&(n+=" "),n+=t)}else for(t in e)e[t]&&(n&&(n+=" "),n+=t);return n}function et(){for(var e,o,t=0,n="",i=arguments.length;t<i;t++)(e=arguments[t])&&(o=Ye(e))&&(n&&(n+=" "),n+=o);return n}var ke="-",bt=e=>{let o=At(e),{conflictingClassGroups:t,conflictingClassGroupModifiers:n}=e;return{getClassGroupId:l=>{let s=l.split(ke);return s[0]===""&&s.length!==1&&s.shift(),nt(s,o)||Lt(l)},getConflictingClassGroupIds:(l,s)=>{let g=t[l]||[];return s&&n[l]?[...g,...n[l]]:g}}},nt=(e,o)=>{if(e.length===0)return o.classGroupId;let t=e[0],n=o.nextPart.get(t),i=n?nt(e.slice(1),n):void 0;if(i)return i;if(o.validators.length===0)return;let r=e.join(ke);return o.validators.find(({validator:l})=>l(r))?.classGroupId},tt=/^\[(.+)\]$/,Lt=e=>{if(tt.test(e)){let o=tt.exec(e)[1],t=o?.substring(0,o.indexOf(":"));if(t)return"arbitrary.."+t}},At=e=>{let{theme:o,prefix:t}=e,n={nextPart:new Map,validators:[]};return Pt(Object.entries(e.classGroups),t).forEach(([r,l])=>{_e(l,n,r,o)}),n},_e=(e,o,t,n)=>{e.forEach(i=>{if(typeof i=="string"){let r=i===""?o:ot(o,i);r.classGroupId=t;return}if(typeof i=="function"){if(St(i)){_e(i(n),o,t,n);return}o.validators.push({validator:i,classGroupId:t});return}Object.entries(i).forEach(([r,l])=>{_e(l,ot(o,r),t,n)})})},ot=(e,o)=>{let t=e;return o.split(ke).forEach(n=>{t.nextPart.has(n)||t.nextPart.set(n,{nextPart:new Map,validators:[]}),t=t.nextPart.get(n)}),t},St=e=>e.isThemeGetter,Pt=(e,o)=>o?e.map(([t,n])=>{let i=n.map(r=>typeof r=="string"?o+r:typeof r=="object"?Object.fromEntries(Object.entries(r).map(([l,s])=>[o+l,s])):r);return[t,i]}):e,Zt=e=>{if(e<1)return{get:()=>{},set:()=>{}};let o=0,t=new Map,n=new Map,i=(r,l)=>{t.set(r,l),o++,o>e&&(o=0,n=t,t=new Map)};return{get(r){let l=t.get(r);if(l!==void 0)return l;if((l=n.get(r))!==void 0)return i(r,l),l},set(r,l){t.has(r)?t.set(r,l):i(r,l)}}},it="!",Rt=e=>{let{separator:o,experimentalParseClassName:t}=e,n=o.length===1,i=o[0],r=o.length,l=s=>{let g=[],d=0,v=0,k;for(let p=0;p<s.length;p++){let a=s[p];if(d===0){if(a===i&&(n||s.slice(p,p+r)===o)){g.push(s.slice(v,p)),v=p+r;continue}if(a==="/"){k=p;continue}}a==="["?d++:a==="]"&&d--}let x=g.length===0?s:s.substring(v),M=x.startsWith(it),y=M?x.substring(1):x,u=k&&k>v?k-v:void 0;return{modifiers:g,hasImportantModifier:M,baseClassName:y,maybePostfixModifierPosition:u}};return t?s=>t({className:s,parseClassName:l}):l},Ft=e=>{if(e.length<=1)return e;let o=[],t=[];return e.forEach(n=>{n[0]==="["?(o.push(...t.sort(),n),t=[]):t.push(n)}),o.push(...t.sort()),o},Dt=e=>c({cache:Zt(e.cacheSize),parseClassName:Rt(e)},bt(e)),It=/\s+/,Tt=(e,o)=>{let{parseClassName:t,getClassGroupId:n,getConflictingClassGroupIds:i}=o,r=[],l=e.trim().split(It),s="";for(let g=l.length-1;g>=0;g-=1){let d=l[g],{modifiers:v,hasImportantModifier:k,baseClassName:x,maybePostfixModifierPosition:M}=t(d),y=!!M,u=n(y?x.substring(0,M):x);if(!u){if(!y){s=d+(s.length>0?" "+s:s);continue}if(u=n(x),!u){s=d+(s.length>0?" "+s:s);continue}y=!1}let p=Ft(v).join(":"),a=k?p+it:p,B=a+u;if(r.includes(B))continue;r.push(B);let E=i(u,y);for(let Z=0;Z<E.length;++Z){let J=E[Z];r.push(a+J)}s=d+(s.length>0?" "+s:s)}return s};function Ot(){let e=0,o,t,n="";for(;e<arguments.length;)(o=arguments[e++])&&(t=rt(o))&&(n&&(n+=" "),n+=t);return n}var rt=e=>{if(typeof e=="string")return e;let o,t="";for(let n=0;n<e.length;n++)e[n]&&(o=rt(e[n]))&&(t&&(t+=" "),t+=o);return t};function Et(e,...o){let t,n,i,r=l;function l(g){let d=o.reduce((v,k)=>k(v),e());return t=Dt(d),n=t.cache.get,i=t.cache.set,r=s,s(g)}function s(g){let d=n(g);if(d)return d;let v=Tt(g,t);return i(g,v),v}return function(){return r(Ot.apply(null,arguments))}}var w=e=>{let o=t=>t[e]||[];return o.isThemeGetter=!0,o},st=/^\[(?:([a-z-]+):)?(.+)\]$/i,Ut=/^\d+\/\d+$/,Nt=new Set(["px","full","screen"]),qt=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,Wt=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,Gt=/^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,Xt=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,Jt=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,A=e=>T(e)||Nt.has(e)||Ut.test(e),S=e=>O(e,"length",no),T=e=>!!e&&!Number.isNaN(Number(e)),pe=e=>O(e,"number",T),q=e=>!!e&&Number.isInteger(Number(e)),Kt=e=>e.endsWith("%")&&T(e.slice(0,-1)),h=e=>st.test(e),P=e=>qt.test(e),$t=new Set(["length","size","percentage"]),Qt=e=>O(e,$t,lt),Yt=e=>O(e,"position",lt),eo=new Set(["image","url"]),to=e=>O(e,eo,ro),oo=e=>O(e,"",io),W=()=>!0,O=(e,o,t)=>{let n=st.exec(e);return n?n[1]?typeof o=="string"?n[1]===o:o.has(n[1]):t(n[2]):!1},no=e=>Wt.test(e)&&!Gt.test(e),lt=()=>!1,io=e=>Xt.test(e),ro=e=>Jt.test(e);var so=()=>{let e=w("colors"),o=w("spacing"),t=w("blur"),n=w("brightness"),i=w("borderColor"),r=w("borderRadius"),l=w("borderSpacing"),s=w("borderWidth"),g=w("contrast"),d=w("grayscale"),v=w("hueRotate"),k=w("invert"),x=w("gap"),M=w("gradientColorStops"),y=w("gradientColorStopPositions"),u=w("inset"),p=w("margin"),a=w("opacity"),B=w("padding"),E=w("saturate"),Z=w("scale"),J=w("sepia"),Ce=w("skew"),Be=w("space"),je=w("translate"),le=()=>["auto","contain","none"],he=()=>["auto","hidden","clip","visible","scroll"],ae=()=>["auto",h,o],_=()=>[h,o],He=()=>["",A,S],K=()=>["auto",T,h],Ve=()=>["bottom","center","left","left-bottom","left-top","right","right-bottom","right-top","top"],$=()=>["solid","dashed","dotted","double","none"],be=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],ce=()=>["start","end","center","between","around","evenly","stretch"],U=()=>["","0",h],Le=()=>["auto","avoid","all","avoid-page","page","left","right","column"],L=()=>[T,h];return{cacheSize:500,separator:":",theme:{colors:[W],spacing:[A,S],blur:["none","",P,h],brightness:L(),borderColor:[e],borderRadius:["none","","full",P,h],borderSpacing:_(),borderWidth:He(),contrast:L(),grayscale:U(),hueRotate:L(),invert:U(),gap:_(),gradientColorStops:[e],gradientColorStopPositions:[Kt,S],inset:ae(),margin:ae(),opacity:L(),padding:_(),saturate:L(),scale:L(),sepia:U(),skew:L(),space:_(),translate:_()},classGroups:{aspect:[{aspect:["auto","square","video",h]}],container:["container"],columns:[{columns:[P]}],"break-after":[{"break-after":Le()}],"break-before":[{"break-before":Le()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:[...Ve(),h]}],overflow:[{overflow:he()}],"overflow-x":[{"overflow-x":he()}],"overflow-y":[{"overflow-y":he()}],overscroll:[{overscroll:le()}],"overscroll-x":[{"overscroll-x":le()}],"overscroll-y":[{"overscroll-y":le()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:[u]}],"inset-x":[{"inset-x":[u]}],"inset-y":[{"inset-y":[u]}],start:[{start:[u]}],end:[{end:[u]}],top:[{top:[u]}],right:[{right:[u]}],bottom:[{bottom:[u]}],left:[{left:[u]}],visibility:["visible","invisible","collapse"],z:[{z:["auto",q,h]}],basis:[{basis:ae()}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["wrap","wrap-reverse","nowrap"]}],flex:[{flex:["1","auto","initial","none",h]}],grow:[{grow:U()}],shrink:[{shrink:U()}],order:[{order:["first","last","none",q,h]}],"grid-cols":[{"grid-cols":[W]}],"col-start-end":[{col:["auto",{span:["full",q,h]},h]}],"col-start":[{"col-start":K()}],"col-end":[{"col-end":K()}],"grid-rows":[{"grid-rows":[W]}],"row-start-end":[{row:["auto",{span:[q,h]},h]}],"row-start":[{"row-start":K()}],"row-end":[{"row-end":K()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":["auto","min","max","fr",h]}],"auto-rows":[{"auto-rows":["auto","min","max","fr",h]}],gap:[{gap:[x]}],"gap-x":[{"gap-x":[x]}],"gap-y":[{"gap-y":[x]}],"justify-content":[{justify:["normal",...ce()]}],"justify-items":[{"justify-items":["start","end","center","stretch"]}],"justify-self":[{"justify-self":["auto","start","end","center","stretch"]}],"align-content":[{content:["normal",...ce(),"baseline"]}],"align-items":[{items:["start","end","center","baseline","stretch"]}],"align-self":[{self:["auto","start","end","center","stretch","baseline"]}],"place-content":[{"place-content":[...ce(),"baseline"]}],"place-items":[{"place-items":["start","end","center","baseline","stretch"]}],"place-self":[{"place-self":["auto","start","end","center","stretch"]}],p:[{p:[B]}],px:[{px:[B]}],py:[{py:[B]}],ps:[{ps:[B]}],pe:[{pe:[B]}],pt:[{pt:[B]}],pr:[{pr:[B]}],pb:[{pb:[B]}],pl:[{pl:[B]}],m:[{m:[p]}],mx:[{mx:[p]}],my:[{my:[p]}],ms:[{ms:[p]}],me:[{me:[p]}],mt:[{mt:[p]}],mr:[{mr:[p]}],mb:[{mb:[p]}],ml:[{ml:[p]}],"space-x":[{"space-x":[Be]}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":[Be]}],"space-y-reverse":["space-y-reverse"],w:[{w:["auto","min","max","fit","svw","lvw","dvw",h,o]}],"min-w":[{"min-w":[h,o,"min","max","fit"]}],"max-w":[{"max-w":[h,o,"none","full","min","max","fit","prose",{screen:[P]},P]}],h:[{h:[h,o,"auto","min","max","fit","svh","lvh","dvh"]}],"min-h":[{"min-h":[h,o,"min","max","fit","svh","lvh","dvh"]}],"max-h":[{"max-h":[h,o,"min","max","fit","svh","lvh","dvh"]}],size:[{size:[h,o,"auto","min","max","fit"]}],"font-size":[{text:["base",P,S]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:["thin","extralight","light","normal","medium","semibold","bold","extrabold","black",pe]}],"font-family":[{font:[W]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractons"],tracking:[{tracking:["tighter","tight","normal","wide","wider","widest",h]}],"line-clamp":[{"line-clamp":["none",T,pe]}],leading:[{leading:["none","tight","snug","normal","relaxed","loose",A,h]}],"list-image":[{"list-image":["none",h]}],"list-style-type":[{list:["none","disc","decimal",h]}],"list-style-position":[{list:["inside","outside"]}],"placeholder-color":[{placeholder:[e]}],"placeholder-opacity":[{"placeholder-opacity":[a]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"text-color":[{text:[e]}],"text-opacity":[{"text-opacity":[a]}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...$(),"wavy"]}],"text-decoration-thickness":[{decoration:["auto","from-font",A,S]}],"underline-offset":[{"underline-offset":["auto",A,h]}],"text-decoration-color":[{decoration:[e]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:_()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",h]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",h]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-opacity":[{"bg-opacity":[a]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:[...Ve(),Yt]}],"bg-repeat":[{bg:["no-repeat",{repeat:["","x","y","round","space"]}]}],"bg-size":[{bg:["auto","cover","contain",Qt]}],"bg-image":[{bg:["none",{"gradient-to":["t","tr","r","br","b","bl","l","tl"]},to]}],"bg-color":[{bg:[e]}],"gradient-from-pos":[{from:[y]}],"gradient-via-pos":[{via:[y]}],"gradient-to-pos":[{to:[y]}],"gradient-from":[{from:[M]}],"gradient-via":[{via:[M]}],"gradient-to":[{to:[M]}],rounded:[{rounded:[r]}],"rounded-s":[{"rounded-s":[r]}],"rounded-e":[{"rounded-e":[r]}],"rounded-t":[{"rounded-t":[r]}],"rounded-r":[{"rounded-r":[r]}],"rounded-b":[{"rounded-b":[r]}],"rounded-l":[{"rounded-l":[r]}],"rounded-ss":[{"rounded-ss":[r]}],"rounded-se":[{"rounded-se":[r]}],"rounded-ee":[{"rounded-ee":[r]}],"rounded-es":[{"rounded-es":[r]}],"rounded-tl":[{"rounded-tl":[r]}],"rounded-tr":[{"rounded-tr":[r]}],"rounded-br":[{"rounded-br":[r]}],"rounded-bl":[{"rounded-bl":[r]}],"border-w":[{border:[s]}],"border-w-x":[{"border-x":[s]}],"border-w-y":[{"border-y":[s]}],"border-w-s":[{"border-s":[s]}],"border-w-e":[{"border-e":[s]}],"border-w-t":[{"border-t":[s]}],"border-w-r":[{"border-r":[s]}],"border-w-b":[{"border-b":[s]}],"border-w-l":[{"border-l":[s]}],"border-opacity":[{"border-opacity":[a]}],"border-style":[{border:[...$(),"hidden"]}],"divide-x":[{"divide-x":[s]}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":[s]}],"divide-y-reverse":["divide-y-reverse"],"divide-opacity":[{"divide-opacity":[a]}],"divide-style":[{divide:$()}],"border-color":[{border:[i]}],"border-color-x":[{"border-x":[i]}],"border-color-y":[{"border-y":[i]}],"border-color-s":[{"border-s":[i]}],"border-color-e":[{"border-e":[i]}],"border-color-t":[{"border-t":[i]}],"border-color-r":[{"border-r":[i]}],"border-color-b":[{"border-b":[i]}],"border-color-l":[{"border-l":[i]}],"divide-color":[{divide:[i]}],"outline-style":[{outline:["",...$()]}],"outline-offset":[{"outline-offset":[A,h]}],"outline-w":[{outline:[A,S]}],"outline-color":[{outline:[e]}],"ring-w":[{ring:He()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:[e]}],"ring-opacity":[{"ring-opacity":[a]}],"ring-offset-w":[{"ring-offset":[A,S]}],"ring-offset-color":[{"ring-offset":[e]}],shadow:[{shadow:["","inner","none",P,oo]}],"shadow-color":[{shadow:[W]}],opacity:[{opacity:[a]}],"mix-blend":[{"mix-blend":[...be(),"plus-lighter","plus-darker"]}],"bg-blend":[{"bg-blend":be()}],filter:[{filter:["","none"]}],blur:[{blur:[t]}],brightness:[{brightness:[n]}],contrast:[{contrast:[g]}],"drop-shadow":[{"drop-shadow":["","none",P,h]}],grayscale:[{grayscale:[d]}],"hue-rotate":[{"hue-rotate":[v]}],invert:[{invert:[k]}],saturate:[{saturate:[E]}],sepia:[{sepia:[J]}],"backdrop-filter":[{"backdrop-filter":["","none"]}],"backdrop-blur":[{"backdrop-blur":[t]}],"backdrop-brightness":[{"backdrop-brightness":[n]}],"backdrop-contrast":[{"backdrop-contrast":[g]}],"backdrop-grayscale":[{"backdrop-grayscale":[d]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[v]}],"backdrop-invert":[{"backdrop-invert":[k]}],"backdrop-opacity":[{"backdrop-opacity":[a]}],"backdrop-saturate":[{"backdrop-saturate":[E]}],"backdrop-sepia":[{"backdrop-sepia":[J]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":[l]}],"border-spacing-x":[{"border-spacing-x":[l]}],"border-spacing-y":[{"border-spacing-y":[l]}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["none","all","","colors","opacity","shadow","transform",h]}],duration:[{duration:L()}],ease:[{ease:["linear","in","out","in-out",h]}],delay:[{delay:L()}],animate:[{animate:["none","spin","ping","pulse","bounce",h]}],transform:[{transform:["","gpu","none"]}],scale:[{scale:[Z]}],"scale-x":[{"scale-x":[Z]}],"scale-y":[{"scale-y":[Z]}],rotate:[{rotate:[q,h]}],"translate-x":[{"translate-x":[je]}],"translate-y":[{"translate-y":[je]}],"skew-x":[{"skew-x":[Ce]}],"skew-y":[{"skew-y":[Ce]}],"transform-origin":[{origin:["center","top","top-right","right","bottom-right","bottom","bottom-left","left","top-left",h]}],accent:[{accent:["auto",e]}],appearance:[{appearance:["none","auto"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",h]}],"caret-color":[{caret:[e]}],"pointer-events":[{"pointer-events":["none","auto"]}],resize:[{resize:["none","y","x",""]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":_()}],"scroll-mx":[{"scroll-mx":_()}],"scroll-my":[{"scroll-my":_()}],"scroll-ms":[{"scroll-ms":_()}],"scroll-me":[{"scroll-me":_()}],"scroll-mt":[{"scroll-mt":_()}],"scroll-mr":[{"scroll-mr":_()}],"scroll-mb":[{"scroll-mb":_()}],"scroll-ml":[{"scroll-ml":_()}],"scroll-p":[{"scroll-p":_()}],"scroll-px":[{"scroll-px":_()}],"scroll-py":[{"scroll-py":_()}],"scroll-ps":[{"scroll-ps":_()}],"scroll-pe":[{"scroll-pe":_()}],"scroll-pt":[{"scroll-pt":_()}],"scroll-pr":[{"scroll-pr":_()}],"scroll-pb":[{"scroll-pb":_()}],"scroll-pl":[{"scroll-pl":_()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",h]}],fill:[{fill:[e,"none"]}],"stroke-w":[{stroke:[A,S,pe]}],stroke:[{stroke:[e,"none"]}],sr:["sr-only","not-sr-only"],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-s","border-color-e","border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]}}};var ht=Et(so);function ne(e){let o=new R(e);return[(r={})=>j(o,r),r=>({provide:o,useValue:r}),r=>({provide:o,useExisting:Ze(r)}),o]}var[Oo,Eo,Uo,No]=ne("@spartan-ng SET_CLASS_TO_CUSTOM_ELEMENT_TOKEN");var[qo,Wo,Go,Xo]=ne("@spartan-ng EXPOSES_SIDE_TOKEN"),[Jo,Ko,$o,Qo]=ne("@spartan-ng EXPOSES_STATE_TOKEN");var[Yo,en,tn,on]=ne("@spartan-ng SET_TABLE_CLASSES_TOKEN");function V(...e){return ht(et(e))}var lo="scroll-m-20 text-2xl font-semibold tracking-tight",at=class e{userClass=z("",{alias:"class"});_computedClass=C(()=>V(lo,this.userClass()));static \u0275fac=function(t){return new(t||e)};static \u0275dir=b({type:e,selectors:[["","hlmH3",""]],hostVars:2,hostBindings:function(t,n){t&2&&f(n._computedClass())},inputs:{userClass:[1,"class","userClass"]},standalone:!0})};var ho="scroll-m-20 text-xl font-semibold tracking-tight",ct=class e{userClass=z("",{alias:"class"});_computedClass=C(()=>V(ho,this.userClass()));static \u0275fac=function(t){return new(t||e)};static \u0275dir=b({type:e,selectors:[["","hlmH4",""]],hostVars:2,hostBindings:function(t,n){t&2&&f(n._computedClass())},inputs:{userClass:[1,"class","userClass"]},standalone:!0})};var ao="text-sm text-muted-foreground",dt=class e{userClass=z("",{alias:"class"});_computedClass=C(()=>V(ao,this.userClass()));static \u0275fac=function(t){return new(t||e)};static \u0275dir=b({type:e,selectors:[["","hlmMuted",""]],hostVars:2,hostBindings:function(t,n){t&2&&f(n._computedClass())},inputs:{userClass:[1,"class","userClass"]},standalone:!0})};var co="scroll-m-20 border-border border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0",ie=class e{userClass=z("",{alias:"class"});_computedClass=C(()=>V(co,this.userClass()));static \u0275fac=function(t){return new(t||e)};static \u0275dir=b({type:e,selectors:[["","hlmH2",""]],hostVars:2,hostBindings:function(t,n){t&2&&f(n._computedClass())},inputs:{userClass:[1,"class","userClass"]},standalone:!0})};function gt(e){var o,t,n="";if(typeof e=="string"||typeof e=="number")n+=e;else if(typeof e=="object")if(Array.isArray(e))for(o=0;o<e.length;o++)e[o]&&(t=gt(e[o]))&&(n&&(n+=" "),n+=t);else for(o in e)e[o]&&(n&&(n+=" "),n+=o);return n}function go(){for(var e,o,t=0,n="";t<arguments.length;)(e=arguments[t++])&&(o=gt(e))&&(n&&(n+=" "),n+=o);return n}var wt=go;var vt=e=>typeof e=="boolean"?"".concat(e):e===0?"0":e,pt=wt,re=(e,o)=>t=>{var n;if(o?.variants==null)return pt(e,t?.class,t?.className);let{variants:i,defaultVariants:r}=o,l=Object.keys(i).map(d=>{let v=t?.[d],k=r?.[d];if(v===null)return null;let x=vt(v)||vt(k);return i[d][x]}),s=t&&Object.entries(t).reduce((d,v)=>{let[k,x]=v;return x===void 0||(d[k]=x),d},{}),g=o==null||(n=o.compoundVariants)===null||n===void 0?void 0:n.reduce((d,v)=>{let y=v,{class:k,className:x}=y,M=Q(y,["class","className"]);return Object.entries(M).every(u=>{let[p,a]=u;return Array.isArray(a)?a.includes(c(c({},r),s)[p]):c(c({},r),s)[p]===a})?[...d,k,x]:d},[]);return pt(e,l,g,t?.class,t?.className)};var wo=re("inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"underline-offset-4 hover:underline text-primary"},size:{default:"h-10 py-2 px-4",sm:"h-9 px-3 rounded-md",lg:"h-11 px-8 rounded-md",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),_t=class e{userClass=z("",{alias:"class"});_settableClass=H("");_computedClass=C(()=>V(wo({variant:this._variant(),size:this._size()}),this._settableClass(),this.userClass()));setClass(o){this._settableClass.set(o)}_variant=H("default");set variant(o){this._variant.set(o)}_size=H("default");set size(o){this._size.set(o)}static \u0275fac=function(t){return new(t||e)};static \u0275dir=b({type:e,selectors:[["","hlmBtn",""]],hostVars:2,hostBindings:function(t,n){t&2&&f(n._computedClass())},inputs:{userClass:[1,"class","userClass"],variant:"variant",size:"size"},standalone:!0})};var vo=new R("Ng Icon Config"),po={size:"1em"};function _o(){return j(vo,{optional:!0})??po}var ko=new R("Ng Icon Loader Token");var uo=new R("Ng Icon Cache Token");function mo(){return j(ko,{optional:!0})}function xo(){return j(uo,{optional:!0})}function kt(e){return[{provide:ue,useFactory:o=>c(c({},o?.reduce((t,n)=>c(c({},t),n),{})),e),deps:[[ue,new Re,new Fe]],multi:!0}]}var ue=new R("Icons Token");function yo(){return j(ue,{optional:!0})??[]}function Mo(e){return typeof e=="string"?Promise.resolve(e):Se(e)?Pe(e):e}function zo(e){return e.replace(/([^a-zA-Z0-9])+(.)?/g,(o,t,n)=>n?n.toUpperCase():"").replace(/[^a-zA-Z\d]/g,"").replace(/^([A-Z])/,o=>o.toLowerCase())}var ut=(()=>{class e{constructor(){this.config=_o(),this.icons=yo(),this.loader=mo(),this.cache=xo(),this.injector=j(Ie),this.elementRef=j(N),this._size=this.config.size,this.color=this.config.color}set name(t){this.setIcon(t)}set size(t){this._size=fo(t)}get size(){return this._size}setIcon(t){return m(this,null,function*(){let n=zo(t);for(let i of[...this.icons].reverse())if(i[n]){this.elementRef.nativeElement.innerHTML=i[n];return}if(this.cache?.has(t)){this.elementRef.nativeElement.innerHTML=this.cache.get(t);return}if(this.loader){let i=yield this.requestIconFromLoader(t);if(i!==null){this.cache?.set(t,i),this.elementRef.nativeElement.innerHTML=i;return}}console.warn(`No icon named ${t} was found. You may need to import it using the withIcons function.`)})}requestIconFromLoader(t){return new Promise(n=>{De(this.injector,()=>m(this,null,function*(){let i=yield Mo(this.loader(t));n(i)}))})}static{this.\u0275fac=function(n){return new(n||e)}}static{this.\u0275cmp=D({type:e,selectors:[["ng-icon"]],hostVars:6,hostBindings:function(n,i){n&2&&Ee("--ng-icon__size",i.size)("--ng-icon__stroke-width",i.strokeWidth)("color",i.color)},inputs:{name:"name",size:"size",strokeWidth:"strokeWidth",color:"color"},standalone:!0,features:[I],decls:0,vars:0,template:function(n,i){},styles:["[_nghost-%COMP%]{display:inline-block;width:var(--ng-icon__size);height:var(--ng-icon__size)}"],changeDetection:0})}}return e})();function fo(e){return e==null?"":/^\d+$/.test(e)?`${e}px`:e}var Bo=["xs","sm","base","lg","xl","none"],jo=re("inline-flex",{variants:{variant:{xs:"h-3 w-3",sm:"h-4 w-4",base:"h-6 w-6",lg:"h-8 w-8",xl:"h-12 w-12",none:""}},defaultVariants:{variant:"base"}}),mt=e=>Bo.includes(e),Ho=/\b(h-\d+|w-\d+)\b/g,G=class e{_host=j(N);_platformId=j(Te);_mutObs;_hostClasses=H("");_name=H("");_size=H("base");_color=H(void 0);_strokeWidth=H(void 0);userCls=H("");ngIconSize=C(()=>mt(this._size())?"100%":this._size());ngIconCls=H("");_computedClass=C(()=>{let o=this._size(),t=this._hostClasses(),n=this.userCls(),i=mt(o)?o:"none",r=i==="none"&&o==="none"?t:t.replace(Ho,"");return V(jo({variant:i}),n,r)});constructor(){$e(this._platformId)&&(this._mutObs=new MutationObserver(o=>{o.forEach(t=>{t.attributeName==="class"&&this._hostClasses.set(t.target?.className??"")})}),this._mutObs.observe(this._host.nativeElement,{attributes:!0}))}ngOnDestroy(){this._mutObs?.disconnect(),this._mutObs=void 0}set name(o){this._name.set(o)}set size(o){this._size.set(o)}set color(o){this._color.set(o)}set strokeWidth(o){this._strokeWidth.set(o)}set ngIconClass(o){this.ngIconCls.set(o)}set class(o){this.userCls.set(o)}static \u0275fac=function(t){return new(t||e)};static \u0275cmp=D({type:e,selectors:[["hlm-icon"]],hostVars:2,hostBindings:function(t,n){t&2&&f(n._computedClass())},inputs:{name:"name",size:"size",color:"color",strokeWidth:"strokeWidth",ngIconClass:"ngIconClass",class:"class"},standalone:!0,features:[I],decls:1,vars:6,consts:[[3,"size","name","color","strokeWidth"]],template:function(t,n){t&1&&oe(0,"ng-icon",0),t&2&&(f(n.ngIconCls()),ee("size",n.ngIconSize())("name",n._name())("color",n._color())("strokeWidth",n._strokeWidth()))},dependencies:[ut],encapsulation:2,changeDetection:0})};var xt=kt;var ji='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="width:var(--ng-icon__size, 1em);height:var(--ng-icon__size, 1em);stroke-width:var(--ng-icon__stroke-width, 2)"><line x1="5" x2="19" y1="12" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';var yt='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="width:var(--ng-icon__size, 1em);height:var(--ng-icon__size, 1em);stroke-width:var(--ng-icon__stroke-width, 2)"><polyline points="15 18 9 12 15 6"/></svg>';var Hi='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="width:var(--ng-icon__size, 1em);height:var(--ng-icon__size, 1em);stroke-width:var(--ng-icon__stroke-width, 2)"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>';var Vi='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="width:var(--ng-icon__size, 1em);height:var(--ng-icon__size, 1em);stroke-width:var(--ng-icon__stroke-width, 2)"><line x1="22" x2="11" y1="2" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';function Vo(e,o){if(e&1&&(te(0,"button",1),oe(1,"hlm-icon",3),ve()),e&2){Ne();let t=Je(1);ee("routerLink",t)}}var Mt=class e{backButtonUrl=z();title=z.required();static \u0275fac=function(t){return new(t||e)};static \u0275cmp=D({type:e,selectors:[["app-header"]],inputs:{backButtonUrl:[1,"backButtonUrl"],title:[1,"title"]},standalone:!0,features:[Ke([xt({lucideChevronLeft:yt})]),I],decls:5,vars:3,consts:[[1,"header"],["hlmBtn","","variant","ghost",3,"routerLink"],["hlmH2",""],["name","lucideChevronLeft"]],template:function(t,n){if(t&1&&(te(0,"div",0),Ge(1),Oe(2,Vo,2,1,"button",1),te(3,"h2",2),qe(4),ve()()),t&2){Y();let i=Xe(n.backButtonUrl());Y(),Ue(i!=null&&i.length?2:-1),Y(2),We(n.title())}},dependencies:[ie,G,Qe]})};function zt(e){return`https://${e}-elixir-money-73o2.encr.app`}var me=class{deposits;frontend;payments;users;withdrawals;constructor(o,t){let n=new ze(o,t??{});this.deposits=new ft.ServiceClient(n),this.frontend=new Ct.ServiceClient(n),this.payments=new Bt.ServiceClient(n),this.users=new jt.ServiceClient(n),this.withdrawals=new Ht.ServiceClient(n)}},ft;(o=>{class e{baseClient;constructor(n){this.baseClient=n}Create(n){return m(this,null,function*(){return yield(yield this.baseClient.callAPI("POST","/deposits/create")).json()})}}o.ServiceClient=e})(ft||={});var Ct;(o=>{class e{baseClient;constructor(n){this.baseClient=n}Serve(n,i,r,l){return m(this,null,function*(){return this.baseClient.callAPI(n,`/frontend/${i.map(encodeURIComponent).join("/")}`,r,l)})}}o.ServiceClient=e})(Ct||={});var Bt;(o=>{class e{baseClient;constructor(n){this.baseClient=n}GetWallet(n){return m(this,null,function*(){return yield(yield this.baseClient.callAPI("POST",`/payments/balance/${encodeURIComponent(n)}`)).json()})}Quote(n){return m(this,null,function*(){return yield(yield this.baseClient.callAPI("POST","/payments/quote",JSON.stringify(n))).json()})}Send(n){return m(this,null,function*(){return yield(yield this.baseClient.callAPI("POST","/payments/send",JSON.stringify(n))).json()})}}o.ServiceClient=e})(Bt||={});var jt;(o=>{class e{baseClient;constructor(n){this.baseClient=n}Create(n){return m(this,null,function*(){return yield(yield this.baseClient.callAPI("POST","/users/create",JSON.stringify(n))).json()})}LookupByPhoneNo(n){return m(this,null,function*(){return yield(yield this.baseClient.callAPI("POST","/users/lookup",JSON.stringify(n))).json()})}}o.ServiceClient=e})(jt||={});var Ht;(o=>{class e{baseClient;constructor(n){this.baseClient=n}Create(n){return m(this,null,function*(){return yield(yield this.baseClient.callAPI("POST","/withdrawals/create")).json()})}}o.ServiceClient=e})(Ht||={});function se(e){let o=[];for(let t in e){let n=Array.isArray(e[t])?e[t]:[e[t]];for(let i of n)o.push(`${t}=${encodeURIComponent(i)}`)}return o.join("&")}function bo(e){return"encore.dev.headers."+btoa(JSON.stringify(e)).replaceAll("=","").replaceAll("+","-").replaceAll("/","_")}var X=class{ws;hasUpdateHandlers=[];constructor(o,t){let n=["encore-ws"];t&&n.push(bo(t)),this.ws=new WebSocket(o,n),this.on("error",()=>{this.resolveHasUpdateHandlers()}),this.on("close",()=>{this.resolveHasUpdateHandlers()})}resolveHasUpdateHandlers(){let o=this.hasUpdateHandlers;this.hasUpdateHandlers=[];for(let t of o)t()}hasUpdate(){return m(this,null,function*(){yield new Promise(o=>{this.hasUpdateHandlers.push(()=>o(null))})})}on(o,t){this.ws.addEventListener(o,t)}off(o,t){this.ws.removeEventListener(o,t)}close(){this.ws.close()}},xe=class{socket;buffer=[];constructor(o,t){this.socket=new X(o,t),this.socket.on("message",n=>{this.buffer.push(JSON.parse(n.data)),this.socket.resolveHasUpdateHandlers()})}close(){this.socket.close()}send(o){return m(this,null,function*(){return this.socket.ws.readyState===WebSocket.CONNECTING&&(yield new Promise(t=>{this.socket.ws.addEventListener("open",t,{once:!0})})),this.socket.ws.send(JSON.stringify(o))})}next(){return m(this,null,function*(){try{for(var o=we(this),t,n,i;t=!(n=yield o.next()).done;t=!1){let r=n.value;return r}}catch{i=[n]}finally{try{t&&(n=o.return)&&(yield n.call(o))}finally{if(i)throw i[0]}}})}[Symbol.asyncIterator](){return ge(this,null,function*(){for(;;)if(this.buffer.length>0)yield this.buffer.shift();else{if(this.socket.ws.readyState===WebSocket.CLOSED)return;yield new de(this.socket.hasUpdate())}})}},ye=class{socket;buffer=[];constructor(o,t){this.socket=new X(o,t),this.socket.on("message",n=>{this.buffer.push(JSON.parse(n.data)),this.socket.resolveHasUpdateHandlers()})}close(){this.socket.close()}next(){return m(this,null,function*(){try{for(var o=we(this),t,n,i;t=!(n=yield o.next()).done;t=!1){let r=n.value;return r}}catch{i=[n]}finally{try{t&&(n=o.return)&&(yield n.call(o))}finally{if(i)throw i[0]}}})}[Symbol.asyncIterator](){return ge(this,null,function*(){for(;;)if(this.buffer.length>0)yield this.buffer.shift();else{if(this.socket.ws.readyState===WebSocket.CLOSED)return;yield new de(this.socket.hasUpdate())}})}},Me=class{socket;responseValue;constructor(o,t){let n;this.responseValue=new Promise(i=>n=i),this.socket=new X(o,t),this.socket.on("message",i=>{n(JSON.parse(i.data))})}response(){return m(this,null,function*(){return this.responseValue})}close(){this.socket.close()}send(o){return m(this,null,function*(){return this.socket.ws.readyState===WebSocket.CONNECTING&&(yield new Promise(t=>{this.socket.ws.addEventListener("open",t,{once:!0})})),this.socket.ws.send(JSON.stringify(o))})}},Lo=fetch.bind(void 0),ze=class{baseURL;fetcher;headers;requestInit;constructor(o,t){this.baseURL=o,this.headers={"Content-Type":"application/json"},typeof window>"u"&&(this.headers["User-Agent"]="elixir-money-73o2-Generated-TS-Client (Encore/v1.42.1)"),this.requestInit=t.requestInit??{},t.fetcher!==void 0?this.fetcher=t.fetcher:this.fetcher=Lo}getAuthData(){return m(this,null,function*(){})}createStreamInOut(o,t){return m(this,null,function*(){let{query:n,headers:i}=t??{},r=yield this.getAuthData();r&&(r.query&&(n=c(c({},n),r.query)),r.headers&&(i=c(c({},i),r.headers)));let l=n?"?"+se(n):"";return new xe(this.baseURL+o+l,i)})}createStreamIn(o,t){return m(this,null,function*(){let{query:n,headers:i}=t??{},r=yield this.getAuthData();r&&(r.query&&(n=c(c({},n),r.query)),r.headers&&(i=c(c({},i),r.headers)));let l=n?"?"+se(n):"";return new ye(this.baseURL+o+l,i)})}createStreamOut(o,t){return m(this,null,function*(){let{query:n,headers:i}=t??{},r=yield this.getAuthData();r&&(r.query&&(n=c(c({},n),r.query)),r.headers&&(i=c(c({},i),r.headers)));let l=n?"?"+se(n):"";return new Me(this.baseURL+o+l,i)})}callAPI(o,t,n,i){return m(this,null,function*(){let x=i??{},{query:r,headers:l}=x,s=Q(x,["query","headers"]),g=Ae(c(c({},this.requestInit),s),{method:o,body:n??null});g.headers=c(c(c({},this.headers),g.headers),l);let d=yield this.getAuthData();d&&(d.query&&(r=c(c({},r),d.query)),d.headers&&(g.headers=c(c({},g.headers),d.headers)));let v=r?"?"+se(r):"",k=yield this.fetcher(this.baseURL+t+v,g);if(!k.ok){let M={code:"unknown",message:`request failed: status ${k.status}`};try{let y=yield k.text();try{let u=JSON.parse(y);Ao(u)?M=u:M.message+=": "+JSON.stringify(u)}catch{M.message+=": "+y}}catch(y){M.message+=": "+String(y)}throw new fe(k.status,M)}return k})}};function Ao(e){return e!=null&&So(e.code)&&typeof e.message=="string"&&(e.details===void 0||e.details===null||typeof e.details=="object")}function So(e){return e!==void 0&&Object.values(Vt).includes(e)}var fe=class e extends Error{status;code;details;constructor(o,t){super(t.message),Object.defineProperty(this,"name",{value:"APIError",enumerable:!1,configurable:!0}),Object.setPrototypeOf==null?this.__proto__=e.prototype:Object.setPrototypeOf(this,e.prototype),Error.captureStackTrace!==void 0&&Error.captureStackTrace(this,this.constructor),this.status=o,this.code=t.code,this.details=t.details}};var Vt=(a=>(a.OK="ok",a.Canceled="canceled",a.Unknown="unknown",a.InvalidArgument="invalid_argument",a.DeadlineExceeded="deadline_exceeded",a.NotFound="not_found",a.AlreadyExists="already_exists",a.PermissionDenied="permission_denied",a.ResourceExhausted="resource_exhausted",a.FailedPrecondition="failed_precondition",a.Aborted="aborted",a.OutOfRange="out_of_range",a.Unimplemented="unimplemented",a.Internal="internal",a.Unavailable="unavailable",a.DataLoss="data_loss",a.Unauthenticated="unauthenticated",a))(Vt||{});var Oi={environment:zt("staging")};export{V as a,at as b,ct as c,dt as d,re as e,_t as f,G as g,xt as h,ji as i,Hi as j,Vi as k,Mt as l,me as m,Oi as n};
