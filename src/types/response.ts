interface Coordinates {
  latitude: string;
  longitude: string;
}

export interface Image {
  original: string;
  small: string;
  medium: string;
  large: string;
}

export interface GeneralInfo {
  bathrooms: number;
  coordinates: Coordinates;
  living_area: number;
  name: string;
  price: number;
  province: string;
  reference: string;
  rooms: number;
  size: number;
  terrace: number;
  type: string;
}

export interface PropertyListing {
  generalInfo: GeneralInfo;
  images: Image[];
  _id: string;
}

export interface ApiResponse {
  currentPage: number;
  ids: null;
  projects: PropertyListing[];
  totalObjects: number;
  totalPages: number;
}
