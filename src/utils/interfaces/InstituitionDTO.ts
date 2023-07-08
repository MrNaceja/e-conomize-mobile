import { ImageRequireSource } from "react-native"

export type TInstituition = {
    name: string,
    logo: ImageRequireSource
}

export const INSTITUITIONS : TInstituition[] = [
    {
     name: "Nubank",
     logo: require("assets/InstituitionsLogos/nubank.jpeg")
    },
    {
     name: "Mercado Pago",
     logo: require("assets/InstituitionsLogos/mercadopago.jpeg")
    },
    {
     name: "Bradesco",
     logo: require("assets/InstituitionsLogos/bradesco.jpeg")
    },
    {
     name: "Itaú",
     logo: require("assets/InstituitionsLogos/itau.jpg")
    },
    {
     name: "Iti Itaú",
     logo: require("assets/InstituitionsLogos/itiitau.jpeg")
    },
    {
     name: "Banco do Brasil",
     logo: require("assets/InstituitionsLogos/bancobrasil.jpeg")
    },
    {
     name: "Santander",
     logo: require("assets/InstituitionsLogos/santander.jpeg")
    },
    {
     name: "Banco Pan",
     logo: require("assets/InstituitionsLogos/bancopan.jpeg")
    },
    {
     name: "C6 Bank",
     logo: require("assets/InstituitionsLogos/c6bank.jpeg")
    },
    {
     name: "Ailos",
     logo: require("assets/InstituitionsLogos/ailos.jpeg")
    },
    {
     name: "Caju",
     logo: require("assets/InstituitionsLogos/caju.jpeg")
    },
    {
     name: "Alelo",
     logo: require("assets/InstituitionsLogos/alelo.jpeg")
    },
 ]