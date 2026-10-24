import React from 'react';
import { COMPANY_INFO } from '../data/mockData';
import { Calendar, FileCheck2 } from 'lucide-react';

interface HeaderProps {
  onOpenCheckupTool: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCheckupTool }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Single text element wordmark with official logo */}
        <a href="#" className="flex items-center gap-3 text-slate-900 group whitespace-nowrap shrink-0">
          <img
            src="/assets/aistudio/LINE_ALBUM________________________250624_4_0_69fca4ca.jpg"
            alt="โลโก้ บริษัท น้ำตาลสุรินทร์ จำกัด (KI Sugar Group)"
            className="h-10 sm:h-11 w-auto object-contain rounded bg-white p-0.5 border border-slate-200/60 shadow-2xs group-hover:opacity-95 transition-opacity"
          />
          <div className="flex flex-col">
            <span className="font-display font-bold text-base sm:text-lg tracking-tight text-slate-900 leading-tight">
              {COMPANY_INFO.nameTh}
            </span>
            <span className="text-[11px] text-red-600 font-semibold tracking-wide hidden sm:inline">
              KORACH INDUSTRY SUGAR GROUP (KI)
            </span>
          </div>
        </a>

        {/* Zone 2: clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          <a href="#overview" className="hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0">
            กำหนดการตรวจ
          </a>
          <a href="#roster" className="text-emerald-900 font-semibold hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0">
            รายชื่อ & รายการตรวจ (1,068 คน)
          </a>
          <a href="#prep-checker" className="hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0">
            ข้อปฏิบัติตามอายุ
          </a>
          <a href="#stations" className="hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0">
            8 จุดตรวจสุขภาพ
          </a>
          <a href="#faq" className="hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0">
            คำถามพบบ่อย
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCheckupTool}
            className="flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-medium text-white bg-emerald-800 rounded-lg hover:bg-emerald-900 shadow-sm transition-all whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
          >
            <FileCheck2 className="w-4 h-4" />
            <span>ประเมินการเตรียมตัวรายบุคคล</span>
          </button>
        </div>
      </div>
    </header>
  );
};
