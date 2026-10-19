import type { Experience } from '../types';

export const masterExperiences: Experience[] = [
  {
    company: "Evertec",
    role: {
      combined: { 
        en: "Senior Automation Testing Specialist & SDET Lead", 
        es: "Especialista Senior en Automatización de Pruebas & Líder SDET", 
        pt: "Especialista Sênior em Automação de Testes e Líder SDET" 
      },
      sdet: { 
        en: "Lead Software Development Engineer in Test (SDET)", 
        es: "Líder de Desarrollo de Software en Pruebas (SDET)", 
        pt: "Líder de Desenvolvimento de Software em Teste (SDET)" 
      },
      qa: { 
        en: "Automation Testing Senior Specialist", 
        es: "Especialista Senior en Automatización de Pruebas", 
        pt: "Especialista Sênior em Automação de Testes" 
      },
      dev: { 
        en: "Senior Quality & Backend Engineer", 
        es: "Ingeniero Senior de Backend & Calidad", 
        pt: "Engenheiro Sênior de Backend e Qualidade" 
      },
      backend: { 
        en: "Senior Backend & Test Integration Engineer", 
        es: "Ingeniero Senior de Backend e Integración de Pruebas", 
        pt: "Engenheiro Sênior de Backend e Testes" 
      },
      fullstack: { 
        en: "Senior Full Stack & Quality Systems Engineer", 
        es: "Ingeniero Senior Full Stack & Sistemas de Calidad", 
        pt: "Engenheiro Sênior Full Stack e Qualidade" 
      }
    },
    location: "Bogotá, Colombia (Remoto / Remote)",
    modality: 'remote',
    companyDescription: {
      en: "Leading transactional technology and full-service payment processing company serving financial institutions and merchants across 26 countries in Latin America and the Caribbean.",
      es: "Compañía global líder en tecnología transaccional y procesamiento de pagos bancarios y comerciales en 26 países de Latinoamérica y el Caribe.",
      pt: "Empresa líder em tecnologia transacional e processamento de pagamentos para instituições financeiras na América Latina e Caribe."
    },
    dates: { 
      en: "Dec 2025 – Present", 
      es: "Dic 2025 – Presente", 
      pt: "Dez 2025 – Presente" 
    },
    technologies: [
      "Playwright",
      "TypeScript",
      "C#",
      ".NET Core",
      "Azure DevOps",
      "CI/CD Pipelines",
      "REST APIs",
      "Microservicios",
      "Docker",
      "JMeter",
      "SQL Server",
      "Postman",
      "SonarQube"
    ],
    detail: {
      combined: {
        es: [
          "Diseña, desarrolla y mantiene suites y frameworks empresariales de automatización de pruebas con Playwright y TypeScript para garantizar la confiabilidad en plataformas financieras de alta disponibilidad.",
          "Lidera iniciativas de ingeniería de calidad y arquitectura de pruebas en pasarelas de pago y motores de liquidación bancaria, integrando compuertas en Azure DevOps.",
          "Colabora estrechamente con equipos de Desarrollo, Arquitectura y DevOps para optimizar ciclos CI/CD, reduciendo los tiempos de regresión en más del 45% con cero defectos críticos en producción.",
          "Impulsa metodologías shift-left de calidad continua, integrando validación automatizada de contratos de APIs y pruebas de rendimiento continuo antes de cada paso a producción."
        ],
        en: [
          "Architects, designs, and maintains enterprise test automation frameworks using Playwright and TypeScript to guarantee reliability across high-availability financial systems.",
          "Leads quality engineering and testing architecture initiatives across core payment gateways and settlement engines, embedding automated quality gates in Azure DevOps.",
          "Partners closely with software development, architecture, and DevOps teams to optimize CI/CD cycles, cutting regression turnaround time by over 45% with zero critical defects.",
          "Drives shift-left continuous quality practices, integrating automated API contract validation and continuous performance benchmarking prior to production deployment."
        ],
        pt: [
          "Projeta e mantém frameworks corporativos de automação com Playwright e TypeScript para sistemas financeiros e bancários de alta disponibilidade.",
          "Lidera estratégias de automação e qualidade em gateways de pagamento, integrando gates de qualidade no pipeline Azure DevOps.",
          "Colabora com desenvolvimento e DevOps para otimizar entregas contínuas e reduzir tempo de testes de regressão em mais de 45%."
        ]
      },
      sdet: {
        es: [
          "Diseña la arquitectura de frameworks de automatización E2E y de APIs con Playwright y TypeScript, estandarizando patrones Page Object Model (POM) y librerías transversales.",
          "Implementa pruebas de contratos de APIs y validación de microservicios transaccionales con Mock Servers y assertions avanzadas en pipelines CI/CD.",
          "Desarrolla utilidades de testing en C#/.NET Core para simular transacciones financieras de alta concurrencia y validar consistencia en bases de datos SQL Server.",
          "Automatiza la ejecución de pruebas de carga y estrés con JMeter integradas a los pipelines de Azure DevOps para certificar latencias de respuesta bajo SLAs estrictos."
        ],
        en: [
          "Architects E2E and API test automation frameworks using Playwright and TypeScript, standardizing Page Object Model (POM) and shared core testing libraries.",
          "Implements API contract testing and transactional microservice validations with mock servers and schema assertions inside CI/CD pipelines.",
          "Develops custom testing harnesses in C#/.NET Core to simulate concurrent financial transactions and verify database consistency in SQL Server.",
          "Automates continuous performance and load tests using JMeter within Azure DevOps pipelines to enforce SLA latency thresholds."
        ],
        pt: [
          "Arquiteta frameworks de automação E2E e de APIs com Playwright e TypeScript, aplicando Page Object Model.",
          "Implementa testes de contratos e validação de microsserviços em pipelines CI/CD.",
          "Desenvolve simuladores em C#/.NET Core e testes de performance com JMeter para certificar SLAs."
        ]
      },
      qa: {
        es: [
          "Diseña, desarrolla y mantiene suites y frameworks empresariales de automatización de pruebas para garantizar la calidad del software en plataformas financieras y bancarias transaccionales de alta disponibilidad.",
          "Lidera iniciativas de automatización en pasarelas de pago y motores de liquidación, estableciendo buenas prácticas, estándares de regresión y gates de calidad integrados con CI/CD.",
          "Colabora estrechamente con los equipos de Desarrollo, Arquitectura y DevOps para optimizar los ciclos de entrega continua, reduciendo los tiempos de regresión en más del 45% y asegurando despliegues con cero incidentes críticos.",
          "Impulsa metodologías shift-left de calidad continua, integrando validación automatizada de contratos de APIs y pruebas de rendimiento antes de cada paso a producción."
        ],
        en: [
          "Architect, design, and maintain enterprise automated test suites and frameworks to guarantee software reliability across mission-critical, high-availability banking and financial processing engines.",
          "Lead test automation strategy across core payment gateways, establishing scalable patterns, regression governance, and CI/CD-integrated testing gates.",
          "Partner closely with Development, Architecture, and DevOps teams to optimize release cycles, reduce regression turnaround time by over 45%, and ensure defect-free deployments.",
          "Drive shift-left quality methodologies, integrating automated API contract validation and performance health checks prior to production deployment."
        ],
        pt: [
          "Projeta e mantém suites e frameworks corporativos de automação de testes para sistemas financeiros e bancários de alta disponibilidade.",
          "Lidera estratégias de automação e qualidade em gateways de pagamento, integrando gates de qualidade no pipeline CI/CD.",
          "Colabora com desenvolvimento e DevOps para otimizar entregas contínuas e reduzir tempo de testes de regressão."
        ]
      },
      dev: {
        es: [
          "Diseña y mantiene frameworks de automatización y compuertas de calidad integradas con CI/CD para servicios financieros transaccionales distribuidos, en estrecha colaboración con desarrollo y DevOps.",
          "Implementa suites de pruebas automatizadas de regresión, integración y contratos de APIs que reducen drásticamente el riesgo de fallas en producción y garantizan alta resiliencia.",
          "Colabora con los equipos de ingeniería backend en la estabilidad de APIs, estándares de observabilidad y mejora de la cobertura de código en microservicios transaccionales."
        ],
        en: [
          "Architect and maintain automated testing suites and CI/CD quality gates for distributed financial transactional services, partnering closely with software engineering and DevOps.",
          "Implement automated regression, integration, and contract test suites that drastically reduce production deployment risk and ensure zero downtime during high-load processing.",
          "Collaborate with backend engineering teams on API stability, logging standards, and code coverage improvements across transaction processing microservices."
        ],
        pt: [
          "Desenvolve e mantém frameworks de testes automatizados e pipelines de qualidade para serviços transacionais financeiros de alta escala.",
          "Aprimora a cobertura de testes e confiabilidade de APIs em cooperação com equipes de backend."
        ]
      },
      backend: {
        es: [
          "Diseña la integración de APIs RESTful seguras y servicios backend transaccionales con autenticación OAuth2 y encriptación de datos sensibles.",
          "Estructura arquitecturas de microservicios con C# / .NET Core, garantizando aislamiento de dominio, logs estructurados y métricas en tiempo real.",
          "Desarrolla mocks y virtualizadores de servicios bancarios externos para permitir pruebas de integración continuas y aisladas.",
          "Audita y afina la capa de persistencia en SQL Server mediante optimización de índices, particionamiento y transacciones atómicas ACID."
        ],
        en: [
          "Designs secure RESTful API integrations and transactional backend services leveraging OAuth2 and sensitive data encryption.",
          "Structures microservice architectures in C# / .NET Core, ensuring domain isolation, structured logging, and real-time operational telemetry.",
          "Develops mock services and service virtualization for external banking endpoints to facilitate continuous isolated integration testing.",
          "Audits and tunes the SQL Server persistence layer through index optimization, partitioning, and strict ACID atomic transactions."
        ],
        pt: [
          "Projeta integrações de APIs RESTful seguras e microsserviços transacionais em C# e .NET Core.",
          "Desenvolve mocks e virtualização de serviços para testes de integração isolados.",
          "Otimiza a camada de banco de dados SQL Server para máxima estabilidade."
        ]
      },
      fullstack: {
        es: [
          "Desarrolla paneles internos de monitoreo y herramientas de auditoría transaccional conectando frontends React/TypeScript con backends en .NET.",
          "Implementa validaciones de extremo a extremo entre interfaces web responsivas y endpoints RESTful, garantizando coherencia de datos.",
          "Configura pipelines de despliegue continuo con contenedores Docker en Azure DevOps para ambientes de pruebas y validación.",
          "Estandariza componentes reutilizables y librerías de cliente HTTP con interceptores de autenticación y manejo global de errores."
        ],
        en: [
          "Develops internal transactional monitoring dashboards and audit tools connecting React/TypeScript frontends with .NET backends.",
          "Implements end-to-end validations between responsive web interfaces and RESTful endpoints, ensuring seamless data consistency.",
          "Configures continuous deployment pipelines with Docker containers in Azure DevOps for staging and validation environments.",
          "Standardizes reusable UI components and HTTP client libraries with authentication interceptors and global error handling."
        ],
        pt: [
          "Desenvolve dashboards internos e ferramentas de auditoria conectando interfaces React/TypeScript a backends em .NET.",
          "Configura pipelines com contêineres Docker no Azure DevOps.",
          "Padroniza bibliotecas de componentes e tratamento global de erros."
        ]
      }
    }
  },
  {
    company: "Stori (Fintech Unicorn)",
    role: {
      combined: { 
        en: "Senior QA Automation Engineer & SDET Tech Lead", 
        es: "Ingeniero Senior de Automatización QA & Líder Técnico SDET", 
        pt: "Engenheiro Sênior de Automação QA & Líder Técnico SDET" 
      },
      sdet: { 
        en: "Software Development Engineer in Test (SDET)", 
        es: "Ingeniero de Desarrollo de Software en Pruebas (SDET)", 
        pt: "Engenheiro de Software em Teste (SDET)" 
      },
      qa: { 
        en: "Senior QA Automation Engineer", 
        es: "Ingeniero Senior de Automatización QA", 
        pt: "Engenheiro Sênior de Automação QA" 
      },
      dev: { 
        en: "Senior Software & Quality Engineer", 
        es: "Ingeniero Senior de Software & Calidad", 
        pt: "Engenheiro Sênior de Software e Qualidade" 
      },
      backend: { 
        en: "Backend Software Engineer in Test & API Architect", 
        es: "Ingeniero Backend en Pruebas & Arquitecto de APIs", 
        pt: "Engenheiro Backend em Teste e Arquiteto de APIs" 
      },
      fullstack: { 
        en: "Full Stack Quality & Software Automation Engineer", 
        es: "Ingeniero Full Stack de Calidad y Automatización de Software", 
        pt: "Engenheiro Full Stack de Qualidade e Automação de Software" 
      }
    },
    location: "México / Bogotá, Colombia (Híbrido / Hybrid)",
    modality: 'hybrid',
    companyDescription: {
      en: "Fast-growing Mexican unicorn fintech providing digital credit cards, deposit accounts, and micro-lending to millions of underserved users, with engineering hub in Bogotá.",
      es: "Empresa fintech unicornio mexicana de servicios financieros digitales, tarjetas de crédito y captación de depósitos con millones de usuarios y hub tecnológico en Bogotá.",
      pt: "Fintech unicórnio mexicana que oferece cartões de crédito e serviços financeiros digitais, com hub tecnológico em Bogotá."
    },
    dates: { 
      en: "Jun 2023 – Aug 2025", 
      es: "Jun 2023 – Ago 2025", 
      pt: "Jun 2023 – Ago 2025" 
    },
    technologies: [
      "Playwright",
      "TypeScript",
      "Python",
      "AWS",
      "Docker",
      "Postman",
      "JMeter",
      "Jira",
      "GitHub Actions",
      "PostgreSQL",
      "Microservicios",
      "TestRail"
    ],
    detail: {
      combined: {
        es: [
          "Diseñó y ejecutó estrategias integrales de pruebas automatizadas con Playwright y TypeScript para productos de banca digital y tarjetas de crédito de alto crecimiento.",
          "Automatizó flujos financieros neurálgicos (evaluación crediticia, autorización de transacciones, onboarding KYC), simulando carga y validando funcionalidad antes de cada release.",
          "Lideró la identificación, documentación y análisis de causa raíz de defectos en Jira, integrando métricas en GitHub Actions para fortalecer las suites de regresión continua.",
          "Participó proactivamente en la revisión de especificaciones y diseño técnico con equipos de producto e ingeniería, anticipando fallas de arquitectura antes de iniciar el desarrollo.",
          "Evolucionó procesos manuales hacia pipelines de automatización continua, alcanzando más del 75% de cobertura automatizada en los flujos más críticos."
        ],
        en: [
          "Designed and executed comprehensive automated test strategies using Playwright and TypeScript for high-growth digital banking and credit card products.",
          "Automated critical financial workflows (credit assessment, transaction authorization, KYC onboarding), validating backend performance and edge cases before releases.",
          "Owned defect triage and root-cause analysis in Jira, integrating metrics into GitHub Actions to continuously strengthen regression suites.",
          "Partnered with product and engineering teams during technical refinement and architectural design phases to eliminate systemic bugs prior to code implementation.",
          "Transformed manual QA workflows into continuous automation pipelines, achieving over 75% automated regression coverage across mission-critical paths."
        ],
        pt: [
          "Projetou e executou estratégias de automação para produtos de cartão de crédito e contas digitais da fintech.",
          "Automatizou fluxos críticos (crédito, autorização de transações, KYC) e elevou a cobertura para mais de 75%.",
          "Trabalhou em conjunto com equipes de produto e engenharia para prevenir falhas desde a fase de especificação."
        ]
      },
      sdet: {
        es: [
          "Construyó el framework central de pruebas de microservicios con TypeScript y Python, validando contratos OpenAPI/Swagger y respuestas asíncronas en AWS.",
          "Implementó generadores automáticos de datos de prueba y mock servers para aislar las pruebas de autorización bancaria y pasarelas de pago externas.",
          "Ejecutó simulaciones de carga y estrés con JMeter y k6 para verificar la resiliencia de la API de crédito ante picos de concurrencia de más de 5,000 req/seg.",
          "Integró suites de regresión automatizadas en GitHub Actions que se ejecutan automáticamente en cada Pull Request, bloqueando despliegues con regresiones."
        ],
        en: [
          "Built the core microservices test framework with TypeScript and Python, validating OpenAPI/Swagger contracts and asynchronous event responses on AWS.",
          "Implemented automated test data fixtures and mock servers to isolate banking authorization workflows from external payment gateway dependencies.",
          "Executed load and stress benchmarks with JMeter and k6 to verify credit API resilience under peak traffic exceeding 5,000 req/sec.",
          "Integrated automated regression suites into GitHub Actions triggered per pull request, automatically gatekeeping deployments against functional regressions."
        ],
        pt: [
          "Construiu o framework de testes de microsserviços com TypeScript e Python em nuvem AWS.",
          "Executou testes de estresse com JMeter e k6 para suportar alta concorrência.",
          "Integrou automação contínua no GitHub Actions para validação de pull requests."
        ]
      },
      qa: {
        es: [
          "Diseñó y ejecutó estrategias integrales de pruebas automatizadas para productos de banca digital y tarjetas de crédito de alto crecimiento, alineando la cobertura con el riesgo del negocio y normativas fintech.",
          "Automatizó flujos financieros neurálgicos (evaluación crediticia, autorización de transacciones, onboarding KYC), simulando carga y validando funcionalidad antes de cada release.",
          "Lideró la identificación, documentación y análisis de causa raíz de defectos en Jira, analizando datos históricos de calidad para fortalecer continuamente las suites de regresión.",
          "Participó proactivamente en la revisión de especificaciones y diseño técnico con equipos de producto e ingeniería, anticipando fallas de arquitectura antes de iniciar el desarrollo.",
          "Evolucionó procesos manuales hacia pipelines de automatización continua, alcanzando más del 75% de cobertura automatizada en los flujos más críticos."
        ],
        en: [
          "Engineered end-to-end automation test strategies and suites for high-growth digital banking and credit card products, aligning test coverage with regulatory compliance and business risk.",
          "Automated core financial workflows (credit evaluation, transactional authorization, KYC, user onboarding), validating backend performance and edge cases prior to bi-weekly releases.",
          "Owned defect triage and root-cause analysis in Jira, leveraging historical defect metrics to strengthen test coverage and prevent defect re-emergence.",
          "Collaborated proactively with product managers, tech leads, and mobile/backend developers during refinement and design phases to prevent defects before code was written.",
          "Transformed manual QA workflows into scalable automation pipelines, achieving over 75% automated regression coverage across critical paths."
        ],
        pt: [
          "Projetou e executou estratégias de automação para produtos de cartão de crédito e contas digitais da fintech.",
          "Automatizou fluxos críticos (crédito, autorização de transações, KYC) e elevou a cobertura para mais de 75%.",
          "Trabalhou em conjunto com equipes de produto e engenharia para prevenir falhas desde a fase de especificação."
        ]
      },
      dev: {
        es: [
          "Construyó suites de pruebas automatizadas y simuladores para microservicios fintech, validando la integridad transaccional del backend ante alta concurrencia.",
          "Colaboró con equipos de producto, backend y plataforma, revisando especificaciones técnicas y contratos de APIs para eliminar errores antes del despliegue.",
          "Integró pipelines de pruebas automáticas en el flujo de entrega continua, incrementando la confianza del equipo y acelerando los despliegues a producción."
        ],
        en: [
          "Built automated test suites and simulation harnesses for fintech microservices, validating backend transactional integrity under high concurrent user load.",
          "Partnered with product, backend, and platform teams, reviewing technical specifications and API schemas to eliminate potential architectural bugs.",
          "Integrated automated testing pipelines into delivery workflows, boosting team confidence and cutting deployment cycle duration."
        ],
        pt: [
          "Construiu testes automatizados e simuladores para microsserviços fintech sob alta concorrência.",
          "Apoiou revisões de contratos de APIs e integração de testes no pipeline de entrega."
        ]
      },
      backend: {
        es: [
          "Audito contratos de microservicios backend basados en Python y PostgreSQL, asegurando idempotencia transaccional y prevención de doble gasto.",
          "Diseñó herramientas de validación de base de datos para verificar transacciones financieras complejas y conciliaciones contables en PostgreSQL.",
          "Colaboró en la definición de contratos RESTful y eventos asíncronos en AWS (SQS/SNS), mitigando fallas de sincronización entre servicios.",
          "Supervisó la observabilidad de los microservicios backend analizando logs de errores y métricas de latencia en Datadog y CloudWatch."
        ],
        en: [
          "Audited backend microservice contracts built on Python and PostgreSQL, ensuring transaction idempotency and double-spend prevention.",
          "Designed database validation scripts to verify complex financial transactions and ledger reconciliations in PostgreSQL.",
          "Collaborated on RESTful contract specifications and asynchronous event messaging on AWS (SQS/SNS), resolving service sync bottlenecks.",
          "Supervised backend microservices observability by analyzing error traces and latency metrics in Datadog and AWS CloudWatch."
        ],
        pt: [
          "Auditou microsserviços backend em Python e PostgreSQL com foco em idempotência transacional.",
          "Validou mensageria assíncrona na AWS (SQS/SNS) e reconciliação contábil.",
          "Monitorou observabilidade e métricas de latência com CloudWatch e Datadog."
        ]
      },
      fullstack: {
        es: [
          "Supervisó la integración end-to-end entre aplicaciones móviles/web y los servicios backend de onboarding y gestión de tarjetas de crédito.",
          "Desarrolló harnesses de prueba para validar flujos de usuario completos desde el registro en el cliente hasta la aprobación del límite de crédito.",
          "Colaboró con desarrolladores frontend y backend en la estandarización de contratos de errores y respuestas para mejorar la experiencia de usuario.",
          "Automatizó pruebas de regresión visual y funcional en interfaces responsive y web views móviles."
        ],
        en: [
          "Supervised end-to-end integration between mobile/web client apps and backend services for customer onboarding and credit card lifecycle.",
          "Developed test harnesses to validate complete customer journeys from mobile registration through credit limit approval.",
          "Collaborated with frontend and backend developers to standardize error models and responses, enhancing client-side user experience.",
          "Automated visual and functional regression checks across responsive web interfaces and mobile webviews."
        ],
        pt: [
          "Supervisionou a integração de ponta a ponta entre aplicativos móveis/web e serviços backend da fintech.",
          "Desenvolveu testes para jornadas completas de onboarding e concessão de crédito.",
          "Automatizou validações de regressão funcional e visual em interfaces responsivas."
        ]
      }
    }
  },
  {
    company: "GMSTEK, LLC",
    role: {
      combined: { 
        en: "Full Stack Software Engineer & QA Automation Tester", 
        es: "Ingeniero de Software Full Stack & QA Automation Tester", 
        pt: "Engenheiro de Software Full Stack e QA Tester" 
      },
      sdet: { 
        en: "Software Development Engineer in Test (SDET)", 
        es: "Ingeniero de Desarrollo de Software en Pruebas (SDET)", 
        pt: "Engenheiro de Software em Teste (SDET)" 
      },
      qa: { 
        en: "Development & QA Specialist", 
        es: "Especialista en Desarrollo & Aseguramiento QA", 
        pt: "Especialista em Desenvolvimento e QA" 
      },
      dev: { 
        en: "Full Stack Developer & QA Engineer", 
        es: "Desarrollador Full Stack & Ingeniero QA", 
        pt: "Desenvolvedor Full Stack e Engenheiro QA" 
      },
      backend: { 
        en: "Backend Developer & API Testing Specialist", 
        es: "Desarrollador Backend & Especialista en Pruebas de API", 
        pt: "Desenvolvedor Backend e Especialista em Testes de API" 
      },
      fullstack: { 
        en: "Full Stack Developer & Quality Systems Specialist", 
        es: "Desarrollador Full Stack & Especialista en Sistemas de Calidad", 
        pt: "Desenvolvedor Full Stack e Especialista em Qualidade" 
      }
    },
    location: "Palmetto Bay, Florida, USA (Remoto / Remote)",
    modality: 'remote',
    companyDescription: {
      en: "US-based software engineering and technological innovation company located in Florida, delivering custom enterprise software solutions and cloud systems globally 100% remotely.",
      es: "Empresa estadounidense de ingeniería de software e innovación tecnológica con sede en Florida, prestando servicios de desarrollo y cloud a clientes globales en modalidad 100% remota.",
      pt: "Empresa de tecnologia sediada na Flórida, EUA, prestando serviços de desenvolvimento corporativo e nuvem 100% remotamente."
    },
    dates: { 
      en: "Jul 2022 – Jun 2023", 
      es: "Jul 2022 – Jun 2023", 
      pt: "Jul 2022 – Jun 2023" 
    },
    technologies: [
      "C#",
      ".NET Core",
      "React",
      "TypeScript",
      "Python",
      "Selenium WebDriver",
      "Robot Framework",
      "PostgreSQL",
      "Docker",
      "AWS",
      "Git",
      "Agile/Scrum"
    ],
    detail: {
      combined: {
        es: [
          "Diseñó y ejecutó soluciones de software full stack y estrategias de automatización de pruebas para clientes corporativos de Estados Unidos 100% en remoto.",
          "Construyó componentes front-end en React y APIs en .NET Core / Python, garantizando estándares de código limpio y cobertura con Selenium y Robot Framework.",
          "Identificó, categorizó y resolvió defectos funcionales y de performance en aplicaciones web empresariales, reduciendo incidencias en producción.",
          "Colaboró en equipos ágiles distribuidos internacionalmente, participando en revisiones de arquitectura, sprints de desarrollo y entregas continuas."
        ],
        en: [
          "Architected and delivered full-stack software solutions and automated testing frameworks for US enterprise clients in a 100% remote model.",
          "Engineered front-end components with React and backend APIs with .NET Core and Python, enforcing clean code standards and automated test coverage via Selenium and Robot Framework.",
          "Identified, categorized, and resolved functional and performance bottlenecks across enterprise web platforms, significantly mitigating post-release bugs.",
          "Collaborated in internationally distributed Agile squads, leading architecture code reviews, sprint cycles, and automated deployments."
        ],
        pt: [
          "Desenvolveu soluções full stack e estratégias de automação para clientes nos EUA em modelo 100% remoto.",
          "Construiu interfaces em React e APIs em .NET Core com automação em Selenium e Robot Framework.",
          "Colaborou em equipes ágeis internacionais com entregas contínuas de alta qualidade."
        ]
      },
      sdet: {
        es: [
          "Implementó frameworks de pruebas automatizadas con Selenium WebDriver y Robot Framework en Python para aplicaciones web multinivel.",
          "Diseñó suites de pruebas automatizadas cross-browser y de integración de APIs RESTful, reduciendo el tiempo de validación manual en más del 60%.",
          "Desarrolló scripts de verificación de bases de datos PostgreSQL para asegurar integridad referencial tras la ejecución de pruebas transaccionales.",
          "Configuró pipelines de ejecución continua en Docker para aislar y paralelizar la ejecución de suites de regresión automatizadas."
        ],
        en: [
          "Implemented automated testing frameworks with Selenium WebDriver and Python Robot Framework for multi-tiered web applications.",
          "Designed cross-browser and RESTful API integration automated test suites, shrinking manual regression overhead by over 60%.",
          "Engineered database validation scripts in PostgreSQL to ensure referential integrity following transactional batch test runs.",
          "Configured containerized execution environments in Docker to parallelize and isolate regression test suite runs."
        ],
        pt: [
          "Implementou frameworks de testes com Selenium WebDriver e Robot Framework em Python.",
          "Criou testes de APIs RESTful e validações automatizadas em bancos de dados PostgreSQL.",
          "Configurou ambientes de testes em contêineres Docker para execução paralela."
        ]
      },
      qa: {
        es: [
          "Elaboró y ejecutó estrategias de pruebas manuales y automatizadas rigurosas para clientes corporativos en EE.UU., validando funcionalidad, rendimiento y compatibilidad multiplataforma.",
          "Identificó, categorizó y documentó defectos mediante sistemas formales de bug tracking, manteniendo una base de datos actualizada que redujo los tiempos de corrección.",
          "Analizó requerimientos de negocio y especificaciones de software para formular recomendaciones de diseño que evitaron retrabajos en producción.",
          "Impulsó la transición hacia la automatización de pruebas, desarrollando scripts de regresión automática que redujeron significativamente el tiempo de validación manual."
        ],
        en: [
          "Devised and executed rigorous manual and automated test strategies for US enterprise clients, validating functionality, performance, and cross-browser responsiveness.",
          "Identified, categorized, and tracked software bugs using structured defect tracking systems, maintaining a verified defect repository that accelerated resolution times.",
          "Analyzed client business requirements and technical specifications to deliver actionable design recommendations that reduced downstream production bugs.",
          "Championed test automation adoption, implementing automated regression suites that significantly decreased manual testing overhead."
        ],
        pt: [
          "Desenvolveu e executou estratégias de testes manuais e automatizados para clientes corporativos nos EUA em regime 100% remoto.",
          "Manteve rastreamento estruturado de bugs e criou scripts de regressão automatizados."
        ]
      },
      dev: {
        es: [
          "Contribuyó al desarrollo full stack y corrección de incidencias en aplicaciones web empresariales, mejorando la estabilidad y experiencia de usuario para clientes internacionales.",
          "Ejecutó pruebas automatizadas y manuales mientras aportaba recomendaciones de diseño técnico que evitaron fallas en producción.",
          "Colaboró estrechamente con equipos multidisciplinarios remotos bajo metodología ágil, garantizando entregas puntuales y de alta calidad."
        ],
        en: [
          "Contributed to full-stack web application development and bug fixing, enhancing platform stability and user experience for international clients.",
          "Executed automated and manual testing while providing architectural feedback that minimized regressions across client applications.",
          "Collaborated with remote cross-functional engineering teams in an agile environment, ensuring on-time delivery of client deliverables."
        ],
        pt: [
          "Atuou no desenvolvimento full stack e correção de falhas em aplicações web corporativas para clientes internacionais.",
          "Realizou testes automatizados e participou de cerimônias ágeis com equipes remotas."
        ]
      },
      backend: {
        es: [
          "Desarrolló y depuró microservicios y endpoints RESTful en C# / .NET Core y Python para procesamiento de datos empresariales.",
          "Optimizó consultas complejas y estructuras de tablas en PostgreSQL, reduciendo tiempos de respuesta de endpoints críticos.",
          "Implementó autenticación basada en tokens JWT y validaciones rigurosas de esquemas de entrada para proteger las APIs contra datos maliciosos.",
          "Diseñó pruebas unitarias y de integración que garantizaron la estabilidad de la lógica de negocio antes de la entrega a clientes."
        ],
        en: [
          "Engineered and debugged RESTful endpoints and microservices in C# / .NET Core and Python for enterprise data processing.",
          "Optimized complex queries and schema structures in PostgreSQL, accelerating response times for critical client-facing APIs.",
          "Implemented JWT token-based authentication and strict payload schema validations to safeguard endpoints against malformed requests.",
          "Authored unit and integration test suites validating business logic stability prior to client delivery cycles."
        ],
        pt: [
          "Desenvolveu microserviços e endpoints RESTful em C# / .NET Core e Python.",
          "Otimizou consultas no PostgreSQL e implementou autenticação segura com JWT.",
          "Garantia de estabilidade através de testes unitários e de integração."
        ]
      },
      fullstack: {
        es: [
          "Construyó interfaces dinámicas y modulares con React y TypeScript, integradas con servicios backend en .NET Core.",
          "Aseguró compatibilidad cross-browser y diseño responsivo para usuarios corporativos en diversas plataformas y dispositivos.",
          "Estructuró la gestión de estado global y optimizó la renderización en el cliente para mantener fluidez con grandes volúmenes de datos.",
          "Colaboró en la integración y despliegue continuo de aplicaciones completas alojadas en infraestructura cloud AWS."
        ],
        en: [
          "Built modular, dynamic user interfaces with React and TypeScript integrated with robust .NET Core backend services.",
          "Ensured responsive design and cross-browser compatibility across multiple enterprise devices and operating systems.",
          "Structured global client state management and optimized component rendering performance when handling large datasets.",
          "Collaborated in full-stack continuous integration and deployment pipelines hosted on AWS cloud infrastructure."
        ],
        pt: [
          "Construiu interfaces modulares em React e TypeScript integradas a backends em .NET Core.",
          "Garantiu design responsivo e alta performance de renderização no cliente.",
          "Atuou no deploy e integração contínua na nuvem AWS."
        ]
      }
    }
  },
  {
    company: "COLSOF S.A.S",
    role: {
      combined: { 
        en: "Specialist Technology Engineer & Project Leader", 
        es: "Ingeniero Especialista & Líder de Proyectos Tecnológicos", 
        pt: "Engenheiro Especialista e Líder de Projetos" 
      },
      sdet: { 
        en: "Specialist Engineer & Automation Advisor", 
        es: "Ingeniero Especialista & Asesor de Automatización", 
        pt: "Engenheiro Especialista em Automação" 
      },
      qa: { 
        en: "Specialist Engineer & Quality Lead", 
        es: "Ingeniero Especialista & Líder de Calidad", 
        pt: "Engenheiro Especialista e Líder de Qualidade" 
      },
      dev: { 
        en: "Specialist Technology Engineer", 
        es: "Ingeniero Especialista de Tecnología", 
        pt: "Engenheiro Especialista em Tecnologia" 
      },
      backend: { 
        en: "Specialist Systems & Backend Engineer", 
        es: "Ingeniero Especialista de Sistemas y Backend", 
        pt: "Engenheiro Especialista em Sistemas e Backend" 
      },
      fullstack: { 
        en: "Specialist Solutions Engineer", 
        es: "Ingeniero Especialista de Soluciones", 
        pt: "Engenheiro Especialista em Soluções" 
      }
    },
    location: "Bogotá, Colombia (Híbrido / Hybrid)",
    modality: 'hybrid',
    companyDescription: {
      en: "Leading IT technology solutions integrator in Colombia with 30+ years in the market, specializing in enterprise infrastructure, cloud data centers, and digital transformation.",
      es: "Compañía líder en integración de soluciones de TI en Colombia con más de 30 años en el mercado, especializada en infraestructura empresarial, centros de datos y transformación digital.",
      pt: "Empresa líder em integração de soluções de infraestrutura de TI e centros de dados corporativos na Colômbia."
    },
    dates: { 
      en: "Aug 2021 – Jun 2022", 
      es: "Ago 2021 – Jun 2022", 
      pt: "Ago 2021 – Jun 2022" 
    },
    technologies: [
      "Power BI",
      "DAX",
      "Python",
      "SQL Server",
      "PMI/PMBOK",
      "Agile/Scrum",
      "Windows Server",
      "Linux",
      "ITIL",
      "Jira"
    ],
    detail: {
      combined: {
        es: [
          "Dirigió proyectos de implementación tecnológica y aseguramiento de calidad bajo estándares PMI y marcos ágiles (Scrum), administrando alcance, cronograma y presupuestos corporativos.",
          "Diseñó y construyó tableros de gestión y KPIs automatizados en Power BI y DAX, conectando bases de datos SQL Server para la toma de decisiones gerenciales en tiempo real.",
          "Definió y ejecutó planes de transformación técnica e innovación, coordinando recursos de infraestructura TI, desarrollo y calidad para cumplir con estrictos SLAs.",
          "Lideró equipos multidisciplinarios de ingenieros en despliegues corporativos, asegurando pruebas de aceptación de usuario (UAT) y auditorías técnicas rigurosas."
        ],
        en: [
          "Directed enterprise technology implementation projects and quality assurance under PMI standards and Agile frameworks, managing scope, budget, and milestones.",
          "Architected and built automated operational KPI dashboards using Power BI and DAX, connecting SQL Server databases for real-time executive decision-making.",
          "Defined and executed technical innovation roadmaps, coordinating IT infrastructure, development, and QA resources to meet stringent enterprise SLAs.",
          "Led cross-functional engineering teams in mission-critical deployments, ensuring thorough user acceptance testing (UAT) and technical compliance audits."
        ],
        pt: [
          "Gerenciou projetos tecnológicos sob padrões PMI e metodologias ágeis com foco em escopo, cronograma e custo.",
          "Construiu painéis de indicadores gerenciais no Power BI integrados ao SQL Server.",
          "Liderou equipes multidisciplinares e testes formais de aceitação (UAT)."
        ]
      },
      sdet: {
        es: [
          "Estableció criterios de aceptación técnicos y protocolos de pruebas automatizadas para validar la entrega de sistemas de infraestructura y software empresarial.",
          "Desarrolló scripts en Python y SQL para la extracción, validación y reconciliación automática de datos en migraciones tecnológicas complejas.",
          "Supervisó las fases de pruebas de carga y rendimiento en centros de datos de clientes corporativos antes del paso a producción.",
          "Estandarizó listas de verificación técnica y compuertas de calidad que redujeron incidentes post-implementación en más del 40%."
        ],
        en: [
          "Established technical acceptance criteria and automated verification protocols for enterprise infrastructure and software project handovers.",
          "Authored Python and SQL scripts for automated data extraction, validation, and reconciliation during high-risk technological migrations.",
          "Supervised load and performance validation phases across enterprise client data centers prior to production rollouts.",
          "Standardized technical verification checklists and quality gates, decreasing post-deployment incidents by over 40%."
        ],
        pt: [
          "Definiu critérios técnicos de aceitação e automação de validações em infraestrutura corporativa.",
          "Desenvolveu scripts em Python e SQL para reconciliação automática de dados.",
          "Supervisionou testes de carga e desempenho em data centers."
        ]
      },
      qa: {
        es: [
          "Gestionó proyectos tecnológicos e iniciativas de calidad bajo estándares PMI y marcos ágiles, monitoreando entregables y estabilidad mediante tableros de control en Power BI.",
          "Lideró equipos multidisciplinarios de ingeniería en implementaciones tecnológicas corporativas, garantizando pruebas de aceptación rigurosas y cumplimiento de SLAs."
        ],
        en: [
          "Managed technology and quality initiatives under PMI standards and agile frameworks, tracking deliverables and system reliability via Power BI management dashboards.",
          "Led cross-functional engineering teams in enterprise technology deployments, ensuring rigorous acceptance testing and adherence to SLAs."
        ],
        pt: [
          "Gerenciou projetos tecnológicos sob padrões PMI e metodologias ágeis com dashboards no Power BI.",
          "Liderou testes de aceitação e garantia de conformidade técnica."
        ]
      },
      dev: {
        es: [
          "Dirigió proyectos de implementación tecnológica empresarial bajo estándares PMI y metodologías ágiles, gestionando alcance, cronograma y presupuesto.",
          "Diseñó y construyó tableros de gestión y KPIs automatizados en Power BI, facilitando la toma de decisiones estratégicas basadas en datos a nivel directivo y técnico.",
          "Definió y ejecutó planes de innovación tecnológica, coordinando recursos de infraestructura TI, soporte y arquitectura para cumplir las metas organizacionales."
        ],
        en: [
          "Directed enterprise technology implementation projects following PMI standards and agile methodologies, managing scope, budget, and delivery milestones.",
          "Designed and built automated KPI management dashboards in Power BI, enabling executives and technical teams to make data-driven decisions.",
          "Defined technological innovation roadmaps and supervised technical architecture, coordinating administrative, financial, and IT infrastructure resources."
        ],
        pt: [
          "Liderou projetos de inovação tecnológica corporativa e implementação de infraestrutura sob padrões PMI.",
          "Construiu painéis de gestão e indicadores automatizados no Power BI."
        ]
      },
      backend: {
        es: [
          "Modeló esquemas de datos relacionales y almacenes de datos analíticos en SQL Server para consolidar información operativa de múltiples sistemas.",
          "Diseñó procesos ETL y consultas analíticas avanzadas para transformar datos transaccionales en modelos estrella optimizados para reporting.",
          "Supervisó la seguridad, integridad referencial y políticas de backup en bases de datos corporativas durante implementaciones tecnológicas.",
          "Automatizó tareas de mantenimiento y auditoría de servidores mediante scripts en PowerShell y Bash."
        ],
        en: [
          "Modeled relational schemas and analytical data repositories in SQL Server to consolidate operational data across disparate enterprise systems.",
          "Engineered ETL pipelines and advanced SQL queries transforming transactional logs into star-schema models optimized for BI reporting.",
          "Supervised security policies, referential integrity, and disaster recovery backup protocols during enterprise database rollouts.",
          "Automated routine server administration and health checks using PowerShell and Bash scripts."
        ],
        pt: [
          "Modelou esquemas relacionais no SQL Server para consolidação de dados operacionais.",
          "Desenvolveu processos de ETL e consultas analíticas para relatórios gerenciais.",
          "Supervisionou segurança e rotinas de backup em bancos de dados corporativos."
        ]
      },
      fullstack: {
        es: [
          "Integró herramientas de reporte analítico e interfaces de gestión basadas en web con los servicios de base de datos corporativos.",
          "Diseñó interfaces intuitivas de visualización de datos en Power BI para líderes de negocio, facilitando el seguimiento de proyectos complejos.",
          "Coordinó la integración técnica entre soluciones de software a la medida y sistemas legados de clientes corporativos.",
          "Garantizó la compatibilidad entre plataformas web, aplicaciones de escritorio y servicios de backend."
        ],
        en: [
          "Integrated web-based analytical dashboards and management tools with enterprise database services.",
          "Designed intuitive data visualization interfaces in Power BI for executive leadership, streamlining complex project governance.",
          "Coordinated technical integration between custom software applications and legacy client enterprise systems.",
          "Guaranteed seamless interoperability across web platforms, desktop tools, and backend services."
        ],
        pt: [
          "Integrou painéis analíticos web com bancos de dados corporativos.",
          "Desenvolveu interfaces visuais no Power BI para acompanhamento de projetos estratégicos.",
          "Assegurou interoperabilidade técnica entre softwares novos e sistemas legados."
        ]
      }
    }
  },
  {
    company: "ECOPROYECT CONSULTORÍA SAS",
    role: {
      combined: { 
        en: "Senior J2EE / Java Cloud Developer & Technical Advisor", 
        es: "Desarrollador Senior J2EE / Java Cloud & Asesor Técnico", 
        pt: "Desenvolvedor Sênior Java / Cloud e Assessor Técnico" 
      },
      sdet: { 
        en: "Senior Java & SDET Integration Engineer", 
        es: "Ingeniero Senior Java & Integración SDET", 
        pt: "Engenheiro Sênior Java e Testes" 
      },
      qa: { 
        en: "Senior Java Developer & QA Automation", 
        es: "Desarrollador Senior Java & QA Automation", 
        pt: "Desarrollador Senior Java e QA" 
      },
      dev: { 
        en: "Senior J2EE Developer", 
        es: "Desarrollador Senior J2EE", 
        pt: "Desenvolvedor Sênior J2EE" 
      },
      backend: { 
        en: "Senior Java Spring Boot / AWS Backend Engineer", 
        es: "Ingeniero Backend Senior Java Spring Boot / AWS", 
        pt: "Engenheiro Backend Sênior Java Spring Boot / AWS" 
      },
      fullstack: { 
        en: "Senior Java Full Stack Developer", 
        es: "Desarrollador Full Stack Senior Java", 
        pt: "Desenvolvedor Full Stack Sênior Java" 
      }
    },
    location: "Cali, Colombia (Remoto / Remote)",
    modality: 'remote',
    companyDescription: {
      en: "Boutique software engineering consultancy specializing in enterprise Java EE architecture, Spring Boot microservices, and Amazon Web Services (AWS) cloud infrastructure.",
      es: "Firma de consultoría de software especializada en arquitectura empresarial Java EE, microservicios Spring Boot e infraestructura cloud en Amazon Web Services (AWS).",
      pt: "Consultoria especializada em arquitetura de software empresarial Java EE e soluções em nuvem AWS."
    },
    dates: { 
      en: "Nov 2021 – Feb 2022", 
      es: "Nov 2021 – Feb 2022", 
      pt: "Nov 2021 – Fev 2022" 
    },
    technologies: [
      "Java",
      "Spring Boot",
      "J2EE",
      "AWS (EC2, RDS, S3)",
      "JUnit",
      "Mockito",
      "MySQL",
      "PostgreSQL",
      "Docker",
      "REST APIs",
      "Maven"
    ],
    detail: {
      combined: {
        es: [
          "Diseñó, desarrolló y desplegó microservicios backend robustos en Java y Spring Boot alojados en infraestructura AWS (EC2, RDS, S3).",
          "Lideró el ciclo completo de desarrollo de software (SDLC) e implementó pruebas unitarias y de integración exhaustivas con JUnit y Mockito.",
          "Brindó mentoría técnica al equipo de desarrollo en Clean Architecture, patrones de diseño de software y optimización de bases de datos relacionales MySQL/PostgreSQL.",
          "Estructuró contenedores Docker para estandarizar los ambientes de desarrollo y agilizar los despliegues en la nube."
        ],
        en: [
          "Architected, developed, and deployed resilient backend microservices using Java and Spring Boot on AWS cloud infrastructure (EC2, RDS, S3).",
          "Led full software development lifecycle (SDLC) and authored comprehensive unit and integration test suites with JUnit and Mockito.",
          "Mentored engineering peers on Clean Architecture, enterprise software design patterns, and relational database tuning in MySQL and PostgreSQL.",
          "Configured Docker containerization to standardize development runtimes and streamline cloud deployment cycles."
        ],
        pt: [
          "Projetou e desenvolveu microsserviços em Java Spring Boot com implantação na nuvem AWS (EC2, RDS).",
          "Cobriu o ciclo completo com testes automatizados em JUnit e Mockito.",
          "Mentoria técnica em Clean Architecture e padronização com Docker."
        ]
      },
      sdet: {
        es: [
          "Diseñó la estrategia de pruebas automatizadas unitarias y de integración para microservicios Spring Boot, logrando más del 80% de cobertura de código.",
          "Implementó mocks y stubs con Mockito para aislar componentes de negocio y simular respuestas de servicios externos en AWS.",
          "Validó contratos de APIs RESTful mediante pruebas automatizadas con RestAssured y assertions JSON en pipelines de Maven.",
          "Efectuó auditorías de calidad de código con SonarQube para detectar vulnerabilidades, code smells y deuda técnica antes del merge."
        ],
        en: [
          "Designed automated unit and integration testing strategy for Spring Boot microservices, achieving over 80% automated code coverage.",
          "Engineered mocks and stubs using Mockito to isolate domain business components and simulate external AWS cloud service responses.",
          "Validated RESTful API schemas via automated contract testing with RestAssured and JSON schema assertions in Maven build lifecycles.",
          "Conducted code quality gates using SonarQube to eliminate security hotspots, code smells, and technical debt prior to branch merges."
        ],
        pt: [
          "Projetou testes unitários e de integração em Spring Boot com JUnit e Mockito, superando 80% de cobertura.",
          "Validou contratos de APIs RESTful com automação no build Maven.",
          "Implementou gates de qualidade com SonarQube para redução de dívida técnica."
        ]
      },
      qa: {
        es: [
          "Lideró el desarrollo y pruebas automatizadas en Java/Spring Boot para soluciones corporativas, implementando pruebas unitarias exhaustivas (JUnit, Mockito) y de integración.",
          "Realizó revisiones de código y mentoría técnica a desarrolladores junior, elevando los estándares de calidad e integrando pruebas automáticas en ambientes AWS."
        ],
        en: [
          "Led Java/Spring Boot development and test automation for enterprise client solutions, implementing rigorous unit (JUnit, Mockito) and integration test suites.",
          "Conducted comprehensive code reviews and mentored junior developers, establishing high code-quality benchmarks and automated testing in AWS environments."
        ],
        pt: [
          "Liderou desenvolvimento e automação de testes em Java Spring Boot com JUnit e Mockito.",
          "Realizou revisões de código e mentoria técnica para elevar os padrões de qualidade."
        ]
      },
      dev: {
        es: [
          "Diseñó, desarrolló y desplegó microservicios backend robustos en Java y Spring Boot, colaborando con el equipo de arquitectura en diseños técnicos altamente escalables.",
          "Lideró el ciclo completo de desarrollo de software (SDLC), desde el diseño conceptual hasta el despliegue cloud en AWS (EC2, RDS, S3) y mantenimiento continuo.",
          "Ejecutó pruebas unitarias y de integración automatizadas para garantizar estabilidad y cero regresiones antes de cada despliegue con DevOps.",
          "Brindó mentoría al equipo en Clean Architecture, patrones de diseño y optimización de consultas en bases de datos relacionales MySQL/PostgreSQL."
        ],
        en: [
          "Architected, developed, and deployed robust backend microservices in Java and Spring Boot, partnering with architecture leads on scalable technical designs.",
          "Led the full software development lifecycle (SDLC), from conceptual design through AWS cloud deployment (EC2, RDS, S3) and continuous maintenance.",
          "Executed automated unit and integration tests to ensure code reliability and backward compatibility prior to continuous deployment releases.",
          "Mentored engineering peers on Clean Architecture, design patterns, and efficient relational database querying in MySQL/PostgreSQL."
        ],
        pt: [
          "Projetou e desenvolveu microsserviços em Java Spring Boot com implantação na nuvem AWS (EC2, RDS).",
          "Cobriu o ciclo de vida completo de desenvolvimento com foco em Clean Architecture e alta disponibilidade."
        ]
      },
      backend: {
        es: [
          "Construyó microservicios RESTful basados en Spring Boot, implementando persistencia con Spring Data JPA y Hibernate sobre PostgreSQL/MySQL.",
          "Configuró infraestructura de computación y almacenamiento en AWS (instancias EC2, buckets S3 y bases de datos gestionadas RDS).",
          "Optimizó consultas SQL complejas, índices y transaccionalidad para evitar sobrecarga en bases de datos relacionales bajo demanda concurrente.",
          "Diseñó endpoints seguros con autenticación JWT y control de acceso basado en roles (RBAC) con Spring Security."
        ],
        en: [
          "Built Spring Boot RESTful microservices leveraging Spring Data JPA and Hibernate for data access across PostgreSQL and MySQL databases.",
          "Configured cloud compute and storage resources on AWS (EC2 instances, S3 storage buckets, and managed RDS databases).",
          "Optimized complex SQL queries, indexes, and transaction boundaries to eliminate database bottlenecks during concurrent query execution.",
          "Designed secure REST endpoints implementing JWT authentication and Role-Based Access Control (RBAC) via Spring Security."
        ],
        pt: [
          "Construiu microsserviços em Spring Boot com Spring Data JPA sobre PostgreSQL e MySQL.",
          "Configurou recursos em nuvem na AWS (EC2, S3, RDS).",
          "Implementou segurança robusta com JWT e controle de acesso via Spring Security."
        ]
      },
      fullstack: {
        es: [
          "Conectó servicios RESTful en Java Spring Boot con aplicaciones cliente web, asegurando consistencia en los formatos de datos JSON.",
          "Implementó compresión de payloads y cabeceras CORS para habilitar consumo seguro de APIs desde clientes web modernos.",
          "Gestionó el ciclo de despliegue continuo de aplicaciones full stack paquetizadas en contenedores Docker hacia servidores AWS.",
          "Colaboró en la documentación técnica interactiva de endpoints mediante Swagger/OpenAPI UI para facilitar la integración."
        ],
        en: [
          "Connected Java Spring Boot RESTful backend services with web client applications, enforcing clean JSON data modeling.",
          "Implemented payload compression and CORS policy headers to enable secure consumption from modern web single-page apps.",
          "Managed continuous deployment workflows for full-stack applications packaged inside Docker containers onto AWS hosts.",
          "Authored interactive Swagger/OpenAPI documentation, facilitating seamless developer integration."
        ],
        pt: [
          "Integrou APIs em Java Spring Boot com aplicações web clientes.",
          "Configurou CORS, compressão de dados e conteinerização em Docker.",
          "Documentou APIs interativamente com Swagger/OpenAPI."
        ]
      }
    }
  },
  {
    company: "GreenSQA S.A.",
    role: {
      combined: { 
        en: "Software Test Engineer → Junior Integrated Service Professional", 
        es: "Ingeniero de Pruebas de Software → Profesional Junior de Servicios Integrados", 
        pt: "Engenheiro de Testes de Software" 
      },
      sdet: { 
        en: "Test Automation Engineer & SDET Specialist", 
        es: "Ingeniero de Automatización de Pruebas & Especialista SDET", 
        pt: "Engenheiro de Automação de Testes e Especialista SDET" 
      },
      qa: { 
        en: "Software Test Engineer → Junior Integrated Service Professional", 
        es: "Ingeniero de Pruebas de Software → Profesional Junior de Servicios Integrados", 
        pt: "Engenheiro de Testes de Software" 
      },
      dev: { 
        en: "Software Test & Automation Developer", 
        es: "Desarrollador de Pruebas & Automatización", 
        pt: "Desenvolvedor de Testes e Automação" 
      },
      backend: { 
        en: "Backend & API Test Engineer", 
        es: "Ingeniero de Pruebas Backend & APIs", 
        pt: "Engenheiro de Testes Backend e APIs" 
      },
      fullstack: { 
        en: "Integrated QA & Test Automation Specialist", 
        es: "Especialista Integrado de QA y Automatización", 
        pt: "Especialista em QA e Automação" 
      }
    },
    location: "Cali, Colombia (Remoto / Remote)",
    modality: 'remote',
    companyDescription: {
      en: "Latin American benchmark company specializing exclusively in software quality assurance (SQA), digital testing consulting, and automated quality governance.",
      es: "Compañía referente en Latinoamérica especializada exclusivamente en aseguramiento de calidad de software (SQA), consultoría de pruebas digitales y automatización continua.",
      pt: "Empresa líder na América Latina especializada em garantia de qualidade de software (SQA) e automação de testes contínuos."
    },
    dates: { 
      en: "Feb 2020 – Aug 2021", 
      es: "Feb 2020 – Ago 2021", 
      pt: "Fev 2020 – Ago 2021" 
    },
    technologies: [
      "Selenium WebDriver",
      "Java",
      "Robot Framework",
      "Python",
      "Postman",
      "JMeter",
      "Azure DevOps",
      "SQL Server",
      "Oracle",
      "ISTQB",
      "Git"
    ],
    detail: {
      combined: {
        es: [
          "Planeó, estimó y lideró servicios de aseguramiento de calidad y automatización de pruebas para múltiples clientes corporativos en banca, retail y telecomunicaciones.",
          "Diseñó y construyó robots y suites de automatización con Selenium WebDriver, Robot Framework y Java, acelerando la ejecución de pruebas de regresión en un 70%.",
          "Reportó defectos con trazabilidad completa y análisis de causa raíz, facilitando la rápida resolución por parte de los equipos de desarrollo.",
          "Implementó pruebas funcionales, de APIs con Postman y de rendimiento con JMeter, garantizando la estabilidad técnica antes de cada pase a producción."
        ],
        en: [
          "Planned, scoped, and executed enterprise quality assurance and test automation consulting for diverse banking, retail, and telecom clients.",
          "Architected and deployed automated testing robots and suites using Selenium WebDriver, Robot Framework, and Java, cutting regression cycles by 70%.",
          "Documented defects with comprehensive root-cause analysis and exact reproduction steps, collaborating directly with client engineering teams.",
          "Executed functional, RESTful API testing with Postman, and performance benchmarking with JMeter, ensuring system stability prior to releases."
        ],
        pt: [
          "Planejou e liderou serviços de garantia de qualidade e automação para clientes corporativos.",
          "Desenvolveu robôs de teste com Selenium WebDriver e Robot Framework, reduzindo tempos em 70%.",
          "Executou testes funcionais, de APIs e performance com JMeter."
        ]
      },
      sdet: {
        es: [
          "Desarrolló frameworks de automatización de pruebas modulares y mantenibles utilizando Selenium WebDriver con Java y Robot Framework en Python.",
          "Creó librerías de keywords personalizadas para automatizar flujos complejos de negocio en aplicaciones web y de escritorio corporativas.",
          "Automatizó validaciones de bases de datos mediante consultas directas en SQL Server y Oracle para certificar la consistencia de datos transaccionales.",
          "Integró ejecuciones desatendidas de pruebas automatizadas en pipelines de Azure DevOps con generación automática de reportes HTML."
        ],
        en: [
          "Developed modular, maintainable test automation frameworks utilizing Selenium WebDriver in Java and Robot Framework in Python.",
          "Authored custom keyword libraries to automate complex multi-step business transactions across enterprise web and desktop platforms.",
          "Automated database backend validations through direct SQL assertions across SQL Server and Oracle databases.",
          "Integrated unattended automated regression test runs into Azure DevOps pipelines with automated HTML report generation."
        ],
        pt: [
          "Desenvolveu frameworks de automação com Selenium WebDriver em Java e Robot Framework em Python.",
          "Criou bibliotecas customizadas e validações automatizadas em bancos de dados SQL Server e Oracle.",
          "Integrou testes contínuos em pipelines Azure DevOps com relatórios detalhados."
        ]
      },
      qa: {
        es: [
          "Planeó, estimó y dimensionó servicios de pruebas formales para múltiples proyectos corporativos de clientes, diseñando, ejecutando y documentando pruebas funcionales, no funcionales y de regresión.",
          "Diseñó y construyó robots de automatización de pruebas para agilizar ejecuciones repetitivas, maximizando la cobertura y reduciendo los tiempos de validación.",
          "Reportó no conformidades y defectos con pasos detallados de reproducción en herramientas de seguimiento, coordinando su cierre efectivo con los equipos de desarrollo del cliente.",
          "Identificó riesgos críticos de calidad y elaboró planes de contingencia, administrando los activos de prueba bajo estrictos controles de gestión de configuración."
        ],
        en: [
          "Planned, scoped, and estimated formal testing services for diverse enterprise client projects, designing, executing, and reporting on functional, regression, and non-functional tests.",
          "Designed and deployed automation robots to streamline repetitive testing execution, boosting operational throughput while reducing human error.",
          "Logged defects and non-conformities with thorough reproduction steps in designated tracking tools, working directly with client engineering teams on resolutions.",
          "Identified project testing risks and authored mitigation continuity plans, managing testing assets under rigorous configuration-management protocols."
        ],
        pt: [
          "Planejou e executou testes funcionais, de regressão e automatizados para clientes corporativos.",
          "Desenvolveu robôs de automação para acelerar ciclos de testes e reportou defeitos estruturados."
        ]
      },
      dev: {
        es: [
          "Desarrolló scripts de automatización de pruebas y ejecutó protocolos de pruebas funcionales y no funcionales para aplicaciones empresariales.",
          "Aplicó técnicas formales de diseño de pruebas y gestión de configuración para maximizar la cobertura y mitigar riesgos en cada entrega."
        ],
        en: [
          "Developed test automation scripts and executed functional and non-functional test protocols for enterprise software applications.",
          "Applied formal test design methodologies and configuration management practices to maximize test coverage and mitigate release risks."
        ],
        pt: [
          "Desenvolveu scripts de automação de testes e executou protocolos de testes funcionais e técnicos."
        ]
      },
      backend: {
        es: [
          "Diseñó colecciones automatizadas en Postman con scripts en JavaScript para validar esquemas de APIs RESTful y códigos de respuesta HTTP.",
          "Ejecutó validaciones masivas de integridad y consistencia de datos ejecutando scripts SQL sobre Oracle y SQL Server.",
          "Simuló peticiones concurrentes a microservicios backend utilizando JMeter para medir tiempos de latencia y cuellos de botella.",
          "Colaboró en la depuración de errores de backend identificando fallas en payloads y mapeos de datos entre servicios."
        ],
        en: [
          "Engineered automated Postman test suites with JavaScript assertions to validate RESTful API schema contracts and HTTP responses.",
          "Executed high-volume database integrity validations running complex SQL queries on Oracle and SQL Server databases.",
          "Simulated concurrent backend microservice workloads using JMeter to identify response latency and server resource limits.",
          "Assisted engineering teams in backend error debugging by identifying payload anomalies and data transformation mismatches."
        ],
        pt: [
          "Projetou testes de APIs no Postman com scripts em JavaScript para validação de esquemas REST.",
          "Executou testes de carga com JMeter e validações diretas em SQL Server e Oracle.",
          "Apoiou na depuração de incidentes de backend em cooperação com desenvolvedores."
        ]
      },
      fullstack: {
        es: [
          "Ejecutó pruebas de extremo a extremo cubriendo tanto la experiencia de usuario en interfaces web como la persistencia en base de datos.",
          "Verificó la accesibilidad, compatibilidad entre navegadores y comportamiento responsive en portales web de clientes.",
          "Automatizó flujos de usuario completos integrando validaciones visuales en frontend con validaciones de registros en backend.",
          "Participó en comités técnicos de entrega certificando la preparación para producción de aplicaciones corporativas."
        ],
        en: [
          "Executed end-to-end testing cycles spanning user experience across web interfaces through backend database persistence.",
          "Verified accessibility compliance, cross-browser compatibility, and responsive design across client web portals.",
          "Automated full user journeys by combining front-end UI validations with corresponding backend database state verifications.",
          "Participated in client release governance boards, certifying enterprise applications for production readiness."
        ],
        pt: [
          "Executou testes ponta a ponta cobrindo interfaces web e persistência em banco de dados.",
          "Validou compatibilidade entre navegadores e design responsivo.",
          "Automatizou fluxos de ponta a ponta integrando interface e backend."
        ]
      }
    }
  },
  {
    company: "Busscar de Colombia",
    role: {
      combined: { 
        en: "Senior Software Developer & Quality Lead (C# / .NET / Databases)", 
        es: "Desarrollador Senior de Software & Líder de Calidad (C# / .NET / Bases de Datos)", 
        pt: "Desenvolvedor Sênior de Software e Líder de Qualidade" 
      },
      sdet: { 
        en: "Senior Software Developer in Test", 
        es: "Desarrollador Senior de Software en Pruebas", 
        pt: "Desenvolvedor Sênior em Teste" 
      },
      qa: { 
        en: "Senior Software Developer & Quality Assurance", 
        es: "Desarrollador Senior de Software & Aseguramiento de Calidad", 
        pt: "Desenvolvedor Sênior e QA" 
      },
      dev: { 
        en: "Senior Software Developer", 
        es: "Desarrollador Senior de Software", 
        pt: "Desenvolvedor Sênior de Software" 
      },
      backend: { 
        en: "Senior .NET & Database Developer", 
        es: "Desarrollador Senior .NET & Bases de Datos", 
        pt: "Desenvolvedor Sênior .NET e Banco de Dados" 
      },
      fullstack: { 
        en: "Senior .NET Full Stack Developer", 
        es: "Desarrollador Full Stack Senior .NET", 
        pt: "Desenvolvedor Full Stack Sênior .NET" 
      }
    },
    location: "Pereira, Colombia (Presencial / On-site)",
    modality: 'onsite',
    companyDescription: {
      en: "Major automotive manufacturer of mass transit and intercity bus coachworks in Latin America, engineering advanced industrial and transportation systems.",
      es: "Importante fabricante automotriz de carrocerías de transporte masivo e intermunicipal en Latinoamérica, con procesos avanzados de ingeniería y manufactura.",
      pt: "Grande fabricante de carrocerias automotivas e de transporte público na América Latina."
    },
    dates: { 
      en: "Sep 2017 – Feb 2020", 
      es: "Sep 2017 – Feb 2020", 
      pt: "Set 2017 – Fev 2020" 
    },
    technologies: [
      "C#",
      ".NET Framework",
      "VB.NET",
      "SQL Server",
      "Oracle",
      "MySQL",
      "Sistemas PDM",
      "TFS/Azure DevOps",
      "Unit Testing"
    ],
    detail: {
      combined: {
        es: [
          "Arquitectó y desarrolló sistemas a medida de gestión de datos de producto (PDM) en C# y VB.NET, integrados fluidamente con bases de datos MySQL, Oracle y SQL Server.",
          "Lideró revisiones técnicas de código, protocolos de pruebas y estándares de calidad técnica en el proyecto corporativo SINERGIA para plantas de manufactura.",
          "Optimizó procedimientos almacenados, vistas indexadas y consultas complejas en SQL Server, mejorando la velocidad de generación de listas de materiales (BOM) en más del 50%.",
          "Brindó capacitación y mentoría técnica a desarrolladores junior sobre buenas prácticas de programación orientada a objetos y diseño de bases de datos."
        ],
        en: [
          "Architected and developed custom Product Data Management (PDM) systems in C# and VB.NET, integrated with MySQL, Oracle, and SQL Server databases.",
          "Spearheaded technical code reviews, testing protocols, and software quality standards across the flagship enterprise SINERGIA project for automotive manufacturing plants.",
          "Optimized stored procedures, indexed views, and complex SQL Server queries, accelerating Bill of Materials (BOM) generation speed by over 50%.",
          "Mentored junior developers on object-oriented clean code principles, database indexing strategies, and maintainable software architecture."
        ],
        pt: [
          "Projetou e desenvolveu sistemas PDM em C# e VB.NET integrados com SQL Server, Oracle e MySQL.",
          "Liderou revisões de código e padrões de qualidade no projeto SINERGIA.",
          "Otimizou consultas SQL e procedimentos armazenados, acelerando a geração de listas de materiais em mais de 50%."
        ]
      },
      sdet: {
        es: [
          "Diseñó pruebas unitarias y de integración para validar la lógica matemática de cálculo de estructuras y despiece de materiales en sistemas PDM.",
          "Automatizó validaciones de consistencia de datos entre el sistema PDM y el ERP de manufactura para evitar discrepancias de inventario.",
          "Creó suites de pruebas de regresión técnica para certificar nuevas versiones antes de su puesta en producción en las plantas de ensamblaje.",
          "Estableció directrices de control de calidad de código en Team Foundation Server (TFS) con revisiones de pares obligatorias."
        ],
        en: [
          "Designed unit and integration test suites validating structural engineering calculations and material breakdown logic within PDM software.",
          "Automated data consistency checks between the PDM engineering system and manufacturing ERP modules to prevent inventory discrepancies.",
          "Authored regression test suites certifying system builds prior to live deployment across vehicle assembly plants.",
          "Enforced code quality gates and peer review policies inside Team Foundation Server (TFS)."
        ],
        pt: [
          "Projetou testes unitários e de integração para validação de regras de engenharia em software PDM.",
          "Automatizou verificações de consistência entre sistemas de engenharia e ERP.",
          "Garantia de qualidade e revisões de código obrigatórias no Team Foundation Server."
        ]
      },
      qa: {
        es: [
          "Diseñó y desarrolló sistemas de gestión de datos de producto (PDM) en C# y VB.NET integrados con bases de datos MySQL, Oracle y SQL Server.",
          "Lideró revisiones exhaustivas de código, protocolos de validación de datos y estándares de calidad técnica en el proyecto corporativo SINERGIA."
        ],
        en: [
          "Engineered and maintained Product Data Management (PDM) systems in C# and VB.NET, integrated with MySQL, Oracle, and SQL Server databases.",
          "Led comprehensive code reviews, data validation protocols, and technical quality standards across the flagship SINERGIA enterprise project."
        ],
        pt: [
          "Desenvolveu e manteve sistemas PDM em C# e VB.NET integrados com SQL Server, Oracle e MySQL.",
          "Liderou revisões de código e padrões de qualidade no projeto SINERGIA."
        ]
      },
      dev: {
        es: [
          "Diseñó y desarrolló sistemas de gestión de datos de producto (PDM) a la medida en C# y VB.NET, integrando fluidamente bases de datos MySQL, Oracle y SQL Server.",
          "Analizó, desarrolló y brindó soporte continuo a aplicaciones críticas de manufactura e ingeniería para múltiples áreas del negocio bajo el proyecto SINERGIA.",
          "Lideró revisiones técnicas de código y capacitó a desarrolladores junior, promoviendo principios de código limpio, buenas prácticas de indexación en bases de datos y transferencia técnica.",
          "Colaboró con líderes de ingeniería y producción para levantar especificaciones de requerimientos, definir cronogramas y asegurar entregas de alta confiabilidad."
        ],
        en: [
          "Architected and engineered custom Product Data Management (PDM) software systems using C# and VB.NET, integrating tightly with MySQL, Oracle, and SQL Server databases.",
          "Analyzed, developed, and maintained core manufacturing and engineering applications for multiple business units under the SINERGIA enterprise project.",
          "Spearheaded technical code reviews and mentored junior programmers, instilling clean code principles, database indexing best practices, and knowledge sharing.",
          "Collaborated across engineering and manufacturing stakeholders to gather requirements, define project milestones, and guarantee timely software deliveries."
        ],
        pt: [
          "Projetou e desenvolveu sistemas PDM em C# e VB.NET integrados com bancos de dados relacionais corporativos.",
          "Atuou na sustentação e evolução de softwares de engenharia no projeto SINERGIA."
        ]
      },
      backend: {
        es: [
          "Diseñó y administró la arquitectura de base de datos en SQL Server para el almacenamiento de miles de piezas de ensamble y árboles de producto.",
          "Escribió procedimientos almacenados y triggers avanzados con T-SQL garantizando transaccionalidad atómica durante modificaciones concurrentes de ingeniería.",
          "Implementó interfaces de integración entre bases de datos heterogéneas (MySQL, Oracle, SQL Server) para sincronización de órdenes de trabajo.",
          "Optimizó planes de ejecución de consultas SQL complejas para reducir tiempos de procesamiento en reportes de costos de producción."
        ],
        en: [
          "Engineered and maintained SQL Server database architecture storing complex multi-level product breakdown trees and component assemblies.",
          "Authored mission-critical stored procedures and triggers in T-SQL ensuring ACID compliance during concurrent engineering revisions.",
          "Built data integration interfaces connecting heterogeneous databases (MySQL, Oracle, SQL Server) for work order synchronization.",
          "Tuned SQL execution plans, index fragmentation, and lock escalations for high-throughput production cost reporting."
        ],
        pt: [
          "Projetou a arquitetura de banco de dados SQL Server para estruturas complexas de produtos automotivos.",
          "Desenvolveu procedimentos armazenados avançados em T-SQL com integridade transacional ACID.",
          "Integrou bancos de dados heterogêneos para sincronização de ordens de fabricação."
        ]
      },
      fullstack: {
        es: [
          "Desarrolló interfaces gráficas ricas para ingeniería y producción utilizando .NET Windows Forms y componentes personalizados.",
          "Implementó validaciones en tiempo real en la capa de interfaz de usuario para prevenir la introducción de datos erróneos de diseño.",
          "Conectó la interfaz de usuario con servicios backend de base de datos mediante capas de acceso a datos desacopladas.",
          "Brindó soporte técnico de tercer nivel y evolución continua a las herramientas de software utilizadas en las líneas de ensamble."
        ],
        en: [
          "Developed rich desktop graphical user interfaces for automotive engineering and production floors using .NET Windows Forms.",
          "Implemented client-side real-time validations preventing erroneous engineering parameters and design constraint violations.",
          "Connected UI layers to database backend services through decoupled, clean data access abstraction layers.",
          "Provided tier-3 software maintenance, enhancements, and user training across assembly plant workstations."
        ],
        pt: [
          "Desenvolveu interfaces gráficas para chão de fábrica e engenharia em .NET.",
          "Implementou validações em tempo real e desacoplamento de acesso a dados.",
          "Sustentou ferramentas de software essenciais para as linhas de montagem."
        ]
      }
    }
  },
  {
    company: "EMCALI EICE ESP",
    role: {
      combined: { 
        en: "Technology Solutions & Testing Analyst", 
        es: "Analista de Soluciones Tecnológicas y Pruebas", 
        pt: "Analista de Soluções Tecnológicas e Testes" 
      },
      sdet: { 
        en: "Systems & Quality Automation Analyst", 
        es: "Analista de Sistemas y Automatización de Calidad", 
        pt: "Analista de Sistemas e Automação de Qualidade" 
      },
      qa: { 
        en: "Technology Solutions & Testing Analyst", 
        es: "Analista de Soluciones Tecnológicas y Pruebas", 
        pt: "Analista de Soluções e Testes" 
      },
      dev: { 
        en: "Technology Solutions Analyst", 
        es: "Analista de Soluciones Tecnológicas", 
        pt: "Analista de Soluções Tecnológicas" 
      },
      backend: { 
        en: "Backend & Systems Analyst", 
        es: "Analista de Backend y Sistemas", 
        pt: "Analista de Backend e Sistemas" 
      },
      fullstack: { 
        en: "Application Solutions Analyst", 
        es: "Analista de Soluciones de Aplicaciones", 
        pt: "Analista de Aplicações" 
      }
    },
    location: "Cali, Colombia (Presencial / On-site)",
    modality: 'onsite',
    companyDescription: {
      en: "Major state-owned public utilities enterprise providing telecommunications, energy, water, and sewage infrastructure to over 2 million citizens.",
      es: "Gran empresa estatal de servicios públicos domiciliarios prestadora de telecomunicaciones, energía, acueducto y alcantarillado para más de 2 millones de usuarios.",
      pt: "Grande empresa estatal de serviços públicos e infraestrutura de telecomunicações e energia."
    },
    dates: { 
      en: "Jun 2016 – Sep 2017", 
      es: "Jun 2016 – Sep 2017", 
      pt: "Jun 2016 – Set 2017" 
    },
    technologies: [
      "PHP",
      "ASP.NET",
      "SQL Server",
      "Oracle",
      "JavaScript",
      "HTML5/CSS3",
      "Linux",
      "Nginx",
      "ITIL"
    ],
    detail: {
      combined: {
        es: [
          "Diseñó, desarrolló y mantuvo aplicaciones de software internas para el área de telecomunicaciones y atención al usuario.",
          "Ejecutó protocolos rigurosos de pruebas de funcionalidad, seguridad y estabilidad en plataformas de misión crítica.",
          "Diagnosticó, clasificó y solucionó incidentes de tercer nivel a nivel de código y base de datos con altos índices de resolución.",
          "Automatizó tareas repetitivas de verificación de disponibilidad de servicios de telecomunicaciones."
        ],
        en: [
          "Designed, built, and maintained internal software applications supporting telecommunications operations and customer care workflows.",
          "Executed rigorous functionality, security, and stability test protocols across mission-critical public utility systems.",
          "Investigated and diagnosed tier-3 software and database incidents, implementing permanent code-level fixes and patches.",
          "Automated routine service availability verification routines across enterprise telecom infrastructure."
        ],
        pt: [
          "Desenvolveu e sustentou aplicações para o setor de telecomunicações e atendimento.",
          "Executou testes de funcionalidade, segurança e estabilidade.",
          "Solucionou incidentes de terceiro nível em código e banco de dados."
        ]
      },
      sdet: {
        es: [
          "Diseñó scripts automatizados para monitorear la disponibilidad y respuesta de portales web y servicios de telecomunicaciones.",
          "Validó la consistencia de datos de facturación y consumo entre sistemas mediante consultas automatizadas en SQL Server y Oracle.",
          "Estructuró casos de prueba de estrés para evaluar el comportamiento de los sistemas de atención al usuario en fechas límite de pago.",
          "Documentó procedimientos de prueba técnica para homologar nuevas versiones de software antes de su puesta en producción."
        ],
        en: [
          "Authored automated monitoring scripts verifying uptime and response health across telecom web tools.",
          "Validated billing and usage data consistency between billing systems through automated queries in SQL Server and Oracle.",
          "Engineered stress test scenarios assessing customer portal stability during high-volume payment due dates.",
          "Authored technical testing procedures certifying software releases prior to production rollouts."
        ],
        pt: [
          "Desenvolveu scripts para monitoramento contínuo de aplicações e portais web.",
          "Validou consistência de dados em SQL Server e Oracle.",
          "Estruturou testes de estresse para períodos de alto tráfego."
        ]
      },
      qa: {
        es: [
          "Realizó pruebas exhaustivas de funcionalidad, seguridad y estabilidad en aplicaciones internas de telecomunicaciones y herramientas de atención al cliente.",
          "Clasificó e investigó incidencias en producción, validando las correcciones para garantizar alta disponibilidad y satisfacción de los usuarios."
        ],
        en: [
          "Conducted comprehensive functional, security, and stability testing across internal telecommunications platforms and client service tools.",
          "Classified and investigated production incidents, validating fixes to ensure high service availability and customer satisfaction."
        ],
        pt: [
          "Executou testes de funcionalidade e estabilidade em aplicações internas de telecomunicações.",
          "Diagnosticou e validou correções de incidentes em produção."
        ]
      },
      dev: {
        es: [
          "Diseñó, desarrolló y mantuvo aplicaciones internas críticas para el área de telecomunicaciones, ampliando funcionalidades y optimizando el rendimiento.",
          "Diagnosticó, clasificó y solucionó incidentes de software de tercer nivel, implementando soluciones definitivas a nivel de código y base de datos.",
          "Analizó requerimientos operativos para construir soluciones tecnológicas que optimizaron los flujos de trabajo de la empresa."
        ],
        en: [
          "Designed, developed, and maintained core internal software applications for the telecommunications business unit, extending functionality and optimizing UX.",
          "Diagnosed, classified, and resolved Tier-3 software incidents, providing permanent code-level fixes and database corrections.",
          "Analyzed operational requirements to architect software features addressing mission-critical business workflows."
        ],
        pt: [
          "Desenvolveu e sustentou aplicações para o setor de telecomunicações.",
          "Solucionou incidentes técnicos complexos e implementou melhorias de sistema."
        ]
      },
      backend: {
        es: [
          "Desarrolló lógica de negocio en backend con PHP y ASP.NET para la integración de servicios de telecomunicaciones.",
          "Optimizó consultas SQL sobre grandes volúmenes de registros en bases de datos Oracle y SQL Server.",
          "Implementó validaciones de seguridad para proteger bases de datos contra inyecciones SQL y accesos no autorizados.",
          "Creó procedimientos almacenados para la generación automatizada de reportes regulatorios del sector de servicios públicos."
        ],
        en: [
          "Engineered backend business logic in PHP and ASP.NET supporting telecommunications service provisioning.",
          "Optimized complex SQL queries across high-volume transaction datasets in Oracle and SQL Server.",
          "Implemented database security hardening to defend against SQL injection and unauthorized data access.",
          "Authored database stored procedures producing automated regulatory compliance reports for public utility oversight boards."
        ],
        pt: [
          "Desenvolveu lógica de backend em PHP e ASP.NET para serviços de telecomunicações.",
          "Otimizou consultas SQL sobre grandes volumes no Oracle e SQL Server.",
          "Criou procedimentos armazenados para relatórios regulatórios."
        ]
      },
      fullstack: {
        es: [
          "Construyó portales web internos con HTML5, CSS3, JavaScript y PHP para la gestión de solicitudes técnicas.",
          "Optimizó la usabilidad de las herramientas internas para permitir que el personal de mesa de ayuda atendiera llamadas más rápido.",
          "Conectó formularios de atención al cliente con bases de datos relacionales asegurando validación de datos en cliente y servidor.",
          "Desplegó y mantuvo aplicaciones en servidores web Linux y Windows Server."
        ],
        en: [
          "Built internal web portals utilizing HTML5, CSS3, JavaScript, and PHP to manage technical service requests.",
          "Enhanced application UX enabling customer service representatives to process telecom support tickets faster.",
          "Connected front-end intake forms to relational database backends, ensuring validation on both client and server layers.",
          "Deployed and maintained web applications on Linux and Windows Server environments."
        ],
        pt: [
          "Construiu portais web com HTML5, CSS3, JavaScript e PHP.",
          "Melhorou a usabilidade das ferramentas internas de atendimento.",
          "Implantou e sustentou sistemas em ambientes Linux e Windows Server."
        ]
      }
    }
  },
  {
    company: "System Factory SAS",
    role: {
      combined: { 
        en: "Technology Solutions Leader & Lead Developer", 
        es: "Líder de Soluciones Tecnológicas & Desarrollador Principal", 
        pt: "Líder de Soluções Tecnológicas e Desenvolvedor Principal" 
      },
      sdet: { 
        en: "Lead Software & Automation Engineer", 
        es: "Ingeniero Líder de Software y Automatización", 
        pt: "Líder de Software e Automação" 
      },
      qa: { 
        en: "Technology Solutions & QA Lead", 
        es: "Líder de Soluciones Tecnológicas y QA", 
        pt: "Líder de Soluções e QA" 
      },
      dev: { 
        en: "Technology Solutions Leader", 
        es: "Líder de Soluciones Tecnológicas", 
        pt: "Líder de Soluções Tecnológicas" 
      },
      backend: { 
        en: "Lead Backend Developer (ASP.NET / PHP)", 
        es: "Líder Desarrollador Backend (ASP.NET / PHP)", 
        pt: "Líder Backend (ASP.NET / PHP)" 
      },
      fullstack: { 
        en: "Lead Full Stack Developer", 
        es: "Líder Desarrollador Full Stack", 
        pt: "Líder Full Stack" 
      }
    },
    location: "Cali, Colombia (Presencial / On-site)",
    modality: 'onsite',
    companyDescription: {
      en: "Software development and digital solutions company delivering custom web and enterprise database applications.",
      es: "Empresa de desarrollo de software y soluciones digitales especializada en aplicaciones web corporativas y bases de datos.",
      pt: "Fábrica de software especializada em soluções web e bancos de dados corporativos."
    },
    dates: { 
      en: "Jun 2016 – Sep 2016", 
      es: "Jun 2016 – Sep 2016", 
      pt: "Jun 2016 – Set 2016" 
    },
    technologies: [
      "ASP.NET Core",
      "C#",
      "PHP",
      "MySQL",
      "SQL Server",
      "JavaScript",
      "CSS3",
      "APIs RESTful",
      "Git"
    ],
    detail: {
      combined: {
        es: [
          "Lideró la arquitectura, desarrollo y control de calidad de aplicaciones web empresariales en ASP.NET Core, PHP y bases de datos relacionales.",
          "Estableció estándares de codificación limpia, control de versiones con Git y protocolos de pruebas para entregar soluciones sin defectos.",
          "Supervisó a desarrolladores en la implementación de APIs RESTful y optimización de bases de datos MySQL y SQL Server.",
          "Garantizó entregas puntuales y satisfacción de clientes cumpliendo con los requerimientos técnicos y funcionales especificados."
        ],
        en: [
          "Led architecture, development, and quality governance for enterprise web applications built on ASP.NET Core, PHP, and relational databases.",
          "Standardized clean coding guidelines, Git version control practices, and testing protocols to deliver defect-free client solutions.",
          "Supervised developers in RESTful API development and database optimization across MySQL and SQL Server.",
          "Ensured on-time delivery milestones and client satisfaction, meeting all technical and functional specifications."
        ],
        pt: [
          "Liderou arquitetura e desenvolvimento de aplicações web em ASP.NET Core e PHP.",
          "Definiu padrões de código limpo e controle de qualidade.",
          "Supervisionou desenvolvedores na entrega pontual de soluções corporativas."
        ]
      },
      sdet: {
        es: [
          "Diseñó planes de prueba formales y pruebas de integración para validar la comunicación entre clientes web y servicios backend.",
          "Implementó verificaciones automatizadas de consistencia de base de datos para prevenir pérdida o duplicidad de registros.",
          "Coordinó revisiones de código enfocadas en prevención temprana de vulnerabilidades de seguridad y bugs de lógica.",
          "Validó el rendimiento y tiempos de carga de las aplicaciones web antes del despliegue en producción."
        ],
        en: [
          "Authored formal test plans and integration testing strategies validating client-server communication.",
          "Implemented automated database consistency checks to prevent record loss and data duplication.",
          "Coordinated code reviews focused on early detection of logic errors and security vulnerabilities.",
          "Validated web application load times and performance prior to production client hosting."
        ],
        pt: [
          "Elaborou planos formais de testes e validações de integração cliente-servidor.",
          "Implementou verificações de consistência em banco de dados.",
          "Conduziu revisões técnicas de código focadas em qualidade."
        ]
      },
      qa: {
        es: [
          "Supervisó la calidad del código y lideró protocolos de pruebas para soluciones web construidas en ASP.NET Core y PHP, garantizando consistencia en bases de datos y seguridad.",
          "Optimizó flujos de trabajo de ingeniería para acelerar los ciclos de entrega manteniendo altos estándares de calidad."
        ],
        en: [
          "Supervised code quality and led software testing protocols for web solutions built on ASP.NET Core and PHP, guaranteeing database consistency and secure data access.",
          "Optimized engineering workflows to accelerate delivery cycles while upholding high release standards."
        ],
        pt: [
          "Supervisionou a qualidade e testes de soluções web em ASP.NET Core e PHP."
        ]
      },
      dev: {
        es: [
          "Lideró el diseño, arquitectura y desarrollo de aplicaciones web utilizando ASP.NET Core, PHP y bases de datos relacionales.",
          "Estableció directrices de código limpio, estándares de bases de datos y acompañamiento técnico a los desarrolladores."
        ],
        en: [
          "Led design, architecture, and development of web applications using ASP.NET Core, PHP, and relational databases.",
          "Established clean coding guidelines, database schema standards, and technical oversight across engineering projects."
        ],
        pt: [
          "Liderou o desenvolvimento de aplicações web em ASP.NET Core e PHP com foco em código limpo."
        ]
      },
      backend: {
        es: [
          "Diseñó la arquitectura de backend y modelos de datos en SQL Server y MySQL para diversas aplicaciones de negocio.",
          "Implementó APIs RESTful en ASP.NET Core con autenticación y validación de parámetros de entrada.",
          "Optimizó consultas de base de datos para garantizar respuestas rápidas bajo múltiples usuarios simultáneos.",
          "Estructuró servicios de persistencia desacoplados siguiendo patrones Repository y Unit of Work."
        ],
        en: [
          "Designed backend architectures and relational data models in SQL Server and MySQL for varied commercial applications.",
          "Engineered RESTful APIs in ASP.NET Core implementing authentication and payload validation.",
          "Optimized database queries ensuring low-latency response times under concurrent user traffic.",
          "Structured decoupled persistence services implementing Repository and Unit of Work design patterns."
        ],
        pt: [
          "Projetou arquiteturas backend e bancos de dados em SQL Server e MySQL.",
          "Desenvolveu APIs RESTful em ASP.NET Core com alta performance.",
          "Aplicou padrões de projeto como Repository e Unit of Work."
        ]
      },
      fullstack: {
        es: [
          "Desarrolló aplicaciones web full stack integrando frontends dinámicos con backends en ASP.NET Core y PHP.",
          "Implementó interfaces de usuario responsivas con HTML5, CSS3 y JavaScript moderno.",
          "Supervisó la integración continua de código en repositorios Git y el despliegue en servidores web de hosting.",
          "Garantizó compatibilidad en múltiples navegadores y dispositivos móviles."
        ],
        en: [
          "Engineered full-stack web applications linking dynamic front ends with robust ASP.NET Core and PHP backends.",
          "Built responsive user interfaces utilizing HTML5, CSS3, and modern JavaScript.",
          "Supervised continuous code integration via Git repositories and production hosting deployments.",
          "Guaranteed cross-browser compatibility and responsive performance on mobile devices."
        ],
        pt: [
          "Desenvolveu aplicações full stack conectando interfaces modernas a backends robustos.",
          "Construiu designs responsivos e compatíveis com múltiplos navegadores.",
          "Supervisionou integração contínua e publicação em servidores."
        ]
      }
    }
  },
  {
    company: "Grupo SAI S.A.S",
    role: {
      combined: { 
        en: "Senior Support & Database Systems Engineer", 
        es: "Ingeniero Senior de Soporte y Sistemas de Bases de Datos", 
        pt: "Engenheiro Sênior de Suporte e Banco de Dados" 
      },
      sdet: { 
        en: "Support & Database Systems Quality Specialist", 
        es: "Especialista de Sistemas, Bases de Datos y Calidad", 
        pt: "Especialista em Sistemas, Banco de Dados e Qualidade" 
      },
      qa: { 
        en: "Senior Support & Quality Engineer", 
        es: "Ingeniero Senior de Soporte y Calidad", 
        pt: "Engenheiro Sênior de Suporte e Qualidade" 
      },
      dev: { 
        en: "Senior Support & Software Engineer", 
        es: "Ingeniero Senior de Soporte y Software", 
        pt: "Engenheiro Sênior de Suporte e Software" 
      },
      backend: { 
        en: "Database & Backend Support Engineer", 
        es: "Ingeniero de Soporte Backend y Bases de Datos", 
        pt: "Engenheiro de Suporte Backend e Banco de Dados" 
      },
      fullstack: { 
        en: "Senior Support & Application Engineer", 
        es: "Ingeniero Senior de Soporte y Aplicaciones", 
        pt: "Engenheiro Sênior de Suporte e Aplicações" 
      }
    },
    location: "Cali, Colombia (Presencial / On-site)",
    modality: 'onsite',
    companyDescription: {
      en: "Enterprise software company developing SAI Open, an integrated ERP, accounting, and financial management software platform for mid-to-large businesses.",
      es: "Compañía de software empresarial desarrolladora de SAI Open, plataforma integrada de ERP, contabilidad y gestión financiera para medianas y grandes empresas.",
      pt: "Empresa desenvolvedora da plataforma ERP e contábil corporativa SAI Open."
    },
    dates: { 
      en: "Sep 2015 – Jun 2016", 
      es: "Sep 2015 – Jun 2016", 
      pt: "Set 2015 – Jun 2016" 
    },
    technologies: [
      "SQL Server",
      "T-SQL",
      "ERP SAI Open",
      "Visual FoxPro",
      "C#",
      "Windows Server",
      "Migración de Datos",
      "Stored Procedures"
    ],
    detail: {
      combined: {
        es: [
          "Diagnosticó y corrigió incidencias críticas funcionales y de base de datos en la plataforma ERP y contable SAI Open para grandes empresas.",
          "Administró y optimizó bases de datos SQL Server, diseñando consultas T-SQL complejas, índices y procedimientos almacenados para generación de reportes financieros.",
          "Ejecutó migraciones masivas de datos entre versiones de ERP garantizando integridad referencial y cero pérdida de información contable.",
          "Configuró módulos del ERP adaptándolos a normativas tributarias vigentes y reglas de negocio específicas de cada cliente."
        ],
        en: [
          "Diagnosed and resolved critical functional and database defects across the flagship SAI Open accounting ERP platform for large businesses.",
          "Administered and optimized SQL Server database instances, engineering complex T-SQL scripts, indexing, and stored procedures for financial auditing.",
          "Executed high-volume database migrations between ERP releases ensuring strict referential integrity and zero loss of accounting records.",
          "Configured ERP modules adapting financial business rules to statutory tax accounting regulations."
        ],
        pt: [
          "Diagnosticou e corrigiu incidentes funcionais e de banco de dados no ERP contábil SAI Open.",
          "Otimizou instâncias do SQL Server com consultas avançadas em T-SQL para relatórios contábeis.",
          "Executou migrações de dados complexas com zero perda de registros."
        ]
      },
      sdet: {
        es: [
          "Diseñó scripts de verificación automática de balances contables para validar la consistencia de datos tras actualizaciones del ERP.",
          "Automatizó protocolos de pruebas de regresión técnica para certificar nuevos parches de software antes del despliegue en clientes.",
          "Verificó la integridad de transacciones concurrentes simulando operaciones de facturación simultáneas en SQL Server.",
          "Elaboró matrices de validación de cálculos tributarios para garantizar cumplimiento normativo sin discrepancias."
        ],
        en: [
          "Engineered automated accounting balance audit scripts verifying financial ledger consistency post ERP updates.",
          "Automated regression testing protocols certifying software patches prior to client rollout.",
          "Verified transaction concurrency integrity by simulating simultaneous invoicing operations on SQL Server.",
          "Created tax calculation verification matrices ensuring statutory compliance with zero variance."
        ],
        pt: [
          "Criou scripts de auditoria automatizada para validação contábil pós-atualizações do ERP.",
          "Automatizou testes de regressão antes do envio de patches a clientes.",
          "Verificou integridade transacional sob operações concorrentes no SQL Server."
        ]
      },
      qa: {
        es: [
          "Diagnosticó y corrigió incidencias funcionales y de base de datos en la plataforma ERP y contable SAI Open, ejecutando pruebas de regresión antes de cada actualización.",
          "Administró bases de datos relacionales garantizando integridad, optimización de consultas y migraciones de versión sin pérdida de información."
        ],
        en: [
          "Diagnosed and resolved critical functional and database issues in the SAI Open ERP accounting platform, executing regression tests before release rollouts.",
          "Managed relational databases ensuring data integrity, optimized query execution, and executed seamless version migrations."
        ],
        pt: [
          "Diagnosticou e corrigiu falhas no ERP SAI Open com testes de regressão."
        ]
      },
      dev: {
        es: [
          "Configuró, adaptó y depuró módulos de la plataforma ERP SAI Open para satisfacer requerimientos específicos de clientes y regulaciones tributarias.",
          "Administró instancias de bases de datos empresariales, construyó consultas SQL avanzadas para reportes gerenciales y garantizó alta disponibilidad durante implementaciones."
        ],
        en: [
          "Configured, customized, and debugged modules in the SAI Open ERP platform to accommodate specialized client business rules and tax regulations.",
          "Managed enterprise database instances, generated complex SQL reporting scripts, and maintained high availability during client implementations."
        ],
        pt: [
          "Customizou módulos da plataforma ERP SAI Open e gerou relatórios avançados em SQL."
        ]
      },
      backend: {
        es: [
          "Diseñó procedimientos almacenados, triggers y funciones en SQL Server para el cálculo automático de nómina y liquidación de impuestos.",
          "Optimizó consultas T-SQL que procesaban millones de asientos contables, reduciendo tiempos de balance de horas a minutos.",
          "Administró la seguridad de bases de datos, planes de mantenimiento, copias de seguridad y recuperación ante desastres.",
          "Creó scripts de migración y depuración de bases de datos para depurar datos históricos y corregir discrepancias de saldos."
        ],
        en: [
          "Authored complex stored procedures, triggers, and scalar functions in SQL Server for payroll computation and tax liquidation.",
          "Optimized T-SQL queries querying millions of ledger entries, shrinking financial close time from hours to minutes.",
          "Administered database security, scheduled maintenance plans, and automated disaster recovery backups.",
          "Authored data migration and cleanup scripts to purge obsolete historical data and reconcile ledger discrepancies."
        ],
        pt: [
          "Desenvolveu procedimentos armazenados complexos em SQL Server para folha de pagamento e impostos.",
          "Otimizou consultas em T-SQL reduzindo o tempo de fechamento financeiro.",
          "Gerenciou segurança, planos de manutenção e rotinas de backup no SQL Server."
        ]
      },
      fullstack: {
        es: [
          "Configuró y personalizó interfaces de usuario y reportes interactivos dentro de los módulos de facturación, inventario y contabilidad.",
          "Capacitó a administradores de sistemas y contadores de clientes en el uso avanzado y configuración de las aplicaciones.",
          "Resolvió incidencias técnicas de alto impacto directamente en los servidores de producción de los clientes.",
          "Colaboró en la integración del ERP con herramientas externas de facturación y software de terceros."
        ],
        en: [
          "Configured and customized interactive UI screens and management reports within billing, inventory, and accounting modules.",
          "Delivered technical onboarding and training to client system administrators and accounting staff.",
          "Resolved critical production incidents on client server environments with rapid turnaround.",
          "Collaborated in ERP integration with external electronic billing platforms and third-party accounting utilities."
        ],
        pt: [
          "Customizou telas e relatórios nos módulos de faturamento, estoque e contabilidade.",
          "Capacitou administradores e contadores no uso avançado do sistema.",
          "Solucionou incidentes críticos nos servidores dos clientes."
        ]
      }
    }
  }
];
