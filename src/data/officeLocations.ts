// Mr. Air Services Office Locations

export interface OfficeLocation {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  coordinates: [number, number]; // [lat, lng]
}

export const officeLocations: OfficeLocation[] = [
  {
    name: 'Missouri City',
    address: 'Suite 183, 2601 D Cartwright Rd',
    city: 'Missouri City',
    state: 'TX',
    zip: '77459',
    coordinates: [29.5635, -95.5377],
  },
  {
    name: 'Spring',
    address: '4057 Riley Fuzzel Rd, Ste 500-103',
    city: 'Spring',
    state: 'TX',
    zip: '77386',
    coordinates: [30.0799, -95.4172],
  },
  {
    name: 'Houston',
    address: '14526 Old Katy Rd',
    city: 'Houston',
    state: 'TX',
    zip: '77079',
    coordinates: [29.7858, -95.6200],
  },
];

// Houston metro center for map
export const houstonMetroCenter: [number, number] = [29.76, -95.50];

// Get full address string
export const getFullAddress = (office: OfficeLocation): string => {
  return `${office.address}, ${office.city}, ${office.state} ${office.zip}`;
};
