window.addEventListener("pageshow", function ( event ) {   
  if(performance.navigation.type == 2){
    location.reload(true);
 }
 
});
$(document).ready(()=>{ 
 
  if(document.getElementById("Faq").innerHTML == "faq"  ) {
    document.getElementById("faqArea").scrollIntoView()
  }
    document.getElementById('rangeInput').style.paddingLeft = "10rem"
    setTimeout(()=>{
        document.getElementById('rangeInput').style.paddingLeft = "0"
        setTimeout(()=>{
            document.getElementById('rangeInput').style.paddingLeft = "10rem"
            setTimeout(()=>{
                document.getElementById('rangeInput').style.paddingLeft = "0"
            },400)
        },400)
    },400)

   
   
    let dynHeight = document.querySelector('#h-tab3').offsetHeight;
    document.getElementById('h-tab1').style.height = dynHeight;
    
    if(window.screen.width >820){
       document.getElementById('swiperVisibility').hidden = true
    }else{
        document.getElementById('swiperVisibility').hidden = false;
        document.getElementById('h-tab1').hidden = true
        document.getElementById('h-tab2').hidden = true
        document.getElementById('h-tab3').hidden = true
        let dynHeight = document.querySelector('#h2').offsetHeight
        document.getElementById('h1').style.height = dynHeight
    }
    let rangeSlider = function(){
       
        let slider = $('.range-slider'),
            range = $('.range-slider__range'),
            value = $('.range-slider__value');
          
        slider.each(function(){
      
          value.each(function(){

            let value = $(this).prev().attr('value');
            $(this).html(value);
            
          });
      
          range.on('input', function(){
            if(this.value == 0 ){
              $(this).next(value).html(parseInt(this.value) + 1);
              
            }else{
              $(this).next(value).html(this.value);
            } 
          });
        });
       
      };
      rangeSlider(); 

    $(window).resize(()=>{
        
        if(window.screen.width > 768){
            document.getElementById('swiperVisibility').hidden = true
            document.getElementById('h-tab1').hidden = false
            document.getElementById('h-tab2').hidden = false
            document.getElementById('h-tab3').hidden = false
            let dynHeight = document.querySelector('#h-tab3').offsetHeight;
            document.getElementById('h-tab1').style.height = dynHeight;

            document.querySelector('#rangeInput').addEventListener("input",()=>{
               let quantity = document.getElementById('qnt').innerHTML;
               quantity = parseInt(quantity)
               if(quantity>0){
               document.getElementById('qntChange1').innerHTML = `/ month / ${quantity} products`
               document.getElementById('qntChange2').innerHTML = `/ month / ${quantity} products`
               }
               else{
                document.getElementById('A-p').innerHTML = "$" + 7;
                document.getElementById('M-p').innerHTML = "$" + 8;
                document.getElementById('qntChange1').innerHTML = `/ month / products`
                document.getElementById('qntChange2').innerHTML = `/ month / products`
               }
             })
   
         }else{
            let swiper = new Swiper(".mySwiper", {
              slidesPerView: 'auto',
              spaceBetween: 30,
              centeredSlides:true,
              grabCursor:true,
              loop: false,
              pagination: {
              el: ".swiper-pagination",
              clickable: true,
              },
              navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
              },
              });
             document.getElementById('swiperVisibility').hidden = false;
             document.getElementById('h-tab1').hidden = true
             document.getElementById('h-tab2').hidden = true
             document.getElementById('h-tab3').hidden = true
             let dynHeight = document.querySelector('#h2').offsetHeight
             document.getElementById('h1').style.height = dynHeight
         }
    })
   

    // ranging difference
    
     document.querySelector('#rangeInput').addEventListener("input",()=>{
       let quantity = document.getElementById('qnt').innerHTML;
       quantity = parseInt(quantity)
       if(quantity>0){
       let AnnualPrice = quantity * 7;
       let MonthlyPrice = quantity * 8; 
    
       document.getElementById('A-p').innerHTML = "$" + AnnualPrice;
       document.getElementById('M-p').innerHTML = "$" + MonthlyPrice;
       document.getElementById('z').innerHTML = "$" + AnnualPrice;
       document.getElementById('g').innerHTML = "$" + MonthlyPrice;
       if(quantity == 1) quantity = ""
       document.getElementById('qntChange1').innerHTML = `/ month / ${quantity} products`
       document.getElementById('qntChange2').innerHTML = `/ month / ${quantity} products`
       document.getElementById('qnt-Mob-1').innerHTML = `/ month / ${quantity} products`
       document.getElementById('qnt-Mob-2').innerHTML = `/ month / ${quantity} products`
       }
       else{
        document.getElementById('A-p').innerHTML = "$" + 7;
        document.getElementById('M-p').innerHTML = "$" + 8;
        document.getElementById('z').innerHTML = "$" + 7;
        document.getElementById('g').innerHTML = "$" + 8;
        document.getElementById('qntChange1').innerHTML = `/ month / products`
        document.getElementById('qntChange2').innerHTML = `/ month / products`
        document.getElementById('qnt-Mob-1').innerHTML = `/ month / products`
        document.getElementById('qnt-Mob-2').innerHTML = `/ month / products`
       }
     })
    //  ranging difference ends
})

function faq(){
  document.getElementById("faqArea").scrollIntoView
}
// payment page with address form by stripe
function subscription(id){
    let qnt = document.getElementById('qnt').innerHTML;
    $.ajax({
        url:'/plan/Get',
        method:'post',
        data:{
            planId:id,
            quantity:qnt
        },
        success:(response)=>{
           if(response.status) location.href = "/payment"
        }     
    })
}
