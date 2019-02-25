'use strict';

// information window
var infoWindow = document.getElementById('info-window');
// button to toggle information window
var toggleInfoWindowButton = document.getElementById('toggle-info-window');
// toggle image
var toggleIcon = document.getElementById('toggle-icon');
// add click event listener
toggleInfoWindowButton.addEventListener('click', toggleInfoWindow);

function toggleInfoWindow() {
    // get listing of classes for info window
    var classList = infoWindow.classList;
        
    if (classList.contains('open')) {
        console.log('info window is open');
        // remove open class
        classList.remove('open');
        // add closed class
        classList.add('closed');
        // move info window off of screen to the left - css
        // keep button on edge of screen
        // change icon to open button
        toggleIcon.src = '../img/open-arrow.png'
    } else {
        console.log('info window is closed');
        // remove closed class
        classList.remove('closed');
        // add open class
        classList.add('open');
        // move info window to original location - css
        // change icon to close button
        toggleIcon.src = '../img/close-arrow.png'
    }   
}