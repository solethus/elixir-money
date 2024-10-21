import{c as J,d as K,g as T,h as X,i as Y}from"./chunk-6XXA7HXI.js";import{b as $,c as ee,d as te,e as re,f as oe,g as ie,h as ne,i as ae,j as se,k as le,l as me,m as pe,o as ce,p as de}from"./chunk-EIK3PKU6.js";import{a as S,c as ue,d as fe}from"./chunk-YQBVYZOW.js";import{b as u,g as n,n as Z}from"./chunk-SM5EKOJX.js";import{$ as D,Aa as W,C as _,D as b,Ha as l,M as m,Q as E,R as i,S as F,Sa as z,W as I,X as L,ba as h,d as B,ea as c,fa as v,ga as a,ha as s,ia as H,ja as M,ka as k,la as P,pa as G,qa as j,ra as d,sa as w,ua as q,va as R,w as U,wa as A,xa as O,y as p,za as Q}from"./chunk-4WGMPCBH.js";var Se=n("p-6 pt-0",{variants:{},defaultVariants:{}});var he=n("text-sm text-muted-foreground",{variants:{},defaultVariants:{}}),y=class r{userClass=m("",{alias:"class"});_computedClass=l(()=>u(he(),this.userClass()));static \u0275fac=function(e){return new(e||r)};static \u0275dir=p({type:r,selectors:[["","hlmCardDescription",""]],hostVars:2,hostBindings:function(e,o){e&2&&c(o._computedClass())},inputs:{userClass:[1,"class","userClass"]},standalone:!0})};var Ee=n("flex p-6 pt-0",{variants:{direction:{row:"flex-row items-center space-x-1.5",column:"flex-col space-y-1.5"}},defaultVariants:{direction:"row"}});var ve=n("flex p-6",{variants:{direction:{row:"flex-row items-center space-x-1.5",column:"flex-col space-y-1.5"}},defaultVariants:{direction:"column"}}),g=class r{userClass=m("",{alias:"class"});_computedClass=l(()=>u(ve({direction:this.direction()}),this.userClass()));direction=m("column");static \u0275fac=function(e){return new(e||r)};static \u0275dir=p({type:r,selectors:[["","hlmCardHeader",""]],hostVars:2,hostBindings:function(e,o){e&2&&c(o._computedClass())},inputs:{userClass:[1,"class","userClass"],direction:[1,"direction"]},standalone:!0})};var ye=n("text-lg font-semibold leading-none tracking-tight",{variants:{},defaultVariants:{}}),V=class r{userClass=m("",{alias:"class"});_computedClass=l(()=>u(ye(),this.userClass()));static \u0275fac=function(e){return new(e||r)};static \u0275dir=p({type:r,selectors:[["","hlmCardTitle",""]],hostVars:2,hostBindings:function(e,o){e&2&&c(o._computedClass())},inputs:{userClass:[1,"class","userClass"]},standalone:!0})};var ge=n("rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-card-foreground shadow-sm",{variants:{},defaultVariants:{}}),x=class r{userClass=m("",{alias:"class"});_computedClass=l(()=>u(ge(),this.userClass()));static \u0275fac=function(e){return new(e||r)};static \u0275dir=p({type:r,selectors:[["","hlmCard",""]],hostVars:2,hostBindings:function(e,o){e&2&&c(o._computedClass())},inputs:{userClass:[1,"class","userClass"]},standalone:!0})};var Ve=()=>["/"];function xe(r,t){r&1&&(a(0,"hlm-error"),d(1,"Phone number is required."),s())}function _e(r,t){r&1&&(a(0,"hlm-error"),d(1,"Invalid phone number provided."),s())}function be(r,t){if(r&1&&D(0,xe,2,0,"hlm-error")(1,_e,2,0,"hlm-error"),r&2){P();let e=O(6);v(e.hasError("required")?0:-1),i(),v(e.hasError("invalid")?1:-1)}}function De(r,t){if(r&1&&(a(0,"section",5)(1,"div",7),H(2,"img",8),a(3,"div",9)(4,"h3",10),d(5),s(),a(6,"p",11),d(7),s(),a(8,"span"),d(9),s(),a(10,"p",11),d(11),s()()()()),r&2){let e=t,o=P();h("@fadeIn",void 0),i(2),h("src",e.image_url,E)("alt",e.first_name+" "+e.surname),i(3),q("",e.first_name," ",e.surname,""),i(2),w(e.country_code),i(2),w(o.flagEmoji()),i(2),w(e.phone_number)}}var He=J("fadeIn",[X("void",T({opacity:0})),Y(":enter",[K("500ms ease-in",T({opacity:1}))])]),Ce=class r{constructor(t,e){this.sendService=t;this.router=e;this.sendService.clearTargetUser(),this.targetUser=this.sendService.getTargetUser(),this.phoneNumberGroup.controls.phoneNumber.setValue("+447911123456"),this.lookupPhoneNo()}loading=I(!1);phoneNumberGroup=new oe({phoneNumber:new ie("",[ee.required])});targetUser;submitButton=L.required(S);flagEmoji=l(()=>{let t=this.targetUser();return t?.country_code?ue(t.country_code):null});lookupPhoneNo(){return B(this,null,function*(){let t=this.phoneNumberGroup.controls.phoneNumber,e=t.value;if(this.targetUser()?.phone_number!==e){if(!this.phoneNumberGroup.valid||!e){this.sendService.clearTargetUser();return}this.loading.set(!0);try{let o=yield this.sendService.lookupPhoneNo(e);if(!o){t.setErrors({invalid:"User not found"});return}this.sendService.setTargetUser(o),this.submitButton().focus()}catch(o){this.sendService.clearTargetUser(),console.error("error",o),t.setErrors({invalid:"User not found"})}finally{this.loading.set(!1)}}})}next(){let t=this.targetUser();if(!this.phoneNumberGroup.valid||!t){this.phoneNumberGroup.markAsTouched();return}this.router.navigate(["/send"])}static \u0275fac=function(e){return new(e||r)(F(fe),F(z))};static \u0275cmp=U({type:r,selectors:[["app-lookup"]],viewQuery:function(e,o){e&1&&G(o.submitButton,S,5),e&2&&j()},standalone:!0,features:[Q],decls:10,vars:7,consts:[["title","Who do you want to send money to?",3,"backButtonUrl"],[3,"ngSubmit","formGroup"],[1,"mb-4"],["hlmLabel",""],["hlmInput","","type","text","placeholder","Who do you want to send money to?","formControlName","phoneNumber",1,"w-full",3,"keydown.enter","blur"],["hlmCard","",1,"mb-4","fade-in"],[3,"loading"],["hlmCardHeader",""],["width","96","height","96",3,"src","alt"],[1,"ml-2"],["hlmCardTitle",""],["hlmCardDescription",""]],template:function(e,o){if(e&1){let f=M();H(0,"app-header",0),a(1,"form",1),k("ngSubmit",function(){return _(f),b(o.next())}),a(2,"hlm-form-field",2)(3,"label",3),d(4,"Phone number "),a(5,"input",4),k("keydown.enter",function(){return _(f),b(o.lookupPhoneNo())})("blur",function(){return _(f),b(o.lookupPhoneNo())}),s()(),R(6),D(7,be,2,2),s(),D(8,De,12,8,"section",5),H(9,"app-submit-button",6),s()}if(e&2){let f;h("backButtonUrl",W(6,Ve)),i(),h("formGroup",o.phoneNumberGroup),i(5);let C=A(o.phoneNumberGroup.controls.phoneNumber);i(),v(C.invalid&&(C.dirty||C.touched)?7:-1),i(),v((f=o.targetUser())?8:-1,f),i(),h("loading",o.loading())}},dependencies:[ce,pe,me,de,y,x,g,V,le,ne,$,te,re,ae,se,S,Z],styles:["[hlmCardHeader][_ngcontent-%COMP%]{display:flex;flex-flow:row}[hlmCardHeader][_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{border-radius:25%}"],data:{animation:[He]}})};export{Ce as LookupComponent,He as fadeIn};
