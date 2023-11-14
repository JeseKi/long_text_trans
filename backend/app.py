from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from logics.api_call import translate_text
import os

app = Flask(__name__, static_folder='build', static_url_path='')

CORS(app)
    
@app.route('/translate', methods=['POST'])
def translate():
    data = request.get_json()
    text = data.get('text')
    source_lang = data.get('sourceLang')
    target_lang = data.get('targetLang')
    tencent_cloud_id = data.get('tencentCloudID')
    tencent_cloud_key = data.get('tencentCloudKey')
    print(data)

    if not text or not source_lang or not target_lang or not tencent_cloud_id or not tencent_cloud_key:
        return jsonify({'error': 'Missing required parameters'}), 400

    translated_text = translate_text(text, source_lang, target_lang, tencent_cloud_id, tencent_cloud_key)
    return jsonify({'translatedText': translated_text})

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    # 计算请求的文件的绝对路径
    if path != "":
        file_path = os.path.join(app.static_folder, path)
    else:
        file_path = os.path.join(app.static_folder, 'index.html')
    
    # 检查文件是否存在
    if os.path.exists(file_path):
        # 如果存在，打印文件路径
        print(f"Serving file: {file_path}")
        return send_from_directory(os.path.dirname(file_path), os.path.basename(file_path))
    else:
        # 如果请求的文件不存在，打印错误并服务index.html
        print(f"File not found: {file_path} - Serving index.html")
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=False)