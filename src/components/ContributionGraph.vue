<template>
  <div class="graph-container">
    <div class="textWeekGroup">
        <div class="textWeek">Dom</div>
        <div class="textWeek">Seg</div>
        <div class="textWeek">Ter</div>
        <div class="textWeek">Qua</div>
        <div class="textWeek">Qui</div>
        <div class="textWeek">Sex</div>
        <div class="textWeek">Sab</div>
    </div>
    <svg :width="totalWidth" :height="totalHeight">
      <g v-for="(week, weekIndex) in weeks" :key="weekIndex" :transform="`translate(${weekIndex * daySize}, 0)`">
        <rect
          v-for="(day, dayIndex) in week"
          :key="dayIndex"
          class="day"
          :width="cellSize"
          :height="cellSize"
          :y="dayIndex * daySize"
          :fill="day === null ? emptyColor : day ? completedColor : notCompletedColor"
        />
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: "ContributionGraph",
  data() {
    return {
      daysInYear: 90,
      cellSize: 12, // Tamanho de cada célula
      daySize: 18, // Tamanho total com espaçamento
      completedColor: "#4CAF50", // Verde para tarefa realizada
      notCompletedColor: "#FF5252", // Vermelho para tarefa não realizada
      emptyColor: "#ebedf0", // Cor de dias em branco no início
    };
  },
  computed: {
    weeks() {
      const weeks = [];
      let dayCount = 0;
      const totalWeeks = Math.ceil(this.daysInYear / 7);
      const firstDayOfYear = this.getFirstDay();
      
      for (let week = 0; week < totalWeeks; week++) {
        const weekDays = [];
        for (let day = 0; day < 7; day++) {
          if (week === 0 && day < firstDayOfYear) {
            weekDays.push(null); // Dias vazios no início
          } else if (dayCount <= this.daysInYear) {
            weekDays.push(this.isTaskCompleted()); // Preenche os dias com valores de tarefa
            dayCount++;
          } else {
            weekDays.push(null); // Dias extras vazios no final
          }
        }
        weeks.push(weekDays);
      }
      return weeks;
    },
    totalWidth() {
      return this.weeks.length * this.daySize;
    },
    totalHeight() {
      return 7 * this.daySize;
    },
  },
  methods: {
    // Retorna o dia da semana do primeiro dia do ano (0 = domingo, 1 = segunda, etc.)
    getFirstDay() {
      const today = new Date();
      const firstDay = new Date(today.getFullYear(), 0, 1);
      console.log('testando::::');
      console.log(firstDay);
      
        console.log('aaaaaa');
        console.log(today.getDay());
        console.log(firstDay.getDay());
        
        

      return firstDay.getDay();
    },
    // Simula uma tarefa concluída ou não (1 = concluída, 0 = não concluída)
    isTaskCompleted() {
      return Math.random() > 0.5 ? 1 : 0;
    },
  },
};
</script>

<style>
.textWeek {
    font-size: 15px;
}

.textWeekGroup {
    margin-right: 10px;
}

.graph-container {
  display: flex;
  justify-content: center;
  padding: 20px;
}
.day {
  rx: 2; /* Borda arredondada para as células */
}
</style>
