$(function(){

	var htmlImg = '';
	var htmldiv_2 = '';
	var cwData = '';
	var carParkslide = new Swiper('#carParkdivslidecon',{pagination:'.carParkdivslide .paginationhd', nextButton:'.carParkdivslide .swiper-button-next', prevButton:'.carParkdivslide .swiper-button-prev',paginationClickable:true });
	var indexImgsize = new Swiper('#indexImgsizecon',{zoom:true, /*observer:true,*/ pagination:'.indexImgsizediv .paginationhd', paginationClickable:true });
	
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

	function stringsplit(shuzi){
		var shuzi = String(shuzi).split('');
		var html = "";
		for(var l=0; l<shuzi.length; l++){
			html += '<i>'+ shuzi[l] +'</i>';
		}
		return html;
	}

	$.ajax({
		type:"get",
		url:""+ApiUrl+"Home/Index/garage.html?"+userpid,
		data:"",
		dataType:"json",
		//beforeSend: function(request){ ajaxtoken(request); },
		success: function(data){
			if(data.error == 200){
				var htmltop = "";
				var htmldiv = "";
				var htmltable = "";
				var data_num = '';
				var data_num2 = '';
				var data = data.data;
				var data1 = data.data;
				cwData = data1;

				console.log(data);

				if(data.iscarsign != 1){
					$(".carParkBottom em.carParkBottomtj").hide();
				}else{
					$(".carParkBottom em.carParkBottomtj").show();
				}
				
				$("body").attr({"data-pid":""+data.pid+""});
				for(var k=0; k<data1.length; k++){
					if (k == 0) {

						htmltop += '<b>车位编号：<span>'+ data1[k].number +'</span></b>';

						htmltable += '<tr>';

						for(var j=0; j<data1[k].content.length; j++){
							htmltable += '<th width="100px">'+ data1[k].content[j].title +'</th>';
						}

						htmltable += '</tr><tr>';

						for(var p=0; p<data1[k].content.length; p++){
							htmltable += '<td>'+ data1[k].content[p].content +'</td>'
						}

						
						htmltable += '</tr>';
					}
				}

				if(sb_data == 'pc'){
					for(var i=0; i<data.carimg.length; i++){
						htmlImg += '<div class="swiper-slide"><img src="'+data.carimg[i]+'"></div>'
					}
					
				}else{
					for(var k=0; k<data.carimg.length; k++){
						htmlImg += '<div class="swiper-slide"><a href="'+data.carimg[k]+'" ><img src="'+data.carimg[k]+'"></a></div>'
					}
					
				}
				

				var shengxiachewei = stringsplit(''+ data.num +'');
				var xiaoshou = stringsplit(''+ (data.allnum - data.num) +'');
				var numall = stringsplit(''+ data.allnum +'');
								
				htmltop += '<p><em>个</em><span>'+ shengxiachewei +'</span><em>可售：</em></p>';
				htmltop += '<p><em>个</em><span>'+ xiaoshou +'</span><em>已售：</em></p>';
				htmltop += '<p><em>个</em><span>'+ numall +'</span><em>销售车位：</em></p>';

				$(".carParkcon .carParkdivtop").html(htmltop);
				
				htmldiv += '<div class="swiper-slide"><div class="carParkdivlist">'
				htmldiv += '<h5><b><span>编号</span><span>价格(元)</span></b><b><span>编号</span><span>价格(元)</span></b><b><span>编号</span><span>价格(元)</span></b><b><span>编号</span><span>价格(元)</span></b><b><span>编号</span><span>价格(元)</span></b></h5>'
				htmldiv += '<div class="rows2"><ul>'

				for(var i=0; i<data1.length; i++){


					if(data1[i].status == 1){
						htmldiv += '<li class="active" dataid="'+data1[i].id+'">';
					}else{
						htmldiv += '<li dataid="'+data1[i].id+'">';
					}
					htmldiv += '<i>'+ data1[i].number +'</i><em>¥'+ data1[i].price +'</em></li>';
					
				}

				htmldiv += '</ul></div></div></div>';

				htmldiv_2 = htmldiv;
				$(".carParkdiv .carParkdivslide .carParkdivslidecon .swiper-wrapper").html(htmldiv);

				$(".carParkcon .carParkailed table").html(htmltable);

				var th_length = $(".carParkailed table th").length;
				for(var i=0; i<th_length; i++){
					var td_data = $(".carParkailed table td:eq("+i+")").html();
					if(td_data == "-100"){
						$(".carParkailed table th:eq("+i+")").hide();
						$(".carParkailed table td:eq("+i+")").hide();
						if(i == th_length-1 ){
							$(".carParkailed table th:eq("+(i-1)+")").css("border-right","none");
							$(".carParkailed table td:eq("+(i-1)+")").css("border-right","none");
						}
						
					}

				}

				$(".carParkcon .carParkdiv .carParkdivslide .swiper-button-prev").hide();
				$(".carParkcon .carParkdiv .carParkdivslide .swiper-button-next").hide();
				$(".carParkcon .carParkdiv .carParkdivslide .paginationhd").hide();
				carParkslide.init();
					
			}else{
				textprompt(""+data.msg+"","1");
			}
		},
		error: function(){
			textprompt("获取单品列表出错");
		}
	});


	$(document).on("click",".carParkcon .carParkdiv .carParkdivico",function(){
		var index = $(this).index();
		console.log(index);
		if(index == 2){

			$(this).addClass("hover").siblings().removeClass("hover");
		/*	for(var gi=0; gi<listimgurl.length; gi++){
				html += '<div class="swiper-slide"><img src="'+listimgurl[gi]+'"></div>';
			}
			$(".carParkcon .carParkdiv .carParkdivslide .carParkdivslidecon .swiper-wrapper").html(html);*/

			$(".carParkcon .carParkdiv .carParkdivslide .carParkdivslidecon .swiper-wrapper").html(htmlImg);
			
			$('.carParkdivslidecon').css("width",'552px');

			$(".carParkcon .carParkdiv .carParkdivslide .swiper-button-prev").hide();
			$(".carParkcon .carParkdiv .carParkdivslide .swiper-button-next").hide();
			$(".carParkcon .carParkdiv .carParkdivslide .paginationhd").show();
			//new Swiper('#proddivslidecon',{ pagination:'.proddivslide .paginationhd', paginationClickable:true });
			carParkslide.init();

		}else{
			$(this).addClass("hover").siblings().removeClass("hover");
			$(".carParkcon .carParkdiv .carParkdivslide .carParkdivslidecon .swiper-wrapper").html(htmldiv_2);
			$('.carParkdivslidecon').css("width",'685px');

			$(".carParkcon .carParkdiv .carParkdivslide .swiper-button-prev").hide();
			$(".carParkcon .carParkdiv .carParkdivslide .swiper-button-next").hide();
			$(".carParkcon .carParkdiv .carParkdivslide .paginationhd").hide();
			//new Swiper('#proddivslidecon',{ pagination:'.proddivslide .paginationhd', paginationClickable:true });
			carParkslide.init();
		}
	});
	


var bodyheight = $(window).height();
//$("body").css({"height":""+bodyheight+"px","overflow":"hidden"});
var divheight = parseInt(bodyheight - 24);
$(".indexImgsize .indexImgsizediv").css({"height":""+ divheight +"px"});
$(".indexImgsize .indexImgsizediv .indexImgsizecon").css({"height":""+ divheight +"px"});
$(".indexImgsize .indexImgsizediv .indexImgsizecon .swiper-slide").css({"height":""+ divheight +"px"});

if(sb_data == 'pc'){
	$(document).on("click",".carParkcon .carParkdiv .carParkdivslide .carParkdivslidecon .swiper-slide img",function(){
		var indexid = $(this).index();
		var indexlen = $(".carParkcon .carParkdiv .carParkdivslide .carParkdivslidecon .swiper-slide").length;
		if(indexlen > 0){
			var html = "";
			
			//alert(indexlen)
			for(var z=0; z<indexlen; z++){
				var imgUrl = $(".carParkcon .carParkdiv .carParkdivslide .carParkdivslidecon .swiper-slide").eq(z).find("img").attr("src");
				html += '<div class="swiper-slide"><div class="swiper-zoom-container"><img src="'+ imgUrl +'"></div></div>';
			}
			$(".indexImgsize .indexImgsizediv .indexImgsizecon .swiper-wrapper").html(html);
			

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
});
	
	
	function changeHouse(k){

		var htmltable = "";

		htmltable += '<tr>';

		for(var j=0; j<cwData[k].content.length; j++){
			htmltable += '<th>'+ cwData[k].content[j].title +'</th>';
		}

		htmltable += '</tr><tr>';

		for(var p=0; p<cwData[k].content.length; p++){
			htmltable += '<td>'+ cwData[k].content[p].content +'</td>'
		}

		
		htmltable += '</tr>';

		$(".carParkcon .carParkdivtop b span").html(cwData[k].number);
		$(".carParkcon .carParkailed table").html(htmltable);

		var th_length = $(".carParkailed table th").length;
		for(var i=0; i<th_length; i++){
			var td_data = $(".carParkailed table td:eq("+i+")").html();
			if(td_data == "-100"){
				$(".carParkailed table th:eq("+i+")").hide();
				$(".carParkailed table td:eq("+i+")").hide();
			}

		}

	}
	
	
	
	/* 签约 */

	$(document).on("click",".carParkdivlist ul li",function(){
		var index = $(this).index();
		var isclass = $(this).hasClass('active');
		
		if(!isclass){
			changeHouse(index);
			$(this).addClass('active2').siblings().removeClass('active2');
		}else{
			textprompt("该车位已被签约");
		}
	});


	$(document).on("click",".carParkBottom em.carParkBottomtj",function(){
		var ishasClass = $(".carParkdivlist ul li").hasClass('active2');
		if(ishasClass){
			var bodyheight = $(window).height();
			var bodydivtop = (parseInt(bodyheight) - 248) / 2;
			//$("body").css({"height":""+bodyheight+"px","overflow":"hidden"});
			$(".carParkTelcon .carParkTelconform").css({"marginTop":""+bodydivtop+"px"});
			
			$(".carParkTelcon").fadeIn(300);

		}else{
			textprompt("请先选择车位");
		}
		
	});
	
	
	$(document).on("click",".carParkTelcon .carParkTelconform li i",function(){
		var daojitime;
		var indexa = 60;
		var telzhia = $(".carParkTelcon .carParkTelconform li input#carParkTel").val();
		
		if(telzhia == ""){
			textprompt("手机号码不能为空。");
			return false;
		} else if(!(teltestft.test(telzhia))){
			textprompt("填写的手机号码错误。");
			return false;
		} else {
			$(this).addClass("hover");
			
			$.ajax({
				type: 'post',
				url: ''+ApiUrl+'Home/sms/sendSms.html',
				data: '?&mobile='+telzhia+'&type=car',
				dataType: 'json',
				success: function(data){
					if(data.error == 200){
						textprompt("验证码 已发短信您手机。");
					}
				},
				error:function(){
					textprompt("请求短信失败");
				}
			});
		
			
			daojitime = setInterval(function(){
				$(".carParkTelcon .carParkTelconform li i").html(indexa);
				indexa--;
				if(indexa<0){
					$(".carParkTelcon .carParkTelconform li i").html("获取验证码");
					$(".carParkTelcon .carParkTelconform li i").removeClass("hover");
					clearInterval(daojitime);
				}
			},1000);
		}
	});
	
	
	$(document).on("click",".carParkTelcon",function(e) {
	    e = window.event || e; // 兼容IE7
	    obj = $(e.srcElement || e.target);
	    if (obj.closest(".carParkTelconform").length == 0) {
			$(".carParkTelcon").fadeOut(300);
			//$("body").css({"height":"auto","overflow":"auto"});
	    }
	});
	
	
	$(document).on("click",".carParkTelcon .carParkTelconform em",function(){
		var id = $(".carParkdivlist ul li.active2").attr('dataid');
		var prodtel = $(".carParkTelcon .carParkTelconform li input#carParkTel").val();
		var prodcode = $(".carParkTelcon .carParkTelconform li input#carParkCode").val();

		var houzhia = $(".carParkTelcon .carParkTelconform li input#carParkHouse").val();

		if(prodtel == "" || houzhia == ""){
			textprompt("手机号码或房号不能为空。");
			return false;
		} else if(!(teltestft.test(prodtel))){
			textprompt("填写的手机号码错误。");
			return false;
		}else if(prodcode == ""){
			textprompt("验证码不能为空。");
			return false;
		} else {
			//alert("开始提交")
			
			$.ajax({
				type: 'post',
				url: ''+ApiUrl+'Home/index/garage_mobile.html',
				data: '?&mobile='+prodtel+'&code='+prodcode+'&id='+id+'&house='+houzhia,
				dataType: 'json',
				success: function(data){
					if(data.error == 200){
						textprompt("签约成功");
						setTimeout("location.reload()",2000);

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

$(document).on("click",".prodcon h2 b",function(){
	var bid = $(this).find("em").attr("data-emid");
	location.href = "index.html?&id="+bid+htmlVtimeb+"";
	//indexcore();
});

	
})
