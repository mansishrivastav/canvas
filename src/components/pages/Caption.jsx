import React, { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';
import { useLocation, useNavigate } from 'react-router-dom';

const Caption = () => {
    const canvasRef = useRef(null);
    const [canvas, setCanvas] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const imgUrl = location.state?.img;
  
    useEffect(() => {
      if (!imgUrl) {
        console.error("No image URL found");
        navigate('/');
        return;
      }
  
      console.log("Attempting to load image:", imgUrl);
  
      const newCanvas = new fabric.Canvas(canvasRef.current, {
        width: 800,
        height: 600,
        backgroundColor: '#f0f0f0',
      });
  
      setCanvas(newCanvas);
  
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const fabricImage = new fabric.Image(img);
        const canvasAspectRatio = 800 / 600;
        const imgAspectRatio = fabricImage.width / fabricImage.height;
        
        if (imgAspectRatio > canvasAspectRatio) {
          fabricImage.scaleToWidth(800);
        } else {
          fabricImage.scaleToHeight(600);
        }
        
        fabricImage.set({
          left: (800 - fabricImage.getScaledWidth()) / 2,
          top: (600 - fabricImage.getScaledHeight()) / 2,
        });
  
        newCanvas.add(fabricImage);
        newCanvas.renderAll();
      };
      img.onerror = (err) => {
        console.error("Error loading image:", err);
      };
      img.src = imgUrl;
  
      return () => {
        newCanvas.dispose();
      };
    }, [imgUrl, navigate]);
  

  const addText = () => {
    if (canvas) {
      const text = new fabric.IText('Edit this text', {
        left: 50,
        top: 50,
        fontFamily: 'Arial',
        fill: '#000000',
        fontSize: 20,
      });
      canvas.add(text);
      canvas.setActiveObject(text);
      canvas.renderAll();
    }
  };

  const addShape = (shapeType) => {
    if (canvas) {
      let shape;
      switch (shapeType) {
        case 'rectangle':
          shape = new fabric.Rect({
            width: 100,
            height: 100,
            fill: 'rgba(255, 0, 0, 0.5)',
            left: 100,
            top: 100,
          });
          break;
        case 'circle':
          shape = new fabric.Circle({
            radius: 50,
            fill: 'rgba(0, 255, 0, 0.5)',
            left: 100,
            top: 100,
          });
          break;
        case 'triangle':
          shape = new fabric.Triangle({
            width: 100,
            height: 100,
            fill: 'rgba(0, 0, 255, 0.5)',
            left: 100,
            top: 100,
          });
          break;
        default:
          return;
      }
      canvas.add(shape);
      canvas.setActiveObject(shape);
      canvas.renderAll();
    }
  };

  const downloadImage = () => {
    if (canvas) {
      const dataURL = canvas.toDataURL({
        format: 'png',
        quality: 1,
      });
      const link = document.createElement('a');
      link.download = 'canvas-image.png';
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const clearCanvas = () => {
    if (canvas) {
      canvas.clear();
      fabric.Image.fromURL(imgUrl, (img) => {
        const canvasAspectRatio = 800 / 600;
        const imgAspectRatio = img.width / img.height;
        
        if (imgAspectRatio > canvasAspectRatio) {
          img.scaleToWidth(800);
        } else {
          img.scaleToHeight(600);
        }
        
        img.set({
          left: (800 - img.getScaledWidth()) / 2,
          top: (600 - img.getScaledHeight()) / 2,
        });

        canvas.add(img);
        canvas.renderAll();
      }, null, {
        crossOrigin: 'anonymous'
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
    <div className="mb-4 space-x-2">
      <button onClick={addText} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
        Add Text
      </button>
      <button onClick={() => addShape('rectangle')} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
        Add Rectangle
      </button>
      <button onClick={() => addShape('circle')} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
        Add Circle
      </button>
      <button onClick={() => addShape('triangle')} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition">
        Add Triangle
      </button>
      <button onClick={downloadImage} className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition">
        Download Image
      </button>
      <button onClick={clearCanvas} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">
        Clear Canvas
      </button>
    </div>
    <canvas ref={canvasRef} className="border border-gray-300 shadow-lg" />
  </div>
  );
};

export default Caption;
