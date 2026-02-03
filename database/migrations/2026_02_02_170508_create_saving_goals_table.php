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
        Schema::create('saving_goal', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->date("date_begin");
            $table->date("date_end");
            $table->decimal("target_amount", 14,2)->default(0);
            $table->foreignId("appuseraccount_id")->constrained("appuser_account");
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('saving_goal');
    }
};
