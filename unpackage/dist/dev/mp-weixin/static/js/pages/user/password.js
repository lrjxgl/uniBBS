global.webpackJsonp([3],{110:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(0).default,o=a(3);e.default={data:{pageLoad:!1,pageData:{}},onLoad:function(t){t.id,this.getPage()},methods:{getPage:function(){var t=this;s.request({url:o.apiHost+"?m=user&a=password&ajax=1",data:{authcode:o.getAuthCode(),fromapp:o.fromapp()},success:function(e){t.pageLoad=!0,t.pageData=e.data.data}})}},submit:function(t){s.request({url:o.apiHost+"?m=user&a=passwordsave&ajax=1&fromapp="+o.fromapp()+"&authcode="+o.getAuthCode(),method:"POST",header:{"content-type":"application/x-www-form-urlencoded"},data:t.detail.value,success:function(t){t.data;t.data.error?s.showToast({title:t.data.message}):s.navigateBack()}})}}},170:function(t,e){},58:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(110),o=a.n(s),n=a(71),u=!1;var i=function(t){u||a(170)},r=a(2)(o.a,n.a,i,null,null);r.options.__file="..\\..\\..\\..\\www\\uniapp\\uniBBS\\pages\\user\\password.vue",r.esModule&&Object.keys(r.esModule).some(function(t){return"default"!==t&&"__"!==t.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),r.options.functional&&console.error("[vue-loader] password.vue: functional components are not supported with templates, they should use render functions."),e.default=r.exports},71:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",[t.pageLoad?a("view",[a("form",{attrs:{eventid:"0"},on:{submit:function(e){t.submit()}}},[a("view",{staticClass:"input-flex"},[a("view",{staticClass:"input-flex-label"},[t._v("旧密码")]),t._v(" "),a("input",{staticClass:"input-flex-text",attrs:{password:"password",name:"oldpassword"}})]),t._v(" "),a("view",{staticClass:"input-flex"},[a("view",{staticClass:"input-flex-label"},[t._v("新密码")]),t._v(" "),a("input",{staticClass:"input-flex-text",attrs:{password:"password",name:"password"}})]),t._v(" "),a("view",{staticClass:"input-flex"},[a("view",{staticClass:"input-flex-label"},[t._v("重复密码")]),t._v(" "),a("input",{staticClass:"input-flex-text",attrs:{password:"password",name:"password2"}})]),t._v(" "),a("button",{staticClass:"btn-row-submit",attrs:{type:"submit"}})],1)],1):t._e()])};s._withStripped=!0;var o={render:s,staticRenderFns:[]};e.a=o},92:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n(a(1)),o=n(a(58));function n(t){return t&&t.__esModule?t:{default:t}}a(0).default;new s.default(o.default).$mount(),e.default={config:{}}}},[92]);
//# sourceMappingURL=../../../../.sourcemap/pages/user/password.js.map