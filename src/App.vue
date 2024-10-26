<script setup>
import { ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import Menu from "./components/Menu.vue";

const isMenuCollapsed = ref(true);
const person = ref('')


const updateCollapse = (value) => {
  isMenuCollapsed.value = value;
};

const selectedPerson = (value) => {
  console.log('teste:::');
  console.log(value);
  person.value = value;
};



</script>

<template>
  <div>
    <el-container style="height: 100vh">
      <Menu @updateCollapse="updateCollapse" @personClicked="selectedPerson"></Menu>
      <el-container class="testando3">
        <el-main class="testando3">
          {{ person }} Information::::
          <div >
            <RouterView />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.testando2 {
  background-color: #0f4c75;
}

.testando3 {
  background-color: #1B262C;
  color: white;
}
</style>
