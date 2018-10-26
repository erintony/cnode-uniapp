<template>
	<view class="app-container">
		<cn-head></cn-head>
		<view class="content-section">
			<view class="title-section">
				<view class="title-info">
					<text class="topic-tag" :class="data.top ? 'top' : ''">
						{{data.top ? "置顶" : data.tab}}
					</text>
					<text>{{data.title}}</text>
				</view>
				<view class="sub-info">
					<text class="dot"></text>
					<text>发布于{{data.last_reply_time}}</text>
					<text class="dot"></text>
					<text>作者{{data.author ? data.author.loginname : ''}}</text>
					<text class="dot"></text>
					<text>{{data.visit_count}}次浏览</text>
					<text class="dot"></text>
					<text>来自 {{data.tab}}</text>
				</view>
			</view>
			<view class="topic-content">
				{{data.content}}
			</view>
		
		</view>
		
		<view class="comment-section">
			<view class="reply-count">
				{{replyCount}}回复
			</view>
			
			<view class="reply-list">
				<view v-for="(reply, index) in data.replies" class="reply-item" :key="reply.id" :class="reply.is_uped ? 'reply-hightlight' : ''">
					<view class="user">
						<image class="avatar" :src="reply.author.avatar_url"  :title="reply.author.loginname" mode=""></image>
					</view>
					
					<view class="reply-info">
						<view class="title-info">
							<text class="user-name">{{reply.author.loginname}}</text>
							<text>{{index + 1}}楼•{{reply.create_time}}</text>
							<view class="up-info">
								<image src="../../static/up.svg" mode=""></image>
								<text class="up-count">{{reply.ups.length}}</text>
							</view>
							
						</view>
						<view class="reply-content">
							{{reply.content}}
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
			console.log(option.id); //打印出上个页面传递的参数。
			var _that = this;
			this.requestPromise({
				url: "https://cnodejs.org/api/v1/topic/" + option.id,
			}).then(Res => {
				var data = Res.data.data;
				
				data.last_reply_time = _that.latestTimeFormat(data.last_reply_at);
				
				for (var reply of data.replies ) {
					reply.create_time = _that.latestTimeFormat(reply.create_at);
				}
				_that.data = data;
				_that.replyCount = data.replies.length;
					
			}).catch(err => {
				
				console.log("topic详情页，详情查询失败 ID：" + option.id);  
			});
		},
		data() {
			return {
				data: {},
				replyCount: 0
			}
		},
		components : {
			cnHead
		},
		
		methods: {
			
		}
		
	}
</script>

<style lang="scss">
	@import "../../common/common.scss";
	
	.content-section {
		//font-size: 32upx;
		flex-direction: column;
		align-items: flex-start;
		background-color: #fff;
		
		
		.title-section {
			flex-direction: column;
			align-items: flex-start;
			border-bottom: 1upx solid #e5e5e5;
			
			.title-info {
				padding-top: 16upx;
				font-size: 36upx;
				font-weight: 700;
			}
			
			.topic-tag {
				flex:0 0 auto;
				align-self:flex-start;
				margin-top: 10upx;

			}
			
			.sub-info {
				padding: 12upx 10upx;
				font-size: 30upx;
				color: #838383;
				
				.dot {
					margin: 22upx 8upx 22upx 16upx;
					width: 6upx;
					height: 6upx;
					border-radius: 100%;
					background-color: #838383;
				}
			}
		}
	
		.topic-content {
			padding: 32upx;
		}
	}

	.comment-section {
		flex-direction: column;
		margin-top: 30upx;
		background-color: #fff;
		
		image {
			margin-right: 10upx;
			border-radius: 6upx;
			
		}
		
		.avatar {
			width: 60upx;
			height: 60upx;
		}
		
		.reply-count {
			padding: 20upx;
			background-color: #f6f6f6;
		}
		
		.reply-list {
			flex-direction: column;
			
			.reply-item {
				padding: 30upx;
				border-bottom: 1upx solid #f0f0f0;
			}
			
			.reply-hightlight {
				background-color: #f4fcf0;
			}
			
			.reply-info {
				flex-direction: column;
				
				text {
					margin-left: 20upx;
				}
			}
			
			.title-info {
				font-size: 32upx;
				
				.user-name {
					color: #666;
					
					&:hover {
						color: #385f8a;
					}
				}
			}
			
			
			.up-info {
				flex-grow: 1;
				justify-content: flex-end;
				color: #808080;
				
				image {
					width: 50upx;
					height: 50upx;
				}
				
			}
		}
	
		.reply-content {
			padding: 20upx 40upx;
		}
	}
</style>
