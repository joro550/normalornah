import { v4 as uuidv4 } from 'uuid';

export class UserRepository {
  public static getUser(): string {
    let userId = localStorage.getItem("user");

    if (userId == null) {
      userId = uuidv4();
      localStorage.setItem("user", userId);
      return userId;
    }
    return userId;
  }
}
