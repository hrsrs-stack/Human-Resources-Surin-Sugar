import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/mockData';
import { Mail, Phone, Building2, Send, CheckCircle2, X } from 'lucide-react';

interface ContactHrModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactHrModal: React.FC<ContactHrModalProps> = ({ isOpen, onClose }) => {
  const [empName, setEmpName] = useState('');
  const [empDept, setEmpDept] = useState('');
  const [question, setQuestion] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      // Keep feedback for 2.5s then allow close
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-xl border border-slate-200 relative animate-in fade-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <img
            src="/assets/aistudio/LINE_ALBUM________________________250624_4_0_69fca4ca.jpg"
            alt="โลโก้ บริษัท น้ำตาลสุรินทร์ จำกัด"
            className="h-10 w-auto object-contain rounded bg-white p-0.5 border border-slate-200 shrink-0"
          />
          <div>
            <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 leading-tight">
              ติดต่อฝ่ายบริหารทรัพยากรมนุษย์ (HR)
            </h3>
            <span className="text-xs text-slate-500">
              {COMPANY_INFO.nameTh} · {COMPANY_INFO.department}
            </span>
          </div>
        </div>

        {/* HR Contact Card */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2 mb-5 text-xs text-slate-700">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-emerald-800 shrink-0" />
            <span>
              อีเมล: <a href={`mailto:${COMPANY_INFO.email}`} className="text-emerald-800 font-semibold hover:underline">{COMPANY_INFO.email}</a>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-800 shrink-0" />
            <span>
              โทรศัพท์ภายใน: <a href="tel:044069999,225" className="text-emerald-800 font-semibold hover:underline">{COMPANY_INFO.telephone}</a>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-emerald-800 shrink-0" />
            <span>สำนักงานฝ่ายบริหารทรัพยากรมนุษย์ ชั้น 2 อาคารสำนักงานใหญ่</span>
          </div>
        </div>

        {submitted ? (
          <div className="text-center py-6 space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-display text-base font-bold text-slate-900">
              ส่งข้อความถึงฝ่ายบุคคลเรียบร้อยแล้วค่ะ
            </h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              เจ้าหน้าที่ฝ่ายบริหารทรัพยากรมนุษย์จะติดต่อกลับหรือประสานงานหัวหน้างานของคุณโดยเร็วที่สุดค่ะ
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-800 rounded-lg hover:bg-emerald-900 transition-colors"
            >
              ปิดหน้าต่าง
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  ชื่อ-สกุล / รหัสพนักงาน
                </label>
                <input
                  type="text"
                  required
                  placeholder="เช่น วิภาดา (SRS-102)"
                  value={empName}
                  onChange={(e) => setEmpName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  ฝ่าย / แผนก
                </label>
                <input
                  type="text"
                  required
                  placeholder="เช่น ฝ่ายผลิต กะ 2"
                  value={empDept}
                  onChange={(e) => setEmpDept(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                ข้อสงสัยหรือคำถามที่ต้องการสอบถาม
              </label>
              <textarea
                required
                rows={3}
                placeholder="เช่น ต้องการสอบถามเรื่องการสลับกะการทำงานในวันตรวจ หรือต้องการสอบถามเรื่องยาประจำตัว..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>ส่งข้อความสอบถาม</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
