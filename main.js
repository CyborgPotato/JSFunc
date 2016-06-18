// var mouse='out';
// var showToolTip=false;
// function on () {
//   mouse='on'
// }
// function tlTp () {
//   showToolTip=true;
// }
// function slow () {
//   alert('msg');
//   if (mouse=='out') {
//     O("#centre").anim({mSpeed:0},1000,null,tlTp);
//     mouse='on';
//   }else {
//     O("#centre").stop();
//     O("#centre").anim({mSpeed:0},1000,null,tlTp);
//     mouse='on';
//   }
// }
// function norm () {
//   if(!showToolTip) {
//     O(".toolTip").anim({opacity:0},500);
//   }
//   setTimeout(function() {
//     if (mouse=='on') {
//       O("#centre").anim({mSpeed:1});
//       mouse='out';
//     }else {
//       O("#centre").stop();
//       O("#centre").anim({mSpeed:1});
//       mouse='out';
//     }
//   }, 500);
// }
// function showTlTp (e) {
//   if (showToolTip) {
//     O(e).css({zIndex:10});
//     O(".toolTip",e).css({display:'block'}).anim({opacity:1},500,null,function() {
//       showToolTip=false;
//     });
//   }
// }
// O("#centre").on("mouseoever",slow)
//             .on("mouseout",norm)
//             .on("mousemove",on);
O("#centre").on("mouseover",function() {
  O(this).anim({mSpeed:0});
}).on("mouseout",function() {
  O(this).anim({mSpeed:1})
});
