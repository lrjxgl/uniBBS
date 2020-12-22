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
			<view class="m-navPic mgt-5 mgb-5">
				<navigator v-for="(item,key) in pageData.navList" :key="key"  :url="item.link1" class="m-navPic-item">
					<image class="m-navPic-img"  mode="widthFix" :src="item.imgurl"></image>
					<view class="m-navPic-title">{{item.title}}</view>
				</navigator>
			
			</view>
			 
			<div class="tabNav">
				<div gourl="/module.php?m=forum" class="tabNav-item tabNav-item-active">推荐</div>
				<div  @click="gourl('../../pageforum/forum/new')"  class="tabNav-item">最新</div>
				<div  @click="gourl('../../pageforum/forum_feeds/index')"  class="tabNav-item">关注</div>
				<div  @click="gourl('../../pageforum/forum_paihang/index')"  class="tabNav-item">名人榜</div>
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
								url: "../../pages/login/index",
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
	.tabNav{
		padding: 10px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		background-color: #fff;
		border-bottom: 1px solid #eee;
	}
	.tabNav-item{
		cursor: pointer;
		margin-right: 40px;
		font-weight: 600;
	}
	.tabNav-item-active{
		color: #f60;
		padding-bottom: 3px;
	 
	}
</style>
