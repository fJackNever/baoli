$(function(){
	
	if(id > 0){
		$(".prodBottom em.prodBottomfq a").attr("href","javascript:signfq("+id+");");
		$.ajax({
			type: 'get',
			url: ''+ApiUrl+'Home/index/sign1.html?hid='+id + htmlVtimeb +'',
			data: '',
			dataType: 'json',
			success: function(data){
				if(data.error == 200){
					var house =  data.data.house;
					var project = data.data.project;
					var data = data.data.data;
					var imglist = "";
					var page = "";
					var htmlhade = '<em>'+house.ban+'</em>幢<em>'+house.unit+'</em>单元<em>'+house.room+'</em>室';
					$(".signcon h2 b").html(htmlhade);
					
					var qianlan = "";
					if(project.length>0){
						qianlan += '<p>';
						for(var q=0; q<project.length; q++){
							if(project[q].content != ""){
								qianlan += '<em><i>'+ project[q].title +'：</i>'+ project[q].content +'</em>';
							}
						}
						qianlan += '</p>';
					}
					
					//alert(qianlan)
					for(var i=0; i<data.length; i++){
						if(i==0){
							page += '<span class="hover">'+ parseInt(i+1) +'</span>';
							if(data[i].status == 1){
								$(".signcon .signdiv h5 em").hide();
							}
						}else{
							page += '<span>'+ parseInt(i+1) +'</span>';
						}
						
						if(data[i].status == 1){
							imglist += '<li data-id="'+data[i].id+'" data-status="'+data[i].status+'" ><img src="'+data[i].url+'" /></li>';
						}else{
							imglist += '<li class="hover" data-id="'+data[i].id+'" data-status="'+data[i].status+'" ><img src="'+data[i].url+'" />'+qianlan+'</li>';
						}
					}
	
	
					
					$(".signcon .signdiv .signdivlist ul").html(imglist);
					$(".signcon .signdiv .signdivpage p").html(page);
					
				}else{
					textprompt(""+data.msg+"","1");
				}
			},
			error:function(){
				textprompt("请求签约信息失败");
			}
		});
	}
	
	
	
	$('.signQiancon').jqSignature();
	$(document).on("click",".signQian .signQiancon .canvasre",function(){
		$('.signQian .signQiancon .canvasadd').hide();
		$('#signQiancon').jqSignature('clearCanvas');
	});
	$(document).on("click",".signQian .signQiancon .canvasadd",function(){
		//var dataUrl = $('#signQiancon').jqSignature('getDataURL').replace("data:image/png;base64,","");
		
		var dataUrl = encodeURIComponent($('#signQiancon').jqSignature('getDataURL'));
		//alert(dataUrl);
		
		/*var img = dataUrl.split(',')[1];
		img = window.atob(img);
		var ia = new Uint8Array(img.length);
		var index = $(".signcon .signdiv .signdivpage p span.hover").index();
		var aid = $('.signcon .signdiv .signdivlist li').eq(index).attr("data-id");
		for(var g=0; g<img.length; g++){
			ia[i] = img.charCodeAt(i);
		};
		var blob = new Blob([ia],{type:"image/png"});
		alert(aid)
		aid = new Blob([aid],{type:"text/plain"});
		var formdata=  new FormData();
		formdata.append("id",aid);
		formdata.append("img",blob);*/
		
		
		var index = $(".signcon .signdiv .signdivpage p span.hover").index();
		var id = $('.signcon .signdiv .signdivlist li').eq(index).attr("data-id");
		$.ajax({
			type: 'post',
			url: ''+ApiUrl+'Home/index/sign2.html',
			data: '?&id='+id+'&img='+dataUrl+'',
			//data: formdata,
			dataType: 'json',
			//contentType:false, //发送信息至服务器时内容编码类型
		    //processData:false, //禁止此自动转换
			success: function(data){
				if(data.error == 200){
					//textprompt(""+data.msg+"","1");
					var liImg = '<img src="'+ data.data[0] +'" />'
					$('.signcon .signdiv .signdivlist li').eq(index).html(liImg);
					$('.signcon .signdiv .signdivlist li').eq(index).attr({"data-status":"1"});
					$('.signcon .signdiv .signdivlist li').eq(index).removeClass("hover");
					$(".signcon .signdiv h5 em").hide();
					$(".signQian").fadeOut(300);
					//$("body").css({"height":"auto","overflow":"auto"});
				}else{
					textprompt(""+data.msg+"","1");
				}
			},
			error:function(){
				textprompt("请求签名img失败");
			}
		});
		
	});

	$('.signQiancon').on('jq.signature.changed', function() {
		$('.signQian .signQiancon .canvasadd').show();
	});

	$(document).on("click",".signQian",function(e) {
	    e = window.event || e; // 兼容IE7
	    obj = $(e.srcElement || e.target);
	    if (obj.closest(".signQiancon").length == 0) {
			$(".signQian").fadeOut(300);
			//$("body").css({"height":"auto","overflow":"auto"});
	    }
	});


	$(document).on("click",".signcon .signdiv h5 em",function(){
		$('#signQiancon').jqSignature('clearCanvas');
		var bodyheight = $(window).height();
		var bodydivtop = (parseInt(bodyheight - 398)) / 2
		//$("body").css({"height":""+bodyheight+"px","overflow":"hidden"});
		$(".signQian .signQiancon").css({"marginTop":""+bodydivtop+"px"});
		$(".signQian").fadeIn(300);
	});

/* slide */
$(document).on("click",".signcon .signdiv h6.prev",function(){
	var unit = $(".signcon .signdiv .signdivpage p span.hover").index() - 1;
	if(unit <  0){
		/*var indexbottom = $(".signcon .signdiv .signdivpage p span").length - 1;
		$(".signcon .signdiv .signdivpage p span:eq("+ indexbottom +")").addClass("hover").siblings().removeClass("hover");
		$(".signcon .signdiv .signdivlist li:eq("+ indexbottom +")").show().siblings().hide();
		signIco(indexbottom);*/
		console.log("不可循环。");
	}else{
		$(".signcon .signdiv .signdivpage p span:eq("+ unit +")").addClass("hover").siblings().removeClass("hover");
		$(".signcon .signdiv .signdivlist li:eq(0)").show().siblings().hide();
		signIco(unit);
	}
	
});

$(document).on("click",".signcon .signdiv h6.next",function(){
	console.log($(".signcon .signdiv .signdivpage p span.hover").index());
	var unit = $(".signcon .signdiv .signdivpage p span.hover").index() + 1;
	
	if(unit >=  $(".signcon .signdiv .signdivpage p span").length){
		/*$(".signcon .signdiv .signdivpage p span:eq(0)").addClass("hover").siblings().removeClass("hover");
		$(".signcon .signdiv .signdivlist li:eq(0)").show().siblings().hide();
		signIco(0);*/
		console.log("不可循环。");
	}else{
		$(".signcon .signdiv .signdivpage p span:eq("+ unit +")").addClass("hover").siblings().removeClass("hover");
		$(".signcon .signdiv .signdivlist li:eq("+ unit +")").show().siblings().hide();
		signIco(unit);
	}
});

$(document).on("click",".signcon .signdiv .signdivpage p span",function(){
	var index = $(this).index();
	$(this).addClass("hover").siblings().removeClass("hover");
	$(".signcon .signdiv .signdivlist li:eq("+ index +")").show().siblings().hide();
	signIco(index);
});

function signIco(index){
	var status = $(".signcon .signdiv .signdivlist li").eq(index).attr("data-status");
	if(status==1){
		$(".signcon .signdiv h5 em").hide();
	}else{
		$(".signcon .signdiv h5 em").show();
	}
}

$(document).on("click",".prodBottom em.prodBottomtj",function(){
	var stutas = 0;
	for(var l=0; l<$('.signcon .signdiv .signdivlist li').length; l++){
		var zt = $('.signcon .signdiv .signdivlist li').eq(l).attr("data-status");
		if(zt==2 || zt==3){
			stutas++;
		}
	}
	if(stutas > 0){
		textprompt("您还有文件未签约");
	}else{
		//alert("开始提交")
		
		$.ajax({
			type: 'post',
			url: ''+ApiUrl+'Home/index/sign3.html',
			data: '?&hid='+id+'',
			dataType: 'json',
			success: function(data){
				if(data.error == 200){
					//textprompt(""+data.msg+"","1");
					location.href = "print.html?id="+id+htmlVtimeb+"";
				}else{
					textprompt(""+data.msg+"","1");
				}
			},
			error:function(){
				textprompt("请求提交签名失败");
			}
		});
		
	}
	
});


});

function signfq(){
	$.ajax({
		type: 'get',
		url: ''+ApiUrl+'Home/index/oversign.html?&hid='+id+'',
		data: '',
		dataType: 'json',
		success: function(data){
			if(data.error == 200){
				textprompt("结束签约","1");
				//htmlback();
			}else{
				textprompt(""+data.msg+"","1");
			}
			location.href = "prod.html?id="+ id + htmlVtimeb +"";
		},
		error:function(){
			textprompt("请求取消签约失败");
		}
	});
	
}

