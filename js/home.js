		var particleCanvas;
		var maxParallax, globalPadding, maxShadow;
		
		var cardContainer, cards, cardTitle, categoryImage;
		
		var upperHalf, logoDiv, themeDiv, pragyaaDiv;
		
		var winH, winW, win;
		
		var subcat;
		var notify;

	$(document).ready(function(){
	
		$('.carousel.carousel-slider').carousel();


		setInterval(function(){
			$('.carousel').carousel('next');
		}, 1500);
		
		
		$("*").css({
			margin: 0,
			padding: 0
		});
		
		particleCanvas = $('.particles-js-canvas-el');
		maxParallax = 1.1;	//maximum parallax (1.1 = 110%)
		
		cardContainer = $("#cardContainer");
		cards = $(".categoryCard");
		cardTitle = $(".cardTitle");
		categoryImage = $(".categoryImage");
		upperHalf = $("#upperHalf");
		logoDiv = $("#logo");
		themeDiv = $("#theme");
		pragyaaDiv = $("#pragyaa");
		subcat = $(".subcategory");

		notify = $("#notify");


		
		
		subcat.addClass("btn").css({
			
		});
		
		
		win = $(window);
		
		setup();
		
		$(".modal-header").css({
			padding: "10px"
		});
		
		$(".modal-body").css({
			padding: "20px"
		});
		
		$('.modal').modal().height(winH/2).width(winW/2).css({
			top: winH/4,
			left: winW/4,
			fontSize: "20px",
			textAlign: "center"
		}).find(".modal-close").css({
			right: "10px"
		});
		
		win.resize(setup);
		
		//parallax logic
		win.on("mousemove", function(e){
			var mouseX = e.clientX;
			var mouseY = e.clientY;
			var dx = ((winW/2 - mouseX)/(winW/2))*(maxParallax - 1.02)*winW;
			var dy = ((winH/2 - mouseY)/(winH/2))*(maxParallax - 1.02)*winH;
			
			particleCanvas.css({
				transform: "translateX("+dx+"px) translateY("+dy+"px)"
			});
			
			for(var i=0; i<cards.length; i++){
				var card = cards.eq(i);
				var dxx = -((winW/2 - mouseX)/(winW/2))*maxShadow;
				var dyy = (i%2 == 0 ? -1 : 1)*((winH/2 - mouseY)/(winH/2))*maxShadow;
				
				card.css({
					transform: "translateX("+dxx+"px) translateY("+dyy+"px)"
				});
			}
		});
		
		var cd = new CountDown();
		cd.setDimensions(0.8*winW, 0.1*winW, 0.2*winW);
		cd.setTime({
			year: 2018,
			month: 3,
			day: 16
		});
		
		//cd.makeChildOf(document.getElementById("frontContent"));
		
		cd.start();
		
		
		//alert(document.getElementById("xyz"));
		
		var flipper = new Flipper(10, 10, 200, 200);
		
		flipper.attach(document.body);
		flipper.setFront(cd.getInElementForm());
		
		var backElem = document.createElement("div");
		backElem.style.width = "100%";
		backElem.style.height = "100%";
		backElem.innerHTML = "16th, 17th, 18th March";
		backElem.style.textAlign = "center";
		backElem.style.fontSize = "32px";
		backElem.style.display = "flex";
		backElem.style.alignItems = "center";
		backElem.style.color = "white";
		backElem.style.fontFamily = "batmanForever";
		backElem.style.fontSize = "16px";
		
		flipper.setBack(backElem);
		
		setInterval(function(){
			flipper.flip();
		}, 5000);
		
		
	});
	
	function setup(){
		winH = window.innerHeight;
		winW = window.innerWidth;
		
		globalPadding = winW/14;	//padding for card container
		maxShadow = winW/76.45;
		
		$(document.body).css({
			perspective : "800px",
			transformStyle: "preserve-3d"
		});
		
		//scale particle js canvas for parallax
		
		particleCanvas.css({
			transform: "scale("+maxParallax+")"
		});

		notify.css({
			position: "absolute",
			width: winW/5,
			top: winH/90,
			right: 0.01*winW,
			opacity: 0.75,
			transitionDuration: "0.5s"
		}).hover(function(){
			$(this).css({
				opacity: 1,
			});

			clearInterval(interval);
		}, function(){
			$(this).css({
				opacity: 0.5,
			});

			interval = setInterval(autoOpen, 2000);
		});


		var current = 0;

		var interval = setInterval(autoOpen, 2000);

		function autoOpen(){
			notify.collapsible('open', current);
			current++;
			if(current==2)
				current = 0;
		}
		

		notify.find(".collapsible-header").css({
			padding: 7,
			fontSize: 15,
			
		});

		notify.find(".collapsible-body").css({
			padding: 10,
			fontSize: 12,
			paddingLeft: 30
		});

		$(".badge").css({
			position: "absolute",
			padding: 2,
			right: 7,
			fontSize: 9
		});
		
		//upperhalf part of the page which contains theme, logo, etc
		
		upperHalf.css({
			position: "absolute",
			left: 0,
			top: 0,
			height: winH/2,	// window.innerHeight/2
			width: winW,	// window.innerWidth/2
		}).addClass("center");	//for centering the logo, theme, etc
		
		//css for "pragyaa 2018" container
		pragyaaDiv.css({
			height: upperHalf.height()/4,
			width: winW,
			padding: globalPadding/2 + "px",
			fontFamily: "batmanForever"
		}).addClass("white-text");
		
		//css for logo
		logoDiv.css({
			position: "absolute",
			height: upperHalf.height()/2,
			width: upperHalf.height()/2,
			transform: "scale(1.2)",
			left: (winW - upperHalf.height()/2)/2 +"px"
		});
		
		//css for "speranza reaching out the inner you" image
		
		themeDiv.css({
			position: "absolute",
			left: (winW - upperHalf.height())/2 + "px",
			top: parseInt(logoDiv.css("top")) + logoDiv.height() + "px",
			height: upperHalf.height()/4,
			width: upperHalf.height()
		});
		
		//lowerhalf of web page containing cards
		cardContainer.css({
			position: "absolute",
			left: globalPadding + "px",
			top: winH/2 + "px",
			height: winH/2,
			width: winW - 2*globalPadding
		});
		
		//css for each card
		cards.css({
			borderRadius: "3%",
			//border: "2px solid teal",
			overflow: "hidden",
			position: "absolute",
			top: (cardContainer.height() - 1.37*(cardContainer.width() - (cards.length+1)*globalPadding)/cards.length)/2  + "px",
			height: 1.37*(cardContainer.width() - (cards.length+1)*globalPadding)/cards.length,
			width: (cardContainer.width() - (cards.length+1)*globalPadding)/cards.length,
		});
		
		cardTitle.css({
			position: "absolute",
			font: "museo",
			fontSize: "1.0rem",
			textAlign: "center",
			padding: "0.3rem",
			top: 0.85*cards.height()/2 + "px",
			left: 0,
			background: "rgba(200, 200, 200, 0.5)",
			height: 0.15*cards.height(),
			width: cards.width(),
			transitionDuration: "0.3s",
			transform: "scale(0.8) translateX("+(-0.12*cards.width())+"px)"
		});
		
		
		//css for card image
		categoryImage.css({
			transformOrigin: "0 0",
			transitionDuration: "0.3s"
		});
		
		cards.each(function(){
			$(this)
			.children(".subcategory")
			.each(function(x){
				$(this).css({
					position: "absolute",
					top: $(".cardTitle").height() + 10 + x*($(".cardTitle").height()),
					left: $(".categoryCard").width()*0.1,
					height: $(".cardTitle").height()*0.8,
					width: $(".categoryCard").width()*0.8,
					background: "rgba(200, 200, 200, 0.5)",
					textAlign: "center",
					transform: "scale(0)",
					transitionDuration: "0.3s",
					opacity: 0
				});
			})
			.hover(function(){
				$(this).css({
						background: "rgba(200, 200, 200, 1)",
						transform: "scale(1.1)"
					});
				},function(){
					$(this).css({
						background: "rgba(200, 200, 200, 0.5)",
						transform: "scale(1)"
				});
			}).css("lineHeight", $(".cardTitle").height()*0.8+"px");
		});
		
		for(var i=0; i<cards.length; i++){
			//positioning of cards
			cards[i].style.left = (i+1)*globalPadding + i*cards.width() + "px";
			
			//mouseover and mouseout events for cards
			cards.eq(i).hover(function(){
				$(this).children(".cardTitle").css({
					transform : "translateY("+(-0.85*cards.height()/2)+"px)"
				});
				$(this).children(".categoryImage").css({
					transform : "scale(1.5)",
					opacity: 0.5
				});
				$(this).children(".subcategory").css({
					transform : "scale(1)",
					opacity: 1
				});
				
			}, function(){
				$(this).children(".cardTitle").css({
					transform: "scale(0.8) translateX("+(-0.12*cards.width())+"px)"
				});
				$(this).children(".categoryImage").css({
					transform : "scale(1)",
					opacity: 1
				});
				$(this).children(".subcategory").css({
					transform : "scale(0)",
					opacity: 0
				});
				
			});
		}
	}
