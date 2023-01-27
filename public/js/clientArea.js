$("#formTable").submit((e)=>{
    e.preventDefault();
    let tableArr = document.querySelectorAll('table tr');
    let newArr = [...tableArr]
    newArr.shift()
    let empty = 0;
    let error = false;
   for(let i =0; i<newArr.length; i++){
    empty = 0;
    let row = newArr[i].querySelectorAll('td input');

        for(let j = 0 ; j < row.length ; j++){
            if(row[j].value == ""){
                empty = empty + 1;
            }
        }
        if(i == 0 && empty == 3){
            error = true;
            break;
        }
        if(empty != 3 && empty !=0){
            error = true;
            break;
        } 

   }
   if( !error){
    const BtnElement = document.querySelector(".js_btn-animation-trigger");
    const pendingClassName = "loading-btn--pending";
    const successClassName = "loading-btn--success";
    const failClassName = "loading-btn--fail";
    const stateDuration = 1000;
    
    BtnElement.classList.add(pendingClassName);
    
    $.ajax({
        url:"/googleSheets",
        method:"post",
        data:$("#formTable").serialize(),
        success:(response)=>{
            if(response){
                BtnElement.classList.remove(pendingClassName);
                BtnElement.classList.add(successClassName);
                window.setTimeout(
                    () => BtnElement.classList.remove(successClassName),
                    stateDuration
                  );
            }else{
                BtnElement.classList.remove(pendingClassName);
                BtnElement.classList.add(failClassName);
                window.setTimeout(
                    () => BtnElement.classList.remove(failClassName),
                    stateDuration
                  );
            }
        }
    })
}else{
    document.getElementById('tabBtn').disabled = true;
    document.getElementById('Err').innerHTML = "Missing some values"
    setTimeout(()=>{
        document.getElementById('tabBtn').disabled = false;
        document.getElementById('Err').innerHTML = ""
    },2500)
}    
})




