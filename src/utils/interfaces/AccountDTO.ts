import colors from "native-base/lib/typescript/theme/base/colors"
import { THEME } from "theme"

export type TAccount = {
    id: string,
    name: string,
    instituition: TAccountInstituition['name'],
    color: TAccountColorHighlight,
    total: number
}

export type TAccountInstituition = {
    name: string,
    logo: string
}

type JustObjectColors<O> = {[K in keyof O as Exclude<K, O[K] extends string | number ? K : never>]: string}
export type TAccountColorHighlight = keyof JustObjectColors<typeof colors>

export const ACCOUNT_COLORS_HIGHLIGHT = Object
                                        .keys(THEME.colors)
                                        .filter(highLightColor => {
                                            let currentHighLightColor = THEME.colors[highLightColor as keyof typeof THEME.colors]
                                            return currentHighLightColor instanceof Object
                                        }) as [TAccountColorHighlight]

export const INSTITUITIONS : TAccountInstituition[] = [
    {
     name: "Nubank",
     logo: "https://nubank.com.br/images/nu-icon.png?v=2"
    },
    {
     name: "Teste1",
     logo: "https://nubank.com.br/images/nu-icon.png?v=2"
    },
    {
     name: "Teste2",
     logo: "https://nubank.com.br/images/nu-icon.png?v=2"
    },
    {
     name: "Teste3",
     logo: "https://nubank.com.br/images/nu-icon.png?v=2"
    },
    {
     name: "Teste4",
     logo: "https://nubank.com.br/images/nu-icon.png?v=2"
    },
    {
     name: "Teste5",
     logo: "https://nubank.com.br/images/nu-icon.png?v=2"
    },
    {
     name: "Mercado Pago",
     logo: "https://bucket.utua.com.br/img/2020/02/c46a4003-design-sem-nome-38-1.png"
    }
 ]