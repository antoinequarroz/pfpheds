<template>
    <div class="card docs">
        <h2>Getting Started</h2>
        <p>
            Apollo is an application template and has 2 version in it. Vue 3 based on <a href="https://github.com/vuejs/create-vue" class="font-medium text-primary hover:underline">create-vue</a>, the recommended way to start a
            <strong>Vite-powered</strong> Vue projects. Nuxt 3 based on <a href="https://nuxt.com/docs/getting-started/installation" class="font-medium text-primary hover:underline">nuxi</a>, the recommended way to start a <strong>Nuxt 3</strong> Vue
            projects. To get started, extract the contents of the zip file, cd to the directory and install the dependencies with npm, yarn or pnpm.
        </p>
        <pre class="app-code"><code>npm install</code></pre>

        <p>Next step is running the application using the serve script and navigate to <i>http://localhost:3000/</i> to view the application. That is it, you may now start with the development using the Apollo template.</p>

        <pre class="app-code"><code>npm run dev</code></pre>

        <h4>Structure</h4>
        <p>Apollo consists of a couple folders, demos and layout have been separated so that you can easily remove what is not necessary for your application.</p>
        <ul class="line-height-3">
            <li><span class="text-primary font-medium">layouts</span>: Main layout files, need to be present</li>
            <li><span class="text-primary font-medium">pages</span>: Demo pages</li>
            <li><span class="text-primary font-medium">public/demo</span>: Assets used in demos</li>
            <li><span class="text-primary font-medium">public/layout</span>: Assets used in layout</li>
            <li><span class="text-primary font-medium">assets/demo</span>: Styles used in demos</li>
            <li><span class="text-primary font-medium">assets/layout</span>: SCSS files of the main layout</li>
        </ul>

        <h4>Default Configuration</h4>
        <p>
            Initial layout configuration can be defined at the main app component by injecting the composable from
            <span class="text-primary font-medium">layouts/composables/layout</span>, this step is optional and only necessary when customizing the defaults. Note that <span class="text-primary font-medium">theme</span> and
            <span class="text-primary font-medium">scale</span> are not reactive at the moment since theme is configured outside of Vue. In Vite version at <strong class="font-semibold">main.js</strong> and In Nuxt version at
            <strong class="font-semibold">nuxt.config.js</strong> by default and initial scale is defined with the <span class="text-primary font-medium">$scale</span> at <strong class="font-semibold">layout.scss</strong>. When default theme or scale
            is changed at their files initially, it is required to configure the layout service with the matching values to avoid sync issues.
        </p>

        <h5>Vite</h5>
        <pre class="app-code"><code>&lt;script setup&gt;
import &#123; useLayout &#125; from '@/layout/composables/layout';

const &#123; layoutConfig &#125; = useLayout();
layoutConfig.menuMode.value = 'slim';
&lt;/script&gt;

&lt;template&gt;
    &lt;router-view /&gt;
&lt;/template&gt;

&lt;style scoped&gt;&lt;/style&gt;
</code></pre>

        <h5>Nuxt</h5>
        <pre class="app-code"><code>&lt;script setup&gt;
import &#123; useLayout &#125; from '@/layout/composables/layout';

const &#123; layoutConfig &#125; = useLayout();
layoutConfig.menuMode.value = 'slim';
&lt;/script&gt;

&lt;template&gt;
    &lt;NuxtLayout&gt;
        &lt;NuxtPage /&gt;
    &lt;/NuxtLayout&gt;
&lt;/template&gt;

&lt;style scoped&gt;&lt;/style&gt;
</code></pre>

        <h4>Menu</h4>
        <p>
            Main menu is located at
            <span class="text-primary font-medium">layouts/AppMenu.vue</span> file. Update the <span class="text-primary font-medium">model</span> property to define the menu of your application using PrimeVue MenuModel API.
        </p>
        <pre class="app-code"><code>&lt;script setup&gt;
import &#123; ref &#125; from 'vue';

import AppSubMenu from './AppSubMenu.vue';

const model = ref([
    &#123;
        label: 'Dashboards',
        icon: 'pi pi-home',
        items: [
            &#123;
                label: 'E-Commerce',
                icon: 'pi pi-fw pi-home',
                to: '/'
            &#125;,
            &#123;
                label: 'Banking',
                icon: 'pi pi-fw pi-image',
                to: '/dashboard-banking'
            &#125;
        ]
    &#125;,
    //...
</code></pre>

        <h4>Breadcrumb</h4>
        <p>
            Breadcrumb component at the topbar section is dynamic and retrieves the path information from the router using the
            <span class="text-primary font-medium">meta.breadcrumb</span> property.
        </p>

        <pre class="app-code"><code>&#123;
    path: '/uikit/formlayout',
    name: 'formlayout',
    meta: {
        breadcrumb: ['UI Kit', 'Form Layout']
    },
    component: () => import('@/features/uikit/FormLayout.vue')
&#125;,</code></pre>

        <h4>Integration with Existing Vite Applications</h4>
        <p>Only the folders that are related to the layout needs to move in to your project. We've created a short tutorial with details. It is based on Sakai but flow is exactly the same with Apollo.</p>

        <div class="video-container">
            <iframe class="video" width="560" height="315" src="https://www.youtube.com/embed/AHeSjJFR3ZE" frameborder="0" allowfullscreen></iframe>
        </div>

        <h4>PrimeVue Theme</h4>
        <p>
            Apollo provides 24 PrimeVue themes out of the box. Setup of a theme is simple by including the css of theme to your bundle that are located inside <span class="text-primary font-medium">public/layout/styles/theme/</span> folder such as
            <span class="text-primary font-medium">public/layout/styles/theme/theme-light/indigo/theme.css</span>.
        </p>

        <p>A custom theme can be developed by the following steps.</p>
        <ul>
            <li class="line-height-4">Choose a custom theme name such as "mytheme".</li>
            <li class="line-height-4">
                Create a folder named "mytheme" under
                <span class="font-semibold">public/layout/styles/theme/theme-light/mytheme</span>
                folder.
            </li>
            <li class="line-height-4">Create a file such as theme.scss inside your "mytheme" folder.</li>
            <li class="line-height-4">Define the variables listed below in your file and import the dependencies.</li>
            <li class="line-height-4">
                Include the theme.scss in your application via an import in
                <i>assets/styles.scss</i> or simply refer to the compiled css with a link tag. Note that if you choose the former, the theme will be bundled with the rest of your app.
            </li>
        </ul>

        <p>Here are the variables required to create a theme.</p>
        <pre class="app-code"><code>$primaryColor: #6366f1 !default;
$primaryLightColor: #c7d2fe !default;
$primaryDarkColor: #4f46e5 !default;
$primaryDarkerColor: #4338ca !default;
$primaryTextColor: #ffffff !default;
$primary500: #6366f1 !default;

$highlightBg: #eef2ff !default;
$highlightTextColor: $primaryDarkerColor !default;
$highlightFocusBg: rgba($primaryColor, 0.24) !default;

@import '../_variables';
@import '../../theme-base/_components';
@import '../_extensions';
</code></pre>

        <h4>Theme Switcher</h4>
        <p>
            Dynamic theming is built-in to the template and implemented by including the theme via a link tag instead of bundling the theme along with a configurator component to switch it. In order to switch your theme dynamically as well, it needs
            to be compiled to css. An example sass command to compile the css would be;
        </p>

        <pre class="app-code"><code>sass --update public/layout/styles/assets/theme-light/mytheme.scss:public/layout/styles/assets/theme-light/mytheme.css</code></pre>

        <p class="text-sm">*Note: The sass command above is supported by Dart Sass. Please use Dart Sass instead of Ruby Sass.</p>

        <h4>Theme Designer</h4>
        <p>
            Apollo includes a simplified version of the
            <a href="https://www.primefaces.org/designer/primevue">PrimeVue Theme Designer</a>
            that only includes the main SASS structure. Full list of SASS variables to customize the components further is available at the
            <a href="https://www.primefaces.org/designer/api/primevue/3.9.0/" class="font-medium text-primary hover:underline">SASS API</a>
            docs.
        </p>

        <h4>Migration</h4>
        <p>
            Initial integration with an existing Vite application and the migration process is similar. During an update, only the layout folder and layout assets folder need to be updated, see the "Integration with Existing Vite Applications"
            section for more information. Important changes are also documented at CHANGELOG.md file.
        </p>
    </div>
</template>

<style lang="scss" scoped>
@media screen and (max-width: 991px) {
    .video-container {
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom: 56.25%;

        iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    }
}
</style>
