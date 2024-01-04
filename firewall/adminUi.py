from firewall.waf import WebApplicationFirewall

class AdminUi:
    def __init__(self, waf_instance):
        self.waf = waf_instance

    def display_menu(self):
        print("Admin Menu:")
        print("1. Block IP")
        print("2. Unblock IP")
        print("3. View Logger")
        print("4. Change Rate Limits")
        print("5. Add Malicious Payload to DB")
        print("6. Exit")

    def block_ip(self):
        ip = input("Enter IP to block: ")
        self.waf.add_blocked_ip(ip)
        print(f"IP {ip} has been blocked.")

    def unblock_ip(self):
        ip = input("Enter IP to unblock: ")
        self.waf.remove_blocked_ip(ip)
        print(f"IP {ip} has been unblocked.")

    def view_logger(self):
        try:
            with open(self.waf.log_file, 'r') as f:
                logs = f.read()
                print(logs)
        except FileNotFoundError:
            print("Log file not found.")

    def change_rate_limits(self):
        new_limits_per_day = input("Enter new rate limit per day (e.g., '100 per day'): ")
        new_limit_per_hour = input("Enter new rate limit per hour(e.g., '20 per hour'): ")
        
        self.waf.change_rate_limits(new_limits_per_day, new_limit_per_hour)

    def add_malicious_payload(self):
        payload = input("Enter malicious payload to add to DB: ")
        self.waf.add_malicious_payload(payload)
        print("Malicious payload added to the database.")

    def start(self):
        while True:
            self.display_menu()
            choice = input("Enter your choice (1-6): ")

            if choice == '1':
                self.block_ip()
            elif choice == '2':
                self.unblock_ip()
            elif choice == '3':
                self.view_logger()
            elif choice == '4':
                self.change_rate_limits()
            elif choice == '5':
                self.add_malicious_payload()
            elif choice == '6':
                print("Exiting Admin UI.")
                break
            else:
                print("Invalid choice. Please enter a number between 1 and 6.")
