<template>
  <div class="graph-container">
    <div class="month-container" v-for="(month, index) in months" :key="index">
      <h4>{{ month.name }}</h4>
      <div class="weekdays">
        <span v-for="(day, i) in daysOfWeek" :key="i" class="weekday">
          {{ day }}
        </span>
      </div>
      <svg :width="totalWidth" :height="totalHeight">
        <g v-for="(week, weekIndex) in month.weeks" :key="weekIndex">
          <rect
            v-for="(day, dayIndex) in week"
            :key="dayIndex"
            class="day"
            :width="cellSize"
            :height="cellSize"
            :x="dayIndex * daySize"
            :y="weekIndex * daySize"
            :fill="day ? day.color : 'rgba(255, 255, 255, 0)'"
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


    const dailyStatus = {
      octuber: ["success","fail","success","fail","success","fail","success","fail","success","fail","success","fail","success","fail","success","fail","success","fail","success","fail","success","fail","success","fail","success","fail","success","fail","success","fail",],
      november: ["fail","success","fail","success","fail","success","fail","success","fail","success","fail","success","fail","success","fail","success","fail","success","fail","success","fail","success","fail","success","fail","success","fail","success","fail","success",],
      dezember: ["fail","fail","fail","fail","fail","fail","fail","fail","fail","success","success","success","success","success","success","success","success","success","success","success","success","success","success","success",],
    };

    const cellSize = 12;
    const daySize = 20;

    const today = ref(dayjs()); // Data atual
    const endDate = dayjs('2025-01-30'); // Data Final
    const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

    // Calcular a diferença em meses entre today e endDate
    const numberOfMonths = computed(() => {
      return endDate.diff(today.value, 'month') + 1; // Adiciona 1 para incluir o mês do endDate
    });

    // Criar meses (a partir do mês atual)
    const months = computed(() => {
      const monthDataArray = [];

      // Loop para os próximos meses
      for (let i = 0; i < numberOfMonths.value; i++) {
        const month = today.value.add(i, 'month').startOf("month"); // Mês atual ou próximo
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

          // Definir a cor dos dias
          if (day === 1) {
            week[dayIndex] = { color: "white" }; // Cor especial para o primeiro dia do mês
          } else if (day === daysInMonth) {
            week[dayIndex] = { color: "pink" }; // Cor especial para o último dia do mês
          } else if (month.isSame(today.value, 'month') && day === today.value.date()) {
            week[dayIndex] = { color: "green" }; // Dia atual
          } else if (day === endDate.date() && month.isSame(endDate, 'month')) {
            week[dayIndex] = { color: "purple" }; // Cor especial para o dia do endDate
          } else if (month.isSame(today.value, 'month') && day < today.value.date()) {
            week[dayIndex] = { color: "white" }; // Dia passado
          } else {
            week[dayIndex] = { color: "#FFFFFF" }; // Cor padrão para dias não válidos
          }
        }

        // Adiciona a última semana se não estiver vazia
        if (week.some((d) => d !== null)) {
          monthData.weeks.push(week);
        }

        monthDataArray.push(monthData); // Adiciona os dados do mês ao array
      }

      // Adiciona mês de janeiro se necessário
      const january = today.value.add(numberOfMonths.value, 'month').startOf("month");
      const januaryDaysInMonth = january.daysInMonth();
      const januaryData = {
        name: january.format("MMMM YYYY"),
        weeks: [],
      };

      let januaryWeek = new Array(7).fill(null);
      const januaryFirstDayOfWeek = january.day();

      for (let day = 1; day <= januaryDaysInMonth; day++) {
        const dayIndex = (januaryFirstDayOfWeek + day - 1) % 7;

        // Adiciona uma nova semana se for domingo e já há dias na semana
        if (dayIndex === 0 && januaryWeek.some((d) => d !== null)) {
          januaryData.weeks.push(januaryWeek);
          januaryWeek = new Array(7).fill(null);
        }

        // Definir a cor dos dias em janeiro
        if (day === 1) {
          januaryWeek[dayIndex] = { color: "white" }; // Cor especial para o primeiro dia do mês
        } else if (day === januaryDaysInMonth) {
          januaryWeek[dayIndex] = { color: "white" }; // Cor especial para o último dia do mês
        } else if (day === endDate.date() && january.isSame(endDate, 'month')) {
          januaryWeek[dayIndex] = { color: "purple" }; // Cor especial para o dia do endDate
        } else {
          januaryWeek[dayIndex] = { color: "white" }; // Cor padrão para dias não válidos
        }
      }

      // Adiciona a última semana de janeiro se não estiver vazia
      if (januaryWeek.some((d) => d !== null)) {
        januaryData.weeks.push(januaryWeek);
      }

      monthDataArray.push(januaryData); // Adiciona os dados do mês de janeiro ao array

      return monthDataArray; // Retorna os meses gerados
    });

    const totalWidth = computed(() => 7 * daySize);
    const totalHeight = computed(() => months.value.length * (daySize * Math.max(...months.value.map(month => month.weeks.length))) || daySize);

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
