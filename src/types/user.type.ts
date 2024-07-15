export interface Roles {
    id: number,
    name: string
}
export interface Users {
    id: number,
    name: string,
    email: string,
    gender: string,
    address: string,
    age: number,
    createAt: string,
    updateAt: string,
    role: Roles
    }
    
    export type User = Omit<Users, 'id'| 'email' |'createAt'|'updatedAt'|'role'>[]