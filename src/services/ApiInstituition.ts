import axios, { AxiosInstance } from "axios"
import { API_INSTITUITION_URL, API_INSTITUITION_KEY } from "@env"

const ApiInstituition = axios.create({
    baseURL: API_INSTITUITION_URL,
    headers: {
        Authorization: `Bearer ${API_INSTITUITION_KEY}`
    }
})

// https://autocomplete.clearbit.com/v1/companies/suggest?query=
// fetch('https://autocomplete.clearbit.com/v1/companies/suggest?query=ail', { headers: { Authorization: 'Bearer sk_43ebba9058ff16fae08307ed72e09fd8' }}).then(res => res.json()).then(res => console.log(res)).catch(err => console.log(err))


// fetch('https://company.clearbit.com/v1/domains/find?name=ailos', { headers: { Authorization: 'Bearer sk_43ebba9058ff16fae08307ed72e09fd8' }}).then(res => res.json()).then(res => console.log(res)).catch(err => console.log(err))


export default ApiInstituition as AxiosInstance
