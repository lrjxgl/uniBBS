<template>
	<view v-if="pageLoad">
		<view class="tabs-border">
			<view  @click="setCat(0)" class="tabs-border-item" :class="0==catid?'tabs-border-active':''">推荐</view>
			<view @click="setCat(item.catid)" :class="item.catid==catid?'tabs-border-active':''" v-for="(item,key) in catList" :key="key" class="tabs-border-item">{{item.title}}</view>
			
		</view>
		<view class="sglist">
			<view class="emptyData" v-if="Object.keys(list).length==0">暂无帖子</view>
			<view  class="sglist-item" v-for="(item,fkey) in list" :key="fkey">
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
		<go-top></go-top>
		<navigator :url="'../forum/add?gid='+gid+'&catid='+catid" class="fixedAdd">发布</navigator>
	</view> 
</template>

<script> 
	export default{
	
		data:function(){
			return {
				pageLoad:false, 
				pageHide:false,
				gid:0,
				catid:0,
				list:[],
				catList:[],
				isFirst:true,
				per_page:0,
				group:{}
			}
			
		},
		onLoad:function(ops){
			if(ops.catid!=undefined){
				this.catid=ops.catid;
			}
			if(ops.gid!=undefined){
				this.gid=ops.gid;
			}
			this.getPage();
		},
		 
		onReachBottom:function(){
			this.getList();
		},
		onPullDownRefresh:function(){
			this.isFirst=true;
			this.per_page=0;
			this.getList();
			setTimeout(function(){
				uni.stopPullDownRefresh();
			},1000)
		},
		onShareAppMessage:function(){
			
		},
		onShareTimeline:function(){
			
		},
		methods:{
			getPage:function(){
				var that=this;
				that.app.get({
					url:that.app.apiHost+"/forum/list?ajax=1",
					data:{
						gid:this.gid,
						catid:this.catid
					},
					success:function(res){
						//登录
						if(res.error==1000){
							uni.navigateTo({
								url:"/pages/login/index",
							})
						}else{
							that.catList=res.data.catlist;
							that.group=res.data.group;
							that.isFirst=false;
							that.pageLoad=true;
							that.list=res.data.list;
							that.per_page=res.data.per_page;
							 
							uni.setNavigationBarTitle({
								title: res.data.group.title
							});
						}
						 
					}
				})
			},
			setCat:function(cid){
				this.catid=cid;
				this.isFirst=true;
				this.per_page=0;
				this.getList();
			 },
			getList:function(){
				var that=this;
				if(!that.isFirst && that.per_page==0) return false;
				that.app.get({
					url:that.app.apiHost+"/forum/list?ajax=1",
					data:{
						per_page:that.per_page,
						catid:that.catid,
						gid:that.gid,
					},
					success:function(res){
						if(res.error){
							return false;
						}
						that.per_page=res.data.per_page; 
						if(that.isFirst){
							that.list=res.data.list;
							that.isFirst=false;
						}else{
							for(var i in res.data.list){
								that.list.push(res.data.list[i])
							}
							
						}
						
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
			}
			 
		},
	}
</script>

<style>
 @import url("../forum.css");
</style>
