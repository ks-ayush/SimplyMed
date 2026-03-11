import { SignIn } from '@clerk/nextjs'

export default function Page() {
    return (
        <main className='bg-gray-100'>

            <div className='flex justify-center py-16'>
                <SignIn forceRedirectUrl="/dashboard" />
            </div>

        </main>

    )

}