export interface GoogleMapsApiInterface {
  getRoute(origin: string, destination: string): Promise<any>;
}
