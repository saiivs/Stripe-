window.addEventListener("pageshow", function ( event ) {   
  if(performance.navigation.type == 2){
    location.reload(true);
 }
});

let checkAddressForm = false;
document.addEventListener('DOMContentLoaded',async ()=>{
  
    const {public_key} = await fetch("/public_key").then(r => r.json());
  
    const stripe = Stripe(public_key);

    const options = {
      // Fully customizable with appearance API.
      appearance :{
            theme: 'night',
            labels: 'floating',  
        }
    };

    let address;
    let clientSecret = "";
    let subscriptionId = "";
    let elements = "";
    let paymentElement = "";
    let paymentComplete = false
     elements = stripe.elements(options);
    const addressElement = elements.create("address", {
      mode: "billing",
    });
    addressElement.mount("#address-element");

    // loader event//
    addressElement.on('loaderstart', function(event) {
      document.getElementById('loader2').style.display = "none"
      document.getElementById("testing").style.display ="block"; 
      document.getElementById("testing2").style.display ="block"; 
      document.getElementById("addressBtn").hidden = false;
    });

    
  addressElement.on('change', (event) => {
    if(event.complete){
      checkAddressForm = true;
    }else{
      checkAddressForm = false;
    }
    if (event.complete && validateForm()){
      address = event.value.address;
      address.email = document.getElementById("emailID").value;
      address.company = document.getElementById("companyID").value;
      address.name = event.value.name;
      address.planName = document.getElementById("planName").value;
      address.skus = document.getElementById("skus").value;
      address.amount = document.getElementById("amount").value; 
    }
  })
  
  $("#address-form").submit((e)=>{
    e.preventDefault()
    e.preventDefault();
    if(document.getElementById("Submit_btn").disabled != true){
        document.getElementById('address-form').hidden = true;
        window.scrollTo(0,0)
        document.getElementById('stripeForm').hidden = false;
     
        $.ajax({
          url:"/createCustomer",
          method:"post", 
          data:address,
          success:(response)=>{  
            if(response.userExist){
              swal(`Found an ongoing subscription. Please contact our team.`)
              .then(()=>{
                location.href = "/contactUs"
              })
            }else{
             subscriptionId = response.subscriptionId;
             clientSecret = response.clientSecret;
    
             const appearance = {
              theme: 'night',
              labels: 'floating',
              variables: {
                  borderRadius: '2px', 
                },
          }
    
           elements = stripe.elements({appearance,clientSecret});
           paymentElement = elements.create('payment');
           paymentElement.mount('#payment-element'); 
           paymentElement.on('change',(e)=>{
            document.getElementById("afterPayBtn").innerHTML = ""
            paymentComplete = e.complete
          })
            }                                                                                                                                                             
          }
        })  
    }    
  })

 

    let form = document.querySelector('#payment-form');
    form.addEventListener('submit',async (e)=>{
      e.preventDefault();
      if(paymentComplete){
        document.getElementById("popUpLoader").hidden = false;
        document.getElementById("submit").disabled  = true;
        
        $.ajax({
          url:'/231543', 
          method:'get',
          success:(response)=>{
          }
        })
          document.getElementById("afterPayBtn").innerHTML = "Do not press the back button. Wait for confirmation"
          
          await stripe.confirmPayment({
            elements, 
            confirmParams:{
              return_url: `https://charpstar.co/success`
            }
        }).then((result)=>{
          console.log();
            if(result.error){
              console.log(result.error);
              $.ajax({
                url:'/subscriptionFalse', 
                method:'get',
                success:(response)=>{
                  if(response) swal("Payment canceled").then(()=>{
                    document.getElementById("submit").disabled  = false;
                    document.getElementById("popUpLoader").hidden = true;
                    document.getElementById("afterPayBtn").innerHTML = ""
                  });
                } 
              })
            }else{
              $.ajax({
                url:'/78906', 
                method:'get',
                success:(response)=>{
                }
              })
            }
        })
      }else{
        document.getElementById("afterPayBtn").innerHTML = "Please check the details you entered"
        setTimeout(()=>{
          document.getElementById("afterPayBtn").innerHTML = ""
        },4000)
      }
    })
  })

  // Email validation//
  function validateEmail(){
    let email = document.getElementById("emailID").value;
    let error = document.getElementById("Err_email");
    if(email == ""){
      error.innerHTML = "*Enter your email"
      document.getElementById("companyLabel").style.top = "12.4rem"
      document.getElementById("Submit_btn").disabled = true;
      return false;
    }
    if(!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)){
      error.innerHTML = "*Invalid email";
      document.getElementById("companyLabel").style.top = "12.4rem"
      
      document.getElementById("Submit_btn").disabled = true;
      return false;
    }
    error.innerHTML = "";
    document.getElementById("companyLabel").style.top = "10.9rem"
    document.getElementById("Submit_btn").disabled = false;
    return true;
  }

  function validateCompany(){
    let company = document.getElementById("companyID").value;
    let error = document.getElementById("Err_company");
    if(company == ""){
      error.innerHTML = "*Required";
      document.getElementById("Submit_btn").disabled = true;
      return false;
    }
    error.innerHTML = "";
    document.getElementById("Submit_btn").disabled = false;
    return true;
  }
  // Email validation ends//

  // address form button validation//
  function validateForm(){
    let error = document.getElementById("Submit_err");
    if(validateEmail() && checkAddressForm && validateCompany()){
      error.innerHTML = ""
      document.getElementById("Submit_btn").disabled = false;
      return true;
    }
    else{
      error.innerHTML = "*Invalid credentials or empty fields"
      document.getElementById("Submit_btn").disabled = true;
      return false
    }
  }
  // address form button validation ends// 

  function showPlaceHolder(id,label){
    document.getElementById(id).placeholder = "Email Id"
    document.getElementById(label).style.top = "5.6rem"
    document.getElementById(label).style.left = "4.5rem"
    document.getElementById(label).style.fontSize = "smaller"
  }

  function hidePlaceHolder(id,label){
    if(document.getElementById(id).value == ""){
    document.getElementById(id).placeholder = ""
    document.getElementById(label).style.top = "6.3rem"
    document.getElementById(label).style.left = "4.2rem"
    document.getElementById(label).style.fontSize = "initial"
    }
    
  }

  function showPlaceHolderCompany(id,label){
    document.getElementById(id).placeholder = "Company Name"
    document.getElementById(label).style.top = "10.3rem"
    document.getElementById(label).style.left = "4.5rem"
    document.getElementById(label).style.fontSize = "smaller"
  }
  function hidePlaceHolderCompany(id,label){
    if(document.getElementById(id).value == ""){
    document.getElementById(id).placeholder = ""
    document.getElementById(label).style.top = "10.9rem"
    document.getElementById(label).style.left = "4.2rem"
    document.getElementById(label).style.fontSize = "initial"
    }
    
  }

  let preLoader = document.getElementById('loader');
  function stripeElement(){
    preLoader.style.display = "none";
  }



  


 