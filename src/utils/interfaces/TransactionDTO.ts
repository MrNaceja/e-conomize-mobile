export type TTransactionType = 'gain' | 'expense'

export enum ETransactionTypes {
    GAIN    = "gain",
    EXPENSE = "expense"
}

export type TTransaction = {
    id: string,
    value: number,
    description: string,
    type: TTransactionType,
    createdAt?: string,
}

export type TTransactionsByDate = {
    title: string,
    data: TTransaction[]
}
 
export const GAIN : TTransactionsByDate[] = [
    {
        title: 'Há duas semanas',
        data: [
            {
                id: '1',
                type: 'gain',
                value: 0,
                description: 'teste'
            },
            {
                id: '2',
                type: 'gain',
                value: 0,
                description: 'teste'
            },
            {
                id: '3',
                type: 'gain',
                value: 0,
                description: 'teste'
            },
            {
                id: '4',
                type: 'gain',
                value: 0,
                description: 'teste'
            },
            {
                id: '5',
                type: 'gain',
                value: 0,
                description: 'teste'
            },
            {
                id: '6',
                type: 'gain',
                value: 0,
                description: 'teste'
            },
            {
                id: '7',
                type: 'gain',
                value: 0,
                description: 'teste'
            },
        ]
    },
    {
        title: 'Há um mês',
        data: [
            {
                id: '1',
                type: 'gain',
                value: 0,
                description: 'teste'
            },
            {
                id: '2',
                type: 'gain',
                value: 0,
                description: 'teste'
            }
        ]
    }
]

export const EXPENSE : TTransactionsByDate[] = [
    {
        title: 'Há um dia',
        data: [
            {
                id: '1',
                type: 'expense',
                value: 0,
                description: 'teste'
            },
            {
                id: '2',
                type: 'expense',
                value: 0,
                description: 'teste'
            },
            {
                id: '3',
                type: 'expense',
                value: 0,
                description: 'teste'
            }
        ]
    }
]