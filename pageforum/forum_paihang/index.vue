<template>
	<div v-if="pageLoad" class="main-body">
		<div class="tabs-border-group">
			<div class="tabs-border">
				<div @click="tab='a'" :class="tab=='a'?'tabs-border-active':''"  class="tabs-border-item">热帖榜</div>
				<div @click="tab='b'" :class="tab=='b'?'tabs-border-active':''" class="tabs-border-item">名人榜</div>
				
			</div>
			<div v-if="tab=='a'" >
				<view v-if="wzList.length==0" class="emptyData">暂无</view>
				<view class="sglist" v-else>
					<forum-list :data-list="wzList"></forum-list>
				</view> 
			</div>
			<div  v-if="tab=='b'" class="row-box">
				<div class="flex mgb-10">
					<div class="td-a fwb">排行</div>
					<div class="td-b fwb">头像</div>
					<div class="td-c fwb">昵称</div>
					<div class="flex-1"></div>
					<div class="td-d fwb">积分</div>
				</div>
				 
				<div  @click="goUser(item.userid)"  v-for="(item,index) in fsList" :key="index" class="flex flex-ai-center mgb-10">
					<div class="td-a cl-num">{{index+1}}</div>
					<div class="td-b">
						<image mode="widthFix" class="rdImg" :src="item.user_head+'.100x100.jpg'" ></image>
					</div>
					<div class="td-c">{{item.nickname}}</div>
					<div class="flex-1"></div>
					<div class="td-d cl-num">{{item.followed_num}}</div>
				</div>
				 
			</div>
		</div>
	</div>
</template>
<script>
	import forumList from "@/components/forum/forum-list.vue"
	export default {
		components:{
			forumList
		},
		data: function() {
			return {
				fsList: [],
				wzList: [],
				pageLoad:false,
				tab:"a"
			}
		},
		onLoad: function() {
			this.getPage();
		},
		methods: {
			goUser:function(userid){
				uni.navigateTo({
					url:"../../pageforum/forum_home/index?userid="+userid
				})
			},
			goForum:function(id){
				uni.navigateTo({
					url:"../../pageforum/forum/show?id="+id
				})
			},
			getPage: function() {
				let that=this;
				that.app.get({
					url:that.app.apiHost+"/mm/forum_paihang/index?ajax=1",
					success:function(res){
						that.wzList=res.data.wzList;
						that.fsList=res.data.fsList;
						that.pageLoad=true;
					}
				})
			}
		}
	}
</script>
<style>
	@import url("../forum.css");
	.fwb {
		font-weight: 600;
	}

	.rdImg {
		width: 80rpx;
		height: 80rpx;
		border-radius: 80rpx;
	}

	.td-a,
	.td-b,
	.td-d {
		text-align: center;
		justify-content: center;
		align-items: center;
	}

	.td-a {
		width: 80rpx;
	}

	.td-b {
		width:160rpx;
	}

	.td-c {
		width: 200rpx;
	}

	.td-d {
		width: 120rpx;

	}
</style>
