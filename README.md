# BBC-iPlayer

Simple A/B Testing for BBC iPlayer using Google Analytics for tracking the results. The provided test caches the original site and applies the changes in the DOM.

## Quickstart Guide

* `git clone https://github.com/emanco/BBC-iPlayer.git`
* Create your own Experiment in Google Analytics for tracking conversions on https://developers.google.com/analytics/solutions/experiments-client-side 
* Copy the Experiment ID inside the js file for the experimentID string var. You'll find it in the beginning. Save and close the file once you've done it.
* Include the javascript file in the BBC iPlayer page before the closing body tag, or run the provided demo on a webserver.
* Once the page is loaded the script will ask Google Analytics which version to show: the normal existing one, version A or version B. If you want to target a specific version just add the variable "variant" to the address like this: `?variant=1` If set to zero it will load the default version, 1 will load version A and 2 will load version B. You can see an example here: http://lab.flashedge.net/bbc?variant=1


## Dependencies
* jQuery https://jquery.com/
* Greensock https://greensock.com/