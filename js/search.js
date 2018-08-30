$(function(){

//var json = [{"title":"1111","desc":"这是一个简单的描述","item":"1","id":"1"},{"title":"222222","desc":"这是一个简单的描述","item":"1","id":"2"},{"title":"333333","desc":"这是一个简单的描述","item":"0","id":"3"},{"title":"44444","desc":"这是一个简单的描述","item":"1","id":"4"}];

sessionStorage.removeItem('indexBid');


	    $("#statName").autocomplete({
	        source: function (request, response) {
	        	var textType = $("#statName").val();
	        	//textType = escape(escape(textType));
	        	
				$.ajax({
					type:"get",
					url:""+ApiUrl+"Home/Index/search?name="+textType+"",
					data:"",
					dataType:"json",
					//beforeSend: function(request){ ajaxtoken(request); },
					success: function(data){
						if(data.error == 200){
							//alert(data.data[0].images);
							var html = "";
							var data = data.data;
							for(var i=0; i<data.length; i++){
								html += '<li><a href="javascript:indexpid('+ data[i].id +')"><i><img src="'+ data[i].images +'"/></i><b>'+ data[i].name +'</b><p>'+ data[i].traffic +'</p></a></li>';
							}
							$(".logincon .fangsousouCon .fangsousouDivb ul").html(html);
							$(".logincon .fangsousouCon .fangsousouDivb").slideDown();
						}else{
							textprompt(""+data.msg+"");
						}
					},
					error: function(){
						textprompt("获取搜索页幻灯片列表出错");
					}
				});
				
	        },
	        delay: 500
	    });

	
	$.ajax({
		type:"get",
		url:""+ApiUrl+"Home/index/hot_project?rid=1",
		data:"",
		dataType:"json",
		//beforeSend: function(request){ ajaxtoken(request); },
		success: function(data){
			if(data.error == 200){
				var html = "";
				var data = data.data;
				var i=0;
				for(i; i<data.length; i++){
					html += '<div class="swiper-slide"><a href="javascript:indexpid('+ data[i].id +')"><img src="'+ data[i].images +'"></a></div>';
				}
				$(".fangsousouCona .fangsousouConalist .swiper-wrapper").html(html);
				
				if(parseInt(i) > 3){
					new Swiper('#fangsousouConalist',{ nextButton:'.fangsousouCona .swiper-button-next', prevButton:'.fangsousouCona .swiper-button-prev', slidesPerView:3, loop:true, spaceBetween:0 });
				}		
			}else{
				textprompt(""+data.msg+"","1");
			}
		},
		error: function(){
			textprompt("获取搜索页幻灯片列表出错");
		}
	});
	

	$(document).on("click",".fangsousouOut",function(){
		enduser();
	});



/* 地址  */
	    $(".resslistcon .resslistdiv input").autocomplete({
	        source: function (request, response) {
	        	var textType = $(".resslistcon .resslistdiv input").val();
	        	//textType = escape(escape(textType));
	        	if(textType != ""){
					$.ajax({
						type:"get",
						url:""+ApiUrl+"Home/Index/city?key="+textType+"",
						data:"",
						dataType:"json",
						//beforeSend: function(request){ ajaxtoken(request); },
						success: function(data){
							if(data.error == 200){
				var html = "";
				var data = data.data;
				html += '<dt>其它城市</dt>';
				if(data.length > 0){
					for(var i=0; i<data.length; i++){
						html += '<dd data-id="'+ data[i].id +'" data-cid="'+ data[i].cid +'">'+ data[i].name +'</dd>';
					}
				}else{
					html += '';
				}
				$(".resslistcon .resslistdiv dl").html(html);
							}else{
								textprompt(""+data.msg+"");
							}
						},
						error: function(){
							textprompt("获取搜索页幻灯片列表出错");
						}
					});
	        	}else{
	$.ajax({
		type:"get",
		url:""+ApiUrl+"Home/index/city.html",
		data:"",
		dataType:"json",
		//beforeSend: function(request){ ajaxtoken(request); },
		success: function(data){
			if(data.error == 200){
				var html = "";
				var data = data.data;
				html += '<dt>其它城市</dt>';
				if(data.length > 0){
					for(var i=0; i<data.length; i++){
						html += '<dd data-id="'+ data[i].id +'" data-cid="'+ data[i].cid +'">'+ data[i].name +'</dd>';
					}
				}else{
					html += '';
				}
				$(".resslistcon .resslistdiv dl").html(html);
			}else{
				textprompt(""+data.msg+"");
			}
		},
		error: function(){
			textprompt("获取城市地址列表");
		}
	});
	
	        	}

				
	        },
	        delay: 500
	    });
	    
$(document).on("click",".fangsousouRess",function(){
	var texth2 = $(this).html(); 
	var bodyheight = $(window).height();
	var bodydivheight = parseInt(bodyheight * 0.8);
	var bodydivtop = (bodyheight - bodydivheight) / 2;
	var divheight = bodydivheight - 110;
	$(".resslistcon .resslistdiv h2").html(texth2);
	//$("body").css({"height":""+bodyheight+"px","overflow":"hidden"});
	$(".resslistcon .resslistdiv").css({"height":""+bodydivheight+"px","marginTop":""+bodydivtop+"px"});
	$(".resslistcon .resslistdiv dl").css({"height":""+divheight+"px"});
	
	$.ajax({
		type:"get",
		url:""+ApiUrl+"Home/index/city.html",
		data:"",
		dataType:"json",
		//beforeSend: function(request){ ajaxtoken(request); },
		success: function(data){
			if(data.error == 200){
				var html = "";
				var data = data.data;
				html += '<dt>其它城市</dt>';
				if(data.length > 0){
					for(var i=0; i<data.length; i++){
						html += '<dd data-id="'+ data[i].id +'" data-cid="'+ data[i].cid +'">'+ data[i].name +'</dd>';
					}
				}else{
					html += '';
				}
				$(".resslistcon .resslistdiv dl").html(html);
			}else{
				textprompt(""+data.msg+"","1");
			}
		},
		error: function(){
			textprompt("获取城市地址列表");
		}
	});
	
	$(".resslistcon").fadeIn(300);
});

$(document).on("click",".resslistcon",function(e) {
    e = window.event || e; // 兼容IE7
    obj = $(e.srcElement || e.target);
    if (obj.closest(".resslistdiv").length == 0) {
		$(".resslistcon").fadeOut(300);
		//$("body").css({"height":"auto","overflow":"auto"});
    }
});

$(document).on("click",".resslistcon .resslistdiv dl dd",function() {
	var name = $(this).html();
	$(".fangsousouRess").html(name);
	$(".resslistcon").fadeOut(300);
	//$("body").css({"height":"auto","overflow":"auto"});
});


});


function indexpid(id){
	sessionStorage.setItem('userPid',''+id+'');
	location.href = "index.html"+htmlVtimea+"";
}
