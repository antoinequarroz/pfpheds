<template>
  <div class="serious-game-layout">
    <Navbar />

    <div class="game-container">
      <aside class="sidebar-left">
        <LeftGameSidebar />
      </aside>

      <main class="main-content">
        <h1>Simulation Infirmière - Pinia Store</h1>

        <!-- Barre de progression -->
        <div class="progress-indicator">
          <p>Étape {{ game.currentStep }} / {{ game.totalSteps }}</p>
          <div class="progress-bar">
            <div
              class="progress-fill"
              :style="{ width: game.progressPercent + '%' }"
            ></div>
          </div>
        </div>
        <p class="score-label">Score : {{ game.score }}</p>

        <!-- Canvas -->
        <canvas
          ref="gameCanvas"
          width="400"
          height="300"
          @keydown="handleKeydown"
          tabindex="0"
        ></canvas>

        <!-- DialogueBox (étape 1) -->
        <DialogueBox
          v-if="game.currentStep === 1 && game.showDialogue"
          :dialogLines="game.dialogLinesStep1"
          :currentLineIndex="game.dialogIndex"
          @next-line="game.nextDialogueLine"
          @close-dialog="game.closeDialogue"
        />

        <!-- Étape 3 : affichage des mesures (si on est en step 3) -->
        <section v-if="game.currentStep === 3" class="measures-section">
          <h2>Constantes mesurées</h2>
          <ul>
            <li><strong>Tension :</strong> {{ game.measuredTension }}</li>
            <li><strong>Température :</strong> {{ game.measuredTemperature }}°C</li>
            <li><strong>Pouls :</strong> {{ game.measuredPulse }} bpm</li>
          </ul>
          <button @click="game.goNextStep">Étape suivante</button>
        </section>

        <!-- Étape 4 : question -->
        <QuestionMultipleChoice
          v-if="game.currentStep === 4"
          :question="game.questionData.question"
          :choices="game.questionData.choices"
          @answer="game.answerQuestion"
        />

        <!-- Étape 5 : feedback final -->
        <section v-if="game.currentStep === 5">
          <h2>{{ game.feedbackTitle }}</h2>
          <p>{{ game.feedbackText }}</p>
          <p>Score final : {{ game.score }}</p>
          <button @click="game.resetScenario">Recommencer</button>
        </section>
      </main>

      <aside class="sidebar-right">
        <RightGameSidebar />
      </aside>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Utils/Navbar.vue'
import LeftGameSidebar from './LeftGameSidebar.vue'
import RightGameSidebar from './RightGameSidebar.vue'
import DialogueBox from './DialogueBox.vue'
import QuestionMultipleChoice from './QuestionMultipleChoice.vue'
import { useGameStore } from '@/stores/gameStore.js'
export default {
  name: 'SeriousGameManagement',
  components: {
    Navbar,
    LeftGameSidebar,
    RightGameSidebar,
    DialogueBox,
    QuestionMultipleChoice,
  },
  setup() {
    // On récupère notre store
    const game = useGameStore()

    return { game }
  },
  methods: {
    handleKeydown(e) {
      e.preventDefault()
      switch (e.key) {
        case 'ArrowUp':
          this.game.moveNurse('up')
          break
        case 'ArrowDown':
          this.game.moveNurse('down')
          break
        case 'ArrowLeft':
          this.game.moveNurse('left')
          break
        case 'ArrowRight':
          this.game.moveNurse('right')
          break
      }
      // On redessine la scène
      this.drawGame()

      // Étape 1 : check patient
      if (this.game.currentStep === 1) {
        this.game.checkPatientEncounter()
      }

      // Étape 2 : check items
      if (this.game.currentStep === 2) {
        this.game.checkItemsCollection()
      }
    },
    drawGame() {
      const canvas = this.$refs.gameCanvas
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      // Effacer
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      // Fond
      ctx.fillStyle = '#ecf0f1'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Dessiner le patient si step <= 3
      if (this.game.currentStep <= 3) {
        ctx.fillStyle = '#2ecc71'
        ctx.fillRect(
          this.game.patientX,
          this.game.patientY,
          this.game.patientSize,
          this.game.patientSize
        )
      }

      // Dessiner les items si step=2
      if (this.game.currentStep === 2) {
        this.game.itemsList.forEach(item => {
          if (!item.collected) {
            ctx.fillStyle = item.color
            ctx.fillRect(item.x, item.y, item.width, item.height)
          }
        })
      }

      // Dessiner le nurse (bleu)
      ctx.fillStyle = '#3498db'
      ctx.fillRect(
        this.game.nurseX,
        this.game.nurseY,
        this.game.nurseSize,
        this.game.nurseSize
      )
    },
  },
  mounted() {
    // Focus sur le canvas
    this.$refs.gameCanvas.focus()
    // Dessin initial
    this.drawGame()
  },
}
</script>

<style scoped>
.serious-game-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.game-container {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  gap: 1rem;
  flex: 1;
  padding: 1rem;
  background-color: #f9f9f9;
}
.sidebar-left,
.sidebar-right {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 1rem;
  overflow-y: auto;
}
.main-content {
  background-color: #fff;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.progress-indicator {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.progress-bar {
  background-color: #ecf0f1;
  border-radius: 8px;
  height: 10px;
  width: 100%;
  overflow: hidden;
}
.progress-fill {
  background-color: #2980b9;
  height: 100%;
  transition: width 0.4s ease;
}
.score-label {
  text-align: right;
  margin-top: -1.5rem;
  color: #e74c3c;
  font-weight: bold;
}
canvas {
  border: 2px solid #7f8c8d;
  border-radius: 4px;
  outline: none;
}
.measures-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
