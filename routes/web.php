<?php

use App\Http\Controllers\AppuserAccountController;
use App\Http\Controllers\CategoryExpenseController;
use App\Http\Controllers\CategoryIncomeController;
use App\Http\Controllers\ExpenseRecordController;
use App\Http\Controllers\IncomeRecordController;
use App\Http\Controllers\PeriodicExpenseController;
use App\Http\Controllers\PeriodicIncomeController;
use Illuminate\Http\Request;
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

    //== Accounts ==/
    Route::get('miscuentas', function () {
        return Inertia::render('accounts');
    })->name('accounts');

    Route::get('miscuentas/nueva', function () {
        return Inertia::render('new-account');
    })->name('newaccount');
    Route::post('miscuentas/nueva', [AppuserAccountController::class, 'store']);

    Route::get('accounts', [AppuserAccountController::class, 'get']);
    Route::get('selectaccounts', [AppuserAccountController::class, 'getfromuser']);

    //== Expenses ==//
    Route::get('gastos', function () {
        return Inertia::render('expenses');
    });

    Route::get('gastos/find', [ExpenseRecordController::class, 'getfiltered']);

    //== Expense Record ==//
    Route::get('nuevogasto', function () {
        return Inertia::render('new-expense');
    });
    Route::post('nuevogasto', [ExpenseRecordController::class, 'store']);

    //== Periodic Expense Record ===//
    Route::get('nuevogastoperiodico', function () {
        return Inertia::render('new-periodic-expense');
    });
    Route::post('nuevogastoperiodico', [PeriodicExpenseController::class, 'store']);

    Route::get('selectperiodicexpenses', [PeriodicExpenseController::class, 'selectgetfromuser']);

    Route::get('category_expense/all', [CategoryExpenseController::class, 'all']);

    //== Incomes ==//
    Route::get('ingresos', function () {
        return Inertia::render('incomes');
    });

    Route::get('ingresos/find', [IncomeRecordController::class, 'getfiltered']);

    //== Income Record ==//
    Route::get('nuevoingreso', function () {
        return Inertia::render('new-income');
    });
    Route::post('nuevoingreso', [IncomeRecordController::class, 'store']);

    Route::get('editaringreso/{id}', [IncomeRecordController::class, 'edit']);
    Route::put('editaringreso/{id}', [IncomeRecordController::class, 'update']);

    Route::delete('deleteincomerecord', [IncomeRecordController::class, 'delete']);

    //== Periodic Income Record ==//
    Route::get('nuevoingresoperiodico', function () {
        return Inertia::render('new-periodic-income');
    });
    Route::post('nuevoingresoperiodico', [PeriodicIncomeController::class, 'store']);

    Route::get('selectperiodicincomes', [PeriodicIncomeController::class, 'selectgetfromuser']);

    Route::get('category_income/all', [CategoryIncomeController::class, 'all']);
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
