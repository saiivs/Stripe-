
const template = (title) => `/blogUpload`;
document.getElementById('blogContent').addEventListener('submit', function(e) {
    e.preventDefault();
    let approved = false;
    let title = document.getElementById("titleInput").value;
    let SubInput = document.getElementById("SubInput").value;
    let textArea = document.getElementById("textAreaInput").value;
    let imageFile = document.getElementById("imageInput").value;
    if(title == ""){
        document.getElementById("Err1").innerHTML = "*Required Field"
    }else if(SubInput == ""){
        document.getElementById("Err2").innerHTML = "*Required Field"
    }else if(textArea == ""){
        document.getElementById("Err3").innerHTML = "*Required Field"
    }else if(imageFile == ""){
        document.getElementById("Err4").innerHTML = "*Required Field"
    }
    else{
        approved = true;
    }
    if(approved){
        this.action = template(this.elements["title"].value);
        this.submit();
    }
    
});
    



let image = ""
function imageUpload(event){
    image = event.target.files[0];

}