import React, { useState } from 'react';
import { IoCopyOutline, IoCloseSharp , IoDownloadOutline } from 'react-icons/io5';

const TextTransformer = () => {
  const [text, setText] = useState('');

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleTransform = (type) => {
    let transformed = '';

    switch (type) {
      case 'sentence':
        transformed = text.toLowerCase();
        transformed = transformed.charAt(0).toUpperCase() + transformed.slice(1);
        break;
      case 'lower':
        transformed = text.toLowerCase();
        break;
      case 'upper':
        transformed = text.toUpperCase();
        break;
      case 'capitalized':
        transformed = text
          .toLowerCase()
          .replace(/(^|\s)\S/g, (char) => char.toUpperCase());
        break;
      case 'alternating':
        transformed = text
          .split('')
          .map((char, index) =>
            index % 2 === 0 ? char.toUpperCase() : char.toLowerCase()
          )
          .join('');
        break;
      case 'title':
        transformed = text
          .toLowerCase()
          .replace(/(^|\s)\S/g, (char) => char.toUpperCase());
        break;
      case 'inverse':
        transformed = text
          .split('')
          .map((char) =>
            char === char.toUpperCase()
              ? char.toLowerCase()
              : char.toUpperCase()
          )
          .join('');
        break;
      default:
        transformed = text;
        break;
    }

    setText(transformed);
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(text);
  };

  const handleClearText = () => {
    setText('');
  };

  const handleDownloadText = () => {
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'text.txt';
    element.click();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
      <textarea
        placeholder="Write your text ..."
        value={text}
        onChange={handleTextChange}
        rows={15}
        className="custom-textarea border-animation"
      />
      <div className="convertTxt_btn">
        <button onClick={() => handleTransform('sentence')}>Sentence Case</button>
        <button onClick={() => handleTransform('lower')}>Lower Case</button>
        <button onClick={() => handleTransform('upper')}>UPPER CASE</button>
        <button onClick={() => handleTransform('capitalized')}>Capitalized Case</button>
        <button onClick={() => handleTransform('alternating')}>aLtErNaTiNg cAsE</button>
        <button onClick={() => handleTransform('title')}>Title Case</button>
        <button onClick={() => handleTransform('inverse')}>InVeRsE CaSe</button>
        <button onClick={handleCopyText}>
          <IoCopyOutline />
          Copy
        </button>
        <button onClick={handleClearText}>
        <IoCloseSharp />Clear</button>
        <button className='bg-green-700' onClick={handleDownloadText}> <IoDownloadOutline/>Download</button>
      </div>
    </div>
  );
};

export default TextTransformer;
