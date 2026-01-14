<?php

namespace App\Actions\Fortify;

use App\Models\AppUser;
use App\Models\Avatar;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;
use Symfony\Component\HttpFoundation\Request;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): string
    {
        Validator::make($input, [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique(AppUser::class),
            ],
            'userpassword' => $this->passwordRules(),
        ])->validate();

        $request = request();
        $file = $request->file('input_avatarprofile');

        $avatar = null;
        if ($file->isValid()) {
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
            'lastname' => $input['lastname'],
            'email' => $input['email'],
            'userpassword' => $input['userpassword'],
            'avatar_id' => $avatar ? $avatar->id : null
        ]);


        return $appUser;
    }
}
