<template>
	<view class="bg-ef">
		<div>
			<div v-if="unLogin">
				<div class="row-box mgb-10">
					<div class="mgb-10"></div>
					<view class="flex flex-ai-center mgb-10">
						<image mode="widthFix" class="w60 mgr-10" :src="app.apiHost+'/static/logo.png'">
						</image>

						<navigator class="btn-small" style="background-color:#007b47;" url="/pages/login/index">前往登录
						</navigator>
					</view>
					<view class="flex  mgb-20 cl2">您还未登录,请先登录</view>

				</div>
			</div>
			<div v-else >
				 
				<div class="uhead flex-ai-center">
					<image @click="gourl('user_head')" mode="widthFix" class="w100 mgr-10 bd-radius-50"
						:src="user.user_head+'.100x100.jpg'"></image>
					<div class="flex-1">
						<div class="flex flex-ai-center mgb-10">
							<div class=" mgr-10">{{user.nickname}}</div>
							<image mode="widthFix" class="rankLogo" :src="rank.logo"></image>
						</div>
						<div class="flex flex-ai-center">
							<div>金币</div>
							<text class="cl-num mgr-10">{{user.gold}}</text>
							<div class="cl2   mgr-5">帖子</div>
							<div class="  cl-num mgr-10 ">{{topic_num}}</div>
							<div class="cl2   mgr-5">评论</div>
							<div class="cl-num  "> {{comment_num}}</div>

						</div>

					</div>
					<div @click="gourl('/pages/user/set')" class="iconfont icon-right"></div>
				</div>



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
			<div class="row-box">




				<div>
					<div class="f16 mgb-20 fw-600">更多</div>
					<div>

						<div @click="gourl('../html/index?word=help')" class="flex pointer">
							<div class="iconfont icon-message_light mgr-5"></div>
							<div class="flex-1 bd-mp-10">
								<div class="flex">
									<div class="flex-1">帮助与反馈</div>
									<div class="iconfont icon-right cl3"></div>
								</div>
								<div class="cl3">反馈使用问题</div>
							</div>
						</div>



						<div @click="gourl('../html/index?word=question')" class="flex">
							<div class="iconfont icon-question mgr-5"></div>
							<div class="flex-1 bd-mp-10">
								<div class="flex">
									<div class="flex-1">常见问题</div>
									<div class="iconfont icon-right cl3"></div>
								</div>
								<div class="cl3">常见问题解答</div>
							</div>
						</div>

						<div @click="gourl('../kefu/index')" class="flex">
							<div class="iconfont icon-service_light mgr-5"></div>
							<div class="flex-1 bd-mp-10">
								<div class="flex">
									<div class="flex-1">在线客服</div>
									<div class="iconfont icon-right cl3"></div>
								</div>
								<div class="cl3">在线实时服务助手</div>
							</div>
						</div>
						<div @click="gourl('../html/index?word=contact')" class="flex">
							<div class="iconfont icon-phone mgr-5"></div>
							<div class="flex-1 bd-mp-10">
								<div class="flex">
									<div class="flex-1">联系我们</div>
									<div class="iconfont icon-right cl3"></div>
								</div>
								<div class="cl3">如您需获得关于问题的直接协助</div>
							</div>
						</div>

						<div @click="gourl('../html/index?word=aboutus')" class="flex">
							<div class="iconfont icon-info mgr-5"></div>
							<div class="flex-1 bd-mp-10">
								<div class="flex">
									<div class="flex-1">关于我们</div>
									<div class="iconfont icon-right cl3"></div>
								</div>
								<div class="cl3">版本，证照，新功能</div>
							</div>
						</div>


					</div>
				</div>

			</div>



		</div>


		<mt-footer tab="user"></mt-footer>
	</view>
</template>

<script>
	import mtFooter from "@/components/forum/footer.vue";
	export default {
		components: {
			mtFooter
		},
		data: function() {
			return {
				pageLoad: false,
				pageHide: false,
				user: {},
				rank: {},
				topic_num:0,
				comment_num:0,
				unLogin: true,

			}
		},
		onLoad: function(option) {

			uni.setNavigationBarTitle({
				title: "个人中心",
			})

			this.getPage();



		},
		onShow: function() {
			this.getPage();

		},


		methods: {

			gourl: function(url) {
				uni.navigateTo({
					url: url,
				})
			},
			getPage: function() {
				var that = this;
				that.app.get({
					url: that.app.apiHost + "/mm/forum/user",
					unLogin: true,
					success: function(res) {

						if (res.error == 1000) {

							that.unLogin = true;
							//that.app.showLoginBox(true)

							return false;
						} else {
							that.unLogin = false;

							that.user = res.data.user;
							that.rank = res.data.rank;
							 
							that.topic_num=res.data.topic_num;
							that.comment_num=res.data.comment_num;
						}
						that.pageLoad = true;

					}
				})
			},
			checkedPage: function() {
				var that = this;
				that.app.get({
					url: that.app.apiHost + "/index/user/index",
					unLogin: true,
					success: function(res) {

						if (res.error == 1000) {

							that.unLogin = true;


							return false;
						} else {
							that.unLogin = false;

							that.user = res.data.data;
							that.rank = res.data.rank;
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

	.row-item-icon {
		font-size: 42rpx;
	}
	
	.cl-u,
	.cl-u:before {
		color: #ed6d53;
	
	}
</style>