
function cemail(){
    let value = document.getElementById("c_email").value;
    let err = document.getElementById("c_er_email");
    if(value == ""){
        err.innerHTML = "*Required"
        return false
    }
    if(!value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)){
        err.innerHTML = "*Invalid email id"
        return false
    }
    err.innerHTML ="";
    return true
}

function cname() {
    let value = document.getElementById("c_name").value;
    let err = document.getElementById("c_er_name");
    if(value == "") {
        err.innerHTML = "*Required"
        return false;
    }
    err.innerHTML = "";
    return true;
}

function countryInfo() {
    let value = document.getElementById("c_country").value;
    let err = document.getElementById("c_er_country");
    if(value == "") {
        err.innerHTML = "*Required"
        return false;
    }
    err.innerHTML = "";
    return true;
}

function cphone() {
    let value = document.getElementById("c_phone").value;
    let err = document.getElementById("c_er_phone");
    if(value == "") {
        err.innerHTML = "*Required"
        return false;
    }
    err.innerHTML = "";
    return true;
}

function business() {
    let value = document.getElementById("c_business").value;
    let err = document.getElementById("c_er_business");
    if(value == "") {
        err.innerHTML = "*Required"
        return false;
    }
    err.innerHTML = "";
    return true;
}

function roleInfo() {
    let value = document.getElementById("c_role").value;
    let err = document.getElementById("c_er_role");
    if(value == "") {
        err.innerHTML = "*Required"
        return false;
    }
    err.innerHTML = "";
    return true;
}

function submitInfo(){
    if(!cemail() || !cname() || !countryInfo() || !cphone() || !business() || !roleInfo()){
        return false;
    }
    return true
}

$("#contactInfo").submit((event)=>{
    console.log("called");
    event.preventDefault();
    document.getElementById("succMsg").innerHTML = "Message Sending..."

    $.ajax({
        url: "/contactDetails",
        method:"post",
        data:$("#contactInfo").serialize(),
        success:(response)=>{
            if(response){
                document.getElementById("succMsg").innerHTML = "Message sent successfully. We will get back to you soon!";
                window.setTimeout(()=>{
                    document.getElementById("succMsg").innerHTML = "";
                },5000)
            }else{

            }
        }
    })
})