
exports.install = function (Vue, options) {
   Vue.prototype.latestTimeFormat = function(time) {
		var differ = new Date(new Date() - new Date(time));
		
		
		var result = differ.getFullYear() - 1970;
		if (result) {
			return result + "年前";
		}
		
		result = differ.getMonth();
		
		if (result) {
			return result + "月前";
		}
		
		result = differ.getDate() - 1;
		if (result) {
			return result + "天前";
		}
		
		result = differ.getHours() - 8;
		if (result) {
			return result + "小时前";
		}
		
		result = differ.getMinutes();
		if (result) {
			return result + "分钟前";
		}
		
		result = differ.getSeconds();
		if (result) {
			return result + "秒前";
		}
	};
	
	Vue.prototype.requestPromise = param => {
		return new Promise((resovle, reject) => {
			uni.request({
				url: param.url, 
				data: param.data || {},
				header: param.header || {},
				success: (res) => {
						resovle(res);
				},
				fail: (err) => {
						reject(err);
				}
			})
		})
	}
};