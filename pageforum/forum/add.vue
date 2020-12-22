<template>
	<view>
		<view v-if="pageLoad">
			<view class="main-body">
				<form  @submit="formSubmit"  >
					<view class="input-flex">
						<view class="input-flex-label w60">主题</view>
						<input type="text" name="title" class="input-flex-text" />
					</view>
					<view class="input-flex">
						<view class="input-flex-label">选择板块</view> 							
						<pickergroup placeholder="请选择"   :data="pageData.grouplist"></pickergroup>						 
					</view>

					<view class="textarea-flex">
						<view class="input-flex-label flex-1">内容</view>
						<textarea name="content" class="h100 textarea-flex-text"></textarea>
					</view>
					<div class="tabs-border">
						<div :class="tab==''?'tabs-border-active':''" @click="tab=''" class="tabs-border-item">图片</div>
						<div @click="tab='video'"  :class="tab=='video'?'tabs-border-active':''"   class="tabs-border-item">视频</div>
					</div>
					<div :class="tab=='video'?'none':''">
						<input maxlength="-1" type="text" class="none" name="imgsdata" :value="imgsData" />
						<upimg-box @call-parent="callImgsData" name="imgsdata"></upimg-box>
					</div>
					<div  :class="tab==''?'none':''">
						<input  maxlength="-1" type="text" class="none" name="videourl" :value="mp4url" />
						<up-video @call-parent="callMp4url" dTrueMp4url="" dMp4url=""></up-video>
					</div>
					 
					<button formType="submit" class="btn-row-submit">提交</button>
				</form> 
			</view>
		</view>
	</view>
</template>

<script>
	import pickergroup from "../../components/pickergroup.vue";
	import upimgBox from "../../components/upimgbox.vue";
	import upVideo from "../../components/up-video.vue";
	var app = require("../../common/common.js");
	var id;
	export default {
		components:{
			pickergroup,
			upimgBox,
			upVideo
		},
		data:function(){
			return {
				pageLoad:false, 
				pageHide:false,
				pageData:{},
				tab:"",
				mp4url:"",
				imgsData:""
			}
			
		},
		onLoad: function (option) {
			id = option.id;
			this.getPage();
		},
		onReady: function () {
			uni.setNavigationBarTitle({
				title: "发布帖子",
			})
		},
		methods: {
			callImgsData:function(e){
				this.imgsData=e;
			},
			callMp4url:function(e){
				this.mp4url=e;
			}, 
			getPage: function () {
				var that = this;
				uni.request({
					url: app.apiHost + "/module.php?fromapp=wxapp&m=forum&ajax=1&a=add&authcode="+app.getAuthCode(),
					success: function (res) {
						if(res.data.error==1000){
							that.app.goLogin();
							return false;
						}
						that.pageLoad = true;
						that.pageData = res.data.data;
						
					}
				})
			},
			
			formSubmit:function(e){
				var that=this;
				that.app.post({
					url:app.apiHost+"/module.php?fromapp=wxapp&m=forum&a=save&ajax=1&authcode="+app.getAuthCode(),
					data:e.detail.value,
					
					success:function(res){
						uni.showToast({
							title: res.message,
							duration: 2000
						});
						if(!res.error){
							setTimeout(function(){
								uni.navigateBack({
									delta: 1
								});
							},1000)
							
						}
					}
				})
			}
		},
	}
</script>

<style>

</style>
