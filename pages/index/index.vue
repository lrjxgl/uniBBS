<template>
	<div>
		<div v-if="!pageLoad" class="">
			<page-loading></page-loading>
		</div>
		<div v-if="pageLoad">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item v-for="(item,key) in pageData.flashList" :key="key">
					<view class="swiper-item">
						<image @click="gourl(item.link1)" :src="item.imgurl" style="width:100%" mode="widthFix"></image>
					</view>
				</swiper-item>
			
			</swiper>
			<div class="row-box-hd">
				<div class="flex-1 mgl-10 f16">推荐版块</div>
				<navigator url="../../pageforum/forum_group/index" class="row-box-more">更多</navigator>
			</div>
			<div class="flexlist">
				<div class="flexlist-item bg-fff" v-for="(item,key) in pageData.grouplist" :key="key">
					<navigator class="flexlist-imgbox" :url="'../../pageforum/forum/list?gid='+item.gid">
						<img class="flexlist-img" :src="item.imgurl+'.100x100.jpg'">
					</navigator>
					<div class="flex-1">
						<navigator class="flexlist-title" :url="'../../pageforum/forum/list?gid='+item.gid">{{item.title}}</navigator>
						<div class="flexlist-row">
							主题数
							<text class="cl-num mgl-5 mgr-10">{{item.topic_num}}</text>

							评论数
							<text class="cl-num  mgl-5">{{item.comment_num}}</text>
						</div>
						<div class="flexlist-desc">{{item.description}}</div>
					</div>

				</div>

			</div>
			<div class="row-box-hd">
				<div class="flex-1 mgl-10 f16">推荐帖子</div>

			</div>
			<div class="flist">
				<div @click="goForum(item.id)" class="flist-item" v-for="(item,fkey) in pageData.list" :key="fkey">
					<div class="flist-user">
						<image :src="item.user_head+'.100x100.jpg'" class="flist-head"></image>
						<div class="flex-1">
							<div class="flist-nick">{{item.nickname}}</div>
							<div class="flist-time">{{item.timeago}}</div>
						</div>
					</div>
					<div class="flist-title">{{item.title}}</div>

					<div class="flist-vd" v-if="item.videourl">
						<image class="flist-vd-bg" :src="item.videoimg"></image>
						<div class="flist-vd-play"></div>
					</div>

					<div class="flist-vd" v-else-if="item.imgurl">
						<image class="flist-vd-bg" :src="item.imgurl+'.middle.jpg'" mode="widthFix"></image>

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
		<forum-footer tab="home"></forum-footer>
	</div>
</template>

<script>
	import forumFooter from "../../components/forumfooter.vue";
	var app = require("../../common/common.js");
	var per_page = 0;
	var isfirst = true;
	var gid = 0;
	var activeClass = "tabs-border-active";
	export default {
		components:{
			forumFooter
		},
		data: function() {
			return {
				defaultActive: "tabs-border-active",
				pageLoad: false,
				pageHide: false,
				pageData: {},
			}

		},
		onLoad: function(option) {
			uni.setNavigationBarTitle({
				title: '福鼎论坛'
			});
			this.getPage();
		},


		onReachBottom: function() {
			this.getList();
		},
		onPullDownRefresh: function() {
			this.refresh();
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
					url: that.app.apiHost + "/module.php?m=forum&ajax=1",
					
					success: function(res) {
						//登录
						if (res.error == 1000) {
							uni.navigateTo({
								url: "/pages/login/index",
							})
						} else {
							isfirst = false;
							that.pageLoad = true;
							that.pageData = res.data;
							per_page = res.data.per_page;
						}

					}
				})
			},
			setGroup: function(cid) {
				gid = cid;
				isfirst = true;
				per_page = 0;
				if (gid == 0) {
					this.defaultActive = activeClass;
				} else {
					this.defaultActive = "";
				}
				var grouplist = this.pageData.grouplist;
				for (var i in grouplist) {
					if (grouplist[i].gid == gid) {
						grouplist[i].isactive = 1;
					} else {
						grouplist[i].isactive = 0;
					}
				}
				this.pageData.grouplist = grouplist;
				this.getList();
			},
			getList: function() {
				var that = this;
				if (!isfirst && per_page == 0) return false;
				uni.request({
					url: app.apiHost + "/module.php?m=forum&ajax=1",
					data: {
						per_page: per_page,
						gid: gid,
						authcode: app.getAuthCode()
					},
					success: function(res) {

						if (!res.data.error) {
							if (isfirst) {
								that.pageData.list = res.data.data.list;
								isfirst = false;
							} else {

								that.pageData.list = app.json_add(that.pageData.list, res.data.data.list);
							}
							per_page = res.data.data.per_page;

						}


					}
				})
			},
			goForum: function(id) {
				uni.navigateTo({
					url: "../../pageforum/forum/show?id=" + id
				})
			},
			refresh: function() {
				this.getPage();
				setTimeout(function() {
					uni.stopPullDownRefresh();
				}, 1000)
			},
			loadMore: function() {
				this.getList();
			}
		},
	}
</script>

<style>
swiper{
		height: 440upx;
	}
</style>
