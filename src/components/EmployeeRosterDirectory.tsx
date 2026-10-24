import React, { useState, useMemo } from 'react';
import eligibleEmployeesData from '../data/eligibleEmployees.json';
import rosterSummaryData from '../data/rosterSummary.json';
import { EligibleEmployee } from '../types';
import { COMPANY_INFO } from '../data/mockData';
import {
  Search,
  Filter,
  Users,
  UtensilsCrossed,
  Coffee,
  FileText,
  Printer,
  Download,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  X,
  CreditCard,
  MapPin,
  Clock,
  Sparkles,
  QrCode
} from 'lucide-react';

const EMPLOYEES: EligibleEmployee[] = eligibleEmployeesData as EligibleEmployee[];

export const EmployeeRosterDirectory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');
  const [selectedFasting, setSelectedFasting] = useState('all');
  const [selectedStation, setSelectedStation] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEmployee, setSelectedEmployee] = useState<EligibleEmployee | null>(null);

  const pageSize = 15;

  // Department options from data
  const departmentOptions = useMemo(() => {
    const depts = Object.keys(rosterSummaryData.departments);
    return ['all', ...depts];
  }, []);

  // Filtered list
  const filteredEmployees = useMemo(() => {
    return EMPLOYEES.filter((emp) => {
      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesCode = emp.empCode.toLowerCase().includes(q);
        const matchesName = emp.fullName.toLowerCase().includes(q);
        const matchesPos = emp.position.toLowerCase().includes(q);
        const matchesSub = emp.subDept.toLowerCase().includes(q);
        if (!matchesCode && !matchesName && !matchesPos && !matchesSub) {
          return false;
        }
      }

      // Department filter
      if (selectedDept !== 'all' && emp.departmentGroup !== selectedDept) {
        return false;
      }

      // Fasting filter
      if (selectedFasting === 'fasting' && !emp.isFastingRequired) return false;
      if (selectedFasting === 'non-fasting' && emp.isFastingRequired) return false;

      // Station filter
      if (selectedStation !== 'all') {
        const stationNum = parseInt(selectedStation, 10);
        if (!emp.stations.includes(stationNum)) return false;
      }

      return true;
    });
  }, [searchQuery, selectedDept, selectedFasting, selectedStation]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredEmployees.length / pageSize) || 1;
  const paginatedEmployees = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredEmployees.slice(start, start + pageSize);
  }, [filteredEmployees, currentPage]);

  const handleSelectEmployee = (emp: EligibleEmployee) => {
    setSelectedEmployee(emp);
  };

  const handlePrintSlip = () => {
    window.print();
  };

  return (
    <section id="roster" className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-8">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
            <span>ฐานข้อมูลผู้มีสิทธิ์ทางการ</span>
            <span aria-hidden="true">·</span>
            <span>ตรวจสอบสิทธิ์และรายการตรวจ 1,068 รายชื่อ</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-3 text-balance">
            ตรวจสอบรายชื่อผู้มีสิทธิ์ และรายการตรวจประจำตัว
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            พนักงานสามารถค้นหาด้วยชื่อ-นามสกุล หรือรหัสพนักงาน เพื่อดูรายการตรวจเฉพาะบุคคล สถานีที่ต้องตรวจ และข้อกำหนดการงดน้ำ-อาหาร
          </p>
        </div>

        {/* 4 KPI Metric Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-xs font-medium">ผู้มีสิทธิ์ทั้งหมด</span>
              <Users className="w-4 h-4 text-slate-700" />
            </div>
            <span className="font-mono text-2xl sm:text-3xl font-bold text-slate-900 tabular-nums">
              {rosterSummaryData.totalEmployees.toLocaleString()}
            </span>
            <span className="text-[11px] text-slate-500 block mt-0.5">คน (ข้อมูล ณ วันที่ 15 ก.ย. 68)</span>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/90 shadow-2xs">
            <div className="flex items-center justify-between text-amber-900 mb-1">
              <span className="text-xs font-medium">กลุ่มต้องงดอาหาร (35+)</span>
              <UtensilsCrossed className="w-4 h-4 text-amber-800" />
            </div>
            <span className="font-mono text-2xl sm:text-3xl font-bold text-amber-950 tabular-nums">
              {rosterSummaryData.fastingCount.toLocaleString()}
            </span>
            <span className="text-[11px] text-amber-800 font-medium block mt-0.5">งดหลัง 24.00 น. คืน 6 พ.ย.</span>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/90 shadow-2xs">
            <div className="flex items-center justify-between text-emerald-900 mb-1">
              <span className="text-xs font-medium">กลุ่มไม่ต้องงดอาหาร</span>
              <Coffee className="w-4 h-4 text-emerald-800" />
            </div>
            <span className="font-mono text-2xl sm:text-3xl font-bold text-emerald-950 tabular-nums">
              {rosterSummaryData.nonFastingCount.toLocaleString()}
            </span>
            <span className="text-[11px] text-emerald-800 font-medium block mt-0.5">ทานอาหารเช้าเบาๆ ได้</span>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/90 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-blue-900 mb-1">
                <span className="text-xs font-medium">เอกสารทางการ</span>
                <FileText className="w-4 h-4 text-blue-800" />
              </div>
              <span className="text-xs text-blue-950 font-semibold block">
                ประกาศรายชื่อ PDF (10 หน้า)
              </span>
            </div>
            <a
              href="/assets/aistudio/___________e0f6209b.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 py-1 px-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-[11px] font-medium flex items-center justify-center gap-1 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>ดาวน์โหลด PDF ฉบับเต็ม</span>
            </a>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 mb-6 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="ค้นหาชื่อ, นามสกุล, หรือรหัสพนักงาน (เช่น SR3464, ณภัทร, ทองลา)..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Department Dropdown */}
            <div className="md:col-span-3">
              <select
                value={selectedDept}
                onChange={(e) => {
                  setSelectedDept(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              >
                <option value="all">ทุกฝ่ายงาน ({rosterSummaryData.totalEmployees})</option>
                {departmentOptions.filter((d) => d !== 'all').map((dept) => (
                  <option key={dept} value={dept}>
                    ฝ่าย{dept} ({rosterSummaryData.departments[dept as keyof typeof rosterSummaryData.departments] || 0} คน)
                  </option>
                ))}
              </select>
            </div>

            {/* Fasting Filter Dropdown */}
            <div className="md:col-span-2">
              <select
                value={selectedFasting}
                onChange={(e) => {
                  setSelectedFasting(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              >
                <option value="all">สถานะงดอาหารทั้งหมด</option>
                <option value="fasting">ต้องงดอาหาร (35+)</option>
                <option value="non-fasting">ไม่ต้องงดอาหาร</option>
              </select>
            </div>

            {/* Station Filter Dropdown */}
            <div className="md:col-span-2">
              <select
                value={selectedStation}
                onChange={(e) => {
                  setSelectedStation(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              >
                <option value="all">ทุกสถานีตรวจ</option>
                <option value="1">สถานี 1: ลงทะเบียน & เจาะเลือด</option>
                <option value="2">สถานี 2: EKG ชาย</option>
                <option value="3">สถานี 3: เก็บปัสสาวะ</option>
                <option value="4">สถานี 4: เอ็กซเรย์ปอด</option>
                <option value="5">สถานี 5: สายตา & เป่าปอด</option>
                <option value="6">สถานี 6: EKG หญิง</option>
                <option value="7">สถานี 7: รถตรวจการได้ยิน</option>
                <option value="8">สถานี 8: หลอดเลือดแดงตีบ</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <span>
              พบข้อมูลพนักงานทั้งหมด: <strong className="text-slate-800 font-semibold">{filteredEmployees.length}</strong> ท่าน
            </span>
            {(searchQuery || selectedDept !== 'all' || selectedFasting !== 'all' || selectedStation !== 'all') && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedDept('all');
                  setSelectedFasting('all');
                  setSelectedStation('all');
                  setCurrentPage(1);
                }}
                className="text-emerald-800 hover:underline font-medium"
              >
                ล้างตัวกรองทั้งหมด
              </button>
            )}
          </div>
        </div>

        {/* Employees Table Container */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs mb-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[11px]">
                <tr>
                  <th className="py-3 px-3.5 text-center w-14">ลำดับ</th>
                  <th className="py-3 px-3.5 w-28">รหัสพนักงาน</th>
                  <th className="py-3 px-4">ชื่อ - นามสกุล</th>
                  <th className="py-3 px-4">ฝ่าย / แผนก</th>
                  <th className="py-3 px-3.5">ตำแหน่ง</th>
                  <th className="py-3 px-3.5 text-center">การงดอาหาร</th>
                  <th className="py-3 px-3.5 text-center">จำนวนรายการ</th>
                  <th className="py-3 px-4 text-center">ตรวจสอบสิทธิ์</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedEmployees.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-12 text-slate-500">
                      ไม่พบข้อมูลพนักงานตามคำค้นหา "{searchQuery}" หรือตัวกรองที่เลือก
                    </td>
                  </tr>
                ) : (
                  paginatedEmployees.map((emp) => (
                    <tr
                      key={emp.id}
                      className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                      onClick={() => handleSelectEmployee(emp)}
                    >
                      <td className="py-3 px-3.5 text-center font-mono text-slate-500 tabular-nums">
                        {emp.id}
                      </td>
                      <td className="py-3 px-3.5 font-mono font-bold text-slate-900">
                        {emp.empCode}
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-900 group-hover:text-emerald-800 transition-colors">
                        {emp.fullName}
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        <span className="font-semibold text-slate-800 block">
                          ฝ่าย{emp.departmentGroup}
                        </span>
                        {emp.subDept && <span className="text-[11px] text-slate-500">{emp.subDept}</span>}
                      </td>
                      <td className="py-3 px-3.5 text-slate-600">
                        {emp.position || '-'}
                      </td>
                      <td className="py-3 px-3.5 text-center">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${
                            emp.isFastingRequired
                              ? 'bg-amber-100 text-amber-900'
                              : 'bg-emerald-100 text-emerald-900'
                          }`}
                        >
                          {emp.isFastingRequired ? 'ต้องงดอาหาร' : 'ไม่ต้องงดอาหาร'}
                        </span>
                      </td>
                      <td className="py-3 px-3.5 text-center font-mono font-bold text-slate-800 tabular-nums">
                        {emp.testCount} รายการ
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectEmployee(emp);
                          }}
                          className="px-3 py-1 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-200"
                        >
                          ดูสิทธิ์ตรวจ
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="py-3.5 px-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <span>
              แสดงหน้า <strong className="text-slate-800">{currentPage}</strong> จากทั้งหมด{' '}
              <strong className="text-slate-800">{totalPages}</strong> หน้า (ทั้งหมด {filteredEmployees.length} ท่าน)
            </span>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="p-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="px-2 font-mono tabular-nums text-slate-700">
                {currentPage} / {totalPages}
              </span>

              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="p-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Selected Employee Detailed Modal Drawer */}
        {selectedEmployee && (
          <div
            className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5"
            onClick={() => setSelectedEmployee(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-2xl max-h-[90vh] w-full overflow-y-auto p-5 sm:p-7 shadow-2xl relative border border-slate-200 animate-in fade-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedEmployee(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Employee Modal Header */}
              <div className="flex items-start gap-3.5 border-b border-slate-200 pb-4 mb-4">
                <img
                  src="/assets/aistudio/LINE_ALBUM________________________250624_4_0_69fca4ca.jpg"
                  alt="โลโก้ บริษัท น้ำตาลสุรินทร์ จำกัด"
                  className="h-11 w-auto object-contain rounded bg-white p-0.5 border border-slate-200 shrink-0"
                />
                <div className="flex-1">
                  <span className="text-[11px] font-semibold text-slate-500 block uppercase">
                    สิทธิ์การตรวจสุขภาพประจำปี 2569 · {COMPANY_INFO.nameTh}
                  </span>
                  <h3 className="font-display text-xl font-bold text-slate-900 leading-tight">
                    {selectedEmployee.fullName}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 mt-1">
                    <span className="font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      รหัส: {selectedEmployee.empCode}
                    </span>
                    <span>·</span>
                    <span>ฝ่าย{selectedEmployee.departmentGroup}</span>
                    {selectedEmployee.position && (
                      <>
                        <span>·</span>
                        <span>{selectedEmployee.position}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Fasting Requirement Card */}
              <div
                className={`p-4 rounded-xl border mb-5 ${
                  selectedEmployee.isFastingRequired
                    ? 'bg-amber-50/70 border-amber-300 text-amber-950'
                    : 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                }`}
              >
                <div className="flex items-center gap-2.5 font-bold text-sm mb-1">
                  {selectedEmployee.isFastingRequired ? (
                    <>
                      <UtensilsCrossed className="w-4 h-4 text-amber-700" />
                      <span>สถานะ: ต้องงดน้ำและอาหารทุกชนิดหลังเที่ยงคืน (24.00 น.)</span>
                    </>
                  ) : (
                    <>
                      <Coffee className="w-4 h-4 text-emerald-700" />
                      <span>สถานะ: ไม่ต้องงดน้ำและอาหาร สามารถทานอาหารเช้าได้</span>
                    </>
                  )}
                </div>
                <p className="text-xs leading-relaxed opacity-90 pl-6">
                  {selectedEmployee.isFastingRequired
                    ? 'เนื่องจากมีรายการเจาะตรวจระดับน้ำตาลในเลือด (FBS) และไขมัน (Cholesterol/Triglyceride) กรุณางดอาหารและเครื่องดื่มทุกชนิดหลังเที่ยงคืนคืนวันศุกร์ที่ 6 พ.ย. (จิบน้ำเปล่าได้เล็กน้อย)'
                    : 'พนักงานสามารถรับประทานอาหารเช้ารสอ่อน ไม่หวานจัด ไม่มันจัด ก่อนเดินทางมาตรวจสุขภาพ'}
                </p>
              </div>

              {/* Stations Route (8 สถานี) */}
              <div className="mb-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-800" />
                  <span>เส้นทางจุดตรวจที่ต้องเข้ารับบริการ ({selectedEmployee.stations.length} สถานี):</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedEmployee.stations.map((stId) => (
                    <span
                      key={stId}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 text-xs font-medium border border-slate-200"
                    >
                      <span className="w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center">
                        {stId}
                      </span>
                      <span>
                        {stId === 1 && 'จุดลงทะเบียน & เจาะเลือด'}
                        {stId === 2 && 'ตรวจ EKG ชาย'}
                        {stId === 3 && 'เก็บปัสสาวะ & อาหารเช้า'}
                        {stId === 4 && 'จุดเอ็กซเรย์ปอด'}
                        {stId === 5 && 'สายตา & เป่าปอด'}
                        {stId === 6 && 'ตรวจ EKG หญิง'}
                        {stId === 7 && 'รถตรวจการได้ยิน'}
                        {stId === 8 && 'ตรวจหลอดเลือดแดงตีบ (ABI)'}
                      </span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Test Items */}
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-800" />
                    <span>รายการตรวจสุขภาพที่ได้รับสิทธิ์ ({selectedEmployee.testCount} รายการ):</span>
                  </span>
                  <span className="text-[11px] font-normal text-slate-500">
                    ข้อมูลทางการ ณ วันที่ 15 ก.ย. 68
                  </span>
                </h4>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                    {selectedEmployee.tests.map((tName, tIdx) => {
                      const isFastingItem = tName.includes("Fasting Blood Sugar") || tName.includes("Cholesterol") || tName.includes("Triglyceride");
                      return (
                        <div
                          key={tIdx}
                          className={`flex items-start gap-2 p-1.5 rounded-md ${
                            isFastingItem ? 'bg-amber-50/80 font-medium text-amber-950' : ''
                          }`}
                        >
                          <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                            isFastingItem ? 'text-amber-700' : 'text-emerald-700'
                          }`} />
                          <span>{tName}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Notice & Print Action */}
              <div className="p-3.5 rounded-xl bg-slate-100 text-slate-700 text-xs mb-5 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-blue-700 shrink-0" />
                <span>
                  <strong>สิ่งสำคัญที่สุด:</strong> ต้องนำ "บัตรประชาชนตัวจริง" มาเสียบเครื่อง Smart Card ยืนยันสิทธิ์ ณ สถานีที่ 1
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200 no-print">
                <button
                  type="button"
                  onClick={() => setSelectedEmployee(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  ปิดหน้าต่าง
                </button>
                <button
                  type="button"
                  onClick={handlePrintSlip}
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>พิมพ์ใบนำทางตรวจสุขภาพ (Routing Slip)</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
