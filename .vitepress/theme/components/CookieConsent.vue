<template>
    
    <div id="cookieConsent" ref="div" :style="`display: ${isOpen ? 'block' : 'none'};`">
        <div class="backdrop"></div>
        <div class="foreground">
            <div>
                <div>

                


                
                I'd like to use Google Fonts
                 (<code>{{ state.fonts ? 'accepted' : 'not accepted' }}</code>) 
                 and 
                Google Analytics
                (<code>{{ state.analytics ? 'accepted' : 'not accepted' }}</code>)
                on this website. <a :href="withBase('pages/privacy-policy')">Privacy Policy.</a>
                </div>
            </div>
            <div>



                <button @click="accept([])" class="accept-none">Accept None</button>
                <button @click="accept(['fonts'])" class="accept-fonts">Accept Fonts</button>
                <button @click="accept(['fonts', 'analytics'])" class="accept-all">Accept All</button>
            </div>
            <div>
                You can change your settings later by clicking the shield icon in the navigation.
            </div>
        </div>
    </div>
</template>

<script setup>

import {withBase} from 'vitepress';
import { ref, onMounted } from 'vue';
const div = ref(null);
const isOpen = ref(false);

let ls = {
    getItem: () => null,
    setItem: () => null,
};


const fontCSS = `
<style>
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,600;0,700;1,400&family=Rubik&display=swap');
</style>
`;

const analyticsJS = `asdf`;

onMounted(() => {

    ls = localStorage;
    document.querySelector('.VPSocialLink[aria-label*="Privacy"]').addEventListener('click', e => {
        e.preventDefault();
        isOpen.value = true;
    });
    
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
    ...(JSON.parse(ls.getItem(key)) ?? {})
}


const accept = function (what) {
    what = Object.fromEntries(what.map((w) => [w, true]));
    what.isSet = true;
    ls.setItem(key, JSON.stringify(what));
    state.value = what;
    isOpen.value = false;

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

            & a {
                text-decoration: underline;
            }
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