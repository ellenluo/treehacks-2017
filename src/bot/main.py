from __future__ import print_function

import json

print('Loading function')

verify_token = "perrytheplatypus"

def lambda_handler(event, context):
    if 'params' in event.keys():
        params = event['params']['querystring']
        if params and params['hub.mode'] == 'subscribe':
            if params['hub.verify_token'] == verify_token:
                return int(params['hub.challenge'])
            else:
                return "Verification error"
    else:
	print(json.dumps(event, indent = 2))
    return event
