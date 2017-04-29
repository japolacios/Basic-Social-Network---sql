;
(function($, window) {

    $(function() {

        window.requestAnimFrame = (function() {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                function(callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
        })();

        var Nitrous = function() {

            var popup = null;

            function createModal() {
              console.log('Creating Modal');
                $('body').addClass('modal');
            }

            function centerPopup(){
              var yPos = 0;
              var xPos = 0;
              if(popup){
                yPos = ($(window).height() - popup.height())/2;
                xPos = ($(window).width() - popup.width())/2;
                popup.addClass('animable');
                popup.css({
                  'top': yPos,
                  'left' : xPos
                });
              } 
            }

            function openModal(event){
              event.stopPropagation();
              createModal();
              popup = $('.popup');
              centerPopup();
              popup.css({
                'display':'block'
              }); 
            }


            function closeModal(event){
              if(popup){
                var target = $(event.target);
                if (!target.parents('.popup').length ) {
                  $('body').removeClass('modal');
                  popup.css({
                    'display':'none'
                  });
                  popup = null;
                }  
              }
            }


            function onWindowResize(event){
              centerPopup();
            }

            function addLiteners(){
              $('.modal-button').on('click', openModal);
              $(window).resize(onWindowResize);
              $(document.body).on('click', closeModal)
            }

            addLiteners();

        }();



    });
}(jQuery, window));
