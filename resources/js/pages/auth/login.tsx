import BrandButtonPrimary from "@/components/ui/brand-button-primary";
import BrandInput from "@/components/ui/brand-input";
import { Form, router } from "@inertiajs/react";
import { store } from "@/routes/login";
import AuthLayout from "@/layouts/auth-layout";
import InputError from "@/components/input-error";
import BrandInputCheckbox from "@/components/ui/brand-input-checkbox";

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}


export default function login({
    status,
    canResetPassword,
    canRegister,
}: LoginProps) {


    const ShowErrors = (errors: any) => {
        if (errors.email)
            return <div className="text-left">
                <InputError message={errors.email}></InputError>
            </div>
    }

    return (

        <div className="bg-brand-background w-screen min-h-screen flex flex-col justify-center">
            <div className="bg-brand-white w-1/4 min-w-md p-12 mx-auto rounded-2xl text-center">
                <h3 className="text-2xl font-bold mb-4">Autenticación</h3>
                <hr className="mb-14 border-gray-400"></hr>
                <Form
                    {...store.form()}
                    resetOnSuccess={['password']}
                    className="flex flex-col gap-6"
                >
                    {({ processing, errors }) => ((
                        <>
                            <BrandInput type="email" required name="email">Usuario</BrandInput>
                            <BrandInput type="password" required name="password">Contraseña</BrandInput>
                            {
                                ShowErrors(errors)
                            }
                            <div className="text-left">
                                <div className="inline-block">
                                    <BrandInputCheckbox label="Recuerdame"></BrandInputCheckbox>
                                </div>
                            </div>
                            <div className="text-end">
                                <BrandButtonPrimary type="submit">Entrar</BrandButtonPrimary>
                            </div>
                        </>
                    ))}

                </Form>
            </div>
        </div>
    );
}