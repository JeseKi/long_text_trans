import json
from tencentcloud.common import credential
from tencentcloud.common.profile.client_profile import ClientProfile
from tencentcloud.common.profile.http_profile import HttpProfile
from tencentcloud.tmt.v20180321 import tmt_client, models
from tencentcloud.common.exception.tencent_cloud_sdk_exception import TencentCloudSDKException
import time
from logics.logic import split_text

def call_translation_api(segment, source_lang, target_lang, tencent_cloud_id, tencent_cloud_key):
    """
    Call the Tencent Cloud Translation API to translate a text segment
    from the source language to the target language.
    """
    try:
        cred = credential.Credential(tencent_cloud_id, tencent_cloud_key)  # 使用动态传入的ID和KEY
        httpProfile = HttpProfile()
        httpProfile.endpoint = "tmt.tencentcloudapi.com"
        clientProfile = ClientProfile()
        clientProfile.httpProfile = httpProfile
        client = tmt_client.TmtClient(cred, "ap-beijing", clientProfile)

        req = models.TextTranslateRequest()
        params = {
            "SourceText": segment,
            "Source": source_lang,
            "Target": target_lang,
            "ProjectId": 0
        }
        req.from_json_string(json.dumps(params))
        resp = client.TextTranslate(req)
        return json.loads(resp.to_json_string())["TargetText"]
        
    except TencentCloudSDKException as err:
        print(err)
        return segment


# The rest of your functions (split_text, translate_text) should remain unchanged,
# just ensure they call this new `call_translation_api` function to perform the actual translation.

def translate_text(text, source_lang, target_lang, tencent_cloud_id, tencent_cloud_key):
    translated_text = ""
    segments = split_text(text)
    for segment in segments:
        translated_segment = call_translation_api(segment, source_lang, target_lang, tencent_cloud_id, tencent_cloud_key)
        translated_text += translated_segment
        time.sleep(0.19)
    return translated_text