<template>
	<view >
		<view :style="sty" v-if="muser" class="d-userbox">
			<image @click="goHome(muser.userid)" class="d-userbox-head" :src="muser.user_head+'.100x100.jpg'"></image>
			<view class="flex-1">
				<div class="flex flex-ai-center mgb-10">
					<view  @click="goHome(muser.userid)"  class="cl1 mgr-10">{{muser.nickname}}</view>
					<image mode="widthFix" class="rankLogo" :src="rank.logo"></image>
				</div>
				
				<view class="d-userbox-follows flex-ai-center">
					<view class="mgr-5">粉丝</view>
					<text class="cl-num mgr-5 flex-center">{{muser.followed_num}}</text> 
					<view  class="mgr-5">关注</view>
					<text class="cl-num flex-center mgr-10">{{muser.follow_num}}</text>
					 
					<view class="btn-pm" @click="goPm(muser.userid)">私信</view>
				</view>
			</view>
			<view class="btn-small btn-outline-success" @click="followToggle(muser.userid)">{{followStr}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			user:false,
			timeago:"",
			sty:""
		},
		data:function(){
			return {
				muser:{},
				
				followStr:"已关注",
				rank:{},
				userid:0
			}
		},
		created:function(){
			this.muser=this.user;
			if(!this.user.isFollow){
				this.followStr="关注";
			}
			this.userid=this.user.userid;
			this.getRank()
		},
		watch:{
			user:function(n,o){
				this.muser=n;
				console.log(this.muser)
				if(!this.muser.isFollow){
					this.followStr="关注";
				}else{
					this.followStr="已关注";
				}
			}
		},
		methods:{
			getRank(){
				var that=this;
				that.app.get({
					url:that.app.apiHost+"/index/user_rank/user",
					data:{
						userid:this.user.userid
					},
					success:function(res){
						that.rank=res.data.rank;
					}
				})
			},
			goPm:function(userid){
				console.log(userid)
				uni.navigateTo({
					url:"../../pages/pm/detail?userid="+userid
				})
			},
			goHome:function(userid){
				uni.navigateTo({
					url:"/pageforum/forum_home/index?userid="+userid
				})
			},
			followToggle:function(userid){
				var that=this; 
				that.app.get({
					url:this.app.apiHost+"/index/follow/toggle?t_userid="+userid,
					success:function(res){
						if(res.error){
							uni.showToast({
								title:res.message
							})
							return false;
						}
						if(res.error==0){
							if(res.status==0){
								that.followStr="关注";
							}else{
								that.followStr="已关注";
							}
						}
					}
				})
			}
		}
	}
</script>

<style>
	.btn-pm{
		padding:3px 5px;
		line-height: 1;
		border: 1px solid #F4ABA7;
		font-size: 12px;
		color: #F4ABA7;
		border-radius: 5px;
		margin-left: 10px;
	}
</style>
