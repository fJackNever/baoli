var ApiUrl = "http://bldc.yhongdev.com/";
var teltestft = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;

/* 返回上一页  */
function htmlback(index){
	window.history.go(-1); 
}

var sUserAgent = navigator.userAgent.toLowerCase();   
var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";   
var bIsMidp = sUserAgent.match(/midp/i) == "midp";   
var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";   
var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";   
var bIsAndroid = sUserAgent.match(/android/i) == "android";   
var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";   
var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";

	
	
/* 文本提示   */
function textprompt(texts,item){
	if($(".xgdztanchu").size() > 0){
		$(".xgdztanchu .xgdztanchucon").html(""+texts+"");
	} else {
		var windowheight = $(window).height();
		var divheight =  parseInt((windowheight - 86) / 3);
		var texthtml = '<div class="xgdztanchu"><div class="xgdztanchucon" style="margin-top:'+divheight+'px;">'+texts+'</div></div>';
		$("body").append(texthtml)
	}
	
	if(item == 1){
		$(".xgdztanchu").css("opacity","1");
		$(".xgdztanchu").fadeIn(300);
	}else if(item == 2){
		$(".xgdztanchu").css({"opacity":"1"});
		$(".xgdztanchu").addClass("eventsno");
		$(".indexcon").addClass("eventsno");
		$(".xgdztanchu").fadeIn(300);
	}else{
		$(".xgdztanchu").show();	
		$(".xgdztanchu").animate({opacity:'1'},1000);
		$(".xgdztanchu").animate({opacity:'0'},1000,function(){
			$(".xgdztanchu").hide();
		});		
	}

};


/* 文本提示_关闭 */
$(document).on("click",".xgdztanchu",function(){
	$(".xgdztanchu").fadeOut(300);
}); 


/* loading  */
function divloading(){
	if($(".prodlading").size() > 0){
		
	} else {
		var windowheight = $(window).height();
		var divheight =  parseInt((windowheight - 216) / 3);
		var texthtml = '<div class="prodlading"><div class="prodladingImg" style="margin-top:'+divheight+'px;"><img src="../images/loading.gif" /></div></div>';
		$("body").append(texthtml)
	}
	$(".prodlading").fadeIn(300);
}




/*  V=time  */
var htmlgetdata = new Date().getTime();
//htmlgetdata = String(htmlgetdata).substr(7);
var htmlVtimea = "?&v="+htmlgetdata+"";
var htmlVtimeb = "&v="+htmlgetdata+"";


/* 点击进入到首页  */
function indexcore(){
	location.href = "index.html"+htmlVtimea+"";
}

/* EndUser */
function enduser(){
	sessionStorage.removeItem("userId");
	sessionStorage.removeItem('userToken');
	//localStorage.removeItem("userId");
	//localStorage.removeItem('userToken');
	location.href = "login.html"+htmlVtimea+"";
}


/* 判断手机横竖屏状态 */
/*$(function(){
if(bIsIpad){
    ipadwindow();
    
	window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
		ipadwindow();
	}, false);
}

function ipadwindow(){
    if (window.orientation === 180 || window.orientation === 0) { 
        textprompt("请横屏预览。","2");
    }
    
    if (window.orientation === 90 || window.orientation === -90 ){                
        //alert('横屏状态！');
        $(".xgdztanchu").fadeOut(300);
        $(".indexcon").removeClass("eventsno");
        $(".xgdztanchu").removeClass("eventsno");
    }
}
})*/


$(function(){
	var bodyheight = $(window).height();
	$("html,body").css({"height":""+bodyheight+"px","overflow":"auto"});
})


