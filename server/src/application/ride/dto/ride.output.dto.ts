export type RideOutputDto = {
  rides: {
    id: string;
    origin: string;
    destination: string;
    duration: string | null;
    distance: number | null;
    value: number | null;
    customer_id: string;
    driver: {
      id: string;
      name: string;
    } | null;
  }[];
};
