function getpage(cpage,sum_page){
  var list="";//数字列表
  var num=2;//列表前后有几个数字
  var num_page=cpage;//当前页码
  var new_num;//动态页面
  // 当前数字之前
  for(i=num;i>=1;i--){
    // 从大向小走，刚开始最大每次减一
    new_num=num_page-i;
    if(new_num>=1){
      list+="<li  class='btn-group'><a href='#' onclick='getData("+new_num+")'>"+new_num +"</a></li>"
    }
  }
  // 当前数字
  list+="<li>"+cpage+"</li>";
  //当前数字之后
  for(i=1;i<=num;i++){
    new_num=num_page+i
    if(new_num<=sum_page){
      list+="<li  class='btn-group'><a href='#' onclick='getData("+new_num+")'>"+new_num +"</a></li>";

    }
    else{
      break;
    }
  }
  $(".ym ul").empty();
  $(".ym ul").append(list);
}
function getData(page){
  var baseURL="http://203.195.246.58:7777";
  var url=baseURL+"/Employment/findAll";
  $.get(url,function(result) {
    var data=result.data;
    console.log(data);
    var total=data.length;//总个数
    var nums=5;//一页显示多少条记录
    var sum_page;//总页数
    // var cpage=1;//当前在多少页
     // 计算总页码
    if(total%nums==0){
      sum_page=parseInt(total/nums);
    }else{
      sum_page=parseInt(total/nums+1)
    }
    var newdata=[];//新数据
    var cpage=page;//改变当前页面
    var i=(cpage-1)*nums;
    for(j=0;j<=4;j++){//循环5次调用数据
      if (data[i+j]==undefined) {
        break;
      }
      newdata[j]=data[i+j];
    }
    // 展示数据
    if(result.status===200){
      $("#con_menu").empty();
      // result.data.forEach(function(item){
      newdata.forEach(function(item){
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
      getpage(cpage,sum_page);
    }
  })
}

getData(1);

