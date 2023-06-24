import React, { useState } from 'react';
import { IoCopyOutline, IoCloseSharp, IoDownloadOutline } from 'react-icons/io5';

const TextTransformer = () => {
  const [text, setText] = useState('');

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleTransform = (type) => {
    let transformed = '';

    switch (type) {
      // Transformation cases...

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
