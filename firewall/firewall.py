from flask import Flask, request, jsonify
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from werkzeug.security import safe_str_cmp
import re

app = Flask(__name__)
limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["1000 per day", "200 per hour"],
)

# Simulated IP blocklist
blocked_ips = set()

# Simulated blacklist for malicious payloads
malicious_payloads = [
    re.compile(r'drop\s+table', re.IGNORECASE),
    re.compile(r'script', re.IGNORECASE),
    re.compile(r'eval\(', re.IGNORECASE),
    re.compile(r'select\s+\*\s+from', re.IGNORECASE),
]

# Function to check if IP is blocked
def is_blocked(ip):
    return ip in blocked_ips

# Function to check payload for malicious content
def has_malicious_content(payload):
    for pattern in malicious_payloads:
        if pattern.search(payload):
            return True
    return False

# Function to check if the request method is allowed for the endpoint
def is_method_allowed(endpoint, method):
    allowed_methods = {
        '/safe_endpoint': ['GET', 'POST'],
        '/restricted_endpoint': ['POST','GET'],
    }
    if endpoint in allowed_methods:
        return method in allowed_methods[endpoint]
    return False

# Firewall middleware
@app.before_request
def firewall():
    client_ip = request.remote_addr
    request_endpoint = request.path
    request_payload = request.data.decode('utf8')

    # Check if the IP is blocked
    if is_blocked(client_ip):
        return jsonify({'error': 'Access Denied'}), 403
    
    # Check payload for malicious content
    if has_malicious_content(request_payload):
        block_ip(client_ip)  # Block IP if payload is malicious
        return jsonify({'error': 'Potential attack detected. IP blocked.'}), 403

    # Check if the request method is allowed for the endpoint
    if not is_method_allowed(request_endpoint, request.method):
        return jsonify({'error': 'Method Not Allowed'}), 405

    if 'User-Agent' not in request.headers or not request.headers.get('User-Agent'):
        return jsonify({'error': 'Invalid User-Agent header'}), 400

    pass


def block_ip(ip):
    blocked_ips.add(ip)
    return jsonify({'message': f'IP {ip} blocked'})

def unblock_ip(ip):
    if ip in blocked_ips:
        blocked_ips.remove(ip)
        return jsonify({'message': f'IP {ip} unblocked'})
    return jsonify({'message': f'IP {ip} not found in blocklist'})

if __name__ == '__main__':
    app.run(port=5000)
