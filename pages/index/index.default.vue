<template>
	<view>
		<view>

			<swiper class="mgb-5" v-if="flashList.length>0" :style="{height:swiperHeight+'px'}" :indicator-dots="true"
				:autoplay="true" :interval="3000" :duration="1000">
				<swiper-item v-for="(item,key) in  flashList" :key="key">
					<view class="swiper-item">
						<image @click="gourl(item.link1)" :src="item.imgurl" style="width:100%" mode="widthFix"></image>
					</view>
				</swiper-item>

			</swiper>
			<view v-if="navList.length>0" class="m-navPic mgb-5">

				<navigator v-for="(item,index) in navList" :key="index" :url="item.link1" class="m-navPic-item">
					<image mode="widthFix" class="m-navPic-img" :src="item.imgurl"></image>
					<view class="m-navPic-title">{{item.title}}</view>
				</navigator>
			</view>
			<view v-if="adList && adList.length>0" class="adBox bg-white mgb-5">
				<navigator v-for="(item,index) in adList" :key="index" :url="item.link1" class="adBox-item">
					<image :src="item.imgurl" mode="widthFix" class="adBox-img"></image>
				</navigator>
			</view>

			<div v-if="articleList && articleList.length>0">
				<div class="row-box-hd pdl-10">
					<div class="flex-1 f16">文章资讯</div>
					<div @click="gourl('/pages/article/index')" class="row-box-more">更多</div>
				</div>
				<view class="sglist">
					<view class="emptyData" v-if="articleList.length==0">暂无内容</view>
					<view v-for="(item,index) in  articleList" :key="index" @click="goArticle(item.id)" class="sglist-item">
						<image  @click="goArticle(item.id)" v-if="item.imgurl" mode="widthFix" :src="item.imgurl+'.middle.jpg'" class="sglist-img">
						</image>
						<view class="sglist-title">{{item.title}}</view>
						<view class="sglist-desc">{{item.description}}</view>
				
					</view>
				
				</view>
			</div>
			

			<mt-footer tab="home"></mt-footer>
		</view>

	</view>
</template>

<script>
	import mtFooter from "@/components/footer.vue"
	export default {
		components:{
			mtFooter
		},
		data() {
			return {
				flashList: [],
				navList: [],
				adList: [],
				articleList: [],
				productList: [],
				list: [],
				swiperHeight: 100,
				winWidth: 0,
			}
		},
		onLoad() {
			this.getPage();
			const res = uni.getSystemInfoSync();
			this.winWidth = res.windowWidth;
			this.swiperHeight = Math.min(640, res.windowWidth) / 2;
		},
		onPullDownRefresh: function() {
			this.getPage();
			uni.stopPullDownRefresh()
		},
		onReachBottom: function() {
			this.getList();

		},
		methods: {
			gourl(url){
				uni.navigateTo({
					url:url
				})
			},
			getPage() {
				var that = this;
				this.app.get({
					url: that.app.apiHost + "/index/index/index",
					dataType: "json",
					success: function(res) {
						that.flashList = res.data.flashList;
						that.navList = res.data.navList;
						that.adList = res.data.adList;
						that.articleList = res.data.articleList;
						that.productList = res.data.productList;
						that.site = res.data.site;
						uni.stopPullDownRefresh();
						that.pageLoad = true;
					}
				})
			},
			goArticle(id){
				uni.navigateTo({
					url:"/pages/article/show?id="+id
				})
			}

		}
	}
</script>

<style>
</style>