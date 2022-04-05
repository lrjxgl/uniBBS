<template>
	<view v-if="pageLoad">
		<div v-if="!list || list.length==0" class="emptyData">暂无发帖</div>
		<view class="sglist" v-else>
			<view  class="sglist-item" v-for="(item,fkey) in  list" :key="fkey">
				<view @click="goUser(item.userid)"  class="flex mgb-5">
					<image :src="item.user_head+'.100x100.jpg'" class="wh-40 mgr-5 bd-radius-50"></image>
					<view class="flex-1">
						<view class="f14 mgb-5">{{item.nickname}}</view>
						<view class="f12 cl3">{{item.timeago}}</view>
					</view>
				</view>
				<div @click="goForum(item.id)" class="flex mgb-5">
					<div v-if="item.videourl" class="iconfont cl-red mgr-5 icon-video"></div>
					<div class="flex-1">{{item.title}}</div>
				</div>		
				<view @click="goForum(item.id)" class="sglist-imglist" v-if="item.imgslist">                   
					<image v-for="(img,imgIndex) in item.imgslist" :key="imgIndex" :src="img+'.100x100.jpg'" class="sglist-imglist-img"  mode="widthFix" ></image>
				</view>
				
				<view class="flex sglist-ft">
					<view class="sglist-ft-love">
						{{item.love_num}} </view>
					<view class="sglist-ft-cm">
						{{item.comment_num}} </view>
					<view class="sglist-ft-view">
						{{item.view_num}} </view>
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
			 
			uni.setNavigationBarTitle({
				title: '新帖子'
			});
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
					url:that.app.apiHost+"/forum/new?ajax=1",
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
					url:that.app.apiHost+"/forum/new?ajax=1",
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
			goUser: function(userid) {
				uni.navigateTo({
					url: "../forum_home/index?userid=" + userid
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
