<template>
	<view>
		<div v-if="list.length==0" class="emptyData">暂无评论</div>
		<div class="sglist">
			<div v-for="(item,index) in list" :key="index" class="sglist-item">
				<div class="f14">
					{{item.content}}

				</div>
				<div class="flex flex-ai-center  mgt-5">
					<div class="f12 flex-1 cl2">{{item.timeago}}</div>
					<div @click="gourl('../../pageforum/forum/show?id='+item.objectid)" class="btn-small mgr-10">查看</div>
					<div @click="del(item.id)" class="btn-small btn-danger">删除</div>
				</div>
			</div>
		</div>
		<div @click="getList" v-if="per_page>0" class="loadMore">点我加载更多...</div>
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
			gourl:function(url){
				uni.navigateTo({
					url:url
				})
			},
			getPage: function() {
				var that = this;
				that.app.get({
					url: that.app.apiHost + "/index/comment/my?tablename=" + tablename + "&ajax=1",
					unLogin:true,
					success: function(res) {
						if(res.error){
							if(res.error==1000){
								that.app.showLoginBox(true)
							}
							return false;
						}
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
					url: that.app.apiHost + "/index/comment/my?tablename=" + tablename + "&ajax=1",
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
			},
			del: function(id) {
				var that = this;
				var id = id;
				uni.showModal({
				    title: '提示',
				    content: '确认删除吗',
				    success: function (res) {
				        if (res.confirm) {
				            that.app.get({
				            	url: that.app.apiHost + "/index/comment/delete?tablename=" + tablename + "&id=" + id,
				            	dataType: "json",
				            	success: function(res) {
				            		var list = that.list;
				            		var nlist = [];
				            		for (var i = 0; i < list.length; i++) {
				            			if (list[i].id != id) {
				            				nlist.push(list[i]);
				            			}
				            		}
				            		that.list = nlist;
				            	}
				            })
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
				

			}
		},
	}
</script>

<style>
</style>
