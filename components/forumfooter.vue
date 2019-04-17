<template>
	<div>
		<div class="footer-row"></div>
		<div class="footer">
			<div class="footer-item icon-home" v-bind:class="{'footer-active':tab=='home'}" @click="goHome()">首页</div>
			<div class="footer-item icon-cascades" v-bind:class="{'footer-active':tab=='group'}" @click="goFenlei()">版块</div>
			
			<div class="footer-item footer-add" v-bind:class="{'footer-active':tab=='add'}" @click="goAdd()">发布</div>
			<div class="footer-item icon-search" v-bind:class="{'footer-active':tab=='search'}"  @click="goSearch()">搜索</div> 
			<div class="footer-item icon-my_light" v-bind:class="{'footer-active':tab=='user'}"  @click="goUser()">我的</div>
		</div>
	</div>
</template>

<script>
	export default{
		props:{
			tab:""
		},
		data:function(){
			return {
				
			}
		},
		methods:{
			goSearch:function(){
				uni.redirectTo({
					url:"../../pageforum/forum/search"
				})
			},
			goHome:function(){
				uni.redirectTo({
					url:"../../pages/index/index"
				})
			},
			 
			goFenlei:function(){
				uni.navigateTo({
					url:"../../pageforum/forum_group/index"
				})
			},
			 
			goAdd:function(){
				uni.redirectTo({
					url:"../../pageforum/forum/add"
				})
			},
			goUser:function(){
				uni.redirectTo({
					url:"../../pages/user/index"
				})
			}
		}
	}
</script>

<style>
</style>
