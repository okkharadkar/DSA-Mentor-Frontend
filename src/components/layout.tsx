import { PropsWithChildren } from "react"
import { Header } from "./header"
import { Footer } from "./Footer"
// import { ModeToggle } from "./mode-toggle"

export const Layout = ({ children }: PropsWithChildren) => {
    return (

        <div className="bg-gradient-to-br from-background to-muted">
            <div>
                <Header></Header>

            </div>
            <main className="min-h-screen container mx-auto mt-16 px-4 py-12">
                {children}

            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>


    )
}

