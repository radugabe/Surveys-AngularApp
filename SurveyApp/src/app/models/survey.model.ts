export interface Question {
    text: string;
    options: string[];
}
  
export interface Survey {
    id: string;
    title: string;
    questions: {
      text: string;
      options: string[];
    }[];
    createdBy: string;
    isOpen: boolean;
    createdAt: string;
    autoCloseStartAt: string;
}
  
  