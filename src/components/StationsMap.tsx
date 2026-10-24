import React, { useState } from 'react';
import { CHECKUP_STATIONS } from '../data/mockData';
import {
  CreditCard,
  Activity,
  Droplets,
  FileText,
  Stethoscope,
  Eye,
  HeartPulse,
  Ear,
  Clock,
  MapPin,
  ChevronRight,
  Info,
  Maximize2,
  X,
  Map
} from 'lucide-react';

export const StationsMap: React.FC = () => {
  const [activeStationId, setActiveStationId] = useState<number>(1);
  const [isMapModalOpen, setIsMapModalOpen] = useState<boolean>(false);

  const getStationIcon = (iconName: string) => {
    switch (iconName) {
      case 'CreditCard':
        return <CreditCard className="w-5 h-5" />;
      case 'Activity':
        return <Activity className="w-5 h-5" />;
      case 'Droplets':
        return <Droplets className="w-5 h-5" />;
      case 'FileText':
        return <FileText className="w-5 h-5" />;
      case 'Stethoscope':
        return <Stethoscope className="w-5 h-5" />;
      case 'Eye':
        return <Eye className="w-5 h-5" />;
      case 'HeartPulse':
        return <HeartPulse className="w-5 h-5" />;
      case 'Ear':
        return <Ear className="w-5 h-5" />;
      default:
        return <HeartPulse className="w-5 h-5" />;
    }
  };

  const currentStation = CHECKUP_STATIONS.find((s) => s.id === activeStationId) || CHECKUP_STATIONS[0];

  return (
    <section id="stations" className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
            <span>แผนผังจุดบริการและเส้นทาง</span>
            <span aria-hidden="true">·</span>
            <span>ผังตรวจสุขภาพ 8 สถานี</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-3 text-balance">
            แผนผังจุดบริการตรวจสุขภาพประจำปี 2569 (8 สถานี)
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            แผนผังและตำแหน่งจุดบริการรอบพื้นที่บริษัท น้ำตาลสุรินทร์ จำกัด เพื่อการตรวจสุขภาพที่สะดวกรวดเร็วและเป็นระเบียบ
          </p>
        </div>

        {/* 8 Stations Fast Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {CHECKUP_STATIONS.map((station) => {
            const isActive = station.id === activeStationId;
            return (
              <button
                key={station.id}
                onClick={() => setActiveStationId(station.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all shrink-0 border ${
                  isActive
                    ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs ring-2 ring-emerald-700/20'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center ${
                    isActive ? 'bg-white text-emerald-900' : 'bg-red-600 text-white'
                  }`}
                >
                  {station.id}
                </span>
                <span className="whitespace-nowrap font-medium">{station.title.split('&')[0].split(',')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Layout: Left Side Details, Right Side Official Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Station Details (7 cols) */}
          <div className="lg:col-span-7 bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-3">
                <span className="text-red-600 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-red-600 text-white inline-flex items-center justify-center text-[10px]">
                    {currentStation.id}
                  </span>
                  <span>สถานีที่ {currentStation.id} จาก 8</span>
                </span>
                <span aria-hidden="true">·</span>
                <span>หมวด: {currentStation.category}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1 text-slate-600">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span className="tabular-nums">{currentStation.duration}</span>
                </span>
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 mb-3">
                {currentStation.title}
              </h3>

              <div className="flex items-center gap-2 text-xs font-medium text-emerald-900 bg-emerald-50/80 px-3 py-2 rounded-lg border border-emerald-200/60 mb-5">
                <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
                <span><strong>สถานที่ตรวจ:</strong> {currentStation.location}</span>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed mb-6">
                {currentStation.description}
              </p>

              {/* Station Specific Practical Tips */}
              <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-emerald-800" />
                  <span>ข้อปฏิบัติและคำแนะนำประจำสถานีนี้:</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-600">
                  {currentStation.tips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-700 font-bold shrink-0">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Station Quick Summary Bar */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-white border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">กลุ่มเป้าหมาย:</span>
                  <span className="font-semibold text-slate-800">{currentStation.targetGroup}</span>
                </div>
                <div className="p-3 rounded-lg bg-white border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">จุดบริการใกล้เคียง:</span>
                  <span className="font-semibold text-slate-800">
                    {currentStation.id === 1 && 'สถานี 2 (EKG ชาย) ในห้องประชุมใหญ่'}
                    {currentStation.id === 2 && 'สถานี 1 ในห้องประชุมใหญ่ / โรงอาหาร'}
                    {currentStation.id === 3 && 'โรงอาหารสโมสร (รับประทานอาหารเช้า)'}
                    {currentStation.id === 4 && 'สถานี 7 (รถตรวจการได้ยิน) ลานจอดรถ'}
                    {currentStation.id === 5 && 'อาคารออฟฟิศ / โรงจอดรถจักรยานยนต์'}
                    {currentStation.id === 6 && 'ห้องประชุมอาคารบุคคล (แยกห้องมิดชิด)'}
                    {currentStation.id === 7 && 'สถานี 4 (จุดเอ็กซเรย์) ลานจอดรถ'}
                    {currentStation.id === 8 && 'ที่จอดรถ หน.แผนก / ศาลาด้านล่าง'}
                  </span>
                </div>
              </div>
            </div>

            {/* Stepper buttons */}
            <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-200 text-xs">
              <button
                type="button"
                disabled={currentStation.id === 1}
                onClick={() => setActiveStationId((prev) => Math.max(1, prev - 1))}
                className="px-3.5 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-medium"
              >
                ← สถานีก่อนหน้า
              </button>
              <span className="text-slate-500 font-medium">
                สถานีที่ {currentStation.id} จาก 8 สถานี
              </span>
              <button
                type="button"
                disabled={currentStation.id === 8}
                onClick={() => setActiveStationId((prev) => Math.min(8, prev + 1))}
                className="px-3.5 py-2 rounded-lg bg-emerald-800 text-white hover:bg-emerald-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-medium shadow-2xs"
              >
                สถานีถัดไป →
              </button>
            </div>
          </div>

          {/* Official Site Map (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Map className="w-4 h-4 text-emerald-800" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    แผนผังจุดบริการทางการ 2569
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMapModalOpen(true)}
                  className="text-xs text-emerald-800 hover:text-emerald-900 font-semibold flex items-center gap-1 transition-colors"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>ขยายแผนผังเต็มจอ</span>
                </button>
              </div>

              {/* Map Preview Image */}
              <div
                onClick={() => setIsMapModalOpen(true)}
                className="relative rounded-xl overflow-hidden border border-slate-200 bg-white cursor-pointer group shadow-2xs"
              >
                <img
                  src="/assets/aistudio/messageImage_1792573922088_67787754.jpg"
                  alt="แผนผังจุดบริการตรวจสุขภาพประจำปี 2569 บริษัท น้ำตาลสุรินทร์ จำกัด"
                  className="w-full h-auto object-contain transition-transform duration-200 group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/80 text-white text-xs font-medium px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-md">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>คลิกเพื่อดูภาพขนาดใหญ่</span>
                  </span>
                </div>
              </div>

              {/* Map Key Landmark Guide */}
              <div className="mt-3.5 pt-3 border-t border-slate-200 grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                  <span>ห้องประชุมใหญ่: สถานี 1 & 2</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                  <span>โซนห้องน้ำ: สถานี 3 เก็บปัสสาวะ</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span>หน้าออฟฟิศ: สถานี 5 สายตา/เป่าปอด</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                  <span>อาคารบุคคล: สถานี 6 EKG หญิง</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
                  <span>ลานจอดรถ: สถานี 4 X-Ray & 7 การได้ยิน</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                  <span>ที่จอดรถ หน.แผนก: สถานี 8 หลอดเลือดตีบ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for full screen view of map */}
      {isMapModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
          onClick={() => setIsMapModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl max-h-[95vh] w-full p-4 sm:p-6 overflow-auto shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-600" />
                <h3 className="font-display text-base sm:text-lg font-bold text-slate-900">
                  แผนผังจุดบริการตรวจสุขภาพประจำปี 2569 (8 สถานี)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsMapModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex justify-center bg-slate-100 rounded-xl p-2 sm:p-4">
              <img
                src="/assets/aistudio/messageImage_1792573922088_67787754.jpg"
                alt="แผนผังจุดบริการตรวจสุขภาพประจำปี 2569 แบบเต็มจอ"
                className="max-h-[78vh] w-auto object-contain rounded-lg shadow-sm"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
