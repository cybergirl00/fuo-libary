"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import Webcam from "react-webcam";
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';

const Search = () => {
  const [image, setImage] = useState(null);
  const [barcodeData, setBarcodeData] = useState(null);
  const [error, setError] = useState(null);
  const webcamRef = useRef(null);

  const handleImageCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);

    const codeReader = new BrowserMultiFormatReader();
    fetch(imageSrc)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        codeReader.decodeFromImageUrl(url)
          .then((result) => {
            setBarcodeData(result.text);
            setError(null);
            URL.revokeObjectURL(url);
          })
          .catch((err) => {
            if (err instanceof NotFoundException) {
              setError("No barcode detected. Please try again.");
            } else {
              setError("An error occurred while decoding the barcode.");
              console.error(err);
            }
            URL.revokeObjectURL(url);
          });
      })
      .catch((err) => {
        setError("An error occurred while processing the image.");
        console.error(err);
      });
  };

  return (
    <div>
      <Webcam
        audio={false}
        height={480}
        width={640}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <button onClick={handleImageCapture}>Capture Image</button>
      {image && (
        <div>
          <Image
            src={image}
            alt="Captured Image"
            width={640}
            height={480}
          />
          {barcodeData && <p>Barcode Data: {barcodeData}</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      )}
    </div>
  );
};

export default Search;
