import{n as q,p as A,q as D,r as N,v as P,w as E,y as L,z as M}from"./chunk-7DZB7B6B.js";import{Ca as y,Fa as _,Ga as v,K as p,Ka as C,Na as B,Oa as w,Pa as l,R as d,Ra as x,Ta as S,Ua as Q,Y as b,Z as f,ab as T,bb as k,db as c,f as i,fa as g,fb as I,ga as s,ha as a,kb as U,lb as R,ma as m,va as r,wa as h}from"./chunk-ZUB5IIWK.js";var j=["submitButton"];function z(n,t){n&1&&(l(0,"hlm-icon",2),c(1," Loading "))}function O(n,t){if(n&1&&(l(0,"hlm-icon",3),c(1)),n&2){let e=Q();v("name",e.submitIcon()),m(),I(" ",e.submitText()," ")}}var F=class n{loading=s(!1);submitIcon=s("lucideArrowRight");submitText=s("Next");clicked=g();submitButton=h.required("submitButton",{read:a});focus(){this.submitButton().nativeElement.focus()}static \u0275fac=function(e){return new(e||n)};static \u0275cmp=d({type:n,selectors:[["app-submit-button"]],viewQuery:function(e,o){e&1&&T(o.submitButton,j,5,a),e&2&&k()},inputs:{loading:[1,"loading"],submitIcon:[1,"submitIcon"],submitText:[1,"submitText"]},outputs:{clicked:"clicked"},standalone:!0,features:[U([D({lucideLoader2:P,lucideArrowRight:N,lucideSend:E})]),R],decls:4,vars:2,consts:[["submitButton",""],["hlmBtn","","type","submit",3,"click"],["name","lucideLoader2","size","sm",1,"mr-2","animate-spin"],["size","sm",1,"mr-2",3,"name"]],template:function(e,o){if(e&1){let u=x();B(0,"button",1,0),S("click",function(){return b(u),f(o.clicked.emit())}),y(2,z,2,0)(3,O,2,2),w()}e&2&&(_("disabled",o.loading()?!0:null),m(2),C(o.loading()?2:3))},dependencies:[q,A],styles:["[_nghost-%COMP%]{display:block}button[_ngcontent-%COMP%]{width:100%}"]})};var H=class n{client=new L(M.environment);targetUser=r(null);getTargetUser(){return this.targetUser.asReadonly()}setTargetUser(t){this.targetUser.set(t)}clearTargetUser(){this.targetUser.set(null)}quote=r(null);getQuote(){return this.quote.asReadonly()}setQuote(t){this.quote.set(t)}clearQuote(){this.quote.set(null)}amount=r(null);getAmount(){return this.amount.asReadonly()}setAmount(t){this.amount.set(t)}clearAmount(){this.quote.set(null)}lookupPhoneNo(t){return i(this,null,function*(){return(yield this.client.users.LookupByPhoneNo({UserPhoneNo:t})).user})}generateQuote(t,e,o){return i(this,null,function*(){return yield this.client.payments.Quote({amount:t,currency_code:e,secondary_currency_code:o})})}acceptQuote(t,e,o){return i(this,null,function*(){return yield this.client.payments.Send({sender_phone_no:t,target_phone_no:e,amount_usdc:o})})}static \u0275fac=function(e){return new(e||n)};static \u0275prov=p({token:n,factory:n.\u0275fac,providedIn:"root"})};export{F as a,H as b};
