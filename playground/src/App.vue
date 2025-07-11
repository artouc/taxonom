<script setup lang="ts">
import TaxonomDemo from './components/TaxonomDemo.vue'
</script>

<template lang="pug">
.l-app
    header.l-app__header
        .c-header
            h1.c-header__title Taxonom Playground
            p.c-header__description Vue.js向け高速マークダウンパーサーのデモ
    
    main.l-app__main
        TaxonomDemo
    
    footer.l-app__footer
        .c-footer
            p.c-footer__text 
                | Made by 
                a.c-footer__link(
                    href="https://osa.xyz"
                    target="_blank"
                    rel="noopener noreferrer"
                ) Original SIN Architecture
</template>

<style scoped lang="sass">
@use "@osaxyz/universtyle" as osa

.l-app
    min-height: 100vh
    display: flex
    flex-direction: column
    
    &__header
        background: #cce2e8
        padding: osa.fibo(3) 0
        
    &__main
        flex: 1
        padding: osa.fibo(3) osa.fibo(2)
        max-width: 1200px
        margin: 0 auto
        width: 100%
        
    &__footer
        background: var(--color-gray-100, #f5f5f5)
        padding: osa.fibo(2) 0
        margin-top: osa.fibo(4)

.c-header
    max-width: 1200px
    margin: 0 auto
    padding: 0 osa.fibo(2)
    
    &__title
        font-size: osa.harmonic(3)
        margin: 0
        margin-bottom: osa.fibo(1)
        
    &__description
        font-size: osa.harmonic(0)
        margin: 0
        opacity: 0.9

.c-footer
    max-width: 1200px
    margin: 0 auto
    padding: 0 osa.fibo(2)
    text-align: center
    
    &__text
        margin: 0
        font-size: osa.harmonic(-1)
        color: var(--color-gray-600, #6b7280)
        
    &__link
        color: var(--color-primary, #2563eb)
        text-decoration: none
        
        &:hover
            text-decoration: underline
</style>