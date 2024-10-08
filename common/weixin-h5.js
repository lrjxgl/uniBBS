import wx from "./weixin-sdk.js" 
export default{
	wxshare_title:"DeituiCMS",
	wxshare_link:document.location.href,
	wxshare_imgUrl:"https://demo.deituicms.com/static/images/logo.png",
	wxshare_desc:"DeituiCMS开源免费",
	share:function(){
		var that=this;
		
		uni.request({
			url:"https://demo.deituicms.com/index/weixin_jssdk/sign?ajax=1",
			data:{
				url:this.wxshare_link.split('#')[0]
			},
			success:function(res){
				var sign=res.data;
				wx.config({
					debug: false,
					  appId: sign.appId, // 和获取Ticke的必须一样------必填，公众号的唯一标识
					  timestamp:sign.timestamp, // 必填，生成签名的时间戳
					  nonceStr: sign.nonceStr, // 必填，生成签名的随机串
					  signature: sign.signature,// 必填，签名，见附录1
					  //需要分享的列表项:发送给朋友，分享到朋友圈，分享到QQ，分享到QQ空间
					  jsApiList: [
						  'checkJsApi',
						'updateAppMessageShareData',
						'updateTimelineShareData',
						'onMenuShareAppMessage',
						'onMenuShareTimeline',
						'onMenuShareQQ',
						'onMenuShareQZone'
					  ]
					
				})
				wx.ready(function () {
					/*
					wx.checkJsApi({
						jsApiList: [
							'updateAppMessageShareData',
							'updateTimelineShareData',
						],  
						success: function(res) {
						// 以键值对的形式返回，可用的api值true，不可用为false
						// 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
						}
					});
					 
					//分享到微信和QQ
					wx.updateAppMessageShareData({ 
						title: that.wxshare_title, 
						desc: that.wxshare_desc, 
						link: that.wxshare_link.split('#')[0]+"static/redirect.html?gourl="+encodeURIComponent(that.wxshare_link),
						imgUrl: that.wxshare_imgUrl, 
						success: function (e) {
						  
						}
					})
					//分享到朋友圈和空间
					wx.updateTimelineShareData({ 
						title: that.wxshare_title, 
						link: that.wxshare_link.split('#')[0]+"static/redirect.html?gourl="+encodeURIComponent(that.wxshare_link), 
						imgUrl: that.wxshare_imgUrl, 
						success: function () {
						 
						}
					})*/
					
					//分享朋友
					wx.onMenuShareAppMessage({
						title: that.wxshare_title, 
						desc: that.wxshare_desc, 
						link: that.wxshare_link.split('#')[0]+"static/redirect.html?gourl="+encodeURIComponent(that.wxshare_link),
						imgUrl: that.wxshare_imgUrl, 
					
						success: function () {
						// 用户点击了分享后执行的回调函数
						}
					});
					//分享到朋友圈
					wx.onMenuShareTimeline({
						title: that.wxshare_title, 
						link: that.wxshare_link.split('#')[0]+"static/redirect.html?gourl="+encodeURIComponent(that.wxshare_link),
						imgUrl: that.wxshare_imgUrl, 
						success: function () {
						// 用户点击了分享后执行的回调函数
						},
					})
					//分享到QQ
					wx.onMenuShareQQ({
						title: that.wxshare_title, 
						desc: that.wxshare_desc, 
						link: that.wxshare_link.split('#')[0]+"static/redirect.html?gourl="+encodeURIComponent(that.wxshare_link),
						imgUrl: that.wxshare_imgUrl, 
						success: function () {
						// 用户确认分享后执行的回调函数
						},
						cancel: function () {
						// 用户取消分享后执行的回调函数
						}
					});
					//分享到qq空间
					wx.onMenuShareQZone({
						title: that.wxshare_title, 
						desc: that.wxshare_desc, 
						link: that.wxshare_link.split('#')[0]+"static/redirect.html?gourl="+encodeURIComponent(that.wxshare_link),
						imgUrl: that.wxshare_imgUrl, 
						success: function () {
						// 用户确认分享后执行的回调函数
						},
						cancel: function () {
						// 用户取消分享后执行的回调函数
						}
					});
					
				});
			}
		})
	}
}