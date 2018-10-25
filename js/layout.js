$(function() {
      console.log('layout.js');

      // スクロール系のイベントまとめ
      function scrollArrow(target) {
        var scrollSwitch = 0;
        var scrollArrow = $('#arrowScroll a');
        var headerArrow = $('.header_arrow');
        var scrollTarget = $('#scrollTarget');

        function afterScroll(noAnimate) {
          $('header').addClass('rolled');
          headerArrow.attr('id', 'arrowReturn');
          scrollSwitch = 1;
        };

        function beforeScroll() {
          if ($('.underPage').length) {

          } else {
            $('header').removeClass('rolled');
            headerArrow.attr('id', 'arrowScroll');
            scrollSwitch = 0;
          }
        };

        function scrollIndex() {
          if (scrollSwitch == 0) {
            $("html, body").animate({
              scrollTop: 1100
            }, 700);
          } else {
            $("html, body").animate({
              scrollTop: 0
            }, 1000);
          }
        }

        function scrollUnder() {
          var offsetHeight = scrollTarget.offset().top;
          if (scrollSwitch == 0) {
            $("html, body").animate({
              scrollTop: offsetHeight
            }, 700);
          } else {
            $("html, body").animate({
              scrollTop: 0
            }, 1000);
          }
        }

        function init() {
          $('.header_arrow a').on({
            'click': function() {
              if (document.getElementById('top')) {
                scrollIndex();
              } else {
                scrollUnder();
              }
            }
          });

          $(window).on({
            'scroll': function() {
              var scroll = $(window).scrollTop();
              if (scroll > 100) {
                if (scrollSwitch == 0) {
                  afterScroll();
                }
              } else {
                if (scrollSwitch == 1) {
                  beforeScroll();
                }
              }
              if (document.getElementById('index')) {
                $("section").each(function() {
                  var sectionimgPos = $(this).offset().top;
                  var sectionscroll = $(window).scrollTop();
                  var windowHeight = $(window).height();
                  if (sectionscroll + 90 > sectionimgPos - windowHeight + windowHeight) {
                    var setClass = $(this).attr('id');
                    $('body').removeClass('main topConcept product01 product02 product03 product04 product05 product06 topGift topCF topJournal instagram');
                    $('body').addClass(setClass);
                  };
                });

                $(".effect").each(function() {
                  var imgPos = $(this).offset().top;
                  var scroll = $(window).scrollTop();
                  var windowHeight = $(window).height();
                  if (scroll > imgPos - windowHeight + windowHeight / 5) {
                    var animateType = $(this).attr('animate');
                    $(this).css({
                      'opacity': '1'
                    });
                    $(this).addClass(animateType);
                  };
                });

              }
            }
          });
        };
        init();
      }

      scrollArrow($('body'));

      //ハンバーガーメニューの開閉

      function humMenuToggle(target) {
        var humButton = target.find('a');
        var closeBtn = $('#closeButton');
        var menuBg = $('#slideBg');
        var menuState = 0;
        var current_scrollY;

        function humMenuShift() {
          if (menuState == 0) {
            current_scrollY = $(window).scrollTop();
            $('#slideMenu').addClass('open');
            menuState = 1;
          } else {
            $('#slideMenu').removeClass('open');
            menuState = 0;
          }
        }

        function init() {
          humButton.on({
            'click': function() {
              humMenuShift();
            }
          });
          closeBtn.on({
            'click': function() {
              humMenuShift();
            }
          });
          menuBg.on({
            'click': function() {
              humMenuShift();
            }
          });
        }

        init()

      };

      humMenuToggle($('#headerNav'));


      //ポップアップメニューの開閉

      function popMenuToggle(target) {
        var closeBtn = $('#popClose');
        var menuBg = $('#popBg');
        var popState = 0;
        var popContent = [];
        var popButton = [];
        var popTitle = [];

        function popMenuEdit(e){
          if (document.getElementById('apply')) {
            $('.pop_item').css({'display': 'none'});
            $('.' + popContent[e]).css({'display': 'block'});
            $('#itemName').text(popTitle[e]);
          }else if (document.getElementById('doctorList')) {

          }
          popMenuShift();
        }

        function popMenuShift() {
          if (popState == 0) {
            target.addClass('popOpen');
            popState = 1;
          } else {
            target.removeClass('popOpen');
            popState = 0;
          }
        }

        function init() {

          if (document.getElementById('apply')) {
            $(".help").each(function(index) {
              popContent[index] = $(this).attr('popup');
              popTitle[index] = $(this).attr('popTitle');
              $(this).on({
                'click': function() {
                  popMenuEdit(index);
                }
              });
            });
          }

          if (document.getElementById('doctorList')) {
            $("#doctors").each(function(index) {
              console.log(index);
              popButton[index] = $(this).find('li a');
              popButton[index].on({
                'click': function() {
                  popMenuEdit(index);
                }
              });
            });
          }

          closeBtn.on({
            'click': function() {
              popMenuShift();
            }
          });
          menuBg.on({
            'click': function() {
              popMenuShift();
            }
          });
        }

        init()

      };

      if (document.getElementById('popUp')) {
        popMenuToggle($('#popUp'));
      };

      //チェックボックスの変更を取得
      function checkBoxChange(target) {
        var checkBox = [];
        var checkState = [];
        var checkLabel = [];
        var checkWrap = [];

        function onCheckChange(e) {
          if (checkState[e] == 0) {
            checkLabel[e].addClass('selected');
            checkState[e] = 1;
          } else {
            checkLabel[e].removeClass('selected');
            checkState[e] = 0;
          }
        }

        function init() {
          $(".checkbox").each(function(index) {
            checkBox[index] = $(this);
            checkLabel[index] = $(this).parent('label');
            if(checkLabel[index].hasClass('selected')){
              checkState[index] = 1;
            }else{
              checkState[index] = 0;
            }
            checkBox[index].change(function() {
              onCheckChange(index);
            });
          });
        }

        init();

      }

      checkBoxChange($('body'));

      // ラジオボタンの変更を取得
      function radioChange(target) {

        function onCatChange() {
          var val = $('.radiobutton:checked').val();
          console.log(val);
          $('.selected').removeClass('selected');
          $('.radiobutton:checked').parent('label').addClass('selected')
        }

        function init() {
          $('.radiobutton').change(function() {
            onCatChange();
          });
        }

        init();

      }

        radioChange();

      //医師一覧のチェックボックスの変更を取得

      function changeDoctorBox(target) {
        var checkBox = [];
        var checkButton = [];
        var checkState = [];
        var checkLabel = [];
        var checkWrap = [];

        function onCheckChange(e) {
          if (checkState[e] == 0) {
            checkBox[e].removeClass('removed');
            checkState[e] = 1;
          } else {
            checkBox[e].addClass('removed');
            checkState[e] = 0;
          }
        }

        function init() {
          $("li").each(function(index) {
            checkBox[index] = $(this);
            checkButton[index] = $(this).find('.checkbox');
            checkLabel[index] = checkButton[index].parent('label')
            if(checkLabel[index].hasClass('selected')){
              checkState[index] = 1;
            }else{
              checkState[index] = 0;
            }
            checkBox[index].change(function() {
              onCheckChange(index);
            });
          });
        }

        init();

      }

      if (document.getElementById('doctorList')) {
        changeDoctorBox($('doctors'));
      }

      //医師一覧のチェックボックスの値を制御

      function checkNumControl(target){
        var itemNum = target.find('li').length;
        var tokyo = $('#tokyo');
        var tokyoState = 1;
        var fukuoka = $('#fukuoka');
        var fukuokaState = 1;
        var checkBox = [];

        function onCheckChange(){
          var num = target.find('.selected').length;
          $('#selectedNum').text(num);
        }

        function init(){
          $('#totalNum').text(itemNum);
          $('#allNum').text(itemNum);
          $('#selectedNum').text(itemNum);
          $("li").each(function(index) {
            checkBox[index] = $(this).find('.checkbox')
            checkBox[index].change(function() {
              onCheckChange();
            });
          });
          tokyo.change(function() {
            $('.tokyo').each(function(index) {
              $(this).find('input').click();
            });
          });
          fukuoka.change(function() {
            $('.fukuoka').each(function(index) {
              $(this).find('input').click();
            });
          });
        }

        init();

      }

        if (document.getElementById('doctorList')) {
            checkNumControl($('#doctors'));
        }


    /*  $('#searchDoctor').select2({
        ajax: {
          url: 'https://raw.githubusercontent.com/kumazaki0418/medicalnote_local/master/sample_data/suggest_diseases.json',
          dataType: 'json'
        }
      });
      $('#serchForm').select2({
        ajax: {
          url: 'https://raw.githubusercontent.com/kumazaki0418/medicalnote_local/master/sample_data/suggest_diseases.json',
          dataType: 'json'
        }
      });
      $('#serchForm2').select2({
        ajax: {
          url: 'https://raw.githubusercontent.com/kumazaki0418/medicalnote_local/master/sample_data/suggest_diseases.json',
          dataType: 'json'
        }
      });

      */


      // LPのスライダー

      if (document.getElementById('index')) {
        $('#slickSlider').slick({
          infinite: true,
          dots: true,
          slidesToShow: 1,
          centerMode: true,
          centerPadding: 'calc(50% - 300px)',
          autoplay: true,
          responsive: [{
            breakpoint: 700,
            settings: {
              centerPadding: '5%',
            }
          }]
        });
        (function(b) {
          b.fn.tile = function(t) {
            var c, q, o, p, s, n = this.length - 1,
              a, u;
            if (!t) {
              t = this.length
            }
            this.each(function() {
              a = this.style;
              if (a.removeProperty) {
                a.removeProperty("height")
              } else {
                if (a.removeAttribute) {
                  a.removeAttribute("height")
                }
              }
            });
            return this.each(function(d) {
              p = d % t;
              if (p == 0) {
                c = []
              }
              q = c[p] = b(this);
              u = (q.css("box-sizing") == "border-box") ? b.fn.outerHeight : b.fn.innerHeight;
              s = u.apply(q);
              if (p == 0 || s > o) {
                o = s
              }
              if (d == n || p == t - 1) {
                b.each(c, function() {
                  u.apply(this, [o])
                })
              }
            })
          }
        })(jQuery);
        $(window).on("load resize", function() {
          $("#slickSlider .item_box").tile();
        })
      }


      //医師側ログイン画面の利用規約同意制御

      function agreePolicy(){
        var submitButton = $('#submitButton');
        var submitWrap = $('.submit_wrap');
        var agreeButton = $('#agree');
        var agreeState = 0;

        function submitPermit(){
          if(agreeState == 0){
            submitButton.attr('disabled', false);
            submitWrap.removeClass('disable');
            agreeState = 1;
          }else{
            submitButton.attr('disabled', true);
            submitWrap.addClass('disable');
            agreeState = 0;
          }
        }

        function init(){
          submitButton.attr('disabled', true);
          submitWrap.addClass('disable');
          agreeButton.change(function() {
            submitPermit();
          });
        }

        init();

      }

      if (document.getElementById('loginFirst')) {
        agreePolicy();
      }

      //マッチングリストのナンバリング
      




});
