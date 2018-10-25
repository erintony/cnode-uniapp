<template>
	<view class="head">
		<view class="logo-view" @tap="logoClick">
			<image class="logo" src="../../static/cnode-logo.svg" style="height: 100%;"></image>
		</view>
		
		<view class="search-section">
			<input :class="searchFocus ? 'focus' : '' " focus @focus="focus" @blur="blur"/>
		</view>
		
		<view class="more-view"><image class="more" src="../../static/more.svg" width="16" height="16"></image></view>
	</view>
</template>

<script>
	export default {
		data: {
			searchFocus: true,
		},
		
		methods: {
			focus: function(e) {
				this.searchFocus = true;
			},
			blur: function(e) {
				this.searchFocus = false;
			},
			logoClick() {
				uni.reLaunch({
					url: '/pages/index/index'
				});
			}
		}
	}
</script>

<style lang="scss">

.head {
	height: 50px;
	background-color: #444; 
	justify-content: space-between;
	
	.logo-view {
		flex: 1 1 1;
	}
	
	.logo {
		width: 80px;
		object-fit: contain;
	}
	
	.search-section {
		flex: 1 2 2;
		margin:0 20px;
		padding:10px 0;

		
		input {
			background:#888;
			padding: 3px 5px 3px 12px;
			color: #666;
			border: 0;
			margin-top: 2px;
			transition: all .5s;
			margin-bottom: 0;
			font-size: 13px;
			font-weight: 400;
			line-height: 1;
			-webkit-border-radius: 15px;
			-moz-border-radius: 15px;
			border-radius: 15px;
			
			&.focus {
				background: #eee;
			}
		}
	}
	
	.more-view {
		padding:10px 4px;
	}
	
	.more {
		width: 32px;
		height: 32px;
		color: #fff;
	}
}
</style>
