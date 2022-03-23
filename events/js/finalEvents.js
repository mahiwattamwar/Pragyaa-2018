// scrolling loginc
var pageScrollLeft = 0;
var pageScrollRight = $(window).width();

var count = 1;

var flag = false;

function shiftToRight() {

	if(pageScrollRight<(300*count)+200){
		pageScrollLeft-=5;
		pageScrollRight+=5;
	}
	$('.whole_event_wrapper').css('left', pageScrollLeft+'px');
}

function shiftToLeft() {
	pageScrollLeft+=4;
	pageScrollRight-=4;
	if(pageScrollLeft>0){
		pageScrollRight +=4;
		pageScrollLeft=0;
		
	}

	$('.whole_event_wrapper').css('left', pageScrollLeft+'px');
}
// scrollling logic ends



// text canging logic
function changeTextOf(p, t) {

		p.css({
		'background-color': 'wheat',
		'font-size': '36px'
		}).html(t);
}



function translateYZERO(id) {
	$(id).css({
		transform: 'translateY(0px)',
		opacity: '1'
	});
}

function translateY20(id) {
	$(id).css({
		transform: 'translateY(20px)',
		opacity: '0'
	});
}



function closeModal() {

	closeContact();

	$("#left, #right").removeClass("hide");

	$('#in_modal').animate({opacity: "0"}, 400);

	setTimeout(function() {
		$('#in_modal').css('display', 'none');
		$('#modal_wrapper').css({
			right: '-75%',
			opacity: '0'
		});

		setTimeout(function() {
			$('#modal_wrapper').css({
				height: '200px',
				top: '50%',
				transform: 'translateY(-50%)'
			});


			setTimeout(function() {
				translateY20('#modal_desc');
				translateY20('#modal_rules');
				translateY20('#modal_coordi');
				translateY20('#modal_register');
			}, 100);


		}, 200);

	}, 200);
}



// modal
function openModal(main, event, data){

	$("#left, #right").addClass("hide");

	$('#modal_event_domain').html(main);
	$('#modal_event_name').html(event);

	var desc = data.attr('data-desc');
	var rule = data.attr('data-rule');
	var gplay = data.attr('data-gameplay');
	var prize = data.attr('data-prize');
	var contactInfo = ""+data.attr('data-coordi-one-name') + "<br/>" + data.attr('data-coordi-one-num') + "<br/><br/>" + data.attr('data-coordi-two-name') + "<br/>" + data.attr('data-coordi-two-num');
	
	$('.desc_text').html(desc);
	$('.rule_text').html(rule);
	$('.gameplay_text').html(gplay);
	$('.prize_text').html(prize);

	$('#scale-demo').html(contactInfo);

	console.log(rule);

	$('#modal_wrapper').css({
		right: '0px',
		opacity: '1'
	});

	setTimeout(function() {
		$('#modal_wrapper').css({
			height: '100%',
			transform: 'translateY(-50%)'
		});
		$('#in_modal').css('display', 'block');
		setTimeout(function() {
			$('#in_modal').css('display', 'block');
			$('#in_modal').css('opacity', '1');

			//animation for inner blocks
			// step 1
			setTimeout(function() {
				translateYZERO('#modal_desc');

				// step 2
				setTimeout(function() {
					translateYZERO('#modal_rules');

					// step 3
					setTimeout(function() {
						translateYZERO('#modal_coordi');
						// step 4

						setTimeout(function() {
							translateYZERO('#modal_register');
						}, 100);

					}, 100);

				}, 200);

			}, 200);

		}, 300);

	}, 300);

}







$(document).ready(function() {


	var db = firebase.firestore();

	var category = $(".whole_event_wrapper").attr("data-category");

	var collectionName = $(".whole_event_wrapper").attr("data-collection-name");

	db.collection(collectionName).get().then(function(querySnapshot) {
    	querySnapshot.forEach(function(doc) {
        	if(count == 1){
        		$("#card1").find(".event_head").html(doc.data().name);
        		$("#card1").find(".sub")
        			.attr("data-desc", doc.data().desc)
        			.attr("data-rule", doc.data().rules)
        			.attr("data-prize", doc.data().prize)
        			.attr("data-gameplay", doc.data().gplay)
        			.attr("data-coordi-one-name", doc.data().cname1)
        			.attr("data-coordi-one-num", doc.data().cnum1)
        			.attr("data-coordi-two-name", doc.data().cname2)
        			.attr("data-coordi-two-num", doc.data().cnum2);
        		
        	}
    		else{
				if(count%2 == 0){
    				$("#card1").clone().attr("id", "card"+count).removeClass("card_1").addClass("card_2").appendTo(".card_wrapper");
	    		}
	    		else{
	    			$("#card1").clone().attr("id", "card"+count).removeClass("card_2").addClass("card_1").appendTo(".card_wrapper");
	    		}
	    		$("#card"+count).find(".event_head").html(doc.data().name);
	    		$("#card"+count).find(".sub")
	    			.attr("data-desc", doc.data().desc)
        			.attr("data-rule", doc.data().rules)
        			.attr("data-prize", doc.data().prize)
        			.attr("data-gameplay", doc.data().gplay)
        			.attr("data-coordi-one-name", doc.data().cname1)
        			.attr("data-coordi-one-num", doc.data().cnum1)
        			.attr("data-coordi-two-name", doc.data().cname2)
        			.attr("data-coordi-two-num", doc.data().cnum2);
	    	}

	    	var text;

	    	$(".sub")
	    		.eq(count-1).hover(function(){
					
				}, function(){
					
				})
				.click(function(){
					openModal($(".whole_event_wrapper").attr("data-category"), text, $(this));
				});
    		count++;


    		if(!flag){
    			var card_1 = $(".card_1");
				var card_2 = $(".card_2");

				if(card_1 != undefined && card_2 != undefined){

					if(card_1.position() != undefined && card_2.position() != undefined){
						var toppos_card_1 = card_1.position().top;
						var toppos_card_2 = card_2.position().top;

						$(document).mousemove(function(event) {

							var cordx = event.pageX;
							var cordy = event.pageY / 10;

							$('.card_1').animate({top: toppos_card_1 - cordy+"px"},5);

							$('.card_2').animate({top: toppos_card_2 + cordy+"px"},5);

					    });

					    flag = true;
					}
				    
				}
			}
    	});




	});




































	// scroll trigger
	var timeOut;
	
	$('#right').hover(function() {
		timeOut = setInterval(shiftToRight, 10);
	}, function() {
		clearTimeout(timeOut);
	});

	$('#left').hover(function() {
		timeOut = setInterval(shiftToLeft, 10);
	}, function() {
		clearTimeout(timeOut);
	});







});