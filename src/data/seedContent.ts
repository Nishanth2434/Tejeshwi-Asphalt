import type { SiteContent, NavItem } from '../types/content';

// Asset Imports for Default Seed Content
import carousel1 from '../assets/images/hero/carousel_1.jpg';
import carousel2 from '../assets/images/hero/carousel_2.jpg';
import carousel3 from '../assets/images/hero/carousel_3.jpg';
import carousel6 from '../assets/images/hero/carousel_6.jpg';
import aboutImg from '../assets/images/about/about_team.jpg';
import projectHighway from '../assets/images/projects/project_highway.jpg';
import projectDowntown from '../assets/images/projects/project_downtown.jpg';
import servicePaving from '../assets/images/services/service_paving.jpg';
import serviceConst from '../assets/images/services/service_construction.jpg';
import serviceInfra from '../assets/images/services/service_infra.jpg';
import eqPaver from '../assets/images/equipment/eq_paver.jpg';
import eqRoller from '../assets/images/equipment/eq_roller.jpg';
import ctaBg from '../assets/images/hero/cta_bg.jpg';
import client1 from '../assets/images/testimonials/client_1.jpg';
import client2 from '../assets/images/testimonials/client_2.jpg';
import client3 from '../assets/images/testimonials/client_3.jpg';

export const initialNavItems: NavItem[] = [
  {
    id: 'nav-about',
    label: 'About',
    href: '/about',
    order: 1,
    isActive: true
  },
  {
    id: 'nav-services',
    label: 'Services',
    href: '/services',
    order: 2,
    isActive: true,
    children: [
      { id: 'sub-road-const', label: 'Road Construction', href: '/services/road-construction', order: 1, parentId: 'nav-services', isActive: true },
      { id: 'sub-asphalt-paving', label: 'Asphalt Paving', href: '/services/asphalt-paving', order: 2, parentId: 'nav-services', isActive: true },
      { id: 'sub-road-maint', label: 'Road Maintenance', href: '/services/road-maintenance', order: 3, parentId: 'nav-services', isActive: true },
      { id: 'sub-infra-dev', label: 'Infrastructure Development', href: '/services/infrastructure', order: 4, parentId: 'nav-services', isActive: true }
    ]
  },
  {
    id: 'nav-projects',
    label: 'Projects',
    href: '/projects',
    order: 3,
    isActive: true
  },
  {
    id: 'nav-equipment',
    label: 'Equipment',
    href: '/equipment',
    order: 4,
    isActive: true
  },
  {
    id: 'nav-gallery',
    label: 'Gallery',
    href: '/gallery',
    order: 5,
    isActive: true
  }
];

export const initialSiteContent: SiteContent[] = [
  // --- NAVBAR ---
  {
    key: 'nav.brand.name',
    page: 'nav',
    section: 'Header Brand',
    type: 'shortText',
    label: 'Brand Name',
    value: 'TEJASHWI'
  },
  {
    key: 'nav.brand.accentLetter',
    page: 'nav',
    section: 'Header Brand',
    type: 'shortText',
    label: 'Brand Highlight Letter',
    value: 'A'
  },
  {
    key: 'nav.brand.tagline',
    page: 'nav',
    section: 'Header Brand',
    type: 'shortText',
    label: 'Brand Subtitle / Tagline',
    value: 'Asphalt & Constructions'
  },
  {
    key: 'nav.brand.logo',
    page: 'nav',
    section: 'Header Brand',
    type: 'image',
    label: 'Navbar Logo URL',
    value: '/gsp-logo.png'
  },
  {
    key: 'nav.cta.label',
    page: 'nav',
    section: 'Header CTA',
    type: 'shortText',
    label: 'Header CTA Button Text',
    value: 'Get a Quote'
  },
  {
    key: 'nav.cta.link',
    page: 'nav',
    section: 'Header CTA',
    type: 'shortText',
    label: 'Header CTA Button Link',
    value: '/contact'
  },

  // --- HOMEPAGE: HERO ---
  {
    key: 'home.hero.badge',
    page: 'home',
    section: 'Hero',
    type: 'shortText',
    label: 'Hero Eyebrow Badge',
    value: 'Premium Infrastructure Solutions'
  },
  {
    key: 'home.hero.headline',
    page: 'home',
    section: 'Hero',
    type: 'shortText',
    label: 'Hero Main Headline',
    value: 'Building Roads.\nConnecting Progress.'
  },
  {
    key: 'home.hero.description',
    page: 'home',
    section: 'Hero',
    type: 'richText',
    label: 'Hero Description Subtitle',
    value: 'Delivering premium asphalt paving, structural road construction, and comprehensive infrastructure solutions engineered for durability and scale.'
  },
  {
    key: 'home.hero.primaryCtaText',
    page: 'home',
    section: 'Hero',
    type: 'shortText',
    label: 'Primary CTA Button Label',
    value: 'Explore Projects'
  },
  {
    key: 'home.hero.primaryCtaLink',
    page: 'home',
    section: 'Hero',
    type: 'shortText',
    label: 'Primary CTA Target Link',
    value: '/projects'
  },
  {
    key: 'home.hero.secondaryCtaText',
    page: 'home',
    section: 'Hero',
    type: 'shortText',
    label: 'Secondary CTA Button Label',
    value: 'Request a Quote'
  },
  {
    key: 'home.hero.secondaryCtaLink',
    page: 'home',
    section: 'Hero',
    type: 'shortText',
    label: 'Secondary CTA Target Link',
    value: '/contact'
  },
  {
    key: 'home.hero.carouselImages',
    page: 'home',
    section: 'Hero',
    type: 'list',
    label: 'Hero Background Carousel Images',
    value: [carousel1, carousel2, carousel3, carousel6]
  },

  // --- HOMEPAGE: LEGACY ---
  {
    key: 'home.legacy.sectionNumber',
    page: 'home',
    section: 'Legacy',
    type: 'shortText',
    label: 'Section Number',
    value: '01'
  },
  {
    key: 'home.legacy.badge',
    page: 'home',
    section: 'Legacy',
    type: 'shortText',
    label: 'Section Badge',
    value: 'Our Legacy'
  },
  {
    key: 'home.legacy.headline',
    page: 'home',
    section: 'Legacy',
    type: 'shortText',
    label: 'Legacy Headline',
    value: 'Engineering excellence.'
  },
  {
    key: 'home.legacy.body',
    page: 'home',
    section: 'Legacy',
    type: 'richText',
    label: 'Legacy Story Paragraphs',
    value: 'TEJASHWI stands at the forefront of modern infrastructure development. We specialize in heavy civil construction, delivering robust road networks that power economies and connect communities.\n\nOur commitment to utilizing cutting-edge machinery and premium materials ensures that every project, from vast highways to intricate urban developments, is engineered for generations.'
  },
  {
    key: 'home.legacy.image',
    page: 'home',
    section: 'Legacy',
    type: 'image',
    label: 'Legacy Feature Image',
    value: aboutImg
  },
  {
    key: 'home.legacy.imageAnnotation',
    page: 'home',
    section: 'Legacy',
    type: 'shortText',
    label: 'Image Tag Label',
    value: 'TEJASHWI / Field Operations'
  },
  {
    key: 'home.legacy.stats',
    page: 'home',
    section: 'Legacy',
    type: 'repeatableBlock',
    label: 'Highlight Stats Counters',
    value: [
      { val: '15+', label: 'Years Experience' },
      { val: '120+', label: 'Projects Completed' },
      { val: '40+', label: 'Heavy Machines' },
      { val: 'Multiple', label: 'Regions Served' }
    ]
  },
  {
    key: 'home.legacy.ctaText',
    page: 'home',
    section: 'Legacy',
    type: 'shortText',
    label: 'Link Button Text',
    value: 'Discover Our Story'
  },

  // --- HOMEPAGE: SERVICES SHOWCASE ---
  {
    key: 'home.services.sectionNumber',
    page: 'home',
    section: 'Services Showcase',
    type: 'shortText',
    label: 'Section Number',
    value: '02'
  },
  {
    key: 'home.services.badge',
    page: 'home',
    section: 'Services Showcase',
    type: 'shortText',
    label: 'Section Badge',
    value: 'What We Do'
  },
  {
    key: 'home.services.headline',
    page: 'home',
    section: 'Services Showcase',
    type: 'shortText',
    label: 'Services Section Title',
    value: 'Advanced infrastructure solutions built for lasting performance.'
  },
  {
    key: 'home.services.subheadline',
    page: 'home',
    section: 'Services Showcase',
    type: 'shortText',
    label: 'Services Section Subtitle',
    value: 'Delivering high-capacity construction services across multiple engineering disciplines.'
  },
  {
    key: 'home.services.items',
    page: 'home',
    section: 'Services Showcase',
    type: 'repeatableBlock',
    label: 'Services Showcase Cards',
    value: [
      { title: 'Road Construction', desc: 'Building durable road networks engineered for long-term performance and high traffic capacity.', img: serviceConst, link: '/services/road-construction' },
      { title: 'Asphalt Paving', desc: 'Premium quality asphalt applications for highways, municipal roads, and urban streets.', img: servicePaving, link: '/services/asphalt-paving' },
      { title: 'Road Maintenance', desc: 'Comprehensive preservation and structural repair to extend infrastructure lifespan.', img: projectDowntown, link: '/services/road-maintenance' },
      { title: 'Highway Development', desc: 'Large-scale structural development for major interstate and regional projects.', img: projectHighway, link: '/services/infrastructure' },
      { title: 'Urban Infrastructure', desc: 'Precision grading, earthwork, and paving for complex city environments.', img: projectDowntown, link: '/services' },
      { title: 'Other Services', desc: 'Specialized structural and civil engineering capabilities for unique challenges.', img: eqPaver, link: '/services' }
    ]
  },

  // --- HOMEPAGE: FEATURED PROJECTS ---
  {
    key: 'home.projects.sectionNumber',
    page: 'home',
    section: 'Featured Projects',
    type: 'shortText',
    label: 'Section Number',
    value: '03'
  },
  {
    key: 'home.projects.badge',
    page: 'home',
    section: 'Featured Projects',
    type: 'shortText',
    label: 'Section Badge',
    value: 'Selected Work'
  },
  {
    key: 'home.projects.headline',
    page: 'home',
    section: 'Featured Projects',
    type: 'shortText',
    label: 'Projects Section Title',
    value: 'Featured Projects'
  },
  {
    key: 'home.projects.description',
    page: 'home',
    section: 'Featured Projects',
    type: 'shortText',
    label: 'Projects Subtitle',
    value: 'A selection of infrastructure projects engineered for scale, durability and long-term performance.'
  },
  {
    key: 'home.projects.viewAllText',
    page: 'home',
    section: 'Featured Projects',
    type: 'shortText',
    label: 'View All Projects Label',
    value: 'View All Projects'
  },
  {
    key: 'home.projects.items',
    page: 'home',
    section: 'Featured Projects',
    type: 'repeatableBlock',
    label: 'Featured Projects Items',
    value: [
      { title: 'Interstate 95 Expansion', loc: 'North Region', type: 'Highway Construction', status: 'Completed', img: projectHighway },
      { title: 'Downtown Resurfacing', loc: 'City Center', type: 'Asphalt Paving', status: 'In Progress', img: projectDowntown },
      { title: 'Airport Runway Alpha', loc: 'Regional Airport', type: 'Infrastructure', status: 'Completed', img: serviceConst },
      { title: 'Urban Highway Development', loc: 'Metropolitan Area', type: 'Civil Engineering', status: 'Completed', img: projectHighway },
      { title: 'Regional Infrastructure', loc: 'Eastern District', type: 'Road Maintenance', status: 'In Progress', img: projectDowntown }
    ]
  },

  // --- HOMEPAGE: ADVANTAGE (WHY CHOOSE US) ---
  {
    key: 'home.whyChooseUs.headline',
    page: 'home',
    section: 'Why Choose Us',
    type: 'shortText',
    label: 'Advantage Section Title',
    value: 'The Apex Advantage'
  },
  {
    key: 'home.whyChooseUs.subheadline',
    page: 'home',
    section: 'Why Choose Us',
    type: 'shortText',
    label: 'Advantage Section Subtitle',
    value: 'Uncompromising standards. Precision engineering. Superior results.'
  },
  {
    key: 'home.whyChooseUs.items',
    page: 'home',
    section: 'Why Choose Us',
    type: 'repeatableBlock',
    label: 'Advantage Feature Cards',
    value: [
      { title: 'Experienced Team', desc: 'Leveraging industry best practices to deliver outstanding results that exceed client expectations every time.' },
      { title: 'Modern Equipment', desc: 'State-of-the-art machinery fleet ensuring high precision, speed, and safety compliance.' },
      { title: 'Quality Materials', desc: 'High-grade aggregate and polymer-modified asphalt formulated for extreme durability.' },
      { title: 'Safety First', desc: 'Zero-compromise safety protocols protecting personnel and public on active roadways.' },
      { title: 'On-Time Delivery', desc: 'Systematic timeline management keeping project milestones strictly on schedule.' },
      { title: 'Engineering Expertise', desc: 'Decades of combined engineering skill tackling complex civil infrastructure.' }
    ]
  },

  // --- HOMEPAGE: HEAVY MACHINERY ---
  {
    key: 'home.machinery.headline',
    page: 'home',
    section: 'Machinery Marquee',
    type: 'shortText',
    label: 'Machinery Section Title',
    value: 'Our Heavy Machinery'
  },
  {
    key: 'home.machinery.items',
    page: 'home',
    section: 'Machinery Marquee',
    type: 'repeatableBlock',
    label: 'Machinery Marquee Equipment List',
    value: [
      { img: eqPaver, name: 'Asphalt Paver' },
      { img: eqRoller, name: 'Road Roller' },
      { img: eqPaver, name: 'Excavator' },
      { img: eqRoller, name: 'Motor Grader' },
      { img: eqPaver, name: 'Tipper Truck' }
    ]
  },

  // --- HOMEPAGE: CONSTRUCTION PROCESS ---
  {
    key: 'home.process.headline',
    page: 'home',
    section: 'Construction Process',
    type: 'shortText',
    label: 'Process Section Title',
    value: 'Our Construction Process'
  },
  {
    key: 'home.process.steps',
    page: 'home',
    section: 'Construction Process',
    type: 'list',
    label: 'Construction Process Steps',
    value: [
      'Site Survey', 'Planning', 'Site Preparation', 'Base Construction',
      'Asphalt Paving', 'Compaction', 'Quality Inspection', 'Completion'
    ]
  },

  // --- HOMEPAGE: STATS COUNTERS ---
  {
    key: 'home.stats.items',
    page: 'home',
    section: 'Project Statistics',
    type: 'repeatableBlock',
    label: 'Project Statistics Counters',
    value: [
      { end: 120, suffix: '+', title: 'Completed Projects' },
      { end: 15, suffix: '+', title: 'Years Experience' },
      { end: 40, suffix: '+', title: 'Heavy Machines' },
      { end: 98, suffix: '%', title: 'On-Time Completion' }
    ]
  },

  // --- HOMEPAGE: TESTIMONIALS ---
  {
    key: 'home.testimonials.headline',
    page: 'home',
    section: 'Testimonials',
    type: 'shortText',
    label: 'Testimonials Heading',
    value: 'Client Testimonials'
  },
  {
    key: 'home.testimonials.items',
    page: 'home',
    section: 'Testimonials',
    type: 'repeatableBlock',
    label: 'Client Testimonials',
    value: [
      {
        name: 'Ramesh Gowda',
        role: 'Chief Engineer, Mysore Infrastructure Dev',
        photo: client1,
        text: "Tejashwi Constructions delivered exceptional quality on the Mysore Ring Road resurfacing. Their team's dedication to timelines and material quality is unmatched in the region."
      },
      {
        name: 'Suresh H.K.',
        role: 'Mandya District PWD',
        photo: client2,
        text: "The asphalt paving work done in Mandya city limits has significantly improved traffic flow. Tejashwi's modern machinery and skilled operators ensured a flawless finish."
      },
      {
        name: 'Priya N.',
        role: 'Project Director, Highway Authority',
        photo: client3,
        text: "We contracted them for a major highway expansion connecting Mysore and Srirangapatna. Their professionalism, safety standards, and engineering excellence exceeded our expectations."
      }
    ]
  },

  // --- HOMEPAGE: CTA ---
  {
    key: 'home.cta.headline',
    page: 'home',
    section: 'Call To Action',
    type: 'shortText',
    label: 'CTA Headline',
    value: 'Ready to Build?'
  },
  {
    key: 'home.cta.description',
    page: 'home',
    section: 'Call To Action',
    type: 'richText',
    label: 'CTA Description Copy',
    value: 'Partner with TEJASHWI for your next major infrastructure or paving project. We bring the machinery, the expertise, and the legacy of excellence.'
  },
  {
    key: 'home.cta.buttonText',
    page: 'home',
    section: 'Call To Action',
    type: 'shortText',
    label: 'CTA Button Text',
    value: 'Start Your Project'
  },
  {
    key: 'home.cta.buttonLink',
    page: 'home',
    section: 'Call To Action',
    type: 'shortText',
    label: 'CTA Button URL',
    value: '/contact'
  },
  {
    key: 'home.cta.bgImage',
    page: 'home',
    section: 'Call To Action',
    type: 'image',
    label: 'CTA Background Image',
    value: ctaBg
  },

  // --- ABOUT PAGE ---
  {
    key: 'about.hero.badge',
    page: 'about',
    section: 'Hero',
    type: 'shortText',
    label: 'About Hero Badge',
    value: 'Who We Are'
  },
  {
    key: 'about.hero.headline',
    page: 'about',
    section: 'Hero',
    type: 'shortText',
    label: 'About Hero Headline',
    value: 'Engineering Roads.\nDelivering Progress.'
  },
  {
    key: 'about.hero.bgImage',
    page: 'about',
    section: 'Hero',
    type: 'image',
    label: 'About Hero Background',
    value: serviceInfra
  },
  {
    key: 'about.story.badge',
    page: 'about',
    section: 'Company Story',
    type: 'shortText',
    label: 'Story Badge',
    value: 'Our Story'
  },
  {
    key: 'about.story.headline',
    page: 'about',
    section: 'Company Story',
    type: 'shortText',
    label: 'Story Headline',
    value: 'Building the foundations of tomorrow.'
  },
  {
    key: 'about.story.body',
    page: 'about',
    section: 'Company Story',
    type: 'richText',
    label: 'Story Narrative',
    value: 'Founded on the principles of precision engineering and uncompromising quality, TEJASHWI has grown from a regional contractor into a leading force in national infrastructure development.\n\nWe believe that roads are more than just asphalt and concrete—they are the vital arteries of commerce, connection, and progress. Every project we undertake is executed with a profound sense of responsibility towards the communities we serve.\n\nOur legacy is paved into thousands of miles of highways, urban roads, and airport runways, standing as enduring testaments to our expertise and dedication.'
  },
  {
    key: 'about.story.image',
    page: 'about',
    section: 'Company Story',
    type: 'image',
    label: 'Story Feature Image',
    value: aboutImg
  },
  {
    key: 'about.mission.title',
    page: 'about',
    section: 'Mission & Vision',
    type: 'shortText',
    label: 'Mission Heading',
    value: 'Our Mission'
  },
  {
    key: 'about.mission.body',
    page: 'about',
    section: 'Mission & Vision',
    type: 'richText',
    label: 'Mission Text',
    value: 'To deliver superior infrastructure solutions through innovative engineering, unparalleled craftsmanship, and a steadfast commitment to safety and environmental sustainability.'
  },
  {
    key: 'about.vision.title',
    page: 'about',
    section: 'Mission & Vision',
    type: 'shortText',
    label: 'Vision Heading',
    value: 'Our Vision'
  },
  {
    key: 'about.vision.body',
    page: 'about',
    section: 'Mission & Vision',
    type: 'richText',
    label: 'Vision Text',
    value: 'To be the undisputed leader in national infrastructure development, setting the global benchmark for quality, durability, and technological advancement in road construction.'
  },
  {
    key: 'about.expertise.badge',
    page: 'about',
    section: 'Core Competencies',
    type: 'shortText',
    label: 'Expertise Badge',
    value: 'Core Competencies'
  },
  {
    key: 'about.expertise.headline',
    page: 'about',
    section: 'Core Competencies',
    type: 'shortText',
    label: 'Expertise Heading',
    value: 'Our Expertise'
  },
  {
    key: 'about.expertise.items',
    page: 'about',
    section: 'Core Competencies',
    type: 'repeatableBlock',
    label: 'Competency Cards',
    value: [
      { title: 'Road Construction', desc: 'Comprehensive heavy civil construction for highways, bridges, and complex interchanges.' },
      { title: 'Asphalt Technology', desc: 'Advanced polymer-modified asphalt production and precision paving techniques.' },
      { title: 'Infrastructure', desc: 'Large-scale urban and rural connectivity projects designed for the future.' },
      { title: 'Project Management', desc: 'End-to-end execution, ensuring delivery on time, on budget, and beyond expectations.' },
      { title: 'Quality Control', desc: 'Rigorous testing protocols at every stage to ensure unmatched durability and compliance.' },
      { title: 'Safety Engineering', desc: 'A zero-harm safety culture protecting our workforce, partners, and the public.' }
    ]
  },
  {
    key: 'about.milestones.headline',
    page: 'about',
    section: 'Milestones',
    type: 'shortText',
    label: 'Milestones Heading',
    value: 'Journey of Excellence'
  },
  {
    key: 'about.milestones.items',
    page: 'about',
    section: 'Milestones',
    type: 'repeatableBlock',
    label: 'Timeline Milestones',
    value: [
      { year: '2010', title: 'Inception', desc: 'Founded as a regional paving and road contractor.' },
      { year: '2015', title: 'Expansion', desc: 'Acquired first asphalt batch plant and expanded heavy fleet.' },
      { year: '2020', title: 'National Scale', desc: 'Awarded major interstate highway expansion project.' },
      { year: '2025', title: 'Innovation', desc: 'Integrated automated 3D paving and smart infrastructure tech.' }
    ]
  },
  {
    key: 'about.leadership.badge',
    page: 'about',
    section: 'Leadership',
    type: 'shortText',
    label: 'Leadership Badge',
    value: 'Our Team'
  },
  {
    key: 'about.leadership.headline',
    page: 'about',
    section: 'Leadership',
    type: 'shortText',
    label: 'Leadership Heading',
    value: 'Executive Leadership'
  },
  {
    key: 'about.leadership.members',
    page: 'about',
    section: 'Leadership',
    type: 'repeatableBlock',
    label: 'Leadership Profiles',
    value: [
      { name: 'Arjun Sharma', role: 'Chief Executive Officer', initials: 'AS' },
      { name: 'Priya Patel', role: 'Director of Engineering', initials: 'PP' },
      { name: 'Vikram Singh', role: 'Head of Operations', initials: 'VS' }
    ]
  },
  {
    key: 'about.stats.items',
    page: 'about',
    section: 'Company Numbers',
    type: 'repeatableBlock',
    label: 'Stats Counters',
    value: [
      { end: 15, suffix: '+', title: 'Years Experience' },
      { end: 120, suffix: '+', title: 'Projects' },
      { end: 45, suffix: '+', title: 'Equipment' },
      { end: 300, suffix: '+', title: 'Team Members' }
    ]
  },
  {
    key: 'about.cta.headline',
    page: 'about',
    section: 'CTA',
    type: 'shortText',
    label: 'About CTA Heading',
    value: 'Build your future with TEJASHWI.'
  },
  {
    key: 'about.cta.description',
    page: 'about',
    section: 'CTA',
    type: 'richText',
    label: 'About CTA Description',
    value: 'Partner with the industry leaders for your next major infrastructure development.'
  },
  {
    key: 'about.cta.primaryBtnText',
    page: 'about',
    section: 'CTA',
    type: 'shortText',
    label: 'Primary Button Label',
    value: 'Discuss Your Project'
  },
  {
    key: 'about.cta.secondaryBtnText',
    page: 'about',
    section: 'CTA',
    type: 'shortText',
    label: 'Secondary Button Label',
    value: 'Contact Our Team'
  },

  // --- SERVICES PAGE ---
  {
    key: 'services.hero.badge',
    page: 'services',
    section: 'Hero',
    type: 'shortText',
    label: 'Hero Badge',
    value: 'Capabilities'
  },
  {
    key: 'services.hero.headline',
    page: 'services',
    section: 'Hero',
    type: 'shortText',
    label: 'Hero Headline',
    value: 'Comprehensive Infrastructure Solutions.'
  },
  {
    key: 'services.hero.description',
    page: 'services',
    section: 'Hero',
    type: 'richText',
    label: 'Hero Description',
    value: 'From high-volume commercial paving to municipal infrastructure maintenance, our full-service capabilities ensure precision execution across all phases of civil construction.'
  },
  {
    key: 'services.cta.headline',
    page: 'services',
    section: 'CTA',
    type: 'shortText',
    label: 'Services CTA Headline',
    value: 'Have a Project in Mind?'
  },
  {
    key: 'services.cta.description',
    page: 'services',
    section: 'CTA',
    type: 'richText',
    label: 'Services CTA Description',
    value: 'Our team of specialized engineers and project managers are ready to turn your blueprint into reality.'
  },
  {
    key: 'services.cta.buttonText',
    page: 'services',
    section: 'CTA',
    type: 'shortText',
    label: 'Services CTA Button Text',
    value: 'Get a Quote'
  },

  // --- PROJECTS PAGE ---
  {
    key: 'projects.hero.badge',
    page: 'projects',
    section: 'Hero',
    type: 'shortText',
    label: 'Hero Badge',
    value: 'Portfolio'
  },
  {
    key: 'projects.hero.headline',
    page: 'projects',
    section: 'Hero',
    type: 'shortText',
    label: 'Hero Headline',
    value: 'Projects That Move People Forward.'
  },
  {
    key: 'projects.hero.description',
    page: 'projects',
    section: 'Hero',
    type: 'richText',
    label: 'Hero Description',
    value: 'Explore our diverse portfolio of completed and ongoing infrastructure developments, from high-volume interstates to complex municipal engineering.'
  },
  {
    key: 'projects.cta.headline',
    page: 'projects',
    section: 'CTA',
    type: 'shortText',
    label: 'Projects CTA Headline',
    value: 'Ready to Build Your Next Milestone?'
  },
  {
    key: 'projects.cta.description',
    page: 'projects',
    section: 'CTA',
    type: 'richText',
    label: 'Projects CTA Description',
    value: 'Contact our civil engineering team today to review your project scope, budget, and timeline.'
  },
  {
    key: 'projects.cta.buttonText',
    page: 'projects',
    section: 'CTA',
    type: 'shortText',
    label: 'Projects CTA Button Text',
    value: 'Request a Consultation'
  },

  // --- EQUIPMENT PAGE ---
  {
    key: 'equipment.hero.badge',
    page: 'equipment',
    section: 'Hero',
    type: 'shortText',
    label: 'Equipment Hero Badge',
    value: 'Machinery & Assets'
  },
  {
    key: 'equipment.hero.headline',
    page: 'equipment',
    section: 'Hero',
    type: 'shortText',
    label: 'Equipment Hero Headline',
    value: 'Powering Progress with Precision.'
  },
  {
    key: 'equipment.hero.description',
    page: 'equipment',
    section: 'Hero',
    type: 'richText',
    label: 'Equipment Hero Description',
    value: 'Our fleet of state-of-the-art construction machinery guarantees unmatched efficiency, quality, and safety on every site.'
  },
  {
    key: 'equipment.showcase.headline',
    page: 'equipment',
    section: 'Fleet Showcase',
    type: 'shortText',
    label: 'Fleet Section Title',
    value: 'The Apex Fleet'
  },
  {
    key: 'equipment.cta.headline',
    page: 'equipment',
    section: 'CTA',
    type: 'shortText',
    label: 'Equipment CTA Title',
    value: 'Need Heavy Machinery for Your Project?'
  },
  {
    key: 'equipment.cta.buttonText',
    page: 'equipment',
    section: 'CTA',
    type: 'shortText',
    label: 'Equipment CTA Button Label',
    value: 'Contact Us Today'
  },

  // --- GALLERY PAGE ---
  {
    key: 'gallery.hero.headline',
    page: 'gallery',
    section: 'Hero',
    type: 'shortText',
    label: 'Gallery Title',
    value: 'Visual Gallery'
  },
  {
    key: 'gallery.hero.description',
    page: 'gallery',
    section: 'Hero',
    type: 'richText',
    label: 'Gallery Description',
    value: 'A showcase of our engineering precision, heavy machinery, and dedicated teams in action.'
  },
  {
    key: 'gallery.categories',
    page: 'gallery',
    section: 'Filter Categories',
    type: 'list',
    label: 'Gallery Category Filters',
    value: ['All', 'Road Construction', 'Asphalt Work', 'Machinery', 'Team', 'Completed Projects', 'Before & After']
  },

  // --- CONTACT PAGE ---
  {
    key: 'contact.hero.badge',
    page: 'contact',
    section: 'Hero',
    type: 'shortText',
    label: 'Hero Badge',
    value: 'Get In Touch'
  },
  {
    key: 'contact.hero.headline',
    page: 'contact',
    section: 'Hero',
    type: 'shortText',
    label: 'Hero Title',
    value: "Let's Build Something That Lasts."
  },
  {
    key: 'contact.info.title',
    page: 'contact',
    section: 'Contact Info',
    type: 'shortText',
    label: 'Card Title',
    value: 'Contact Information'
  },
  {
    key: 'contact.info.addressTitle',
    page: 'contact',
    section: 'Contact Info',
    type: 'shortText',
    label: 'Address Section Heading',
    value: 'Corporate Headquarters'
  },
  {
    key: 'contact.info.address',
    page: 'contact',
    section: 'Contact Info',
    type: 'richText',
    label: 'Physical Address',
    value: 'Level 4, Apex Tower\nPlot 45, Infrastructure Tech Park\nMumbai, MH 400001'
  },
  {
    key: 'contact.info.phoneTitle',
    page: 'contact',
    section: 'Contact Info',
    type: 'shortText',
    label: 'Phone Section Heading',
    value: 'Direct Line'
  },
  {
    key: 'contact.info.phone',
    page: 'contact',
    section: 'Contact Info',
    type: 'shortText',
    label: 'Phone Number',
    value: '+91 (800) 123-4567'
  },
  {
    key: 'contact.info.hours',
    page: 'contact',
    section: 'Contact Info',
    type: 'shortText',
    label: 'Business Hours',
    value: 'Mon-Sat: 8AM - 6PM'
  },
  {
    key: 'contact.info.emailTitle',
    page: 'contact',
    section: 'Contact Info',
    type: 'shortText',
    label: 'Email Section Heading',
    value: 'Email Inquiries'
  },
  {
    key: 'contact.info.emails',
    page: 'contact',
    section: 'Contact Info',
    type: 'list',
    label: 'Inquiry Email Addresses',
    value: ['projects@apexinfra.com', 'careers@apexinfra.com']
  },
  {
    key: 'contact.map.badge',
    page: 'contact',
    section: 'Contact Info',
    type: 'shortText',
    label: 'Map Pin Label',
    value: 'HQ Location Map'
  },
  {
    key: 'contact.form.title',
    page: 'contact',
    section: 'Quote Form',
    type: 'shortText',
    label: 'Form Heading',
    value: 'Request a Quote'
  },
  {
    key: 'contact.form.subtitle',
    page: 'contact',
    section: 'Quote Form',
    type: 'shortText',
    label: 'Form Subtitle',
    value: 'Fill out the details below and our estimators will get back to you promptly.'
  },
  {
    key: 'contact.form.submitButtonText',
    page: 'contact',
    section: 'Quote Form',
    type: 'shortText',
    label: 'Submit Button Label',
    value: 'Submit Quote Request'
  },
  {
    key: 'contact.form.privacyNotice',
    page: 'contact',
    section: 'Quote Form',
    type: 'shortText',
    label: 'Privacy Notice',
    value: 'By submitting this form, you agree to our privacy policy. Your information is strictly confidential.'
  },

  // --- FOOTER ---
  {
    key: 'footer.brand.name',
    page: 'footer',
    section: 'Footer Brand',
    type: 'shortText',
    label: 'Footer Brand Name',
    value: 'TEJASHWI'
  },
  {
    key: 'footer.brand.tagline',
    page: 'footer',
    section: 'Footer Brand',
    type: 'shortText',
    label: 'Footer Tagline',
    value: 'Asphalt & Constructions'
  },
  {
    key: 'footer.companySummary',
    page: 'footer',
    section: 'Company Summary',
    type: 'richText',
    label: 'Footer Company Summary',
    value: 'Premium asphalt and infrastructure construction services. Building the robust roads to the future with precision, durability, and world-class engineering innovation.'
  },
  {
    key: 'footer.servicesTitle',
    page: 'footer',
    section: 'Columns',
    type: 'shortText',
    label: 'Services Column Title',
    value: 'Our Services'
  },
  {
    key: 'footer.quickLinksTitle',
    page: 'footer',
    section: 'Columns',
    type: 'shortText',
    label: 'Quick Links Column Title',
    value: 'Quick Links'
  },
  {
    key: 'footer.contactTitle',
    page: 'footer',
    section: 'Columns',
    type: 'shortText',
    label: 'Contact Info Column Title',
    value: 'Contact Info'
  },
  {
    key: 'footer.phone',
    page: 'footer',
    section: 'Contact Details',
    type: 'shortText',
    label: 'Footer Phone Number',
    value: '+91 (800) 123-4567'
  },
  {
    key: 'footer.email',
    page: 'footer',
    section: 'Contact Details',
    type: 'shortText',
    label: 'Footer Email Address',
    value: 'contact@apexinfra.com'
  },
  {
    key: 'footer.address',
    page: 'footer',
    section: 'Contact Details',
    type: 'shortText',
    label: 'Footer Address',
    value: 'Plot 45, Tech Park, Mumbai'
  },
  {
    key: 'footer.hours',
    page: 'footer',
    section: 'Contact Details',
    type: 'shortText',
    label: 'Footer Operating Hours',
    value: 'Mon - Sat: 8:00 AM - 6:00 PM'
  },
  {
    key: 'footer.copyrightText',
    page: 'footer',
    section: 'Copyright',
    type: 'shortText',
    label: 'Copyright Notice Text',
    value: '© {year} TEJASHWI Asphalt & Constructions. All rights reserved.'
  }
];
