import { SignUp } from '@clerk/nextjs';

const SignUpPage = () => {
    return (
        <div className='pt-6 px-4 md:px-8 lg:px-12'>
            <h1 className='text-3xl md:text-5xl pb-6'>Inscription</h1>
            <div className='flex justify-center'>
                <SignUp />
            </div>
        </div>
    );
};

export default SignUpPage;