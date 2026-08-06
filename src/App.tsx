import { useState, useEffect, useRef, type ReactNode } from 'react'

// ─── Web3Forms ────────────────────────────────────────────────────────────────
const WEB3FORMS_KEY = 'f7c89c2c-5bc3-4ec3-8298-4180f48f51cc'

async function sendContactEmail(data: { name: string; email: string; phone: string; subject: string; message: string }) {
  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: WEB3FORMS_KEY,
      subject: `[MyITServices] ${data.subject || 'Nouveau message'} — ${data.name}`,
      from_name: data.name,
      replyto: data.email,
      message: `Nom: ${data.name}\nCourriel: ${data.email}\nTéléphone: ${data.phone || '—'}\nSujet: ${data.subject}\n\n${data.message}`,
    }),
  })
  const json = await res.json()
  if (!json.success) throw new Error(json.message)
}

// ─── Intersection Observer hook ───────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.disconnect() } },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useReveal()
  return <div ref={ref} className={className}>{children}</div>
}

// ─── Data ────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    icon: '🛠',
    title: 'Support informatique',
    desc: 'Dépannage, maintenance, mises à jour et assistance à distance ou sur site pour particuliers et entreprises.',
    color: '#dbeafe',
    img: 'https://images.unsplash.com/photo-1738598763539-227fded84bf1?w=600&h=400&fit=crop&auto=format',
  },
  {
    icon: '🌐',
    title: 'Création de sites web',
    desc: 'Sites vitrines, boutiques en ligne et applications web sur mesure, modernes et optimisés pour le référencement.',
    color: '#dcfce7',
    img: 'https://images.unsplash.com/photo-1726594699522-d7c2f5459f52?w=600&h=400&fit=crop&auto=format',
  },
  {
    icon: '📧',
    title: 'Microsoft 365',
    desc: "Configuration complète de vos comptes professionnels : Outlook, Teams, SharePoint, OneDrive et Azure AD.",
    color: '#ede9fe',
    img: 'https://images.unsplash.com/photo-1649433391841-02a04e22ad50?w=600&h=400&fit=crop&auto=format',
  },
  {
    icon: '📱',
    title: 'Création de contenu',
    desc: 'Photos, vidéos, graphismes et gestion de réseaux sociaux pour renforcer votre présence en ligne.',
    color: '#fef9c3',
    img: 'https://images.unsplash.com/photo-1683721003111-070bcc053d8b?w=600&h=400&fit=crop&auto=format',
  },
  {
    icon: '🔒',
    title: 'Cybersécurité',
    desc: 'Audit de sécurité, antivirus, sauvegardes et formation de vos équipes aux bonnes pratiques numériques.',
    color: '#fee2e2',
    img: 'https://images.unsplash.com/photo-1602016736566-7ed6a58894bd?w=600&h=400&fit=crop&auto=format',
  },
  {
    icon: '☁️',
    title: 'Solutions infonuagiques',
    desc: "Migration vers le cloud, gestion de serveurs virtuels et déploiement d'infrastructures évolutives.",
    color: '#e0f2fe',
    img: 'https://images.unsplash.com/photo-1497015289639-54688650d173?w=600&h=400&fit=crop&auto=format',
  },
]

const PORTFOLIO = [
  { title: 'RachetPC.com', cat: 'Site web', desc: "Plateforme complète de rachat de laptops usagés pour particuliers et entreprises. Formulaire d'estimation instantanée, algorithme de prix et formulaire de contact intégré.", color: '#0a0f0d', img: 'https://images.unsplash.com/photo-1511385348-a52b4a160dc2?w=700&h=480&fit=crop&auto=format', link: 'https://rachetpc.com' },
  { title: 'Clinique Beausoleil', cat: 'Site web', desc: 'Site vitrine avec prise de rendez-vous en ligne pour une clinique dentaire de Laval.', color: '#1d1d1f', img: 'https://images.unsplash.com/photo-1528109966604-5a6a4a964e8d?w=700&h=480&fit=crop&auto=format' },
  { title: 'Groupe Lefebvre Inc.', cat: 'Microsoft 365', desc: 'Migration complète de 45 employés vers Microsoft 365 avec configuration Teams et SharePoint.', color: '#0071e3', img: 'https://images.unsplash.com/photo-1666698809123-44e998e93f23?w=700&h=480&fit=crop&auto=format' },
  { title: 'Studio Volta', cat: 'Création de contenu', desc: 'Stratégie de contenu, vidéos courtes et graphismes pour Instagram et LinkedIn.', color: '#6d28d9', img: 'https://images.unsplash.com/photo-1760008486593-a85315610136?w=700&h=480&fit=crop&auto=format' },
  { title: 'Électro-Nord HVAC', cat: 'Support informatique', desc: "Contrat de maintenance mensuel, helpdesk et gestion du parc de 12 postes de travail.", color: '#065f46', img: 'https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=700&h=480&fit=crop&auto=format' },
  { title: 'Boulangerie Maison Pain', cat: 'Site web + SEO', desc: 'Boutique en ligne Shopify avec référencement local et intégration des réseaux sociaux.', color: '#92400e', img: 'https://images.unsplash.com/photo-1511385348-a52b4a160dc2?w=700&h=480&fit=crop&auto=format' },
  { title: 'Cabinet Arcand Avocats', cat: 'Cybersécurité', desc: 'Audit complet, mise en place MFA, chiffrement des données et formation du personnel.', color: '#7f1d1d', img: 'https://images.unsplash.com/photo-1597673030062-0a0f1a801a31?w=700&h=480&fit=crop&auto=format' },
]

const TESTIMONIALS = [
  { name: 'Marie-Claude Tremblay', role: 'Directrice, Clinique Beausoleil', text: "L'équipe de My IT Services a transformé notre présence en ligne. Notre nouveau site génère des demandes de rendez-vous en continu. Service professionnel, rapide et vraiment à l'écoute.", avatar: 'MC', stars: 5 },
  { name: 'François Gagnon', role: 'Président, Groupe Lefebvre Inc.', text: "La migration vers Microsoft 365 s'est faite en un weekend sans interruption. 45 employés opérationnels le lundi matin. Je recommande sans hésitation.", avatar: 'FG', stars: 5 },
  { name: 'Sarah Beauchemin', role: 'Fondatrice, Studio Volta', text: "Ils ont créé une identité visuelle cohérente sur tous nos canaux. Notre engagement Instagram a triplé en 3 mois. Des pros créatifs et fiables.", avatar: 'SB', stars: 5 },
  { name: 'Jean-Pierre Côté', role: 'Propriétaire, Électro-Nord HVAC', text: "Depuis que My IT Services gère notre informatique, plus de panique. Problème résolu en moins d'une heure, peu importe l'heure. Excellent contrat de support.", avatar: 'JP', stars: 5 },
]

const STATS = [
  { val: '150+', label: 'Clients satisfaits' },
  { val: '8 ans', label: "d'expérience" },
  { val: '98%', label: 'Taux de satisfaction' },
  { val: '< 1h', label: 'Temps de réponse' },
]

// ─── Legal / Policy modals ────────────────────────────────────────────────────
function LegalModal({ type, onClose }: { type: 'privacy' | 'terms' | 'accessibility'; onClose: () => void }) {
  const content = {
    privacy: {
      title: 'Politique de confidentialité',
      sections: [
        { h: 'Responsable du traitement', p: 'My IT Services — contact@myitservices.ca — 819 593-8087 — Montréal, Québec, Canada.' },
        { h: 'Données collectées', p: "Nous collectons les informations que vous nous fournissez via notre formulaire de contact : nom complet, adresse courriel, numéro de téléphone (optionnel), sujet de la demande et contenu du message. Nous ne collectons aucune donnée automatiquement au-delà des cookies techniques essentiels." },
        { h: 'Finalités du traitement', p: "Vos données sont utilisées exclusivement pour répondre à vos demandes d'information ou de service, vous transmettre des devis ou des suivis de dossier, et améliorer la qualité de nos prestations." },
        { h: 'Base légale', p: "Le traitement est fondé sur votre consentement explicite lors de la soumission du formulaire, et sur l'exécution des mesures précontractuelles à votre demande, conformément à la Loi sur la protection des renseignements personnels dans le secteur privé (Loi 25) du Québec." },
        { h: 'Conservation', p: "Vos données sont conservées pour une durée maximale de 24 mois après votre dernier contact. Les données relatives aux mandats facturés sont archivées 7 ans conformément à la loi fiscale canadienne." },
        { h: 'Partage des données', p: "Vos informations ne sont jamais vendues à des tiers. Elles peuvent être transmises uniquement à nos prestataires techniques (hébergement, envoi de courriels) dans le cadre strict de l'exécution du service, sous contrat de confidentialité." },
        { h: 'Vos droits', p: "Conformément à la Loi 25, vous disposez du droit d'accès, de rectification, d'effacement, de portabilité et de retrait du consentement. Pour exercer ces droits : contact@myitservices.ca." },
        { h: 'Cookies', p: "Ce site utilise uniquement des cookies techniques essentiels à son fonctionnement. Aucun cookie publicitaire ou de traçage tiers n'est déposé." },
        { h: 'Sécurité', p: "Toutes les communications sont chiffrées via HTTPS. L'accès aux données est restreint aux membres autorisés de My IT Services." },
        { h: 'Mise à jour', p: 'Dernière mise à jour : août 2026. Nous vous informerons de tout changement significatif par courriel.' },
      ],
    },
    terms: {
      title: "Conditions d'utilisation",
      sections: [
        { h: 'Acceptation', p: "En accédant à ce site, vous acceptez les présentes conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser ce site." },
        { h: 'Description des services', p: "My IT Services propose des services informatiques professionnels : support technique, création de sites web, configuration Microsoft 365, cybersécurité, solutions infonuagiques et création de contenu numérique." },
        { h: 'Propriété intellectuelle', p: "L'ensemble du contenu de ce site (textes, images, logos, graphismes, code source) est la propriété exclusive de My IT Services et est protégé par les lois canadiennes sur le droit d'auteur. Toute reproduction sans autorisation écrite est interdite." },
        { h: 'Utilisation acceptable', p: "Vous vous engagez à utiliser ce site uniquement à des fins légales, à ne pas tenter d'en compromettre la sécurité, à ne pas y diffuser de contenu illicite ou nuisible, et à ne pas utiliser nos coordonnées à des fins commerciales non sollicitées (spam)." },
        { h: 'Devis et engagements', p: "Les informations présentes sur ce site sont fournies à titre indicatif. Tout engagement de service fait l'objet d'un devis écrit distinct. My IT Services se réserve le droit de refuser toute demande de service." },
        { h: 'Limitation de responsabilité', p: "My IT Services ne saurait être tenu responsable des dommages directs ou indirects résultant de l'utilisation de ce site. Nous mettons tout en œuvre pour maintenir le site accessible et à jour, sans garantir l'exactitude en temps réel de toutes les informations." },
        { h: 'Liens externes', p: "Ce site peut contenir des liens vers des sites tiers (ex : téléchargement TeamViewer). My IT Services n'est pas responsable du contenu ou des pratiques de confidentialité de ces sites." },
        { h: 'Droit applicable', p: "Les présentes conditions sont régies par le droit en vigueur dans la province de Québec, Canada. Tout litige sera porté devant les tribunaux de la juridiction de Montréal." },
        { h: 'Modifications', p: "My IT Services se réserve le droit de modifier ces conditions à tout moment. Les modifications entrent en vigueur dès leur publication sur cette page." },
        { h: 'Contact', p: "Pour toute question : contact@myitservices.ca — 819 593-8087." },
      ],
    },
    accessibility: {
      title: 'Accessibilité',
      sections: [
        { h: 'Notre engagement', p: "My IT Services s'engage à rendre son site web accessible au plus grand nombre, y compris aux personnes en situation de handicap. Nous travaillons à rendre ce site conforme aux Règles pour l'accessibilité des contenus Web (WCAG) 2.1, niveau AA." },
        { h: 'Mesures mises en place', p: "Le site utilise une hiérarchie de titres claire (H1, H2, H3), des contrastes de couleurs conformes aux normes WCAG AA (ratio minimum 4.5:1 pour le texte courant), des attributs alt descriptifs sur toutes les images, une navigation possible au clavier, et des polices lisibles à des tailles adaptées." },
        { h: 'Navigation au clavier', p: "Toutes les fonctionnalités du site sont accessibles via le clavier. Les éléments interactifs (boutons, liens, formulaires) possèdent des indicateurs de focus visibles." },
        { h: 'Technologies assistives', p: "Ce site est compatible avec les principaux lecteurs d'écran (NVDA, JAWS, VoiceOver). Les formulaires sont correctement étiquetés pour une utilisation optimale avec ces technologies." },
        { h: 'Contenu multimédia', p: "Les images significatives disposent d'un texte alternatif descriptif. Les éléments purement décoratifs sont masqués aux technologies assistives." },
        { h: 'Taille du texte', p: "Le texte peut être agrandi jusqu'à 200% sans perte de contenu ni de fonctionnalité. La mise en page s'adapte aux préférences de l'utilisateur." },
        { h: 'Limitations connues', p: "Certaines sections de notre site peuvent ne pas encore atteindre le niveau d'accessibilité idéal. Nous travaillons activement à les améliorer. Si vous rencontrez une difficulté, contactez-nous." },
        { h: 'Signaler un problème', p: "Si vous rencontrez un obstacle d'accessibilité sur notre site, nous vous invitons à nous le signaler : contact@myitservices.ca. Nous nous engageons à répondre dans les 5 jours ouvrables et à proposer une solution alternative si nécessaire." },
        { h: 'Mise à jour', p: "Cette déclaration d'accessibilité a été établie en août 2026 et sera révisée annuellement." },
      ],
    },
  }

  const c = content[type]
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }} onClick={onClose} />
      <div style={{ position: 'relative', background: '#fff', borderRadius: 24, width: '100%', maxWidth: 680, maxHeight: '88vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 40px 100px rgba(0,0,0,0.25)' }}>
        <div style={{ padding: '28px 32px 20px', borderBottom: '1px solid #f2f2f2', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 22, color: '#1d1d1f', margin: 0 }}>{c.title}</h2>
          <button onClick={onClose} style={{ width: 36, height: 36, borderRadius: '50%', background: '#f5f5f7', border: 'none', cursor: 'pointer', fontSize: 18, color: '#6e6e73', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
        </div>
        <div style={{ overflowY: 'auto', padding: '24px 32px 32px', flex: 1 }}>
          {c.sections.map(s => (
            <div key={s.h} style={{ marginBottom: 24 }}>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 16, color: '#1d1d1f', marginBottom: 8 }}>{s.h}</h3>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: '#6e6e73', lineHeight: 1.7 }}>{s.p}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Nav ─────────────────────────────────────────────────────────────────────
function Nav({ activePage, setPage }: { activePage: string; setPage: (p: string) => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { id: 'home', label: 'Accueil' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Réalisations' },
    { id: 'temoignages', label: 'Avis clients' },
    { id: 'contact', label: 'Contact' },
  ]

  const go = (id: string) => { setPage(id); setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(255,255,255,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(0,0,0,0.08)' : 'none',
      transition: 'all 0.3s ease',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        <button onClick={() => go('home')} style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 20, color: '#1d1d1f', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '-0.5px' }}>
          My<span style={{ color: '#0071e3' }}>IT</span>Services
        </button>
        {/* Desktop */}
        <div className="hidden md:flex" style={{ gap: 32, alignItems: 'center' }}>
          {links.map(l => (
            <button key={l.id} onClick={() => go(l.id)} style={{
              fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: activePage === l.id ? 600 : 400,
              color: activePage === l.id ? '#0071e3' : '#1d1d1f', background: 'none', border: 'none', cursor: 'pointer',
              transition: 'color 0.2s',
            }}>{l.label}</button>
          ))}
          <button onClick={() => go('contact')} style={{
            fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 600, fontSize: 14,
            background: '#0071e3', color: '#fff', border: 'none', borderRadius: 980,
            padding: '10px 22px', cursor: 'pointer', transition: 'background 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = '#0077ed')}
          onMouseLeave={e => (e.currentTarget.style.background = '#0071e3')}
          >Nous joindre</button>
        </div>
        {/* Mobile hamburger */}
        <button className="flex md:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}>
          <div style={{ width: 22, display: 'flex', flexDirection: 'column', gap: 5 }}>
            {[0,1,2].map(i => <div key={i} style={{ height: 2, background: '#1d1d1f', borderRadius: 2, transition: '0.3s', width: i === 1 && menuOpen ? '70%' : '100%' }} />)}
          </div>
        </button>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(0,0,0,0.08)', padding: '16px 24px 24px' }}>
          {links.map(l => (
            <button key={l.id} onClick={() => go(l.id)} style={{ display: 'block', width: '100%', textAlign: 'left', fontFamily: "'Inter',sans-serif", fontSize: 16, fontWeight: 500, color: activePage === l.id ? '#0071e3' : '#1d1d1f', background: 'none', border: 'none', cursor: 'pointer', padding: '12px 0', borderBottom: '1px solid #f2f2f2' }}>
              {l.label}
            </button>
          ))}
          <button onClick={() => go('contact')} style={{ marginTop: 16, width: '100%', fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 600, fontSize: 16, background: '#0071e3', color: '#fff', border: 'none', borderRadius: 12, padding: '14px', cursor: 'pointer' }}>Nous joindre</button>
        </div>
      )}
    </nav>
  )
}

// ─── HOME PAGE ───────────────────────────────────────────────────────────────
function HomePage({ setPage }: { setPage: (p: string) => void }) {
  return (
    <div>
      {/* Hero */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', background: '#f5f5f7', position: 'relative', overflow: 'hidden', paddingTop: 80 }}>
        {/* Background image */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1600&h=900&fit=crop&auto=format)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.08,
        }} />
        {/* Gradient overlay bottom */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 200, background: 'linear-gradient(transparent, #f5f5f7)' }} />

        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 24px', position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: 780 }}>
            <div className="anim-fade-up" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#e8f0fe', borderRadius: 980, padding: '6px 16px', marginBottom: 32, animation: 'fadeUp 0.6s cubic-bezier(.22,1,.36,1) forwards' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#0071e3', display: 'block' }} />
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 500, color: '#0071e3' }}>Services informatiques · Montréal, Québec</span>
            </div>
            <h1 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 'clamp(44px, 7vw, 84px)', lineHeight: 1.05, letterSpacing: '-2px', color: '#1d1d1f', marginBottom: 28, animation: 'fadeUp 0.7s 0.1s cubic-bezier(.22,1,.36,1) both' }}>
              La technologie,<br />
              <span style={{ color: '#0071e3' }}>simplifiée</span> pour vous.
            </h1>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 20, lineHeight: 1.6, color: '#6e6e73', maxWidth: 560, marginBottom: 44, animation: 'fadeUp 0.7s 0.2s cubic-bezier(.22,1,.36,1) both' }}>
              Support informatique, création web, Microsoft 365 et bien plus — pour les particuliers et les PME du Québec.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', animation: 'fadeUp 0.7s 0.3s cubic-bezier(.22,1,.36,1) both' }}>
              <button onClick={() => { setPage('contact'); window.scrollTo({ top: 0 }) }} style={{
                fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 17,
                background: '#0071e3', color: '#fff', border: 'none', borderRadius: 980,
                padding: '16px 36px', cursor: 'pointer', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#0077ed'; e.currentTarget.style.transform = 'scale(1.02)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#0071e3'; e.currentTarget.style.transform = 'scale(1)' }}
              >Obtenir une consultation gratuite</button>
              <button onClick={() => { setPage('services'); window.scrollTo({ top: 0 }) }} style={{
                fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 600, fontSize: 17,
                background: 'transparent', color: '#1d1d1f', border: '1.5px solid #d2d2d7',
                borderRadius: 980, padding: '16px 36px', cursor: 'pointer', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#0071e3'; e.currentTarget.style.color = '#0071e3' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#d2d2d7'; e.currentTarget.style.color = '#1d1d1f' }}
              >Voir nos services</button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section style={{ background: '#1d1d1f', padding: '56px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 32 }}>
          {STATS.map((s, i) => (
            <Reveal key={s.label} className={`anim-fade-up delay-${i + 1}`} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 44, color: '#fff', letterSpacing: '-1px' }}>{s.val}</div>
              <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: '#86868b', marginTop: 4 }}>{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Services preview */}
      <section style={{ padding: '100px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal className="anim-fade-up" style={{ textAlign: 'center', marginBottom: 64 }}>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: 600, color: '#0071e3', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 16 }}>Nos expertises</p>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 'clamp(32px, 5vw, 52px)', letterSpacing: '-1.5px', color: '#1d1d1f', marginBottom: 16 }}>Tout ce qu'il vous faut,<br />au même endroit.</h2>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 18, color: '#6e6e73', maxWidth: 500, margin: '0 auto' }}>Des solutions complètes pour que vous puissiez vous concentrer sur votre cœur de métier.</p>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {SERVICES.slice(0, 3).map((s, i) => (
              <Reveal key={s.title} className={`anim-fade-up delay-${i + 1}`}>
                <ServiceCard s={s} />
              </Reveal>
            ))}
          </div>
          <Reveal className="anim-fade-up delay-3" style={{ textAlign: 'center', marginTop: 48 }}>
            <button onClick={() => { setPage('services'); window.scrollTo({ top: 0 }) }} style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 600, fontSize: 16, color: '#0071e3', background: 'none', border: '1.5px solid #0071e3', borderRadius: 980, padding: '14px 32px', cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#0071e3'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#0071e3' }}
            >Voir tous les services →</button>
          </Reveal>
        </div>
      </section>

      {/* CTA band */}
      <section style={{ background: '#0071e3', padding: '80px 24px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <Reveal className="anim-scale">
            <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 'clamp(28px, 4vw, 44px)', letterSpacing: '-1px', color: '#fff', marginBottom: 20 }}>
              Prêt à passer à la vitesse supérieure ?
            </h2>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 18, color: 'rgba(255,255,255,0.8)', marginBottom: 40 }}>Consultation gratuite, sans engagement. On analyse vos besoins et on vous propose les meilleures solutions.</p>
            <button onClick={() => { setPage('contact'); window.scrollTo({ top: 0 }) }} style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 17, background: '#fff', color: '#0071e3', border: 'none', borderRadius: 980, padding: '16px 40px', cursor: 'pointer', transition: 'transform 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
            >Nous contacter maintenant</button>
          </Reveal>
        </div>
      </section>

      {/* Testimonials preview */}
      <section style={{ padding: '100px 24px', background: '#f5f5f7' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal className="anim-fade-up" style={{ textAlign: 'center', marginBottom: 64 }}>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: 600, color: '#0071e3', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 16 }}>Témoignages</p>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 'clamp(28px, 4vw, 44px)', letterSpacing: '-1px', color: '#1d1d1f' }}>Ce que disent nos clients</h2>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {TESTIMONIALS.slice(0, 2).map((t, i) => (
              <Reveal key={t.name} className={`anim-fade-up delay-${i + 1}`}>
                <TestimonialCard t={t} />
              </Reveal>
            ))}
          </div>
          <Reveal className="anim-fade-up delay-3" style={{ textAlign: 'center', marginTop: 40 }}>
            <button onClick={() => { setPage('temoignages'); window.scrollTo({ top: 0 }) }} style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 600, fontSize: 15, color: '#0071e3', background: 'none', border: 'none', cursor: 'pointer' }}>
              Lire tous les avis →
            </button>
          </Reveal>
        </div>
      </section>
    </div>
  )
}

// ─── SERVICE CARD ─────────────────────────────────────────────────────────────
function ServiceCard({ s }: { s: typeof SERVICES[0] }) {
  const [hov, setHov] = useState(false)
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
      background: '#fff', borderRadius: 20, overflow: 'hidden',
      border: '1px solid #e8e8ed',
      boxShadow: hov ? '0 20px 60px rgba(0,0,0,0.12)' : '0 2px 12px rgba(0,0,0,0.06)',
      transform: hov ? 'translateY(-4px)' : 'none',
      transition: 'all 0.3s cubic-bezier(.22,1,.36,1)',
    }}>
      <div style={{ height: 200, overflow: 'hidden', background: s.color }}>
        <img src={s.img} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', transform: hov ? 'scale(1.06)' : 'scale(1)' }} />
      </div>
      <div style={{ padding: '28px 28px 32px' }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>{s.icon}</div>
        <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 20, color: '#1d1d1f', marginBottom: 10 }}>{s.title}</h3>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, lineHeight: 1.6, color: '#6e6e73' }}>{s.desc}</p>
      </div>
    </div>
  )
}

// ─── TESTIMONIAL CARD ─────────────────────────────────────────────────────────
function TestimonialCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <div style={{ background: '#fff', borderRadius: 20, padding: '32px', border: '1px solid #e8e8ed', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
      <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
        {Array(t.stars).fill(0).map((_, i) => <span key={i} style={{ color: '#ff9f0a', fontSize: 16 }}>★</span>)}
      </div>
      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, lineHeight: 1.7, color: '#3a3a3c', marginBottom: 24, fontStyle: 'italic' }}>"{t.text}"</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#0071e3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 14, color: '#fff', flexShrink: 0 }}>{t.avatar}</div>
        <div>
          <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 15, color: '#1d1d1f' }}>{t.name}</div>
          <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: '#6e6e73' }}>{t.role}</div>
        </div>
      </div>
    </div>
  )
}

// ─── TEAMVIEWER SECTION ───────────────────────────────────────────────────────
function TeamViewerSection() {
  const platforms = [
    {
      label: 'Windows',
      icon: '🪟',
      desc: 'Windows 10 / 11',
      url: 'https://download.teamviewer.com/download/TeamViewer_Setup.exe',
      color: '#0078d4',
    },
    {
      label: 'macOS',
      icon: '🍎',
      desc: 'macOS 12+',
      url: 'https://download.teamviewer.com/download/TeamViewer.dmg',
      color: '#1d1d1f',
    },
    {
      label: 'Android',
      icon: '📱',
      desc: 'Android 8+',
      url: 'https://play.google.com/store/apps/details?id=com.teamviewer.quicksupport.market',
      color: '#34a853',
    },
    {
      label: 'iOS / iPadOS',
      icon: '📲',
      desc: 'iOS 16+',
      url: 'https://apps.apple.com/app/teamviewer-quicksupport/id661649585',
      color: '#555',
    },
  ]

  return (
    <Reveal className="anim-scale" style={{ maxWidth: 1100, margin: '64px auto 0' }}>
      <div style={{ background: '#f5f5f7', borderRadius: 24, padding: '52px 48px', border: '1px solid #e8e8ed' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 56, alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#dbeafe', borderRadius: 980, padding: '6px 14px', marginBottom: 20 }}>
              <span style={{ fontSize: 14 }}>🖥</span>
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 600, color: '#0071e3' }}>Assistance à distance</span>
            </div>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 'clamp(26px, 3.5vw, 38px)', letterSpacing: '-1px', color: '#1d1d1f', marginBottom: 16 }}>Téléchargez TeamViewer<br />pour votre session d'aide.</h2>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: '#6e6e73', lineHeight: 1.7, marginBottom: 24 }}>
              Pour votre assistance à distance, téléchargez TeamViewer QuickSupport sur votre appareil. Une fois installé, appelez-nous au <strong style={{ color: '#1d1d1f' }}>819 593-8087</strong> et communiquez-nous l'identifiant affiché. Nous prendrons le contrôle en toute sécurité pour résoudre votre problème.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Connexion chiffrée bout en bout', 'Aucune installation permanente requise', 'Session terminée dès que vous fermez l\'app', 'Compatible avec tous les appareils'].map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: "'Inter',sans-serif", fontSize: 14, color: '#3a3a3c' }}>
                  <span style={{ color: '#0071e3', fontWeight: 700, fontSize: 16 }}>✓</span> {f}
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {platforms.map(p => (
              <a key={p.label} href={p.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', background: '#fff', borderRadius: 18, padding: '24px 20px', border: '1.5px solid #e8e8ed', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 10, transition: 'all 0.25s cubic-bezier(.22,1,.36,1)', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = '#0071e3'; el.style.boxShadow = '0 12px 32px rgba(0,113,227,0.12)'; el.style.transform = 'translateY(-3px)' }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = '#e8e8ed'; el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; el.style.transform = 'none' }}
              >
                <span style={{ fontSize: 36 }}>{p.icon}</span>
                <div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 16, color: '#1d1d1f' }}>{p.label}</div>
                  <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: '#6e6e73', marginTop: 2 }}>{p.desc}</div>
                </div>
                <div style={{ background: '#0071e3', color: '#fff', fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 600, fontSize: 13, borderRadius: 980, padding: '8px 18px', width: '100%', textAlign: 'center' }}>
                  Télécharger ↓
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  )
}

// ─── SERVICES PAGE ────────────────────────────────────────────────────────────
function ServicesPage({ setPage }: { setPage: (p: string) => void }) {
  return (
    <div style={{ paddingTop: 80 }}>
      <div style={{ background: '#f5f5f7', padding: '80px 24px 64px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal className="anim-fade-up">
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: 600, color: '#0071e3', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 16 }}>Nos services</p>
            <h1 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 'clamp(36px, 6vw, 68px)', letterSpacing: '-2px', color: '#1d1d1f', marginBottom: 20 }}>Solutions complètes<br />pour votre réussite.</h1>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 18, color: '#6e6e73', maxWidth: 560 }}>Que vous soyez un particulier ou une entreprise, nous avons l'expertise pour répondre à tous vos besoins technologiques.</p>
          </Reveal>
        </div>
      </div>
      <div style={{ padding: '64px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 28 }}>
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} className={`anim-fade-up delay-${(i % 3) + 1}`}>
              <ServiceCard s={s} />
            </Reveal>
          ))}
        </div>
        {/* TeamViewer section */}
        <TeamViewerSection />

        <Reveal className="anim-fade-up delay-2" style={{ marginTop: 56, background: '#0071e3', borderRadius: 24, padding: '56px 48px', textAlign: 'center', maxWidth: 1100, marginLeft: 'auto', marginRight: 'auto' }}>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 36, color: '#fff', marginBottom: 16, letterSpacing: '-1px' }}>Besoin d'un service personnalisé ?</h2>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 17, color: 'rgba(255,255,255,0.8)', marginBottom: 32 }}>Chaque client est unique. Parlons de votre situation et construisons ensemble la solution idéale.</p>
          <button onClick={() => { setPage('contact'); window.scrollTo({ top: 0 }) }} style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 16, background: '#fff', color: '#0071e3', border: 'none', borderRadius: 980, padding: '14px 36px', cursor: 'pointer' }}>Demander un devis gratuit</button>
        </Reveal>
      </div>
    </div>
  )
}

// ─── PORTFOLIO PAGE ───────────────────────────────────────────────────────────
function PortfolioPage() {
  const [active, setActive] = useState('Tous')
  const cats = ['Tous', 'Site web', 'Microsoft 365', 'Création de contenu', 'Support informatique', 'Cybersécurité']
  const filtered = active === 'Tous' ? PORTFOLIO : PORTFOLIO.filter(p => p.cat.includes(active.split(' ')[0]))

  return (
    <div style={{ paddingTop: 80 }}>
      <div style={{ background: '#f5f5f7', padding: '80px 24px 64px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal className="anim-fade-up">
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: 600, color: '#0071e3', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 16 }}>Portfolio</p>
            <h1 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 'clamp(36px, 6vw, 68px)', letterSpacing: '-2px', color: '#1d1d1f', marginBottom: 20 }}>Nos réalisations.</h1>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 18, color: '#6e6e73', maxWidth: 540 }}>Des projets concrets menés à bien pour des clients partout au Québec. Chaque réalisation reflète notre engagement envers l'excellence.</p>
          </Reveal>
        </div>
      </div>
      <div style={{ padding: '48px 24px 80px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {/* Filter tabs */}
          <Reveal className="anim-fade-up" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 48 }}>
            {cats.map(c => (
              <button key={c} onClick={() => setActive(c)} style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 14, padding: '8px 20px', borderRadius: 980, border: active === c ? 'none' : '1.5px solid #d2d2d7', background: active === c ? '#0071e3' : 'transparent', color: active === c ? '#fff' : '#1d1d1f', cursor: 'pointer', transition: 'all 0.2s' }}>{c}</button>
            ))}
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
            {filtered.map((p, i) => <PortfolioCard key={p.title} p={p} i={i} />)}
          </div>
        </div>
      </div>
    </div>
  )
}

function PortfolioCard({ p, i }: { p: typeof PORTFOLIO[0] & { link?: string }; i: number }) {
  const [hov, setHov] = useState(false)
  return (
    <Reveal className={`anim-scale delay-${(i % 3) + 1}`}>
      <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ borderRadius: 20, overflow: 'hidden', position: 'relative', cursor: 'pointer', boxShadow: hov ? '0 24px 64px rgba(0,0,0,0.16)' : '0 2px 16px rgba(0,0,0,0.07)', transform: hov ? 'translateY(-4px)' : 'none', transition: 'all 0.35s cubic-bezier(.22,1,.36,1)' }}>
        {p.link && (
          <div style={{ position: 'absolute', top: 14, right: 14, zIndex: 10, background: '#00e87a', borderRadius: 980, padding: '4px 12px', fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 700, color: '#0a0f0d', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            Notre réalisation ✓
          </div>
        )}
        <div style={{ height: 260, overflow: 'hidden', background: '#e8e8ed' }}>
          <img src={p.img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease', transform: hov ? 'scale(1.08)' : 'scale(1)' }} />
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, transparent 40%, ${p.color}ee)`, transition: 'opacity 0.3s', opacity: hov ? 1 : 0.7 }} />
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px 24px 28px' }}>
          <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase', letterSpacing: '1px' }}>{p.cat}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6, marginBottom: 8 }}>
            <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 22, color: '#fff', letterSpacing: '-0.5px', margin: 0 }}>{p.title}</h3>
            {p.link && hov && (
              <a href={p.link} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 600, color: '#00e87a', background: 'rgba(0,0,0,0.4)', borderRadius: 6, padding: '3px 8px', textDecoration: 'none', transition: 'opacity 0.2s', whiteSpace: 'nowrap' }}>
                Visiter ↗
              </a>
            )}
          </div>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5, maxHeight: hov ? 80 : 0, overflow: 'hidden', transition: 'max-height 0.3s ease, opacity 0.3s', opacity: hov ? 1 : 0 }}>{p.desc}</p>
        </div>
      </div>
    </Reveal>
  )
}

// ─── TESTIMONIALS PAGE ────────────────────────────────────────────────────────
function TestimonialsPage({ setPage }: { setPage: (p: string) => void }) {
  return (
    <div style={{ paddingTop: 80 }}>
      <div style={{ background: '#f5f5f7', padding: '80px 24px 64px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal className="anim-fade-up">
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: 600, color: '#0071e3', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 16 }}>Avis clients</p>
            <h1 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 'clamp(36px, 6vw, 68px)', letterSpacing: '-2px', color: '#1d1d1f', marginBottom: 20 }}>La satisfaction<br />avant tout.</h1>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 18, color: '#6e6e73', maxWidth: 500 }}>Ce que nos clients disent de nous est la meilleure carte de visite qui soit.</p>
          </Reveal>
        </div>
      </div>
      <div style={{ padding: '64px 24px 80px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {/* Rating summary */}
          <Reveal className="anim-scale" style={{ background: '#f5f5f7', borderRadius: 24, padding: '40px', textAlign: 'center', marginBottom: 64 }}>
            <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 72, color: '#1d1d1f', lineHeight: 1 }}>5.0</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 6, margin: '12px 0' }}>
              {Array(5).fill(0).map((_, i) => <span key={i} style={{ color: '#ff9f0a', fontSize: 28 }}>★</span>)}
            </div>
            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: '#6e6e73' }}>Basé sur 150+ avis vérifiés</div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} className={`anim-fade-up delay-${(i % 3) + 1}`}>
                <TestimonialCard t={t} />
              </Reveal>
            ))}
            {/* Extra testimonials */}
            {[
              { name: 'Lucie Chartrand', role: 'Avocate indépendante', text: "Transfert de mon bureau vers Teams et OneDrive sans perdre un seul fichier. Disponibles et très patients pour expliquer chaque étape. Merci !", avatar: 'LC', stars: 5 },
              { name: 'Patrick Ouellet', role: 'Directeur TI, Immobilier Ouellet', text: "Un audit cybersécurité complet qui nous a permis d'identifier des failles critiques. Rapport clair, recommandations concrètes, suivi rigoureux.", avatar: 'PO', stars: 5 },
            ].map((t, i) => (
              <Reveal key={t.name} className={`anim-fade-up delay-${i + 1}`}>
                <TestimonialCard t={t} />
              </Reveal>
            ))}
          </div>
          <Reveal className="anim-fade-up delay-3" style={{ textAlign: 'center', marginTop: 64 }}>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 18, color: '#6e6e73', marginBottom: 28 }}>Vous aussi, faites confiance à My IT Services.</p>
            <button onClick={() => { setPage('contact'); window.scrollTo({ top: 0 }) }} style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 16, background: '#0071e3', color: '#fff', border: 'none', borderRadius: 980, padding: '16px 40px', cursor: 'pointer' }}>Demander une consultation</button>
          </Reveal>
        </div>
      </div>
    </div>
  )
}

// ─── CONTACT PAGE ─────────────────────────────────────────────────────────────
function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const upd = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm(f => ({ ...f, [k]: e.target.value }))

  const isValid = form.name && form.email && form.message

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return
    setStatus('sending')
    try {
      await sendContactEmail(form)
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', fontFamily: "'Inter',sans-serif", fontSize: 15,
    background: '#f5f5f7', border: '1.5px solid #e8e8ed', borderRadius: 12,
    padding: '14px 18px', color: '#1d1d1f', outline: 'none', transition: 'border-color 0.2s',
  }

  return (
    <div style={{ paddingTop: 80 }}>
      <div style={{ background: '#f5f5f7', padding: '80px 24px 64px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal className="anim-fade-up">
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: 600, color: '#0071e3', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 16 }}>Contact</p>
            <h1 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 'clamp(36px, 6vw, 68px)', letterSpacing: '-2px', color: '#1d1d1f', marginBottom: 20 }}>Parlons de<br />votre projet.</h1>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 18, color: '#6e6e73', maxWidth: 500 }}>Consultation gratuite, sans engagement. On vous répond dans la journée.</p>
          </Reveal>
        </div>
      </div>

      <div style={{ padding: '64px 24px 100px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80, alignItems: 'start' }}>

          {/* Info side */}
          <Reveal className="anim-slide-r">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
              {[
                { icon: '📍', title: 'Notre secteur', val: 'Montréal & région, Québec' },
                { icon: '📞', title: 'Téléphone', val: '819 593-8087' },
                { icon: '✉️', title: 'Courriel', val: 'contact@myitservices.ca' },
                { icon: '🕐', title: 'Disponibilité', val: 'Lun – Ven : 8h – 18h\nUrgences 24/7 pour clients sous contrat' },
              ].map(info => (
                <div key={info.title} style={{ display: 'flex', gap: 20 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: '#e8f0fe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{info.icon}</div>
                  <div>
                    <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 16, color: '#1d1d1f', marginBottom: 4 }}>{info.title}</div>
                    <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: '#6e6e73', lineHeight: 1.5, whiteSpace: 'pre-line' }}>{info.val}</div>
                  </div>
                </div>
              ))}
              <div style={{ background: '#f5f5f7', borderRadius: 20, padding: '28px', marginTop: 8 }}>
                <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 18, color: '#1d1d1f', marginBottom: 8 }}>Consultation gratuite</div>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: '#6e6e73', lineHeight: 1.6 }}>Nous offrons une première rencontre d'analyse de vos besoins — sans frais, sans obligation. On vient chez vous ou on se retrouve en visio.</p>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal className="anim-fade-up delay-2">
            {status === 'sent' ? (
              <div style={{ background: '#f0fdf4', border: '1.5px solid #bbf7d0', borderRadius: 24, padding: '64px 48px', textAlign: 'center' }}>
                <div style={{ fontSize: 56, marginBottom: 20 }}>✅</div>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 28, color: '#15803d', marginBottom: 12 }}>Message envoyé !</h3>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: '#166534' }}>Merci {form.name}. Nous vous contacterons à <strong>{form.email}</strong> dans les plus brefs délais.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 600, color: '#3a3a3c' }}>Nom complet *</label>
                    <input style={inputStyle} placeholder="Jean Tremblay" value={form.name} onChange={upd('name')} onFocus={e => e.target.style.borderColor = '#0071e3'} onBlur={e => e.target.style.borderColor = '#e8e8ed'} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 600, color: '#3a3a3c' }}>Téléphone</label>
                    <input style={inputStyle} placeholder="514 000-0000" value={form.phone} onChange={upd('phone')} onFocus={e => e.target.style.borderColor = '#0071e3'} onBlur={e => e.target.style.borderColor = '#e8e8ed'} />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 600, color: '#3a3a3c' }}>Courriel *</label>
                  <input type="email" style={inputStyle} placeholder="jean@exemple.ca" value={form.email} onChange={upd('email')} onFocus={e => e.target.style.borderColor = '#0071e3'} onBlur={e => e.target.style.borderColor = '#e8e8ed'} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 600, color: '#3a3a3c' }}>Service souhaité</label>
                  <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.subject} onChange={upd('subject')} onFocus={e => e.target.style.borderColor = '#0071e3'} onBlur={e => e.target.style.borderColor = '#e8e8ed'}>
                    <option value="">— Sélectionner un service —</option>
                    {SERVICES.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                    <option value="Autre">Autre / Je ne sais pas encore</option>
                  </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 600, color: '#3a3a3c' }}>Votre message *</label>
                  <textarea rows={5} style={{ ...inputStyle, resize: 'none' }} placeholder="Décrivez votre besoin ou votre projet…" value={form.message} onChange={upd('message')} onFocus={e => e.target.style.borderColor = '#0071e3'} onBlur={e => e.target.style.borderColor = '#e8e8ed'} />
                </div>
                {status === 'error' && (
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: '#dc2626', background: '#fee2e2', borderRadius: 10, padding: '12px 16px' }}>
                    Erreur d'envoi. Écrivez-nous directement à <a href="mailto:contact@myitservices.ca" style={{ color: '#dc2626' }}>contact@myitservices.ca</a>
                  </p>
                )}
                <button type="submit" disabled={!isValid || status === 'sending'} style={{
                  fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 16,
                  background: isValid ? '#0071e3' : '#d2d2d7', color: '#fff',
                  border: 'none', borderRadius: 980, padding: '16px', cursor: isValid ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { if (isValid) e.currentTarget.style.background = '#0077ed' }}
                onMouseLeave={e => { if (isValid) e.currentTarget.style.background = '#0071e3' }}
                >{status === 'sending' ? 'Envoi en cours…' : 'Envoyer le message →'}</button>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: '#aeaeb2', textAlign: 'center' }}>Réponse garantie dans les 24 heures ouvrables.</p>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </div>
  )
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer({ setPage, onLegal }: { setPage: (p: string) => void; onLegal: (t: 'privacy' | 'terms' | 'accessibility') => void }) {
  const go = (id: string) => { setPage(id); window.scrollTo({ top: 0 }) }
  return (
    <footer style={{ background: '#1d1d1f', padding: '64px 24px 32px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 40, marginBottom: 56, paddingBottom: 40, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div>
            <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 22, color: '#fff', marginBottom: 14, letterSpacing: '-0.5px' }}>My<span style={{ color: '#0071e3' }}>IT</span>Services</div>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: '#6e6e73', lineHeight: 1.6, maxWidth: 220 }}>Services informatiques professionnels pour particuliers et PME au Québec.</p>
          </div>
          <div>
            <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 14, color: '#fff', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Navigation</div>
            {[['home','Accueil'],['services','Services'],['portfolio','Réalisations'],['temoignages','Avis clients'],['contact','Contact']].map(([id,label]) => (
              <button key={id} onClick={() => go(id)} style={{ display: 'block', fontFamily: "'Inter',sans-serif", fontSize: 14, color: '#86868b', background: 'none', border: 'none', cursor: 'pointer', padding: '5px 0', textAlign: 'left', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = '#86868b'}
              >{label}</button>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 14, color: '#fff', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Services</div>
            {SERVICES.map(s => (
              <button key={s.title} onClick={() => go('services')} style={{ display: 'block', fontFamily: "'Inter',sans-serif", fontSize: 14, color: '#86868b', background: 'none', border: 'none', cursor: 'pointer', padding: '5px 0', textAlign: 'left', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = '#86868b'}
              >{s.title}</button>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 14, color: '#fff', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Contact</div>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: '#86868b', lineHeight: 1.7 }}>
              contact@myitservices.ca<br />
              819 593-8087<br />
              Montréal, Québec<br />
              Lun–Ven · 8h–18h
            </p>
            <button onClick={() => go('contact')} style={{ marginTop: 20, fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 600, fontSize: 14, background: '#0071e3', color: '#fff', border: 'none', borderRadius: 980, padding: '10px 22px', cursor: 'pointer' }}>Nous écrire</button>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: '#6e6e73' }}>© 2026 My IT Services — Tous droits réservés</p>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: '#3a3a3c', marginTop: 4 }}>
              Site conçu et développé par{' '}
              <a href="https://myitservices.ca" style={{ color: '#0071e3' }}>myitservices.ca</a>
            </p>
          </div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {([['privacy', 'Confidentialité'], ['terms', "Conditions d'utilisation"], ['accessibility', 'Accessibilité']] as const).map(([type, label]) => (
              <button key={type} onClick={() => onLegal(type)} style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: '#6e6e73', background: 'none', border: 'none', cursor: 'pointer', padding: 0, transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = '#6e6e73'}
              >{label}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState('home')
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | 'accessibility' | null>(null)

  const pages: Record<string, ReactNode> = {
    home: <HomePage setPage={setPage} />,
    services: <ServicesPage setPage={setPage} />,
    portfolio: <PortfolioPage />,
    temoignages: <TestimonialsPage setPage={setPage} />,
    contact: <ContactPage />,
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      <Nav activePage={page} setPage={setPage} />
      {pages[page] ?? pages['home']}
      <Footer setPage={setPage} onLegal={setLegalModal} />
      {legalModal && <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />}
    </div>
  )
}
