/**
 * Site content — ported from the old Hugo `data/*.yml` into typed data.
 * Editing content here is type-checked at build time.
 */

export const hero = {
  eyebrow: "Data Architect · Solutions Architect",
  titleLead: "Reliable data,",
  titleEmphasis: "built to scale.",
  intro:
    "Hi, I'm Anh — a Solutions Architect at Databricks. I help enterprises modernize their data platforms on the lakehouse, design clean pipelines, honest tradeoffs, and systems that hold up in production at scale.",
  resumeUrl: "https://resume-anhcodes.firebaseapp.com/",
};

export const about = {
  eyebrow: "About",
  title: "Curious engineer, lifelong learner, nature wanderer.",
  body: "I'm an engineer with a deep curiosity for how things work and a love for building systems that last. By night, I'm tinkering with new tools and chasing the next thing to learn. And when I step away from the keyboard, you'll find me out on a trail, biking around Lake Washington, or camping somewhere in the Pacific Northwest.",
  image: "/images/logo-noborder.png",
};

export type Role = {
  title: string;
  org: string;
  period: string;
  summary: string;
};

export const experience: Role[] = [
  {
    title: "Specialist Solutions Architect",
    org: "Databricks",
    period: "2024 — Present",
    summary:
      "Lead technical strategy and execution for enterprise data modernization, partnering with strategic customers to deliver end-to-end solutions across architectural design, data engineering, big data streaming, and model deployment on the Databricks lakehouse.",
  },
  {
    title: "Sr. Specialist Solutions Engineer",
    org: "Databricks",
    period: "2023 — 2024",
    summary:
      "Guided customers through successful enterprise data modernization — from architecture to data engineering to model deployment — using the lakehouse, big data streaming, and cloud data platform products.",
  },
  {
    title: "Software Engineer",
    org: "Microsoft",
    period: "2022 — 2023",
    summary:
      "Built data ingestion pipelines and managed the back-end data platform (lakehouse) on Azure and AWS for a video-powered social learning platform owned by Microsoft.",
  },
  {
    title: "Software Engineer",
    org: "Walmart Global Tech",
    period: "2020 — 2022",
    summary:
      "Built and maintained the back-end data solution for an end-to-end analytical supply chain web app tracking inventory and transportation from suppliers to stores across international markets.",
  },
];

export type Skill = { title: string; percent: number };

export const skills: Skill[] = [
  { title: "Data Engineering", percent: 90 },
  { title: "Databricks", percent: 90 },
  { title: "Python · Spark · SQL", percent: 90 },
  { title: "Databases", percent: 90 },
  { title: "Linux & Shell", percent: 80 },
  { title: "Data Streaming", percent: 70 },
  { title: "GenAI", percent: 60 },
  { title: "MLflow", percent: 60 },
];

export type Project = {
  title: string;
  service: string;
  description: string;
  thumbnail: string;
  href: string;
};

export const projects: Project[] = [
  {
    title: "Lakebase POC Accelerator",
    service: "Lakebase · OLTP · Reverse ETL",
    description:
      "A Python accelerator that streamlines testing and deployment of customer OLTP workloads to Lakebase — Databricks' managed Postgres — with a focus on reverse ETL use cases.",
    thumbnail: "/images/portfolio/lakebase.jpeg",
    href: "https://github.com/databricks-solutions/lakebase-poc-accelerator",
  },
  {
    title: "Metimur — Databricks SQL Benchmark Accelerator",
    service: "Performance Engineering · Benchmarking",
    description:
      "A Python-based accelerator that streamlines data generation and query performance evaluation across Databricks SQL warehouse types. Automated workflows, TPC-DS/TPC-H support, and an AI/BI metrics dashboard.",
    thumbnail: "/images/portfolio/seattle.jpeg",
    href: "https://github.com/anhhchu/metimur",
  },
  {
    title: "Predict Churn of a Music Hosting Service",
    service: "Spark ML · Prediction",
    description:
      "Analyzed customer activity for a music service using Spark DataFrame and Spark SQL on a 247.6 MB dataset in IBM Watson Studio. Built an ML pipeline with Spark ML reaching 0.74 F1 and 0.8 accuracy.",
    thumbnail: "/images/portfolio/predictchurn.jpeg",
    href: "https://github.com/anhhchu/Sparkify",
  },
  {
    title: "Flower Classification with PyTorch",
    service: "Deep Learning · Classification",
    description:
      "A neural network trained on ~6.5k images across 102 flower species using torchvision pre-trained models (VGG16, VGG19, DenseNet121), reaching 89% accuracy on the test set.",
    thumbnail: "/images/portfolio/deep_learning.jpeg",
    href: "https://github.com/anhhchu/Deep-Learning-Image-Classifier-Application-with-Pytorch",
  },
  {
    title: "Stock Price Prediction",
    service: "Deep Learning · Prediction",
    description:
      "Time-series deep learning models — RNN, LSTM, and GRU — built for stock price prediction.",
    thumbnail: "/images/portfolio/stockprice.jpeg",
    href: "https://github.com/anhhchu/python_trading",
  },
];

export type Testimonial = { name: string; role: string; comment: string };

export const testimonials: Testimonial[] = [
  {
    name: "Kevin Marx",
    role: "Principal Engineering Manager @ Microsoft",
    comment:
      "Anh is an amazing person and engineer. In her time on my team, she had immediate impact moving critical projects forward. As an engineering lead on data lake and analytics infrastructure, she quickly took charge and worked effectively with engineering and leadership stakeholders to deliver a high-quality product. She would be a high-performing addition to any engineering team, and I cannot recommend her enough.",
  },
  {
    name: "Omar Venado",
    role: "Head of ML and Backend Services @ Microsoft",
    comment:
      "Anh is one of the most tenacious engineers I've worked with. A big data expert who is unafraid to challenge the status quo, break conventional boundaries, and raise engineering standards. She's a creative thinker, team player, and one of those engineers who not only delivers results but uplifts the entire team.",
  },
  {
    name: "Shaomeng Zhang",
    role: "Principal Engineering Manager @ Microsoft",
    comment:
      "Anh is one of the most resourceful engineers I've worked with outside of my team. She redesigned our data syncing pipeline and migrated our analytics stack from AWS into a lakehouse on Azure. She's knowledgeable about data engineering and curious about backend engineering and product making in general. Any team would be lucky to have her.",
  },
  {
    name: "Lana Baturyski",
    role: "Senior Program Manager @ Microsoft",
    comment:
      "Anh is not afraid of challenges and ambiguity. Step by step she uncovers problems and solves them. She amazes me with her ability to think outside the box — always aligning her technical work with business needs by collaborating with marketing, analytics, and product. She truly owns projects end to end.",
  },
  {
    name: "Sudy Bharadwaj",
    role: "VP Strategic Engagements @ SAP",
    comment:
      "Anh very quickly became a go-to member of a new team. She exhibits a tremendous combination of aptitude, teamwork, work ethic, professionalism, leadership, and technical acumen. She took on critical tasks and never disappointed — only over-achieved. I'm 100% confident anyone can throw any task at her and she'll deliver better than expected.",
  },
];

export const contact = {
  eyebrow: "Contact",
  title: "Let's build something reliable.",
  body: "Have a data platform problem, an interesting role, or just want to talk shop about Spark and lakehouses? My inbox is open.",
  email: "anhhchu12@gmail.com",
};

export const socials = [
  { label: "GitHub", href: "https://github.com/anhhchu" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/anhhchu/" },
  { label: "dev.to", href: "https://dev.to/anhcodes" },
];
