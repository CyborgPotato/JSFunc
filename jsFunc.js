var win_w = window.innerWidth, win_h = window.innerHeight;

function pxVal (num) {
  console.log(typeof num);
  if (typeof num == 'string') {
    if (num.endsWith("%")) return parseInt(num)/100*win_w;
    else if (num.endsWith("px")) return parseInt(num);
  }
  else return parseInt(num)/100*win_w;
}

function planet (ID,x,y,r,c) {
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
    this.elem.style.top = pxVal(y)-pxVal(r)/2+'px';
    this.elem.style.width = pxVal(r)+'px';
    this.elem.style.height = pxVal(r)+'px';
    this.elem.style.backgroundColor = c;
  }
}

planet('Test');
