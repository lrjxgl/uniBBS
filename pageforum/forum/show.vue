<template>
	<view v-if="pageLoad">
		 
		<view class="main-body pd-5 bg-fff">
			<d-userbox :user="author"></d-userbox>
			<view class="d-title">{{data.title}}</view>
			
			<view class="row-box">
				<div v-if="data.videourl!=''" class="flex flex-center mgb-5">
					<video :src="data.videourl" ></video>
				</div>
				<div class="flex-col flex-center mgb-5">
					<image style="width: 100%;" @longpress="downImg(item)" class="wmax mgb-5" mode="widthFix" v-for="(item,key) in imgsList" :key="key" :src="item"></image> 
				</div>
				
			</view>
			<rich-text class="d-content mgb-5" :nodes="data.content">
				 
			</rich-text>
			<view class="flex mgb-10">
				<div class="flex-1"></div> 
				<view class="cl2 f12">{{data.timeago}}</view>
			</view>
			<view class="flex flex-center mgb-10">
				<view class="btn-love  mgr-10" @click="loveToggle(data.id)" v-bind:class="islove?'btn-love-active':''">
					喜欢
				</view>
				 
				<view class="btn-fav mgr-10" @click="favToggle(data.id)" v-bind:class="isfav?'btn-fav-active':''">收藏</view>

			</view>
		</view>
		<view class="comment-hd">跟帖列表</view>
		<!--评论-->
		
		<cmform tablename="mod_forum" :objectid="data.id"></cmform>
		<navigator :url="'../forum/add?gid='+data.gid+'&catid='+data.catid" class="fixedAdd2"></navigator>
	</view> 
</template>

<script>
	import dUserbox from "@/components/forum/d-userbox.vue";
	import cmform from "@/components/cmform.vue";
	var id;
	export default {
		components: {
			dUserbox,
			cmform
		},
		data:function(){
			return {
				pageLoad:false, 
				pageHide:false,
				data:{},
				author:{},
				isfav:0,
				islove:0,
				imgsList:[]
			}
			
		},
		onLoad: function (ops) {
			 
			 
			if(ops.id!=undefined){
				id=ops.id;
			}
			if(ops.scene!=undefined){
				id=ops.scene.id;
			}
			this.getPage();
			this.addClick();
			
		},
		onShareAppMessage:function(){
			
		},
		onShareTimeline:function(){
			
		},
		onPullDownRefresh:function(){
			this.refresh();
		} ,
		methods: {
			refresh:function(){
				this.getPage();
				setTimeout(function(){
					uni.stopPullDownRefresh();
				},1000)
			},
			addClick:function(){
				this.app.get({
					url: this.app.apiHost + "/mm/forum/addclick?id=" + id,
					success: function (res) {
					}
				})
			},
			downImg:function(url){
				uni.downloadFile({
				    url: url,  
				    success: (res) => {
				        if (res.statusCode === 200) {
				            uni.saveImageToPhotosAlbum({
				            	filePath:res.tempFilePath,
								success:function(){
									uni.showToast({
										title:"图片保存成功"
									})
								}
				            })
				        }
				    }
				});
			},
			getPage: function () {
				var that = this;
				that.app.get({
					url: that.app.apiHost + "/mm/forum/show?id=" + id,
					 
					success: function (res) {
						if(res.error){
							uni.showToast({
								title:res.message,
								icon:"none"
							})
							return false;
						}
						that.pageLoad = true;
						that.data = res.data.data;
						that.imgsList=res.data.imgslist;
						that.author=res.data.author;
						that.isfav=res.data.isfav;
						that.islove=res.data.islove;
						uni.setNavigationBarTitle({
							title:res.data.data.title
						})
					}
				})
			},
			favToggle:function(id){
				var that=this;
				that.app.get({
					url:that.app.apiHost+"/index/fav/toggle",
					data:{
						objectid:id,
						tablename:"mod_forum"  
					},
					unLogin:true,
					success:function(res){
						if(res.error==1000){
							that.app.showLoginBox(false);
							return false;
						}
						if(res.data=='delete'){
							that.isfav=false;
						}else{
							that.isfav=true;
						}
						 
					}
				})
			},
			loveToggle:function(id){
				var that=this;
				that.app.get({
					url:that.app.apiHost+"/index/love/toggle",
					data:{
						objectid:id,
						tablename:"mod_forum"
					},
					unLogin:true,
					success:function(res){
						if(res.error==1000){
							that.app.showLoginBox(false);
							return false;
						}
						if(res.data=='delete'){
							that.islove=false;
						}else{
							that.islove=true;
						}
						
					}
				})
			}
			
		},
	}
</script>
<style>
	.wmax{
		width: 100%;
	}
</style>

 
