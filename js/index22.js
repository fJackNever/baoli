var ztgkswiper = new Swiper('#indexgkdivcon',{ pagination:'#indexgkdivcon .paginationhd', paginationClickable:true });
var ztsyswiper = new Swiper('#indexsydivcon',{ pagination:'#indexsydivcon .paginationhd', paginationClickable:true });

$(function(){
var indexImgsize = new Swiper('#indexImgsizecon',{zoom:true, /*observer:true,*/ pagination:'.indexImgsizediv .paginationhd'});
var indexImgsize2 = new Swiper('#indexImgsizecon2',{zoom:true, /*observer:true,*/ pagination:'.indexImgsizediv2 .paginationhd'});


var username = sessionStorage.getItem('userName');
if(username !== null || typeof(username) != "undefined" || username != "" || username != 0){

	var ajaxtimea = "&v="+new Date().getTime()+"";
	$.ajax({
		type:"get",
		url:""+ApiUrl+"Home/index/survey.html?"+ userpid + ajaxtimea +"",
		data:"",
		dataType:"json",
		//beforeSend: function(request){ ajaxtoken(request); },
		success: function(data){
			if(data.error == 200){
				var data = data.data;
				//console.log(data);
							
				$(".pro_name").html(data.jcxx.title);
				$(".fangsousouOuta").html(username);
				$(".userSignCon .userSignDiv .userSigntop b").html(username);
	
	
			}else{
				textprompt(""+data.msg+"","1");
			}
		},
		error: function(){
			textprompt("获取信息出错");
		}
	});



}

var ztgkimgurlcon = "";
var ztsyimgurlcon = "";
var slideindex = 0;


switch(xmPid)
{
	case 1:
		$(".indexrotatein").addClass("projectA");
		$(".indexcon h5").addClass("projectA");
	break;
	case 4:
		$(".indexrotatein").addClass("projectB");
		$(".indexcon h5").addClass("projectB");
	break;
	case 5:
		$(".indexrotatein").addClass("projectC");
		$(".indexcon h5").addClass("projectC");
	break;
	case 6:
		$(".indexrotatein").addClass("projectD");
		$(".indexcon h5").addClass("projectD");
	break;
	case 7:
		$(".indexrotatein").addClass("projectE");
		$(".indexcon h5").addClass("projectE");
	break;
	case 8:
		$(".indexrotatein").addClass("projectF");
		$(".indexcon h5").addClass("projectF");
	break;
	case 9:
		$(".indexrotatein").addClass("projectG");
		$(".indexcon h5").addClass("projectG");
		break;
	case 10:
		$(".indexrotatein").addClass("projectH");
		$(".indexcon h5").addClass("projectH");
		break;
	default:
		$(".indexrotatein").addClass("projectA");
		$(".indexcon h5").addClass("projectA");
}


	$.ajax({
		type:"get",
		url:""+ApiUrl+"Home/Index/main.html?"+ userpid + htmlVtimeb +"",
		data:"",
		dataType:"json",
		//beforeSend: function(request){ ajaxtoken(request); },
		success: function(data){
			if(data.error == 200){
				var html = "";
				
				var bg_url = data.data.data2.url;
				var data3 = data.data.data1;
				var data = data.data.data2.data;

				//console.log(data3);
				
				for(var i=0; i<data.length; i++){
					
					html += '<em building_name="'+data[i].building+'" class="';
					
					if(data[i].status == 1){
						html += "statusa"
					}
					if(data[i].status == 2){
						html += "statusb"
					}
					if(data[i].status == 0){
						html += "statusc"
					}
					html += '" style="left:'+ (parseInt(data[i].xz) - 23) +'px;top:'+ (parseInt(data[i].yz) - 87) +'px;">'+data[i].building+'</em>';
				}

				$(".indexrotatein").css("background","url("+bg_url+") center -45px no-repeat");
				$(".indexcon h5").html(html);

				for(var k=0; k<data3.length; k++){
					$(".indexcon h5 em:eq("+k+")").attr("data-banid",data3[k].ban);
				}

				
				
				/*旋转转盘
				$(".indexcon h5").addClass("rotateIn");
				$(".indexrotatein").addClass("rotateIn");*/
				
				/*var indexBid = sessionStorage.getItem('indexBid');*/
				
				if(id > 0){
					var bodyheight = $(window).height();
					var listdivheight = parseInt(bodyheight * 0.8);
					var listdivtop = (bodyheight - listdivheight) / 2;
					var listdivconheight = listdivheight - 110;
					var listh6top = (listdivheight - 42) / 2;
					
					//$("body").css({"height":""+bodyheight+"px","overflow":"hidden"});
					$(".indexsingle .indexsinglediv").attr("data-banid",""+id+"");
					$(".indexsingle .indexsinglediv").css({"marginTop":""+listdivtop+"px","height":""+listdivheight+"px"});
					$(".indexsingle .indexsinglediv .indexsinglecon").css("height",""+listdivheight+"px");
					$(".indexsingle .indexsinglediv .indexsinglecon .indexsinglelist").css("height",""+listdivconheight+"px");
					$(".indexsingle .indexsinglediv h6").css("marginTop",""+listh6top+"px");
					
					$(".indexsingle .indexsinglediv .indexsinglecon .indexsingletop b:eq(0)").html(id+"幢");
					listcon(id,"");
				}
			}else{
				textprompt(""+data.msg+"","1");
			}
		},
		error: function(){
			textprompt("获取首页列表出错");
		}
	});

	

	$(document).on("click",".indexcon h5 em",function(){
		var bodyheight = $(window).height();
		var bodywidth = $(window).width();
		var listdivheight = parseInt(bodyheight * 0.8);
		var listdivtop = (bodyheight - listdivheight) / 2;
		var listdivconheight = listdivheight - 110;
		var listh6top = (listdivheight - 42) / 2;
		var banid = $(this).attr("data-banid");
		var building_name = $(this).attr('building_name');
		
		//$("body").css({"height":""+bodyheight+"px","overflow":"hidden"});
		$(".indexsingle .indexsinglediv").attr("data-banid",""+banid+"");
		$(".indexsingle .indexsinglediv").css({"marginTop":""+listdivtop+"px","height":""+listdivheight+"px"});
		$(".indexsingle .indexsinglediv .indexsinglecon").css("height",""+listdivheight+"px");
		$(".indexsingle .indexsinglediv .indexsinglecon .indexsinglelist").css("height",""+listdivconheight+"px");
		$(".indexsingle .indexsinglediv h6").css("marginTop",""+listh6top+"px");
		
		$(".indexsingle .indexsinglediv .indexsinglecon .indexsingletop b:eq(0)").html(building_name);
		//sessionStorage.setItem("indexBid", ""+banid+"");
		listcon(banid,"");
	});
	


	
	$(document).on("click",".indexsingle .indexsinglediv .indexsinglecon .indexsingletop h4 i",function(){
		var banid = $(".indexsingle .indexsinglediv").attr("data-banid");
		var unit = $(this).attr("data-unit");
		$(this).addClass("hover").siblings().removeClass("hover");
		listcon(banid,unit);
	});

	$(document).on("click",".indexsingle .indexsinglediv h6.prev",function(){
		var banid = $(".indexsingle .indexsinglediv").attr("data-banid");
		var unit = $(".indexsingle .indexsinglediv .indexsinglecon .indexsingletop h4 i.hover").index() - 1;
		//$(this).addClass("hover").siblings().removeClass("hover");
		if(unit <  0){
			/*var indexbottom = $(".indexsingle .indexsinglediv .indexsinglecon .indexsingletop h4 i").length - 1;
			$(".indexsingle .indexsinglediv .indexsinglecon .indexsingletop h4 i:eq("+ indexbottom +")").addClass("hover").siblings().removeClass("hover");
			unit = $(".indexsingle .indexsinglediv .indexsinglecon .indexsingletop h4 i:eq("+ indexbottom +")").attr("data-unit");*/
			console.log("不能循环啦！");
		}else{
			$(".indexsingle .indexsinglediv .indexsinglecon .indexsingletop h4 i:eq("+ unit +")").addClass("hover").siblings().removeClass("hover");
			unit = $(".indexsingle .indexsinglediv .indexsinglecon .indexsingletop h4 i:eq("+ unit +")").attr("data-unit");
			listcon(banid,unit);
		}
		//alert(unit)
		
	});
	
	$(document).on("click",".indexsingle .indexsinglediv h6.next",function(){
		var banid = $(".indexsingle .indexsinglediv").attr("data-banid");
		var unit = $(".indexsingle .indexsinglediv .indexsinglecon .indexsingletop h4 i.hover").index() + 1;
		//$(this).addClass("hover").siblings().removeClass("hover");
		if(unit >=  $(".indexsingle .indexsinglediv .indexsinglecon .indexsingletop h4 i").length){
			/*$(".indexsingle .indexsinglediv .indexsinglecon .indexsingletop h4 i:eq(0)").addClass("hover").siblings().removeClass("hover");
			unit = "";*/
			console.log("不能循环啦！");
		}else{
			$(".indexsingle .indexsinglediv .indexsinglecon .indexsingletop h4 i:eq("+ unit +")").addClass("hover").siblings().removeClass("hover");
			unit = $(".indexsingle .indexsinglediv .indexsinglecon .indexsingletop h4 i:eq("+ unit +")").attr("data-unit");
			listcon(banid,unit);
		}
		//alert(banid+","+unit)
		
	});
	
	
	function listcon(banid,unit){
		var paging = 0;
		if(unit > 0){
			paging = 1;
			unit = "&unit="+unit+"";
		}else{
			unit = "";
		}
		
		var ajaxtimea = "&v="+new Date().getTime()+"";
		
		$.ajax({
			type:"get",
			url:""+ApiUrl+"Home/Index/unit.html?&ban="+ banid + userpid + unit + ajaxtimea +"",
			data:"",
			dataType:"json",
			async: false,
			//beforeSend: function(request){ ajaxtoken(request); },
			success: function(data){
				if(data.error == 200){
					var paginglist = "";
					var html = "";
					var data = data.data;
					
					//console.log(data);
					var bodywidth = $(window).width();
					var num = data.num - 2;
					var divWidth = num * 144;
					var divMargin = num * 15;
					var indexsingleconMargin = 90 - divMargin;
					var indexsingleconWidth = 360 + divWidth;
					var indexsingledivWidth = indexsingleconWidth + indexsingleconMargin + indexsingleconMargin + 84;
					//console.log(indexsingleconMargin +","+ indexsingleconWidth +","+ indexsingledivWidth);
					
					
					if(indexsingledivWidth > bodywidth){
						$(".indexsingle .indexsinglediv .indexsinglecon .indexsinglelist ul").css({"width":""+ data.num * 144 +"px"});
						$(".indexsingle .indexsinglediv .indexsinglecon").css({"width":""+ bodywidth - 84 +"px","margin":"0 auto"});
						$(".indexsingle .indexsinglediv").css("width",""+ bodywidth+"px");	
					}else{
						$(".indexsingle .indexsinglediv .indexsinglecon .indexsinglelist ul").css({"width":"auto"});
						$(".indexsingle .indexsinglediv .indexsinglecon").css({"width":""+indexsingleconWidth+"px","margin":"0 "+indexsingleconMargin+"px"});
						$(".indexsingle .indexsinglediv").css("width",""+indexsingledivWidth+"px");			
					}

					
					if(paging == 0 && data.unit.length > 0){
						for(var l=0; l<data.unit.length; l++){
							if(l==0){
								paginglist += '<i class="hover" data-unit="'+ data.unit[l].unit +'">'+ data.unit[l].unit +'</i>';
							}else{
								paginglist += '<i data-unit="'+ data.unit[l].unit +'">'+ data.unit[l].unit +'</i>';
							}
						}
						$(".indexsingle .indexsinglediv .indexsinglecon .indexsingletop h4").html(paginglist);
					}
					
					if(data.data.length > 0){
						console.log(data.data);
						for(var u=0; u<data.data.length; u++){
							for(var i=0; i<data.data[u].length; i++){
								if(data.data[u][i].unit > 0){
									html += '<li data-id="'+data.data[u][i].id+'" ';
									switch(parseInt(data.data[u][i].status)){
										case 1: //已签
											html += ' class="statusa"><b class="itema">';
										break;
										
										case 2: //已定
											html += ' class="statusa"><b class="itemb">';
										break;
										
										case 3: //未售
											html += ' class="statusb"><b class="itemc">';
										break;
										
										default:
											html += ' class="statusc"><b class="itema">';
									}
									
									html += ''+data.data[u][i].unit+'单元'+data.data[u][i].room+'室</b><p>*面积：'+data.data[u][i].area+' m²</p><p>*房型：'+data.data[u][i].type+'</p></li>';
									
								}else{
									html += '<li class="statusa"></li>';
								}
							}
						}
						$(".indexsingle .indexsinglediv .indexsinglecon .indexsinglelist ul").html(html);
					}
					
				}else{
					textprompt(""+data.msg+"","1");
				}
			},
			error: function(){
				textprompt("获取此幢此单元无信息");
			}
		});
		$(".indexsingle").fadeIn(300);
		
	}
	
	
	$(document).on("click",".indexsingle .indexsinglediv .indexsinglecon .indexsinglelist li",function(){
		var id = $(this).attr("data-id");
		var liStatus = $(this).attr("class");
		location.href = "prod.html?&id="+ id + htmlVtimeb +"&signStatus="+liStatus;
	});

	
	$(document).on("click",".indexsingle",function(e) {
	    e = window.event || e; // 兼容IE7
	    obj = $(e.srcElement || e.target);
	    if (obj.closest(".indexsinglediv").length == 0) {
			$(".indexsingle").fadeOut(300);
			//$("body").css({"height":"auto","overflow":"auto"});
			//sessionStorage.removeItem('indexBid');
	    }
	});
	
/* qrcode */
$(document).on("click",".indexcon h6",function(){
	var bodyheight = $(window).height();
	var listdivtop = parseInt(bodyheight - 330) / 2;
	//$("body").css({"height":""+bodyheight+"px","overflow":"hidden"});
	$(".qrcodecon .qrcodediv").css({"marginTop":""+listdivtop+"px"});
	$(".qrcodecon").fadeIn(300);
});

$(document).on("click",".qrcodecon",function(e) {
    e = window.event || e; // 兼容IE7
    obj = $(e.srcElement || e.target);
    if (obj.closest(".qrcodediv").length == 0) {
		$(".qrcodecon").fadeOut(300);
		//$("body").css({"height":"auto","overflow":"auto"});
    }
});


/* survey 概况 */
$(document).on("click",".surveycon",function(e) {
    e = window.event || e; // 兼容IE7
    obj = $(e.srcElement || e.target);
    if (obj.closest(".surveydiv").length == 0) {
		$(".surveycon").fadeOut(300);
		$(".indexcon h2.indexztgk").hide();
		//$("body").css({"height":"auto","overflow":"auto"});
    }
});

function browserRedirect() {
      var sUserAgent = navigator.userAgent.toLowerCase();
      var shebei;
      var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
      if (bIsIpad) {
      	shebei = "ipad"
        return shebei;
      } else {
      	shebei = "pc"
        return shebei;
      }
    }
 
var sb_data = browserRedirect();

console.log(sb_data);

$(document).on("click",".surveycon .surveydiv .surveynav ul li b",function(){
	var index = $(this).parent().index();
	var indexid = $(this).attr("data-index");
	if($(".surveycon .surveydiv .surveynav ul li").eq(index).hasClass("hover") != true){
		$(".surveycon .surveydiv .surveynav ul li p").slideUp();
		$(".surveycon .surveydiv .surveynav ul li").eq(index).find("p").slideDown();
	}else{
		$(".surveycon .surveydiv .surveynav ul li").eq(index).find("p").slideToggle();
	}
	$(".surveycon .surveydiv .surveynav ul li").eq(index).addClass("hover").siblings().removeClass("hover");
	$(".surveycon .surveydiv .surveynav ul li").eq(index - 1).addClass("hoverborder").siblings().removeClass("hoverborder");
	//$(".surveycon .surveydiv .surveylist ul li").eq(indexid).show().siblings().hide();
	if(index == 0){
		$(".surveycon .surveydiv .surveylist ul").show();
		$(".surveycon .surveydiv .surveylist .indexgkdiv").hide();
	}else{
		ztgkslide(indexid,sb_data);
	}
	
	
});

$(document).on("click",".surveycon .surveydiv .surveynav ul li p em",function(){
	$(this).addClass("active").siblings().removeClass("active");
	var indexid = $(this).attr("data-index");
	//$(".surveycon .surveydiv .surveylist ul li").eq(indexid).show().siblings().hide();
	ztgkslide(indexid,sb_data);
});

	/*$(document).on("click",".surveycon .surveydiv .surveylist .indexgkdiv .indexgkdivcon .swiper-slide",function(){
		var img = $(this).find("img").attr("src");
		$(".prodImgpre .prodImgprecon img").attr("src",""+img+"");
		var bodyheight = $(window).height();
		var bodydivheight = parseInt(bodyheight * 0.8);
		var bodydivtop = (bodyheight - bodydivheight) / 2;
		$("body").css({"height":""+bodyheight+"px","overflow":"hidden"});
		$(".prodImgpre .prodImgprecon").css({"height":""+bodydivheight+"px","marginTop":""+bodydivtop+"px"});
		$(".prodImgpre").fadeIn(300);
	});

	$(document).on("click",".prodImgpre",function(e) {
	    e = window.event || e; // 兼容IE7
	    obj = $(e.srcElement || e.target);
	    if (obj.closest(".prodImgprecon").length == 0) {
			$(".prodImgpre").fadeOut(300);
			$("body").css({"height":"auto","overflow":"auto"});
	    }
	    
	});*/
	
	var bodyheight = $(window).height();
	//$("body").css({"height":""+bodyheight+"px","overflow":"hidden"});
	var divheight = parseInt(bodyheight - 24);
	$(".indexImgsize .indexImgsizediv").css({"height":""+ divheight +"px"});
	$(".indexImgsize .indexImgsizediv .indexImgsizecon").css({"height":""+ divheight +"px"});
	//$(".indexImgsize .indexImgsizediv .indexImgsizecon .swiper-slide").css({"height":""+ divheight +"px"});



if(sb_data == "pc"){
	$(document).on("click",".surveycon .surveydiv .surveylist .indexgkdiv .indexgkdivcon .swiper-slide",function(){
		var indexid = $(this).index();
		
		var indexlen = $(".surveycon .surveydiv .surveylist .indexgkdiv .indexgkdivcon .swiper-slide").length;
		if(indexlen > 0){
			var html = "";

			
			//alert(indexlen)
			for(var z=0; z<indexlen; z++){
				var imgUrl = $(".surveycon .surveydiv .surveylist .indexgkdiv .indexgkdivcon .swiper-slide").eq(z).find("img").attr("src");
				html += '<div class="swiper-slide"><div class="swiper-zoom-container"><img src="'+ imgUrl +'"></div></div>';
			}
			$(".indexImgsize .indexImgsizediv .indexImgsizecon .swiper-wrapper").html(html);
			
			/*indexImgsize.removeAllSlides();
			var htmlarr = [];
			for(var z=0; z<indexlen; z++){
				var imgUrl = $(".surveycon .surveydiv .surveylist .indexgkdiv .indexgkdivcon .swiper-slide").eq(z).find("img").attr("src");
				htmlarr.push('<div class="swiper-slide"><div class="swiper-zoom-container"><img src="'+ imgUrl +'"></div></div>');
			}
			indexImgsize.appendSlide(htmlarr);*/
			
			$(".indexImgsize").fadeIn(300);
			indexImgsize.init();
			indexImgsize.slideTo(indexid, 0, false);//切换到第一个slide，速度为1秒
			

			if(indexlen > 1){
				$(".indexImgsize .indexImgsizediv .paginationhd").show();
			}else{
				$(".indexImgsize .indexImgsizediv .paginationhd").hide();
			}
			
		}
	});
}

	

$(document).on("click",".indexImgsize .indexImgsizediv .indexImgsizehide",function(){
	$(".indexImgsize").fadeOut();
	//$("body").css({"height":"auto","overflow":"auto"});
});

/* control 销控 */
$(document).on("click",".controlcon",function(e) {
    e = window.event || e; // 兼容IE7
    obj = $(e.srcElement || e.target);
    if (obj.closest(".controldiv").length == 0) {
		$(".controlcon").fadeOut(300);
		$(".indexcon h2.indexxk").hide();
		//$("body").css({"height":"auto","overflow":"auto"});
    }
});


	$(document).on("click",".controlcon .controldiv .controldivcon .controldivpage p i",function(){
		//var banid = $(".indexsingle .indexsinglediv").attr("data-banid");
		//var unit = $(this).attr("data-unit");
		var index = $(this).index() + 1;
		var banindex = $(this).attr("data-ban");
		$(this).addClass("hover").siblings().removeClass("hover");
		indexxkajax(index,banindex);
	});

	$(document).on("click",".controlcon .controldiv h6.prev",function(){
		//var banid = $(".indexsingle .indexsinglediv").attr("data-banid");
		var unit = $(".controlcon .controldiv .controldivcon .controldivpage p i.hover").index() - 1;
		if(unit <  0){
			/*var indexbottom = $(".controlcon .controldiv .controldivcon .controldivpage p i").length - 1;
			$(".controlcon .controldiv .controldivcon .controldivpage p i:eq("+ indexbottom +")").addClass("hover").siblings().removeClass("hover");
			//unit = $(".indexsingle .indexsinglediv .indexsinglecon .indexsingletop h4 i:eq("+ indexbottom +")").attr("data-unit");
			indexxkajax(indexbottom+1);*/
			console.log("不可循环");
		}else{
			$(".controlcon .controldiv .controldivcon .controldivpage p i:eq("+ unit +")").addClass("hover").siblings().removeClass("hover");
			var banindex = $(".controlcon .controldiv .controldivcon .controldivpage p i:eq("+ unit +")").attr("data-ban");
			indexxkajax(unit+1,banindex);
			//unit = $(".indexsingle .indexsinglediv .indexsinglecon .indexsingletop h4 i:eq("+ unit +")").attr("data-unit");
			//indexxkajax(unit+1);
		}
		//alert(unit)
		//listcon(banid,unit);
	});
	
	$(document).on("click",".controlcon .controldiv h6.next",function(){
		//var banid = $(".indexsingle .indexsinglediv").attr("data-banid");
		var unit = $(".controlcon .controldiv .controldivcon .controldivpage p i.hover").index() + 1;
		if(unit >=  $(".controlcon .controldiv .controldivcon .controldivpage p i").length){
			/*$(".controlcon .controldiv .controldivcon .controldivpage p i:eq(0)").addClass("hover").siblings().removeClass("hover");
			//unit = "";
			indexxkajax(1);*/
			console.log("不可循环");
		}else{
			$(".controlcon .controldiv .controldivcon .controldivpage p i:eq("+ unit +")").addClass("hover").siblings().removeClass("hover");
			//unit = $(".indexsingle .indexsinglediv .indexsinglecon .indexsingletop h4 i:eq("+ unit +")").attr("data-unit");
			//indexxkajax(unit+1);
			
			var banindex = $(".controlcon .controldiv .controldivcon .controldivpage p i:eq("+ unit +")").attr("data-ban");
			indexxkajax(unit+1,banindex);
		}
		//alert(banid+","+unit)
		//listcon(banid,unit);
	});


/* 打印  */
$(document).on("click",".indexprintcon",function(e) {
    e = window.event || e; // 兼容IE7
    obj = $(e.srcElement || e.target);
    if (obj.closest(".indexprintdiv").length == 0) {
		$(".indexprintcon").fadeOut(300);
		//$("body").css({"height":"auto","overflow":"auto"});
    }
});

$(document).on("click",".indexprintcon .indexprintdiv .indexprintdiva button",function() {
	var formtel = $(".indexprintcon .indexprintdiv .indexprintdiva input").val();
	if(formtel == ""){
		textprompt("手机号码不能为空。");
		return false;
	} else if(!(teltestft.test(formtel))){
		textprompt("填写的手机号码错误。");
		return false;
	} else {
		$.ajax({
			type: 'post',
			url: ''+ApiUrl+'Home/index/mainprint.html',
			data: '?&mobile='+formtel+userpid+'',
			dataType: 'json',
			success: function(data){
				if(data.error == 200){
					var html = "";
					var data = data.data;
					if(data.length > 0){
						for(var i=0; i<data.length; i++){
							html += '<p><b>'+data[i].title+'</b><em sign_id="'+data[i].hid+'">打印</em><i>';
							for(var g=0; g<data[i].img.length; g++){
								html += '<img src="'+data[i].img[g]+'" style="width:92%;" />';
							}
							html += '</i></p>';
						}
						$(".indexprintcon .indexprintdiv .indexprintdivb").html(html);
						$(".indexprintcon .indexprintdiv .indexprintdiva").hide();
						$(".indexprintcon .indexprintdiv .indexprintdivb").show();
					}else{
						textprompt("您还没有可以打印的。");
					}

				}else{
					textprompt(""+data.msg+"","1");
				}
			},
			error:function(){
				textprompt("请求手机号判断失败");
			}
		});
	}
});

$(document).on("click",".indexprintcon .indexprintdiv .indexprintdivb p em",function() {
	var sign_id = $(this).attr("sign_id");
	location.href = "print.html?&id="+sign_id+htmlVtimeb+"";

	/*var html = $(this).siblings("i").html();*/
	
	/*$("#printWeb #printWebdiv").html(html);
	$("body").css({"height":"auto","overflow":"auto"});
	$(".indexprintcon").hide();
	$(".indexcon").hide();
	$("#printWeb").show();
	$("#printWeb").jqprint();*/
	
/*var new_win=window.open('', "_blank",'');
new_win.document.body.innerHTML=html;
new_win.print();*/


});

$(document).on("click","#printWeb",function(e) {
    e = window.event || e; // 兼容IE7
    obj = $(e.srcElement || e.target);
    if (obj.closest("#printWebcon").length == 0) {
		$("#printWeb").fadeOut(300);
		$(".indexcon").show();
    }
});



/* business 商业 */
$(document).on("click",".businesscon",function(e) {
    e = window.event || e; // 兼容IE7
    obj = $(e.srcElement || e.target);
    if (obj.closest(".businessdiv").length == 0) {
		$(".businesscon").fadeOut(300);
		$(".indexcon h2.indexztgk").hide();
		//$("body").css({"height":"auto","overflow":"auto"});
    }
});

$(document).on("click",".businesscon .businessdiv .businessnav ul li b",function(){
	var index = $(this).parent().index();
	var indexid = $(this).attr("data-index");
	if($(".businesscon .businessdiv .businessnav ul li").eq(index).hasClass("hover") != true){
		$(".businesscon .businessdiv .businessnav ul li p").slideUp();
		$(".businesscon .businessdiv .businessnav ul li").eq(index).find("p").slideDown();
	}else{
		$(".businesscon .businessdiv .businessnav ul li").eq(index).find("p").slideToggle();
	}
	$(".businesscon .businessdiv .businessnav ul li").eq(index).addClass("hover").siblings().removeClass("hover");
	$(".businesscon .businessdiv .businessnav ul li").eq(index - 1).addClass("hoverborder").siblings().removeClass("hoverborder");
	//$(".surveycon .surveydiv .surveylist ul li").eq(indexid).show().siblings().hide();
	if(index == 0){
		$(".businesscon .businessdiv .businesslist ul").show();
		$(".businesscon .businessdiv .businesslist .indexsydiv").hide();
	}else{
		ztsyslide(indexid);
	}
	
	
});

$(document).on("click",".businesscon .businessdiv .businessnav ul li p em",function(){
	$(this).addClass("active").siblings().removeClass("active");
	var indexid = $(this).attr("data-index");
	//$(".surveycon .surveydiv .surveylist ul li").eq(indexid).show().siblings().hide();
	ztsyslide(indexid);
});

	
$(document).on("click",".businesscon .businessdiv .businesslist .indexsydiv .indexsydivcon .swiper-slide",function(){
	var indexid = $(this).index();
	
	var indexlen = $(".businesscon .businessdiv .businesslist .indexsydiv .indexsydivcon .swiper-slide").length;
	if(indexlen > 0){
		var html = "";

		
		//alert(indexlen)
		for(var z=0; z<indexlen; z++){
			var imgUrl = $(".businesscon .businessdiv .businesslist .indexsydiv .indexsydivcon .swiper-slide").eq(z).find("img").attr("src");
			html += '<div class="swiper-slide"><div class="swiper-zoom-container"><img src="'+ imgUrl +'"></div></div>';
		}
		$(".indexImgsize2 .indexImgsizediv2 .indexImgsizecon2 .swiper-wrapper").html(html);
		
		
		$(".indexImgsize2").fadeIn(300);
		indexImgsize2.init();
		indexImgsize2.slideTo(indexid, 0, false);//切换到第一个slide，速度为1秒
		

		if(indexlen > 1){
			$(".indexImgsize2 .indexImgsizediv2 .paginationhd").show();
		}else{
			$(".indexImgsize2 .indexImgsizediv2 .paginationhd").hide();
		}
		
	}
});

$(document).on("click",".indexImgsize2 .indexImgsizediv2 .indexImgsizehide2",function(){
	$(".indexImgsize2").fadeOut();
});
     
/*var bodyheight = $(window).height();
//$("body").css({"height":""+bodyheight+"px","overflow":"hidden"});
var divheight = parseInt(bodyheight - 24);*/
$(".indexImgsize2 .indexImgsizediv2").css({"height":""+ divheight +"px"});
$(".indexImgsize2 .indexImgsizediv2 .indexImgsizecon2").css({"height":""+ divheight +"px"});


//退出用户
	$(document).on("click","#fangsousouOut",function(){
		enduser();
	});
//搜索页面
	$(document).on("click","#fangsousouss",function(){
		location.href = 'search.html'+ htmlVtimea +'';
	});
	
//用户签约数据userid
$(document).on("click",".fangsousouOuta",function(){
	var bodyheight = $(window).height();
	var divheight = parseInt(bodyheight * 0.8);
	var divtop = (bodyheight - divheight) / 2;
	var divlistheight = divheight - 110;
	
	$(".userSignDiv").css("marginTop",""+ divtop +"px");
	$(".userSignCon .userSignDiv .userSignDivcon").css("height",""+ divlistheight +"px");
$.ajax({
		type:"get",
		url:""+ApiUrl+"Home/index/sellprint.html?"+ userpid + htmlVtimeb +"",
		data:"",
		dataType:"json",
		//beforeSend: function(request){ ajaxtoken(request); },
		success: function(data){
			if(data.error == 200){
				var html = "";
				var data = data.data;
				console.log(data);
				if(data.length > 0){
					for(var u=0; u<data.length; u++){
						html += '<li><div>';
						html += '<p><b>签约户号:</b><em>'+ data[u].ban +'幢'+ data[u].unit +'单元'+ data[u].room +'室</em></p>';
						html += '<p><b>签约价格:</b><em>'+ data[u].money +'万</em></p>';
						html += '<p><b>签约时间:</b><em>'+ timegs(data[u].selltime,1) +'</em></p>';
						html += '<p><b>手机号码:</b><em>'+ data[u].mobile +'</em></p>';
						html += '</div></li>';
					}
				}
				//console.log(data.length)
				$(".userSignCon .userSignDiv .userSigntop p i").html(data.length);
				$(".userSignCon .userSignDiv .userSignDivcon ul").html(html);
				$(".userSignCon").fadeIn();
			}else{
				textprompt(""+data.msg+"","1");
			}
		},
		error: function(){
			textprompt("获取用户销控出错");
		}
	});
});
$(document).on("click",".userSignCon",function(e) {
    e = window.event || e; // 兼容IE7
    obj = $(e.srcElement || e.target);
    if (obj.closest(".userSignDiv").length == 0) {
		$(".userSignCon").fadeOut(300);
    }
});




	
	
});



function surveyjava(eq) {
if($(".surveycon .surveydiv .surveynav ul li").size() <= 0){
	indexhas(eq)
	var bodyheight = $(window).height();
	var surveydivheight = parseInt(bodyheight * 0.8);
	var surveydivtop = (bodyheight - surveydivheight) / 2;	
	var surveynavheight = surveydivheight - 75;
	var surveylistheight = surveydivheight - 60;
	//$("body").css({"height":""+bodyheight+"px","overflow":"hidden"});
	$(".surveycon .surveydiv").css({"marginTop":""+surveydivtop+"px","height":""+surveydivheight+"px"});
	$(".surveycon .surveydiv .surveynav").css({"height":""+surveydivheight+"px"});
	$(".surveycon .surveydiv .surveynav ul").css({"height":""+surveynavheight+"px"});
	$(".surveycon .surveydiv .surveylist ul li").css({"height":""+surveylistheight+"px"});
	
	$(".surveycon .surveydiv .surveylist .indexgkdiv").css({"height":""+surveylistheight+"px"});
	$(".surveycon .surveydiv .surveylist .indexgkdiv .indexgkdivcon").css({"height":""+surveylistheight+"px"});
	
	var ajaxtimea = "&v="+new Date().getTime()+"";
	$.ajax({
		type:"get",
		url:""+ApiUrl+"Home/index/survey.html?"+ userpid + ajaxtimea +"",
		data:"",
		dataType:"json",
		//beforeSend: function(request){ ajaxtoken(request); },
		success: function(data){
			if(data.error == 200){
				var htmlnav = "";
				var htmllist = "";
				var htmldiv = "";
				var data = data.data;
				var index = 0;
				
var ztgkimgurl = [];

				htmlnav += '<li class="hover"><b data-index="0">基础信息</b></li>';
				
				
				for(var n=0; n<data.menu.length; n++){
					index++;
					htmlnav += '<li><b data-index="'+ index +'">'+ data.menu[n].name +'</b>';
					if(typeof(data.menu[n].menu) != "undefined" && data.menu[n].menu.length > 0){
						htmlnav += '<p>';
						
						for(var e=0; e<data.menu[n].menu.length; e++){
							
							if(e==0){
								htmlnav += '<em class="active" data-index="'+ index +'">';
							}else{
								index++;
								htmlnav += '<em data-index="'+ index +'">';
							}
							htmlnav += ''+ data.menu[n].menu[e].name +'</em>';
							var ztgkimgobj = new Array();
							if(data.menu[n].menu[e].url.length > 0){
								htmllist += '<li>';
								for(var l=0; l<data.menu[n].menu[e].url.length; l++){
									htmllist += '<img src="'+ data.menu[n].menu[e].url[l] +'" />';
									ztgkimgobj.push(data.menu[n].menu[e].url[l]);
								}
								htmllist += '</li>';
							}else{
								htmllist += '<li></li>';
								ztgkimgobj.push("");
							}
							ztgkimgurl[index] = ztgkimgobj;
						}
						
						
						htmlnav += '</p>';
					}
					htmlnav += '</li>';
				}
				
				
				htmldiv += '<li class="active"><dl>';
				htmldiv += '<dt>'+ data.jcxx.title +'</dt>';
				var htmldda = "";
				var htmlddb = "";
				for(var d=0; d<data.jcxx.data.length; d++){
					if(d%2 == 0){
						htmldda += '<p>'+data.jcxx.data[d].title+'：'+data.jcxx.data[d].content+'</p>';
					}else{
						htmlddb += '<p>'+data.jcxx.data[d].title+'：'+data.jcxx.data[d].content+'</p>';
					}
				}	
				htmldiv += '<dd>'+ htmldda +'</dd><dd>'+ htmlddb +'</dd>';
				htmldiv += '</dl></li>';
				
				/*htmldiv += '<li class="active"><table cellpadding="0" cellspacing="0" border="0" width="600" >';
				htmldiv += '<tr><th colspan="2">'+ data.jcxx.title +'</th></tr><tr>';
				
				for(var d=0; d<data.jcxx.data.length; d++){
					if(d%2 == 0){
						htmldiv += '</tr><tr>';
					}
					htmldiv += '<td>'+data.jcxx.data[d].title+'：'+data.jcxx.data[d].content+'</td>';
				}
				
				htmldiv += '</tr></table></li>';*/
				
				htmldiv += htmllist;
				
				ztgkimgurlcon = ztgkimgurl;
				$(".surveycon .surveydiv .surveynav ul").html(htmlnav);
				$(".surveycon .surveydiv .surveylist ul").html(htmldiv);
				
//console.log(ztgkimgurl);
//console.log(ztgkimgurlcon);

	$(".surveycon .surveydiv .surveylist ul").show();
	$(".surveycon .surveydiv .surveylist .indexgkdiv").hide();
	$(".surveycon .surveydiv .surveylist ul li").css({"height":""+surveylistheight+"px"});	
	$(".surveycon").fadeIn(300);
	$(".indexcon h2.indexztgk").show();
	
	
			}else{
				textprompt(""+data.msg+"","1");
			}
		},
		error: function(){
			textprompt("获取总体概况列表出错");
		}
	});
	
}else{
	var bodyheight = $(window).height();
	//$("body").css({"height":""+bodyheight+"px","overflow":"hidden"});
	$(".surveycon").fadeIn(300);
	$(".indexcon h2.indexztgk").show();
}

}




function ztgkslide(k,datas){

console.log(datas);

//console.log(ztgkimgurlcon);
	$(".surveycon .surveydiv .surveylist ul").hide();
	$(".surveycon .surveydiv .surveylist .indexgkdiv").show();
	
var html = "";
var html_ipad = "";
//alert(ztgkimgurlcon[k].length)
for(var i=0; i<ztgkimgurlcon[k].length; i++){
	html += '<div class="swiper-slide"><img src="'+ ztgkimgurlcon[k][i] +'"  /></div>';
}

for(var j=0; j<ztgkimgurlcon[k].length; j++){
	html_ipad += '<div class="swiper-slide"><a href="'+ztgkimgurlcon[k][j]+'"><img src="'+ ztgkimgurlcon[k][j] +'"  /></a></div>';
}

if(datas == "pc"){
	$(".surveycon .surveydiv .surveylist .indexgkdiv .indexgkdivcon .swiper-wrapper").html(html);
}else{
	$(".surveycon .surveydiv .surveylist .indexgkdiv .indexgkdivcon .swiper-wrapper").html(html_ipad);
}



console.log(ztgkimgurlcon[k].length);

	if(ztgkimgurlcon[k].length > 1){
		$(".surveycon .surveydiv .surveylist .indexgkdiv .paginationhd").show();
		//new Swiper('#indexgkdivcon',{ pagination:'#indexgkdivcon .paginationhd', paginationClickable:true });
		ztgkswiper.init();
	}else{
		$(".surveycon .surveydiv .surveylist .indexgkdiv .paginationhd").hide();
		//new Swiper('#indexgkdivcon');
		ztgkswiper.init();
	}
	
}





function controljava(eq){
	indexhas(eq)
	var bodyheight = $(window).height();
	var controldivheight = parseInt(bodyheight * 0.8);
	var controldivtop = (bodyheight - controldivheight) / 2;
	var controldivconheight = controldivheight - 180;
	var controlh6top = (controldivheight - 42) / 2;
	
	//$("body").css({"height":""+bodyheight+"px","overflow":"hidden"});
	$(".controlcon .controldiv").css({"marginTop":""+controldivtop+"px","height":""+controldivheight+"px"});
	$(".controlcon .controldiv .controldivcon").css("height",""+controldivheight+"px");
	$(".controlcon .controldiv .controldivcon .controldivlist div").css("height",""+controldivconheight+"px");
	$(".controlcon .controldiv h6").css("marginTop",""+controlh6top+"px");
	
	indexxkajax(1,1);
	$(".controlcon").fadeIn(300);
	$(".indexcon h2.indexxk").show();
}


function indexhas(eq){
	$(".indexcon h3 a").eq(eq).addClass("hover").siblings().removeClass("hover");
}

function indexxkajax(page,ban){
	//alert(page)
	var ajaxtimea = "&v="+new Date().getTime()+"";
	
	$.ajax({
		type:"get",
		url:""+ApiUrl+"Home/index/marketing.html?&ban="+ban + userpid + ajaxtimea +"",
		data:"",
		dataType:"json",
		//beforeSend: function(request){ ajaxtoken(request); },
		success: function(data){
			if(data.error == 200){
				var htmltop = "";
				var htmldiv = "";
				var htmlpage = "";
				var datal = data.data;
				var unit = data.unit;
				
				
				htmltop += '<b>'+ ban +'幢</b>';
				
				var shengxiaxiaoshou = stringsplit(''+ datal.shengxiaxiaoshou +'');
				var xiaoshou = stringsplit(''+ datal.xiaoshou +'');
				var numall = stringsplit(''+ datal.numall +'');
				
				htmltop += '<p><em>套</em><span>'+ shengxiaxiaoshou +'</span><em>可售：</em></p>';
				htmltop += '<p><em>套</em><span>'+ xiaoshou +'</span><em>已售：</em></p>';
				htmltop += '<p><em>套</em><span>'+ numall +'</span><em>销售房源：</em></p>';
				$(".controlcon .controldiv .controldivcon .controldivtop").html(htmltop);
				
				
				for(var p=1; p<datal.unit.length+1; p++){
					if(p == page){
						htmlpage += '<i class="hover" data-ban="'+ datal.unit[p-1].ban +'">'+p+'</i>';
					}else{
						htmlpage += '<i data-ban="'+ datal.unit[p-1].ban +'">'+p+'</i>';
					}
				}
				$(".controlcon .controldiv .controldivcon .controldivpage em").html(htmlpage);
				
				
				for(var i=0; i<datal.data.length; i++){
					for(var z=0; z<datal.data[i].length; z++){
						if(datal.data[i][z].status == 1 || datal.data[i][z].status == 2){
							htmldiv += '<li class="active">';
						}else{
							htmldiv += '<li>';
						}
						htmldiv += '<i>'+ datal.data[i][z].ban +'-'+ datal.data[i][z].unit +'-'+ datal.data[i][z].room +'</i><em>¥'+ datal.data[i][z].price +'<br/><u>¥'+ datal.data[i][z].money +'</u></em></li>';
					}
				}
				$(".controlcon .controldiv .controldivcon .controldivlist ul").html(htmldiv);
	
			}else{
				textprompt(""+data.msg+"","1");
			}
		},
		error: function(){
			textprompt("获取销控列表出错");
		}
	});
}


/* 打印 */
function printjava(eq){
	indexhas(eq);
	var bodyheight = $(window).height();	
	//$("body").css({"height":""+bodyheight+"px","overflow":"hidden"});
	$(".indexprintcon .indexprintdiv .indexprintdiva").show();
	$(".indexprintcon .indexprintdiv .indexprintdivb").hide();
	$(".indexprintcon").fadeIn(300);
}




/*商业*/
function businessjava(eq) {
if($(".businesscon .businessdiv .businessnav ul li").size() <= 0){
	indexhas(eq)
	var bodyheight = $(window).height();
	var businessdivheight = parseInt(bodyheight * 0.8);
	var businessdivtop = (bodyheight - businessdivheight) / 2;	
	var businessnavheight = businessdivheight - 75;
	var businesslistheight = businessdivheight - 60;
	//$("body").css({"height":""+bodyheight+"px","overflow":"hidden"});
	$(".businesscon .businessdiv").css({"marginTop":""+businessdivtop+"px","height":""+businessdivheight+"px"});
	$(".businesscon .businessdiv .businessnav").css({"height":""+businessdivheight+"px"});
	$(".businesscon .businessdiv .businessnav ul").css({"height":""+businessnavheight+"px"});
	$(".businesscon .businessdiv .businesslist ul li").css({"height":""+businesslistheight+"px"});
	
	$(".businesscon .businessdiv .businesslist .indexsydiv").css({"height":""+businesslistheight+"px"});
	$(".businesscon .businessdiv .businesslist .indexsydiv .indexsydivcon").css({"height":""+businesslistheight+"px"});
	
	var ajaxtimea = "&v="+new Date().getTime()+"";
	$.ajax({
		type:"get",
		url:""+ApiUrl+"Home/index/survey.html?"+ userpid + ajaxtimea +"&shangye=1",
		data:"",
		dataType:"json",
		//beforeSend: function(request){ ajaxtoken(request); },
		success: function(data){
			if(data.error == 200){
				var htmlnav = "";
				var htmllist = "";
				var htmldiv = "";
				var data = data.data;
				var index = 0;
				
var ztsyimgurl = [];

				/*htmlnav += '<li class="hover" style="display:none"><b data-index="0">基础信息</b></li>';*/
				
				
				for(var n=0; n<data.menu.length; n++){
					index++;
					htmlnav += '<li><b data-index="'+ index +'">'+ data.menu[n].name +'</b>';
					if(typeof(data.menu[n].menu) != "undefined" && data.menu[n].menu.length > 0){
						htmlnav += '<p>';
						
						for(var e=0; e<data.menu[n].menu.length; e++){
							
							if(e==0){
								htmlnav += '<em class="active" data-index="'+ index +'">';
							}else{
								index++;
								htmlnav += '<em data-index="'+ index +'">';
							}
							htmlnav += ''+ data.menu[n].menu[e].name +'</em>';
							var ztsyimgobj = new Array();
							if(data.menu[n].menu[e].url.length > 0){
								htmllist += '<li>';
								for(var l=0; l<data.menu[n].menu[e].url.length; l++){
									htmllist += '<img src="'+ data.menu[n].menu[e].url[l] +'" />';
									ztsyimgobj.push(data.menu[n].menu[e].url[l]);
								}
								htmllist += '</li>';
							}else{
								htmllist += '<li></li>';
								ztsyimgobj.push("");
							}
							ztsyimgurl[index] = ztsyimgobj;
						}
						
						
						htmlnav += '</p>';
					}
					htmlnav += '</li>';
				}
				
				
				/*htmldiv += '<li class="active"><dl>';
				htmldiv += '<dt>'+ data.jcxx.title +'</dt>';
				var htmldda = "";
				var htmlddb = "";
				for(var d=0; d<data.jcxx.data.length; d++){
					if(d%2 == 0){
						htmldda += '<p>'+data.jcxx.data[d].title+'：'+data.jcxx.data[d].content+'</p>';
					}else{
						htmlddb += '<p>'+data.jcxx.data[d].title+'：'+data.jcxx.data[d].content+'</p>';
					}
				}	
				htmldiv += '<dd>'+ htmldda +'</dd><dd>'+ htmlddb +'</dd>';
				htmldiv += '</dl></li>';*/
				
				/*htmldiv += '<li class="active"><table cellpadding="0" cellspacing="0" border="0" width="600" >';
				htmldiv += '<tr><th colspan="2">'+ data.jcxx.title +'</th></tr><tr>';
				
				for(var d=0; d<data.jcxx.data.length; d++){
					if(d%2 == 0){
						htmldiv += '</tr><tr>';
					}
					htmldiv += '<td>'+data.jcxx.data[d].title+'：'+data.jcxx.data[d].content+'</td>';
				}
				
				htmldiv += '</tr></table></li>';*/
				
				htmldiv += htmllist;
				
				ztsyimgurlcon = ztsyimgurl;
				$(".businesscon .businessdiv .businessnav ul").html(htmlnav);
				$(".businesscon .businessdiv .businesslist ul").html(htmldiv);
				
				$(".businesscon .businessdiv .businessnav ul li:eq(0)").addClass("hover");
	$(".businesscon .businessdiv .businesslist ul").show();
	$(".businesscon .businessdiv .businesslist .indexsydiv").hide();
	$(".businesscon .businessdiv .businesslist ul li").css({"height":""+businesslistheight+"px"});	
	$(".businesscon").fadeIn(300);
	/*$(".indexcon h2.indexztgk").show();*/
	
	
			}else{
				textprompt(""+data.msg+"","1");
			}
		},
		error: function(){
			textprompt("获取商业列表出错");
		}
	});
	
}else{
	var bodyheight = $(window).height();
	//$("body").css({"height":""+bodyheight+"px","overflow":"hidden"});
	$(".businesscon").fadeIn(300);
	/*$(".indexcon h2.indexztgk").show();*/
}

}



function ztsyslide(k){

	$(".businesscon .businessdiv .businesslist ul").hide();
	$(".businesscon .businessdiv .businesslist .indexsydiv").show();
	
var html = "";
//alert(ztgkimgurlcon[k].length)
for(var i=0; i<ztsyimgurlcon[k].length; i++){
	html += '<div class="swiper-slide"><img src="'+ ztsyimgurlcon[k][i] +'"  /></div>';
}
$(".businesscon .businessdiv .businesslist .indexsydiv .indexsydivcon .swiper-wrapper").html(html);


	if(ztsyimgurlcon[k].length > 1){
		$(".businesscon .businessdiv .businesslist .indexsydiv .paginationhd").show();
		//new Swiper('#indexgkdivcon',{ pagination:'#indexgkdivcon .paginationhd', paginationClickable:true });
		ztgkswiper.init();
	}else{
		$(".businesscon .businessdiv .businesslist .indexsydiv .paginationhd").hide();
		//new Swiper('#indexgkdivcon');
		ztsyswiper.init();
	}
	
}



function stringsplit(shuzi){
	var shuzi = String(shuzi).split('');
	var html = "";
	for(var l=0; l<shuzi.length; l++){
		html += '<i>'+ shuzi[l] +'</i>';
	}
	return html;
}


/*  时间格式转换   显示   */
function timegs(sj,shape){
	var sj = new Date(sj * 1000);
	//console.log(sj);
	var year = sj.getFullYear();
	var month = sj.getMonth()+1;
	var dater = sj.getDate();
	var hour = sj.getHours();
	var minute = sj.getMinutes();
	var second = sj.getSeconds();
	
	
	if(month<10){
		month = "0"+month;
	}
	if(dater<10){
		dater = "0"+dater;
	}
	
	if(hour<10){
		hour = "0"+hour;
	}
	if(minute<10){
		minute = "0"+minute;
	}
	if(second<10){
		second = "0"+second;
	}
	
	if(shape == 1){
		var timesj = year +"."+ month +"."+ dater ;
	}else if(shape == 2){
		var timesj = year +"-"+ month +"-"+ dater +"     "+ hour +":"+ minute;
	} else {
		var timesj = year +"-"+ month +"-"+ dater +"     "+ hour +":"+ minute +":"+ second;
	}	
	return timesj;
}