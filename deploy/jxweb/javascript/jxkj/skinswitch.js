function skinsSwitch(a,b){if($("#skins").html()==""){return}$("#header").css("z-index","99");$("#skins").toggle()}function skinTo(a){if(a==null||""==a){return}WebClientBean.saveUserMetadata("HOMEPAGE",a,{callback:function(b){$("#skins").hide();window.location.href=contextPath+a}})}function setCurrentSkin(){var a=(location.pathname.match(/skin[^/]+/)||["skinClassics"])[0];a=a.replace(/[A-Z]/,function(b){return"-"+b.toLowerCase()});$("."+a).addClass("active")}$(document).ready(function(){$(".skin-header ul li").click(function(){$(this).addClass("on").siblings().removeClass("on");var b=this.getAttribute("skin");switchStylestyle(window.top,b);createCookie("style",b,365)});var a=readCookie("style");if(a){switchStylestyle(window.top,a)}if(!$("#skinswitch").is(":hidden")){$("#skinAction").on("mouseenter",function(){skinsSwitch()}).on("mouseleave",function(){$("#skins").hide()})}setCurrentSkin()});function switchStylestyle(a,c){console.info(a);$("link[title]",a.document).each(function(e){var h=$(this).attr("href");var g=/skin\/.+?\//;var f=h.match(g);console.info(f);$(this).attr("href",h.replace(f,"skin/"+c+"/"))});var d=a.frames;for(var b=0;b<d.length;b++){switchStylestyle(d[b],c)}}function createCookie(c,d,e){if(e){var b=new Date();b.setTime(b.getTime()+(e*24*60*60*1000));var a="; expires="+b.toGMTString()}else{var a=""}document.cookie=c+"="+d+a+"; path=/"}function readCookie(b){var e=b+"=";var a=document.cookie.split(";");for(var d=0;d<a.length;d++){var f=a[d];while(f.charAt(0)==" "){f=f.substring(1,f.length)}if(f.indexOf(e)==0){return f.substring(e.length,f.length)}}return null}function eraseCookie(a){createCookie(a,"",-1)};