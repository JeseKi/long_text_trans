import json

with open('config.json', 'r') as config_file:
    config = json.load(config_file)

# 现在config变量包含了配置信息，可以像使用字典一样使用它
ID = config["tencentCloudID"]
KEY = config["tencentCloudKey"]