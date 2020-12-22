<template>
	<div>
		<div class="flex pd-5 bg-white">
			<input class="input-flex-text bd-radius-10 outline-none" v-model="keyword" />
			<div class="input-flex-btn w60" @click="search">搜一下</div>
		</div>
		<div v-if="pageLoad">
			<div class="flist">
				<div @click="goForum(item.id)" class="flist-item" v-for="(item,fkey) in  list" :key="fkey">
					<div class="flist-user">
						<image :src="item.user_head+'.100x100.jpg'" class="flist-head"></image>
						<div class="flex-1">
							<div class="flist-nick">{{item.nickname}}</div>
							<div class="flist-time">{{item.timeago}}</div>
						</div>
					</div>
					<div class="flex mgb-5">
						<div v-if="item.videourl" class="iconfont cl-red mgr-5 icon-video"></div>
						<div class="flex-1">{{item.title}}</div>
					</div>
					<div class="flist-imgs" v-if="item.imgslist">
						<image v-for="(img,imgIndex) in item.imgslist" :key="imgIndex" :src="img+'.100x100.jpg'" class="flist-imgs-img"
						 mode="widthFix"></image>
					</div>
		
					<div class="flex flist-ft">
						<div class="flist-ft-love">
							{{item.love_num}} </div>
						<div class="flist-ft-cm">
							{{item.comment_num}} </div>
						<div class="flist-ft-view">
							{{item.view_num}} </div>
					</div>
				</div>
		
			</div>
		
		</div>
		<forum-footer tab="search"></forum-footer>
	</div>
</template>

<script>
	import forumFooter from "../../components/forumfooter.vue";

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
					url: that.app.apiHost + "/module.php?m=forum&a=search&ajax=1",
					data: {
						keyword: this.keyword
					},
					dataType: "json",
					success: function(res) {
						that.pageLoad = true;
						that.list = res.data.list;
					}
				})
			}
		}
	});
</script>

<style>
</style>
