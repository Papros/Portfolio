import {
  CurriculumVitaeInterface,
  LanguageLevel,
} from './curriculum-vitae.interface';

export const cvDefault: CurriculumVitaeInterface = {
  basicInfo: {
    name: 'Piotr',
    surname: 'Papros',
    position: 'Senior Frontend Developer',
    email: 'piotrpapros.it@gmail.com',
    phone: '+48570599431',
    links: [
      { href: 'github.com/Papros', alias: 'GitHub/Papros' },
      {
        href: 'linkedin.com/in/piotr-papros-4a67771a1/',
        alias: 'linkedin/piotr-papros',
      },
      {
        href: 'papros.github.io/Portfolio',
        alias: 'Portfolio',
        hint: 'Portfolio & Design System (work in progress)',
      },
    ],
    aboutMe:
      'Frontend-focused full-stack developer with 5+ years of commercial experience, including a Lead Frontend Developer role. Specialized in Angular ecosystems (RxJS, NgRx, Nx) across Telco, Banking, and Public Transport sectors. Comfortable owning features end-to-end — from architecture decisions and client demos to mentoring junior developers.',
    photoLink:
      'https://media.licdn.com/dms/image/v2/C4D03AQG5NkRfETBVCw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1610712563946?e=1749686400&v=beta&t=ivLMFsheTFv-31jBxttnhBPyQnt5KaXJQTLXXOLk3rI',
  },
  languages: [
    { name: 'Polish', level: LanguageLevel.NATIVE },
    { name: 'English', level: LanguageLevel.B2 },
    { name: 'German', level: LanguageLevel.A2 },
  ],
  skills: [
    { name: 'Angular', rating: 1 },
    { name: 'TypeScript', rating: 1 },
    { name: 'JavaScript', rating: 0.95 },
    { name: 'RxJS', rating: 0.8 },
    { name: 'NgRx', rating: 0.75 },
    { name: 'Nx', rating: 0.7 },
    { name: 'HTML', rating: 0.9 },
    { name: 'CSS', rating: 0.85 },
    { name: 'SQL', rating: 0.5 },
    { name: 'Docker', rating: 0.55 },
    { name: 'Keycloak', rating: 0.5 },
    { name: 'Apache Kafka', rating: 0.45 },
    { name: 'NodeJS', rating: 0.4 },
    { name: 'Java', rating: 0.3 },
    { name: 'GIT', rating: 0.85 },
    { name: 'Figma', rating: 0.6 },
    { name: 'JIRA', rating: 0.65 },
  ],
  jobHistory: [
    {
      company: 'Softwaremind',
      position: 'Lead Frontend Developer',
      startDate: '10.2023',
      skills: [
        'Angular',
        'TypeScript',
        'RxJS',
        'Nx',
        'Angular Material',
        'Docker',
        'Keycloak',
        'GitHub',
        'Figma',
      ],
      description: [
        'Led frontend development of an administrative platform for a Telco sector client — managed priorities, architecture decisions, and code reviews',
        'Mentored junior and mid frontend developers on the team',
        'Collaborated directly with the client: presented demos and iterated on requested changes',
      ],
      url: 'https://softwaremind.com/',
    },
    {
      company: 'Ailleron',
      position: 'Software Engineer',
      startDate: '11.2022',
      endDate: '10.2023',
      skills: [
        'Angular',
        'RxJS',
        'NgRx',
        'Nx',
        'Angular Material',
        'TypeScript',
        'GitHub',
      ],
      description: [
        'Developed and maintained a comprehensive retail banking platform for Bank Pekao customers',
        'Worked with detailed requirements documentation and strict financial security standards',
      ],
      url: 'https://ailleron.com/pl/',
    },
    {
      company: 'Trapeze',
      position: 'Software Engineer',
      startDate: '09.2020',
      endDate: '11.2022',
      skills: [
        'Angular',
        'AngularJS',
        'RxJS',
        'TypeScript',
        'WebSockets',
        'Apache Kafka',
        'Docker',
        'GitHub',
      ],
      description: [
        'Enhanced a PWA installed on Windows Embedded onboard computers in public transport vehicles',
        'Led migration of legacy AngularJS codebase to modern Angular — improving maintainability and performance',
        'Integrated real-time data streams via WebSockets and Apache Kafka',
        'Collaborated within a multinational team using English as the primary language',
        'Company rebranded to Ebblo in 2026',
      ],
      url: 'https://cee.ebblo.com/',
    },
    {
      company: 'Trapeze',
      position: 'Software Engineer Intern',
      startDate: '06.2020',
      endDate: '09.2020',
      skills: ['Angular', 'Node.js', 'Xamarin', 'Java'],
      description: [
        'Designed and prototyped a full passenger-facing system for a regional railway operator',
        'Built Xamarin mobile app + Angular web app + Node.js backend as an integrated prototype',
        'Presented the prototype to potential clients',
      ],
      url: 'https://cee.ebblo.com/',
    },
    {
      company: 'Mindcloud / Private Tutoring',
      position: 'Programming & Math Instructor',
      startDate: '10.2019',
      endDate: '06.2020',
      skills: ['Scratch', 'Minecraft'],
      description: [
        'Taught programming and mathematics at Mindcloud — project-based learning in a Minecraft environment',
        'Provided private tutoring in math and introductory programming for children and teenagers',
      ],
      url: 'https://mindcloud.pl/',
    },
  ],
  education: [
    {
      schoolName: 'Wrocław University of Technology',
      curseName:
        "Engineer's Degree in Computer Science, Faculty of Computer Science and Management",
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
      desc: "I got into tutoring 👨‍🏫 while attending university, but I don't really have time for it nowadays",
    },
  ],
};
