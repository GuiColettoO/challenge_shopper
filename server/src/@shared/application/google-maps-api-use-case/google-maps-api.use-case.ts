import { GoogleMapsApiInterface } from '../../domain/repository/google-api-repository-interface/google-maps-api.interface';

export class GetRouteUseCase {
  constructor(private googleMapsApiRepo: GoogleMapsApiInterface) {}

  async execute(origin: string, destination: string): Promise<GetRouteOutput> {
    return this.googleMapsApiRepo.getRoute(origin, destination);
  }
}

export type GetRouteInput = { origin: string; destination: string };

export type GetRouteOutput = {};
