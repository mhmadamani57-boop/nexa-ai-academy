import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  ArrowUpLeft,
  Atom,
  BrainCircuit,
  Check,
  ChevronDown,
  Clock3,
  Code2,
  Cpu,
  Layers3,
  Lightbulb,
  Menu,
  Play,
  Quote,
  Sparkles,
  Terminal,
  X,
  Zap,
} from "lucide-react";

type Program = {
  title: string;
  description: string;
  category: string;
  level: string;
  duration: string;
  icon: LucideIcon;
  accent: string;
  featured?: boolean;
};

const programs: Program[] = [
  {
    title: "هندسة البرومبت",
    description: "حوّل أفكارك إلى أوامر ذكية تنتج نتائج مدهشة وقابلة للتكرار.",
    category: "إبداع",
    level: "مبتدئ",
    duration: "٤ أسابيع",
    icon: Sparkles,
    accent: "violet",
    featured: true,
  },
  {
    title: "بناء وكلاء الذكاء الاصطناعي",
    description: "صمّم مساعدين أذكياء يفكرون، يتصلون بالأدوات، وينجزون المهام.",
    category: "تقنية",
    level: "متقدم",
    duration: "٨ أسابيع",
    icon: BrainCircuit,
    accent: "cyan",
  },
  {
    title: "أتمتة الأعمال بالـ AI",
    description: "اربط أدواتك اليومية بأنظمة ذكية توفّر الوقت وتضاعف الإنتاجية.",
    category: "أعمال",
    level: "متوسط",
    duration: "٦ أسابيع",
    icon: Zap,
    accent: "lime",
  },
  {
    title: "أساسيات تعلم الآلة",
    description: "ابنِ أساساً متيناً لفهم البيانات، النماذج، وكيف تتعلم الآلة.",
    category: "تقنية",
    level: "مبتدئ",
    duration: "٧ أسابيع",
    icon: Atom,
    accent: "blue",
  },
];

const filters = ["الكل", "تقنية", "إبداع", "أعمال"];
const cosmicBg = `${import.meta.env.BASE_URL}nexa-cosmic-bg.jpg`;

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("الكل");

  const visiblePrograms = useMemo(
    () =>
      activeFilter === "الكل"
        ? programs
        : programs.filter((program) => program.category === activeFilter),
    [activeFilter],
  );

  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [activeFilter]);

  const showComingSoon = () => {
    toast.success("تم تسجيل اهتمامك — سنرسل لك التفاصيل قريباً.", {
      description: "فريق NEXA AI جاهز ليبدأ معك الرحلة.",
    });
  };

  return (
    <div className="site-shell" dir="rtl">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="topbar">
        <div className="container nav-wrap">
          <a className="brand" href="#top" aria-label="NEXA AI الرئيسية">
            <span className="brand-mark"><span /></span>
            <span className="brand-word">NEXA<span>AI</span></span>
          </a>

          <nav className={`main-nav ${mobileOpen ? "is-open" : ""}`} aria-label="التنقل الرئيسي">
            <a href="#programs" onClick={() => setMobileOpen(false)}>البرامج</a>
            <a href="#method" onClick={() => setMobileOpen(false)}>منهجنا</a>
            <a href="#voices" onClick={() => setMobileOpen(false)}>قصص المتعلمين</a>
            <a href="#about" onClick={() => setMobileOpen(false)}>عن الأكاديمية</a>
            <button className="mobile-cta" onClick={() => { setMobileOpen(false); scrollToSection("join"); }}>ابدأ الآن <ArrowLeft size={15} /></button>
          </nav>

          <div className="nav-actions">
            <button className="text-button" onClick={() => toast("منطقة الدخول قيد الإطلاق قريباً")}>تسجيل الدخول</button>
            <button className="nav-cta" onClick={() => scrollToSection("join")}>ابدأ رحلتك <ArrowLeft size={16} /></button>
            <button className="menu-toggle" aria-label={mobileOpen ? "إغلاق القائمة" : "فتح القائمة"} onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="container hero-grid">
            <div className="hero-copy reveal is-visible">
              <div className="eyebrow"><span className="pulse-dot" /> مستقبل التعلم بدأ هنا</div>
              <h1>لا تتعلم<br /><em>عن</em> الذكاء الاصطناعي.<br /><span>اصنعه.</span></h1>
              <p className="hero-lead">أكاديمية عربية تعيد تعريف مهارات المستقبل. تعلم بذكاء، طبّق بثقة، وكن الشخص الذي لا يمكن استبداله.</p>
              <div className="hero-actions">
                <button className="primary-button" onClick={() => scrollToSection("programs")}>استكشف المسارات <ArrowLeft size={18} /></button>
                <button className="play-button" onClick={() => toast.info("فيديو التعريف سيصل قريباً", { description: "نحضّر لك جولة سريعة داخل عالم NEXA AI." })}><span className="play-icon"><Play size={14} fill="currentColor" /></span> شاهد كيف نتعلم</button>
              </div>
              <div className="hero-proof">
                <div className="avatar-stack" aria-label="مجتمع المتعلمين"><span>ن</span><span>س</span><span>م</span><span>+٢</span></div>
                <div><strong>+٢٬٤٠٠</strong><span>متعلم يغيّر مستقبله</span></div>
                <div className="proof-divider" />
                <div className="rating"><strong>٤٫٩</strong><span>★★★★★</span></div>
              </div>
            </div>

            <div className="hero-visual reveal is-visible" style={{ animationDelay: "120ms" }}>
              <div className="hero-image" style={{ backgroundImage: `url("${cosmicBg}")` }} role="img" aria-label="شبكة عصبية ضوئية مجردة" />
              <div className="hero-image-shade" />
              <div className="orbit orbit-large" />
              <div className="orbit orbit-small" />
              <div className="hero-float hero-float-top">
                <span className="float-icon cyan-icon"><Cpu size={16} /></span>
                <div><small>الآن في المختبر</small><strong>تدريب نموذجك الأول</strong></div>
                <span className="live-dot" />
              </div>
              <div className="hero-float hero-float-bottom">
                <div className="float-mini-chart"><span /><span /><span /><span /><span /><span /><span /></div>
                <div><small>مستوى التقدم</small><strong>٧٨٪</strong></div>
                <ArrowUpLeft className="chart-arrow" size={19} />
              </div>
              <div className="hero-signal"><span><Terminal size={14} /></span> <span>010101 / NEURAL_FLOW</span></div>
            </div>
          </div>
          <div className="scroll-cue"><span>مرر لاستكشاف</span><ChevronDown size={18} /></div>
        </section>

        <div className="marquee-band" aria-label="شعارات شركاء المجتمع">
          <div className="marquee-track"><span>LEARN / BUILD / LEAD</span><i>✦</i><span>الذكاء يبدأ بسؤال</span><i>✦</i><span>FROM CURIOUS TO CAPABLE</span><i>✦</i><span>الذكاء يبدأ بسؤال</span><i>✦</i><span>LEARN / BUILD / LEAD</span><i>✦</i><span>الذكاء يبدأ بسؤال</span><i>✦</i></div>
        </div>

        <section className="manifesto section-pad" id="about">
          <div className="container manifesto-grid">
            <div className="section-kicker reveal"><span>01</span><span className="line" /><span>لماذا NEXA؟</span></div>
            <div className="manifesto-main reveal">
              <h2>التغيير الحقيقي لا يحدث<br /><span>في منطقة الراحة.</span></h2>
              <p>المعرفة وحدها لا تكفي. في NEXA، نضعك داخل التجربة: تفكر، تبني، تخطئ، وتخرج بمهارة تستخدمها من اليوم الأول.</p>
              <a className="underlined-link" href="#method">اكتشف فلسفتنا <ArrowLeft size={16} /></a>
            </div>
            <div className="manifesto-stats reveal">
              <div><strong>٩٨٪</strong><span>يطبّقون مهارة جديدة خلال أول أسبوع</span></div>
              <div><strong>٣×</strong><span>أسرع في إنجاز المهام اليومية</span></div>
            </div>
          </div>
        </section>

        <section className="programs-section section-pad" id="programs">
          <div className="container">
            <div className="section-heading reveal">
              <div><div className="section-kicker"><span>02</span><span className="line" /><span>اختر مسارك</span></div><h2>مهارات <span>تفتح الأبواب.</span></h2></div>
              <p>مسارات مصممة بعناية، تجمع بين الأساس المتين والممارسة التي تقود إلى نتيجة ملموسة.</p>
            </div>
            <div className="filter-row reveal">
              {filters.map((filter) => <button key={filter} className={activeFilter === filter ? "active" : ""} onClick={() => setActiveFilter(filter)}>{filter}</button>)}
              <span className="filter-count">{visiblePrograms.length} برامج متاحة</span>
            </div>
            <div className="program-grid">
              {visiblePrograms.map((program, index) => {
                const Icon = program.icon;
                return <article className={`program-card ${program.featured ? "featured" : ""} accent-${program.accent} reveal`} key={program.title} style={{ animationDelay: `${index * 70}ms` }}>
                  <div className="card-top"><span className="program-icon"><Icon size={19} /></span><span className="program-number">0{index + 1}</span></div>
                  <div className="card-content"><div className="program-tag">{program.category} <span>·</span> {program.level}</div><h3>{program.title}</h3><p>{program.description}</p></div>
                  <div className="card-footer"><span><Clock3 size={14} /> {program.duration}</span><button aria-label={`استكشف ${program.title}`} onClick={showComingSoon}><ArrowUpLeft size={20} /></button></div>
                </article>;
              })}
            </div>
            <div className="catalog-link reveal"><button className="underlined-link" onClick={() => toast("سنفتح لك مكتبة المسارات الكاملة قريباً")}>شاهد كل المسارات <ArrowLeft size={16} /></button></div>
          </div>
        </section>

        <section className="method-section section-pad" id="method">
          <div className="container">
            <div className="method-intro reveal"><div className="section-kicker"><span>03</span><span className="line" /><span>كيف نعلّم؟</span></div><h2>من فضول عابر<br />إلى <span>قوة حقيقية.</span></h2><p>منهج عملي يجعل التقدم مرئياً. كل خطوة لها معنى، وكل مشروع يقرّبك من النسخة التي تريدها.</p></div>
            <div className="steps-grid">
              <div className="step-card reveal"><span className="step-num">01</span><div className="step-icon"><Lightbulb size={22} /></div><h3>افهم الصورة الكبيرة</h3><p>نبني الأساس بلغة واضحة، بعيداً عن التعقيد والضجيج التقني.</p><span className="step-word">CONTEXT</span></div>
              <div className="step-card step-highlight reveal"><span className="step-num">02</span><div className="step-icon"><Code2 size={22} /></div><h3>ابنِ بيديك</h3><p>تعلّم عبر تحديات حقيقية ومشاريع تحاكي ما يحدث في العالم.</p><span className="step-word">CREATE</span></div>
              <div className="step-card reveal"><span className="step-num">03</span><div className="step-icon"><Layers3 size={22} /></div><h3>أطلق أثرك</h3><p>حوّل ما تعلمته إلى نظام، منتج، أو ميزة تنافسية واضحة.</p><span className="step-word">IMPACT</span></div>
            </div>
          </div>
        </section>

        <section className="voices-section section-pad" id="voices">
          <div className="container">
            <div className="voices-heading reveal"><div className="section-kicker"><span>04</span><span className="line" /><span>من مجتمعنا</span></div><h2>الكلمات التي<br /><span>تتحدث عنّا.</span></h2><div className="quote-mark"><Quote size={42} /></div></div>
            <div className="voices-grid">
              <article className="testimonial testimonial-main reveal"><div className="quote-top"><span className="quote-stars">★★★★★</span><span>دفعة ربيع ٢٠٢٥</span></div><blockquote>“لم أكن أبحث عن دورة أخرى. كنت أبحث عن طريقة أفكر بها بشكل مختلف. NEXA أعطتني الاثنين.”</blockquote><div className="person"><span className="person-avatar avatar-purple">ل</span><div><strong>ليان الحربي</strong><span>مصممة منتجات رقمية</span></div></div></article>
              <article className="testimonial testimonial-side reveal"><blockquote>“في أسبوعين فقط، أتمتت ٤ ساعات من عملي اليومي. هذا ليس تعلماً، هذا تغيير جذري.”</blockquote><div className="person"><span className="person-avatar avatar-cyan">ع</span><div><strong>عمر السالم</strong><span>مؤسس شركة ناشئة</span></div></div></article>
            </div>
          </div>
        </section>

        <section className="join-section section-pad" id="join">
          <div className="container join-card reveal"><div className="join-orb orb-left" /><div className="join-orb orb-right" /><div className="join-content"><span className="eyebrow"><span className="pulse-dot" /> مكانك محفوظ في المستقبل</span><h2>جاهز أن تصنع<br /><span>الفرصة القادمة؟</span></h2><p>انضم إلى مجتمع من الفضوليين الذين يرفضون أن يظلوا متفرجين.</p><button className="primary-button light-button" onClick={showComingSoon}>ابدأ أول خطوة <ArrowLeft size={18} /></button><small>لا تحتاج أي خبرة مسبقة · جرّب مجاناً</small></div><div className="join-code"><span>NX</span><span>AI</span><i /><i /><i /></div></div>
        </section>
      </main>

      <footer className="footer" id="footer"><div className="container footer-wrap"><a className="brand" href="#top"><span className="brand-mark"><span /></span><span className="brand-word">NEXA<span>AI</span></span></a><p>نبني العقول التي تبني الغد.</p><div className="footer-links"><a href="#programs">البرامج</a><a href="#about">عن NEXA</a><a href="#join">تواصل معنا</a></div><span className="copyright">© ٢٠٢٥ NEXA AI</span></div></footer>
    </div>
  );
}
