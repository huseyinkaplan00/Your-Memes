import React, { useEffect, useRef, useCallback } from "react";
import html2canvas from "html2canvas";
import axios from "axios";
import { Helmet } from "react-helmet";
import Draggable from "react-draggable";
import ColorThief from "colorthief";

//black and dark mode ekle practice için !

export default function Meme() {
  const [texts, setTexts] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "/placeHolderImage.svg",
    fontSize: "35",
  });

  // const [click, setClick] = React.useState(false)
  const [memes, setMemes] = React.useState([]);
  const [fontList, setFontList] = React.useState([]);
  const [selectedFont, setSelectedFont] = React.useState("");
  const [color, setColor] = React.useState(null);
  const [extraInput, setExtraInput] = React.useState([]);
  const [backgroundColor, setBackgroundColor] = React.useState("");
  const [boxShadowColor, setBoxShadowColor] = React.useState("#fff");
  const [opacityColor, setOpacityColor] = React.useState("");

  const addInput = () => {
    setExtraInput([...extraInput, { id: `input-${Date.now()}`, value: "" }]);
  };

  const handleMoreInputsChange = (event) => {
    event.preventDefault();
    const { name, value, key } = event.target;
    setExtraInput(
      extraInput.map((prevInput) =>
        prevInput.id === name ? { ...prevInput, value: value } : prevInput
      )
    );
  };

  //getting memes's color codes

  const imageRef = useRef(null);

  const getColorFromImage = useCallback(() => {
    const colorThief = new ColorThief();
    const imageElement = imageRef.current;

    if (imageElement.complete) {
      const color = colorThief.getColor(imageElement);
      //inverting color
      const invertColor = color.map((value) => 255 - value);

      //converting to string
      const invertedColorStr = `rgb(${invertColor.join(",")})`;
      const invertedColorRgba = `rgba(${invertColor.join(",")},0.4)`;
      //hex color
      //calculating Hex value
      const toHex = (c) => {
        let hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
      };

      const rgbToHex = (r, g, b) => {
        return "#" + toHex(r) + toHex(g) + toHex(b);
      };

      setBoxShadowColor(rgbToHex(color[0], color[1], color[2]));
      setBackgroundColor(invertedColorStr);
      setOpacityColor(invertedColorRgba);
    }
  }, [texts.randomImage]);

  useEffect(() => {
    if (texts.randomImage) {
      getColorFromImage();
    }
  }, [texts.randomImage, getColorFromImage]);

  //choosing body element with effect
  useEffect(() => {
    document.body.style.background = backgroundColor;
    document.body.style.backgroundImage = `linear-gradient(-45deg, ${backgroundColor}, ${boxShadowColor}, ${opacityColor}, #fff, #000)`;
  }, [backgroundColor]);

  //google font select
  //font size feature eklenecek, input arttırma feature ı eklenecek . Kullanıcı istediği kadar input girebilecek .

  React.useEffect(() => {
    const getFonts = async () => {
      const res = await axios.get(
        "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyA3a4MSy7tF9whne5eH2rKjM-y0slQ-mZA"
      );
      setFontList(res.data.items);
    };
    getFonts();
  }, []);
  // saving images
  const screenshotRef = useRef(null);

  const saveImage = () => {
    const node = screenshotRef.current;
    if (node) {
      html2canvas(node, {
        allowTaint: true,
        useCORS: true,
        logging: true,
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        let link = document.createElement("a");
        link.download = "meme.png";
        link.href = imgData;
        link.click();
      });
    }
  };

  React.useEffect(() => {
    const getMemes = async () => {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const url = await res.json();
      setMemes(url.data.memes);
    };
    getMemes();
  }, []);

  const gettingImages = () => {
    // if (texts.topText === "" && texts.bottomText === "") {
    // 	setClick(true)
    // 	return
    // }
    // setClick(false)
    const randomNumber = Math.floor(Math.random() * memes.length);
    const url = memes[randomNumber]
      ? memes[randomNumber].url
      : "/placeHolderImage.svg";

    setTexts({
      topText: "",
      bottomText: "",
      randomImage: url,
    });
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    setTexts((prevNames) => ({
      ...prevNames,
      // computed property name
      [name]: value,
    }));
  };

  const handleText = (e) => {
    setSelectedFont(e.target.value);
  };

  const style = {
    fontFamily: selectedFont,
    //if color state has got an value use that if not use the backgroundColor state value
    color: color || backgroundColor,
    fontSize: texts.fontSize + "px",
  };

  return (
    <main>
      <div className="inputs">
        <input
          name="topText"
          value={texts.topText}
          onChange={handleChange}
          placeholder="Enter Top Text"
          style={{
            fontFamily: selectedFont,
            boxShadow: boxShadowColor
              ? `-1px 0px 3px 2px ${boxShadowColor}`
              : "none",
          }}
        />

        <input
          name="bottomText"
          value={texts.bottomText}
          onChange={handleChange}
          placeholder="Enter Bottom Text"
          style={{
            fontFamily: selectedFont,
            boxShadow: boxShadowColor
              ? `-1px 0px 3px 2px ${boxShadowColor}`
              : "none",
          }}
        />

        {extraInput.map((inputs) => (
          <input
            key={inputs.id}
            id={inputs.id}
            name={inputs.id}
            value={inputs.value}
            onChange={handleMoreInputsChange}
            placeholder="Enter Text"
            style={{
              fontFamily: selectedFont,
              boxShadow: boxShadowColor
                ? `-1px 0px 3px 2px ${boxShadowColor}`
                : "none",
            }}
          />
        ))}

        <button
          title="Add a new input area"
          className="inputs--addButton"
          onClick={addInput}
          style={{
            boxShadow: boxShadowColor
              ? `0px 0px 0px 2px ${boxShadowColor}`
              : "none",
          }}
        >
          <small>+</small>
        </button>
      </div>

      <button
        style={{
          boxShadow: boxShadowColor
            ? `-1px 0px 0px 2px ${boxShadowColor}`
            : "none",
        }}
        onClick={gettingImages}
      >
        Get a new meme image
      </button>
      {/* {click && <p className="errorMessage">Please Fill An Input</p>} */}

      <div className="main--content__image" ref={screenshotRef}>
        <img
          style={{
            boxShadow: boxShadowColor
              ? `-1px 0px 3px 2px ${boxShadowColor}`
              : "none",
          }}
          className="hover-overlay"
          ref={imageRef}
          src={texts.randomImage}
          alt="meme image"
          onLoad={getColorFromImage}
          crossOrigin="anonymous"
        />
        <Draggable bounds="parent">
          <h3 style={style} className="main--content__image--topText">
            {texts.topText}
          </h3>
        </Draggable>
        <Draggable bounds="parent">
          <h3 style={style} className="main--content__image--bottomText">
            {" "}
            {texts.bottomText}{" "}
          </h3>
        </Draggable>

        {extraInput.map((newInputs) => {
          return (
            <Draggable bounds="parent">
              <h3 className="main--content__image--bottomText" style={style}>
                {" "}
                {newInputs.value}{" "}
              </h3>
            </Draggable>
          );
        })}
      </div>

      <Helmet>
        {selectedFont && (
          <link
            href={`https://fonts.googleapis.com/css?family=${selectedFont.replace(
              " ",
              "+"
            )}&display=swap`}
            rel="stylesheet"
          />
        )}
      </Helmet>
      <div className="new--features">
        <div className="new--features__selectFont">
          <h4
            style={{
              color: boxShadowColor,
              textShadow: `0px 0px 4px ${backgroundColor}`,
            }}
          >
            {" "}
            Font Family & Color & Size :{" "}
          </h4>
          <select
            style={{
              fontFamily: selectedFont,
              boxShadow: boxShadowColor
                ? `-1px 0px 17px 3px ${boxShadowColor}`
                : "none",
            }}
            onChange={handleText}
            title="change meme  font family"
          >
            {fontList.map((font) => (
              <option key={font.family} value={font.family}>
                {font.family}
              </option>
            ))}
          </select>
          <input
            type="color"
            onChange={(e) => setColor(e.target.value)}
            title="change meme font's color"
          />
          <input
            name="fontSize"
            type="number"
            value={texts.fontSize}
            onChange={handleChange}
            className="new--features__selectFont--fsize"
            placeholder="Enter Font Size Number"
            title="change meme font size"
          />
        </div>
      </div>

      <button
        style={{
          boxShadow: boxShadowColor
            ? `-1px 0px 0px 2px ${boxShadowColor}`
            : "none",
        }}
        onClick={saveImage}
      >
        Save Your Meme
      </button>
    </main>
  );
}
