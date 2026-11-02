export type CareerEntry = {
  title: string;
  company: string;
  date: string;
  area: string;
  logo?: string;
  logoClass?: string;
  highlights: string[];
};

export const career: CareerEntry[] = [
  {
    title: "AI Cloud Engineer",
    company: "Ford Motor Company",
    date: "Feb 2025 – Present",
    area: "Global Data Insights & Analytics",
    logo: "/logos/ford.png",
    logoClass: "ford-logo",
    highlights: [
      "Built LLM-powered multi-agent workflows for claims classification and root-cause analysis.",
      "Enabled real-time warranty insights, cutting latency from 24 hours to seconds on a platform processing 40M+ claims daily.",
      "Advanced predictive data platform capabilities across 100+ vehicle lines and four regions.",
      "Reduced cloud spend by 80% and tripled prediction throughput.",
    ],
  },
  {
    title: "Data Scientist Associate",
    company: "BBVA",
    date: "Dec 2022 – Feb 2025",
    area: "Credit Intelligence & Decision Science",
    logo: "/logos/bbva.png",
    logoClass: "bbva-logo",
    highlights: [
      "Increased monthly payroll-loan placement by 42%, generating $150M in incremental monthly placement.",
      "Deployed credit-risk models that contributed to 10% of annual credit card sales.",
      "Applied genetic algorithms and linear programming to pricing and allocation.",
      "Built credit-default models to strengthen lending decisions.",
      "Developed reusable Python data science and ETL tools to scale analytical workflows.",
      "Led model production validation with Data Engineers, adapting models to BBVA’s platform and monthly workflows.",
    ],
  },
  {
    title: "Senior Data Engineering Analyst",
    company: "Citi",
    date: "Jul 2021 – Dec 2022",
    area: "Data Engineering",
    logo: "/logos/citi.png",
    logoClass: "citi-logo",
    highlights: [
      "Reengineered 10+ data projects to strengthen production data quality and automation.",
      "Scaled automated workflows across more than five departments.",
      "Led Python training for BI, regulatory reporting, and predictive modeling teams.",
    ],
  },
  {
    title: "Reinsurance Executive",
    company: "SUMMA Intermediario de Reaseguro",
    date: "Dec 2020 – Jul 2021",
    area: "Insurance Claims Intelligence",
    logo: "/logos/summa.png",
    logoClass: "summa-logo",
    highlights: [
      "Streamlined monthly claims processing, cutting delivery cycles from days to hours.",
      "Digitized premium and claims workflows to improve processing consistency and operational control.",
      "Created interactive dashboards to monitor reinsurance contracts.",
    ],
  },
  {
    title: "Social Service",
    company: "Tax Administration Service (SAT)",
    date: "Nov 2019 – Apr 2020",
    area: "Community Outreach",
    highlights: [
      "Registered, managed, and analyzed tax credit information.",
      "Supported accurate tracking and review of tax credit records.",
    ],
  },
  {
    title: "Payroll Assistant",
    company: "ON Partners",
    date: "Jul 2017 – May 2018",
    area: "Payroll Operations",
    highlights: [
      "Managed payroll records for more than 3,000 employees.",
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
    title: "Pioneering Real-Time Claims Processing",
    metric: "40M+ claims per day",
    detail: "continuously updated warranty insights",
    description:
      "Co-developed and brought Ford’s real-time claims data architecture to production, enabling continuously updated warranty insights.",
    category: "ai-math",
    tone: "cat-ai",
  },
  {
    type: "PREDICTIVE FORECASTING · FORD",
    title: "Expanding Warranty Forecast Granularity",
    metric: "Claim cost predictions at 4 levels",
    detail: "vehicle line · model year · part · function",
    description:
      "Expanded warranty claim cost predictions across vehicle lines, model years, parts, and vehicle functions.",
    category: "engineering",
    tone: "cat-engineering",
  },
  {
    type: "CLOUD EFFICIENCY · FORD",
    title: "Cloud Savings at Scale",
    metric: "80% lower cloud spend",
    detail: "serverless jobs that scale to each task",
    description:
      "Reengineered data pipelines into serverless jobs that automatically scale computing resources to each task.",
    category: "engineering",
    tone: "cat-engineering",
  },
  {
    type: "LOAN GROWTH · BBVA",
    title: "Scaling Payroll Lending",
    metric: "+$150M in monthly placement",
    detail: "+42% monthly payroll-loan placement",
    description:
      "Increased monthly payroll-loan placement by 42% through data-driven interest-rate discount optimization.",
    category: "ai-math",
    tone: "cat-optimization",
  },
  {
    type: "CREDIT MODELS · BBVA",
    title: "Growing Card Sales with Low-Risk Customer Models",
    metric: "10% of annual card sales",
    detail: "customers selected with one-third the portfolio default rate",
    description:
      "Customers selected by the models had a default rate one-third that of the overall portfolio, and their card contracts accounted for 10% of annual sales.",
    category: "ai-math",
    tone: "cat-optimization",
  },
  {
    type: "DATA GOVERNANCE · CITI",
    title: "Modernizing Manual Workflows for Greater Control",
    metric: "10+ manual workflows remediated",
    detail: "across business teams",
    description:
      "Remediated more than 10 end-user computing (EUC) processes, including Excel workbooks, Visual Basic tools, manual reports, and Python scripts. Added failure monitoring, data validation, access controls, approvals, and documentation to bring these workflows under greater control.",
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
    number: "01",
    type: "AGENTIC AI · FORD",
    title: "Agentic Pipelines for Real-Time Claims Intelligence",
    description:
      "Helped pioneer real-time claims data processing and bring the architecture to production alongside a colleague. Built production pipelines that orchestrate multi-agent AI workflows and machine-learning models using enriched warranty data. The system continuously classifies claims, surfaces likely causes, and groups related issues into intelligent problem objects, clear groupings of similar claims. This gives Ford’s global plant teams timely, organized insight into issues across vehicles, parts, and vehicle functions.",
    result: "40M+ claims",
    resultDetail: "processed daily with continuously updated insights",
    tags: ["Agentic AI", "Multi-agent systems", "Real-time pipelines", "Claims intelligence"],
    tone: "project-ai",
  },
  {
    number: "02",
    type: "PREDICTIVE FORECASTING · FORD",
    title: "Improving Warranty Reserve Allocation with Claim Cost Forecasts",
    description:
      "Modularized production forecasting pipelines to predict warranty claim costs at four levels: vehicle line, model year, part, and vehicle function. The results flow into a dashboard that supports monthly warranty reserve adjustments and annual planning.",
    result: "4 prediction levels",
    resultDetail: "vehicle line · model year · part · function",
    tags: ["Claim cost forecasting", "Warranty reserves", "Data pipelines", "Forecasting"],
    tone: "project-data",
  },
  {
    number: "03",
    type: "SERVERLESS DATA ENGINEERING · FORD",
    title: "Scaling Prediction Pipelines with Serverless Processing",
    description:
      "Redesigned data pipelines to split serial workloads into smaller, parallel serverless jobs. Each job scales its computing resources to the task, reducing idle capacity and unnecessary processing while supporting more prediction workloads.",
    result: "80% lower cloud spend",
    resultDetail: "serverless resources scaled to each workload",
    tags: ["Serverless", "Parallel processing", "Cloud efficiency", "Data pipelines"],
    tone: "project-engineering",
  },
  {
    number: "04",
    type: "OPTIMIZATION · BBVA",
    title: "Optimizing Interest-Rate Discounts to Grow Payroll Lending",
    description:
      "Designed and analyzed discount experiments and models to estimate each customer’s likelihood of taking a loan at different interest-rate discounts. Used genetic algorithms to find models with strong predictive performance while making discount size an influential factor in customer decisions. Then used linear programming to select discount levels that increased loan placement while preserving the campaign’s margin.",
    result: "+42%",
    resultDetail: "+$150M in monthly placement",
    tags: ["Genetic algorithms", "Price sensitivity", "Linear programming", "Loan allocation"],
    tone: "project-optimization",
  },
  {
    number: "05",
    type: "CREDIT RISK · BBVA",
    title: "Expanding Credit Access Through Predictive Risk Models",
    description:
      "Led model delivery from feature development through production validation. Developed features capturing customer behavior, transaction activity, and product usage, then applied model scores and risk thresholds to identify lower-risk customers for monthly card offers. Customers selected by the models had a default rate one-third that of the overall portfolio, and their card contracts accounted for 10% of annual sales. Validated the code, coordinated testing, adapted the models to BBVA’s platform, and worked with Data Engineers during parallel production runs and migration validation.",
    result: "10% of annual card sales",
    resultDetail: "customers selected with one-third the portfolio default rate",
    tags: ["Credit risk", "Feature engineering", "Model deployment", "Customer targeting"],
    tone: "project-leadership",
  },
  {
    number: "06",
    type: "DATA GOVERNANCE · CITI",
    title: "From Manual EUCs to Governed Data Workflows",
    description:
      "Coordinated the remediation of more than 10 end-user computing (EUC) processes across business teams, including workflows supporting regulatory reporting. Replaced selected Excel, Visual Basic, manual-reporting, and unoptimized Python workflows with standardized Python and SQL solutions. Designed and built replacements directly while guiding users through remediation of other workflows. Added failure monitoring, data validation, access controls, approval steps, and documentation to move these workflows into secure, monitored enterprise operations.",
    result: "10+ EUCs remediated",
    resultDetail: "monitored, standardized workflows across business teams",
    tags: ["Python", "SQL", "Workflow Automation", "Data Governance"],
    tone: "project-engineering",
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

export type AnimationId = "neuron";
