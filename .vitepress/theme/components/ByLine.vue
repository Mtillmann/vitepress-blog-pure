<template>
    <h1>{{ page.title }}</h1>
    <p>
        <span v-if="page.frontmatter.date">posted on 
            <span :data-date="date.toISOString()">{{ date.toLocaleDateString() }}</span>
        </span>
        <span v-if="page.frontmatter.updated">, updated on 
            <span :data-date="updated.toISOString()">{{ updated.toLocaleDateString() }}</span>
        </span>
    </p>
</template>
<script setup>
import { useData } from 'vitepress'
import { ref } from 'vue'
const { page } = useData();
const date = ref();
date.value = page.value.frontmatter.date ? new Date(page.value.frontmatter.date) : null;
const updated = ref();
updated.value = page.value.frontmatter.updated ? new Date(page.value.frontmatter.updated) : null;


</script>