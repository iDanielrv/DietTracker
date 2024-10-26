<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { UserFilled, DArrowRight } from "@element-plus/icons-vue";

// Define emits para o componente, incluindo um para nomes de pessoas clicadas
const emit = defineEmits(["updateCollapse", "personClicked"]);

const isCollapse = ref(true);

// Função chamada quando o menu é aberto
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
  emit("updateCollapse", false);
};

// Função chamada quando o menu é fechado
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
  emit("updateCollapse", true);
};

// Função para alternar o estado de colapso do menu
const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value;
};

// Nova função para lidar com o clique nos nomes das pessoas
const handlePersonClick = (name: string) => {
  console.log("Pessoa clicada:", name);
  emit("personClicked", name); // Emitindo o nome da pessoa clicada
};
</script>

<template>
  <div class="menuStyle">
    <el-menu
      background-color="#ffff"
      default-active="2"
      class="el-menu-vertical-demo"
      text-color="#000"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-menu-item index="1">
        <el-icon>
          <el-button @click="toggleCollapse" :icon="DArrowRight" circle />
        </el-icon>
      </el-menu-item>

      <!-- Evento adicionado ao item de menu para "Monique" -->
      <el-menu-item index="2" @click="handlePersonClick('Monique')">
        <el-icon><UserFilled /></el-icon>
        <template #title>Monique</template>
      </el-menu-item>

      <!-- Evento adicionado ao item de menu para "Daniel" -->
      <el-menu-item index="3" @click="handlePersonClick('Daniel')">
        <el-icon><UserFilled /></el-icon>
        <template #title>Daniel</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style scoped>
.routerLinkCss {
  text-decoration: none;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
.el-menu-vertical-demo {
  border: none;
}
.menuStyle {
  background-color: #fff;
}
</style>
