<template>
	<view>
		<view v-if="pageLoad">
			<view class="main-body">
				<form  @submit="formSubmit"  >
					<view class="none">
						<input type="text" name="id" :value="pageData.data.id" />
					</view>
					<view class="input-flex">
						<view class="input-flex-label w60">主题</view>
						<input type="text" name="title" :value="pageData.data.title" class="input-flex-text" />
					</view>
					<view class="input-flex">
						<view class="input-flex-label">选择板块</view> 							
						<pickergroup   placeholder="请选择" :defaultGid="pageData.data.gid" :defaultCatid="pageData.data.catid"   :data="pageData.grouplist"></pickergroup>						 
					</view>

					<view class="textarea-flex">
						<view class="input-flex-label flex-1">内容</view>
						<textarea name="content" class="h100 textarea-flex-text" :value="pageData.data.content"></textarea>
					</view>
					<upimg-box :key="'upimg'+time" :defaultImgsList="pageData.imgsdata" :defaultImgsData="pageData.data.imgsdata"></upimg-box>
					<button formType="submit" class="btn-row-submit">提交</button>
				</form>
			</view>
		</view>
	</view>
</template>

<script>
	import pickergroup from "../../components/pickergroup.vue";
	import upimgBox from "../../components/upimgbox.vue";
	var app = require("../../common/common.js");
	var id;
	export default {
		components:{
			pickergroup,
			upimgBox
		},
		data:function(){
			return {
				pageLoad: false,
				pageData: {},
				time:Date.parse( new Date()),
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
			
			getPage: function () {
				var that = this;
				uni.request({
					url: app.apiHost + "/module.php?fromapp=wxapp&m=forum&ajax=1&a=add&authcode="+app.getAuthCode(),
					data:{
						id:id
					},
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
				uni.request({
					url:app.apiHost+"/module.php?fromapp=wxapp&m=forum&a=save&ajax=1&authcode="+app.getAuthCode(),
					data:e.detail.value,
					method:"POST",
					header:{
						"content-type":"application/x-www-form-urlencoded"
					},
					success:function(res){
						uni.showToast({
							title: res.data.message,
							duration: 2000
						});
						if(!res.error){
							setTimeout(function(){
								uni.navigateBack({
									delta: 2
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
