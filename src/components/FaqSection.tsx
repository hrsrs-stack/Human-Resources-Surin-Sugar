import React, { useState } from 'react';
import { FAQ_LIST } from '../data/mockData';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string>('faq-1');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredFaqs = FAQ_LIST.filter(
    (item) => filterCategory === 'all' || item.category === filterCategory
  );

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? '' : id));
  };

  return (
    <section id="faq" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
            <span>คำถามและข้อสงสัย</span>
            <span aria-hidden="true">·</span>
            <span>คู่มือการปฏิบัติตัว</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-3 text-balance">
            คำถามที่พบบ่อยเกี่ยวกับการตรวจสุขภาพ (FAQ)
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            รวบรวมคำถามที่พนักงานสอบถามบ่อย เพื่อความเข้าใจที่ถูกต้องก่อนเข้ารับการตรวจ
          </p>
        </div>

        {/* Filter Controls (Buttons allowed per Constitution Section 1A) */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-slate-100 rounded-xl max-w-xl mx-auto mb-8">
          <button
            type="button"
            onClick={() => setFilterCategory('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              filterCategory === 'all'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ทั้งหมด ({FAQ_LIST.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterCategory('fasting')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              filterCategory === 'fasting'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            การงดน้ำ-อาหาร
          </button>
          <button
            type="button"
            onClick={() => setFilterCategory('documents')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              filterCategory === 'documents'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            บัตรประชาชน
          </button>
          <button
            type="button"
            onClick={() => setFilterCategory('health')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              filterCategory === 'health'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ยาประจำตัว & สุภาพสตรี
          </button>
          <button
            type="button"
            onClick={() => setFilterCategory('results')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              filterCategory === 'results'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            การรับผลตรวจ
          </button>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-xl border border-slate-200 overflow-hidden bg-white shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
                >
                  <span className="font-display text-sm sm:text-base font-semibold text-slate-900 text-balance">
                    {faq.question}
                  </span>
                  <div className="text-slate-400 shrink-0">
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-emerald-800" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
