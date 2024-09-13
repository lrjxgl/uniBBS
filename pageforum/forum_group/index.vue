<template>
	<view v-if="pageLoad">
	<view class="flexlist">
		<view class="flexlist-item bg-fff" v-for="(item,key) in pageData.list" :key="key">
			<navigator class="flexlist-imgbox" :url="'../forum/list?gid='+item.gid">
				<img class="flexlist-img" :src="item.imgurl+'.100x100.jpg'">
			</navigator>
			<view class="flex-1">
				<navigator class="flexlist-title" :url="'../forum/list?gid='+item.gid">{{item.title}}</navigator>
				<view class="flexlist-row">
					主题数
					<text class="cl-num mgl-5 mgr-10">{{item.topic_num}}</text> 
					 
					评论数
					<text class="cl-num  mgl-5">{{item.comment_num}}</text>
				</view>
				<view v-if="item.admin" class="flex mgb-5 flex-ai-center">
					<view class="cl-success f12 mgr-5">版主</view>
					<view @click="goUser(a.userid)" v-for="(a,i) in item.admin" :key="i" class="f12 cl2 mgr-5">
						{{a.nickname}}
					</view>
				</view>
				<view class="flexlist-desc">{{item.description}}</view>
			</view>

		</view>
		
	</view>
	
	<mt-footer tab="group"></mt-footer>
	</view>
</template>
 

<script>
	import mtFooter from "/components/forum/footer.vue";
	export default {
		components: {
			mtFooter
		},
		data:function(){
			return {
				pageLoad:false, 
				pageHide:false,
				pageData:{},
			}
			
		},

		onLoad: function (option) {
			uni.showNavigationBarLoading();
			this.getPage();
		},
		onReady: function () {
			uni.setNavigationBarTitle({
				title: "论坛板块",
			});
		},
		onShow: function () {
			if (this.pageHide) {
				this.pageHide = false;
				this.getPage();
			}
		},
		onHide: function () {
			this.pageHide = true;
		},
		onPullDownRefresh:function(){
			this.refresh();
		} ,
		onShareAppMessage:function(){
			
		},
		onShareTimeline:function(){
			
		}, 
		methods: {
			getPage: function () {
				var that = this;
				that.app.get({
					url: that.app.apiHost + "/mm/forum_group/index?ajax=1",
					success: function (res) {
						that.pageLoad = true;
						that.pageData = res.data;
						uni.hideNavigationBarLoading();
					}
				})
			},
			refresh:function(){
				this.getPage();
				setTimeout(function(){
					uni.stopPullDownRefresh();
				},1000)
			},
			goList: function (id) {
				uni.navigateTo({
					url: "../forum/list?gid=" + id
				})
			},	
			goForum: function (id) {
				uni.navigateTo({
					url: "../forum/show?id=" + id
				})
			},
			goUser:function(userid){
				uni.navigateTo({
					url:"../forum_home/index?userid="+userid
				})
			}
		},
	}
</script>