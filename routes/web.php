<?php

use App\Http\Controllers\AppuserAccountController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('miscuentas', function () {
        return Inertia::render('accounts');
    })->name('accounts');

    Route::get('miscuentas/nueva', function () {
        return Inertia::render('new-account');
    })->name('newaccount');

    Route::post('miscuentas/nueva', [AppuserAccountController::class, 'store']);
    Route::get('accounts', [AppuserAccountController::class, 'get']);
});

Route::middleware('guest')->group(function () {
    Route::get('login', function () {
        return Inertia::render('auth/login');
    });

    Route::get('signup', function () {
        return Inertia::render('auth/signup');
    });
});

require __DIR__ . '/settings.php';
