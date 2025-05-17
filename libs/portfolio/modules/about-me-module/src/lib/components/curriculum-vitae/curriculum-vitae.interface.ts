import { ITSkill } from '@portfolio/shared-pack';

export interface CurriculumVitaeInterface {
  basicInfo: {
    name: string;
    surname: string;
    position: string;
    email: string;
    phone: string;
    aboutMe: string;
    photoLink: string;
    links: { href: string; alias: string; hint?: string; icon?: string }[];
  };
  languages: { name: string; level: LanguageLevel }[];
  skills: CVSkill[];
  jobHistory: {
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    skills: string[];
    description: string[];
  }[];
  education: { schoolName: string; curseName: string; endDate: string }[];
  hobby: { name: string; desc: string }[];
}

export interface CVSkill {
  name: ITSkill | string;
  rating?: number;
}

export enum LanguageLevel {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1',
  C2 = 'C2',
  NATIVE = 'Native',
}
