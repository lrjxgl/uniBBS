<template>
	<div>
		<div id="app" >
			 
			<div class="flex pd-5 bg-white">
				<input class="input-flex-text bd-radius-10 outline-none" v-model="keyword" :value="keyword" id="keyword" />
				<div class="input-flex-btn w60" @click="search">搜一下</div>
			</div>
			<div v-if="pageLoad">
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
						<image mode="widthFix" class="flist-vd-bg" :src="item.videoimg"></image>
						<div class="flist-vd-play"></div>
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
		</div>
		<forum-footer tab="search"></forum-footer>
	</div>
</template>

<script>
	import forumFooter from "../../components/forumfooter.vue";
 
	export default({
		components:{
			forumFooter
		},
		data:function(){
			return {
				pageLoad:false,
				pageData:{},
				keyword:"",
				page:"product"
			}
		},
		onLoad:function(ops){
			this.keyword=ops.keyword;
			this.getPage();
		},
		methods:{
			goForum:function(id){
				uni.navigateTo({
					url:"../forum/show?id="+id
				})
				 
			},
			 
			search:function(){
				this.getPage();
			},
			setPage:function(page){
				this.page=page;
				this.pageLoad=false;
				this.pageData={};
				this.getPage();
			},
			getPage:function(){
				this.getForum();
			},
			 
			getForum:function(){
				var that=this;
				this.app.get({
					url:that.app.apiHost+"/module.php?m=forum&a=search&ajax=1",
					data:{
						keyword:this.keyword
					},
					dataType:"json",
					success:function(res){
						that.pageLoad=true;
						that.pageData=res.data;
					}
				})
			}
		}
	});
</script>

<style>
</style>
