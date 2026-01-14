import InputAvatarUpload from "@/components/input-avatarupload"
import BrandButtonPrimary from "@/components/ui/brand-button-primary"
import BrandInput from "@/components/ui/brand-input"
import { store } from "@/routes/register"
import { Form } from "@inertiajs/react"

export default function SignUp() {
    return (
        <>
            <div className="bg-brand-background w-screen min-h-screen flex flex-col justify-center">
                <div className="bg-brand-white w-4/12 p-12 mx-auto rounded-2xl text-center">
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