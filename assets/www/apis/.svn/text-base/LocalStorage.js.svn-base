function LocalStorage(){
	/****************************************************/
    /*						CHAMPS						*/
    /****************************************************/
	var cache = window.localStorage;
	
	/****************************************************/
    /*						METHODES					*/
    /****************************************************/
	this.getFirstIndexAvailable = function(){
		console.log("**getFirstIndexAvailable");
		var i 		= 0;
		var item 	= cache.getItem(i);
		while(item != null){
			i++;
			item 	= cache.getItem(i);
		}	
		
		return i;
	}
	
	this.newEventCache 	= function(){
		console.log("**newEventCache");
		date		= new Date();
	    
		cache.setItem(this.getFirstIndexAvailable(), date.getTime());
	}

	this.checkCache = function(){
		console.log("**checkCache");
		var i 		= 0;
		var item 	= cache.getItem(i);
		while(item != null){
			console.log("Key : " + i + " - Value : " + item);
			i++;
			item 	= cache.getItem(i);
		}	
	}
	
	this.executeCache = function(){
		console.log("**executeCache");
		var i 		= 0;
		var item; 	
		var continu = true;
		
		while(continu==true){
			item = cache.getItem(i);
			if(item != null){
				TrySendNewClockInMovement(item);
				cache.removeItem(i);
			}else{
				continu=false;
			}
			i++;
		}		
		
		return i;
	}

	this.clearCache = function(){
		cache.clear();
		console.log("**Clear Cache[OK]");
	}		
}




/*
Methods 
	key			: Returns the name of the key at the position specified.
	getItem		: Returns the item identified by it's key.
	setItem		: Saves and item at the key provided.
	removeItem	: Removes the item identified by it's key.
	clear		: Removes all of the key value pairs.

Details 
	localStorage provides an interface to a W3C Storage interface. It allows one to save data as key-value pairs.

Supported Platforms 
	Android
	BlackBerry WebWorks (OS 6.0 and higher)
	iPhone

example
	window.localStorage.setItem("key", "value");
    var keyname = window.localStorage.key(i);
    // keyname is now equal to "key"
    var value = window.localStorage.getItem("key");
    // value is now equal to "value"
    window.localStorage.removeItem("key");
    window.localStorage.setItem("key2", "value2");
    window.localStorage.clear();
    // localStorage is now empty

*/