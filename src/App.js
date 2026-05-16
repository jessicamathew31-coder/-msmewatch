import { useState, useEffect } from "react";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const MSME_DATA = [
  { id:"M0001",name:"Sharma Traders 95",sector:"Healthcare",city:"Delhi",tier:"Metro",revenue:4779716,debt:1017034,score:82.3,currentRatio:1.05,dscr:1.8,margin:8.1,gst:"Yes",status:"Green",risk:"LOW RISK" },
  { id:"M0002",name:"Reddy Constructions 76",sector:"Construction",city:"Pune",tier:"Metro",revenue:13117380,debt:2923559,score:79.1,currentRatio:1.95,dscr:1.2,margin:21.7,gst:"Yes",status:"Green",risk:"LOW RISK" },
  { id:"M0003",name:"Chaudhari Mills 16",sector:"Healthcare",city:"Jaipur",tier:"Tier-2",revenue:4155188,debt:1721241,score:61.2,currentRatio:2.07,dscr:0.9,margin:28.3,gst:"No",status:"Amber",risk:"WATCH" },
  { id:"M0004",name:"Pandey Services 27",sector:"Manufacturing",city:"Chennai",tier:"Metro",revenue:10253483,debt:3283102,score:55.4,currentRatio:0.77,dscr:0.7,margin:17.3,gst:"Yes",status:"Amber",risk:"WATCH" },
  { id:"M0005",name:"Kapoor Textiles 44",sector:"Manufacturing",city:"Mumbai",tier:"Metro",revenue:7823400,debt:2100000,score:88.2,currentRatio:2.1,dscr:2.3,margin:22.5,gst:"Yes",status:"Green",risk:"LOW RISK" },
  { id:"M0006",name:"Nair Exports 12",sector:"IT Services",city:"Bengaluru",tier:"Metro",revenue:3200000,debt:890000,score:71.5,currentRatio:1.6,dscr:1.4,margin:15.2,gst:"Yes",status:"Amber",risk:"WATCH" },
  { id:"M0007",name:"Iyer Consultants 33",sector:"IT Services",city:"Chennai",tier:"Metro",revenue:2800000,debt:650000,score:76.8,currentRatio:1.8,dscr:1.7,margin:18.4,gst:"Yes",status:"Green",risk:"LOW RISK" },
  { id:"M0008",name:"Gupta Industries 78",sector:"Food & Beverage",city:"Ahmedabad",tier:"Tier-2",revenue:2100000,debt:780000,score:68.3,currentRatio:1.3,dscr:1.1,margin:12.6,gst:"No",status:"Amber",risk:"WATCH" },
  { id:"M0009",name:"Mishra Manufacturing 21",sector:"Manufacturing",city:"Nagpur",tier:"Tier-2",revenue:3900000,debt:1200000,score:74.1,currentRatio:1.7,dscr:1.5,margin:16.8,gst:"Yes",status:"Amber",risk:"WATCH" },
  { id:"M0010",name:"Patel Enterprises 55",sector:"Retail Kirana",city:"Indore",tier:"Tier-2",revenue:1800000,debt:420000,score:65.7,currentRatio:1.4,dscr:1.2,margin:10.3,gst:"No",status:"Amber",risk:"WATCH" },
  { id:"M0053",name:"Sharma Traders 60",sector:"Food & Beverage",city:"Indore",tier:"Tier-2",revenue:980000,debt:310000,score:35.7,currentRatio:1.34,dscr:0.31,margin:4.2,gst:"No",status:"Red",risk:"HIGH RISK" },
  { id:"M0094",name:"Nair Exports 92",sector:"Retail Kirana",city:"Hyderabad",tier:"Metro",revenue:1200000,debt:480000,score:35.3,currentRatio:0.83,dscr:0.66,margin:3.1,gst:"No",status:"Red",risk:"HIGH RISK" },
  { id:"M0099",name:"Reddy Constructions 32",sector:"Retail Kirana",city:"Hyderabad",tier:"Metro",revenue:1100000,debt:390000,score:26.7,currentRatio:0.82,dscr:0.27,margin:2.4,gst:"No",status:"Red",risk:"HIGH RISK" },
  { id:"M0180",name:"Singh & Sons 44",sector:"Food & Beverage",city:"Delhi",tier:"Metro",revenue:1500000,debt:520000,score:38.1,currentRatio:1.0,dscr:0.09,margin:5.1,gst:"No",status:"Red",risk:"HIGH RISK" },
  { id:"M0201",name:"Agarwal Supplies 56",sector:"IT Services",city:"Lucknow",tier:"Tier-2",revenue:1800000,debt:630000,score:32.8,currentRatio:1.31,dscr:0.28,margin:3.8,gst:"No",status:"Red",risk:"HIGH RISK" },
  { id:"M0022",name:"Kumar Foods 19",sector:"Food & Beverage",city:"Mumbai",tier:"Metro",revenue:5200000,debt:1400000,score:77.4,currentRatio:1.9,dscr:1.6,margin:19.2,gst:"Yes",status:"Green",risk:"LOW RISK" },
  { id:"M0034",name:"Verma Healthcare 8",sector:"Healthcare",city:"Bengaluru",tier:"Metro",revenue:6100000,debt:1800000,score:84.1,currentRatio:2.2,dscr:2.0,margin:24.1,gst:"Yes",status:"Green",risk:"LOW RISK" },
  { id:"M0045",name:"Joshi Retail 67",sector:"Retail Kirana",city:"Ahmedabad",tier:"Tier-2",revenue:1400000,debt:350000,score:69.8,currentRatio:1.5,dscr:1.3,margin:11.4,gst:"Yes",status:"Amber",risk:"WATCH" },
  { id:"M0067",name:"Shah Electronics 23",sector:"IT Services",city:"Pune",tier:"Metro",revenue:4500000,debt:1100000,score:80.2,currentRatio:2.0,dscr:1.9,margin:20.8,gst:"Yes",status:"Green",risk:"LOW RISK" },
  { id:"M0089",name:"Desai Pharma 41",sector:"Healthcare",city:"Hyderabad",tier:"Metro",revenue:8200000,debt:2400000,score:86.7,currentRatio:2.4,dscr:2.2,margin:26.3,gst:"Yes",status:"Green",risk:"LOW RISK" },
];

const SECTOR_DATA = [
  { sector:"Retail Kirana",   avg:71.1, total:44, high_risk:3 },
  { sector:"IT Services",     avg:72.2, total:46, high_risk:2 },
  { sector:"Food & Beverage", avg:75.1, total:51, high_risk:2 },
  { sector:"Manufacturing",   avg:75.4, total:60, high_risk:2 },
  { sector:"Construction",    avg:77.3, total:56, high_risk:1 },
  { sector:"Healthcare",      avg:77.7, total:43, high_risk:0 },
];

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const B = {
  bg:    "#f0ede6",
  black: "#111111",
  red:   "#ff3300",
  green: "#1a6b00",
  amber: "#cc7700",
  muted: "#888888",
  line:  "#cccccc",
  white: "#ffffff",
};

const scoreColor  = (s)  => s >= 70 ? B.green : s >= 45 ? B.amber : B.red;
const statusColor = (st) => st === "Green" ? B.green : st === "Amber" ? B.amber : B.red;

// ─── SHARED ───────────────────────────────────────────────────────────────────
function TopBar({ page, setPage }) {
  const [time, setTime] = useState(new Date());
  useEffect(() => { const i = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(i); }, []);
  const nav = [
    { id:"landing",   label:"Home" },
    { id:"overview",  label:"Overview" },
    { id:"dashboard", label:"Dashboard" },
    { id:"lookup",    label:"MSME Lookup" },
    { id:"monitor",   label:"Risk Monitor" },
    { id:"about",     label:"About" },
  ];
  return (
    <div style={{ background:B.black, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 24px", height:44, position:"sticky", top:0, zIndex:100, borderBottom:`3px solid ${B.black}` }}>
      <div onClick={() => setPage("landing")} style={{ fontFamily:"'Arial Black',sans-serif", fontSize:14, fontWeight:900, color:B.bg, letterSpacing:3, textTransform:"uppercase", cursor:"pointer" }}>
        MSMEWatch
      </div>
      <div style={{ display:"flex" }}>
        {nav.map(n => (
          <button key={n.id} onClick={() => setPage(n.id)} style={{ background:page===n.id ? B.red : "transparent", color:page===n.id ? B.white : "#888", border:"none", borderLeft:"1px solid #333", fontFamily:"'Arial',sans-serif", fontSize:10, letterSpacing:1, textTransform:"uppercase", padding:"0 14px", height:44, cursor:"pointer", fontWeight:page===n.id?900:400 }}>
            {n.label}
          </button>
        ))}
      </div>
      <div style={{ fontFamily:"'Arial Black',sans-serif", fontSize:11, fontWeight:900, color:B.red, letterSpacing:1 }}>
        {time.toLocaleTimeString("en-IN", { hour12:false })} IST
      </div>
    </div>
  );
}

function Ticker() {
  const items = ["MSME AVG SCORE: 74.9","HIGH RISK: 10 (3.3%)","WATCH: 92 (30.7%)","LOW RISK: 198 (66%)","GST EDGE: +13.6 PTS","RETAIL KIRANA: 71.1","HEALTHCARE: 77.7","METRO AVG: 76.4","TIER-2 AVG: 73.8","TOTAL MSMEs: 300","SECTORS: 6","CITIES: 15"];
  const [pos, setPos] = useState(0);
  useEffect(() => { const i = setInterval(() => setPos(p => p + 1), 20); return () => clearInterval(i); }, []);
  const full = items.join("   /   ");
  const tw   = full.length * 8.4;
  return (
    <div style={{ background:B.black, borderBottom:`3px solid ${B.red}`, height:28, overflow:"hidden", display:"flex", alignItems:"center" }}>
      <div style={{ transform:`translateX(-${pos % tw}px)`, whiteSpace:"nowrap", fontFamily:"'Arial Black',sans-serif", fontSize:10, fontWeight:900, color:B.red, letterSpacing:1 }}>
        {full + "   /   " + full + "   /   " + full}
      </div>
    </div>
  );
}

function ScoreBar({ value, max=100, color }) {
  return <div style={{ height:3, background:"#ddd", marginTop:6 }}><div style={{ height:3, width:`${Math.min((value/max)*100,100)}%`, background:color||B.black }} /></div>;
}

function StatusPill({ status, risk }) {
  const c = statusColor(status);
  return <span style={{ display:"inline-block", border:`2px solid ${c}`, color:c, fontFamily:"'Arial Black',sans-serif", fontSize:8, fontWeight:900, letterSpacing:1, padding:"2px 7px", textTransform:"uppercase" }}>{risk}</span>;
}

function SectionHead({ label, right }) {
  return (
    <div style={{ display:"flex", alignItems:"baseline", justifyContent:"space-between", padding:"10px 24px", borderBottom:`1px solid ${B.line}` }}>
      <div style={{ fontFamily:"'Arial',sans-serif", fontSize:10, letterSpacing:3, textTransform:"uppercase", color:B.muted }}>{label}</div>
      {right && <div style={{ fontFamily:"'Arial Black',sans-serif", fontSize:20, fontWeight:900, letterSpacing:-1, color:B.black }}>{right}</div>}
    </div>
  );
}

// ─── LANDING PAGE ─────────────────────────────────────────────────────────────
function Landing({ setPage }) {
  return (
    <div style={{ background:B.black, minHeight:"calc(100vh - 75px)", display:"flex", flexDirection:"column" }}>

      {/* Hero */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"60px 40px 40px", textAlign:"center", position:"relative", overflow:"hidden" }}>

        {/* Background grid lines */}
        <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(${B.red}15 1px, transparent 1px), linear-gradient(90deg, ${B.red}15 1px, transparent 1px)`, backgroundSize:"60px 60px", pointerEvents:"none" }} />

        {/* Logo mark */}
        <div style={{ position:"relative", marginBottom:32 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:0, marginBottom:8 }}>
            <div style={{ width:56, height:56, background:B.red, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <div style={{ fontFamily:"'Arial Black',sans-serif", fontSize:28, fontWeight:900, color:B.white, letterSpacing:-2 }}>M</div>
            </div>
            <div style={{ width:56, height:56, background:B.white, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <div style={{ fontFamily:"'Arial Black',sans-serif", fontSize:28, fontWeight:900, color:B.black, letterSpacing:-2 }}>W</div>
            </div>
          </div>
          <div style={{ fontFamily:"'Arial Black',sans-serif", fontSize:11, fontWeight:900, color:B.muted, letterSpacing:6, textTransform:"uppercase" }}>MSMEWatch</div>
        </div>

        {/* Main headline */}
        <div style={{ position:"relative", marginBottom:24 }}>
          <div style={{ fontFamily:"'Arial Black',sans-serif", fontSize:72, fontWeight:900, lineHeight:0.9, textTransform:"uppercase", letterSpacing:-4, color:B.white, marginBottom:0 }}>
            India's MSME
          </div>
          <div style={{ fontFamily:"'Arial Black',sans-serif", fontSize:72, fontWeight:900, lineHeight:0.9, textTransform:"uppercase", letterSpacing:-4, color:B.red }}>
            Risk Intelligence
          </div>
          <div style={{ fontFamily:"'Arial Black',sans-serif", fontSize:72, fontWeight:900, lineHeight:0.9, textTransform:"uppercase", letterSpacing:-4, WebkitTextStroke:`2px ${B.white}`, color:"transparent" }}>
            Platform
          </div>
        </div>

        {/* Subheadline */}
        <div style={{ fontFamily:"'Arial',sans-serif", fontSize:14, color:"#aaa", lineHeight:1.7, maxWidth:560, marginBottom:40 }}>
          300 Indian MSMEs. 6 sectors. 5 financial ratios. One score that tells bankers, analysts, and policymakers exactly which businesses are at risk of default — before it happens.
        </div>

        {/* CTA buttons */}
        <div style={{ display:"flex", gap:0, marginBottom:60 }}>
          <button onClick={() => setPage("overview")} style={{ background:B.red, color:B.white, fontFamily:"'Arial Black',sans-serif", fontSize:11, fontWeight:900, letterSpacing:2, padding:"14px 32px", border:`2px solid ${B.red}`, textTransform:"uppercase", cursor:"pointer" }}>
            Enter Platform
          </button>
          <button onClick={() => setPage("dashboard")} style={{ background:"transparent", color:B.white, fontFamily:"'Arial Black',sans-serif", fontSize:11, fontWeight:900, letterSpacing:2, padding:"14px 32px", border:`2px solid #444`, borderLeft:"none", textTransform:"uppercase", cursor:"pointer" }}>
            View Dashboard
          </button>
        </div>

        {/* Stats strip */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:1, background:"#222", width:"100%", maxWidth:800 }}>
          {[
            { num:"300",    label:"MSMEs Analysed" },
            { num:"74.9",   label:"Avg Stress Score" },
            { num:"+13.6",  label:"GST Edge (pts)" },
            { num:"10",     label:"High Risk Flagged" },
          ].map((s,i) => (
            <div key={i} style={{ background:"#111", padding:"20px 16px", textAlign:"center" }}>
              <div style={{ fontFamily:"'Arial Black',sans-serif", fontSize:28, fontWeight:900, letterSpacing:-1.5, color: i===3 ? B.red : i===2 ? B.red : B.white }}>{s.num}</div>
              <div style={{ fontFamily:"'Arial',sans-serif", fontSize:9, letterSpacing:2, textTransform:"uppercase", color:"#555", marginTop:4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom feature bar */}
      <div style={{ background:"#0a0a0a", borderTop:`3px solid ${B.red}`, display:"grid", gridTemplateColumns:"repeat(3,1fr)" }}>
        {[
          { icon:"◈", label:"Bank-Grade Analysis", desc:"5 financial ratios used by PSU banks and NBFCs" },
          { icon:"◎", label:"300 MSMEs Scored",    desc:"Across 6 sectors and 15 Indian cities" },
          { icon:"◆", label:"GST Intelligence",    desc:"13.6 pt compliance edge — the key differentiator" },
        ].map((f,i) => (
          <div key={i} style={{ padding:"20px 24px", borderRight: i<2 ? `1px solid #222` : "none" }}>
            <div style={{ fontFamily:"'Arial Black',sans-serif", fontSize:18, color:B.red, marginBottom:6 }}>{f.icon}</div>
            <div style={{ fontFamily:"'Arial Black',sans-serif", fontSize:11, fontWeight:900, color:B.white, letterSpacing:1, textTransform:"uppercase", marginBottom:4 }}>{f.label}</div>
            <div style={{ fontFamily:"'Arial',sans-serif", fontSize:10, color:"#555", lineHeight:1.6 }}>{f.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── OVERVIEW (old Home) ──────────────────────────────────────────────────────
function Overview({ setPage }) {
  return (
    <div style={{ background:B.bg }}>

      {/* Hero: fixed equal-height grid */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", borderBottom:`3px solid ${B.black}`, minHeight:420 }}>

        {/* Left */}
        <div style={{ padding:"32px 28px", borderRight:`3px solid ${B.black}`, display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
          <div>
            <div style={{ display:"inline-block", background:B.black, color:B.bg, fontFamily:"'Arial',sans-serif", fontSize:9, letterSpacing:2, padding:"4px 10px", textTransform:"uppercase", marginBottom:20 }}>
              India · MSME Intelligence · 2025
            </div>
            <div style={{ fontFamily:"'Arial Black',sans-serif", fontSize:48, fontWeight:900, lineHeight:0.92, textTransform:"uppercase", letterSpacing:-2.5, color:B.black, marginBottom:20 }}>
              Know<br/>which<br/>MSMEs are<br/><span style={{ color:B.red }}>at</span>{" "}
              <span style={{ WebkitTextStroke:`2px ${B.black}`, color:"transparent" }}>risk</span>
            </div>
            <div style={{ fontFamily:"'Arial',sans-serif", fontSize:12, color:"#666", lineHeight:1.7, borderLeft:`3px solid ${B.red}`, paddingLeft:12, maxWidth:340, marginBottom:24 }}>
              300 Indian MSMEs. 6 sectors. 5 financial ratios — the same methodology credit analysts use at PSU banks and NBFCs. One score that tells you who defaults next.
            </div>
          </div>
          <div style={{ display:"flex" }}>
            <button onClick={() => setPage("dashboard")} style={{ background:B.black, color:B.bg, fontFamily:"'Arial Black',sans-serif", fontSize:10, fontWeight:900, letterSpacing:2, padding:"11px 22px", border:`2px solid ${B.black}`, textTransform:"uppercase", cursor:"pointer" }}>View Dashboard</button>
            <button onClick={() => setPage("lookup")} style={{ background:"transparent", color:B.black, fontFamily:"'Arial Black',sans-serif", fontSize:10, fontWeight:900, letterSpacing:2, padding:"11px 22px", border:`2px solid ${B.black}`, borderLeft:"none", textTransform:"uppercase", cursor:"pointer" }}>MSME Lookup</button>
          </div>
        </div>

        {/* Right: 2x2 stat grid, equal height cells */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gridTemplateRows:"1fr 1fr" }}>
          {[
            { label:"MSMEs Analysed",      value:"300",   bg:B.bg,    color:B.black, lblColor:B.muted },
            { label:"Avg Stress Score",     value:"74.9",  bg:B.black, color:B.red,   lblColor:"#555"  },
            { label:"High Risk MSMEs",      value:"10",    bg:B.red,   color:B.white, lblColor:"#ffaa99" },
            { label:"GST Compliance Edge",  value:"+13.6", bg:B.bg,    color:B.red,   lblColor:B.muted },
          ].map((s,i) => (
            <div key={i} style={{ background:s.bg, padding:"24px 20px", display:"flex", flexDirection:"column", justifyContent:"flex-end", borderBottom: i<2 ? `2px solid ${B.black}` : "none", borderRight: (i===0||i===2) ? `2px solid ${B.black}` : "none" }}>
              <div style={{ fontFamily:"'Arial',sans-serif", fontSize:9, letterSpacing:2, textTransform:"uppercase", color:s.lblColor, marginBottom:6 }}>{s.label}</div>
              <div style={{ fontFamily:"'Arial Black',sans-serif", fontSize:40, fontWeight:900, letterSpacing:-2, color:s.color, lineHeight:1 }}>{s.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Key finding */}
      <div style={{ background:B.red, display:"flex", alignItems:"center", gap:20, padding:"14px 28px", borderBottom:`3px solid ${B.black}`, flexWrap:"wrap" }}>
        <div style={{ fontFamily:"'Arial Black',sans-serif", fontSize:9, fontWeight:900, letterSpacing:2, color:B.white, textTransform:"uppercase", whiteSpace:"nowrap" }}>Key Finding</div>
        <div style={{ flex:1, fontFamily:"'Arial',sans-serif", fontSize:11, color:B.white, lineHeight:1.5, minWidth:200 }}>GST compliance is the single biggest differentiator in MSME financial health — compliant businesses score an average of 78.2 vs 64.6 for non-compliant ones.</div>
        <div style={{ fontFamily:"'Arial Black',sans-serif", fontSize:20, fontWeight:900, color:B.black, whiteSpace:"nowrap", letterSpacing:-0.5 }}>78.2 vs 64.6</div>
      </div>

      {/* Sector matrix */}
      <div style={{ borderBottom:`3px solid ${B.black}` }}>
        <SectionHead label="Sector Risk Matrix" right="6 Sectors" />
        <div style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)" }}>
          {SECTOR_DATA.map((s,i) => {
            const c = s.avg >= 75 ? B.green : s.avg >= 73 ? B.amber : B.red;
            return (
              <div key={s.sector} style={{ padding:"16px 14px", borderRight: i<5 ? `2px solid ${B.black}` : "none", background: s.high_risk >= 3 ? "#fff0ee" : B.bg }}>
                <div style={{ fontFamily:"'Arial',sans-serif", fontSize:9, letterSpacing:1, textTransform:"uppercase", color:B.muted, marginBottom:6 }}>{s.sector}</div>
                <div style={{ fontFamily:"'Arial Black',sans-serif", fontSize:26, fontWeight:900, letterSpacing:-1, color:c }}>{s.avg}</div>
                <ScoreBar value={s.avg} color={c} />
                <div style={{ fontFamily:"'Arial',sans-serif", fontSize:9, textTransform:"uppercase", letterSpacing:1, marginTop:6, color: s.high_risk>0 ? B.red : B.green }}>{s.high_risk>0 ? `${s.high_risk} high risk` : "0 high risk"}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Methodology */}
      <div style={{ display:"grid", gridTemplateColumns:"280px 1fr", borderBottom:`3px solid ${B.black}` }}>
        <div style={{ padding:"24px 28px", borderRight:`3px solid ${B.black}` }}>
          <div style={{ fontFamily:"'Arial',sans-serif", fontSize:10, letterSpacing:3, textTransform:"uppercase", color:B.muted, marginBottom:14 }}>Scoring Methodology</div>
          <div style={{ fontFamily:"'Arial Black',sans-serif", fontSize:64, fontWeight:900, letterSpacing:-4, lineHeight:1, color:B.black }}>5<span style={{ color:B.red }}>×</span></div>
          <div style={{ fontFamily:"'Arial',sans-serif", fontSize:11, color:"#666", lineHeight:1.7, marginTop:10 }}>Five financial ratios — the same ones credit analysts at PSU banks and NBFCs use — combined into a single 0–100 stress score.</div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gridTemplateRows:"1fr 1fr" }}>
          {[
            { name:"Current Ratio",   wt:"25%", desc:"Short-term bill payment", highlight:false },
            { name:"DSCR",            wt:"25%", desc:"Loan repayment capacity", highlight:false },
            { name:"Profit Margin",   wt:"20%", desc:"Revenue after all costs", highlight:false },
            { name:"Debt-to-Revenue", wt:"15%", desc:"Debt load vs income",     highlight:false },
            { name:"GST Compliance",  wt:"15%", desc:"Filing discipline signal",highlight:true  },
          ].map((r,i) => (
            <div key={r.name} style={{ padding:"16px 18px", borderLeft:`2px solid ${B.black}`, borderBottom: i<3 ? `2px solid ${B.black}` : "none", background: r.highlight ? B.black : B.bg }}>
              <div style={{ fontFamily:"'Arial',sans-serif", fontSize:9, letterSpacing:1, textTransform:"uppercase", color: r.highlight ? "#555" : B.muted }}>{r.name}</div>
              <div style={{ fontFamily:"'Arial Black',sans-serif", fontSize:24, fontWeight:900, letterSpacing:-1, color: r.highlight ? B.red : B.black, margin:"4px 0" }}>{r.wt}</div>
              <div style={{ fontFamily:"'Arial',sans-serif", fontSize:9, color: r.highlight ? "#555" : "#999" }}>{r.desc}</div>
            </div>
          ))}
          <div style={{ padding:"16px 18px", borderLeft:`2px solid ${B.black}`, display:"flex", flexDirection:"column", justifyContent:"center", gap:6 }}>
            <div style={{ fontFamily:"'Arial',sans-serif", fontSize:9, letterSpacing:1, textTransform:"uppercase", color:B.muted, marginBottom:4 }}>Score Bands</div>
            {[["70–100","Green",B.green],["45–69","Amber",B.amber],["0–44","Red",B.red]].map(([r,l,c]) => (
              <div key={l} style={{ fontFamily:"'Arial Black',sans-serif", fontSize:13, fontWeight:900, color:c }}>{r} {l}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ background:B.black, display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 28px" }}>
        <div style={{ fontFamily:"'Arial Black',sans-serif", fontSize:12, fontWeight:900, color:B.bg, letterSpacing:3 }}>MSMEWatch</div>
        <div style={{ fontFamily:"'Arial',sans-serif", fontSize:9, color:"#555", letterSpacing:1, textTransform:"uppercase" }}>
          <span style={{ display:"inline-block", width:6, height:6, background:B.red, marginRight:8, verticalAlign:"middle" }}/>
          300 MSMEs · 6 Sectors · 15 Cities · RBI/SIDBI Calibrated
        </div>
        <div style={{ fontFamily:"'Arial',sans-serif", fontSize:9, color:"#555", textTransform:"uppercase", letterSpacing:1 }}>Built by Jessica Mathew · MBA Finance & Technology</div>
      </div>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard() {
  return (
    <div style={{ background:B.bg }}>
      {/* KPI row */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", borderBottom:`3px solid ${B.black}` }}>
        {[
          { label:"Avg Stress Score", value:"74.9",     bg:B.black, color:B.red,   lbl:"#555" },
          { label:"Low Risk",         value:"198 (66%)", bg:B.bg,   color:B.green, lbl:B.muted },
          { label:"Watch",            value:"92 (31%)",  bg:B.bg,   color:B.amber, lbl:B.muted },
          { label:"High Risk",        value:"10 (3%)",   bg:B.red,  color:B.white, lbl:"#ffaa99" },
        ].map((m,i) => (
          <div key={m.label} style={{ background:m.bg, padding:"20px 18px", borderRight: i<3 ? `2px solid ${B.black}` : "none" }}>
            <div style={{ fontFamily:"'Arial',sans-serif", fontSize:9, letterSpacing:2, textTransform:"uppercase", color:m.lbl, marginBottom:6 }}>{m.label}</div>
            <div style={{ fontFamily:"'Arial Black',sans-serif", fontSize:30, fontWeight:900, letterSpacing:-1.5, color:m.color }}>{m.value}</div>
          </div>
        ))}
      </div>

      {/* Sector deviation + risk distribution */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", borderBottom:`3px solid ${B.black}` }}>
        <div style={{ borderRight:`3px solid ${B.black}` }}>
          <SectionHead label="Sector Deviation from Target (75)" />
          <div style={{ padding:"16px 24px" }}>
            {SECTOR_DATA.map(s => {
              const dev = s.avg - 75;
              const pos = dev >= 0;
              const pct = Math.min(Math.abs(dev)/15*50, 50);
              const c   = pos ? B.green : B.red;
              return (
                <div key={s.sector} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                  <span style={{ fontFamily:"'Arial',sans-serif", fontSize:10, color:B.muted, width:120, flexShrink:0, textAlign:"right" }}>{s.sector}</span>
                  <div style={{ flex:1, height:18, background:"#e0ddd6", position:"relative" }}>
                    <div style={{ position:"absolute", left:"50%", top:0, bottom:0, width:2, background:B.black }} />
                    <div style={{ position:"absolute", left:pos?"50%":`${50-pct}%`, width:`${pct}%`, top:3, bottom:3, background:c }} />
                  </div>
                  <span style={{ fontFamily:"'Arial Black',sans-serif", fontSize:11, fontWeight:900, color:c, width:38, textAlign:"right" }}>{pos?"+":""}{dev.toFixed(1)}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <SectionHead label="Risk Distribution" />
          <div style={{ padding:"16px 24px" }}>
            {[["Green","Low Risk",198,B.green],["Amber","Watch",92,B.amber],["Red","High Risk",10,B.red]].map(([s,l,n,c]) => (
              <div key={s} style={{ marginBottom:20 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                  <span style={{ fontFamily:"'Arial Black',sans-serif", fontSize:11, fontWeight:900, color:c, textTransform:"uppercase" }}>{s} — {l}</span>
                  <span style={{ fontFamily:"'Arial',sans-serif", fontSize:10, color:B.muted }}>{n} ({((n/300)*100).toFixed(0)}%)</span>
                </div>
                <ScoreBar value={n} max={300} color={c} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* GST + City + Alerts */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", borderBottom:`3px solid ${B.black}` }}>
        <div style={{ borderRight:`3px solid ${B.black}` }}>
          <SectionHead label="GST Compliance Impact" />
          <div style={{ padding:"16px 24px" }}>
            {[["GST Filed On Time",78.2,B.green],["GST Not Filed",64.6,B.red]].map(([l,v,c]) => (
              <div key={l} style={{ marginBottom:16 }}>
                <div style={{ fontFamily:"'Arial',sans-serif", fontSize:9, letterSpacing:2, textTransform:"uppercase", color:B.muted, marginBottom:4 }}>{l}</div>
                <div style={{ fontFamily:"'Arial Black',sans-serif", fontSize:30, fontWeight:900, letterSpacing:-1.5, color:c }}>{v}</div>
                <ScoreBar value={v} color={c} />
              </div>
            ))}
            <div style={{ background:B.red, padding:"10px 14px", marginTop:8 }}>
              <div style={{ fontFamily:"'Arial',sans-serif", fontSize:9, letterSpacing:1, color:"#ffaa99", textTransform:"uppercase" }}>Compliance Premium</div>
              <div style={{ fontFamily:"'Arial Black',sans-serif", fontSize:24, fontWeight:900, letterSpacing:-1, color:B.white }}>+13.6 pts</div>
            </div>
          </div>
        </div>
        <div style={{ borderRight:`3px solid ${B.black}` }}>
          <SectionHead label="City Tier Analysis" />
          <div style={{ padding:"16px 24px" }}>
            {[["Metro",76.4,B.green],["Tier-2",73.8,B.amber],["Tier-3",71.2,B.red]].map(([t,v,c]) => (
              <div key={t} style={{ marginBottom:20 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:2 }}>
                  <span style={{ fontFamily:"'Arial',sans-serif", fontSize:9, letterSpacing:2, textTransform:"uppercase", color:B.muted }}>{t}</span>
                  <span style={{ fontFamily:"'Arial Black',sans-serif", fontSize:10, fontWeight:900, color:c }}>{v<75?"▼":"▲"} {Math.abs(v-75).toFixed(1)}</span>
                </div>
                <div style={{ fontFamily:"'Arial Black',sans-serif", fontSize:28, fontWeight:900, letterSpacing:-1.5, color:c }}>{v}</div>
                <ScoreBar value={v} color={c} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", padding:"10px 24px", borderBottom:`1px solid ${B.line}` }}>
            <div style={{ fontFamily:"'Arial',sans-serif", fontSize:10, letterSpacing:3, textTransform:"uppercase", color:B.muted }}>Alert Feed</div>
            <div style={{ fontFamily:"'Arial Black',sans-serif", fontSize:10, fontWeight:900, color:B.red }}>● Live</div>
          </div>
          <div style={{ padding:"14px 24px" }}>
            {[
              {id:"M0099",msg:"DSCR Critical: 0.27",c:B.red},
              {id:"M0180",msg:"DSCR Breach: 0.09",c:B.red},
              {id:"M0201",msg:"High Risk Flag",c:B.red},
              {id:"M0053",msg:"Score < 40",c:B.red},
              {id:"M0003",msg:"GST Non-Compliant",c:B.amber},
              {id:"M0004",msg:"Cur Ratio: 0.77",c:B.amber},
              {id:"M0008",msg:"Margin Watch",c:B.amber},
              {id:"M0010",msg:"GST Non-Compliant",c:B.amber},
            ].map((a,i) => (
              <div key={i} style={{ display:"flex", gap:10, marginBottom:8, alignItems:"center" }}>
                <span style={{ color:a.c, fontSize:10 }}>●</span>
                <span style={{ fontFamily:"'Arial',sans-serif", fontSize:9, color:B.muted, width:44 }}>{a.id}</span>
                <span style={{ fontFamily:"'Arial',sans-serif", fontSize:10, color:a.c }}>{a.msg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── LOOKUP ───────────────────────────────────────────────────────────────────
function Lookup() {
  const [q, setQ]     = useState("");
  const [sel, setSel] = useState(null);
  const filtered = q
    ? MSME_DATA.filter(m => m.name.toLowerCase().includes(q.toLowerCase()) || m.id.toLowerCase().includes(q.toLowerCase()) || m.sector.toLowerCase().includes(q.toLowerCase()) || m.city.toLowerCase().includes(q.toLowerCase()))
    : MSME_DATA.slice(0,10);

  return (
    <div style={{ background:B.bg, display:"grid", gridTemplateColumns:"1fr 1fr", minHeight:"calc(100vh - 75px)" }}>
      <div style={{ borderRight:`3px solid ${B.black}`, display:"flex", flexDirection:"column" }}>
        <SectionHead label="MSME Search" />
        <div style={{ padding:"14px 24px", borderBottom:`2px solid ${B.black}` }}>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search by ID / name / sector / city" style={{ width:"100%", padding:"10px 14px", fontFamily:"'Arial',sans-serif", fontSize:12, border:`2px solid ${B.black}`, background:B.bg, outline:"none", boxSizing:"border-box" }} />
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"60px 1fr 55px 90px", gap:4, padding:"6px 24px", borderBottom:`1px solid ${B.line}`, background:"#e8e5de" }}>
          {["ID","Name","Score","Status"].map(h => <span key={h} style={{ fontFamily:"'Arial',sans-serif", fontSize:9, letterSpacing:1, textTransform:"uppercase", color:B.muted }}>{h}</span>)}
        </div>
        <div style={{ overflowY:"auto", flex:1 }}>
          {filtered.map(m => {
            const c = statusColor(m.status);
            const active = sel?.id === m.id;
            return (
              <div key={m.id} onClick={() => setSel(m)} style={{ display:"grid", gridTemplateColumns:"60px 1fr 55px 90px", gap:4, padding:"10px 24px", borderBottom:`1px solid ${B.line}`, cursor:"pointer", background:active?"#e0ddd6":B.bg, borderLeft:active?`4px solid ${B.red}`:"4px solid transparent", alignItems:"center" }}>
                <span style={{ fontFamily:"'Arial',sans-serif", fontSize:8, color:B.muted }}>{m.id}</span>
                <div>
                  <div style={{ fontFamily:"'Arial',sans-serif", fontSize:11, color:B.black, fontWeight:active?700:400 }}>{m.name}</div>
                  <div style={{ fontFamily:"'Arial',sans-serif", fontSize:9, color:B.muted }}>{m.sector} · {m.city}</div>
                </div>
                <span style={{ fontFamily:"'Arial Black',sans-serif", fontSize:15, fontWeight:900, color:c, letterSpacing:-0.5 }}>{m.score}</span>
                <StatusPill status={m.status} risk={m.risk} />
              </div>
            );
          })}
        </div>
      </div>
      {sel ? (
        <div style={{ display:"flex", flexDirection:"column" }}>
          <div style={{ padding:"24px 28px", borderBottom:`3px solid ${B.black}`, background:sel.status==="Red"?"#fff0ee":B.bg }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
              <div>
                <div style={{ fontFamily:"'Arial',sans-serif", fontSize:9, letterSpacing:2, textTransform:"uppercase", color:B.muted, marginBottom:4 }}>{sel.id}</div>
                <div style={{ fontFamily:"'Arial Black',sans-serif", fontSize:18, fontWeight:900, color:B.black }}>{sel.name}</div>
                <div style={{ fontFamily:"'Arial',sans-serif", fontSize:11, color:B.muted }}>{sel.sector} · {sel.city} · {sel.tier}</div>
              </div>
              <StatusPill status={sel.status} risk={sel.risk} />
            </div>
            <div style={{ fontFamily:"'Arial Black',sans-serif", fontSize:72, fontWeight:900, letterSpacing:-4, color:scoreColor(sel.score), lineHeight:1 }}>{sel.score}</div>
            <div style={{ fontFamily:"'Arial',sans-serif", fontSize:10, color:B.muted, textTransform:"uppercase", letterSpacing:1 }}>Financial Stress Score / 100</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:2, marginTop:14 }}>
              {[["Revenue",`₹${(sel.revenue/100000).toFixed(1)}L`,B.black],["Total Debt",`₹${(sel.debt/100000).toFixed(1)}L`,B.amber],["Sector",sel.sector,B.black]].map(([l,v,c]) => (
                <div key={l} style={{ background:"#e8e5de", padding:"8px 10px" }}>
                  <div style={{ fontFamily:"'Arial',sans-serif", fontSize:9, letterSpacing:1, textTransform:"uppercase", color:B.muted, marginBottom:2 }}>{l}</div>
                  <div style={{ fontFamily:"'Arial Black',sans-serif", fontSize:12, fontWeight:900, color:c }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderBottom:`3px solid ${B.black}` }}>
            <SectionHead label="Ratio Breakdown" />
            <div style={{ padding:"14px 28px" }}>
              {[
                ["Current Ratio",sel.currentRatio, sel.currentRatio>=1.5?B.green:sel.currentRatio>=1.0?B.amber:B.red,"Target ≥ 1.5"],
                ["DSCR",         sel.dscr,          sel.dscr>=1.5?B.green:sel.dscr>=1.0?B.amber:B.red,              "Target ≥ 1.5"],
                ["Profit Margin",`${sel.margin}%`,   sel.margin>=15?B.green:sel.margin>=5?B.amber:B.red,             "Target ≥ 15%"],
                ["GST Compliance",sel.gst,           sel.gst==="Yes"?B.green:B.red,                                  sel.gst==="Yes"?"Compliant":"Non-Compliant"],
              ].map(([l,v,c,n]) => (
                <div key={l} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderBottom:`1px solid ${B.line}` }}>
                  <div>
                    <div style={{ fontFamily:"'Arial',sans-serif", fontSize:10, textTransform:"uppercase", letterSpacing:1, color:B.muted }}>{l}</div>
                    <div style={{ fontFamily:"'Arial',sans-serif", fontSize:9, color:"#aaa" }}>{n}</div>
                  </div>
                  <span style={{ fontFamily:"'Arial Black',sans-serif", fontSize:20, fontWeight:900, color:c }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ padding:"16px 28px", background:sel.score>=70?"#f0fff0":sel.score>=45?"#fffaf0":"#fff0ee" }}>
            <div style={{ fontFamily:"'Arial',sans-serif", fontSize:9, letterSpacing:2, textTransform:"uppercase", color:B.muted, marginBottom:8 }}>Credit Recommendation</div>
            {sel.score>=70 && <div style={{ fontFamily:"'Arial Black',sans-serif", fontSize:13, fontWeight:900, color:B.green }}>Creditworthy — Approve. Meets standard thresholds.</div>}
            {sel.score>=45&&sel.score<70 && <div style={{ fontFamily:"'Arial Black',sans-serif", fontSize:13, fontWeight:900, color:B.amber }}>Conditional — Enhanced monitoring. Collateral required.</div>}
            {sel.score<45 && <div style={{ fontFamily:"'Arial Black',sans-serif", fontSize:13, fontWeight:900, color:B.red }}>High Risk — Recommend rejection or restructuring review.</div>}
            <div style={{ marginTop:10 }}>
              {sel.currentRatio<1.0 && <div style={{ fontFamily:"'Arial',sans-serif", fontSize:10, color:B.red, marginBottom:4 }}>Current Ratio {sel.currentRatio} — Cannot cover short-term obligations</div>}
              {sel.dscr<1.0 && <div style={{ fontFamily:"'Arial',sans-serif", fontSize:10, color:B.red, marginBottom:4 }}>DSCR {sel.dscr} — Insufficient income to service debt</div>}
              {sel.gst==="No" && <div style={{ fontFamily:"'Arial',sans-serif", fontSize:10, color:B.amber }}>GST non-compliant — –13.6 pt penalty applied</div>}
            </div>
          </div>
        </div>
      ) : (
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:400 }}>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontFamily:"'Arial Black',sans-serif", fontSize:48, fontWeight:900, color:"#ddd", letterSpacing:-3, marginBottom:12 }}>?</div>
            <div style={{ fontFamily:"'Arial',sans-serif", fontSize:10, letterSpacing:2, textTransform:"uppercase", color:B.muted }}>Select an MSME to view analysis</div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── RISK MONITOR ─────────────────────────────────────────────────────────────
function Monitor() {
  const [f, setF] = useState("ALL");
  const atRisk   = MSME_DATA.filter(m => m.status==="Red" || m.status==="Amber");
  const filtered = f==="ALL" ? atRisk : atRisk.filter(m => m.status===f);
  return (
    <div style={{ background:B.bg }}>
      <div style={{ display:"flex", borderBottom:`3px solid ${B.black}` }}>
        {[["ALL",atRisk.length,"All Risk"],["Red",atRisk.filter(m=>m.status==="Red").length,"High Risk"],["Amber",atRisk.filter(m=>m.status==="Amber").length,"Watch"]].map(([v,n,l]) => (
          <button key={v} onClick={() => setF(v)} style={{ background:f===v?(v==="Red"?B.red:v==="Amber"?B.amber:B.black):B.bg, color:f===v?B.white:(v==="Red"?B.red:v==="Amber"?B.amber:B.muted), fontFamily:"'Arial Black',sans-serif", fontSize:10, fontWeight:900, letterSpacing:2, textTransform:"uppercase", padding:"12px 24px", border:"none", borderRight:`2px solid ${B.black}`, cursor:"pointer" }}>
            {l} ({n})
          </button>
        ))}
      </div>
      <div style={{ padding:"20px 24px", display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))", gap:12 }}>
        {filtered.map(m => {
          const c = m.status==="Red" ? B.red : B.amber;
          return (
            <div key={m.id} style={{ background:B.bg, border:`2px solid ${B.black}`, borderTop:`4px solid ${c}` }}>
              <div style={{ padding:"12px 14px", borderBottom:`2px solid ${B.black}`, display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                <div>
                  <div style={{ fontFamily:"'Arial',sans-serif", fontSize:8, color:B.muted, marginBottom:2 }}>{m.id}</div>
                  <div style={{ fontFamily:"'Arial Black',sans-serif", fontSize:13, fontWeight:900, color:B.black }}>{m.name}</div>
                  <div style={{ fontFamily:"'Arial',sans-serif", fontSize:9, color:B.muted }}>{m.sector} · {m.city} · {m.tier}</div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontFamily:"'Arial Black',sans-serif", fontSize:30, fontWeight:900, letterSpacing:-1.5, color:c, lineHeight:1 }}>{m.score}</div>
                  <StatusPill status={m.status} risk={m.risk} />
                </div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:2, padding:"10px 14px 8px" }}>
                {[["Cur Ratio",m.currentRatio,m.currentRatio<1?B.red:m.currentRatio<1.5?B.amber:B.green],["DSCR",m.dscr,m.dscr<1?B.red:m.dscr<1.5?B.amber:B.green],["GST",m.gst,m.gst==="Yes"?B.green:B.red]].map(([l,v,c2]) => (
                  <div key={l} style={{ background:"#e8e5de", padding:"6px 8px", textAlign:"center" }}>
                    <div style={{ fontFamily:"'Arial',sans-serif", fontSize:8, color:B.muted, textTransform:"uppercase", letterSpacing:1 }}>{l}</div>
                    <div style={{ fontFamily:"'Arial Black',sans-serif", fontSize:14, fontWeight:900, color:c2 }}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ padding:"0 14px 12px" }}>
                {m.currentRatio<1.0 && <div style={{ fontFamily:"'Arial',sans-serif", fontSize:9, color:B.red, marginBottom:2 }}>Current Ratio Breach</div>}
                {m.dscr<1.0         && <div style={{ fontFamily:"'Arial',sans-serif", fontSize:9, color:B.red, marginBottom:2 }}>DSCR Breach</div>}
                {m.gst==="No"       && <div style={{ fontFamily:"'Arial',sans-serif", fontSize:9, color:B.amber }}>GST Non-Compliant</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
function About() {
  return (
    <div style={{ background:B.bg }}>

      {/* Builder hero */}
      <div style={{ background:B.black, padding:"40px 28px", borderBottom:`3px solid ${B.red}`, display:"grid", gridTemplateColumns:"1fr 1fr", gap:40, alignItems:"center" }}>
        <div>
          <div style={{ fontFamily:"'Arial',sans-serif", fontSize:9, letterSpacing:3, textTransform:"uppercase", color:B.red, marginBottom:12 }}>The Builder</div>
          <div style={{ fontFamily:"'Arial Black',sans-serif", fontSize:42, fontWeight:900, letterSpacing:-2, color:B.white, lineHeight:1, marginBottom:16 }}>Jessica<br/>Mathew</div>
          <div style={{ fontFamily:"'Arial',sans-serif", fontSize:12, color:"#aaa", lineHeight:1.8, marginBottom:20 }}>MBA Finance & Technology · MIT ADT University, Pune (2025)<br/>CBAP · CAP · Microsoft Project Management</div>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {["Advanced Excel","Power BI","SQL","Python","React"].map(t => (
              <span key={t} style={{ fontFamily:"'Arial',sans-serif", fontSize:9, letterSpacing:1, textTransform:"uppercase", border:`1px solid #333`, color:"#888", padding:"4px 10px" }}>{t}</span>
            ))}
          </div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:2 }}>
          {[
            { num:"300", label:"MSMEs Analysed" },
            { num:"6",   label:"Sectors Covered" },
            { num:"15",  label:"Cities Mapped" },
            { num:"5",   label:"Financial Ratios" },
          ].map((s,i) => (
            <div key={i} style={{ background:"#111", padding:"20px 16px" }}>
              <div style={{ fontFamily:"'Arial Black',sans-serif", fontSize:32, fontWeight:900, letterSpacing:-1.5, color:B.red }}>{s.num}</div>
              <div style={{ fontFamily:"'Arial',sans-serif", fontSize:9, letterSpacing:1, textTransform:"uppercase", color:"#555", marginTop:4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 4 info cards */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", borderBottom:`3px solid ${B.black}` }}>
        {[
          { tag:"The Problem",     title:"63M MSMEs. ₹20–25T Credit Gap.",   body:"Indian MSMEs contribute 29% of GDP but face a massive credit gap. Banks rely on collateral and credit history — most MSMEs have neither. MSMEWatch builds the analytical layer that should exist between raw financial data and credit decisions." },
          { tag:"The Methodology", title:"5 Ratios. One Score. Bank-Grade.", body:"Financial Stress Score (0–100) = Current Ratio (25%) + DSCR (25%) + Profit Margin (20%) + Debt-to-Revenue (15%) + GST Compliance (15%). The same ratios credit analysts at PSU banks and NBFCs use — automated across 300 businesses." },
          { tag:"Key Finding",     title:"GST Compliance = +13.6 Points.",   body:"The single biggest differentiator in MSME financial health is GST compliance. Compliant MSMEs score 78.2. Non-compliant score 64.6. That 13.6 point gap reflects financial discipline that banks should price into credit decisions." },
          { tag:"Why It Matters",  title:"Early Warning Saves Credit.",      body:"By the time an MSME defaults, it's too late. MSMEWatch flags stress signals early — low DSCR, current ratio breaches, GST non-compliance — so lenders and policymakers can act before the default, not after." },
        ].map(({ tag, title, body }, i) => (
          <div key={tag} style={{ borderRight:i%2===0?`3px solid ${B.black}`:"none", borderBottom:`3px solid ${B.black}` }}>
            <div style={{ background:"#e8e5de", padding:"8px 24px", borderBottom:`2px solid ${B.black}` }}>
              <span style={{ fontFamily:"'Arial Black',sans-serif", fontSize:9, fontWeight:900, letterSpacing:2, textTransform:"uppercase", color:B.red }}>{tag}</span>
            </div>
            <div style={{ padding:"22px 24px" }}>
              <div style={{ fontFamily:"'Arial Black',sans-serif", fontSize:16, fontWeight:900, color:B.black, letterSpacing:-0.5, marginBottom:12, lineHeight:1.2 }}>{title}</div>
              <div style={{ fontFamily:"'Arial',sans-serif", fontSize:11, color:"#555", lineHeight:1.8 }}>{body}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tech stack */}
      <div style={{ borderBottom:`3px solid ${B.black}` }}>
        <div style={{ background:"#e8e5de", padding:"8px 24px", borderBottom:`2px solid ${B.black}` }}>
          <span style={{ fontFamily:"'Arial Black',sans-serif", fontSize:9, fontWeight:900, letterSpacing:2, textTransform:"uppercase", color:B.red }}>Tech Stack & Data Sources</span>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr" }}>
          <div style={{ padding:"22px 28px", borderRight:`3px solid ${B.black}` }}>
            <div style={{ fontFamily:"'Arial Black',sans-serif", fontSize:10, fontWeight:900, letterSpacing:1, textTransform:"uppercase", color:B.black, marginBottom:12 }}>Built With</div>
            {["Python — Dataset generation & scoring engine","SQLite — Financial data warehouse","pandas + matplotlib — Analysis & charts","React 19 — Brutalist dashboard","Vercel — Production deployment"].map(t => (
              <div key={t} style={{ fontFamily:"'Arial',sans-serif", fontSize:11, color:"#555", marginBottom:8, borderLeft:`3px solid ${B.red}`, paddingLeft:10 }}>{t}</div>
            ))}
          </div>
          <div style={{ padding:"22px 28px" }}>
            <div style={{ fontFamily:"'Arial Black',sans-serif", fontSize:10, fontWeight:900, letterSpacing:1, textTransform:"uppercase", color:B.black, marginBottom:12 }}>Data Calibrated To</div>
            {["RBI MSME Reports & Guidelines","SIDBI MSME Pulse Reports","GST Portal Compliance Statistics","PLFS Annual Reports (MoSPI)","Fairwork India 2024"].map(t => (
              <div key={t} style={{ fontFamily:"'Arial',sans-serif", fontSize:11, color:"#555", marginBottom:8, borderLeft:`3px solid ${B.black}`, paddingLeft:10 }}>{t}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ background:B.black, display:"grid", gridTemplateColumns:"1fr 1fr 1fr", padding:"24px 28px", gap:20 }}>
        <div>
          <div style={{ fontFamily:"'Arial Black',sans-serif", fontSize:16, fontWeight:900, color:B.bg, letterSpacing:3, marginBottom:8 }}>MSMEWatch</div>
          <div style={{ fontFamily:"'Arial',sans-serif", fontSize:10, color:"#555", lineHeight:1.7 }}>India's MSME Financial Stress Intelligence Platform. Built as a portfolio project by Jessica Mathew, MBA Finance & Technology.</div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:6, alignItems:"center", justifyContent:"center" }}>
          <div style={{ fontFamily:"'Arial Black',sans-serif", fontSize:9, fontWeight:900, letterSpacing:2, color:"#555", textTransform:"uppercase", marginBottom:4 }}>Live Projects</div>
          <a href="https://giglens-74r9.vercel.app" target="_blank" rel="noreferrer" style={{ fontFamily:"'Arial',sans-serif", fontSize:10, color:B.red, textDecoration:"none", letterSpacing:1 }}>GigLens — Gig Worker Intelligence</a>
          <span style={{ fontFamily:"'Arial',sans-serif", fontSize:10, color:"#555", letterSpacing:1 }}>MSMEWatch — MSME Risk Platform</span>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:6, alignItems:"flex-end", justifyContent:"center" }}>
          <div style={{ fontFamily:"'Arial Black',sans-serif", fontSize:9, fontWeight:900, letterSpacing:2, color:"#555", textTransform:"uppercase", marginBottom:4 }}>Calibrated To</div>
          <span style={{ fontFamily:"'Arial',sans-serif", fontSize:10, color:"#555" }}>RBI · SIDBI · GST Portal · MoSPI</span>
          <span style={{ fontFamily:"'Arial',sans-serif", fontSize:9, color:"#333" }}>© 2025 Jessica Mathew</span>
        </div>
      </div>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("landing");
  return (
    <div style={{ background:B.bg, minHeight:"100vh" }}>
      <TopBar page={page} setPage={setPage} />
      <Ticker />
      {page==="landing"   && <Landing   setPage={setPage} />}
      {page==="overview"  && <Overview  setPage={setPage} />}
      {page==="dashboard" && <Dashboard />}
      {page==="lookup"    && <Lookup />}
      {page==="monitor"   && <Monitor />}
      {page==="about"     && <About />}
    </div>
  );
}
