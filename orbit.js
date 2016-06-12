(function(window, document) {
  var pi = Math.PI;
  function orbit () {
    var planets = document.getElementsByClassName('planet');
    for (var i = 0; i < planets.length; i++) {
      var planet = planets[i],
      orbiting = planet.getElementsByClassName('orbit'),
      l = orbiting.length,
      m,
      orbits= new Array(0);
      if(!(m = planet.getAttribute('mSpeed')))m = 1;
      for (var k = 0; k < l; k++) {
        var e = orbiting[k];
        if(e.parentElement!=planet)continue;
        orbits.push(e);
      }
      l=orbits.length;
      for (var j = 0; j < l; j++) {
        var e = orbits[j],/*Grab the next orbit in line*/
        x,y,s,d,tiltX,tiltY,rad,shade;
        /*
        x: x/r, the x ratio cos()
        y: y/r, the y ratio sin()
        s: speed
        d: distance from the centre
        tiltX: tilt along the X axis
        tiltY: tilt along the Y axis
        rad: current radian about the centre
        shade: experimental shadow values
        */
        if(s!=0) {
          e.style.position = "absolute";
          e.style.marginLeft = 0-parseInt(window.getComputedStyle(e).width)/2+'px';
          e.style.marginTop = 0-parseInt(window.getComputedStyle(e).height)/2+'px';
        }
        s = e.getAttribute('speed') || 1;/*~ degree per tick*/
        d = e.getAttribute('dist') || 1;/*d*100% distance from parent*/
        tiltX = e.getAttribute('tiltX') || 1;
        tiltY = e.getAttribute('tiltY')  || 1;
        rad = e.getAttribute('rad') || 0+(2*pi/l)*j;
        rad=Number(rad)+pi/180*s*m/*1 degree per tick multiplied by speed*/
        x=Math.cos(rad);/*Get the current X ratio*/
        y=Math.sin(rad);/*Get the current Y ratio*/
        e.style.left = x*d*100*tiltY+50+'%';
        e.style.top = y*d*100*tiltX+50+'%';
        if(rad>pi)e.style.zIndex='-1';
        else e.style.zIndex='3';
        if(rad>=pi*2)rad=0;
        e.setAttribute('rad', rad);
        if(!e.getAttribute('speed'))e.setAttribute('speed', 1);
        if(!e.getAttribute('dist'))e.setAttribute('dist', 1);
        if(!e.getAttribute('tiltX'))e.setAttribute('tiltY', 1);
        if(!e.getAttribute('tiltY'))e.setAttribute('tiltY', 1);
      }
    }
  }
  function frame () {
    orbit();
    window.requestAnimationFrame(frame);
  }
  window.requestAnimationFrame(frame);
})(window, document);
