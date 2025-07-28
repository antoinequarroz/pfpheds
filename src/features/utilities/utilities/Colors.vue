<script setup>
import { ref, computed } from 'vue';
import { useLayout } from '@/layout/composables/layout';

const { layoutConfig } = useLayout();

const darkMode = computed(() => {
    return layoutConfig.colorScheme.value !== 'light';
});

const colors = ref(['blue', 'green', 'yellow', 'cyan', 'pink', 'indigo', 'red', 'teal', 'orange', 'bluegray', 'purple', 'gray', 'primary']);

const shades = ref([0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900]);
</script>

<template>
    <div class="card">
        <h2>Colors</h2>
        <p>Each PrimeVue theme exports its own color palette.</p>

        <h4>Getting Started</h4>
        <p>Colors are exported as CSS variables and used with the standard <i>var</i> syntax such as <i>var(--text-color)</i>.</p>

        <pre class="app-code"><code>&lt;span :style="{color:var(--text-color)}"&gt;&lt;/span&gt;</code></pre>

        <h4>PrimeFlex Integration</h4>
        <p>Color utility classes of PrimeFlex such as background, text and border use the exported CSS variables from the theme so PrimeFlex or PrimeBlocks are perfectly compatible with the provided themes.</p>

        <pre class="app-code"><code>&lt;div class="bg-blue-500"&gt;&lt;/div&gt;</code></pre>

        <h4>Exported Colors</h4>
        <p>Following is the list of colors exported as CSS variables from the theme.</p>
        <div class="card">
            <table class="w-full">
                <thead>
                    <tr>
                        <th class="text-900 text-left p-2">Variable</th>
                        <th class="text-900 text-left p-2">Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="border-bottom-1 surface-border p-2"><span class="font-medium">--text-color</span></td>
                        <td class="border-bottom-1 surface-border p-2">Font text color.</td>
                    </tr>
                    <tr>
                        <td class="border-bottom-1 surface-border p-2"><span class="font-medium">--text-color-secondary</span></td>
                        <td class="border-bottom-1 surface-border p-2">Muted font text color with a secondary level.</td>
                    </tr>
                    <tr>
                        <td class="border-bottom-1 surface-border p-2"><span class="font-medium">--primary-color</span></td>
                        <td class="border-bottom-1 surface-border p-2">Primary color of the theme.</td>
                    </tr>
                    <tr>
                        <td class="border-bottom-1 surface-border p-2"><span class="font-medium">--primary-color-text</span></td>
                        <td class="border-bottom-1 surface-border p-2">Text color when background is primary color.</td>
                    </tr>
                    <tr>
                        <td class="border-bottom-1 surface-border p-2"><span class="font-medium">--font-family</span></td>
                        <td class="border-bottom-1 surface-border p-2">Font family of the theme.</td>
                    </tr>
                    <tr>
                        <td class="border-bottom-1 surface-border p-2"><span class="font-medium">--surface-ground</span></td>
                        <td class="border-bottom-1 surface-border p-2">Base ground color.</td>
                    </tr>
                    <tr>
                        <td class="border-bottom-1 surface-border p-2"><span class="font-medium">--surface-section</span></td>
                        <td class="border-bottom-1 surface-border p-2">Color of a section on a ground surface.</td>
                    </tr>
                    <tr>
                        <td class="border-bottom-1 surface-border p-2"><span class="font-medium">--surface-card</span></td>
                        <td class="border-bottom-1 surface-border p-2">Color of a surface used as a card.</td>
                    </tr>
                    <tr>
                        <td class="border-bottom-1 surface-border p-2"><span class="font-medium">--surface-overlay</span></td>
                        <td class="border-bottom-1 surface-border p-2">Color of overlay surfaces.</td>
                    </tr>
                    <tr>
                        <td class="border-bottom-1 surface-border p-2"><span class="font-medium">--surface-border</span></td>
                        <td class="border-bottom-1 surface-border p-2">Color of a divider.</td>
                    </tr>
                    <tr>
                        <td class="border-bottom-1 surface-border p-2"><span class="font-medium">--surface-hover</span></td>
                        <td class="border-bottom-1 surface-border p-2">Color of an element in hover state.</td>
                    </tr>
                    <tr>
                        <td class="border-bottom-1 surface-border p-2"><span class="font-medium">--focus-ring</span></td>
                        <td class="border-bottom-1 surface-border p-2">Box shadow of a focused item.</td>
                    </tr>
                    <tr>
                        <td class="border-bottom-1 surface-border p-2"><span class="font-medium">--maskbg</span></td>
                        <td class="border-bottom-1 surface-border p-2">Background color of an overlay mask.</td>
                    </tr>
                    <tr>
                        <td class="p-2"><span class="font-medium">--border-radius</span></td>
                        <td class="p-2">Border radius of an element.</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <h4>Color Palette</h4>
        <p>A palette consists of 9 colors where each color provides tints/shades from 50 to 900.</p>

        <div class="card">
            <div class="flex flex-wrap">
                <div v-for="color in colors" :key="color" class="flex flex-column mr-6 mb-6">
                    <div v-for="shade in shades" :key="shade">
                        <div v-if="shade !== 0" class="flex align-items-center w-19rem p-3 font-bold" :style="{ backgroundColor: 'var(--' + color + '-' + shade, color: shade > 500 ? '#fff' : '#000' }">{{ color }}-{{ shade }}</div>
                    </div>
                </div>
            </div>
        </div>

        <h4>Surfaces</h4>
        <p>In addition, a theme brings a special palette called surfaces that can be used as the base when designing the surface layers and separators.</p>
        <div class="card">
            <div class="flex flex-column">
                <div v-for="shade in shades" :key="shade">
                    <div class="flex align-items-center w-19rem p-3 font-bold" :style="{ backgroundColor: 'var(--surface-' + shade, color: darkMode ? (shade > 400 ? '#000' : '#fff') : shade > 500 ? '#fff' : '#000' }">surface-{{ shade }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
