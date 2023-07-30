import { PantheonSorbonne, ParisSaclay, PSE } from '~/data/companies.data';
import { dataScience, java, python, r, sas, stata } from '~/data/skills.data';
import { economics } from '~/data/tags.data';
import { Diploma, Education } from '~/models';

export const paris1PantheonSorbonne = new Education({
  institution: PantheonSorbonne,
  diplomas: [
    new Diploma({
      institution: PantheonSorbonne,
      title: 'data_education.pantheon_sorbonne.title',
      subtitle: 'data_education.pantheon_sorbonne.subtitle',
      duration: {
        start: new Date('2010'),
        end: new Date('2013'),
      },
      tags: {
        other: [economics],
      },
    }),
  ],
});

export const parisSchoolOfEconomics = new Education({
  institution: PSE,
  diplomas: [
    new Diploma({
      institution: PSE,
      title: 'data_education.paris_saclay.title',
      subtitle: 'data_education.paris_saclay.subtitle',
      duration: {
        start: new Date('2013'),
        end: new Date('2015'),
      },
      tags: {
        other: [dataScience, r, stata, sas, economics],
      },
    }),
  ],
});

export const parisSaclayUniversity = new Education({
  institution: ParisSaclay,
  diplomas: [
    new Diploma({
      institution: ParisSaclay,
      title: 'data_education.pse.title',
      subtitle: 'data_education.pse.subtitle',
      duration: {
        start: new Date('2015'),
        end: new Date('2016'),
      },
      tags: {
        other: [dataScience, r, stata, sas, python, java, economics],
      },
    }),
  ],
});

export const educations: Education[] = [parisSaclayUniversity, parisSchoolOfEconomics, paris1PantheonSorbonne];
