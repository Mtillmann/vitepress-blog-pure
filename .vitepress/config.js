import { defineConfig } from 'vitepress'
import { getPosts } from './theme/serverUtils'
import package from '../package.json';
import { readdirSync, writeFileSync } from 'fs';
import { log } from 'console';

const pageSize = 10

export default defineConfig({
    title: 'Martin\'s Blog',
    base: '/',
    cacheDir: './node_modules/vitepress_cache',
    description: 'vitepress,blog,blog-theme',
    ignoreDeadLinks: true,
    themeConfig: {
        posts: await getPosts(pageSize),
        website: 'https://mtillmann.github.io', //copyright link
        comment: {
            repo: 'Mtillmann/mtillmann.github.io',
            themes: 'github-light',
            issueTerm: 'pathname'
        },
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Archives', link: '/pages/archives' },
            { text: 'Tags', link: '/pages/tags' },
            // { text: 'About', link: '/pages/about' },
        ],
        search: {
            provider: 'local',
        },
        //outline:[2,3],
        outlineTitle: 'Outline',
        socialLinks: [{ 
            icon: 'github', 
            link: 'https://github.com/Mtillmann/mtillmann.github.io' 
        }]
    },
    srcExclude: ['README.md'], // exclude the README.md , needn't to compiler

    vite: {
        build: { minify: true },
        server: { port: 5000 }
    },
    sitemap: {
        hostname: 'https://mtillmann.github.io'
    }
})
