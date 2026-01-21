// ===============================
// 目次プラグイン（共通部品版）
// ===============================

// ▼ 3ブログ共通の設定（ブログ側に書く必要なし）
var toc_options = {
  target: ["h2", "h3", "h4"],
  autoNumber: true,
  condTargetCount: 3,
  insertPosition: "firstHeadBefore",
  showToc: true,
  width: "auto",
  marginTop: "20px",
  marginBottom: "20px",
  indent: "20px",
  postBodySelector: ".post-body"
};

// ▼ これ以降は編集不要（元コードそのまま）
;(function(i){
  var j=0;
  document.addEventListener("DOMContentLoaded", function(){
    var p=document.querySelector(toc_options.postBodySelector);
    if(!p) return;
    if(toc_options.target.length==0) return;

    rootContent=h(toc_options,p);
    if(rootContent.children.length>=toc_options.condTargetCount){
      var q=c(rootContent);
      o(q);
    }
  });

  function h(q,p){
    var u=q.target.length;
    var t=function(E,D,w){
      var z=q.target[E];
      var x=E<u-1?q.target[E+1]:"";
      var y="toc_headline_"+(++j);
      var F=g(z,m(D),E+1,y);
      w.children.push(F);
      D.id=y;
      var A=f(D);
      if(x==""){return}
      while(true){
        if(!A){break}
        if(b(A)==z){break}
        if(b(A)==x){
          t(E+1,A,F)
        }else{
          var B=A.getElementsByTagName(x);
          for(var C=0;C<B.length;C++){
            t(E+1,B[C],F)
          }
        }
        var A=f(A)
      }
    };
    var r=g("ROOT","",0);
    var v=p.getElementsByTagName(q.target[0]);
    for(var s=0;s<v.length;s++){
      t(0,v[s],r,"")
    }
    return r
  }

  function c(s){
    var r=document.createElement("div");
    r.classList.add("b-toc-container");
    r.style.marginTop=toc_options.marginTop;
    r.style.marginBottom=toc_options.marginTop;
    if(toc_options.width=="100%"){
      r.style.display="block";
    }else{
      r.style.width=toc_options.width;
    }
    var q=document.createElement("p");
    var w=document.createElement("span");
    var v=document.createElement("span");
    var u=document.createElement("span");
    v.classList.add("b-toc-show-wrap");
    u.classList.add("b-toc-show-wrap");
    var y=document.createElement("a");
    w.innerText="目次";
    v.innerText="[";
    u.innerText="]";
    y.href="javascript:void(0);";
    q.appendChild(w);
    q.appendChild(v);
    q.appendChild(y);
    q.appendChild(u);
    var t=function(z){
      var p=typeof z==="boolean"?z:e(r,"hide");
      if(p){
        y.innerText="非表示";
        r.classList.remove("hide");
      }else{
        y.innerText="表示";
        r.classList.add("hide");
      }
    };
    y.addEventListener("click",t);
    t(toc_options.showToc);
    var x=document.createElement("ul");
    s.children.forEach(function(z,p){
      n(x,z,(p+1)+"")
    });
    r.appendChild(q);
    r.appendChild(x);
    return r
  }

  function n(s,u,w){
    var p=document.createElement("li");
    var q=document.createElement("a");
    p.style.paddingLeft=toc_options.indent;
    s.style.paddingLeft=0;
    q.href="#"+u.id;
    if(toc_options.autoNumber){
      var t=document.createElement("span");
      t.classList.add("toc-number");
      t.innerText=w;
    }
    var v=document.createElement("span");
    v.classList.add("toc-text");
    v.innerText=u.text;
    if(toc_options.autoNumber){
      q.appendChild(t);
    }
    q.appendChild(v);
    p.appendChild(q);
    s.appendChild(p);
    if(u.children.length>0){
      var r=document.createElement("ul");
      p.appendChild(r);
      u.children.forEach(function(y,x){
        n(r,y,w+"."+(x+1))
      })
    }
  }

  function o(q){
    var r=null;
    var p=document.querySelector(toc_options.postBodySelector);
    if(toc_options.insertPosition=="firstHeadBefore"||toc_options.insertPosition=="firstHeadAfter"){
      r=p.querySelector(toc_options.target[0]);
    }else{
      if(toc_options.insertPosition=="top"){
        r=p;
      }
    }
    if(!r){return}
    if(toc_options.insertPosition=="firstHeadBefore"){
      k(r,q);
    }else{
      if(toc_options.insertPosition=="firstHeadAfter"){
        a(r,q);
      }else{
        if(toc_options.insertPosition=="top"){
          k(r,q);
        }
      }
    }
  }

  function g(q,r,p,s){return{tagName:q,text:r,children:[],nestLevel:p,id:s}}
  function m(p){return p.innerText}
  function f(p){return p.nextElementSibling}
  function b(p){return p.tagName.toLowerCase()}
  function e(p,q){return p.classList.contains(q)}
  function l(p){return p.parentNode}
  function a(q,s){var r=l(q);var p=f(q);if(r&&p){r.insertBefore(s,p)}}
  function k(p,r){var q=l(p);if(q){q.insertBefore(r,p)}}

})(window);
