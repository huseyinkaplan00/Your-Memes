import React, { useRef } from "react"
import html2canvas from "html2canvas"
export default function Meme() {
	const [texts, setTexts] = React.useState({
		topText: "",
		bottomText: "",
		randomImage: "../public/placeHolderImage.svg",
	})

	// saving images
	const imageRef = useRef(null)

	const saveImage = () => {
		const node = imageRef.current
		if (node) {
			html2canvas(node, { allowTaint: true, useCORS: true, logging: true }).then((canvas) => {
				const imgData = canvas.toDataURL("image/png")
				let link = document.createElement("a")
				link.download = "meme.png"
				link.href = imgData
				link.click()
			})
		}
	}

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
		if (texts.topText === "" && texts.bottomText === "") {
			setClick(true)
			return
		}
		setClick(false)
		const randomNumber = Math.floor(Math.random() * memes.length)
		const url = memes[randomNumber].url

		setTexts({
			topText: "",
			bottomText: "",
			randomImage: url,
		})
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
			{click && <p className="errorMessage">Please Fill An Input</p>}
			<div
				className="main--content__image"
				ref={imageRef}
			>
				<img
					className="hover-overlay"
					src={texts.randomImage}
					alt="meme image"
				/>
				<h3 className="main--content__image--topText">{texts.topText}</h3>
				<h3 className="main--content__image--bottomText"> {texts.bottomText} </h3>
			</div>
			<button onClick={saveImage}>Save Your Meme</button>
		</main>
	)
}
