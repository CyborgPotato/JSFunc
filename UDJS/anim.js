(function(window, document) {
  var O = function(sel,cont) {
    return new getNodes(sel,cont);
  },sCs = function(atr,val,par) {
    par.style[atr] = val;
  },sAt = function(atr,val,par) {
    par.setAttribute(atr, val);
  },gCs = function(atr,par) {
    return window.getComputedStyle(par)[atr];
  },gAt = function(atr,par) {
    return par.getAttribute(atr);
  },pxVal = function(atr,par,hOw) {
    var w=window.innerWidth,h=window.innerHeight,m=w>h?w:h,mn=w>h?h:w;
    if (typeof atr=='string') {
      var end = atr.match(/[^0-9.]/gi)?atr.match(/[^0-9.]/gi).join(''):atr.match(/[^0-9.]/gi);
      switch (end) {
        case 'px':
        return parseFloat(parseFloat(atr));
        case '%':
        return parseFloat(parseFloat(atr)/100*hOw=='width'?getComputedStyle(par.parentNode)[p]:hOw=='height'?getComputedStyle(par.parentNode):100);
        case 'vw':
        return parseFloat(parseFloat(atr)/100*w);
        case 'vh':
        return parseFloat(parseFloat(atr)/100*h);
        case 'vmin':
        return parseFloat(parseFloat(atr)/100*mn);
        case 'vmax':
        return parseFloat(parseFloat(atr)/100*m);
        case 'em':
        return val;
        case 'vw':
        return parseFloat(parseFloat(atr)/100*w);
        case null:
        return parseFloat(atr);
      }
    }
    return parseFloat(atr);
  },getNodes = function(sel,cont) {
    if(typeof sel == 'string') {
      if(cont==undefined)cont=document;
      var nds = cont.querySelectorAll(sel);
      for (var i = 0; i < nds.length; i++) {
        this[i] = nds[i];
      }
      this.l = nds.length;
    }else if (sel instanceof HTMLElement || sel instanceof Node) {
      this[0] = sel;this.l=1;
    }else if (sel instanceof NodeList || sel instanceof HTMLCollection) {
      for (var i = 0; i < sel.length; i++) {
        this[i] = sel[i];
      }
      this.l = sel.length;
    }
  };
  O.fn = getNodes.prototype = {
    set: function(sets) { /*FORMAT: {property: value}*/
    for (p in sets) {
      var csOrAt=getComputedStyle(this[0])[p] ? 'css' : 'atr';
      for (var i = 0; i < this.l; i++) {
        if (csOrAt=='css')
          sCs(p,sets[p],this[i]);
        else
          sAt(p,sets[p],this[i]);
      }
    }
    return this;
  },
  rem: function(sets) { /*FORMAT: {property: value}*/
  for (var i = 0; i < this.l; i++) {
    for (p in sets) {
      var csOrAt=getComputedStyle(this[0])[p] ? 'css' : 'atr';
      if (csOrAt=='css')
        sCs(p,null,this[i]);
      else
        this[i].removeAttribute(p);
    }
  }
  return this;
},
anim: function(sets,time,style,atEnd) { /*FORMAT: {property: value}*/
if(!time)time=1000;
if(time=='fast')time=1000;
if(time=='slow')time=2000;
if(style==null)style='linear';
if(style!='linear'&&style!='cubic') console.error("Style '"+style+"' not defined");
if(!atEnd)atEnd=function(){};
var c=0,t,csOrAt,
diff={},
sType={};/*Is it of type string or number*/
for (p in sets) {
  csOrAt=getComputedStyle(this[0])[p] ? 'css' : 'atr';
  sType[p] = typeof sets[p]=='string' ? sets[p].match(/[^0-9.]/gi) ? sets[p].match(/[^0-9.]/gi)=='rgb(,,)'?'rgb':'px':'n':'n'; //Check of set value is a number : 100 | '100', or a string : '10px'
  sets[p] = sType[p]=='n'?sets[p]//Is it a number? Keep it the same
  :sType[p]=='px'?sets[p]://Is it a pixel type? Convert it to such
  sType[p]=='rgb(,,)'?'NOT DONE YET':null//rgb animation function not added yet...
  for (var i = 0; i < this.l; i++) {
    if (csOrAt=='css') {
      diff[p+i]=pxVal(sets[p],this[i],p)-pxVal(gCs(p,this[i]),this[i],p);
      diff[i+p]=gCs(p,this[i]);
    }
    else if (csOrAt=='atr') {
      diff[p+i]=pxVal(sets[p],this[i],p)-pxVal(gAt(p,this[i]),this[i],p);
      diff[i+p]=gAt(p,this[i]);
    }
    else;
  }
  // var csOrAt=getComputedStyle(this[0])[p] ? 'css' : 'atr';
  // sEnd[p] = typeof sets[p]=='string' ? sets[p].match(/[^0-9.]/gi).join('') : null; /*Retrieve all the endings of the values*/
  // for (var i = 0; i < this.l; i++)
  //   if (csOrAt=='css')
  //     sEnd[p+i]=getComputedStyle(this[0])[p].match(/[^0-9.]/gi).join('');
  //   else if (csOrAt=='atr')
  //     sEnd[p+i]=this[i].getAttribute(p);
}
var e=this;
function ani (timeStamp) {
  if(!t)t=timeStamp;
  c=(timeStamp-t)/time;
  for (p in sets) {
    csOrAt=getComputedStyle(e[0])[p] ? 'css' : 'atr';
    for (var i=0;i<e.l;i++) {
      if (e[i].getAttribute('isAnim')=='false') {
        e[i].removeAttribute('isAnim');
        e.l--;
        for (var k=i;k<e.l;k++) {
          e[k]=e[k+1]
        }
        delete e[e.l+1]
      }
      if (csOrAt==='css') {
        if (c<1) {
          e[i].setAttribute('isAnim', 'true');
          e[i].style[p]=(pxVal(diff[i+p])+c*(pxVal(diff[p+i]))).toString().concat(sType[p]=='px'?'px':'');
        }else {
          c=1;
          e[i].style[p]= pxVal(sets[p]);
        }
      }else if (csOrAt==='atr') {
        if (c<1) {
          e[i].setAttribute('isAnim', 'true');
          e[i].setAttribute(p, pxVal(diff[i+p])+c*(pxVal(diff[p+i])));
        }
        else {
          c=1;
          e[i].setAttribute(p, pxVal(sets[p]));
        }
      }else;
    }
  }
  if(c<1)window.requestAnimationFrame(ani);
  else {atEnd();}
}
window.requestAnimationFrame(ani);
return this;
},
stop: function() {
  for (var i = 0; i < this.l; i++) {
    if (this[i].getAttribute('isAnim')=='true') {
      this[i].setAttribute('isAnim', 'false');
    }
  }
  return this;
},
on: function(click,func) {
  for (var i = 0; i < this.l; i++) {
    this[i].addEventListener(click,func);
  }
  return this;
},
addElem: function(t,c) {
  for (var i = 0; i < this.l; i++) {
    var e = document.createElement(t);
    e.setAttribute('class', c);
    this[i].appendChild(e);
  }
  return this;
},
each: function(fn) {
  for (var i = 0; i < this.l; i++) {
    fn.call(this[i]);
  }
}
}
window.O = O;
})(window, document);
