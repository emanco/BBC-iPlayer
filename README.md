# BBC-iPlayer

Simple A/B Testing for BBC iPlayer using Google Analytics for tracking the results. The provided test caches the original site and applies the changes in the DOM.

## Quickstart Guide

* git clone https://github.com/emanco/BBC-iPlayer.git
* Create your own Experiment in Google Analytics (https://developers.google.com/analytics/solutions/experiments-client-side)
* Copy the Experiment ID inside the js file for the experimentID string var.
* Include the javascript file in the page, or run the provided demo with the correct Experiment ID.