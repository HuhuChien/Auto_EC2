// $('#form_modal_edit').modal({
//     backdrop: 'static',
//     keyboard: false,  // to prevent closing with Esc button (if you want this too)
 
// })

// $('#form_modal').modal({
//     backdrop: 'static',
//     keyboard: false,  // to prevent closing with Esc button (if you want this too)
  
// })




// setTimeout((function() { 
  
//     $('[data-toggle="popover"]').popover();
//   }),1000);



console.log('apple')

  $('#EC2_disk').on("keypress",function (evt) {
    console.log(evt)
    if (this.value.length == 1 && evt.which == 48 )
    {
       evt.preventDefault();
    }
 });