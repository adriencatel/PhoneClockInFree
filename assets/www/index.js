/****************************************************************************************************/
/*                          			GLOBAL / CONSTANTES	                                 		*/
/****************************************************************************************************/
var states 					= {};

function checkCache(){
	var localStorage 			= new LocalStorage();
	if(localStorage != null){
		localStorage.checkCache();
	}
}

function clearCache(){
	var localStorage 			= new LocalStorage();
	if(localStorage != null){
		localStorage.clearCache();
	}
}

function initVarConnection(){
	states[Connection.UNKNOWN]  = 'Unknown connection';
	states[Connection.ETHERNET] = 'Ethernet connection';
	states[Connection.WIFI]     = 'WiFi connection';
	states[Connection.CELL_2G]  = 'Cell 2G connection';
	states[Connection.CELL_3G]  = 'Cell 3G connection';
	states[Connection.CELL_4G]  = 'Cell 4G connection';
	states[Connection.CELL]     = 'Cell generic connection';
	states[Connection.NONE]     = 'No network connection';
}

/****************************************************************************************************/
/*                          			GLOBAL / CONSTANTES	                                 		*/
/****************************************************************************************************/

$(document).ready(function() { 
	document.addEventListener("deviceready", 	onDeviceReady, 	false);
});

function onDeviceReady() {
    $.support.cors = true;
    
    initVarConnection();
    generateArbo();
    ResizeRefreshPositionsElements();
	console.log("**Device [OK]");
}

function onOnline() {
	alert("Connection !");
}

function onOffline() {
	alert("Connection Lost !");
}

function checkConnection() {
    var networkState 			= navigator.network.type;//navigator.network.connection.type;
    return states[networkState];
}

function connectionIsAvailable(){
	return (	checkConnection() != states[Connection.NONE] 
			&&	checkConnection() != states[Connection.UNKNOWN]);
}

function refreshNotification(){
	console.log("**RefreshNotification");
	// Faut-il afficher la notif ?
	var localStorage	= new LocalStorage();
	if(localStorage.getFirstIndexAvailable() == 0){
		$('#imgNotification').css('visibility', 'hidden');	
	}else{
		$('#imgNotification').css('visibility', 'visible');	
	}
}

function ResizeRefreshPositionsElements(){
    // Capture des tailles
    container_width 	= $('#mainBody').width();
	container_height 	= $('#mainBody').height();
    notif_width 		= $('#imgNotification').width();
    notif_height 		= $('#imgNotification').height();
	
    // Positionnement
	$('#imgNotification').css('position', 'absolute');
	$('#imgNotification').css('marginLeft', '' 	+ ((container_width - notif_width)) 	+ 'px');
	$('#imgNotification').css('marginTop', '' 	+ ((container_height - notif_height)) 	+ 'px');
	
	// Affiche les notifs ?
	refreshNotification();
			
	// Debug
	console.log("**ResizeRefreshPositionsElements[OK]");
	console.log("******container_width = " 	+ container_width);
	console.log("******container_height = "	+ container_height);
	console.log("******notif_width = " 		+ notif_width);
	console.log("******notif_height = "		+ notif_height);
}


function sendCache(){
	var localStorage 			= new LocalStorage();
	if(connectionIsAvailable()){
		localStorage.executeCache();
	}else{
		$('#divDebug').html($('#divDebug').html() + "<span style=\"color:Red;\">--> Connexion NON-OK </span><br/>"); 
	}
}

/****************************************************************************************************/
/*                          			APPELS AJAX			                                 		*/
/****************************************************************************************************/
/*------------------------METHODES------------------------*/
function GetInstitutionNameByExternalId() {
	$('#divDebug').html("<span style=\"color:Blue;\">****GetInstitutionNameByExternalId****</span><br/>");
	if(connectionIsAvailable())
	{
		$('#divDebug').html($('#divDebug').html() + "<span style=\"color:Green;\">--> Connexion OK </span><br/>"); 
		config = getConfig();		
		if(config != null){
			$('#divDebug').html($('#divDebug').html() + "<span style=\"color:Green;\">--> Configuration OK </span><br/>");
			console.log("**config [OK]");							
			console.log("******URL	: " + config.getUrl());
			console.log("******ID	: " + config.getExternalId());
			
			$.ajax(
		    {
		        type		: 'GET',
		        async 		: true,
		        dataType	: 'jsonp',			// allow cross-Domain
		        url			: config.getUrl() + "?callback=?",
		        jsonp		: 'successGetInstitutionNameByExternalId',
		        timeout		: 5000,
		        data		: 'idExternal=' + config.getExternalId() + '&action=GetInstitutionNameByExternalId',
		        success		: function(success){
		        	successGetInstitutionNameByExternalId(success);
		        },
		    });
		}
		else{
			$('#divDebug').html("<span style=\"color:Red;\">--> Config NON-OK </span><br/>");
			console.log("**config [NOK]");
		}	
	}else{
		$('#divDebug').html("<span style=\"color:Red;\">--> Connexion NON-OK </span><br/>");
	}
}

function TrySendNewClockInMovement(date){
	$('#divDebug').html("<span style=\"color:Blue;\">****TrySendNewClockInMovement****</span><br/>");
	var localStorage 			= new LocalStorage();
	if(connectionIsAvailable())
	{
		$('#divDebug').html($('#divDebug').html() + "<span style=\"color:Green;\">--> Connexion OK </span><br/>"); 
		config = getConfig();		
		if(config != null){
			$('#divDebug').html($('#divDebug').html() + "<span style=\"color:Green;\">--> Configuration OK </span><br/>"); 
			console.log("**config [OK]");							
			console.log("******URL	: " + config.getUrl());
			console.log("******ID	: " + config.getExternalId());
			
			var dateSend;
			if(date == null){
				console.log("non cache");
				dateSend 	= config.getFormatDateNow();
			}else{
				console.log("cache");
				dateSend 	= date;
			}
			
			$.ajax(
		    {
		        type		: 'GET',
		        async 		: true,
		        dataType	: 'jsonp',			// allow cross-Domain
		        url			: config.getUrl() + "?callback=?",
		        jsonp		: 'successTrySendNewClockInMovement',
		        timeout		: 5000,
		        data		: 'idExternal=' + config.getExternalId() + '&badge=' + config.getBadge() + '&clockInDateTime=' + dateSend + '&action=TrySendNewClockInMovement',
		        success		: function(success){
		        	successTrySendNewClockInMovement(success);
		        },
		        error		: function(jqXHR, textStatus, errorThrown){
		        	errorMessage(jqXHR, textStatus, errorThrown);
		        },
		        complete	: function(){
		        	refreshNotification();
		        }
		    });
		}
		else{
			console.log("**config [NOK]");
		}	
	}
	else
	{
		$('#divDebug').html("<span style=\"color:Red;\">--> Connexion NON-OK </span><br/>"); 
		// Go Cache
		localStorage.newEventCache();
		refreshNotification();
	}
}

/*------------------------FAIL------------------------*/
function errorMessage(jqXHR, textStatus, errorThrown) {
	console.log("Error [jqXHR] : " + jqXHR);
	console.log("Error [textStatus] : " + textStatus);
	console.log("Error [errorThrown] : " + errorThrown);
	var localStorage 			= new LocalStorage();
	if(textStatus != "parsererror"){
		$('#divDebug').html($('#divDebug').html() + "<span style=\"color:Red;\">--> " + textStatus + " </span><br/>"); 
		$('#divDebug').html($('#divDebug').html() + "<span style=\"color:Red;\">--> Envoi NON OK </span><br/>"); 
		localStorage.newEventCache();
	}
}

/*------------------------SUCCESS------------------------*/
function successGetInstitutionNameByExternalId(success) {
	if(success.InstitutionName){
		alert(success.InstitutionName);
	}
}

function successTrySendNewClockInMovement(success) {
	var localStorage 			= new LocalStorage();
	$('#divDebug').html($('#divDebug').html() + "<span style=\"color:Green;\">--> Envoi OK </span><br/>"); 
	if(success.TrySendIsTrue){			
		localStorage.executeCache();
	}
}


/*************************************************************************************************/
/*                          			CONFIGURATION			                                 */
/*************************************************************************************************/
function generateArbo(){
	createFile();
	intArbo = setInterval(function(){
		if(myFileEntry){
			generateConfig();
		}
	}, 500);
}

function generateConfig(){
	clearInterval(intArbo);
	writeFile();
	intCfg = setInterval(function(){
		if(myWriter){
			checkConfig();
		}
	}, 500);
}

function checkConfig(){
	clearInterval(intCfg);
	readFile();
}

function setConfig(result){
	var url 		= $("#url").val();
	var id 			= $("#id").val();
	var badge		= $("#badge").val();
		
	var dataConfig 	= new DataConfig();
	
	dataConfig.setUrl(url);
	dataConfig.setExternalId(id);
	dataConfig.setBadge(badge);
	
	contentFile 	= dataConfig; 
}

function getConfig(){
	if(myCfg){
		setConfig(myCfg);
	}
	
	if(contentFile.isReady()){
		return contentFile;
	}
	else{
		return null;
	}
}


/************************************************************************************************/
/*                          TESTS AJAX SOAP - NE FONCTIONNE PAS                                 */
/************************************************************************************************/