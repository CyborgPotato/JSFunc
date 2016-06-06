var win_w = window.innerWidth, win_h = window.innerHeight;

function pxVal (num,per) {
  if (typeof num == 'string') {
    if (num.endsWith("%")) return parseInt(num)/100*win_w;
    else if (num.endsWith("%") && per!=null) return parseInt(num)/100*per;
    else if (num.endsWith("px")) return parseInt(num);
  }
  else if (per!=null) return parseInt(num)/100*per;
  else return parseInt(num)/100*win_w;
}

var plan = function plan (ID,x,y,r,c) {
  return new planet(ID,x,y,r,c);
}

var planet = function planet (ID,x,y,r,c) {
  if ((this.elem = document.getElementById(ID))) {
    if (x!=undefined) this.elem.style.left = pxVal(x)-pxVal(this.elem.style.width)/2+'px';
    if (y!=undefined) this.elem.style.top = pxVal(y)-pxVal(this.elem.style.height)/2+'px';
    if (r!=undefined){this.elem.style.width = pxVal(r)+'px';
    this.elem.style.height = pxVal(r)+'px';}
    if (c!=undefined) this.elem.style.backgroundColor = c;
  }else {
    this.elem = document.createElement('div');
    this.elem.setAttribute('id', ID);
    this.elem.style.position = 'fixed';
    document.body.appendChild(this.elem);
    this.elem = document.getElementById(ID);
    if (x==undefined) x=50;
    if (y==undefined) y=50;
    if (r==undefined) r=15;
    if (c==undefined) c='black';
    this.elem.style.borderRadius = '100%';
    this.elem.style.left = pxVal(x)-pxVal(r)/2+'px';
    this.elem.style.top = pxVal(y,win_h)-pxVal(r,win_h)/2+'px';
    this.elem.style.width = pxVal(r)+'px';
    this.elem.style.height = pxVal(r)+'px';
    this.elem.style.backgroundColor = c;
  }
}

plan.fn = planet.prototype = {
  anim: function(milli) {
    if (milli!=0 && milli) {
      this.a = 1;
      this.time = milli;
    }
    return this;
  },
  pos: function(x,y) {
    x=pxVal(x)-pxVal(this.elem.style.width)/2;
    console.log(x);
    y=pxVal(y,win_h)-pxVal(this.elem.style.height)/2;
    if (this.a==undefined) {
      this.elem.style.left = x+'px';
      this.elem.style.top = y+'px';
    }else {
      console.log(this.time/13);
      var p = (x-pxVal(this.elem.style.left))/(this.time/13);
      var q = (y-pxVal(this.elem.style.top))/(this.time/13);
      console.log(p);
      var elem = this.elem;
      var inter = setInterval(function () {
        //console.log("P,Q : "+p+','+q);
        //console.log("X,Y : "+x+','+y);
        elem.style.left = pxVal(elem.style.left)+p+'px';
        elem.style.top = pxVal(elem.style.top)+q+'px';
        if (((p<0 && pxVal(elem.style.left)<x) || p>0 && pxVal(elem.style.left)>x) && (((q<0 && pxVal(elem.style.top)<y) || q>0 && pxVal(elem.style.top)>y))) clearInterval(inter);
      }, 13);
    }
    return this;
  }
}

window.O = plan;

console.log(win_w);

O('T');
O('T').anim(10000).pos(10,10);
