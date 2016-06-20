var w_w=window.innerWidth,w_h=window.innerHeight;
window.onload = function  () {
  for (var i = 0; i < 100; i++) {
    O("body").addElem('div','star');
  }
  O(".star").each(function() {
    var e = this;
    function s() {
        O(e).set({left:Math.random()*w_w+"px",
                  top:Math.random()*w_h+"px"});
        O(e).anim({opacity:1},Math.random()*1000,null,function() {
          O(e).anim({opacity:0},Math.random()*1000,null,function() {
            s();
          });
        });
    }
    s();
  });
}
window.onresize = function() {
  w_w=window.innerWidth,
  w_h=window.innerHeight;
}
