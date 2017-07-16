var link = chrome.contextMenus.create({"title": "paper download","contexts":["link"], "onclick":genericOnClick }); 

function genericOnClick(info, tab) { 
	var a = info.linkUrl;
	if (a.substr(0,5) == "http:")
	{
		var name = info.selectionText + ".pdf";
		var index = a.indexOf("/", 7)
		var url = (a.substr(0, index) + ".sci-hub.cc" + a.substr(index));
		var xhr = new XMLHttpRequest();
		xhr.open("GET", url, true);
		xhr.send(null);	
		xhr.responseType = "document";
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				if (xhr.status==200)
			    {
			    var docu = xhr.responseXML;
			    var div = docu.getElementById("content");
			    var message =div.getElementsByTagName("iframe");
			    nodemap = message[0].attributes;
			    nodeurl = nodemap[0].nodeValue;
			    chrome.downloads.download({
				  url: nodeurl,
				  filename:name
				});
			    }
			  else
			    {
			    alert("Problem retrieving XML data:" + xmlhttp.statusText);
			    }
			}
		}
	}
}