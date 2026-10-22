import { ServiceItem, DigitalTechItem, SearchItem } from '../types';

export const clinicServices: ServiceItem[] = [
  {
    id: 'gum-surgery-laser',
    titleKey: 'serviceGumSurgeryTitle',
    descKey: 'serviceGumSurgeryDesc',
    category: 'surgery',
    icon: 'Scissors',
    benefits: ['جراحی لثه با لیزر بدون خونریزی', 'اصلاح لبخند لثه‌ای (Gummy Smile)', 'جراحی افزایش طول تاج دندان (CLP)', 'پیوند و ترمیم بافت آسیب‌دیده لثه'],
    durationMinutes: 45,
    popular: true,
  },
  {
    id: 'endo-root-canal',
    titleKey: 'serviceEndoTitle',
    descKey: 'serviceEndoDesc',
    category: 'restorative',
    icon: 'Activity',
    benefits: ['اندو و عصب‌کشی تخصصی', 'ری‌اندو (درمان مجدد ریشه)', 'دستگاه روتاری دیجیتال', 'بدون درد و خونریزی'],
    durationMinutes: 45,
    popular: true,
  },
  {
    id: 'cosmetic-laminate-composite',
    titleKey: 'serviceCosmeticTitle',
    descKey: 'serviceCosmeticDesc',
    category: 'cosmetic',
    icon: 'Sparkles',
    benefits: ['طراحی لبخند دیجیتال', 'لمینت سرامیکی کم‌تراش', 'کامپوزیت ونیر تک‌جلسه‌ای', 'ظاهر کاملاً طبیعی'],
    durationMinutes: 60,
    popular: true,
  },
  {
    id: 'restorative-crowns',
    titleKey: 'serviceRestorativeTitle',
    descKey: 'serviceRestorativeDesc',
    category: 'restorative',
    icon: 'ShieldCheck',
    benefits: ['روکش زیرکونیا و سرامیک', 'ترمیم هم‌رنگ دندان', 'استحکام فوق‌العاده', 'تطابق کامل با بافت دهان'],
    durationMinutes: 45,
    popular: true,
  },
  {
    id: 'dental-implants',
    titleKey: 'serviceImplantTitle',
    descKey: 'serviceImplantDesc',
    category: 'restorative',
    icon: 'ShieldCheck',
    benefits: ['کاشت ایمپلنت دیجیتال', 'برندهای معتبر جهانی', 'ماندگاری دائمی', 'حس طبیعی دندان واقع'],
    durationMinutes: 60,
    popular: true,
  },
  {
    id: 'pediatric-dental',
    titleKey: 'servicePediatricTitle',
    descKey: 'servicePediatricDesc',
    category: 'preventive',
    icon: 'HeartPulse',
    benefits: ['محیط صمیمی و بدون استرس', 'فلورایدتراپی و فیشورسیلانت', 'ترمیم دندان‌های شیری', 'آموزش بهداشت کودک'],
    durationMinutes: 30,
  },
];

export const digitalTechSuite: DigitalTechItem[] = [
  {
    id: 'scanner-3d',
    titleKey: 'techScannerTitle',
    descKey: 'techScannerDesc',
    tagKey: '3D Precision',
    icon: 'Scan',
    highlightKey: 'Micron Precision',
  },
  {
    id: 'computer-anesthesia',
    titleKey: 'techAnesthesiaTitle',
    descKey: 'techAnesthesiaDesc',
    tagKey: '100% Painless',
    icon: 'Syringe',
    highlightKey: 'Zero Needle Fear',
  },
  {
    id: 'laser-soft-tissue',
    titleKey: 'techLaserTitle',
    descKey: 'techLaserDesc',
    tagKey: 'Laser Care',
    icon: 'Zap',
    highlightKey: 'Stitch-free Recovery',
  },
  {
    id: 'ai-smile-preview',
    titleKey: 'techAiSmileTitle',
    descKey: 'techAiSmileDesc',
    tagKey: 'Interactive Preview',
    icon: 'Bot',
    highlightKey: 'See Before You Treat',
  },
];

export const searchIndex: SearchItem[] = [
  {
    id: 's1',
    title: {
      fa: 'دندانپزشکی زیبایی و لمینت سرامیکی',
      en: 'Cosmetic Dentistry & Porcelain Laminates',
      ar: 'طب الأسنان التجميلي والفينير السيراميكي',
    },
    description: {
      fa: 'طراحی لبخند، بلیچینگ و لمینت‌های باکیفیت بدون تراش',
      en: 'Smile design, whitening, and ultra-thin veneers',
      ar: 'تصميم الابتسامة، التبييض وقشور الفينير بدون برد',
    },
    category: 'Services',
    targetSectionId: 'services',
    badge: 'Popular',
  },
  {
    id: 's2',
    title: {
      fa: 'بی‌حسی کامپیوتری بدون درد',
      en: 'Painless Computerized Anesthesia',
      ar: 'التخدير الحاسوبي بدون ألم',
    },
    description: {
      fa: 'تزریق کاملاً بدون حس سوزن با کنترل کامپیوتر',
      en: 'Needle-free controlled numbing system',
      ar: 'تخدير إلكتروني بدون ألم الإبرة',
    },
    category: 'Technology',
    targetSectionId: 'tech',
  },
  {
    id: 's3',
    title: {
      fa: 'آدرس و شماره تلفن مطب دکتر ساریخانی',
      en: 'Clinic Address & Direct Phone Number',
      ar: 'عنوان العيادة ورقم الهاتف المباشر',
    },
    description: {
      fa: 'تهرانپارس، بلوار شاهد، بین ۲۰۸ و ۲۱۰، پلاک ۳۰۱، طبقه ۴ - ۰۹۳۸۰۴۵۴۵۴۷',
      en: 'Tehranpars, Shahd Blvd, No. 301, 4th Fl - +989380454547',
      ar: 'طهرانپارس، شارع شاهد، رقم 301، الطابق 4 - 09380454547',
    },
    category: 'Contact',
    targetSectionId: 'contact',
  },
  {
    id: 's4',
    title: {
      fa: 'ساعات کاری و روزهای حضور دکتر',
      en: 'Clinic Working Hours & Schedule',
      ar: 'أوقات العمل وساعات الدوام',
    },
    description: {
      fa: 'شنبه تا پنج‌شنبه از ساعت ۹:۰۰ صبح الی ۲۰:۰۰ شب',
      en: 'Saturday to Thursday: 9:00 AM – 8:00 PM',
      ar: 'من السبت إلى الخميس: 9:00 صباحاً حتى 8:00 مساءً',
    },
    category: 'Hours',
    targetSectionId: 'contact',
  },
  {
    id: 's5',
    title: {
      fa: 'ایمپلنت دیجیتال و روکش زيرکونيا',
      en: 'Digital Dental Implants & Zirconia Crowns',
      ar: 'الزراعة الرقمية وتيجان الزيركون',
    },
    description: {
      fa: 'جایگزینی دندان با بالاترین استحکام و ظاهر کاملاً طبیعی',
      en: 'High strength, natural looking tooth replacement',
      ar: 'استبدال الأسنان بأعلى متانة ومظهر طبيعي',
    },
    category: 'Services',
    targetSectionId: 'services',
  },
  {
    id: 's7',
    title: {
      fa: 'سوابق و مدارک دکتر آرزو ساریخانی',
      en: 'Dr. Arezou Sarikhani Qualifications & Education',
      ar: 'مؤهلات الدكتورة آرزو ساريخاني وخبرتها',
    },
    description: {
      fa: 'دکترای دندانپزشکی از دانشگاه شهید بهشتی با ۱۰+ سال تجربه',
      en: 'DDS from Shahid Beheshti University with 10+ yrs exp',
      ar: 'دكتوراه من جامعة شهيد بهشتي بخبرة +10 سنوات',
    },
    category: 'Doctor',
    targetSectionId: 'about',
  },
];

