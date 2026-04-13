export const NEIGHBORHOODS = [
  {
    id: 'mount-juliet',
    name: 'Mount Juliet',
    day: 'Monday',
    dayIndex: 1,
    zip: '37122',
    areas: ['Providence', 'Del Webb', 'Willoughby Station', 'Rolling Meadows', 'Victory Station', 'Lake Shore Park'],
    color: '#2563eb',
  },
  {
    id: 'hermitage',
    name: 'Hermitage',
    day: 'Thursday',
    dayIndex: 4,
    zip: '37076',
    areas: ['Hermitage Hills', 'Tulip Grove', 'Andrew Jackson', 'Stones River', 'Lakeview'],
    color: '#ea580c',
  },
  {
    id: 'old-hickory',
    name: 'Old Hickory',
    day: 'Saturday',
    dayIndex: 6,
    zip: '37138',
    areas: ['DuPont Village', 'Lakewood', 'Old Hickory Village', 'Hadley Bend'],
    color: '#be185d',
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah M.',
    location: 'Mount Juliet, TN',
    rating: 5,
    text: "I couldn't believe my driveway could look that good again! The water-only approach gave me peace of mind with my kids and pets playing outside. Best $99 I've ever spent.",
    date: '2 weeks ago',
  },
  {
    id: 2,
    name: 'James T.',
    location: 'Lebanon, TN',
    rating: 5,
    text: "Scheduled online in under a minute. They showed up right on time for Tuesday Lebanon service. My driveway looks brand new. Already told all my neighbors.",
    date: '1 month ago',
  },
  {
    id: 3,
    name: 'Lisa K.',
    location: 'Hendersonville, TN',
    rating: 5,
    text: "Love that they use only water and electric equipment. No fumes, no chemicals running into my garden. The before and after photos they sent me were incredible!",
    date: '3 weeks ago',
  },
  {
    id: 4,
    name: 'Mike R.',
    location: 'Hermitage, TN',
    rating: 5,
    text: "Our HOA recommended PureFlow and now half the neighborhood is booked. The flat rate pricing makes it so easy — no surprises, no upsells. Just clean driveways.",
    date: '1 week ago',
  },
  {
    id: 5,
    name: 'Jennifer D.',
    location: 'Gallatin, TN',
    rating: 5,
    text: "Tried another company that used harsh chemicals and it damaged my flower beds. PureFlow is water-only and my driveway has never looked better. Night and day difference!",
    date: '2 months ago',
  },
  {
    id: 6,
    name: 'Robert H.',
    location: 'Old Hickory, TN',
    rating: 5,
    text: "The booking was dead simple — picked my neighborhood, chose a Saturday, done. They even sent before/after photos. My wife says the house looks like we just moved in.",
    date: '5 days ago',
  },
];

// Pexels free stock photos - used under Pexels license (free for commercial use)
const PX = (id, w = 800) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

// "Before" images — each unique dirty/stained/weathered surface
export const BEFORE_IMAGES = {
  crackedEarth: PX(2004166),     // cracked dark earth texture
  mossyConcrete: PX(2463332),    // mossy concrete wall
  concreteWall: PX(2463329),     // aged concrete wall
  grungeWall: PX(936800),        // white/gray grungy brick wall
  wetPavement: PX(9395044),      // wet paved surface close-up
  pebbledPavement: PX(6664866),  // wet pebbled pavement texture
};

// "After" images — each unique clean house/driveway
export const AFTER_IMAGES = {
  grayHouse: PX(4258279),        // gray house with clean driveway
  modernSuburban: PX(8583638),   // modern suburban house with driveway
  singleStorey: PX(5785100),     // single storey house under blue sky
  whiteGray: PX(8031881),        // white and gray house near trees
  whiteBlue: PX(8583907),        // white and blue house exterior
  garageSuburbs: PX(17246020),   // house with garage in suburbs
};

// Action shot
export const ACTION_IMAGES = {
  pressureWashing: PX(5652626),  // person pressure washing a house
};

export const BEFORE_AFTER = [
  {
    id: 1,
    title: 'Providence Subdivision',
    location: 'Mount Juliet, TN',
    description: 'Heavy algae and tire marks removed with pure water pressure',
    beforeImg: PX(2004166),       // cracked earth texture
    afterImg: PX(4258279),        // gray house w/ driveway
  },
  {
    id: 2,
    title: 'Indian Lake Neighborhood',
    location: 'Hendersonville, TN',
    description: 'Years of dirt and grime lifted in under an hour',
    beforeImg: PX(2463332),       // mossy concrete
    afterImg: PX(8583638),        // modern suburban house
  },
  {
    id: 3,
    title: 'Hartmann Crossings',
    location: 'Lebanon, TN',
    description: 'Oil stains and mildew eliminated — zero chemicals used',
    beforeImg: PX(2463329),       // aged concrete wall
    afterImg: PX(5785100),        // single storey house
  },
  {
    id: 4,
    title: 'Hermitage Hills',
    location: 'Hermitage, TN',
    description: 'Concrete restored to original color with eco-friendly cleaning',
    beforeImg: PX(936800),        // grungy brick wall
    afterImg: PX(8031881),        // white & gray house
  },
  {
    id: 5,
    title: 'Station Camp Area',
    location: 'Gallatin, TN',
    description: 'Moss and weather stains removed from a 3-car driveway',
    beforeImg: PX(9395044),       // wet paved surface
    afterImg: PX(17246020),       // house w/ garage
  },
  {
    id: 6,
    title: 'DuPont Village',
    location: 'Old Hickory, TN',
    description: 'Complete transformation using only high-pressure water',
    beforeImg: PX(6664866),       // wet pebbled pavement
    afterImg: PX(8583907),        // white & blue house
  },
];

export function getAvailableDates(neighborhoodId, weeksAhead = 8) {
  const neighborhood = NEIGHBORHOODS.find(n => n.id === neighborhoodId);
  if (!neighborhood) return [];

  const dates = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < weeksAhead * 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    if (date.getDay() === neighborhood.dayIndex) {
      const slotsTotal = 8;
      const booked = Math.floor(Math.random() * 6);
      if (booked < slotsTotal) {
        dates.push({
          date,
          slotsAvailable: slotsTotal - booked,
          slotsTotal,
        });
      }
    }
  }
  return dates;
}
