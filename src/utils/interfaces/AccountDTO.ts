export type TAccount = {
    id: string,
    name: string,
    instituition: TAccountInstituition,
}

export type TAccountInstituition = {
    name: string,
    logo: string,
    color: string
}