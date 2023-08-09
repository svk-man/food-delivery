<template>
    <div class="not-found-page">
        <div class="not-found-page__content">
            <LottieAnimation
                :animation-data="AnimationJSON"
                :auto-play="true"
                :loop="true"
                :speed="1"
                ref="animation"
            />
            <h2 class="not-found-page__title font-inter-700">Ошибка 404. <span>Что-то пошло не так.</span></h2>
            <p class="not-found-page__text q-my-md q-mx-auto font-inter-400">
                Страница, которую вы ищете, временно недоступна или её уже нет
            </p>
            <q-btn
                href="/"
                label="Вернуться на главную"
                class="full-width not-found-page__btn font-inter-500"
                push
                padding="md"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { LottieAnimation } from 'lottie-web-vue';
import AnimationJSON from './animation.json';

const animation = ref();

onMounted(() => {
    setTimeout(() => {
        animation.value.goToAndPlay(150, true);
    }, 500);
});

defineComponent({
    name: 'ErrorNotFound',
});
</script>

<style lang="scss" scoped>
.not-found-page {
    padding: 48px 64px;
    background-color: $primary;
    font-style: normal;
    text-align: center;
    &__content {
        max-width: 400px;
        margin: 0 auto;
    }
    &__title {
        margin: 0;
        font-size: 32px;
        line-height: 40px;
        color: #1d1d1f;
        > span {
            display: inline-block;
        }
    }
    &__text {
        max-width: 300px;
        font-size: 16px;
        line-height: 24px;
        color: #686870;
    }
    &__btn {
        border-radius: 12px;
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
        color: white;
        background: #00cc2d;
    }
}

@media (max-width: $breakpoint-xs-max) {
    .not-found-page {
        padding: 16px;
        &__content {
            max-width: 310px;
        }
        &__title {
            font-size: 20px;
            line-height: 24px;
        }
    }
}
</style>
