function refreshLink(url){
	var patternYoutube = /^https:\/\/www.youtube.com/i;
	var patternVimeo = /^http[s]{0,1}:\/\/vimeo.com/i;
	var icon = "../icon/inactive.png";
	var $u = false;
	if(patternYoutube.test(url) || patternVimeo.test(url)){
		for ($i in enlaces){
			if(patternYoutube.test(url)) var $code = enlaces[$i].url.replace(/http[s]{0,1}:\/\/www.youtube.com\/watch\?v=([a-zA-Z0-9\-\_]{11})/, '$1');
			if(patternVimeo.test(url)) var $code = enlaces[$i].url.replace(/vimeo.com\/(\d{5,10})/, '$1');
			var patron = new RegExp($code);
			if(patron.test(url)) var icon = "../icon/active.png";
		}
	}
	chrome.browserAction.setIcon({path: icon });
};

chrome.tabs.onUpdated.addListener(function(tabs,changeInfo) {
	if (changeInfo.status == 'loading') getLink(tabs);
});

chrome.tabs.onSelectionChanged.addListener(getLink);

function getLink(tabs){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		refreshLink(tabs[0].url);
	});	
	return
}