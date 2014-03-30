




/*
     FILE ARCHIVED ON 20:04:22 Mar 26, 2009 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 6:48:29 Mar 29, 2014.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
 
//--------------------------------------------------------------------------------------------
// /common/js/clientside.js -- site wide javascript - browser side execution
// mod history -- Feb 2001, inherited from Pandora suite of apps with some mods
//--------------------------------------------------------------------------------------------

///--------------------------------------------------------------------------------------------
// Function to SHOW the sub-menu when it is moused-over on the north nav bar
//--------------------------------------------------------------------------------------------
var openedMenu = 0
function showMenu(menuNumber) {

				if (isMAC > -1) { 
				   	return(0); }
				
				// pjwNS6andIE6   added the following "if (isNS6 || isIE6) { ..." statement
				if (isNS6 || isIE6) {
					if (isNS6) {
						// because Netscape 6.0 leaves the menus open unless you exit by moving the mouse
						// up and off the menu or past one of the bordering columns surrounding the menu,
						// then we must close any opened menus before we open a new one
						if (openedMenu != 0) {
							var hide = "document.getElementById(\"" + "ieLayer" + openedMenu + "\").style.visibility=\"hidden\"";
							eval (hide);
							}
						}
					
					var show = "document.getElementById(\"" + "ieLayer" + menuNumber + "\").style.visibility=\"visible\"";
					eval (show);
					openedMenu = menuNumber
                    }
					
				else if (isNav) {
						var show = "document." + "nsLayer" + menuNumber + ".visibility=\"visible\"";
                        eval (show);
                        }
                else {
				
						if (isIE4) 
							{
							//because IE4 leaves the menus open unless you exit by moving the mouse
							//up and off the menu or past one of the bordering columns surrounding the menu,
							//then we must close any opened menus before we open a new one
							if (openedMenu != 0)
								{
								var hide = "document.all." + "ieLayer" + openedMenu + ".style.visibility=\"hidden\"";
								eval (hide);
								window.event.cancelBubble=true
								}
							}
						var show = "document.all." + "ieLayer" + menuNumber + ".style.visibility=\"visible\"";
						eval (show);
						window.event.cancelBubble=true
						openedMenu = menuNumber
					} 
				return(0); // added this line to fix a problem in Netscape 4.05 
                }
                
//--------------------------------------------------------------------------------------------
// Function to HIDE the sub-menu when it is moused-out on the north nav bar
//--------------------------------------------------------------------------------------------
function hideMenu(menuNumber) {

				// pjwNS6andIE6   added the following "if (isNS6 || isIE6) { ..." statement
				if (isNS6 || isIE6) {
						var hide = "document.getElementById(\"" + "ieLayer" + menuNumber + "\").style.visibility=\"hidden\"";
                        eval (hide);
						   }

                else if (isNav) {
						var hide = "document." + "nsLayer" + menuNumber + ".visibility=\"hide\"";
                        eval (hide);
						   }
               
                else if (isIE5 || isIE4){
						var hide = "document.all." + "ieLayer" + menuNumber + ".style.visibility=\"hidden\"";
                        eval (hide);
                        }
                }
                

//--------------------------------------------------------------------------------------------
// Function to HIDE or SHOW the QuickGuide menu when the tab is clicked and when page is loaded
//--------------------------------------------------------------------------------------------

var hideShow
function HideOrShowQuickGuide() 
{
	
	//now, hide or show the menu when user clicks the toggle switch and/or depending
	//on the value in the cookie when the page loads
        if (j % 2)
		{
		//alert(' j = ' + j + ' and j % 2 = ' + (j % 2));
				// pjwNS6andIE6   added the following "if (isNS6 || isIE6) ..." statement
				if (isNS6 || isIE6) 
					{
						document.getElementById("ieQuickGuideMenu").style.visibility="visible";
                    	hideShow="show";
					}
                else if (isNav) 
					{
                        document.nsQuickGuideMenu.visibility="visible";
                        hideShow="show";
					}
				else 
					{
                        document.all.ieQuickGuideMenu.style.visibility="visible";
                        hideShow="show";
					}
        }
        else 
        {
        //alert(' j = ' + j + ' and j % 2 = ' + (j % 2));
				// pjwNS6andIE6   added the following "if (isNS6 || isIE6) ..." statement
				if (isNS6 || isIE6) 
					{
						document.getElementById("ieQuickGuideMenu").style.visibility="hidden";
                    	hideShow="hide";
					}
                else if (isNav)
					{
                        document.nsQuickGuideMenu.visibility="hidden";
                        hideShow="hide";
					}
				else
					{
                        document.all.ieQuickGuideMenu.style.visibility="hidden";
                        hideShow="hide";
					}
        }               
        
		//write the value of i to the QuickGuide cookie to track if QuickGuide is Opened or Closed
		//across pages. 
		var today = new Date();
		var expire = new Date();
		expire.setTime(today.getTime() + 1000*60*60*24*365);
		document.cookie = "hideOrShow=" + hideShow + ";expires="+expire.toGMTString()+";Path=/";

		j += 1;
        if (j > 2) j = 1;
}             

//--------------------------------------------------------------------------------------------
// Function to jump to a new page from Drop-List
//--------------------------------------------------------------------------------------------

//this function loads the new page into the existing browser window
function dropAndGo(theSelectList)
{
var selectValue, arrSplitForm, windowTarget
selectValue = theSelectList[theSelectList.selectedIndex].value
arrSplitForm = selectValue.split("###");
windowTarget = arrSplitForm[1]


if (theSelectList[theSelectList.selectedIndex].value == '###')
			window.parent.self.status=" Goes Nowhere";
if (windowTarget=='blank')
	{
	popUpWithToolbar(arrSplitForm[0])
	}
if (windowTarget=='top')
	{
	top.location.href=(arrSplitForm[0]);
	}
if (windowTarget=='newEx')
	{
	leaveSite(arrSplitForm[0])
	}
if (windowTarget=='newIn')
	{
	popUp(arrSplitForm[0],arrSplitForm[2],arrSplitForm[3])
	}
if (windowTarget=='WebCast') {
		popUpWebcast(arrSplitForm[0],arrSplitForm[2],arrSplitForm[3],arrSplitForm[4],arrSplitForm[5])
	}
}

//--------------------------------------------------------------------------------------------
// Open Index pages
//--------------------------------------------------------------------------------------------
function openIndexPage(page) {
    popupWin = window.open(page, 'remote', 'menubar=yes,toolbar=no,location=no,directories=no,status=yes,scrollbars=yes,resizable=yes')
}

//--------------------------------------------------------------------------------------------
// Open Printer Friendly Page
//--------------------------------------------------------------------------------------------
function openPrintPage(url) {
var winWidth
var winHeight

winHeight = parseInt(450);
winWidth = parseInt(660);

window.open(url, null,' menu=0,menubar=1,toolbar=0,location=0,directories=0,status=0,scrollbars=1,resizable=1,copyhistory=0,top=100,left=115,width=' + winWidth + ',height=' + winHeight);
}

//--------------------------------------------------------------------------------------------
// Open Daily Prices
//--------------------------------------------------------------------------------------------
function openDailyPricing(ChannelView) {
  var page = "/web/20090326200422/http://ei.russellink.com/asp/prices/rcomprices.asp?" + ChannelView
  popupWin = window.open(page, 'remote', 'menubar=yes,toolbar=no,location=no,directories=no,status=yes,scrollbars=yes,resizable=yes')
}

//--------------------------------------------------------------------------------------------
// Open Daily Performance
//--------------------------------------------------------------------------------------------
function openDailyPerformance(ChannelView) {
var page = "/web/20090326200422/http://ei.russellink.com/asp/prices/rcomperformance.asp?" + ChannelView
  popupWin = window.open(page, 'remote', 'menubar=yes,toolbar=no,location=no,directories=no,status=yes,scrollbars=yes,resizable=yes')
}


//--------------------------------------------------------------------------------------------
// PopUp a Window 
//--------------------------------------------------------------------------------------------

function popUp(url, winWidth, winHeight){

var winWidth
var winHeight

winHeight = parseInt(winHeight);
winWidth = parseInt(winWidth);

winWidth = winWidth + 17  // this is to account for room in the scrollbar for IE
			
popUpWindow = window.open(url, null,' menu=1,menubar=1,toolbar=0,location=0,directories=0,status=0,scrollbars=1,resizable=1,copyhistory=0,top=120,left=115,width=' + winWidth + ',height=' + winHeight);
//popUpWindow.focus();  //this line of code causes Access is Denied error pop up message in IE 4.0
} 

//--------------------------------------------------------------------------------------------
// PopUp a Window 
//--------------------------------------------------------------------------------------------

function popUpcontact(url, winWidth, winHeight){

var winWidth
var winHeight

winHeight = parseInt(winHeight);
winWidth = parseInt(winWidth);

winWidth = winWidth + 17  // this is to account for room in the scrollbar for IE
			
popUpWindow = window.open(url, null,' menu=1,menubar=1,toolbar=0,location=0,directories=0,status=0,scrollbars=1,resizable=1,copyhistory=0,top=15,left=15,width=' + winWidth + ',height=' + winHeight);
//popUpWindow.focus();  //this line of code causes Access is Denied error pop up message in IE 4.0
} 

//--------------------------------------------------------------------------------------------
// PopUp a Window With Everything 
//--------------------------------------------------------------------------------------------

function popUpWithToolbar(url){
		
popUpWindow = window.open(url, null,' menu=1,menubar=1,toolbar=1,location=1,directories=1,status=1,scrollbars=1,resizable=1,copyhistory=1,top=120,left=115');
//popUpWindow.focus();  //this line of code causes Access is Denied error pop up message in IE 4.0
} 


//--------------------------------------------------------------------------------------------
// PopUp a Document Manager Window 
//--------------------------------------------------------------------------------------------

function popUpDocManager(url){

var winWidth
var winHeight
var sliced

winHeight = parseInt(480);
winWidth = parseInt(680);

winWidth = winWidth + 17  // this is to account for room in the scrollbar for IE
sliced = url.slice(0, 7)

	if (sliced == "http://") {
		window.open(url, null,' menu=0,menubar=0,toolbar=0,location=0,directories=0,status=0,scrollbars=1,resizable=1,copyhistory=0,top=60,left=75,width=' + winWidth + ',height=' + winHeight);
	}else{
		location.href=url;
	}

}

//--------------------------------------------------------------------------------------------
// PopUp a WebCastWindow
//--------------------------------------------------------------------------------------------
function popUpWebcast(url, winWidth, winHeight, winTop, winLeft){

	var winWidth = (winWidth.length > 0) ? winWidth : 740;
	var winHeight = (winHeight.length > 0) ? winHeight : 495;
	var winTop = (winTop.length > 0) ? winTop : 33;
	var winLeft = (winLeft.length > 0) ? winLeft : 50;
	popUpWindow = window.open(url, null,' menu=0,menubar=0,toolbar=0,location=0,directories=0,status=0,scrollbars=0,resizable=1,copyhistory=0,top=' + winTop + ',left='+ winLeft + ',width=' + winWidth + ',height=' + winHeight);
} 

//--------------------------------------------------------------------------------------------
// PopUp a Glossary Window 
//--------------------------------------------------------------------------------------------

function GlossaryPopUp(url){

var winWidth
var winHeight

winHeight = parseInt(450);
winWidth = parseInt(680);

window.open(url, null,' menu=0,menubar=0,toolbar=0,location=0,directories=0,status=0,scrollbars=1,resizable=1,copyhistory=0,top=120,left=115,width=' + winWidth + ',height=' + winHeight);
 
}

//--------------------------------------------------------------------------------------------
// PopUp a Media Player  
//--------------------------------------------------------------------------------------------
function launchPlayer(joeFile)
{ 
	var URLstring = "/common/media/mediaFrameSet.asp?joeFile=" + escape(joeFile)
	mediaWindow = window.open(URLstring ,null,'menu=0,menubar=0,toolbar=0,location=0,directories=0,status=0,scrollbars=0,resizable=0,copyhistory=0,top=120,left=115,width=700,height=500');
}



//--------------------------------------------------------------------------------------------
// Date Stamp Function
//--------------------------------------------------------------------------------------------

function globalDateStamp()
{
today = new Date()
mm=today.getMonth()+1;
if(mm==1) date="January";
	if(mm==2) date="February";
	if(mm==3) date="March";
	if(mm==4) date="April";
	if(mm==5) date="May";
	if(mm==6) date="June";
	if(mm==7) date="July";
	if(mm==8) date="August";
	if(mm==9) date="September";
	if(mm==10) date="October";
	if(mm==11) date="November";
	if(mm==12) date="December";

yy=today.getFullYear();

if (yy <= 99)
	{
	yy = yy + 1900;
	}
document.write(date," ",today.getDate(),", ",yy);
}

//-------------------------------------------------------------------------------------------------
// check for cookie, if they don't have it, pop open the specified window
//-------------------------------------------------------------------------------------------------
function checkAndPopSession(Cname,pageToOpen,pageToOpenWidth,pageToOpenHeight)
{
//check to see if the cookie exists, if it does and it's value is TRUE, then do nothing
//if it doesn't exist or it's value is anything other than TRUE then set then create the cookie
//and set it's value to TRUE along with the specified expiration date, then
//pop open a window at the size specified and load the specified URL into it

if (GetCheckAndPopCookie(Cname) != 'true')
{
 document.cookie = Cname + "=true; path=;";

 popUp(pageToOpen,pageToOpenWidth,pageToOpenHeight);
}
}

//-------------------------------------------------------------------------------------------------
// supports the checkAndPop function(below)
//-------------------------------------------------------------------------------------------------
function GetCheckAndPopCookie(sName)
{
	  // cookies are separated by semicolons
	  var aCookie = document.cookie.split(";");
	  for (var i=0; i < aCookie.length; i++)
	  {
	    // a name/value pair (a crumb) is separated by an equal sign
	    var aCrumb = aCookie[i].split("=");
	    //get rid of spaces in cookie name
	    aCrumb[0] = aCrumb[0].replace(' ','')

	    //alert('|' + aCrumb[0] + '| = |' + aCrumb[1] + '|');

	    if (sName == aCrumb[0])
	    {
	      GetCheckAndPopCookie = unescape(aCrumb[1]);
	      return GetCheckAndPopCookie
	    }
	  }

	  // a cookie with the requested name does not exist
}

//-------------------------------------------------------------------------------------------------
// supports the checkAndPop function(below)
//-------------------------------------------------------------------------------------------------
function writeCheckAndPopCookie(Cname,Cvalue,CexpireMonth,CexpireDay,CexpireYear,pageToOpen,pageToOpenWidth,pageToOpenHeight)
{
	var today = new Date();

	//var expire = new Date();
	//var CnumberOfDaysFromTodayToExpire
	//CnumberOfDaysFromTodayToExpire = parseInt(CnumberOfDaysFromTodayToExpire);
	//expire.setTime(today.getTime() + 1000*60*60*24*CnumberOfDaysFromTodayToExpire);

	//months start with 0 (january = 0 and Dec = 11) so fix the vaule that the user entered
	var CexpireMonth = parseInt(CexpireMonth)
	CexpireMonth = CexpireMonth - 1

	var CexpireDay= parseInt(CexpireDay)

	var CexpireYear= parseInt(CexpireYear)

	var expire = new Date(CexpireYear, CexpireMonth, CexpireDay);

	//expire.setTime(today.getTime());

	//alert('expire = ' + expire);
	//alert('expire.toGMTString() = ' + expire.toGMTString());


	document.cookie = Cname + "=" + Cvalue + ";expires="+expire.toGMTString();
}


//-------------------------------------------------------------------------------------------------
// check for cookie, if they don't have it, pop open the specified window
//-------------------------------------------------------------------------------------------------
function checkAndPop(Cname,CexpireMonth,CexpireDay,CexpireYear,pageToOpen,pageToOpenWidth,pageToOpenHeight)
{
//check to see if the cookie exists, if it does and it's value is TRUE, then do nothing
//if it doesn't exist or it's value is anything other than TRUE then set then create the cookie
//and set it's value to TRUE along with the specified expiration date, then
//pop open a window at the size specified and load the specified URL into it
if (GetCheckAndPopCookie(Cname) != 'true')
{
 var strCookieToWrite = "writeCheckAndPopCookie('" + Cname + "','true','" + CexpireMonth + "','" + CexpireDay + "','" + CexpireYear + "','" + pageToOpen + "','" + pageToOpenWidth + "','" + pageToOpenHeight + "');"
 //alert('strCookieToWrite = ' + strCookieToWrite);
 eval(strCookieToWrite)

 popUp(pageToOpen,pageToOpenWidth,pageToOpenHeight);
}
}

//------------------------------------------------------------
// Start search page function
//------------------------------------------------------------
function searchValidateNewSearch() {
	if (document.forms[0].query.value.length > 0) {
		return true;
	} else {
		document.forms[0].query.focus();
		return false;
	}
}

function searchSyncInput(passedVal) {
	document.forms[0].txtquery.value = passedVal;
	document.forms[0].txtquerybot.value = passedVal;
}

function searchQueryCriteriaChanged() {
	var df = document.forms[0];
	
	if (df.txtquery.value.toLowerCase() != df.query.value.toLowerCase() ||
		df.txtquerybot.value.toLowerCase() != df.query.value.toLowerCase()) {
		
		if (df.txtquery.value != df.query.value) {
			df.txtquerybot.value = df.txtquery.value;
			df.query.value = df.txtquery.value;
		}
		
		if (df.txtquerybot.value != df.query.value) {
			df.txtquery.value = df.txtquerybot.value;
			df.query.value = df.txtquerybot.value;
		}
		
		return true;
	} else {
		return false;
	}
}

function searchValidate() {
	if (searchQueryCriteriaChanged()) {
		document.forms[0].page.value = 0;
	}
	return true;
}

function searchViewResultsPage(passedVal) {
	document.forms[0].page.value = passedVal;
	if (searchQueryCriteriaChanged()) {
		document.forms[0].page.value = 0;
	}
	document.forms[0].submit();
}

function searchShowDocSummaries(passedVal) {
	document.forms[0].showDocSummaries.value = passedVal;
	searchValidate();
	document.forms[0].submit();
}
//------------------------------------------------------------
// End search page function
//------------------------------------------------------------

//------------------------------------------------------------
// START modifications for WebTrends
//------------------------------------------------------------
//<!-- START OF SmartSource Data Collector TAG -->
//<!-- Copyright (c) 1996-2005 WebTrends Inc.  All rights reserved. -->
//<!-- V8.0 -->
//<!-- $DateTime: 2006/04/07 16:45:14 $ -->
var gImages=new Array;
var gIndex=0;
var DCS=new Object();
var WT=new Object();
var DCSext=new Object();
var gQP=new Array();
var gI18n=false;
var dcsADDR = "";
var dcsID = "";
if (window.RegExp){
	var RE={"%09":/\t/g,"%20":/ /g,"%23":/\#/g,"%26":/\&/g,"%2B":/\+/g,"%3F":/\?/g,"%5C":/\\/g,"%22":/\"/g,"%7F":/\x7F/g,"%A0":/\xA0/g};
	var I18NRE={"%25":/\%/g};
}

// Add customizations here

function dcsVar(){
	var dCurrent=new Date();
	WT.tz=dCurrent.getTimezoneOffset()/60*-1;
	if (WT.tz==0){
		WT.tz="0";
	}
	WT.bh=dCurrent.getHours();
	WT.ul=navigator.appName=="Netscape"?navigator.language:navigator.userLanguage;
	if (typeof(screen)=="object"){
		WT.cd=navigator.appName=="Netscape"?screen.pixelDepth:screen.colorDepth;
		WT.sr=screen.width+"x"+screen.height;
	}
	if (typeof(navigator.javaEnabled())=="boolean"){
		WT.jo=navigator.javaEnabled()?"Yes":"No";
	}
	if (document.title){
		WT.ti=gI18n?dcsEscape(dcsEncode(document.title),I18NRE):document.title;
	}
	WT.js="Yes";
	WT.jv=dcsJV();
	if (document.body&&document.body.addBehavior){
		document.body.addBehavior("#default#clientCaps");
		if (document.body.connectionType){
			WT.ct=document.body.connectionType;
		}
		document.body.addBehavior("#default#homePage");
		WT.hp=document.body.isHomePage(location.href)?"1":"0";
	}
	if (parseInt(navigator.appVersion)>3){
		if ((navigator.appName=="Microsoft Internet Explorer")&&document.body){
			WT.bs=document.body.offsetWidth+"x"+document.body.offsetHeight;
		}
		else if (navigator.appName=="Netscape"){
			WT.bs=window.innerWidth+"x"+window.innerHeight;
		}
	}
	WT.fi="No";
	if (window.ActiveXObject){
		for(var i=10;i>0;i--){
			try{
				var flash = new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+i);
				WT.fi="Yes";
				WT.fv=i+".0";
				break;
			}
			catch(e){
			}
		}
	}
	else if (navigator.plugins&&navigator.plugins.length){
		for (var i=0;i<navigator.plugins.length;i++){
			if (navigator.plugins[i].name.indexOf('Shockwave Flash')!=-1){
				WT.fi="Yes";
				WT.fv=navigator.plugins[i].description.split(" ")[2];
				break;
			}
		}
	}
	if (gI18n){
		WT.em=(typeof(encodeURIComponent)=="function")?"uri":"esc";
		if (typeof(document.defaultCharset)=="string"){
			WT.le=document.defaultCharset;
		} 
		else if (typeof(document.characterSet)=="string"){
			WT.le=document.characterSet;
		}
	}
	WT.tv="8.0.0";
	WT.sp="@@SPLITVALUE@@";
	DCS.dcsdat=dCurrent.getTime();
	DCS.dcssip=window.location.hostname;
	DCS.dcsuri=window.location.pathname;
	if (window.location.search){
		DCS.dcsqry=window.location.search;
		if (gQP.length>0){
			for (var i=0;i<gQP.length;i++){
				var pos=DCS.dcsqry.indexOf(gQP[i]);
				if (pos!=-1){
					var front=DCS.dcsqry.substring(0,pos);
					var end=DCS.dcsqry.substring(pos+gQP[i].length,DCS.dcsqry.length);
					DCS.dcsqry=front+end;
				}
			}
		}
	}
	if ((window.document.referrer!="")&&(window.document.referrer!="-")){
		if (!(navigator.appName=="Microsoft Internet Explorer"&&parseInt(navigator.appVersion)<4)){
			DCS.dcsref=gI18n?dcsEscape(window.document.referrer, I18NRE):window.document.referrer;
		}
	}
}

function dcsA(N,V){
	return "&"+N+"="+dcsEscape(V, RE);
}

function dcsEscape(S, REL){
	if (typeof(REL)!="undefined"){
		var retStr = new String(S);
		for (R in REL){
			retStr = retStr.replace(REL[R],R);
		}
		return retStr;
	}
	else{
		return escape(S);
	}
}

function dcsEncode(S){
	return (typeof(encodeURIComponent)=="function")?encodeURIComponent(S):escape(S);
}

function dcsCreateImage(dcsSrc){
	if (document.images){
		gImages[gIndex]=new Image;
		if ((typeof(gHref)!="undefined")&&(gHref.length>0)){
			gImages[gIndex].onload=gImages[gIndex].onerror=dcsLoadHref;
		}
		gImages[gIndex].src=dcsSrc;
		gIndex++;
	}
	else{
		document.write('<IMG ALT="" BORDER="0" NAME="DCSIMG" WIDTH="1" HEIGHT="1" SRC="'+dcsSrc+'">');
	}
}

function dcsMeta(){
	var elems;
	if (document.all){
		elems=document.all.tags("meta");
	}
	else if (document.documentElement){
		elems=document.getElementsByTagName("meta");
	}
	if (typeof(elems)!="undefined"){
		for (var i=1;i<=elems.length;i++){
			var meta=elems.item(i-1);
			if (meta.name){
				if (meta.name.indexOf('WT.')==0){
					WT[meta.name.substring(3)]=(gI18n&&(meta.name.indexOf('WT.ti')==0))?dcsEscape(dcsEncode(meta.content),I18NRE):meta.content;
				}
				else if (meta.name.indexOf('DCSext.')==0){
					DCSext[meta.name.substring(7)]=meta.content;
				}
				else if (meta.name.indexOf('DCS.')==0){
					DCS[meta.name.substring(4)]=(gI18n&&(meta.name.indexOf('DCS.dcsref')==0))?dcsEscape(meta.content,I18NRE):meta.content;
				}
			}
		}
	}
}

function dcsTag(){
	if (document.cookie.indexOf("WTLOPTOUT=")!=-1){
		return;
	}
	var P="http"+(window.location.protocol.indexOf('https:')==0?'s':'')+"://"+dcsADDR+(dcsID==""?'':'/'+dcsID)+"/dcs.gif?";
	for (N in DCS){
		if (DCS[N]) {
			P+=dcsA(N,DCS[N]);
		}
	}
	for (N in WT){
		if (WT[N]) {
			P+=dcsA("WT."+N,WT[N]);
		}
	}
	for (N in DCSext){
		if (DCSext[N]) {
			P+=dcsA(N,DCSext[N]);
		}
	}
	if (P.length>2048&&navigator.userAgent.indexOf('MSIE')>=0){
		P=P.substring(0,2040)+"&WT.tu=1";
	}
	dcsCreateImage(P);
}

function dcsJV(){
	var agt=navigator.userAgent.toLowerCase();
	var major=parseInt(navigator.appVersion);
	var mac=(agt.indexOf("mac")!=-1);
	var nn=((agt.indexOf("mozilla")!=-1)&&(agt.indexOf("compatible")==-1));
	var nn4=(nn&&(major==4));
	var nn6up=(nn&&(major>=5));
	var ie=((agt.indexOf("msie")!=-1)&&(agt.indexOf("opera")==-1));
	var ie4=(ie&&(major==4)&&(agt.indexOf("msie 4")!=-1));
	var ie5up=(ie&&!ie4);
	var op=(agt.indexOf("opera")!=-1);
	var op5=(agt.indexOf("opera 5")!=-1||agt.indexOf("opera/5")!=-1);
	var op6=(agt.indexOf("opera 6")!=-1||agt.indexOf("opera/6")!=-1);
	var op7up=(op&&!op5&&!op6);
	var jv="1.1";
	if (nn6up||op7up){
		jv="1.5";
	}
	else if ((mac&&ie5up)||op6){
		jv="1.4";
	}
	else if (ie5up||nn4||op5){
		jv="1.3";
	}
	else if (ie4){
		jv="1.2";
	}
	return jv;
}

function dcsFunc(func){
	if (typeof(window[func])=="function"){
		window[func]();
	}
}

function dcsMultiTrack(){
	for (var i=0;i<arguments.length;i++){
		if (arguments[i].indexOf('WT.')==0){
			WT[arguments[i].substring(3)]=arguments[i+1];i++;
		}
		if (arguments[i].indexOf('DCS.')==0){
			DCS[arguments[i].substring(4)]=arguments[i+1];i++;
		}
		if (arguments[i].indexOf('DCSext.')==0){
			DCSext[arguments[i].substring(7)]=arguments[i+1];i++;
		}
	}
	var dCurrent=new Date();
	DCS.dcsdat=dCurrent.getTime();
	dcsTag();
}

function LogDocSSDC(path)
{
	dcsMultiTrack("DCS.dcsuri", path);
}

function MoveToDocSSDC(path)
{
	LogDocSSDC(path);
	window.location = path;
}

function PopUpDocSSDC(path)
{
	LogDocSSDC(path);
	popUpWindow = window.open(path, null,' menu=0,menubar=0,toolbar=0,location=0,directories=0,status=0,scrollbars=1,resizable=1,copyhistory=0,top=120,left=115,width=817,height=600');
}

dcsADDR = "ssdc.russell.com";
dcsID = "dcs7stog329o4aa4aaib3jvbu_4x9h";

dcsVar();
dcsMeta();

dcsFunc("dcsAdv");
dcsTag();

//------------------------------------------------------------
// END modifications for WebTrends
//------------------------------------------------------------


//------------------------------------------------------------
// check browser language and redirect Japanese user
//------------------------------------------------------------
function chkJapanUser() {
	//redirect based on the users language detected
	var vActionPage = "";
	vActionPage = "/ww/Japan.asp";
	var browserLanguage;
	var vLanguage = "ja";
	
	var vLanguage2 = "en-us";
	var vActionPage2 = "/us/SiteNav.asp";

	var vLanguage3 = "en-ca";
	var vActionPage3 = "/ca/default.asp";

	browserLanguage = checkLanguageCookie();
	//document.write("<BR>checkCookie=" + browserLanguage + " <BR>");
	
	if (browserLanguage.match(vLanguage)) {
	//if (browserLanguage == vLanguage) {
		//we already have the browser language;
		goRedirect(vActionPage);
	}
	else {
	//alert("not jp");
	
		if (navigator.appName == "Microsoft Internet Explorer" ) {
			browserLanguage = navigator.userLanguage.toLowerCase();
			if (browserLanguage.match(vLanguage)) {
			//if (browserLanguage == vLanguage ) {
				goRedirect(vActionPage);
			}
			else if (browserLanguage.match(vLanguage2)) {
				//alert("go to " + vActionPage2);
				goRedirect(vActionPage2);
			}
			else if (browserLanguage.match(vLanguage3)) {
				//alert("go to " + vActionPage3);
				goRedirect(vActionPage3);
			}
			else {
				//document.write("You are " + browserLanguage);
			}
		}
		else if (navigator.appName == "Netscape" ) {
			browserLanguage = navigator.language.toLowerCase();

			if (browserLanguage.match(vLanguage)) {
			//if (browserLanguage == vLanguage ) {
				goRedirect(vActionPage);
			}
			else if (browserLanguage.match(vLanguage2)) {
				//alert("Netscape go to " + vActionPage2);
				goRedirect(vActionPage2);
			}
			else if (browserLanguage.match(vLanguage3)) {
				//alert("Netscape go to " + vActionPage3);
				goRedirect(vActionPage3);
			}
			else {
				//document.write("You are " + browserLanguage);
			}
		}
		else {
			browserLanguage = "";
			//document.write("<!-- Mystery browser -->");
		}	
	}

	//update the cookie with the language
	var today = new Date();
	var expire = new Date();
	expire.setTime(today.getTime() + 1000*60*60*24*365);
	document.cookie = "browserLanguage=" + browserLanguage + ";expires="+expire.toGMTString()+";Path=/";
}

function checkLanguageCookie() {
	  // cookies are separated by semicolons
	  var vBrowserLanguage = "";
	  var aCookie = document.cookie.split(";");
	  for (var i=0; i < aCookie.length; i++)
	  {
	    // a name/value pair (a crumb) is separated by an equal sign
	    var aCrumb = aCookie[i].split("=");
	    //get rid of spaces in cookie name
	    aCrumb[0] = aCrumb[0].replace(' ','')

		if(aCrumb[0] == "browserLanguage") {
			//document.write("<!-- " + aCrumb[0] + "=" + aCrumb[1] + "-->");
			vBrowserLanguage = aCrumb[1];
		}

	  }
	  return vBrowserLanguage.toLowerCase();
}

function goRedirect(vActionPage) {
	//alert("Redirect to " + vActionPage);
	location = vActionPage;
}

//------------------------------------------------------------
// check browser language and redirect Japanese user
//------------------------------------------------------------

//--------------------------------------------------------------------------------------------
// PopUp a Window enabling Save Target As for PDF documents.
// In order to work, put the call of the function in the onclick:
// <a href="File.pdf" onclick="return ClickPopUp('File.pdf', 600, 400)">File</a>
//--------------------------------------------------------------------------------------------
function ClickPopUp(url, winWidth, winHeight){
popUp(url, winWidth, winHeight);
return false;
}
//--------------------------------------------------------------------------------------------
// PopUp a Window enabling Save Target As for PDF documents.
// In order to work, put the call of the function in the onclick:
// <a href="File.pdf" onclick="return ClickPopUpWebCast('File.pdf', winWidth, winHeight, winTop, winLeft)">File</a>
//--------------------------------------------------------------------------------------------
function ClickPopUpWebCast(url, winWidth, winHeight, winTop, winLeft){
popUpWebcast(url, winWidth, winHeight, winTop, winLeft);
return false;
}
//--------------------------------------------------------------------------------------------
// Open new window with confirm (call to this)
//--------------------------------------------------------------------------------------------
function clickleaveSite(d) {
	leaveSite(d);
	return false;
}