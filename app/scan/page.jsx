"use client";
import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import Quagga from 'quagga';
import { Button } from '@/components/ui/button';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from 'next/link';


const Search = () => {
  const [barcodeData, setBarcodeData] = useState(null);
  const [error, setError] = useState(null);
  const [book, setBook] = useState(null); // State to store book information
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
      canvas.width = img.width;
      canvas.height = img.height;
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
        debug: {
          drawBoundingBox: true,
          showFrequency: true,
          drawScanline: true,
          showPattern: true
        },
        locate: true
      }, async (result) => {
        if (result && result.codeResult) {
          console.log('Barcode detected:', result.codeResult.code);
          setBarcodeData(result.codeResult.code);
          await searchBook(result.codeResult.code); // Search for the book in Firestore
        } else {
          console.log('No barcode detected.');
          setError('No barcode detected.');
        }
      });
    };
  };

  const searchBook = async (barcode) => {
    try {
      const q = query(collection(db, "books"), where("barcode", "==", barcode));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const bookData = querySnapshot.docs[0].data(); // Assuming you are expecting a single result
        setBook(bookData);
      } else {
        setError('No book found with this barcode.');
      }
    } catch (error) {
      console.error("Error searching for book: ", error);
      setError('Error searching for book.');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        processImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="">
      <div className='p-4 flex flex-col items-center justify-center gap-4'>
        <div className="flex flex-col items-center justify-center">
          <h1 className='text-2xl font-bold'>Barcode <span className='text-green-400'>Scanner</span></h1>
          <h1 className='text-gray-500 text-sm'>Search for books by scanning</h1>
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
          <Button onClick={captureAndDecode} className='bg-green-400 hover:bg-green-300'>
            Capture and Decode
          </Button>
        </div>
        <div className="pt-5">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <Button onClick={() => fileInputRef.current.click()} className='bg-blue-400 hover:bg-blue-300'>
            Upload Image
          </Button>
        </div>
        {barcodeData && (
          <div>
            <p>Barcode Data: {barcodeData}</p>
          </div>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {book && (
         <Table>
         <TableCaption>A list of your recent invoices.</TableCaption>
         <TableHeader>
           <TableRow>
             <TableHead className="w-[100px]">Barcode</TableHead>
             <TableHead>Name</TableHead>
             <TableHead>Author</TableHead>
             <TableHead className="text-right">Status</TableHead>
             <TableHead className="text-right">Action</TableHead>
           </TableRow>
         </TableHeader>
         <TableBody>
           <TableRow>
             <TableCell className="font-medium">{book.barcode}</TableCell>
             <TableCell>{book.name}</TableCell>
             <TableCell>{book.author}</TableCell>
             <TableCell
              className={
                book?.status === 'Unavailable' ? 'text-red-400' : 'text-green-400' 
                           }
              >{book?.status}</TableCell>
             <TableCell className="text-right">
             
              <Button variant='outline'>
                  <Link href={'/book/'+ book?.id}>
                  View
                  </Link>
                 </Button>
             </TableCell>
           </TableRow>
         </TableBody>
       </Table>       
        )}
      </div>
    </div>
  );
};

export default Search;
