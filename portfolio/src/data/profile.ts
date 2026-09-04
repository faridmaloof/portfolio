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
  },

  titles: {
    qa: { en: "QA Automation Engineer / SDET", es: "Especialista en Automatización de Pruebas / SDET" },
    dev: { en: "Full Stack Developer | Backend Engineer (Java · NET)", es: "Desarrollador Full Stack | Backend (Java · NET)" },
  },

  summary: {
    qa: {
      en: "Automation Testing Senior Specialist / SDET with 15+ years in technology and 6+ years focused on software quality assurance and test automation across fintech, banking, and enterprise environments (Evertec, Stori, GMSTEK). Combines hands-on QA expertise — test strategy, API and performance testing (Postman, JMeter), automation frameworks, and CI/CD integration — with a software development background that enables early risk detection, technically sound recommendations, and faster, lower-friction release cycles. Comfortable owning quality end-to-end: from test design and defect analysis to collaborating with developers and DevOps on scalable, maintainable automation.",
      es: "Especialista Senior en Automatización de Pruebas / SDET con más de 15 años en tecnología y más de 6 años enfocados en aseguramiento de calidad y automatización de pruebas en entornos fintech, bancarios y empresariales (Evertec, Stori, GMSTEK). Combina experiencia práctica en QA —estrategia de pruebas, pruebas de API y rendimiento (Postman, JMeter), frameworks de automatización e integración con CI/CD— con un background en desarrollo de software que le permite anticipar riesgos, proponer soluciones técnicamente sólidas y acelerar los ciclos de entrega sin sacrificar cobertura. Cómodo liderando la calidad de punta a punta: desde el diseño de pruebas y análisis de defectos hasta la colaboración con desarrollo y DevOps en automatización escalable y mantenible.",
    },
    dev: {
      en: "Full Stack / Backend Developer with 15+ years of experience building and maintaining web applications and APIs using Java (Spring Boot), C#/.NET, and PHP, with hands-on experience across AWS cloud infrastructure (EC2, RDS) and relational databases (MySQL, Oracle, SQL Server). Track record spans the full SDLC — architecture, development, code review, deployment, and production support — for PDM systems, internal enterprise platforms, and client-facing web applications. A strong QA and testing background (JMeter, Postman, automated testing) adds a quality-first mindset that reduces rework and improves release reliability.",
      es: "Desarrollador Full Stack / Backend con más de 15 años de experiencia construyendo y manteniendo aplicaciones web y APIs con Java (Spring Boot), C#/.NET y PHP, con experiencia práctica en infraestructura cloud de AWS (EC2, RDS) y bases de datos relacionales (MySQL, Oracle, SQL Server). Ha participado en el ciclo completo de desarrollo de software —arquitectura, desarrollo, revisión de código, despliegue y soporte en producción— para sistemas PDM, plataformas empresariales internas y aplicaciones web de cara al cliente. Su sólido background en QA y pruebas (JMeter, Postman, automatización de pruebas) aporta una mentalidad orientada a la calidad que reduce el retrabajo y mejora la confiabilidad de las entregas.",
    },
  },

  skills: {
    qa: {
      en: [
        ["Test Strategy & Automation", "Test planning & strategy, automation frameworks, regression & risk-based testing, CI/CD integration"],
        ["Testing Tools", "JMeter (performance), Postman (API testing), bug-tracking systems, Power BI (reporting/dashboards)"],
        ["Technical", "API design (Apigee, ASP.NET Core), SQL (MySQL, Oracle, SQL Server), AWS (EC2, RDS), Java, C#"],
        ["Methodologies", "Agile/Scrum, PMI project management, PMBOK"],
      ],
      es: [
        ["Estrategia y Automatización de Pruebas", "Planeación y estrategia de pruebas, frameworks de automatización, pruebas de regresión basadas en riesgo, integración con CI/CD"],
        ["Herramientas de Testing", "JMeter (rendimiento), Postman (pruebas de API), sistemas de bug tracking, Power BI (reportes/dashboards)"],
        ["Técnico", "Diseño de APIs (Apigee, ASP.NET Core), SQL (MySQL, Oracle, SQL Server), AWS (EC2, RDS), Java, C#"],
        ["Metodologías", "Agile/Scrum, gestión de proyectos PMI, PMBOK"],
      ],
    },
    dev: {
      en: [
        ["Languages & Frameworks", "Java (Spring Boot), C#/.NET (ASP.NET Core, VB.NET), PHP"],
        ["Cloud & Data", "AWS (EC2, RDS), MySQL, Oracle, SQL Server"],
        ["API Development", "RESTful API design, Google Cloud Apigee, ASP.NET Core Web APIs"],
        ["Practices", "Code review & mentoring, CI/CD & DevOps collaboration, Agile/Scrum, unit & integration testing, PMI project management"],
        ["Quality mindset", "JMeter, Postman, automated testing — from a QA background"],
      ],
      es: [
        ["Lenguajes y Frameworks", "Java (Spring Boot), C#/.NET (ASP.NET Core, VB.NET), PHP"],
        ["Cloud y Datos", "AWS (EC2, RDS), MySQL, Oracle, SQL Server"],
        ["Desarrollo de APIs", "Diseño de APIs RESTful, Google Cloud Apigee, ASP.NET Core Web APIs"],
        ["Prácticas", "Revisión de código y mentoría, colaboración CI/CD y DevOps, Agile/Scrum, pruebas unitarias y de integración, gestión de proyectos PMI"],
        ["Mentalidad de calidad", "JMeter, Postman, automatización de pruebas — desde un background en QA"],
      ],
    },
  },

  certifications: {
    en: [
      "Power BI: From Scratch — The Most Powerful Course of 2021",
      "Power BI: Getting Started in Data Analysis",
      "Building Web APIs with ASP.NET Core 8",
      "API Design and Fundamentals of Google Cloud's Apigee API Platform",
      "Basic English — Level 2",
    ],
    es: [
      "Power BI: Desde Cero — El Curso Más Poderoso de 2021",
      "Power BI: Inicia en el Mundo del Análisis de Datos",
      "Building Web APIs with ASP.NET Core 8",
      "API Design and Fundamentals of Google Cloud's Apigee API Platform",
      "Inglés Básico — Nivel 2",
    ],
  },

  languages: {
    en: ["Spanish — Native / Bilingual", "English — Professional Working Proficiency"],
    es: ["Español — Nativo / Bilingüe", "Inglés — Dominio Profesional"],
  },

  experience: [
    {
      company: "Evertec",
      role: {
        qa: { en: "Automation Testing Senior Specialist", es: "Especialista Senior en Automatización de Pruebas" },
        dev: { en: "Senior Backend Engineer", es: "Senior Backend Engineer" },
      },
      location: "",
      dates: { en: "Dec 2025 – Present", es: "Dic 2025 – Presente" },
      detail: {
        qa: {
          en: [
            "Design, develop, and maintain automated test suites and frameworks to ensure software quality across complex, high-availability financial systems.",
            "Lead automation initiatives, establishing best practices, scalable frameworks, and CI/CD-integrated testing strategies.",
            "Partner with Development, QA, and DevOps teams to streamline release processes, reduce delivery timelines, and improve deployment reliability.",
            "Drive continuous improvement in test coverage and early defect detection, reducing risk before production releases.",
          ],
          es: [
            "Diseña, desarrolla y mantiene suites y frameworks de automatización de pruebas para garantizar la calidad del software en sistemas financieros complejos y de alta disponibilidad.",
            "Lidera iniciativas de automatización, estableciendo buenas prácticas, frameworks escalables y estrategias de pruebas integradas con CI/CD.",
            "Colabora estrechamente con los equipos de Desarrollo, QA y DevOps para optimizar los procesos de entrega, reducir tiempos y mejorar la confiabilidad de los despliegues.",
            "Impulsa la mejora continua en cobertura de pruebas y detección temprana de defectos, reduciendo el riesgo antes de los despliegues a producción.",
          ],
        },
        dev: {
          en: [
            "Design and maintain automated test frameworks and CI/CD-integrated testing strategies for complex financial systems, partnering closely with development and DevOps.",
            "Drive process improvements that increase test coverage, reduce delivery timelines, and improve deployment reliability.",
          ],
          es: [
            "Diseña y mantiene frameworks de automatización de pruebas y estrategias integradas con CI/CD para sistemas financieros complejos, en colaboración cercana con desarrollo y DevOps.",
            "Impulsa mejoras de proceso que aumentan la cobertura de pruebas, reducen tiempos de entrega y mejoran la confiabilidad de los despliegues.",
          ],
        },
      },
    },
    {
      company: "Stori",
      role: { en: "QA Automation Engineer", es: "Ingeniero de Automatización QA" },
      location: "México",
      dates: { en: "Jun 2023 – Aug 2025", es: "Jun 2023 – Ago 2025" },
      detail: {
        qa: {
          en: [
            "Developed test plans and testing strategies for fintech products, aligning coverage with business risk and release priorities.",
            "Automated software testing procedures, simulating product performance and evaluating outcomes to validate functionality before release.",
            "Identified, documented, and tracked defects through bug-tracking systems, analyzing historical defect data to strengthen product quality.",
            "Reviewed product specifications proactively to anticipate errors and provided input on product design to prevent future issues.",
            "Continuously refined testing strategies with an automation-first mindset, improving efficiency and coverage over time.",
          ],
          es: [
            "Desarrolló planes y estrategias de pruebas para productos fintech, alineando la cobertura con el riesgo del negocio y las prioridades de entrega.",
            "Automatizó procedimientos de prueba, simulando el desempeño del producto y evaluando resultados para validar la funcionalidad antes de cada release.",
            "Identificó, documentó y dio seguimiento a defectos mediante sistemas de bug tracking, analizando el histórico de defectos para fortalecer la calidad del producto.",
            "Revisó especificaciones de producto de forma proactiva para anticipar errores y aportó recomendaciones de diseño para prevenir problemas futuros.",
            "Perfeccionó continuamente las estrategias de prueba con un enfoque automation-first, mejorando eficiencia y cobertura en el tiempo.",
          ],
        },
        dev: {
          en: [
            "Built test plans and automated testing procedures for fintech products, validating functionality and performance ahead of release.",
            "Partnered with product and engineering teams, reviewing specifications and providing design input to prevent defects.",
          ],
          es: [
            "Construyó planes y procedimientos de prueba automatizados para productos fintech, validando funcionalidad y desempeño antes de cada release.",
            "Colaboró con equipos de producto e ingeniería, revisando especificaciones y aportando al diseño para prevenir defectos.",
          ],
        },
      },
    },
    {
      company: "GMSTEK, LLC",
      role: { en: "Development & QA Tester", es: "Desarrollo & QA Tester" },
      location: "Palmetto Bay, Florida, USA",
      dates: { en: "Jul 2022 – Jun 2023", es: "Jul 2022 – Jun 2023" },
      detail: {
        qa: {
          en: [
            "Created detailed test plans and testing strategies, executing manual and automated tests to evaluate product performance.",
            "Identified and documented defects using bug-tracking systems, maintaining an updated defects database to streamline the testing process.",
            "Reviewed product specifications to proactively address potential errors and contributed recommendations to product design.",
            "Continuously optimized testing strategies with a focus on automation to ensure software quality and meet customer needs.",
          ],
          es: [
            "Elaboró planes y estrategias de prueba detallados, ejecutando pruebas manuales y automatizadas para evaluar el desempeño del producto.",
            "Identificó y documentó defectos mediante sistemas de bug tracking, manteniendo actualizada la base de datos de defectos para agilizar el proceso de pruebas.",
            "Revisó especificaciones de producto para anticipar posibles errores y aportó recomendaciones al diseño del producto.",
            "Optimizó continuamente las estrategias de prueba con foco en automatización, garantizando la calidad del software conforme a las necesidades del cliente.",
          ],
        },
        dev: {
          en: [
            "Created test plans and executed manual/automated testing while contributing to product design recommendations that reduced downstream defects.",
            "Maintained a defect database and bug-tracking workflow, optimizing testing strategy with a focus on automation.",
          ],
          es: [
            "Elaboró planes de prueba y ejecutó testing manual/automatizado, aportando recomendaciones de diseño que redujeron defectos posteriores.",
            "Mantuvo una base de datos de defectos y flujo de bug tracking, optimizando la estrategia de pruebas con foco en automatización.",
          ],
        },
      },
    },
    {
      company: "COLSOF S.A.S",
      role: { en: "Specialist Engineer", es: "Ingeniero Especialista" },
      location: "Bogotá, Colombia",
      dates: { en: "Aug 2021 – Jun 2022", es: "Ago 2021 – Jun 2022" },
      detail: {
        qa: {
          en: [
            "Managed technology projects under PMI standards and agile methodologies, from planning through delivery and reporting.",
            "Led innovation and infrastructure initiatives, coordinating cross-functional teams and tracking progress through management indicators.",
          ],
          es: [
            "Gestionó proyectos tecnológicos bajo estándares PMI y metodologías ágiles, desde la planeación hasta la entrega y el reporte de resultados.",
            "Lideró iniciativas de innovación e infraestructura, coordinando equipos multidisciplinarios y monitoreando el avance mediante indicadores de gestión.",
          ],
        },
        dev: {
          en: [
            "Managed technology projects following PMI standards and agile methodologies, leading cross-functional teams from planning through delivery.",
            "Built management indicators and dashboards to track project progress and support data-driven decisions.",
            "Defined and executed technological innovation plans, aligning implementation projects with organizational strategy.",
            "Organized administrative, financial, and technology-infrastructure processes to keep projects on scope, on time, and on budget.",
          ],
          es: [
            "Gestionó proyectos tecnológicos bajo estándares PMI y metodologías ágiles, liderando equipos multidisciplinarios desde la planeación hasta la entrega.",
            "Construyó indicadores y tableros de gestión para monitorear el avance de los proyectos y apoyar la toma de decisiones basada en datos.",
            "Definió y ejecutó planes de innovación tecnológica, alineando los proyectos de implementación con la estrategia organizacional.",
            "Organizó procesos administrativos, financieros y de infraestructura tecnológica para mantener los proyectos dentro de alcance, tiempo y presupuesto.",
          ],
        },
      },
    },
    {
      company: "ECOPROYECT CONSULTORÍA SAS",
      role: { en: "Senior J2EE Developer", es: "Desarrollador Senior J2EE" },
      location: "Cali, Colombia",
      dates: { en: "Nov 2021 – Feb 2022", es: "Nov 2021 – Feb 2022" },
      detail: {
        qa: {
          en: [
            "Led Java/Spring Boot development for client solutions, from architecture through unit/integration testing and AWS deployment (EC2, RDS).",
            "Conducted code reviews and mentored junior developers, embedding testing best practices into the delivery process.",
          ],
          es: [
            "Lideró desarrollo en Java/Spring Boot para soluciones de cliente, desde la arquitectura hasta pruebas unitarias/de integración y despliegue en AWS (EC2, RDS).",
            "Realizó revisiones de código y mentoría a desarrolladores junior, incorporando buenas prácticas de pruebas en el proceso de entrega.",
          ],
        },
        dev: {
          en: [
            "Led design, development, and implementation of software solutions in Java and Spring Boot, partnering with the architecture team on scalable technical designs.",
            "Owned the full software development lifecycle, from conception through delivery and maintenance of high-quality applications.",
            "Conducted code reviews and mentored junior developers to strengthen team capability and code quality.",
            "Performed unit and integration testing to ensure code quality and stability prior to release.",
            "Deployed highly available, scalable cloud solutions on AWS (EC2, RDS) and worked closely with DevOps on continuous deployment.",
          ],
          es: [
            "Lideró el diseño, desarrollo e implementación de soluciones de software en Java y Spring Boot, en conjunto con el equipo de arquitectura, para lograr diseños técnicos escalables.",
            "Participó en el ciclo completo de desarrollo de software, desde la concepción hasta la entrega y mantenimiento de aplicaciones de alta calidad.",
            "Realizó revisiones de código y mentoría a desarrolladores junior para fortalecer la capacidad del equipo y la calidad del código.",
            "Ejecutó pruebas unitarias y de integración para garantizar la calidad y estabilidad del código antes del despliegue.",
            "Desplegó soluciones cloud altamente disponibles y escalables en AWS (EC2, RDS), colaborando de cerca con DevOps en despliegue continuo.",
          ],
        },
      },
    },
    {
      company: "GreenSQA S.A.",
      role: { en: "Software Test Engineer → Junior Integrated Service Professional", es: "Ingeniero de Pruebas de Software → Profesional Junior de Servicios Integrados" },
      location: "Cali, Colombia",
      dates: { en: "Feb 2020 – Aug 2021", es: "Feb 2020 – Ago 2021" },
      detail: {
        qa: {
          en: [
            "Planned and estimated testing services for client projects, designing, executing, and reporting on functional and non-functional tests and code inspections.",
            "Applied test design techniques to maximize coverage while minimizing effort, and built automation robots to support test execution.",
            "Executed manual and automated software tests, logging non-conformities and defects in designated tracking tools.",
            "Identified project risks and built continuity plans; managed test assets under formal configuration-management controls.",
            "Provided objective feedback to project teams on testing status and proposed process improvements to optimize testing effort.",
          ],
          es: [
            "Planeó y estimó los servicios de pruebas comprometidos en cada proyecto, diseñando, ejecutando y reportando pruebas funcionales y no funcionales, así como inspecciones de código.",
            "Aplicó técnicas de diseño de pruebas para maximizar la cobertura minimizando el esfuerzo requerido, y desarrolló robots de automatización para apoyar la ejecución de pruebas.",
            "Ejecutó pruebas de software manuales y automatizadas, reportando no conformidades y defectos en las herramientas definidas.",
            "Identificó riesgos del proyecto y elaboró planes de continuidad; gestionó los activos de prueba bajo controles formales de gestión de configuración.",
            "Brindó retroalimentación objetiva a los equipos de proyecto sobre el estado de las pruebas y propuso mejoras de proceso para optimizar el esfuerzo de prueba.",
          ],
        },
        dev: {
          en: [
            "Planned, designed, and executed functional and non-functional testing and code inspections for client projects, combining manual and automated methods.",
            "Applied test design and configuration-management practices to maximize coverage, mitigate project risk, and improve testing efficiency.",
          ],
          es: [
            "Planeó, diseñó y ejecutó pruebas funcionales y no funcionales e inspecciones de código para proyectos de cliente, combinando métodos manuales y automatizados.",
            "Aplicó técnicas de diseño de pruebas y gestión de configuración para maximizar cobertura, mitigar riesgos del proyecto y mejorar la eficiencia de las pruebas.",
          ],
        },
      },
    },
    {
      company: "Busscar de Colombia",
      role: { en: "Senior Software Developer", es: "Desarrollador Senior de Software" },
      location: "Pereira, Colombia",
      dates: { en: "Sep 2017 – Feb 2020", es: "Sep 2017 – Feb 2020" },
      detail: {
        qa: {
          en: [
            "Designed and developed C#/VB.NET Product Data Management (PDM) systems integrated with MySQL, Oracle, and SQL Server.",
            "Led code reviews and mentored junior developers while ensuring application quality, security, and compliance across the SINERGIA project.",
          ],
          es: [
            "Diseñó y desarrolló sistemas PDM en C#/VB.NET integrados con MySQL, Oracle y SQL Server.",
            "Lideró revisiones de código y mentoría a desarrolladores junior, garantizando calidad, seguridad y cumplimiento en el proyecto SINERGIA.",
          ],
        },
        dev: {
          en: [
            "Designed and developed Product Data Management (PDM) systems using C# and VB.NET, integrating with MySQL, Oracle, and SQL Server databases.",
            "Analyzed, designed, and built applications for multiple business areas, providing ongoing maintenance, debugging, and technical support under the SINERGIA project.",
            "Led code reviews and mentored junior developers, promoting a culture of continuous improvement and knowledge sharing.",
            "Collaborated with cross-functional teams to gather requirements, define project scope, and ensure timely delivery of high-quality solutions.",
            "Contributed to architectural decisions and implemented security best practices to protect sensitive data and ensure regulatory compliance.",
          ],
          es: [
            "Diseñó y desarrolló sistemas de gestión de datos de producto (PDM) en C# y VB.NET, integrados con bases de datos MySQL, Oracle y SQL Server.",
            "Analizó, diseñó y construyó aplicaciones para distintas áreas del negocio, brindando mantenimiento continuo, depuración y soporte técnico dentro del proyecto SINERGIA.",
            "Lideró revisiones de código y mentoría a desarrolladores junior, promoviendo una cultura de mejora continua y transferencia de conocimiento.",
            "Colaboró con equipos multidisciplinarios para levantar requerimientos, definir el alcance de los proyectos y asegurar la entrega oportuna de soluciones de alta calidad.",
            "Participó en decisiones de arquitectura e implementó buenas prácticas de seguridad para proteger datos sensibles y asegurar el cumplimiento normativo.",
          ],
        },
      },
    },
    {
      company: "EMCALI EICE ESP",
      role: { en: "Technology Solutions Analyst", es: "Analista de Soluciones Tecnológicas" },
      location: "Cali, Colombia",
      dates: { en: "Jun 2016 – Sep 2017", es: "Jun 2016 – Sep 2017" },
      detail: {
        qa: {
          en: [
            "Developed and maintained internal telecom applications, evaluating tools and technologies to improve efficiency and reliability.",
            "Conducted comprehensive application testing to ensure stability, performance, and security, and resolved reported incidents.",
          ],
          es: [
            "Desarrolló y mantuvo aplicaciones internas de telecomunicaciones, evaluando herramientas y tecnologías para mejorar eficiencia y confiabilidad.",
            "Realizó pruebas integrales de las aplicaciones para garantizar estabilidad, rendimiento y seguridad, y resolvió incidentes reportados.",
          ],
        },
        dev: {
          en: [
            "Designed, developed, and maintained internal applications for the telecommunications sector, extending functionality to optimize performance and usability.",
            "Classified, documented, and resolved reported incidents, providing temporary and permanent solutions within information systems.",
            "Collaborated on requirements analysis and delivered technology solutions addressing specific business needs.",
            "Evaluated and selected technologies, tools, and frameworks to improve solution efficiency and quality; conducted thorough testing to ensure stability, performance, and security.",
          ],
          es: [
            "Diseñó, desarrolló y mantuvo aplicaciones internas para el sector de telecomunicaciones, ampliando funcionalidades para optimizar rendimiento y usabilidad.",
            "Clasificó, documentó y resolvió incidentes reportados, brindando soluciones temporales y definitivas dentro de los sistemas de información.",
            "Colaboró en el análisis de requerimientos y en la generación de soluciones tecnológicas orientadas a necesidades específicas del negocio.",
            "Evaluó y seleccionó tecnologías, herramientas y frameworks para mejorar la eficiencia y calidad de las soluciones; realizó pruebas exhaustivas para garantizar estabilidad, rendimiento y seguridad.",
          ],
        },
      },
    },
    {
      company: "System Factory SAS",
      role: { en: "Technology Solutions Leader", es: "Líder de Soluciones Tecnológicas" },
      location: "Cali, Colombia",
      dates: { en: "Jun 2016 – Sep 2016", es: "Jun 2016 – Sep 2016" },
      detail: {
        qa: {
          en: [
            "Led development of ASP.NET Core and PHP web solutions, overseeing database management and ensuring data integrity across systems.",
            "Optimized team processes and workflows to improve delivery quality and speed.",
          ],
          es: [
            "Lideró el desarrollo de soluciones web en ASP.NET Core y PHP, supervisando la gestión de bases de datos y garantizando la integridad de los datos.",
            "Optimizó procesos y flujos de trabajo del equipo para mejorar la calidad y velocidad de entrega.",
          ],
        },
        dev: {
          en: [
            "Led the design, development, and implementation of software solutions using ASP.NET Core, PHP, and related technologies to meet client requirements.",
            "Championed clean, maintainable, and scalable codebases, overseeing database management and ensuring data integrity across systems.",
            "Provided technical guidance to the team and led process/workflow optimization efforts to improve delivery quality and speed.",
          ],
          es: [
            "Lideró el diseño, desarrollo e implementación de soluciones de software con ASP.NET Core, PHP y tecnologías relacionadas para atender los requerimientos de los clientes.",
            "Promovió código limpio, mantenible y escalable, supervisando la gestión de bases de datos y garantizando la integridad de los datos en todos los sistemas.",
            "Brindó guía técnica al equipo y lideró la optimización de procesos y flujos de trabajo para mejorar la calidad y velocidad de entrega.",
          ],
        },
      },
    },
    {
      company: "Grupo SAI S.A.S",
      role: { en: "Senior Support Engineer", es: "Ingeniero Senior de Soporte" },
      location: "Cali, Colombia",
      dates: { en: "Sep 2015 – Jun 2016", es: "Sep 2015 – Jun 2016" },
      detail: {
        qa: {
          en: [
            "Diagnosed and corrected configuration issues in the SAI Open accounting platform, updating the application to meet evolving customer requirements.",
            "Managed and maintained the associated database, ensuring data integrity and performance, and led migrations to new application releases with minimal disruption.",
          ],
          es: [
            "Diagnosticó y corrigió configuraciones en la plataforma contable SAI Open, actualizando la aplicación para responder a los requerimientos cambiantes de los clientes.",
            "Administró y mantuvo la base de datos asociada, garantizando integridad y desempeño, y lideró migraciones a nuevas versiones de la aplicación con mínima interrupción del servicio.",
          ],
        },
        dev: {
          en: [
            "Diagnosed and corrected configuration issues in the SAI Open accounting platform, updating the application to meet evolving customer requirements.",
            "Managed and maintained the associated database, ensuring data integrity and performance, and led migrations to new application releases with minimal disruption.",
            "Installed, configured, and parameterized new functionalities and applications, and produced reports and debugging support for new implementations.",
          ],
          es: [
            "Diagnosticó y corrigió configuraciones en la plataforma contable SAI Open, actualizando la aplicación para responder a los requerimientos cambiantes de los clientes.",
            "Administró y mantuvo la base de datos asociada, garantizando integridad y desempeño, y lideró migraciones a nuevas versiones de la aplicación con mínima interrupción del servicio.",
            "Instaló, configuró y parametrizó nuevas funcionalidades y aplicaciones, generando reportes y soporte de depuración para nuevas implementaciones.",
          ],
        },
      },
    },
  ],

  earlyCareer: {
    heading: { en: "Early Career", es: "Inicio de Carrera" },
    items: {
      en: [
        ["Banco de Occidente", "Operations & Technology Audit Assistant (2012 – 2015)", "Cali, Colombia", "Automated recurring audit and reporting processes using ACL scripting; consolidated information for SOX compliance and Grupo Aval reporting; supported technology audits across multiple regional offices."],
        ["EMCALI EICE ESP", "Service Desk / Help Desk (Aug 2011 – May 2012)", "Cali, Colombia", "Provided first- and second-level technical support for ADSL, IP telephony, and IP television services, ensuring service continuity and customer satisfaction."],
        ["Grupo SAI S.A.S", "Support Analyst (Jan 2011 – Aug 2011)", "Cali, Colombia", "Configured and maintained the SAI Open accounting application and its database for client implementations."],
      ],
      es: [
        ["Banco de Occidente", "Asistente de Auditoría de Procesos y Tecnología (2012 – 2015)", "Cali, Colombia", "Automatizó procesos recurrentes de auditoría y reporting usando scripts en ACL; consolidó información para cumplimiento SOX y reportes a Grupo Aval; apoyó auditorías tecnológicas en distintas sedes regionales."],
        ["EMCALI EICE ESP", "Service Desk / Mesa de Ayuda (Ago 2011 – May 2012)", "Cali, Colombia", "Brindó soporte técnico de primer y segundo nivel para servicios de ADSL, telefonía IP y televisión IP, garantizando continuidad del servicio y satisfacción del cliente."],
        ["Grupo SAI S.A.S", "Analista de Soporte (Ene 2011 – Ago 2011)", "Cali, Colombia", "Configuró y mantuvo la aplicación contable SAI Open y su base de datos para implementaciones de clientes."],
      ],
    },
  },

  education: {
    en: [
      ["Asturias Corporación Universitaria", "Specialization in Project Management", "Oct 2023 – Nov 2024", "GPA 4.9/5.0"],
      ["Uniremington", "Systems Engineering", "Feb 2020 – Mar 2023", "GPA 4.2/5.0"],
      ["Universidad Autónoma de Occidente", "Computer Engineering (coursework)", "2014 – 2017", "GPA 4.0/5.0"],
      ["Universidad del Valle", "Information Systems Technology", "Aug 2006 – May 2010", "GPA 3.77/5.0"],
      ["Corporación Universitaria de Ciencia y Desarrollo (UNICIENCIA)", "Computer Engineering (coursework)", "2004 – 2006", "GPA 4.7/5.0"],
    ],
    es: [
      ["Asturias Corporación Universitaria", "Especialización en Gerencia de Proyectos", "Oct 2023 – Nov 2024", "Promedio 4.9/5.0"],
      ["Uniremington", "Ingeniería de Sistemas", "Feb 2020 – Mar 2023", "Promedio 4.2/5.0"],
      ["Universidad Autónoma de Occidente", "Ingeniería Informática (cursada)", "2014 – 2017", "Promedio 4.0/5.0"],
      ["Universidad del Valle", "Tecnología en Sistemas de Información", "Ago 2006 – May 2010", "Promedio 3.77/5.0"],
      ["Corporación Universitaria de Ciencia y Desarrollo (UNICIENCIA)", "Ingeniería Informática (cursada)", "2004 – 2006", "Promedio 4.7/5.0"],
    ],
  },

  labels: {
    en: {
      summary: "PROFESSIONAL SUMMARY",
      skills: "CORE SKILLS",
      certifications: "CERTIFICATIONS",
      languages: "LANGUAGES",
      experience: "PROFESSIONAL EXPERIENCE",
      education: "EDUCATION",
    },
    es: {
      summary: "RESUMEN PROFESIONAL",
      skills: "HABILIDADES CLAVE",
      certifications: "CERTIFICACIONES",
      languages: "IDIOMAS",
      experience: "EXPERIENCIA PROFESIONAL",
      education: "EDUCACIÓN",
    },
  },
};
