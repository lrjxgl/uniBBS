<template>
	<div>
		<div class="flex pd-5 bg-white">
			<input class="input-flex-text bd-radius-10 outline-none" v-model="keyword" />
			<div class="input-flex-btn w60" @click="search">搜一下</div>
		</div>
		<div v-if="pageLoad">
			<div class="sglist">
				<view  class="sglist-item" v-for="(item,fkey) in  list" :key="fkey">
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
		
			</div>
		
		</div>
		<forum-footer tab="search"></forum-footer>
	</div>
</template>

<script>
	import forumFooter from "../../pageforum/forumfooter.vue";

	export default ({
		components: {
			forumFooter
		},
		data: function() {
			return {
				pageLoad: false,
				list: [],
				keyword: ""
				 
			}
		},
		onLoad: function(ops) {
			this.keyword = ops.keyword;
			this.getPage();
		},
		methods: {
			goForum: function(id) {
				uni.navigateTo({
					url: "../forum/show?id=" + id
				})

			},

			search: function() {
				this.getPage();
			},
			 
			getPage: function() {
				this.getList();
			},
 
			getList: function() {
				var that = this;
				this.app.get({
					url: that.app.apiHost + "/forum/search?ajax=1",
					data: {
						keyword: this.keyword
					},
					dataType: "json",
					success: function(res) {
						that.pageLoad = true;
						that.list = res.data.list;
					}
				})
			},
			goUser: function(userid) {
				uni.navigateTo({
					url: "../forum_home/index?userid=" + userid
				})
			},
		}
	});
</script>

<style>
	@import url("../forum.css");
</style>
