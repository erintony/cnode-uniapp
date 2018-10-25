<template>
	<view id="app" class="app-container">
		<cn-head></cn-head>
		
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
					<text class="topic-tag" :class="value.top ? 'top' : ''">{{value.top ? '置顶' : value.tab}}</text>
					<!-- <navigator url="../topic/topic?id=value.id" hover-class="navigator-hover">
						<text class="title">{{value.title}}</text>
					</navigator> -->
					<text class="title" @tap='toTopic(value.id)'>{{value.title}}</text>
					
					<view class="latest-info">
						<image :src="value.last_reply_user ? value.last_reply_user.avatar_url : value.author.avatar_url" :title="value.last_reply_user ? value.last_reply_user.loginname : value.author.loginname" class="user_small_avatar"></image>
						<text class="last_active_time">{{value.last_reply_at}}</text>
					</view>
				
				</view>
				
			</view>
		</view>
	</view>
	
</template>

<script>
	import cnHead from "../../components/header/cnHead.vue";
	
	export default {
		data: {
			title: 'Hello',
			searchFocus: true,
			tabs: {},
			data: [],
			selectedTopic: 'all',
			showData: [],
		},
		
		components: {
			cnHead
		},
		
		methods:{
			
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
				
			},
			
			toTopic: function(id) {
				uni.navigateTo({
					url: '../topic/topic?id=' + id
				});
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
			},
			
			data : function() {
				console.log("data update,..");
				var server = 'https://cnodejs.org/api/v1/topic/';
				var _that = this;
				for (let item of this.data) {
					//查询最后评论用户信息
					this.requestPromise({
						url: server + item.id,
					}).then(Res => {
						var replies = Res.data.data.replies;
						item.last_reply_user = replies[replies.length - 1].author;											
						_that.topicTapClick(_that.selectedTopic);	
					}).catch(err => {
						item.last_replay_user = item.author;
						console.log("topic详情查询请求失败");  
					})
				}
			}
		},
		
		beforeMount: function() {
			console.log("beforeMounted,..");
		},
		
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			console.log("onload...");
			console.log(option.id); //打印出上个页面传递的参数。
			var server = 'https://cnodejs.org/api/v1';
			var _that = this;
			
			this.requestPromise({
			  url: server + '/topics',
			}).then(res => {
				
				var data = res.data.data;
				var topics = {
					"all": {
						tab: "all",
						count: data.length,
						selected: true
					}
				};
				
				
				data.forEach(function(item,index) {
					item.last_reply_at = _that.latestTimeFormat(item.last_reply_at);
					
					//创建tab筛选数据
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
				
				_that.data = data;
				
				_that.showData = _that.data;
				_that.tabs = topics;
									 
			}).catch(err => {
				console.log("topic获取查询请求失败");  
			})
			
		},
	
		onReady: function() {
			console.log("onReady,..");
			
		},
		onShow() {
			console.log('onShow...');
		}
	}
</script>

<style lang="scss">
	@import "../../common/common.scss";
// 	#app {
// 		display: block;
// 		width: 100%;
// 		
// 		view {
// 			//display: block;
// 			
// 		}
// 	}
	
	
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
