export interface RegisterRequestInterface {
    user:UserTypeInterface 
}

export interface UserTypeInterface {
    email: string
    password: string
    username: string
}