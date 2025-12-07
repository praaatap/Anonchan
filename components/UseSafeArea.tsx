import { SafeAreaView } from "react-native-safe-area-context";


export default function UseSafeAre({ children }: { children: React.ReactNode }) {
    return <SafeAreaView>
        {children}
    </SafeAreaView>
}
