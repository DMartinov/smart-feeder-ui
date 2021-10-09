<template>
  <div class="tank">
      <div class="tank-content" :class="color" :style="{height: fullness + '%'}"></div>
      <div class="tank-persantage">{{ fullness }}%</div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

const collors = { green: 'green', blue: 'blue', brown: 'brown' };

export default defineComponent({
  props: {
    fullness: {
      type: Number,
      default: null,
    },
    color: {
      type: String,
      default: collors.green,
    },
  },
});
</script>

<style lang="scss" scoped>
.tank {
    border: 1px solid $grey-7;
    border-radius: 5px;
    width: 150px;
    height: 250px;
    position: relative;

    &-content {
        width: 100%;
        position: absolute;
        bottom: 0;
        background-color: $green-5;

        &.green {
            background-color: $green-5;
        }

        &.blue {
            background-color: $blue-5;
        }

        &.brown {
            background-color: $brown-5;
        }
    }
    &-persantage {
        position: absolute;
        top: 40%;
        width: 100%;
        font-size: 1.5rem;
        text-align: center;
    }
}
</style>
