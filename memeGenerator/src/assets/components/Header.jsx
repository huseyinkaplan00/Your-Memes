import React from "react"

export default function Header() {
	return (
		<header>
			<img
				src="../public/logo.png"
				alt="header icon troll face"
				className="header__logo"
			/>
			<h1>Meme Generator</h1>
			<p>Generate your favorite memes</p>
		</header>
	)
}
