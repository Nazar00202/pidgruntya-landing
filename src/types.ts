export interface NavLink {
  label: string;
  href: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: string; // lucide-react icon name
}

export interface ProcessStep {
  num: string;
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
