<?php

namespace App\Actions\Fortify;

use App\Models\AppUser;
use App\Models\Avatar;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;
use Laravel\Fortify\Contracts\CreatesNewUsers;
use PhpParser\Node\VarLikeIdentifier;
use Symfony\Component\HttpFoundation\Request;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): AppUser
    {
        Validator::make(
            $input,
            [
                'name' => ['required', 'string', 'max:255'],
                'email' => [
                    'required',
                    'string',
                    'email',
                    'max:255',
                    Rule::unique(AppUser::class),
                ],
                'userpassword' => $this->passwordRules(),
            ],
            [
                'name.required' => 'El campo Nombre es requerido.',
                'email.unique' => 'Ya existe una cuenta con el email especificado.',
                'userpassword' => 'La contraseña debe tener una longitud minima de 8 caracteres.'
            ]
        )->validate();

        $request = request();
        $file = $request->file('input_avatarprofile');
        $max_avatarprofile_size = 200;
        Validator::validate(
            array('avatarprofile' => $file),
            ['avatarprofile' => File::types(['jpeg', 'png', 'webp'])
                ->max($max_avatarprofile_size)],
            ['avatarprofile' => "El avatar del perfil excede el limite de peso ($max_avatarprofile_size kb)"]
        );

        $avatar = null;
        if (isset($file) && $file->isValid()) {
            $path = $file->store('avatars', 'public');
            if ($path != false) {
                $avatar = Avatar::create([
                    'filename' => $file->getClientOriginalName(),
                    'public_path' => $path,
                    'filesize' => $file->getSize()
                ]);
            }
        }

        $appUser = AppUser::create([
            'name' => $input['name'],
            'lastname' => isset($input['lastname']) ? $input['lastname'] : '',
            'email' => $input['email'],
            'userpassword' => $input['userpassword'],
            'avatar_id' => $avatar ? $avatar->id : null
        ]);

        return $appUser;
    }
}
