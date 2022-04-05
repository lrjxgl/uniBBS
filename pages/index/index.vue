<template>
	<div>
		<div v-if="!pageLoad" class="">
			<page-loading></page-loading>
		</div>
		<div v-if="pageLoad">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item v-for="(item,key) in flashList" :key="key">
					<view class="swiper-item">
						<image @click="gourl(item.link1)" :src="item.imgurl" style="width:100%" mode="widthFix"></image>
					</view>
				</swiper-item>
			
			</swiper>
			<view v-if="Object.keys(navList).length>0" class="m-navPic mgb-5">
			     
			    <navigator v-for="(item,index) in navList" :key="index" :url="item.link1" class="m-navPic-item">
					  <image mode="widthFix" class="m-navPic-img" :src="item.imgurl" ></image>
					  <view class="m-navPic-title">{{item.title}}</view>				   
			    </navigator>		
			   
			</view> 
			<div :style="tabClass" class="tabNav">
				<div @click="gourl('/pageforum/forum/index')" gourl="/module.php?m=forum" class="tabNav-item tabNav-item-active">推荐</div>
				<div @click="gourl('/pageforum/forum/new')"  class="tabNav-item">最新</div>
				<div @click="gourl('/pageforum/forum_feeds/index')"  class="tabNav-item">关注</div>
				<div @click="gourl('/pageforum/forum_paihang/index')"  class="tabNav-item">名人榜</div>
			</div>
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
		<forum-footer tab="home"></forum-footer>
		<!-- #ifdef H5 -->
		<navigator url="../../pages/index/index" open-type="reLaunch" class="fixToHome iconfont icon-back"></navigator>
		<!-- #endif -->
		<go-top></go-top>
	</div>
</template>

<script>
	import forumFooter from "../../components/forumfooter.vue";
 
 
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
				list: [],
				isFirst:true,
				per_page:0,
				adList:[],
				navList:[],
				flashList:[],
				tabClass:"",
				swiperHeight: 200,
			}

		},
		onLoad: function(option) {
			uni.setNavigationBarTitle({
				title: '福鼎论坛'
			});
			var sys=uni.getSystemInfoSync();
			this.swiperHeight=sys.windowWidth/2;
			this.getPage();
		},

		onShareAppMessage:function(){
			
		},
		onShareTimeline:function(){
			
		},
		onReachBottom: function() {
			this.getList();
		},
		onPullDownRefresh: function() {
			this.refresh();
			
		},
		onPageScroll:function(e){
				if(e.scrollTop>this.swiperHeight+60){
					// #ifdef H5
					this.tabClass="position: fixed;left:0;right:0;top:44px;";
					// #endif
					//#ifndef H5
					this.tabClass="position: fixed;left:0;right:0;top:0px;";
					// #endif
					
				}else{
					this.tabClass="";
				}
				
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
					url: that.app.apiHost + "/forum/index?ajax=1",
					
					success: function(res) {
						//登录
						if (res.error == 1000) {
							uni.navigateTo({
								url: "/pages/login/index",
							})
						} else {
							that.isFirst = false;
							that.flashList=res.data.flashList;
							that.pageLoad = true;
							that.navList = res.data.navList;
							that.per_page = res.data.per_page;
							that.list=res.data.list;
						}

					}
				})
			},
			 
			getList: function() {
				var that = this;
				if (!that.isFirst && that.per_page == 0) return false;
				that.app.get({
					url: that.app.apiHost + "/forum/index?ajax=1",
					data: {
						per_page: that.per_page,
					},
					success: function(res) {
						if(!res.error){
							if(that.isFirst){
								that.isFirst=false;
								that.list=res.data.list;
							}else{
								for(var i in res.data.list){
									that.list.push(res.data.list[i])
								}
							}
							that.per_page=res.data.per_page;
						}
					}
				})
			},
			goForum: function(id) {
				uni.navigateTo({
					url: "/pageforum/forum/show?id=" + id
				})
			},
			goUser: function(userid) {
				uni.navigateTo({
					url: "/pageforum/forum_home/index?userid=" + userid
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
		height: 380rpx;
	}
	.tabNav{
		padding: 10px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		background-color: #fff;
		border-bottom: 1px solid #eee;
		background-color: #ff;
		z-index: 999;
		position: relative;
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
