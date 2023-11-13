import React, { useState } from 'react';
import axios from 'axios';
import "./App.css"

function App() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  // 处理文件拖拽事件
  const handleDragOver = (e) => {
    e.preventDefault(); // 阻止默认行为
  };

  // 处理文件放下事件
  const handleDrop = (e) => {
    e.preventDefault(); // 阻止默认行为
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (readEvent) => {
        setInputText(readEvent.target.result);
      };
      reader.readAsText(files[0]); // 读取文件内容作为文本
    }
  };
  const handleTranslate = () => {
    axios.post('http://localhost:5000/translate', { text: inputText })
      .then(response => {
        setTranslatedText(response.data.translatedText);
      })
      .catch(error => {
        console.error('Error translating text:', error);
      });
  };

  return (
    <div>
      <h1 style={{textAlign:'center'}}>长文本翻译器--Powered by Tencent</h1>
      <div className='container'>
        <p>源文本</p>
        <textarea className='text_container'
          placeholder="在这里输入文字或拖入文件"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onFocus={e => e.target.placeholder = ''}
          onBlur={e => e.target.placeholder = '在这里输入文字或拖入文件'}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        />
        <br/>
        <button className='button' onClick={handleTranslate}>翻译</button>
        <div>
          <p>翻译后的文本:</p>
          <textarea className='text_container'
            value={translatedText}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}

export default App;
