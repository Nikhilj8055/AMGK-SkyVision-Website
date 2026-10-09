import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowDown, ArrowRight, ArrowUpRight, Check, CirclePlay,
  Menu, MoveRight, Play, Plus, X,
} from 'lucide-react';
import { business, campaignMonths, categories, challenges, faqs, packages, processSteps, projects, reportMetrics, services, valuePoints, type PackageInfo, type Project } from './data';

const pages = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Our Work' },
  { href: '/packages', label: 'Packages' },
  { href: '/process', label: 'Our Process' },
  { href: '/contact', label: 'Contact' },
];

const pageMeta: Record<string, { title: string; description: string }> = {
  '/': { title: 'AMGK SkyVision — Automotive Content Studio', description: 'Cinematic automotive video production and social content for used-car dealerships.' },
  '/services': { title: 'Services — AMGK SkyVision', description: 'Explore AMGK SkyVision content planning, production, editing and social content services.' },
  '/work': { title: 'Our Work — AMGK SkyVision', description: 'Explore clearly labelled illustrative automotive content concepts from AMGK SkyVision.' },
  '/packages': { title: 'Packages — AMGK SkyVision', description: 'Review automotive content packages, deliverables and Malaysian ringgit pricing.' },
  '/process': { title: 'Our Process — AMGK SkyVision', description: 'How a three-month dealership content campaign is planned, produced and reviewed.' },
  '/contact': { title: 'Campaign Enquiry — AMGK SkyVision', description: 'Prepare an automotive content campaign enquiry for AMGK SkyVision.' },
  '/privacy': { title: 'Privacy — AMGK SkyVision', description: 'Privacy information for the AMGK SkyVision website demo.' },
};

function usePageMeta(path: string) {
  useEffect(() => {
    const meta = pageMeta[path] ?? { title: 'Page not found — AMGK SkyVision', description: 'The requested page could not be found.' };
    document.title = meta.title;
    let description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!description) {
      description = document.createElement('meta');
      description.name = 'description';
      document.head.appendChild(description);
    }
    description.content = meta.description;
    let og = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    if (!og) {
      og = document.createElement('meta');
      og.setAttribute('property', 'og:description');
      document.head.appendChild(og);
    }
    og.content = meta.description;
    for (const [selector, content] of [
      ['meta[property="og:title"]', meta.title],
      ['meta[name="twitter:title"]', meta.title],
      ['meta[name="twitter:description"]', meta.description],
    ]) {
      const tag = document.querySelector<HTMLMetaElement>(selector);
      if (tag) tag.content = content;
    }
  }, [path]);
}

function Brand() {
  return <Link to="/" className="brand" aria-label="AMGK SkyVision home" data-testid="link-brand">
    <span className="brand-mark" aria-hidden="true" />
    <span className="brand-name">AMGK <span>SKYVISION</span></span>
  </Link>;
}

function Header() {
  const { pathname: path } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKey);
    onScroll();
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('keydown', onKey); };
  }, []);
  useEffect(() => { setOpen(false); }, [path]);
  return <header className={`topbar${scrolled ? ' scrolled' : ''}${open ? ' menu-open' : ''}`}>
    <div className="nav-wrap">
      <Brand />
      <nav className="desktop-nav" aria-label="Main navigation">
        {pages.map(p => <Link key={p.href} to={p.href} className={`nav-link${path === p.href ? ' active' : ''}`} aria-current={path === p.href ? 'page' : undefined} data-testid={`link-nav-${p.label.toLowerCase().replaceAll(' ', '-')}`}>{p.label}</Link>)}
      </nav>
      <Link className="btn nav-cta" to="/contact" data-testid="link-proposal">Get a campaign proposal <ArrowUpRight size={15} /></Link>
      <button className="menu-toggle" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)} data-testid="button-mobile-menu">{open ? <X size={20} /> : <Menu size={20} />}</button>
    </div>
    <nav className={`mobile-nav${open ? ' open' : ''}`} id="mobile-navigation" aria-label="Mobile navigation" aria-hidden={!open}>
      {pages.map(p => <Link key={p.href} to={p.href} tabIndex={open ? 0 : -1} className={`nav-link${path === p.href ? ' active' : ''}`} aria-current={path === p.href ? 'page' : undefined}>{p.label}</Link>)}
      <Link className="btn" to="/contact" tabIndex={open ? 0 : -1}>Get a campaign proposal <ArrowUpRight size={15} /></Link>
    </nav>
  </header>;
}

function Footer() {
  return <footer className="footer">
    <div className="shell">
      <div className="footer-grid">
        <div className="footer-about"><Brand /><p>Automotive content production and social media support for used-car dealerships. Content. Creative. Consistency.</p></div>
        <div className="footer-col"><h4>Explore</h4>{pages.slice(0, 5).map(p => <Link key={p.href} to={p.href}>{p.label}</Link>)}<Link to="/privacy">Privacy policy</Link></div>
        <div className="footer-col"><h4>Services</h4>{services.slice(0, 5).map(s => <Link key={s.number} to="/services">{s.title}</Link>)}<Link to="/services">Monitor & Engage</Link></div>
        <div className="footer-col"><h4>Contact</h4><Link to="/contact">Campaign enquiry</Link><span>{business.contactName}</span><span>{business.phoneDisplay}</span><span>Instagram · {business.instagramHandle}</span><span>TikTok · {business.tiktokHandle}</span><span>Social profile links pending verification</span></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} {business.name}. All rights reserved.</span><span>Illustrative concept media is labelled throughout.</span></div>
    </div>
  </footer>;
}

function PageFrame({ children }: { children: ReactNode }) {
  return <><Header /><main>{children}</main><Footer /></>;
}

function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.14 }} transition={{ duration: reduce ? 0 : .55, delay, ease: [.2, .7, .2, 1] }}>{children}</motion.div>;
}

function SectionHead({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return <div className="section-head"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{copy && <p>{copy}</p>}</div>;
}

function PageHero({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return <section className="page-hero"><div className="shell"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{copy}</p></div></section>;
}

function Modal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const closeButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!project) return;
    const old = document.activeElement as HTMLElement | null;
    closeButton.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        const dialog = document.querySelector<HTMLElement>('.media-modal');
        const items = dialog?.querySelectorAll<HTMLElement>('button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (!items?.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; old?.focus(); };
  }, [project, onClose]);
  return <AnimatePresence>{project && <motion.div className="modal-backdrop" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <motion.div className="media-modal" role="dialog" aria-modal="true" aria-labelledby="media-title" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 15 }} transition={{ duration: .2 }}>
      <button ref={closeButton} className="modal-close" onClick={onClose} aria-label="Close preview" data-testid="button-close-preview"><X size={20} /></button>
      <img src={project.image} alt={`${project.title} — illustrative concept still`} />
      <div className="modal-caption"><strong id="media-title">{project.title}</strong> · Illustrative concept still. No video playback is available for this sample.</div>
    </motion.div>
  </motion.div>}</AnimatePresence>;
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  return <article className="project-card" data-testid={`card-project-${project.id}`}>
    <button className="project-thumb" onClick={() => onOpen(project)} aria-label={`View illustrative concept: ${project.title}`} data-testid={`button-project-${project.id}`}>
      <img src={project.image} alt={`${project.title} illustrative concept`} loading="lazy" />
      <span className="demo-tag">ILLUSTRATIVE CONCEPT</span>
      <span className="project-play" aria-hidden="true"><ArrowUpRight size={20} /></span>
    </button>
    <div className="project-meta"><span>{project.category}</span><h3>{project.title}</h3><p>{project.description}</p></div>
  </article>;
}

function ServiceCard({ service }: { service: typeof services[number] }) {
  const Icon = service.icon;
  return <article className="service-card" data-testid={`card-service-${service.number}`}>
    <div className="service-top"><span className="service-number">{service.number} / 06</span><Icon className="service-icon" size={21} strokeWidth={1.5} /></div>
    <h3>{service.title}</h3><p>{service.summary}</p>
    <Link className="text-link" to="/services">Explore service <ArrowRight size={14} /></Link>
  </article>;
}

function PackageCard({ item, compact = false }: { item: PackageInfo; compact?: boolean }) {
  return <article className={`package-card${item.bestValue ? ' featured' : ''}`} data-testid={`card-package-${item.slug}`}>
    {item.bestValue && <span className="best-value">BEST VALUE</span>}
    <h3 className="package-name">{item.name}</h3>
    {item.note && <p className="package-detail">{item.note}</p>}
    <div className="package-price">RM {item.rate.toLocaleString('en-MY')}</div>
    <div className="package-period">{item.period}</div>
    {item.total && <div className="package-total">3-month total <strong>RM {item.total.toLocaleString('en-MY')}</strong></div>}
    <p className="package-detail">{item.volume}</p>
    <ul>{(compact ? item.items.slice(0, 5) : item.items).map((line, i) => <li key={line}><Check size={14} />{line}</li>)}</ul>
    <Link className={`btn${item.bestValue ? '' : ' btn-outline'}`} to={`/contact?package=${item.slug}`} data-testid={`link-package-${item.slug}`}>Enquire about {item.name}<ArrowRight size={15} /></Link>
  </article>;
}

function CtaBand() {
  return <section className="cta-band"><div className="shell cta-inner"><div><span className="eyebrow">LET'S MAKE THE NEXT MOVE</span><h2>READY TO PUT YOUR DEALERSHIP IN THE SPOTLIGHT?</h2><p>Let's build a content strategy around your inventory, audience, and dealership goals.</p></div><div className="cta-actions"><Link className="btn" to="/contact?whatsapp=unverified">Contact us on WhatsApp <ArrowUpRight size={16} /></Link><Link className="btn btn-outline" to="/packages">Explore packages <ArrowRight size={15} /></Link></div></div></section>;
}

function CampaignTimeline() {
  return <div className="timeline">{campaignMonths.map((m, i) => <Reveal key={m.month} delay={i * .08}><article className="timeline-card"><span className="timeline-dot" aria-hidden="true" /><span className="timeline-month">{m.month}</span><h3>{m.title}</h3><p>{m.text}</p></article></Reveal>)}</div>;
}

function ReportPreview() {
  return <div className="report-box">
    <div><span className="report-label">ILLUSTRATIVE REPORT PREVIEW</span><h3>REAL DATA.<br />BETTER DECISIONS.</h3><p>A sample view of the categories that may be reviewed from available platform data. This is a layout preview only—not campaign results.</p></div>
    <div className="report-grid">{reportMetrics.slice(0, 6).map(x => <div className="report-metric" key={x}><span>{x}</span><b>Available metric</b></div>)}<div className="report-graph" aria-label="Decorative sample chart, no data shown"><svg viewBox="0 0 500 70" preserveAspectRatio="none" aria-hidden="true"><path d="M0 57 C55 48 66 51 105 38 S166 45 205 32 S270 42 305 23 S365 36 405 17 S455 22 500 4" fill="none" stroke="#22d3ee" strokeWidth="2" /></svg></div><div className="report-metric"><span>Content review</span><b>Top-performing content</b></div></div>
  </div>;
}

function Faq() {
  const [expanded, setExpanded] = useState<number | null>(null);
  return <div className="faq-list">{faqs.map((faq, index) => <div className="faq-item" key={faq.question}>
    <button className="faq-question" aria-expanded={expanded === index} aria-controls={`faq-answer-${index}`} onClick={() => setExpanded(expanded === index ? null : index)} data-testid={`button-faq-${index}`}><span>{faq.question}</span><Plus size={17} /></button>
    {expanded === index && <div className="faq-answer" id={`faq-answer-${index}`} role="region">{faq.answer}</div>}
  </div>)}</div>;
}

function HomePage() {
  const [preview, setPreview] = useState<Project | null>(null);
  const heroProject = projects[0];
  return <PageFrame>
    <section className="hero">
      <img className="hero-image" src="/skyvision-hero.jpg" alt="Illustrative cinematic graphite vehicle at night" fetchPriority="high" />
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-content">
        <motion.span className="eyebrow" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}>{business.tagline}</motion.span>
        <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: .08 }}>MAKE EVERY CAR<br /><em>WORTH A SECOND</em><br />LOOK.</motion.h1>
        <motion.p className="hero-copy" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, delay: .2 }}>We turn dealership inventory into cinematic videos, engaging social content, and more opportunities to connect with potential buyers.</motion.p>
        <motion.div className="hero-actions" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45, delay: .3 }}>
          <Link to="/packages" className="btn">Explore our packages <ArrowRight size={15} /></Link>
          <Link to="/work" className="btn btn-outline">Watch our work <CirclePlay size={15} /></Link>
        </motion.div>
        <div className="hero-foot"><span className="rule" />CONTENT. CREATIVE. CONSISTENCY.</div>
        <span className="scroll-cue"><ArrowDown size={13} /> Scroll to explore</span>
      </div>
    </section>
    <div className="value-strip"><div className="shell value-row">{valuePoints.map(({ icon: Icon, label }) => <div className="value-item" key={label}><Icon size={18} strokeWidth={1.6} />{label}</div>)}</div></div>
    <section className="section"><div className="shell"><SectionHead eyebrow="THE SKYVISION SHOWREEL" title="BUILT TO MAKE CARS STAND OUT." copy="Every vehicle has a story. We create the visuals that help tell it." />
      <div className="showreel-feature">
        <button className="reel-visual" onClick={() => setPreview(heroProject)} aria-label="Open illustrative concept still">
          <img src="/skyvision-hero.jpg" alt="Graphite vehicle at night, illustrative concept" loading="lazy" /><span className="demo-tag">ILLUSTRATIVE DEMO ASSET</span><span className="play-button"><Play size={21} fill="currentColor" /></span>
        </button>
        <div className="reel-info"><div><span className="eyebrow">STUDIO CONCEPT / 01</span><h3>Make the first look count.</h3><p>A cinematic still concept for vehicle storytelling. No verified AMGK client footage has been supplied yet.</p><div className="category-list">{categories.slice(1).map(cat => <span className="category-chip" key={cat}>{cat}</span>)}</div></div><Link className="text-link" to="/work">Explore concept gallery <ArrowRight size={14} /></Link></div>
      </div>
      <div className="project-grid home-project-grid" aria-label="Illustrative automotive content concepts">
        {projects.slice(1, 4).map(project => <ProjectCard key={project.id} project={project} onOpen={setPreview} />)}
      </div>
      <p className="project-note">Illustrative demo stills only. These concepts are not verified AMGK client work or playable videos.</p>
    </div></section>
    <section className="section section-dark"><div className="shell"><SectionHead eyebrow="WHAT WE DO" title="MORE THAN VIDEOGRAPHY." copy="One creative partner for your dealership's content workflow." />
      <div className="service-grid">{services.map((s, i) => <Reveal key={s.number} delay={(i % 3) * .06}><ServiceCard service={s} /></Reveal>)}</div>
    </div></section>
    <section className="section"><div className="shell"><SectionHead eyebrow="THE DEALERSHIP REALITY" title="YOUR INVENTORY. A BETTER STORY." copy="We turn familiar content challenges into a clearer creative approach—without promises that depend on factors outside the work." />
      <div className="challenge-list">{challenges.map(([problem, response], i) => <Reveal key={problem} delay={i * .04}><div className="challenge-row"><strong>{problem}</strong><span className="challenge-arrow"><MoveRight size={19} /></span><p>{response}</p></div></Reveal>)}</div>
    </div></section>
    <section className="section section-dark"><div className="shell"><SectionHead eyebrow="CAMPAIGN OPTIONS" title="CONTENT BUILT AROUND YOUR NEXT MOVE." copy="Four defined ways to produce dealership content. Review what each scope includes." />
      <div className="package-grid">{packages.map(p => <PackageCard compact key={p.slug} item={p} />)}</div>
      <p className="form-help">Final production arrangements and any additional costs are confirmed in the proposal. Three-month totals are shown for clarity; renewal terms are not implied.</p>
    </div></section>
    <section className="section"><div className="shell"><SectionHead eyebrow="A THREE-MONTH CAMPAIGN" title="A CREATIVE PLAN WITH ROOM TO LEARN." copy="A considered cycle of setup, optimization and analysis—not a guarantee of numerical performance." /><CampaignTimeline /></div></section>
    <section className="section section-dark"><div className="shell"><ReportPreview /></div></section>
    <section className="section"><div className="shell"><SectionHead eyebrow="GOOD TO KNOW" title="THE DETAILS, CLEARLY." copy="A few practical answers before we start a conversation."/><Faq /></div></section>
    <CtaBand />
    <Modal project={preview} onClose={() => setPreview(null)} />
  </PageFrame>;
}

function ServicesPage() {
  return <PageFrame><PageHero eyebrow="SERVICES / FROM PLAN TO PUBLISH" title="A CREATIVE PARTNER FOR YOUR INVENTORY." copy="A connected content workflow for dealerships: plan the story, produce with purpose, and review what the available data can tell us." />
    <section className="section"><div className="shell"><SectionHead eyebrow="THE WORKFLOW" title="SIX DISCIPLINES. ONE CLEARER STORY." copy="Each service supports a different part of the content workflow. Scope varies by package and is confirmed in your proposal." />
      {services.map((s, i) => { const Icon = s.icon; return <div key={s.number}>
        <Reveal><article className="service-detail">
          <div className="detail-copy"><span className="eyebrow">SERVICE / {s.number}</span><h2>{s.title}</h2><p>{s.detail}</p><ul>{s.deliverables.map(d => <li key={d}><Check size={14} />{d}</li>)}</ul></div>
          <div className="detail-visual"><img src={i % 3 === 0 ? '/skyvision-hero.jpg' : i % 3 === 1 ? '/skyvision-interior.jpg' : '/skyvision-detail.jpg'} alt={`${s.title} illustrative automotive concept`} loading="lazy" /><span className="demo-tag"><Icon size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 7 }} />ILLUSTRATIVE CONCEPT</span></div>
        </article></Reveal>
        {(i === 2 || i === 5) && <div className="service-break-cta"><p>{i === 2 ? 'Have a campaign in mind? Let’s shape the production scope around your dealership.' : 'Ready to compare the available campaign options?'}</p><Link className="text-link" to={i === 2 ? '/contact' : '/packages'}>{i === 2 ? 'Start an enquiry' : 'View packages'} <ArrowRight size={14} /></Link></div>}
      </div>})}
      <div className="notice" style={{ marginTop: 35 }}>Content production creates the assets. Ongoing social media management and posting are package-dependent—not identical across every option. Drone filming and talent arrangements are also subject to the selected scope and suitability.</div>
    </div></section>
    <section className="section section-dark"><div className="shell"><SectionHead eyebrow="CHOOSE YOUR SCOPE" title="FIND THE RIGHT PRODUCTION RHYTHM." copy="Compare the defined packages and confirm the final production arrangement in your proposal."/><div className="package-grid">{packages.map(p => <PackageCard compact item={p} key={p.slug} />)}</div></div></section>
    <CtaBand />
  </PageFrame>;
}

function WorkPage() {
  const [filter, setFilter] = useState('All Work');
  const [preview, setPreview] = useState<Project | null>(null);
  const filtered = useMemo(() => filter === 'All Work' ? projects : projects.filter(p => p.category === filter), [filter]);
  return <PageFrame><PageHero eyebrow="WORK / CONCEPT GALLERY" title="A FEEL FOR WHAT'S POSSIBLE." copy="An editorial set of visual concepts for dealership content. No portfolio client work has been supplied, so every image here is clearly labelled illustrative." />
    <section className="section"><div className="shell">
      <div className="filter-row" role="group" aria-label="Filter concept gallery">{categories.map(c => <button key={c} className={`filter-btn${filter === c ? ' selected' : ''}`} aria-pressed={filter === c} onClick={() => setFilter(c)} data-testid={`button-filter-${c.toLowerCase().replaceAll(' ', '-')}`}>{c}</button>)}</div>
      <div className="project-grid" aria-live="polite">{filtered.length ? filtered.map(project => <ProjectCard key={project.id} project={project} onOpen={setPreview} />) : <div className="empty-state">No concept projects in this category yet.</div>}</div>
      <p className="project-note">All images are concept/demo assets, not verified AMGK client projects. These stills are illustrative; no playback or project performance is represented.</p>
    </div></section>
    <CtaBand /><Modal project={preview} onClose={() => setPreview(null)} />
  </PageFrame>;
}

const comparisonFeatures = [
  ['Short-form videos', ['12 videos', '12 videos', '10 edited videos', '1 edited video']],
  ['Content strategy and planning', [true, true, false, false]],
  ['Creative concepts and scriptwriting', [true, true, false, false]],
  ['Freelance talent included', [true, true, false, false]],
  ['Professional videography', [true, true, false, false]],
  ['Interior and exterior B-roll', [true, true, true, true]],
  ['Premium / standard editing', ['Premium', 'Standard', 'Professional', 'Edited']],
  ['Motion graphics where suitable', [true, false, false, false]],
  ['Captions and subtitles', [true, true, false, false]],
  ['Content posting and management', [true, 'Content posting', false, false]],
  ['Engagement monitoring', [true, true, false, false]],
  ['Performance monitoring', [true, true, true, false]],
  ['Three-month performance analysis', [true, true, true, false]],
  ['Vehicle information text', [false, false, true, true]],
];

function PackagesPage() {
  return <PageFrame><PageHero eyebrow="PACKAGES / CLEAR SCOPES" title="CHOOSE THE RIGHT FRAME." copy="Defined content scopes for your dealership. Monthly rates and three-month totals are shown separately in Malaysian ringgit." />
    <section className="section"><div className="shell"><SectionHead eyebrow="THE PACKAGES" title="A CLEAR STARTING POINT." copy="Every final arrangement is confirmed in the campaign proposal. No assumed setup fees, discounts or automatic renewal." />
      <div className="package-page-grid">{packages.map(item => <PackageCard item={item} key={item.slug} />)}</div>
      <div className="notice" style={{ marginTop: 20 }}>Final production arrangements and any additional costs are confirmed in the proposal. Three-month package totals describe the stated three-month scope and do not imply automatic renewal or a payment schedule.</div>
    </div></section>
    <section className="section section-dark"><div className="shell"><SectionHead eyebrow="SIDE BY SIDE" title="COMPARE WHAT'S INCLUDED." copy="A concise view of package scope; details above describe deliverables and context." />
      <div className="comparison-wrap"><table className="comparison"><thead><tr><th scope="col">Deliverable</th>{packages.map(p => <th key={p.slug} scope="col">{p.name}</th>)}</tr></thead><tbody>{comparisonFeatures.map(([label, values]) => <tr key={label as string}><td>{label as string}</td>{(values as (boolean|string)[]).map((v, i) => <td key={packages[i].slug} className={v === true ? 'yes' : ''}>{v === true ? 'Included' : v === false ? '—' : v}</td>)}</tr>)}</tbody></table></div>
    </div></section><CtaBand />
  </PageFrame>;
}

function ProcessPage() {
  return <PageFrame><PageHero eyebrow="OUR PROCESS / BUILT FOR CONSISTENCY" title="FROM INVENTORY TO INSIGHT." copy="A five-step working rhythm that brings dealership context, production and available performance signals into one considered campaign." />
    <section className="section"><div className="shell"><SectionHead eyebrow="THE WORKING METHOD" title="FIVE STEPS. CLEAR MOMENTUM." copy="A collaborative production process, planned around the agreed scope and the assets and data available." />
      <div className="process-steps">{processSteps.map(([n, title, description]) => <article className="process-step" key={n}><span className="step-count">{n} / STEP</span><h3>{title}</h3><p>{description}</p></article>)}</div>
    </div></section>
    <section className="section section-dark"><div className="shell"><SectionHead eyebrow="THE CAMPAIGN ARC" title="THREE MONTHS TO BUILD A BETTER READ." copy="The proposal frames a progressive campaign; outcomes depend on execution, audience response and the available data." />
      {campaignMonths.map(m => <article className="month-panel" key={m.month}><h3><span>{m.month}</span>{m.title}</h3><p>{m.text}</p></article>)}
    </div></section>
    <section className="section"><div className="shell"><ReportPreview /></div></section><CtaBand />
  </PageFrame>;
}

type Enquiry = {
  dealership: string; contact: string; email: string; phone: string;
  method: string; package: string; inventory: string; objective: string; message: string;
};
const emptyEnquiry: Enquiry = { dealership: '', contact: '', email: '', phone: '', method: '', package: '', inventory: '', objective: '', message: '' };
const formFields: { name: keyof Enquiry; label: string; required?: boolean; type?: string; placeholder?: string; options?: string[] }[] = [
  { name: 'dealership', label: 'Dealership name', required: true, placeholder: 'Your dealership' },
  { name: 'contact', label: 'Contact person', required: true, placeholder: 'Name' },
  { name: 'email', label: 'Business email', required: true, type: 'email', placeholder: 'name@business.com' },
  { name: 'phone', label: 'WhatsApp or phone', required: true, type: 'tel', placeholder: 'Your preferred number' },
  { name: 'method', label: 'Preferred contact method', required: true, options: ['Email', 'Phone', 'WhatsApp'] },
  { name: 'package', label: 'Package selection', required: true, options: packages.map(p => p.name) },
  { name: 'inventory', label: 'Approximate inventory size', required: true, options: ['Under 20 vehicles', '20–50 vehicles', '51–100 vehicles', 'Over 100 vehicles', 'Not sure yet'] },
  { name: 'objective', label: 'Main campaign objective', required: true, options: ['Create consistent vehicle content', 'Improve vehicle presentation', 'Support social media content', 'Review available content performance', 'Discuss a campaign'] },
];
function ContactPage() {
  const location = useLocation();
  const initialPackage = new URLSearchParams(location.search).get('package') ?? '';
  const [values, setValues] = useState<Enquiry>(() => ({ ...emptyEnquiry, package: packages.some(p => p.slug === initialPackage) ? initialPackage : '' }));
  const [errors, setErrors] = useState<Partial<Record<keyof Enquiry, string>>>({});
  const [status, setStatus] = useState<'idle'|'ready'|'error'|'whatsapp'>('idle');
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const slug = params.get('package');
    if (slug && packages.some(p => p.slug === slug)) setValues(v => ({ ...v, package: slug }));
    if (params.get('whatsapp') === 'unverified') setStatus('whatsapp');
  }, [location.search]);
  const validate = () => {
    const next: Partial<Record<keyof Enquiry, string>> = {};
    for (const f of formFields) {
      if (f.required && !values[f.name].trim()) next[f.name] = `${f.label} is required.`;
    }
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)) next.email = 'Enter a valid email address.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };
  const change = (key: keyof Enquiry, value: string) => {
    setValues(v => ({ ...v, [key]: value }));
    setErrors(e => ({ ...e, [key]: undefined }));
    if (status !== 'idle') setStatus('idle');
  };
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (busy) return;
    setStatus('idle');
    if (!validate()) { setStatus('error'); document.querySelector('[aria-invalid="true"]')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
    setBusy(true);
    // No endpoint is configured: validation succeeds locally, but the form is never represented as sent.
    window.setTimeout(() => { setBusy(false); setStatus('ready'); }, 180);
  };
  const whatsapp = () => {
    if (!business.verifiedWhatsAppInternational) { setStatus('whatsapp'); return; }
    // Deliberately no handoff until an owner verifies and configures the international number.
    setStatus('whatsapp');
  };
  return <PageFrame><PageHero eyebrow="CONTACT / CAMPAIGN ENQUIRY" title="LET'S TALK ABOUT YOUR NEXT CAMPAIGN." copy="Share a little about your dealership and content needs. This demo validates your details locally; it does not transmit or store an enquiry." />
    <section className="section"><div className="shell contact-layout">
      <aside className="contact-aside"><span className="eyebrow">START A CONVERSATION</span><h2>Make the brief yours.</h2><p>Tell us what you want to create, how much inventory you work with and which package you'd like to discuss. A proposal can confirm the production details.</p><div className="contact-info"><span>Contact · {business.contactName}</span><span>Phone · {business.phoneDisplay}</span><span>Instagram · {business.instagramHandle}</span><span>TikTok · {business.tiktokHandle}</span><p className="form-help">Social profile URLs and the international WhatsApp number need owner verification before live use.</p></div>
      </aside>
      <form className="contact-form" onSubmit={submit} noValidate aria-describedby="form-note">
        <div className="form-grid">{formFields.map(field => <div className={`field${field.name === 'objective' ? ' full' : ''}`} key={field.name}>
          <label htmlFor={`field-${field.name}`}>{field.label}{field.required ? ' *' : ''}</label>
          {field.options ? <select id={`field-${field.name}`} name={field.name} required={field.required} value={field.name === 'package' ? (packages.find(p => p.slug === values.package)?.name ?? '') : values[field.name]} onChange={e => change(field.name, field.name === 'package' ? (packages.find(p => p.name === e.target.value)?.slug ?? '') : e.target.value)} aria-invalid={!!errors[field.name]} aria-describedby={errors[field.name] ? `error-${field.name}` : undefined} data-testid={`select-${field.name}`}><option value="">Choose an option</option>{field.name === 'package' ? packages.map(p => <option value={p.name} key={p.slug}>{p.name} — RM {p.rate.toLocaleString('en-MY')} {p.period}</option>) : field.options.map(o => <option value={o} key={o}>{o}</option>)}</select>
          : <input id={`field-${field.name}`} name={field.name} type={field.type ?? 'text'} placeholder={field.placeholder} required={field.required} value={values[field.name]} onChange={e => change(field.name, e.target.value)} aria-invalid={!!errors[field.name]} aria-describedby={errors[field.name] ? `error-${field.name}` : undefined} data-testid={`input-${field.name}`} />}
          {errors[field.name] && <span className="field-error" id={`error-${field.name}`}>{errors[field.name]}</span>}
        </div>)}
          <div className="field full"><label htmlFor="field-message">Optional message</label><textarea id="field-message" name="message" placeholder="Anything else you'd like us to know?" value={values.message} onChange={e => change('message', e.target.value)} data-testid="input-message" /></div>
        </div>
        <p className="form-help" id="form-note">Required fields are marked *. No details are sent or saved in this demo. A secure enquiry endpoint must be configured before production.</p>
        <div className="form-actions"><button className="btn" type="submit" disabled={busy} data-testid="button-submit-enquiry">{busy ? 'Checking details…' : 'Review enquiry details'} <ArrowRight size={15} /></button><button className="btn btn-outline" type="button" onClick={whatsapp} data-testid="button-whatsapp">WhatsApp alternative <ArrowUpRight size={15} /></button></div>
        <div aria-live="polite" aria-atomic="true">
          {status === 'ready' && <div className="form-status" role="status">Your required details look complete. No enquiry was sent or stored. Please contact AMGK SkyVision through a verified channel once production contact details are configured.</div>}
          {status === 'error' && <div className="form-status error" role="alert">Please correct the highlighted fields. Your information has not been sent.</div>}
          {status === 'whatsapp' && <div className="form-status error" role="status">WhatsApp is not connected: the international phone number must be verified by the business owner first. No handoff was opened.</div>}
        </div>
      </form>
    </div></section><CtaBand />
  </PageFrame>;
}

function PrivacyPage() {
  return <PageFrame><PageHero eyebrow="PRIVACY / DEMO NOTICE" title="YOUR INFORMATION, HANDLED WITH CARE." copy="This privacy page describes the current frontend demo. It does not claim to replace a reviewed production privacy policy." />
    <section className="section"><div className="shell privacy-content">
      <span className="eyebrow">CURRENT DEMO BEHAVIOUR</span>
      <h2>Enquiry form</h2><p>The enquiry form validates required fields and email formatting in your browser. In this version it does not transmit information to AMGK SkyVision, save it to a server, or create a CRM record. The local validation response is not a submission confirmation.</p>
      <h2>Information and purpose</h2><p>If a secure enquiry service is configured in a future production version, information should be limited to details needed to respond to the dealership enquiry and handled only for that stated purpose.</p>
      <h2>Storage and retention</h2><p>This frontend demo has no enquiry storage, analytics integration, or cookie-based tracking configured. Future server-side storage, retention periods, security controls and service providers must be documented before launch.</p>
      <h2>Contact and publication</h2><p>No verified business email or privacy contact address was supplied. A production owner should add a verified contact channel and have the final privacy terms reviewed before collecting enquiries.</p>
      <div className="notice" style={{ marginTop: 28 }}>Placeholder privacy information for the concept demo. This page is not legal advice and must be reviewed and completed before a live enquiry service is launched.</div>
      <p style={{ marginTop: 22 }}>Return to <Link to="/contact" className="text-link">campaign enquiry <ArrowRight size={14} /></Link>.</p>
    </div></section><CtaBand />
  </PageFrame>;
}

function NotFound() {
  return <div className="not-found"><div><Brand /><h1>404</h1><span className="eyebrow">OFF THE MAP</span><p>This page isn't in the current frame. Head back to the studio and choose another direction.</p><Link className="btn" to="/">Back to home <ArrowRight size={16} /></Link></div></div>;
}

function Router() {
  const { pathname } = useLocation();
  usePageMeta(pathname);
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }); }, [pathname]);
  return <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/services" element={<ServicesPage />} />
    <Route path="/work" element={<WorkPage />} />
    <Route path="/packages" element={<PackagesPage />} />
    <Route path="/process" element={<ProcessPage />} />
    <Route path="/contact" element={<ContactPage />} />
    <Route path="/privacy" element={<PrivacyPage />} />
    <Route path="*" element={<NotFound />} />
  </Routes>;
}

function App() {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';
  return <BrowserRouter basename={base}><Router /></BrowserRouter>;
}

export default App;
