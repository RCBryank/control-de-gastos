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
        Schema::create('periodic_income', function (Blueprint $table) {
            $table->id();
            $table->string("concept");
            $table->date("date_begin");
            $table->date("date_end")->nullable(true);
            $table->integer("income_frequency")->default(1);
            $table->decimal("amount")->default(0);
            $table->boolean("excludefrom_savingsgoal")->default(false);
            $table->string("notes")->nullable(true);
            $table->foreignId("categoryincome_id")->constrained("category_income", "id");
            $table->foreignId("appuseraccount_id")->constrained("appuser_account", "id");
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('periodic_income');
    }
};
