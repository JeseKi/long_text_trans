from flask import Flask, request, jsonify
from flask_cors import CORS
from api_call import translate_text

app = Flask(__name__)
CORS(app) # 允许跨域请求，对于本地开发是有用的

@app.route('/translate', methods=['POST'])
def translate():
    data = request.get_json()
    text = data.get('text')
    if not text:
        return jsonify({'error': 'No text provided'}), 400
    # 这里将调用你的 translate_text 函数
    translated_text = translate_text(text)
    return jsonify({'translatedText': translated_text})

if __name__ == '__main__':
    app.run(debug=True)
