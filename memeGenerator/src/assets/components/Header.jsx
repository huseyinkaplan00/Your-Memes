import React from "react"

export default function Header() {
	return (
		<header>
			<a href="index.html">
				<img
					src="/memeGenerator/logo.png"
					alt="header icon troll face"
					className="header__logo"
				/>
				<h1> Meme Generator</h1>
			</a>
			<p>Generate your favorite memes</p>
		</header>
	)
}
