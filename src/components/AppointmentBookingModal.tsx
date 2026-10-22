import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, User, Phone, CheckCircle2, Sparkles, Send, Headphones, Heart } from 'lucide-react';
import { Language, AppointmentFormData } from '../types';
import { translations } from '../data/translations';
import { clinicServices } from '../data/clinicData';
import { getTodayJalali, PERSIAN_MONTH_NAMES, toPersianDigits } from '../utils/jalali';

interface Props {
  isOpen: boolean;
  currentLang: Language;
  preselectedServiceId?: string;
  onClose: () => void;
}

export const AppointmentBookingModal: React.FC<Props> = ({
  isOpen,
  currentLang,
  preselectedServiceId,
  onClose,
}) => {
  const t = translations[currentLang];
  const todayJalali = useMemo(() => getTodayJalali(), []);

  const [selectedDay, setSelectedDay] = useState<number>(todayJalali.jd);
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number>(todayJalali.jm - 1);
  const [selectedYear, setSelectedYear] = useState<number>(todayJalali.jy);

  const jalaliYears = useMemo(() => [todayJalali.jy, todayJalali.jy + 1], [todayJalali.jy]);
  const jalaliDays = useMemo(() => Array.from({ length: 31 }, (_, i) => i + 1), []);

  const initialFormattedDate = `${toPersianDigits(todayJalali.jd)} ${PERSIAN_MONTH_NAMES[todayJalali.jm - 1]} ${toPersianDigits(todayJalali.jy)}`;

  const [formData, setFormData] = useState<AppointmentFormData>({
    fullName: '',
    phone: '',
    serviceId: preselectedServiceId || 'cosmetic-design',
    preferredDate: initialFormattedDate,
    preferredTimeSlot: '10:00 - 12:00',
    notes: '',
  });

  const handleDateChange = (d: number, mIdx: number, y: number) => {
    setSelectedDay(d);
    setSelectedMonthIndex(mIdx);
    setSelectedYear(y);
    const dateFormatted = `${toPersianDigits(d)} ${PERSIAN_MONTH_NAMES[mIdx]} ${toPersianDigits(y)}`;
    setFormData((prev) => ({ ...prev, preferredDate: dateFormatted }));
  };

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [trackingCode, setTrackingCode] = useState('');

  const timeSlots = [
    '09:00 - 11:00',
    '11:00 - 13:00',
    '14:00 - 16:00',
    '16:00 - 18:00',
    '18:00 - 20:00',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.phone) {
      alert('لطفاً نام و شماره تلفن را وارد کنید.');
      return;
    }

    const randomCode = 'DS-' + Math.floor(100000 + Math.random() * 900000);
    setTrackingCode(randomCode);
    setIsSubmitted(true);

    // Save appointment locally
    const existing = JSON.parse(localStorage.getItem('clinic_appointments') || '[]');
    existing.push({ ...formData, trackingCode: randomCode, dateCreated: new Date().toISOString() });
    localStorage.setItem('clinic_appointments', JSON.stringify(existing));

    // Automatically trigger WhatsApp dispatch with all information
    const selectedService = clinicServices.find((s) => s.id === formData.serviceId);
    const serviceTitle = selectedService ? t[selectedService.titleKey] || selectedService.titleKey : formData.serviceId;

    const textMessage = `سلام، درخواست رزرو نوبت دندانپزشکی در مطب دکتر آرزو ساریخانی:\n\n👤 *نام و نام خانوادگی:* ${formData.fullName}\n📞 *شماره همراه:* ${formData.phone}\n🦷 *خدمت درخواستی:* ${serviceTitle}\n📅 *تاریخ پیشنهادی:* ${formData.preferredDate}\n⏰ *ساعت پیشنهادی:* ${formData.preferredTimeSlot}\n🔑 *کد پیگیری:* ${randomCode}\n💬 *توضیحات:* ${formData.notes || 'ندارد'}\n\n⚠️ توجه: برای تایید نهایی نوبت با مشاورین مطب در تماس باشید.`;

    const url = `https://wa.me/989380454547?text=${encodeURIComponent(textMessage)}`;
    window.open(url, '_blank');
  };

  const handleWhatsAppDispatch = () => {
    const selectedService = clinicServices.find((s) => s.id === formData.serviceId);
    const serviceTitle = selectedService ? t[selectedService.titleKey] || selectedService.titleKey : formData.serviceId;

    const textMessage = `سلام، درخواست رزرو نوبت جدید دندانپزشکی:\n\n👤 *نام بیمار:* ${formData.fullName}\n📞 *تلفن:* ${formData.phone}\n🦷 *خدمت:* ${serviceTitle}\n📅 *تاریخ:* ${formData.preferredDate}\n⏰ *ساعت:* ${formData.preferredTimeSlot}\n🔑 *کد پیگیری:* ${trackingCode}\n💬 *توضیحات:* ${formData.notes || 'ندارد'}`;

    const url = `https://wa.me/989380454547?text=${encodeURIComponent(textMessage)}`;
    window.open(url, '_blank');
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-sky-100 z-10 text-slate-800 my-8"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 left-6 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {!isSubmitted ? (
              <div>
                {/* Header */}
                <div className="mb-8 text-right">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                    <span>{t.bookingTitle}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
                    {t.bookingHeading}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    {t.bookingSubtitle}
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6 text-right">
                  {/* Step 1: Patient Details */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <User className="w-4 h-4 text-sky-500" />
                      <span>{t.step3}</span>
                    </h3>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          {t.inputFullName} *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder={t.inputFullNamePlaceholder}
                          className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          {t.inputPhone} *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder={t.inputPhonePlaceholder}
                          className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Treatment & Date */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-sky-500" />
                      <span>{t.step1} و {t.step2}</span>
                    </h3>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {t.inputService}
                      </label>
                      <select
                        value={formData.serviceId}
                        onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-sky-500"
                      >
                        {clinicServices.map((s) => (
                          <option key={s.id} value={s.id}>
                            {t[s.titleKey] || s.titleKey}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                          <span>{t.inputDate} (روز / ماه / سال شمسی)</span>
                          <span className="text-[10px] text-sky-600 font-extrabold">تقویم خورشیدی</span>
                        </label>
                        <div className="grid grid-cols-3 gap-1.5">
                          {/* Day Select */}
                          <select
                            value={selectedDay}
                            onChange={(e) => handleDateChange(Number(e.target.value), selectedMonthIndex, selectedYear)}
                            className="w-full px-2 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm focus:outline-none focus:border-sky-500 font-medium cursor-pointer"
                          >
                            {jalaliDays.map((day) => (
                              <option key={day} value={day}>
                                {toPersianDigits(day)}
                              </option>
                            ))}
                          </select>

                          {/* Month Select */}
                          <select
                            value={selectedMonthIndex}
                            onChange={(e) => handleDateChange(selectedDay, Number(e.target.value), selectedYear)}
                            className="w-full px-1.5 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm focus:outline-none focus:border-sky-500 font-medium cursor-pointer"
                          >
                            {PERSIAN_MONTH_NAMES.map((monthName, idx) => (
                              <option key={monthName} value={idx}>
                                {monthName}
                              </option>
                            ))}
                          </select>

                          {/* Year Select */}
                          <select
                            value={selectedYear}
                            onChange={(e) => handleDateChange(selectedDay, selectedMonthIndex, Number(e.target.value))}
                            className="w-full px-1.5 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm focus:outline-none focus:border-sky-500 font-medium cursor-pointer"
                          >
                            {jalaliYears.map((yr) => (
                              <option key={yr} value={yr}>
                                {toPersianDigits(yr)}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          {t.inputTimeSlot}
                        </label>
                        <select
                          value={formData.preferredTimeSlot}
                          onChange={(e) => setFormData({ ...formData, preferredTimeSlot: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-sky-500"
                        >
                          {timeSlots.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t.inputNotes}
                    </label>
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="توضیحات حساسیت، جراحی‌های قبلی یا سوال..."
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-4 px-6 bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600 text-white font-black text-base rounded-2xl shadow-xl shadow-sky-500/25 flex items-center justify-center gap-2 transition-all"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>{t.submitBooking}</span>
                  </motion.button>
                </form>
              </div>
            ) : (
              /* Success Confirmation View */
              <div className="text-center py-6 space-y-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-lg"
                >
                  <CheckCircle2 className="w-10 h-10" />
                </motion.div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
                    {t.bookingSuccessTitle}
                  </h2>
                  <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                    {t.bookingSuccessDesc}
                  </p>
                </div>

                {/* Consultant Confirmation Notice Box */}
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm font-bold max-w-md mx-auto text-right flex items-center gap-3 shadow-sm">
                  <div className="w-8 h-8 rounded-xl bg-amber-200 text-amber-800 flex items-center justify-center shrink-0 font-extrabold text-base">
                    ⚠️
                  </div>
                  <div>
                    {t.bookingConfirmNotice || 'برای تایید نهایی نوبت حتماً با مشاورین مطب در تماس باشید.'}
                  </div>
                </div>

                {/* Tracking Code Card */}
                <div className="p-6 rounded-2xl bg-sky-50 border border-sky-200 max-w-sm mx-auto">
                  <div className="text-xs font-bold text-slate-500 mb-1">
                    {t.trackingCode}
                  </div>
                  <div className="text-2xl font-black font-mono text-sky-700 tracking-wider">
                    {trackingCode}
                  </div>
                </div>

                {/* WhatsApp Dispatch Button */}
                <div className="space-y-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleWhatsAppDispatch}
                    className="w-full max-w-sm mx-auto py-4 px-6 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-base rounded-2xl shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all"
                  >
                    <Send className="w-5 h-5" />
                    <span>{t.sendWhatsAppDirect}</span>
                  </motion.button>

                  <button
                    onClick={handleReset}
                    className="block mx-auto text-xs font-bold text-slate-400 hover:text-slate-600 pt-2"
                  >
                    بستن پنجره
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
