<template>
	<view v-if="pageLoad">
		<div v-if="pageData.list.length==0" class="emptyData">暂无发帖</div>
		<view class="flist" v-else>
			<view  class="flist-item" v-for="(item,fkey) in pageData.list" :key="fkey">
			 
				<div class="flex mgb-5">
					<div v-if="item.videourl" class="iconfont cl-red mgr-5 icon-video"></div>
					<div class="flex-1">{{item.title}}</div>
				</div>		
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
	var app= require("../../common/common.js"); 
	var per_page=0;
	var isfirst=true;
	var catid=0;
	var gid=0;
	export default{
	
		data:function(){
			return {
				pageLoad:false, 
				pageHide:false,
				pageData:{},
			}
			
		},
		onLoad:function(option){
			gid=option.gid;
			catid=option.catid;
			uni.setNavigationBarTitle({
				title: '我的帖子'
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
					url:app.apiHost+"/module.php?fromapp=wxapp&m=forum&a=my&ajax=1",
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
					url:app.apiHost+"/module.php?fromapp=wxapp&m=forum&a=my&ajax=1",data:{
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
			},
			del:function(id){
				var that=this;
				uni.showModal({
					title: '提示',
					content: '删除后不可恢复，确认删除？',
					success: function (res) {
						if (res.confirm) {
							uni.request({
								url:app.apiHost+"/module.php?fromapp=wxapp&m=forum&a=delete&ajax=1&id="+id,
								data:{
									authcode:app.getAuthCode()
								},
								success:function(res){
									uni.showToast({
										title:res.data.message
									});
									if(!res.data.error){
										that.getPage();
									}
								}
							})
						} else if (res.cancel) {
							
						}
					}
				});
			}
		},
	}
</script>

<style>
 
</style>
