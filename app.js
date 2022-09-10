// Copyright (C) 2022 Soni L. - 0BSD
document.onDOMContentLoaded = function() {
	const client = new WebTorrent();
	console.log("Hello!");
	const handler = function(e) {
		console.log(e);
	};
	Array.prototype.forEach.call(
		document.getElementsByClassName("torrent"),
		function(el) { el.onclick = handler },
	);
};
