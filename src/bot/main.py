from __future__ import print_function
import fbmq

import json

print('Loading function')

verify_token = "perrytheplatypus"

def lambda_handler(event, context):
    if 'params' in event.keys():
        params = event['params']['querystring']
        if params and params['hub.mode'] == 'subscribe':
            if params['hub.verify_token'] == verify_token:
                return int(params['hub.challenge']), 200
            else:
                return "Verification error", 403
    else:
        print(event['body'])

    response = {
        'statusCode': 200,
        'body': json.dumps({ 'success': True }),
            'headers': {
                'Content-Type': 'application/json',
            }
    };

    return response
