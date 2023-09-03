<template>
    <Layout>
        <template #doc-before>
            <ByLine />
        </template>
    </Layout>
    <Copyright />
</template>
<script setup>
import DefaultTheme from 'vitepress/theme'
import Copyright from './Copyright.vue'
import ByLine from './ByLine.vue'
const { Layout } = DefaultTheme

</script>
