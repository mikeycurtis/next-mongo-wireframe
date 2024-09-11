import React, { useState } from 'react';

const colorOptions = ['#f0e68c', '#add8e6', '#ffa07a', '#98fb98'];
const fontOptions = ['Arial', 'Times New Roman', 'Courier', 'Verdana'];
const fontSizes = ['12px', '14px', '16px', '18px', '20px'];

export default function EditLetter() {
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  const [selectedFont, setSelectedFont] = useState(fontOptions[0]);
  const [selectedFontSize, setSelectedFontSize] = useState(fontSizes[2]);
  const [letterContent, setLetterContent] = useState('');
  const [destination, setDestination] = useState('');
  const [returnAddress, setReturnAddress] = useState('');

  return (
    <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Choose Color:</h3>
        <div className="flex space-x-2">
          {colorOptions.map((color) => (
            <div
              key={color}
              className={`w-10 h-10 rounded-full cursor-pointer ${
                selectedColor === color ? 'ring-2 ring-blue-500' : ''
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
            ></div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Font Options:</h3>
        <select
          className="w-full p-2 border rounded"
          value={selectedFont}
          onChange={(e) => setSelectedFont(e.target.value)}
        >
          {fontOptions.map((font) => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Font Size:</h3>
        <select
          className="w-full p-2 border rounded"
          value={selectedFontSize}
          onChange={(e) => setSelectedFontSize(e.target.value)}
        >
          {fontSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Letter Content:</h3>
        <textarea
          className="w-full p-2 border rounded"
          rows={10}
          value={letterContent}
          onChange={(e) => setLetterContent(e.target.value)}
          style={{ fontFamily: selectedFont, fontSize: selectedFontSize }}
        ></textarea>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Destination Address:</h3>
        <textarea
          className="w-full p-2 border rounded"
          rows={3}
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        ></textarea>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Return Address:</h3>
        <textarea
          className="w-full p-2 border rounded"
          rows={3}
          value={returnAddress}
          onChange={(e) => setReturnAddress(e.target.value)}
        ></textarea>
      </div>

      <div className="flex justify-between">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add to Cart
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Send Now
        </button>
      </div>
    </div>
  );
}
