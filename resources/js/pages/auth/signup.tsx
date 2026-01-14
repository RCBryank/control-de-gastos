import InputAvatarUpload from "@/components/input-avatarupload"
import InputError from "@/components/input-error"
import BrandButtonPrimary from "@/components/ui/brand-button-primary"
import BrandInput from "@/components/ui/brand-input"
import { store } from "@/routes/register"
import { Form } from "@inertiajs/react"

export default function SignUp() {

    const ShowErrors = (errors: []) => {
        errors.map((error, index) => {
            return <InputError message={error}></InputError>
        })
    }

    return (
        <>
            <div className="bg-brand-background w-screen min-h-screen flex flex-col justify-center">
                <div className="w-1/4 md:w-2/4 bg-brand-white p-12 mx-auto rounded-2xl text-center my-6">
                    <h3 className="text-2xl font-bold mb-4">Registro</h3>
                    <hr className="mb-14 border-gray-400"></hr>
                    <Form {...store.form()}
                        resetOnSuccess={['password', 'password_confirmation']}
                        disableWhileProcessing
                        className="flex flex-row gap-6"
                        encType="multipart/form-data"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="flex-1 text-left">
                                    <InputAvatarUpload />
                                </div>
                                <div className="flex-7/12 grow-0">
                                    <div className="flex flex-col gap-6">
                                        <BrandInput name="name">Nombre(s)</BrandInput>
                                        <BrandInput name="lastname">Apellidos</BrandInput>
                                        <BrandInput name="email" type="email" >Email</BrandInput>
                                        <BrandInput name="userpassword" type="password" >Contraseña</BrandInput>
                                        <div className="text-left">
                                            <ul>
                                                {Object.entries(errors).map(([error, message]: [string, string]) => (
                                                    <li><InputError message={message} /></li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="w-auto ml-auto">
                                            <BrandButtonPrimary>Registrarse</BrandButtonPrimary>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </Form>
                </div>
            </div>
        </>
    )
}