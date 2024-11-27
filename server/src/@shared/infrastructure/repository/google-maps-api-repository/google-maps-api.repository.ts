import axios from 'axios';

export class GoogleMapsApi {
  private readonly apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getRoute(origin: string, destination: string): Promise<any> {
    try {
      const response = await axios.get(
        'https://maps.googleapis.com/maps/api/directions/json',
        {
          params: {
            origin: origin,
            destination: destination,
            key: this.apiKey,
          },
        }
      );

      const status = response.data.status;
      if (status !== 'OK') {
        throw new Error(`Directions API failed with status: ${status}`);
      }

      const leg = response.data.routes[0]?.legs[0];

      if (!leg) {
        throw new Error(`No route found between ${origin} and ${destination}`);
      }

      return leg;
    } catch (error) {
      console.error(`Error fetching route from ${origin} to ${destination}:`);
      throw new Error(
        `Failed to fetch route between ${origin} and ${destination}`
      );
    }
  }
}

export type LocationOutput = { latitude: number; longitude: number };
