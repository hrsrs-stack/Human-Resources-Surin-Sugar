import React from 'react';
import { COMPANY_INFO } from '../data/mockData';
import { Calendar, Download, ExternalLink, X, Clock, MapPin } from 'lucide-react';

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CalendarModal: React.FC<CalendarModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const eventTitle = encodeURIComponent('การตรวจสุขภาพประจำปี 2569 | บริษัท น้ำตาลสุรินทร์ จำกัด');
  const eventDetails = encodeURIComponent(
    'การตรวจสุขภาพประจำปี 2569 บริษัท น้ำตาลสุรินทร์ จำกัด (เครือเคไอ ชูการ์ กรุ๊ป)\n' +
    'เวลา 06.00 - 16.00 น.\n\n' +
    'ข้อปฏิบัติสำคัญ:\n' +
    '1. พนักงานอายุ 35 ปีขึ้นไป: งดน้ำและอาหารทุกชนิดหลังเที่ยงคืน คืนวันศุกร์ที่ 6 พ.ย. 2569\n' +
    '2. ต้องพกบัตรประจำตัวประชาชนตัวจริงมาด้วยทุกท่าน เพื่อนำมายืนยันสิทธิ์กับเครื่อง Smart Card\n' +
    'สุขภาพดีเริ่มต้นที่ตัวเรา'
  );
  const eventLocation = encodeURIComponent(COMPANY_INFO.location);
  // 2026-11-07 06:00:00 to 16:00:00 Bangkok Time (UTC+7 -> 20261106T230000Z to 20261107T090000Z)
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=20261106T230000Z/20261107T090000Z&details=${eventDetails}&location=${eventLocation}`;

  // Generate .ics file for Apple Calendar / Outlook
  const downloadIcs = () => {
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Surin Sugar Co Ltd//Health Checkup 2569//TH',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:surin-sugar-health-checkup-2569@kisugargroup.com',
      'DTSTAMP:20261024T000000Z',
      'DTSTART:20261106T230000Z',
      'DTEND:20261107T090000Z',
      'SUMMARY:การตรวจสุขภาพประจำปี 2569 | บจก.น้ำตาลสุรินทร์',
      'DESCRIPTION:การตรวจสุขภาพประจำปี 2569 บริษัท น้ำตาลสุรินทร์ จำกัด\\n- อายุ 35 ปีขึ้นไป งดน้ำและอาหารหลัง 24.00 น. คืน 6 พ.ย.\\n- พกบัตรประชาชนตัวจริงมาด้วยทุกคน',
      'LOCATION:ห้องประชุมใหญ่ บจก.น้ำตาลสุรินทร์',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'surin_sugar_health_checkup_2569.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 relative animate-in fade-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900">
              เพิ่มลงปฏิทินเตือนความจำ
            </h3>
            <span className="text-xs text-slate-500">
              บันทึกวันตรวจสุขภาพลงในโทรศัพท์หรือคอมพิวเตอร์
            </span>
          </div>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-2 mb-5 text-xs text-slate-600">
          <div className="flex items-center gap-2 text-slate-900 font-semibold">
            <Calendar className="w-4 h-4 text-emerald-800" />
            <span>{COMPANY_INFO.checkupDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-500" />
            <span className="tabular-nums">{COMPANY_INFO.checkupTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-slate-500" />
            <span>{COMPANY_INFO.location}</span>
          </div>
        </div>

        <div className="space-y-2.5">
          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <ExternalLink className="w-4 h-4" />
            <span>เพิ่มลงใน Google Calendar</span>
          </a>

          <button
            onClick={downloadIcs}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors border border-slate-200"
          >
            <Download className="w-4 h-4 text-slate-600" />
            <span>ดาวน์โหลดไฟล์ปฏิทิน iCal (.ics)</span>
          </button>
        </div>

        <p className="text-[11px] text-center text-slate-400 mt-4">
          รองรับ iPhone, Android, Google Calendar และ Outlook
        </p>
      </div>
    </div>
  );
};
