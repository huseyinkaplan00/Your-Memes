import React, { useRef } from "react"
import html2canvas from "html2canvas"
import axios from "axios"
import { Helmet } from "react-helmet"
import Draggable from "react-draggable"


export default function Meme() {
	const [texts, setTexts] = React.useState({
		topText: "",
		bottomText: "",
		randomImage: "/memeGenerator/placeHolderImage.svg",
		fontSize: ""
	})


	const [click, setClick] = React.useState(false)
	const [memes, setMemes] = React.useState([])
	const [fontList, setFontList] = React.useState([])
	const [selectedFont, setSelectedFont] = React.useState("")
	const [color, setColor ]= React.useState('#ffffff')
	const [extraInput, setExtraInput] = React.useState([])
	const addInput = () =>  {
		setExtraInput([
			...extraInput, {id: `input-${Date.now()}`, value: ""}
		])
	}

	const handleMoreInputsChange = (event) => {
		event.preventDefault()
		const {name, value} = event.target
		setExtraInput(extraInput.map(prevInput => (
			prevInput.id === name ? {...prevInput, value: value} : prevInput
		))) 
		 
	}

	//google font select
	//font size feature eklenecek, input arttırma feature ı eklenecek . Kullanıcı istediği kadar input girebilecek .

	React.useEffect(() => {
		const getFonts = async () => {
			const res = await axios.get("https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyA3a4MSy7tF9whne5eH2rKjM-y0slQ-mZA")
			setFontList(res.data.items)
			
		}
		getFonts()
	}, [])
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

	React.useEffect(() => {
		const getMemes = async () => {
			const res = await fetch("https://api.imgflip.com/get_memes")
			const url = await res.json()
			setMemes(url.data.memes)
		}
		getMemes()
	}, [])

	const gettingImages = () => {
		// if (texts.topText === "" && texts.bottomText === "") {
		// 	setClick(true)
		// 	return
		// }
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

	const handleText = (e) => {
		setSelectedFont(e.target.value)
	}

	const style = {
			fontFamily: selectedFont,
			color: color,
			fontSize: texts.fontSize+"px"
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

				{extraInput.map(inputs => (
					<input
						
						key={inputs.id}
						name={inputs.id}
						value={inputs.value}
						onChange={handleMoreInputsChange}
						placeholder="Enter Text"
					/>
				))}

				<button className="inputs--addButton" onClick={addInput} ><small>+ </small></button>

			</div>

			<button onClick={gettingImages}>Get a new meme image</button>
			{/* {click && <p className="errorMessage">Please Fill An Input</p>} */}
			
			
			<div
				className="main--content__image"
				ref={imageRef}
			>
				<img
					className="hover-overlay"
					src={texts.randomImage}
					alt="meme image"
				/>
				<Draggable bounds="parent">
				<h3
					style={style}
					className="main--content__image--topText"
				>
					{texts.topText}
				</h3>
				</Draggable>
				<Draggable bounds="parent">
				<h3 
					style={style}
				className="main--content__image--bottomText"> {texts.bottomText} </h3>
				</Draggable>

				{extraInput.map(newInputs => {

					return(
						<Draggable bounds="parent">
						<h3 className="main--content__image--bottomText" style={style}> {newInputs.value} </h3>
						
					</Draggable>
					)
				
				})}

			</div>

			<Helmet>
				{selectedFont && (
					<link
						href={`https://fonts.googleapis.com/css?family=${selectedFont.replace(" ", "+")}&display=swap`}
						rel="stylesheet"
					/>
				)}
			</Helmet>
			<div className="new--features">
				<div className="new--features__selectFont">
				<select onChange={handleText}> 
					
					{fontList.map(font => (
						<option key={font.family} value={font.family} >
						{font.family}
					</option>
					))}

				</select>

			
				</div>
				<div className="new--features__colorPicker">
						<input
							type="color"
							value={color}
							onChange={e => setColor(e.target.value)}
						/>
				</div>

				<div className="new--features__fontSize">
						<input 
							name="fontSize"
							type="number"
							value={texts.fontSize}
							onChange={handleChange}
							placeholder="Enter Font Size Number"
						/>
				</div>

			</div>

			<button onClick={saveImage}>Save Your Meme</button>
		</main>
	)
}
