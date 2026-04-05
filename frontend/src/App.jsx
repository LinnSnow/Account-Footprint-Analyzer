import { useEffect } from 'react'

const styles = `
  @keyframes float1 { 0%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-30px) rotate(180deg)} 100%{transform:translateY(0) rotate(360deg)} }
  @keyframes float2 { 0%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(40px) rotate(-180deg)} 100%{transform:translateY(0) rotate(-360deg)} }
  @keyframes float3 { 0%{transform:translate(0,0) rotate(0deg)} 50%{transform:translate(20px,-20px) rotate(90deg)} 100%{transform:translate(0,0) rotate(180deg)} }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes fadeIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(0,212,255,0.3)} 50%{box-shadow:0 0 20px 4px rgba(0,212,255,0.15)} }
  * { margin:0; padding:0; box-sizing:border-box; }
  body { background:#0a0f1e; }
  .page { background:#0a0f1e; min-height:100vh; font-family:'Courier New',monospace; color:#fff; overflow-x:hidden; position:relative; }
  .shapes { position:fixed; top:0; left:0; width:100%; height:100%; pointer-events:none; z-index:0; overflow:hidden; }
  .shape { position:absolute; opacity:0.12; }
  .s1 { width:40px;height:40px;background:#00d4ff;border-radius:4px;top:10%;left:8%;animation:float1 8s ease-in-out infinite; }
  .s2 { width:0;height:0;border-left:20px solid transparent;border-right:20px solid transparent;border-bottom:35px solid #00ff88;top:20%;left:75%;animation:float2 10s ease-in-out infinite; }
  .s3 { width:30px;height:30px;border-radius:50%;background:#ff6b6b;top:60%;left:15%;animation:float3 7s ease-in-out infinite; }
  .s4 { width:50px;height:50px;background:#7c3aed;border-radius:4px;top:70%;left:85%;animation:float1 12s ease-in-out infinite; }
  .s5 { width:0;height:0;border-left:15px solid transparent;border-right:15px solid transparent;border-bottom:26px solid #00d4ff;top:40%;left:92%;animation:float2 9s ease-in-out infinite; }
  .s6 { width:25px;height:25px;border-radius:50%;background:#00ff88;top:85%;left:40%;animation:float3 11s ease-in-out infinite; }
  .s7 { width:35px;height:35px;background:#ff6b6b;border-radius:4px;top:30%;left:45%;animation:float1 14s ease-in-out infinite;opacity:0.07; }
  .s8 { width:0;height:0;border-left:25px solid transparent;border-right:25px solid transparent;border-bottom:43px solid #7c3aed;top:75%;left:60%;animation:float2 6s ease-in-out infinite; }
  .s9 { width:20px;height:20px;border-radius:50%;background:#00d4ff;top:5%;left:55%;animation:float3 13s ease-in-out infinite; }
  .s10 { width:45px;height:45px;background:#00ff88;border-radius:4px;top:50%;left:28%;animation:float2 15s ease-in-out infinite;opacity:0.06; }
  .content { position:relative; z-index:1; }
  header { display:flex;align-items:center;justify-content:space-between;padding:1.2rem 2.5rem;border-bottom:0.5px solid rgba(0,212,255,0.2); }
  .logo { display:flex;align-items:center;gap:10px; }
  .logo-icon { width:34px;height:34px;background:rgba(0,212,255,0.15);border:1px solid rgba(0,212,255,0.4);border-radius:8px;display:flex;align-items:center;justify-content:center; }
  .logo-text { font-size:15px;font-weight:700;letter-spacing:0.05em;color:#00d4ff; }
  nav { display:flex;align-items:center;gap:1.5rem; }
  nav a { font-size:13px;color:#8892a4;text-decoration:none;letter-spacing:0.03em; }
  nav a:hover { color:#00d4ff; }
  .signin-btn { font-size:12px;padding:6px 18px;border-radius:6px;border:1px solid rgba(0,212,255,0.5);background:rgba(0,212,255,0.08);color:#00d4ff;cursor:pointer;letter-spacing:0.05em;font-family:'Courier New',monospace; }
  .signin-btn:hover { background:rgba(0,212,255,0.18); }
  .hero { display:flex;flex-direction:column;align-items:center;text-align:center;padding:5rem 2rem 3rem;gap:1.5rem;animation:fadeIn 0.8s ease-out; }
  .badge { font-size:11px;padding:4px 14px;border-radius:999px;background:rgba(0,255,136,0.1);color:#00ff88;border:1px solid rgba(0,255,136,0.3);letter-spacing:0.08em; }
  .hero h1 { font-size:52px;font-weight:700;line-height:1.1;max-width:640px;letter-spacing:-0.02em; }
  .hero h1 span { color:#00d4ff; }
  .hero p { font-size:15px;color:#8892a4;max-width:460px;line-height:1.8;font-family:sans-serif; }
  .cta-btn { display:flex;align-items:center;gap:10px;padding:12px 28px;background:linear-gradient(135deg,rgba(0,212,255,0.2),rgba(0,255,136,0.1));color:#fff;border:1px solid rgba(0,212,255,0.5);border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;letter-spacing:0.03em;animation:pulse 2s infinite;margin-top:0.5rem;font-family:'Courier New',monospace; }
  .cta-btn:hover { background:rgba(0,212,255,0.25); }
  .stats { display:flex;gap:3rem;justify-content:center;padding:0 0 3rem;flex-wrap:wrap; }
  .stat { text-align:center; }
  .stat-num { font-size:28px;font-weight:700;color:#00d4ff; }
  .stat-label { font-size:12px;color:#8892a4;margin-top:4px;font-family:sans-serif;letter-spacing:0.03em; }
  .terminal-wrap { margin:0 auto 3rem;max-width:800px;padding:0 2.5rem; }
  .terminal { background:#060c1a;border:1px solid rgba(0,212,255,0.25);border-radius:12px;overflow:hidden; }
  .t-header { display:flex;align-items:center;gap:8px;padding:12px 16px;background:#0a1020;border-bottom:1px solid rgba(0,212,255,0.15); }
  .t-dot { width:10px;height:10px;border-radius:50%; }
  .t-title { font-size:12px;color:#8892a4;margin-left:auto;letter-spacing:0.05em; }
  .t-body { padding:1.25rem 1.5rem;display:flex;flex-direction:column;gap:6px; }
  .t-line { font-size:13px;line-height:1.8; }
  .t-dim { color:#3a4a6a; }
  .t-cyan { color:#00d4ff; }
  .t-green { color:#00ff88; }
  .t-red { color:#ff6b6b; }
  .t-white { color:#c8d6e5; }
  .t-cursor { display:inline-block;width:8px;height:14px;background:#00d4ff;vertical-align:middle;animation:blink 1s infinite; }
  .divider { height:0.5px;background:linear-gradient(90deg,transparent,rgba(0,212,255,0.3),transparent);margin:0 2.5rem 3rem; }
  .features { padding:0 2.5rem 4rem;max-width:880px;margin:0 auto; }
  .features-label { font-size:11px;color:#00ff88;letter-spacing:0.12em;text-align:center;margin-bottom:2rem; }
  .features-grid { display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px; }
  .fcard { background:#0f1628;border:1px solid rgba(0,212,255,0.15);border-radius:10px;padding:1.25rem;display:flex;flex-direction:column;gap:12px;transition:border-color 0.2s; }
  .fcard:hover { border-color:rgba(0,212,255,0.4); }
  .fcard-icon { width:38px;height:38px;border-radius:8px;display:flex;align-items:center;justify-content:center; }
  .fcard h3 { font-size:13px;font-weight:700;color:#fff;letter-spacing:0.03em; }
  .fcard p { font-size:12px;color:#8892a4;line-height:1.7;font-family:sans-serif; }
  footer { border-top:0.5px solid rgba(0,212,255,0.15);padding:1.5rem 2.5rem;display:flex;justify-content:space-between;align-items:center; }
  .footer-left { font-size:12px;color:#3a4a6a;letter-spacing:0.03em; }
  .footer-right { display:flex;gap:1.5rem; }
  .footer-right a { font-size:12px;color:#3a4a6a;text-decoration:none; }
  .footer-right a:hover { color:#00d4ff; }
`

function App() {
  useEffect(() => {
    const styleTag = document.createElement('style')
    styleTag.innerHTML = styles
    document.head.appendChild(styleTag)
    return () => document.head.removeChild(styleTag)
  }, [])

  const goToLogin = () => {
    window.location.href = 'http://127.0.0.1:8000/login'
  }

  return (
    <div className="page">

      <div className="shapes">
        <div className="shape s1"></div>
        <div className="shape s2"></div>
        <div className="shape s3"></div>
        <div className="shape s4"></div>
        <div className="shape s5"></div>
        <div className="shape s6"></div>
        <div className="shape s7"></div>
        <div className="shape s8"></div>
        <div className="shape s9"></div>
        <div className="shape s10"></div>
      </div>

      <div className="content">

        {/* HEADER */}
        <header>
          <div className="logo">
            <div className="logo-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83" />
              </svg>
            </div>
            <span className="logo-text">FOOTPRINT_ANALYZER</span>
          </div>
          <nav>
            <a href="#">How it works</a>
            <a href="#">Privacy</a>
            <button className="signin-btn" onClick={goToLogin}>[ SIGN IN ]</button>
          </nav>
        </header>

        {/* HERO */}
        <div className="hero">
          <div className="badge">// PRIVACY-FIRST ACCOUNT INTELLIGENCE</div>
          <h1>Your digital footprint,<br /><span>finally visible.</span></h1>
          <p>Discover every account linked to your email. Detect breaches, score risks, and delete what you no longer need.</p>
          <button className="cta-btn" onClick={goToLogin}>
            <img src="https://www.google.com/favicon.ico" style={{ width: 16, height: 16 }} alt="G" />
            Sign in with Google
          </button>
        </div>

        {/* STATS */}
        <div className="stats">
          <div className="stat">
            <div className="stat-num">500+</div>
            <div className="stat-label">// emails scanned</div>
          </div>
          <div className="stat">
            <div className="stat-num">0</div>
            <div className="stat-label">// bodies ever read</div>
          </div>
          <div className="stat">
            <div className="stat-num">100%</div>
            <div className="stat-label">// metadata only</div>
          </div>
        </div>

        {/* TERMINAL */}
        <div className="terminal-wrap">
          <div className="terminal">
            <div className="t-header">
              <div className="t-dot" style={{ background: '#ff6b6b' }}></div>
              <div className="t-dot" style={{ background: '#ffd93d' }}></div>
              <div className="t-dot" style={{ background: '#00ff88' }}></div>
              <span className="t-title">footprint_analyzer -- scan</span>
            </div>
            <div className="t-body">
              <div className="t-line"><span className="t-dim">$</span> <span className="t-cyan">./scan</span> <span className="t-white"> --email user@gmail.com --depth 1000</span></div>
              <div className="t-line"><span className="t-dim">→</span> <span className="t-white">authenticating via Google OAuth... </span><span className="t-green">OK</span></div>
              <div className="t-line"><span className="t-dim">→</span> <span className="t-white">fetching gmail metadata headers...</span></div>
              <div className="t-line"><span className="t-green">✓</span> <span className="t-white"> 847 unique senders detected</span></div>
              <div className="t-line"><span className="t-green">✓</span> <span className="t-white"> 312 services classified</span></div>
              <div className="t-line"><span className="t-red">!</span> <span className="t-white"> 14 accounts found in breach databases</span></div>
              <div className="t-line"><span className="t-red">!</span> <span className="t-white"> 3 high-risk accounts flagged for review</span></div>
              <div className="t-line"><span className="t-green">✓</span> <span className="t-white"> risk scores computed — dashboard ready</span></div>
              <div className="t-line"><span className="t-dim">$</span> <span className="t-cursor"></span></div>
            </div>
          </div>
        </div>

        <div className="divider"></div>

        {/* FEATURES */}
        <div className="features">
          <div className="features-label">// WHAT IT DOES</div>
          <div className="features-grid">
            <div className="fcard">
              <div className="fcard-icon" style={{ background: 'rgba(0,212,255,0.1)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h3>Gmail metadata scan</h3>
              <p>Reads only sender, subject, and date. Never the body. Your content stays private, always.</p>
            </div>
            <div className="fcard">
              <div className="fcard-icon" style={{ background: 'rgba(0,255,136,0.1)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3>Breach detection</h3>
              <p>Cross-references detected accounts against known data breach databases in real time.</p>
            </div>
            <div className="fcard">
              <div className="fcard-icon" style={{ background: 'rgba(255,107,107,0.1)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff6b6b" strokeWidth="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </div>
              <h3>Risk scoring</h3>
              <p>Every account scored by breach history, dormancy, and service category. Red means act now.</p>
            </div>
            <div className="fcard">
              <div className="fcard-icon" style={{ background: 'rgba(124,58,237,0.15)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                </svg>
              </div>
              <h3>Deletion links</h3>
              <p>Direct links to delete accounts you no longer need, with difficulty ratings per service.</p>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer>
          <div className="footer-left">© 2026 FOOTPRINT_ANALYZER // built with privacy in mind</div>
          <div className="footer-right">
            <a href="#">privacy policy</a>
            <a href="#">how it works</a>
            <a href="#">github</a>
          </div>
        </footer>

      </div>
    </div>
  )
}

export default App