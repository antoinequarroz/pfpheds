<script setup>
import { ref } from 'vue';
import { useLayout } from '@/layout/composables/layout';
const name = ref('');
const email = ref('');
const message = ref('');
const content = ref([
    { icon: 'pi pi-fw pi-phone', title: 'Phone', info: '1 (833) 597-7538' },
    { icon: 'pi pi-fw pi-map-marker', title: 'Our Head Office', info: 'Churchill-laan 16 II, 1052 CD, Amsterdam' },
    { icon: 'pi pi-fw pi-print', title: 'Fax', info: '3 (833) 297-1548' }
]);
const { layoutConfig } = useLayout();
</script>

<template>
    <div class="grid card grid-nogutter" style="column-gap: 2rem; row-gap: 2rem">
        <div class="col-12">
            <p class="text-900 font-bold">Contact Us</p>
        </div>
        <div class="col-12 mt-3 h-20rem border-1 surface-border p-0 w-full bg-cover border-round" :style="{ backgroundImage: `url('/demo/images/contact/map-${layoutConfig.colorScheme.value === 'light' ? 'light' : 'dark'}.svg')` }"></div>
        <div class="col-12 mt-5">
            <div class="grid grid-nogutter px-2 flex-column md:flex-row" :style="{ columnGap: '2rem', rowGap: '2rem' }">
                <div v-for="(item, i) in content" :key="i" class="col flex flex-column justify-content-center text-center align-items-center border-1 surface-border py-5 px-4 border-round">
                    <i class="pi pi-fw text-2xl text-primary" :class="item.icon"></i>
                    <span class="text-900 font-bold mt-4 mb-1">{{ item.title }}</span>
                    <span class="text-500">{{ item.info }}</span>
                </div>
            </div>
        </div>

        <div class="col-12 mt-5">
            <p class="text-900 font-bold">Send Us Email</p>
            <div class="grid flex-column md:flex-row formgrid grid-nogutter mt-6" :style="{ rowGap: '2rem', columnGap: '2rem' }">
                <div class="field col">
                    <label for="name" class="block text-indigo-300 font-bold"> Name </label>
                    <IconField iconPosition="left" class="w-full" :style="{ height: '3.5rem' }">
                        <InputIcon class="pi pi-user" :style="{ left: '1.5rem' }" />
                        <InputText id="name" type="text" v-model="name" placeholder="Name" class="w-full px-7 text-900 font-semibold" :style="{ height: '3.5rem' }" />
                    </IconField>
                </div>

                <div class="field col">
                    <label for="email" class="block text-indigo-300 font-bold"> Email Address </label>
                    <IconField iconPosition="left" class="w-full" :style="{ height: '3.5rem' }">
                        <InputIcon class="pi pi-envelope" :style="{ left: '1.5rem' }" />
                        <InputText type="text" v-model="email" placeholder="Email" class="w-full px-7 text-900 font-semibold" :style="{ height: '3.5rem' }" />
                    </IconField>
                </div>

                <div class="field col-12 flex flex-column">
                    <label for="message" class="block text-indigo-300 font-bold"> Message </label>
                    <Textarea id="message" :rows="5" :cols="30" v-model="message" class="text-900 font-semibold" />
                    <Button class="ml-auto mt-3 border-round" label="Send Message"></Button>
                </div>
            </div>
        </div>
    </div>
</template>
