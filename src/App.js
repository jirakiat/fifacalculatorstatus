import React, { useState, useEffect } from 'react';
import { 
    User, Activity, Shield, Target, Calculator, RefreshCw, ArrowUpDown, Zap, CheckCircle2, Flame, Crosshair, TrendingUp, Wind, Dna,
    Goal, MapPin, CircleDot, ArrowBigUp, Lightbulb, Move, ArrowRightLeft, Rocket, Eye, CornerUpRight, Scissors, Footprints, Lock, Battery, ChevronsDown, Hand, Send, Sparkles, Save, Trash2, FolderOpen, PenLine, AlertCircle, FilePlus, ChevronRight, Eraser, GitCompare, X, Download
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

// --- Custom Modal Component ---
const Modal = ({ isOpen, type, title, message, onConfirm, onCancel, content }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
            <div className={`bg-slate-900/90 border border-slate-700/50 rounded-2xl shadow-2xl ${content ? 'max-w-2xl' : 'max-w-sm'} w-full overflow-hidden transform scale-100 transition-all ring-1 ring-white/10`}>
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className={`p-3 rounded-full ${type === 'alert' ? 'bg-red-500/10 text-red-400 ring-1 ring-red-500/20' : type === 'compare' ? 'bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20' : 'bg-indigo-500/10 text-indigo-400 ring-1 ring-indigo-500/20'}`}>
                            {type === 'alert' ? <AlertCircle size={24} /> : type === 'compare' ? <GitCompare size={24} /> : <CheckCircle2 size={24} />}
                        </div>
                        <h3 className="text-lg font-bold text-white font-kanit">{title}</h3>
                        <button onClick={onCancel} className="ml-auto text-slate-400 hover:text-white"><X size={20} /></button>
                    </div>
                    {content ? content : (
                        <p className="text-slate-300 text-sm font-kanit leading-relaxed mb-6 font-light">
                            {message}
                        </p>
                    )}
                    {!content && (
                        <div className="flex gap-3 justify-end">
                            {type === 'confirm' && (
                                <button 
                                    onClick={onCancel}
                                    className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-sm font-kanit hover:bg-slate-700 transition-colors border border-slate-700"
                                >
                                    ยกเลิก
                                </button>
                            )}
                            <button 
                                onClick={onConfirm}
                                className={`px-4 py-2 rounded-lg text-white text-sm font-kanit font-medium shadow-lg transition-all active:scale-95 ${type === 'alert' ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20' : 'bg-indigo-500 hover:bg-indigo-600 shadow-indigo-500/20'}`}
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

// --- Sub-Components ---

const PositionSelector = ({ selectedPosition, onSelectPosition }) => {
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
                    <h3 className="text-xs font-medium text-slate-400 mb-2.5 uppercase tracking-wider pl-1 font-kanit flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-slate-500"></span>
                        {group.title}
                    </h3>
                    <div className="grid grid-cols-2 gap-2.5">
                        {group.positions.map((pos) => {
                            const isSelected = selectedPosition === pos;
                            return (
                                <button
                                    key={pos}
                                    onClick={() => onSelectPosition(pos)}
                                    className={`px-3 py-2.5 text-sm rounded-xl border transition-all duration-300 font-bold font-kanit relative overflow-hidden group ${isSelected ? 'text-white border-transparent shadow-lg shadow-black/20' : 'bg-slate-800/40 border-slate-700/50 text-slate-400 hover:bg-slate-800 hover:border-slate-600 hover:text-slate-200'}`}
                                    style={isSelected ? { background: `linear-gradient(135deg, ${positionColors[pos]} 0%, #1e293b 100%)` } : {}}
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

const InputForm = ({ players, inputs, tcState, onInputChange, onTCToggle, tcCount, onReset }) => {
    return (
        <div>
            <div className="flex justify-end mb-4">
                <button 
                    onClick={onReset}
                    className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 text-red-400 rounded-lg text-xs font-kanit hover:bg-red-500/20 border border-red-500/20 transition-all"
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
                        <div key={player.key} className={`relative p-3 rounded-xl border transition-all duration-300 flex flex-col justify-between gap-2.5 group ${isTCActive ? 'bg-indigo-500/10 border-indigo-500/40' : 'bg-slate-800/30 border-slate-700/40 hover:border-slate-600 hover:bg-slate-800/50'}`}>
                            <div className="flex justify-between items-start">
                                <label className={`text-sm font-medium font-kanit flex items-center gap-2.5 transition-colors ${isTCActive ? 'text-indigo-300' : 'text-slate-300 group-hover:text-slate-200'}`}>
                                    <div className={`p-1.5 rounded-lg transition-colors ${isTCActive ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-700/50 text-slate-500 group-hover:bg-slate-700 group-hover:text-slate-400'}`}>
                                        <StatIcon size={14} />
                                    </div>
                                    {player.key}
                                </label>
                                <span className={`text-[10px] font-kanit px-2 py-0.5 rounded-full border ${isTCActive ? 'bg-indigo-500/20 border-indigo-500/20 text-indigo-300' : 'bg-slate-900/50 border-slate-700 text-slate-500'}`}>
                                    {player.value}%
                                </span>
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                                <div className="relative flex-1">
                                    <input type="number" min="0" name={player.key} value={inputs[player.key] || ''} onChange={onInputChange} className={`w-full bg-slate-900/80 border text-white text-center rounded-lg py-1.5 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 outline-none font-mono text-sm transition-all shadow-inner ${isTCActive ? 'border-indigo-500/30 pr-8' : 'border-slate-700/80 group-hover:border-slate-600'}`} placeholder="0" />
                                    {isTCActive && (
                                        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-emerald-400 pointer-events-none drop-shadow-md">
                                            +2
                                        </div>
                                    )}
                                </div>
                                <button type="button" tabIndex={-1} onClick={() => canActivate && onTCToggle(player.key)} disabled={!canActivate} className={`relative w-12 h-[34px] rounded-lg flex items-center justify-center transition-all duration-300 outline-none focus:ring-0 ${isTCActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-105 border border-transparent' : canActivate ? 'bg-slate-700/50 text-slate-400 border border-slate-700 hover:bg-slate-700 hover:text-slate-200' : 'bg-slate-800/50 text-slate-700 cursor-not-allowed border border-transparent'}`}>
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

const ResultDisplay = ({ calculatedValue, position, topFactors, strategies, activeStrategyId, onSelectStrategy, onApplyStrategy, playerName }) => {
    const activeStrategy = strategies.find(s => s.id === activeStrategyId) || strategies[0];
    const bonusRating = calculateBonus(activeStrategy.candidates);
    
    // Feature 6: Dynamic Card Themes
    const getCardColor = (r) => {
        if (r >= 140) return 'from-fuchsia-600 via-purple-600 to-indigo-900 border-fuchsia-500/50 shadow-[0_0_30px_rgba(192,38,211,0.3)]'; // Icon
        if (r >= 130) return 'from-yellow-300 via-amber-500 to-amber-700 border-amber-400/50 shadow-[0_0_20px_rgba(245,158,11,0.3)]'; // Gold
        if (r >= 100) return 'from-slate-300 via-slate-400 to-slate-600 border-slate-300/50 shadow-[0_0_15px_rgba(203,213,225,0.2)]'; // Silver
        return 'from-orange-800 to-red-900 border-orange-600/50'; // Basic
    };

    // Feature 3: Detailed Decimal Rating
    const decimalPart = calculatedValue % 1;
    const progressPercent = decimalPart * 100;

    return (
        <div className="space-y-6">
            <div className="flex flex-col items-center justify-center p-6 bg-slate-800/30 rounded-3xl border border-white/5 backdrop-blur-md relative overflow-hidden group">
                <div className={`relative w-48 h-64 bg-gradient-to-br ${getCardColor(calculatedValue)} rounded-t-2xl rounded-b-[3rem] border-2 shadow-2xl flex flex-col items-center pt-6 text-white overflow-hidden transform transition-all duration-500 group-hover:scale-105`}>
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-10 group-hover:animate-shine" />
                    
                    {/* Sparkle effect for high rating */}
                    {calculatedValue >= 140 && (
                        <div className="absolute inset-0 z-0">
                            <Sparkles className="absolute top-2 right-2 text-white/50 animate-pulse" size={16} />
                            <Sparkles className="absolute bottom-10 left-2 text-white/30 animate-pulse delay-75" size={12} />
                        </div>
                    )}

                    <div className="absolute top-5 left-5 flex flex-col items-center z-10">
                        <span className={`text-5xl font-black drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] leading-none tracking-tighter ${calculatedValue >= 130 ? 'text-white' : 'text-white'}`}>{Math.floor(calculatedValue)}</span>
                        <span className="text-sm font-bold uppercase tracking-widest mt-1 opacity-90 font-kanit text-shadow">{position || 'POS'}</span>
                    </div>
                    <div className="mt-4 w-24 h-24 bg-black/40 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10 z-10 shadow-inner"><User size={48} className="text-white/80" /></div>
                    <div className="mt-auto mb-6 w-full text-center border-t border-white/10 pt-2 z-10"><span className="text-lg font-black uppercase tracking-[0.2em] drop-shadow-md font-kanit text-white/80 truncate px-2">{playerName || 'PLAYER'}</span></div>
                </div>
                
                <div className="mt-6 text-center z-10 w-full px-6">
                    <h3 className="text-3xl font-bold text-white mb-1 tracking-tight">{calculatedValue.toFixed(2)}</h3>
                    
                    {/* Decimal Progress Bar */}
                    <div className="w-full h-1.5 bg-slate-700 rounded-full mt-2 mb-1 overflow-hidden">
                        <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500 font-kanit">
                        <span>{Math.floor(calculatedValue)}</span>
                        <span className="text-emerald-400">{progressPercent.toFixed(0)}% to next</span>
                        <span>{Math.floor(calculatedValue) + 1}</span>
                    </div>
                </div>
            </div>

            <div className="bg-slate-800/30 border border-white/5 rounded-2xl p-5 backdrop-blur-md">
                <div className="flex items-center gap-2.5 mb-4"><div className="p-1.5 bg-indigo-500/20 rounded-lg text-indigo-400"><Flame size={18} /></div><h3 className="text-sm font-bold text-slate-200 font-kanit">แนะนำสูตรอัพพลัง TC</h3></div>
                <div className="flex flex-wrap gap-2 mb-4">
                    {strategies.map(s => {
                        const Icon = s.icon;
                        const isActive = s.id === activeStrategyId;
                        return (
                            <button key={s.id} onClick={() => onSelectStrategy(s.id)} className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[10px] font-kanit transition-all border ${isActive ? 'bg-indigo-600 text-white border-indigo-500 font-medium shadow-lg shadow-indigo-500/20' : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700 hover:text-slate-200'}`}>
                                <Icon size={12} /> {s.name}
                            </button>
                        );
                    })}
                </div>
                <div className="bg-slate-900/50 rounded-xl p-4 border border-white/5 relative overflow-hidden">
                    <div className="flex justify-between items-start mb-3 relative z-10">
                        <div><h4 className="text-indigo-400 text-sm font-bold font-kanit flex items-center gap-2">{activeStrategy.name}<span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full font-mono border border-emerald-500/20">+{bonusRating.toFixed(2)} OVR</span></h4><p className="text-[10px] text-slate-500 mt-1 font-kanit leading-relaxed font-light">{activeStrategy.description}</p></div>
                    </div>
                    <div className="space-y-2 mb-4 relative z-10">
                        {activeStrategy.candidates.map((p, i) => (
                            <div key={i} className="flex justify-between items-center text-[10px] p-1.5 rounded bg-white/5 border border-white/5"><span className="text-slate-300 font-kanit flex items-center gap-2"><span className="w-4 h-4 flex items-center justify-center bg-slate-700 rounded-full text-[9px] font-bold text-slate-400">{i+1}</span>{p.key}</span><span className="text-slate-500 font-kanit">สำคัญ {p.value}%</span></div>
                        ))}
                    </div>
                    <button onClick={onApplyStrategy} className="w-full text-xs bg-indigo-600 text-white px-4 py-2.5 rounded-lg shadow-lg hover:shadow-indigo-500/20 hover:bg-indigo-500 transition-all flex items-center justify-center gap-2 font-kanit font-medium relative z-10"><CheckCircle2 size={14} /> ใช้สูตรนี้เลย</button>
                </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/30 border border-white/5 backdrop-blur-md">
                <h3 className="text-sm font-bold text-slate-200 mb-4 flex items-center gap-2.5 font-kanit"><div className="p-1.5 bg-emerald-500/20 rounded-lg text-emerald-400"><Shield size={18} /></div>5 อันดับความสำคัญสูงสุด</h3>
                <div className="space-y-2">
                    {topFactors.map((p, i) => (
                        <div key={i} className="flex justify-between items-center text-xs p-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-transparent hover:border-white/5"><div className="flex items-center gap-3"><span className={`w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold ${i === 0 ? 'bg-amber-500 text-black' : 'bg-slate-700 text-slate-400'}`}>{i+1}</span><span className="text-slate-300 font-kanit">{p.key}</span></div><span className="font-mono font-bold text-indigo-400">{p.value}%</span></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const SavedPlayersList = ({ savedPlayers, onLoad, onDelete, onCompare, activePlayerId }) => {
    if (savedPlayers.length === 0) return null;

    return (
        <div className="p-5 rounded-2xl bg-slate-800/30 border border-white/5 backdrop-blur-md">
            <h3 className="text-sm font-bold text-slate-200 mb-4 flex items-center gap-2.5 font-kanit"><div className="p-1.5 bg-amber-500/20 rounded-lg text-amber-400"><FolderOpen size={18} /></div>นักเตะที่บันทึกไว้ ({savedPlayers.length})</h3>
            <div className="space-y-2.5 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
                {savedPlayers.map((player) => (
                    <div key={player.id} className={`flex items-center justify-between p-3 rounded-xl border transition-all group ${activePlayerId === player.id ? 'bg-indigo-500/10 border-indigo-500/40 shadow-inner' : 'bg-white/5 hover:bg-white/10 border-white/5'}`}>
                        <div className="flex items-center gap-3.5 cursor-pointer flex-1" onClick={() => onLoad(player)}>
                            <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-black shadow-lg ring-2 ring-white/10" style={{ background: `linear-gradient(135deg, ${positionColors[player.position]} 0%, #cbd5e1 100%)` }}>{player.position}</div>
                            <div>
                                <h4 className={`text-sm font-bold font-kanit transition-colors flex items-center gap-2 ${activePlayerId === player.id ? 'text-indigo-300' : 'text-slate-200 group-hover:text-white'}`}>
                                    {player.name}
                                    {activePlayerId === player.id && <span className="text-[9px] bg-indigo-500 text-white px-1.5 py-0.5 rounded flex items-center gap-1 font-bold shadow-sm">แก้ไขอยู่</span>}
                                </h4>
                                <div className="flex items-center gap-2 mt-1"><span className="text-[10px] text-slate-400 font-mono bg-black/40 px-1.5 py-0.5 rounded border border-white/5">OVR {Math.floor(player.rating)}</span><span className="text-[10px] text-slate-600 font-light">{new Date(player.lastModified || player.id).toLocaleDateString()}</span></div>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                             <button onClick={() => onCompare(player)} className="p-2 text-slate-600 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors" title="เปรียบเทียบ"><GitCompare size={16} /></button>
                             <button onClick={() => onDelete(player.id)} className="p-2 text-slate-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors" title="ลบ"><Trash2 size={16} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const CompareModalContent = ({ current, target, dataset }) => {
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
             <div className="flex justify-between items-center bg-slate-800/50 p-4 rounded-xl mb-4 border border-white/5">
                <div className="text-center w-1/3">
                    <div className="text-xs text-slate-400 mb-1">ปัจจุบัน</div>
                    <div className="text-indigo-400 font-bold text-lg">{current.name || "Draft"}</div>
                    <div className="text-2xl font-black text-white">{current.rating.toFixed(2)}</div>
                </div>
                <div className="text-center w-1/3 flex flex-col items-center">
                    <div className="text-xs text-slate-500 mb-1">ส่วนต่าง</div>
                     <div className={`text-xl font-bold ${diff > 0 ? 'text-green-400' : diff < 0 ? 'text-red-400' : 'text-slate-400'}`}>
                        {diff > 0 ? '+' : ''}{diff.toFixed(2)}
                     </div>
                     <GitCompare size={16} className="text-slate-600 mt-1"/>
                </div>
                <div className="text-center w-1/3">
                    <div className="text-xs text-slate-400 mb-1">เปรียบเทียบกับ</div>
                    <div className="text-blue-400 font-bold text-lg">{target.name}</div>
                    <div className="text-2xl font-black text-white">{target.rating.toFixed(2)}</div>
                </div>
            </div>

            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                <h4 className="text-xs text-slate-400 uppercase tracking-wider mb-2">ค่าพลังที่มีผลมากที่สุด</h4>
                {positionFactors.map((factor) => {
                    const currentVal = calculateStat(current.inputs, current.tcState, factor.key);
                    const targetVal = calculateStat(target.inputs, target.tcState, factor.key);
                    const statDiff = targetVal - currentVal;

                    return (
                        <div key={factor.key} className="flex items-center text-xs p-2 rounded bg-white/5">
                            <div className="w-24 text-slate-300 truncate">{factor.key}</div>
                            <div className="flex-1 flex items-center gap-2">
                                <div className="text-right w-8 text-indigo-300 font-mono">{currentVal}</div>
                                <div className="flex-1 h-1.5 bg-slate-700 rounded-full relative overflow-hidden">
                                     <div className="absolute top-0 bottom-0 left-0 bg-indigo-500" style={{width: `${Math.min(100, (currentVal/150)*100)}%`}}></div>
                                     <div className="absolute top-0 bottom-0 left-0 bg-blue-500 mix-blend-screen opacity-50" style={{width: `${Math.min(100, (targetVal/150)*100)}%`}}></div>
                                </div>
                                <div className="w-8 text-blue-300 font-mono">{targetVal}</div>
                                <div className={`w-8 text-right font-bold ${statDiff > 0 ? 'text-green-400' : statDiff < 0 ? 'text-red-400' : 'text-slate-600'}`}>
                                    {statDiff > 0 ? '+' : ''}{statDiff !== 0 ? statDiff : '-'}
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

    useEffect(() => {
        const saved = localStorage.getItem('fifa_saved_players');
        if (saved) { try { setSavedPlayers(JSON.parse(saved)); } catch (e) { console.error(e); } }
    }, []);

    const handlePositionChange = (pos) => {
        if (pos === selectedPosition) return;
        setSelectedPosition(pos);
        setInputs({});
        setTcState({});
        setCalculatedValue(0);
        setSortOrder('default');
        setActiveStrategyId('max_rating');
        setPlayerName('');
        setActivePlayerId(null);
    };

    // Feature 1: Reset Button Logic
    const handleReset = () => {
        showModal({
            type: 'confirm', title: 'ยืนยันการล้างค่า', message: 'คุณต้องการล้างค่าพลังทั้งหมดเป็น 0 ใช่หรือไม่? (ชื่อและตำแหน่งจะไม่ถูกลบ)',
            onConfirm: () => {
                setInputs({});
                setTcState({});
                closeModal();
            },
            onCancel: closeModal
        });
    };

    const handleInputChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: Math.max(0, Number(e.target.value)) });
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
            setCalculatedValue(total / 100);
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
            showModal({ type: 'alert', title: 'สำเร็จ', message: 'บันทึกทับข้อมูลเดิมเรียบร้อยแล้ว', onConfirm: closeModal });
        } else {
            const newId = Date.now();
            const updatedList = [{ id: newId, ...playerData }, ...savedPlayers];
            setSavedPlayers(updatedList);
            localStorage.setItem('fifa_saved_players', JSON.stringify(updatedList));
            setActivePlayerId(newId);
            showModal({ type: 'alert', title: 'สำเร็จ', message: 'บันทึกนักเตะใหม่เรียบร้อยแล้ว', onConfirm: closeModal });
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
        showModal({ type: 'alert', title: 'สำเร็จ', message: 'บันทึกเป็นไฟล์ใหม่เรียบร้อยแล้ว', onConfirm: closeModal });
    };

    const handleLoadPlayer = (player) => {
        const load = () => {
            setSelectedPosition(player.position);
            setInputs(player.inputs);
            setTcState(player.tcState);
            setPlayerName(player.name);
            setActivePlayerId(player.id);
            closeModal();
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
            },
            onCancel: closeModal
        });
    };

    // Feature 4: Compare Mode Logic
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
            content: <CompareModalContent current={currentPlayer} target={targetPlayer} dataset={dataset} />,
            onCancel: closeModal,
            onConfirm: closeModal // Just to have a close button
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
        if (active) { const newTcState = {}; active.candidates.forEach(p => { newTcState[p.key] = true; }); setTcState(newTcState); }
    };
    const tcCount = Object.values(tcState).filter(Boolean).length;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500 selection:text-white">
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700;800&display=swap'); body, .font-kanit { font-family: 'Kanit', sans-serif; } @keyframes shine { 0% { left: -100%; opacity: 0; } 50% { opacity: 0.5; } 100% { left: 200%; opacity: 0; } } .animate-shine { animation: shine 2s infinite linear; } .custom-scrollbar::-webkit-scrollbar { width: 6px; } .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 4px; } .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 4px; } .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.25); }`}</style>
            
            <Modal isOpen={modalConfig.isOpen} type={modalConfig.type} title={modalConfig.title} message={modalConfig.message} onConfirm={modalConfig.onConfirm} onCancel={modalConfig.onCancel} content={modalConfig.content} />

            <header className="sticky top-0 z-20 backdrop-blur-xl bg-slate-900/80 border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4"><div className="bg-indigo-600 p-2.5 rounded-xl shadow-lg shadow-indigo-600/20"><Calculator size={24} className="text-white" /></div><div><h1 className="text-xl font-bold tracking-tight text-white font-kanit">ระบบคำนวนอัพสเตตัสนักเตะ</h1><p className="text-xs text-slate-400 font-kanit">Dev by Jiw Jirakiat</p></div></div>
                    <button onClick={() => window.location.reload()} className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-full transition-colors text-slate-400 hover:text-white border border-slate-700"><RefreshCw size={20} /></button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
                <div className="grid md:grid-cols-12 gap-8">
                    <div className="md:col-span-3">
                        <div className="bg-slate-800/30 p-5 rounded-3xl border border-white/5 backdrop-blur-md sticky top-24 shadow-xl">
                            <h2 className="text-sm font-bold text-slate-200 mb-5 flex items-center gap-2.5 font-kanit"><div className="p-1.5 bg-emerald-500/20 rounded-lg text-emerald-400"><Target size={18} /></div>เลือกตำแหน่ง</h2>
                            <PositionSelector selectedPosition={selectedPosition} onSelectPosition={handlePositionChange} />
                        </div>
                    </div>

                    <div className="md:col-span-6">
                        <div className="bg-slate-800/30 p-6 rounded-3xl border border-white/5 backdrop-blur-md shadow-xl min-h-[600px]">
                            <div className="mb-6 p-4 rounded-2xl bg-slate-900/50 border border-white/5 flex items-center gap-3">
                                <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400"><PenLine size={20} /></div>
                                <div className="flex-1 relative"><input type="text" value={playerName} onChange={(e) => setPlayerName(e.target.value)} placeholder="ใส่ชื่อนักเตะเพื่อบันทึก..." className="w-full bg-transparent border-none text-white placeholder-slate-500 focus:ring-0 font-kanit text-sm" /></div>
                                {activePlayerId && (
                                    <button onClick={handleSaveAsNew} className="p-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors shadow-lg" title="บันทึกเป็นใหม่"><FilePlus size={18} /></button>
                                )}
                                <button onClick={handleSavePlayer} className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors shadow-lg shadow-indigo-600/20" title={activePlayerId ? "บันทึกทับ" : "บันทึก"}>{activePlayerId ? <Save size={18} /> : <Save size={18} />}</button>
                            </div>

                            <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
                                <div>
                                    <h2 className="text-2xl font-bold text-white flex items-center gap-3 font-kanit"><div className="p-2 rounded-xl" style={{ backgroundColor: `${positionColors[selectedPosition]}20` }}><Activity size={24} style={{ color: positionColors[selectedPosition] }} /></div>{selectedPosition} Stats</h2>
                                    <div className="flex items-center gap-3 mt-2 ml-1"><span className="text-[10px] bg-black/30 px-3 py-1 rounded-full text-slate-400 font-kanit border border-white/5 flex items-center gap-2">TC Used: <div className="flex gap-0.5">{[...Array(5)].map((_, i) => (<div key={i} className={`w-1.5 h-1.5 rounded-full ${i < tcCount ? 'bg-indigo-500' : 'bg-slate-700'}`} />))}</div><span className="text-indigo-400">{tcCount}/5</span></span></div>
                                </div>
                                <button onClick={toggleSortOrder} className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-800 text-xs rounded-xl transition-colors border border-slate-700 text-slate-300 font-kanit"><ArrowUpDown size={14} />{sortOrder === 'default' ? 'เรียงตามเกม' : 'เรียงตามความสำคัญ'}</button>
                            </div>
                            
                            <InputForm players={displayedPlayers} inputs={inputs} tcState={tcState} tcCount={tcCount} onInputChange={handleInputChange} onTCToggle={handleTCToggle} onReset={handleReset} />
                        </div>
                    </div>

                    <div className="md:col-span-3 space-y-6">
                        <div className="sticky top-24 space-y-6">
                            <ResultDisplay calculatedValue={calculatedValue} position={selectedPosition} topFactors={topFactors} strategies={strategies} activeStrategyId={activeStrategyId} onSelectStrategy={setActiveStrategyId} onApplyStrategy={applyActiveStrategy} playerName={playerName} />
                            <SavedPlayersList savedPlayers={savedPlayers} onLoad={handleLoadPlayer} onDelete={handleDeletePlayer} onCompare={handleCompare} activePlayerId={activePlayerId} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
