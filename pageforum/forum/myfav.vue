<template>
	<view>
		<div v-if="pageLoad">
			<div class="sglist">
				<div @click="goDetail(item.id)" class="sglist-item" v-for="(item,index) in list" :key="index">
					<div class="flex mgb-5">
						<img :src="item.user_head+'.100x100.jpg'" class="wh-40 bd-radius-50" />
						<div class="flex-1 mgl-5">
							<div class="f14 fw-600 mgb-5">{{item.nickname}}</div>
							<div class="flex">
								<div class="f12 cl3">{{item.timeago}}</div>

							</div>
						</div>
						<div class="cl2 f12">来自{{item.group_title}}</div>
					</div>
					<div class="sglist-title mgb-10">{{item.title}}</div>

					<div class="sglist-imglist">

						<img v-for="(img,imgindex) in item.imgslist" :key="imgindex" :src="img+'.100x100.jpg'" class="sglist-imglist-img" />

					</div>

				</div>
			</div>
			<div @click="getList" v-if="per_page>0" class="loadMore">点我加载更多...</div>
		</div>
	</view>
</template>

<script>
	var tablename = "mod_forum";
	export default {
		data: function() {
			return {
				pageLoad: false,
				list: [],
				per_page: 0,
				isFirst: true
			}
		},
		onLoad: function() {
			this.getPage();
		},
		onReachBottom: function() {
			this.getList();
		},
		onPullDownRefresh: function() {
			this.getPage();
		},
		onShareAppMessage: function() {

		},
		methods: {
			goDetail: function (id) {
				uni.navigateTo({
					url: "../forum/show?id=" + id
				})
			},
			getPage: function() {
				var that = this;
				that.app.get({
					url: that.app.apiHost + "/module.php?m=forum_fav&a=mylist&tablename=" + tablename + "&ajax=1",
					success: function(res) {
						that.pageLoad = true;
						that.list = res.data.list;
						that.per_page = res.data.per_page;
					}
				})
			},
			getList: function() {
				var that = this;
				if (that.per_page == 0 && !that.isFirst) {
					return false;
				}
				that.app.get({
					url: that.app.apiHost + "/module.php?m=forum_fav&a=mylist&tablename=" + tablename + "&ajax=1",
					data: {
						per_page: that.per_page
					},
					success: function(res) {
						that.per_page = res.data.per_page;
						if (that.isFirst) {
							that.list = res.data.list;
							that.isFirst = false;
						} else {
							for (var i in res.data.list) {
								that.list.push(res.data.list[i]);
							}
						}

					}
				})
			}
		},
	}
</script>

<style>
</style>
