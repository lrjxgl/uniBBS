<template>
	<div class="main-body" v-if="pageLoad" id="App">
		
		<div class="uBox">
			<div @click="toggleFollow(user)" v-if="user.isFollow" class="fixFollow fixFollow-active">已关注</div>
			<div @click="toggleFollow(user)" v-else class="fixFollow fixFollow-active">+关注</div>
			<div class="flex flex-center">
				<img class="uBox-head" :src="user.user_head+'.100x100.jpg'"> 
			</div>
			<div class="flex flex-center">
				<div class="flex flex-ai-center mgb-10">
					<div class="mgr-10 cl-white">{{user.nickname}}</div>
					<image mode="widthFix" class="rankLogo" :src="rank.logo"></image>
				</div>
				
			</div>
			<div class="flex mgb-10 flex-center">
				<div @click="gourl('../../pages/follow/index?tab=followed&userid='+user.userid)" class="flex flex-ai-center">
					<div class="mgr-5 cl-white">粉丝</div>
					<div class="mgr-10  cl-white">{{user.followed_num}}</div> 
				</div>
				<div  @click="gourl('../../pages/follow/index?userid='+user.userid)" class="flex flex-ai-center">
					<div class="mgr-5  cl-white">关注</div>
					<div class="cl-white">{{user.follow_num}}</div>
				</div>
				<!--<div class="btn-pm  cl-white" @click="goPm(user.userid)">私信</div>-->
			</div>
			<div v-if="user.description==''" class="uBox-desc">该用户一句话也没留下</div>
			<div v-else class="uBox-desc">{{user.description}}</div>
		</div>
		<div class="emptyData" v-if="!list || Object.keys(list).length==0">暂无帖子</div>
		<div class="sglist">
			<div v-for="(item,index) in list" :key="index" @click="goBlog(item.id)" class="sglist-item">
				<div class="sglist-title">{{item.title}}</div>
				<div class="sglist-desc">{{item.description}}</div>
				<div v-if="item.imgslist" class="sglist-imglist">
					 
					<img v-for="(cc,ii) in item.imgslist" :key="ii" :src="cc+'.100x100.jpg'" class="sglist-imglist-img" />
					 
				</div>
				<div class="sglist-ft">
					<div class="sglist-ft-love">{{item.love_num}}</div>
					<div class="sglist-ft-cm">{{item.comment_num}}</div>
					<div class="sglist-ft-view">{{item.view_num}}</div>
				</div> 
			</div>
			<div class="loadMore" @click="getList()" v-if="per_page>0">加载更多</div>
		</div>
		
	</div>
</template>

<script>
	export default{
	 
		data:function(){
			return {
				isFirst:true,
				per_page:0,
				list:[],
				pageLoad:false,
				user:{},
				userid:0 ,
				rank:{}
			}
		},
		onLoad:function(ops){
			this.userid=ops.userid;
			this.getPage();
		},
		methods:{
			gourl:function(url){
				uni.navigateTo({
					url:url
				})
			},
			goPm:function(userid){
				uni.navigateTo({
					url:"../../pages/pm/detail?userid="+userid
				})
				 
			},  
			goBlog:function(id){
				uni.navigateTo({
					url:"../forum/show?id="+id
				})
				
			},
			getPage:function(){
				var that=this;
				that.app.get({
					url:that.app.apiHost + "/mm/forum_home/api?ajax=1",
					data:{
						userid:this.userid
					},
					dataType:"json",
					success:function(res){
						that.pageLoad=true;
						that.list=res.data.list;
						that.user=res.data.user;
						that.per_page=res.data.per_page;
						that.isFirst=false;
						that.rank=res.data.rank;
					}
				})
			},
			 getList:function(){
				var that=this;
				if(that.per_page==0 && !that.isFirst){
					return false;
				}
				that.app.get({
					url:that.app.apiHost + "/mm/forum_home/api?ajax=1",
					data:{
						userid:this.userid,
						per_page:that.per_page
					},
					dataType:"json",
					success:function(res){
						that.pageLoad=true;
						if(that.isFirst){
							that.list=res.data.list;
							that.isFirst=false;
						}else{
							for(var i in res.data.list){
								that.list.push(res.data.list[i])
							}
						}

						that.per_page=res.data.per_page;
						
					}
				})
			 },
			toggleFollow:function(item){
				var that=this;
				that.app.get({
					url: that.app.apiHost+"/index/follow/Toggle?ajax=1",
					dataType: "json",
					data: {
						t_userid: item.userid
					},
					success: function(res) {
						if(res.error){
							skyToast(res.message);
							return false;
						}
						item.isFollow = res.follow;
				
					}
				});
			}
		}
	}
</script>

<style>
 
	
	.uBox {
		position: relative;
		width: 100%;
		height: 400rpx;
		background-color: #007b47;
	
	}
	
	.uBox-follow {
		border-radius: 10rpx;
		border: 1px solid #fff;
		color: #fff;
		padding: 12rpx 20rpx;
		width: 120rpx;
		font-size: 28rpx;
		text-align: center;
		position: absolute;
		right: 20rpx;
		top: 20rpx;
	}
	
	.uBox-nick {
		color: #fff;
		font-size: 28rpx;
		margin-bottom: 40rpx;
	}
	
	.uBox-head {
		width: 100rpx;
		height: 100rpx;
		border-radius: 10rpx;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
	}
	
	.uBox-desc {
		position: absolute;
		bottom: 20rpx;
		right: 0;
		left: 0;
		text-align: right;
		padding-left: 20rpx;
	
		padding-right: 20rpx;
		color: #eee;
		font-size: 28rpx;
	}
	
	.btn-pm {
		padding: 6rpx 10rpx;
		line-height: 1;
		border: 1px solid #fff;
		font-size: 24rpx;
		color: #fff;
		border-radius: 10rpx;
		margin-left: 40rpx;
	}
	
	.fixFollow {
		position: absolute;
		right: 20rpx;
		top: 20rpx;
		color: #eee;
		border: 1px solid #eee;
		border-radius: 10rpx;
		padding: 10rpx 20rpx;
		font-size: 24rpx;
		cursor: pointer;
	}
	
	.fixFollow-active {
		color: #fff;
		border: 1px solid #fff;
	}

	
</style>
