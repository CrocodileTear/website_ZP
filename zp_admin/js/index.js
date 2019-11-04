$(function(){
	//为导航添加事件
	$("#left_nav").on("click","li",function(){
		var index = $(this).index();   //当前点击的那个元素
		// console.log(index);
		if(index == 1){
			$("#index_con").load(".pages/business.html");
		}

		var url = $(this).attr("url");
		$("#right_wrapper").load(url);

		//模拟点击第一个li
		$("#left_nav > li:first-child").trigger("click");
	});
})