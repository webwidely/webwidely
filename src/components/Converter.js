import React, { useState } from 'react';
import { IoCopyOutline, IoCloseSharp, IoDownloadOutline } from 'react-icons/io5';

const TextTransformer = () => {
  const [text, setText] = useState('');

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleTransform = (type) => {
    let transformed = text; // Initialize with the current text

    switch (type) {
      // Transformation cases...
      case 'sentence':
        transformed = transformToSentenceCase(text);
        break;
      case 'lower':
        transformed = transformToLowercase(text);
        break;
      case 'upper':
        transformed = transformToUppercase(text);
        break;
      case 'capitalized':
        transformed = transformToCapitalizedCase(text);
        break;
      case 'alternating':
        transformed = transformToAlternatingCase(text);
        break;
      case 'title':
        transformed = transformToTitleCase(text);
        break;
      case 'inverse':
        transformed = transformToInverseCase(text);
        break;
      default:
        break;
    }

    setText(transformed);
  };

  const transformToSentenceCase = (text) => {
    // Transformation logic for sentence case
    return text;
  };

  const transformToLowercase = (text) => {
    // Transformation logic for lowercase
    return text.toLowerCase();
  };

  const transformToUppercase = (text) => {
    // Transformation logic for uppercase
    return text.toUpperCase();
  };

  const transformToCapitalizedCase = (text) => {
    // Transformation logic for capitalized case
    return text
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const transformToAlternatingCase = (text) => {
    // Transformation logic for alternating case
    let transformed = '';
    for (let i = 0; i < text.length; i++) {
      if (i % 2 === 0) {
        transformed += text.charAt(i).toUpperCase();
      } else {
        transformed += text.charAt(i).toLowerCase();
      }
    }
    return transformed;
  };

  const transformToTitleCase = (text) => {
    // Transformation logic for title case
    return text
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const transformToInverseCase = (text) => {
    // Transformation logic for inverse case
    let transformed = '';
    for (let i = 0; i < text.length; i++) {
      const char = text.charAt(i);
      transformed += char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase();
    }
    return transformed;
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
        <button
          className="my-button bg-green-500 hover:bg-green-600 rounded-md"
          onClick={() => handleTransform('sentence')}
        >
          Sentence Case
        </button>
        <button
          className="my-button bg-green-500 hover:bg-green-600 rounded-md"
          onClick={() => handleTransform('lower')}
        >
          Lower Case
        </button>
        <button
          className="my-button bg-green-500 hover:bg-green-600 rounded-md"
          onClick={() => handleTransform('upper')}
        >
          UPPER CASE
        </button>
        <button
          className="my-button bg-green-500 hover:bg-green-600 rounded-md"
          onClick={() => handleTransform('capitalized')}
        >
          Capitalized Case
        </button>
        <button
          className="my-button bg-green-500 hover:bg-green-600 rounded-md"
          onClick={() => handleTransform('alternating')}
        >
          aLtErNaTiNg cAsE
        </button>
        <button
          className="my-button bg-green-500 hover:bg-green-600  rounded-md"
          onClick={() => handleTransform('title')}
        >
          Title Case
        </button>
        <button
          className="my-button bg-green-500 hover:bg-green-600 rounded-md"
          onClick={() => handleTransform('inverse')}
        >
          InVeRsE CaSe
        </button>
        <button className="my-button bg-green-500 hover:bg-green-600 rounded-md" onClick={handleCopyText}>
          <IoCopyOutline />
          Copy
        </button>
        <button className="my-button bg-red-500 hover:bg-red-600 rounded-md" onClick={handleClearText}>
          <IoCloseSharp />
          Clear
        </button>
        <button className="my-button bg-blue-500 hover:bg-blue-600 rounded-md" onClick={handleDownloadText}>
          <IoDownloadOutline />
          Download
        </button>
      </div>
    </div>
  );
};

export default TextTransformer;
