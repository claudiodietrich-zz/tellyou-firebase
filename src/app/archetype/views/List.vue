<template>
  <section class="section">
    <div class="container">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <h1 class="title">
              {{ $tc('archetype.label', 2) }}
            </h1>
          </div>
        </div>

        <div class="level-right">
          <div class="level-item">
            <router-link class="button is-primary is-rounded"
              v-bind:to="{ name: 'archetypeCreate' }">
              {{ $t('default.label.add', [ $tc('archetype.label', 1) ]) }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
