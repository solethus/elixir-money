import{A as j,c as z,h as O,j as B,l as F,m as k,n as E,x as N}from"./chunk-M2ZXH35F.js";import{$ as C,Da as v,Eb as w,Ha as S,La as y,Ma as x,Mb as D,R as l,Ra as o,Sa as i,Ta as s,Tb as V,Za as _,_a as H,aa as h,ha as c,hb as a,jb as M,n as d,na as u,oa as g,pb as m,sb as b,ub as P}from"./chunk-PWGQQNYI.js";var L=["*"],Z=k("inline-block",{variants:{variant:{default:"animate-spin [&>svg]:text-foreground/30 [&>svg]:fill-accent"},size:{xs:"h-4 w-4",sm:"h-6 w-6",default:"w-8 h-8 ",lg:"w-12 h-12",xl:"w-16 h-16"}},defaultVariants:{variant:"default",size:"default"}}),p=class t{size=c("default");userClass=c("",{alias:"class"});_computedClass=w(()=>O(Z({size:this.size()}),this.userClass()));static \u0275fac=function(e){return new(e||t)};static \u0275cmp=l({type:t,selectors:[["hlm-spinner"]],hostAttrs:["role","status"],hostVars:2,hostBindings:function(e,r){e&2&&y(r._computedClass())},inputs:{size:[1,"size"],userClass:[1,"class","userClass"]},standalone:!0,features:[m],ngContentSelectors:L,decls:5,vars:0,consts:[["aria-hidden","true","viewBox","0 0 100 101","fill","none","xmlns","http://www.w3.org/2000/svg",1,"animate-spin"],["d","M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z","fill","currentColor"],["d","M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z","fill","currentFill"],[1,"sr-only"]],template:function(e,r){e&1&&(_(),C(),o(0,"svg",0),s(1,"path",1)(2,"path",2),i(),h(),o(3,"span",3),H(4),i())},encapsulation:2})};function A(t,n){if(t&1&&(o(0,"p",4),a(1),b(2,"currency"),i()),t&2){let e=n;u(),M(" ",P(2,1,e.balance,e.currency)," ")}}function R(t,n){t&1&&s(0,"hlm-spinner",5)}var I=class t{constructor(n){this.userService=n;this.user=this.userService.user(),this.balance=z(d(this.userService.getUserBalance()))}user;balance;static \u0275fac=function(e){return new(e||t)(g(j))};static \u0275cmp=l({type:t,selectors:[["app-home"]],standalone:!0,features:[m],decls:10,vars:2,consts:[[3,"title"],[1,"content","flex","flex-col","items-center","gap-3"],[1,"flex","items-center","mb-4"],["hlmH4",""],["hlmP",""],["size","sm"],["hlmBtn","","routerLink","/lookup"]],template:function(e,r){if(e&1&&(s(0,"app-header",0),o(1,"div",1)(2,"div",2)(3,"h4",3),a(4,"Balance:"),i(),a(5," \xA0 "),v(6,A,3,4,"p",4)(7,R,1,0,"hlm-spinner",5),i(),o(8,"button",6),a(9,"Send Money"),i()()),e&2){let f;S("title","Welcome "+r.user.first_name+" \u{1F389}"),u(6),x((f=r.balance())?6:7,f)}},dependencies:[E,V,B,F,N,D,p],styles:["[_nghost-%COMP%]{display:block;padding:10px}.content[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{flex:1}.content[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%], .content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{display:inline-block}.content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-top:0!important}"]})};export{I as HomeComponent};
