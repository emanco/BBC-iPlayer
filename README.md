# BBC-iPlayer

Simple A/B Testing for BBC iPlayer using Google Analytics for tracking the results. The provided test caches the original site and applies the changes in the DOM.

## Quickstart Guide

* git clone https://github.com/emanco/BBC-iPlayer.git
* Create your own Experiment in Google Analytics for tracking conversions on https://developers.google.com/analytics/solutions/experiments-client-side 
* Copy the Experiment ID inside the js file for the experimentID string var. You'll find it in the beginning. Save and close the file once you've done it.
* Include the javascript file in the BBC iPlayer page before the closing body tag, or run the provided demo on a webserver.