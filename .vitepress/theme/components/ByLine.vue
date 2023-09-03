<template>
    <h1>{{ page.title }}</h1>
    <p>
        <span v-if="page.frontmatter.date">posted on 
            <span>{{ new Date(page.frontmatter.date).toLocaleDateString() }}</span>
        </span>
        <span v-if="page.frontmatter.updated">, updated on 
            <span>{{ new Date(page.frontmatter.updated).toLocaleDateString() }}</span>
        </span>

    </p>
</template>
<script setup>
import { useData } from 'vitepress'
import { ref } from 'vue'
const { page } = useData();
</script>