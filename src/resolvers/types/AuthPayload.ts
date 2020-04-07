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

export interface RadarrStatus {
  isRequested: boolean | null;
  hasFile: boolean | null;
  downloaded: boolean | null;
  status: string | null;
  timeleft: string | null;
  title: string | null;
}
