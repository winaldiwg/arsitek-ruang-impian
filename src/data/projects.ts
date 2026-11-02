import sinarDago from "@/assets/p-sinar-dago.jpg";
import greenTerrace from "@/assets/p-green-terrace.jpg";
import duskFloor from "@/assets/p-dusk-floor.jpg";
import courtyard from "@/assets/p-courtyard.jpg";
import woodenPath from "@/assets/p-wooden-path.jpg";
import morningHome from "@/assets/p-morning-home.jpg";
import warmFamily from "@/assets/p-warm-family.jpg";
import cornerCoffee from "@/assets/p-corner-coffee.jpg";
import sereneBedroom from "@/assets/p-serene-bedroom.jpg";
import creativeStudio from "@/assets/p-creative-studio.jpg";
import studioDesk from "@/assets/studio-desk.jpg";

export type Category = "Residential" | "Interior";
export type Region = "Bandung" | "Jabodetabek";

export interface Project {
  slug: string;
  name: string;
  location: string;
  region: Region;
  year: number;
  area: string;
  style: string;
  category: Category;
  image: string;
  brief: string;
  challenge: string;
  solution: string;
  materials: string[];
  gallery: string[]; // captions
  testimonial?: { quote: string; author: string };
}

export const WHATSAPP_NUMBER = "6281200000000";
export const WHATSAPP_MESSAGE =
  "Hello Arkana Studio, I would like to consult about my home/interior plan.";
export const whatsappUrl = (msg = WHATSAPP_MESSAGE) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

export const studioDeskImage = studioDesk;

export const projects: Project[] = [
  {
    slug: "sinar-dago-house", name: "Sinar Dago House", location: "Dago, Bandung", region: "Bandung",
    year: 2024, area: "180 m²", style: "Modern tropical", category: "Residential", image: sinarDago,
    brief: "A family with two children and grandparents living together wanted a spacious, cool house with lively shared spaces.",
    challenge: "A sloping site with nearly three meters of level difference, and a dense neighborhood that limited side openings.",
    solution: "The building mass steps down with the contour. A central void brings in light from above and creates cross-ventilation. The family room and kitchen open to a rear terrace overlooking the valley.",
    materials: ["Andesite stone", "Teak wood", "Exposed plaster", "Glass"],
    gallery: ["Facade", "Central void", "Family room", "Kitchen", "Master bedroom", "Floor plans"],
  },
  {
    slug: "green-terrace-house", name: "Green Terrace House", location: "Cimahi", region: "Bandung",
    year: 2023, area: "120 m²", style: "Tropical minimalist", category: "Residential", image: greenTerrace,
    brief: "A young couple with one child wanted a single-story home that is easy to maintain and child-friendly.",
    challenge: "A plot only 8 meters wide and a limited budget, yet the home still had to feel open and green.",
    solution: "A small inner garden at the center of the house brings light and air to surrounding rooms. A wide terrace doubles as a play area and an extra living room.",
    materials: ["Exposed brick", "Timber frame", "Terrazzo floor", "Local plants"],
    gallery: ["Front terrace", "Inner garden", "Dining area", "Child's room", "Service area", "Floor plan"],
    testimonial: { quote: "Our budget was limited, but Arkana never made us feel we had to compromise on feeling. The small garden in the middle of the house is our favorite part.", author: "Maya & Reza" },
  },
  {
    slug: "dusk-floor-house", name: "Dusk Floor House", location: "BSD City, South Tangerang", region: "Jabodetabek",
    year: 2024, area: "240 m²", style: "Warm modern", category: "Residential", image: duskFloor,
    brief: "A family that often hosts guests wanted a large gathering space that still feels warm and not stiff.",
    challenge: "Combining a large open space with bedroom privacy upstairs, within a housing estate with building height limits.",
    solution: "The ground floor flows as one space from family room to dining and kitchen, with large folding doors to a backyard with a small pond. Bedrooms are grouped upstairs with a balcony shaded by a timber screen.",
    materials: ["Wood", "Natural stone", "Exposed concrete", "Glass"],
    gallery: ["Family room", "Kitchen and island", "Back pond", "Balcony", "Master bedroom", "Floor plan"],
  },
  {
    slug: "courtyard-house", name: "Courtyard House", location: "Cibubur, East Jakarta", region: "Jabodetabek",
    year: 2022, area: "200 m²", style: "Contemporary tropical", category: "Residential", image: courtyard,
    brief: "The owner wanted a cool home that does not rely on air conditioning all day.",
    challenge: "Hot, humid Jabodetabek weather and a plot receiving strong western sun.",
    solution: "An open courtyard in the middle acts as the building's lungs. Wide roof overhangs and screens on the west side block heat, while cross openings keep air moving.",
    materials: ["Brick", "Ironwood (ulin)", "Glass", "Black steel"],
    gallery: ["Central courtyard", "Open corridor", "Dining room", "Bedroom", "Screen detail", "Floor plan"],
  },
  {
    slug: "wooden-path-house", name: "Wooden Path House", location: "Lembang, West Bandung", region: "Bandung",
    year: 2025, area: "150 m²", style: "Natural rustic modern", category: "Residential", image: woodenPath,
    brief: "A weekend retreat for an extended family, with a calm mountain atmosphere.",
    challenge: "Cold temperatures and high humidity, and the wish for the house to blend with the surrounding garden.",
    solution: "A tall roof with a timber ceiling creates a warm main space. Large windows frame the garden, and a small fireplace becomes the gathering point. A stone path connects the house to a guest pavilion.",
    materials: ["Wood", "River stone", "Shingle roof", "Glass"],
    gallery: ["Main hall", "Fireplace", "Garden windows", "Pavilion", "Loft bedroom", "Floor plan"],
  },
  {
    slug: "morning-home-apartment", name: "Morning Home Apartment", location: "Setiabudi, Bandung", region: "Bandung",
    year: 2024, area: "65 m²", style: "Japandi", category: "Interior", image: morningHome,
    brief: "A young professional wanted an apartment that feels calm, tidy, and not cramped.",
    challenge: "Lots of belongings in limited space, and a unit with windows on only one side.",
    solution: "A cream and light-wood palette reflects light. Hidden storage is built into the walls, and a slatted partition separates the sleeping area without blocking daylight.",
    materials: ["Oak wood", "Linen", "Rattan", "Textured paint"],
    gallery: ["Living room", "Kitchen", "Work area", "Bedroom", "Storage detail", "Floor plan"],
  },
  {
    slug: "warm-family-room", name: "Warm Family Room", location: "Kemang, South Jakarta", region: "Jabodetabek",
    year: 2023, area: "45 m²", style: "Warm minimalist", category: "Interior", image: warmFamily,
    brief: "Renovate a family room to be comfortable for watching TV, reading, and gathering.",
    challenge: "The old room was dark, full of separate furniture, and had no place for a book collection.",
    solution: "Built-in shelving along the wall unifies storage, the TV area, and a small desk. Layered lighting (concealed, reading, and accent lights) creates a warm evening mood.",
    materials: ["Walnut veneer", "Marble", "Woven fabric", "Brass"],
    gallery: ["Family room", "Built-in shelving", "Reading nook", "Lighting detail", "Sketch"],
  },
  {
    slug: "corner-coffee-cafe", name: "Corner Coffee Café", location: "Braga, Bandung", region: "Bandung",
    year: 2023, area: "80 m²", style: "Natural industrial", category: "Interior", image: cornerCoffee,
    brief: "The café owner wanted an interior with strong character that is comfortable for working long hours.",
    challenge: "An old colonial-style building whose structure could not be altered much.",
    solution: "Original brick walls were kept as the main backdrop. A reclaimed-wood bar, black steel frames, and pendant lighting create a warm atmosphere. Seating zones are divided into a communal table, corner sofa, and window bench.",
    materials: ["Exposed brick", "Black steel", "Reclaimed wood", "Leather"],
    gallery: ["Bar area", "Communal table", "Window corner", "Lighting detail", "Facade", "Floor plan"],
    testimonial: { quote: "The old brick wall I once considered a problem became the café's identity. Customers often say this place feels as warm as home.", author: "Mr. Tommy Wijaya" },
  },
  {
    slug: "serene-master-bedroom", name: "Serene Master Bedroom", location: "Summarecon Bekasi", region: "Jabodetabek",
    year: 2024, area: "30 m²", style: "Calm minimalist", category: "Interior", image: sereneBedroom,
    brief: "A couple wanted a master bedroom that feels like a quiet boutique hotel.",
    challenge: "A narrow rectangular room that had to fit a walk-in closet and a reading area.",
    solution: "The walk-in closet is placed behind the timber headboard panel. A built-in bench sits by the window as a reading spot. Soft earthy tones and natural textures keep the mood serene.",
    materials: ["Wood panels", "Textured wallpaper", "Wool carpet", "Linen"],
    gallery: ["Bed", "Walk-in closet", "Reading nook", "Panel detail", "Floor plan"],
  },
  {
    slug: "creative-studio-office", name: "Creative Studio Office", location: "Bintaro, South Tangerang", region: "Jabodetabek",
    year: 2025, area: "100 m²", style: "Natural modern", category: "Interior", image: creativeStudio,
    brief: "A small creative studio wanted an office that does not feel like a typical office.",
    challenge: "The team works in different modes: individual focus, group discussion, and casual breaks.",
    solution: "An open work area with a long table, semi-enclosed meeting rooms with timber partitions, and a home-like pantry. Indoor plants and natural light keep the space fresh.",
    materials: ["Wood", "Indoor plants", "Wood-pattern vinyl flooring", "Clear glass"],
    gallery: ["Work area", "Meeting room", "Pantry", "Casual corner", "Reception", "Floor plan"],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

/** Gallery images: the project's own cover plus visually related studio photography. */
export function galleryFor(p: Project) {
  const pool = projects.filter((x) => x.slug !== p.slug && x.category === p.category).map((x) => x.image);
  const imgs = [p.image, ...pool, studioDesk];
  return p.gallery.map((caption, i) => ({ caption, src: imgs[i % imgs.length] }));
}

export const featuredSlugs = [
  "sinar-dago-house", "morning-home-apartment", "wooden-path-house",
  "corner-coffee-cafe", "green-terrace-house", "serene-master-bedroom",
];

export const testimonials = [
  { quote: "We were doubtful about our sloping land. The Arkana team saw it as an advantage instead. Our home is now bright and cool, and the children have a safe place to play. Every corner feels like us.", author: "Mrs. Ratna & Mr. Hendra", project: "Sinar Dago House, Bandung" },
  { quote: "My 65-square-meter apartment feels much larger than before. The storage is hidden and tidy, so I no longer need to clear things away every time guests come. The process was also very clear from start to finish.", author: "Dinda Prameswari", project: "Morning Home Apartment, Bandung" },
  { quote: "What I appreciate is that they listened before they drew. Our extended family's gathering space has become everyone's favorite spot. The supervision also kept construction on plan.", author: "Mr. Arif Santoso", project: "Dusk Floor House, BSD City" },
];
