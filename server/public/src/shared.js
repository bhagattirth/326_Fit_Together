// Profile picture should be grabbed using API

export const logout = async () => {
	const res = await fetch("http://localhost:5000/auth/logout", {
		method: "POST",
		credentials: "include",
		headers: { "Content-type": "application/json" },
		body: null,
	});

	const msg = await res.json();

	if (res.ok) {
		location.href = "index.html";
	} else {
		alert("failed to logout");
	}
};
