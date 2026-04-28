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
  white:    "#FFFFFF",
};

// ── DATA ─────────────────────────────────────────────────────────
const USERS = [
  { id:1, name:"Sokha Rin",    initials:"SR", phone:"+855 12 345 678", role:"Farmer",    joined:"12 Jan 2026", status:"Active",   listings:8 },
  { id:2, name:"Dara Vuth",    initials:"DV", phone:"+855 17 234 567", role:"Middleman", joined:"3 Feb 2026",  status:"Active",   listings:12 },
  { id:3, name:"Maly Chan",    initials:"MC", phone:"+855 96 123 456", role:"Buyer",     joined:"18 Feb 2026", status:"Active",   listings:0 },
  { id:4, name:"Piseth Heng",  initials:"PH", phone:"+855 11 987 654", role:"Farmer",    joined:"25 Jan 2026", status:"Banned",   listings:3 },
  { id:5, name:"Nimol Lim",    initials:"NL", phone:"+855 78 456 123", role:"Buyer",     joined:"7 Mar 2026",  status:"Inactive", listings:0 },
  { id:6, name:"Borey Noun",   initials:"BN", phone:"+855 23 789 012", role:"Middleman", joined:"14 Mar 2026", status:"Active",   listings:6 },
  { id:7, name:"Kosal Seng",   initials:"KS", phone:"+855 99 654 321", role:"Farmer",    joined:"20 Mar 2026", status:"Active",   listings:5 },
];

const SUPPLY = [
  { id:1, product:"Jasmine Rice",  seller:"Sokha Rin",   role:"Farmer",    category:"Grain",     qty:"200kg", price:"$0.45/kg", location:"Siem Reap",     posted:"2 Apr 2026",  status:"Active"  },
  { id:2, product:"Sweet Corn",    seller:"Dara Vuth",   role:"Middleman", category:"Vegetable", qty:"500kg", price:"$0.30/kg", location:"Phnom Penh",    posted:"5 Apr 2026",  status:"Active"  },
  { id:3, product:"Mango (Keo)",   seller:"Piseth Heng", role:"Farmer",    category:"Fruit",     qty:"150kg", price:"$0.80/kg", location:"Kampot",        posted:"6 Apr 2026",  status:"Flagged" },
  { id:4, product:"Red Chilli",    seller:"Borey Noun",  role:"Middleman", category:"Spice",     qty:"80kg",  price:"$1.20/kg", location:"Battambang",    posted:"8 Apr 2026",  status:"Active"  },
  { id:5, product:"Cassava Root",  seller:"Kosal Seng",  role:"Farmer",    category:"Root crop", qty:"1000kg",price:"$0.15/kg", location:"Kampong Cham",  posted:"9 Apr 2026",  status:"Removed" },
  { id:6, product:"Long Bean",     seller:"Sokha Rin",   role:"Farmer",    category:"Vegetable", qty:"60kg",  price:"$0.60/kg", location:"Siem Reap",     posted:"10 Apr 2026", status:"Active"  },
];

const DEMAND = [
  { id:1, product:"Fresh Rice 100kg",    buyer:"Maly Chan",   role:"Buyer",  category:"Grain",     qty:"100kg", target:"$40",   location:"Phnom Penh",  posted:"3 Apr 2026",  status:"Active",  image:true  },
  { id:2, product:"Mixed Vegetables",   buyer:"Nimol Lim",   role:"Buyer",  category:"Vegetable", qty:"50kg",  target:"$25",   location:"Siem Reap",   posted:"5 Apr 2026",  status:"Active",  image:false },
  { id:3, product:"Bulk Mango Order",   buyer:"Dara Vuth",   role:"Middleman",category:"Fruit",   qty:"300kg", target:"$200",  location:"Kampot",      posted:"7 Apr 2026",  status:"Flagged", image:true  },
  { id:4, product:"Chilli Supply",      buyer:"Maly Chan",   role:"Buyer",  category:"Spice",     qty:"20kg",  target:"$30",   location:"Battambang",  posted:"9 Apr 2026",  status:"Active",  image:false },
  { id:5, product:"Cassava 500kg",      buyer:"Nimol Lim",   role:"Buyer",  category:"Root crop", qty:"500kg", target:"$60",   location:"Kampong Cham",posted:"10 Apr 2026", status:"Removed", image:false },
];

const MATCHES = [
  { id:1, supply:"Jasmine Rice",  seller:"Sokha Rin",   demand:"Fresh Rice 100kg", buyer:"Maly Chan",  matched:"4 Apr 2026",  status:"Accepted",  province:"Phnom Penh" },
  { id:2, supply:"Sweet Corn",    seller:"Dara Vuth",   demand:"Mixed Vegetables", buyer:"Nimol Lim",  matched:"6 Apr 2026",  status:"Pending",   province:"Siem Reap"  },
  { id:3, supply:"Mango (Keo)",   seller:"Piseth Heng", demand:"Bulk Mango Order", buyer:"Dara Vuth",  matched:"8 Apr 2026",  status:"Accepted",  province:"Kampot"     },
  { id:4, supply:"Red Chilli",    seller:"Borey Noun",  demand:"Chilli Supply",    buyer:"Maly Chan",  matched:"9 Apr 2026",  status:"Declined",  province:"Battambang" },
  { id:5, supply:"Long Bean",     seller:"Sokha Rin",   demand:"Mixed Vegetables", buyer:"Nimol Lim",  matched:"10 Apr 2026", status:"Pending",   province:"Siem Reap"  },
];

const LOGS = [
  { id:1, time:"2026-04-10 14:32", action:"User banned",          actor:"Admin",        target:"Piseth Heng",  type:"warning" },
  { id:2, time:"2026-04-10 13:15", action:"Listing removed",      actor:"Admin",        target:"Cassava Root", type:"danger"  },
  { id:3, time:"2026-04-10 11:02", action:"User registered",      actor:"System",       target:"Kosal Seng",   type:"info"    },
  { id:4, time:"2026-04-09 16:44", action:"Listing flagged",      actor:"System",       target:"Mango (Keo)",  type:"warning" },
  { id:5, time:"2026-04-09 10:20", action:"Match accepted",       actor:"System",       target:"Sokha Rin × Maly Chan", type:"success" },
  { id:6, time:"2026-04-08 09:11", action:"Listing edited",       actor:"Admin",        target:"Sweet Corn",   type:"info"    },
  { id:7, time:"2026-04-07 15:55", action:"User reactivated",     actor:"Admin",        target:"Nimol Lim",    type:"success" },
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

const SectionHeader = ({ title, search, searchVal, onSearch, filter, filterVal, onFilter }) => (
  <div style={{
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "12px 0 10px",
    position: "sticky", top: 0, background: COLORS.white, zIndex: 2,
    borderBottom: `0.5px solid ${COLORS.gray100}`, marginBottom: 8,
  }}>
    <span style={{ fontSize: 13, fontWeight: 500 }}>{title}</span>
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      {filter && <FilterTabs tabs={filter} active={filterVal} onChange={onFilter} />}
      {search && (
        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "5px 10px", borderRadius: 8,
          border: `0.5px solid ${COLORS.gray300}`,
          background: COLORS.gray100, fontSize: 12, color: COLORS.gray600,
        }}>
          <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.3"/>
            <path d="M10.5 10.5l3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
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

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
      <div style={{ border: `0.5px solid ${COLORS.gray300}`, borderRadius: 10, overflow: "hidden" }}>
        <div style={{ padding: "10px 14px", borderBottom: `0.5px solid ${COLORS.gray100}`, fontSize: 13, fontWeight: 500 }}>Recent users</div>
        <div>
          {USERS.slice(0,4).map(u => (
            <div key={u.id} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "8px 14px", borderBottom: `0.5px solid ${COLORS.gray100}`,
            }}>
              <Avatar initials={u.initials} role={u.role} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 500 }}>{u.name}</div>
                <div style={{ fontSize: 10, color: COLORS.gray600 }}>{u.phone}</div>
              </div>
              <RoleBadge role={u.role} />
              <StatusBadge status={u.status} />
            </div>
          ))}
        </div>
      </div>

      <div style={{ border: `0.5px solid ${COLORS.gray300}`, borderRadius: 10, overflow: "hidden" }}>
        <div style={{ padding: "10px 14px", borderBottom: `0.5px solid ${COLORS.gray100}`, fontSize: 13, fontWeight: 500 }}>Recent system logs</div>
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
                  <div style={{ fontSize: 10, color: COLORS.gray600 }}>{l.target}</div>
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

  const filtered = users.filter(u => {
    const matchF = filter === "All" || u.status === filter || u.role === filter;
    const matchS = u.name.toLowerCase().includes(search.toLowerCase()) || u.phone.includes(search);
    return matchF && matchS;
  });

  const toggleBan = (id) => setUsers(prev => prev.map(u =>
    u.id === id ? { ...u, status: u.status === "Banned" ? "Active" : "Banned" } : u
  ));
  const deleteUser = (id) => setUsers(prev => prev.filter(u => u.id !== id));

  return (
    <div>
      <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
        <StatCard label="Total users"  value={users.length}                              sub="all roles"   />
        <StatCard label="Farmers"      value={users.filter(u=>u.role==="Farmer").length} sub="sellers"     color={COLORS.green700} />
        <StatCard label="Middlemen"    value={users.filter(u=>u.role==="Middleman").length} sub="buy+sell" color={COLORS.teal700}  />
        <StatCard label="Buyers"       value={users.filter(u=>u.role==="Buyer").length}  sub="demand only" color={COLORS.blue700}  />
        <StatCard label="Banned"       value={users.filter(u=>u.status==="Banned").length} sub="blocked"  color={COLORS.red700}   />
      </div>
      <SectionHeader title="All users" search onSearch={setSearch} searchVal={search}
        filter={["All","Active","Banned","Farmer","Middleman","Buyer"]} filterVal={filter} onFilter={setFilter} />
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, tableLayout: "fixed" }}>
        <thead><tr>
          <TH w="22%">Name</TH><TH w="12%">Role</TH><TH w="16%">Phone</TH>
          <TH w="14%">Joined</TH><TH w="8%">Listings</TH><TH w="10%">Status</TH><TH w="18%">Actions</TH>
        </tr></thead>
        <tbody>
          {filtered.map(u => (
            <tr key={u.id} style={{ cursor: "default" }}>
              <TD><div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <Avatar initials={u.initials} role={u.role} />
                <div>
                  <div style={{ fontWeight:500 }}>{u.name}</div>
                  <div style={{ fontSize:10, color:COLORS.gray600 }}>{u.phone}</div>
                </div>
              </div></TD>
              <TD><RoleBadge role={u.role} /></TD>
              <TD style={{ color:COLORS.gray600 }}>{u.phone}</TD>
              <TD style={{ color:COLORS.gray600 }}>{u.joined}</TD>
              <TD style={{ color:COLORS.gray600 }}>{u.listings}</TD>
              <TD><StatusBadge status={u.status} /></TD>
              <TD><div style={{ display:"flex", gap:4 }}>
                <ActBtn label="View" />
                <ActBtn label={u.status==="Banned"?"Unban":"Ban"} variant={u.status==="Banned"?"success":"warn"} onClick={()=>toggleBan(u.id)} />
                <ActBtn label="Delete" variant="danger" onClick={()=>deleteUser(u.id)} />
              </div></TD>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const SupplyPage = () => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [items, setItems] = useState(SUPPLY);

  const filtered = items.filter(i => {
    const matchF = filter === "All" || i.status === filter;
    const matchS = i.product.toLowerCase().includes(search.toLowerCase()) || i.seller.toLowerCase().includes(search.toLowerCase());
    return matchF && matchS;
  });

  const remove = (id) => setItems(prev => prev.map(i => i.id===id ? {...i, status:"Removed"} : i));

  return (
    <div>
      <div style={{ display:"flex", gap:10, marginBottom:14 }}>
        <StatCard label="Total" value={items.length} sub="all listings" />
        <StatCard label="Active" value={items.filter(i=>i.status==="Active").length} sub="live" color={COLORS.green700} />
        <StatCard label="Flagged" value={items.filter(i=>i.status==="Flagged").length} sub="review" color={COLORS.amber700} />
        <StatCard label="Removed" value={items.filter(i=>i.status==="Removed").length} sub="deleted" color={COLORS.red700} />
      </div>
      <SectionHeader title="Supply listings" search onSearch={setSearch} searchVal={search}
        filter={["All","Active","Flagged","Removed"]} filterVal={filter} onFilter={setFilter} />
      <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12, tableLayout:"fixed" }}>
        <thead><tr>
          <TH w="14%">Product</TH><TH w="16%">Seller</TH><TH w="10%">Role</TH>
          <TH w="10%">Category</TH><TH w="12%">Qty / Price</TH><TH w="11%">Location</TH>
          <TH w="10%">Posted</TH><TH w="8%">Status</TH><TH w="9%">Actions</TH>
        </tr></thead>
        <tbody>
          {filtered.map(i => (
            <tr key={i.id}>
              <TD style={{ fontWeight:500 }}>{i.product}</TD>
              <TD><div style={{ display:"flex", alignItems:"center", gap:7 }}>
                <Avatar initials={i.seller.split(" ").map(w=>w[0]).join("")} role={i.role} size={24} />
                <span style={{ fontSize:11, fontWeight:500 }}>{i.seller}</span>
              </div></TD>
              <TD><RoleBadge role={i.role} /></TD>
              <TD><CatBadge cat={i.category} /></TD>
              <TD style={{ color:COLORS.gray600, fontSize:11 }}>{i.qty} · {i.price}</TD>
              <TD style={{ color:COLORS.gray600, fontSize:11 }}>{i.location}</TD>
              <TD style={{ color:COLORS.gray600, fontSize:11 }}>{i.posted}</TD>
              <TD><StatusBadge status={i.status} /></TD>
              <TD><div style={{ display:"flex", gap:3 }}>
                <ActBtn label="View" />
                <ActBtn label="Edit" variant="warn" disabled={i.status==="Removed"} />
                <ActBtn label="Del"  variant="danger" onClick={()=>remove(i.id)} disabled={i.status==="Removed"} />
              </div></TD>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const DemandPage = () => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [items, setItems] = useState(DEMAND);

  const filtered = items.filter(i => {
    const matchF = filter === "All" || i.status === filter;
    const matchS = i.product.toLowerCase().includes(search.toLowerCase()) || i.buyer.toLowerCase().includes(search.toLowerCase());
    return matchF && matchS;
  });

  const remove = (id) => setItems(prev => prev.map(i => i.id===id ? {...i, status:"Removed"} : i));

  return (
    <div>
      <div style={{ display:"flex", gap:10, marginBottom:14 }}>
        <StatCard label="Total" value={items.length} sub="all requests" />
        <StatCard label="Active" value={items.filter(i=>i.status==="Active").length} sub="open" color={COLORS.green700} />
        <StatCard label="Flagged" value={items.filter(i=>i.status==="Flagged").length} sub="review" color={COLORS.amber700} />
        <StatCard label="Removed" value={items.filter(i=>i.status==="Removed").length} sub="deleted" color={COLORS.red700} />
      </div>
      <SectionHeader title="Demand requests" search onSearch={setSearch} searchVal={search}
        filter={["All","Active","Flagged","Removed"]} filterVal={filter} onFilter={setFilter} />
      <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12, tableLayout:"fixed" }}>
        <thead><tr>
          <TH w="18%">Request</TH><TH w="16%">Buyer</TH><TH w="9%">Role</TH>
          <TH w="9%">Category</TH><TH w="10%">Qty / Budget</TH><TH w="11%">Location</TH>
          <TH w="7%">Image</TH><TH w="10%">Posted</TH><TH w="8%">Status</TH><TH w="6%">Actions</TH>
        </tr></thead>
        <tbody>
          {filtered.map(i => (
            <tr key={i.id}>
              <TD style={{ fontWeight:500 }}>{i.product}</TD>
              <TD><div style={{ display:"flex", alignItems:"center", gap:7 }}>
                <Avatar initials={i.buyer.split(" ").map(w=>w[0]).join("")} role={i.role} size={24} />
                <span style={{ fontSize:11, fontWeight:500 }}>{i.buyer}</span>
              </div></TD>
              <TD><RoleBadge role={i.role} /></TD>
              <TD><CatBadge cat={i.category} /></TD>
              <TD style={{ color:COLORS.gray600, fontSize:11 }}>{i.qty} · {i.target}</TD>
              <TD style={{ color:COLORS.gray600, fontSize:11 }}>{i.location}</TD>
              <TD>
                {i.image
                  ? <span style={{ fontSize:10, padding:"2px 7px", borderRadius:20, background:COLORS.green100, color:COLORS.green700 }}>Yes</span>
                  : <span style={{ fontSize:10, color:COLORS.gray600 }}>—</span>
                }
              </TD>
              <TD style={{ color:COLORS.gray600, fontSize:11 }}>{i.posted}</TD>
              <TD><StatusBadge status={i.status} /></TD>
              <TD><div style={{ display:"flex", gap:3 }}>
                <ActBtn label="View" />
                <ActBtn label="Del" variant="danger" onClick={()=>remove(i.id)} disabled={i.status==="Removed"} />
              </div></TD>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const MatchResultsPage = () => {
  const [filter, setFilter] = useState("All");
  const filtered = MATCHES.filter(m => filter==="All" || m.status===filter);
  return (
    <div>
      <div style={{ display:"flex", gap:10, marginBottom:14 }}>
        <StatCard label="Total matches" value={MATCHES.length} sub="all time" />
        <StatCard label="Accepted" value={MATCHES.filter(m=>m.status==="Accepted").length} sub="completed" color={COLORS.green700} />
        <StatCard label="Pending"  value={MATCHES.filter(m=>m.status==="Pending").length}  sub="awaiting"  color={COLORS.amber700} />
        <StatCard label="Declined" value={MATCHES.filter(m=>m.status==="Declined").length} sub="rejected"  color={COLORS.red700}   />
      </div>
      <div style={{ padding:"10px 0 8px", position:"sticky", top:0, background:COLORS.white, zIndex:2,
        borderBottom:`0.5px solid ${COLORS.gray100}`, marginBottom:8,
        display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:13, fontWeight:500 }}>Match results</span>
          <span style={{ fontSize:10, padding:"2px 8px", borderRadius:20, background:COLORS.green100, color:COLORS.green700 }}>View only</span>
        </div>
        <FilterTabs tabs={["All","Accepted","Pending","Declined"]} active={filter} onChange={setFilter} />
      </div>
      <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12, tableLayout:"fixed" }}>
        <thead><tr>
          <TH w="16%">Supply listing</TH><TH w="14%">Seller</TH>
          <TH w="16%">Demand request</TH><TH w="14%">Buyer</TH>
          <TH w="12%">Province</TH><TH w="12%">Matched on</TH><TH w="10%">Status</TH>
        </tr></thead>
        <tbody>
          {filtered.map(m => (
            <tr key={m.id}>
              <TD style={{ fontWeight:500 }}>{m.supply}</TD>
              <TD style={{ color:COLORS.gray600 }}>{m.seller}</TD>
              <TD style={{ fontWeight:500 }}>{m.demand}</TD>
              <TD style={{ color:COLORS.gray600 }}>{m.buyer}</TD>
              <TD style={{ color:COLORS.gray600 }}>{m.province}</TD>
              <TD style={{ color:COLORS.gray600 }}>{m.matched}</TD>
              <TD><StatusBadge status={m.status} /></TD>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const SystemLogsPage = () => {
  const [filter, setFilter] = useState("All");
  const filtered = LOGS.filter(l => filter==="All" || l.type===filter);
  return (
    <div>
      <div style={{ padding:"10px 0 8px", position:"sticky", top:0, background:COLORS.white, zIndex:2,
        borderBottom:`0.5px solid ${COLORS.gray100}`, marginBottom:8,
        display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:13, fontWeight:500 }}>System logs</span>
          <span style={{ fontSize:10, padding:"2px 8px", borderRadius:20, background:COLORS.green100, color:COLORS.green700 }}>View only</span>
        </div>
        <FilterTabs tabs={["All","info","success","warning","danger"]} active={filter} onChange={setFilter} />
      </div>
      <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12, tableLayout:"fixed" }}>
        <thead><tr>
          <TH w="18%">Timestamp</TH><TH w="22%">Action</TH>
          <TH w="14%">Performed by</TH><TH w="18%">Target</TH><TH w="10%">Type</TH>
        </tr></thead>
        <tbody>
          {filtered.map(l => {
            const c = logTypeColor(l.type);
            return (
              <tr key={l.id}>
                <TD style={{ color:COLORS.gray600, fontFamily:"monospace", fontSize:11 }}>{l.time}</TD>
                <TD style={{ fontWeight:500 }}>{l.action}</TD>
                <TD style={{ color:COLORS.gray600 }}>{l.actor}</TD>
                <TD style={{ color:COLORS.gray600 }}>{l.target}</TD>
                <TD>
                  <span style={{ fontSize:10, fontWeight:500, padding:"2px 8px", borderRadius:20, background:c.bg, color:c.color }}>
                    {l.type}
                  </span>
                </TD>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

// ── NAV ITEMS ─────────────────────────────────────────────────────
const NAV = [
  { key:"dashboard", label:"Dashboard",    icon:"grid"   },
  { key:"users",     label:"Users",        icon:"users",  badge:3 },
  { key:"supply",    label:"Supply",       icon:"list"   },
  { key:"demand",    label:"Demand",       icon:"inbox"  },
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