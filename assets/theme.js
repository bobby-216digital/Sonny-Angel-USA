// ================================================================================
// theme.js
// Theme only script
// ================================================================================

// shopify init
// --------------------------------------------------------------- //
window.theme = window.theme || {};



// iphone 100vh
// --------------------------------------------------------------- //
// var NEKOKKE = NEKOKKE || {};
// NEKOKKE.VIEW_HEIGHT = {
// 	init : function(){
// 		this.setParameters();
// 		this.setKvHeight();
// 		this.bind();
// 	},
// 	setParameters : function() {
// 		this.$window = $(window);
// 		this.$target = $('.js-front-main');
// 	},
// 	bind : function(){
// 		var _self = this;
// 		this.$window.on('resize',function(){
// 			_self.setKvHeight();
// 		});
// 	},
// 	setKvHeight : function(){
// 		this.$target.css('height',this.$window.height());
// 	}
// };
// $(function() {
// 	NEKOKKE.VIEW_HEIGHT.init();
// } );



$(function() {

	// matchMedia
	// --------------------------------------------------------------- //
	var $query_sp = window.matchMedia('only screen and (max-width: 960px)');
	var $query_tb_pc = window.matchMedia('print, only screen and (min-width: 961px)');


	// sp menu
	// --------------------------------------------------------------- //
	$('.js-bottom-menu').click(function() {
		$(this).toggleClass('bottom-bar-link--close');
		$('.bottom-menu').toggleClass('bottom-menu--active');
	} );



	// tab
	// --------------------------------------------------------------- //
	$('.js-tab').click(function() {
		var id = $(this).closest('.c-tab').attr('id');
		var tab_id = $(this).data('tab');
		$(this).closest('.c-tab').find('.js-tab').removeClass('c-tab-item__link--active');
		$(this).addClass('c-tab-item__link--active');
		
		$('.' + id).hide().removeClass('u-hidden');
		$('#' + tab_id).fadeIn();
		
		return false;
	} );



	// toggle
	// --------------------------------------------------------------- //
	$('.js-toggle').click(function() {
		if ( $(this).hasClass('js-toggle-product') && $query_tb_pc.matches ) {
			return false;
		} else {
			$(this).find('.c-product-toggle-link__icon').toggleClass('c-toggle__icon--active');
			$(this).closest('.c-toggle').find('.c-toggle__content').slideToggle();
			
			return false;
		}
	} );



	// regist birthday select
	// --------------------------------------------------------------- //
	$(document).on('change', '.js-birthday select', function () {
		birthday_func();
	});
	
	birthday_func();
	
	function birthday_func() {
		var $y = $('select[name="year"]').val();
		var $m = $('select[name="month"]').val();
		var $m_num = $('select[name="month"]').prop('selectedIndex');;
		var $d = $('select[name="day"]').val();
		var $birthday = '';
		var $birthday_num = '';
		
		if ( $m ) {
			$birthday += $m;
		}
		if ( $d ) {
			$birthday += '-' + $d;
		}
		if ( $y ) {
			$birthday += '-' + $y;
		}
		
		if ( $y ) {
			$birthday_num += $y + '/';
		}
		if ( $m ) {
			$birthday_num += $m_num + '/';
		}
		if ( $d ) {
			$birthday_num += $d;
		}
		
		if ( $('#customer_tags').hasClass('js-customer-tags-en') ) {
			$('#customer_tags').val($birthday + ',' + $birthday_num + ',English,BD_input_Form,' + $m);
		} else {
			$('#customer_tags').val($birthday + ',' + $birthday_num + ',BD_input_Form,' + $m);
		}
		
	}



	// collection filter toggle
	// --------------------------------------------------------------- //
	$('.js-filter-pull').click(function() {
		$(this).find('.c-filter-pull-title__icon').toggleClass('c-filter-pull-title__icon--close');
		$(this).closest('.c-filter-pull').find('.c-filter-pull-body').toggleClass('c-filter-pull-body--active');
		
		return false;
	} );



	// collection grid button
	// --------------------------------------------------------------- //
	var grid_data = localStorage.getItem('grid');
	
	if ( grid_data === null ) {
		$('.c-filter-grid-item__button--row').addClass('c-filter-grid-item__button--active');
	} else if ( grid_data === 'row' ) {
		grid_row();
	} else if ( grid_data === 'column' ) {
		grid_column();
	}

	$('.js-grid-button').click(function() {
		var dg = $(this).data('grid');
		localStorage.setItem('grid', dg);
		$('.js-grid-button').removeClass('c-filter-grid-item__button--active');
		
		if ( dg === 'row' ) {
			grid_row();
		} else if ( dg === 'column' ) {
			grid_column();
		}
	} );

	function grid_row() {
		$('.c-filter-grid-item__button--row').addClass('c-filter-grid-item__button--active');
		$('#collection').removeClass('c-product-loop--large');
		$('#collection .c-product-item').each(function() {
			$(this).removeClass('c-product-item--large');
		} );
	}
	
	function grid_column() {
		$('.c-filter-grid-item__button--column').addClass('c-filter-grid-item__button--active');
		$('#collection').addClass('c-product-loop--large');
		$('#collection .c-product-item').each(function() {
			$(this).addClass('c-product-item--large');
		} );
	}



	// product detail swiper
	// --------------------------------------------------------------- //
	var swiper_product_thumb = new Swiper('.js-product-thumb', {
		slidesPerView: 'auto',
		paginationClickable: true,
		spaceBetween: 0,
		grabCursor: false,
		centeredSlides: false,
		loop: false,
		freeMode: false,
		roundLengths: true,
		loopedSlides: 8,
		on: {
			slideChange: function () {
				thumb_change(swiper_product_thumb.activeIndex);
			},
		}
	});
	
	var i_ptni = 0;
	$('.p-product-thumb-nav__item').each(function() {
		$(this).find('.p-product-thumb-nav__link').attr('data-nav', i_ptni);
		i_ptni++;
	} );
	
	$('.js-product-thumb-nav').click(function() {
		thumb_change( $(this).data('nav') );
	} );

	function thumb_change(number) {
		$('.p-product-thumb-nav').find('.p-product-thumb-nav__link').removeClass('p-product-thumb-nav__link--active');
		swiper_product_thumb.slideTo(number);
		$('.p-product-thumb-nav__item:eq(' + number + ') .js-product-thumb-nav').addClass('p-product-thumb-nav__link--active');
	}



	// buy variant select
	// --------------------------------------------------------------- //

	// var variant_val = $('.js-variant-select').val();
	// variant_selected(variant_val);
	
	$('.js-select-item').click(function() {
		var data_val = $(this).attr('data-value');
		variant_selected(data_val);
	} );
	
	function variant_selected(value) {
		var target = $('.js-buy-select .js-select-item[data-value=' + value + ']');
		var max_num = target.attr('data-max');
		var input_num = $('.c-buy-num__quantity').val();
		$('.js-select-item').removeClass('c-buy-select-item__link--active');
		target.addClass('c-buy-select-item__link--active');
		
		$('.js-variant-select').val(value);
		$('.c-buy-num__quantity').attr('max', max_num);
		$('.js-buy-alert__num').text(max_num);
		// if ( input_num > max_num ) {
			$('.c-buy-num__quantity').val(1);
		// }
		$('.js-buy-alert').removeClass('c-buy-alert--active');
	}



	// reload
	// --------------------------------------------------------------- //
	$('.js-reload').click(function() {
		window.location.reload();
	} );



	// purchase submit
	// --------------------------------------------------------------- //
	$('.js-purchase-submit').click(function() {
		var check = true;
		$('.js-product-quantity').each(function() {
			var max_num = $(this).find('.c-buy-num__quantity').attr('max');
			var current_num = $(this).find('.c-buy-num__quantity').val();
			max_num = parseInt(max_num);
			current_num = parseInt(current_num);
			if ( current_num > max_num ) {
				$(this).find('.js-buy-alert').addClass('c-buy-alert--active');
				
				setTimeout(function(){
					alert.removeClass('c-buy-alert--active');
				}, 2000);
				
				$('body, html').animate({
					scrollTop: 0
				}, 400);
				
				check = false;
			}
		} );
		
		if ( check === false ) {
			return false;
		}
	} );



	// wish list check & save
	// --------------------------------------------------------------- //
	
	
	
	var wish_list_data = [];
	wish_list_check();
	
	$(document).on('click', '.js-wishlist-link', function(){
		wish_list_check();
		
		$(this).toggleClass('c-wishlist-link--active');
		var $id = $(this).data('wl-id');
		var $title = $(this).data('wl-title');
		var $url = $(this).data('wl-url');
		var $thumb = $(this).data('wl-thumb');
		
		$.when(
			wish_list_toggle($id, $title, $url, $thumb)
		).done(function(){
			localStorage.setItem('wishlist', JSON.stringify(wish_list_data));
			wish_list_check();
		});
		
	} );

	function wish_list_toggle(id, title, url, thumb) {
		var list_target = wish_list_data.find(function (current) {
			return current.id === id;
		});

		if (!list_target) {
			// id がない場合は追加
			wish_list_data.push({ id: id, title: title, url: url, thumb: thumb });
		} else {
			// id がすでにある場合は削除
			wish_list_data.some(function (v, i) {
				if (v.id == id) {
					wish_list_data.splice(i, 1);
				}
			});
		}
	}

	function wish_list_check() {
		wish_list_data = localStorage.getItem('wishlist');
		wish_list_data = JSON.parse(wish_list_data);
		
		if ( wish_list_data === null ) {
			wish_list_data = [];
		} else {
			wish_list_data.forEach(function(val, key) {
				//console.log(val['id']); // id を取得
				$('[data-wl-id="' + val['id'] + '"]').addClass('c-wishlist-link--active');
			});
		}
	}



	// page top
	// --------------------------------------------------------------- //
	$('.js-page-top').click(function(){
		$('body, html').animate({
			scrollTop: 0
		}, 400);

		return false;
	});



	// login page password show
	// --------------------------------------------------------------- //
	var $url = location.href;
	
	if ( $url.indexOf('#recover') != -1 && $url.indexOf('account/login') != -1 ) {
		$('#recover_password').toggleClass('u-hidden');
		$('#customer-login').toggleClass('u-hidden');
		$('#js-guest-login').toggleClass('u-hidden');
		$('#js-password-title').toggleClass('u-hidden');
		$('#js-login-title').toggleClass('u-hidden');
	}



	// pass show
	// --------------------------------------------------------------- //
	$('.js-pass-link').click(function() {
		$('.js-password').show();
	} );




} );
