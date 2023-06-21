import colors from "native-base/lib/typescript/theme/base/colors"
import { THEME } from "theme"
import { TInstituition } from "./InstituitionDTO"

export type TAccount = {
    id: string,
    name: string,
    instituition: TInstituition['name'],
    color: TAccountColorHighlight,
    total: number
}

type JustObjectColors<O> = {[K in keyof O as Exclude<K, O[K] extends string | number ? K : never>]: string}

export type TAccountColorHighlight = keyof JustObjectColors<typeof colors>

export const ACCOUNT_COLORS_HIGHLIGHT = Object
                                        .keys(THEME.colors)
                                        .filter(highLightColor => {
                                            let currentHighLightColor = THEME.colors[highLightColor as keyof typeof THEME.colors]
                                            return currentHighLightColor instanceof Object
                                        }) as [TAccountColorHighlight]

export const ACCOUNTS : TAccount[] = [
    {
        color: 'violet',
        id: 'nubank',
        instituition: 'Nubank',
        name: 'Principal',
        total: 0
    },
    {
        color: 'rose',
        id: 'teste',
        instituition: 'Nubank',
        name: 'Teste',
        total: 2
    },
    {
        color: 'pink',
        id: 'ret',
        instituition: 'Guero',
        name: 'Olá',
        total: 0
    }
]