<template>
	<view>
		<view class="upimg-box bg-fff">
			
			 
			<view @click="upload()"  class="upimg-btn">
				<view class="upimg-btn-icon"></view>
			</view>
			<div class="flex-1">
				<view v-if="videoProgress>0 && videoProgress<100">{{videoProgress}}%</view>
				<video style="width: 180px;" v-if="truemp4url!='' " :src="truemp4url"></video> 
			</div>
			
			 
			
			
			<input style="display: none;" type="file" name="upimg" id="upimg" />
		</view>
		 
	</view>
</template>

<script>
	var that;
	export default{
		 
		props:{
			dMp4url:'',
			dTrueMp4url:'',
			iField:''
		},
		data:function(){
			return {
				mp4url:"",
				truemp4url:"",
				videoProgress:0
			}			
		},
		created:function(){
			that=this;
			this.mp4url="";
			
			if(this.dTrueMp4url===true){
				this.truemp4url=""
			}else{
				this.truemp4url=this.dTrueMp4url;
			}
			
			 
			console.log(this.truemp4url)
		},
		methods: {
			 
			upload:function(){
				
				uni.chooseVideo({
					count:1,
					sourceType: ['camera', 'album'],
					success: (ress) => {
						that.videoProgress=1;
						var tempFilePath = ress.tempFilePath;
						uni.request({
							url:that.app.apiHost+"/index.php?m=ossupload&a=auth&ajax=1",
							method:"GET",
							data:{
								loginToken:that.app.getToken(),
								ajax:1
							},
							success:(rs)=>{
								var oos=rs.data;
								
								var fdata={
									OSSAccessKeyId:oos.accessid,
									policy:oos.policy,
									Signature:oos.sign,
									key:oos.key + ".mp4",
									callback:oos.callback
									
								};
								 
								var uploadTask=uni.uploadFile({
									url: oos.url, 
									filePath: tempFilePath,
									name: 'file',
									formData:fdata,
									success: (res)=>{
										var data=JSON.parse(res.data);
										if(data.Status=='fail'){
											uni.showToast({
												title:"上传出错"
											})
											return false;
										}
										console.log(data);
										 
										that.$emit("call-parent",data.filename);
										that.truemp4url=data.truename;
									}
								});
								uploadTask.onProgressUpdate((res) => {
									that.videoProgress=res.progress;
								  
								});
								 
							}
						})	
						
					}
				});
			}
		},
	}
</script>

<style>
</style>
