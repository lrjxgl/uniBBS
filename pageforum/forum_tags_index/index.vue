<template>
	<view v-if="pageLoad">
		<div v-if="!list || list.length==0" class="emptyData">暂无帖子</div>
		<view class="pd-10" v-else>
			<forum-list :dataList="list"></forum-list> 
			
		</view>
		 
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
				list:[],
				isFirst:true,
				per_page:0,
				tagid:0
			}
			
		},
		onLoad:function(ops){
			this.tagid=ops.tagid 
			this.getPage();
		},
		 
		onShow:function(){
			if(this.pageHide){
				this.pageHide=false;
				this.getPage();
			}			
		},
		onHide:function(){
			this.pageHide=true;
		}, 
		onReachBottom:function(){
			this.getList();
		},
		onPullDownRefresh:function(){
			this.refresh();
		},
		methods:{
			getPage:function(){
				var that=this;
				that.app.get({
					url:that.app.apiHost + "/mm/forum_tags_index/index?ajax=1&tagid="+this.tagid,
					success:function(res){
						if(res.error){
							return false;
						}
						that.isFirst=false;
						that.pageLoad=true;
						that.list=res.data.list;
						that.per_page=res.data.per_page;
						uni.setNavigationBarTitle({
							title:res.data.tags.title
						}) 
					}
				})
			},
			 
			getList:function(){
				var that=this;
				if(!that.isFIrst && that.per_page==0) return false;
				that.app.get({
					url:that.app.apiHost + "/mm/forum_tags_index/index?ajax=1&tagid="+this.tagid,
					data:{
						per_page:that.per_page
					},
					success:function(res){
						if(res.error){
							return false;
						}
						if(that.isFirst){
							that.isFirst=false;
							that.list=res.data.list;
						}else{
							for(var i in res.data.list){
								that.list.push(res.data.list[i]);
							}
						}
						 
						that.per_page=res.data.per_page;
						 
					}
				})
			},
			goForum: function (id) {
				uni.navigateTo({
					url: "../forum/show?id=" + id
				})
			},
			refresh:function(){
				this.getPage();
				setTimeout(function(){
					uni.stopPullDownRefresh();
				},1000)
			},
			loadMore:function(){
				this.getList();
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
 
</style>
