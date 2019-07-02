new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    turns: [],
    game: {
      isRunning: false
    }
  },
  methods: {
    startGame() {
      this.game.isRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      // reseting log
      this.turns = [];
    },
    attack() {
      let damage = this.calcDamage(3, 10);
      this.monsterHealth -= damage;
      // TURN
      this.turns.unshift({
        isPlayer: true,
        text: `Player hits Monster for ${damage}`
      });
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
    specialAttack() {
      let damage = this.calcDamage(10, 20);
      this.monsterHealth -= damage;
      if (this.checkWin()) return;
      this.turns.unshift({
        isPlayer: true,
        text: `Player hits hard Monster for ${damage}`
      });
      this.monsterAttack();
    },
    monsterAttack() {
      let damage = this.calcDamage(5, 12);
      this.playerHealth -= damage;
      // TURN
      this.turns.unshift({
        isPlayer: false,
        text: `Monster hits Player for ${damage}`
      });
      this.checkWin();
    },
    heal() {
      if (this.playerHealth <= 90) {
        this.playerHealth += 10;
      } else {
        this.playerHealth = 100;
      }
      this.turns.unshift({
        isPlayer: true,
        text: `Player heals for 10`
      });
      this.monsterAttack();
    },
    giveUp() {
      this.game.isRunning = false;
    }
  }
});
