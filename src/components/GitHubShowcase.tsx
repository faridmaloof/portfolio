import { ExternalLink, GitBranch, Star, Code2, Terminal, CheckCircle, ArrowUpRight } from 'lucide-react';
import type { Language, TrackType } from '../types';

interface GitHubShowcaseProps {
  language: Language;
  track?: TrackType;
}

// GitHub SVG icon
function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function GitHubShowcase({ language, track = 'combined' }: GitHubShowcaseProps) {
  const githubUrl = "https://github.com/faridmaloof/";

  const qaRepositories = [
    {
      name: "enterprise-playwright-automation-suite",
      title: language === 'es' ? 'Framework Empresarial Playwright & TS' : 'Enterprise Playwright & TS Framework',
      description: language === 'es'
        ? 'Arquitectura de automatización robusta con Page Object Model, soporte de ejecución distribuida en CI/CD (Azure DevOps & GitHub Actions), reportes Allure y pruebas multi-navegador.'
        : 'Enterprise-grade automation architecture featuring Page Object Model, distributed execution in CI/CD (Azure DevOps & GitHub Actions), Allure reporting and cross-browser testing.',
      tech: ['Playwright', 'TypeScript', 'Azure DevOps', 'Allure', 'Docker'],
      stars: 18,
      forks: 7,
      type: 'QA Architecture',
    },
    {
      name: "api-automation-newman-postman-framework",
      title: language === 'es' ? 'Suite de Pruebas Automatizadas de API & Regresión' : 'Automated API & Regression Testing Suite',
      description: language === 'es'
        ? 'Pruebas de APIs RESTful de alta cobertura con validación de esquemas JSON, pruebas de contratos, ejecuciones parametrizadas y pipelines automáticos de regresión.'
        : 'Comprehensive RESTful API testing solution with JSON schema validation, contract testing, parameterized runs, and automated regression pipelines.',
      tech: ['Postman', 'Newman', 'Node.js', 'REST APIs', 'CI/CD'],
      stars: 14,
      forks: 5,
      type: 'API QA',
    },
    {
      name: "robot-framework-selenium-bdd-core",
      title: language === 'es' ? 'Robot Framework & Selenium BDD Core' : 'Robot Framework & Selenium BDD Core',
      description: language === 'es'
        ? 'Framework modular guiado por palabras clave y BDD para pruebas de extremo a extremo, integración continua y reporting automatizado de defectos.'
        : 'Modular keyword-driven and BDD automation framework for end-to-end testing, continuous integration, and automated defect reporting.',
      tech: ['Robot Framework', 'Python', 'Selenium', 'BDD', 'JMeter'],
      stars: 12,
      forks: 4,
      type: 'Test Automation',
    },
  ];

  const devRepositories = [
    {
      name: "clean-architecture-dotnet9-webapi",
      title: language === 'es' ? 'Arquitectura Limpia .NET 9 Web API & Microservicios' : 'Clean Architecture .NET 9 Web API & Microservices',
      description: language === 'es'
        ? 'Solución de backend escalable aplicando principios SOLID, CQRS con MediatR, autenticación basada en JWT, Entity Framework Core, PostgreSQL y Docker.'
        : 'Scalable backend solution applying SOLID principles, CQRS with MediatR, JWT token authentication, Entity Framework Core, PostgreSQL, and Docker containerization.',
      tech: ['.NET 9', 'C#', 'PostgreSQL', 'CQRS', 'Docker', 'JWT'],
      stars: 22,
      forks: 9,
      type: 'Backend Architecture',
    },
    {
      name: "react-typescript-enterprise-dashboard",
      title: language === 'es' ? 'Dashboard Empresarial React + TypeScript' : 'Enterprise React + TypeScript Dashboard',
      description: language === 'es'
        ? 'Aplicación cliente moderna de alto rendimiento con Tailwind CSS, gestión de estado global, tablas virtuales, gráficos analíticos y soporte multilingüe.'
        : 'Modern high-performance client web app featuring Tailwind CSS, global state management, virtualized data tables, analytical charts, and i18n support.',
      tech: ['React 18', 'TypeScript', 'Tailwind CSS', 'Vite', 'REST API'],
      stars: 19,
      forks: 6,
      type: 'Full Stack / Frontend',
    },
    {
      name: "cloud-native-microservices-infrastructure",
      title: language === 'es' ? 'Infraestructura Cloud-Native & Contenedores' : 'Cloud-Native Microservices & Infrastructure',
      description: language === 'es'
        ? 'Configuraciones de contenedores Docker, despliegues en Kubernetes, servicios serverless y orquestación con AWS DynamoDB y API Gateway.'
        : 'Docker container setups, Kubernetes deployment manifests, serverless functions, and cloud orchestration with AWS DynamoDB and API Gateway.',
      tech: ['AWS', 'Kubernetes', 'Docker', 'DynamoDB', 'CI/CD'],
      stars: 16,
      forks: 5,
      type: 'Cloud / DevOps',
    },
  ];

  const reposToDisplay = track === 'qa' ? qaRepositories : track === 'dev' ? devRepositories : [...qaRepositories.slice(0, 2), ...devRepositories.slice(0, 2)];

  return (
    <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 rounded-2xl shadow-xl border border-slate-700/80 p-6 lg:p-8 text-white relative overflow-hidden">
      {/* Background glow decoration */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header with GitHub link */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-700/80">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-white shadow-inner flex-shrink-0">
            <GitHubIcon className="w-7 h-7 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white tracking-tight">
                {language === 'es' ? 'Proyectos y Repositorios en GitHub' : 'GitHub Projects & Open Source Repositories'}
              </h2>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <CheckCircle className="w-3 h-3" />
                Active Code
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              {language === 'es'
                ? 'Conoce mi estilo de código, arquitecturas de software y estándares de ingeniería en'
                : 'Explore my coding standards, enterprise architectures, and automation frameworks at'}{' '}
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 font-semibold hover:underline inline-flex items-center gap-0.5"
              >
                github.com/faridmaloof/
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </p>
          </div>
        </div>

        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-slate-900 hover:bg-slate-100 font-semibold rounded-xl text-sm shadow-md transition-all active:scale-95 w-full sm:w-auto"
        >
          <GitHubIcon className="w-4 h-4 text-slate-900" />
          <span>{language === 'es' ? 'Ver Perfil @faridmaloof' : 'View Profile @faridmaloof'}</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-70" />
        </a>
      </div>

      {/* Highlights Bar */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 py-5 text-center border-b border-slate-700/60">
        <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/50">
          <div className="text-xl font-bold text-blue-400">15+</div>
          <div className="text-xs text-slate-400">{language === 'es' ? 'Años en Tecnología' : 'Years in Tech'}</div>
        </div>
        <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/50">
          <div className="text-xl font-bold text-purple-400">100%</div>
          <div className="text-xs text-slate-400">{language === 'es' ? 'TypeScript & .NET Core' : 'TypeScript & .NET Core'}</div>
        </div>
        <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/50">
          <div className="text-xl font-bold text-emerald-400">CI / CD</div>
          <div className="text-xs text-slate-400">{language === 'es' ? 'Pipelines Automatizados' : 'Automated Pipelines'}</div>
        </div>
        <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/50">
          <div className="text-xl font-bold text-amber-400">120+</div>
          <div className="text-xs text-slate-400">{language === 'es' ? 'Certificaciones Oficiales' : 'Verified Certifications'}</div>
        </div>
      </div>

      {/* Repositories Grid */}
      <div className="relative z-10 pt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Terminal className="w-4 h-4 text-blue-400" />
            {language === 'es' ? 'Arquitecturas y Suites Destacadas' : 'Featured Architectural Solutions'}
          </h3>
          <span className="text-xs text-slate-400">
            {language === 'es' ? 'Repositorios y plantillas públicas' : 'Public templates & frameworks'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reposToDisplay.map((repo, idx) => (
            <a
              key={idx}
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-blue-400/80 rounded-xl p-4.5 transition-all shadow-sm hover:shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5 text-blue-400 font-mono text-xs">
                    <Code2 className="w-3.5 h-3.5" />
                    <span>{repo.type}</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                </div>

                <h4 className="font-bold text-sm text-white mb-1.5 group-hover:text-blue-300 transition-colors">
                  {repo.title}
                </h4>

                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-3">
                  {repo.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {repo.tech.map((t, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-900/80 text-slate-300 border border-slate-700/60">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-700/60">
                  <span className="font-mono truncate max-w-[180px]">faridmaloof/{repo.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-0.5">
                      <Star className="w-3 h-3 text-amber-400" />
                      {repo.stars}
                    </span>
                    <span className="inline-flex items-center gap-0.5">
                      <GitBranch className="w-3 h-3 text-slate-400" />
                      {repo.forks}
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
