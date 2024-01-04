from flask import jsonify


class WebApplicationFirewall:
    def __init__(self):
        self.blocked_ips = set()
        self.log_file = 'waf_logs.txt'
        self.malicious_payloads = []

    def handle_request(self, request):
        client_ip = request.remote_addr
        request_payload = request.data.decode('utf-8')

        if self.is_blocked(client_ip):
            return jsonify({'error': 'Access Denied'}), 403

        if self.has_malicious_content(request_payload):
            self.add_blocked_ip(client_ip)
            return jsonify({'error': 'Potential attack detected. IP blocked.'}), 403

        if 'User-Agent' not in request.headers or not request.headers.get('User-Agent'):
            return jsonify({'error': 'Invalid User-Agent header'}), 400

        return None

    def log_blocked_request(self, request):
        with open(self.log_file, 'a') as f:
            f.write(f"Blocked Request: {request}\n")

    def is_blocked(self, ip_address):
        return ip_address in self.blocked_ips

    def has_malicious_content(self, payload):
        for pattern in self.malicious_payloads:
            if pattern.search(payload):
                return True
        return False
    def add_malicious_payload(self, payload):
        self.malicious_payloads.append(payload)
        
    def add_blocked_ip(self, ip):
        self.blocked_ips.add(ip)

    def remove_blocked_ip(self, ip):
        if ip in self.blocked_ips:
            self.blocked_ips.remove(ip)
