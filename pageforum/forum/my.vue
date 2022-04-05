<template>
	<view v-if="pageLoad">
		<div v-if="list.length==0" class="emptyData">暂无发帖</div>
		<view class="sglist" v-else>
			<view  class="sglist-item" v-for="(item,fkey) in  list" :key="fkey">
			 
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
	 
	export default{
	
		data:function(){
			return {
				pageLoad:false, 
				pageHide:false,
				per_page:0,
				isFirst:true,
				list:[]
			}
			
		},
		onLoad:function(option){
			 
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
			getPage:function() {
				var that=this;
				that.app.get({
					url:that.app.apiHost+"/forum/index?a=my",
					success:function(res){
						that.pageLoad=true;
						that.list=res.data.list;
						that.per_page=res.data.per_page;
					}
				})
			},
			getList:function() {
				var that=this;
				if(that.per_page==0 && !that.isFirst){
					return false;
				}
				that.app.get({
					url:that.app.apiHost+"/forum/index?a=my",
					data:{
						per_page:that.per_page
					},
					success:function(res){						 
						that.per_page=res.data.per_page;
						if(that.isFirst){
							that.list=res.data.list;
							that.isFirst=false;
						}else{
							for(var i in res.data.list){
								that.list.push(res.data.list[i]);
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
							that.app.get({
								url:that.app.apiHost+"/forum/delete?id="+id,
								success:function(res){
									uni.showToast({
										title:res.message
									});
									if(!res.error){
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
