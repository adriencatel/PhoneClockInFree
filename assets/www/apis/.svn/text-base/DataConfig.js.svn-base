function DataConfig() { 
	/****************************************************/
    /*						CHAMPS						*/
    /****************************************************/
    this.url 		= ''; 
    this.externalId = ''; 
    this.badge		= '';
    
    /****************************************************/
    /*						METHODES					*/
    /****************************************************/
    this.isReady = function() {
    	var ready = true;
    	if(		this.url 		== '' 
    		|| 	this.externalId == ''
    		||	this.badge		== '')
    	{
    		ready = false;
    	}
    	return ready;
    }
    
    this.getFormatDateNow = function(){
    	var date	= new Date();
    	
    	return date.getTime();
    }
    
    /****************************************************/
    /*					GETTERS/SETTERS					*/
    /****************************************************/
    this.getUrl = function() { 
        return this.url;
    } 
    
    this.getExternalId = function(){
    	return this.externalId;
    }
    
    this.getBadge = function(){
    	return this.badge;
    } 
    
    this.setUrl = function(urlE) { 
        this.url = urlE;
    } 
    
    this.setExternalId = function(externalIdE){
    	this.externalId = externalIdE;
    }
    
    this.setBadge = function(badgeE){
    	this.badge = badgeE;
    }
} 