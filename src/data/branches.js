export const branches = [
  {
    id: "shiya-masjid",
    slug: "shiya-masjid",
    name: "Shiya Masjid Branch",
    tag: "MAIN BRANCH",
    address:
      "24/1, 24/2 (3rd & 4th floor), Ring Road, Shia Masjid Mor, Mohammadpur, Dhaka 1207",
    phone: "(+880) 1313-197435",
    tel: "+8801313197435",
    mapUrl: "https://maps.app.goo.gl/mkYiSXMa37XyR6CM9",
    mapEmbedQuery:
      "24/1, 24/2 Ring Road, Shia Masjid Mor, Mohammadpur, Dhaka 1207",
  },
  {
    id: "lalmatia",
    slug: "lalmatia",
    name: "Lalmatia Branch",
    tag: "EXPRESS HUB",
    address:
      "Lalmatia Shopping Center (2nd floor), Beside Fire Service & Civil Defence, Lalmatia, Dhaka",
    phone: "(+880) 1313-197427",
    tel: "+8801313197427",
    mapUrl: "https://maps.app.goo.gl/HTaksjpiAbUEurxYA",
    mapEmbedQuery: "Lalmatia Shopping Center, Lalmatia, Dhaka",
  },
];

export const getBranchBySlug = (slug) =>
  branches.find((branch) => branch.slug === slug);
