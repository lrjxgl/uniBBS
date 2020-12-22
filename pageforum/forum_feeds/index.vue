<template>
	<view v-if="pageLoad">
		<div v-if="!list || list.length==0" class="emptyData">暂无帖子</div>
		<view class="flist" v-else>
			<view  class="flist-item" v-for="(item,fkey) in  list" :key="fkey">
				<view class="flist-user">
					<image :src="item.user_head+'.100x100.jpg'" class="flist-head"></image>
					<view class="flex-1">
						<view class="flist-nick">{{item.nickname}}</view>
						<view class="flist-time">{{item.timeago}}</view>
					</view>
				</view>
				<view class="flist-title" @click="goForum(item.id)">{{item.title}}</view>
				
				<view @click="goForum(item.id)" class="flist-vd pointer" v-if="item.videourl">
					<image class="flist-vd-bg" :src="item.videoimg" ></image>
					<div class="flist-vd-play"></div>
				</view>
		 
							
				<view class="flist-imgs" v-if="item.imgslist">                   
					<image v-for="(img,imgIndex) in item.imgslist" :key="imgIndex" :src="img+'.100x100.jpg'" class="flist-imgs-img"  mode="widthFix" ></image>
				</view>
				
				<view class="flex flist-ft mgb-5">
					<view class="flist-ft-love">
						{{item.love_num}} </view>
					<view class="flist-ft-cm">
						{{item.comment_num}} </view>
					<view class="flist-ft-view">
						{{item.view_num}} </view>
				</view>
				<view class="flex">
					<view class="cl3">{{item.timeago}}</view>
					<view class="flex-1"></view>
					<navigator :url="'../forum/edit?id='+item.id" class="btn-small btn-outline-success mgr-10">编辑</navigator>
					<view @click="del(item.id)"  class="btn-small btn-outline-danger">删除</view>
				</view>
			</view>
			
		</view>
		
	</view> 
</template>

<script> 
	 
	 
	var catid=0;
	var gid=0;
	export default{
	
		data:function(){
			return {
				pageLoad:false, 
				pageHide:false,
				list:[],
				isFirst:true,
				per_page:0
			}
			
		},
		onLoad:function(option){
			 
			this.getPage();
		},
		 
		onShow:function(){
			if(this.pageHide){
				this.pageHide=false;
				this.getPage();
			}			
		},
		onHide:function(){
			this.pageHide=true;
		}, 
		onReachBottom:function(){
			this.getList();
		},
		onPullDownRefresh:function(){
			this.refresh();
		},
		methods:{
			getPage:function(){
				var that=this;
				that.app.get({
					url:that.app.apiHost+"/module.php?m=forum_feeds&ajax=1",
					success:function(res){
						if(res.error){
							return false;
						}
						that.isFirst=false;
						that.pageLoad=true;
						that.list=res.data.list;
						that.per_page=res.data.per_page;
						 
					}
				})
			},
			 
			getList:function(){
				var that=this;
				if(!that.isFIrst && that.per_page==0) return false;
				that.app.get({
					url:that.app.apiHost+"/module.php?m=forum_feeds&ajax=1",
					data:{
						per_page:that.per_page
					},
					success:function(res){
						if(res.error){
							return false;
						}
						if(that.isFirst){
							that.isFirst=false;
							that.list=res.data.list;
						}else{
							for(var i in res.data.list){
								that.list.push(res.data.list[i]);
							}
						}
						 
						that.per_page=res.data.per_page;
						 
					}
				})
			},
			goForum: function (id) {
				uni.navigateTo({
					url: "../forum/show?id=" + id
				})
			},
			refresh:function(){
				this.getPage();
				setTimeout(function(){
					uni.stopPullDownRefresh();
				},1000)
			},
			loadMore:function(){
				this.getList();
			}
			 
		},
	}
</script>

<style>
 
</style>
