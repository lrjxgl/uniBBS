<template>
	<view v-if="pageLoad">
		<view v-if="catList.length>0" class="tabs-border">
			<view  @click="setCat(0)" class="tabs-border-item" :class="0==catid?'tabs-border-active':''">推荐</view>
			<view @click="setCat(item.catid)" :class="item.catid==catid?'tabs-border-active':''" v-for="(item,key) in catList" :key="key" class="tabs-border-item">{{item.title}}</view>
			
		</view>
		<swiper v-if="flashList.length>0" :style="{height:swiperHeight+'px'}" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,key) in flashList" :key="key">
				<view class="swiper-item">
					<image @click="gourl(item.link1)" :src="item.imgurl" style="width:100%" mode="widthFix"></image>
				</view>
			</swiper-item>
		
		</swiper>
		<view v-if="recList.length>0">
			<div class="fw-600 bd-mp-10 pd-10 f16">板块推荐</div>
			<forum-list class="row-box" :dataList="recList"></forum-list>
		</view>
		<div v-if="list.length==0 && recList.length==0" class="emptyData">暂无帖子</div>
		<view v-if="list.length>0">
			<div class="fw-600 bd-mp-10 pd-10 f16">最新帖子</div>
			 
			<forum-list class="row-box" :dataList="list"></forum-list>
			
		</view>
		<go-top></go-top>
		<navigator style="bottom:200px;" :url="'../forum/add?gid='+gid+'&catid='+catid" class="fixedAdd2"></navigator>
	</view> 
</template>

<script> 
	import forumList from "@/components/forum/forum-list.vue"
	export default{
		components:{
			forumList
		},
		data:function(){
			return {
				pageLoad:false, 
				pageHide:false,
				gid:0,
				catid:0,
				recList:[],
				list:[],
				catList:[],
				isFirst:true,
				per_page:0,
				group:{},
				flashList:[],
				swiperHeight: 200,
			}
			
		},
		onLoad:function(ops){
			if(ops.catid!=undefined){
				this.catid=ops.catid;
			}
			if(ops.gid!=undefined){
				this.gid=ops.gid;
			}
			var sys=uni.getSystemInfoSync();
			this.swiperHeight=sys.windowWidth/2;
			this.getPage();
		},
		 
		onReachBottom:function(){
			this.getList();
		},
		onPullDownRefresh:function(){
			this.isFirst=true;
			this.per_page=0;
			this.getList();
			setTimeout(function(){
				uni.stopPullDownRefresh();
			},1000)
		},
		onShareAppMessage:function(){
			
		},
		onShareTimeline:function(){
			
		},
		methods:{
			getPage:function(){
				var that=this;
				that.app.get({
					url:that.app.apiHost + "/mm/forum/list?ajax=1",
					data:{
						gid:this.gid,
						catid:this.catid
					},
					success:function(res){
						//登录
						if(res.error==1000){
							uni.navigateTo({
								url:"/pages/login/index",
							})
						}else{
							that.catList=res.data.catlist;
							that.group=res.data.group;
							that.isFirst=false;
							that.pageLoad=true;
							that.list=res.data.list;
							console.log(that.list)
							that.per_page=res.data.per_page;
							that.recList=res.data.recList; 
							that.flashList=res.data.flashList;
							uni.setNavigationBarTitle({
								title: res.data.group.title
							});
						}
						 
					}
				})
			},
			setCat:function(cid){
				this.catid=cid;
				this.isFirst=true;
				this.per_page=0;
				this.getList();
			 },
			getList:function(){
				var that=this;
				if(!that.isFirst && that.per_page==0) return false;
				that.app.get({
					url:that.app.apiHost + "/mm/forum/list?ajax=1",
					data:{
						per_page:that.per_page,
						catid:that.catid,
						gid:that.gid,
					},
					success:function(res){
						if(res.error){
							return false;
						}
						
						that.per_page=res.data.per_page; 
						if(that.isFirst){
							that.list=res.data.list;
							that.recList=res.data.recList;
							that.isFirst=false;
						}else{
							 
							for(var i in res.data.list){
								that.list.push(res.data.list[i])
							}
							
						}
						
					}
				})
			},
			goForum: function (id) {
				uni.navigateTo({
					url: "../forum/show?id=" + id
				})
			},
			goUser: function(userid) {
				uni.navigateTo({
					url: "../forum_home/index?userid=" + userid
				})
			}
			 
		},
	}
</script>

<style>
 @import url("../forum.css");
</style>
