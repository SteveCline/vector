'use strict';

// map container
var mapContainer = document.getElementById('map');
// information window
var infoWindow = document.getElementById('info-window');
// container for toggle button
var toggleContainer = document.getElementById('toggle-div');
// button to toggle information window
var toggleInfoWindowButton = document.getElementById('toggle-info-window');
// toggle image
var toggleIcon = document.getElementById('toggle-icon');
// add click event listener
toggleInfoWindowButton.addEventListener('click', toggleInfoWindow);

function toggleInfoWindow() {
    // get listing of CSS classes
    var infoWindowClassList = infoWindow.classList;
    var toggleContainerClassList = toggleContainer.classList;
    
    // run logic based upon info window being open or closed
    if (infoWindowClassList.contains('open')) {
        // remove open class
        infoWindowClassList.remove('open');
        toggleContainerClassList.remove('open');
        // add closed class
        infoWindowClassList.add('closed');
        toggleContainerClassList.add('closed');
        // move info window off of screen to the left - css
        mapContainer.style.left = '0px';  
        // refresh map to prevent blank space
        map.invalidateSize();
        // change toggle icon to open button
        toggleIcon.src = '../img/open-arrow.png'
        toggleIcon.title = 'Click to open information window';
    } else {
        // remove closed class
        infoWindowClassList.remove('closed');
        toggleContainerClassList.remove('closed');
        // add open class
        infoWindowClassList.add('open');
        toggleContainerClassList.add('open');
        // move info window to original location
        mapContainer.style.left = '240px'; 
         // refresh map to prevent blank space
        map.invalidateSize();
        // change toggle icon to close button
        toggleIcon.src = '../img/close-arrow.png'
        toggleIcon.title = 'Click to hide information window';
    }   
}