var myFS 			= 0;
var myFileEntry 	= 0;
var myWriter		= 0;
var myCfg			= 0;
var contentFile 	= new DataConfig();

var cptWriteFail	= 0; 	// Permet de determiner une limite � la construction d'arborescence (car probl�me sur galaxy S)
							// Il faut au miminum lancer 2 fois la g�n�ration pour quelle soit compl�te.

// api-file  Error
function failFS(evt) {
    console.log(evt.target.error.code);
    //$('#file-system-text').html("<strong>File System Error: " + evt.target.error.code + "</strong>");  
}
function writeFail(error) {
    console.log("Create/Write Error: " + error.code);
    
    if(error.code == '9' && cptWriteFail < 3){
    	createFile();
    	cptWriteFail++;
    }
}

// api-file  Create
function createGotNewFile(file){
	console.log("**createGotNewFile[DEBUT]");
	console.log(file.fullPath);
	console.log("******createGotNewFile[FIN]");
}
function createGotFileEntry(fileEntry) {
	console.log("**createGotFileEntry[DEBUT]");
    myFileEntry = fileEntry;
    fileEntry.file(createGotNewFile, writeFail);
    console.log("******createGotFileEntry[FIN]");
}
function gotFS(fileSystem) {
	console.log("**gotFS[DEBUT]");
    myFS 			= fileSystem;
    console.log(fileSystem.name);
    console.log(fileSystem.root.name);
    
    fileSystem.root.getDirectory("EVERY-Test", {create: true});
    fileSystem.root.getFile("EVERY-Test/test.xml", {create: true, exclusive: false}, createGotFileEntry, writeFail);
    console.log("******gotFS[FIN]");
}
function createFile() { // button onclick function
	console.log("**createFile[DEBUT]");
	if (myFS) {
        gotFS(myFS);
    } else {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, failFS);
    }
	console.log("******createFile[FIN]");
}

//api-file  FileWriter
function gotFileWriter(writer) {
	console.log("**gotFileWriter[DEBUT]");
	writer.onwriteend = function(evt) {
		console.log("******gotFileWriter [OK]");
	}
	
    writer.write("Write OK");
    myWriter = writer;
    console.log("******gotFileWriter[FIN]");
    
}
function gotFileEntry(fileEntry) {
	console.log("**gotFileEntry[DEBUT]");
    fileEntry.createWriter(gotFileWriter, writeFail);
    console.log("******gotFileEntry[FIN]");
}
function writeFile() { // button onclick function
	if (myFileEntry) {
        gotFileEntry(myFileEntry);        
    } else {
    	console.log("Error: File Not Created!");
    }
}

// api-file  FileReader
function readFail(error) {
    console.log("Read Error: " + error.code);
    //$('#file-read-text').html("<strong>Read Error: " + error.code + "</strong>");
    //$('#file-read-dataurl').empty();
}
function readerreadDataUrl(file) {
    var reader = new FileReader();
    reader.onloadend = function(evt) {
        console.log("Read as data URL");
        console.log(evt.target.result);
        //$('#file-read-dataurl').html("<strong>" + evt.target.result.slice(0, 38) + "...</strong>");
    };
    reader.readAsDataURL(file);
}
function readerreadAsText(file) {
    var reader = new FileReader();
    reader.onloadend = function(evt) {
        console.log("Read as text");
        console.log(evt.target.result);
        myCfg = evt.target.result;
        //setConfig(evt.target.result);
        //$('#file-read-text').html("<strong>" + evt.target.result + "</strong>");
    };
    reader.readAsText(file);
}
function readerGotFile(file){
    //readerreadDataUrl(file);
    readerreadAsText(file);
}
function readerGotFileEntry(fileEntry) {
    fileEntry.file(readerGotFile, readFail);
}
function readFile() { // button onclick function
    if (myFileEntry) {
        readerGotFileEntry(myFileEntry);        
    } else {
        console.log("Error: File Not Created!");
        return false;
    }    
}

// api-file  Remove File
function removeSuccess(entry) {
    //$('#file-status').html("Removed: <strong>readme.txt</strong>"); 
    //$('#file-contents').html("<br/>Contents:");
    //$('#file-read-dataurl').empty();    
    //$('#file-read-text').empty();
}
function removeFail(error) {
    console.log("Remove File Error: " + error.code);
    //$('#file-status').html("Status: <strong>Remove Error: " + error.code + "</strong>");       
}
function removeFileEntry(fileEntry) {
    fileEntry.remove(removeSuccess, removeFail);
}
function removeFile() { // button onclick function
    if (myFileEntry) {
        removeFileEntry(myFileEntry);        
    } else {
        console.log("Error: File Not Created!");
    }    
}