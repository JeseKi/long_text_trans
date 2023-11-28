import React ,{useEffect , useState} from "react"
import "./App.css"

import IdKeySave from "./components/id_key_save";
import TransBtn from "./components/transbtn";
import Output from "./components/output";

function App() {
  const [output, setOutput] = useState("");
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  const handleFocus = () => {
    setShowPlaceholder(false);
  };

  const handleBlur = () => {
    if (!document.getElementById("input").value) {
      setShowPlaceholder(true);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>长文本翻译器--Powered by Tencent</h1>
      <IdKeySave />

      <div className='container'>
        <p>源文本</p>
        <textarea
        className='text_container'
        placeholder={showPlaceholder ? "在这里输入文字或拖入文件" : ""}
        id="input"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
        <TransBtn setOutput={setOutput}/>
        <Output output={output}/>
      </div>
    </div>
  );
}  

export default App;
