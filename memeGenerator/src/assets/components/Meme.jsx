import React, { useState } from "react"

export default function Meme() {
	const [texts, setTexts] = React.useState({
		topText: "",
		bottomText: "",
		randomImage: "../public/placeHolderImage.svg",
	})

	const [click, setClick] = React.useState(false)

	const [memes, setMemes] = React.useState([])

	React.useEffect(() => {
		const getMemes = async () => {
			const res = await fetch("https://api.imgflip.com/get_memes")
			const url = await res.json()
			setMemes(url.data.memes)
		}
		getMemes()
	}, [])

	const gettingImages = () => {
		const randomNumber = Math.floor(Math.random() * memes.length)
		const url = memes[randomNumber].url
		if (texts.topText || texts.bottomText) {
			setTexts((prevImages) => ({
				topText: "",
				bottomText: "",
				randomImage: url,
			}))
		}

		setClick((prevClick) => !prevClick)
	}

	const handleChange = (event) => {
		event.preventDefault()
		const { name, value } = event.target
		setTexts((prevNames) => ({
			...prevNames,
			// computed property name
			[name]: value,
		}))
	}
	let determine
	if (click) {
		determine = !texts.topText && !texts.bottomText ? <p className="errorMessage">Please Fill An Input</p> : ""
	}

	return (
		<main>
			<div className="inputs">
				<input
					name="topText"
					value={texts.topText}
					onChange={handleChange}
					placeholder="Enter Top Text"
				/>

				<input
					name="bottomText"
					value={texts.bottomText}
					onChange={handleChange}
					placeholder="Enter Bottom Text"
				/>
			</div>

			<button onClick={gettingImages}>Get a new meme image</button>
			{determine}
			<div className="main--content__image">
				<img
					className="hover-overlay"
					src={texts.randomImage}
					alt="meme image"
				/>
				<h3 className="main--content__image--topText">{texts.topText}</h3>
				<h3 className="main--content__image--bottomText"> {texts.bottomText} </h3>
			</div>
		</main>
	)
}
