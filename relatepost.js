// mrp-v1.05（現状ロジックそのまま）
var relatedAry=new Array;

function mrp_input(e){
  for(var t=0;t<e.feed.entry.length;t++){
    var r=new Object,n=e.feed.entry[t];
    r.title=n.title.$t;
    try{r.thumbnail=n.media$thumbnail.url}catch(e){r.thumbnail="noneImage"}
    for(var l=0;l<n.link.length;l++)
      if("alternate"==n.link[l].rel){
        r.link=n.link[l].href;
        break
      }
    for(var i=0,m=0;m<relatedAry.length;m++)
      if(r.link==relatedAry[m].link){
        i=1;
        break
      }
    i||relatedAry.push(r)
  }
}

function mrp_output(e){
  for(var t,r,n,l,a,i=mrpMax<relatedAry.length?mrpMax:relatedAry.length,
      d=document.getElementById("mrp-content"),m=[],s=0;
      m.push(s++)<relatedAry.length;);
  if(m=m.sort(function(){return Math.random()-.5}),
     relatedAry.length<=1)
    (a=document.createElement("p")).textContent="関連する記事はありません。",
    d.appendChild(a);
  else
    for(var p=0;p<i;p++)
      t=relatedAry[m[p]],
      mrpPosturl!=t.link&&(
        (r=document.createElement("div")).setAttribute("class","mrp-post"),
        "noneImage"!=t.thumbnail&&(
          (n=document.createElement("img")).setAttribute("src",t.thumbnail),
          n.setAttribute("class","mrp-post-img"),
          n.setAttribute("width","72"),
          n.setAttribute("height","72"),
          r.appendChild(n)
        ),
        (a=document.createElement("p")).setAttribute("class","mrp-post-title"),
        a.textContent=t.title,
        r.appendChild(a),
        (l=document.createElement("a")).setAttribute("href",t.link),
        l.setAttribute("class","mrp-post-link"),
        r.appendChild(l),
        d.appendChild(r)
      )
}
