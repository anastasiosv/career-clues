import { JobDescription, Candidate, MatchBand, EducationLevel, CompanySize } from '@/types';

export const mockJobDescription: JobDescription = {
  id: 'jd-001',
  title: 'Senior Full-Stack Engineer',
  company: 'TechCorp Inc.',
  filename: 'senior_fullstack_engineer_jd.pdf',
  content: `
    We are looking for a Senior Full-Stack Engineer to join our growing team. 
    The ideal candidate will have 5+ years of experience building scalable web applications.
    
    Requirements:
    - Strong proficiency in React, TypeScript, and Node.js
    - Experience with cloud platforms (AWS, GCP, or Azure)
    - Database design and optimization (PostgreSQL, MongoDB)
    - RESTful API design and GraphQL
    - CI/CD pipelines and DevOps practices
    - Agile development methodologies
    
    Preferred:
    - Experience with microservices architecture
    - Knowledge of containerization (Docker, Kubernetes)
    - Background in fintech or e-commerce
    
    Education:
    - Bachelor's degree in Computer Science or related field (Master's preferred)
  `,
  requirements: [
    'React',
    'TypeScript',
    'Node.js',
    'Cloud platforms (AWS/GCP/Azure)',
    'PostgreSQL or MongoDB',
    'RESTful APIs',
    'CI/CD',
    'Agile'
  ],
  preferredSkills: [
    'Microservices',
    'Docker',
    'Kubernetes',
    'GraphQL',
    'Fintech experience'
  ],
  minYearsExperience: 5,
  educationRequirement: 'bachelors',
  keywords: ['React', 'TypeScript', 'Node.js', 'AWS', 'PostgreSQL', 'Docker', 'Kubernetes', 'GraphQL', 'CI/CD', 'Agile']
};

export const mockCandidates: Candidate[] = [
  {
    id: 'c-001',
    name: 'Sarah Chen',
    email: 'sarah.chen@email.com',
    filename: 'sarah_chen_cv.pdf',
    content: `
      SARAH CHEN
      Senior Software Engineer
      
      EXPERIENCE:
      
      Lead Software Engineer | FinanceFlow (Series B Startup) | 2020-Present
      - Led development of React/TypeScript frontend serving 500K+ users
      - Architected microservices using Node.js and AWS Lambda
      - Implemented CI/CD pipelines with GitHub Actions and Docker
      - Managed PostgreSQL databases with advanced query optimization
      
      Full-Stack Developer | DataSystems Corp (Enterprise) | 2017-2020
      - Built RESTful APIs using Node.js and Express
      - Developed React applications with Redux state management
      - Worked with AWS services (EC2, S3, RDS)
      - Practiced Agile/Scrum methodologies
      
      Junior Developer | TechStart Inc (Small Company) | 2015-2017
      - Developed web applications using JavaScript and React
      - Participated in code reviews and pair programming
      
      EDUCATION:
      Master of Science in Computer Science | Stanford University | 2015
      Bachelor of Science in Computer Engineering | UC Berkeley | 2013
      
      SKILLS:
      React, TypeScript, Node.js, AWS, PostgreSQL, MongoDB, Docker, Kubernetes, 
      GraphQL, Redis, CI/CD, Microservices, Agile, Python
    `,
    education: {
      level: 'masters',
      field: 'Computer Science',
      institution: 'Stanford University',
      year: 2015
    },
    totalYearsExperience: 9,
    pastRoles: [
      {
        title: 'Lead Software Engineer',
        company: 'FinanceFlow',
        companySize: 'startup',
        duration: '2020-Present',
        yearsInRole: 4,
        description: 'Led development of React/TypeScript frontend serving 500K+ users',
        relevantKeywords: ['React', 'TypeScript', 'Node.js', 'AWS', 'Docker', 'PostgreSQL', 'CI/CD', 'Microservices']
      },
      {
        title: 'Full-Stack Developer',
        company: 'DataSystems Corp',
        companySize: 'enterprise',
        duration: '2017-2020',
        yearsInRole: 3,
        description: 'Built RESTful APIs and React applications',
        relevantKeywords: ['React', 'Node.js', 'AWS', 'Agile']
      },
      {
        title: 'Junior Developer',
        company: 'TechStart Inc',
        companySize: 'small',
        duration: '2015-2017',
        yearsInRole: 2,
        description: 'Developed web applications',
        relevantKeywords: ['React', 'JavaScript']
      }
    ],
    skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'PostgreSQL', 'MongoDB', 'Docker', 'Kubernetes', 'GraphQL', 'CI/CD', 'Microservices', 'Agile', 'Python'],
    techAdjacency: 95,
    matchedKeywords: ['React', 'TypeScript', 'Node.js', 'AWS', 'PostgreSQL', 'Docker', 'Kubernetes', 'GraphQL', 'CI/CD', 'Agile'],
    matchBand: 'high',
    matchScore: 94,
    matchExplanation: {
      educationMatch: true,
      educationNote: 'Master\'s degree exceeds Bachelor\'s requirement',
      experienceMatch: true,
      experienceNote: '9 years experience exceeds 5 year requirement',
      skillMatches: [
        { skill: 'React', matched: true, citation: 'Led development of React/TypeScript frontend serving 500K+ users' },
        { skill: 'TypeScript', matched: true, citation: 'Led development of React/TypeScript frontend' },
        { skill: 'Node.js', matched: true, citation: 'Architected microservices using Node.js and AWS Lambda' },
        { skill: 'AWS', matched: true, citation: 'Worked with AWS services (EC2, S3, RDS)' },
        { skill: 'PostgreSQL', matched: true, citation: 'Managed PostgreSQL databases with advanced query optimization' }
      ],
      keywordMatches: [
        { keyword: 'React', found: true, context: 'React/TypeScript frontend serving 500K+ users' },
        { keyword: 'Microservices', found: true, context: 'Architected microservices using Node.js' },
        { keyword: 'Fintech', found: true, context: 'Lead Software Engineer at FinanceFlow' }
      ],
      overallReason: 'Exceptional match with 9 years experience, Master\'s degree, and strong alignment with all required skills including fintech background.'
    }
  },
  {
    id: 'c-002',
    name: 'Michael Rodriguez',
    email: 'm.rodriguez@email.com',
    filename: 'michael_rodriguez_resume.docx',
    content: `
      MICHAEL RODRIGUEZ
      Software Engineer
      
      PROFESSIONAL EXPERIENCE:
      
      Software Engineer | CloudTech Solutions (Medium Company) | 2019-Present
      - Developed React applications with TypeScript
      - Built Node.js backend services
      - Implemented AWS cloud infrastructure
      - Worked in Agile development environment
      
      Junior Software Developer | WebDev Agency (Small Company) | 2017-2019
      - Created responsive web applications
      - Used JavaScript and React for frontend development
      - Collaborated in Scrum teams
      
      EDUCATION:
      Bachelor of Science in Computer Science | UCLA | 2017
      
      TECHNICAL SKILLS:
      JavaScript, React, TypeScript, Node.js, AWS, PostgreSQL, Git, Agile
    `,
    education: {
      level: 'bachelors',
      field: 'Computer Science',
      institution: 'UCLA',
      year: 2017
    },
    totalYearsExperience: 7,
    pastRoles: [
      {
        title: 'Software Engineer',
        company: 'CloudTech Solutions',
        companySize: 'medium',
        duration: '2019-Present',
        yearsInRole: 5,
        description: 'Developed React applications with TypeScript',
        relevantKeywords: ['React', 'TypeScript', 'Node.js', 'AWS', 'Agile']
      },
      {
        title: 'Junior Software Developer',
        company: 'WebDev Agency',
        companySize: 'small',
        duration: '2017-2019',
        yearsInRole: 2,
        description: 'Created responsive web applications',
        relevantKeywords: ['React', 'JavaScript']
      }
    ],
    skills: ['JavaScript', 'React', 'TypeScript', 'Node.js', 'AWS', 'PostgreSQL', 'Git', 'Agile'],
    techAdjacency: 78,
    matchedKeywords: ['React', 'TypeScript', 'Node.js', 'AWS', 'PostgreSQL', 'Agile'],
    matchBand: 'high',
    matchScore: 82,
    matchExplanation: {
      educationMatch: true,
      educationNote: 'Bachelor\'s degree meets requirement',
      experienceMatch: true,
      experienceNote: '7 years experience exceeds 5 year requirement',
      skillMatches: [
        { skill: 'React', matched: true, citation: 'Developed React applications with TypeScript' },
        { skill: 'TypeScript', matched: true, citation: 'Developed React applications with TypeScript' },
        { skill: 'Node.js', matched: true, citation: 'Built Node.js backend services' },
        { skill: 'AWS', matched: true, citation: 'Implemented AWS cloud infrastructure' }
      ],
      keywordMatches: [
        { keyword: 'React', found: true, context: 'Developed React applications' },
        { keyword: 'AWS', found: true, context: 'AWS cloud infrastructure' }
      ],
      overallReason: 'Strong match with required experience and core technology stack. Meets all primary requirements.'
    }
  },
  {
    id: 'c-003',
    name: 'Emily Watson',
    email: 'emily.w@email.com',
    filename: 'emily_watson_cv.pdf',
    content: `
      EMILY WATSON
      Full-Stack Developer
      
      EXPERIENCE:
      
      Full-Stack Developer | E-Commerce Plus (Startup) | 2021-Present
      - Building React frontends with modern JavaScript
      - Developing Node.js APIs
      - Working with MongoDB databases
      - Implementing Docker containers
      
      Frontend Developer | DesignStudio (Small Company) | 2019-2021
      - Created user interfaces with React
      - Implemented responsive designs
      - Used Git for version control
      
      EDUCATION:
      Bachelor of Arts in Information Technology | NYU | 2019
      
      SKILLS:
      React, JavaScript, Node.js, MongoDB, Docker, Git, CSS, HTML
    `,
    education: {
      level: 'bachelors',
      field: 'Information Technology',
      institution: 'NYU',
      year: 2019
    },
    totalYearsExperience: 5,
    pastRoles: [
      {
        title: 'Full-Stack Developer',
        company: 'E-Commerce Plus',
        companySize: 'startup',
        duration: '2021-Present',
        yearsInRole: 3,
        description: 'Building React frontends and Node.js APIs',
        relevantKeywords: ['React', 'Node.js', 'MongoDB', 'Docker']
      },
      {
        title: 'Frontend Developer',
        company: 'DesignStudio',
        companySize: 'small',
        duration: '2019-2021',
        yearsInRole: 2,
        description: 'Created user interfaces with React',
        relevantKeywords: ['React', 'JavaScript']
      }
    ],
    skills: ['React', 'JavaScript', 'Node.js', 'MongoDB', 'Docker', 'Git', 'CSS', 'HTML'],
    techAdjacency: 65,
    matchedKeywords: ['React', 'Node.js', 'Docker'],
    matchBand: 'medium',
    matchScore: 68,
    matchExplanation: {
      educationMatch: true,
      educationNote: 'Bachelor\'s degree meets requirement',
      experienceMatch: true,
      experienceNote: '5 years experience meets minimum requirement',
      skillMatches: [
        { skill: 'React', matched: true, citation: 'Building React frontends with modern JavaScript' },
        { skill: 'Node.js', matched: true, citation: 'Developing Node.js APIs' },
        { skill: 'TypeScript', matched: false },
        { skill: 'AWS', matched: false }
      ],
      keywordMatches: [
        { keyword: 'React', found: true, context: 'Building React frontends' },
        { keyword: 'Docker', found: true, context: 'Implementing Docker containers' },
        { keyword: 'TypeScript', found: false }
      ],
      overallReason: 'Good match with core React/Node.js skills. Missing TypeScript and cloud platform experience (AWS/GCP/Azure).'
    }
  },
  {
    id: 'c-004',
    name: 'David Kim',
    email: 'david.kim@email.com',
    filename: 'david_kim_resume.pdf',
    content: `
      DAVID KIM
      Backend Engineer
      
      EXPERIENCE:
      
      Backend Engineer | DataPipeline Inc (Large Company) | 2020-Present
      - Developing Python backend services
      - Working with PostgreSQL and Redis
      - Implementing AWS Lambda functions
      - Building CI/CD pipelines
      
      Software Developer | TechCorp (Enterprise) | 2018-2020
      - Built Java backend applications
      - Managed Oracle databases
      - Practiced Agile methodologies
      
      Junior Developer | StartupXYZ (Startup) | 2016-2018
      - Developed Python scripts and automation
      - Learned software development practices
      
      EDUCATION:
      Master of Science in Software Engineering | MIT | 2016
      Bachelor of Science in Mathematics | Boston University | 2014
      
      SKILLS:
      Python, Java, PostgreSQL, Redis, AWS Lambda, CI/CD, Docker, Agile
    `,
    education: {
      level: 'masters',
      field: 'Software Engineering',
      institution: 'MIT',
      year: 2016
    },
    totalYearsExperience: 8,
    pastRoles: [
      {
        title: 'Backend Engineer',
        company: 'DataPipeline Inc',
        companySize: 'large',
        duration: '2020-Present',
        yearsInRole: 4,
        description: 'Developing Python backend services with AWS',
        relevantKeywords: ['Python', 'PostgreSQL', 'AWS', 'CI/CD', 'Docker']
      },
      {
        title: 'Software Developer',
        company: 'TechCorp',
        companySize: 'enterprise',
        duration: '2018-2020',
        yearsInRole: 2,
        description: 'Built Java backend applications',
        relevantKeywords: ['Java', 'Agile']
      },
      {
        title: 'Junior Developer',
        company: 'StartupXYZ',
        companySize: 'startup',
        duration: '2016-2018',
        yearsInRole: 2,
        description: 'Developed Python scripts and automation',
        relevantKeywords: ['Python']
      }
    ],
    skills: ['Python', 'Java', 'PostgreSQL', 'Redis', 'AWS Lambda', 'CI/CD', 'Docker', 'Agile'],
    techAdjacency: 55,
    matchedKeywords: ['PostgreSQL', 'AWS', 'CI/CD', 'Docker', 'Agile'],
    matchBand: 'medium',
    matchScore: 58,
    matchExplanation: {
      educationMatch: true,
      educationNote: 'Master\'s degree exceeds Bachelor\'s requirement',
      experienceMatch: true,
      experienceNote: '8 years experience exceeds 5 year requirement',
      skillMatches: [
        { skill: 'React', matched: false },
        { skill: 'TypeScript', matched: false },
        { skill: 'Node.js', matched: false },
        { skill: 'PostgreSQL', matched: true, citation: 'Working with PostgreSQL and Redis' },
        { skill: 'AWS', matched: true, citation: 'Implementing AWS Lambda functions' }
      ],
      keywordMatches: [
        { keyword: 'React', found: false },
        { keyword: 'AWS', found: true, context: 'Implementing AWS Lambda functions' },
        { keyword: 'CI/CD', found: true, context: 'Building CI/CD pipelines' }
      ],
      overallReason: 'Strong backend experience and education, but missing core frontend requirements (React, TypeScript). Would need significant ramp-up on frontend technologies.'
    }
  },
  {
    id: 'c-005',
    name: 'Jessica Martinez',
    email: 'j.martinez@email.com',
    filename: 'jessica_martinez_cv.docx',
    content: `
      JESSICA MARTINEZ
      Web Developer
      
      EXPERIENCE:
      
      Web Developer | LocalBusiness Solutions (Small Company) | 2022-Present
      - Creating WordPress websites
      - Building landing pages with HTML/CSS
      - Some JavaScript development
      
      Junior Web Developer | FreelanceWork | 2020-2022
      - Built simple websites for clients
      - Used HTML, CSS, and jQuery
      
      EDUCATION:
      Associate Degree in Web Development | Community College | 2020
      
      SKILLS:
      HTML, CSS, JavaScript, jQuery, WordPress, Basic React
    `,
    education: {
      level: 'other',
      field: 'Web Development',
      institution: 'Community College',
      year: 2020
    },
    totalYearsExperience: 4,
    pastRoles: [
      {
        title: 'Web Developer',
        company: 'LocalBusiness Solutions',
        companySize: 'small',
        duration: '2022-Present',
        yearsInRole: 2,
        description: 'Creating WordPress websites and landing pages',
        relevantKeywords: ['JavaScript', 'HTML', 'CSS']
      },
      {
        title: 'Junior Web Developer',
        company: 'Freelance',
        companySize: 'small',
        duration: '2020-2022',
        yearsInRole: 2,
        description: 'Built simple websites for clients',
        relevantKeywords: ['HTML', 'CSS', 'jQuery']
      }
    ],
    skills: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'WordPress', 'Basic React'],
    techAdjacency: 25,
    matchedKeywords: ['JavaScript'],
    matchBand: 'low',
    matchScore: 28,
    matchExplanation: {
      educationMatch: false,
      educationNote: 'Associate degree does not meet Bachelor\'s requirement',
      experienceMatch: false,
      experienceNote: '4 years experience below 5 year requirement',
      skillMatches: [
        { skill: 'React', matched: false },
        { skill: 'TypeScript', matched: false },
        { skill: 'Node.js', matched: false },
        { skill: 'AWS', matched: false }
      ],
      keywordMatches: [
        { keyword: 'React', found: false },
        { keyword: 'TypeScript', found: false },
        { keyword: 'Node.js', found: false }
      ],
      overallReason: 'Significant gaps in required skills and experience. Missing core technologies (React, TypeScript, Node.js, cloud platforms) and does not meet education or experience requirements.'
    }
  },
  {
    id: 'c-006',
    name: 'Alex Thompson',
    email: 'alex.t@email.com',
    filename: 'alex_thompson_resume.pdf',
    content: `
      ALEX THOMPSON
      Software Developer
      
      EXPERIENCE:
      
      Software Developer | MobileApps Co (Medium Company) | 2021-Present
      - Developing React Native mobile applications
      - Building some React web components
      - Using TypeScript for type safety
      - Working with Firebase backend
      
      Junior Developer | AppFactory (Startup) | 2019-2021
      - Created mobile apps with React Native
      - Learned JavaScript and React fundamentals
      
      EDUCATION:
      Bachelor of Science in Computer Science | UC San Diego | 2019
      
      SKILLS:
      React Native, React, TypeScript, JavaScript, Firebase, Git, Agile
    `,
    education: {
      level: 'bachelors',
      field: 'Computer Science',
      institution: 'UC San Diego',
      year: 2019
    },
    totalYearsExperience: 5,
    pastRoles: [
      {
        title: 'Software Developer',
        company: 'MobileApps Co',
        companySize: 'medium',
        duration: '2021-Present',
        yearsInRole: 3,
        description: 'Developing React Native mobile applications',
        relevantKeywords: ['React', 'TypeScript', 'JavaScript']
      },
      {
        title: 'Junior Developer',
        company: 'AppFactory',
        companySize: 'startup',
        duration: '2019-2021',
        yearsInRole: 2,
        description: 'Created mobile apps with React Native',
        relevantKeywords: ['React', 'JavaScript']
      }
    ],
    skills: ['React Native', 'React', 'TypeScript', 'JavaScript', 'Firebase', 'Git', 'Agile'],
    techAdjacency: 60,
    matchedKeywords: ['React', 'TypeScript', 'Agile'],
    matchBand: 'medium',
    matchScore: 62,
    matchExplanation: {
      educationMatch: true,
      educationNote: 'Bachelor\'s degree meets requirement',
      experienceMatch: true,
      experienceNote: '5 years experience meets minimum requirement',
      skillMatches: [
        { skill: 'React', matched: true, citation: 'Building some React web components' },
        { skill: 'TypeScript', matched: true, citation: 'Using TypeScript for type safety' },
        { skill: 'Node.js', matched: false },
        { skill: 'AWS', matched: false }
      ],
      keywordMatches: [
        { keyword: 'React', found: true, context: 'React web components' },
        { keyword: 'TypeScript', found: true, context: 'TypeScript for type safety' },
        { keyword: 'Node.js', found: false }
      ],
      overallReason: 'Has React and TypeScript experience but primarily mobile-focused. Missing Node.js backend and cloud platform experience.'
    }
  },
  {
    id: 'c-007',
    name: 'Rachel Green',
    email: 'r.green@email.com',
    filename: 'rachel_green_cv.pdf',
    content: `
      RACHEL GREEN
      Senior Full-Stack Developer
      
      EXPERIENCE:
      
      Senior Full-Stack Developer | PaymentTech (Enterprise) | 2018-Present
      - Leading React/TypeScript frontend development
      - Building Node.js microservices with Express
      - Managing AWS infrastructure (EC2, S3, Lambda, RDS)
      - Designing PostgreSQL database schemas
      - Implementing Kubernetes deployments
      - Setting up CI/CD with Jenkins and GitHub Actions
      
      Full-Stack Developer | CloudServices Inc (Large Company) | 2015-2018
      - Developed React applications
      - Built RESTful APIs with Node.js
      - Worked with GraphQL
      - Used Docker for containerization
      - Practiced Agile/Scrum
      
      Junior Developer | WebAgency (Small Company) | 2013-2015
      - Created web applications
      - Learned modern web development
      
      EDUCATION:
      Bachelor of Science in Computer Science | Carnegie Mellon | 2013
      
      SKILLS:
      React, TypeScript, Node.js, AWS, PostgreSQL, MongoDB, Docker, Kubernetes,
      GraphQL, CI/CD, Microservices, Agile, Python, Redis
    `,
    education: {
      level: 'bachelors',
      field: 'Computer Science',
      institution: 'Carnegie Mellon',
      year: 2013
    },
    totalYearsExperience: 11,
    pastRoles: [
      {
        title: 'Senior Full-Stack Developer',
        company: 'PaymentTech',
        companySize: 'enterprise',
        duration: '2018-Present',
        yearsInRole: 6,
        description: 'Leading React/TypeScript frontend development with AWS',
        relevantKeywords: ['React', 'TypeScript', 'Node.js', 'AWS', 'PostgreSQL', 'Kubernetes', 'CI/CD', 'Microservices']
      },
      {
        title: 'Full-Stack Developer',
        company: 'CloudServices Inc',
        companySize: 'large',
        duration: '2015-2018',
        yearsInRole: 3,
        description: 'Developed React applications and Node.js APIs',
        relevantKeywords: ['React', 'Node.js', 'GraphQL', 'Docker', 'Agile']
      },
      {
        title: 'Junior Developer',
        company: 'WebAgency',
        companySize: 'small',
        duration: '2013-2015',
        yearsInRole: 2,
        description: 'Created web applications',
        relevantKeywords: []
      }
    ],
    skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'PostgreSQL', 'MongoDB', 'Docker', 'Kubernetes', 'GraphQL', 'CI/CD', 'Microservices', 'Agile', 'Python', 'Redis'],
    techAdjacency: 98,
    matchedKeywords: ['React', 'TypeScript', 'Node.js', 'AWS', 'PostgreSQL', 'Docker', 'Kubernetes', 'GraphQL', 'CI/CD', 'Agile'],
    matchBand: 'high',
    matchScore: 96,
    matchExplanation: {
      educationMatch: true,
      educationNote: 'Bachelor\'s degree from top institution meets requirement',
      experienceMatch: true,
      experienceNote: '11 years experience significantly exceeds 5 year requirement',
      skillMatches: [
        { skill: 'React', matched: true, citation: 'Leading React/TypeScript frontend development' },
        { skill: 'TypeScript', matched: true, citation: 'Leading React/TypeScript frontend development' },
        { skill: 'Node.js', matched: true, citation: 'Building Node.js microservices with Express' },
        { skill: 'AWS', matched: true, citation: 'Managing AWS infrastructure (EC2, S3, Lambda, RDS)' },
        { skill: 'PostgreSQL', matched: true, citation: 'Designing PostgreSQL database schemas' }
      ],
      keywordMatches: [
        { keyword: 'React', found: true, context: 'Leading React/TypeScript frontend development' },
        { keyword: 'Microservices', found: true, context: 'Building Node.js microservices' },
        { keyword: 'Kubernetes', found: true, context: 'Implementing Kubernetes deployments' }
      ],
      overallReason: 'Exceptional match with 11 years experience and perfect alignment with all required and preferred skills. Fintech experience at PaymentTech is directly relevant.'
    }
  },
  {
    id: 'c-008',
    name: 'James Wilson',
    email: 'james.w@email.com',
    filename: 'james_wilson_resume.docx',
    content: `
      JAMES WILSON
      DevOps Engineer
      
      EXPERIENCE:
      
      DevOps Engineer | InfraCloud (Large Company) | 2019-Present
      - Managing Kubernetes clusters
      - Implementing CI/CD pipelines with GitLab
      - Working with AWS and GCP
      - Automating with Python and Bash
      - Docker containerization
      
      System Administrator | TechOps Inc (Medium Company) | 2016-2019
      - Managing Linux servers
      - Basic scripting with Python
      - Network administration
      
      EDUCATION:
      Bachelor of Science in Information Systems | University of Texas | 2016
      
      SKILLS:
      Kubernetes, Docker, AWS, GCP, CI/CD, Python, Bash, Linux, Terraform
    `,
    education: {
      level: 'bachelors',
      field: 'Information Systems',
      institution: 'University of Texas',
      year: 2016
    },
    totalYearsExperience: 8,
    pastRoles: [
      {
        title: 'DevOps Engineer',
        company: 'InfraCloud',
        companySize: 'large',
        duration: '2019-Present',
        yearsInRole: 5,
        description: 'Managing Kubernetes clusters and CI/CD pipelines',
        relevantKeywords: ['Kubernetes', 'CI/CD', 'AWS', 'Docker', 'Python']
      },
      {
        title: 'System Administrator',
        company: 'TechOps Inc',
        companySize: 'medium',
        duration: '2016-2019',
        yearsInRole: 3,
        description: 'Managing Linux servers',
        relevantKeywords: ['Python', 'Linux']
      }
    ],
    skills: ['Kubernetes', 'Docker', 'AWS', 'GCP', 'CI/CD', 'Python', 'Bash', 'Linux', 'Terraform'],
    techAdjacency: 45,
    matchedKeywords: ['Kubernetes', 'Docker', 'AWS', 'CI/CD'],
    matchBand: 'low',
    matchScore: 42,
    matchExplanation: {
      educationMatch: true,
      educationNote: 'Bachelor\'s degree meets requirement',
      experienceMatch: true,
      experienceNote: '8 years experience exceeds 5 year requirement',
      skillMatches: [
        { skill: 'React', matched: false },
        { skill: 'TypeScript', matched: false },
        { skill: 'Node.js', matched: false },
        { skill: 'AWS', matched: true, citation: 'Working with AWS and GCP' },
        { skill: 'Docker', matched: true, citation: 'Docker containerization' }
      ],
      keywordMatches: [
        { keyword: 'React', found: false },
        { keyword: 'Kubernetes', found: true, context: 'Managing Kubernetes clusters' },
        { keyword: 'CI/CD', found: true, context: 'Implementing CI/CD pipelines' }
      ],
      overallReason: 'Strong DevOps background with cloud and containerization experience, but no software development experience. Missing all core development requirements (React, TypeScript, Node.js).'
    }
  }
];

export const getEducationLabel = (level: EducationLevel): string => {
  const labels: Record<EducationLevel, string> = {
    high_school: 'High School',
    bachelors: "Bachelor's Degree",
    masters: "Master's Degree",
    phd: 'PhD',
    other: 'Other'
  };
  return labels[level];
};

export const getCompanySizeLabel = (size: CompanySize): string => {
  const labels: Record<CompanySize, string> = {
    startup: 'Startup (1-50)',
    small: 'Small (51-200)',
    medium: 'Medium (201-1000)',
    large: 'Large (1001-5000)',
    enterprise: 'Enterprise (5000+)'
  };
  return labels[size];
};

export const getMatchBandLabel = (band: MatchBand): string => {
  const labels: Record<MatchBand, string> = {
    high: 'High Match',
    medium: 'Medium Match',
    low: 'Low Match'
  };
  return labels[band];
};
