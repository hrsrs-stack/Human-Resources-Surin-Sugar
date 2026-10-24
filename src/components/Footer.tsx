import React from 'react';
import { COMPANY_INFO } from '../data/mockData';
import { Mail, Phone, Printer, Shield, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenHrModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenHrModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8 pb-8 border-b border-slate-800">
          {/* Col 1: Brand & Slogan */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <img
                src="/assets/aistudio/LINE_ALBUM________________________250624_4_0_69fca4ca.jpg"
                alt="โลโก้ บริษัท น้ำตาลสุรินทร์ จำกัด"
                className="h-11 w-auto object-contain rounded bg-white p-1 border border-slate-700 shadow-sm"
              />
              <div>
                <span className="font-display font-bold text-base text-white block">
                  {COMPANY_INFO.nameTh}
                </span>
                <span className="text-[11px] text-red-400 font-semibold tracking-wider">
                  KORACH INDUSTRY SUGAR GROUP
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              {COMPANY_INFO.groupName}
              <br />
              การตรวจสุขภาพประจำปี 2569: วันเสาร์ที่ 7 พฤศจิกายน 2569 เวลา 06.00 – 16.00 น.
              <br />
              สถานที่: {COMPANY_INFO.location}
            </p>
            <p className="text-emerald-400 text-xs italic">
              “สุขภาพดีเริ่มต้นที่ตัวเรา อย่าลืมมารับการตรวจตามวันและเวลาดังกล่าวกันนะคะ”
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-white block mb-2">
              หัวข้อสำคัญ
            </span>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a href="#overview" className="hover:text-emerald-400 transition-colors">
                  กำหนดการ & วันเวลาตรวจ
                </a>
              </li>
              <li>
                <a href="#prep-checker" className="hover:text-emerald-400 transition-colors">
                  ข้อปฏิบัติตามอายุ (งดอาหาร 35+)
                </a>
              </li>
              <li>
                <a href="#checklist" className="hover:text-emerald-400 transition-colors">
                  เช็กลิสต์ความพร้อม & บัตรประชาชน
                </a>
              </li>
              <li>
                <a href="#stations" className="hover:text-emerald-400 transition-colors">
                  ผังจุดบริการ 8 สถานี
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-emerald-400 transition-colors">
                  คำถามที่พบบ่อย (FAQ)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: HR & Quick Assistance */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-white block">
              ประสานงานฝ่ายบริหารทรัพยากรมนุษย์
            </span>
            <p className="text-slate-400 text-xs">
              มีข้อสงสัยหรือติดภารกิจในวันตรวจ กรุณาแจ้งล่วงหน้าที่:
            </p>
            <div className="space-y-1.5 text-slate-300">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white transition-colors">
                  {COMPANY_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <a href="tel:044069999,225" className="hover:text-white transition-colors">
                  {COMPANY_INFO.telephone}
                </a>
              </div>
            </div>

            <div className="pt-1 flex items-center gap-3">
              <button
                type="button"
                onClick={onOpenHrModal}
                className="px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-medium transition-colors text-xs"
              >
                ส่งข้อความถึง HR
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center gap-1.5 text-xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>พิมพ์หน้านี้</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-slate-400" />
            <span>
              ข้อมูลสุขภาพส่วนบุคคลได้รับการคุ้มครองตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล (PDPA)
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span>© 2569 บริษัท น้ำตาลสุรินทร์ จำกัด (KI Sugar Group) สงวนลิขสิทธิ์</span>
            <button
              onClick={scrollToTop}
              className="text-slate-400 hover:text-white transition-colors flex items-center gap-1"
            >
              <span>กลับสู่ด้านบน</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
