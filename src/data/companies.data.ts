import { consulting, privateSector, publicSector, saas, scaleUp, university } from '~/data/tags.data';
import { Address, Company, MimeType, ProjectDuration } from '~/models';

export const Ippon = new Company({
  title: 'data_companies.ippon.title',
  subtitle: 'data_companies.ippon.subtitle',
  description: 'data_companies.ippon.description',
  links: {
    website: 'https://ippon.tech/',
  },
  logo: {
    type: MimeType.JPEG,
    url: 'assets/logos/ippon_logo.jpeg',
  },
  tags: {
    other: [consulting, privateSector],
  },
  duration: new ProjectDuration({
    start: new Date('2021-09'),
  }),
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
  title: 'data_companies.contentsquare.title',
  subtitle: 'data_companies.contentsquare.subtitle',
  description: 'data_companies.contentsquare.description',
  links: {
    website: 'https://contentsquare.com/',
  },
  logo: {
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
  title: 'data_companies.soprasteria.title',
  subtitle: 'data_companies.soprasteria.subtitle',
  description: 'data_companies.soprasteria.description',
  links: {
    website: 'https://www.soprasteria.com/',
  },
  logo: {
    type: MimeType.PNG,
    url: 'assets/logos/sopra_logo.png',
  },
  tags: {
    other: [consulting, privateSector],
  },
  duration: new ProjectDuration({
    start: new Date('2017-09'),
    end: new Date('2021-08'),
  }),
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
  title: 'data_companies.dga.title',
  subtitle: 'data_companies.dga.subtitle',
  description: 'data_companies.dga.description',
  links: {
    website: 'https://www.defense.gouv.fr/dga',
  },
  logo: {
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
  title: 'data_companies.sea.title',
  subtitle: 'data_companies.sea.subtitle',
  description: 'data_companies.sea.description',
  links: {
    website: 'https://www.defense.gouv.fr/energie-ops',
  },
  logo: {
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
  title: 'data_companies.mea.title',
  subtitle: 'data_companies.mea.subtitle',
  description: 'data_companies.mea.description',
  links: {
    website: 'https://www.defense.gouv.fr/',
  },
  logo: {
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
  title: 'data_companies.hospinomics.title',
  subtitle: 'data_companies.hospinomics.subtitle',
  description: 'data_companies.hospinomics.description',
  links: {
    website: 'https://www.hospinnomics.eu/en/hospinnomics/',
  },
  logo: {
    type: MimeType.SVG,
    url: 'assets/logos/pse_logo.svg',
  },
  tags: {
    other: [publicSector],
  },
  duration: new ProjectDuration({
    start: new Date('2015-10'),
    end: new Date('2016-11'),
  }),
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
  title: 'data_companies.pantheon_sorbonne.title',
  subtitle: 'data_companies.pantheon_sorbonne.title',
  links: {
    website: 'https://www.pantheonsorbonne.fr/',
  },
  logo: {
    type: MimeType.SVG,
    url: 'assets/logos/paris1_logo.svg',
  },
  tags: {
    other: [university],
  },
  duration: new ProjectDuration({
    start: new Date('2010'),
    end: new Date('2013'),
  }),
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
  title: 'data_companies.paris_saclay.title',
  subtitle: 'data_companies.paris_saclay.title',
  links: {
    website: 'https://www.universite-paris-saclay.fr/',
  },
  logo: {
    type: MimeType.JPEG,
    url: 'assets/logos/paris_saclay_logo.jpeg',
  },
  tags: {
    other: [university],
  },
  duration: new ProjectDuration({
    start: new Date('2015'),
    end: new Date('2016'),
  }),
  address: new Address({
    city: 'Paris',
    region: 'Ile de France',
    country: 'France',
  }),
});

export const PSE = new Company({
  title: 'data_companies.pse.title',
  subtitle: 'data_companies.pse.title',
  links: {
    website: 'https://www.parisschoolofeconomics.eu/en/',
  },
  logo: {
    type: MimeType.SVG,
    url: 'assets/logos/paris1_logo.svg',
  },
  tags: {
    other: [university],
  },
  duration: new ProjectDuration({
    start: new Date('2013'),
    end: new Date('2015'),
  }),
  address: new Address({
    name: 'Paris School of Economics',
    streetNumber: '48',
    street: 'Bd Jourdan',
    zipCode: '75014',
    city: 'Paris',
    region: 'Ile de France',
    country: 'France',
    google: 'https://goo.gl/maps/EeG2FZ6pLBpJj1R66',
  }),
});
