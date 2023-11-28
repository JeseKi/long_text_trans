import React ,{useEffect , useState} from "react"
import "./transbtn.css"

export default function TransBtn ( {setOutput} ) {

    const fetchData = async (input, sourceLang, targetLang, setOutput) => { // 流式获取数据
        const params = new URLSearchParams({
          text: input,
          source_lang: sourceLang,
          target_lang: targetLang,
        });
    
        const url = `http://localhost:5000/api/tencent_translate?${params.toString()}`;

        try {
            const response = await fetch(url);

            const reader = response.body.getReader()
            let result = '';
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              result += new TextDecoder().decode(value);
            }
            console.log(result);
            setOutput(result); // 使用 setOutput 更新数据
            
          } catch (error) {
            console.error('Fetch error:', error);
          }
    };

    const translate = () => { // 发起请求
        const currentInput = document.getElementById("input").value;
        const currentSourceLang = document.getElementById("sourceLang").value;
        const currentTargetLang = document.getElementById("targetLang").value;
      
        fetchData(currentInput, currentSourceLang, currentTargetLang, setOutput);
      };

    return (
        <div>
            <div className='button_container'>
            <span className='lang_button_container'>
                <span>源语言</span>
                <select className='button' id="sourceLang">
                    <option value="en">英文</option>
                </select>
            </span>
            <button className='button' id="trans" onClick={translate}>翻译</button>
            <span className='lang_button_container'>
                <span>目标语言</span>
                <select className='button' id="targetLang">
                    <option value="zh">中文</option>
                </select>
            </span>
            </div>
            <div style={{display:'none'}}>翻译中...</div>
        </div>
    )
}