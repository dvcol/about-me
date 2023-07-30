import { PantheonSorbonne, ParisSaclay, PSE } from '~/data/companies.data';
import { Diploma, Education } from '~/models';

export const paris1PantheonSorbonne = new Education({
  institution: PantheonSorbonne,
  diplomas: [
    new Diploma({
      institution: PantheonSorbonne,
      title: 'Bachelor of Economics',
      subtitle: 'Licence en économie',
      duration: {
        start: new Date('2010'),
        end: new Date('2013'),
      },
    }),
  ],
});

export const parisSchoolOfEconomics = new Education({
  institution: PSE,
  diplomas: [
    new Diploma({
      institution: PSE,
      title: 'Master of theoretical Economics',
      subtitle: 'Master 2, Économie Théorique et Empirique (ETE)',
      duration: {
        start: new Date('2013'),
        end: new Date('2015'),
      },
    }),
  ],
});

export const parisSaclayUniversity = new Education({
  institution: ParisSaclay,
  diplomas: [
    new Diploma({
      institution: ParisSaclay,
      title: 'Master of data science',
      subtitle: 'Master 2, Innovation, marché et science des données (IMSD)',
      duration: {
        start: new Date('2015'),
        end: new Date('2016'),
      },
    }),
  ],
});

export const educations: Education[] = [parisSaclayUniversity, parisSchoolOfEconomics, paris1PantheonSorbonne];
