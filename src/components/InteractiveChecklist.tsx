import React, { useState, useEffect } from 'react';
import { PREP_CHECKLIST_ITEMS } from '../data/mockData';
import { CheckSquare, Square, RotateCcw, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const InteractiveChecklist: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('srs_checkup_prep_list');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {};
  });

  useEffect(() => {
    try {
      localStorage.setItem('srs_checkup_prep_list', JSON.stringify(checkedItems));
    } catch {
      // ignore
    }
  }, [checkedItems]);

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleReset = () => {
    setCheckedItems({});
  };

  const completedCount = PREP_CHECKLIST_ITEMS.filter((item) => checkedItems[item.id]).length;
  const progressPercent = Math.round((completedCount / PREP_CHECKLIST_ITEMS.length) * 100);

  return (
    <section id="checklist" className="py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
            <span>เตรียมความพร้อมก่อนวันตรวจ</span>
            <span aria-hidden="true">·</span>
            <span>บันทึกความพร้อมส่วนบุคคล</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-3 text-balance">
            เช็กลิสต์ 6 ข้อสำคัญก่อนเข้ารับการตรวจสุขภาพ
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            ติ๊กเลือกรายการที่คุณเตรียมพร้อมแล้ว เพื่อให้การตรวจในวันเสาร์ที่ 7 พฤศจิกายน 2569 เป็นไปอย่างราบรื่นและรวดเร็ว
          </p>
        </div>

        {/* Checklist Container */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          {/* Progress Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-800" />
                <span className="text-sm font-bold text-slate-900">
                  ความพร้อมของคุณ: {completedCount} จาก {PREP_CHECKLIST_ITEMS.length} รายการ
                </span>
              </div>
              <span className="text-xs text-slate-500 mt-0.5 block">
                {progressPercent === 100
                  ? 'ยอดเยี่ยม! คุณเตรียมตัวครบทุกข้อพร้อมรับการตรวจแล้วค่ะ'
                  : 'กรุณาตรวจสอบให้ครบทุกข้อก่อนเดินทางมาตรวจ'}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-32 bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-emerald-700 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="font-mono text-xs font-bold text-emerald-900 tabular-nums">
                {progressPercent}%
              </span>
              <button
                type="button"
                onClick={handleReset}
                title="รีเซ็ตเช็กลิสต์"
                className="text-slate-400 hover:text-slate-600 transition-colors p-1"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* List Items */}
          <div className="divide-y divide-slate-100 mt-2">
            {PREP_CHECKLIST_ITEMS.map((item) => {
              const isChecked = !!checkedItems[item.id];
              const isCritical = item.id === 'prep-id' || item.id === 'prep-fasting-35';

              return (
                <div
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`py-4 flex items-start gap-3.5 cursor-pointer transition-colors rounded-xl px-2.5 -mx-2.5 ${
                    isChecked
                      ? 'bg-emerald-50/40'
                      : isCritical
                      ? 'hover:bg-amber-50/30'
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="mt-0.5 shrink-0 text-emerald-800">
                    {isChecked ? (
                      <CheckSquare className="w-5 h-5 fill-emerald-800 text-white" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span
                        className={`text-sm font-semibold ${
                          isChecked
                            ? 'text-slate-900 line-through opacity-70'
                            : isCritical
                            ? 'text-slate-950 font-bold'
                            : 'text-slate-900'
                        }`}
                      >
                        {item.title}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>ข้อมูลจะถูกบันทึกในเบราว์เซอร์ของคุณโดยอัตโนมัติ</span>
            <span className="text-emerald-800 font-medium">บริษัท น้ำตาลสุรินทร์ จำกัด</span>
          </div>
        </div>
      </div>
    </section>
  );
};
