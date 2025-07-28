<script setup>
import { ref, onMounted } from 'vue';
import { CustomerService } from '@/service/CustomerService';
import { FilterMatchMode } from 'primevue/api';
import { useRouter } from 'vue-router';

const router = useRouter();

const tableRef = ref(null);
const curtomerService = new CustomerService();
const customers = ref([]);
const filterTable = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

onMounted(async () => {
    customers.value = await curtomerService.getCustomersLarge();
});

const formatDate = (value) => {
    return new Date(value).toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};

const navigateToCreateListPage = () => {
    router.push({ name: 'user-create' });
};
</script>

<template>
    <div class="card">
        <DataTable
            ref="tableRef"
            :value="customers"
            paginator
            :rows="10"
            showCurrentPageReport
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
            :rowsPerPageOptions="[10, 25, 50]"
            :globalFilterFields="['name', 'country.name', 'representative.name']"
            v-model:filters="filterTable"
        >
            <template #header>
                <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                    <IconField iconPosition="left" class="w-full sm:w-20rem flex-order-1 sm:flex-order-0">
                        <InputIcon class="pi pi-search" />
                        <InputText v-model="filterTable.global.value" placeholder="Global Search" class="w-full" />
                    </IconField>
                    <Button type="button" icon="pi pi-user-plus" label="Add New" class="w-full sm:w-auto flex-order-0 sm:flex-order-1" outlined @click="navigateToCreateListPage" />
                </div>
            </template>
            <Column field="name" header="Name" sortable headerClass="white-space-nowrap" :style="{ width: '25%' }">
                <template #body="{ data }">
                    <span class="p-column-title">Name</span>
                    {{ data.name }}
                </template>
            </Column>
            <Column field="country.name" header="Country" sortable headerClass="white-space-nowrap" :style="{ width: '25%' }">
                <template #body="{ data }">
                    <img :alt="data.country.name" src="/demo/images/flag/flag_placeholder.png" :class="'w-2rem mr-2 flag flag-' + data.country.code" />
                    <span class="image-text">{{ data.country.name }}</span>
                </template>
            </Column>
            <Column field="date" header="Join Date" sortable headerClass="white-space-nowrap" :style="{ width: '25%' }">
                <template #body="{ data }"> {{ formatDate(data.date) }} </template>
            </Column>
            <Column field="representative.name" header="Created By" headerClass="white-space-nowrap" :style="{ width: '25%' }" sortable>
                <template #body="{ data }">
                    <div class="inline-flex align-items-center">
                        <img :alt="data.representative.name" :src="`/demo/images/avatar/${data.representative.image}`" class="w-2rem mr-2" />
                        <span>{{ data.representative.name }}</span>
                    </div>
                </template>
            </Column>
            <Column field="activity" header="Activity" headerClass="white-space-nowrap" :style="{ width: '25%' }" sortable>
                <template #body="{ data }">
                    <ProgressBar
                        :value="data.activity"
                        :showValue="false"
                        :style="{
                            height: '.5rem'
                        }"
                    />
                </template>
            </Column>
        </DataTable>
    </div>
</template>
