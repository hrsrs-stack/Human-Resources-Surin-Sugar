import React, { useState } from 'react';
import { DEPARTMENT_SCHEDULES } from '../data/mockData';
import { Clock, Users, Coffee, CalendarCheck, Check } from 'lucide-react';

export const ScheduleSlots: React.FC = () => {
  const [selectedDeptFilter, setSelectedDeptFilter] = useState<string>('all');

  return (
    <section id="schedule" className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
            <span>ตารางเวลาและแผนก</span>
            <span aria-hidden="true">·</span>
            <span>ลดความแออัดหน้าจุดบริการ</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-3 text-balance">
            ช่วงเวลาแนะนำตามสายงาน (06.00 – 16.00 น.)
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            ขอความร่วมมือแต่ละฝ่ายจัดสรรพนักงานหมุนเวียนเข้ารับการตรวจตามรอบ เพื่อให้กระบวนการผลิตดำเนินไปอย่างราบรื่น
          </p>
        </div>

        {/* Schedule Grid */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {DEPARTMENT_SCHEDULES.map((slot, index) => {
            const isMorningFastingSlot = index === 0;

            return (
              <div
                key={index}
                className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                  isMorningFastingSlot
                    ? 'bg-amber-50/40 border-amber-300 shadow-xs'
                    : 'bg-white border-slate-200 shadow-xs'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isMorningFastingSlot
                          ? 'bg-amber-600 text-white'
                          : 'bg-emerald-800 text-white'
                      }`}
                    >
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-base sm:text-lg font-bold text-slate-900 tabular-nums">
                          {slot.timeSlot}
                        </span>
                        {isMorningFastingSlot && (
                          <span className="text-[11px] font-semibold text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
                            กลุ่มงดอาหารแนะนำรอบนี้
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm font-semibold text-slate-700">
                        {slot.label}
                      </h3>
                    </div>
                  </div>

                  <span className="text-xs text-slate-500 font-medium">
                    {slot.recommendedGroup}
                  </span>
                </div>

                {/* Departments in this slot */}
                <div className="bg-slate-50/70 rounded-xl p-3 border border-slate-100 mb-3">
                  <span className="text-xs font-semibold text-slate-600 block mb-1.5">
                    แผนกที่แนะนำ:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {slot.departments.map((dept, dIdx) => (
                      <span
                        key={dIdx}
                        className="text-xs bg-white border border-slate-200 text-slate-800 px-2.5 py-1 rounded-md"
                      >
                        {dept}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                  <span>หมายเหตุ: {slot.note}</span>
                  {isMorningFastingSlot && (
                    <span className="text-amber-800 font-medium flex items-center gap-1">
                      <Coffee className="w-3.5 h-3.5" />
                      <span>มีซุ้มอาหารว่างเช้าบริการ</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Operational Facility Image & Note */}
        <div className="mt-10 max-w-4xl mx-auto rounded-2xl overflow-hidden border border-slate-200 bg-white p-6 shadow-xs flex flex-col md:flex-row items-center gap-6">
          <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden shrink-0 bg-slate-100 border border-slate-200">
            <img
              src="/src/assets/images/surin_sugar_facility_1792805578342.jpg"
              alt="โรงงานน้ำตาลสุรินทร์"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 text-xs sm:text-sm text-slate-600 space-y-1.5">
            <h4 className="font-display text-base font-bold text-slate-900">
              การบริหารงานช่วงเวลาตรวจสุขภาพ
            </h4>
            <p>
              หัวหน้างานแต่ละแผนกสามารถจัดตารางหมุนเวียนพนักงานเพื่อให้ทุกคนได้ตรวจสุขภาพครบ 100% โดยไม่กระทบต่อสายการผลิตและการรับอ้อยเข้าสู่โรงงาน
            </p>
            <p className="text-emerald-800 font-medium">
              หากมีข้อสงสัยหรือต้องการปรับรอบเวลา ติดต่อฝ่ายบริหารทรัพยากรมนุษย์ (HR) โทร 044-069-999 ต่อ 225 หรืออีเมล hr.srs@kisugargroup.com
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
