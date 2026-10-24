import React, { useState, useEffect } from 'react';
import { COMPANY_INFO } from '../data/mockData';
import { Calendar, Clock, MapPin, AlertOctagon, CreditCard, Sparkles, Download, Bell, Share2, Check } from 'lucide-react';

interface HeroAnnouncementProps {
  onScrollToPrep: () => void;
  onScrollToRoster: () => void;
  onOpenCalendarModal: () => void;
}

export const HeroAnnouncement: React.FC<HeroAnnouncementProps> = ({
  onScrollToPrep,
  onScrollToRoster,
  onOpenCalendarModal,
}) => {
  // Countdown to Saturday, Nov 7, 2026, 06:00 AM (Bangkok Time UTC+7)
  const targetDate = new Date('2026-11-07T06:00:00+07:00').getTime();
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const handleShare = async () => {
    const text = `แจ้งข่าวประชาสัมพันธ์สำคัญ การตรวจสุขภาพประจำปี 2569 บริษัท น้ำตาลสุรินทร์ จำกัด วันเสาร์ที่ 7 พ.ย. 2569 เวลา 06.00-16.00 น. อายุ 35+ งดน้ำอาหารหลังเที่ยงคืนคืนที่ 6 พ.ย. และอย่าลืมพกบัตรประชาชนตัวจริงมาด้วยนะคะ`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'การตรวจสุขภาพประจำปี 2569 บจก.น้ำตาลสุรินทร์',
          text,
          url: window.location.href,
        });
      } catch {
        // Fallback to clipboard
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } else {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section id="overview" className="relative pt-6 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Editorial Subtitle / Authority kicker with Official Logo */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5 pb-3.5 border-b border-slate-200/80">
          <div className="flex items-center gap-3">
            <img
              src="/assets/aistudio/LINE_ALBUM________________________250624_4_0_69fca4ca.jpg"
              alt="โลโก้ บริษัท น้ำตาลสุรินทร์ จำกัด"
              className="h-10 w-auto object-contain rounded bg-white p-0.5 border border-slate-200 shadow-2xs"
            />
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
              <span className="font-semibold text-slate-900">{COMPANY_INFO.nameTh}</span>
              <span aria-hidden="true">·</span>
              <span>{COMPANY_INFO.department}</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-800 font-medium">ประกาศข่าวประชาสัมพันธ์พนักงาน</span>
            </div>
          </div>
          <span className="text-xs text-red-600 font-semibold tracking-wide hidden md:inline">
            KORACH INDUSTRY SUGAR GROUP
          </span>
        </div>

        {/* 2-Column Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Announcement Details */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-bold text-slate-900 leading-tight tracking-tight mb-4 text-balance">
                การตรวจสุขภาพประจำปี 2569
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6">
                สวัสดีค่ะ พนักงานบริษัท น้ำตาลสุรินทร์ จำกัด ทุกท่าน
                ขอเชิญเข้ารับการตรวจสุขภาพประจำปีเพื่อส่งเสริมสุขอนามัยและค้นหาความเสี่ยงทางสุขภาพ
                พร้อมระบบประเมินการเตรียมตัวและคู่มือแผนผัง 8 สถานีบริการ
              </p>

              {/* Event Key Facts Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 font-medium block">วันที่จัดตรวจ</span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-900">
                      {COMPANY_INFO.checkupDate}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 font-medium block">เวลาตรวจ</span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-900 tabular-nums">
                      {COMPANY_INFO.checkupTime}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 font-medium block">สถานที่ตรวจ</span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-900">
                      {COMPANY_INFO.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* TWO CRITICAL HIGHLIGHT BOXES */}
              <div className="space-y-3 mb-6">
                {/* 1. Fasting Requirement for Age 35+ */}
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/90 text-slate-900">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-amber-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <AlertOctagon className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-amber-950 mb-1">
                        ข้อปฏิบัติสำคัญ: พนักงานอายุ 35 ปีขึ้นไป
                      </h2>
                      <p className="text-xs sm:text-sm text-amber-900 leading-normal">
                        ขอความกรุณา <strong className="underline underline-offset-2">งดน้ำและอาหารทุกชนิดหลังเที่ยงคืน (24.00 น.)</strong> ของคืนวันศุกร์ที่ 6 พฤศจิกายน 2569 เป็นต้นไป เพื่อความแม่นยำในการตรวจระดับน้ำตาลและไขมันในเลือด (จิบน้ำเปล่าสะอาดได้เล็กน้อยหากคอแห้งมาก)
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. Original ID Card Requirement */}
                <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/90 text-slate-900">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-700 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-blue-950 mb-1">
                        ข้อปฏิบัติจำเป็นที่สุด: พกบัตรประชาชนตัวจริง
                      </h2>
                      <p className="text-xs sm:text-sm text-blue-900 leading-normal">
                        กรุณา <strong className="underline underline-offset-2">พกบัตรประจำตัวประชาชนตัวจริง</strong> ติดตัวมาด้วยทุกท่าน เพื่อนำมายืนยันสิทธิ์กับเครื่องอ่าน Smart Card ณ จุดลงทะเบียนก่อนรับการตรวจ (ไม่สามารถใช้รูปถ่ายหรือสำเนาได้)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slogan & Quote */}
              <div className="py-2 px-3 rounded-lg bg-emerald-50/60 border border-emerald-200/60 mb-6 text-xs sm:text-sm text-emerald-950 font-medium italic flex items-center gap-2">
                <span className="text-emerald-700 text-base">“</span>
                <span>สุขภาพดีเริ่มต้นที่ตัวเรา อย่าลืมมารับการตรวจตามวันและเวลาดังกล่าวกันนะคะ</span>
                <span className="text-emerald-700 text-base">”</span>
              </div>
            </div>

            {/* Action Buttons */}
            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onScrollToRoster}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-emerald-800 rounded-lg hover:bg-emerald-900 shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 whitespace-nowrap flex items-center gap-1.5"
              >
                <span>🔍 ค้นหารายชื่อ & รายการตรวจ (1,068 คน)</span>
              </button>
              <button
                onClick={onScrollToPrep}
                className="px-4 py-2.5 text-sm font-medium text-slate-800 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap"
              >
                ประเมินการเตรียมตัวตามอายุ
              </button>
              <button
                onClick={onOpenCalendarModal}
                className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-emerald-800" />
                <span>เพิ่มลงปฏิทิน</span>
              </button>
              <button
                onClick={handleShare}
                className="p-2.5 text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                title="คัดลอกข้อความประชาสัมพันธ์ / แชร์ให้เพื่อนร่วมงาน"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Right Column: Visual Frame & Live Countdown */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* High-Impact Visual Asset */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm aspect-16/10 sm:aspect-16/9 lg:aspect-auto lg:h-[320px] bg-slate-100">
              <img
                src="/src/assets/images/hero_health_checkup_1792805576855.jpg"
                alt="การตรวจสุขภาพประจำปี บริษัท น้ำตาลสุรินทร์ จำกัด"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-xs uppercase tracking-wider text-emerald-300 font-semibold mb-1">
                  Surin Sugar Occupational Health
                </span>
                <p className="text-sm font-medium text-white/95">
                  ความพร้อมของทีมแพทย์และห้องปฏิบัติการเคลื่อนที่มาตรฐานสากล
                </p>
              </div>
            </div>

            {/* Live Countdown Box */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-800" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                    นับถอยหลังสู่วันตรวจสุขภาพ
                  </span>
                </div>
                <span className="text-xs text-slate-500">7 พ.ย. 2569 · 06:00 น.</span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="block font-mono text-xl sm:text-2xl font-bold text-slate-900 tabular-nums">
                    {timeLeft.days}
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">วัน</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="block font-mono text-xl sm:text-2xl font-bold text-slate-900 tabular-nums">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">ชั่วโมง</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="block font-mono text-xl sm:text-2xl font-bold text-slate-900 tabular-nums">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">นาที</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="block font-mono text-xl sm:text-2xl font-bold text-emerald-800 tabular-nums">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">วินาที</span>
                </div>
              </div>

              <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>สถานที่: {COMPANY_INFO.location}</span>
                <span className="text-emerald-700 font-medium">มีอาหารว่างบริการฟรี</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
