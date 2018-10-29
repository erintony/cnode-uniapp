<template>
	<view class="topic-list">
		<view v-for="(value, key) in data" :key='key' class="topic">
			<image class="avatar" :src="value.author.avatar_url" :title="value.author.loginname" @tap='toUser(value.author.loginname)'></image>
			<text class="reply-count">{{value.reply_count}}</text>
			<text>/</text>
			<text class="visit-count">{{value.visit_count}}</text>
			<text class="topic-tag" :class="value.top ? 'top' : ''">{{value.top ? '置顶' : value.tab}}</text>
			
			<text class="title" @tap='toTopic(value.id)'>{{value.title}}</text>
			
			<view class="latest-info">
				<image :src="value.last_reply_user ? value.last_reply_user.avatar_url : value.author.avatar_url" :title="value.last_reply_user ? value.last_reply_user.loginname : value.author.loginname" class="user_small_avatar"></image>
				<text class="last_active_time">{{value.last_reply_at}}</text>
			</view>
		
		</view>
		
	</view>
</template>

<script>
	export default {
		props:{
			data: Array
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
		}
	}
</script>

<style lang="scss">
	.topic-list {
		width: 100%;
		flex-flow: column nowrap;
		font-size: 36upx;
		
		.topic {
			padding: 20upx;
			background: #fff;
			border-bottom: 1upx solid #f0f0f0;
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
			
			.latest-info {
				flex-grow: 1;//这三个元素只有它在有空余空间时可伸缩，也就是它占据了所有剩余空间
				justify-content: flex-end;
				color: #778087;
				font-size: 32upx;
			}
		}
		
		.title {
			font-size: 32upx;
			color: #8f8f94;
		}
	}
</style>
