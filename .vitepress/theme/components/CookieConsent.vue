<template>
    <div id="cookieButton" ref="button" :style="`display: ${!isOpen ? 'block' : 'none'};`">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-shield-lock" viewBox="0 0 16 16">
  <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"/>
  <path d="M9.5 6.5a1.5 1.5 0 0 1-1 1.415l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99a1.5 1.5 0 1 1 2-1.415z"/>
</svg>
    </div>
    <div id="cookieConsent" ref="div" :style="`display: ${isOpen ? 'block' : 'none'};`">
        <div class="backdrop"></div>
        <div class="foreground">
            <div>


                I'd like to use
                <a href="">Google Fonts</a>
                (<code>{{ state.fonts ? 'accepted' : 'not accepted' }}</code>)
                and
                <a href="">Google Analytics</a>
                (<code>{{ state.analytics ? 'accepted' : 'not accepted' }}</code>)
                on this website.
            </div>
            <div>



                <button @click="accept([])" class="accept-none">Accept None</button>
                <button @click="accept(['fonts'])" class="accept-fonts">Accept Fonts</button>
                <button @click="accept(['fonts', 'analytics'])" class="accept-all">Accept All</button>
            </div>
        </div>
    </div>
</template>

<script setup>

import { ref, onMounted } from 'vue';
const div = ref(null);
const isOpen = ref(false);

const fontCSS = `
<style>
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,600;0,700;1,400&family=Rubik&display=swap');
</style>
`;

const analyticsJS = `asdf`;

onMounted(() => {
    
    if(!state.value.isSet) {
        div.value.style.display = 'block';
    }

    if (state.value.fonts) {
        document.head.insertAdjacentHTML('beforeend', fontCSS);
    }
    if (state.value.analytics) {
        document.head.insertAdjacentHTML('beforeend', analyticsJS);
    }
});

const state = ref(null);
const key = 'blog_consent_state';
state.value = {
    fonts: false,
    analytics: false,
    ...(JSON.parse(localStorage.getItem(key)) ?? {})
}


const accept = function (what) {
    what = Object.fromEntries(what.map((w) => [w, true]));
    what.isSet = true;
    localStorage.setItem(key, JSON.stringify(what));
    state.value = what;

}



</script>
<style scoped>
#cookieConsent {
    z-index: 2222;
    position: fixed;

    .backdrop {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
        background-color: rgba(0, 0, 0, 0.5);
    }

    .foreground {
        display: flex;
        flex-direction: column;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        border: 1px solid #000;
        background-color: var(--vp-c-bg);
        padding: 2rem;
        justify-content: center;

        &>div {
            margin-bottom:1rem;
            display: flex;
            justify-content: center;
        }

        & code {
            border-radius: 4px;
            padding: 2px 2px 0px 2px;
            background-color: var(--vp-code-bg);
            transition: color 0.25s, background-color 0.5s;
            font-size: var(--vp-code-font-size);
            color: var(--vp-code-color);

        }

        & button {
            border: 1px solid #000;
            border-radius: 4px;
            padding: 3px 6px;
            background-color: var(--vp-c-bg);
            transition: color 0.25s, background-color 0.5s;
            font-size: var(--vp-code-font-size);
            color: var(--vp-code-color);
            margin: 0 0.5rem;
            cursor: pointer;

            &.accept-none {
                /* background-color: var(--vp-c-danger-soft); */
            }

            &.accept-fonts {
                /* background-color: var(--vp-c-warning-soft); */
            }

            &.accept-all {
                background-color: var(--vp-c-tip-soft);
            }

            &:hover {
                background-color: var(--vp-c-bg-hover);
                color: var(--vp-c-text-1);
            }
        }
    }
}
</style>