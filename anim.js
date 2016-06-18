(function(window, document) {
  var O = function(sel,cont) {
    return new getNodes(sel,cont);
  },sCs = function(atr,val,par) {
    par.style[atr] = val;
  },sAt = function(atr,val,par) {
    par.setAttribute(atr, val);
  },gCs = function(atr,par) {
    return par.style[atr];
  },gAt = function(atr,par) {
    return par.getAttribute(atr);
  },pxVal = function(atr,par,hOw) {
    var w=window.innerWidth,h=window.innerHeight,m=w>h?w:h,mn=w>h?h:w;
    if (typeof atr=='string') {
      switch (atr.match(/[^0-9.]/gi)) {
        case 'px':
        return parseInt(parseInt(atr));
        case '%':
        return parseInt(parseInt(atr)/100*hOw=='width'?getComputedStyle(par.parentNode)[p]:hOw=='height'?getComputedStyle(par.parentNode):100);
        case 'vw':
        return parseInt(parseInt(atr)/100*w);
        case 'vh':
        return parseInt(parseInt(atr)/100*h);
        case 'vmin':
        return parseInt(parseInt(atr)/100*mn);
        case 'vmax':
        return parseInt(parseInt(atr)/100*m);
        case 'em':
        return val;
        case 'vw':
        return parseInt(parseInt(atr)/100*w);
        case null:
        return parseInt(atr);
      }
    }
    return parseInt(atr);
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
    css: function(sets) { /*FORMAT: {property: value}*/
    for (var i = 0; i < this.l; i++) {
      for (p in sets) {
        sCs(p,sets[p],this[i]);
      }
    }
    return this;
  },
  atr: function(sets) { /*FORMAT: {property: value}*/
  for (var i = 0; i < this.l; i++) {
    for (p in sets) {
      sAt(p,sets[p],this[i]);
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
      diff[p+i]=pxVal(sets[p],this[i],p)-pxVal(getComputedStyle(this[0])[p],this[i],p);
      diff[i+p]=getComputedStyle(this[0])[p];
    }
    else if (csOrAt=='atr') {
      diff[p+i]=pxVal(sets[p],this[i],p)-pxVal(this[i].getAttribute(p),this[i],p);
      diff[i+p]=this[i].getAttribute(p);
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
        for (;i<e.l;i++) {
          e[i]=e[i+1]
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
  else atEnd.call();
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
}
}
window.O = O;
})(window, document);
