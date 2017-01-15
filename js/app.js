/*!
 * Version: 0.2.2
 * Updated: 13/01/2017
 *
 * @license Copyright (c) 2017. All rights reserved.
 * @author: Emanuele Manco, me@emanuelemanco.com
 */

/*jslint browser: true*/
/*jshint -W030 */
/*global jQuery */

(function() {
    
    // Put your Google Experiment ID here
    var $experimentID = 'URf4iudrS06Xnyv-2VfExA';
    
    // Load jQuery
    var jq = document.createElement("SCRIPT");
    jq.src = '//cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js';
    jq.type = 'text/javascript';
    document.getElementsByTagName("head")[0].appendChild(jq);
    
    // Load Google Analytics
    var ga = document.createElement("SCRIPT");
    ga.src = '//www.google-analytics.com/cx/api.js?experiment='+$experimentID;
    ga.type = 'text/javascript';
    document.getElementsByTagName("head")[0].appendChild(ga);

    // Check that both jQuery and Google Analytics are loaded and ready
    var checkReady = function(callback) {
        if (window.jQuery && window.cxApi) {
            callback(jQuery);
        }
        else {
            window.setTimeout(function() { checkReady(callback); }, 100);
            
        }
    };

    // Ready
    checkReady(function($) {
        
        console.log('ready: '+$);
        
        // let analytics decide which test to run, ideally even distributed
        var chosenVariant = cxApi.chooseVariation();
        
        var testVariants = [
          function() {
            console.log('A/B Test: Original Variant. Nothing changes.');
          },  
          function() {   
            console.log('A/B test: Variant #1. ');
              
          },
          function() {  
            console.log('A/B test: Variant #2. ');
              
          },
        ];
        
        // execute the code from the chosen variant picked by Google Analytics
        testVariants[chosenVariant]();
    });
})();