// function validate_email(address) {
//    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
//    if(reg.test(address) == false) {
//       return false;
//    }
//    else
//    return true;
// }

// function validate_phone(phone){
// 	 var reg = /^[\:\-\.\_\(\) 0-9]+$/
//         	if(reg.test(phone) == false) {
//       return false;
//    }
//    else
//    return true;
// }
// function check_values() {
// 	//Form
// 	var valid = '';

	
// 	var $j = jQuery.noConflict();
	
// 	var name = '';
// 	var email = '';
// 	var subject = '';
// 	var body = '';
	
// 	if(typeof $j('#contactform #name').val() != "undefined" )
// 	{
// 	 name = document.getElementById("name").value;
// 	}
// 	if(typeof $j('#contactform #email').val() != "undefined" )
// 	{
// 	 email = document.getElementById("email").value;
// 	}
// 	if(typeof $j('#contactform #subject').val() != "undefined" )
// 	{
// 	 subject = document.getElementById("subject").value;
// 	}
// 	if(typeof $j('#contactform #body').val() != "undefined" )
// 	{
// 	 body = document.getElementById("body").value;
// 	}

	
// 	var errors=0;
//      if($j('#contactform #name').val()!=undefined)
// 	 if($j('#contactform #name').val()=='') {
// 	 	var hasClass=$j('#contactform #name').parent().find(".error").hasClass("error");
// 	 	if(!hasClass)
// 	 	    $j('#contactform #name').parent().append('<label for="contactname" generated="true" class="error">Please enter your name</label>');
// 			$j('#contactform #name').focus();
// 			//return false;
// 			errors++;
// 		}
// 		else
// 		$j('#contactform #name').parent().find(".error").remove();
		
// 		if($j('#contactform #email').val()!=undefined)
// 		if(validate_email($j('#contactform #email').val())==false ) {
// 		var hasClass=$j('#contactform #email').parent().find(".error").hasClass("error");
// 	 	if(!hasClass)
// 	 	    $j('#contactform #email').parent().append('<label for="contactname" generated="true" class="error">Please enter a valid email address</label>');	
// 			$j('#contactform #email').focus();
// 			//return false;
// 			errors++;
// 		}
// 		else
// 		$j('#contactform #email').parent().find(".error").remove();
		
		
// 		if($j('#contactform #subject').val()!=undefined)
// 		if($j('#contactform #subject').val()==''){
// 		var hasClass=$j('#contactform #subject').parent().find(".error").hasClass("error");
// 	 	if(!hasClass)
// 	 	    $j('#contactform #subject').parent().append('<label for="contactname" generated="true" class="error">You need to enter a subject!</label>');	
// 			$j('#contactform #subject').focus();
// 			//return false;
// 			errors++;
// 		}
// 		else
// 		$j('#contactform #subject').parent().find(".error").remove();
		
// 		if($j('#contactform #body').val()!=undefined)
// 		if($j('#contactform #body').val()==''){
// 		var hasClass=$j('#contactform #body').parent().find(".error").hasClass("error");
// 	 	if(!hasClass)
// 	 	    $j('#contactform #body').parent().append('<label for="contactname" generated="true" class="error">You need to enter a message!</label>');	
// 			$j('#contactform #body').focus();
// 			//return false;
// 			errors++;
// 		}
// 		else
// 		$j('#contactform #body').parent().find(".error").remove();
		
	

// 	if(errors==0) {
// 			document.getElementById("submit").disabled=true;
// 			document.getElementById("submit").value='Please Wait..';
// 			console.log("tabarnack");
// 			return true;
// 	}
// }


