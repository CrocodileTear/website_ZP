var baseURL = "http://203.195.246.58:7777";


//数组去重
function del_rep(zhiwei,fuli){
	Array.prototype.myInfo = function(){
		var newArray = [];
		for(var i=0;i<this.length;i++){
			if(this.indexOf(this[i] == -1)){
				newArray.push(this[i]);
			}
		}
		return newArray;
	}
	var result = zhiwei.myInfo();
	result.forEach(function(item){
		if(item!=null && item!=""){
			var newLi = $(`
				<div class="ffc">
                <img id="u197_img" class="ffimg" src="images/index/u197.png" >
                <ul class="ff" >                            
                    
                </ul>
                </div>
			`);
			$(fuli).append(newLi);
		}
	});
}

// 职位类型
function initJob(){
	var url = baseURL+"/Jobs/findAll";
	$("#job").empty();
	$("#job").append($(`<li><a href="#"   class="s">全部</a></li>`));
	$.get(url,function(result){
		if(result.status === 200){
			var arr = [];
			result.data.forEach(function(item){
				// console.log(item);
				arr.push(item.name);
			});
			// 数组去重
			var result = new Set(arr);
			// console.log(result);
			result.forEach(function(item){
				// 判断item不为空时追加
				if(item!=null && item!=""){
					$("#job").append(`
						<li id="nav1"><a>`+item+`</a>
							<div class="ffc">
		                        <img id="u197_img" class="ffimg" src="images/index/u197.png" >
		                        <ul class="ff" >                            
		                            
		                        </ul>
	                        </div>
						</li>
					`);
				}
			});
		}
	});
}
//地点
function initCity(){
	var url = baseURL+"/City/findAll";
	var city = [];
	$.get(url,function(result){
		$("#city").empty();
		$("#city").append(`<li><a href="#"   class="s">不限</a></li>`);
		if(result.status === 200){
			var arr = [];
			result.data.forEach(function(item){
				arr.push(item.name);
			});
			// 数组去重
			var result = new Set(arr);
			result.forEach(function(item){
				// 判断item不为空时追加
				if(item!=null && item!=""){
					$("#city").append(`
						<li id="nav1"><a>`+item+`</a>
							<div class="ffc">
		                        <img id="u197_img" class="ffimg" src="images/index/u197.png" >
		                        <ul class="ff" >                            
		                            
		                        </ul>
	                        </div>
						</li>
					`);
				}
			});
		}
	});
}
//福利
function initWelfare(){
	var url = baseURL+"/Welfare/findAll";
	var status = [];
	$.get(url,function(result){
		$("#welfare").empty();
		$("#welfare").append(`<li><a href="#"   class="s">不限</a></li>`);
		if(result.status === 200){
			var arr = [];
			result.data.forEach(function(item){
				arr.push(item.name);
			});
			// 数组去重
			var result = new Set(arr);
			result.forEach(function(item){
				if(item!=null && item!=""){
					$("#welfare").append(`
						<li id="nav1"><a>`+item+`</a>
							<div class="ffc">
		                        <img id="u197_img" class="ffimg" src="images/index/u197.png" >
		                        <ul class="ff" >                            
		                            
		                        </ul>
	                        </div>
						</li>
					`);
				}
			});
		}
	});
}

$(function(){
	//初始化职位类型
	initJob();
	//初始化城市
	initCity();
	//初始化福利
	initWelfare();
	//头部搜索职位按钮
	$("#sb").click(function(){
		// alert(1);
		var job = $(this).parents('.s_search').find('#ss').val();
		// alert(job);
		var url = baseURL+"/Employment/findByJob";
		var data = {job};
		$.get(url,data,function(result){
			//清空所有的查询项
			$('#con_menu').empty();  
			result.data.forEach(function(item){
				$("#con_menu").append(`
		            <div class="m">
		                <h4>`+item.title+`</h4>
		                <div class="m_1">`+item.salary+`</div>
		                <div class="w">
		                <div class="m_2 c1">`+item.welfare+`</div>
		                </div>
		                <div class="m_9">
		                    <p>工作时间：`+item.workingHours+`</p>
		                    <p>工作类型：`+item.job+`</p>
		                    <p>招聘人数：`+item.num+`</p>
		                    <p>工作地点：`+item.city+`</p>
		                </div>
		                <div class="m_3">一键报名</div>
		            </div>
           		`)
			});
		});
    });
    //职位索引（根据职位查找相关信息）
    var job = "";
    $("#job").on("click","li",function(){});

	//为职位类型绑定事件(鼠标点击时展示二级菜单)
	$("#job").on("click","li",function(){
		var staus = $(this).find("a:eq(0)").text();
		// alert(staus);
		var url = baseURL+"/Jobs/findByStatus";
		var data = {staus};
		// console.log(data);
		var li = $(this);
		var zhiwei = [];   //数组去重

		$.get(url,data,function(result){
			// console.log(result.data)
			li.find("ul").empty();
			result.data.forEach(function(item){
				console.log(item.name);
				if(result.status === 200){
					zhiwei.push(item.name);
					li.find("ul").append(`
						<li id="nav2">`+item.name+`</li>
					`);
				}
			});
		});
	});

	// 已选条件-职位
	$('#closeJob').click(function(){
        // 清空已选条件
        $(this).parents('#job_div').find('li').empty();
        // 将职位搜索的li置为初始样式
        $('#job li').removeClass('current');
        $('#job li:nth-child(1)').addClass('current');
        // 置空job,否则就算样式消除,条件仍然存在
        job = '';
        // 调用根据city查找招聘信息的接口
        if(title == ''){
            // 如果title为空，说明只有一个职位条件，在点击关闭的时候，调用加载所有的函数即可
            loadEmployment();
        }else{
            var url = baseURL+'/Employment/findByCity';
            var data = {
                title:title
            };
            $.get(url,data,function(result){
                $('#content').empty();
                result.data.forEach(function(item){
                    // 如果job不为空，说明第一次点击过了职位搜索
                    // 如果不加判断item.job == job 相当于直接根据当前地址查询了所有
                    $("#con_menu").append(`
			            <div class="m">
			                <h4>`+item.title+`</h4>
			                <div class="m_1">`+item.salary+`</div>
			                <div class="w">
			                <div class="m_2 c1">`+item.welfare+`</div>
			                </div>
			                <div class="m_9">
			                    <p>工作时间：`+item.workingHours+`</p>
			                    <p>工作类型：`+item.job+`</p>
			                    <p>招聘人数：`+item.num+`</p>
			                    <p>工作地点：`+item.city+`</p>
			                </div>
			                <div class="m_3">一键报名</div>
			            </div>
	           		`)
                })
            })
        }
    })

	//鼠标点击时选中的变色
	$(".hm_1_r > ul").on("click","li",function(){
        $(this).addClass('current');
        $(this).siblings().removeClass('current');
    });
		
		
})
