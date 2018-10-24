<template>
	<view id="app">
		<view class="head">
			<view class="logo-view">
				<image class="logo" src="../../static/cnode-logo.svg" style="height: 100%;"></image>
			</view>
			
			<view class="search-section">
				<input :class="searchFocus ? 'focus' : '' " focus @focus="focus" @blur="blur"/>
			</view>
			
			<view class="more-view"><image class="more" src="../../static/more.svg" width="16" height="16"></image></view>
		</view>
		<view class="content">
			<view class="topic-tab">
				<text v-for="(value, key) in tabs" :key='key' :class="value.selected ? 'selected' : ''" @tap="topicTapClick(key)">
					{{key}}({{value.count}})
				</text>
			</view>
			
			<view class="topic-list">
				<view v-for="(value, key) in showData" :key='key' class="topic">
					<image class="avatar" :src="value.author.avatar_url" :title="value.author.loginname"></image>
					<text class="reply-count">{{value.reply_count}}</text>
					<text>/</text>
					<text class="visit-count">{{value.visit_count}}</text>
					<text class="topiclist-tab">{{value.tab}}</text>
					<text class="title">{{value.title}}</text>
					
					<view class="latest-info">
						<image :src="value.author.avatar_url" :title="value.author.loginname" class="user_small_avatar"></image>
						<text class="last_active_time">{{value.last_reply_at}}</text>
					</view>
				
				</view>
				
			</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		data: {
			title: 'Hello',
			searchFocus: true,
			tabs: {},
			data: [],
			selectedTopic: 'all',
			showData: [],
		},
		
		methods:{
			focus: function(e) {
				this.searchFocus = true;
			},
			blur: function(e) {
				this.searchFocus = false;
			},
			
			getTopics: function() {
				
				var topics = [];
				if (this.selectedTopic === 'all') {
					return this.data;
					
				}
				
				topics = this.data.filter(function (index, item) {
					return item.tab === this.selectedTopic;
				});
				return topics;
				
			},
			
			topicTapClick: function(key) {
				this.selectedTopic = key;
				
				for (var item in this.tabs) {
					this.tabs[item].selected = false;
					if (item === key) {
						this.tabs[item].selected = true;
					}
				}
				
			}
		},
		
		watch : {
			selectedTopic: function() {
				var topics = [];
				var _that = this;
				if (this.selectedTopic === 'all') {
					this.showData = this.data;
					return;
				}
				
				topics = this.data.filter(function (item, index) {
					return item.tab === _that.selectedTopic;
				});

				this.showData = topics;
			}
		},
		
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			console.log("onload...");
			console.log(option.id); //打印出上个页面传递的参数。
			var server = 'https://cnodejs.org/api/v1';
			var _that = this;
			uni.request({
				url: server + '/topics', 
				success: (res) => {
					_that.data = res.data.data;
					
					
					var topics = {
						"all": {
							tab: "all",
							count: _that.data.length,
							selected: true
						}
					};
					_that.data.forEach(function(item,index) {
						item.last_reply_at = _that.latestTimeFormat(item.last_reply_at);
						
						if (topics[item.tab]) {
							topics[item.tab].count ++;
						} else {
							topics[item.tab] = {
								tab: item.tab,
								selected: false
							};
							topics[item.tab].count = 1;
						}
					});
					
					_that.showData = _that.data;
					_that.tabs = topics;
										
				}
			});
			
			
		},
	
		onReady: function() {
			console.log('onReady..');
			
		},
		onShow() {
			console.log('onShow...');
		}
	}
</script>

<style lang="scss">
	#app {
		display: block;
		width: 100%;
		
		view {
			//display: block;
			
		}
	}
	
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
	.content {
		flex-flow: column nowrap;
		flex: 1;
		justify-content: center;
		align-items: center;
		
		.topic-tab {
			padding: 10upx;
			width: 100%;
			background-color: #f6f6f6;
			border-radius: 3px 3px 0 0;
			justify-content:flex-start;

			text {
				padding: 6upx 12upx;
				margin: 0 12upx;
				color: #80bd01;
				font-size: 36upx;
				border-radius: 3px;
				
				&:hover {
					color: #08c;
				}
				
				&.selected {
					color: #fff;
					background-color: #80bd01;
					
				}
			}
		}
	
		.topic-list {
			width: 100%;
			flex-flow: column nowrap;
			font-size: 36upx;
			
			.topic {
				padding: 20upx;
				background: #fff;
				border-top: 1upx solid #f0f0f0;
				flex-wrap: wrap;
				font-size: 34upx;
				
				.avatar {
					width: 60upx;
					height: 60upx;
				}
				
				image {
					margin-right: 10upx;
					border-radius: 6upx;
					
				}
				
				.user_small_avatar {
					width: 46upx;
					height: 46upx;
					align-self: center;
				
				}
				
				text {
					line-height: 60upx;
				}
				
				.reply-count {
					color: #9e78c0;
					font-size: 34upx;
				}
				
				.visit-count {
					color: #b4b4b4;
					font-size: 30upx;
					
				}
				
				.topiclist-tab {
					margin: 0 20upx;
					padding: 6upx 12upx;
					line-height: 1;
					align-self: center;
					
					background-color: #e5e5e5;
					color: #999;
					border-radius: 10upx;
					
				}
				
				.last_active_time {
					
				}
				
				.latest-info {
					flex-grow: 1;//这三个元素只有它在有空余空间时可伸缩，也就是它占据了所有剩余空间
					justify-content: flex-end;
				}
			}
		}
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
