class MinutoDashClient {
  constructor(config = {}) {
    this.wsUrl = config.wsUrl || this.buildWSUrl();
    this.reconnectAttempts = config.reconnectAttempts || 5;
    this.reconnectDelay = config.reconnectDelay || 3000;
    this.ws = null;
    this.isConnected = false;
    this.reconnectCount = 0;
  }
  buildWSUrl() {
    const p = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    return `${p}//${window.location.host}`;
  }
  async connect() {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(this.wsUrl);
        this.ws.onopen = () => {
          this.isConnected = true;
          this.reconnectCount = 0;
          this.updateStatus('online');
          resolve();
        };
        this.ws.onmessage = (e) => this.handle(e.data);
        this.ws.onerror = (err) => { this.updateStatus('error'); reject(err); };
        this.ws.onclose = () => { this.isConnected = false; this.updateStatus('offline'); this.retry(); };
      } catch (e) { reject(e); }
    });
  }
  handle(data) {
    try {
      const m = JSON.parse(data);
      if (m.type === 'cves:update') this.setText('cves-count', m.count);
      if (m.type === 'cisa:update') this.setText('cisa-count', m.count);
      if (m.type === 'certbr:update') this.setText('certbr-count', m.totalIncidents);
      if (m.type === 'malware:update') this.setText('malware-count', m.totalSamples);
      if (m.type === 'risk:update') { this.setText('riskScore', m.score); this.setText('riskLevel', m.level); }
    } catch {}
  }
  setText(id, val) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = val;
    el.classList.add('pulse');
    setTimeout(() => el.classList.remove('pulse'), 500);
  }
  updateStatus(status) {
    const dot = document.getElementById('status-dot');
    const txt = document.getElementById('status-text');
    const map = {
      online: ['bg-green-500', 'text-green-400', 'Online'],
      offline: ['bg-red-500', 'text-red-400', 'Offline'],
      error: ['bg-yellow-500', 'text-yellow-400', 'Erro']
    };
    const [d, t, l] = map[status] || map.offline;
    if (dot) dot.className = `w-2 h-2 rounded-full ${d}`;
    if (txt) { txt.className = `text-sm ${t}`; txt.textContent = l; }
  }
  retry() {
    if (this.reconnectCount >= this.reconnectAttempts) return;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectCount++);
    setTimeout(() => this.connect().catch(() => this.retry()), delay);
  }
  sendHeartbeat() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) this.ws.send(JSON.stringify({ type: 'ping' }));
  }
  async start() {
    try { await this.connect(); } catch {}
    setInterval(() => this.sendHeartbeat(), 30000);
  }
  stop() {
    if (this.ws) this.ws.close();
    this.isConnected = false;
  }
}
if (typeof window !== 'undefined') {
  let client;
  document.addEventListener('DOMContentLoaded', async () => {
    client = new MinutoDashClient();
    await client.start();
    window.addEventListener('beforeunload', () => client.stop());
  });
}
