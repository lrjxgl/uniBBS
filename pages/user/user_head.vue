<template>
	<view>
		<view v-if="pageLoad">
			<view class="flex flex-center mgt-10 mgb-10">
				<image @click="upload()" mode="widthFix" class="wh-200 pointer" :src="user_head"></image>
			</view>
		</view>
	</view>
</template>

<script>
	 
	export default{
		data:function(){
			return {
				pageLoad:false, 
				pageData:{},
				user_head:"",
			}
		},
		onLoad:function(option){
			 
			this.getPage();
		},
		 
		methods:{
			getPage:function(){
				var that=this;
				that.app.get({
					url:that.app.apiHost+"/index/user/user_head",
					success:function(res){
						that.pageLoad=true;
						that.pageData=res.data;
						that.user_head=res.data.data.user_head; 
					}
				})
			},
			upload:function(){
				var that=this;
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.uploadFile({
							url: that.app.apiHost+"/index/upload/img?ajax=1&loginToken="+that.app.getToken(),
							filePath: tempFilePaths[0],
							name: 'upimg',
							
							success: function(res){
								var data=JSON.parse(res.data);
								
								that.app.post({
									url:that.app.apiHost+"/index/user/user_head_save",
									data:{
										user_head:data.data.imgurl
									},
									method:"POST",
									header:{
										"content-type":"application/x-www-form-urlencoded"
									},
									success:function(res){
										that.user_head=data.data.trueimgurl;
									}
								})
							}
						});
					}
				});
			}
		},
	}
</script>

<style>
</style>
