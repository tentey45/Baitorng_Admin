import { useState } from "react";

const COLORS = {
  green900: "#173404",
  green800: "#27500A",
  green700: "#3B6D11",
  green600: "#639922",
  green400: "#97C459",
  green200: "#C0DD97",
  green100: "#EAF3DE",
  green50:  "#F4FBF0",
  teal700:  "#0F6E56",
  teal100:  "#E1F5EE",
  amber700: "#BA7517",
  amber100: "#FAEEDA",
  red700:   "#A32D2D",
  red100:   "#FCEBEB",
  blue700:  "#185FA5",
  blue100:  "#E6F1FB",
  gray900:  "#1A1A1A",
  gray600:  "#555555",
  gray300:  "#CCCCCC",
  gray100:  "#F5F5F3",
  gray50:   "#FAFAFA",
  white:    "#FFFFFF",
};

// ── DATA ─────────────────────────────────────────────────────────
const USERS = [
  { id: 1029348, name: "Sokha Rin", initials: "SR", phone: "+855 12 345 678", role: "Farmer", joined: "12 Jan 2026", status: "Active", listings: 8, location: "Siem Reap", email: "sokha.rin@email.com", lastActive: "2 hours ago" },
  { id: 1029349, name: "Dara Vuth", initials: "DV", phone: "+855 17 234 567", role: "Middleman", joined: "3 Feb 2026", status: "Active", listings: 12, location: "Phnom Penh", email: "dara.vuth@email.com", lastActive: "1 day ago" },
  { id: 1029350, name: "Maly Chan", initials: "MC", phone: "+855 96 123 456", role: "Buyer", joined: "18 Feb 2026", status: "Active", listings: 0, location: "Kampong Cham", email: "maly.chan@email.com", lastActive: "5 mins ago" },
  { id: 1029351, name: "Piseth Heng", initials: "PH", phone: "+855 11 987 654", role: "Farmer", joined: "25 Jan 2026", status: "Banned", listings: 3, location: "Kampot", email: "piseth.heng@email.com", lastActive: "1 month ago" },
  { id: 1029352, name: "Nimol Lim", initials: "NL", phone: "+855 78 456 123", role: "Buyer", joined: "7 Mar 2026", status: "Inactive", listings: 0, location: "Battambang", email: "nimol.lim@email.com", lastActive: "2 weeks ago" },
  { id: 1029353, name: "Borey Noun", initials: "BN", phone: "+855 23 789 012", role: "Middleman", joined: "14 Mar 2026", status: "Active", listings: 6, location: "Takeo", email: "borey.noun@email.com", lastActive: "3 hours ago" },
  { id: 1029354, name: "Kosal Seng", initials: "KS", phone: "+855 99 654 321", role: "Farmer", joined: "20 Mar 2026", status: "Active", listings: 5, location: "Kandal", email: "kosal.seng@email.com", lastActive: "1 hour ago" },
];

const SUPPLY = [
  { id: "S-9021", product: "Jasmine Rice", seller: "Sokha Rin", sellerId: 1029348, role: "Farmer", category: "Grain", qty: "200kg", price: "$0.45/kg", location: "Siem Reap", posted: "2 Apr 2026", status: "Active", desc: "Premium quality jasmine rice, harvested this season." },
  { id: "S-9022", product: "Sweet Corn", seller: "Dara Vuth", sellerId: 1029349, role: "Middleman", category: "Vegetable", qty: "500kg", price: "$0.30/kg", location: "Phnom Penh", posted: "5 Apr 2026", status: "Active", desc: "Fresh sweet corn from local farmers." },
  { id: "S-9023", product: "Mango (Keo)", seller: "Piseth Heng", sellerId: 1029351, role: "Farmer", category: "Fruit", qty: "150kg", price: "$0.80/kg", location: "Kampot", posted: "6 Apr 2026", status: "Flagged", desc: "Keo Romeat mangoes, organic." },
  { id: "S-9024", product: "Red Chilli", seller: "Borey Noun", sellerId: 1029353, role: "Middleman", category: "Spice", qty: "80kg", price: "$1.20/kg", location: "Battambang", posted: "8 Apr 2026", status: "Active", desc: "Dried red chilli, very spicy." },
  { id: "S-9025", product: "Cassava Root", seller: "Kosal Seng", sellerId: 1029354, role: "Farmer", category: "Root crop", qty: "1000kg", price: "$0.15/kg", location: "Kampong Cham", posted: "9 Apr 2026", status: "Removed", desc: "High starch cassava roots." },
  { id: "S-9026", product: "Long Bean", seller: "Sokha Rin", sellerId: 1029348, role: "Farmer", category: "Vegetable", qty: "60kg", price: "$0.60/kg", location: "Siem Reap", posted: "10 Apr 2026", status: "Active", desc: "Green long beans, pesticide-free." },
];

const DEMAND = [
  { id: "D-8021", product: "Fresh Rice 100kg", buyer: "Maly Chan", buyerId: 1029350, role: "Buyer", category: "Grain", qty: "100kg", target: "$40", location: "Phnom Penh", posted: "3 Apr 2026", status: "Active", image: true, desc: "Looking for long-grain rice for restaurant." },
  { id: "D-8022", product: "Mixed Vegetables", buyer: "Nimol Lim", buyerId: 1029352, role: "Buyer", category: "Vegetable", qty: "50kg", target: "$25", location: "Siem Reap", posted: "5 Apr 2026", status: "Active", image: false, desc: "Daily supply of mixed veggies needed." },
  { id: "D-8023", product: "Bulk Mango Order", buyer: "Dara Vuth", buyerId: 1029349, role: "Middleman", category: "Fruit", qty: "300kg", target: "$200", location: "Kampot", posted: "7 Apr 2026", status: "Flagged", image: true, desc: "Urgent need for mangoes for export." },
  { id: "D-8024", product: "Chilli Supply", buyer: "Maly Chan", buyerId: 1029350, role: "Buyer", category: "Spice", qty: "20kg", target: "$30", location: "Battambang", posted: "9 Apr 2026", status: "Active", image: false, desc: "Small batch of red chilli needed." },
  { id: "D-8025", product: "Cassava 500kg", buyer: "Nimol Lim", buyerId: 1029352, role: "Buyer", category: "Root crop", qty: "500kg", target: "$60", location: "Kampong Cham", posted: "10 Apr 2026", status: "Removed", image: false, desc: "Need cassava for processing plant." },
];

const MATCHES = [
  { id: "M-1001", supply: SUPPLY[0], demand: DEMAND[0], matched: "4 Apr 2026", status: "Accepted", province: "Phnom Penh" },
  { id: "M-1002", supply: SUPPLY[1], demand: DEMAND[1], matched: "6 Apr 2026", status: "Pending", province: "Siem Reap" },
  { id: "M-1003", supply: SUPPLY[2], demand: DEMAND[2], matched: "8 Apr 2026", status: "Accepted", province: "Kampot" },
  { id: "M-1004", supply: SUPPLY[3], demand: DEMAND[3], matched: "9 Apr 2026", status: "Declined", province: "Battambang" },
  { id: "M-1005", supply: SUPPLY[5], demand: DEMAND[1], matched: "10 Apr 2026", status: "Pending", province: "Siem Reap" },
];

const LOGS = [
  { id: 1, time: "2026-04-10 14:32", action: "User banned", actor: "Admin", target: "Piseth Heng", type: "warning", details: "Reason: Repeatedly posting flagged content." },
  { id: 2, time: "2026-04-10 13:15", action: "Listing removed", actor: "Admin", target: "Cassava Root", type: "danger", details: "Removed by admin due to policy violation." },
  { id: 3, time: "2026-04-10 11:02", action: "User registered", actor: "System", target: "Kosal Seng", type: "info", details: "New user registered via phone verification." },
  { id: 4, time: "2026-04-09 16:44", action: "Listing flagged", actor: "System", target: "Mango (Keo)", type: "warning", details: "Flagged for potential price manipulation." },
  { id: 5, time: "2026-04-09 10:20", action: "Match accepted", actor: "System", target: "Sokha Rin × Maly Chan", type: "success", details: "Both parties accepted the match proposal." },
  { id: 6, time: "2026-04-08 09:11", action: "Listing verified", actor: "Admin", target: "Sweet Corn", type: "success", details: "Admin manually verified listing after manual inspection." },
  { id: 7, time: "2026-04-07 15:55", action: "User reactivated", actor: "Admin", target: "Nimol Lim", type: "success", details: "User appealed and ban was lifted." },
];

const ANNOUNCEMENTS = [
  { id: 1, title: "System Maintenance Tonight", message: "We will be undergoing maintenance tonight at 12 AM for approximately 2 hours.", audience: "All Users", type: "Maintenance", priority: "Important", sentBy: "Admin", time: "2026-04-10 09:00", reach: 128 },
  { id: 2, title: "New Marketplace Features", message: "Check out the new bidding system for middlemen!", audience: "Middlemen", type: "Marketplace News", priority: "Normal", sentBy: "Admin", time: "2026-04-08 14:20", reach: 14 },
  { id: 3, title: "Price Drop in Fertilizers", message: "Great news for farmers! Fertilizer prices have dropped by 10%.", audience: "Farmers", type: "Promotion", priority: "Normal", sentBy: "Admin", time: "2026-04-05 11:30", reach: 54 },
];

// ── HELPERS ──────────────────────────────────────────────────────
const roleColor = (role) => {
  if (role === "Farmer")    return { bg: COLORS.green100, color: COLORS.green700 };
  if (role === "Middleman") return { bg: COLORS.teal100,  color: COLORS.teal700  };
  return                           { bg: COLORS.blue100,  color: COLORS.blue700  };
};

const statusDot = (status) => {
  if (status === "Active")   return COLORS.green600;
  if (status === "Accepted") return COLORS.green600;
  if (status === "Banned")   return COLORS.red700;
  if (status === "Removed")  return COLORS.red700;
  if (status === "Declined") return COLORS.red700;
  if (status === "Flagged")  return COLORS.amber700;
  if (status === "Pending")  return COLORS.amber700;
  return COLORS.gray300;
};

const logTypeColor = (type) => {
  if (type === "danger")  return { bg: COLORS.red100,   color: COLORS.red700   };
  if (type === "warning") return { bg: COLORS.amber100, color: COLORS.amber700 };
  if (type === "success") return { bg: COLORS.green100, color: COLORS.green700 };
  return                         { bg: COLORS.blue100,  color: COLORS.blue700  };
};

// ── SUB-COMPONENTS ───────────────────────────────────────────────
const Avatar = ({ initials, role, size = 28 }) => {
  const c = roleColor(role);
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: c.bg, color: c.color,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.36, fontWeight: 500, flexShrink: 0,
    }}>{initials}</div>
  );
};

const RoleBadge = ({ role }) => {
  const c = roleColor(role);
  return (
    <span style={{
      fontSize: 10, fontWeight: 500, padding: "2px 8px",
      borderRadius: 20, background: c.bg, color: c.color,
    }}>{role}</span>
  );
};

const StatusBadge = ({ status }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11 }}>
    <span style={{ width: 6, height: 6, borderRadius: "50%", background: statusDot(status), flexShrink: 0 }} />
    {status}
  </span>
);

const CatBadge = ({ cat }) => (
  <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 20, background: COLORS.gray100, color: COLORS.gray600 }}>{cat}</span>
);

const ActBtn = ({ label, variant, onClick, disabled }) => {
  const styles = {
    default: { border: `0.5px solid ${COLORS.gray300}`, color: COLORS.gray600, background: COLORS.white },
    warn:    { border: `0.5px solid #FAC775`, color: COLORS.amber700, background: COLORS.white },
    danger:  { border: `0.5px solid #F7C1C1`, color: COLORS.red700, background: COLORS.white },
    success: { border: `0.5px solid ${COLORS.green200}`, color: COLORS.green700, background: COLORS.white },
  };
  const s = styles[variant || "default"];
  return (
    <button onClick={onClick} disabled={disabled} style={{
      ...s, padding: "3px 8px", borderRadius: 6,
      fontSize: 10, fontWeight: 500, cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.4 : 1, transition: "background .1s",
    }}>{label}</button>
  );
};

const TH = ({ children, w }) => (
  <th style={{
    textAlign: "left", padding: "6px 8px",
    fontSize: 10, fontWeight: 500, letterSpacing: ".05em", textTransform: "uppercase",
    color: COLORS.gray600, borderBottom: `0.5px solid ${COLORS.gray300}`,
    width: w,
  }}>{children}</th>
);

const TD = ({ children, style }) => (
  <td style={{
    padding: "8px", borderBottom: `0.5px solid ${COLORS.gray100}`,
    fontSize: 12, verticalAlign: "middle", ...style,
  }}>{children}</td>
);

const FilterTabs = ({ tabs, active, onChange }) => (
  <div style={{ display: "flex", gap: 4 }}>
    {tabs.map(t => (
      <button key={t} onClick={() => onChange(t)} style={{
        fontSize: 11, padding: "3px 10px", borderRadius: 6, cursor: "pointer",
        fontWeight: active === t ? 500 : 400,
        background: active === t ? COLORS.green100 : "transparent",
        border: `0.5px solid ${active === t ? COLORS.green200 : "transparent"}`,
        color: active === t ? COLORS.green700 : COLORS.gray600,
      }}>{t}</button>
    ))}
  </div>
);

const StatCard = ({ label, value, sub, color }) => (
  <div style={{
    flex: 1, padding: "10px 14px",
    background: COLORS.gray100, borderRadius: 8,
  }}>
    <div style={{ fontSize: 10, color: COLORS.gray600, marginBottom: 3 }}>{label}</div>
    <div style={{ fontSize: 20, fontWeight: 500, color: color || COLORS.gray900 }}>{value}</div>
    <div style={{ fontSize: 10, color: COLORS.gray600, marginTop: 1 }}>{sub}</div>
  </div>
);

const SectionHeader = ({ title, search, searchVal, onSearch, filter, filterVal, onFilter, actions }) => (
  <div style={{
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "12px 0 10px",
    position: "sticky", top: 0, background: COLORS.white, zIndex: 2,
    borderBottom: `0.5px solid ${COLORS.gray100}`, marginBottom: 8,
  }}>
    <span style={{ fontSize: 13, fontWeight: 500 }}>{title}</span>
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      {filter && <FilterTabs tabs={filter} active={filterVal} onChange={onFilter} />}
      {actions}
      {search && (
        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "5px 10px", borderRadius: 8,
          border: `0.5px solid ${COLORS.gray300}`,
          background: COLORS.gray100, fontSize: 12, color: COLORS.gray600,
        }}>
          <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.3" />
            <path d="M10.5 10.5l3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          <input value={searchVal} onChange={e => onSearch(e.target.value)}
            placeholder="Search..."
            style={{ border: "none", background: "transparent", outline: "none", fontSize: 12, width: 120, color: COLORS.gray900 }}
          />
        </div>
      )}
    </div>
  </div>
);

const Modal = ({ title, isOpen, onClose, children, width = 800 }) => {
  if (!isOpen) return null;
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 1000, backdropFilter: "blur(2px)",
    }} onClick={onClose}>
      <div style={{
        background: COLORS.white, borderRadius: 12, width: "95%", maxWidth: width,
        maxHeight: "90vh", display: "flex", flexDirection: "column",
        boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
      }} onClick={e => e.stopPropagation()}>
        <div style={{
          padding: "16px 20px", borderBottom: `1px solid ${COLORS.gray100}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <span style={{ fontWeight: 600, fontSize: 16 }}>{title}</span>
          <button onClick={onClose} style={{
            background: "none", border: "none", cursor: "pointer", color: COLORS.gray600,
            fontSize: 20, display: "flex", alignItems: "center",
          }}>&times;</button>
        </div>
        <div style={{ padding: 24, overflowY: "auto" }}>
          {children}
        </div>
      </div>
    </div>
  );
};

const ConfirmModal = ({ isOpen, title, message, onConfirm, onClose, type = "danger" }) => (
  <Modal title={title} isOpen={isOpen} onClose={onClose} width={400}>
    <div style={{ textAlign: "center" }}>
      <div style={{ 
        width: 48, height: 48, borderRadius: "50%", 
        background: type === "danger" ? COLORS.red100 : COLORS.amber100,
        color: type === "danger" ? COLORS.red700 : COLORS.amber700,
        display: "flex", alignItems: "center", justifyContent: "center",
        margin: "0 auto 16px", fontSize: 24
      }}>
        {type === "danger" ? "!" : "?"}
      </div>
      <div style={{ fontSize: 14, color: COLORS.gray600, marginBottom: 24, lineHeight: "1.5" }}>
        {message}
      </div>
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        <button onClick={onClose} style={{
          padding: "8px 16px", borderRadius: 8, border: `1px solid ${COLORS.gray300}`,
          background: COLORS.white, color: COLORS.gray600, cursor: "pointer", fontWeight: 500
        }}>Cancel</button>
        <button onClick={() => { onConfirm(); onClose(); }} style={{
          padding: "8px 16px", borderRadius: 8, border: "none",
          background: type === "danger" ? COLORS.red700 : COLORS.amber700,
          color: COLORS.white, cursor: "pointer", fontWeight: 500
        }}>Confirm</button>
      </div>
    </div>
  </Modal>
);

// ── PAGES ────────────────────────────────────────────────────────

const Dashboard = () => (
  <div>
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 20, fontWeight: 500, marginBottom: 4 }}>Welcome back, Admin</div>
      <div style={{ fontSize: 13, color: COLORS.gray600 }}>Here's what's happening on Baitong today.</div>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 20 }}>
      {[
        { label: "Total users",      value: 128, sub: "all roles",       color: COLORS.gray900 },
        { label: "Active listings",  value: 198, sub: "supply posts",    color: COLORS.green700 },
        { label: "Demand requests",  value: 74,  sub: "open requests",   color: COLORS.teal700  },
        { label: "Matches today",    value: 12,  sub: "smart merge",     color: COLORS.green600 },
        { label: "Flagged content",  value: 11,  sub: "needs review",    color: COLORS.amber700 },
        { label: "Banned users",     value: 3,   sub: "blocked accounts",color: COLORS.red700   },
        { label: "Farmers",          value: 54,  sub: "registered",      color: COLORS.green700 },
        { label: "Buyers",           value: 43,  sub: "registered",      color: COLORS.blue700  },
      ].map(c => <StatCard key={c.label} {...c} />)}
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 12, marginBottom: 20 }}>
      <div style={{ 
        border: `0.5px solid ${COLORS.gray300}`, borderRadius: 10, padding: 20, 
        background: COLORS.white, position: "relative", overflow: "hidden" 
      }}>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 20 }}>Activity Growth</div>
        <div style={{ height: 160, width: "100%", display: "flex", alignItems: "flex-end", gap: 8, position: "relative" }}>
          {/* Simple SVG Line Graph */}
          <svg viewBox="0 0 400 100" style={{ width: "100%", height: "100%", overflow: "visible" }}>
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={COLORS.green400} stopOpacity="0.4" />
                <stop offset="100%" stopColor={COLORS.green400} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path 
              d="M 0,80 Q 50,70 100,50 T 200,60 T 300,30 T 400,10" 
              fill="none" 
              stroke={COLORS.green600} 
              strokeWidth="3" 
              strokeLinecap="round" 
            />
            <path 
              d="M 0,80 Q 50,70 100,50 T 200,60 T 300,30 T 400,10 V 100 H 0 Z" 
              fill="url(#lineGrad)" 
            />
            {/* Markers */}
            <circle cx="0" cy="80" r="4" fill={COLORS.green600} />
            <circle cx="100" cy="50" r="4" fill={COLORS.green600} />
            <circle cx="200" cy="60" r="4" fill={COLORS.green600} />
            <circle cx="300" cy="30" r="4" fill={COLORS.green600} />
            <circle cx="400" cy="10" r="4" fill={COLORS.green600} />
          </svg>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, color: COLORS.gray600, fontSize: 10 }}>
          <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
        </div>
      </div>
      <div style={{ border: `0.5px solid ${COLORS.gray300}`, borderRadius: 10, overflow: "hidden", background: COLORS.white }}>
        <div style={{ padding: "10px 14px", borderBottom: `0.5px solid ${COLORS.gray100}`, fontSize: 13, fontWeight: 500 }}>System Summary</div>
        <div style={{ padding: 14 }}>
          <div style={{ fontSize: 11, color: COLORS.gray600, marginBottom: 12 }}>Logs provide accountability and security. They help you track who performed sensitive actions.</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11 }}>
              <span style={{ color: COLORS.gray600 }}>Server Status</span>
              <span style={{ color: COLORS.green700, fontWeight: 600 }}>Healthy</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11 }}>
              <span style={{ color: COLORS.gray600 }}>Uptime</span>
              <span style={{ color: COLORS.gray900 }}>99.9%</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11 }}>
              <span style={{ color: COLORS.gray600 }}>Security Checks</span>
              <span style={{ color: COLORS.green700, fontWeight: 600 }}>Passed</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
      <div style={{ border: `0.5px solid ${COLORS.gray300}`, borderRadius: 10, overflow: "hidden" }}>
        <div style={{ padding: "10px 14px", borderBottom: `0.5px solid ${COLORS.gray100}`, fontSize: 13, fontWeight: 500 }}>Recent users</div>
        <div>
          {USERS.slice(0, 4).map(u => (
            <div key={u.id} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "8px 14px", borderBottom: `0.5px solid ${COLORS.gray100}`,
            }}>
              <Avatar initials={u.initials} role={u.role} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 500 }}>{u.name}</div>
                <div style={{ fontSize: 10, color: COLORS.gray600 }}>ID: {u.id}</div>
              </div>
              <RoleBadge role={u.role} />
              <StatusBadge status={u.status} />
            </div>
          ))}
        </div>
      </div>

      <div style={{ border: `0.5px solid ${COLORS.gray300}`, borderRadius: 10, overflow: "hidden" }}>
        <div style={{ padding: "10px 14px", borderBottom: `0.5px solid ${COLORS.gray100}`, fontSize: 13, fontWeight: 500 }}>Recent system activity</div>
        <div>
          {LOGS.slice(0,4).map(l => {
            const c = logTypeColor(l.type);
            return (
              <div key={l.id} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "8px 14px", borderBottom: `0.5px solid ${COLORS.gray100}`,
              }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: c.color, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 500 }}>{l.action}</div>
                  <div style={{ fontSize: 10, color: COLORS.gray600 }}>Target: {l.target}</div>
                </div>
                <div style={{ fontSize: 10, color: COLORS.gray600 }}>{l.time.split(" ")[1]}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </div>
);

const UsersPage = () => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState(USERS);
  const [selectedUser, setSelectedUser] = useState(null);
  const [confirmBan, setConfirmBan] = useState(null); // stores user object
  const [confirmDelete, setConfirmDelete] = useState(null); // stores user object

  const filtered = users.filter(u => {
    const matchF = filter === "All" || u.status === filter || u.role === filter;
    const matchS = u.name.toLowerCase().includes(search.toLowerCase()) || u.phone.includes(search) || u.id.toString().includes(search);
    return matchF && matchS;
  });

  const toggleBan = (id) => setUsers(prev => prev.map(u =>
    u.id === id ? { ...u, status: u.status === "Banned" ? "Active" : "Banned" } : u
  ));
  const deleteUser = (id) => setUsers(prev => prev.filter(u => u.id !== id));

  return (
    <div>
      <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
        <StatCard label="Total users" value={users.length} sub="all roles" />
        <StatCard label="Farmers" value={users.filter(u => u.role === "Farmer").length} sub="sellers" color={COLORS.green700} />
        <StatCard label="Middlemen" value={users.filter(u => u.role === "Middleman").length} sub="buy+sell" color={COLORS.teal700} />
        <StatCard label="Buyers" value={users.filter(u => u.role === "Buyer").length} sub="demand only" color={COLORS.blue700} />
        <StatCard label="Banned" value={users.filter(u => u.status === "Banned").length} sub="blocked" color={COLORS.red700} />
      </div>
      <SectionHeader title="All users" search onSearch={setSearch} searchVal={search}
        filter={["All", "Active", "Banned", "Farmer", "Middleman", "Buyer"]} filterVal={filter} onFilter={setFilter} />
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, tableLayout: "fixed" }}>
        <thead><tr>
          <TH w="22%">Name & ID</TH><TH w="12%">Role</TH><TH w="16%">Phone</TH>
          <TH w="14%">Joined</TH><TH w="8%">Listings</TH><TH w="10%">Status</TH><TH w="18%">Actions</TH>
        </tr></thead>
        <tbody>
          {filtered.map(u => (
            <tr key={u.id} style={{ cursor: "default" }}>
              <TD><div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Avatar initials={u.initials} role={u.role} />
                <div>
                  <div style={{ fontWeight: 500 }}>{u.name}</div>
                  <div style={{ fontSize: 10, color: COLORS.gray600 }}>ID: {u.id}</div>
                </div>
              </div></TD>
              <TD><RoleBadge role={u.role} /></TD>
              <TD style={{ color: COLORS.gray600 }}>{u.phone}</TD>
              <TD style={{ color: COLORS.gray600 }}>{u.joined}</TD>
              <TD style={{ color: COLORS.gray600 }}>{u.listings}</TD>
              <TD><StatusBadge status={u.status} /></TD>
              <TD><div style={{ display: "flex", gap: 4 }}>
                <ActBtn label="View" onClick={() => setSelectedUser(u)} />
                <ActBtn label={u.status === "Banned" ? "Unban" : "Ban"} variant={u.status === "Banned" ? "success" : "warn"} onClick={() => setConfirmBan(u)} />
                <ActBtn label="Delete" variant="danger" onClick={() => setConfirmDelete(u)} />
              </div></TD>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal title="User Details" isOpen={!!selectedUser} onClose={() => setSelectedUser(null)} width={900}>
        {selectedUser && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <Avatar initials={selectedUser.initials} role={selectedUser.role} size={48} />
                <div>
                  <div style={{ fontSize: 18, fontWeight: 600 }}>{selectedUser.name}</div>
                  <div style={{ fontSize: 12, color: COLORS.gray600 }}>User ID: {selectedUser.id}</div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { label: "Role", value: selectedUser.role },
                  { label: "Email", value: selectedUser.email },
                  { label: "Phone", value: selectedUser.phone },
                  { label: "Location", value: selectedUser.location },
                  { label: "Joined Date", value: selectedUser.joined },
                  { label: "Status", value: selectedUser.status },
                  { label: "Last Active", value: selectedUser.lastActive },
                ].map(item => (
                  <div key={item.label}>
                    <div style={{ fontSize: 10, color: COLORS.gray600, textTransform: "uppercase" }}>{item.label}</div>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: COLORS.gray100, borderRadius: 8, padding: 16 }}>
              <div style={{ fontWeight: 600, marginBottom: 12, fontSize: 13 }}>Activity Summary</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div style={{ background: COLORS.white, padding: 10, borderRadius: 6 }}>
                  <div style={{ fontSize: 10, color: COLORS.gray600 }}>Listings</div>
                  <div style={{ fontSize: 16, fontWeight: 600 }}>{selectedUser.listings}</div>
                </div>
                <div style={{ background: COLORS.white, padding: 10, borderRadius: 6 }}>
                  <div style={{ fontSize: 10, color: COLORS.gray600 }}>Matches</div>
                  <div style={{ fontSize: 16, fontWeight: 600 }}>12</div>
                </div>
              </div>
              <div style={{ marginTop: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.gray600, marginBottom: 8 }}>RECENT ACTIONS</div>
                <div style={{ fontSize: 11, display: "flex", flexDirection: "column", gap: 6 }}>
                  <div style={{ color: COLORS.green700 }}>• Successfully matched with 3 buyers</div>
                  <div style={{ color: COLORS.gray600 }}>• Updated profile 2 days ago</div>
                  <div style={{ color: COLORS.gray600 }}>• Posted new Jasmine Rice listing</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmModal 
        isOpen={!!confirmBan}
        title={confirmBan?.status === "Banned" ? "Unban User" : "Ban User"}
        message={`Are you sure you want to ${confirmBan?.status === "Banned" ? "unban" : "ban"} ${confirmBan?.name}? ${confirmBan?.status === "Banned" ? "They will regain access to the platform." : "They will be restricted from logging in."}`}
        type={confirmBan?.status === "Banned" ? "success" : "warn"}
        onConfirm={() => toggleBan(confirmBan.id)}
        onClose={() => setConfirmBan(null)}
      />

      <ConfirmModal 
        isOpen={!!confirmDelete}
        title="Delete User"
        message={`Are you sure you want to delete ${confirmDelete?.name}? This action cannot be undone and all their data will be permanently removed.`}
        type="danger"
        onConfirm={() => deleteUser(confirmDelete.id)}
        onClose={() => setConfirmDelete(null)}
      />
    </div>
  );
};

const SupplyPage = () => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [items, setItems] = useState(SUPPLY);
  const [selectedItem, setSelectedItem] = useState(null);
  const [confirmRemove, setConfirmRemove] = useState(null);

  const filtered = items.filter(i => {
    const matchF = filter === "All" || i.status === filter;
    const matchS = i.product.toLowerCase().includes(search.toLowerCase()) || i.seller.toLowerCase().includes(search.toLowerCase()) || i.id.includes(search);
    return matchF && matchS;
  });

  const remove = (id) => setItems(prev => prev.map(i => i.id === id ? { ...i, status: "Removed" } : i));
  const verify = (id) => setItems(prev => prev.map(i => i.id === id ? { ...i, status: "Active" } : i));

  return (
    <div>
      <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
        <StatCard label="Total" value={items.length} sub="all listings" />
        <StatCard label="Active" value={items.filter(i => i.status === "Active").length} sub="live" color={COLORS.green700} />
        <StatCard label="Needs Review" value={items.filter(i => i.status === "Flagged").length} sub="flagged" color={COLORS.amber700} />
        <StatCard label="Removed" value={items.filter(i => i.status === "Removed").length} sub="deleted" color={COLORS.red700} />
      </div>
      <SectionHeader title="Supply listings" search onSearch={setSearch} searchVal={search}
        filter={["All", "Active", "Flagged", "Removed"]} filterVal={filter} onFilter={setFilter} 
        actions={<div style={{ fontSize: 10, color: COLORS.gray600, maxWidth: 180 }}>*Admins cannot edit user posts to maintain data integrity.</div>}
      />
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, tableLayout: "fixed" }}>
        <thead><tr>
          <TH w="16%">Product & ID</TH><TH w="16%">Seller & ID</TH><TH w="10%">Role</TH>
          <TH w="10%">Category</TH><TH w="12%">Qty / Price</TH><TH w="11%">Location</TH>
          <TH w="10%">Posted</TH><TH w="8%">Status</TH><TH w="10%">Actions</TH>
        </tr></thead>
        <tbody>
          {filtered.map(i => (
            <tr key={i.id}>
              <TD>
                <div style={{ fontWeight: 500 }}>{i.product}</div>
                <div style={{ fontSize: 10, color: COLORS.gray600 }}>{i.id}</div>
              </TD>
              <TD>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <Avatar initials={i.seller.split(" ").map(w => w[0]).join("")} role={i.role} size={24} />
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 500 }}>{i.seller}</div>
                    <div style={{ fontSize: 9, color: COLORS.gray600 }}>ID: {i.sellerId}</div>
                  </div>
                </div>
              </TD>
              <TD><RoleBadge role={i.role} /></TD>
              <TD><CatBadge cat={i.category} /></TD>
              <TD style={{ color: COLORS.gray600, fontSize: 11 }}>{i.qty} · {i.price}</TD>
              <TD style={{ color: COLORS.gray600, fontSize: 11 }}>{i.location}</TD>
              <TD style={{ color: COLORS.gray600, fontSize: 11 }}>{i.posted}</TD>
              <TD><StatusBadge status={i.status} /></TD>
              <TD><div style={{ display: "flex", gap: 3 }}>
                <ActBtn label="View" onClick={() => setSelectedItem(i)} />
                {i.status === "Flagged" && <ActBtn label="Verify" variant="success" onClick={() => verify(i.id)} />}
                <ActBtn label="Delete" variant="danger" onClick={() => setConfirmRemove(i)} disabled={i.status === "Removed"} />
              </div></TD>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal title="Listing Details" isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} width={900}>
        {selectedItem && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>{selectedItem.product}</div>
              <div style={{ fontSize: 12, color: COLORS.gray600, marginBottom: 16 }}>ID: {selectedItem.id}</div>

              <div style={{ background: COLORS.gray100, padding: 12, borderRadius: 8, marginBottom: 16 }}>
                <div style={{ fontSize: 10, color: COLORS.gray600, textTransform: "uppercase", marginBottom: 4 }}>Description</div>
                <div style={{ fontSize: 13 }}>{selectedItem.desc || "No description provided."}</div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { label: "Category", value: selectedItem.category },
                  { label: "Quantity", value: selectedItem.qty },
                  { label: "Price", value: selectedItem.price },
                  { label: "Location", value: selectedItem.location },
                  { label: "Posted On", value: selectedItem.posted },
                ].map(item => (
                  <div key={item.label}>
                    <div style={{ fontSize: 10, color: COLORS.gray600, textTransform: "uppercase" }}>{item.label}</div>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ border: `1px solid ${COLORS.gray300}`, borderRadius: 8, padding: 16, marginBottom: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.gray600, marginBottom: 12 }}>SELLER INFORMATION</div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <Avatar initials={selectedItem.seller.split(" ").map(w => w[0]).join("")} role={selectedItem.role} size={32} />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{selectedItem.seller}</div>
                    <div style={{ fontSize: 11, color: COLORS.gray600 }}>ID: {selectedItem.sellerId}</div>
                  </div>
                </div>
                <RoleBadge role={selectedItem.role} />
              </div>

              <div style={{ border: `1px solid ${COLORS.gray300}`, borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.gray600, marginBottom: 12 }}>LISTING STATUS</div>
                <StatusBadge status={selectedItem.status} />
                <div style={{ fontSize: 11, marginTop: 12, color: COLORS.gray600 }}>
                  Last updated on April 10, 2026.
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmModal 
        isOpen={!!confirmRemove}
        title="Remove Listing"
        message={`Are you sure you want to remove the listing "${confirmRemove?.product}"? This will set its status to Removed.`}
        type="danger"
        onConfirm={() => remove(confirmRemove.id)}
        onClose={() => setConfirmRemove(null)}
      />
    </div>
  );
};

const DemandPage = () => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [items, setItems] = useState(DEMAND);
  const [selectedItem, setSelectedItem] = useState(null);
  const [confirmRemove, setConfirmRemove] = useState(null);

  const filtered = items.filter(i => {
    const matchF = filter === "All" || i.status === filter;
    const matchS = i.product.toLowerCase().includes(search.toLowerCase()) || i.buyer.toLowerCase().includes(search.toLowerCase()) || i.id.includes(search);
    return matchF && matchS;
  });

  const remove = (id) => setItems(prev => prev.map(i => i.id === id ? { ...i, status: "Removed" } : i));
  const verify = (id) => setItems(prev => prev.map(i => i.id === id ? { ...i, status: "Active" } : i));

  return (
    <div>
      <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
        <StatCard label="Total" value={items.length} sub="all requests" />
        <StatCard label="Active" value={items.filter(i => i.status === "Active").length} sub="open" color={COLORS.green700} />
        <StatCard label="Needs Review" value={items.filter(i => i.status === "Flagged").length} sub="review" color={COLORS.amber700} />
        <StatCard label="Removed" value={items.filter(i => i.status === "Removed").length} sub="deleted" color={COLORS.red700} />
      </div>
      <SectionHeader title="Demand requests" search onSearch={setSearch} searchVal={search}
        filter={["All", "Active", "Flagged", "Removed"]} filterVal={filter} onFilter={setFilter}
        actions={<div style={{ fontSize: 10, color: COLORS.gray600, maxWidth: 180 }}>*Modifying user requests is restricted to ensure platform transparency.</div>}
      />
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, tableLayout: "fixed" }}>
        <thead><tr>
          <TH w="16%">Request & ID</TH><TH w="16%">Buyer & ID</TH><TH w="9%">Role</TH>
          <TH w="9%">Category</TH><TH w="10%">Qty / Budget</TH><TH w="11%">Location</TH>
          <TH w="7%">Image</TH><TH w="10%">Posted</TH><TH w="8%">Status</TH><TH w="8%">Actions</TH>
        </tr></thead>
        <tbody>
          {filtered.map(i => (
            <tr key={i.id}>
              <TD>
                <div style={{ fontWeight: 500 }}>{i.product}</div>
                <div style={{ fontSize: 10, color: COLORS.gray600 }}>{i.id}</div>
              </TD>
              <TD>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <Avatar initials={i.buyer.split(" ").map(w => w[0]).join("")} role={i.role} size={24} />
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 500 }}>{i.buyer}</div>
                    <div style={{ fontSize: 9, color: COLORS.gray600 }}>ID: {i.buyerId}</div>
                  </div>
                </div>
              </TD>
              <TD><RoleBadge role={i.role} /></TD>
              <TD><CatBadge cat={i.category} /></TD>
              <TD style={{ color: COLORS.gray600, fontSize: 11 }}>{i.qty} · {i.target}</TD>
              <TD style={{ color: COLORS.gray600, fontSize: 11 }}>{i.location}</TD>
              <TD>
                {i.image
                  ? <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 20, background: COLORS.green100, color: COLORS.green700 }}>Yes</span>
                  : <span style={{ fontSize: 10, color: COLORS.gray600 }}>—</span>
                }
              </TD>
              <TD style={{ color: COLORS.gray600, fontSize: 11 }}>{i.posted}</TD>
              <TD><StatusBadge status={i.status} /></TD>
              <TD><div style={{ display: "flex", gap: 3 }}>
                <ActBtn label="View" onClick={() => setSelectedItem(i)} />
                {i.status === "Flagged" && <ActBtn label="Verify" variant="success" onClick={() => verify(i.id)} />}
                <ActBtn label="Delete" variant="danger" onClick={() => setConfirmRemove(i)} disabled={i.status === "Removed"} />
              </div></TD>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal title="Request Details" isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} width={900}>
        {selectedItem && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>{selectedItem.product}</div>
              <div style={{ fontSize: 12, color: COLORS.gray600, marginBottom: 16 }}>ID: {selectedItem.id}</div>

              <div style={{ background: COLORS.gray100, padding: 12, borderRadius: 8, marginBottom: 16 }}>
                <div style={{ fontSize: 10, color: COLORS.gray600, textTransform: "uppercase", marginBottom: 4 }}>Description</div>
                <div style={{ fontSize: 13 }}>{selectedItem.desc || "Looking for high-quality produce."}</div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { label: "Category", value: selectedItem.category },
                  { label: "Quantity", value: selectedItem.qty },
                  { label: "Target Price", value: selectedItem.target },
                  { label: "Location", value: selectedItem.location },
                  { label: "Posted On", value: selectedItem.posted },
                ].map(item => (
                  <div key={item.label}>
                    <div style={{ fontSize: 10, color: COLORS.gray600, textTransform: "uppercase" }}>{item.label}</div>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ border: `1px solid ${COLORS.gray300}`, borderRadius: 8, padding: 16, marginBottom: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.gray600, marginBottom: 12 }}>BUYER INFORMATION</div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <Avatar initials={selectedItem.buyer.split(" ").map(w => w[0]).join("")} role={selectedItem.role} size={32} />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{selectedItem.buyer}</div>
                    <div style={{ fontSize: 11, color: COLORS.gray600 }}>ID: {selectedItem.buyerId}</div>
                  </div>
                </div>
                <RoleBadge role={selectedItem.role} />
              </div>

              <div style={{ border: `1px solid ${COLORS.gray300}`, borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.gray600, marginBottom: 12 }}>ATTACHMENTS</div>
                {selectedItem.image ? (
                  <div style={{ background: COLORS.gray100, height: 80, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: COLORS.gray600 }}>
                    [Image Preview]
                  </div>
                ) : (
                  <div style={{ fontSize: 11, color: COLORS.gray600 }}>No attachments.</div>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmModal 
        isOpen={!!confirmRemove}
        title="Remove Request"
        message={`Are you sure you want to remove the request "${confirmRemove?.product}"? This will set its status to Removed.`}
        type="danger"
        onConfirm={() => remove(confirmRemove.id)}
        onClose={() => setConfirmRemove(null)}
      />
    </div>
  );
};

const MatchResultsPage = () => {
  const [selectedMatch, setSelectedMatch] = useState(null);
  
  return (
    <div>
      <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
        <StatCard label="Smart Matches" value={MATCHES.length} sub="automated system" color={COLORS.green700} />
        <StatCard label="Location Matches" value="100%" sub="primary filter" color={COLORS.teal700} />
        <StatCard label="Price Accuracy" value="94%" sub="secondary filter" color={COLORS.amber700} />
        <StatCard label="Avg. Match Time" value="1.2s" sub="system speed" color={COLORS.blue700} />
      </div>
      <div style={{
        padding: "10px 0 8px", position: "sticky", top: 0, background: COLORS.white, zIndex: 2,
        borderBottom: `0.5px solid ${COLORS.gray100}`, marginBottom: 8,
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 500 }}>Recent system-generated matches</span>
        </div>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, tableLayout: "fixed" }}>
        <thead><tr>
          <TH w="30%">Matching ID</TH>
          <TH w="40%">Matching Factors</TH>
          <TH w="30%">Action</TH>
        </tr></thead>
        <tbody>
          {MATCHES.map(m => (
            <tr key={m.id}>
              <TD style={{ fontWeight: 600, color: COLORS.green800 }}>{m.id}</TD>
              <TD>
                <div style={{ display: "flex", gap: 4 }}>
                  <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 4, background: COLORS.green100, color: COLORS.green700 }}>Product</span>
                  <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 4, background: COLORS.green100, color: COLORS.green700 }}>Location</span>
                  <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 4, background: COLORS.teal100, color: COLORS.teal700 }}>Price</span>
                </div>
              </TD>
              <TD><ActBtn label="Compare Detail" onClick={() => setSelectedMatch(m)} /></TD>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal title="Smart Match Audit" isOpen={!!selectedMatch} onClose={() => setSelectedMatch(null)} width={900}>
        {selectedMatch && (
          <div>
            <div style={{ marginBottom: 20, padding: 12, background: COLORS.green50, borderRadius: 8, border: `0.5px solid ${COLORS.green200}` }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.green900, marginBottom: 4 }}>Why did this match?</div>
              <div style={{ fontSize: 11, color: COLORS.green800 }}>
                This match was generated because the <strong>Product Type</strong> and <strong>Location</strong> are identical. 
                The <strong>Price</strong> and <strong>Quantity</strong> fall within the system's acceptable 10% variance.
              </div>
            </div>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>System Match: {selectedMatch.id}</div>
              <div style={{ fontSize: 11, color: COLORS.gray600 }}>Matched on {selectedMatch.matched}</div>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", border: `1px solid ${COLORS.gray300}` }}>
              <thead>
                <tr style={{ background: COLORS.gray100 }}>
                  <th style={{ padding: 10, border: `1px solid ${COLORS.gray300}`, textAlign: "left", fontSize: 11 }}>Feature</th>
                  <th style={{ padding: 10, border: `1px solid ${COLORS.gray300}`, textAlign: "left", fontSize: 11 }}>Supply Listing</th>
                  <th style={{ padding: 10, border: `1px solid ${COLORS.gray300}`, textAlign: "left", fontSize: 11 }}>Demand Request</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { f: "ID", s: selectedMatch.supply.id, d: selectedMatch.demand.id },
                  { f: "Product", s: selectedMatch.supply.product, d: selectedMatch.demand.product },
                  { f: "Category", s: selectedMatch.supply.category, d: selectedMatch.demand.category },
                  { f: "Qty", s: selectedMatch.supply.qty, d: selectedMatch.demand.qty },
                  { f: "Price/Budget", s: selectedMatch.supply.price, d: selectedMatch.demand.target },
                  { f: "Location", s: selectedMatch.supply.location, d: selectedMatch.demand.location },
                  { f: "Person", s: `${selectedMatch.supply.seller} (ID: ${selectedMatch.supply.sellerId})`, d: `${selectedMatch.demand.buyer} (ID: ${selectedMatch.demand.buyerId})` },
                ].map((row, idx) => (
                  <tr key={idx}>
                    <td style={{ padding: 10, border: `1px solid ${COLORS.gray300}`, fontWeight: 600, fontSize: 11 }}>{row.f}</td>
                    <td style={{ padding: 10, border: `1px solid ${COLORS.gray300}`, fontSize: 12 }}>{row.s}</td>
                    <td style={{ padding: 10, border: `1px solid ${COLORS.gray300}`, fontSize: 12 }}>{row.d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: 20, fontSize: 11, color: COLORS.gray600 }}>
              Matched on: {selectedMatch.matched} in {selectedMatch.province}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

const Toggle = ({ active, onChange, label, sub }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: `0.5px solid ${COLORS.gray100}` }}>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 13, fontWeight: 500, color: COLORS.gray900 }}>{label}</div>
      {sub && <div style={{ fontSize: 10, color: COLORS.gray600, marginTop: 2 }}>{sub}</div>}
    </div>
    <div 
      onClick={() => onChange(!active)}
      style={{
        width: 32, height: 16, borderRadius: 20,
        background: active ? COLORS.green600 : COLORS.gray300,
        position: "relative", cursor: "pointer", transition: "background .2s",
        flexShrink: 0
      }}
    >
      <div style={{
        width: 12, height: 12, borderRadius: "50%", background: COLORS.white,
        position: "absolute", top: 2, left: active ? 18 : 2,
        transition: "left .2s"
      }} />
    </div>
  </div>
);

const AnnouncementsPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    audience: "All Users",
    type: "System Update",
    priority: "Normal"
  });
  
  const [history, setHistory] = useState(ANNOUNCEMENTS);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(null); // { count, time }
  const [config, setConfig] = useState({
    maintenance: false,
    registration: true,
    matching: true,
    notifications: true
  });
  
  const [filter, setFilter] = useState("All");

  const validate = () => formData.title.length >= 5 && formData.message.length >= 10;
  
  const handlePublish = () => {
    const newAnnouncement = {
      id: history.length + 1,
      ...formData,
      sentBy: "Admin",
      time: new Date().toLocaleString(),
      reach: formData.audience === "All Users" ? 128 : (formData.audience === "Farmers" ? 54 : 43)
    };
    setHistory([newAnnouncement, ...history]);
    setShowSuccess({ count: newAnnouncement.reach, time: new Date().toLocaleTimeString() });
    setFormData({ title: "", message: "", audience: "All Users", type: "System Update", priority: "Normal" });
    setTimeout(() => setShowSuccess(null), 5000);
  };

  const priorityColor = (p) => {
    if (p === "Urgent") return { bg: COLORS.red100, color: COLORS.red700 };
    if (p === "Important") return { bg: COLORS.amber100, color: COLORS.amber700 };
    return { bg: COLORS.blue100, color: COLORS.blue700 };
  };

  return (
    <div>
      {showSuccess && (
        <div style={{ 
          position: "fixed", top: 20, right: 20, zIndex: 2000, 
          background: COLORS.green600, color: COLORS.white, padding: "12px 20px", 
          borderRadius: 10, boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          display: "flex", alignItems: "center", gap: 10, animation: "slideIn 0.3s ease-out"
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Announcement Published!</div>
            <div style={{ fontSize: 11, opacity: 0.9 }}>Sent to {showSuccess.count} users at {showSuccess.time}</div>
          </div>
        </div>
      )}

      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <StatCard label="Total Sent" value={history.length} sub="since launch" />
        <StatCard label="Total Reach" value="2,480" sub="unique users" color={COLORS.green700} />
        <StatCard label="Avg. Engagement" value="68%" sub="click-through" color={COLORS.teal700} />
        <StatCard label="System Status" value="Online" sub="broadcast server" color={COLORS.blue700} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 20 }}>
        {/* Left Column: Form & Preview */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ background: COLORS.white, border: `0.5px solid ${COLORS.gray300}`, borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Create New Announcement</div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 500, color: COLORS.gray600, marginBottom: 4 }}>ANNOUNCEMENT TITLE</div>
                <input 
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.target. Urgent: System Maintenance"
                  style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: `1px solid ${COLORS.gray300}`, fontSize: 13, outline: "none" }}
                />
              </div>

              <div>
                <div style={{ fontSize: 11, fontWeight: 500, color: COLORS.gray600, marginBottom: 4 }}>MESSAGE CONTENT</div>
                <textarea 
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe the details of the announcement..."
                  style={{ width: "100%", height: 80, padding: "10px 12px", borderRadius: 8, border: `1px solid ${COLORS.gray300}`, fontSize: 13, outline: "none", resize: "none" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 500, color: COLORS.gray600, marginBottom: 4 }}>AUDIENCE</div>
                  <select 
                    value={formData.audience}
                    onChange={e => setFormData({ ...formData, audience: e.target.value })}
                    style={{ width: "100%", padding: "8px", borderRadius: 8, border: `1px solid ${COLORS.gray300}`, fontSize: 12, background: COLORS.white }}
                  >
                    <option>All Users</option>
                    <option>Farmers</option>
                    <option>Middlemen</option>
                    <option>Buyers</option>
                  </select>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 500, color: COLORS.gray600, marginBottom: 4 }}>TYPE</div>
                  <select 
                    value={formData.type}
                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                    style={{ width: "100%", padding: "8px", borderRadius: 8, border: `1px solid ${COLORS.gray300}`, fontSize: 12, background: COLORS.white }}
                  >
                    <option>System Update</option>
                    <option>Maintenance</option>
                    <option>Safety Warning</option>
                    <option>Marketplace News</option>
                    <option>Promotion</option>
                  </select>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 500, color: COLORS.gray600, marginBottom: 4 }}>PRIORITY</div>
                  <select 
                    value={formData.priority}
                    onChange={e => setFormData({ ...formData, priority: e.target.value })}
                    style={{ width: "100%", padding: "8px", borderRadius: 8, border: `1px solid ${COLORS.gray300}`, fontSize: 12, background: COLORS.white }}
                  >
                    <option>Normal</option>
                    <option>Important</option>
                    <option>Urgent</option>
                  </select>
                </div>
              </div>

              <button 
                onClick={() => setIsConfirmOpen(true)}
                disabled={!validate()}
                style={{ 
                  marginTop: 10, padding: "12px", borderRadius: 8, border: "none",
                  background: COLORS.green700, color: COLORS.white, fontWeight: 600,
                  cursor: validate() ? "pointer" : "not-allowed", opacity: validate() ? 1 : 0.5,
                  transition: "background .2s"
                }}
              >
                Publish Announcement
              </button>
            </div>
          </div>

          <div style={{ background: COLORS.white, border: `0.5px solid ${COLORS.gray300}`, borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
              <span>User Preview</span>
              <span style={{ fontSize: 10, fontWeight: 400, color: COLORS.gray600 }}>(How users see it)</span>
            </div>
            
            <div style={{ 
              border: `1px solid ${COLORS.gray100}`, borderRadius: 12, padding: 16, 
              background: COLORS.gray50, display: "flex", gap: 14, alignItems: "flex-start",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
            }}>
              <div style={{ 
                width: 40, height: 40, borderRadius: 10, background: COLORS.green100, 
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 
              }}>
                <Icon name="megaphone" size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 2 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.gray900 }}>{formData.title || "Announcement Title"}</div>
                  <div style={{ fontSize: 10, color: COLORS.gray600 }}>Just now</div>
                </div>
                <div style={{ display: "inline-block", fontSize: 9, fontWeight: 600, padding: "2px 6px", borderRadius: 4, background: COLORS.green50, color: COLORS.green700, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.02em" }}>
                  {formData.type}
                </div>
                <div style={{ fontSize: 12, color: COLORS.gray600, lineHeight: 1.5 }}>
                  {formData.message || "Your message will appear here. Khmer-friendly spacing ensured for better readability."}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Config & Logs */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ background: COLORS.white, border: `0.5px solid ${COLORS.gray300}`, borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Platform Configuration</div>
            <div style={{ marginBottom: 12, fontSize: 12, color: COLORS.gray600 }}>Quick controls for system-wide features.</div>
            
            <Toggle 
              active={config.maintenance} 
              onChange={val => setConfig({...config, maintenance: val})} 
              label="Maintenance Mode"
              sub="Prevents users from accessing the app"
            />
            <Toggle 
              active={config.registration} 
              onChange={val => setConfig({...config, registration: val})} 
              label="Open Registration"
              sub="Allow new users to join the platform"
            />
            <Toggle 
              active={config.matching} 
              onChange={val => setConfig({...config, matching: val})} 
              label="Automated Matching"
              sub="Run smart merge algorithm in background"
            />
            <Toggle 
              active={config.notifications} 
              onChange={val => setConfig({...config, notifications: val})} 
              label="Push Notifications"
              sub="Enable real-time alerts to mobile devices"
            />
          </div>

          <div style={{ background: COLORS.white, border: `0.5px solid ${COLORS.gray300}`, borderRadius: 12, padding: 20, flex: 1, display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 15, fontWeight: 600 }}>Activity History</div>
              <div style={{ display: "flex", gap: 4 }}>
                <FilterTabs tabs={["All", "Important", "Normal"]} active={filter} onChange={setFilter} />
              </div>
            </div>

            <div style={{ flex: 1, overflowY: "auto", maxHeight: 400 }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                <thead style={{ position: "sticky", top: 0, background: COLORS.white, zIndex: 1 }}>
                  <tr>
                    <th style={{ textAlign: "left", padding: "8px 0", color: COLORS.gray600, borderBottom: `1px solid ${COLORS.gray100}` }}>Announcement</th>
                    <th style={{ textAlign: "left", padding: "8px 0", color: COLORS.gray600, borderBottom: `1px solid ${COLORS.gray100}` }}>Audience</th>
                    <th style={{ textAlign: "right", padding: "8px 0", color: COLORS.gray600, borderBottom: `1px solid ${COLORS.gray100}` }}>Reach</th>
                  </tr>
                </thead>
                <tbody>
                  {history.filter(h => filter === "All" || h.priority === filter).map(h => {
                    const p = priorityColor(h.priority);
                    return (
                      <tr key={h.id}>
                        <td style={{ padding: "10px 0", borderBottom: `0.5px solid ${COLORS.gray100}` }}>
                          <div style={{ fontWeight: 600, color: COLORS.gray900 }}>{h.title}</div>
                          <div style={{ fontSize: 9, color: COLORS.gray600 }}>{h.time}</div>
                          <div style={{ marginTop: 4 }}>
                            <span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 4, background: p.bg, color: p.color, fontWeight: 600 }}>{h.priority}</span>
                          </div>
                        </td>
                        <td style={{ padding: "10px 0", borderBottom: `0.5px solid ${COLORS.gray100}`, verticalAlign: "top" }}>
                          <div style={{ fontSize: 10, color: COLORS.gray600 }}>{h.audience}</div>
                        </td>
                        <td style={{ padding: "10px 0", borderBottom: `0.5px solid ${COLORS.gray100}`, textAlign: "right", verticalAlign: "top" }}>
                          <div style={{ fontWeight: 600 }}>{h.reach}</div>
                          <div style={{ fontSize: 9, color: COLORS.gray600 }}>users</div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal 
        isOpen={isConfirmOpen}
        title="Confirm Publication"
        message={formData.audience === "All Users" 
          ? "WARNING: You are about to send this announcement to ALL users. This action cannot be undone. Are you sure?"
          : `Are you sure you want to publish this announcement to ${formData.audience}?`}
        type={formData.audience === "All Users" ? "danger" : "warn"}
        onConfirm={handlePublish}
        onClose={() => setIsConfirmOpen(false)}
      />
    </div>
  );
};

const SystemLogsPage = () => {
  const [filter, setFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(20);
  
  const filtered = LOGS.filter(l => filter === "All" || l.type === filter);
  const visibleLogs = filtered.slice(0, visibleCount);

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
        <div style={{ padding: 16, background: COLORS.gray100, borderRadius: 10 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Scalability & Volume</div>
          <div style={{ fontSize: 11, color: COLORS.gray600, lineHeight: "1.5" }}>
            To handle <strong>100,000+ activities</strong>, the system uses <strong>Pagination</strong> (loading small batches) 
            and <strong>Automatic Archiving</strong>. Activity older than 30 days is moved to a high-volume data warehouse 
            to keep this admin interface fast and responsive.
          </div>
        </div>
        <div style={{ padding: 16, background: COLORS.gray100, borderRadius: 10 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Audit Sources</div>
          <div style={{ fontSize: 11, color: COLORS.gray600, lineHeight: "1.5" }}>
            This log tracks both <strong>Admin Actions</strong> (Manually triggered by you or other staff) and 
            <strong>System Events</strong> (Automated matching, scheduled cleanup, and security alerts). 
            Every interaction is timestamped for accountability.
          </div>
        </div>
      </div>

      <div style={{
        padding: "10px 0 8px", position: "sticky", top: 0, background: COLORS.white, zIndex: 2,
        borderBottom: `0.5px solid ${COLORS.gray100}`, marginBottom: 8,
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 500 }}>Live Activity Feed</span>
          <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, background: COLORS.green100, color: COLORS.green700 }}>{filtered.length} recent entries found</span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <ActBtn label="Export Full History (CSV)" onClick={() => alert("Large export started. You will receive a notification when the download is ready.")} />
          <FilterTabs tabs={["All", "info", "success", "warning", "danger"]} active={filter} onChange={setFilter} />
        </div>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, tableLayout: "fixed" }}>
        <thead><tr>
          <TH w="15%">Time</TH><TH w="20%">Event</TH>
          <TH w="12%">Source</TH><TH w="15%">Subject</TH><TH w="30%">Full Details</TH><TH w="8%">Level</TH>
        </tr></thead>
        <tbody>
          {visibleLogs.map(l => {
            const c = logTypeColor(l.type);
            return (
              <tr key={l.id}>
                <TD style={{ color: COLORS.gray600, fontFamily: "monospace", fontSize: 11 }}>{l.time}</TD>
                <TD style={{ fontWeight: 500 }}>{l.action}</TD>
                <TD>
                  <span style={{ 
                    fontSize: 10, fontWeight: 600, color: l.actor === "System" ? COLORS.blue700 : COLORS.gray900 
                  }}>
                    {l.actor}
                  </span>
                </TD>
                <TD style={{ color: COLORS.gray600 }}>{l.target}</TD>
                <TD style={{ color: COLORS.gray600, fontSize: 11 }}>{l.details}</TD>
                <TD>
                  <span style={{ fontSize: 10, fontWeight: 500, padding: "2px 8px", borderRadius: 20, background: c.bg, color: c.color }}>
                    {l.type}
                  </span>
                </TD>
              </tr>
            );
          })}
        </tbody>
      </table>
      
      {filtered.length > visibleCount && (
        <div style={{ padding: "20px 0", textAlign: "center" }}>
          <button 
            onClick={() => setVisibleCount(prev => prev + 20)}
            style={{ 
              padding: "8px 24px", borderRadius: 8, border: `1px solid ${COLORS.gray300}`,
              background: COLORS.white, color: COLORS.gray600, fontSize: 12, cursor: "pointer",
              fontWeight: 500
            }}
          >
            Load 20 More Entries
          </button>
        </div>
      )}
    </div>
  );
};

// ── NAV ITEMS ─────────────────────────────────────────────────────
const NAV = [
  { key:"dashboard", label:"Dashboard",    icon:"grid"   },
  { key:"users",     label:"Users",        icon:"users",  badge:3 },
  { key:"supply",    label:"Supply",       icon:"list"   },
  { key:"demand",    label:"Demand",       icon:"inbox"  },
  { key:"announcements", label:"Announcements", icon:"megaphone" },
  { key:"matches",   label:"Match results",icon:"merge",  viewOnly:true },
  { key:"logs",      label:"System logs",  icon:"log",    viewOnly:true },
];

const Icon = ({ name, size=15 }) => {
  const s = { width:size, height:size, flexShrink:0 };
  if (name==="grid")  return <svg style={s} viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><rect x="9" y="2" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><rect x="2" y="9" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><rect x="9" y="9" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.2"/></svg>;
  if (name==="users") return <svg style={s} viewBox="0 0 16 16" fill="none"><circle cx="6" cy="5.5" r="2.3" stroke="currentColor" strokeWidth="1.2"/><path d="M1.5 13c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><path d="M11 7.5l1 1 2-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  if (name==="list")  return <svg style={s} viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="1.2"/><path d="M5 7h6M5 9.5h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;
  if (name==="inbox") return <svg style={s} viewBox="0 0 16 16" fill="none"><path d="M3 4h10M3 7.5h7M3 11h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;
  if (name==="merge") return <svg style={s} viewBox="0 0 16 16" fill="none"><circle cx="5" cy="8" r="2.3" stroke="currentColor" strokeWidth="1.2"/><circle cx="11" cy="8" r="2.3" stroke="currentColor" strokeWidth="1.2"/><path d="M7.3 8h1.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;
  if (name==="log")   return <svg style={s} viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.2"/><path d="M5 5.5h6M5 8h6M5 10.5h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;
  if (name==="megaphone") return <svg style={s} viewBox="0 0 16 16" fill="none"><path d="M2 6h3l4-3v10l-4-3H2V6zM9 8h4M10 6l2-1M10 10l2 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  return null;
};

// ── MAIN APP ──────────────────────────────────────────────────────
export default function BaitongAdmin() {
  const [active, setActive] = useState("dashboard");

  const pages = {
    dashboard: { title:"Dashboard",     component:<Dashboard /> },
    users:     { title:"User management", component:<UsersPage /> },
    supply:    { title:"Supply listings", component:<SupplyPage /> },
    demand:    { title:"Demand requests", component:<DemandPage /> },
    announcements: { title:"Global Announcements", component:<AnnouncementsPage /> },
    matches:   { title:"Match results",  component:<MatchResultsPage /> },
    logs:      { title:"System logs",    component:<SystemLogsPage /> },
  };

  const current = pages[active];

  return (
    <div style={{
      display:"flex", height:"100vh", overflow:"hidden",
      fontFamily:"'DM Sans', system-ui, sans-serif",
      background:COLORS.white,
    }}>

      {/* ── SIDEBAR ── */}
      <div style={{
        width:200, flexShrink:0,
        background:COLORS.green900,
        display:"flex", flexDirection:"column",
        borderRight:`1px solid ${COLORS.green800}`,
      }}>
        {/* logo */}
        <div style={{ padding:"18px 16px 14px", borderBottom:`1px solid ${COLORS.green800}` }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={{
              width:28, height:28, borderRadius:6,
              background:COLORS.green600,
              display:"flex", alignItems:"center", justifyContent:"center",
            }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M8 2C5 2 3 4 3 7c0 2 1 3.5 2.5 4.5L8 14l2.5-2.5C12 10.5 13 9 13 7c0-3-2-5-5-5z" fill={COLORS.green100}/>
              </svg>
            </div>
            <div>
              <div style={{ fontSize:13, fontWeight:500, color:COLORS.white, letterSpacing:".02em" }}>Baitong</div>
              <div style={{ fontSize:10, color:COLORS.green200, marginTop:1 }}>Admin panel</div>
            </div>
          </div>
        </div>

        {/* nav */}
        <div style={{ padding:"10px 8px", flex:1, overflowY:"auto" }}>
          <div style={{ fontSize:9, fontWeight:500, letterSpacing:".08em", textTransform:"uppercase",
            color:COLORS.green400, padding:"0 8px", marginBottom:4 }}>Manage</div>
          {NAV.slice(0,4).map(n => (
            <div key={n.key} onClick={() => setActive(n.key)} style={{
              display:"flex", alignItems:"center", gap:9,
              padding:"8px 10px", borderRadius:8, cursor:"pointer",
              marginBottom:2,
              background: active===n.key ? COLORS.green800 : "transparent",
              color: active===n.key ? COLORS.white : COLORS.green200,
              transition:"background .15s",
            }}>
              <Icon name={n.icon} />
              <span style={{ fontSize:12, flex:1 }}>{n.label}</span>
              {n.badge && (
                <span style={{ fontSize:9, background:COLORS.red100, color:COLORS.red700,
                  padding:"1px 5px", borderRadius:8 }}>{n.badge}</span>
              )}
            </div>
          ))}

          <div style={{ fontSize:9, fontWeight:500, letterSpacing:".08em", textTransform:"uppercase",
            color:COLORS.green400, padding:"12px 8px 4px", marginTop:4 }}>System</div>
          {NAV.slice(4).map(n => (
            <div key={n.key} onClick={() => setActive(n.key)} style={{
              display:"flex", alignItems:"center", gap:9,
              padding:"8px 10px", borderRadius:8, cursor:"pointer",
              marginBottom:2,
              background: active===n.key ? COLORS.green800 : "transparent",
              color: active===n.key ? COLORS.white : COLORS.green200,
              transition:"background .15s",
            }}>
              <Icon name={n.icon} />
              <span style={{ fontSize:12, flex:1 }}>{n.label}</span>
              {n.viewOnly && (
                <span style={{ fontSize:9, color:COLORS.green400 }}>view</span>
              )}
            </div>
          ))}
        </div>

        {/* admin footer */}
        <div style={{ padding:12, borderTop:`1px solid ${COLORS.green800}` }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, padding:"6px 8px" }}>
            <div style={{
              width:28, height:28, borderRadius:"50%",
              background:COLORS.green700, color:COLORS.white,
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:10, fontWeight:500,
            }}>AD</div>
            <div>
              <div style={{ fontSize:11, fontWeight:500, color:COLORS.white }}>Admin</div>
              <div style={{ fontSize:10, color:COLORS.green400 }}>Super admin</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN ── */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
        {/* topbar */}
        <div style={{
          padding:"12px 20px",
          borderBottom:`0.5px solid ${COLORS.gray300}`,
          display:"flex", alignItems:"center", justifyContent:"space-between",
          flexShrink:0, background:COLORS.white,
        }}>
          <div style={{ fontSize:15, fontWeight:500 }}>{current.title}</div>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={{
              width:7, height:7, borderRadius:"50%", background:COLORS.green600,
              boxShadow:`0 0 0 3px ${COLORS.green100}`,
            }} />
            <span style={{ fontSize:11, color:COLORS.gray600 }}>Platform online</span>
          </div>
        </div>

        {/* content */}
        <div style={{ flex:1, overflowY:"auto", padding:"16px 20px" }}>
          {current.component}
        </div>
      </div>
    </div>
  );
}