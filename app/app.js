new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    game: {
      isRunning: false
    }
  },
  methods: {
    startGame() {
      this.game.isRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
    },
    attack() {
      // Reducing monsterHealth after attacking him
      this.monsterHealth -= this.calcDamage(3, 10);
      if (this.checkWin()) return;

      this.monsterAttack();
    },
    calcDamage(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    checkWin() {
      if (this.monsterHealth <= 0 || this.playerHealth <= 0) {
        if (confirm("GAME OVER! NEW GAME?")) {
          this.startGame();
        } else {
          this.game.isRunning = false;
        }
        return true;
      }
    },
    // specialAttack just deals more damage
    specialAttack() {
      this.monsterHealth -= this.calcDamage(10, 20);
      if (this.checkWin()) return;

      this.monsterAttack();
    },
    monsterAttack() {
      this.playerHealth -= this.calcDamage(5, 12);
      this.checkWin();
    },
    heal() {
      if (this.playerHealth <= 90) {
        this.playerHealth += 10;
      } else {
        this.playerHealth = 100;
      }
      this.monsterAttack();
    },
    giveUp() {
      this.game.isRunning = false;
    }
  }
});
