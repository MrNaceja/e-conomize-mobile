import { Spinner, Heading } from 'native-base'
import Screen from 'components/Screen'

export default function LoadingScreen() {
    return (
        <Screen justifyContent="center" alignItems="center">
            <Spinner color="green.500" size={80} />
        </Screen>
    )
}