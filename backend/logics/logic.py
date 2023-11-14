import json
from tencentcloud.common import credential
from tencentcloud.common.profile.client_profile import ClientProfile
from tencentcloud.common.profile.http_profile import HttpProfile
from tencentcloud.common.exception.tencent_cloud_sdk_exception import TencentCloudSDKException
from tencentcloud.tmt.v20180321 import tmt_client, models
import time

# Constants
MAX_LENGTH = 5500

def split_text(text):
    text_length = len(text)
    segments = []
    
    # Calculate the number of partitions based on the text length
    num_partitions = -(-text_length // MAX_LENGTH)  # Ceiling division
    
    # If the text is already short enough, just return it in a list
    if num_partitions == 1:
        return [text]
    
    last_split_point = 0
    for i in range(1, num_partitions):
        partition_length = i * text_length // num_partitions
        period_index = text.rfind('.', last_split_point, partition_length)
        
        if period_index == -1:
            # If we can't find a period, split at the partition_length
            split_point = partition_length
        else:
            split_point = period_index + 1  # Include the period in the segment
        
        # Print where the split is happening
        start = max(0, split_point - 10)  # Ensure we don't go beyond the start of the text
        end = min(len(text), split_point + 10)  # Ensure we don't go beyond the end of the text
        print(f"Splitting at position {split_point}: {text[start:split_point]}|{text[split_point:end]}...")
        
        segments.append(text[last_split_point:split_point])
        last_split_point = split_point
    
    # Append the remaining text as the last segment
    segments.append(text[last_split_point:])
    
    return segments

# Test the split_text function with some debugging output
for segment in split_text("A very long text..."):
    print(len(segment), segment[:50] + "...")  # Print the length and the beginning of each segment