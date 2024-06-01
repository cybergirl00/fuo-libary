"use client";
import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import Quagga from 'quagga';

const Search = () => {
  const [barcodeData, setBarcodeData] = useState(null);
  const [error, setError] = useState(null);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const captureAndDecode = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const img = new Image();
    img.src = imageSrc;

    img.onload = () => {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d', { willReadFrequently: true });
      context.drawImage(img, 0, 0, canvas.width, canvas.height);

      Quagga.decodeSingle({
        src: canvas.toDataURL(),
        numOfWorkers: 0,
        inputStream: {
          size: 800,
        },
        decoder: {
          readers: [
            'code_128_reader',
            'ean_reader',
            'ean_8_reader',
            'code_39_reader',
            'code_39_vin_reader',
            'codabar_reader',
            'upc_reader',
            'upc_e_reader',
            'i2of5_reader'
          ],
        },
      }, (result) => {
        if (result && result.codeResult) {
          setBarcodeData(result.codeResult.code);
        } else {
          setError('No barcode detected.');
        }
      });
    };
  };

  return (
    <div>
      <h1>Barcode Scanner</h1>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={640}
        height={480}
        videoConstraints={{
          facingMode: 'environment',
        }}
      />
      <canvas ref={canvasRef} width={640} height={480} style={{ display: 'none' }} />
      <button onClick={captureAndDecode}>Capture and Decode</button>
      {barcodeData && (
        <div>
          <p>Barcode Data: {barcodeData}</p>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Search;
