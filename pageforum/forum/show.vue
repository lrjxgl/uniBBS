<template>
	<view v-if="pageLoad">
		 
		<view class="main-body pd-5 bg-fff">
			<d-userbox :user="pageData.author"></d-userbox>
			<view class="d-title">{{pageData.data.title}}</view>
			<view class="d-tools">
				<view class="mgr-10 cl2">作者：{{pageData.author.nickname}}</view>
				<view class="cl2">{{pageData.data.timeago}}</view>
			</view>
			<view class="row-box">
				<div v-if="pageData.data.videourl!=''" class="flex flex-center mgb-5">
					<video :src="pageData.data.videourl" ></video>
				</div>
				<div class="flex-col flex-center mgb-5">
					<image style="width: 100%;" @longpress="downImg(item)" class="wmax mgb-5" mode="widthFix" v-for="(item,key) in pageData.imgslist" :key="key" :src="item"></image> 
				</div>
				
			</view>
			<rich-text class="d-content" :nodes="pageData.data.content">
				 
			</rich-text>

			<view class="flex flex-center mgb-10">
				<view class="btn-love  mgr-10" @click="loveToggle(pageData.data.id)" v-bind:class="pageData.islove?'btn-love-active':''">
					喜欢
				</view>
				 
				<view class="btn-fav mgr-10" @click="favToggle(pageData.data.id)" v-bind:class="pageData.isfav?'btn-fav-active':''">收藏</view>

			</view>
		</view>
		<view class="comment-hd">跟帖列表</view>
		<!--评论-->
		
		<cmform tablename="mod_forum" :objectid="pageData.data.id"></cmform>
		<navigator :url="'../forum/add?gid='+pageData.data.gid+'&catid='+pageData.data.catid" class="fixedAdd">发布</navigator>
	</view>
</template>

<script>
	import dUserbox from "../d-userbox.vue";
	import cmform from "../../components/cmform.vue";
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
				pageData:{},
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
					url: this.app.apiHost + "/forum/addclick?id=" + id,
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
					url: that.app.apiHost + "/forum/show?id=" + id,
					 
					success: function (res) {
						
						that.pageLoad = true;
						that.pageData = res.data;
						uni.setNavigationBarTitle({
							title:res.data.data.title
						})
					}
				})
			},
			favToggle:function(id){
				var that=this;
				that.app.get({
					url:that.app.apiHost+"/fav/toggle",
					data:{
						objectid:id,
						tablename:"mod_forum"  
					},
					success:function(res){
						if(res.data=='delete'){
							that.pageData.isfav=false;
						}else{
							that.pageData.isfav=true;
						}
						 
					}
				})
			},
			loveToggle:function(id){
				var that=this;
				that.app.get({
					url:that.app.apiHost+"/love/toggle",
					data:{
						objectid:id,
						tablename:"mod_forum"
					},
					success:function(res){
						if(res.error==1000){
							that.app.goLogin();
							return false;
						}
						if(res.data=='delete'){
							that.pageData.islove=false;
						}else{
							that.pageData.islove=true;
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

 
