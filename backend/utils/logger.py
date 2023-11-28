import time
from datetime import datetime

class Logger():
    def time_log(self, event:str, isdatatime: bool):
        """
        记录时间
        :param event: 事件
        :param isdatatime: 是否为系统时间
        :return:
        """
        if isdatatime:
            now_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        else : now_time = time.time()
        with open('log.txt', 'a') as f:
            f.write(f"[INFO]:{event}发生在{now_time}\n")