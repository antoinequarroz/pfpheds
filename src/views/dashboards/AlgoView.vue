<template>
  d
  <PageTemplate>
    <template #left>
      <LeftSidebar />
    </template>
    <template #default>
      <AlgoComponent />
    </template>
    <template #right>
      <RightSidebar />
    </template>
  </PageTemplate>
</template>

<script setup>
import PageTemplate from '@/components/Template/PageTemplate.vue'
import LeftSidebar from '@/components/Bibliotheque/Social/LeftSidebar.vue'
import AlgoComponent from '@/components/Dashboard/DashboardDetails/AlgoComponent.vue'
import RightSidebar from '@/components/Bibliotheque/Social/RightSidebar.vue'
</script>

<style scoped>

.template-right-sidebar h3 {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: #334155;
}
.template-right-sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.template-right-sidebar li {
  margin-bottom: 0.7rem;
  color: #475569;
}
</style>
