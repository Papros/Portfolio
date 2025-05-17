import {
  CurriculumVitaeInterface,
  LanguageLevel,
} from './curriculum-vitae.interface';

export const cvDefault: CurriculumVitaeInterface = {
  basicInfo: {
    name: 'Piotr',
    surname: 'Papros',
    position: 'Software Developer',
    email: 'piotrpapros.it@gmail.com',
    phone: '+48570599431',
    links: [
      { href: 'github.com/Papros', alias: 'GitHub' },
      { href: 'linkedin.com/in/piotr-papros-4a67771a1/', alias: 'LinkedIn' },
    ],
    aboutMe:
      ' I am a software engineer with approximately 5 years of commercial experience, including the role of Lead frontend developer. I consider myself a full-stack developer, although my expertise is strongly focused on frontend development. In my free time, I enjoy working on diverse projects',
    photoLink:
      'https://media.licdn.com/dms/image/v2/C4D03AQG5NkRfETBVCw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1610712563946?e=1749686400&v=beta&t=ivLMFsheTFv-31jBxttnhBPyQnt5KaXJQTLXXOLk3rI',
  },
  languages: [
    { name: 'Polish', level: LanguageLevel.NATIVE },
    { name: 'English', level: LanguageLevel.B2 },
    { name: 'German', level: LanguageLevel.A2 },
  ],
  skills: [
    { name: 'RxJS', rating: 0.8 },
    { name: 'Angular', rating: 1 },
    { name: 'JIRA' },
    { name: 'Java', rating: 0.3 },
    { name: 'HTML' },
    { name: 'TypeScript', rating: 1 },
    { name: 'Javascript', rating: 0.95 },
    { name: 'GIT' },
    { name: 'CSS' },
    { name: 'NodeJS' },
  ],
  jobHistory: [
    {
      company: 'Trapeze',
      position: 'Internship',
      startDate: '06.2020',
      endDate: '09.2020',
      skills: ['Angular', 'NodeJS', 'Xamarin'],
      description: [
        'Design and prototyping of a system (Xamarin mobile app + Angular website + Node backend) and presentation to a potential clients',
      ],
    },
    {
      company: 'Trapeze',
      position: 'Frontend developer',
      startDate: '09.2020',
      endDate: '11.2022',
      skills: ['Angular', 'NodeJS'],
      description: [
        'Enhancement of a PWA application for a public transport sector client',
        'Collaboration within a multinational team using English as the primary communication language',
        'Work involving legacy code and physical client devices',
      ],
    },
    {
      company: 'Ailleron',
      position: 'Frontend developer',
      startDate: '11.2022',
      endDate: '10.2023',
      skills: ['Angular'],
      description: [
        'Development and maintenance of applications for a banking sector client',
        'Work with detailed requirements documentation and security standards',
      ],
    },
    {
      company: 'SoftwareMind',
      position: 'Lead Frontend developer',
      startDate: '10.2023',
      skills: ['Angular'],
      description: [
        'Design and implementation of an administrative application for a Telco sector client',
        'Collaboration with the client, including demos and implementation of requested changes',
        'Management of application development and priorities',
        'Guidance and mentorship to other frontend developers',
      ],
    },
  ],
  education: [
    {
      schoolName: 'Wroclaw University of Technology',
      curseName:
        'Computer Science engineer diploma, at the Faculty of Computer Science and Management',
      endDate: '2021',
    },
  ],
  hobby: [
    { name: 'Music', desc: 'I play guitar 🎸 and recently piano 🎹' },
    {
      name: 'Board games',
      desc: '"Splendor" or "Sagrada" duel 🎲 vs. my wife',
    },
    {
      name: 'Teaching',
      desc: 'I got into tutoring 👨‍🏫 while attending university, but I don’t really have time for it nowadays',
    },
  ],
};
