
$(window).scroll(function(){
	

      if ($(this).scrollTop() > 70 && $(this).scrollTop() < 700) {
          $('#task_flyout1').addClass('fixed1');
      } else {
          $('#task_flyout1').removeClass('fixed1');
      }
      if ($(this).scrollTop() > 600 && $(this).scrollTop()<1700) {
          $('#task_flyout2').addClass('fixed2');
      } else {
          $('#task_flyout2').removeClass('fixed2');
      }
      if ($(this).scrollTop() > 1900) {
          $('#task_flyout3').addClass('fixed1');
      } else {
          $('#task_flyout3').removeClass('fixed1');
      }

    //   mobile version
      if ($(this).scrollTop() > 0 && $(this).scrollTop() <200) {
        $('#task_flyout1').addClass('lt-fixed1');
    } else {
        $('#task_flyout1').removeClass('lt-fixed1');
    }
    if ($(this).scrollTop() > 1000 && $(this).scrollTop()<1500) {
        $('#task_flyout2').addClass('lt-fixed2');
    } else {
        $('#task_flyout2').removeClass('lt-fixed2');
    }
    if ($(this).scrollTop() > 1500) {
        $('#task_flyout3').addClass('lt-fixed1');
    } else {
        $('#task_flyout3').removeClass('lt-fixed1');
    }


  });

