import type { CanisWorldData } from "@/lib/canis-world-types"

export const fallbackCanisWorld: CanisWorldData = {
  status: {
    label: "剛散步回來",
    mood: "有點累但尾巴還在晃",
    doing: "整理出遊照片",
    location: "九宵基地",
    note: "今天的 Canis 正在把日常放回自己的窩裡。",
    completeness: 100,
  },
  profile: {
    displayName: "Canis",
    subtitle: "人型犬的日常基地",
    intro:
      "這裡是 Canis 的日常棲地。不是正式作品集，也不是商業名片，只是一些生活片段、出遊照片、犬化狀態和慢慢被整理好的自己。",
    traits: ["人型犬", "日常紀錄", "出遊照片", "基地生活"],
  },
  content: {
    headerLinkLabel: "九宵基地",
    headerLinkUrl: "https://link.canis.world",
    heroImage: "",
    heroEntryId: "",
    adultTitle: "這裡是成年人的日常基地",
    adultDescription:
      "內容尺度會隨日記而變化；公開分享與轉載前，請先尊重 Canis 的界線。",
    galleryBadge: "照片牆",
    galleryTitle: "最近被帶回基地的畫面",
    aboutBadge: "關於這裡",
    aboutTitle: "Canis 的生活，不是另一份履歷",
    aboutDescription:
      "正式作品留在 iistw.com，這裡專心收下人型犬的日常、出遊、碎念與不定期出沒紀錄。",
  },
  faqs: [
    {
      question: "Canis World 和 iistw.com 有什麼不同？",
      answer:
        "iistw.com 是正式作品與身份的入口；Canis World 則比較靠近生活本身，留下角色狀態、照片和當下的心情。",
      priority: 1,
    },
    {
      question: "這裡多久更新一次？",
      answer:
        "沒有固定班表。想記下來的時候就更新，讓頁面跟著 Canis 的生活節奏走。",
      priority: 2,
    },
    {
      question: "要去哪裡找到其他出沒地點？",
      answer: "社群與外部平台都整理在 link.canis.world。",
      priority: 3,
    },
  ],
  featureCards: [
    {
      title: "九宵基地",
      description: "日常、碎念、照片和角色狀態都收在這裡。",
      icon: "home",
      priority: 1,
    },
    {
      title: "出沒入口",
      description: "社群與外部平台放在 link.canis.world。",
      icon: "map-pin",
      priority: 2,
    },
    {
      title: "慢慢更新",
      description: "這裡不趕進度，只留下真實生活的節奏。",
      icon: "calendar",
      priority: 3,
    },
  ],
  footer: {
    owner: "Canis",
    ownerUrl: "https://canis.world/",
    rightsText: "保留所有權利",
  },
  entries: [
    {
      title: "七月的外出日",
      excerpt: "帶著一點熱氣、一點興奮，還有很多想留下來的畫面。",
      content:
        "日常不是每次都要很盛大，有時只是走出去、吃點東西、拍幾張照片，再把那天的氣味帶回基地。",
      category: "出遊",
      mood: "開心",
      occurredAt: "2026-07-26",
      tags: ["散步", "照片", "夏天"],
      images: [
        "/daily/2026-07-26/LINE_ALBUM_20260726_260727_1.jpg",
        "/daily/2026-07-26/LINE_ALBUM_20260726_260727_12.jpg",
        "/daily/2026-07-26/LINE_ALBUM_20260726_260727_14.jpg",
      ],
      featured: true,
      published: true,
      priority: 1,
    },
    {
      title: "補給與窩邊小事",
      excerpt: "普通的一天也可以很像 Canis。",
      content:
        "把出門的照片收起來，給自己一點安靜時間。這種小小的紀錄，可能才是基地最穩定的形狀。",
      category: "日常",
      mood: "安靜",
      occurredAt: "2026-07-25",
      tags: ["補給", "基地", "生活"],
      images: [
        "/daily/2026-07-25/3CD93EE3-D4D9-4524-BED0-31A335A2D191.jpg",
        "/daily/2026-07-25/LINE_ALBUM_20260725_260727_4.jpg",
      ],
      featured: false,
      published: true,
      priority: 2,
    },
  ],
}
