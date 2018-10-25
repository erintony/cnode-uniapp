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
					<text>发布于{{latestTimeFormat(data.last_reply_at)}}</text>
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
			评论区域
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
				_that.data = Res.data.data;
					
			}).catch(err => {
				
				console.log("topic详情查询请求失败");  
			});
		},
		data() {
			return {
				data: {}
			}
		},
		components : {
			cnHead
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
		margin-top: 30upx;
		background-color: #fff;
	}
</style>
