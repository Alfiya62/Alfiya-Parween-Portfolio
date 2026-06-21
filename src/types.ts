export interface Project {
  id: string;
  title: string;
  subtitle: string;
  tech: string[];
  points: string[];
  type: 'mern' | 'deep_learning';
}

export interface EducationItem {
  institution: string;
  degree: string;
  duration: string;
  location: string;
  metric: string;
}

export interface SkillGroup {
  category: string;
  skills: string[];
  icon: string;
}

export interface Certification {
  title: string;
  issuer: string;
  date?: string;
  link?: string;
}

export interface Donor {
  id: string;
  name: string;
  bloodGroup: string;
  status: 'Ready' | 'Donated' | 'Deferred';
  lastDonationDaysAgo: number;
}

export interface BloodRequest {
  id: string;
  hospital: string;
  bloodGroup: string;
  urgency: 'Critical' | 'Urgent' | 'Standard';
  status: 'Pending' | 'Approved' | 'Delivered';
  units: number;
}
