function cancelSubscription (elementId,userId){
    
    swal({
        title: "Are you sure?",
        text: "To cancel the subscription!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("Subscription canceled", {
            icon: "success",
          }).then(()=>{
            let element = document.getElementById(elementId);
            element.classList.remove("viewBtn");
            element.classList.add("CancelBtn");
            element.innerHTML = "Canceled";

            $.ajax({
                url:`/admin/cancelSubscription/${userId}`,
                method:'get',
                success:()=>{

                }
            })
          });
         
        } else {
          swal("Subscription is active!");
        }
      });
   
}