<template>
	<view  v-if="pageLoad">
		 
			<view v-if="pageData.rscount==0">
				<view class="emptyData">暂无充值记录</view>
			</view>
			<view v-else>	 
					<view  class="row-box"  v-for="(item,index) in pageData.list" :key="index">	 
							<view class="row-box-hd">
								<view class="btn-small btn-outline-primary mgr-10">{{item.status_name}}</view>
								<view class="cor-money">￥{{item.money}}</view>
								<view class="flex-1"></view>
								<view class="time cor2">{{item.orderno}}</view>
							</view>
							<view class="flex mgb-10">
								<view class="cor3 mgr-10">{{item.timeago}}</view>
								<view class="cor2">{{item.pay_type_name}}</view>
								
							</view>
 
					</view>
			</view>	 
			 
  
	</view> 
</template>

<script> 
	var app= require("../../common/common.js"); 
	var per_page=0;
	var isfirst=true;
	var catid=0;
	export default{
 
		data:function(){
			return {
				pageLoad:false, 
				pageHide:false,
				pageData:{},
			}
			
		},
		onLoad:function(option){
			uni.setNavigationBarTitle({
				title: '充值记录'
			});
			this.getPage();
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
				uni.request({
					url:app.apiHost+"?m=recharge&a=my&ajax=1",
					data:{
						authcode:app.getAuthCode()
					},
					success:function(data){
						isfirst=false;
						that.pageLoad=true;
						that.pageData=data.data.data;
						per_page=data.data.data.per_page; 
					}
				})
			},
			 
			getList:function(){
				var that=this;
				if(!isfirst && per_page==0) return false;
				uni.request({
					url:app.apiHost+"?m=recharge&a=my&ajax=1",data:{
						per_page:per_page,
						catid:catid,
						authcode:app.getAuthCode()
					},
					success:function(data){
						
						if(!data.data.error){
							if(isfirst){
								that.pageData.list=data.data.data.list;
								isfirst=false;
							}else{
								
								that.pageData.list=app.json_add(that.pageData.list,data.data.data.list);
							}
							per_page=data.data.data.per_page;  
							
						}
						
						
					}
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
			}
		},
	}
</script>

<style>
 
 
</style>
