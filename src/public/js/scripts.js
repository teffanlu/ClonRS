$(function() {
  // Publicación 
  $('#post-comment').hide();
  $('#btn-toggle-comment').click(e => {
    e.preventDefault();
    $('#post-comment').slideToggle();
  });
  
  // Solicitud de botón Me gusta
  $('#btn-like').click(function(e) {
    e.preventDefault();
    let imgId = $(this).data('id');
    console.log(imgId)
    $.post('/images/' + imgId + '/like')
      .done(data => {
      console.log('back:', data)
        $('.likes-count').text(data.likes);
      });
  });

  // Eliminar solicitud de botón
  $('#btn-delete').click(function (e) {
    e.preventDefault();
    let $this = $(this);
    const response = confirm('Are you sure you want to delete this image?');
    if (response) {
      let imgId = $(this).data('id');
      $.ajax({
        url: '/images/' + imgId,
        type: 'DELETE'
      })
        .done(function(result) {
          $this.removeClass('btn-danger').addClass('btn-success');
          $this.find('i').removeClass('fa-times').addClass('fa-check');
          $this.append('<span>Deleted!</span>');
        });
    }
  });
});