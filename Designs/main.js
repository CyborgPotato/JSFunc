var wait=false,
disp=false;
O("#centre").on("mouseover",function() {
  O(this).anim({mSpeed:0},null,null,function() {
    wait=true;
  });
}).on("mouseout",function() {
  var e=this;
  if (!wait) {
    disp=false;
    O(e).stop().anim({mSpeed:1},null,null,function() {
      wait=false;
    });
  }else {
    wait=false;
    O(".toolTip").anim({opacity:0,width:"0vmax",height:"0vmax"},500,null,function() {
      O(".toolTip").rem({display:0,zIndex:0});
      disp=false;
    });
    setTimeout(function() {
      O(e).anim({mSpeed:1}, 500,null);
    }, 500);
  }
});
function toolTip (e) {
  if (!disp){
    O(".toolTip",e).set({display:'block',zIndex:10})
    .anim({opacity: 1,width:"15vmax",height:"12vmax"},500);
    disp=true;
  }
}
O(".orbit").on("mouseover",function() {
  if(wait)
  toolTip(this);
}).on("mousemove",function() {
  if(wait)
  toolTip(this);
});
