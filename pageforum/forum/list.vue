<template>
	<view v-if="pageLoad">
		<view class="tabs-border">
			<view  @click="setCat(0)" class="tabs-border-item" v-bind:class="defaultActive">推荐</view>
			<view @click="setCat(item.catid)" v-bind:class="{ 'tabs-border-active':item.isactive }" v-for="(item,key) in pageData.catlist" :key="key" class="tabs-border-item">{{item.title}}</view>
			
		</view>
		<view class="flist">
			<view class="emptyData" v-if="pageData.rscount==0">暂无帖子</view>
			<view @click="goForum(item.id)" class="flist-item" v-for="(item,fkey) in pageData.list" :key="fkey">
				<view class="flist-user">
					<image :src="item.user_head+'.100x100.jpg'" class="flist-head"></image>
					<view class="flex-1">
						<view class="flist-nick">{{item.nickname}}</view>
						<view class="flist-time">{{item.timeago}}</view>
					</view>
				</view>
				<div class="flex mgb-5">
					<div v-if="item.videourl" class="iconfont cl-red mgr-5 icon-video"></div>
					<div class="flex-1">{{item.title}}</div>
				</div>		
				<view class="flist-imgs" v-if="item.imgslist">                   
					<image v-for="(img,imgIndex) in item.imgslist" :key="imgIndex" :src="img+'.100x100.jpg'" class="flist-imgs-img"  mode="widthFix" ></image>
				</view>
				
				<view class="flex flist-ft">
					<view class="flist-ft-love">
						{{item.love_num}} </view>
					<view class="flist-ft-cm">
						{{item.comment_num}} </view>
					<view class="flist-ft-view">
						{{item.view_num}} </view>
				</view>
			</view>
			
		</view>
		
	</view> 
</template>

<script> 
	var app= require("../../common/common.js"); 
	var per_page=0;
	var isfirst=true;
	var catid=0;
	var gid=0;
	var activeClass="tabs-border-active";
	export default{
	
		data:function(){
			return {
				pageLoad:false, 
				pageHide:false,
				pageData:{},
				defaultActive:activeClass
			}
			
		},
		onLoad:function(option){
			gid=option.gid;
			catid=option.catid;
			uni.setNavigationBarTitle({
				title: '帖子'
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
				uni.request({
					url:app.apiHost+"/module.php?m=forum&a=list&ajax=1",
					data:{
						gid:gid,
						catid:catid,
						authcode:app.getAuthCode()
					},
					success:function(res){
						//登录
						if(res.data.error==1000){
							uni.navigateTo({
								url:"/pages/login/index",
							})
						}else{
							isfirst=false;
							that.pageLoad=true;
							that.pageData=res.data.data;
							per_page=res.data.data.per_page;
							uni.setNavigationBarTitle({
								title: that.pageData.group.title
							});
						}
						 
					}
				})
			},
			setCat:function(cid){
				catid=cid;
				isfirst=true;
				per_page=0;
				if(catid==0){
					this.defaultActive=activeClass;
				}else{
					this.defaultActive="";
				}
				var catlist=this.pageData.catlist;
				for(var i in catlist){
					if(catlist[i].catid==catid){
						catlist[i].isactive=1;
					}else{
						catlist[i].isactive=0;
					}
				}
				this.pageData.catlist=catlist;
				this.getList();
			 },
			getList:function(){
				var that=this;
				if(!isfirst && per_page==0) return false;
				uni.request({
					url:app.apiHost+"/module.php?m=forum&a=list&ajax=1",data:{
						per_page:per_page,
						catid:catid,
						gid:gid,
						authcode:app.getAuthCode()
					},
					success:function(res){
						
						if(!res.data.error){
							if(isfirst){
								that.pageData.list=res.data.data.list;
								isfirst=false;
							}else{
								
								that.pageData.list=app.json_add(that.pageData.list,res.data.data.list);
							}
							per_page=res.data.data.per_page;  
							
						}
						
						
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
