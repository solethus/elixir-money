import{h as R,i as A,j as N,k as q,l as D,m as E,o as F,p as L}from"./chunk-SM5EKOJX.js";import{$ as h,C as b,D as g,L as f,M as r,N as a,R as m,W as s,X as y,aa as C,ba as _,d as i,fa as v,ga as x,ha as B,ia as c,ja as w,ka as S,la as Q,p,pa as T,qa as I,ra as l,ta as k,w as d,ya as U,za as P}from"./chunk-4WGMPCBH.js";var V=["submitButton"];function z(n,e){n&1&&(c(0,"hlm-icon",2),l(1," Loading "))}function O(n,e){if(n&1&&(c(0,"hlm-icon",3),l(1)),n&2){let t=Q();_("name",t.submitIcon()),m(),k(" ",t.submitText()," ")}}var M=class n{loading=r(!1);submitIcon=r("lucideArrowRight");submitText=r("Next");clicked=f();submitButton=y.required("submitButton",{read:a});focus(){this.submitButton().nativeElement.focus()}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=d({type:n,selectors:[["app-submit-button"]],viewQuery:function(t,o){t&1&&T(o.submitButton,V,5,a),t&2&&I()},inputs:{loading:[1,"loading"],submitIcon:[1,"submitIcon"],submitText:[1,"submitText"]},outputs:{clicked:"clicked"},standalone:!0,features:[U([N({lucideLoader2:D,lucideArrowRight:q,lucideSend:E})]),P],decls:4,vars:2,consts:[["submitButton",""],["hlmBtn","","type","submit",3,"click"],["name","lucideLoader2","size","sm",1,"mr-2","animate-spin"],["size","sm",1,"mr-2",3,"name"]],template:function(t,o){if(t&1){let u=w();x(0,"button",1,0),S("click",function(){return b(u),g(o.clicked.emit())}),h(2,z,2,0)(3,O,2,2),B()}t&2&&(C("disabled",o.loading()?!0:null),m(2),v(o.loading()?2:3))},dependencies:[R,A],styles:["[_nghost-%COMP%]{display:block}button[_ngcontent-%COMP%]{width:100%}"]})};var tt=n=>Intl.NumberFormat("en",{style:"currency",currency:n}).formatToParts().find(t=>t.type==="currency").value,et=n=>{let e=n.toUpperCase().split("").map(t=>127462+t.charCodeAt(0)-65);return String.fromCodePoint(...e)};var j=class n{client=new F(L.environment);targetUser=s(null);getTargetUser(){return this.targetUser.asReadonly()}setTargetUser(e){this.targetUser.set(e)}clearTargetUser(){this.targetUser.set(null)}quote=s(null);getQuote(){return this.quote.asReadonly()}setQuote(e){this.quote.set(e)}clearQuote(){this.quote.set(null)}amount=s(null);getAmount(){return this.amount.asReadonly()}setAmount(e){this.amount.set(e)}clearAmount(){this.quote.set(null)}lookupPhoneNo(e){return i(this,null,function*(){return(yield this.client.users.LookupByPhoneNo({UserPhoneNo:e})).user})}generateQuote(e,t,o){return i(this,null,function*(){return yield this.client.payments.Quote({amount:e,currency_code:t,secondary_currency_code:o})})}acceptQuote(e,t,o){return i(this,null,function*(){return yield this.client.payments.Send({sender_phone_no:e,target_phone_no:t,amount_usdc:o})})}static \u0275fac=function(t){return new(t||n)};static \u0275prov=p({token:n,factory:n.\u0275fac,providedIn:"root"})};export{M as a,tt as b,et as c,j as d};
