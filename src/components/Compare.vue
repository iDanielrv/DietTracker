<template>
    <div class="graph-container">
      <div class="month-container">
        <h4>{{ months[0].name }}</h4>
        <!-- Alterado para acessar o mês atual -->
        <div class="weekdays">
          <span v-for="(day, i) in daysOfWeek" :key="i" class="weekday">
            {{ day }}
          </span>
        </div>
        <svg :width="totalWidth" :height="totalHeight">
          <g v-for="(week, weekIndex) in months[0].weeks" :key="weekIndex">
            <!-- Alterado para acessar o mês atual -->
            <rect
              v-for="(day, dayIndex) in week"
              :key="dayIndex"
              class="day"
              :width="cellSize"
              :height="cellSize"
              :x="dayIndex * daySize"
              :y="weekIndex * daySize"
              :fill="day ? day.color : 'black'"
            />
          </g>
        </svg>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed } from "vue";
  import dayjs from "dayjs";
  
  export default {
    name: "ContributionGraph",
    setup() {
      const cellSize = 12;
      const daySize = 20;
  
      const today = ref(dayjs()); // Data atual
      const endDate = dayjs('2025-01-20'); // Data Final
      const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  
      // Criar um único mês (mês atual)
      const months = computed(() => {
        const month = today.value.startOf("month"); // Começa com o mês atual
        const daysInMonth = month.daysInMonth();
  
        const monthData = {
          name: month.format("MMMM YYYY"),
          weeks: [],
        };
  
        let week = new Array(7).fill(null);
        const firstDayOfWeek = month.day();
  
        for (let day = 1; day <= daysInMonth; day++) {
          const dayIndex = (firstDayOfWeek + day - 1) % 7;
  
          // Adiciona uma nova semana se for domingo e já há dias na semana
          if (dayIndex === 0 && week.some((d) => d !== null)) {
            monthData.weeks.push(week);
            week = new Array(7).fill(null);
          }
  
          const firstDayOfMonth = 1;
          console.log(day);
  
          // Verifica se o dia do loop é igual ao dia atual
          if (day === firstDayOfMonth) {
            week[dayIndex] = { color: "blue" }; // Cor especial para o primeiro dia do mês
          } else if (day === today.value.date() && day <= daysInMonth) {
            week[dayIndex] = { color: "green" }; // Dia atual
          } else if (day < today.value.date() && day <= daysInMonth) {
            week[dayIndex] = { color: "white" }; // Dia passado
          } else if (day > today.value.date() && day <= daysInMonth) {
            week[dayIndex] = { color: "orange" }; // Dia futuro
          } else {
            week[dayIndex] = { color: "#fffff" }; // Mantenha o quadrado vazio se o dia for inválido
          }
        }
  
        // Adiciona a última semana se não estiver vazia
        if (week.some((d) => d !== null)) {
          monthData.weeks.push(week);
        }
  
        return [monthData]; // Retorna apenas o mês atual como array
      });
  
      const totalWidth = computed(() => 7 * daySize);
      const totalHeight = computed(
        () => months.value[0].weeks.length * daySize || daySize
      );
  
      return {
        cellSize,
        daySize,
        daysOfWeek,
        months,
        totalWidth,
        totalHeight,
      };
    },
  };
  </script>
  
  <style>
  .graph-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
  }
  .month-container {
    margin-bottom: 20px;
    text-align: center;
  }
  .weekdays {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    margin-bottom: 5px;
  }
  .weekday {
    width: 18px; /* Espaçamento para cada dia */
    text-align: center;
  }
  .day {
    rx: 2;
  }
  </style>
  