// Portfolio data - Based on Farid Maloof's profile
import type { ProfileData } from '../types';
import { masterExperiences } from './experiences';

export const defaultProfileData: ProfileData = {
  contact: {
    name: "Farid Maloof S.",
    location: "Bogotá, D.C., Colombia",
    phone: "+57 300 235 7202",
    email: "faridmaloof@gmail.com",
    linkedin: "linkedin.com/in/fmaloofs",
    linkedinUrl: "https://www.linkedin.com/in/fmaloofs/",
    github: "github.com/faridmaloof",
    githubUrl: "https://github.com/faridmaloof/",
    avatarUrl: "/profile.jpg"
  },

  titles: {
    combined: { 
      en: "Senior Software Engineer | SDET | Full Stack Developer", 
      es: "Ingeniero de Software Senior | SDET | Desarrollador Full Stack",
      pt: "Engenheiro de Software Sênior | SDET | Desenvolvedor Full Stack"
    },
    qa: { 
      en: "QA Automation Lead Engineer / Senior QA Specialist", 
      es: "Líder de Automatización de Pruebas QA / Especialista Senior",
      pt: "Líder de Automação de Testes QA / Especialista Sênior"
    },
    sdet: {
      en: "Software Development Engineer in Test (SDET) | Automation Architect",
      es: "Ingeniero de Desarrollo de Software en Pruebas (SDET) | Arquitecto de Automatización",
      pt: "Engenheiro de Software em Teste (SDET) | Arquiteto de Automação"
    },
    dev: { 
      en: "Senior Software Developer | Full Stack & Backend (.NET · Java)", 
      es: "Desarrollador de Software Senior | Full Stack & Backend (.NET · Java)",
      pt: "Desenvolvedor de Software Sênior | Full Stack e Backend (.NET · Java)"
    },
    backend: {
      en: "Senior Backend Engineer | .NET Core · Java Spring Boot · Cloud APIs",
      es: "Ingeniero Backend Senior | .NET Core · Java Spring Boot · APIs Cloud",
      pt: "Engenheiro Backend Sênior | .NET Core · Java Spring Boot · APIs Cloud"
    },
    fullstack: {
      en: "Senior Full Stack Engineer | React · TypeScript · .NET · Cloud",
      es: "Ingeniero Full Stack Senior | React · TypeScript · .NET · Cloud",
      pt: "Engenheiro Full Stack Sênior | React · TypeScript · .NET · Cloud"
    },
  },

  summary: {
    combined: {
      en: "Senior Software Engineer with 15+ years of experience delivering enterprise software solutions across software development, quality engineering, test automation architecture, and cloud-native technologies. My career uniquely combines software engineering and quality engineering disciplines, allowing me to design scalable systems, resilient automation frameworks, and high-velocity CI/CD workflows that accelerate release cycles with zero quality compromises. Specialized in modern distributed systems leveraging .NET, React, TypeScript, Java (Spring Boot), Playwright, Python, AWS, Azure, and Docker. Proven leadership track record as Senior Software Engineer, SDET, Technical Advisor, and Project Leader.",
      es: "Ingeniero de Software Senior con más de 15 años de experiencia entregando soluciones de software empresarial en desarrollo de software, ingeniería de calidad, arquitectura de automatización de pruebas y tecnologías cloud-native. Mi carrera combina disciplinas de ingeniería de software e ingeniería de calidad, permitiéndome diseñar sistemas escalables, frameworks de automatización y soluciones que mejoran la confiabilidad del software, aceleran los ciclos de entrega y habilitan equipos de alto rendimiento. Especializado en arquitecturas modernas con .NET, React, TypeScript, Java (Spring Boot), Playwright, Python, AWS, Azure y Docker. Destacada trayectoria como Desarrollador Senior, SDET, Asesor Técnico y Líder de Proyectos.",
      pt: "Engenheiro de Software Sênior com mais de 15 anos de experiência entregando soluções de software corporativo em desenvolvimento, engenharia de qualidade, arquitetura de automação de testes e tecnologias em nuvem. Combina disciplinas de desenvolvimento e qualidade, desenhando sistemas escaláveis, frameworks de testes e pipelines CI/CD que aceleram entregas com alta confiabilidade (.NET, React, TypeScript, Java Spring Boot, Playwright, AWS, Azure e Docker)."
    },
    sdet: {
      en: "Lead Software Development Engineer in Test (SDET) with 15+ years in technology and extensive mastery in architecting enterprise test automation frameworks (Playwright, Selenium, Robot Framework, Cypress, Pytest). Expert in shift-left testing, API contract validation, microservices reliability, and continuous performance benchmarking (JMeter, Postman/Newman) embedded directly into modern CI/CD pipelines (GitHub Actions, GitLab CI, Jenkins, Azure DevOps). Software engineering background allows in-depth code auditing, mock service creation, and early architectural risk mitigation in high-transaction fintech and banking environments (Evertec, Stori, GMSTEK).",
      es: "Ingeniero de Software Senior en Pruebas (SDET) con más de 15 años de trayectoria tecnológica y liderazgo en el diseño e implementación de frameworks de automatización empresarial (Playwright, Selenium, Robot Framework, Cypress, Pytest). Especialista en shift-left testing, validación de contratos de APIs, microservicios, seguridad y performance continuo (JMeter, Postman/Newman) integrados en pipelines CI/CD (GitHub Actions, GitLab CI, Azure DevOps). Su background como desarrollador le permite auditar código fuente, implementar pruebas de regresión automáticas y blindar la calidad en plataformas bancarias y fintech de alto volumen transaccional (Evertec, Stori, GMSTEK).",
      pt: "Engenheiro Sênior de Software em Teste (SDET) com mais de 15 anos de experiência e liderança na criação de frameworks de automação corporativa (Playwright, Selenium, Cypress, Robot Framework). Especialista em testes de APIs, microsserviços, performance e segurança integrados a pipelines CI/CD em ecossistemas bancários e fintechs de alta escala (Evertec, Stori, GMSTEK)."
    },
    qa: {
      en: "Automation Testing Senior Specialist / QA Lead with 15+ years in IT and 6+ years strictly focused on enterprise software quality assurance, test strategy, and test automation across fintech, banking, and mission-critical environments (Evertec, Stori, GMSTEK). Combines comprehensive QA methodology — risk-based test planning, exploratory testing, regression suites, API and performance testing (Postman, JMeter) — with an automation-first mindset that accelerates time-to-market while drastically minimizing production incidents.",
      es: "Especialista Senior en Automatización de Pruebas / Líder QA con más de 15 años en tecnología y más de 6 años enfocados en aseguramiento de calidad y automatización de pruebas en entornos fintech, bancarios y empresariales (Evertec, Stori, GMSTEK). Combina metodología integral de QA —planeación basada en riesgos, pruebas exploratorias, suites de regresión, pruebas de API y rendimiento (Postman, JMeter)— con una mentalidad automation-first que acelera el time-to-market y reduce drásticamente las incidencias en producción.",
      pt: "Especialista Sênior em Automação de Testes e Garantia de Qualidade (QA) com mais de 15 anos em TI e liderança de estratégias de testes em ambientes bancários e fintechs de missão crítica (Evertec, Stori, GMSTEK). Domínio de estratégias baseadas em risco, automação contínua, testes de API e performance (Postman, JMeter)."
    },
    dev: {
      en: "Senior Software Developer with 15+ years of experience engineering high-availability web applications, distributed APIs, and enterprise systems using modern C#/.NET (ASP.NET Core), Java (Spring Boot), PHP, and SQL/NoSQL databases (SQL Server, Oracle, PostgreSQL, MySQL). Full-lifecycle expertise from domain modeling, clean code architecture, code review, and CI/CD deployment to cloud infrastructure on AWS (EC2, RDS) and Azure. Built-in testing discipline ensures clean, robust, and maintainable software.",
      es: "Desarrollador de Software Senior con más de 15 años de experiencia construyendo aplicaciones web de alta disponibilidad, APIs distribuidas y plataformas empresariales con C#/.NET moderno (ASP.NET Core), Java (Spring Boot), PHP y bases de datos relacionales/NoSQL (SQL Server, Oracle, PostgreSQL, MySQL). Dominio del ciclo completo de desarrollo: arquitectura limpia, revisión de código, despliegue continuo e infraestructura en AWS (EC2, RDS) y Azure. Su disciplina de testing garantiza código limpio y mantenible.",
      pt: "Desenvolvedor de Software Sênior com mais de 15 anos de experiência construindo aplicações web e APIs corporativas em .NET (C#) e Java Spring Boot, com sólida atuação em banco de dados e nuvem (AWS/Azure)."
    },
    backend: {
      en: "Senior Backend Engineer with 15+ years of experience architecting resilient distributed microservices, secure RESTful APIs, and event-driven architectures with .NET 8/9, C#, and Java (Spring Boot). Specialized in high-throughput transactional database systems (SQL Server, PostgreSQL, Oracle, MySQL), cloud platforms (AWS, Azure), Docker containerization, and strict observability (logging, metrics, tracing). Implements Clean Architecture, DDD principles, and rigorous automated unit/integration test coverage.",
      es: "Ingeniero Backend Senior con más de 15 años de experiencia diseñando arquitecturas de microservicios resilientes, APIs RESTful seguras y sistemas orientados a eventos con .NET 8/9, C# y Java (Spring Boot). Especializado en optimización de bases de datos de alto rendimiento (SQL Server, PostgreSQL, Oracle, MySQL), plataformas cloud (AWS, Azure), contenedores Docker y observabilidad integral. Aplica Clean Architecture, principios DDD y rigurosa cobertura de pruebas unitarias y de integración.",
      pt: "Engenheiro Backend Sênior com mais de 15 anos de experiência no desenvolvimento de microsserviços escaláveis, APIs RESTful e arquiteturas de nuvem de alta performance em .NET Core e Java Spring Boot."
    },
    fullstack: {
      en: "Senior Full Stack Engineer with 15+ years of experience building end-to-end web applications, coupling reactive, accessible user interfaces (React, TypeScript, Tailwind CSS) with robust, high-performance backends (.NET Core, Java Spring Boot). Proven background in cloud container deployments, responsive design, state management, automated testing pipelines, and developer experience.",
      es: "Ingeniero Full Stack Senior con más de 15 años de experiencia creando aplicaciones web integrales, conectando interfaces reactivas y accesibles (React, TypeScript, Tailwind CSS) con servicios backend robustos de alto desempeño (.NET Core, Java Spring Boot). Experiencia en despliegue en la nube, diseño responsivo, gestión de estado y automatización continua.",
      pt: "Engenheiro Full Stack Sênior com mais de 15 anos de experiência liderando a entrega de soluções web completas com React, TypeScript, .NET Core e arquiteturas cloud modernas."
    },
  },

  skills: {
    combined: {
      en: [
        ["Languages & Frameworks", ".NET 8/9, C#, Java (Spring Boot), React, TypeScript, Python, PHP, Tailwind CSS"],
        ["Cloud & Infrastructure", "AWS (EC2, RDS, S3), Microsoft Azure, Docker, Kubernetes, Linux, Nginx"],
        ["Test Automation & SDET", "Playwright, Selenium, Robot Framework, Cypress, Pytest, JMeter, Postman/Newman, ISTQB"],
        ["API & Backend Architecture", "RESTful APIs, Google Cloud Apigee, ASP.NET Core Web API, Microservices, Clean Architecture"],
        ["Databases & Data Analytics", "SQL Server, PostgreSQL, Oracle, MySQL, MongoDB, Power BI, DAX, Redis"],
        ["Methodologies & DevOps", "CI/CD (GitHub Actions, Azure DevOps), Agile/Scrum, PMI/PMBOK, TDD, BDD, Code Reviews"],
      ],
      es: [
        ["Lenguajes y Frameworks", ".NET 8/9, C#, Java (Spring Boot), React, TypeScript, Python, PHP, Tailwind CSS"],
        ["Cloud e Infraestructura", "AWS (EC2, RDS, S3), Microsoft Azure, Docker, Kubernetes, Linux, Nginx"],
        ["Automatización de Pruebas & SDET", "Playwright, Selenium, Robot Framework, Cypress, Pytest, JMeter, Postman/Newman, ISTQB"],
        ["Arquitectura de APIs & Backend", "APIs RESTful, Google Cloud Apigee, ASP.NET Core Web API, Microservicios, Clean Architecture"],
        ["Bases de Datos & Analítica", "SQL Server, PostgreSQL, Oracle, MySQL, MongoDB, Power BI, DAX, Redis"],
        ["Metodologías & DevOps", "CI/CD (GitHub Actions, Azure DevOps), Agile/Scrum, PMI/PMBOK, TDD, BDD, Revisiones de Código"],
      ],
      pt: [
        ["Linguagens e Frameworks", ".NET 8/9, C#, Java (Spring Boot), React, TypeScript, Python, PHP, Tailwind CSS"],
        ["Nuvem e Infraestrutura", "AWS (EC2, RDS, S3), Microsoft Azure, Docker, Kubernetes, Linux"],
        ["Automação de Testes e SDET", "Playwright, Selenium, Robot Framework, Cypress, Pytest, JMeter, Postman, ISTQB"],
        ["APIs e Backend", "APIs RESTful, Google Cloud Apigee, ASP.NET Core Web API, Microsserviços"],
        ["Bancos de Dados e BI", "SQL Server, PostgreSQL, Oracle, MySQL, Power BI, DAX"],
        ["Metodologias e DevOps", "CI/CD, Agile/Scrum, PMI/PMBOK, TDD, BDD, Code Reviews"],
      ]
    },
    sdet: {
      en: [
        ["Automation Frameworks", "Playwright, Selenium WebDriver, Robot Framework, Cypress, Appium, Pytest"],
        ["Performance & API Testing", "Apache JMeter, Postman, Newman, REST-assured, k6, Contract Testing"],
        ["CI/CD & DevOps Quality", "GitHub Actions, GitLab CI, Jenkins, Azure DevOps, Docker test environments"],
        ["Quality Engineering Practices", "Shift-Left Testing, BDD (Cucumber), TDD, Risk-Based Testing, Defect Root Cause Analysis"],
        ["Languages for Automation", "TypeScript, JavaScript, Python, C#, Java, Bash scripting"],
        ["Standards & Compliance", "ISTQB Foundation v4.0, OWASP Top 10 Security Testing, SOX compliance"],
      ],
      es: [
        ["Frameworks de Automatización", "Playwright, Selenium WebDriver, Robot Framework, Cypress, Appium, Pytest"],
        ["Pruebas de Rendimiento & APIs", "Apache JMeter, Postman, Newman, REST-assured, k6, Pruebas de Contratos"],
        ["Calidad en CI/CD & DevOps", "GitHub Actions, GitLab CI, Jenkins, Azure DevOps, Ambientes de prueba en Docker"],
        ["Prácticas de Calidad de Software", "Shift-Left Testing, BDD (Cucumber), TDD, Pruebas basadas en riesgo, Análisis de causa raíz"],
        ["Lenguajes para Automatización", "TypeScript, JavaScript, Python, C#, Java, Scripts en Bash"],
        ["Estándares y Cumplimiento", "ISTQB Foundation v4.0, Pruebas de seguridad OWASP Top 10, Cumplimiento SOX"],
      ],
      pt: [
        ["Frameworks de Automação", "Playwright, Selenium WebDriver, Robot Framework, Cypress, Appium, Pytest"],
        ["Testes de Performance e APIs", "Apache JMeter, Postman, Newman, REST-assured, k6"],
        ["CI/CD e Qualidade DevOps", "GitHub Actions, GitLab CI, Jenkins, Azure DevOps, Docker"],
        ["Práticas de Engenharia de Qualidade", "Shift-Left Testing, BDD (Cucumber), TDD, Testes baseados em risco"],
        ["Linguagens para Automação", "TypeScript, JavaScript, Python, C#, Java, Bash"],
        ["Padrões e Certificações", "ISTQB Foundation v4.0, OWASP Top 10, Conformidade SOX"],
      ]
    },
    qa: {
      en: [
        ["Test Strategy & Automation", "Test planning & strategy, automation frameworks, regression & risk-based testing, CI/CD integration"],
        ["Testing Tools", "JMeter (performance), Postman (API testing), bug-tracking systems (Jira), Power BI (quality metrics)"],
        ["Technical Foundations", "API testing (Apigee, ASP.NET Core), SQL (MySQL, Oracle, SQL Server), AWS (EC2, RDS), Java, C#"],
        ["Methodologies & Frameworks", "Agile/Scrum, PMI project management, PMBOK, ISTQB standards"],
      ],
      es: [
        ["Estrategia y Automatización de Pruebas", "Planeación y estrategia de pruebas, frameworks de automatización, pruebas de regresión basadas en riesgo, integración con CI/CD"],
        ["Herramientas de Testing", "JMeter (rendimiento), Postman (pruebas de API), sistemas de bug tracking (Jira), Power BI (métricas de calidad)"],
        ["Bases Técnicas", "Pruebas de APIs (Apigee, ASP.NET Core), SQL (MySQL, Oracle, SQL Server), AWS (EC2, RDS), Java, C#"],
        ["Metodologías y Marcos", "Agile/Scrum, gestión de proyectos PMI, PMBOK, estándares ISTQB"],
      ],
      pt: [
        ["Estratégia e Automação de Testes", "Planejamento e estratégia de testes, frameworks de automação, testes de regressão, CI/CD"],
        ["Ferramentas de Teste", "JMeter (performance), Postman (testes de API), Jira, Power BI"],
        ["Bases Técnicas", "Testes de APIs, SQL (MySQL, Oracle, SQL Server), AWS (EC2, RDS), Java, C#"],
        ["Metodologias", "Agile/Scrum, gerenciamento de projetos PMI, PMBOK, normas ISTQB"],
      ]
    },
    dev: {
      en: [
        ["Languages & Frameworks", "C#/.NET (ASP.NET Core, .NET 8/9, VB.NET), Java (Spring Boot), PHP, React, TypeScript"],
        ["Cloud & Databases", "AWS (EC2, RDS), Microsoft Azure, MySQL, Oracle, SQL Server, PostgreSQL, MongoDB"],
        ["API Development", "RESTful API design, Google Cloud Apigee, ASP.NET Core Web APIs, Spring Boot APIs"],
        ["Engineering Practices", "Clean Architecture, Code reviews, CI/CD collaboration, unit & integration testing, Agile/Scrum"],
        ["Quality Mindset", "Integrated automated testing, JMeter, Postman, shift-left QA approach"],
      ],
      es: [
        ["Lenguajes y Frameworks", "C#/.NET (ASP.NET Core, .NET 8/9, VB.NET), Java (Spring Boot), PHP, React, TypeScript"],
        ["Cloud y Bases de Datos", "AWS (EC2, RDS), Microsoft Azure, MySQL, Oracle, SQL Server, PostgreSQL, MongoDB"],
        ["Desarrollo de APIs", "Diseño de APIs RESTful, Google Cloud Apigee, ASP.NET Core Web APIs, Spring Boot APIs"],
        ["Prácticas de Ingeniería", "Clean Architecture, Revisiones de código, CI/CD, pruebas unitarias y de integración, Agile/Scrum"],
        ["Mentalidad de Calidad", "Pruebas automatizadas integradas, JMeter, Postman, enfoque shift-left"],
      ],
      pt: [
        ["Linguagens e Frameworks", "C#/.NET (ASP.NET Core, .NET 8/9), Java (Spring Boot), PHP, React, TypeScript"],
        ["Nuvem e Bancos de Dados", "AWS (EC2, RDS), Microsoft Azure, MySQL, Oracle, SQL Server, PostgreSQL"],
        ["Desenvolvimento de APIs", "APIs RESTful, Google Cloud Apigee, ASP.NET Core Web APIs, Spring Boot"],
        ["Práticas de Engenharia", "Clean Architecture, Code reviews, CI/CD, testes unitários, Agile/Scrum"],
        ["Cultura de Qualidade", "Testes automatizados integrados, JMeter, Postman, shift-left"],
      ]
    },
    backend: {
      en: [
        ["Backend Technologies", "C#/.NET 8/9, ASP.NET Core, Java (Spring Boot, Spring Data, Spring Security), PHP"],
        ["Distributed Systems & Cloud", "Microservices architecture, RESTful APIs, AWS (EC2, RDS, S3), Azure, Docker, Kubernetes"],
        ["Databases & Caching", "SQL Server, PostgreSQL, Oracle, MySQL, Redis caching, schema design & query optimization"],
        ["Engineering Standards", "Clean Architecture, Domain-Driven Design (DDD), SOLID, Design Patterns, Event-Driven Architecture"],
        ["DevOps & Reliability", "GitHub Actions CI/CD, Docker, Prometheus/Grafana observability, structured logging, unit testing"],
      ],
      es: [
        ["Tecnologías Backend", "C#/.NET 8/9, ASP.NET Core, Java (Spring Boot, Spring Data, Spring Security), PHP"],
        ["Sistemas Distribuidos & Cloud", "Arquitectura de microservicios, APIs RESTful, AWS (EC2, RDS, S3), Azure, Docker, Kubernetes"],
        ["Bases de Datos & Caché", "SQL Server, PostgreSQL, Oracle, MySQL, Redis, diseño de esquemas y optimización de consultas"],
        ["Estándares de Ingeniería", "Clean Architecture, Domain-Driven Design (DDD), SOLID, Patrones de diseño, Event-Driven"],
        ["DevOps & Confiabilidad", "CI/CD con GitHub Actions, Docker, observabilidad con Prometheus/Grafana, logging estructurado"],
      ],
      pt: [
        ["Tecnologias Backend", "C#/.NET 8/9, ASP.NET Core, Java (Spring Boot, Spring Data), PHP"],
        ["Sistemas Distribuídos e Nuvem", "Microsserviços, APIs RESTful, AWS, Azure, Docker, Kubernetes"],
        ["Bancos de Dados e Cache", "SQL Server, PostgreSQL, Oracle, MySQL, Redis"],
        ["Padrões de Engenharia", "Clean Architecture, DDD, SOLID, Design Patterns"],
        ["DevOps e Observabilidade", "CI/CD, Docker, monitoramento e testes unitários"],
      ]
    },
    fullstack: {
      en: [
        ["Frontend Technologies", "React 18/19, TypeScript, JavaScript, Tailwind CSS, Vite, HTML5, CSS3/PostCSS"],
        ["Backend Technologies", "C#/.NET Core, Java Spring Boot, Node.js, RESTful APIs, WebSockets"],
        ["Cloud & Infrastructure", "AWS, Azure, Docker containers, Vercel, Cloud Run, Nginx"],
        ["Databases & Storage", "PostgreSQL, MySQL, SQL Server, MongoDB, S3 object storage"],
        ["Testing & Quality", "Playwright E2E, Vitest, Jest, Postman API testing, CI/CD pipelines"],
      ],
      es: [
        ["Tecnologías Frontend", "React 18/19, TypeScript, JavaScript, Tailwind CSS, Vite, HTML5, CSS3/PostCSS"],
        ["Tecnologías Backend", "C#/.NET Core, Java Spring Boot, Node.js, APIs RESTful, WebSockets"],
        ["Cloud e Infraestructura", "AWS, Azure, Contenedores Docker, Vercel, Cloud Run, Nginx"],
        ["Bases de Datos y Almacenamiento", "PostgreSQL, MySQL, SQL Server, MongoDB, Almacenamiento en S3"],
        ["Pruebas y Calidad", "Playwright E2E, Vitest, Jest, pruebas de API con Postman, pipelines CI/CD"],
      ],
      pt: [
        ["Tecnologias Frontend", "React, TypeScript, JavaScript, Tailwind CSS, Vite, HTML5, CSS3"],
        ["Tecnologias Backend", "C#/.NET Core, Java Spring Boot, APIs RESTful"],
        ["Nuvem e Infraestrutura", "AWS, Azure, Docker, Cloud Run, Nginx"],
        ["Bancos de Dados", "PostgreSQL, MySQL, SQL Server, MongoDB"],
        ["Testes e Qualidade", "Playwright E2E, Vitest, Postman, pipelines CI/CD"],
      ]
    }
  },

  certifications: {
    en: [
      "Software Testing Foundations: Integrating AI into the Quality Process (LinkedIn)",
      "Robot Framework Test Automation: Level 1 - Selenium (LinkedIn)",
      "Building Web APIs with ASP.NET Core 8 & Clean Architecture (LinkedIn)",
      "API Design and Fundamentals of Google Cloud's Apigee API Platform (Google Cloud)",
      "Power BI: Data Modeling & Business Analytics Masterclass (Udemy)",
      "Linux System Administration, Security & Shell Scripting (SENA)",
      "English for Professional Communication — Advanced Working Proficiency"
    ],
    es: [
      "Fundamentos de Pruebas de Software: Integrando IA en el Proceso de Calidad (LinkedIn)",
      "Automatización de Pruebas con Robot Framework: Nivel 1 - Selenium (LinkedIn)",
      "Construcción de APIs Web con ASP.NET Core 8 & Clean Architecture (LinkedIn)",
      "Diseño de APIs y Fundamentos de Apigee API Platform en Google Cloud (Google Cloud)",
      "Power BI: Modelado de Datos y Analítica Empresarial Masterclass (Udemy)",
      "Administración de Sistemas Linux, Seguridad y Shell Scripting (SENA)",
      "Inglés para Comunicación Profesional — Nivel Laboral Avanzado"
    ],
    pt: [
      "Fundamentos de Testes de Software: Integrando IA no Processo de Qualidade (LinkedIn)",
      "Automação de Testes com Robot Framework: Nível 1 - Selenium (LinkedIn)",
      "Construção de APIs Web com ASP.NET Core 8 e Clean Architecture (LinkedIn)",
      "Design de APIs e Fundamentos do Google Cloud Apigee (Google Cloud)",
      "Power BI: Modelagem de Dados e Business Intelligence (Udemy)",
      "Administração Linux e Shell Scripting (SENA)",
      "Inglês para Comunicação Profissional"
    ]
  },

  languages: {
    en: [
      "Spanish — Native / Bilingual (C2)", 
      "English — Professional Working Proficiency (B2/C1 Technical & Conversational)",
      "Portuguese — Basic / Elementary Understanding"
    ],
    es: [
      "Español — Nativo / Bilingüe (C2)", 
      "Inglés — Dominio Profesional Avanzado (B2/C1 Técnico y Conversacional)",
      "Portugués — Comprensión Básica / Elemental"
    ],
    pt: [
      "Espanhol — Nativo / Bilíngue (C2)",
      "Inglês — Fluência Profissional (B2/C1 Técnico e Conversacional)",
      "Português — Compreensão Básica"
    ]
  },

  experience: masterExperiences,

  earlyCareer: {
    heading: { en: "Early Career (Foundational Roles)", es: "Inicio de Carrera (Roles Fundacionales)", pt: "Início de Carreira" },
    items: {
      en: [
        { en: ["Banco de Occidente", "Operations & Technology Audit Assistant (2012 – 2015)", "Cali, Colombia", "Automated recurring audit and reporting processes using ACL scripting; consolidated information for SOX compliance and Grupo Aval reporting; supported technology audits across multiple regional offices."], es: ["Banco de Occidente", "Asistente de Auditoría de Procesos y Tecnología (2012 – 2015)", "Cali, Colombia", "Automatizó procesos recurrentes de auditoría y reporting usando scripts en ACL; consolidó información para cumplimiento SOX y reportes a Grupo Aval; apoyó auditorías tecnológicas en distintas sedes regionales."] },
        { en: ["EMCALI EICE ESP", "Service Desk / Help Desk (Aug 2011 – May 2012)", "Cali, Colombia", "Provided first- and second-level technical support for ADSL, IP telephony, and IP television services, ensuring service continuity and customer satisfaction."], es: ["EMCALI EICE ESP", "Service Desk / Mesa de Ayuda (Ago 2011 – May 2012)", "Cali, Colombia", "Brindó soporte técnico de primer y segundo nivel para servicios de ADSL, telefonía IP y televisión IP, garantizando continuidad del servicio y satisfacción del cliente."] },
        { en: ["Grupo SAI S.A.S", "Support Analyst (Jan 2011 – Aug 2011)", "Cali, Colombia", "Configured and maintained the SAI Open accounting application and its database for client implementations."], es: ["Grupo SAI S.A.S", "Analista de Soporte (Ene 2011 – Ago 2011)", "Cali, Colombia", "Configuró y mantuvo la aplicación contable SAI Open y su base de datos para implementaciones de clientes."] }
      ],
      es: [
        { en: ["Banco de Occidente", "Operations & Technology Audit Assistant (2012 – 2015)", "Cali, Colombia", "Automated recurring audit and reporting processes using ACL scripting; consolidated information for SOX compliance and Grupo Aval reporting; supported technology audits across multiple regional offices."], es: ["Banco de Occidente", "Asistente de Auditoría de Procesos y Tecnología (2012 – 2015)", "Cali, Colombia", "Automatizó procesos recurrentes de auditoría y reporting usando scripts en ACL; consolidó información para cumplimiento SOX y reportes a Grupo Aval; apoyó auditorías tecnológicas en distintas sedes regionales."] },
        { en: ["EMCALI EICE ESP", "Service Desk / Help Desk (Aug 2011 – May 2012)", "Cali, Colombia", "Provided first- and second-level technical support for ADSL, IP telephony, and IP television services, ensuring service continuity and customer satisfaction."], es: ["EMCALI EICE ESP", "Service Desk / Mesa de Ayuda (Ago 2011 – May 2012)", "Cali, Colombia", "Brindó soporte técnico de primer y segundo nivel para servicios de ADSL, telefonía IP y televisión IP, garantizando continuidad del servicio y satisfacción del cliente."] },
        { en: ["Grupo SAI S.A.S", "Support Analyst (Jan 2011 – Aug 2011)", "Cali, Colombia", "Configured and maintained the SAI Open accounting application and its database for client implementations."], es: ["Grupo SAI S.A.S", "Analista de Soporte (Ene 2011 – Ago 2011)", "Cali, Colombia", "Configuró y mantuvo la aplicación contable SAI Open y su base de datos para implementaciones de clientes."] }
      ]
    }
  },

  education: {
    en: [
      { en: ["Asturias Corporación Universitaria", "Specialization in Project Management (PMI / PMBOK)", "Oct 2023 – Nov 2024", "GPA 4.9/5.0"], es: ["Asturias Corporación Universitaria", "Especialización en Gerencia de Proyectos (PMI / PMBOK)", "Oct 2023 – Nov 2024", "Promedio 4.9/5.0"] },
      { en: ["Uniremington", "Systems Engineering (Software Engineering Focus)", "Feb 2020 – Mar 2023", "GPA 4.2/5.0"], es: ["Uniremington", "Ingeniería de Sistemas (Énfasis en Ingeniería de Software)", "Feb 2020 – Mar 2023", "Promedio 4.2/5.0"] },
      { en: ["Universidad Autónoma de Occidente", "Computer Engineering (Advanced Coursework)", "2014 – 2017", "GPA 4.0/5.0"], es: ["Universidad Autónoma de Occidente", "Ingeniería Informática (Materias Aprobadas)", "2014 – 2017", "Promedio 4.0/5.0"] },
      { en: ["Universidad del Valle", "Technology in Information Systems", "Aug 2006 – May 2010", "GPA 3.77/5.0"], es: ["Universidad del Valle", "Tecnología en Sistemas de Información", "Ago 2006 – May 2010", "Promedio 3.77/5.0"] },
      { en: ["UNICIENCIA", "Computer Engineering (Foundation Coursework)", "2004 – 2006", "GPA 4.7/5.0"], es: ["UNICIENCIA", "Ingeniería Informática (Materias Cursadas)", "2004 – 2006", "Promedio 4.7/5.0"] }
    ],
    es: [
      { en: ["Asturias Corporación Universitaria", "Specialization in Project Management (PMI / PMBOK)", "Oct 2023 – Nov 2024", "GPA 4.9/5.0"], es: ["Asturias Corporación Universitaria", "Especialización en Gerencia de Proyectos (PMI / PMBOK)", "Oct 2023 – Nov 2024", "Promedio 4.9/5.0"] },
      { en: ["Uniremington", "Systems Engineering (Software Engineering Focus)", "Feb 2020 – Mar 2023", "GPA 4.2/5.0"], es: ["Uniremington", "Ingeniería de Sistemas (Énfasis en Ingeniería de Software)", "Feb 2020 – Mar 2023", "Promedio 4.2/5.0"] },
      { en: ["Universidad Autónoma de Occidente", "Computer Engineering (Advanced Coursework)", "2014 – 2017", "GPA 4.0/5.0"], es: ["Universidad Autónoma de Occidente", "Ingeniería Informática (Materias Aprobadas)", "2014 – 2017", "Promedio 4.0/5.0"] },
      { en: ["Universidad del Valle", "Technology in Information Systems", "Aug 2006 – May 2010", "GPA 3.77/5.0"], es: ["Universidad del Valle", "Tecnología en Sistemas de Información", "Ago 2006 – May 2010", "Promedio 3.77/5.0"] },
      { en: ["UNICIENCIA", "Computer Engineering (Foundation Coursework)", "2004 – 2006", "GPA 4.7/5.0"], es: ["UNICIENCIA", "Ingeniería Informática (Materias Cursadas)", "2004 – 2006", "Promedio 4.7/5.0"] }
    ]
  },

  labels: {
    en: {
      summary: "PROFESSIONAL SUMMARY",
      skills: "CORE TECHNICAL SKILLS",
      certifications: "FEATURED CERTIFICATIONS & LICENSES",
      languages: "LANGUAGES",
      experience: "PROFESSIONAL EXPERIENCE",
      education: "HIGHER EDUCATION & SPECIALIZATIONS",
    },
    es: {
      summary: "RESUMEN PROFESIONAL",
      skills: "HABILIDADES TÉCNICAS CLAVE",
      certifications: "CERTIFICACIONES & LICENCIAS DESTACADAS",
      languages: "IDIOMAS",
      experience: "EXPERIENCIA PROFESIONAL",
      education: "EDUCACIÓN SUPERIOR & POSGRADOS",
    },
    pt: {
      summary: "RESUMO PROFISSIONAL",
      skills: "HABILIDADES TÉCNICAS",
      certifications: "CERTIFICAÇÕES E LICENÇAS",
      languages: "IDIOMAS",
      experience: "EXPERIÊNCIA PROFISSIONAL",
      education: "FORMAÇÃO ACADÊMICA E PÓS-GRADUAÇÃO",
    }
  }
};
