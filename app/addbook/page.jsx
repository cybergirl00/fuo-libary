"use client";
import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import Quagga from 'quagga';
import { Button } from '@/components/ui/button';
import AddForm from '@/components/AddForm';

const AddBook = () => {
  const [isbnData, setIsbnData] = useState(null);
  const [error, setError] = useState(null);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const captureAndDecode = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    processImage(imageSrc);
  };

  const processImage = (imageSrc) => {
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
            'ean_reader', // For EAN-13 which includes ISBN-13
            'upc_e_reader',
            'upc_reader'
          ],
        },
        locate: true,
      }, (result) => {
        if (result && result.codeResult) {
          setIsbnData(result.codeResult.code);
        } else {
          setError('No ISBN detected.');
        }
      });
    };
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        processImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="">
      {!isbnData ? (
        <div className='p-4 flex flex-col items-center justify-center gap-4'>
          <div className="flex flex-col items-center justify-center">
            <h1 className='text-2xl font-bold'>Add <span className='text-green-400'>Book</span></h1>
            <h1 className='text-gray-500 text-sm'>Scan the book you intend to add</h1>
          </div>
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
          <div className="pt-5">
            <Button onClick={captureAndDecode} className='bg-green-400 hover:bg-green-300'>Capture</Button>
          </div>
          <div className="pt-5">
            <Button onClick={triggerFileInput} className='bg-green-400 hover:bg-green-300'>Upload Image</Button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>
          {isbnData && (
            <div>
              <p>ISBN Data: {isbnData}</p>
            </div>
          )}
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      ) : (
        <AddForm isbn={isbnData} />
      )}
    </div>
  );
}

export default AddBook;
