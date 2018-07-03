function validate_email(address) {
   var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
   if(reg.test(address) == false) {
      return false;
   }
   else
   return true;
}

function validate_phone(phone){
	 var reg = /^[\:\-\.\_\(\) 0-9]+$/
        	if(reg.test(phone) == false) {
      return false;
   }
   else
   return true;
}
function check_values() {
	
	var name = '';
	var email = '';
	var subject = '';
	var body = '';
	
	if(typeof $('#form-contact #name').val() != "undefined" )
	{
	 name = document.getElementById("name").value;
	}
	if(typeof $('#form-contact #email').val() != "undefined" )
	{
	 email = document.getElementById("email").value;
	}
	if(typeof $('#form-contact #subject').val() != "undefined" )
	{
	 subject = document.getElementById("subject").value;
	}
	if(typeof $('#form-contact #body').val() != "undefined" )
	{
	 body = document.getElementById("body").value;
	}

	
	var errors=0;
     if($('#form-contact #name').val()!=undefined)
	 if($('#form-contact #name').val()=='') {
	 	var hasClass = $('#form-contact #name').parent().find(".error").hasClass("error");
	 	if(!hasClass)
	 	    $('#form-contact #name').parent().append('<label for="contactname" generated="true" class="error">Please enter your name</label>');
			$('#form-contact #name').focus();
			//return false;
			errors++;
		}
		else
		$('#form-contact #name').parent().find(".error").remove();
		
		if($('#form-contact #email').val()!=undefined)
		if(validate_email($('#form-contact #email').val())==false ) {
		var hasClass = $('#form-contact #email').parent().find(".error").hasClass("error");
	 	if(!hasClass)
	 	    $('#form-contact #email').parent().append('<label for="contactname" generated="true" class="error">Please enter a valid email address</label>');	
			$('#form-contact #email').focus();
			//return false;
			errors++;
		}
		else
		$('#form-contact #email').parent().find(".error").remove();
		
		
		if($('#form-contact #subject').val()!=undefined)
		if($('#form-contact #subject').val()==''){
		var hasClass = $('#form-contact #subject').parent().find(".error").hasClass("error");
	 	if(!hasClass)
	 	    $('#form-contact #subject').parent().append('<label for="contactname" generated="true" class="error">You need to enter a subject!</label>');	
			$('#form-contact #subject').focus();
			//return false;
			errors++;
		}
		else
		$('#form-contact #subject').parent().find(".error").remove();
		
		if($('#form-contact #body').val()!=undefined)
		if($('#form-contact #body').val()==''){
		var hasClass = $('#form-contact #body').parent().find(".error").hasClass("error");
	 	if(!hasClass)
	 	    $('#form-contact #body').parent().append('<label for="contactname" generated="true" class="error">You need to enter a message!</label>');	
			$('#form-contact #body').focus();
			//return false;
			errors++;
		}
		else
		$('#form-contact #body').parent().find(".error").remove();
		
	

	if(errors==0) {
			document.getElementById("submit").disabled=true;
			document.getElementById("submit").value='Please Wait..';
			return true;
	} else {
		return false;
	}
}


