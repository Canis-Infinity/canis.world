export type CanisWorldEntry = {
  _id?: string
  title: string
  excerpt?: string
  content?: string
  category?: string
  mood?: string
  occurredAt?: string
  tags?: string[]
  images?: string[]
  featured?: boolean
  published?: boolean
  priority?: number
}

export type CanisWorldData = {
  status: {
    label: string
    mood: string
    doing: string
    location: string
    note: string
    completeness: number
  }
  profile: {
    displayName: string
    subtitle: string
    intro: string
    traits: string[]
  }
  content: {
    headerLinkLabel: string
    headerLinkUrl: string
    heroImage?: string
    heroEntryId?: string
    adultTitle: string
    adultDescription: string
    galleryBadge: string
    galleryTitle: string
    aboutBadge: string
    aboutTitle: string
    aboutDescription: string
  }
  faqs: Array<{
    _id?: string
    question: string
    answer: string
    priority?: number
  }>
  featureCards: Array<{
    _id?: string
    title: string
    description: string
    icon?: string
    priority?: number
  }>
  footer: {
    owner: string
    ownerUrl: string
    rightsText: string
  }
  entries: CanisWorldEntry[]
}
