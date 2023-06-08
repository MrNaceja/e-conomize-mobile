import { IColors } from "native-base/lib/typescript/theme/base/colors"

export type TAccount = {
    id: string,
    name: string,
    total: number,
    instituition: TAccountInstituition,
}

export type TAccountInstituition = {
    name: string,
    logo: string,
    color: IColors
}

export const INSTITUITIONS : TAccountInstituition[] = [
    {
     name: "Nubank",
     logo: "https://nubank.com.br/images/nu-icon.png?v=2",
     color: "purple.500"
    },
    {
     name: "Teste1",
     logo: "https://nubank.com.br/images/nu-icon.png?v=2",
     color: "purple.500"
    },
    {
     name: "Teste2",
     logo: "https://nubank.com.br/images/nu-icon.png?v=2",
     color: "purple.500"
    },
    {
     name: "Teste3",
     logo: "https://nubank.com.br/images/nu-icon.png?v=2",
     color: "purple.500"
    },
    {
     name: "Teste4",
     logo: "https://nubank.com.br/images/nu-icon.png?v=2",
     color: "purple.500"
    },
    {
     name: "Teste5",
     logo: "https://nubank.com.br/images/nu-icon.png?v=2",
     color: "purple.500"
    },
    {
     name: "Mercado Pago",
     logo: "https://bucket.utua.com.br/img/2020/02/c46a4003-design-sem-nome-38-1.png",
     color: "lightBlue.500"
    }
 ]