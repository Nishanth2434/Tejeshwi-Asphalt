import highwayImage from '../assets/images/projects/project_highway.jpg';
import downtownImage from '../assets/images/projects/project_downtown.jpg';
import paverImage from '../assets/images/equipment/eq_paver.jpg';
import rollerImage from '../assets/images/equipment/eq_roller.jpg';
import servicePaving from '../assets/images/services/service_paving.jpg';
import serviceConst from '../assets/images/services/service_construction.jpg';
import serviceInfra from '../assets/images/services/service_infra.jpg';
import aboutTeam from '../assets/images/about/about_team.jpg';

export const mockProjects = [
  {
    id: 'highway-expansion-95',
    title: 'Interstate 95 Expansion',
    category: 'Road Construction',
    image: highwayImage,
    description: 'A 15-mile highway expansion project including new lanes, improved drainage, and modern signage.',
    completionDate: '2025-11-01',
    client: 'State Department of Transportation',
    value: '$45M',
    location: 'North Region',
    scope: '15 Miles, 3 New Lanes, Full Drainage Upgrade',
    duration: '24 Months',
    challenges: 'The primary challenge was maintaining traffic flow for 100,000+ daily commuters while conducting heavy earthworks and deep excavations immediately adjacent to active lanes.',
    solution: 'We implemented a phased, nighttime-heavy construction schedule utilizing high-intensity illumination towers and rapid-cure polymer asphalt to minimize daytime disruptions.',
    process: [
      'Extensive traffic control setup and barrier placement',
      'Excavation and subgrade stabilization',
      'Drainage culvert installation',
      'Multi-layer asphalt paving and laser grading',
      'Final striping and smart signage deployment'
    ],
    equipmentUsed: ['Caterpillar AP1055F', 'BOMAG BW 206', 'Wirtgen W 210'],
    results: 'Delivered 3 weeks ahead of schedule with zero safety incidents, improving traffic flow by 30%.',
    gallery: [highwayImage, serviceConst, serviceInfra]
  },
  {
    id: 'downtown-revitalization',
    title: 'Downtown Core Revitalization',
    category: 'Asphalt Paving',
    image: downtownImage,
    description: 'Complete resurfacing of 12 downtown blocks with high-durability polymer-modified asphalt.',
    completionDate: '2024-08-15',
    client: 'City Municipality',
    value: '$12M',
    location: 'Metropolis City Center',
    scope: '12 City Blocks, Pedestrian Crossings, Utility Leveling',
    duration: '8 Months',
    challenges: 'Navigating complex underground utility networks and extremely tight turning radii for heavy machinery in a dense urban environment.',
    solution: 'Deployed compact, high-maneuverability milling machines and coordinated extensively with local utility providers for precision manhole leveling.',
    process: [
      'Deep profile milling of degraded surface',
      'Base repair and utility frame adjustments',
      'Application of tack coat and leveling course',
      'Placement of high-friction surface course',
      'Application of high-visibility thermoplastic striping'
    ],
    equipmentUsed: ['BOMAG BW 206', 'Compact Urban Pavers'],
    results: 'Restored pavement integrity for the next 15 years while dramatically improving the aesthetic appeal of the downtown core.',
    gallery: [downtownImage, servicePaving, rollerImage]
  },
  {
    id: 'regional-airport-runway',
    title: 'Regional Airport Runway',
    category: 'Infrastructure',
    image: highwayImage,
    description: 'Construction of a new 8,000-foot commercial runway meeting FAA heavy-load specifications.',
    completionDate: '2026-03-30',
    client: 'Regional Airport Authority',
    value: '$85M',
    location: 'Westford Regional Airport',
    scope: '8,000 ft Runway, Taxiways, Lighting Integration',
    duration: '36 Months',
    challenges: 'Meeting extremely strict FAA tolerances for pavement smoothness and load-bearing capacity for heavy commercial jets.',
    solution: 'Utilized 3D laser-guided grading and automated paving systems to achieve millimeter-level precision across the entire 8,000-foot expanse.',
    process: [
      'Massive earthworks and deep soil compaction',
      'Crushed aggregate base course installation',
      'Three lifts of FAA-spec hot mix asphalt',
      'Grooving for rapid water dispersion',
      'Integration of LED centerline lighting systems'
    ],
    equipmentUsed: ['Caterpillar AP1055F', 'Heavy Compaction Fleet', '3D Graders'],
    results: 'Achieved a perfect smoothness index rating, instantly upgrading the airport to handle Class IV commercial aircraft.',
    gallery: [highwayImage, paverImage, serviceInfra]
  },
  {
    id: 'county-road-maintenance',
    title: 'Route 66 Annual Maintenance',
    category: 'Maintenance',
    image: servicePaving,
    description: 'A comprehensive preventative maintenance program across a 40-mile rural county highway.',
    completionDate: '2023-10-15',
    client: 'County Public Works',
    value: '$4.5M',
    location: 'Route 66 Corridor',
    scope: '40 Miles, Crack Sealing, Micro-surfacing',
    duration: '3 Months',
    challenges: 'Deploying maintenance crews safely across a vast, remote 40-mile stretch with variable weather conditions.',
    solution: 'Used mobile staging units and rapid-cure emulsion technologies to seal cracks and apply micro-surfacing efficiently.',
    process: [
      'Surface cleaning and debris removal',
      'Routing and sealing of major cracks',
      'Application of polymer-modified micro-surfacing',
      'Restriping of center and edge lines'
    ],
    equipmentUsed: ['Crack Sealers', 'Micro-surfacing Pavers', 'Sweepers'],
    results: 'Extended the pavement lifespan by an estimated 7-10 years, saving the county millions in premature reconstruction costs.',
    gallery: [servicePaving, rollerImage, serviceConst]
  }
];

export const mockEquipment = [
  {
    id: 'paver-cat-ap1055f',
    name: 'Caterpillar AP1055F',
    type: 'Asphalt Paver',
    image: paverImage,
    features: ['High-throughput pacing', 'Automated grade control', 'Eco-mode efficiency'],
    desc: 'Flagship high-production rubber track paver designed for airport runways and interstates.'
  },
  {
    id: 'roller-bomag-bw206',
    name: 'BOMAG BW 206',
    type: 'Tandem Vibratory Roller',
    image: rollerImage,
    features: ['Intelligent compaction', 'Asphalt temperature sensors', 'Variable vibration'],
    desc: 'Heavy tandem roller ensuring perfect mat density and smoothness on large-scale projects.'
  },
  {
    id: 'milling-wirtgen-w210',
    name: 'Wirtgen W 210',
    type: 'Cold Milling Machine',
    image: paverImage,
    features: ['High-performance milling', '3D leveling system', 'Dust extraction'],
    desc: 'Powerful half-lane milling machine for rapid removal of degraded asphalt.'
  },
  {
    id: 'excavator-cat-336',
    name: 'Caterpillar 336',
    type: 'Heavy Excavator',
    image: serviceConst,
    features: ['Next-gen hydraulics', 'Payload weighing', '2D grading assist'],
    desc: 'Unmatched digging power for major earthworks and structural foundation prep.'
  },
  {
    id: 'grader-deere-872g',
    name: 'John Deere 872G',
    type: 'Motor Grader',
    image: serviceInfra,
    features: ['Six-wheel drive', 'Cross-slope control', 'Automation suite'],
    desc: 'Precision leveling and grading for flawless sub-base preparation.'
  },
  {
    id: 'tipper-volvo-fmx',
    name: 'Volvo FMX 460',
    type: 'Heavy Tipper',
    image: highwayImage,
    features: ['Extreme payload', 'I-Shift transmission', 'Reinforced chassis'],
    desc: 'Rugged haulage trucks ensuring steady material flow to the paving train.'
  },
  {
    id: 'crusher-kleemann',
    name: 'Kleemann MOBICAT',
    type: 'Mobile Crusher',
    image: servicePaving,
    features: ['High reduction ratio', 'Electric drive', 'Dust suppression'],
    desc: 'On-site aggregate recycling and crushing for sustainable construction.'
  },
  {
    id: 'bitumen-sprayer',
    name: 'Etnyre Black-Topper',
    type: 'Bitumen Distributor',
    image: downtownImage,
    features: ['Computerized spray rate', 'Heated tank', 'Variable width bar'],
    desc: 'Precision application of prime and tack coats for perfect asphalt bonding.'
  }
];

export const mockGallery = [
  { id: 1, image: highwayImage, category: 'Completed Projects' },
  { id: 2, image: paverImage, category: 'Machinery' },
  { id: 3, image: aboutTeam, category: 'Team' },
  { id: 4, image: servicePaving, category: 'Asphalt Work' },
  { id: 5, image: rollerImage, category: 'Machinery' },
  { id: 6, image: downtownImage, category: 'Completed Projects' },
  { id: 7, image: serviceConst, category: 'Road Construction' },
  { id: 8, image: serviceInfra, category: 'Road Construction' },
  { id: 9, image: highwayImage, category: 'Before & After' },
  { id: 10, image: paverImage, category: 'Asphalt Work' },
];

export const servicesData = [
  {
    id: 'road-construction',
    title: 'Road Construction',
    heroImage: serviceConst,
    intro: 'Comprehensive heavy civil construction for highways, urban road networks, and complex interchanges. We build the arteries of progress.',
    whatWeDo: [
      'Greenfield highway construction',
      'Complex interchange development',
      'Urban road network expansion',
      'Structural earthworks and subgrade preparation'
    ],
    faqs: [
      { q: 'How long does a typical highway project take?', a: 'Depending on the scale, projects range from 12 to 36 months.' },
      { q: 'Do you handle environmental compliance?', a: 'Yes, we manage all necessary environmental impact studies and compliance protocols.' }
    ]
  },
  {
    id: 'asphalt-paving',
    title: 'Asphalt Paving',
    heroImage: servicePaving,
    intro: 'Advanced polymer-modified asphalt production and precision paving techniques for unmatched durability and smooth riding surfaces.',
    whatWeDo: [
      'High-durability highway paving',
      'Commercial parking lot construction',
      'Airport runway paving',
      'Custom asphalt mix design'
    ],
    faqs: [
      { q: 'What is polymer-modified asphalt?', a: 'It is asphalt enhanced with polymers to increase resistance to rutting and cracking.' },
      { q: 'Can you pave in cold weather?', a: 'We employ special techniques and temperature controls to extend the paving season, but extreme cold halts operations.' }
    ]
  },
  {
    id: 'road-maintenance',
    title: 'Road Maintenance',
    heroImage: downtownImage,
    intro: 'Strategic road maintenance programs designed to extend the lifespan of existing infrastructure and maximize ROI.',
    whatWeDo: [
      'Crack sealing and patching',
      'Pavement milling and overlays',
      'Drainage system maintenance',
      'Signage and line striping updates'
    ],
    faqs: [
      { q: 'How often should roads be maintained?', a: 'Preventative maintenance should ideally occur every 3-5 years.' },
      { q: 'Does maintenance cause major traffic delays?', a: 'We utilize advanced phasing and nighttime operations to minimize public disruption.' }
    ]
  },
  {
    id: 'infrastructure',
    title: 'Infrastructure Development',
    heroImage: serviceInfra,
    intro: 'Large-scale urban and rural connectivity projects designed to support the transportation demands of the future.',
    whatWeDo: [
      'Bridge and overpass construction',
      'Underground utility installation',
      'Smart highway technology integration',
      'Retaining wall engineering'
    ],
    faqs: [
      { q: 'Do you integrate smart road technologies?', a: 'Yes, we embed sensors and conduits for future-proofing infrastructure.' }
    ]
  },
  {
    id: 'site-preparation',
    title: 'Site Preparation',
    heroImage: serviceConst,
    intro: 'Precision site clearing, grading, and earthworks that form the crucial foundation for successful construction projects.',
    whatWeDo: [
      'Land clearing and grubbing',
      'Precision laser grading',
      'Soil stabilization and compaction',
      'Stormwater management systems'
    ],
    faqs: [
      { q: 'How is grading accuracy ensured?', a: 'We use GPS and laser-guided heavy machinery for millimeter precision.' }
    ]
  },
  {
    id: 'road-resurfacing',
    title: 'Road Resurfacing',
    heroImage: servicePaving,
    intro: 'Cost-effective resurfacing solutions to restore pavement integrity and safety without total reconstruction.',
    whatWeDo: [
      'Cold milling and profile correction',
      'Hot mix asphalt overlays',
      'Micro-surfacing',
      'Pavement leveling'
    ],
    faqs: [
      { q: 'Is resurfacing better than reconstruction?', a: 'If the base layer is intact, resurfacing is much faster and more cost-effective.' }
    ]
  }
];
