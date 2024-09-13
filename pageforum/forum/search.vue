<template>
	<div>
		<div class="flex pd-5 bg-white">
			<input class="input-flex-text bd-radius-10 outline-none" v-model="keyword" />
			<div class="input-flex-btn w60" @click="search">搜一下</div>
		</div>
		<div v-if="pageLoad">
			<div class="sglist">
				<forum-list :dataList="list"></forum-list>
		
			</div>
		
		</div>
		 
	</div>
</template>

<script>
	 
	import forumList from "@/components/forum/forum-list.vue"
	export default {
		components: {
			 
			forumList
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
					url: that.app.apiHost + "/mm/forum/search?ajax=1",
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
	}
</script>

<style>
	@import url("../forum.css");
</style>
