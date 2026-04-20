export enum UserStatus {
  Unregistered = "Unregistered",
  PendingVerification = "PendingVerification",
  Active = "Active",
  Locked = "Locked",
}

export interface RegistrationData {
  email: string;
  fullName: string;
  teamName: string;
}
