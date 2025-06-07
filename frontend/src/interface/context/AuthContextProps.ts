import { ReactNode } from "react"

export interface UserInfo {
  id: number;
  username: string
}

export interface AuthContextProps {
  isAuthenticated: boolean,
  user: UserInfo | null,
  updateAuthStatus: () => Promise<void>,
  loading: boolean,
}

export interface AuthProviderProps {
  children: ReactNode
}
