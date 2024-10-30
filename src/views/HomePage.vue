<script setup>
import { ref } from "vue";
import dayjs from "dayjs";
import { Calendar, Edit } from "@element-plus/icons-vue";
import ContributionGraph from "../components/ContributionGraph.vue";

const value2 = ref(dayjs("2025-01-30 00:00"));


// Data atual
const currentDate = dayjs();

// Data final
const endDate = dayjs('2025-01-20');

// Obter a diferença em meses
const differenceInMonths = endDate.diff(currentDate, 'month');

// Listar os meses entre a data atual e a data final
const monthsList = [];
for (let i = 0; i <= differenceInMonths; i++) {
  const monthName = currentDate.add(i, 'month').format('MMMM YYYY');
  monthsList.push(monthName);
}

// Adiciona o mês de janeiro de 2025
if (endDate.month() === 0 && endDate.year() > currentDate.year()) {
  monthsList.push(endDate.format('MMMM YYYY'));
}

console.log(`Número de meses: ${differenceInMonths + 1}`); // +1 para incluir o mês atual
console.log('Meses:', monthsList);


</script>

<template>
    <el-row :gutter="20" class="container">
        <!-- Coluna Principal, ocupa metade da tela no desktop, toda a tela no celular -->
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
            <div class="box main-content">
                <el-row>
                    <el-col>
                        <div class="textStyle">
                            <el-button type="primary" :icon="Edit" circle />
                            <el-countdown class="whiteText" format="DD [days] HH:mm:ss" :value="value2">
                                <template #title>
                                    <div style="display: inline-flex; align-items: center" class="whiteText">
                                        <el-icon style="margin-right: 4px" :size="12">
                                            <Calendar />
                                        </el-icon>
                                        Still to go until next month
                                    </div>
                                </template>
                            </el-countdown>
                            <div class="countdown-footer">
                                {{ value2.format("YYYY-MM-DD") }}
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </el-col>

        <!-- Coluna Secundária, ocupa metade da tela no desktop, toda a tela no celular -->
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
            <div class="box secondary-content">Abrir calendario</div>
            <div></div>
        </el-col>

        <!-- Coluna de Rodapé, sempre ocupa toda a tela em qualquer tamanho -->
        <el-col :span="24">
            <div class="box third-content">third content</div>
            <ContributionGraph :tasks="[true, false, true, false, true, false, true]" startDate="2024-01-01"
                endDate="2024-12-31" />
        </el-col>

        <el-col :span="24">
            <div class="box footer">Rodapé</div>
        </el-col>
    </el-row>
</template>

<style scoped>
.whiteText {
    color: white;
}

::v-deep .el-statistic__content {
    color: white;
}

.container {
    padding: 20px;
}

.box {
    background-color: #f5f5f5;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    text-align: center;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.main-content {
    background-color: #4caf50;
    color: white;
}

.secondary-content {

    background-color: #2196f3;
    color: white;
}

.third-content {

    background-color: purple;
    color: white;
}

.footer {
    background-color: #ff9800;

    color: white;
}
</style>
