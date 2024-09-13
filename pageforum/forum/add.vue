<template>
	<view>
		<view v-if="pageLoad">
			<view  v-if="!unLogin">
				<form  @submit="formSubmit"  >
					<view class="none">
						<input type="text" name="gid" :value="gid" />
						<input type="text" name="catid" :value="catid" />
					</view>
					<view class="input-flex">
						<view class="input-flex-label w60">主题</view>
						<input type="text" name="title" class="input-flex-text" />
					</view>
					<view class="input-flex">
						<view class="input-flex-label">选择板块</view> 							
						<pickergroup @call-parent="setCat" class="flex flex-1" placeholder="请选择"   :defaultGid="gid" :defaultCatid="catid"   :data="pageData.grouplist"></pickergroup>						 
					</view>

					<view class="textarea-flex">
						<view class="input-flex-label flex-1">内容</view>
						<textarea name="content" class="h100 textarea-flex-text"></textarea>
					</view>
					<!--<div>
						<upimg-box @call-parent="callImgsData" name="imgsdata"></upimg-box>
					</div>
					-->
					<!-- #ifdef H5 -->
					
					
					<div class="tabs-border">
						<div :class="tab==''?'tabs-border-active':''" @click="tab=''" class="tabs-border-item">图片</div>
						<div @click="tab='video'"  :class="tab=='video'?'tabs-border-active':''"   class="tabs-border-item">视频</div>
					</div>
					<!-- #endif --> 
					<div :class="tab=='video'?'none':''">
						<input maxlength="-1" type="text" class="none" name="imgsdata" :value="imgsData" />
						<upimg-box md="forum" @call-parent="callImgsData" name="imgsdata"></upimg-box>
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
				imgsData:"",
				loginBack:false,
				gid:0,
				catid:0,
				unLogin:true
			}
			
		},
		onLoad: function (ops) {
			if(ops.id!=undefined){
				id = ops.id;
			}
			if(ops.catid!=undefined){
				this.catid=ops.catid;
			}
			if(ops.gid!=undefined){
				this.gid=ops.gid;
			}
			this.getPage();
		},
		onReady: function () {
			uni.setNavigationBarTitle({
				title: "发布帖子",
			})
		},
		onShow:function(){
			
			if(this.pageLoad && this.unLogin){
				
				this.getPage();
			}
			
		},
		methods: {
			callImgsData:function(e){
				this.imgsData=e;
			},
			callMp4url:function(e){
				this.mp4url=e;
			},
			setCat:function(e){
				console.log(e)
				this.catid=e.catid;
				this.gid=e.gid;
			}, 
			getPage: function () {
				var that = this;
				that.app.get({
					url: that.app.apiHost + "/mm/forum/index?a=add",
					data:{
						catid:this.catid,
						gid:this.gid
					},
					unLogin:true,
					success: function (res) {
						if(res.error==1000){
							that.unLogin=true;
							that.app.showLoginBox(true)
							return false;
						}
						if(res.error){
							uni.showToast({
								title:res.message,
								icon:"none"
							});
							return false;
						}
						that.unLogin=false;
						that.pageLoad = true;
						that.pageData = res.data;
						
					}
				})
			},
			
			formSubmit:function(e){
				var that=this;
				that.app.post({
					url:that.app.apiHost+"/mm/forum/save?ajax=1",
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
