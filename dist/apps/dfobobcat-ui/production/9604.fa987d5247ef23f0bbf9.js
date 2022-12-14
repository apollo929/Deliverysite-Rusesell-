(self.webpackChunkdfobobcat=self.webpackChunkdfobobcat||[]).push([[9604],{9604:(t,o,e)=>{"use strict";e.r(o),e.d(o,{StaffJobsPageModule:()=>T});var n=e(2057),s=e(3738),i=e(3498),c=e(8535),r=e(9765),a=e(6215),l=e(739),u=e(6682),d=e(5257),b=e(3342),f=e(6782),h=e(3190),p=e(8002),g=e(4705),m=e(7422),x=e(1108),y=e(793),J=e(4694);let Z=(()=>{class t{constructor(t){this.fb=t,this.clockOff=new y.vpe}ngOnInit(){var t,o,e;this.form=this.fb.group({id:[null===(t=this.job)||void 0===t?void 0:t.id],equipment:[null===(o=this.job)||void 0===o?void 0:o.equipment],address:[null===(e=this.job)||void 0===e?void 0:e.address]})}}return t.\u0275fac=function(o){return new(o||t)(y.Y36(s.qu))},t.\u0275cmp=y.Xpm({type:t,selectors:[["bc-today-job"]],inputs:{job:"job"},outputs:{clockOff:"clockOff"},decls:8,vars:4,consts:[[1,"title"],["theme","light","label","Type of building equipment","labelBackground","#78909c",3,"readonly","control"],["theme","light","label","Building Address","labelBackground","#78909c",3,"readonly","control"],["type","button","expand","block","size","large","shape","round",1,"main-action-btn",3,"click"],["slot","start","src","/assets/icon/check.svg"]],template:function(t,o){1&t&&(y.TgZ(0,"div",0),y._uU(1,"Current job"),y.qZA(),y._UZ(2,"bc-input",1),y._UZ(3,"bc-input",2),y.TgZ(4,"ion-button",3),y.NdJ("click",function(){return o.clockOff.emit(o.job.id)}),y._UZ(5,"ion-icon",4),y.TgZ(6,"span"),y._uU(7,"clock off"),y.qZA(),y.qZA()),2&t&&(y.xp6(2),y.Q6J("readonly",!0)("control",o.form.controls.equipment),y.xp6(1),y.Q6J("readonly",!0)("control",o.form.controls.address))},directives:[J.am,i.YG,i.gu],styles:[".title[_ngcontent-%COMP%]{font-weight:700;font-size:16px;line-height:19px;margin-bottom:22px}bc-input[_ngcontent-%COMP%]{display:block;margin-bottom:28px}ion-button[_ngcontent-%COMP%]{margin-top:8px}[_nghost-%COMP%]{display:block;background-color:#78909c;padding:12px 24px 24px;color:#fff;margin:0 -24px}"],changeDetection:0}),t})();function k(t,o){if(1&t){const t=y.EpF();y.ynx(0),y.TgZ(1,"bc-today-job",10),y.NdJ("clockOff",function(o){return y.CHM(t),y.oxw(2).clockOff(o)}),y.qZA(),y.BQk()}if(2&t){const t=y.oxw().ngIf;y.xp6(1),y.Q6J("job",t.todayJob)}}function v(t,o){1&t&&(y.TgZ(0,"h2"),y._uU(1,"Upcoming Requests"),y.qZA())}function C(t,o){1&t&&(y.TgZ(0,"h2"),y._uU(1,"Past Requests"),y.qZA())}function j(t,o){1&t&&(y.TgZ(0,"h2"),y._uU(1,"Cancelled Requests"),y.qZA())}function w(t,o){1&t&&(y.TgZ(0,"div",13),y._uU(1," We didn't find any jobs. "),y.qZA())}function q(t,o){if(1&t){const t=y.EpF();y.TgZ(0,"bc-job-card-staff",16),y.NdJ("cancelled",function(o){return y.CHM(t),y.oxw(4).jobCancelled(o)})("clockIn",function(){const o=y.CHM(t).$implicit;return y.oxw(4).clockIn(o.id)}),y.qZA()}if(2&t){const t=o.$implicit,e=o.index,n=y.oxw(4);y.Q6J("index",e)("status",n.selectedStatus)("job",t)}}function Q(t,o){if(1&t&&(y.TgZ(0,"div",14),y.YNc(1,q,1,3,"bc-job-card-staff",15),y.qZA()),2&t){const t=y.oxw().ngIf;y.xp6(1),y.Q6J("ngForOf",t.items)}}function A(t,o){if(1&t&&(y.ynx(0),y.YNc(1,w,2,0,"div",11),y.YNc(2,Q,2,1,"div",12),y.BQk()),2&t){const t=o.ngIf;y.xp6(1),y.Q6J("ngIf",!t.items||!t.items.length),y.xp6(1),y.Q6J("ngIf",t.items&&t.items.length)}}const Y=function(t){return{items:t}};function O(t,o){if(1&t){const t=y.EpF();y.TgZ(0,"ion-content",1),y.TgZ(1,"div",2),y.TgZ(2,"h1"),y._uU(3,"Jobs"),y.qZA(),y.YNc(4,k,2,1,"ng-container",3),y.TgZ(5,"div"),y.TgZ(6,"bc-status-switcher-staff",4),y.NdJ("selected",function(o){return y.CHM(t),y.oxw().statusChanges$.next(o)}),y.qZA(),y.qZA(),y.TgZ(7,"form",5),y.NdJ("submit",function(){return y.CHM(t),y.oxw().searchSubmit$.next()}),y.TgZ(8,"bc-input",6),y.NdJ("keyup.enter",function(){return y.CHM(t),y.oxw().searchSubmit$.next()}),y._UZ(9,"ion-icon",7),y.qZA(),y.qZA(),y.ynx(10,8),y.YNc(11,v,2,0,"h2",9),y.YNc(12,C,2,0,"h2",9),y.YNc(13,j,2,0,"h2",9),y.BQk(),y.YNc(14,A,3,2,"ng-container",3),y.ALo(15,"async"),y.qZA(),y.qZA()}if(2&t){const t=o.ngIf,e=y.oxw();y.Q6J("scrollY",!0),y.xp6(4),y.Q6J("ngIf",t.todayJob),y.xp6(2),y.Q6J("initial",e.JobFilter.Upcoming),y.xp6(1),y.Q6J("formGroup",e.searchForm),y.xp6(1),y.Q6J("control",e.searchCtrl),y.xp6(2),y.Q6J("ngSwitch",t.selectedStatus),y.xp6(1),y.Q6J("ngSwitchCase",e.JobFilter.Upcoming),y.xp6(1),y.Q6J("ngSwitchCase",e.JobFilter.Past),y.xp6(1),y.Q6J("ngSwitchCase",e.JobFilter.Cancelled),y.xp6(1),y.Q6J("ngIf",y.VKq(12,Y,y.lcZ(15,10,e.jobs$)))}}const $=function(t,o){return{selectedStatus:t,todayJob:o}},_=[{path:"",component:(()=>{class t{constructor(t,o,e,n,s,i,c,l,u){this.myAssignedJobsGQL=t,this.todaysAssignedJobGQL=o,this.router=e,this.fb=n,this.addClockInGQL=s,this.alertService=i,this.geolocation=c,this.configService=l,this.hasClockedIntoJobIdGQL=u,this.searchSubmit$=new r.xQ,this.todaysJob$=new a.X(void 0),this.selectedStatus=g.Ez.Upcoming,this.statusChanges$=new a.X(g.Ez.Upcoming),this.JobFilter=g.Ez,this.jobs$=new a.X([]),this.destroy$=new r.xQ,this.searchForm=this.fb.group({searchCtrl:[""]})}ionViewWillEnter(){const t=this.getJobs(),o=this.getTodaysJob();(0,l.aj)([t,o]).pipe((0,d.q)(1)).subscribe(([t,o])=>{if(this.jobs$.next(t),o){const t=o.equipment.map(t=>t.name).join(", ");this.todaysJob$.next(Object.assign(Object.assign({},o),{equipment:t}))}else this.todaysJob$.next(void 0)}),(0,u.T)(this.searchSubmit$,this.statusChanges$.pipe((0,b.b)(t=>this.selectedStatus=t))).pipe((0,f.R)(this.destroy$),(0,h.w)(()=>this.getJobs()),(0,b.b)(t=>{this.jobs$.next(t)})).subscribe(()=>{this.sortDayByPriority(this.jobs$.value)})}array_move(t,o,e){if(e>=t.length)for(var n=e-t.length+1;n--;)t.push(void 0);return t.splice(e,0,t.splice(o,1)[0]),t}sortDayByPriority(t){for(var o=0;o<t.length;o++)""!=t[o].priority&&(t=this.array_move(t,o,Number(t[o].priority)));console.log(t)}clockOff(t){this.router.navigate(["/staff","clock-off",t])}get searchCtrl(){return this.searchForm.get("searchCtrl")}jobCancelled(t){this.jobs$.pipe((0,d.q)(1)).subscribe(o=>{o.splice(t,1),this.jobs$.next(o)})}clockIn(t){this.router.navigate(["/staff","clock-in",t])}getJobs(){return this.myAssignedJobsGQL.fetch({search:this.searchCtrl.value,filter:this.selectedStatus}).pipe((0,p.U)(t=>t.data.me.assignedJobs))}getTodaysJob(){return this.todaysAssignedJobGQL.fetch().pipe((0,p.U)(t=>t.data.me.todaysAssignedJob))}ionViewWillLeave(){this.destroy$.next()}}return t.\u0275fac=function(o){return new(o||t)(y.Y36(g.kK),y.Y36(g.p6),y.Y36(c.F0),y.Y36(s.qu),y.Y36(g.Ll),y.Y36(m.c9),y.Y36(x.b),y.Y36(m.E4),y.Y36(g.VY))},t.\u0275cmp=y.Xpm({type:t,selectors:[["bc-staff-jobs"]],decls:4,vars:8,consts:[[3,"scrollY",4,"ngIf"],[3,"scrollY"],[1,"page-wrapper"],[4,"ngIf"],[3,"initial","selected"],[3,"formGroup","submit"],["type","search","inputmode","search","placeholder","What are you looking for?..","label","Search","theme","dark",3,"control","keyup.enter"],["src","/assets/icon/search.svg"],[3,"ngSwitch"],[4,"ngSwitchCase"],[3,"job","clockOff"],["class","no-items-found",4,"ngIf"],["class","job-scroll",4,"ngIf"],[1,"no-items-found"],[1,"job-scroll"],[3,"index","status","job","cancelled","clockIn",4,"ngFor","ngForOf"],[3,"index","status","job","cancelled","clockIn"]],template:function(t,o){1&t&&(y._UZ(0,"bc-header"),y.YNc(1,O,16,14,"ion-content",0),y.ALo(2,"async"),y.ALo(3,"async")),2&t&&(y.xp6(1),y.Q6J("ngIf",y.WLB(5,$,y.lcZ(2,1,o.statusChanges$),y.lcZ(3,3,o.todaysJob$))))},directives:[J.Gt,n.O5,i.W2,J.vN,s._Y,s.JL,s.sg,J.am,i.gu,n.RF,n.n9,Z,n.sg,J.Wr],pipes:[n.Ov],styles:["bc-job-card-staff[_ngcontent-%COMP%]{display:block}bc-job-card-staff[_ngcontent-%COMP%], h1[_ngcontent-%COMP%]{margin-bottom:24px}bc-today-job[_ngcontent-%COMP%]{display:block;margin-top:-8px}ion-fab-button[_ngcontent-%COMP%]{height:72px;width:72px;--border-style:solid;--border-width:1px}"],changeDetection:0}),t})()}];let I=(()=>{class t{}return t.\u0275fac=function(o){return new(o||t)},t.\u0275mod=y.oAB({type:t}),t.\u0275inj=y.cJS({imports:[[c.Bz.forChild(_)],c.Bz]}),t})();var S=e(5967);let T=(()=>{class t{}return t.\u0275fac=function(o){return new(o||t)},t.\u0275mod=y.oAB({type:t}),t.\u0275inj=y.cJS({providers:[x.b],imports:[[n.ez,s.u5,i.Pc,I,S.C,s.UX]]}),t})()}}]);