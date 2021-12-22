<template>
  <div class="tank" :class="type">
      <div class="tank-content" :style="{height: fullness + '%'}"></div>
      <div class="tank-persantage">{{ fullness }}%</div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

const tankType = { charge: 'charge', feed: 'feed', water: 'water' };

export default defineComponent({
  props: {
    fullness: {
      type: Number,
      default: null,
    },
    type: {
      type: String,
      default: tankType.charge,
    },
  },
});
</script>

<style lang="scss" scoped>
.tank {
    border: 3px solid $grey-5;
    border-radius: 10px;
    width: 150px;
    height: 250px;
    position: relative;

      &.charge {
        height: 230px;
        top: 20px;

        &::before {
          content: "";
          width: 60px;
          height: 20px;
          position: absolute;
          left: calc(50% - 30px);
          top: -20px;
          border: 3px solid #bdbdbd;
          border-radius: 5px 5px 0 0;
          border-bottom: 0;
          background: #fff;
        }

        .tank-content {
          background-color: $green-5;
        }

      }

      &.water {
        .tank-content {
          background-color: $blue-5;
        }
      }

      &.feed {
        .tank-content {
          background-color: $brown-5;
        }
      }

    &-content {
        width: calc(100% - 6px);
        max-height: calc(100% - 6px);
        position: absolute;
        border-radius: 0 0 5px 5px;
        bottom: 3px;
        left: 3px;
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
