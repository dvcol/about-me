import { consulting, privateSector, publicSector, saas, scaleUp, univeristy } from '~/data/tags.data';
import { Address, Company, MimeType } from '~/models';

export const Ippon = new Company({
  title: 'Ippon Technologies',
  subtitle: 'Consulting firm specialized in digital transformations.',
  description: `Ippon is a consulting and expertise firm. It stated purpose is to "help [their] clients leverage their digital assets to design an appropriate strategy and deploy their transformation roadmap at scale.".`,
  links: {
    website: 'https://ippon.tech/',
  },
  media: {
    type: MimeType.JPEG,
    url: 'assets/logos/ippon_logo.jpeg',
  },
  tags: {
    other: [consulting, privateSector],
  },
  duration: {
    start: new Date('2021-09'),
  },
  address: new Address({
    name: 'Ippon Technologies',
    streetNumber: '43',
    street: 'Av. de la Grande Armée',
    zipCode: '75116',
    city: 'Paris',
    region: 'Ile de France',
    country: 'France',
    google: 'https://goo.gl/maps/uR99MQLsPmSDXgyZ6',
  }),
});

export const ContentSquare = new Company({
  title: 'ContentSquare',
  subtitle: 'Software as a service scale-up for web analytics.',
  description: `ContentSquare is a digital experience analytics company. "It's analytics platform provides rich and contextual insight into customer behaviors, feelings and intent — at every touch-point in their journey — enabling businesses to build empathy and create lasting impact".`,
  links: {
    website: 'https://contentsquare.com/',
  },
  media: {
    type: MimeType.PNG,
    url: 'assets/logos/contentsquare_logo.png',
  },
  tags: {
    other: [scaleUp, saas, privateSector],
  },
  address: new Address({
    name: 'ContentSquare',
    streetNumber: '7',
    street: 'Rue de Madrid',
    zipCode: '75008',
    city: 'Paris',
    region: 'Ile de France',
    country: 'France',
    google: 'https://goo.gl/maps/t3TQAHajzc3jEboQ7',
  }),
});

export const SopraSteria = new Company({
  title: 'Sopra Steria',
  subtitle: 'Consulting firm focused on end-to-end solutions for large companies and public sector institutions.',
  description:
    'Sopra Steria is consulting firm. Known for their digital services and software development activities, Sopra Steria "helps its clients drive their digital transformation and obtain tangible and sustainable benefits. It provides end-to-end solutions to make large companies and organisations more competitive by combining in-depth knowledge of a wide range of business sectors and innovative technologies with a fully collaborative approach."',
  links: {
    website: 'https://www.soprasteria.com/',
  },
  media: {
    type: MimeType.PNG,
    url: 'assets/logos/sopra_logo.png',
  },
  tags: {
    other: [consulting, privateSector],
  },
  address: new Address({
    name: 'Sopra Steria',
    streetNumber: '6',
    street: 'Av. Kléber',
    zipCode: '75116',
    city: 'Paris',
    region: 'Ile de France',
    country: 'France',
    google: 'https://goo.gl/maps/7ixPdRBFkcHPHSXe8',
  }),
});

export const DGA = new Company({
  title: "Direction générale de l'Armement (DGA)",
  subtitle: 'French Government defence procurement and technology agency within the Ministry of Armed Forces',
  description:
    'Public sector institution. The DGA is the "French Government defence procurement and technology agency, responsible within the Ministry of Armed Forces for project management, development and purchase of weapon systems for the French military."',
  links: {
    website: 'https://www.defense.gouv.fr/dga',
  },
  media: {
    type: MimeType.PNG,
    url: 'assets/logos/dga_logo.png',
  },
  tags: {
    other: [publicSector],
  },
  address: new Address({
    name: "Direction générale de l'Armement (DGA)",
    streetNumber: '60',
    street: 'Bd du Général Martial Valin',
    zipCode: '75015',
    city: 'Paris',
    region: 'Ile de France',
    country: 'France',
    google: 'https://goo.gl/maps/Kw9r1edxdujR4enf7',
  }),
});

export const SEA = new Company({
  title: "Service de l'énergie opérationnelle (SEO)",
  subtitle: 'French inter-army institution in charge of oil procurement, supply, storage and distribution',
  description: `Previously the "Service des essences des armées (SEA)", the Service de l'énergie opérationnelle is the inter-army institution within the Ministry of Armed Forces in charge of all procurement, supply, storage and distribution of oil and petroleum products.`,
  links: {
    website: 'https://www.defense.gouv.fr/energie-ops',
  },
  media: {
    type: MimeType.PNG,
    url: 'assets/logos/seo_logo.png',
  },
  tags: {
    other: [publicSector],
  },
  address: new Address({
    name: 'Fort de Vanves',
    streetNumber: '27',
    street: 'boulevard de Stalingrad',
    zipCode: '92240',
    city: 'Malakoff',
    region: 'Ile de France',
    country: 'France',
    google: 'https://goo.gl/maps/FeLTFpt3YxzjF9kL8',
  }),
});

export const MEA = new Company({
  title: 'Ministère des armées',
  subtitle: 'The Ministry in charge of managing the French Armed Forces.',
  description:
    'The Ministry of Armed Forces is the ministry of the Government of France in charge of managing the French Armed Forces inside and outside French soil.',
  links: {
    website: 'https://www.defense.gouv.fr/',
  },
  media: {
    type: MimeType.PNG,
    url: 'assets/logos/mda_logo.png',
  },
  tags: {
    other: [publicSector],
  },
  address: new Address({
    name: 'Ministère des Armées',
    streetNumber: '14',
    street: 'rue Saint-Dominique',
    zipCode: '75007',
    city: 'Vincennes',
    region: 'Ile de France',
    country: 'France',
  }),
});

export const Hospinomics = new Company({
  title: 'Hospinomics',
  subtitle: 'A research chair in partnership between the AP-HP and Paris School of Economics',
  description: `A research Chair created by the Assistance Publique-Hôpitaux de Paris (AP-HP) and Paris School of Economics (PSE), Hospinomics aims at brining together economists in order to develop evaluation strategies and experimental methods to optimize and maximize policies, decision-making, and resource allocation in the service of patients.`,
  links: {
    website: 'https://www.hospinnomics.eu/en/hospinnomics/',
  },
  media: {
    type: MimeType.SVG,
    url: 'assets/logos/pse_logo.svg',
  },
  tags: {
    other: [publicSector],
  },
  address: new Address({
    name: 'Hôtel-Dieu',
    streetNumber: '1',
    street: 'Parvis de Notre-Dame',
    zipCode: '75004',
    city: 'Paris',
    region: 'Ile de France',
    country: 'France',
    google: 'https://goo.gl/maps/nNKTezKgGh2JdtMPA',
  }),
});

export const PantheonSorbonne = new Company({
  title: 'University Paris I - Panthéon-Sorbonne',
  subtitle: 'Public research university focused on Economic Sciences, Human Sciences, and Legal and Political Sciences.',
  links: {
    website: 'https://www.pantheonsorbonne.fr/',
  },
  media: {
    type: MimeType.SVG,
    url: 'assets/logos/paris1_logo.svg',
  },
  tags: {
    other: [univeristy],
  },
  address: new Address({
    name: 'Pantheon-Sorbonne University',
    streetNumber: '12',
    street: 'Pl. du Panthéon',
    zipCode: '75005',
    city: 'Paris',
    region: 'Ile de France',
    country: 'France',
    google: 'https://goo.gl/maps/PZh4feAUStmC1f3F8',
  }),
});

export const ParisSaclay = new Company({
  title: 'Université Paris-Saclay',
  subtitle:
    'The University of Paris-Saclay university innovation cluster brings together the university’s thirteen founding members with the common aim to create a leading pole in research and education.',
  links: {
    website: 'https://www.universite-paris-saclay.fr/',
  },
  media: {
    type: MimeType.JPEG,
    url: 'assets/logos/paris_saclay_logo.jpeg',
  },
  tags: {
    other: [univeristy],
  },
});

export const PSE = new Company({
  title: 'Paris School of Economics',
  subtitle: 'The Paris School of Economics is a French research institute in the field of economics.',
  links: {
    website: 'https://www.parisschoolofeconomics.eu/en/',
  },
  media: {
    type: MimeType.SVG,
    url: 'assets/logos/paris1_logo.svg',
  },
  tags: {
    other: [univeristy],
  },
});
