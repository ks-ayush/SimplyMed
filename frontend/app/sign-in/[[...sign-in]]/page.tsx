import { SignIn } from '@clerk/nextjs'

export default function Page() {
    

    return (
        <main className='bg-gray-100 min-h-screen'>

            <div className='flex justify-center items-center h-screen'>
                <SignIn forceRedirectUrl={"/dashboard"} />
            </div>

        </main>

    )

}