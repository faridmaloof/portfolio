// Portfolio data - Based on Farid Maloof's profile
import type { ProfileData } from '../types';

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

  experience: [
    {
      company: "Evertec",
      role: {
        combined: { en: "Senior Automation Testing Specialist & SDET Lead", es: "Especialista Senior en Automatización de Pruebas & Líder SDET", pt: "Especialista Sênior em Automação de Testes e Líder SDET" },
        qa: { en: "Automation Testing Senior Specialist", es: "Especialista Senior en Automatización de Pruebas", pt: "Especialista Sênior em Automação de Testes" },
        sdet: { en: "Lead Software Development Engineer in Test (SDET)", es: "Líder de Desarrollo de Software en Pruebas (SDET)", pt: "Líder de Desenvolvimento de Software em Teste (SDET)" },
        dev: { en: "Senior Quality & Backend Engineer", es: "Ingeniero Senior de Backend & Calidad", pt: "Engenheiro Sênior de Backend e Qualidade" },
        backend: { en: "Senior Backend & Test Integration Engineer", es: "Ingeniero Senior de Backend e Integración de Pruebas", pt: "Engenheiro Sênior de Backend e Testes" },
        fullstack: { en: "Senior Full Stack & Quality Systems Engineer", es: "Ingeniero Senior Full Stack & Sistemas de Calidad", pt: "Engenheiro Sênior Full Stack e Qualidade" }
      },
      location: "Bogotá, Colombia (Remoto / Remote)",
      modality: 'remote',
      companyDescription: {
        en: "Leading transactional technology and full-service payment processing company serving financial institutions and merchants across 26 countries in Latin America and the Caribbean.",
        es: "Compañía global líder en tecnología transaccional y procesamiento de pagos bancarios y comerciales en 26 países de Latinoamérica y el Caribe.",
        pt: "Empresa líder em tecnologia transacional e processamento de pagamentos para instituições financeiras na América Latina e Caribe."
      },
      dates: { en: "Dec 2025 – Present", es: "Dic 2025 – Presente", pt: "Dez 2025 – Presente" },
      detail: {
        qa: {
          en: [
            "Architect, design, and maintain enterprise automated test suites and frameworks to guarantee software reliability across mission-critical, high-availability banking and financial processing engines.",
            "Lead test automation strategy across core payment gateways, establishing scalable patterns, regression governance, and CI/CD-integrated testing gates.",
            "Partner closely with Development, Architecture, and DevOps teams to optimize release cycles, reduce regression turnaround time by over 45%, and ensure defect-free deployments.",
            "Drive shift-left quality methodologies, integrating automated API contract validation and performance health checks prior to production deployment."
          ],
          es: [
            "Diseña, desarrolla y mantiene suites y frameworks empresariales de automatización de pruebas para garantizar la calidad del software en plataformas financieras y bancarias transaccionales de alta disponibilidad.",
            "Lidera iniciativas de automatización en pasarelas de pago y motores de liquidación, estableciendo buenas prácticas, estándares de regresión y gates de calidad integrados con CI/CD.",
            "Colabora estrechamente con los equipos de Desarrollo, Arquitectura y DevOps para optimizar los ciclos de entrega continua, reduciendo los tiempos de regresión en más del 45% y asegurando despliegues con cero incidentes críticos.",
            "Impulsa metodologías shift-left de calidad continua, integrando validación automatizada de contratos de APIs y pruebas de rendimiento antes de cada paso a producción."
          ],
          pt: [
            "Projeta e mantém suites e frameworks corporativos de automação de testes para sistemas financeiros e bancários de alta disponibilidade.",
            "Lidera estratégias de automação e qualidade em gateways de pagamento, integrando gates de qualidade no pipeline CI/CD.",
            "Colabora com desenvolvimento e DevOps para otimizar entregas contínuas e reduzir tempo de testes de regressão."
          ]
        },
        dev: {
          en: [
            "Architect and maintain automated testing suites and CI/CD quality gates for distributed financial transactional services, partnering closely with software engineering and DevOps.",
            "Implement automated regression, integration, and contract test suites that drastically reduce production deployment risk and ensure zero downtime during high-load processing.",
            "Collaborate with backend engineering teams on API stability, logging standards, and code coverage improvements across transaction processing microservices."
          ],
          es: [
            "Diseña y mantiene frameworks de automatización y compuertas de calidad integradas con CI/CD para servicios financieros transaccionales distribuidos, en estrecha colaboración con desarrollo y DevOps.",
            "Implementa suites de pruebas automatizadas de regresión, integración y contratos de APIs que reducen drásticamente el riesgo de fallas en producción y garantizan alta resiliencia.",
            "Colabora con los equipos de ingeniería backend en la estabilidad de APIs, estándares de observabilidad y mejora de la cobertura de código en microservicios transaccionales."
          ],
          pt: [
            "Desenvolve e mantém frameworks de testes automatizados e pipelines de qualidade para serviços transacionais financeiros de alta escala.",
            "Aprimora a cobertura de testes e confiabilidade de APIs em cooperação com equipes de backend."
          ]
        }
      }
    },
    {
      company: "Stori (Fintech Unicorn)",
      role: {
        combined: { en: "Senior QA Automation Engineer (SDET)", es: "Ingeniero Senior de Automatización QA (SDET)", pt: "Engenheiro Sênior de Automação QA (SDET)" },
        qa: { en: "QA Automation Engineer", es: "Ingeniero de Automatización QA", pt: "Engenheiro de Automação QA" },
        sdet: { en: "Software Development Engineer in Test (SDET)", es: "Ingeniero de Desarrollo de Software en Pruebas (SDET)", pt: "Engenheiro de Software em Teste (SDET)" },
        dev: { en: "QA Automation & Software Quality Engineer", es: "Ingeniero de Automatización QA & Calidad de Software", pt: "Engenheiro de Automação e Qualidade de Software" },
        backend: { en: "Backend QA Automation Engineer", es: "Ingeniero de Automatización QA Backend", pt: "Engenheiro de Automação Backend" },
        fullstack: { en: "Full Stack Quality & Automation Engineer", es: "Ingeniero de Calidad y Automatización Full Stack", pt: "Engenheiro de Automação Full Stack" }
      },
      location: "México / Bogotá, Colombia (Híbrido / Hybrid)",
      modality: 'hybrid',
      companyDescription: {
        en: "Fast-growing Mexican unicorn fintech providing digital credit cards, deposit accounts, and micro-lending to millions of underserved users, with engineering hub in Bogotá.",
        es: "Empresa fintech unicornio mexicana de servicios financieros digitales, tarjetas de crédito y captación de depósitos con millones de usuarios y hub tecnológico en Bogotá.",
        pt: "Fintech unicórnio mexicana que oferece cartões de crédito e serviços financeiros digitais, com hub tecnológico em Bogotá."
      },
      dates: { en: "Jun 2023 – Aug 2025", es: "Jun 2023 – Ago 2025", pt: "Jun 2023 – Ago 2025" },
      detail: {
        qa: {
          en: [
            "Engineered end-to-end automation test strategies and suites for high-growth digital banking and credit card products, aligning test coverage with regulatory compliance and business risk.",
            "Automated core financial workflows (credit evaluation, transactional authorization, KYC, user onboarding), validating backend performance and edge cases prior to bi-weekly releases.",
            "Owned defect triage and root-cause analysis in Jira, leveraging historical defect metrics to strengthen test coverage and prevent defect re-emergence.",
            "Collaborated proactively with product managers, tech leads, and mobile/backend developers during refinement and design phases to prevent defects before code was written.",
            "Transformed manual QA workflows into scalable automation pipelines, achieving over 75% automated regression coverage across critical paths."
          ],
          es: [
            "Diseñó y ejecutó estrategias integrales de pruebas automatizadas para productos de banca digital y tarjetas de crédito de alto crecimiento, alineando la cobertura con el riesgo del negocio y normativas fintech.",
            "Automatizó flujos financieros neurálgicos (evaluación crediticia, autorización de transacciones, onboarding KYC), simulando carga y validando funcionalidad antes de cada release.",
            "Lideró la identificación, documentación y análisis de causa raíz de defectos en Jira, analizando datos históricos de calidad para fortalecer continuamente las suites de regresión.",
            "Participó proactivamente en la revisión de especificaciones y diseño técnico con equipos de producto e ingeniería, anticipando fallas de arquitectura antes de iniciar el desarrollo.",
            "Evolucionó procesos manuales hacia pipelines de automatización continua, alcanzando más del 75% de cobertura automatizada en los flujos más críticos."
          ],
          pt: [
            "Projetou e executou estratégias de automação para produtos de cartão de crédito e contas digitais da fintech.",
            "Automatizou fluxos críticos (crédito, autorização de transações, KYC) e elevou a cobertura para mais de 75%.",
            "Trabalhou em conjunto com equipes de produto e engenharia para prevenir falhas desde a fase de especificação."
          ]
        },
        dev: {
          en: [
            "Built automated test suites and simulation harnesses for fintech microservices, validating backend transactional integrity under high concurrent user load.",
            "Partnered with product, backend, and platform teams, reviewing technical specifications and API schemas to eliminate potential architectural bugs.",
            "Integrated automated testing pipelines into delivery workflows, boosting team confidence and cutting deployment cycle duration."
          ],
          es: [
            "Construyó suites de pruebas automatizadas y simuladores para microservicios fintech, validando la integridad transaccional del backend ante alta concurrencia.",
            "Colaboró con equipos de producto, backend y plataforma, revisando especificaciones técnicas y contratos de APIs para eliminar errores antes del despliegue.",
            "Integró pipelines de pruebas automáticas en el flujo de entrega continua, incrementando la confianza del equipo y acelerando los despliegues a producción."
          ],
          pt: [
            "Construiu testes automatizados e simuladores para microsserviços fintech sob alta concorrência.",
            "Apoiou revisões de contratos de APIs e integração de testes no pipeline de entrega."
          ]
        }
      }
    },
    {
      company: "GMSTEK, LLC",
      role: {
        combined: { en: "Software Developer & QA Automation Tester", es: "Desarrollador de Software & QA Automation Tester", pt: "Desenvolvedor de Software e QA Tester" },
        qa: { en: "Development & QA Tester", es: "Desarrollo & QA Tester", pt: "Desenvolvimento e QA Tester" },
        sdet: { en: "Software Development Engineer in Test (SDET)", es: "Ingeniero de Pruebas de Desarrollo de Software (SDET)", pt: "Engenheiro de Software em Teste (SDET)" },
        dev: { en: "Full Stack Developer & QA Engineer", es: "Desarrollador Full Stack & Ingeniero QA", pt: "Desenvolvedor Full Stack e Engenheiro QA" },
        backend: { en: "Backend Developer & QA Tester", es: "Desarrollador Backend & QA Tester", pt: "Desenvolvedor Backend e QA Tester" },
        fullstack: { en: "Full Stack Developer & QA Specialist", es: "Desarrollador Full Stack & Especialista QA", pt: "Desenvolvedor Full Stack e QA" }
      },
      location: "Palmetto Bay, Florida, USA (Remoto / Remote)",
      modality: 'remote',
      companyDescription: {
        en: "US-based software engineering and technological innovation company located in Florida, delivering custom enterprise software solutions and cloud systems globally 100% remotely.",
        es: "Empresa estadounidense de ingeniería de software e innovación tecnológica con sede en Florida, prestando servicios de desarrollo y cloud a clientes globales en modalidad 100% remota.",
        pt: "Empresa de tecnologia sediada na Flórida, EUA, prestando serviços de desenvolvimento corporativo e nuvem 100% remotamente."
      },
      dates: { en: "Jul 2022 – Jun 2023", es: "Jul 2022 – Jun 2023", pt: "Jul 2022 – Jun 2023" },
      detail: {
        qa: {
          en: [
            "Devised and executed rigorous manual and automated test strategies for US enterprise clients, validating functionality, performance, and cross-browser responsiveness.",
            "Identified, categorized, and tracked software bugs using structured defect tracking systems, maintaining a verified defect repository that accelerated resolution times.",
            "Analyzed client business requirements and technical specifications to deliver actionable design recommendations that reduced downstream production bugs.",
            "Championed test automation adoption, implementing automated regression suites that significantly decreased manual testing overhead."
          ],
          es: [
            "Elaboró y ejecutó estrategias de pruebas manuales y automatizadas rigurosas para clientes corporativos en EE.UU., validando funcionalidad, rendimiento y compatibilidad multiplataforma.",
            "Identificó, categorizó y documentó defectos mediante sistemas formales de bug tracking, manteniendo una base de datos actualizada que redujo los tiempos de corrección.",
            "Analizó requerimientos de negocio y especificaciones de software para formular recomendaciones de diseño que evitaron retrabajos en producción.",
            "Impulsó la transición hacia la automatización de pruebas, desarrollando scripts de regresión automática que redujeron significativamente el tiempo de validación manual."
          ],
          pt: [
            "Desenvolveu e executou estratégias de testes manuais e automatizados para clientes corporativos nos EUA em regime 100% remoto.",
            "Manteve rastreamento estruturado de bugs e criou scripts de regressão automatizados."
          ]
        },
        dev: {
          en: [
            "Contributed to full-stack web application development and bug fixing, enhancing platform stability and user experience for international clients.",
            "Executed automated and manual testing while providing architectural feedback that minimized regressions across client applications.",
            "Collaborated with remote cross-functional engineering teams in an agile environment, ensuring on-time delivery of client deliverables."
          ],
          es: [
            "Contribuyó al desarrollo full stack y corrección de incidencias en aplicaciones web empresariales, mejorando la estabilidad y experiencia de usuario para clientes internacionales.",
            "Ejecutó pruebas automatizadas y manuales mientras aportaba recomendaciones de diseño técnico que evitaron fallas en producción.",
            "Colaboró estrechamente con equipos multidisciplinarios remotos bajo metodología ágil, garantizando entregas puntuales y de alta calidad."
          ],
          pt: [
            "Atuou no desenvolvimento full stack e correção de falhas em aplicações web corporativas para clientes internacionais.",
            "Realizou testes automatizados e participou de cerimônias ágeis com equipes remotas."
          ]
        }
      }
    },
    {
      company: "COLSOF S.A.S",
      role: {
        combined: { en: "Specialist Technology Engineer & Project Leader", es: "Ingeniero Especialista & Líder de Proyectos Tecnológicos", pt: "Engenheiro Especialista e Líder de Projetos" },
        qa: { en: "Specialist Engineer & Quality Lead", es: "Ingeniero Especialista & Líder de Calidad", pt: "Engenheiro Especialista e Líder de Qualidade" },
        sdet: { en: "Specialist Engineer & Automation Advisor", es: "Ingeniero Especialista & Asesor de Automatización", pt: "Engenheiro Especialista em Automação" },
        dev: { en: "Specialist Technology Engineer", es: "Ingeniero Especialista de Tecnología", pt: "Engenheiro Especialista em Tecnologia" },
        backend: { en: "Specialist Systems & Backend Engineer", es: "Ingeniero Especialista de Sistemas y Backend", pt: "Engenheiro Especialista em Sistemas e Backend" },
        fullstack: { en: "Specialist Solutions Engineer", es: "Ingeniero Especialista de Soluciones", pt: "Engenheiro Especialista em Soluções" }
      },
      location: "Bogotá, Colombia (Híbrido / Hybrid)",
      modality: 'hybrid',
      companyDescription: {
        en: "Leading IT technology solutions integrator in Colombia with 30+ years in the market, specializing in enterprise infrastructure, cloud data centers, and digital transformation.",
        es: "Compañía líder en integración de soluciones de TI en Colombia con más de 30 años en el mercado, especializada en infraestructura empresarial, centros de datos y transformación digital.",
        pt: "Empresa líder em integração de soluções de infraestrutura de TI e centros de dados corporativos na Colômbia."
      },
      dates: { en: "Aug 2021 – Jun 2022", es: "Ago 2021 – Jun 2022", pt: "Ago 2021 – Jun 2022" },
      detail: {
        qa: {
          en: [
            "Managed technology and quality initiatives under PMI standards and agile frameworks, tracking deliverables and system reliability via Power BI management dashboards.",
            "Led cross-functional engineering teams in enterprise technology deployments, ensuring rigorous acceptance testing and adherence to SLAs."
          ],
          es: [
            "Gestionó proyectos tecnológicos e iniciativas de calidad bajo estándares PMI y marcos ágiles, monitoreando entregables y estabilidad mediante tableros de control en Power BI.",
            "Lideró equipos multidisciplinarios de ingeniería en implementaciones tecnológicas corporativas, garantizando pruebas de aceptación rigurosas y cumplimiento de SLAs."
          ],
          pt: [
            "Gerenciou projetos tecnológicos sob padrões PMI e metodologias ágeis com dashboards no Power BI.",
            "Liderou testes de aceitação e garantia de conformidade técnica."
          ]
        },
        dev: {
          en: [
            "Directed enterprise technology implementation projects following PMI standards and agile methodologies, managing scope, budget, and delivery milestones.",
            "Designed and built automated KPI management dashboards in Power BI, enabling executives and technical teams to make data-driven decisions.",
            "Defined technological innovation roadmaps and supervised technical architecture, coordinating administrative, financial, and IT infrastructure resources."
          ],
          es: [
            "Dirigió proyectos de implementación tecnológica empresarial bajo estándares PMI y metodologías ágiles, gestionando alcance, cronograma y presupuesto.",
            "Diseñó y construyó tableros de gestión y KPIs automatizados en Power BI, facilitando la toma de decisiones estratégicas basadas en datos a nivel directivo y técnico.",
            "Definió y ejecutó planes de innovación tecnológica, coordinando recursos de infraestructura TI, soporte y arquitectura para cumplir las metas organizacionales."
          ],
          pt: [
            "Liderou projetos de inovação tecnológica corporativa e implementação de infraestrutura sob padrões PMI.",
            "Construiu painéis de gestão e indicadores automatizados no Power BI."
          ]
        }
      }
    },
    {
      company: "ECOPROYECT CONSULTORÍA SAS",
      role: {
        combined: { en: "Senior J2EE / Java Cloud Developer", es: "Desarrollador Senior J2EE / Java Cloud", pt: "Desenvolvedor Sênior Java / Cloud" },
        qa: { en: "Senior Java Developer & QA Automation", es: "Desarrollador Senior Java & QA Automation", pt: "Desenvolvedor Sênior Java e QA" },
        sdet: { en: "Senior Java & SDET Integration Engineer", es: "Ingeniero Senior Java & Integración SDET", pt: "Engenheiro Sênior Java e Testes" },
        dev: { en: "Senior J2EE Developer", es: "Desarrollador Senior J2EE", pt: "Desenvolvedor Sênior J2EE" },
        backend: { en: "Senior Java Spring Boot / AWS Backend Engineer", es: "Ingeniero Backend Senior Java Spring Boot / AWS", pt: "Engenheiro Backend Sênior Java Spring Boot / AWS" },
        fullstack: { en: "Senior Java Full Stack Developer", es: "Desarrollador Full Stack Senior Java", pt: "Desenvolvedor Full Stack Sênior Java" }
      },
      location: "Cali, Colombia (Remoto / Remote)",
      modality: 'remote',
      companyDescription: {
        en: "Boutique software engineering consultancy specializing in enterprise Java EE architecture, Spring Boot microservices, and Amazon Web Services (AWS) cloud infrastructure.",
        es: "Firma de consultoría de software especializada en arquitectura empresarial Java EE, microservicios Spring Boot e infraestructura cloud en Amazon Web Services (AWS).",
        pt: "Consultoria especializada em arquitetura de software empresarial Java EE e soluções em nuvem AWS."
      },
      dates: { en: "Nov 2021 – Feb 2022", es: "Nov 2021 – Feb 2022", pt: "Nov 2021 – Fev 2022" },
      detail: {
        qa: {
          en: [
            "Led Java/Spring Boot development and test automation for enterprise client solutions, implementing rigorous unit (JUnit, Mockito) and integration test suites.",
            "Conducted comprehensive code reviews and mentored junior developers, establishing high code-quality benchmarks and automated testing in AWS environments."
          ],
          es: [
            "Lideró el desarrollo y pruebas automatizadas en Java/Spring Boot para soluciones corporativas, implementando pruebas unitarias exhaustivas (JUnit, Mockito) y de integración.",
            "Realizó revisiones de código y mentoría técnica a desarrolladores junior, elevando los estándares de calidad e integrando pruebas automáticas en ambientes AWS."
          ],
          pt: [
            "Liderou desenvolvimento e automação de testes em Java Spring Boot com JUnit e Mockito.",
            "Realizou revisões de código e mentoria técnica para elevar os padrões de qualidade."
          ]
        },
        dev: {
          en: [
            "Architected, developed, and deployed robust backend microservices in Java and Spring Boot, partnering with architecture leads on scalable technical designs.",
            "Led the full software development lifecycle (SDLC), from conceptual design through AWS cloud deployment (EC2, RDS, S3) and continuous maintenance.",
            "Executed automated unit and integration tests to ensure code reliability and backward compatibility prior to continuous deployment releases.",
            "Mentored engineering peers on Clean Architecture, design patterns, and efficient relational database querying in MySQL/PostgreSQL."
          ],
          es: [
            "Diseñó, desarrolló y desplegó microservicios backend robustos en Java y Spring Boot, colaborando con el equipo de arquitectura en diseños técnicos altamente escalables.",
            "Lideró el ciclo completo de desarrollo de software (SDLC), desde el diseño conceptual hasta el despliegue cloud en AWS (EC2, RDS, S3) y mantenimiento continuo.",
            "Ejecutó pruebas unitarias y de integración automatizadas para garantizar estabilidad y cero regresiones antes de cada despliegue con DevOps.",
            "Brindó mentoría al equipo en Clean Architecture, patrones de diseño y optimización de consultas en bases de datos relacionales MySQL/PostgreSQL."
          ],
          pt: [
            "Projetou e desenvolveu microsserviços em Java Spring Boot com implantação na nuvem AWS (EC2, RDS).",
            "Cobriu o ciclo de vida completo de desenvolvimento com foco em Clean Architecture e alta disponibilidade."
          ]
        }
      }
    },
    {
      company: "GreenSQA S.A.",
      role: {
        combined: { en: "Software Test Engineer → Junior Integrated Service Professional", es: "Ingeniero de Pruebas de Software → Profesional Junior de Servicios Integrados", pt: "Engenheiro de Testes de Software" },
        qa: { en: "Software Test Engineer → Junior Integrated Service Professional", es: "Ingeniero de Pruebas de Software → Profesional Junior de Servicios Integrados", pt: "Engenheiro de Testes de Software" },
        sdet: { en: "Test Automation Engineer & QA Analyst", es: "Ingeniero de Automatización de Pruebas & Analista QA", pt: "Engenheiro de Automação de Testes e QA" },
        dev: { en: "Software Test & Automation Developer", es: "Desarrollador de Pruebas & Automatización", pt: "Desenvolvedor de Testes e Automação" },
        backend: { en: "Backend & API Test Engineer", es: "Ingeniero de Pruebas Backend & APIs", pt: "Engenheiro de Testes Backend e APIs" },
        fullstack: { en: "Integrated QA & Test Automation Specialist", es: "Especialista Integrado de QA y Automatización", pt: "Especialista em QA e Automação" }
      },
      location: "Cali, Colombia (Remoto / Remote)",
      modality: 'remote',
      companyDescription: {
        en: "Latin American benchmark company specializing exclusively in software quality assurance (SQA), digital testing consulting, and automated quality governance.",
        es: "Compañía referente en Latinoamérica especializada exclusivamente en aseguramiento de calidad de software (SQA), consultoría de pruebas digitales y automatización continua.",
        pt: "Empresa líder na América Latina especializada em garantia de qualidade de software (SQA) e automação de testes contínuos."
      },
      dates: { en: "Feb 2020 – Aug 2021", es: "Feb 2020 – Ago 2021", pt: "Fev 2020 – Ago 2021" },
      detail: {
        qa: {
          en: [
            "Planned, scoped, and estimated formal testing services for diverse enterprise client projects, designing, executing, and reporting on functional, regression, and non-functional tests.",
            "Designed and deployed automation robots to streamline repetitive testing execution, boosting operational throughput while reducing human error.",
            "Logged defects and non-conformities with thorough reproduction steps in designated tracking tools, working directly with client engineering teams on resolutions.",
            "Identified project testing risks and authored mitigation continuity plans, managing testing assets under rigorous configuration-management protocols."
          ],
          es: [
            "Planeó, estimó y dimensionó servicios de pruebas formales para múltiples proyectos corporativos de clientes, diseñando, ejecutando y documentando pruebas funcionales, no funcionales y de regresión.",
            "Diseñó y construyó robots de automatización de pruebas para agilizar ejecuciones repetitivas, maximizando la cobertura y reduciendo los tiempos de validación.",
            "Reportó no conformidades y defectos con pasos detallados de reproducción en herramientas de seguimiento, coordinando su cierre efectivo con los equipos de desarrollo del cliente.",
            "Identificó riesgos críticos de calidad y elaboró planes de contingencia, administrando los activos de prueba bajo estrictos controles de gestión de configuración."
          ],
          pt: [
            "Planejou e executou testes funcionais, de regressão e automatizados para clientes corporativos.",
            "Desenvolveu robôs de automação para acelerar ciclos de testes e reportou defeitos estruturados."
          ]
        },
        dev: {
          en: [
            "Developed test automation scripts and executed functional and non-functional test protocols for enterprise software applications.",
            "Applied formal test design methodologies and configuration management practices to maximize test coverage and mitigate release risks."
          ],
          es: [
            "Desarrolló scripts de automatización de pruebas y ejecutó protocolos de pruebas funcionales y no funcionales para aplicaciones empresariales.",
            "Aplicó técnicas formales de diseño de pruebas y gestión de configuración para maximizar la cobertura y mitigar riesgos en cada entrega."
          ],
          pt: [
            "Desenvolveu scripts de automação de testes e executou protocolos de testes funcionais e técnicos."
          ]
        }
      }
    },
    {
      company: "Busscar de Colombia",
      role: {
        combined: { en: "Senior Software Developer (C# / .NET / Databases)", es: "Desarrollador Senior de Software (C# / .NET / Bases de Datos)", pt: "Desenvolvedor Sênior de Software" },
        qa: { en: "Senior Software Developer & Quality Assurance", es: "Desarrollador Senior de Software & Aseguramiento de Calidad", pt: "Desenvolvedor Sênior e QA" },
        sdet: { en: "Senior Software Developer in Test", es: "Desarrollador Senior de Software en Pruebas", pt: "Desenvolvedor Sênior em Teste" },
        dev: { en: "Senior Software Developer", es: "Desarrollador Senior de Software", pt: "Desenvolvedor Sênior de Software" },
        backend: { en: "Senior .NET & Database Developer", es: "Desarrollador Senior .NET & Bases de Datos", pt: "Desenvolvedor Sênior .NET e Banco de Dados" },
        fullstack: { en: "Senior .NET Full Stack Developer", es: "Desarrollador Full Stack Senior .NET", pt: "Desenvolvedor Full Stack Sênior .NET" }
      },
      location: "Pereira, Colombia (Presencial / On-site)",
      modality: 'onsite',
      companyDescription: {
        en: "Major automotive manufacturer of mass transit and intercity bus coachworks in Latin America, engineering advanced industrial and transportation systems.",
        es: "Importante fabricante automotriz de carrocerías de transporte masivo e intermunicipal en Latinoamérica, con procesos avanzados de ingeniería y manufactura.",
        pt: "Grande fabricante de carrocerias automotivas e de transporte público na América Latina."
      },
      dates: { en: "Sep 2017 – Feb 2020", es: "Sep 2017 – Feb 2020", pt: "Set 2017 – Fev 2020" },
      detail: {
        qa: {
          en: [
            "Engineered and maintained Product Data Management (PDM) systems in C# and VB.NET, integrated with MySQL, Oracle, and SQL Server databases.",
            "Led comprehensive code reviews, data validation protocols, and technical quality standards across the flagship SINERGIA enterprise project."
          ],
          es: [
            "Diseñó y desarrolló sistemas de gestión de datos de producto (PDM) en C# y VB.NET integrados con bases de datos MySQL, Oracle y SQL Server.",
            "Lideró revisiones exhaustivas de código, protocolos de validación de datos y estándares de calidad técnica en el proyecto corporativo SINERGIA."
          ],
          pt: [
            "Desenvolveu e manteve sistemas PDM em C# e VB.NET integrados com SQL Server, Oracle e MySQL.",
            "Liderou revisões de código e padrões de qualidade no projeto SINERGIA."
          ]
        },
        dev: {
          en: [
            "Architected and engineered custom Product Data Management (PDM) software systems using C# and VB.NET, integrating tightly with MySQL, Oracle, and SQL Server databases.",
            "Analyzed, developed, and maintained core manufacturing and engineering applications for multiple business units under the SINERGIA enterprise project.",
            "Spearheaded technical code reviews and mentored junior programmers, instilling clean code principles, database indexing best practices, and knowledge sharing.",
            "Collaborated across engineering and manufacturing stakeholders to gather requirements, define project milestones, and guarantee timely software deliveries."
          ],
          es: [
            "Diseñó y desarrolló sistemas de gestión de datos de producto (PDM) a la medida en C# y VB.NET, integrando fluidamente bases de datos MySQL, Oracle y SQL Server.",
            "Analizó, desarrolló y brindó soporte continuo a aplicaciones críticas de manufactura e ingeniería para múltiples áreas del negocio bajo el proyecto SINERGIA.",
            "Lideró revisiones técnicas de código y capacitó a desarrolladores junior, promoviendo principios de código limpio, buenas prácticas de indexación en bases de datos y transferencia técnica.",
            "Colaboró con líderes de ingeniería y producción para levantar especificaciones de requerimientos, definir cronogramas y asegurar entregas de alta confiabilidad."
          ],
          pt: [
            "Projetou e desenvolveu sistemas PDM em C# e VB.NET integrados com bancos de dados relacionais corporativos.",
            "Atuou na sustentação e evolução de softwares de engenharia no projeto SINERGIA."
          ]
        }
      }
    },
    {
      company: "EMCALI EICE ESP",
      role: {
        combined: { en: "Technology Solutions Analyst", es: "Analista de Soluciones Tecnológicas", pt: "Analista de Soluções Tecnológicas" },
        qa: { en: "Technology Solutions & Testing Analyst", es: "Analista de Soluciones Tecnológicas y Pruebas", pt: "Analista de Soluções e Testes" },
        sdet: { en: "Systems & Quality Analyst", es: "Analista de Sistemas y Calidad", pt: "Analista de Sistemas e Qualidade" },
        dev: { en: "Technology Solutions Analyst", es: "Analista de Soluciones Tecnológicas", pt: "Analista de Soluções Tecnológicas" },
        backend: { en: "Backend & Systems Analyst", es: "Analista de Backend y Sistemas", pt: "Analista de Backend e Sistemas" },
        fullstack: { en: "Application Solutions Analyst", es: "Analista de Soluciones de Aplicaciones", pt: "Analista de Aplicações" }
      },
      location: "Cali, Colombia (Presencial / On-site)",
      modality: 'onsite',
      companyDescription: {
        en: "Major state-owned public utilities enterprise providing telecommunications, energy, water, and sewage infrastructure to over 2 million citizens.",
        es: "Gran empresa estatal de servicios públicos domiciliarios prestadora de telecomunicaciones, energía, acueducto y alcantarillado para más de 2 millones de usuarios.",
        pt: "Grande empresa estatal de serviços públicos e infraestrutura de telecomunicações e energia."
      },
      dates: { en: "Jun 2016 – Sep 2017", es: "Jun 2016 – Sep 2017", pt: "Jun 2016 – Set 2017" },
      detail: {
        qa: {
          en: [
            "Conducted comprehensive functional, security, and stability testing across internal telecommunications platforms and client service tools.",
            "Classified and investigated production incidents, validating fixes to ensure high service availability and customer satisfaction."
          ],
          es: [
            "Realizó pruebas exhaustivas de funcionalidad, seguridad y estabilidad en aplicaciones internas de telecomunicaciones y herramientas de atención al cliente.",
            "Clasificó e investigó incidencias en producción, validando las correcciones para garantizar alta disponibilidad y satisfacción de los usuarios."
          ],
          pt: [
            "Executou testes de funcionalidade e estabilidade em aplicações internas de telecomunicações.",
            "Diagnosticou e validou correções de incidentes em produção."
          ]
        },
        dev: {
          en: [
            "Designed, developed, and maintained core internal software applications for the telecommunications business unit, extending functionality and optimizing UX.",
            "Diagnosed, classified, and resolved Tier-3 software incidents, providing permanent code-level fixes and database corrections.",
            "Analyzed operational requirements to architect software features addressing mission-critical business workflows."
          ],
          es: [
            "Diseñó, desarrolló y mantuvo aplicaciones internas críticas para el área de telecomunicaciones, ampliando funcionalidades y optimizando el rendimiento.",
            "Diagnosticó, clasificó y solucionó incidentes de software de tercer nivel, implementando soluciones definitivas a nivel de código y base de datos.",
            "Analizó requerimientos operativos para construir soluciones tecnológicas que optimizaron los flujos de trabajo de la empresa."
          ],
          pt: [
            "Desenvolveu e sustentou aplicações para o setor de telecomunicações.",
            "Solucionou incidentes técnicos complexos e implementou melhorias de sistema."
          ]
        }
      }
    },
    {
      company: "System Factory SAS",
      role: {
        combined: { en: "Technology Solutions Leader", es: "Líder de Soluciones Tecnológicas", pt: "Líder de Soluções Tecnológicas" },
        qa: { en: "Technology Solutions & QA Lead", es: "Líder de Soluciones Tecnológicas y QA", pt: "Líder de Soluções e QA" },
        sdet: { en: "Lead Software & Automation Engineer", es: "Ingeniero Líder de Software y Automatización", pt: "Líder de Software e Automação" },
        dev: { en: "Technology Solutions Leader", es: "Líder de Soluciones Tecnológicas", pt: "Líder de Soluções Tecnológicas" },
        backend: { en: "Lead Backend Developer (ASP.NET / PHP)", es: "Líder Desarrollador Backend (ASP.NET / PHP)", pt: "Líder Backend (ASP.NET / PHP)" },
        fullstack: { en: "Lead Full Stack Developer", es: "Líder Desarrollador Full Stack", pt: "Líder Full Stack" }
      },
      location: "Cali, Colombia (Presencial / On-site)",
      modality: 'onsite',
      companyDescription: {
        en: "Software development and digital solutions company delivering custom web and enterprise database applications.",
        es: "Empresa de desarrollo de software y soluciones digitales especializada en aplicaciones web corporativas y bases de datos.",
        pt: "Fábrica de software especializada em soluções web e bancos de dados corporativos."
      },
      dates: { en: "Jun 2016 – Sep 2016", es: "Jun 2016 – Sep 2016", pt: "Jun 2016 – Set 2016" },
      detail: {
        qa: {
          en: [
            "Supervised code quality and led software testing protocols for web solutions built on ASP.NET Core and PHP, guaranteeing database consistency and secure data access.",
            "Optimized engineering workflows to accelerate delivery cycles while upholding high release standards."
          ],
          es: [
            "Supervisó la calidad del código y lideró protocolos de pruebas para soluciones web construidas en ASP.NET Core y PHP, garantizando consistencia en bases de datos y seguridad.",
            "Optimizó flujos de trabajo de ingeniería para acelerar los ciclos de entrega manteniendo altos estándares de calidad."
          ],
          pt: [
            "Supervisionou a qualidade e testes de soluções web em ASP.NET Core e PHP."
          ]
        },
        dev: {
          en: [
            "Led design, architecture, and development of web applications using ASP.NET Core, PHP, and relational databases.",
            "Established clean coding guidelines, database schema standards, and technical oversight across engineering projects."
          ],
          es: [
            "Lideró el diseño, arquitectura y desarrollo de aplicaciones web utilizando ASP.NET Core, PHP y bases de datos relacionales.",
            "Estableció directrices de código limpio, estándares de bases de datos y acompañamiento técnico a los desarrolladores."
          ],
          pt: [
            "Liderou o desenvolvimento de aplicações web em ASP.NET Core e PHP com foco em código limpo."
          ]
        }
      }
    },
    {
      company: "Grupo SAI S.A.S",
      role: {
        combined: { en: "Senior Support & Database Engineer", es: "Ingeniero Senior de Soporte y Bases de Datos", pt: "Engenheiro Sênior de Suporte e Banco de Dados" },
        qa: { en: "Senior Support & Quality Engineer", es: "Ingeniero Senior de Soporte y Calidad", pt: "Engenheiro Sênior de Suporte e Qualidade" },
        sdet: { en: "Support & Database Systems Specialist", es: "Especialista de Sistemas y Bases de Datos", pt: "Especialista em Sistemas e Banco de Dados" },
        dev: { en: "Senior Support & Software Engineer", es: "Ingeniero Senior de Soporte y Software", pt: "Engenheiro Sênior de Suporte e Software" },
        backend: { en: "Database & Backend Support Engineer", es: "Ingeniero de Soporte Backend y Bases de Datos", pt: "Engenheiro de Suporte Backend e Banco de Dados" },
        fullstack: { en: "Senior Support & Application Engineer", es: "Ingeniero Senior de Soporte y Aplicaciones", pt: "Engenheiro Sênior de Suporte e Aplicações" }
      },
      location: "Cali, Colombia (Presencial / On-site)",
      modality: 'onsite',
      companyDescription: {
        en: "Enterprise software company developing SAI Open, an integrated ERP, accounting, and financial management software platform for mid-to-large businesses.",
        es: "Compañía de software empresarial desarrolladora de SAI Open, plataforma integrada de ERP, contabilidad y gestión financiera para medianas y grandes empresas.",
        pt: "Empresa desenvolvedora da plataforma ERP e contábil corporativa SAI Open."
      },
      dates: { en: "Sep 2015 – Jun 2016", es: "Sep 2015 – Jun 2016", pt: "Set 2015 – Jun 2016" },
      detail: {
        qa: {
          en: [
            "Diagnosed and resolved critical functional and database issues in the SAI Open ERP accounting platform, executing regression tests before release rollouts.",
            "Managed relational databases ensuring data integrity, optimized query execution, and executed seamless version migrations."
          ],
          es: [
            "Diagnosticó y corrigió incidencias funcionales y de base de datos en la plataforma ERP y contable SAI Open, ejecutando pruebas de regresión antes de cada actualización.",
            "Administró bases de datos relacionales garantizando integridad, optimización de consultas y migraciones de versión sin pérdida de información."
          ],
          pt: [
            "Diagnosticou e corrigiu falhas no ERP SAI Open com testes de regressão."
          ]
        },
        dev: {
          en: [
            "Configured, customized, and debugged modules in the SAI Open ERP platform to accommodate specialized client business rules and tax regulations.",
            "Managed enterprise database instances, generated complex SQL reporting scripts, and maintained high availability during client implementations."
          ],
          es: [
            "Configuró, adaptó y depuró módulos de la plataforma ERP SAI Open para satisfacer requerimientos específicos de clientes y regulaciones tributarias.",
            "Administró instancias de bases de datos empresariales, construyó consultas SQL avanzadas para reportes gerenciales y garantizó alta disponibilidad durante implementaciones."
          ],
          pt: [
            "Customizou módulos da plataforma ERP SAI Open e gerou relatórios avançados em SQL."
          ]
        }
      }
    }
  ],

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
