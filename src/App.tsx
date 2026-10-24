import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroAnnouncement } from './components/HeroAnnouncement';
import { EmployeeRosterDirectory } from './components/EmployeeRosterDirectory';
import { PersonalPrepChecker } from './components/PersonalPrepChecker';
import { InteractiveChecklist } from './components/InteractiveChecklist';
import { StationsMap } from './components/StationsMap';
import { ScheduleSlots } from './components/ScheduleSlots';
import { FaqSection } from './components/FaqSection';
import { CalendarModal } from './components/CalendarModal';
import { ContactHrModal } from './components/ContactHrModal';
import { Footer } from './components/Footer';
import { AlertCircle, CreditCard, UtensilsCrossed } from 'lucide-react';

export default function App() {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [hrModalOpen, setHrModalOpen] = useState(false);

  const scrollToPrep = () => {
    const el = document.getElementById('prep-checker');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToRoster = () => {
    const el = document.getElementById('roster');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Banner Notice: Compact Summary for Instant Glancing */}
      <div className="bg-emerald-900 text-white text-xs py-2 px-4 text-center border-b border-emerald-950 font-medium">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
            <span>วันตรวจสุขภาพ: เสาร์ที่ 7 พฤศจิกายน 2569 เวลา 06.00 – 16.00 น.</span>
          </span>
          <span className="hidden sm:inline text-emerald-300">|</span>
          <span className="flex items-center gap-1.5 text-amber-200">
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>อายุ 35+ งดน้ำอาหารหลัง 24.00 น. (คืนวันที่ 6 พ.ย.)</span>
          </span>
          <span className="hidden sm:inline text-emerald-300">|</span>
          <span className="flex items-center gap-1.5 text-blue-200">
            <CreditCard className="w-3.5 h-3.5" />
            <span>พกบัตรประชาชนตัวจริงมาด้วยทุกท่าน</span>
          </span>
        </div>
      </div>

      {/* Primary Header */}
      <Header onOpenCheckupTool={scrollToRoster} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <HeroAnnouncement
          onScrollToPrep={scrollToPrep}
          onScrollToRoster={scrollToRoster}
          onOpenCalendarModal={() => setCalendarOpen(true)}
        />

        <EmployeeRosterDirectory />

        <PersonalPrepChecker />

        <InteractiveChecklist />

        <StationsMap />

        <ScheduleSlots />

        <FaqSection />
      </main>

      {/* Footer */}
      <Footer onOpenHrModal={() => setHrModalOpen(true)} />

      {/* Modals */}
      <CalendarModal
        isOpen={calendarOpen}
        onClose={() => setCalendarOpen(false)}
      />

      <ContactHrModal
        isOpen={hrModalOpen}
        onClose={() => setHrModalOpen(false)}
      />
    </div>
  );
}
