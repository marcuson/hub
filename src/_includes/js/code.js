(function () {
	function addCopyButtons() {
		document.querySelectorAll("pre > code").forEach(function (code) {
			var pre = code.parentNode;
			// if we've already wrapped this pre, skip
			if (pre.classList.contains("copy-code")) return;

			// create a wrapper class on the pre
			pre.classList.add("copy-code");

			var btn = document.createElement("button");
			btn.type = "button";
			btn.classList.add("copy-code__btn");
			btn.setAttribute("aria-label", "Copy code");
			btn.textContent = "Copy";
			pre.insertBefore(btn, code);

			btn.addEventListener("click", function () {
				var text = code.innerText;
				if (!navigator.clipboard) {
					var range = document.createRange();
					range.selectNodeContents(code);
					var sel = window.getSelection();
					sel.removeAllRanges();
					sel.addRange(range);
					try {
						document.execCommand("copy");
						btn.textContent = "Copied";
					} catch (e) {
						btn.textContent = "Copy failed";
					}
					sel.removeAllRanges();
					setTimeout(function () {
						btn.textContent = "Copy";
					}, 2000);
					return;
				}

				navigator.clipboard
					.writeText(text)
					.then(function () {
						btn.textContent = "Copied";
						setTimeout(function () {
							btn.textContent = "Copy";
						}, 2000);
					})
					.catch(function () {
						btn.textContent = "Copy failed";
						setTimeout(function () {
							btn.textContent = "Copy";
						}, 2000);
					});
			});
		});
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", addCopyButtons);
	} else {
		addCopyButtons();
	}
})();
