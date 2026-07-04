export interface CV {
  basics: Basics
  work: Array<Work>
  volunteer: Array<Volunteer>
  education: Array<Education>
  awards: Array<Awards>
  certificates: Array<Certificates>
  publications: Array<Publications>
  skills: Array<Skills>
  languages: Array<Languages>
  interests: Array<Interests>
  references: Array<References>
  projects: Array<Projects>
  certifications?: Certification[]
  tools?: Tool[]
}

export interface Basics {
  name: string
  label: string
  image: string
  email: string
  phone: string
  url: string
  cv?: string
  summary: string
  location: Location
  profiles: Array<Profiles>
}

interface Location {
  address: string
  postalCode: string
  city: string
  countryCode: string
  region: string
}

interface Profiles {
  network: string
  username: string
  url: string
}

export interface Work {
  name: string
  position: string
  url?: string
  startDate: DateStr
  endDate: DateStr | null
  summary: string
  highlights: Highlight
}

type DateStr = string

interface Volunteer {
  organization: string
  position: string
  url: string
  startDate: DateStr
  endDate: DateStr
  summary: string
  highlights: Highlight
}

export interface Skills {
  name: string
  level: string
  keywords: Array<string>
}

interface Awards {
  title: string
  date: string
  awarder: string
  summary: string
}

interface Certificates {
  name: string,
  date: DateStr,
  issuer: string,
  url: string
}

interface Publications {
  name: string
  publisher: string
  releaseDate: DateStr
  url: string
  summary: string
}

export interface Education {
  institution: string
  url?: string
  area: string
  studyType: string
  startDate: DateStr
  endDate: DateStr | null
  score?: string
  courses?: Array<string>
}

interface Languages {
  language: Language
  fluency: string
}

type Language =
  "Spanish"
  | "English"
  | "German"
  | "France"
  | "Italian"
  | "Korean"
  | "Portuguese"
  | "Chinese"
  | "Arabic"
  | "Dutch"
  | "Finnish"
  | "Russian"
  | "Turkish"
  | "Hindi"
  | "Bengali"
  | string

export interface Projects {
  name: string
  isActive: boolean
  description: string
  highlights: Highlight
  url?: string
  github?: string
  images?: string[]
  techStack?: string[]
  role?: string
  type?: string
}

interface Interests {
  name: string
  keywords: Array<string>
}

interface References {
  name: string
  reference: string
}

type Highlight = Array<string>

type images = Array<string>

// ── Type extensions for DevOps/Blockchain portfolio ──

export interface Certification {
  name: string
  date: string
  issuer: string
  url?: string
  credentialId?: string
}

export interface Tool {
  name: string
  category: string
  level?: string
}