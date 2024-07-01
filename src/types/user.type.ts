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
    
    export type User = Pick<Users, 'id' | 'name' | 'email' | 'address'|'role'>[]