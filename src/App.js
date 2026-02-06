import React, { useState, useEffect, useRef } from 'react';
import { 
    User, Activity, Shield, Target, Calculator, RefreshCw, ArrowUpDown, Zap, CheckCircle2, Flame, Crosshair, TrendingUp, Wind, Dna,
    Goal, MapPin, CircleDot, ArrowBigUp, Lightbulb, Move, ArrowRightLeft, Rocket, Eye, CornerUpRight, Scissors, Footprints, Lock, Battery, ChevronsDown, Hand, Send, Sparkles, Save, Trash2, FolderOpen, PenLine, AlertCircle, FilePlus, ChevronRight, Eraser, GitCompare, X, Bell, Hexagon, Moon, Sun
} from 'lucide-react';

// --- Configuration Data ---

const positionColors = {
    ST: '#ef4444', 
    CF: '#ec4899', 
    'LW/RW': '#d946ef',
    CDM: '#22c55e',
    CM: '#14b8a6',
    CAM: '#0ea5e9',
    'LM/RM': '#38bdf8',
    CB: '#6366f1',
    'LB/RB': '#f59e0b',
    'LWB/RWB': '#fbbf24',
    GK: '#eab308',
};

const STAT_ICONS = {
    "จบสกอร์": Goal, "ยืนตำแหน่ง": MapPin, "ควบคุมบอล": CircleDot, "พลังการยิง": Zap, "โหม่งบอล": ArrowBigUp, "ปฏิกิริยา": Lightbulb,
    "เลี้ยงบอล": Move, "แข็งแกร่ง": Shield, "ความเร็ว": Wind, "ส่งสั้น": ArrowRightLeft, "สปีดต้น": Rocket, "ยิงไกล": Crosshair,
    "วอลเลย์": TrendingUp, "อ่านเกมส์": Eye, "อ่านเกม": Eye, "เปิดบอล": CornerUpRight, "คล่องตัว": Activity, "เข้าสกัด": Scissors,
    "เข้าปะทะ": Footprints, "ส่งไกล": Send, "ประกบตัว": Lock, "ความอึด": Battery, "สไลด์": ChevronsDown, "ดุดัน": Flame,
    "กระโดด": ArrowBigUp, "พุ่งรับ": ChevronsDown, "รับบอล": Hand, "GK ปฏิกิริยา": Zap, "ส่งบอล": Send
};

const dataset = [
    { "key": "จบสกอร์", "value": 18, "position": "ST" }, { "key": "ยืนตำแหน่ง", "value": 13, "position": "ST" }, { "key": "ควบคุมบอล", "value": 10, "position": "ST" }, { "key": "พลังการยิง", "value": 10, "position": "ST" }, { "key": "โหม่งบอล", "value": 10, "position": "ST" }, { "key": "ปฏิกิริยา", "value": 8, "position": "ST" }, { "key": "เลี้ยงบอล", "value": 7, "position": "ST" }, { "key": "แข็งแกร่ง", "value": 5, "position": "ST" }, { "key": "ความเร็ว", "value": 5, "position": "ST" }, { "key": "ส่งสั้น", "value": 5, "position": "ST" }, { "key": "สปีดต้น", "value": 4, "position": "ST" }, { "key": "ยิงไกล", "value": 3, "position": "ST" }, { "key": "วอลเลย์", "value": 2, "position": "ST" },
    { "key": "ควบคุมบอล", "value": 15, "position": "CF" }, { "key": "เลี้ยงบอล", "value": 14, "position": "CF" }, { "key": "ยืนตำแหน่ง", "value": 13, "position": "CF" }, { "key": "จบสกอร์", "value": 11, "position": "CF" }, { "key": "ปฏิกิริยา", "value": 9, "position": "CF" }, { "key": "ส่งสั้น", "value": 9, "position": "CF" }, { "key": "อ่านเกมส์", "value": 8, "position": "CF" }, { "key": "พลังการยิง", "value": 5, "position": "CF" }, { "key": "ความเร็ว", "value": 5, "position": "CF" }, { "key": "สปีดต้น", "value": 5, "position": "CF" }, { "key": "ยิงไกล", "value": 4, "position": "CF" }, { "key": "โหม่งบอล", "value": 2, "position": "CF" },
    { "key": "เลี้ยงบอล", "value": 16, "position": "LW/RW" }, { "key": "ควบคุมบอล", "value": 14, "position": "LW/RW" }, { "key": "จบสกอร์", "value": 10, "position": "LW/RW" }, { "key": "ยืนตำแหน่ง", "value": 9, "position": "LW/RW" }, { "key": "ส่งสั้น", "value": 9, "position": "LW/RW" }, { "key": "เปิดบอล", "value": 9, "position": "LW/RW" }, { "key": "ปฏิกิริยา", "value": 7, "position": "LW/RW" }, { "key": "สปีดต้น", "value": 7, "position": "LW/RW" }, { "key": "อ่านเกมส์", "value": 6, "position": "LW/RW" }, { "key": "ความเร็ว", "value": 6, "position": "LW/RW" }, { "key": "ยิงไกล", "value": 4, "position": "LW/RW" }, { "key": "คล่องตัว", "value": 3, "position": "LW/RW" },
    { "key": "ส่งสั้น", "value": 14, "position": "CDM" }, { "key": "เข้าสกัด", "value": 14, "position": "CDM" }, { "key": "เข้าปะทะ", "value": 12, "position": "CDM" }, { "key": "ควบคุมบอล", "value": 10, "position": "CDM" }, { "key": "ส่งไกล", "value": 10, "position": "CDM" }, { "key": "ประกบตัว", "value": 9, "position": "CDM" }, { "key": "ปฏิกิริยา", "value": 7, "position": "CDM" }, { "key": "ความอึด", "value": 6, "position": "CDM" }, { "key": "สไลด์", "value": 5, "position": "CDM" }, { "key": "ดุดัน", "value": 5, "position": "CDM" }, { "key": "อ่านเกม", "value": 4, "position": "CDM" }, { "key": "แข็งแกร่ง", "value": 4, "position": "CDM" },
    { "key": "ส่งสั้น", "value": 17, "position": "CM" }, { "key": "ควบคุมบอล", "value": 14, "position": "CM" }, { "key": "อ่านเกมส์", "value": 13, "position": "CM" }, { "key": "ส่งไกล", "value": 13, "position": "CM" }, { "key": "ปฏิกิริยา", "value": 8, "position": "CM" }, { "key": "เลี้ยงบอล", "value": 7, "position": "CM" }, { "key": "ยืนตำแหน่ง", "value": 6, "position": "CM" }, { "key": "ความอึด", "value": 6, "position": "CM" }, { "key": "เข้าปะทะ", "value": 5, "position": "CM" }, { "key": "เข้าสกัด", "value": 5, "position": "CM" }, { "key": "ยิงไกล", "value": 4, "position": "CM" }, { "key": "จบสกอร์", "value": 2, "position": "CM" },
    { "key": "ส่งสั้น", "value": 16, "position": "CAM" }, { "key": "ควบคุมบอล", "value": 15, "position": "CAM" }, { "key": "อ่านเกมส์", "value": 14, "position": "CAM" }, { "key": "เลี้ยงบอล", "value": 13, "position": "CAM" }, { "key": "ยืนตำแหน่ง", "value": 9, "position": "CAM" }, { "key": "ปฏิกิริยา", "value": 7, "position": "CAM" }, { "key": "จบสกอร์", "value": 7, "position": "CAM" }, { "key": "ยิงไกล", "value": 5, "position": "CAM" }, { "key": "สปีดต้น", "value": 4, "position": "CAM" }, { "key": "ส่งไกล", "value": 4, "position": "CAM" }, { "key": "ความเร็ว", "value": 3, "position": "CAM" }, { "key": "คล่องตัว", "value": 3, "position": "CAM" },
    { "key": "เลี้ยงบอล", "value": 15, "position": "LM/RM" }, { "key": "ควบคุมบอล", "value": 13, "position": "LM/RM" }, { "key": "ส่งสั้น", "value": 11, "position": "LM/RM" }, { "key": "เปิดบอล", "value": 10, "position": "LM/RM" }, { "key": "ยืนตำแหน่ง", "value": 8, "position": "LM/RM" }, { "key": "ปฏิกิริยา", "value": 7, "position": "LM/RM" }, { "key": "สปีดต้น", "value": 7, "position": "LM/RM" }, { "key": "อ่านเกม", "value": 7, "position": "LM/RM" }, { "key": "จบสกอร์", "value": 6, "position": "LM/RM" }, { "key": "ความเร็ว", "value": 6, "position": "LM/RM" }, { "key": "ความอึด", "value": 5, "position": "LM/RM" }, { "key": "ส่งไกล", "value": 5, "position": "LM/RM" },
    { "key": "ประกบตัว", "value": 17, "position": "CB" }, { "key": "เข้าสกัด", "value": 14, "position": "CB" }, { "key": "เข้าปะทะ", "value": 13, "position": "CB" }, { "key": "สไลด์", "value": 10, "position": "CB" }, { "key": "โหม่งบอล", "value": 10, "position": "CB" }, { "key": "แข็งแกร่ง", "value": 10, "position": "CB" }, { "key": "ดุดัน", "value": 7, "position": "CB" }, { "key": "ปฏิกิริยา", "value": 5, "position": "CB" }, { "key": "ส่งสั้น", "value": 5, "position": "CB" }, { "key": "ควบคุมบอล", "value": 4, "position": "CB" }, { "key": "กระโดด", "value": 3, "position": "CB" }, { "key": "ความเร็ว", "value": 2, "position": "CB" },
    { "key": "สไลด์", "value": 14, "position": "LB/RB" }, { "key": "เข้าสกัด", "value": 12, "position": "LB/RB" }, { "key": "เข้าปะทะ", "value": 11, "position": "LB/RB" }, { "key": "เปิดบอล", "value": 9, "position": "LB/RB" }, { "key": "ความอึด", "value": 8, "position": "LB/RB" }, { "key": "ปฏิกิริยา", "value": 8, "position": "LB/RB" }, { "key": "ประกบตัว", "value": 8, "position": "LB/RB" }, { "key": "ส่งสั้น", "value": 7, "position": "LB/RB" }, { "key": "ควบคุมบอล", "value": 7, "position": "LB/RB" }, { "key": "ความเร็ว", "value": 7, "position": "LB/RB" }, { "key": "สปีดต้น", "value": 5, "position": "LB/RB" }, { "key": "โหม่งบอล", "value": 4, "position": "LB/RB" },
    { "key": "เข้าสกัด", "value": 12, "position": "LWB/RWB" }, { "key": "เปิดบอล", "value": 12, "position": "LWB/RWB" }, { "key": "สไลด์", "value": 11, "position": "LWB/RWB" }, { "key": "ส่งสั้น", "value": 10, "position": "LWB/RWB" }, { "key": "ความอึด", "value": 10, "position": "LWB/RWB" }, { "key": "เข้าปะทะ", "value": 8, "position": "LWB/RWB" }, { "key": "ควบคุมบอล", "value": 8, "position": "LWB/RWB" }, { "key": "ปฏิกิริยา", "value": 8, "position": "LWB/RWB" }, { "key": "ประกบตัว", "value": 7, "position": "LWB/RWB" }, { "key": "ความเร็ว", "value": 6, "position": "LWB/RWB" }, { "key": "เลี้ยงบอล", "value": 4, "position": "LWB/RWB" }, { "key": "สปีดต้น", "value": 4, "position": "LWB/RWB" },
    { "key": "พุ่งรับ", "value": 21, "position": "GK" }, { "key": "รับบอล", "value": 21, "position": "GK" }, { "key": "ยืนตำแหน่ง", "value": 21, "position": "GK" }, { "key": "GK ปฏิกิริยา", "value": 21, "position": "GK" }, { "key": "ปฏิกิริยา", "value": 11, "position": "GK" }, { "key": "ส่งบอล", "value": 5, "position": "GK" }
];

const DEFAULT_SORT_ORDERS = {
    'ST': ["แข็งแกร่ง", "สปีดต้น", "ความเร็ว", "เลี้ยงบอล", "ควบคุมบอล", "ส่งสั้น", "จบสกอร์", "พลังการยิง", "โหม่งบอล", "ยิงไกล", "วอลเลย์", "ยืนตำแหน่ง", "ปฏิกิริยา"],
    'CF': ["สปีดต้น", "ความเร็ว", "เลี้ยงบอล", "ควบคุมบอล", "ส่งสั้น", "จบสกอร์", "พลังการยิง", "โหม่งบอล", "ยิงไกล", "ยืนตำแหน่ง", "อ่านเกมส์", "ปฏิกิริยา"],
    'LW/RW': ["สปีดต้น", "ความเร็ว", "คล่องตัว", "เลี้ยงบอล", "ควบคุมบอล", "เปิดบอล", "ส่งสั้น", "จบสกอร์", "ยิงไกล", "ยืนตำแหน่ง", "อ่านเกมส์", "ปฏิกิริยา"],
    'CAM': ["สปีดต้น", "ความเร็ว", "คล่องตัว", "เลี้ยงบอล", "ควบคุมบอล", "ส่งสั้น", "จบสกอร์", "ส่งไกล", "ยิงไกล", "ยืนตำแหน่ง", "อ่านเกมส์", "ปฏิกิริยา"],
    'CM': ["ความอึด", "เลี้ยงบอล", "ควบคุมบอล", "เข้าปะทะ", "ส่งสั้น", "จบสกอร์", "ส่งไกล", "ยิงไกล", "เข้าสกัด", "ยืนตำแหน่ง", "อ่านเกมส์", "ปฏิกิริยา"],
    'CDM': ["แข็งแกร่ง", "ความอึด", "สไลด์", "ควบคุมบอล", "ประกบตัว", "เข้าปะทะ", "ส่งสั้น", "ส่งไกล", "เข้าสกัด", "อ่านเกม", "ปฏิกิริยา", "ดุดัน"],
    'CB': ["แข็งแกร่ง", "ความเร็ว", "กระโดด", "สไลด์", "ควบคุมบอล", "ประกบตัว", "เข้าปะทะ", "ส่งสั้น", "โหม่งบอล", "เข้าสกัด", "ปฏิกิริยา", "ดุดัน"],
    'LB/RB': ["ความอึด", "สปีดต้น", "ความเร็ว", "สไลด์", "ควบคุมบอล", "ประกบตัว", "เข้าปะทะ", "เปิดบอล", "ส่งสั้น", "โหม่งบอล", "เข้าสกัด", "ปฏิกิริยา"],
    'LWB/RWB': ["ความอึด", "สปีดต้น", "ความเร็ว", "สไลด์", "เลี้ยงบอล", "ควบคุมบอล", "ประกบตัว", "เข้าปะทะ", "เปิดบอล", "ส่งสั้น", "เข้าสกัด", "ปฏิกิริยา"],
    'LM/RM': ["ความอึด", "สปีดต้น", "ความเร็ว", "เลี้ยงบอล", "ควบคุมบอล", "เปิดบอล", "ส่งสั้น", "จบสกอร์", "ส่งไกล", "ยืนตำแหน่ง", "อ่านเกม", "ปฏิกิริยา"],
    'GK': ["พุ่งรับ", "รับบอล", "ยืนตำแหน่ง", "GK ปฏิกิริยา", "ปฏิกิริยา", "ส่งบอล"]
};

// --- Strategy Logic ---
const STRATEGY_DEFINITIONS = [
    { id: 'max_rating', name: 'เน้นพลังแฝงสูงสุด', icon: TrendingUp, description: 'เลือกอัปเกรดค่าที่มีความสำคัญสูงสุด 5 อันดับแรก เพื่อให้ได้ Rating รวมเยอะที่สุด', keywords: [] },
    { id: 'speed', name: 'เน้นความเร็ว', icon: Wind, description: 'เน้นอัปค่าความเร็วและสปีดต้นเป็นหลัก เหมาะสำหรับสายวิ่ง', keywords: ['ความเร็ว', 'สปีดต้น', 'คล่องตัว'] },
    { id: 'attack', name: 'เน้นจบสกอร์', icon: Crosshair, description: 'เน้นค่าพลังที่เกี่ยวกับการยิงและการทำประตู', keywords: ['จบสกอร์', 'พลังการยิง', 'วอลเลย์', 'โหม่งบอล', 'ยืนตำแหน่ง'] },
    { id: 'defense', name: 'เน้นเกมรับ', icon: Shield, description: 'เน้นการเข้าปะทะ การประกบตัว และการสกัดบอล', keywords: ['เข้าสกัด', 'เข้าปะทะ', 'สไลด์', 'ประกบตัว', 'ดุดัน'] },
    { id: 'technique', name: 'เน้นเทคนิค', icon: Dna, description: 'เน้นการครองบอล เลี้ยงบอล และการจ่ายบอล', keywords: ['เลี้ยงบอล', 'ควบคุมบอล', 'ส่งสั้น', 'ส่งไกล', 'เปิดบอล', 'อ่านเกม', 'อ่านเกมส์'] }
];

const calculateBonus = (players) => players.reduce((sum, p) => sum + (p.value * 2), 0) / 100;

// --- Helper: Calculate Group Stats for Radar ---
const calculateGroupStats = (inputs, tcState, position) => {
    const getValue = (key) => {
        const val = inputs[key] ? parseFloat(inputs[key]) : 0;
        const bonus = tcState[key] ? 2 : 0;
        return val + bonus;
    };

    if (position === 'GK') {
        return [
            { label: 'DIV', value: getValue('พุ่งรับ') },
            { label: 'HAN', value: getValue('รับบอล') },
            { label: 'KIC', value: getValue('ส่งบอล') },
            { label: 'REF', value: getValue('GK ปฏิกิริยา') },
            { label: 'SPD', value: getValue('ความเร็ว') },
            { label: 'POS', value: getValue('ยืนตำแหน่ง') }
        ];
    }

    // PAC
    const pac = (getValue('ความเร็ว') + getValue('สปีดต้น')) / 2;
    // SHO
    const shoParams = ['จบสกอร์', 'พลังการยิง', 'ยิงไกล', 'วอลเลย์', 'ยืนตำแหน่ง'];
    const sho = shoParams.reduce((a, b) => a + getValue(b), 0) / shoParams.length;
    // PAS
    const pasParams = ['ส่งสั้น', 'ส่งไกล', 'เปิดบอล', 'อ่านเกม', 'อ่านเกมส์'];
    const pas = pasParams.reduce((a, b) => a + getValue(b), 0) / 4; 
    // DRI
    const driParams = ['เลี้ยงบอล', 'ควบคุมบอล', 'คล่องตัว', 'ปฏิกิริยา'];
    const dri = driParams.reduce((a, b) => a + getValue(b), 0) / driParams.length;
    // DEF
    const defParams = ['เข้าสกัด', 'ประกบตัว', 'เข้าปะทะ', 'สไลด์'];
    const def = defParams.reduce((a, b) => a + getValue(b), 0) / defParams.length;
    // PHY
    const phyParams = ['แข็งแกร่ง', 'ความอึด', 'ดุดัน', 'กระโดด', 'โหม่งบอล'];
    const phy = phyParams.reduce((a, b) => a + getValue(b), 0) / phyParams.length;

    return [
        { label: 'PAC', value: pac || 0 },
        { label: 'SHO', value: sho || 0 },
        { label: 'PAS', value: pas || 0 },
        { label: 'DRI', value: dri || 0 },
        { label: 'DEF', value: def || 0 },
        { label: 'PHY', value: phy || 0 }
    ];
};

// --- Archetype Logic ---
const getArchetype = (inputs, tcState) => {
    const getValue = (key) => (inputs[key] || 0) + (tcState[key] ? 2 : 0);
    
    const speed = Math.max(getValue("ความเร็ว"), getValue("สปีดต้น"));
    const shooting = Math.max(getValue("จบสกอร์"), getValue("พลังการยิง"), getValue("ยิงไกล"));
    const defense = Math.max(getValue("เข้าสกัด"), getValue("เข้าปะทะ"), getValue("ประกบตัว"));
    const passing = Math.max(getValue("ส่งสั้น"), getValue("ส่งไกล"), getValue("เปิดบอล"));
    const dribbling = Math.max(getValue("เลี้ยงบอล"), getValue("ควบคุมบอล"), getValue("คล่องตัว"));
    const physical = Math.max(getValue("แข็งแกร่ง"), getValue("ความอึด"), getValue("ดุดัน"));
    const gk = Math.max(getValue("พุ่งรับ"), getValue("รับบอล"));

    if (gk > 85) return "The Wall (จอมหนึบ)";
    if (speed > 90) return "Speedster (จรวดทางเรียบ)";
    if (shooting > 90) return "Sniper (เพชฌฆาต)";
    if (defense > 90) return "Iron Defense (กำแพงเหล็ก)";
    if (passing > 90) return "Maestro (จอมทัพ)";
    if (dribbling > 90) return "Wizard (พ่อมดลูกหนัง)";
    if (physical > 90) return "Tank (รถถัง)";
    
    if (speed > 80 && dribbling > 80) return "Winger (ปีกจรวจ)";
    if (shooting > 80 && physical > 80) return "Target Man (หน้าเป้า)";
    
    return "Prospect (ดาวรุ่ง)";
};

// --- Reusable PlayerCard Component (Hoisted to top) ---
const PlayerCard = ({ rating, position, name, archetype, small = false }) => {
    const getCardColor = (r) => {
        if (r >= 140) return 'from-fuchsia-600 via-purple-600 to-indigo-900 border-fuchsia-500/50 shadow-[0_0_30px_rgba(192,38,211,0.3)]'; // Icon
        if (r >= 130) return 'from-yellow-300 via-amber-500 to-amber-700 border-amber-400/50 shadow-[0_0_20px_rgba(245,158,11,0.3)]'; // Gold
        if (r >= 100) return 'from-slate-300 via-slate-400 to-slate-600 border-slate-300/50 shadow-[0_0_15px_rgba(203,213,225,0.2)]'; // Silver
        return 'from-orange-800 to-red-900 border-orange-600/50'; // Basic
    };

    const cardColor = getCardColor(rating);
    const sizeClasses = small ? "w-32 h-44 rounded-t-xl rounded-b-[2rem]" : "w-48 h-64 rounded-t-2xl rounded-b-[3rem]";
    const textTitle = small ? "text-3xl" : "text-5xl";
    const textPos = small ? "text-xs" : "text-sm";
    const iconSize = small ? 32 : 48;
    const nameSize = small ? "text-xs" : "text-lg";

    return (
        <div className={`relative ${sizeClasses} bg-gradient-to-br ${cardColor} border-2 shadow-2xl flex flex-col items-center pt-4 text-white overflow-hidden transform transition-all duration-500`}>
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-10 group-hover:animate-shine" />
            
            {/* Sparkle effect for high rating */}
            {!small && rating >= 140 && (
                <div className="absolute inset-0 z-0">
                    <Sparkles className="absolute top-2 right-2 text-white/50 animate-pulse" size={16} />
                    <Sparkles className="absolute bottom-10 left-2 text-white/30 animate-pulse delay-75" size={12} />
                </div>
            )}

            <div className={`absolute ${small ? 'top-2 left-2' : 'top-5 left-5'} flex flex-col items-center z-10`}>
                <span className={`${textTitle} font-black drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] leading-none tracking-tighter text-white`}>{Math.floor(rating)}</span>
                <span className={`${textPos} font-bold uppercase tracking-widest mt-1 opacity-90 font-kanit text-shadow`}>{position || 'POS'}</span>
            </div>
            
            <div className={`mt-2 ${small ? 'w-16 h-16' : 'w-24 h-24'} bg-black/40 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10 z-10 shadow-inner`}>
                <User size={iconSize} className="text-white/80" />
            </div>
            
            <div className="mt-auto mb-4 w-full text-center border-t border-white/10 pt-1 z-10">
                <span className={`${nameSize} font-black uppercase tracking-[0.2em] drop-shadow-md font-kanit text-white/80 truncate px-2 block`}>{name || 'PLAYER'}</span>
                {archetype && !small && <span className="text-[10px] uppercase tracking-wider text-white/60 font-kanit block mt-0.5">{archetype}</span>}
            </div>
        </div>
    );
};

// --- Toast Component ---
const ToastContainer = ({ toasts, removeToast, isDarkMode }) => {
    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
            {toasts.map((toast) => (
                <div key={toast.id} className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg shadow-black/20 animate-in slide-in-from-right duration-300 border ${isDarkMode ? 'bg-slate-800/90 border-indigo-500/30 text-white' : 'bg-white/90 border-indigo-200 text-gray-800'}`}>
                    <div className={`p-1.5 rounded-full ${isDarkMode ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-100 text-indigo-600'}`}>
                        {toast.type === 'success' ? <CheckCircle2 size={18} /> : <Bell size={18} />}
                    </div>
                    <span className="text-sm font-kanit">{toast.message}</span>
                    <button onClick={() => removeToast(toast.id)} className={`ml-2 ${isDarkMode ? 'text-slate-500 hover:text-white' : 'text-gray-400 hover:text-gray-700'}`}><X size={14} /></button>
                </div>
            ))}
        </div>
    );
};

// --- Custom Modal Component ---
const Modal = ({ isOpen, type, title, message, onConfirm, onCancel, content, isDarkMode }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
            <div className={`${isDarkMode ? 'bg-slate-900/90 border-slate-700/50' : 'bg-white/95 border-gray-200'} border rounded-2xl shadow-2xl ${content ? 'max-w-2xl' : 'max-w-sm'} w-full overflow-hidden transform scale-100 transition-all ring-1 ring-black/5`}>
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className={`p-3 rounded-full ${type === 'alert' ? (isDarkMode ? 'bg-red-500/10 text-red-400 ring-1 ring-red-500/20' : 'bg-red-100 text-red-600') : type === 'compare' ? (isDarkMode ? 'bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20' : 'bg-blue-100 text-blue-600') : (isDarkMode ? 'bg-indigo-500/10 text-indigo-400 ring-1 ring-indigo-500/20' : 'bg-indigo-100 text-indigo-600')}`}>
                            {type === 'alert' ? <AlertCircle size={24} /> : type === 'compare' ? <GitCompare size={24} /> : <CheckCircle2 size={24} />}
                        </div>
                        <h3 className={`text-lg font-bold font-kanit ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{title}</h3>
                        <button onClick={onCancel} className={`ml-auto ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-gray-400 hover:text-gray-700'}`}><X size={20} /></button>
                    </div>
                    {content ? content : (
                        <p className={`text-sm font-kanit leading-relaxed mb-6 font-light ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                            {message}
                        </p>
                    )}
                    {!content && (
                        <div className="flex gap-3 justify-end">
                            {type === 'confirm' && (
                                <button 
                                    onClick={onCancel}
                                    className={`px-4 py-2 rounded-lg text-sm font-kanit transition-colors border ${isDarkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 border-slate-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200'}`}
                                >
                                    ยกเลิก
                                </button>
                            )}
                            <button 
                                onClick={onConfirm}
                                className={`px-4 py-2 rounded-lg text-white text-sm font-kanit font-medium shadow-lg transition-all active:scale-95 ${type === 'alert' ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/20'}`}
                            >
                                ตกลง
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- Radar Chart Component ---
const RadarChart = ({ stats, size = 200, color = "#10b981", isDarkMode }) => {
    const radius = size / 2;
    const center = size / 2;
    const scale = radius - 30; // Margin for labels

    // Calculate points for the polygon
    const points = stats.map((stat, i) => {
        const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
        const r = (Math.min(stat.value, 120) / 120) * scale; // Max stat 120 for scaling
        const x = center + r * Math.cos(angle);
        const y = center + r * Math.sin(angle);
        return `${x},${y}`;
    }).join(' ');

    // Calculate points for background webs
    const getWebPoints = (level) => {
        return stats.map((_, i) => {
            const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
            const r = (level / 5) * scale;
            const x = center + r * Math.cos(angle);
            const y = center + r * Math.sin(angle);
            return `${x},${y}`;
        }).join(' ');
    };

    const lineColor = isDarkMode ? "#334155" : "#e2e8f0";
    const labelColor = isDarkMode ? "#94a3b8" : "#64748b";

    return (
        <div className="relative flex justify-center items-center">
            <svg width={size} height={size} className="overflow-visible">
                {/* Background Webs */}
                {[1, 2, 3, 4, 5].map(level => (
                    <polygon 
                        key={level} 
                        points={getWebPoints(level)} 
                        fill="none" 
                        stroke={lineColor}
                        strokeWidth="1"
                    />
                ))}
                
                {/* Axis Lines */}
                {stats.map((_, i) => {
                    const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
                    const x = center + scale * Math.cos(angle);
                    const y = center + scale * Math.sin(angle);
                    return <line key={i} x1={center} y1={center} x2={x} y2={y} stroke={lineColor} strokeWidth="1" />;
                })}

                {/* Data Polygon */}
                <polygon 
                    points={points} 
                    fill={color} 
                    fillOpacity="0.3" 
                    stroke={color} 
                    strokeWidth="2"
                />

                {/* Labels */}
                {stats.map((stat, i) => {
                    const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
                    const x = center + (scale + 15) * Math.cos(angle);
                    const y = center + (scale + 15) * Math.sin(angle);
                    return (
                        <text 
                            key={i} 
                            x={x} 
                            y={y} 
                            textAnchor="middle" 
                            alignmentBaseline="middle" 
                            fill={labelColor}
                            fontSize="10" 
                            fontWeight="bold"
                            fontFamily="Kanit"
                        >
                            {stat.label}
                        </text>
                    );
                })}
            </svg>
        </div>
    );
};

// --- Sub-Components ---

const PositionSelector = ({ selectedPosition, onSelectPosition, isDarkMode }) => {
    const positionGroups = [
        { title: 'กองหน้า', positions: ['ST', 'CF'] },
        { title: 'ปีก', positions: ['LW/RW', 'LM/RM'] },
        { title: 'กองกลาง', positions: ['CAM', 'CM', 'CDM'] },
        { title: 'กองหลัง', positions: ['LWB/RWB', 'LB/RB', 'CB'] },
        { title: 'ผู้รักษาประตู', positions: ['GK'] },
    ];

    return (
        <div className="space-y-5">
            {positionGroups.map((group) => (
                <div key={group.title}>
                    <h3 className={`text-xs font-medium mb-2.5 uppercase tracking-wider pl-1 font-kanit flex items-center gap-2 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                        <span className={`w-1 h-1 rounded-full ${isDarkMode ? 'bg-slate-500' : 'bg-gray-400'}`}></span>
                        {group.title}
                    </h3>
                    <div className="grid grid-cols-2 gap-2.5">
                        {group.positions.map((pos) => {
                            const isSelected = selectedPosition === pos;
                            return (
                                <button
                                    key={pos}
                                    onClick={() => onSelectPosition(pos)}
                                    className={`px-3 py-2.5 text-sm rounded-xl border transition-all duration-300 font-bold font-kanit relative overflow-hidden group 
                                    ${isSelected 
                                        ? 'text-white border-transparent shadow-lg shadow-black/20' 
                                        : isDarkMode 
                                            ? 'bg-slate-800/40 border-slate-700/50 text-slate-400 hover:bg-slate-800 hover:border-slate-600 hover:text-slate-200' 
                                            : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                    style={isSelected ? { background: `linear-gradient(135deg, ${positionColors[pos]} 0%, ${isDarkMode ? '#1e293b' : '#64748b'} 100%)` } : {}}
                                >
                                    {isSelected && <div className="absolute inset-0 bg-white/10 blur-sm group-hover:bg-white/20 transition-all"></div>}
                                    <span className="relative z-10 flex items-center justify-center gap-1.5">
                                        {pos}
                                        {isSelected && <ChevronRight size={14} className="opacity-70" />}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

const InputForm = ({ players, inputs, tcState, onInputChange, onTCToggle, tcCount, onReset, isDarkMode }) => {
    return (
        <div>
            <div className="flex justify-end mb-4">
                <button 
                    onClick={onReset}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-kanit transition-all border
                        ${isDarkMode 
                            ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border-red-500/20' 
                            : 'bg-red-50 text-red-600 hover:bg-red-100 border-red-100'
                        }`}
                >
                    <Eraser size={14} /> ล้างค่าพลัง
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {players.map((player) => {
                    const isTCActive = tcState[player.key];
                    const canActivate = tcCount < 5 || isTCActive;
                    const StatIcon = STAT_ICONS[player.key] || Activity; 
                    return (
                        <div key={player.key} className={`relative p-3 rounded-xl border transition-all duration-300 flex flex-col justify-between gap-2.5 group 
                            ${isTCActive 
                                ? (isDarkMode ? 'bg-indigo-500/10 border-indigo-500/40' : 'bg-indigo-50 border-indigo-200') 
                                : (isDarkMode 
                                    ? 'bg-slate-800/30 border-slate-700/40 hover:border-slate-600 hover:bg-slate-800/50' 
                                    : 'bg-white border-gray-200 hover:border-indigo-200 hover:shadow-sm')
                            }`}>
                            <div className="flex justify-between items-start">
                                <label className={`text-sm font-medium font-kanit flex items-center gap-2.5 transition-colors 
                                    ${isTCActive 
                                        ? (isDarkMode ? 'text-indigo-300' : 'text-indigo-700') 
                                        : (isDarkMode ? 'text-slate-300 group-hover:text-slate-200' : 'text-gray-600 group-hover:text-gray-900')
                                    }`}>
                                    <div className={`p-1.5 rounded-lg transition-colors 
                                        ${isTCActive 
                                            ? (isDarkMode ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-100 text-indigo-600') 
                                            : (isDarkMode ? 'bg-slate-700/50 text-slate-500 group-hover:bg-slate-700 group-hover:text-slate-400' : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200 group-hover:text-gray-600')
                                        }`}>
                                        <StatIcon size={14} />
                                    </div>
                                    {player.key}
                                </label>
                                <span className={`text-[10px] font-kanit px-2 py-0.5 rounded-full border 
                                    ${isTCActive 
                                        ? (isDarkMode ? 'bg-indigo-500/20 border-indigo-500/20 text-indigo-300' : 'bg-indigo-100 border-indigo-200 text-indigo-700') 
                                        : (isDarkMode ? 'bg-slate-900/50 border-slate-700 text-slate-500' : 'bg-gray-50 border-gray-200 text-gray-400')
                                    }`}>
                                    {player.value}%
                                </span>
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                                <div className="relative flex-1">
                                    <input 
                                        type="number" 
                                        min="0" 
                                        // max="99" removed
                                        name={player.key} 
                                        value={inputs[player.key] || ''} 
                                        onChange={onInputChange} 
                                        className={`w-full border text-center rounded-lg py-1.5 outline-none font-mono text-sm transition-all shadow-inner focus:ring-2 
                                            ${isDarkMode 
                                                ? 'bg-slate-900/80 text-white focus:ring-indigo-500/50 focus:border-indigo-500/50 border-slate-700/80 group-hover:border-slate-600' 
                                                : 'bg-gray-50 text-gray-900 focus:ring-indigo-200 focus:border-indigo-400 border-gray-200 group-hover:border-gray-300'
                                            }
                                            ${isTCActive ? (isDarkMode ? 'border-indigo-500/30 pr-8' : 'border-indigo-300 bg-white pr-8') : ''}
                                        `} 
                                        placeholder="0" 
                                    />
                                    {isTCActive && (
                                        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-emerald-500 pointer-events-none drop-shadow-sm">
                                            +2
                                        </div>
                                    )}
                                </div>
                                <button 
                                    type="button" 
                                    tabIndex={-1} 
                                    onClick={() => canActivate && onTCToggle(player.key)} 
                                    disabled={!canActivate} 
                                    className={`relative w-12 h-[34px] rounded-lg flex items-center justify-center transition-all duration-300 outline-none focus:ring-0 border
                                        ${isTCActive 
                                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-105 border-transparent' 
                                            : canActivate 
                                                ? (isDarkMode ? 'bg-slate-700/50 text-slate-400 border-slate-700 hover:bg-slate-700 hover:text-slate-200' : 'bg-white text-gray-400 border-gray-200 hover:bg-gray-50 hover:text-gray-600') 
                                                : (isDarkMode ? 'bg-slate-800/50 text-slate-700 cursor-not-allowed border-transparent' : 'bg-gray-100 text-gray-300 cursor-not-allowed border-transparent')
                                        }`}
                                >
                                    <span className="font-mono text-xs font-bold">{isTCActive ? '+2' : 'TC'}</span>
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const ResultDisplay = ({ calculatedValue, position, topFactors, strategies, activeStrategyId, onSelectStrategy, onApplyStrategy, playerName, archetype, radarStats, isDarkMode }) => {
    const activeStrategy = strategies.find(s => s.id === activeStrategyId) || strategies[0];
    const bonusRating = calculateBonus(activeStrategy.candidates);
    
    // Feature 3: Detailed Decimal Rating
    const decimalPart = calculatedValue % 1;
    const progressPercent = decimalPart * 100;

    return (
        <div className="space-y-6">
            <div className={`flex flex-col items-center justify-center p-6 rounded-3xl border backdrop-blur-md relative overflow-hidden group transition-colors
                ${isDarkMode ? 'bg-slate-800/30 border-white/5' : 'bg-white/60 border-white shadow-xl shadow-indigo-100/50'}`}>
                <div className="group-hover:scale-105 transition-transform duration-500">
                    <PlayerCard rating={calculatedValue} position={position} name={playerName} archetype={archetype} />
                </div>
                
                <div className="mt-6 text-center z-10 w-full px-6">
                    <h3 className={`text-3xl font-bold mb-1 tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{calculatedValue.toFixed(2)}</h3>
                    
                    {/* Decimal Progress Bar */}
                    <div className={`w-full h-1.5 rounded-full mt-2 mb-1 overflow-hidden ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`}>
                        <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
                    </div>
                    <div className={`flex justify-between text-[10px] font-kanit ${isDarkMode ? 'text-slate-500' : 'text-gray-500'}`}>
                        <span>{Math.floor(calculatedValue)}</span>
                        <span className="text-emerald-500">{progressPercent.toFixed(0)}% to next</span>
                        <span>{Math.floor(calculatedValue) + 1}</span>
                    </div>
                </div>
            </div>

            <div className={`rounded-2xl p-5 backdrop-blur-md border transition-colors ${isDarkMode ? 'bg-slate-800/30 border-white/5' : 'bg-white/60 border-white shadow-lg shadow-indigo-50/50'}`}>
                <div className="flex items-center gap-2.5 mb-4">
                    <div className={`p-1.5 rounded-lg ${isDarkMode ? 'bg-sky-500/20 text-sky-400' : 'bg-sky-100 text-sky-600'}`}><Hexagon size={18} /></div>
                    <h3 className={`text-sm font-bold font-kanit ${isDarkMode ? 'text-slate-200' : 'text-gray-800'}`}>วิเคราะห์ทรงบอล (Style)</h3>
                </div>
                <div className="flex justify-center pb-2">
                    <RadarChart stats={radarStats} size={200} color="#0ea5e9" isDarkMode={isDarkMode} />
                </div>
            </div>

            <div className={`rounded-2xl p-5 backdrop-blur-md border transition-colors ${isDarkMode ? 'bg-slate-800/30 border-white/5' : 'bg-white/60 border-white shadow-lg shadow-indigo-50/50'}`}>
                <div className="flex items-center gap-2.5 mb-4">
                    <div className={`p-1.5 rounded-lg ${isDarkMode ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-100 text-indigo-600'}`}><Flame size={18} /></div>
                    <h3 className={`text-sm font-bold font-kanit ${isDarkMode ? 'text-slate-200' : 'text-gray-800'}`}>แนะนำสูตรอัพพลัง TC</h3>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                    {strategies.map(s => {
                        const Icon = s.icon;
                        const isActive = s.id === activeStrategyId;
                        return (
                            <button key={s.id} onClick={() => onSelectStrategy(s.id)} className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[10px] font-kanit transition-all border 
                                ${isActive 
                                    ? 'bg-indigo-600 text-white border-indigo-500 font-medium shadow-lg shadow-indigo-500/20' 
                                    : (isDarkMode ? 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700 hover:text-slate-200' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:text-gray-800 hover:border-gray-300')
                                }`}>
                                <Icon size={12} /> {s.name}
                            </button>
                        );
                    })}
                </div>
                <div className={`rounded-xl p-4 border relative overflow-hidden ${isDarkMode ? 'bg-slate-900/50 border-white/5' : 'bg-white border-gray-100'}`}>
                    <div className="flex justify-between items-start mb-3 relative z-10">
                        <div>
                            <h4 className={`text-sm font-bold font-kanit flex items-center gap-2 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-700'}`}>
                                {activeStrategy.name}
                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono border ${isDarkMode ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>+{bonusRating.toFixed(2)} OVR</span>
                            </h4>
                            <p className={`text-[10px] mt-1 font-kanit leading-relaxed font-light ${isDarkMode ? 'text-slate-500' : 'text-gray-500'}`}>{activeStrategy.description}</p>
                        </div>
                    </div>
                    <div className="space-y-2 mb-4 relative z-10">
                        {activeStrategy.candidates.map((p, i) => (
                            <div key={i} className={`flex justify-between items-center text-[10px] p-1.5 rounded border ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                                <span className={`font-kanit flex items-center gap-2 ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                                    <span className={`w-4 h-4 flex items-center justify-center rounded-full text-[9px] font-bold ${isDarkMode ? 'bg-slate-700 text-slate-400' : 'bg-gray-200 text-gray-500'}`}>{i+1}</span>{p.key}
                                </span>
                                <span className={`${isDarkMode ? 'text-slate-500' : 'text-gray-400'} font-kanit`}>สำคัญ {p.value}%</span>
                            </div>
                        ))}
                    </div>
                    <button onClick={onApplyStrategy} className="w-full text-xs bg-indigo-600 text-white px-4 py-2.5 rounded-lg shadow-lg hover:shadow-indigo-500/20 hover:bg-indigo-500 transition-all flex items-center justify-center gap-2 font-kanit font-medium relative z-10"><CheckCircle2 size={14} /> ใช้สูตรนี้เลย</button>
                </div>
            </div>

            <div className={`rounded-2xl p-5 backdrop-blur-md border transition-colors ${isDarkMode ? 'bg-slate-800/30 border-white/5' : 'bg-white/60 border-white shadow-lg shadow-indigo-50/50'}`}>
                <h3 className={`text-sm font-bold mb-4 flex items-center gap-2.5 font-kanit ${isDarkMode ? 'text-slate-200' : 'text-gray-800'}`}>
                    <div className={`p-1.5 rounded-lg ${isDarkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600'}`}><Shield size={18} /></div>
                    5 อันดับความสำคัญสูงสุด
                </h3>
                <div className="space-y-2">
                    {topFactors.map((p, i) => (
                        <div key={i} className={`flex justify-between items-center text-xs p-2.5 rounded-lg transition-colors border border-transparent 
                            ${isDarkMode ? 'bg-white/5 hover:bg-white/10 hover:border-white/5' : 'bg-white hover:bg-gray-50 hover:border-gray-200 shadow-sm'}`}>
                            <div className="flex items-center gap-3">
                                <span className={`w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold ${i === 0 ? 'bg-amber-500 text-black' : (isDarkMode ? 'bg-slate-700 text-slate-400' : 'bg-gray-200 text-gray-500')}`}>{i+1}</span>
                                <span className={`font-kanit ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>{p.key}</span>
                            </div>
                            <span className={`font-mono font-bold ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>{p.value}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const SavedPlayersList = ({ savedPlayers, onLoad, onDelete, onCompare, activePlayerId, isDarkMode }) => {
    if (savedPlayers.length === 0) return null;

    return (
        <div className={`rounded-2xl p-5 backdrop-blur-md border transition-colors ${isDarkMode ? 'bg-slate-800/30 border-white/5' : 'bg-white/60 border-white shadow-lg shadow-indigo-50/50'}`}>
            <h3 className={`text-sm font-bold mb-4 flex items-center gap-2.5 font-kanit ${isDarkMode ? 'text-slate-200' : 'text-gray-800'}`}>
                <div className={`p-1.5 rounded-lg ${isDarkMode ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-600'}`}><FolderOpen size={18} /></div>
                นักเตะที่บันทึกไว้ ({savedPlayers.length})
            </h3>
            <div className="space-y-2.5 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
                {savedPlayers.map((player) => (
                    <div key={player.id} className={`flex items-center justify-between p-3 rounded-xl border transition-all group 
                        ${activePlayerId === player.id 
                            ? (isDarkMode ? 'bg-indigo-500/10 border-indigo-500/40 shadow-inner' : 'bg-indigo-50 border-indigo-200 shadow-inner') 
                            : (isDarkMode ? 'bg-white/5 hover:bg-white/10 border-white/5' : 'bg-white border-gray-100 hover:border-indigo-200 hover:shadow-sm')
                        }`}>
                        <div className="flex items-center gap-3.5 cursor-pointer flex-1" onClick={() => onLoad(player)}>
                            <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-black shadow-lg ring-2 ring-white/10" style={{ background: `linear-gradient(135deg, ${positionColors[player.position]} 0%, #cbd5e1 100%)` }}>{player.position}</div>
                            <div>
                                <h4 className={`text-sm font-bold font-kanit transition-colors flex items-center gap-2 
                                    ${activePlayerId === player.id 
                                        ? (isDarkMode ? 'text-indigo-300' : 'text-indigo-700') 
                                        : (isDarkMode ? 'text-slate-200 group-hover:text-white' : 'text-gray-700 group-hover:text-black')
                                    }`}>
                                    {player.name}
                                    {activePlayerId === player.id && <span className="text-[9px] bg-indigo-500 text-white px-1.5 py-0.5 rounded flex items-center gap-1 font-bold shadow-sm">แก้ไขอยู่</span>}
                                </h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${isDarkMode ? 'text-slate-400 bg-black/40 border-white/5' : 'text-gray-500 bg-gray-100 border-gray-200'}`}>OVR {Math.floor(player.rating)}</span>
                                    <span className={`text-[10px] font-light ${isDarkMode ? 'text-slate-600' : 'text-gray-400'}`}>{new Date(player.lastModified || player.id).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                             <button onClick={() => onCompare(player)} className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'text-slate-600 hover:text-blue-400 hover:bg-blue-500/10' : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'}`} title="เปรียบเทียบ"><GitCompare size={16} /></button>
                             <button onClick={() => onDelete(player.id)} className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'text-slate-600 hover:text-red-400 hover:bg-red-500/10' : 'text-gray-400 hover:text-red-600 hover:bg-red-50'}`} title="ลบ"><Trash2 size={16} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const CompareModalContent = ({ current, target, dataset, isDarkMode }) => {
    // Helper to calculate stat value for a specific player setup
    const calculateStat = (inputs, tcState, key) => {
        const base = inputs[key] || 0;
        const bonus = tcState[key] ? 2 : 0;
        return base + bonus;
    };

    const diff = target.rating - current.rating;

    // Get relevant stats for the position (using current selected position factors)
    const positionFactors = dataset.filter(p => p.position === current.position).sort((a,b) => b.value - a.value);

    return (
        <div className="font-kanit">
             <div className="flex justify-around items-center mb-6">
                <div className="flex flex-col items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full border ${isDarkMode ? 'text-slate-400 bg-slate-800/50 border-white/5' : 'text-gray-500 bg-gray-100 border-gray-200'}`}>ปัจจุบัน</span>
                    <PlayerCard rating={current.rating} position={current.position} name={current.name} small />
                </div>
                <div className="flex flex-col items-center gap-2">
                    <span className={`font-bold text-3xl font-mono italic opacity-50 ${isDarkMode ? 'text-slate-500' : 'text-gray-300'}`}>VS</span>
                    <div className={`text-sm font-bold px-3 py-1 rounded-full ${diff > 0 ? 'bg-rose-500/10 text-rose-400' : diff < 0 ? 'bg-sky-500/10 text-sky-400' : 'bg-slate-700 text-slate-300'}`}>
                        {diff > 0 ? '+' : ''}{diff.toFixed(2)}
                    </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full border ${isDarkMode ? 'text-slate-400 bg-slate-800/50 border-white/5' : 'text-gray-500 bg-gray-100 border-gray-200'}`}>เป้าหมาย</span>
                    <PlayerCard rating={target.rating} position={target.position} name={target.name} small />
                </div>
            </div>

            <div className={`space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar p-3 rounded-xl border ${isDarkMode ? 'bg-slate-800/20 border-white/5' : 'bg-gray-50 border-gray-200'}`}>
                <h4 className={`text-xs uppercase tracking-wider mb-2 flex items-center gap-2 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}><Activity size={12}/> เปรียบเทียบค่าพลัง (Top Factors)</h4>
                {positionFactors.map((factor) => {
                    const currentVal = calculateStat(current.inputs, current.tcState, factor.key);
                    const targetVal = calculateStat(target.inputs, target.tcState, factor.key);
                    const statDiff = targetVal - currentVal; 

                    return (
                        <div key={factor.key} className={`flex items-center text-xs p-2 rounded border transition-colors ${isDarkMode ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-white border-gray-100 hover:border-indigo-100'}`}>
                            <div className={`w-24 truncate font-medium ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>{factor.key}</div>
                            
                            <div className="flex-1 flex items-center gap-3">
                                {/* Current Side */}
                                <div className="flex items-center justify-end w-16 gap-1">
                                    {statDiff < 0 && <span className="text-emerald-500 font-bold text-[10px]">+{Math.abs(statDiff)}</span>}
                                    <div className={`text-right font-mono font-bold ${statDiff < 0 ? (isDarkMode ? 'text-white' : 'text-gray-900') : (isDarkMode ? 'text-slate-400' : 'text-gray-400')}`}>{currentVal}</div>
                                </div>

                                {/* Bar Area */}
                                <div className={`flex-1 h-2 rounded-full relative overflow-hidden flex items-center ${isDarkMode ? 'bg-slate-800' : 'bg-gray-200'}`}>
                                     <div className="absolute top-0 bottom-0 left-0 bg-sky-500 opacity-80" style={{width: `${Math.min(100, (currentVal/150)*100)}%`, zIndex: currentVal < targetVal ? 2 : 1}}></div>
                                     <div className="absolute top-0 bottom-0 left-0 bg-rose-500 opacity-80" style={{width: `${Math.min(100, (targetVal/150)*100)}%`, zIndex: targetVal < currentVal ? 2 : 1}}></div>
                                </div>

                                {/* Target Side */}
                                <div className="flex items-center justify-start w-16 gap-1">
                                    <div className={`text-left font-mono font-bold ${statDiff > 0 ? (isDarkMode ? 'text-white' : 'text-gray-900') : (isDarkMode ? 'text-slate-400' : 'text-gray-400')}`}>{targetVal}</div>
                                    {statDiff > 0 && <span className="text-emerald-500 font-bold text-[10px]">+{statDiff}</span>}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// --- Main App Component ---
export default function App() {
    const [selectedPosition, setSelectedPosition] = useState('ST');
    const [inputs, setInputs] = useState({});
    const [tcState, setTcState] = useState({});
    const [calculatedValue, setCalculatedValue] = useState(0);
    const [sortOrder, setSortOrder] = useState('default');
    const [activeStrategyId, setActiveStrategyId] = useState('max_rating');
    const [playerName, setPlayerName] = useState('');
    const [savedPlayers, setSavedPlayers] = useState([]);
    const [activePlayerId, setActivePlayerId] = useState(null);
    const [modalConfig, setModalConfig] = useState({ isOpen: false, type: 'alert', title: '', message: '', onConfirm: null, content: null });
    const [toasts, setToasts] = useState([]); 
    const [isDarkMode, setIsDarkMode] = useState(true); // New State: Theme
    const prevCalculatedValue = useRef(0); 

    useEffect(() => {
        const saved = localStorage.getItem('fifa_saved_players');
        if (saved) { try { setSavedPlayers(JSON.parse(saved)); } catch (e) { console.error(e); } }
        
        // Load theme pref
        const savedTheme = localStorage.getItem('fifa_theme');
        if (savedTheme) {
            setIsDarkMode(savedTheme === 'dark');
        }
    }, []);

    // Helper to add toast
    const addToast = (message, type = 'success') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
    };

    const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));

    // Toggle Theme Function
    const toggleTheme = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        localStorage.setItem('fifa_theme', newMode ? 'dark' : 'light');
    };

    const handlePositionChange = (pos) => {
        if (pos === selectedPosition) return;

        const newPosKeys = dataset.filter(p => p.position === pos).map(p => p.key);

        const preservedInputs = Object.keys(inputs).reduce((acc, key) => {
            if (newPosKeys.includes(key)) {
                acc[key] = inputs[key];
            }
            return acc;
        }, {});

        const preservedTcState = Object.keys(tcState).reduce((acc, key) => {
            if (newPosKeys.includes(key)) {
                acc[key] = tcState[key];
            }
            return acc;
        }, {});

        setSelectedPosition(pos);
        setInputs(preservedInputs); 
        setTcState(preservedTcState); 
        setCalculatedValue(0); 
        setSortOrder('default');
        setActiveStrategyId('max_rating');
        setActivePlayerId(null);
        
        if (Object.keys(preservedInputs).length > 0) {
            // Optional: notify
        }
    };

    // Feature 1: Reset Button Logic
    const handleReset = () => {
        showModal({
            type: 'confirm', title: 'ยืนยันการล้างค่า', message: 'คุณต้องการล้างค่าพลังทั้งหมดเป็น 0 ใช่หรือไม่? (ชื่อและตำแหน่งจะไม่ถูกลบ)',
            onConfirm: () => {
                setInputs({});
                setTcState({});
                closeModal();
                addToast('ล้างค่าพลังเรียบร้อยแล้ว');
            },
            onCancel: closeModal
        });
    };

    const handleInputChange = (e) => {
        let val = Number(e.target.value);
        // if (val > 99) val = 99; // Removed max cap logic
        setInputs({ ...inputs, [e.target.name]: Math.max(0, val) });
    };

    const handleTCToggle = (key) => {
        setTcState(prev => {
            const isCurrentlyActive = !!prev[key];
            if (!isCurrentlyActive && Object.values(prev).filter(Boolean).length >= 5) return prev;
            return { ...prev, [key]: !isCurrentlyActive };
        });
    };

    useEffect(() => {
        const calculateStatus = () => {
            let total = 0;
            dataset.filter(player => player.position === selectedPosition).forEach(player => {
                const mainValue = inputs[player.key] ? parseFloat(inputs[player.key]) : 0;
                const tcBonus = tcState[player.key] ? 2 : 0; 
                total += (mainValue + tcBonus) * player.value;
            });
            const newValue = total / 100;
            
            prevCalculatedValue.current = newValue;
            setCalculatedValue(newValue);
        };
        calculateStatus();
    }, [inputs, tcState, selectedPosition]);

    const toggleSortOrder = () => setSortOrder(prev => prev === 'default' ? 'value' : 'default');

    const showModal = (config) => setModalConfig({ isOpen: true, ...config });
    const closeModal = () => setModalConfig({ ...modalConfig, isOpen: false, content: null });

    const handleSavePlayer = () => {
        if (!playerName.trim()) {
            showModal({ type: 'alert', title: 'แจ้งเตือน', message: 'กรุณากรอกชื่อนักเตะก่อนบันทึก', onConfirm: closeModal });
            return;
        }
        const playerData = { name: playerName, position: selectedPosition, rating: calculatedValue, inputs, tcState, lastModified: Date.now() };
        if (activePlayerId) {
            const updatedList = savedPlayers.map(p => p.id === activePlayerId ? { ...p, ...playerData } : p);
            setSavedPlayers(updatedList);
            localStorage.setItem('fifa_saved_players', JSON.stringify(updatedList));
            addToast('บันทึกทับข้อมูลเดิมเรียบร้อยแล้ว');
        } else {
            const newId = Date.now();
            const updatedList = [{ id: newId, ...playerData }, ...savedPlayers];
            setSavedPlayers(updatedList);
            localStorage.setItem('fifa_saved_players', JSON.stringify(updatedList));
            setActivePlayerId(newId);
            addToast('บันทึกนักเตะใหม่เรียบร้อยแล้ว');
        }
    };

    const handleSaveAsNew = () => {
        if (!playerName.trim()) {
            showModal({ type: 'alert', title: 'แจ้งเตือน', message: 'กรุณากรอกชื่อนักเตะก่อนบันทึก', onConfirm: closeModal });
            return;
        }
        const newId = Date.now();
        const updatedList = [{ id: newId, name: playerName, position: selectedPosition, rating: calculatedValue, inputs, tcState, lastModified: Date.now() }, ...savedPlayers];
        setSavedPlayers(updatedList);
        localStorage.setItem('fifa_saved_players', JSON.stringify(updatedList));
        setActivePlayerId(newId);
        addToast('บันทึกเป็นไฟล์ใหม่เรียบร้อยแล้ว');
    };

    const handleLoadPlayer = (player) => {
        const load = () => {
            setSelectedPosition(player.position);
            setInputs(player.inputs);
            setTcState(player.tcState);
            setPlayerName(player.name);
            setActivePlayerId(player.id);
            closeModal();
            addToast(`โหลดข้อมูล "${player.name}" เรียบร้อยแล้ว`);
        };
        if (Object.keys(inputs).length > 0 && activePlayerId !== player.id) {
            showModal({ type: 'confirm', title: 'ยืนยันการโหลด', message: `ต้องการโหลดข้อมูลของ "${player.name}" หรือไม่? ข้อมูลปัจจุบันที่ยังไม่บันทึกจะหายไป`, onConfirm: load, onCancel: closeModal });
        } else {
            load();
        }
    };

    const handleDeletePlayer = (id) => {
        showModal({
            type: 'confirm', title: 'ยืนยันการลบ', message: 'คุณต้องการลบข้อมูลนักเตะคนนี้ใช่หรือไม่?',
            onConfirm: () => {
                const updatedList = savedPlayers.filter(p => p.id !== id);
                setSavedPlayers(updatedList);
                localStorage.setItem('fifa_saved_players', JSON.stringify(updatedList));
                if (activePlayerId === id) { setActivePlayerId(null); setPlayerName(''); setInputs({}); setTcState({}); }
                closeModal();
                addToast('ลบข้อมูลเรียบร้อยแล้ว');
            },
            onCancel: closeModal
        });
    };

    const handleCompare = (targetPlayer) => {
        const currentPlayer = {
            name: playerName || "Current Draft",
            position: selectedPosition,
            rating: calculatedValue,
            inputs: inputs,
            tcState: tcState
        };

        showModal({
            type: 'compare',
            title: 'เปรียบเทียบนักเตะ',
            content: <CompareModalContent current={currentPlayer} target={targetPlayer} dataset={dataset} isDarkMode={isDarkMode} />,
            onCancel: closeModal,
            onConfirm: closeModal
        });
    };

    let currentPlayers = dataset.filter(player => player.position === selectedPosition);
    let displayedPlayers = [...currentPlayers];
    if (sortOrder === 'default') {
        const orderList = DEFAULT_SORT_ORDERS[selectedPosition];
        if (orderList) {
            const orderMap = new Map(orderList.map((key, index) => [key, index]));
            displayedPlayers.sort((a, b) => (orderMap.has(a.key) ? orderMap.get(a.key) : Infinity) - (orderMap.has(b.key) ? orderMap.get(b.key) : Infinity));
        }
    } else {
        displayedPlayers.sort((a, b) => b.value - a.value);
    }
    const topFactors = [...currentPlayers].sort((a, b) => b.value - a.value).slice(0, 5);
    const strategies = STRATEGY_DEFINITIONS.map(strategy => {
        let candidates = [];
        if (strategy.keywords.length > 0) {
            const matches = currentPlayers.filter(p => strategy.keywords.some(k => p.key.includes(k)));
            matches.sort((a, b) => b.value - a.value);
            candidates = [...matches];
            if (candidates.length < 5) {
                const remaining = currentPlayers.filter(p => !candidates.includes(p)).sort((a, b) => b.value - a.value);
                candidates = [...candidates, ...remaining].slice(0, 5);
            } else { candidates = candidates.slice(0, 5); }
        } else { candidates = [...currentPlayers].sort((a, b) => b.value - a.value).slice(0, 5); }
        return { ...strategy, candidates, isValid: candidates.length > 0 };
    }).filter(s => s.isValid);
    const applyActiveStrategy = () => {
        const active = strategies.find(s => s.id === activeStrategyId);
        if (active) { 
            const newTcState = {}; 
            active.candidates.forEach(p => { newTcState[p.key] = true; }); 
            setTcState(newTcState); 
            addToast(`ใช้สูตร ${active.name} เรียบร้อยแล้ว`);
        }
    };
    const tcCount = Object.values(tcState).filter(Boolean).length;

    // Calculate radar stats for current player
    const radarStats = calculateGroupStats(inputs, tcState, selectedPosition);
    // Get Archetype
    const archetype = getArchetype(inputs, tcState);

    return (
        <div className={`min-h-screen font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-300 ${isDarkMode ? 'bg-slate-950 text-slate-200' : 'bg-gray-100 text-gray-900'}`} style={isDarkMode ? {
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(30, 41, 59, 0.5) 0%, rgba(2, 6, 23, 1) 100%), url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23334155' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        } : {
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.8) 0%, rgba(241, 245, 249, 1) 100%), url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23cbd5e1' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700;800&display=swap'); body, .font-kanit { font-family: 'Kanit', sans-serif; } @keyframes shine { 0% { left: -100%; opacity: 0; } 50% { opacity: 0.5; } 100% { left: 200%; opacity: 0; } } .animate-shine { animation: shine 2s infinite linear; } .custom-scrollbar::-webkit-scrollbar { width: 6px; } .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.05); border-radius: 4px; } .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(100,116,139,0.2); border-radius: 4px; } .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(100,116,139,0.4); }`}</style>
            
            <Modal isOpen={modalConfig.isOpen} type={modalConfig.type} title={modalConfig.title} message={modalConfig.message} onConfirm={modalConfig.onConfirm} onCancel={modalConfig.onCancel} content={modalConfig.content} isDarkMode={isDarkMode} />
            <ToastContainer toasts={toasts} removeToast={removeToast} isDarkMode={isDarkMode} />

            <header className={`sticky top-0 z-20 backdrop-blur-xl border-b transition-colors ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-gray-200'}`}>
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="bg-indigo-600 p-2.5 rounded-xl shadow-lg shadow-indigo-600/20"><Calculator size={24} className="text-white" /></div>
                        <div>
                            <h1 className={`text-xl font-bold tracking-tight font-kanit ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>ระบบคำนวนอัพสเตตัสนักเตะ</h1>
                            <p className={`text-xs font-kanit ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Dev by Jiw Jirakiat</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={toggleTheme} className={`p-2.5 rounded-full transition-colors border ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-yellow-400 border-slate-700' : 'bg-white hover:bg-gray-100 text-slate-600 border-gray-200'}`}>
                            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <button onClick={() => window.location.reload()} className={`p-2.5 rounded-full transition-colors border ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border-slate-700' : 'bg-white hover:bg-gray-100 text-gray-500 hover:text-gray-800 border-gray-200'}`}><RefreshCw size={20} /></button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
                <div className="grid md:grid-cols-12 gap-8">
                    <div className="md:col-span-3">
                        <div className={`p-5 rounded-3xl border backdrop-blur-md sticky top-24 shadow-xl transition-colors ${isDarkMode ? 'bg-slate-800/30 border-white/5' : 'bg-white/60 border-white shadow-indigo-100/50'}`}>
                            <h2 className={`text-sm font-bold mb-5 flex items-center gap-2.5 font-kanit ${isDarkMode ? 'text-slate-200' : 'text-gray-800'}`}>
                                <div className={`p-1.5 rounded-lg ${isDarkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600'}`}><Target size={18} /></div>
                                เลือกตำแหน่ง
                            </h2>
                            <PositionSelector selectedPosition={selectedPosition} onSelectPosition={handlePositionChange} isDarkMode={isDarkMode} />
                        </div>
                    </div>

                    <div className="md:col-span-6">
                        <div className={`p-6 rounded-3xl border backdrop-blur-md shadow-xl min-h-[600px] transition-colors ${isDarkMode ? 'bg-slate-800/30 border-white/5' : 'bg-white/60 border-white shadow-indigo-100/50'}`}>
                            <div className={`mb-6 p-4 rounded-2xl border flex items-center gap-3 transition-colors ${isDarkMode ? 'bg-slate-900/50 border-white/5' : 'bg-white border-gray-200 shadow-sm'}`}>
                                <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-100 text-indigo-600'}`}><PenLine size={20} /></div>
                                <div className="flex-1 relative">
                                    <input 
                                        type="text" 
                                        value={playerName} 
                                        onChange={(e) => setPlayerName(e.target.value)} 
                                        placeholder="ใส่ชื่อนักเตะเพื่อบันทึก..." 
                                        className={`w-full bg-transparent border-none focus:ring-0 font-kanit text-sm ${isDarkMode ? 'text-white placeholder-slate-500' : 'text-gray-900 placeholder-gray-400'}`} 
                                    />
                                </div>
                                {activePlayerId && (
                                    <button onClick={handleSaveAsNew} className={`p-2 rounded-lg transition-colors shadow-lg ${isDarkMode ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`} title="บันทึกเป็นใหม่"><FilePlus size={18} /></button>
                                )}
                                <button onClick={handleSavePlayer} className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors shadow-lg shadow-indigo-600/20" title={activePlayerId ? "บันทึกทับ" : "บันทึก"}>{activePlayerId ? <Save size={18} /> : <Save size={18} />}</button>
                            </div>

                            <div className={`flex justify-between items-center mb-8 pb-4 border-b ${isDarkMode ? 'border-white/5' : 'border-gray-200'}`}>
                                <div>
                                    <h2 className={`text-2xl font-bold flex items-center gap-3 font-kanit ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                        <div className="p-2 rounded-xl" style={{ backgroundColor: `${positionColors[selectedPosition]}20` }}><Activity size={24} style={{ color: positionColors[selectedPosition] }} /></div>
                                        {selectedPosition} Stats
                                    </h2>
                                    <div className="flex items-center gap-3 mt-2 ml-1">
                                        <span className={`text-[10px] px-3 py-1 rounded-full font-kanit border flex items-center gap-2 ${isDarkMode ? 'bg-black/30 text-slate-400 border-white/5' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                                            TC Used: 
                                            <div className="flex gap-0.5">{[...Array(5)].map((_, i) => (<div key={i} className={`w-1.5 h-1.5 rounded-full ${i < tcCount ? 'bg-indigo-500' : (isDarkMode ? 'bg-slate-700' : 'bg-gray-300')}`} />))}</div>
                                            <span className="text-indigo-500">{tcCount}/5</span>
                                        </span>
                                    </div>
                                </div>
                                <button onClick={toggleSortOrder} className={`flex items-center gap-2 px-4 py-2 text-xs rounded-xl transition-colors border font-kanit ${isDarkMode ? 'bg-slate-800/50 hover:bg-slate-800 border-slate-700 text-slate-300' : 'bg-white hover:bg-gray-50 border-gray-200 text-gray-600 shadow-sm'}`}>
                                    <ArrowUpDown size={14} />{sortOrder === 'default' ? 'เรียงตามเกม' : 'เรียงตามความสำคัญ'}
                                </button>
                            </div>
                            
                            <InputForm players={displayedPlayers} inputs={inputs} tcState={tcState} tcCount={tcCount} onInputChange={handleInputChange} onTCToggle={handleTCToggle} onReset={handleReset} isDarkMode={isDarkMode} />
                        </div>
                    </div>

                    <div className="md:col-span-3 space-y-6">
                        <div className="sticky top-24 space-y-6">
                            <ResultDisplay calculatedValue={calculatedValue} position={selectedPosition} topFactors={topFactors} strategies={strategies} activeStrategyId={activeStrategyId} onSelectStrategy={setActiveStrategyId} onApplyStrategy={applyActiveStrategy} playerName={playerName} archetype={archetype} radarStats={radarStats} isDarkMode={isDarkMode} />
                            <SavedPlayersList savedPlayers={savedPlayers} onLoad={handleLoadPlayer} onDelete={handleDeletePlayer} onCompare={handleCompare} activePlayerId={activePlayerId} isDarkMode={isDarkMode} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
