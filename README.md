# Seqchat: A Secured Web Chat App

Seqchat is a web chat application developed by Dvir Profus and Bar Aharoni. The primary focus of this project is to provide a secure communication platform where users can interact with each other through chat or group chat, ensuring that their conversations and data remain protected.

## Technologies Used
- React
- TypeScript
- Node.js
- Express
- Python Flask (WAF - Web Application Firewall)
- Material-UI (MUI)

## Features
- **Secure Communication**: Seqchat uses HTTPS to ensure secure communication between users.
- **Two-Factor Authentication (2FA)**: Enhances security by requiring users to provide two different authentication factors before granting access.
- **CAPTCHA**: Prevents automated bots from accessing the application.
- **JWT (JSON Web Tokens)**: Used for authentication and authorization purposes.
- **Rate Limiting**: Protects the application from abuse by limiting the number of requests a user can make within a certain time frame.
- **IP Blocking**: Blocks malicious IP addresses using the Web Application Firewall (WAF) to prevent attacks.
- **Chat and Group Chat**: Users can communicate with each other through individual or group chats.

## Security Measures
Seqchat employs several security measures to protect against common types of attacks:

### Defenses Against Attacks
- **DDoS/Brute Force Attacks**: Rate limiting and IP blocking help mitigate these types of attacks.
- **Cross-Site Scripting (XSS)**: The application sanitizes user input and uses Content Security Policy (CSP) to prevent XSS attacks.
- **Eavesdropping**: HTTPS ensures that data transmitted between the user's device and the server is encrypted, preventing eavesdropping.
- **Man-in-the-Middle (MITM)**: HTTPS and proper certificate validation protect against MITM attacks.

## License
Seqchat is licensed under the MIT License. See `LICENSE` for more information.

## Disclaimer
Seqchat is a project developed for educational and demonstration purposes. While the developers have made efforts to enhance the security of the application, it is not guaranteed to be completely secure. Users should exercise caution when using the application and take appropriate measures to protect their data and privacy.

*This README file was last updated on February 23, 2024.*
