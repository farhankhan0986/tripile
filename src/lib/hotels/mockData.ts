import type { Hotel } from "./types";

export const HOTELS: Hotel[] = [
  // ── Dubai ─────────────────────────────────────────────────────────────────
  {
    id: "h001",
    name: "Burj Al Arab Jumeirah",
    city: "Dubai",
    country: "UAE",
    address: "Jumeirah Beach Rd, Umm Suqeim, Dubai",
    stars: 5,
    reviewScore: 9.6,
    reviewCount: 18420,
    pricePerNight: 1850,
    propertyType: "hotel",
    cancellationPolicy: "partial",
    badge: "Luxury",
    lat: 25.1412,
    lng: 55.1853,
    description:
      "The world's most iconic hotel, standing on its own island off the coast of Dubai. All-suite interiors soar 28 stories above the Arabian Gulf, with personal butler service, Michelin-starred dining, and a helipad visible from every suite.",
    amenities: [
      "Free Wi-Fi", "Pool", "Spa", "Gym", "Restaurant",
      "Bar", "Room Service", "Valet Parking", "Beach Access", "Private Beach",
    ],
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "h002",
    name: "Atlantis The Palm",
    city: "Dubai",
    country: "UAE",
    address: "Crescent Rd, The Palm Jumeirah, Dubai",
    stars: 5,
    reviewScore: 9.1,
    reviewCount: 24810,
    pricePerNight: 620,
    propertyType: "resort",
    cancellationPolicy: "free",
    badge: "Best Seller",
    lat: 25.1304,
    lng: 55.1171,
    description:
      "A legendary resort on the iconic Palm Jumeirah, home to Aquaventure Waterpark, Dolphin Bay, and over 17 world-class restaurants. The centrepiece lagoon pool and private beach make every stay unforgettable.",
    amenities: [
      "Free Wi-Fi", "Pool", "Spa", "Gym", "Restaurant",
      "Bar", "Room Service", "Parking", "Waterpark", "Kids Club",
    ],
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "h003",
    name: "Address Downtown Dubai",
    city: "Dubai",
    country: "UAE",
    address: "Sheikh Mohammed Bin Rashid Blvd, Downtown Dubai",
    stars: 5,
    reviewScore: 9.3,
    reviewCount: 12300,
    pricePerNight: 480,
    propertyType: "hotel",
    cancellationPolicy: "free",
    badge: "Top Rated",
    lat: 25.1972,
    lng: 55.2796,
    description:
      "Positioned steps from the Burj Khalifa and Dubai Fountain, this sleek skyscraper hotel offers panoramic Burj Khalifa views from every room. The rooftop pool deck is one of Dubai's most photographed spots.",
    amenities: [
      "Free Wi-Fi", "Pool", "Spa", "Gym", "Restaurant",
      "Bar", "Room Service", "Valet Parking",
    ],
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1574691250077-03a929faece5?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  // ── Paris ──────────────────────────────────────────────────────────────────
  {
    id: "h004",
    name: "Le Bristol Paris",
    city: "Paris",
    country: "France",
    address: "112 Rue du Faubourg Saint-Honoré, 75008 Paris",
    stars: 5,
    reviewScore: 9.7,
    reviewCount: 8920,
    pricePerNight: 1200,
    propertyType: "hotel",
    cancellationPolicy: "non_refundable",
    badge: "Luxury",
    lat: 48.8738,
    lng: 2.3131,
    description:
      "One of Paris's legendary Palace Hotels on the prestigious Rue du Faubourg Saint-Honoré. Home to Épicure, a triple Michelin-starred restaurant, and an extraordinary rooftop pool overlooking the zinc rooftops of Paris.",
    amenities: [
      "Free Wi-Fi", "Pool", "Spa", "Gym", "Restaurant",
      "Bar", "Room Service", "Valet Parking",
    ],
    images: [
      "https://images.unsplash.com/photo-1698370681016-fb71a29f952c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TGUlMjBCcmlzdG9sJTIwUGFyaXN8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "h005",
    name: "Hôtel Plaza Athénée",
    city: "Paris",
    country: "France",
    address: "25 Avenue Montaigne, 75008 Paris",
    stars: 5,
    reviewScore: 9.5,
    reviewCount: 7840,
    pricePerNight: 980,
    propertyType: "hotel",
    cancellationPolicy: "partial",
    badge: "Top Rated",
    lat: 48.8665,
    lng: 2.3025,
    description:
      "The address of Parisian glamour, draped in iconic red geraniums on Avenue Montaigne. Alain Ducasse's three-Michelin-star restaurant sits within, while the Dior Suite is the epitome of French couture living.",
    amenities: [
      "Free Wi-Fi", "Spa", "Gym", "Restaurant",
      "Bar", "Room Service", "Valet Parking",
    ],
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "h006",
    name: "Le Marais Boutique",
    city: "Paris",
    country: "France",
    address: "14 Rue de Bretagne, 75003 Paris",
    stars: 4,
    reviewScore: 8.8,
    reviewCount: 3210,
    pricePerNight: 220,
    propertyType: "boutique",
    cancellationPolicy: "free",
    badge: "Boutique Gem",
    lat: 48.8607,
    lng: 2.3614,
    description:
      "A charming boutique hotel in the heart of Le Marais, Paris's most vibrant neighbourhood. Exposed stone walls, vaulted ceilings, and individually curated rooms blend 17th-century character with modern comfort.",
    amenities: [
      "Free Wi-Fi", "Breakfast Included", "Bar",
    ],
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  // ── London ─────────────────────────────────────────────────────────────────
  {
    id: "h007",
    name: "The Savoy",
    city: "London",
    country: "UK",
    address: "Strand, London WC2R 0EU",
    stars: 5,
    reviewScore: 9.4,
    reviewCount: 16200,
    pricePerNight: 820,
    propertyType: "hotel",
    cancellationPolicy: "partial",
    badge: "Luxury",
    lat: 51.5104,
    lng: -0.1205,
    description:
      "London's most iconic hotel since 1889, where royalty, heads of state, and Hollywood legends have stayed. Rooms overlook the Thames or the London skyline, and Afternoon Tea at the Thames Foyer is a timeless tradition.",
    amenities: [
      "Free Wi-Fi", "Pool", "Spa", "Gym", "Restaurant",
      "Bar", "Room Service", "Valet Parking",
    ],
    images: [
      "https://images.unsplash.com/photo-1596436874862-5a3b5bd0a543?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1561501900-3701fa6a0864?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "h008",
    name: "Claridge's",
    city: "London",
    country: "UK",
    address: "Brook Street, Mayfair, London W1K 4HR",
    stars: 5,
    reviewScore: 9.5,
    reviewCount: 11400,
    pricePerNight: 740,
    propertyType: "hotel",
    cancellationPolicy: "non_refundable",
    badge: "Top Rated",
    lat: 51.5128,
    lng: -0.1494,
    description:
      "The definitive London luxury hotel in the heart of Mayfair. Art Deco grandeur meets modern sophistication - the signature Foyer restaurant and famed cocktail bar make this a destination in itself.",
    amenities: [
      "Free Wi-Fi", "Spa", "Gym", "Restaurant",
      "Bar", "Room Service", "Valet Parking",
    ],
    images: [
      "https://images.unsplash.com/photo-1551016997-ba4f33a1a9b1?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "h009",
    name: "The Hoxton Shoreditch",
    city: "London",
    country: "UK",
    address: "81 Great Eastern Street, Shoreditch, London EC2A 3HU",
    stars: 4,
    reviewScore: 8.9,
    reviewCount: 6700,
    pricePerNight: 175,
    propertyType: "boutique",
    cancellationPolicy: "free",
    badge: "Great Value",
    lat: 51.5263,
    lng: -0.0802,
    description:
      "Cool, design-led hotel in London's creative heartland. The ground-floor Hoxton Grill and lobby café buzz all day long, and the loft-style rooms with exposed brick walls perfectly capture Shoreditch's creative energy.",
    amenities: [
      "Free Wi-Fi", "Restaurant", "Bar", "Gym",
    ],
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583845112203-29329902332e?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  // ── New York ───────────────────────────────────────────────────────────────
  {
    id: "h010",
    name: "The Plaza Hotel",
    city: "New York",
    country: "USA",
    address: "768 5th Ave, New York, NY 10019",
    stars: 5,
    reviewScore: 9.3,
    reviewCount: 21500,
    pricePerNight: 890,
    propertyType: "hotel",
    cancellationPolicy: "partial",
    badge: "Luxury",
    lat: 40.7645,
    lng: -73.9744,
    description:
      "A National Historic Landmark at the corner of Fifth Avenue and Central Park South. The Plaza's Beaux Arts grandeur has graced movies and novels for over a century. The legendary Palm Court still serves the finest Afternoon Tea in New York.",
    amenities: [
      "Free Wi-Fi", "Spa", "Gym", "Restaurant",
      "Bar", "Room Service", "Valet Parking",
    ],
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "h011",
    name: "The NoMad Hotel",
    city: "New York",
    country: "USA",
    address: "1170 Broadway, New York, NY 10001",
    stars: 5,
    reviewScore: 9.1,
    reviewCount: 8930,
    pricePerNight: 420,
    propertyType: "boutique",
    cancellationPolicy: "free",
    badge: "Boutique Gem",
    lat: 40.7441,
    lng: -73.9884,
    description:
      "Set in an 1903 Beaux Arts building in the NoMad neighbourhood. The romantic atrium restaurant from Daniel Humm earned a Michelin star, and the library lounge is the most beautiful bar in Manhattan.",
    amenities: [
      "Free Wi-Fi", "Spa", "Gym", "Restaurant", "Bar", "Room Service",
    ],
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "h012",
    name: "1 Hotel Brooklyn Bridge",
    city: "New York",
    country: "USA",
    address: "60 Furman Street, Brooklyn, NY 11201",
    stars: 5,
    reviewScore: 9.2,
    reviewCount: 7240,
    pricePerNight: 350,
    propertyType: "hotel",
    cancellationPolicy: "free",
    badge: "Top Rated",
    lat: 40.7024,
    lng: -73.9938,
    description:
      "A sustainably-designed luxury hotel perched on Brooklyn Bridge Park with sweeping views of lower Manhattan and the East River. Reclaimed wood, living walls, and rooftop pool create an immersive urban nature retreat.",
    amenities: [
      "Free Wi-Fi", "Pool", "Spa", "Gym", "Restaurant",
      "Bar", "Room Service",
    ],
    images: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1531088009183-5ff5b7c95f91?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  // ── Tokyo ──────────────────────────────────────────────────────────────────
  {
    id: "h013",
    name: "Park Hyatt Tokyo",
    city: "Tokyo",
    country: "Japan",
    address: "3-7-1-2 Nishi-Shinjuku, Shinjuku, Tokyo 163-1055",
    stars: 5,
    reviewScore: 9.5,
    reviewCount: 14680,
    pricePerNight: 520,
    propertyType: "hotel",
    cancellationPolicy: "partial",
    badge: "Top Rated",
    lat: 35.6867,
    lng: 139.6927,
    description:
      "Immortalised in Lost in Translation, this legendary hotel occupies floors 39–52 of the Shinjuku Park Tower. The New York Bar at the 52nd floor offers jazz nightly against a 360° panorama of Tokyo's glittering skyline.",
    amenities: [
      "Free Wi-Fi", "Pool", "Spa", "Gym", "Restaurant",
      "Bar", "Room Service",
    ],
    images: [
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "h014",
    name: "Aman Tokyo",
    city: "Tokyo",
    country: "Japan",
    address: "The Otemachi Tower, 1-5-6 Otemachi, Chiyoda, Tokyo",
    stars: 5,
    reviewScore: 9.7,
    reviewCount: 5920,
    pricePerNight: 1100,
    propertyType: "hotel",
    cancellationPolicy: "non_refundable",
    badge: "Luxury",
    lat: 35.6863,
    lng: 139.7646,
    description:
      "Aman's urban flagship perches high above Tokyo's Imperial Palace gardens. The vast double-height lobby combines traditional Japanese craft with contemporary minimalism. An intimate spa with hot stone baths completes the sanctuary.",
    amenities: [
      "Free Wi-Fi", "Pool", "Spa", "Gym", "Restaurant",
      "Bar", "Room Service",
    ],
    images: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551882547-ff40c4a49ce2?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "h015",
    name: "Hoshinoya Tokyo",
    city: "Tokyo",
    country: "Japan",
    address: "1-9-1 Otemachi, Chiyoda, Tokyo",
    stars: 5,
    reviewScore: 9.4,
    reviewCount: 4110,
    pricePerNight: 680,
    propertyType: "boutique",
    cancellationPolicy: "partial",
    badge: "Boutique Gem",
    lat: 35.6870,
    lng: 139.7638,
    description:
      "A vertical onsen ryokan in the heart of Tokyo - seventeen floors of traditional Japanese hospitality in the business district. Guests are welcomed shoeless into tatami-floored rooms and a rooftop onsen fed by deep Kanto springs.",
    amenities: [
      "Free Wi-Fi", "Spa", "Restaurant", "Breakfast Included", "Room Service",
    ],
    images: [
      "https://images.unsplash.com/photo-1553984840-b8cbc34f5215?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587213811864-44f3a435e9c6?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  // ── Maldives ───────────────────────────────────────────────────────────────
  {
    id: "h016",
    name: "Soneva Jani",
    city: "Noonu Atoll",
    country: "Maldives",
    address: "Medhufaru Island, Noonu Atoll, Maldives",
    stars: 5,
    reviewScore: 9.8,
    reviewCount: 3820,
    pricePerNight: 2800,
    propertyType: "resort",
    cancellationPolicy: "non_refundable",
    badge: "Luxury",
    lat: 5.9068,
    lng: 73.5203,
    description:
      "Overwater villas with retractable roofs for stargazing, slide-out water slides from the living room, and azure lagoons visible through glass floors. Soneva Jani is the apex of barefoot luxury on Earth.",
    amenities: [
      "Free Wi-Fi", "Pool", "Spa", "Gym", "Restaurant",
      "Bar", "Room Service", "Private Beach", "Diving",
    ],
    images: [
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1439066615861-d1af74d74000?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "h017",
    name: "Four Seasons Resort Maldives",
    city: "Kuda Huraa",
    country: "Maldives",
    address: "Kuda Huraa, North Male Atoll, Maldives",
    stars: 5,
    reviewScore: 9.6,
    reviewCount: 6240,
    pricePerNight: 1600,
    propertyType: "resort",
    cancellationPolicy: "partial",
    badge: "Top Rated",
    lat: 4.2319,
    lng: 73.5267,
    description:
      "Thatched-roof beach and water bungalows surrounded by a house reef teeming with marine life. The DIVE+ centre is among the finest in the Indian Ocean, and the spa uses island-harvested coconut and sea minerals.",
    amenities: [
      "Free Wi-Fi", "Pool", "Spa", "Gym", "Restaurant",
      "Bar", "Room Service", "Diving", "Kids Club",
    ],
    images: [
      "https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582610116397-edb72a1c2b58?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  // ── Bali ───────────────────────────────────────────────────────────────────
  {
    id: "h018",
    name: "Como Uma Ubud",
    city: "Ubud",
    country: "Indonesia",
    address: "Jl. Raya Sanggingan, Ubud, Bali 80571",
    stars: 5,
    reviewScore: 9.2,
    reviewCount: 4550,
    pricePerNight: 340,
    propertyType: "resort",
    cancellationPolicy: "free",
    badge: "Top Rated",
    lat: -8.4889,
    lng: 115.2417,
    description:
      "Perched above the Tjampuhan river valley in Ubud's art district, this intimate resort blends local Balinese craftsmanship with COMO's signature wellness philosophy. Rice-field views from the infinity pool are simply breathtaking.",
    amenities: [
      "Free Wi-Fi", "Pool", "Spa", "Gym", "Restaurant",
      "Breakfast Included", "Room Service", "Yoga Classes",
    ],
    images: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1570737209810-87a8e7245f88?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "h019",
    name: "Ayana Resort & Spa",
    city: "Jimbaran",
    country: "Indonesia",
    address: "Jl. Karang Mas Sejahtera, Jimbaran, Bali",
    stars: 5,
    reviewScore: 9.3,
    reviewCount: 9870,
    pricePerNight: 390,
    propertyType: "resort",
    cancellationPolicy: "free",
    badge: "Best Seller",
    lat: -8.7804,
    lng: 115.1424,
    description:
      "Perched on 90 acres of clifftop above the Indian Ocean, AYANA is home to Bali's iconic Rock Bar. Fourteen restaurants and bars, a spectacular cliff-edge pool, and the AYANA Spa - all overlooking the sunset horizon.",
    amenities: [
      "Free Wi-Fi", "Pool", "Spa", "Gym", "Restaurant",
      "Bar", "Room Service", "Private Beach", "Valet Parking",
    ],
    images: [
      "https://images.unsplash.com/photo-1574691250077-03a929faece5?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  // ── Singapore ──────────────────────────────────────────────────────────────
  {
    id: "h020",
    name: "Marina Bay Sands",
    city: "Singapore",
    country: "Singapore",
    address: "10 Bayfront Avenue, Singapore 018956",
    stars: 5,
    reviewScore: 9.2,
    reviewCount: 34200,
    pricePerNight: 480,
    propertyType: "hotel",
    cancellationPolicy: "free",
    badge: "Best Seller",
    lat: 1.2834,
    lng: 103.8607,
    description:
      "The world-famous SkyPark pool at 57 storeys defines Singapore's skyline. Three towers connected by the iconic boat-shaped infinity pool, a casino, two theatres, a museum, and 80+ dining options make this a city within a city.",
    amenities: [
      "Free Wi-Fi", "Pool", "Spa", "Gym", "Restaurant",
      "Bar", "Room Service", "Casino",
    ],
    images: [
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516815231560-8f41ec531527?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "h021",
    name: "Raffles Hotel Singapore",
    city: "Singapore",
    country: "Singapore",
    address: "1 Beach Road, Singapore 189673",
    stars: 5,
    reviewScore: 9.5,
    reviewCount: 12400,
    pricePerNight: 720,
    propertyType: "hotel",
    cancellationPolicy: "partial",
    badge: "Luxury",
    lat: 1.2948,
    lng: 103.8523,
    description:
      "The birthplace of the Singapore Sling and a living legend since 1887. The grand colonial dame has been meticulously restored to its original splendour - 115 suites, the famed Long Bar, and lush tropical gardens.",
    amenities: [
      "Free Wi-Fi", "Pool", "Spa", "Gym", "Restaurant",
      "Bar", "Room Service", "Valet Parking", "Butler Service",
    ],
    images: [
      "https://images.unsplash.com/photo-1531088009183-5ff5b7c95f91?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  // ── Barcelona ──────────────────────────────────────────────────────────────
  {
    id: "h022",
    name: "Hotel Arts Barcelona",
    city: "Barcelona",
    country: "Spain",
    address: "Carrer de la Marina, 19-21, 08005 Barcelona",
    stars: 5,
    reviewScore: 9.3,
    reviewCount: 10880,
    pricePerNight: 380,
    propertyType: "hotel",
    cancellationPolicy: "free",
    badge: "Top Rated",
    lat: 41.3857,
    lng: 2.1969,
    description:
      "A 44-storey skyscraper rising directly above the Barceloneta beach. Frank Gehry's giant golden fish sculpture greets guests, while Enoteca Paco Pérez holds two Michelin stars. The sky pool and sea views are incomparable.",
    amenities: [
      "Free Wi-Fi", "Pool", "Spa", "Gym", "Restaurant",
      "Bar", "Room Service", "Private Beach",
    ],
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "h023",
    name: "El Palace Barcelona",
    city: "Barcelona",
    country: "Spain",
    address: "Gran Via de les Corts Catalanes, 668, 08010 Barcelona",
    stars: 5,
    reviewScore: 9.4,
    reviewCount: 7320,
    pricePerNight: 310,
    propertyType: "hotel",
    cancellationPolicy: "free",
    badge: "Boutique Gem",
    lat: 41.3917,
    lng: 2.1699,
    description:
      "Opened in 1919 on the prestigious Gran Via, El Palace is Barcelona's most storied luxury address. Restored frescoes, a stunning pool terrace, and El Jardín cocktail bar celebrate the golden age of Catalan hospitality.",
    amenities: [
      "Free Wi-Fi", "Pool", "Spa", "Gym", "Restaurant",
      "Bar", "Room Service", "Valet Parking",
    ],
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1574691250077-03a929faece5?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  // ── Rome ───────────────────────────────────────────────────────────────────
  {
    id: "h024",
    name: "Hotel de la Ville",
    city: "Rome",
    country: "Italy",
    address: "Via Sistina, 69, 00187 Roma",
    stars: 5,
    reviewScore: 9.6,
    reviewCount: 6120,
    pricePerNight: 640,
    propertyType: "hotel",
    cancellationPolicy: "partial",
    badge: "Luxury",
    lat: 41.9063,
    lng: 12.4836,
    description:
      "Perched at the top of the Spanish Steps with panoramic views across Rome's terracotta skyline. Recently restored, this Rocco Forte hotel is adorned with bespoke Italian art and the Cielo rooftop bar is unmissable at sunset.",
    amenities: [
      "Free Wi-Fi", "Pool", "Spa", "Gym", "Restaurant",
      "Bar", "Room Service", "Valet Parking",
    ],
    images: [
      "https://images.unsplash.com/photo-1609949279531-cf48d64bed89?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "h025",
    name: "Palazzo Manfredi",
    city: "Rome",
    country: "Italy",
    address: "Via Labicana, 125, 00184 Roma",
    stars: 5,
    reviewScore: 9.7,
    reviewCount: 2840,
    pricePerNight: 580,
    propertyType: "boutique",
    cancellationPolicy: "partial",
    badge: "Boutique Gem",
    lat: 41.8896,
    lng: 12.4940,
    description:
      "A romantic boutique hotel directly opposite the Colosseum - arguably the finest view in Rome from any hotel window. Only eighteen rooms, each individually decorated with original Roman-era archaeological finds in the cellar.",
    amenities: [
      "Free Wi-Fi", "Restaurant", "Bar", "Room Service", "Spa",
    ],
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583845112203-29329902332e?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  // ── New York (budget) ──────────────────────────────────────────────────────
  {
    id: "h026",
    name: "citizenM New York Times Square",
    city: "New York",
    country: "USA",
    address: "218 West 50th Street, New York, NY 10019",
    stars: 4,
    reviewScore: 8.7,
    reviewCount: 14600,
    pricePerNight: 185,
    propertyType: "hotel",
    cancellationPolicy: "free",
    badge: "Great Value",
    lat: 40.7614,
    lng: -73.9836,
    description:
      "A radically new hotel concept with tiny but perfectly designed rooms featuring XL king beds and rain showers. The canteen lobby is open 24/7 and the rooftop bar has jaw-dropping Times Square views for a fraction of the price.",
    amenities: [
      "Free Wi-Fi", "Bar", "Gym", "Restaurant",
    ],
    images: [
      "https://images.unsplash.com/photo-1596436874862-5a3b5bd0a543?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1561501900-3701fa6a0864?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  // ── Sydney ─────────────────────────────────────────────────────────────────
  {
    id: "h027",
    name: "Park Hyatt Sydney",
    city: "Sydney",
    country: "Australia",
    address: "7 Hickson Rd, The Rocks, Sydney NSW 2000",
    stars: 5,
    reviewScore: 9.4,
    reviewCount: 9710,
    pricePerNight: 640,
    propertyType: "hotel",
    cancellationPolicy: "partial",
    badge: "Top Rated",
    lat: -33.8591,
    lng: 151.2073,
    description:
      "The best hotel view in Australia - every room faces the Sydney Opera House and Harbour Bridge. The rooftop pool at sunset, with the Opera House silhouetted against a crimson sky, is an experience beyond words.",
    amenities: [
      "Free Wi-Fi", "Pool", "Spa", "Gym", "Restaurant",
      "Bar", "Room Service", "Valet Parking",
    ],
    images: [
      "https://images.unsplash.com/photo-1540982960553-8e91fbdfe6e1?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1529290130-4ca3753253ae?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  // ── Istanbul ───────────────────────────────────────────────────────────────
  {
    id: "h028",
    name: "Four Seasons Bosphorus",
    city: "Istanbul",
    country: "Turkey",
    address: "Çırağan Caddesi 28, Beşiktaş, Istanbul",
    stars: 5,
    reviewScore: 9.5,
    reviewCount: 8230,
    pricePerNight: 510,
    propertyType: "hotel",
    cancellationPolicy: "partial",
    badge: "Luxury",
    lat: 41.0456,
    lng: 29.0053,
    description:
      "Set in a 19th-century Ottoman palace on the European shore of the Bosphorus, this hotel offers one of the world's most magical settings. Watching tankers glide past from the breakfast terrace is a quintessential Istanbul moment.",
    amenities: [
      "Free Wi-Fi", "Pool", "Spa", "Gym", "Restaurant",
      "Bar", "Room Service", "Private Beach",
    ],
    images: [
      "https://images.unsplash.com/photo-1575912048259-acacfe5e4ad0?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  // ── Amsterdam ──────────────────────────────────────────────────────────────
  {
    id: "h029",
    name: "Conservatorium Hotel",
    city: "Amsterdam",
    country: "Netherlands",
    address: "Van Baerlestraat 27, 1071 AN Amsterdam",
    stars: 5,
    reviewScore: 9.4,
    reviewCount: 7850,
    pricePerNight: 390,
    propertyType: "hotel",
    cancellationPolicy: "free",
    badge: "Boutique Gem",
    lat: 52.3578,
    lng: 4.8798,
    description:
      "Housed in the restored 1897 Sweelinck music conservatory, this five-star hotel brings together a remarkable atrium, Michelin-recommended Brasserie, and Akasha holistic spa. A block from the Rijksmuseum and Vondelpark.",
    amenities: [
      "Free Wi-Fi", "Pool", "Spa", "Gym", "Restaurant",
      "Bar", "Room Service",
    ],
    images: [
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  // ── Bangkok ────────────────────────────────────────────────────────────────
  {
    id: "h030",
    name: "Mandarin Oriental Bangkok",
    city: "Bangkok",
    country: "Thailand",
    address: "48 Oriental Avenue, Bang Rak, Bangkok 10500",
    stars: 5,
    reviewScore: 9.6,
    reviewCount: 13400,
    pricePerNight: 380,
    propertyType: "hotel",
    cancellationPolicy: "partial",
    badge: "Luxury",
    lat: 13.7233,
    lng: 100.5141,
    description:
      "One of the world's greatest hotels since 1876, on the banks of the Chao Phraya River. Joseph Conrad, Somerset Maugham, and Noël Coward stayed here. The Authors' Lounge afternoon tea and Bamboo Bar jazz remain legendary.",
    amenities: [
      "Free Wi-Fi", "Pool", "Spa", "Gym", "Restaurant",
      "Bar", "Room Service", "Valet Parking", "River Shuttle",
    ],
    images: [
      "https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  // ── Cape Town ──────────────────────────────────────────────────────────────
  {
    id: "h031",
    name: "Silo Hotel",
    city: "Cape Town",
    country: "South Africa",
    address: "Silo Square, Victoria & Alfred Waterfront, Cape Town 8001",
    stars: 5,
    reviewScore: 9.5,
    reviewCount: 5680,
    pricePerNight: 520,
    propertyType: "boutique",
    cancellationPolicy: "partial",
    badge: "Boutique Gem",
    lat: -33.9054,
    lng: 18.4205,
    description:
      "Rising above the Zeitz MOCAA museum in a former grain silo, The Silo is a dazzling architectural marvel with pillowed glass windows. Every room is unique, with views of Table Mountain, the harbour, or the city - all equally dramatic.",
    amenities: [
      "Free Wi-Fi", "Pool", "Spa", "Gym", "Restaurant",
      "Bar", "Room Service",
    ],
    images: [
      "https://images.unsplash.com/photo-1580889240735-f1ae76c99c6f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1510097467424-192d713fd8b2?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  // ── Santorini ──────────────────────────────────────────────────────────────
  {
    id: "h032",
    name: "Canaves Oia Suites",
    city: "Oia",
    country: "Greece",
    address: "Oia, Santorini 847 02, Greece",
    stars: 5,
    reviewScore: 9.7,
    reviewCount: 4290,
    pricePerNight: 760,
    propertyType: "boutique",
    cancellationPolicy: "non_refundable",
    badge: "Luxury",
    lat: 36.4619,
    lng: 25.3757,
    description:
      "Carved into the volcanic caldera of Santorini, these cave suites offer the definitive Greek island luxury experience. Private plunge pools overflow towards the Aegean horizon, and the sunset from Oia's clifftop terrace is the world's finest.",
    amenities: [
      "Free Wi-Fi", "Pool", "Spa", "Restaurant",
      "Bar", "Room Service", "Breakfast Included",
    ],
    images: [
      "https://images.unsplash.com/photo-1570737209810-87a8e7245f88?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  // ── Vienna ─────────────────────────────────────────────────────────────────
  {
    id: "h033",
    name: "Hotel Sacher Wien",
    city: "Vienna",
    country: "Austria",
    address: "Philharmoniker Str. 4, 1010 Wien",
    stars: 5,
    reviewScore: 9.3,
    reviewCount: 11200,
    pricePerNight: 420,
    propertyType: "hotel",
    cancellationPolicy: "partial",
    badge: "Top Rated",
    lat: 48.2029,
    lng: 16.3696,
    description:
      "Home of the original Sachertorte since 1832, opposite the Vienna State Opera. The grand imperial décor, private wine cellar, and legendary Café Sacher - with its velvet booths and chandeliers - are the soul of Viennese elegance.",
    amenities: [
      "Free Wi-Fi", "Spa", "Gym", "Restaurant",
      "Bar", "Room Service", "Valet Parking",
    ],
    images: [
      "https://images.unsplash.com/photo-1551016997-ba4f33a1a9b1?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  // ── Kyoto ─────────────────────────────────────────────────────────────────
  {
    id: "h034",
    name: "Suiran Ryokan",
    city: "Kyoto",
    country: "Japan",
    address: "12 Sagatenryuji Susukinobabacho, Ukyo, Kyoto 616-8385",
    stars: 5,
    reviewScore: 9.5,
    reviewCount: 3410,
    pricePerNight: 580,
    propertyType: "boutique",
    cancellationPolicy: "non_refundable",
    badge: "Boutique Gem",
    lat: 35.0175,
    lng: 135.6684,
    description:
      "A luxury ryokan in Arashiyama, Kyoto's most beautiful bamboo grove district. Traditional kaiseki dinners, private onsen baths, and morning meditation sessions provide an authentic immersion in Japanese culture.",
    amenities: [
      "Free Wi-Fi", "Spa", "Restaurant", "Breakfast Included",
      "Room Service", "Onsen",
    ],
    images: [
      "https://images.unsplash.com/photo-1553984840-b8cbc34f5215?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587213811864-44f3a435e9c6?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  // ── Miami ──────────────────────────────────────────────────────────────────
  {
    id: "h035",
    name: "The Setai Miami Beach",
    city: "Miami",
    country: "USA",
    address: "2001 Collins Ave, Miami Beach, FL 33139",
    stars: 5,
    reviewScore: 9.2,
    reviewCount: 7840,
    pricePerNight: 560,
    propertyType: "hotel",
    cancellationPolicy: "partial",
    badge: "Top Rated",
    lat: 25.7933,
    lng: -80.1300,
    description:
      "An Art Deco masterpiece fused with Asian-inspired minimalism on Miami Beach's quietest stretch. Three temperature-graduated pools, an oceanfront restaurant by acclaimed chef, and residentially spacious suites define South Beach luxury.",
    amenities: [
      "Free Wi-Fi", "Pool", "Spa", "Gym", "Restaurant",
      "Bar", "Room Service", "Private Beach",
    ],
    images: [
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  // ── Marrakech ──────────────────────────────────────────────────────────────
  {
    id: "h036",
    name: "La Mamounia",
    city: "Marrakech",
    country: "Morocco",
    address: "Avenue Bab Jdid, Marrakech 40040",
    stars: 5,
    reviewScore: 9.5,
    reviewCount: 9320,
    pricePerNight: 490,
    propertyType: "hotel",
    cancellationPolicy: "partial",
    badge: "Luxury",
    lat: 31.6200,
    lng: -8.0049,
    description:
      "Churchill called it 'the most lovely spot in the whole world.' Built in 1923 within a walled garden of olive and orange trees, La Mamounia blends Moorish architecture with Art Deco grandeur. The hammam is an absolute must.",
    amenities: [
      "Free Wi-Fi", "Pool", "Spa", "Gym", "Restaurant",
      "Bar", "Room Service", "Valet Parking", "Tennis Courts",
    ],
    images: [
      "https://images.unsplash.com/photo-1580889240735-f1ae76c99c6f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1575912048259-acacfe5e4ad0?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  // ── Amalfi Coast ───────────────────────────────────────────────────────────
  {
    id: "h037",
    name: "Hotel Santa Caterina",
    city: "Amalfi",
    country: "Italy",
    address: "Statale Amalfitana 9, 84011 Amalfi SA",
    stars: 5,
    reviewScore: 9.4,
    reviewCount: 4560,
    pricePerNight: 480,
    propertyType: "hotel",
    cancellationPolicy: "non_refundable",
    badge: "Top Rated",
    lat: 40.6333,
    lng: 14.6143,
    description:
      "Clinging to the limestone cliffs above the Amalfi Coast, this family-owned masterpiece has welcomed guests since 1880. Terraced lemon gardens cascade to a saltwater pool carved into the rock, with uninterrupted views of the Tyrrhenian Sea.",
    amenities: [
      "Free Wi-Fi", "Pool", "Spa", "Restaurant",
      "Bar", "Room Service", "Private Beach",
    ],
    images: [
      "https://images.unsplash.com/photo-1609949279531-cf48d64bed89?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  // ── Petra / Jordan ─────────────────────────────────────────────────────────
  {
    id: "h038",
    name: "Mövenpick Resort Petra",
    city: "Petra",
    country: "Jordan",
    address: "Wadi Musa, Petra, Jordan",
    stars: 5,
    reviewScore: 9.0,
    reviewCount: 6820,
    pricePerNight: 210,
    propertyType: "resort",
    cancellationPolicy: "free",
    badge: "Great Value",
    lat: 30.3285,
    lng: 35.4444,
    description:
      "The only hotel with a direct gateway to Petra, this sandstone resort sits at the entrance to the Rose City. Traditional Jordanian architecture, a rooftop terrace with mountain views, and a spa using Dead Sea minerals make this the best base for exploring Petra.",
    amenities: [
      "Free Wi-Fi", "Pool", "Spa", "Gym", "Restaurant",
      "Bar", "Breakfast Included", "Parking",
    ],
    images: [
      "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  // ── Reykjavik ──────────────────────────────────────────────────────────────
  {
    id: "h039",
    name: "Ion Adventure Hotel",
    city: "Reykjavik",
    country: "Iceland",
    address: "Nesjavellir, 801 Selfoss, Iceland",
    stars: 4,
    reviewScore: 9.1,
    reviewCount: 3240,
    pricePerNight: 320,
    propertyType: "boutique",
    cancellationPolicy: "partial",
    badge: "Boutique Gem",
    lat: 64.0814,
    lng: -21.1253,
    description:
      "An eco-designed retreat on the edge of Thingvellir National Park, purpose-built for northern lights viewing. The geothermal outdoor hot tub and floor-to-ceiling windows framing the lava fields create a truly otherworldly experience.",
    amenities: [
      "Free Wi-Fi", "Spa", "Restaurant", "Bar",
      "Breakfast Included", "Hiking Tours",
    ],
    images: [
      "https://images.unsplash.com/photo-1467380237284-c5d5ebab9cae?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1531088009183-5ff5b7c95f91?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  // ── Tuscany ────────────────────────────────────────────────────────────────
  {
    id: "h040",
    name: "Castello di Casole",
    city: "Siena",
    country: "Italy",
    address: "Casole d'Elsa, 53031 Siena SI",
    stars: 5,
    reviewScore: 9.6,
    reviewCount: 2980,
    pricePerNight: 680,
    propertyType: "resort",
    cancellationPolicy: "non_refundable",
    badge: "Luxury",
    lat: 43.3439,
    lng: 11.0515,
    description:
      "A 4,200-acre Tuscan estate surrounding a restored 10th-century castello. Guests explore private vineyards and olive groves on horseback, dine on estate-grown produce, and sip in-house Chianti from the castle's own cantina.",
    amenities: [
      "Free Wi-Fi", "Pool", "Spa", "Gym", "Restaurant",
      "Bar", "Room Service", "Parking", "Horseback Riding", "Wine Cellar",
    ],
    images: [
      "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1609949279531-cf48d64bed89?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  // ── Queenstown ─────────────────────────────────────────────────────────────
  {
    id: "h041",
    name: "Eichardt's Private Hotel",
    city: "Queenstown",
    country: "New Zealand",
    address: "Marine Parade, Queenstown 9300, New Zealand",
    stars: 5,
    reviewScore: 9.4,
    reviewCount: 3120,
    pricePerNight: 440,
    propertyType: "boutique",
    cancellationPolicy: "partial",
    badge: "Boutique Gem",
    lat: -45.0312,
    lng: 168.6626,
    description:
      "A historic lakeside boutique hotel opened in 1871, overlooking Lake Wakatipu and The Remarkables mountain range. Five individually styled suites, an intimate lounge bar, and the most coveted terrace view in New Zealand.",
    amenities: [
      "Free Wi-Fi", "Bar", "Restaurant", "Room Service", "Breakfast Included",
    ],
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1529290130-4ca3753253ae?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  // ── Chicago ────────────────────────────────────────────────────────────────
  {
    id: "h042",
    name: "The Langham Chicago",
    city: "Chicago",
    country: "USA",
    address: "330 N Wabash Ave, Chicago, IL 60611",
    stars: 5,
    reviewScore: 9.3,
    reviewCount: 8470,
    pricePerNight: 360,
    propertyType: "hotel",
    cancellationPolicy: "free",
    badge: "Top Rated",
    lat: 41.8873,
    lng: -87.6279,
    description:
      "Occupying the former IBM Building designed by Mies van der Rohe, The Langham Chicago rises above the Chicago River with direct views of the architectural canyon of downtown. The Chuan Spa and indoor pool are among the city's best.",
    amenities: [
      "Free Wi-Fi", "Pool", "Spa", "Gym", "Restaurant",
      "Bar", "Room Service", "Valet Parking",
    ],
    images: [
      "https://images.unsplash.com/photo-1516815231560-8f41ec531527?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1561501900-3701fa6a0864?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  // ── Mumbai ─────────────────────────────────────────────────────────────────
  {
    id: "h043",
    name: "Taj Mahal Palace Mumbai",
    city: "Mumbai",
    country: "India",
    address: "Apollo Bunder, Colaba, Mumbai 400001",
    stars: 5,
    reviewScore: 9.4,
    reviewCount: 17600,
    pricePerNight: 290,
    propertyType: "hotel",
    cancellationPolicy: "free",
    badge: "Best Seller",
    lat: 18.9217,
    lng: 72.8332,
    description:
      "India's most iconic hotel, opened in 1903 facing the Gateway of India and Mumbai Harbour. A National Heritage Building, its towers have hosted kings, queens, and presidents. The Sea Lounge and Wasabi by Morimoto are legendary.",
    amenities: [
      "Free Wi-Fi", "Pool", "Spa", "Gym", "Restaurant",
      "Bar", "Room Service", "Valet Parking", "Butler Service",
    ],
    images: [
      "https://images.unsplash.com/photo-1596436874862-5a3b5bd0a543?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1619902726200-bb88e38acbb7?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  // ── Mexico City ────────────────────────────────────────────────────────────
  {
    id: "h044",
    name: "Casa Virreyes",
    city: "Mexico City",
    country: "Mexico",
    address: "Liverpool 155, Juárez, Cuauhtémoc, Mexico City",
    stars: 5,
    reviewScore: 9.2,
    reviewCount: 4120,
    pricePerNight: 260,
    propertyType: "boutique",
    cancellationPolicy: "free",
    badge: "Boutique Gem",
    lat: 19.4269,
    lng: -99.1686,
    description:
      "A magnificently restored 1940s mansion in Colonia Juárez, oozing Art Deco glamour. Each of the seventeen rooms is a gallery of Mexican art, and the rooftop terrace with views across the city's tree-lined boulevards is a secret gem.",
    amenities: [
      "Free Wi-Fi", "Bar", "Restaurant", "Breakfast Included", "Room Service",
    ],
    images: [
      "https://images.unsplash.com/photo-1587213811864-44f3a435e9c6?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  // ── Los Angeles ────────────────────────────────────────────────────────────
  {
    id: "h045",
    name: "Chateau Marmont",
    city: "Los Angeles",
    country: "USA",
    address: "8221 Sunset Blvd, West Hollywood, CA 90046",
    stars: 5,
    reviewScore: 8.9,
    reviewCount: 6340,
    pricePerNight: 420,
    propertyType: "boutique",
    cancellationPolicy: "non_refundable",
    badge: "Boutique Gem",
    lat: 34.0975,
    lng: -118.3768,
    description:
      "The most storied hideaway in Hollywood history, perched above the Sunset Strip since 1929. Bungalows, suites, and cottages set in lush gardens have sheltered everyone from Greta Garbo to Led Zeppelin. Discretion guaranteed.",
    amenities: [
      "Free Wi-Fi", "Pool", "Restaurant", "Bar", "Room Service", "Parking",
    ],
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547394765-185e1e68f34e?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  // ── Hawaii ─────────────────────────────────────────────────────────────────
  {
    id: "h046",
    name: "Four Seasons Hualalai",
    city: "Kailua-Kona",
    country: "USA",
    address: "72-100 Ka'upulehu Dr, Kailua-Kona, HI 96740",
    stars: 5,
    reviewScore: 9.5,
    reviewCount: 7920,
    pricePerNight: 980,
    propertyType: "resort",
    cancellationPolicy: "partial",
    badge: "Top Rated",
    lat: 19.8429,
    lng: -155.9939,
    description:
      "Tucked between a Jack Nicklaus golf course and a white-sand beach on the Big Island's stunning Kohala Coast. The signature experience is the Kings' Pond - an ancient fish pond where guests snorkel alongside manta rays and sea turtles.",
    amenities: [
      "Free Wi-Fi", "Pool", "Spa", "Gym", "Restaurant",
      "Bar", "Room Service", "Private Beach", "Golf", "Snorkeling",
    ],
    images: [
      "https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1440581572325-0bea30efa8a9?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  // ── Copenhagen ─────────────────────────────────────────────────────────────
  {
    id: "h047",
    name: "Nimb Hotel",
    city: "Copenhagen",
    country: "Denmark",
    address: "Bernstorffsgade 5, 1577 Copenhagen",
    stars: 5,
    reviewScore: 9.4,
    reviewCount: 4810,
    pricePerNight: 360,
    propertyType: "boutique",
    cancellationPolicy: "free",
    badge: "Boutique Gem",
    lat: 55.6736,
    lng: 12.5697,
    description:
      "A Moorish fantasy palace built in 1909 within the Tivoli Gardens, Copenhagen's beloved amusement park. Fourteen individually designed suites, a rooftop terrace, and access to Tivoli after-hours - a truly magical Copenhagen experience.",
    amenities: [
      "Free Wi-Fi", "Spa", "Restaurant", "Bar",
      "Breakfast Included", "Room Service",
    ],
    images: [
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  // ── Buenos Aires ───────────────────────────────────────────────────────────
  {
    id: "h048",
    name: "Palacio Duhau – Park Hyatt",
    city: "Buenos Aires",
    country: "Argentina",
    address: "Av. Alvear 1661, C1014 Buenos Aires",
    stars: 5,
    reviewScore: 9.3,
    reviewCount: 8140,
    pricePerNight: 320,
    propertyType: "hotel",
    cancellationPolicy: "free",
    badge: "Top Rated",
    lat: -34.5878,
    lng: -58.3905,
    description:
      "A restored 1934 French-Renaissance palace on the most glamorous avenue in Buenos Aires, connected to a contemporary tower through a stunning sculpture garden. The finest wine cellar in South America and an Astor Bar renowned for cocktails.",
    amenities: [
      "Free Wi-Fi", "Pool", "Spa", "Gym", "Restaurant",
      "Bar", "Room Service", "Valet Parking",
    ],
    images: [
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1574691250077-03a929faece5?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  // ── Prague ─────────────────────────────────────────────────────────────────
  {
    id: "h049",
    name: "Four Seasons Prague",
    city: "Prague",
    country: "Czech Republic",
    address: "Veleslavínova 2a/1098, 110 00 Prague",
    stars: 5,
    reviewScore: 9.4,
    reviewCount: 6920,
    pricePerNight: 340,
    propertyType: "hotel",
    cancellationPolicy: "free",
    badge: "Top Rated",
    lat: 50.0877,
    lng: 14.4126,
    description:
      "Occupying three beautifully restored historic buildings - Baroque, Neo-Classical, and Renaissance - beside the Vltava River, with views of Charles Bridge and Prague Castle. The most coveted address in Central Europe.",
    amenities: [
      "Free Wi-Fi", "Spa", "Gym", "Restaurant",
      "Bar", "Room Service", "Valet Parking",
    ],
    images: [
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541849546-216549ae216d?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  // ── Las Vegas ──────────────────────────────────────────────────────────────
  {
    id: "h050",
    name: "Wynn Las Vegas",
    city: "Las Vegas",
    country: "USA",
    address: "3131 Las Vegas Blvd S, Las Vegas, NV 89109",
    stars: 5,
    reviewScore: 9.1,
    reviewCount: 22400,
    pricePerNight: 340,
    propertyType: "resort",
    cancellationPolicy: "free",
    badge: "Best Seller",
    lat: 36.1265,
    lng: -115.1644,
    description:
      "The gold standard of Las Vegas luxury, with a championship golf course, stunning pool complex, and some of the finest restaurants in Nevada. Steve Wynn's signature flower-filled casino is the most beautiful on the Strip.",
    amenities: [
      "Free Wi-Fi", "Pool", "Spa", "Gym", "Restaurant",
      "Bar", "Room Service", "Valet Parking", "Casino", "Golf",
    ],
    images: [
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1561541178-cd2a7e5a74c3?q=80&w=1200&auto=format&fit=crop",
    ],
  },
];
