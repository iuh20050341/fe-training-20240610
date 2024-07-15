export interface Login {
    username: string,
    password: string,
    token: string,
    }

export type Logins = Omit<Login,'token'>
