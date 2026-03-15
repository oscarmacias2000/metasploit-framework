
// 1. Usar WebSockets para servicios específicos
const ws = new WebSocket('ws://192.168.1.1:8080');
ws.onopen = () => console.log('Puerto 8080 abierto');

// 2. Usar WebRTC para obtener IP local
const rtc = new RTCPeerConnection();
rtc.createDataChannel('');
rtc.onicecandidate = (e) => {
    if (e.candidate) {
        console.log('IP local:', e.candidate.address);
    }
};

// 3. Usar Server-Sent Events
const source = new EventSource('http://192.168.1.1:80/events');
source.onopen = () => console.log('Puerto 80 abierto');


// browser-scanner.js (versión para navegador - limitada por CORS)

class BrowserPortScanner {
    constructor() {
        this.commonPorts = [80, 443, 8080, 21, 22, 23, 25, 53, 110, 143, 3389];
        this.services = {
            80: 'HTTP',
            443: 'HTTPS',
            8080: 'HTTP-Proxy',
            21: 'FTP',
            22: 'SSH',
            23: 'Telnet',
            25: 'SMTP',
            53: 'DNS',
            110: 'POP3',
            143: 'IMAP',
            3389: 'RDP'
        };
    }

    async checkPort(host, port) {
        return new Promise((resolve) => {
            const img = new Image();
            const timeout = setTimeout(() => {
                img.src = '';
                resolve({ port, status: 'closed/filtered' });
            }, 3000);

            img.onload = () => {
                clearTimeout(timeout);
                resolve({ port, status: 'open', service: this.services[port] || 'Unknown' });
            };

            img.onerror = () => {
                clearTimeout(timeout);
                // En el navegador, un error puede significar que el puerto está abierto pero no sirve imágenes
                resolve({ port, status: 'unknown', service: this.services[port] || 'Unknown' });
            };

            img.src = `http://${host}:${port}/favicon.ico?${Date.now()}`;
        });
    }

    async scanHost(host) {
        console.log(`Escaneando ${host}...`);
        
        const results = [];
        for (const port of this.commonPorts) {
            const result = await this.checkPort(host, port);
            if (result.status === 'open') {
                console.log(`  Puerto ${port} (${result.service}): ${result.status}`);
                results.push(result);
            }
        }
        
        return results;
    }
}

// Uso en navegador:
// const scanner = new BrowserPortScanner();
// scanner.scanHost('localhost').then(console.log);
