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

      //チェックボックスの変更を取得
      function checkBoxChange(target) {
        var checkBox = [];
        var checkState = [];
        var checkLabel = [];
        var checkWrap = [];

        function onCheckChange(e) {
          console.log(checkState[e]);
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

      //医師一覧のチェックボックスの変更を取得

      function changeDoctorBox(target) {
        var checkBox = [];
        var checkButton = [];
        var checkState = [];
        var checkLabel = [];
        var checkWrap = [];

        function onCheckChange(e) {
          console.log(checkState[e]);
          if (checkState[e] == 0) {
            checkBox[e].removeClass('removed');
            checkState[e] = 1;
            console.log('on');
          } else {
            checkBox[e].addClass('removed');
            checkState[e] = 0;
            console.log('off');
          }
        }

        function init() {
          $("li").each(function(index) {
            console.log(index);
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


});
