$(function(){
	
	$(document).on("click",".logincon .logintouxiang button",function(){
		var name = $(".logincon .logintouxiang input.loginclass02").val();
		var pass = $(".logincon .logintouxiang input.loginclass03").val();
		
		if(name == ""){
			textprompt("用户名不能为空！");
			return false;
		}else if(pass == ""){
			textprompt("用户密码不能为空！");
			return false;
		}else{
			pass = $.md5(pass);
			//console.log(name +","+ pass);
			
			$.ajax({
				type: 'post',
				url: ''+ApiUrl+'Home/Index/login.html',
				data: '&name='+name+'&pass='+pass+'',
				dataType: 'json',
				success: function(data){
					if(data.error == 200){
						//localStorage.setItem('userId',''+data.data.id+'');
						//localStorage.setItem('userToken',''+data.data.token+'');
						sessionStorage.setItem('userId',''+data.data.id+'');
						sessionStorage.setItem('userToken',''+data.data.token+'');
						sessionStorage.setItem('userName',''+data.data.name+'');
						location.href = "search.html"+ htmlVtimea +"";
						//location.href = "search.html?id="+ data.data.rid+htmlVtimeb +"";
					}else{
						textprompt(""+ data.msg +"","1");
					}
				},
				error:function(){
					textprompt("请求用户失败。");
				}
			});
		}
		
	});
	
	
	
	
	
})
