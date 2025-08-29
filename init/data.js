const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description:
      "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
    image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=800&q=60",
    price: 1500,
    location: "Malibu",
    country: "United States",
  },
  {
    title: "Modern Loft in Downtown",
    description:
      "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60",
    price: 1200,
    location: "New York City",
    country: "United States",
  },
  {
    title: "Mountain Retreat",
    description:
      "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=60",
    price: 1000,
    location: "Aspen",
    country: "United States",
  },
  {
    title: "Historic Villa in Tuscany",
    description:
      "Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=60",
    price: 2500,
    location: "Florence",
    country: "Italy",
  },
  {
    title: "Secluded Treehouse Getaway",
    description:
      "Live among the treetops in this unique treehouse retreat. A true nature lover's paradise.",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=60",
    price: 800,
    location: "Portland",
    country: "United States",
  },
  {
    title: "Beachfront Paradise",
    description:
      "Step out of your door onto the sandy beach. This beachfront condo offers the ultimate relaxation.",
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=60",
    price: 2000,
    location: "Cancun",
    country: "Mexico",
  },
  {
    title: "Rustic Cabin by the Lake",
    description:
      "Spend your days fishing and kayaking on the serene lake. This cozy cabin is perfect for outdoor enthusiasts.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=60",
    price: 900,
    location: "Lake Tahoe",
    country: "United States",
  },
  {
    title: "Luxury Penthouse with City Views",
    description:
      "Indulge in luxury living with panoramic city views from this stunning penthouse apartment.",
    image: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?auto=format&fit=crop&w=800&q=60",
    price: 3500,
    location: "Los Angeles",
    country: "United States",
  },
  {
    title: "Ski-In/Ski-Out Chalet",
    description:
      "Hit the slopes right from your doorstep in this ski-in/ski-out chalet in the Swiss Alps.",
    image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=60",
    price: 3000,
    location: "Verbier",
    country: "Switzerland",
  },
  {
    title: "Safari Lodge in the Serengeti",
    description:
      "Experience the thrill of the wild in a comfortable safari lodge. Witness the Great Migration up close.",
    image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=800&q=60",
    price: 4000,
    location: "Serengeti National Park",
    country: "Tanzania",
  },
  {
    title: "Charming Studio in Paris",
    description:
      "Fall in love with Paris from this cozy studio apartment, just steps away from the Eiffel Tower.",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=60",
    price: 1800,
    location: "Paris",
    country: "France",
  },
  {
    title: "Desert Oasis Retreat",
    description:
      "Relax in luxury at this desert oasis, complete with a private pool and stunning views.",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60",
    price: 2200,
    location: "Palm Springs",
    country: "United States",
  },
  {
    title: "Countryside Farmhouse",
    description:
      "Experience the charm of rural life in this renovated farmhouse surrounded by rolling hills.",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=60",
    price: 950,
    location: "Napa Valley",
    country: "United States",
  },
  {
    title: "Japanese Ryokan Experience",
    description:
      "Stay in a traditional Japanese inn with tatami floors, futon beds, and natural hot springs.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=60",
    price: 2100,
    location: "Kyoto",
    country: "Japan",
  },
  {
    title: "Modern Houseboat",
    description:
      "Enjoy a unique stay on a stylish houseboat with all modern amenities.",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=60",
    price: 1600,
    location: "Amsterdam",
    country: "Netherlands",
  },
  {
    title: "Luxury Desert Camp",
    description:
      "Sleep under the stars in a luxury tent with all comforts amidst the dunes.",
    image: "https://images.unsplash.com/photo-1601582588333-713fa9c33dcb?auto=format&fit=crop&w=800&q=60",
    price: 2800,
    location: "Sahara Desert",
    country: "Morocco",
  },
  {
    title: "Private Island Villa",
    description:
      "Have an entire island to yourself with this luxury villa surrounded by turquoise waters.",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=60",
    price: 5000,
    location: "Maldives",
    country: "Maldives",
  },
  {
    title: "Igloo Stay in Lapland",
    description:
      "Witness the Northern Lights from a glass igloo in the Arctic Circle.",
    image: "https://images.unsplash.com/photo-1603398745854-d9c8d05d4953?auto=format&fit=crop&w=800&q=60",
    price: 2700,
    location: "Lapland",
    country: "Finland",
  },
  {
    title: "Tropical Jungle Bungalow",
    description:
      "Immerse yourself in nature with this eco-friendly bungalow deep in the rainforest.",
    image: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=800&q=60",
    price: 1100,
    location: "Bali",
    country: "Indonesia",
  },
  {
    title: "Castle Stay",
    description:
      "Live like royalty in a medieval castle with modern luxuries.",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60",
    price: 3200,
    location: "Edinburgh",
    country: "Scotland",
  }
];

module.exports = { data: sampleListings };
