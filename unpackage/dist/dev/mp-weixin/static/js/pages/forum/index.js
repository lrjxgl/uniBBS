global.webpackJsonp([12],{101:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(0).default,i=a(3),n=0,o=!0,l=0;e.default={data:{pageLoad:!1,pageHide:!1,pageData:{}},onLoad:function(t){s.setNavigationBarTitle({title:"帖子"}),this.getPage()},onShow:function(){this.pageHide&&(this.pageHide=!1,this.getPage())},onHide:function(){this.pageHide=!0},onReachBottom:function(){this.getList()},onPullDownRefresh:function(){this.refresh()},methods:{getPage:function(){var t=this;s.request({url:i.apiHost+"?m=forum&ajax=1",data:{authcode:i.getAuthCode()},success:function(e){1e3==e.data.error?s.navigateTo({url:"/pages/login/index"}):(o=!1,t.pageLoad=!0,t.pageData=e.data.data,n=e.data.data.per_page)}})},setCat:function(t){l=t,o=!0,n=0,this.defaultActive=0==l?activeClass:"";var e=this.pageData.catlist;for(var a in e)e[a].catid==l?e[a].isactive=1:e[a].isactive=0;this.pageData.catlist=e,this.getList()},getList:function(){var t=this;if(!o&&0==n)return!1;s.request({url:i.apiHost+"?m=forum&ajax=1",data:{per_page:n,catid:l,authcode:i.getAuthCode()},success:function(e){e.data.error||(o?(t.pageData.list=e.data.data.list,o=!1):t.pageData.list=i.json_add(t.pageData.list,e.data.data.list),n=e.data.data.per_page)}})},goForum:function(t){s.navigateTo({url:"/pages/forum/show?id="+t})},refresh:function(){this.getPage(),setTimeout(function(){s.stopPullDownRefresh()},1e3)},loadMore:function(){this.getList()}}}},160:function(t,e){},49:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(101),i=a.n(s),n=a(62),o=!1;var l=function(t){o||a(160)},r=a(2)(i.a,n.a,l,null,null);r.options.__file="..\\..\\..\\..\\www\\uniapp\\uniBBS\\pages\\forum\\index.vue",r.esModule&&Object.keys(r.esModule).some(function(t){return"default"!==t&&"__"!==t.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),r.options.functional&&console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions."),e.default=r.exports},62:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.pageLoad?a("view",[a("scroll-view",{attrs:{"scroll-y":"true"}},[a("view",{staticClass:"tabs-border"},[a("view",{staticClass:"tabs-border-item",class:t.defaultActive,attrs:{eventid:"0"},on:{click:function(e){t.setCat(0)}}},[t._v("推荐")]),t._v(" "),t._l(t.pageData.grouplist,function(e,s){return a("view",{key:s,staticClass:"tabs-border-item",class:{"tabs-border-active":e.isactive},attrs:{eventid:"1-"+s},on:{click:function(a){t.setCat(e.gid)}}},[t._v(t._s(e.title))])})],2)]),t._v(" "),a("view",{staticClass:"flist"},t._l(t.pageData.list,function(e,s){return a("view",{key:s,staticClass:"flist-item",attrs:{eventid:"2-"+s},on:{click:function(a){t.goForum(e.id)}}},[a("view",{staticClass:"flist-user"},[a("image",{staticClass:"flist-user-head",attrs:{src:e.user_head+".100x100.jpg"}}),t._v(" "),a("view",{staticClass:"flex-1"},[a("view",{staticClass:"flist-nick"},[t._v(t._s(e.nickname))]),t._v(" "),a("view",{staticClass:"flist-time"},[t._v(t._s(e.timeago))])])]),t._v(" "),a("view",{staticClass:"flist-title"},[t._v(t._s(e.title))]),t._v(" "),e.videourl?a("view",{staticClass:"flist-vd"},[a("image",{staticClass:"flist-vd-bg",attrs:{src:"../../static/img/0.jpg"}}),t._v(" "),a("div",{staticClass:"flist-vd-play"})]):e.imgurl?a("view",{staticClass:"flist-vd"},[a("image",{staticClass:"flist-vd-bg",attrs:{src:e.imgurl+".middle.jpg",mode:"widthFix"}})]):t._e(),t._v(" "),e.imgslist?a("view",{staticClass:"flist-imgs"},t._l(e.imgslist,function(e,s){return a("image",{key:s,staticClass:"flist-imgs-img",attrs:{src:t.$img+".100x100.jpg",mode:"widthFix"}})})):t._e(),t._v(" "),a("view",{staticClass:"flex flist-ft"},[a("view",{staticClass:"flist-ft-love"},[t._v("\n\t\t\t\t\t"+t._s(e.love_num)+" ")]),t._v(" "),a("view",{staticClass:"flist-ft-cm"},[t._v("\n\t\t\t\t\t"+t._s(e.comment_num)+" ")]),t._v(" "),a("view",{staticClass:"flist-ft-view"},[t._v("\n\t\t\t\t\t"+t._s(e.view_num)+" ")])])])}))],1):t._e()};s._withStripped=!0;var i={render:s,staticRenderFns:[]};e.a=i},83:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n(a(1)),i=n(a(49));function n(t){return t&&t.__esModule?t:{default:t}}a(0).default;new s.default(i.default).$mount(),e.default={config:{navigationBarTitleText:"论坛",onReachBottomDistance:"60px",enablePullDownRefresh:!0}}}},[83]);
//# sourceMappingURL=../../../../.sourcemap/pages/forum/index.js.map