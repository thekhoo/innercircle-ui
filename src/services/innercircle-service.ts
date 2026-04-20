import { RegistrationData, UserStatus } from "@/types/user";

const STORAGE_KEY = "innercircle_status";

export class InnercircleService {
  private static instance: InnercircleService;

  private constructor() {}

  static getInstance(): InnercircleService {
    if (!InnercircleService.instance) {
      InnercircleService.instance = new InnercircleService();
    }
    return InnercircleService.instance;
  }

  getUserStatus(): UserStatus {
    if (typeof window === "undefined") return UserStatus.Unregistered;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && Object.values(UserStatus).includes(stored as UserStatus)) {
      return stored as UserStatus;
    }
    return UserStatus.Unregistered;
  }

  registerUser(data: RegistrationData): void {
    console.log("[InnercircleService] registerUser called with:", data);
  }
}
