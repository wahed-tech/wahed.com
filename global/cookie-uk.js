// Check if the current page has "/uk" slug
function hasUkSlug() {
	return window.location.pathname.startsWith("/uk");
}

// Check if the user has already closed the cookie banner
function isCookieBannerClosed() {
	return localStorage.getItem("cookieBannerClosed") === "true";
}

// Close the cookie banner
function closeCookieBanner() {
	document.getElementById("cookieBanner").style.display = "none";
	localStorage.setItem("cookieBannerClosed", "true");
}

// Create the cookie banner
function createCookieBanner() {
	const cookieBanner = document.createElement("div");
	cookieBanner.id = "cookieBanner";
	cookieBanner.style.backgroundColor = "#303030";
	cookieBanner.style.color = "white";
	cookieBanner.style.position = "fixed";
	cookieBanner.style.bottom = "0";
	cookieBanner.style.left = "0";
	cookieBanner.style.width = "100%";
	cookieBanner.style.padding = "32px";
	cookieBanner.style.boxSizing = "border-box";
	cookieBanner.style.display = "flex";
	cookieBanner.style.justifyContent = "space-between";
	cookieBanner.style.alignItems = "center";
	cookieBanner.style.zIndex = "99999";

	const closeButton = document.createElement("button");
	closeButton.style.backgroundImage =
		"url('https://uploads-ssl.webflow.com/6258aa32b493a205485f0800/6464ce8edf7a01af8b4b30b9_close-24.svg')";
	closeButton.style.backgroundRepeat = "no-repeat";
	closeButton.style.backgroundSize = "24px";
	closeButton.style.backgroundColor = "#303030";
	closeButton.style.backgroundPosition = "center";
	closeButton.style.border = "none";
	closeButton.style.width = "24px";
	closeButton.style.height = "24px";
	closeButton.style.cursor = "pointer";

	const marginMobile = document.createElement("div");
	marginMobile.style.height = "32px";

	closeButton.addEventListener("click", closeCookieBanner);

	const cookieText = document.createElement("span");
	cookieText.textContent =
		"We care about your data, and we'd use cookies only to improve your experience. By using this website, you accept our ";
	const cookiePolicyLink = document.createElement("a");
	cookiePolicyLink.href = "/uk/legal";
	cookiePolicyLink.textContent = "Cookies Policy";
	cookiePolicyLink.style.color = "#C4C1DE";
	cookiePolicyLink.style.textDecoration = "underline";
	cookieText.appendChild(cookiePolicyLink);

	// Check if it's a mobile device (screen width less than or equal to 767px)
	if (window.innerWidth <= 767) {
		const mobileWrapper = document.createElement("div");
		mobileWrapper.style.display = "flex";
		mobileWrapper.style.flexDirection = "column";

		mobileWrapper.appendChild(closeButton);
		mobileWrapper.appendChild(marginMobile);
		mobileWrapper.appendChild(cookieText);

		cookieBanner.appendChild(mobileWrapper);
	} else {
		cookieBanner.appendChild(cookieText);
		cookieBanner.appendChild(closeButton);
	}

	document.body.appendChild(cookieBanner);
}

// Check if the current page has "/uk" slug and the cookie banner should be displayed
if (hasUkSlug() && !isCookieBannerClosed()) {
	createCookieBanner();
}
