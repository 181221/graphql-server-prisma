export interface AuthPayload {
  token: string | null;
}

export interface PrivateConfiguration {
  id: string;
  radarrApiKey: string;
  radarrEndpoint: string;
  radarrRootFolder: string;
  pushoverApiKey: string | null;
  pushoverUserKey: string | null;
}
