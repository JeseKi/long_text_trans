from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from translator.translator import Translator
from config import *

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 允许所有来源
    allow_credentials=True,
    allow_methods=["*"],  # 允许所有方法
    allow_headers=["*"],  # 允许所有头部
)

translator = Translator(ID,KEY)

@app.get("/")
async def index():
    return {"message": "Hello World"}

@app.get("/api/tencent_translate")
async def tencent_translate(text: str, source_lang: str, target_lang: str):
    result = translator.elementsTranslate(text, source_lang, target_lang, translator._splitText, translator._tencentTranslate)
    return result

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5000, reload=True)