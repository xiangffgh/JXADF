function bindTableEvent(a){}function beforeDataTableLoad(a){}function afterLoadDataTable(c,b){var a=$("table","#div_"+c);if(a.length>1){a.addClass("table-layout-fixed")}}function loadDataTable(k,f){beforeDataTableLoad(k);if(getUrlParam("disableDataTable")=="true"){return}var l=false;var p=$("#"+k);if(p.length>0&&$.fn.DataTable.fnIsDataTable(p[0])){return}if(!p.is(":visible")){return}var b=$("thead:first tr:first",p);if(null==b||b.length==0){return}var d=$("thead:first tr",p).length>1;var a=document.documentElement.scrollHeight;var i=p.closest(".fragment-mode").find(".bottom").outerHeight();var r=p.outerHeight();var n=$("tbody",p).height();var j=JxUtil.getClientHeight();var c=JxUtil.getScroll(document.documentElement).scrollY;var g=$("tbody tr",p).length==0;if(f){if(f.scroll!=undefined&&!f.scroll){c=false}}var m=n-(a-j)-2;debug(k+"表格的高度为："+m);if(f&&f.height){c=true;m=f.height}if(p.attr("sheight")){c=true;l=true;m=p.attr("sheight")}if(m<150){if(g){m=42}else{m=150}}var q={aaSorting:[],bAutoWidth:false,bPaginate:false,bLengthChange:false,bFilter:false,bSort:false,bInfo:false,bStateSave:true,bDeferRender:false,oLanguage:{sEmptyTable:getLangString("table.empty")}};var h=getUrlParam("uid");if(!l&&h&&h>0){c=false}if((p.attr("inputmode")!="EDIT"||l)&&p.attr("jboname")!="TOP_ATTACHMENT"&&c){q.sScrollY=m;if(p.closest(".fragment-mode").is(".fragment-mode-inline")){q.sScrollX="100%"}q.sDom="tS";q.fnInitComplete=function(v){var x;$(window).off("resize.resizeDatatable."+k).on("resize.resizeDatatable."+k,function(){clearTimeout(x);x=setTimeout(function(){resizeDataTable(p)},200)});var u=0;if(jx_appType&&jx_appType=="list"){var w=getUrlParam("fromUid");if(""!=w){var s=$("tr[uid!='']",p);for(var t=0;t<s.length;t++){if($(s[t]).attr("uid")==w){u=t;break}}}}else{}v.oScroller.fnScrollToRow(u)}}var o=p.attr("fixedWidth");if(o&&o>JxUtil.getClientWidth()){p.css({width:o})}var e=p.dataTable(q);if(top.window.dataTableCollection){top.window.dataTableCollection[location.href+k]=p}afterLoadDataTable(k,e)}function resizeDataTable(a){if(!a.closest(".fragment-mode").is(".fragment-mode-inline")){a.fnAdjustColumnSizing()}}function tableFilterQuickSearch(a,b){b=$.event.fix(b||window.event);if(b.keyCode=="13"){$(a).blur()}}function tableQuickSearch(a,c){c=$.event.fix(c||window.event);var b=$(a).val();if(c.keyCode=="13"){dwr.engine.setAsync(false);WebClientBean.tableQuickSearch(jx_appNameType,b,{callback:function(){var d=$(a).closest("table");var f=d.siblings("div");if(f.length>0){var e=f.attr("id");getTableData(e)}},errorHandler:errorHandler,exceptionHandler:exceptionHandler});dwr.engine.setAsync(true)}else{if(""==b){$(a).siblings(".placeholder").css("display","")}else{$(a).siblings(".placeholder").css("display","none")}}}function expandRow(f,g){var a=$(f);var c=a.closest("tbody");var e=a.closest("tr");var b=$("td",e).length;var d=e.attr("uid");var i=$("tr[expand=1]");if(i.length>0){$(".btn_expand.expanded").removeClass("expanded");$(".table_expand_tr").remove();i.removeAttr("expand");if(d==i.attr("uid")){return}}var h='<tr id="exp_tr_'+d+'" class="table_expand_tr"><td colspan="'+b+'" id="exp_t'+d+'"><iframe scrolling="no" frameborder="0" src="index_'+g+".action?uid="+d+'" onload="expandFrameLoaded(this)" /></td></tr>';e.after(h).attr("expand","1");a.addClass("expanded")}function expandFrameLoaded(c){var a=$(c);var b=$("body",c.contentDocument);c.height=b.height();c.contentWindow.JxUtil.isExpandContext=true;c.contentWindow.JxUtil.expandSourceRow=a.closest("tr").prev();b.addClass("expandContext")}function setExpandSourceRowText(f,e){if(!JxUtil.expandSourceRow){return}var b=f.attr("dataattribute");var c=f.attr("displayname");var a=JxUtil.expandSourceRow.find("[dataattribute*='"+(c?"."+c:b)+"']");if(a.length){var d=a.children();if(d.length){if(d.is("input")){d.val(e)}else{if(d.is("span")){d.attr("title",e).text(e)}}}}}function goWfApp(c,b,a){}function pagePaste(){return false}function pageBlur(e,c){var a=$(e);var d=a.val();var b=a.attr("originvalue");if(d!=b){pageGoto(c)}}function pageKeypress(b,a){a=$.event.fix(a||window.event);if(a.keyCode==13){b.blur()}return(a.keyCode>=48&&a.keyCode<=57)||(a.keyCode==8)}function pageKeydown(a,b){b=$.event.fix(b||window.event);if(b.keyCode==13){pageGoto(a)}}function pageSpanMouseover(a){}function pageSpanMouseout(a){}function pageGotoKeypress(b,c){var a=c||window.event;if(a.keyCode==13){pageGoto(b)}return(a.keyCode>=48&&a.keyCode<=57||a.keyCode==46)}function spanSetPageSize(c,a){var b=document.getElementById(c+"_pagesize");if(b){b.value=a}document.getElementById(c+"_topage").value="1";pageGoto(c)}function pageGoto(a){getTableData("div_"+a,null,function(){afterFragmentLoad(a)},null,0)}function pageNext(c){var a=document.getElementById(c+"_pagenum");var b=document.getElementById(c+"_topage");if(typeof(a)!="undefined"){b.value=a.value-(-1)}pageGoto(c)}function pagePre(c){var a=document.getElementById(c+"_pagenum");var b=document.getElementById(c+"_topage");if(typeof(a)!="undefined"){b.value=a.value-1}pageGoto(c)}function pageFirst(c){var a=document.getElementById(c+"_pagenum");var b=document.getElementById(c+"_topage");if(typeof(a)!="undefined"){b.value=1}pageGoto(c)}function pageLast(d){var b=document.getElementById(d+"_pagenum");var a=document.getElementById(d+"_pagecount");var c=document.getElementById(d+"_topage");if(typeof(b)!="undefined"){c.value=a.value}pageGoto(d)}function pageSort(g,h){var f=$(g).attr("tid");var d=$(g).attr("dataattribute");var b=$(g).attr("sortname");if(f==null||f==""){return}if(b==null||b==""){b=d}if(b==null||b==""){return}var a=document.getElementById(f+"_pagesort");if(typeof(a)!="undefined"){var i=a.value;var c="asc";if(i.indexOf(" asc")>0){c="desc"}a.value=b+" "+c}pageGoto(f)}function addComtop(b,c){var a=comtopUrl+$(b).attr("mxevent_desc");window.location.href=a}function ckPageSelectHandler(n,b,j,m,a){var d=n.form;if(!j){j="#ffffff"}if(!m){m="#ffffff"}if(!a){a="lightblue"}var o="tr_"+b.split("_")[1]+"_";var l=document.getElementsByName(b);for(var h=0;h<l.length;h++){var e=l[h];if(e.disabled||e.type!="checkbox"){continue}var c=[];var f=document.all[o+h];if(f){if(f.length==undefined){c.push(f)}else{c=f}}e.checked=n.checked;if(e.checked){for(var g=0;g<c.length;g++){c[g].bgColor=a}}else{for(var g=0;g<c.length;g++){c[g].bgColor=((h+1)%2==0)?m:j}}}}function ckOneSelect(f,h,c,b,g,a,d){h=$.event.fix(h||window.event);h.stopPropagation();ckOneSelectHandler(f,c,b,g,a,d)}function ckOneSelectHandler(e,c,b,f,a,d){ckChangeCheckboxState(e,d);ckChangeSelectedRowView(e,c,b,f,a)}function ckChangeCheckboxState(f,d){var e=f.form;if(!f.checked){if(!d&&!e.allbox){return}if(!e.allbox){document.getElementsByName(d)[0].checked=false}else{e.allbox.checked=false}if(e.selectall){e.selectall.checked=false}}else{var c=0;var g=document.getElementsByName(f.name);var b=g.length;var a=true;for(c<0;c<b;c++){a=a&&g[c].checked}if(e.allbox==undefined){if(d!=undefined){document.getElementsByName(d)[0].checked=a}}else{e.allbox.checked=a}if(e.selectall!=null){e.selectall.checked=a}}}function ckChangeSelectedRowView(m,n,g,i,a){if(!g){g="#ffffff"}if(!i){i="#ffffff"}if(!a){a="lightblue"}var h=document.getElementsByName(m.name);var b=null;var p=m.parentElement;while(p.tagName!="TABLE"){p=p.parentElement;if(p.tagName=="BODY"){break}}var l="tr_"+p.id+"_";var o=n;if(h==null){return}if(h.length==null){return}for(var f=0;f<h.length;f++){var c=[];var d=document.all[l+f];if(d){if(d.length==undefined){c.push(d)}else{c=d}}for(var e=0;e<c.length;e++){var b=c[e];if(o==-1){n=f}if(f==n&&m.checked){b.bgColor=a}else{if(!h[f].checked){b.bgColor=((f+1)%2==0)?i:g}}}}};