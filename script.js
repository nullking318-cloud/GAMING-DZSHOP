// ===== DYNAMIC SUBTITLE ROTATION =====
const subtitles = [
  "أرخص بطاقات بلايستيشن في الجزائر، شحن مباشر بعد التأكيد!",
  "أكواد أصلية 100% وتسليم خلال دقائق ⚡",
  "دفع آمن عبر BaridiMob و CCP من أي مكان في الجزائر 🇩🇿",
  "أكثر من 1000 عملية شحن ناجحة وموثوقة ✅"
];
let subIndex = 0;
const subtitleEl = document.getElementById('subtitle');

if(subtitleEl) {
  setInterval(() => {
    subIndex = (subIndex + 1) % subtitles.length;
    subtitleEl.style.opacity = 0;
    setTimeout(() => {
      subtitleEl.textContent = subtitles[subIndex];
      subtitleEl.style.opacity = 1;
    }, 400);
  }, 4000);
}


// ===== PRICE CALCULATION =====
const cardSelect = document.getElementById('cardSelect');
const priceOutput = document.getElementById('priceOutput');

if(cardSelect && priceOutput) {
  cardSelect.addEventListener('change', () => {
    const selectedOption = cardSelect.options[cardSelect.selectedIndex];
    const dzd = selectedOption.getAttribute('data-dzd');

    if (dzd) {
      priceOutput.textContent = Number(dzd).toLocaleString('en-US') + ' دج';
    } else {
      priceOutput.textContent = '0 دج';
    }
  });
}


// ===== CARD CLICK -> SCROLL TO ORDER + PRESELECT =====
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', (e) => {
    const price = card.getAttribute('data-price');
    if(cardSelect) {
      for (let opt of cardSelect.options) {
        if (opt.value === price) {
          cardSelect.value = price;
          cardSelect.dispatchEvent(new Event('change'));
          break;
        }
      }
    }
  });
});


// ===== FORM VALIDATION & SUBMISSION =====
const orderForm = document.getElementById('orderForm');

if(orderForm) {
  orderForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const card = cardSelect ? cardSelect.value : "غير محدد";
    const name = document.getElementById('fullName') ? document.getElementById('fullName').value.trim() : "";
    
    // التحقق الفضفاض من وجود حقل الهاتف أو الإيميل حسب المتوفر في الـ HTML
    const phoneEl = document.getElementById('phone') || document.querySelector('input[type="tel"]');
    const emailEl = document.getElementById('userEmail') || document.querySelector('input[type="email"]');
    
    const contactInfo = phoneEl ? phoneEl.value.trim() : (emailEl ? emailEl.value.trim() : "غير متوفر");
    const receipt = document.getElementById('receipt') ? document.getElementById('receipt').files : [];

    // إظهار نافذة النجاح الاحترافية في الموقع للزبون
    showModal(
      "✅",
      "تم استلام طلبك!",
      "تم استقبال معلوماتك بنجاح! سيتم نقلك الآن إلى الواتساب لإرسال صورة الوصل وتلقي الكود الرقمي.",
      true
    );

    // 📱 رقم هاتفك الحقيقي (تأكد من تعديله هنا في جيت هاب)
    const yourPhoneNumber = "213658996507"; 
    
    // تجهيز نص الرسالة للواتساب
    const messageText = `مرحباً، قمت بطلب بطاقة من الموقع:\n\n👤 الاسم الكامل: ${name}\n📞 معلومات الاتصال: ${contactInfo}\n💳 البطاقة المطلوبة: ${card}\n\nمرفق أسفله صورة وصل التحويل لتأكيد الطلب.`;
    
    // فتح الواتساب تلقائياً بعد ثانيتين
    setTimeout(() => {
      const whatsappUrl = `https://wa.me/${yourPhoneNumber}?text=${encodeURIComponent(messageText)}`;
      window.open(whatsappUrl, '_blank');
    }, 2000);

    orderForm.reset();
    if(priceOutput) priceOutput.textContent = '0 دج';
  });
}


// ===== CUSTOM MODAL =====
function showModal(icon, title, message, success) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';

  const box = document.createElement('div');
  box.className = 'modal-box';
  if (!success) {
    box.style.borderColor = '#fbbf24';
    box.style.boxShadow = '0 0 40px rgba(251, 191, 36, 0.4)';
  }

  box.innerHTML = `
    <div class="icon">${icon}</div>
    <h3 style="${success ? '' : 'color:#fbbf24;'}">${title}</h3>
    <p>${message}</p>
    <button class="btn-glow full-width" id="closeModalBtn">حسناً</button>
  `;

  overlay.appendChild(box);
  document.body.appendChild(overlay);

  document.getElementById('closeModalBtn').addEventListener('click', () => {
    overlay.remove();
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.remove();
  });
}


// ===== LIVE FEED ROTATION =====
const names = ["محمد", "أمين", "ياسين", "كريم", "سارة", "عبد الرحمن", "نور الدين", "ريان", "سيف الدين", "فارس"];
const amounts = ["10$", "25$", "50$", "100$"];
const times = ["قبل لحظات", "منذ دقيقة", "منذ دقيقتين", "منذ 5 دقائق", "منذ 10 دقائق"];

const liveList = document.getElementById('liveList');

if(liveList) {
  function generateLiveItem() {
    const name = names[Math.floor(Math.random() * names.length)];
    const amount = amounts[Math.floor(Math.random() * amounts.length)];
    const time = times[Math.floor(Math.random() * times.length)];
    return `${name} اشترى بطاقة ${amount} ${time}`;
  }

  setInterval(() => {
    const li = document.createElement('li');
    li.textContent = generateLiveItem();
    liveList.insertBefore(li, liveList.firstChild);

    while (liveList.children.length > 4) {
      liveList.removeChild(liveList.lastChild);
    }
  }, 5000);
}
