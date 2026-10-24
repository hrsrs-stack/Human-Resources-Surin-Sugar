export interface StationInfo {
  id: number;
  title: string;
  category: string;
  targetGroup: string;
  duration: string;
  location: string;
  description: string;
  tips: string[];
  iconName: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'fasting' | 'documents' | 'health' | 'results';
}

export interface DepartmentSchedule {
  timeSlot: string;
  label: string;
  departments: string[];
  recommendedGroup: string;
  note: string;
}

export interface EmployeePrepProfile {
  empId?: string;
  name?: string;
  age: number;
  department: string;
  hasChronicCondition: boolean;
  isFemale: boolean;
  isPregnantOrPossible: boolean;
  isMenstruating: boolean;
}

export interface EligibleEmployee {
  id: number;
  empCode: string;
  prefix: string;
  firstName: string;
  lastName: string;
  fullName: string;
  departmentGroup: string;
  section: string;
  subDept: string;
  unit: string;
  position: string;
  isFemale: boolean;
  isFastingRequired: boolean;
  testCount: number;
  tests: string[];
  testCategories: string[];
  stations: number[];
}
