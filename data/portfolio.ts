export type SocialLink = {
  label: string;
  href: string;
  type: "github" | "linkedin" | "email";
};

export type Project = {
  number: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  type: "Independent" | "Professional";
  visual: "healthcare" | "quiz" | "wire2wifi" | "lca" | "lps";
};

export type Capability = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  icon: "mobile" | "backend" | "cloud" | "architecture" | "data" | "engineering";
};

export type BuildStep = {
  number: string;
  title: string;
  description: string;
  label: string;
  icon: "define" | "build" | "connect" | "engineer" | "persist" | "ship";
};

export type ExperienceEntry = {
  number: string;
  period: string;
  title: string;
  type: string;
  description: string;
  technologies: string[];
};

export const siteConfig = {
  siteName: "Karm Patel | Full-Stack Mobile Developer",
  role: "Flutter Developer | .NET Backend Engineer",
  location: "Gandhinagar, Gujarat, India",
  siteUrl: "https://karm-1598.github.io",
  defaultDescription:
    "Flutter Developer | .NET Backend Engineer building mobile products and the systems behind them.",
  email: "karmpatell@outlook.com",
  githubUrl: "https://github.com/karm-1598",
  linkedinUrl: "https://www.linkedin.com/in/karm-patel-1170b1273",
  isAvailableForWork: true,
};

export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: siteConfig.githubUrl, type: "github" },
  { label: "LinkedIn", href: siteConfig.linkedinUrl, type: "linkedin" },
  { label: "Email", href: `mailto:${siteConfig.email}`, type: "email" },
];

export const projects: Project[] = [
  {
    number: "01",
    title: "Healthcare Marketplace",
    category: "Independent Project",
    description:
      "A healthcare-focused marketplace experience designed around mobile usability, structured data flows, and a production-oriented application architecture.",
    technologies: ["Flutter", "Dart", "REST API", "Firebase"],
    type: "Independent",
    visual: "healthcare",
  },
  {
    number: "02",
    title: "Cross-Platform Quiz App",
    category: "Independent Project",
    description:
      "A cross-platform quiz experience built with Flutter, focusing on reusable UI, application state, structured content, and a smooth mobile experience.",
    technologies: ["Flutter", "Dart", "GetX"],
    type: "Independent",
    visual: "quiz",
  },
  {
    number: "03",
    title: "Wire2WiFi",
    category: "Professional Work",
    description:
      "A professional B2B mobile solution for monitoring WiFi bandwidth and LAN/WAN infrastructure through a Flutter-based application.",
    technologies: ["Flutter", "Dart", "REST API"],
    type: "Professional",
    visual: "wire2wifi",
  },
  {
    number: "04",
    title: "LCA Solutions",
    category: "Professional Work",
    description:
      "A production software project developed professionally as part of a software engineering team.",
    technologies: ["Flutter", ".NET", "REST API"],
    type: "Professional",
    visual: "lca",
  },
  {
    number: "05",
    title: "LPS of USA",
    category: "Professional Work",
    description:
      "A restricted community mobile application built professionally with Flutter and a .NET backend. The platform is private and does not allow unrestricted public registration.",
    technologies: ["Flutter", ".NET", "REST API"],
    type: "Professional",
    visual: "lps",
  },
];

export const capabilities: Capability[] = [
  {
    id: "mobile",
    title: "Mobile",
    description:
      "Production-oriented cross-platform mobile applications with Flutter, responsive interfaces, reusable components, and structured application architecture.",
    technologies: ["Flutter", "Dart", "GetX", "Responsive UI"],
    icon: "mobile",
  },
  {
    id: "backend",
    title: "Backend",
    description:
      "API-driven backend systems and integrations focused on reliable data flow between mobile applications and server-side services.",
    technologies: [".NET", "ASP.NET Core", "REST API", "SQL Server"],
    icon: "backend",
  },
  {
    id: "cloud",
    title: "Cloud & Services",
    description:
      "Application services including authentication, notifications, cloud integrations, and supporting infrastructure for mobile products.",
    technologies: ["Firebase", "FCM", "Authentication", "Cloud Services"],
    icon: "cloud",
  },
  {
    id: "architecture",
    title: "Architecture",
    description:
      "Structured application development using reusable components, state management, API layers, DTOs, and maintainable project organization.",
    technologies: ["MVVM", "State Management", "DTO", "API Layer"],
    icon: "architecture",
  },
  {
    id: "data",
    title: "Data",
    description:
      "Working with structured application data, relational databases, API models, queries, and data-driven mobile experiences.",
    technologies: ["SQL Server", "MySQL", "JSON", "REST"],
    icon: "data",
  },
  {
    id: "engineering",
    title: "Engineering",
    description:
      "Development workflow covering source control, debugging, releases, application integration, and production deployment.",
    technologies: ["Git", "GitHub", "Debugging", "App Deployment"],
    icon: "engineering",
  },
];

export const buildSteps: BuildStep[] = [
  {
    number: "01",
    title: "Define",
    description:
      "Understand the product, users, requirements, and technical constraints before writing the first line of code.",
    label: "PRODUCT",
    icon: "define",
  },
  {
    number: "02",
    title: "Build",
    description:
      "Create responsive Flutter interfaces with reusable components, structured state management, and scalable application architecture.",
    label: "FLUTTER",
    icon: "build",
  },
  {
    number: "03",
    title: "Connect",
    description:
      "Connect the application to REST APIs and move structured data between the mobile application and backend services.",
    label: "REST API",
    icon: "connect",
  },
  {
    number: "04",
    title: "Engineer",
    description:
      "Develop backend services with .NET, business logic, authentication, API endpoints, and reliable data processing.",
    label: ".NET",
    icon: "engineer",
  },
  {
    number: "05",
    title: "Persist",
    description:
      "Work with structured data and relational databases to support the application's core workflows and information.",
    label: "DATABASE",
    icon: "persist",
  },
  {
    number: "06",
    title: "Ship",
    description:
      "Test, debug, integrate services, prepare releases, and move the finished product toward production.",
    label: "RELEASE",
    icon: "ship",
  },
];

export const experiences: ExperienceEntry[] = [
  {
    number: "01",
    period: "PROFESSIONAL",
    title: "Flutter Developer",
    type: "Mobile Engineering",
    description:
      "Developed and maintained production mobile applications using Flutter, working across UI implementation, state management, API integration, debugging, and application releases.",
    technologies: ["Flutter", "Dart", "GetX", "REST API"],
  },
  {
    number: "02",
    period: "PROFESSIONAL",
    title: "Backend Integration",
    type: "Full-Stack Mobile",
    description:
      "Worked with backend services and APIs to connect mobile applications with business logic, authentication, structured data, and server-side functionality.",
    technologies: [".NET", "REST API", "SQL", "JSON"],
  },
  {
    number: "03",
    period: "PROFESSIONAL",
    title: "Production Delivery",
    type: "Engineering",
    description:
      "Worked through real development cycles including debugging, third-party integrations, notifications, payments, testing, platform-specific issues, and mobile application deployment.",
    technologies: ["Firebase", "FCM", "Razorpay", "App Deployment"],
  },
];