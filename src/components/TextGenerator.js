import React, { useRef, useState, useEffect } from 'react';
import { AiOutlineUpload, AiOutlineDownload } from 'react-icons/ai';

const DownloadSvg = () => {
  const svgRef = useRef(null);
  const fileInputRef = useRef(null);
  const [svgCode, setSvgCode] = useState('');
  const [fileName, setFileName] = useState('');
  const [svgColors, setSvgColors] = useState([]);

  useEffect(() => {
    const updateSVGDimensions = () => {
      const svgElement = svgRef.current;
      const svgBounds = svgElement.getBoundingClientRect();
      svgElement.setAttribute('width', svgBounds.width);
      svgElement.setAttribute('height', svgBounds.height);
    };

    updateSVGDimensions();
    window.addEventListener('resize', updateSVGDimensions);

    return () => {
      window.removeEventListener('resize', updateSVGDimensions);
    };
  }, [svgCode]);

  const downloadSVG = () => {
    const svgData = svgRef.current.outerHTML;
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml' });
    const svgUrl = URL.createObjectURL(svgBlob);
    const link = document.createElement('a');
    link.href = svgUrl;
    link.download = fileName || 'webwidely_Default.svg';
    link.click();
    URL.revokeObjectURL(svgUrl);
  };

  const handleSvgCodeChange = (event) => {
    const updatedSvgCode = event.target.value.replace(/width="[^"]*"/, '').replace(/height="[^"]*"/, '');
    setSvgCode(updatedSvgCode);

    const extractedColors = extractColorsFromSVG(updatedSvgCode);
    setSvgColors(extractedColors);
  };

  const handleFileNameChange = (event) => {
    setFileName(event.target.value);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const fileContent = e.target.result;
      const updatedSvgCode = fileContent.replace(/width="[^"]*"/, '').replace(/height="[^"]*"/, '');
      setSvgCode(updatedSvgCode);

      const extractedColors = extractColorsFromSVG(updatedSvgCode);
      setSvgColors(extractedColors);
    };

    reader.readAsText(file);
  };

  const extractColorsFromSVG = (svgCode) => {
    const colors = [];
    const colorRegex = /(?:fill|stop-color|stop-opacity)="([^"]+)"/g;

    let match;
    while ((match = colorRegex.exec(svgCode)) !== null) {
      const color = match[1];
      if (!colors.includes(color)) {
        colors.push(color);
      }
    }

    return colors;
  };

  const handleColorChange = (index, color) => {
    const updatedColors = [...svgColors];
    updatedColors[index] = color;
    setSvgColors(updatedColors);

    let modifiedSvgCode = svgCode;
    updatedColors.forEach((newColor, idx) => {
      const oldColor = svgColors[idx];
      const colorRegex = new RegExp(`(["'])${oldColor}\\1`, 'g');
      modifiedSvgCode = modifiedSvgCode.replace(colorRegex, `$1${newColor}$1`);
    });
    setSvgCode(modifiedSvgCode);
  };

  const openFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
      <div className="mb-4">
        <label htmlFor="fileName" className="font-bold text-lg">
          SVG File Name:
        </label>
        <input
          id="fileName"
          type="text"
          value={fileName}
          onChange={handleFileNameChange}
          className="shadow border p-2 rounded ml-3 w-full max-w-md focus:shadow-outline border-gray-600"
          placeholder="e.g., computerIcon"
        />
      </div>
      <div>
        <textarea
          value={svgCode}
          onChange={handleSvgCodeChange}
          rows={10}
          cols={50}
          placeholder="Paste your SVG code here..."
          className="custom-textarea border-animation"
        />
        <div className="mt-3 relative">
          <button
            onClick={openFileInput}
            className="inline-block rounded bg-blue-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            <AiOutlineUpload className="mr-2 inline-block" />
            Upload SVG
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".svg"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      </div>
      <div className="flex gap-3 mt-3 mb-3">
        <h2 className="font-bold text-lg">Change Colors</h2>
        {svgColors.map((color, index) => (
          <div key={index}>
            <span style={{ backgroundColor: color }} className="color-swatch" />
            <input
              type="color"
              value={color}
              onChange={(event) => handleColorChange(index, event.target.value)}
            />
          </div>
        ))}
      </div>
      <div>
        <svg
          ref={svgRef}
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="auto"
          dangerouslySetInnerHTML={{ __html: svgCode }}
        />
      </div>
      <div>
        <button onClick={downloadSVG} className="svgDownload">
          <AiOutlineDownload className="mr-2 inline-block" />
          Download SVG
        </button>
      </div>
    </div>
  );
};

export default DownloadSvg;
