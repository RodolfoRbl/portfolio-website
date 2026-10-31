export type CareerEntry = {
  title: string;
  company: string;
  date: string;
  logo?: string;
  logoClass?: string;
  impact: string;
  highlights: string[];
};

export const career: CareerEntry[] = [
  {
    title: "AI Cloud Engineer",
    company: "Ford Motor Company",
    date: "Feb 2025 – Present",
    logo: "/logos/ford.png",
    logoClass: "ford-logo",
    impact:
      "Cut warranty insight latency from 24 hours to seconds across a platform serving 40M claims daily.",
    highlights: [
      "Built LLM multi-agent workflows for claims classification and root-cause analysis.",
      "Coordinated predictive data platform work spanning 100+ vehicle lines and four regions.",
      "Reduced cloud spend by 80% and tripled prediction throughput.",
    ],
  },
  {
    title: "Data Scientist Associate",
    company: "BBVA",
    date: "Dec 2022 – Feb 2025",
    logo: "/logos/bbva.png",
    logoClass: "bbva-logo",
    impact: "Raised monthly payroll-loan allocation by 42%, reaching more than $150M.",
    highlights: [
      "Applied genetic algorithms and linear programming to pricing and allocation.",
      "Built credit-default models and reusable Python data science and ETL tools.",
      "Supervised three data engineers; models contributed to 6% annual product sales.",
    ],
  },
  {
    title: "Senior Data Engineering Analyst",
    company: "Citi",
    date: "Jul 2021 – Dec 2022",
    logo: "/logos/citi.png",
    logoClass: "citi-logo",
    impact: "Reengineered 10+ data projects, reducing execution time by up to 35%.",
    highlights: [
      "Improved data quality and automated workflows across more than five departments.",
      "Led Python training for BI, regulatory reporting, and predictive modeling teams.",
    ],
  },
  {
    title: "Reinsurance Executive",
    company: "SUMMA Intermediario de Reaseguro",
    date: "Dec 2020 – Jul 2021",
    logo: "/logos/summa.png",
    logoClass: "summa-logo",
    impact: "Automated monthly processing, reducing delivery time from days to hours.",
    highlights: [
      "Automated premium and claims workflows.",
      "Created interactive dashboards to monitor reinsurance contracts.",
    ],
  },
  {
    title: "Social Service",
    company: "Tax Administration Service (SAT)",
    date: "Nov 2019 – Apr 2020",
    impact: "Registered, managed, and analyzed tax credit information.",
    highlights: ["Supported accurate tracking and review of tax credit records."],
  },
  {
    title: "Payroll Assistant",
    company: "ON Partners",
    date: "Jul 2017 – May 2018",
    impact: "Managed payroll records for more than 3,000 employees.",
    highlights: [
      "Built an automated Excel and VBA report to monitor employee schedules and locations.",
      "Helped teammates work faster by sharing advanced Word and Excel techniques.",
    ],
  },
];

export type Achievement = {
  type: string;
  title: string;
  metric: string;
  detail: string;
  description: string;
  category: "ai-math" | "engineering" | "leadership";
  tone: string;
};

export const achievements: Achievement[] = [
  {
    type: "REAL-TIME AI · FORD",
    title: "Real-Time Claims Intelligence",
    metric: "24h → seconds",
    detail: "from batch processing to inference",
    description:
      "LLM-powered multi-agent pipelines analyze and classify claims while supporting the wider warranty platform.",
    category: "ai-math",
    tone: "cat-ai",
  },
  {
    type: "PREDICTIVE DATA PLATFORM · FORD",
    title: "Doubling Forecast Coverage Across a Global Fleet",
    metric: "2× forecast coverage",
    detail: "40M daily claims · 100+ vehicle lines · 4 regions",
    description:
      "Coordinated Spark data platform work supporting predictive workloads across Ford’s global vehicle fleet.",
    category: "engineering",
    tone: "cat-engineering",
  },
  {
    type: "CLOUD EFFICIENCY · FORD",
    title: "More Predictions, Less Cloud Spend",
    metric: "−80% spend · 3× throughput",
    detail: "warranty prediction workloads",
    description:
      "Improved cloud efficiency while increasing the volume of predictions the platform could process.",
    category: "engineering",
    tone: "cat-engineering",
  },
  {
    type: "GENETIC ALGORITHMS · BBVA",
    title: "Genetic Algorithms for Higher Loan Allocation",
    metric: "+42% · $150M+",
    detail: "monthly allocation value",
    description:
      "Applied genetic algorithms and linear programming to payroll-loan pricing and allocation.",
    category: "ai-math",
    tone: "cat-optimization",
  },
  {
    type: "CREDIT MODELS · BBVA",
    title: "Credit Models That Reached Production",
    metric: "6% of annual product sales",
    detail: "supported by deployed models",
    description:
      "Deployed credit-default models for cards and personal loans, targeting a customer group with one-third the portfolio’s default rate.",
    category: "ai-math",
    tone: "cat-optimization",
  },
  {
    type: "DATA ENGINEERING · CITI",
    title: "Modernization of Data Projects",
    metric: "10+ projects · up to 35%",
    detail: "less execution time",
    description:
      "Reengineered data projects, strengthened production quality checks, and trained Python users across 5+ departments.",
    category: "leadership",
    tone: "cat-leadership",
  },
];

export type Project = {
  number: string;
  type: string;
  title: string;
  description: string;
  result: string;
  resultDetail: string;
  tags: string[];
  tone: string;
};

export const projects: Project[] = [
  {
    number: "03",
    type: "APPLIED AI · FORD",
    title: "From Daily Batches to Real-Time Claims Intelligence",
    description:
      "I helped move a daily claims workflow toward real-time insight, building LLM-powered multi-agent pipelines that analyze and classify claims while supporting the wider warranty platform.",
    result: "24h → seconds",
    resultDetail: "from batch processing to inference",
    tags: ["LLMs", "Multi-agent systems", "Real-time pipelines", "Claims intelligence"],
    tone: "project-ai",
  },
  {
    number: "04",
    type: "DATA PLATFORM · FORD",
    title: "A Spark Data Cube for 40M Daily Claims",
    description:
      "I coordinated a Spark-based Warranty Data Cube to support predictive workloads across vehicle lines and regions, while helping double forecast coverage.",
    result: "2× coverage",
    resultDetail: "40M daily claims · 100+ vehicle lines · 4 regions",
    tags: ["Spark", "Data modeling", "Forecasting", "Global collaboration"],
    tone: "project-data",
  },
  {
    number: "09",
    type: "MACHINE LEARNING · BBVA",
    title: "Credit-Risk Models for Cards and Personal Loans",
    description:
      "I deployed default-payment models for credit cards and personal loans, targeting a customer group with one-third the portfolio’s default rate.",
    result: "6%",
    resultDetail: "of annual product sales supported by the models",
    tags: ["Credit risk", "Predictive modeling", "Model deployment", "Customer targeting"],
    tone: "project-optimization",
  },
  {
    number: "02",
    type: "OPTIMIZATION · BBVA",
    title: "Genetic Algorithms for Loan Allocation",
    description:
      "I applied genetic algorithms and linear programming to improve payroll-loan pricing and allocation. I also supervised three data engineers automating production-ready models and pipelines.",
    result: "+42%",
    resultDetail: "monthly allocations · more than $150M",
    tags: ["Genetic algorithms", "Linear programming", "Python", "Team leadership"],
    tone: "project-leadership",
  },
  {
    number: "05",
    type: "DATA ENGINEERING · CITI",
    title: "Modernization of Data Projects",
    description:
      "I reengineered data projects, strengthened production quality checks, and helped teams across the business build confidence with Python automation.",
    result: "Up to 35%",
    resultDetail: "less execution time · teams across 5+ departments",
    tags: ["Python", "Data pipelines", "Quality controls", "Team enablement"],
    tone: "project-engineering",
  },
  {
    number: "06",
    type: "SERVERLESS AUTOMATION · AWS",
    title: "AWS Lambda Bots for Trading & Expense Tracking",
    description:
      "I deployed multi-purpose Telegram bots on AWS Lambda for trading, personal finance, expense logging, and customer-service workflows.",
    result: "AWS Lambda",
    resultDetail: "serverless bots for everyday tasks",
    tags: ["AWS Lambda", "Telegram bots", "Serverless", "Automation"],
    tone: "project-automation",
  },
];

export type ExpertiseArea = {
  title: string;
  items: string[];
  tone: string;
};

export const expertise: ExpertiseArea[] = [
  {
    title: "Data Engineering & Pipelines",
    items: [
      "Python",
      "SQL",
      "Spark / PySpark",
      "Apache Beam",
      "Airflow",
      "dbt",
      "ETL / ELT",
      "NumPy",
      "Pandas",
    ],
    tone: "skill-data",
  },
  {
    title: "Cloud Platforms & GCP",
    items: [
      "GCP",
      "BigQuery",
      "Dataflow",
      "Dataproc",
      "Cloud Storage",
      "Cloud Functions",
      "Cloud Scheduler",
      "AWS Lambda",
      "API Gateway",
      "S3",
      "DynamoDB",
    ],
    tone: "skill-cloud",
  },
  {
    title: "AI & Intelligent Systems",
    items: [
      "Machine learning",
      "LLMs",
      "Multi-agent systems",
      "NLP",
      "TensorFlow",
      "Keras",
      "Scikit-learn",
    ],
    tone: "skill-ai",
  },
  {
    title: "Optimization & Decision Science",
    items: [
      "Genetic algorithms",
      "Linear programming",
      "Loan allocation",
      "Pricing optimization",
      "Forecasting",
      "Credit-risk modeling",
    ],
    tone: "skill-optimization",
  },
  {
    title: "DevOps & Delivery",
    items: ["Terraform", "Git", "GitHub Actions", "CI/CD", "Cloud Build", "UNIX"],
    tone: "skill-devops",
  },
  {
    title: "Analytics & Reporting",
    items: ["Looker", "Power BI", "Matplotlib", "VBA", "JavaScript", "R"],
    tone: "skill-analytics",
  },
  {
    title: "Where I Put It to Work",
    items: [
      "Real-time claims intelligence",
      "Predictive platforms",
      "Credit risk",
      "Payroll-loan allocation",
      "Data modernization",
      "Workflow automation",
    ],
    tone: "skill-focus",
  },
  {
    title: "How I Work with Teams",
    items: [
      "Technical leadership",
      "Cross-functional collaboration",
      "Mentoring & training",
      "Stakeholder communication",
      "Project coordination",
    ],
    tone: "skill-collaboration",
  },
];

export const education = [
  {
    organization: "UNAM · DIPLOMA",
    title: "Investment Projects",
    detail: "Diploma program · Aug 2021 – Mar 2022",
    logo: "/logos/unam.png",
    logoClass: "unam-logo",
  },
  {
    organization: "UNAM · DEGREE",
    title: "Bachelor of Science in Actuarial Science",
    detail: "Statistics, probability, and financial risk.",
    logo: "/logos/unam.png",
    logoClass: "unam-logo",
  },
  {
    organization: "IBM · CERTIFICATE",
    title: "Data Science",
    detail: "IBM-certified in Data Science.",
    brand: "IBM",
    logoClass: "ibm-logo",
  },
  {
    organization: "ENGLISH · IELTS",
    title: "English Proficiency",
    detail: "Overall band score · 7.5",
    brand: "IELTS",
    logoClass: "ielts-logo",
  },
];

export const animationOptions = [
  {
    id: "nodes",
    number: "01",
    label: "Neural nodes",
    detail: "Connections awaken as signals move through the network.",
  },
  {
    id: "brain",
    number: "02",
    label: "Luminous brain",
    detail: "Electric pulses travel along luminous brain-like fibers.",
  },
  {
    id: "mesh",
    number: "03",
    label: "Neural mesh",
    detail: "An interactive 3D surface ripples with the data flow.",
  },
  {
    id: "waves",
    number: "04",
    label: "Particle waves",
    detail: "Particle bands bend gently toward the cursor.",
  },
] as const;

export type AnimationId = (typeof animationOptions)[number]["id"];
