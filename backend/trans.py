from flask import Flask, request, jsonify
from flask_cors import CORS
from api_call import translate_text

app = Flask(__name__)
CORS(app)  # 允许跨域请求，对于本地开发是有用的

@app.route('/translate', methods=['POST'])
def translate():
    data = request.get_json()
    print("Recvied_data:",data)
    text = data.get('text')
    source_lang = data.get('sourceLang')  # 获取源语言代码
    target_lang = data.get('targetLang')  # 获取目标语言代码

    if not text or not source_lang or not target_lang:
        return jsonify({'error': 'Missing text or language parameters'}), 400

    # 现在传入源语言和目标语言参数
    translated_text = translate_text(text, source_lang, target_lang)

    return jsonify({'translatedText': translated_text})

if __name__ == '__main__':
    app.run(debug=True)
