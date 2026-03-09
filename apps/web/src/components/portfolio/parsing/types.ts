export interface ExperienceEntry {
    role: string;
    company: string;
    period: string;
    desc: string;
}

export interface MissingRequired {
    id: string;
    title: string;
    desc: string;
    placeholder: string;
}

export interface OrphanedData {
    id: string;
    title: string;
    content: string;
}

export interface PersonalDetails {
    fullName: string;
    email: string;
    github: string;
    linkedin: string;
    summary: string;
}

export interface ReconciliationData {
    progress: number;
    unresolvedWarnings: number;
    extraSections: number;
    accuracy: string;
    personalDetails: PersonalDetails;
    skills: string[];
    experience: ExperienceEntry[];
    missingRequired: MissingRequired[];
    orphanedData: OrphanedData[];
}
