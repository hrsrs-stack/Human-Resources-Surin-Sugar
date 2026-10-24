import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/mockData';
import {
  AlertTriangle,
  CheckCircle2,
  UtensilsCrossed,
  Coffee,
  CreditCard,
  Printer,
  QrCode,
  User,
  HeartPulse,
  Info,
  Building,
  Check
} from 'lucide-react';

export const PersonalPrepChecker: React.FC = () => {
  const [age, setAge] = useState<number>(38);
  const [empName, setEmpName] = useState<string>('');
  const [empId, setEmpId] = useState<string>('');
  const [department, setDepartment] = useState<string>('ฝ่ายผลิต');
  const [hasMeds, setHasMeds] = useState<boolean>(false);
  const [isFemale, setIsFemale] = useState<boolean>(false);
  const [isPregnant, setIsPregnant] = useState<boolean>(false);
  const [isMenstruating, setIsMenstruating] = useState<boolean>(false);
  const [showPass, setShowPass] = useState<boolean>(false);

  const isFastingRequired = age >= 35;

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="prep-checker" className="py-12 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
            <span>เครื่องมือช่วยวางแผน</span>
            <span aria-hidden="true">·</span>
            <span>ระบบคัดกรองคำแนะนำรายบุคคล</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-3 text-balance">
            โปรแกรมประเมินข้อปฏิบัติและการเตรียมตัวตามเกณฑ์อายุ
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            กรอกอายุและข้อมูลเพื่อรับคำแนะนำการงดน้ำ-อาหาร รายการตรวจเลือด และข้อควรระวังเฉพาะบุคคล
          </p>
        </div>

        {/* 2-Column Tool Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Input Form Column */}
          <div className="lg:col-span-5 bg-slate-50 p-6 sm:p-7 rounded-2xl border border-slate-200">
            <h3 className="font-display text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-emerald-800 text-white text-xs flex items-center justify-center font-bold">1</span>
              <span>ระบุข้อมูลของคุณ</span>
            </h3>

            {/* Quick Age Buttons */}
            <div className="mb-5">
              <label className="block text-xs font-semibold uppercase text-slate-600 mb-2">
                เลือกช่วงอายุ
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setAge(30)}
                  className={`py-2 px-3 text-xs sm:text-sm font-medium rounded-lg border transition-all ${
                    age < 35
                      ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
                  }`}
                >
                  ต่ำกว่า 35 ปี
                </button>
                <button
                  type="button"
                  onClick={() => setAge(40)}
                  className={`py-2 px-3 text-xs sm:text-sm font-medium rounded-lg border transition-all ${
                    age >= 35
                      ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
                  }`}
                >
                  35 ปีขึ้นไป (ต้องงดอาหาร)
                </button>
              </div>
            </div>

            {/* Age Slider & Exact Number */}
            <div className="mb-5">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-medium text-slate-700">อายุของคุณ:</span>
                <span className="font-mono font-bold text-emerald-900 text-base tabular-nums">
                  {age} ปี
                </span>
              </div>
              <input
                type="range"
                min="18"
                max="65"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full accent-emerald-800 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1 tabular-nums">
                <span>18 ปี</span>
                <span className="text-amber-700 font-semibold">เกณฑ์ 35 ปี</span>
                <span>65 ปี</span>
              </div>
            </div>

            {/* Department Selection */}
            <div className="mb-5">
              <label className="block text-xs font-semibold uppercase text-slate-600 mb-1.5">
                ฝ่าย / แผนกงาน
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              >
                <option value="ฝ่ายผลิต">ฝ่ายผลิต (Production)</option>
                <option value="ฝ่ายหม้อต้ม & ปั่นน้ำตาล">ฝ่ายหม้อต้ม & ปั่นน้ำตาล</option>
                <option value="ฝ่ายซ่อมบำรุง & เครื่องกล">ฝ่ายซ่อมบำรุง & เครื่องกล</option>
                <option value="ฝ่ายบรรจุภัณฑ์ & คลังสินค้า">ฝ่ายบรรจุภัณฑ์ & คลังสินค้า</option>
                <option value="ฝ่ายเกษตร & จัดหาอ้อย">ฝ่ายเกษตร & จัดหาอ้อย</option>
                <option value="ฝ่ายโลจิสติกส์ & ลานชั่ง">ฝ่ายโลจิสติกส์ & ลานชั่งอ้อย</option>
                <option value="ฝ่ายควบคุมคุณภาพ (QC Lab)">ฝ่ายควบคุมคุณภาพ (QC Lab)</option>
                <option value="ฝ่ายสำนักงาน บัญชี & การเงิน">ฝ่ายสำนักงาน บัญชี & การเงิน</option>
                <option value="ฝ่ายบริหารทรัพยากรมนุษย์">ฝ่ายบริหารทรัพยากรมนุษย์ (HR)</option>
                <option value="ฝ่ายความปลอดภัย (SHE)">ฝ่ายความปลอดภัย & อาชีวอนามัย (SHE)</option>
              </select>
            </div>

            {/* Optional Personal Identifiers */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  ชื่อ-สกุล (ไม่บังคับ)
                </label>
                <input
                  type="text"
                  placeholder="เช่น สมชาย ใจดี"
                  value={empName}
                  onChange={(e) => setEmpName(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  รหัสพนักงาน (ไม่บังคับ)
                </label>
                <input
                  type="text"
                  placeholder="เช่น SRS-1042"
                  value={empId}
                  onChange={(e) => setEmpId(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>
            </div>

            {/* Health Toggles */}
            <div className="space-y-2.5 pt-3 border-t border-slate-200">
              <span className="block text-xs font-semibold uppercase text-slate-600 mb-1">
                เงื่อนไขสุขภาพเพิ่มเติม
              </span>

              <label className="flex items-center gap-2.5 cursor-pointer text-xs sm:text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={hasMeds}
                  onChange={(e) => setHasMeds(e.target.checked)}
                  className="rounded border-slate-300 text-emerald-800 focus:ring-emerald-700 w-4 h-4"
                />
                <span>มีโรคประจำตัวที่ต้องรับประทานยาประจำตอนเช้า</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer text-xs sm:text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={isFemale}
                  onChange={(e) => {
                    setIsFemale(e.target.checked);
                    if (!e.target.checked) {
                      setIsPregnant(false);
                      setIsMenstruating(false);
                    }
                  }}
                  className="rounded border-slate-300 text-emerald-800 focus:ring-emerald-700 w-4 h-4"
                />
                <span>เป็นพนักงานสุภาพสตรี</span>
              </label>

              {isFemale && (
                <div className="pl-6 space-y-2 text-xs text-slate-600 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isPregnant}
                      onChange={(e) => setIsPregnant(e.target.checked)}
                      className="rounded border-slate-300 text-amber-700 focus:ring-amber-700 w-3.5 h-3.5"
                    />
                    <span className="text-amber-900 font-medium">ตั้งครรภ์ หรือสงสัยว่าตั้งครรภ์ (ห้ามเอกซเรย์)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isMenstruating}
                      onChange={(e) => setIsMenstruating(e.target.checked)}
                      className="rounded border-slate-300 text-slate-700 focus:ring-slate-700 w-3.5 h-3.5"
                    />
                    <span>มีประจำเดือน หรือหมดไม่เกิน 7 วัน (แจ้งเลื่อนตรวจปัสสาวะ)</span>
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Dynamic Evaluation Output Column */}
          <div className="lg:col-span-7 space-y-5">
            {/* Main Result Card */}
            <div
              className={`p-6 rounded-2xl border ${
                isFastingRequired
                  ? 'bg-amber-50/50 border-amber-300'
                  : 'bg-emerald-50/50 border-emerald-300'
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-1">
                    ผลการประเมินตามเกณฑ์อายุ ({age} ปี)
                  </span>
                  <h3
                    className={`font-display text-xl sm:text-2xl font-bold ${
                      isFastingRequired ? 'text-amber-950' : 'text-emerald-950'
                    }`}
                  >
                    {isFastingRequired
                      ? '⚠️ ต้องงดน้ำและอาหารหลังเที่ยงคืน'
                      : '✅ ไม่ต้องงดน้ำและอาหาร'}
                  </h3>
                </div>
                <div
                  className={`p-3 rounded-xl ${
                    isFastingRequired ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'
                  }`}
                >
                  {isFastingRequired ? (
                    <UtensilsCrossed className="w-6 h-6" />
                  ) : (
                    <Coffee className="w-6 h-6" />
                  )}
                </div>
              </div>

              {/* Fasting Timing Instruction */}
              {isFastingRequired ? (
                <div className="bg-white/80 rounded-xl p-4 border border-amber-200/80 mb-4 text-xs sm:text-sm text-slate-800 space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-amber-950">
                    <span>ช่วงเวลาที่ต้องงดอาหาร:</span>
                    <span className="font-mono text-sm bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                      คืนศุกร์ที่ 6 พ.ย. เวลา 24.00 น. เป็นต้นไป
                    </span>
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-slate-700">
                    <li>
                      <strong>ห้ามรับประทาน:</strong> ข้าว, ขนมปัง, ผลไม้, นม, ชา, กาแฟ, ลูกอม, หรือหมากฝรั่งทุกชนิด
                    </li>
                    <li>
                      <strong>น้ำดื่ม:</strong> จิบน้ำเปล่าสะอาดได้เล็กน้อยในปริมาณ 1-2 อึก หากรู้สึกคอแห้งมาก
                    </li>
                    <li>
                      <strong>สิ้นสุดการงด:</strong> หลังเจาะเลือดเสร็จในเช้าวันเสาร์ที่ 7 พ.ย. สามารถรับประทานอาหารว่างที่จัดเตรียมไว้ให้ได้ทันที
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="bg-white/80 rounded-xl p-4 border border-emerald-200/80 mb-4 text-xs sm:text-sm text-slate-800 space-y-2">
                  <div className="font-semibold text-emerald-950">
                    คำแนะนำการรับประทานอาหาร:
                  </div>
                  <p className="text-slate-700">
                    เนื่องจากอายุยังไม่ถึง 35 ปี ไม่มีรายการเจาะเลือดตรวจระดับน้ำตาลและไขมัน จึง<strong>ไม่ต้องอดอาหาร</strong> สามารถรับประทานอาหารเช้าได้ตามปกติ แนะนำอาหารรสอ่อน ย่อยง่าย ไม่มันจัด เช่น ข้าวต้ม หรือโจ๊ก
                  </p>
                </div>
              )}

              {/* Lab Tests List */}
              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <h4 className="text-xs font-semibold uppercase text-slate-600 mb-2">
                  รายการตรวจสุขภาพที่จะได้รับ
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>สถานี 1: วัดสัญญาณชีพ, BMI & เจาะเลือด</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>สถานี 2/6: ตรวจคลื่นไฟฟ้าหัวใจ (EKG ชาย/หญิง)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>สถานี 3: ตรวจวิเคราะห์ปัสสาวะ (UA)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>สถานี 4: เอกซเรย์ปอดดิจิทัล (Chest X-Ray)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>สถานี 5: ตรวจสายตาอาชีวะ & เป่าปอด</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>สถานี 7: รถตรวจสมรรถภาพการได้ยิน</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>สถานี 8: ตรวจหาเส้นเลือดแดงตีบตัน (ABI)</span>
                  </div>

                  {isFastingRequired && (
                    <>
                      <div className="flex items-center gap-1.5 text-amber-900 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                        <span>ตรวจระดับน้ำตาลสะสมในเลือด (FBS)</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-amber-900 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                        <span>ตรวจไขมันครบชุด (Chol/Trig/HDL/LDL)</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-amber-900 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                        <span>ตรวจการทำงานของตับ (SGOT/SGPT)</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-amber-900 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                        <span>ตรวจการทำงานของไต (BUN / Creatinine)</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Special Warnings for Medications / Pregnant */}
              {(hasMeds || isPregnant || isMenstruating) && (
                <div className="mt-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-950 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-red-900">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>ข้อควรระวังเฉพาะของคุณ:</span>
                  </div>
                  {hasMeds && (
                    <p className="pl-5">
                      • <strong>ยาประจำตัว:</strong> ยาความดันทานได้ตามปกติพร้อมน้ำ 1 จิบ ส่วนยาเบาหวานห้ามทานก่อนตรวจ ให้นำติดตัวมาทานหลังเจาะเลือดพร้อมอาหารเช้า
                    </p>
                  )}
                  {isPregnant && (
                    <p className="pl-5 font-semibold text-red-700">
                      • <strong>สตรีมีครรภ์:</strong> ห้ามเอกซเรย์ปอดโดยเด็ดขาด ให้แจ้งเจ้าหน้าที่จุดลงทะเบียนทันที
                    </p>
                  )}
                  {isMenstruating && (
                    <p className="pl-5">
                      • <strong>มีประจำเดือน:</strong> กรุณาแจ้งพยาบาลจุดตรวจปัสสาวะเพื่อเลื่อนการเก็บตัวอย่าง
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Print / Pass Generation Action */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-800 text-white flex items-center justify-center shrink-0">
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    บัตรเตรียมตัวตรวจสุขภาพ (Health Checkup Pass)
                  </h4>
                  <p className="text-xs text-slate-500">
                    พิมพ์หรือแคปเจอร์หน้าจอเพื่อนำมายื่นพร้อมบัตรประชาชนตัวจริง
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="w-full sm:w-auto px-4 py-2 text-xs sm:text-sm font-medium text-emerald-950 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 rounded-lg transition-colors flex items-center justify-center gap-1.5 shrink-0"
              >
                <span>{showPass ? 'ซ่อนบัตรเตรียมตัว' : 'ดูบัตรเตรียมตัวของคุณ'}</span>
              </button>
            </div>

            {/* Render Printable Employee Health Pass Card */}
            {showPass && (
              <div className="p-6 rounded-2xl bg-white border-2 border-dashed border-emerald-600 shadow-sm relative overflow-hidden">
                <div className="flex items-start justify-between border-b border-slate-200 pb-4 mb-4 gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src="/assets/aistudio/LINE_ALBUM________________________250624_4_0_69fca4ca.jpg"
                      alt="โลโก้ บริษัท น้ำตาลสุรินทร์ จำกัด"
                      className="h-12 w-auto object-contain rounded bg-white p-0.5 border border-slate-200 shrink-0"
                    />
                    <div>
                      <span className="text-[11px] font-semibold text-slate-700 block">
                        {COMPANY_INFO.nameTh} · KORACH INDUSTRY SUGAR GROUP
                      </span>
                      <h4 className="font-display text-base sm:text-lg font-bold text-slate-900 leading-tight">
                        บัตรเตรียมตัวตรวจสุขภาพประจำปี 2569
                      </h4>
                      <span className="text-xs text-slate-500 block">
                        วันเสาร์ที่ 7 พฤศจิกายน 2569 (06.00 - 16.00 น.)
                      </span>
                      <span className="text-xs font-semibold text-emerald-800 block">
                        สถานที่: {COMPANY_INFO.location}
                      </span>
                    </div>
                  </div>
                  <div className="w-16 h-16 bg-slate-900 text-white rounded-lg flex flex-col items-center justify-center text-center p-1 shrink-0">
                    <QrCode className="w-8 h-8" />
                    <span className="text-[9px] font-mono mt-0.5">SRS-2569</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-4">
                  <div className="p-2 rounded bg-slate-50">
                    <span className="text-slate-500 block text-[10px]">ชื่อพนักงาน:</span>
                    <span className="font-semibold text-slate-800">{empName || 'พนักงาน บจก.น้ำตาลสุรินทร์'}</span>
                  </div>
                  <div className="p-2 rounded bg-slate-50">
                    <span className="text-slate-500 block text-[10px]">รหัสพนักงาน:</span>
                    <span className="font-semibold text-slate-800 font-mono">{empId || 'SRS-EMPLOYEE'}</span>
                  </div>
                  <div className="p-2 rounded bg-slate-50">
                    <span className="text-slate-500 block text-[10px]">อายุ / แผนก:</span>
                    <span className="font-semibold text-slate-800">{age} ปี · {department}</span>
                  </div>
                  <div className="p-2 rounded bg-slate-50">
                    <span className="text-slate-500 block text-[10px]">สถานะงดอาหาร:</span>
                    <span className={`font-bold ${isFastingRequired ? 'text-amber-700' : 'text-emerald-700'}`}>
                      {isFastingRequired ? 'ต้องงดอาหารหลัง 24.00' : 'ไม่ต้องงดอาหาร'}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-emerald-50 text-xs text-emerald-950 mb-4 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-emerald-800 shrink-0" />
                  <span><strong>ข้อเน้นย้ำ:</strong> ต้องนำ "บัตรประชาชนตัวจริง" มาเสียบเครื่องอ่าน Smart Card ยืนยันสิทธิ์ทุกท่าน</span>
                </div>

                <div className="flex justify-end gap-2 no-print">
                  <button
                    onClick={handlePrint}
                    className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-md flex items-center gap-1.5 transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>พิมพ์หน้านี้ (Print Pass)</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
