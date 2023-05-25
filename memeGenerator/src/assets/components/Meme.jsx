import React from "react"

export default function Meme() {
	const [texts, setTexts] = React.useState({
		topText: "",
		bottomText: "",
		randomImage: "../public/placeHolderImage.svg",
	})

	const handleChange = (event) => {
		event.preventDefault()
		const { name, value } = event.target
		setTexts((prevNames) => ({
			...prevNames,
			// computed property name
			[name]: value,
		}))
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

			<button>Get a new meme image</button>

			<div className="main--content__image">
				<img
					className="hover-overlay"
					src={texts.randomImage}
					alt="meme image"
				/>
				<h3>{texts.topText}</h3>
				<h3> {texts.bottomText} </h3>
			</div>
		</main>
	)
}
