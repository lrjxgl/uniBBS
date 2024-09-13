<template>
	<div>
		<div v-for="(item,index) in list" :key="index" class="bd-mp-10">
			<div class="flex flex-ai-center mgb-10">
				<image mode="widthFix" :src="item.user_head+'.100x100.jpg'" class="wh-40 bd-radius-50  mgr-10 "></image>
				<div class="flex-1 ">
					<div class="flex flex-ai-center mgb-5">
						<div class="mgr-20 fw-600 f16">{{item.nickname}}</div>
						<image mode="widthFix" :src="item.user.rank.logo" class="rankLogo"></image>
					</div>
					<div class="flex flex-ai-center">
						<div class="cl3 f12">{{item.timeago}}</div>
						<div class="cl3">·</div>
						<div class="cl3 f12">{{item.view_num}} 浏览</div>
					</div>
				</div>
			</div>

			<div class="flex flex-ai-center mgb-10">

				<div @click="goDetail(item.id)" class="fw-600 pointer f16">{{item.title}}</div>
			</div>
			<div @click="goDetail(item.id)" class="mgb-10 pointer">
				{{item.description}}
			</div>
			<div v-if="item.videourl!=''">
				<video class="mgb-5" :src="item.videourl"></video>
			</div>
			<div v-if="item.imgslist && item.imgslist.length>0" @click="goDetail(item.id)" class="pointer">
				<img-list :imgslist="item.imgslist"></img-list>

			</div>
		</div>
	 
	</div>
</template>

<script>
	import imgList from "@/components/list-image.vue"
	export default {
		components: {
			imgList
		},
		props: {
			dataList: Array
		},
		data: function() {
			return {
				list: []
			}
		},
		watch: {
			dataList(n, o) {
				this.list = n;
			}
		},
		created: function() {
			console.log(this.dataList)
			this.list = this.dataList;
			console.log(this.list)
		},
		watch: {
			dataList: function(n, o) {
				this.list = n;

			}
		},
		methods: {
			goUserHome: function(userid) {
				uni.navigateTo({
					url: "/pageforum/forum_home/index?userid=" + userid
				})

			},

			goDetail: function(id) {
				uni.navigateTo({
					url: "/pageforum/forum/show?id=" + id
				})

			},
			goGroup: function(gid) {
				uni.navigateTo({
					url: "/pageforum/forum/list?gid=" + gid
				})
			},
		}
	}
</script>