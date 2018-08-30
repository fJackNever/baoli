$(function(){

/* qrcode */

var bodyheight = $(window).height();
var listdivtop = parseInt(bodyheight - 260) / 2;
//$("body").css({"height":""+bodyheight+"px","overflow":"hidden"});
$(".qrcodecon .qrcodediv").css({"marginTop":""+listdivtop+"px"});
$(".qrcodecon").fadeIn(300);


$(document).on("click",".qrcodecon",function(e) {
    e = window.event || e; // 兼容IE7
    obj = $(e.srcElement || e.target);
    if (obj.closest(".qrcodediv").length == 0) {
		$(".qrcodecon").fadeOut(300);
		//$("body").css({"height":"auto","overflow":"auto"});
    }
});
	
	if(id > 0){
		$.ajax({
			type: 'get',
			url: ''+ApiUrl+'Home/index/myprint.html?hid='+ id + htmlVtimeb +'',
			data: '',
			dataType: 'json',
			success: function(data){
				if(data.error == 200){
					var house =  data.data.house;
					var data = data.data.sign;
					var datalength = data.length;
					var divlist = "", page = "";
					
					var htmlhade = '<em>'+house.ban+'</em>幢<em>'+house.unit+'</em>单元<em>'+house.room+'</em>室';
					$(".printcon h2 b").html(htmlhade);
					
					//alert(data[0].url)
					
					if(datalength > 0){
						/*var pageindex = Math.ceil(datalength / 4);
						divlist += '<ul>';
						for(var i=0; i<datalength; i++){
									
							if((i%4) == 0){
								divlist += '</ul><ul>';
							}
							divlist += '<li><img src="'+ data[i].url +'" data-imgqurl="'+ data[i].qurl +'" data-imgid="'+ data[i].id +'" /><em></em><img src="'+ data[i].qurl +'"/></li>';
							
						}
						divlist += '</ul>';	
						
						for(var p=0; p<pageindex; p++){
							if(p==0){
								page += '<span class="hover">'+ parseInt(p+1) +'</span>';
							}else{
								page += '<span>'+ parseInt(p+1) +'</span>';
							}
						}*/
						divlist += '<ul>';
						for(var i=0; i<datalength; i++){
							divlist += '<li><img src="'+ data[i].url +'" data-imgqurl="'+ data[i].qurl +'" data-imgid="'+ data[i].id +'" /><em></em><img src="'+ data[i].qurl +'"/></li>';
							
						}
						divlist += '</ul>';
					}
					
					
					$(".printcon .printdiv .printdivlist").html(divlist);
					/*$(".printcon .printdiv .printdivpage p").html(page);
					$(".printcon .printdiv .printdivlist ul").eq(0).remove();*/
					
				}else{
					textprompt(""+data.msg+"","1");
				}
			},
			error:function(){
				textprompt("请求打印信息失败");
			}
		});
	}
	
	
	$(document).on("click",".printcon .printdiv .printdivpage p span",function(){
		var index = $(this).index();
		$(this).addClass("hover").siblings().removeClass("hover");
		$(".printcon .printdiv .printdivlist ul:eq("+ index +")").show().siblings().hide();
	});

	$(document).on("click",".printcon .printdiv .printdivlist ul li",function(){
		var isclass = $(this).hasClass("hover");
		if(!isclass){
			$(this).addClass("hover");
		}else{
			$(this).removeClass("hover");
		}
	});


	$(document).on("click",".prodBottom em.prodBottomtj",function(){
		var list = $(".printcon .printdiv .printdivlist ul li.hover").length;
		if(list > 0){
			var html = "";
			/*var bodyheight = $(window).height();
			$("#printWeb #printWebdiv").css("height",""+bodyheight+"px");
			$("body").css({"height":""+bodyheight+"px","overflow":"hidden"});*/
			for(var i=0; i<list; i++){
				//html += $(".printcon .printdiv .printdivlist li.hover").eq(i).find("img").prop("outerHTML");

				var imgqurl = $(".printcon .printdiv .printdivlist li.hover").eq(i).find("img").eq(0).attr("data-imgqurl");
				html += '<img src="'+ imgqurl +'" style="width:92%;" />';
			}
			//alert(html)
			//$("#printWeb #printWebdiv").html(html);
			//$(".printcon").hide();
			//$("#printWeb").show();
			//$("#printWeb").jqprint();
			
/*var winname = window.open('', "_blank",'');
winname.document.body.innerHTML=html;
winname.print();*/

var new_win=window.open('', "_blank",'');
new_win.document.body.innerHTML=html;
new_win.print();

			
		}else{
			textprompt("请选择打印的图纸");
		}
	});


	$(document).on("click","#printWeb",function(e) {
	    e = window.event || e; // 兼容IE7
	    obj = $(e.srcElement || e.target);
	    if (obj.closest("#printWebcon").length == 0) {
			$("#printWeb").fadeOut(300);
			$(".printcon").show();
	    }
	});

})
