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

  const getButtonStyles = (text) => {
    let buttonStyle =
      'block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out';

    if (text.includes('Upload')) {
      buttonStyle += ' bg-blue-700 text-white';
    } else if (text.includes('Download')) {
      buttonStyle += ' bg-green-500 text-white';
    } else {
      buttonStyle += ' bg-gray-200 text-gray-800';
    }

    return buttonStyle;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
      <div className="mb-4">
        <label htmlFor="fileName" className="font-bold text-lg">
          SVG File Name:
        </label>
        <div className="flex mt-1">
          <input
            id="fileName"
            type="text"
            value={fileName}
            onChange={handleFileNameChange}
            className="shadow border p-2 rounded-l border-green-500 focus:outline-none focus:border-green-500 w-full max-w-md"
            placeholder="e.g., computerIcon"
          />
          <button
            onClick={openFileInput}
            className="flex items-center justify-center rounded-r px-4 bg-blue-700 text-white focus:outline-none"
          >
            <AiOutlineUpload className="mr-2" />
            Upload
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
      <div>
        <textarea
          value={svgCode}
          onChange={handleSvgCodeChange}
          rows={10}
          cols={50}
          placeholder="Paste your SVG code here..."
          className="custom-textarea border-animation"
        />
        <div className="mt-3 flex gap-3">
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
        <button onClick={downloadSVG} className={getButtonStyles('Download SVG')}>
          <AiOutlineDownload className="mr-2 inline-block" />
          Download SVG
        </button>
      </div>
    </div>
  );
};

export default DownloadSvg;
