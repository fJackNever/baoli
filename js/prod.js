$(function(){

	
	var listimgurl = [];
	var prodslide = new Swiper('#proddivslidecon',{pagination:'.proddivslide .paginationhd', nextButton:'.proddivslide .swiper-button-next', prevButton:'.proddivslide .swiper-button-prev', paginationClickable:true ,autoHeight: true});
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

if(id > 0){
	$.ajax({
		type:"get",
		url:""+ApiUrl+"Home/index/house?id="+ id + htmlVtimeb +"",
		data:"",
		dataType:"json",
		//beforeSend: function(request){ ajaxtoken(request); },
		success: function(data){
			if(data.error == 200){
				
				var htmlhade = "";
				var htmltable = "";
				var data = data.data;
				
				console.log(data);
				$("body").attr({"data-status":""+data.status+"","data-id":""+data.id+""});
				
					htmlhade += '<em data-emid="'+data.ban+'">'+data.ban+'</em>幢<em>'+data.unit+'</em>单元<em>'+data.room+'</em>室';
					$(".prodcon h2 b").html(htmlhade);

				if(data.monomer.jcxx.content.length > 0){
					for(var t=0; t<data.monomer.jcxx.content.length; t++){
						htmltable += '<tr>';
						if(t==0){
							for(var d=0; d<data.monomer.jcxx.content[t].length; d++){
								htmltable += '<th width="100px">'+ data.monomer.jcxx.content[t][d] +'</th>';//79
							}
						}else{
							for(var d=0; d<data.monomer.jcxx.content[t].length; d++){
								htmltable += '<td>'+ data.monomer.jcxx.content[t][d] +'</td>';
							}
						}
						htmltable += '</tr>';
					}
					$(".prodcon .prodailed table").html(htmltable);
				}

				if(data.issign != 1){
					$(".prodBottom em.prodBottomtj").hide();
				}else{
					$(".prodBottom em.prodBottomtj").show();
				}
				

				var th_length = $(".prodailed table th").length;
				for(var i=0; i<th_length; i++){
					var td_data = $(".prodailed table td:eq("+i+")").html();
					if(td_data == "-100"){
						$(".prodailed table th:eq("+i+")").hide();
						$(".prodailed table td:eq("+i+")").hide();
						if(i == th_length-1 ){
							$(".prodailed table th:eq("+(i-1)+")").css("border-right","none");
							$(".prodailed table td:eq("+(i-1)+")").css("border-right","none");
						}
						
					}

				}
				
				var html = "";
				var htmllist = "";
				if(data.monomer.data.length > 0){
					var datalength = data.monomer.data.length;
					switch(parseInt(datalength)){
						case 8:
							$(".prodcon .proddiv").addClass("proddivicocona");
						break;
						
						case 7:
							$(".prodcon .proddiv").addClass("proddivicoconb");
						break;
						
						case 6:
							$(".prodcon .proddiv").addClass("proddivicoconc");
						break;
						
						case 5:
							$(".prodcon .proddiv").addClass("proddivicocond");
						break;
						
						case 4:
							$(".prodcon .proddiv").addClass("proddivicocone");
						break;
						
						case 3:
							$(".prodcon .proddiv").addClass("proddivicoconf");
						break;
						
						case 2:
							$(".prodcon .proddiv").addClass("proddivicocong");
						break;
						
						default:
							console.log('内容失败。');
					}
					
					for(var i=0; i<data.monomer.data.length; i++){
						var listimgobj = new Array();
						
						if(i==0){
							htmllist += '<div class="proddivico proddivico'+i+' hover">[<em>'+ data.monomer.data[i].name +'</em>]</div>';
							for(var u=0; u<data.monomer.data[i].url.length; u++){
								listimgobj.push(data.monomer.data[i].url[u]);
								if(sb_data == 'pc'){
									html += '<div class="swiper-slide"><img src="'+data.monomer.data[i].url[u]+'"></div>';
								}else{
									html += '<div class="swiper-slide"><a href="'+data.monomer.data[i].url[u]+'"><img src="'+data.monomer.data[i].url[u]+'"></a></div>';
								}
								
							}
						}else{
							htmllist += '<div class="proddivico proddivico'+i+'">[<em>'+ data.monomer.data[i].name +'</em>]</div>';
							for(var u=0; u<data.monomer.data[i].url.length; u++){
								listimgobj.push(data.monomer.data[i].url[u]);
							}
						}
							listimgurl[i] = listimgobj;
							//console.log(listimgobj)
							//console.log(listimgurl)
					}
					$(".prodcon .proddiv").append(htmllist);
					$(".prodcon .proddiv .proddivslide .proddivslidecon .swiper-wrapper").html(html);
					
		if(listimgurl[0].length > 1){
			//new Swiper('#proddivslidecon',{pagination:'.proddivslide .paginationhd', nextButton:'.proddivslide .swiper-button-next', prevButton:'.proddivslide .swiper-button-prev', paginationClickable:true });
			prodslide.init();
		}else{
			//new Swiper('#proddivslidecon',{ pagination:'.proddivslide .paginationhd', paginationClickable:true });
			$(".prodcon .proddiv .proddivslide .swiper-button-prev").hide();
			$(".prodcon .proddiv .proddivslide .swiper-button-next").hide();
			$(".prodcon .proddiv .proddivslide .paginationhd").hide();
			prodslide.init();
		}

				}

			}else{
				textprompt(""+data.msg+"","1");
			}
		},
		error: function(){
			textprompt("获取单品列表出错");
		}
	});
}

	$(document).on("click",".prodcon .proddiv .proddivico",function(){
		var isclass = $(this).hasClass("hover");
		if(!isclass){
			var index = $(this).index() - 1;
			var html = "";
			//alert(index +"<br/>"+ listimgurl);
			//console.log(index +","+ listimgurl[index]);
			$(this).addClass("hover").siblings().removeClass("hover");
			for(var gi=0; gi<listimgurl[index].length; gi++){
				if(sb_data == 'pc'){
					html += '<div class="swiper-slide"><img src="'+listimgurl[index][gi]+'"></div>';
				}else{
					html += '<div class="swiper-slide"><a href="'+listimgurl[index][gi]+'"><img src="'+listimgurl[index][gi]+'"></a></div>';
				}
				
			}
			$(".prodcon .proddiv .proddivslide .proddivslidecon .swiper-wrapper").html(html);
			
			if(listimgurl[index].length > 1){
				$(".prodcon .proddiv .proddivslide .swiper-button-prev").show();
				$(".prodcon .proddiv .proddivslide .swiper-button-next").show();
				$(".prodcon .proddiv .proddivslide .paginationhd").show();
				//new Swiper('#proddivslidecon',{pagination:'.proddivslide .paginationhd', nextButton:'.proddivslide .swiper-button-next', prevButton:'.proddivslide .swiper-button-prev', paginationClickable:true });
				prodslide.init();
			}else{
				$(".prodcon .proddiv .proddivslide .swiper-button-prev").hide();
				$(".prodcon .proddiv .proddivslide .swiper-button-next").hide();
				$(".prodcon .proddiv .proddivslide .paginationhd").hide();
				//new Swiper('#proddivslidecon',{ pagination:'.proddivslide .paginationhd', paginationClickable:true });
				prodslide.init();
			}
		}
	});
	
	
	/*$(document).on("click",".prodcon .proddiv .proddivslide .proddivslidecon .swiper-slide",function(){
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
$(".indexImgsize .indexImgsizediv .indexImgsizecon .swiper-slide").css({"height":""+ divheight +"px"});




if(sb_data == 'pc'){
	$(document).on("click",".prodcon .proddiv .proddivslide .proddivslidecon .swiper-slide",function(){
		var indexid = $(this).index();
		var indexlen = $(".prodcon .proddiv .proddivslide .proddivslidecon .swiper-slide").length;
		if(indexlen > 0){
			var html = "";
			
			//alert(indexlen)
			for(var z=0; z<indexlen; z++){
				var imgUrl = $(".prodcon .proddiv .proddivslide .proddivslidecon .swiper-slide").eq(z).find("img").attr("src");
				html += '<div class="swiper-slide"><div class="swiper-zoom-container"><img src="'+ imgUrl +'"></div></div>';
			}
			$(".indexImgsize .indexImgsizediv .indexImgsizecon .swiper-wrapper").html(html);
			
			/*indexImgsize.removeAllSlides();
			var htmlarr = [];
			for(var z=0; z<indexlen; z++){
				var imgUrl = $(".prodcon .proddiv .proddivslide .proddivslidecon .swiper-slide").eq(z).find("img").attr("src");
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
	

	/* 签约 */
	function getQueryString(name) { 
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
        var r = window.location.search.substr(1).match(reg); 
        if (r != null) return unescape(r[2]); return null;   
    } 

    var signStatus = getQueryString("signStatus");
    var id_status = getQueryString("idStatus");
	
	if(id_status == "no_sell_status" && signStatus == "statusa" || id_status == "has_sell_status" || id_status == "no_kp_status"){
		$(".prodBottom em.prodBottomtj").remove();
	}
	
	
	$(document).on("click",".prodBottom em.prodBottomtj",function(){
		var bodyheight = $(window).height();
		var bodydivtop = (parseInt(bodyheight) - 248) / 2;
		//$("body").css({"height":""+bodyheight+"px","overflow":"hidden"});
		$(".prodTelcon .prodTelconform").css({"marginTop":""+bodydivtop+"px"});
		var status = $("body").attr("data-status");
		if(status == 1){
			textprompt("您已签约！");
		}else{
			$(".prodTelcon").fadeIn(300);
		}
	});
	
	
	$(document).on("click",".prodTelcon .prodTelconform li i",function(){
		var daojitime;
		var indexa = 60;
		var telzhia = $(".prodTelcon .prodTelconform li input#pordTel").val();
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
				data: '?&mobile='+telzhia+'',
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
				$(".prodTelcon .prodTelconform li i").html(indexa);
				indexa--;
				if(indexa<0){
					$(".prodTelcon .prodTelconform li i").html("获取验证码");
					$(".prodTelcon .prodTelconform li i").removeClass("hover");
					clearInterval(daojitime);
				}
			},1000);
		}
	});
	
	
	$(document).on("click",".prodTelcon",function(e) {
	    e = window.event || e; // 兼容IE7
	    obj = $(e.srcElement || e.target);
	    if (obj.closest(".prodTelconform").length == 0) {
			$(".prodTelcon").fadeOut(300);
			//$("body").css({"height":"auto","overflow":"auto"});
	    }
	});
	
	
	$(document).on("click",".prodTelcon .prodTelconform em",function(){
		var id = $("body").attr("data-id");
		var prodtel = $(".prodTelcon .prodTelconform li input#pordTel").val();
		var prodname = $(".prodTelcon .prodTelconform li input#pordName").val();
		var prodcode = $(".prodTelcon .prodTelconform li input#pordCode").val();
		if(prodtel == ""){
			textprompt("手机号码不能为空。");
			return false;
		} else if(!(teltestft.test(prodtel))){
			textprompt("填写的手机号码错误。");
			return false;
		}else if(prodname == ""){
			textprompt("客户姓名不能为空。");
			return false;
		}else if(prodcode == ""){
			textprompt("验证码不能为空。");
			return false;
		} else {
			//alert("开始提交")
			
			$.ajax({
				type: 'post',
				url: ''+ApiUrl+'Home/sms/checkSms.html',
				data: '?&mobile='+prodtel+'&code='+prodcode+'&hid='+id+'&customname='+prodname,
				dataType: 'json',
				success: function(data){
					if(data.error == 200){
						//textprompt(""+data.msg+"","1");
						//sessionStorage.removeItem('indexBid');
						location.href = "sign.html?&id="+id+htmlVtimeb+"";
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
	location.href = "index.html?&id="+bid+htmlVtimeb+"&lou_status="+id_status;
	//indexcore();
});

	
})
