/*!
 * Version: 0.2.2
 * Updated: 16/01/2017
 *
 * @license Copyright (c) 2017. All rights reserved.
 * @author: Emanuele Manco, me@emanuelemanco.com
 */

/*jslint browser: true*/

(function() {
    
    // put your Google Experiment ID here
    var $experimentID = 'Lo1rjfmpRxuVEP00nWv-XA';
    
    
    // load method for javascript libraries
    function loadJS(url) {
        var obj = document.createElement("SCRIPT");
        obj.src = url;
        obj.type = 'text/javascript';
        document.getElementsByTagName("head")[0].appendChild(obj);   
    }
    
    // load libraries
    loadJS('//cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js');
    loadJS('//www.google-analytics.com/cx/api.js?experiment='+$experimentID);
    loadJS('//cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TweenMax.min.js');

    // check if the libraries are loaded and ready
    var ready = function(callback) {
        if (window.jQuery && window.cxApi && window.TweenMax) {
            callback(jQuery);
        } else {
            window.setTimeout(function() { ready(callback); }, 100);
        }
    };

    
    
    // we are ready to go from here, let's rock!
    ready(function($) {
        
        
        var chosenVariant = cxApi.chooseVariation(), // get the analytics variant id
            $w = 0;                                  // window width                
        
        
        
        // All methods for the test are included inside this array
        var test = {
            
            // get the id and link it to the correct function
            init: function(id) {
                 console.log('initializing '+id);
                
                 test.current = parseInt(id);
                
                 switch (test.current) {
                      case 0:
                          test.original();
                      break;
                      case 1:
                          test.a();
                      break;
                      case 2:
                          test.b();
                      break;
                  }
            },
            
            // Don't do anything, just display the original
            original: function() {
                console.log('A/B Test: Original Variant. Nothing changes.');
            },
            
            // Run test A and arrange everything
            a: function() {
                console.log('A/B test: Variant A running...');
                
                // generic fixes
            
                $('.trailers').find('.icon-block').remove();
            
                $('.overlay--text-pull-down.overlay--with-icon .overlay__text__inner, .overlay--text-pull-down.overlay--with-details .overlay__text__inner, .overlay--with-icon .overlay__text__inner, .overlay--with-details .overlay__text__inner').css({
                   verticalAlign: "middle",
                   paddingBottom: "50px"
                });

                $('.overlay--with-icon .overlay__text, .overlay--with-details .overlay__text').css({
                   padding: "0 10px" 
                });
                
                
                // loop through all thumbnail containers
                $('.thumbnail-item').each(function(){
                    
                    // find all objects in the DOM first
                    var $this = $(this),
                        $des = $this.children('.thumbnail-item__desc'),
                        $type = $des.children('.typo--robin'),
                        $title = $des.children('h3'),
                        $sub = $des.children('.thumbnail-item__subtitle'),
                        $thumb = $this.children('.thumbnail-item__img'),
                        $img = $thumb.children('.rs-image').children('picture').children('img'),
                        $over = $thumb.children('.thumbnail-item__overlay'),
                        $iconBlock = $this.find('.icon-block'),
                        $iconLabel = $this.find('.thumbnail-item__icon__label');


                        // fix height of the thumbnail container
                        $this.css({
                           height: 'auto'
                        });

                        // set black background for the play icon
                        $iconBlock.css({
                           backgroundColor:"#000"
                        });
                        
                        // remove the label from the icon container
                        $iconLabel.remove();
                        
                        // stylize the overlay container
                        $over.css({
                            opacity: 1,
                            position: 'relative',
                            width: '100%',
                            height: '130px',
                            display: 'inline-block'
                        });
                        
                        // fix the type text with a span to allow proper display
                        $type.children('.thumbnail-item__desc__label').contents().wrap('<span></span>');
                        
                        // and style it
                        $type.find('span').css({
                                fontSize: "10px",
                                display: "inline-block",
                                backgroundColor: "#f54997",
                                color: "#fff",
                                paddingLeft: "2px",
                                paddingRight: "2px"
                        });
                    
                        
                        // style title container
                        $title.css({
                                marginTop: "2px"        
                        });
                        
                        // and fix the title contents
                        $title.contents().wrap('<span></span>').css({
                                backgroundColor: "rgba(0,0,0,0.8)",
                                padding: "2px",
                                paddingLeft: "3px",
                                paddingRight: "2px"
                        });
                        
                        
                        // wrap the subtitle
                        $sub.contents().wrap('<span></span>');
                        
                        // and style it
                        $sub.find('span').css({
                                fontSize: "13px",
                                backgroundColor: "rgba(0,0,0,0.6)",
                                padding: "2px"
                        });

                        // move description container
                        $des.appendTo($thumb);

                        // move overlay container
                        $over.appendTo($this);

                        $des.css({
                           position: 'absolute',
                           bottom: 0,
                           padding: '0.7em'
                        });


                    // hover effect, zooms images in and colors the icon
                    $this.hover(function(){
                        //console.log('over');
                        TweenMax.to($img, 0.5, {scale:1.1, ease:Cubic.easeInOut});
                        TweenMax.to($iconBlock, 0.5, {backgroundColor: "#f54997"});
                    },function(){
                        //console.log('out');
                        TweenMax.to($img, 0.5, {scale:1, ease:Cubic.easeInOut});
                        TweenMax.to($iconBlock, 0.5, {backgroundColor: "#000"});
                    });


                });
                
                test.arrange();
            },
            
            // Run test B and arrange
            b: function() {
                console.log('A/B test: Variant B running...');
                
                
                // loop through all thumbnail containers
                $('.thumbnail-item').each(function(){
                    
                    // get all needed objects from the DOM
                    var $this = $(this),
                        $thumb = $this.children('.thumbnail-item__img'),
                        $des = $this.children('.thumbnail-item__desc'),
                        $type = $des.children('.typo--robin'),
                        $title = $des.find('h3'),
                        $sub = $des.children('.thumbnail-item__subtitle'),
                        $img = $thumb.children('.rs-image').children('picture').children('img'),
                        $over = $thumb.children('.thumbnail-item__overlay'),
                        $overText = $over.find('.overlay__text'),
                        $iconBlock = $this.find('.icon-block');

                        // style the type text
                        $type.css({
                            fontSize: '11px'
                        });
                    
                        // style the title, slightly bigger
                        $title.css({
                           fontSize: '18px',
                           lineHeight: '1.1' 
                        });
                        
                        // style subtitle with a nice border on top
                        $sub.css({
                           borderTop: '1px solid rgba(255,255,255,0.1)',
                           paddingTop: '6px',
                           marginTop: '5px'
                        });
                        
                        // zoom all images slightly in
                        TweenMax.set($img, {scale:1.1, y:'5%', ease:Cubic.easeInOut});
                        
                        // style overlay container
                        $over.css({
                           opacity: 1,
                           height: '48px',
                           top: 'auto'
                        });
                        
                        // remove the overlay text for more breathing space
                        $overText.remove();
                        
                        // set the icon background color
                        $iconBlock.css({
                           backgroundColor:"#000"
                        });
                    
                    
                        // hover effect, zooms images out and colors the icon
                        $this.hover(function(){
                            //console.log('over');
                            TweenMax.to($img, 0.5, {scale:1, y:'0%',ease:Cubic.easeInOut});
                            TweenMax.to($iconBlock, 0.5, {backgroundColor: "#f54997"});
                        },function(){
                            //console.log('out');
                            TweenMax.to($img, 0.5, {scale:1.1, y:'5%', ease:Cubic.easeInOut});
                            TweenMax.to($iconBlock, 0.5, {backgroundColor: "#000"});
                        });
                        
                        
                });
                
                 test.arrange();
                
            },
            
            // Fixes resizing issues and layout glitches
            arrange: function() {
                $w = $(window).width();
            
                //console.log('arranging, width: '+$w);

                // assuming bbc uses as breakpoint 600px for mobile, style accordingly 
                if ($w<=600) {
                        if (!$('body').hasClass('mobile')) {
                            $('body').addClass('mobile');

                        }

                        // apply this only for the first test
                        if (test.current==1) {
                            $('.thumbnail-item').each(function(){ 
                                    var $j = $(this).find('.thumbnail-item__subtitle');

                                    $j.css({display: 'none'});

                                    $(this).find('.thumbnail-item__overlay').css({
                                       height: '0px',
                                       float: 'left'
                                    });

                                    $(this).find('.overlay__icon').css({
                                       left: 'auto',
                                       right: 0
                                    });
                                });
                        }
                    
                } else {
                        if ($('body').hasClass('mobile')) {
                            $('body').removeClass('mobile');
                        }

                        $('.thumbnail-item').each(function(){
                                var $t = $(this).find('.thumbnail-item__subtitle');

                                $t.css({display: 'block'});
                                
                                // only for first test
                                if (test.current==1) {
                                    $(this).find('.thumbnail-item__overlay').css({
                                       height: '130px',
                                       float: 'none'
                                    });
                                }
                                

                                $(this).find('.overlay__icon').css({
                                   left: 0,
                                   right: 'auto'
                                });
                            });
                }  
            },
            
            current:0
        };
        
        
        
        
        
        // resize listener
        $(window).resize(function () { 
            test.arrange();
        });
        
        
        // grab the var from the url
        function getUrlVars() {
            var vars = {};
            var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
            });
            return vars;
        }
        
        var v = getUrlVars()["variant"];    // parse var

        // check if var is set
        if (v!== '' && v !== null && v !== undefined && v >=0 && v <=2) {
            test.init(v);
        // if not let Google Analytics decide
        } else {
            test.init(chosenVariant);
        }
    });
})();