<template>
	<div>
		<div class="footer-row"></div>
		<div class="footer">
			<div class="footer-item icon-home" :class="{'footer-active':tab=='home'}" @click="goHome()">首页</div>
			<div class="footer-item icon-cascades" :class="{'footer-active':tab=='group'}" @click="goFenlei()">版块</div>
			
			<div class="footer-item footer-add" :class="{'footer-active':tab=='add'}" @click="goAdd()">发布</div>
			<view class="footer-item icon-message_light" :class="{'footer-active':tab=='notice'}" @click="goPm()">消息<text v-if="pm_num>0" class="footer-item-num">{{pm_num}}</text></view>
			 
			<div class="footer-item icon-my_light" :class="{'footer-active':tab=='user'}"  @click="goUser()">我的</div>
		</div>
	</div>
</template>

<script>
	export default{
		props:{
			tab:""
		},
		data:function(){
			return {
				pm_num:0
			}
		},
		created:function(){
			var that=this;
			that.getPm();
			if(this.timer.noticeTimer>0){			 
				clearInterval(this.timer.noticeTimer);
				this.timer.noticeTimer=0;
			}			
			this.timer.noticeTimer=setInterval(function(){
				that.getPm();
			},10000)
			 
		},
		methods:{
			getPm:function(){
				var that=this;
				that.app.get({
					url:that.app.apiHost + "/mm/forum_notice/GetAllNum",
					unLogin:true,
					success:function(res){
						that.pm_num=res.data.num;
					}
				})	
			}, 
			goPm:function(){
				uni.reLaunch({
					url:"../../pageforum/forum_notice/index"
				})
			},
			goSearch:function(){
				uni.reLaunch({
					url:"../../pageforum/forum/search"
				})
			},
			goHome:function(){
				uni.reLaunch({
					url:"/pages/index/index"
				})
			},
			 
			goFenlei:function(){
				uni.reLaunch({
					url:"../../pageforum/forum_group/index"
				})
			},
			 
			goAdd:function(){
				uni.navigateTo({
					url:"../../pageforum/forum/add"
				})
			},
			goUser:function(){
				uni.reLaunch({
					url:"../../pageforum/forum/user"
				})
			}
		}
	}
</script>

<style>
</style>
