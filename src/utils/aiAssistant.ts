// Client-side AI Dental Assistant Knowledge Engine
// Provides human-like, line-by-line response fallback without breaking on Finglish or non-exact queries

interface BotResponse {
  text: string;
}

const CLINIC_PHONE = '۰۹۳۸۰۴۵۴۵۴۷';
const CLINIC_PHONE_EN = '+98 938 045 4547';

export function generateClientAiResponse(userInput: string, language: string = 'fa'): BotResponse {
  const q = userInput.toLowerCase().trim();

  // Determine actual target language from site currentLang
  const isEnglishSite = language === 'en';
  const isArabicSite = language === 'ar';

  // 1. PRICE & COST QUERIES (STRICT RULE: NEVER give price estimates or numbers)
  const isPriceQuery =
    q.includes('قیمت') ||
    q.includes('هزینه') ||
    q.includes('چقدر') ||
    q.includes('تعرفه') ||
    q.includes('اقساط') ||
    q.includes('قسط') ||
    q.includes('ارزون') ||
    q.includes('ارزان') ||
    q.includes('ارزونی') ||
    q.includes('گران') ||
    q.includes('گرون') ||
    q.includes('میلیون') ||
    q.includes('تومان') ||
    q.includes('تومن') ||
    q.includes('مبلغ') ||
    q.includes('چنده') ||
    q.includes('چند') ||
    q.includes('پول') ||
    q.includes('تخفیف') ||
    // Finglish price terms
    q.includes('gheymat') ||
    q.includes('gheimat') ||
    q.includes('ghimat') ||
    q.includes('hazine') ||
    q.includes('hazineh') ||
    q.includes('hazinh') ||
    q.includes('arzan') ||
    q.includes('arzoni') ||
    q.includes('ezan') ||
    q.includes('ezani') ||
    q.includes('chande') ||
    q.includes('chand') ||
    q.includes('aghsat') ||
    q.includes('ghist') ||
    q.includes('toman') ||
    q.includes('tomen') ||
    q.includes('price') ||
    q.includes('cost') ||
    q.includes('fee') ||
    q.includes('cheap') ||
    q.includes('expensive') ||
    q.includes('discount');

  if (isPriceQuery) {
    if (isEnglishSite) {
      return {
        text: `Exact treatment costs can NEVER be determined without a personal clinical examination.\n\nDr. Arezou Sarikhani must examine your teeth in person or review your OPG X-ray to determine the treatment plan.\n\nPlease contact our clinic advisors directly on WhatsApp at ${CLINIC_PHONE_EN} to send your photo and speak with an advisor.`,
      };
    }
    if (isArabicSite) {
      return {
        text: `برآورد و اعلام هزینه دقیق بدون معاینه حضوری امکان‌پذیر نیست.\n\nتشخیص نهایی و طرح درمان حتماً باید توسط خانم دکتر آرزو ساریخانی پس از معاینه حضوری انجام بشه.\n\nجهت ارسال عکس دندان و مشاوره با مشاورین مطب، در واتس‌اپ به شماره ${CLINIC_PHONE} پیام بدید.`,
      };
    }
    return {
      text: `سلام عزیزم 🌸\n\nبرآورد و اعلام هزینه دقیق بدون معاینه حضوری به هیچ وجه امکان‌پذیر نیست.\n\nتشخیص نهایی و تعیین طرح درمان حتماً باید توسط خانم دکتر آرزو ساریخانی پس از معاینه دندان از نزدیک انجام بشه.\n\nجهت ارتباط مستقیم با مشاورین مطب و ارسال عکس دندون‌هاتون، لطفاً در واتس‌اپ به شماره ${CLINIC_PHONE} پیام بدید تا مشاورین سریعاً راهنماییتون کنن.`,
    };
  }

  // 2. EXPLICIT OFF-TOPIC QUERIES (Outside dental scope)
  const isExplicitlyOffTopic =
    q.includes('هوا') ||
    q.includes('بارون') ||
    q.includes('پیتزا') ||
    q.includes('غذا') ||
    q.includes('فوتبال') ||
    q.includes('استقلال') ||
    q.includes('پرسپولیس') ||
    q.includes('ماشین') ||
    q.includes('برنامه نویسی') ||
    q.includes('کامپیوتر') ||
    q.includes('گوشی') ||
    q.includes('موسیقی') ||
    q.includes('فیلم') ||
    q.includes('weather') ||
    q.includes('football') ||
    q.includes('movie');

  if (isExplicitlyOffTopic) {
    if (isEnglishSite) {
      return {
        text: `I am the AI assistant for Dr. Arezou Sarikhani Dental Clinic.\n\nI can only assist with dental services, location details, and appointments.\n\nHow can I help you regarding your dental health or connecting with our clinic advisors?`,
      };
    }
    return {
      text: `من دستیار مطب دندانپزشکی خانم دکتر آرزو ساریخانی هستم. 😊\n\nمن فقط می‌تونم در زمینه خدمات دندانپزشکی، آدرس مطب، مشاوره درمان و نوبت‌دهی راهنماییتون کنم.\n\nچطور می‌تونم در زمینه سلامت یا زیبایی دندان‌هاتون یا ارتباط با مشاورین مطب کمکتون کنم؟`,
    };
  }

  // 3. ENGLISH SITE LANGUAGE
  if (isEnglishSite) {
    if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
      return {
        text: `Hello! Welcome to Dr. Arezou Sarikhani Dental Clinic.\n\nI am here to guide you and connect you with our expert clinic advisors.\n\nHow can we help you with your dental care or booking today?`,
      };
    }
    if (q.includes('address') || q.includes('location') || q.includes('where') || q.includes('map')) {
      return {
        text: `📍 Clinic Address:\nTehranpars, Shahd Blvd, Between 208th & 210th St, No. 301, 4th Floor, Unit 8, Tehran.\n\n📞 Direct Phone & WhatsApp for Advisors:\n${CLINIC_PHONE_EN}`,
      };
    }
    if (q.includes('time') || q.includes('hour') || q.includes('open') || q.includes('day')) {
      return {
        text: `⏰ Working Hours:\nSaturday to Thursday: 9:00 AM – 8:00 PM.\n\nAll visits require prior examination and appointment with Dr. Sarikhani.`,
      };
    }
    return {
      text: `Thank you for reaching out to Dr. Arezou Sarikhani Dental Clinic.\n\nPlease note that clinical diagnosis must be conducted in person by Dr. Sarikhani.\n\nTo speak directly with our clinic advisors or book a consultation, please call or WhatsApp ${CLINIC_PHONE_EN}.`,
    };
  }

  // 4. ARABIC SITE LANGUAGE
  if (isArabicSite) {
    return {
      text: `أهلاً وسهلاً بك في عيادة الدكتورة آرزو ساريخاني لطب وتجميل الأسنان.\n\nيرجى العلم أن التشخيص النهائي يتطلب معاينة حضورية من قبل الدكتورة آرزو ساريخاني.\n\nللتواصل المباشر مع مستشاري العيادة أو حجز موعد، يرجى الاتصال أو المراسلة عبر الواتساب على الرقم 09380454547.`,
    };
  }

  // 5. PERSIAN / FARSI / FINGLISH HUMAN RESPONSE ENGINE

  // Greetings
  if (
    q.includes('سلام') ||
    q.includes('درود') ||
    q.includes('روز بخیر') ||
    q.includes('صبح بخیر') ||
    q.includes('عصر بخیر') ||
    q.includes('خوبی') ||
    q.includes('چطوری') ||
    q.includes('وقت بخیر') ||
    q.includes('salam') ||
    q.includes('slm') ||
    q.includes('dorood') ||
    q.includes('khobi') ||
    q.includes('chetori')
  ) {
    return {
      text: `سلام! وقت شما بخیر 🌸\n\nخوش آمدید به سیستم پاسخگویی مطب دندانپزشکی دکتر آرزو ساریخانی.\n\nمن اینجم تا شما رو به مشاورین متخصص مطب وصل کنم.\n\nچطور می‌تونم راهنماییتون کنم؟`,
    };
  }

  // Address & Location & Navigation & Subway
  if (
    q.includes('آدرس') ||
    q.includes('کجاست') ||
    q.includes('کجا') ||
    q.includes('لوکیشن') ||
    q.includes('مکان') ||
    q.includes('مسیر') ||
    q.includes('مترو') ||
    q.includes('تهرانپارس') ||
    q.includes('شاهد') ||
    q.includes('تلفن') ||
    q.includes('شماره') ||
    q.includes('تماس') ||
    q.includes('واتس') ||
    q.includes('واتساپ') ||
    q.includes('address') ||
    q.includes('location') ||
    q.includes('kojast') ||
    q.includes('koja') ||
    q.includes('tehranpars') ||
    q.includes('shomare') ||
    q.includes('tamas')
  ) {
    return {
      text: `📍 آدرس مطب خانم دکتر آرزو ساریخانی:\nتهرانپارس، بلوار شاهد، بین خیابان‌های ۲۰۸ و ۲۱۰، پلاک ۳۰۱، طبقه ۴، واحد ۸.\n\n🚇 نزدیک به ایستگاه مترو تهرانپارس.\n\n📞 تلفن مستقیم و واتس‌اپ مشاورین مطب:\n${CLINIC_PHONE}\n\nجهت هماهنگی زمان معاینه حتماً قبل از مراجعه با مشاورین تماس بگیرید.`,
    };
  }

  // Working Hours & Days
  if (
    q.includes('ساعت') ||
    q.includes('زمان') ||
    q.includes('چه روزهای') ||
    q.includes('روزها') ||
    q.includes('امروز') ||
    q.includes('جمعه') ||
    q.includes('تعطیل') ||
    q.includes('باز') ||
    q.includes('ساعات کاری') ||
    q.includes('saat') ||
    q.includes('zamani') ||
    q.includes('roz') ||
    q.includes('ruz')
  ) {
    return {
      text: `⏰ ساعات کاری مطب:\nشنبه تا پنج‌شنبه از ساعت ۹:۰۰ صبح الی ۲۰:۰۰ شب.\n\nمعاینه و ویزیت فقط با وقت قبلی توسط خانم دکتر انجام میشه.\n\nبرای رزرو نوبت معاینه حضوری می‌تونید با شماره ${CLINIC_PHONE} تماس بگیرید یا در واتس‌اپ پیام بدید.`,
    };
  }

  // Appointments & Booking & Visits
  if (
    q.includes('نوبت') ||
    q.includes('وقت') ||
    q.includes('رزرو') ||
    q.includes('بیام') ||
    q.includes('ویزیت') ||
    q.includes('معاینه') ||
    q.includes('ثبت') ||
    q.includes('میخوام بیام') ||
    q.includes('nobat') ||
    q.includes('vaght') ||
    q.includes('rezerv') ||
    q.includes('visite') ||
    q.includes('moayene')
  ) {
    return {
      text: `جهت دریافت نوبت معاینه حضوری توسط خانم دکتر آرزو ساریخانی:\n\n۱. می‌تونید از دکمه «دریافت نوبت آنلاین» بالای صفحه استفاده کنید.\n\n۲. یا همین الان در واتس‌اپ به شماره ${CLINIC_PHONE} پیام بدید تا مشاورین مطب سریعاً نوبتتون رو ثبت کنن.`,
    };
  }

  // Cosmetic / Laminate / Composite / Smile Design / Whitening
  if (
    q.includes('لمینت') ||
    q.includes('کامپوزیت') ||
    q.includes('زیبایی') ||
    q.includes('لبخند') ||
    q.includes('سفید') ||
    q.includes('بلیچینگ') ||
    q.includes('dsd') ||
    q.includes('ونیر') ||
    q.includes('جرمگیری') ||
    q.includes('تراش') ||
    q.includes('laminate') ||
    q.includes('laminat') ||
    q.includes('composite') ||
    q.includes('kompozit') ||
    q.includes('zibayi') ||
    q.includes('zibai') ||
    q.includes('bleaching')
  ) {
    return {
      text: `در مطب خانم دکتر آرزو ساریخانی خدمات تخصصی زیبایی (لمینت، کامپوزیت، بلیچینگ و DSD) انجام میشه.\n\nانتخاب بهترین روش زیبایی کاملاً بستگی به فرم دندان، فک و تشخیص شخصی خانم دکتر داره.\n\nدکتر حتماً باید دندان‌های شما رو از نزدیک معاینه کنن تا نظر دقیق بدند.\n\nلطفاً برای مشاوره اولیه و ارسال عکس دندان به مشاورین مطب، در واتس‌اپ به شماره ${CLINIC_PHONE} پیام بدید.`,
    };
  }

  // Painless Computerized Anesthesia / Pain / Fear
  if (
    q.includes('درد') ||
    q.includes('بی حسی') ||
    q.includes('بی‌حسی') ||
    q.includes('آمپول') ||
    q.includes('سوزن') ||
    q.includes('ترس') ||
    q.includes('استرس') ||
    q.includes('dard') ||
    q.includes('bihesi') ||
    q.includes('bihisi') ||
    q.includes('ampool') ||
    q.includes('tars')
  ) {
    return {
      text: `در مطب دکتر ساریخانی تزریق بی‌حسی با دستگاه دیجیتال و بدون درد انجام میشه.\n\nاصلاً نگران درد یا استرس درمان نباشید.\n\nبرای صحبت با مشاورین مطب و دریافت راهنمایی بیشتر می‌تونید با شماره ${CLINIC_PHONE} تماس بگیرید.`,
    };
  }

  // Implant / Crown / Endo / General Treatment / Toothache
  if (
    q.includes('ایمپلنت') ||
    q.includes('کاشت') ||
    q.includes('روکش') ||
    q.includes('عصب') ||
    q.includes('لثه') ||
    q.includes('پرکردن') ||
    q.includes('پُر') ||
    q.includes('ترمیم') ||
    q.includes('دندون') ||
    q.includes('دندان') ||
    q.includes('خراب') ||
    q.includes('شکسته') ||
    q.includes('implant') ||
    q.includes('rokesh') ||
    q.includes('asab') ||
    q.includes('dandun') ||
    q.includes('dandan')
  ) {
    return {
      text: `تشخیص و نحوه درمان این مورد فقط و فقط باید توسط خانم دکتر آرزو ساریخانی پس از معاینه حضوری یا بررسی عکس رادیولوژی اعلام بشه.\n\nهیچ نظری بدون معاینه مستقیم دکتر صادر نمیشه.\n\nجهت ارسال عکس دندان یا هماهنگی وقت معاینه حضوری، در واتس‌اپ به شماره ${CLINIC_PHONE} پیام بدید تا مشاورین مطب شما رو راهنمایی کنن.`,
    };
  }

  // Doctor Credentials
  if (
    q.includes('دکتر') ||
    q.includes('ساریخانی') ||
    q.includes('آرزو') ||
    q.includes('سابقه') ||
    q.includes('رزومه') ||
    q.includes('دانشگاه') ||
    q.includes('dr') ||
    q.includes('doctor') ||
    q.includes('sarikhani') ||
    q.includes('arezou') ||
    q.includes('arezoo')
  ) {
    return {
      text: `خانم دکتر آرزو ساریخانی جراح و دندانپزشک، فارغ‌التحصیل دانشگاه علوم پزشکی شهید بهشتی با بیش از ۱۰ سال سابقه تخصصی هستند.\n\nتمامی مراحل درمان زیر نظر مستقیم ایشون انجام میشه.\n\nبرای هماهنگی وقت ویزیت حضوری با شماره ${CLINIC_PHONE} تماس بگیرید.`,
    };
  }

  // Insurance / Bimeh
  if (
    q.includes('بیمه') ||
    q.includes('تکمیلی') ||
    q.includes('فاکتور') ||
    q.includes('دفترچه') ||
    q.includes('bimeh') ||
    q.includes('bime')
  ) {
    return {
      text: `برای تمامی خدمات انجام شده در مطب، گواهی معتبر جهت دریافت هزینه از بیمه‌های تکمیلی ارائه میشه.\n\nجهت کسب اطلاعات بیشتر می‌تونید با مشاورین مطب به شماره ${CLINIC_PHONE} تماس بگیرید.`,
    };
  }

  // Universal Helpful Fallback Response (Persian line-by-line)
  return {
    text: `تشخیص دقیق و ارائه نظر تخصصی صرفاً پس از معاینه حضوری توسط خانم دکتر آرزو ساریخانی امکان‌پذیر است.\n\nلطفاً جهت مشاوره با مشاورین مطب و رزرو وقت معاینه، عکس دندان یا درخواست خودتون رو در واتس‌اپ به شماره ${CLINIC_PHONE} ارسال فرمایید.\n\nهمچنین می‌توانید با همین شماره تماس مستقیم داشته باشید.`,
  };
}
