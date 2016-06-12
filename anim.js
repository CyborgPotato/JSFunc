(function(window, document) {
  var O = function(sel,cont) {
    return new getNodes(sel,cont);
  },pI = parseInt
  ,pIs = function(val) {
    return val.match(/(\d[\d\.]*)/g);
  },atrVal = function(val,parent,per) {
    let w=window.innerWidth,
    h=window.innerHeight,
    f=document.createElement('div').style.fontSize;
    if (typeof val == 'string') {
      if (val.endsWith("%")&&!parent&&!per)return pI(val)/100*w+'px';
      else if (val.endsWith("%")&&!parent&&per)return pI(val)/100*atrVal(per)+'px';
      else if (val.endsWith("%")&&parent&&per)return pI(val)/100*atrVal(parent[per])+'px';
      else if (val.endsWith("%")&&parent&&!per){console.error("Provide 'per' for : atrVal(val,parent,per)");return null;}
      else if (val.endsWith("px")) return pI(val)+'px';
      else if (val.endsWith("em")) return pI(val)*fs+'px';
      else if (val.endsWith("vw")) return pI(val)/100*w+'px';
      else if (val.endsWith("vh")) return pI(val)/100*h+'px';
      else { let x = pIs(val);x.forEach(function(e){e=pI(e)});return x;}
    }else if (typeof val == 'number') return val+'px';
  },isPx = function(val) {
    if (typeof val == 'string') {
      if (val.endsWith("%"))return 1;
      else if (val.endsWith("px")) return 1;
      else if (val.endsWith("em")) return 1;
      else if (val.endsWith("vw")) return 1;
      else if (val.endsWith("vh")) return 1;
      else return 0;
    }else if (typeof val == 'number') return 0;
  },getNodes = function(sel,cont) {
    if(typeof sel == 'string') {
      if(cont==undefined)cont=document;
      let nds = cont.querySelectorAll(sel);
      for (var i = 0; i < nds.length; i++) {
        this[i] = nds[i];
        console.log(this);
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
    css: function() {
      this.chg='css';
      return this;
    },
    atr: function() {
      this.chg='atr';
      return this;
    },
    anim: function(prop,time,how) { /*FORMAT : {property: value}*/
      if(!time)time=1000;
      if(!how)how='linear';
      let start = null;
      let end={};
      for (p in prop) {
        end[p]=this.get(p);
      }
      function an(t) {
        if(!start)start=t;
        if (how=='linear') {
          for (p in prop) {
            if(isPx(prop[p]))
          }
        }
        if(t-start<time)window.requestAnimationFrame(an);
      }
      window.requestAnimationFrame(an);
    },
    set: function(atr,val) {
      if (this.chg==='css') {
        for (let i = 0; i < this.l; i++) {
          this[i].style[atr] = val;
      }
      }else if (this.chg==='atr') {
        for (let i = 0; i < this.l; i++) {
          this[i].setAttribute(atr, val);
        }
      }else {
        console.error("Error in object : "+this+" please specify css or atr");
      }
      return this;
    },
    get: function(atr) {
      let val=[];
      if (this.chg==='css') {
        for (let i = 0; i < this.l; i++) {
          val[i]=this[i].style[atr];
        }
      }else if (this.chg==='atr') {
        for (let i = 0; i < this.l; i++) {
          val[i]=this[i].getAttribute(atr);
        }
      }else {
        console.error("Error in object : "+this+" please specify css or atr");
      }
      return val;
    }
}
window.O = O;
})(window, document);
