from flask import Flask, make_response, request, jsonify
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import requests
from firewall.waf import WebApplicationFirewall
from firewall.adminUi import AdminUi

app = Flask(__name__)
limiter = Limiter(
    app,
    key_func=get_remote_address,
    default_limits=["1000 per day", "200 per hour"]
)

waf = WebApplicationFirewall(limiter)  # Initialize WAF instance
admin_interface = AdminUi(waf)

# Middleware to handle requests
@app.before_request
@limiter.limit("30 per minute")  # Example rate limit for all endpoints
def handle_request():
    # Check the request against WAF rules
    block_result = waf.handle_request(request)
    if block_result:
        waf.log_blocked_request(request)
        return block_result

    # Forward the request transparently to the server API endpoint
    server_api_url = 'http://your_server_api_endpoint' + request.path
    headers = {key: value for (key, value) in request.headers if key != 'Host'}  # Preserve original headers

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
        return str(e), 500  # Return an error if there's an issue forwarding the request

if __name__ == '__main__':
    app.run(port=5000)
    admin_interface.start()
