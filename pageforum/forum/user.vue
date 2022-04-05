<template>
	<div v-if="pageLoad" class="body">
		<div v-if="!unLogin" >
	
			<div class="main-body">
				<div class="uhead">

					<image @click="gourl('../../pages/user/user_head')" class="uhead-img" :src="user.user_head+'.100x100.jpg'"></image>

					<div class="uhead-box">
						<div class="uhead-nick">{{user.nickname}}</div>


						<div class="flex flex-ai-center">
							<div>金币</div>
							<text class="cl-num mgr-10">{{user.gold}}</text>
							<div class="cl2 f12 mgr-5">帖子</div>
							<div class="cl2 f12 mgr-10 ">{{topic_num}}</div>
							<div class="cl2 f12">评论 {{comment_num}}</div>

						</div>
					</div>
					<navigator url="../../pages/user/set" class="flex-center btn-small btn-link iconfont icon-settings"></navigator>
				</div>

				<div class="row-box mgb-5">
					<div  @click="gourl('../../pageforum/forum/my')"  class="row-item">
						<div class="row-item-icon icon-news  cl-u"></div>
						<div class="row-item-title">我的贴子</div>
					</div>
					 
					
					<div  @click="gourl('../../pageforum/forum_comment/my')" class="row-item">
						<div class="row-item-icon icon-comment  cl-u"></div>
						<div class="row-item-title">我的评论</div>
					</div>
					<div  @click="gourl('../../pageforum/forum/myfav')" class="row-item">
						<div class="row-item-icon icon-favor  cl-u"></div>
						<div class="row-item-title">我的收藏</div>
					</div>
					<div  @click="gourl('../../pages/gold_log/my')"  class="row-item">
						<div class="row-item-icon icon-choiceness  cl-u"></div>
						<div class="row-item-title">金币日志</div>
					</div>
					 
				</div>

				<div class="row-box mgb-5">

					<div @click="gourl('../../pages/kefu/index')"  class="row-item">
						<div class="row-item-icon icon-service  cl-u"></div>
						<div class="row-item-title">联系客服</div>
					</div>
					<div @click="gourl('../../pages/html/aboutus')" class="row-item">
						<div class="row-item-icon icon-info  cl-u"></div>
						<div class="row-item-title">关于我们</div>
					</div>
				</div>

			</div>

		</div>
		<div v-else class="unLoginBox">
			<div class="flex flex-center mgb-20 cl2">您还未登录,请先登录</div>
			<div class="flex flex-center">
				<navigator class="btn-small" url="../../pages/login/index">前往登录</navigator>
			</div>

		</div>
		<mt-footer tab="user"></mt-footer>
	</div>
</template>

<script>
	import mtFooter from "../forumfooter.vue";
	export default {
		components: {
			mtFooter
		},
		data: function() {
			return {
				pageLoad: false,
				unLogin:false,
				user: {},
				topic_num:0,
				comment_num:0

			}
		},
		onLoad: function() {
			this.getPage();
		},
		onShow:function(){
			this.getPage();
		},
		onShareAppMessage: function() {

		},
		methods: {
			gourl:function(url){
				uni.navigateTo({
					url:url
				})
			},
			getPage: function() {
				var that = this;
				that.app.get({
					url: that.app.apiHost + "/forum/user",
					unLogin:true,
					success: function(res) {
						if(res.error){
							that.unLogin=true;
						}else{
							that.unLogin=false;
							that.user = res.data.user;
							that.topic_num=res.data.topic_num;
							that.comment_num=res.data.comment_num;
						}
						that.pageLoad = true;
						
					}
				})
			}
		},
	}
</script>

<style>
	 

	.uhead {
		display: flex;
		flex-direction: row;
		padding: 22upx;
		background-color: #fff;
		margin-bottom: 11upx;
	}

	.uhead-img {
		width: 172upx;
		height: 172upx;
		margin-right: 22upx;
		display: block;
		border-radius: 50%;
	}

	.uhead-box {
		flex: 1;
	}

	.uhead-nick {
		margin-bottom: 10upx;
		font-size: 34upx;
	}

	.uhead-rnum {
		color: #999;
		margin-bottom: 32upx;
		line-height: 29upx;
		display: flex;
		font-size: 29upx;
	}

	.order-box {
		background-color: #fff;
		padding: 22upx;
		margin-bottom: 22upx;
	}

	.order-box-hd {
		display: flex;
		flex-direction: row;
		line-height: 79upx;
		border-bottom: 2upx solid #ddd;
		margin-bottom: 22upx;
	}

	.order-box-status {
		display: flex;
		flex-direction: row;
	}

	.order-box-item {
		flex: 1;
		text-align: center;
		font-size: 32upx;
		color: #666;
	}

	.order-box-item .iconfont {
		display: block;
		color: #666;
		font-size: 42upx;
	}

	.row-item-icon {
		font-size: 42rpx;
	}

	.cl-u,
	.cl-u:before {
		color: #ed6d53;

	}
</style>
