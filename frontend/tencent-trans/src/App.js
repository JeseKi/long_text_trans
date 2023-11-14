import React, { useState ,useEffect } from 'react';
import axios from 'axios';
import "./App.css"

function App() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('zh');
  const [languages, setLanguages] = useState({});
  const [tencentCloudID, setTencentCloudID] = useState('');
  const [tencentCloudKey, setTencentCloudKey] = useState('');

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
    if (!inputText.trim()) {
      alert('文本不能为空！');
      return;
    }
    if (!tencentCloudID || !tencentCloudKey) {
      alert('请提供腾讯云ID和KEY！');
      return;
    }
    setIsLoading(true);  // 开始翻译，设置加载状态为true
    axios.post('http://localhost:5000/translate', {
      text: inputText,
      sourceLang: sourceLang,
      targetLang: targetLang,
      tencentCloudID: tencentCloudID,
      tencentCloudKey: tencentCloudKey
    })
    .then(response => {
      setTranslatedText(response.data.translatedText);
      setIsLoading(false);  // 翻译成功，设置加载状态为false
    })
    .catch(error => {
      console.error('Error translating text:', error);
      alert('翻译失败，请检查您的网络连接或腾讯云的ID和KEY是否有问题。');
      setIsLoading(false);  // 翻译失败，设置加载状态为false
    });
  };
  

  useEffect(() => {
    // Load the languages JSON file which now includes local names
    const savedID = localStorage.getItem('tencentCloudID');
    const savedKey = localStorage.getItem('tencentCloudKey');
    if (savedID) setTencentCloudID(savedID);
    if (savedKey) setTencentCloudKey(savedKey);
    fetch('/languages.json')
      .then(response => response.json())
      .then(data => setLanguages(data))
      .catch(error => console.error('Error loading language options:', error));
  }, []);
  const saveCredentials = () => {
    localStorage.setItem('tencentCloudID', tencentCloudID);
    localStorage.setItem('tencentCloudKey', tencentCloudKey);
    alert('ID和KEY已保存！');
  };
  return (
    <div>
      <h1 style={{textAlign:'center'}}>长文本翻译器--Powered by Tencent</h1>
      <div className='container'>
        <p>在这里输入你的腾讯云ID和KEY↓</p>
      <div>
        <span>ID :</span>
          <input
            className='ID_KEY'
            type="text"
            placeholder="腾讯云ID"
            value={tencentCloudID}
            onChange={(e) => setTencentCloudID(e.target.value)}
          />
          <span>KEY :</span>
          <input
            className='ID_KEY'
            type="password"
            placeholder="腾讯云KEY"
            value={tencentCloudKey}
            onChange={(e) => setTencentCloudKey(e.target.value)}
          />
        </div>
        <button className='button' style={{fontSize:'0.8em'}} onClick={saveCredentials}>保存ID和KEY</button>
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
        <div className='button_container'>
          <span className='lang_button_container'>
            <span>源语言</span>
        <select className='button' value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
        {Object.keys(languages).map(lang => (
          <option key={lang} value={lang}>
                        {languages[lang].find(l => l.code === lang).name}
          </option>
        ))}
      </select>
      </span>
        <button className='button' onClick={handleTranslate}>翻译</button>
        <span className='lang_button_container'>
          <span>目标语言</span>
      <select className='button' value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
        {sourceLang in languages && languages[sourceLang].map(lang => (
          <option key={lang.code} value={lang.code}>{lang.name}</option>
        ))}
      </select>
      </span>
      </div>
        <p>翻译后的文本:</p>
        {isLoading ? (
          <div>翻译中...</div>
        ) : (
          <textarea className='text_container'
            value={translatedText}
            readOnly
          />
        )}
      </div>
    </div>
  );
}

export default App;
