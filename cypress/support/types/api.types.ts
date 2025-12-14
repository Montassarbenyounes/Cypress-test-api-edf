// User API Types
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  phone: string;
  email?: string;
  username?: string;
}

export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export interface LoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

// Carbon Footprint API Types
export interface CarbonFootprintRequest {
  codeNaf: string;
  employeeNumber: number;
  turnoverAmount: number;
  energies: {
    electric: EnergyValue;
    fuel: EnergyValue;
    gaz: EnergyValue;
  };
  realestates: {
    type: string;
    age: string;
    surface: number;
  };
  transports: {
    vehicles: TransportValue;
    public: TransportValue;
    flights: TransportValue;
  };
}

export interface EnergyValue {
  value: number;
  units: string;
  recurrence: string;
}

export interface TransportValue {
  value: number;
  units: string;
  recurrence: string;
}

export interface CarbonFootprintResponse {
  results: {
    yearly: string;
    emissions_per_employee: string;
  };
}