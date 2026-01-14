<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('appuser_account', function (Blueprint $table) {
            $table->id();
            $table->string('name', 64)->nullable(false);
            $table->string('account_number', 64);
            $table->string('bank');
            $table->string('description');
            $table->decimal('account_balance', 14, 2)->default(0);
            $table->foreignId('accounttype_id')->default(1)->constrained('account_type', 'id');
            $table->foreignId('appuser_id')->nullable(false)->constrained('app_user', 'id');
            $table->timestamps();
        });
        /*
            - Nombre_Cuenta
- Numero_Cuenta
- Banco
- Descripcion
- Presupuesto
- ID_TipoCuenta
- ID_Usuario
        */
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appuser_account');
    }
};
