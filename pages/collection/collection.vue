<template>
	<view class="app-container">
		<cn-head></cn-head>
		
		<view class="content-section">
			<view class="section">
				<view class="title">主页 / {{user}} 收藏的话题</view>
				<topic-list :data="data"></topic-list>
			</view>
		
		</view>
	</view>
</template>

<script>
import cnHead from "../../components/header/cnHead.vue";
import topicList from '../../components/topic-list/topic-list.vue';

export default {
	
	onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
		var _that = this;
		_that.user = option.user;

		this.requestPromise({
			url: "https://cnodejs.org/api/v1/topic_collect/" + option.user,
		}).then(Res => {
			_that.data = Res.data.data;
			
			_that.data.forEach(function(item,index) {
				item.last_reply_at = _that.latestTimeFormat(item.last_reply_at);
			});
				
		}).catch(err => {
			
			console.log("用户收藏页，收藏主题查询失败 ");  
		});
		
		
	},
	data() {
		return {
			data: [],
			user: ''
		}
	},
	components : {
		cnHead,
		topicList
	},
	
	methods: {
		
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
			
			.content {
				flex-direction: column;
			}
			
		
		}
	}
	
</style>
