import{a as f}from"./chunk-3HNEL3CI.js";import{a as E,b as k}from"./chunk-3IMQCCYZ.js";import{A as B,i as q,k as I,x as H}from"./chunk-M2ZXH35F.js";import{Da as h,Ha as d,Ma as _,Mb as x,R as S,Ra as r,Sa as o,Sb as D,Ta as y,Xa as C,f as v,hb as c,jb as m,na as i,oa as l,pb as U,qb as b,sb as u,vb as p,wa as g}from"./chunk-PWGQQNYI.js";var M=()=>["/send"];function N(s,n){if(s&1&&(r(0,"div",1)(1,"h3",3),c(2),u(3,"currency"),o(),r(4,"p",4),c(5),u(6,"currency"),o(),r(7,"p",4),c(8),u(9,"currency"),o(),r(10,"p",4),c(11),u(12,"currency"),o()()),s&2){let e=n;i(2),m(" ",p(3,4,e.amount,e.base,"symbol")," "),i(3),m("USDC ",p(6,8,e.usdc_amount,"",""),""),i(3),m("Fees (USDC): ",p(9,12,e.usdc_fees,"",""),""),i(3),m(" Equivalent: ",p(12,16,e.secondary_currency_quote,e.counter,"symbol")," ")}}var T=class s{constructor(n,e,t){this.router=n;this.sendService=e;this.userService=t;if(this.quote=this.sendService.getQuote(),this.targetUser=this.sendService.getTargetUser(),this.currentUser=this.userService.user,!this.targetUser()||!this.quote()){this.router.navigate(["/lookup"]);return}}loading=g(!1);quote;targetUser;currentUser;next(){return v(this,null,function*(){let n=this.quote(),e=this.targetUser(),t=Number(n?.usdc_amount);if(!(!e||isNaN(t))){this.loading.set(!0);try{let a=yield this.sendService.acceptQuote(this.currentUser().phone_number,e.phone_number,t);f.success("Send successful!"),this.router.navigate(["/"]),this.sendService.clearQuote(),this.sendService.clearSendParams(),this.sendService.clearTargetUser()}catch{f.error("Error processing transaction")}finally{this.loading.set(!1)}}})}static \u0275fac=function(e){return new(e||s)(l(D),l(k),l(B))};static \u0275cmp=S({type:s,selectors:[["app-confirm"]],standalone:!0,features:[U],decls:3,vars:4,consts:[["title","Confirm the transaction",3,"backButtonUrl"],[1,"mb-4"],["submitIcon","lucideSend","submitText","Send",3,"clicked","loading"],["hlmH3","",1,"text-4xl"],["hlmMuted",""]],template:function(e,t){if(e&1&&(y(0,"app-header",0),h(1,N,13,20,"div",1),r(2,"app-submit-button",2),C("clicked",function(){return t.next()}),o()),e&2){let a;d("backButtonUrl",b(3,M)),i(),_((a=t.quote())?1:-1,a),i(),d("loading",t.loading())}},dependencies:[E,H,q,I,x],styles:["div[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;flex-direction:column}"]})};export{T as ConfirmComponent};
