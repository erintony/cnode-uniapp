<template>
	<view id="app" class="app-container">
		<cn-head></cn-head>
		
		<view class="content">
			<view class="topic-tab">
				<text v-for="(value, key) in tabs" :key='key' :class="value.selected ? 'selected' : ''" @tap='topicTapClick(key)'>
					{{key}}({{value.count}})
				</text>
			</view>
			
			<topic-list :data="showData"></topic-list>
			
		</view>
	</view>
	
</template>

<script>
	import cnHead from "../../components/header/cnHead.vue";
	import topicList from '../../components/topic-list/topic-list.vue';
	
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
			cnHead,
			topicList
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
				
				//console.dir(data);
				
				
				data.forEach(function(item,index) {
					item.last_reply_at = _that.latestTimeFormat(item.last_reply_at);
					
					var tab = item.tab;
					if (!tab) {
						tab = "unclassified";
						item.tab = tab;
					}
					
					//创建tab筛选数据
					if (topics[tab]) {
						topics[tab].count ++;
					} else {
						topics[tab] = {
							tab: item.tab,
							selected: false
						};
						topics[tab].count = 1;
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
			flex-wrap: wrap;

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
	
	}
</style>
