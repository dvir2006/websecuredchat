from flask import Flask, make_response, request, jsonify
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import requests
from waf import WebApplicationFirewall
from adminUi import AdminUi
import threading
import logging

app = Flask(__name__)
limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["1000 per day", "200 per hour"]
)
logging.disable()
original_logger_level = app.logger.level 


waf = WebApplicationFirewall(limiter)
admin_interface = AdminUi(waf, app, original_logger_level)

# Middleware to handle requests
@app.before_request
@limiter.limit("30 per minute")
def handle_request():
    block_result = waf.handle_request(request)
    if block_result:
        waf.log_blocked_request(request)
        return block_result

    server_api_url = 'http://localhost:5000' + request.path
    headers = {key: value for (key, value) in request.headers if key != 'Host'}  

    try:
        response = requests.request(
            method=request.method,
            url=server_api_url,
            headers=headers,
            data=request.get_data(),
            cookies=request.cookies,
            allow_redirects=False
        )
        flask_response = make_response(response.text)
        flask_response.status_code = response.status_code
        for key, value in response.headers.items():
            flask_response.headers[key] = value
        return flask_response
    except requests.RequestException as e:
        return str(e), 500  

def run_app():
    app.run(port=4545,ssl_context=('../CA/cert.pem', '../CA/key.pem'), debug=True)

def run_admin_interface():
    admin_interface.start()

if __name__ == '__main__':
    app_thread = threading.Thread(target=run_app)
    admin_interface_thread = threading.Thread(target=run_admin_interface)

    #app_thread.start()
    admin_interface_thread.start()
    app.run(port=4545,ssl_context=('../CA/cert.pem', '../CA/key.pem'), debug=True)
    #app_thread.join()
    admin_interface_thread.join()
