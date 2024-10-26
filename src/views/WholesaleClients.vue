<script setup lang="ts">
import { computed, ref } from 'vue'

interface User {
  date: string
  cnpj: string
  address: string
  phone: string
}

const search = ref('')
const filterTableData = computed(() =>
  tableData.filter(
    (data) =>
      !search.value ||
      data.cnpj.toLowerCase().includes(search.value.toLowerCase()) ||
      data.phone.includes(search.value)
  )
)
const handleEdit = (index: number, row: User) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: User) => {
  console.log(index, row)
}

const tableData: User[] = [
  {
    date: '2016-05-03',
    cnpj: '23.135.734/0001-83',
    address: 'No. 189, Grove St, Los Angeles',
    phone: '987654321',
  },
  {
    date: '2016-05-02',
    cnpj: '88.785.831/0001-23',
    address: 'No. 189, Grove St, Los Angeles',
    phone: '947654321',

  },
  {
    date: '2016-05-04',
    cnpj: '45.964.371/0001-48',
    address: 'No. 189, Grove St, Los Angeles',
    phone: '987654321',

  },
  {
    date: '2016-05-01',
    cnpj: '74.284.921/0001-28',
    address: 'No. 189, Grove St, Los Angeles',
    phone: '987654321',
  },
]


</script>

<template>
  <el-table :data="filterTableData" style="width: 100%">
    <el-table-column label="Date" prop="date" />
    <el-table-column label="Cnpj" prop="cnpj" />
    <el-table-column label="Phone" prop="phone" />
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="small" placeholder="Type to search" />
      </template>
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
          Edit
        </el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
        >
          Delete
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>

</style>
