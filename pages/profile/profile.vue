<template>
	<view class="app-container">
		<cn-head></cn-head>
		<view class="content-section">
			<view class="section">
				<view class="title">主页 /</view>
				<view class="content user-info">
					<view class="">
						<image :src="data.avatar_url" class="avatar"></image>
						<text class="link">{{data.loginname}}</text>
					</view>
					
					<text>{{data.score}}积分</text>
					<text v-if="collections.length > 0" class="link" @tap="toCollection(data.loginname)">{{collections.length}}个话题收藏</text>
					
					<text class="register">注册时间 {{data.create_time}}</text>
				</view>
			</view>
			
			<view class="section">
				<view class="title">最近创建的话题</view>
				<view class="content topic-list">
					<view v-for="value in data.recent_topics" class="topic-item" :key="value.id">
						<image :src="value.author.avatar_url" class="avatar" :title="value.author.loginname"></image>
						<text class="topic-title" @tap="toTopic(value.id)">{{value.title}}</text>
						<view class="last-reply">
							{{value.last_reply_time}}
						</view>
					</view>
					<!-- <text class="topic-item" v-else>
						无话题
					</text> -->
				</view>
			</view>
			
			<view class="section">
				<view class="title">最近参与的话题</view>
				<view class="content topic-list">
					<view v-for="value in data.recent_replies" class="topic-item" :key="value.id">
						<image :src="value.author.avatar_url" class="avatar" :title="value.author.loginname" @tap="toUser(value.author.loginname)"></image>
						<text class="topic-title" @tap="toTopic(value.id)">{{value.title}}</text>
						<view class="last-reply">
							{{value.last_reply_time}}
						</view>
					</view>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import cnHead from "../../components/header/cnHead.vue";

export default {
	
	onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
		console.log(option.user); //打印出上个页面传递的参数。
		var _that = this;

		this.requestPromise({
			url: "https://cnodejs.org/api/v1/user/" + option.user,
		}).then(Res => {
			var data = Res.data.data;
			data.create_time = _that.latestTimeFormat(data.create_at);
			console.dir(Res.data)
			
			for(var item of data.recent_topics) {
				item.last_reply_time = _that.latestTimeFormat(item.last_reply_at);
			}
			
			for(var item of data.recent_replies) {
				item.last_reply_time = _that.latestTimeFormat(item.last_reply_at);
			}
			_that.data = data;
				
		}).catch(err => {
			
			console.log("用户详情页，详情查询失败 ");  
		});
		
		this.requestPromise({
			url: "https://cnodejs.org/api/v1/topic_collect/" + option.user,
		}).then(Res => {
			_that.collections = Res.data.data;
				
		}).catch(err => {
			
			console.log("用户详情页，收藏主题查询失败 ");  
		});
	},
	data() {
		return {
			data: {},
			collections: [],
		}
	},
	components : {
		cnHead
	},
	
	methods: {
		toTopic: function(id) {
			uni.navigateTo({
				url: '../topic/topic?id=' + id
			});
		}, 
		
		toUser: function(user) {
			uni.navigateTo({
				url: '../profile/profile?user=' + user
			});
		},
		
		toCollection: function(user) {
			uni.navigateTo({
				url: '../collection/collection?user=' + user
			});
		}
	}
}
</script>

<style lang="scss">
	@import "../../common/common.scss";
	
	.content-section {
		flex-direction: column;
		
		.section {
			margin-top: 20upx;
			flex-direction: column;
			background-color: #fff;
			
			& > .title {
				padding: 16upx;
				background-color: #f6f6f6;
				border-bottom: 1upx solid #e5e5e5;
				color: #444;
				font-size: 30upx;
			}
			
			.user-info {
				padding: 20upx;
				//color: #ababab;
				font-size: 30upx;
				
				text {
					margin: 10upx 0;
				}
				
				.link {
					color: #778087;
				}
				
				.register {
					color: #ababab;
				}
			}
			
			.content {
				flex-direction: column;
			}
			
			.topic-list {
				.topic-item {
					padding: 20upx;
					border-bottom: 1upx solid #f0f0f0;
				}
				
				.topic-title {
					color: #08c;
					font-size: 32upx;
					
					&:hover {
						color: #005580;
					}
				}
				
				.last-reply {
					flex-grow: 1;
					justify-content: flex-end;
					flex-shrink: 0;
					color:#777;
					font-size: 30upx;
				}
			}
		}
	}
	
</style>
