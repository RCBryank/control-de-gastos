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
        $this->down();
        Schema::create('expense_record', function (Blueprint $table) {
            $table->id();
            $table->string("concept");
            $table->date("date");
            $table->decimal("ammount")->default(0);
            $table->boolean("excludefrom_savingsgoal")->default(false);
            $table->string("notes")->nullable(true);
            $table->foreignId("categoryexpense_id")->constrained("category_expense", "id");
            $table->foreignId("appuseraccount_id")->constrained("appuser_account", "id");
            $table->foreignId("periodicexpense_id")->nullable(true)->constrained("periodic_expense", "id");
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expense_record');
    }
};
