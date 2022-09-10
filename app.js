// Copyright (C) 2022 Soni L. - 0BSD
document.addEventListener("DOMContentLoaded", function() {
	const client = new WebTorrent();
	const handler = function(e) {
		const loc = window.location;
		const counter = document.createElement("p");
		counter.textContent = e.target.innerText + " downloading...";
		const target = document.getElementById('status');
		target.append(counter);
		client.add(loc.origin + "/" + e.target.value, {
			strategy: "rarest"
		}, function(t) {
			t.on('download', function(bytes) {
				counter.textContent = 
					e.target.innerText +
					" just downloaded: " + bytes +
					" total downloaded: " + t.downloaded +
					" download speed: " + t.downloadSpeed +
					" progress: " + t.progress;
			});
			t.on('done', function() {
				counter.replaceChildren(e.target.innerText);
				t.files.forEach(function(f) {
					if (f.name.endsWith(".iso")) {
						f.getBlobURL(function(err, url) {
							if (err) throw err;
							const a = document.createElement("a");
							a.textContent = f.name;
							a.download = f.name;
							a.href = url;
							counter.append(" ", a);
						});
					}
				});
			});
		});
	};
	Array.prototype.forEach.call(
		document.getElementsByClassName("torrent"),
		function(el) { el.onclick = handler },
	);
});
